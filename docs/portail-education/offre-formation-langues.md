# Offre de langues dans les collèges et lycées

- **URL** : https://data.education.gouv.fr/pages/offre_formation_langues/
- **Catalogue** : id **36**, thématique **Éducation**.
- **Producteur (métadonnée du jeu)** : **DNE** — Ministère de l'Éducation nationale.
  Licence ouverte v2.0 (Etalab). Dernière modification du jeu : **2026-01-31**.
- **Jeu de données** : **`fr-en-offre-langues-2d`** — « Offre de langues dans les collèges
  et lycées », **39 858 lignes**, **15 champs**, lisible sans clé.
  - Champs : `uai`, `libelle`, `adresse`, `enseignements`, `langues`, `code_departement`,
    `departement`, `code_region`, `region`, `code_academie`, `academie`, `commune`,
    `type_d_etablissement`, `position` (geo_point_2d), `secteur_de_l_etablissement`.
  - **Le grain n'est pas l'établissement.** Une ligne = un triplet
    (établissement × enseignement × langue). **39 858 lignes pour 9 759 établissements
    distincts** (mesuré : `count(distinct uai)`), soit **4,08 lignes par établissement**
    en moyenne ; le maximum est l'UAI `0861273S` avec **22 lignes**. Toute lecture qui
    confond « lignes » et « établissements » surcompte d'un facteur 4.
  - Facettes **déclarées** au back-office : `enseignements`, `langues`, `departement`,
    `region`, `academie`, `type_d_etablissement` — **six**. `secteur_de_l_etablissement`
    n'en fait pas partie (mais l'API v2.1 sait la calculer à la demande, cf. « Limites »).
  - **197 lignes sans `position`.**
- **Relevé visuel** : 2026-09-10, Chrome, fenêtre 1568 × 751.

## Objectif de la dataviz et informations véhiculées

- **Question à laquelle elle répond** : « Quelles langues vivantes et anciennes sont
  enseignées dans un établissement donné, et à quel niveau (LV1 / LV2 / LV3 / LCA) ? »
  C'est un **annuaire géographique de l'offre linguistique**, consulté établissement par
  établissement — typiquement par une famille qui choisit un collège.
- **Message porté** : aucun. La page n'énonce ni constat, ni total, ni comparaison.
  Le seul texte hors libellés de filtres est le H2 et l'invite « Sélectionnez une région,
  une académie ou un département pour voir les établissements ».
- **Information que l'utilisateur doit obtenir** : pour un établissement cliqué sur la
  carte — son libellé, sa commune, son UAI, et la liste de ses langues **regroupées par
  type d'enseignement**, sous forme de cartes LV1 / LV2 / LV3 / LCA.
- **Ce qui n'est pas dans l'objet** :
  - aucun **dénombrement** : ni « 9 759 établissements », ni « 12 495 offres d'anglais »,
    ni le nombre de résultats de la sélection courante — la page ne compte jamais rien ;
  - aucune **géographie de l'offre** : la question « où enseigne-t-on encore l'allemand ? »
    est celle que les données permettent le mieux de traiter, et la page ne l'aborde pas
    (pas de choroplèthe, pas de graphique, pas de classement) ;
  - aucun **filtre par type d'établissement** (collège / lycée) alors que la facette
    `type_d_etablissement` **existe et est déclarée** au back-office (Collège 24 779,
    Lycée 15 077) ;
  - aucun **filtre secteur opérationnel** : le select existe mais il est **vide**
    (cf. « Défauts », n° 1) ;
  - aucun **export**, aucun lien vers le jeu de données, aucun tableau.

## Chiffres de référence (API v2.1, relevé 2026-09-10)

| Mesure | Valeur |
|---|---|
| Lignes | **39 858** |
| Établissements distincts (`uai`) | **9 759** |
| Communes distinctes | **3 795** |
| Départements distincts | **107** (+ 1 groupe `null` de 11 lignes) |
| Académies distinctes | **33** (+ `null` 11) |
| Régions distinctes | **20** (+ `null` 11) |
| Langues distinctes | **37** |
| Lignes sans `position` | **197** |

**Enseignements** (3 valeurs, somme = 39 858) : LV2 **24 256** · LV1 **13 346** · LCA **2 256**.
LCA ne contient que deux langues : **Latin 1 664** et **Grec 592**.

**Secteur** : Public **29 467** · Privé **10 278** · `null` **113**.
**Type d'établissement** : Collège **24 779** · Lycée **15 077** · `null` **2**.

**Les 37 langues, par nombre de lignes** : Anglais 12 495 · Allemand 10 194 ·
Espagnol 10 054 · Italien 3 011 · Latin 1 664 · Chinois 671 · Grec 592 · Arabe 274 ·
Portugais 256 · Russe 212 · Hébreu moderne 81 · Néerlandais 57 · Japonais 52 · Corse 41 ·
Tahitien 35 · Occitan 30 · Turc 24 · Créole 22 · Provençal 20 · Breton 16 · Basque 9 ·
Catalan 8 · Arménien 7 · Polonais 5 · Coréen 4 · Langues rares océaniennes 4 ·
Norvégien 4 · Drehu (Lifou) 3 · Vietnamien 3 · **Français 2** · Persan 2 ·
**Américain 1** · Danois 1 · **Monégasque 1** · Suédois 1 · Tamoul 1 · Ukrainien 1.
(« Français », « Américain » et « Monégasque » comme *langues vivantes* : trois scories
du référentiel, cf. « Défauts ».)

