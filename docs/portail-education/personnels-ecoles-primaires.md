# Les personnels dans les écoles primaires et maternelles

> **Page sœur de `personnels-colleges.md`.** Le gabarit, le domaine `.com`, le chrome, les
> filtres, les kebabs, le pied de page et la méthode de récupération de la configuration y
> sont décrits **en entier**. Cette fiche ne traite que ce qui diffère — et ici, ce qui diffère
> est considérable : **trois des quatre blocs de données de la page sont en erreur, le
> quatrième affiche un chiffre faux, et les trois filtres ne filtrent rien.**
> Lire `personnels-colleges.md` d'abord, en particulier son § « ⚠️ Piège de méthode neuf ».

- **URL** : https://dataeducation.opendatasoft.com/p/personnels-enseignants-dans-ecoles-primaires-et-maternelles-en-france/
- **Catalogue** : id **9**, thématique **Éducation**, sous-thématique **Ecoles**. Vignette
  `https://dataeducation.opendatasoft.com/assets/theme_image/dataviz-ecoles.gif` — hébergée sur
  le domaine du prestataire.
- **Page Studio** `uid: sp_w53z2w`, `updated_at` 2026-01-29T23:20:11Z (la première des trois).
- **Deux jeux déclarés, un seul consommé** :
  - `fr-en-indicateurs_personnels_etablissements1d` (`dataProviderUid: 17sde4ir28h`) —
    « Les personnels dans les établissements du premier degré », **94 584 lignes**,
    **21 champs**, `visibility: domain`, Licence Ouverte v2.0, DEPP, donnée modifiée le
    **24/06/2026**, **deux rentrées : 2024 (47 507) et 2025 (47 077)**. C'est le jeu des
    quatre blocs.
  - `fr-en-indicateurs_personnels_etablissements2d` (`dataProviderUid: 85km58y8kh`) — le jeu du
    **second degré**, celui des pages collèges et lycées. **Il n'alimente aucun bloc** : il ne
    sert qu'aux trois filtres. Voir le défaut n° 4.
- **Relevé visuel** : 2026-09-10, Chrome (extension), fenêtre 1568 × 751 CSS px.
- **Configuration archivée** :
  `docs/portail-education/_sources/personnels-enseignants-dans-ecoles-primaires-et-maternelles-en-france.studio.json`.

## L'état de la page à l'écran, le 2026-09-10

C'est le constat principal de cette fiche, et il tient en une capture :

| Bloc | Ce qui s'affiche |
|---|---|
| KPI 1 — `sum(etp_d_enseignants_hommes_et_femmes)` | **631 578** « Equivalents Temps Plein enseignants dans les écoles primaires et maternelles » — **la somme des deux rentrées scolaires** (316 886,5 en 2024 + 314 691,5 en 2025) |
| KPI 2 — `sum(etp_de_femmes_enseignantes)/sum(etp_d_enseignants_hommes_et_femmes)*100` | **« Erreur — Request failed with status code 400 »** (encadré rouge) |
| Graphique « Répartition par âge » | **« Erreur — Request failed with status code 400 »** |
| Graphique « Répartition par ancienneté dans l'établissement » | **« Erreur — Request failed with status code 400 »** |
| Filtres Libellé région / Libellé département / Secteur | fonctionnent visuellement, **n'ont aucun effet sur le KPI** (vérifié : `Corse` → 631 578, inchangé) |

**Un bloc sur quatre affiche quelque chose, et ce quelque chose est faux.** Sur une page dont
le texte d'introduction annonce « présente **pour la première fois** les chiffres relatifs au
nombre d'équivalents temps plein dans les écoles primaires et maternelles ».

## Pourquoi les 400 : le secret statistique typé en texte

`fr-en-indicateurs_personnels_etablissements1d` déclare **sept de ses neuf colonnes de mesure
en `text`**, pas en `double` :

| Champ | Type au schéma |
|---|---|
| `etp_d_enseignants_hommes_et_femmes` | **double** |
| `etp_de_femmes_enseignantes` | **text** |
| `etp_d_enseignants_de_moins_de_35_ans` | **text** |
| `etp_d_enseignants_de_35_a_moins_de_50_ans` | **text** |
| `etp_d_enseignants_de_50_ans_ou_plus` | **text** |
| `…anciennete…de_moins_de_2_ans` | **text** |
| `…anciennete…de_2_ans_a_moins_de_5_ans` | **text** |
| `…anciennete…de_5_ans_a_moins_de_8_ans` | **double** |
| `…anciennete…de_8_ans_ou_plus` | **text** |

La cause est dans la donnée elle-même : **40 476 lignes sur 94 584 (42,8 %) portent la chaîne
`"ss"`** — secret statistique. La description du jeu jumeau l'explique : « Si l'école comprend
moins de 5 ETP, les valeurs sur les caractéristiques des personnels sont remplies en ss
(secret statistique) ». Échantillon relevé à l'API :

