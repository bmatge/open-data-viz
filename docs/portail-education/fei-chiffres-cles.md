# Données ouvertes de France Éducation international (chiffres clés)

- **URL** : https://data.education.gouv.fr/p/fei-chiffres-cles-france-education-international/
- **Id catalogue** : 22 · **Titre au catalogue** : « Données ouvertes de France Éducation international ».
  **Titre de la page Studio** : « Chiffres clés - France Éducation international ». **Titre affiché en
  H1** : « Données ouvertes de France Éducation international ». Trois libellés pour un objet.
- **Nature de la cible** : **page Opendatasoft Studio** (`/p/<slug>/`, `uid: sp_kav971`,
  `updated_at` **2026-03-06T16:21:30Z** — la page Studio la plus récemment modifiée du lot).
  Configuration récupérée à `GET /api/portal/v1.0/studio_pages/fei-chiffres-cles-france-education-international`,
  archivée dans `docs/portail-education/_sources/fei-chiffres-cles-france-education-international.studio.json`.
- **Description de l'actif** : « Cette page présente les données publiées par **France Éducation
  international,** opérateur du Ministère de l'éducation nationale, de l'enseignement supérieur et de la
  recherche » (la virgule est bien à l'intérieur du gras dans le HTML de la description).
- **Relevé visuel** : 2026-09-10, Chrome (extension `claude-in-chrome`), viewport 1568 × 751 CSS px
  (mise en page large, deux ou trois colonnes selon la section).
- **Producteur de tous les jeux** : **France Éducation international**. Licence **Ouverte v2.0
  (Etalab)** partout. Tous les jeux sont `visibility: domain` et lisibles avec la clé publique du
  portail.

## Les neuf jeux de données

`content.data_providers` déclare neuf jeux, un par bloc-métier. Volumes et fraîcheur relevés à
`/catalog/datasets/<id>` le 2026-09-10.

| # | `datasetId` | Lignes | Champs | Champ « année » | Modifié | Blocs qui l'utilisent |
|---|---|---:|---:|---|---|---|
| 1 | `fr-en-delf-dalf_inscrits_centres` | **23 648** | 12 | `annee` (**date**) | 29/01/2026 | KPI + carte + top 10 |
| 2 | `fr-en-tcf_inscrits_centres` | **4 148** | 9 | `annee` (**date**) | 29/01/2026 | KPI + carte + top 10 |
| 3 | `fr-en-belc-participants-par-pays` | **302** | 7 | `annee` (**date**) | 29/01/2026 | KPI + carte + top 10 |
| 4 | `fr-en-reconnaissance_diplomes_comparabilite` | **1 186** | 6 | `annee` (**text**) | 02/02/2026 | KPI + carte + top 10 |
| 5 | `fr-en-assistants_langue_francaise` | **98** | 7 | `periode` (**int**) | 02/02/2026 | KPI + carte |
| 6 | `fr-en-assistants_langues_vivantes_etrangeres` | **200** | 8 | `periode` (**int**) | 02/02/2026 | KPI + carte |
| 7 | `fr-en-programmes-mobilite-enseignante-fei` | **35** | 4 | `annee` (**date**) | 29/01/2026 | KPI seul |
| 8 | `fr-en-cefte` | **19** | 11 | `annee_debut/fin_missions` (text) | 29/01/2026 | carte de points |
| 9 | `fr-en-centres-…-label-qualite-francais-langue-etrange` | **111** | 8 | — | **08/09/2026** | carte de points |

**Trois typages différents pour le même concept d'année** — `date` (5 jeux), `text` (ENIC-NARIC),
`int` (les deux jeux « assistants ») — dans neuf jeux du même producteur. La configuration Studio
paie cette hétérogénéité : voir § « Grammaire des conditions ».

**Champs de rattachement géographique** : les six jeux « pays » portent tous le triplet
`iso_pays` (alpha-3) / `cog_pays` / `iso2_pays` (alpha-2). C'est `iso2_pays` qui sert de `dataKey` aux
six choroplèthes. **Deux jeux ont des lignes sans `iso2_pays`** : `fr-en-reconnaissance_diplomes_comparabilite`
(28 lignes) et `fr-en-assistants_langues_vivantes_etrangeres` (9 lignes) — voir § Défauts n° 3.
`fr-en-cefte` porte `position` (geo_point_2d, 19/19 renseignées) et
`fr-en-centres-…-label-qualite` porte `centroid` (geo_point_2d).

## Objectif de la dataviz et informations véhiculées

- **Question posée** : « Que fait France Éducation international, en combien, et dans quels pays ? »
  C'est une **vitrine d'opérateur**, pas une exploration : sept chiffres clés de l'année 2025, chacun
  décliné en un top 10 pays et/ou une carte mondiale.
- **Message porté** : l'activité de FEI est **mondiale et massive sur la certification** (513 435
  inscrits DELF-DALF, 310 473 au TCF, 167 et 114 pays), **et beaucoup plus resserrée sur la formation
  et la mobilité** (1 146 participants BELC, 1 486 + 4 376 postes d'assistants, 522 postes de mobilité).
- **Ce que l'utilisateur doit obtenir** : un ordre de grandeur par activité, le classement des pays, et
  un chemin vers les jeux sources. **Le troisième point échoue** : voir § Défauts n° 1.
- **Ce qui n'est pas dans l'objet** :
  - **aucune série temporelle**, alors que les six jeux principaux couvrent 2 à 7 années (DELF-DALF
    2023-2025, TCF 2023-2025, BELC 2024-2025, ENIC-NARIC **2019-2025**, assistants 2023-2025, mobilité
    2024-2025). L'année 2025 est **écrite en dur** dans les conditions des 17 blocs de données ;
  - **aucun filtre**, aucun sélecteur d'année, aucune comparaison n/n-1 ;
  - **aucun taux** : ni taux de réussite (le jeu DELF-DALF porte pourtant `inscrits`, `presents`,
    `admis`), ni part d'un pays dans le total ;
  - **aucune ventilation par `niveau` ni par `declinaison`** (DELF-DALF : A1…C2, « tout public »,
    « junior », « scolaire », « prim »), ni par `langue` (assistants LVE), ni par
    `programmes_de_mobilite` — alors que ces colonnes existent et que le jeu de mobilité tient en
    35 lignes ;
  - **aucune carte de la mobilité enseignante**, seul KPI sans carte ;
  - **aucune liste, aucun tableau, aucun export global**.

## Relevé visuel exhaustif, bloc par bloc

Onze sections dans `content.layouts.default`. Pas de fil d'Ariane, **pas de H1 de portail** : la page
commence par le bandeau logo. **Aucun bloc `filters`** (`content.filters.layout` vide).

### 1. Section d'en-tête (`section_M2J1806RRQD5S`, trois colonnes)

- `block_M3WS2F54FCPUE` — `media` `/assets/theme_image/doublelogorffei.jpg`, `fit: original`,
  **`alt=""`**. Rendu : bloc-marque « RÉPUBLIQUE FRANÇAISE » + logotype « FRANCE ÉDUCATION
  INTERNATIONAL », aligné à gauche.
- `block_M3WS5XS0AYDO8` — bloc `text` dont le contenu est **`"# "`** : un titre de niveau 1 **vide**.
- `block_M6RRTYPRBE64D` — bloc `text` dont le contenu est **`" "`** : un espace.

Deux blocs vides sur trois dans la première section : ce sont des cales de mise en page.

### 2. Section titre (`section_M6QPAX422DPRZ`, `block_M6QPAX429EKQ3`, aligné à gauche)

Markdown source :

```
# **Données ouvertes de France Éducation international**

##

---

## **Explorez** nos données et accédez à des **cartes et graphiques** à partir des liens "Voir la source"

*Pour plus d'informations sur nos activités : [<https://www.france-education-international.fr>](https://www.france-education-international.fr/)*
```

Rendu observé : le H1 « **Données ouvertes de France Éducation international** », un filet
horizontal, puis en gros caractères « **Explorez** nos données et accédez à des **cartes et graphiques**
à partir des liens "Voir la source" », puis en italique gris « *Pour plus d'informations sur nos
activités : <https://www.france-education-international.fr>* ».

Deux défauts nés du markdown, tous deux visibles :
- le `##` vide produit un **titre de niveau 2 vide** ;
- l'auto-lien est écrit `[<https://…>](https://…/)`, si bien que **les chevrons `<` et `>` sont
  affichés littéralement** dans le libellé du lien.

Et surtout : **« Voir la source » n'existe nulle part sur la page.** Relevé exhaustif du texte de la
page (`get_page_text`) : la chaîne n'apparaît que dans cette phrase. Ce qui existe, c'est le kebab
« ⋮ » de chaque bloc, dont la première entrée s'appelle « **View dataset source** » — **en anglais**.
La consigne d'usage de la page renvoie donc à un élément qui ne porte pas ce nom et n'est pas en
français.

### 3. Section « 2 KPI certification » (`section_M3SLJ7PTDC4AI`, deux colonnes)

Deux blocs `kpi` `simple`, `layout_context_and_image`, `notation: standard`,
`maximumFractionDigits: 2`. Rendu : logo de la certification en haut, **valeur magenta en gros**,
libellé gris en dessous. Séparateur de milliers = espace fine.

| Bloc | Jeu | Formule Studio | Écran | Vérifié à l'API |
|---|---|---|---|---|
| `block_M3SLJ7PUO91CQ` | DELF-DALF | `sum(inscrits)` where `annee ≥ 2025-01-01` **et** `annee ≤ 2025-01-01` | **513 435**<br>« Inscrits 2025 au DELF (Diplôme d'études en langue française) et DALF (Diplôme approfondi de langue française) » | `sum(inscrits) where year(annee)=2025` → **513 435** ✔ |
| `block_M3SLJ7PURWH6V` | TCF | `sum(inscrits)`, même double borne | **310 473**<br>« Inscrits 2025 au TCF (Test de connaissance du français) » | **310 473** ✔ |

Les deux blocs portent un `styles.title` = « **Inscrits 2023** » — un reste d'une version antérieure.
**Il n'est pas affiché** : le gabarit `layout_context_and_image` ne rend que l'image, la valeur et le
`context`. Le titre mort est donc invisible à l'écran mais présent dans la configuration ; il
ressortirait au premier changement de gabarit.

### 4. Section « 2 cartes mondiales certification » (`section_M64Y2USM29Z0Y`)

Deux blocs `map` `mapType: choropleth.georef`, `shapeSource: {type: georef, layer: **world**,
breakdown: 20}` (= les pays), `dataKey: iso2_pays`, `bbox: [-170, -75, 180, 85]`,
`aspectRatio: 16-9`, `layout_tt_ll`, échelle `gradient`.

| Bloc | Titre | Formule | Jeton de couleur | Légende observée | Maximum réel |
|---|---|---|---|---|---|
| `block_M64Y2USMBCJ06` | « DELF DALF - inscrits 2025 » | `sum(inscrits)`, 2025 | `@chart[14]` | « Inscrits » **4 → 100 k** | France **102 934** |
| `block_M64Y2USMFFCIA` | « TCF - inscrits 2025 » | `sum(inscrits)`, 2025 | `@chart[8]` | « Inscrits » **1 → 73 k** | France **72 807** |

Rendu observé : planisphère (projection équirectangulaire), fond blanc, **pas de tuiles** ; les pays
sans donnée sont **gris clair**, les autres en dégradé **orange saumon → rouge très sombre**.
Contours blancs. Contrôles `+` / `−` seulement ; mention « **Utilisez ⌘ + molette pour zoomer la
carte.** » ; attribution « **Made with Natural Earth** » avec un bouton `ⓘ`. Pas de plein écran.
**Les deux cartes rendent la même palette orange-rouge** bien que la configuration désigne deux
jetons différents (`@chart[14]` et `@chart[8]`) : à l'écran, la distinction n'est pas perceptible.

Sur les deux cartes, la France est le pays le plus foncé — ce qui est correct (les centres de passation
en France concentrent 20 % des inscrits DELF-DALF et 23 % du TCF) mais visuellement contre-intuitif
pour une carte « internationale ».

### 5. Section « 2 top 10 certification » (`section_M64UGUTKWROTZ`)

Deux blocs `chart` `comparison.columns`, `limit: 10`, `order … DESC`, série `@chart[2]` (bleu-violet),
`layout_xy_tt_gr`, `displayFormat: compact_short / 1 décimale`.

**a) « DELF DALF - Top 10 pays 2025 »** (`block_M64UGUTKZ55CS`, `xField: pays`, `sum(inscrits)`) :
10 barres verticales, axe Y « **Inscrits** » gradué **0 → 120 k par 20 k** (format compact),
axe X « **Pays** », étiquettes obliques. Valeurs relevées à l'API, dans l'ordre affiché :
**France 102 934 · Allemagne 42 280 · Italie 34 047 · Espagne 32 026 · Grèce 24 422 · Canada 20 434 ·
Madagascar 17 363 · Mexique 16 988 · Inde 11 035 · Suisse 10 972**. (11ᵉ et 12ᵉ, hors graphique :
Égypte 10 288, Chine 9 068.)

**b) « TCF - Top 10 pays 2025 »** (`block_M64UGUTK4VN35`, `xField: **pays_centre**`) : même gabarit,
axe Y « Inscrits » **0 → 80 k par 10 k**. **France 72 807 · Canada 67 413 · Algérie 50 386 ·
Cameroun 36 895 · Maroc 28 300 · Tunisie 8 599 · Côte d'Ivoire 7 337 · Chine 5 278 · Burundi 2 563 ·
Viet Nam 2 437**.

