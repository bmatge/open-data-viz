# IPS Collèges

- **URL** : https://data.education.gouv.fr/pages/dataviz-ips-colleges/
- **Catalogue** : id **31**, thématique **Éducation**, sous-thématique **Collèges**.
  Description du catalogue : « Indices de position sociale des collèges de France pour
  l'année scolaire 2023-2024 ». Vignette `/assets/theme_image/preview-dataviz-ips-colleges.jpg`.
- **Producteur (métadonnée du jeu)** : DEPP — Ministère en charge de l'éducation nationale.
  Licence ouverte v2.0 (Etalab).
- **Jeu de données utilisé par la page** : **`donnees-ips-colleges`** — **62 646 lignes**,
  9 rentrées scolaires, lisible **sans clé** (`/records` et `/exports/csv` répondent 200
  en anonyme, vérifié en curl). Ce n'est **pas** un jeu du catalogue : son titre interne
  est `dataviz2`, sa description « Jeu de données technique, utilisé par une page de
  dataviz. », son mot-clé `hors catalogue`.
  - **11 champs** : `rentree_scolaire` (text), `uai` (text), `secteur` (text),
    `ips` (double), `appellation_officielle` (text), `libelle_commune` (text),
    `code_departement` (text), `code_commune` (text), `libelle_departement` (text),
    `libelle_academie` (text), `position` (geo_point_2d).
  - Facettes déclarées au back-office : `rentree_scolaire`, `libelle_academie`,
    `libelle_commune`, `libelle_departement` (aucune sur `secteur`).
  - Répartition par rentrée : 2024-2025 6 987 · **2023-2024 6 985** · 2022-2023 6 973 ·
    2021-2022 6 962 · 2017-2018 6 954 · 2020-2021 6 953 · 2018-2019 6 951 ·
    2019-2020 6 946 · 2016-2017 6 935.
- **Jeux publics équivalents** (non utilisés par la page) : `fr-en-ips_colleges`
  (2016-2021, 41 701 l.), `fr-en-ips-colleges-ap2022` (6 973 l.),
  `fr-en-ips-colleges-ap2023` (21 061 l., rentrées 2023-2024 = 6 985, 2024-2025 = 6 987,
  2025-2026 = 7 089). **Aucun de ces trois n'a de champ géographique** : ils portent
  24 colonnes (codes région/académie/département/commune, IPS de référence national,
  académique et départemental, écart-type) mais pas de `geo_point_2d`. Le jeu technique
  `donnees-ips-colleges` existe précisément pour porter la position — c'est ce qui rend
  la carte possible.
- **Relevé visuel** : 2026-09-10, Chrome, fenêtre 1600 × 1100.

## Objectif de la dataviz et informations véhiculées

- **Question à laquelle elle répond** : « Où sont les collèges de mon département ou de
  ma commune, et quel est l'indice de position sociale de chacun ? » C'est un **localisateur
  d'établissement avec une valeur attachée**, pas une analyse de l'IPS.
- **Message porté** : aucun, littéralement. La page n'énonce aucun constat : ni texte
  d'introduction, ni définition de l'IPS, ni moyenne, ni comparaison. Le seul texte de la
  page hors libellés de filtres est le H1 et l'invite « Sélectionnez un département ou
  une commune ».
- **Information que l'utilisateur doit obtenir** : pour un collège donné — son UAI, sa
  commune, son appellation officielle et son **IPS** de la rentrée 2023-2024, lu dans
  l'infobulle d'une épingle ; et, s'il veut la donnée brute, le CSV filtré.
- **Ce qui n'est pas dans l'objet** :
  - aucune **définition de l'IPS** — la page suppose que le lecteur sait ce qu'est un
    indice de position sociale, et qu'il sait qu'un IPS de 104 est « moyen » ;
  - aucune **comparaison** : le jeu technique ne porte ni `ips_national`, ni
    `ips_academique`, ni `ips_departemental` (ses trois jeux frères `donnees-ips-ecoles`,
    `donnees-ips-erea` et le jeu public `fr-en-ips-colleges-ap2023`, eux, les portent) ;
  - aucune **série temporelle** : le jeu couvre 9 rentrées, la page en fige une par
    `ng-init` et n'expose pas de sélecteur d'année ;
  - aucun **filtre sur le secteur** (public / privé sous contrat), alors que c'est la
    variable qui structure le plus l'IPS (moyennes mesurées : public 100,1 ; privé sous
    contrat 119,4) ;
  - aucun **KPI, aucun graphique, aucun tableau, aucun classement** — la page est un
    trois-facettes + une carte + un lien de téléchargement, rien d'autre.

## Chiffres de référence (API v2.1, rentrée 2023-2024)

| Mesure | Valeur |
|---|---|
| Collèges (lignes) | **6 985** |
| Lignes avec un IPS renseigné | 6 980 (**5 sans IPS**) |
| Lignes sans `position`, sans `libelle_departement`, sans `libelle_academie`, sans `appellation_officielle` | **14** (mêmes lignes, cf. « Défauts ») |
| IPS min / max / moyenne | **54,9** / **161,9** / **104,73** |
| Secteur `public` | 5 321 lignes, IPS moyen 100,15 |
| Secteur `privé sous contrat` | 1 664 lignes, IPS moyen 119,43 |
| Académies distinctes | **30** (+ 1 groupe `null` de 14 lignes) |
| Départements distincts | **103** (+ 1 groupe `null` de 14 lignes) — 96 métropole, 5 DROM, Saint-Barthélemy, Saint-Martin |
| Communes distinctes | **3 791** (+ 1 groupe `null`) |
| Départements les plus fournis | Nord 279 · Bouches-du-Rhône 191 · Paris 178 · Rhône 173 · Seine-Saint-Denis 158 · Pas-de-Calais 157 |
| Académies les plus fournies | Versailles 530 · Créteil 440 · Lille 436 · Nantes 410 · Normandie 387 · Rennes 383 |

