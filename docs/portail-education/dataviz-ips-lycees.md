# IPS Lycées

- **URL** : https://data.education.gouv.fr/pages/dataviz-ips-lycees/
- **Catalogue** : id **32**, thématique **Éducation**, sous-thématique **Lycées**.
  Titre « IPS Lycées », description « Indices de position sociale des lycées de France
  pour l'année scolaire 2023-2024 ».
  Vignette `/assets/theme_image/preview-dataviz-ips-lycees.jpg`.
- **Producteur (métadonnée du jeu)** : DEPP — Ministère en charge de l'éducation
  nationale. Licence ouverte v2.0 (Etalab).
- **Jeu de données utilisé par la page** : **`donnees-ips-lycees`** — **32 618 lignes**
  toutes rentrées, **3 612 pour 2023-2024**. Jeu technique `hors catalogue`
  (titre interne `dataviz1`, description « Jeu de données technique, utilisé par une page
  de dataviz. »), lisible **sans clé**. C'est le jeu dont le nom a été donné au contexte
  AngularJS des quatre pages (`frenipslyceesdataviz`) : la page lycées est
  vraisemblablement l'original du gabarit.
  - **13 champs** : `rentree_scolaire` (text), `uai`, `secteur`,
    **`ips_voie_gt`** (double), **`ips_voie_pro`** (double),
    **`ips_ensemble_gt_pro`** (double), `appellation_officielle`, `libelle_commune`
    (label « Commune »), `code_departement`, `code_commune`, `libelle_departement`
    (label « Département »), `libelle_academie` (label « Académie »),
    `position` (geo_point_2d).
  - **Pas de champ `ips`.** Pas non plus de colonnes de référence nationale /
    académique / départementale (contrairement aux jeux écoles et EREA).
  - Facettes déclarées au back-office : `rentree_scolaire`, `libelle_commune`,
    `libelle_departement`, `libelle_academie` — les mêmes que celles qu'utilise la page.
  - Répartition par rentrée : 2024-2025 3 631 · **2023-2024 3 612** · 2022-2023 3 598 ·
    2021-2022 3 607 · 2020-2021 3 611 · 2019-2020 3 621 · 2018-2019 3 634 ·
    2017-2018 3 656 · 2016-2017 3 648. Neuf rentrées.
- **Relevé visuel** : 2026-09-10, Chrome, fenêtre 1568 × 751, onglet dédié.

## Objectif de la dataviz et informations véhiculées

- **Question à laquelle elle répond** : « Où sont les lycées de mon département ou de ma
  commune, et quel est leur indice de position sociale ? » Localisateur d'établissement
  avec une valeur attachée — même objet que les trois pages sœurs.
- **Message porté** : aucun, comme sur les trois autres. Pas de chapô, pas de définition
  de l'IPS, pas de moyenne, pas de comparaison.
- **Information que l'utilisateur doit obtenir** : pour un lycée donné — rentrée, UAI,
  commune, appellation officielle, **et son ou ses IPS par voie** (générale et
  technologique, professionnelle), lus dans l'infobulle ; et le CSV filtré.
- **Ce qui n'est pas dans l'objet** — les cinq manques communs (cf.
  [dataviz-ips-colleges.md](dataviz-ips-colleges.md) § « Objectif »), plus deux points
  propres aux lycées :
  - **la distinction des voies n'est pas expliquée.** L'infobulle affiche « IPS voie GT »
    et « IPS voie PRO » sans dire ce que recouvrent les sigles, ni pourquoi certains
    établissements en ont un et d'autres deux. Sur 3 612 lycées : **1 522 n'ont que GT,
    1 117 n'ont que PRO, 951 ont les deux, 22 n'ont ni l'un ni l'autre.** Le lecteur qui
    compare deux bulles compare parfois deux grandeurs différentes, sans en être averti ;
  - **la moyenne GT et la moyenne PRO ne sont pas du même ordre** — 116,3 contre 91,6,
    soit **24,8 points d'écart**. C'est le fait structurant du jeu, et la page ne le
    porte nulle part.

## Chiffres de référence (API v2.1, rentrée 2023-2024)

| Mesure | Valeur |
|---|---|
| Lycées (lignes) | **3 612** |
| Lignes sans `position` / `libelle_*` / `appellation_officielle` | **20** (les mêmes) |
| `ips_voie_gt` renseigné | 2 473 — **1 139 nuls**. Min **57,7** / max **162,6** / moyenne **116,33** |
| `ips_voie_pro` renseigné | 2 068 — **1 544 nuls**. Min **62,0** / max **138,2** / moyenne **91,58** |
| `ips_ensemble_gt_pro` renseigné | **0 — nul sur les 3 612 lignes** (cf. « Défauts » n° 1) |
| GT seul / PRO seul / les deux / ni l'un ni l'autre | **1 522 / 1 117 / 951 / 22** |
| Secteur `public` | 2 400 lignes — IPS GT moyen **110,26**, PRO moyen **87,01** |
| Secteur `privé sous contrat` | 1 212 lignes — IPS GT moyen **127,86**, PRO moyen **104,40** |
| Académies distinctes | **30** (+ 1 groupe `null` de 20 lignes) — somme des comptes **3 592** |
| Départements distincts | **102** (+ 1 `null`) — un de moins que collèges et écoles : **pas de Saint-Barthélemy** |
| Communes distinctes | **1 392** (+ 1 `null`) |
| Communes du département le plus étendu | **57** (Nord), puis Seine-et-Marne 42, Bouches-du-Rhône 37 — **aucun département ne dépasse 100 communes** |
| Départements les plus fournis | Paris 158 · Nord 153 · Bouches-du-Rhône 122 · Rhône 115 · Seine-Saint-Denis 94 · Gironde 82 |
| Académies les plus fournies | Versailles 272 · Créteil 228 · Lille 226 · Lyon 200 · Bordeaux 191 · Nantes 185 |
| IPS GT le plus élevé | Lycée franco-allemand de Buc **162,6** ; École active Jeannine Manuel, Paris 15ᵉ 161,5 |
| IPS GT le plus bas | Lycée polyvalent E. Bugatti, Illzach **57,7** ; Lycée polyvalent Gustave Eiffel de Kahani, Ouangani 62,5 |

