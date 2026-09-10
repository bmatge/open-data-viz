# Passe ton Hack d'abord !

- **URL du catalogue** : https://dataeducation.huwise.com/p/pilotage-du-challenge-passe-ton-hack-d-abord/
  → **200**, pas de redirection. La même page répond aussi, à l'identique, sur
  `https://data.education.gouv.fr/p/pilotage-du-challenge-passe-ton-hack-d-abord/` et sur
  `https://dataeducation.opendatasoft.com/p/…` (voir § « Trois domaines pour un portail »).
- **Id catalogue** : 11 · **Thématique** : Éducation (pas de sous-thématique) · **Filtre** : aucun.
  Vignette du catalogue : `https://data.education.gouv.fr/assets/theme_image/passe_ton_hack_dabord.gif`.
- **Type de cible** : **page Opendatasoft Studio** (`/p/<slug>/`), `uid: sp_j8vr92`,
  `updated_at` **2026-09-03**. Pas de `$scope.blocks`. Configuration récupérée à
  `GET /api/portal/v1.0/studio_pages/pilotage-du-challenge-passe-ton-hack-d-abord`
  (**même réponse, 9 881 octets, sur les trois domaines**), archivée dans
  `docs/portail-education/_sources/pilotage-du-challenge-passe-ton-hack-d-abord.studio.json`.
- **Jeu unique** (`data_providers`, uid `m3fmvh5newm`) : **`challenge-cyber-passe-ton-hack-d-abord`**
  — **557 lignes**, **30 champs**, `visibility: domain`, **API ouverte sans clé**
  (`/records`, `/facets`, `/exports/json` → 200 en anonyme).
  Producteur **DGESCO — Ministère de l'éducation nationale**, **Licence Ouverte v2.0 (Etalab)**,
  thème « Enseignements (dont formation, spécialité, langue, sport) », mots-clés `Grist`, `cybersécurité`.
  Donnée modifiée le **2026-09-09 22:05 UTC** (mise à jour quotidienne depuis Grist).
- **Relevé visuel** : 2026-09-10, Chrome (extension), viewport 1 568 × 751 CSS px, sur le domaine
  `dataeducation.huwise.com` (celui du catalogue). Bandeau cookies : **Matomo laissé inactif**.

> **Périmètre de cette fiche.** Le sujet est un challenge de cybersécurité scolaire (« Capture The
> Flag »). Ce qui est audité ici est **la dataviz de pilotage** — participation, équipes, répartition
> géographique. Aucun contenu d'épreuve n'est reproduit ni décrit.

## Trois domaines pour un portail — ce que dit la vérification

L'entrée 11 du catalogue est la seule qui pointe vers un domaine qui n'est ni `.gouv.fr`
ni celui d'Opendatasoft. Vérifications faites le 2026-09-10 :

| Vérification | Résultat |
|---|---|
| `dig data.education.gouv.fr` | CNAME → `dataeducation.opendatasoft.com` → `dataeducation.outscale-euw2.opendatasoft.com` → **80.247.7.214 / 148.253.127.165** |
| `dig dataeducation.huwise.com` | → `dataeducation.outscale-euw2.huwise.com` → **80.247.7.214 / 148.253.127.165** (mêmes IP) |
| `/api/explore/v2.1/catalog/datasets?limit=1` | **306 jeux** sur les trois domaines |
| `GET /` | `302 → /pages/accueil/`, `server: openresty`, mêmes en-têtes sur les trois |
| `studio_pages/<slug>` | réponse **octet pour octet identique** (9 881 o) sur les trois |
| Chrome, sur `huwise.com` | en-tête **« GOUVERNEMENT » + Marianne + « data.education.gouv.fr »**, menu `Données / Data-visualisations / Démarche / Créer une carte / Créer un graphique / Nous contacter`, pied de page **« GOUVERNEMENT »** + `info.gouv.fr · service-public.gouv.fr · legifrance.gouv.fr · data.gouv.fr` |
| Liens légaux du pied de page | **tous relatifs** : `/pages/accessibilite`, `/terms/terms-and-conditions` (« Mentions légales »), `/terms/cookies-policy/` (« Données personnelles »), `/pages/plan-site`, plus un bouton « Gestion des cookies ». Ils restent donc **sur `huwise.com`** |
| `huwise.com` (racine) | redirige vers `www.huwise.com/en/`, `<title>` « **Huwise - Data Product Marketplace solution** » — le site produit de l'éditeur |

**Conclusion factuelle.** Ce n'est **pas** un environnement de recette ni un portail parallèle :
c'est **le même portail, servi sous un alias d'hôte de l'éditeur**. Le contenu, le catalogue, les
données et la charte de l'État sont identiques. Ce qui est réel, et suffit :

1. l'utilisateur qui clique l'entrée 11 du catalogue **quitte le domaine `.gouv.fr`** sans le
   moindre signal, et se retrouve sur un domaine commercial qui affiche le bloc-marque
   « GOUVERNEMENT » et le mot-clé `data.education.gouv.fr` en en-tête ;
2. les **mentions légales, la politique cookies et la déclaration d'accessibilité** de l'État y sont
   servies depuis `huwise.com` ;
3. le **bandeau cookies** (Matomo) est posé, et consenti, sur `huwise.com` — le consentement de
   l'utilisateur ne vaut donc pas pour le domaine officiel, et réciproquement ;
4. le **bloc de texte de la page** aggrave l'affaire : son lien s'intitule « data.education.gouv.fr »
   et pointe en fait vers `https://dataeducation.opendatasoft.com/explore/dataset/…/table/`
   (qui redirige en 200 vers `/explore/assets/challenge-cyber-passe-ton-hack-d-abord/view/`).
   **Trois domaines pour une même page, dont un seul est celui de l'État.**

**Les données, elles, sont bien sur le portail officiel** : le jeu
`challenge-cyber-passe-ton-hack-d-abord` répond à `data.education.gouv.fr`, en anonyme, avec les
mêmes 557 lignes et la même date de modification. **Une reproduction `dsfr-data` se branche donc
directement sur le portail officiel** — aucune donnée à rapatrier, aucun accord à obtenir. Le seul
gain de la reproduction sur ce point est de **ramener la page sous le domaine et la charte de
l'État**. Ce n'est pas rien, mais ce n'est pas un problème de disponibilité de la donnée.

## Champs du jeu (30)

