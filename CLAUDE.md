# CLAUDE.md — open-data-viz

Banc d'essai : reproduire le catalogue de visualisations de **data.economie.gouv.fr**
(Opendatasoft / Huwise) avec **`dsfr-data`** (ChartsBuilder), et documenter page par page
ce qui a été simple ou coûteux.

Lire `README.md` d'abord (objectif, structure, avancement), puis `ARCHITECTURE.md`
(couplages non-évidents du repo — [[ADR-053]]).

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
- **Vérifier au navigateur avant de conclure.** Playwright est disponible via
  `~/Developer/GitHub/dsfr-data/node_modules/playwright` ; charger la page, relever les
  erreurs console et capturer un écran. Une page qui « a l'air correcte » dans le HTML
  n'a rien prouvé.
- **Dataviz non reproductible** (page 404, jeu de données supprimé, cible hors portail)
  → analyse détaillée à la place, et statut correspondant dans le registre.
- Après avoir traité une dataviz, trois gestes :
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
