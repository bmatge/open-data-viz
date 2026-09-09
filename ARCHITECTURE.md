# ARCHITECTURE.md — open-data-viz

> Carte de navigation du repo : les couplages non-évidents et le *pourquoi*.
> Le *quoi* est dans `README.md`, les règles de travail dans `CLAUDE.md`.

## 1. Vue d'ensemble

Un site statique sans build. `server.js` sert `public/` en résolvant les URLs propres
(`/viz/decp-augmente` → `public/viz/decp-augmente.html`). Tout le reste se passe **dans le
navigateur** : chaque page charge le DSFR et `dsfr-data` depuis jsDelivr, et déclare son
pipeline de données en balises HTML — `dsfr-data-source` → transformateurs
(`-query`, `-facets`, `-search`, `-join`) → vues (`-chart`, `-map`, `-display`, `-list`,
`-kpi`). Les composants sont des **frères** reliés par `id`/`source`, jamais imbriqués : la
position dans le DOM ne détermine que l'endroit du rendu, pas le câblage.

Les données viennent en direct de l'API OpenDataSoft Explore v2.1 de `data.economie.gouv.fr`.
Rien n'est mis en cache côté serveur, rien n'est copié dans le repo : une page qui affiche des
chiffres faux est un bug de requête, jamais un problème de fraîcheur.

## 2. Points d'entrée

- Serveur / routage : `server.js:28` (`resolveFile`) et `server.js:47` (handler)
- Page catalogue (accueil) : `public/index.html:52` (le pipeline commence là)
- Une page dataviz : `public/viz/plan-de-relance.html` — modèle de référence, tout y est
- Synthèse transverse : `public/synthese.html`
- Registre d'avancement : `scripts/build-registre.mjs:33` (table `STATUTS`)
- Registre des retours : `public/data/retours.json` (source) → `scripts/build-retours.mjs`

## 3. Modules & responsabilités

| Module | Rôle | Chemin |
|---|---|---|
| Serveur statique | Sert `public/`, URLs propres, `/healthz` | `server.js` |
| Page catalogue | Reproduit la page d'accueil ODS + badges d'avancement | `public/index.html` |
| Pages dataviz | Une par visualisation reproduite, avec sa section `#analyse` | `public/viz/*.html` |
| Synthèse | Agrège les analyses + tableau de bord d'avancement | `public/synthese.html` |
| Registre d'avancement | État de reproduction, joint au catalogue ODS | `public/data/registre.json` |
| Registre des retours | Constats sur ChartsBuilder, un objet par constat | `public/data/retours.json` |
| Page des retours | Le registre rendu avec les composants qu'il évalue | `public/retours.html` |
| Générateur de registre | Reconstruit le registre depuis le catalogue vivant | `scripts/build-registre.mjs` |
| Clés d'API | Clé de lecture publique du portail | `public/assets/cles.js` |
| Habillage | En-tête / pied de page DSFR injectés | `public/assets/layout.js` |

## 4. Couplages non-évidents ⚠️

- **La page d'accueil ne contient aucune liste de visualisations.** Elle fait un
  `<dsfr-data-join on="titre">` (`public/index.html:64`) entre le catalogue vivant du portail et
  `public/data/registre.json`. Les cartes viennent d'Opendatasoft, les badges d'avancement d'ici.
  ⇒ **Traiter une dataviz = éditer la table `STATUTS` (`scripts/build-registre.mjs:33`) puis
  relancer `node scripts/build-registre.mjs`.** Éditer `registre.json` à la main sera écrasé.

