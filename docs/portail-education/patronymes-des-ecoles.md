# Quelles personnalités ont donné leur nom aux écoles ?

- **URL** : https://data.education.gouv.fr/explore/assets/quelles-personnalites-ont-donne-leur-nom-aux-ecoles/view/
  (testé `curl -sIL` : **200 direct, aucune redirection**).
- **Id catalogue** : 2 · **Thématique** : Éducation.
- **Nature** : **page Opendatasoft Studio** (`uid: sp_m2n99p`, slug
  `quelles-personnalites-ont-donne-leur-nom-aux-ecoles`, `updated_at` **2026-06-02T07:18:33Z**).
  Configuration complète récupérée à `GET /api/portal/v1.0/studio_pages/<slug>` et archivée dans
  **`docs/portail-education/_sources/quelles-personnalites-ont-donne-leur-nom-aux-ecoles.studio.json`**.
- **Relevé visuel** : 2026-09-10, Chrome (extension), fenêtre 1440 × 690 CSS px.

## Le jeu de données — et la réponse sur l'enrichissement Wikidata

**Un seul `data_provider`** (`gx8ioaspamu`) : **`effectifs-deleves-par-ecole-copie0`**.

- Titre interne : « **Effectifs d'élèves par école pour analyse des patronymes** » — un **jeu dérivé**,
  fabriqué pour cette page (le suffixe `-copie0` le dit).
- **809 225 lignes**, **29 champs**, `modified` **2026-06-02T07:15:19Z** (quatre minutes avant la dernière
  modification de la page Studio : la donnée et la page ont été publiées ensemble), Licence Ouverte v2.0,
  producteur **DEPP**. Features : `timeserie, analyze` — **pas de `geo`** : ce jeu n'a aucune position.
- **16 rentrées scolaires** (`rentree_scolaire`, type **date**, valeurs `AAAA-01-01`) de **2009 à 2024**,
  de 54 200 lignes (2009) à **47 413 lignes (2024)**. **Une ligne = une école pour une rentrée.**

### ⚠️ Verdict sur la reproductibilité de l'enrichissement Wikidata

**L'enrichissement est FIGÉ DANS LE JEU du portail. La page est intégralement reproductible.**

Les 18 premiers champs sont ceux du jeu « Effectifs des écoles » de la DEPP (`rentree_scolaire`,
`code_region_insee`, `region_academique`, `code_academie`, `academie`, `code_departement`, `departement`,
`code_postal`, `commune`, `denomination_principale`, `patronyme`, `secteur`, `rep`, `code_region_academique`,
`numero_de_l_ecole`, `rep0`, `nombre_total_de_classes`, `nombre_total_d_eleves`).

**Les onze suivants sont le produit du pré-traitement et de l'enrichissement, et sont des colonnes ordinaires
du jeu, interrogeables à l'API comme les autres :**

| Champ | Libellé au schéma | Origine | Vérification |
|---|---|---|---|
| `patronyme_prepare` | patronyme_prepare | pré-traitement (mots génériques retirés) | **609 104 lignes non nulles**, **22 054 valeurs distinctes** |
| `sexe_ou_genre` | sexe ou genre | Wikidata | masculin 153 122 l. / féminin 35 821 l. / null 620 282 l. |
| `domaine_d_activite` | domaine d'activité | Wikidata | — |
| `occupation` | occupation | Wikidata | 185 787 lignes non nulles |
| `pays_de_nationalite` | pays de nationalité | Wikidata | France 157 174 l., royaume de France 8 018 l., null 625 467 l. |
| `date_de_naissance` | date de naissance | Wikidata (**date**) | min **0100-01-01**, max **2050-01-01** |
| `date_de_mort` | date de mort | Wikidata (date) | — |
| `lieu_de_naissance`, `lieu_de_mort` | — | Wikidata | non exploités par la page |
| `langue_maternelle` | langue maternelle | Wikidata | non exploité par la page |
| `image` | image | Wikidata | non exploité par la page |

Aucune requête vers `wikidata.org` n'est émise par la page (relevé réseau : tous les appels vont sur
`data.education.gouv.fr`). **Rien à refaire hors ligne** : une transposition `dsfr-data` lit les mêmes
colonnes du même jeu public. Le seul point d'attention est que **l'enrichissement est daté** (juin 2026) et
ne se met plus à jour — mais c'est vrai de l'original aussi.

### Les chiffres de la méthodologie ne correspondent plus à la donnée

Le bloc de texte de la page affirme :

> « Sur 809.225 écoles, il y a 638.356 patronymes renseignés dont **613.982** une fois les mots génériques
> retirés. **193.821** écoles ont pu être enrichies des données Wikidata, ce qui représente **3.113**
> patronymes différents. »

Contrôlé à l'API v2.1 le 2026-09-10 :

| Affirmation | Valeur annoncée | Valeur mesurée | Requête |
|---|---:|---:|---|
| lignes totales | 809 225 | **809 225** ✔ | `records_count` |
| `patronyme` renseigné | 638 356 | **638 356** ✔ | `where=patronyme is not null` |
| après retrait des mots génériques | 613 982 | **609 104** ✘ | `where=patronyme_prepare is not null` |
| « écoles enrichies » | 193 821 | **189 580** ✘ | au moins un champ Wikidata non nul |
| patronymes différents enrichis | 3 113 | **2 679** ✘ | `count(distinct patronyme_prepare)` sur les mêmes lignes |

Trois chiffres sur cinq sont périmés — écarts de 0,8 %, 2,2 % et **14 %**. Le texte a manifestement été
rédigé sur une version antérieure du jeu dérivé. À noter aussi que le texte dit « **écoles** » là où il
compte des **lignes** : 809 225 est le nombre de couples (école, rentrée), pas d'écoles — il y a de l'ordre
de 50 000 écoles par rentrée.

### Facettes déclarées au back-office

`rentree_scolaire`, `region_academique`, `academie`, `departement`, `commune`, `denomination_principale`,
`patronyme`, `secteur`, `rep`, `code_postal`. **`server-facets` est donc utilisable** (dix facettes
déclarées, dont les deux que la page expose).

## Objectif de la dataviz et informations véhiculées

- **Question** : « Quelles figures la République met-elle au fronton de ses écoles primaires ? »
  C'est une **page éditoriale d'exploration** — un objet de curiosité et de médiation, pas un outil de
  pilotage.
- **Message porté** : le panthéon scolaire français est très concentré (Jules Ferry en tête), très
  masculin (**10 554 écoles portent le nom d'un homme, 2 533 celui d'une femme**, soit 81 % / 19 %),
  très littéraire, très XIX<sup>e</sup> siècle, et très français (157 174 lignes « France » contre
  2 064 pour la deuxième nationalité).
