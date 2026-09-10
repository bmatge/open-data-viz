# IPS Écoles

- **URL** : https://data.education.gouv.fr/pages/dataviz-ips-ecoles/
- **Catalogue** : id **34**, thématique **Éducation**, sous-thématique **Ecoles** (sic, sans
  accent dans le jeu du catalogue). Titre « IPS Ecoles », description « Indices de position
  sociale des écoles de France pour l'année scolaire 2023-2024 ».
  Vignette `/assets/theme_image/preview-dataviz-ips-ecoles.jpg`.
- **Producteur (métadonnée du jeu)** : DEPP — Ministère en charge de l'éducation nationale.
  Licence ouverte v2.0 (Etalab).
- **Jeu de données utilisé par la page** : **`donnees-ips-ecoles`** — **279 318 lignes**
  toutes rentrées, **32 625 pour 2023-2024**. Jeu technique `hors catalogue`
  (titre interne `dataviz3`, description « Jeu de données technique, utilisé par une page
  de dataviz. »), lisible **sans clé**.
  - **29 champs** — c'est le plus riche des quatre jeux IPS, et le seul à porter
    **deux jeux de colonnes géographiques concurrents** :
    - lot « source DEPP », jamais nul : `code_region` (int), `region`, `code_de_l_academie`
      (int), `academie`, `code_du_departement` (int), `departement`,
      `code_insee_de_la_commune`, `nom_de_la_commune` — **en capitales sans accents**
      (`LYON`, `AIN`, `MIONNAY`) ;
    - lot « référentiel adresse », **304 valeurs nulles** : `appellation_officielle` (305),
      `libelle_commune`, `code_commune`, `libelle_departement`, `code_departement`,
      `libelle_academie`, `position` (geo_point_2d) — en casse normale accentuée
      (`Lyon`, `Ain`, `Mionnay`) ;
    - lot IPS : `ips` (double), plus **neuf valeurs de référence** —
      `ips_national`, `ips_national_public`, `ips_national_prive`, `ips_academique`,
      `ips_academique_public`, `ips_academique_prive`, `ips_departemental`,
      `ips_departemental_public`, `ips_departemental_prive` ;
    - divers : `rentree_scolaire` (text), `uai`, `secteur`, `num_ligne`.
  - Facettes **déclarées au back-office** (endpoint `/facets` sans paramètre) :
    `academie`, `departement`, `nom_de_la_commune`, `rentree_scolaire` — c'est-à-dire
    **les colonnes en capitales**, pas celles qu'utilise la page. Sans conséquence pour
    l'original ni pour la transposition (cf. § « Transposition », note sur `server-facets`).
  - Répartition par rentrée : **2023-2024 32 625** · 2024-2025 32 509 · 2022-2023 31 989 ·
    2021-2022 30 413 · 2020-2021 30 399 · 2018-2019 30 442 · 2019-2020 30 386 ·
    2017-2018 30 324 · 2016-2017 30 231. Neuf rentrées.
- **Relevé visuel** : 2026-09-10, Chrome, fenêtre 1568 × 751, onglet dédié.

## Objectif de la dataviz et informations véhiculées

- **Question à laquelle elle répond** : « Où sont les écoles de mon département ou de ma
  commune, et quel est l'indice de position sociale de chacune ? » Localisateur
  d'établissement avec une valeur attachée — même objet que la page collèges.
- **Message porté** : aucun. Pas de chapô, pas de définition de l'IPS, pas de moyenne,
  pas de comparaison. Le seul texte hors libellés de filtres est le H1 et l'invite
  « Sélectionnez un département ou une commune ».
- **Information que l'utilisateur doit obtenir** : pour une école donnée — sa rentrée,
  son UAI, sa commune, son appellation officielle et son **IPS** 2023-2024, lus dans
  l'infobulle d'une épingle ; et le CSV filtré.
- **Ce qui n'est pas dans l'objet** — les cinq manques de la page collèges
  (cf. [dataviz-ips-colleges.md](dataviz-ips-colleges.md) § « Objectif »), **plus un
  gâchis propre aux écoles** :
  - le jeu porte **neuf colonnes de référence** (IPS national, académique, départemental,
    chacun décliné public / privé / ensemble) qui permettraient d'afficher un **écart à la
    référence** — « cette école est 12 points au-dessus de la moyenne de son
    département » — c'est-à-dire exactement l'information qui manque à la page collèges
    parce que son jeu ne l'a pas. Ici elle est là, transportée dans chaque ligne de la
    réponse API, et **l'infobulle ne l'affiche pas**. C'est le seul cas des quatre pages
    où l'information de comparaison existe dans le jeu et est jetée à l'affichage ;
  - le jeu couvre **279 318 lignes sur neuf rentrées** ; la page en montre 32 625
    (11,7 %), figées par un `ng-init`.

## Chiffres de référence (API v2.1, rentrée 2023-2024)

| Mesure | Valeur |
|---|---|
| Écoles (lignes) | **32 625** |
| Lignes avec un IPS renseigné | 30 065 — **2 560 sans IPS** (2 254 public, 306 privé) |
| Lignes sans `position` / `libelle_*` | **304** (les mêmes lignes : `position is null and libelle_departement is null` → 304) |
| Lignes sans `appellation_officielle` | 305 |
| IPS min / max / moyenne | **53,4** / **160,6** / **104,47** |
| Secteur `public` | 28 076 lignes, IPS moyen **102,69** |
| Secteur `privé sous contrat` | 4 549 lignes, IPS moyen **115,30** |
| Références portées par le jeu | `ips_national` **105,5** ; `ips_national_public` **102,9** ; `ips_national_prive` **120,3** ; 28 valeurs d'`ips_academique` ; 75 valeurs d'`ips_departemental` |
| Académies distinctes (`libelle_academie`) | **30** (+ 1 groupe `null` de 304 lignes) — somme des comptes de facette **32 321** |
| Départements distincts (`libelle_departement`) | **103** (+ 1 groupe `null`) |
| Départements distincts (`departement`, capitales) | **101** — `GUADELOUPE` y recouvre Guadeloupe + Saint-Martin + Saint-Barthélémy |
| Communes distinctes (`libelle_commune`) | **17 351** (+ 1 `null`) — contre **17 470** sur `nom_de_la_commune` |
| Départements les plus fournis | Nord 1 268 · Pas-de-Calais 836 · Rhône 718 · Bouches-du-Rhône 687 · Isère 671 · Seine-et-Marne 658 · Loire-Atlantique 629 · Gironde 614 |
| Académies les plus fournies | Nantes 2 193 · Lille 2 104 · Rennes 1 978 · Grenoble 1 974 · Versailles 1 866 · Normandie 1 759 |
| IPS moyen départemental le plus bas | Mayotte **75,3** (121 écoles) · Guyane 82,1 · La Réunion 85,6 |
| IPS moyen départemental le plus haut | Hauts-de-Seine **124,2** (364) · Paris 123,3 (451) · Yvelines 121,4 (567) |

