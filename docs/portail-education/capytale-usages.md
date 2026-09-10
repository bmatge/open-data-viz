# Capytale — Analyse des usages

- **URL du catalogue** : https://data.education.gouv.fr/explore/assets/**test-capytale-2-copie-copie**/view/
  → **200 direct, aucune redirection** (`curl -sIL`).
- **Id catalogue** : 5 · **Thématique** : `Education` (**sans accent** — l'entrée 1 du même catalogue
  porte `Éducation` avec accent : la facette du catalogue est scindée en deux). Pas de
  sous-thématique. Vignette `capytale.gif`.
- **Relevé visuel** : 2026-09-10, Chrome (extension), viewport 1568 × 751 CSS px.
- **Producteur des jeux** : DNE — Ministère de l'Éducation nationale — Académie de Paris.

## Le slug est un défaut, et il est dans l'URL

`test-capytale-2-copie-copie`. **Vérifié** : c'est bien l'URL publique, celle du catalogue
(`_catalogue-source.json`, entrée 5, champ `lien`), celle de la barre d'adresse, et celle du
`<link rel="canonical" href="https://data.education.gouv.fr/pages/test-capytale-2-copie-copie/">`.
Un identifiant de production qui dit « test », « 2 », « copie », « copie » : il part dans les liens
partagés, dans les moteurs, dans les citations. Ce n'est pas cosmétique — c'est l'adresse
permanente de l'objet. Et le slug est **immuable en pratique** : le changer casse tout lien déjà
diffusé.

## ⚠️ Ce n'est pas une page Studio

`GET /api/portal/v1.0/studio_pages/test-capytale-2-copie-copie` → `{"message":"Pas trouvé.",
"error_code":"not_found"}`, et le slug n'est pas dans les 23 pages Studio du portail. Ce n'est pas
non plus un jeu (`/catalog/datasets/…` → 404). C'est une **page AngularJS `/pages/<slug>/`
classique servie sous une URL `/explore/assets/…`** : `$scope.blocks` est présent, la méthode
habituelle s'applique. Template désechappé archivé dans
`_sources/test-capytale-2-copie-copie.html` (31 412 c.), CSS dans `.css` (24 257 c.).
Décoder les entités HTML en **une seule passe** (le `html` du JSON est doublement échappé).

## Jeux de données — trois cités, **un seul interrogé**

| Jeu | Lignes | Champs | Utilisé par la page ? |
|---|---:|---:|---|
| `fr-en-capytale-usages-academiques-douzederniersmois` | **1 128** | 9 | **oui** — deux `ods-dataset-context`, une facette, deux `ods-aggregation`, un `ods-chart` |
| `fr-en-capytale-nombre-de-visite` | 36 | 10 | **non** — cité en pied de page et en lien d'en-tête, jamais requêté |
| `fr-en-capytale-repartition-des-visites-sur-dataeducation` | 72 | 10 | **non** — idem |

Tous trois : `visibility: domain`, **Licence Ouverte v2.0 (Etalab)**, `modified` 2026-09-09
(rafraîchis quotidiennement).

### `fr-en-capytale-usages-academiques-douzederniersmois` (le seul branché)

Champs : `date` (date, **granularité mois**), `academie` (text), `data_nb_visits` (int),
`data_nb_actions` (int), `data_sum_visit_length` (int), **`geo_shape` (geo_shape)**,
`value` (text), `data` (text), `geo_point_2d` (geo_point_2d).

- **32 académies distinctes** (majuscules, sans accents) : AEFE, AIX-MARSEILLE, AMIENS, BESANCON,
  BORDEAUX, CLERMONT-FERRAND, CORSE, CRETEIL, DIJON, GRENOBLE, GUADELOUPE, GUYANE, LA REUNION,
  LILLE, LIMOGES, LYON, MARTINIQUE, MAYOTTE, MONTPELLIER, NANCY-METZ, NANTES, NICE, NORMANDIE,
  ORLEANS-TOURS, PARIS, POITIERS, POLYNESIE, REIMS, RENNES, STRASBOURG, TOULOUSE, VERSAILLES.
- **36 dates**, de `2023-10` à `2026-09`. 1 128 lignes = 32 × 36 − 24 (AEFE n'a que 13 mois,
  Clermont-Ferrand 35).
- **Le nom du jeu ment** : « douzederniersmois » pour **36 mois glissants**.
- Somme `data_nb_visits` sur tout le jeu : **11 393 906**.

### Les deux autres jeux (non requêtés mais nécessaires pour vérifier la page)

- `fr-en-capytale-nombre-de-visite` : 36 lignes, une par mois, `mois_` de `2023-10` à `2026-09`,
  `nombre_de_visite_`. **Total : 18 621 144.** Maximum : **1 136 313 en janvier 2026**.
  Les champs `metadata`, `reportdata`, `reportmetadata` sont des **blobs JSON Matomo bruts**
  (un `reportdata` contient déjà les 36 valeurs mensuelles en doublon de la table).
- `fr-en-capytale-repartition-des-visites-sur-dataeducation` : 72 lignes = 36 mois × 2 profils.
  Libellés : **`Elève`** (sans accent) et **`Enseignant`**. Sommes : 10 433 657 / 1 047 883 →
  **90,9 % / 9,1 %**.

## Objectif de la dataviz et informations véhiculées

