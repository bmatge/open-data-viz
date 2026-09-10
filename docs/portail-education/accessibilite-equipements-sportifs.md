# Accessibilité des équipements sportifs

- **URL** : https://equipements.sports.gouv.fr/pages/accessibilite/
- **Id catalogue** : 13 — thématique **Sports**
- **⚠️ Source cross-portail** : la page **ne vit pas sur `data.education.gouv.fr`**. Elle est
  hébergée par un **autre portail Opendatasoft**, `equipements.sports.gouv.fr` (Data ES,
  Ministère des Sports). L'API à interroger est donc
  `https://equipements.sports.gouv.fr/api/explore/v2.1/…`, pas celle du portail Éducation.
- **Clé API** : **aucune**. Le `$scope.blocks` de la page ne porte **ni `ctx-apikey` ni
  `context-apikey`** — l'unique `ods-dataset-context` est nu (voir § Relevé, bloc 0). Vérifié :
  `GET …/catalog/datasets/data-es` sans en-tête → **HTTP 200**. Le portail est ouvert en lecture.
- **CORS** : ouvert à tous. En-têtes relevés au `curl -i` avec `Origin: https://lab.miweb.run` :
  `access-control-allow-origin: *`, `access-control-allow-methods: POST, GET, OPTIONS`,
  `access-control-allow-headers: Authorization, X-Requested-With, Origin, …`.
  **Contre-vérifié depuis un vrai contexte navigateur d'une autre origine** : `fetch()` exécuté
  dans une page ouverte sur `https://data.education.gouv.fr` → `{status: 200, type: "cors"}`,
  données reçues. Une page `dsfr-data` servie depuis `lab.miweb.run` interrogera donc ce portail
  sans clé, sans proxy et sans `api-key-ref`.
- **Jeu** : `data-es` — *Data ES - Recensement des équipements sportifs et lieux de pratique
  (Complet)*, public, Licence Ouverte 2.0, producteur Ministère des Sports, **104 champs**.
  **333 611 lignes** (`total_count` de `/records`, et `count(*)` = 333 611).
  ⚠️ Les métadonnées annoncent `records_count: 334 346` — **735 lignes d'écart** avec le compte
  réel servi par l'API. C'est le compte réel (333 611) qui s'affiche sur la page.
  Granularité : **une ligne = un équipement**, plusieurs équipements par installation
  (`inst_numero` : **157 675** installations distinctes).
- **Champs utiles** : `equip_numero`, `inst_numero`, `inst_nom`, `inst_adresse`, `inst_cp`,
  `new_name` (commune), `reg_nom`, `dep_nom`, `equip_type_name`, `equip_type_famille`,
  `equip_coordonnees` (geo_point_2d), `inst_acc_handi_type`, `equip_trib_nb`, `equip_vest_sport`,
  `equip_douche`, `equip_sanit`, `equip_loc_type`, et les **13 critères d'accessibilité** :
  `equip_pmr_aire, equip_pmr_chem, equip_pmr_trib, equip_pmr_vest, equip_pmr_sanit,
  equip_pmr_douche, equip_pmr_acc` (moteur) · `equip_pshs_aire, equip_pshs_chem, equip_pshs_trib,
  equip_pshs_vest, equip_pshs_sanit, equip_pshs_sign` (sensoriel). Tous en `text` `'true'`/`'false'`.
- **Relevé visuel** : 2026-09-10, Chrome, viewport 1477×812.

---

## 1. Objectif de la dataviz et informations véhiculées

- **Question à laquelle elle répond** : « Quelle part du parc sportif français est réellement
  accessible aux personnes en situation de handicap, critère par critère — et où ? »
- **Message porté** : le parc est **à moitié accessible en handicap moteur** (51 % des
  installations, 52 % des aires d'évolution) et **quasiment pas en handicap sensoriel**
  (3 % des installations, 2 % des cheminements). L'écart entre les deux colonnes *est* le
  propos de la page : il est rendu visuellement inévitable par la mise en regard PSHM / PSHS.
- **Information que l'utilisateur doit obtenir** : un taux d'accessibilité par critère
  (aire d'évolution, cheminements, tribunes, vestiaires, sanitaires, douches, accueil,
  signalétique), déclinable **par région** et **par famille d'équipement**, plus la
  localisation des équipements accessibles / non accessibles sur une carte.
- **Ce qui n'est pas dans l'objet** : aucune évolution dans le temps (pas de série
  temporelle), aucun classement de territoires, aucune comparaison entre familles
  d'équipements affichée côte à côte (il faut changer le filtre et mémoriser). Aucun export.
  La page ne mesure **que le bâti déclaré** : l'encadrement, l'animation et l'accueil humain
  sont explicitement hors périmètre (dit dans le texte).
- **Précaution énoncée par la page elle-même** : « ces chiffres sont déclaratifs et peuvent
  être remis en cause ».

---

## 2. Relevé visuel exhaustif, bloc par bloc

### Bloc 0 — Le contexte de données (invisible, mais structurant)

```html
<ods-dataset-context context="dataes,greenevo,redevo"
  dataes-dataset="data-es"
  greenevo-dataset="data-es" greenevo-parameters="{'disjunctive.equip_pmr_aire':'true', 'refine.equip_pmr_aire': ['true']}"
  redevo-dataset="data-es"  redevo-parameters="{'disjunctive.equip_pmr_aire':'true', 'refine.equip_pmr_aire': ['false']}">
```

**Trois contextes sur le même jeu** : `dataes` (piloté par les deux filtres, nourrit les
15 jauges) et `greenevo` / `redevo` (figés sur `equip_pmr_aire` = true / false, nourrissent
les deux couches de la carte). C'est de là que vient le défaut n° 3 ci-dessous : les deux
contextes de la carte n'écoutent **pas** les filtres.

### Bloc 1 — Fil d'Ariane et en-tête éditorial

Fil d'Ariane « Accueil › Accessibilité ». H1 **« Accessibilité des équipements sportifs »**.
Deux paragraphes d'intro (obligation ERP, lien sortant `entreprendre.service-public.fr`,
puis la finalité « pas uniquement les carences mais aussi les disponibilités »).
Photo `creps_vichy_acc_2.png` + légende en italique « *CREPS de Vichy - CESH* ».

Puis trois sections de texte long, sans donnée :

- **H3 « L'architecture de la base de donnée Data ES »** — définit les deux handicaps
  référencés (moteur / sensoriel) et énonce la convention de valeurs :
  `"true"` accessible, `"false"` non accessible, **`"null"` (non renseigné) « il sera considéré
  comme false »**. ⚠️ Voir défaut n° 1 : cette troisième valeur **n'existe pas** dans les données
  publiées.
