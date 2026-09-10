# Suivi d'impact de l'opération de sensibilisation « Cactus »

- **URL** : https://data.education.gouv.fr/p/suivi-et-impact-de-l-operation-de-sensibilisation-cactus/
- **Id catalogue** : 16 · **Titre au catalogue** : « Suivi d'impact de l'opération de sensibilisation au
  risque de l'hameçonnage "Cactus" ».
- **Nature de la cible** : **page Opendatasoft Studio** (`/p/<slug>/`, `uid: sp_ljwq38`,
  `updated_at` 2026-01-29T23:51:17Z), rendue par le front-office React d'ODS. Pas de `$scope.blocks`.
  Configuration récupérée à `GET /api/portal/v1.0/studio_pages/suivi-et-impact-de-l-operation-de-sensibilisation-cactus`,
  archivée dans `docs/portail-education/_sources/suivi-et-impact-de-l-operation-de-sensibilisation-cactus.studio.json`.
- **Jeu unique** : `recensement-operation-cactus` (`data_provider` `b3f9un82vbg`) — **904 lignes**,
  **24 champs**, `visibility: domain`, features `analyze, timeserie, geo`. Producteur **DGESCO**,
  licence **Licence Ouverte v2.0 (Etalab)**, donnée modifiée le **2026-09-07** (le texte de la page
  annonce une mise à jour quotidienne depuis Grist).
- **Relevé visuel** : 2026-09-10, Chrome (extension `claude-in-chrome`), viewport 1568 × 751 CSS px
  (mise en page large, deux colonnes). Aucun message de console (`read_console_messages` : rien).
- **Périmètre de la fiche** : c'est une page de suivi d'une **campagne de sensibilisation**. On y
  documente des blocs, des agrégats et leur rendu. Aucun contenu de leurre, aucune technique
  d'hameçonnage n'apparaît dans le jeu ni ici.

## Champs du jeu (24) et ce qu'ils portent réellement

