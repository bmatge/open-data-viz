# Méthode d'audit — portail data.education.gouv.fr

Brief commun aux agents d'audit du lot 12. Chaque agent produit **une fiche par dataviz**
dans `docs/portail-education/<slug>.md`, sur le modèle de `docs/portail/` (portail Bercy).

## Ce que la fiche doit contenir, dans cet ordre

1. **En-tête** — URL, id du catalogue, thématique/sous-thématique, jeu(x) de données
   (identifiant ODS, nombre de lignes, public/restricted, champs utiles), date du relevé.
2. **Objectif de la dataviz et informations véhiculées** — la question à laquelle la page
   répond, le message porté, ce que l'utilisateur doit obtenir, **ce qui n'est pas dans l'objet**.
3. **Relevé visuel exhaustif** — bloc par bloc, dans l'ordre de la page : titres, textes
   d'intro, filtres (et **la liste réelle de leurs valeurs**, vérifiée à l'API), KPI et
   **leur formule**, graphiques (type, axes, séries, palette, tri, nombre de barres/points),
   cartes (fond, type de couche, clusters/choroplèthe, contenu de l'infobulle, recentrages),
   tableaux (colonnes, pagination, tri), liens sortants. Les valeurs vues à l'écran, pas
   celles supposées.
4. **Défauts et bizarreries de l'original** — ce qui est cassé, incohérent, ou trompeur.
5. **Transposition vers `dsfr-data`** — un tableau
   « directive/composant Opendatasoft → composant + attributs `dsfr-data` », une balise par
   ligne, avec les attributs réellement nécessaires. Puis une **esquisse de code HTML**
   du squelette de la page.
6. **Limites et points durs identifiés** — ce qui ne se transpose pas directement, avec
   pour chacun : l'obstacle précis, la voie native essayée, le contournement envisagé.
7. **Données à reproduire fidèlement** — la check-list de fidélité.

## Règles non négociables (elles viennent du CLAUDE.md du dépôt)

- **Vérifier au navigateur.** Utiliser l'extension Chrome (`mcp__claude-in-chrome__*`).
  Charger la page, la scroller de haut en bas, **jouer les interactions** (ouvrir les
  selects, choisir des valeurs, cliquer les points de carte, déplier les accordéons,
  changer d'onglet), lire les captures. Un rendu décrit sans avoir été vu ne va pas dans
  la fiche : le noter « non vu à l'écran ».
- **Le code sert à nommer, pas à décrire.** Quand le rendu contredit le code, c'est le
  rendu qui gagne.
- **⚠️ Avant d'écrire qu'une chose est une limite de `dsfr-data`, se demander si c'est la
  bibliothèque ou le fait d'avoir voulu reproduire le modèle Opendatasoft à l'identique.**
  C'est la règle la plus importante du dépôt. ODS impose un contexte unique ; `dsfr-data`
  propose plusieurs architectures (tout charger côté client, agréger côté serveur,
  `server-side`/`server-search`/`server-facets`, charger par `bbox`, paginer côté serveur).
  Chercher l'architecture native **avant** d'écrire qu'une chose est impossible.
- **Lire le JSDoc de l'attribut, pas seulement la fiche du composant** (MCP ChartsBuilder :
  `list_skills`, `get_skill(id, section)` ; source qui fait autorité :
  `~/Developer/GitHub/dsfr-data`). Ne jamais deviner un attribut. Une grammaire fausse est
  **silencieuse**.
- Ne pas conclure sur la performance sans avoir chronométré.

## Comment récupérer la source d'une page `/pages/<slug>/`

```bash
curl -sL --compressed "https://data.education.gouv.fr/pages/<slug>/" \
  | grep -o '\$scope.blocks = .*' | head -1
```

JSON `{html, css}` dont `html` est le template AngularJS échappé. Le désechapper en Node
(`JSON.parse` puis écrire `o.html`), pas à la main.

**Déjà fait pour les 15 pages `/pages/` du catalogue** : les templates désechappés sont dans
`_sources/<slug>.html` (relevés le 2026-09-10). Les lire de là plutôt que de les re-télécharger ;
les re-télécharger seulement pour vérifier qu'ils n'ont pas bougé. `_sources/_dataviz-list.html`
est le template de la page catalogue elle-même, et `_catalogue-source.json` l'export du jeu
`dataviz-a-la-une` qui la pilote (36 entrées, champs `id, thematique, sous_thematique, filtre,
titre, description, image, lien`).

## Les pages Studio — l'autre moitié du portail (trouvé au lot 12)

Toutes les cibles du catalogue ne sont pas des pages AngularJS. Les URL en
`/explore/assets/<slug>/view/` et `/p/<slug>/` sont des **pages Opendatasoft Studio**, la
génération suivante. Elles n'ont pas de `$scope.blocks`. Leur configuration complète — blocs,
filtres, couches de carte, KPI, graphiques, palettes, champs d'infobulle — s'obtient ainsi :

```bash
curl -s "https://data.education.gouv.fr/api/portal/v1.0/studio_pages/<slug>" | python3 -m json.tool
```

**C'est l'équivalent exact de `$scope.blocks` pour ces pages : s'en servir de la même manière**
— pour nommer les champs, les formules et les paramètres, jamais pour décrire un rendu qui n'a
pas été vu à l'écran.

**⚠️ La config servie par cette API peut être périmée.** Constaté sur
`dataeducation.opendatasoft.com` : `studio_pages/<slug>` renvoyait une configuration **sans
aucune `conditions`**, ce qui aurait fait écrire que deux pages sœurs affichent les mêmes
chiffres — alors qu'elles diffèrent par 18 conditions. **La config vivante est celle que la
page charge réellement**, dans le HTML servi (`appEvent.detail.initialize(...)`). Récupérer
les deux et les comparer ; en cas d'écart, c'est le HTML servi qui fait foi, et l'écart
lui-même est un constat.

Deux pièges de repérage déjà payés :
- Une URL de catalogue en `/explore/dataset/<jeu>/<vue>/` peut faire un **302** vers
  `/explore/assets/<jeu>/`, la dataviz vivant en réalité à `/explore/assets/<autre-slug>/view/`.
  Suivre les redirections (`curl -sIL`) avant de conclure sur la nature de la cible.
- Les onglets **Tableau / Analyse / Export / API** des anciennes vues natives **n'existent plus**
  sur ce portail (302 sur les six URL testées). Ne pas les compter comme une capacité d'ODS que
  `dsfr-data` n'aurait pas : c'est du chrome de back-office, et il a disparu chez ODS aussi.

## Les vues personnalisées héritées — la TROISIÈME famille (trouvée au lot 12)

Une cible qui n'est ni une page `/pages/` ni une page Studio n'est pas pour autant morte.
`GET /api/portal/v1.0/studio_pages/?limit=100` liste **23** pages Studio ; quatre cibles du
catalogue (ids **10, 23, 24, 30**) n'y figurent pas et redirigent pourtant en 302 vers leur page
d'actif. Ce sont des **vues personnalisées ODS héritées** (« custom views ») : du template
AngularJS `ods-*`, stocké **dans les métadonnées du jeu**, rendu par le visualiseur d'actif.

**Trois choses à savoir, chacune payée une fois :**

1. **L'URL vivante est celle de l'actif « Visualization »**, donnée en tête de la description du
   jeu (`<div class="ods-asset-customview-crosslink">`) :
   `/explore/assets/visualisation-<slug>/view/`. Le lien du catalogue **n'est pas mort** — il
   mène à l'actif, qui mène à la vue. Le récupérer ainsi :
   ```bash
   curl -s "…/api/explore/v2.1/catalog/datasets/<jeu>" | python3 -c \
     "import json,sys;print(json.load(sys.stdin)['metas']['default']['description'][:400])"
   ```
2. **`/api/datasets/1.0/<jeu>/` expurge `extra_metas`** : la configuration n'y est pas. Elle est
   dans l'attribut `ctx-dataset-schema` de la page **embed**, qui **ne redirige pas** :
   ```bash
   curl -sL --compressed "https://data.education.gouv.fr/explore/embed/dataset/<jeu>/<slug-de-vue>/" \
     | grep -o 'ctx-dataset-schema="[^>]*"'
   ```
   C'est du JSON doublement échappé (entités HTML **et** `\{` `\}` d'AngularJS) : désechapper en
   Python/Node (`html.unescape`, puis `.replace('\\{','{')`, puis `JSONDecoder().raw_decode`).
   Utile dedans : `extra_metas.visualization.custom_view_html` / `…_css` / `…_title` /
   `map_tooltip_html`, et `extra_metas.asset_content_configuration.facets`.