| Champ | Libellé au schéma | Type | Remarque vérifiée à l'API |
|---|---|---|---|
| `etablissement_nom_etablissement` | Nom de l'établissement | text | saisie Grist (casse et graphie libres) |
| `ville` | Ville | text | saisie Grist |
| `nombre_eleves` | Nombre d'élèves inscrits | int | **somme 9 641**, max 132 (Lycée international Bernard Palissy, Gien) |
| `nb_filles` / `nb_garcons` | Nombre de filles / garçons inscrits | int | **1 476 / 8 195**, somme **9 671** — voir défaut n° 3 |
| `niveaux_de_classe` | Niveaux de classe | text **multivalué** | 44 combinaisons ; codes bruts non explicités (`["L","9","10"]`) |
| `options_ou_specialites` | Options ou spécialités | text multivalué | **strictement égal à `niveaux_de_classe`** sur les lignes examinées |
| `cree_a` / `derniere_mise_a_jour` | Date de création / de dernière m-à-j | date | **2025-09-03 → 2026-04-22** (les deux, mêmes bornes) |
| `identifiant_etablissement` | Identifiant établissement | text | UAI — **425 établissements distincts pour 557 lignes** (jusqu'à 4 lignes par UAI) |
| `challenge` | Challenge | text **multivalué** | 3 valeurs, 8 combinaisons, **2 lignes nulles** |
| `voie_pro` / `voie_techno` | Voie_Pro / Voie_Techno | int | **0 sur les 557 lignes** — champs morts |
| `demande_acc_nv` | Demande_acc_NV | int | 0 × 435 · 1 × 122 |
| `nombre_d_equipes_a_inscrire` | Nombre d'équipes inscrites | int | **somme 2 257** |
| `type_etablissement` | Type_etablissement | text | **424 valeurs distinctes sur 557 lignes**, presque toutes numériques (`11211`, `12869`, `1719`…) ; **une seule valeur textuelle, `Lycée`**. Ce n'est pas un type : ce sont des identifiants Grist. Voir défaut n° 1 |
| `code_departement` / `libelle_departement` | Code / Libellé Département | text | **89 départements** + 1 groupe `null` |
| `code_academie` / `libelle_academie` | Code / Libellé Académie | text | **31 académies** + 1 groupe `null` |
| `code_region` / `libelle_region` | Code / Libellé Région | text | **19 régions** + 1 groupe `null` |
| `position` | Position | geo_point_2d | **32 lignes sans position** → 525 points cartographiables |
| `appellation_officielle` | Appellation officielle | text | **29 lignes vides** — champ de l'annuaire |
| `secteur_public_prive_libe` | Secteur | text | Public 409 · Privé 119 · **null 29** |
| `adresse_uai`, `code_postal_uai`, `libelle_commune`, `adresse_complete` | Adresse… | text | champs de l'annuaire |
| `nature_uai_libe` | Type d'établissement | text | **le vrai type** : LYCEE POLYVALENT 218 · LYCEE ENSEIGNT GENERAL ET TECHNOLOGIQUE 208 · LYCEE PROFESSIONNEL 51 · LYCEE D ENSEIGNEMENT GENERAL 35 · **null 29** · SECTION D ENSEIGNEMENT PROFESSIONNEL 7 · LYCEE D ENSEIGNEMENT TECHNOLOGIQUE 6 · **COLLEGE 2** · SECTION ENSEIGT GENERAL ET TECHNOLOGIQUE 1 |

**Lecture du jeu** : les 12 premiers champs viennent de **Grist** (le formulaire d'inscription),
les 18 suivants d'un **appariement à l'annuaire de l'éducation par UAI**. **29 lignes n'ont pas
trouvé leur UAI** : elles n'ont ni académie, ni région, ni département, ni appellation, ni secteur.
Elles pèsent **462 élèves**, soit **4,8 % du total affiché en KPI**, et sont **absentes de tous les
graphiques et de toutes les cartes**. Trois lignes de plus (32 au total) n'ont pas de `position`.

**Facettes déclarées au back-office** (`/facets`) : `libelle_academie`, `libelle_region`,
`libelle_departement`, `ville`, `challenge`, `nature_uai_libe`. **La page n'en utilise aucune** :
`content.filters.layout` est un tableau vide.

## Objectif de la dataviz et informations véhiculées

- **Question à laquelle elle répond** : « Combien d'élèves et d'équipes se sont inscrits au challenge
  cyber, et d'où viennent-ils ? » C'est un **tableau de bord de mobilisation**, pas un tableau de
  résultats.
- **Message porté** : le challenge est massif (9 641 élèves, 2 257 équipes), il couvre tout le
  territoire y compris l'outre-mer, et il est **très déséquilibré en genre** (1 476 filles contre
  8 195 garçons, soit **15,3 %** de filles) — mais ce dernier point, qui est le seul enseignement
  fort du jeu, est confié à un graphique illisible (défaut n° 1).
- **Ce que l'utilisateur doit obtenir** : les deux chiffres clés, le classement des académies, la
  géographie régionale et départementale, et la possibilité de retrouver un lycée précis sur une carte.
- **Ce qui n'est pas dans l'objet** :
  - **aucun filtre** — pas de sélecteur d'académie, de région, de secteur ni de type de challenge,
    alors que six facettes sont déclarées au back-office ;
  - **aucune série temporelle**, alors que `cree_a` couvre 2025-09-03 → 2026-04-22 et que le texte
    de la page annonce vouloir « suivre l'évolution » des inscriptions. Le mot « évolution » figure
    dans la description du catalogue, dans la description de l'actif et dans le premier bloc de
    texte : **la page ne montre nulle part une évolution** ;
  - **aucun taux de participation** rapporté au nombre de lycées du territoire ;
  - **aucun résultat, aucun classement d'équipe** — cohérent avec l'objet « pilotage » ;
  - **aucune mention des 29 lignes non appariées**, ni des 32 sans position.

## Relevé visuel exhaustif, bloc par bloc

Ordre défini par `content.layouts.default` : **12 sections**, une colonne, empilées.

### 0. Chrome de page

En-tête DSFR : bloc-marque **GOUVERNEMENT** (Marianne + devise) + mot-clé
**« data.education.gouv.fr »** ; à droite, deux boutons magenta **« Connexion »** et
**« Inscription »**. Navigation : `Données · Data-visualisations · Démarche · Créer une carte ·
Créer un graphique · Nous contacter`. **Pas de fil d'Ariane**, pas de H1 de page distinct du bloc
de texte. Une **bulle de chat magenta** flotte en bas à droite en permanence.

**Bandeau cookies au premier chargement** : modale « Gestion de vos préférences sur les cookies »,
« Cookies strictement nécessaires — Toujours actif », « Cookies de statistiques » avec un
interrupteur **« Mesure d'audience (Matomo) — Inactif »** (donc **désactivé par défaut**, ce qui est
conforme), lien « Consulter la charte des cookies », bouton **« Sauvegarder mes choix »**.
Relevé effectué en laissant Matomo inactif.

### 1-2. Deux blocs texte, centrés (`text`, `align: center`)

Bloc 1 (`block_MFMTQ9YSWPH5V`), H1 markdown :

