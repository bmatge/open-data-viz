# Portrait de territoire (portail Sports)

> **⚠️ Mise à jour du 2026-09-10 — les jalons v0.24.0 et v0.25.0 sont livrés.**
> Cette fiche a été écrite le matin même, quand ils étaient encore en cours ; elle y renvoie
> donc au futur (« prévu au jalon v0.25.0 »). **Tout ce qui y est annoncé comme prévu est
> désormais disponible** : `dsfr-data@0.25.0` livre `fetch-mode="export"` (#689) et
> `require-where` (#690), et le dépôt est monté en 0.25.0. Les analyses ne sont pas réécrites —
> elles disent ce qui a été rencontré au moment du portage, et c'est leur valeur. Pour l'état
> courant du backlog et les quatre verdicts, voir [`_CIBLE-0.25.md`](_CIBLE-0.25.md).


- **URL** : https://equipements.sports.gouv.fr/pages/portrait-territoire/
- **Id catalogue** : **14** — thématique **Sports**, titre catalogue « Portrait de territoire ».
- **⚠️ Source cross-portail** : la page **ne vit pas sur `data.education.gouv.fr`**. Elle est
  hébergée par `equipements.sports.gouv.fr` (Data ES, Ministère des Sports), comme la page
  *Accessibilité des équipements sportifs* (id 13) déjà auditée. L'API à interroger est donc
  `https://equipements.sports.gouv.fr/api/explore/v2.1/…`.
- **Clé API** : **aucune**. Le `$scope.blocks` ne porte ni `ctx-apikey` ni `context-apikey` ;
  toutes les vérifications ci-dessous ont été faites en anonyme (HTTP 200). CORS ouvert
  (`access-control-allow-origin: *`, contre-vérifié au lot précédent par un `fetch()` réel
  depuis une page `data.education.gouv.fr`). Voir `accessibilite-equipements-sportifs.md` § en-tête.
- **Template archivé** : `_sources/portrait-territoire.html` (186 160 caractères désechappés)
  + `_sources/portrait-territoire.css` (5 376). Relevé le 2026-09-10.
- **Relevé visuel** : 2026-09-10, Chrome, viewport 1568 × 751.

## Les neuf jeux de données de la page

| Contexte(s) | Jeu | Lignes | Rôle |
|---|---|---|---|
| `dataes1`, `dataes2`, `dataesfiltered` | **`data-es`** — *Recensement des équipements sportifs (Complet)*, 104 champs, Licence Ouverte 2.0 | **333 611** (`records_count` annoncé : 334 346 — **735 d'écart**, même anomalie qu'à la fiche id 13) | Le parc sportif, une ligne = un équipement (157 675 installations distinctes) |
| `dataagg1` | **`data-es-agregation`** — *Data ES - Agrégation*, 59 champs | **20 325** | Les deux tableaux d'ancienneté. Voir défaut n° 1 : **6,1 % du parc** |
| `datainsee1`, `datainsee2` | **`insee-2020-geoapi-2023`** — *INSEE - Données communes (2020)*, 47 champs | 35 075 | **Population, surface, ZRR, ZFRR, CRTE, loi Montagne, label VAS** — c'est le dénominateur de tous les « pour 10 000 habitants » |
| `dataqpv`, `dataqpv2` | `quartiers-prioritaires-de-la-politique-de-la-ville-qpv`, 18 champs | 1 584 | Couche carte + compteur QPV |
| `searchcommune`, `searchcommune2` | `insee-communes-2023` (`codeinsee, nom_commune, epci_code, bdv_code, dep_code, dep_nom, reg_code, reg_nom, dens_niveau, dens_lib`) | 35 084 | Référentiel de recherche « Commune » |
| `searchepci`, `searchepci2` | `insee-epci` (`epci_code, epci_nom, dep_code, aca_nom`) | 1 360 | Référentiel « EPCI » |
| `searchbdv`, `searchbdv2` | `insee-bassin-de-vie-liste` (`code_bdv, lib_bdv`) | 1 707 | Référentiel « Bassin de vie » |
| `searchdep`, `searchdep2` | `insee-departements` (`dep_code, dep_nom, reg_code, reg_nom, aca_nom`) | 109 | Référentiel « Département » |
| `searchreg`, `searchreg2` | `insee-regions` (`reg, cheflieu, tncc, nom_reg, nom_region, libelle`) | 18 | Référentiel « Région » |

**Dix-huit contextes déclarés** sur un seul `<ods-dataset-context>` — la moitié suffixée `2`
pour le territoire de comparaison. C'est, de très loin, la page la plus multi-sources
rencontrée par le banc.

**Champs `data-es` utilisés** : `equip_numero`, `inst_numero`, `equip_type_famille`,
`equip_type_name`, `equip_prop_type`, `aps_name`, `dens_lib`, `equip_surf`,
`equip_bassin_surf`, `equip_saison`, `equip_pmr_aire`, `equip_acc_libre`, `inst_part_type`,
`inst_part_type_filter`, `equip_utilisateur`, `inst_trans_bool`, `equip_nature`,
`equip_qpv_200m`, `categorie`, `equip_coordonnees`, `inst_nom`, `inst_adresse`, `inst_cp`,
`new_name` — plus les cinq clés géographiques `new_code`, `epci_code`, `lib_bdv`, `dep_code`,
`reg_nom`.

---

## 1. Objectif de la dataviz et informations véhiculées

- **Question** : « Qu'y a-t-il comme équipements sportifs sur *mon* territoire, et comment
  se situe-t-il par rapport à un autre territoire ou à la France ? »
- **Message porté** : aucun message éditorial. C'est un **générateur de fiche de synthèse** :
  l'utilisateur apporte un territoire, la page rend ~40 indicateurs, deux cartes de chiffres,
  quatre graphiques, deux tableaux d'ancienneté et quatre tableaux comparatifs.
- **Ce que l'utilisateur doit obtenir** : un diagnostic d'équipement sportif exploitable par
  un service des sports de collectivité — volumétrie, taux pour 10 000 habitants, profil de
  carence (ZRR / ZFRR / QPV / montagne), ancienneté du parc, et **la même chose pour un
  territoire de comparaison** posé à côté.
- **La maille** : **six niveaux** — Commune, EPCI, Bassin de vie, Département, Région, France.
  Le territoire est **le maître** du motif maître-détail ; les neuf jeux sont les détails.
- **Ce qui n'est pas dans l'objet** :
  - aucune **série temporelle** — la seule dimension temporelle est l'*âge moyen* de mise en
    service et de rénovation, et elle vient d'un jeu à part ;
  - aucun **classement** de territoires (pas de podium, pas de rang) ;
  - aucune **carte choroplèthe** : la seule carte est un semis de points, jamais une carte
    thématique de territoires ;
  - **aucun état partageable** : l'URL reste `…/pages/portrait-territoire/` quel que soit le
    territoire choisi (vérifié, défaut n° 9) ;
  - **aucune alternative non graphique** : ni tableau accessible des graphiques, ni description
    textuelle. Les deux liens CSV portent la donnée brute, pas la synthèse.

---

## 2. Relevé visuel exhaustif, bloc par bloc

### Bloc 0 — Le contexte (invisible, mais c'est toute la mécanique)

```html
<ods-dataset-context context="dataes1,dataesfiltered,dataqpv,datainsee1,
   searchcommune,searchepci,searchbdv,searchdep,searchreg,
   dataes2,dataqpv2,datainsee2,searchcommune2,searchepci2,searchbdv2,searchdep2,searchreg2,dataagg1"
   dataes1-dataset="data-es" dataes1-parameters="{'q':''}"
   dataesfiltered-dataset="data-es"
   dataagg1-dataset="data-es-agregation" dataagg1-parameters="{'q':''}"
   datainsee1-dataset="insee-2020-geoapi-2023" … >
<div ng-init="search = {'query':'', selection:'France', 'querry2':'', 'selection2':'France', 'densitefilter':''}">
<div ods-aggregation="nbequip1,pop1,surf1,com1"
     ods-aggregation-nbequip1-context="dataes1" ods-aggregation-nbequip1-function="COUNT"
     ods-aggregation-pop1-context="datainsee1"  ods-aggregation-pop1-expression="population" ods-aggregation-pop1-function="SUM"
     ods-aggregation-surf1-context="datainsee1" ods-aggregation-surf1-expression="surface"    ods-aggregation-surf1-function="SUM"
     ods-aggregation-com1-context="datainsee1"  ods-aggregation-com1-function="COUNT">
```

**Deux contextes sur `data-es` qui ne servent pas la même chose** :
`dataes1` nourrit les 4 cartes KPI, les deux tableaux comparatifs et les compteurs ;
`dataesfiltered` nourrit **les quatre graphiques et la carte**, et c'est **lui seul** qui
reçoit les `refine-on-click` des graphiques. D'où le défaut n° 4.

### Bloc 1 — Fil d'Ariane, H1, et le sélecteur de territoire

Fil d'Ariane « Accueil › Portrait de territoire ». **H1 « Portrait de territoire »**.

**Six onglets DSFR** (`fr-tabs__container`) : `Commune` (sélectionné par défaut) · `EPCI` ·
`Bassin de Vie` · `Département` · `Région` · `France`.

Sous l'onglet, une **barre de recherche DSFR** (`fr-search-bar`, `ng-model` sur
`search<niveau>.parameters['q']`, `debounce: 300`) et une liste de **pastilles de résultats**
(`ods-results-max="21"`, 20 affichées + « … » au-delà). Placeholders relevés à l'écran :
« Cherchez le nom d'une commune ou code INSEE », « Cherchez le nom d'un Bassin de Vie ».

Sous l'onglet **Commune** seulement, trois **raccourcis en dur** : `Paris (75)` ·
`Marseille (13)` · `Lyon (69)`.

**Comportement joué au navigateur** :

- saisie « Rennes » → 5 pastilles : **Rennes (35) · Rennes-les-Bains (11) · Rennes-le-Château (11)
  · Rennes-sur-Loue (25) · Rennes-en-Grenouilles (53)** — libellé `{{nom_commune}} ({{dep_code}})`.
- saisie « Vitré » → **Vitré (35) · Beaussais-Vitré (79) · Vitreux (39) · Vitrey (54) ·
  Bréal-sous-Vitré (35) · Vitrey-sur-Mance (70)**. La recherche ODS est **floue** :
  « Vitreux » et « Vitrey » ne contiennent pas « Vitré ». À signaler dans la transposition.
- onglet Bassin de Vie, saisie « Vitre » → une pastille **« Vitré (35360) »**, libellé
  `{{lib_bdv}} ({{code_bdv}})`.
- **changer d'onglet ne réinitialise pas le territoire** : après avoir choisi Rennes puis
  cliqué l'onglet « Bassin de Vie », le H2 affiche toujours « 1. Votre territoire : Rennes ».
- **l'URL ne bouge jamais** (défaut n° 9).

**La clé pivot, niveau par niveau** — c'est le cœur du motif, et elle **change de nom dans
chaque jeu** :

| Niveau | `data-es` (`dataes1`/`dataesfiltered`) | `insee-2020-geoapi-2023` | `qpv` | `data-es-agregation` | valeur poussée |
|---|---|---|---|---|---|
| Commune | `new_code` | `code_geographique` | `code_insee` | `installation_insee` | `codeinsee` |
| EPCI | `epci_code` | `codeepci` | **`code_epci`** | `epci_code` | `epci_code` |
| Bassin de vie | `lib_bdv` (**un nom**) | `lib_bdv` | `bdv_nom` | **`bassin_de_vie_nom`** | `lib_bdv` |
| Département | `dep_code` | `nom_departement` (**un nom**) | `dep_code` | `departement_nom` (**un nom**) | `dep_code` / `dep_nom` |
| Région | `reg_nom` (**un nom**) | `nom_region` | `reg_nom` | `region_nom` | `nom_region` |
| France | tout effacé | tout effacé | tout effacé | tout effacé | — |

**Quatre noms de colonne différents pour la même clé, et selon le niveau une clé qui est
tantôt un code tantôt un libellé.** C'est le point qui structure toute la transposition (§ 4.1).

### Bloc 2 — H2 « 1. Votre territoire : {{search.selection}} » et les quatre cartes KPI

Quatre tuiles `fr-kpi__box` avec pictogramme SVG. Formules lues dans le template, valeurs
relevées à l'écran, **les quatre recoupées à l'API pour France ET pour Rennes — toutes exactes** :

| # | Libellé | Formule template | France | Rennes (`new_code=35238`) |
|---|---|---|---|---|
| 1 | Équipements sportifs et lieux de pratiques | `{{nbequip1\|number:0}}` = `COUNT(dataes1)` | **333 611** ✔ | **396** ✔ |
| 2 | Équipements déclarés en établissement scolaire | `count(equip_numero)` où `inst_part_type like 'scolaire'` | **29 452** ✔ | **58** ✔ |
| 3 | Accessibilité PMR des aires de pratiques | `pmr1 / nbequip1 * 100 \| number:2` où `equip_pmr_aire='true'` | **51,90 %** (173 145 / 333 611) ✔ | **77,53 %** (307 / 396) ✔ |
| 4 | Surface des bassins pour 10 000 habitants | `surfbassin1 / pop1 * 10000 \| number:1`, `sum(equip_bassin_surf)` où famille = Bassin de natation, **divisé par `SUM(population)` de l'INSEE** | **234,5 m²** (1 595 478,02 / 68 029 342) ✔ | **145,6 m²** (3 240 / 222 485) ✔ |

**La carte 4 est l'indicateur clé de la page** : son numérateur vient de `data-es` et son
dénominateur de `insee-2020-geoapi-2023`. **Un ratio inter-jeux.** Voir limite **R1**.

### Bloc 3 — « Données » : la source brute et les deux CSV

Un lien **« Source des données brutes »** vers `/explore/assets/data-es/view/?refine=<clé>:<valeur>`
— **sept branches `ng-if` distinctes** selon le niveau choisi, dont deux cas spéciaux
Marseille/Lyon qui pointent vers `/explore/dataset/data-es/table/?…&q=%23search(new_name,Arrondissement)`.

Puis : « Vous trouverez ci-dessous deux fichiers Excel(.csv) avec la liste des équipements
concerné par la recherche (**{{search.selection}}**). Attention, les fichiers peuvent être
lourds lorsqu'ils dépassent plusieurs milliers d'équipements. » et deux liens :

- **Liste des équipements simplifiée** : `dataes1.getV2DownloadURL(xlsx, {'fields':'inst_numero,inst_nom,inst_adresse,inst_cp,new_name,new_code,equip_numero,equip_nom,equip_type_name,equip_prop_type'})` — 10 colonnes.
- **Liste des équipements avec critères** : `dataes1.getV2DownloadURL(xlsx)` — les 104 colonnes.

⚠️ `getV2DownloadURL(xlsx)` où `xlsx` est une **variable de scope non définie** : le premier
argument (le format) vaut donc `undefined`. Le libellé dit « Excel(.csv) », ce qui est déjà
contradictoire en soi.

### Bloc 4 — H4 « Carte des équipements »

« ⧉ Cliquez sur un équipement et découvrez sa fiche »

```html
<ods-map>
  <ods-map-layer color="#000091" context="dataesfiltered" display="auto" picto="dot" show-marker="false">
    <strong>{{record.fields.inst_nom}} - {{record.fields.equip_nom}}</strong><br/><br/>
    <strong>Référence :</strong> {{record.fields.equip_numero}}<br/>
    <strong>Adresse :</strong> {{record.fields.inst_adresse}}<br/>
    <strong>Code postal :</strong> {{record.fields.inst_cp}}<br/>
    <strong>Commune :</strong> {{record.fields.new_name}}<br/>
    <strong>Type :</strong> {{record.fields.equip_type_name}}<br/>
    <strong>Fiche :</strong> <a href="/pages/fiche/?refine.equip_numero={{…}}" target="_blank">…</a>
  </ods-map-layer>
  <ods-map-layer context="dataqpv" color="#CE614A" border-color="#AD4847" shape-opacity="0.6"
                 picto="ods-circle" size="4" size-min="3" size-max="5" display="auto"
                 title="Quartiers prioritaires de la politique de la ville (QPV)"></ods-map-layer>
</ods-map>
```

- **`<ods-map>` sans aucun attribut** : pas de `basemap`, pas de `location`. **Vue au chargement :
  le planisphère** (échelle 3000 km) — relevé à l'écran, France entière, bulles **322 773 ·
  1 213 · 3 474 · 42 · 3 399 · 900 · 67**. Somme 331 868 sur 333 611 → **1 743 équipements sans
  coordonnées**, le même chiffre qu'à la fiche id 13.
- **Contrôles présents** : plein écran, **trois outils de dessin** (polygone / rectangle /
  cercle « pour filtrer »), « Modifier le filtre par zone » / « Effacer le filtre par zone »,
  zoom ±, loupe géocodeur, bouton « me géolocaliser », sélecteur de calques (en bas à gauche),
  échelle km/mi. Attribution « Leaflet | Powered by Huwise - Map data © IGN ».
- **Bandeau relevé sous la carte à l'échelle France** :
  « *Certaines couches sont affichées partiellement pour des raisons de performance. Essayez de zoomer.* »
- **Après choix d'un territoire, la carte se recadre** correctement (Rennes : échelle 2 km,
  13 bulles 51/34/42/38/42/21/67/3/37/32/17/3/9 = 396 ✔ ; Vitré : semis de points individuels).
  **C'est mieux que la carte de la page Accessibilité**, qui ne suit pas ses filtres.
