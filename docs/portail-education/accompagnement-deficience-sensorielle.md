# Accompagnement à la déficience sensorielle (LSF / PEJS)

- **URL** : https://data.education.gouv.fr/pages/accompagnement-deficience-sensorielle/
- **Catalogue** : id **20**, thématique **Vie scolaire**, sous-thématique **École inclusive**.
- **Titre de la page (`<title>`)** : « Cartographie de l'accompagnement à la déficience
  sensorielle ».
- **Jeu de données** : **`fr-en-carto-acc-sensoriel`** — **307 lignes**, 17 champs, public.
  Titre ODS « Données de l'accompagnement à la déficience sensorielle », dernière modification
  **2026-01-29**, **Licence Ouverte v2.0 (Etalab)**. Description : « Sont recensés ici les lieux
  d'enseignement de la langue des signes française, selon qu'elle constitue une langue première
  (LSF1) ou seconde (LSF2). Les Pôles d'Enseignement pour les Jeunes Sourds (PEJS) sont
  également identifiés et localisés dans les établissements structurant le réseau. Les données
  sont celles de la rentrée scolaire 2024. »
  - **17 champs** : `uai`, `dispositif`, **`langue` (multivalué)**, `nom_etablissement`,
    `type_etablissement`, `statut_public_prive`, `libelle_region`, `libelle_academie`,
    `libelle_departement`, `web`, `fiche_onisep`, `position` (geo_point_2d),
    **`pejs`**, **`lsf1`**, **`lsf2`** (trois indicateurs texte valant `"1"` ou `null`),
    `latitude`, `longitude`. Les libellés de métadonnée sont ici corrects et en français
    (« Nom de l'établissement », « Académie », « Fiche ONISEP ») — c'est le seul jeu du lot
    dont le back-office a été renseigné.
  - **`langue` est un tableau** : l'API v2.1 renvoie `"langue": ["LSF2"]` ou
    `["LSF1","LSF2"]`. C'est le seul champ multivalué des trois jeux du lot, et il commande
    toute la lecture de la page.
  - **Facettes déclarées au back-office** : `libelle_region`, `libelle_academie`,
    `type_etablissement`, `libelle_departement`, `langue`, `dispositif`,
    `statut_public_prive` (sept — la page n'en utilise que deux).
- **Relevé visuel** : 2026-09-10, Chrome, fenêtre 1568 × 751.
- **Gabarit** : même moule que les deux autres pages du lot — voir
  [`implantation-ulis-tfv.md`](implantation-ulis-tfv.md), § « Gabarit partagé ».

## Objectif de la dataviz et informations véhiculées

- **Question à laquelle elle répond** : « Où un enfant sourd ou malentendant peut-il être
  scolarisé en langue des signes, et où sont les pôles d'enseignement structurants ? »
  C'est, comme ULIS-TFV, un **annuaire d'orientation** — mais avec un axe supplémentaire :
  la nature de l'accompagnement (LSF langue première, LSF langue seconde, appartenance à un
  PEJS), qui n'est **pas** une partition mais un **croisement**.
- **Message porté** : l'existence d'un réseau. Les PEJS « structurent le réseau » selon la
  description du jeu ; la carte devrait montrer où ces pôles sont, et de quelles LSF ils
  s'accompagnent. Elle le montre à moitié : voir « Défauts », point 1.
- **Information que l'utilisateur doit obtenir** : pour un établissement, son nom, son statut,
  son dispositif (PEJS ou rien), son niveau d'enseignement de la LSF, sa région, son académie,
  son département, et deux liens.
- **Ce qui n'est pas dans l'objet** :
  - **la moitié du jeu** : 152 lignes sur 307 n'apparaissent sur aucune couche (point 1) ;
  - **aucune définition de LSF1 / LSF2 / PEJS** au-delà du paragraphe d'intro, qui les cite
    sans les expliquer (LSF1 = langue première = enseignement *en* LSF ; LSF2 = langue seconde
    = LSF enseignée comme une langue vivante — la nuance décide d'une scolarité, elle n'est
    pas dite) ;
  - **aucun dénombrement** : ni 307, ni 57 PEJS, ni 37 LSF1, ni 87 LSF2 ;
  - **aucun filtre par type d'établissement ni par statut**, alors que les deux facettes sont
    déclarées au back-office et que le jeu compte 54 établissements privés ;
  - **aucun tableau, aucun export, aucun lien vers le jeu**.

## Chiffres de référence (export `/exports/json?limit=-1`, 307 lignes)

| Mesure | Valeur |
|---|---|
| **Lignes** | **307** — **303 UAI distincts** (4 doublons, voir plus bas) |
| Lignes sans `position` | **2** |
| **PEJS** (`dispositif = "PEJS"`, = `pejs = "1"`) | **57** |
| **LSF1** (`lsf1 = "1"`, = `langue` contient LSF1) | **37** |
| **LSF2** (`lsf2 = "1"`) | **87** |
| Croisements | PEJS ∩ LSF1 **18** · PEJS ∩ LSF2 **6** · LSF1 ∩ LSF2 **4** |
| **Union des trois** (= ce que la carte peut montrer) | **155** |
| **Lignes couvertes par aucune couche** | **152** (49,5 % du jeu) |
| `langue` brut | LSF2 seul **83** · LSF1 seul **33** · `LSF1,LSF2` **4** · vide **187** |
| `dispositif` brut | PEJS **57** · vide **250** |
| `type_etablissement` | Lycée **114** · École **107** · Collège **82** · EREA **2** · vide **2** |
| `statut_public_prive` | Public **251** · **Privé 54** · vide **2** |
| Régions | **16** + 2 vides — Île-de-France 67 · Auvergne-Rhône-Alpes 39 · Hauts-de-France 34 · Nouvelle-Aquitaine 23 · Pays de la Loire 23 · Occitanie 19 · Grand Est 19 · PACA 17 · Bourgogne-Franche-Comté 16 · Bretagne 15 · Normandie 13 · Centre-Val de Loire 7 · **La Réunion 5** · Corse 3 · **Guyane 3** · **Mayotte 2** |
| Départements affichés | **71** |
| Académies affichées | **28** |
| **Points ultramarins** | **10** : La Réunion 5, Guyane 3, Mayotte 2 — **dont 3 seulement sont affichés** (les 7 autres sont des orphelins) |
| Emprise du jeu | lat −21,347 → 51,037 · lon **−52,281** (Guyane) → **55,516** (La Réunion) |
| Emprise des points **affichés** | lat −21,273 → 51,037 · lon **−4,511** → **55,373** |
| Liens renseignés | `fiche_onisep` 197/307 (**110 vides**) · `web` 192/307 (**115 vides**) |

**Les 4 UAI en doublon** sont des établissements à deux sites ou à deux composantes, tous
`LSF2`, tous des lycées privés avec une partie enseignement supérieur :

| UAI | Les deux lignes |
|---|---|
| 0530068L | Lycée polyvalent Haute-Follis / Lycée Haute-Follis - Campus enseignement sup EC 53 |
| 0690539L | Lycée Assomption Bellevue / Lycée Assomption Bellevue - Pôle enseignement supérieur |
| 0761735Y | Lycée privé Jeanne d'Arc - site Coty / - site De Gaulle |
| 0421021G | Lycée Saint-Michel / Campus Saint-Michel - Enseignement supérieur |

**Les 2 lignes sans position** sont des **lignes fantômes** : `uai` renseigné et **tout le
reste à `null`** — `0621560J` (aucun dispositif) et `0430968U` (`langue = ["LSF2"]`,
`lsf2 = "1"`). La seconde est comptée dans les 87 LSF2 mais n'apparaît sur aucune carte.

## Le template AngularJS

`_sources/accompagnement-deficience-sensorielle.html`. **Un seul `<ods-dataset-context>`,
cinq contextes** — le plus sobre des trois :

```html
<ods-dataset-context context="ctx1,ctx2,ctx3,ctx5,ctx6"
  ctx1-dataset="fr-en-carto-acc-sensoriel" ctx1-parameters="{'refine.dispositif':'PEJS'}"
  ctx2-…                                   ctx2-parameters="{'refine.langue':'LSF1'}"
  ctx3-…                                   ctx3-parameters="{'refine.langue':'LSF2'}"
  ctx5-…   <!-- fiche de détail, refine sur uai -->
  ctx6-…>  <!-- source des listes de facettes, jamais filtré -->
```

Il n'y a pas de `ctx4` : la numérotation saute, trace du gabarit à quatre couches d'où la page
est issue.

**La carte** : mêmes attributs que les deux autres pages, avec **une différence décisive** —

```html
<ods-map … display-control="false" display-legend="true" location="3,18.50166,-3.66683" …>
```

**`display-legend="true"`** : c'est la seule des trois pages du lot à afficher une légende.
`display-control="false"` : toujours pas de sélecteur de couche.

**Les trois couches**, dans l'ordre du DOM (donc de dessin ; la dernière passe devant) :

| Ordre | Contexte | `refine` du contexte | Lignes | `color` | `title` (= texte de légende) |
|---|---|---|---|---|---|
| 1 | ctx3 | `langue:LSF2` | **87** | `#FFC29E` (saumon clair) | « Langue des signes française seconde (LSF2) » |
| 2 | ctx2 | `langue:LSF1` | **37** | `#FF8D7E` (saumon soutenu) | « Langue des signes française première (LSF1) » |
| **3 (au-dessus)** | ctx1 | `dispositif:PEJS` | **57** | `#000091` (bleu France) | « Pôle d'Enseignement des Jeunes Sourds (PEJS) » |

Attributs communs : `picto="dot"`, `show-marker="false"`, `display="auto"` **sur les trois**
(pas d'incohérence ici, contrairement à la page Label), `point-opacity="1"`,
`shape-opacity="0.5"`, `border-color="#FFFFFF"`, `border-size="1"`, `caption="true"`,
`tooltip-disabled="true"`, et le quadruplet `refine-on-click-ctx5-*` sur `uai`.

**Ce qui distingue les couches — et c'est ici que le motif prend enfin un sens.** Les trois
refines ne portent pas sur le même champ (`dispositif` pour l'une, `langue` pour les deux
autres) et, surtout, **ils ne sont pas disjoints** :

- `langue` est **multivalué** : `refine.langue = LSF1` capte les 33 lignes « LSF1 seul » **et**
  les 4 lignes « LSF1,LSF2 », soit 37 — ce qui recoupe exactement `lsf1 = "1"` ;
- 18 établissements sont **à la fois** PEJS et LSF1, 6 à la fois PEJS et LSF2, 4 à la fois
  LSF1 et LSF2 ;
- l'union des trois vaut **155**, pas 181 : les couches **se recouvrent**.

Les trois couches sont donc **trois vues croisées, superposées et simultanées** du même jeu.
C'est, des trois pages, la seule où le multi-couches encode quelque chose qu'une seule couche
catégorielle ne pourrait pas rendre : un même établissement doit apparaître dans deux
catégories à la fois.

Le corollaire, que la page ne gère pas : **quand deux couches occupent la même position, la
plus haute masque l'autre** — et toutes trois utilisent le même `picto="dot"` du même rayon.

## Relevé visuel exhaustif

### 1. Panneau de filtres (~330 px, superposé à la carte)

**a. Champ « Rechercher un lieu »** — géocodeur d'`ods-map`. Le `<div class="filtre-searchbox">`
du template est **vide** : comme sur ULIS-TFV, la recherche textuelle dans les données n'a pas
été branchée.

**b. Texte de description**, centré, en gris :
« Sont recensés ici les lieux d'enseignement de la langue des signes française, selon qu'elle
constitue une langue première (LSF1) ou seconde (LSF2), ainsi que l'appartenance à un Pôle
d'Enseignement pour les Jeunes Sourds (PEJS) »

**c. En-tête « Filtrer les projets »** + **icône ⊗** :

```html
<ods-clear-all-filters context="[ctx1,ctx2,ctx3]"
  ng-show="ctx1.parameters['q.type_acc'] || ctx1.parameters['refine.type_etablissement']
        || ctx1.parameters['refine.libelle_departement']
        || ctx1.parameters['refine.libelle_academie'] || ctx1['parameters']">
```

- **Libellé** : aucun, un pictogramme seul.
- **Pas d'`except`** — contrairement à ULIS-TFV et à Label. Il efface donc explicitement
  **tous** les paramètres des trois contextes de couches, `refine.dispositif` et `refine.langue`
  compris.
- Comme sur ULIS-TFV, le dernier terme du `ng-show` (`ctx1['parameters']`) est **toujours
  truthy** : le bouton est visible en permanence, y compris sans aucun filtre.
- Le mot « projets » est repris du gabarit CNR : ce sont ici des établissements.
- **Effet observé : catastrophique.** Voir « Défauts », point 3.

**d. Accordéon « Type d'accompagnement »** — trois boutons radio, **sans compteur** :

| Libellé | Valeur posée sur ctx1, ctx2 **et** ctx3 |
|---|---|
| PEJS | `q.type_acc = 'dispositif:PEJS'` |
| LSF1 | `q.type_acc = 'langue:LSF1'` |
| LSF2 | `q.type_acc = 'langue:LSF2'` |

Le titre de l'accordéon **n'affiche pas la valeur choisie** (contrairement aux deux autres
pages) : il reste « Type d'accompagnement », seule une croix ⊗ apparaît à côté.

**Ce que fait vraiment ce filtre** : il pose une requête sur les **trois** contextes, qui
portent déjà chacun leur refine. Choisir « PEJS » donne :
`ctx1 = PEJS ∩ PEJS` (57 bleus), `ctx2 = LSF1 ∩ PEJS` (18 saumon soutenu),
`ctx3 = LSF2 ∩ PEJS` (6 saumon clair). Le filtre **n'isole pas une couche** : il intersecte
les trois. Vérifié à l'écran : après « PEJS », la carte se recadre sur la métropole (les DROM
n'ont aucun PEJS, confirmé sur l'export) et n'affiche que **des points bleus** — les 18 et
les 6 points saumon sont là mais **entièrement recouverts** par le point bleu de la couche
supérieure, au même endroit et au même rayon.

**e. Accordéon « Départements »** — **71 boutons radio**, tri alphanumérique, sans compteur :
Aisne · Allier · Alpes-Maritimes · Aube · Bouches-du-Rhône · Calvados · Charente-Maritime ·
Cher · Corrèze · Côte-d'Or · Côtes-d'Armor · Doubs · Drôme · Essonne · Eure · Finistère · Gard ·
Gers · Gironde · **Guyane** · Haut-Rhin · Haute-Corse · Haute-Garonne · Haute-Loire ·
Haute-Vienne · Hautes-Pyrénées · Hauts-de-Seine · Hérault · Ille-et-Vilaine · Indre-et-Loire ·
Isère · **La Réunion** · Landes · Loir-et-Cher · Loire · Loire-Atlantique · Loiret · Lot ·
Lot-et-Garonne · Maine-et-Loire · Manche · Marne · Mayenne · **Mayotte** · Meurthe-et-Moselle ·
Morbihan · Moselle · Nièvre · Nord · Oise · Paris · Pas-de-Calais · Puy-de-Dôme ·
Pyrénées-Atlantiques · Pyrénées-Orientales · Rhône · Saône-et-Loire · Sarthe · Seine-Maritime ·
Seine-Saint-Denis · Seine-et-Marne · Somme · Tarn · Val-d'Oise · Val-de-Marne · Var · Vaucluse ·
Vendée · Vienne · Vosges · Yvelines.

**f. Accordéon « Académies »** — **28 boutons radio**, sans compteur :
Aix-Marseille · Amiens · Besançon · Bordeaux · Clermont-Ferrand · Corse · Créteil · Dijon ·
Grenoble · Guyane · La Réunion · Lille · Limoges · Lyon · Mayotte · Montpellier · Nancy-Metz ·
Nantes · Nice · Normandie · Orléans-Tours · Paris · Poitiers · Reims · Rennes · Strasbourg ·
Toulouse · Versailles.

Les deux listes sont bâties sur ctx6 non filtré : **pas de cascade, pas de compteur** — et,
détail lourd de conséquence, **elles listent les 71 départements et 28 académies du jeu
entier, orphelins compris** : sélectionner un département qui n'a que des lignes orphelines
donne une carte vide sans explication.

### 2. La carte

- **Fond** : tuiles IGN via Huwise, mêmes contrôles que les deux autres pages.
- **Cadrage au chargement** : échelle **1 000 km**, France + Europe + Afrique du Nord dans le
  cadre visible. Les points de La Réunion, Guyane et Mayotte affichés (3 sur 10) sont **hors du
  viewport de la fenêtre**, la carte étant plus haute que l'écran.
- **Rendu des points** : `display="auto"` sur 155 points → **disques pleins à liseré blanc**,
  ~10 px, pas de cluster. Visibles au premier écran : un semis de disques bleus, saumon soutenu
  et saumon clair sur toute la métropole, avec un bleu isolé en Corse.
- **La légende** (`display-legend="true"`), en bas à droite, encart blanc arrondi. **Ce n'est
  pas une liste : c'est un carrousel paginé, une entrée à la fois.** Relevé mot pour mot, en
  cliquant les flèches :

| Page | Titre affiché | Pastille | Libellé de l'entrée |
|---|---|---|---|
| **1/3** | « Langue des signes française seconde (LSF2) » | carré `#FFC29E` | **« Element »** |
| **2/3** | « Langue des signes française première (LSF1) » | carré `#FF8D7E` | **« Element »** |
| **3/3** | « Pôle d'Enseignement des Jeunes Sourds (PEJS) » | carré `#000091` | **« Element »** |

  Le mot « **Element** » — sans accent — est le libellé par défaut d'ODS pour une couche
  monochrome dont aucun champ de catégorie n'est déclaré. Il est répété trois fois et ne
  signifie rien. Le sens est porté par le **titre** de chaque page du carrousel ; **on ne peut
  jamais voir les trois couleurs ensemble.**
- **Survol** : rien (`tooltip-disabled="true"`).
- **Recadrage** : à chaque filtre, en avance sur les tuiles.

### 3. Le tiroir de détail (au clic sur un point)

Panneau blanc à droite, bandeau de titre bleu France. Relevé mot pour mot sur un point corse
(dispositif PEJS, `langue` nulle) :

> **Ecole maternelle Furiani - Public**
>
> PEJS
> Niveau d'enseignement de la LSF :
>
> Région : Corse
> Académie : Corse
> Département : Haute-Corse
>
> Fiche ONISEP - Site web

Et sur un point LSF2 sans dispositif (première ligne du jeu, chargée dans le tiroir **avant
tout clic**) :

> **Lycée Sainte-Sophie - Privé**
>
> *(ligne vide — `dispositif` est nul)*
> Niveau d'enseignement de la LSF : LSF2
>
> Région : Hauts-de-France
> Académie : Amiens
> Département : Aisne
>
> Fiche ONISEP - Site web

- Le titre concatène `nom_etablissement` et `statut_public_prive`.
- **La première ligne du corps est `{{dispositif}}` en gras, sans libellé** : elle affiche
  « PEJS » ou **rien du tout** (250 fiches sur 307). Une ligne vide en gras.
- **« Niveau d'enseignement de la LSF : » reste affiché même quand `langue` est nulle**
  (187 fiches sur 307) : un intitulé suivi du vide.
- Autrement dit, sur les **152 fiches orphelines**, les deux premières lignes du tiroir sont
  vides — et ce sont précisément les deux lignes qui portent le sujet de la page.
- Quand `langue` vaut `["LSF1","LSF2"]`, la valeur s'affiche « LSF1,LSF2 » (le tableau
  sérialisé, sans espace).