## Le template AngularJS

```html
<ods-dataset-context context="frenipslyceesdataviz"
                     frenipslyceesdataviz-dataset="donnees-ips-lycees"
                     frenipslyceesdataviz-sort="-rentree_scolaire">
```

Structure identique à celle décrite dans
[dataviz-ips-colleges.md](dataviz-ips-colleges.md) § « Le template AngularJS » :
`ng-init="nbdepts=10; …['refine.rentree_scolaire']='2023-2024';"`, deux `ods-facet`
(`libelle_academie`, `libelle_commune`), liste maison `ods-adv-analysis` sur
`libelle_departement` avec `select="count(*) as tot"` non affiché,
`<ods-map location="5,47.35371,8.98682" ods-auto-resize>`, couche conditionnée par
`show-if="…refine.libelle_departement || …refine.libelle_commune"`, lien
`getDownloadURL('csv')`, grille Bootstrap `col-xs-2` / `col-xs-10`, aucun `ctx-apikey`,
aucun `urlsync`.

**La divergence propre à la page lycées** est dans le `ng-show` du H4 :

```html
<span ng-show="!(frenipslyceesdataviz.parameters['refine.libelle_departement']
             || frenipslyceesdataviz.parameters['refine.nom_de_la_commune'])">
      Sélectionnez un département ou une commune</span>
```

`nom_de_la_commune` **n'existe pas dans `donnees-ips-lycees`** (le jeu écoles l'a, pas
celui-ci) et n'est jamais refiné par la page, dont la facette Commune porte sur
`libelle_commune`. Conséquence vérifiée à l'écran, cf. « Défauts » n° 2.

Autre divergence mineure, à l'inverse des écoles : les liens « > Plus » / « > Moins »
testent bien `!…['refine.libelle_departement']`, donc ils **disparaissent** après un
refine de département — comportement correct, contrairement à la page écoles.

## Relevé visuel exhaustif

### 1. Bandeau de titre

Fond gris clair pleine largeur, un H1 en gras : « Indices de position sociale des lycées
de France pour l'année scolaire 2023-2024 ». Pas de chapô, pas de lien vers le jeu.

**Anomalie de structure du template** : le fragment lycées ferme un `</div>`
supplémentaire après le bandeau et n'en rouvre pas — le `<section>` des filtres et de la
carte se retrouve hors du conteneur gris, là où les trois autres pages le laissent
dedans. Sans effet visible à l'écran (les deux blocs sont pleine largeur), mais c'est
une trace de plus du copier-coller.

### 2. Colonne de gauche — les filtres (`col-xs-2`, ~185 px)

Mise en page et comportements identiques à la page collèges
([dataviz-ips-colleges.md](dataviz-ips-colleges.md) § 2) : H4 conditionnel, trois blocs,
6 valeurs visibles + « Plus », champ de recherche de facette invisible, libellés coupés
en plein mot.

**Ce qui diffère — les valeurs réelles :**

**a. Facette « Académie »** — 30 valeurs après « Plus ». Relevées à l'écran avec leurs
comptes : Aix-Marseille 168 · Amiens 121 · Besançon 65 · Bordeaux 191 ·
Clermont-Ferrand 77 · Corse 15 · Créteil 228 · Dijon 74 · Grenoble 171 · Guadeloupe 33 ·
Guyane 18 · La Réunion 48 · Lille 226 · Limoges 50 · Lyon 200 · Martinique 30 ·
Mayotte 11 · Montpellier 108 · Nancy-Metz 143 · Nantes 185 · Nice 88 · Normandie 185 ·
Orléans-Tours 120 · Paris 158 · Poitiers 87 · Reims 70 · Rennes 176 · Strasbourg 94 ·
Toulouse 180 · Versailles 272. **Somme 3 592 ; 20 lycées n'ont pas d'académie.**

**b. Liste « Département »** — 10 entrées, puis « > Plus » → **102** entrées
(Ain … Yvelines, comptées dans le DOM), puis « > Moins ». Aucun compteur affiché.
Même collation brute (« Alpes-Maritimes » avant « Alpes-de-Haute-Provence »).

**c. Facette « Commune »** — **100 valeurs dans le DOM**, d'**Abbeville** (4) à
**Barberaz** (1), sur **1 392 communes** : la troncature s'arrête en milieu de « Ba ».
Six valeurs visibles au chargement : Abbeville 4 · Abondance 1 · Achères 1 · Acoua 1 ·
Agde 1 · Agen 4.

