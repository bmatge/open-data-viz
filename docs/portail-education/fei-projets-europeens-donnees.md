# France Éducation international — Sélection de projets européens portant sur les données

- **URL du catalogue** : https://data.education.gouv.fr/explore/assets/fei-selection-des-projets-internationaux-portant-sur-les-donnees/view/
  → **200 direct, aucune redirection** (`curl -sIL` : une seule URL effective).
- **Id catalogue** : 1 · **Thématique** : `Éducation` (**avec accent** — les entrées 4 et 5 du même
  catalogue portent `Education` sans accent ; la facette du catalogue est donc scindée en deux).
  Pas de sous-thématique, pas de filtre. Vignette `fei_iteratie_donnees.jpg` (le nom du fichier
  contient déjà une coquille : *iteratie*). C'est la dataviz **en tête du catalogue**.
- **Relevé visuel** : 2026-09-10, Chrome (extension), viewport 1568 × 751 CSS px.
- **Producteur** : France Éducation international, en partenariat avec l'IIPE-UNESCO.

## ⚠️ Ce n'est PAS une page Studio

Le brief supposait une page ODS Studio interrogeable à `/api/portal/v1.0/studio_pages/<slug>`.
**Vérifié : faux.** Les trois URL en `/explore/assets/<slug>/view/` de ce lot renvoient
`{"message":"Pas trouvé.","error_code":"not_found"}` sur cet endpoint, et le slug n'apparaît pas
dans la liste des 23 pages Studio du portail (`/api/portal/v1.0/studio_pages?limit=100`).
Le slug n'est pas non plus un jeu de données (`/catalog/datasets/<slug>` → 404).

Ce sont des **pages AngularJS `/pages/<slug>/` classiques, servies sous une URL `/explore/assets/…`** :
le HTML porte `<link rel="canonical" href="https://data.education.gouv.fr/pages/<slug>/">` et
`$scope.blocks` est présent. La méthode de `_METHODE.md` § « Comment récupérer la source d'une page
`/pages/<slug>/` » s'applique donc telle quelle.

**Deux niveaux d'échappement** : `$scope.blocks` est un JSON dont la valeur `html` est en plus
échappée en entités HTML (`&lt;`, `&quot;`, `&#x27;`, et `&amp;#39;` pour un `&#39;` littéral).
Décoder en **une seule passe** (une passe `&amp;`→`&` en dernier ré-introduit des entités).
Template désechappé archivé dans `_sources/fei-selection-des-projets-internationaux-portant-sur-les-donnees.html`
(169 378 c.), CSS dans `.css` (18 657 c.). **Pas de `.studio.json` : il n'y en a pas.**

## Jeu de données — un seul

`fr-en-initiatives_donnees_europe` — **44 lignes**, 13 champs, `visibility: domain`,
features `['analyze']` (pas de `geo`), licence **Licence Ouverte v2.0 (Etalab)**,
`modified` 2026-08-27. Titre au catalogue : **`fr-en-initiatives_donnees_europe`** — le champ
`title` n'a jamais été rempli, le jeu s'affiche sous son identifiant technique.
API ouverte, `q`/`facet` accessibles en v1 comme en v2.1.

| Champ | Type | Multivalué | Vides | Remarque |
|---|---|---|---|---|
| `initiative_projet` | text | non | 0 | titre + années entre parenthèses, pas de champ date séparé |
| `pays` | text **facetté multivalué** | oui (`,`) | 0 | **36 valeurs distinctes** |
| `type_de_projet_national_europeen` | text facetté | non | 0 | `européen` 24 · `national` 20 |
| `insititution_s` | text | non | 0 | **coquille au schéma** : trois `i`, il manque le `t` de « institutions » |
| `financement` | text | non | **3** | |
| `theme` | text **facetté multivalué** | oui | 0 | **22 valeurs** |
| `public_cible` | text **facetté multivalué** | oui | 0 | **21 valeurs** |
| `descriptif_fr` | text | non | 0 | 525 à 1 277 caractères |
| `source` | text | non | 0 | URL ; **une valeur sans schéma** (voir défauts) |
| `fiche_descriptive` | text | non | **20** | non affiché sur la page |
| `date_envoi_fiche_et_questionnaire` | text | non | **24** | **non affiché — suivi éditorial interne** |
| `reponse_recue` | text | non | **31** | **non affiché — suivi éditorial interne** |
| `personne_en_charge` | text | non | **22** | **non affiché — initiales d'agents FEI** |

**En v2.1 (`/exports/json`), `pays`, `theme` et `public_cible` arrivent déjà en tableaux JSON.**
En v1 (`/api/records/1.0/search`, ce qu'utilise la page), ce sont des chaînes que le template
découpe lui-même avec `.split(',')`. C'est un point d'architecture, pas un détail : la
transposition n'a **pas** besoin de `dsfr-data-normalize split` si elle passe par v2.1.

### Valeurs des trois facettes multivaluées (relevées à l'API, ordre décroissant)

**`pays` — 36 valeurs** : Allemagne 15 · Italie 13 · Espagne 12 · France 11 · Portugal 9 ·
Grèce 8 · Lituanie 7 · Irlande 5 · Pologne 4 · Croatie 3 · Luxembourg 3 · Norvège 3 · Pays-Bas 3 ·
Albanie 2 · Autriche 2 · Belgique 2 · Bulgarie 2 · Chypre 2 · Danemark 2 · Finlande 2 · Roumanie 2 ·
**Royaume-Uni 2** · **Royaume-Uni / Angleterre 2** · République tchèque 2 · Serbie 2 ·
**Slovénie 2** · **slovénie 2** · Bosnie-Herzégovine 1 · Hongrie 1 · Kosovo 1 · Lettonie 1 ·
Malte 1 · Monténégro 1 · **Royaume-Uni / Ecosse 1** · Slovaquie 1 · Turquie 1.

**`theme` — 22 valeurs** : littératie des données 28 · compétences numériques 8 · données ouvertes 5 ·
intelligence artificielle 5 · citoyenneté numérique 4 · pilotage par la donnée 3 · curricula 2 ·
esprit critique 2 · orientation 2 · tableau de bord 2 · transparence 2 · aide à la décision 1 ·
algorithmes 1 · compétences civiques 1 · datafication 1 · données publiques 1 ·
formation professionnelle 1 · gouvernance 1 · **gouvernance des données 1** · protection des données 1 ·
science des données 1 · visualisation des données 1.

**`public_cible` — 21 valeurs** : enseignants 27 · élèves 23 · **citoyens / grand public 8** ·
cadres éducatifs 7 · chefs d'établissement 5 · étudiants 5 · **citoyens /grand public 3** ·
établissements scolaires 3 · agents publics 2 · autorités locales 2 · chercheurs 2 ·
bibliothécaires 1 · **cadres educatifs 1** · décideurs politiques 1 · développeurs 1 · entreprises 1 ·
familles 1 · formateurs d'enseignants 1 · journalistes 1 · personnel d'orientation 1 · éducateurs 1.

## Objectif de la dataviz et informations véhiculées

- **Question** : « Qui, en Europe, travaille sur la littératie des données en éducation, sur quels
  thèmes, pour quels publics, et avec quel financement ? »
- **Message porté** : la littératie des données est un chantier européen partagé (24 projets
  multi-pays contre 20 initiatives nationales), massivement financé par Erasmus+, et l'Allemagne,
  l'Italie, l'Espagne et la France en sont les points d'appui.
- **Ce que l'utilisateur doit obtenir** : parcourir 44 fiches, les filtrer par type, pays, public
  et thème, en ouvrir une et lire son descriptif complet, ses institutions, son financement, puis
  suivre le lien vers le site du projet.
- **Ce qui n'est pas dans l'objet** :
  - **aucune donnée temporelle exploitable** — les années sont dans le titre, en texte libre
    (`(2023 - 2025)`, `(2019 -2022)`, `(en cours)`, `(2024-)`) ; on ne peut ni trier ni filtrer
    par période, alors que c'est la première question qu'on se pose sur un catalogue de projets ;
  - **aucun montant** de financement (seulement le nom du programme) ;
  - **aucun classement ni comptage affiché autrement que par les facettes** (pas de graphique) ;
  - **aucun export** (ni CSV, ni lien vers le jeu source depuis la page) ;
  - aucune indication du statut (terminé / en cours), pourtant lisible dans les titres.

## Relevé visuel exhaustif, bloc par bloc

### 0. Chrome de portail

En-tête DSFR « GOUVERNEMENT » + « data.education.gouv.fr », menu (Données, Data-visualisations,
Démarche, Créer une carte, Créer un graphique, Nous contacter), boutons **Connexion / Inscription**
magenta. Fil d'Ariane « Catalogue › France Éducation intern… › Consultation », puis le titre du
catalogue en gros, et une icône **signet** à droite. Le contenu de la page commence dessous.
Une **bulle de chat magenta** flotte en bas à droite en permanence.

### 1. En-tête éditorial (`.ini-header`, fond bleu RF `#000091`, filet rouge en bas)

- Trois cartouches blancs de logos : **République française**, **France Éducation International**
  (`logo-FEI_rvb.jpg`), **IIPE UNESCO** (`unesco.jpg`), puis un lien texte blanc
  « **Pour aller plus loin** » → `liseo.france-education-international.fr/…&id_article=443`.
- `<h1 class="ini-header-title">` : « **La littératie des données à l'ère des IA génératives** ».
  **Ce n'est pas le titre du catalogue** (« France Éducation international - Sélection de projets
  européens portant sur les données »), ni celui de l'onglet.