## Le template AngularJS

```html
<ods-dataset-context context="frenipslyceesdataviz"
                     frenipslyceesdataviz-dataset="donnees-ips-ecoles">
```

Contexte unique nommé **`frenipslyceesdataviz`** (nom de la page lycées, recopié —
cf. § « Gabarit partagé »). **Seule des quatre pages, celle-ci n'a pas d'attribut
`-sort="-rentree_scolaire"`.** Sans effet visible : le filtre `ng-init` fige de toute
façon une rentrée unique.

Le reste du template est identique à celui de la page collèges
([dataviz-ips-colleges.md](dataviz-ips-colleges.md) § « Le template AngularJS ») :
`ng-init="nbdepts=10; …['refine.rentree_scolaire']='2023-2024';"`, deux `ods-facet`
(`libelle_academie`, `libelle_commune`), une liste maison `ods-adv-analysis` sur
`libelle_departement`, une `ods-map` centrée `5,47.35371,8.98682` avec une couche
`show-if="…libelle_departement || …libelle_commune"`, un lien `getDownloadURL('csv')`,
la grille Bootstrap `col-xs-2` / `col-xs-10`, aucun `ctx-apikey`, aucun `urlsync`.

**Une divergence de code propre aux écoles** : les liens « > Plus » / « > Moins » de la
liste des départements testent `!…parameters['refine.departement']` (le champ en
capitales), là où lycées et EREA testent `refine.libelle_departement`. Comme la page ne
refine jamais `departement`, la condition est toujours vraie : **le lien reste affiché
après avoir choisi un département**. Vérifié à l'écran (après refine « Nord », « > Moins »
reste visible, `offsetWidth` 183). Effet nul en pratique — la liste ne contient plus
qu'une entrée — mais c'est la signature d'un copier-coller entre deux jeux aux noms de
colonnes différents.

## Relevé visuel exhaustif

### 1. Bandeau de titre

Fond gris clair pleine largeur, un H1 en gras : « Indices de position sociale des écoles
de France pour l'année scolaire 2023-2024 ». Pas de chapô, pas de lien vers le jeu.

### 2. Colonne de gauche — les filtres (`col-xs-2`, ~185 px)

Mise en page et comportements **identiques à la page collèges**
([dataviz-ips-colleges.md](dataviz-ips-colleges.md) § 2) : H4 conditionnel, trois blocs
(facette Académie / liste maison Département sans compteur / facette Commune), 6 valeurs
visibles + « Plus », champ de recherche de facette présent mais invisible
(`offsetWidth` 0, vérifié sur les deux facettes), libellés coupés en plein mot.

**Ce qui diffère — les valeurs réelles :**

