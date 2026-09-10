# Territoires Numériques Éducatifs (tableau de bord TNE)

- **URL** : https://data.education.gouv.fr/pages/tne_dashboard/
- **Catalogue** : id **12**, thématique **Éducation**, sous-thématique **absente** (`null`),
  `filtre` `null`. Description du catalogue : « Tableau de bord des "Territoires numériques
  éducatifs" (TNE), lancés à la rentrée 2020 pour réduire la fracture numérique et accélérer
  la transformation numérique de l'École. » Vignette
  `/assets/theme_image/tne_dashboard.gif` (un **GIF animé**, seule vignette animée du catalogue).
- **Producteur des cinq jeux** : **Réseau Canopé** (et non la DEPP, contrairement à toutes les
  autres pages du lot). Licence ouverte v2.0 (Etalab).
- **Relevé visuel** : 2026-09-10, Chrome, fenêtre 1568 × 751 (viewport utile 1372 px de large
  au premier chargement, puis 1568). Template `_sources/tne_dashboard.html`, vérifié conforme
  au `$scope.blocks` en ligne le jour du relevé (le fichier stocké est la version désechappée
  et re-sérialisée par un DOM : attributs réordonnés alphabétiquement, `viewBox` → `viewbox`,
  `linearGradient` → `lineargradient` ; le contenu est identique).

## Les cinq jeux de données

| Jeu | Lignes | Champs | Couvre | Utilisé par |
|---|---:|---:|---|---|
| `fr-en-tne_suivi_deploiement_solutions_numeriques_par_solution_et_dept` | **HTTP 404** | — | — | contexte racine + section 5 (**disparue**) |
| `fr-en-tne_suivi_deploiement_solutions_numeriques_dept` | 12 | 7 | 12 dép. × **1 seule date** (2025-06) | KPI 1 |
| `fr-en-tne_suivi_audiences` | 50 | 16 | 49 mois de 2020-10 à 2025-03 (+ 1 ligne vide) | KPI 2, `ods-timerange`, graphiques 1 et 2 |
| `fr-en-tne_indicateurs_satisfaction_formations` | 6 | 8 | 2024-09 à 2025-02 | KPI 3 |
| `fr-en-tne_personnels_formes_par_departement_secteur_type_etablissement` | 460 | 12 | 49 dates × 2 à 12 dép., 2020-11 → 2025-03 | KPI 4, 2 camemberts, carte SVG |

Schémas utiles :

- `..._deploiement_..._dept` : `annee` (date), `mois_des_donnees` (text), `numero_du_departement`
  (text), `departement` (text), `nombre_d_enseignants` (int), `nombre_d_eleves` (int),
  `date_des_donnees` (date).
- `..._suivi_audiences` : `annee` (date), `mois_saisie` (date),
  `nombre_de_connexion_a_la_plateforme_tne` (int),
  `nombre_de_visiteurs_uniques_a_la_plateforme_tne` (int),
  `duree_moyenne_d_une_visite_sur_la_plateforme_tne` (double),
  `nombre_total_de_pages_vues_sur_la_plateforme_tne` (int), puis
  `top_1_source_d_acquisition` … `top_10_source_d_acquisition` (text).
  **Deux champs de type date** — c'est la cause du bug du `timerange` (§ Défauts n° 1).
- `..._satisfaction_formations` : `mois_concerne` (date), `nombre_de_repondants` (int), et
  **six** taux (double) : `contenu`, `duree`, `logistique`,
  `maitrise_du_sujet_par_l_intervenant`, `qualite_des_supports`, `transferabilite`.
- `..._personnels_formes_...` : `annee`, `date_de_saisie` (date), `nombre_total_de_participants`,
  `departement` (text, **pas de code INSEE**), `nombre_de_personnes_precisees`,
  `enseignement_public`, `enseignement_prive`, `etablissement_1er_degre`,
  `etablissement_2nd_degre`, `profil_stagiaire_enseignant`,
  `profil_stagiaire_formateurs_cadres_personnel_de_l_en`, `formes_non_connus` (tous int).

### Le jeu 404 : ce qu'il est devenu

`…_par_solution_et_dept` renvoie **404** en clé de lecture publique *et* en anonyme, sur
`/api/explore/v2.1/…` comme sur `/api/datasets/1.0/…`. Application de la règle LIM-006
(« un 404 ne prouve pas que le jeu a disparu ») : le catalogue TNE compte aujourd'hui
**8 jeux**, dont **quatre nouveaux** que la page ne connaît pas :

| Jeu | Lignes |
|---|---:|
| `fr-en-tne_suivi_deploiement_solutions_numeriques_1d_dept` | 12 |
| `fr-en-tne_suivi_deploiement_solutions_numeriques_2d_dept` | 12 |
| `fr-en-tne_suivi_deploiement_solutions_numeriques_preparation_classe_ecole_inclusive_dept` | 12 |
| `fr-en-tne_duree_formations_par_departement_secteur_type_etablissement` | 438 |

Les trois premiers ressemblent à un éclatement du jeu perdu « par solution ». **Ils ne le
remplacent pas** :

1. aucun ne porte de champ `nom_sne` (nom de la solution numérique) — la dimension
   « solution » a disparu ;
2. chacun ne contient qu'**une seule date** (2025-06) — la série mensuelle a disparu ;
3. surtout, les trois **contiennent exactement les mêmes chiffres** que le jeu agrégé
   `…_dept` : `sum(nombre_d_eleves)` = **2 435 461** et `sum(nombre_d_enseignants)` =
   **16 667** pour les quatre jeux. Trois jeux étiquetés « 1er degré », « 2nd degré » et
   « préparation de la classe et école inclusive » publient donc le total tous degrés
   confondus. Défaut de production côté portail, pas côté page.

Le quatrième (`_duree_formations_…`, 438 lignes, volume horaire par département / secteur /
type d'établissement, 2021 → 2025) est **inexploité par la page** alors qu'il double
exactement la structure du jeu des participants.

## Objectif de la dataviz et informations véhiculées

- **Question à laquelle elle répond** : « Où en est le programme TNE ? » — combien d'élèves
  touchés, combien d'enseignants formés, comment se répartissent ces formations dans les
  douze départements, et est-ce que la plateforme est fréquentée.
- **Message porté** : la croissance. Toutes les métriques de la page sont des **compteurs
  cumulés** (élèves bénéficiaires, participants aux formations, connexions, visiteurs
  uniques, pages vues), donc toutes montent. Le seul indicateur non cumulé de la page — la
  durée moyenne d'une visite — est aussi le seul qui redescende. La page est un bilan de
  déploiement, pas un instrument d'analyse.
- **Ce que l'utilisateur doit obtenir** : quatre chiffres clés datés, deux répartitions en
  pourcentage (1er/2nd degré, professeurs/autres personnels), les 12 valeurs départementales
  du dernier mois de formation, et deux courbes d'audience filtrables dans le temps.
- **Public visé** : pilotage institutionnel. Aucune entrée par établissement, aucune adresse,
  rien qu'un parent ou un enseignant puisse chercher pour lui-même.
- **Ce qui n'est pas dans l'objet** :
  - **aucune donnée par solution numérique** — le bloc qui la portait a disparu avec son jeu
    (§ Défauts n° 2) ;
  - **aucun dénominateur** : 2 435 461 élèves bénéficiaires sur combien d'élèves dans les
    douze départements ? 16 667 enseignants sur combien ? La page ne le dit jamais, et les
    jeux ne le portent pas ;
  - **aucune évolution du déploiement** : le jeu `…_dept` n'a **qu'une date** (2025-06) ;
  - **aucun taux** : tout est en effectif absolu, donc l'Aisne (13 811 formés) écrase
    la Corse-du-Sud (934) sans qu'on sache si c'est la taille du département ou l'intensité
    du programme ;
  - **cinq des six indicateurs de satisfaction** (`duree`, `logistique`,
    `maitrise_du_sujet_par_l_intervenant`, `qualite_des_supports`, `transferabilite`) ne sont
    jamais affichés, non plus que le **nombre de répondants** (38 à 75 selon le mois) ;
  - **les dix sources d'acquisition** (`top_1` … `top_10_source_d_acquisition`) du jeu
    d'audience ne sont jamais affichées, alors que la description du jeu les annonce ;
  - **aucun tableau, aucun export CSV, aucun lien vers l'API** — seulement quatre liens
    « Source » vers les pages `/explore/dataset/…`.

## Chiffres de référence (API v2.1, relevé du 2026-09-10)

| Mesure | Valeur |
|---|---|
| Élèves bénéficiaires d'une solution numérique (2025-06, 12 dép.) | **2 435 461** |
| Enseignants ayant demandé un déploiement (2025-06, 12 dép.) | **16 667** |
| Participants aux formations, cumul (2025-03, 12 dép.) | **53 491** |
| Visiteurs uniques cumulés (2025-03) | **94 383** |
| Connexions cumulées (2025-03) | **255 998** |
| Pages vues cumulées (2025-03) | **1 479 500** |
| Durée moyenne d'une visite (2025-03) | **4,98 min** (max 7,58 en 2023-04, min 2,83 en 2020-12 et 2021-03) |
| Taux de satisfaction « contenu » (2025-02) | **83,33 %** sur **75 répondants** |
| Répartition 1er / 2nd degré (2025-03) | 12 363 / 2 999 → **80 % / 20 %** |
| Répartition professeurs / autres personnels (2025-03) | 13 350 / 7 453 → **64 % / 36 %** |
| « Formés non connus » (2025-03) | **32 688** sur 53 491, soit **61 %** — exclus des deux camemberts |
| Public / privé (2025-03) | 15 599 / 649 |

**Formations par département, 2025-03** (les 12 valeurs affichées sur la carte SVG) :
Aisne 13 811 · Bouches-du-Rhône 9 543 · Val d'Oise 5 212 · Hérault 4 569 · Isère 3 835 ·
Vienne 3 398 · Finistère 3 331 · Cher 3 082 · Guadeloupe 2 581 · Doubs 2 171 · Vosges 1 024 ·
Corse-du-Sud 934. **Somme = 53 491**, égale au KPI.

**Élèves bénéficiaires par département, 2025-06** : Bouches-du-Rhône 501 864 · Isère 432 163 ·
Val d'Oise 343 207 · Hérault 292 435 · Doubs 154 007 · Finistère 149 649 · Aisne 141 626 ·
Vienne 119 193 · Vosges 90 617 · Guadeloupe 90 609 · Cher 84 457 · **Corse 35 634**.
Noter le libellé : `departement = "Corse"`, `numero_du_departement = "20"` dans ce jeu, contre
`departement = "Corse-du-Sud"` dans le jeu des formations. **Deux jeux de la même famille,
deux libellés pour le même territoire.**

**Série d'audience** : 50 lignes, dont **une entièrement vide** (`mois_saisie = 2024-01`,
`annee = 2023`, tous les indicateurs `null`) — il y a donc **deux lignes pour 2024-01** et
**49 mois renseignés**. Mois absents : 2020-11, 2021-08, 2022-08, 2023-08, 2024-08 (août,
plus un trou en novembre 2020). Les compteurs sont **cumulatifs**, sauf `duree_moyenne…` ;
`nombre_de_visiteurs_uniques…` recule pourtant deux fois (2024-08→09 : 80 549 → 79 166 ;
2025-02→03 : 95 672 → 94 383), ce qui est incompatible avec un cumul strict.