```json
{"etp_de_femmes_enseignantes": "3.3", "etp_d_enseignants_de_moins_de_35_ans": "1.3",
 "etp_d_enseignants_hommes_et_femmes": 5.3, "nom_de_l_etablissement": "ECOLE ELEMENTAIRE DU TRAIT D UNION ST GEORGES D OLERON"}
{"etp_de_femmes_enseignantes": "ss", "etp_d_enseignants_de_moins_de_35_ans": "ss",
 "etp_d_enseignants_hommes_et_femmes": 3.0, "nom_de_l_etablissement": "ECOLE MATERNELLE DE CHARRON"}
```

Un `sum()` sur une colonne `text` est refusé par l'API — reproduit en ligne de commande :

```
GET …/records?select=sum(etp_de_femmes_enseignantes)/sum(etp_d_enseignants_hommes_et_femmes)*100
→ 400 {"error_code":"ODSQLError",
       "message":"ODSQL query is malformed: StatAggregation only supports numeric or date expression."}
```

Le seul champ `double` du groupe âge/ancienneté est
`…anciennete…de_5_ans_a_moins_de_8_ans` (12,3 % à l'échelle du jeu) : **une seule des sept
séries des deux graphiques passerait**, et comme ODS Studio compose les trois (ou quatre)
séries **dans un seul `select`**, la requête entière échoue et le graphique n'affiche rien.
C'est exactement ce que montre l'écran.

Le premier KPI, lui, s'affiche parce que `etp_d_enseignants_hommes_et_femmes` est le seul champ
de mesure typé `double` — et le seul de la page à ne pas être masqué par le secret
statistique.

### Le jeu correctif existe déjà, et n'est pas branché

`fr-en-indicateurs_personnels_etablissements1d-numerique` — titre : « Les personnels dans les
établissements du premier degré - **copie pour dataviz** » — même 94 584 lignes, **21 champs
tous typés `double`**, `modified` **2026-09-09** (la veille du relevé), servi par les deux
domaines, 200 en anonyme, `ACAO: *`. Les `"ss"` y sont des valeurs **nulles**.

Le correctif est donc en cours côté données, mais la page Studio pointe toujours (au
2026-09-10) sur `…1d`. **La reproduction `dsfr-data` se branche sur `…1d-numerique`.**

### Un piège que le jeu corrigé ne règle pas

Sur `…1d-numerique`, les sommes passent — mais **les ratios sont faux si l'on garde le
dénominateur complet**, parce que le numérateur est nul sur les 40 476 lignes masquées alors
que `etp_d_enseignants_hommes_et_femmes` y est renseigné. Mesuré sur la rentrée 2024 :

| Calcul | Femmes | < 35 ans | 35-50 | > 50 | Somme des tranches |
|---|---:|---:|---:|---:|---:|
| dénominateur **complet** (47 507 écoles, 316 886,5 ETP) | 71,30 % | 16,26 % | 38,48 % | 27,33 % | **82,07 %** |
| dénominateur **restreint aux écoles renseignées** (27 151 écoles, 259 980,1 ETP) | **86,91 %** | **19,82 %** | **46,91 %** | **33,31 %** | **100,04 %** |

Le premier calcul — celui que reproduirait un portage littéral de la formule Studio — sous-
estime tout d'environ 18 %, et ses tranches ne somment pas à 100. **La somme qui ne fait pas
100 est le témoin à surveiller.** Le périmètre correct est
`where="etp_de_femmes_enseignantes is not null"`, et il doit être **affiché** : 20 356 écoles
(56 906 ETP, 18 % du total) sont sous secret statistique en 2024.

## Champs du jeu 1d (21)

| Champ | Type | Remarque |
|---|---|---|
| `annee_de_la_rentree_scolaire` | text | **2024** (47 507) · **2025** (47 077) |
| `secteur` | text | `Public` 85 255 · **`Privé sous contrat`** 9 329 — **libellés différents du jeu 2d** (`Public` / `Privé`) |
| `identifiant_de_l_etablissement`, `nom_de_l_etablissement` | text | 46 665 UAI distincts pour 47 507 lignes en 2024 (**842 doublons d'UAI**) |
| `refcode_region`, `code_region_insee`, `reflibelle_region` | text | **19 valeurs, aucune nulle**. Dont « **Collectivités et territoires doutre-mer hors régions académiques** » (apostrophe manquante) — le jeu 2d écrit « TOM et Collectivités territoriales » pour le même périmètre |
| `code_academie`, `libelle_academie` | text | 31 valeurs (30 en 2d) |
| `code_departement`, `libelle_departement` | text | **102 valeurs** (101 en 2d) |
| `etp_d_enseignants_hommes_et_femmes` | **double** | le seul champ de mesure exploitable en l'état |
| `etp_de_femmes_enseignantes` | **text** | `"ss"` × 40 476 |
| `etp_d_enseignants_de_{moins_de_35_ans, 35_a_moins_de_50_ans, 50_ans_ou_plus}` | **text** | idem |
| `…anciennete…de_{moins_de_2_ans, 2_ans_a_moins_de_5_ans}` | **text** | idem |
| `…anciennete…de_5_ans_a_moins_de_8_ans` | **double** | seule exception |
| `…anciennete…de_8_ans_ou_plus` | **text** | idem |
| `geolocalisation` | geo_point_2d | **présent, jamais utilisé** |

Le jeu 1d **n'a pas** : `etp_total`, `etp_de_personnels_de_vie_scolaire`,
`nature_de_l_etablissement`, ni aucune colonne de statut/diplôme
(`agreges`, `certifies_peps`, `plp`, `non_titulaires`), ni les colonnes `proportion_*` /
`anciennete_*` pré-calculées du jeu 2d. **C'est ce qui explique la page amputée** : pas de
section « statut/diplôme », pas de cartes, deux KPI au lieu de sept.

**Facettes déclarées au back-office** (identiques sur `…1d` et `…1d-numerique`) :
`secteur` (2), `code_academie` (31), `libelle_academie` (31), `code_departement` (100 —
plafond), `libelle_departement` (100 — plafond), `reflibelle_region` (19),
`nom_de_l_etablissement` (100 — plafond), `annee_de_la_rentree_scolaire` (2).
`server-facets` est donc utilisable, **et il donnerait le sélecteur de rentrée que la page n'a
pas**.

## Objectif de la dataviz et informations véhiculées

- **Question** : « Combien d'enseignants, en ETP, dans les écoles primaires et maternelles, et
  quel est leur profil — sexe, âge, ancienneté ? »
- **Message porté**, tel que l'intro l'écrit : la même opération de transparence que pour les
  deux autres pages. Mais **la page ne le porte pas** : trois des quatre blocs qui devaient le
  dire renvoient une erreur, et le quatrième compte deux fois.
- **Ce qui n'est pas dans l'objet** (par rapport aux deux pages sœurs) :
  - **pas d'ETP total ni de vie scolaire** — le jeu 1d ne les a pas ;
  - **pas de statut ni de diplôme** — pas de section 2, pas de cartes ;
  - **aucune carte du tout**, alors que `geolocalisation` est dans le jeu ;
  - pas de sélecteur de rentrée, alors que le jeu en a deux et que c'est le seul des trois
    jeux à en avoir plus d'une ;
  - pas de donnée par école (« Retrouvez **bientôt** ces indicateurs par établissement sur
    l'application *Trouver un établissement* » — le « bientôt » est ici **en gras**, seul écart
    typographique avec les deux autres pages).

## Relevé visuel : ce qui diffère de la page collèges

Ordre des sections (`layouts.default`) : **texte → 2 images → filtres → titre 1 → 2 KPI →
titre 2 → 2 graphiques**. Il manque, par rapport aux deux pages sœurs, la section
« statut/diplôme » et les quatre cartes ; il ne reste que **deux** titres numérotés au lieu de
trois.

### 1. Bloc texte (`block_MCKRZDB5DAQ91`)

Même structure (deux `#` → deux `<h1>`), mêmes phrases au niveau près :

> # Les écoles primaires et maternelles en chiffres : effectifs en équivalents temps plein
> # et profils des personnels
>
> « Cette datavisualisation, réalisée par le ministère de l'Éducation nationale à partir des
> données mises à disposition par la DEPP, **présente pour la première fois les chiffres
> relatifs au nombre d'équivalents temps plein dans les écoles primaires et maternelles.**
> Elle décrit la répartition des personnels selon la mixité, l'ancienneté et l'âge dans une
> **démarche de transparence et d'ouverture des données publiques**. »
>
> « Grâce à cette visualisation interactive, chacun pourra explorer la composition des équipes
> au service des **écoliers** au sein de son territoire … »
>
> « Retrouvez **bientôt** ces indicateurs par établissement sur l'application
> [Trouver un établissement](https://dataeducation.opendatasoft.com/pages/accueil/) »

« le niveau de diplôme » a été retiré de la liste (cohérent : le jeu ne l'a pas) ; « élèves »
est devenu « écoliers ».

### 2. Deux images

`/assets/theme_image/gem0681501-cole-cycle-2-156590.jpg` et
`/assets/theme_image/salle-de-classe---enseignante-et-l-ves-las-5081-133808_0.jpg`, `alt=""`.

### 3. Section « filtres » — **inerte**

Trois `select`, `layout_single_selection`, `title` vide, libellés « Libellé région »,
« Libellé département », « Secteur ». **Les trois ciblent `dataProviderUid: 85km58y8kh`,
c'est-à-dire le jeu du SECOND degré**, alors que les quatre blocs de la page consomment
`17sde4ir28h` (le premier degré).

Conséquences vérifiées à l'écran :
- la liste « Libellé région » contient les **19 régions du jeu 2d**, dont
  « **TOM et Collectivités territoriales** » — un libellé qui **n'existe pas** dans le jeu 1d
  (qui écrit « Collectivités et territoires doutre-mer hors régions académiques ») ;
- la liste « Secteur » proposerait `Public` / `Privé` (valeurs 2d) là où le jeu 1d dit
  `Public` / `Privé sous contrat` ;
- **choisir `Corse` ne change rien** : le KPI reste à **631 578**, et les trois encadrés
  d'erreur restent des encadrés d'erreur. Testé, capture à l'appui.

Autrement dit : les trois filtres pilotent un contexte que rien n'écoute. La cascade
région → département fonctionne (elle interroge le jeu 2d), ce qui rend la panne d'autant
moins visible : l'interface *réagit*, mais la page ne bouge pas.

### 4. Titre « 1. Les personnels dans les écoles primaires et maternelles - Données clés »

Bloc `text` `# 1. …` → un `<h1>` supplémentaire (la page en compte **quatre** au total, plus
celui de la bulle de chat, et **aucun `<h2>`**).

### 5. Deux KPI (`section_MCKS5YV2MNWTX`)

| Bloc | Formule | `layout` | Pictogramme | Écran |
|---|---|---|---|---|
| `block_MCKS5YV2CN1XG` | `sum(etp_d_enseignants_hommes_et_femmes)`, 0 décimale | `layout_context_and_image` | `environment.png` | **631 578** — « Equivalents Temps Plein enseignants dans les écoles primaires et maternelles » |
| `block_MH295EC9GRDJ9` | `sum(etp_de_femmes_enseignantes)/sum(etp_d_enseignants_hommes_et_femmes)*100`, suffixe `%`, 1 décimale | `layout_context_and_image` | `parity.png` | **encadré rouge « Erreur / Request failed with status code 400 »** — pas de pictogramme, pas de libellé, juste l'erreur |

**Ni l'un ni l'autre ne porte de `conditions`** — c'est cohérent (le jeu 1d ne contient que des
écoles), et c'est la seule différence de fond du gabarit avec les pages collèges et lycées, où
la même condition est recopiée dix-huit fois.

**631 578 = 316 886,5 (2024) + 314 691,5 (2025).** Aucune restriction d'année nulle part dans
la configuration. Le chiffre affiché est la somme de deux photographies successives du même
corps enseignant — il ne correspond à rien.

### 6. Titre « 2. Le personnel enseignant - Répartition par âge et par ancienneté dans l'établissement »

Un `<h1>` de plus. (Sur les pages collèges et lycées, ce même bloc porte le n° **3**.)

### 7. Deux graphiques — tous deux en erreur

Configuration relevée (elle est bien là, complète) :

**a) « Répartition par âge »** — `comparison.bars`, `xField: annee_de_la_rentree_scolaire`,
`order {x, desc}`, `layout_xy_tt_gr`, `xLabel: "Année"`, `yLabel: "Tranche d'âge"`,
`displayFormat {compact_short, 1}` :

| Série | Légende | Couleur | Formule |
|---|---|---|---|
| `MH2CGPIVW1SE9` | Moins de 35 ans | **`@chart[11]`** | `sum(etp_d_enseignants_de_moins_de_35_ans)/sum(etp_d_enseignants_hommes_et_femmes)*100` |
| `MH2CGYRKJSO3L` | 35 - 50 ans | **`@chart[10]`** | `…de_35_a_moins_de_50_ans…` |
| `MH2CGZPY2JC7U` | Plus de 50 ans | **`@chart[12]`** | `…de_50_ans_ou_plus…` |

Les trois teintes diffèrent de celles des pages collèges/lycées (`@chart[10]`, `[9]`, `[8]`),
et l'ordre n'est pas monotone (11, 10, **12**) : la troisième série est plus foncée que les
deux autres mais prise dans une autre plage de la palette.

**b) « Répartition par ancienneté dans l'établissement »** — `comparison.columns`,
`order {x, asc}`, `xLabel: "Année"`, `yLabel: "Niveau d'ancienneté"` :

| Série | Légende | Couleur | Formule |
|---|---|---|---|
| `MH2CL9K5TP8NK` | **Moins de 2 ans** (un seul espace) | `@chart[5]` | `…de_moins_de_2_ans` |
| `MH2CLEXBKWPF3` | 2 à 5 ans | `@chart[4]` | `…de_2_ans_a_moins_de_5_ans` |
| `MH2CLFUMKHR90` | 5 à 8 ans | `@chart[3]` | `…de_5_ans_a_moins_de_8_ans` |
| `MH2CLGMZI20AF` | Plus de 8 ans | `@chart[2]` | `…de_8_ans_ou_plus` |

Le double espace « Moins  de 2 ans » des pages collèges et lycées est **absent ici** : la faute
a été introduite lors de la duplication vers le second degré, pas corrigée ici.

**Rendu réel** : deux encadrés rouges côte à côte, « Erreur / Request failed with status code
400 ». Ni titre de bloc, ni axe, ni légende, ni kebab.

### 8. Ce que les blocs auraient affiché

Reconstitué à l'API sur `…1d-numerique`, avec les deux lectures possibles du dénominateur :

**Rentrée 2024** (47 507 écoles, 316 886,5 ETP ; **20 356 écoles sous secret statistique**,
56 906,4 ETP) :

| Série | Dénominateur complet | **Dénominateur renseigné** (27 151 écoles) |
|---|---:|---:|
| Femmes parmi les ETP enseignants | 71,30 % | **86,91 %** |
| Moins de 35 ans | 16,26 % | **19,82 %** |
| 35 - 50 ans | 38,48 % | **46,91 %** |
| Plus de 50 ans | 27,33 % | **33,31 %** |
| Ancienneté < 2 ans | 22,86 % | **27,87 %** |
| 2 à 5 ans | 15,95 % | **19,44 %** |
| 5 à 8 ans | 12,57 % | **15,33 %** |
| ≥ 8 ans | 30,76 % | **37,49 %** |
| *(somme âge / somme ancienneté)* | *82,07 / 82,14* | ***100,04 / 100,13*** |

**Rentrée 2025** (47 077 écoles, 314 691,5 ETP ; 20 120 sous secret, 56 336,5 ETP ;
26 957 renseignées, 258 355,0 ETP) : femmes **87,02 %**, < 35 ans **19,38 %**, 35-50
**45,47 %**, > 50 **35,19 %** ; ancienneté **26,98 / 19,70 / 14,68 / 38,74 %**.

Secteur, rentrée 2024, périmètre renseigné : **Public** 24 047 écoles, 227 243,7 ETP,
**86,17 %** de femmes ; **Privé sous contrat** 3 104 écoles, 32 736,4 ETP, **92,07 %**.

Le vieillissement se lit d'une rentrée à l'autre : les plus de 50 ans passent de 33,3 % à
35,2 % en un an. **C'est le seul des trois jeux du triplet qui permet une lecture temporelle —
et c'est la seule des trois pages dont le graphique temporel ne s'affiche pas.**

## Défauts et bizarreries de l'original

Les défauts n° 1 (cinq `<h1>`, aucun `<h2>`), 2 (pas de `%`), 3 (axes intitulés à l'envers),
4 (graphique temporel), 9 (pas d'URL), 10 (« Libellé région »), 11 (facettes sans compteur),
14 (`geolocalisation` inutilisé), 17 (aucun tableau, aucune alternative), 18 (kebab) et 19
(le domaine `.com`) de `personnels-colleges.md` s'appliquent tels quels. S'y ajoutent, propres
à cette page :

1. **Trois des quatre blocs de données sont en erreur** depuis au moins la mise en ligne : le
   KPI de parité et les deux graphiques affichent « Request failed with status code 400 ». La
   page ne présente donc **rien** de ce que son introduction annonce (« la répartition des
   personnels selon la mixité, l'ancienneté et l'âge »).
2. **Le seul chiffre affiché est faux** : 631 578 est la somme de deux rentrées scolaires.
   Aucune restriction d'année n'est posée, et aucun sélecteur d'année n'existe alors que le
   jeu en a deux.
3. **La cause est un typage** : sept colonnes de mesure sur neuf sont en `text` parce que le
   secret statistique y écrit `"ss"` (40 476 lignes sur 94 584). Le back-office Studio a
   laissé composer des `sum()` dessus sans avertissement, et le front rend l'erreur brute de
   l'API — un message technique en anglais, non traduit, sans indication de recours.
4. **Les trois filtres pointent le mauvais jeu.** Ils ciblent le `dataProviderUid` du **second
   degré**, que la page déclare mais n'utilise dans aucun bloc. Ils proposent donc des valeurs
   qui n'existent pas dans les données affichées (« TOM et Collectivités territoriales »,
   secteur « Privé » au lieu de « Privé sous contrat ») et **n'ont aucun effet** : vérifié,
   `Corse` laisse le KPI à 631 578. La page déclare deux fournisseurs de données, en consomme
   un, et filtre l'autre.
5. **Le jeu correctif existe et n'est pas branché** :
   `fr-en-indicateurs_personnels_etablissements1d-numerique`, « copie pour dataviz »,
   21 champs tous numériques, mis à jour le **2026-09-09**. Un `datasetId` à changer.
6. **Même corrigé, le calcul serait faux d'environ 18 %** si l'on garde le dénominateur
   complet : les colonnes masquées deviennent nulles alors que le total ETP reste renseigné.
   Les tranches d'âge sommeraient à 82 % au lieu de 100. Le contrôle est gratuit et n'est pas
   fait.
7. **Trois pictogrammes de moins et deux sections de moins que les pages sœurs**, sans que rien
   n'explique pourquoi : un lecteur qui passe de la page collèges à la page écoles constate
   qu'il n'y a ni ETP total, ni vie scolaire, ni statut, ni carte — c'est une limite du jeu
   1d, jamais énoncée.
8. **Les couleurs des trois séries d'âge divergent** de celles des deux pages sœurs
   (`@chart[11]`, `[10]`, `[12]` contre `[10]`, `[9]`, `[8]`), pour un graphique qui dit la
   même chose. Trois pages, deux conventions chromatiques.
9. **842 doublons d'UAI** dans la rentrée 2024 (47 507 lignes pour 46 665 identifiants
   distincts) — sans conséquence sur les sommes d'ETP, mais bloquant pour une future vue
   « par établissement », celle-là même que la page promet.

## Transposition vers `dsfr-data`

**Le squelette est celui de `personnels-colleges.md` § « Transposition »** (mêmes composants,
mêmes grammaires, même `dsfr-data-unpivot` pour l'âge et l'ancienneté). Quatre décisions lui
sont propres.

### A. Changer de jeu, et le dire

`dataset-id="fr-en-indicateurs_personnels_etablissements1d-numerique"` sur
`base-url="https://data.education.gouv.fr"` (portail officiel, 200 en anonyme, `ACAO: *`
vérifié). Le jeu `…1d` typé texte n'est pas exploitable par un `sum()`, ni par ODS Studio ni
par `dsfr-data` : ce n'est pas une limite de bibliothèque, c'est une donnée mal typée, et le
producteur a déjà publié le correctif.

### B. Ne pas charger 94 584 lignes côté client

Chronométré trois fois sur le portail officiel :

| Requête | Poids gzip | Durée |
|---|---:|---:|
| `…1d-numerique/exports/json?limit=-1` (21 champs, 94 584 lignes) | **7,08 Mo** (96 Mo brut) | 7,35 · 5,91 · 0,32 s (le 0,32 est un cache) |
| `…2d/exports/json?limit=-1&select=<18 champs>` (10 697 lignes, pour comparaison) | 680 Ko | 0,85 s |

7 Mo transférés et 96 Mo à désérialiser : **le chargement client intégral est hors de
question**, contrairement à la page collèges. L'architecture native est l'**agrégation
serveur** : un `dsfr-data-source` en mode adaptateur ODS avec `select` (et `group-by` quand il
faut une ventilation), qui **écoute les facettes** — `getEffectiveWhere()` fusionne le `where`
statique et les surcouches dynamiques, documenté dans la référence de `dsfr-data-source`.
C'est la voie qui évite le piège maison « source générique (`url` + `params`), qui n'écoute
plus le contexte ».

Corollaire : `dsfr-data-unpivot` **n'est pas utilisable ici** de la façon décrite pour la page
collèges (déplier 94 584 lignes × 3 colonnes côté client). Il l'est en revanche **sur le
résultat de l'agrégat** — une seule ligne de sommes dépliée en trois lignes de tranches :

```html
<dsfr-data-source id="ag-age" api-type="opendatasoft" …
  where="annee_de_la_rentree_scolaire = '2024' and etp_de_femmes_enseignantes is not null"
  select="sum(etp_d_enseignants_de_moins_de_35_ans) as moins35,
          sum(etp_d_enseignants_de_35_a_moins_de_50_ans) as de35a50,
          sum(etp_d_enseignants_de_50_ans_ou_plus) as plus50"
  limit="1"></dsfr-data-source>
<dsfr-data-unpivot id="age" source="ag-age"
  value-cols="moins35:Moins de 35 ans, de35a50:35 à 50 ans, plus50:Plus de 50 ans"
  var-name="tranche" value-name="etp"></dsfr-data-unpivot>
<dsfr-data-chart source="age" type="bar" horizontal
  label-field="tranche" value-field="etp" name="ETP enseignants"></dsfr-data-chart>
```

Une requête, une ligne, trois barres, et la **tranche** sur l'axe des catégories — ce que la
page voulait montrer. **Non vérifié au navigateur** : la chaîne source-agrégée → unpivot →
chart n'a pas été exécutée ; en particulier je n'ai pas vérifié que `dsfr-data-unpivot` accepte
une source d'une seule ligne sans `id-cols`.

### C. Restreindre le dénominateur, et l'afficher

`where="… and etp_de_femmes_enseignantes is not null"` sur **la source déjà présente**
(PG-015), pas un composant de plus. Et une phrase sous les KPI :

> Les caractéristiques des personnels (sexe, âge, ancienneté) ne sont pas publiées pour les
> écoles de moins de 5 ETP : **20 356 écoles sur 47 507** (18 % des ETP) sont sous secret
> statistique en 2024. Les proportions ci-dessus portent sur les 27 151 écoles renseignées.

C'est le point où la transposition est *plus* honnête que l'original, et il ne coûte rien.

### D. Rebrancher les filtres, et en ajouter un

| Original | `dsfr-data` |
|---|---|
| 3 `select` pointant le **jeu 2d** | un seul `<dsfr-data-facets source="<la source 1d>" server-facets fields="reflibelle_region, libelle_departement, secteur, libelle_academie, annee_de_la_rentree_scolaire" …>`. Le bug de cible disparaît **par construction** : la facette lit la source qu'elle filtre, il n'y a pas de `dataProviderUid` à choisir. |
| valeurs `Public` / `Privé` (jeu 2d) | `Public` / `Privé sous contrat` — les vraies valeurs du jeu 1d, servies par `server-facets` |
| pas de sélecteur de rentrée | `annee_de_la_rentree_scolaire` est **facetté au back-office** : `display="annee_de_la_rentree_scolaire:radio-inline"` donne deux boutons « 2024 / 2025 ». C'est un champ **texte**, pas date : le piège BUG-005 (facette serveur sur un champ date, refine typé texte → 400 silencieux) **ne s'applique pas ici**. |
| — | `<dsfr-data-map>` sur `geolocalisation` : 46 665 écoles géolocalisées. `max-items` **très** au-dessus du défaut de 5 000, et `cluster` obligatoire (PG-013) ; ou chargement par `bbox`. **Non vérifié**, et sans doute à réserver à un second temps. |

### Correspondance des blocs

| Bloc original | `dsfr-data` |
|---|---|
| KPI `sum(etp_d_enseignants_hommes_et_femmes)`, **sans filtre d'année** | `<dsfr-data-kpi source="<facettes>" value="etp_d_enseignants_hommes_et_femmes:sum" format="nombre" decimals="0" heading="Rentrée 2024" label="ETP enseignants">` — avec `where="annee_de_la_rentree_scolaire = '2024'"` sur la source, ou la facette d'année en `default` |
| KPI `sum(a)/sum(b)*100`, en erreur | source d'agrégat + `value="pct_femmes:max"` + `format="pourcentage" decimals="1"` (`format="pourcentage"` attend une valeur déjà exprimée en pourcentage — vérifié dans `packages/shared/src/utils/formatters.ts`) ; `limit="1"` et lecture en `:max` (piège maison du `select` sans `group_by`) |
| `comparison.bars` 3 séries sur l'axe « Année », en erreur | agrégat + `dsfr-data-unpivot` + `type="bar" horizontal` sur la **tranche** (§ B) |
| `comparison.columns` 4 séries, en erreur | idem, `type="bar"` vertical sur l'**ancienneté** |
| axes « Année » / « Tranche d'âge » inversés, sans `%` | disparaissent avec la réécriture ; `unit-tooltip="%"` si l'on garde la lecture en pourcentage |
| — | `<dsfr-data-a11y for="…" source="…" table download>` sous chaque graphique |
| — | `<dsfr-data-chart type="map-reg" code-field="refcode_region">` : la ventilation régionale que les pages collèges et lycées ont et que celle-ci n'a pas, alors que le jeu porte les mêmes codes |

## Limites et points durs identifiés

Les points 1 (un ratio `sum(a)/sum(b)` n'est pas exprimable en `value="champ:fn"`), 4
(pictogrammes) et 8 (ce que la transposition gagne) de `personnels-colleges.md` valent ici à
l'identique. Points propres :

1. **Ce ne sont pas des limites de `dsfr-data`.** Les quatre pannes de cette page — 400 sur
   colonne texte, double comptage d'années, filtres sur le mauvais jeu, dénominateur non
   restreint — sont des erreurs de configuration et de typage. `dsfr-data` échouerait
   exactement de la même manière sur le jeu `…1d` (`sum()` sur du texte, c'est l'API qui
   refuse), **et échouerait plus bruyamment** : l'erreur remonte par `dsfr-data-error` avec
   `attemptedUrl`, l'URL réellement appelée. Le seul vrai enseignement pour la bibliothèque est
   le point 2.

2. **Rien n'empêche de composer un `sum()` sur une colonne `text`.**
   *Obstacle* : `value="etp_de_femmes_enseignantes:sum"` sur un champ texte partirait au
   serveur et reviendrait en 400, comme chez ODS Studio. Le schéma du jeu est pourtant connu du
   composant (l'adaptateur ODS lit `include_schema=true`).
   *Voie native essayée* : `dsfr-data-normalize numeric="champ"` convertit en amont — mais en
   mode agrégation **serveur**, la normalisation client arrive trop tard, la requête est déjà
   partie. Elle ne sauve que le mode « tout charger côté client », impraticable ici (§ B).
   *Contournement* : `select="sum(cast(...))"`… **non testé**, et l'ODSQL du portail n'expose
   pas de `cast` documenté ; le vrai contournement est de changer de jeu.
   *Demande d'évolution* : un avertissement de configuration (`reportConfigError`) quand une
   fonction d'agrégation numérique cible un champ que le schéma déclare `text`. C'est le seul
   point de cette fiche à remonter à `dsfr-data`.
   *Où ça cesse de marcher* : sur un provider qui n'expose pas de schéma (source générique
   `url=`), l'avertissement serait impossible.

3. **`dsfr-data-unpivot` sur un agrégat d'une seule ligne.**
   *Obstacle* : la fiche du composant décrit `id-cols` comme « colonnes conservées telles
   quelles » et donne tous ses exemples sur des tables larges. Le cas « une ligne de sommes,
   pas d'`id-cols` » n'est pas illustré.
   *Voie native* : `id-cols` est optionnel (défaut `""`), donc a priori inutile ici.
   **Non vérifié** — c'est le point le plus susceptible de mordre dans la transposition de
   cette page, parce que toute la réécriture des deux graphiques en dépend.
   *Repli* : `<dsfr-data-source data='[…]'>` inline reconstruit à la main, ou trois
   `dsfr-data-kpi` au lieu d'un graphique.

4. **Le secret statistique n'est pas un cas particulier de cette page.**
   42,8 % des lignes du premier degré sont masquées ; toute reproduction fidèle doit choisir
   entre trois lectures — dénominateur complet (faux), dénominateur restreint (juste sur un
   sous-champ), ou imputation (hors sujet pour un banc d'essai). `dsfr-data` n'a pas
   d'attribut « ignorer les lignes dont le numérateur est nul » : c'est un `where` sur la
   source, et c'est bien ainsi. Ce qui manque, c'est **l'affichage du périmètre**, et
   `dsfr-data-kpi lines` (lignes secondaires déclaratives, JSON, texte statique accepté) le
   fait sans script. **Non vérifié.**

5. **La carte que le jeu permet, et le volume.** 46 665 écoles géolocalisées : `max-items` par
   défaut à 5 000 tronque en silence avec un bandeau « zoomez » qui ne charge rien (PG-013).
   Avec `cluster`, la référence indique qu'un `max-items` de 20 000 est sans risque — 46 665
   reste au-dessus. La voie honnête est le chargement par `bbox`, ou une carte **choroplèthe**
   par département (`type="map"` sur un agrégat serveur), qui répond à la même question sans
   ramener 46 665 points. **Non vérifié.**

## Données à reproduire fidèlement

- [ ] Jeu **`fr-en-indicateurs_personnels_etablissements1d-numerique`** (et non `…1d`),
      sur `data.education.gouv.fr`.
- [ ] Rentrée **2024** explicitement : **47 507** écoles, **316 886,5** ETP enseignants —
      **et non 631 578**, qui est la somme de 2024 et 2025.
- [ ] Rentrée **2025** disponible en un clic : 47 077 écoles, 314 691,5 ETP.
- [ ] Périmètre du secret statistique **affiché** : 20 356 écoles masquées en 2024
      (56 906,4 ETP, 18 % du total) ; les proportions portent sur **27 151** écoles
      (259 980,1 ETP).
- [ ] Femmes parmi les ETP enseignants, 2024 : **86,9 %** (et non 71,3 %, qui garde le
      dénominateur complet).
- [ ] Âge 2024 : **19,8 %** < 35 ans · **46,9 %** 35-50 ans · **33,3 %** > 50 ans — **la somme
      doit faire 100**, c'est le contrôle.
- [ ] Ancienneté 2024 : **27,9 %** < 2 ans · **19,4 %** 2-5 ans · **15,3 %** 5-8 ans ·
      **37,5 %** ≥ 8 ans.
- [ ] Secteur 2024 (périmètre renseigné) : Public **24 047** écoles / 227 244 ETP / **86,2 %**
      de femmes ; **Privé sous contrat** **3 104** écoles / 32 736 ETP / **92,1 %**.
- [ ] Filtres : **19** régions (avec le libellé du jeu 1d, « Collectivités et territoires
      doutre-mer hors régions académiques »), **102** départements, **31** académies,
      **2** secteurs (`Public`, `Privé sous contrat`), **2** rentrées — et ils doivent
      **effectivement filtrer**.
- [ ] Titres : « Les écoles primaires et maternelles en chiffres : effectifs en équivalents
      temps plein et profils des personnels », « 1. Les personnels dans les écoles primaires et
      maternelles - Données clés », « 2. Le personnel enseignant - Répartition par âge et par
      ancienneté dans l'établissement », « Répartition par âge », « Répartition par ancienneté
      dans l'établissement ».
- [ ] **Zéro encadré d'erreur.** C'est le critère de réussite le plus simple de tout le lot 12.

## Gabarit partagé

Voir `personnels-colleges.md` § « Gabarit partagé » pour le tableau des trois pages. Ce que
cette page apporte à l'analyse :

Le triplet est bien **un seul gabarit**, mais les écoles en sont la déclinaison dégradée : même
bloc de texte, mêmes UID (`block_MCKRZDB5DAQ91`, `block_MCKS1PD24KWWA`, `block_MCKS5YV2CN1XG`,
`block_MH0W4ASF24MIZ`, `block_MH0W4ASFY02KK`), mêmes filtres aux mêmes UID
(`filter_MH0X4L8LMH8HE`, `filter_MH0X53L1ZBRXQ`, `filter_MH0XBF3JG18AS`), même mise en page —
mais un autre jeu, sans les colonnes qui portent cinq des sept KPI et les quatre cartes.

**Et c'est précisément la duplication qui a produit les pannes.** Les trois filtres pointent le
jeu du second degré parce qu'ils ont été **copiés depuis la page collèges ou lycées** sans que
leur `dataProviderUid` soit repointé ; le champ de dénominateur diffère d'un `d_`
(`etp_d_enseignants_hommes_et_femmes` en 1d contre `etp_enseignants_hommes_et_femmes` en 2d),
ce qui a obligé à réécrire les sept `customFunction` à la main — sept occasions de se tromper,
et le typage `text` du jeu 1d a fait le reste.

Un gabarit `dsfr-data` unique, paramétré par (a) `dataset-id`, (b) le nom du champ de
dénominateur, (c) le `where` de nature, (d) la liste des indicateurs disponibles et (e) le
libellé du niveau, **rend ces trois pannes impossibles** : la facette lit la source qu'elle
filtre (pas de `dataProviderUid` à choisir), le `where` d'année est un attribut unique (pas
d'oubli possible), et le nom de champ est un paramètre du gabarit (pas dix-huit
`customFunction` recopiées). C'est le deuxième cas de factorisation du lot 12 après les quatre
pages IPS — et le premier où la **non**-factorisation a une conséquence mesurable : trois blocs
sur quatre hors service depuis la mise en ligne, sur une page du catalogue officiel de l'État.
