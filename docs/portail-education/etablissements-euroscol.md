# Établissements labellisés Euroscol

- **URL du catalogue** (entrée n° 10) : https://data.education.gouv.fr/explore/dataset/fr-en-etablissements-labellises-euroscol/carte-personnalisee/
  → **302** vers `https://data.education.gouv.fr/explore/assets/fr-en-etablissements-labellises-euroscol/` (page d'actif du jeu).
- **URL réelle de la dataviz** :
  **`https://data.education.gouv.fr/explore/assets/visualisation-fr-en-etablissements-labellises-euroscol/view/`**
  (lien « Cet actif a été lié à l'actif suivant : … - Visualization » en tête de la description du jeu).
- **Id catalogue** : 10 · **Thématique** : Éducation · **Sous-thématique** : aucune · **Filtre** : aucun.
- **Nature de la cible** : **vue personnalisée ODS héritée** (« custom view »), **pas** une
  page Studio ni une page `/pages/`. Comme pour l'annuaire des BDE, **son slug de vue n'est
  pas `custom`** mais **`carte-personnalisee`** (`custom_view_slug`), d'où l'URL de
  catalogue. Configuration récupérée à
  `https://data.education.gouv.fr/explore/embed/dataset/fr-en-etablissements-labellises-euroscol/carte-personnalisee/`
  (attribut `ctx-dataset-schema`, **ne redirige pas** ; les slugs `custom` et `carte`
  renvoient 404 sur ce jeu). Archivée dans
  `docs/portail-education/_sources/fr-en-etablissements-labellises-euroscol.customview.json`.
  `custom_view_title` = « **Carte personnalisée** », **pas de `custom_view_css`**.
- **Différence majeure avec les trois autres cibles du lot** : **c'est la seule dont le
  visualiseur d'actif rend la colonne de facettes du back-office** — 13 facettes à gauche,
  la carte à droite. Les trois autres n'affichent que la carte.
- **Relevé visuel** : 2026-09-10, Chrome (extension), viewport 1568 × 751.

## Jeu de données

`fr-en-etablissements-labellises-euroscol` — **1 672 lignes**, 22 champs,
`visibility: domain`, Licence Ouverte v2.0 (Etalab), producteur **DREIC — Ministère de
l'éducation nationale**, données modifiées le 2026-02-02.

| Champ | Type | Libellé au schéma | Remarque mesurée |
|---|---|---|---|
| `academie` | text | `Academie` | **30 valeurs** |
| `rne` | text | `RNE` | **1 672 valeurs distinctes = une par ligne** |
| `niveau_etablissement` | text | `Niveau_etablissement` | **15 valeurs** |
| `niveau_etablissement_simplifie` | text | `Niveau_etablissement_simplifie` | **5 valeurs** — pilote la couleur |
| `nom_etablissement` | text | `Nom_etablissement` | titre de l'infobulle |
| `adresse` | text | `Adresse` | 1 652 / 1 672 renseignées — **jamais affichée** |
| `code_postal` | text | `code_postal` | **1 198 valeurs** |
| `ville` | text | `ville` | **924 valeurs** |
| `telephone` | text | `telephone` | 1 657 renseignés — **jamais affiché** |
| `mail` | text | `mail` | 1 658 renseignés — **jamais affiché** |
| `caracteristiques_du_choix_de_cet_etablissement` | text | — | **100 % nulle** (0 valeur sur 1 672) |
| `latitude` / `longitude` | double | — | doublons de `position` |
| `position` | geo_point_2d | `position` | **0 nulle** — les 1 672 points sont cartographiables |
| `code_region_2016` / `libelle_region_2016` | int / text | `Code_region` / `Libelle_region` | **18 valeurs** |
| `section_binationale` | **int** | — | 1 → **78** · 0 → 1 594 |
| `section_europeenne_orientale` | **int** | — | 1 → **573** · 0 → 1 099 |
| `section_internationale` | **int** | — | 1 → **92** · 0 → 1 580 |
| `lycee_metiers` | **int** | — | 1 → **219** · 0 → 1 453 |
| `rep` | **int** | `REP` | 1 → **110** · 0 → 1 562 |
| `rep_plus` | **int** | `REP_plus` | 1 → **65** · 0 → 1 607 |

Les six drapeaux sont typés **`int`** (0/1), et le template les compare à la **chaîne**
`'1'` (`record.fields.rep=='1'`). En AngularJS `1 == '1'` est vrai (égalité lâche JS),
donc ça marche — **vérifié à l'écran** : le rendu « non » en rouge s'affiche bien pour un
établissement à 0. C'est fragile, pas cassé.

### Répartitions (relevées à l'API et recoupées à l'écran)

**`niveau_etablissement_simplifie` — 5 valeurs** (les compteurs de la facette, à l'écran,
correspondent exactement) : Lycée **782** · Collège **466** · Ecole **410** ·
**Autre 7** · **EREA 7**.

**`niveau_etablissement` — 15 valeurs** : Collège 466 · Lycée polyvalent 256 ·
Lycée professionnel 230 · Lycée général et technologique 227 · École primaire 214 ·
École élémentaire 136 · École maternelle 60 · Lycée général 51 ·
Section d'enseignement professionnel 8 · EREA 7 · Autre 5 · Lycée technologique 5 ·
Lycée autre 3 · Section d'enseignement général et technologique 2 ·
**Service administratif 2**.

**`academie` — 30 valeurs** : Lille 149 · Nantes 132 · Normandie 116 · Versailles 116 ·
Orléans-Tours 110 · Poitiers 102 · Amiens 78 · Paris 77 · Rennes 76 · Nancy-Metz 73 ·
Créteil 71 · Bordeaux 62 · Grenoble 61 · Toulouse 55 · Aix-Marseille 54 · Nice 47 ·
Montpellier 46 · Reims 43 · Limoges 36 · Dijon 27 · La Réunion 27 · Lyon 23 ·
Strasbourg 20 · Clermont-Ferrand 16 · Martinique 16 · Corse 15 · Besançon 13 ·
Guadeloupe 5 · Guyane 5 · Mayotte 1.

**`libelle_region_2016` — 18 valeurs** : Ile-de-France 264 · Hauts-de-France 227 ·
Nouvelle-Aquitaine 200 · Grand Est 136 · Pays de la Loire 132 · Normandie 116 ·
Centre-Val de Loire 110 · Occitanie 101 · Provence-Alpes-Côte d'Azur 101 ·
Auvergne-Rhône-Alpes 100 · Bretagne 76 · Bourgogne-Franche-Comté 40 · La Réunion 27 ·
Martinique 16 · Corse 15 · Guadeloupe 5 · Guyane 5 · Mayotte 1.

**Facettes déclarées au back-office** (13, dans l'ordre) : `academie` (disj.), `rne` (disj.),
`code_postal` (disj., **`facetsort: "-count"`**), `ville` (disj.),
`niveau_etablissement` (disj.), `niveau_etablissement_simplifie`, `libelle_region_2016`,
`section_binationale`, `section_europeenne_orientale`, `section_internationale`,
`lycee_metiers`, `rep`, `rep_plus`.

**Poids mesuré** (`/exports/json?limit=-1`, gzip) : **185 Ko en 0,20 s**.

## Objectif de la dataviz et informations véhiculées

- **Question** : « Quels établissements portent le label Euroscol, où, à quel niveau, et
  quelles autres dimensions européennes ou internationales portent-ils déjà ? »
- **Message porté** : le label est massivement **secondaire** (782 lycées + 466 collèges
  contre 410 écoles), très inégalement réparti (Lille 149 contre Mayotte 1), et il se
  superpose souvent à une **section européenne ou de langues orientales** (573 des 1 672,
  soit 34 %) — beaucoup plus rarement à une section internationale (92) ou binationale (78).
- **Ce que l'utilisateur doit obtenir** : repérer les établissements labellisés autour de
  chez lui, savoir de quel niveau ils sont, et lire les six drapeaux
  (binationale / européenne-orientale / internationale / lycée des métiers / REP / REP+).
- **Ce qui n'est pas dans l'objet** :
  - **aucune information de contact**, alors que `mail` (1 658), `telephone` (1 657) et
    `adresse` (1 652) sont dans le jeu et **jamais affichés**. C'est l'exact inverse de
    l'annuaire des BDE (fiche voisine), qui n'a que du contact ;
  - **aucun compteur juste** : le seul affiché (« 1672 records ») ne se met jamais à jour ;
  - **aucune date de labellisation**, aucune promotion, aucune langue enseignée ;
  - aucun graphique, aucun KPI, aucun tableau, aucun total.

## Relevé visuel exhaustif, bloc par bloc

### 0. Chrome de page

En-tête DSFR, menu horizontal, fil d'Ariane « Catalogue › Visualisation - Établisse… ›
**Consultation** ». H1 « **Visualisation - Établissements labellisés Euroscol** ». Icône
signet. Bulle de chat magenta. Titre du bloc en **bleu marine, centré, très gros** :
« **Localisation des établissements labellisés Euroscol** ».

### 1. Colonne de gauche — le compteur et les 13 facettes

C'est le visualiseur d'actif qui la rend (`asset_content_configuration.facets`), pas la
vue. Relevée à l'écran, de haut en bas :

1. **Pavé magenta « 1672 records »** (en anglais).
2. Texte « **No active filters** » (en anglais).
3. **Bouton magenta « Filtres »** (en français).
4. Champ de recherche libre + bouton « **Envoyer** ».
5. Les 13 facettes, avec **compteur à gauche de la valeur**, six valeurs visibles puis
   « **Plus** » :

| Facette (libellé affiché = **libellé du schéma, brut**) | Six premières valeurs vues |
|---|---|
| **Academie** | Lille 149 · Nantes 132 · Normandie 116 · Versailles 116 · Orléans-Tours 110 · Poitiers 102 |
| **RNE** | 0010010F 1 · 0011282N 1 · 0020014E 1 · 0020024R 1 · 0020034B 1 · 0020046P 1 |
| **code_postal** | 62100 30 · 06000 14 · 75016 9 · 59140 8 · 75017 8 · 02100 7 |
| **ville** | Calais 33 · Nice 20 · Dunkerque 18 · Nantes 17 · Bordeaux 13 · Lille 13 |
| **Niveau_etablissement** | Collège 466 · Lycée polyvalent 256 · Lycée professionnel 230 · Lycée général et technologique 227 · École primaire 214 · École élémentaire 136 |
| **Niveau_etablissement_simplifie** | Lycée 782 · Collège 466 · Ecole 410 · **Autre 7** · **EREA 7** (5 valeurs, pas de « Plus ») |
| **Libelle_region** | Ile-de-France 264 · Hauts-de-France 227 · Nouvelle-Aquitaine 200 · Grand Est 136 · Pays de la Loire 132 · Normandie 116 |
| **section_binationale** | **0** 1 594 · **1** 78 |
| **section_europeenne_orientale** | **0** 1 099 · **1** 573 |
| **section_internationale** | **0** 1 580 · **1** 92 |
| **lycee_metiers** | **0** 1 453 · **1** 219 |
| **REP** | **0** 1 562 · **1** 110 |
| **REP_plus** | **0** 1 607 · **1** 65 |

Les libellés viennent du champ `label` du schéma, jamais surchargés : d'où
« **Academie** » sans accent, « **Niveau_etablissement_simplifie** » avec des
underscores, « **code_postal** » et « **ville** » en minuscules, « **REP_plus** ».

### 2. La carte

```html
<ods-map basemap="jawg.streets" display-control="true" display-control-single-layer="true"
  location="5,47.88688,-1.97754" no-refit="true" scroll-wheel-zoom="true"
  search-box="false" toolbar-fullscreen="true" toolbar-geolocation="true">
  <ods-map-layer-group>
    <ods-map-layer context="ctx" display="categories"
      color-by-field="niveau_etablissement_simplifie"
      color-categories="{'Lycée':'#BA022A','Collège':'#19630A','Ecole':'#0B72B5','EREA':'#F8B334'}"
      color-categories-other="#000000"
      color-numeric-range-min="-21.338485834093113"
      caption="true" caption-picto-color="#E5E5E5" picto="dot"
      point-opacity="1" shape-opacity="0.5" show-marker="false" size="6"
      show-zoom-min="5" show-zoom-max="22"
      description="Le label « Euroscol » vise à reconnaître la mobilisation des écoles et
        des établissements scolaires publics ou privés sous contrat s'inscrivant dans une
        dynamique européenne"
      title="Établissements labellisés Euroscol">
```

- **Moteur Leaflet**, fond **IGN** à l'écran (« Leaflet | Powered by Huwise - Map data ©
  IGN ») **alors que le template demande `basemap="jawg.streets"`** : le portail impose son
  fond, le paramètre est ignoré.
- **`location="5,47.88688,-1.97754"` + `no-refit="true"`** : zoom 5, centre 47,89 °N /
  1,98 °O (au large de la Bretagne sud). À l'écran, la métropole occupe la moitié droite du
  cadre, la moitié gauche est de l'océan. **Aucun DROM n'est visible à l'ouverture** —
  La Réunion (27), Martinique (16), Guadeloupe (5), Guyane (5), Mayotte (1) : 54
  établissements hors cadre.
- **Contrôles observés** : plein écran, trois outils de dessin (polygone / rectangle /
  cercle, avec les libellés « Dessiner un polygone pour filtrer », etc.) + modifier /
  effacer, `+` / `−`, loupe, géolocalisation, sélecteur de fond.
- **`picto="dot" size="6"` + `show-marker="false"`** : des pastilles rondes pleines, pas
  d'épingle. **Pas de clustering** (`display="categories"` dessine chaque point).
- **`color-numeric-range-min="-21.338…"`** : résidu d'un réglage de coloration numérique,
  sans effet sur une couche `display="categories"`.

#### Le bandeau de troncature — vu à l'écran, et important

> ⚠️ **« Certaines couches sont affichées partiellement pour des raisons de performance.
> Essayez de zoomer. »**

Affiché au chargement, **sur 1 672 points**. Il disparaît dès qu'un filtre réduit
suffisamment le jeu (vérifié : avec `Academie = Lille`, 149 points, plus de bandeau).
**À retenir pour la transposition : ODS tronque lui-même ici, sous le seuil de 5 000 de
`dsfr-data-map-layer`.** Ce n'est donc pas un terrain où l'original serait supérieur.

#### Encart de description, superposé

Un panneau blanc en haut à droite reprend `title` + `description` de la couche :
« **Établissements labellisés Euroscol** / Le label « Euroscol » vise à reconnaître la
mobilisation des écoles et des établissements scolaires publics ou privés s'inscrivant
dans une dynamique européenne ». **Il est tronqué à mi-phrase** et **recouvert par la
légende** qui s'affiche juste en dessous, plus large.

#### Légende (`caption="true"`, générée par ODS)

Titre « **Établissements labellisés Euroscol** », sous-titre
« **Niveau_etablissement_simplifie** » (**le nom brut du champ, underscores compris**),
puis cinq entrées relevées mot pour mot :

| Pastille | Libellé |
|---|---|
| `#BA022A` rouge | Lycée |
| `#19630A` vert | Collège |
| `#0B72B5` bleu | Ecole |
| `#F8B334` jaune | EREA |
| `#000000` noir | ***Autres*** (en **italique**) |

La cinquième entrée est `color-categories-other`. Elle regroupe la valeur **`Autre`
(7 établissements)** — dont les 2 « Service administratif ».

### 3. L'infobulle

Rendue au clic, en `<ul>` sans puces. **Elle est plus haute que la popup et défile en
interne** — les six drapeaux ne sont pas visibles sans scroller (vérifié). Relevée mot
pour mot sur un EREA, en deux temps :

```
Etablissement régional d'enseignement adapté Antoine de Saint-Exupéry
Code UAI : 0620229M
Académie : Lille
Ville : Berck
                                                 ← ligne vide (<br/>)
Niveau : EREA
Présence d'une section binationale : non         ← « non » en ROUGE
Présence d'une section européenne ou de langues orientales : non
Présence d'une section internationale : non
Label lycée des métiers : non
Adhérent à un REP : non
Adhérent à un REP PLUS : non
```

- Le titre est `nom_etablissement | limitTo:100`. **Ici il vaut littéralement
  « Etablissement … »** sans accent : c'est la donnée.
- Les six drapeaux passent par la même expression :
  `<span style="color: {{champ=='1' ? 'green' : 'red'}}">{{champ=='1' ? 'oui' : 'non'}}</span>`.
  **L'information « oui / non » est portée par le mot ET par la couleur** — donc
  redondante, ce qui est correct au regard du RGAA 1.4. Mais le rouge est appliqué au
  **cas négatif banal** (1 594 « non » sur `section_binationale`), ce qui donne une
  infobulle presque entièrement rouge pour la grande majorité des établissements : la
  couleur signale un manque là où il n'y a rien à signaler.
- Tailles de police forcées en ligne (`font-size:12px` sur le `<li>`, `15px` sur les
  `<span>` internes) : le `<li>` est vide de texte, seuls les `<span>` comptent. Reste que
  la page fixe des tailles en pixels, hors échelle DSFR.
- **`niveau_etablissement`** (15 valeurs) est affiché en « Niveau », tandis que la couleur
  suit **`niveau_etablissement_simplifie`** (5 valeurs). Les deux ne sont jamais mis en
  regard.

### 4. Interaction observée : un filtre de facette

Clic sur « **Lille** » (facette Academie) :

- une zone « **Filtres actifs** » apparaît : pilule « Academie » + « Lille », et un lien
  « **⊘ Tout effacer** » ;
- **les autres facettes se recalculent** : `RNE` ne liste plus que des UAI 059… ;
  `code_postal` passe à 62100 30 · 59140 8 · 59000 5 · 59240 4 · 59203 3 · 59210 3 ;
  `ville` à Calais 33 · Dunkerque 18 · Lille 13 · Roubaix 4 · Tourcoing 4 · Bondues 3 ;
  `Niveau_etablissement_simplifie` à Ecole 63 · Lycée 51 · Collège 33 · EREA 2
  (**« Autre » disparaît**) ; `Libelle_region` à Hauts-de-France 149 ; les six drapeaux à
  5/144, 35/114, 8/141, 6/143, 14/135, 23/126 ;
- la carte ne garde que 149 points, **sans se recadrer** (`no-refit="true"` — les points
  restent un amas minuscule au nord) ;
- **le bandeau de troncature disparaît** ;
- **et « 1672 records » ne bouge pas.** Voir Défauts n° 1.
- **La facette `Academie` ne conserve pas ses autres valeurs** après sélection (seul
  « Lille 149 » reste), alors que la configuration la déclare `disjunctive: true`.
  Observé, non expliqué.

## Défauts et bizarreries de l'original

1. **Le compteur ment en permanence.** « **1672 records** » reste affiché quel que soit le
   filtre — avec `Academie = Lille` (149 établissements dans les facettes, 149 points sur
   la carte), le pavé magenta continue d'annoncer 1 672. Et le texte « **No active
   filters** » juste en dessous reste affiché **alors que le bloc « Filtres actifs :
   Academie Lille » est visible trois lignes plus bas**. Deux indicateurs figés qui
   contredisent l'état réel de la page : c'est le défaut n° 1.
2. **Trois chaînes non traduites** en haut de la colonne : « **records** », « **No active
   filters** », à côté d'un bouton « Filtres » et d'un bouton « Envoyer » en français.
3. **Une facette à 1 672 valeurs uniques.** `RNE` est facetté : la colonne affiche six
   codes UAI, chacun avec le compteur **1**, puis « Plus ». Une facette dont chaque valeur
   ne sélectionne qu'un enregistrement n'est pas un filtre, c'est un annuaire déguisé — et
   elle occupe la deuxième place de la colonne, devant `ville`.
4. **Six facettes booléennes affichées « 0 » et « 1 ».** `section_binationale : 0 (1 594) /
   1 (78)`. Aucun libellé « Oui / Non », alors que l'infobulle, elle, traduit.
5. **Libellés de facettes bruts** : « Academie » (sans accent),
   « Niveau_etablissement_simplifie », « code_postal », « ville », « Libelle_region »,
   « REP_plus ». Le schéma n'a jamais été nettoyé et rien ne le surcharge.
6. **Le sous-titre de la légende affiche le nom du champ** : « Niveau_etablissement_simplifie ».
7. **`code_postal` est trié `facetsort: "-count"`** dans la configuration ; à l'écran il
   sort bien par effectif décroissant (62100 30 en tête). *(À rapprocher du piège PG-012 du
   dépôt : dans `dsfr-data-facets`, `sort="-count"` trie à l'envers d'ODS. La grammaire à
   écrire ici est `count:desc`, qui est le défaut — donc rien à écrire.)*
8. **La carte s'ouvre décentrée sur l'océan.** `location="5,47.89,-1.98"` place le centre
   au large de la Bretagne : la moitié gauche du cadre est de l'eau, et **aucun DROM n'est
   visible** (54 établissements). Défaut symétrique de celui des internats et des BDE
   (planisphère) — même sujet, trois arbitrages ratés de trois façons différentes.
9. **ODS tronque la couche à 1 672 points** et affiche « Certaines couches sont affichées
   partiellement pour des raisons de performance. Essayez de zoomer. » — mais **zoomer ne
   charge rien de plus** tant que le filtre ne change pas. Le message oriente vers une
   action inefficace. (Exactement le piège PG-013 du dépôt, ici du côté d'ODS.)
10. **L'encart de description recouvre / est recouvert par la légende**, et son texte est
    coupé en plein milieu (« … des établissements … » puis rien).
11. **`caracteristiques_du_choix_de_cet_etablissement` est une colonne 100 % vide** :
    0 valeur sur 1 672. Elle est au schéma, elle n'a jamais été alimentée.
12. **Contact absent alors qu'il est dans le jeu.** `mail` (1 658), `telephone` (1 657),
    `adresse` (1 652) ne sont **jamais** affichés. Pour un objet dont l'usage naturel est
    « je veux inscrire mon enfant / monter un projet avec eux », c'est le manque le plus
    coûteux — d'autant que le portail publie à côté un annuaire (les BDE) qui, lui, ne
    fait *que* du contact.
13. **Tout est rouge dans l'infobulle.** Le « non » du cas banal est peint en rouge : un
    établissement sans aucune des six caractéristiques (le cas le plus fréquent) affiche
    six lignes rouges, comme un bilan d'échec.
14. **L'infobulle déborde et défile en interne** : les six drapeaux, qui sont l'apport de
    la page, sont sous la ligne de flottaison de la popup.
15. **« Autres » en italique dans la légende** pour une catégorie qui a un nom dans la
    donnée (`Autre`, 7 établissements, dont 2 « Service administratif »). Le lecteur ne
    peut pas savoir ce qu'il y a dedans.
16. **Deux niveaux de nomenclature jamais mis en regard** : la couleur suit les 5 valeurs
    simplifiées, l'infobulle affiche les 15 détaillées.
17. **`latitude` et `longitude` doublonnent `position`** dans le schéma.
18. **`basemap="jawg.streets"` est ignoré** par le portail (fond IGN rendu).
19. **Aucune synchronisation d'URL**, aucun tableau, aucun total, aucun export.
20. **Bulle de chat par-dessus la carte**, en permanence.

## Transposition vers `dsfr-data`

### Architecture retenue et pourquoi

**1 672 lignes, 185 Ko gzip en 0,20 s.** Un `dsfr-data-source` en mode URL générique sur
`/exports/json`, sans `select`, tout côté client. **Invoquer une limite de performance ici
serait faux** — et il faut ajouter que **l'original, lui, tronque déjà à ce volume** : la
transposition affiche les 1 672 points, l'original non.

`max-items` par défaut vaut 5 000 : 1 672 passe. Le poser explicitement reste la bonne
habitude (PG-013), mais ce n'est pas nécessaire ici.

**Pas besoin de `server-facets`** : le jeu déclare bien ses 13 facettes au back-office,
mais 1 672 lignes tiennent en mémoire, et le mode client donne la cascade exacte et les
compteurs (que l'original affiche déjà, contrairement aux internats).

### Le nœud de la transposition : six drapeaux `int` à traduire

C'est le seul vrai travail de cette cible. Trois besoins distincts :

| Besoin | Voie native |
|---|---|
| **Facette** « Oui / Non » au lieu de « 1 / 0 » | `dsfr-data-normalize replace-fields` — **mais il ne marchera pas ici** : lu dans la source, il ne s'applique qu'aux valeurs déjà `string`. Voir Limites n° 1, c'est le point dur de cette fiche |
| **Infobulle** « oui » / « non » | idem — dépend du point précédent |
| **Couleur** verte/rouge sur le mot | `data-v="{{champ}}"` interpolé dans un attribut, puis CSS `[data-v="1"] { color: … }` — le motif AM-039 du dépôt (pas de conditionnelle dans les templates). Mais **on ne veut pas reproduire** le rouge sur le cas banal : voir Limites n° 3 |

**⚠️ Vérification faite avant d'écrire l'esquisse** (règle « lire le JSDoc de l'attribut,
pas seulement la fiche du composant ») — deux choses que la fiche du composant ne dit pas :

1. **Le séparateur d'entrées de `replace-fields` est le `|`, pas la virgule.** JSDoc
   verbatim : `/** Remplacement cible par champ. Format: "CHAMP:pattern:remplacement | CHAMP2:p:r" */`,
   et `_parseReplaceFields` fait `attr.split('|')`. Une virgule produirait **zéro
   remplacement, sans erreur** — exactement PG-022.
2. **`replace-fields` ne touche que les valeurs de type `string`.**
   `_normalizeRow`, étape 3a :
   ```ts
   if (replaceFieldsMap.size > 0 && typeof normalizedValue === 'string') { … }
   ```
   Les six drapeaux d'Euroscol sont typés **`int`** au schéma et arrivent en `number` dans
   le JSON. **`replace-fields` est donc silencieusement sans effet sur eux.**

### Correspondance bloc à bloc

| Directive ODS / bloc du visualiseur | Composant + attributs `dsfr-data` |
|---|---|
| `ctx` du visualiseur d'actif | `<dsfr-data-source id="euro" url="…/fr-en-etablissements-labellises-euroscol/exports/json">` |
| six champs `int` 0/1 | **pas de voie déclarative de conversion** (voir Limites n° 1). On laisse `1`/`0` dans la donnée et on ne les traduit **qu'à l'affichage**, par le motif `data-v` + CSS (AM-039) — ce que fait l'esquisse |
| colonne de 13 facettes du back-office | `<dsfr-data-facets id="euro-f" source="euro-q" fields="…" labels="…" display="…" searchable="…" disjunctive="…">` |
| libellés bruts du schéma (`Academie`, `Niveau_etablissement_simplifie`…) | `labels="academie:Académie \| niveau_etablissement_simplifie:Niveau (simplifié) \| niveau_etablissement:Niveau détaillé \| libelle_region_2016:Région \| code_postal:Code postal \| ville:Commune \| section_binationale:Section binationale \| … \| rep_plus:REP+"` — séparateur **`\|`** (PG-022) |
| facette `rne` (1 672 valeurs uniques) | **ne pas la transposer.** À la place : `<dsfr-data-search fields="nom_etablissement, ville, rne">` |
| `facetsort: alphanum` (5 facettes) | `sort="alpha:asc"` (le défaut est `count:desc`) — **arbitrage** : les compteurs sont plus utiles, on garde `count:desc` sauf pour `ville` et `code_postal` |
| `facetsort: "-count"` sur `code_postal` | **ne rien écrire** : `count:desc` est le défaut. Ne **jamais** écrire `-count`, qui trie à l'envers dans `dsfr-data` (PG-012) |
| `disjunctive: true` (5 facettes) | `disjunctive="academie, code_postal, ville, niveau_etablissement"` |
| compteur « 1672 records » figé | `<dsfr-data-kpi source="euro-f" value="count" format="nombre" label="établissements labellisés">` — **il suit le filtre**, contrairement à l'original |
| « No active filters » / « Filtres actifs » | `<dsfr-data-context-tags>` (ou le bouton « Réinitialiser les filtres » natif des facettes) |
| champ de recherche libre + « Envoyer » | `<dsfr-data-search operator="words" count>` (filtre à la frappe, pas de bouton) |
| `<ods-map location="5,47.89,-1.98" no-refit="true">` | `<dsfr-data-map center="46.55,2.5" zoom="5" fit-bounds fit-zone="41,-5.5,51.5,10" fit-max-zoom="12" insets="drom">` — on **corrige** le cadrage (défaut n° 8) |
| `basemap="jawg.streets"` (ignoré par le portail) | `tiles="ign-plan"` + `tiles-style="muted"` (#686 — atténuation native ; remplace la classe `odv-fond-attenue` d'AM-017) |
| `display="categories"` + `color-by-field` | `<dsfr-data-map-layer type="circle" radius="6" color-field="niveau_etablissement_simplifie">` |
| `color-categories="{'Lycée':'#BA022A','Collège':'#19630A','Ecole':'#0B72B5','EREA':'#F8B334'}"` | `color-map="Lycée:#BA022A,Collège:#19630A,Ecole:#0B72B5,EREA:#F8B334"` — grammaire `valeur:#hex` séparée par **virgules** |
| `color-categories-other="#000000"` | `color="#000000"` — le JSDoc dit : « Couleur de la couche… **Sert aussi de repli quand `color-map` ne matche pas** ». La 5ᵉ entrée de légende (« Autres ») sort de là, exactement comme dans ODS |
| `picto="dot" size="6" show-marker="false"` | `type="circle" radius="6"` |
| `point-opacity="1"` | défaut |
| `caption="true"` (légende ODS) | `<dsfr-data-map-legend for="c-euro" label="Niveau de l'établissement">` — **le sous-titre est le `label` qu'on écrit**, pas le nom du champ (défaut n° 6 corrigé) |
| `show-zoom-min="5" show-zoom-max="22"` | `min-zoom="5" max-zoom="18"` (le composant plafonne à 18) |
| `description="…"` en encart superposé | un `<p class="fr-text--sm">` **au-dessus** de la carte : le texte n'est plus tronqué ni recouvert (défaut n° 10) |
| infobulle `<ul>` à 10 lignes | `<dsfr-data-map-popup mode="panel-right" width="400px">` + `<template>` — le mode panneau supprime le débordement (défaut n° 14) |
| `{{champ=='1' ? 'oui' : 'non'}}` | valeur déjà normalisée en « Oui » / « Non » en amont |
| `style="color: {{… ? 'green' : 'red'}}"` | `data-v="{{champ}}"` + CSS `[data-v="1"]::after { content: "Oui" }` (AM-039) — **et on ne peint que le « 1 »** |
| bandeau « affichées partiellement… » | rien : 1 672 < `max-items` 5 000 |
| outils de dessin, sélecteur de fond, géolocalisation | chrome du visualiseur d'actif ODS. **Ne pas les compter comme un manque** |
| — (rien dans l'original) | contact : mail, téléphone, adresse dans l'infobulle |
| — (rien dans l'original) | `<dsfr-data-chart type="bar">` des académies, `<dsfr-data-list>` triable, `<dsfr-data-a11y>` |

### Esquisse de code

```html
<!-- ================= Source ================= -->
<!-- 1 672 lignes, 185 Ko gzip, 0,20 s mesuré : un aller-retour, pas de select. -->
<dsfr-data-source id="euro"
  url="https://data.education.gouv.fr/api/explore/v2.1/catalog/datasets/fr-en-etablissements-labellises-euroscol/exports/json">
</dsfr-data-source>

<!-- Les six drapeaux restent des int 0/1 dans la donnée : ni `replace-fields`
     (string seulement) ni `compute` (pas de conditions) ne savent les convertir,
     et l'ODSQL du portail refuse if()/case() — voir § Limites n° 1.
     Ils sont donc traduits À L'AFFICHAGE, par data-v + CSS (AM-039). -->

<!-- Remplace la facette RNE (1 672 valeurs uniques) par ce qu'elle voulait être. -->
<dsfr-data-search id="euro-q" source="euro"
  fields="nom_etablissement, ville, rne"
  label="Rechercher un établissement" placeholder="Nom, commune, code UAI…"
  operator="words" count url-sync></dsfr-data-search>

<dsfr-data-query id="q-aca" source="euro-f" group-by="academie"
  aggregate="rne:count:nb" order-by="nb:desc" where="academie:isnotnull"></dsfr-data-query>

<div class="fr-container fr-mb-8w">
  <h1 class="fr-h2">Les établissements labellisés Euroscol</h1>
  <p class="fr-text--sm">
    Le label « Euroscol » reconnaît la mobilisation des écoles et des établissements
    scolaires publics ou privés sous contrat s'inscrivant dans une dynamique européenne.
  </p>

  <div class="fr-grid-row fr-grid-row--gutters">

    <!-- ================= Facettes ================= -->
    <div class="fr-col-12 fr-col-md-3">
      <dsfr-data-facets id="euro-f" source="euro-q"
        fields="niveau_etablissement_simplifie, niveau_etablissement, libelle_region_2016, academie, ville, code_postal, section_europeenne_orientale, section_internationale, section_binationale, lycee_metiers, rep, rep_plus"
        labels="niveau_etablissement_simplifie:Niveau (simplifié) | niveau_etablissement:Niveau détaillé | libelle_region_2016:Région | academie:Académie | ville:Commune | code_postal:Code postal | section_europeenne_orientale:Section européenne ou de langues orientales | section_internationale:Section internationale | section_binationale:Section binationale | lycee_metiers:Label lycée des métiers | rep:REP | rep_plus:REP+"
        display="niveau_etablissement_simplifie:radio-inline | libelle_region_2016:select | academie:multiselect | ville:multiselect | code_postal:multiselect"
        searchable="academie, ville, code_postal, niveau_etablissement"
        disjunctive="academie, ville, code_postal, niveau_etablissement"
        max-values="8" url-sync url-params></dsfr-data-facets>
    </div>

    <div class="fr-col-12 fr-col-md-9">
      <!-- Le compteur que l'original affiche mais ne met jamais à jour. -->
      <dsfr-data-kpi-group class="fr-mb-2w">
        <dsfr-data-kpi source="euro-f" value="count" format="nombre"
          label="établissements labellisés" col="12"></dsfr-data-kpi>
      </dsfr-data-kpi-group>

      <!-- ================= Carte ================= -->
      <dsfr-data-map name="Localisation des établissements labellisés Euroscol"
        center="46.55,2.5" zoom="5" height="600px"
        tiles="ign-plan" tiles-style="muted"
        fit-bounds fit-zone="41,-5.5,51.5,10" fit-max-zoom="12"
        insets="drom">

        <dsfr-data-map-layer id="c-euro" source="euro-f" type="circle" radius="6"
          geo-field="position"
          color-field="niveau_etablissement_simplifie"
          color-map="Lycée:#BA022A,Collège:#19630A,Ecole:#0B72B5,EREA:#F8B334"
          color="#3A3A3A"                    <!-- repli = catégorie « Autre » (7) -->
          min-zoom="5" max-items="6000"
          tooltip-field="nom_etablissement">
        </dsfr-data-map-layer>

        <dsfr-data-map-legend for="c-euro" label="Niveau de l'établissement">
        </dsfr-data-map-legend>

        <dsfr-data-map-popup mode="panel-right" title-field="nom_etablissement" width="400px">
          <template>
            <p class="fr-badge fr-badge--sm fr-mb-2v">{{niveau_etablissement}}</p>
            <p class="fr-text--sm fr-mb-1v"><strong>{{ville}}</strong> ({{code_postal}}) —
              académie de {{academie}}</p>
            <p class="fr-text--sm fr-mb-2v">{{adresse|Adresse non renseignée}}</p>

            <!-- Contact : présent dans le jeu, jamais affiché par l'original. -->
            <p class="fr-text--sm fr-mb-1v">
              <a class="odv-mail" href="mailto:{{mail}}">{{mail|Courriel non communiqué}}</a></p>
            <p class="fr-text--sm fr-mb-2v">
              <a class="odv-tel" href="tel:{{telephone}}">{{telephone|Téléphone non communiqué}}</a></p>

            <!-- La valeur brute (0/1) est portée par data-v ; le mot « Oui »/« Non »
                 est écrit par le CSS, seul endroit où une condition est possible. -->
            <ul class="fr-text--sm odv-flags">
              <li data-v="{{section_europeenne_orientale}}">Section européenne ou de langues orientales</li>
              <li data-v="{{section_internationale}}">Section internationale</li>
              <li data-v="{{section_binationale}}">Section binationale</li>
              <li data-v="{{lycee_metiers}}">Label lycée des métiers</li>
              <li data-v="{{rep}}">Réseau d'éducation prioritaire</li>
              <li data-v="{{rep_plus}}">REP+</li>
            </ul>
            <p class="fr-text--xs">Code UAI {{rne}}</p>
          </template>
        </dsfr-data-map-popup>
      </dsfr-data-map>

      <!-- ================= Ce que l'original n'a pas ================= -->
      <h2 class="fr-h4 fr-mt-4w">Établissements labellisés par académie</h2>
      <dsfr-data-chart id="g-aca" source="q-aca" type="bar" horizontal
        label-field="academie" value-field="nb" name="Établissements labellisés"
        databox databox-title="Établissements labellisés Euroscol par académie"
        databox-source="DREIC — fr-en-etablissements-labellises-euroscol"
        databox-download databox-screenshot></dsfr-data-chart>
      <dsfr-data-a11y for="g-aca" source="q-aca" table download></dsfr-data-a11y>

      <h2 class="fr-h4 fr-mt-4w">La liste</h2>
      <dsfr-data-list source="euro-f"
        columns="nom_etablissement, niveau_etablissement, ville, code_postal, academie, mail, telephone"
        sort pagination="25"></dsfr-data-list>
    </div>
  </div>
</div>
```

```css
/* AM-039 : pas de conditionnelle dans un template → interpoler la valeur brute dans un
   attribut, puis écrire le libellé ET la couleur en CSS. C'est le SEUL endroit du
   dispositif où une condition est exprimable, les six champs étant des int 0/1 que ni
   `replace-fields` (string seulement) ni `compute` (« hors périmètre : conditions »)
   ne convertissent. On ne peint QUE l'affirmatif : le « Non » du cas banal reste en
   gris (défaut n° 13 de l'original, qui peint 1 594 « non » en rouge). */
.odv-flags li::after            { content: " : " attr(data-v); }
.odv-flags li[data-v="1"]::after { content: " : oui"; color: var(--text-default-success, #18753C); font-weight: 700; }
.odv-flags li[data-v="0"]::after { content: " : non"; color: var(--text-mention-grey, #666666); }
/* Liens morts masqués : l'href interpolé est vide. */
.odv-mail[href="mailto:"], .odv-tel[href="tel:"] { display: none; }
```

## Limites et points durs identifiés

1. **Traduire un drapeau numérique `0/1` en « Non / Oui » dans la donnée : aucune voie
   déclarative. C'est le point dur de cette fiche, et il est réel.**
   *Ce que dit la fiche du composant* : « `replace-fields` — remplacement ciblé par
   champ ». Ce serait la réponse évidente.
   *Ce que dit le JSDoc et la source* (relus, pas devinés) :
   - grammaire `"CHAMP:pattern:remplacement | CHAMP2:p:r"` — **séparateur `|`**,
     `_parseReplaceFields` fait `attr.split('|')`. Une virgule ne produit **aucun**
     remplacement, **sans erreur** (PG-022) ;
   - et surtout, `_normalizeRow` étape 3a :
     `if (replaceFieldsMap.size > 0 && typeof normalizedValue === 'string') { … }`.
     **Les valeurs non-`string` ne sont jamais visitées.** Les six champs sont `int` au
     schéma et arrivent en `number` : `replace-fields` est **silencieusement sans effet**.
   *Deuxième voie native essayée* : `compute` de `dsfr-data-normalize`. Son JSDoc l'exclut
   explicitement — « Supporte l'arithmétique (+ - * /), la concaténation texte […] et les
   parenthèses. **Hors périmètre : conditions, fonctions**, calculs sur valeurs agrégées. »
   *Troisième voie essayée, au serveur* : un `select` ODSQL conditionnel.
   **Testé à l'API, refusé** — trois formes, trois `HTTP 400` :
   ```
   select=rne, if(rep=1,'Oui','Non') as rep
     → ODSQLSyntaxError: unexpected ( at position 26
   select=rne, case(rep=1,'Oui',true,'Non') as rep
     → ODSQLSyntaxError: unexpected ( at position 9
   ```
   L'ODSQL de ce portail n'a ni `if()` ni `case()` : le contournement « source générique »
   du `CLAUDE.md` **ne s'applique pas ici**.
   *Contournement retenu* : ne pas convertir la donnée, la traduire **à l'affichage** —
   `data-v="{{champ}}"` + `::after { content: " : oui" }` en CSS (AM-039). Trois lignes,
   et l'infobulle est correcte.
   *Ce que ce contournement NE règle pas* — et il faut le dire, PG-014 : **les facettes
   continuent d'afficher « 0 » et « 1 »**, exactement comme l'original. Le CSS ne peut pas
   y entrer (les libellés de valeurs sont du texte, pas des attributs). Sur un jeu où six
   des treize facettes sont booléennes, ce n'est pas anecdotique.
   *Verdict* : **manque réel, à remonter.** Deux formulations possibles, la seconde
   préférable :
   (a) « `replace-fields` doit comparer la valeur **stringifiée**, pas seulement les
   `string` » — correction d'un cas manifestement non prévu, coût faible ;
   (b) « `dsfr-data-facets` a besoin d'un `value-labels` (`champ:valeur:libellé | …`) »,
   qui règle aussi le cas des codes (`code_region`, `secteur`…) sans normalisation amont.
2. **Étiqueter les valeurs d'une facette.**
   *Obstacle* : `labels` de `dsfr-data-facets` renomme le **champ**, jamais ses **valeurs**
   (vérifié : `/** Labels custom : "field:Label | field2:Label 2" */`).
   *Voie native* : passer par une normalisation amont — bloquée par le point 1.
   *Verdict* : **c'est la seconde moitié du point 1**, pas une entrée de plus. Ne pas la
   compter deux fois au registre.
3. **Peindre une valeur d'infobulle selon une condition.**
   *Obstacle* : pas de conditionnelle dans les templates (AM-039).
   *Voie native* : interpoler la valeur brute dans un attribut (`data-v`) et styler en CSS
   — motif déjà documenté au dépôt. Il fonctionne ici, et il porte même le libellé
   (`content`), pas seulement la couleur.
   *Verdict* : **pas une limite** — motif connu, coût nul. Et on en profite pour **ne pas**
   reproduire le rouge sur le cas négatif banal.
4. **Le bandeau de troncature d'ODS à 1 672 points.**
   *Constat* : c'est **l'original** qui tronque, pas `dsfr-data`. Le plafond `max-items`
   vaut 5 000 (PG-013) ; 1 672 passe sans rien écrire.
   *Verdict* : **avantage** de la transposition, à consigner comme tel. Et son symétrique :
   le message « Essayez de zoomer » d'ODS ne charge rien de plus tant que le filtre ne
   change pas — c'est exactement le défaut que PG-013 décrit côté `dsfr-data`, donc il n'y
   a rien à reprocher à la bibliothèque ici.
5. **La 5ᵉ entrée de légende (« Autres »).**
   *Obstacle apparent* : `color-map` ne couvre que 4 des 5 valeurs ;
   `color-categories-other` d'ODS n'a pas d'homonyme.
   *Voie native* : le JSDoc de `color` le dit — « Couleur de la couche (défaut : blue-france
   DSFR). **Sert aussi de repli quand `color-map` ne matche pas** ». Et le JSDoc de
   `dsfr-data-map-legend` : « couche catégorielle (`color-field` + `color-map`) : une entrée
   par paire de `color-map`, **plus le repli `color` s'il a servi (« Autres valeurs »)** ».
   *Verdict* : **équivalent exact, non deviné — lu dans la source.** Le libellé sera
   « Autres valeurs » et non « Autres » ; à préférer, on nommera explicitement la catégorie
   en l'ajoutant à `color-map` (`Autre:#3A3A3A`), ce qui la sort du repli et lui donne son
   vrai nom.
6. **Recadrage au filtrage.** L'original ne recadre pas (`no-refit="true"`) ; la
   transposition, avec `fit-bounds`, recadre. C'est **un écart assumé** : « filtrer sur
   Lille et rester sur une vue France » est le défaut n° 8 bis de l'original. Le clip
   `fit-zone` + le plafond `fit-max-zoom="12"` évitent les deux excès connus (planisphère,
   sur-zoom sur un point isolé — BUG-004, corrigé par #687 qui pose le clip métropole par
   défaut dès qu'un encart ultramarin existe).
7. **Encarts ultramarins.** `insets="drom"` couvre les cinq DROM du jeu (La Réunion 27,
   Martinique 16, Guadeloupe 5, Guyane 5, Mayotte 1). Attention AM-032 : sans largeur, la
   feuille injectée pose 10 rem par encart → règle de page
   `dsfr-data-map-inset { width: 16%; }`.
   *Verdict* : arbitrage de mise en page.
8. **Les outils de dessin / la recherche de lieu / le sélecteur de fond.**
   *Constat* : chrome du **visualiseur d'actif ODS**, pas de la vue personnalisée.
   *Verdict* : **fonctions de back-office de portail open data.** Ne pas les compter comme
   un manque de `dsfr-data`.
9. **Ce que la transposition gagne** : un compteur qui suit réellement le filtre (le défaut
   n° 1 de l'original), les libellés **de facettes et de légende** en français lisible
   (les **valeurs** des six drapeaux, elles, restent « 0 / 1 » — cf. Limites n° 1), des
   drapeaux « oui / non » **dans l'infobulle**, le **contact** (mail, téléphone, adresse)
   qui dort dans le jeu, les 1 672 points affichés sans troncature, les DROM visibles en
   encarts, une infobulle en panneau qui ne déborde pas, un texte de présentation ni coupé
   ni recouvert, une URL partageable, un graphique par académie et un tableau accessible.
   **Quatorze des vingt défauts relevés tombent d'eux-mêmes.**

## Données à reproduire fidèlement

- [ ] **1 672** établissements labellisés, **tous géolocalisés** (0 `position` nulle) —
      et **tous affichés** (l'original en tronque une partie).
- [ ] **Niveau simplifié** (couleurs) : Lycée **782** `#BA022A` · Collège **466** `#19630A` ·
      Ecole **410** `#0B72B5` · EREA **7** `#F8B334` · **Autre 7** (repli, nommé).
- [ ] **Niveau détaillé** : 15 valeurs, de Collège 466 à « Service administratif » 2.
- [ ] **Académie** : 30 valeurs, de Lille 149 à Mayotte 1.
- [ ] **Région** : 18 valeurs, d'Île-de-France 264 à Mayotte 1.
- [ ] **Commune** 924 valeurs (Calais 33 en tête) · **Code postal** 1 198 (62100 = 30).
- [ ] **Les six drapeaux, avec leurs effectifs** : section européenne ou orientale **573** ·
      lycée des métiers **219** · REP **110** · section internationale **92** ·
      section binationale **78** · REP+ **65**.
- [ ] Infobulle : nom (titre), code UAI, académie, ville, niveau, les six drapeaux —
      **plus l'adresse, le courriel et le téléphone**, absents de l'original.
- [ ] **`caracteristiques_du_choix_de_cet_etablissement` est vide à 100 %** : ne pas la
      transposer, et le dire.
- [ ] Cadrage métropole + encarts DROM (54 établissements ultramarins, invisibles dans
      l'original).
- [ ] Titres : « Localisation des établissements labellisés Euroscol », légende
      « Niveau de l'établissement » (et non « Niveau_etablissement_simplifie »).