- Sous-titre italique : « Sélection de projets européens et nationaux à partir des données publiées
  sur data.education.gouv.fr ».
- **Badge compteur** rouge `#c9191e` : `{{ initiatives.nhits }}` en très gros + « PROJET(S) ».
  Valeur d'ouverture lue à l'écran : **44**.
- Mention : « Cartographie éditoriale réalisée par France Éducation international, en collaboration
  avec l'IIPE UNESCO. »

### 2. Barre de filtres (`.ini-filtres-bar`, `position: sticky; top: 0; z-index: 20`)

Elle reste collée en haut pendant tout le défilement. De gauche à droite :

| # | Libellé | Contrôle | Directive ODS | Comportement observé |
|---|---|---|---|---|
| 1 | **TYPE** | 3 boutons pilule : `Tous`, `européen 24`, `national 20` | `ods-facet-results="typeList"` sur `type_de_projet_national_europeen`, `sort="alphanum"` | **choix unique** (`refine[...] = [type.name]`), compteur dans une pastille grise. « Tous » vide le refine. Un type à 0 disparaît de la barre |
| 2 | **PAYS** | `<ods-select multiple="true">` « Tous les pays » | `ods-facet-results="paysList"`, alphanum | dropdown à **cases magenta**, champ « Filtre », ligne « Tous (36 options) » en tête, pied « *n* option sélectionnée / **Voir la sélection** - **Effacer la sélection** ». **Sans compteurs** |
| 3 | **PUBLIC** | `<ods-select multiple="true">` « Tous les publics » | `publicList` sur `public_cible` | idem, 21 options |
| 4 | — | `<input type="search" class="ini-search-input">` « Rechercher un projet… » | `ng-change` → `parameters['q']` | recherche plein texte v1 ODS, **à chaque frappe** |
| 5 | — | bouton **Réinitialiser** (rouge, bordé) | vide `q` + les 4 refines + `state.selectedProject` | vérifié : ramène bien à 44 |
| 6 | — | `{{nhits}} projet(s)` | | doublon du badge de l'en-tête |

Les quatre facettes sont déclarées **disjonctives** dans le contexte
(`initiatives-parameters="{'disjunctive.pays':true, …}"`) — donc OU intra-facette, ET inter-facettes.

**Vérifié à l'écran** : `Filtre = « slov »` dans PAYS liste bien **trois** options —
`Slovaquie`, `Slovénie`, **`slovénie`**. Le doublon de casse est exposé à l'utilisateur.

**L'URL n'est jamais synchronisée** : elle reste `…/view/` quel que soit l'état des filtres.
Aucun état n'est partageable ni « bookmarkable ».

### 3. Carte d'Europe (`.ini-map-zone`) — **la seule carte non française du portail**

**D'où vient la géométrie : d'aucun jeu de données.** C'est un **`<svg>` inline écrit à la main
dans le template**, `id="svg2"`, `viewBox="1754 161 9938 7945"`, `aria-label="Carte des pays
européens"`, `max-width: 560px`. Il contient **un seul `<g class="ini-map-countries">` de 66
`<path id="xx">`**, chaque `id` étant un code **ISO 3166-1 alpha-2 minuscule** (`de`, `fr`, `gb`,
`xb` pour le Kosovo…), plus un dernier `<path>` décoratif à 40 % d'opacité blanche.
Le jeu `fr-en-initiatives_donnees_europe` **n'a aucun champ géographique** (`features: ['analyze']`,
pas de `geo`) : il n'y a ni `geo_shape`, ni fond de carte, ni GeoJSON externe, ni tuiles.

**Comment la choroplèthe est calculée** — trois étages, tous dans le template :

1. `ods-color-gradient="colorgradient"` sur la section, avec
   `ods-color-gradient-context="initiativessansfiltre"`, `-x="pays"`, `-serie="COUNT()"`,
   `-nb-classes="4"`. Relevé dans le scope Angular :
   **4 classes à intervalles égaux de 1 à 15**, seuils **4,5 / 8 / 11,5**, couleurs
   `rgb(180,197,241)` → `rgb(120,150,240)` → `rgb(60,102,238)` → `rgb(0,55,237)`.
   `colorgradient.values` contient **les 36 valeurs de la facette `pays`**, y compris les doublons.
2. Une **expression d'interpolation à effet de bord** — 66 lignes du type
   `valeurCarte['de'] = valeursCarte['Allemagne'];` — suivies de `""` pour ne rien afficher.
   C'est une table de correspondance **nom français → ISO2 écrite à la main**, avec des sommes pour
   les entités éclatées :
   `valeurCarte['gb'] = valeursCarte['Royaume-Uni'] + valeursCarte['Grande-Bretagne (Angleterre, Écosse, Pays de Galles)'] + valeursCarte['Irlande du Nord'] + valeursCarte['Royaume-Uni / Angleterre'] + valeursCarte['Royaume-Uni / Ecosse']`
   → **5** (2 + 0 + 0 + 2 + 1), vérifié dans le DOM.
   *(Les termes absents ne cassent pas la somme : AngularJS implémente `+` avec un `plusFn` qui
   ignore les opérandes `undefined` — `2 + undefined` vaut 2, pas `NaN`.)*
3. `ng-style` par pays : `!valeurCarte['xx'] ? 'Gainsboro' : (…< seuil1 ? couleur1 : …)`.
   Les 45 pays sans projet sont donc en `rgb(220,220,220)`.