**Les 20 régions** : Ile-de-France 7 291 · Auvergne-Rhône-Alpes 5 351 · Hauts-de-France
3 657 · Grand Est 3 569 · Nouvelle-Aquitaine 3 176 · Occitanie 3 116 ·
Provence-Alpes-Côte d'Azur 2 733 · Pays de la Loire 2 056 · Bretagne 2 030 ·
Normandie 1 992 · Bourgogne-Franche-Comté 1 737 · Centre-Val de Loire 1 434 ·
La Réunion 495 · Collectivités d'outre-mer 304 · Guadeloupe 213 · Corse 208 ·
Guyane 201 · Martinique 181 · Mayotte 85 · TOM et Collectivités territoriales 18.

**Les 7 départements les plus fournis** : Nord 1 667 · Paris 1 399 · Rhône 1 377 ·
Bouches-du-Rhône 1 173 · Seine-Saint-Denis 1 019 · Seine-et-Marne 978 · Yvelines 908.
**La queue** (rangs 101 à 107, tous inatteignables par le select, cf. « Défauts » n° 2) :
Creuse 88 · Mayotte 85 · Lozère 81 · Wallis-et-Futuna 14 · Polynésie Française 13 ·
Saint-Pierre-et-Miquelon 8 · Nouvelle Calédonie 5.

**Ultramarins** : oui, largement — La Réunion, Guadeloupe, Guyane, Martinique, Mayotte,
plus Polynésie, Nouvelle-Calédonie, Wallis-et-Futuna, Saint-Pierre-et-Miquelon.
Un `fit-bounds` sans garde-fou partirait au milieu du Pacifique.

## Le template AngularJS

Deux contextes sur **le même jeu** :

```html
<ods-dataset-context context="offredeformation,offredeformationpourdetail"
  offredeformation-dataset="fr-en-offre-langues-2d"
  offredeformation-parameters="{'disjunctive.enseignements':true,'disjunctive.langues':true}"
  offredeformationpourdetail-dataset="fr-en-offre-langues-2d"
  offredeformationpourdetail-parameters="{'disjunctive.enseignements':true,'disjunctive.langues':true}">
```

- `offredeformation` : la carte et les six selects.
- `offredeformationpourdetail` : la fiche de droite, refinée sur `uai` par le clic carte
  (`refine-on-click-...-replace-refine="true"`).
- `disjunctive` sur `enseignements` et `langues` seulement : ces deux facettes ne se
  réduisent donc **pas** elles-mêmes quand on y sélectionne une valeur, contrairement à
  région / académie / département.
- Pas de `ctx-apikey`, pas d'`urlsync`. **L'état n'est pas partageable par URL.**

Chargement observé : les six selects tirent chacun leur facette par un appel v1 séparé
(`/api/records/1.0/search/?…&rows=0&facet=<champ>&facetsort.<champ>=-count`) —
**un aller-retour par select, refait à chaque changement de sélection**. Après avoir
coché « Corse », **8 requêtes** ont été relevées dans l'onglet réseau.

## Relevé visuel exhaustif

### 1. Bandeau de titre

H2 « **Offre de langues dans les collèges et lycées** », puis un paragraphe :
« Sélectionnez une région, une académie ou un département pour voir les établissements. »
Pas de H1 sur la page (le H2 est le premier titre du contenu). Pas de chapô, pas de
lien vers le jeu, pas de date de mise à jour.

### 2. Le bandeau de filtres — six `ods-select` (`row ods-box ma-blue ma-sticky-filter`)

Fond **bleu pâle**, pleine largeur, deux rangées Bootstrap de trois colonnes
(`col-md-4 ×3` puis `col-md-4, col-md-4, col-md-2`). Chaque select est un
`<ods-select multiple="true">` : un bouton qui ouvre un panneau avec un champ
« **Filtre** », une entrée « **Tous (N options)** », puis les valeurs à cocher, et un
pied « *Aucune option sélectionnée* » / « *N option sélectionnée* — Voir la sélection ·
Effacer la sélection ». **Aucun compteur n'est affiché à côté des valeurs**, alors que
l'API les renvoie (`facetsort=-count` les demande explicitement).

Les six, dans l'ordre du DOM, avec ce qui a été **relevé à l'écran** :

| # | Libellé | Champ facetté | Placeholder | Options annoncées | Tri |
|---|---|---|---|---|---|
| 1 | Région | `region` | « Sélectionner une ou plusieurs régions » | **Tous (20 options)** | `-count` |
| 2 | Académie | `academie` | « Sélectionner une ou plusieurs académies » | **Tous (33 options)** | `-count` |
| 3 | Département | `departement` | « Sélectionner un ou plusieurs départements » | **Tous (100 options)** | `-count` |
| 4 | Langues | `langues` | « Sélectionner une ou plusieurs langues » | **Tous (37 options)** | `-count` |
| 5 | Type d'enseignement des langues | `enseignements` | « Sélectionner un ou plusieurs types d'enseignement » | **Tous (3 options)** | `-count` |
| 6 | Secteur | `secteur` | « Sélectionner le secteur » | **Tous (0 option)** — « Aucune option » | *(pas de sort déclaré)* |

Les listes **exactes** relevées dans le DOM des panneaux ouverts :

- **Région (20)**, dans l'ordre affiché : Ile-de-France · Auvergne-Rhône-Alpes ·
  Hauts-de-France · Grand Est · Nouvelle-Aquitaine · Occitanie ·
  Provence-Alpes-Côte d'Azur · Pays de la Loire · Bretagne · Normandie ·
  Bourgogne-Franche-Comté · Centre-Val de Loire · La Réunion ·
  Collectivités d'outre-mer · Guadeloupe · Corse · Guyane · Martinique · Mayotte ·
  TOM et Collectivités territoriales. **C'est l'ordre décroissant des effectifs**, et
  il correspond exactement au `group_by region order_by count desc` de l'API.