| Champ | Type | Occupation relevée à l'API | Utilisé par la page ? |
|---|---|---|---|
| `uai` | text | 904/904 — mais **887 UAI distincts** : 16 UAI reviennent 2 ou 3 fois (33 lignes) | non |
| `uuid` | text | 904/904 | non |
| `horodatage` | date | 901/904 (**3 lignes sans date**), du 14/03/2025 au 17/04/2025, 27 jours distincts | oui (série temporelle) |
| `nom_academie` | text | **904/904, aucun nul**, 30 valeurs | oui (barres) |
| `code_academie` | int | 904/904 | non |
| `code_region` / `libelle_region` | text | **872/904** (32 nuls), 18 valeurs dont `00` « TOM et Collectivités territoriales » | oui (choroplèthe) |
| `code_departement` / `libelle_departement` | text | **872/904**, 68 valeurs dont `2A`, `977`, `988` | oui (choroplèthe) |
| `code_commune` | text | 872/904 | non |
| `position` | geo_point_2d | **872/904** | **non** — aucune carte de points sur la page |
| `denomination_principale` | text | **872/904** (32 nuls), 15 valeurs | oui (2 KPI) |
| `secteur_public_prive_libe` | text | Public 864 · Privé 8 · nul 32 | **non** |
| `nombre_d_eleves` | int | 904/904, somme brute **491 164** | oui (KPI) |
| `sensibilisation_existante` | text | Oui 647 · Non 257 (aucun nul) | oui (anneau) |
| `observations` | text **multivalué (`;`)** | 4 valeurs, 1 329 occurrences pour 904 lignes | oui (barres) |
| `sensibilisation_post_cactus` | text | 39 combinaisons brutes séparées par `;`, 31 nuls | **non** (c'est la colonne source) |
| `sensibilisation_post_cactus_actions` | text **multivalué (`;`)** | 7 valeurs + 31 nuls, 1 088 occurrences | oui (barres horizontales) |
| `suivi_sensi_cyber` | text | **Oui 763 · Non 141** | **non** — pourtant l'indicateur d'impact le plus direct |
| `sensi_pontuel_sur_annee` | int 0/1 | **50/904 renseignés** — 28 à 1, 22 à 0 → 56 % | **non** |
| `sensi_longue_duree_annee` | int 0/1 | 50/904 — 27 à 1 → 54 % | **non** |
| `partage_sur_territoire` | int 0/1 | 50/904 — 12 à 1 → 24 % | **non** |
| `demande_appui` | int 0/1 | 50/904 — 5 à 1 → 10 % | **non** |
| `d4_pix_prec` | text | **0/904 — colonne entièrement vide** | non |

**Facettes déclarées au back-office** (`/facets`, 8) : `observations` (4), `suivi_sensi_cyber` (2),
`sensibilisation_post_cactus_actions` (7, le nul est exclu), `sensibilisation_existante` (2),
`nom_academie` (30), `libelle_departement` (68), `libelle_region` (18), `denomination_principale` (15).
**La page n'expose aucun filtre** : `content.filters.layout` est un tableau vide.

## Objectif de la dataviz et informations véhiculées

- **Question posée** : « Combien d'opérations Cactus ont été menées, où, et qu'ont-elles produit ? »
  C'est la seule dataviz du lot dont le sujet est **l'effet d'une action publique dans le temps**.
- **Message porté**, en trois temps annoncés par trois titres numérotés :
  1. *L'Opération en chiffres* — le volume (904 actions, 610 collèges, 259 lycées, 491 040 élèves) et
     son étalement dans le temps ;
  2. *Impact des opérations de sensibilisation* — ce qui a été observé pendant, et ce qui est prévu après ;
  3. *Répartition géographique* — académie, région, département.
- **Ce que l'utilisateur doit obtenir** : un ordre de grandeur national, la forme du pic déclaratif
  autour du 19-21 mars 2025, et la géographie très inégale de la participation.
- **Ce qui n'est PAS dans l'objet — et c'est le point le plus notable** :
  - **aucun taux, aucun pourcentage, aucune comparaison avant/après.** La page qui s'intitule
    « Suivi d'**impact** » ne publie que des comptages bruts. Les seuls rapports lisibles sont ceux que
    l'œil tire de l'anneau (71,6 % / 28,4 %, non écrits) ;
  - **aucun usage de `suivi_sensi_cyber`** (Oui 763 / Non 141), qui est pourtant la réponse la plus
    proche d'une mesure d'effet présente dans le jeu ;
  - **aucun usage des quatre indicateurs 0/1 de suivi** (`sensi_pontuel_sur_annee`,
    `sensi_longue_duree_annee`, `partage_sur_territoire`, `demande_appui`) — il est vrai qu'ils ne sont
    renseignés que sur 50 lignes ;
  - **aucune carte de points**, alors que `position` est renseignée pour 872 établissements et que le
    jeu déclare la feature `geo` ;
  - **aucun filtre**, alors que huit facettes sont déclarées au back-office ;
  - **aucun croisement** : jamais « observations × secteur », jamais « actions envisagées × académie ».
    Chaque bloc est un `group_by` à une dimension sur la totalité du jeu.
  - aucune mention du **taux de couverture** (904 opérations rapportées sur combien d'établissements
    sollicités ? la donnée n'est pas là).

## Relevé visuel exhaustif, bloc par bloc

Ordre imposé par `content.layouts.default` : 11 sections. Pas de fil d'Ariane, **pas de H1 de portail** :
la page commence directement par le premier bloc de texte (contrairement aux vues
`/explore/assets/<slug>/view/`, qui en ont un).

### 1. Bloc texte de tête (`block_MCKRZDB5DAQ91`, `align: center`)

Titre (H1) : « **Suivi d'impact de l'Opération de Sensibilisation au risque de l'hameçonnage "Cactus"** ».
Puis, en gras et centré, écrit en markdown `###` :

> « Cette datavisualisation recense toutes les opérations de sensibilisation au risque de
> l'hameçonnage "Cactus" effectuées dans les établissements fin mars 2025, présente leur impact et leur
> répartition géographique au sein des Académies et autres référentiels géographiques. Ces données sur
> les opérations de sensibilisation Cactus proviennent de Grist et sont mises à jour quotidiennement sur
> **[data.education.gouv.fr](http://data.education.gouv.fr/)**. »

Le lien de fin pointe vers `http://data.education.gouv.fr/` — **en clair, et vers la racine du portail**,
c'est-à-dire vers la page où l'on se trouve déjà.

### 2. Section deux images (`section_MCKS1PD2SS3F5`)

Deux blocs `media` côte à côte, `alt=""` tous les deux :
`/assets/theme_image/gem0700661-jpg-200128.jpg` (`fit: 16-9`) et
`/assets/theme_image/classes-horaires-am-nag-s-en-math-matiques-et-sciences-chams--227298_0.png`
(`fit: original`). Ce sont deux photos de classe génériques, **sans rapport avec le sujet** (élèves
devant un écran, élèves devant un microscope) ; la seconde est le visuel d'illustration du dispositif
« CHAMS » (classes à horaires aménagés mathématiques et sciences).

### 3. Bloc texte de cadrage (`block_MCKS3CLN5DL2B`, centré)

> « **L'Opération Cactus : Sensibiliser à l'hameçonnage sur les espaces numériques de travail** »
> « L'opération Cactus vise à sensibiliser les élèves aux risques numériques par une action nationale
> d'hameçonnage (phishing) pédagogique. Cette campagne a été mise en place en réponse à une série
> d'attaques malveillantes ayant ciblé les ENT des établissements scolaires qui ont perturbé les
> enseignements. Cette année, elle a eu lieu du 19 au 21 mars 2025. »

### 4. Titre « 1. L'Opération en chiffres » + section de 4 KPI (`section_MCKS5YV2MNWTX`)

Quatre blocs `kpi` `simple`, tous en `layout_context_and_image` (image décorative en haut, **grande
valeur magenta**, libellé gris en dessous), `notation: standard`, `maximumFractionDigits: 2`.
Séparateur de milliers = espace fine (« 491 040 »).

| Bloc | Formule Studio | Requête réellement émise (relevée au réseau) | Écran | API |
|---|---|---|---|---|
| `block_MCKS5YV2CN1XG` | `count` | `/records/?select=count(*) as y&where=` | **904** — « actions de sensibilisation effectuées depuis mars 2025 » | 904 ✔ |
| `block_MCKS5YV22X2K6` | `count`, condition `denomination_principale` **contains** `COLLEGE` | `…&where=(((suggest(\`denomination_principale\`, "COLLEGE"))))` | **610** — « actions effectuées dans les collèges » | 610 ✔ |
| `block_MCKS5YV2J0526` | `count`, contains `LYCEE` | idem avec `"LYCEE"` | **259** — « actions effectuées dans les lycées » | 259 ✔ |
| `block_MCLY7OFY65CRU` | `sum(nombre_d_eleves)`, contains `COLLEGE` **et** `LYCEE` | `select=sum(\`nombre_d_eleves\`) as y&where=(((suggest(…"COLLEGE")) OR (suggest(…"LYCEE"))))` | **491 040** — « élèves sensibilisés » | 491 040 ✔ |

Trois enseignements sur la **grammaire des conditions Studio**, vérifiés à la requête :

1. L'opération `contains` d'ODS Studio n'est **pas** un `LIKE` : elle compile en
   **`suggest(champ, "valeur")`**, la fonction de recherche plein texte d'ODSQL. Sur ce jeu le résultat
   coïncide avec un `like` (610 = 608 `COLLEGE` + 2 `COLLEGE PRIVE` ; 259 = les 11 dénominations
   contenant « LYCEE »), mais ce n'est pas le même opérateur, et `LEGT AGRICOLE` (2) n'est capté par
   aucun des deux.
2. Deux `values` dans **une seule** condition, avec `connector: "and"`, compilent en **`OR`**. Le
   connecteur porte sur la liaison avec la condition *suivante*, pas entre les valeurs.
3. `select=count(*)` sans `group_by` est bien envoyé **sans `limit`** ; ODS renvoie ici une ligne
   d'agrégat unique (le piège « valeur répétée une fois par ligne » du `CLAUDE.md` ne se déclenche pas
   sur `/records`, mais **se déclenche sur `/exports/json`** — voir § Transposition).

**Ce que ces quatre chiffres ne disent pas** :
- 904 = **actions**, pas établissements : 887 UAI distincts, dont 16 déclarent 2 ou 3 fois.
- 610 + 259 = 869 ; les **35 lignes restantes** (32 sans `denomination_principale`, 2 `LEGT AGRICOLE`,
  1 `ETABLISSEMENT EXPERIMENTAL`) ne sont dans aucun des deux KPI et **rien ne le signale**.
- « 491 040 élèves sensibilisés » : c'est la somme des effectifs des établissements collège/lycée,
  donc (a) elle exclut 124 élèves des 35 lignes ci-dessus (total brut 491 164), et (b) elle
  **compte deux ou trois fois** les élèves des 16 UAI en doublon. Dédoublonné par UAI, le total
  tombe à **481 784** — soit **9 380 élèves comptés en trop, 1,9 %**.
- Le libellé « élèves sensibilisés » assimile *effectif de l'établissement* à *élèves touchés*.

### 5. Section « série temporelle + anneau » (`section_MCKSCITQF6EUB`, deux colonnes)

**a) « Evolution des opérations effectuées depuis mars 2025 »** (`block_MCKSCITROXIBF`,
`chartType: timeSeries.lines`, `layout_xy_tt_gr_do`, couleur `@chart[0]` = bleu nuit) :

- Requête : `group_by=date_format(\`horodatage\`, 'YYYY-MM-dd') as x&order_by=x ASC&select=count(*) as
  series_…&where=(\`horodatage\` IS NOT NULL)`. Le `xTimescale: day` de la configuration se traduit donc
  par un `date_format`, **pas** par un axe continu côté serveur : les 3 lignes sans date sont exclues,
  **901 opérations** sont représentées sur **27 points**.
- Rendu : ligne fine bleu nuit à marqueurs circulaires creux. Axe Y « **Nombre de sensibilisations** »,
  graduations 0 → 200 par pas de 20. Axe X « **Date** », étiquettes obliques une sur deux
  (« 14 mars », « 16 mars », … « 17 avr. »).
- L'axe X est une **échelle de temps continue** du 14 mars au 17 avril : les jours sans déclaration
  (6 avril, 12-14 avril, 16 avril…) **coupent la ligne**, si bien que les derniers points (15 avr., 17 avr.)
  sont des **marqueurs isolés sans trait**. C'est correct, mais illisible sans explication.
- Valeurs vérifiées : survol du sommet → infobulle **« 21 mars / ▪ 194 »** ; l'API donne 194 ✔.
  Pics : 20 mars 160, 21 mars 194, 24 mars 125, 27 mars 85, 25 mars 73. Les trois jours de campagne
  (19-21 mars) ne portent que **395 déclarations sur 901, soit 43,8 %** : plus de la moitié des
  remontées sont arrivées *après* l'opération, jusqu'au 17 avril.
- Le titre dit « depuis mars 2025 » mais le premier point est le **14 mars**, cinq jours avant le
  lancement annoncé.

**b) « L'établissement avait-il déjà reçu une 1ère opération de sensibilisation? »**
(`block_MCKSCITRJNLLD`, `chartType: composition.doughnut`, `cutout: small`, `layout_tt_se_na`) :