**a. Facette « Académie »** — 30 valeurs après « Plus » (comptées dans le DOM).
Visibles au chargement : Aix-Marseille 1 162 · Amiens 1 205 · Besançon 705 ·
Bordeaux 1 703 · Clermont-Ferrand 901 · Corse 178.
Les 30 valeurs relevées à l'écran, avec leurs comptes :
Aix-Marseille 1 162 · Amiens 1 205 · Besançon 705 · Bordeaux 1 703 ·
Clermont-Ferrand 901 · Corse 178 · Créteil 1 481 · Dijon 999 · Grenoble 1 974 ·
Guadeloupe 174 · Guyane 133 · La Réunion 360 · Lille 2 104 · Limoges 404 · Lyon 1 555 ·
Martinique 159 · Mayotte 121 · Montpellier 1 322 · Nancy-Metz 1 246 · Nantes 2 193 ·
Nice 706 · Normandie 1 759 · Orléans-Tours 1 321 · Paris 451 · Poitiers 970 ·
Reims 717 · Rennes 1 978 · Strasbourg 780 · Toulouse 1 694 · Versailles 1 866.
**Somme 32 321 ; 304 écoles n'ont pas d'académie renseignée** (l'écart au total 32 625
n'est affiché nulle part).

**b. Liste « Département »** — 10 entrées, puis « > Plus » → **103** entrées
(comptées dans le DOM : Ain … Yvelines), puis « > Moins ». Aucun compteur affiché.
Même tri de collation brute que sur collèges (« Alpes-Maritimes » avant
« Alpes-de-Haute-Provence »).

**c. Facette « Commune »** — **100 valeurs dans le DOM**, d'**Abancourt** (1) à
**Aillevillers-et-Lyaumont** (1), sur **17 351 communes**. Le plafond de l'API de
facettes coupe à la lettre « Ai » : **99,4 % des communes sont inatteignables** sans
refine amont. Six valeurs visibles au chargement : Abancourt 1 · Abbaretz 2 ·
Abbeville 12 · Abbévillers 1 · Abeilhan 1 · Abergement-la-Ronce 1.

### 3. Colonne de droite — la carte (`col-xs-10`)

**Au chargement** : identique à collèges — cadrage `5,47.35371,8.98682`, soit **zoom 5
sur la Suisse**, échelle 300 km, Berne / Zurich / Munich / Milan / Prague à l'écran, la
France repoussée sur le bord gauche, et **zéro épingle**
(`document.querySelectorAll('.leaflet-marker-icon').length` = 0). Fond IGN/Huwise
raster couleur, non atténué. Mêmes contrôles (plein écran, dessin polygone / rectangle /
cercle, zoom, géocodeur, géolocalisation, sélecteur de calques, échelle).

**Après un refine — c'est ici que la page écoles se distingue.** La couche `ods-map-layer`
n'a aucun attribut de rendu, mais ODS bascule **automatiquement en clusters** au-delà
d'un certain nombre de points. Relevé, par clics réels :

| Sélection | Points | Rendu observé | Échelle |
|---|---:|---|---|
| Commune « Anzin » (dép. Nord) | 5 | **5 épingles rouges** individuelles | 300 m |
| Département « Lozère » | 97 | **97 épingles rouges** individuelles, fit sur le département | 20 km |
| Département « Aube » | 175 | 175 épingles individuelles | — |
| Département « Somme » | 344 | **8 bulles de cluster orange** (145, 71, 49, 44, 20, 6, 5, 3 = 343) **+ 1 épingle** isolée, fit sur le département | 30 km |
| Département « Pas-de-Calais » | 836 | 9 bulles de cluster (335, 141, 77, 68, 54, 46 …) | 30 km |
| Département « Nord » | 1 268 | **une seule bulle rouge « 1 268 »**, pas de fit : l'échelle reste à 300 km et le cadre montre Bruxelles, Paris, Strasbourg | 300 km |

La bascule épingles → clusters se situe donc **entre 175 et 344 points** (non affinée).
Conséquence de lecture : sur les départements les plus peuplés — précisément ceux qu'on
consulte le plus — la carte ne montre **aucun établissement**, seulement un chiffre.
Cliquer la bulle « 1 268 » zoome d'un cran (300 km → 30 km) et affiche l'enveloppe convexe
des points en rouge translucide, toujours agrégée en une seule bulle. Il faut trois ou
quatre zooms pour atteindre un établissement.

**Infobulle au clic** sur une épingle (relevée sur l'école élémentaire Simone Veil,
Anzin) : bulle blanche Leaflet, croix de fermeture, **cinq couples libellé / valeur** :

| Libellé | Valeur relevée |
|---|---|
| Rentrée scolaire | 2023-2024 |
| UAI | 0590488K |
| **Nom de la commune** | **ANZIN** |
| Appellation officielle | Ecole élémentaire Simone Veil |
| IPS | 83,8 |

Trois observations sur cette bulle :

1. Elle affiche **`nom_de_la_commune`** — la colonne en capitales — alors que la facette
   Commune juste à gauche affiche `libelle_commune`. **La même page écrit « Anzin » dans
   le filtre et « ANZIN » dans l'infobulle**, à 60 px d'écart.
2. Le premier libellé commence par un **BOM** : le texte réellement rendu est
   `"﻿Rentrée scolaire"` (lu dans `.leaflet-popup-content`). Trace d'un import
   CSV UTF-8-BOM, présente sur les quatre pages.
3. **Vingt-quatre des vingt-neuf champs sont écartés**, dont les neuf colonnes de
   référence IPS et le `secteur`. La configuration de bulle est faite au back-office
   (la page ne pose aucun attribut d'infobulle).

### 4. Pied de section

Un lien : « Télécharger les données filtrées au format csv »,
`ng-href="{{…getDownloadURL('csv')}}"`, `target="_blank"`. Testé en curl avec les refines
`rentree_scolaire=2023-2024`, `libelle_departement=Nord`, `libelle_commune=Anzin` :
**200**, CSV point-virgule, **29 colonnes**, 5 lignes + en-tête, 1 647 octets.
Le lien fonctionne bien que le jeu soit `hors catalogue`.

## Défauts et bizarreries de l'original

Les défauts **1, 2, 4, 5, 8, 9, 10, 11, 12 et 13** de la page collèges
([dataviz-ips-colleges.md](dataviz-ips-colleges.md) § « Défauts ») se retrouvent
**à l'identique** : carte centrée sur la Suisse, carte vide au chargement, départements
sans compteur, aucun sélecteur de rentrée, BOM sur le libellé, grille Bootstrap 3 dans
une page DSFR, contexte nommé `frenipslyceesdataviz`, URL non partageable, donnée
principale non représentée, jeu source hors catalogue. Ce qui suit est **spécifique aux
écoles** ou change d'ordre de grandeur.

1. **La facette Commune ne donne accès qu'à 100 des 17 351 communes** — d'Abancourt à
   Aillevillers-et-Lyaumont, soit **0,58 %**. Sur collèges le plafond couvrait
   Abbeville → Aramon sur 3 791 communes (2,6 %) ; ici la troncature ne laisse même pas
   sortir de la lettre « A ». Et **la cascade ne sauve pas** : après refine sur le Nord,
   le plus gros département, il reste **566 communes** — toujours plafonné à 100.
   **79 des 103 départements ont plus de 100 communes.** C'est le défaut le plus lourd
   de la page.
2. **Les départements très fournis n'affichent aucun établissement.** Passé ~300 points,
   la carte ne montre que des bulles de comptage ; sur le Nord, **une seule bulle
   « 1 268 »** pour tout le département. Le premier écran d'un utilisateur qui clique le
   département le plus peuplé de France est un cercle rouge avec un nombre dedans.
3. **La page utilise systématiquement la colonne la moins complète.** Pour chacun des
   quatre axes, le jeu propose deux colonnes, et la page choisit celle qui a
   **304 valeurs nulles** :

   | Axe | Colonne utilisée par la page | nuls | Colonne alternative | nuls |
   |---|---|---:|---|---:|
   | Académie | `libelle_academie` | 304 | `academie` | 0 |
   | Département | `libelle_departement` | 304 | `departement` | 0 |
   | Commune (facette) | `libelle_commune` | 304 | `nom_de_la_commune` | 0 |
   | Commune (infobulle) | `nom_de_la_commune` | 0 | — | — |

   Le choix est défendable pour l'affichage (les `libelle_*` sont accentués et en casse
   normale, les autres en capitales brutes), mais il a un coût : **304 écoles
   n'apparaissent dans aucun filtre**. Et il n'est pas tenu : l'infobulle bascule sur la
   colonne en capitales, produisant l'incohérence « Anzin » / « ANZIN » à l'écran.
   Le piège maison « Deux colonnes pour la même info » veut qu'on compte les nuls avant
   de choisir — c'est fait ici, et il faut choisir **`departement` / `academie` /
   `nom_de_la_commune` puis les recapitaliser à l'affichage**, pas l'inverse.
   Note : `departement` n'est pas un simple équivalent — il compte **101** valeurs
   contre 103, `GUADELOUPE` y recouvrant Guadeloupe, Saint-Martin et Saint-Barthélémy.
4. **2 560 écoles sans IPS** (7,8 % — contre 5 sur 6 985 chez les collèges, soit 0,07 %).
   L'ordre de grandeur change la nature du problème : ce n'est plus une anomalie
   ponctuelle mais une catégorie. Leur épingle s'affiche ; **l'infobulle omet purement et
   simplement la ligne « IPS »** au lieu de l'afficher vide — comportement observé sur la
   page EREA (établissement Jacques Brel à Garches), qui utilise la même mécanique de
   bulle. Le lecteur ne sait pas s'il regarde une école sans IPS ou une bulle tronquée.
5. **304 écoles fantômes** — mêmes lignes que le point 3 : elles ont `uai`, `secteur`,
   `ips`, `academie`, `departement`, `nom_de_la_commune`, mais ni `position`, ni
   `appellation_officielle`, ni les colonnes `libelle_*`. Invisibles sur la carte,
   inatteignables par les trois filtres, comptées dans le total. Sur collèges il y en
   avait 14.
6. **Neuf colonnes de référence transmises et jamais affichées.** Chaque ligne de chaque
   réponse porte les IPS national / académique / départemental, déclinés public, privé et
   ensemble. La bulle en montre zéro. C'est du poids réseau payé pour rien
   (cf. § « Chronométrage ») **et** l'information qui manquait à la page collèges,
   disponible ici et non utilisée.
7. **Le lien « > Plus » ne se cache pas après un refine de département** (condition
   portant sur `refine.departement`, jamais posé). Cosmétique.
8. **Aucun sélecteur de rentrée alors que 2024-2025 est chargé** (32 509 écoles) : la
   page a une rentrée de retard sur sa propre source, comme ses trois sœurs.

## Chronométrage — l'architecture de chargement (le point dur du lot)

Règle du dépôt : mesurer la durée **et** le nombre d'allers-retours avant de conclure.
Mesures faites en Node (`fetch`, gzip actif) depuis la même machine, deux passes,
2026-09-10, sur la rentrée 2023-2024 (32 625 lignes).

| Voie | Allers-retours | Durée | Volume reçu (gz) | Volume décompressé |
|---|---:|---:|---:|---:|
| `/exports/json?limit=-1` — export complet, 29 champs | **1** | **2,9 s** (2,91 / 3,13) | 3,51 Mo | 29,1 Mo |
| `/exports/json` + `select` de 6 champs | **1** | **2,3 s** (2,31 / 3,00) | 1,88 Mo | 7,74 Mo |
| `/records?limit=100` en **série**, 100 pages | 100 | **12,57 s** (médiane 94 ms/req., min 74, max 566) | — | 10 000 lignes |
| `/records?limit=100`, 100 pages, **concurrence 6** | 100 | **4,08 s** | — | 10 000 lignes |
| `/records` agrégé `group_by=libelle_departement` | **1** | **142 ms** | — | 104 lignes |
| `/records` agrégé `group_by=libelle_commune` | **1** | **810 ms** | — | 17 351 lignes |
| `/exports/json` filtré sur un département (Nord) | **1** | **203 ms** | — | 1 268 lignes |
| `/records` une page `server-side` (page-size 100) | **1** | **84 ms** | — | 100 lignes |
| `/records?where=in_bbox(position, …)` (Île-de-France) | **1** | **94 ms** | — | 100 lignes |

**Le fait décisif n'est pas une durée, c'est un mur.** L'API Explore v2.1 refuse
`offset + limit > 10 000` :

```
offset=9900 → 200, 100 lignes
offset=9901 → 400  « Invalid value for sum of offset + limit API parameter:
                     10001 was found but <= 10000 is expected. »
```

Or l'adaptateur ODS de `dsfr-data` charge **exclusivement par `/records` paginé en
offset**, 100 lignes par requête, en série
(`packages/core/src/adapters/opendatasoft-adapter.ts`, `ODS_PAGE_SIZE = 100`,
boucle `for (let page = 0; page < maxPages; page++)` avec `offset += pageResults.length`) —
`/exports/json` n'est jamais appelé. Et la boucle **lève** sur une réponse non-200 :

```ts
if (!response.ok) {
  throw new Error(`HTTP ${response.status}: ${response.statusText}`);
}
```

Donc `max-records="35000"` sur cette source ne tronque pas silencieusement : elle
**émet un `dsfr-data-error` à la 101ᵉ requête**, après ~12 s, et la page ne montre rien.
Ce n'est pas la même chose que le piège PG-013 (`max-items` qui tronque) ni que le piège
`max-records` par défaut (qui tronque à 1 000 en silence) : c'est un **plafond dur de
l'API ODS**, à 10 000 lignes, qui rend le chargement client complet **impossible par la
voie adaptateur**, quel que soit `max-records`. Vérifié à l'API ; **le comportement de
bout en bout n'a pas été rejoué dans le navigateur** sur une page `dsfr-data` réelle.

À l'inverse `/exports/json` ramène les 32 625 lignes **en une requête et 2,9 s**, et le
`select` de six champs divise le décompressé par 3,8 (29,1 → 7,7 Mo) pour 0,6 s de moins.
La voie honnête pour un chargement complet est donc la **source générique**
(`url=` + `params`), au prix documenté : plus de `server-side`, plus de `server-facets`,
plus de `server-search`, et 7,7 Mo en mémoire navigateur.

## Transposition vers `dsfr-data`

Attributs vérifiés dans les références générées depuis le source
(`get_skill(dsfrDataSource|dsfrDataFacets|dsfrDataMap|dsfrDataSearch|dsfrDataKpi,
"reference")`) et dans `~/Developer/GitHub/dsfr-data`. Tout attribut non vérifié est
signalé.

| Original Opendatasoft | `dsfr-data` | Attributs nécessaires |
|---|---|---|
| `<ods-dataset-context …-dataset="donnees-ips-ecoles">` (sans `-sort`) | `<dsfr-data-source>` | `api-type="opendatasoft"`, `base-url="https://data.education.gouv.fr"`, `dataset-id="donnees-ips-ecoles"`, `server-side`, `page-size="100"`. **Pas d'`api-key-ref`** : le portail répond en anonyme. **Pas de `max-records` élevé** : cf. « Limites » n° 1. |
| `ng-init="…['refine.rentree_scolaire']='2023-2024'"` | même balise | `where="rentree_scolaire = '2023-2024' and position is not null"` — un `where` sur la balise déjà présente plutôt qu'un composant de plus (PG-015). Le `position is not null` écarte les 304 orphelines de façon explicite. |
| `<ods-facet name="libelle_academie" sort="alphanum">` | `<dsfr-data-facets>` | `server-facets`, `fields="libelle_academie, libelle_departement, secteur"` (virgules), `labels="… \| …"` (barres), `sort="alpha:asc"`, `display="libelle_academie:select \| libelle_departement:select \| secteur:checkbox"`. **Le fait que `libelle_academie` ne soit pas déclarée au back-office n'est pas bloquant** : `fetchFacets()` appelle `/facets?facet=<champ>` en passant chaque champ explicitement (`url.searchParams.append('facet', f)`), et j'ai vérifié à l'API que `/facets?facet=libelle_academie` répond bien sur ce jeu. Le piège « jeu sans facette déclarée » ne s'applique donc pas ici. |
| Liste maison `ods-adv-analysis` + `limitTo:nbdepts` | même `<dsfr-data-facets>` | rien de plus : `max-values="6"` rend nativement le « Voir plus », et le compteur — que l'original calcule et n'affiche pas — est là par défaut. |
| Facette Commune plafonnée à 100 valeurs sur 17 351 | **`<dsfr-data-search server-search>`**, **pas** une facette | `fields="libelle_commune"`, `server-search`, `count`, `label="Chercher une commune"`, `min-length="2"`. Voir « Limites » n° 2 : la facette serveur est plafonnée à 100 valeurs **par l'API ODS elle-même**, et la cascade départementale ne suffit pas sur ce jeu. |
| `<ods-map location="5,47.35371,8.98682" ods-auto-resize>` | `<dsfr-data-map>` | `center="46.6,2.3"`, `zoom="6"`, `height`, `tiles="ign-plan"`, `tiles-style="muted"`, `fit-bounds`, `fit-max-zoom="13"`, `fit-zone="none"`, `name`. `ods-auto-resize` sans équivalent : responsive par construction. |
| `<ods-map-layer show-if="…">`, épingles rouges puis clusters automatiques | `<dsfr-data-map-layer>` | `type="circle"`, `geo-field="position"`, `radius="4"`, `fill-field="ips"`, `classes="5"`, `method="manual"`, `breaks="85,95,105,120"`, `selected-palette="divergentAscending"`, `cluster`, `cluster-radius`, `max-items` (défaut 5 000 — cf. « Limites » n° 3), `bbox`, `bbox-debounce="400"`, `tooltip-field="appellation_officielle"`. Pas de `show-if` : la couche montre ce que la source publie. **Le clustering, qu'ODS impose au-delà de ~300 points, devient ici un choix explicite** — et la choroplèthe de couleur donne à la carte la lecture que l'original n'a pas. |
| Infobulle back-office (5 champs, `nom_de_la_commune` en capitales) | `<dsfr-data-map-popup>` + `<template>` | `mode="panel-right"`, `title-field="appellation_officielle"`, `width="380px"`. Le `<template>` interpole `{{champ\|défaut}}` et peut enfin **poser les références** : `{{ips}}` contre `{{ips_departemental}}` et `{{ips_national}}`. |
| — (absent de l'original) | `<dsfr-data-map-legend>` | `for`, `label="Indice de position sociale (2023-2024)"`. |
| — (absent) | `<dsfr-data-kpi>` ×3 dans un `<dsfr-data-kpi-group>` | `value="meta:total"` pour le compte (**pas `count`**, qui ne compte que la page reçue en `server-side` — JSDoc de `value`, #659), `format="nombre"`, `col="4"`, `heading`, `label`. Pour l'IPS moyen : cf. « Limites » n° 5. |
| `<a ng-href="{{…getDownloadURL('csv')}}">` | `<dsfr-data-a11y>` | `download`, `filename="ips-ecoles-2023-2024.csv"`, `table`, `for`, `label-field`, `value-field`. On gagne le tableau accessible que l'original n'a pas. |
| — (absent) | `<dsfr-data-facets url-sync url-params>` | corrige le défaut « URL non partageable » sans composant supplémentaire : deux attributs booléens sur la balise déjà présente. |

### Esquisse de code

```html
<!-- 32 625 écoles, 29 champs. Pas de clé : le portail éducation répond en anonyme.
     ATTENTION : pas de max-records élevé ici — /records v2.1 refuse offset+limit > 10 000
     et l'adaptateur lève à la 101e page. Architecture retenue : server-side + bbox. -->
<dsfr-data-source id="ips"
  api-type="opendatasoft"
  base-url="https://data.education.gouv.fr"
  dataset-id="donnees-ips-ecoles"
  select="uai, appellation_officielle, secteur, ips, ips_national, ips_academique,
          ips_departemental, libelle_commune, libelle_departement, libelle_academie, position"
  where="rentree_scolaire = '2023-2024' and position is not null"
  server-side page-size="100">
</dsfr-data-source>

<!-- Source d'agrégation dédiée : 1 requête, 142 ms, 103 lignes.
     Alimente la carte départementale de synthèse et le KPI « IPS moyen ». -->
<dsfr-data-source id="ips-dept"
  api-type="opendatasoft"
  base-url="https://data.education.gouv.fr"
  dataset-id="donnees-ips-ecoles"
  where="rentree_scolaire = '2023-2024' and libelle_departement is not null"
  group-by="libelle_departement"
  select="count(*) as n, avg(ips) as ips_moyen"
  limit="200">
</dsfr-data-source>

<div class="fr-container fr-mt-6w">
  <h1>Indice de position sociale des écoles — rentrée 2023-2024</h1>
  <p class="fr-text--lead">
    L'IPS résume la position sociale des familles des élèves d'un établissement.
    Sur les 32 625 écoles de la rentrée 2023-2024, 30 065 ont un IPS renseigné :
    la moyenne est de 104,5 et l'échelle observée va de 53,4 à 160,6.
    La référence nationale portée par le jeu est de 105,5 (102,9 dans le public,
    120,3 dans le privé sous contrat).
  </p>
  <p class="fr-text--sm">
    304 écoles sont absentes de la carte et des filtres : elles n'ont pas de
    coordonnées géographiques dans la source.
  </p>

  <div class="fr-grid-row fr-grid-row--gutters">
    <div class="fr-col-12 fr-col-md-3">
      <h2 class="fr-h6">Filtrer</h2>
      <!-- server-search AVANT les facettes : 17 351 communes ne tiennent pas
           dans une facette (plafond 100 valeurs de l'API ODS /facets). -->
      <dsfr-data-search id="ips-q" source="ips" server-search count
        fields="libelle_commune, appellation_officielle"
        label="Chercher une commune ou une école" min-length="2">
      </dsfr-data-search>

      <dsfr-data-facets id="ips-f" source="ips-q" server-facets
        fields="libelle_academie, libelle_departement, secteur"
        labels="libelle_academie:Académie | libelle_departement:Département | secteur:Secteur"
        display="libelle_academie:select | libelle_departement:select | secteur:checkbox"
        sort="alpha:asc" max-values="8"
        url-sync url-params>
      </dsfr-data-facets>
    </div>

    <div class="fr-col-12 fr-col-md-9">
      <dsfr-data-kpi-group class="fr-mb-3w">
        <!-- meta:total, pas count : en server-side, count ne compte que la page reçue (#659). -->
        <dsfr-data-kpi source="ips-f" value="meta:total" format="nombre" col="4"
          heading="Sélection" label="écoles"></dsfr-data-kpi>
        <!-- ips_moyen vient de la source d'agrégation : il ne suit PAS les facettes.
             Voir « Limites » n° 5. -->
        <dsfr-data-kpi source="ips-dept" value="ips_moyen:avg" format="decimal" decimals="1"
          col="4" heading="IPS moyen" label="moyenne des départements"></dsfr-data-kpi>
        <dsfr-data-kpi value="=105.5" format="decimal" decimals="1" col="4"
          heading="Référence nationale" label="IPS national 2023-2024"></dsfr-data-kpi>
      </dsfr-data-kpi-group>

      <dsfr-data-map id="carte-ips"
        name="Écoles de France et leur indice de position sociale"
        center="46.6,2.3" zoom="6" height="620px"
        tiles="ign-plan" tiles-style="muted"
        fit-bounds fit-max-zoom="13" fit-zone="none">
        <dsfr-data-map-layer id="c-ecoles" source="ips-f" type="circle"
          geo-field="position" radius="4" fill-opacity="0.75"
          fill-field="ips" classes="5" method="manual" breaks="85,95,105,120"
          selected-palette="divergentAscending"
          tooltip-field="appellation_officielle"
          cluster cluster-radius="60" max-items="20000"
          bbox bbox-debounce="400">
        </dsfr-data-map-layer>
        <dsfr-data-map-legend for="c-ecoles"
          label="Indice de position sociale (2023-2024)"></dsfr-data-map-legend>
        <dsfr-data-map-popup mode="panel-right"
          title-field="appellation_officielle" width="380px">
          <template>
            <p class="fr-badge fr-badge--sm fr-mb-2v">{{secteur|secteur non renseigné}}</p>
            <p class="fr-display--xs fr-mb-1v">{{ips|IPS non renseigné}}</p>
            <p class="fr-text--sm fr-mb-2v">Indice de position sociale, rentrée {{rentree_scolaire}}</p>
            <!-- les trois références que l'original transporte et n'affiche pas -->
            <ul class="fr-text--sm fr-mb-2v">
              <li>Référence départementale : {{ips_departemental|—}}</li>
              <li>Référence académique : {{ips_academique|—}}</li>
              <li>Référence nationale : {{ips_national|—}}</li>
            </ul>
            <p class="fr-text--sm fr-mb-1v"><strong>{{libelle_commune|commune non renseignée}}</strong>
               — {{libelle_departement|}}, académie de {{libelle_academie|}}</p>
            <p class="fr-text--xs fr-mb-0 odv-rubrique" data-intitule="UAI">{{uai}}</p>
          </template>
        </dsfr-data-map-popup>
      </dsfr-data-map>

      <dsfr-data-a11y source="ips-f" for="carte-ips" table download
        filename="ips-ecoles-2023-2024.csv"
        label="Données de la carte"
        label-field="appellation_officielle"
        value-field="ips, ips_departemental, libelle_commune, libelle_departement, secteur">
      </dsfr-data-a11y>
    </div>
  </div>
</div>
```

## Limites et points durs identifiés

1. **Le chargement client complet est impossible par l'adaptateur ODS — et ce n'est
   pas une limite de `dsfr-data`.**
   *Obstacle* : l'API Explore v2.1 refuse `offset + limit > 10 000` (400 vérifié à
   offset 9 901) ; l'adaptateur pagine `/records` par offset et **lève** sur une réponse
   non-200. Un `max-records="35000"` ne charge donc pas 32 625 lignes : il produit une
   erreur après 100 requêtes et ~12,6 s.
   *Voie native essayée* : `server-side page-size="100"` + `bbox` sur la couche —
   une page à la fois (84 ms), rechargée au déplacement de la carte (94 ms par requête
   `in_bbox`, vérifié à l'API). C'est l'architecture retenue dans l'esquisse.
   *Réserve documentée par la référence de `bbox`* : « le tout premier fetch de la source
   reste NON filtré » — d'où le `where` initial sur la source, qui borne ce premier appel.
   *Contournement alternatif* : source générique `url="…/exports/json" params='{"limit":-1}'`
   + `transform` — **1 requête, 2,9 s, 3,5 Mo gz / 29 Mo décompressés** (7,7 Mo avec un
   `select` de six champs). Coût : perte de `server-side`, `server-facets`, `server-search`.
   *À trancher au navigateur* : `bbox` (jamais tout à l'écran, mais toujours rapide)
   contre export complet (tout à l'écran, 7,7 Mo en mémoire). **Non vérifié au navigateur.**

2. **Le plafond de 100 valeurs des facettes serveur est celui de l'API ODS, pas de
   `dsfr-data`, et la cascade ne le contourne pas sur ce jeu.**
   *Obstacle* : `/facets?facet=libelle_commune` renvoie **100 valeurs**, et l'ajout d'un
   `limit=300` ou de la forme `facet(name="…", limit=300)` **est ignoré** : toujours 100
   (vérifié à l'API). Le jeu compte 17 351 communes.
   *Voie native essayée — la cascade* : un `where` sur le département réduit la liste
   côté serveur. Mesuré : `where=… and libelle_departement="Nord"` → **encore 100**
   (566 communes réelles). **79 des 103 départements ont plus de 100 communes.**
   La cascade est donc insuffisante ici — alors qu'elle suffit sur le jeu lycées
   (max 57 communes par département) et qu'elle est inutile sur EREA (77 communes en tout).
   *Voie retenue* : `<dsfr-data-search server-search fields="libelle_commune">`, qui
   envoie un `where` au serveur au lieu d'énumérer des valeurs. `count` affiche
   `meta.total`. **Non vérifié au navigateur** : reste à mesurer la latence de frappe
   sur 32 625 lignes et à vérifier que `server-search` compose bien avec `server-facets`
   en aval.
   *Ce qui n'est pas une limite* : le fait que `libelle_academie` ne soit pas déclarée
   au back-office. `fetchFacets()` passe chaque champ en `facet=`, et l'API répond.
   Le piège « jeu sans facette déclarée » du CLAUDE.md ne s'applique pas ici.

3. **`max-items` (5 000 par défaut) contre 32 321 points localisés.**
   *Obstacle* : le piège PG-013 — au-delà du plafond, bandeau « zoomez » qui ne charge
   rien de plus.
   *Voie native* : la référence de `max-items` dit explicitement qu'« avec `cluster`,
   `max-items="20000"` est sans risque : les marqueurs regroupés ne pèsent pas sur le
   DOM ». 32 321 reste au-dessus de 20 000 — mais en mode `bbox` la couche ne reçoit
   jamais tout le jeu, et la même référence précise qu'« en mode `bbox`, zoomer recharge
   la zone visible ». Les deux attributs se répondent : c'est `bbox` qui rend `max-items`
   non contraignant, pas l'inverse. **Non vérifié au navigateur.**

4. **La choroplèthe de points, à cette densité, n'est pas forcément lisible.**
   *Obstacle* : 32 321 cercles de 4 px colorés par classe, agrégés en clusters —
   or **un cluster n'a pas de couleur de classe** : il porte un compte. La lecture
   « où sont les IPS bas » disparaît dès que le clustering s'active, exactement comme
   dans l'original.
   *Voie native* : la **seconde source d'agrégation** de l'esquisse
   (`group-by="libelle_departement"`, `select="avg(ips)"`, **142 ms, 1 requête, 103
   lignes**) alimente une choroplèthe départementale posée sous la couche de points
   (`no-interactive`, GeoJSON de contours simplifié, cf. AM-016 : DSFR Chart n'a pas de
   contours administratifs, il faut un GeoJSON statique). Le lecteur voit la structure
   au niveau national et les établissements en zoomant.
   *Contrainte connue* : `geoshape` a besoin d'une géométrie, que le jeu ne porte pas
   (`position` seul). Il faut le fichier
   `public/data/geo/regions-simplifiees.geojson` du dépôt, ou son équivalent
   départemental, et un `dsfr-data-join` sur le libellé — donc sur `libelle_departement`,
   avec le risque d'appariement sur les DROM. **Non vérifié.**

5. **Le KPI « IPS moyen » ne peut pas suivre la sélection.**
   *Obstacle* : la grammaire `champ:fn` d'un `dsfr-data-kpi` s'évalue sur **les données
   reçues** ; derrière `server-side page-size="100"`, `ips:avg` moyennerait 100 écoles.
   `meta:total` règle le compte (#659), pas la moyenne.
   *Voie native* : la source d'agrégation dédiée (142 ms) — mais elle n'écoute pas les
   facettes, donc le KPI reste global. C'est le même arbitrage que sur la page collèges
   (§ « Limites » n° 7), avec une différence : ici le chargement client complet, qui
   ferait marcher `ips:avg`, est barré par le plafond d'offset (point 1). **Sur les
   écoles, l'arbitrage n'existe pas : le KPI de moyenne est nécessairement global**,
   ou bien il faut le recalculer par une source d'agrégation re-paramétrée à chaque
   changement de facette (`reloadData`, non exploré ici). **Non vérifié.**

6. **Les 304 lignes orphelines.** `getSkippedCount()` de la couche les compterait, mais
   elles fausseraient `meta:total`. Voie retenue : `where="… and position is not null"`
   sur la source, et **le dire dans la page** (l'esquisse le fait) : 304 écoles exclues
   faute de localisation. Plus honnête que l'original, qui les compte sans le dire.

7. **Ce qui ne se transpose pas, et n'a pas à l'être** — identique à la page collèges
   ([dataviz-ips-colleges.md](dataviz-ips-colleges.md) § « Limites » n° 8) : outils de
   dessin de zone, géocodeur « Trouver un lieu… », grille `col-xs-*`. Écarts assumés,
   pas des manques.

8. **Point dur d'énoncé** : comme ses trois sœurs, la page n'a pas de contenu. Mais ici
   le déficit est plus criant, parce que **le jeu porte de quoi le combler** : neuf
   colonnes de référence permettent d'écrire « cette école est à −8 points de la moyenne
   de son département », ce qu'aucune des quatre pages ne fait et que seule celle-ci
   peut faire. Une transposition qui se contenterait de reproduire la bulle à cinq
   champs jetterait la principale richesse du jeu.

## Données à reproduire fidèlement

- [ ] Jeu `donnees-ips-ecoles`, rentrée **2023-2024** — **32 625** lignes, dont
      **32 321** localisables et **30 065** avec un IPS.
- [ ] IPS min **53,4** / max **160,6** / moyenne **104,47**.
- [ ] Secteur : public **28 076** (IPS moyen 102,69) / privé sous contrat **4 549**
      (115,30).
- [ ] Références du jeu : national **105,5**, national public **102,9**, national privé
      **120,3** ; 28 valeurs académiques, 75 départementales.
- [ ] Facette Académie : **30** valeurs, tri alphabétique, comptes exacts (Nantes 2 193,
      Lille 2 104, Rennes 1 978, Grenoble 1 974 en tête ; Mayotte 121, Guyane 133,
      Martinique 159, Corse 178 en queue). **Somme 32 321**, à afficher à côté du total
      32 625 plutôt que de laisser l'écart invisible.
- [ ] Facette Département : **103** valeurs **avec leur compte** — que l'original omet
      (Nord 1 268, Pas-de-Calais 836, Rhône 718, Bouches-du-Rhône 687 en tête).
- [ ] Accès aux **17 351** communes, et non 100. C'est le test de fidélité de cette page.
- [ ] Infobulle : les 5 champs de l'original **au minimum**, IPS en virgule décimale
      française, **et** la commune en casse normale (`libelle_commune` = « Anzin »),
      pas en capitales.
- [ ] 304 écoles sans position : les exclure explicitement et le dire, pas les compter
      en silence.
- [ ] 2 560 écoles sans IPS : rendre le cas lisible (« IPS non renseigné »), pas une
      ligne absente.
- [ ] Téléchargement CSV de la sélection courante (l'original sert 29 colonnes).
- [ ] Cadrage initial **sur la France**, pas sur la Suisse.
- [ ] Carte non vide au chargement, et **les départements les plus fournis lisibles**
      autrement que par une bulle « 1 268 ».

## Gabarit partagé

Le § « Gabarit partagé » de [dataviz-ips-colleges.md](dataviz-ips-colleges.md) établit
que les quatre pages IPS sont le même fichier à un attribut près, et en dresse la liste
des invariants (bloc CSS aux quatre octets près, contexte `frenipslyceesdataviz`,
`ng-init`, centrage sur la Suisse, `show-if`, trois H3, H4 conditionnel, lien CSV,
grille Bootstrap, H1 au seul mot près). Tout cela est vérifié conforme sur la page écoles.

**Ce que la page écoles ajoute au tableau des différences :**

| | **Écoles** | Collèges | Lycées | EREA |
|---|---|---|---|---|
| `…-sort="-rentree_scolaire"` | **absent** | présent | présent | présent |
| Champs | **29** | 11 | 13 | 24 |
| Lignes 2023-2024 | **32 625** | 6 985 | 3 612 | 78 |
| Colonnes géo | **deux jeux concurrents** (capitales sans nul / accentuées 304 nuls) | un seul | un seul | un seul |
| Références IPS | **9 colonnes** | aucune | aucune | 9 colonnes (3 en `text`) |
| Facettes déclarées au back-office | `academie`, `departement`, `nom_de_la_commune` | `libelle_*` | `libelle_*` | `libelle_*` |
| Communes | **17 351** | 3 791 | 1 392 | 77 |
| Communes du plus gros département | **566** (Nord) | — | 57 (Nord) | 2 (Garches) |
| Test `ng-show` du « > Plus » | **`refine.departement` — seule des quatre, et jamais posé** | `refine.libelle_departement` | `refine.libelle_departement` | `refine.libelle_departement` |
| Rendu de la couche | **épingles ≤ 175, clusters ≥ 344** | épingles (65 sur l'Ain) | épingles (4 sur Agen) | épingles (4 sur les Hauts-de-Seine) |

**Ce que ça change pour la factorisation.** Le gabarit `dsfr-data` unique annoncé par la
fiche collèges tient **pour trois pages sur quatre**. La page écoles en sort par
l'architecture, pas par la maquette :

1. **Le filtre Commune n'est pas le même composant.** Facette serveur pour collèges
   (3 791 communes, cascade efficace), facette serveur pour lycées (1 392 ; max 57 par
   département), facette serveur pour EREA (77, aucune troncature) — mais
   **`dsfr-data-search server-search` pour les écoles**, parce que 79 départements sur
   103 dépassent le plafond de 100 valeurs même après cascade.
2. **Le chargement n'est pas le même.** Client complet possible pour EREA (78 lignes,
   88 ms) et pour lycées (3 612 lignes, 37 allers-retours, 3,4 s) ; `server-side` + `bbox`
   obligatoire pour les écoles, où le plafond `offset ≤ 10 000` de l'API ODS interdit le
   chargement complet par l'adaptateur.
3. **La bulle n'a pas le même contenu.** Un IPS pour collèges, deux voies pour lycées,
   un IPS + trois références pour EREA, un IPS + neuf références pour les écoles.

Autrement dit : **le gabarit se paramètre par (a) le `dataset-id`, (b) les champs d'IPS
et de référence, (c) le libellé du type d'établissement — et (d) l'architecture de
chargement, qui n'est pas un paramètre cosmétique mais un choix dicté par le volume.**
C'est le principal enseignement transverse du lot : *la même page d'origine appelle deux
architectures `dsfr-data` différentes selon le jeu qu'on lui branche*, et invoquer une
limite de performance sur EREA (78 lignes) serait aussi faux qu'ignorer le mur des
10 000 offsets sur les écoles.