## Le template AngularJS

**66 781 caractères** — le plus gros du portail. Sa masse ne vient pas de la richesse
fonctionnelle : **deux copies du même dessin SVG de la France** (≈ 17 000 caractères chacune,
`tne_opt.svg`, produit par Inkscape 1.4) représentent à elles seules 51 % du fichier.

### Six contextes ODS, cinq jeux, quatre niveaux d'imbrication

```
<div class="main-div" context="deploiementsolutionsdetaille"        → …_par_solution_et_dept (404)
     ods-results="deploiementsolutionsdetailleautorise" ods-results-max="1" ods-datetime="now">
  §1 <section id="laius">                                            (statique)
  §2 <section> context="satisfaction,deploiement,suiviaudience"      → 3 jeux
  §3 <section> context="personnelsformes,suiviaudience"
       ├─ <div context="personnelsformescamembert">                  → même jeu, refine date
       └─ <div context="personnelsformescarte">                      → même jeu, refine date
  §4 <section> context="audiences"                                   → …_suivi_audiences
  §5 <section> context="menudeploiement,deploiementgraphiques"       → …_par_solution_et_dept
       ng-if="deploiementsolutionsdetailleautorise"                    (jamais rendu)
```

Six contextes déclarés pour cinq jeux, et **`fr-en-tne_suivi_audiences` est ouvert deux fois**
(`suiviaudience` en §2/§3 et `audiences` en §4) avec des tris opposés (`sort:'mois_saisie'` vs
`sort:'-mois_saisie'`). Conséquence directe : **le `ods-timerange` de §4 ne pilote que §4**,
et le KPI « visiteurs uniques » du haut de page, bien qu'il lise le même jeu, n'y réagit pas
(vérifié à l'écran, § Interactions).

### Le `ng-if` du contexte racine : une porte d'autorisation

`ods-results="deploiementsolutionsdetailleautorise" ods-results-max="1"` demande **une** ligne
du jeu `…_par_solution_et_dept` ; la section 5 est conditionnée par `ng-if` sur ce résultat.
Le nom de la variable (`…autorise`) dit l'intention : c'est un **test de droit d'accès**, la
présence de données faisant office de laissez-passer (le jeu était vraisemblablement
restreint). Comme le jeu a disparu, la porte est fermée pour tout le monde, définitivement, et
**sans distinction possible entre « vous n'y avez pas droit » et « ça n'existe plus »**.

### Les 17 requêtes du chargement

Relevées dans l'onglet (`read_network_requests`, chargement complet) :

| # | Requête | Statut |
|---|---|---|
| 1 | `/api/datasets/1.0/fr-en-tne_suivi_deploiement_solutions_numeriques_par_solution_et_dept/?extrametas=true…` | **404** |
| 2–5 | métadonnées v1 des quatre autres jeux | 200 |
| 6 | `/api/records/1.0/search/?sort=mois_concerne&rows=1&dataset=…satisfaction…` | 200 |
| 7 | `v2.1/…_dept/records?group_by=date_des_donnees&limit=1&order_by=-date_des_donnees&select=date_des_donnees, sum(nombre_d_eleves) as nb_elv` | 200 |
| 8 | `/api/records/1.0/search/?sort=mois_saisie&rows=1&dataset=…audiences` | 200 |
| 9 | `v2.1/…personnels_formes…/records?group_by=date_de_saisie as x_axis&limit=1&order_by=x_axis DESC&select=(sum(nombre_total_de_participants)) as y_axis` | 200 |
| 10 | `v2.1/…personnels_formes…/records?group_by=date_de_saisie, departement&select=SUM(nombre_total_de_participants) as participants&where=date_de_saisie >= '-01'` | **503** |
| 11, 13 | `/api/records/1.0/search/?sort=date_de_saisie&rows=1&dataset=…personnels_formes…` (**deux fois, identiques**) | 200 |
| 12 | `/api/records/1.0/analyze/` des 4 séries du camembert, **sans refine** | 200 |
| 14 | `analyze/` chart 1 : `x=mois_saisie.year&x=mois_saisie.month&y.serie1-1=…connexion…AVG&y.serie1-2=…visiteurs…AVG&q=annee:[2020-01-01 TO 2025-12-31]` | 200 |
| 15 | `analyze/` chart 2 : idem avec `duree_moyenne…AVG`, **même `q`** | 200 |
| 16 | `analyze/` camembert **avec** `refine.date_de_saisie=2025-03` (rejoue le 12) | 200 |
| 17 | `v2.1/…personnels_formes…/records?…&where=date_de_saisie >= '2025-03-01'` (rejoue le 10) | 200 |

Trois enseignements : (a) **une requête sur dix-sept est perdue en 404** et son échec est le
mécanisme même qui supprime la section 5 ; (b) **trois requêtes sur dix-sept sont des
répétitions** (11/13, 12/16, 10/17) dues à un rendu Angular en deux passes ; (c) la requête 10
part avec `where=date_de_saisie >= '-01'` — l'interpolation `{{…date_de_saisie}}-01` évaluée
avant que la donnée n'arrive — et le serveur répond **503** (pas 400) avec, en console :
`odsAdvAnalysis: API error — ODSQL query is malformed: Invalid date to parse '-01'.`

### Messages de la console (chargement, sans interaction)

1. `[LOG] Warning: the dataset "dataeducation.fr-en-tne_suivi_audiences" has more than one date
   or datetime field, the first date or datetime field will be used. You can specify the field
   to use using the "time-field" parameter.`
2. `[ERROR] odsAdvAnalysis: API error — ODSQL query is malformed: Invalid date to parse '-01'.`
3–4. Deux `Deprecation warning: moment().subtract(period, number) is deprecated` (bibliothèque
   du portail, pas la page).

## Relevé visuel exhaustif

Fond de page : quatre dégradés radiaux fixes (menthe en haut à gauche, lilas en bas à gauche,
bleu pâle en haut à droite, sable en bas à droite) sur `#fefefe`, `background-attachment: fixed`.
Grille **Bootstrap 3** (`col-md-4`, `col-md-6`, `col-md-8`, `col-md-12`) avec un
`.row { display: flex }` qui passe en colonne sous 992 px. Toutes les cartes sont des
`.card.z-depth-1` blanches à ombre portée, titres `h2.title` centrés.

### 1. Bandeau d'introduction (`<section id="laius">`)

**H1 centré** « Territoires Numériques Éducatifs » (2,25 rem, gras). Puis un paragraphe de
deux phrases, une liste à puces de deux items (« favoriser la mise en place d'un écosystème…
», « renforcer les aptitudes et compétences des enseignants… ») et un lien sortant
« **Les territoires numériques éducatifs (TNE)** » vers
`https://eduscol.education.fr/2177/les-territoires-numeriques-educatifs-tne`.
C'est le seul lien externe de la page. **C'est aussi la seule page du lot qui explique ce
qu'elle montre** — les quatre pages IPS n'ont pas une ligne de chapô.

Le texte annonce « l'Aisne et le Val d'Oise » puis « dix départements supplémentaires en
2021 » : **douze départements**, ce que les jeux confirment (12 lignes chacun).

### 2. Carte « Chiffres clés » — trois KPI (`row-equal-height`, 3 × `col-md-4`)

Trois cartes blanches identiques : icône Font Awesome 4 rem en `#142E7B`, valeur en 3,2 rem
`#AE1B73`, description en `#333`, mention grise « (dernier relevé du mois de MM/YYYY) », et un
lien « Source → » en pied vers `/explore/dataset/<datasetid>` (attribut `title` = titre du jeu,
vérifié dans l'arbre d'accessibilité).

| # | Icône | Valeur relevée | Libellé | Mention | Formule réelle |
|---|---|---|---|---|---|
| 1 | `fa-desktop` | **2 435 461** | Élèves bénéficiaires d'une solution numérique | (dernier relevé du mois de **06/2025**) | `ods-adv-analysis` sur `deploiement` : `group-by=date_des_donnees`, `select=date_des_donnees, sum(nombre_d_eleves) as nb_elv`, `order-by=-date_des_donnees`, `limit=1` → `{{solutions[0].nb_elv|number}}` |
| 2 | `fa-user` | **94 383** | Visiteurs uniques sur la plateforme TNE | (dernier relevé du mois de **03/2025**) | `ods-results="audiencedatemax"` sur `suiviaudience` (`sort:'mois_saisie'`), `max=1` → `{{audiencedatemax[0].fields['nombre_de_visiteurs_uniques_a_la_plateforme_tne']|number}}` |
| 3 | `fa-thumbs-up` | **83,3 %** | de professeurs satisfaits du contenu de la formation aux outils | (enquête du mois de **02/2025**) | `ods-results="satisfactionmax"` sur `satisfaction` (`sort:'mois_concerne'`), `max=1` → `{{satisfactionmax[0].fields['contenu'] | number:1}}%` |

**Trois dates différentes côte à côte** (06/2025, 03/2025, 02/2025) sans que rien n'explique
pourquoi. Et un quatrième KPI, plus bas, en affiche une quatrième (03/2025).

### 3. Carte « Formation des personnels » (`col-md-4` + `col-md-8`)

#### 3a. KPI « Participants aux formations » (`col-md-12` dans la colonne gauche)

Icône `fa-user`, **53 491**, « Participants aux formations », « (dernier relevé du mois de
03/2025) », lien Source. Formule : `ods-adv-analysis` sur `personnelsformes`,
`group-by="date_de_saisie as x_axis"`, `select="(sum(nombre_total_de_participants)) as y_axis"`,
`order-by="x_axis DESC"`, `limit=1`.

#### 3b. Deux camemberts SVG **faits à la main** (bloc `.lisere`)

Ce ne sont **pas** des `ods-chart`. Le template calcule les pourcentages dans une expression
Angular (`{{percentage1D = (100 * analysis.results[0]['1d'] / (…['1d'] + …['2d'])) | math:'round'; …}}`)
alimentée par un `ods-analysis` sur le contexte `personnelsformescamembert`
(refine `date_de_saisie = 2025-03`, quatre séries `SUM(etablissement_1er_degre)`,
`SUM(etablissement_2nd_degre)`, `SUM(profil_stagiaire_enseignant)`,
`SUM(profil_stagiaire_formateurs_cadres_personnel_de_l_en)`), puis dessine **un `<circle>`
unique** de rayon 50, `stroke-width: 100`, `stroke-dasharray: {{dash}} 314`, tourné de −90°,
avec deux `<linearGradient>` (`#26D3EB → #167987` en teal, `#A1478E → #D66FEB` en magenta).
Un disque, deux couleurs, un secteur — pas de bibliothèque.

| Camembert | Gauche | Droite | Valeurs à l'écran | Base réelle |
|---|---|---|---|---|
| « **Professeurs** » | Premier degré | Second degré | **80 %** / **20 %** | 12 363 + 2 999 = **15 362** |
| « **Tous personnels confondus** » | Professeurs | Cadres EN, formateurs, … | **64 %** / **36 %** | 13 350 + 7 453 = **20 803** |

Mention sous chacun : « (nombre de participants aux formations pour le mois de 03/2025) ».
Le libellé de droite du second camembert est **tronqué à l'écran** par la largeur de la
colonne : « Cadres EN, / formateurs, / … / 36 % ». C'est le rendu réel en 1568 px de large.

**Les deux camemberts portent sur 29 % et 39 % du total annoncé juste au-dessus** : 32 688 des
53 491 participants sont en `formes_non_connus` et ne sont dans aucune des deux bases. Rien
ne le signale.

#### 3c. Carte de France dessinée à la main (`col-md-8`)

Titre : « **Formation des professeurs par département pour le mois de 2025-03** » — la date est
imprimée **brute**, sans le filtre `moment:'MM/YYYY'` utilisé partout ailleurs sur la page.

Ce n'est ni un `ods-map`, ni un `ods-chart` de type carte : c'est un **SVG Inkscape statique**
(`viewBox="0 0 790 731"`, calques `fond` / `contours` / `bulles` / `rect indicateurs` /
`textes`) dans lequel Angular n'interpole que **24 valeurs** : douze `fill="{{color_XX}}"` sur
les rectangles et douze `{{activations_XX}}` dans les textes.

- **Fond** : un `<rect class="fond">` **orange plein `#ED6947`** sur toute la surface.
- **Contours** : `fill:none; stroke:#fff; stroke-width:1px` — un tracé blanc filaire,
  **très fortement simplifié** : à l'écran la métropole ressemble à un maillage de triangles
  plutôt qu'à une carte, les frontières intérieures des départements ne sont pas dessinées, et
  les 35 tracés `dom1` … `dom35` (îles, morceaux de littoral, DROM) flottent isolés à droite du
  cadre sans être identifiables. La Corse et la Guadeloupe sont nommées, les autres non.
- **Pas de projection réelle** : les DROM ne sont pas dans des encarts cadrés, ils sont
  simplement posés à droite.
- **12 marqueurs** : chacun est une « bulle » blanche (calque `bulles`, `fill:#fff`) surmontée
  d'un **rectangle plein coloré** de 20 px de haut portant la valeur en blanc gras 13,3 px
  (Arial), et sous lui le nom du département en capitales orange `#ED6947` gras 16 px.
- **Palette et seuils** : quatre couleurs en dur — `#37A2D8` (bleu), `#7980E4` (bleu-violet),
  `#BC5FF0` (violet), `#FF3EFD` (magenta) — attribuées par **quartiles** calculés en direct par
  un `ods-subaggregation` (`QUANTILE(participants, 0.25 / 0.5 / 0.75)`), via une cascade de
  ternaires `(quartile1 - activations_XX) > 0 ? couleur1 : (…)`.
  Répartition observée à l'écran : bleu = Corse-du-Sud 934, Vosges 1 024, Doubs 2 171 ;
  bleu-violet = Guadeloupe 2 581, Cher 3 082, Finistère 3 331 ; violet = Vienne 3 398,
  Isère 3 835, Hérault 4 569 ; magenta = Val d'Oise 5 212, Bouches-du-Rhône 9 543,
  Aisne 13 811. **Quatre quartiles sur douze valeurs = exactement trois départements par
  couleur, par construction** : la couleur n'encode que le rang, jamais l'ordre de grandeur.
  Cher (3 082) et Vienne (3 398) diffèrent de 10 % et changent de classe ; Val d'Oise (5 212)
  et Aisne (13 811) diffèrent d'un facteur 2,6 et partagent la même.
- **Aucune légende**, aucune échelle, aucune infobulle : les `<path>` n'ont ni `ng-click`, ni
  `<title>`, ni gestionnaire de survol. **La carte est un décor**, la donnée est dans les
  étiquettes.
- Le `where` de l'analyse est `date_de_saisie >= '2025-03-01'` — **borne basse seule**.
  Aujourd'hui le jeu s'arrête à 2025-03 donc le résultat est juste ; **dès qu'un mois de plus
  sera publié, la carte additionnera silencieusement deux mois** alors que son titre en
  annoncera un seul.

### 4. Carte « Audiences de la plateforme TNE » (`col-md-12`, deux `col-md-6`)

#### 4a. Le filtre `ods-timerange` (`<nav class="row">`, pilule blanche arrondie)

```html
<ods-timerange context="audiences" date-format="DD MMM YYYY" precision="day"
               default-from="2020-01-01" default-to="2025-12-31"
               from="startDate" to="endDate"
               download-time-field="timestamp" queryresult-time-field="timestamp"
               searchnoresult-time-field="timestamp" stats-time-field="timestamp"
               users-time-field="timestamp">
```

Rendu : une pilule blanche centrée contenant « Du **01 janv. 2020** ⊗ au **31 déc. 2025** ⊗ ».
Deux `input[type=text]` (`aria-label` « Date de début » / « Date de fin »), chacun avec une
croix d'effacement. Au clic : un **calendrier mensuel** avec navigation ←/→, jours en
`lu ma me je ve sa di`, et un bouton d'heure « **00:00** ». La saisie au clavier fonctionne
(« 01 juin 2023 » repositionne le calendrier sur juin 2023).

**Cinq attributs `*-time-field` pour cinq contextes qui n'existent pas.** `download`,
`queryresult`, `searchnoresult`, `stats` et `users` sont les contextes du tableau de bord de
**monitoring d'un back-office Opendatasoft** : le widget a été copié tel quel depuis un autre
gabarit. Il manque le seul qui compte, `audiences-time-field` (ou un `time-field` nu). Voir
§ Défauts n° 1 pour ce que ça produit.

#### 4b. Graphique 1 — « Nombre de visiteurs et de connexions »

Sous-titre : « Nombre de visiteurs uniques et de connexions à la plateforme TNE ».

```html
<ods-chart align-month="false" display-legend="false" label-x="Mois"
           scientific-display="false" timescale="month">
  <ods-chart-query context="audiences" field-x="mois_saisie" maxpoints="0" timescale="month">
    <ods-chart-serie chart-type="line" color="#000091" display-values="false"
      expression-y="nombre_de_connexion_a_la_plateforme_tne" function-y="AVG"
      label-y="Nombre de connexions" min="0" scientific-display="false"/>
    <ods-chart-serie chart-type="line" color="#e1000f"
      expression-y="nombre_de_visiteurs_uniques_a_la_plateforme_tne" function-y="AVG"
      label-y="Nombre de visiteurs uniques" min="0" scientific-display="false"/>
```

Rendu Highcharts observé (plage par défaut) :

- **Deux courbes lissées, deux axes Y.** Gauche `Nombre de connexions` en bleu `#000091`,
  graduée 0 → 300 000 par 50 000, titre d'axe écrit en bleu. Droite
  `Nombre de visiteurs uniques` en rouge `#e1000f`, graduée 0 → 125 000 par 25 000, titre
  d'axe écrit en rouge. Les deux séries partent de `min="0"`.
- **Axe X** : `Mois`, ticks annuels « 2021, 2022, 2023, 2024, 2025 » inclinés à 45°.
- **Pas de légende** (`display-legend="false"`). L'appariement courbe ↔ série ne repose que
  sur la couleur des deux titres d'axes.
- **Infobulle** (survol relevé) : encadré blanc bordé de la couleur de la série, deux lignes —
  « **Juillet 2024** » puis « Nombre de visiteurs uniques **80 549** ». **Une seule série à la
  fois** : impossible de lire connexions et visiteurs du même mois dans la même bulle.
- Courbes strictement croissantes (données cumulatives), sauf le repli de fin de la rouge.
- `function-y="AVG"` avec `timescale="month"` sur un jeu à **une ligne par mois** est une
  moyenne d'un seul élément — sauf pour 2024-01 qui a deux lignes dont une nulle.

#### 4c. Graphique 2 — « Durée des visites »

Sous-titre : « Durée moyenne d'une visite en minutes ».

```html
<ods-chart align-month="true" scientific-display="false">
  <ods-chart-query context="audiences" field-x="mois_saisie" maxpoints="0" timescale="month">
    <ods-chart-serie chart-type="line" color="#275420"
      expression-y="duree_moyenne_d_une_visite_sur_la_plateforme_tne" function-y="AVG"
      label-y="Durée d'une visite" scientific-display="true"/>
```

- Courbe unique vert foncé `#275420`, **anguleuse** (échelle mensuelle, très bruitée), axe Y
  gauche `Durée d'une visite` 2 → 8, axe X **`Mois saisie`** (le libellé de champ ODS, alors
  que le graphique voisin porte un `label-x="Mois"` explicite : deux libellés d'axe X
  différents pour le même champ, côte à côte).
- **Une légende est affichée** ici (« — Durée d'une visite ») alors que le graphique voisin,
  qui en aurait deux fois plus besoin, n'en a pas.
- **Infobulle** : « **Juillet 2024** / Durée d'une visite **5,17** » — sans unité, alors que
  le sous-titre précise « en minutes ».
- Les mois manquants (août de chaque année) ne sont **pas** marqués : la courbe trace un
  segment droit de juillet à septembre. `align-month="true"` ici, `false` sur le voisin, sans
  effet visible différent.

### 5. Section « Détail du déploiement par solution numérique » — **absente**

Prévue par le template (`§5`), elle **n'apparaît pas du tout**. Vérifié dans le DOM : aucun
titre, aucun `<select>`, aucun conteneur vide ; `find` sur « Détail du déploiement par solution
numérique » ne retourne rien, et le texte de la page passe directement du graphique « Durée des
visites » au pied de page du portail. Voir § Défauts n° 2 pour l'analyse, et ci-dessous pour ce
qu'elle contenait.

Contenu perdu, reconstitué depuis le template :

- Un `<select>` peuplé par `ods-facet-results` sur la facette `nom_sne` du contexte
  `menudeploiement`, trié `alphanum`, avec les options numérotées `1-<nom>`, `2-<nom>`… et une
  option vide « `--- Solution numérique ---` ».
- Un message conditionnel bleu marine « Sélectionner une solution numérique pour visualiser la
  dynamique de déploiement » tant que rien n'est choisi, remplacé par
  « Bénéficiaires de la solution *<nom>* en 2024/2025 » ensuite.
- Un calcul d'**année scolaire** : `mois < '09' ? annee-1 : annee`, puis un filtre temporel posé
  à la main sur les deux contextes :
  `parameters['q.timerange.date_des_donnees'] = 'date_des_donnees:[2024-09-01 TO 2025-08-31]'`.
- Un `ods-chart` (`align-month="true"`, `display-legend="false"`, `single-y-axis="true"`) avec
  **deux `ods-chart-query`** distincts sur le même contexte et le même `field-x="date_des_donnees"`
  (`timescale="month"`, `maxpoints="0"`) :
  série 1 `SUM(nombre_d_enseignants)` en `#313178`, label « Professeurs ayant demandé le
  déploiement » ; série 2 `SUM(nombre_d_eleves)` en `#19630A`, label « Eleves bénéficiaires ».
  Suivi d'une **légende SVG écrite à la main** imitant le balisage Highcharts
  (`<g class="highcharts-legend">`, `<rect class="highcharts-legend-box">`, deux traits et deux
  `<text>`) — parce que `display-legend="false"` la supprime et qu'on la voulait quand même,
  sur deux lignes.
- Une **seconde copie intégrale du SVG de France**, même `id="carte1"`, même palette de
  quartiles, colorée cette fois par `SUM(nombre_d_eleves)` (`ods-subaggregation` sur `eleves`),
  titrée « Par département (06/2025) : ».

Le template contient donc **deux `<svg id="carte1">`**, **deux `<lineargradient id="gradient-bleu">`**,
**deux `id="gradient-rouge"`** et **douze `id="indicateur_*"` en double**. Les identifiants ne
sont uniques qu'aujourd'hui, par accident, parce que la seconde moitié n'est jamais rendue.

## Défauts et bizarreries de l'original

1. **Le `ods-timerange` filtre sur la mauvaise colonne, et l'utilisateur ne peut pas le
   savoir.** Le jeu `fr-en-tne_suivi_audiences` a deux champs de type date, `annee` (premier
   dans le schéma) et `mois_saisie`. Faute d'un `audiences-time-field`, ODS retombe sur le
   premier et le dit en console (`Warning: … has more than one date or datetime field, the
   first … will be used`). Vérifié dans le réseau : la requête part avec
   `q=annee:[2020-01-01 TO 2025-12-31]`, jamais `mois_saisie`.
   **Conséquence mesurée** : j'ai saisi « **01 juin 2023** » comme borne basse ; la requête est
   devenue `q=annee:[2023-06-01 TO 2025-12-31]` et **les deux graphiques repartent de janvier
   2024**. `annee` valant `2023-01-01` pour toute l'année 2023, l'année entière tombe hors
   plage. Autrement dit : **un sélecteur au jour près qui filtre à l'année près, et qui
   supprime les sept mois qu'on venait de demander de garder.** Toute date du 2 janvier au
   31 décembre d'une année en efface l'année complète.
2. **Un cinquième de la page a disparu sans un mot.** La section « Détail du déploiement par
   solution numérique » — un `<select>` de solutions, un graphique bi-séries et une carte
   départementale — est effacée du DOM par le `ng-if`, parce que la requête de métadonnées de
   son jeu répond 404. Aucun message, aucun bloc vide, aucune erreur visible : la page a
   simplement l'air plus courte. C'est **le pire des deux mondes** : la mécanique était conçue
   comme un contrôle d'accès (« …autorise »), donc le silence est délibéré ; mais elle est
   devenue un signal de panne, et le silence délibéré empêche de la voir. Le seul indice est
   la requête 404 dans l'onglet réseau. Et rien ne dit à l'utilisateur que les données
   « par solution numérique » n'existent plus nulle part sur le portail.
3. **Une requête sur 503 à chaque chargement.** L'interpolation
   `where="date_de_saisie >= '{{personnelsformesdatemax[0].fields['date_de_saisie']}}-01'"`
   est évaluée avant que `personnelsformesdatemax` ne soit rempli, ce qui envoie
   `where=date_de_saisie >= '-01'`. Le serveur répond **503**, la console une erreur, puis la
   requête est rejouée correctement. Même schéma pour le camembert (analyse lancée une fois
   sans refine, une fois avec) et pour la métadonnée `sort=date_de_saisie&rows=1` demandée
   deux fois à l'identique. **Trois des dix-sept requêtes sont du gaspillage de double passe.**
4. **La carte additionne un mois de trop dès la prochaine mise à jour.** `where=date_de_saisie
   >= '2025-03-01'` sans borne haute, alors que le titre annonce un mois précis. Le camembert
   voisin, lui, utilise `refine.date_de_saisie=2025-03` (correct). **Deux blocs adjacents
   filtrent le même jeu sur la même date par deux mécanismes différents, dont un seul est
   juste.**
5. **Les deux camemberts ignorent 61 % de leur propre total.** 32 688 des 53 491 participants
   sont dans `formes_non_connus` ; les pourcentages 80/20 et 64/36 portent sur 15 362 et
   20 803 personnes. Affichés directement sous le KPI « 53 491 participants », ils se lisent
   inévitablement comme une répartition de ces 53 491.
6. **Quatre dates de référence différentes sur la même page** (06/2025, 03/2025, 02/2025 et à
   nouveau 03/2025), sans qu'un mot n'explique pourquoi les chiffres clés ne sont pas
   contemporains.
7. **Le titre de la carte imprime une date brute** : « pour le mois de **2025-03** », alors que
   les quatre KPI et les deux camemberts affichent « 03/2025 ». Le filtre `moment:'MM/YYYY'` a
   été oublié à cet endroit précis.
8. **La carte est illisible comme carte.** Contours blancs filaires sur aplat orange
   `#ED6947`, tracé simplifié au point de ressembler à une triangulation, aucune frontière
   départementale, 35 fragments littoraux/insulaires anonymes flottant à droite, aucune
   légende, aucun survol. Les seuls éléments porteurs d'information sont douze étiquettes qui
   ne demandaient pas de carte.
9. **La palette de la carte n'informe pas.** Quartiles sur douze valeurs = trois départements
   par couleur quoi qu'il arrive ; la couleur est un rang, pas une grandeur. Elle changerait
   même si toutes les valeurs étaient égales à 1 % près. Et les quatre teintes
   (`#37A2D8`, `#7980E4`, `#BC5FF0`, `#FF3EFD`) ne sont pas des couleurs DSFR, avec du blanc
   gras 13 px sur le plus clair d'entre elles.
10. **Le graphique à deux axes suggère une égalité qui n'existe pas.** 0–300 000 à gauche,
    0–125 000 à droite : les deux courbes se superposent presque, alors que les connexions
    valent 2,7 fois les visiteurs uniques. Sans légende, et avec une infobulle mono-série,
    rien ne rétablit l'échelle.
11. **Rien ne dit que les compteurs sont cumulés.** « Nombre de connexions », « Visiteurs
    uniques sur la plateforme TNE », « Participants aux formations », « Élèves bénéficiaires » :
    tous sont des cumuls depuis 2020, tous sont libellés comme s'il s'agissait du mois indiqué
    entre parenthèses. « 94 383 visiteurs uniques — dernier relevé du mois de 03/2025 » se lit
    « 94 383 visiteurs en mars 2025 ». C'est faux.
12. **Le compteur de visiteurs uniques recule deux fois** (80 549 → 79 166 entre juillet et
    septembre 2024 ; 95 672 → 94 383 entre février et mars 2025), ce qui est impossible pour un
    cumul. La page l'affiche sans commentaire, et c'est même la valeur en recul qui sert de KPI.
13. **Une ligne entièrement vide dans le jeu d'audience** (`mois_saisie = 2024-01`,
    `annee = 2023`, six indicateurs `null`), qui fait cohabiter deux enregistrements pour
    janvier 2024 et rend l'`AVG` de ce mois-là structurellement différent de tous les autres.
14. **Deux contextes sur le même jeu, deux comportements.** Le KPI « visiteurs uniques »
    (contexte `suiviaudience`) et les graphiques (contexte `audiences`) lisent
    `fr-en-tne_suivi_audiences`. Vérifié à l'écran : après avoir ramené la plage à
    2023-06 → 2025-12, les deux graphiques se sont recalculés et **le KPI est resté à 94 383**.
    Le tableau de bord n'a donc pas d'état cohérent : le haut de la page et le bas ne parlent
    pas de la même période.
15. **Le `timerange` par défaut est plus large que les données** (`2020-01-01` → `2025-12-31`
    pour une série qui va de 2020-10 à 2025-03) : il ne filtre rien au chargement, et les deux
    bornes affichées sont des dates auxquelles il n'existe aucune donnée.
16. **Cinq attributs pointant vers cinq contextes fantômes** (`download-`, `queryresult-`,
    `searchnoresult-`, `stats-`, `users-time-field`) : signature d'un copier-coller depuis un
    tableau de bord de monitoring Opendatasoft.
17. **Le template n'est pas du HTML valide** : deux `<svg id="carte1">`, deux
    `id="gradient-bleu"`, deux `id="gradient-rouge"`, douze `id="indicateur_*"` en double. Ils
    ne collisionnent aujourd'hui que parce que la moitié du document n'est jamais rendue —
    si la section 5 revenait, les deux cartes partageraient leurs dégradés.
18. **Une règle CSS morte** : `.personnelsformescamemberts { padding-top: 15px }` — la classe
    posée dans le HTML est `personnelsformescamembert`, sans `s`.
19. **Une variable de scope utilisée à la place de la sienne** : le bloc carte calcule
    `datesaisiecarte` puis écrit `personnelsformescarte.parameters['refine.date_de_saisie'] =
    datesaisie` — la variable du bloc camembert. Sans conséquence (même valeur), mais le bloc
    dépend silencieusement de l'ordre de rendu de son voisin.
20. **Une légende Highcharts recopiée à la main en SVG** dans la section 5, pour contourner le
    `display-legend="false"` posé sur le même graphique. Deux `<g class="highcharts-legend">`
    écrits en dur, avec les couleurs répétées une seconde fois.
21. **Deux libellés pour le même département** entre deux jeux de la même famille :
    `Corse` / `20` dans le jeu de déploiement, `Corse-du-Sud` dans celui des formations. Toute
    jointure entre les deux échoue sur cette ligne.
22. **`nombre_de_repondants` n'est jamais affiché.** « 83,3 % de professeurs satisfaits »
    repose sur **75 réponses**, à côté d'un « 2 435 461 élèves bénéficiaires ». Les deux
    chiffres ont la même taille de police.
23. **Le pourcentage de satisfaction n'a pas d'espace insécable** avant `%` (`{{…}}%` collé
    dans le template) — « 83,3% », contraire à la typographie française et au DSFR.
24. **Accessibilité de la carte** : le SVG n'a ni `role`, ni `<title>`, ni `<desc>`, ni
    `aria-label`. Ses textes sont bien lus, mais dans l'ordre du document : **les douze noms de
    département d'abord, puis les douze valeurs**, sans appariement (relevé exact via
    `get_page_text` : « CORSE DU SUD / GUADELOUPE / … / FINISTÈRE / 3082 / 3331 / 3398 / 5212 /
    13811 / … »). Un lecteur d'écran entend douze noms puis douze nombres dans un ordre
    différent.