- Requête : `group_by=\`sensibilisation_existante\` as x&order_by=… DESC&select=count(*)&where=
  (\`sensibilisation_existante\` IS NOT NULL)`.
- Anneau à **deux secteurs**, épais (cutout « small »), sans légende et **sans aucune valeur affichée** :
  seuls les libellés « Oui » (bleu nuit très sombre) et « Non » (indigo) sont posés à l'extérieur.
- Survol → infobulle **« Oui / ▪ Oui: 647 »** (le libellé est répété dans la ligne de valeur, ce que ne
  font pas les graphiques en barres). API : Oui 647 / Non 257 ✔, soit **71,6 % / 28,4 %** — pourcentages
  que la page **n'affiche nulle part**.
- Un point d'interrogation collé au mot précédent dans le titre (« sensibilisation? »).

### 6. Titre « 2. Impact des opérations de sensibilisation » + section deux graphiques

**a) « Observations effectuées pendant l'opération »** (`block_MCKSG3PK9OV74`,
`chartType: comparison.columns`, `limit: 20`, couleur `@chart[2]` = bleu-violet) :

- `group_by=\`observations\` as x&limit=20&order_by=… DESC&where=(\`observations\` IS NOT NULL)`.
- **4 barres verticales**, tri décroissant, axe Y « Nombre » 0 → 700 par 100, axe X « Observation »
  avec étiquettes obliques **complètes** (elles tiennent) :
  **Des signalements de sécurité numérique 618 · Des débats (élèves, adultes) 327 ·
  Pas de changement 250 · Du dérangement 134**. Survol vérifié sur la première : « Des signalements de
  sécurité numérique / ▪ 618 » ✔ API.
- **`observations` est un champ multivalué ODS** (`annotations: {multivalued: ';'}`, renvoyé en tableau
  JSON par l'API). Le `group_by` éclate donc les valeurs : **1 329 occurrences pour 904 lignes**, soit
  1,47 observation par action. **Le total des barres (1 329) dépasse de 47 % le nombre d'opérations, et
  rien sur la page ne l'indique** — un lecteur qui somme les barres croira à 1 329 actions.
- Corollaire non dit : « Pas de changement » (250) coexiste avec une autre observation dans une partie
  des lignes.

**b) « Actions continues envisagées après la sensibilisation »** (`block_MCKSG3PKYCI51`,
`chartType: comparison.bars` = **barres horizontales**, `limit: 10`, même couleur) :

- `group_by=\`sensibilisation_post_cactus_actions\` as x&limit=10&order_by=… DESC&where=(… IS NOT NULL)`.
- **7 barres horizontales**, tri décroissant, axe X « Nombre » 0 → 400 par 100, axe Y « Actions ».
  Les libellés longs sont **tronqués à ~40 caractères avec une ellipse** (« Action avec l'appui des
  forces de l'ordr… », « Action de formation avec l'EAFC pour une… », « Action pédagogique avec la
  ressource Cyb… ») ; l'infobulle, elle, affiche le libellé entier — vérifié :
  « Action avec l'appui des forces de l'ordre ou d'une association / ▪ 91 » ✔ API.
- Valeurs : **Par des enseignants dans leur cours 309 · Par les PP sur l'heure de vie de classe 293 ·
  Aucune action envisagée 265 · Animation par référents numériques 92 · Action avec l'appui des forces
  de l'ordre ou d'une association 91 · Action de formation avec l'EAFC… 23 · Action pédagogique avec la
  ressource Cyberenjeux de l'Anssi 15**. Total **1 088** pour 873 lignes renseignées (champ multivalué,
  même effet que ci-dessus). **31 lignes nulles sont exclues** par le `where` automatique.
- Ce champ est une version nettoyée de `sensibilisation_post_cactus`, qui contient 39 combinaisons
  brutes séparées par `;` et des libellés à rallonge (« …avec le support clé en main proposé par
  l'opération (2 fiches et une présentation à disposition sur l'espace de téléchargement), »).
  Le back-office a bien fait le travail ; la page utilise la bonne colonne.

### 7. Titre « 3. Répartition Géographique… » + « Répartition des opérations par Académie »

`block_MCKSKBGWZ9KFD`, `comparison.columns`, `limit: 40`, couleur `@chart[3]` (bleu-violet clair),
pleine largeur.

- `group_by=\`nom_academie\` as x&limit=40&order_by=… DESC&where=(\`nom_academie\` IS NOT NULL)`.
- **30 barres**, toutes étiquetées (obliques), axe Y « Nombre » 0 → 120 par 20, axe X « Académie ».
  Survol vérifié : « Normandie / ▪ 109 » ✔.
- Classement complet relevé à l'API (somme = 904, **aucune académie nulle**) :
  Normandie 109 · Lille 93 · Nancy-Metz 90 · Reims 89 · Versailles 89 · Amiens 69 · Strasbourg 58 ·
  La Réunion 47 · Orléans-Tours 47 · Dijon 32 · Besançon 31 · Créteil 28 · Paris 26 · Guadeloupe 15 ·
  Martinique 15 · Lyon 11 · Mayotte 11 · Nouvelle Calédonie 9 · Montpellier 5 · Poitiers 5 · Corse 4 ·
  Rennes 4 · Toulouse 4 · Limoges 3 · Nice 3 · Bordeaux 2 · Grenoble 2 · Aix-Marseille 1 ·
  Clermont-Ferrand 1 · Nantes 1.
- La distribution est **extrêmement déséquilibrée** : les 7 premières académies font 597 opérations
  (66 %), les 13 dernières en font 44 (4,9 %). Une académie sur trois n'a pas participé du tout
  (30 valeurs présentes sur ~35 académies). La page ne commente rien.

### 8. Section deux choroplèthes (`section_MCKSM0Q3J6QC5`)

Deux blocs `map` `mapType: choropleth.georef`, `shapeSource.type: georef`, `layer: world_fr`,
`aspectRatio: 16-9`, `layout_tt_ll`, échelle **gradient** sur `@chart[3]` (blanc-lilas → bleu nuit),
`bbox: [-5.4517733, 41.2611155, 9.8282225, 51.3055721]` (**France métropolitaine seule**),
`navigationMaps: ["fr_60_971","fr_60_973","fr_60_974","fr_60_972","fr_60_976"]`.

| Bloc | `breakdown` | `dataKey` | Titre | Légende |
|---|---|---|---|---|
| `block_MCKSM0Q3FG1ME` | `40` (régions) | `code_region` | « Répartition des opérations par région » | « Nombre d'opérations effectuées », **1 → 220** |
| `block_MCKSM0Q32ZOGS` | `60` (départements) | `code_departement` | « Répartition des opérations par département » | « Nombre d'opérations effectuées », **1 → 47** |

