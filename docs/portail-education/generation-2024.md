# Établissements labellisés « Génération 2024 »

- **URL** : https://data.education.gouv.fr/pages/dataviz-generation2024/
- **Catalogue** : id **33**, thématique **Éducation**.
- **Producteur (métadonnée du jeu)** : **DGESCO** — Ministère de l'éducation nationale.
  Licence ouverte v2.0 (Etalab). Dernière modification du jeu : **2026-08-05**.
- **Jeu de données** : **`fr-en-etablissements-labellises-generation-2024`** —
  **11 221 lignes**, **79 champs** annoncés, sans clé.
  - **79 champs, dont 44 sont vides.** Les colonnes `column_36` à `column_79`
    (44 colonnes, libellées « Column 36 » … « Column 79 ») ont **0 valeur non nulle sur
    11 221** — vérifié par `count(column_36)`, `count(column_37)`, `count(column_50)`,
    `count(column_79)`, tous à 0. **Le jeu réel a 35 champs.** C'est un import CSV dont
    les colonnes de débordement n'ont jamais été nettoyées.
  - **292 lignes sans `position`** ; 10 929 avec `latitude` (donc 292 sans).
  - Facettes déclarées : `academie` (33), `dept` (100), `type` (39), `cp` (100),
    `commune` (100), `educ_prio` (2), `region` (95), `statut_public_prive` (5),
    `cite_educative` (1), `ulis` (2), `segpa` (2), `section_sport` (2),
    `lycee_agricole` (2), `lycee_militaire` (2), `lycee_des_metiers` (2),
    `nom_circonscription` (100), `ministere_tutelle` (9), `debut_labellisation` (8),
    `fin_labellisation` (1). **Dix-neuf facettes déclarées, zéro filtre sur la page.**
- **Relevé visuel** : 2026-09-10, Chrome, fenêtre 1568 × 751.

## Objectif de la dataviz et informations véhiculées

- **Question à laquelle elle répond** : « Où sont les établissements labellisés
  Génération 2024 ? » Rien de plus : la page est **une carte, seule**, sans filtre, sans
  chiffre, sans texte.
- **Message porté** : « le label a couvert tout le territoire ». Il est porté
  exclusivement par la densité visuelle des marqueurs.
- **Information que l'utilisateur doit obtenir** : pour un établissement cliqué — son
  nom, son type, son département, sa commune, son code postal, sa rue et son adresse
  mail. Sept lignes.