- **Académie (33)** : Versailles · Créteil · Lille · Lyon · Grenoble · Nantes · Rennes ·
  Normandie · Bordeaux · Toulouse · Aix-Marseille · Orléans-Tours · Nancy-Metz · Paris ·
  Montpellier · Strasbourg · Amiens · Nice · Poitiers · Clermont-Ferrand · Dijon · Reims ·
  Besançon · La Réunion · Limoges · Collectivités d'Outre Mer · Guadeloupe · Corse ·
  Guyane · Martinique · Mayotte · Polynésie Française · Nouvelle Calédonie. **33 = tout.**
- **Département (100)** : Nord · Paris · Rhône · Bouches-du-Rhône · Seine-Saint-Denis ·
  Seine-et-Marne · Yvelines · Bas-Rhin · Gironde · Isère · Hauts-de-Seine · Pas-de-Calais ·
  Essonne · Val-de-Marne · Haute-Garonne · Loire-Atlantique · Val-d'Oise · Seine-Maritime ·
  Ille-et-Vilaine · Moselle · … (jusqu'à **Ariège 88**, rang 100). **Le jeu en compte 107 :
  sept manquent.**
- **Langues (37)** : la liste complète, dans l'ordre des effectifs donné plus haut,
  d'Anglais à Ukrainien. **Aucune troncature.**
- **Type d'enseignement (3)** : **LV2 · LV1 · LCA** — dans cet ordre (effectifs
  décroissants), ce qui met LV2 devant LV1. Contre-intuitif mais conforme au tri demandé.
- **Secteur (0)** : le panneau ne contient que « Tous (0 option) » et « **Aucune option** »
  en gris. **Le select est vide.** Cf. « Défauts » n° 1.

**La cascade est réelle et serveur.** Vérifié : après avoir coché « Corse » (208 lignes,
43 établissements), le select **Département** repasse à « **Tous (2 options)** » —
Haute-Corse, Corse-du-Sud — et le select **Langues** à « **Tous (8 options)** » :
Anglais · Italien · Espagnol · Corse · Allemand · Latin · Chinois · Grec. L'italien
remonte deuxième et le corse apparaît : la cascade recalcule bien les effectifs
régionaux. Chaque changement déclenche un appel v1 par facette.

### 3. La carte (`col-md-8 fullcarte`)

```html
<ods-map display-control="false" display-legend="true" location="6,46.81315,1.97754"
         no-refit="true" scroll-wheel-zoom="true" search-box="true"
         toolbar-fullscreen="true" toolbar-geolocation="false">
  <ods-map-layer color-by-field="secteur"
     color-categories="{'Public':'#8FAF89','Privé':'#ED9A9A'}"
     display="categories" show-marker="true" size="2" point-opacity="1"
     title="Offre de formation" tooltip-disabled="true"
     refine-on-click-context="[offredeformationpourdetail]"
     refine-on-click-offredeformationpourdetail-context-field="uai"
     refine-on-click-offredeformationpourdetail-map-field="uai"
     refine-on-click-offredeformationpourdetail-replace-refine="true"
     show-if="…region.length>0 || …academie.length>0 || …departement.length>0">
```

- **Fond** : tuiles Huwise / IGN (« Leaflet | Powered by Huwise - Map data © IGN »),
  plan raster couleur, non atténué.
- **Cadrage initial** : `location="6,46.81315,1.97754"` — zoom 6 sur le centre de la
  France. À l'écran : la métropole entière, plus la Suisse, l'Allemagne du Sud et
  l'Italie du Nord. **Correct** (contrairement aux quatre pages IPS centrées sur Zurich).
  Échelle 50 km à ce zoom une fois la carte redimensionnée.
- **Contrôles** : plein écran, dessin d'un polygone / rectangle / cercle pour filtrer par
  zone (+ « Modifier le filtre par zone » / « Effacer le filtre par zone »), zoom + / −,
  et une **loupe de géocodage** « Rechercher un lieu » posée en haut à gauche **par-dessus
  la carte**. Pas de bouton de géolocalisation (`toolbar-geolocation="false"`), pas de
  sélecteur de couches (`display-control="false"`).
- **Couche** : une seule. `show-if` exige une **région, une académie ou un département** :
  au chargement la carte est **vide** (vérifié : aucun `.leaflet-marker-icon` avant
  sélection). Choisir seulement une **langue**, un **enseignement** ou le **secteur** ne
  fait rien apparaître.
- **`no-refit="true"`** : la carte **ne se recadre jamais**. Vérifié : après avoir coché
  « Corse », la vue est restée sur le centre de la France, avec zéro épingle visible —
  la Corse était hors cadre. L'invite « Sélectionnez une région … pour voir les
  établissements » est donc suivie, à l'écran, de *rien*. Il faut naviguer soi-même
  (molette, ou la loupe « Rechercher un lieu » → « Ajaccio, Corse-du-Sud, France »).
- **Épingles** : marqueurs en goutte, **toutes noires**. La légende annonce vert et rose ;
  aucune épingle ne l'est. Cf. « Défauts » n° 3.
- **Marqueur sélectionné** : l'épingle cliquée passe en **magenta**.
- **Pas d'infobulle au survol** (`tooltip-disabled="true"`) : le clic est la seule
  interaction, et rien ne l'annonce.

### 4. Colonne de droite (`col-md-4`) — deux états exclusifs

**État A, sans sélection** (`ng-if="!…refine.uai"`) : un encadré blanc avec bordure,
titre « **Secteur** » en gras centré, puis deux pastilles carrées et leur libellé :
**■ Public** (vert `#8FAF89`) et **■ Privé** (rose `#ED9A9A`). Ce n'est **pas** un
`ods-map-legend` : c'est du HTML écrit à la main dans le template, avec les couleurs en
dur. Elle ne décrit rien de ce que la carte affiche.

