# Implantation des ULIS-TFV

- **URL** : https://data.education.gouv.fr/pages/implantation-ulis-tfv/
- **Catalogue** : id **21**, thématique **Vie scolaire**, sous-thématique **École inclusive**.
- **Titre de la page (`<title>`)** : « Implantation des ULIS TFV ».
- **Jeu de données** : **`fr-en-ulis-tfv`** — **52 lignes**, 14 champs, public, lisible avec la
  clé de lecture du portail. Titre ODS « Implantation des ULIS-TFV », dernière modification
  **2026-01-29**, **licence : `null`** (aucune licence déclarée, contrairement aux deux autres
  jeux du lot). Description : « Ce jeu de données recense les unités localisées d'inclusion
  scolaire (ULIS) pour les élèves ayant des troubles de la fonction visuelle (TFV). Les données
  présentent l'implantation à la rentrée scolaire 2024. »
  - **14 champs** : `uai` (text), `nom_etablissement`, `type_etablissement`,
    `statut_public_prive`, `nom_commune`, `web`, `mail`, `fiche_onisep`,
    `position` (geo_point_2d), `libelle_departement`, `libelle_academie`, `libelle_region`,
    `latitude` (double), `longitude` (double). Les libellés de métadonnée sont les noms de
    colonne bruts avec une majuscule (`"Nom_etablissement"`, `"Libelle_departement"`) : le
    back-office n'a pas été renseigné.
  - **Facettes déclarées au back-office** : `type_etablissement`, `statut_public_prive`,
    `libelle_departement`, `libelle_academie`, `libelle_region` (cinq — dont deux que la page
    n'utilise pas).
- **Relevé visuel** : 2026-09-10, Chrome, fenêtre 1568 × 751.

## Objectif de la dataviz et informations véhiculées

- **Question à laquelle elle répond** : « Où, en France, existe-t-il une ULIS spécialisée dans
  l'accueil des élèves malvoyants ou aveugles, et dans quel type d'établissement ? » C'est un
  **annuaire d'orientation** à destination des familles et des enseignants référents : 52 lieux
  dans tout le pays, un dispositif rare qu'il faut savoir localiser avant de déménager ou de
  demander une affectation.
- **Message porté** : implicitement, la rareté et la concentration. La page ne l'énonce jamais,
  mais le fait est là : **25 départements sur 101 seulement** en accueillent une, **9 régions
  sur 18**, et l'Île-de-France en concentre **25 sur 52** (48 %).
- **Information que l'utilisateur doit obtenir** : pour un établissement donné, son nom, son
  statut, son type, sa commune, son département, son académie, sa région, et deux liens
  sortants (fiche ONISEP, site web).
- **Ce qui n'est pas dans l'objet** :
  - aucun **effectif** : ni nombre de places, ni nombre d'élèves accueillis ;
  - aucun **contact** : le champ `mail` est renseigné **pour les 52 lignes** et n'est affiché
    nulle part, alors que `web` (27/52) et `fiche_onisep` (29/52) le sont ;
  - aucun **dénombrement** : la page n'affiche à aucun moment « 52 » ni le compte d'une
    sélection ;
  - aucune **liste ni tableau** : la carte est le seul mode d'accès à la donnée (voir
    « Défauts », point 1) ;
  - aucune **date de référence** : « rentrée 2024 » est dans la description du jeu, pas dans
    la page ;
  - aucun **lien vers le jeu de données**, ni téléchargement.

## Chiffres de référence (export `/exports/json?limit=-1`, 52 lignes)

| Mesure | Valeur |
|---|---|
| Lignes | **52** — 52 UAI distincts, aucun doublon |
| Lignes sans `position` | **0** |
| `type_etablissement` | École **23** · Collège **21** · Lycée **6** · EREA **2** (= 52) |
| `statut_public_prive` | **Public 52** — aucun privé |
| Régions | **9** : Île-de-France 25 · Auvergne-Rhône-Alpes 7 · Hauts-de-France 4 · Normandie 4 · Bretagne 3 · Grand Est 3 · Pays de la Loire 3 · PACA 2 · **La Réunion 1** |
| Départements | **25** : Yvelines 6 · Manche 4 · Paris 4 · Seine-Saint-Denis 4 · Seine-et-Marne 4 · Rhône 3 · Essonne 2 · Isère 2 · Moselle 2 · Oise 2 · Puy-de-Dôme 2 · Val-d'Oise 2 · Val-de-Marne 2 · Vendée 2 · et 11 départements à 1 |
| Académies | **16** : Versailles 11 · Créteil 10 · Normandie 4 · Paris 4 · Amiens 3 · Lyon 3 · Nantes 3 · Rennes 3 · Clermont-Ferrand 2 · Grenoble 2 · Moselle→Nancy-Metz 2 · Aix-Marseille 1 · La Réunion 1 · Lille 1 · Nice 1 · Strasbourg 1 |
| Communes distinctes | **39** |
| **Points ultramarins** | **1 seul** — Collège Terre Sainte, La Réunion (−21,347 / 55,490) |
| Emprise | lat −21,347 → 50,934 · lon −2,994 → 55,490 |
| Liens renseignés | `mail` **52/52** · `fiche_onisep` **29/52** · `web` **27/52** · **23 lignes sans aucun des deux liens affichés** |

## Le template AngularJS

`_sources/implantation-ulis-tfv.html`. **Un seul `<ods-dataset-context>`, six contextes sur le
même jeu :**

```html
<ods-dataset-context context="ctx1,ctx2,ctx3,ctx4,ctx5,ctx6"
  ctx1-dataset="fr-en-ulis-tfv" ctx1-parameters="{'refine.type_etablissement':'Ecole'}"
  ctx2-dataset="fr-en-ulis-tfv" ctx2-parameters="{'refine.type_etablissement':'Collège'}"
  ctx3-dataset="fr-en-ulis-tfv" ctx3-parameters="{'refine.type_etablissement':'Lycée'}"
  ctx4-dataset="fr-en-ulis-tfv" ctx4-parameters="{'refine.type_etablissement':'EREA'}"
  ctx5-dataset="fr-en-ulis-tfv"        <!-- fiche de détail, refine sur uai -->
  ctx6-dataset="fr-en-ulis-tfv">       <!-- source des listes de facettes, jamais filtré -->
```