- **Ce que l'utilisateur doit obtenir** : le palmarès des dix patronymes, la répartition par sexe, les
  domaines d'activité, la distribution des dates de naissance, et les nationalités hors France — le tout
  filtrable par secteur et par région académique.
- **Ce qui n'est pas dans l'objet** :
  - **aucune carte** — le jeu n'a pas de champ géographique (feature `geo` absente), alors que
    `code_postal`, `commune` et `code_departement` y sont ;
  - **aucune évolution dans le temps** des baptêmes, alors que le jeu couvre 16 rentrées : la dimension
    temporelle est soit ignorée, soit figée à 2024, soit **agrégée par erreur** (cf. § Défauts n° 1) ;
  - **aucun accès au détail** : pas de tableau, pas de recherche, pas de liste d'écoles ; on ne peut pas
    savoir *quelles* écoles portent un nom ;
  - **aucun lien Wikidata** : la colonne `image` et les fiches ne sont pas exposées ;
  - **aucun KPI** : la page n'affiche pas un seul chiffre isolé.

## Relevé visuel exhaustif, bloc par bloc

Ordre défini par `content.layouts.default` : **média → texte → filtres → 2 graphiques → 2 radars →
1 chronologie → 1 chronologie → 1 barres**.

### 0. Chrome de page

En-tête DSFR, fil d'Ariane « Catalogue › Quelles personnalités o… › **Consultation** », H1
« **Quelles personnalités ont donné leur nom aux écoles ?** », icône signet. Bulle de chat magenta flottante.

### 1. Bloc média (`block_MO2M34FNOIK0R`, `type: media`, ratio `21-9`)

Photographie ancienne sépia d'une école (façade à deux pignons, préau à colonnes).
**L'image est hébergée sur `https://www.rendr.fr/wp-content/uploads/2019/11/louviers_ecole_jules_ferry_primaire_superieure.jpg`**
— un site tiers, hors domaine de l'État. `alt` = **chaîne vide**. Rien n'indique la source ni la licence.

### 2. Bloc texte (`block_MO2M62VDS1SXL`, aligné à gauche)

- H1 markdown « Quelles personnalités ont donné leur nom aux écoles ? » — **un second H1 dans la page**,
  après celui du chrome.
- H3 « Cette page analyse les patronymes des écoles primaires de la France entière. »
- Filet horizontal, puis le paragraphe **Méthodologie** cité plus haut, avec un lien sortant vers
  `wikidata.org`. Les mots génériques cités : « ECOLE », « PRIMAIRE », « INSTITUTION », « ELEMENTAIRE ».
- Les nombres sont écrits **à l'anglaise avec un point** : « 809.225 », « 3.113 ».
- La colonne `patronyme` est écrite entre **accents graves échappés** dans le JSON (`\`patronyme\``) et
  s'affiche à l'écran comme « `patronyme` » dans une police à chasse fixe.

### 3. Section filtres (`section_MO2N2GC40SNEF`, `type: filters`)

Deux `select`, centrés, tous deux `layout_single_selection` (**choix unique**), sans valeur par défaut :

| # | `fieldName` | `title` configuré | Rendu |
|---|---|---|---|
| 1 | `secteur` | **Secteur** | « Sélectionnez une valeur » → **Privé** · **Public** |
| 2 | `region_academique` | **Académie** | « Sélectionnez une valeur » → **AUVERGNE-RHONE-ALPES**, **BOURGOGNE-FRANCHE-COMTE**, **BRETAGNE**, **CENTRE-VAL DE LOIRE**, **CORSE**, **GRAND EST**, **GUADELOUPE**, … |

🐛 **Le filtre intitulé « Académie » porte sur `region_academique`.** Vérifié à l'écran (les valeurs listées
sont des **régions académiques**, en capitales non accentuées) et à l'API : le champ a **18 valeurs**
(ILE-DE-FRANCE 107 337 l. · AUVERGNE-RHONE-ALPES 99 489 · HAUTS-DE-FRANCE 84 398 · NOUVELLE-AQUITAINE 79 919 ·
GRAND EST 77 295 · OCCITANIE 74 724 · PROVENCE-ALPES-COTE D'AZUR 49 413 · BOURGOGNE-FRANCHE-COMTE 47 346 ·
PAYS DE LA LOIRE 44 850 · NORMANDIE 44 613 · BRETAGNE 38 108 · CENTRE-VAL DE LOIRE 34 767 · LA REUNION 8 351 ·
GUADELOUPE 4 909 · CORSE 4 058 · MARTINIQUE 3 852 · MAYOTTE 3 051 · GUYANE 2 745), alors que le champ
`academie` existe dans le même jeu et en compte une trentaine. **Le libellé est faux.**

Aucun compteur n'est affiché sur les valeurs. L'ordre est alphabétique. **L'URL n'est jamais synchronisée** :
elle reste `…/view/` quel que soit le filtrage.

**Recalcul vérifié** avec `Secteur = Privé` : les huit premiers patronymes deviennent
**SAINT JOSEPH · ST JOSEPH · Jeanne d'Arc · SACRE COEUR · SAINTE MARIE · NOTREDAME · STE MARIE · STE ANNE**
et le donut passe à **féminin 313 / masculin 279** — l'inversion du rapport hommes/femmes dans le privé est
le résultat le plus frappant de la page, et elle ne le commente pas.

### 4. Section « 2 graphiques » (`section_MO2M3HXRLS5SB`, deux colonnes)

**a) « Patronymes les plus courants »** (`block_MO2M3HXSFHTKG`, `comparison.bars`, `layout_xy_tt_gr`) —
barres **horizontales**, 10 barres.
- `xField: patronyme_prepare`, `yFunction: count` (comptage de **lignes**),
  condition `rentree_scolaire = 2024` (type `date`), `order by series desc`, `limit 10`.
- Axe Y intitulé « **Nom de l'école** » (c'est un patronyme, pas un nom d'école) ; axe X
  « **Nombre d'écoles** » gradué 0 · 100 · 200 · 300 · 400 · 500.
- Couleur de série `@chart[16]` → **mauve clair**, une seule teinte.
- Valeurs vérifiées à l'API sur `rentree_scolaire = 2024` :
  **Jules Ferry 441 · Jacques Prévert 316 · Jean Jaurès 298 · Jean de La Fontaine 279 · Jean Moulin 269 ·
  SAINT JOSEPH 235 · Victor Hugo 233 · Louis Pasteur 210 · Antoine de Saint-Exupéry 206 · Simone Veil 201.**
  (Le onzième serait Jules Verne, 179.)
- **Le groupe `null` est le plus gros de tous** — 10 831 lignes en 2024 — et **n'apparaît pas** : aucune
  barre sans libellé n'est rendue. Aucune condition `IS NOT NULL` n'est pourtant configurée : le moteur
  Studio écarte le groupe nul de lui-même sur ce graphique.