- **Légende manuelle** sous la carte, deux pastilles : 🔵 « Équipements sportif » (`#000091`)
  · 🟥 « QPV » (`#CE614A`).
- **Infobulle relevée mot pour mot** (Vitré, point à l'est du centre) :

  > **Centre départemental de gymnastique - Grande salle de gymnastique**
  > **Référence :** E001I353600018
  > **Adresse :** Bd de Laval
  > **Code postal :** 35500
  > **Commune :** Vitré
  > **Type :** Salle de gymnastique sportive
  > **Fiche :** E001I353600018 ⧉
  >
  > *(pied de bulle : « ‹ 1 of 2 › » — le marqueur porte deux équipements, la bulle est paginée)*

  Le clic **recentre** la carte sur le point.

### Bloc 5 — Les quatre graphiques (contexte `dataesfiltered`)

Précédés de la ligne : « ⧩ *Vous pouvez filtrer les équipements en cliquant sur les graphiques.
Pour retirer le filtre et revenir en arrière, il suffit de cliquer de nouveau sur le graphique.* »

**a. « Top 15 des familles d'équipements »** — `<ods-chart-serie chart-type="bar">` (barres
**horizontales**), `field-x="equip_type_famille"`, `maxpoints="15"`, `sort="serie1-1"`,
`display-values="true"`, `refine-on-click-dataesfiltered-context-field="equip_type_famille"`.
Palette : **30 couleurs nommées en dur** dans `category-colors` (`Divers équipements Sports de
nature #628E5A`, `Terrain de grands jeux #19630A`, … `Aire de sports de glaces #B9D6D8`).
Valeurs France relevées : 42 135 · 41 463 · 38 400 · 28 658 · 25 590 · 18 668 · 16 188 ·
15 781 · 15 409 · 14 562 · 13 598 · 11 612 · 9 563 · 7 416 · 6 317 — **recoupées à l'API,
exactes**. Valeurs Rennes : 74 · 70 · 51 · 43 · 31 · 31 · 16 · 15 · 14 · 10 · 8 · 7 · 6 · 5 · 4
— **recoupées, exactes**. Infobulle au survol relevée : « **Terrain de grands jeux / Nombre 74** ».

**b. « Type de propriétaires (bâti) »** — même type, `field-x="equip_prop_type"`,
`sort="serie1"`, **`logarithmic="true"`** (axe X : 100, 1k, 10k, 100k, 1M en France ; 1, 2, 4,
10, 20, 40, 100, 200, 400 à Rennes). Palette `propcolors` posée par `ng-init`, 12 entrées.
France : Commune 235 631 · Etablissement privé commercial 25 790 · EPCI 15 411 ·
Multi-propriétaire 9 189 · Privé non commercial 9 003 · Département 8 579 · Association(s) 7 939
· Région 6 244 · Etat 4 827 · Etablissement d'enseignement privé 4 218 · Etablissement Public
3 465 · Autre 168 — **12 barres, recoupées, exactes**. Le 13ᵉ groupe de l'API est
`null` (**3 147 équipements**), non représenté.