L'axe X est intitulé « Pays » dans les deux cas, alors que le champ TCF s'appelle `pays_centre`
(pays du **centre de passation**, pas du candidat) — nuance perdue.

### 6. Section « 2 KPI formation / reconnaissance » (`section_M5UWMM49D4JB1`)

| Bloc | Jeu | Formule | Écran | API |
|---|---|---|---|---|
| `block_M5UWFA77RIM9K` | BELC | `sum(nombre_participants)` where `annee` = 2025 (double borne date) | **1 146**<br>« Professionnels formés lors des Universités BELC en 2025 » | **1 146** ✔ |
| `block_M3SMG0LZCVDX8` | ENIC-NARIC | `sum(dossiers_expertises)` where **`annee = "2025"` (type `text`, opérateur `=`)** | **50 477**<br>« Dossiers de comparabilité de diplômes expertisés par le centre ENIC NARIC France en 2025 » | **50 477** ✔ |

Le libellé du second dit « **ENIC NARIC** » sans trait d'union, quand le titre du jeu écrit
« ENIC-NARIC ».

### 7. Section « 2 top 10 formation / reconnaissance » (`section_M64UNW4E0UX89`)

**a) « BELC - top 10 pays d'exercice des participants en 2025 »** (`block_M64UNW4E3UIF7`,
`xField: pays_participants`, `sum(nombre_participants)`, limit 10) : axe Y « **Participants** »
0 → 300 par 50 ; axe X « Pays ». **Égypte 294 · France 156 · Angola 68 · Algérie 65 · Tunisie 62 ·
Viet Nam 60 · Allemagne 32 · Maroc 27 · Rwanda 21 · Bangladesh 16**.