- « Fiche ONISEP » et « Site web » sont **rendus inconditionnellement** : **110 fiches** ont un
  lien ONISEP mort et **115** un lien « Site web » mort.
- `type_etablissement` n'est **pas** affiché dans le tiroir, alors qu'il l'est sur les deux
  autres pages du lot et qu'il est déclaré en facette.
- **Le tiroir contient déjà un enregistrement au chargement** (Lycée Sainte-Sophie), avant tout
  clic : ctx5 monté sans refine + `ods-results-max="1"`. Invisible à l'œil, présent dans le DOM.

### 4. Accessibilité, console

- **Les marqueurs de la carte ne sont pas exposés dans l'arbre d'accessibilité.** Vérifié : une
  recherche d'éléments « marqueur / point de données » sur la page ne retourne aucun élément
  interactif de la carte, seulement les contrôles Leaflet. Sur une dataviz destinée aux élèves
  sourds et à leurs familles, la donnée n'est atteignable ni au clavier ni au lecteur d'écran.
- Aucun message en console au chargement.

## Défauts et bizarreries de l'original

1. **La moitié du jeu n'est sur aucune couche.** Les trois couches couvrent
   `dispositif = PEJS` ∪ `langue = LSF1` ∪ `langue = LSF2` = **155 lignes**. Les **152 autres**
   (49,5 %) ont `dispositif` et `langue` nuls : elles existent dans le jeu, elles ont une
   position, elles sont comptées dans les listes de départements et d'académies du panneau —
   et **elles n'apparaissent jamais sur la carte**. Ce sont pour l'essentiel des écoles (78)
   et des collèges (51) publics. Rien dans la page ne signale leur existence ; un utilisateur
   qui filtre sur un département où il n'y a que des orphelins obtient une carte vide.
   *La seule manière de les faire apparaître est de casser la page* — voir point 3.
