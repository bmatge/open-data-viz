# IPS EREA

- **URL** : https://data.education.gouv.fr/pages/dataviz-ips-erea/
- **Catalogue** : id **35**, thématique **Éducation**, sous-thématique **EREA**.
  Titre « IPS EREA », description « Indices de position sociale des EREA de France pour
  l'année scolaire 2023-2024 ».
  Vignette `/assets/theme_image/preview-dataviz-ips-erea.jpg`.
  *EREA : établissement régional d'enseignement adapté. La page ne développe jamais le
  sigle, ni dans son titre, ni ailleurs.*
- **Producteur (métadonnée du jeu)** : DEPP — Ministère en charge de l'éducation
  nationale. Licence ouverte v2.0 (Etalab).
- **Jeu de données utilisé par la page** : **`donnees-ips-erea`** — **706 lignes** toutes
  rentrées, **78 pour 2023-2024**. Jeu technique `hors catalogue` (titre interne
  `dataviz4`), lisible **sans clé**. **C'est le plus petit jeu des quatre pages IPS,
  de trois ordres de grandeur en dessous du jeu écoles.**
  - **24 champs** : `rentree_scolaire` (text), `code_region` (**text**, contrairement à
    l'`int` du jeu écoles), `region`, `code_academie` (text), `uai`, `secteur`,
    `ips` (double), les **neuf colonnes de référence** — `ips_national`,
    `ips_national_public`, `ips_national_prive`, `ips_academique`,
    `ips_academique_public`, `ips_academique_prive`, `ips_departemental`,
    `ips_departemental_public`, `ips_departemental_prive` —, `num_ligne` (double),
    `appellation_officielle`, `libelle_commune` (label « Commune »), `code_departement`,
    `code_commune`, `libelle_departement` (label « Département »), `libelle_academie`
    (label « Académie »), `position` (geo_point_2d).
  - **Anomalie de typage** : les trois colonnes `*_prive` sont de type **`text`** et non
    `double` (les mêmes sont en `double` dans le jeu écoles). Elles valent `"66.4"` ou
    `"NA"` — la chaîne littérale, pas une valeur nulle. Cf. « Défauts » n° 3.
  - Facettes déclarées au back-office : `rentree_scolaire`, `libelle_academie`,
    `libelle_departement`, `libelle_commune` — celles qu'utilise la page.
  - Répartition par rentrée : 2024-2025 77 · **2023-2024 78** · 2022-2023 78 ·
    2021-2022 77 · 2020-2021 78 · 2019-2020 79 · 2018-2019 79 · 2017-2018 80 ·
    2016-2017 80. Neuf rentrées, **706 lignes en tout**.
- **Relevé visuel** : 2026-09-10, Chrome, fenêtre 1568 × 751, onglet dédié.

## Objectif de la dataviz et informations véhiculées

- **Question à laquelle elle répond** : « Où sont les EREA de France, et quel est leur
  indice de position sociale ? » Même objet que les trois pages sœurs — mais sur
  **78 établissements**, l'objet lui-même est discutable : ce n'est plus un localisateur
  de proximité, c'est un annuaire national qui tient sur un écran.
- **Message porté** : aucun. Pas de chapô, pas de définition de l'IPS, pas de
  développement du sigle EREA, pas de moyenne, pas de comparaison.
- **Information que l'utilisateur doit obtenir** : pour un EREA donné — rentrée, UAI,
  commune, appellation officielle, IPS 2023-2024, lus dans l'infobulle ; et le CSV filtré.
- **Ce qui n'est pas dans l'objet** — les cinq manques communs
  (cf. [dataviz-ips-colleges.md](dataviz-ips-colleges.md) § « Objectif »), et deux
  aggravations propres aux EREA :
  - **le filtrage géographique est l'unique mode d'accès à un corpus de 78 lignes.**
    Il faut choisir un département parmi 61 — dont 49 ne contiennent qu'un seul
    établissement — pour voir apparaître un point. Un tableau de 78 lignes trié par IPS
    répondrait mieux à la même question, sans un clic ;
  - **le jeu porte neuf colonnes de référence, et l'infobulle n'en montre aucune.**
    Comme sur la page écoles, la comparaison à la moyenne nationale (**81,8**),
    académique ou départementale est transportée dans chaque réponse et jetée à
    l'affichage. C'est d'autant plus dommage ici que la moyenne nationale des EREA
    (81,8) est **23 points sous celle des collèges** (104,7) : la spécificité sociale
    de ces établissements est le fait saillant du jeu, et la page ne le porte pas.

## Chiffres de référence (API v2.1, rentrée 2023-2024)

| Mesure | Valeur |
|---|---|
| EREA (lignes) | **78** |
| Lignes sans `position` | **0** — le seul des quatre jeux où tout est localisable |
| Lignes sans `libelle_departement` / `libelle_academie` / `libelle_commune` / `appellation_officielle` | **0** |
| Lignes avec un IPS renseigné | 77 — **1 sans IPS** (EREA Jacques Brel, Garches) |
| IPS min / max / moyenne | **66,4** / **124,3** / **80,59** |
| Référence nationale portée par le jeu | `ips_national` **81,8** = `ips_national_public` ; `ips_national_prive` `"66.4"` (text) |
| Secteur `public` | **77** lignes, IPS moyen **80,77** |
| Secteur `privé sous contrat` | **1** ligne — Lycée d'enseignement adapté L'Espérance, Mamoudzou (Mayotte), IPS **66,4** |
| Académies distinctes | **25** (aucun `null`) |
| Départements distincts | **61** (aucun `null`) |
| Communes distinctes | **77** (aucun `null`) — seul Garches en compte deux |
| Régions distinctes | **14** |
| Départements les plus fournis | Hauts-de-Seine 4 · Nord 3 · Paris 3 · Pas-de-Calais 3 · Essonne 2 · Gironde 2 |
| Académies les plus fournies | Versailles 8 · Lille 6 · Bordeaux 5 · Normandie 5 · Grenoble 4 · Poitiers 4 · Rennes 4 |
| Régions | ÎLE-DE-FRANCE 14 · AUVERGNE-RHÔNE-ALPES 10 · NOUVELLE-AQUITAINE 10 · HAUTS-DE-FRANCE 8 · GRAND EST 6 · BOURGOGNE-FRANCHE-COMTÉ 5 · NORMANDIE 5 · OCCITANIE 5 · BRETAGNE 4 · CENTRE-VAL DE LOIRE 3 · PAYS DE LA LOIRE 3 · PACA 3 · CORSE 1 · MAYOTTE 1 |
| IPS le plus élevé | EREA Toulouse Lautrec, **Vaucresson** — **124,3** ; EREA Jean Monnet, Garches — 113,2 |
| IPS le plus bas | Lycée d'enseignement adapté L'Espérance, **Mamoudzou** — **66,4** ; EREA Michel Colucci, Liévin — 66,8 ; EREA Magda Hollander-Lafon, Rennes — 69,1 |
| Toutes rentrées confondues (706 lignes) | IPS min **53,1** / max **125,9** / moyenne **75,62** |

## Le template AngularJS

```html
<ods-dataset-context context="frenipslyceesdataviz"
                     frenipslyceesdataviz-dataset="donnees-ips-erea"
                     frenipslyceesdataviz-sort="-rentree_scolaire">
```

Le template est **strictement identique** à celui de la page collèges — même
`ng-init="nbdepts=10; …['refine.rentree_scolaire']='2023-2024';"`, mêmes deux
`ods-facet` (`libelle_academie`, `libelle_commune`), même liste maison
`ods-adv-analysis` sur `libelle_departement` avec un `count(*) as tot` non affiché,
même `<ods-map location="5,47.35371,8.98682" ods-auto-resize>`, même
`show-if="…refine.libelle_departement || …refine.libelle_commune"`, même lien
`getDownloadURL('csv')`, même grille Bootstrap, aucun `ctx-apikey`, aucun `urlsync`.
Voir [dataviz-ips-colleges.md](dataviz-ips-colleges.md) § « Le template AngularJS »
pour le détail : **le seul octet qui change entre les deux fichiers est le
`dataset-id`** (et le mot « EREA » dans le H1).

Le `ng-show` du H4 teste bien `refine.libelle_commune` — pas le champ inexistant
`nom_de_la_commune` de la page lycées. Le H4 disparaît donc correctement.

## Relevé visuel exhaustif

### 1. Bandeau de titre

Fond gris clair pleine largeur, un H1 en gras : « Indices de position sociale des EREA
de France pour l'année scolaire 2023-2024 ». Pas de chapô, pas de développement du
sigle, pas de lien vers le jeu.

### 2. Colonne de gauche — les filtres (`col-xs-2`, ~185 px)

Mise en page identique à la page collèges
([dataviz-ips-colleges.md](dataviz-ips-colleges.md) § 2) : H4 conditionnel, trois blocs,
6 valeurs visibles + « Plus », champ de recherche de facette présent mais invisible,
libellés coupés en plein mot par la colonne à 185 px.

**Ce qui diffère radicalement : aucune des trois listes n'est tronquée.** Sur les trois
autres pages, la facette Commune bute sur le plafond de 100 valeurs de l'API ODS ; ici
les 77 communes tiennent, et les 61 départements aussi. **La page EREA est la seule des
quatre à donner accès à la totalité de ses données par ses filtres.**

**a. Facette « Académie »** — **25 valeurs** après « Plus », relevées à l'écran avec
leurs comptes : Aix-Marseille 3 · Amiens 2 · Besançon 2 · Bordeaux 5 ·
Clermont-Ferrand 3 · Corse 1 · Créteil 3 · Dijon 3 · Grenoble 4 · Lille 6 · Limoges 1 ·
Lyon 3 · Mayotte 1 · Montpellier 2 · Nancy-Metz 3 · Nantes 3 · Normandie 5 ·
Orléans-Tours 3 · Paris 3 · Poitiers 4 · Reims 2 · Rennes 4 · Strasbourg 1 ·
Toulouse 3 · Versailles 8. **Somme 78 — aucune ligne orpheline.**
Cinq académies sont **absentes** de la liste (les 25 sur 30 du réseau) : Guadeloupe,
Guyane, La Réunion, Martinique et Nice n'ont aucun EREA. La page ne le dit pas ; c'est
un fait, mais il faut connaître la liste des académies pour le repérer.

**b. Liste « Département »** — 10 entrées, puis « > Plus » → **61** entrées
(Ain, Aisne, Alpes-de-Haute-Provence, Ariège, Aveyron, Bas-Rhin, … Vosges, Yonne),
puis « > Moins ». Aucun compteur affiché — alors que **49 des 61 départements ne
contiennent qu'un seul EREA** : le compteur, ici, aurait dit quelque chose d'utile en
un coup d'œil.

**c. Facette « Commune »** — **77 valeurs**, la liste complète, d'Ajaccio à Wassy,
avec leurs comptes (tous à 1 sauf **Garches 2**).

### 3. Colonne de droite — la carte (`col-xs-10`)

**Au chargement** : identique aux trois autres pages — `location="5,47.35371,8.98682"`,
zoom 5 sur la Suisse, échelle 300 km, **zéro épingle**. Fond IGN/Huwise raster couleur
non atténué, mêmes contrôles.

Sur 78 points, ce défaut change de nature : **la carte pourrait afficher la totalité du
jeu au premier écran** sans le moindre coût. Elle est vide, et centrée sur Zurich.

**Après un refine département** (« Hauts-de-Seine », 4 EREA) : recadrage à l'échelle
**2 km**, **4 épingles rouges individuelles**, H4 masqué. Pas de clustering — ni ici
ni ailleurs sur ce jeu, dont le département le plus fourni compte 4 points.

**Après un refine académie seul** (« Versailles », 8 EREA) : **zéro épingle, carte grise
vide**, H4 réaffiché. C'est le défaut n° 2 de la page collèges, reproduit à l'identique :
le `show-if` de la couche exige un département **ou** une commune, et l'académie ne
suffit pas. Observation supplémentaire faite ici : **l'infobulle du point précédemment
cliqué survit à la disparition de la couche** et flotte au-dessus de la carte vide —
on lit « Appellation officielle / Etablissement régional d'enseignement adapté Martin
Luther King / IPS / 86,5 » sur un fond gris sans un seul point. Capture au relevé.

**Infobulle au clic.** Les quatre EREA des Hauts-de-Seine, relevés mot pour mot :

| UAI | Contenu de la bulle |
|---|---|
| 0920810F | Rentrée scolaire **2023-2024** · UAI **0920810F** · Commune **Garches** · Appellation officielle **Etablissement régional d'enseignement adapté Jean Monnet** · IPS **113,2** |
| 0921935D | … · Commune **Vaucresson** · … **EREA Toulouse Lautrec** · IPS **124,3** |
| 0920429S | … · Commune **Asnières-sur-Seine** · … **EREA Martin Luther King** · IPS **86,5** |
| **0922287L** | … · Commune **Garches** · … **EREA Jacques Brel** · **(pas de ligne « IPS »)** |

**Le dernier cas répond à une question laissée ouverte par la fiche collèges**
(§ « Défauts » n° 7, « non vu à l'écran »). Quand la valeur est nulle, ODS **omet la
ligne entière** : la bulle a quatre couples au lieu de cinq, il n'y a **pas** de champ
« IPS » vide. Le lecteur ne voit pas qu'il manque quelque chose — la bulle a l'air
normale, simplement plus courte. Ce comportement vaut pour les 5 collèges, les 2 560
écoles et les 22 lycées sans IPS.

Autres observations communes aux quatre pages : le premier libellé porte un **BOM**
(`"﻿Rentrée scolaire"`) ; **dix-neuf des vingt-quatre champs sont écartés**, dont
les neuf références IPS, le `secteur`, la `region` ; le libellé de commune est
« Commune » et la valeur en casse normale.

### 4. Pied de section

Un lien : « Télécharger les données filtrées au format csv »,
`ng-href="{{…getDownloadURL('csv')}}"`, `target="_blank"`. Même mécanique que sur la
page collèges ; ici 24 colonnes.

## Défauts et bizarreries de l'original

Les défauts **1, 2, 4, 5, 8, 9, 10, 11, 12 et 13** de la page collèges
([dataviz-ips-colleges.md](dataviz-ips-colleges.md) § « Défauts ») se retrouvent
**à l'identique** : carte centrée sur la Suisse, carte vide au chargement et sur un
refine d'académie, départements sans compteur, aucun sélecteur de rentrée, BOM sur le
libellé, grille Bootstrap 3, contexte `frenipslyceesdataviz`, URL non partageable,
donnée principale non représentée, jeu source hors catalogue. Le défaut n° 3 (facette
Commune plafonnée à 100 valeurs) **ne s'applique pas** : 77 communes tiennent
sous le plafond. Ce qui suit est spécifique aux EREA.

1. **La page impose un parcours de filtrage à un corpus de 78 lignes.** Trois filtres,
   61 départements dont 49 à un seul établissement, une carte vide tant qu'on n'a pas
   cliqué — pour un jeu qui tient intégralement dans un écran et se charge en
   **148 ms** (mesuré, toutes rentrées comprises, cf. « Chronométrage »). C'est le seul
   défaut du lot qui ne soit ni un bug ni une limite technique, mais une **erreur de
   dimensionnement du gabarit** : le motif « filtrer puis localiser » a été copié d'une
   page à 32 625 lignes vers une page à 78, sans être requestionné.

2. **Aucune ligne orpheline, et pourtant la carte reste vide au chargement.** Sur les
   trois pages sœurs, le `show-if` prive l'utilisateur d'un ensemble qu'il serait de
   toute façon coûteux d'afficher (6 971 à 32 321 points). Ici il le prive de
   **78 points**. La justification technique — qui n'a jamais été bonne — n'existe
   même plus.

3. **Trois colonnes de référence typées `text`, valant `"NA"`.**
   `ips_national_prive`, `ips_academique_prive` et `ips_departemental_prive` sont des
   chaînes : `"66.4"` ou `"NA"`. Les mêmes colonnes sont des `double` dans le jeu écoles.
   Conséquence : elles sont **inutilisables telles quelles** dans un calcul, une
   choroplèthe ou un KPI — il faut les nettoyer. Le `"NA"` est la trace d'un export R
   ou d'un CSV non typé à l'import.

4. **La référence « privé » nationale est un seul établissement, et il est identifiable.**
   `ips_national_prive` vaut `"66.4"`, soit exactement l'IPS du **Lycée d'enseignement
   adapté L'Espérance à Mamoudzou (Mayotte)** — le seul EREA privé sous contrat de
   France. Une « moyenne nationale du privé » calculée sur n = 1 n'est pas une moyenne :
   c'est la valeur d'un établissement nommé, republiée sous un nom qui suggère
   l'agrégat. Le jeu la porte pour les 78 lignes, y compris celles des 77 établissements
   publics.

5. **Les références départementales ne sont pas la moyenne des EREA du département.**
   Vérifié par recalcul :

   | Département | EREA | Moyenne simple des IPS | `ips_departemental` |
   |---|---:|---:|---:|
   | Hauts-de-Seine | 4 | 108,0 | **115,2** |
   | Nord | 3 | 77,23 | **78,5** |
   | Paris | 3 | 83,6 | **83,1** |
   | Pas-de-Calais | 3 | 76,23 | **77,3** |
   | Essonne | 2 | 87,5 | **89,9** |
   | Ille-et-Vilaine | 2 | 73,70 | **73,4** |

   L'écart est systématique mais pas constant : il s'agit vraisemblablement d'une
   **moyenne pondérée par les effectifs** — que le jeu ne porte pas, ce qui rend la
   vérification impossible. Même écart au niveau national : moyenne simple **80,59**,
   `ips_national` **81,8**. **La population de référence n'est documentée nulle part** :
   ni dans la description du jeu (« Jeu de données technique »), ni dans la page.
   Il faut donc les afficher comme « référence DEPP » et non comme « moyenne », faute
   de pouvoir dire de quoi.

6. **Un EREA sans IPS, et rien ne le signale.** L'EREA Jacques Brel (Garches, 0922287L)
   a `ips = null` mais porte ses trois références (national 81,8, académique 105,0,
   départemental 115,2). Sa bulle a quatre lignes au lieu de cinq. Aucun message.

7. **Le sigle EREA n'est jamais développé.** Ni dans le H1, ni dans le catalogue, ni
   dans la description du jeu. C'est le seul des quatre types d'établissement dont le
   nom ne se comprend pas sans y avoir été exposé.

8. **Aucun sélecteur de rentrée alors que 2024-2025 est chargé** (77 EREA), comme sur
   les trois pages sœurs — et alors que **le jeu entier fait 706 lignes** : la série
   temporelle complète tient dans 58 Ko.

## Chronométrage

Mesures Node (`fetch`, gzip actif), 2026-09-10.

| Voie | Allers-retours | Durée |
|---|---:|---:|
| `/exports/json?limit=-1` — rentrée 2023-2024, 78 lignes | **1** | **88 ms** |
| `/records?limit=100` — rentrée 2023-2024 (une seule page suffit) | **1** | **77 ms** |
| `/exports/json?limit=-1` — **jeu entier, 706 lignes, 9 rentrées** | **1** | **148 ms**, 58 382 octets |

**Il n'y a pas d'arbitrage d'architecture sur ce jeu, et il serait faux d'en inventer un.**
78 lignes tiennent dans une seule requête `/records` (le plafond de page ODS est de 100) :
le mode adaptateur par défaut suffit, sans `max-records`, sans `server-side`, sans
`bbox`, sans `server-facets`. Invoquer ici l'un des pièges de performance du dépôt —
`max-records` à 1 000 qui tronque, `max-items` à 5 000 qui coupe, les allers-retours en
série — serait une critique fausse : aucun de ces plafonds n'est approché.

Le seul chiffre qui compte pour la transposition est le troisième : **les neuf rentrées
entières coûtent 148 ms et 58 Ko**. Le sélecteur d'année que l'original n'a pas est,
sur ce jeu, gratuit — et il transforme un annuaire en série temporelle
(IPS moyen des EREA : 75,62 sur 2016-2026, 80,59 en 2023-2024 ; amplitude 53,1 à 125,9).

## Transposition vers `dsfr-data`

Attributs vérifiés dans les références générées depuis le source
(`get_skill(dsfrDataSource|dsfrDataFacets|dsfrDataMap|dsfrDataKpi|dsfrDataNormalize,
"reference")`) et dans `~/Developer/GitHub/dsfr-data`. Tout attribut non vérifié est
signalé.

| Original Opendatasoft | `dsfr-data` | Attributs nécessaires |
|---|---|---|
| `<ods-dataset-context …-dataset="donnees-ips-erea" …-sort="-rentree_scolaire">` | `<dsfr-data-source>` | `api-type="opendatasoft"`, `base-url="https://data.education.gouv.fr"`, `dataset-id="donnees-ips-erea"`, `order-by="rentree_scolaire desc"`. **Ni `max-records`, ni `server-side`, ni `page-size`** : 706 lignes au total, une requête suffit, et le défaut 1 000 de l'adaptateur ne tronque rien. Pas d'`api-key-ref` : le portail répond en anonyme. |
| `ng-init="…['refine.rentree_scolaire']='2023-2024'"` | même balise | **rien** — ou plutôt : *ne pas le transposer*. Charger les 706 lignes (148 ms) et poser un sélecteur d'année. Cf. « Limites » n° 1. |
| — (absent de l'original) | `<dsfr-data-normalize>` | à intercaler pour les trois colonnes `*_prive` typées `text` : cf. « Limites » n° 3. **Non vérifié** que `dsfr-data-normalize` sache convertir `"NA"` en `null` — sa référence n'a pas été relue sur ce point. |
| `<ods-facet name="libelle_academie" sort="alphanum">` | `<dsfr-data-facets>` | `fields="rentree_scolaire, libelle_academie, libelle_departement, libelle_commune, secteur"`, `labels="… \| …"` (barres), `display="rentree_scolaire:select \| libelle_academie:select \| libelle_departement:select \| libelle_commune:select"`, `sort="alpha:asc"`, `max-values="8"`, `url-sync url-params`. **Pas de `server-facets`** : les données sont déjà toutes côté client, les facettes se calculent localement et sont exactes — et les 77 communes tiennent, contrairement aux trois jeux sœurs. |
| Liste maison `ods-adv-analysis` + « > Plus » | même `<dsfr-data-facets>` | rien de plus : `max-values` rend le « Voir plus », et le compteur — que l'original calcule et n'affiche pas — est là par défaut. Sur ce jeu il est particulièrement parlant (49 départements à 1). |
| `<ods-map location="5,47.35371,8.98682" ods-auto-resize>` | `<dsfr-data-map>` | `center="46.6,2.3"`, `zoom="6"`, `height`, `tiles="ign-plan"`, `tiles-style="muted"`, `fit-bounds`, `fit-max-zoom="11"`, `name`. **Attention aux encarts** : cf. « Limites » n° 4. |
| `<ods-map-layer show-if="…">` (épingles rouges uniformes) | `<dsfr-data-map-layer>` | `type="circle"`, `geo-field="position"`, `radius="7"`, `fill-field="ips"`, `classes="5"`, `method="quantile"`, `selected-palette="divergentAscending"`, `tooltip-field="appellation_officielle"`. **Ni `max-items` (78 ≪ 5 000), ni `cluster`, ni `bbox`** : les poser serait du bruit. Pas de `show-if` : les 78 points s'affichent d'emblée. |
| Infobulle back-office (5 champs) | `<dsfr-data-map-popup>` + `<template>` | `mode="panel-right"`, `title-field="appellation_officielle"`, `width="360px"`. Le `<template>` pose enfin **l'écart aux trois références**, présentes dans chaque ligne et jamais affichées. |
| — (absent) | `<dsfr-data-map-legend>` | `for`, `label="Indice de position sociale (2023-2024)"`. |
| — (absent) | `<dsfr-data-kpi>` ×3 | `value="count"` (**et non `meta:total`** : sans `server-side`, `count` compte bien toutes les lignes reçues — c'est le seul des quatre jeux où le raccourci est licite), `value="ips:avg"`, `value="ips:min"`, `format="decimal"`, `decimals="1"`, `col="4"`. |
| — (absent) | **`<dsfr-data-chart>`** | le vrai apport de la transposition sur ce jeu : un `bar-chart` horizontal des 78 EREA triés par IPS, ou une série temporelle sur les 9 rentrées. Cf. « Limites » n° 2. **Attributs non vérifiés** (`get_skill(dsfrDataChart)` non consulté pour cette fiche). |
| `<a ng-href="{{…getDownloadURL('csv')}}">` | `<dsfr-data-a11y>` | `download`, `filename="ips-erea-2023-2024.csv"`, `table`, `for`, `label-field`, `value-field`. Sur 78 lignes, **le tableau accessible est la vue principale**, pas un complément. |

### Esquisse de code

```html
<!-- 706 lignes, 9 rentrées, 58 Ko, 148 ms en une requête.
     Ni max-records, ni server-side, ni bbox : le jeu tient entièrement côté client.
     On charge TOUT, y compris les rentrées que l'original masque. -->
<dsfr-data-source id="ips"
  api-type="opendatasoft"
  base-url="https://data.education.gouv.fr"
  dataset-id="donnees-ips-erea"
  order-by="rentree_scolaire desc"
  max-records="1000">
</dsfr-data-source>

<div class="fr-container fr-mt-6w">
  <h1>Indice de position sociale des établissements régionaux
      d'enseignement adapté (EREA)</h1>
  <p class="fr-text--lead">
    Les EREA scolarisent des élèves en grande difficulté scolaire ou en situation de
    handicap. La France en compte <strong>78</strong> à la rentrée 2023-2024, dont
    77 publics et un seul privé sous contrat, à Mamoudzou. Leur IPS moyen est de
    <strong>80,6</strong>, soit 24 points sous celui des collèges (104,7) : c'est le
    fait le plus net de ce jeu de données.
  </p>
  <p class="fr-text--sm">
    Les 78 établissements sont localisés — aucun n'est absent de la carte.
    Un seul n'a pas d'IPS renseigné.
  </p>

  <div class="fr-grid-row fr-grid-row--gutters">
    <div class="fr-col-12 fr-col-md-3">
      <h2 class="fr-h6">Filtrer</h2>
      <!-- rentree_scolaire EN PREMIER : le sélecteur d'année que l'original n'a pas,
           et qui ne coûte rien puisque les 9 rentrées sont déjà chargées. -->
      <dsfr-data-facets id="ips-f" source="ips"
        fields="rentree_scolaire, libelle_academie, libelle_departement, libelle_commune, secteur"
        labels="rentree_scolaire:Rentrée scolaire | libelle_academie:Académie | libelle_departement:Département | libelle_commune:Commune | secteur:Secteur"
        display="rentree_scolaire:select | libelle_academie:select | libelle_departement:select | libelle_commune:select | secteur:checkbox"
        sort="alpha:asc" max-values="8"
        url-sync url-params>
      </dsfr-data-facets>
    </div>

    <div class="fr-col-12 fr-col-md-9">
      <dsfr-data-kpi-group class="fr-mb-3w">
        <!-- count et non meta:total : sans server-side, count compte toutes
             les lignes reçues. Le seul des quatre jeux où c'est licite. -->
        <dsfr-data-kpi source="ips-f" value="count" format="nombre" col="3"
          heading="Sélection" label="EREA"></dsfr-data-kpi>
        <dsfr-data-kpi source="ips-f" value="ips:avg" format="decimal" decimals="1" col="3"
          heading="IPS moyen" label="de la sélection"></dsfr-data-kpi>
        <dsfr-data-kpi source="ips-f" value="ips:min" format="decimal" decimals="1" col="3"
          heading="IPS le plus bas" label="de la sélection"></dsfr-data-kpi>
        <dsfr-data-kpi value="=81.8" format="decimal" decimals="1" col="3"
          heading="Référence DEPP" label="IPS national des EREA, 2023-2024"></dsfr-data-kpi>
      </dsfr-data-kpi-group>

      <dsfr-data-map id="carte-ips"
        name="Établissements régionaux d'enseignement adapté et leur indice de position sociale"
        center="46.6,2.3" zoom="6" height="560px"
        tiles="ign-plan" tiles-style="muted"
        fit-bounds fit-max-zoom="11" fit-zone="none">
        <dsfr-data-map-layer id="c-erea" source="ips-f" type="circle"
          geo-field="position" radius="7" fill-opacity="0.8"
          fill-field="ips" classes="5" method="quantile"
          selected-palette="divergentAscending"
          tooltip-field="appellation_officielle">
        </dsfr-data-map-layer>
        <dsfr-data-map-legend for="c-erea"
          label="Indice de position sociale"></dsfr-data-map-legend>
        <dsfr-data-map-popup mode="panel-right"
          title-field="appellation_officielle" width="360px">
          <template>
            <p class="fr-badge fr-badge--sm fr-mb-2v">{{secteur|secteur non renseigné}}</p>
            <p class="fr-display--xs fr-mb-1v">{{ips|IPS non renseigné}}</p>
            <p class="fr-text--sm fr-mb-2v">Indice de position sociale, rentrée {{rentree_scolaire}}</p>
            <!-- les références que l'original transporte et n'affiche pas.
                 Libellées « référence DEPP », pas « moyenne » : la population
                 de référence n'est documentée nulle part (cf. Défauts n° 5). -->
            <ul class="fr-text--sm fr-mb-2v">
              <li>Référence départementale : {{ips_departemental|—}}</li>
              <li>Référence académique : {{ips_academique|—}}</li>
              <li>Référence nationale : {{ips_national|—}}</li>
            </ul>
            <p class="fr-text--sm fr-mb-1v"><strong>{{libelle_commune}}</strong>
               — {{libelle_departement}}, académie de {{libelle_academie}}, {{region}}</p>
            <p class="fr-text--xs fr-mb-0 odv-rubrique" data-intitule="UAI">{{uai}}</p>
          </template>
        </dsfr-data-map-popup>
      </dsfr-data-map>

      <!-- Sur 78 lignes, le tableau n'est pas un complément d'accessibilité :
           c'est la vue qui répond le mieux à la question posée. -->
      <dsfr-data-a11y source="ips-f" for="carte-ips" table download
        filename="ips-erea-2023-2024.csv"
        label="Les 78 EREA de France et leur indice de position sociale"
        label-field="appellation_officielle"
        value-field="ips, ips_departemental, ips_national, libelle_commune, libelle_departement, libelle_academie, secteur">
      </dsfr-data-a11y>
    </div>
  </div>
</div>
```

## Limites et points durs identifiés

1. **Le point dur de cette page n'est pas technique : c'est que le gabarit est
   surdimensionné pour son jeu.**
   *Obstacle* : reproduire fidèlement « trois filtres + une carte conditionnée » sur
   78 lignes produit une page qui demande trois clics pour montrer ce qui tient dans un
   écran. Aucun composant `dsfr-data` ne manque ; c'est le motif qui est faux.
   *Voie retenue* : charger les **706 lignes** (148 ms), afficher les 78 points de la
   rentrée courante d'emblée, ajouter le **sélecteur de rentrée** (une entrée de plus
   dans `fields`, coût nul) et faire du tableau une vue de premier plan.
   *Ce qu'il ne faut pas faire* : conclure que `dsfr-data` « ne sait pas » reproduire le
   parcours conditionné. Il le saurait — on ne le lui demande pas, parce que le
   reproduire serait reproduire le défaut. Distinction du CLAUDE.md : *est-ce la
   bibliothèque, ou est-ce d'avoir voulu reproduire à l'identique ?* Ici, clairement le
   second.

2. **Ce que la carte ne peut pas dire, et qu'un graphique dirait.**
   *Obstacle* : 78 points répartis sur 61 départements, dont 49 à un seul établissement.
   Une carte de points à cette densité ne montre ni classement, ni distribution, ni
   évolution. La choroplèthe de `fill-field` fonctionne, mais elle colore des points
   isolés : elle ne dessine aucun motif géographique lisible.
   *Voie native* : un `<dsfr-data-chart>` en barres horizontales, 78 barres triées par
   IPS, avec la référence nationale (81,8) en repère — et une seconde série temporelle
   sur les 9 rentrées, gratuite puisque les 706 lignes sont déjà chargées.
   **Attributs non vérifiés** : la fiche `dsfrDataChart` n'a pas été consultée pour cette
   analyse ; le nombre de barres tenable et le tracé d'une ligne de référence restent
   à confirmer. Piège connu applicable : `name` d'un `dsfr-data-chart` est une chaîne
   simple, pas la forme `'["…"]'` (AM-023).

3. **Les trois colonnes `*_prive` typées `text`, valant `"NA"`.**
   *Obstacle* : `ips_national_prive` = `"66.4"` ou `"NA"`. Une chaîne dans un
   `fill-field`, un `value="…:avg"` ou un tri numérique donne un résultat faux ou vide,
   **sans erreur**.
   *Voie native à essayer* : `<dsfr-data-normalize>` en amont — **non vérifié** que ses
   attributs sachent transformer `"NA"` en `null` et une chaîne numérique en nombre
   (la référence du composant n'a pas été relue sur ce point ; le piège maison connu
   ne concerne que `round`). À défaut, un `where` ODS excluant `"NA"`, ou simplement
   ne pas exposer ces trois colonnes.
   *Ce qui est certain* : les six autres colonnes de référence (`*_public` et sans
   suffixe) sont des `double` propres et utilisables directement.

4. **`insets="drom"` : à ne PAS poser sur ce jeu, et c'est un piège inversé.**
   *Obstacle* : le réflexe du dépôt est d'ajouter `insets="drom"` dès qu'un jeu couvre
   l'outre-mer. Or ce jeu n'a **qu'un seul** point ultramarin — l'EREA de Mamoudzou
   (Mayotte) — et **aucun** en Guadeloupe, Martinique, Guyane ni à La Réunion (ces
   quatre académies n'ont pas d'EREA). Poser cinq encarts en afficherait quatre vides.
   *Contrainte documentée* : dès qu'un encart ultramarin est présent, `fit-bounds` est
   clippé sur la métropole par défaut (référence de `fit-zone`), donc filtrer sur
   « Mayotte » — un unique point — ne recadrerait sur rien. Et BUG-004 s'applique en
   plein : `fit-bounds` + un clip sur un seul point renvoie une emprise vide.
   *Voie retenue* : **pas d'encart**, `fit-zone="none"`, et `fit-max-zoom="11"` pour
   éviter le zoom 18 sur un point isolé — les 49 départements à un seul EREA rendent ce
   cas fréquent, pas exceptionnel. **À vérifier au navigateur.**

5. **`count` plutôt que `meta:total` — l'exception des quatre pages.**
   Sur les trois jeux sœurs, le KPI de comptage doit utiliser `value="meta:total"`
   parce que `count` ne compte que la page reçue en `server-side` (JSDoc de `value`,
   #659). Ici, pas de `server-side` : toutes les lignes sont reçues, `count` est exact,
   et `ips:avg` l'est aussi. **C'est le seul des quatre jeux où la grammaire simple
   suffit** — et le noter évite de propager par copier-coller une précaution qui n'a
   pas lieu d'être.

6. **Ce qui ne se transpose pas, et n'a pas à l'être** — identique à la page collèges
   ([dataviz-ips-colleges.md](dataviz-ips-colleges.md) § « Limites » n° 8) : outils de
   dessin de zone d'`ods-map`, géocodeur « Trouver un lieu… », grille `col-xs-*`.
   Écarts assumés. Sur 78 points, le géocodeur n'a de toute façon aucun sens : la liste
   complète des 77 communes est affichable.

7. **Ce qui n'est pas une limite, et qu'il serait faux d'écrire.** Aucun des plafonds du
   dépôt n'est approché sur ce jeu : `max-records` (1 000 par défaut > 706),
   `max-items` (5 000 > 78), la pagination en série (1 requête), le plafond de 100
   valeurs de l'endpoint `/facets` (77 communes, 61 départements, 25 académies).
   Le mur `offset + limit ≤ 10 000` de l'API ODS, qui interdit le chargement client
   complet du jeu écoles (cf. [dataviz-ips-ecoles.md](dataviz-ips-ecoles.md)
   § « Chronométrage »), est à **plus de quatorze fois** le volume total d'ici.
   Invoquer une contrainte de performance sur cette page serait une critique fausse.

## Données à reproduire fidèlement

- [ ] Jeu `donnees-ips-erea`, rentrée **2023-2024** — **78** lignes, **toutes
      localisables** (zéro ligne orpheline, cas unique des quatre pages).
- [ ] IPS min **66,4** / max **124,3** / moyenne **80,59** ; **1 EREA sans IPS**
      (Jacques Brel, Garches) — à rendre visible, pas à omettre.
- [ ] Secteur : public **77** (IPS moyen 80,77) / privé sous contrat **1** (66,4,
      Mamoudzou).
- [ ] Référence nationale **81,8**, à libeller « référence DEPP » et non « moyenne » :
      la population de référence n'est documentée nulle part et l'écart à la moyenne
      simple (80,59) est systématique.
- [ ] Facette Académie : **25** valeurs (et non 30 : cinq académies n'ont aucun EREA),
      tri alphabétique, comptes exacts — Versailles 8, Lille 6, Bordeaux 5,
      Normandie 5 en tête. **Somme 78.**
- [ ] Facette Département : **61** valeurs **avec leur compte** — que l'original omet,
      alors que 49 d’entre eux n'ont qu'un seul établissement.
- [ ] Facette Commune : **77** valeurs, la liste complète (Garches 2, toutes les autres
      à 1).
- [ ] Infobulle : les 5 champs de l'original **au minimum**, IPS en virgule décimale
      française, **et** au moins une des trois références que le jeu transporte.
- [ ] Cadrage initial **sur la France**, pas sur la Suisse. **Pas d'encart DROM** :
      un seul point ultramarin (Mayotte).
- [ ] Carte non vide au chargement : les 78 EREA visibles d'emblée, sans aucun clic.
- [ ] **Le sigle EREA développé** au moins une fois.
- [ ] En bonus gratuit (148 ms, 58 Ko) : les **9 rentrées**, 706 lignes, et un sélecteur
      d'année — IPS moyen 75,62 sur la période, amplitude 53,1 à 125,9.

## Gabarit partagé

Le § « Gabarit partagé » de [dataviz-ips-colleges.md](dataviz-ips-colleges.md) établit
que les quatre pages IPS sont le même fichier à un attribut près. **La page EREA est
celle qui le confirme le plus complètement** : son template ne diffère de celui de la
page collèges que par le `dataset-id` et le mot « EREA » du H1. Aucune des divergences
relevées ailleurs ne s'y trouve — pas de `-sort` manquant (écoles), pas de `ng-show`
sur un champ inexistant (lycées), pas de `</div>` surnuméraire (lycées), pas de test
sur `refine.departement` (écoles).

**Ce que la page EREA apporte au tableau des différences :**

| | Écoles | Collèges | Lycées | **EREA** |
|---|---|---|---|---|
| Titre interne du jeu | `dataviz3` | `dataviz2` | `dataviz1` | **`dataviz4`** |
| Lignes 2023-2024 | 32 625 | 6 985 | 3 612 | **78** |
| Lignes toutes rentrées | 279 318 | 62 646 | 32 618 | **706** |
| Champs | 29 | 11 | 13 | **24** |
| Champ(s) d'IPS | `ips` + 9 réf. | `ips` seul | 3 champs de voie | **`ips` + 9 réf., dont 3 typées `text`** |
| Lignes sans `position` | 304 | 14 | 20 | **0** |
| Départements / communes | 103 / 17 351 | 103 / 3 791 | 102 / 1 392 | **61 / 77** |
| Facette Commune tronquée à 100 ? | oui (0,6 % visible) | oui (2,6 %) | oui (7,2 %) | **non — 100 % visible** |
| `max-items` à relever ? | oui | oui | non | **non** |
| `max-records` à poser ? | mur ODS à 10 000 offsets | oui (8 000) | oui (4 000) | **non — le défaut 1 000 couvre les 706 lignes** |
| `server-facets` nécessaire ? | oui + `server-search` | oui | facultatif | **non — tout est côté client** |
| KPI de comptage | `meta:total` | `meta:total` | `meta:total` | **`count` suffit** |
| Chargement complet | **impossible par l'adaptateur** | 70 A-R | 37 A-R, 3,4 s | **1 A-R, 88 ms (148 ms pour les 9 rentrées)** |
| Clustering observé | dès ~344 points | non | non | **non** |

**Ce que ça change pour la factorisation.** Les quatre pages partagent une maquette ;
elles ne partagent pas une architecture. Le tableau ci-dessus se lit comme un gradient :

- **EREA (78 lignes)** — tout côté client, facettes locales, `count`, aucun plafond
  approché, et de la place pour ce que l'original n'a pas (série temporelle, graphique
  classé, tableau en vue principale).
- **Lycées (3 612)** — client complet encore possible mais à 37 allers-retours et 3,4 s ;
  `max-records` obligatoire ; `dsfr-data-unpivot` pour les deux voies.
- **Collèges (6 985)** — `max-records="8000"`, `max-items` à relever, `server-facets`.
- **Écoles (32 625)** — chargement complet **impossible** par l'adaptateur
  (plafond `offset + limit ≤ 10 000` de l'API ODS) ; `server-side` + `bbox` ;
  `server-search` au lieu d'une facette pour les communes.

C'est l'enseignement transverse du lot 12, et il tient en une phrase :
**la même page d'origine appelle deux architectures `dsfr-data` opposées selon le jeu
qu'on lui branche** — tout côté client sur EREA, tout côté serveur sur les écoles.
Le corollaire vaut pour l'analyse : une limite de performance invoquée sur les écoles
est un fait mesuré ; la même invoquée sur les EREA serait une critique fausse.