**Six contextes, un seul jeu de 52 lignes.** Quatre pour les quatre couches, un pour la fiche
de détail, un pour alimenter les listes de départements et d'académies. Aucune clé
(`ctx-apikey` absent) : le jeu répond en anonyme.

**La carte** :

```html
<ods-map class="map-drawer__map" display-control="false" display-legend="false"
         location="3,18.50166,-3.66683" no-refit="false" scroll-wheel-zoom="true"
         search-box="true" toolbar-drawing="false" toolbar-fullscreen="true"
         toolbar-geolocation="false">
  <ods-map-layer-group>
```

- `location="3,18.50166,-3.66683"` = zoom 3 sur 18,5 N / 3,67 O, c'est-à-dire **le Sahara
  occidental**. Comme `no-refit="false"`, un recadrage automatique se déclenche sur les données
  et **cette valeur n'est jamais celle qu'on voit** : la vue observée est le fit sur l'emprise
  réelle, France + La Réunion, soit **le monde entier à l'échelle 1 000 km**.
- **`display-control="false"`** : **pas de sélecteur de couche**. L'utilisateur ne peut ni
  allumer ni éteindre une couche.
- **`display-legend="false"`** : **pas de légende**. Les quatre couleurs et les quatre
  pictogrammes ne sont expliqués nulle part sur la carte.

**Les quatre couches**, dans l'ordre du DOM (donc de dessin, le dernier passe devant) :

| Ordre DOM | Contexte | `refine` du contexte | `color` | `picto` | `title` | `display` |
|---|---|---|---|---|---|---|
| 1 | ctx4 | `type_etablissement:EREA` | `#D8C634` (jaune) | `social` | « ULIS TFV implantés en EREA » | `auto` |
| 2 | ctx3 | `type_etablissement:Lycée` | `#46724B` (vert) | `college` | « ULIS TFV implantés en lycée » | `auto` |
| 3 | ctx2 | `type_etablissement:Collège` | `#E18B76` (saumon) | `administration` | « ULIS TFV implantés en collège » | `auto` |
| **4 (au-dessus)** | ctx1 | `type_etablissement:Ecole` | `#000091` (bleu France) | `playground` | « ULIS TFV implantés en école » | `auto` |

Attributs communs aux quatre : `border-color="#FFFFFF" border-opacity="1"
border-pattern="solid" border-size="1" caption="true" point-opacity="1" shape-opacity="0.5"
show-marker="true" tooltip-disabled="true"` et le bloc de refine au clic :

```html
refine-on-click-context="ctx5"
refine-on-click-ctx5-context-field="uai"
refine-on-click-ctx5-map-field="uai"
refine-on-click-ctx5-replace-refine="true"
```

**Ce qui distingue les couches** : rien d'autre que (a) le `refine` sur `type_etablissement`
porté par leur contexte, (b) la couleur, (c) le pictogramme. **Pas de niveau de zoom** (pas de
`min-zoom`/`max-zoom`), **pas de source différente** (même jeu), **pas d'exclusivité**
(`type_etablissement` étant mono-valué, les quatre partitions sont disjointes et couvrent
exactement les 52 lignes : 23 + 21 + 6 + 2). Les quatre couches sont **visibles
simultanément**, sans moyen de les éteindre.

**`tooltip-disabled="true"` sur les quatre** : **aucune infobulle au survol ni au clic sur la
carte**. Le clic déclenche le refine `ctx5` et le contenu part dans un tiroir HTML latéral —
c'est le seul « popup » de la page, et c'est du template de page, pas de l'`ods-map`.

## Relevé visuel exhaustif

Pas d'en-tête, pas de H1, pas de fil d'Ariane : la page démarre directement sur le composite
carte + panneau, en pleine largeur sous le menu du portail.

### 1. Colonne de gauche — le panneau de filtres (~330 px, superposé à la carte)