- **Question** : « Capytale décolle-t-elle, où, et qui l'utilise ? »
- **Message porté** : croissance forte et régulière depuis 2023, saisonnalité scolaire marquée
  (creux d'été à ~1 % du pic), public à 91 % élève, déploiement inégal entre académies.
- **Ce que l'utilisateur doit obtenir** : la trajectoire mensuelle, la répartition élèves /
  enseignants, un classement académique, et une lecture locale par académie.
- **Ce qui n'est pas dans l'objet** :
  - **aucune donnée d'activité pédagogique** (nombre d'activités, disciplines, niveaux) : ce sont
    des métriques Matomo de fréquentation, rien de plus ;
  - **aucune notion d'établissement** (le grain est l'académie) ;
  - **aucun ratio rapporté à la population scolaire** — Orléans-Tours en tête et Lyon en bas de
    tableau ne veut pas dire grand-chose sans dénominateur, et la page ne le dit pas ;
  - aucun accès aux données sources depuis la page (les trois liens d'en-tête mènent aux **pages
    d'actif**, pas à un export).

## Relevé visuel exhaustif, bloc par bloc

**Le point structurant à connaître avant de lire ce qui suit : sur les sept sections de la page,
une seule est branchée sur la donnée.** Les six autres sont du **HTML statique** — valeurs,
hauteurs de barres et infobulles écrites en dur dans le template, figées à « mise à jour mai 2026 ».
Compté dans le template : **3 directives ODS vivantes** (`ods-facet-results`, deux
`ods-aggregation`, un `ods-chart`) contre **36 barres, 26 empilements, 18 bulles, 10 lignes de
classement, 15 lignes de tableau et 19 colonnes d'intensité en dur**.

### 0. Chrome de portail

En-tête DSFR, menu du portail, fil d'Ariane « Catalogue › Capytale Analyse des us… › Consultation »,
titre du catalogue « **Capytale Analyse des usages** », icône signet. Bulle de chat magenta
flottante en bas à droite.

### 1. En-tête éditorial (`.capytale-header`)

- `<h1 class="capytale-logo">` : « **Capytale** » (bleu RF, très gros) ; sous-titre
  « ANALYSE DES USAGES ».
- Badge pilule à droite : « **data.education.gouv.fr · mise à jour mai 2026** ». **Écrit en dur** —
  les jeux, eux, portent `modified: 2026-09-09.`
- Intro : « Plateforme STIAM du ministère de l'Éducation nationale — déploiement académique et
  évolution des usages **de juin 2023 à mai 2026**. » Les jeux ne contiennent plus juin-septembre
  2023 (fenêtre glissante de 36 mois : ils commencent en octobre 2023).
- Trois liens pilule : **Nombre de visites**, **Répartition des visites**, **Usages académiques**
  → `…/explore/assets/<jeu>/` (pages d'actif).

### 2. « Vue d'ensemble nationale » — 4 KPI, **tous statiques**

| Carte | Valeur affichée | Sous-titre | Vérification à la donnée du jour |
|---|---|---|---|
| VISITES TOTALES (bleu) | **14,1 M** | juin 2023 → mai 2026 | **invérifiable et périmé** : le total actuel du jeu de visites est **18 621 144** sur oct. 2023 – sept. 2026 ; la fenêtre « juin 2023 → mai 2026 » n'existe plus dans la donnée |
| PIC MENSUEL (vert) | **1,14 M** + « ↑ ×2,3 vs janvier 2024 » | janvier 2026, devant novembre 2025 | **exact** : max = 1 136 313 en 2026-01, 2ᵉ = 1 136 007 en 2025-11 ; 1 136 313 / 496 226 = ×2,29 ✔ |
| ACADÉMIES ACTIVES (orange) | **31** | dont DROM, Polynésie et AEFE | **32** valeurs distinctes dans le jeu aujourd'hui |
| PART ÉLÈVES (rose) | **91 %** | 9 % enseignants | **exact** : 90,9 % / 9,1 % ✔ |

### 3. « Vue nationale et locale » — **la seule section vivante**

- **Filtre académie** (`.capytale-local-filter`) : titre, sous-titre « Choisir une académie pour
  actualiser les indicateurs locaux. », un `<ods-select multiple="false">` peuplé par
  `ods-facet-results="facetsAcademie"` (facette `academie`, `sort="alphanum"`), placeholder
  « **Vue nationale — sélectionner une académie** », et un bouton **Réinitialiser**.
  **Vérifié à l'écran** : le menu s'ouvre sur un champ « Filtre » et la liste **AEFE,
  AIX-MARSEILLE, AMIENS, BESANCON, BORDEAUX, CLERMONT-FERRAND, CORSE, CRETEIL, DIJON…** —
  **en capitales, sans accents, sans compteurs**, alors que tout le reste de la page écrit
  « Orléans-Tours » et « Créteil ».
- Pilule d'état : « **Vue affichée   NATIONAL** ».
- **Trois KPI** (les seuls calculés), sur un `ods-dataset-context` imbriqué `ctxusagesaca` dont les
  paramètres sont posés par une **expression d'interpolation à effet de bord**
  (`{{ ctxusagesaca.parameters = {'refine.academie': parameters.acaselection}; '' }}`) :

  | Bloc | Formule | Valeur nationale lue | Vérifiée à l'API |
  |---|---|---|---|
  | USAGES ACADÉMIQUES | `ods-aggregation-function="SUM"` sur `data_nb_visits` | **11 393 906** | 11 393 906 ✔ |
  | PÉRIODES OBSERVÉES | `ods-aggregation-function="COUNT"` | **1 128** | 1 128 ✔ — mais ce sont des **lignes**, pas des périodes (il y a 36 périodes) |
  | TYPE DE VUE | texte `ng-if` | **Nationale** | — |

- **Carte « Lecture locale »** : trois cases grises statiques — TERRITOIRE OBSERVÉ (dynamique),
  PÉRIODE « **12 derniers mois disponibles** » (faux : 36), SOURCE « Usages académiques Capytale ».
- **« Évolution mensuelle locale »** — le **seul vrai graphique** de la page :
  ```html
  <ods-chart align-month="true" scientific-display="false">
    <ods-chart-query context="ctxusagesaca" field-x="date" maxpoints="0" timescale="month">
      <ods-chart-serie chart-type="column" color="#000091"
                       expression-y="data_nb_visits" function-y="SUM"
                       label-y="Usages mensuels" scientific-display="true">
  ```
  Rendu vérifié : **36 colonnes bleu RF `#000091`**, axe X `Oct '23 … Juil '26` (une étiquette sur
  trois, obliques), axe Y titré « Usages mensuels », graduations 0 / 200k / 400k / 600k / 800k,
  légende « ● Usages mensuels » centrée sous le graphique.

- **Sélection d'une académie — vérifiée** : `CORSE` → USAGES ACADÉMIQUES **49 515**
  (contrôlé à l'API : `sum(data_nb_visits) where academie="CORSE"` = 49 515 ✔),
  PÉRIODES **36**, TYPE DE VUE **Locale**, pilule « Vue affichée CORSE », graphique re-échelonné
  à 4k. **Rien d'autre sur la page ne bouge.**

### 4. « Évolution temporelle » — deux graphiques **en HTML statique**

**a) « Visites mensuelles — juin 2023 à mai 2026 »** (`.capytale-chart-monthly`)
Sous-titre : « Les mois d'été sont signalés en gris. Forte progression des usages entre 2023 et
2026. » Axe Y **écrit en dur** dans cinq `<span>` : 1,2M / 900k / 600k / 300k / 0.
**36 `<div class="capytale-bar">`**, chacun avec `style="height:NN%"` et
`data-tooltip="Mois AAAA : N visites"`, étiquette en `rotate(-55deg)`.
Infobulle vérifiée au survol : bulle noire « **Novembre 2025 : 1 136 007 visites** » — elle
fonctionne (CSS `::after` sur `[data-tooltip]`).

Les 36 valeurs en dur, de juin 2023 à mai 2026 :
84 527 · 11 367 · 13 869 · 371 799 · 331 032 · 164 456 · 80 118 · 496 226 · 419 234 · 491 504 ·
364 212 · 419 691 · 172 234 · 15 521 · 19 506 · 630 848 · 668 835 · 878 168 · 648 280 · 831 592 ·
526 348 · 861 432 · 505 501 · 637 884 · 228 276 · 19 252 · 28 025 · 845 316 · 827 254 ·
**1 136 007** · 935 939 · **1 136 313** · 817 358 · 1 128 514 · 719 970 · **400 367**.
**La dernière barre est fausse aujourd'hui** : mai 2026 vaut **842 525** dans le jeu ; les 400 367
affichés sont un mois en cours au moment de la copie. Toutes les autres valeurs concordent avec
`reportdata` du jeu `fr-en-capytale-nombre-de-visite`.
Les six barres d'été portent `.capytale-bar-summer` (`background:#b8c1ec`) — au rendu, à 1 % ou 2 %
de hauteur, elles sont **quasi invisibles**, et rien ne signale « gris = été » (pas de légende).

**b) « Élèves vs enseignants »** (`.capytale-stacked-chart`)
Sous-titre « Répartition mensuelle des visites par profil utilisateur. »
**26 `<div class="capytale-stack">`** (septembre 2023 → mai 2026, **les mois d'été et juin sont
absents**), chacun avec deux enfants `<b>` (élèves, `#000091`) et `<i>` (enseignants, `#6a6af4`),
hauteurs en pourcentage écrites en dur. **Pas d'axe Y du tout** — juste quatre lignes de grille
CSS. Légende « ● Élèves ● Enseignants ».
Infobulle : « Septembre 2023 : 246 775 élèves · 28 672 enseignants ».
**Les barres sont normalisées à 100 % en interne** (`<b style="height:88%">` + `<i style="height:12%">`),
donc la part enseignants paraît constante — ce qui est vrai — mais **on ne peut rien lire d'absolu**.

### 5. « Carte des usages par académie » — **une image GIF et 18 pastilles en CSS**

- Le « fond de carte » est
  `.capytale-france-shape { background-image: url(…/assets/theme_image/**cartedefrance.gif**) }`,
  un **GIF raster** de la métropole, en bleu très pâle, positionné en pourcentages
  (`left:27.5%; top:3.5%; width:46.5%; height:88%`).
- La Réunion est un **`<div>` dessiné à la main** :
  `.capytale-reunion-shape { background:#dae2ff; border-radius:52% 48% 55% 45%;
  transform:rotate(-18deg) }` — 56 × 30 px, **posée sur le fond blanc, hors du cadre du GIF**.
- **18 `<span class="capytale-bubble">`** en `position:absolute`, coordonnées en pourcentages
  écrites une par une (`.bubble-lyon { left:55.64%; top:47.91%; width:30px; height:30px }`).
  Libellés abrégés dans la pastille : Lille, Amiens, Créteil, Nancy, Norm., Paris, Stras., Vers.,
  Rennes, Orléans, Nantes, Lyon, Bord., Toul., Mont., Aix, Nice, Réun.
- **Toutes les pastilles ont exactement la même couleur** (`background: var(--dsfr-blue)`).
  Seul le **diamètre** varie (56 px Orléans → 30 px Lyon).
- La légende en bas à gauche affiche « **Visites** / mars–mai 2026 » et une **barre de dégradé**
  `linear-gradient(90deg, #dedeff, var(--dsfr-blue))` avec « Faible » / « Élevé ».
  **Ce dégradé n'encode rien** : aucune pastille n'est claire. La légende annonce un codage par
  couleur pour un symbole codé par taille.
- **Les infobulles de la carte sont désactivées par CSS** :
  `.capytale-map .capytale-tooltip::before, .capytale-map .capytale-tooltip::after
  { display:none !important }` (la règle apparaît **quatre fois** dans la feuille).
  **Vérifié au survol de la bulle « Orléans » : rien ne s'affiche.** Les 18 `data-tooltip`
  (« Orléans-Tours : 116 059 visites »…) sont donc du texte mort.
- **14 des 32 académies n'ont pas de pastille** : Reims, Poitiers, Besançon, Grenoble, Dijon,
  Clermont-Ferrand, Limoges, Corse, Guadeloupe, Guyane, Martinique, Mayotte, Polynésie, AEFE.
  La sélection n'est pas « les 15 premières » : **Lyon (rang 20 sur mars–mai 2026, 24 057 visites)
  a une pastille, Reims (rang 16, 38 506) n'en a pas.**

### 6. « Classement académique » — deux blocs statiques

**a) « Top académies — visites cumulées »**, sous-titre « Classement sur les trois derniers mois
disponibles. » 10 lignes `libellé / barre / valeur`, largeurs en dur (100 %, 97 %, 86 %…) :
Orléans-Tours 116 059 · Normandie 112 932 · Versailles 100 201 · Toulouse 96 488 · Nice 92 217 ·
Rennes 88 029 · Nantes 79 903 · Paris 75 252 · Aix-Marseille 71 342 · Créteil 60 851.