2. **Les couches se recouvrent et se masquent.** 18 établissements sont PEJS **et** LSF1,
   6 sont PEJS **et** LSF2, 4 sont LSF1 **et** LSF2. Comme les trois couches utilisent le même
   `picto="dot"` au même rayon et que PEJS est dessinée en dernier, un pôle qui enseigne la LSF
   première apparaît **uniquement en bleu** : son appartenance LSF1 est invisible. Le
   croisement, qui est le seul apport du multi-couches sur cette page, est donc annulé par le
   rendu. Vérifié à l'écran en filtrant « PEJS » : 18 + 6 points saumon sont là et aucun n'est
   visible.
3. **`clear-all-filters` fait exploser la carte.** Vérifié : (a) filtre « PEJS » → une
   vingtaine de disques bleus ; (b) clic sur le ⊗ → la carte se transforme en **grappes de
   clusters chiffrés** (« 25 », « 8 », « 6 », « 5 »…), **tous de la même couleur bleu-violet**.
   Le widget n'ayant **pas d'`except`**, il efface `refine.dispositif` et `refine.langue` : les
   trois couches interrogent alors les **307 lignes** chacune, soit 921 points sur 305
   positions, ce qui fait basculer `display="auto"` en mode agrégé. La légende, elle, continue
   d'annoncer « Langue des signes française seconde (LSF2) — 1/3 ». **L'état est stable** : il
   faut recharger la page. Paradoxe : c'est le seul état dans lequel les 152 orphelins sont
   visibles.
