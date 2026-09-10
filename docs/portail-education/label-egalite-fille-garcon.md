# Label Égalité filles-garçons

- **URL** : https://data.education.gouv.fr/pages/label-egalite-fille-garcon0/
  (noter le **`0`** final du slug : la page « label-egalite-fille-garcon » sans zéro n'est pas
  celle du catalogue).
- **Catalogue** : id **19**, thématique **Vie scolaire**.
- **Titre de la page (`<title>`)** : « Cartographie de la labellisation "Egalité
  Filles-Garçons" » — avec des guillemets droits et sans accent à « Egalité ».
- **Jeu de données** : **`fr-en-label-egalite-fille-garcon`** — **1 678 lignes**, 13 champs,
  public. Titre ODS « Label Egalité Filles-Garçons », dernière modification **2026-01-29**,
  **Licence Ouverte v2.0 (Etalab)**. Description : le label « Égalité filles-garçons », créé
  par la circulaire du 10 mars 2022 (BOEN du 17 mars 2022), « vise à donner une meilleure
  lisibilité interne et externe, ainsi qu'une plus grande cohérence, aux actions engagées ou
  projetées dans l'établissement […] enfin à la prévention et la lutte contre les violences
  sexistes et sexuelles ».
  - **13 champs** : `identifiantuai` (text), `niveaudelabellisation` (**int**),
    `campagnedelabellisation` (text), `academie`, `secteur`, `typeeple`,
    `nom_des_etablissements`, `ville`, `libelle_departement`, `libelle_region`,
    `fiche_onisep`, `web`, `position` (geo_point_2d).
  - **Facettes déclarées au back-office** : `secteur`, `libelle_region`, `academie`,
    `libelle_departement` (quatre). **Ni `niveaudelabellisation`, ni `campagnedelabellisation`,
    ni `typeeple` ne sont déclarés en facette** — la page les obtient tout de même via
    `ods-facet-results`, qui ne s'appuie pas sur la déclaration back-office.
- **Relevé visuel** : 2026-09-10, Chrome, fenêtre 1568 × 751.
- **Gabarit** : même moule que les deux autres pages du lot — voir
  [`implantation-ulis-tfv.md`](implantation-ulis-tfv.md), § « Gabarit partagé », pour tout ce
  qui est strictement identique (structure `map-drawer-container`, `ods-map` centrée sur le
  Sahara occidental, `ods-results-max="1"`, liens ONISEP/site inconditionnels, listes de
  facettes sur un ctx6 jamais filtré).

## Objectif de la dataviz et informations véhiculées

- **Question à laquelle elle répond** : « Quels établissements ont obtenu le label Égalité
  filles-garçons, à quel niveau, et lors de quelle campagne ? » C'est une **carte de
  reconnaissance** : elle valorise les établissements labellisés et permet à une famille ou à
  un chef d'établissement de repérer les voisins engagés.
- **Message porté** : la diffusion progressive du label depuis sa création en 2022. Le jeu la
  porte (479 labellisations en 2022-2023, 645 en 2023-2024, 554 en 2024-2025) — **la page ne
  la montre nulle part** : pas de courbe, pas de KPI, pas de commentaire, et l'année n'est
  qu'un filtre parmi cinq.
- **Information que l'utilisateur doit obtenir** : pour un établissement donné, son nom, sa
  ville, son UAI, son type, son secteur, son département, son académie, sa région, son niveau
  de label, sa campagne, et deux liens sortants.
- **Ce qui n'est pas dans l'objet** :
  - **aucune définition des niveaux 1, 2 et 3** — la page les affiche comme des chiffres nus
    dans un filtre et dans la fiche, sans dire ce qu'ils signifient (le référentiel national
    annexé à la circulaire de mars 2022 définit trois paliers ; rien de tout cela n'est dit) ;
  - **aucun dénombrement** : ni « 1 678 labellisations », ni « 1 529 établissements », ni le
    compte d'une sélection ;
  - **aucune série temporelle**, alors que la campagne est le seul axe de progression du
    dispositif ;
  - **aucune notion de trajectoire** : 140 établissements ont été labellisés lors de plusieurs
    campagnes, souvent en montant de niveau (voir « Défauts », point 2) — la page ne le montre
    pas, et empile leurs points au même endroit ;
  - **aucun lien vers le jeu de données ni vers la circulaire**, aucun téléchargement ;
  - **aucun titre visible** : pas de H1, pas de chapô, pas de mention de licence.

## Chiffres de référence (export `/exports/json?limit=-1`, 1 678 lignes)

| Mesure | Valeur |
|---|---|
| **Lignes (= labellisations)** | **1 678** |
| **UAI distincts (= établissements)** | **1 529** — dont **140 apparaissent plusieurs fois** (289 lignes), **9** apparaissent 3 fois ou plus |
| Lignes sans `position` | **0** |
| `typeeple` | COLLEGE **1 065** · LEGT **245** · LPO **195** · LP **160** · EREA **13** (= 1 678) |
| `niveaudelabellisation` | **1 : 1 013** · **2 : 568** · **3 : 97** |
| `campagnedelabellisation` | 2023-2024 **645** · **2024-2025 553** · 2022-2023 **479** · **`2024- 2025` (avec une espace) : 1** |
| Campagne × niveau | 2022-2023 : 293/165/21 · 2023-2024 : 395/206/44 · 2024-2025 : 324/197/32 |
| `secteur` | Public **1 644** · Privé **34** (2,0 %) |
| Régions | **16** — Île-de-France 230 · Auvergne-Rhône-Alpes 193 · Nouvelle-Aquitaine 172 · Hauts-de-France 152 · Occitanie 151 · PACA 151 · Normandie 119 · **La Réunion 99** · Grand Est 100 · Bourgogne-Franche-Comté 96 · Bretagne 88 · Pays de la Loire 65 · Centre-Val de Loire 29 · Corse 22 · **Martinique 7** · **AEFE 4** |
| Académies | **29**, dont **Maurice** et **Tunisie** (voir ci-dessous) |
| « Départements » | **98**, dont **Maurice** et **Tunisie** |
| Villes distinctes | **981** |
| Top académies | Normandie 119 · Versailles 113 · Lille 100 · La Réunion 99 · Montpellier 92 · Clermont-Ferrand 88 |
| Top départements | **La Réunion 99** · Pas-de-Calais 64 · Bouches-du-Rhône 51 · Puy-de-Dôme 45 · Hérault 44 · Gironde 43 |
| **Points hors métropole** | **110** : La Réunion 99, Martinique 7, **Maurice 2, Tunisie 2** |
| Emprise | lat **−21,377** (La Réunion) → 50,960 · lon **−61,038** (Martinique) → **57,530** (Maurice) |
| Liens renseignés | `fiche_onisep` 1 670/1 678 · `web` 1 599/1 678 (**79 sans site**) |