**b) « Classement détaillé »**, 15 lignes `# / Académie / Visites / Act./visite`, la dernière
colonne en pastille colorée (`capytale-pill-high` vert > 8, `-mid` bleu 7-8, `-low` orange < 7).
Bloc en `overflow` : seules ~7 lignes sont visibles sans faire défiler la carte.

**Recalcul sur mars–avril–mai 2026 à partir du jeu (aujourd'hui) :** l'**ordre** des 10 premiers
et les **actions/visite** au dixième près sont **exacts** (Orléans-Tours 7,6 · Normandie 7,1 ·
Versailles 7,4 · Toulouse 6,8 · Nice 6,9 · Rennes 8,4 · Nantes 7,9 …). Mais **tous les volumes sont
sous-estimés d'environ 17 %** : Orléans-Tours vaut aujourd'hui **140 247** (page : 116 059),
Normandie **135 654** (page : 112 932). Même cause que la barre de mai 2026 : la copie a été prise
alors que mai n'était pas terminé. Deux mesures indépendantes confirment le même décalage.

### 7. « Intensité d'usage » — un dernier bloc statique

« Actions par visite par académie », sous-titre « Nombre moyen d'actions réalisées par session,
mars–mai 2026. » Légende à trois seuils (● vert > 8 · ● bleu 7 à 8 · ● orange < 7) puis
**19 colonnes** en dur, de Guadeloupe 9,0 à Polynésie 6,4. Les hauteurs sont des pourcentages
arbitraires (Guadeloupe 100 %, Polynésie 52 %) : **l'échelle ne part pas de zéro** — 9,0 fait le
double de 6,4 à l'œil pour un écart réel de 40 %. Pas d'axe.

### 8. Pied de page

« Données : *fr-en-capytale-usages-academiques-douzederniersmois*, *fr-en-capytale-nombre-de-visite*,
*fr-en-capytale-repartition-des-visites-sur-dataeducation* » — les trois noms techniques, **sans
lien**.

## Défauts et bizarreries de l'original

1. **Le slug de production s'appelle `test-capytale-2-copie-copie`.** Vérifié en URL publique,
   en canonique et au catalogue.
2. **Six sections sur sept sont du HTML statique.** Les 4 KPI d'en-tête, les 2 graphiques
   « Évolution temporelle », la carte, les 2 blocs de classement et le bloc d'intensité ne lisent
   aucune donnée. Une page publiée sur un portail open data, alimentée par des jeux mis à jour
   **quotidiennement**, dont 90 % des chiffres sont recopiés à la main.
3. **Et ils sont déjà faux.** Trois écarts mesurés, chacun contrôlé à l'API :
   « mai 2026 : 400 367 visites » (réel **842 525**) ; « Orléans-Tours 116 059 » (réel **140 247**
   sur la même fenêtre) ; « 31 académies actives » (réel **32**). Le badge « mise à jour mai 2026 »
   prévient, mais il est lui-même en dur : il ne bougera jamais.
4. **Deux graphiques de la même chose, côte à côte, sur deux périodes différentes.**
   Le graphique ODS vivant couvre **oct. 2023 → sept. 2026** ; le graphique statique juste en
   dessous s'intitule « **juin 2023 à mai 2026** ». Ils ne se superposent pas et rien ne l'explique.
5. **Le filtre académie ne pilote que 3 KPI et 1 graphique.** Sélectionner CORSE laisse le reste de
   la page en vue nationale — y compris le classement et la carte, qui sont précisément ce qu'on
   veut voir se recentrer. Le sous-titre promet pourtant « Les indicateurs et le graphique
   ci-dessous se recalculent selon l'académie sélectionnée. » (« ci-dessous » = les deux blocs
   suivants, pas la page).