- **H3 « Installation »** — définit ce qu'est une installation accessible.
- **H3 « Equipements »** — liste à 6 puces des critères (aire d'évolution, accueil et
  cheminements, tribunes, vestiaires et douches, sanitaires, signalétiques).
- Photo `creps_vichy_acc_1.png` + légende « *CREPS de Vichy avec ses cheminements aménagés - CESH* ».

### Bloc 2 — H1 « En quelques chiffres » : les deux filtres

Deux `<select class="fr-select">` empilés, pleine largeur, puis la ligne
« ⧩ *Affinez votre tableau de bord à l'aide des filtres ci-dessus* » (icône `fa-filter`).

**Filtre 1 — Région** (`ods-facet-results` sur `reg_nom`, `sort="alphanum"`), option de tête
**« France entière »**. **24 valeurs**, vérifiées à `/facets?facet=reg_nom` (les 938 lignes à
`reg_nom` nul sont écartées par la facette, le `group_by` en donne 25) — relevé à l'écran dans
cet ordre exact :
Auvergne-Rhône-Alpes (42 726) · Bourgogne-Franche-Comté (17 662) · Bretagne (19 164) ·
Centre-Val de Loire (16 659) · Corse (1 301) · Grand Est (31 854) · Guadeloupe (1 209) ·
Guyane (996) · Hauts-de-France (26 404) · Île-de-France (29 956) · La Réunion (3 040) ·
Martinique (1 193) · Mayotte (438) · Normandie (16 759) · Nouvelle-Aquitaine (36 116) ·
Nouvelle-Calédonie (1 212) · Occitanie (39 923) · Pays de la Loire (23 407) ·
Polynésie française (1 005) · Provence-Alpes-Côte d'Azur (21 497) · Saint-Barthélemy (16) ·
Saint-Martin (27) · Saint-Pierre-et-Miquelon (42) · Wallis-et-Futuna (67).

**Filtre 2 — Famille d'équipement** (`ods-facet-results` sur `equip_type_famille`,
`sort="-count"`), option de tête **« Toute type de famille »** (sic). **29 valeurs**, relevées
à l'écran dans l'ordre décroissant des comptes, identique à l'API :
Divers équipements Sports de nature (42 135) · Terrain de grands jeux (41 463) ·
Court de tennis (38 400) · Boulodrome (28 658) · Multisports/City-stades (25 590) ·
Salle multisports (18 668) · Salle non spécialisée (16 188) · Equipement équestre (15 781) ·
Salle ou terrain spécialisé (15 409) · Terrain extérieur de petits jeux collectifs (14 562) ·
Equipement d'activités de forme et de santé (13 598) · Site d'activités aquatiques et
nautiques (11 612) · Equipement d'athlétisme (9 563) · Salle de combat (7 416) ·
Bassin de natation (6 317) · Pas de tir (5 279) · Skatepark & vélo Freestyle (3 643) ·
Structure Artificielle d'Escalade (3 091) · Mur et fronton (3 005) · Parcours sportif/santé
(2 783) · Site d'activités aériennes (2 499) · Equipement de cyclisme (2 406) ·
Parcours de golf (1 825) · Circuit/piste de sports mécaniques (1 547) ·
Equipement & piste de ski (699) · Site de modélisme (611) · Divers équipements (378) ·
Bowling (298) · Aire de sports de glaces (187).

**Comportement joué au navigateur** (choix « Bretagne ») :

- le `<select>` **disparaît** et est remplacé par un bouton-lien encadré **« ‹ Bretagne »**
  (branche `ng-if="reg_items[0]['state']=='refined'"`) ; le clic dessus remet
  `refine.reg_nom = undefined` et fait réapparaître le select. **On ne peut pas passer
  directement d'une région à une autre.** Idem pour la famille.
- **cascade confirmée** : sous Bretagne, la liste des familles se **retrie** (Terrain de grands
  jeux en tête, 2 882 ; Divers équipements Sports de nature 2 446 ; Boulodrome 1 801) et perd
  une valeur (28 au lieu de 29). Recoupé à
  `/facets?facet=equip_type_famille&refine=reg_nom:"Bretagne"` → mêmes 28 valeurs, mêmes comptes.
- **les 15 jauges se recalculent** ; **la carte, non** (défaut n° 3).
- **l'URL ne bouge pas** : elle reste `…/pages/accessibilite/`, sans query string. Pas de
  `ctxurl-urlsync` — un état filtré n'est ni partageable ni marque-page (défaut n° 6).
- **les deux filtres se combinent en ET** : Bretagne + Bassin de natation → 418 équipements /
  283 installations.

### Bloc 3 — La grille de 15 jauges (`ods-gauge`), deux colonnes

Grille CSS `.grid` à deux colonnes. En-tête de colonne gauche : **« PSHM ♿ »** /
« Personne en Situation de Handicap Moteur ». Colonne droite : **« PSHS 👁️‍🗨️ »** /
« Personne en Situation de Handicap Sensoriel ».

Chaque cellule = un `<ods-gauge>` + deux lignes de texte `num / den <Libellé>` puis
« Accessibles aux PSHM/PSHS ». La **première ligne de chaque colonne** est un
`display-mode="circle"` (anneau bleu `#000091` sur fond gris, pourcentage entier au centre) ;
**toutes les autres** sont des `display-mode="bar"` (barre bleue sur rail gris, pourcentage
entier au-dessus).

Chaque numérateur et chaque dénominateur est un `ods-adv-analysis` distinct
(`limit="1"`, un aller-retour API chacun) : **21 agrégats** pour 15 jauges (6 dénominateurs
sont mutualisés). Valeurs **France entière** relevées à l'écran, **les 22 recoupées une à une
à l'API v2.1 — toutes exactes** :

