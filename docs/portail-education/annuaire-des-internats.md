# Annuaire des internats

- **URL du catalogue** : https://data.education.gouv.fr/explore/dataset/fr-en-internats/carte-des-internats/
  → **302** vers `https://data.education.gouv.fr/explore/assets/fr-en-internats/` (page d'actif).
  La dataviz elle-même vit à **`https://data.education.gouv.fr/explore/assets/carte-internats/view/`**
  (lien « Carte des internats » du bloc « Utiliser les outils pour… » de la page d'actif).
- **Id catalogue** : 17 · **Thématique** : Éducation (pas de sous-thématique) · **Filtre** : aucun.
- **Producteur (badge)** : DNE — Ministère de l'Éducation nationale. Thème du jeu : « Etablissements (dont IPS) ».
- **Jeu** : `fr-en-internats` — **4 661 lignes**, 26 champs, `visibility: domain`, features `analyze, geo, custom_view`,
  dernière modif. de la donnée 24/03/2025 (métadonnées retraitées 06/02/2026). Licence : **non renseignée**.
  API **ouverte sans clé** (testé : `/records`, `/facets`, `/exports/json` → 200 sans en-tête `Authorization`),
  `Access-Control-Allow-Origin: *`.
- **Relevé visuel** : 2026-09-10, Chrome (extension), fenêtre étroite (viewport 694 × 648 CSS px — voir § « colonne unique »).
- **Configuration de la vue** : récupérée à `GET /api/portal/v1.0/studio_pages/carte-internats`, archivée dans
  `docs/portail-education/_sources/carte-internats.studio.json`. **Ce n'est ni une page AngularJS `/pages/…`
  (pas de `$scope.blocks`) ni une « custom view » ODS classique : c'est une page ODS Studio** (`uid: sp_mhvxvh`,
  slug `carte-internats`, `updated_at` 2026-01-29), rendue par le nouveau front-office React d'Opendatasoft.

## Champs du jeu (26)

| Champ | Libellé au schéma | Type | Remarque |
|---|---|---|---|
| `uai` | UAI | text | 4 661 renseignés |
| `etablissement` | Etablissement | text | en capitales dans la donnée |
| `code_commune` / `commune` | Code commune / Commune | text | **1 834 communes distinctes** |
| `code_departement` / `departement` | Code departement / Departement | text | **104 départements/collectivités distincts** (libellés du schéma **sans accent**) |
| `academie` | Academie | text | **33 valeurs** |
| `nombre_de_lits_pre_bac_occupes_par_des_{filles,garcons}` | … | int | enquête Immobilier DEPP 2022 |
| `nombre_de_lits_pre_bac_destines_a_des_{filles,garcons}` | … | int | idem |
| `nombre_de_lits_post_bac_occupes_par_des_{filles,garcons}` | … | int | idem |
| `nombre_de_lits_post_bac_destines_a_des_{filles,garcons}` | … | int | idem |
| `nombre_de_lits_pre_bac_occupes`, `nombre_de_lits_pre_bac` | … | int | **1 606 renseignés / 4 661** |
| `nombre_de_lits_post_bac_occupes`, `nombre_de_lits_post_bac` | … | int | idem, dont **828 valeurs à 0** |
| `est_en_cite_scolaire` | Est en cité scolaire | text | `null` 3 052 · `"0"` 1 354 · `"1"` 255 — **texte, pas booléen** |
| `position` | position | geo_point_2d | **34 lignes sans position** (21 Privé, 13 Public) → 4 627 points cartographiables |
| `genre` | Genre | text | `NA` 3 051 · `Filles et garçons` 1 556 · `Filles` 31 · `Garçons` 23 |
| `type` | Type | text | `Lycée` 3 145 · `Collège` 860 · `Autre` 360 · `Ecole` 224 · `EREA` 72 |
| `statut` | Statut | text | `Public` 2 766 · `Privé` 1 895 |
| `adresse` | Adresse | text | 4 661 non nuls, mais **la chaîne `"NA"` sert de valeur manquante** (vue à l'écran) |

**Facettes déclarées au back-office** (`/facets`, dans cet ordre) : `departement`, `academie`, `genre`, `type`,
`statut`, `commune`, `code_commune`, `code_departement`. `est_en_cite_scolaire` et les champs de lits **ne sont
pas** facettés.

## Objectif de la dataviz et informations véhiculées

- **Question à laquelle elle répond** : « Où sont les internats en France, quel est leur statut, et combien de
  lits comptent-ils ? » — moitié annuaire géographique, moitié fiche de cadrage statistique.
- **Message porté** : le maillage est dense et couvre tout le territoire, DROM-COM compris ; l'internat est
  d'abord un fait **lycéen** (3 145 des 4 661) et majoritairement **public** (2 766 contre 1 895).
- **Ce que l'utilisateur doit obtenir** : localiser un établissement à internat, lire sa fiche minimale
  (UAI, académie, département, commune, capacité pré/post-bac, mixité, type, adresse), et se faire une idée
  des volumes par académie et par type.
- **Ce qui n'est pas dans l'objet** :
  - **aucune information de contact** (pas de téléphone, pas de mail, pas de site) — ce n'est pas un annuaire
    « pour joindre », c'est un annuaire « pour repérer » ;
  - **aucun taux d'occupation affiché**, alors que `nombre_de_lits_*_occupes` existe dans le jeu ;
  - aucun lien vers l'Annuaire de l'éducation ni vers la fiche établissement ;
  - aucune recherche par nom d'établissement (voir § Défauts).

## Relevé visuel exhaustif, bloc par bloc

Ordre des sections défini par `content.layouts.default` : **texte → filtres → carte → 3 KPI → 2 graphiques**.

### 0. Chrome de page (nouveau front-office ODS)

En-tête DSFR « GOUVERNEMENT » + bandeau « data.education.gouv.fr ». Fil d'Ariane
« Catalogue › Carte internats › **Consultation** ». H1 « **Carte internats** » (le titre du catalogue, lui,
dit « Annuaire des internats » : deux noms pour la même chose). Sous le H1, une seule icône : **signet**
(mise en favori). Pas d'onglets, pas de bouton d'export global, pas de fil de partage.

### 1. Bloc texte (`block_M9JPZOJTE5CAE`, `type: text`, aligné à gauche)

> « Ce jeu de données recense les établissements publics et privés de France qui ont un internat. Les données
> sont issues de la base RAMSESE (2025) ainsi que de l'enquête Immobilier de la DEPP qui recense les nombres de
> lits dans les internats publics en 2022. S'agissant de données d'enquête, les informations relatives au
> nombre de lits ne sont parfois pas renseignées, ou de façon incomplète, par les établissements (valeurs
> manquantes). »

Ce paragraphe est **dupliqué** : il est aussi la description de l'actif Studio (avec, en plus, un lien
« Annuaire des internats » qui pointe vers `https://dataeducation.huwise.com/…`, c'est-à-dire le **domaine de
recette Huwise**, pas le domaine public).

### 2. Section « filtres » (`section_M96T399BL5NHL`, `type: filters`)

Six filtres, dans cet ordre exact, tous ciblant le même `data_provider` (`lm0b7oohnz` → `fr-en-internats`) :

| # | Champ | Libellé affiché | `layout` | Multi ? |
|---|---|---|---|---|
| 1 | `academie` | **Academie** | `layout_multiple_selection_and_searchable` | oui |
| 2 | `departement` | **Departement** | `layout_multiple_selection_and_searchable` | oui |
| 3 | `commune` | **Commune** | `layout_multiple_selection_and_searchable` | oui |
| 4 | `genre` | **Genre** | `layout_multiple_selection_and_searchable` | oui |
| 5 | `type` | **Type** | `layout_multiple_selection_and_searchable` | oui |
| 6 | `statut` | **Statut** | `layout_single_selection` | **non** (choix unique) |

Aucun `title` n'est configuré : les libellés viennent du schéma du jeu, **d'où « Academie » et « Departement »
sans accent**. Aucune valeur par défaut.

**Rendu observé** (viewport étroit) : la rangée de filtres est masquée (`_mobileFilterSection_ _hidden_`) et
remplacée par un **bouton pilule flottant, collé en bas de fenêtre**, libellé « **Filters** » (en anglais)
tant qu'aucun filtre n'est posé, puis « **Filtres (1)** », « **Filtres (2)** »… (en français) dès qu'il y en a un.
Le clic ouvre un **tiroir** qui empile les six selects, avec en pied « **Tout effacer** » et « **× Fermer** ».

**Chaque select ouvre une modale plein cadre** : titre = nom du filtre, champ « **Rechercher une valeur** »,
case « **Tout sélectionner** », la liste des valeurs **par ordre alphabétique** et **sans compteur**,
pied de modale « **Effacer** · **Ma sélection** · **[Valider]** ». Le filtre ne s'applique qu'au clic sur
**Valider** (pas à la volée).

**Vérifié à l'écran** :
- `Academie` liste bien 33 valeurs, ordre alpha (Aix-Marseille, Amiens, Besançon, Bordeaux, Clermont-Ferrand,
  Corse, Créteil, Dijon, Grenoble, Guadeloupe, Guyane, …) — l'API donne, par effectif :
  Bordeaux 378 · Toulouse 328 · Normandie 323 · Rennes 307 · Nantes 280 · Grenoble 243 · Montpellier 222 ·
  Lille 210 · Nancy-Metz 209 · Lyon 207 · Orléans-Tours 207 · Amiens 184 · Clermont-Ferrand 183 · Poitiers 177 ·
  Aix-Marseille 158 · Dijon 147 · Reims 127 · Versailles 117 · Besançon 99 · Limoges 93 · Strasbourg 86 ·
  Nice 81 · Créteil 70 · La Réunion 56 · Polynésie Française 43 · Nouvelle Calédonie 27 · Martinique 23 ·
  Paris 23 · Corse 19 · Guyane 17 · Guadeloupe 14 · Mayotte 2 · Wallis et Futuna 1.
- **Les filtres se restreignent mutuellement** : avec `Academie = Corse`, la modale `Departement` ne propose
  plus que **Corse-du-Sud** et **Haute-Corse**. La requête sous-jacente est bien recalculée
  (`/records/?group_by=\`departement\` as value&where=…`).
- La **recherche intra-facette** fonctionne et surligne : `Commune` + « Bast » → une seule ligne, « **Bast**ia ».
- Le recalcul est global : `Academie = Corse` → KPI « 19 Internats », carte re-cadrée sur la Corse, graphiques
  recalculés. `Academie = Corse` + `Commune = Bastia` → 2 points.
- **L'URL n'est jamais synchronisée** : elle reste `…/carte-internats/view/` quel que soit le filtrage.

### 3. Bloc carte (`block_M96SWAUU5DG9H`, `type: map`, `mapType: poi`)

- **Titre affiché** : « **Cartographie des internats** ». Kebab « ⋮ » en haut à droite.
- **Fond** : `ign.planv2` (IGN Plan v2, tuiles raster). Moteur : **MaplibreGL** (les popups sont des
  `.maplibregl-popup`), **pas Leaflet**.
- **Contrôles** : `+` / `−`, bouton **plein écran**, bouton d'attribution (« Links »). Mention sous la carte :
  « **Utilisez ⌘ + molette pour zoomer la carte.** » (le zoom molette seul est neutralisé).
- **Une seule géométrie** (`geometries_001`), champ `position`, une seule couche `points`,
  `dividedByCategory: true`, `categoriesField: statut`, `style.type: circle` :

  | Valeur | Libellé | Couleur (jeton) | Icône | Rendu observé |
  |---|---|---|---|---|
  | `Public` | Public | `@chart[13]` | `ods-picto-v3:hotel` | pastille **vert clair**, picto **lit** blanc |
  | `Privé` | Privé | `@chart[1]` | `ods-picto-v3:hotel` | pastille **bleu marine**, picto **lit** blanc |

- **Requête effectivement émise** (relevée au réseau) : un **unique** appel
  `…/exports/geojson/?limit=200000&main_geo_field=position&select=recordid as recordId, statut as
  categoriesPointsField&where=(position is not null) AND (((geometry_type(position)="Point") OR
  (…="MultiPoint")) AND ((\`statut\`="Public") OR (\`statut\`="Privé")))` →
  **4 627 features**, chacune ne portant que `recordId` + `categoriesPointsField`.
  Chronométré 3 fois en ligne de commande : **0,25 s / 0,25 s / 0,58 s**, 240 Ko transférés (gzip).
- **Pas de clustering.** Aux zooms faibles les pastilles se superposent (l'effet de halo lu au premier écran
  n'est pas un cluster : aucun compteur n'est jamais affiché). Le clic sur un amas ouvre **une popup à
  carrousel** — en-tête « **‹ 1 / 3 ›** » — qui feuillette les enregistrements confondus au pixel.
- **Popup** (`type: tooltip`, `layout: layout_title_context`), ouverte **au clic** :
  titre = `etablissement`, puis une paire `Libellé :` / valeur par champ, dans l'ordre configuré
  `informations, uai, academie, departement, commune, nombre_de_lits_pre_bac, nombre_de_lits_post_bac,
  genre, type, adresse`.
  **Trois écarts entre la configuration et le rendu, tous vérifiés :**
  1. `informations` **n'existe pas dans le schéma** : la ligne est simplement absente, sans erreur.
  2. Une valeur **nulle** fait disparaître la ligne (ex. `LYCÉE AGRICOLE BORGO-MARANA`, UAI 7200599N :
     aucune ligne de lits).
  3. Une valeur **égale à 0** fait aussi disparaître la ligne (`LYCEE PROFESSIONNEL JEAN NICOLI BASTIA`,
     UAI 7200093N, `nombre_de_lits_post_bac = 0` → aucune ligne « Nombre de lits post-bac »). **828
     enregistrements** sont dans ce cas.
  Popup relevée mot pour mot :
  ```
  LYCEE PROFESSIONNEL JEAN NICOLI BASTIA
  UAI :                        7200093N
  Academie :                   Corse
  Departement :                Haute-Corse
  Commune :                    Bastia
  Nombre de lits pré-bac :     68
  Genre :                      Filles et garçons
  Type :                       Lycée
  Adresse :                    Cours PIERANGELI
  ```
  Le `statut` — **le champ qui pilote la couleur** — n'est pas dans la popup.
- **Chargement du contenu de la popup** : au clic, **une requête par enregistrement**,
  `GET /api/explore/v2.1/catalog/datasets/fr-en-internats/records/<recordid>` (vérifié au réseau).
- **Légende** (`legendLabel`) : sous la carte, titre « **Statut de l'internat** » puis deux entrées en ligne,
  « ● Public » (vert) et « ● Privé » (bleu), avec le picto lit dans la pastille.
- **Cadrage initial** : aucun `center`/`zoom` n'est enregistré ; la carte demande
  `select=bbox(position) as bbox` et s'y ajuste. Or la boîte englobante du jeu va de **167,25 °E**
  (Lifou, Nouvelle-Calédonie) à **−176,19 °O** (Wallis-et-Futuna) et de 51,05 °N à −23,34 °S :
  **la vue d'ouverture est le planisphère**, la France métropolitaine y tient dans une tache de 80 px.
  Le re-cadrage se rejoue à chaque changement de filtre (Corse → Corse ; Bastia → 2 points, zoom ~15,
  avec un fond IGN qui met plusieurs secondes à charger et n'affiche même plus le nom « Bastia »).
- **Kebab « ⋮ » du bloc** : `View dataset source` (**en anglais**, ouvre le jeu), puis
  `Exporter au format PNG`, `Exporter au format CSV`, `Exporter au format JSON`, `Exporter au format Excel`.
  Le même kebab est présent sur chaque KPI et chaque graphique.

### 4. Section 3 KPI (`section_M973NYE2SE7P6`)

Trois blocs `kpi` `simple`, `layout_context_only` (grande valeur au-dessus, libellé gris en dessous),
notation `standard`, 2 décimales max, **magenta du portail** :

| Bloc | Formule | Valeur lue à l'écran | Vérifiée à l'API |
|---|---|---|---|
| `block_M973NYE2W1BEZ` | `count(*)` | **4 661** / « Internats » | 4 661 ✔ |
| `block_M973NYE2VMDVD` | `sum(nombre_de_lits_pre_bac)` | **196 335** / « Lits pré-bac (2022) » | 196 335 ✔ |
| `block_M973NYE2VF2N3` | `sum(nombre_de_lits_post_bac)` | **34 256** / « Lits post-bac (2022) » | 34 256 ✔ |

Requêtes réelles : `…/records/?select=count(*) as y&where=`, idem `sum(...)`. Empilés verticalement en
colonne étroite ; sur large, la section est prévue pour trois colonnes.

### 5. Section 2 graphiques (`section_M973NVTKLCHG1`)

**a) « Internats par académie »** (`block_M973NVTKIQ12K`, `comparison.columns`, `layout_xy_tt_gr`) :
barres verticales, **33 barres**, `group_by=academie as x`, `select=count(*)`, `order_by … DESC`,
`where=(academie IS NOT NULL)`. Couleur de série `@chart[13]` → **vert clair** (la même que « Public »
sur la carte). Axe Y intitulé « **Internats** », graduations 0 / 50 / … / 400, format `compact_short`.
Axe X intitulé « **Académie** », étiquettes obliques **affichées une sur deux** (Bordeaux, Normandie,
Nantes, Montpellier, Nancy-Metz, Orléans-Tours, Clermont-Ferrand, Aix-Marseille, Reims, Besançon,
Strasbourg, Créteil, Polynésie Française, Martinique, Corse, Guadeloupe, Wallis et Futuna).

**b) « Nombre d'internats par type d'établissement »** (`block_M973NQNNX1U2Y`, `composition.pie`,
`layout_tt_le_va`) : camembert plein (pas de donut), `group_by=type as x`, `count(*)`, tri décroissant,
`where=(type IS NOT NULL)`. Légende à droite, format « libellé - valeur » :
**Lycée - 3,1 k · Collège - 860 · Autre - 360 · Ecole - 224 · EREA - 72**.
Palette : bleu nuit → indigo → bleu franc → bleu-violet clair → bleu-violet très clair.