25. **Aucun export, aucun tableau, aucune URL partageable.** Pas d'`urlsync` : la plage de
    dates choisie ne se retrouve pas dans l'URL. Pas de CSV. Les quatre liens « Source »
    renvoient vers la page d'exploration du jeu, ce qui est le minimum et le maximum.
26. **La page ne se sait pas incomplète.** Elle ne mentionne nulle part qu'elle a perdu un
    bloc, ni que quatre jeux TNE publiés depuis (dont
    `fr-en-tne_duree_formations_par_departement_secteur_type_etablissement`, 438 lignes, qui
    double la structure du jeu qu'elle exploite) existent au catalogue.

## Transposition vers `dsfr-data`

Attributs vérifiés dans les fiches générées depuis le source
(`get_skill(dsfrDataSource | dsfrDataQuery | dsfrDataChart | dsfrDataKpi | dsfrDataContext |
dsfrDataContextFilter | dsfrDataA11y, "reference")`, `get_skill(chartTypes|attributeGrammars,
"guide")`). Tout ce qui n'a pas été vérifié est marqué **non vérifié**.

**Architecture retenue.** Les cinq jeux pèsent 6, 12, 50 et 460 lignes. **Tout tient côté
client, très largement** : 528 lignes au total, quatre requêtes, aucun `server-side`, aucune
pagination, aucun `max-records` à relever (le défaut de 1 000 de l'adaptateur ODS couvre le
plus gros jeu par un facteur 2). **Invoquer une limite de performance sur cette page serait
faux** — et il n'y a rien à chronométrer : le portail répond en anonyme (vérifié en curl, 200),
donc pas de clé, pas de préflight, quatre `fetch` parallèles de quelques dizaines de kilo-octets.
C'est le cas où le modèle « une source par jeu, des `dsfr-data-query` pour les agrégats » est
strictement plus simple que le modèle ODS à contextes.

| Original Opendatasoft | `dsfr-data` | Attributs nécessaires |
|---|---|---|
| `<div ods-dataset-context context="deploiement" …-dataset="…_dept" …-parameters="{'sort':'-date_des_donnees'}">` | `<dsfr-data-source id="deploiement">` | `api-type="opendatasoft"`, `base-url="https://data.education.gouv.fr"`, `dataset-id="fr-en-tne_suivi_deploiement_solutions_numeriques_dept"`, `order-by="-date_des_donnees"`. **Pas d'`api-key-ref`** : le portail répond en anonyme. |
| idem pour `satisfaction`, `suiviaudience` / `audiences`, `personnelsformes` | trois autres `<dsfr-data-source>` | 12, 6, 50 et 460 lignes : `max-records` inutile (défaut 1 000). Les contextes `suiviaudience` **et** `audiences` fusionnent en **une seule** source — c'est le doublon n° 14 supprimé par construction. |
| `ods-adv-analysis-group-by="date_des_donnees" -select="date_des_donnees, sum(nombre_d_eleves) as nb_elv" -order-by="-date_des_donnees" -limit="1"` (KPI 1) | `<dsfr-data-query>` + `<dsfr-data-kpi>` | `group-by="date_des_donnees"`, `aggregate="nombre_d_eleves:sum"`, `order-by="date_des_donnees:desc"`, `limit="1"` puis `value="nombre_d_eleves__sum:max"`. **Attention au piège maison** : un KPI `count` sur une query `limit` compte la limite (PG-017) ; ici on lit une somme, pas un compte. |
| `ods-results="audiencedatemax" -max="1"` + `{{…fields['nombre_de_visiteurs_uniques…']|number}}` (KPI 2) | `<dsfr-data-kpi>` | `value="nombre_de_visiteurs_uniques_a_la_plateforme_tne:max"` sur la source d'audience — plus simple et plus honnête que « la première ligne du tri », puisque la série est cumulative. `format="nombre"`. |
| `{{satisfactionmax[0].fields['contenu'] | number:1}}%` (KPI 3) | `<dsfr-data-kpi>` | `value="contenu:max"` (ou `:last` derrière un `order-by`), `format="pourcentage"`, `decimals="1"` — l'espace insécable et le `%` viennent du format, ce qui corrige le défaut n° 23. |
| `ods-adv-analysis` sur `date_de_saisie as x_axis` / `(sum(nombre_total_de_participants)) as y_axis` (KPI 4) | `<dsfr-data-query>` + `<dsfr-data-kpi>` | `group-by="date_de_saisie"`, `aggregate="nombre_total_de_participants:sum"`, `order-by="date_de_saisie:desc"`, `limit="1"`, KPI `value="nombre_total_de_participants__sum:max"`. |
| Les trois cartes KPI en ligne + les quatre liens « Source » | `<dsfr-data-kpi-group>` | `col="4"` par KPI ; `heading`, `label`, `description`, `icon` sur chacun. Le lien « Source » n'a pas d'équivalent d'attribut : le poser en `<p class="fr-text--xs">` sous le groupe, ou passer par la DataBox d'un `dsfr-data-chart` (`databox-source`) là où il y a un graphique. **Non vérifié** sur `dsfr-data-kpi` : aucun attribut de source dans sa référence. |
| Deux camemberts SVG faits main (`<circle>` + `stroke-dasharray` + gradients) | `<dsfr-data-chart type="pie">` × 2 | `label-field`, `value-field`, `fill` (true = plein, false = anneau), `selected-palette`, `name`, `databox-date="Mars 2025"`. La donnée est en **format large** (une colonne par catégorie) : il faut la retourner d'abord — voir « points durs » n° 2. |
| `ods-analysis-serie-*` (4 séries `SUM(…)`) qui alimentent les camemberts | `<dsfr-data-unpivot>` + `<dsfr-data-query>` | `dsfr-data-unpivot value-cols="etablissement_1er_degre:Premier degré, etablissement_2nd_degre:Second degré"` (grammaire d'alias `champ:Libellé` confirmée par `attributeGrammars`), puis `group-by` + `aggregate:sum`. **Non vérifié** : je n'ai pas lu la référence de `dsfr-data-unpivot`, seulement la mention de sa grammaire d'alias dans `attributeGrammars`. |
| SVG Inkscape statique colorié par quartiles | `<dsfr-data-chart type="map">` | `code-field` (**code INSEE**, `01`–`95`, `2A`, `2B`, `971`–`976`), `value-field`, `selected-palette="sequentialAscending"` (recommandation de `chartTypes`), `name`, `databox-title`, `databox-date-field`. C'est **le remplacement le plus net de toute la page** : une balise contre 17 000 caractères de SVG, avec une légende, des infobulles et une échelle continue plutôt que quatre rangs. Point dur n° 1 ci-dessous : le jeu ne porte pas de code INSEE. |
| `ods-subaggregation-serie-quartile*` + cascade de ternaires | *rien* | La discrétisation est interne à `map` ; il n'y a rien à écrire. |
| `<ods-timerange context="audiences" precision="day" default-from default-to>` | `<dsfr-data-context>` + `<dsfr-data-context-filter operator="between">` + deux `<input type="date">` | `sources="audiences personnelsformes deploiement satisfaction"` (**ids séparés par des espaces** — c'est la réponse au « filtre commun multi-sources »), `field="mois_saisie"` (nommé explicitement : le défaut n° 1 devient impossible), `operator="between"`, `ui="tne-du tne-au"` (**deux ids pour `between`**), `label="Période"`. Ajouter `url-sync` pour l'état partageable que l'original n'a pas. |
| — (absent) | `<dsfr-data-context-tags>` | Rappel supprimable de la période active. Sa référence lui donne `for` = id d'un `dsfr-data-context` — ici on en a un, donc c'est utilisable, contrairement au cas IPS. **Non vérifié à l'écran.** |
| `ods-chart` bi-séries, deux axes Y (graphique 1) | `<dsfr-data-chart type="line">` | `label-field="mois_saisie"`, `value-field="nombre_de_connexion_a_la_plateforme_tne:Connexions"`, `value-field-2="nombre_de_visiteurs_uniques_a_la_plateforme_tne:Visiteurs uniques"` (alias inline `champ:Libellé`, #668), `y-min="0"`, `unit-tooltip`. **Il n'existe pas d'attribut de second axe Y** dans la référence : un seul axe, ce qui **corrige** le défaut n° 10 au lieu de le reproduire. |
| `ods-chart` mono-série (graphique 2) | `<dsfr-data-chart type="line">` | `label-field="mois_saisie"`, `value-field="duree_moyenne_d_une_visite_sur_la_plateforme_tne:Durée moyenne"`, `unit-tooltip="min"` (corrige l'infobulle sans unité), `y-min="0"`. |
| `function-y="AVG"` + `timescale="month"` | `<dsfr-data-query>` | `group-by="mois_saisie"`, `aggregate="…:avg"` — ou **rien du tout** : le jeu a déjà une ligne par mois. Ne pas transposer une agrégation qui n'agrège rien. |
| La ligne vide de 2024-01 | `<dsfr-data-source where>` | `where="nombre_de_connexion_a_la_plateforme_tne is not null"` (dialecte ODSQL sur la source, cf. `attributeGrammars` § valeurs nulles) — un `where` sur la balise déjà présente, pas un composant de plus (PG-015). |
| `ng-if="deploiementsolutionsdetailleautorise"` (section 5) | **rien** | Le jeu n'existe plus et ses trois successeurs ne portent ni `nom_sne` ni série mensuelle. La section n'est pas transposable ; elle est remplacée par un encadré qui **le dit** (voir points durs n° 5). |
| Quatre liens « Source » | `<dsfr-data-chart databox-source>` / `<dsfr-data-a11y>` | `databox`, `databox-source="Réseau Canopé — TNE, 2025"`, `databox-download`, `databox-date`. Et un `<dsfr-data-a11y table download>` par graphique : le tableau et le CSV que l'original n'a nulle part. |

### Esquisse de code

```html
<!-- 4 jeux, 528 lignes au total : tout côté client, pas de server-side, pas de clé.
     Le portail éducation répond en anonyme (200 vérifié en curl). -->
<dsfr-data-source id="deploiement"
  api-type="opendatasoft" base-url="https://data.education.gouv.fr"
  dataset-id="fr-en-tne_suivi_deploiement_solutions_numeriques_dept"
  order-by="-date_des_donnees"></dsfr-data-source>

<dsfr-data-source id="satisfaction"
  api-type="opendatasoft" base-url="https://data.education.gouv.fr"
  dataset-id="fr-en-tne_indicateurs_satisfaction_formations"
  order-by="-mois_concerne"></dsfr-data-source>

<!-- Une seule source pour le KPI ET les graphiques : le doublon suiviaudience/audiences
     de l'original disparaît, et le KPI suit désormais la période choisie.
     La ligne 2024-01 entièrement nulle est écartée à la source. -->
<dsfr-data-source id="audiences"
  api-type="opendatasoft" base-url="https://data.education.gouv.fr"
  dataset-id="fr-en-tne_suivi_audiences"
  where="nombre_de_connexion_a_la_plateforme_tne is not null"
  order-by="mois_saisie"></dsfr-data-source>

<dsfr-data-source id="formes"
  api-type="opendatasoft" base-url="https://data.education.gouv.fr"
  dataset-id="fr-en-tne_personnels_formes_par_departement_secteur_type_etablissement"
  order-by="date_de_saisie"></dsfr-data-source>

<div class="fr-container fr-mt-6w">
  <h1>Territoires numériques éducatifs</h1>
  <p class="fr-text--lead">
    Douze départements — Aisne et Val d'Oise depuis la rentrée 2020, dix autres depuis 2021.
    Tous les chiffres de cette page sont des <strong>cumuls depuis le lancement</strong>,
    arrêtés au mois indiqué. <!-- corrige le défaut n° 11 -->
  </p>

  <!-- ============ Chiffres clés ============ -->
  <h2 class="fr-h4">Chiffres clés</h2>

  <dsfr-data-query id="deploiement-dernier" source="deploiement"
    group-by="date_des_donnees" aggregate="nombre_d_eleves:sum, nombre_d_enseignants:sum"
    order-by="date_des_donnees:desc" limit="1"></dsfr-data-query>
  <dsfr-data-query id="formes-dernier" source="formes"
    group-by="date_de_saisie" aggregate="nombre_total_de_participants:sum"
    order-by="date_de_saisie:desc" limit="1"></dsfr-data-query>

  <dsfr-data-kpi-group>
    <dsfr-data-kpi col="3" source="deploiement-dernier"
      value="nombre_d_eleves__sum:max" format="compact"
      heading="Juin 2025" label="élèves bénéficiaires d'une solution numérique"
      description="Cumul sur les douze départements TNE, dernier relevé de juin 2025."
      icon="ri-computer-line"></dsfr-data-kpi>

    <dsfr-data-kpi col="3" source="formes-dernier"
      value="nombre_total_de_participants__sum:max" format="nombre"
      heading="Mars 2025" label="participants aux formations (cumul)"
      icon="ri-team-line"></dsfr-data-kpi>

    <!-- Suit désormais la période du filtre commun (voir dsfr-data-context plus bas). -->
    <dsfr-data-kpi col="3" source="audiences"
      value="nombre_de_visiteurs_uniques_a_la_plateforme_tne:max" format="nombre"
      heading="Plateforme TNE" label="visiteurs uniques (cumul)"
      icon="ri-user-line"></dsfr-data-kpi>

    <!-- lines : le nombre de répondants, que l'original cache (défaut n° 22). -->
    <dsfr-data-kpi col="3" source="satisfaction"
      value="contenu:max" format="pourcentage" decimals="1"
      heading="Février 2025" label="satisfaits du contenu des formations"
      lines='[{"value":"nombre_de_repondants:max","suffix":"répondants"}]'
      icon="ri-thumb-up-line"></dsfr-data-kpi>
  </dsfr-data-kpi-group>

  <!-- ============ Formation des personnels ============ -->
  <h2 class="fr-h4">Formation des personnels</h2>

  <!-- La carte : une balise contre 17 000 caractères de SVG Inkscape.
       code-field attend un code INSEE ; le jeu n'a que le nom du département,
       d'où le mapping explicite (voir « Limites », point 1). -->
  <dsfr-data-query id="formes-mars" source="formes"
    where="date_de_saisie:eq:2025-03-01"
    group-by="departement" aggregate="nombre_total_de_participants:sum"></dsfr-data-query>
  <dsfr-data-normalize id="formes-mars-code" source="formes-mars"
    replace-fields="departement:Aisne=02, departement:Bouches-du-Rhône=13, …"></dsfr-data-normalize>
  <!--  ↑ NON VÉRIFIÉ : je n'ai pas lu la référence de dsfr-data-normalize replace-fields ;
        l'apostrophe de « Val d'Oise » et le tiret de « Bouches-du-Rhône » sont à tester.
        Voie de repli documentée au point 1 des limites. -->

  <dsfr-data-chart id="carte-formes" source="formes-mars-code" type="map"
    code-field="departement" value-field="nombre_total_de_participants__sum"
    name="Participants aux formations" selected-palette="sequentialAscending"
    databox databox-title="Formation des professeurs par département"
    databox-date="Mars 2025" databox-source="Réseau Canopé"
    databox-download heading-level="3"></dsfr-data-chart>
  <dsfr-data-a11y source="formes-mars-code" for="carte-formes" table download
    filename="tne-formations-par-departement-2025-03.csv"
    label="Participants aux formations par département, mars 2025"
    label-field="departement" value-field="nombre_total_de_participants__sum"></dsfr-data-a11y>

  <!-- Les deux camemberts. La donnée est « large » : une colonne par catégorie.
       On la déplie avant de la tracer (voir « Limites », point 2). -->
  <dsfr-data-unpivot id="degre" source="formes-mars"
    id-cols="departement"
    value-cols="etablissement_1er_degre:Premier degré, etablissement_2nd_degre:Second degré">
  </dsfr-data-unpivot>
  <!--  ↑ NON VÉRIFIÉ : grammaire d'alias `champ:Libellé` confirmée par attributeGrammars,
        mais je n'ai pas lu la référence complète de dsfr-data-unpivot (id-cols notamment). -->
  <dsfr-data-query id="degre-total" source="degre"
    group-by="variable" aggregate="valeur:sum"></dsfr-data-query>
  <dsfr-data-chart id="pie-degre" source="degre-total" type="pie"
    label-field="variable" value-field="valeur__sum" name="Participants"
    databox databox-title="Professeurs formés, par degré"
    databox-date="Mars 2025"></dsfr-data-chart>
  <p class="fr-text--xs fr-hint-text">
    Sur 53 491 participants, 32 688 n'ont pas de degré renseigné et ne sont pas comptés ici :
    cette répartition porte sur 15 362 personnes. <!-- corrige le défaut n° 5 -->
  </p>

  <!-- ============ Audiences ============ -->
  <h2 class="fr-h4">Audiences de la plateforme TNE</h2>

  <!-- LE point de la page : un filtre commun, explicite sur son champ, multi-sources. -->
  <div class="fr-grid-row fr-grid-row--gutters fr-mb-2w">
    <div class="fr-col-12 fr-col-md-3">
      <label class="fr-label" for="tne-du">Du</label>
      <input class="fr-input" type="date" id="tne-du" value="2020-10-01">
    </div>
    <div class="fr-col-12 fr-col-md-3">
      <label class="fr-label" for="tne-au">au</label>
      <input class="fr-input" type="date" id="tne-au" value="2025-03-01">
    </div>
  </div>
  <dsfr-data-context sources="audiences formes" url-sync>
    <dsfr-data-context-filter field="mois_saisie" operator="between"
      apply-to="audiences" ui="tne-du tne-au" label="Période"></dsfr-data-context-filter>
    <dsfr-data-context-filter field="date_de_saisie" operator="between"
      apply-to="formes" ui="tne-du tne-au" label="Période"></dsfr-data-context-filter>
  </dsfr-data-context>
  <dsfr-data-context-tags for="…"></dsfr-data-context-tags>
  <!--  ↑ `for` = id d'un dsfr-data-context (référence) : donner un id au contexte ci-dessus. -->

  <div class="fr-grid-row fr-grid-row--gutters">
    <div class="fr-col-12 fr-col-md-6">
      <!-- Un seul axe Y : pas d'attribut de second axe dans la référence,
           et c'est tant mieux (défaut n° 10). -->
      <dsfr-data-chart id="ch-audience" source="audiences" type="line"
        label-field="mois_saisie"
        value-field="nombre_de_connexion_a_la_plateforme_tne:Connexions (cumul)"
        value-field-2="nombre_de_visiteurs_uniques_a_la_plateforme_tne:Visiteurs uniques (cumul)"
        y-min="0" databox databox-title="Connexions et visiteurs uniques"
        databox-source="Réseau Canopé" databox-download heading-level="3"></dsfr-data-chart>
      <dsfr-data-a11y source="audiences" for="ch-audience" table download
        filename="tne-audience.csv" label-field="mois_saisie"
        value-field="nombre_de_connexion_a_la_plateforme_tne, nombre_de_visiteurs_uniques_a_la_plateforme_tne">
      </dsfr-data-a11y>
    </div>
    <div class="fr-col-12 fr-col-md-6">
      <dsfr-data-chart id="ch-duree" source="audiences" type="line"
        label-field="mois_saisie"
        value-field="duree_moyenne_d_une_visite_sur_la_plateforme_tne:Durée moyenne"
        unit-tooltip="min" y-min="0"
        databox databox-title="Durée moyenne d'une visite"
        databox-source="Réseau Canopé" heading-level="3"></dsfr-data-chart>
    </div>
  </div>

  <!-- ============ Ce que la page ne peut plus montrer ============ -->
  <div class="fr-callout fr-mt-4w">
    <h3 class="fr-callout__title">Le détail par solution numérique n'est plus publié</h3>
    <p class="fr-callout__text">
      Le jeu <code>fr-en-tne_suivi_deploiement_solutions_numeriques_par_solution_et_dept</code>
      n'existe plus au catalogue. Les trois jeux qui lui ont succédé
      (1<sup>er</sup> degré, 2<sup>nd</sup> degré, préparation de la classe et école inclusive)
      ne portent ni le nom de la solution, ni de série mensuelle, et publient tous les trois
      le même total tous degrés confondus. Le bloc correspondant a donc été retiré,
      et non masqué. <!-- corrige le défaut n° 2 -->
    </p>
  </div>
</div>
```

## Limites et points durs identifiés

1. **`type="map"` demande un code INSEE, le jeu n'a que le nom du département.**
   *Obstacle* : `chartTypes` est explicite — `code-field` attend « code INSEE : 01-95, 2A, 2B,
   971-976 ». `fr-en-tne_personnels_formes_…` n'a que `departement` (texte, avec accents et
   apostrophes), et l'autre jeu TNE code la Corse `"20"`, qui n'est pas un code INSEE valide
   (2A / 2B). *Voie native essayée* : `dsfr-data-join` sur `departement` avec un petit
   référentiel local nom → code — la fiche `attributeGrammars` § « clés de jointure » prévient
   que la comparaison est faite en chaîne sans trim, donc « Val d'Oise » (sans tiret, tel quel
   dans le jeu) doit être écrit à l'identique dans le référentiel. *Contournement envisagé* :
   `dsfr-data-normalize replace-fields`, mais le piège maison AM-038 rappelle que sa grammaire
   réserve le `:` et fait une comparaison stricte sans regex — à tester sur douze valeurs
   accentuées. **Non vérifié au navigateur.** Douze départements : dans le pire des cas, un
   `dsfr-data-source data='[…]'` inline de douze paires et un `dsfr-data-join`.
   *À noter* : ce n'est **pas** une limite de `dsfr-data`, c'est une lacune du jeu — que
   l'original contourne, lui, en écrivant les douze noms **en dur dans son SVG**.
2. **Les camemberts partent d'une donnée « large ».** Le jeu a une colonne par catégorie
   (`etablissement_1er_degre`, `etablissement_2nd_degre`, `profil_stagiaire_enseignant`,
   `profil_stagiaire_formateurs_cadres_personnel_de_l_en`), alors qu'un `type="pie"` veut
   `label-field` + `value-field`, c'est-à-dire une ligne par catégorie. *Voie native* :
   `dsfr-data-unpivot`, dont c'est exactement l'objet (« bascule un tableau wide en long/tidy »)
   et dont `attributeGrammars` confirme la grammaire d'alias `value-cols="champ:Libellé"`.
   **Non vérifié** : je n'ai pas lu la référence complète du composant (noms exacts de
   `id-cols` / des colonnes produites). C'est le seul endroit où la transposition ajoute une
   balise que l'original n'a pas — et l'original s'en dispense en écrivant l'arithmétique à la
   main dans une expression Angular de six lignes.
3. **Le KPI « satisfaction » et le tri sur la dernière ligne.** L'original prend
   « la première ligne du tri » (`ods-results-max="1"`). En `dsfr-data`, la grammaire
   `champ:fn` d'un KPI n'a pas de `:last-by`. `value="contenu:max"` donne **le taux le plus
   élevé des six mois** (93,42 % en 2024-10), pas le plus récent (83,33 %). *Voie native
   retenue* : un `dsfr-data-query order-by="mois_concerne:desc" limit="1"` en amont, puis
   `value="contenu:max"` sur une source qui ne contient plus qu'une ligne — même schéma que
   le piège maison « `select=count(*)` sans `group_by` : mettre `limit="1"` et lire en `:max` ».
   `:last` existe (mentionné dans `attributeGrammars` § format date) mais **je n'ai pas vérifié
   son comportement derrière un `order-by`** : la voie `limit="1"` + `:max` est celle que
   l'esquisse retient parce qu'elle est déterministe.
4. **Le second axe Y n'existe pas — et c'est le bon choix.** La référence de
   `dsfr-data-chart` n'a que `y-min` / `y-max`, un seul jeu de bornes. Reproduire le graphique
   1 à l'identique est donc impossible. **Ce n'est pas une limite à remonter** : les deux
   séries sont dans la même unité (des personnes) et dans un rapport de 2,7 ; le double axe de
   l'original *fabrique* une illusion d'égalité. Un axe unique de 0 à 260 000 montre la vérité.
   Si un jour deux unités réellement différentes devaient cohabiter, `type="bar-line"`
   (`value-field` en barres, `value-field-2` en ligne, `unit-tooltip` / `unit-tooltip-bar`)
   est la réponse documentée.
5. **La section perdue ne se transpose pas, et il faut le dire.** Le jeu 404 portait la seule
   dimension « solution numérique » du tableau de bord. Ses trois successeurs ne la portent pas
   et sont, de surcroît, trois copies du même total. *Décision* : ne pas simuler le bloc, ne
   pas le masquer non plus — un `fr-callout` qui nomme le jeu disparu, ses successeurs et ce
   qu'ils ne remplacent pas. C'est le contraire exact du `ng-if` de l'original, et c'est le
   livrable de cette page : **une absence documentée vaut mieux qu'une absence silencieuse.**
6. **Le filtre commun multi-sources : c'est `dsfr-data-context`, et il fait mieux que
   l'original.** *Obstacle apparent* : `ods-timerange` est un widget unique branché sur un
   contexte. *Voie native, vérifiée dans la référence* : `<dsfr-data-context sources="a b c">`
   (ids séparés par des **espaces**) diffuse une clause `where` à chaque source, fusionnée en
   `AND` avec un `whereKey` stable ; `<dsfr-data-context-filter operator="between" ui="idMin idMax">`
   prend **deux ids d'UI** et produit la plage. Trois différences en faveur de `dsfr-data` :
   (a) `field` est **obligatoire et explicite** — le bug n° 1 de l'original, où ODS devine la
   colonne, ne peut pas se produire ; (b) `apply-to` permet de viser des colonnes différentes
   par source (`mois_saisie` ici, `date_de_saisie` là), ce que le `<contexte>-time-field`
   d'ODS fait aussi mais que la page a raté ; (c) `url-sync` donne l'état partageable que
   l'original n'a pas. **Piège maison à ne pas confondre** : la mise en garde AM-029 vise
   `year-of` / `month-of` (qui lisent « AAAA » et « AAAA-MM » et rendent un filtre
   silencieusement absent si on leur donne une date complète) — la référence précise d'ailleurs
   qu'ils **tronquent** désormais une date plus précise (#646). Ici l'opérateur est `between`,
   qui prend deux dates complètes : le piège ne s'applique pas. **Non vérifié au navigateur** :
   le comportement de `between` sur un champ ODS de type `date` sans composante horaire.
7. **Faut-il un `dsfr-data-context` pour la période, ou un `where` par source ?**
   Trois des quatre jeux ont un champ de date différent (`date_des_donnees`, `mois_concerne`,
   `mois_saisie`, `date_de_saisie`) et deux d'entre eux n'ont **qu'une seule date** (le jeu de
   déploiement) ou **six mois** (satisfaction). Filtrer ceux-là par une plage vide les vide
   entièrement. *Arbitrage retenu* : le contexte ne pilote que les deux jeux qui ont une vraie
   série (`audiences` et `formes`) ; les deux KPI adossés à un instantané restent hors filtre
   et **affichent leur date dans leur `heading`**. C'est la même décision que l'original
   (le timerange ne pilote que la section 4), mais assumée et lisible, au lieu d'être le
   sous-produit d'un contexte dupliqué.
8. **Aucune limite de performance à invoquer, et rien à chronométrer.** 12 + 6 + 50 + 460 =
   **528 lignes**, quatre requêtes, sous le plafond par défaut de l'adaptateur ODS (1 000).
   Pas de `server-side`, pas de `server-facets`, pas de `max-records`, pas de `bbox`, pas de
   `/exports/json`. Toute la machinerie d'arbitrage architectural du lot IPS est **hors sujet
   ici** : si une critique de performance apparaissait dans l'analyse de cette page, elle
   serait fausse. La seule mesure qui compte a d'ailleurs été faite sur l'original, et elle est
   à sa charge : **17 requêtes dont une en 404, une en 503 et trois en double**, pour 528
   lignes de données.
9. **Ce qui ne se transpose pas, et n'a pas à l'être.**
   - Le dessin Inkscape de la France : `type="map"` fait la même chose en mieux, avec une
     légende et des infobulles. Écart assumé, pas manque.
   - La légende Highcharts recopiée en SVG : elle n'existait que pour contourner un attribut
     posé par erreur.
   - Le sélecteur d'heure « 00:00 » du datepicker ODS sur une série mensuelle : sans objet.
   - Les gradients SVG des camemberts : `selected-palette` fait le travail, et les couleurs
     sont alors celles du DSFR.

## Données à reproduire fidèlement

- [ ] **Quatre KPI**, avec **leur date propre affichée** : élèves bénéficiaires
      **2 435 461** (06/2025), participants aux formations **53 491** (03/2025), visiteurs
      uniques **94 383** (03/2025), satisfaction contenu **83,3 %** (02/2025).
- [ ] Dire que **tous** ces chiffres sont des **cumuls depuis 2020**, ce que l'original ne dit
      jamais.
- [ ] Afficher le **nombre de répondants** de l'enquête satisfaction (**75** en 02/2025 ;
      38 à 75 selon le mois).
