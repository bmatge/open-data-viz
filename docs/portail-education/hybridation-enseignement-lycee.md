# Hybridation de l'enseignement en lycée — par collectivité

- **URL du catalogue** (entrée n° 24) : https://data.education.gouv.fr/explore/dataset/fr-en-hybridation_lycees_par_collectivite/custom/
  → **302** vers `https://data.education.gouv.fr/explore/assets/fr-en-hybridation_lycees_par_collectivite/` (page d'actif du jeu).
- **URL réelle de la dataviz** : **`https://data.education.gouv.fr/explore/assets/visualisation-fr-en-hybridation_lycees_par_collectivite/view/`**
  (le lien est donné en tête de la description du jeu : « Cet actif a été lié à l'actif suivant : … - Visualization »).
  Le lien du catalogue **n'est donc pas mort** : il mène à l'actif, qui mène à la vue.
- **Id catalogue** : 24 · **Thématique** : Éducation · **Sous-thématique** : Lycées · **Filtre** : aucun.
- **Nature de la cible** — ⚠️ **ni page AngularJS `/pages/`, ni page ODS Studio.** C'est une
  **vue personnalisée ODS héritée** (« custom view », slug de vue `custom`).
  `GET /api/portal/v1.0/studio_pages/` (23 pages) ne la connaît pas ; `/api/datasets/1.0/<jeu>/`
  **expurge** `extra_metas`. La configuration complète (HTML AngularJS + CSS + gabarit
  d'infobulle) vit dans **`extra_metas.visualization`** du jeu et se récupère ainsi :

  ```bash
  curl -sL --compressed \
    "https://data.education.gouv.fr/explore/embed/dataset/fr-en-hybridation_lycees_par_collectivite/custom/" \
    | grep -o 'ctx-dataset-schema="[^>]*"'      # JSON échappé (HTML + \{ \}) — désechapper en Node/Python
  ```

  L'URL `/explore/embed/dataset/<jeu>/<slug-de-vue>/` **ne redirige pas**, contrairement à
  `/explore/dataset/…`. Archivé dans `docs/portail-education/_sources/fr-en-hybridation_lycees_par_collectivite.customview.json`.
- **Relevé visuel** : 2026-09-10, Chrome (extension), viewport 1568 × 751 puis 1440 × 690.

## Jeux de données

| Jeu | Lignes | Champs | Géo | Rôle |
|---|---:|---:|---|---|
| `fr-en-hybridation_lycees_par_collectivite` | **19** | 12 | **`geo_shape`** + `position_commune_siege` | choroplèthe (couche 1) |
| `fr-en-hybridation_lycees_par_lycee` | **1 713** | 14 | `position` | points de détail (couche 2, à partir du zoom 7) |
| `georef-france-region` (`public.opendatasoft.com`) | 26 | — | — | **contexte déclaré et jamais utilisé** par aucune couche |

`fr-en-hybridation_lycees_par_collectivite` — Licence Ouverte v2.0 (Etalab), producteur
**DNE — Ministère de l'Éducation Nationale**, `visibility: domain`, données modifiées le
2026-02-02. API ouverte (clé publique du portail acceptée, `Authorization: Apikey …`).

**Champs de la collectivité** : `code_region`, `region_ou_drom_com`,
`raison_sociale_du_signataire_de_la_convention`, `siren_signataire_de_la_convention`,
`code_commune_siege`, `nom_officiel_commune_siege`, `nombre_total_de_lycees` (int),
`nombre_total_divisions_de_classes_de_lycees` (int), `depenses_realisees_par_la_collectivite`
(double), `montant_de_la_subvention` (double), `geo_shape` (geo_shape),
`position_commune_siege` (geo_point_2d).

**Facettes déclarées au back-office** (`asset_content_configuration.facets`) :
`region_ou_drom_com`, `raison_sociale_du_signataire_de_la_convention`,
`siren_signataire_de_la_convention`, toutes en `facetsort: alphanum`.
**Elles ne sont pas rendues** : la page d'actif « Visualization » n'affiche pas de colonne
de facettes pour cette vue-là (contrairement à Euroscol — voir cette fiche).

### Le `geo_shape` : ce qu'il contient exactement

C'est le point qui rend cette cible unique dans le catalogue. **Mesuré** :

| Mesure | Valeur |
|---|---|
| `/exports/geojson?limit=-1` | **19 features**, 221 Ko brut, **103 Ko gzip**, **0,14 s** (3 mesures : 0,144 / 0,142 / 0,142) |
| `/exports/json?limit=-1` | 105 Ko gzip, 0,42 s — `geo_shape` y est un **objet `{"type":"Feature","geometry":{…},"properties":{}}`**, pas une géométrie nue |
| Sommets par région | 10 (Saint-Martin) à **641** (Nouvelle-Aquitaine) — géométries **déjà simplifiées** |
| Types | 9 `Polygon`, 10 `MultiPolygon` |

Autrement dit : **le fond de carte régional voyage avec la donnée**, pour 103 Ko et un seul
aller-retour. C'est le seul jeu du portail Éducation dans ce cas ; tous les autres n'ont
qu'un `position` (points).

### Les 19 lignes (relevé API, tri par subvention décroissante)

| `code_region` | Région / COM | Signataire | Lycées | Divisions | Dépenses (€) | Subvention (€) | Classe |
|---|---|---|---:|---:|---:|---:|---|
| 11 | Île-de-France | REGION ILE DE FRANCE | 194 | 6 005 | 8 456 651,18 | **3 900 000,00** | rouge |
| 84 | Auvergne-Rhône-Alpes | REGION AUVERGNE-RHONE-ALPES | 278 | 7 215 | 5 010 621,89 | 2 308 000,00 | rouge |
| 32 | Hauts-de-France | REGION HAUTS-DE-FRANCE | 243 | 6 159 | 4 769 147,43 | 1 912 000,00 | rouge |
| 75 | Nouvelle-Aquitaine | REGION NOUVELLE-AQUITAINE | 298 | 6 457 | 2 902 111,74 | 1 451 055,87 | rouge |
| 53 | Bretagne | REGION BRETAGNE | 97 | 2 395 | 1 945 151,33 | 970 000,00 | orange |
| 52 | Pays de la Loire | REGION DES PAYS DE LA LOIRE | 107 | 2 858 | 1 857 466,14 | 928 733,07 | orange |
| 27 | Bourgogne-Franche-Comté | REGION BOURGOGNE-FRANCHE-COMTE | 108 | 2 745 | 1 025 357,78 | 512 678,89 | orange |
| 44 | Grand Est | REGION GRAND EST | 66 | 1 814 | 838 610,45 | 419 305,23 | orange |
| 24 | Centre-Val de Loire | REGION CENTRE-VAL DE LOIRE | 59 | 1 814 | 752 138,25 | 376 069,12 | orange |
| 76 | Occitanie | REGION OCCITANIE | 195 | 5 906 | 717 337,29 | 358 668,64 | orange |
| 93 | Provence-Alpes-Côte d'Azur | REGION PROVENCE-ALPES-COTE D'AZUR | 82 | 2 649 | 372 401,87 | 186 200,94 | jaune |
| 06 | Mayotte | RECTORAT DE L'ACADEMIE DE MAYOTTE | 11 | 666 | 351 434,54 | 174 000,00 | jaune |
| 02 | Martinique | COLLECTIVITE TERRITORIALE DE MARTINIQUE | 23 | 537 | 276 971,00 | 138 485,50 | jaune |
| 03 | Guyane | COLLECTIVITE TERRITORIALE DE GUYANE | 15 | 591 | 252 958,18 | 126 479,09 | jaune |
| 01 | Guadeloupe | CONSEIL REGIONAL DE LA GUADELOUPE | 10 | 290 | 203 804,69 | 101 902,34 | jaune |
| 94 | Corse | COLLECTIVITE DE CORSE | 13 | 357 | 129 708,00 | 64 854,00 | vert |
| **00** | Saint-Martin | COLLECTIVITE DE SAINT MARTIN | 2 | 77 | 22 450,00 | 11 225,00 | vert |
| **00** | Wallis et Futuna | VICE-RECTORAT DE WALLIS-ET-FUTUNA | 1 | 17 | 8 285,30 | 4 142,65 | vert |
| **00** | Saint-Pierre et Miquelon | SERVICE DE L'EDUCATION NATIONALE SAINT-PIERRE-… | 1 | 7 | 7 892,00 | **3 710,50** | vert |
| | **Total** | | **1 803** | **48 559** | **29 900 499,06** | **13 947 510,84** | |

**Trois lignes portent le même `code_region = "00"`** (Saint-Martin, Wallis-et-Futuna,
Saint-Pierre-et-Miquelon) : ce champ n'est pas une clé. Ici sans conséquence — la couleur
vient de la géométrie portée par la ligne, pas d'une jointure sur le code.

**Régions absentes du jeu** (vérifié : 19 lignes, pas de Normandie) :
**Normandie (28)**, **La Réunion (04)**, Nouvelle-Calédonie, Polynésie française,
Saint-Barthélemy. Il y a donc **12 régions métropolitaines sur 13**.

## Objectif de la dataviz et informations véhiculées

- **Question** : « Quelles collectivités ont signé la convention "hybridation de
  l'enseignement en lycée" du plan de relance, combien ont-elles touché, et quels lycées
  sont concernés ? »
- **Message porté** : la mesure est portée par les **régions** (une convention par région
  académique ou COM), les montants suivent grossièrement le nombre de lycées, et le
  financement d'État couvre à peu près **la moitié** de la dépense engagée
  (13,9 M€ de subvention pour 29,9 M€ dépensés — ratio jamais affiché sur la page).
- **Ce que l'utilisateur doit obtenir** : (a) au niveau régional, la subvention, la dépense,
  le nombre de lycées et de divisions ; (b) en zoomant, l'implantation de chaque lycée
  bénéficiaire et son nombre de classes.
- **Ce qui n'est pas dans l'objet** :
  - **aucun taux de couverture** (subvention / dépense), alors que les deux nombres sont
    dans l'infobulle, côte à côte ;
  - **aucune normalisation** : pas de « € par division », qui est pourtant la seule lecture
    comparable entre l'Île-de-France (6 005 divisions) et Saint-Pierre-et-Miquelon (7) ;
  - aucun total national, aucun KPI, aucun graphique, aucun tableau, aucun filtre ;
  - aucune date, aucune période — le texte du jeu parle des CPER 2021-2027, la page non.

## Relevé visuel exhaustif, bloc par bloc

La page est **un seul bloc** : un titre, une phrase, une carte, une légende. Pas de filtre,
pas de KPI, pas de graphique.

### 0. Chrome de page (front-office ODS « asset viewer »)

En-tête DSFR « GOUVERNEMENT » + « data.education.gouv.fr », boutons **Connexion** /
**Inscription** (magenta), menu horizontal *Données · Data-visualisations · Démarche ·
Créer une carte · Créer un graphique · Nous contacter*. Fil d'Ariane
« Catalogue › Visualisation - Hybridati… › **Consultation** ».
H1 : « **Visualisation - Hybridation de l'enseignement en lycée - par collectivité** »
(le titre du catalogue dit « Hybridation de l'enseignement en lycée » ; le H2 du bloc dit
encore autre chose — voir Défauts). Une seule icône à droite : **signet**.
Pied de page DSFR + **bulle de chat magenta** flottante en bas à droite, qui recouvre en
permanence le coin inférieur droit de la carte (donc l'attribution et une partie de la
légende).

### 1. Titre et chapeau du bloc

- H2 : « **Subventions par collectivité** » (c'est `custom_view_title`).
- Texte nu, sans balise : « **Zoomez pour avoir le détail par lycée** ».

### 2. La carte

`<ods-map display-control="false" location="5,46,6" no-refit="true" scroll-wheel-zoom="true"
search-box="false" toolbar-fullscreen="true" toolbar-geolocation="true">`

- **Moteur : Leaflet** (attribution lue à l'écran : « Leaflet | Powered by **Huwise** -
  Map data © **IGN** »). Pas MapLibre — contrairement aux pages Studio du portail
  (cf. fiche `annuaire-des-internats.md`, où les popups sont des `.maplibregl-popup`).
- **Cadrage figé** : `location="5,46,6"` = zoom 5, centre 46 °N / 6 °E, et `no-refit="true"`.
  À l'écran, la France occupe le tiers gauche du cadre ; les deux tiers droits vont de
  l'Allemagne à l'Ukraine. **Aucun des 7 territoires ultramarins (Guadeloupe, Martinique,
  Guyane, Mayotte, Saint-Martin, Saint-Pierre-et-Miquelon, Wallis-et-Futuna) n'est visible
  à l'ouverture** — leurs polygones existent mais sont hors cadre.
- **Hauteur** : aucune (`style` absent, contrairement à la vue SNEE qui pose 500 px). Le
  bloc prend la hauteur que lui donne le conteneur du visualiseur : à l'écran, un bandeau
  de ~430 px de haut sur toute la largeur, soit un rapport ~3,6:1 très étiré.
- **Contrôles observés** : plein écran (coin haut gauche), **trois outils de dessin**
  (polygone / rectangle / cercle) + modifier / effacer, `+` / `−`, loupe (recherche de lieu),
  géolocalisation, sélecteur de fond de carte (coin bas gauche) — alors même que
  `display-control="false"`. Le zoom molette est actif (`scroll-wheel-zoom="true"`).

#### Couche 1 — choroplèthe des collectivités

```
<ods-map-layer context="hybridationparcollectivite" display="choropleth"
  color-by-field="montant_de_la_subvention"
  color-numeric-range-min="3710.5"
  color-numeric-ranges="{'100000':'#19630A','300000':'#F7B133','1000000':'#F98C44','10000000':'#E5352E'}"
  color-out-of-bounds="#C0C5CC" color-undefined="#969FAA"
  border-color="#FFFFFF" border-opacity="1" border-pattern="solid" border-size="1"
  shape-opacity="0.95" caption="true" picto="ods-circle" point-opacity="1"
  show-marker="false" size="4"
  title="Hybridation de l'enseignement en lycée - par collectivité">
```

- Le champ géographique n'est pas nommé : ODS prend le `geo_shape` du jeu.
- `color-numeric-range-min="3710.5"` est **exactement le minimum du jeu** (Saint-Pierre-et-
  Miquelon). Les clés de `color-numeric-ranges` sont des **bornes supérieures** :
  **4 classes** — 3 710,5→100 000 vert `#19630A` (4 régions), 100 000→300 000 jaune `#F7B133`
  (5), 300 000→1 000 000 orange `#F98C44` (6), 1 000 000→10 000 000 rouge `#E5352E` (4).
  Aucune valeur ne sort des bornes : `color-out-of-bounds` et `color-undefined` ne servent
  jamais.
- **Vérifié à l'écran** : Corse vert ; PACA jaune ; Bretagne, Pays de la Loire, Grand Est,
  Centre-Val de Loire, Occitanie, BFC orange ; Île-de-France, ARA, Hauts-de-France,
  Nouvelle-Aquitaine rouge. **Et un trou blanc à la place de la Normandie**, où le fond IGN
  apparaît nu entre la Bretagne et les Hauts-de-France.
- `show-marker="false"` : pas de marqueur au centroïde, seulement le polygone.

**Infobulle de la collectivité** (`map_tooltip_html`, au clic ; `map_tooltip_html_enabled: true`) —
relevée mot pour mot sur la Bretagne :

```
REGION BRETAGNE
Dépenses réalisées par la collectivité : 1945151.33 €
Montant de la subvention : 970000 €
Nombre de lycées : 97
Nombre de divisions (classes) de lycée : 2395
Région : Bretagne
```

Le titre est `raison_sociale_du_signataire_de_la_convention` en gras 17 px. **Aucun filtre
de formatage** : `1945151.33 €` sort tel quel du flottant, sans séparateur de milliers ni
décimales normalisées. Le clic déclenche l'`autoPan` de Leaflet, qui déplace la carte.

#### Couche 2 — lycées bénéficiaires

```
<ods-map-layer context="frenhybridationlyceesparlycee" display="raw"
  color="#2C3F56" show-zoom-min="7"> … template … </ods-map-layer>
```

- `display="raw"` : **pas de cluster**, un cercle bleu ardoise `#2C3F56` par lycée.
- `show-zoom-min="7"` : la couche apparaît au zoom 7 (**vérifié** : invisible aux zooms 5-7
  sur les Hauts-de-France, visible ensuite, en pastilles serrées qui masquent totalement le
  polygone rouge en dessous dans la conurbation lilloise).
- **Infobulle du lycée**, relevée mot pour mot :

```
Lycée professionnel du professeur Clerc
Nombre de classes : 17
Région : Hauts-de-France
Académie : Lille
Département : Pas-de-Calais
Commune : Outreau
Collectivité signataire de la convention: REGION HAUTS-DE-FRANCE
```

  (Le titre est tronqué à 200 caractères par `| limitTo:200`. Noter l'espace manquant avant
  les deux-points de la dernière ligne — il est dans la source.)

### 3. Légende

Ce n'est **pas** la légende générée par ODS : c'est un **bloc HTML écrit à la main** dans le
template, avec les classes `odswidget-map-legend__*` recopiées. Titre
« **Subventions accordées aux collectivités** », quatre entrées relevées mot pour mot :

| Pastille | Texte affiché |
|---|---|
| `#19630A` vert | `0` → `100000` |
| `#F7B133` jaune | `1000001` → `300000` |
| `#F98C44` orange | `300001` → `500000` |
| `#E5352E` rouge | `500001` → `...` |

### 4. Ce qui remplace les anciens onglets ODS

Comme pour les internats, `/explore/dataset/<jeu>/{table,map,analyze,export,api}/`
redirigent en 302 vers la page d'actif. Ce qui subsiste : la page d'actif du jeu
(`/explore/assets/fr-en-hybridation_lycees_par_collectivite/`) avec son bloc
« Utiliser les outils pour… », et l'explorateur `/view/` (Données · Carte · Schéma).
**Ne pas compter ces onglets comme une capacité qui manquerait à `dsfr-data` : ils ont
disparu chez ODS aussi.**

## Défauts et bizarreries de l'original

1. **La légende ment sur trois entrées sur quatre.** La configuration classe à
   100 000 / 300 000 / 1 000 000 / 10 000 000 ; la légende écrite à la main affiche
   100 000 / 300 000 / **500 000** / au-delà. Conséquence lisible à l'écran : la Bretagne
   (970 000 €) est **orange**, et la légende dit que l'orange va de 300 001 à 500 000 —
   donc la légende dément la carte. C'est le défaut n° 1 de la page.
2. **La deuxième entrée de légende est une plage à l'envers** : « 1 000 001 → 300 000 ».
   Coquille manifeste pour « 100 001 → 300 000 », restée en ligne.
3. **La légende démarre à 0** alors que la classe basse démarre à 3 710,50
   (`color-numeric-range-min`). Sans importance ici, mais c'est un troisième écart.
4. **La Normandie manque au jeu** : un trou blanc au milieu de la France métropolitaine,
   que rien sur la page ne signale ni n'explique. Idem La Réunion, la Nouvelle-Calédonie et
   la Polynésie (absentes du jeu), invisibles car hors cadre de toute façon.
5. **Sept collectivités sur dix-neuf ne sont jamais vues.** `location` figé + `no-refit`
   = les DROM-COM (Guadeloupe, Martinique, Guyane, Mayotte, Saint-Martin, SPM,
   Wallis-et-Futuna) ne sont pas dans le cadre d'ouverture, et rien n'invite à aller les
   chercher. C'est l'erreur inverse de la carte des internats (qui, elle, s'ouvre sur le
   planisphère) — même cause, arbitrage opposé, deux fois raté.
6. **Le jeu de détail est incomplet, et personne ne le dit.** Les collectivités déclarent
   **1 803** lycées et **48 559** divisions ; le jeu par lycée n'en contient que **1 713** et
   **45 893**. Le manque n'est pas diffus : **PACA n'a aucune ligne dans le jeu par lycée**
   (82 lycées déclarés, 186 200,94 € de subvention) et Wallis-et-Futuna non plus.
   Concrètement, **zoomer sur la Provence ne fait apparaître aucun lycée**, alors que la
   région est colorée et que le chapeau dit « Zoomez pour avoir le détail par lycée ».
7. **Nombres bruts dans l'infobulle** : `1945151.33 €`. Aucun `| number`, alors que la vue
   SNEE du même producteur, elle, en met un. Incohérence entre deux vues du même portail.
8. **`shape-opacity="0.95"`** : au-delà du zoom 8, le polygone couvre le fond IGN presque
   complètement ; les rues et les noms de communes ne sont plus lisibles sous la couleur,
   au moment précis où la couche de lycées invite à regarder le détail local.
9. **Trois titres pour un objet** : « Hybridation de l'enseignement en lycée » (catalogue),
   « Visualisation - Hybridation de l'enseignement en lycée - par collectivité » (H1),
   « Subventions par collectivité » (H2), « Hybridation de l'enseignement en lycée - par
   collectivité » (`title` de la couche, non affiché).
10. **Un contexte déclaré pour rien** : `regions` (`georef-france-region` sur
    `public.opendatasoft.com`) est chargé par l'`ods-dataset-context` et **aucune couche ne
    l'utilise**. Une requête réseau et une dépendance à un domaine tiers, pour rien.
11. **Aucun filtre, aucune recherche, aucune synchronisation d'URL.** Sur 19 lignes le
    manque de filtre est défendable ; sur 1 713 lycées, ne pas pouvoir chercher un
    établissement par son nom l'est moins.
12. **`position_commune_siege` n'est jamais utilisé** : le jeu porte une géolocalisation du
    siège de la collectivité qu'aucune couche n'affiche.
13. **Le rapport subvention / dépense n'est calculé nulle part** alors que les deux nombres
    sont affichés l'un sous l'autre. Il vaut 46,6 % au national et va de 44,4 % (Bretagne,
    Pays de la Loire, Nouvelle-Aquitaine, tous à ~50 %) à 46 % — sauf l'Île-de-France
    (46,1 %) et Occitanie (**50,0 %**) : l'écart réel est faible, mais c'est précisément ce
    que le lecteur ne peut pas constater.
14. **Bulle de chat par-dessus la carte**, en permanence, sur le coin de la légende.

## Transposition vers `dsfr-data`

### Architecture retenue et pourquoi

**19 lignes, 103 Ko gzip de GeoJSON en 0,14 s** pour la choroplèthe ;
**1 713 lignes, 131 Ko gzip en 0,20 s** pour les lycées. Les deux jeux tiennent
intégralement côté client, chacun en un aller-retour. **Invoquer une limite de performance
ici serait faux** — et le piège « chargement complet via `/records` » du `CLAUDE.md`
(100 lignes par requête, en série) ne s'applique pas : on passe par `/exports/json`.

Deux `dsfr-data-source` en mode URL générique, pas de `select`, tout le reste côté client.
Le `geo_shape` arrive dans le JSON tel quel.

**⚠️ Le point à retenir de cette fiche : ici on n'a besoin d'aucun fond administratif
externe.** Le piège du `CLAUDE.md` — « contours administratifs décoratifs : pas dans
DSFR Chart (SVG, pas GeoJSON), passer par un GeoJSON simplifié statique + `transform="features"` »
(AM-016) — **ne s'applique pas** : la géométrie est **dans la donnée**, une propriété par
ligne, et `dsfr-data-map-layer type="geoshape" geo-field="geo_shape"` la consomme
directement. On n'a besoin ni de `public/data/geo/regions-simplifiees.geojson`, ni de
`transform="features"`, ni de `dsfr-data-join`, ni de `georef-france-region`. C'est le cas
le plus simple possible d'une choroplèthe, et le seul du portail Éducation.

### Comment `dsfr-data-map-layer` prend le `geo_shape`

Lu dans la source (`packages/core/src/components/dsfr-data-map-layer.ts`, JSDoc des
attributs et `_renderGeoshape`), **non exécuté au navigateur** :

| Attribut | JSDoc (verbatim, abrégé) | Ce qu'on en fait ici |
|---|---|---|
| `type="geoshape"` | « `geoshape` (polygones/lignes GeoJSON) » | la choroplèthe |
| `geo-field` | « Champ geometrie : **objet GeoJSON**, `{lat, lon}`, `[lat, lon]` ou chaine JSON serialisee (#426) » | `geo-field="geo_shape"` |
| `fill-field` | « Champ numérique utilisé pour le remplissage en choroplèthe » | `montant_de_la_subvention` |
| `breaks` | « Bornes **supérieures** manuelles des classes, séparées par des virgules : `"10,50,100"` donne 4 classes… **Implique `method="manual"`** » | `breaks="100000,300000,1000000"` → les 4 classes de l'original, à l'identique |
| `method` | `quantile` (défaut) · `equal` · `manual` | inutile de l'écrire : `breaks` l'implique |
| `classes` | « Nombre de classes… `0` (défaut) = autant de classes que de couleurs (9). **Plafonné à la taille de l'échelle** (#685) » | inutile avec `breaks` ; utile si on préfère `method="quantile" classes="4"` |
| `selected-palette` | `sequentialAscending` (défaut) · `sequentialDescending` · `divergentAscending` · `divergentDescending` · `neutral` · `categorical` | voir § Limites : les 4 couleurs ODS (vert→rouge) ne sont **pas** une palette DSFR |
| `fill-opacity` | défaut `0.6` | à laisser à 0,6 plutôt que reproduire le 0,95 illisible |
| `min-zoom` / `max-zoom` | « Niveau de zoom en deçà / au-delà duquel la couche est masquée » | `min-zoom="7"` sur la couche lycées ≡ `show-zoom-min="7"` d'ODS |
| `max-items` | défaut **5 000**, bandeau au-delà | 1 713 lycées passent, mais le poser explicitement reste la bonne habitude (PG-013) |
| `no-interactive` | « Couche decorative : aucune interaction » | non utilisé ici |
| `shape-class` | « Classe CSS appliquee aux traces SVG » | non utilisé ici |

**Vérifié en lecture de source** : `_renderGeoshape` fait
`parseGeoValue(getByPath(record, geoField))`, teste `'type' in geoData`, puis appelle
`L.geoJSON(geoJson)`. L'objet ODS `{"type":"Feature","geometry":{…},"properties":{}}` porte
bien un `type` et Leaflet consomme nativement un `Feature`. **Donc `geo_shape` passe tel
quel, sans transformation.** (À confirmer au navigateur lors de la reproduction — pas
exécuté ici.)

### La légende : ce que la transposition gagne

`dsfr-data-map-legend for="…"` lit `getLegendEntries()` de la couche, qui pour une
choroplèthe appelle `choroplethLegendEntries(breaks, palette, extent)`. Les libellés sont
**dérivés des bornes réellement appliquées**, formatés en `fr-FR` par
`Intl.NumberFormat('fr-FR', { maximumFractionDigits: 2 })` :

```
Jusqu'à 100 000
De 100 000 à 300 000
De 300 000 à 1 000 000
Plus de 1 000 000
```

**Le défaut n° 1 de l'original devient structurellement impossible** : la légende n'est plus
un bloc HTML parallèle à la configuration, elle est calculée à partir d'elle. C'est le
gain le plus net de tout ce lot, et il ne coûte qu'une balise.

### Correspondance bloc à bloc

| Directive ODS de la vue personnalisée | Composant + attributs `dsfr-data` |
|---|---|
| `ods-dataset-context context="hybridationparcollectivite"` | `<dsfr-data-source id="coll" url="…/fr-en-hybridation_lycees_par_collectivite/exports/json">` |
| `…-dataset="fr-en-hybridation_lycees_par_lycee"` | `<dsfr-data-source id="lyc" url="…/fr-en-hybridation_lycees_par_lycee/exports/json">` |
| `regions-dataset="georef-france-region"` (jamais utilisé) | **rien** — ne pas transposer un contexte mort |
| `<ods-map location="5,46,6" no-refit="true">` | `<dsfr-data-map center="46,6" zoom="5" height="560px">` **sans** `fit-bounds` (équivalent de `no-refit`) — mais voir l'esquisse : on corrige le cadrage |
| basemap IGN par défaut | `tiles="ign-plan"` (défaut) |
| — (rien dans l'original) | `tiles-style="muted"` — atténuation du fond, **attribut natif depuis #686** ; il **remplace** la classe `odv-fond-attenue` du dépôt (AM-017 est résolu côté bibliothèque) |
| DROM-COM hors cadre | `insets="guadeloupe,martinique,guyane,mayotte,saint-martin,saint-pierre-et-miquelon,wallis-et-futuna"` + règle de page sur la largeur (AM-032) |
| `display="choropleth"` sur `geo_shape` | `<dsfr-data-map-layer type="geoshape" geo-field="geo_shape">` |
| `color-by-field="montant_de_la_subvention"` | `fill-field="montant_de_la_subvention"` |
| `color-numeric-ranges="{'100000':…,'300000':…,'1000000':…,'10000000':…}"` | `breaks="100000,300000,1000000"` (bornes supérieures, `method="manual"` implicite) |
| `shape-opacity="0.95"` | `fill-opacity="0.6"` (défaut) — le 0,95 est un défaut, on ne le reproduit pas |
| `border-color="#FFFFFF" border-size="1"` | `color="#FFFFFF"` (contour du tracé ; l'épaisseur est fixée à 1 par le composant) |
| `color-out-of-bounds` / `color-undefined` | pas d'équivalent — inutile ici (aucune valeur hors bornes, aucune nulle) |
| légende HTML écrite à la main | `<dsfr-data-map-legend for="couche-coll" label="Subventions accordées aux collectivités">` |
| `map_tooltip_html` (6 lignes, non formatées) | `<dsfr-data-map-popup>` + `<template>` ; **et** `<dsfr-data-normalize round="depenses_realisees_par_la_collectivite:0, montant_de_la_subvention:0">` en amont pour tuer le flottant IEEE (le piège du `CLAUDE.md`, séparateur **virgule** pour `round`) |
| `<ods-map-layer display="raw" show-zoom-min="7">` | `<dsfr-data-map-layer type="circle" radius="5" min-zoom="7" max-items="2500">` |
| `color="#2C3F56"` | `color="#2C3F56"` |
| template du lycée (`| limitTo:200`) | `<template>` du popup ; pas de troncature nécessaire (les noms font < 80 car.) |
| — (rien dans l'original) | `<dsfr-data-kpi>` pour le total national et le taux de couverture (voir § « ce que la transposition ajoute ») |
| — (rien dans l'original) | `<dsfr-data-search fields="nom_du_lycee, nom_de_la_commune, uai">` sur la couche lycées |
| — (rien dans l'original) | `<dsfr-data-list>` des 19 collectivités, triable |

### Esquisse de code

```html
<!-- ================= Sources ================= -->
<!-- 19 lignes + geo_shape : 103 Ko gzip, 0,14 s mesuré. Un aller-retour, pas de select. -->
<dsfr-data-source id="coll"
  url="https://data.education.gouv.fr/api/explore/v2.1/catalog/datasets/fr-en-hybridation_lycees_par_collectivite/exports/json">
</dsfr-data-source>

<!-- 1 713 lignes : 131 Ko gzip, 0,20 s mesuré. -->
<dsfr-data-source id="lyc"
  url="https://data.education.gouv.fr/api/explore/v2.1/catalog/datasets/fr-en-hybridation_lycees_par_lycee/exports/json">
</dsfr-data-source>

<!-- Flottants IEEE des montants : arrondis AVANT l'affichage (piège du dépôt).
     Séparateur d'entrées de `round` : la virgule. -->
<dsfr-data-normalize id="coll-n" source="coll"
  round="depenses_realisees_par_la_collectivite:0, montant_de_la_subvention:0">
</dsfr-data-normalize>

<!-- Recherche d'un lycée : ce que la vue d'origine ne sait pas faire. -->
<dsfr-data-search id="lyc-q" source="lyc"
  fields="nom_du_lycee, nom_de_la_commune, uai"
  label="Rechercher un lycée bénéficiaire" placeholder="Nom, commune, UAI…"
  operator="words" count url-sync></dsfr-data-search>

<div class="fr-container fr-mb-8w">
  <h2 class="fr-h3">Subventions par collectivité</h2>
  <p class="fr-text--sm">
    Mesure « hybridation de l'enseignement en lycée » du plan de relance (CPER 2021-2027).
    Zoomez pour faire apparaître les lycées bénéficiaires.
  </p>

  <!-- ================= KPI : ce que l'original ne calcule pas ================= -->
  <dsfr-data-kpi-group class="fr-mb-4w">
    <dsfr-data-kpi source="coll-n" value="montant_de_la_subvention:sum"
      format="nombre" unit="€" label="de subvention d'État" col="4"></dsfr-data-kpi>
    <dsfr-data-kpi source="coll-n" value="depenses_realisees_par_la_collectivite:sum"
      format="nombre" unit="€" label="dépensés par les collectivités" col="4"></dsfr-data-kpi>
    <dsfr-data-kpi source="coll-n" value="nombre_total_de_lycees:sum"
      format="nombre" label="lycées déclarés par les conventions" col="4"></dsfr-data-kpi>
  </dsfr-data-kpi-group>
  <p class="fr-hint-text fr-mb-4w">
    19 collectivités signataires. Le jeu par lycée n'en documente que 1&nbsp;713 sur les
    1&nbsp;803 déclarés : <strong>Provence-Alpes-Côte d'Azur (82 lycées) et
    Wallis-et-Futuna (1) n'y figurent pas</strong>, la couche de détail y reste vide.
    La Normandie et La Réunion sont absentes du dispositif.
  </p>

  <!-- ================= Carte ================= -->
  <dsfr-data-map name="Subventions à l'hybridation de l'enseignement en lycée"
    center="46.55,2.5" zoom="5" height="560px"
    tiles="ign-plan" tiles-style="muted"
    insets="guadeloupe,martinique,guyane,mayotte,saint-martin,saint-pierre-et-miquelon,wallis-et-futuna">

    <!-- Choroplèthe portée par le jeu lui-même : geo_shape est un Feature GeoJSON,
         L.geoJSON le consomme tel quel. Les bornes reprennent celles de l'original. -->
    <dsfr-data-map-layer id="couche-coll" source="coll-n" type="geoshape"
      geo-field="geo_shape"
      fill-field="montant_de_la_subvention"
      breaks="100000,300000,1000000"
      selected-palette="sequentialAscending"
      fill-opacity="0.6" color="#FFFFFF"
      tooltip-field="raison_sociale_du_signataire_de_la_convention">
    </dsfr-data-map-layer>

    <!-- Détail par lycée à partir du zoom 7, comme show-zoom-min="7". -->
    <dsfr-data-map-layer id="couche-lyc" source="lyc-q" type="circle" radius="5"
      geo-field="position" color="#2C3F56"
      min-zoom="7" max-items="2500"
      tooltip-field="nom_du_lycee">
    </dsfr-data-map-layer>

    <!-- Les libellés sortent des bornes réelles : la légende ne peut plus mentir. -->
    <dsfr-data-map-legend for="couche-coll"
      label="Subventions accordées aux collectivités (€)"></dsfr-data-map-legend>

    <dsfr-data-map-popup mode="panel-right" width="360px">
      <template>
        <h3 class="fr-h6">{{raison_sociale_du_signataire_de_la_convention}}</h3>
        <p class="fr-text--sm"><strong>Région&nbsp;:</strong> {{region_ou_drom_com}}</p>
        <p class="fr-text--sm"><strong>Subvention&nbsp;:</strong> {{montant_de_la_subvention}} €</p>
        <p class="fr-text--sm"><strong>Dépense de la collectivité&nbsp;:</strong>
          {{depenses_realisees_par_la_collectivite}} €</p>
        <p class="fr-text--sm"><strong>Lycées&nbsp;:</strong> {{nombre_total_de_lycees}} —
          <strong>divisions&nbsp;:</strong> {{nombre_total_divisions_de_classes_de_lycees}}</p>
        <p class="fr-text--xs">Siège&nbsp;: {{nom_officiel_commune_siege}} · SIREN {{siren_signataire_de_la_convention}}</p>
      </template>
    </dsfr-data-map-popup>
  </dsfr-data-map>

  <!-- ================= Tableau accessible : rien de tel dans l'original ================= -->
  <h3 class="fr-h5 fr-mt-4w">Les 19 collectivités signataires</h3>
  <dsfr-data-list source="coll-n"
    columns="region_ou_drom_com, raison_sociale_du_signataire_de_la_convention, nombre_total_de_lycees, nombre_total_divisions_de_classes_de_lycees, depenses_realisees_par_la_collectivite, montant_de_la_subvention"
    sort></dsfr-data-list>
</div>
```

## Limites et points durs identifiés

1. **La palette exacte de l'original n'est pas reproductible.**
   *Obstacle* : `selected-palette` ne prend qu'un nom parmi six échelles DSFR
   (`CHOROPLETH_SCALES` : `sequentialAscending`/`Descending`, `divergentAscending`/`Descending`,
   `neutral`, `categorical`). Il n'y a **pas** d'attribut « liste de couleurs » pour une
   choroplèthe — `color-map` existe mais il est **catégoriel** (`valeur:#hex`), pas ordinal :
   il ne sait pas colorer une plage numérique.
   *Voie native essayée* : `divergentAscending` (bleu → gris → rouge) est le plus proche
   d'un vert→rouge, mais son point milieu gris suggère un axe divergent qu'un montant de
   subvention n'a pas. `sequentialAscending` (blanc-bleu → `#000091`) est la bonne réponse
   sémantique pour une quantité croissante.
   *Contournement* : aucun côté attribut. En CSS on peut repeindre par `shape-class`, mais
   la classe est la même pour toute la couche : elle ne distingue pas les classes de la
   choroplèthe.
   *Verdict* : **ce n'est pas une limite, c'est une divergence assumée.** Le vert-jaune-
   orange-rouge de l'original est un feu tricolore qui suggère « bien / mal » là où il n'y a
   qu'un montant ; la séquentielle DSFR dit mieux ce que la donnée dit. À remonter comme
   **demande** seulement si un cas réel exige une échelle imposée (charte d'un producteur) :
   un attribut `palette="#a,#b,#c,#d"` pour compléter `selected-palette`.
2. **Les bornes de l'original ne sont pas des quantiles.** 100 000 / 300 000 / 1 000 000 sur
   un jeu qui va de 3 710 à 3 900 000 : la classe rouge contient 4 régions, la verte 4 aussi,
   par hasard. `method="quantile" classes="4"` donnerait un découpage plus lisible mais des
   bornes différentes de l'original. **`breaks` permet de choisir** — donc pas de limite,
   un arbitrage de fidélité.
3. **`geo_shape` en objet `Feature` : accepté en lecture de source, non exécuté.**
   *Obstacle potentiel* : le composant teste `'type' in geoData` puis passe à `L.geoJSON`.
   Un `Feature` a bien un `type`. Le risque serait un `properties` conflictuel — il est
   vide dans ce jeu.
   *À faire* : le confirmer au navigateur à la reproduction. **Marqué « non vérifié à
   l'écran ».**
4. **Encarts ultramarins : 7 territoires.**
   *Obstacle* : les presets existent, mais sans largeur la feuille injectée pose 10 rem par
   encart (AM-032) → 70 rem de bandeau.
   *Contournement* : règle de page `dsfr-data-map-inset { width: 12%; }`, ou n'en garder que
   les cinq DROM (`insets="drom"`) — sachant qu'ici **La Réunion n'est pas dans le jeu**,
   donc son encart serait vide, et que Saint-Martin / SPM / Wallis n'entrent pas dans le
   groupe `drom`. Le jeu impose donc la liste nommée.
   *Verdict* : arbitrage de mise en page, pas une limite.
5. **Bornes de classe dans l'infobulle.** L'original n'en met pas ; `dsfr-data` non plus
   (l'infobulle d'une choroplèthe ne connaît pas la classe de sa valeur). RGAA 1.4 est
   néanmoins satisfait : la valeur exacte est dans le popup, et la légende donne les seuils.
   *Verdict* : pas un manque.
6. **Le cadrage figé (`no-refit`) se transpose par omission.** `dsfr-data-map` sans
   `fit-bounds` reste sur `center`/`zoom` : c'est exactement `no-refit="true"`. Aucun
   attribut à chercher. (Et si l'on veut le fit sans partir au milieu du Pacifique :
   `fit-bounds` + `fit-zone="41,-5.5,51.5,10"` + `fit-max-zoom="12"`, cf. #687 — le clip
   métropole est même **le défaut** dès qu'un encart ultramarin est posé.)
7. **Les outils de dessin (polygone / rectangle / cercle) du visualiseur ODS.**
   *Constat* : ils appartiennent au **chrome du visualiseur d'actif**, pas à la vue
   personnalisée (le template ne les demande pas ; `ods-map` les hérite du conteneur).
   `dsfr-data-map` n'a pas de filtre par zone dessinée.
   *Voie native la plus proche* : `bbox` sur la couche (chargement par viewport, pas
   filtre), et `refine-on-click` (sélection d'un objet, pas d'une zone libre).
   *Verdict* : **fonction de back-office de portail open data.** Un site institutionnel qui
   publie une carte de subventions n'en a pas besoin. Ne pas le compter comme un manque.
8. **Ce que la transposition gagne**, et qu'il faut dire : une légende qui ne peut pas
   contredire la carte, les montants formatés, les DROM-COM visibles en encarts, un total
   national et un taux de couverture, une recherche par nom de lycée, un tableau accessible,
   un fond de carte atténué (`tiles-style="muted"`), et l'aveu explicite du trou PACA.
   Six des quatorze défauts relevés tombent d'eux-mêmes.

## Données à reproduire fidèlement

- [ ] **19** collectivités signataires, **1 803** lycées et **48 559** divisions déclarés.
- [ ] **13 947 510,84 €** de subvention pour **29 900 499,06 €** de dépenses (46,6 %).
- [ ] Choroplèthe sur `montant_de_la_subvention`, **4 classes** aux bornes
      100 000 / 300 000 / 1 000 000 — et une légende qui les dit **exactement**.
- [ ] Répartition : 4 régions en classe basse, 5 en deuxième, 6 en troisième, 4 en haute.
- [ ] Île-de-France 3 900 000 € (max) · Saint-Pierre-et-Miquelon 3 710,50 € (min).
- [ ] **Normandie et La Réunion absentes du jeu** — le signaler, ne pas laisser un trou muet.
- [ ] Les 7 territoires ultramarins **visibles** (encarts), contrairement à l'original.
- [ ] Couche lycées à partir du zoom 7, **1 713 points**, sans cluster, `#2C3F56`.
- [ ] **PACA et Wallis-et-Futuna sans aucun lycée dans le jeu de détail** — le signaler.
- [ ] Infobulle collectivité : raison sociale (titre), dépenses, subvention, nombre de
      lycées, nombre de divisions, région — **montants formatés**.
- [ ] Infobulle lycée : nom, nombre de classes, région, académie, département, commune,
      collectivité signataire.
- [ ] Titres : H2 « Subventions par collectivité », légende « Subventions accordées aux
      collectivités ».