| # | Jauge | Rendu | Vu à l'écran | Numérateur (ODSQL) | Dénominateur (ODSQL) |
|---|---|---|---|---|---|
| 1 | **Installations** PSHM | circle | **51 %** — 80 834 / 157 675 | `count(distinct inst_numero)` où `search(inst_acc_handi_type,'moteur')` | `count(distinct inst_numero)` |
| 2 | Aires d'évolution PSHM | bar | **52 %** — 173 145 / 333 611 | `count(equip_numero)` où `equip_pmr_aire='true'` | `COUNT` du contexte |
| 3 | Cheminements PSHM | bar | **23 %** — 76 435 / 333 611 | `equip_pmr_chem='true'` | `COUNT` du contexte |
| 4 | Tribunes* PSHM | bar | **26 %** — 5 623 / 21 740 | `equip_trib_nb > 0 and equip_pmr_trib='true'` | `equip_trib_nb > 0` |
| 5 | Vestiaires* PSHM | bar | **45 %** — 63 537 / 141 076 | `equip_vest_sport > 0 and equip_pmr_vest='true'` | `count(inst_numero)` où `equip_vest_sport > 0` |
| 6 | Sanitaires* PSHM | bar | **32 %** — 65 707 / 204 378 | `equip_sanit='true' and equip_pmr_sanit='true'` | `equip_sanit='true'` |
| 7 | Douches* PSHM | bar | **22 %** — 30 794 / 137 094 | `equip_douche='true' and equip_pmr_douche='true'` | `equip_douche='true'` |
| 8 | Accueil* PSHM | bar | **42 %** — 22 003 / 52 952 | `search(equip_loc_type,'accueil') and equip_pmr_acc='true'` | `search(equip_loc_type,'accueil')` |
| 9 | **Installations** PSHS | circle | **3 %** — `4764 / 157675` | `count(distinct inst_numero)` où `search(inst_acc_handi_type,'sensoriel')` | `count(distinct inst_numero)` |
| 10 | Aires d'évolutions PSHS | bar | **4 %** — 14 043 / 333 611 | `equip_pshs_aire='true'` | `COUNT` du contexte |
| 11 | Cheminements PSHS | bar | **2 %** — 8 328 / 333 611 | `equip_pshs_chem='true'` | `COUNT` du contexte |
| 12 | Tribunes* PSHS | bar | **4 %** — 942 / 21 740 | `equip_trib_nb > 0 and equip_pshs_trib='true'` | `equip_trib_nb > 0` |
| 13 | Vestiaires* PSHS | bar | **4 %** — 5 693 / 141 076 | `equip_vest_sport > 0 and equip_pshs_vest='true'` | `equip_vest_sport > 0` |
| 14 | Sanitaires* PSHS | bar | **24 %** — 49 989 / 204 378 | `equip_sanit='true' and equip_pshs_sanit='true'` | `equip_sanit='true'` |
| 15 | Signalétiques PSHS | bar | **2 %** — `6 177 / 333611` | `equip_pshs_sign='true'` | `COUNT` du contexte |

La colonne PSHS s'arrête à 7 jauges ; un `<div class="item28 acckpi">` **vide** comble la
grille. Note de bas de bloc, en italique :
« *\* Un filtre a été effectué pour conserver uniquement les équipements concernés* ».

**Contrôle sous filtre** (Bretagne), 8 valeurs recoupées à l'API, toutes exactes :
19 164 équipements · 8 169 installations · 5 352 PSHM · 164 PSHS · 1 537 tribunes ·
12 102 aires PMR · 1 585 accueils · 165 signalétiques.

### Bloc 4 — H1 « Pour aller plus loin » → la carte

H3 **« Aire d'évolution des équipements - Naviguez dans la base »**, puis deux lignes :
« Carte sur l'accessibilité des aires d'évolution pour les personnes en situation de handicap
moteur ♿ » / « Cliquez sur la loupe pour rechercher un lieu sur la carte. »

```html
<ods-map basemap="ign.planv2" display-control="false" displaylegend="false"
         scroll-wheel-zoom="false" search-box="false"
         toolbar-drawing="false" toolbar-fullscreen="true" toolbar-geolocation="false">
  <ods-map-layer-group><ods-map-layer color="#1f8d49" context="greenevo" display="auto" function="COUNT" picto="dot" show-marker="false" size-function="linear"></ods-map-layer></ods-map-layer-group>
  <ods-map-layer-group><ods-map-layer color="#e1000f" context="redevo"  display="auto" function="COUNT" picto="dot" show-marker="false" size-function="linear"></ods-map-layer></ods-map-layer-group>
</ods-map>
```

- **Fond** : IGN Plan v2. **Sélecteur de fond visible en bas à gauche** (bien que
  `display-control="false"`) : IGN Plan (coché) · IGN Sat · IGN Express · OSM Jawg Streets ·
  OSM No Labels.
- **Contrôles** : plein écran (haut gauche), zoom +/− et **loupe** (haut droite) — la loupe est
  présente malgré `search-box="false"`. Molette désactivée. Échelle km/mi en bas à gauche.
  Attribution « Leaflet | Powered by Huwise - Map data © IGN ».
- **Deux couches en agrégation serveur `display="auto"`** : bulles proportionnelles portant le
  COUNT, qui se subdivisent au zoom (bulle → polygone d'emprise → bulles locales → points
  individuels). **La rouge est dessinée par-dessus la verte.**
- **Vue au chargement : le monde entier** (échelle 3000 km), pas la France. Bulles relevées :
  **vertes** 169 351 · 219 · 1 224 · 32 · 1 405 · 270 · 27 ; **rouges** 153 422 · 994 · 2 250 ·
  10 · 1 994 · 630 · 40. Sommes : **172 528** vert et **159 340** rouge — recoupées à l'API :
  173 145 − 617 sans coordonnées = 172 528 ✔ ; 160 466 − 1 126 sans coordonnées = 159 340 ✔.
  (**1 743 équipements sans `equip_coordonnees`** ne sont sur aucune couche.)
- **Légende sous la carte**, trois pastilles : 🟩 « Accessible PSHM (vert) » · 🟥
  « Non-accessible PSHM (rouge) » · ⬜ « **Pas d'information (gris)** ». Voir défaut n° 1.
- **Loupe** : géocodeur. Saisie « Rennes » → deux propositions, **« Rennes / Bretagne France »**
  et « Bretagne France ». Le choix **recentre la carte seulement** — il ne filtre pas les données.
- **Infobulle au clic sur un point individuel** (relevée mot pour mot sur un point **vert**,
  échelle 500 m, Rennes) :

  > **Nom de l'installation sportive** — stade de la Prévalaye
  > **Type d'équipement sportif** — Terrain de football
  > **Numéro de l'équipement sportif** — E001I352380060
  > **Adresse** — Chemin de la Guérinais
  > **Code Postal** — 35000
  > **Commune nom** — Rennes

  Et sur un point **rouge** :

  > **Nom de l'installation sportive** — Gymnase de La Courrouze
  > **Type d'équipement sportif** — Salle multisports (gymnase)
  > **Numéro de l'équipement sportif** — E001I352380111
  > **Adresse** — Allée du Bois Habité
  > **Code Postal** — 35000
  > **Commune nom** — Rennes

  **Les deux infobulles sont strictement identiques en structure** : 6 champs, et **aucun ne
  dit si l'équipement est accessible**. Il n'y a pas d'`ods-map-tooltip` dans le template :
  c'est l'infobulle par défaut d'ODS, construite sur les champs cochés au back-office — les
  libellés sont exactement les `label` des champs du jeu (`inst_nom`, `equip_type_name`,
  `equip_numero`, `inst_adresse`, `inst_cp`, `new_name`).