**Les 4 lignes « AEFE »** (réseau des établissements français à l'étranger), toutes campagne
2024-2025, portent le nom du pays dans `libelle_departement` **et** dans `academie` :

| Établissement | Ville | « Département » | « Académie » | Type | Niveau |
|---|---|---|---|---|---|
| Collège La Bourdonnais | Curepipe | Maurice | Maurice | COLLEGE | 3 |
| Lycée La Bourdonnais | Curepipe | Maurice | Maurice | LEGT | 3 |
| Collège Pierre Mendès France | Tunis | Tunisie | Tunisie | COLLEGE | 2 |
| Lycée Pierre Mendès France | Tunis | Tunisie | Tunisie | LEGT | 2 |

## Le template AngularJS

`_sources/label-egalite-fille-garcon0.html`. **Un seul `<ods-dataset-context>`, sept contextes
sur le même jeu** — c'est la page du lot qui en a le plus :

```html
<ods-dataset-context context="ctx1,ctx2,ctx3,ctx4,ctx4bis,ctx5,ctx6"
  ctx1-dataset="fr-en-label-egalite-fille-garcon" ctx1-parameters="{'refine.typeeple':'COLLEGE'}"
  ctx2-…                                          ctx2-parameters="{'refine.typeeple':'LEGT'}"
  ctx3-…                                          ctx3-parameters="{'refine.typeeple':'LPO'}"
  ctx4-…                                          ctx4-parameters="{'refine.typeeple':'LP'}"
  ctx4bis-…                                       ctx4bis-parameters="{'refine.typeeple':'EREA'}"
  ctx5-…    <!-- fiche de détail, refine sur identifiantuai -->
  ctx6-…>   <!-- source des listes de facettes, jamais filtré -->
```

Le nommage `ctx4bis` trahit l'ajout tardif d'une cinquième couche dans un gabarit qui en
comptait quatre.

**La carte** : `display-control="false"` (pas de sélecteur de couche) **et
`display-legend="false"` (pas de légende)** — comme sur ULIS-TFV, et contrairement à la page
Déficience sensorielle.

**Les cinq couches**, dans l'ordre du DOM :

| Ordre | Contexte | `refine` du contexte | Lignes | `display` | `picto` |
|---|---|---|---|---|---|
| 1 | ctx1 | `typeeple:COLLEGE` | 1 065 | `categories` | `dot` |
| 2 | ctx2 | `typeeple:LEGT` | 245 | `categories` | `dot` |
| 3 | ctx3 | `typeeple:LPO` | 195 | **`auto`** | `dot` |
| 4 | ctx4 | `typeeple:LP` | 160 | `categories` | `dot` |
| 5 (au-dessus) | ctx4bis | `typeeple:EREA` | 13 | `categories` | `dot` |

**Les cinq couches portent exactement les mêmes attributs de style** :

```html
color-by-field="niveaudelabellisation"
color-categories="{'1':'#21AB88','2':'#FFCA00','3':'#FF9575'}"
picto="dot" show-marker="false" point-opacity="1" shape-opacity="0.5"
border-color="#FFFFFF" border-opacity="1" border-pattern="solid" border-size="1"
caption="true" tooltip-disabled="true"
refine-on-click-context="ctx5"
refine-on-click-ctx5-context-field="identifiantuai"
refine-on-click-ctx5-map-field="identifiantuai"
refine-on-click-ctx5-replace-refine="true"
```

**Ce qui distingue les couches : rien de visible.** Même jeu, même champ de couleur, même
palette, même pictogramme, même opacité, aucun `min-zoom`/`max-zoom`. La seule différence
réelle est le `display` de la troisième (`auto` au lieu de `categories`) — un oubli, pas une
intention. **Les cinq couches produisent donc exactement le même rendu qu'une couche unique
sur les 1 678 lignes**, au prix de cinq contextes, cinq jeux de requêtes et cinq recadrages.
Elles sont **toutes visibles simultanément**, sans sélecteur.

Le `description` des cinq couches est d'ailleurs recopié d'une autre page :
« Ce jeu de données vous permet de connaitre les écoles et les établissements engagés dans la
démarche du CNR Education "Notre école, faisons-la ensemble". » — et leur `title` est
« Ecoles et établissements engagés dans la démarche du CNR Education - **copie** ». Ces deux
chaînes ne sont jamais affichées (pas de légende, pas de sélecteur de couche), mais elles
disent d'où vient le gabarit.

**Chaque couche est donc un `refine.typeeple` déguisé en couche.** Les cinq refines partitionnent
exactement le jeu (1 065 + 245 + 195 + 160 + 13 = 1 678), sans reste ni recouvrement.

## Relevé visuel exhaustif

Pas d'en-tête, pas de H1 : la page démarre sur le composite carte + panneau.

### 1. Panneau de filtres (~330 px, superposé à la carte, à gauche)

**a. Champ « Rechercher un lieu »** — le géocodeur d'`ods-map` (`search-box="true"`). Il
déplace la vue, il ne filtre pas.

**b. Titre « Filtrer les projets »**, centré, en gras. Le mot « projets » est repris d'une page
CNR ; ici ce sont des labellisations d'établissements, pas des projets.

**c. Champ de recherche textuelle** — un `<input type="text">` nu, **sans libellé, sans
placeholder, sans loupe** : un rectangle bordé, seul sous le titre. C'est le vrai filtre
textuel de la page (contrairement à ULIS-TFV, où l'emplacement était resté vide). Il pose sur
les cinq contextes de couches :

```
q.textual = #search(nom_des_etablissements,'X') OR #search(academie,'X')
         OR #search(ville,'X') OR #search(libelle_departement,'X')
         OR #search(libelle_region,'X')
```

Cinq champs interrogés en OU. **Comportement observé** avec « Bastia » (7 labellisations dans
le jeu) : le filtre s'applique et la carte se recadre — mais **le fond de carte disparaît
entièrement**. Après 16 s d'attente, la zone de carte est un **rectangle blanc** à l'échelle
100 km, sans une seule tuile IGN, avec un unique point vert visible tout en bas. Reproduit une
seconde fois. Voir « Défauts », point 6.

**d. Accordéon « Niveau de labellisation : »** — trois boutons radio **`1`, `2`, `3`**,
**sans aucune explication de ce que valent ces niveaux**, sans compteur. Vérifié : cocher
« 3 » filtre bien la carte, dont tous les points deviennent saumon (`#FF9575`) — 97
labellisations.

**e. Accordéon « Campagne de labellisation : »** — **quatre** boutons radio :

- `2022-2023`
- `2023-2024`
- **`2024- 2025`** ← avec une espace après le tiret
- `2024-2025`

**La faute de saisie du jeu est visible à l'écran comme une quatrième campagne.** Elle ne
concerne qu'une ligne : le collège Trianon du François (Martinique), niveau 1. Un utilisateur
qui la choisit obtient une carte à un point ; celui qui choisit « 2024-2025 » en perd un.

**f. Accordéon « Type d'établissement : »** — cinq boutons radio, avec les libellés en clair
(les seuls du lot) :

| Libellé affiché | Valeur posée (`q.eple`) | Lignes |
|---|---|---|
| Collèges | `typeeple:COLLEGE` | 1 065 |
| Lycées d'enseignement général et technologique | `typeeple:LEGT` | 245 |
| Lycées polyvalents | `typeeple:LPO` | 195 |
| Lycées professionnels | `typeeple:LP` | 160 |
| EREA | `typeeple:EREA` | 13 |

Comme sur ULIS-TFV, la mécanique est une **requête `q.eple` posée sur les cinq contextes qui
portent déjà chacun un `refine.typeeple` différent** : la sélection agit par intersection, pas
par choix de couche. Le titre de l'accordéon affiche ensuite la **valeur brute**
(« Type d'établissement : COLLEGE ») via `(… | split:[':'])[1]`.

**g. Accordéon « Secteur : »** — boutons radio issus de `ods-facet-results` sur ctx6 :
**Privé** et **Public**, sans compteur (34 et 1 644 dans le jeu).

**h. Accordéon « Territoires »** — conteneur qui déplie deux sous-accordéons :

- **« Départements : »** — **96 boutons radio** listés à l'écran, tri alphanumérique, sans
  compteur, de Ain à Yvelines — **avec `Maurice` et `Tunisie` au milieu**, entre Martinique et
  Mayenne pour l'un, entre Territoire de Belfort et Val-d'Oise pour l'autre.
- **« Académies : »** — **29 boutons radio**, également avec **Maurice** et **Tunisie** :
  Aix-Marseille · Amiens · Besançon · Bordeaux · Clermont-Ferrand · Corse · Créteil · Dijon ·
  Grenoble · La Réunion · Lille · Limoges · Lyon · Martinique · **Maurice** · Montpellier ·
  Nancy-Metz · Nantes · Nice · Normandie · Orléans-Tours · Paris · Poitiers · Reims · Rennes ·
  Strasbourg · Toulouse · **Tunisie** · Versailles.

Ces deux listes viennent de ctx6, **jamais filtré** : elles ne cascadent pas et n'affichent
aucun compte.

**i. L'icône ⊗ de remise à zéro** — deux emplacements :

```html
<ods-clear-all-filters context="[ctx1,ctx2,ctx3,ctx4,ctx4bis]"
  except="[refine.typeeple]"
  ng-click="ctx1.parameters={}; ctx2.parameters={}; ctx3.parameters={};
            ctx4.parameters={}; ctx4bis.parameters={};"
  ng-show="ctx1.parameters['q.eple'] || ctx1.parameters['refine.niveaudelabellisation']
        || ctx1.parameters['refine.campagnedelabellisation'] || ctx1.parameters['refine.secteur']
        || ctx1.parameters['refine.libelle_departement'] || ctx1.parameters['refine.academie']">
```

- **Libellé** : aucun, un pictogramme seul, à droite de « Filtrer les projets ».
- Contrairement à ULIS-TFV, le `ng-show` est ici **correct** : le ⊗ n'apparaît que lorsqu'un
  filtre est posé. Vérifié à l'écran.
- **Mais le `ng-click` écrase les paramètres des cinq contextes par un objet vide**, ce qui
  emporte aussi les `refine.typeeple` que l'`except` prétendait protéger.
- Chaque accordéon porte en plus **sa propre croix ⊗**, qui ne remet à zéro que son filtre.
- **Effet observé** — voir « Défauts », point 5 : la remise à zéro **désynchronise le panneau
  et la carte**.

### 2. La carte

- **Fond** : tuiles IGN via Huwise, mêmes contrôles que sur ULIS-TFV (5 fonds au sélecteur de
  calques, +/−, plein écran, échelle).
- **Cadrage au chargement** : **le monde**, échelle 1 000 km. Visible : la masse française,
  un point jaune isolé en Tunisie, un point vert isolé en Martinique, un point saumon en bas à
  droite près de Maurice. **Quatre points d'un réseau étranger étirent la vue du Pacifique
  américain à l'océan Indien.**
- **Rendu des points, sans filtre** : `display="categories"` sur 1 678 points produit, au zoom
  initial, des **halos blancs semi-transparents qui se recouvrent** au point de former une
  **tache blanche informe sur toute la métropole**, dans laquelle on devine quelques éclats
  verts et jaunes. C'est le premier écran de la page. Zoomé, on distingue des disques
  agrégés à liseré blanc, colorés par catégorie dominante.
- **Rendu filtré** : avec « Niveau 3 » (97 points), les mêmes couches rendent des **disques
  saumon pleins à liseré blanc**, lisibles, encore largement superposés sur la moitié nord.
- **Palette** : `#21AB88` (vert, niveau 1) · `#FFCA00` (jaune, niveau 2) · `#FF9575` (saumon,
  niveau 3). **Aucune légende ne l'explique.**
- **Survol** : rien (`tooltip-disabled="true"`).
- **Recadrage** : automatique à chaque filtre (`no-refit="false"`), toujours en avance sur le
  chargement des tuiles.

### 3. Le tiroir de détail (au clic sur un point)

Panneau blanc glissant depuis la droite, bandeau de titre bleu France. Relevé mot pour mot sur
l'EREA d'Ajaccio (UAI 6200636X) :

> **Établissement régional d'enseignement adapté - Ajaccio**
>
> Numéro UAI : 6200636X
> Type d'établissement : EREA
> Secteur : Public
> Département : Corse-du-Sud
> Académie : Corse
> Région : Corse
>
> Fiche ONISEP - Site web
>
> Niveau de labellisation : 3
> Campagne de labellisation : 2023-2024

- Le titre concatène `nom_des_etablissements` et `ville` par un tiret.
- **Le type est affiché en code** (« EREA », et « COLLEGE », « LEGT », « LPO », « LP » pour les
  autres) alors que le filtre juste à côté, lui, affiche « Lycées d'enseignement général et
  technologique ». Les deux libellés coexistent dans la même page.
- **« Niveau de labellisation : 3 »** — le chiffre nu, sans échelle ni explication.
- « Fiche ONISEP » et « Site web » sont **rendus inconditionnellement** : 8 fiches sur 1 678
  ont un lien ONISEP mort, **79 un lien « Site web » mort**.
- Ordre étrange : les deux informations qui font l'objet de la page (**niveau** et
  **campagne**) sont reléguées **après** les liens sortants, en bas de fiche.
- **Un seul enregistrement affiché** (`ods-results-max="1"`) alors que le refine porte sur
  `identifiantuai` : pour les 140 établissements labellisés plusieurs fois, **le tiroir n'en
  montre qu'une seule campagne** — sans dire qu'il y en a d'autres.
- **Le tiroir contient déjà un enregistrement au chargement**, avant tout clic : ctx5 est
  monté sans refine, `ods-results-max="1"` prend donc la première ligne du jeu (Lycée Jules
  Siegfried, Le Havre). Le tiroir est visuellement hors cadre, mais **son contenu est dans le
  DOM et lisible par un lecteur d'écran** dès le chargement.

### 4. Console et réseau

Aucun message en console au chargement (suivi activé puis rechargement complet).

## Défauts et bizarreries de l'original

1. **Cinq couches pour un seul rendu.** Les cinq `ods-map-layer` ont le même jeu, le même
   `color-by-field`, la même palette, le même `picto`, la même opacité et aucune plage de zoom :
   elles sont indiscernables à l'écran. Le seul écart entre elles est un `display="auto"` sur la
   troisième au lieu de `display="categories"` — donc une **incohérence de rendu non voulue**
   pour les 195 lycées polyvalents. Avec `display-control="false"`, l'utilisateur ne peut pas
   même s'en servir pour éteindre un type. Cinq contextes, cinq trains de requêtes, un résultat
   identique à celui d'une couche unique.
2. **1 678 lignes pour 1 529 établissements, et rien ne le dit.** 140 établissements ont été
   labellisés lors de plusieurs campagnes (9 lors de trois campagnes ou plus). Sur la carte,
   leurs points se superposent **exactement** (même `position`) ; dans le tiroir, une seule des
   campagnes s'affiche. Un utilisateur qui compte les points croit compter des établissements.
   L'exemple type : le lycée Jules Siegfried du Havre, niveau 2 en 2022-2023 puis **niveau 3 en
   2023-2024** — une montée en niveau que la page rend invisible, alors que c'est exactement ce
   que le dispositif cherche à encourager.
3. **La carte non filtrée est une tache blanche.** `display="categories"` sur 1 678 points à
   l'échelle 1 000 km produit des halos qui se recouvrent jusqu'à effacer la France. Le premier
   écran de la page ne montre aucune information exploitable.
4. **Trois niveaux affichés en chiffres nus, jamais définis.** Ni dans le filtre (`1` `2` `3`),
   ni dans la fiche (« Niveau de labellisation : 3 »), ni ailleurs. La page suppose que le
   lecteur connaît le référentiel de la circulaire de mars 2022.
5. **`clear-all-filters` désynchronise le panneau et la carte.** Vérifié : (a) filtre
   « Niveau 3 » → 97 points saumon ; (b) clic sur le ⊗ → tous les radios se décochent, les
   croix des accordéons disparaissent, **le panneau annonce donc « aucun filtre »** ; (c) la
   carte, elle, **continue d'afficher les 97 points de niveau 3**, et l'état est stable
   (revérifié après 8 s puis 15 s). L'interface ment sur son propre état ; seul un rechargement
   rétablit la cohérence. Le `ng-click="ctxN.parameters={}"` accolé au widget écrase des
   paramètres que l'`except="[refine.typeeple]"` était censé préserver, et les couches restent
   sur leur dernier jeu de données.
6. **La recherche textuelle fait disparaître le fond de carte.** Vérifié deux fois sur une page
   fraîchement chargée : taper « Bastia » (7 labellisations) filtre bien — les points superflus
   disparaissent — mais la zone de carte devient un **rectangle blanc**, sans une seule tuile
   IGN, échelle 100 km, avec un point vert au ras du bord inférieur. Le fond ne revient pas.
   Le résultat de la recherche est donc géographiquement illisible.
7. **Une campagne fantôme dans le filtre.** `2024- 2025`, avec une espace parasite, apparaît
   comme une **quatrième option** à côté de `2024-2025`. Une ligne concernée (collège Trianon,
   Le François, Martinique). C'est une valeur non nettoyée à l'import, exposée telle quelle par
   `ods-facet-results`.
8. **« Maurice » et « Tunisie » figurent dans la liste des Départements.** Et dans celle des
   Académies. Les 4 établissements AEFE portent le nom du pays dans `libelle_departement` et
   `academie` ; le filtre « Départements » propose donc deux pays parmi 96 entrées. Ce n'est pas
   la page qui invente : c'est le jeu qui range un pays dans une colonne « département », et la
   page qui n'en dit rien.
9. **Quatre points étirent la carte du continent américain à l'océan Indien.** Le fit embrasse
   la Martinique (−61,04) et Maurice (+57,53) : la vue par défaut est planétaire. Aucun encart,
   aucune option pour se recentrer sur la métropole.
10. **Le type d'établissement est affiché en code dans la fiche** (« COLLEGE », « LEGT »)
    alors que le filtre, dans la même page, l'affiche en clair. Et le titre du filtre, lui,
    repasse au code une fois la sélection faite (« Type d'établissement : COLLEGE »).
11. **Le champ de recherche n'a ni libellé, ni placeholder, ni loupe** : un rectangle nu.
    Aucun indice de ce qu'on peut y taper, ni de la portée de la recherche (5 champs).
12. **Le tiroir affiche un établissement avant tout clic.** Contenu dans le DOM au chargement
    (Lycée Jules Siegfried, Le Havre) — invisible à l'œil, lu par les lecteurs d'écran.
13. **Le gabarit n'a pas été nettoyé** : les cinq couches s'intitulent « Ecoles et
    établissements engagés dans la démarche du CNR Education - **copie** » et décrivent le CNR,
    le titre du panneau parle de « projets », et le contexte de la cinquième couche s'appelle
    `ctx4bis`.
14. **8 liens ONISEP et 79 liens « Site web » morts**, rendus sans condition.
15. **Ni H1, ni total, ni date, ni lien vers le jeu, ni mention de licence** — alors que le jeu,
    lui, est en Licence Ouverte v2.0 et que la page pourrait renvoyer vers la circulaire
    fondatrice, qui est le seul document expliquant les trois niveaux.
16. **L'URL n'est pas un état partageable** : aucun `urlsync`.

## Transposition vers `dsfr-data`

Attributs vérifiés dans la référence générée depuis le source
(`get_skill(dsfrDataMap|dsfrDataFacets|dsfrDataSource|dsfrDataSearch|dsfrDataList|dsfrDataA11y,
"reference")`, `get_skill(attributeGrammars, "guide")`) et par lecture de
`~/Developer/GitHub/dsfr-data/packages/core/src/components/dsfr-data-map-layer.ts`.
Ce qui est commun aux trois pages du lot (source unique, popup en `panel-right`, suppression
des contextes de service, liens conditionnels, `dsfr-data-a11y`) est détaillé dans
[`implantation-ulis-tfv.md`](implantation-ulis-tfv.md) et n'est pas répété ici.

| Original Opendatasoft | `dsfr-data` | Attributs nécessaires |
|---|---|---|
| `<ods-dataset-context context="ctx1,…,ctx6">` — **7 contextes, 1 jeu** | **un seul `<dsfr-data-source>`** | `api-type="opendatasoft"`, `base-url="https://data.education.gouv.fr"`, `dataset-id="fr-en-label-egalite-fille-garcon"`, `api-key-ref`, **`max-records="2000"`**. ⚠️ **1 678 > 1 000** : le plafond par défaut de l'adaptateur ODS tronquerait **en silence** (piège maison). C'est le seul des trois jeux du lot concerné. |
| **5 × `<ods-map-layer>`** distinguées par `refine.typeeple` seul | **1 seule `<dsfr-data-map-layer>`** | `type="circle"`, `geo-field="position"`, `radius="6"`, `fill-opacity="0.85"`, `color-field="niveaudelabellisation"`, `color-map="1:#21AB88,2:#FFCA00,3:#FF9575"` (**virgules**), `color="#929292"` (repli). Le `typeeple` devient une **facette**, pas une couche. Les cinq couches ODS sont un artefact du modèle « un contexte, un filtre » : les transposer une pour une produirait cinq couches identiques — l'erreur que le CLAUDE.md du dépôt interdit explicitement. |
| `color-by-field` + `color-categories="{'1':…}"` (JSON) | `color-field` + `color-map` | Grammaire différente : **paires `valeur:#couleur` séparées par des virgules**, pas de JSON, pas d'accolades. Une grammaire fausse est silencieuse (PG-022) — vérifiée en référence et dans l'exemple « couleurs catégorielles » de la fiche `dsfrDataMap`. |
| `display="categories"` / `display="auto"` (agrégation ODS, halos blancs) | `cluster` **ou** rien | Pas d'équivalent de l'agrégation en camemberts d'ODS, et c'est heureux : c'est ce qui produit la tache blanche (défaut n° 3). Deux voies natives : `type="circle" radius="5"` sans agrégation (1 678 cercles, sous les 5 000 de `max-items`), ou `cluster cluster-radius="60"` pour des pastilles chiffrées. Le `display="auto"` divergent de la 3ᵉ couche disparaît de lui-même. |
| `display-legend="false"` | `<dsfr-data-map-legend>` | `for="<id de la couche>"`, `label="Niveau de labellisation"`. Trois entrées, une par paire de `color-map`, texte porteur de sens. **Et il faut nommer les niveaux** : `color-map="1:…"` produit l'entrée « 1 ». Le libellé lisible se pose en amont — voir « Limites », point 2. |
| `display-control="false"` | sans objet | Une couche : rien à allumer. Le sélecteur est remplacé par la facette `typeeple`. |
| `location="3,…"` + fit jusqu'à Maurice | `<dsfr-data-map>` | `center="46.6,2.3"`, `zoom="6"`, `height`, `tiles="ign-plan"`, `tiles-style="muted"`, `fit-bounds`, `fit-max-zoom="12"`, **`insets="la-reunion,martinique"`**, `name`. Le jeu a **99 points réunionnais et 7 martiniquais** : les encarts sont justifiés et ciblés. Avec un encart ultramarin et sans `max-bounds`, `resolveFitZone()` clippe le fit sur la métropole — ce qu'on veut. **Maurice et Tunisie n'ont pas d'encart** : 4 points hors territoire national, à traiter à part (« Limites », point 5). |
| Encarts | `<dsfr-data-map-inset>` × 2 | `territory="la-reunion"` et `territory="martinique"`, `label`. Largeur par défaut 10 rem posée par la carte (#643) : rien à écrire. Ils réutilisent automatiquement la couche **et** le popup de la carte hôte. |
| `<input ng-change="… q.textual = #search(a,'X') OR #search(b,'X') …">` (5 champs, sans libellé) | `<dsfr-data-search>` | `fields="nom_des_etablissements, ville, libelle_departement, academie, libelle_region"` (**virgules** — exactement les 5 champs de l'original), `label`, `placeholder`, `count`. Un attribut remplace la concaténation ODSQL, et `count` donne le compte de résultats que l'original n'affiche jamais. Filtrage local sur 1 678 lignes chargées : pas de `server-search`. |
| Accordéons Niveau / Campagne / Type / Secteur / Départements / Académies (6 listes de radios sur ctx6) | **un seul `<dsfr-data-facets>`** | `fields="niveaudelabellisation, campagnedelabellisation, typeeple, secteur, libelle_departement, academie"` (**virgules**), `labels="… \| …"` (**barres**), `display="…:select \| …:select \| …"` (**barres**), `sort="alpha:asc"`. Les compteurs sont affichés par défaut et **cascadent** en mode local : filtrer sur « La Réunion » réduit la liste des académies avec les bons comptes. C'est le défaut « listes non cascadées, sans compteur » réglé sans attribut supplémentaire. |
| `<ods-clear-all-filters>` (pictogramme seul, désynchronise) | rien à transposer | Une facette `select` se remet à zéro par son option vide, et `dsfr-data-search` expose `clear()`. Pas de bouton global qui puisse mentir sur l'état. |
| `ctx5` + tiroir + `refine-on-click-*` | `<dsfr-data-map-popup>` + `<template>` | `mode="panel-right"`, `title-field="nom_des_etablissements"`, `width="380px"`. `{{#if}}` pour les liens (règle les 87 liens morts), `{{champ:url}}` dans les `href`. `refine-on-click="identifiantuai"` (+ `context`, `label`) est **natif et publié depuis la 0.23.0** (#681, ADR-104 ; vérifié dans les bundles npm : absent en 0.20.0/0.21.0/0.22.0, présent en 0.23.0 = `latest`) — **le dépôt épingle encore `dsfr-data@0.20.0` sur ses 26 pages, c'est donc une montée de version à faire côté banc d'essai, pas un manque de la bibliothèque**. Pour afficher la fiche, le popup reste préférable (pas de contexte à consommer) ; l'attribut sert ici à autre chose — voir « Limites », point 10. |
| — (absent : le multi-labellisation) | `<dsfr-data-query>` + `<dsfr-data-list>` | `group-by="identifiantuai"` pour compter les établissements distincts (1 529) ; une liste par établissement avec ses campagnes. Voir « Limites », point 3. |
| — (absent : la progression du dispositif) | `<dsfr-data-query>` + `<dsfr-data-chart>` | `group-by="campagnedelabellisation, niveaudelabellisation"`, `aggregate="count"`, puis `type="bar"` empilé. La seule série temporelle du jeu, que la page ignore. |
| — (absent) | `<dsfr-data-kpi>` × 3 | `value="count"` (source client, non paginée), `heading`, `label`, `col`. 1 678 labellisations · 1 529 établissements · 97 au niveau 3. |
| — (absent) | `<dsfr-data-list>` + `<dsfr-data-a11y>` | Tableau paginé, tri, export CSV, liaison ARIA à la carte. |
| Valeur `2024- 2025` (faute de saisie) | `<dsfr-data-normalize>` | `replace-fields` — voir « Limites », point 4 : **la grammaire ne permet pas** de remplacer cette valeur (deux-points réservés ? non : ici c'est l'espace et la comparaison stricte). À trancher. |

### Esquisse de code

```html
<!-- 1 678 lignes : max-records EXPLICITE, le défaut ODS de 1 000 tronquerait en silence. -->
<dsfr-data-source id="label"
  api-type="opendatasoft"
  base-url="https://data.education.gouv.fr"
  dataset-id="fr-en-label-egalite-fille-garcon"
  api-key-ref="education-lecture"
  max-records="2000">
</dsfr-data-source>

<!-- Niveaux lisibles et campagne nettoyée : à confirmer, cf. « Limites » 2 et 4. -->
<dsfr-data-normalize id="clean" source="label"
  replace-fields="campagnedelabellisation:2024- 2025:2024-2025">
</dsfr-data-normalize>

<div class="fr-container fr-mt-6w">
  <h1>Le label « Égalité filles-garçons » dans les établissements</h1>
  <p class="fr-text--lead">
    Créé par la <a class="fr-link" href="https://www.education.gouv.fr/bo/22/Hebdo11/MENE2206740C.htm">circulaire
    du 10 mars 2022</a>, le label distingue les collèges et lycées engagés contre les
    stéréotypes de genre et les violences sexistes. Depuis 2022,
    <strong>1 529 établissements</strong> ont été labellisés, pour
    <strong>1 678 labellisations</strong> — 140 d'entre eux l'ont été plusieurs fois.
    Le <strong>niveau 1</strong> reconnaît un engagement, le <strong>niveau 2</strong> une
    démarche structurée, le <strong>niveau 3</strong> une politique aboutie : 1 013, 568 et
    97 labellisations respectivement.
  </p>

  <dsfr-data-search id="q" source="clean" count
    fields="nom_des_etablissements, ville, libelle_departement, academie, libelle_region"
    label="Rechercher un établissement, une ville, un département"
    placeholder="Bastia, Jules Siegfried, Pas-de-Calais…">
  </dsfr-data-search>

  <div class="fr-grid-row fr-grid-row--gutters fr-mt-3w">
    <div class="fr-col-12 fr-col-md-3">
      <h2 class="fr-h6">Filtrer</h2>
      <dsfr-data-facets id="f" source="q"
        fields="niveaudelabellisation, campagnedelabellisation, typeeple, secteur, libelle_departement, academie"
        labels="niveaudelabellisation:Niveau de label | campagnedelabellisation:Campagne | typeeple:Type d'établissement | secteur:Secteur | libelle_departement:Département | academie:Académie"
        display="niveaudelabellisation:select | campagnedelabellisation:select | typeeple:select | secteur:select | libelle_departement:select | academie:select"
        sort="alpha:asc">
      </dsfr-data-facets>
    </div>

    <div class="fr-col-12 fr-col-md-9">
      <dsfr-data-kpi-group class="fr-mb-3w">
        <dsfr-data-kpi source="f" value="count" format="nombre" col="4"
          heading="Sélection" label="labellisations"></dsfr-data-kpi>
        <dsfr-data-kpi source="f" value="ville:distinct" format="nombre" col="4"
          heading="Communes" label="concernées"></dsfr-data-kpi>
        <dsfr-data-kpi source="f" value="academie:distinct" format="nombre" col="4"
          heading="Académies" label="représentées"></dsfr-data-kpi>
      </dsfr-data-kpi-group>
      <!-- `:distinct` NON VÉRIFIÉ (cf. « Limites » 6) : repli = dsfr-data-query group-by. -->

      <dsfr-data-map id="carte-label"
        name="Établissements labellisés Égalité filles-garçons"
        center="46.6,2.3" zoom="6" height="620px"
        tiles="ign-plan" tiles-style="muted"
        fit-bounds fit-max-zoom="12"
        insets="la-reunion,martinique">

        <!-- UNE couche. typeeple est une facette, pas cinq couches. -->
        <dsfr-data-map-layer id="couche-label" source="f" type="circle"
          geo-field="position" radius="6" fill-opacity="0.85"
          color-field="niveaudelabellisation"
          color-map="1:#21AB88,2:#FFCA00,3:#FF9575"
          color="#929292"
          tooltip-field="nom_des_etablissements"
          max-items="2000">
        </dsfr-data-map-layer>

        <dsfr-data-map-legend for="couche-label" label="Niveau de labellisation">
        </dsfr-data-map-legend>

        <dsfr-data-map-popup mode="panel-right" title-field="nom_des_etablissements" width="380px">
          <template>
            <p class="fr-badge fr-badge--sm fr-mb-2v">Niveau {{niveaudelabellisation}} — campagne {{campagnedelabellisation}}</p>
            <p class="fr-text--sm fr-mb-1v"><strong>{{ville}}</strong> — {{libelle_departement}}</p>
            <p class="fr-text--sm fr-mb-2v">
              {{typeeple}} · {{secteur}} · académie de {{academie}}, région {{libelle_region}}
            </p>
            <ul class="fr-btns-group fr-btns-group--sm fr-btns-group--inline">
              {{#if fiche_onisep}}<li><a class="fr-link" href="{{fiche_onisep:url}}">Fiche ONISEP</a></li>{{/if}}
              {{#if web}}<li><a class="fr-link" href="{{web:url}}">Site de l'établissement</a></li>{{/if}}
            </ul>
            <p class="fr-text--xs fr-mb-0">UAI {{identifiantuai}}</p>
          </template>
        </dsfr-data-map-popup>

        <dsfr-data-map-inset territory="la-reunion" label="La Réunion"></dsfr-data-map-inset>
        <dsfr-data-map-inset territory="martinique" label="Martinique"></dsfr-data-map-inset>
      </dsfr-data-map>

      <dsfr-data-a11y source="f" for="carte-label" table download
        filename="label-egalite-filles-garcons.csv"
        label="Données de la carte"
        label-field="nom_des_etablissements"
        value-field="ville, niveaudelabellisation, campagnedelabellisation, typeeple, academie">
      </dsfr-data-a11y>
    </div>
  </div>

  <h2 class="fr-h4 fr-mt-6w">La montée en charge du label</h2>
  <dsfr-data-query id="par-campagne" source="clean"
    group-by="campagnedelabellisation, niveaudelabellisation" aggregate="count">
  </dsfr-data-query>
  <dsfr-data-chart source="par-campagne" type="bar" stacked
    label-field="campagnedelabellisation" value-field="count"
    series-field="niveaudelabellisation"
    name="Labellisations">
  </dsfr-data-chart>

  <h2 class="fr-h4 fr-mt-6w">Les 1 678 labellisations</h2>
  <dsfr-data-list source="f"
    caption="Établissements labellisés Égalité filles-garçons, campagnes 2022-2023 à 2024-2025"
    columns="nom_des_etablissements:Établissement, ville:Commune, typeeple:Type, niveaudelabellisation:Niveau, campagnedelabellisation:Campagne, libelle_departement:Département, academie:Académie"
    sort="campagnedelabellisation:desc" pagination="25" export="csv">
  </dsfr-data-list>
</div>
```

## Limites et points durs identifiés

1. **`max-records` par défaut à 1 000 sur 1 678 lignes.**
   Obstacle : le piège maison — tronque **en silence**. C'est le seul jeu du lot concerné.
   Voie native : `max-records="2000"` posé explicitement. Contrepartie annoncée par la
   référence : le `fetchAll` de l'adaptateur boucle ; à 100 records par requête, 1 678 lignes
   font ~17 allers-retours en série. **À chronométrer avant de conclure** (règle du dépôt). Si
   c'est trop lent, l'autre voie est la source générique sur `/exports/json?limit=-1`
   (`url=` + `params`), qui ramène tout en une requête — au prix de la perte du mode adaptateur
   (donc de `server-facets`, dont on n'a de toute façon pas besoin ici). **Non chronométré.**

2. **Nommer les niveaux 1, 2 et 3 dans la légende.**
   Obstacle : `color-map="1:#21AB88,…"` produit trois entrées de légende libellées « 1 », « 2 »,
   « 3 » — le défaut n° 4 de l'original, reproduit tel quel. Voie native à essayer **avant**
   d'écrire du script : `dsfr-data-normalize` avec `replace-fields` pour dériver un champ
   texte (« Niveau 1 — engagement »), puis `color-field` sur ce champ dérivé et `color-map`
   sur les libellés. **Non vérifié** : `replace-fields` remplace-t-il *une valeur par une
   autre dans le même champ*, ou peut-il écrire dans un champ nouveau ? La grammaire exacte de
   `replace-fields` n'a pas été relue (`get_skill(dsfrDataNormalize, "reference")`). Repli sûr,
   sans script : garder `color-map` sur les entiers et **écrire l'échelle dans le chapô de la
   page**, ce que fait l'esquisse.

3. **1 678 lignes pour 1 529 établissements : quel objet compte-t-on ?**
   Obstacle : ce n'est pas un problème technique, c'est un choix éditorial que l'original n'a
   pas fait. Une carte de labellisations superpose 289 points ; une carte d'établissements en
   perd l'historique. Voie native pour la seconde : `<dsfr-data-query group-by="identifiantuai"
   aggregate="niveaudelabellisation:max">` — un point par établissement, coloré par son
   **meilleur** niveau atteint, ce qui est le sens du dispositif. ⚠️ Le piège maison
   « `group-by` avec une fonction ODSQL » ne s'applique pas (`identifiantuai` est un champ
   brut). **Non vérifié** : `dsfr-data-query` conserve-t-il la `position` dans un `group-by` ?
   Un `group_by` ODS ne renvoie que les clés et les agrégats — il faudrait donc soit un
   `aggregate` sur `latitude`/`longitude` (`:max`, exact puisque constants pour un même UAI),
   soit un dédoublonnage côté client. **Le point le plus incertain de la transposition.**
   Position honnête à tenir dans la page : afficher les deux compteurs (1 678 labellisations,
   1 529 établissements) et le dire, ce que l'original ne fait pas.

4. **La valeur `2024- 2025`.**
   Obstacle : une espace parasite crée une quatrième campagne dans la facette. Voie native
   essayée : `dsfr-data-normalize replace-fields`. Le piège maison AM-038 dit que
   `replace-fields` fait une **comparaison stricte** et que **les deux-points sont réservés par
   la grammaire** — ici la valeur cherchée n'en contient pas, la comparaison stricte est
   exactement ce qu'il faut, et la valeur de remplacement non plus. La forme
   `replace-fields="campagnedelabellisation:2024- 2025:2024-2025"` est donc **plausible mais
   non vérifiée** : il faut relire `get_skill(dsfrDataNormalize, "reference")` pour savoir si
   la grammaire est `champ:ancien:nouveau` et comment elle traite l'espace. Repli : laisser la
   valeur telle quelle et l'assumer (une ligne sur 1 678), ce qui reste plus honnête que de la
   masquer.

5. **Maurice, Tunisie et la notion de « département ».**
   Obstacle : 4 établissements AEFE portent un pays dans `libelle_departement` et `academie` ;
   `insets` ne connaît que des territoires français (liste vérifiée : guadeloupe, martinique,
   guyane, la-reunion, mayotte, saint-pierre-et-miquelon, saint-martin, saint-barthelemy,
   nouvelle-caledonie, polynesie-francaise, wallis-et-futuna, corse). **Ce n'est pas une limite
   de `dsfr-data`** : aucune bibliothèque ne peut inventer un encart « Maurice ». Voie retenue :
   les laisser hors carte principale (le clip `fit-zone` métropolitain les écarte
   naturellement) et les rendre **atteignables par la facette, la recherche et le tableau** —
   avec, dans le chapô, une phrase disant que 4 établissements du réseau AEFE sont labellisés.
   Renommer la facette « Département » en « Département ou pays » serait plus juste que ce que
   fait l'original.

6. **Le KPI « communes distinctes ».**
   Obstacle : `ville:distinct` est **non vérifié** et le piège maison « Pas d'agrégat
   `distinct` » suggère qu'il n'existe pas. Voie native connue : intercaler
   `<dsfr-data-query group-by="ville">` et compter ses lignes avec `value="count"`. À trancher
   en lisant `get_skill(dsfrDataKpi, "reference")`.

7. **Le graphique empilé campagne × niveau.**
   `series-field` et `stacked` sont écrits d'après l'usage courant de `dsfr-data-chart` mais
   **n'ont pas été vérifiés en référence** pour cette fiche. À relire
   (`get_skill(dsfrDataChart, "reference")`) avant d'écrire la page. Le piège maison
   « `group-by` avec une fonction ODSQL » ne s'applique pas ici : les deux champs sont bruts.

8. **1 678 cercles au rendu.**
   `max-items` de la couche vaut 5 000 par défaut : aucun risque de troncature. Sans
   agrégation, 1 678 cercles se recouvrent encore beaucoup en Île-de-France et dans le Nord.
   Voie native : `cluster cluster-radius="60"` (la référence indique qu'avec `cluster`, même
   `max-items="20000"` est sans risque, les marqueurs regroupés ne pesant pas sur le DOM).
   **Arbitrage non tranché** : le cluster chiffré est plus lisible qu'un tas de points, mais il
   perd le codage par niveau tant qu'on est dézoomé. **Non vérifié au navigateur.**

9. **Ce qui ne se transpose pas, et n'a pas à l'être.**
   - Le **géocodeur** « Rechercher un lieu » : aucun attribut de géocodage. Remplacé par
     `dsfr-data-search` sur cinq champs, ce qui répond au même besoin **et** est déjà ce que
     l'original faisait en parallèle avec `q.textual`.
   - Les **cinq fonds de carte** du sélecteur Leaflet : `tiles` en prend un. `ign-plan` +
     `tiles-style="muted"` est le bon réglage pour une carte thématique. **Écart assumé.**
   - `display="categories"` (agrégats en camemberts d'ODS) : pas d'équivalent, et c'est
     exactement ce qui produisait la tache blanche. **Écart assumé, et souhaitable.**
   - Les **sept contextes** : artefact du modèle ODS.

10. **`refine-on-click` : natif depuis la 0.23.0 — et il règle le défaut n° 2 de cette page.**
    L'équivalent natif du `refine-on-click-context="ctx5"` d'ODS est
    `refine-on-click="identifiantuai"` + `context="…"` + `label` sur
    `<dsfr-data-map-layer>`, avec l'événement `dsfr-data-map-select`, le tag supprimable dans
    `dsfr-data-context-tags`, l'URL portée par le contexte et le second clic qui désélectionne
    (#681, ADR-104). **État de publication vérifié bundle par bundle** (`npm pack
    dsfr-data@<v>` puis lecture de `package/dist/dsfr-data.map.esm.js`) : **absent en 0.20.0,
    0.21.0 et 0.22.0, présent en 0.23.0**, qui est le `latest` npm, et plus aucun changeset en
    attente dans le dépôt `dsfr-data`. **Le banc d'essai épingle encore `dsfr-data@0.20.0` sur
    ses 26 pages** (`grep -rho "dsfr-data@[0-9.]*" public/`) : c'est **une montée de version à
    faire ici**, pas un manque de la bibliothèque.
    **Ce que ça change pour cette page — et c'est le cas le plus intéressant du lot.** Le
    défaut n° 2 est que **1 678 lignes valent 1 529 établissements** : 140 d'entre eux ont été
    labellisés plusieurs fois, leurs points sont exactement superposés, et le tiroir ODS
    (`ods-results-max="1"` sur un refine `identifiantuai`) n'en montre **qu'une campagne**,
    sans dire qu'il y en a d'autres. Un popup ne corrige pas cela : il affiche lui aussi le
    seul enregistrement cliqué. `refine-on-click="identifiantuai" context="sel"` **le
    corrige** : le clic filtre le `dsfr-data-list` et le graphique sur cet UAI, qui affichent
    alors **toutes** ses labellisations — le lycée Jules Siegfried apparaît en niveau 2 en
    2022-2023 *puis* en niveau 3 en 2023-2024, c'est-à-dire la trajectoire de progression que
    le dispositif cherche à encourager et que l'original rend invisible. En prime, le contexte
    sérialise la sélection dans l'URL, ce qui règle aussi le défaut n° 16.
    **La réserve que j'avais posée ici (« attribut non publié ») était périmée** : la voie
    native existe, elle est publiée, et elle répond à un défaut que je disais éditorial.
    **Non vérifié au navigateur** : suppose la montée en 0.23.0, et l'articulation entre le
    filtre `eq` du contexte et les six facettes reste à observer.

## Données à reproduire fidèlement

- [ ] Jeu `fr-en-label-egalite-fille-garcon`, **1 678** lignes — et **max-records relevé**,
      sinon 1 000 en silence.
- [ ] **1 529 établissements distincts** pour 1 678 labellisations : **140 doublons d'UAI**
      (289 lignes), 9 UAI présents 3 fois ou plus. Le dire.
- [ ] Niveaux : **1 → 1 013**, **2 → 568**, **3 → 97**. Palette `#21AB88` / `#FFCA00` /
      `#FF9575` conservée, **avec une légende** et **avec la définition des niveaux**.
- [ ] Campagnes : 2022-2023 **479**, 2023-2024 **645**, 2024-2025 **553** (+ la ligne
      `2024- 2025`). Et la progression rendue visible, ce que l'original ne fait pas.
- [ ] Types : COLLEGE **1 065**, LEGT **245**, LPO **195**, LP **160**, EREA **13** —
      **en libellés clairs partout**, y compris dans la fiche de détail.
- [ ] Secteur : Public **1 644** / Privé **34**.
- [ ] **98 « départements »** (dont Maurice et Tunisie) et **29 académies** (idem) —
      et une mention explicite des **4 établissements AEFE**.
- [ ] Territoires : **La Réunion 99** (1ᵉʳ « département » du jeu), **Martinique 7**.
      Encarts, pas de dézoom planétaire.
- [ ] Fiche de détail : les 10 informations de l'original, **liens conditionnels**
      (8 ONISEP et 79 sites morts à ne pas rendre cliquables), et **niveau + campagne
      remontés en tête** plutôt qu'après les liens.
- [ ] Une carte **lisible au premier écran** : pas de tache blanche.
- [ ] Une recherche textuelle **qui ne fait pas disparaître le fond de carte**, avec un
      libellé et un compteur de résultats.
- [ ] Un tableau et un export CSV.