**État B, après clic sur une épingle** (`ng-if="…refine.uai"`) : la légende disparaît et
est remplacée par la fiche de l'établissement. Deux exemples relevés mot pour mot :

> **Collège Laetitia Bonaparte à Ajaccio (6200011T)**
> — carte « **LV1** » : Anglais
> — carte « **LV2** » : Allemand · Corse · Espagnol · Italien

> **Collège Baleone à Sarrola-Carcopino (6200191N)**
> — carte « **LV1** » : Anglais
> — carte « **LV2** » : Corse · Espagnol · Italien

Structure : un H4 `{{libelle}} à {{commune}} ({{uai}})`, puis jusqu'à **quatre cartes**
(`content-card centered-card`, fond lavande) intitulées **LV1**, **LV2**, **LV3**, **LCA**,
dans cet ordre fixe. Chaque carte n'apparaît que si un `ods-adv-analysis`
(`group-by="enseignements" select="(count(langues)) as nb_langues"` sur le contexte
détail) lui donne un compte > 0 ; son contenu est la liste des langues triées
alphabétiquement (`orderBy:'fields.langues'`), une par ligne, **sans puce ni séparateur**.
Sur les deux établissements ouverts, seules LV1 et LV2 étaient présentes.

**Il n'y a aucun moyen de fermer la fiche** : pas de croix, pas de « retour ».
`offredeformationpourdetail.parameters['refine.uai']` n'est jamais remis à `undefined`.
Une fois qu'on a cliqué une épingle, **la légende ne revient plus** pour le reste de la
visite. Vérifié.

**Coût réseau d'un clic** : 5 requêtes, dont **deux strictement identiques**
(`…/search/?…refine.uai=6200011T&rows=200` deux fois) — une par bloc `ods-results`
effectivement rendu (LV1 et LV2), plus le `download` du record cliqué, le `search`
du refine et le `group_by` de `countLangues`.

## Défauts et bizarreries de l'original

1. **Le select « Secteur » est vide.** Le template facette `secteur` ; le champ du jeu
   s'appelle **`secteur_de_l_etablissement`**. Vérifié à l'API v1 :
   `…/search/?dataset=fr-en-offre-langues-2d&rows=0&facet=secteur` renvoie 200 avec
   `nhits: 39 858` et **aucun `facet_groups`** — la facette est silencieusement ignorée.
   Le sixième filtre de la page, celui qui a sa propre colonne et sa propre légende,
   **n'a jamais fonctionné**. Double cause d'ailleurs : même écrit correctement, le champ
   n'est pas dans les six facettes déclarées au back-office (`/facets` sans paramètre
   renvoie `enseignements, langues, departement, region, academie, type_d_etablissement`).

2. **Le select « Département » est plafonné à 100 valeurs sur 107.** « Tous (100 options) »
   affiché à l'écran ; l'API v1 comme la v2.1 renvoient exactement 100 valeurs de facette,
   la dernière étant **Ariège (88)**. Les sept exclus, tous en bas de classement :
   **Creuse (88), Mayotte (85), Lozère (81), Wallis-et-Futuna (14), Polynésie Française
   (13), Saint-Pierre-et-Miquelon (8), Nouvelle Calédonie (5)** — **294 lignes**. Trois
   d'entre eux sont rattrapables par le select Région ou Académie ; la Creuse et la Lozère
   ne le sont que via leur région. Et **rien à l'écran ne signale la troncature** : le
   libellé « Tous (100 options) » se lit comme un total.

3. **La carte ne colore rien, mais une légende affirme le contraire.**
   `color-by-field="secteur"` vise le même champ inexistant que le select. Résultat
   observé à Ajaccio : **toutes les épingles sont noires**. À côté, un encadré écrit à la
   main annonce « Secteur : ■ Public / ■ Privé ». C'est le cas le plus net du corpus d'une
   **légende qui décrit une intention, pas un rendu** — et comme elle est en HTML statique,
   rien ne la fera jamais mentir moins.

4. **`no-refit="true"` contredit l'invite de la page.** « Sélectionnez une région … pour
   voir les établissements » : on sélectionne, et l'écran ne change pas. Vérifié sur la
   Corse. L'utilisateur doit deviner qu'il faut naviguer à la main. Sur une région
   ultramarine, le trajet à la molette depuis le centre de la France est considérable.

5. **La carte est vide au chargement**, et le reste tant qu'on n'a pas choisi une des
   trois facettes géographiques. Choisir « Latin » seul, ou « LCA » seul — c'est-à-dire
   poser la question « où enseigne-t-on encore le latin ? », qui est *la* bonne question
   sur ce jeu — n'affiche **rien**.

6. **Une ligne n'est pas un établissement, et la page ne le dit jamais.** 39 858 lignes,
   9 759 établissements. La carte pose donc jusqu'à 22 épingles superposées au même point
   (UAI `0861273S`), invisibles les unes des autres, et chaque clic en ouvre une au hasard.
   Aucun total n'étant affiché nulle part, l'écart ne peut pas se voir.

7. **Aucun compteur dans les selects**, alors que `facetsort.<champ>=-count` demande
   explicitement le tri par effectif et que la réponse porte les comptes. L'ordre des
   valeurs est donc gouverné par une information que l'utilisateur ne voit pas — d'où
   « LV2 » avant « LV1 », qui paraît arbitraire.

8. **Le filtre par type d'établissement manque**, alors que la facette est déclarée et que
   le titre de la page dit « collèges **et** lycées ». Impossible de ne voir que les lycées.

9. **La fiche de détail ne se ferme pas.** Une fois ouverte, elle occupe définitivement la
   colonne de droite ; la légende est perdue pour la session.

