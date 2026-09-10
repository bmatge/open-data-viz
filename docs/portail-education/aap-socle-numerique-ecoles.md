# Appel à projet « Socle Numérique dans les Écoles Élémentaires » — par collectivité

- **URL du catalogue** (entrée n° 23) : https://data.education.gouv.fr/explore/dataset/fr-en-aap-snee-collectivites/custom/
  → **302** vers `https://data.education.gouv.fr/explore/assets/fr-en-aap-snee-collectivites/` (page d'actif du jeu).
- **URL réelle de la dataviz** : **`https://data.education.gouv.fr/explore/assets/visualisation-fr-en-aap-snee-collectivites/view/`**
  (lien « Cet actif a été lié à l'actif suivant : … - Visualization » en tête de la description du jeu).
- **Id catalogue** : 23 · **Thématique** : Éducation · **Sous-thématique** : Ecoles · **Filtre** : aucun.
- **Nature de la cible** : **vue personnalisée ODS héritée** (« custom view », slug de vue
  `custom`), **pas** une page Studio (`/api/portal/v1.0/studio_pages/` ne la connaît pas) et
  pas une page AngularJS `/pages/`. Configuration dans `extra_metas.visualization` du jeu,
  récupérée via `https://data.education.gouv.fr/explore/embed/dataset/fr-en-aap-snee-collectivites/custom/`
  (attribut `ctx-dataset-schema`, qui **ne redirige pas**). Archivée dans
  `docs/portail-education/_sources/fr-en-aap-snee-collectivites.customview.json`.
  `custom_view_title` = « **Carte par régions / départements** ».
- **Relevé visuel** : 2026-09-10, Chrome (extension), viewport 1568 × 751 puis 1440 × 690.

## Jeux de données

| Jeu | Lignes | Champs | Géo | Rôle |
|---|---:|---:|---|---|
| `fr-en-aap-snee-collectivites` | **6 870** | 15 | `position` (0 nulle) | **source d'agrégats seulement** — jamais dessinée |
| `fr-en-aap-snee-ecoles` | **12 624** | 18 | `position_ecole` | points de détail (zoom ≥ 9) |
| `georef-france-region` (`public.opendatasoft.com`) | 26 | — | `geo_shape` | **porte** la choroplèthe régionale |
| `georef-france-departement` (`public.opendatasoft.com`) | ~110 | — | `geo_shape` | **porte** la choroplèthe départementale |

`fr-en-aap-snee-collectivites` : **licence non renseignée**, producteur non renseigné,
`visibility: domain`, données modifiées le 2024-11-27 (le plus ancien des quatre jeux du lot).

**Champs de la collectivité** : `code_region`, `region_academique_ou_com`, `code_academie`,
`academie`, `code_departement`, `departement`, `raison_sociale_du_signataire_de_la_convention`,
`siren_signataire_de_la_convention`, `code_commune_siege`, `nom_officiel_commune_siege`,
`nombre_de_communes` (int), `nombre_d_ecoles` (int),
`depenses_realisees_par_la_collectivite` (double), `montant_de_la_subvention` (double),
`position` (geo_point_2d).

**Volumétrie des valeurs** (comptée sur l'export complet, pas sur un `total_count` de
`group_by` — qui n'est pas un nombre de groupes) :
`region_academique_ou_com` **21** · `academie` **33** · `departement` **101** ·
`nom_officiel_commune_siege` **6 755** · `raison_sociale_…` **6 805** ·
`siren_…` **6 866** (une ligne ≈ une collectivité).

**Totaux nationaux** (API) : **103 095 993,73 €** de subvention, **196 533 726,48 €** de
dépenses, **12 670** écoles, **7 810** communes, sur **6 870** conventions.

**Facettes déclarées au back-office** : `region_academique_ou_com`, `academie`,
`departement`, `nom_officiel_commune_siege`, `siren_…`, `raison_sociale_…`,
`code_departement`, `code_region` — **aucune n'est rendue** : cette vue n'affiche pas de
colonne de facettes (contrairement à Euroscol).

**Poids mesurés** (`/exports/json?limit=-1`, gzip, 1 mesure) :
collectivités **622 Ko en 0,42 s** · écoles **1 436 Ko en 1,01 s**.

## Objectif de la dataviz et informations véhiculées

- **Question** : « Où l'appel à projet "Socle Numérique dans les Écoles Élémentaires" a-t-il
  été contractualisé, pour quels montants, et quelles écoles en bénéficient ? »
- **Message porté** : l'AAP est un dispositif **communal massif** — 6 870 conventions pour
  12 670 écoles et 7 810 communes — dont l'agrégat régional dessine sans surprise la carte
  de la population scolaire (Île-de-France 16,8 M€, ARA 11,6 M€, Hauts-de-France 11,2 M€).
- **Ce que l'utilisateur doit obtenir** : (a) l'ordre de grandeur par région **ou** par
  département, au choix ; (b) en zoomant, l'implantation de chaque école bénéficiaire et
  son nombre de classes.
- **Ce qui n'est pas dans l'objet** :
  - **aucun total national** : ni les 103 M€, ni les 12 670 écoles n'apparaissent nulle part ;
  - **aucun montant par école ni par classe** — la seule grandeur comparable entre un
    département rural et la Seine-Saint-Denis, et elle n'est pas calculée ;
  - **aucun taux de couverture** subvention / dépense (52,5 % au national), alors que les
    deux nombres sont affichés l'un sous l'autre dans chaque infobulle ;
  - **aucune vue à la maille communale**, alors que la donnée est communale : elle n'est
    accessible que par la couche « écoles », et seulement au zoom ≥ 9 ;
  - aucun filtre, aucune recherche, aucun tableau, aucun graphique.

## Relevé visuel exhaustif, bloc par bloc

### 0. Chrome de page

En-tête DSFR, menu horizontal, fil d'Ariane « Catalogue › Visualisation - Appel à p… ›
**Consultation** », H1 « **Visualisation - Appel à projet Socle Numérique dans les Ecoles
Elémentaires - par collectivité** » (« Ecoles Elémentaires » sans accents, hérité du titre
du jeu). Icône signet à droite. Bulle de chat magenta flottante.

### 1. Onglets

`<ods-simple-tabs class="tab-pills">` — deux onglets en **pilules bleues** (`#0088CC`,
`border-radius: 30px`), stylés par le `custom_view_css` de la vue :

| Onglet | `keep-content` | Contenu |
|---|---|---|
| **Par régions** (actif au chargement) | `false` | choroplèthe régionale + couche écoles |
| **Par départements** | `false` | choroplèthe départementale + couche écoles |

`keep-content="false"` : **le contenu est détruit et reconstruit à chaque changement
d'onglet** — la carte se réinitialise, le zoom et le pan sont perdus. Observé : la pilule
active met une à deux secondes à se repeindre après le clic (le libellé de l'onglet actif
disparaît brièvement de la barre).

### 2. Onglet « Par régions »

- H2 : « **Subventions aux collectivités par régions** »
- Texte nu : « **Zoomez pour avoir le détail par école** »
- `<ods-map location="5,46,6" style="height: 500px">` — zoom 5, centre 46 °N / 6 °E,
  **pas de `no-refit`** mais pas de fit non plus (le cadrage reste sur `location`).
  Moteur **Leaflet**, fond **IGN** (« Leaflet | Powered by Huwise - Map data © IGN »).
  Contrôles observés : plein écran, trois outils de dessin (polygone / rectangle / cercle)
  + modifier / effacer, `+` / `−`, loupe (recherche de lieu, **utilisée avec succès** pour
  atteindre Lille), géolocalisation, sélecteur de fond.
- **La hauteur fixe de 500 px se bat avec le conteneur du visualiseur** : à l'ouverture,
  des bandes grises apparaissent au-dessus, à droite et en dessous du volet de tuiles —
  la carte ne remplit pas son cadre (observé, capture initiale).

#### La mécanique de la choroplèthe : agrégat client + `ng-init`

C'est le motif le plus artisanal des quatre cibles du lot.

```html
<div ods-analysis="analysisreg" ods-analysis-context="frenaapsneecollectivites"
     ods-analysis-max="200" ods-analysis-serie-montant="SUM(montant_de_la_subvention)"
     ods-analysis-x="code_region"></div>
<div ng-repeat="resultreg in analysisreg.results track by $index">
  <div ng-init="colorsreg[resultreg.x] = resultreg.montant < 1000000  ? '#19630A'
                                       : resultreg.montant < 5000000  ? '#F7B133'
                                       : resultreg.montant < 10000000 ? '#F98C44'
                                       : '#E5352E';"></div>
</div>
```

Puis la couche consomme ce dictionnaire **comme s'il s'agissait de catégories** :

```html
<ods-map-layer context="regions" display="categories"
  color-by-field="reg_code" color-categories="colorsreg" color-categories-other="lightgrey"
  shape-opacity="0.95" title="Subventions par région">
```

Autrement dit : **ce n'est pas une choroplèthe ODS**, c'est une couche catégorielle dont le
dictionnaire couleur est fabriqué à la volée par un `ng-repeat` de `ng-init` — quatre
ternaires imbriqués dans un attribut HTML. La géométrie vient de `georef-france-region`
sur `public.opendatasoft.com`, jointe implicitement par `reg_code` ↔ `code_region`.

Seuils de l'onglet régions : **1 M / 5 M / 10 M €**.

#### Vérification des couleurs à l'écran (13 régions métropolitaines)

| Région | Subvention (API) | Classe attendue | Vu à l'écran |
|---|---:|---|---|
| Île-de-France | 16 820 965 € | rouge | rouge ✔ |
| Auvergne-Rhône-Alpes | 11 643 780 € | rouge | rouge ✔ |
| Hauts-de-France | 11 206 064 € | rouge | rouge ✔ |
| Occitanie | 8 437 845 € | orange | orange ✔ |
| Grand Est | 7 820 160 € | orange | orange ✔ |
| Nouvelle-Aquitaine | 7 784 489 € | orange | orange ✔ |
| Provence-Alpes-Côte d'Azur | 7 563 308 € | orange | orange ✔ |
| Pays de la Loire | 5 460 219 € | orange | orange ✔ |
| Bretagne | 5 241 519 € | orange | orange ✔ |
| Normandie | 4 917 530 € | jaune | jaune ✔ |
| Centre-Val de Loire | 4 438 647 € | jaune | jaune ✔ |
| Bourgogne-Franche-Comté | 3 788 296 € | jaune | jaune ✔ |
| Corse | 569 748 € | vert | vert ✔ |

#### Légende (onglet régions)

Bloc HTML écrit à la main (classes `odswidget-map-legend__*` recopiées), titre
« **Subventions accordées aux collectivités** », relevé mot pour mot :

| Pastille | Texte |
|---|---|
| `#19630A` vert | `0` → `1000000` |
| `#F7B133` jaune | `1000001` → `5000000` |
| `#F98C44` orange | `5000001` → `10000000` |
| `#E5352E` rouge | `10000001` → `...` |

**Ici la légende est juste** — elle correspond aux ternaires. (Ce n'est pas le cas de la
vue « hybridation » du même producteur, voir sa fiche : trois bornes sur quatre y sont
fausses. Même motif, même bloc HTML recopié, un seul des deux tenu à jour.)

#### Infobulle de la région : une requête imbriquée par clic

```html
<ods-dataset-context context="regdetail" regdetail-dataset="fr-en-aap-snee-collectivites"
    regdetail-parameters="{'refine.code_region':''+record.fields.reg_code}">
  <div ods-adv-analysis="myData" ods-adv-analysis-context="regdetail"
       ods-adv-analysis-group-by="code_region as reg"
       ods-adv-analysis-select="SUM(montant_de_la_subvention) as subventions,
         SUM(depenses_realisees_par_la_collectivite) as depenses_collectivite,
         SUM(nombre_d_ecoles) as nb_ecoles, SUM(nombre_de_communes) as nb_communes">
```

Chaque ouverture d'infobulle **relance une agrégation serveur** filtrée sur la région
cliquée. Relevé mot pour mot sur Auvergne-Rhône-Alpes :

```
Auvergne-Rhône-Alpes
Dépenses réalisées par les collectivités du département : 19 772 786 €
Subventions accordées : 11 643 780 €
Nombre d'écoles concernées: 1552
Nombre de communes concernées : 1160
```

Les trois valeurs vérifiées à l'API : 11 643 780 ✔ · 1 552 ✔ · 1 160 ✔.
Le titre est `reg_name` du référentiel `georef`, tronqué à 50 caractères.
Les deux montants passent par `| number : 0` (espace insécable pour les milliers) ; les
deux compteurs **non** (`1552`, pas `1 552`).

#### Couche 2 — écoles bénéficiaires

```html
<ods-map-layer context="frenaapsneeecoles" display="raw" color="#2C3F56" show-zoom-min="9">
```

`display="raw"` : pas de cluster, un cercle bleu ardoise par école, à partir du zoom 9.
**Vérifié à l'écran** (recherche de lieu « Lille » → zoom ~13) : ~150 points visibles sur
l'agglomération, posés sur un aplat **rouge saturé qui masque presque entièrement le fond
IGN** (`shape-opacity="0.95"` — au zoom 13, les rues sont à peine perceptibles sous la
couleur ; la Belgique voisine, hors polygone, est nette par contraste).

Infobulle de l'école, relevée mot pour mot :

```
Ecole primaire Charles de Gaulle, Wasquehal
Nombre de classes : 7
Région : Hauts-de-France
Département : Nord
Commune : Wasquehal
Collectivité signataire de la convention: COMMUNE DE WASQUEHAL
```

**Observé** : au zoom élevé, un clic qui rate un point de 3-4 px ouvre l'infobulle de la
**région** — le polygone est interactif partout, y compris entre les écoles. L'infobulle
régionale s'ouvre alors avec un `autoPan` qui déplace la carte de plusieurs centaines de
pixels, ce qui rend le pointage suivant plus difficile encore.

### 3. Onglet « Par départements »

Même structure, trois différences :

- H2 « **Subventions aux collectivités par départements** » ;
- contexte `dep` = `georef-france-departement`, `color-by-field="dep_code"`,
  `colorsdep` alimenté par `ods-analysis-x="code_departement"` ;
- **seuils différents** : `500 000 / 1 000 000 / 2 000 000 €`, et une légende
  correspondante (`0`→`500000` vert, `500001`→`1000000` jaune, `1000001`→`2000000` orange,
  `2000001`→`...` rouge). Cette légende-là est également juste.

Infobulle relevée mot pour mot sur le Nord :

```
Nord
Dépenses réalisées par les collectivités du département : 10 537 288 €
Subventions accordées : 5 270 453 €
Nombre d'écoles concernées: 684
Nombre de communes concernées : 314
```

Vérifiées à l'API : 5 270 453 ✔ · 684 ✔ · 314 ✔.
À l'écran, ~96 départements colorés ; le contraste vert / jaune / orange / rouge est bien
plus contrasté qu'à la maille régionale (les seuils sont mieux calés sur la distribution).

Le gabarit d'infobulle départemental est **le même fichier** que le régional, y compris le
libellé — ce qui est correct ici et faux dans l'autre onglet (voir Défauts n° 1).

## Défauts et bizarreries de l'original

1. **« du département » dans l'onglet régions.** Le gabarit d'infobulle a été copié de
   l'onglet départements sans changer le libellé : cliquer sur Auvergne-Rhône-Alpes affiche
   « Dépenses réalisées par les collectivités **du département** : 19 772 786 € ». Vérifié
   à l'écran sur deux régions.
2. **Six conventions et 178 006 € sortent silencieusement de la carte.**
   `code_region = "00"` regroupe **Polynésie française** (4 conventions, 124 834 €),
   **Saint-Barthélemy** (1, 53 172 €) et **Saint-Pierre-et-Miquelon** (1, 7 680 €).
   `georef-france-region` code ces territoires **987 / 977 / 975** : la clé « 00 » ne matche
   rien, `color-categories-other="lightgrey"` s'applique, et l'agrégat régional est perdu.
   Le même `code_region="00"` sert pour trois territoires distincts : **ce champ n'est pas
   une clé**. (Ces six lignes n'ont pas non plus de `departement` : 6 valeurs nulles.)
3. **Aucun DROM n'est visible.** `location="5,46,6"` sans refit : Guadeloupe, Martinique,
   Guyane, La Réunion, Mayotte sont dans le jeu (12 M€ cumulés, 580 écoles) et hors cadre.
   Il faut savoir qu'elles existent pour aller les chercher, et la carte ne le dit pas.
4. **`shape-opacity="0.95"` rend le fond inutile là où il servirait.** Au zoom 13 sur Lille,
   le rouge couvre la ville : les points d'écoles flottent sur un aplat, sans rue ni repère.
5. **Le polygone capte les clics destinés aux points.** À la maille où l'on regarde les
   écoles, la couche régionale reste interactive sur toute sa surface ; l'`autoPan` de
   l'infobulle déplace ensuite la carte. La couche de détail est pénible à utiliser
   précisément parce que la couche d'ensemble n'a pas été désactivée au zoom élevé
   (ODS a `show-zoom-max`, non utilisé ici).
6. **Une requête serveur par clic d'infobulle.** `ods-adv-analysis` dans un contexte
   imbriqué : chaque ouverture relance un `group_by` filtré. Sur 6 870 lignes agrégeables en
   une fois, c'est un aller-retour par curiosité. (Voir § Transposition : l'agrégat est
   gratuit côté client.)
7. **Le changement d'onglet détruit tout** (`keep-content="false"`) : le zoom, le pan et
   l'infobulle ouverte sont perdus. Comparer « ma région » et « mon département » impose de
   refaire le chemin deux fois.
8. **Aucun total national.** 103 M€, 12 670 écoles, 7 810 communes : aucun de ces trois
   nombres n'est affiché. Le lecteur ne peut se faire une idée de l'échelle du dispositif.
9. **Pas de montant par école ni par classe.** Seul un montant absolu est cartographié :
   la carte reproduit donc la carte des effectifs, et ne dit rien sur l'intensité de l'aide.
10. **Un ternaire de couleurs dans un attribut HTML.** Les seuils sont écrits deux fois
    (dans le `ng-init` et dans la légende HTML), sans lien entre les deux. Ce montage est
    exactement ce qui a produit le bug de légende de la vue « hybridation ».
11. **La carte ne remplit pas son conteneur** : `style="height: 500px"` dans un cadre plus
    haut → bandes grises au chargement (observé).
12. **Licence non renseignée** sur le jeu principal, et producteur absent.
13. **Bulle de chat par-dessus la carte**, en permanence.

## Transposition vers `dsfr-data`

### Architecture retenue et pourquoi

**6 870 + 12 624 lignes** : les deux tiennent côté client (622 Ko + 1 436 Ko gzip, 0,42 s +
1,01 s mesurés). **Invoquer une limite de performance ici serait faux.** Mais la couche
« écoles » à 12 624 points dépasse le plafond `max-items` par défaut de 5 000 (PG-013) :
il faut le relever explicitement, ou activer `cluster` (le JSDoc dit : « Avec `cluster`,
`max-items="20000"` est sans risque : les marqueurs regroupes ne pesent pas sur le DOM »),
ou passer la couche en `bbox`.

**La différence de fond avec la vue « hybridation » : ici le jeu n'a pas de `geo_shape`.**
La choroplèthe a donc besoin d'une géométrie extérieure. Trois voies, par ordre de
préférence :

1. **`dsfr-data-join`** entre l'agrégat régional (`dsfr-data-query group-by="code_region"`)
   et un GeoJSON de contours. Le dépôt en a déjà un :
   `public/data/geo/regions-simplifiees.geojson` (225 Ko) — **métropole seulement**
   (AM-016). Il faudrait le compléter des DROM pour ne pas répéter le défaut n° 3.
2. `georef-france-region` sur `public.opendatasoft.com` en source générique
   (`/exports/geojson?limit=-1`, mesuré **136 Ko gzip en 1,23 s**, 26 features). Attention :
   **`reg_code` y est un tableau** (`["02"]`, pas `"02"`) — la clé de jointure doit être
   normalisée. Le piège du dépôt « clés de jointure de types différents » (FP-012) dit que
   `dsfr-data-join` convertit en chaîne des deux côtés ; un **tableau** n'est pas ce cas et
   **n'a pas été testé** : à vérifier.
3. `dsfr-data-chart type="map-reg"` / `type="map-dep"` (DSFR Chart), qui porte ses propres
   contours SVG et prend un `code-field`. Il ne donne ni infobulle riche, ni couche de
   points par-dessus, ni classes exposées (le JSDoc de `dsfr-data-map-legend` le dit :
   « Hors périmètre : les cartes choroplèthes de `dsfr-data-chart type="map"` — échelle
   continue rendue par DSFR Chart, sans classes exposées »). **C'est la voie la plus courte
   si l'on renonce à la couche « écoles ».**

Recommandation : **voie 1** pour rester dans `dsfr-data-map` (la couche « écoles » en
dépend), avec un GeoJSON régional + départemental servi statiquement par le dépôt.

### Correspondance bloc à bloc

| Directive ODS de la vue personnalisée | Composant + attributs `dsfr-data` |
|---|---|
| `ods-simple-tabs` / `ods-simple-tab keep-content="false"` | `<div class="fr-tabs">` DSFR natif — **pas de composant `dsfr-data`**, c'est du DSFR pur. `keep-content="true"` (garder l'état des deux cartes) est le comportement DSFR par défaut : la reprise **corrige** le défaut n° 7 sans rien coder |
| `ods-dataset-context …-dataset="fr-en-aap-snee-collectivites"` | `<dsfr-data-source id="coll" url="…/fr-en-aap-snee-collectivites/exports/json">` |
| `ods-dataset-context …-dataset="fr-en-aap-snee-ecoles"` | `<dsfr-data-source id="eco" url="…/fr-en-aap-snee-ecoles/exports/json">` |
| `regions-dataset="georef-france-region" regions-domain="public.opendatasoft.com"` | `<dsfr-data-source id="geo-reg" url="/data/geo/regions.geojson" transform="features">` (statique, DROM inclus) |
| `ods-analysis-serie-montant="SUM(montant_de_la_subvention)" ods-analysis-x="code_region"` | `<dsfr-data-query id="q-reg" source="coll" group-by="code_region" aggregate="montant_de_la_subvention:sum:subv, depenses_realisees_par_la_collectivite:sum:dep, nombre_d_ecoles:sum:ecoles, nombre_de_communes:sum:communes">` — **un seul `group-by` sur un champ brut**, donc pas de fonction ODSQL : le piège PG-014 (`year(…)` entouré d'accents graves → 400) ne s'applique pas |
| `ng-repeat` + `ng-init` de ternaires bâtissant `colorsreg` | **rien** : `breaks="1000000,5000000,10000000"` sur la couche. Les seuils sont écrits **une seule fois**, et la légende les relit |
| `ods-map-layer display="categories" color-by-field="reg_code" color-categories="colorsreg"` | `<dsfr-data-join>` puis `<dsfr-data-map-layer type="geoshape" geo-field="geometry" fill-field="subv" breaks="1000000,5000000,10000000">` |
| `color-categories-other="lightgrey"` | comportement natif : une ligne sans valeur numérique n'est pas colorée (à vérifier au navigateur pour les régions non appariées) |
| `shape-opacity="0.95"` | `fill-opacity="0.6"` (défaut) — le 0,95 est un défaut, on ne le reproduit pas |
| légende HTML écrite à la main (2 fois, 2 jeux de seuils) | `<dsfr-data-map-legend for="…" label="Subventions accordées aux collectivités (€)">` — libellés dérivés des `breaks` (« Jusqu'à 1 000 000 », « De 1 000 000 à 5 000 000 », …, formatés `fr-FR`) |
| infobulle régionale via `ods-adv-analysis` (1 requête / clic) | `<dsfr-data-map-popup>` + `<template>` : la ligne jointe **porte déjà** les quatre agrégats, **zéro requête au clic** |
| `| number : 0` | `<dsfr-data-normalize round="…:0">` en amont (séparateur **virgule**), ou `format="nombre"` sur les KPI |
| `ods-map-layer display="raw" show-zoom-min="9"` (écoles) | `<dsfr-data-map-layer type="circle" min-zoom="9" max-items="15000" geo-field="position_ecole">` — **`max-items` explicitement relevé** (défaut 5 000 < 12 624, PG-013) |
| — (rien dans l'original) | `max-zoom="9"` sur la couche choroplèthe : elle s'efface quand la couche écoles apparaît → corrige les défauts n° 4 et 5 d'un attribut |
| — (rien dans l'original) | `<dsfr-data-kpi-group>` : 103 M€, 12 670 écoles, 7 810 communes, taux de couverture |
| — (rien dans l'original) | `<dsfr-data-search fields="nom_de_l_ecole, nom_de_la_commune_uai, uai">` |
| — (rien dans l'original) | `<dsfr-data-facets fields="region_academique_ou_com, academie, departement" sort="alpha:asc">` |
| outils de dessin, sélecteur de fond, géolocalisation | chrome du visualiseur d'actif ODS — **pas** de la vue. Ne pas les compter comme un manque |

### Esquisse de code

```html
<!-- ================= Sources ================= -->
<!-- 6 870 conventions : 622 Ko gzip, 0,42 s mesuré. -->
<dsfr-data-source id="coll"
  url="https://data.education.gouv.fr/api/explore/v2.1/catalog/datasets/fr-en-aap-snee-collectivites/exports/json">
</dsfr-data-source>

<!-- 12 624 écoles : 1 436 Ko gzip, 1,01 s mesuré. -->
<dsfr-data-source id="eco"
  url="https://data.education.gouv.fr/api/explore/v2.1/catalog/datasets/fr-en-aap-snee-ecoles/exports/json">
</dsfr-data-source>

<!-- Contours servis par le dépôt (DROM inclus, contrairement à AM-016 qui n'a que la métropole). -->
<dsfr-data-source id="geo-reg" url="/data/geo/regions.geojson" transform="features"></dsfr-data-source>
<dsfr-data-source id="geo-dep" url="/data/geo/departements.geojson" transform="features"></dsfr-data-source>

<!-- ================= Agrégats : une seule fois, côté client ================= -->
<dsfr-data-query id="q-reg" source="coll" group-by="code_region"
  aggregate="montant_de_la_subvention:sum:subv,
             depenses_realisees_par_la_collectivite:sum:dep,
             nombre_d_ecoles:sum:ecoles,
             nombre_de_communes:sum:communes"></dsfr-data-query>

<dsfr-data-query id="q-dep" source="coll" group-by="code_departement"
  where="code_departement:isnotnull"
  aggregate="montant_de_la_subvention:sum:subv,
             depenses_realisees_par_la_collectivite:sum:dep,
             nombre_d_ecoles:sum:ecoles,
             nombre_de_communes:sum:communes"></dsfr-data-query>

<!-- Géométrie + agrégat sur la même ligne : l'infobulle n'a plus rien à demander au serveur. -->
<dsfr-data-join id="reg-geo" source="geo-reg" with="q-reg" on="code" to="code_region"></dsfr-data-join>
<dsfr-data-join id="dep-geo" source="geo-dep" with="q-dep" on="code" to="code_departement"></dsfr-data-join>

<dsfr-data-search id="eco-q" source="eco"
  fields="nom_de_l_ecole, nom_de_la_commune_uai, uai"
  label="Rechercher une école bénéficiaire" operator="words" count url-sync></dsfr-data-search>

<div class="fr-container fr-mb-8w">

  <!-- ================= Ce que l'original ne calcule pas ================= -->
  <dsfr-data-kpi-group class="fr-mb-2w">
    <dsfr-data-kpi source="coll" value="montant_de_la_subvention:sum" format="nombre"
      unit="€" label="de subvention d'État" col="3"></dsfr-data-kpi>
    <dsfr-data-kpi source="coll" value="depenses_realisees_par_la_collectivite:sum"
      format="nombre" unit="€" label="dépensés par les collectivités" col="3"></dsfr-data-kpi>
    <dsfr-data-kpi source="coll" value="nombre_d_ecoles:sum" format="nombre"
      label="écoles concernées" col="3"></dsfr-data-kpi>
    <dsfr-data-kpi source="coll" value="nombre_de_communes:sum" format="nombre"
      label="communes concernées" col="3"></dsfr-data-kpi>
  </dsfr-data-kpi-group>
  <p class="fr-hint-text fr-mb-4w">
    6&nbsp;870 conventions signées. Six d'entre elles (Polynésie française,
    Saint-Barthélemy, Saint-Pierre-et-Miquelon, 178&nbsp;006&nbsp;€) portent le code région
    « 00 » et n'ont pas de contour associé&nbsp;: elles figurent dans les totaux et dans le
    tableau, pas sur la carte.
  </p>

  <!-- ================= Onglets DSFR natifs ================= -->
  <div class="fr-tabs">
    <ul class="fr-tabs__list" role="tablist" aria-label="Maille d'agrégation">
      <li role="presentation">
        <button id="t-reg" class="fr-tabs__tab" role="tab" aria-selected="true" aria-controls="p-reg">
          Par régions</button></li>
      <li role="presentation">
        <button id="t-dep" class="fr-tabs__tab" role="tab" aria-selected="false" aria-controls="p-dep">
          Par départements</button></li>
    </ul>

    <div id="p-reg" class="fr-tabs__panel fr-tabs__panel--selected" role="tabpanel" aria-labelledby="t-reg">
      <h2 class="fr-h4">Subventions aux collectivités par région</h2>
      <p class="fr-text--sm">Zoomez pour faire apparaître les écoles bénéficiaires.</p>

      <dsfr-data-map name="Subventions par région" center="46.55,2.5" zoom="5" height="560px"
        tiles="ign-plan" tiles-style="muted" insets="drom">

        <dsfr-data-map-layer id="c-reg" source="reg-geo" type="geoshape" geo-field="geometry"
          fill-field="subv" breaks="1000000,5000000,10000000"
          selected-palette="sequentialAscending" fill-opacity="0.6" color="#FFFFFF"
          max-zoom="9">                      <!-- s'efface quand les écoles apparaissent -->
        </dsfr-data-map-layer>

        <dsfr-data-map-layer id="c-eco-r" source="eco-q" type="circle" radius="4"
          geo-field="position_ecole" color="#2C3F56"
          min-zoom="9" max-items="15000"     <!-- 12 624 > défaut 5 000 (PG-013) -->
          tooltip-field="nom_de_l_ecole">
        </dsfr-data-map-layer>

        <dsfr-data-map-legend for="c-reg"
          label="Subventions accordées aux collectivités (€)"></dsfr-data-map-legend>

        <dsfr-data-map-popup mode="panel-right" width="360px">
          <template>
            <h3 class="fr-h6">{{nom}}</h3>
            <p class="fr-text--sm"><strong>Subventions accordées&nbsp;:</strong> {{subv}} €</p>
            <p class="fr-text--sm"><strong>Dépenses des collectivités&nbsp;:</strong> {{dep}} €</p>
            <p class="fr-text--sm"><strong>Écoles concernées&nbsp;:</strong> {{ecoles}}</p>
            <p class="fr-text--sm"><strong>Communes concernées&nbsp;:</strong> {{communes}}</p>
          </template>
        </dsfr-data-map-popup>
      </dsfr-data-map>
    </div>

    <div id="p-dep" class="fr-tabs__panel" role="tabpanel" aria-labelledby="t-dep">
      <!-- Idem avec source="dep-geo", breaks="500000,1000000,2000000". -->
    </div>
  </div>

  <!-- ================= Tableau : rien de tel dans l'original ================= -->
  <h2 class="fr-h4 fr-mt-4w">Les conventions signées</h2>
  <dsfr-data-facets source="coll" id="coll-f"
    fields="region_academique_ou_com, academie, departement"
    labels="region_academique_ou_com:Région académique ou COM | academie:Académie | departement:Département"
    searchable="departement" sort="alpha:asc" max-values="8" url-sync url-params>
  </dsfr-data-facets>
  <dsfr-data-list source="coll-f"
    columns="raison_sociale_du_signataire_de_la_convention, departement, nombre_d_ecoles, nombre_de_communes, montant_de_la_subvention"
    search sort pagination="25"></dsfr-data-list>
</div>
```

## Limites et points durs identifiés

1. **La choroplèthe a besoin d'une géométrie que le jeu ne porte pas.**
   *Obstacle* : `fr-en-aap-snee-collectivites` n'a qu'un `position`. Contrairement à
   `fr-en-hybridation_lycees_par_collectivite`, il faut apporter les contours.
   *Voie native* : `dsfr-data-join` sur un GeoJSON — c'est **le motif documenté** du dépôt
   (AM-016), et l'original fait exactement la même chose (il joint `georef-france-region`).
   *Verdict* : **ce n'est pas une limite de `dsfr-data`, c'est une propriété du jeu.**
   L'original paie le même prix, en pire (dépendance à `public.opendatasoft.com` au
   chargement de chaque onglet).
2. **`reg_code` de `georef-france-region` est un tableau.**
   *Obstacle* : l'export v2.1 donne `["02"]`, pas `"02"`. FP-012 du registre dit que
   `dsfr-data-join` convertit en chaîne des deux côtés — un `["02"]` deviendrait `"02"` en
   `String()`, ce qui marcherait par accident, mais **ce cas n'a pas été testé**.
   *Contournement sûr* : servir un GeoJSON statique depuis le dépôt (voie 1 ci-dessus), dont
   on maîtrise le type de la clé.
   *Verdict* : **non vérifié.** À tester si l'on tient à la source `georef` en ligne.
3. **Le contour des DROM n'est pas dans le GeoJSON du dépôt.**
   *Obstacle* : `public/data/geo/regions-simplifiees.geojson` est métropole seule (AM-016).
   *Conséquence* : reproduire tel quel reproduirait le défaut n° 3 de l'original.
   *Contournement* : compléter le fichier (les contours DROM sont dans `georef-france-region`
   et pèsent peu), puis `insets="drom"` sur la carte.
   *Verdict* : **travail de données, pas limite de bibliothèque.**
4. **Ni « montant par école », ni « taux de couverture » comme champ dérivé.**
   *Obstacle* : `dsfr-data-query aggregate` fait des agrégats (`sum`, `count`, `avg`…), pas
   un ratio entre deux agrégats. `dsfr-data-normalize` fait de l'arrondi et du nettoyage,
   pas du calcul.
   *Voie native essayée* : `aggregate="montant_de_la_subvention:avg:…"` donne la moyenne
   par **convention**, pas par école. Aucune combinaison d'attributs ne donne `subv/ecoles`.
   *Contournement* : source générique ODSQL (`url=` + `params` avec
   `select=sum(montant_de_la_subvention)/sum(nombre_d_ecoles) as euro_par_ecole&group_by=code_region`),
   qui **n'écoute plus le contexte** — le contournement des `group-by` à fonction (PG-014)
   s'applique ici de la même façon.
   *Verdict* : **manque réel, à remonter** — un champ calculé (`compute="ratio=a/b"`) sur
   `dsfr-data-query` ou `dsfr-data-normalize`. Non bloquant : l'original ne le fait pas non
   plus, et la source générique le rend en une balise si on accepte de figer le filtrage.
5. **12 624 points sur une couche non clusterisée.**
   *Obstacle* : `max-items` vaut 5 000 par défaut → bandeau de troncature (PG-013).
   *Voies natives* : `max-items="15000"` (marqueurs `circle`, pas de `divIcon` : le DOM
   tient), `cluster` (le JSDoc autorise 20 000), ou `bbox` (rechargement par viewport — mais
   le JSDoc avertit que « le tout premier fetch de la source reste NON filtre »).
   *Verdict* : **trois voies natives, aucune limite.** Noter que **l'original a le même
   problème et le résout par `show-zoom-min="9"`** — c'est-à-dire en ne dessinant jamais les
   12 624 points d'un coup ; `min-zoom="9"` fait pareil.
6. **Onglets.** `ods-simple-tabs` n'a pas d'équivalent `dsfr-data` — et n'en a pas besoin :
   `fr-tabs` du DSFR est le composant idoine, et il **garde** le contenu des panneaux
   (l'inverse du `keep-content="false"` de l'original). *Verdict* : pas un manque.
7. **Les outils de dessin (filtre par polygone / rectangle / cercle).**
   *Constat* : ils viennent du **visualiseur d'actif ODS**, pas de la vue personnalisée.
   `dsfr-data-map` n'a pas de filtre par zone dessinée ; le plus proche est `bbox`
   (chargement, pas filtre) et `refine-on-click` (un objet, pas une zone).
   *Verdict* : **chrome de portail open data.** Ne pas le compter comme un manque de
   `dsfr-data`. Si le besoin est réel sur un projet, la demande à formuler est « filtre par
   emprise dessinée », pas « les outils d'ODS ».
8. **Ce que la transposition gagne** : les quatre totaux nationaux, une légende qui ne peut
   pas diverger des seuils, zéro requête par clic d'infobulle, les DROM visibles, les six
   conventions « code 00 » comptées et signalées, une recherche d'école, des facettes avec
   compteurs, un tableau accessible, et une choroplèthe qui s'efface quand les points
   apparaissent. Neuf des treize défauts relevés tombent d'eux-mêmes.

## Données à reproduire fidèlement

- [ ] **6 870** conventions, **12 670** écoles, **7 810** communes.
- [ ] **103 095 993,73 €** de subvention pour **196 533 726,48 €** de dépenses (52,5 %).
- [ ] **Deux mailles** au choix : région (seuils 1 M / 5 M / 10 M) et département
      (seuils 500 k / 1 M / 2 M) — et **deux légendes** qui les disent exactement.
- [ ] Régions : Île-de-France 16 820 965 € · ARA 11 643 780 € · Hauts-de-France 11 206 064 €
      (rouge) ; Occitanie, Grand Est, Nouvelle-Aquitaine, PACA, Pays de la Loire, Bretagne
      (orange) ; Normandie, Centre-Val de Loire, BFC (jaune) ; Corse 569 748 € (vert).
- [ ] Départements : Nord 5 270 453 € / 684 écoles / 314 communes (valeur de contrôle).
- [ ] **Les cinq DROM visibles** (Guadeloupe 1 097 728 € · Martinique 1 500 361 € ·
      Guyane 1 397 834 € · La Réunion 1 418 731 € · Mayotte 1 803 082 €).
- [ ] Les **six conventions `code_region = "00"`** (178 006 €) comptées dans les totaux et
      signalées comme non cartographiables.
- [ ] Couche écoles à partir du zoom 9, **12 624 points**, `max-items` relevé.
- [ ] Infobulle de maille : dépenses, subventions, nombre d'écoles, nombre de communes —
      **avec le bon mot** (« de la région » sur l'onglet régions).
- [ ] Infobulle école : nom, nombre de classes, région, département, commune, collectivité
      signataire.
- [ ] Titres : « Subventions aux collectivités par régions » / « … par départements »,
      légende « Subventions accordées aux collectivités ».