> **Pilotage du Challenge Cyber "Passe Ton Hack d'Abord"**
> Cette datavisualisation recense l'ensemble des inscriptions des lycées au challenge cyber
> « Passe ton Hack d'abord », permet d'en suivre l'évolution ainsi que la répartition géographique
> au sein des Académies et autres référentiels territoriaux. Ces données sur les inscriptions au
> challenge proviennent de Grist et sont mises à jour quotidiennement sur
> [data.education.gouv.fr](https://dataeducation.opendatasoft.com/explore/dataset/challenge-cyber-passe-ton-hack-d-abord/table/).

Bloc 2 (`block_MTLBZPDQ1J1SQ`), H2 :

> **La nouvelle édition du Challenge "Passe Ton Hack d'abord" arrive bientôt !**
> A compter du **14 Septembre 2026**, les inscriptions reprennent et les compteurs seront remis à
> zéro sur cette page. Restez connectés pour en savoir plus!

### 3. Deux médias côte à côte (`media`, `fit: 16-9`)

`/assets/theme_image/Passe%20ton%20hack%20d%20abord%20-%20illustration.png` (affiche du challenge) et
`/assets/theme_image/DSC04113%281%29.jpg` (photo de classe avec un militaire).
**`alt` vide dans la configuration pour les deux** — deux images porteuses de sens sans alternative
textuelle (RGAA 1.1).

### 4. Bloc texte de présentation (`block_MFMU7ZZRU1K3J`)

> **4e édition du Challenge Cyber « Passe Ton Hack d'abord »**
> Après une dernière édition ayant réuni plus de **7 300 participants**, le challenge de type
> « Capture The Flag » revient cette année auprès des lycéens et étudiants. […] Un **challenge
> organisé par le Commandement de la Cyberdéfense (ComCyber) du Ministère des Armées et le Ministère
> de l'Education nationale.** Fin des inscriptions le 6 janvier 2026. Plus d'informations sur
> Eduscol : [Page éducation et cybersécurité](https://eduscol.education.fr/3679/education-et-cybersecurite#Passetonhack)

### 5. Titre de section « 1. Le challenge en chiffres »

### 6. Section deux KPI (`section_MFMUFVM07QB29`)

Deux blocs `kpi` `simple`, `layout_context_and_image`, notation `standard`, 2 décimales max,
**valeur en magenta**, pictogramme au-dessus, libellé gris en dessous, kebab « ⋮ » en haut à droite.

| Bloc | Formule (config) | Requête réellement émise | Valeur lue à l'écran | Vérifiée à l'API |
|---|---|---|---|---|
| `block_MFMUFVM0MCG89` | `sum(nombre_eleves)` | `/records/?select=sum(\`nombre_eleves\`) as y&where=` | **9 641** / « Elèves inscrits » | 9 641 ✔ |
| `block_MFMUFVM0TADJI` | `sum(nombre_d_equipes_a_inscrire)` | idem sur `nombre_d_equipes_a_inscrire` | **2 257** / « Equipes inscrites » | 2 257 ✔ |

Pictogrammes : `/assets/theme_image/students.png` et `/assets/theme_image/partners.png`.

### 7. Section deux graphiques (`section_MFMURQ4UX8S9E`)

**a) « Mixité : Répartition Filles/Garçons »** (`block_MFMURQ4URMLDB`, `comparison.columns`,
`layout_xy_tt_gr`, `axisAssemblage: "percentage"`) — deux séries empilées en pourcentage,
`sum(nb_filles)` en **vert clair** (`@chart[13]`, légende « Nombre de filles inscrits ») et
`sum(nb_garcons)` en **bleu-violet** (`@chart[1]`, légende « Nombre de garçons inscrits »).
Axe Y « **Nombre d'élèves inscrits par sexe** », graduations **0 → 100** ; axe X « **Elèves** ».

**Ce que la page affiche réellement** (relevé à l'écran) : `xField` vaut **`type_etablissement`** —
c'est-à-dire les identifiants Grist. Le graphique est **un mur d'environ cent barres de 3 px**, avec
des étiquettes obliques une sur cinq : `10035 · 11118 · 11567 · 12057 · 12426 · 13001 · 1401 ·
14955 · 1710 · 2207 · 3677 · 4438 · 5014 · 5534 · 6019 · 6521 · 7055 · 7716 · 9039 · 9903`.
Tri `x ASC` **en tant que chaîne**, d'où `10035` avant `1401`.
Requête émise : `group_by=\`type_etablissement\` as x&order_by=x ASC&select=sum(\`nb_filles\`)…`,
**sans `limit`**. Rejouée en ligne de commande : l'API pagine par 100 et le champ compte **424
valeurs distinctes** (vérifié par `offset=400` → 24 lignes restantes). **Le graphique montre donc
100 des 424 groupes, sans que rien ne le signale.** Voir défaut n° 1.

**b) « Répartition par Challenge »** (`block_MFMURQ4UV6MJD`, `composition.doughnut`,
`layout_tt_se_na`, `cutout: small`) : anneau à **trois secteurs**, `group_by=challenge`,
`count(*)`, tri décroissant, `where=(challenge IS NOT NULL)`. Étiquettes posées autour de l'anneau,
**sans valeur ni pourcentage** :
**Challenge lycéen** (bleu nuit) · **Challenge Sup (Prepa, BTS en lycée)** (indigo) ·
**Equipe enseignante (participe mais non classée)** (bleu franc).
Comptes vérifiés à l'API : **424 · 161 · 69**, total **654**. Or le jeu compte **557 lignes** :
`challenge` est **multivalué** (une inscription peut viser plusieurs challenges — 8 combinaisons
observées, dont 14 lignes qui cochent les trois). L'anneau représente donc **654 « inscriptions à un
challenge », pas 557 lycées**, et rien ne le dit. Deux lignes à `challenge` nul sont écartées.

### 8. Titre de section « 2. Répartition Géographique des lycées inscrits »

### 9. Graphique « Nombre d'élèves inscrits par Académie » (`block_MFMVCGVSSWNMG`)

`comparison.columns`, `layout_xy_tt_gr`, `axisAssemblage: separate`, série `sum(nombre_eleves)` en
**bleu-violet clair** (`@chart[3]`), `group_by=libelle_academie`, tri décroissant,
**`limit: "10"`**, `where=(libelle_academie IS NOT NULL)`.
Axe Y « **Nb d'élèves** » (0 → 900, pas de 100), axe X « **Académie** ».
Dix barres lues à l'écran, valeurs vérifiées à l'API :
**Versailles 896 · Rennes 765 · Montpellier 633 · Aix-Marseille 588 · Nantes 571 · Bordeaux 492 ·
Lille 491 · Créteil 445 · Orléans-Tours 428 · Nice 414.**
Les 21 autres académies (jusqu'à **Guyane 3**) ne sont pas affichées et **rien n'indique qu'il y en a
d'autres** : le titre dit « par Académie », pas « les dix premières ».

### 10. Section deux cartes choroplèthes (`section_MFMVF4EMZAP26`)

Deux blocs `map` `choropleth.georef`, `layout_tt_ll`, ratio 16-9, gradient sur `@chart[3]`,
`bbox: [-5.4518, 41.2611, 9.8282, 51.3056]` (métropole), format `compact_short`.
**Elles ne se chargent qu'à l'entrée dans le viewport** (vérifié : après un rechargement suivi d'un
défilement rapide, les deux cadres restent blancs plusieurs secondes).

**a) « Répartition par région »** (`block_MFMVF4EMPQRFW`) : couche `georef` `world_fr`
`breakdown: 40`, clé de jointure **`code_region`**, `sum(nombre_eleves)`.
`navigationMaps: [fr_60_971, fr_60_973, fr_60_974, fr_60_972, fr_60_976]` → **cinq vignettes
DROM sous la carte** (Guadeloupe, Guyane, La Réunion, Martinique, Mayotte).
Attribution « INSEE IGN NaturalEarth ». Mention « **Utilisez ⌘ + molette pour zoomer la carte.** ».
Légende **« Nombre d'élèves »**, barre de dégradé bornée **3 → 1,6 k**.
Infobulle au survol, relevée mot pour mot : « **Île-de-France** / **1,6 k** ».
Contrôles `+` / `−` seulement.

**b) « Répartition par département »** (`block_MFMVF4EM114DX`) : `breakdown: 60`, clé
**`code_departement`**, même agrégat. **Pas de `navigationMaps`** → **aucune vignette DROM** :
les cinq départements d'outre-mer, présents dans la donnée (Guyane 3 élèves, La Réunion 153,
Guadeloupe 97, Martinique 59, Mayotte 38), **sont invisibles sur cette carte**, alors qu'ils le sont
sur celle du dessus. Attribution « INSEE IGN NaturalEarth **DGGL** ».
Légende « Nombre d'élèves », bornes **3 → 460**. Infobulle relevée : « **Ille-et-Vilaine** / **413** ».
Une trentaine de départements sont **gris** (aucune donnée).

### 11. Titre de section « 3. Cartographie des lycées participants »

### 12. Carte de points « Carte les lycées inscrits » (`block_MFMVQ2WGV4MA3`)

- `mapType: poi`, `layout_tt_ll`, basemap **`ign.planv2`**. Une seule géométrie (`geometries_001`),
  champ `position`, une couche `points`, `style.type: circle`, **`dividedByCategory: false`** →
  une seule catégorie, `@chart[0]` (**bleu nuit**), `value: null`,
  `label: "challenge-cyber-passe-ton-hack-d-abord"`.
- **Requêtes relevées au réseau** (trois, dans cet ordre) :
  `…/records/?limit=1&select=bbox(position) as bbox`, puis
  `…/exports/geojson/?limit=200000&main_geo_field=position&select=recordid as recordId&where=(position is not null) AND ((geometry_type(position) = "Point") OR (…= "MultiPoint"))`,
  puis `…/datasets/challenge-cyber-passe-ton-hack-d-abord/?lang=fr`.
  Chronométré en ligne de commande : le GeoJSON pèse **27 Ko gzip** et revient en **0,10-0,11 s**.
- **Cadrage initial : le planisphère.** La bbox du jeu va de **−61,78 °O** (Antilles) à
  **+55,65 °E** (La Réunion) et de 50,74 °N à −21,34 °S. L'écran d'ouverture montre l'Atlantique
  Nord, l'Afrique entière, le Moyen-Orient jusqu'au Pakistan et l'Amérique du Sud ; la France
  métropolitaine est **une tache de points d'environ 110 px de large**. Trois points isolés sont
  visibles aux Antilles, un en Guyane, deux au large de Madagascar.