- **Requêtes** : `…/exports/json/?group_by=\`code_region\` as x&select=count(*) as y&timezone=Europe/Paris`
  (et idem `code_departement`). C'est l'endpoint **`/exports/json` avec un `group_by`** — pas `/records` :
  pas de pagination, pas de plafond de 1 000, une seule réponse. À retenir pour la transposition.
- **Attribution** : « INSEE IGN NaturalEarth » (régions) et « INSEE IGN NaturalEarth **DGGL** »
  (départements), avec un bouton `ⓘ`. Mention sous chaque carte : « **Utilisez ⌘ + molette pour
  zoomer la carte.** » Contrôles `+` / `−` seulement, **pas de plein écran**.
- **Encarts DROM** : cinq vignettes cliquables sous la carte (Guadeloupe, **Guyane en gris**,
  La Réunion, Martinique, Mayotte). Ce ne sont pas des encarts d'affichage mais des **boutons de
  navigation** : au survol, une infobulle sombre donne seulement le nom (« Guyane ») ; **au clic,
  la carte principale est remplacée par le territoire** et un bouton **←** apparaît pour revenir.
  Vérifié : clic sur l'encart La Réunion (carte départementale) → La Réunion en plein cadre, survol
  → « La Réunion / 46 » ✔.
- **Infobulle de donnée** : carte blanche, nom de la maille en gris puis la valeur en grand.
  Vérifiées : « Grand Est / **223** » ✔ (API 223), « Corse / **4** » ✔, « Pas-de-Calais / **47** » ✔,
  « **Dordogne / 0** » — les mailles grises portent bien la valeur **0**, ce qui est une bonne chose.
- **Écart écran/API n° 1 — la borne haute de la légende est fausse.** La carte régionale affiche
  « 1 → **220** » alors que le maximum réel est **223** (Grand Est), valeur que l'infobulle de la même
  carte affiche correctement. La borne est arrondie à un « joli » nombre **par le bas**, si bien que la
  maille la plus foncée est hors de l'échelle annoncée. Le même effet se reproduit sur la page FEI
  (BELC : légende 290, maximum 294 ; assistants de langue française : 450 / 451).
- **Ce qui n'est nulle part sur ces cartes** : les **32 lignes sans code géographique**, les **10 lignes
  de `code_region` = `00`** (« TOM et Collectivités territoriales », dont la Nouvelle-Calédonie), et,
  côté départements, `977` Saint-Barthélemy (1) et `988` Nouvelle-Calédonie (9), qui ne figurent ni
  dans le cadrage métropolitain ni parmi les cinq encarts. **Au mieux 862 opérations sur 904 sont
  représentées, soit 95,4 %, sans le moindre avertissement** — alors que le graphique en barres juste
  au-dessus, lui, montre bien « Nouvelle Calédonie 9 ».
- Répartition régionale complète (API) : Grand Est 223 · Hauts-de-France 158 · Île-de-France 139 ·
  Normandie 107 · Bourgogne-Franche-Comté 62 · La Réunion 46 · Centre-Val de Loire 46 · *(nul 32)* ·
  Martinique 15 · Auvergne-Rhône-Alpes 14 · Guadeloupe 11 · *TOM 10* · Mayotte 10 ·
  Nouvelle-Aquitaine 10 · Occitanie 8 · Bretagne 4 · PACA 4 · Corse 4 · Pays de la Loire 1.
  Top départements : Pas-de-Calais 47 · La Réunion 46 · Yvelines 44 · Nord 43 · Marne 40 · Moselle 36 ·
  Essonne 35 · Bas-Rhin 34 · Calvados 27.

### 9. Kebab « ⋮ » (identique sur chaque bloc de donnée)

`View dataset source` (**en anglais**, ouvre la page d'actif du jeu), `Exporter au format PNG`,
`Exporter au format CSV`, `Exporter au format JSON`, `Exporter au format Excel`.

### 10. Pied de page et chrome

Pied DSFR standard (GOUVERNEMENT, info.gouv.fr / service-public.gouv.fr / legifrance.gouv.fr /
data.gouv.fr, « Plan du site | Accessibilité | Mentions légales | Données personnelles | Gestion des
cookies », « licence etalab-2.0 »). En-tête portail avec **Connexion / Inscription** et le menu
« Données · Data-visualisations · Démarche · Créer une carte · Créer un graphique · Nous contacter ».
Une **bulle de chat magenta** flotte en bas à droite en permanence.

## Défauts et bizarreries de l'original

1. **Une page « Suivi d'impact » sans un seul taux.** Le mot « impact » est dans le titre, dans le titre
   de la section 2 et dans la description de l'actif ; la page ne publie que des comptages. Ni « 72 %
   des établissements avaient déjà été sensibilisés », ni « 30 % n'envisagent aucune suite », ni aucune
   comparaison avant/après. C'est le défaut principal.
2. **La somme des barres ne fait pas le total, sur deux graphiques.** `observations` (1 329) et
   `sensibilisation_post_cactus_actions` (1 088) sont multivalués ; rien à l'écran ne le dit.
3. **Le KPI « 491 040 élèves sensibilisés » surcompte de 9 380** (16 UAI déclarés 2 ou 3 fois), et
   assimile l'effectif de l'établissement au nombre d'élèves réellement touchés.
4. **35 lignes tombent entre les deux KPI collège/lycée** (610 + 259 = 869 ≠ 904) sans mention.
5. **42 opérations invisibles sur les deux cartes** (32 sans code, 10 en TOM/`00`), sans mention.
6. **La borne haute des légendes de carte est arrondie sous le maximum réel** : « 1 → 220 » pour un
   maximum de 223.
7. **La série temporelle a des trous non expliqués** : les jours sans déclaration cassent la ligne et
   laissent des points orphelins en fin d'axe.
8. **Titre trompeur sur la série** : « depuis mars 2025 » pour une série qui commence le 14 mars et
   s'arrête le 17 avril — la donnée est figée, pas « quotidienne » comme le dit l'intro.
9. **Aucun filtre**, alors que le jeu déclare 8 facettes (académie, département, région, dénomination,
   secteur, observations, actions, suivi). Impossible de regarder une académie en particulier.
10. **Aucune carte de points**, alors que 872 lignes sont géolocalisées.
11. **Trois indicateurs pertinents laissés de côté** : `suivi_sensi_cyber` (763/141), le secteur
    public/privé (864/8) et les quatre 0/1 de suivi.
12. **Une colonne entièrement vide dans le jeu publié** : `d4_pix_prec`, 904 nuls sur 904.
13. **Libellés d'axe tronqués sans autre recours que le survol** sur le graphique des actions envisagées
    (l'information n'est donc pas accessible au clavier ni au lecteur d'écran).
14. **Deux photos décoratives hors sujet**, `alt=""`, dont l'une est le visuel du dispositif CHAMS.
15. **Structure de titres cassée.** Le rendu ne produit **qu'un seul `h1`** (le titre de la page) et met
    **tout le reste en `h2`** — y compris les **deux paragraphes de prose** écrits en `###` par l'auteur,
    qui deviennent des titres de 300 caractères (`ref_36`, `ref_39` au relevé de l'arbre
    d'accessibilité). Les titres de blocs (« Répartition des opérations par région ») sont au même
    niveau `h2` que les titres de section (« 3. Répartition Géographique… ») : la hiérarchie à trois
    niveaux voulue par l'auteur est perdue.
16. **« View dataset source » en anglais** dans un kebab par ailleurs francophone.
17. **Le lien de l'intro pointe vers la racine du portail en `http://`**, c'est-à-dire vers la page
    courante.
18. **Un espace manquant avant le point d'interrogation** du titre de l'anneau.
19. **L'anneau n'affiche aucune valeur ni pourcentage** ; il faut survoler pour lire 647.
20. **Aucune synchronisation d'URL** (il n'y a rien à synchroniser : pas de filtre) et **aucun
    export global** ; l'export est par bloc.

## Transposition vers `dsfr-data`

### Architecture retenue et pourquoi

904 lignes, 24 champs. Mesuré en ligne de commande : `/exports/json?limit=-1` complet =
**113 Ko gzip en 0,16 s**. Un seul aller-retour, tout tient en mémoire.
**Donc : une source unique en mode adaptateur OpenDataSoft, tout agrégé côté client.** Ce choix rend
gratuits les huit filtres à facettes que l'original n'a pas, les taux qu'il ne calcule pas, et le
recalcul instantané de tous les blocs sur une sélection.

Le mode « une requête agrégée par bloc » de l'original (11 requêtes) n'a aucun intérêt ici ; il n'en
aurait que si le jeu grossissait d'un ordre de grandeur.

Deux points de vigilance mesurés :
- `max-records` par défaut de l'adaptateur ODS = 1 000 (`CLAUDE.md`). 904 passe, **mais de justesse** :
  le jeu est mis à jour et le franchira. **Poser `max-records="20000"` explicitement.**
- `/exports/json?select=count(*) as n` **sans** `group_by` renvoie la valeur **904 fois** (vérifié).
  Sur `/records`, `limit=1` suffit. Le piège du `CLAUDE.md` vaut donc surtout pour l'endpoint d'export.

### Le point réutilisable : comment calculer un taux avec `dsfr-data`

C'est la question de fond posée par cette page. Quatre voies, testées :

1. **Agrégat conditionnel côté ODS : impossible.** `select=sum(case when champ="Oui" then 1 else 0 end)`
   → **HTTP 400 `ODSQLSyntaxError: unexpected when`** (vérifié aujourd'hui, troisième occurrence du
   même refus dans le dépôt). ODSQL n'a ni `case`, ni `if`, ni agrégat filtré.
2. **En revanche, ODSQL accepte l'arithmétique *entre* agrégats** dans un `select` (vérifié :
   `select=sum(nombre_d_eleves)/count(*) as moy&limit=1` → `543.32` ; `count(*)*100` → `90400`).
   Donc si le numérateur est déjà une colonne numérique, le taux se calcule **serveur, en une ligne** :
   `select=avg(sensi_pontuel_sur_annee)*100 as taux&limit=1` → **56,0** (vérifié). C'est la voie la plus
   courte quand la donnée est en 0/1.
3. **`dsfr-data-normalize compute` ne sait pas agréger** — c'est écrit dans son JSDoc (« Hors périmètre :
   conditions, fonctions, calculs sur valeurs agrégées ») et c'est ligne à ligne. Il **ne peut donc pas**
   diviser un compte par un total. Ne pas essayer.
