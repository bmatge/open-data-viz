# CLAUDE.md — open-data-viz

Banc d'essai : reproduire le catalogue de visualisations de **data.economie.gouv.fr**
(Opendatasoft / Huwise) avec **`dsfr-data`** (ChartsBuilder), et documenter page par page
ce qui a été simple ou coûteux.

Lire `README.md` d'abord (objectif, structure, avancement), puis `ARCHITECTURE.md`
(couplages non-évidents du repo — [[ADR-053]]). **Avant de toucher une page, lire sa fiche
d'audit visuel dans `docs/portail/`** : c'est la référence de fidélité des données.

## Décisions de cadrage (arrêtées en session d'ouverture, 2026-09-09)

1. **Équivalence fonctionnelle, pas clone pixel.** Mêmes données, mêmes graphiques,
   mêmes filtres — mais mise en page DSFR idiomatique. On ne recopie ni les hacks CSS
   ni la gymnastique `ng-init` / `ng-click` de l'original.
2. **Livraison par lots**, du plus simple au plus dur, en validant le motif à chaque lot.
3. **Statique + serveur Node natif zéro dépendance**, déployable sur `lab.miweb.run`
   via `spawn up` (contrat VibeLab : port 3000, `USER node`, `HEALTHCHECK /healthz`).
   DSFR et `dsfr-data` viennent du CDN jsDelivr — l'argument à démontrer est
   « une balise, un CDN, et ça marche ».

## Règles de travail

- **Chaque page de dataviz se termine par une section `#analyse`** avec toujours la même
  structure : « Ce qui a été simple » / « Ce qui a coincé » en deux colonnes, un tableau
  de correspondance *directive Opendatasoft → composant dsfr-data*, puis un encadré
  « Verdict ». Copier le motif d'une page existante.
- **L'analyse doit être vraie.** Elle est le livrable, pas l'habillage. Si une affirmation
  n'a pas été vérifiée dans le navigateur, elle ne va pas dans la page. Chaque friction
  décrite doit avoir été effectivement rencontrée pendant la reproduction.
- **⚠️ Avant de classer quoi que ce soit en limite : est-ce la bibliothèque, ou est-ce
  d'avoir voulu reproduire à l'identique ?** C'est la règle la plus importante du dépôt.
  Opendatasoft impose un modèle (un contexte, un jeu de données, tout y pend) ;
  `dsfr-data` en propose plusieurs — tout charger côté client, agréger côté serveur,
  charger par viewport (`bbox`), paginer côté serveur. Transposer le modèle ODS puis en
  imputer le coût à `dsfr-data` produit des critiques fausses : c'est arrivé deux fois au
  lot 1 (FP-001 et FP-002 du registre). Chercher l'architecture native **avant** d'écrire
  qu'une chose est impossible.