- [ ] **Répartition 1er / 2nd degré : 80 % / 20 %** (12 363 / 2 999) et
      **professeurs / autres personnels : 64 % / 36 %** (13 350 / 7 453), **avec la mention
      des 32 688 « formés non connus » exclus** (61 % du total).
- [ ] **Les douze valeurs départementales de mars 2025**, somme **53 491** : Aisne 13 811 ·
      Bouches-du-Rhône 9 543 · Val d'Oise 5 212 · Hérault 4 569 · Isère 3 835 · Vienne 3 398 ·
      Finistère 3 331 · Cher 3 082 · Guadeloupe 2 581 · Doubs 2 171 · Vosges 1 024 ·
      Corse-du-Sud 934. **Une échelle continue, pas quatre rangs.**
- [ ] **Série d'audience : 49 mois** de 2020-10 à 2025-03, la ligne vide de 2024-01 **écartée**,
      les mois manquants (2020-11, août 2021 à 2024) **visibles comme manquants** et non
      interpolés en ligne droite.
- [ ] Connexions **255 998**, pages vues **1 479 500**, durée moyenne **4,98 min** au dernier
      mois ; pic de durée **7,58 min** en 04/2023, creux **2,83 min** en 12/2020.
- [ ] **Un seul axe Y** sur le graphique connexions / visiteurs, et une **légende**.
- [ ] Infobulle **avec unité** sur la durée (« 5,17 min », pas « 5,17 »).
- [ ] Le filtre de période doit **nommer sa colonne** (`mois_saisie`) et **piloter aussi le
      KPI** qui lit le même jeu — c'est le test qui distingue une reproduction d'un décalque.
