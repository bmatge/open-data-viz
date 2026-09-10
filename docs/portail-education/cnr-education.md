# Cartographie CNR — « Notre école, faisons-la ensemble »

- **URL** : https://data.education.gouv.fr/pages/cnr/ (titre de l'onglet : « Cartographie CNR »)
- **Catalogue** : id **29**, thématique **Éducation**.
- **Producteur (métadonnée du jeu)** : **DGESCO** — Ministère de l'éducation nationale.
  Licence ouverte v2.0 (Etalab). Dernière modification du jeu : **2026-01-29**.
- **Jeu de données** : **`fr-en-cnr-base-nefle`** — « Écoles et établissements engagés
  dans la démarche du CNR Éducation », **6 024 lignes**, **40 champs**, sans clé.
  Une ligne = **un projet** (pas un établissement).
  - **Aucune ligne sans `position`** — le seul des trois jeux du lot dans ce cas.
  - Facettes déclarées : `libelle_region` (21), `libelle_academie` (32),
    `type_etablissement` (4), `themes_projets` (100 rendues), `debut_proj` (11),
    `code_departement` (100), **`dep_name` (11)**, `code_academie` (32),
    `nom_circonscription` (100), `nom_commune_verif` (100), `code_postal` (100).
  - **Remplissage des colonnes** (mesuré, `count(champ)` sur 6 024) :
    `etab_verif` 6 024 · `libelle_academie` 6 024 · `libelle_region` 6 024 ·
    `email_etabl` 6 021 · `nom_commune_verif` 6 021 · `objectifs_detailles_html` 6 021 ·
    `code_departement` 6 018 · `code_postal` 6 018 · `type_de_prestation` 6 017 ·
    `adresse_1` 5 996 · `eleves_benef` 5 952 · `debut_proj` 5 939 ·
    `partenaires_du_projet` 5 515 · `porteur_fonction` 5 508 · `nom_projet` 5 501 ·
    `themes_dgesco` 5 058 · `date_validation` 4 487 · `nom_circonscription` 4 231 ·
    `experimentation` 3 723 · `objectif` 3 518 · `idees_html` 2 084 ·
    `projet_remarquable` 1 443 · `plan_action_html` 1 630 · `etab_autres` 1 065 ·
    **`dep_name` 450** · **`objectifs_html` 0** · **`valorisation` 0**.
- **Relevé visuel** : 2026-09-10, Chrome, fenêtre 1568 × 751.

## Objectif de la dataviz et informations véhiculées

- **Question à laquelle elle répond** : « Quels projets pédagogiques innovants ont été
  déposés dans le cadre du CNR Éducation, où, et de quoi parlent-ils ? » C'est un
  **catalogue de projets consultable sur carte**, avec une fiche longue par projet.
- **Message porté** : implicite et purement volumétrique — « la démarche a essaimé
  partout ». Aucun chiffre n'est écrit nulle part sur la page.
- **Information que l'utilisateur doit obtenir** : pour un projet donné — son titre,
  son établissement, son académie, son porteur, le nombre d'élèves bénéficiaires, les
  dates, et **trois textes libres** (objectifs détaillés, idées initiales, plan d'action).
  C'est la seule page du lot dont le livrable soit du **texte rédigé**, pas un chiffre.
- **Ce qui n'est pas dans l'objet** :
  - **aucun dénombrement** : ni 6 024 projets, ni 1,56 million d'élèves bénéficiaires
    (somme de `eleves_benef`), ni le compte de la sélection courante ;
  - **aucune analyse thématique** : 179 valeurs de `themes_projets`, et pas un graphique ;
  - **aucun filtre par statut** : `validation_du_projet` (validé 5 642 / validé à
    compléter 253 / validé à analyser 129) et `projet_remarquable` (1 443) ne sont
    exposés nulle part ;
  - **aucune dimension temporelle** : `debut_proj` est une facette déclarée (11 valeurs),
    et la page n'en fait rien ;
  - aucun export, aucun tableau, aucun lien vers le jeu.

## Chiffres de référence (API v2.1, relevé 2026-09-10)

| Mesure | Valeur |
|---|---|
| Projets (lignes) | **6 024** |
| Élèves bénéficiaires cumulés (`sum(eleves_benef)`) | **1 561 649** (moyenne **262**, max **30 000**) |
| Projets inter-établissements (`nb_etab_autres > 0`) | **1 116** |
| Académies distinctes | **32** |
| Régions distinctes | **21** (dont un doublon de casse, cf. « Défauts ») |
| Départements renseignés (`dep_name`) | **11 valeurs, 450 lignes — 7,5 %** |
| Valeurs distinctes de `themes_projets` | **179** (champ multivalué : 13 910 occurrences) |

**Type d'établissement** — les quatre valeurs qui pilotent les quatre couches :
**Ecole 3 595** · **Collège 1 648** · **Lycée 756** · **EREA 25**. Somme = 6 024.

**Validation** : validé **5 642** · validé à compléter **253** · validé à analyser **129**.
Croisé avec le type : Ecole 3 320/190/85, Collège 1 580/37/31, Lycée 718/25/13,
EREA 24/1/0.

**Académies les plus fournies** : Créteil 559 · Lille 417 · Aix-Marseille 344 ·
Normandie 330 · Clermont-Ferrand 302 · Nantes 294 · Versailles 286 · Nice 262 ·
Montpellier 256 · Toulouse 254. **Queue** : Corse 45 · Guyane 35 · **ANDORRE 3** ·
**Saint Pierre et Miquelon 1**.

**Thèmes les plus fréquents** : Non mentionné 1 345 · Aménagements des espaces 1 006 ·
*(null 911)* · Lire, écrire, compter 848 · Bien-être 726 · Parcours d'apprentissage 686 ·
Éducation artistique et culturelle 605 · Français 520 · Climat scolaire, prévention de
la violence 502 · Classe flexible 460 · Numérique 448.

**Les 11 seules valeurs de `dep_name`** (celles que propose le filtre « Départements ») :
Martinique 148 · La Réunion 117 · Mayotte 73 · Guadeloupe 64 · Guyane 35 ·
Saint-Martin 5 · Seine-Saint-Denis 3 · Bouches-du-Rhône 2 · Haute-Vienne 1 ·
Saint-Barthélemy 1 · Saint-Pierre-et-Miquelon 1. **Total 450.**

**Ultramarins** : oui, et de façon écrasante dans `dep_name`. Les DROM sont visibles
d'emblée sur la carte au chargement (clusters distincts aux Antilles, en Guyane, à
Mayotte et à La Réunion).