- **Pas de clustering** : les 525 points se superposent en métropole.
- **Contrôles** : `+` / `−` et un bouton **plein écran**. Mention « Utilisez ⌘ + molette… ».
- **Infobulle au clic** (`type: tooltip`, `layout: layout_title_context`,
  `titleField: etablissement_nom_etablissement`, `contextFields: nombre_eleves,
  nombre_d_equipes_a_inscrire, challenge`), relevée mot pour mot sur le point de Guyane :
  ```
  Lycée Gaston Monnerville
  Nombre d'élèves inscrits :
  3
  Nombre d'équipes inscrites :
  1
  Challenge :
  Challenge lycéen
  ```
  **Ni ville, ni académie, ni secteur, ni UAI** : trois champs sur trente.
- **Légende** sous la carte : titre **« Nom de l'établissement »**, une seule entrée,
  « ● **challenge-cyber-passe-ton-hack-d-abord** ». C'est-à-dire : un intitulé qui annonce un nom
  d'établissement, et sous lui **l'identifiant technique du jeu de données**. Voir défaut n° 6.

### 13. Kebab « ⋮ » et pied de page

Chaque KPI, graphique et carte porte un kebab. Pied de page DSFR : bloc-marque **GOUVERNEMENT**,
`info.gouv.fr · service-public.gouv.fr · legifrance.gouv.fr · data.gouv.fr`, puis
`Plan du site · Accessibilité · Mentions légales · Données personnelles · Gestion des cookies` —
**tous en liens relatifs, donc servis depuis `huwise.com`**.

## Défauts et bizarreries de l'original

1. **Le graphique de mixité est bâti sur le mauvais champ, et il est tronqué.** `xField` vaut
   `type_etablissement`, qui contient **424 identifiants Grist** (`11211`, `12869`…) et **une seule
   valeur textuelle, `Lycée`**. Résultat à l'écran : une centaine de barres de 3 px étiquetées par
   des nombres sans signification, dans un ordre de tri de chaînes (`10035` avant `1401`), tronquées
   à 100 groupes sur 424 par la pagination par défaut de l'API. Le champ qui porte réellement le
   type est **`nature_uai_libe`** (9 valeurs), et le champ qui donnerait un sens au graphique est
   **`libelle_academie`** ou **`secteur_public_prive_libe`**. **C'est le défaut le plus lourd de la
   page** : le seul enseignement fort du jeu — 15,3 % de filles — est rendu illisible.
2. **L'axe Y du même graphique ment.** Il est intitulé « Nombre d'élèves inscrits par sexe » et
   gradué **0 → 100**, parce que `axisAssemblage: "percentage"` empile en pourcentage. Ce ne sont
   pas des nombres d'élèves, ce sont des parts.
3. **`nb_filles + nb_garcons` (9 671) ≠ `nombre_eleves` (9 641).** **22 lignes** sont en écart,
   pour **+30 élèves** au total. La page affiche 9 641 en KPI et répartit 9 671 dans le graphique
   de mixité, sans le dire.
4. **La page promet une évolution qu'elle ne montre pas.** « permet d'en suivre l'évolution » figure
   dans la description du catalogue, dans celle de l'actif et dans le premier bloc de texte. Le jeu
   porte `cree_a` (2025-09-03 → 2026-04-22). **Il n'y a aucune série temporelle sur la page.**
5. **La carte des départements perd l'outre-mer que la carte des régions affiche.** Les deux blocs
   sont voisins et partagent la même bbox métropolitaine, mais seule celle des régions déclare des
   `navigationMaps`. La Réunion (153 élèves), la Guadeloupe (97), la Martinique (59), Mayotte (38)
   et la Guyane (3) disparaissent d'une carte à l'autre — **sans un mot**.
6. **La légende de la carte de points affiche l'identifiant du jeu de données.** Titre
   « Nom de l'établissement », entrée « challenge-cyber-passe-ton-hack-d-abord ». C'est ce que
   produit `dividedByCategory: false` quand personne ne renseigne le libellé de la catégorie unique.
   La légende n'apporte donc rien, et expose un identifiant technique au public.
7. **L'échelle de couleur de la carte des départements est calibrée sur une valeur qui n'existe pas
   sur la carte.** La borne haute lue est **460** ; le département le plus fourni est
   Ille-et-Vilaine à **413** (lu à l'infobulle et vérifié à l'API). La seule valeur proche est
   **462**, le total du groupe `code_departement = null` — les 29 lignes non appariées, qui n'ont
   aucune forme à peindre. Le maximum réellement cartographié n'atteint donc jamais le haut du
   dégradé. *Interprétation la plus probable — l'arrondi à deux chiffres significatifs de 462 donne
   460, et le même arrondi explique le « 1,6 k » de la carte des régions (max réel 1 572) ; non
   confirmée par le code du front-office ODS.*
8. **462 élèves ne sont dans aucun graphique ni aucune carte.** Les 29 lignes dont l'UAI n'a pas été
   apparié à l'annuaire n'ont ni académie, ni région, ni département. Elles sont comptées dans les
   9 641 du KPI, et écartées de tout le reste par les `where … IS NOT NULL`. **4,8 % du chiffre
   affiché est invisible dans les visualisations qui le décomposent**, et la page ne le signale nulle
   part.
9. **32 lignes sans `position`** ne figurent pas sur la carte de points (525 sur 557). Non signalé.
10. **Le titre du graphique par académie ne dit pas qu'il est limité à dix.** `limit: "10"` dans la
    configuration ; 31 académies dans la donnée.
11. **L'anneau « Répartition par Challenge » compte 654 pour 557 lignes**, parce que `challenge` est
    multivalué. Aucun total, aucune valeur, aucun pourcentage n'est affiché — le lecteur ne peut pas
    s'en apercevoir.
12. **La carte de points s'ouvre sur le planisphère**, faute de clip du `fit-bounds` sur un jeu qui
    contient les Antilles et La Réunion. Même défaut que la page « Annuaire des internats ».
13. **Deux images porteuses de sens avec `alt: ""`** (affiche du challenge, photo de classe).
14. **Deux titres pour la même page** : « Passe ton Hack d'abord! » au catalogue, « Pilotage du
    challenge "Passe Ton Hack d'Abord" » dans le Studio, « Pilotage du Challenge Cyber "Passe Ton
    Hack d'Abord" » en H1 de la page.
15. **Le contenu éditorial est périmé, et la page se contredit.** Un bloc annonce que « à compter du
    **14 septembre 2026** les compteurs seront remis à zéro » ; le bloc suivant décrit la 4ᵉ édition
    et une « fin des inscriptions le 6 janvier 2026 ». Au 2026-09-10 la donnée s'arrête au
    2026-04-22 et les compteurs affichent toujours la 4ᵉ édition. La page Studio a été modifiée le
    2026-09-03 : l'annonce est récente, la donnée ne l'est pas.
16. **Aucun filtre, alors que six facettes sont déclarées** (`libelle_academie`, `libelle_region`,
    `libelle_departement`, `ville`, `challenge`, `nature_uai_libe`). `content.filters.layout` est vide.
17. **Deux champs morts publiés** : `voie_pro` et `voie_techno` valent 0 sur les 557 lignes.
    **Un champ dupliqué** : `options_ou_specialites` reproduit `niveaux_de_classe`.
18. **Les codes de `niveaux_de_classe` ne sont explicités nulle part** (`["L","9","10"]`).
19. **La bulle de chat magenta recouvre le coin inférieur droit** de tous les blocs, en permanence.
20. **Le lien « data.education.gouv.fr » du chapô pointe vers `dataeducation.opendatasoft.com`.**

## Transposition vers `dsfr-data`

**Version de référence : `dsfr-data` 0.25.0** (`docs/portail-education/_CIBLE-0.25.md`). Le dépôt
épingle encore 0.20.0 sur ses pages, npm sert **0.23.0**, les jalons v0.24.0 (neuf issues) et
v0.25.0 (quatre issues) sont cadrés. Attributs vérifiés dans le source local
(`~/Developer/GitHub/dsfr-data`, paquets **0.23.0**) :
`packages/core/src/components/dsfr-data-{map,map-layer,map-popup,search,source,display,chart,query,podium,normalize,unpivot,facets,context}.ts`,
`packages/core/src/utils/template-expression.ts`. Liste des issues ouvertes relevée le 2026-09-10
(`gh issue list`, 22 ouvertes). Tout attribut non vérifié est signalé comme tel.

### Architecture retenue et pourquoi