**a. Champ « Rechercher un lieu »** — en haut, encadré de bleu France épais, loupe à gauche.
C'est le **géocodeur d'`ods-map`** (`search-box="true"`), pas une recherche dans les données :
il déplace la vue, il ne filtre rien. Le template contient bien un `<div class="filtre-searchbox">`,
mais il est **vide** — la page prévoyait une recherche textuelle et ne l'a pas branchée
(contrairement à la page Label, qui l'a).

**b. Texte de description**, centré, en gris :
« Cartographie d'implantation des unités localisées pour l'inclusion scolaire spécialisées dans
l'accueil des élèves ayant des troubles de la fonction visuelle (ULIS-TFV) au sein des écoles et
établissements scolaires. »

**c. En-tête « Filtrer les établissements »** suivi d'une **icône ⊗** (`ods-clear-all-filters`) :

```html
<ods-clear-all-filters context="[ctx1,ctx2,ctx3,ctx4]"
  except="[refine.type_etablissement]"
  ng-show="ctx1.parameters['q.type_etab'] || ctx1.parameters['refine.libelle_departement']
        || ctx1.parameters['refine.libelle_academie'] || ctx1['parameters']">
```

- **Libellé** : aucun. Un pictogramme seul, sans texte ni `title` visible.
- **Ce qu'il remet à zéro** : les paramètres des **quatre contextes de couches**, en principe
  sauf `refine.type_etablissement`.
- **Il est toujours visible** : la dernière condition du `ng-show` est `ctx1['parameters']`,
  un objet **toujours truthy**. Le bouton s'affiche donc même quand aucun filtre n'est posé.
- **Il casse la carte** — voir « Défauts », point 3.

**d. Accordéon « Type d'établissement : »** — replié au chargement, chevron à droite. Déplié,
quatre **boutons radio** avec, à droite de chaque libellé, le pictogramme correspondant :

| Libellé affiché | Pictogramme (SVG `/static/pictos/img/set-v3/pictos/…`) | Valeur posée |
|---|---|---|
| Ecoles | `playground.svg` (toboggan) | `q.type_etab = 'type_etablissement:Ecole'` |
| Collèges | `administration.svg` (fronton à colonnes) | `'type_etablissement:Collège'` |
| Lycées | `college.svg` (toque de diplômé) | `'type_etablissement:Lycée'` |
| EREA | `social.svg` (silhouettes) | `'type_etablissement:EREA'` |

- Le titre de l'accordéon devient « Type d'établissement : **Ecole** » — la **valeur brute** du
  code, pas le libellé cliqué (« Ecoles »). Il est produit par
  `(ctx1.parameters['q.type_etab'] | split:[':'])[1]`.
- Le mécanisme est indirect : le filtre pose une **requête `q.type_etab`** sur les quatre
  contextes qui portent déjà chacun un `refine.type_etablissement` différent. Sélectionner
  « Collèges » donne donc à la couche École `refine=Ecole AND q=Collège` → **vide**, et à la
  couche Collège `refine=Collège AND q=Collège` → 21 points. Le résultat visuel est le bon,
  mais il est obtenu par intersection sur quatre couches plutôt que par sélection d'une couche.
- **Choix unique** : cocher « Lycées » remplace « Écoles ». Pas de désélection possible autrement
  que par la croix ⊗ qui apparaît à côté du titre de l'accordéon.
- **Aucun compteur** : ni « Ecoles (23) », ni total.
- Vérifié à l'écran : « Collèges » → 21 pins saumon dont celui de La Réunion ; « Ecoles » →
  23 pins bleus, tous métropolitains, la carte se recadre sur la métropole.

**e. Accordéon « Départements »** — déplié, **25 boutons radio**, un par département, tri
alphanumérique, **sans compteur** :

Aisne · Alpes-Maritimes · Côtes-d'Armor · Essonne · Haut-Rhin · Hauts-de-Seine · Ille-et-Vilaine ·
Isère · **La Réunion** · Manche · Morbihan · Moselle · Oise · Paris · Pas-de-Calais · Puy-de-Dôme ·
Rhône · Sarthe · Seine-Saint-Denis · Seine-et-Marne · Val-d'Oise · Val-de-Marne · Vaucluse ·
Vendée · Yvelines.

**f. Accordéon « Académies »** — **16 boutons radio**, même forme, sans compteur :

Aix-Marseille · Amiens · Clermont-Ferrand · Créteil · Grenoble · La Réunion · Lille · Lyon ·
Nancy-Metz · Nantes · Nice · Normandie · Paris · Rennes · Strasbourg · Versailles.

Les deux listes sont alimentées par `ods-facet-results` **sur ctx6, qui n'est jamais filtré** :
elles **ne cascadent pas**. Vérifié à l'écran : avec « Ecoles » sélectionné (23 lignes réparties
sur **18** départements et **12** académies), les listes affichent toujours **25** et **16**
entrées. Sept départements et quatre académies proposés ne renvoient alors rien.

### 2. La carte

- **Fond** : tuiles IGN via Huwise, attribution « Leaflet | Powered by Huwise - Map data © IGN ».
- **Sélecteur de fond** (icône de calques empilés, en bas à gauche) : **5 fonds** — IGN V2
  (coché par défaut), IGN Parcellaire Express, IGN Limites Administratives Express,
  IGN Orthophotos, Jawg. C'est le contrôle Leaflet des **tuiles**, pas des couches de données.
- **Contrôles** : +/− en haut à droite, plein écran (icône en haut à gauche), échelle
  métrique/impériale en bas à gauche. Pas d'outils de dessin (`toolbar-drawing="false"`),
  pas de géolocalisation (`toolbar-geolocation="false"`).
- **Cadrage au chargement** : **le monde entier**, échelle **1 000 km**. On voit l'Amérique du
  Nord, l'Amérique du Sud, l'Afrique entière, l'Asie centrale, l'Inde — et deux amas de points :
  un tas illisible sur la France, une épingle isolée près de Madagascar (La Réunion). **Un seul
  point ultramarin sur 52 impose ce cadrage à toute la page.**
- **Rendu des points** : épingles Leaflet en goutte (`show-marker="true"`) portant le
  pictogramme du type, à la couleur de la couche. Pas de cluster à ce volume. Au zoom initial,
  les 51 points métropolitains se recouvrent : le zoom sur l'amas montre une pile où les
  épingles bleues (École, couche du dessus) masquent largement les saumon (Collège) et cachent
  presque entièrement les vertes (Lycée) et les jaunes (EREA).
- **Recadrage** : automatique à chaque changement de filtre (`no-refit="false"`). Le
  rechargement des tuiles est systématiquement en retard sur le recadrage — pendant 2 à 4 s le
  fond est un agrandissement flou de la vue précédente. Observé à chaque interaction.
- **Survol** : rien (`tooltip-disabled="true"`).

### 3. Le tiroir de détail (au clic sur une épingle)

Panneau blanc glissant depuis la droite, ~545 px, avec un voile sombre (`backdrop`) sur la
carte et une croix de fermeture en haut à droite. Relevé mot pour mot sur l'école primaire
publique Joseph Rollo (Auray, Morbihan, UAI 0560659M) :

> **Ecole primaire publique Joseph Rollo - Public - Ecole**
>
> Fiche ONISEP - Site web
> Commune : Auray
> Département : Morbihan
> Académie : Rennes
> Région : Bretagne

- Le titre concatène `nom_etablissement`, `statut_public_prive` et `type_etablissement`
  séparés par des tirets. Il est en blanc sur bandeau bleu France et, à 1568 px, **il chevauche
  la croix de fermeture** : le mot « Ecole » passe sous le ✕.
- **« Fiche ONISEP » et « Site web » sont rendus inconditionnellement.** Cet établissement a
  `web = null` et `fiche_onisep = null` : les deux `<a href="">` pointent donc sur la page
  courante. Vérifié : les deux éléments sont bien exposés comme des liens dans l'arbre
  d'accessibilité. **23 des 52 fiches** (44 %) affichent ainsi deux liens morts, 6 de plus n'en
  ont qu'un valide.
- `mail`, renseigné pour les 52 lignes, n'apparaît pas.
- Le clic ne recentre pas la carte.
- **Un seul enregistrement à la fois** : `ods-results-max="1"` sur ctx5. Deux ULIS dans la même
  commune ne se distinguent que par la position de l'épingle.

### 4. Console et réseau

Aucun message en console au chargement (suivi activé puis rechargement complet). Aucune erreur
observée pendant les interactions.