**Remplissages effectivement calculés (relevés dans le DOM, 21 pays colorés sur 66)** :

| Classe | Couleur | Pays |
|---|---|---|
| 11,5 – 15 | `rgb(0,55,237)` | Allemagne 15 · Italie 13 · Espagne 12 |
| 8 – 11,5 | `rgb(60,102,238)` | France 11 · Portugal 9 · Grèce 8 |
| 4,5 – 8 | `rgb(120,150,240)` | Lituanie 7 · Irlande 5 · **Royaume-Uni 5** |
| 1 – 4,5 | `rgb(180,197,241)` | Pologne 4 · Croatie 3 · Luxembourg 3 · Norvège 3 · Pays-Bas 3 · Albanie 2 · Autriche 2 · Belgique 2 · Bulgarie 2 · Chypre 2 · Danemark 2 · Finlande 2 · République tchèque 2 · Roumanie 2 · Serbie 2 · **Slovénie 2** · Bosnie-Herzégovine 1 · Hongrie 1 · Kosovo 1 · Lettonie 1 · Malte 1 · Monténégro 1 · Slovaquie 1 · Turquie 1 |
| — | `Gainsboro` | les 45 autres (Suède, Islande, Russie, Maroc, Algérie, Israël, Kazakhstan…) |

**Interactions vérifiées** :
- **Survol** : `<title>` SVG natif — « Malte (1 projet(s)) », « Vatican » (sans parenthèses quand 0).
  Infobulle du navigateur, pas une infobulle stylée.
- **Clic sur un pays** : `ng-click="initiatives.parameters['refine.pays'] = ['Allemagne']"`.
  Vérifié : clic sur l'Allemagne → **15 projet(s)**, TYPE devient `européen 11 / national 4`,
  la barre de thèmes se réduit à 6 chips, le select PAYS affiche « Allemagne ».
  **La sélection est remplacée, jamais ajoutée** : on ne peut pas cliquer deux pays.
  Re-cliquer le même pays ne le désélectionne pas.
- **État sélectionné** : classe `.active`, dont la règle CSS est
  `.active{fill:green !important;stroke:red;stroke-width:8}`. **Vu à l'écran** : l'Allemagne devient
  **vert vif à contour rouge**, hors de toute palette. Mots-clés CSS bruts `green`/`red` : c'est un
  style de mise au point resté en production.
- Le select PAYS et la carte sont **bidirectionnels** : cocher « Autriche » dans le select colorie
  l'Autriche en vert sur la carte (vérifié).

### 4. Barre de thèmes (`.ini-themes-bar`, à droite de la carte)

Label « **THÈMES** », puis un chip bleu foncé « **Tous les thèmes** » (`ini-theme-chip-reset`) et
**22 pastilles arrondies** `libellé + compteur` dans une pastille grise, **par ordre alphabétique**
(`ods-facet-results-sort="alphanum"`) : aide à la décision 1, algorithmes 1, citoyenneté numérique 4,
compétences civiques 1, compétences numériques 8, curricula 2, datafication 1, données ouvertes 5,
données publiques 1, esprit critique 2, formation professionnelle 1, gouvernance 1,
gouvernance des données 1, intelligence artificielle 5, littératie des données 28, orientation 2,
pilotage par la donnée 3, protection des données 1, science des données 1, tableau de bord 2,
transparence 2, visualisation des données 1.

**Choix unique** (`refine.theme = [theme.name]`), chip actif en bleu ciel plein. Les chips se
recalculent avec les autres filtres (vérifié : avec `type = national`, il n'en reste que 17 ;
avec `pays = Allemagne`, 6).

### 5. Légende (`.ini-legende`)

Deux entrées seulement : « ▬ **Projet européen** » (vert) et « ▬ **Initiative nationale** » (orange).
**Elles décrivent le filet supérieur des fiches, pas la carte.** Il n'y a **aucune légende pour la
choroplèthe** : ni échelle, ni bornes, ni mention de ce que la couleur encode.

### 6. Grille de fiches (`.ini-fiches-grid`, `ods-results="projets" ods-results-max="46"`)

`grid-template-columns: repeat(auto-fill, minmax(295px, 1fr))` → **2 colonnes** au viewport testé
(la 3ᵉ colonne de la page est occupée par le panneau de détail). **44 `<article>` rendus**, aucune
pagination, aucun « voir plus ». Structure d'une fiche, de haut en bas :