### 3. Colonne de droite — la carte (`col-xs-10`)

**Au chargement** : identique aux trois autres pages — `location="5,47.35371,8.98682"`,
zoom 5 sur la Suisse, échelle 300 km, **zéro épingle** (vérifié :
`.leaflet-marker-icon` → 0). Fond IGN/Huwise raster couleur non atténué, mêmes contrôles
(plein écran, dessin de zone, zoom, géocodeur, géolocalisation, calques, échelle).

**Après un refine commune** (« Agen », 4 lycées) : recadrage à l'échelle **500 m**,
**4 épingles rouges individuelles**. La liste Département se réduit à
« Lot-et-Garonne », la facette Académie à « Bordeaux 4 ».
Aux volumes de ce jeu (max 158 lycées sur Paris), le clustering automatique d'ODS —
observé sur la page écoles à partir de ~344 points — **ne se déclenche jamais** :
la carte lycées montre toujours des épingles individuelles.

**Infobulle au clic.** Relevées mot pour mot :

| Établissement | Contenu de la bulle |
|---|---|
| Lycée général et technologique Bernard Palissy (Agen) | Rentrée scolaire **2023-2024** · UAI **0470001W** · Commune **Agen** · Appellation officielle **Lycée général et technologique Bernard Palissy** · IPS voie GT **110** |
| Lycée général et technologique Jean-Baptiste de Baudre (Agen) | … · UAI 0470003Y · Commune Agen · … · IPS voie GT **106,3** |
| Lycée général et technologique privé Saint Caprais (Agen) | … · UAI 0470060K · … · IPS voie GT **129,6** |
| **Lycée polyvalent Théodore Deck (Guebwiller)** | … · UAI **0680016Y** · Commune **Guebwiller** · … · **IPS voie GT 116,6** · **IPS voie PRO 90,3** |

**La bulle affiche donc bien les deux voies quand elles existent** — la configuration
back-office liste `ips_voie_gt` et `ips_voie_pro`, et ODS masque la ligne dont la valeur
est nulle. Le prétendu défaut « la page ne montre qu'un seul des trois champs d'IPS »
**ne tient pas** : elle en montre deux sur deux disponibles.
Le troisième, `ips_ensemble_gt_pro`, est **nul sur toutes les lignes de 2023-2024** ;
impossible de dire s'il figure ou non dans la configuration de la bulle, puisqu'une
valeur nulle est masquée dans les deux cas. **Indéterminable en l'état.**

Autres observations sur la bulle, communes aux quatre pages : le premier libellé porte
un **BOM** (`"﻿Rentrée scolaire"`, lu dans `.leaflet-popup-content`) ; **six champs
sont écartés** (`secteur`, `ips_ensemble_gt_pro`, `code_departement`, `code_commune`,
`libelle_departement`, `libelle_academie`, `position`) ; le libellé de commune est
« Commune » (label du champ dans ce jeu) et la valeur est en casse normale — « Agen »,
pas « AGEN » comme sur la page écoles ; **`110` s'affiche sans décimale** là que
`106,3` en porte une (l'entier `110.0` est rendu `110`).

### 4. Pied de section

Un lien : « Télécharger les données filtrées au format csv »,
`ng-href="{{…getDownloadURL('csv')}}"`, `target="_blank"`. Même mécanique que sur la page
collèges (CSV point-virgule des lignes filtrées, servi malgré le statut
`hors catalogue`) ; ici 13 colonnes.

## Défauts et bizarreries de l'original

Les défauts **1, 2, 3, 4, 5, 8, 9, 10, 11, 12 et 13** de la page collèges
([dataviz-ips-colleges.md](dataviz-ips-colleges.md) § « Défauts ») se retrouvent
**à l'identique** : carte centrée sur la Suisse, carte vide au chargement (un refine
d'académie ne suffit pas), facette Commune plafonnée à 100 valeurs, départements sans
compteur, aucun sélecteur de rentrée, BOM sur le libellé, grille Bootstrap 3 dans une
page DSFR, contexte nommé `frenipslyceesdataviz`, URL non partageable, donnée principale
non représentée, jeu source hors catalogue. Ce qui suit est **spécifique aux lycées**.

1. **La colonne de synthèse `ips_ensemble_gt_pro` est vide précisément sur l'année que
   la page affiche.** Elle est renseignée sur les sept rentrées **2016-2017 à 2022-2023**
   (25 375 lignes non nulles) et **nulle sur 2023-2024 et 2024-2025** — les deux
   rentrées les plus récentes, dont celle que la page fige par `ng-init`.
   L'indicateur qui permettrait de comparer un lycée polyvalent à un lycée général
   d'un seul chiffre n'existe donc pas pour l'année affichée. La page ne le signale pas
   (elle ne pouvait pas : la ligne nulle est simplement absente de la bulle).

2. **Le `ng-show` du H4 teste un champ inexistant — et le bug est visible.**
   `refine.nom_de_la_commune` n'est jamais posé, et la colonne n'existe pas dans ce jeu.
   Vérifié à l'écran, refine « Agen » seul : la carte affiche bien les 4 lycées à
   l'échelle 500 m (le `show-if` de la couche, lui, teste correctement
   `refine.libelle_commune`), la facette Commune montre « Agen 4 » en surbrillance,
   la liste Département montre « Lot-et-Garonne » — **et le H4 « Sélectionnez un
   département ou une commune » reste affiché**, `offsetHeight` 160 px, span visible.
   L'invite occupe le quart supérieur de la colonne de filtres et demande à l'utilisateur
   de faire ce qu'il vient de faire.
   Portée exacte du bug : il ne se déclenche **que** sur un refine de commune **seul**.
   Sur un refine de département (ou département + commune), la première branche du
   `ng-show` suffit et le H4 disparaît normalement. Sur les trois autres pages, le test
   porte sur `refine.libelle_commune` et le H4 disparaît dans les deux cas
   (vérifié sur écoles et EREA).