## Défauts et bizarreries de l'original

1. **La donnée n'est accessible que par la carte, et la carte n'en montre qu'un point à la
   fois.** 52 lignes, 39 communes : pour savoir s'il existe une ULIS-TFV dans son département,
   l'utilisateur doit ou bien lire la liste des 25 départements du panneau (qui n'a pas de
   compteur), ou bien cliquer les épingles une par une. **Aucune liste, aucun tableau, aucun
   export, aucun compteur.** C'est le défaut central : sur un jeu de cette taille, la carte
   n'est pas le bon support unique — elle répond à « où ? » mais pas à « combien ? »,
   « lesquels ? », « y en a-t-il un près de chez moi ? ».
2. **Le cadrage initial est le monde entier à cause d'un seul point.** Le fit automatique
   embrasse la métropole *et* La Réunion : la carte s'ouvre sur l'Atlantique et l'Afrique, avec
   la France réduite à une tache de 60 px. La solution éditoriale (encart ultramarin) n'existe
   pas dans le paramétrage de la page. Le `location="3,18.50166,-3.66683"` inscrit dans le
   template est de toute façon inutilisable (Sahara occidental) et n'est jamais celui qu'on voit.
3. **`clear-all-filters` détruit le codage par couleur de la carte — définitivement.**
   Vérifié en trois temps : (a) au chargement, la carte montre un mélange d'épingles bleues,
   saumon et vertes ; (b) après un clic sur le ⊗, tous les radios sont bien décochés — mais
   **toutes les épingles deviennent bleues, avec le pictogramme École** ; (c) l'état ne se
   rétablit pas, il faut recharger la page. L'`except="[refine.type_etablissement]"` ne protège
   pas les refines des quatre contextes : une fois effacés, les quatre couches interrogent les
   mêmes 52 lignes et la couche du dessus (École, bleu) recouvre les trois autres. **La carte
   affiche alors 4 × 52 = 208 marqueurs empilés sur 52 positions, et son codage n'a plus de
   sens.** C'est un bug franc, pas une maladresse.
4. **Quatre couleurs et quatre pictogrammes sans légende.** `display-legend="false"` : rien sur
   la carte ne dit que bleu = école, saumon = collège, vert = lycée, jaune = EREA. Le seul
   endroit où le lien picto ↔ type est donné est **le panneau de filtres, et seulement pour le
   pictogramme** — les couleurs n'y figurent pas, puisque les vignettes du panneau sont noires.
   Un utilisateur qui ne déplie pas l'accordéon « Type d'établissement » n'a aucun moyen de lire
   la carte.
5. **Le bouton de remise à zéro est toujours affiché**, y compris sur une page vierge de tout
   filtre : `ng-show="… || ctx1['parameters']"`, dernier terme toujours vrai. Il propose donc
   d'effacer ce qui n'existe pas — et, à ce moment-là, son seul effet est le bug du point 3.
6. **Les listes Départements et Académies ne cascadent pas et n'ont pas de compteur.** Elles
   sont bâties sur ctx6, jamais filtré : avec « Ecoles » sélectionné, 7 des 25 départements et
   4 des 16 académies proposés donnent une carte vide. À l'inverse, un utilisateur ne peut pas
   savoir que les Yvelines en comptent 6 et l'Aisne 1.
7. **23 fiches sur 52 affichent deux liens morts.** « Fiche ONISEP » et « Site web » sont
   toujours rendus, même quand `fiche_onisep` et `web` sont nuls ; cliquer recharge la page.
8. **Le titre du tiroir chevauche la croix de fermeture** à 1568 px de large.
9. **Le champ `mail`, seul champ renseigné à 100 %, n'est jamais affiché** — alors que les deux
   champs affichés le sont à 52 % et 56 %.
10. **Le libellé du filtre affiche le code, pas le libellé.** « Type d'établissement : Ecole »
    après un clic sur « Ecoles ».
11. **Pas de titre de page, pas de H1, pas d'année, pas de lien vers le jeu.** La seule mention
    « rentrée 2024 » vit dans la métadonnée ODS, jamais rendue. Le jeu n'a d'ailleurs
    **aucune licence déclarée**.
12. **L'URL n'est pas un état partageable** : aucun `urlsync`, aucun paramètre lu. Impossible
    d'envoyer « la carte des ULIS-TFV du Rhône ».
13. **Le `<div class="filtre-searchbox">` est vide** : emplacement de recherche textuelle prévu
    au gabarit et jamais rempli, ce qui laisse le géocodeur d'`ods-map` (« Rechercher un lieu »)
    occuper visuellement la place d'une recherche par établissement qui n'existe pas.

## Une carte de 52 points mérite-t-elle une carte ?

Oui — mais pas seule. La localisation *est* l'information utile ici : un dispositif rare, un
choix d'affectation qui dépend de la distance domicile-école. La carte répond à « où ? ».

Ce qu'elle ne peut pas faire, et que la page ne fait nulle part :

- **dire le total** (52) et le compte de la sélection ;
- **montrer la rareté** : 25 départements sur 101, 9 régions sur 18, 48 % en Île-de-France.
  Ce constat, qui est le message de fond du jeu, n'apparaît sur aucun écran ;
- **se lire au clavier et au lecteur d'écran** : les marqueurs Leaflet ne sont **pas exposés
  dans l'arbre d'accessibilité** (vérifié : une recherche d'éléments « marqueur / point de
  données » sur la page ne retourne aucun élément interactif de la carte). Pour un utilisateur
  qui n'utilise pas la souris, la page est vide. Sur une dataviz consacrée à la **déficience
  visuelle**, c'est le défaut le plus lourd de la page ;
- **permettre de comparer et de trier** : « les 6 des Yvelines », « les 2 EREA », « celles avec
  un site web ».

52 lignes tiennent en **un seul écran de tableau**. La transposition ci-dessous garde la carte
comme entrée principale et lui adjoint, sur la même source filtrée, un `dsfr-data-list`
paginable et exportable et trois `dsfr-data-kpi`. Ce n'est pas un ajout de confort :
c'est ce qui rend la donnée lisible sans souris et dénombrable d'un coup d'œil.
**Aucune limite de performance n'est en cause** : 52 lignes en une requête, c'est instantané ;
invoquer la performance ici serait faux.