10. **Deux requêtes identiques par clic.** Les blocs LV1/LV2/LV3/LCA déclarent chacun leur
    propre `ods-results` sur le même contexte avec les mêmes paramètres : autant de blocs
    rendus, autant d'appels `rows=200` au même endroit.

11. **Scories du référentiel de langues.** « **Français** » (2), « **Américain** » (1) et
    « **Monégasque** » (1) figurent parmi les 37 « langues » proposées dans le select.
    Aucun nettoyage.

12. **`Grec` sans qualificatif** dans un select où figure « Hébreu **moderne** » : le grec
    du jeu est le grec ancien (il n'apparaît qu'en LCA, 592 lignes, jamais en LV).

13. **Grille Bootstrap 3 dans une page DSFR** (`col-md-8` / `col-md-4`, `ods-box ma-blue`),
    et la loupe de géocodage posée en superposition sur le coin haut-gauche de la carte,
    là où se trouvent aussi les boutons de dessin.

14. **L'URL n'est pas un état partageable** : pas d'`urlsync`. Impossible d'envoyer
    « la carte des collèges qui enseignent le chinois en Gironde ».

## Chronométrage — l'arbitrage d'architecture, mesuré

Le vrai sujet de cette page est : **39 858 lignes, quelle architecture ?**
Mesures faites en Node (`fetch` en série, réseau domestique, 2026-09-10), API v2.1 du
portail avec la clé de lecture publique.

| Stratégie | Allers-retours | Durée | Transféré |
|---|---:|---:|---:|
| **A.** `/records?limit=100`, en série, jeu complet | **échec à la 101ᵉ** | 10,5 s pour 10 000 lignes | 4,6 Mo |
| **B.** `/exports/json?limit=-1` | **1** | **3,1 s** | 18,2 Mo |
| **B'.** `/exports/json?limit=-1&select=` (11 champs sur 15) | 1 | **5,9 s** | 14,1 Mo |
| **C.** `/records?limit=100` sur une seule région (Ile-de-France, 7 291 l.) | **73** | **8,1 s** | 3,3 Mo |
| **C'.** `/exports/json` sur la même région | **1** | **1,2 s** | 3,3 Mo |

Détail de A : médiane **83 ms** par requête, p90 148 ms, min 71 ms, max 590 ms.

Trois enseignements, tous vérifiés :

1. **La pagination `/records` ne peut pas charger ce jeu — c'est une limite dure de
   l'API ODS, pas de `dsfr-data`.** À l'offset 10 000, l'API répond **HTTP 400** :
   > `InvalidRESTParameterError — Invalid value for sum of offset + limit API parameter:
   > 10100 was found but <= 10000 is expected.`

   Un `dsfr-data-source max-records="40000"` en mode adaptateur ODS **échouerait à la
   101ᵉ requête**, quoi qu'on écrive. Le seul chemin vers le jeu complet est
   `/exports/json` en source générique (`url=` + `params`).

2. **C'est bien le nombre d'allers-retours qui coûte, pas le poids.** Ile-de-France :
   même 3,3 Mo, **8,1 s en 73 requêtes contre 1,2 s en une seule** — un facteur **6,8**.
   La latence médiane de 83 ms multipliée par le nombre de pages domine tout.

3. **Le piège maison du `select` est confirmé, et il mord ici.** B' écarte `adresse`
   (le seul champ texte long du jeu) : **4,1 Mo de moins, et 2,8 s de plus**. Poser un
   `select` sur cette source est un contresens : soit on prend tout, soit on ne prend rien.