3. **Deux échelles distinctes affichées sous le même nom d'« indice ».** GT et PRO ne
   sont pas comparables : moyennes 116,3 et 91,6, plages 57,7–162,6 et 62,0–138,2.
   Sur les 951 lycées polyvalents, la bulle superpose les deux sans un mot d'explication ;
   sur les 2 639 autres, elle n'en montre qu'un, et rien ne dit lequel manque ni pourquoi.
   Une carte qui colorerait « l'IPS » sur ce jeu — ce que la page ne fait pas, mais que
   toute transposition est tentée de faire — mélangerait deux populations.

4. **22 lycées sans aucun IPS** (ni GT ni PRO) sur 3 612. Leur épingle s'affiche avec une
   bulle à quatre lignes au lieu de cinq (la ligne d'IPS est **absente**, pas vide —
   comportement observé sur la page EREA, cf. sa fiche). Non ouvert à l'écran sur les
   lycées ; établi à l'API et par analogie de mécanique de bulle.

5. **20 lycées fantômes** : lignes sans `position`, sans `libelle_departement`, sans
   `libelle_academie`, sans `libelle_commune`, sans `appellation_officielle`. Comptées
   dans le total 3 612, invisibles sur la carte, inatteignables par les trois filtres.
   La somme des facettes d'académie vaut 3 592, et la page n'affiche nulle part le total :
   l'écart ne se voit pas. (14 sur collèges, 304 sur écoles.)

6. **Un `110` sans décimale à côté d'un `106,3`.** L'entier IEEE `110.0` est rendu
   « 110 ». Cosmétique, mais dans une colonne de valeurs à une décimale, ça se voit.

7. **Un `</div>` en trop dans le template** (cf. § « Relevé visuel », bandeau de titre) :
   la section principale sort du conteneur du bandeau. Sans effet visible.

8. **Aucun sélecteur de rentrée alors que 2024-2025 est chargé** (3 631 lycées), comme
   sur les trois pages sœurs.

## Chronométrage

Mesures Node (`fetch`, gzip actif), 2026-09-10, rentrée 2023-2024, 3 612 lignes.