4. **Une légende paginée qui ne montre jamais l'ensemble.** `display-legend="true"` produit un
   carrousel 1/3 → 2/3 → 3/3, une couleur à la fois. Pour associer les trois teintes aux trois
   catégories, il faut cliquer deux fois et mémoriser. Les trois pastilles portent le même
   libellé, « **Element** », qui n'est ni traduit ni signifiant. Et deux des trois couleurs
   (`#FFC29E` et `#FF8D7E`) sont deux saumons proches, à distinguer une page de carrousel plus
   loin.
5. **Le bouton de remise à zéro est toujours affiché** (`ng-show` dont le dernier terme est
   toujours vrai), même sans aucun filtre — et son seul effet, dans ce cas, est le bug du
   point 3.
6. **Le filtre « Type d'accompagnement » n'isole pas ce qu'il annonce.** Cocher « PEJS »
   n'affiche pas « les PEJS » : il affiche l'intersection de chaque couche avec PEJS. Le
   résultat *visible* est le bon par accident (le bleu recouvre tout), mais trois requêtes
   partent au lieu d'une et le rendu perd les 24 croisements.
7. **Le tiroir affiche deux intitulés vides sur 152 fiches.** `{{dispositif}}` en gras sans
   libellé (250 fiches vides) et « Niveau d'enseignement de la LSF : » suivi de rien
   (187 fiches). Sur une fiche orpheline, le tiroir s'ouvre sur deux lignes creuses avant de
   donner la région.
8. **110 liens ONISEP et 115 liens « Site web » morts**, rendus sans condition — les taux les
   plus élevés des trois pages du lot (36 % et 37 %).
9. **Deux lignes fantômes** : `0621560J` et `0430968U` n'ont qu'un UAI, tout le reste est nul.
   La seconde porte pourtant `lsf2 = "1"` et est donc comptée dans les 87 LSF2 sans jamais
   pouvoir être affichée.
10. **Quatre UAI en doublon** (lycées à deux sites ou avec un pôle post-bac) : deux points
    exactement superposés, deux fiches, et le tiroir n'en montre qu'une (`ods-results-max="1"`
    sur un refine `uai`).
11. **Ni type d'établissement ni statut dans les filtres**, alors que les deux facettes sont
    déclarées au back-office, que le jeu compte **54 établissements privés** et que le type
    (école / collège / lycée) est la première question d'une famille. Le type n'est même pas
    affiché dans le tiroir.
12. **`langue` multivalué s'affiche « LSF1,LSF2 »** — la sérialisation brute du tableau, sans
    espace ni conjonction.
13. **Pas de recherche textuelle** : le `filtre-searchbox` du gabarit est vide, et le champ
    « Rechercher un lieu » qui occupe visuellement sa place est le géocodeur de fond de carte.
14. **Ni H1, ni total, ni date, ni lien vers le jeu, ni mention de licence.** La rentrée de
    référence (2024) n'est écrite que dans la métadonnée ODS.
15. **L'URL n'est pas un état partageable.**
16. **Le tiroir contient un établissement avant tout clic** (Lycée Sainte-Sophie), lisible par
    un lecteur d'écran.

## Transposition vers `dsfr-data`

Attributs vérifiés dans la référence générée depuis le source
(`get_skill(dsfrDataMap|dsfrDataFacets|dsfrDataSource|dsfrDataSearch|dsfrDataList|dsfrDataA11y,
"reference")`, `get_skill(attributeGrammars, "guide")`) et par lecture de
`~/Developer/GitHub/dsfr-data/packages/core/src/components/dsfr-data-map-layer.ts`.
Ce qui est commun aux trois pages du lot est détaillé dans
[`implantation-ulis-tfv.md`](implantation-ulis-tfv.md).

**Le point d'architecture propre à cette page** : ici, et ici seulement, **les couches
multiples se justifient** — parce que les catégories se recoupent. Mais le bon nombre n'est
pas trois, et la superposition de disques identiques n'est pas la bonne façon de rendre le
croisement.