6. **Les infobulles de la carte sont neutralisées par CSS**, alors que les 18 valeurs sont écrites
   dans le HTML. La carte est donc **entièrement muette** : ni chiffre, ni échelle lisible.
7. **La légende de la carte décrit un codage qui n'existe pas** : un dégradé « Faible → Élevé »
   pour des pastilles toutes de la même couleur, dont seule la taille varie. L'aire des cercles
   n'est d'ailleurs pas proportionnelle (56 px pour 116 059, 30 px pour 18 229 : rapport de
   diamètres 1,87 pour un rapport de valeurs 6,4).
8. **Le fond de carte est un GIF** (`cartedefrance.gif`) posé en pourcentages, avec 18 pastilles
   positionnées à la main au centième de pourcent. Aucune projection, aucune géométrie — le jeu
   contient pourtant un `geo_shape` par académie.
9. **La Réunion est un `<div>` en `border-radius` posé sur du blanc**, hors du cadre de la carte.
   Guadeloupe, Martinique, Guyane, Mayotte, Polynésie et AEFE n'existent pas du tout.
10. **14 académies sur 32 sont absentes de la carte**, sans critère lisible : Lyon y est,
    Reims non, alors que Reims fait 60 % de visites de plus.
11. **Un KPI mal nommé** : « PÉRIODES OBSERVÉES 1 128 / enregistrements disponibles » compte des
    **lignes**. Il y a 36 périodes. Le libellé et le sous-titre se contredisent dans la même carte.