## Le template AngularJS

**Six contextes sur le même jeu** — c'est le cœur de l'architecture de la page :

```html
<ods-dataset-context context="ctx1,ctx2,ctx3,ctx4,ctx5,ctx6"
  ctx1-dataset="fr-en-cnr-base-nefle" ctx1-parameters="{'refine.type_etablissement':'Ecole'}"
  ctx2-… "{'refine.type_etablissement':'Collège'}"
  ctx3-… "{'refine.type_etablissement':'Lycée'}"
  ctx4-… "{'refine.type_etablissement':'EREA'}"
  ctx5-dataset="fr-en-cnr-base-nefle"   <!-- fiche de détail, refinée sur 1_uai -->
  ctx6-dataset="fr-en-cnr-base-nefle">  <!-- listes de filtres, JAMAIS refiné -->
```

| Contexte | Rôle | Refine permanent |
|---|---|---|
| `ctx1` | **couche carte 1** — écoles, picto `ods-playground` | `type_etablissement:Ecole` |
| `ctx2` | **couche carte 2** — collèges, picto `ods-administration` | `type_etablissement:Collège` |
| `ctx3` | **couche carte 3** — lycées, picto `ods-college` | `type_etablissement:Lycée` |
| `ctx4` | **couche carte 4** — EREA, picto `ods-library` | `type_etablissement:EREA` |
| `ctx5` | fiche de détail du tiroir | `1_uai`, posé par le clic carte |
| `ctx6` | alimente la liste des thèmes, des départements et des académies | **aucun** |

**Réponse à la question « à quoi servent les 4 couches ? »** : elles ne portent **ni
quatre jeux, ni quatre informations** — c'est **une seule donnée découpée en quatre par
`type_etablissement`**, pour pouvoir attribuer à chaque type un **picto** différent.
Elles sont **simultanées**, jamais exclusives, et elles vivent toutes dans **un seul**
`<ods-map-layer-group>`. Comme la carte est en `display-control="false"`, il n'y a
**aucun sélecteur de couches**, et comme elle est en `display-legend="false"`, il n'y a
**aucune légende** : quatre pictos, zéro clé de lecture.

Le filtre « Type d'établissement » exploite ce découpage d'une façon retorse : cocher
« Collège » pose `q.type_etab = 'type_etablissement:Collège'` **sur les quatre
contextes** ; les trois autres ayant déjà un `refine` contradictoire, **ils renvoient
zéro** et leurs couches s'effacent. Le filtre ne sélectionne pas une couche : il en vide
trois. Vérifié à l'écran (cf. « Relevé », § 3).

## Relevé visuel exhaustif

La page **n'a ni titre ni texte**. Elle commence directement, sous la navigation du
portail, par un cadre bordé de **saumon** (`#F3A19...`, quatre côtés) qui contient tout.
Pas de H1, pas de H2, pas de chapô, pas de mention de source.

### 1. Colonne de gauche — le panneau « Filtrer les projets » (~320 px)

Titre centré en bleu **« Filtrer les projets »**, suivi, quand un filtre est actif, d'une
**icône ✖ sans libellé** (`<ods-clear-all-filters class="fa class" context="[ctx1..ctx4]"
except="'refine.type_etablissement'">`). Elle n'apparaît que si l'un des cinq filtres est
posé (`ng-show`), n'a **aucun texte accessible**, et la classe CSS qu'elle porte
s'appelle littéralement `class`.

**a. Recherche textuelle** — un `<input type="text">` nu sous un libellé
« Recherche textuelle ». Pas de placeholder, pas de bouton, pas d'icône. Il alimente un
`q.textual` construit à la main dans le `ng-change` :

```
#search(porteur_fonction,'X') OR #search(nom_projet,'X') OR #search(idees,'X')
OR #search(plan_action,'X') OR #search(objectifs_detailles,'X') OR #search(objectif,'X')
OR #search(experimentation,'X') OR #search(partenaires_du_projet,'X')
OR #search(themes_projets,'X') OR #search(themes_dgesco,'X')
```

**Dix champs**, recopiés sur les quatre contextes. Comportement mesuré, cf. § 5.

**b. Accordéon « Type d'établissement »** — cinq **boutons radio**, chacun suivi de son
picto Opendatasoft en SVG :

| Libellé | Picto | Valeur posée |
|---|---|---|
| Ecole | `playground.svg` (toboggan) | `type_etablissement:Ecole` |
| Collège | `administration.svg` (fronton) | `type_etablissement:Collège` |
| Lycée | `university.svg` (toque) | `type_etablissement:Lycée` |
| EREA | `library.svg` (livres) | `type_etablissement:EREA` |
| **Inter-établissements** | *(aucun)* | **`nb_etab_autres>0`** |

La cinquième entrée est d'une autre nature que les quatre premières : ce n'est pas un
type mais un critère (1 116 projets). Elle est la seule sans picto, et elle **n'a pas de
couche carte correspondante** — cocher « Inter-établissements » filtre les quatre
couches simultanément. Aucun compteur n'est affiché. Une fois un radio coché, **aucun
radio ne le décoche** : il faut la ✖ de l'accordéon ou celle du panneau.