- **« SAINT JOSEPH » en capitales au milieu de neuf noms en casse normale** : le pré-traitement n'a pas
  reconnu ce patronyme comme une personnalité Wikidata, il est resté brut. Avec `Secteur = Privé`, on voit
  **SAINT JOSEPH (235) et ST JOSEPH séparément**, ainsi que SAINTE MARIE et STE MARIE : les variantes
  d'abréviation ne sont pas normalisées, donc les rangs du privé sont faux par construction.

**b) « Répartition des personnalités selon leur sexe »** (`block_MO2M3HXS7QBPC`, `composition.doughnut`,
`layout_tt_se_na_va`, `cutout: medium`) — **anneau** à deux secteurs.
- `xField: sexe_ou_genre`, `yFunction: count_distinct` sur `yField: numero_de_l_ecole`, `order by x desc`.
- Étiquettes posées sur les secteurs, pas de légende séparée : « **féminin 2 533** » (secteur indigo, en
  haut à gauche) et « **masculin 10 554** » (secteur bleu nuit, tout le reste).
- Vérifié à l'API : `count(distinct numero_de_l_ecole)` = masculin **10 554**, féminin **2 533** ✔ ;
  et **null : 43 445 écoles**, absentes de l'anneau.
- 🐛 **Deux unités différentes dans deux graphiques côte à côte** : le graphique (a) compte des **lignes**
  (donc des écoles d'une rentrée précise), le graphique (b) compte des **écoles distinctes sur 16 rentrées**.
  Les deux ont pour légende implicite « nombre d'écoles ». Ils ne sont pas comparables.
- Le titre dit « **des personnalités** » alors que la mesure compte des **écoles** : 2 533 écoles portent le
  nom d'une femme, pas 2 533 femmes.

### 5. Section « 2 radars » (`section_MO2N8YITNVYJN`, deux colonnes)

**« Principaux domaines d'activité des femmes / des hommes ayant donné leur nom à une école »**
(`block_MO2N8YITRYYVI` et `block_MO2P9LF2NGH7W`, `comparison.radar`, `layout_tt_sc`) :
- `xField: domaine_d_activite`, `yFunction: count_distinct(numero_de_l_ecole)`, condition
  `sexe_ou_genre = 'féminin'` (resp. `'masculin'`), `limit: 10`, **`order: {by: series, direction: "asc"}`**.
- Couleurs : `@chart[2]` (bleu-violet) pour les femmes, `@chart[0]` (**gris**) pour les hommes.

🐛 **Les deux radars affichent les dix domaines les MOINS fréquents.** `direction: "asc"` avec `limit 10`
prend les dix plus petites valeurs. À l'écran, l'échelle radiale est graduée **0,2 · 0,4 · 0,6 · 0,8** :
tous les axes valent **1** (une seule école). Relevé mot pour mot :

| Radar « femmes » (10 axes, valeur 1) | Radar « hommes » (10 axes, valeur 1) |
|---|---|
| astronomie, chorégraphie, christianisme, cinéaste, gouvernance, littérature pour jeunes adultes, mathématiques, musicien ou musicienne, mystique, média numérique | algèbre, anatomie, anatomopathologie, anthropologie, armée, blues, briqueterie, chirurgie, cinéma, **Diptera** |

Ce que les graphiques **devraient** montrer (même requête, `direction: desc`, vérifié à l'API) :

| Femmes (écoles distinctes) | Hommes (écoles distinctes) |
|---|---|
| politique 209 · poésie 182 · radioactivité 140 · pédiatrie 138 · chimie 89 · journal intime 81 · sculpture 51 · peinture 38 · composition 28 · abolitionnisme 23 | belles-lettres 977 · philosophie 577 · écriture créative et professionnelle 434 · chimie 270 · peinture 203 · forme dramatique 194 · littérature 191 · littérature française 165 · poésie 127 · physique nucléaire 88 |

Le titre annonce « **Principaux** domaines » ; la page en montre l'exact contraire. Et « **Diptera** »
(le taxon des mouches) comme domaine d'activité d'un homme ayant donné son nom à une école dit ce que
vaut la taxonomie Wikidata `domaine d'activité` sans nettoyage.

Le **radar est en outre le mauvais type** : dix catégories nominales sans ordre naturel, une seule série,
aucune notion de profil multicritère. Le guide `chartTypes` de `dsfr-data` le dit explicitement — un radar
sert à comparer des dimensions d'un même profil.

### 6. « Date de naissance des personnalités jusqu'à 1499 » (`block_MO2PZL5VN2Z4E`)

`timeSeries.lines`, `layout_xy_tt_gr_do`, sous-titre « Jusqu'à l'année 1499 ».
- `xField: date_de_naissance`, `xTimescale: year`, condition `date_de_naissance prior 1500-01-01`,
  `yFunction: count_distinct(numero_de_l_ecole)`, `order by x asc`.
- Axe Y « Nombre d'écoles », gradué 0 → 180. Axe X « Année », étiquettes obliques **tous les 28 ans**
  (100, 128, 156, 184, 212, 240, … 1472) — illisibles.
- Rendu : une ligne quasi plate à 0 ponctuée de tiges isolées. Pic à droite : **année 1412, 161 écoles**
  (Jeanne d'Arc, vérifié à l'API). Autres reliefs : 316 → 39 écoles, 1452 → 39, 250 → 16, 748 → 15.
- Une **ligne** reliant des années éparses sur quatorze siècles suggère une continuité qui n'existe pas :
  il y a une poignée de points sur 1 400 positions d'axe.

### 7. « Date de naissance des personnalités depuis 1500 » (`block_MOCY79O4FEW3R`)

Même type, même palette, même titre d'axes, condition `date_de_naissance post_or_equal 1500-01-01`.

🐛 **Mais `yFunction` vaut `count` — pas `count_distinct`.** Les deux moitiés de la même distribution
n'utilisent pas le même agrégat : le second graphique compte des **lignes** (16 rentrées), le premier des
**écoles distinctes**. Les hauteurs ne sont pas comparables — rapport ~16×. Vérifié à l'API :

| | avant 1500 | depuis 1500 |
|---|---|---|
| Agrégat configuré | `count_distinct(numero_de_l_ecole)` | `count(*)` |
| Sommet | 1412 → **161** | 1900 → **12 425** |
| Suivants | 316 → 39 · 1452 → 39 | 1832 → 8 038 · 1859 → 5 410 · 1899 → 5 198 · 1621 → 4 668 · 1895 → 4 359 · 1802 → 4 028 · 1822 → 3 794 |

Lu à l'écran : axe Y jusqu'à **14 k**, pic à ~12,4 k vers 1900, second pic à ~8 k vers 1832 (Jules Ferry).

🐛 **L'axe X s'étend jusqu'à 2040.** Le maximum de `date_de_naissance` dans le jeu est **2050-01-01**,
attribué à « **Pétronille de Rome** » (sainte du I<sup>er</sup> siècle, 16 lignes). D'autres dates aberrantes
sont visibles à l'API : « Paul de Tarse » né le **05/01/2001** (276 lignes), « Matthieu » le 10/01/2001,
« Marc » le 12/01/2001, « Madame » le 16/01/2002. Autant de valeurs Wikidata mal résolues, reprises telles
quelles, qui étirent l'axe de la page de quarante ans dans le futur.

### 8. « Principales nationalités des personnalités en dehors de la nationalité française » (`block_MO2P98LJTRLXK`)

`comparison.bars` (barres **horizontales**), 10 barres, mauve clair.
- `xField: pays_de_nationalite`, `yFunction: **count**`, `limit 10`, `order by series desc`, condition
  `pays_de_nationalite != 'France'` **and** `!= 'royaume de France'` **and** `!= 'royaume des Francs'`.
- Axe Y « Nationalité », axe X « **Nombre d'écoles** » gradué 0 · 500 · 1 k · 1,5 k · 2 k · 2,5 k.
- Valeurs vérifiées (lignes / écoles distinctes) :
  **Deuxième République de Pologne 2 064 (141 écoles) · Allemagne 1 470 (99) · Belgique 1 304 (90) ·
  États-Unis 1 291 (95) · Espagne 1 283 (88) · Rome antique 1 234 (86) · Empire russe 1 109 (76) ·
  Suisse 747 (53) · Afrique du Sud 655 (50) · République florentine 573 (41).**
- 🐛 **L'axe dit « Nombre d'écoles » et affiche un nombre de lignes** : 2 064 pour la Pologne au lieu de
  **141**. L'ordre de grandeur affiché est **quinze fois trop grand**.
- « Deuxième République de Pologne » en tête, c'est Marie Curie ; « Rome antique » et « République
  florentine » ne sont pas des nationalités au sens courant : la taxonomie Wikidata mélange États
  historiques et pays contemporains, sans harmonisation.

### 9. Kebab « ⋮ » par bloc

Présent sur chaque graphique. Entrées relevées : **« View dataset source »** (en anglais), « Exporter au
format PNG », « Exporter au format CSV », « Exporter au format … » (JSON/Excel, non déroulé jusqu'au bout).

### 10. Pied de page

« Conditions d'utilisation | Politique de confidentialité | Gestion des cookies ».

## Défauts et bizarreries de l'original — récapitulatif

1. **Trois unités de mesure différentes** pour la même légende « Nombre d'écoles » :
   `count` sur une rentrée (barres de patronymes), `count_distinct` sur 16 rentrées (donut, radars,
   chronologie < 1500), `count` sur 16 rentrées (chronologie ≥ 1500, nationalités). Les graphiques de la
   page ne sont **pas comparables entre eux**, et deux d'entre eux affichent des valeurs ~16 fois trop
   grandes.
2. **Les deux radars montrent les dix domaines les moins fréquents** (`direction: "asc"`), sous un titre
   qui promet les « principaux ». Tous les axes valent 1.
3. **Les deux moitiés de la distribution des naissances n'ont pas le même agrégat** — la comparaison
   avant/après 1500 est impossible.
4. **L'axe des naissances va jusqu'à 2040**, à cause d'une date Wikidata de 2050 pour une sainte du
   I<sup>er</sup> siècle.
5. **Le filtre « Académie » filtre sur la région académique.** Libellé faux, valeurs en capitales
   non accentuées.
6. **Trois des cinq chiffres de la méthodologie sont périmés** (613 982 / 193 821 / 3 113 contre
   609 104 / 189 580 / 2 679 mesurés).
7. **Le texte dit « écoles » là où il compte des lignes** (809 225 = couples école × rentrée).
8. **Les variantes d'abréviation ne sont pas normalisées** : SAINT JOSEPH et ST JOSEPH, SAINTE MARIE et
   STE MARIE apparaissent comme deux patronymes distincts dans le classement du privé.
9. **Le groupe `null` de `patronyme_prepare`** (10 831 lignes en 2024, soit 23 % des écoles) est écarté
   sans mention : rien n'indique au lecteur que le palmarès porte sur les trois quarts du parc.
10. **43 445 écoles sans `sexe_ou_genre`** sont absentes du donut, qui se présente pourtant comme une
    « répartition ».
11. **Le radar est le mauvais type de graphique** pour dix catégories nominales.
12. **Deux H1 dans la page** (chrome + markdown).
13. **L'image d'en-tête vient d'un site tiers** (`rendr.fr`), avec un `alt` vide, sans crédit ni licence.
14. **Nombres à séparateur anglais** (« 809.225 ») dans un texte français.
15. **Aucune synchronisation d'URL**, aucun état filtré partageable.
16. **`View dataset source`** en anglais dans le menu de chaque bloc.
17. **Aucun accès aux écoles elles-mêmes** : on ne peut pas savoir lesquelles portent tel nom.

## Transposition vers `dsfr-data`

### Architecture retenue et pourquoi — mesurée

**809 225 lignes : le mode « tout charger côté client » est exclu, et c'est mesuré, pas supposé.**

`/exports/json?limit=-1` avec un `select` réduit à **neuf colonnes** (`patronyme_prepare, sexe_ou_genre,
domaine_d_activite, pays_de_nationalite, date_de_naissance, secteur, region_academique, numero_de_l_ecole,
rentree_scolaire`), chronométré deux fois :

> **16,6 Mo gzip · 220,7 Mo bruts · 40,2 s puis 40,4 s.**

À comparer avec une **agrégation serveur** typique de la page (top 10 des patronymes de la rentrée 2024,
`group_by=patronyme_prepare&select=count(*)&order_by=n desc&limit=10`) :

> **0,72 s · 0,92 s · 0,04 s (cache).**

Deux ordres de grandeur. **Donc : `dsfr-data-source` en mode adaptateur OpenDataSoft, agrégation déléguée
au serveur pour chaque graphique.**

```html
<dsfr-data-source id="ecoles" api-type="opendatasoft"
  base-url="https://data.education.gouv.fr" dataset-id="effectifs-deleves-par-ecole-copie0">
</dsfr-data-source>
```

⚠️ **Le point de vigilance de cette page.** La référence de `dsfr-data-query` prévient :
> « un `group-by` non délégué s'exécute sur les seules lignes rapatriées, ce qui produit des totaux justes
> en apparence et faux en réalité »

et expose `getDelegation()` pour le diagnostiquer. Avec 809 225 lignes et un plafond `max-records` par
défaut à 1 000 sur l'adaptateur ODS, **un `group-by` retombé côté client donnerait un palmarès calculé sur
1 000 lignes, sans aucune erreur affichée**. Sur cette page, il faut donc :
1. vérifier `getDelegation()` sur chaque `dsfr-data-query` au moins une fois au navigateur ;
2. ou, plus sûr, **porter l'agrégation sur la `dsfr-data-source` elle-même** (`select`, `group-by`,
   `where`, `order-by`, `limit` sont des attributs de `dsfr-data-source` en mode adaptateur), une source
   par graphique.

C'est le choix retenu ci-dessous : **six sources ODS, une par bloc**, chacune ne rapatriant que ses
10 à 400 lignes d'agrégat. Le coût est de six requêtes concurrentes de moins d'une seconde, contre 40 s
pour un unique chargement complet.

### Correspondance bloc à bloc

| Bloc Studio | Composant + attributs `dsfr-data` |
|---|---|
| `data_providers` → `effectifs-deleves-par-ecole-copie0` | `<dsfr-data-source api-type="opendatasoft" base-url="https://data.education.gouv.fr" dataset-id="effectifs-deleves-par-ecole-copie0">` — **une par agrégat** (voir ci-dessus) |
| `block type: media`, ratio `21-9`, image tierce | `<figure class="fr-content-media">` DSFR + `<figcaption>` portant le crédit. Image **rapatriée en local**, `alt` renseigné : pas de composant `dsfr-data` |
| `block type: text` (markdown) | HTML DSFR (`fr-callout` pour la méthodologie). **Les trois chiffres périmés sont recalculés** par trois `dsfr-data-kpi` plutôt que réécrits en dur |
| **manque** : les chiffres de la méthodo ne bougent plus | `<dsfr-data-kpi source="…" value="meta:total" format="compact">` — `meta:total` (#659) rend le **total serveur**, pas les lignes reçues. C'est le correctif du défaut n° 6 |
| `filter select` `secteur`, `layout_single_selection` | `<dsfr-data-facets source="…" fields="secteur" display="secteur:select">` — `select` = choix unique en ligne (**pas** `:radio`, qui rend un menu déroulant à panneau, PG-023) |
| `filter select` `region_academique`, titré « Académie » | même chose, `labels="region_academique:Région académique"` — **on corrige le libellé** |
| filtres pilotant six graphiques à la fois | `<dsfr-data-context sources="s1,s2,s3,s4,s5,s6">` + `<dsfr-data-context-filter field="secteur" ui="…">` : c'est le composant prévu pour un filtre transverse multi-sources. `<dsfr-data-context-tags>` rappelle les filtres actifs et les rend retirables |
| filtres sans compteur, sans cascade | `server-facets fields="secteur, region_academique"` : valeurs **et compteurs** recalculés côté serveur en tenant compte des autres sélections. `fields` est obligatoire dans ce mode |
| `comparison.bars` + `count` + `rentree_scolaire = 2024` + `limit 10` | source ODS `select="count(*) as nb" group-by="patronyme_prepare" where="rentree_scolaire = date'2024-01-01' and patronyme_prepare is not null" order-by="nb desc" limit="10"` + `<dsfr-data-chart type="bar" horizontal label-field="patronyme_prepare" value-field="nb" name="Écoles">`. `name` est une **chaîne simple** (AM-023) |
| axe Y « Nom de l'école » | `<dsfr-data-a11y>` fournit le tableau ; le libellé d'axe se corrige en « Patronyme » via DSFR Chart |
| groupe `null` écarté en silence (10 831 l.) | on l'**écarte explicitement** (`where … is not null` sur la source) **et on le dit** dans une note de bas de graphique. Alternative : `empty-label="Sans patronyme identifié"` sur le chart, qui **nomme** la catégorie au lieu de la supprimer |
| `composition.doughnut`, `cutout: medium`, `count_distinct` | `<dsfr-data-chart type="pie" label-field="sexe_ou_genre" value-field="nb">` — **sans `fill`**, l'anneau est le rendu par défaut (`fill` = camembert plein) |
| `count_distinct(numero_de_l_ecole)` | ODSQL le sait : `select="count(distinct numero_de_l_ecole) as nb"` **sur la source**. Il n'existe **pas** d'agrégat `distinct` dans `dsfr-data-query` (piège connu du dépôt) : c'est une raison de plus de déléguer |
| `comparison.radar` × 2, `direction: asc` | `<dsfr-data-chart type="radar" y-min="0" y-max="…">` **existe** — mais on ne reproduit pas le tri : `order-by="nb desc"`. Et on remplace le radar par des **barres horizontales** (voir § Limites, point 3) |
| `timeSeries.lines`, `xTimescale: year` | ⚠️ **piège PG-014**. Sur `dsfr-data-query`, `group-by="year(date_de_naissance)"` est refusé par l'adaptateur. **Mais la référence de `dsfr-data-source` (#641) autorise désormais une expression aliasée** : `group-by="year(date_de_naissance) as annee"`, l'alias `as` étant obligatoire côté ODS. **Voie native à essayer en premier — non vérifiée au rendu sur ce jeu.** Repli connu : source générique `url=` + `params` |
| deux blocs pour une seule distribution | **un seul** `dsfr-data-chart type="line"` avec `x-min="1500"` et un second pour l'Antiquité si l'on veut garder la coupure — **avec le même agrégat des deux côtés** |
| axe étiré jusqu'à 2040 par une date de 2050 | `where="date_de_naissance < date'2026-01-01'"` sur la source, **plus** une note de bas de graphique disant combien de dates ont été écartées. `x-max="2010"` borne l'axe sans corriger la donnée |
| `comparison.bars` nationalités, `count` | source ODS `select="count(distinct numero_de_l_ecole) as nb"` — **on change l'agrégat**, pour que l'axe « Nombre d'écoles » dise la vérité (141 et non 2 064) |
| condition `!= France` and `!= royaume de France` and `!= royaume des Francs` | `where="pays_de_nationalite is not null and pays_de_nationalite != 'France' and pays_de_nationalite != 'royaume de France' and pays_de_nationalite != 'royaume des Francs'"` — dialecte **ODSQL** sur le `where` d'une `dsfr-data-source` (la syntaxe colon est réservée à `dsfr-data-query`) |
| kebab « Exporter au format PNG/CSV » | `databox databox-download databox-screenshot databox-source="DEPP — effectifs-deleves-par-ecole-copie0"` |
| kebab « View dataset source » | `databox-actions='["Voir le jeu de données"]'` ou un lien DSFR sous le bloc |
| **manque** : aucun tableau, aucun accès au détail | `<dsfr-data-source server-side page-size="50">` + `<dsfr-data-search server-search count>` + `<dsfr-data-list columns="…">` : recherche plein texte et pagination **serveur** sur 809 225 lignes, sans rien charger. Attributs **anglais** (`columns`, `search`, `filters`, `sort`) |
| **manque** : URL partageable | `url-sync` + `url-params` sur les facettes |
| **manque** : accessibilité des graphiques | `<dsfr-data-a11y for="…" source="…" table download>` sous chacun |
| — (rien dans l'original) | `<dsfr-data-chart type="map-reg" code-field="code_region_insee" value-field="nb" selected-palette="sequentialAscending">` : une **choroplèthe régionale** du taux d'écoles à patronyme féminin, que la page n'a pas et que la donnée permet. `code_region_insee` est au schéma. **Non vérifié au rendu.** |

### Esquisse de code

```html
<!-- ============================================================
     809 225 lignes : agrégation SERVEUR, une source par graphique.
     Mesuré : export complet 9 colonnes = 16,6 Mo gzip en 40 s ;
     un agrégat serveur = 0,7 à 0,9 s. Deux ordres de grandeur.
     ============================================================ -->

<!-- 1. Palmarès des patronymes, rentrée 2024 -->
<dsfr-data-source id="s-patro" api-type="opendatasoft"
  base-url="https://data.education.gouv.fr" dataset-id="effectifs-deleves-par-ecole-copie0"
  select="count(*) as nb" group-by="patronyme_prepare"
  where="rentree_scolaire = date'2024-01-01' and patronyme_prepare is not null"
  order-by="nb desc" limit="10"></dsfr-data-source>

<!-- 2. Répartition par sexe (écoles distinctes, toutes rentrées) -->
<dsfr-data-source id="s-sexe" api-type="opendatasoft"
  base-url="https://data.education.gouv.fr" dataset-id="effectifs-deleves-par-ecole-copie0"
  select="count(distinct numero_de_l_ecole) as nb" group-by="sexe_ou_genre"
  where="sexe_ou_genre is not null" order-by="nb desc"></dsfr-data-source>

<!-- 3 & 4. Domaines d'activité — ordre DÉCROISSANT (l'original trie à l'envers) -->
<dsfr-data-source id="s-dom-f" api-type="opendatasoft"
  base-url="https://data.education.gouv.fr" dataset-id="effectifs-deleves-par-ecole-copie0"
  select="count(distinct numero_de_l_ecole) as nb" group-by="domaine_d_activite"
  where="sexe_ou_genre = 'féminin' and domaine_d_activite is not null"
  order-by="nb desc" limit="10"></dsfr-data-source>
<dsfr-data-source id="s-dom-h" api-type="opendatasoft"
  base-url="https://data.education.gouv.fr" dataset-id="effectifs-deleves-par-ecole-copie0"
  select="count(distinct numero_de_l_ecole) as nb" group-by="domaine_d_activite"
  where="sexe_ou_genre = 'masculin' and domaine_d_activite is not null"
  order-by="nb desc" limit="10"></dsfr-data-source>

<!-- 5. Naissances par année — MÊME agrégat sur toute la période, dates aberrantes écartées.
     `group-by` avec une fonction ODSQL est accepté sur dsfr-data-source SI l'alias `as` est posé (#641).
     À vérifier au navigateur avant de conclure (PG-014). -->
<dsfr-data-source id="s-naiss" api-type="opendatasoft"
  base-url="https://data.education.gouv.fr" dataset-id="effectifs-deleves-par-ecole-copie0"
  select="count(distinct numero_de_l_ecole) as nb" group-by="year(date_de_naissance) as annee"
  where="date_de_naissance is not null and date_de_naissance < date'2010-01-01'"
  order-by="annee asc" limit="2000"></dsfr-data-source>

<!-- 6. Nationalités hors France — en ÉCOLES, pas en lignes -->
<dsfr-data-source id="s-nat" api-type="opendatasoft"
  base-url="https://data.education.gouv.fr" dataset-id="effectifs-deleves-par-ecole-copie0"
  select="count(distinct numero_de_l_ecole) as nb" group-by="pays_de_nationalite"
  where="pays_de_nationalite is not null and pays_de_nationalite != 'France' and pays_de_nationalite != 'royaume de France' and pays_de_nationalite != 'royaume des Francs'"
  order-by="nb desc" limit="10"></dsfr-data-source>

<!-- 7. Source paginée pour la liste et la recherche (ce que l'original n'a pas) -->
<dsfr-data-source id="s-liste" api-type="opendatasoft"
  base-url="https://data.education.gouv.fr" dataset-id="effectifs-deleves-par-ecole-copie0"
  server-side page-size="50" where="rentree_scolaire = date'2024-01-01'"></dsfr-data-source>

<div class="fr-container fr-mb-8w">

  <figure class="fr-content-media" role="group">
    <img src="/assets/img/ecole-jules-ferry-louviers.jpg"
         alt="Façade d'une école primaire supérieure du début du XXe siècle, à Louviers.">
    <figcaption class="fr-content-media__caption">
      École Jules-Ferry, Louviers — carte postale ancienne. Source à créditer.
    </figcaption>
  </figure>

  <h1 class="fr-h2">Quelles personnalités ont donné leur nom aux écoles&nbsp;?</h1>
  <p class="fr-text--lead">Les patronymes des écoles primaires de la France entière.</p>

  <div class="fr-callout">
    <h2 class="fr-callout__title fr-h6">Méthodologie</h2>
    <p class="fr-callout__text fr-text--sm">
      La colonne <code>patronyme</code> du jeu « Effectifs des écoles » a été pré-traitée pour retirer les
      mots génériques (ECOLE, PRIMAIRE, INSTITUTION, ÉLÉMENTAIRE…), puis enrichie par les
      <a href="https://www.wikidata.org/">données Wikidata</a> (sexe, date de naissance, nationalité,
      domaine d'activité). L'enrichissement est figé dans le jeu de données au 2&nbsp;juin&nbsp;2026.
    </p>
    <!-- Les chiffres sont recalculés, pas recopiés : c'est le correctif du défaut n° 6. -->
    <dsfr-data-kpi-group>
      <dsfr-data-kpi source="s-tot" value="meta:total" format="compact" col="4"
        label="couples école × rentrée"></dsfr-data-kpi>
      <dsfr-data-kpi source="s-prep" value="meta:total" format="compact" col="4"
        label="patronymes exploitables après nettoyage"></dsfr-data-kpi>
      <dsfr-data-kpi source="s-enrichi" value="meta:total" format="compact" col="4"
        label="lignes enrichies par Wikidata"></dsfr-data-kpi>
    </dsfr-data-kpi-group>
  </div>

  <!-- ================= Filtres transverses ================= -->
  <dsfr-data-facets id="f-glob" source="s-liste" server-facets
    fields="secteur, region_academique"
    labels="secteur:Secteur | region_academique:Région académique"
    display="secteur:select | region_academique:select" url-sync url-params></dsfr-data-facets>
  <dsfr-data-context sources="s-patro,s-sexe,s-dom-f,s-dom-h,s-naiss,s-nat,s-liste">
    <dsfr-data-context-filter field="secteur" ui="f-glob"></dsfr-data-context-filter>
    <dsfr-data-context-filter field="region_academique" ui="f-glob"></dsfr-data-context-filter>
  </dsfr-data-context>
  <dsfr-data-context-tags></dsfr-data-context-tags>

  <!-- ================= Palmarès + répartition par sexe ================= -->
  <div class="fr-grid-row fr-grid-row--gutters fr-mt-4w">
    <div class="fr-col-12 fr-col-md-6">
      <dsfr-data-chart id="g-patro" source="s-patro" type="bar" horizontal
        label-field="patronyme_prepare" value-field="nb" name="Écoles"
        databox databox-title="Patronymes les plus courants (rentrée 2024)"
        databox-source="DEPP — effectifs-deleves-par-ecole-copie0"
        databox-download databox-screenshot heading-level="2"></dsfr-data-chart>
      <p class="fr-hint-text">Rentrée 2024, 47 413 écoles, dont 10 831 sans patronyme identifiable
        (23 %) exclues du classement.</p>
      <dsfr-data-a11y for="g-patro" source="s-patro" table download></dsfr-data-a11y>
    </div>
    <div class="fr-col-12 fr-col-md-6">
      <!-- pas de `fill` : l'anneau est le rendu par défaut du type pie -->
      <dsfr-data-chart id="g-sexe" source="s-sexe" type="pie"
        label-field="sexe_ou_genre" value-field="nb" selected-palette="categorical"
        databox databox-title="Écoles selon le sexe de la personnalité"
        databox-source="DEPP / Wikidata" databox-download heading-level="2"></dsfr-data-chart>
      <p class="fr-hint-text">Écoles distinctes, toutes rentrées confondues.
        43 445 écoles dont la personnalité n'est pas identifiée ne figurent pas ici.</p>
      <dsfr-data-a11y for="g-sexe" source="s-sexe" table download></dsfr-data-a11y>
    </div>
  </div>

  <!-- ================= Domaines d'activité : barres, pas radar ================= -->
  <div class="fr-grid-row fr-grid-row--gutters fr-mt-4w">
    <div class="fr-col-12 fr-col-md-6">
      <dsfr-data-chart id="g-dom-f" source="s-dom-f" type="bar" horizontal
        label-field="domaine_d_activite" value-field="nb" name="Écoles"
        databox databox-title="Domaines d'activité — femmes" databox-download></dsfr-data-chart>
      <dsfr-data-a11y for="g-dom-f" source="s-dom-f" table download></dsfr-data-a11y>
    </div>
    <div class="fr-col-12 fr-col-md-6">
      <dsfr-data-chart id="g-dom-h" source="s-dom-h" type="bar" horizontal
        label-field="domaine_d_activite" value-field="nb" name="Écoles"
        databox databox-title="Domaines d'activité — hommes" databox-download></dsfr-data-chart>
      <dsfr-data-a11y for="g-dom-h" source="s-dom-h" table download></dsfr-data-a11y>
    </div>
  </div>

  <!-- ================= Naissances : une seule série, un seul agrégat ================= -->
  <div class="odv-chart-slot fr-mt-4w">
    <dsfr-data-chart id="g-naiss" source="s-naiss" type="line"
      label-field="annee" value-field="nb" name="Écoles" x-min="1500" x-max="2010"
      databox databox-title="Année de naissance des personnalités"
      databox-source="DEPP / Wikidata" databox-download heading-level="2"></dsfr-data-chart>
    <p class="fr-hint-text">Les dates postérieures à 2010 (dont une naissance en 2050 attribuée à
      Pétronille de Rome) sont écartées : ce sont des erreurs de la source Wikidata.</p>
    <dsfr-data-a11y for="g-naiss" source="s-naiss" table download></dsfr-data-a11y>
  </div>

  <!-- ================= Nationalités ================= -->
  <div class="odv-chart-slot fr-mt-4w">
    <dsfr-data-chart id="g-nat" source="s-nat" type="bar" horizontal
      label-field="pays_de_nationalite" value-field="nb" name="Écoles"
      databox databox-title="Nationalités hors France" databox-download></dsfr-data-chart>
    <p class="fr-hint-text">En nombre d'écoles distinctes. La « Deuxième République de Pologne »
      (141 écoles) est la nationalité Wikidata de Marie Curie.</p>
    <dsfr-data-a11y for="g-nat" source="s-nat" table download></dsfr-data-a11y>
  </div>

  <!-- ================= Le détail : ce que l'original n'offre pas ================= -->
  <h2 class="fr-h4 fr-mt-4w">Chercher une école</h2>
  <dsfr-data-search id="q" source="s-liste" server-search count
    label="Rechercher un patronyme, une commune"></dsfr-data-search>
  <dsfr-data-list source="q"
    columns="patronyme_prepare, denomination_principale, commune, departement, secteur, sexe_ou_genre"
    sort></dsfr-data-list>

</div>
```

## Limites et points durs identifiés

1. **La délégation serveur de l'agrégation est le vrai point dur — et c'est un piège silencieux.**
   *Obstacle* : sur 809 225 lignes, un `group-by` de `dsfr-data-query` qui **retombe côté client**
   s'exécute sur les seules lignes rapatriées (1 000 par défaut sur l'adaptateur ODS, `max-records`), et
   produit un palmarès plausible mais faux, **sans erreur ni avertissement**.
   *Voie native* : `getDelegation()` sur `dsfr-data-query` (#603) retourne `{groupBy, aggregate, orderBy,
   where}` — quelles opérations ont réellement été déléguées. C'est la réponse, et elle existe.
   *Contournement retenu* : porter l'agrégation sur `dsfr-data-source` (attributs `select`, `group-by`,
   `where`, `order-by`, `limit`), une source par graphique, ce qui **supprime la question**.
   *Verdict* : **non-problème de capacité, vrai problème d'ergonomie de l'outil.** À remonter comme une
   demande de *visibilité* : un dashboard sur un gros jeu devrait afficher un avertissement en console
   (ou dans la DataBox) quand une agrégation retombe côté client. Ne pas le compter comme une limite de
   `dsfr-data` : les deux architectures existent, il manque le signal.

2. **`group-by` avec une fonction ODSQL (`year(date_de_naissance)`).**
   *Obstacle historique* : PG-014 du dépôt — l'adaptateur entoure l'expression d'accents graves → 400.
   *Ce qui a changé* : la référence de `dsfr-data-source` (relue le 2026-09-10) dit désormais
   « ODS : un élément peut être une expression aliasée (`year(date) as annee`), transmise telle quelle —
   l'alias `as` est **obligatoire** côté ODS (#641) ».
   *Verdict* : **PG-014 est probablement caduc sur `dsfr-data-source`** (il reste vrai sur
   `dsfr-data-query`, qui n'a pas cet attribut documenté). **À vérifier au navigateur avant de le
   requalifier au registre** — je ne l'ai pas exécuté. Le repli connu (source générique `url=` + `params`)
   tient toujours, au prix de ne plus écouter le contexte.
   *À ne pas confondre* : grouper sur la date brute avec `year()` dans le `select` **n'est pas** grouper
   par année. Ici `date_de_naissance` est une date **complète** (« 2000-04-20 » pour Théo Curin) : le
   piège mordrait pleinement.

3. **Le radar.**
   *Constat* : `dsfr-data-chart type="radar"` **existe** (avec `y-min`/`y-max` pour borner l'échelle
   radiale, et l'avertissement du guide : « sans bornes, le centre du radar = minimum des données, ce qui
   est trompeur »). La reproduction à l'identique est donc possible.
   *Verdict* : **non-problème.** Mais il ne faut pas reproduire : le guide `chartTypes` réserve le radar
   aux « profils multicritères », et dix domaines nominaux à une série n'en sont pas un. **Écart assumé,
   à documenter dans la page.** C'est exactement le cas de figure de la règle du dépôt : la limite n'est
   pas dans la bibliothèque, elle est dans l'idée de recopier un mauvais choix.

4. **La coupure 1500 avec deux agrégats différents.**
   *Verdict* : ce n'est pas une contrainte technique, c'est un **bug de configuration de l'original**.
   La transposition n'a pas à le reproduire ; elle doit le signaler dans son analyse.

5. **`count_distinct` n'existe pas dans `dsfr-data-query`.**
   *Obstacle* : `aggregate="champ:fonction"` ne documente pas `distinct` (piège déjà consigné au dépôt :
   « intercaler un `dsfr-data-query group-by` et compter ses lignes avec `value="count"` »).
   *Voie native ici* : ODSQL le sait (`count(distinct numero_de_l_ecole)`), et l'agrégation est de toute
   façon déléguée. Le contournement `group-by` + `count` ne marcherait **pas** ici, car il faudrait un
   `count(distinct …)` **par groupe** — soit un double niveau d'agrégation que `dsfr-data-query` ne fait pas.
   *Verdict* : **limite réelle du mode client**, sans conséquence en mode serveur ODS. À dire précisément :
   sur un provider **sans** `count(distinct)` (Tabular, générique), la répartition par sexe de cette page
   serait **infaisable** en dsfr-data seul.

6. **Le pré-traitement des patronymes lui-même.**
   *Constat* : il est fait en amont, hors de la page. Une transposition n'a rien à refaire — mais elle
   **hérite de ses défauts** (SAINT JOSEPH ≠ ST JOSEPH, majuscules résiduelles). `dsfr-data-normalize
   replace-fields` pourrait fusionner les variantes, mais la grammaire réserve les deux-points et compare
   **strictement**, sans regex (AM-038) : il faudrait une paire par variante. Praticable sur quatre ou cinq
   cas connus, pas sur 22 054 patronymes distincts.
   *Verdict* : **limite de la donnée, pas de la bibliothèque.** À signaler dans la page.

7. **Ce que la transposition gagne** : trois chiffres de méthodologie recalculés au lieu d'être périmés,
   une unité de mesure unique et vraie sur tous les graphiques, les domaines d'activité dans le bon sens,
   une seule chronologie cohérente et bornée, un axe « nombre d'écoles » qui compte des écoles, un libellé
   de filtre juste, des facettes à compteurs en cascade, une URL partageable, un tableau accessible sous
   chaque graphique, et — surtout — **une recherche et une liste paginées côté serveur**, qui donnent enfin
   accès aux écoles derrière les agrégats. **Douze des dix-sept défauts relevés tombent.**

## Données à reproduire fidèlement

- [ ] **Jeu unique** `effectifs-deleves-par-ecole-copie0`, 809 225 lignes, 16 rentrées (2009→2024),
      enrichissement Wikidata **figé dans le jeu**.
- [ ] **Palmarès rentrée 2024** : Jules Ferry 441 · Jacques Prévert 316 · Jean Jaurès 298 ·
      Jean de La Fontaine 279 · Jean Moulin 269 · SAINT JOSEPH 235 · Victor Hugo 233 · Louis Pasteur 210 ·
      Antoine de Saint-Exupéry 206 · Simone Veil 201 — et **10 831 écoles sans patronyme identifiable**,
      à mentionner.
- [ ] **Sexe** : masculin **10 554** écoles distinctes, féminin **2 533** ; **43 445 non identifiées**,
      à mentionner.
- [ ] **Bascule public/privé** : `Secteur = Privé` → SAINT JOSEPH, ST JOSEPH, Jeanne d'Arc, SACRE COEUR,
      SAINTE MARIE, NOTREDAME, STE MARIE, STE ANNE ; donut **féminin 313 / masculin 279**.
- [ ] **Domaines (ordre décroissant, écoles distinctes)** — femmes : politique 209 · poésie 182 ·
      radioactivité 140 · pédiatrie 138 · chimie 89 · journal intime 81 · sculpture 51 · peinture 38 ·
      composition 28 · abolitionnisme 23. Hommes : belles-lettres 977 · philosophie 577 · écriture créative
      et professionnelle 434 · chimie 270 · peinture 203 · forme dramatique 194 · littérature 191 ·
      littérature française 165 · poésie 127 · physique nucléaire 88.
- [ ] **Naissances** : pic **1412 → 161 écoles** (Jeanne d'Arc) avant 1500 ; pics **1900** et **1832**
      après. Un seul agrégat sur toute la période. Dates aberrantes (max **2050**, « Pétronille de Rome »)
      écartées et signalées.
- [ ] **Nationalités hors France, en écoles distinctes** : Deuxième République de Pologne 141 ·
      États-Unis 95 · Allemagne 99 · Belgique 90 · Espagne 88 · Rome antique 86 · Empire russe 76 ·
      Suisse 53 · Afrique du Sud 50 · République florentine 41. (Le classement de l'original, en lignes,
      donne Pologne 2 064 · Allemagne 1 470 · Belgique 1 304 · États-Unis 1 291 · Espagne 1 283 ·
      Rome antique 1 234 · Empire russe 1 109 · Suisse 747 · Afrique du Sud 655 · Rép. florentine 573 —
      **l'ordre change** entre Allemagne, Belgique et États-Unis.)
- [ ] Deux filtres : Secteur (Privé/Public) et **Région académique** (18 valeurs) — libellé corrigé.
- [ ] Titres des blocs : « Patronymes les plus courants », « Répartition des personnalités selon leur
      sexe », « Principaux domaines d'activité des femmes / des hommes ayant donné leur nom à une école »,
      « Date de naissance des personnalités jusqu'à 1499 / depuis 1500 », « Principales nationalités des
      personnalités en dehors de la nationalité française ».