4. **La voie native pour un « % de X parmi Y » sur un champ texte** — et c'est la recette à retenir —
   consiste à **rendre le critère numérique ligne à ligne, puis à en prendre la moyenne** :

   ```html
   <dsfr-data-normalize id="cactus-n" source="cactus"
     replace-fields="sensibilisation_existante:Oui:1 | sensibilisation_existante:Non:0"
     numeric="sensibilisation_existante"
     compute="pct_deja_sensibilise = sensibilisation_existante * 100"></dsfr-data-normalize>

   <dsfr-data-kpi source="cactus-n" value="pct_deja_sensibilise:avg"
     format="pourcentage" decimals="1"
     label="des établissements avaient déjà été sensibilisés"></dsfr-data-kpi>
   ```

   → « **71,6 %** ». Vérifications de grammaire faites dans le code source :
   `replace-fields` sépare ses entrées par **`|`**, sa forme est `CHAMP:motif:remplacement`, et la
   comparaison est **stricte** (`normalizedValue === pattern`, `dsfr-data-normalize.ts` l. 297) — donc
   pas de regex, ce qui convient à un « Oui »/« Non » exact ; l'ordre interne des transformations est
   `replace-fields` (3a) → `split` (3c) → `numeric` (4) → `round` (5), `compute` après ; et
   `format="pourcentage"` **ne multiplie pas par 100** (« la valeur EST le pourcentage »,
   `packages/shared/src/utils/formatters.ts` l. 152) — d'où le `* 100` dans le `compute`.

   La variante « pourcentage d'une catégorie parmi N » se traite de la même façon avec un
   `replace-fields` qui met 1 sur la catégorie visée et 0 partout ailleurs — au prix d'une entrée par
   valeur, ce qui reste raisonnable en dessous d'une dizaine de modalités. Au-delà, **le donut d'un
   `group-by` reste la bonne réponse** : c'est ce que fait l'original, et c'est ce qu'il faut garder.

### Le second point réutilisable : les champs multivalués

`observations` et `sensibilisation_post_cactus_actions` sont annotés `multivalued: ';'` au schéma ODS
et **arrivent déjà en tableaux JSON** dans `/records` comme dans `/exports/json` (vérifié). Deux
conséquences :

- côté **facettes**, rien à faire : `dsfr-data-facets` traite un tableau comme un champ multi-valeurs
  (une entrée par élément) — documenté dans la fiche `attributeGrammars` ;
- si la source livrait la chaîne brute (`sensibilisation_post_cactus`, séparée par `;`),
  `dsfr-data-normalize split="sensibilisation_post_cactus:;"` la découperait — grammaire vérifiée :
  entrées séparées par **virgule**, et dans chaque entrée le **premier `:`** sépare le champ du
  séparateur, qui peut donc être `;`.
- côté **`dsfr-data-query group-by`**, en revanche, je n'ai **pas vérifié** que le regroupement éclate
  les tableaux. Voie sûre et mesurée : garder l'agrégation serveur pour ces deux blocs, en source
  générique sur l'endpoint d'export, exactement comme l'original :
  `/exports/json?group_by=observations as x&select=x, count(*) as n&where=observations is not null`
  → 4 lignes, éclatement correct (618/327/250/134), **vérifié**. Attention : ajouter un `order_by`
  agrégé sur cet endpoint renvoie **HTTP 400** (« aggregation function in order by is not supported
  with a limit > 50000 ») — trier avec `dsfr-data-query order-by` côté client.

### Correspondance bloc à bloc