**c. Accordéon « Thèmes »** — alimenté par un `ods-analysis` sur **ctx6** :
`ods-analysis-x="themes_projets" ods-analysis-serie-cnt="COUNT()" ods-analysis-max="1000"`.
Rendu : **177 boutons radio** comptés dans le DOM (pour 178 valeurs non nulles à l'API),
**par ordre alphabétique**, **sans compteur**, dans un accordéon déroulant sans
sous-groupement ni recherche. Extraits relevés :
« 1/4 d'heure lecture », « 2 heures de sport supplémentaires au collège »,
« 30 minutes d'APQ », « Alliances éducatives internationales », …, « Tenue commune »,
« ambition scolaire », « fracture numérique », « indicateurs », « lien périscolaire »,
« équithérapie ». **Environ 90 des 177 entrées commencent par « Autre »** (« Autre
Yoga », « Autre jonglage », « Autre LUDOTHEQUE », « Autre lutte contre l'absentéisme des
populations gitanes »…) : le champ est manifestement un « autre, précisez » recopié tel
quel.

**d. Accordéon « Territoires »** — contient deux sous-accordéons :

- **« Départements »** (`ods-facet-results` sur `dep_name`, tri `alphanum`, **ctx6**) :
  **11 boutons radio**, sans compteur — Bouches-du-Rhône · Guadeloupe · Guyane ·
  Haute-Vienne · La Réunion · Martinique · Mayotte · Saint-Barthélemy · Saint-Martin ·
  Saint-Pierre-et-Miquelon · Seine-Saint-Denis. Onze départements sur une centaine.
- **« Académies »** (`ods-facet-results` sur `libelle_academie`, `alphanum`, **ctx6**) :
  **32 boutons radio**, sans compteur — ANDORRE · Aix-Marseille · Amiens · Besançon ·
  Bordeaux · Clermont-Ferrand · Corse · Créteil · Dijon · Grenoble · Guadeloupe · Guyane ·
  La Réunion · Lille · Limoges · Lyon · Martinique · Mayotte · Montpellier · Nancy-Metz ·
  Nantes · Nice · Normandie · Orléans-Tours · Paris · Poitiers · Reims · Rennes ·
  Saint Pierre et Miquelon · Strasbourg · Toulouse · Versailles. (« ANDORRE » en tête,
  le tri alphanum plaçant les capitales d'abord.)

Ces deux listes sont branchées sur **ctx6, qui n'est jamais refiné** : elles ne cascadent
donc **jamais**. Choisir l'académie de Créteil ne réduit pas la liste des départements,
et les 11 départements restent les 11 mêmes.

### 2. La carte (`map-drawer-container__map`)

```html
<ods-map class="map-drawer__map" display-control="false" display-legend="false"
  location="3,18.50166,-3.66683" no-refit="true" scroll-wheel-zoom="true"
  search-box="true" toolbar-drawing="false" toolbar-fullscreen="true"
  toolbar-geolocation="false">
```

- **Cadrage initial** : `location="3,18.50166,-3.66683"` = **zoom 3 sur 18,50 N / 3,67 O**,
  c'est-à-dire **le nord du Mali, en plein Sahara**. À l'écran, la vue va de l'Amérique
  centrale au Kazakhstan et du Royaume-Uni à l'Afrique du Sud ; **la France occupe environ
  1 % de la surface de la carte**, en haut à droite. Échelle 1 000 km. C'est le premier
  écran de la page.
- **Fond** : tuiles Huwise / IGN. Au zoom 3, planisphère politique ; au zoom local, un
  plan routier clair.
- **Contrôles** : plein écran, zoom + / −, sélecteur de fond de carte (icône « couches »
  en bas à gauche), loupe « Rechercher un lieu » **posée sur la colonne de filtres**, à
  cheval sur le cadre saumon (défaut de superposition, cf. captures). Pas de dessin de
  zone (`toolbar-drawing="false"`), pas de géolocalisation.
- **Quatre couches, un seul groupe.** Toutes en `display="auto"`, `show-marker="false"`,
  `caption="true"`, bordure blanche 1 px, `shape-opacity="0.5"` — et **la même couleur
  `#C32D1C`** (rouge brique). Elles ne se distinguent que par leur **picto**.
- **Clustering automatique** au zoom 3 : chaque couche produit **ses propres bulles**.
  Comme les quatre couches se superposent exactement (même jeu, même géographie), on
  obtient **quatre bulles empilées au même endroit**, dont une seule est lisible. Relevé
  au chargement : au-dessus de la France, une grosse bulle rouge foncé dont le nombre est
  tronqué (« 8… »), partiellement recouverte par une bulle plus claire ; aux Antilles
  « 31 », en Guyane « 6 », à Mayotte « 11 », à La Réunion « 23 ». **Après avoir coché
  « Ecole »** (une seule couche restante), les mêmes emplacements affichent **3 296**,
  36, 133, 23, 33 et 74 — dont la somme fait exactement **3 595**, le nombre d'écoles.
  Autrement dit : **les chiffres visibles au chargement ne sont pas les bons**, ce sont
  ceux de la couche qui se trouve dessus.
- **`no-refit="true"`** : aucun recadrage, jamais.
- **Aucune légende** (`display-legend="false"`) : les quatre pictos ne sont expliqués
  nulle part. Vus au zoom local (Limoges) : toboggan, fronton, toque, livres.
- **`color-by-field="avancement_du_projet"`** avec deux `color-categories`
  (« Notre projet CNRE est validé et nous le mettons en œuvre » → `#F37A0A`,
  « Notre projet CNRE est en cours de finalisation » → `#000041`). **Ce champ n'existe
  pas** : `group_by=avancement_du_projet` renvoie
  `ODSQLError — Unknown field: avancement_du_projet`. Tous les marqueurs sont donc du
  `#C32D1C` de repli. Confirmé à l'écran.
- **Clic** : `refine-on-click-context="ctx5"` sur `1_uai`, `replace-refine="true"`.
  Pas d'infobulle au survol (`tooltip-disabled="true"`).

### 3. Le tiroir de détail (`map-drawer-container__drawer`)

Le clic sur un marqueur fait glisser un panneau depuis la droite (largeur ≈ 460 px), avec
un **backdrop** cliquable et une **croix** en haut à droite. Bandeau d'en-tête **saumon**,
titre en bleu : `{{debut_proj | date:'fullDate'}} - {{nom_projet}}`.

Relevé mot pour mot sur un collège de Limoges :

> **lundi 9 janvier 2023 - Aménagement d'une classe flexible - ULIS collège Firmin Roz**
>
> Projets innovants CNR Notre école, faisons la ensemble
>
> **Type_etablissement :** Collège
> **Académie :** Limoges
> **Département :**
>
> **Titre de la fiche :** Aménagement d'une classe flexible - ULIS collège Firmin Roz
> *Envoyer un courriel*
>
> **Fonction du porteur de projet :** Principal
> **Nom de l'école ou de l'établissement :** Collège Firmin Roz
> **Adresse complète :** 87280 Limoges
> **Région :** Nouvelle-Aquitaine
>
> **Nb élèves bénéficiaires du projet :** 12
>
> **Date de validation du projet :** 2023-01-09
>
> **Date de début du projet :** 2023-09-05
>
> **Descriptif du projet**
>
> **Objectifs détaillés:** Lutter contre les difficultés scolaires;L'évaluation des
> élèves;L'apprentissage des fondamentaux (plan maths et français) Ecole
> inclusive;Autre Aménagement des espaces (hors bâti scolaire)
>
> **Idées initiales :** *(deux paragraphes rendus en HTML via `ng-bind-html`)*
>
> **Plan d'action :** *(cinq paragraphes)*
>
> **Type de prestation demandée dans le cadre de CNR**
> Achat de matériel Intervenant extérieur Déplacement Formation Personnel EN

Cinq défauts sont **visibles dans cette seule capture** : « Département : » vide,
« Adresse complète : 87280 Limoges » sans rue, un lien « Envoyer un courriel » qui ne
peut pas fonctionner, les deux dates dont les libellés sont permutés par rapport aux
noms de colonnes, et « Type_etablissement » avec son underscore. Détail au chapitre
suivant.

### 4. Le mot « Backdrop »

Le voile derrière le tiroir est un `<div class="map-drawer-container__backdrop">` dont le
contenu textuel est le mot **« Backdrop »**. Il est présent dans le DOM en permanence et
ressort dans l'extraction de texte de la page. Placeholder de développement laissé en
production.

### 5. Coût réseau de la recherche textuelle — mesuré

Saisie de **quatre caractères** (« yoga ») dans le champ « Recherche textuelle », onglet
réseau vidé juste avant :

- **32 requêtes** vers `/api/records/1.0/…` pour ce seul mot ;
- **une par caractère, par contexte** : `y` → 4 `boundingbox`, `yo` → 4, `yog` → 4,
  `yoga` → 4, puis pour le dernier état 4 `geopreview` et 4 `download?fields=position`,
  plusieurs fois rejoués ;
- **11 réponses en HTTP 503** (`geopreview` et `download`), soit **un tiers des appels
  rejetés par le portail**.

Il n'y a **aucun anti-rebond** : le `ng-change` recopie la requête sur les quatre
contextes à chaque frappe, et chaque contexte redemande sa bounding box, son cluster et
ses positions. La chaîne `q` transportée fait environ **2 700 caractères** — les dix
`#search(...)` sont concaténés **avec l'indentation du template**, soit une cinquantaine
d'espaces par ligne, recopiés dans l'URL.

### 6. `clear-all-filters` — testé

La ✖ à côté de « Filtrer les projets » remet bien à zéro : le radio « Ecole » se décoche,
et la carte retrouve ses quatre bulles empilées. L'`except="'refine.type_etablissement'"`
préserve le refine structurel des quatre contextes — sans quoi les quatre couches
deviendraient identiques. Chaque accordéon a en outre sa propre ✖ (`fa-times-circle`),
elle aussi sans libellé, qui n'apparaît que si le filtre correspondant est posé.

## Défauts et bizarreries de l'original

1. **La carte s'ouvre sur le Sahara, au zoom 3.** `location="3,18.50166,-3.66683"`.
   La France y est un timbre-poste dans le coin. Aucun recadrage n'est possible
   (`no-refit`). C'est le défaut de cadrage le plus spectaculaire du corpus — pire que
   les quatre pages IPS centrées sur Zurich.

2. **`color-by-field="avancement_du_projet"` vise un champ inexistant.** Confirmé à
   l'API (`Unknown field`). La coloration par état d'avancement, seule information
   qualitative que la carte tentait de porter, ne s'applique jamais : tout est rouge.
   Le champ existant qui s'en rapproche est **`validation_du_projet`** (validé 5 642 /
   validé à compléter 253 / validé à analyser 129), et ses valeurs n'ont rien à voir avec
   les deux libellés codés dans `color-categories`.

3. **Aucune légende pour quatre pictos.** `display-legend="false"` : rien n'explique que
   le toboggan est une école et le fronton un collège. La correspondance n'existe que
   dans l'accordéon « Type d'établissement », à condition de l'ouvrir.

4. **Aucun sélecteur de couches.** `display-control="false"` : impossible d'isoler une
   couche, alors que la carte en porte quatre. Le seul moyen est le filtre radio, qui
   procède en vidant les trois autres.

5. **Les nombres affichés sur les clusters sont faux au chargement.** Quatre couches
   superposées produisent quatre bulles superposées ; seule celle du dessus est lisible.
   Au-dessus de la France, la valeur visible est tronquée par le cadre de la bulle
   voisine. Mesure : « 31 » aux Antilles avant filtre, **133** après filtre « Ecole » —
   la première n'était pas un total, c'était le compte d'une couche prise au hasard.

6. **Le filtre « Départements » ne couvre que 7,5 % des projets.** `dep_name` est nul
   sur **5 574 lignes sur 6 024**. Les 11 valeurs proposées sont, à trois exceptions près
   (Seine-Saint-Denis 3, Bouches-du-Rhône 2, Haute-Vienne 1), **des territoires
   ultramarins**. Un utilisateur métropolitain qui ouvre « Territoires › Départements »
   voit une liste d'outre-mer et n'y comprend rien. Et la colonne bien remplie existe :
   **`code_departement` est renseigné 6 018 fois** et déclaré comme facette. C'est
   exactement le piège maison « deux colonnes pour la même info » : la page a choisi la
   mauvaise sans compter les vides.

7. **Le lien « Envoyer un courriel » ne peut pas fonctionner.** Le template écrit
   `<a href="mailto:{{email_etabl}}">`. Mesuré : **0 des 6 021 valeurs de `email_etabl`
   ne contient un « @ »** — ce sont des **noms d'académie** (Créteil 559, Lille 417,
   Aix-Marseille 344…). Le lien produit donc `mailto:Limoges`. La colonne a été mal
   alimentée à l'import, et personne n'a vérifié.