- **La clé de jointure est `titre`, pas `lien`.** Deux entrées du catalogue (« Annuaire des
  services DGFiP » et « Points d'accueil des finances publiques ») pointent la même page :
  joindre sur `lien` produit une relation 1-N et double des cartes. `STATUTS` reste indexée par
  `lien` pour la lisibilité, mais le registre est **émis par enregistrement**, donc porté par
  `titre` (`scripts/build-registre.mjs:75`).

- **`public/assets/cles.js` doit être chargé dans le `<head>`, avant le bundle `dsfr-data`.**
  Il pose `window.DSFR_DATA_KEYS`, que les `dsfr-data-source` lisent via `api-key-ref` **au
  moment où elles se montent**. Chargé trop tard, la clé est ignorée et Opendatasoft répond
  « dataset does not exist » (les jeux privés sont masqués en 404).

- **`layout.js` est un script classique en fin de `<body>`, jamais un module.** Il remplace
  `#site-header` / `#site-footer` pendant le parsing, donc **avant** que `dsfr.module.min.js`
  (différé) instrumente le DOM. Le passer en `type="module"` casse le menu mobile DSFR.

- **`dsfr-data-facets` rend son interface là où la balise est écrite**, alors que son `id` seul
  détermine le câblage. Elle est donc déclarée dans la colonne de filtres
  (`public/viz/plan-de-relance.html:78`) et référencée par des `dsfr-data-query` écrits **plus
  haut** dans le fichier. C'est volontaire : l'ordre du DOM ne reflète pas l'ordre du pipeline.

- **Deux mécanismes de filtrage, non interchangeables.** `dsfr-data-facets` filtre *les données
  déjà reçues* (Plan de relance : tout le jeu tient en mémoire). `dsfr-data-context` diffuse un
  `where` à N sources qui refont leur requête (DECP : 994 000 lignes, seuls des agrégats
  descendent). Choisir selon la taille du jeu, pas selon le confort d'écriture.

## 5. Effets de bord & I/O

- **DB / migrations** : aucune. Aucun état serveur.
- **Fichiers** : deux fichiers générés, jamais à l'exécution —
  `public/data/registre.json` par `scripts/build-registre.mjs`, et
  `export/issues-dsfr-data.md` + la note du vault par `scripts/build-retours.mjs`.
  `public/data/retours.json` est écrit à la main : c'est une source, pas une sortie.
- **Réseau** : lectures anonymes sur `data.economie.gouv.fr` (API Explore v2.1, CORS `*`) ;
  jsDelivr pour DSFR / DSFR Chart / dsfr-data ; tuiles IGN pour les cartes. Aucune écriture.
- **Crons / queues** : aucun. Le TTL de 30 jours du prototype est géré par `spawn` sur le VPS.

## 6. Tests — quoi couvre quoi

Pas de suite automatisée : le livrable est éditorial autant que technique, et le seul test qui
vaille est « la page rend-elle les bonnes données dans un vrai navigateur ». La vérification est
manuelle mais **obligatoire** avant de conclure quoi que ce soit dans une analyse :

```bash
npm start
# puis, avec le Playwright de ~/Developer/GitHub/dsfr-data/node_modules :
# charger la page, relever les erreurs console, compter .fr-card / canvas /
# [data-dsfr-config-error], capturer un plein écran.
```

Une page dont le HTML « a l'air correct » n'a rien prouvé — trois des sept pièges listés
ci-dessous ne se voient qu'au runtime, et deux ne produisent aucun message.

## 7. Pièges connus

| Piège | Ce qu'il faut faire |
|---|---|
| Clé ODS en `headers='{"apikey":…}'` | Préflight CORS refusée. Utiliser `api-key-ref="ods-mef"` (pose `Authorization: Apikey`). |
| `max-records` par défaut à 1 000 | Tronque **en silence**. Le fixer dès qu'un jeu dépasse 1 000 lignes. |
| `select=count(*)` sans `group_by` (ODS) | Valeur répétée une fois par ligne de page. `limit="1"` + lecture en `:max`. |
| `dsfr-data-join` sur clé non unique | Relation 1-N, lignes dupliquées. Joindre sur `titre`. |
| `fit-bounds` seul sur données ultramarines | Vue au milieu du Pacifique. Ajouter `max-bounds` + `insets="drom"`. |
| Attributs français de `dsfr-data-list` | Dépréciés → `columns` / `search` / `filters` / `sort`. |
| Pas d'agrégat `distinct` | Intercaler un `dsfr-data-query group-by` et compter ses lignes. |
| Chargement complet via `/records` | 100 lignes/requête, en série. Passer par `/exports/json`. |
| `select` incluant un champ texte long | Plus lent que l'export complet. Écarter les textes longs, ou pas de `select` du tout. |
| Jeu suffixé `@public` | Vit sur `public.opendatasoft.com`, pas sur le portail courant. |
| `chart.js` en CDN | Inutile : DSFR Chart 2.1.1 l'embarque. |

Deux pièges de données côté portail, à ne pas prendre pour des bugs de reproduction : le champ
`procedure` de `decp_augmente` contient des doublons d'encodage (« Appel d offres ouvert » *et*
« Appel d'offres ouvert »), et les valeurs `null` sortent en légende sous le nom de repli
« Série N » de DSFR Chart.

## 8. Récupérer le source d'une page du portail

La référence pour savoir ce qu'une page d'origine fait réellement — l'apparence ne suffit pas :

```bash
curl -sL --compressed "https://data.economie.gouv.fr/pages/<slug>/" \
  | grep -o '\$scope.blocks = .*' | head -1
```

C'est un JSON `{html, css}` dont `html` est le template AngularJS de la page, échappé.

## 9. Liens

- Fiche projet : `~/Documents/Obsidian/10-Projects/open-data-viz.md`
- ADR transverses : `~/Documents/Obsidian/30-Knowledge/ADR/`
- Bibliothèque testée : <https://github.com/bmatge/dsfr-data> — les fiches de référence des
  composants s'obtiennent via le serveur MCP **ChartsBuilder** (`list_skills` / `get_skill`).