- [ ] Une **URL partageable** (`url-sync`), un **tableau accessible** et un **CSV** par
      graphique : trois choses que l'original n'a nulle part.
- [ ] Un encadré nommant le **jeu disparu**, ses **trois successeurs** et le fait qu'ils
      publient tous **le même total** — l'honnêteté que le `ng-if` supprime.
- [ ] Le lien eduscol et le chapô, qui sont la meilleure partie de l'original.

## Ce que cette page apprend au banc d'essai

C'est **la seule page multi-sources du portail Éducation** (les quatorze autres sont
mono-jeu), et elle éclaire trois choses qu'aucune page IPS ne pouvait montrer :

1. **Le modèle ODS force la duplication de contextes ; `dsfr-data` ne la force pas.**
   Six `ods-dataset-context` pour cinq jeux, dont deux sur le même jeu avec des tris opposés,
   parce qu'un contexte porte à la fois *la connexion*, *le tri* et *l'état des filtres*. Le
   coût est visible à l'écran : le KPI et le graphique du même jeu divergent dès qu'on touche
   au filtre. Dans `dsfr-data`, la source porte la connexion, la query porte l'agrégation et
   le contexte porte le filtre — les trois axes sont séparés, donc une source unique peut
   alimenter un KPI et deux graphiques qui restent d'accord entre eux.
2. **Le filtre transverse multi-sources est un composant, pas un bricolage.**
   `dsfr-data-context sources="a b c"` avec un `dsfr-data-context-filter field=… operator="between"`
   est l'équivalent direct de l'`ods-timerange`, avec le champ nommé explicitement. Le bug le
   plus coûteux de la page originale — un sélecteur au jour qui filtre à l'année, sur une
   colonne devinée — est **structurellement impossible** de ce côté-là, parce que `field` est
   obligatoire.
3. **La question « est-ce la bibliothèque ou la transposition ? » se règle ici en faveur de la
   bibliothèque, deux fois.** Le SVG Inkscape de 17 000 caractères devient
   `<dsfr-data-chart type="map">` ; le second axe Y qui n'existe pas est exactement ce qu'il
   fallait supprimer. La seule vraie difficulté de portage — le code INSEE absent du jeu —
   **n'est pas une limite de `dsfr-data`** : c'est une lacune de la donnée que l'original
   contourne en écrivant douze noms de département en dur dans un fichier Inkscape.