**c. « Emplacements des équipements »** — `<ods-chart-serie chart-type="pie">`,
`field-x="dens_lib"`, `maxpoints="15"`, sept couleurs en dur (`Rural à habitat très dispersé
#1c764f` … `Grands centres urbains #D85050`). France : 81 098 · 70 761 · 66 334 · 37 028 ·
32 638 · 23 696 · 18 707 — **recoupés, exacts** ; somme **330 262 ≠ 333 611** : le 8ᵉ groupe
de l'API, `dens_lib = null` (**3 349 équipements, 1,0 %**), n'apparaît pas.
Sous-titre : « Source : INSEE - Pour en savoir plus sur la grille communale de densité
[consultez cet article de l'INSEE ⧉](https://www.insee.fr/fr/information/6439600) ».
**Légende manuelle en dur, sept entrées, toujours les sept** — à Rennes le camembert est un
disque plein d'une seule part (« 396 », Grands centres urbains) et les sept entrées restent
affichées. Défaut n° 6.

**d. « Nombre de lieux de pratiques selon les APS »** — `chart-type="column"` (barres
verticales), `field-x="aps_name"`, `maxpoints="15"`, `color="#000091"`, **sans**
`refine-on-click`. France : Football/Futsal 62 640 · Tennis 51 354 · Basket-Ball 45 853 ·
Handball 35 289 · Randonnée pédestre 25 656 · … — recoupés, exacts. Rennes : Basket-Ball 96 ·
Football 82 · Tennis 79 · Handball 72 · Volley 62 · … — recoupés, exacts.

**e. Encart « Installations particulières sur le territoire »** (colonne de droite du bloc c) —
deux lignes conditionnelles :
« Piscines : **2 978** » (`count(distinct inst_numero)` où `inst_part_type_filter:'Piscine'`)
et « Patinoires : **141** » (idem `'Patinoire'`). **Recoupés, exacts.**
Un troisième `ods-adv-analysis` (`basenautique1`, sites nautiques) est calculé **et jamais affiché**.

### Bloc 6 — Les deux tableaux d'ancienneté (contexte `dataagg1`)

**« Structurants, mise en service et rénovations »** — trois colonnes
*Type d'équipements structurant* / *Age de mise en service* / *Rénovations*, cinq lignes
(`limit=5`, `order-by=-count`, `where equipement_categorie = 'structurant'`).

L'âge est calculé par `{{ now | momentadd:'years':-anc.avg | moment:'YY' }} ans` où
`anc.avg = avg(equipement_mise_en_service_date)` et le champ est un **entier d'année**.
Autrement dit : on retranche 1 984,84 *années* à la date du jour, puis on lit **les deux
derniers chiffres de l'année obtenue**. Cela « marche » tant que la moyenne tombe entre
1 927 et 2 026 ; le résultat est tronqué, jamais arrondi. Voir défaut n° 3.

France, relevé à l'écran, **recoupé à l'API** :

| Type | Équipements | Âge mise en service | Déclarées | Âge rénovation | Déclarées |
|---|---|---|---|---|---|
| Terrain de football | 2 281 | 42 ans (`avg` = **1 984,84**) | 1 325 (58,1 %) | 21 ans (`avg` = 2 005,99) | 745 (32,7 %) |
| Salle multisports (gymnase) | 901 | 39 ans (1 987,79) | 719 (79,8 %) | 19 ans (2 007,64) | 360 (40,0 %) |
| Carrière | 461 | 27 ans (1 999,42) | 345 (74,8 %) | 18 ans (2 008,98) | 120 (26,0 %) |
| Manège | 270 | 29 ans (1 997,98) | 215 (79,6 %) | 20 ans (2 006,60) | 75 (27,8 %) |
| Site d'activités aquatiques et nautiques | 199 | 39 ans | 77 (38,7 %) | 21 ans | 34 (17,1 %) |

Note : « *Pour plus de lisibilités, nous n'avons pris que les 5 équipements structurants les
plus présents.* »

**« Familles d'équipements, mise en service et rénovations »** — même structure, `limit=3`,
`where equipement_famille in ("Bassin de natation","Equipement d'athlétisme","Equipement
d'activités de forme et de santé")`. France : *Equipement d'activités de forme et de santé*
828 / 24 ans / 695 (83,9 %) / 17 ans / 158 (19,1 %) · *Equipement d'athlétisme* 578 / 37 ans /
369 (63,8 %) / 19 ans / 100 (17,3 %) · *Bassin de natation* 368 / 36 ans / 324 (88,0 %) /
17 ans / 174 (47,3 %).
Note : « *Ce tableau porte sur l'ensemble des équipements de ces familles (tous périmètres
confondus, y compris non structurants).* »

**Rennes** (relevé) : Salle multisports (gymnase) **14 équipements** / 43 ans · Terrain de
football **8** / 42 ans · Anneau / piste de cyclisme 1 / 26 ans · Salle de tennis de table 1 /
**76 ans** · Site d'activités aquatiques et nautiques 1 / 26 ans.
Plusieurs cellules affichent littéralement « ***déclarées (%)*** » — voir défaut n° 2.

### Bloc 7 — H2 « 2. Comparatif des territoires »

Deux boutons :

- **« ⌄ Comparer avec un territoire »** (`show_comp`) — déplie **exactement le même sélecteur
  à six onglets**, sur les contextes suffixés `2`.