| Voie | Allers-retours | Durée |
|---|---:|---:|
| `/exports/json?limit=-1` | **1** | **643 ms** |
| `/records?limit=100` paginé en série (ce que fait l'adaptateur ODS) | **37** | **3 430 ms** |
| `/records` une page `server-side` (page-size 100) | 1 | ~84 ms |

**Le chargement client complet est possible ici** — 3 612 lignes restent sous le plafond
`offset + limit ≤ 10 000` de l'API Explore v2.1, qui bloque le jeu écoles
(cf. [dataviz-ips-ecoles.md](dataviz-ips-ecoles.md) § « Chronométrage »). Il faut
`max-records="4000"` (défaut 1 000 : **troncature silencieuse à 1 000 lignes**, piège du
dépôt) et il coûte **37 allers-retours en série pour 3,4 s**.
C'est **5,3 fois plus lent** que l'export complet en une requête. Le poids transféré
n'est pas le sujet : c'est le nombre d'allers-retours.

Arbitrage : `max-records="4000"` (3,4 s, mais `server-facets`, `server-search` et
`server-side` restent disponibles) contre source générique sur `/exports/json`
(643 ms, une requête, mais on perd les modes serveur). Pour ce jeu, **3,4 s au premier
chargement est acceptable et l'on garde tout** ; l'export générique redevient
intéressant si l'on a besoin d'un `dsfr-data-unpivot` (cf. « Limites » n° 1), qui impose
de toute façon le mode client.

## Transposition vers `dsfr-data`

Attributs vérifiés dans les références générées depuis le source
(`get_skill(dsfrDataSource|dsfrDataFacets|dsfrDataMap|dsfrDataUnpivot|dsfrDataKpi,
"reference")`) et dans `~/Developer/GitHub/dsfr-data`. Tout attribut non vérifié est
signalé.

| Original Opendatasoft | `dsfr-data` | Attributs nécessaires |
|---|---|---|
| `<ods-dataset-context …-dataset="donnees-ips-lycees" …-sort="-rentree_scolaire">` | `<dsfr-data-source>` | `api-type="opendatasoft"`, `base-url="https://data.education.gouv.fr"`, `dataset-id="donnees-ips-lycees"`, `order-by="rentree_scolaire desc"`, **`max-records="4000"`** (défaut 1 000 : tronque en silence à 1 000 sur 3 612). Pas d'`api-key-ref` : le portail répond en anonyme. |
| `ng-init="…['refine.rentree_scolaire']='2023-2024'"` | même balise | `where="rentree_scolaire = '2023-2024' and position is not null"` — sur la balise déjà présente (PG-015). |
| `<ods-facet name="libelle_academie" sort="alphanum">` | `<dsfr-data-facets>` | `fields="libelle_academie, libelle_departement, libelle_commune, secteur"` (virgules), `labels="… \| …"` (barres), `display="libelle_academie:select \| libelle_departement:select \| libelle_commune:select \| secteur:checkbox"`, `sort="alpha:asc"`, `max-values="8"`, `url-sync url-params`. |
| Liste maison `ods-adv-analysis` + `limitTo:nbdepts` + « > Plus » | même `<dsfr-data-facets>` | rien de plus : `max-values` rend nativement le « Voir plus », et le compteur — que l'original calcule et n'affiche pas — est là par défaut. |
| Facette Commune plafonnée à 100 valeurs sur 1 392 | même `<dsfr-data-facets>` | **la cascade suffit sur ce jeu** : `max communes par département = 57` (Nord). Vérifié à l'API : `/facets?facet=libelle_commune&where=… and libelle_departement="Nord"` renvoie **57** valeurs, pas 100. Un `searchable="libelle_commune"` complète pour l'accès direct. Contrairement au jeu écoles, **pas besoin d'un `dsfr-data-search server-search`**. |
| — (absent de l'original) | **`<dsfr-data-unpivot>`** | `value-cols="ips_voie_gt:Voie générale et technologique, ips_voie_pro:Voie professionnelle"`, `var-name="voie"`, `value-name="ips"`, `drop-empty`, `id-cols="uai, appellation_officielle, secteur, libelle_commune, libelle_departement, libelle_academie, position, rentree_scolaire"`. C'est la pièce qui rend les deux voies exploitables par une carte, un KPI et une facette. Cf. « Limites » n° 1. |
| `<ods-map location="5,47.35371,8.98682" ods-auto-resize>` | `<dsfr-data-map>` | `center="46.6,2.3"`, `zoom="6"`, `height`, `tiles="ign-plan"`, `tiles-style="muted"`, `fit-bounds`, `fit-max-zoom="13"`, `fit-zone="none"`, `name`. |
| `<ods-map-layer show-if="…">` (épingles rouges uniformes) | `<dsfr-data-map-layer>` | `type="circle"`, `geo-field="position"`, `radius="5"`, `fill-field="ips"`, `classes="5"`, `method="manual"`, `breaks` **par voie** (cf. « Limites » n° 2), `selected-palette="divergentAscending"`, `tooltip-field="appellation_officielle"`, `max-items` (défaut 5 000 > 3 592 : **pas besoin de le relever**, contrairement aux collèges et aux écoles). Pas de `show-if`. |
| Infobulle back-office (5 champs, GT et PRO) | `<dsfr-data-map-popup>` + `<template>` | `mode="panel-right"`, `title-field="appellation_officielle"`, `width="360px"`. Le `<template>` peut poser **les deux voies côte à côte et dire ce qu'elles sont** — ce que l'original n'explique pas. |
| — (absent) | `<dsfr-data-map-legend>` | `for`, `label` — la légende que la carte d'origine ne peut pas avoir puisqu'elle n'encode rien. |
| — (absent) | `<dsfr-data-kpi>` ×3 | `value="meta:total"` pour le compte (**pas `count`** en `server-side`, JSDoc de `value`, #659) ; `value="ips:avg"` + `format="decimal" decimals="1"` pour la moyenne, valable ici parce que la source charge tout côté client (`max-records="4000"`, cf. « Chronométrage »). |
| `<a ng-href="{{…getDownloadURL('csv')}}">` | `<dsfr-data-a11y>` | `download`, `filename="ips-lycees-2023-2024.csv"`, `table`, `for`, `label-field`, `value-field`. |

### Esquisse de code

```html
<!-- 3 612 lycées, 13 champs. Pas de clé : le portail éducation répond en anonyme.
     max-records EXPLICITE : le défaut 1 000 de l'adaptateur ODS tronquerait en silence.
     Coût mesuré : 37 allers-retours en série, 3,4 s. -->
<dsfr-data-source id="ips"
  api-type="opendatasoft"
  base-url="https://data.education.gouv.fr"
  dataset-id="donnees-ips-lycees"
  where="rentree_scolaire = '2023-2024' and position is not null"
  order-by="rentree_scolaire desc"
  max-records="4000">
</dsfr-data-source>

<!-- Une ligne par (lycée, voie renseignée) : 2 473 GT + 2 068 PRO = 4 541 lignes.
     drop-empty écarte les voies non renseignées : pas de point fantôme sur la carte. -->
<dsfr-data-unpivot id="ips-voies" source="ips"
  id-cols="rentree_scolaire, uai, secteur, appellation_officielle, libelle_commune,
           libelle_departement, libelle_academie, position"
  value-cols="ips_voie_gt:Voie générale et technologique, ips_voie_pro:Voie professionnelle"
  var-name="voie" value-name="ips" drop-empty>
</dsfr-data-unpivot>

<div class="fr-container fr-mt-6w">
  <h1>Indice de position sociale des lycées — rentrée 2023-2024</h1>
  <p class="fr-text--lead">
    L'IPS résume la position sociale des familles des élèves d'un établissement.
    Un lycée peut en avoir deux, un par voie : 1 522 lycées n'ont qu'un IPS de voie
    générale et technologique, 1 117 qu'un IPS de voie professionnelle, et 951 les deux.
    Les deux échelles ne se comparent pas : la moyenne de la voie GT est de 116,3,
    celle de la voie professionnelle de 91,6.
  </p>
  <p class="fr-text--sm">
    20 lycées sont absents de la carte et des filtres, faute de coordonnées dans la
    source ; 22 n'ont d'IPS dans aucune des deux voies.
  </p>

  <div class="fr-grid-row fr-grid-row--gutters">
    <div class="fr-col-12 fr-col-md-3">
      <h2 class="fr-h6">Filtrer</h2>
      <!-- La facette « voie » est le pivot de la page : elle évite de superposer
           deux points au même endroit pour les 951 lycées polyvalents. -->
      <dsfr-data-facets id="ips-f" source="ips-voies"
        fields="voie, libelle_academie, libelle_departement, libelle_commune, secteur"
        labels="voie:Voie | libelle_academie:Académie | libelle_departement:Département | libelle_commune:Commune | secteur:Secteur"
        display="voie:select | libelle_academie:select | libelle_departement:select | libelle_commune:select | secteur:checkbox"
        searchable="libelle_commune"
        sort="alpha:asc" max-values="8"
        url-sync url-params>
      </dsfr-data-facets>
    </div>

    <div class="fr-col-12 fr-col-md-9">
      <dsfr-data-kpi-group class="fr-mb-3w">
        <dsfr-data-kpi source="ips-f" value="meta:total" format="nombre" col="4"
          heading="Sélection" label="couples établissement-voie"></dsfr-data-kpi>
        <!-- ips:avg s'évalue sur les lignes reçues : juste ici, la source charge tout. -->
        <dsfr-data-kpi source="ips-f" value="ips:avg" format="decimal" decimals="1" col="4"
          heading="IPS moyen" label="de la sélection"></dsfr-data-kpi>
        <dsfr-data-kpi source="ips-f" value="ips:max" format="decimal" decimals="1" col="4"
          heading="IPS le plus élevé" label="de la sélection"></dsfr-data-kpi>
      </dsfr-data-kpi-group>

      <dsfr-data-map id="carte-ips"
        name="Lycées de France et leur indice de position sociale, par voie"
        center="46.6,2.3" zoom="6" height="620px"
        tiles="ign-plan" tiles-style="muted"
        fit-bounds fit-max-zoom="13" fit-zone="none">
        <dsfr-data-map-layer id="c-lyc" source="ips-f" type="circle"
          geo-field="position" radius="5" fill-opacity="0.75"
          fill-field="ips" classes="5" method="manual" breaks="85,100,115,130"
          selected-palette="divergentAscending"
          tooltip-field="appellation_officielle"
          max-items="5000">
        </dsfr-data-map-layer>
        <dsfr-data-map-legend for="c-lyc"
          label="Indice de position sociale (2023-2024)"></dsfr-data-map-legend>
        <dsfr-data-map-popup mode="panel-right"
          title-field="appellation_officielle" width="360px">
          <template>
            <p class="fr-badge fr-badge--sm fr-mb-2v">{{secteur|secteur non renseigné}}</p>
            <p class="fr-display--xs fr-mb-1v">{{ips|IPS non renseigné}}</p>
            <p class="fr-text--sm fr-mb-2v">{{voie}} — rentrée {{rentree_scolaire}}</p>
            <p class="fr-text--sm fr-mb-1v"><strong>{{libelle_commune|commune non renseignée}}</strong>
               — {{libelle_departement|}}, académie de {{libelle_academie|}}</p>
            <p class="fr-text--xs fr-mb-0 odv-rubrique" data-intitule="UAI">{{uai}}</p>
          </template>
        </dsfr-data-map-popup>
      </dsfr-data-map>

      <dsfr-data-a11y source="ips-f" for="carte-ips" table download
        filename="ips-lycees-2023-2024.csv"
        label="Données de la carte"
        label-field="appellation_officielle"
        value-field="voie, ips, libelle_commune, libelle_departement, libelle_academie, secteur">
      </dsfr-data-a11y>
    </div>
  </div>
</div>
```

## Limites et points durs identifiés

1. **Trois colonnes d'IPS, une seule carte : `dsfr-data-unpivot` répond, mais il change
   le mode de chargement.**
   *Obstacle* : `fill-field` prend **un** champ. Avec `ips_voie_gt` seul, 1 139 lycées
   sortent de la carte ; avec `ips_voie_pro` seul, 1 544 en sortent. Une couche par voie
   superpose deux points au même endroit pour les 951 polyvalents.
   *Voie native* : `<dsfr-data-unpivot value-cols="ips_voie_gt:…, ips_voie_pro:…"
   var-name="voie" value-name="ips" drop-empty>` — une ligne par couple
   (établissement, voie renseignée), soit **4 541 lignes** (2 473 + 2 068), et une facette
   `voie` en `display="voie:select"` (choix unique en ligne : `select`, pas `radio`,
   piège PG-023) pour n'afficher qu'une voie à la fois.
   *Contrainte documentée* : `transformsSchema()` de l'unpivot renvoie `true` — « une
   query en aval ne doit jamais déléguer ses opérations au serveur à travers ce
   composant » (#394). L'unpivot **impose donc le chargement client complet** :
   `max-records="4000"`, 37 allers-retours, 3,4 s (mesuré). Acceptable ici ; ce serait
   rédhibitoire sur le jeu écoles.
   *Ce qui reste vrai sans unpivot* : deux couches et une légende partagée fonctionnent
   aussi, au prix de la superposition sur les 951 polyvalents.
   **Non vérifié au navigateur** : ni le rendu de la facette `voie`, ni la duplication
   effective de `position` par l'unpivot (l'objet `{lat, lon}` doit être recopié tel quel
   dans chaque ligne dépliée — la référence dit que les `id-cols` sont « conservées telles
   quelles », mais je ne l'ai pas observé sur un champ `geo_point_2d`).

2. **Les bornes de classes ne peuvent pas être les mêmes pour les deux voies.**
   *Obstacle* : GT s'étale de 57,7 à 162,6 (moyenne 116,3), PRO de 62,0 à 138,2
   (moyenne 91,6). Un `breaks="85,100,115,130"` unique classe la quasi-totalité des PRO
   dans les deux classes basses et la quasi-totalité des GT dans les deux hautes : la
   carte lirait « voie » et non « IPS ».
   *Voie native n° 1* : `method="quantile"` recalcule les bornes sur les données reçues —
   donc sur la voie sélectionnée, puisque la facette filtre en amont. La légende suit
   (`getLegendEntries()` → `dsfr-data-map-legend`). C'est le comportement voulu, mais il
   rend les deux cartes non comparables entre elles, et il faut l'écrire dans la légende.
   *Voie native n° 2* : un `breaks` par voie, ce que la grammaire ne permet pas sur une
   seule balise — il faudrait deux `dsfr-data-map-layer`, chacune filtrée par un `where`
   et dotée de ses bornes, avec `min-zoom`/`max-zoom` ou un affichage exclusif piloté
   par la page. **Non vérifié.**
   *Ce qu'il ne faut pas faire* : normaliser les deux voies sur une échelle commune.
   Ce serait inventer une donnée que la DEPP ne publie pas — et `ips_ensemble_gt_pro`,
   qui serait la bonne réponse, est vide sur l'année affichée.

3. **`max-records` par défaut à 1 000 contre 3 612 lignes.** Piège maison, tronque
   **en silence**. Voie native : `max-records="4000"` explicite. Le coût est mesuré
   (37 allers-retours, 3,4 s) et l'alternative documentée (source générique sur
   `/exports/json`, 643 ms, une requête, au prix des modes serveur).
   Contrairement au jeu écoles, **le plafond `offset + limit ≤ 10 000` de l'API ODS n'est
   pas atteint** : 3 612 lignes = 37 pages, le chargement complet aboutit.

4. **La facette Commune, ici, n'est pas un point dur.** C'est le défaut n° 3 de la page
   collèges, et il ne se reproduit pas de la même façon : le plafond de 100 valeurs de
   l'endpoint `/facets` existe bien (vérifié : `limit=300` est ignoré, on obtient
   toujours 100), mais **la cascade le résout entièrement sur ce jeu** — le département
   le plus étendu compte 57 communes, et **aucun ne dépasse 100**. Un
   `display="libelle_commune:select"` + `searchable="libelle_commune"` suffit.
   À comparer au jeu écoles, où 79 départements sur 103 dépassent 100 communes et où il
   faut basculer sur `dsfr-data-search server-search`. **La même balise, le même
   attribut, deux verdicts opposés selon le jeu.**

5. **`insets="drom"` et le clip du `fit-bounds`.** Le jeu contient des points ultramarins
   (Guadeloupe 33, Martinique 30, Guyane 18, La Réunion 48, Mayotte 11, plus
   Saint-Martin), donc des encarts sont justifiés. Mais la référence de `fit-zone` est
   explicite : dès qu'un encart ultramarin est présent, le fit est clippé sur la
   métropole par défaut — filtrer sur « Guadeloupe » recadrerait sur rien
   (variante de BUG-004). Voie native : `fit-zone="none"`, retenu dans l'esquisse, ou
   renoncer aux encarts. **À vérifier au navigateur.**
   À noter : ce jeu **n'a pas Saint-Barthélemy** (102 départements contre 103 pour
   collèges et écoles) — un encart de moins à prévoir si l'on en pose.

6. **Les 20 lignes sans position** — traitées comme sur les pages sœurs :
   `where="… and position is not null"` sur la source, et le dire dans la page.
   `getSkippedCount()` les compterait, mais elles fausseraient `meta:total`.

7. **Le bug du H4 ne se transpose pas : il disparaît.** Il n'y a pas d'équivalent
   `ng-show` dans `dsfr-data` ; l'invite « Sélectionnez… » n'a plus lieu d'être puisque
   la carte n'est plus vide au chargement. C'est le seul défaut du lot qui se corrige
   par soustraction.

8. **Ce qui ne se transpose pas, et n'a pas à l'être** — identique à la page collèges
   ([dataviz-ips-colleges.md](dataviz-ips-colleges.md) § « Limites » n° 8) : outils de
   dessin de zone, géocodeur, grille `col-xs-*`. Écarts assumés.

## Données à reproduire fidèlement

- [ ] Jeu `donnees-ips-lycees`, rentrée **2023-2024** — **3 612** lignes, dont
      **3 592** localisables.
- [ ] **Les deux voies**, jamais une seule : `ips_voie_gt` **2 473** valeurs
      (min 57,7 / max 162,6 / moyenne **116,33**), `ips_voie_pro` **2 068** valeurs
      (min 62,0 / max 138,2 / moyenne **91,58**).
- [ ] La répartition **1 522 GT seul / 1 117 PRO seul / 951 les deux / 22 aucun**,
      dite explicitement — c'est ce que la page d'origine laisse deviner.
- [ ] **Ne pas afficher `ips_ensemble_gt_pro` pour 2023-2024** : il est nul sur les
      3 612 lignes. Il redevient exploitable si l'on ouvre les rentrées antérieures
      (2016-2017 à 2022-2023, 25 375 lignes non nulles).
- [ ] Secteur : public **2 400** (GT 110,26 / PRO 87,01) / privé sous contrat **1 212**
      (GT 127,86 / PRO 104,40).
- [ ] Facette Académie : **30** valeurs, tri alphabétique, comptes exacts
      (Versailles 272, Créteil 228, Lille 226, Lyon 200 en tête ; Mayotte 11, Corse 15,
      Guyane 18 en queue). **Somme 3 592**, à afficher à côté du total 3 612.
- [ ] Facette Département : **102** valeurs **avec leur compte** — que l'original omet
      (Paris 158, Nord 153, Bouches-du-Rhône 122, Rhône 115 en tête). Pas de
      Saint-Barthélemy dans ce jeu.
- [ ] Facette Commune : **1 392** valeurs, et non 100.
- [ ] Infobulle : les 5 champs de l'original **au minimum**, avec **les deux voies quand
      elles existent** et un libellé qui dit ce qu'elles sont. IPS en virgule décimale
      française, **et une décimale même sur un entier** (110,0 et non 110).
- [ ] 20 lycées sans position : les exclure explicitement et le dire.
- [ ] Téléchargement CSV de la sélection courante.
- [ ] Cadrage initial **sur la France**, pas sur la Suisse.
- [ ] Carte non vide au chargement : les 3 592 lycées localisés visibles d'emblée.
- [ ] **Pas d'invite « Sélectionnez un département ou une commune » qui reste affichée
      après avoir sélectionné une commune** (défaut n° 2).

## Gabarit partagé

Le § « Gabarit partagé » de [dataviz-ips-colleges.md](dataviz-ips-colleges.md) établit
que les quatre pages IPS sont le même fichier à un attribut près, et en dresse la liste
des invariants. Tout y est vérifié conforme sur la page lycées, à trois écarts près
(un `</div>` surnuméraire après le bandeau, le `ng-show` du H4 sur
`refine.nom_de_la_commune`, et le test des liens « > Plus » sur
`refine.libelle_departement` là où écoles teste `refine.departement`).

**Ce que la page lycées apporte au tableau des différences :**

| | Écoles | Collèges | **Lycées** | EREA |
|---|---|---|---|---|
| Titre interne du jeu | `dataviz3` | `dataviz2` | **`dataviz1`** | `dataviz4` |
| Lignes 2023-2024 | 32 625 | 6 985 | **3 612** | 78 |
| Champs | 29 | 11 | **13** | 24 |
| Champ(s) d'IPS | `ips` + 9 références | `ips` seul | **`ips_voie_gt`, `ips_voie_pro`, `ips_ensemble_gt_pro` — pas de champ `ips`** | `ips` + 9 références (3 en `text`) |
| Colonne de synthèse | — | — | **`ips_ensemble_gt_pro`, nulle sur 2023-2024 et 2024-2025** | — |
| Départements | 103 | 103 | **102** (pas de Saint-Barthélemy) | 61 |
| Communes | 17 351 | 3 791 | **1 392** | 77 |
| Communes du plus gros département | 566 | — | **57** | 2 |
| Verdict « facette Commune » | `server-search` obligatoire | cascade + `radio` | **cascade suffisante, aucun département > 100 communes** | aucune troncature |
| `ng-show` du H4 | `libelle_commune` (correct) | `libelle_commune` (correct) | **`nom_de_la_commune` — champ inexistant, invite persistante** | `libelle_commune` (correct) |
| `max-items` de la couche à relever ? | oui (32 321 > 5 000) | oui (6 971 > 5 000) | **non (3 592 < 5 000)** | non (78) |
| `max-records` de la source | mur ODS à 10 000 offsets | 8 000 | **4 000, 37 A-R, 3,4 s** | défaut suffisant |

**Ce que ça change pour la factorisation.** La fiche collèges annonçait un gabarit unique
paramétré par (a) le `dataset-id`, (b) les champs d'IPS et (c) le libellé du type
d'établissement. La page lycées confirme (a) et (c), mais **(b) n'est pas un paramètre
de maquette : c'est un paramètre de pipeline.** Un jeu à une colonne d'IPS branche la
carte directement sur la source ; un jeu à deux colonnes doit intercaler un
`dsfr-data-unpivot` et exposer une facette « voie », ce qui ajoute un composant, change
le nombre de lignes (3 612 → 4 541), impose le chargement client, et fait porter la
légende sur des bornes recalculées par voie. La page lycées est donc **le cas où le
gabarit se dédouble**, pendant que la page écoles est le cas où il change d'architecture
de chargement (cf. [dataviz-ips-ecoles.md](dataviz-ips-ecoles.md) § « Gabarit partagé »).

Trois pages sur quatre — collèges, lycées, EREA — se factorisent en un gabarit unique.
La quatrième, les écoles, n'en sort pas par sa maquette mais par son volume.