## Le template AngularJS

```html
<ods-dataset-context context="frenipslyceesdataviz"
                     frenipslyceesdataviz-dataset="donnees-ips-colleges"
                     frenipslyceesdataviz-sort="-rentree_scolaire">
```

Un contexte unique, nommé **`frenipslyceesdataviz`** (nom de la page **lycées** —
copier-coller assumé, cf. « Gabarit partagé »). Tri `-rentree_scolaire`.
Filtre d'année posé par un `ng-init` sur la colonne de gauche :

```html
<div class="col-xs-2" ng-init="nbdepts=10;
     frenipslyceesdataviz.parameters['refine.rentree_scolaire']='2023-2024';">
```

Il n'y a **ni `ctx-apikey`, ni `ctxurl-urlsync`, ni paramètre d'URL lu**. Vérifié :
charger `…/dataviz-ips-colleges/?refine.libelle_departement=Mayotte` ne refine rien
(les trois requêtes réseau du chargement ne portent que `refine.rentree_scolaire`,
et la liste des départements reste complète).

**Trois requêtes réseau au chargement**, relevées dans l'onglet :

1. `GET /api/datasets/1.0/donnees-ips-colleges/?extrametas=true…` — métadonnées.
2. `GET /api/explore/v2.1/…/records?group_by=libelle_departement&refine=rentree_scolaire:"2023-2024"&select=count(*) as tot`
   — l'`ods-adv-analysis` de la liste des départements. **Sans `limit`** : renvoie
   **104 groupes**, dont le premier est `{libelle_departement: null, tot: 14}`.
3. `GET /api/records/1.0/search/?…&rows=0&facet=libelle_academie&facet=libelle_commune&facetsort.*=alphanum`
   — les deux `ods-facet`, en **API v1** (`nhits` 6 985).

**Aucune requête ne charge de record** : la couche de carte est conditionnée
(`show-if`), donc rien n'est demandé tant qu'aucun département / aucune commune n'est
choisi. Aucun message en console au chargement ni après les interactions.

## Relevé visuel exhaustif

### 1. Bandeau de titre

Fond gris clair pleine largeur (`umami-bg-grey`), un seul **H1** en gras :
« Indices de position sociale des collèges de France pour l'année scolaire 2023-2024 ».
Pas de chapô, pas de lien vers le jeu de données, pas de logo.

### 2. Colonne de gauche — les filtres (`col-xs-2`)

Grille **Bootstrap 3** (`row` / `col-xs-2` / `col-xs-10`) posée à l'intérieur d'une page
DSFR : la colonne fait ~185 px en 1600 px de large. Résultat observé à l'écran : les
libellés se coupent en plein mot — « Aix-Marseil / le », « Amien / s », « Clerm / ont- /
Ferran / d », et le H4 lui-même déborde en « Sélectionn… / un / départeme… / ou une /
commune ». C'est le rendu réel, pas une capture serrée.

**H4 conditionnel** : « Sélectionnez un département ou une commune ». Masqué
(`ng-show`) dès qu'un département **ou** une commune est refiné ; réaffiché quand on
retire le refine. Vérifié dans les deux sens.