| Bloc / directive ODS Studio | Composant + attributs `dsfr-data` |
|---|---|
| `data_provider` `recensement-operation-cactus` | `<dsfr-data-source id="cactus" api-type="opendatasoft" base-url="https://data.education.gouv.fr" dataset-id="recensement-operation-cactus" max-records="20000">` — API ouverte, pas de clé nécessaire |
| bloc `text` markdown centré | HTML DSFR : `<h1>` + `<p class="fr-text--lead">`. La prose ne redevient **pas** un titre (défaut 15) |
| deux blocs `media` `alt=""` | `<img class="fr-responsive-img" alt="">` — ou, mieux, on les retire : hors sujet |
| KPI `count`, `layout_context_and_image` | `<dsfr-data-kpi source="cactus-f" value="count" format="nombre" label="actions de sensibilisation">` ; l'image décorative n'a pas d'équivalent, `icon="ri-shield-check-line"` en tient lieu |
| condition `contains COLLEGE` (→ `suggest()`) | `<dsfr-data-query id="q-col" source="cactus-f" where="denomination_principale:contains:COLLEGE">` puis un KPI `value="count"` dessus. **Pas de `limit` sur cette query** : un KPI `count` compte la limite (PG-017) |
| condition à deux valeurs (`OR` implicite) | `where="denomination_principale:contains:COLLEGE\|LYCEE"` — multi-valeurs séparées par **`\|`** dans la syntaxe colon de `dsfr-data-query` |
| `sum(nombre_d_eleves)` | `value="nombre_d_eleves:sum"` sur la même query |
| **manque** : le périmètre des KPI | un `<p class="fr-hint-text">` sous le groupe : « 869 des 904 actions portent une dénomination collège ou lycée ; 887 UAI distincts » |
| les 4 KPI en ligne | `<dsfr-data-kpi-group>` + `col="3"` sur chacun. **Ne jamais poser `display:block` dessus** : son `:host` est `grid` (PG-011) |
| `timeSeries.lines` + `date_format(horodatage,'YYYY-MM-dd')` | `<dsfr-data-query id="q-jour" source="cactus-f" group-by="horodatage" aggregate="uai:count:n" order-by="horodatage:asc" where="horodatage:isnotnull">` + `<dsfr-data-chart type="line" label-field="horodatage" value-field="n" name="Sensibilisations">`. `horodatage` est déjà une date-jour : pas de fonction ODSQL nécessaire, donc pas de PG-014 |
| `where (horodatage IS NOT NULL)` implicite | `where="horodatage:isnotnull"` **sur la query déjà présente**, pas un attribut de plus (PG-015) |
| `composition.doughnut`, `cutout: small` | `<dsfr-data-chart type="pie" label-field="sensibilisation_existante" value-field="n" name="Établissements">` — **sans `fill`** : le défaut de `dsfr-data-chart` est l'anneau, `fill` donne le camembert plein |
| l'anneau n'affiche pas ses valeurs | rien à faire : DSFR Chart les met en légende. On **ajoute** en plus le KPI de taux (§ ci-dessus), que l'original n'a pas |
| `comparison.columns` sur `observations` (multivalué) | source générique dédiée : `<dsfr-data-source id="obs" url="…/exports/json" params='{"group_by":"observations as x","select":"x, count(*) as n","where":"observations is not null"}'>` + `<dsfr-data-query id="q-obs" source="obs" order-by="n:desc">` + `<dsfr-data-chart type="bar" label-field="x" value-field="n">` |
| `comparison.bars` (horizontales) sur les actions | même montage, + `horizontal` sur le `dsfr-data-chart` |
| libellés d'axe tronqués | ne pas reproduire : `horizontal` laisse la place, et `<dsfr-data-a11y table>` donne le libellé complet en texte |
| `comparison.columns` sur `nom_academie`, `limit 40` | `<dsfr-data-query id="q-aca" source="cactus-f" group-by="nom_academie" aggregate="uai:count:n" order-by="n:desc">` + `type="bar" horizontal` (30 barres verticales imposent des étiquettes obliques) |
| `choropleth.georef` `world_fr` breakdown **40** (régions) | `<dsfr-data-chart type="map-reg" code-field="code_region_iso" value-field="n">` — **voir § Limites, point 1 : le code INSEE ne marche pas** |
| `choropleth.georef` breakdown **60** (départements) | `<dsfr-data-chart type="map" code-field="code_departement" value-field="n" selected-palette="sequentialAscending">` — `code_departement` est du code INSEE, accepté tel quel (01-95, 2A, 2B, 971-976) |
| `navigationMaps` (5 encarts cliquables) | **pas d'équivalent** dans DSFR Chart : la carte départementale place les DROM en encarts fixes, sans navigation. Voir § Limites |
| `bbox` métropolitain | implicite : le fond DSFR Chart est un SVG France, pas une carte glissante |
| légende « Nombre d'opérations effectuées », bornes 1→220 | DSFR Chart rend sa propre échelle ; on **ne reproduit pas** l'arrondi fautif |
| infobulle « maille / valeur » | native (DSFR Chart) |
| kebab PNG/CSV/JSON/Excel par bloc | `databox databox-download databox-screenshot databox-source="DGESCO — recensement-operation-cactus"` sur chaque `dsfr-data-chart` |
| « View dataset source » | `databox-actions='["Voir le jeu de données"]'`, en français |
| **manque** : les 8 facettes déclarées | `<dsfr-data-facets id="cactus-f" source="cactus" fields="nom_academie, libelle_region, libelle_departement, denomination_principale, secteur_public_prive_libe, sensibilisation_existante, observations, sensibilisation_post_cactus_actions" labels="nom_academie:Académie \| …" display="sensibilisation_existante:select" searchable="libelle_departement" url-sync>` — séparateur **`\|`** pour `labels`/`display`, **`,`** pour `fields`/`searchable` (PG-022) |
| **manque** : tableau accessible | `<dsfr-data-a11y for="…" source="…" table download>` sous chaque graphique |
| **manque** : la carte de points (872 positions) | `<dsfr-data-map>` + `<dsfr-data-map-layer type="circle" geo-field="position" cluster>` — ajout assumé |

### Esquisse de code