### Bloc 5 — Trois sections de conclusion, sans donnée

H3 **« Critères et critiques »** (2 paragraphes : portée de l'analyse ; rappel du caractère
déclaratif). H3 **« Acteurs et possibilités »** (3 liens sortants : CESH sur LinkedIn,
Handiguide, ANDES ; puis un paragraphe de conclusion).

---

## 3. Défauts et bizarreries de l'original

1. **La légende de la carte promet un gris qui n'existe pas.** L'entrée « Pas d'information
   (gris) » ne peut jamais s'allumer : `group_by=equip_pmr_aire` ne renvoie **que 2 groupes**,
   `true` 173 145 et `false` 160 466, somme **exactement** 333 611 — **zéro null**. Vérifié
   sur 6 critères (`equip_pmr_aire`, `equip_pmr_trib`, `equip_pmr_vest`, `equip_pshs_sign`,
   `equip_douche`, `equip_sanit`) : **aucun ne comporte de null**. Le paragraphe d'intro qui
   explique longuement le cas `"null" (non renseigné)` décrit donc un état absent des données
   publiées (l'écrasement en `false` est déjà fait en amont). Et comme les deux couches sont
   des `refine` sur `true` / `false`, une éventuelle valeur nulle serait **invisible**, pas grise.
2. **La carte s'ouvre sur le monde, et la couche rouge masque la verte.** Pas de cadrage sur
   la métropole : au chargement l'échelle est de 3000 km, la France est une **unique bulle
   rouge « 153 422 »** posée sur la bulle verte « 169 351 » qui est pourtant la **plus
   nombreuse**. Le message de la page (« la moitié du parc est accessible ») est visuellement
   contredit par sa propre carte. Le recouvrement persiste à tous les zooms tant que les deux
   agrégats partagent un centroïde : à l'échelle 500 km sur la Nouvelle-Calédonie, on ne lit
   que le « 219 » vert, l'anneau rouge derrière n'a plus de libellé lisible.
3. **La carte n'écoute pas les filtres.** `greenevo` et `redevo` sont des contextes séparés,
   figés sur `refine.equip_pmr_aire`. Choisir « Bretagne » recalcule les 15 jauges mais laisse
   la carte sur ses 169 351 / 153 422 nationaux — observé à l'écran. Le libellé « Affinez votre
   **tableau de bord** » ne le dit pas, et rien à l'écran ne signale que le bloc du dessous est
   hors périmètre du filtre.
4. **Deux nombres sur quinze ne sont pas formatés.** Les jauges PSHS « Installations » et
   « Signalétiques » affichent **`4764 / 157675`** et **`6 177 / 333611`** — sans séparateur de
   milliers, quand les treize autres l'ont. Cause dans le template : le filtre `|number` manque
   sur `{{ ins_pshs[0]["nb"] }}`, `{{ ins[0]["nb"] }}` et `{{equ_total}}`.
5. **Le filtre région s'auto-détruit à l'usage.** Une fois une région choisie, le `<select>`
   est remplacé par un bouton « ‹ Bretagne ». Pour comparer deux régions il faut effacer puis
   rouvrir la liste : deux clics et une perte du contexte de comparaison, sur une page dont
   c'est précisément l'usage attendu.
6. **Aucune synchronisation d'URL.** L'URL reste nue quel que soit l'état des filtres : un
   résultat n'est ni partageable, ni citable, ni retrouvable par retour arrière.
7. **L'infobulle ne dit pas ce que la carte montre.** Les 6 champs sont identiques sur un point
   vert et sur un point rouge ; **l'accessibilité, seul sujet de la carte, n'y figure pas**.
   L'information n'est portée que par la couleur — inexploitable pour un daltonien deutan
   (vert `#1f8d49` / rouge `#e1000f`) et inexistante pour un lecteur d'écran.
8. **Un dénominateur compte une autre entité que les autres.** `tot_ves` s'écrit
   `count(inst_numero)` là où les cinq autres dénominateurs d'équipement s'écrivent
   `count(equip_numero)`. Le résultat est identique (141 076) parce qu'aucun des deux n'est
   `distinct` ni null, mais l'intention affichée (« Vestiaires ») et le champ compté divergent.
9. **Les deux colonnes ne sont pas comparables ligne à ligne.** PSHM a Douches et Accueil,
   PSHS ne les a pas et a Signalétiques à la place. Ce n'est pas un bug de la page — le jeu
   n'a **ni** `equip_pshs_douche` **ni** `equip_pshs_acc` — mais la mise en grille à deux
   colonnes invite à une lecture en vis-à-vis que les lignes 7, 8 et 15 ne supportent pas.
10. **Des critères déclarés sur des équipements qui n'ont pas l'aménagement.** Le `*` de la
    page est justifié, et le chiffre le montre : `equip_pmr_trib='true'` vaut **6 279** sur
    tout le jeu, mais **5 623** une fois restreint à `equip_trib_nb > 0` — **656 équipements
    déclarent des tribunes accessibles PMR tout en déclarant zéro place assise en tribune**.
    Idem vestiaires : 64 728 → 63 537, soit **1 191** équipements à vestiaires accessibles et
    `equip_vest_sport = 0`.
11. **Deux attributs `ods-map` sans effet.** `display-control="false"` : le sélecteur de fond
    est affiché. `search-box="false"` : la loupe est présente (et la page invite à s'en servir).
12. **`search(equip_loc_type, 'accueil')` est une recherche plein texte sur une colonne
    multivaluée** (`["Réception / Accueil", "Local de rangement"]`). Elle donne le bon compte
    (52 952) mais c'est **la requête la plus lente de la page** : 2 267 ms à froid, contre
    110-210 ms pour les 21 autres.
13. **Compteur de métadonnées faux** : `records_count: 334 346` contre 333 611 réellement
    servis (735 d'écart).

### Un faux problème écarté en cours de relevé

Six `ods-adv-analysis` du template écrivent leur clause en **`ods_adv_analysis-where`**
(underscores) au lieu de `ods-adv-analysis-where` : `tot_acc`, `ins_pmr`, `equ_pmr_aire`,
`equ_pmr_chem`, `ins_pshs`, `equ_pshs_aire`, `equ_pshs_chem`. J'ai d'abord conclu à un `where`
silencieusement ignoré — ce qui aurait rendu **sept jauges fausses**. **C'est faux** : la
normalisation d'attributs d'AngularJS traite `:`, `-` et `_` comme des délimiteurs équivalents,
`ods_adv_analysis-where` et `ods-adv-analysis-where` se normalisent tous deux en
`odsAdvAnalysisWhere`. Vérification décisive : **les 22 valeurs affichées correspondent au
centime près aux 22 agrégats recalculés à l'API avec les `where` en question** (dont
80 834 pour `ins_pmr` et 22 003 pour `equ_pmr_acc`, qui seraient respectivement 157 675 et
52 952 si le `where` était perdu). Rien à signaler.

---

## 4. Transposition vers `dsfr-data`

### 4.1 Le choix d'architecture, avant le tableau

Le modèle Opendatasoft impose **un agrégat = un aller-retour** : 21 requêtes pour 15 jauges,
rejouées à chaque changement de filtre. Transposer ce modèle tel quel donnerait 21
`dsfr-data-source`. Ce n'est **pas** l'architecture native ici, pour deux raisons vérifiées :

- **ODSQL ne sait pas faire d'agrégat conditionnel** — testé, deux HTTP 400 :
  `sum(if(equip_pmr_aire='true',1,0))` → *« unexpected ( at position 25 »* ;
  `sum(case when … end)` → *« unexpected when at position 28 »*. On ne peut donc pas
  ramener numérateur et dénominateur dans un même `select`.
- **Mais `group_by` sur le critère lui-même les ramène tous les deux, en une requête.**
  `group_by=equip_pmr_trib&select=count(*) as n&where=equip_trib_nb > 0` renvoie
  `[{false: 16117}, {true: 5623}]` : le numérateur *et* le dénominateur (leur somme, 21 740).
  Et **`group_by` accepte plusieurs champs** : les cinq critères dont le dénominateur est le
  contexte entier (aire PMR, chemin PMR, aire PSHS, chemin PSHS, signalétique) tiennent dans
  **une seule requête** — `group_by=equip_pmr_aire,equip_pmr_chem,equip_pshs_aire,equip_pshs_chem,equip_pshs_sign`
  → 32 lignes (2⁵), **273 ms**, dont on recompose exactement les cinq numérateurs
  (173 145 / 76 435 / 14 043 / 8 328 / 6 177 ✔).

**Chronométrage** (22 agrégats, forme ODS d'origine) : **961 ms** de mur en parallèle
(max unitaire 931 ms), **3 814 ms** en série. Le coût réel est le nombre d'allers-retours, pas
le poids : chaque réponse fait quelques centaines d'octets. La forme `group_by` divise ce
nombre par deux à trois et reste sous la seconde.

**Sur le nombre de sources, `group-by` multi-champs est vérifié côté adaptateur** :
`splitGroupBy()` découpe sur la virgule et `escapeOdsqlGroupField()` renvoie le nom **tel quel**
dès qu'il matche `^[A-Za-z0-9_]+$` (`opendatasoft-adapter.ts:72`) — pas de backquote parasite
sur ces noms techniques, les clés reviennent propres (vérifié à l'API sur la forme exacte que
produit l'adaptateur : `select=count(*) as equip_numero__count, equip_pmr_trib&group_by=equip_pmr_trib`
→ `[{"equip_pmr_trib":"false","equip_numero__count":16117}, …]`).

### 4.2 Tableau de correspondance

| Directive / composant Opendatasoft | Composant + attributs `dsfr-data` |
|---|---|
| `<ods-dataset-context dataes-dataset="data-es">` (portail Sports, sans clé) | `<dsfr-data-source api-type="opendatasoft" base-url="https://equipements.sports.gouv.fr" dataset-id="data-es">` — **pas d'`api-key-ref`** (portail ouvert, CORS `*` vérifié), **pas de `proxy-url`** |
| Les deux contextes figés `greenevo` / `redevo` (`refine.equip_pmr_aire` true / false) | **Une seule** source + **une seule** couche : `<dsfr-data-map-layer color-field="equip_pmr_aire" color-map="true:#1f8d49,false:#e1000f">` — le mapping catégoriel remplace les deux contextes et supprime d'office le recouvrement (défaut n° 2) |
| `<select ng-model="dataes.parameters['refine.reg_nom']">` + `ods-facet-results sort="alphanum"` | `<dsfr-data-facets server-facets fields="reg_nom, equip_type_famille" display="reg_nom:select \| equip_type_famille:select">` — **cascade native** (vérifiée à l'API : 28 familles sous Bretagne, mêmes comptes que l'écran). Séparateur `\|` pour `display`, `,` pour `fields` |
| …ou, pour garder deux `<select>` de page pilotant **toutes** les sources | `<dsfr-data-context sources="s-crit s-trib s-vest … s-carte" url-sync>` + deux `<dsfr-data-context-filter field="reg_nom" ui="sel-reg">` / `field="equip_type_famille" ui="sel-fam"` — `url-sync` corrige le défaut n° 6 |
| `ods-aggregation function="COUNT"` (le dénominateur global) | `<dsfr-data-source select="count(*) as n" limit="1">` **ou**, mieux, la somme des lignes du `group-by` ci-dessous — plus de requête dédiée |
| `ods-adv-analysis select="count(equip_numero) as total" where="X='true'"` ×5 (dénominateur = contexte) | **Une** `<dsfr-data-source group-by="equip_pmr_aire, equip_pmr_chem, equip_pshs_aire, equip_pshs_chem, equip_pshs_sign" aggregate="equip_numero:count">` — 32 lignes, 273 ms, 5 jauges |
| `ods-adv-analysis` numérateur + dénominateur d'un critère conditionné (tribunes, vestiaires, sanitaires, douches, accueil) | **Une** source par critère : `group-by="equip_pmr_trib, equip_pshs_trib"` + `where="equip_trib_nb > 0"` → les 2 numérateurs **et** le dénominateur d'un coup |
| `ods-adv-analysis select="count(distinct inst_numero)"` (jauges 1 et 9) | `<dsfr-data-source select="count(distinct inst_numero) as nb" where="search(inst_acc_handi_type,'moteur')" limit="1">` — `count(distinct …)` et `search()` passent tels quels dans le `where`/`select` ODSQL de la source (dialecte du provider) |
| `<ods-gauge display-mode="circle">` | `<dsfr-data-chart type="pie">` (défaut `fill=false` ⇒ **donut**) sur le `group-by` du critère : `label-field="equip_pmr_trib" value-field="equip_numero__count"`. Voir limite L1 pour `type="gauge"` |
| `<ods-gauge display-mode="bar">` | `<dsfr-data-chart type="bar" horizontal stacked>` sur le même group-by (barre 2 segments), ou `<dsfr-data-kpi format="pourcentage">`. Voir limite L1 |
| Le texte `{{num|number}} / {{den|number}} <Libellé>` sous chaque jauge | `<dsfr-data-kpi value="equip_numero__count:max" label="…" format="nombre">` dans un `<dsfr-data-kpi-group>` — le format `fr-FR` est appliqué systématiquement, ce qui corrige le défaut n° 4 |
| `<ods-map basemap="ign.planv2" scroll-wheel-zoom="false">` | `<dsfr-data-map tiles="ign-plan" center="46.6,2.3" zoom="6" fit-bounds fit-zone="41,-5.5,51.5,10">` — le `fit-zone` métropole corrige le défaut n° 2 ; `insets="drom"` (+ `dsfr-data-map-inset territory="nouvelle-caledonie"`, `polynesie-francaise`, `wallis-et-futuna`) pour les 6 territoires réellement peuplés dans le jeu |
| `ods-map-layer function="COUNT" display="auto"` (clusters agrégés serveur) | `<dsfr-data-map-layer type="marker" cluster max-items="20000" bbox bbox-field="equip_coordonnees" geo-field="equip_coordonnees">` — chargement par viewport. Voir limite L2 |
| Infobulle ODS par défaut (6 champs du back-office) | `<dsfr-data-map-layer popup-fields="inst_nom, equip_type_name, equip_numero, inst_adresse, inst_cp, new_name, equip_pmr_aire">` — **le 7ᵉ champ corrige le défaut n° 7** ; ou `<dsfr-data-map-popup title-field="inst_nom">` pour un panneau |
| La légende manuelle en `<span class="Legend-colorBox">` (avec son gris fantôme) | `<dsfr-data-map-legend label="Aire d'évolution — accès PSHM">` : les entrées sont **dérivées du `color-map` réellement rendu** (`getLegendEntries()`), donc **une entrée grise ne peut pas apparaître** si aucune donnée grise n'existe — défaut n° 1 corrigé structurellement |
| La loupe géocodeur (recentrage seul) | Pas d'équivalent géocodeur ; l'équivalent fonctionnel est `<dsfr-data-search server-search count>` sur `inst_nom`/`new_name`, qui **filtre** au lieu de recentrer (voir limite L3) |
| Rien dans l'original | `<dsfr-data-a11y>` : tableau de données + export CSV + description textuelle des 15 taux — la page d'origine n'offre aucune alternative non graphique |

### 4.3 Esquisse de code (squelette de la page)

```html
<!-- ── Portail Sports : ouvert, CORS *, aucune clé ─────────────────────── -->

<!-- A. Les 5 critères dont le dénominateur est le contexte entier : 1 requête -->
<dsfr-data-source id="s-global"
  api-type="opendatasoft"
  base-url="https://equipements.sports.gouv.fr" dataset-id="data-es"
  group-by="equip_pmr_aire, equip_pmr_chem, equip_pshs_aire, equip_pshs_chem, equip_pshs_sign"
  aggregate="equip_numero:count"></dsfr-data-source>

<!-- B. Un critère conditionné = 1 requête pour ses 2 jauges + son dénominateur -->
<dsfr-data-source id="s-trib" api-type="opendatasoft"
  base-url="https://equipements.sports.gouv.fr" dataset-id="data-es"
  group-by="equip_pmr_trib, equip_pshs_trib" aggregate="equip_numero:count"
  where="equip_trib_nb > 0"></dsfr-data-source>
<dsfr-data-source id="s-vest" … where="equip_vest_sport > 0"
  group-by="equip_pmr_vest, equip_pshs_vest" aggregate="equip_numero:count"></dsfr-data-source>
<dsfr-data-source id="s-sanit" … where="equip_sanit = 'true'"
  group-by="equip_pmr_sanit, equip_pshs_sanit" aggregate="equip_numero:count"></dsfr-data-source>
<dsfr-data-source id="s-douche" … where="equip_douche = 'true'"
  group-by="equip_pmr_douche" aggregate="equip_numero:count"></dsfr-data-source>
<dsfr-data-source id="s-accueil" … where="search(equip_loc_type, 'accueil')"
  group-by="equip_pmr_acc" aggregate="equip_numero:count"></dsfr-data-source>

<!-- C. Les installations (count distinct) : 3 requêtes irréductibles -->
<dsfr-data-source id="s-ins"      … select="count(distinct inst_numero) as nb" limit="1"></dsfr-data-source>
<dsfr-data-source id="s-ins-pmr"  … select="count(distinct inst_numero) as nb" limit="1"
  where="search(inst_acc_handi_type, 'moteur')"></dsfr-data-source>
<dsfr-data-source id="s-ins-pshs" … select="count(distinct inst_numero) as nb" limit="1"
  where="search(inst_acc_handi_type, 'sensoriel')"></dsfr-data-source>

<!-- D. La carte : une source, une couche bicolore, chargement par viewport -->
<dsfr-data-source id="s-carte" api-type="opendatasoft"
  base-url="https://equipements.sports.gouv.fr" dataset-id="data-es"
  select="inst_nom, equip_type_name, equip_numero, inst_adresse, inst_cp, new_name, equip_pmr_aire, equip_coordonnees"
  where="equip_coordonnees is not null" max-records="20000"></dsfr-data-source>

<!-- ── Les deux filtres, diffusés à TOUTES les sources (carte comprise) ─── -->
<label class="fr-label" for="sel-reg">Région</label>
<select class="fr-select" id="sel-reg"><option value="">France entière</option>…</select>
<label class="fr-label" for="sel-fam">Famille d'équipement</label>
<select class="fr-select" id="sel-fam"><option value="">Toutes les familles</option>…</select>

<dsfr-data-context url-sync
  sources="s-global s-trib s-vest s-sanit s-douche s-accueil s-ins s-ins-pmr s-ins-pshs s-carte">
  <dsfr-data-context-filter field="reg_nom"           label="Région"  ui="sel-reg"></dsfr-data-context-filter>
  <dsfr-data-context-filter field="equip_type_famille" label="Famille" ui="sel-fam"></dsfr-data-context-filter>
</dsfr-data-context>
<dsfr-data-context-tags></dsfr-data-context-tags>

<!-- ── Les jauges : donut à deux parts, le complément est nommé ─────────── -->
<h2>En quelques chiffres</h2>
<div class="odv-acc-grille">
  <section>
    <h3>PSHM — personne en situation de handicap moteur</h3>

    <dsfr-data-chart type="pie" source="s-ins-pmr" …></dsfr-data-chart>
    <dsfr-data-kpi source="s-ins-pmr" value="nb:max" format="nombre"
      label="installations accessibles aux PSHM"></dsfr-data-kpi>

    <dsfr-data-chart type="pie" source="s-global"
      label-field="equip_pmr_aire" value-field="equip_numero__count"
      name="Aires d'évolution" databox databox-title="Aires d'évolution — accès PSHM"
      databox-source="Data ES, Ministère des Sports" databox-download></dsfr-data-chart>

    <dsfr-data-chart type="pie" source="s-trib"
      label-field="equip_pmr_trib" value-field="equip_numero__count"
      databox-title="Tribunes — accès PSHM"></dsfr-data-chart>
    …
  </section>
  <section><h3>PSHS — personne en situation de handicap sensoriel</h3>…</section>
</div>

<!-- ── La carte : une couche, deux couleurs, légende dérivée des données ── -->
<h2>Pour aller plus loin</h2>
<h3>Aire d'évolution des équipements — naviguez dans la base</h3>
<dsfr-data-map name="Accessibilité des aires d'évolution aux PSHM"
  tiles="ign-plan" tiles-style="muted"
  center="46.6,2.3" zoom="6" fit-bounds fit-zone="41,-5.5,51.5,10" insets="drom">
  <dsfr-data-map-layer source="s-carte" type="marker" cluster max-items="20000"
    bbox bbox-field="equip_coordonnees" geo-field="equip_coordonnees"
    color-field="equip_pmr_aire" color-map="true:#1f8d49,false:#e1000f"
    popup-fields="inst_nom, equip_type_name, equip_numero, inst_adresse, inst_cp, new_name, equip_pmr_aire">
  </dsfr-data-map-layer>
  <dsfr-data-map-inset territory="nouvelle-caledonie"></dsfr-data-map-inset>
  <dsfr-data-map-inset territory="polynesie-francaise"></dsfr-data-map-inset>
  <dsfr-data-map-inset territory="wallis-et-futuna"></dsfr-data-map-inset>
</dsfr-data-map>
<dsfr-data-map-legend label="Aire d'évolution — accès handicap moteur"></dsfr-data-map-legend>

<!-- ── Ce que l'original n'a pas : l'alternative non graphique ──────────── -->
<dsfr-data-a11y source="s-global"></dsfr-data-a11y>
```

---

## 5. Limites et points durs identifiés

**L1 — La jauge en pourcentage n'a pas de chemin déclaratif de bout en bout.**
*Obstacle* : `ods-gauge value="…" max="…"` calcule le ratio lui-même à partir de deux nombres.
*Voie native essayée* : `dsfr-data-chart type="gauge"` **existe** (`dsfr-data-chart.ts:57`,
rendu `<gauge-chart>` de DSFR Chart) — mais son entrée est un **pourcentage déjà calculé** :
`percent = gaugeValue ?? toNumber(data[0][value-field])`, arrondi à l'entier
(`dsfr-data-chart.ts:765-770`). Il faudrait donc une ligne unique portant le taux.
*Impasse vérifiée* : ODSQL ne sait pas produire ce taux (agrégat conditionnel refusé, deux
HTTP 400 cités en 4.1) ; et `dsfr-data-normalize compute` est **ligne à ligne** — son JSDoc
exclut explicitement les « calculs sur valeurs agrégées », donc il ne peut pas diviser une
ligne par la somme des autres.
*Contournement retenu, sans script* : `type="pie"` (donut par défaut, `fill=false`) sur le
`group-by` du critère. Les deux parts `true`/`false` somment au dénominateur et DSFR Chart
affiche la répartition. **Ce n'est pas un clone** : le donut **nomme le complément** au lieu de
laisser un arc gris muet, ce qui est plutôt meilleur en lisibilité. Pour la forme « barre »,
`type="bar" horizontal stacked` donne le même service.
*Où ça cesserait de marcher* : si un critère avait un troisième état (null), le donut ferait
trois parts au lieu de deux — ici c'est sans objet, aucun critère n'a de null (vérifié sur 6).
*Ce n'est pas une limite dure* : `type="gauge"` reste utilisable dès qu'un taux est calculé en
amont (une source `url=` + `params` sur mesure, ou un jeu déjà agrégé).

**L2 — Les bulles agrégées à l'échelle nationale ne se reproduisent pas côté client.**
*Obstacle* : ODS calcule ses clusters **côté serveur** — une bulle « 169 351 » sans jamais
transférer 169 351 points. `dsfr-data-map-layer cluster` regroupe **les marqueurs déjà chargés**.
*Voie native essayée* : `bbox` + `bbox-field` (la couche republie un
`in_bbox(equip_coordonnees, …)` à chaque déplacement, `dsfr-data-map-layer.ts:703` — clause
vérifiée acceptée par ce portail, HTTP 200) et `max-items="20000"` (le JSDoc précise
qu'avec `cluster` cette valeur est sans risque, les marqueurs groupés ne pesant pas sur le DOM).
*Pièges à ne pas repayer* : (a) le **tout premier fetch d'une source en mode `bbox` n'est pas
filtré** — d'où le `max-records="20000"` et le `where="equip_coordonnees is not null"` sur
`s-carte` ; (b) `max-items` reste à 5 000 par défaut et **tronque avec un bandeau** qui ne
charge rien de plus (PG-013) ; (c) le `select` de `s-carte` **exclut** `equip_obs` et
`inst_obs` (textes longs) — mais attention, la règle du dépôt est « soit on écarte les textes
longs par `select`, soit pas de `select` du tout » : ici on écarte, avec 8 colonnes sur 104.
*Ce qui reste différent, honnêtement* : l'utilisateur ne verra plus « 169 351 » d'un coup d'œil
national. **Mais ce chiffre est déjà donné, en toutes lettres, par la jauge « Aires d'évolution »
juste au-dessus** (173 145 / 333 611). Le besoin fonctionnel de la carte — *où* sont les
équipements accessibles — est servi par le `bbox`, mieux même, puisque la couche unique
bicolore supprime le recouvrement rouge/vert du n° 2. Ce n'est donc **pas** une limite de
`dsfr-data` : c'est le modèle ODS (un contexte, tout y pend) qu'il ne faut pas transposer.

**L3 — Pas de géocodeur d'adresse dans `dsfr-data-map`.**
*Obstacle* : la loupe d'ODS interroge un service de géocodage externe et **recentre** la carte.
*Voie native essayée* : aucune des références de `dsfr-data-map` / `dsfr-data-map-layer` ne
porte de géocodeur (relu attribut par attribut). `dsfr-data-search server-search` existe mais
**filtre** les données — sémantique différente : la carte se vide de tout ce qui ne matche pas.
*Contournement* : `dsfr-data-search server-search count` sur `inst_nom`/`new_name`, combiné à
`fit-bounds`, donne le service attendu (« montre-moi Rennes ») en filtrant plutôt qu'en
recadrant. L'écart assumé : on ne peut pas chercher une adresse **absente du jeu** (un
carrefour, un quartier) pour voir ce qu'il y a autour. Si le géocodage sur référentiel externe
est requis, c'est une demande à porter à `dsfr-data` — pas un contournement de page.

**L4 — `count(distinct …)` n'est pas délégué par `aggregate`, seulement par `select`.**
*Obstacle* : les jauges 1 et 9 comptent des **installations** distinctes dans un jeu à la maille
équipement. `dsfr-data-source aggregate="champ:fn"` construit `count(*)` ou `fn(champ)`
(`opendatasoft-adapter.ts:414-421`) — **pas** de `distinct`.
*Voie native* : passer par le `select` ODSQL brut de la source
(`select="count(distinct inst_numero) as nb" limit="1"`), qui est transmis tel quel au provider.
Vérifié à l'API : 157 675 / 80 834 / 4 764, les trois valeurs de l'écran.
*Conséquence* : ces trois agrégats restent **trois requêtes séparées** ; ils ne se mutualisent
pas avec le `group_by`. Coût mesuré : 136-169 ms chacune, en parallèle des autres.
*Piège associé* : `select=count(…)` **sans** `group_by` renvoie la valeur **répétée une fois par
ligne de page** — reproduit ici (`in_bbox` + `count(*)` sans group_by → 5 lignes identiques à
1 258). D'où le `limit="1"` obligatoire, et la lecture en `:max` côté KPI.

**L5 — La facette « famille » et la facette « région » : `server-facets` ou `<select>` de page ?**
*Obstacle apparent* : les deux `<select>` de l'original doivent piloter **dix sources**, pas une.
*Voie native essayée* : `dsfr-data-facets server-facets` fonctionne (les deux champs **sont**
déclarés au back-office — vérifié à `/facets` : `reg_nom` 24 valeurs, `equip_type_famille`
29 valeurs, avec cascade correcte sous refine) mais `dsfr-data-facets` filtre **sa** source.
*Solution retenue* : deux `<select>` DSFR de page + `dsfr-data-context` / `dsfr-data-context-filter`,
qui diffuse la clause à **toutes** les sources listées (merge en ET côté source, `whereKey`
stable par filtre). C'est le seul montage qui corrige aussi le défaut n° 3 (la carte suit enfin
le filtre). Coût : il faut peupler les deux `<select>` — soit en dur (les 24 + 29 valeurs sont
stables et listées au § 2), soit avec un `dsfr-data-facets server-facets` en doublon qui sert
uniquement à afficher les comptes.

**L6 — 21 agrégats ramenés à 9 sources, mais 9 sources restent 9 requêtes par changement de filtre.**
Mesuré : 961 ms en parallèle pour les 22 requêtes de la forme ODS d'origine, 3 814 ms en série.
La forme `group-by` proposée descend à **9 requêtes** (5 critères globaux en 1, quatre critères
conditionnés, trois `count distinct` — soit 1+5+3 = 9), donc bien en dessous de la seconde.
`dsfr-data` émet ses commandes de contexte en parallèle : le coût du filtre reste celui de la
requête la plus lente, ici `search(equip_loc_type,'accueil')` — **2 267 ms à froid**, 140 ms
ensuite. C'est le point à surveiller, et il vient du jeu (recherche plein texte sur colonne
multivaluée), pas de la bibliothèque.

---

## 6. Données à reproduire fidèlement

- **Le jeu** : `data-es` sur `https://equipements.sports.gouv.fr`, **333 611 lignes**,
  **157 675 installations** distinctes, sans clé API.
- **Les 15 jauges**, avec **les 22 nombres du tableau du § 2.3** — dont les deux `circle`
  (51 % PSHM / 3 % PSHS) et les cinq dénominateurs conditionnés (21 740 tribunes,
  141 076 vestiaires, 204 378 sanitaires, 137 094 douches, 52 952 accueils).
- **L'asymétrie des colonnes** : 8 jauges PSHM, 7 PSHS ; pas de Douches ni d'Accueil côté PSHS,
  Signalétiques uniquement côté PSHS. Ne pas « compléter » la colonne : les champs n'existent pas.
- **Les deux filtres** : 24 régions (ordre alphanum, « France entière » en tête) et
  29 familles (ordre décroissant des comptes, « Toutes les familles » en tête), **en cascade**,
  combinés en ET. Contrôle : Bretagne → 19 164 / 8 169 / 5 352 / 164 / 1 537 / 12 102 / 1 585 /
  165 ; Bretagne + Bassin de natation → 418 équipements, 283 installations.
- **La carte** : bicolore sur `equip_pmr_aire` (`#1f8d49` accessible / `#e1000f` non),
  **172 528 points verts et 159 340 rouges géolocalisés** (1 743 équipements sans coordonnées),
  infobulle à 6 champs (`inst_nom`, `equip_type_name`, `equip_numero`, `inst_adresse`,
  `inst_cp`, `new_name`) **plus le critère d'accessibilité**, fond IGN Plan.
- **Le texte éditorial** : les trois H3 d'introduction, les deux photos CREPS de Vichy avec
  leurs légendes, les trois H3 de conclusion et les 4 liens sortants (service-public.fr,
  CESH/LinkedIn, Handiguide, ANDES). C'est la moitié de la page ; l'omettre changerait l'objet.
- **La note `*`** « Un filtre a été effectué pour conserver uniquement les équipements
  concernés » — elle est nécessaire, et le § 3 n° 10 en donne la mesure (656 tribunes et
  1 191 vestiaires déclarés accessibles sur des équipements qui n'en ont pas).

### À corriger par rapport à l'original (et à dire dans l'analyse de la page)

1. Cadrer la carte sur la métropole + encarts, au lieu du planisphère.
2. Une seule couche bicolore : plus de rouge par-dessus vert.
3. Brancher la carte sur les deux filtres.
4. Formater les 15 nombres en `fr-FR` (deux ne le sont pas).
5. Mettre l'accessibilité **dans** l'infobulle, pas seulement dans la couleur.
6. Supprimer l'entrée de légende « Pas d'information (gris) », qui ne correspond à aucune donnée.
7. Permettre de changer de région sans effacer d'abord.
8. Activer `url-sync` : un état filtré doit être partageable.
9. Ajouter une alternative non graphique (`dsfr-data-a11y`) : l'original n'en a aucune.