8. **Les deux dates sont interverties.** Le template affiche `debut_proj` sous le libellé
   « **Date de validation du projet** » et `date_validation` sous « **Date de début du
   projet** ». Sur le collège Firmin Roz cela donne « validation 2023-01-09 / début
   2023-09-05 », chronologiquement plausible ; mais sur un lycée de Saint-Benoît
   (La Réunion), `debut_proj` = 2024-01-22 et `date_validation` = 2023-08-12 donnent
   « validation 2024-01-22 / début 2023-08-12 » — un projet commencé cinq mois avant sa
   validation. Les libellés et les noms de colonnes se contredisent, et les données ne
   tranchent pas. Par-dessus, **`debut_proj` est affiché deux fois** : une fois en
   `fullDate` dans le bandeau, une fois brut (`2023-01-09`) dans le corps.

9. **Le bloc « Objectifs détaillés » affiche une colonne vide.** Le template concatène
   `{{objectifs_detailles_html}}` puis `{{objectifs_html}}` ; or **`objectifs_html` est
   nul sur les 6 024 lignes**. Pendant ce temps, **`objectif`** — le texte rédigé de
   l'objectif, renseigné sur **3 518 projets** — n'est affiché nulle part.
   `valorisation` est également vide sur 6 024 lignes.

10. **« Adresse complète » perd la rue.** Le template lit `detailEtab.fields.Adresse_1`
    (majuscule) alors que le champ s'appelle **`adresse_1`**. Résultat vu à l'écran :
    « Adresse complète : 87280 Limoges ». La rue est pourtant présente sur 5 996 lignes.