12. **Trois totaux différents cohabitent** sans qu'on puisse les rapprocher : 14,1 M (statique),
    11 393 906 (somme du jeu académies), 18 621 144 (somme du jeu de visites du site). Le premier
    n'est ni l'un ni l'autre.
13. **Le nom du jeu ment** : `…-douzederniersmois` pour 36 mois. La carte « Lecture locale » répète
    l'erreur : « PÉRIODE : 12 derniers mois disponibles ».
14. **Les libellés d'académie du menu sont en capitales sans accents** (AIX-MARSEILLE, BESANCON,
    CRETEIL) alors que tout le reste de la page écrit « Aix-Marseille », « Besançon », « Créteil ».
    Aucun compteur non plus.
15. **Deux graphiques sans axe des ordonnées** (« Élèves vs enseignants » et « Intensité d'usage »),
    et un troisième dont l'axe est écrit en dur en cinq `<span>`.
16. **L'échelle de « Intensité d'usage » ne part pas de zéro** : l'écart visuel est plus du double
    de l'écart réel.
17. **Les barres d'été « signalées en gris »** sont en réalité `#b8c1ec` (bleu pâle) et hautes de
    1 à 2 % : invisibles, et sans légende.
18. **Aucun accès à la donnée** : les trois liens d'en-tête mènent aux pages d'actif, le pied de
    page ne donne que des identifiants techniques, sans lien ni licence.
19. **Aucune synchronisation d'URL** : l'académie choisie n'est ni partageable ni « bookmarkable ».
20. **Deux `<h1>` dans le document** (celui du portail et le logo « Capytale »).

## Transposition vers `dsfr-data`

### Architecture retenue et pourquoi — et le piège du `select` qui se retourne

1 128 lignes, mais **`geo_shape` porte le polygone de l'académie répété 36 fois**, et `value` /
`data` sont les blobs JSON bruts de Matomo. Trois mesures en ligne de commande, trois fois chacune :

| Requête | Poids (gzip) | Durée |
|---|---:|---:|
| `/exports/json?limit=-1` **complet** | **31 Mo** (129 Mo brut) | **6,0 / 6,2 / 6,6 s** |
| `/exports/json?limit=-1&select=date,academie,data_nb_visits,data_nb_actions,data_sum_visit_length` | **23 Ko** | **0,51 / 0,53 / 0,66 s** |
| `/records?group_by=academie&select=sum(...)` | **645 o** | **0,13 / 0,09 / 0,09 s** |

Le `select` est ici **1 350 fois plus léger et 11 fois plus rapide**. Ce n'est pas une exception au
piège du `CLAUDE.md` (« `select` sur un champ texte long : plus lent que l'export complet »), c'est
**sa première branche** : *« soit on écarte les textes longs par `select`, soit on ne met PAS de
`select` du tout ; jamais un `select` qui les inclut. »* Ici on les écarte, et le gain est
spectaculaire parce que les colonnes exclues pèsent 99,98 % du jeu.

**Décision : une seule `dsfr-data-source` en mode adaptateur ODS avec `select` sur les cinq
colonnes utiles, tout le reste côté client** — 23 Ko, 0,5 s, et ensuite plus aucun aller-retour.
Il faut **`max-records="2000"`** explicitement : le plafond par défaut de l'adaptateur ODS est
1 000 et tronquerait 128 lignes **en silence**.

Pas de `server-facets`, pas de `server-side` : à 1 128 lignes en mémoire, le mode client donne les
compteurs et la cascade gratuitement, et permet de recalculer la page **entière** au changement
d'académie — ce que l'original ne fait pas.

### Correspondance directive → composant

| Bloc / directive AngularJS ODS | Composant + attributs `dsfr-data` |
|---|---|
| `ods-dataset-context ctxfiltreaca` + `ctxusagesaca` imbriqué | **une seule** `<dsfr-data-source id="cap" api-type="opendatasoft" base-url="https://data.education.gouv.fr" dataset-id="fr-en-capytale-usages-academiques-douzederniersmois" select="date, academie, data_nb_visits, data_nb_actions" max-records="2000">` |
| `{{ ctxusagesaca.parameters = {…}; '' }}` (interpolation à effet de bord) | `<dsfr-data-context id="ctx" sources="cap" url-sync>` — et l'URL devient partageable |
| `<ods-select multiple="false">` académie, alphanum | `<dsfr-data-facets id="f" source="cap" context="ctx" fields="academie" display="academie:select" sort="alpha:asc" labels="academie:Académie">` — `select` est **exclusif d'office**, pas besoin de `disjunctive` |
| valeurs en CAPITALES sans accents | `<dsfr-data-normalize replace-fields="academie:ORLEANS-TOURS:Orléans-Tours \| academie:CRETEIL:Créteil \| …">` (comparaison stricte, séparateur `\|`, aucun `:` dans les valeurs → grammaire valide) |
| bouton **Réinitialiser** | `<dsfr-data-context-tags context="ctx" clear-all>` |
| `ods-aggregation SUM data_nb_visits` | `<dsfr-data-kpi source="f" value="data_nb_visits:sum" format="nombre" label="visites">` |
| KPI « 14,1 M » écrit en dur | `<dsfr-data-kpi source="f" value="data_nb_visits:sum" format="compact" label="visites">` → « 11,4 M ». `format="compact"` est l'attribut, **pas** un post-traitement (AM-031) |
| KPI « PÉRIODES OBSERVÉES » (count de lignes) | `<dsfr-data-query id="mois" source="f" group-by="date">` + `<dsfr-data-kpi source="mois" value="count" label="mois observés">` → **36**, le chiffre juste. (Pas d'agrégat `distinct` : on groupe et on compte les lignes du groupe — piège connu du dépôt) |
| KPI « ACADÉMIES ACTIVES 31 » en dur | même motif, `group-by="academie"` → **32** |
| KPI « PIC MENSUEL » en dur | `<dsfr-data-query id="parmois" source="f" group-by="date" aggregate="data_nb_visits:sum" order-by="data_nb_visits__sum:desc" limit="1">` + KPI `value="data_nb_visits__sum:max"` et `lines` pour le mois |
| KPI « PART ÉLÈVES 91 % » | vient du 3ᵉ jeu (72 lignes) : seconde source + `dsfr-data-query group-by="data_label"` |
| les 4 KPI côte à côte | `<dsfr-data-kpi-group>` + `col="3"`. **Ne pas poser `display:block`** dessus : c'est un `grid` (PG-011) |
| `<ods-chart>` colonnes mensuelles, `timescale="month"` | `<dsfr-data-query id="parmois" source="f" group-by="date" aggregate="data_nb_visits:sum" order-by="date:asc">` + `<dsfr-data-chart type="bar" label-field="date" value-field="data_nb_visits__sum" name="Usages mensuels">`. **`group-by="date"` sur le champ brut suffit ici** : le champ est déjà à la granularité mois (36 valeurs distinctes vérifiées à l'API) — le piège PG-014 (`group-by` avec `year(…)` refusé par l'adaptateur) ne se pose pas |
| `color="#000091"` | palette DSFR par défaut ; `selected-palette` si besoin |
| graphique statique « Visites mensuelles » (36 barres en dur) | **le même graphique que ci-dessus**, mais sur le jeu `fr-en-capytale-nombre-de-visite` (36 lignes) : `<dsfr-data-source id="vis" … dataset-id="fr-en-capytale-nombre-de-visite" select="mois_, nombre_de_visite_">` + chart. **Un aller-retour de 36 lignes remplace 36 `<div>` écrits à la main** |
| bandes d'été « en gris » | `highlight-index='[…]'` met en avant des barres, mais l'index est positionnel : fragile sur une série glissante. Alternative honnête : `reference-lines` (lignes verticales aux rentrées) — cf. § Limites |
| graphique statique empilé « Élèves vs enseignants » (26 empilements) | `<dsfr-data-source id="prof" … dataset-id="fr-en-capytale-repartition-des-visites-sur-dataeducation">` + `<dsfr-data-chart type="bar" stacked series-field="data_label" label-field="key" value-field="data_nb_visits">` — **`series-field` est fait pour le format long/tidy**, qui est exactement celui de ce jeu (36 mois × 2 profils) |
| **la « carte » GIF + 18 pastilles CSS** | `<dsfr-data-chart id="c-aca" source="paraca" type="map-aca" code-field="academie" value-field="data_nb_visits__sum" name="Visites">` — DSFR Chart 2.1 fournit le découpage **`aca`**, et attend des **noms d'académie en majuscules**, ce que la donnée contient déjà. Une balise remplace le GIF, les 18 pastilles, les coordonnées en pourcentages et le `<div>` de La Réunion. Voir § Limites pour ce qu'il faut vérifier |
| légende « Faible → Élevé » qui n'encode rien | `map-chart` pose sa propre légende, cohérente avec la palette |
| infobulles désactivées par CSS | natives dans `map-chart` (+ `unit-tooltip="visites"`) |
| « Top académies — visites cumulées » (10 lignes en dur) | `<dsfr-data-podium source="paraca" label-field="academie" value-field="data_nb_visits__sum" max-items="10" value-unit="visites">` — **le composant existe** : rang, barre proportionnelle, couleur. Une balise pour dix `<div>` |
| « Classement détaillé » (tableau 15 lignes en dur) | `<dsfr-data-list source="paraca" columns="academie, data_nb_visits__sum, actions_par_visite" sort pagination="15">` — attributs **anglais** (`colonnes`/`tri` sont dépréciés) |
| colonne « Act./visite » (ratio) | `<dsfr-data-normalize compute="actions_par_visite = data_nb_actions__sum / data_nb_visits__sum" round="actions_par_visite:1">` — `compute` fait l'arithmétique, `round` la décimale. Le point décimal reste un point : `round` en amont d'un tableau accessible est le motif du dépôt (AM-033) |
| pastilles de seuil vert/bleu/orange | `threshold-green` / `threshold-orange` existent sur `dsfr-data-kpi`, **pas** sur une cellule de `dsfr-data-list`. Voir § Limites |
| « Intensité d'usage » (19 colonnes en dur, échelle tronquée) | `<dsfr-data-chart type="bar" horizontal source="paraca" label-field="academie" value-field="actions_par_visite" y-min="0">` — **`y-min="0"` corrige l'échelle tronquée de l'original** |
| pied de page « Données : … » sans lien | `databox-source="DNE — Académie de Paris, Licence Ouverte 2.0"` + `databox-download` sur chaque graphique |
| — (rien dans l'original) | `<dsfr-data-a11y for="…" table download>` sous chaque graphique |

### Esquisse de code

```html
<!-- ====== Source unique : select sur 4 colonnes = 23 Ko / 0,5 s
     (l'export complet fait 31 Mo et 6 s à cause de geo_shape + 2 blobs Matomo) ====== -->
<dsfr-data-source id="cap-raw" api-type="opendatasoft"
  base-url="https://data.education.gouv.fr"
  dataset-id="fr-en-capytale-usages-academiques-douzederniersmois"
  select="date, academie, data_nb_visits, data_nb_actions"
  max-records="2000"></dsfr-data-source>

<dsfr-data-normalize id="cap" source="cap-raw"
  replace-fields="academie:ORLEANS-TOURS:Orléans-Tours | academie:CRETEIL:Créteil | academie:BESANCON:Besançon | academie:LA REUNION:La Réunion | academie:NANCY-METZ:Nancy-Metz | academie:AIX-MARSEILLE:Aix-Marseille | academie:CLERMONT-FERRAND:Clermont-Ferrand | academie:POLYNESIE:Polynésie | academie:NORMANDIE:Normandie">
</dsfr-data-normalize>

<dsfr-data-context id="ctx" sources="cap-raw" url-sync></dsfr-data-context>

<!-- ====== Filtre académie : un select, exclusif d'office ====== -->
<dsfr-data-facets id="f" source="cap" context="ctx" fields="academie"
  labels="academie:Académie" display="academie:select" sort="alpha:asc"></dsfr-data-facets>
<dsfr-data-context-tags context="ctx" clear-all></dsfr-data-context-tags>

<!-- ====== Agrégats : tous branchés sur « f », donc tous recalculés au filtrage ====== -->
<dsfr-data-query id="paraca-brut" source="f" group-by="academie"
  aggregate="data_nb_visits:sum, data_nb_actions:sum"
  order-by="data_nb_visits__sum:desc"></dsfr-data-query>
<dsfr-data-normalize id="paraca" source="paraca-brut"
  compute="actions_par_visite = data_nb_actions__sum / data_nb_visits__sum"
  round="actions_par_visite:1"></dsfr-data-normalize>

<dsfr-data-query id="parmois" source="f" group-by="date"
  aggregate="data_nb_visits:sum" order-by="date:asc"></dsfr-data-query>

<div class="fr-container fr-mb-8w">

  <!-- ====== KPI : les quatre chiffres, calculés ====== -->
  <dsfr-data-kpi-group class="fr-mb-4w">
    <dsfr-data-kpi source="f" value="data_nb_visits:sum" format="compact"
      heading="Sélection courante" label="visites académiques" col="3"></dsfr-data-kpi>
    <dsfr-data-kpi source="parmois" value="data_nb_visits__sum:max" format="compact"
      heading="Pic mensuel" label="visites sur un mois" col="3"></dsfr-data-kpi>
    <dsfr-data-kpi source="paraca" value="count" format="nombre"
      heading="Couverture" label="académies actives" col="3"></dsfr-data-kpi>
    <dsfr-data-kpi source="parmois" value="count" format="nombre"
      heading="Profondeur" label="mois observés" col="3"></dsfr-data-kpi>
  </dsfr-data-kpi-group>

  <!-- ====== Série mensuelle ====== -->
  <h2 class="fr-h4">Évolution mensuelle</h2>
  <dsfr-data-chart id="g-mois" source="parmois" type="bar"
    label-field="date" value-field="data_nb_visits__sum" name="Usages mensuels"
    databox databox-title="Usages mensuels Capytale"
    databox-source="DNE — fr-en-capytale-usages-academiques-douzederniersmois"
    databox-download databox-screenshot></dsfr-data-chart>
  <dsfr-data-a11y for="g-mois" source="parmois" table download></dsfr-data-a11y>

  <!-- ====== Carte académique : une balise pour le GIF + 18 pastilles ====== -->
  <h2 class="fr-h4">Usages par académie</h2>
  <dsfr-data-chart id="c-aca" source="paraca" type="map-aca"
    code-field="academie" value-field="data_nb_visits__sum" name="Visites"
    unit-tooltip="visites" selected-palette="sequentialAscending"
    databox databox-title="Visites par académie" databox-download></dsfr-data-chart>
  <dsfr-data-a11y for="c-aca" source="paraca" table download></dsfr-data-a11y>

  <!-- ====== Classement ====== -->
  <div class="fr-grid-row fr-grid-row--gutters">
    <div class="fr-col-12 fr-col-md-6">
      <h3 class="fr-h6">Top académies</h3>
      <dsfr-data-podium source="paraca" label-field="academie"
        value-field="data_nb_visits__sum" value-unit="visites" max-items="10"></dsfr-data-podium>
    </div>
    <div class="fr-col-12 fr-col-md-6">
      <h3 class="fr-h6">Classement détaillé</h3>
      <dsfr-data-list source="paraca"
        columns="academie, data_nb_visits__sum, actions_par_visite"
        sort pagination="15"></dsfr-data-list>
    </div>
  </div>

  <!-- ====== Intensité, échelle non tronquée ====== -->
  <h2 class="fr-h4">Actions par visite</h2>
  <dsfr-data-chart id="g-int" source="paraca" type="bar" horizontal y-min="0"
    label-field="academie" value-field="actions_par_visite" name="Actions par visite"
    databox databox-download></dsfr-data-chart>
  <dsfr-data-a11y for="g-int" source="paraca" table download></dsfr-data-a11y>
</div>

<!-- ====== Les deux jeux que l'original cite sans les interroger ====== -->
<dsfr-data-source id="vis" api-type="opendatasoft" base-url="https://data.education.gouv.fr"
  dataset-id="fr-en-capytale-nombre-de-visite" select="mois_, nombre_de_visite_"></dsfr-data-source>
<dsfr-data-chart id="g-site" source="vis" type="bar" label-field="mois_"
  value-field="nombre_de_visite_" name="Visites du site"></dsfr-data-chart>

<dsfr-data-source id="prof" api-type="opendatasoft" base-url="https://data.education.gouv.fr"
  dataset-id="fr-en-capytale-repartition-des-visites-sur-dataeducation"
  select="key, data_label, data_nb_visits"></dsfr-data-source>
<dsfr-data-chart id="g-prof" source="prof" type="bar" stacked
  series-field="data_label" label-field="key" value-field="data_nb_visits"></dsfr-data-chart>
```

> **Le fait marquant de la transposition** : la page originale compte plus de 3 000 lignes de HTML
> et 24 Ko de CSS pour 3 directives vivantes. L'esquisse ci-dessus tient en ~60 balises et
> **tout y est calculé** — y compris la carte, le podium et le classement, que l'original a
> recopiés à la main. La difficulté n'est pas de reproduire, c'est de décider **quoi ne pas
> reproduire**.

## Limites et points durs identifiés

1. **`type="map-aca"` accepte-t-il les 32 valeurs du jeu ?**
   *Obstacle* : la référence dit « noms d'académie majuscules » et donne `{"PARIS": 95, "LYON": 78}`.
   Le jeu contient **AEFE** (447 visites, 13 mois) et **POLYNESIE**, qui ne sont pas des académies
   métropolitaines du découpage DSFR Chart, et **NORMANDIE** / **NANCY-METZ**, dont l'orthographe
   exacte attendue est à confirmer.
   *Voie native de diagnostic* : `dsfr-data-chart.getSkippedCount()` retourne « le nombre de lignes
   ignorées par la dernière carte rendue : code géographique absent, vide ou invalide ». C'est
   exactement l'outil pour le savoir.
   *Statut* : **non vérifié au navigateur.** À faire avant de conclure quoi que ce soit — et si des
   lignes tombent, le juger contre l'original, qui en oublie 14 sur 32 sans le dire.
2. **Mettre en évidence les mois d'été dans une série glissante.**
   *Obstacle* : `highlight-index='[1,2,13,14,…]'` est **positionnel** ; sur une fenêtre de 36 mois
   qui glisse, les index changent tous les mois.
   *Voies natives essayées* : `reference-lines` (lignes verticales datées, ex.
   `[{"axis":"x","value":"2025-09","label":"Rentrée 2025"}]`) — durable et plus informatif ;
   ou un `series-field` sur une colonne calculée « période scolaire / été » via `compute`
   (concaténation et arithmétique seulement — **pas de conditionnelle**, donc pas faisable ainsi).
   *Verdict* : **`reference-lines` est le bon équivalent, pas `highlight-index`.** L'intention de
   l'original (« les creux sont saisonniers ») est mieux servie par un repère de rentrée que par
   six barres grises invisibles.
3. **Colorer une cellule de tableau selon un seuil.**
   *Obstacle* : `threshold-green` / `threshold-orange` existent sur `dsfr-data-kpi` mais pas sur
   `dsfr-data-list`, dont la référence ne propose aucun formatage conditionnel par cellule.
   *Voie native* : aucune. Il n'y a **pas de conditionnelle dans un template** (AM-039), et
   `dsfr-data-list` n'a pas de template.
   *Contournement* : passer par `dsfr-data-display` (qui, lui, a un `<template>`) et interpoler la
   valeur dans un attribut — `<span class="odv-pill" data-v="{{actions_par_visite}}">` — puis
   sélectionner en CSS par plage. **Sur quoi ce contournement cesse de marcher** : CSS ne compare
   pas des nombres ; il faudrait une classe pré-calculée, or `compute` ne fait pas de condition.
   *Verdict* : **manque réel, à remonter** — soit une classe conditionnelle dans le template de
   `dsfr-data-display`, soit `threshold-*` par colonne sur `dsfr-data-list`. C'est le seul point de
   cette page où aucune voie native n'aboutit.
4. **Les trois liens « Nombre de visites / Répartition / Usages académiques ».**
   *Constat* : ce sont des liens vers des pages d'actif du portail — du **chrome de plateforme**.
   Un site institutionnel les remplace par un lien vers le jeu et une mention de licence.
   **Ne pas les compter comme un manque de `dsfr-data`.**
5. **Ce que la transposition gagne** : chaque chiffre est recalculé (donc juste, et juste
   demain) ; le filtre académie pilote la page entière ; la carte est une vraie carte académique
   avec légende et infobulles ; le classement et le podium sont des composants ; les échelles
   partent de zéro ; l'URL est partageable ; chaque graphique a un tableau accessible et un export.
   **Quatorze des vingt défauts relevés tombent d'eux-mêmes.** Ce qu'elle perd : la maîtrise
   pixel du GIF et le cadrage éditorial des 18 académies choisies.

## Données à reproduire fidèlement

- [ ] **32** académies (pas 31), dont AEFE (447 visites, 13 mois seulement) et Polynésie.
- [ ] **36** mois observés, d'octobre 2023 à septembre 2026 — **pas** « 12 derniers mois »,
      **pas** « juin 2023 → mai 2026 ».
- [ ] Total usages académiques : **11 393 906**. Total visites du site : **18 621 144**.
      Les deux sont différents et il faut le dire.
- [ ] Pic mensuel **1 136 313 (janvier 2026)**, second **1 136 007 (novembre 2025)**, ×2,29 vs
      janvier 2024 (496 226).
- [ ] Part élèves **90,9 %** / enseignants **9,1 %** (libellés du jeu : `Elève`, `Enseignant`).
- [ ] Classement (jeu complet) : Orléans-Tours 1 015 321 · Versailles 981 482 · Normandie 908 604 ·
      Rennes 846 423 · Paris 756 274 · Toulouse 719 043 · Nice 693 274 · Nantes 677 231 ·
      Créteil 637 493 · Aix-Marseille 606 767 … AEFE 447.
- [ ] Actions/visite sur l'ensemble : de **AEFE 7,96** et **Martinique 7,42** à **Dijon 6,07**.
      *(Les valeurs de l'original — Guadeloupe 9,0, Rennes 8,4 — portent sur mars-mai 2026 et sont,
      elles, exactes sur cette fenêtre.)*
- [ ] Corse = **49 515** visites, 36 périodes (le contrôle du filtre).
- [ ] **Ne pas reproduire** : les 400 367 de mai 2026, les 116 059 d'Orléans-Tours, les
      « 31 académies », la légende de dégradé sans dégradé, les infobulles désactivées, l'échelle
      tronquée de l'intensité, ni le libellé « 12 derniers mois ».