**b) « Dossiers de comparabilité expertisés - top 10 en 2025 »** (`block_M64UNW4EF78EQ`,
`xField: pays`, `sum(dossiers_expertises)`) : axe Y « **Dossiers expertisés** » 0 → 9 k par 1 k ;
axe X « Pays ». **Algérie 8 204 · Tunisie 4 928 · Maroc 4 510 · Cameroun 2 342 · Ukraine 2 258 ·
Sénégal 1 618 · Côte d'Ivoire 1 605 · Bénin 1 156 · République du Congo 1 140 · Brésil 1 022**.

Les libellés d'axe X longs (« République du Congo ») sont affichés en entier, en oblique.

### 8. Section « 2 cartes mondiales formation / reconnaissance » (`section_MKCH9TYDI63AY`)

Même gabarit que la section 4, `@chart[14]` pour les deux.

| Bloc | Titre | Légende observée | Maximum réel |
|---|---|---|---|
| `block_MKCH9TYDL5K2R` | « BELC - participants par pays - 2025 » | « Participants 2025 » **1 → 290** | Égypte **294** |
| `block_MKCM4XGOO56NK` | « Dossiers expertisés par pays - 2025 » | « Dossiers expertisés 2025 » **1 → 8,2 k** | Algérie **8 204** |

La carte BELC a **beaucoup plus de gris** que celles de la certification (106 pays renseignés sur
~250 tracés).

### 9. Section « 3 KPI assistants et mobilité » (`section_M2J18B1US8CSX`, trois colonnes)

| Bloc | Jeu | Formule | Gabarit | Écran | API |
|---|---|---|---|---|---|
| `block_M2J18B1U9NNFB` | assistants FR | `sum(postes_offerts)` where **`periode = "2025"` (type `text`, opérateur `=`, sur un champ `int`)** | `layout_context_and_image` (logo « ASSISTANTS DE LANGUE ») | **1 486**<br>« Assistants de langue française à l'étranger - postes offerts 2025 » | **1 486** ✔ |
| `block_M2J18B1U34XI6` | assistants LVE | idem | idem, **même logo** | **4 376**<br>« Assistants de langues vivantes étrangères en France - postes offerts 2025 » | **4 376** ✔ |
| `block_M60IEJ2XX56T7` | mobilité | `sum(postes)` where `annee` = 2025 (double borne date) | **`layout_context_only`** — **pas d'image** | **522**<br>« Postes de mobilité enseignante offerts en 2025 » | **522** ✔ |

Le troisième KPI est le seul de la page sans visuel : dans une rangée de trois cartes, **la troisième
n'a pas de logo et sa valeur remonte visiblement plus haut** que celles de ses voisines. Le second
porte lui aussi un `styles.title` mort (« …postes offerts 2023/2024 »), invisible au rendu.

### 10. Section « 2 cartes mondiales assistants » (`section_M64VEWWI1QACI`)

| Bloc | Titre | `displayFormat.notation` **configuré** | Légende **observée** | Maximum réel |
|---|---|---|---|---|
| `block_M64VEWWIKRF8S` | « Assistants de langue française - postes offerts 2025 » | `compact_short` | « Postes offerts » **1 → 450** | Espagne **451** |
| `block_M64VEWWI7HK5Z` | « Assistants de langues vivantes étrangères - postes offerts 2025 » | **`standard`** | « Postes offerts » **0 → 1,2 k** | États-Unis **1 180** |