| Original Opendatasoft | `dsfr-data` | Attributs nécessaires |
|---|---|---|
| `<ods-dataset-context context="ctx1,ctx2,ctx3,ctx5,ctx6">` | **un seul `<dsfr-data-source>`** | `api-type="opendatasoft"`, `base-url`, `dataset-id="fr-en-carto-acc-sensoriel"`, `api-key-ref`. 307 lignes < 1 000 : **pas de `max-records` à poser**, pas de `server-side`. |
| `refine.langue:'LSF1'` sur un champ multivalué | rien à écrire | Le champ arrive en tableau de l'API v2.1 (`["LSF1","LSF2"]`). `attributeGrammars` § split : « `dsfr-data-facets` traite le tableau comme un champ multi-valeurs : une entrée de facette par élément, et une ligne matche dès qu'un de ses éléments est choisi. » Une facette `langue` reproduit donc **exactement** le comportement des deux refines ODS, avec les bons comptes (37 / 87). **`dsfr-data-normalize split` est inutile ici** : la valeur est déjà un tableau. |
| **3 × `<ods-map-layer>`** recouvrantes, même `dot`, couleurs différentes | **2 `<dsfr-data-map-layer>`** : un fond + un accent | (a) une couche **`type="circle"`** portant **tous** les établissements, colorée par `color-field="type_etablissement"` ou par un champ dérivé « nature de l'accompagnement » ; (b) une couche **PEJS** en `type="marker"` (épingle bleu France) posée par-dessus, avec un `where` amont ou une source dédiée. Deux formes différentes, pas deux disques identiques : le croisement redevient lisible. Voir « Limites », point 1. |
| Le recouvrement PEJS/LSF invisible | `radius` différenciés **ou** formes différenciées | La superposition de deux `type="circle"` de même `radius` reproduit le défaut n° 2. Voies natives : `radius="10"` pour la couche de fond et `type="marker"` (épingle) pour PEJS ; ou `fill-opacity="0.5"` sur la couche du dessus. **Non vérifié au navigateur.** |
| Légende paginée « Element » 1/3 | `<dsfr-data-map-legend>` × 2 | `for="<id couche>"`, `label`. **La liste n'est pas paginée** : une entrée par paire de `color-map` (ou une entrée unique libellée par `label` pour une couche monochrome), pastille `aria-hidden`, texte porteur du sens (RGAA). Une légende `for=""` (vide) concatène les entrées de **toutes** les couches directes de la carte — c'est exactement ce qui manque à l'original. **Deux couches ⇒ soit une légende sans `for`, soit deux légendes libellées.** |
| `display-control="false"` | sans objet / facette | Le besoin « voir seulement les PEJS » est servi par la facette `dispositif`. |
| `location="3,…"` + fit jusqu'à la Guyane | `<dsfr-data-map>` | `center="46.6,2.3"`, `zoom="6"`, `height`, `tiles="ign-plan"`, `tiles-style="muted"`, `fit-bounds`, `fit-max-zoom="12"`, **`insets="la-reunion,guyane,mayotte"`**, `name`. Le jeu a **10 points ultramarins** (La Réunion 5, Guyane 3, Mayotte 2) : les trois encarts sont justifiés et **ciblés** — `insets="drom"` en poserait cinq dont deux vides (Guadeloupe, Martinique). Avec un encart ultramarin et sans `max-bounds`, `resolveFitZone()` clippe le fit sur la métropole (`41,-5.5,51.5,10`), ce qui règle le cadrage planétaire. |
| Encarts | `<dsfr-data-map-inset>` × 3 | `territory="la-reunion" \| "guyane" \| "mayotte"`, `label`. Largeur par défaut 10 rem posée par la carte (#643). Ils réutilisent la couche **et** le popup de la carte hôte : un clic dans l'encart ouvre le même panneau. |
| Filtre « Type d'accompagnement » (3 radios × 3 contextes) | `<dsfr-data-facets>` | `fields="dispositif, langue, type_etablissement, statut_public_prive, libelle_departement, libelle_academie"` (**virgules**), `labels="… \| …"` (**barres**), `display="dispositif:select \| langue:multiselect \| type_etablissement:select \| statut_public_prive:select \| libelle_departement:select \| libelle_academie:select"` (**barres**). `langue` en **`multiselect`** (dropdown à cases + « tout sélectionner ») parce que le champ est multivalué et que « LSF1 **ou** LSF2 » est une question légitime — `select` y imposerait un choix unique. Compteurs affichés par défaut, cascade native en mode local. **Et deux facettes que l'original n'avait pas** : type et statut. |
| Listes Départements / Académies sur ctx6 | mêmes `<dsfr-data-facets>` | Rien de plus : la cascade est le défaut. |
| `<ods-clear-all-filters>` sans `except` | rien à transposer | Pas de bouton global qui puisse détruire l'encodage de la carte. Les facettes `select` se vident par leur option vide. |
| `ctx5` + tiroir + `refine-on-click-*` sur `uai` | `<dsfr-data-map-popup>` + `<template>` | `mode="panel-right"`, `title-field="nom_etablissement"`, `width="380px"`. `{{#if}}` règle les deux intitulés vides (défaut n° 7) **et** les 225 liens morts. `{{langue:join: et }}` rend « LSF1 et LSF2 » au lieu de « LSF1,LSF2 » (filtre `join` documenté dans `get_skill(dsfrDataMap,"guide")` § popup). `refine-on-click="uai"` existe au source mais **n'est pas publié** (changeset hors CHANGELOG, npm 0.22.0) — et le popup suffit. |
| — (absent : les 152 orphelins) | couche de fond + KPI + phrase | La couche de fond porte **tous** les établissements : les orphelins deviennent visibles, en gris, avec une entrée de légende « Accompagnement non précisé ». C'est la correction la plus importante de la page. |
| — (absent) | `<dsfr-data-search>` | `fields="nom_etablissement, libelle_departement, libelle_academie, libelle_region"`, `label`, `placeholder`, `count`. La recherche que le gabarit prévoyait et n'a pas branchée. |
| — (absent) | `<dsfr-data-kpi>` × 3 | `value="count"` (source client), `heading`, `label`, `col`. 307 lieux · 57 PEJS · 87 LSF2. |
| — (absent) | `<dsfr-data-list>` + `<dsfr-data-a11y>` | Tableau paginé, export CSV, liaison ARIA. **Sur une page destinée à des familles d'enfants sourds, l'accès non cartographique n'est pas un supplément.** |

### Esquisse de code

```html
<!-- 307 lignes, 17 champs : une requête, tout côté client. -->
<dsfr-data-source id="sens"
  api-type="opendatasoft"
  base-url="https://data.education.gouv.fr"
  dataset-id="fr-en-carto-acc-sensoriel"
  api-key-ref="education-lecture">
</dsfr-data-source>

<!-- Source dédiée à la couche d'accent : les 57 PEJS. -->
<dsfr-data-source id="pejs"
  api-type="opendatasoft"
  base-url="https://data.education.gouv.fr"
  dataset-id="fr-en-carto-acc-sensoriel"
  api-key-ref="education-lecture"
  where="dispositif = 'PEJS'">
</dsfr-data-source>

<div class="fr-container fr-mt-6w">
  <h1>Où apprendre et apprendre en langue des signes ?</h1>
  <p class="fr-text--lead">
    À la rentrée 2024, <strong>307 écoles, collèges et lycées</strong> accueillent un
    accompagnement à la déficience sensorielle. <strong>37</strong> enseignent
    <em>en</em> langue des signes (LSF langue première), <strong>87</strong> l'enseignent
    comme langue vivante (LSF langue seconde), et <strong>57</strong> appartiennent à un
    Pôle d'enseignement des jeunes sourds — 24 d'entre eux cumulent les deux qualités.
    Les <strong>152 autres</strong> établissements du recensement accueillent un
    accompagnement dont la nature n'est pas précisée dans les données : ils figurent
    ici en gris.
  </p>

  <dsfr-data-search id="q" source="sens" count
    fields="nom_etablissement, libelle_departement, libelle_academie, libelle_region"
    label="Rechercher un établissement, un département, une académie"
    placeholder="Furiani, Haute-Corse, Amiens…">
  </dsfr-data-search>

  <div class="fr-grid-row fr-grid-row--gutters fr-mt-3w">
    <div class="fr-col-12 fr-col-md-3">
      <h2 class="fr-h6">Filtrer</h2>
      <dsfr-data-facets id="f" source="q"
        fields="dispositif, langue, type_etablissement, statut_public_prive, libelle_departement, libelle_academie"
        labels="dispositif:Pôle (PEJS) | langue:Niveau d'enseignement de la LSF | type_etablissement:Type d'établissement | statut_public_prive:Secteur | libelle_departement:Département | libelle_academie:Académie"
        display="dispositif:select | langue:multiselect | type_etablissement:select | statut_public_prive:select | libelle_departement:select | libelle_academie:select"
        sort="alpha:asc">
      </dsfr-data-facets>
    </div>

    <div class="fr-col-12 fr-col-md-9">
      <dsfr-data-kpi-group class="fr-mb-3w">
        <dsfr-data-kpi source="f" value="count" format="nombre" col="4"
          heading="Sélection" label="établissements"></dsfr-data-kpi>
        <dsfr-data-kpi source="f" value="lsf1:sum" format="nombre" col="4"
          heading="LSF langue première" label="établissements"></dsfr-data-kpi>
        <dsfr-data-kpi source="f" value="lsf2:sum" format="nombre" col="4"
          heading="LSF langue seconde" label="établissements"></dsfr-data-kpi>
      </dsfr-data-kpi-group>
      <!-- `lsf1`/`lsf2` sont des textes "1"/null : un `:sum` suppose un
           dsfr-data-normalize numeric="lsf1, lsf2" en amont. NON VÉRIFIÉ, cf. « Limites » 4. -->

      <dsfr-data-map id="carte-lsf"
        name="Établissements accompagnant la déficience sensorielle"
        center="46.6,2.3" zoom="6" height="620px"
        tiles="ign-plan" tiles-style="muted"
        fit-bounds fit-max-zoom="12"
        insets="la-reunion,guyane,mayotte">

        <!-- 1. Couche de fond : TOUS les établissements, y compris les 152 « non précisé ». -->
        <dsfr-data-map-layer id="couche-lsf" source="f" type="circle"
          geo-field="position" radius="9" fill-opacity="0.8"
          color-field="langue"
          color-map="LSF1:#FF8D7E,LSF2:#FFC29E"
          color="#929292"
          tooltip-field="nom_etablissement">
        </dsfr-data-map-layer>

        <!-- 2. Couche d'accent : les 57 PEJS, en épingle par-dessus les disques.
             Forme différente, pas un disque de même rayon : le croisement reste lisible. -->
        <dsfr-data-map-layer id="couche-pejs" source="pejs" type="marker"
          geo-field="position" color="#000091"
          tooltip-field="nom_etablissement">
        </dsfr-data-map-layer>

        <!-- Légende non paginée : les deux couches concaténées. -->
        <dsfr-data-map-legend label="Nature de l'accompagnement"></dsfr-data-map-legend>

        <dsfr-data-map-popup mode="panel-right" title-field="nom_etablissement" width="380px">
          <template>
            {{#if dispositif}}<p class="fr-badge fr-badge--blue-ecume fr-badge--sm fr-mb-2v">Pôle d'enseignement des jeunes sourds</p>{{/if}}
            {{#if langue}}<p class="fr-text--sm fr-mb-2v">Langue des signes enseignée : <strong>{{langue:join: et }}</strong></p>{{/if}}
            {{#unless langue}}<p class="fr-text--sm fr-mb-2v">Niveau d'enseignement de la LSF non précisé dans les données.</p>{{/unless}}
            <p class="fr-text--sm fr-mb-1v">{{type_etablissement|Type non renseigné}} · {{statut_public_prive|statut non renseigné}}</p>
            <p class="fr-text--sm fr-mb-2v">
              <strong>{{libelle_departement|—}}</strong> — académie de {{libelle_academie|—}},
              région {{libelle_region|—}}
            </p>
            <ul class="fr-btns-group fr-btns-group--sm fr-btns-group--inline">
              {{#if fiche_onisep}}<li><a class="fr-link" href="{{fiche_onisep:url}}">Fiche ONISEP</a></li>{{/if}}
              {{#if web}}<li><a class="fr-link" href="{{web:url}}">Site de l'établissement</a></li>{{/if}}
            </ul>
            <p class="fr-text--xs fr-mb-0">UAI {{uai}}</p>
          </template>
        </dsfr-data-map-popup>

        <dsfr-data-map-inset territory="la-reunion" label="La Réunion"></dsfr-data-map-inset>
        <dsfr-data-map-inset territory="guyane" label="Guyane"></dsfr-data-map-inset>
        <dsfr-data-map-inset territory="mayotte" label="Mayotte"></dsfr-data-map-inset>
      </dsfr-data-map>

      <dsfr-data-a11y source="f" for="carte-lsf" table download
        filename="accompagnement-deficience-sensorielle-2024.csv"
        label="Données de la carte"
        label-field="nom_etablissement"
        value-field="dispositif, langue, type_etablissement, libelle_departement, libelle_academie">
      </dsfr-data-a11y>

      <h2 class="fr-h5 fr-mt-4w">Les 307 établissements</h2>
      <dsfr-data-list source="f"
        caption="Établissements accompagnant la déficience sensorielle, rentrée 2024"
        columns="nom_etablissement:Établissement, type_etablissement:Type, dispositif:Pôle, langue:LSF, libelle_departement:Département, libelle_academie:Académie"
        sort="libelle_departement:asc" pagination="25" export="csv">
      </dsfr-data-list>
    </div>
  </div>
</div>
```

## Limites et points durs identifiés

1. **Rendre trois catégories qui se recoupent avec un seul champ de couleur.**
   Obstacle : `color-field` lit **un** champ. `langue` en porte deux valeurs possibles,
   `dispositif` une troisième dimension orthogonale. Trois voies natives, par ordre de
   préférence :
   (a) **deux couches de formes différentes** — un `type="circle"` coloré par `langue` pour le
   fond, un `type="marker"` bleu pour les 57 PEJS par-dessus (retenu dans l'esquisse) : le
   croisement se lit, contrairement à l'original ;
   (b) **un champ dérivé** en `dsfr-data-normalize` combinant les trois indicateurs en une
   catégorie unique (« PEJS + LSF1 », « LSF2 seul », « non précisé »…) — 6 modalités, un seul
   `color-map`, une seule couche. Plus rigoureux mais la légende s'allonge, et **la grammaire
   de `compute` n'a pas été relue** ;
   (c) trois couches comme l'original, mais avec des rayons décroissants (`radius="12"`,
   `"9"`, `"6"`) pour que les points imbriqués restent visibles.
   **Non vérifié au navigateur** : le rendu du disque + épingle superposés.
   ⚠️ Ce n'est **pas** une limite de `dsfr-data`. L'original a le même problème et le résout
   moins bien : la bibliothèque offre au moins des formes et des rayons distincts, et une
   légende non paginée.

2. **La couche PEJS a besoin d'une seconde source, qui n'écoute pas les facettes.**
   Obstacle : `dsfr-data-map-layer` n'a pas de `where` propre ; pour ne montrer que les PEJS
   il faut une source (ou un `dsfr-data-query`) filtrée en amont. Dans l'esquisse, la source
   `pejs` porte `where="dispositif = 'PEJS'"` (dialecte ODSQL, correct pour l'adaptateur ODS) —
   mais elle **ne descend pas des facettes** : filtrer « Nord » réduira les disques et pas les
   épingles. Voie native à essayer **avant** de conclure : brancher la couche PEJS sur un
   `<dsfr-data-query source="f" where="dispositif:isnotnull">` (syntaxe colon côté query,
   cf. `attributeGrammars` § valeurs nulles) — la query consomme la sortie déjà filtrée des
   facettes et n'ajoute pas de requête réseau, les 307 lignes étant déjà en mémoire.
   **Non vérifié** : que `dsfr-data-query` accepte bien un `where` colon en aval d'un
   `dsfr-data-facets`. C'est le point le plus incertain de la transposition, et la voie query
   est presque certainement la bonne — l'esquisse garde la source dédiée pour rester lisible,
   mais **il faut la remplacer avant d'écrire la page**.

3. **Le champ `langue` multivalué dans `color-field`.**
   Obstacle : la valeur d'une ligne peut être `["LSF1","LSF2"]`. Que fait `color-map` sur un
   tableau ? La référence de `color-field` dit « champ dont la valeur détermine la couleur
   (mapping catégoriel via `color-map`) » et ne mentionne pas les tableaux. **Non vérifié** :
   il est probable que la comparaison échoue et que la ligne tombe sur le repli `color`
   (les 4 lignes LSF1+LSF2 apparaîtraient en gris, ce qui serait faux). Voie native à essayer :
   `color-field="lsf1"` (le champ indicateur mono-valué) plutôt que `langue`, ou le champ
   dérivé du point 1(b). **À trancher au navigateur sur les 4 lignes concernées** — c'est
   exactement le genre de grammaire silencieusement fausse contre laquelle le dépôt met en
   garde (PG-022).

4. **Les KPI « LSF1 » et « LSF2 ».**
   Obstacle : `lsf1` et `lsf2` sont des **textes** valant `"1"` ou `null` ; `value="lsf1:sum"`
   ne sommera rien sans conversion. Voie native : `<dsfr-data-normalize numeric="lsf1, lsf2">`
   en amont (grammaire vérifiée : entrées séparées par des **virgules**), puis `:sum`.
   Alternative sans normalisation : un `dsfr-data-query where="lsf1:isnotnull"` et un KPI
   `value="count"`. **Non vérifié** — et la liste des agrégats de `value` n'a pas été relue
   pour cette fiche.

5. **Les encarts ultramarins et le clip du fit.**
   Le jeu a **10 points ultramarins** (La Réunion 5, Guyane 3, Mayotte 2), donc les encarts
   sont justifiés — le piège BUG-004 (« `fit-bounds` + `max-bounds` sur un jeu sans DROM
   renvoie vide ») ne s'applique pas. **Mais 7 de ces 10 points sont des orphelins** : sur la
   couche de fond (qui les porte tous) les trois encarts sont peuplés ; sur la couche PEJS ils
   sont **tous vides** (aucun PEJS ultramarin, vérifié sur l'export). Trois encarts vides à
   côté d'une carte principale est un défaut visuel. Voie native : garder les encarts (la
   couche de fond les remplit) et accepter qu'ils ne montrent pas d'épingle. **À vérifier au
   navigateur** : filtrer « PEJS » dans la facette `dispositif` — la carte principale se
   recadre sur la métropole (bon) et les trois encarts se vident (à assumer explicitement,
   ou à masquer par CSS). Cas voisin à surveiller : filtrer sur « Guyane » alors que le
   `fit-zone` est clippé sur la métropole — le fit n'aura aucun point dans sa zone. La parade
   est `fit-zone="none"`, au prix du dézoom planétaire. **Arbitrage non tranché.**

6. **Les 2 lignes fantômes.**
   `getSkippedCount()` de la couche les comptera (positions absentes) sans les afficher ; elles
   fausseraient un KPI `count` de 2 unités. Voie native : `where="position is not null"` sur la
   source (dialecte ODSQL, ODS) — le compte tombe alors à 305, ce que la carte montre
   effectivement. À dire dans la page : deux enregistrements sont exclus faute de localisation.
   C'est plus honnête que l'original, qui les compte sans le dire.

7. **La légende sans `for`.**
   `<dsfr-data-map-legend>` sans `for` concatène les entrées de **toutes** les couches directes
   de la carte (vérifié en référence). Avec la couche de fond (`color-map` à 2 paires + repli
   gris) et la couche PEJS (monochrome, libellée par `label`), la liste devrait donner quatre
   entrées : LSF1, LSF2, « Autres valeurs » (le repli), et l'entrée PEJS. **Non vérifié** :
   le libellé de l'entrée « Autres valeurs » et celui de l'entrée monochrome, dont la référence
   dit qu'elle est libellée par le `label` de la légende — ce qui, avec une légende partagée,
   pourrait être ambigu. Repli sûr : **deux légendes** avec `for` et `label` explicites.

8. **Aucune limite de performance n'est en jeu.** 307 lignes, une requête, tout côté client.
   `max-items` (5 000) et `max-records` (1 000) sont largement au-dessus. Rien à chronométrer.

9. **Ce qui ne se transpose pas, et n'a pas à l'être.**
   - Le **géocodeur** et le **sélecteur de cinq fonds de carte** : voir
     [`implantation-ulis-tfv.md`](implantation-ulis-tfv.md), § « Limites », point 7.
   - La **légende paginée** : `dsfr-data-map-legend` rend une liste. **Écart assumé, et
     souhaitable** — c'est précisément le défaut n° 4.
   - Les **cinq contextes** : artefact du modèle ODS.

## Données à reproduire fidèlement

- [ ] Jeu `fr-en-carto-acc-sensoriel`, **307** lignes, **303** UAI distincts, **2** lignes
      sans position (à exclure et à signaler), **4** UAI en doublon (lycées multi-sites).
- [ ] **57 PEJS**, **37 LSF1**, **87 LSF2** — et les croisements : **18** PEJS∩LSF1,
      **6** PEJS∩LSF2, **4** LSF1∩LSF2. Les croisements doivent être **visibles**, pas
      recouverts.
- [ ] **152 établissements sans nature d'accompagnement précisée** : présents sur la carte,
      en gris, avec une entrée de légende. **C'est le test de fidélité qui distingue une
      reproduction d'un décalque** : l'original en perd la moitié en silence.
- [ ] Types : Lycée **114** · École **107** · Collège **82** · EREA **2** (+2 vides) —
      et un **filtre** par type, que l'original n'a pas.
- [ ] Secteur : Public **251** / **Privé 54** — et un filtre, que l'original n'a pas.
- [ ] **71 départements**, **28 académies**, **16 régions**.
- [ ] **10 points ultramarins** : La Réunion 5, Guyane 3, Mayotte 2. Trois encarts ciblés,
      pas `insets="drom"` (Guadeloupe et Martinique seraient vides), pas de dézoom planétaire.
- [ ] Palette conservée : `#000091` (PEJS) · `#FF8D7E` (LSF1) · `#FFC29E` (LSF2) —
      **avec une légende non paginée et des libellés qui disent quelque chose**, pas
      « Element » trois fois.
- [ ] Fiche de détail : les informations de l'original **plus** le type d'établissement, avec
      **conditionnelles** — pas de ligne vide en gras, pas de « Niveau d'enseignement de la
      LSF : » suivi de rien, pas de 110 + 115 liens morts. `langue` rendu « LSF1 et LSF2 ».
- [ ] LSF1 et LSF2 **définis** quelque part dans la page.
- [ ] Un tableau et un export CSV — accès non cartographique obligatoire sur ce sujet.

---

## Les trois moules de couches — ce que le motif multi-couches sert vraiment

Les trois pages du lot posent le même dispositif : un `ods-dataset-context` unique portant
N contextes sur **un seul jeu**, un `ods-map`, un `ods-map-layer-group`, N `ods-map-layer`,
un `ods-clear-all-filters`. Seul le N change — 5, 4, 3. Mise à plat :

| | **Label Égalité** (id 19) | **ULIS-TFV** (id 21) | **Déficience sensorielle** (id 20) |
|---|---|---|---|
| Jeu / lignes | `fr-en-label-egalite-fille-garcon` / **1 678** | `fr-en-ulis-tfv` / **52** | `fr-en-carto-acc-sensoriel` / **307** |
| Contextes déclarés | **7** (ctx1-4, ctx4bis, ctx5, ctx6) | **6** (ctx1-4, ctx5, ctx6) | **5** (ctx1-3, ctx5, ctx6) |
| Couches | **5** | **4** | **3** |
| Champ qui les sépare | `typeeple` | `type_etablissement` | `dispositif` **et** `langue` |
| Nature du découpage | partition (1 065+245+195+160+13 = 1 678) | partition (23+21+6+2 = 52) | **recouvrement** (57 ∪ 37 ∪ 87 = **155**, pas 181) |
| Couverture du jeu | **100 %** | **100 %** | **50,5 %** — 152 lignes hors de toute couche |
| Ce qui distingue visuellement les couches | **rien** (même `color-by-field`, même palette, même `dot`) | `color` **+** `picto` | `color` seul (même `dot`) |
| Incohérence interne | `display="auto"` sur la 3ᵉ couche, `categories` sur les 4 autres | — | — |
| Plage de zoom par couche | aucune | aucune | aucune |
| Source par couche | la même | la même | la même |
| Sélecteur de couche | **non** (`display-control="false"`) | **non** | **non** |
| Légende | **non** (`display-legend="false"`) | **non** | **oui**, mais **paginée 1/3**, trois entrées libellées « Element » |
| `clear-all-filters` — `except` | `[refine.typeeple]` **+** un `ng-click` qui vide tout | `[refine.type_etablissement]` | **aucun** |
| `clear-all-filters` — libellé | pictogramme seul | pictogramme seul | pictogramme seul |
| `clear-all-filters` — `ng-show` correct ? | **oui** | **non** (`\|\| ctx1['parameters']` toujours vrai) | **non** (idem) |
| `clear-all-filters` — effet observé | **désynchronise** : panneau vidé, carte toujours filtrée | **détruit le codage** : 4 couches identiques, tout devient bleu « École » | **fait basculer en clusters** : 3 × 307 points, une seule couleur, légende mensongère |
| Récupération | rechargement | rechargement | rechargement |
| Points ultramarins | 106 (La Réunion 99, Martinique 7) **+ 4 AEFE** (Maurice, Tunisie) | **1** (La Réunion) | **10** (Réunion 5, Guyane 3, Mayotte 2) |
| Recherche textuelle | oui, `q.textual` sur 5 champs — **casse le fond de carte** | non (emplacement vide) | non (emplacement vide) |

**Trois constats.**

**1. Sur deux pages sur trois, les couches multiples ne servent à rien.** Label et ULIS-TFV
découpent un champ **mono-valué** en N couches qui partitionnent exactement le jeu. C'est un
`refine` déguisé en couche, imposé par le modèle Opendatasoft — *un contexte = un jeu + un
filtre, une couche = un contexte* — et non par un besoin de représentation. La preuve est
dans le rendu : sur la page Label, les cinq couches portent le **même** `color-by-field`, la
**même** palette et le **même** pictogramme ; elles sont rigoureusement indiscernables. Sur
ULIS-TFV, les quatre couches se distinguent bien (couleur + picto), mais **cette distinction
est un encodage catégoriel**, pas une superposition : elle tiendrait dans une seule couche.

**2. Sur la troisième, elles servent — et la page ne l'exploite pas.** La page Déficience
sensorielle est la seule où les catégories **se recoupent** : `langue` est multivalué,
`dispositif` est orthogonal, 24 établissements appartiennent à deux couches. Là, une couche
unique colorée par un champ ne suffit pas : il faut bien deux marques pour un même point.
Mais la page annule son propre avantage — les trois couches emploient le même `picto="dot"`
du même rayon, si bien que la couche du dessus (PEJS) masque intégralement les 24 croisements.
Et elle laisse **152 lignes sur 307 hors de toute couche**, parce que trois refines
positifs ne couvrent pas le complémentaire.

**3. Le motif a un coût constant et un bug constant.** Coût : N contextes, N trains de
requêtes, N recadrages concurrents pour un jeu qui tient en une requête (52, 307, 1 678
lignes — **aucune de ces pages n'a de problème de volume**). Bug : sur les trois pages,
`ods-clear-all-filters` efface les `refine` qui définissent les couches, et **la carte ne s'en
remet pas sans rechargement**. L'`except` ne protège rien (ULIS-TFV), ou il est contredit par
un `ng-click` (Label), ou il est absent (Déficience sensorielle). Autrement dit : **le motif
multi-couches d'Opendatasoft porte son état sémantique dans des paramètres de contexte que le
widget de remise à zéro est conçu pour effacer.** Les trois pages tombent dans le même piège
par trois chemins différents.

**Ce que le motif devient en `dsfr-data`.**

- **Une couche, un `color-field`, un `color-map`, une légende** — pour les partitions
  (Label, ULIS-TFV). Le découpage catégoriel est un attribut de rendu, pas une multiplication
  d'objets. La légende, que deux pages sur trois n'ont pas, vient gratuitement et se
  rafraîchit à chaque filtre.
- **Une facette là où il y avait un `refine` de contexte.** `typeeple` et `type_etablissement`
  redeviennent ce qu'ils sont : des filtres. Avec compteurs et cascade natifs, ce que ni
  ctx6 ni les listes de radios ne donnaient.
- **Plusieurs couches quand — et seulement quand — les marques doivent coexister sur un même
  point** : la page Déficience sensorielle, avec une couche de fond en disques et une couche
  d'accent en épingles. Deux couches, pas trois, et des **formes** différentes plutôt que des
  disques identiques.
- **Plusieurs couches aussi pour ce qu'ODS ne faisait nulle part ici : les plages de zoom.**
  `min-zoom` / `max-zoom` par couche (exemple « multi-résolution » de la fiche `dsfrDataMap` :
  régions jusqu'au zoom 9, communes en `bbox` au-delà) et les **sources différentes par
  couche** sont les deux vraies raisons d'avoir plusieurs couches. Aucune des trois pages ne
  les utilise — les trois multiplient les couches pour la seule raison qu'elles ne peuvent pas
  faire autrement.
- **Et le bug de remise à zéro disparaît par construction** : il n'y a plus de `refine` porté
  par une couche à effacer. L'état sémantique de la carte est dans ses attributs, pas dans les
  paramètres d'un contexte.