- **Chronométrer avant de conclure sur la performance.** Le poids transféré et le nombre
  d'allers-retours sont deux choses différentes, et c'est presque toujours le second qui
  coûte. Mesurer la durée de chaque requête ET la concurrence observée avant d'incriminer
  quoi que ce soit (script type dans l'historique : `perf.mjs`, `chrono.mjs`).
- **Vérifier au navigateur avant de conclure.** Playwright est disponible via
  `~/Developer/GitHub/dsfr-data/node_modules/playwright` ; charger la page, relever les
  erreurs console et capturer un écran. Une page qui « a l'air correcte » dans le HTML
  n'a rien prouvé.
- **Dataviz non reproductible** (page 404, jeu de données supprimé, cible hors portail)
  → analyse détaillée à la place, et statut correspondant dans le registre.
- Après avoir traité une dataviz, trois gestes :
  0. **Fusionner avant d'ajouter.** Si un constat existe déjà au registre, ne pas créer
     d'entrée : ajouter la dataviz à son champ `dataviz`, et enrichir le constat de ce que
     la nouvelle page apprend. Une remarque qui revient sur plusieurs dataviz gagne en
     poids, pas en nombre d'entrées. Le lot 2 a ainsi requalifié AM-007 (les liens
     optionnels sont passés du confort à l'accessibilité) et PG-004 (la règle du `select`
     s'est inversée) sans créer de doublon.
  1. **Consigner les constats** dans `public/data/retours.json` — un objet par constat,
     typé (`faux-probleme`, `bug`, `amelioration`, `limite-dure`, `avantage`, `piege`),
     avec un champ `verifie` décrivant l'observation qui l'établit. **Pas de champ
     `verifie`, pas d'entrée.** Puis `node scripts/build-retours.mjs`, qui régénère
     l'export d'issues et la note du vault.
  2. Mettre à jour la table `STATUTS` de `scripts/build-registre.mjs`, puis
     `node scripts/build-registre.mjs`.
  3. Reporter l'enseignement transverse dans `public/synthese.html`.
- **Un constat corrigé ne s'efface pas.** Quand une vérification invalide une critique déjà
  écrite, elle devient une entrée `faux-probleme` (ce que je croyais / ce qui est vrai /
  ce qui reste vrai / comment je l'ai vérifié), et l'analyse de la page concernée est
  réécrite. La trace de la correction fait partie du livrable.

## Pièges déjà payés (ne pas les repayer)

| Piège | Ce qu'il faut faire |
|---|---|
| Clé ODS en `headers='{"apikey":…}'` | Préflight CORS refusée. Utiliser `api-key-ref="ods-mef"` (défini dans `public/assets/cles.js`, qui pose `Authorization: Apikey …`). |
| `max-records` par défaut à 1 000 | Tronque **en silence**. Le fixer explicitement dès qu'un jeu dépasse 1 000 lignes. |
| `select=count(*)` sans `group_by` (ODS) | Renvoie la valeur répétée une fois par ligne de page. Ajouter `limit="1"` et lire en `:max`. |
| `dsfr-data-join` sur une clé non unique | Relation 1-N, lignes dupliquées. Joindre sur `titre`, pas sur `lien`. |
| `fit-bounds` seul sur données ultramarines | La vue part au milieu du Pacifique. Ajouter `max-bounds` + `insets="drom"`. |
| Attributs français de `dsfr-data-list` | `colonnes`/`recherche`/`filtres`/`tri` sont dépréciés → `columns`/`search`/`filters`/`sort`. |
| Pas d'agrégat `distinct` | Intercaler un `dsfr-data-query group-by="…"` et compter ses lignes avec `value="count"`. |
| Chargement complet via `/records` | 100 lignes par requête, en série : 31 s pour 3 080 lignes. Passer par `/exports/json` en source générique (`url=` + `params`). |
| `select` sur un champ texte long | Contre-intuitif : plus lent que l'export complet. Soit on écarte les textes longs par `select`, soit on ne met PAS de `select` du tout. Jamais un `select` qui les inclut. |
| Jeu suffixé `@public` | Convention de fédération Opendatasoft : le jeu vit sur `public.opendatasoft.com`, pas sur le portail courant. Sans clé, CORS ouvert. |
| Deux colonnes pour la même info | Compter les valeurs nulles de chaque candidate avant de choisir (ex. `reg_name` 30 vides / `nom_officiel_region` 3 vides). |
| `chart.js` en dépendance CDN | Inutile : DSFR Chart 2.1.1 l'embarque. Ne pas le charger. |
| `display:` de page sur un composant | Une règle sur le nom de balise écrase le `:host` du composant (`dsfr-data-kpi-group` est `grid`). Ne poser `display:block` que sur les composants sans style d'hôte (PG-011). |
| `sort="-count"` sur `dsfr-data-facets` | Trie par compte **croissant** (inverse d'ODS). Ne rien écrire : `count` décroissant est le défaut (PG-012). |
| `max-items` d'une couche carte (5 000 par défaut) | Tronque avec un bandeau « zoomez » qui ne charge rien de plus. Le relever dès qu'un jeu dépasse 5 000 points (PG-013). |
| `fit-bounds` + `max-bounds` sur un seul point | Le clip renvoie vide : pas de zoom. Sans DROM dans le jeu, retirer `max-bounds` et `insets` (BUG-004). |
| Encarts `insets="drom"` | Pas de largeur par défaut : `site.css` leur donne 10 rem (AM-032). Vérifier qu'il y a des points ultramarins avant d'en poser. |
| `year-of` / `month-of` nourris par un `<input type="date">` | Ils lisent « AAAA » et « AAAA-MM » ; une date complète donne un filtre **silencieusement absent**. Dériver deux champs cachés (AM-029). |
| `group-by` avec une fonction ODSQL (`year(…)`) | L'adaptateur l'entoure d'accents graves → 400. Source générique (`url` + `params`), qui n'écoute plus le contexte (PG-014). |
| `replace-fields` sur une valeur ISO | Deux-points réservés par la grammaire, comparaison stricte : impossible. Pas de regex (AM-038). |
| Jeu sans facette déclarée au back-office | `server-facets` rend une liste vide (`/facets` vide). Filtres en `<select>` + contexte (ex. prix-controle-technique). |
| KPI `count` sur une `dsfr-data-query limit` | Compte la limite, pas la donnée. Une query sans `limit` pour le KPI (PG-017). |
| Groupe `null` d'un `group_by` (serveur ou client) | Barre sans libellé, compte décalé de l'original. `where champ is not null` / `champ:isnotnull` (PG-015, PG-018). |
| Date dans un template | Pas de format `:date`, mais `date_format(champ, "dd/MM/yyyy 'à' HH:mm") as champ_txt` + `timezone=Europe/Paris` dans le `select` ODS fait le travail (FP-003). |
| Conditionnelle dans un template | Aucune ; interpoler la valeur dans un attribut (`class`, `href`, `data-v`) et masquer par CSS `:empty`, `[href=""]`, `:has()` (AM-039, bloc « Annuaires » de `site.css`). |
| Reproduire sans avoir lu `docs/portail/<page>.md` | Trois chiffres faux et deux mauvais jeux au lot 9. Lire la fiche d'audit ET le `$scope.blocks` avant d'écrire. |
| Un lien 404 ou « hors périmètre » dans le catalogue | Ne prouve ni que le jeu a disparu ni que la dataviz est irreproductible : le champ `datasets` de l'entrée dit ce qu'il faut ; 10 des 11 « hors périmètre » ont été traités au lot 8. Ne prouve pas que le jeu a disparu : chercher dans `/api/explore/v2.1/catalog/exports/json` et dans les descriptions des jeux voisins, qui pointent souvent la page vivante (LIM-006). |

## Spécifications des composants

Les fiches de référence `dsfr-data` s'obtiennent via le serveur MCP **ChartsBuilder**
(`list_skills`, `get_skill(id, section)`). Ne pas deviner un attribut : le vérifier.
Le code source fait autorité en dernier ressort : `~/Developer/GitHub/dsfr-data`.

## Le portail d'origine

Le source AngularJS de n'importe quelle page du portail se récupère ainsi :

```bash
curl -sL --compressed "https://data.economie.gouv.fr/pages/<slug>/" \
  | grep -o '\$scope.blocks = .*' | head -1
```

C'est un JSON `{html, css}` dont `html` est le template de la page, échappé. C'est la
référence pour savoir ce que la page fait réellement — l'apparence seule ne suffit pas.

## Commandes

```bash
npm start                          # serveur sur :3000
node scripts/build-registre.mjs    # régénère le registre depuis le catalogue vivant
```

## Vault Obsidian

Fiche projet : `~/Documents/Obsidian/10-Projects/open-data-viz.md`.