```html
<!-- ============ Source unique : 904 lignes, 113 Ko gzip, 0,16 s mesuré ============ -->
<dsfr-data-source id="cactus" api-type="opendatasoft"
  base-url="https://data.education.gouv.fr"
  dataset-id="recensement-operation-cactus"
  max-records="20000"></dsfr-data-source>

<!-- Taux : critère texte -> 0/1 -> moyenne. compute est ligne a ligne, pas agrege. -->
<dsfr-data-normalize id="cactus-n" source="cactus"
  replace-fields="sensibilisation_existante:Oui:1 | sensibilisation_existante:Non:0"
  numeric="sensibilisation_existante"
  compute="pct_deja = sensibilisation_existante * 100"></dsfr-data-normalize>

<!-- Codes region : INSEE -> ISO 3166-2, exige par DSFR Chart map-reg (voir Limites 1). -->
<dsfr-data-normalize id="cactus-reg" source="cactus-n"
  replace-fields="code_region:11:IDF | code_region:24:CVL | code_region:27:BFC | code_region:28:NOR | code_region:32:HDF | code_region:44:GES | code_region:52:PDL | code_region:53:BRE | code_region:75:NAQ | code_region:76:OCC | code_region:84:ARA | code_region:93:PAC | code_region:94:20R"></dsfr-data-normalize>

<dsfr-data-facets id="cactus-f" source="cactus-reg"
  fields="nom_academie, libelle_region, libelle_departement, denomination_principale, secteur_public_prive_libe, sensibilisation_existante, suivi_sensi_cyber"
  labels="nom_academie:Académie | libelle_region:Région | libelle_departement:Département | denomination_principale:Type d'établissement | secteur_public_prive_libe:Secteur | sensibilisation_existante:Déjà sensibilisé | suivi_sensi_cyber:Suivi prévu"
  display="sensibilisation_existante:select | suivi_sensi_cyber:select"
  searchable="libelle_departement" max-values="8" url-sync url-params></dsfr-data-facets>

<!-- ============ 1. L'opération en chiffres ============ -->
<dsfr-data-query id="q-college" source="cactus-f"
  where="denomination_principale:contains:COLLEGE"></dsfr-data-query>
<dsfr-data-query id="q-lycee" source="cactus-f"
  where="denomination_principale:contains:LYCEE"></dsfr-data-query>
<dsfr-data-query id="q-scolaire" source="cactus-f"
  where="denomination_principale:contains:COLLEGE|LYCEE"></dsfr-data-query>

<dsfr-data-kpi-group>
  <dsfr-data-kpi col="3" source="cactus-f" value="count" format="nombre"
    label="actions de sensibilisation déclarées" icon="ri-shield-check-line"></dsfr-data-kpi>
  <dsfr-data-kpi col="3" source="q-college" value="count" format="nombre"
    label="dans un collège"></dsfr-data-kpi>
  <dsfr-data-kpi col="3" source="q-lycee" value="count" format="nombre"
    label="dans un lycée"></dsfr-data-kpi>
  <dsfr-data-kpi col="3" source="q-scolaire" value="nombre_d_eleves:sum" format="nombre"
    heading="Effectif des établissements concernés"
    label="élèves dans le périmètre"></dsfr-data-kpi>
</dsfr-data-kpi-group>
<p class="fr-hint-text">
  904 déclarations pour 887 établissements distincts : 16 UAI ont déclaré deux ou trois fois.
  L'effectif cumulé les compte autant de fois (491 164 bruts, 481 784 dédoublonnés).
  35 déclarations ne portent ni « collège » ni « lycée » dans leur dénomination.
</p>

<!-- Le taux que l'original ne calcule pas -->
<dsfr-data-kpi source="cactus-f" value="pct_deja:avg" format="pourcentage" decimals="1"
  label="des établissements avaient déjà reçu une sensibilisation"></dsfr-data-kpi>

<!-- ============ Série temporelle ============ -->
<dsfr-data-query id="q-jour" source="cactus-f" group-by="horodatage"
  aggregate="uai:count:n" order-by="horodatage:asc"
  where="horodatage:isnotnull"></dsfr-data-query>
<dsfr-data-chart id="g-jour" source="q-jour" type="line"
  label-field="horodatage" value-field="n" name="Sensibilisations"
  reference-lines='[{"axis":"x","value":"2025-03-19","label":"Opération 19-21 mars","dash":true}]'
  databox databox-title="Déclarations jour par jour"
  databox-source="DGESCO — recensement-operation-cactus" databox-download></dsfr-data-chart>
<dsfr-data-a11y for="g-jour" source="q-jour" table download></dsfr-data-a11y>

<!-- ============ Anneau ============ -->
<dsfr-data-query id="q-deja" source="cactus-f" group-by="sensibilisation_existante"
  aggregate="uai:count:n" order-by="n:desc"
  where="sensibilisation_existante:isnotnull"></dsfr-data-query>
<dsfr-data-chart id="g-deja" source="q-deja" type="pie"
  label-field="sensibilisation_existante" value-field="n"
  name="Établissements" databox databox-download></dsfr-data-chart>

<!-- ============ Champs multivalués : agrégation serveur (éclatement natif ODS) ============ -->
<dsfr-data-source id="obs"
  url="https://data.education.gouv.fr/api/explore/v2.1/catalog/datasets/recensement-operation-cactus/exports/json"
  params='{"group_by":"observations as x","select":"x, count(*) as n","where":"observations is not null"}'>
</dsfr-data-source>
<dsfr-data-query id="q-obs" source="obs" order-by="n:desc"></dsfr-data-query>
<dsfr-data-chart id="g-obs" source="q-obs" type="bar" horizontal
  label-field="x" value-field="n" name="Déclarations"
  databox databox-title="Observations pendant l'opération" databox-download></dsfr-data-chart>
<p class="fr-hint-text">Question à choix multiples : 1 329 observations pour 904 déclarations.</p>

<dsfr-data-source id="actions"
  url="https://data.education.gouv.fr/api/explore/v2.1/catalog/datasets/recensement-operation-cactus/exports/json"
  params='{"group_by":"sensibilisation_post_cactus_actions as x","select":"x, count(*) as n","where":"sensibilisation_post_cactus_actions is not null"}'>
</dsfr-data-source>
<dsfr-data-query id="q-act" source="actions" order-by="n:desc"></dsfr-data-query>
<dsfr-data-chart id="g-act" source="q-act" type="bar" horizontal
  label-field="x" value-field="n" name="Établissements" databox databox-download></dsfr-data-chart>

<!-- ============ Géographie ============ -->
<dsfr-data-query id="q-aca" source="cactus-f" group-by="nom_academie"
  aggregate="uai:count:n" order-by="n:desc" where="nom_academie:isnotnull"></dsfr-data-query>
<dsfr-data-chart id="g-aca" source="q-aca" type="bar" horizontal
  label-field="nom_academie" value-field="n" name="Opérations"
  databox databox-download></dsfr-data-chart>

<dsfr-data-query id="q-reg" source="cactus-f" group-by="code_region"
  aggregate="uai:count:n" where="code_region:isnotnull"></dsfr-data-query>
<dsfr-data-chart id="g-reg" source="q-reg" type="map-reg"
  code-field="code_region" value-field="n" selected-palette="sequentialAscending"
  name="Opérations" databox databox-title="Opérations par région"></dsfr-data-chart>

<dsfr-data-query id="q-dep" source="cactus-f" group-by="code_departement"
  aggregate="uai:count:n" where="code_departement:isnotnull"></dsfr-data-query>
<dsfr-data-chart id="g-dep" source="q-dep" type="map"
  code-field="code_departement" value-field="n" selected-palette="sequentialAscending"
  name="Opérations" databox databox-title="Opérations par département"></dsfr-data-chart>
<p class="fr-hint-text">
  Saint-Barthélemy (1) et la Nouvelle-Calédonie (9) n'ont pas de tracé dans la carte
  départementale du DSFR ; avec les 32 déclarations sans code, 42 des 904 n'y figurent pas.
</p>
```

## Limites et points durs identifiés

1. **`type="map-reg"` n'accepte pas les codes INSEE de région. C'est un piège silencieux, à consigner.**
   *Obstacle* : `code_region` vaut `11`, `44`, `84`… (INSEE). Les clés attendues par DSFR Chart sont des
   codes **ISO 3166-2** : `IDF, CVL, BFC, NOR, HDF, GES, PDL, BRE, NAQ, OCC, ARA, PAC, 20R` pour la
   métropole, `971, 972, 973, 974, 976` pour les DROM (relevé dans
   `node_modules/@gouvfr/dsfr-chart/dist/MapChartReg/MapChartReg.js`, champ `region_value`).
   *Ce qui rend le piège méchant* : `dsfr-data-chart._processMapData()` ne valide que le vide pour
   `map-reg` (`code === ''`, `dsfr-data-chart.ts` l. 625) ; un `11` non vide est donc accepté comme clé,
   ne correspond à aucun tracé, et la carte **se rend entièrement grise sans erreur ni avertissement**,
   `getSkippedCount()` renvoyant **0**. Seul `type="map"` (départements) valide vraiment ses codes
   (`isValidDeptCode`, `packages/shared/src/utils/dept-codes.ts`).
   *Voie native* : `dsfr-data-normalize replace-fields="code_region:11:IDF | …"` — 13 entrées pour la
   métropole, les DROM étant déjà numériques et concordants. Grammaire vérifiée, comparaison stricte.
   *À remonter* : soit une conversion INSEE → ISO intégrée à `map-reg` (les deux référentiels sont
   fermés et connus), soit au minimum le comptage de ces codes dans `getSkippedCount()`.
   **Non vérifié au navigateur** (constat établi par lecture du code de `dsfr-data` et du bundle
   DSFR Chart, pas par un rendu) — à confirmer avant publication d'un constat au registre.
