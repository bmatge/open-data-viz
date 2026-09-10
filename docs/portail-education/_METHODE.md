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