**557 lignes, 30 champs.** Chronométré trois fois en ligne de commande :
`/exports/json?limit=-1` = **103 524 octets gzip en 0,13 s / 0,13 s / 0,06 s**.
C'est un des plus petits jeux du lot. **Donc : un seul `dsfr-data-source` en mode URL générique sur
`/exports/json`, tout côté client.** Pas de `server-side`, pas de `server-facets`, pas de `select`
(le piège maison « `select` sur un jeu court coûte plus qu'il ne rapporte » n'a même pas à être
arbitré ici : 100 Ko en un aller-retour). Ce choix donne gratuitement les six filtres que la page
n'a pas, avec leurs compteurs, et une infobulle complète sans requête par clic.

**Le portail visé est `data.education.gouv.fr`**, pas `huwise.com` : mêmes données, domaine de
l'État. C'est le seul changement d'adresse que la transposition opère, et il est gratuit.

### Correspondance bloc à bloc

| Bloc / directive ODS Studio | Composant + attributs `dsfr-data` |
|---|---|
| `data_providers` → `datasetId: challenge-cyber-passe-ton-hack-d-abord` | `<dsfr-data-source id="pth" url="https://data.education.gouv.fr/api/explore/v2.1/catalog/datasets/challenge-cyber-passe-ton-hack-d-abord/exports/json?limit=-1">` — pas de clé (API ouverte, vérifié) |
| `block text` × 4 (markdown centré) | HTML DSFR : `<h1>`, `<p class="fr-text--lead">`, `fr-callout` pour l'annonce d'édition |
| `block media` × 2, `alt: ""` | `<img alt="…">` **renseigné** — c'est un défaut à corriger, pas à reproduire |
| **manque** : aucun filtre | `<dsfr-data-facets id="pth-f" source="pth" fields="libelle_academie, libelle_region, secteur_public_prive_libe, nature_uai_libe, challenge" labels="libelle_academie:Académie \| libelle_region:Région \| secteur_public_prive_libe:Secteur \| nature_uai_libe:Type d'établissement \| challenge:Type de challenge" searchable="libelle_academie" display="secteur_public_prive_libe:select" max-values="8" url-sync url-params>` — séparateur **`\|`** pour `labels`/`display`, **`,`** pour `fields`/`searchable` (PG-022) |
| `kpi simple`, `layout_context_and_image`, `sum(nombre_eleves)` | `<dsfr-data-kpi source="pth-f" value="nombre_eleves:sum" format="nombre" label="élèves inscrits">` (grammaire `champ:fn`) |
| `sum(nombre_d_equipes_a_inscrire)` | `value="nombre_d_equipes_a_inscrire:sum"` |
| les deux KPI côte à côte + pictogramme | `<dsfr-data-kpi-group>` + `col="6"`. **Ne pas** poser `display:block` sur le groupe, qui est `grid` (PG-011). Le pictogramme n'a pas d'attribut dédié : voir § Limites, point 1 |
| **manque** : le compte de lignes et d'établissements | `value="count"` sur une query sans `limit` (PG-017) ; le nombre d'UAI distincts passe par un `dsfr-data-query group-by="identifiant_etablissement"` puis `value="count"` (piège « pas d'agrégat `distinct` ») |
| `comparison.columns` `axisAssemblage: percentage` sur `type_etablissement` | **on ne reproduit pas le champ** : `<dsfr-data-query id="pth-mixite" source="pth-f" group-by="libelle_academie" aggregate="nb_filles:sum:filles, nb_garcons:sum:garcons" order-by="filles:desc" where="libelle_academie:isnotnull">` + `<dsfr-data-chart type="bar" stacked horizontal value-field="filles:Filles" value-fields="garcons:Garçons" label-field="libelle_academie">`. **`stacked` est natif** (`dsfr-data-chart.ts:201`) ; le multi-séries passe par **`value-fields`** avec alias inline `champ:Libellé` (#668, `dsfr-data-chart.ts:157-161`) — **pas** par une liste dans `value-field` |
| **manque** : aucun classement lisible des académies | `<dsfr-data-podium source="pth-aca" label-field="libelle_academie" value-field="e" value-unit="élèves" max-items="10" selected-palette="sequentialDescending">` — **composant natif**, rang + barre proportionnelle + valeur (`dsfr-data-podium.ts`). C'est le rendu qu'appelle une page de pilotage, et l'original ne l'a pas |
| **manque** : mise à jour quotidienne, aucun rafraîchissement | `refresh="600"` sur `dsfr-data-source` (secondes, `dsfr-data-source.ts:81-83`) — **natif** |
| `where (… IS NOT NULL)` | `where="libelle_academie:isnotnull"` **sur la balise `dsfr-data-query` déjà présente**, pas un composant de plus (PG-015) |
| `composition.doughnut` sur `challenge` (multivalué) | `<dsfr-data-query id="pth-chal" source="pth-f" group-by="challenge" aggregate="identifiant_etablissement:count:nb" order-by="nb:desc">` + `<dsfr-data-chart type="pie" label-field="challenge" value-field="nb">`. **Le comportement d'un `group-by` client sur un champ tableau est à vérifier** (§ Limites, point 4) |
| `limit: "10"` sur le graphique académies | `order-by="e:desc" limit="10"` sur la `dsfr-data-query` — **et le titre le dit** : « Les dix premières académies » |
| `choropleth.georef` `world_fr` `breakdown: 40`, `dataKey: code_region` | `<dsfr-data-chart type="map-reg" code-field="code_region" value-field="e">` (DSFR Chart, SVG). Les cinq vignettes DROM de `navigationMaps` sont **intégrées au tracé** de DSFR Chart |
| `breakdown: 60`, `dataKey: code_departement` | `<dsfr-data-chart type="map-dep" code-field="code_departement" value-field="e">` — **avec** les DROM, ce que l'original perd (défaut n° 5) |
| gradient `@chart[3]`, `legendLabel: "Nombre d'élèves"` | palette et légende de DSFR Chart ; `name="Nombre d'élèves"` (chaîne simple, **jamais** la forme `'["…"]'` — AM-023) |
| `block map` `mapType: poi`, basemap `ign.planv2` | `<dsfr-data-map name="Les lycées inscrits" tiles="ign-plan" height="560px">` |
| `bbox(position)` + auto-fit mondial | `fit-bounds` **+ `fit-zone="41,-5.5,51.5,10"`** (clip du fit sur la métropole) **+ `fit-max-zoom="12"`**. Corrige le défaut n° 12 |
| points antillais, guyanais et réunionnais noyés | `insets="guadeloupe,martinique,guyane,la-reunion,mayotte"` (= `insets="drom"`). **AM-032** : sans largeur, la feuille injectée pose 10 rem par encart — prévoir `dsfr-data-map-inset { width: 14% }` dans `site.css` |
| `geometries_001.query.field: position` | `geo-field="position"` (l'objet `{lon, lat}` de l'API v2.1 est accepté tel quel) |
| `layers.points.style.type: circle`, catégorie unique | `<dsfr-data-map-layer type="circle" radius="5" color-field="secteur_public_prive_libe" color-map="Public:#18753C,Privé:#000091">` — **on ajoute la distinction public/privé** que l'original n'encode pas, et la légende devient utile |
| 525 points, pas de cluster | `max-items` **peut rester au défaut** : 525 est très en dessous du plafond de 5 000 (PG-013). `cluster` reste une option de lisibilité |
| `legendLabel: "Nom de l'établissement"` avec l'id du jeu en entrée | `<dsfr-data-map-legend for="couche-lycees" label="Secteur de l'établissement">` — les entrées sortent de `color-map`. Corrige le défaut n° 6 |
| popup `layout_title_context`, 3 `contextFields` | `<dsfr-data-map-popup mode="panel-right" title-field="etablissement_nom_etablissement" width="380px">` + `<template>` |
| infobulle pauvre (3 champs sur 30) | on ajoute ville, académie, secteur, type et UAI — la source cliente les a déjà, **sans requête par clic** |
| lignes vides dans l'infobulle | `{{#if champ}}…{{/if}}` **existe désormais dans les templates de `dsfr-data-map-popup`** (même moteur que `dsfr-data-display`, `renderTemplate`, #694, v0.22.0) — voir la note ci-dessous |
| kebab « ⋮ » d'export par bloc | `databox databox-download databox-screenshot databox-source="DGESCO — challenge-cyber-passe-ton-hack-d-abord"` sur chaque `dsfr-data-chart` |
| — (rien dans l'original) | `<dsfr-data-a11y for="…" source="…" table download>` sous chaque graphique |
| — (rien dans l'original) | `<dsfr-data-search source="pth" fields="etablissement_nom_etablissement, ville, libelle_commune" operator="words" count label="Chercher un lycée">` — la page n'a aucune recherche |
| — (rien dans l'original) | une **série temporelle** sur `cree_a`, que la page promet et n'offre pas : `<dsfr-data-query group-by="cree_a" aggregate="nombre_eleves:sum:e" order-by="cree_a:asc">` + `type="line"`. **Le `group-by` sur un champ date en client est à vérifier** (§ Limites, point 5) |

> ⚠️ **Note de correction, vérifiée aujourd'hui au source.** Le tableau « Pièges déjà payés » du
> `CLAUDE.md` dit « Conditionnelle dans un template : **aucune** » (AM-039). **C'est faux depuis la
> 0.22.0** : `packages/core/src/utils/template-expression.ts` implémente `{{#if chemin}}…{{/if}}` et
> `{{#unless chemin}}…{{/unless}}` (blocs **non imbriqués**), et
> `packages/core/src/components/dsfr-data-map-popup.ts:161-164` déclare explicitement utiliser
> « le même moteur que `<dsfr-data-display>` (#426, #694) : blocs `{{#if}}` ». Le contournement CSS
> (`:empty`, `[href=""]`, `:has()`) n'est donc plus nécessaire.
> **Verdict : natif, mais postérieur à la version épinglée** (0.22.0 > 0.20.0) → c'est une montée
> de version dans ce dépôt, pas une demande. **À requalifier au registre** — hors périmètre de
> cette fiche.

### Esquisse de code

```html
<!-- 557 lignes, 30 champs, 103 Ko gzip en 0,13 s mesuré : un seul aller-retour, tout en client.
     Portail visé : data.education.gouv.fr, pas l'alias de l'éditeur. -->
<dsfr-data-source id="pth"
  url="https://data.education.gouv.fr/api/explore/v2.1/catalog/datasets/challenge-cyber-passe-ton-hack-d-abord/exports/json?limit=-1"
  refresh="600">
</dsfr-data-source>

<!-- Les dix premières académies, dit par le titre et par la requête. -->
<dsfr-data-query id="pth-aca" source="pth-f" group-by="libelle_academie"
  aggregate="nombre_eleves:sum:e" order-by="e:desc" limit="10"
  where="libelle_academie:isnotnull"></dsfr-data-query>

<!-- Mixité : sur l'académie, pas sur un identifiant Grist. -->
<dsfr-data-query id="pth-mixite" source="pth-f" group-by="libelle_academie"
  aggregate="nb_filles:sum:filles, nb_garcons:sum:garcons" order-by="filles:desc"
  where="libelle_academie:isnotnull"></dsfr-data-query>

<dsfr-data-query id="pth-reg" source="pth-f" group-by="code_region"
  aggregate="nombre_eleves:sum:e" where="code_region:isnotnull"></dsfr-data-query>
<dsfr-data-query id="pth-dep" source="pth-f" group-by="code_departement"
  aggregate="nombre_eleves:sum:e" where="code_departement:isnotnull"></dsfr-data-query>

<div class="fr-container fr-mb-8w">
  <h1>Pilotage du challenge cyber « Passe ton Hack d'abord »</h1>
  <p class="fr-text--lead">
    Inscriptions des lycées au challenge « Capture The Flag » organisé par le ComCyber
    (ministère des Armées) et le ministère de l'Éducation nationale. Données issues de Grist,
    mises à jour quotidiennement sur
    <a href="https://data.education.gouv.fr/explore/assets/challenge-cyber-passe-ton-hack-d-abord/view/">data.education.gouv.fr</a>.
  </p>
  <div class="fr-callout fr-mb-4w">
    <p class="fr-callout__text">
      557 inscriptions de 425 lycées, du 3 septembre 2025 au 22 avril 2026 (4<sup>e</sup> édition).
      29 inscriptions, soit 462 élèves, n'ont pas pu être rattachées à un établissement de
      l'annuaire : elles comptent dans les totaux, mais n'apparaissent ni sur les cartes ni dans
      les répartitions territoriales.
    </p>
  </div>

  <div class="fr-grid-row fr-grid-row--gutters">
    <div class="fr-col-12 fr-col-md-3">
      <h2 class="fr-h6">Filtrer</h2>
      <dsfr-data-search id="pth-q" source="pth"
        fields="etablissement_nom_etablissement, ville, libelle_commune"
        label="Chercher un lycée" placeholder="Nom d'établissement, ville…"
        operator="words" count url-sync></dsfr-data-search>
      <dsfr-data-facets id="pth-f" source="pth-q"
        fields="libelle_academie, libelle_region, secteur_public_prive_libe, nature_uai_libe, challenge"
        labels="libelle_academie:Académie | libelle_region:Région | secteur_public_prive_libe:Secteur | nature_uai_libe:Type d'établissement | challenge:Type de challenge"
        display="secteur_public_prive_libe:select"
        searchable="libelle_academie"
        max-values="8" url-sync url-params></dsfr-data-facets>
    </div>

    <div class="fr-col-12 fr-col-md-9">
      <h2 class="fr-h4">Le challenge en chiffres</h2>
      <dsfr-data-kpi-group class="fr-mb-2w">
        <dsfr-data-kpi source="pth-f" value="nombre_eleves:sum" format="nombre"
          label="élèves inscrits" col="4"></dsfr-data-kpi>
        <dsfr-data-kpi source="pth-f" value="nombre_d_equipes_a_inscrire:sum" format="nombre"
          label="équipes inscrites" col="4"></dsfr-data-kpi>
        <dsfr-data-kpi source="pth-f" value="nb_filles:sum" format="nombre"
          heading="dont" label="filles" col="4"></dsfr-data-kpi>
      </dsfr-data-kpi-group>
      <p class="fr-hint-text fr-mb-4w">
        Les déclarations par sexe totalisent 9&nbsp;671 élèves contre 9&nbsp;641 déclarés au total :
        22 inscriptions sont en écart avec elles-mêmes dans la source.
      </p>

      <h2 class="fr-h4">Mixité, par académie</h2>
      <div class="odv-chart-slot">
        <!-- Multi-séries : value-field + value-fields avec alias inline (#668).
             Une liste dans value-field ne fait PAS deux séries. -->
        <dsfr-data-chart id="g-mixite" source="pth-mixite" type="bar" stacked horizontal
          label-field="libelle_academie"
          value-field="filles:Filles" value-fields="garcons:Garçons"
          databox databox-title="Filles et garçons inscrits, par académie"
          databox-source="DGESCO — challenge-cyber-passe-ton-hack-d-abord"
          databox-download databox-screenshot></dsfr-data-chart>
        <dsfr-data-a11y for="g-mixite" source="pth-mixite" table download></dsfr-data-a11y>
      </div>

      <h2 class="fr-h4 fr-mt-6w">Les dix premières académies</h2>
      <dsfr-data-podium source="pth-aca"
        label-field="libelle_academie" value-field="e"
        value-unit="élèves" max-items="10"
        selected-palette="sequentialDescending"></dsfr-data-podium>

      <h2 class="fr-h4 fr-mt-6w">Répartition territoriale</h2>
      <div class="fr-grid-row fr-grid-row--gutters">
        <div class="fr-col-12 fr-col-lg-6">
          <dsfr-data-chart id="g-reg" source="pth-reg" type="map-reg"
            code-field="code_region" value-field="e" name="Nombre d'élèves"
            databox databox-title="Élèves inscrits par région"></dsfr-data-chart>
          <dsfr-data-a11y for="g-reg" source="pth-reg" table download></dsfr-data-a11y>
        </div>
        <div class="fr-col-12 fr-col-lg-6">
          <!-- Avec les DROM, que la carte départementale de l'original perd. -->
          <dsfr-data-chart id="g-dep" source="pth-dep" type="map-dep"
            code-field="code_departement" value-field="e" name="Nombre d'élèves"
            databox databox-title="Élèves inscrits par département"></dsfr-data-chart>
          <dsfr-data-a11y for="g-dep" source="pth-dep" table download></dsfr-data-a11y>
        </div>
      </div>

      <h2 class="fr-h4 fr-mt-6w">Les lycées inscrits</h2>
      <dsfr-data-map class="odv-fond-attenue" name="Les lycées inscrits au challenge"
        center="46.55,2.5" zoom="5" height="560px" tiles="ign-plan"
        fit-bounds fit-zone="41,-5.5,51.5,10" fit-max-zoom="12"
        insets="drom">
        <dsfr-data-map-layer id="couche-lycees" source="pth-f" type="circle" radius="5"
          geo-field="position"
          color-field="secteur_public_prive_libe" color-map="Public:#18753C,Privé:#000091"
          tooltip-field="etablissement_nom_etablissement">
        </dsfr-data-map-layer>
        <dsfr-data-map-legend for="couche-lycees" label="Secteur de l'établissement">
        </dsfr-data-map-legend>
        <dsfr-data-map-popup mode="panel-right"
          title-field="etablissement_nom_etablissement" width="380px">
          <template>
            {{#if secteur_public_prive_libe}}
              <p class="fr-badge fr-badge--sm fr-mb-2v">{{secteur_public_prive_libe}}</p>
            {{/if}}
            <p class="fr-text--sm fr-mb-2v"><strong>{{ville}}</strong>
               {{#if libelle_departement}}— {{libelle_departement}}{{/if}}
               {{#if libelle_academie}}, académie de {{libelle_academie}}{{/if}}</p>
            <p class="fr-text--sm fr-mb-1v"><strong>{{nombre_eleves|0}}</strong> élèves,
               <strong>{{nombre_d_equipes_a_inscrire|0}}</strong> équipes</p>
            <p class="fr-text--sm fr-mb-2v">{{challenge:join: · |Challenge non précisé}}</p>
            <p class="fr-text--xs">UAI {{identifiant_etablissement}}</p>
          </template>
        </dsfr-data-map-popup>
      </dsfr-data-map>

      <h2 class="fr-h4 fr-mt-6w">La liste</h2>
      <dsfr-data-list source="pth-f"
        columns="etablissement_nom_etablissement, ville, libelle_departement, libelle_academie, nature_uai_libe, nombre_eleves, nombre_d_equipes_a_inscrire"
        sort pagination="20"></dsfr-data-list>
    </div>
  </div>
</div>
```

## Limites et points durs identifiés

Chaque point est classé selon les quatre verdicts de `_CIBLE-0.25.md` :
**natif** · **natif mais postérieur à la 0.20.0 épinglée** · **prévu à un jalon** (n° d'issue) ·
**manque réel** (le seul cas à consigner au registre).

### Manques réels — le résidu de cette page

1. **Aucune agrégation temporelle dans `dsfr-data-query`, alors qu'elle existe déjà dans
   `dsfr-data-map-layer`.** ⭐ *C'est le résidu principal de cette cible, et il est propre au genre
   « pilotage » que Bercy n'avait pas.*
   *Le besoin* : la page **promet** de « suivre l'évolution » des inscriptions (trois fois : au
   catalogue, sur l'actif, dans le chapô) et ne la montre nulle part. Le jeu porte `cree_a`, du
   2025-09-03 au 2026-04-22.
   *Ce qui existe* : `dsfr-data-map-layer` déclare **`time-field`**, **`time-bucket`** (`none`,
   `hour`, `day`, `month`, `year`) et **`time-mode`** (`snapshot`, `cumulative`), pilotés par
   `<dsfr-data-map-timeline>` (`dsfr-data-map-layer.ts:344-354`). Le regroupement par mois **est
   donc déjà implémenté dans la bibliothèque** — mais dans une méthode **privée** de la couche
   carte (`_bucketDate`), non partagée.
   *Ce qui n'existe pas* : rien d'équivalent sur `dsfr-data-query` (`group-by` construit sa clé par
   `String(getByPath(item, f))`, `dsfr-data-query.ts:863`) ni sur `dsfr-data-chart`. `compute` de
   `dsfr-data-normalize` est explicitement borné à « arithmétique, concaténation, parenthèses —
   hors périmètre : conditions, fonctions » (`dsfr-data-normalize.ts:90-97`).
   *Conséquence mesurée* : un `group-by="cree_a"` client produit **une catégorie par jour** sur
   ~150 jours calendaires ; côté serveur, PG-014 interdit `group_by=month(cree_a)` (accents graves
   ajoutés par l'adaptateur → 400).
   *Est-ce prévu ?* **Non.** Les 22 issues ouvertes au 2026-09-10 ne mentionnent aucune
   granularité temporelle ; #671 (`compute` v2, v0.24.0) annonce « fonctions en liste blanche »
   mais **la liste n'est pas connue**, et #671 est explicitement borné « par ligne uniquement — ni
   fenêtre, ni cumul, ni ligne précédente ». La troncature de date est bien un calcul par ligne :
   **si la liste blanche de #671 comporte une fonction de date, ce point devient « prévu » ; sinon,
   c'est un manque.** À trancher avec le porteur de #671 — mais **la demande doit être écrite**,
   parce que le résidu n° 1 de `_CIBLE-0.25.md` (le cumul) et celui-ci pointent le même trou :
   la dimension temps n'existe que sur la carte.
   *Demande à formuler* : `time-bucket` (ou `group-by="champ:month"`) sur `dsfr-data-query`, en
   réutilisant `_bucketDate` de la couche carte.
2. **`group-by` client sur un champ multivalué compte les combinaisons, pas les valeurs —
   alors que `dsfr-data-facets` fait l'inverse.** ⭐
   *Observation* : `challenge` est un `text` multivalué (tableau JSON). Côté serveur ODS,
   `group_by=challenge` éclate correctement : **3 groupes (424 / 161 / 69)**, vérifié à l'API.
   Côté client, la clé de groupe est `String(getByPath(item, f))` (`dsfr-data-query.ts:863`) :
   un tableau devient `"Challenge lycéen,Equipe enseignante"` et l'anneau rendrait
   **8 secteurs** (les 8 combinaisons observées dans le jeu) au lieu de 3.
   *Ce qui est troublant* : `dsfr-data-facets` **sait** traiter le multivalué — deux
   `Array.isArray(val)` explicites (`dsfr-data-facets.ts:757` et `:792`) éclatent les valeurs et
   comptent chacune séparément. **Asymétrie entre deux composants du même pipeline sur la même
   donnée** : la facette dit 3, la query dit 8.
   *Voie native écartée après vérification* : `dsfr-data-unpivot` ne convient pas — il déplie des
   **noms de colonnes** wide → long (`value-cols-pattern="c{YYYY}_{MM}"`), pas le contenu d'une
   cellule tableau (`dsfr-data-unpivot.ts:12-34`).
   *Contournement* : une source d'agrégation dédiée en mode ODS (`api-type="opendatasoft"` +
   `group-by="challenge"`), qui délègue au serveur — au prix d'un contexte qui n'écoute plus les
   facettes de la page.
   *Est-ce prévu ?* **Non** — aucune des 22 issues ouvertes. **Manque réel**, et il n'est pas
   propre à ce jeu : le multivalué est une convention Opendatasoft courante.
   *Demande à formuler* : aligner la clé de `group-by` de `dsfr-data-query` sur le traitement
   du multivalué déjà fait par `dsfr-data-facets`.
3. **Plein écran d'une carte.** `dsfr-data-map` n'a pas de bouton plein écran (`no-controls` ne
   fait que masquer le zoom) ; `databox-fullscreen` existe sur `dsfr-data-chart`, pas sur la carte.
   L'original en a un. Aucune issue ouverte.
   *Verdict* : **manque réel**, mais déjà relevé par la fiche « Annuaire des internats » →
   **fusionner** avec l'entrée existante, ne pas en créer une seconde (règle « fusionner avant
   d'ajouter »).

### Natif — rien à demander

4. **Le classement des académies.** `<dsfr-data-podium>` existe et fait exactement le rendu
   qu'appelle une page de pilotage : rang, libellé, sous-titre (`subtitle-field`), barre
   proportionnelle, valeur + unité (`value-unit`), `max-items`, `bar-max`, `no-sort`,
   `selected-palette` (`dsfr-data-podium.ts`). **L'original n'a pas de podium** : il a un
   histogramme tronqué à dix sans le dire. **Faux problème si on avait écrit « pas de classement ».**
5. **Le rafraîchissement périodique.** Une page de pilotage sur une donnée quotidienne appelle un
   rafraîchissement : `refresh` (secondes, `dsfr-data-source.ts:81-83`) est **natif**. Le « temps
   réel » au sens strict (WebSocket, SSE) n'a pas d'équivalent, mais **la donnée est mise à jour
   une fois par jour** : le besoin n'existe pas ici, et il ne faut pas l'inventer.
6. **Barres empilées à deux séries.** `stacked` est natif (`dsfr-data-chart.ts:201`) et le
   multi-séries passe par `value-fields` avec alias inline `champ:Libellé` (#668,
   `dsfr-data-chart.ts:157-161`). **Attention à la grammaire** : une liste dans `value-field`
   (`value-field="filles, garcons"`) ne fait **pas** deux séries — c'est le genre d'erreur
   silencieuse que PG-022 décrit.
7. **Les facettes sur un champ multivalué** (`challenge`) : natif, voir le point 2.

### Natif, mais postérieur à la version épinglée (0.20.0)

8. **Les blocs `{{#if}}` / `{{#unless}}` dans les templates de popup et de `dsfr-data-display`**
   (0.22.0, #694). Voir la note plus haut : **montée de version ici, pas une demande.**
   AM-039 (« aucune conditionnelle dans un template ») est à requalifier au registre.
9. **`refine-on-click`, `context`, `label` et l'événement `dsfr-data-map-select`** sur
   `dsfr-data-map-layer` (0.23.0, #681) — vérifiés au source
   (`dsfr-data-map-layer.ts:135-136, 188, 209, 213, 529`). Ils restent **absents de la fiche
   servie par `get_skill(dsfrDataMap, "reference")`** : c'est déjà le résidu n° 3 de
   `_CIBLE-0.25.md`, cette fiche le **confirme**, ne pas le redéposer.

### Cosmétique ou hors périmètre — ne pas remonter

10. **Pictogramme dans un KPI** (`layout_context_and_image`, `imgUrl`).
    `dsfr-data-kpi` expose `value`, `format`, `decimals`, `heading`, `label`, `col` — pas d'image.
    Les deux pictogrammes de l'original (`students.png`, `partners.png`) sont **décoratifs** ;
    un `<img>` posé à côté de la balise ou un `background-image` de page suffit.
    *Verdict* : **cosmétique. Ne pas remonter.**
11. **Le domaine.** Une reproduction `dsfr-data` est un fichier HTML statique : le sujet n'est pas
    « `dsfr-data` sait-il faire ? » mais « qui sert la page ». **À dire dans l'analyse de la page :
    l'argument de la transposition est ici institutionnel, pas fonctionnel.**
12. **Les cinq vignettes DROM de la carte des régions** (`navigationMaps`).
    *Constat* : `dsfr-data-chart type="map-reg"` / `map-dep` s'appuie sur **DSFR Chart** (SVG),
    dont les tracés régionaux et départementaux **intègrent déjà les DROM**. Il n'y a donc rien à
    transposer : la carte départementale gagne l'outre-mer que l'original perd.
    *Rappel de périmètre* : toute limite de `map-dep` / `map-reg` se remonte chez
    `GouvernementFR/dsfr-chart`, **pas** chez `dsfr-data` (règle 4 du lot 11).
    ⚠️ Le résidu n° 4 de `_CIBLE-0.25.md` prévient que `map-reg` **attend des codes ISO 3166-2, pas
    l'INSEE**, et rend une carte grise sans erreur. Le jeu porte `code_region` en **INSEE**
    (`11`, `76`, `93`, `52`…). **Non rejoué au navigateur ici** — c'est le point à vérifier en
    premier si la carte régionale sort vide.

### Ce que la transposition gagne

13. **Honnêtement** : cinq filtres avec compteurs et cascade, une
   recherche par nom de lycée, une URL partageable, un graphique de mixité lisible (sur l'académie,
   pas sur un identifiant Grist), un axe qui dit ce qu'il mesure, les DROM sur les deux cartes, une
   légende qui nomme le secteur au lieu de l'identifiant du jeu, une infobulle à huit champs au lieu
   de trois, un tableau accessible sous chaque graphique, un cadrage métropolitain avec encarts, et
   la mention explicite des 462 élèves non rattachés. **Quinze des vingt défauts relevés tombent
   d'eux-mêmes** ; les cinq qui restent (n° 3 l'écart 9 671/9 641, n° 15 le contenu périmé, n° 17
   les champs morts, n° 18 les codes non explicités, n° 20 le lien du chapô) sont des défauts **de
   la donnée et de l'éditorial**, qu'aucune bibliothèque ne corrige.

## Données à reproduire fidèlement

- [ ] **557** inscriptions, **425** établissements distincts, **525** cartographiables
      (32 sans `position` — le signaler), **528** rattachés à l'annuaire (29 non appariés — le signaler).
- [ ] **9 641** élèves inscrits · **2 257** équipes inscrites (les deux KPI de l'original, à l'unité).
- [ ] **1 476 filles / 8 195 garçons** — et la mention que leur somme, 9 671, dépasse de 30 le total
      déclaré, sur 22 inscriptions.
- [ ] **Challenge** (multivalué) : Challenge lycéen **424** · Challenge Sup (Prepa, BTS en lycée)
      **161** · Equipe enseignante (participe mais non classée) **69** ; 2 lignes nulles.
      **Total 654 pour 557 lignes** — la mention fait partie du chiffre.
- [ ] **Académies** (31 + un groupe nul) : Versailles 896 · Rennes 765 · Montpellier 633 ·
      Aix-Marseille 588 · Nantes 571 · Bordeaux 492 · Lille 491 · Créteil 445 · Orléans-Tours 428 ·
      Nice 414 en tête ; Limoges 30 et Guyane 3 en queue. Le groupe nul pèse **462**.
- [ ] **Régions** (19 + un groupe nul) : Île-de-France 1 572 · Occitanie 1 036 · PACA 1 002 ·
      Bretagne 765 · Nouvelle-Aquitaine 751 en tête ; Guyane 3 en queue.
- [ ] **Départements** (89 + un groupe nul) : Ille-et-Vilaine 413 · Hérault 377 · Var 360 ·
      Nord 328 · Yvelines 303 · Haute-Garonne 294 · Bouches-du-Rhône 284 en tête ;
      Meuse 3 et Guyane 3 en queue. **Les DROM doivent y figurer.**
- [ ] **Type d'établissement** (le vrai, `nature_uai_libe`) : LYCEE POLYVALENT 218 ·
      LYCEE ENSEIGNT GENERAL ET TECHNOLOGIQUE 208 · LYCEE PROFESSIONNEL 51 ·
      LYCEE D ENSEIGNEMENT GENERAL 35 · SECTION D ENSEIGNEMENT PROFESSIONNEL 7 ·
      LYCEE D ENSEIGNEMENT TECHNOLOGIQUE 6 · COLLEGE 2 · SECTION ENSEIGT GEN. ET TECHNO. 1 ·
      29 non renseignés.
- [ ] **Secteur** : Public 409 · Privé 119 · 29 non renseignés.
- [ ] **Période** : `cree_a` du **2025-09-03** au **2026-04-22** — et une série temporelle, que
      l'original promet et n'affiche pas.
- [ ] **Infobulle** : nom, ville, département, académie, secteur, type, élèves, équipes, challenge,
      UAI — au lieu des trois champs de l'original.
- [ ] **Cadrage** : métropole par défaut, encarts DROM ; jamais le planisphère.
- [ ] **Domaine** : `data.education.gouv.fr` pour les données, `.gouv.fr` pour la page.