3. **Le slug de vue n'est pas toujours `custom`.** Il est dans
   `extra_metas.visualization.custom_view_slug` et vaut aussi bien `carte`
   (`fr-en-annuaire_bde_lycees_pro`) que `carte-personnalisee`
   (`fr-en-etablissements-labellises-euroscol`). Un mauvais slug renvoie **404**, pas une
   redirection : essayer les trois avant de conclure.

Configurations déjà archivées : `_sources/<jeu>.customview.json` (4 fichiers, relevés 2026-09-10).

**Deux distinctions à tenir dans les fiches** — la colonne de facettes à gauche, le compteur de
résultats, la recherche libre, les outils de dessin (polygone/rectangle/cercle), le sélecteur de
fond et la géolocalisation appartiennent au **visualiseur d'actif**, pas à la vue. Ils
apparaissent ou non selon le jeu (seul Euroscol rend les facettes, sur les quatre). C'est du
chrome de portail open data : **ne pas le compter comme un manque de `dsfr-data`**.

## API du portail

Base : `https://data.education.gouv.fr/api/explore/v2.1`
Clé de lecture publique (extraite du template de la page catalogue, `ctx-apikey`) :

```
26e03f69e10dd40582f0c7e46b196ca5ea8cbecd56cc36c22f6d2cbb
```