**Conclusion opérationnelle** : pour reproduire cette page, deux architectures tiennent,
et une seule est bonne selon l'usage.
- *Annuaire filtré* (l'usage réel de la page) → **`server-side` + `server-facets`** :
  on ne charge jamais plus qu'une page de résultats, la cascade est calculée par le
  serveur, et le plafond des 10 000 n'est jamais atteint puisqu'on ne pagine pas au-delà
  de quelques pages. C'est la voie retenue dans l'esquisse.
- *Géographie de l'offre* (la page que le jeu mérite : « où enseigne-t-on le latin ? »)
  → **`/exports/json` en une requête, 3,1 s**, puis tout côté client. À réserver au cas
  où l'on veut réellement les 39 858 lignes en mémoire.

## Transposition vers `dsfr-data`

Attributs vérifiés dans les références générées depuis le source
(`get_skill(dsfrDataSource|dsfrDataFacets|dsfrDataMap|dsfrDataSearch|dsfrDataDisplay,
"reference")` et `get_skill(attributeGrammars, "guide")`). Ce qui n'a pas été vérifié
est signalé.

| Original Opendatasoft | `dsfr-data` | Attributs nécessaires |
|---|---|---|
| `<ods-dataset-context context="offredeformation" …-dataset="fr-en-offre-langues-2d">` | `<dsfr-data-source>` | `api-type="opendatasoft"`, `base-url="https://data.education.gouv.fr"`, `dataset-id="fr-en-offre-langues-2d"`, `server-side`, `page-size`. Le portail répond en anonyme : **pas d'`api-key-ref`**. |
| Le second contexte `offredeformationpourdetail` | **aucun** | Inutile. La popup de `dsfr-data-map-layer` reçoit le record cliqué ; le regroupement LV1/LV2/LV3/LCA se fait sur les lignes déjà chargées, sans second contexte ni second aller-retour. C'est un artefact du modèle ODS (un contexte = un jeu de paramètres). |
| `<ods-select>` × 5 (région, académie, département, langues, enseignements) | **un seul** `<dsfr-data-facets>` | `server-facets` (la cascade native), `fields="region, academie, departement, langues, enseignements, type_d_etablissement, secteur_de_l_etablissement"` (**virgules**), `labels="region:Région \| academie:Académie \| …"` (**barres**), `display="region:multiselect \| academie:multiselect \| departement:multiselect \| langues:multiselect \| enseignements:checkbox \| …"` (**barres**), `disjunctive="langues, enseignements"` (virgules), `sort="count:desc"`, `cols="…"`. `fields` est **obligatoire** en `server-facets`. |
| Multi-sélection des `ods-select` | `display="champ:multiselect"` | Le tableau de `attributeGrammars` est explicite : `multiselect` = dropdown repliable avec cases à cocher et « tout sélectionner » — c'est l'équivalent exact de l'`ods-select multiple="true"`. **`radio` serait faux** (choix unique) et **`select` aussi** (choix unique en ligne). |
| Le champ « Filtre » dans chaque panneau | `searchable="departement, langues, commune"` | Barre de recherche par facette (virgules). |
| Le select « Secteur » **vide** | même `<dsfr-data-facets>` | `fields="… , secteur_de_l_etablissement"`. **Vérifié à l'API** : `/api/explore/v2.1/…/facets?facet=secteur_de_l_etablissement` renvoie bien `Public 29 467 / Privé 10 278`, alors que la facette n'est **pas** déclarée au back-office. La v2.1 calcule une facette à la demande ; le bug de l'original est un nom de champ, pas une limite. **Non vérifié dans une page `dsfr-data`** : à confirmer que l'adaptateur passe bien `facet=` pour un champ non déclaré. |
| — (absent) filtre collège / lycée | même `<dsfr-data-facets>` | `type_d_etablissement` : la facette **est** déclarée, il suffit de la lister. |
| `<ods-map location="6,46.81,1.98" no-refit search-box>` | `<dsfr-data-map>` | `center="46.6,2.3"`, `zoom="6"`, `height`, `tiles="ign-plan"`, `tiles-style="muted"`, `name` (nom accessible), `fit-bounds`, `fit-max-zoom="12"`, **`fit-zone="none"`**. `no-refit` est le défaut inverse : `fit-bounds` est à `false` par défaut, donc **ne rien écrire reproduit le défaut de l'original** ; c'est en le posant qu'on le corrige. |
| Encarts ultramarins | `insets="drom"` sur `<dsfr-data-map>` | Le jeu **a** des points ultramarins (La Réunion 495, Guadeloupe 213, Guyane 201, Martinique 181, Mayotte 85, plus Polynésie / Nouvelle-Calédonie / Wallis / SPM). Attention au piège inverse : `insets` **impose par défaut** un `fit-zone` métropole (référence de `fit-zone`), donc filtrer sur La Réunion ne recadrerait sur rien. `fit-zone="none"` lève le clip. |
| `<ods-map-layer color-by-field="secteur" color-categories="{…}" display="categories">` | `<dsfr-data-map-layer>` | `source`, `type="marker"`, `geo-field="position"`, **`color-field="secteur_de_l_etablissement"`**, **`color-map="Public:#18753C,Privé:#E4794A"`** (paires `valeur:#couleur` séparées par des **virgules** — pas de barres ici), `cluster`, `max-items="20000"`, `tooltip-field="libelle"`. Le champ correct fait fonctionner ce que l'original annonce sans le faire. |
| L'encadré « Secteur / Public / Privé » écrit à la main | `<dsfr-data-map-legend>` | `for`, `label="Secteur"`. `getLegendEntries()` retourne les paires de `color-map` : **la légende est dérivée du rendu**, donc elle ne peut pas mentir. C'est exactement le défaut n° 3 qui disparaît par construction. |
| `show-if="region||academie||departement"` | **rien** | Pas d'équivalent, et il n'en faut pas : avec `cluster` et `server-side`, la carte peut afficher la France entière dès le chargement. Le `show-if` est un contournement de performance d'ODS, pas une fonctionnalité. |
| `refine-on-click` + colonne de droite | `<dsfr-data-map-popup>` + `<template>` | `mode="panel-right"`, `title-field="libelle"`, `width="380px"`. Le clic fournit le record ; **mais** un record = une ligne = **une** langue, pas les quatre cartes LV1/LV2/LV3/LCA. Cf. « Limites » n° 1. |
| `tooltip-disabled="true"` | `tooltip-field="libelle"` | On fait l'inverse : un survol qui nomme l'établissement, ce que l'original refuse. |
| La loupe « Rechercher un lieu » | **écart assumé** | Aucun attribut de géocodage dans la référence de `dsfr-data-map`. Substitut fonctionnel : la facette `commune` en `multiselect searchable`, plus lisible qu'un géocodeur pour ce besoin. |
| Le dessin de zone (polygone / rectangle / cercle) | **écart assumé** | Aucun attribut de dessin. Remplacé par les facettes géographiques. |
| — (absent de l'original) | `<dsfr-data-kpi>` × 3 | `value="meta:total"` (le compte serveur, `count` ne compterait que la page), `format="nombre"`, `heading`, `label`. Le nombre de lignes, le nombre d'établissements, le nombre de langues — trois chiffres que la page n'affiche jamais. |
| — (absent de l'original) | `<dsfr-data-a11y>` | `table`, `download`, `for`, `filename`. Tableau accessible et export CSV de la sélection : la page d'origine n'a ni l'un ni l'autre. |

### Esquisse de code

```html
<!-- 39 858 lignes = 9 759 établissements × leurs langues.
     server-side : on ne charge jamais plus d'une page. Charger tout par /records est
     IMPOSSIBLE (HTTP 400 à offset 10 000, mesuré) ; le jeu complet ne s'obtient qu'en
     source générique sur /exports/json (1 requête, 3,1 s, 18,2 Mo). -->
<dsfr-data-source id="langues"
  api-type="opendatasoft"
  base-url="https://data.education.gouv.fr"
  dataset-id="fr-en-offre-langues-2d"
  where="position is not null"
  server-side page-size="100">
</dsfr-data-source>

<div class="fr-container fr-mt-6w">
  <h1>Offre de langues dans les collèges et lycées</h1>
  <p class="fr-text--lead">
    9 759 collèges et lycées, 37 langues, 39 858 offres d'enseignement.
    Une ligne du jeu est un couple établissement × langue × niveau : un même
    établissement peut apparaître jusqu'à 22 fois.
  </p>

  <dsfr-data-facets id="f" source="langues" server-facets
    fields="region, academie, departement, commune, langues, enseignements, type_d_etablissement, secteur_de_l_etablissement"
    labels="region:Région | academie:Académie | departement:Département | commune:Commune | langues:Langue | enseignements:Niveau d'enseignement | type_d_etablissement:Type d'établissement | secteur_de_l_etablissement:Secteur"
    display="region:multiselect | academie:multiselect | departement:multiselect | commune:multiselect | langues:multiselect | enseignements:checkbox | type_d_etablissement:checkbox | secteur_de_l_etablissement:checkbox"
    disjunctive="langues, enseignements"
    searchable="departement, commune, langues"
    sort="count:desc" cols="3">
  </dsfr-data-facets>

  <dsfr-data-kpi-group class="fr-my-3w">
    <!-- meta:total = compte serveur. `count` ne compterait que la page reçue. -->
    <dsfr-data-kpi source="f" value="meta:total" format="nombre" col="4"
      heading="Sélection" label="offres d'enseignement"></dsfr-data-kpi>
    <dsfr-data-kpi source="f" value="langues:distinct" format="nombre" col="4"
      heading="Langues" label="distinctes"></dsfr-data-kpi>
    <!-- ⚠ `langues:distinct` NON VÉRIFIÉ : l'agrégat distinct n'est pas dans la
         référence du KPI. Piège maison connu — le contournement documenté est un
         dsfr-data-query group-by="langues" + value="count". -->
  </dsfr-data-kpi-group>

  <dsfr-data-map id="carte" name="Établissements et langues enseignées"
    center="46.6,2.3" zoom="6" height="640px"
    tiles="ign-plan" tiles-style="muted"
    fit-bounds fit-max-zoom="12" fit-zone="none">
    <dsfr-data-map-layer id="etabs" source="f" type="marker"
      geo-field="position"
      color-field="secteur_de_l_etablissement"
      color-map="Public:#18753C,Privé:#E4794A"
      tooltip-field="libelle"
      cluster cluster-radius="60" max-items="20000">
    </dsfr-data-map-layer>
    <dsfr-data-map-legend for="etabs" label="Secteur"></dsfr-data-map-legend>
    <dsfr-data-map-popup for="etabs" mode="panel-right" title-field="libelle" width="380px">
      <template>
        <p class="fr-badge fr-badge--sm">{{type_d_etablissement|type non renseigné}}</p>
        <p class="fr-text--sm fr-mb-1v"><strong>{{commune}}</strong> — {{departement}},
           académie de {{academie}}</p>
        <p class="fr-text--sm fr-mb-2v">{{adresse|adresse non renseignée}}</p>
        <p class="fr-highlight">{{enseignements}} · <strong>{{langues}}</strong></p>
        <p class="fr-text--xs">UAI {{uai}}</p>
      </template>
    </dsfr-data-map-popup>
  </dsfr-data-map>

  <dsfr-data-a11y source="f" for="carte" table download
    filename="offre-langues.csv"
    label="Données de la carte"
    label-field="libelle"
    value-field="commune, departement, academie, enseignements, langues, secteur_de_l_etablissement">
  </dsfr-data-a11y>
</div>
```

## Limites et points durs identifiés

1. **La fiche « LV1 / LV2 / LV3 / LCA » ne se transpose pas telle quelle — et c'est le
   seul vrai point dur de la page.**
   *Obstacle* : la popup de `dsfr-data-map-layer` reçoit **un** record, c'est-à-dire une
   seule paire (niveau, langue). Le bloc de droite de l'original agrège les **jusqu'à 22
   lignes** de l'établissement et les regroupe par `enseignements`. La référence de
   `dsfr-data-map-popup` n'expose que `title-field`, `mode`, `width` et un `<template>`
   interpolé sur un record : **aucun mécanisme de regroupement**.
   *Voie native essayée* : (a) `dsfr-data-normalize split` — inapplicable, les langues
   sont sur des **lignes** distinctes, pas dans une colonne multivaluée ; (b) un
   `dsfr-data-query group-by="uai,enseignements"` en amont de la couche — ça produit bien
   un record par établissement × niveau, mais **la carte n'aurait plus qu'un point par
   niveau** et perdrait la liste des langues (l'agrégat ne concatène pas) ; (c) la
   grammaire de `group-by` avec une fonction ODSQL est le piège PG-014 du dépôt, sans
   rapport ici.
   *Contournement envisagé* : **assumer un autre découpage**. La popup montre
   l'établissement et **la** ligne cliquée ; le détail complet va dans un
   `<dsfr-data-display>` sous la carte, alimenté par un `dsfr-data-source` distinct
   `where="uai = '…'"` — mais rien ne relie nativement un clic carte à une seconde source
   (c'est exactement le `refine-on-click` d'ODS, qui n'a pas d'équivalent déclaratif).
   *Verdict honnête* : **c'est un manque de `dsfr-data`, pas un contresens de
   transposition.** Un « cliquer un point pour refiner une autre source » est un besoin
   général, et le seul chemin actuel est du JavaScript sur l'événement de la couche.
   **Non vérifié au navigateur.**

2. **Charger le jeu complet par l'adaptateur ODS est impossible — mais ce n'est pas
   `dsfr-data`.** `max-records="40000"` sur un `dsfr-data-source api-type="opendatasoft"`
   déclencherait un `fetchAll` en boucle de 100 en 100 ; **l'API refuse au-delà de
   `offset + limit > 10 000`** (HTTP 400, message cité plus haut). La bibliothèque n'y
   peut rien. *Voie native* : `server-side` (retenue), ou une source générique
   `url="…/exports/json" params='{"limit":-1}'` — 1 requête, 3,1 s mesurées — au prix de
   la perte de `server-facets` et de `meta:total`. **L'arbitrage est tranché par l'usage,
   pas par la performance.**

3. **Le plafond de 100 valeurs de la facette `departement`.** Il vient de l'API ODS, pas
   du widget : la v1 comme la v2.1 s'arrêtent à 100. `server-facets` hériterait donc du
   même plafond. *Voie native à essayer avant de conclure* : (a) `searchable="departement"`
   — la barre de recherche filtre les valeurs **déjà reçues**, donc elle ne récupère pas
   les 7 manquants ; (b) la **cascade** : choisir la région « Collectivités d'outre-mer »
   fait redescendre la liste des départements sous 100, et Wallis-et-Futuna, la Polynésie,
   Saint-Pierre-et-Miquelon et la Nouvelle-Calédonie réapparaissent — **c'est la vraie
   réponse, et elle est native**. (c) En dernier recours, `static-values` avec les 107
   valeurs codées en dur (au prix des compteurs). **Non vérifié dans une page
   `dsfr-data`** ; la cascade est vérifiée sur l'original (Corse → 2 départements).

4. **La double lecture « ligne » / « établissement ».** `meta:total` compte les lignes
   (39 858), ce que veut la barre de résultats ; le nombre d'**établissements** (9 759)
   demande un `count(distinct uai)` que la référence du KPI n'expose pas — c'est le piège
   maison « pas d'agrégat `distinct` », dont le contournement documenté est un
   `dsfr-data-query group-by="uai"` puis `value="count"`. Sur une source `server-side`
   ce détour ne suit pas la sélection. *Arbitrage* : afficher franchement « N offres
   d'enseignement » plutôt qu'un nombre d'établissements faux — ce que l'original évite
   en n'affichant aucun nombre du tout.

5. **`insets="drom"` et le clip du `fit-bounds`.** Le jeu est massivement ultramarin, donc
   les encarts se justifient ; mais la référence de `fit-zone` prévient qu'un encart
   impose par défaut un clip métropole. Filtrer sur « La Réunion » ne recadrerait alors
   sur rien (variante de BUG-004). `fit-zone="none"` lève le clip. **Non vérifié au
   navigateur.** Rappel du piège inverse (BUG-004) : sans DROM dans la sélection,
   `fit-bounds` + `max-bounds` peut rendre un cadrage vide.

6. **Ce qui ne se transpose pas et n'a pas à l'être.**
   - Le **second contexte** `offredeformationpourdetail` : un artefact du modèle ODS.
   - Le **`show-if`** de la couche : un contournement de performance, remplacé par
     `cluster` + `server-side`.
   - Les **outils de dessin de zone** et le **géocodeur** : écarts assumés, remplacés par
     les facettes géographiques (référence de `dsfr-data-map` : aucun attribut de dessin
     ni de géocodage).
   - Le **`no-refit`** : c'est un défaut, pas une fonctionnalité.

7. **Point dur d'énoncé plutôt que technique.** La page traite un jeu qui décrit
   *l'offre linguistique de la France* comme un annuaire au clic. La reproduire à
   l'identique, c'est reproduire l'absence de tout chiffre. Une transposition honnête
   ajoute au moins : la répartition des 37 langues, la part de l'allemand par académie,
   et le compte des établissements offrant plus de trois langues — tout est dans le jeu,
   rien n'est dans la page.

## Données à reproduire fidèlement

- [ ] Jeu `fr-en-offre-langues-2d` — **39 858 lignes** pour **9 759 établissements**,
      **3 795 communes**, **107 départements**, **33 académies**, **20 régions**.
- [ ] Enseignements : LV2 **24 256** · LV1 **13 346** · LCA **2 256** ; LCA = Latin 1 664
      + Grec 592 **et rien d'autre**.
- [ ] Les **37 langues** avec leurs effectifs exacts (Anglais 12 495 en tête,
      Ukrainien / Tamoul / Suédois / Monégasque / Danois / Américain à 1 en queue).
- [ ] Secteur : Public **29 467** · Privé **10 278** · non renseigné **113** — et **le
      filtre doit fonctionner**, contrairement à l'original.
- [ ] Facette Département : **107** valeurs, pas 100. C'est le test qui distingue une
      reproduction d'un décalque.
- [ ] Filtre par type d'établissement : Collège **24 779** · Lycée **15 077**.
- [ ] Cascade serveur vérifiable : Corse → **2** départements et **8** langues
      (Anglais, Italien, Espagnol, Corse, Allemand, Latin, Chinois, Grec).
- [ ] Fiche établissement : le regroupement **LV1 / LV2 / LV3 / LCA** avec les langues
      triées alphabétiquement dans chaque bloc — c'est l'apport réel de l'original.
      Contrôle : Collège Laetitia Bonaparte, Ajaccio (6200011T) → LV1 Anglais ;
      LV2 Allemand, Corse, Espagnol, Italien.
- [ ] Épingles **effectivement colorées** par secteur, et une légende dérivée du rendu.
- [ ] Carte **non vide au chargement** et **qui se recadre** sur la sélection.
- [ ] 197 lignes sans position : les exclure explicitement et le dire.