1. Filet supérieur de 3 px : **vert** si `européen`, **orange** si `national`.
2. Badge type en petites capitales : `EUROPÉEN` (vert) / `NATIONAL` (orange).
3. `<h2 class="ini-fiche-titre">` — `initiative_projet` en bleu RF.
4. Ligne de **tags pays** gris (`pays.split(',')`).
5. Séparateur, puis **tags thèmes** bleu clair, puis **tags publics** bleu clair plus pâle.
6. `descriptif_fr`, **tronqué par CSS** (pas d'ellipse « … », le texte est coupé net).
7. Pied : `financement` en petit gris, **tronqué** par `text-overflow`
   (« Commission européenne – Programme Erasmus+ (Action clé … »), et un bouton **Voir**.

Fiche relevée mot pour mot (première de la grille) :
```
EUROPÉEN
Agile EDU - Key Success Factors for inclusive digitally agile Education Ecosystem (2023 - 2025)
Danemark  Norvège  Portugal  Espagne  France  Slovénie
gouvernance des données
décideurs politiques  formateurs d'enseignants  enseignants  cadres éducatifs
Agile EDU réunit autorités publiques, collectivités, universités et société civile pour analyser
les usages des données en éducation sous les angles pédagogique, éthique, organisationnel et
réglementaire. Aligné sur le Plan d'action…
Commission européenne – Programme Erasmus+ (Action clé …            [ Voir ]
```

**Le bouton « Voir » ne remplit PAS le panneau de détail** : c'est
`<a ng-href="{{item.fields.source}}" target="_blank" ng-click="$event.stopPropagation()">`
— il **quitte le site**. Vérifié : le clic a ouvert `http://agile-edu.eun.org/` dans un nouvel onglet.
Pour remplir le panneau, il faut cliquer **ailleurs** sur la fiche
(`ng-click="state.selectedProject = item"` porté par l'`<article>` entier).

### 7. Panneau « Détail du projet » (`<aside class="ini-detail">`)

Troisième colonne de `.ini-content-layout`
(`grid-template-columns: minmax(0,1fr) minmax(320px,0.42fr)` — donc en réalité la grille a
**deux** colonnes, la grille de fiches et l'aside ; les fiches se répartissent en 2 sous-colonnes).
`position: sticky; top: 88px; max-height: calc(100vh - 110px); overflow-y: auto`.

**État vide** (`ng-if="!state.selectedProject"`) : titre « **Détail du projet** », filet rouge,
et le texte « Sélectionnez une fiche projet pour afficher son descriptif complet, ses thèmes, ses
publics cibles, ses pays, ses institutions et son financement. »

**État rempli** — relevé champ par champ après clic sur la fiche « Agile EDU » :

| Zone | Contenu | Champ |
|---|---|---|
| En-tête **sticky dans le panneau** | badge `EUROPÉEN` | `type_de_projet_national_europeen` |
| | titre h2 bleu | `initiative_projet` |
| | tags pays gris | `pays` (split) |
| | filet rouge 3 px | — |
| Corps (défilant) | **THÈMES** + tags | `theme` (split) |
| | **PUBLIC CIBLE** + tags | `public_cible` (split) |
| | **DESCRIPTION** | `descriptif_fr` (intégral, non tronqué) |
| | **INSTITUTION(S)** | `insititution_s` — relevé : « … Oslo University (Norvège), ministère portugais de l'éducation (Portugal), Fondation Empieza por Educar (Espagne), Sveriges Kommuner och Regioner (SKR) (Suède), ministère français de l'éducation, ministère slovène de l'éducation » |
| | **FINANCEMENT** (italique) | « Commission européenne – Programme Erasmus+ (Action clé 2 – Partenariats de coopération dans l'enseignement scolaire) » |
| Pied | bouton **Voir le projet** | `source`, `target="_blank"` |

Chaque section est en `ng-if` sur son champ : une valeur vide fait disparaître le bloc entier
(titre compris). La fiche sélectionnée reçoit `.ini-fiche-active` (contour bleu 2 px).
Le panneau capte la molette : la page ne défile pas quand le curseur est dessus.

**Le bouton de fermeture « × » est invisible.** `.ini-detail-close` est en
`position:absolute; top:16px; right:20px` sans `z-index`, alors que `.ini-detail-header` qui le
recouvre est `position:sticky; top:0; z-index:1; background:#fff`. Vérifié à l'écran (zoom sur la
zone) : aucun × n'est visible. **Il n'existe aucun moyen de vider le panneau** autrement qu'en
touchant un filtre (chaque `ng-click` de filtre remet `state.selectedProject = null`).

### 8. État vide

Recherche `zzz` → **0 projet(s)**. Rendu : une loupe **🔎 en emoji** (`.ini-empty-icon`) et
« Aucun projet ne correspond aux critères sélectionnés. ». **La barre THÈMES disparaît entièrement**
et la barre TYPE se réduit au seul bouton « Tous ». Le panneau de détail vide reste affiché à droite.
La carte, elle, **garde ses couleurs**.

### 9. Pied de page

Bloc DSFR « GOUVERNEMENT » + `info.gouv.fr`, `service-public.gouv.fr`, `legifrance.gouv.fr`,
`data.gouv.fr`.

## Défauts et bizarreries de l'original

1. **La choroplèthe ne réagit à aucun filtre.** `ods-color-gradient` est branché sur
   `initiativessansfiltre`, un second contexte qui ne reçoit jamais de refine.
   **Vérifié** : avec `type = national` (20 projets), l'Allemagne affiche toujours
   « (15 projet(s)) » et reste dans la classe la plus foncée, alors que les chips de thèmes, eux,
   se recalculent. La carte contredit donc la liste sous les yeux de l'utilisateur.
   C'est le défaut n° 1 de la page.
2. **Slovénie est sous-comptée sur la carte.** Le template additionne
   `valeursCarte['Slovénie'] + valeursCarte['Slovènie']` — mais la clé fautive de la donnée est
   `slovénie` (minuscule), pas `Slovènie` (accent grave). Résultat vérifié dans le DOM :
   « Slovénie (2 projet(s)) » au lieu de 4. Deux projets (SPADATAS, DALI4US) ne sont pas
   comptés. Symétriquement, cliquer sur la Slovénie filtre sur `Slovénie` et n'en ramène que 2.
3. **Aucune légende de choroplèthe.** Quatre classes de bleu, aucun repère : impossible de savoir
   si le bleu moyen vaut 5 ou 50. La seule légende de la page décrit autre chose (les filets des
   fiches). C'est un manquement de fond, et RGAA 1.4 par-dessus (information portée par la couleur
   seule ; le `<title>` de survol ne compense pas pour un utilisateur clavier).
4. **La carte est inaccessible au clavier.** 66 `<path>` porteurs de `ng-click`, **zéro `tabindex`**,
   aucun `role`, aucun gestionnaire clavier (vérifié : `grep -c tabindex` = 0 sur le template).
   Le seul `aria-label` est sur le `<svg>` global. Non conforme RGAA 7.3 / 12.x.
5. **Le style de sélection est un reste de mise au point** : `.active{fill:green !important;
   stroke:red;stroke-width:8}`. Vert et rouge purs, hors palette DSFR et hors palette de la page.
6. **Le bouton × du panneau de détail est masqué par son propre en-tête sticky** (défaut CSS de
   `z-index`). Le panneau ne peut donc jamais être refermé volontairement.
7. **Le bouton « Voir » de la fiche quitte le site sans le dire** : libellé de trois lettres, aucune
   icône « lien externe », aucun `title`, `target="_blank"` — alors que le geste attendu (« voir le
   détail ») est justement ce que fait le clic sur le reste de la fiche. Deux gestes très proches,
   deux résultats opposés. Vérifié par l'ouverture effective de `agile-edu.eun.org`.
8. **Course de requêtes sur la recherche, qui ne se rattrape jamais.** En tapant « intelligence » :
   l'écran affiche **34 projet(s)** et rend **34 fiches**, alors que la barre TYPE affiche
   `européen 3 / national 5`. Contrôlé à l'API : `q=intelligence` renvoie **8** résultats, et
   **34 est la réponse de `q=inte`**. Les résultats correspondent donc à une frappe antérieure,
   les facettes à la frappe finale, et l'écart **persiste** (relevé de nouveau après 8 s).
   La saisie était rapide (frappe automatisée), mais aucun mécanisme n'annule les réponses
   périmées : le décalage est structurel, pas transitoire.
9. **Le catalogue de valeurs n'est pas nettoyé, et la page l'expose.**
   `Slovénie` / `slovénie` ; `Royaume-Uni`, `Royaume-Uni / Angleterre`, `Royaume-Uni / Ecosse`
   (sans accent à « Écosse ») ; `citoyens / grand public` / `citoyens /grand public` ;
   `cadres éducatifs` / `cadres educatifs` ; `gouvernance` / `gouvernance des données`.
   Le menu PAYS affiche donc 36 entrées pour ~32 pays réels, doublons visibles (vérifié à l'écran).
10. **Un lien `source` sans schéma** : le projet EVIDALI porte `source = "evidali.eun.org"`.
    Injecté dans `ng-href`, il devient une URL **relative** — le bouton « Voir » renvoie à une page
    du portail, pas au projet.
11. **Quatre colonnes de suivi éditorial interne sont publiées en open data** :
    `date_envoi_fiche_et_questionnaire`, `reponse_recue`, `personne_en_charge`, `fiche_descriptive`.
    Elles ne sont pas affichées, mais elles sont dans l'export, dans l'API — **et dans l'index
    plein texte que la barre de recherche de la page interroge**. On y lit des initiales d'agents
    (`HB` 13 fois, `AP` 7), des dates de relance (« Le 07/05 Relance le 26/05 »), et une réponse
    d'un partenaire : « A répondu le 28/05 qu'ils n'avaient pas le temps de contribuer à la
    publication. » Ce n'est pas un défaut de dataviz, c'est un défaut de gouvernance de la donnée,
    et il est le plus lourd de la page.
12. **`insititution_s`** : coquille dans le nom de champ, gravée au schéma, donc dans l'API et dans
    tout code client. Le jeu lui-même n'a **pas de titre** (`title` = l'identifiant technique).
13. **`ods-results-max="46"` en dur pour 44 lignes.** Deux projets de marge. Au 47ᵉ, la page
    tronquera **en silence** : ni pagination, ni compteur divergent (le badge lit `nhits`, pas le
    nombre de fiches rendues) — l'utilisateur verra « 47 projet(s) » et 46 fiches.
14. **Le titre de la page (h1) ne correspond ni au catalogue ni à l'onglet.** Trois libellés pour
    un même objet.
15. **Deux compteurs identiques** à 300 px l'un de l'autre (badge de l'en-tête et « 44 projet(s) »
    en bout de barre de filtres).
16. **Descriptif et financement tronqués sans marqueur** dans les fiches : le texte s'arrête net,
    rien n'indique qu'il y a une suite (elle est dans le panneau, qu'on ne sait pas ouvrir avant
    d'avoir essayé).
17. **Aucun accès à la donnée source depuis la page** : ni lien vers le jeu, ni export, ni mention
    de la licence.

## Transposition vers `dsfr-data`

### Architecture retenue et pourquoi

44 lignes, 13 champs, export complet **96 Ko brut** en un aller-retour. Aucune raison d'aller
chercher `server-side`, `server-facets` ou la pagination serveur : **une source unique en mode
adaptateur ODS, tout le reste côté client**. Le mode client donne en prime la cascade exacte et
les compteurs, que l'original a déjà.

Un point d'architecture décide de tout le reste : **en API v2.1, `pays`, `theme` et `public_cible`
arrivent en tableaux JSON**. `dsfr-data-facets` traite nativement un tableau comme un champ
multi-valeurs (une entrée de facette par élément). Il n'y a donc **ni `split` à poser, ni
`.split(',')` à écrire** — la moitié de la gymnastique du template ODS disparaît en changeant de
version d'API, pas en changeant de bibliothèque.

### Correspondance directive → composant

| Bloc / directive AngularJS ODS | Composant + attributs `dsfr-data` |
|---|---|
| `ods-dataset-context context="initiatives"` | `<dsfr-data-source id="ini" api-type="opendatasoft" base-url="https://data.education.gouv.fr" dataset-id="fr-en-initiatives_donnees_europe">` |
| `ods-dataset-context context="initiativessansfiltre"` (2ᵉ contexte, non filtré) | **inutile** — c'est justement le montage qui produit le défaut n° 1. On supprime ce contexte et la carte lit la même query que la liste |
| `initiatives-parameters="{'disjunctive.pays':true, …}"` | `disjunctive="pays, public_cible, theme"` sur `dsfr-data-facets` |
| `'refine.pays'` posé/retiré par 4 UI différentes + URL absente | un **`<dsfr-data-context id="ctx" sources="ini" url-sync>`**, et la facette s'y enregistre par `context="ctx"` : un seul point d'URL pour tout l'état (facettes **et** recherche) |
| 3 boutons TYPE, choix unique, compteurs | `display="type_de_projet_national_europeen:radio-inline"` — **boutons radio DSFR visibles en ligne, précédés d'une option « Tous » qui retire la sélection** : équivalent exact du geste, y compris le bouton « Tous ». (Affichage du compteur en mode `radio-inline` : **non vérifié**) |
| `<ods-select multiple="true">` PAYS / PUBLIC | `display="pays:multiselect \| public_cible:multiselect"` — dropdown repliable, cases à cocher, recherche intégrée. Séparateur d'entrées **`\|`**, pas la virgule (PG-022) |
| 22 pastilles de thème, **choix unique**, compteurs, ordre alpha | `display="theme:radio-inline"` + `sort="alpha:asc"` + `max-values="22"`. **Ce n'est pas une facette qui « ne sait pas faire » : le mode existe et il est exclusif d'office.** La forme pastille est un habillage CSS de la page, pas une capacité |
| ordre **alphabétique** des valeurs | `sort="alpha:asc"`. **Ne jamais écrire `-count`** (déprécié, et trie à l'envers — PG-012) |
| `<input type="search">` + `parameters['q']` | `<dsfr-data-search id="q" source="ini" fields="initiative_projet, descriptif_fr, insititution_s, financement" count context="ctx">` — `fields` **restreint l'index** : c'est ce qui empêche la recherche de retomber sur `personne_en_charge` (défaut n° 11) |
| bouton **Réinitialiser** | `<dsfr-data-context-tags context="ctx" clear-all>` (tags supprimables + « Tout effacer »), et `no-reset` sur la facette pour ne pas doubler le bouton |
| `{{initiatives.nhits}} projet(s)` ×2 | `count` sur `dsfr-data-search` (un seul compteur), ou `<dsfr-data-kpi source="f" value="count" label="projets">` |
| **la carte d'Europe** (SVG inline 66 paths + table ISO à la main + `ods-color-gradient`) | `<dsfr-data-map>` + une couche `<dsfr-data-map-layer type="geoshape" fill-field="nb" classes="4" method="equal">` sur un **GeoJSON d'Europe statique** (`transform="features"`, motif documenté du fond administratif). Voir § Limites : c'est **entièrement natif depuis 0.22.0/0.23.0**, sauf la géométrie elle-même |
| la table « nom français → ISO2 » écrite dans le template | plus nécessaire **si** le GeoJSON porte le nom français en propriété : la jointure se fait sur le nom. Sinon `<dsfr-data-join on="pays">` sur `public/data/pays-iso.json`. **Voie native pour le nettoyage en amont** : `<dsfr-data-normalize replace-fields="pays:slovénie:Slovénie \| pays:Royaume-Uni / Angleterre:Royaume-Uni \| pays:Royaume-Uni / Ecosse:Royaume-Uni">` — comparaison stricte, pas de regex, aucun `:` dans les valeurs, donc la grammaire passe. Corrige d'emblée les défauts 2 et 9. Bonus 0.22.0 (#660) : `dsfr-data-join` publie son **taux d'appariement** (« 34 / 36 lignes gauche appariées »), qui aurait fait voir la Slovénie manquante |
| `ods-color-gradient-nb-classes="4"`, intervalles égaux | `classes="4" method="equal"` sur la couche — **exactement les deux paramètres de l'original** (#685, 0.22.0). `method` accepte aussi `quantile` (défaut) et `manual` + `breaks="…"` |
| `<title>` SVG « Malte (1 projet(s)) » | `tooltip-field` sur la couche, ou `<dsfr-data-map-popup>` avec un `<template>` |
| `ng-click` sur un `<path>` → `refine.pays` | `refine-on-click="pays" context="ctx" label="Pays"` sur la couche (#681, 0.23.0) — **et mieux que l'original** : second clic = retrait, tag dans `context-tags`, état porté par l'URL. Émet aussi `dsfr-data-map-select` |
| absence de légende de choroplèthe | `<dsfr-data-map-legend for="couche-europe" label="Projets par pays">` (#685) — une entrée par classe **avec ses bornes**. Le défaut n° 3 tombe sans rien calculer |
| fond de carte trop chargé sous une choroplèthe | `tiles-style="muted"` sur `dsfr-data-map` (#686, 0.22.0) — **plus besoin de la classe CSS `odv-fond-attenue`** du dépôt |
| `ods-results="projets" ods-results-max="46"` + 44 `<article>` | `<dsfr-data-display source="f" cols="2" uid-field="recordid">` + `<template>`. **`dsfr-data-cards` n'existe pas.** Pas de plafond en dur : `pagination="0"` affiche tout |
| tags pays / thèmes / publics dans la fiche | un tableau est rendu **joint par « , »** depuis 0.22.0 (#663), et `{{pays:join: · }}` choisit le séparateur. Pour **un tag DSFR par valeur**, il n'y a pas de boucle : voir § Limites |
| `ng-if="item.fields.financement"` (masquer un bloc vide) | **`{{#if financement}}…{{/if}}` et `{{#unless}}` existent** depuis 0.22.0 (#664), non imbriqués, résolus avant substitution. ⚠️ Le piège AM-039 du `CLAUDE.md` (« aucune conditionnelle dans un template ») **est périmé** : il décrit 0.20.0, la version épinglée par le dépôt |
| `ng-href="{{item.fields.source}}"` | **`href="{{source:url}}"`**, pas `href="{{source}}"` : le pipe `:url` filtre les schémas par liste blanche (#664). Sans lui, une donnée `javascript:…` passerait telle quelle — et ce jeu est alimenté par saisie manuelle |
| filet vert/orange selon le type | `class="odv-fiche odv-{{type_de_projet_national_europeen}}"` + deux règles CSS ; ou `{{#if}}` autour de deux variantes de balise |
| `ng-click="state.selectedProject = item"` + `<aside>` | **voir § Limites, manque réel n° 3** : `refine-on-click` et `dsfr-data-map-select` n'existent que sur la carte ; aucun événement de sélection sur `dsfr-data-display`. Substitut : `<select>` + `dsfr-data-context-filter`, **URL-partageable** contrairement à l'original |
| `<a>` « Voir » vers `source` | `<a class="fr-link" href="{{source}}" target="_blank" rel="noopener">Voir le projet (nouvelle fenêtre)</a>` — libellé explicite (RGAA 13.x) |
| rien dans l'original | `<dsfr-data-list>` sous la grille pour la vue tableau + `databox-download` : l'export CSV que la page n'a pas |

### Esquisse de code

```html
<!-- ============ Source : 44 lignes, 96 Ko, un aller-retour ============ -->
<dsfr-data-source id="ini-raw" api-type="opendatasoft"
  base-url="https://data.education.gouv.fr"
  dataset-id="fr-en-initiatives_donnees_europe"></dsfr-data-source>

<!-- Nettoyage des libellés de pays : corrige la Slovénie sous-comptée (défaut 2)
     et les trois variantes de Royaume-Uni (défaut 9). Comparaison stricte, séparateur « | ». -->
<dsfr-data-normalize id="ini" source="ini-raw" trim
  replace-fields="pays:slovénie:Slovénie | pays:Royaume-Uni / Angleterre:Royaume-Uni | pays:Royaume-Uni / Ecosse:Royaume-Uni | public_cible:citoyens /grand public:citoyens / grand public | public_cible:cadres educatifs:cadres éducatifs">
</dsfr-data-normalize>

<!-- Géométrie : GeoJSON d'Europe simplifié, hébergé avec la page.
     Le paquet npm livre `dsfr-data/geo/regions.json` et `…/departements.json` (#688),
     mais RIEN hors France : cette ressource est à produire (voir § Limites, point 1). -->
<dsfr-data-source id="geo-eu" url="/data/geo/europe-simplifiee.geojson"
  transform="features"></dsfr-data-source>

<!-- ============ Un contexte, une URL ============ -->
<dsfr-data-context id="ctx" sources="ini-raw" url-sync></dsfr-data-context>

<div class="fr-container fr-mb-8w">

  <!-- ============ Barre de filtres (sticky en CSS de page) ============ -->
  <div class="odv-filtres-bar">
    <dsfr-data-search id="q" source="ini" context="ctx" count
      fields="initiative_projet, descriptif_fr, insititution_s, financement"
      label="Rechercher un projet" placeholder="Titre, description, institution…">
    </dsfr-data-search>

    <dsfr-data-facets id="f" source="q" context="ctx" no-reset
      fields="type_de_projet_national_europeen, pays, public_cible, theme"
      labels="type_de_projet_national_europeen:Type | pays:Pays | public_cible:Public | theme:Thème"
      display="type_de_projet_national_europeen:radio-inline | pays:multiselect | public_cible:multiselect | theme:radio-inline"
      disjunctive="pays, public_cible"
      sort="alpha:asc" max-values="22" cols="type_de_projet_national_europeen:12 | pays:4 | public_cible:4 | theme:12">
    </dsfr-data-facets>

    <dsfr-data-context-tags context="ctx" clear-all></dsfr-data-context-tags>
  </div>

  <!-- ============ Carte d'Europe ============ -->
  <!-- Comptage par pays SUR LA SÉLECTION COURANTE : c'est ici que le défaut n° 1 tombe. -->
  <dsfr-data-query id="par-pays" source="f"
    group-by="pays" aggregate="pays:count" order-by="pays__count:desc"
    where="pays:isnotnull"></dsfr-data-query>
  <!-- Géométrie à gauche, comptage à droite. getJoinStats() dira combien de pays
       du jeu n'ont pas trouvé leur polygone (le « slovénie » minuscule s'y verrait). -->
  <dsfr-data-join id="eu" source="geo-eu" with="par-pays"
    on="properties.nom_fr=pays"></dsfr-data-join>

  <div class="odv-carte-themes">
    <dsfr-data-map center="54,15" zoom="3" height="520px"
      tiles="osm-fr" tiles-style="muted">
      <dsfr-data-map-layer id="couche-europe" source="eu" type="geoshape"
        fill-field="pays__count" classes="4" method="equal"
        selected-palette="sequentialAscending" fill-opacity="0.85"
        tooltip-field="properties.nom_fr"
        refine-on-click="properties.nom_fr" context="ctx" label="Pays">
      </dsfr-data-map-layer>
      <dsfr-data-map-legend for="couche-europe" label="Projets par pays"></dsfr-data-map-legend>
    </dsfr-data-map>
    <dsfr-data-a11y for="couche-europe" source="par-pays" table download></dsfr-data-a11y>
  </div>

  <!-- ============ Fiches + détail ============ -->
  <div class="odv-content-layout">
    <dsfr-data-display source="f" cols="2" uid-field="recordid" empty="Aucun projet ne correspond aux critères sélectionnés.">
      <template>
        <article class="odv-fiche odv-type-{{type_de_projet_national_europeen}}">
          <p class="fr-badge fr-badge--sm">{{type_de_projet_national_europeen}}</p>
          <h3 class="fr-h6"><a href="#{{$uid}}">{{initiative_projet}}</a></h3>
          <p class="fr-text--xs odv-pays">{{pays:join: · }}</p>
          <p class="fr-text--xs odv-themes">{{theme:join: · }}</p>
          <p class="fr-text--xs odv-publics">{{public_cible:join: · }}</p>
          <p class="fr-text--sm">{{descriptif_fr}}</p>
          {{#if financement}}<p class="fr-text--xs">{{financement}}</p>{{/if}}
          {{#if source}}<p><a class="fr-link fr-link--sm" href="{{source:url}}"
            target="_blank" rel="noopener">Voir le projet (nouvelle fenêtre)</a></p>{{/if}}
        </article>
      </template>
    </dsfr-data-display>

    <!-- Le « détail » en voie native : un select, un filtre de contexte, une fiche.
         Ce que l'original n'a pas : l'état est dans l'URL. -->
    <aside class="odv-detail">
      <h2 class="fr-h6">Détail du projet</h2>
      <select class="fr-select" id="sel-projet" aria-label="Choisir un projet">…</select>
      <dsfr-data-context id="ctx-detail" sources="ini-raw" url-sync>
        <dsfr-data-context-filter field="initiative_projet" operator="eq" ui="sel-projet"
          label="Projet"></dsfr-data-context-filter>
      </dsfr-data-context>
      <dsfr-data-display source="detail" cols="1">
        <!-- Les {{#if}} reproduisent exactement les ng-if de l'original :
             un champ vide fait disparaître son bloc, titre compris. -->
        <template>
          <p class="fr-badge fr-badge--sm">{{type_de_projet_national_europeen}}</p>
          <h3 class="fr-h6">{{initiative_projet}}</h3>
          {{#if theme}}<h4 class="fr-text--xs">Thèmes</h4><p>{{theme:join: · }}</p>{{/if}}
          {{#if public_cible}}<h4 class="fr-text--xs">Public cible</h4><p>{{public_cible:join: · }}</p>{{/if}}
          {{#if descriptif_fr}}<h4 class="fr-text--xs">Description</h4><p class="fr-text--sm">{{descriptif_fr}}</p>{{/if}}
          {{#if insititution_s}}<h4 class="fr-text--xs">Institution(s)</h4><p class="fr-text--sm">{{insititution_s}}</p>{{/if}}
          {{#if financement}}<h4 class="fr-text--xs">Financement</h4><p class="fr-text--sm">{{financement}}</p>{{/if}}
          {{#if source}}<p><a class="fr-btn" href="{{source:url}}" target="_blank" rel="noopener">Voir le projet</a></p>{{/if}}
        </template>
      </dsfr-data-display>
    </aside>
  </div>

  <!-- ============ Ce que l'original n'a pas ============ -->
  <dsfr-data-list source="f" columns="initiative_projet, type_de_projet_national_europeen, pays, theme, public_cible, financement"
    sort pagination="20"></dsfr-data-list>
</div>
```

> Le `<select id="sel-projet">` doit être peuplé ; la voie sans script est un
> `<dsfr-data-facets display="initiative_projet:select" max-values="44">` posé sur la même query,
> qui rend un `fr-select` peuplé de valeurs et exclusif d'office. **Non vérifié au navigateur** :
> à confirmer avant de l'écrire dans une page livrée.

## Limites et points durs identifiés

> **Cible : `dsfr-data` 0.25.0** (`_CIBLE-0.25.md`), pas le `dsfr-data@0.20.0` épinglé par le
> dépôt. Quatre verdicts : **natif** / **natif mais postérieur à 0.20.0** (montée de version ici)
> / **prévu à un jalon** (numéro d'issue) / **manque réel**.
> **Vérifications faites au source** (`~/Developer/GitHub/dsfr-data`, HEAD = release 0.23.0) et
> non à la fiche MCP, qui est en retard : `get_skill(dsfrDataMap, "reference")` ne liste ni
> `refine-on-click`, ni `context`, ni `label`, ni `dsfr-data-map-select`, et
> `get_skill(dsfrDataDisplay, …)` ne mentionne ni les blocs `{{#if}}` ni les pipes `:join` /
> `:url`. **Cinq de mes six « limites » de première rédaction tombaient à cause de cette fiche
> périmée.**

### Ce qui n'en est pas — corrections après lecture du source

- **`{{#if champ}}…{{/if}}` et `{{#unless}}` existent** dans le moteur de templates partagé par
  `dsfr-data-display` et `dsfr-data-map-popup` (`utils/template-expression.ts`, #664, **0.22.0**),
  non imbriqués, résolus en pré-passe avant la substitution. Avec les pipes `{{champ:number:2}}`,
  `{{champ:date}}`, `{{champ:join: / }}` (#662, #663) et `{{lien:url}}` (liste blanche de schémas).
  → **Le piège AM-039 du `CLAUDE.md` (« aucune conditionnelle dans un template ») est périmé.**
  Les `ng-if` du panneau de détail se transposent un pour un. *Natif, postérieur à 0.20.0.*
- **La choroplèthe à classes paramétrables existe** : `dsfr-data-map-layer type="geoshape"` +
  `fill-field` + `classes="4"` + `method="quantile|equal|manual"` + `breaks` (#685, **0.22.0**),
  avec `<dsfr-data-map-legend>` qui rend **une entrée par classe avec ses bornes**.
  `method="equal"` reproduit à l'identique les intervalles égaux d'`ods-color-gradient`.
  *Natif, postérieur à 0.20.0.*
- **Le clic sur un pays qui filtre la page existe** : `refine-on-click="champ"` + `context="id"` +
  `label` sur la couche, et l'événement `dsfr-data-map-select` (#681, ADR-104, **0.23.0**).
  Second clic = retrait, tag dans `dsfr-data-context-tags`, état porté par l'URL du contexte.
  **C'est plus que ce que fait l'original**, qui écrase la sélection et ne sait pas la retirer.
  *Natif, postérieur à 0.20.0.*
- **Le fond de carte atténué** : `tiles-style="muted"` (#686, 0.22.0) — la classe CSS
  `odv-fond-attenue` du dépôt (AM-017) n'est plus nécessaire.
- **Le taux d'appariement d'une jointure** est publié (#660, 0.22.0) : `getJoinStats()` et le volet
  Diagnostic rendent « 34 / 36 lignes gauche appariées (94 %) », avec alerte sous 50 %. C'est
  l'outil qui aurait fait voir le `slovénie` minuscule sans polygone — l'original, lui, l'a perdu
  en silence pendant toute la vie de la page.
- **Un « KPI texte »** (le nom du projet, d'un service…) : `dsfr-data-display` interpole n'importe
  quel champ, y compris textuel. Voie native, dans un autre composant que celui qu'on cherchait.

### Ce qui est prévu à un jalon

- **Discrétiser sur une valeur calculée / une part** : `compute` v2 avec `when … then … else`
  (**#671**, v0.24.0) et le ratio de deux agrégats (**#673**, v0.24.0). Pas nécessaire ici (le
  comptage suffit), mais c'est la brique si l'on veut une carte « part des projets européens ».
- **`replace-fields` et les valeurs à deux-points** : échappement `%3A` (**#676**, v0.24.0).
  Sans objet sur ce jeu — aucun libellé de pays ne contient de `:` — mais à ne pas reclasser en
  limite dure ailleurs.

### Manques réels — le résidu de cette page

1. **Aucune maille géographique non française n'est livrée ni documentée.**
   *Établi* : le paquet npm livre `dsfr-data/geo/regions.json` (18 régions) et
   `dsfr-data/geo/departements.json` (101 départements) — vérifié, le dossier `packages/core/geo/`
   ne contient que ces deux fichiers et un README (#688, 0.22.0). Rien pour l'Europe, rien pour le
   monde, et le motif « fond administratif » de la documentation ne parle que de contours
   français. Le seul recours hors France est `dsfr-data-chart type="map-monde"`, c'est-à-dire
   **le planisphère entier** : aucun attribut de cadrage, de `bbox` ou de zoom sur `map-chart`
   (vérifié dans la référence et dans `dsfr-data-chart.ts`).
   *Conséquence sur cette page* : la seule carte non française du portail Éducation demande à
   l'auteur de produire, simplifier, héberger et maintenir un GeoJSON d'Europe — le travail que le
   dépôt a déjà dû faire pour les régions françaises (`public/data/geo/regions-simplifiees.geojson`,
   AM-016) et que `dsfr-data` a ensuite internalisé pour la France seulement.
   *Demande* : livrer un `geo/europe.json` (ou `geo/monde.json`) sur le modèle de #688, avec le
   **nom français** en propriété pour que la jointure se fasse sans table intermédiaire.
   *Rien au source, rien au backlog v0.24/v0.25 au 2026-09-10.* **Manque réel.**
2. **Aucun référentiel de correspondance « nom de pays en français → ISO 3166-1 alpha-2 ».**
   *Établi* : `map-monde` convertit alpha-3 et numérique vers alpha-2 (`toIsoA2`, vérifié dans
   `dsfr-data-chart.ts`) mais **ne connaît aucun nom de pays**. Or aucun jeu open data français
   ne stocke des codes ISO : il stocke « Allemagne », « Royaume-Uni / Angleterre », « slovénie ».
   La table de 66 lignes écrite à la main dans le template ODS n'est pas un caprice de l'auteur,
   c'est la conséquence directe de ce manque.
   *Voie native essayée* : `dsfr-data-join` sur une table statique — elle marche, mais chaque page
   qui cartographie l'étranger doit refaire la même table, avec les mêmes pièges de casse et
   d'accents.
   *Demande* : un `geo/pays-iso.json` livré avec le paquet (nom fr, nom officiel, alpha-2,
   alpha-3), ou un `code-field-lookup="nom-fr"` sur `dsfr-data-chart type="map-monde"`.
   **Manque réel** — et un manque que Bercy ne pouvait pas révéler : tous ses jeux étaient français.
3. **Aucun événement de sélection sur `dsfr-data-display` ni `dsfr-data-list`.**
   *Établi au source* : sur l'ensemble de `packages/core/src`, **un seul** événement de sélection
   existe, `dsfr-data-map-select`, et **un seul** composant porte `refine-on-click`,
   `dsfr-data-map-layer`. `dsfr-data-display` et `dsfr-data-list` n'ont aucun `@fires`.
   *Conséquence* : le motif **maître-détail piloté par une grille de fiches** — le motif central de
   cette page, et le second du portail Éducation — n'a pas d'équivalent. Cliquer une carte pour
   filtrer : natif. Cliquer une **fiche** pour la détailler : rien.
   *Voies natives essayées, toutes deux réelles mais dégradées* :
   (a) `uid-field` + `<a href="#{{$uid}}">` et un bloc de détail rendu **dans le même template**,
   révélé par `:target` en CSS — le détail se retrouve alors dans le flux de la fiche, pas dans une
   colonne latérale collante. **Cesse de marcher** dès que le panneau doit être ailleurs dans la
   page, ce qui est précisément la mise en page de l'original ;
   (b) un `<select>` de projets + `dsfr-data-context-filter operator="eq" ui="sel-projet"` + un
   second `dsfr-data-display` : fonctionne, **et gagne l'URL partageable**, mais remplace le geste
   « je clique la fiche que je lis » par « je retrouve son titre dans une liste de 44 ».
   *Demande, symétrique de #681* : `refine-on-click="champ"` + `context` sur
   `dsfr-data-display` (et sur une ligne de `dsfr-data-list`), avec un événement
   `dsfr-data-display-select`. **Manque réel.**
4. **Pas de boucle dans un template : un tag DSFR par valeur d'un champ multivalué.**
   *Établi au source* : `template-expression.ts` implémente `{{#if}}` et `{{#unless}}` — et rien
   d'autre (`BLOCK_RE = /\{\{#(if|unless)…/`). Aucun `#each`, `#for` ni `#repeat`.
   *Voie native* : `{{pays:join: · }}` (#663) rend le texte, bien, avec le séparateur voulu.
   Il n'y a aucun moyen d'émettre `<p class="fr-tag">` par valeur.
   *Ce que ça coûte ici* : les pays, les thèmes et les publics sont **les trois** multivalués, et
   ce sont les trois éléments visuellement structurants de la fiche et du panneau. Le rendu passe
   de trois rangées de pastilles à trois lignes de texte.
   *Sur quel type de jeu le contournement cesse d'être acceptable* : dès que le nombre de valeurs
   dépasse ce qu'une ligne porte (ici 10 pays pour MILES, 7 pour AIDL), et dès que chaque valeur
   doit être cliquable (un tag de thème qui filtrerait la grille — ce que l'original ne fait pas
   non plus, mais qui est l'usage attendu d'une pastille).
   *Demande* : `{{#each champ}}…{{/each}}` non imbriqué, ou un pipe `{{champ:tags}}` rendant des
   `<p class="fr-tag fr-tag--sm">`. **Manque réel.**
5. **Le cadrage de `dsfr-data-chart type="map-monde"`** — pas d'attribut de zone d'intérêt, donc
   planisphère obligatoire. **À remonter chez `GouvernementFR/dsfr-chart`, pas ici** (règle 4 du
   lot 11 ; le JSDoc de `dsfr-data-map-legend` note déjà une issue amont ouverte sur `nb-classes`).
   Contourné dans cette fiche par la voie `dsfr-data-map` + GeoJSON, qui est meilleure sur tous
   les plans **sauf** qu'elle demande la géométrie du point 1.

### Ce que la transposition gagne

La carte suit enfin les filtres ; la Slovénie est comptée juste, et un taux d'appariement le
signalerait sinon ; une légende à quatre classes bornées apparaît ; le clic sur un pays filtre
**et** se retire au second clic ; les doublons de libellés sont fusionnés ; l'état complet est
dans l'URL ; la recherche n'indexe plus le suivi éditorial interne ; le panneau de détail garde
ses sections conditionnelles ; il y a un tableau accessible et un export CSV ; le nombre de fiches
n'est plus plafonné à 46 ; les `href` sont filtrés par liste blanche de schémas.
**Treize des dix-sept défauts relevés tombent d'eux-mêmes.**
Ce que la transposition perd, et rien d'autre : **le clic direct sur une fiche** (point 3) et
**les pastilles par valeur** (point 4).

## Données à reproduire fidèlement

- [ ] **44** projets, **24 européens / 20 nationaux**, compteur affiché « 44 projet(s) ».
- [ ] **Carte** : 21 pays colorés, valeurs Allemagne 15 · Italie 13 · Espagne 12 · France 11 ·
      Portugal 9 · Grèce 8 · Lituanie 7 · Irlande 5 · **Royaume-Uni 5 (agrégé)** ·
      **Slovénie 4 (corrigé — l'original affiche 2)** · Pologne 4 · Croatie/Luxembourg/Norvège/Pays-Bas 3 ·
      puis 2 et 1. Les 45 autres pays en gris.
- [ ] **Thèmes** : 22 valeurs, ordre alphabétique, compteurs, de « littératie des données 28 » à
      onze valeurs à 1. Choix unique + « Tous les thèmes ».
- [ ] **Pays** : 36 valeurs brutes → **32 après fusion** des doublons de casse et des variantes UK.
- [ ] **Publics** : 21 valeurs brutes → **19 après fusion** (`citoyens /grand public`,
      `cadres educatifs`).
- [ ] **Fiche** : badge de type, titre, tags pays, tags thèmes, tags publics, descriptif,
      financement, lien externe explicite.
- [ ] **Détail** : type, titre, pays, Thèmes, Public cible, Description (intégrale),
      Institution(s), Financement, bouton « Voir le projet ». Et **un moyen de le refermer**.
- [ ] **Réinitialiser** ramène à 44 et vide la recherche, les 4 facettes et la sélection.
- [ ] État vide : « Aucun projet ne correspond aux critères sélectionnés. »
- [ ] **Ne pas reproduire** : la choroplèthe figée, le vert/rouge de sélection, le × invisible,
      le plafond à 46, l'indexation des colonnes de suivi éditorial.