11. **Les libellés du back-office sont affichés bruts.** « **Type_etablissement :** »,
    avec son underscore, en tête de fiche. Aucun nettoyage.

12. **177 boutons radio dans un accordéon, sans compteur ni recherche.** Le champ
    `themes_projets` est un « autre, précisez » non contrôlé : une centaine d'entrées
    commencent par « Autre », et on y trouve deux fois le même thème à une faute près —
    « Compétences **psychosociales** / Culture de l'engagement » (139) **et**
    « Compétences **pscychosociales** / Culture de l'engagement » (4). S'ajoutent des
    valeurs concaténées (« Numérique EMI », « Éducation artistique et culturelle
    Options pour éviter »), « Non mentionné » (1 345, le plus gros groupe) et 911 nuls.

13. **Les listes de filtres ne cascadent pas.** Elles sont branchées sur **ctx6**, qui
    n'est jamais refiné. Choisir une académie ne réduit ni les départements ni les
    thèmes, et aucun compteur ne bouge — il n'y en a pas.

14. **La recherche textuelle sature l'API** : 4 caractères = 32 requêtes, dont
    **11 en HTTP 503**. Pas d'anti-rebond, pas de longueur minimale, et une requête
    dupliquée sur quatre contextes.

15. **Le mot « Backdrop » est visible dans le DOM** — placeholder de développement.