### 6. Pied de page

« Conditions d'utilisation | Politique de confidentialité | Gestion des cookies ». Une bulle de **chat**
magenta flotte en bas à droite et **recouvre en permanence** le coin des blocs (elle masque le kebab du
graphique en camembert et une partie de la légende de la carte).

### 7. Ce qui remplace les anciens onglets ODS

Toutes les URL d'onglets historiques **redirigent en 302** :

| Ancienne URL | Redirection |
|---|---|
| `/explore/dataset/fr-en-internats/table/` | `/explore/assets/fr-en-internats/view/` |
| `/explore/dataset/fr-en-internats/{analyze,map,export,api,information}/` | `/explore/assets/fr-en-internats/` |

- **Page d'actif** `/explore/assets/fr-en-internats/` : description, thèmes, créateur, identifiant technique,
  et un bloc « Utiliser les outils pour… » à quatre entrées — *Explorer les données* (schéma + parcours),
  *Explorer les données (Beta)*, *Exporter les données*, *Utiliser la console d'API* — plus la vignette
  « **Carte des internats** » qui mène à la page Studio. Puis « Métadonnées », « Actifs de données
  similaires », « Actifs associés », « Utilisations », « Sources ».
- **Explorateur** `/explore/assets/fr-en-internats/view/` : quatre onglets **Données · Carte · Schéma ·
  Explorer par requête**. L'onglet Données est un tableau de **20 lignes par page** (« 1-20/4661
  enregistrements », pagination « « ‹ 1 2 3 … › » »), colonnes triables, une action loupe par ligne,
  `position` rendue en texte « lat: …, lon: … ».