**a. Facette « Académie »** (`<ods-facet name="libelle_academie" sort="alphanum">`)
H3 rose glycine. Liste alphanumérique, **6 valeurs visibles** + un lien « Plus »
(30 valeurs dans le DOM). Compteur à droite de chaque valeur. Valeurs et comptes vus à
l'écran au chargement : Aix-Marseille 281 · Amiens 216 · Besançon 142 · Bordeaux 356 ·
Clermont-Ferrand 185 · Corse 31.
Les 30 valeurs et leurs comptes (vérifiés à l'API sur la rentrée 2023-2024) :
Aix-Marseille 281 · Amiens 216 · Besançon 142 · Bordeaux 356 · Clermont-Ferrand 185 ·
Corse 31 · Créteil 440 · Dijon 182 · Grenoble 330 · Guadeloupe 52 · Guyane 38 ·
La Réunion 87 · Lille 436 · Limoges 87 · Lyon 314 · Martinique 50 · Mayotte 22 ·
Montpellier 262 · Nancy-Metz 255 · Nantes 410 · Nice 177 · Normandie 387 ·
Orléans-Tours 286 · Paris 178 · Poitiers 201 · Reims 158 · Rennes 383 · Strasbourg 171 ·
Toulouse 324 · Versailles 530. (**Somme 6 971 ; 14 lignes n'ont pas d'académie.**)
Un champ de recherche de facette existe dans le DOM
(`.odswidget-facet__value-search-input`) mais il est **invisible** (`offsetWidth` 0) :
pas de recherche possible dans la liste.

**b. Liste « Département »** — ce n'est **pas** une `ods-facet`, c'est une liste maison :

```html
<div ods-adv-analysis="analysis_departement"
     ods-adv-analysis-group-by="libelle_departement"
     ods-adv-analysis-select="count(*) as tot">
  <div ng-repeat="…in analysis_departement | limitTo:nbdepts">
    <a ng-click="…['refine.libelle_departement'] = (… ? null : …libelle_departement)">
      {{…libelle_departement}}</a>
```

- **10 entrées visibles** (`nbdepts=10`), puis « **> Plus** » qui passe à `nbdepts=200`
  et affiche les **103** départements, puis « **> Moins** ».
- **Aucun compteur affiché** : `count(*) as tot` est calculé (et transite dans la réponse)
  mais le template n'imprime que le libellé. Contraste visuel net avec les deux autres
  listes, qui affichent leur compte.
- Le groupe `null` (14 lignes) est écarté par la directive : les 10 premiers `<li>` du
  DOM sont bien Ain, Aisne, Allier, Alpes-Maritimes, Alpes-de-Haute-Provence, Ardennes,
  Ardèche, Ariège, Aube, Aude (vérifié en lisant `.liste-depts li`).
- Le clic est un **basculement** : cliquer « Ain » pose le refine, la liste se réduit à
  la seule entrée « Ain », et re-cliquer dessus le retire. Pas de multi-sélection.
- Tri : celui du `group_by` ODS, c'est-à-dire alphabétique — d'où « Alpes-Maritimes »
  avant « Alpes-de-Haute-Provence » (collation brute, pas française).

**c. Facette « Commune »** (`<ods-facet name="libelle_commune" sort="alphanum">`)
6 valeurs visibles + « Plus ». Au chargement : Abbeville 3 · Ablon-sur-Seine 1 ·
Abondance 2 · Achenheim 1 · Achères 2 · Acheux-en-Amiénois 1.
**Le DOM ne contient que 100 valeurs**, d'**Abbeville** à **Aramon** (compté :
102 `<li>` = 1 vide + 100 valeurs + 1 « Plus/Moins »). C'est le plafond de facette de
l'API v1 (`/api/records/1.0/search/` renvoie 100 valeurs par facette) — sur
**3 791 communes**. Sans refine amont, **la facette Commune ne donne accès qu'aux
communes en « A »**. Défaut majeur, cf. plus bas.

### 3. Colonne de droite — la carte (`col-xs-10`)

```html
<ods-map location="5,47.35371,8.98682" ods-auto-resize>
  <ods-map-layer context="frenipslyceesdataviz"
     show-if="…['refine.libelle_departement'] || …['refine.libelle_commune']">
```

- **Fond** : tuiles Huwise / IGN (« Leaflet | Powered by Huwise - Map data © IGN »),
  plan raster couleur, non atténué.
- **Cadrage initial** : `location="5,47.35371,8.98682"` = zoom 5 sur **47,35 N / 8,99 E**,
  c'est-à-dire **la Suisse** (le canton de Glaris). À l'écran, la carte affiche Berne,
  Zurich, Munich, Milan, Prague, et la France est repoussée sur le bord gauche —
  Bordeaux et Nantes sont hors cadre. Échelle 300 km.
- **Contrôles** : plein écran, dessin d'un polygone / rectangle / cercle pour filtrer
  par zone (+ « Modifier le filtre par zone » / « Effacer le filtre par zone »),
  zoom + / −, une loupe de géocodage (placeholder « Trouver un lieu… »), un bouton
  « me géolocaliser », un sélecteur de calques, l'échelle métrique/impériale.
- **Couche** : `ods-map-layer` sans attribut de rendu — donc **épingles rouges par
  défaut**, pas de cluster, pas de couleur liée à l'IPS. Vérifié : au chargement,
  `document.querySelectorAll('.leaflet-marker-icon').length` vaut **0** — la carte est
  vide, seuls les points de villes du fond de carte sont visibles.
- **Après un refine département** (« Ain ») : la carte se recadre sur le département
  (fit automatique) et affiche **65 épingles rouges individuelles**. Le rechargement des
  tuiles est visiblement en retard sur le recadrage : pendant ~3 s le fond est un
  agrandissement flou des tuiles du zoom 5.