- **Ce qui n'est pas dans l'objet** :
  - **aucun compte** : ni 11 221, ni la répartition par type, ni par académie ;
  - **aucun filtre** — c'est la seule page du lot sans un seul widget de filtrage, alors
    que le jeu porte **19 facettes déclarées** et que les huit contextes de la page
    posent chacun `disjunctive.academie`, `disjunctive.commune`, `disjunctive.dept`,
    `disjunctive.type`, `disjunctive.educ_prio` et `disjunctive.cp` — **six déclarations
    de disjonction pour des facettes qu'aucun widget n'expose** ;
  - **aucune dimension temporelle** : `debut_labellisation` s'étale sur 18 dates de 2017
    à 2024, et **`fin_labellisation` vaut `2025-09-01` pour les 11 221 lignes** — c'est
    l'information la plus importante du jeu, et elle n'est nulle part (cf. « Défauts »
    n° 1) ;
  - **aucun des attributs du label** : `effectif` (10 535 renseignés, 3,26 M d'élèves),
    `educ_prio` (REP 1 135 / REP+ 730), `qpv`, `cite_educative` (840), `ulis` (2 846),
    `segpa` (634), `section_sport` (1 861), `lycee_des_metiers` (212), `lien_onisep`
    (9 445) — **rien de tout cela n'est exploité**, ni en couleur, ni en filtre, ni dans
    l'infobulle.

## Chiffres de référence (API v2.1, relevé 2026-09-10)

| Mesure | Valeur |
|---|---|
| Établissements (lignes) | **11 221** |
| Lignes sans `position` | **292** |
| Effectif cumulé (`sum(effectif)`) | **3 263 187** élèves (moyenne **310**) |
| Académies distinctes | **33** |
| Valeurs distinctes de `region` | **95** (!) |
| Types d'établissement (`type`) | **39** |
| Points hors longitude −20°…+30° | **334** |
| Emprise | lat **−33,94** à **54,43**, lon **−122,48** à **151,24** — le monde entier |

**`ministere_tutelle` — les 9 valeurs réelles**, qui pilotent (ou pas) les 8 couches :

| Valeur réelle | Lignes | Couche correspondante |
|---|---:|---|
| Ministère de l'éducation nationale | **10 694** | couche 1 ✅ |
| Ministère de la santé et de la solidarité nationale | **154** | couche 4 ✅ |
| Ministère des relations extérieures | **130** | couche 7 ✅ |
| Ministère de l'agriculture | **125** | couche 3 ✅ |
| **Ministère de l'enseignement supérieur et de la recherche** | **93** | **aucune** ❌ |
| Ministère de la jeunesse et des sports | **15** | couche 5 ✅ |
| Ministère de la défense | **6** | couche 6 ✅ |
| **sans tutelle** | **3** | **aucune** ❌ |
| **Ministère du redéploiement industriel** | **1** | **aucune** ❌ |

Couvert par les couches : **11 124**. **97 établissements ne sont sur aucune couche.**

**`type` — les 39 valeurs** (les 10 premières) : Ecole 7 413 · Collège 2 375 ·
Lycée 982 · Médico-social 112 · Lycée français à l'étranger 100 · Université 54 ·
Institut médico-éducatif 23 · Collège français à l'étranger 19 · EREA 18 ·
Ecole d'ingénieurs 18. Puis une longue traîne : Etablissement de formation aux métiers
du sport 15, Autre 14, Ecole primaire française à l'étranger 11, MFR 10, Autres écoles
post-bac non universitaires 8, Ecole de commerce 8, Institut de rééducation 6,
Service Administratif 5, Organisme de formation/CFA 4, Etablissement pour infirmes
moteurs 3, et **19 types à 1 ou 2 lignes** (Ecole Normale Supérieure 1, Institut
d'études politiques 1, Foyer de l'enfance 1, Etablissement pour sourds-aveugles 1…).

**`statut_public_prive`** : Public **10 013** · Privé **1 199** · `null` 5 ·
`0` **2** · Consulaire 1 · « Privé sous contrat » **1**.

**`debut_labellisation`** — 18 dates : 2022-09-01 **4 532** · 2023-09-01 1 419 ·
2020-09-01 1 186 · 2023-01-01 1 145 · 2019-09-01 826 · 2024-01-01 623 · 2018-09-01 425 ·
2021-09-01 339 · 2024-04-01 320 · 2017-09-01 162 · 2023-06-01 150 · 2019-02-01 30 ·
2019-06-01 26 · 2021-01-01 18 · 2020-06-01 10 · 2020-01-09 8 · 2019-08-31 1 ·
2019-12-01 1.

**`fin_labellisation`** : **une seule valeur, `2025-09-01`, pour les 11 221 lignes.**

**Académies les plus fournies** : Versailles 1 601 · Toulouse 772 · Créteil 691 ·
Grenoble 690 · Bordeaux 602 · Nantes 587 · Normandie 520 · Lyon 487.
**Queue** : Martinique 83 · Corse 79 · Guyane 21 · Mayotte 19 · Nouvelle Calédonie 1.

**Ultramarins et étranger : oui, massivement.** Les valeurs de `region` comprennent les
13 régions métropolitaines, « TOM et Collectivités territoriales » (129), La Réunion
(120), Guadeloupe (84), Martinique (83), Corse (79), Guyane (21), Mayotte (19), **et
81 pays** : Maroc 14, Madagascar 7, États-Unis 6, Maurice 5, Tunisie 5, Espagne 4,
Liban 4, Allemagne 3, Australie 3, Chine 3, … jusqu'à Viet Nam 1. Les 130
établissements « à l'étranger » correspondent exactement aux 130 du Ministère des
relations extérieures (Lycée français à l'étranger 100 + Collège 19 + École primaire 11).

**`precision_localisation`** (11 129 renseignés) : Numéro de rue 8 639 · Rue 1 244 ·
`PLAQUE_ADRESSE` 604 · Ville 360 · **`0` 131** · `BATIMENT` 63 · Lieu-dit 46 ·
**`NE SAIT PAS` 21** · **`0,00` 15** · `ZONE_ADRESSAGE` 3 · `COMMUNE` 2 · Parfaite 1.
Deux référentiels mélangés (français en clair et codes en capitales), plus des `0`.

## Le template AngularJS — la pièce maîtresse : huit contextes, huit groupes, huit couches

C'est le maximum du portail. Le `<ods-dataset-context>` déclare **huit contextes sur le
même jeu de données**, nommés `frenetablissementslabellisesgeneration2024`,
`…20240`, `…20241`, … `…20246`. Ils portent **tous** les mêmes paramètres —
`sort:'uai'`, `disjunctive.academie`, `disjunctive.commune`, `disjunctive.dept`,
`disjunctive.type`, `disjunctive.educ_prio`, `disjunctive.cp` — et **ne diffèrent que
par une valeur de `refine.ministere_tutelle`**.

Chaque contexte alimente **un** `<ods-map-layer>`, seul dans **son** `<ods-map-layer-group>`.
Huit groupes, huit couches, une couche par groupe.

| # | Titre du groupe (tel qu'affiché) | Contexte | `refine.ministere_tutelle` | Couleur | Picto | Lignes |
|---|---|---|---|---|---|---:|
| 1 | Établissements de l'Education nationale | `…2024` | Ministère de l'éducation nationale | *par catégorie* (10 déclarées) | `ods-school` | **10 694** |
| 2 | Établissements de l'Enseignement supérieur | `…20240` | Ministère de l'enseignement supérieur, **de la recherche et de l'innovation** | `#0971B5` | `ods-college` | **0** ❌ |
| 3 | Établissements de l'Enseignement Agricole | `…20241` | Ministère de l'agriculture | `#19630A` | `ods-crops` | **125** |
| 4 | Établissements sociaux et médico-sociaux | `…20242` | Ministère de la santé et de la solidarité nationale | `#591787` | `ods-doctors` | **154** |
| 5 | Établissements de formation au métiers du sport | `…20243` | Ministère de la jeunesse et des sports | `#0971B5` | `ods-running` | **15** |
| 6 | Établissements de la Défense | `…20244` | Ministère de la défense | `#AF5FA2` | `ods-police` | **6** |
| 7 | Établissements à l'étranger | `…20245` | Ministère des relations extérieures | `#2B3F56` | `ods-point_of_interest` | **130** |
| 8 | Etablissements du Ministère de la Culture | `…20246` | **Ministère de la culture** | `#0971B5` | `ods-library` | **0** ❌ |

**Ce que représente chaque groupe** : **un ministère de tutelle**, et rien d'autre.
Ce n'est ni un type de label, ni un niveau d'enseignement — c'est une découpe
administrative du même jeu par une seule colonne. La structure existe parce qu'Opendatasoft
ne sait pas donner un picto et une couleur différents à des sous-ensembles d'une même
couche : pour huit apparences, il faut huit couches, donc huit contextes.

**Comment l'utilisateur bascule entre elles** : par le **sélecteur de couches**
(`display-control="true"`), un panneau en haut à droite de la carte listant les huit
titres. Vérifié : cliquer un titre **grise l'entrée et retire la couche** ; recliquer la
remet. Les couches sont donc **simultanées et indépendamment activables** — pas
exclusives. Il n'y a **aucun autre contrôle sur la page**.

Le reste du template : un bandeau gris DSFR avec le seul H1, et
`<ods-map auto-geolocation="true" display-control="true" location="7,47.30531,0.97778"
no-refit="true" scroll-wheel-zoom="false" search-box="true" toolbar-fullscreen="true"
toolbar-geolocation="true">`. **Trois couches (1, 3, 4) et cinq autres** portent
`size-function="linear" size-min="3" size-max="5"` sans champ de taille associé — effet
**non vérifié**.

## Relevé visuel exhaustif

### 1. Bandeau de titre

Fond gris clair pleine largeur (`umami-bg-grey`), un unique **H1** en gras :
« **Établissements labellisés "génération 2024"** » (guillemets droits dans le titre).
Pas de chapô, pas de date, pas de lien vers le jeu, pas de définition du label.

### 2. La carte — seul contenu de la page

- **Cadrage initial** : `location="7,47.30531,0.97778"` = **zoom 7 sur 47,31 N / 0,98 E**,
  c'est-à-dire **la Touraine, entre Tours et Orléans**. À l'écran (1 440 px de large) :
  de Rennes à Auxerre et de Versailles à La Rochelle. **Ni Marseille, ni Lille, ni
  Strasbourg, ni Bordeaux ne sont dans le cadre**, et évidemment aucun DROM ni aucun
  établissement à l'étranger. Échelle 50 km. C'est le premier écran, et il montre un
  huitième du territoire.
- **`auto-geolocation="true"`** : la carte tente de se recentrer sur la position du
  visiteur au chargement. Aucune invite de géolocalisation n'est apparue pendant le
  relevé (permission non accordée au navigateur), donc l'effet **n'a pas été observé** —
  mais l'attribut signifie que **deux visiteurs ne voient pas la même carte**, sans que
  rien ne le dise.
- **`scroll-wheel-zoom="false"`** : la molette fait défiler la page, pas zoomer la carte.
  Il faut les boutons + / −. Choix défendable, mais combiné à `no-refit` et à un cadrage
  sur la Touraine, il rend l'exploration lente.
- **Fond** : tuiles Huwise / IGN, plan raster couleur non atténué, plus un sélecteur de
  fond de carte (icône « couches » en bas à gauche).
- **Contrôles** : plein écran, dessin de polygone / rectangle / cercle pour filtrer par
  zone, zoom + / −, « Détecter ma localisation », loupe « Rechercher un lieu », échelle.
- **Marqueurs** : des pictos SVG **noirs** pour la couche 1 (école / drapeau), des épis
  de blé **vert foncé** pour l'agricole, des caducées **violets** pour le médico-social,
  un coureur pour le sport. La densité est telle qu'en Vendée et autour de Nantes les
  pictos se chevauchent en aplats noirs illisibles. **Pas de clustering.**
- **Bandeau d'avertissement**, apparu ~10 s après le chargement, sur fond crème en bas
  de carte : « **⚠ Certaines couches sont affichées partiellement pour des raisons de
  performance. Essayez de zoomer.** » C'est le plafond de rendu d'ODS, et il est
  **atteint dès l'ouverture** : la carte que l'on voit est tronquée, et le seul remède
  proposé est de zoomer.

### 3. Le sélecteur de couches (haut droit)

Un panneau blanc listant les huit titres, chacun précédé de son picto et d'un liseré
vertical de la couleur de la couche. Le panneau est **haut de deux entrées et demie**
et se scrolle : trois titres visibles à la fois sur huit. Cliquer une entrée la grise et
retire la couche.

**Test fait** : décocher « Établissements de l'Education nationale ». Résultat — la
carte ne conserve que des épis de blé, des caducées et un coureur ; **aucun marqueur
bleu « Enseignement supérieur » n'apparaît nulle part**, ce qui confirme visuellement
que cette couche est vide.

### 4. La légende (bas droit)

Un second panneau, **superposé au sélecteur de couches** (il le recouvre partiellement
sur la capture), qui affiche **une couche à la fois** avec un pager « **1/8** » et des
chevrons ‹ ›. Contenu relevé, page par page :

| Page | Contenu |
|---|---|
| **1/8** | « Établissements de l'Education nationale » · sous-titre « **Nombre d'éléments** » · ■ Ecole ■ Collège ■ Lycée ■ EREA · « ***6 éléments de plus …*** » |
| 2/8 | « Établissements de l'Enseignement supérieur » · ■ **Element** |
| 3/8 | « Établissements de l'Enseignement Agricole » · ■ **Element** |
| 4/8 | « Établissements sociaux et médico-sociaux » · ■ **Element** |
| 5/8 | « Établissements de formation au métiers du sport » · ■ **Element** |
| 6/8 | « Établissements de la Défense » · ■ **Element** |
| 7/8 | « Établissements à l'étranger » · ■ **Element** |
| 8/8 | « Etablissements du Ministère de la Culture » · ■ **Element** |
| **9/8** | *(le chevron « suivant » reste actif : le pager déborde et affiche « 9/8 » en gardant le contenu de la 8ᵉ)* |

Les couleurs des pastilles de la page 1 sont grise (Ecole `#6D7A87`), bleue (Collège
`#619FC8`), orange (Lycée `#F7C87E`) et rouge (EREA `#CB516D`) — celles déclarées dans
`color-categories`.

### 5. L'infobulle

Clic sur un picto (Monts, Indre-et-Loire) — une bulle Leaflet blanche avec croix de
fermeture, un titre en gras puis **sept couples libellé / valeur**, dans cet ordre :

| Libellé affiché | Valeur relevée |
|---|---|
| *(titre)* | **Ecole élémentaire Pierre et Marie Curie** |
| **Nom_etablissement** | Ecole élémentaire Pierre et Marie Curie |
| **Type établissement** | Ecole |
| **Département** | Indre-et-Loire |
| **Commune** | Monts |
| **Code Postal** | 37260 |
| **Adresse_1** | Rue du Commerce |
| **Mail** | ce.0371464R@ac-orleans-tours.fr |

Le nom est donc **affiché deux fois** (titre + première ligne). Deux libellés portent
leur underscore de back-office (`Nom_etablissement`, `Adresse_1`). **Sur les 35 champs
réels du jeu, 7 sont exposés** ; ni l'UAI, ni l'effectif, ni le statut public/privé, ni
l'éducation prioritaire, ni les dates de labellisation, ni le lien ONISEP ne le sont.

### 6. Accessibilité

L'arbre d'accessibilité de la page compte **1 113 nœuds `generic` anonymes** et
**14 éléments nommés** : les six liens de la barre d'outils Leaflet, les deux boutons de
zoom, « Détecter ma localisation », « Layers », les trois liens d'attribution, le champ
« Rechercher un lieu » et un bouton « Suivant » (le pager de légende). **Les huit
bascules de couches, la légende, les 11 221 marqueurs et l'infobulle ne sont exposés à
aucune technologie d'assistance.** La page n'a aucun contenu textuel hors son H1.

## Défauts et bizarreries de l'original

1. **La totalité des labels affichés a expiré.** `fin_labellisation` vaut **`2025-09-01`
   pour les 11 221 lignes**, sans exception. Au jour du relevé — 10 septembre 2026 — la
   page présente donc **11 221 labellisations caduques depuis plus d'un an**, sous un
   titre au présent, sans un mot d'avertissement. C'est le défaut le plus grave du lot :
   la page n'est pas imprécise, elle est fausse.

2. **Deux couches sur huit sont vides, parce qu'elles refinent sur des valeurs qui
   n'existent pas.** Vérifié à l'API, valeur par valeur :
   - couche 2 refine `Ministère de l'enseignement supérieur, de la recherche et de
     l'innovation` → **0 ligne**. La valeur réelle est
     `Ministère de l'enseignement supérieur et de la recherche` → **93 lignes**.
     L'intitulé du template est celui du **ministère avant 2020** ; le jeu porte le
     libellé actuel.
   - couche 8 refine `Ministère de la culture` → **0 ligne**. Aucune valeur de
     `ministere_tutelle` ne mentionne la culture. La couche n'a jamais rien pu afficher.

   **Conséquence** : **97 établissements ne figurent sur aucune couche** — les 93 du
   supérieur, les 3 « sans tutelle » et le 1 du « Ministère du redéploiement
   industriel ». La carte montre 11 124 points sur 11 221, et **les deux entrées vides du
   sélecteur restent cochées et cliquables** comme les six autres. Rien ne les distingue.

3. **La coloration par catégorie de la couche 1 est inopérante.**
   `color-by-field="type_etablissement"` — **le champ s'appelle `type`**. Confirmé à
   l'API : `group_by=type_etablissement` renvoie `ODSQLError — Unknown field:
   type_etablissement`. Tous les marqueurs de la couche 1 sont **noirs** à l'écran.
   C'est le **troisième** attribut de coloration du lot qui vise un champ inexistant,
   après `secteur` (offre de langues) et `avancement_du_projet` (CNR).

4. **Et pourtant la légende affiche les catégories.** La page 1/8 montre les quatre
   pastilles colorées Ecole / Collège / Lycée / EREA. ODS construit cette légende à
   partir de l'attribut `color-categories` **déclaré**, pas du rendu : elle décrit une
   intention qui n'a jamais pris effet. Même mécanisme que la légende « Secteur » de la
   page offre de langues.

5. **Deux des dix catégories déclarées ne correspondent à rien.**
   `color-categories` liste « **Lycées** » et « **Lycées professionnels** » (au pluriel) ;
   `refine=type:Lycées` renvoie **0**, `type:Lycées professionnels` renvoie **0**. Les
   huit autres existent bien (Ecole 7 413, Collège 2 375, Lycée 982, EREA 18, Autres
   écoles post-bac 8, Ecole d'ingénieurs 18, Ecole de commerce 8, Service Administratif 5).

6. **Dix catégories déclarées pour 39 types réels.** Même si le champ était le bon,
   **29 des 39 valeurs de `type` tomberaient dans la couleur de repli** — dont
   Médico-social (112), Lycée français à l'étranger (100) et Université (54). D'où le
   « ***6 éléments de plus …*** » tronqué en pied de légende, qui n'est ni dépliable ni
   scrollable.

7. **Sept légendes sur huit disent « Element ».** Une couche monochrome sans
   `color-by-field` produit chez ODS une entrée sans libellé, rendue par le mot générique
   « Element ». Sept pages de légende sur huit ne portent donc **aucune information** :
   un carré de couleur et le mot « Element ».

8. **Le pager de légende va jusqu'à 9/8.** Le chevron « suivant » reste actif à la
   huitième page ; un clic de plus affiche « **9/8** » en conservant le contenu de la
   huitième. Bug d'index d'ODS, reproductible.

9. **La carte est tronquée dès l'ouverture, et le dit.** « Certaines couches sont
   affichées partiellement pour des raisons de performance. Essayez de zoomer. » Le
   remède proposé n'en est pas un : zoomer ne recharge que la zone visible, et la vue
   d'ensemble — le seul message de la page — reste incomplète en permanence.
   **Note importante pour le dépôt** : le plafond de rendu et le bandeau « zoomez » ne
   sont donc **pas une particularité de `dsfr-data`** (piège PG-013) ; Opendatasoft a le
   même comportement, jusqu'au libellé.

10. **Le cadrage initial montre un huitième de la France.** Zoom 7 sur la Touraine.
    Combiné à `no-refit="true"` et `scroll-wheel-zoom="false"`, il faut plusieurs clics
    sur « − » pour découvrir que le jeu couvre aussi les DROM et 81 pays.

11. **`auto-geolocation="true"` rend la page non reproductible.** Selon que le visiteur
    accorde ou non la géolocalisation, la carte s'ouvre sur la Touraine ou sur son
    quartier. Rien ne le signale. **Effet non observé pendant le relevé** (permission
    non accordée).

12. **Aucun filtre, alors que tout est prêt pour en avoir.** Le jeu déclare **19
    facettes** ; les huit contextes déclarent **six** `disjunctive.*` (academie, commune,
    dept, type, educ_prio, cp). Ces déclarations ne servent à rien : **il n'y a pas un
    seul widget de filtre sur la page**. C'est de la configuration morte.

13. **44 colonnes vides sur 79.** `column_36` à `column_79`, libellées « Column 36 » à
    « Column 79 », 0 valeur non nulle chacune. Elles gonflent le schéma du jeu, la page
    d'exploration ODS et tout export CSV — de 44 colonnes de rien.

14. **Le nom de l'établissement est affiché deux fois dans l'infobulle**, en titre puis
    en première ligne, et deux libellés gardent leur underscore (`Nom_etablissement`,
    `Adresse_1`).

15. **`region` compte 95 valeurs** : les 13 régions métropolitaines, les DROM, « TOM et
    Collectivités territoriales »… **et 81 pays**. La colonne mélange deux niveaux
    administratifs incompatibles. Elle contient en outre **« Ile-de-France » (2 668) et
    « Île-de-France » (4)** — un doublon de casse/accent.

16. **`statut_public_prive` est sale** : à côté de Public (10 013) et Privé (1 199), on
    trouve **`0` (2 lignes)**, « Consulaire » (1) et **« Privé sous contrat » (1 seule
    ligne)** — un vocabulaire pour 1 199 établissements privés et un autre pour un seul.

17. **`precision_localisation` mélange deux référentiels** : « Numéro de rue », « Rue »,
    « Ville », « Lieu-dit », « Parfaite » en clair, et `PLAQUE_ADRESSE`, `BATIMENT`,
    `ZONE_ADRESSAGE`, `COMMUNE`, `NE SAIT PAS` en capitales — plus **131 `0`** et
    **15 `0,00`**. Le champ existe pour qualifier la fiabilité des 11 221 points, et il
    est inexploitable en l'état. La page ne l'utilise pas.

18. **292 établissements sans position** ne sont ni affichés ni comptés ni signalés.

19. **La page est inaccessible.** 1 113 nœuds anonymes, 14 éléments nommés, aucun
    contenu textuel hors le H1. Ni les huit bascules de couches, ni la légende, ni les
    marqueurs ne sont atteignables autrement qu'à la souris.

## Transposition vers `dsfr-data`

Attributs vérifiés dans les références générées depuis le source
(`get_skill(dsfrDataMap|dsfrDataSource|dsfrDataFacets|dsfrDataA11y, "reference")` et
`get_skill(attributeGrammars, "guide")`).

**Le point central de la transposition** : les **huit couches n'ont pas à être huit
couches**. Elles existent parce qu'Opendatasoft ne sait donner qu'une apparence par
couche, donc qu'il faut un contexte par apparence. `dsfr-data-map-layer` a
`color-field` + `color-map` : **une balise, huit couleurs, une légende juste**. Écrire
« `dsfr-data` ne sait pas faire huit couches » serait exactement l'erreur que le dépôt
a déjà payée deux fois : le modèle ODS n'est pas le besoin.

| Original Opendatasoft | `dsfr-data` | Attributs nécessaires |
|---|---|---|
| **8 contextes** refinés sur `ministere_tutelle` | **une** `<dsfr-data-source>` | `api-type="opendatasoft"`, `base-url`, `dataset-id`, `where="position is not null"`, `server-side`, `page-size`. Un seul contexte : les huit refines ne sont qu'une découpe d'affichage. |
| **8 `<ods-map-layer-group>` / 8 `<ods-map-layer>`** | **un** `<dsfr-data-map-layer>` | `source`, `type="marker"`, `geo-field="position"`, **`color-field="ministere_tutelle"`**, **`color-map="Ministère de l'éducation nationale:#000091,Ministère de l'enseignement supérieur et de la recherche:#0971B5,…"`** (paires `valeur:#couleur`, **virgules**), `color` (repli, qui rattrape les 97 orphelins au lieu de les faire disparaître), `cluster`, `max-items="20000"`, `tooltip-field="nom_etablissement"`. |
| Le **sélecteur de couches** (`display-control="true"`) | `<dsfr-data-facets display="ministere_tutelle:checkbox">` | Cocher / décocher une tutelle **est** la bascule de couche — avec en plus **les compteurs** (10 694, 154, 130, 125, 93, 15, 6, 3, 1) que le sélecteur d'origine n'affiche pas, et **les 9 valeurs réelles** au lieu de 8 titres dont 2 faux. Le sélecteur de couches d'ODS filtre l'affichage ; une facette filtre la donnée : le résultat visuel est le même, l'honnêteté ne l'est pas. |
| La légende paginée « 1/8 … 9/8 », 7 entrées « Element » | **une** `<dsfr-data-map-legend>` | `for="etabs"`, `label="Ministère de tutelle"`. Avec `for` **vide**, la référence dit que la légende concatène les entrées de **toutes** les couches directes de la carte : même à supposer qu'on garde huit couches, la légende resterait **une seule liste**, pas huit pages. Et `getLegendEntries()` retourne les paires de `color-map` **plus le repli `color` s'il a servi** — donc les 97 orphelins **apparaîtraient dans la légende**. |
| `color-by-field="type_etablissement"` + 10 `color-categories` | seconde couche, ou seconde facette | Le champ correct est **`type`**, et il a **39 valeurs**. Un `color-map` de 39 entrées est illisible : la voie honnête est `dsfr-data-normalize replace-fields` pour regrouper les 29 types résiduels en « Autre », puis un `color-map` de 6 à 8 entrées. **Non vérifié** (la grammaire de `replace-fields` a son propre piège, AM-038 : deux-points réservés, comparaison stricte, pas de regex — or plusieurs valeurs de `type` contiennent des virgules, ce qui entre en collision avec le séparateur d'entrées). |
| `location="7,47.30531,0.97778"` `no-refit` | `<dsfr-data-map>` | `center="46.6,2.3"`, `zoom="6"`, `height`, `tiles="ign-plan"`, `tiles-style="muted"`, `name`, `fit-bounds`, `fit-max-zoom="12"`. **Attention** : les données vont de −122° à +151° de longitude ; un `fit-bounds` libre donnerait un planisphère (le défaut du CNR). Il faut **`fit-zone`** explicite, cf. « Limites » n° 2. |
| `auto-geolocation="true"` | **à ne pas reproduire** | Aucun équivalent, et c'est heureux : une carte dont le cadrage dépend du visiteur n'est pas une dataviz reproductible. |
| `scroll-wheel-zoom="false"` | **écart assumé** | Pas d'attribut dédié dans la référence ; `locked` existe mais coupe **toute** interaction (encarts, vignettes), ce qui n'est pas la même chose. |
| Les **pictos** `ods-school`, `ods-crops`, `ods-doctors`… | **écart assumé** | `dsfr-data-map-layer` n'expose ni `picto` ni `icon`. Remplacé par la couleur + la légende. Même constat que sur la page CNR : demande légitime, mais **ici les pictos remplaçaient une légende défaillante**, et la couleur fait mieux. |
| Infobulle de 7 champs | `<dsfr-data-map-popup>` + `<template>` | `mode="popup"` (ou `panel-right`), `title-field="nom_etablissement"`. Le `<template>` évite le doublon titre/première ligne et permet d'ajouter ce que l'original tait : effectif, statut, éducation prioritaire, dates de labellisation, lien ONISEP. |
| Le bandeau « Essayez de zoomer » | `max-items` + `cluster` | Le plafond `dsfr-data` par défaut (5 000) est **sous** les 11 221 : le poser explicitement est obligatoire (PG-013). Avec `cluster`, la référence donne 20 000 pour sans risque. **Alternative** : `bbox` (chargement par viewport) — mais la référence prévient que le **tout premier fetch reste non filtré**, donc il faut de toute façon un `limit` ou un `where` initial. |
| — (absent de l'original) | `<dsfr-data-kpi>` × 3 | `value="meta:total"`, `value="effectif:sum"` `format="compact"` (3,26 M), `value="effectif:avg"`. |
| — (absent) | `<dsfr-data-a11y>` | `table`, `download`, `for`, `label`, `label-field`, `value-field`. La page d'origine n'expose **rien** à un lecteur d'écran : c'est ici que l'apport est le plus grand. |
| Les 44 `column_*` vides | `select` sur la source | Énumérer les 35 champs réels — ou plutôt les 12 utiles. |

### Esquisse de code

```html
<!-- 11 221 établissements, 35 champs réels (79 déclarés : column_36..column_79 sont
     vides sur 11 221). 292 sans position. Points de -122° à +151° de longitude :
     130 établissements français à l'étranger. -->
<dsfr-data-source id="g2024"
  api-type="opendatasoft"
  base-url="https://data.education.gouv.fr"
  dataset-id="fr-en-etablissements-labellises-generation-2024"
  select="nom_etablissement, uai, type, ministere_tutelle, statut_public_prive, academie, dept, commune, cp, adresse_1, mail, effectif, educ_prio, lien_onisep, debut_labellisation, fin_labellisation, position"
  where="position is not null"
  server-side page-size="100">
</dsfr-data-source>

<div class="fr-container fr-mt-6w">
  <h1>Établissements labellisés « Génération 2024 »</h1>
  <div class="fr-alert fr-alert--warning fr-mb-3w">
    <h3 class="fr-alert__title">Label échu</h3>
    <p>La labellisation des 11 221 établissements a pris fin le <strong>1<sup>er</sup>
       septembre 2025</strong> (champ <code>fin_labellisation</code>, valeur unique pour
       toutes les lignes). Cette carte est un état historique.</p>
  </div>
  <p class="fr-text--lead">
    11 221 établissements, 3,26 millions d'élèves, sept ministères de tutelle,
    de la métropole aux DROM et à 81 pays. 292 n'ont pas de coordonnées et ne
    figurent pas sur la carte.
  </p>

  <div class="fr-grid-row fr-grid-row--gutters">
    <div class="fr-col-12 fr-col-md-3">
      <h2 class="fr-h6">Filtrer</h2>
      <!-- Ce que le « sélecteur de couches » de l'original fait, en mieux :
           les 9 valeurs réelles avec leurs compteurs, au lieu de 8 titres dont 2 vides. -->
      <dsfr-data-facets id="f" source="g2024" server-facets
        fields="ministere_tutelle, type, academie, dept, statut_public_prive, educ_prio"
        labels="ministere_tutelle:Ministère de tutelle | type:Type d'établissement | academie:Académie | dept:Département | statut_public_prive:Statut | educ_prio:Éducation prioritaire"
        display="ministere_tutelle:checkbox | type:radio | academie:multiselect | dept:multiselect | statut_public_prive:checkbox | educ_prio:checkbox"
        searchable="type, dept, academie"
        max-values="9" sort="count:desc">
      </dsfr-data-facets>
    </div>

    <div class="fr-col-12 fr-col-md-9">
      <dsfr-data-kpi-group class="fr-mb-3w">
        <dsfr-data-kpi source="f" value="meta:total" format="nombre" col="4"
          heading="Sélection" label="établissements"></dsfr-data-kpi>
        <dsfr-data-kpi source="f" value="effectif:sum" format="compact" col="4"
          heading="Élèves" label="concernés"></dsfr-data-kpi>
        <dsfr-data-kpi source="f" value="effectif:avg" format="nombre" decimals="0" col="4"
          heading="Taille moyenne" label="élèves par établissement"></dsfr-data-kpi>
        <!-- ⚠ :sum et :avg portent sur les données REÇUES (une page de 100 en
             server-side). Cf. « Limites » n° 4. -->
      </dsfr-data-kpi-group>

      <!-- fit-zone explicite : sans lui, fit-bounds sur des points à -122° et +151°
           de longitude donnerait un planisphère (le défaut de la page CNR). -->
      <dsfr-data-map id="carte" name="Établissements labellisés Génération 2024"
        center="46.6,2.3" zoom="6" height="660px"
        tiles="ign-plan" tiles-style="muted"
        fit-bounds fit-max-zoom="12" fit-zone="41,-5.5,51.5,10">
        <dsfr-data-map-layer id="etabs" source="f" type="marker"
          geo-field="position"
          color-field="ministere_tutelle"
          color-map="Ministère de l'éducation nationale:#000091,Ministère de l'enseignement supérieur et de la recherche:#0971B5,Ministère de l'agriculture:#18753C,Ministère de la santé et de la solidarité nationale:#A558A0,Ministère de la jeunesse et des sports:#E4794A,Ministère de la défense:#6A6AF4,Ministère des relations extérieures:#2B3F56"
          color="#929292"
          tooltip-field="nom_etablissement"
          cluster cluster-radius="60" max-items="20000">
        </dsfr-data-map-layer>
        <!-- Le repli #929292 rend visibles les 97 établissements que les 8 couches
             de l'original laissaient tomber, et getLegendEntries() les fait
             apparaître dans la légende. -->
        <dsfr-data-map-legend for="etabs" label="Ministère de tutelle"></dsfr-data-map-legend>
        <dsfr-data-map-popup for="etabs" mode="popup" title-field="nom_etablissement">
          <template>
            <p class="fr-badge fr-badge--sm">{{type}}</p>
            <p class="fr-text--sm fr-mb-1v">{{adresse_1|}} {{cp}} {{commune}}</p>
            <p class="fr-text--sm fr-mb-1v">Académie de {{academie}} · {{dept}}</p>
            <p class="fr-text--sm fr-mb-1v">{{statut_public_prive}} ·
               {{effectif|effectif non renseigné}} élèves ·
               {{educ_prio|hors éducation prioritaire}}</p>
            <p class="fr-text--xs">Labellisé du {{debut_labellisation}}
               au {{fin_labellisation}} · UAI {{uai}}</p>
            <p class="fr-text--xs"><a href="{{lien_onisep}}">Fiche ONISEP</a></p>
            <!-- href vide masqué par CSS [href=""] (idiome AM-039 du dépôt) :
                 1 776 établissements n'ont pas de lien ONISEP. -->
          </template>
        </dsfr-data-map-popup>
        <dsfr-data-map-inset territory="guadeloupe"></dsfr-data-map-inset>
        <dsfr-data-map-inset territory="martinique"></dsfr-data-map-inset>
        <dsfr-data-map-inset territory="guyane"></dsfr-data-map-inset>
        <dsfr-data-map-inset territory="la-reunion"></dsfr-data-map-inset>
        <dsfr-data-map-inset territory="mayotte"></dsfr-data-map-inset>
      </dsfr-data-map>

      <dsfr-data-a11y source="f" for="carte" table download
        filename="generation-2024.csv" label="Données de la carte"
        label-field="nom_etablissement"
        value-field="type, commune, dept, academie, ministere_tutelle, statut_public_prive, effectif">
      </dsfr-data-a11y>
    </div>
  </div>
</div>
```

## Limites et points durs identifiés

1. **« Huit couches » n'est pas une exigence, c'est une contrainte d'ODS.**
   L'obstacle apparent — « `dsfr-data-map` n'a pas de `layer-group`, ni de sélecteur de
   couches, ni de picto par couche » — est réel attribut par attribut, mais il ne
   s'oppose pas au besoin. Le besoin est : *distinguer visuellement sept tutelles et
   pouvoir en masquer certaines*. La voie native est `color-field` + `color-map` +
   `dsfr-data-map-legend` + une facette `ministere_tutelle:checkbox`. Elle donne, en une
   couche : les bons compteurs, une légende unique et exacte, les 97 orphelins visibles,
   et pas de pager qui va à 9/8. **On peut néanmoins garder huit couches si on veut** —
   la référence de `dsfr-data-map-legend` précise qu'avec `for` vide, elle concatène les
   entrées de toutes les couches directes en **une seule liste**. Le vrai manque
   résiduel, à remonter, est **l'absence de bascule d'affichage par couche** (pas
   d'attribut `visible`/`hidden` dans la référence de `dsfr-data-map-layer` ; seuls
   `min-zoom` / `max-zoom` masquent conditionnellement). **Non vérifié au navigateur.**

2. **`fit-bounds` sur des données mondiales.** Le jeu s'étend de −122,48° à +151,24° de
   longitude et de −33,94° à +54,43° de latitude (334 points hors de la fenêtre
   européenne). Un `fit-bounds` sans clip afficherait un planisphère — exactement ce que
   fait la page CNR. Voies natives : (a) **`fit-zone="41,-5.5,51.5,10"`** (la métropole,
   valeur documentée dans la référence de `fit-zone`) — retenu dans l'esquisse ; (b)
   `insets="drom"`, qui **impose ce même clip par défaut** ; (c) `fit-zone="none"` si
   l'on veut réellement le monde. Le piège symétrique du dépôt (BUG-004 : `fit-bounds`
   + `max-bounds` sur un jeu sans point ultramarin renvoie vide) **ne s'applique pas
   ici** : le jeu a bien des points DROM (La Réunion 120, Guadeloupe 84, Martinique 83,
   Guyane 21, Mayotte 19), donc les encarts sont justifiés. Mais alors les **130
   établissements à l'étranger** n'ont, eux, aucun encart et sortent de toute vue
   cadrée : il faut soit un huitième encart impossible (81 pays), soit les traiter en
   liste. **Non vérifié au navigateur.**

3. **`max-items` : 5 000 par défaut, 11 221 à afficher.** Piège PG-013, à poser
   explicitement. Ce qui change par rapport aux fiches précédentes : **la vérification a
   montré que l'original subit exactement le même plafond**, jusqu'au bandeau « Essayez
   de zoomer ». Le plafond n'est donc pas un désavantage de `dsfr-data` — c'est une
   contrainte de rendu partagée. `cluster` + `max-items="20000"` est la voie native
   documentée. **Non vérifié** pour 11 221 marqueurs `dsfr-data`.

4. **KPI d'agrégat contre pagination serveur.** `effectif:sum` et `:avg` portent sur les
   données reçues ; en `server-side page-size="100"` ils ne diraient rien de juste.
   `meta:total` ne règle que le compte. Le jeu fait 11 221 lignes : **au-dessus du plafond
   des 10 000 de l'API ODS** (`offset + limit <= 10000`, vérifié sur le jeu des langues),
   donc **un chargement client complet par `/records` est impossible ici aussi**. Restent
   (a) une source d'agrégation dédiée (`select="sum(effectif) as eff"` + `limit="1"`, lue
   en `:max`) qui n'écoute pas les facettes, ou (b) une source générique sur
   `/exports/json`. **Arbitrage non tranché sans mesure** ; le jeu des langues (39 858
   lignes) s'exporte en 3,1 s, celui-ci devrait être plus rapide. **Non chronométré.**

5. **Colorer par `type` (39 valeurs).** `color-map` exige une paire par valeur, séparées
   par des virgules — or **plusieurs valeurs de `type` contiennent une virgule**
   (« Ecole de commerce, gestion, comptabilité, vente », « Unité de formation et de
   recherche (hors santé) »). La grammaire de `color-map` casserait dessus. Voie native
   à essayer **avant** de conclure : `dsfr-data-normalize replace-fields` pour réécrire
   les 39 types en 6 familles — mais son propre piège (AM-038 : deux-points réservés,
   comparaison stricte, pas de regex) s'applique. **Non vérifié.** C'est le point le plus
   susceptible de mordre à la reproduction, et il mérite une entrée au registre : *un
   `color-map` ne sait pas porter une valeur contenant une virgule*.

6. **Les 44 colonnes vides.** Non traitées par un attribut : elles se règlent par un
   `select` explicite sur la source. Mais elles rendent l'auto-détection des facettes
   (`fields` vide) inutilisable, et un export CSV « tout le jeu » absurde. À signaler au
   producteur, pas à la bibliothèque.

7. **Ce qui ne se transpose pas, et n'a pas à l'être.**
   - `auto-geolocation="true"` : une dataviz dont le cadrage dépend du visiteur.
   - Les deux couches vides, les deux catégories fantômes, le pager 9/8, le nom affiché
     deux fois : ce sont des bugs.
   - Les outils de dessin de zone et le géocodeur : écarts assumés, remplacés par les
     facettes.
   - Le sélecteur de couches : remplacé par une facette, qui fait plus et compte juste.

8. **Point dur d'énoncé, et le plus lourd du lot.** La page affiche 11 221 labels
   **échus depuis le 1ᵉʳ septembre 2025** sous un titre au présent. Toute reproduction
   fidèle doit commencer par le dire. Au-delà, le jeu porte de quoi faire une vraie
   page — 3,26 M d'élèves, la part en éducation prioritaire (1 865 sur 11 221), les
   840 cités éducatives, les 1 861 sections sportives, la montée en charge du label de
   2017 à 2024 (dont **4 532 labellisations pour la seule rentrée 2022**) — et n'en
   affiche aucune. C'est la page du lot où l'écart entre ce que la donnée permet et ce
   que l'écran montre est le plus grand.

## Données à reproduire fidèlement

- [ ] Jeu `fr-en-etablissements-labellises-generation-2024` — **11 221 lignes**,
      **35 champs réels** (et non 79), **292 sans position** → **10 929 points**.
- [ ] `fin_labellisation` = **2025-09-01 pour 100 % des lignes** : à afficher, pas à taire.
- [ ] `ministere_tutelle` : les **9 valeurs réelles** avec leurs comptes —
      Éducation nationale **10 694**, Santé **154**, Relations extérieures **130**,
      Agriculture **125**, **Enseignement supérieur et recherche 93**, Jeunesse et
      sports **15**, Défense **6**, **sans tutelle 3**, **redéploiement industriel 1**.
      Somme **11 221** : aucun établissement ne doit disparaître.
- [ ] `type` : **39** valeurs, Ecole 7 413 / Collège 2 375 / Lycée 982 en tête,
      **et pas de « Lycées » ni de « Lycées professionnels »**.
- [ ] Statut : Public **10 013** · Privé **1 199** (+ 5 nuls, 2 `0`, 1 Consulaire,
      1 « Privé sous contrat »).
- [ ] Effectif : total **3 263 187**, moyenne **310** (10 535 renseignés).
- [ ] Éducation prioritaire : REP **1 135** · REP+ **730** · non concernés 9 356.
- [ ] Cités éducatives **840**, ULIS **2 846**, SEGPA **634**, sections sportives
      **1 861**, lycées des métiers **212**, lycées agricoles **100**, lycées
      militaires **2**.
- [ ] `debut_labellisation` : **18 dates**, dont **4 532 à la rentrée 2022**.
- [ ] Académies : **33**, Versailles **1 601** en tête, Nouvelle-Calédonie **1** en queue.
- [ ] Les **130 établissements à l'étranger** dans **81 pays** : visibles, ou explicitement
      renvoyés à une liste — pas silencieusement hors cadre.
- [ ] Les DROM avec des encarts, et le cadrage métropole non clippé au point de les vider.
- [ ] Une **légende unique et exacte**, pas huit pages dont sept disent « Element ».
- [ ] Un **tableau accessible** et un **export CSV** : la page d'origine n'expose
      absolument rien à un lecteur d'écran.