2. **`type="map-aca"` : les noms d'académie doivent être *sans accent*.**
   *Obstacle* : le composant met le code en majuscules tout seul (`code.toUpperCase()`, l. 617), mais les
   30 clés du fond sont **désaccentuées** : `ORLEANS-TOURS`, `BESANCON`, `CRETEIL`, `REUNION`. Or le jeu
   dit « Orléans-Tours », « Besançon », « Créteil », « **La** Réunion ». Quatre académies (**153
   opérations, 17 %**) seraient donc muettes, et là encore `getSkippedCount()` ne les compterait pas.
   *En outre* : le fond n'a **que 30 académies** (métropole + 5 DROM) — pas de Nouvelle-Calédonie (9
   opérations ici), pas de Polynésie, pas de Wallis, pas de Saint-Pierre.
   *Voie native* : `replace-fields="nom_academie:Orléans-Tours:Orleans-Tours | nom_academie:Besançon:Besancon | nom_academie:Créteil:Creteil | nom_academie:La Réunion:Reunion"`.
   *Verdict* : la voie native existe et tient en une balise ; mais **une normalisation d'accents intégrée
   à `map-aca` serait la bonne place**, puisque le composant fait déjà la mise en majuscules.
   **Non vérifié au navigateur.**
3. **Encarts DROM cliquables (`navigationMaps`).**
   *Obstacle* : chez ODS, les cinq vignettes sont des **boutons de navigation** qui remplacent la carte
   par le territoire, avec retour. DSFR Chart affiche les DROM en encarts fixes, non cliquables.
   *Voie native* : aucune sur `dsfr-data-chart type="map"`. Sur `dsfr-data-map` (Leaflet), les `insets`
   sont eux aussi des vues fixes.
   *Verdict* : **différence d'ergonomie, pas de capacité perdue** — l'encart DSFR montre la valeur, ce
   que la vignette ODS ne fait pas (elle n'affiche que le nom au survol). Ne pas remonter.
4. **`group-by` sur un champ multivalué côté client : non vérifié.**
   *Obstacle* : `observations` arrive en tableau JS. Que fait `dsfr-data-query group-by="observations"` —
   une clé par tableau (mauvais) ou une clé par élément (bon) ? **Je ne l'ai pas testé.**
   *Voie sûre et mesurée* : l'agrégation serveur sur `/exports/json` (4 lignes, 0,1 s), qui éclate
   correctement. C'est ce que fait l'original.
   *À faire* : le tester avant d'écrire quoi que ce soit au registre. Si le client n'éclate pas, c'est
   une vraie demande d'amélioration — et la solution existe déjà en interne, puisque
   `dsfr-data-facets` sait le faire.
5. **`limit` du bloc Studio vs `limit` de `dsfr-data-query`.**
   *Obstacle* : l'original met `limit: 20` / `10` / `40` sur ses `group_by` (nombre de **groupes**).
   `dsfr-data-query limit` limite aussi les lignes de sortie, donc les groupes : équivalence directe.
   *Piège adjacent* : un `dsfr-data-kpi value="count"` posé sur une query **limitée** compte la limite
   (PG-017). Les trois KPI de comptage doivent donc être posés sur des queries **sans `limit`**.
   *Verdict* : pas une limite, un rappel.
6. **Ce que la transposition gagne**, à dire honnêtement : huit filtres à facettes avec compteurs, une
   URL partageable, les taux que l'original ne calcule pas (71,6 % déjà sensibilisés, 30,4 %
   n'envisageant aucune suite), un tableau accessible sous chaque graphique, les libellés d'axe entiers,
   une carte de points sur les 872 positions inexploitées, le comptage explicite des lignes non
   cartographiables (`getSkippedCount()` : 42 sur la carte départementale), et une hiérarchie de titres
   correcte. Douze des vingt défauts relevés tombent d'eux-mêmes.
7. **Ce que la transposition ne gagne pas** : la mise à jour quotidienne annoncée par l'intro n'est pas
   vraie à la source (donnée modifiée le 07/09/2026, série arrêtée au 17/04/2025) ; aucun outil ne
   corrige cela.

## Données à reproduire fidèlement

- [ ] **904** actions, **887** UAI distincts, **491 164** élèves bruts / **491 040** dans le périmètre
      collège-lycée / **481 784** dédoublonnés — et la mention de périmètre avec le chiffre.
- [ ] **610** collèges · **259** lycées · **35** hors des deux catégories (le signaler).
- [ ] **Série** : 27 jours du 14/03 au 17/04/2025, 901 points (3 sans date), pic 21 mars **194**,
      20 mars 160, 24 mars 125 ; 395 déclarations (43,8 %) pendant les trois jours de campagne.
- [ ] **Déjà sensibilisé** : Oui **647** / Non **257** — et le taux **71,6 %**, que l'original omet.
- [ ] **Observations** (multivalué, 1 329 occurrences) : signalements de sécurité numérique **618** ·
      débats **327** · pas de changement **250** · dérangement **134**.
- [ ] **Actions envisagées** (multivalué, 1 088 occurrences, 31 nuls exclus) : enseignants **309** ·
      PP heure de vie de classe **293** · aucune action **265** · référents numériques **92** ·
      forces de l'ordre/association **91** · EAFC **23** · Cyberenjeux Anssi **15**.
- [ ] **Académies** : 30 barres, tri décroissant, de Normandie **109** à Aix-Marseille / Clermont-Ferrand
      / Nantes **1**. Nouvelle-Calédonie **9** doit rester visible quelque part.
- [ ] **Régions** : 18 valeurs, Grand Est **223** en tête, Pays de la Loire **1** en queue ;
      **32 sans code** et **10 en TOM (`00`)** hors carte — le dire.
- [ ] **Départements** : 68 valeurs, Pas-de-Calais **47**, La Réunion **46**, Yvelines **44** ;
      `977` (1) et `988` (9) sans tracé DSFR.
- [ ] Titres exacts des blocs : « Evolution des opérations effectuées depuis mars 2025 »,
      « L'établissement avait-il déjà reçu une 1ère opération de sensibilisation ? »,
      « Observations effectuées pendant l'opération »,
      « Actions continues envisagées après la sensibilisation »,
      « Répartition des opérations par Académie / par région / par département ».
- [ ] Légendes de carte : « Nombre d'opérations effectuées ». **Ne pas** reproduire la borne 220.
- [ ] Axes : Y « Nombre de sensibilisations » (série), « Nombre » (barres) ; X « Date », « Observation »,
      « Actions », « Académie ».