- **Après un refine commune** (« Bastia ») : recadrage à l'échelle **1 km**, 5 épingles.
- **Infobulle au clic** sur une épingle (relevé sur le collège de Coligny, Ain) :
  bulle blanche Leaflet avec une croix de fermeture et **cinq couples libellé/valeur**,
  dans cet ordre :

  | Libellé | Valeur relevée |
  |---|---|
  | Rentrée scolaire | 2023-2024 |
  | UAI | 0011071J |
  | Commune | Coligny |
  | Appellation officielle | Collège Le Grand Cèdre |
  | IPS | **108,1** |

  L'ordre n'est ni celui du schéma du jeu (`rentree_scolaire, uai, secteur, ips,
  appellation_officielle, libelle_commune, …`) ni l'ordre alphabétique : c'est une
  configuration de bulle faite au back-office (la page ne pose aucun attribut
  d'infobulle, et l'API ne l'expose pas). **Six champs sont écartés** : `secteur`,
  `code_departement`, `code_commune`, `libelle_departement`, `libelle_academie`,
  `position`. Le clic recentre la carte sur l'épingle (échelle passée de 300 km à 20 km).
  L'IPS est rendu avec la virgule décimale française.

### 4. Pied de section

Un unique lien, hors carte, aligné à gauche : « **Télécharger les données filtrées au
format csv** », `ng-href="{{…getDownloadURL('csv')}}"`, `target="_blank"`.
Href relevé avec le refine « Ain » :
`/explore/dataset/donnees-ips-colleges/download/?format=csv&sort=-rentree_scolaire&refine.rentree_scolaire=2023-2024&refine.libelle_departement=Ain`.
Testé en curl : **200**, CSV point-virgule, 11 colonnes, **65 lignes + en-tête**,
`position` sérialisée `lat,lon`. Le lien fonctionne donc bien alors même que le jeu est
`hors catalogue` — la page `/explore/dataset/donnees-ips-colleges/` est servie.

## Défauts et bizarreries de l'original

1. **La carte est centrée sur la Suisse.** `location="5,47.35371,8.98682"` place le
   centre initial près de Zurich ; la France occupe le bord gauche du cadre. C'est le
   premier écran que voit l'utilisateur, et il ne comporte aucune donnée. Le défaut est
   **identique sur les quatre pages IPS**.
2. **La carte est vide au chargement, et le reste tant qu'on n'a pas cliqué.** Le
   `show-if` de la couche exige un refine département *ou* commune. Choisir **une
   académie ne suffit pas** : vérifié, refine « Corse » → 31 collèges annoncés dans la
   facette, **zéro épingle**, la carte conserve son cadrage précédent. Pire : dans un
   enchaînement « Ain → dé-refine → Corse », la carte s'est retrouvée à l'échelle
   **3 000 km** montrant l'Atlantique Sud, l'Afrique et l'Amérique du Sud, sans un seul
   point. Une carte qui n'affiche jamais l'ensemble des données est un choix ; une carte
   qui reste vide sur un filtre que la page propose est un bug.
3. **La facette Commune est plafonnée à 100 valeurs, d'Abbeville à Aramon.** Sur 3 791
   communes, 97 % sont inatteignables tant qu'on n'a pas refiné un département ou une
   académie. Le champ de recherche de facette est présent dans le DOM mais masqué.
4. **Les départements n'affichent pas leur compte** alors que la requête le calcule
   (`select=count(*) as tot`). Les deux listes voisines l'affichent : incohérence visuelle
   à l'intérieur du même panneau.
5. **Aucun sélecteur de rentrée scolaire.** L'année est figée à 2023-2024 par un
   `ng-init`, dans le titre et dans le filtre. Le jeu contient **2024-2025** (6 987
   collèges) depuis la mise à jour de février 2026 : **la page a un an de retard sur sa
   propre source**, et rien dans l'interface ne le signale.
6. **14 collèges fantômes.** 14 lignes de la rentrée 2023-2024 n'ont que `uai`, `secteur`
   et `ips` — pas de nom, pas de commune, pas de département, pas d'académie, pas de
   position (ex. `0931764M` IPS 121,9, `0673212C` IPS 153,6, `0440309X` IPS 72,9). Elles
   sont comptées dans le total du jeu mais **invisibles sur la carte et inatteignables
   par tous les filtres**. La somme des facettes vaut 6 971, pas 6 985 — et la page
   n'affiche nulle part le total, donc l'écart ne se voit pas.
7. **5 collèges sans IPS** (dont le collège Henri IV de Poitiers et l'École Jeannine
   Manuel à Paris 15e) : leur épingle s'affiche avec une infobulle dont la ligne « IPS »
   est vide. Non vu à l'écran (je n'ai pas ouvert ces cinq épingles) — établi à l'API.
8. **Le libellé du champ `rentree_scolaire` commence par un BOM** : la métadonnée `label`
   vaut `"﻿Rentrée scolaire"`. Trace d'un import CSV UTF-8-BOM non nettoyé.
9. **Grille Bootstrap 3 dans une page DSFR.** `col-xs-2` / `col-xs-10` en dur : la
   colonne de filtres est trop étroite pour ses propres libellés à toute largeur d'écran,
   et le CSS de la page se limite à trois règles de `padding-bottom` plus un
   `[href] { background-image: unset }` qui neutralise globalement les icônes de lien
   du DSFR.
10. **Le contexte s'appelle `frenipslyceesdataviz` sur la page collèges** — nom du
    contexte de la page lycées, recopié tel quel. Sans conséquence fonctionnelle, mais
    c'est la signature du copier-coller entre les quatre pages.
11. **L'URL n'est pas un état partageable.** Pas d'`urlsync` : un filtre choisi ne se
    retrouve pas dans l'URL, et un paramètre `refine.*` passé dans l'URL est ignoré
    (vérifié avec `?refine.libelle_departement=Mayotte`). Impossible d'envoyer à
    quelqu'un « la carte des collèges de la Somme ».
12. **La donnée principale n'est pas représentée.** Une carte d'IPS où toutes les
    épingles sont du même rouge : la variable que la page annonce dans son titre n'a
    aucune traduction visuelle. Il faut cliquer chaque épingle, une par une, pour lire
    les 65 valeurs d'un département.
13. **Le jeu source est « hors catalogue »** : `donnees-ips-colleges` est un jeu
    technique (`title: "dataviz2"`) qui n'apparaît pas dans le catalogue du portail. La
    page ne renvoie ni vers lui, ni vers les jeux publics `fr-en-ips_colleges` /
    `fr-en-ips-colleges-ap2023` : l'utilisateur qui veut la série complète ou les IPS de
    référence ne saura pas où aller.

## Transposition vers `dsfr-data`