En-tête : `Authorization: Apikey 26e03f69e10dd40582f0c7e46b196ca5ea8cbecd56cc36c22f6d2cbb`
(**jamais** en `headers='{"apikey":…}'` côté navigateur : préflight CORS refusée).

Utile :
- `…/catalog/datasets/<id>` — métadonnées, nombre de lignes
- `…/catalog/datasets/<id>/records?select=…&group_by=…&limit=…` — agrégats
- `…/catalog/datasets/<id>/facets` — les facettes **déclarées au back-office**
- `…/catalog/datasets/<id>/exports/json?limit=-1` — export complet

Certaines pages portent leur propre `ctx-apikey` : la relever dans leur `$scope.blocks`.

## ⚠️ La cible est 0.25.0, et le livrable est le résidu — lire `_CIBLE-0.25.md`

**Avant d'écrire la section « Limites » d'une fiche, lire `_CIBLE-0.25.md`.** Il donne l'état
du backlog `dsfr-data` au 2026-09-10 (0.23.0 publiée, neuf issues au jalon v0.24.0, quatre au
jalon v0.25.0) et les quatre verdicts à ne pas confondre : natif / natif mais postérieur à la
version épinglée / prévu à un jalon / manque réel.

Mais attention au contresens inverse : **ce document ne sert pas à conclure que tout est déjà
prévu.** Le backlog a été écrit à partir d'un seul portail (Bercy). Toute la raison d'auditer
data.education.gouv.fr est de trouver ce qu'un **second** portail révèle et que le premier n'a
pas montré. Le résidu — ce qui n'est ni natif ni planifié — est le produit du lot.

Donc : présumer *couvert* est aussi fautif que présumer *impossible*. À la moindre hésitation,
écrire le constat avec son observation ; une demande en double se fusionne au registre, une
demande jamais écrite est perdue.

## Version de la bibliothèque : lire le source ET vérifier ce qui est publié

Le dépôt épingle **`dsfr-data@0.20.0`** sur ses 26 pages, mais la version publiée sur npm au
2026-09-10 est **0.23.0**. Une capacité présente dans `~/Developer/GitHub/dsfr-data` peut donc
être native, publiée, et malgré tout absente des pages du dépôt.

**Cas établi, vérifié version par version** : `refine-on-click` et l'événement
`dsfr-data-map-select` (couche `dsfr-data-map-layer`, #681 / ADR-104) sont **absents de 0.20.0,
0.21.0 et 0.22.0, et présents en 0.23.0** — contrôlé dans le bundle publié
(`dist/dsfr-data.map.esm.js` du tarball npm), pas seulement dans le source. Ils sont en
revanche **absents de la fiche de référence** servie par `get_skill(dsfrDataMap, "reference")`,
ce qui a induit deux agents en erreur le même jour.

Règle qui en découle, à appliquer avant d'écrire qu'une capacité manque :
1. Chercher l'attribut dans le **source** (`packages/core/src/components/`), pas seulement dans
   la fiche du composant — la fiche peut être en retard sur le code.
2. Vérifier dans **quelle version publiée** il apparaît :
   `npm pack dsfr-data@<v>` puis `grep` dans `package/dist/`. Ne pas se fier à un numéro de
   version lu de mémoire ni à un changeset local.
3. Distinguer alors trois verdicts, qui n'ont pas la même valeur :
   - **capacité native** (présente dans la version publiée) → toute critique est un faux problème ;
   - **capacité native mais postérieure à la version épinglée** → ce n'est pas un manque de la
     bibliothèque, c'est une montée de version à faire dans le dépôt (à signaler comme telle) ;
   - **capacité absente du source** → là seulement, c'est une demande à la bibliothèque.

## Pièges déjà payés sur le portail Bercy (ne pas les repayer)

Lire `../../CLAUDE.md`, section « Pièges déjà payés » — 30 lignes, toutes applicables ici.
Les plus probables sur ce portail : `max-records` par défaut à 1 000 qui tronque en
silence ; `max-items` d'une couche carte à 5 000 ; le séparateur d'attribut (`|` pour
`labels`/`display`, `,` pour `split`/`round`/`fields`) ; `group-by` avec une fonction ODSQL
refusé par l'adaptateur ; `fit-bounds` + `insets="drom"` sur les jeux ultramarins ;
`sort="-count"` sur les facettes qui trie à l'envers.

## Style

Français, dense, factuel. Pas de superlatif, pas de conclusion non vérifiée. Chaque
affirmation de comportement doit pouvoir être rattachée à une observation.