## Défauts et bizarreries de l'original

1. **La carte s'ouvre sur le planisphère.** `fit-bounds` sans clip sur un jeu qui contient Wallis-et-Futuna
   (1 internat) et la Nouvelle-Calédonie (27) : la métropole occupe 3 % de la surface utile. C'est le
   défaut n° 1 de la page, et il est visible dès la première seconde.
2. **Symétriquement, le fit sur-zoome.** Deux points à Bastia → zoom ~15 sans plafond : le fond IGN n'a plus
   de repère utile et met plusieurs secondes à se peindre.
3. **Le `statut` n'est pas dans l'infobulle** alors qu'il est le seul champ porté par la couleur.
   Information transmise **par la couleur seule** — non conforme RGAA 1.4.
4. **Une valeur à 0 disparaît de l'infobulle** comme si elle était manquante. 828 établissements ont
   `nombre_de_lits_post_bac = 0` : le lecteur ne peut pas distinguer « pas d'internat post-bac » de
   « non renseigné », alors que le texte d'intro l'avertit précisément des valeurs manquantes.
5. **Un champ fantôme dans la configuration** : `informations` est déclaré en tête des `contextFields`
   et n'existe pas au schéma. Silencieux.
6. **Les KPI de lits sont trompeurs.** « 196 335 Lits pré-bac (2022) » et « 34 256 Lits post-bac (2022) »
   sont posés à côté de « 4 661 Internats », mais **1 606 établissements seulement** portent une valeur de
   lits — **tous publics** (les 1 895 établissements privés ont 0 valeur renseignée). Le rapprochement
   des trois chiffres suggère une moyenne de 42 lits par internat ; la vraie moyenne sur les
   établissements renseignés est de 122.