## Transposition vers `dsfr-data`

Attributs vérifiés dans la référence générée depuis le source
(`get_skill(dsfrDataMap|dsfrDataFacets|dsfrDataSource|dsfrDataSearch|dsfrDataList|dsfrDataA11y,
"reference")` et `get_skill(attributeGrammars, "guide")`), plus lecture du source
`~/Developer/GitHub/dsfr-data/packages/core/src/components/dsfr-data-map-layer.ts`.
Tout attribut non vérifié est signalé comme tel.

| Original Opendatasoft | `dsfr-data` | Attributs nécessaires |
|---|---|---|
| `<ods-dataset-context context="ctx1,…,ctx6">` — **6 contextes, 1 jeu** | **un seul `<dsfr-data-source>`** | `api-type="opendatasoft"`, `base-url="https://data.education.gouv.fr"`, `dataset-id="fr-en-ulis-tfv"`, `api-key-ref` (clé de lecture du portail). 52 lignes : pas de `server-side`, pas de `max-records` (défaut adaptateur 1 000 > 52). Les six contextes ODS n'ont pas de raison d'être : un contexte par couche est un artefact du modèle ODS, pas un besoin. |
| `ctx6` (source non filtrée des listes de facettes) | — | Supprimé. `dsfr-data-facets` en mode local recalcule les valeurs **et les compteurs** selon les autres sélections (cascade native, `attributeGrammars` § facettes). C'est exactement ce que ctx6 empêchait. |
| `ctx5` + `ods-results-max="1"` + tiroir HTML (fiche de détail) | `<dsfr-data-map-popup>` + `<template>` | `mode="panel-right"`, `title-field="nom_etablissement"`, `width`. Le `<template>` interpole `{{champ}}`, `{{champ\|défaut}}`, `{{lien:url}}` et surtout **`{{#if champ}}…{{/if}}`** — qui règle le défaut n° 7 (liens morts) en une ligne. Pas de sixième contexte. |
| `refine-on-click-context="ctx5" …-context-field="uai"` | `refine-on-click="uai"` sur `<dsfr-data-map-layer>` (+ `context`, `label`) | **Natif et publié depuis la 0.23.0** (#681, ADR-104) : la couche émet `dsfr-data-map-select` `{record, layerId, selected}` au clic et, avec `context="id"`, s'enregistre comme filtre `eq` d'un `dsfr-data-context` — les autres vues se filtrent, un tag apparaît dans `context-tags`, l'URL est portée par le contexte, un second clic retire la sélection. Vérifié dans les bundles publiés : absent en 0.20.0 / 0.21.0 / 0.22.0, **présent en 0.23.0** (`latest`). **Le dépôt épingle encore `dsfr-data@0.20.0` sur ses 26 pages : c'est une montée de version à faire côté banc d'essai, pas un manque de la bibliothèque.** Ici on ne s'en sert pas pour afficher la fiche — le popup le fait mieux — mais pour lier la carte au tableau : voir « Limites », point 3. |
| **4 × `<ods-map-layer>`** distinguées par `color` + `picto` + refine `type_etablissement` | **1 seule `<dsfr-data-map-layer>`** | `type="marker"`, `geo-field="position"`, `color-field="type_etablissement"`, `color-map="Ecole:#000091,Collège:#E18B76,Lycée:#46724B,EREA:#D8C634"` (**paires séparées par des virgules**, `valeur:#couleur`), `color` = repli. Une couche au lieu de quatre : les quatre partitions d'un champ mono-valué sont un **encodage catégoriel**, pas quatre couches. |
| `picto="playground\|administration\|college\|social"` | **aucun équivalent** | Vérifié au source : `type="marker"` rend toujours `<span class="fr-icon-map-pin-2-fill" style="color: …">` — une épingle DSFR unique, colorée. Il n'y a **pas d'attribut d'icône** sur `dsfr-data-map-layer`. **Écart assumé, pas un manque** : quatre pictogrammes non légendés sont moins lisibles que quatre couleurs légendées, et le DSFR impose son épingle. |
| `display-legend="false"` (pas de légende) | `<dsfr-data-map-legend>` | `for="<id de la couche>"`, `label="Type d'établissement"`. Rend une liste DSFR « pastille + texte », **une entrée par paire de `color-map`**, pastille `aria-hidden`, le texte porte le sens (RGAA). Se rafraîchit à chaque rendu. C'est la légende que l'original ne peut pas avoir. |
| `display-control="false"` (pas de sélecteur de couche) | sans objet | Avec une seule couche, il n'y a rien à allumer. L'équivalent fonctionnel du sélecteur est la **facette `type_etablissement`**, qui filtre *et* met à jour compteurs, légende, liste et KPI. |
| `location="3,18.50166,-3.66683"` + fit sur un point réunionnais | `<dsfr-data-map>` | `center="46.6,2.3"`, `zoom="6"`, `height`, `tiles="ign-plan"`, `tiles-style="muted"`, `fit-bounds`, `fit-max-zoom="12"`, **`insets="la-reunion"`**, `name`. **Le jeu a bien un point ultramarin** (Collège Terre Sainte) : un encart est justifié — et il n'y en a qu'un, donc `insets="la-reunion"` plutôt que `insets="drom"`. Avec un encart ultramarin, `fit-zone` bascule par défaut sur la métropole : c'est précisément ce qu'on veut ici, et cela ne déclenche pas BUG-004 puisque le point réunionnais est servi par l'encart, pas par le fit. |
| Encart : largeur | `<dsfr-data-map-inset>` | `territory="la-reunion"`, `label`, `height`. **Pas de largeur à poser** : la feuille injectée par la carte donne `10rem` par défaut (#643) — l'ancien piège AM-032 est réglé côté bibliothèque ; une règle de page prime toujours dessus. |
| `search-box="true"` (géocodeur) | — | Pas d'équivalent de géocodage dans la référence. Substitut : `<dsfr-data-search fields="nom_etablissement, nom_commune, libelle_departement">` — une recherche **dans les données**, ce que la page ODS voulait (`filtre-searchbox` laissé vide) et n'a pas fait. |
| Filtre « Type d'établissement » (4 radios + `q.type_etab` sur 4 contextes) | `<dsfr-data-facets>` | `fields="type_etablissement, libelle_departement, libelle_academie"` (**virgules**), `labels="type_etablissement:Type d'établissement \| libelle_departement:Département \| libelle_academie:Académie"` (**barres**), `display="type_etablissement:select \| libelle_departement:select \| libelle_academie:select"` (**barres**), `sort="alpha:asc"`. `select` = choix unique visible en ligne, exclusif d'office. Les compteurs sont affichés par défaut (`hide-counts` non posé) et **cascadent** : c'est le défaut n° 6 réglé sans attribut supplémentaire. |
| Listes Départements / Académies sur ctx6 non filtré | mêmes `<dsfr-data-facets>` | Rien de plus. La cascade est le comportement par défaut. |
| `<ods-clear-all-filters>` (pictogramme seul, toujours visible, casse la carte) | **rien à transposer** | La remise à zéro d'une facette `select` est sa propre option vide. Un `dsfr-data-context-tags` donnerait des tags supprimables, mais **il n'observe qu'un `dsfr-data-context`** (attribut `for` = id d'un contexte, vérifié en référence) : le poser suppose de basculer les filtres sur `dsfr-data-context` + `dsfr-data-context-filter`, ce qui change l'architecture. **Non retenu.** |
| — (absent de l'original) | `<dsfr-data-kpi>` × 3 dans un `<dsfr-data-kpi-group>` | `value="count"` (source client, pas de `server-side` : `count` compte bien tout), `heading`, `label`, `col`. Le total, le nombre de départements couverts, le nombre d'écoles. |
| — (absent de l'original) | `<dsfr-data-list>` | `columns="nom_etablissement:Établissement, nom_commune:Commune, type_etablissement:Type, libelle_departement:Département, libelle_academie:Académie"`, `sort="libelle_departement:asc"`, `pagination="20"`, `export="csv"`, `caption`. Le tableau que l'original n'a pas — et l'accès clavier à la donnée. |
| — (absent de l'original) | `<dsfr-data-a11y>` | `for="<id de la carte>"`, `table`, `download`, `label-field`, `value-field`. Liaison ARIA + lien d'évitement vers la carte. |

### Esquisse de code

```html
<!-- 52 lignes, 14 champs : tout tient côté client, en une requête. -->
<dsfr-data-source id="ulis"
  api-type="opendatasoft"
  base-url="https://data.education.gouv.fr"
  dataset-id="fr-en-ulis-tfv"
  api-key-ref="education-lecture">
</dsfr-data-source>

<div class="fr-container fr-mt-6w">
  <h1>Où sont les ULIS pour troubles de la fonction visuelle ?</h1>
  <p class="fr-text--lead">
    À la rentrée 2024, <strong>52 unités localisées pour l'inclusion scolaire</strong>
    accueillent des élèves aveugles ou malvoyants. Elles sont toutes publiques et se
    répartissent sur <strong>25 départements</strong> et <strong>9 régions</strong> ;
    l'Île-de-France en concentre 25 à elle seule, et une seule est ultramarine.
  </p>

  <dsfr-data-search id="q" source="ulis" count
    fields="nom_etablissement, nom_commune, libelle_departement, libelle_academie"
    label="Rechercher un établissement ou une commune"
    placeholder="Auray, Yvelines, collège…">
  </dsfr-data-search>

  <div class="fr-grid-row fr-grid-row--gutters fr-mt-3w">
    <div class="fr-col-12 fr-col-md-3">
      <h2 class="fr-h6">Filtrer</h2>
      <dsfr-data-facets id="f" source="q"
        fields="type_etablissement, libelle_departement, libelle_academie"
        labels="type_etablissement:Type d'établissement | libelle_departement:Département | libelle_academie:Académie"
        display="type_etablissement:select | libelle_departement:select | libelle_academie:select"
        sort="alpha:asc">
      </dsfr-data-facets>
    </div>

    <div class="fr-col-12 fr-col-md-9">
      <dsfr-data-kpi-group class="fr-mb-3w">
        <dsfr-data-kpi source="f" value="count" format="nombre" col="4"
          heading="Sélection" label="ULIS-TFV"></dsfr-data-kpi>
        <dsfr-data-kpi source="f" value="libelle_departement:distinct" format="nombre" col="4"
          heading="Départements" label="couverts"></dsfr-data-kpi>
        <dsfr-data-kpi source="f" value="nom_commune:distinct" format="nombre" col="4"
          heading="Communes" label="concernées"></dsfr-data-kpi>
      </dsfr-data-kpi-group>
      <!-- `:distinct` NON VÉRIFIÉ : la liste des agrégats de `value` n'a pas été relue
           dans la référence de dsfr-data-kpi. Repli sûr documenté au § « Limites », point 4. -->

      <dsfr-data-map id="carte-ulis"
        name="Implantation des ULIS pour troubles de la fonction visuelle"
        center="46.6,2.3" zoom="6" height="620px"
        tiles="ign-plan" tiles-style="muted"
        fit-bounds fit-max-zoom="12"
        insets="la-reunion">

        <!-- UNE couche, quatre couleurs : type_etablissement est mono-valué et
             partitionne exactement les 52 lignes (23+21+6+2). -->
        <dsfr-data-map-layer id="couche-ulis" source="f" type="marker"
          geo-field="position"
          color-field="type_etablissement"
          color-map="Ecole:#000091,Collège:#E18B76,Lycée:#46724B,EREA:#D8C634"
          color="#929292"
          tooltip-field="nom_etablissement">
        </dsfr-data-map-layer>

        <dsfr-data-map-legend for="couche-ulis" label="Type d'établissement">
        </dsfr-data-map-legend>

        <dsfr-data-map-popup mode="panel-right" title-field="nom_etablissement" width="380px">
          <template>
            <p class="fr-badge fr-badge--sm fr-mb-2v">{{type_etablissement}} · {{statut_public_prive}}</p>
            <p class="fr-text--sm fr-mb-1v">
              <strong>{{nom_commune}}</strong> — {{libelle_departement}}
            </p>
            <p class="fr-text--sm fr-mb-2v">
              Académie de {{libelle_academie}}, région {{libelle_region}}
            </p>
            <ul class="fr-btns-group fr-btns-group--sm fr-btns-group--inline">
              {{#if fiche_onisep}}<li><a class="fr-link" href="{{fiche_onisep:url}}">Fiche ONISEP</a></li>{{/if}}
              {{#if web}}<li><a class="fr-link" href="{{web:url}}">Site de l'établissement</a></li>{{/if}}
              {{#if mail}}<li><a class="fr-link" href="mailto:{{mail}}">Écrire à l'établissement</a></li>{{/if}}
            </ul>
            <p class="fr-text--xs fr-mb-0">UAI {{uai}}</p>
          </template>
        </dsfr-data-map-popup>

        <dsfr-data-map-inset territory="la-reunion" label="La Réunion"></dsfr-data-map-inset>
      </dsfr-data-map>

      <dsfr-data-a11y source="f" for="carte-ulis" table download
        filename="ulis-tfv-2024.csv"
        label="Données de la carte"
        label-field="nom_etablissement"
        value-field="nom_commune, type_etablissement, libelle_departement, libelle_academie">
      </dsfr-data-a11y>

      <h2 class="fr-h5 fr-mt-4w">Les 52 implantations</h2>
      <dsfr-data-list source="f"
        caption="Liste des ULIS pour troubles de la fonction visuelle, rentrée 2024"
        columns="nom_etablissement:Établissement, nom_commune:Commune, type_etablissement:Type, libelle_departement:Département, libelle_academie:Académie"
        sort="libelle_departement:asc" pagination="20" export="csv">
      </dsfr-data-list>
    </div>
  </div>
</div>
```

## Limites et points durs identifiés

1. **Les pictogrammes de type d'établissement n'ont pas d'équivalent.**
   Obstacle : `picto="playground|administration|college|social"` d'`ods-map-layer` puise dans le
   jeu d'icônes Opendatasoft. Voie native cherchée : aucun attribut d'icône sur
   `dsfr-data-map-layer` (vérifié en référence **et** au source : `type="marker"` construit un
   `L.divIcon` figé sur `fr-icon-map-pin-2-fill`). **Ce n'est pas une limite de la
   bibliothèque au sens du dépôt** : c'est une fonctionnalité ODS qu'on remplace par
   `color-field` + `color-map` + `dsfr-data-map-legend`, qui est *plus* lisible (l'original
   n'expliquait ses pictogrammes nulle part) et conforme RGAA. **Écart assumé.**

2. **Le tiroir de détail plein cadre n'est pas exactement le `panel-right`.**
   L'original glisse un panneau de 545 px avec voile assombri sur la carte ; `mode="panel-right"`
   et `width="380px"` donnent le même geste. `width` accepte une valeur CSS libre.
   **Non vérifié au navigateur** : le rendu du voile et le comportement à 400 px de large.

3. **`refine-on-click` : natif depuis la 0.23.0 — ce n'est pas une limite, c'est une montée
   de version du banc d'essai.**
   Le mécanisme ODS « clic sur un point → refine d'un contexte → tout le reste de la page se
   filtre » a un équivalent natif complet : `refine-on-click="uai"` + `context="…"` + `label`
   sur `<dsfr-data-map-layer>`, avec l'événement `dsfr-data-map-select`
   `{record, layerId, selected}`, le tag supprimable dans `dsfr-data-context-tags`, l'URL
   portée par le contexte et le second clic qui retire la sélection (#681, ADR-104). Sans
   `context`, la clause `eq` part directement à `source` sous le `whereKey`
   `map-select-<id>`.
   **État de publication, vérifié bundle par bundle** (`npm pack dsfr-data@<v>` puis lecture
   de `package/dist/dsfr-data.map.esm.js`) : **absent en 0.20.0, 0.21.0 et 0.22.0, présent en
   0.23.0**, qui est le `latest` npm ; plus aucun changeset en attente dans le dépôt
   `dsfr-data`. **Le banc d'essai, lui, épingle encore `dsfr-data@0.20.0` sur ses 26 pages**
   (`grep -rho "dsfr-data@[0-9.]*" public/` → 26 occurrences de `0.20.0`) : l'attribut est
   donc indisponible *pour ce dépôt tant qu'il n'aura pas monté sa version*, ce qui est un
   travail de banc d'essai et **pas un manque de la bibliothèque**.
   **Ce que ça change ici.** Pour *afficher la fiche*, rien : `dsfr-data-map-popup` reste le
   bon outil, il montre le détail sans filtrer quoi que ce soit ni consommer un contexte de
   plus — le `ctx5` d'ODS était un contournement de l'absence de popup riche, pas une
   intention. En revanche la voie s'ouvre pour ce que l'original ne sait pas faire :
   **lier la carte au tableau**. En posant `refine-on-click="uai" context="sel"` sur la couche
   et un `<dsfr-data-context id="sel" sources="ulis">`, cliquer une épingle réduit le
   `dsfr-data-list` (et les KPI) au seul établissement retenu, avec un tag supprimable et une
   URL partageable — ce qui répond exactement au défaut n° 12 de l'original (« l'URL n'est pas
   un état partageable ») et au défaut n° 1 (la donnée n'est atteignable que point par point).
   **Non vérifié au navigateur** : cette liaison suppose une montée en 0.23.0 du dépôt, et
   l'interaction entre le filtre de contexte et les facettes reste à observer.

4. **Le KPI « nombre de départements couverts ».**
   Obstacle : je n'ai **pas relu** la liste des agrégats acceptés par `value` de
   `dsfr-data-kpi` ; `libelle_departement:distinct` est **non vérifié** et le piège maison
   « Pas d'agrégat `distinct` » (CLAUDE.md) suggère qu'il n'existe pas. Voie native connue et
   sûre : intercaler `<dsfr-data-query group-by="libelle_departement">` et compter ses lignes
   avec `value="count"`. À trancher en lisant `get_skill(dsfrDataKpi, "reference")` avant
   d'écrire la page.

5. **Le fit et l'encart réunionnais.**
   Obstacle : le piège BUG-004 du dépôt (« `fit-bounds` + `max-bounds` sur un jeu sans point
   ultramarin renvoie vide »). Ici la vérification est faite dans l'autre sens : **le jeu a bien
   un point ultramarin**, un seul, en La Réunion (−21,347 / 55,490) — donc l'encart est
   justifié. Avec `insets="la-reunion"` et sans `max-bounds`, `resolveFitZone()` cale le clip
   sur la métropole (`41,-5.5,51.5,10`) : le fit reste métropolitain quel que soit le filtre,
   et le point réunionnais est servi par l'encart. **Cas à vérifier au navigateur** : filtrer
   « La Réunion » dans la facette Département — la carte principale n'aura alors **aucun point
   dans sa zone de clip**. Si le fit renvoie vide, la parade est `fit-zone="none"` ; c'est le
   point le plus susceptible de mordre.

6. **La cascade des facettes en mode client.**
   `attributeGrammars` § « Facettes en cascade » précise que la cascade serveur exige
   `server-facets`, mais qu'**en mode local les compteurs se recalculent aussi selon les autres
   sélections**, sur les données déjà chargées. Avec 52 lignes intégralement chargées, le mode
   local est exact. `server-facets` serait ici une complication inutile (et exigerait
   `server-side`). **Non vérifié au navigateur** : le comportement d'une facette `select` dont
   une valeur devient vide sous un autre filtre.

7. **Ce qui ne se transpose pas, et n'a pas à l'être.**
   - Le **géocodeur** « Rechercher un lieu » : aucun attribut de géocodage dans la référence.
     Substitut plus utile : `dsfr-data-search` sur les champs de nom et de territoire.
   - Le **sélecteur de fond de carte à cinq entrées** (IGN V2 / Parcellaire / Limites
     administratives / Orthophotos / Jawg) : `dsfr-data-map` prend **un** fond par
     `tiles`. Sur une carte thématique de 52 points, offrir le cadastre et l'orthophoto est du
     bruit ; `ign-plan` + `tiles-style="muted"` est le bon réglage. **Écart assumé.**
   - Les **quatre contextes de couches** : artefact du modèle ODS (un contexte = un jeu + un
     filtre). Les transposer un pour un produirait quatre couches identiques — c'est exactement
     l'erreur que le CLAUDE.md du dépôt appelle « transposer le modèle ODS puis en imputer le
     coût à `dsfr-data` ».

8. **Aucune limite de performance n'est en jeu.** 52 lignes, une requête, tout côté client. Le
   plafond `max-items` de la couche (5 000) est deux ordres de grandeur au-dessus, `max-records`
   de la source (1 000 par défaut) aussi. Rien à chronométrer, rien à arbitrer.

## Données à reproduire fidèlement

- [ ] Jeu `fr-en-ulis-tfv`, **52** lignes, **52** UAI distincts, **0** ligne sans position.
- [ ] Répartition par type : École **23** · Collège **21** · Lycée **6** · EREA **2**.
- [ ] **100 % public** — et le dire, parce que l'original ne le dit pas.
- [ ] **25 départements**, **16 académies**, **9 régions**, **39 communes**.
- [ ] Île-de-France **25 / 52**. Yvelines **6**, Manche / Paris / Seine-Saint-Denis /
      Seine-et-Marne **4** chacun.
- [ ] **1 point ultramarin** : Collège Terre Sainte, La Réunion. Encart, pas de dézoom mondial.
- [ ] Les 4 couleurs de l'original conservées (`#000091` / `#E18B76` / `#46724B` / `#D8C634`)
      **avec une légende**, que l'original n'a pas.
- [ ] Fiche de détail : les 7 informations de l'original (nom, statut, type, commune,
      département, académie, région) **plus** `mail` (52/52), et **liens conditionnels** —
      pas de « Fiche ONISEP » cliquable sur les 23 fiches qui n'en ont pas.
- [ ] Un **tableau** et un **export CSV** : la donnée doit être atteignable sans souris.
- [ ] Cadrage initial **sur la France**, pas sur l'Atlantique.

## Gabarit partagé — les trois cartes « tiroir » du portail

Les trois pages du lot (**ULIS-TFV** id 21, **Accompagnement à la déficience sensorielle** id 20,
**Label Égalité filles-garçons** id 19) sont **le même fichier de départ**, recopié et adapté.
Éléments strictement identiques, vérifiés en comparant les trois `$scope.blocks` :

- `<div class="container-fluid"><div class="ods-box"><ods-dataset-context …>` puis
  `<div class="donotcopy-specific"><div class="map-drawer-container" ng-class="{'…--active': ctx5.parameters['refine.<clé>'] }">`.
- Le `backdrop` cliquable qui remet `ctx5.parameters['refine.<clé>'] = undefined`.
- **`<ods-map class="map-drawer__map" display-control="false" location="3,18.50166,-3.66683"
  no-refit="false" scroll-wheel-zoom="true" search-box="true" toolbar-drawing="false"
  toolbar-fullscreen="true" toolbar-geolocation="false">`** — le centrage sur le Sahara
  occidental est le même sur les trois.
- `<ods-map-layer-group>` enveloppant N `<ods-map-layer>` tous en `tooltip-disabled="true"`,
  `caption="true"`, `border-color="#FFFFFF"`, `border-size="1"`, `shape-opacity="0.5"`,
  `point-opacity="1"`, et le quadruplet `refine-on-click-ctx5-*`.
- Le tiroir `map-drawer-container__drawer__partial` avec `ods-results-max="1"` sur ctx5,
  un `detail-header`, un `detail-body`, un `detail-footer` **vide**.
- Le couple `<a href="{{…fiche_onisep}}">Fiche ONISEP</a> - <a href="{{…web}}">Site web</a>`,
  **sans condition d'affichage, sur les trois pages**.
- L'accordéon `map-drawer-container__info` avec `ng-init` listant les états d'ouverture,
  un `filtre-searchbox`, un `filtre-separation`, une `entete-filtres` portant
  `<ods-clear-all-filters>`, un `body-filtres`.
- Les listes Départements / Académies en `ods-facet-results` **sur ctx6 jamais filtré**, en
  boutons radio, **sans compteur**, sur les trois.

Ce qui diffère est résumé dans le tableau comparatif de la fiche
[`accompagnement-deficience-sensorielle.md`](accompagnement-deficience-sensorielle.md),
§ « Les trois moules de couches ».