Attributs vérifiés dans la référence générée depuis le source
(`get_skill(dsfrDataSource|dsfrDataFacets|dsfrDataMap|dsfrDataA11y, "reference")` et
`get_skill(attributeGrammars, "guide")`). Tout attribut non vérifié est signalé comme tel.

| Original Opendatasoft | `dsfr-data` | Attributs nécessaires |
|---|---|---|
| `<ods-dataset-context context="…" …-dataset="donnees-ips-colleges" …-sort="-rentree_scolaire">` | `<dsfr-data-source>` | `api-type="opendatasoft"`, `base-url="https://data.education.gouv.fr"`, `dataset-id="donnees-ips-colleges"`, `server-side`, `page-size`. Pas de clé : le portail répond en anonyme (200 vérifié), donc **pas d'`api-key-ref`**, contrairement aux pages Bercy. |
| `ng-init="…parameters['refine.rentree_scolaire']='2023-2024'"` | même balise | `where="rentree_scolaire = '2023-2024'"` (dialecte ODSQL côté `dsfr-data-source`, cf. `attributeGrammars`). Un `where` sur la balise déjà présente plutôt qu'un composant de plus (règle PG-015). |
| `<ods-facet name="libelle_academie" sort="alphanum">` | `<dsfr-data-facets>` | `server-facets`, `fields="libelle_academie, libelle_departement, libelle_commune"` (virgules), `labels="libelle_academie:Académie \| libelle_departement:Département \| libelle_commune:Commune"` (barres), `sort="alpha:asc"`. |
| Liste maison `ods-adv-analysis` + `limitTo:nbdepts` + « > Plus » | même `<dsfr-data-facets>` | `display="libelle_departement:select"` ou le repli `max-values="10"` qui rend nativement le « Voir plus ». La liste maison de l'original **n'a pas de raison d'être** : elle réimplémente à la main ce que la facette fait déjà — et perd le compteur au passage. |
| Facette Commune plafonnée à 100 valeurs | même `<dsfr-data-facets>` | `display="libelle_commune:radio"` (dropdown avec recherche intégrée, cf. tableau `display` de `attributeGrammars`) ou `searchable="libelle_commune"`. |
| `<ods-map location="5,47.35371,8.98682" ods-auto-resize>` | `<dsfr-data-map>` | `center="46.6,2.3"`, `zoom="6"`, `height`, `tiles="ign-plan"`, `tiles-style="muted"`, `fit-bounds`, `fit-max-zoom="13"`, `name` (nom accessible). `ods-auto-resize` n'a pas d'équivalent : la carte est responsive par construction. |
| `<ods-map-layer show-if="…">` (épingles rouges uniformes, jamais affichées sans refine) | `<dsfr-data-map-layer>` | `source`, `type="circle"`, `geo-field="position"`, `fill-field="ips"`, `classes`, `method="quantile"`, `selected-palette="divergentAscending"`, `radius`, `max-items` (défaut 5 000 < 6 985 : **à relever**). Pas de `show-if` : la couche affiche ce que la source publie, et on lui donne toute la France dès le départ. |
| Infobulle par défaut (5 champs) | `<dsfr-data-map-popup>` + `<template>` | `mode="panel-right"`, `title-field="appellation_officielle"`, `width`. Le `<template>` interpole `{{champ\|défaut}}` (idiome déjà employé dans `public/viz/qualite-tourisme.html`). |
| — (absent de l'original) | `<dsfr-data-map-legend>` | `label="IPS 2023-2024"` — la légende que la carte d'origine ne peut pas avoir puisqu'elle n'encode rien. |
| — (absent de l'original) | `<dsfr-data-kpi>` × 3 | `value="meta:total"` (**pas `count`** : en `server-side`, `count` ne compte que la page reçue, cf. JSDoc de `value`, #659), `value="ips:avg"`, `format="decimal"`, `decimals="1"`, `heading`, `label`, `col` — le total, l'IPS moyen de la sélection, l'IPS le plus élevé. |
| `<a ng-href="{{…getDownloadURL('csv')}}">` | `<dsfr-data-a11y>` | `download`, `filename="ips-colleges-2023-2024.csv"`, `table`, `for` (lien ARIA vers la carte). Le CSV part des données de la sélection courante ; en plus, on gagne le **tableau accessible** que l'original n'a pas. |
| — (absent de l'original) | `<dsfr-data-context-tags>` | rappel supprimable des filtres actifs. **Attention** : sa référence ne lui donne qu'un attribut, `for` = *id d'un `dsfr-data-context`* — il n'observe donc **pas** un `dsfr-data-facets`. Le poser suppose de basculer les filtres sur un `dsfr-data-context` + `dsfr-data-context-filter`, ce qui change l'architecture de la page. **Non vérifié**, écarté de l'esquisse. |

### Esquisse de code

```html
<!-- 6 985 collèges, 11 champs : pas de clé, le portail éducation répond en anonyme. -->
<dsfr-data-source id="ips"
  api-type="opendatasoft"
  base-url="https://data.education.gouv.fr"
  dataset-id="donnees-ips-colleges"
  where="rentree_scolaire = '2023-2024' and position is not null"
  server-side page-size="100"
  max-records="8000">
</dsfr-data-source>

<div class="fr-container fr-mt-6w">
  <h1>Indice de position sociale des collèges — rentrée 2023-2024</h1>
  <p class="fr-text--lead">
    L'IPS résume la position sociale des familles des élèves d'un établissement.
    La moyenne nationale des 6 980 collèges renseignés est de 104,7 ; l'échelle
    observée va de 54,9 à 161,9.
  </p>

  <div class="fr-grid-row fr-grid-row--gutters">
    <div class="fr-col-12 fr-col-md-3">
      <h2 class="fr-h6">Filtrer</h2>
      <dsfr-data-facets id="ips-f" source="ips" server-facets
        fields="libelle_academie, libelle_departement, libelle_commune, secteur"
        labels="libelle_academie:Académie | libelle_departement:Département | libelle_commune:Commune | secteur:Secteur"
        display="libelle_academie:select | libelle_departement:select | libelle_commune:radio | secteur:checkbox"
        sort="alpha:asc">
      </dsfr-data-facets>
    </div>

    <div class="fr-col-12 fr-col-md-9">
      <dsfr-data-kpi-group class="fr-mb-3w">
        <!-- meta:total, pas count : en server-side, count ne compte que la page reçue (#659). -->
        <dsfr-data-kpi source="ips-f" value="meta:total" format="nombre" col="4"
          heading="Sélection" label="collèges"></dsfr-data-kpi>
        <!-- ips:avg s'évalue sur les lignes REÇUES : juste seulement si la source
             charge tout côté client. Voir « Limites », point 7. -->
        <dsfr-data-kpi source="ips-f" value="ips:avg" format="decimal" decimals="1" col="4"
          heading="IPS moyen" label="de la sélection"></dsfr-data-kpi>
        <dsfr-data-kpi source="ips-f" value="ips:max" format="decimal" decimals="1" col="4"
          heading="IPS le plus élevé" label="de la sélection"></dsfr-data-kpi>
      </dsfr-data-kpi-group>

      <dsfr-data-map id="carte-ips" name="Collèges de France et leur indice de position sociale"
        center="46.6,2.3" zoom="6" height="620px"
        tiles="ign-plan" tiles-style="muted"
        fit-bounds fit-max-zoom="13" fit-zone="none">
        <dsfr-data-map-layer source="ips-f" type="circle"
          geo-field="position" radius="5"
          fill-field="ips" classes="5" method="quantile"
          selected-palette="divergentAscending"
          tooltip-field="appellation_officielle"
          max-items="8000" cluster>
        </dsfr-data-map-layer>
        <dsfr-data-map-legend for="carte-ips" label="Indice de position sociale"></dsfr-data-map-legend>
        <dsfr-data-map-popup mode="panel-right" title-field="appellation_officielle" width="360px">
          <template>
            <p class="fr-badge fr-badge--sm fr-mb-2v">{{secteur|secteur non renseigné}}</p>
            <p class="fr-display--xs fr-mb-1v">{{ips|—}}</p>
            <p class="fr-text--sm fr-mb-2v">Indice de position sociale, rentrée {{rentree_scolaire}}</p>
            <p class="fr-text--sm fr-mb-1v"><strong>{{libelle_commune|commune non renseignée}}</strong>
               — {{libelle_departement|}}, académie de {{libelle_academie|}}</p>
            <p class="fr-text--xs fr-mb-0 odv-rubrique" data-intitule="UAI">{{uai}}</p>
          </template>
        </dsfr-data-map-popup>
      </dsfr-data-map>

      <dsfr-data-a11y source="ips-f" for="carte-ips" table download
        filename="ips-colleges-2023-2024.csv"
        label="Données de la carte"
        label-field="appellation_officielle"
        value-field="ips, libelle_commune, libelle_departement, libelle_academie, secteur">
      </dsfr-data-a11y>
    </div>
  </div>
</div>
```

## Limites et points durs identifiés

1. **`max-items` de la couche (5 000 par défaut) est sous les 6 985 collèges.**
   Obstacle : un plafond dépassé tronque avec un bandeau « zoomez » qui ne charge rien
   de plus (piège PG-013 déjà payé). Voie native : `max-items="8000"`, et
   `cluster` — la référence dit explicitement qu'avec `cluster`, un `max-items` de
   20 000 est sans risque parce que les marqueurs regroupés ne pèsent pas sur le DOM.
   Contournement écarté : `bbox` (chargement par viewport) — la référence prévient que
   le tout premier fetch reste non filtré, donc ça n'économise rien ici et ça casserait
   le rendu « toute la France » qui est précisément ce qu'on veut corriger.
   **Non vérifié au navigateur** : il faut mesurer le rendu de 6 985 cercles.

2. **`max-records` de la source (1 000 par défaut sur l'adaptateur ODS).**
   Obstacle : le piège maison — tronque **en silence**. Voie native : `max-records="8000"`
   posé explicitement. Mais attention, la référence prévient que le `fetchAll` se fait
   « en boucle » : à 100 records par requête, 6 985 lignes = 70 allers-retours en série.
   **À chronométrer avant de conclure** (règle du dépôt) ; si c'est trop lent, l'autre
   voie est la source générique sur `/exports/json` (`url=` + `params`), qui ramène tout
   en une requête — au prix de la perte du mode `server-side` / `server-facets`.
   C'est le vrai arbitrage de cette page, et il n'est pas tranché sans mesure.

3. **`insets="drom"` et le clip du `fit-bounds`.** Le jeu contient bien des points
   ultramarins (Guadeloupe 52, Martinique 50, Guyane 38, La Réunion 87, Mayotte 22, plus
   Saint-Barthélemy et Saint-Martin), donc des encarts sont justifiés. Mais la référence
   de `fit-zone` est explicite : **dès qu'un encart ultramarin est présent, le fit est
   clippé sur la métropole par défaut** — filtrer sur « Guadeloupe » recadrerait donc
   sur… rien (variante de BUG-004). Voie native : `fit-zone="none"` pour rendre le fit
   libre, ou renoncer aux encarts et laisser le fit suivre les données. L'esquisse
   ci-dessus prend `fit-zone="none"` sans encart. **À vérifier au navigateur** : c'est
   le point le plus susceptible de mordre.

4. **Le plafond de valeurs de `server-facets` sur `libelle_commune` (3 791 valeurs).**
   C'est le défaut n° 3 de l'original ; il n'est pas dit que `dsfr-data` fasse mieux :
   l'API ODS `/facets` a elle aussi un plafond. Voie native à essayer **avant** de
   conclure : `display="libelle_commune:radio"` (le dropdown de la référence embarque
   une recherche) et la cascade native de `server-facets` (choisir un département réduit
   la liste des communes côté serveur, avec les bons compteurs). **Non vérifié** : il
   faut compter les valeurs réellement rendues par la facette commune en mode serveur,
   sans refine amont. Si le plafond tient, la voie honnête est un
   `dsfr-data-search server-search` sur `libelle_commune` plutôt qu'une facette.

5. **Choroplèthe de points : `fill-field` sur un `type="circle"`.** L'IPS est un double
   continu de 54,9 à 161,9 ; la référence donne `fill-field` + `classes` + `method`
   + `selected-palette`, et `getLegendEntries()` alimente `dsfr-data-map-legend`.
   Point non tranché : la palette adaptée est **divergente** (l'IPS a un centre de
   lecture, la moyenne nationale ~104,7), or `method="quantile"` place les bornes sur
   les effectifs, pas autour de 104,7. Voie native : `method="manual"` +
   `breaks="85,100,115,130"` pour caler les classes sur des seuils lisibles.
   **Non vérifié** : le rendu des cinq classes et la lisibilité de la légende.

6. **Les 14 lignes sans position.** `getSkippedCount()` de la couche les compterait,
   mais elles fausseraient un KPI `count`. Voie native retenue dans l'esquisse :
   `where="… and position is not null"` sur la source (dialecte ODSQL, cf.
   `attributeGrammars` § valeurs nulles) — le KPI compte alors 6 971, ce que la carte
   montre effectivement. À dire dans la page : 14 collèges sont exclus faute de
   localisation. C'est *plus* honnête que l'original, qui les compte sans le dire.

7. **Le KPI « IPS moyen » et la pagination serveur se contredisent.**
   Obstacle : la grammaire `champ:fn` d'un `dsfr-data-kpi` s'évalue sur **les données
   reçues** ; derrière une source `server-side page-size="100"`, `ips:avg` ne moyennerait
   que la page courante. `meta:total` règle le cas du compte (JSDoc de `value`, #659)
   mais il n'existe pas d'équivalent pour une moyenne. Voie native : un
   `<dsfr-data-source>` d'agrégation dédié — `select="avg(ips) as ips_moyen"` +
   `limit="1"` côté ODS — branché sur le même `where`, et un KPI `value="ips_moyen:max"`
   (le piège maison « `select=…` sans `group_by` renvoie la valeur répétée » impose
   `limit="1"` et une lecture en `:max`). Contrepartie : ce second contexte n'écoute pas
   les facettes, donc le KPI ne suivrait pas la sélection. Arbitrage à trancher :
   soit un chargement complet côté client (et alors `ips:avg` marche partout, cf. point 2),
   soit un KPI global figé à côté d'une carte filtrée. **Non vérifié au navigateur.**

8. **Ce qui ne se transpose pas, et n'a pas à l'être.**
   - Les outils de dessin de zone (`polygone / rectangle / cercle`) d'`ods-map` :
     pas d'équivalent dans `dsfr-data-map` (aucun attribut de dessin dans la référence).
     Ce n'est pas une limite de la bibliothèque au sens du dépôt — c'est une
     fonctionnalité d'ODS qu'on remplace par les facettes géographiques, qui répondent au
     même besoin de manière plus lisible. À noter comme **écart assumé**, pas comme manque.
   - Le géocodeur « Trouver un lieu… » : idem, aucun attribut de géocodage dans la
     référence. Substitut : la facette Commune en `radio` (avec recherche).
   - La grille `col-xs-*` : à ne pas reproduire, c'est le défaut n° 9.

9. **Point dur d'énoncé, pas de technique : la page n'a pas de contenu.** La
   reproduire « à l'identique » produirait une page vide de sens. La transposition
   utile ajoute une définition de l'IPS, une légende, une moyenne, et le comparatif
   public / privé — tout cela est dans le jeu, aucun n'est dans la page. C'est le lot
   où le « pas un clone pixel » se voit le plus.

## Données à reproduire fidèlement

- [ ] Jeu `donnees-ips-colleges`, rentrée **2023-2024** — **6 985** lignes,
      dont **6 971** localisables et **6 980** avec un IPS.
- [ ] IPS min **54,9** / max **161,9** / moyenne **104,73** (2 décimales à l'API,
      1 décimale dans la donnée source).
- [ ] Secteur : public **5 321** (IPS moyen 100,15) / privé sous contrat **1 664**
      (IPS moyen 119,43).
- [ ] Facette Académie : **30** valeurs, tri alphabétique, comptes exacts (Versailles 530,
      Créteil 440, Lille 436, Nantes 410 en tête ; Mayotte 22 et Corse 31 en queue).
- [ ] Facette Département : **103** valeurs, avec leur compte (Nord 279, Bouches-du-Rhône
      191, Paris 178, Rhône 173, Seine-Saint-Denis 158, Pas-de-Calais 157 en tête ;
      Ariège 17, Alpes-de-Haute-Provence 21 en queue). **Le compte, que l'original omet.**
- [ ] Facette Commune : **3 791** valeurs — et non 100. C'est le test de fidélité
      qui distingue une reproduction d'un décalque.
- [ ] Infobulle : les 5 champs de l'original (rentrée, UAI, commune, appellation, IPS)
      **au minimum**, IPS en virgule décimale française.
- [ ] Téléchargement CSV de la sélection courante.
- [ ] Cadrage initial **sur la France**, pas sur la Suisse.
- [ ] Carte non vide au chargement : les 6 971 collèges localisés visibles d'emblée.

## Gabarit partagé

Les quatre pages IPS (Écoles id 34, **Collèges id 31**, Lycées id 32, EREA id 35) sont
**le même fichier**, à un attribut près. Vérifié en récupérant les quatre `$scope.blocks`
et en les comparant champ par champ.

**Strictement identique sur les quatre :**

- Le bloc CSS, aux quatre octets près : `[href] { background-image: unset }`,
  `.odswidget-facet li { padding-bottom: 0 }`, `.li-serre { padding-bottom: 0 }`,
  `.liste-depts { padding-bottom: 1rem }`.
- Le nom du contexte : **`frenipslyceesdataviz`** sur les quatre pages — y compris
  écoles, collèges et EREA.
- `ng-init="nbdepts=10; …parameters['refine.rentree_scolaire']='2023-2024';"`.
- `<ods-map location="5,47.35371,8.98682" ods-auto-resize>` — **le centrage sur la
  Suisse est le même partout**.
- Le `show-if` de la couche (département **ou** commune), donc la carte vide au
  chargement sur les quatre.
- Les trois H3 « Académie / Département / Commune », `<ods-facet name="libelle_academie"
  sort="alphanum">`, la liste maison `ods-adv-analysis-group-by="libelle_departement"
  ods-adv-analysis-select="count(*) as tot"` sans affichage du compte, et
  `<ods-facet name="libelle_commune" sort="alphanum">`.
- Le H4 conditionnel « Sélectionnez un département ou une commune ».
- Le lien final `getDownloadURL('csv')`.
- La grille Bootstrap `col-xs-2` / `col-xs-10`.
- Le H1, au seul mot près : « Indices de position sociale des **écoles / collèges /
  lycées / EREA** de France pour l'année scolaire 2023-2024 ».

**Ce qui diffère :**

| | Écoles | **Collèges** | Lycées | EREA |
|---|---|---|---|---|
| Jeu technique | `donnees-ips-ecoles` | **`donnees-ips-colleges`** | `donnees-ips-lycees` | `donnees-ips-erea` |
| Titre interne du jeu | `dataviz3` | **`dataviz2`** | `dataviz1` | `dataviz4` |
| Lignes (toutes rentrées) | 279 318 | **62 646** | 32 618 | 706 |
| Champs | 29 | **11** | 13 | 24 |
| `…-sort="-rentree_scolaire"` | **absent** | présent | présent | présent |
| Champ(s) d'IPS | `ips` + national/académique/départemental (public, privé, ensemble) | **`ips` seul** | `ips_voie_gt`, `ips_voie_pro`, `ips_ensemble_gt_pro` (**pas de champ `ips`**) | `ips` + national/académique/départemental |

**Deux conséquences pour la factorisation :**

1. **Collèges est le cas le plus pauvre en données** : une seule colonne d'IPS, aucune
   valeur de référence. Les pages Écoles et EREA pourraient afficher un écart à la
   moyenne nationale / académique / départementale — aucune ne le fait, mais seule la
   page Collèges en est *empêchée* par son jeu. Une transposition factorisée doit donc
   paramétrer « les champs d'IPS à afficher » : 1 pour collèges, **3 pour lycées**
   (`ips_voie_gt` / `ips_voie_pro` / `ips_ensemble_gt_pro`, ce qui change la maquette de
   l'infobulle et interdit une choroplèthe à un seul `fill-field`), 4+ pour écoles/EREA.
2. **Un bug propre aux lycées** : le `ng-show` du H4 y teste
   `refine.nom_de_la_commune`, alors que le jeu `donnees-ips-lycees` n'a pas ce champ
   (sa colonne s'appelle `libelle_commune`, comme partout, et c'est bien elle que la
   facette utilise). Sur la page lycées, l'invite « Sélectionnez un département ou une
   commune » ne devrait donc **pas** disparaître quand on choisit une commune seule.
   Non vérifié à l'écran ici — c'est le périmètre de l'agent lycées, à qui le constat
   est renvoyé.

Autrement dit : **un seul gabarit `dsfr-data` suffit pour les quatre pages**, paramétré
par (a) le `dataset-id`, (b) la liste des champs d'IPS et (c) le libellé du type
d'établissement. Les treize défauts relevés plus haut, sauf le n° 6 (les 14 lignes
orphelines, à recompter par jeu) et le n° 13, sont communs aux quatre et se corrigent
une seule fois.