7. **Deux titres pour une page** : « Annuaire des internats » au catalogue, « Carte internats » en H1,
   « Cartographie des internats » sur le bloc.
8. **Trois chaînes non traduites** : le bouton « **Filters** » (qui devient « Filtres (n) » dès le premier
   filtre — donc la faute n'est visible qu'à l'état initial), et l'entrée de menu « **View dataset source** ».
9. **Libellés de filtres sans accent** : « Academie », « Departement » — hérités du schéma, jamais surchargés
   (le champ `title` des filtres est vide dans la configuration).
10. **Facettes sans compteur et triées alphabétiquement.** Impossible de voir d'un coup d'œil que Bordeaux
    pèse 378 et Wallis-et-Futuna 1 ; l'information existe pourtant côté serveur (`/facets` la renvoie).
11. **Aucune synchronisation d'URL.** Un état filtré n'est ni partageable, ni « bookmarkable », ni
    récupérable au retour arrière.
12. **Aucune recherche plein texte** sur la page : on ne peut pas chercher un établissement par son nom.
    Il faut connaître sa commune. Pour un objet nommé « Annuaire », c'est le manque le plus lourd.
13. **`Ecole` et `EREA` sont quasi indiscernables** dans la légende du camembert (deux bleu-violet clairs
    voisins) ; et la légende mélange les formats (« 3,1 k » compact à côté de « 860 » exact).
14. **La bulle de chat recouvre le contenu** en permanence, y compris des contrôles (kebab du camembert).
15. **`adresse` vaut littéralement `"NA"`** pour une partie des établissements
    (ex. `ECOLE ELEM SPÉCIALISÉE IME LES TILLEULS…`, `LYCÉE POLYVALENT WILLIAMA HAUDRA`) : la popup affiche
    « Adresse : NA ». Idem `genre = "NA"` pour 3 051 lignes, présenté tel quel.
16. **34 établissements sans position** ne figurent nulle part sur la carte, et rien ne le signale
    (4 661 au KPI, 4 627 sur la carte).
17. **La description de l'actif pointe vers `dataeducation.huwise.com`**, le domaine de recette de l'éditeur.

## Transposition vers `dsfr-data`

### Architecture retenue et pourquoi

4 661 lignes, 26 champs. Mesuré en ligne de commande, trois fois :
`/exports/json` complet = **631 Ko gzip (4,67 Mo brut) en 0,35 s**. Avec un `select` réduit à 12 champs :
383 Ko gzip mais **0,54 à 0,78 s** — plus léger et pourtant plus lent (le `select` coûte plus qu'il ne
rapporte sur ce jeu, cf. le piège « `select` sur un champ texte long » du `CLAUDE.md`, qui se vérifie ici
même sans texte long). **Donc : un seul `dsfr-data-source` en mode URL générique sur `/exports/json`, sans
`select`, tout le reste côté client.** Ce choix redonne gratuitement les trois choses que la vue native ne
sait pas faire : compteurs de facettes, cascade exacte, et recalcul sans aller-retour.

On n'a **pas** besoin de `server-facets` ici (le jeu déclare pourtant bien ses facettes) : 4 661 lignes
tiennent en mémoire, et le mode client donne les compteurs que l'original n'affiche pas.

### Correspondance bloc à bloc

| Bloc / directive ODS Studio | Composant + attributs `dsfr-data` |
|---|---|
| `data_providers` → `datasetId: fr-en-internats` | `<dsfr-data-source id="int" url="…/fr-en-internats/exports/json">` (pas de clé : CORS ouvert, API publique) |
| `section type: filters`, 6 `select` | `<dsfr-data-facets id="int-f" source="int-q" fields="academie, departement, commune, genre, type, statut" labels="academie:Académie \| departement:Département \| …" searchable="academie, departement, commune" display="statut:select" max-values="8">` — séparateur **`\|`** pour `labels`/`display`, **`,`** pour `fields`/`searchable` (PG-022) |
| `layout_multiple_selection_and_searchable` | défaut (cases à cocher, multi) + `searchable` ; la modale de valeurs n'a pas d'équivalent, `max-values` + « Voir plus » joue ce rôle |
| `layout_single_selection` (statut) | `display="statut:select"` (menu déroulant à choix unique — **pas** `:radio`, qui rend un panneau, PG-023) |
| valeurs de facettes **sans compteur** | ne rien faire : `dsfr-data-facets` les affiche par défaut. Pour coller à l'original : `hide-counts` — mais c'est une régression, ne pas le poser |
| tri **alphabétique** des valeurs | `sort="alpha:asc"` (le défaut est `count:desc` ; ne jamais écrire `-count`, PG-012) |
| **manque** : recherche plein texte | `<dsfr-data-search id="int-q" source="int" fields="etablissement, commune, adresse, uai" operator="words" count label="Rechercher un internat">` — ajout assumé, voir § Limites |
| **manque** : URL partageable | `url-sync` sur `dsfr-data-facets` **et** sur `dsfr-data-search` (+ `url-params`) |
| `block map`, `mapType: poi`, basemap `ign.planv2` | `<dsfr-data-map name="Cartographie des internats" tiles="ign-plan" height="560px">` |
| `bbox(position)` + auto-fit mondial | `fit-bounds` **+ `fit-zone="41,-5.5,51.5,10"`** (clip du fit sur la métropole) **+ `fit-max-zoom="12"`** (plafond anti-sur-zoom). Les deux attributs corrigent les défauts 1 et 2 de l'original |
| territoires ultramarins noyés dans le planisphère | `insets="guadeloupe,martinique,guyane,la-reunion,mayotte,nouvelle-caledonie,polynesie-francaise,wallis-et-futuna"` — les 8 territoires sont des presets. **Attention AM-032** : sans largeur, la feuille injectée pose 10 rem par encart ; 8 encarts demandent une règle de page (`dsfr-data-map-inset { width: 12% }`) |
| `geometries_001.query.field: position` | `geo-field="position"` (l'objet `{lon, lat}` de l'API v2.1 est accepté tel quel) |
| `layers.points.style.type: circle` | `<dsfr-data-map-layer type="circle" radius="5">` |
| `dividedByCategory: true`, `categoriesField: statut`, deux `categories` | `color-field="statut"` + `color-map="Public:#18753C,Privé:#000091"` — grammaire `valeur:#hex` séparée par **virgules** |
| `icon: ods-picto-v3:hotel` dans la pastille | **pas d'équivalent** — cosmétique, cf. § Limites |
| `styles.legendLabel: "Statut de l'internat"` | `<dsfr-data-map-legend for="couche-internats" label="Statut de l'internat">` (les entrées sortent de `color-map` via `getLegendEntries()`) |
| 4 627 points sans cluster, popup carrousel « 1/3 » | `max-items="6000"` **explicitement** (le défaut est 5 000 : 4 627 passe, mais de justesse — PG-013). Option : `cluster cluster-radius="60"`, qui améliore la lisibilité mais s'écarte de l'original |
| popup `layout_title_context`, 10 `contextFields` | `<dsfr-data-map-popup mode="panel-right" title-field="etablissement" width="380px">` + `<template>` |
| lignes nulles masquées, **0 masqué aussi** | `{{champ|—}}` pour le repli ; et **on n'imite pas le masquage du 0** : c'est un défaut, on affiche « 0 » |
| `statut` absent de la popup | on l'**ajoute** (RGAA 1.4 : la couleur ne peut pas être le seul vecteur) |
| une requête `/records/<id>` par clic | inutile : la source cliente a déjà tous les champs, la popup se remplit sans réseau |
| `kpi simple`, `layout_context_only`, `count(*)` | `<dsfr-data-kpi source="int-f" value="count" format="nombre" label="internats">` |
| `sum(nombre_de_lits_pre_bac)` | `value="nombre_de_lits_pre_bac:sum"` (grammaire `champ:fn`) |
| les 3 KPI côte à côte | `<dsfr-data-kpi-group>` + `col="4"` sur chaque KPI. **Ne pas** poser `display:block` sur `dsfr-data-kpi-group`, qui est `grid` (PG-011) |
| `comparison.columns`, `group_by academie`, `order desc` | `<dsfr-data-query id="int-aca" source="int-f" group-by="academie" aggregate="uai:count:nb" order-by="nb:desc" where="academie:isnotnull">` + `<dsfr-data-chart type="bar" label-field="academie" value-field="nb" name="Internats">` |
| `where (academie IS NOT NULL)` | `where="academie:isnotnull"` **sur la balise `dsfr-data-query` déjà présente** — pas un attribut de plus (PG-015) |
| `composition.pie`, `group_by type` | `<dsfr-data-query id="int-type" … group-by="type" aggregate="uai:count:nb" order-by="nb:desc">` + `<dsfr-data-chart type="pie" fill label-field="type" value-field="nb" selected-palette="categorical">` |
| format `compact_short` dans la légende | rien : laisser la valeur exacte. Le mélange « 3,1 k » / « 860 » de l'original est un défaut, pas une exigence |
| kebab « Exporter au format CSV/PNG » par bloc | `databox databox-download databox-screenshot databox-fullscreen databox-source="DEPP/DNE — fr-en-internats"` sur chaque `dsfr-data-chart` |
| kebab « View dataset source » | `databox-actions='["Voir le jeu de données"]'` ou simple lien DSFR sous le bloc |
| onglet « Données » de l'explorateur (20/page) | `<dsfr-data-list source="int-f" columns="…" search filters sort>` — attributs **anglais** (les formes françaises sont dépréciées) |
| — (rien dans l'original) | `<dsfr-data-a11y for="g-aca" source="int-aca" table download>` sous chaque graphique |

### Esquisse de code

```html
<!-- ================= Sources ================= -->
<!-- 4 661 lignes, 631 Ko gzip, 0,35 s mesuré : un seul aller-retour, pas de select. -->
<dsfr-data-source id="int"
  url="https://data.education.gouv.fr/api/explore/v2.1/catalog/datasets/fr-en-internats/exports/json">
</dsfr-data-source>

<dsfr-data-query id="int-aca" source="int-f" group-by="academie"
  aggregate="uai:count:nb" order-by="nb:desc" where="academie:isnotnull"></dsfr-data-query>

<dsfr-data-query id="int-type" source="int-f" group-by="type"
  aggregate="uai:count:nb" order-by="nb:desc" where="type:isnotnull"></dsfr-data-query>

<!-- KPI « lits » : sur les seuls établissements renseignés, pour ne pas répéter
     l'amalgame de l'original (1 606 lignes renseignées sur 4 661, toutes publiques). -->
<dsfr-data-query id="int-lits" source="int-f"
  where="nombre_de_lits_pre_bac:isnotnull"></dsfr-data-query>

<div class="fr-container fr-mb-8w">
  <div class="odv-dashboard">

    <!-- ================= Filtres ================= -->
    <div class="odv-filtres">
      <h2 class="fr-h6">Rechercher et filtrer</h2>

      <!-- Ce que la vue native n'a pas : chercher un internat par son nom. -->
      <dsfr-data-search id="int-q" source="int"
        fields="etablissement, commune, adresse, uai"
        label="Rechercher un internat" placeholder="Nom, commune, adresse, UAI…"
        operator="words" count url-sync></dsfr-data-search>

      <dsfr-data-facets id="int-f" source="int-q"
        fields="academie, departement, commune, genre, type, statut"
        labels="academie:Académie | departement:Département | commune:Commune | genre:Mixité | type:Type d'établissement | statut:Statut"
        display="statut:select"
        searchable="academie, departement, commune"
        max-values="8" url-sync url-params></dsfr-data-facets>
    </div>

    <div>
      <!-- ================= KPI ================= -->
      <dsfr-data-kpi-group class="fr-mb-4w">
        <dsfr-data-kpi source="int-f" value="count" format="nombre"
          heading="Sélection courante" label="internats" col="4"></dsfr-data-kpi>
        <dsfr-data-kpi source="int-lits" value="nombre_de_lits_pre_bac:sum" format="nombre"
          heading="Enquête DEPP 2022" label="lits pré-bac déclarés" col="4"></dsfr-data-kpi>
        <dsfr-data-kpi source="int-lits" value="nombre_de_lits_post_bac:sum" format="nombre"
          heading="Enquête DEPP 2022" label="lits post-bac déclarés" col="4"></dsfr-data-kpi>
      </dsfr-data-kpi-group>
      <p class="fr-hint-text fr-mb-4w">
        Les capacités proviennent de l'enquête Immobilier 2022 de la DEPP : 1&nbsp;606 établissements
        sur 4&nbsp;661 les ont renseignées, tous publics.
      </p>

      <!-- ================= Carte ================= -->
      <h2 class="fr-h4">Où sont les internats</h2>
      <dsfr-data-map class="odv-fond-attenue" name="Cartographie des internats"
        center="46.55,2.5" zoom="5" height="560px" tiles="ign-plan"
        fit-bounds fit-zone="41,-5.5,51.5,10" fit-max-zoom="12"
        insets="guadeloupe,martinique,guyane,la-reunion,mayotte,nouvelle-caledonie,polynesie-francaise,wallis-et-futuna">

        <dsfr-data-map-layer id="couche-internats" source="int-f" type="circle" radius="5"
          geo-field="position"
          color-field="statut" color-map="Public:#18753C,Privé:#000091"
          tooltip-field="etablissement" max-items="6000">
        </dsfr-data-map-layer>

        <dsfr-data-map-legend for="couche-internats" label="Statut de l'internat">
        </dsfr-data-map-legend>

        <dsfr-data-map-popup mode="panel-right" title-field="etablissement" width="380px">
          <template>
            <p class="fr-badge fr-badge--sm fr-mb-2v">{{statut}}</p>
            <p class="fr-text--sm fr-mb-1v">{{type}} — {{genre}}</p>
            <p class="fr-text--sm fr-mb-2v"><strong>{{commune}}</strong> — {{departement}}, académie de {{academie}}</p>
            <p class="fr-text--sm fr-mb-1v">{{adresse|Adresse non renseignée}}</p>
            <p class="fr-text--sm fr-mb-1v"><strong>Lits pré-bac&nbsp;:</strong> {{nombre_de_lits_pre_bac|non renseigné}}</p>
            <p class="fr-text--sm fr-mb-2v"><strong>Lits post-bac&nbsp;:</strong> {{nombre_de_lits_post_bac|non renseigné}}</p>
            <p class="fr-text--xs">UAI {{uai}}</p>
          </template>
        </dsfr-data-map-popup>
      </dsfr-data-map>

      <!-- ================= Graphiques ================= -->
      <div class="odv-chart-slot fr-mt-4w">
        <dsfr-data-chart id="g-aca" source="int-aca" type="bar" horizontal
          label-field="academie" value-field="nb" name="Internats"
          databox databox-title="Internats par académie"
          databox-source="DNE / DEPP — fr-en-internats, via data.education.gouv.fr"
          databox-download databox-screenshot></dsfr-data-chart>
        <dsfr-data-a11y for="g-aca" source="int-aca" table download></dsfr-data-a11y>
      </div>

      <div class="odv-chart-slot fr-mt-4w">
        <dsfr-data-chart id="g-type" source="int-type" type="pie" fill
          label-field="type" value-field="nb" selected-palette="categorical"
          databox databox-title="Internats par type d'établissement"
          databox-source="DNE / DEPP — fr-en-internats"
          databox-download></dsfr-data-chart>
        <dsfr-data-a11y for="g-type" source="int-type" table download></dsfr-data-a11y>
      </div>

      <!-- ================= Liste (remplace l'onglet « Données ») ================= -->
      <h2 class="fr-h4 fr-mt-4w">La liste</h2>
      <dsfr-data-list source="int-f"
        columns="etablissement, type, statut, commune, departement, academie, nombre_de_lits_pre_bac"
        sort pagination="20"></dsfr-data-list>
    </div>
  </div>
</div>
```

> Note : `horizontal` sur le graphique des académies est un écart assumé — 33 barres verticales imposent des
> étiquettes obliques dont l'original n'affiche qu'une sur deux. À vérifier au navigateur avant d'arbitrer.
> `dsfr-data-chart type="map-aca"` (avec `code-field="academie"`) est également disponible et donnerait une
> carte des académies, que l'original n'a pas.

## Limites et points durs identifiés

1. **Picto dans le marqueur** (`ods-picto-v3:hotel` en réserve blanche sur la pastille).
   *Obstacle* : `dsfr-data-map-layer` propose `type` (`marker`/`circle`/`geoshape`/`heatmap`), `color`,
   `color-map`, `radius*`, `shape-class` — **aucun attribut d'icône par catégorie** (référence relue).
   *Voie native essayée* : `shape-class`, qui applique une classe CSS aux tracés SVG de la couche — permet un
   motif, pas un glyphe centré fiable.
   *Contournement* : classe CSS + `background-image` sur les marqueurs `divIcon` en `type="marker"`.
   *Verdict* : **cosmétique**. L'information (statut) passe par la couleur **et** par la popup ; le picto
   n'ajoute rien. À ne pas remonter comme un manque.
2. **Masquer une ligne de popup quand la valeur est vide.**
   *Obstacle* : pas de conditionnelle dans les templates (AM-039).
   *Voie native* : `{{champ|repli}}` donne un repli mais pas une disparition.
   *Contournement connu* : interpoler dans un attribut (`data-v`) et masquer en CSS via `:empty` / `:has()`.
   *Verdict* : **on ne veut pas reproduire ce comportement** — c'est précisément le défaut n° 4 de l'original.
   Le repli explicite « non renseigné » est meilleur.
3. **Modale de sélection de valeurs** (recherche + « Tout sélectionner » + « Valider »).
   *Obstacle* : `dsfr-data-facets` rend une liste de cases avec `max-values` + « Voir plus » + `searchable` ;
   il n'y a ni modale, ni « tout cocher », ni validation différée.
   *Voie native essayée* : `display="champ:multiselect"` (menu déroulant multi) — plus proche visuellement,
   mais sans « Tout sélectionner ».
   *Verdict* : **différence d'ergonomie, pas de capacité.** Sur 1 834 communes, la modale ODS est une réponse
   à un problème que `searchable` résout aussi. À noter : `dsfr-data-facets` n'a **pas** de mode « validation
   différée » — chaque case recalcule. Sur 4 661 lignes en client, c'est instantané ; sur un jeu serveur, ce
   serait une vraie différence.
4. **Encarts ultramarins : 8 territoires.**
   *Obstacle* : les 8 presets existent (`guadeloupe, martinique, guyane, la-reunion, mayotte,
   nouvelle-caledonie, polynesie-francaise, wallis-et-futuna`), mais sans largeur par défaut la feuille
   injectée pose 10 rem chacun (AM-032) → 80 rem de bandeau.
   *Contournement* : règle de page `dsfr-data-map-inset { width: 12%; }`, ou n'exposer que les 5 DROM
   (`insets="drom"`) et laisser la Nouvelle-Calédonie, la Polynésie et Wallis (71 internats) au pan libre.
   *Verdict* : arbitrage de mise en page, pas une limite.
5. **Les onglets « Analyse », « Export », « API », « Informations ».**
   *Constat* : ils n'existent plus **dans l'original non plus** — les six URL testées renvoient toutes 302
   vers la page d'actif. Ce qui subsiste est le kebab d'export par bloc (PNG/CSV/JSON/Excel) et, sur la page
   d'actif, « Exporter les données » et « Utiliser la console d'API ».
   *Équivalent `dsfr-data`* : `databox-download` (CSV du bloc), `databox-screenshot` (PNG), `dsfr-data-a11y
   download` (CSV accessible du graphique). Le JSON et l'Excel n'ont pas d'équivalent natif.
   *Verdict* : **chrome de plateforme.** Une console d'API, un explorateur de schéma et un export Excel sont
   des fonctions de back-office de portail open data ; un site institutionnel qui publie une carte
   d'internats n'en a pas besoin — il a besoin d'un lien vers le jeu source, que trois lignes de HTML
   fournissent. **Ne pas compter ces onglets comme un manque de `dsfr-data`.**
6. **Plein écran de la carte.**
   *Obstacle* : `dsfr-data-map` n'expose pas de bouton plein écran (`no-controls` ne fait que masquer le zoom).
   *Voie native* : `databox-fullscreen` existe sur `dsfr-data-chart`, **pas** sur la carte.
   *Contournement* : `element.requestFullscreen()` sur le conteneur, deux lignes de page.
   *Verdict* : petit manque réel, à remonter — pas bloquant.
7. **Carrousel « 1 / 3 » sur les points confondus.**
   *Obstacle* : quand plusieurs enregistrements partagent le même pixel, l'original les feuillette dans une
   seule popup. `dsfr-data-map` ouvre la popup du marqueur cliqué ; les autres restent dessous.
   *Voie native* : `cluster` — un clic sur le cluster dézoome/écarte, ce qui résout le cas à l'usage.
   *Verdict* : **ce n'est pas un équivalent exact**, mais la voie native traite le même problème. À dire tel
   quel : le carrousel reste supérieur pour deux établissements strictement co-localisés (cité scolaire).
8. **Ce que la transposition gagne**, et qu'il faut dire honnêtement : compteurs sur les facettes, URL
   partageable, recherche plein texte, tableau accessible sous chaque graphique, cadrage métropolitain +
   encarts ultramarins, `statut` dans l'infobulle, `0` affiché comme `0`. Six des dix-sept défauts relevés
   tombent d'eux-mêmes.

## Données à reproduire fidèlement

- [ ] **4 661** internats, dont **4 627** géolocalisables (34 sans `position` — le signaler).
- [ ] **Statut** : Public 2 766 / Privé 1 895, en deux couleurs + légende « Statut de l'internat ».
- [ ] **Type** : Lycée 3 145 · Collège 860 · Autre 360 · Ecole 224 · EREA 72 (camembert, tri décroissant).
- [ ] **Académie** : 33 barres, tri décroissant, de Bordeaux 378 à Wallis-et-Futuna 1.
- [ ] **Genre** : NA 3 051 · Filles et garçons 1 556 · Filles 31 · Garçons 23 (facette).
- [ ] **Département** : 104 valeurs · **Commune** : 1 834 valeurs (facettes cherchables).
- [ ] **Lits** : 196 335 pré-bac / 34 256 post-bac, **sur 1 606 établissements renseignés, tous publics** —
      la mention de périmètre fait partie du chiffre.
- [ ] **Infobulle** : titre `etablissement` + UAI, académie, département, commune, lits pré-bac, lits
      post-bac, genre, type, adresse — **plus le statut**, et `0` affiché.
- [ ] **Cadrage** : métropole par défaut, encarts DROM-COM ; re-cadrage au filtrage, plafonné au zoom 12.
- [ ] Six filtres dans l'ordre académie, département, commune, genre, type, statut ; cascade effective.
- [ ] Titre de la carte « Cartographie des internats », titres de graphiques « Internats par académie » et
      « Nombre d'internats par type d'établissement ».