**Écart configuration / rendu** : la seconde carte est configurée en notation `standard` et affiche
pourtant « **1,2 k** », c'est-à-dire du compact. **Le rendu gagne : la notation configurée n'est pas
appliquée à la légende de la choroplèthe.** (Observé à l'écran, une fois, sur ce seul cas de la page.)

La borne basse **0** de la seconde carte n'est pas une erreur : le **Malawi** a bien `postes_offerts = 0`
en 2025 (vérifié à l'API), ce qui étire l'échelle vers le bas.

Ces deux cartes sont celles où le gris domine le plus : 33 pays renseignés pour la première, 67 pour la
seconde.

### 11. Section « 2 cartes de points » (`section_M34AX55I1QFRY`)

Deux blocs `map` `mapType: **poi**`, `basemap: **jawg.streets**` (tuiles raster claires, mer bleue,
labels de pays), `layout_tt_ll`, une seule géométrie, `dividedByCategory: **false**` (une seule
catégorie), `style.type: circle`.

**a) « Campus professionnel franco-étranger (CPFx) »** (`block_M34AX55IBJD9V`, jeu `fr-en-cefte`,
champ géographique `position`) :
- Une catégorie : `label: "Centres"`, couleur `@chart[11]`, icône `ods-picto-v3:college_vocational`.
  Rendu : **pastille circulaire brun-rosé pâle, cerclée de brun foncé, avec un picto « chapeau
  d'étudiant » brun au centre**.
- **Légende sous la carte** : titre « **Centres** » puis une entrée « ● Centres ».
  (`legendLabel` = « Centres », `categories[0].label` = « Centres » : le titre et l'unique entrée
  portent le même mot.)
- Cadrage : planisphère centré sur l'Afrique/Asie. **19 enregistrements, ~14 pastilles visibles** :
  Buenos Aires, Ho Chi Minh et Santiago portent chacune deux campus superposés.
- **Contrôles** : `+`, `−`, et un bouton **plein écran** (⛶) — que les six choroplèthes n'ont pas.
- **Popup au clic** (`type: tooltip`, `layout: layout_title_context`) : carte blanche, **titre = le
  champ `pays`**, puis une paire « Libellé : / valeur » par champ, dans l'ordre configuré
  `ville, thematique, partenaire_educatif_local, annee_debut_missions, annee_fin_missions`.
  Relevé mot pour mot sur le point du Liban :
  ```
  Liban
  Ville :                      Beyrouth
  Thématique :                 Énergie
  Partenaires éducatifs :      USEK,Dekwaneh,
  Année début mission(s) :     2023
  Année fin mission(s) :       2024
  ```
  Deux observations : (i) la popup a une **hauteur fixe d'environ 180 px et devient scrollable** —
  à l'ouverture, seuls les trois premiers champs sont visibles, sans aucune affordance ; il faut
  découvrir qu'on peut y molette. (ii) `partenaire_educatif_local` est un **tableau** dans l'API
  (`["USEK,Dekwaneh,"]`) : la valeur est affichée telle quelle, virgules et virgule finale comprises.
- Le **titre de la popup est le pays**, pas le campus : deux campus argentins ouvrent deux popups
  intitulées « Argentine ».
- Le nom du jeu (« Campus professionnel franco-étranger (CPFx) (ex Centres d'excellence de formation
  technique à l'étranger (CEFTE)) ») explique l'identifiant `fr-en-cefte`.

**b) « Centres et établissements labellisés "Label qualité français langue étrangère" »**
(`block_M34AX55IUR93P`, jeu des 111 centres, champ géographique **`centroid`**) :
- Une catégorie : `label: "Centres"`, couleur `@chart[3]`, icône `ods-picto-v3:school`.
  Rendu : **pastille bleu-violet clair cerclée de violet, picto « établissement scolaire » blanc**.
- **Légende** : titre « **Centres et établissements** », une entrée « ● Centres » — le titre et
  l'entrée divergent ici, contrairement à la carte voisine.
- Cadrage : France + pays limitrophes (Londres, Allemagne, Suisse, Autriche, Italie, Slovénie visibles).
  Les 111 points **se superposent massivement** dans les grandes villes ; **aucun clustering**, aucun
  compteur.
- Popup configurée avec `titleField: nom_du_centre` et `contextFields: ville, site_web`. Le jeu porte
  aussi `telephone`, `contact`, `code_postal`, `region` — **non exposés**.
- Bouton plein écran présent.

### 12. Kebab « ⋮ » (sur chacun des 17 blocs de donnée)

`View dataset source` (**en anglais**), `Exporter au format PNG`, `Exporter au format CSV`,
`Exporter au format JSON`, `Exporter au format Excel`.

### 13. Chrome de page et pied

En-tête portail (GOUVERNEMENT / data.education.gouv.fr, **Connexion** / **Inscription**, menu
« Données · Data-visualisations · Démarche · Créer une carte · Créer un graphique · Nous contacter »).
Pied DSFR standard, licence etalab-2.0. **Bulle de chat magenta** flottante en bas à droite.

## Grammaire des conditions Studio, telle qu'elle est écrite ici

Trois écritures coexistent pour dire « année 2025 », une par typage :

| Type du champ | Écriture Studio | Ce que ça produit |
|---|---|---|
| `date` (DELF, TCF, BELC, mobilité) | **deux** conditions : `post_or_equal 2025-01-01` **et** `prior_or_equal 2025-01-01` | un encadrement `≥ ET ≤` sur la **même** date — donc une égalité stricte, puisque `annee` ne stocke que des 1ᵉʳ janvier |
| `text` (ENIC-NARIC) | une condition `= "2025"` de `type: text` | égalité de chaîne |
| `int` (assistants) | une condition `= "2025"` de `type: **text**` | égalité, la valeur `2025` étant comparée en texte à un champ entier — ODS l'accepte |

C'est un bon révélateur du modèle Studio : **la condition est typée dans la configuration, pas déduite
du schéma**, et l'auteur doit choisir le bon type à la main. Le double encadrement de date est la
seule manière d'exprimer « exactement cette année » quand l'éditeur ne propose que des comparateurs
d'ordre.

## Défauts et bizarreries de l'original

1. **La consigne d'usage renvoie à quelque chose qui n'existe pas.** « Explorez nos données et accédez
   à des cartes et graphiques à partir des liens "Voir la source" » : aucun lien de ce nom sur la
   page. Le seul chemin vers les jeux est l'entrée **« View dataset source »**, en anglais, cachée dans
   un kebab par bloc. Pour une page dont le titre est « Données ouvertes de… », c'est le défaut n° 1.
2. **La borne haute des légendes de carte est arrondie *sous* le maximum réel**, sur quatre des six
   choroplèthes : 100 k pour 102 934 (DELF-DALF), 290 pour 294 (BELC), 450 pour 451 (assistants FR),
   8,2 k pour 8 204 (ENIC-NARIC, arrondi acceptable). Le pays le plus foncé est donc hors de l'échelle
   annoncée. Le même effet est constaté sur la page Cactus (220 pour 223).
3. **Deux cartes perdent des données sans le dire, parce que le pays n'a pas de code ISO.**
   - `fr-en-reconnaissance_diplomes_comparabilite` : 28 lignes sans `iso2_pays`, dont **85 dossiers en
     2025** répartis sur trois entités historiques — *Ex-Union Des Republiques Socialistes Sovietiques
     (Ex-Urss)* **71**, *Ex-Republique Du Zaire* **13**, *Ex-Yougoslavie* **1**.
   - `fr-en-assistants_langues_vivantes_etrangeres` : 9 lignes sans code, dont **90 postes en 2025** —
     *Jamaïque et Bahamas* **40**, *Trinité-et-Tobago / Barbade* **40**, *OECO* **10** (ce sont des
     regroupements de pays, pas des pays).
   Ces valeurs sont dans les KPI (50 477 et 4 376) **mais absentes des cartes**, sans mention.
   Sur les assistants LVE, cela fait **2,1 % des postes** invisibles.
4. **La notation configurée n'est pas appliquée** à la légende de la carte des assistants LVE
   (`standard` demandé, « 1,2 k » rendu).
5. **Deux `styles.title` morts** dans la configuration : « Inscrits 2023 » sur les deux KPI de
   certification (qui affichent 2025), « …postes offerts 2023/2024 » sur le KPI assistants LVE.
   Invisibles au rendu du fait du gabarit, mais faux.
6. **Un `##` vide** dans le markdown du bloc de titre → un titre de niveau 2 vide dans le document.
7. **Les chevrons de l'auto-lien markdown sont affichés** : « <https://www.france-education-international.fr> ».
8. **Deux blocs de texte vides** (`"# "` et `" "`) dans la première section, employés comme cales.
9. **Le troisième KPI de la rangée « assistants » n'a pas d'image** (`layout_context_only` au lieu de
   `layout_context_and_image`) : rangée visuellement bancale.
10. **Deux jeux différents partagent le même logo** (« ASSISTANTS DE LANGUE ») sur deux KPI voisins qui
    mesurent des choses opposées (postes **à l'étranger** vs postes **en France**).
11. **Aucun sélecteur d'année**, alors que six jeux couvrent 2 à 7 millésimes et que le seul travail à
    faire serait de rendre la condition variable. ENIC-NARIC publie 2019→2025 ; la page n'en montre
    qu'un septième.
12. **La popup CPFx est haute de ~180 px, scrollable, sans affordance** : trois champs sur cinq à
    l'ouverture.
13. **Le titre de la popup CPFx est le pays**, pas le campus : deux popups « Argentine », trois
    « Chili », trois « Viet Nam ».
14. **Aucun clustering sur les 111 centres labellisés** : les points se recouvrent dans toutes les
    grandes villes.
15. **`telephone`, `contact`, `code_postal` et `region` du jeu des centres labellisés ne sont pas
    exposés**, alors que ce jeu est le seul de la page qui ressemble à un annuaire utile.
16. **Trois libellés pour la page** (« Données ouvertes de France Éducation international » au H1 et au
    catalogue, « Chiffres clés - France Éducation international » au titre Studio et à l'onglet).
17. **« ENIC NARIC » sans trait d'union** dans le libellé du KPI, « ENIC-NARIC » dans le titre du jeu.
18. **`pays_centre` présenté comme « Pays »** sur le top 10 TCF : le pays du centre de passation n'est
    pas la nationalité du candidat.
19. **`alt=""` sur le logo FEI** : le bloc-marque de l'opérateur est traité comme décoratif.
20. **Beaucoup de blocs pour peu de chiffres** : **19 blocs de données** (7 KPI, 4 graphiques en barres,
    6 planisphères, 2 cartes de points) pour **7 valeurs clés**, et six planisphères de même gabarit
    dont quatre sont presque entièrement gris ou presque entièrement colorés. Le rapport texte/donnée
    est en revanche **très favorable à la donnée** : deux paragraphes en tout (le titre et sa consigne),
    pas une ligne de commentaire d'analyse, pas une note de méthode — pour une page dont l'objet est
    d'être la vitrine chiffrée d'un opérateur, l'absence de définition (que compte-t-on comme
    « inscrit » ? un candidat ou une inscription à une épreuve ?) se fait sentir.

## Transposition vers `dsfr-data`

### Architecture retenue et pourquoi — le point mesuré

Neuf jeux, dont un de 23 648 lignes. Deux stratégies chronométrées trois fois chacune en ligne de
commande (curl `--compressed`, machine de développement) :

| Stratégie | Poids total gzip | Durée en série |
|---|---:|---:|
| **9 exports complets** (`/exports/json?limit=-1`) | **749 Ko** | **~3,1 s** (dont DELF-DALF seul : 591 Ko, **1,06 s**) |
| **6 exports agrégés + 3 exports complets** | **35 Ko** | **~1,3 s** (aucune requête au-dessus de 0,19 s) |

Détail de la seconde, mesuré :

| Source | Requête | Lignes | Poids | Durée |
|---|---|---:|---:|---:|
| DELF-DALF | `group_by=pays, iso2_pays, year(annee) as an` + `select=…, sum(inscrits) as v` | 500 | 5,1 Ko | 0,13 s |
| TCF | idem sur `pays_centre` | 338 | 3,3 Ko | 0,12 s |
| BELC | idem sur `pays_participants` | 207 | 2,4 Ko | 0,15 s |
| ENIC-NARIC | `group_by=pays, iso2_pays, annee` | 1 177 | 9,4 Ko | 0,16 s |
| Assistants FR | `group_by=pays, iso2_pays, periode` | 98 | 1,0 Ko | 0,11 s |
| Assistants LVE | idem | 193 | 1,9 Ko | 0,19 s |
| Mobilité (35 l.) | export complet | 35 | 0,5 Ko | 0,10 s |
| CPFx (19 l.) | export complet | 19 | 1,7 Ko | 0,11 s |
| Centres labellisés (111 l.) | export complet | 111 | 9,9 Ko | 0,11 s |

**Vingt fois moins de poids pour deux fois moins de temps**, et surtout : l'agrégat rapatrie **toutes
les années**, ce qui offre gratuitement le sélecteur d'année que l'original n'a pas. C'est
l'architecture retenue. Total contrôlé : la somme des `v` pour `an = 2025` sur DELF-DALF vaut bien
**513 435**.

> **Un piège du dépôt vient de tomber : PG-014 (« `group-by` avec une fonction ODSQL »).**
> L'adaptateur OpenDataSoft de `dsfr-data` **n'entoure plus d'accents graves** un élément de `group-by`
> qui contient une parenthèse : `escapeOdsqlGroupField()` renvoie l'expression telle quelle
> (`packages/core/src/adapters/opendatasoft-adapter.ts`, l. 104-111, correctif **#641**), et le JSDoc de
> l'attribut `group-by` de `dsfr-data-source` le dit désormais explicitement : « un élément peut être
> une expression aliasée (`year(date) as annee`), transmise telle quelle — l'alias `as` est obligatoire
> côté ODS ». **`<dsfr-data-source api-type="opendatasoft" group-by="year(annee) as an">` devrait donc
> fonctionner.** Constat établi **par lecture du code source, pas par un rendu navigateur** : à
> re-jouer en page avant de le porter au registre en `faux-probleme`. En attendant, l'esquisse
> ci-dessous emploie la source générique (`url` + `params`), dont la requête a été **vérifiée à l'API**.

### Correspondance bloc à bloc

| Bloc / directive ODS Studio | Composant + attributs `dsfr-data` |
|---|---|
| 9 `data_providers` | 9 `<dsfr-data-source>`. Six en mode URL générique sur `/exports/json` avec `params` (agrégat serveur), trois en export complet. Une clé n'est pas nécessaire : l'API du portail répond en anonyme sur ces jeux |
| bloc `media` (logo FEI) | `<img src="…" alt="France Éducation international">` — on **remplit** l'`alt` |
| blocs `text` vides (`"# "`, `" "`, `"## "`) | supprimés |
| `[<https://…>](https://…)` | `<a class="fr-link" href="…">france-education-international.fr</a>` — sans chevrons |
| « à partir des liens "Voir la source" » | `databox-actions='["Voir le jeu de données"]'` sur chaque bloc **et** un `<a>` DSFR sous chacun. La consigne devient vraie |
| KPI `sum(inscrits)` + double borne de date | `<dsfr-data-query id="q-delf" source="delf" where="an:eq:2025">` puis `<dsfr-data-kpi source="q-delf" value="v:sum" format="nombre" label="…">`. L'année est déjà dépliée par l'agrégat serveur : la double borne disparaît |
| KPI `sum(dossiers_expertises)`, `annee` en **texte** | `where="annee:eq:2025"` — la syntaxe colon de `dsfr-data-query` ne demande pas de typage |
| `layout_context_and_image` (image + valeur + contexte) | pas d'attribut d'image sur `dsfr-data-kpi` ; l'équivalent est `icon="ri-…"` (classe d'icône). Un logo se pose en `<img>` dans la cellule du `dsfr-data-kpi-group`. Voir § Limites |
| `notation: standard` (séparateur de milliers) | `format="nombre"` — c'est le défaut, `Intl` fr-FR pose l'espace fine |
| `maximumFractionDigits: 2` sur des entiers | `decimals="0"` (les 7 valeurs sont des entiers ; la config ODS autorise 2 décimales qui ne sortent jamais) |
| valeurs à six chiffres (513 435) | **ne pas** poser `format="compact"` : à l'échelle de la page, « 513 k » perdrait de l'information. `compact` se réserve aux milliards (AM-031). L'unité éventuelle irait dans `label`, jamais dans la valeur |
| 2 KPI côte à côte / 3 KPI côte à côte | `<dsfr-data-kpi-group>` + `col="6"` (2 par ligne) ou `col="4"` (3 par ligne). **Ne jamais poser `display:block` sur `dsfr-data-kpi-group`** : son `:host` est `grid` (PG-011) |
| KPI sans image dans une rangée qui en a | on **uniformise** : les trois cartes portent la même structure |
| `choropleth.georef` `layer: world` `breakdown: 20`, `dataKey: iso2_pays` | `<dsfr-data-chart type="map-monde" code-field="iso2_pays" value-field="v" selected-palette="sequentialAscending" name="Inscrits">` — `map-monde` accepte l'alpha-2, l'alpha-3 ou le code numérique et convertit (`toIsoA2`) |
| pays sans `iso2_pays` (85 dossiers, 90 postes) | rien à configurer : `dsfr-data-chart` les compte et les journalise, et `getSkippedCount()` les rend. On **ajoute une mention sous la carte**, que l'original n'a pas |
| `bbox` mondiale | sans objet : `map-monde` est un fond SVG, pas une carte glissante |
| légende « Inscrits », bornes 4 → 100 k | légende native de DSFR Chart. On **ne reproduit pas** la borne arrondie sous le maximum |
| `comparison.columns` `limit 10` `order desc` | `<dsfr-data-query id="q-delf-top" source="delf" where="an:eq:2025" order-by="v:desc" limit="10">` + `<dsfr-data-chart type="bar" label-field="pays" value-field="v" name="Inscrits">` |
| top 10 en barres verticales à étiquettes obliques | `horizontal` : dix libellés de pays tiennent mieux à l'horizontale. Écart assumé |
| alternative au top 10 | `<dsfr-data-podium source="q-delf-top" …>` existe (classement visuel top N). À considérer, pas essayé ici |
| `displayFormat: compact_short` sur l'axe Y | rien à poser : DSFR Chart abrège seul les grands axes |
| `map` `mapType: poi`, basemap `jawg.streets` | `<dsfr-data-map tiles="osm-fr" height="480px">` — `jawg.streets` n'est pas un preset ; les presets sont `ign-plan`, `ign-ortho`, `ign-cadastre`, `osm-fr`, `osm-standard`, `opentopomap` |
| `geometries_001.query.field: position` / `centroid` | `geo-field="position"` / `geo-field="centroid"` |
| `dividedByCategory: false`, une `category` | `<dsfr-data-map-layer type="circle" color="#…" radius="7">` sans `color-field` |
| `icon: ods-picto-v3:college_vocational` / `:school` | **pas d'équivalent** — cosmétique, cf. § Limites |
| `legendLabel` | `<dsfr-data-map-legend for="…" label="Centres">` |
| popup `layout_title_context`, 5 champs | `<dsfr-data-map-popup title-field="…" mode="panel-right" width="360px">` + `<template>` — le mode panneau supprime la troncature à 180 px |
| `titleField: pays` sur CPFx | on met **`ville`** en titre et `pays` en sous-titre : « Argentine » ne distingue pas deux campus |
| 111 points superposés | `cluster cluster-radius="50"` — ajout assumé |
| bouton plein écran de la carte POI | `dsfr-data-map` n'en a pas ; `databox-fullscreen` n'existe que sur `dsfr-data-chart`. Cf. § Limites |
| kebab PNG/CSV/JSON/Excel | `databox databox-download databox-screenshot databox-source="France Éducation international"` |
| **manque** : sélecteur d'année | `<select>` + `<dsfr-data-context>` / `<dsfr-data-context-filter field="an" operator="year-of" ui="…">`, ou plus simplement un `dsfr-data-facets` sur `an`. L'agrégat serveur ramène déjà toutes les années |
| **manque** : tableau accessible | `<dsfr-data-a11y for="…" source="…" table download>` sous chaque graphique et chaque carte |
| **manque** : taux de réussite DELF-DALF | `presents` et `admis` sont dans le jeu : un agrégat de plus dans le `select` suffit (`sum(admis)/sum(presents)*100 as taux`, l'arithmétique entre agrégats est acceptée par ODSQL — vérifié sur le portail) |

### Esquisse de code

```html
<!-- ================= Sources : 6 agrégats serveur + 3 exports complets =================
     35 Ko gzip au total, aucune requête au-dessus de 0,19 s (mesuré 3 fois).
     Mode URL générique : l'agrégat ODSQL avec year() passe tel quel dans `params`. -->

<dsfr-data-source id="delf"
  url="https://data.education.gouv.fr/api/explore/v2.1/catalog/datasets/fr-en-delf-dalf_inscrits_centres/exports/json"
  params='{"group_by":"pays, iso2_pays, year(annee) as an","select":"pays, iso2_pays, an, sum(inscrits) as v, sum(presents) as presents, sum(admis) as admis"}'>
</dsfr-data-source>

<dsfr-data-source id="tcf"
  url="https://data.education.gouv.fr/api/explore/v2.1/catalog/datasets/fr-en-tcf_inscrits_centres/exports/json"
  params='{"group_by":"pays_centre, iso2_pays, year(annee) as an","select":"pays_centre, iso2_pays, an, sum(inscrits) as v"}'>
</dsfr-data-source>

<dsfr-data-source id="belc"
  url="…/fr-en-belc-participants-par-pays/exports/json"
  params='{"group_by":"pays_participants, iso2_pays, year(annee) as an","select":"pays_participants, iso2_pays, an, sum(nombre_participants) as v"}'>
</dsfr-data-source>

<dsfr-data-source id="enic"
  url="…/fr-en-reconnaissance_diplomes_comparabilite/exports/json"
  params='{"group_by":"pays, iso2_pays, annee","select":"pays, iso2_pays, annee, sum(dossiers_expertises) as v"}'>
</dsfr-data-source>

<dsfr-data-source id="alf"
  url="…/fr-en-assistants_langue_francaise/exports/json"
  params='{"group_by":"pays, iso2_pays, periode","select":"pays, iso2_pays, periode, sum(postes_offerts) as v"}'>
</dsfr-data-source>

<dsfr-data-source id="alve"
  url="…/fr-en-assistants_langues_vivantes_etrangeres/exports/json"
  params='{"group_by":"pays, iso2_pays, periode","select":"pays, iso2_pays, periode, sum(postes_offerts) as v"}'>
</dsfr-data-source>

<dsfr-data-source id="mobilite" url="…/fr-en-programmes-mobilite-enseignante-fei/exports/json"
  params='{"limit":"-1"}'></dsfr-data-source>
<dsfr-data-source id="cpfx" url="…/fr-en-cefte/exports/json" params='{"limit":"-1"}'></dsfr-data-source>
<dsfr-data-source id="labelfle"
  url="…/fr-en-centres-et-etablissements-labellises-label-qualite-francais-langue-etrange/exports/json"
  params='{"limit":"-1"}'></dsfr-data-source>

<!-- ================= L'année, une fois pour toutes ================= -->
<!-- L'original écrit 2025 en dur dans 17 blocs. Ici, un seul point de vérité. -->
<div class="fr-select-group fr-mb-4w">
  <label class="fr-label" for="an">Année de référence</label>
  <select class="fr-select" id="an">
    <option value="2025" selected>2025</option>
    <option value="2024">2024</option>
    <option value="2023">2023</option>
  </select>
</div>
<dsfr-data-context sources="delf, tcf, belc">
  <dsfr-data-context-filter field="an" operator="eq" ui="an"></dsfr-data-context-filter>
</dsfr-data-context>

<!-- ================= 1. Certification ================= -->
<h2 class="fr-h3">Certifications en français</h2>

<dsfr-data-query id="q-delf" source="delf" where="an:eq:2025"></dsfr-data-query>
<dsfr-data-query id="q-tcf"  source="tcf"  where="an:eq:2025"></dsfr-data-query>

<dsfr-data-kpi-group class="fr-mb-4w">
  <dsfr-data-kpi col="6" source="q-delf" value="v:sum" format="nombre" decimals="0"
    heading="DELF et DALF"
    label="inscrits en 2025 (diplôme d'études / diplôme approfondi de langue française)">
  </dsfr-data-kpi>
  <dsfr-data-kpi col="6" source="q-tcf" value="v:sum" format="nombre" decimals="0"
    heading="TCF" label="inscrits en 2025 au test de connaissance du français">
  </dsfr-data-kpi>
</dsfr-data-kpi-group>

<!-- Ce que l'original n'a pas : le taux de réussite, déjà dans le select. -->
<dsfr-data-normalize id="delf-taux" source="q-delf"
  compute="pct_admis = admis / presents * 100"></dsfr-data-normalize>

<div class="odv-chart-slot">
  <dsfr-data-chart id="c-delf" source="q-delf" type="map-monde"
    code-field="iso2_pays" value-field="v" name="Inscrits"
    selected-palette="sequentialAscending"
    databox databox-title="DELF-DALF — inscrits 2025"
    databox-source="France Éducation international" databox-download></dsfr-data-chart>
  <dsfr-data-a11y for="c-delf" source="q-delf" table download></dsfr-data-a11y>
</div>

<dsfr-data-query id="q-delf-top" source="delf" where="an:eq:2025"
  order-by="v:desc" limit="10"></dsfr-data-query>
<dsfr-data-chart id="g-delf" source="q-delf-top" type="bar" horizontal
  label-field="pays" value-field="v" name="Inscrits"
  databox databox-title="DELF-DALF — 10 premiers pays en 2025" databox-download></dsfr-data-chart>

<!-- (idem pour TCF, BELC, ENIC-NARIC, assistants FR, assistants LVE) -->

<!-- ================= Cartes de points ================= -->
<dsfr-data-map name="Campus professionnels franco-étrangers (CPFx)"
  center="20,20" zoom="2" height="480px" tiles="osm-fr" fit-bounds>
  <dsfr-data-map-layer id="l-cpfx" source="cpfx" type="circle" radius="7"
    geo-field="position" color="#A558A0" tooltip-field="ville"></dsfr-data-map-layer>
  <dsfr-data-map-legend for="l-cpfx" label="Campus"></dsfr-data-map-legend>
  <dsfr-data-map-popup mode="panel-right" title-field="ville" width="360px">
    <template>
      <p class="fr-badge fr-badge--sm fr-mb-2v">{{pays}}</p>
      <p class="fr-text--sm"><strong>Thématique :</strong> {{thematique|non renseignée}}</p>
      <p class="fr-text--sm"><strong>Partenaire éducatif :</strong> {{partenaire_educatif_local|non renseigné}}</p>
      <p class="fr-text--sm"><strong>Missions :</strong> {{annee_debut_missions|?} – {{annee_fin_missions|?}}</p>
    </template>
  </dsfr-data-map-popup>
</dsfr-data-map>

<dsfr-data-map name="Centres labellisés « Qualité français langue étrangère »"
  center="46.6,2.5" zoom="5" height="520px" tiles="osm-fr" fit-bounds fit-max-zoom="12">
  <dsfr-data-map-layer id="l-fle" source="labelfle" type="circle" radius="6"
    geo-field="centroid" color="#6A6AF4" cluster cluster-radius="50"
    tooltip-field="nom_du_centre"></dsfr-data-map-layer>
  <dsfr-data-map-legend for="l-fle" label="Centres labellisés"></dsfr-data-map-legend>
  <dsfr-data-map-popup mode="panel-right" title-field="nom_du_centre" width="360px">
    <template>
      <p class="fr-text--sm">{{code_postal}} {{ville}} — {{region}}</p>
      <p class="fr-text--sm"><a class="fr-link" href="{{site_web}}">Site du centre</a></p>
      <p class="fr-text--sm">{{telephone}} · {{contact}}</p>
    </template>
  </dsfr-data-map-popup>
</dsfr-data-map>
<dsfr-data-list source="labelfle"
  columns="nom_du_centre, ville, code_postal, region, telephone, site_web"
  search sort pagination="20"></dsfr-data-list>
```

## Limites et points durs identifiés

1. **Image d'illustration dans un KPI** (`layout_context_and_image` : le logo de la certification
   au-dessus de la valeur).
   *Obstacle* : `dsfr-data-kpi` n'a **pas** d'attribut d'image. La référence de l'attribut liste
   `icon` (« Classe d'icône, ex. `ri-global-line` ») — donc une icône de police, pas un logotype.
   *Voie native essayée* : `icon="ri-global-line"` rend bien un pictogramme, mais pas un logo de marque.
   *Contournement* : le KPI est dans une cellule de `dsfr-data-kpi-group` ; on pose l'`<img>` dans la
   même cellule, au-dessus, et on lui donne une hauteur fixe en CSS de page.
   *Verdict* : **cosmétique, mais réel pour une page de marque.** Un attribut `image` sur
   `dsfr-data-kpi` (avec `alt`) est une demande légitime : les pages « chiffres clés » d'opérateur en
   posent systématiquement un. À remonter, sans en faire un bloquant.
2. **Fond de carte `jawg.streets`.**
   *Obstacle* : ce n'est pas un des six presets de `dsfr-data-map` (`ign-plan`, `ign-ortho`,
   `ign-cadastre`, `osm-fr`, `osm-standard`, `opentopomap`).
   *Voie native* : `osm-fr` donne un rendu proche (labels en français, routes claires).
   *Verdict* : **non-problème.** Une carte de points internationale sur fond IGN n'aurait aucun sens ;
   `osm-fr` est le bon choix, et il est natif. Ne pas remonter.
3. **Picto dans le marqueur** (`ods-picto-v3:college_vocational`, `:school`).
   *Obstacle* : `dsfr-data-map-layer` n'a pas d'attribut d'icône par catégorie (constat déjà établi
   dans `annuaire-des-internats.md`).
   *Verdict* : **cosmétique**, et ici encore moins gênant : il n'y a qu'une catégorie par carte, donc
   le picto ne porte aucune information. Ne pas remonter.
4. **Plein écran de la carte de points.**
   *Obstacle* : les deux cartes POI de l'original ont un bouton ⛶ ; `dsfr-data-map` n'en expose pas
   (`databox-fullscreen` n'existe que sur `dsfr-data-chart`).
   *Contournement* : `element.requestFullscreen()` sur le conteneur, deux lignes de page.
   *Verdict* : **petit manque réel**, déjà relevé au lot précédent. Fusionner avec le constat existant
   plutôt que d'en créer un.
5. **La borne haute de l'échelle d'une choroplèthe.**
   *Constat* : ce n'est pas une limite de `dsfr-data`, c'est un **défaut de l'original** (quatre
   légendes sur six annoncent un maximum inférieur au maximum réel). DSFR Chart calcule sa propre
   échelle. Rien à transposer : à ne pas reproduire.
6. **Pays sans code ISO.**
   *Constat* : `map-monde` **fait mieux que l'original**. `_processMapData()` convertit alpha-3 et
   numérique en alpha-2, **incrémente `_skippedGeoCount`** pour tout code inconnu, **journalise un
   avertissement** (« N ligne(s) sur M ignorée(s) — code géographique absent ou invalide ») et expose
   `getSkippedCount()`. Les 85 dossiers « Ex-URSS » et les 90 postes « Jamaïque et Bahamas » seraient
   donc **comptés et signalables**, alors que l'original les fait disparaître en silence.
   *Verdict* : **avantage à consigner au registre**, pas une limite.
7. **`year(annee) as an` en `group-by` de source ODS.**
   *Constat* : voir l'encadré du § Architecture. Le code de l'adaptateur laisse désormais passer les
   expressions (#641) ; **PG-014 est probablement caduc**. À rejouer au navigateur avant de le porter
   au registre. La voie de contournement (source générique + `params`) reste vérifiée et fonctionne.
8. **Un seul `dsfr-data-context` pour six sources hétérogènes.**
   *Obstacle* : les six agrégats nomment leur année différemment (`an` dérivé de `year(annee)` pour
   trois jeux, `annee` texte pour ENIC-NARIC, `periode` entier pour les deux jeux d'assistants).
   Un `dsfr-data-context-filter field="an"` ne peut pas viser trois noms.
   *Voie native* : **aligner les noms à la source**, dans le `select` ODSQL — `year(annee) as an`,
   `annee as an`, `periode as an` — puis un seul contexte sur `an`. C'est gratuit : le renommage est
   déjà dans la requête.
   *Verdict* : **non-problème dès qu'on cesse de transposer le modèle ODS** (un contexte par jeu) et
   qu'on normalise le schéma à la source. C'est exactement le genre de faux problème que le
   `CLAUDE.md` met en garde de créer.
9. **Ce que la transposition gagne** : un sélecteur d'année qui ouvre 3 à 7 millésimes déjà chargés
   (l'original en montre un), 20 fois moins de données transférées, le taux de réussite DELF-DALF que
   les colonnes `presents`/`admis` rendent gratuit, le comptage explicite des pays non
   cartographiables, un tableau accessible sous chaque bloc, une liste cherchable des 111 centres
   labellisés avec téléphone et contact, une popup non tronquée, un clustering sur les points
   superposés, et une consigne « Voir la source » qui devient vraie. Quatorze des vingt défauts
   relevés tombent d'eux-mêmes.

## Données à reproduire fidèlement

- [ ] **Les 7 KPI 2025, à l'unité** : DELF-DALF **513 435** inscrits · TCF **310 473** ·
      BELC **1 146** professionnels formés · ENIC-NARIC **50 477** dossiers ·
      assistants de langue française à l'étranger **1 486** postes ·
      assistants de langues vivantes étrangères en France **4 376** postes ·
      mobilité enseignante **522** postes. **Sept sur sept recoupés à l'API.**
- [ ] **Libellés exacts** des KPI (ils portent l'explicitation des sigles : « Inscrits 2025 au DELF
      (Diplôme d'études en langue française) et DALF (Diplôme approfondi de langue française) »).
- [ ] **Top 10 DELF-DALF** : France 102 934 · Allemagne 42 280 · Italie 34 047 · Espagne 32 026 ·
      Grèce 24 422 · Canada 20 434 · Madagascar 17 363 · Mexique 16 988 · Inde 11 035 · Suisse 10 972.
- [ ] **Top 10 TCF** : France 72 807 · Canada 67 413 · Algérie 50 386 · Cameroun 36 895 · Maroc 28 300 ·
      Tunisie 8 599 · Côte d'Ivoire 7 337 · Chine 5 278 · Burundi 2 563 · Viet Nam 2 437.
- [ ] **Top 10 BELC** : Égypte 294 · France 156 · Angola 68 · Algérie 65 · Tunisie 62 · Viet Nam 60 ·
      Allemagne 32 · Maroc 27 · Rwanda 21 · Bangladesh 16.
- [ ] **Top 10 ENIC-NARIC** : Algérie 8 204 · Tunisie 4 928 · Maroc 4 510 · Cameroun 2 342 ·
      Ukraine 2 258 · Sénégal 1 618 · Côte d'Ivoire 1 605 · Bénin 1 156 · République du Congo 1 140 ·
      Brésil 1 022.
- [ ] **Couverture des cartes** : DELF-DALF **167** pays · TCF **114** · BELC **106** ·
      ENIC-NARIC **166** · assistants FR **33** · assistants LVE **67** — et les **85 dossiers** et
      **90 postes** sans code ISO, à signaler sous les cartes concernées.
- [ ] **Assistants** : top 2025 FR = Espagne 451 · Allemagne 220 · Royaume-Uni 216 ; LVE = États-Unis
      1 180 · Allemagne 509 · Royaume-Uni 500 · Espagne 410. Le **Malawi à 0** justifie la borne basse.
- [ ] **CPFx** : **19** campus dans **12 pays** et 16 villes (Buenos Aires, Ho Chi Minh et Santiago en
      comptent deux chacune), 6 thématiques (Énergie ×12, Gestion de cycle de vie des produits ×2,
      Automobile ×2, Aéronautique, Construction, Maintenance navale), missions de **2014 à 2025**.
      Titre de popup = la **ville**, pas le pays.
- [ ] **Centres labellisés FLE** : **111**, tous en France, avec `nom_du_centre`, `ville`,
      `code_postal`, `region`, `telephone`, `contact`, `site_web`.
- [ ] **Mobilité enseignante** : 522 postes en 2025, répartis sur **3 programmes** (Stages de
      perfectionnement linguistique, Séjours professionnels accueil / départ, Codofil) et **7 pays** —
      ventilation que l'original n'affiche pas alors que le jeu tient en 35 lignes.
- [ ] Titres de blocs exacts : « DELF DALF - inscrits 2025 », « TCF - inscrits 2025 »,
      « DELF DALF - Top 10 pays 2025 », « TCF - Top 10 pays 2025 »,
      « BELC - top 10 pays d'exercice des participants en 2025 »,
      « Dossiers de comparabilité expertisés - top 10 en 2025 »,
      « BELC - participants par pays - 2025 », « Dossiers expertisés par pays - 2025 »,
      « Assistants de langue française - postes offerts 2025 »,
      « Assistants de langues vivantes étrangères - postes offerts 2025 »,
      « Campus professionnel franco-étranger (CPFx) »,
      « Centres et établissements labellisés "Label qualité français langue étrangère" ».
- [ ] Légendes de carte : « Inscrits », « Participants 2025 », « Dossiers expertisés 2025 »,
      « Postes offerts ». **Ne pas** reproduire les bornes hautes arrondies sous le maximum.
- [ ] Axes : Y « Inscrits » / « Participants » / « Dossiers expertisés » ; X « Pays ».