16. **Aucun libellé accessible sur les commandes.** Les cinq ✖ (`clear-all-filters` et
    les quatre ✖ d'accordéon) sont des `<i class="fa">` nus, sans texte ni `aria-label`.
    La classe CSS de l'une d'elles est `class`.

17. **Doublons de casse dans le référentiel** : `libelle_region` contient à la fois
    **ANDORRE (3)** et **Andorre (3)** ; `libelle_academie` porte **ANDORRE** et
    **Saint Pierre et Miquelon** (sans traits d'union, contrairement à `dep_name` qui
    écrit « Saint-Pierre-et-Miquelon »).

18. **La page n'a ni titre, ni introduction, ni source.** Elle commence par un cadre
    saumon. Le seul texte explicatif est la phrase « Projets innovants CNR Notre école,
    faisons la ensemble » (sans trait d'union à « faisons-la »), qui n'apparaît qu'une
    fois un projet ouvert.

## Transposition vers `dsfr-data`

Attributs vérifiés dans les références générées depuis le source
(`get_skill(dsfrDataSource|dsfrDataFacets|dsfrDataSearch|dsfrDataMap|dsfrDataDisplay,
"reference")` et `get_skill(attributeGrammars, "guide")`).

| Original Opendatasoft | `dsfr-data` | Attributs nécessaires |
|---|---|---|
| `ctx1..ctx4` — **quatre contextes refinés par type** | **une seule** `<dsfr-data-source>` | `api-type="opendatasoft"`, `base-url`, `dataset-id="fr-en-cnr-base-nefle"`, `server-side`, `page-size`. Les quatre contextes n'existent que parce qu'ODS ne sait pas colorer/picto-typer une couche par catégorie **et** filtrer indépendamment. Un `color-field` le fait en une balise. |
| `ctx6` — contexte non refiné pour les listes | **rien** | Les facettes se branchent sur la source filtrée ; le contexte séparé est un contournement (et la cause du défaut n° 13). |
| `ctx5` — contexte de la fiche | **rien** | La popup reçoit le record cliqué. |
| **Quatre `<ods-map-layer>` dans un `<ods-map-layer-group>`** | **un seul** `<dsfr-data-map-layer>` | `source`, `type="marker"`, `geo-field="position"`, `color-field="type_etablissement"`, `color-map="Ecole:#000091,Collège:#009081,Lycée:#A558A0,EREA:#B34000"` (paires `valeur:#couleur`, **virgules**), `cluster`, `cluster-radius`, `max-items="10000"` (le défaut de 5 000 est sous les 6 024 — piège PG-013), `tooltip-field="etab_verif"`. **Un seul cluster par lieu**, donc **un compte juste** : le défaut n° 5 disparaît par construction. |
| Les quatre pictos ODS | **écart assumé** | `dsfr-data-map-layer` n'a pas d'attribut de picto (référence : `type` ∈ marker/geoshape/circle/heatmap ; pas de `picto`/`icon`). La différenciation passe par la **couleur** — et elle gagne une légende, ce que les pictos n'avaient pas. |
| `display-legend="false"` (aucune légende) | `<dsfr-data-map-legend>` | `for`, `label="Type d'établissement"`. `getLegendEntries()` retourne les paires de `color-map` : la légende est **dérivée du rendu**. |
| `display-control="false"` (aucun sélecteur) | `<dsfr-data-facets display="type_etablissement:checkbox">` | Cocher/décocher un type **est** le sélecteur de couches, avec en plus les compteurs que l'original n'affiche pas. |
| `<ods-clear-all-filters>` | **natif** | `dsfr-data-facets` rend ses valeurs sélectionnées décochables une à une. Pour un « tout effacer » global, `dsfr-data-context-tags` (tags supprimables) — **mais sa référence ne lui donne qu'un `for` pointant un `dsfr-data-context`**, ce qui suppose de basculer les filtres sur `dsfr-data-context` + `dsfr-data-context-filter`. **Non vérifié**, écarté de l'esquisse. |
| L'`<input>` de recherche textuelle + `q.textual` sur 10 champs | `<dsfr-data-search>` | `server-search`, `fields="nom_projet, porteur_fonction, idees, plan_action, objectifs_detailles, objectif, experimentation, partenaires_du_projet, themes_projets, themes_dgesco"` (virgules), `count`, `debounce="300"` (**le défaut**), `min-length="3"`, `label="Rechercher un projet"`, `placeholder`. Le `debounce` et le `min-length` **par défaut** suffisent à supprimer les 32 requêtes du défaut n° 14 : c'est le contraste le plus net du lot entre un widget et du `ng-change` écrit à la main. |
| `ods-analysis` sur `themes_projets` → 177 radios | `<dsfr-data-facets>` | `fields="… , themes_projets"`, `display="themes_projets:radio"` (**dropdown repliable avec recherche intégrée** — c'est le seul cas du lot où `radio` est le bon mode, cf. PG-023 : il faut un choix unique **et** une recherche dans 177 valeurs), `max-values="10"`. |
| `ods-facet-results` sur `dep_name` (11 valeurs) | même `<dsfr-data-facets>` | **`code_departement`** plutôt que `dep_name` : 6 018 renseignés contre 450. Il faut alors un libellé lisible — soit un `dsfr-data-normalize replace-fields`, soit un `dsfr-data-join` sur un référentiel départemental. **Le vrai correctif est un choix de colonne, pas un attribut.** |
| Le tiroir latéral | `<dsfr-data-map-popup>` + `<template>` | `mode="panel-right"`, `title-field="nom_projet"`, `width="480px"`. Le tiroir de l'original **est** un `panel-right` : c'est le seul composant du lot où la transposition est un pour un. |
| `ng-bind-html` sur `idees_html` / `plan_action_html` | **point dur** | Cf. « Limites » n° 1. |
| `{{debut_proj \| date:'fullDate'}}` | `select` ODSQL en amont | Piège FP-003 : pas de format `:date` dans un template ; `date_format(debut_proj, "EEEE d MMMM yyyy") as debut_txt` + `timezone=Europe/Paris` dans le `select` de la source. |
| `<a href="mailto:{{email_etabl}}">` cassé | **à supprimer** | La colonne ne contient pas d'emails. Reproduire le lien serait reproduire un bug. |
| — (absent de l'original) | `<dsfr-data-kpi>` × 3 | `value="meta:total"` (projets de la sélection), `value="eleves_benef:sum"` `format="compact"` (1,56 M), `value="eleves_benef:avg"` `format="nombre"` `decimals="0"`. Trois chiffres que la page n'affiche jamais. |
| — (absent de l'original) | `<dsfr-data-a11y>` | `table`, `download`, `for`. |

### Esquisse de code

```html
<!-- 6 024 projets, 40 champs dont 3 textes longs. Aucune ligne sans position.
     server-side : le tiroir de détail ne lit qu'un record à la fois. -->
<dsfr-data-source id="cnr"
  api-type="opendatasoft"
  base-url="https://data.education.gouv.fr"
  dataset-id="fr-en-cnr-base-nefle"
  select='*, date_format(debut_proj, "d MMMM yyyy") as debut_txt, date_format(date_validation, "d MMMM yyyy") as validation_txt'
  server-side page-size="50">
</dsfr-data-source>
<!-- ⚠ `select='*, …'` NON VÉRIFIÉ sur cet adaptateur : la référence de `select` dit
     seulement « clause SELECT (pour ODS) ». À confirmer que l'étoile cohabite avec un
     alias. Repli : énumérer les champs utiles. -->

<div class="fr-container fr-mt-6w">
  <h1>CNR Éducation — « Notre école, faisons-la ensemble »</h1>
  <p class="fr-text--lead">
    6 024 projets pédagogiques déposés par des écoles, collèges, lycées et EREA,
    au bénéfice de 1,56 million d'élèves. 1 116 d'entre eux associent plusieurs
    établissements.
  </p>

  <div class="fr-grid-row fr-grid-row--gutters">
    <div class="fr-col-12 fr-col-md-3">
      <h2 class="fr-h6">Filtrer les projets</h2>

      <!-- debounce 300 ms et min-length 3 par défaut : les 32 requêtes de l'original
           pour 4 caractères deviennent 1. -->
      <dsfr-data-search id="q" source="cnr" server-search count min-length="3"
        label="Rechercher un projet"
        placeholder="Un mot du titre, des objectifs, du plan d'action…"
        fields="nom_projet, porteur_fonction, idees, plan_action, objectifs_detailles, objectif, experimentation, partenaires_du_projet, themes_projets, themes_dgesco">
      </dsfr-data-search>

      <dsfr-data-facets id="f" source="q" server-facets
        fields="type_etablissement, themes_projets, libelle_academie, libelle_region, validation_du_projet"
        labels="type_etablissement:Type d'établissement | themes_projets:Thème | libelle_academie:Académie | libelle_region:Région | validation_du_projet:État du projet"
        display="type_etablissement:checkbox | themes_projets:radio | libelle_academie:multiselect | libelle_region:multiselect | validation_du_projet:checkbox"
        searchable="themes_projets, libelle_academie"
        max-values="8" sort="count:desc">
      </dsfr-data-facets>
      <!-- « Départements » : dep_name est nul à 92,5 %. On prend code_departement
           (6 018 renseignés) et on le libelle par jointure, ou on s'en passe :
           l'académie couvre le besoin sans mentir. -->
    </div>

    <div class="fr-col-12 fr-col-md-9">
      <dsfr-data-kpi-group class="fr-mb-3w">
        <dsfr-data-kpi source="f" value="meta:total" format="nombre" col="4"
          heading="Sélection" label="projets"></dsfr-data-kpi>
        <dsfr-data-kpi source="f" value="eleves_benef:sum" format="compact" col="4"
          heading="Élèves bénéficiaires" label="cumulés"></dsfr-data-kpi>
        <dsfr-data-kpi source="f" value="eleves_benef:avg" format="nombre" decimals="0" col="4"
          heading="Par projet" label="élèves en moyenne"></dsfr-data-kpi>
        <!-- ⚠ :sum et :avg s'évaluent sur les données REÇUES. Derrière server-side
             page-size="50" ils ne portent que sur la page. Cf. « Limites » n° 3. -->
      </dsfr-data-kpi-group>

      <dsfr-data-map id="carte" name="Projets CNR Éducation"
        center="46.6,2.3" zoom="6" height="640px"
        tiles="ign-plan" tiles-style="muted"
        fit-bounds fit-max-zoom="13" fit-zone="none">
        <dsfr-data-map-layer id="projets" source="f" type="marker"
          geo-field="position"
          color-field="type_etablissement"
          color-map="Ecole:#000091,Collège:#009081,Lycée:#A558A0,EREA:#B34000"
          tooltip-field="etab_verif"
          cluster cluster-radius="60" max-items="10000">
        </dsfr-data-map-layer>
        <dsfr-data-map-legend for="projets" label="Type d'établissement"></dsfr-data-map-legend>
        <dsfr-data-map-popup for="projets" mode="panel-right"
          title-field="nom_projet" width="480px">
          <template>
            <p class="fr-badge fr-badge--sm">{{type_etablissement}}</p>
            <p class="fr-text--sm fr-mb-1v"><strong>{{etab_verif}}</strong></p>
            <p class="fr-text--sm fr-mb-2v">{{adresse_1|}} {{code_postal}}
               {{nom_commune_verif}} — académie de {{libelle_academie}},
               {{libelle_region}}</p>
            <p class="fr-highlight">{{eleves_benef|—}} élèves bénéficiaires</p>
            <p class="fr-text--xs">Début {{debut_txt|non renseigné}} ·
               validation {{validation_txt|non renseignée}} ·
               {{validation_du_projet}}</p>
            <h3 class="fr-h6">Objectifs</h3>
            <p class="fr-text--sm">{{objectif|non renseignés}}</p>
            <h3 class="fr-h6">Idées initiales</h3>
            <p class="fr-text--sm">{{idees|non renseignées}}</p>
            <h3 class="fr-h6">Plan d'action</h3>
            <p class="fr-text--sm">{{plan_action|non renseigné}}</p>
          </template>
        </dsfr-data-map-popup>
      </dsfr-data-map>

      <dsfr-data-a11y source="f" for="carte" table download
        filename="projets-cnr.csv" label="Données de la carte"
        label-field="nom_projet"
        value-field="etab_verif, type_etablissement, nom_commune_verif, libelle_academie, eleves_benef">
      </dsfr-data-a11y>
    </div>
  </div>
</div>
```

## Limites et points durs identifiés

1. **Le HTML des textes longs.** L'original rend `idees_html` et `plan_action_html` avec
   `ng-bind-html` : les `<br/>` et la mise en forme sont interprétés.
   *Obstacle* : le `<template>` de `dsfr-data-map-popup` interpole `{{champ}}` ; rien
   dans la référence n'indique qu'il désérialise du HTML, et supposer qu'il le fasse
   serait une faille XSS sur un champ alimenté par saisie libre d'établissement.
   *Voie native essayée* : utiliser les colonnes **texte brut** jumelles — `idees`
   (2 084 renseignés), `plan_action` (1 630), `objectif` (3 518) — qui existent à côté
   des `_html` et portent les mêmes contenus sans balises. C'est ce que fait l'esquisse.
   *Contrepartie honnête* : on perd les sauts de ligne (les `<br/>` deviennent des
   espaces dans la version brute) ; un `white-space: pre-line` sur le paragraphe les
   restitue si le champ brut conserve les `\n` — **non vérifié**.
   *Verdict* : ce n'est pas une limite de `dsfr-data`, c'est un choix de colonne. Mais
   il faut le dire : sur un jeu où le livrable **est** du texte rédigé, un composant de
   visualisation de données n'est pas l'outil idéal.

2. **`max-items` par défaut (5 000) est sous les 6 024 projets.** Piège PG-013 déjà payé :
   au-delà, un bandeau « zoomez » qui ne charge rien. `max-items="10000"` + `cluster`
   (la référence dit qu'avec `cluster`, 20 000 est sans risque). **À noter** : l'original
   subit exactement le même plafond côté ODS — la page Génération 2024, sur le même
   portail, affiche « ⚠ Certaines couches sont affichées partiellement pour des raisons de
   performance. Essayez de zoomer. » Ce n'est donc pas une faiblesse propre à
   `dsfr-data`. **Non vérifié au navigateur** pour 6 024 marqueurs `dsfr-data`.

3. **Les KPI d'agrégat et la pagination serveur se contredisent.** `eleves_benef:sum` et
   `:avg` s'évaluent sur les **données reçues** ; derrière `server-side page-size="50"`
   ils ne porteraient que sur la page. `meta:total` règle le cas du compte (et lui seul).
   *Voie native* : une seconde `dsfr-data-source` d'agrégation
   (`select="sum(eleves_benef) as total_eleves"` + `limit="1"`, lu en `:max` selon le
   piège maison), branchée sur le même `where` — mais elle **n'écouterait pas les
   facettes**. *Arbitrage* : soit des KPI globaux figés à côté d'une carte filtrée, soit
   un chargement complet côté client (6 024 lignes, faisable : le jeu ne dépasse pas le
   plafond des 10 000 de l'API, contrairement au jeu des langues). **Ici le chargement
   complet est la bonne réponse** — c'est la différence de traitement entre ce jeu et
   celui des langues. **Non vérifié.**

4. **Les pictos par catégorie.** ODS pose `picto="ods-playground"` par couche.
   `dsfr-data-map-layer` n'expose ni `picto` ni `icon` (référence complète consultée).
   *Est-ce une limite de la bibliothèque ou une transposition à l'identique ?* Les deux
   se discutent : un jeu de pictogrammes par catégorie est une capacité cartographique
   légitime, et son absence est un manque réel. Mais **dans cette page précise**, les
   pictos remplaçaient une légende absente ; les remplacer par une couleur + une légende
   dérivée du rendu **répond mieux au besoin**. À remonter comme demande, sans en faire
   un obstacle à la reproduction.

5. **Un « tout effacer » global.** L'original a `ods-clear-all-filters` avec un `except`.
   `dsfr-data-facets` décoche valeur par valeur ; `dsfr-data-context-tags` offre des tags
   supprimables mais **son unique attribut `for` désigne un `dsfr-data-context`**, pas un
   `dsfr-data-facets` — le poser suppose de refondre les filtres autour de
   `dsfr-data-context` + `dsfr-data-context-filter`. **Non vérifié** ; c'est le même
   constat que sur la fiche IPS Collèges, ce qui en fait une demande récurrente.

6. **Le champ multivalué `themes_projets`.** L'API le renvoie en **tableau JSON**
   (vérifié : `['Mixité sociale', 'Egalité fille-garçon', …]`), 13 910 occurrences pour
   6 024 lignes. `dsfr-data-facets` « traite le tableau comme un champ multi-valeurs :
   une entrée de facette par élément » (grammaire de `split`) — **donc rien à faire, ça
   marche nativement**, et `dsfr-data-normalize split` serait inutile ici. Piège
   symétrique à signaler : ne pas appliquer `split` à un champ **déjà** tableau.
   **Non vérifié en `server-facets`** (le mode serveur délègue à `/facets`, qui renvoie
   bien 100 valeurs — donc **plafonné à 100 sur 179**, comme le département des langues ;
   `display="themes_projets:radio"` avec sa recherche ne récupérera pas les 79 restantes).

7. **Ce qui ne se transpose pas, et n'a pas à l'être.**
   - Les **six contextes** : cinq d'entre eux sont des contournements du modèle ODS.
   - Le **mot « Backdrop »**, les **✖ sans libellé**, la **liste des 11 départements**,
     le **`mailto:` cassé** et les **dates permutées** : ce sont des bugs. Les reproduire
     serait un contresens.
   - Le **cadrage sur le Sahara** : idem.

8. **Point dur d'énoncé.** Ce jeu porte 6 024 récits de projets pédagogiques, avec des
   thèmes, des budgets d'élèves et des dates — et la page n'en fait qu'un localisateur.
   La transposition honnête ajoute au moins : le compte, la somme des bénéficiaires, la
   répartition par thème et par académie. C'est le jeu du lot qui appellerait le plus un
   `dsfr-data-list` avec recherche plein texte **en plus** de la carte : le besoin réel
   (« trouver un projet qui parle de X ») est textuel, pas géographique.

## Données à reproduire fidèlement

- [ ] Jeu `fr-en-cnr-base-nefle` — **6 024 projets**, **0 sans position**.
- [ ] Types : Ecole **3 595** · Collège **1 648** · Lycée **756** · EREA **25**
      (somme 6 024), **différenciés visuellement et expliqués par une légende**.
- [ ] Critère « Inter-établissements » : **1 116** projets (`nb_etab_autres > 0`).
- [ ] Élèves bénéficiaires : total **1 561 649**, moyenne **262**, maximum **30 000**.
- [ ] Académies : **32** valeurs, Créteil 559 en tête, ANDORRE 3 et Saint-Pierre-et-Miquelon 1
      en queue.
- [ ] Thèmes : **179** valeurs (multivalué, 13 910 occurrences) — dont « Non mentionné »
      1 345 et 911 nuls, qu'il faut **compter et nommer** plutôt que masquer.
- [ ] État de validation : **5 642 / 253 / 129** — une information que l'original ne
      montre pas alors que sa carte prétendait la colorer.
- [ ] Filtre départemental fondé sur **`code_departement` (6 018 renseignés)**, pas sur
      `dep_name` (450). C'est le test de fidélité qui distingue une reproduction d'un
      décalque.
- [ ] Fiche projet : titre, établissement, adresse **complète** (rue incluse), académie,
      région, porteur, bénéficiaires, **les deux dates correctement libellées**, et les
      trois textes (objectif, idées, plan d'action) — dont **`objectif`, que l'original
      n'affiche pas**.
- [ ] Cadrage **sur la France**, pas sur le Sahara ; recadrage sur la sélection.
- [ ] Recherche plein texte sur les 10 mêmes champs, **avec anti-rebond** : une requête
      par recherche, pas 32.