- **« › Comparer avec les communes {{search.densitefilter}} »** — n'apparaît que si le
  territoire courant est une **commune** (le libellé de densité est repris de
  `item.fields.dens_lib` du référentiel). Un clic pose
  `dataes2/dataqpv2/datainsee2.parameters['refine.dens_lib'] = search.densitefilter`.
  Testé : Rennes → « **Rennes comparé avec Grands centres urbains** », colonne 2 =
  **66 334 équipements, 25 628 703 habitants, 9 787 km², 847 QPV** (recoupé : 66 334 = le
  groupe `dens_lib` de l'API ✔).

**Le titre « X comparé avec Y » et la colonne de droite n'apparaissent que si les cinq refine
et le `q` des deux contextes diffèrent** — la condition est recopiée **à l'identique dans
chacune des ~35 cellules de comparaison** :

```html
ng-if="dataes1.parameters['refine.new_code'] != dataes2.parameters['refine.new_code']
    || dataes1.parameters['refine.epci_code'] != dataes2.parameters['refine.epci_code']
    || dataes1.parameters['refine.lib_bdv']   != dataes2.parameters['refine.lib_bdv']
    || dataes1.parameters['refine.dep_code']  != dataes2.parameters['refine.dep_code']
    || dataes1.parameters['refine.reg_nom']   != dataes2.parameters['refine.reg_nom']
    || dataes1.parameters['q']                != dataes2.parameters['q']"
```

### Bloc 8 — Les quatre tableaux d'indicateurs

**Toutes les valeurs ci-dessous ont été recoupées une à une à l'API v2.1. Aucune erreur.**

**8.1 « Statistiques générales des territoires »**

| Ligne | Formule | France | Rennes |
|---|---|---|---|
| Total équipements *(avec sports de nature)* | `COUNT(dataes1)` | 333 611 | 396 |
| Total équipements *(sans sports de nature)* | `count(equip_numero)` où `not equip_type_famille like 'nature'` + part | 291 476 — 87,4 % | 395 — 99,7 % |
| Population *(source INSEE)* | `SUM(population)` de `datainsee1` | 68 029 342 | 222 485 |
| Surface (km²) *(source INSEE)* | `SUM(surface) / 100` (le champ est en **hectares** : 63 852 922,4 ha) | 638 529 | 50 |
| Densité (hab/km²) | population / surface | 107 | 4 420 |

**8.2 « Profil et carences des territoires »** — tous sur `datainsee1` sauf QPV (`dataqpv`).
Le pourcentage est rapporté au **nombre de communes** (`com1` = 35 075) pour les lignes
« Communes en … », et à la **population** pour les lignes « Population en … ».

| Ligne | Clause | France |
|---|---|---|
| QPV | `COUNT(dataqpv)` | **1 584** (pas de %) |
| Communes en ZRR | `count(zrr)` où `zrr like 'zrr'` | 2 145 — 6,1 % |
| Population en ZRR | `sum(population)` où `zrr like 'zrr'` | 1 200 874 — 1,8 % |
| Communes en ZFRR | `count(zfrr)` où `zfrr like 'zfrr'` | 16 870 — 48,1 % |
| Population en ZFRR | `sum(population)` où `zfrr like 'zfrr'` | 11 293 417 — 16,6 % |
| Communes en CRTE Rural | `count(typo_rurb_crte)` où `typo_rurb_crte like 'RURAL'` | 26 623 — 75,9 % |
| Communes Loi Montagne | `count(commune_loi_montagne)` où `… like 'Loi Montagne'` | 5 593 — 15,9 % |
| Label « Ville Active et Sportive » | `count(vas)` où `vas like 'Ville Active et Sportive'` | 1 032 — 2,9 % |

**8.3 « Indicateurs pour 10 000 habitants — Génériques »** — chaque ligne affiche **le taux**
(gros) et **le total** (petit). Le taux est toujours `total / pop1 * 10000`.

| Ligne | Total France | Taux France | Total Rennes | Taux Rennes |
|---|---|---|---|---|
| Taux d'équipements *(avec nature)* | 333 611 | **49,04** | 396 | **17,80** |
| Taux d'équipements *(sans nature)* | 291 476 | **42,8** | 395 | **17,8** |
| Terrains grands jeux | 41 463 | 6,1 | 74 | 3,3 |
| Surface déclarée terrains grands jeux (m²) | 238 033 997 | 34 990 | 456 607 | 20 523 |
| Salles multisports (gymnases) | **18 668,0** | 2,7 | 70,0 | 3,1 |
| Surface déclarée salles multisports (m²) | 14 798 156 | 2 175 | 59 285 | 2 665 |
| Bassins de natation | 6 317 | 0,9 | 8 | 0,4 |
| Surface bassins déclarée (m²) | 1 595 478 | **234,53** | 3 240 | **145,63** |
| Surface bassins hors saisonnier (m²) | 1 024 670 | 150,62 | 3 240 | 145,63 |
| Salles ou terrains spécialisés | 15 409 | 2,3 | 31 | 1,4 |
| Surface salles/terrains spécialisés (m²) | 9 526 792 | 1 400 | 11 008 | 495 |

**8.4 « Indicateurs pour 10 000 habitants — Catégories spécifiques »** — deux lignes, avec
une note de bas de cellule qui **énumère en dur** les types concernés :

- **Équipements de proximité** (`categorie like 'proximité'`) : 36 803 — taux 5,4 (Rennes 32 — 1,4).
  Note : « *Pumptrack, parc Mobil'Ludique, stade VTT de proximité, multisports/city-stades,
  parcours sportif/santé, salle autonome connectée, piste de padel, skatepark, terrain de foot
  5x5, handball, handball 4x4, basket-ball 3x3* ».
- **Équipements structurants** (`categorie like 'structurant'`) : 88 769 — taux 13,0 (Rennes 184 — 8,3).
  Note de 6 lignes, avec deux fautes visibles : « *tenis de table* », « *raquetball* ».

**8.5 « Statistiques détaillées des équipements »** — huit lignes, chacune `total` + `part de
nbequip1` :

| Ligne | Clause | France | Rennes |
|---|---|---|---|
| Accessibilité PMR des aires d'évolutions sportives *(+ lien « tableau de bord sur l'accessibilité »)* | `equip_pmr_aire = 'true'` | 173 145 — 51,9 % | 307 — 77,5 % |
| Équipements en accès libre *(tous les jours, à toute heure et sans encadrement)* | `equip_acc_libre = 'true'` | 123 918 — 37,1 % | 79 — 19,9 % |
| Équipements en établissement scolaire *(+ lien vers `/pages/education-equipement/`)* | `inst_part_type like 'scolaire'` | 29 452 — 8,8 % | 58 — 14,6 % |
| Équipements scolaires déclarés ouverts aux clubs | `(inst_part_type like 'scolaire') and (equip_utilisateur like 'Clubs')` | 5 684 — **« non ouvert »** | 9 — **« non ouvert »** |
| Accessible aux transports en commun | `inst_trans_bool = 'true'` | 96 814 — 29,0 % | 303 — 76,5 % |
| Saisonnier *(ouvert moins de 6 mois sur l'année)* | `equip_saison = 'true'` | 13 297 — 4,0 % | 4 — 1,0 % |
| Intérieur ou découvrable | `equip_nature = 'Intérieur' or equip_nature = 'Découvrable'` | 88 414 — 26,5 % | 181 — 45,7 % |
| Nombre d'équipements à proximité des QPV (au moins 200 mètres) *(donnée calculée en avril 2026)* | `equip_qpv_200m is not null` | 24 739 — 7,4 % | 105 — 26,5 % |

### Bloc 9 — « Pour aller plus loin »

Texte : « *Nous restons ouvert à toutes les évolutions qui seraient possibles d'apporter au
portrait de territoire. Aussi si vous trouvez des données incohérentes ou si vous souhaitez
apporter des correction : contactez-nous !* » Puis trois tuiles : **Données** (« Découvrez la
base de donnée Data ES »), **Déclarez vos équipements**, **Contactez-nous**.

### Chronométrage (mesuré, `performance.getEntriesByType('resource')`)

| Mesure | Chargement initial (France) | Après choix d'une commune (Rennes) |
|---|---|---|
| **Requêtes API** | **71** | **87** |
| dont métadonnées v1 (`/api/datasets/1.0/<jeu>/`) | 9 | 0 (déjà en cache) |
| dont `/api/records/1.0/analyze/` (les 4 graphiques) | 13 | 10 |
| dont `/api/explore/v2.1/…/records` | 42 (27 `data-es`, 8 `data-es-agregation`, 7 INSEE) | 70 (48 + 8 + 14) |
| dont carte (`boundingbox`, `geocluster`, `geopreview`) | 6 | 6 |
| **Octets transférés (API)** | **146 Ko** | 38 Ko |
| Durée cumulée des requêtes | 18 410 ms | 59 512 ms |
| Durée médiane / max d'une requête | 212 ms / 763 ms | 650 ms / 2 238 ms |
| Mur (première requête → dernière réponse) | **6,4 s** | **2,4 s** |

**Le coût est le nombre d'allers-retours, pas le poids** : 146 Ko pour 71 requêtes, soit ~2 Ko
par réponse. Le mur au chargement (6,4 s) tient à la sérialisation des vagues (métadonnées,
puis agrégats, puis carte) ; après un changement de territoire, les 87 requêtes partent
quasiment ensemble (concurrence observée ≈ 25, HTTP/2) et le mur retombe à 2,4 s.

**Pourquoi 87 requêtes après un changement de territoire et 71 au chargement** : les ~35 cellules
de comparaison sont derrière un `ng-if` qui est faux quand les deux territoires sont identiques
(France / France). Dès qu'ils diffèrent, la moitié droite du tableau se réveille et double les
agrégats. Le template compte **64 `ods-adv-analysis` distincts et 10 `ods-aggregation`** ;
avec les 4 graphiques et les 2 couches de carte, **~80 requêtes est le régime nominal**.

---

## 3. Défauts et bizarreries de l'original

1. **Les deux tableaux d'ancienneté portent sur 6,1 % du parc, sans le dire.**
   Ils sont branchés sur `data-es-agregation`, **20 325 lignes** contre 333 611 dans `data-es`.
   Le tableau annonce « **Terrain de football — 2 281 équipements** » ; l'API compte
   **36 379** terrains de football dans `data-es` (tous catégorisés `structurant`). Idem à
   Rennes : le tableau annonce « Salle multisports (gymnase) — **14** équipements » quand
   `data-es` en compte **70** (`equip_type_name = 'Salle multisports (gymnase)'`, refine
   `new_code=35238`). Le jeu d'agrégation contient par ailleurs **12 939 lignes à
   `equipement_categorie` nul** sur 20 325, et sa dernière modification date du **2026-03-23**
   quand `data-es` est mis à jour quotidiennement (2026-09-10 au relevé). Rien à l'écran ne
   signale que ces deux tableaux changent de population de référence.
2. **Des cellules affichent littéralement « déclarées (%) ».** Quand un type d'équipement n'a
   aucune date déclarée, `(renovations_total | filter:{type:…})[0].count` est `undefined` et
   les deux interpolations rendent vide, laissant le texte fixe. Relevé à l'écran sur Rennes :
   « Terrain de football — 26 ans / *déclarées (%)* », « Anneau / piste de cyclisme — 26 ans /
   *déclarées (%)* », « Site d'activités aquatiques et nautiques — 26 ans / *déclarées (%)* »
   (deux fois). Cinq lignes sur cinq en contiennent au moins une.
3. **L'âge est calculé par arithmétique de dates sur un entier d'année.**
   `now | momentadd:'years':-1984.84 | moment:'YY'` : on soustrait 1 984,84 ans à aujourd'hui
   pour lire « 42 » dans l'année 42 apr. J.-C. L'âge vrai est 2026,7 − 1984,84 = **41,9 ans** ;
   l'écran affiche **42**, par troncature de l'année, pas par arrondi de l'âge. La formule
   casse silencieusement dès que la moyenne sort de [1927, 2026] : « Salle de tennis de table,
   **76 ans** » à Rennes correspond à une moyenne de 1950 — c'est encore juste, mais un
   équipement moyen de 1900 afficherait « 26 ans ».
4. **Les graphiques filtrent la carte et les autres graphiques, mais pas les KPI ni les
   tableaux.** Vérifié : à Rennes, un clic sur la barre « Terrain de grands jeux » réduit le
   graphique à une barre (74), met à jour le graphique des propriétaires (Commune 59 /
   Etablissement privé commercial 8 / Etablissement Public 7 = 74) et la carte (points
   individuels) — **mais les quatre cartes KPI restent à 396 / 58 / 77,53 % / 145,6 m²**, et les
   quatre tableaux d'indicateurs ne bougent pas. Cause : les graphiques et la carte sont sur
   `dataesfiltered`, tout le reste sur `dataes1`. La phrase d'invitation
   (« *Vous pouvez filtrer les équipements en cliquant sur les graphiques* ») est placée **entre**
   les KPI et les graphiques, sans dire ce qui suit le filtre.
5. **Le graphique « Nombre de lieux de pratiques selon les APS » n'est pas cliquable**, alors
   que les trois autres le sont et que l'invite ne distingue pas. Il n'a pas de
   `refine-on-click-context`.
6. **Trois légendes écrites à la main, désynchronisées des graphiques.**
   - « Emplacements des équipements » : 7 entrées **toujours affichées**, même quand le
     camembert n'a qu'une part (Rennes).
   - « Type de propriétaires » : la palette `propcolors` déclare 12 entrées ; le graphique en
     rend 12 à France, 8 à Rennes.
   - La légende de la carte est deux `<span>` en dur.
   Aucune n'est dérivée des données rendues.
7. **Le groupe `null` disparaît sans mention.** `dens_lib` nul : **3 349** équipements (1,0 %)
   absents du camembert (330 262 affichés / 333 611). `equip_prop_type` nul : **3 147**
   (0,9 %) absents du graphique des propriétaires. Les totaux des graphiques ne recollent
   donc pas au KPI qui les surplombe.
8. **Le compteur QPV reste collé au dernier EPCI choisi quand on revient à France.**
   Le jeu QPV porte la colonne **`code_epci`** ; la branche « EPCI » du sélecteur pose bien
   `dataqpv.parameters['refine.code_epci']`, mais la remise à zéro « France » (comme la branche
   « Commune » et les trois raccourcis Paris/Marseille/Lyon) efface `refine.epci_code` — un nom
   de colonne qui **n'existe pas** dans ce jeu. Le refine EPCI n'est donc jamais retiré.
   **Observé à l'écran** au terme de la séquence *Commune Rennes → Bassin de Vie Vitré → France
   → EPCI Rennes Métropole → France* : l'écran affiche « 1. Votre territoire : **France** »,
   333 611 équipements, 68 029 342 habitants, 2 145 communes en ZRR — et **QPV = 5**, la valeur
   de Rennes Métropole (vérifiée à l'API : `code_epci=243500139` → 5 QPV), au lieu de 1 584.
   Les branches Bassin de vie / Département / Région, elles, effacent bien `code_epci`.
9. **Aucune synchronisation d'URL.** L'URL reste nue quel que soit le territoire, le territoire
   de comparaison et les filtres de graphique. Pour une page dont le produit **est** une fiche
   de territoire, c'est le défaut le plus coûteux : une fiche ne se cite pas, ne s'envoie pas,
   ne se met pas en favori. C'est aussi ce qui interdit un lien « portrait de ma commune »
   depuis un autre site.
10. **La carte s'ouvre sur le planisphère.** Aucun attribut sur `<ods-map>` : au chargement,
    échelle 3000 km, la France est une bulle « 322 773 » au milieu de l'Atlantique nord, avec
    six bulles ultramarines dispersées. Le bandeau « Certaines couches sont affichées
    partiellement pour des raisons de performance. Essayez de zoomer. » s'affiche sous la carte.
11. **La recherche de territoire est floue et non bornée.** « Vitré » propose « Vitreux (39) »,
    « Vitrey (54) » et « Vitrey-sur-Mance (70) », qui n'ont pas de rapport. Il n'y a ni
    désambiguïsation par département, ni tri par pertinence visible, ni indication du nombre de
    résultats au-delà de 20 (juste « … »).
12. **Changer d'onglet ne change pas le territoire, et rien ne le dit.** Après avoir choisi
    Rennes puis basculé sur l'onglet « Bassin de Vie », l'écran montre un champ de recherche
    vide et, plus bas, « 1. Votre territoire : Rennes ». L'onglet actif ne reflète pas la maille
    du territoire affiché.
13. **Un `<select>` de comparaison qui n'existe qu'au niveau commune.** Le bouton « Comparer
    avec les communes {{densité}} » est conditionné à `search.densitefilter != ''`, et cette
    variable n'est renseignée que par la branche Commune. Il n'y a donc pas de « comparer avec
    les EPCI de même strate », alors que c'est le besoin le plus courant côté intercommunalité.
14. **« non ouvert » n'est pas un pourcentage.** La cellule « Équipements scolaires déclarés
    ouverts aux clubs » affiche `5 684 source` puis, à la place du taux, le libellé du **lien**
    vers la liste complémentaire : « *non ouvert ⧉* ». Toutes les autres lignes du tableau
    affichent un pourcentage à cet endroit. Le taux réel (5 684 / 29 452 = 19,3 %) n'est nulle
    part sur la page — alors que **la page `/pages/education-equipement/` l'affiche** (19 %).
15. **Formatage incohérent des nombres.** Sur la même colonne : « Taux d'équipements *(avec
    nature)* **49,04** » puis « *(sans nature)* **42,8** » (2 décimales puis 1) ;
    « Total des salles **18 668,0** » (un entier avec une décimale) ; « 234,53 » dans le tableau
    et « 234,5 m² » dans la carte KPI pour la même valeur.
16. **`getV2DownloadURL(xlsx)`** : `xlsx` est une variable de scope jamais définie, donc
    `undefined`. Le libellé annonce « deux fichiers Excel(.csv) », ce qui mélange deux formats.
17. **Le template pèse 186 Ko pour ~40 indicateurs.** Chaque cellule de comparaison recopie la
    même condition `ng-if` de six termes, et chaque cellule « source » recopie cinq branches
    conditionnelles (Paris, Marseille, Lyon, France, autre). Le bloc « Équipements scolaires
    ouverts aux clubs » à lui seul fait ~200 lignes pour afficher un nombre et deux liens.
18. **Un agrégat calculé et jamais affiché** : `basenautique1`
    (`count(distinct inst_numero)` sur les sites d'activités aquatiques et nautiques) est
    déclaré à côté de `piscine1` et `patnoire1` et n'apparaît dans aucune interpolation.
19. **`inst_part_type_filter:'Piscine'` est une égalité stricte sur une colonne
    semi-multivaluée.** Le champ contient des valeurs composées (`Complexe sportif;Piscine`
    39 lignes, `Base de plein air et/ou de loisirs;Piscine` 23, `Piscine;Base de plein air`
    15, `Piscine;Domaine de ski` 7, `Piscine;Aucun` 2). Le compte affiché est **2 978**
    installations ; en recherche plein texte (`search(inst_part_type_filter,"Piscine")`) il
    serait de **2 984**. Six installations manquent, à cause de la grammaire du refine.
20. **Un libellé qui dit l'inverse de ce qu'il compte** : « Nombre d'équipements à proximité
    des QPV (**au moins** 200 mètres) », alors que le champ s'appelle `equip_qpv_200m` (« QPV à
    200 mètres ») et que la clause est `is not null`. Le sens attendu est « à **moins de**
    200 mètres ».

### Deux faux problèmes écartés en cours de relevé

- **`unedefined`.** Le template écrit `datainsee1.parameters['refine.nom_departement'] = unedefined;`
  et `dataagg1.parameters['refine.departement_nom'] = unedefined;` — coquille présente dans la
  remise à zéro « France » et dans la branche Commune. **Sans conséquence** : dans une
  expression AngularJS, un identifiant inconnu s'évalue à `undefined`, la coquille assigne donc
  exactement ce qui était voulu. Vérifié à l'écran : après *Commune Rennes → France*, la
  population revient bien à 68 029 342 et les indicateurs départementaux à leur valeur nationale.
- **Le nom de variable `surfbassin1` porté par trois `ods-adv-analysis` différents** (la carte
  KPI, la ligne « surface des bassins », la ligne « hors saisonnier ») avec trois `where`
  différents ; idem `pmr1`, `scol1`, `nbequipstruct` en double. J'ai d'abord conclu à une
  collision de scope. **C'est faux** : `ods-adv-analysis` crée un scope enfant, et l'écran le
  prouve — la ligne « surface des bassins » affiche 234,53 / 1 595 478 et la ligne « hors
  saisonnier » 150,62 / 1 024 670 au même instant, deux valeurs distinctes issues du même nom.
- **La branche Bassin de vie pose `dataagg1.parameters['refine.bassin_de_vie_nom']` alors que
  toutes les autres branches effacent `refine.bassin_de_vie_code`** — un nom jamais nettoyé, en
  apparence le pendant du défaut n° 8. **Testé, et non reproductible** : la remise à zéro
  « France » fait `dataagg1.parameters = {'q': ''}`, un **remplacement d'objet** qui balaie tous
  les refine avant d'en effacer certains un à un. Vérifié à l'écran (*Bassin de vie Vitré →
  France*) : le tableau des structurants repasse bien de 4 lignes à Terrain de football 2 281.
  Le contexte `dataqpv`, lui, ne bénéficie d'aucun remplacement d'objet — d'où le défaut n° 8,
  qui est réel.

---

## 4. Transposition vers `dsfr-data`

Attributs vérifiés par `get_skill(<id>, "reference")` du MCP ChartsBuilder **et**, quand la
fiche est en retard, par lecture du source `~/Developer/GitHub/dsfr-data/packages/core/src`.
Tout ce qui n'a pas été vérifié est signalé **« non vérifié »**.

### 4.1 Le choix d'architecture, avant le tableau

**Le motif est un maître-détail dont le maître est une maille administrative.** Il tient à
trois choses, et `dsfr-data` en a deux et demie :

1. **Une clé pivot diffusée à N sources** → `<dsfr-data-context sources="…">` +
   `<dsfr-data-context-filter>`. Vérifié au source (`dsfr-data-context.ts:316-322`,
   `dsfr-data-context-filter.ts:180-181, 325-328`) : `apply-to` accepte **une liste d'ids
   séparés par des espaces** et restreint la diffusion à ces sources ; `ui` désigne l'élément
   d'UI écouté, et **plusieurs filtres peuvent écouter le même élément** (chacun pose ses
   propres `change`/`input`, et le `whereKey` est indexé sur `uid + champ`, pas sur l'ordre DOM).
   **La clé qui change de nom d'un jeu à l'autre se règle donc par un filtre par jeu** :

   ```html
   <select id="sel-commune">…<option value="35238">Rennes (35)</option>…</select>

   <dsfr-data-context id="ctx" url-sync
     sources="s-es s-es-carte s-insee s-qpv s-agg">
     <dsfr-data-context-filter apply-to="s-es s-es-carte" field="new_code"           ui="sel-commune"></dsfr-data-context-filter>
     <dsfr-data-context-filter apply-to="s-insee"         field="code_geographique"  ui="sel-commune"></dsfr-data-context-filter>
     <dsfr-data-context-filter apply-to="s-qpv"           field="code_insee"         ui="sel-commune"></dsfr-data-context-filter>
     <dsfr-data-context-filter apply-to="s-agg"           field="installation_insee" ui="sel-commune"></dsfr-data-context-filter>
   </dsfr-data-context>
   ```

   **Non vérifié au navigateur** — établi par lecture du code, pas rejoué. C'est la première
   chose à mesurer si la page est reproduite.

2. **Une source par jeu de détail, donc pas de jointure** → vrai ici pour les huit blocs
   « comptages ». Les 64 `ods-adv-analysis` se réduisent à **une poignée de sources**
   (§ 4.3), parce que `group-by` multi-champs ramène plusieurs indicateurs en une requête —
   le motif déjà établi à la fiche id 13 (5 jauges en 1 requête, 32 lignes, 273 ms).

3. **Un ratio dont le numérateur et le dénominateur sont dans deux jeux différents** →
   **c'est là que ça coince**, et c'est le résidu de cette page (limite **R1**).

**Ce qui NE se transpose pas comme dans le modèle ODS** : le sélecteur à six mailles. Chaque
maille utilise un couple de colonnes différent dans chacun des quatre jeux, soit
**24 combinaisons**. Avec `dsfr-data-context-filter`, cela se traduit par 4 filtres × 6 mailles
= **24 balises**, et il faut en plus **vider les 20 autres** quand on change de maille.
`dsfr-data-context.clearAll()` vide *tout*, y compris ce qu'on veut garder. Voir limite **R2**.

### 4.2 Tableau de correspondance

| Directive / composant Opendatasoft | Composant + attributs `dsfr-data` | Verdict |
|---|---|---|
| `<ods-dataset-context>` à 18 contextes | **9 `<dsfr-data-source>`** — une par jeu, `api-type="opendatasoft" base-url="https://equipements.sports.gouv.fr" dataset-id="…"`, **pas d'`api-key-ref`** (portail ouvert, CORS `*` vérifié), **pas de `proxy-url`** | natif |
| Les six onglets + la barre de recherche + les pastilles | `<select class="fr-select">` DSFR par maille, peuplé par `<dsfr-data-facets server-facets display="champ:select">` (dép. 101, régions 18, EPCI 1 360, bdv 1 707) ; pour les 35 084 communes, `<dsfr-data-search server-search count>` sur `new_name` **ou** cascade `server-facets` derrière le département | natif, mais voir R2 |
| `search.selection` interpolé dans le H2 et 4 paragraphes | `<dsfr-data-context-tags>` (rappel supprimable des filtres actifs) + un titre statique. **Pas d'équivalent de l'interpolation d'un libellé de filtre dans du texte libre** — voir R4 | manque réel (R4) |
| `ods-aggregation function="COUNT"` (`nbequip1`) | `<dsfr-data-kpi source="s-es" value="meta:total" format="nombre">` — **`meta:total`, pas `count`** : `count` ne compte que les lignes reçues (JSDoc `value`, #659) | natif |
| `ods-aggregation SUM(population)` (`pop1`) | `<dsfr-data-source id="s-insee" select="sum(population) as pop, sum(surface) as surf, count(*) as com" limit="1">` puis `<dsfr-data-kpi value="pop:max">` — `limit="1"` + lecture en `:max` (piège maison : un `select` d'agrégat sans `group_by` répète la valeur à chaque ligne de page) | natif |
| `surf1 / 100` (hectares → km²) | `<dsfr-data-normalize compute="surf_km2 = surf / 100" round="surf_km2:0">` — arithmétique ligne à ligne, exactement le périmètre de `compute` | natif |
| `pop1 / surf1` (densité) | même `compute` : `dens = pop / (surf / 100)` | natif |
| **`pmr1 / nbequip1 * 100`** (KPI 3) — deux agrégats du **même** jeu | `<dsfr-data-kpi value="count:equip_pmr_aire:true / count" format="pourcentage" decimals="2">` | **prévu v0.24.0 (#673)** |
| **`surfbassin1 / pop1 * 10000`** (KPI 4) — deux agrégats de **deux jeux différents** | aucune voie native ; #673 est explicitement mono-source (« chaque côté = grammaire actuelle », évaluée sur la source du KPI) | **manque réel (R1)** |
| Les 8 lignes « Profil et carences » (`count(zrr)` où `zrr like 'zrr'`, etc.) | **une** `<dsfr-data-source group-by="zrr, zfrr, typo_rurb_crte, commune_loi_montagne, vas" aggregate="population:sum">` sur `insee-2020-geoapi-2023` — les 5 critères et leurs 8 numérateurs en **une** requête, plus les populations. Recomposition côté page | natif (motif de la fiche id 13) |
| Les ~20 lignes « Indicateurs / 10 000 hab » et « Statistiques détaillées » sur `data-es` | regroupées par dénominateur : `group-by="equip_type_famille"` + `aggregate="equip_surf:sum, equip_numero:count"` en **une** requête couvre grands jeux / multisports / bassins / spécialisés ; `group-by="categorie"` couvre proximité + structurant ; `group-by="equip_pmr_aire, equip_acc_libre, equip_saison"` couvre trois lignes | natif |
| `count(distinct inst_numero)` (piscines, patinoires) | `select="count(distinct inst_numero) as t" limit="1"` passe tel quel dans le `select` ODSQL de la source ; l'agrégat `distinct` de la grammaire commune est **prévu v0.24.0 (#672)** | natif via `select` / prévu (#672) |
| `<ods-chart chart-type="bar">` horizontal, top 15 | `<dsfr-data-chart type="bar" horizontal source="…" label-field="equip_type_famille" value-field="equip_numero__count">` sur une source `group-by` + `order-by="equip_numero__count:desc" limit="15"` | natif |
| `logarithmic="true"` (graphique propriétaires) | **aucun attribut d'échelle logarithmique** dans la référence de `dsfr-data-chart` (relue attribut par attribut : `y-min`, `y-max`, `x-min`, `x-max` seulement) | **manque réel (R5)** |
| `category-colors="{…30 entrées…}"` | pas de mapping couleur par catégorie sur `dsfr-data-chart` (`selected-palette` seulement) ; `color-map` existe sur `dsfr-data-map-layer`, pas sur le graphique | **manque réel (R6)** |
| `<ods-chart-serie chart-type="pie">` densité | `<dsfr-data-chart type="pie" fill>` (`fill=false` par défaut = donut) + `empty-label="Non renseigné"` — **corrige d'office le défaut n° 7** : le groupe `null` est nommé au lieu de disparaître | natif, meilleur que l'original |
| Les 3 légendes en dur | `dsfr-data-map-legend` pour la carte (entrées **dérivées du `color-map` rendu**, donc jamais d'entrée fantôme) ; pour les graphiques, la légende native de DSFR Chart | natif, corrige le défaut n° 6 |
| `refine-on-click-dataesfiltered-context-field="equip_type_famille"` sur un graphique | **rien.** `refine-on-click`, `context` et `dsfr-data-map-select` n'existent **que** sur `dsfr-data-map-layer` (vérifié : `grep -rl refine-on-click packages/core/src` → un seul fichier, `dsfr-data-map-layer.ts`) ; `dsfr-data-chart` n'installe aucun gestionnaire de clic et n'émet aucun événement de sélection. Voie native de remplacement : `<dsfr-data-facets context="ctx" display="equip_type_famille:select">`, qui donne les mêmes comptes **et** filtre tout le contexte (donc corrige le défaut n° 4) | **manque réel (R3)**, avec un substitut fonctionnel |
| `<ods-map>` nu, planisphère | `<dsfr-data-map tiles="ign-plan" tiles-style="muted" center="46.6,2.3" zoom="6" fit-bounds fit-zone="41,-5.5,51.5,10" insets="drom">` — corrige le défaut n° 10. ⚠️ piège BUG-004 : `fit-bounds` + `max-bounds` sur un territoire à un seul point renvoie vide ; poser `fit-zone="none"` dès qu'un DROM peut être sélectionné | natif |
| `ods-map-layer display="auto"` (clusters agrégés **serveur**) | `<dsfr-data-map-layer type="marker" cluster max-items="20000" bbox bbox-field="equip_coordonnees" geo-field="equip_coordonnees">` — chargement par viewport. **Le chiffre « 322 773 » d'un coup d'œil national ne se reproduit pas** ; il est déjà donné en toutes lettres par le KPI juste au-dessus. Même arbitrage qu'à la fiche id 13, § L2 | écart assumé, pas une limite |
| Infobulle `<ods-map-layer>` avec template | `<dsfr-data-map-popup title-field="inst_nom">` + `<template>` interpolant `{{equip_nom}}`, `{{equip_numero}}`, `{{inst_adresse}}`, `{{inst_cp}}`, `{{new_name}}`, `{{equip_type_name}}` et un lien `href="/pages/fiche/?…{{equip_numero}}"` | natif |
| Les outils de dessin (polygone / rectangle / cercle) | aucun équivalent. Ce n'est pas une limite au sens du dépôt : c'est un outil ODS qu'on remplace par les facettes géographiques, qui répondent au même besoin de façon lisible et partageable | écart assumé |
| La loupe géocodeur | aucun géocodeur (constat déjà porté, fiche id 13 § L3) | connu |
| `getV2DownloadURL(...)` (les deux CSV) | `<dsfr-data-a11y source="s-es" download filename="portrait-<territoire>.csv" table>` — **et on gagne le tableau accessible que l'original n'a pas** | natif, meilleur |
| Rien dans l'original | `url-sync` sur le `dsfr-data-context` — corrige le défaut n° 9, qui est le plus coûteux de la page | natif |
| Rien dans l'original | `require-where` : aucune requête tant qu'aucun territoire n'est choisi, état `idle` rendu en message DSFR — **prévu v0.25.0 (#690)**. Pour une page « Portrait de territoire », c'est exactement le motif : la fiche n'a pas de sens avant qu'un territoire soit choisi, et l'original dépense 71 requêtes pour afficher un « portrait de la France » que personne n'a demandé | prévu (#690) |

### 4.3 Esquisse de code (squelette)

```html
<!-- ── Portail Sports : ouvert, CORS *, aucune clé ─────────────────────── -->
<!-- A. Le parc, une source par usage -->
<dsfr-data-source id="s-es-tot" api-type="opendatasoft"
  base-url="https://equipements.sports.gouv.fr" dataset-id="data-es"
  select="count(*) as n" limit="1"></dsfr-data-source>

<!-- B. Tous les comptages par famille en UNE requête (grands jeux, gymnases,
     bassins, spécialisés, et les surfaces qui vont avec) -->
<dsfr-data-source id="s-es-fam" api-type="opendatasoft"
  base-url="https://equipements.sports.gouv.fr" dataset-id="data-es"
  group-by="equip_type_famille"
  aggregate="equip_numero:count, equip_surf:sum, equip_bassin_surf:sum"></dsfr-data-source>

<!-- C. Les critères booléens en UNE requête (2^n lignes, recomposées côté page) -->
<dsfr-data-source id="s-es-crit" api-type="opendatasoft"
  base-url="https://equipements.sports.gouv.fr" dataset-id="data-es"
  group-by="equip_pmr_aire, equip_acc_libre, equip_saison, inst_trans_bool"
  aggregate="equip_numero:count"></dsfr-data-source>

<!-- D. Les catégories (proximité / structurant), et la densité pour le camembert -->
<dsfr-data-source id="s-es-cat"  … group-by="categorie"  aggregate="equip_numero:count"></dsfr-data-source>
<dsfr-data-source id="s-es-dens" … group-by="dens_lib"   aggregate="equip_numero:count"></dsfr-data-source>
<dsfr-data-source id="s-es-prop" … group-by="equip_prop_type" aggregate="equip_numero:count"></dsfr-data-source>
<dsfr-data-source id="s-es-aps"  … group-by="aps_name"   aggregate="equip_numero:count"
  order-by="equip_numero__count:desc" limit="15"></dsfr-data-source>

<!-- E. Le socle INSEE : population, surface, communes, et les 5 critères de carence
        en UNE requête -->
<dsfr-data-source id="s-insee" api-type="opendatasoft"
  base-url="https://equipements.sports.gouv.fr" dataset-id="insee-2020-geoapi-2023"
  select="sum(population) as pop, sum(surface) as surf_ha, count(*) as com" limit="1">
</dsfr-data-source>
<dsfr-data-source id="s-insee-carence" api-type="opendatasoft"
  base-url="https://equipements.sports.gouv.fr" dataset-id="insee-2020-geoapi-2023"
  group-by="zrr, zfrr, typo_rurb_crte, commune_loi_montagne, vas"
  aggregate="population:sum"></dsfr-data-source>

<!-- F. QPV, agrégation d'ancienneté, et la carte -->
<dsfr-data-source id="s-qpv" api-type="opendatasoft" …
  dataset-id="quartiers-prioritaires-de-la-politique-de-la-ville-qpv"
  select="count(*) as n" limit="1"></dsfr-data-source>
<dsfr-data-source id="s-agg" api-type="opendatasoft" … dataset-id="data-es-agregation"
  group-by="equipement_type"
  aggregate="equipement_numero:count, equipement_mise_en_service_date:avg, equipement_derniers_travaux_date:avg"
  order-by="equipement_numero__count:desc" limit="5"
  where="equipement_categorie = 'structurant'"></dsfr-data-source>
<dsfr-data-source id="s-carte" api-type="opendatasoft" … dataset-id="data-es"
  select="inst_nom, equip_nom, equip_numero, inst_adresse, inst_cp, new_name, equip_type_name, equip_coordonnees"
  where="equip_coordonnees is not null" max-records="20000"></dsfr-data-source>

<!-- ── Le maître : un territoire, diffusé aux 9 jeux ───────────────────── -->
<h1>Portrait de territoire</h1>
<label class="fr-label" for="sel-commune">Commune</label>
<select class="fr-select" id="sel-commune"><option value="">France entière</option>…</select>

<dsfr-data-context id="ctx" url-sync
  sources="s-es-tot s-es-fam s-es-crit s-es-cat s-es-dens s-es-prop s-es-aps
           s-insee s-insee-carence s-qpv s-agg s-carte">
  <dsfr-data-context-filter apply-to="s-es-tot s-es-fam s-es-crit s-es-cat s-es-dens s-es-prop s-es-aps s-carte"
    field="new_code" label="Commune" ui="sel-commune"></dsfr-data-context-filter>
  <dsfr-data-context-filter apply-to="s-insee s-insee-carence"
    field="code_geographique" ui="sel-commune"></dsfr-data-context-filter>
  <dsfr-data-context-filter apply-to="s-qpv" field="code_insee"        ui="sel-commune"></dsfr-data-context-filter>
  <dsfr-data-context-filter apply-to="s-agg" field="installation_insee" ui="sel-commune"></dsfr-data-context-filter>
</dsfr-data-context>
<dsfr-data-context-tags for="ctx"></dsfr-data-context-tags>

<!-- ── La fiche : les 4 KPI ────────────────────────────────────────────── -->
<h2>Votre territoire</h2>
<dsfr-data-kpi-group>
  <dsfr-data-kpi source="s-es-tot" value="n:max" format="nombre" col="3"
    label="Équipements sportifs et lieux de pratiques"></dsfr-data-kpi>
  <!-- ratio de deux agrégats du MÊME jeu : prévu #673 (v0.24.0) -->
  <dsfr-data-kpi source="s-es-crit" value="count:equip_pmr_aire:true / count"
    format="pourcentage" decimals="2" col="3"
    label="Accessibilité PMR des aires de pratiques"></dsfr-data-kpi>
  <!-- surface de bassins pour 10 000 hab : numérateur data-es, dénominateur INSEE.
       Aucune voie native (limite R1) -->
</dsfr-data-kpi-group>

<!-- ── Les graphiques, qui filtrent VRAIMENT (défaut n° 4 corrigé) ─────── -->
<dsfr-data-facets context="ctx" server-facets
  fields="equip_type_famille, equip_prop_type, dens_lib"
  labels="equip_type_famille:Famille | equip_prop_type:Propriétaire | dens_lib:Emplacement"
  display="equip_type_famille:select | equip_prop_type:select | dens_lib:select">
</dsfr-data-facets>

<dsfr-data-chart type="bar" horizontal source="s-es-fam"
  label-field="equip_type_famille" value-field="equip_numero__count"
  name="Équipements" empty-label="Non renseigné"
  databox databox-title="Top 15 des familles d'équipements"
  databox-source="Data ES, Ministère des Sports" databox-download></dsfr-data-chart>

<dsfr-data-chart type="pie" source="s-es-dens"
  label-field="dens_lib" value-field="equip_numero__count"
  empty-label="Densité non renseignée"
  databox-title="Emplacements des équipements"></dsfr-data-chart>

<!-- ── La carte, cadrée sur la France, qui suit le territoire ──────────── -->
<dsfr-data-map name="Équipements sportifs du territoire"
  tiles="ign-plan" tiles-style="muted" center="46.6,2.3" zoom="6"
  fit-bounds fit-zone="none">
  <dsfr-data-map-layer source="s-carte" type="marker" cluster max-items="20000"
    bbox bbox-field="equip_coordonnees" geo-field="equip_coordonnees" color="#000091">
    <dsfr-data-map-popup title-field="inst_nom">
      <template>
        <p class="fr-text--sm fr-mb-1v">{{equip_nom}}</p>
        <p class="fr-text--xs odv-rubrique" data-intitule="Référence">{{equip_numero}}</p>
        <p class="fr-text--sm">{{inst_adresse|}}<br>{{inst_cp|}} {{new_name|}}</p>
        <p class="fr-text--sm odv-rubrique" data-intitule="Type">{{equip_type_name}}</p>
        <a class="fr-link" href="/pages/fiche/?refine.equip_numero={{equip_numero}}">Fiche de l'équipement</a>
      </template>
    </dsfr-data-map-popup>
  </dsfr-data-map-layer>
  <dsfr-data-map-layer source="s-qpv-geo" type="geoshape" color="#CE614A"
    label="Quartiers prioritaires de la politique de la ville"></dsfr-data-map-layer>
</dsfr-data-map>
<dsfr-data-map-legend for="carte" label="Équipements sportifs et QPV"></dsfr-data-map-legend>

<!-- ── Ce que l'original n'a pas ───────────────────────────────────────── -->
<dsfr-data-a11y source="s-es-fam" table download filename="portrait-territoire.csv"></dsfr-data-a11y>
```

---

## 5. Limites et points durs identifiés

Classement selon les quatre verdicts de `_CIBLE-0.25.md`. La cible est **0.25.0**, pas la
version 0.20.0 épinglée par le dépôt.

### R1 — Un ratio dont le numérateur et le dénominateur viennent de deux jeux différents. **Manque réel.**

*Obstacle* : « Surface des bassins pour 10 000 habitants » = `sum(equip_bassin_surf)` sur
`data-es` **divisé par** `sum(population)` sur `insee-2020-geoapi-2023`. Idem pour les onze
lignes du tableau 8.3 et les deux du 8.4 : **treize indicateurs sur quarante** sont des
ratios inter-jeux.
*Voie prévue vérifiée, et insuffisante* : **#673** (jalon v0.24.0) donne
`value="<expr> / <expr>"` — mais le corps de l'issue est explicite, « chaque côté = grammaire
actuelle », c'est-à-dire `champ:fn` évalué **sur la source du KPI**. Un `dsfr-data-kpi` n'a
qu'un attribut `source` (référence relue). #673 couvre donc le KPI 3
(`count:equip_pmr_aire:true / count`, deux agrégats de `data-es`) et **pas** le KPI 4.
*Voie native essayée* : `<dsfr-data-join left="s-es" right="s-insee" on="new_code=code_geographique">`
puis `<dsfr-data-normalize compute="taux = surf / pop * 10000">` puis un KPI. Ça marche
**quand la maille de la jointure est la commune et que la sélection est une commune** (une
ligne de chaque côté). Ça cesse de marcher dès que la sélection en couvre plusieurs :
`compute` est **ligne à ligne** (JSDoc explicite, « hors périmètre : calculs sur valeurs
agrégées »), donc on obtient un taux par commune, et un KPI `taux:avg` donnerait la **moyenne
des taux communaux**, pas le taux du territoire. Il faudrait re-agréger après la jointure
(`<dsfr-data-query aggregate="surf:sum, pop:sum">` sans `group-by`, puis `compute`, puis KPI) :
chaîne plausible mais **non vérifiée**, et qui suppose de charger toutes les communes du
territoire (35 075 à France).
*Demande à formuler* : **un ratio dont les deux membres viennent de deux sources**. Forme
possible : `value="s-es:equip_bassin_surf:sum / s-insee:population:sum"`, ou un attribut
`denominator-source`. C'est le besoin structurel de toute page « pour 10 000 habitants »,
« par élève », « par km² » — c'est-à-dire de toute fiche de territoire.
*Où c'est déjà arrivé* : la page `/pages/education-equipement/` du même portail affiche
« élèves par équipement » = `annuaire-educ` / `data-es`. Deux pages sur deux.

### R2 — Le sélecteur à six mailles : rien pour changer le *champ* d'un filtre. **Manque réel.**

*Obstacle* : la page a six mailles ; chaque maille pose une colonne différente dans chacun des
quatre jeux (tableau du § 2, bloc 1). Poser une commune doit **retirer** l'EPCI, le bassin de
vie, le département et la région — c'est exactement ce que fait l'original, et c'est là qu'il
se trompe (défaut n° 8).
*Voie native essayée* : 24 `<dsfr-data-context-filter>` (4 jeux × 6 mailles), un `<select>` par
maille. Chaque filtre se vide tout seul quand son `ui` est vide (`clear()` vide l'UI puis
ré-émet). **Mais rien ne dit « ces six groupes de filtres sont mutuellement exclusifs »** :
`dsfr-data-context.clearAll()` (référence relue) vide **tous** les filtres du contexte, sans
sélection possible. Il faudrait donc, à chaque changement d'onglet, vider cinq `<select>` à la
main — du JavaScript de page, exactement ce que le banc cherche à éviter.
*Deux demandes distinctes en sortent* :
1. **Un filtre dont le champ dépend de la source** — aujourd'hui il faut une balise par jeu.
   Forme possible : `<dsfr-data-context-filter ui="sel" field-map="s-es:new_code | s-insee:code_geographique | s-qpv:code_insee | s-agg:installation_insee">`.
   Le motif « la même clé géographique ne porte pas le même nom dans deux jeux » est **la règle,
   pas l'exception**, en open data français.
2. **Un groupe de filtres exclusifs** (`group="maille"` ou `clearGroup()`), pour qu'un
   sélecteur de maille ne laisse pas de résidu. Sans lui, le défaut n° 8 de l'original est
   reproductible à l'identique par une transposition naïve.

### R3 — Un graphique n'est pas cliquable. **Manque réel** (avec substitut).

*Obstacle* : trois des quatre graphiques de la page sont des filtres croisés
(`refine-on-click-<contexte>-context-field`). C'est le geste que la page enseigne
explicitement (« Vous pouvez filtrer les équipements en cliquant sur les graphiques »).
*Vérifié au source* : `grep -rl "refine-on-click" packages/core/src` ne renvoie **qu'un
fichier**, `dsfr-data-map-layer.ts`. Sur la couche de carte, `refine-on-click`, `context`,
`label` et l'événement `dsfr-data-map-select` existent bien depuis 0.23.0 (JSDoc lu aux lignes
89-136 du fichier) même s'ils sont absents de `get_skill(dsfrDataMap,"reference")`.
`dsfr-data-chart` (référence relue attribut par attribut, 40 attributs) n'a **aucun**
gestionnaire de clic (`grep -n "onClick\|addEventListener('click'" dsfr-data-chart.ts` : rien)
et n'émet aucun événement de sélection.
*Substitut fonctionnel* : `<dsfr-data-facets context="ctx">` sur le même champ. Il donne les
mêmes valeurs et les mêmes comptes, il filtre **tout** le contexte (donc corrige le défaut n° 4
de l'original, où le clic ne touche pas les KPI), et il porte l'URL. Ce qu'on perd : le geste
« cliquer la barre », et la lecture simultanée de la distribution et du filtre.
*Demande à formuler* : `refine-on-click="champ"` + `context="id"` sur `dsfr-data-chart`,
sur le modèle exact de ce qui existe déjà sur `dsfr-data-map-layer` (#681) — l'infrastructure
de diffusion (`ContextFilterLike`, `whereKey`, tags, `url-sync`) est déjà là.

### R4 — Le libellé du territoire sélectionné n'est pas interpolable dans le texte. **Manque réel (mineur).**

*Obstacle* : la page écrit dix-sept fois `{{search.selection}}` — dans le H2, dans le
paragraphe des CSV, dans les noms de fichiers, dans les en-têtes de colonne des quatre
tableaux comparatifs.
*Voie native essayée* : `<dsfr-data-context-tags>` affiche les filtres actifs sous forme de
tags supprimables (`displayLabel()` / `displayValue()` existent sur le filtre). Mais aucun
composant ne rend **la valeur d'un filtre dans du texte courant**, ni ne la passe à un
`filename` de `dsfr-data-a11y`.
*Contournement* : `dsfr-data-display` avec un `<template>` sur une source d'une ligne qui
porte le libellé du territoire — coûte une requête de plus pour afficher un mot.
*Demande* : un composant ou un attribut « valeur courante d'un filtre de contexte », à la
`<dsfr-data-context-value for="ctx" field="new_code" show="label">`.

### R5 — Pas d'échelle logarithmique sur un graphique. **Manque réel.**

*Obstacle* : « Type de propriétaires (bâti) » va de 235 631 (Commune) à 168 (Autre), soit
**trois ordres de grandeur** ; en échelle linéaire, onze barres sur douze sont invisibles.
L'original pose `logarithmic="true"` sur `<ods-chart>` et l'axe rendu est bien
100 / 1k / 10k / 100k / 1M (relevé à l'écran).
*Voie native essayée* : la référence de `dsfr-data-chart` ne porte que `y-min`, `y-max`,
`x-min`, `x-max` — aucune échelle. Rien non plus dans `dsfrChartNative`.
*Contournement* : `dsfr-data-podium` (classement à barres proportionnelles) ou un tableau —
mais ce n'est plus le même objet.
⚠️ **À trancher avant dépôt** : une échelle d'axe relève probablement de **DSFR Chart**
(`GouvernementFR/dsfr-chart`) et non de `dsfr-data` — règle n° 4 du lot 11. À vérifier dans
`dsfr-chart` avant d'ouvrir une issue ici.

### R6 — Pas de couleur par catégorie sur un graphique. **Manque réel.**

*Obstacle* : les deux camemberts et le top 15 posent des couleurs **par valeur** (30 entrées
pour les familles, 12 pour les propriétaires, 7 pour la densité). Le sens est porté par la
couleur : le vert des sports de nature, le dégradé vert→rouge de la grille de densité INSEE.
*Voie native essayée* : `dsfr-data-chart` n'a que `selected-palette` (une palette ordinale).
`color-map="valeur:#hex, …"` existe sur `dsfr-data-map-layer` — donc la grammaire existe déjà
dans la bibliothèque, mais pas sur le graphique.
*Conséquence si on l'ignore* : la couleur d'une catégorie change dès que son rang change,
c'est-à-dire à chaque changement de territoire. Sur une page qui compare deux territoires,
c'est disqualifiant.
*Demande* : `color-map` sur `dsfr-data-chart`, même grammaire que sur la couche de carte.

### R7 — Charger tout `data-es` côté client. **Prévu, v0.25.0 (#689).**

*Obstacle* : 333 611 lignes. `max-records` vaut 1 000 par défaut sur l'adaptateur ODS et
**tronque en silence** ; le relever ne suffit pas, l'API refuse `offset+limit > 10 000`.
*Prévu* : `fetch-mode="export"` (#689, épic #699) charge par `/exports/json` en une requête.
*Mais ici la question ne se pose presque pas* : la page est **entièrement agrégée côté
serveur**. Le seul bloc qui a besoin de lignes est la carte, et elle se règle par `bbox` +
`cluster` (§ 4.2). C'est un point à noter dans la synthèse : **quand la page est un tableau de
bord d'agrégats, le mur des 10 000 offsets ne la concerne pas** — l'agrégation serveur est la
bonne architecture, et `group-by` multi-champs la rend bon marché.

### R8 — Aucune requête avant qu'un territoire soit choisi. **Prévu, v0.25.0 (#690).**

L'original dépense **71 requêtes et 6,4 s** pour afficher un « portrait de la France » que
personne n'a demandé, avant même que l'utilisateur ait tapé un caractère. `require-where`
(#690, épic #700) rend exactement le bon comportement : état `idle`, message DSFR
« Choisissez un territoire », zéro requête. **Cette page est le cas d'école du motif** — plus
encore que les cartes à gros volume qui l'ont motivé, parce qu'ici l'état initial n'est pas
seulement coûteux, il est **trompeur** (il ressemble à un résultat).
Nuance à remonter à l'issue : ici l'état « France entière » **est** une valeur légitime du
sélecteur. Il faudrait donc pouvoir distinguer « aucun filtre posé » (idle) de « filtre posé à
la valeur vide » (France entière, requête légitime). Non traité par le libellé actuel de #690.

### R9 — `count(distinct …)` et les agrégats conditionnels. **Prévu, v0.24.0 (#672, #671, #673, #674).**

Les piscines et patinoires (`count(distinct inst_numero)`) passent aujourd'hui par le `select`
ODSQL brut de la source (`select="count(distinct inst_numero) as t" limit="1"`, vérifié à
l'API : 2 978 et 141) ; l'agrégat `distinct` de la grammaire commune arrive en #672. Les huit
lignes de « Profil et carences » (`count(zrr)` où `zrr like 'zrr'`) se ramènent à un
`group-by` multi-champs sans attendre quoi que ce soit. Rien de dur ici.

### Non-limites, à ne pas confondre

- **Les 64 agrégats.** Ils se ramènent à ~10 sources par `group-by` multi-champs (motif établi
  à la fiche id 13 : 21 agrégats → 9 sources, 961 ms en parallèle contre 3 814 ms en série).
  Le nombre d'allers-retours de l'original (71 au chargement, 87 après filtre) n'est pas une
  fatalité du sujet : c'est le modèle ODS « un agrégat = une directive = une requête ».
- **Les bulles agrégées serveur à l'échelle nationale.** Écart assumé, déjà tranché à la
  fiche id 13 § L2 : `bbox` + `cluster` sert le besoin (*où* sont les équipements), et le
  chiffre national est donné par le KPI.
- **Les outils de dessin et le géocodeur.** Fonctionnalités d'ODS, remplacées par des facettes
  géographiques partageables. Pas des manques de `dsfr-data`.

---

## 6. Données à reproduire fidèlement

- [ ] **Les six mailles** : Commune (35 084 référentiel), EPCI (1 360), Bassin de vie (1 707),
      Département (109), Région (18), France — avec, pour chacune, **la bonne colonne pivot dans
      chacun des quatre jeux** (tableau du § 2, bloc 1). C'est le test de fidélité principal.
- [ ] **Les quatre KPI**, France : 333 611 / 29 452 / 51,90 % / 234,5 m². Rennes (`new_code`
      35238) : 396 / 58 / 77,53 % / 145,6 m².
- [ ] **Les quatre tableaux d'indicateurs**, avec les 40 valeurs du § 2 bloc 8 — dont
      population 68 029 342, surface 638 529 km² (**`surface` est en hectares, diviser par 100**),
      densité 107, QPV 1 584, ZRR 2 145 / 1 200 874, ZFRR 16 870 / 11 293 417, CRTE 26 623,
      Montagne 5 593, VAS 1 032, proximité 36 803, structurants 88 769.
- [ ] **Les quatre graphiques** : top 15 des familles (42 135 en tête), 12 propriétaires en
      échelle log (235 631 → 168), 7 classes de densité (81 098 en tête), top 15 des APS
      (62 640 en tête). **Et les groupes `null` : 3 349 sur `dens_lib`, 3 147 sur
      `equip_prop_type`** — que l'original masque et qu'une transposition doit nommer.
- [ ] **La carte** : 331 868 équipements géolocalisés (1 743 sans coordonnées), infobulle à
      7 champs + lien vers `/pages/fiche/`, couche QPV en surimpression, **cadrée sur la France**.
- [ ] **Les deux tableaux d'ancienneté** — avec **la mention, absente de l'original, que
      `data-es-agregation` ne couvre que 20 325 équipements sur 333 611** (défaut n° 1). Sans
      cette mention, reproduire ces tableaux revient à reproduire une erreur.
- [ ] **Le comparatif** : deux territoires côte à côte, plus la comparaison à la strate de
      densité (Rennes vs Grands centres urbains : 396 / 66 334, 222 485 / 25 628 703 hab).
- [ ] **Les deux exports CSV** : la liste à 10 colonnes et la liste à 104 colonnes.

### À corriger par rapport à l'original (et à dire dans l'analyse de la page)

1. Dire que les tableaux d'ancienneté portent sur 6,1 % du parc, ou les retirer.
2. Ne plus afficher « déclarées (%) » quand il n'y a rien à déclarer.
3. Calculer un âge, pas une année à deux chiffres.
4. Brancher les KPI et les tableaux sur le même filtre que les graphiques.
5. Dériver les légendes des données rendues, jamais les écrire à la main.
6. Nommer les groupes `null` (`empty-label`) au lieu de les faire disparaître.
7. Effacer le refine QPV sur `code_epci` en revenant à France (défaut n° 8).
8. Activer `url-sync` : une fiche de territoire doit se citer.
9. Cadrer la carte sur la France.
10. Afficher le taux d'ouverture aux clubs (19,3 %) au lieu du libellé « non ouvert ».
11. Un format de nombre unique (`fr-FR`, décimales décidées par indicateur).
12. Ajouter `dsfr-data-a11y` : l'original n'offre aucune alternative non graphique.
