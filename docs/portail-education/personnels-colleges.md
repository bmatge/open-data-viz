# Les personnels dans les collèges français

> **Fiche de référence du triplet « personnels ».** Les deux pages sœurs
> (`personnels-lycees.md`, `personnels-ecoles-primaires.md`) renvoient à celle-ci pour tout
> ce qui est commun et ne décrivent que leurs écarts. Lire celle-ci d'abord.

- **URL** : https://dataeducation.opendatasoft.com/p/personnels-enseignants-dans-les-colleges-en-france/
- **Catalogue** : id **8**, thématique **Éducation**, sous-thématique **Collèges**. Vignette
  `https://dataeducation.opendatasoft.com/assets/theme_image/dataviz-personnel-college.gif`
  — **la vignette elle-même est servie depuis le domaine du prestataire**, y compris sur la
  page catalogue de `data.education.gouv.fr`.
- **Nature de la cible** : page **Opendatasoft Studio** (`uid: sp_begi38`), rendue par le
  front-office React « Huwise » — même génération que `annuaire-des-internats.md`, pas une
  page AngularJS `/pages/…`.
- **Jeu unique** : `fr-en-indicateurs_personnels_etablissements2d` — « Les personnels dans les
  établissements du second degré », **10 697 lignes**, **40 champs**, `visibility: domain`,
  Licence Ouverte v2.0, producteur **DEPP – Ministère chargé de l'éducation nationale**,
  donnée modifiée le **23/07/2026**. Une seule rentrée : **2024**.
- **Relevé visuel** : 2026-09-10, Chrome (extension), fenêtre 1568 × 751 CSS px.
- **Configuration archivée** :
  `docs/portail-education/_sources/personnels-enseignants-dans-les-colleges-en-france.studio.json`.

## ⚠️ Piège de méthode neuf : la config Studio de l'API n'est pas celle qui est servie

Le `_METHODE.md` dit d'aller chercher la configuration à
`GET /api/portal/v1.0/studio_pages/<slug>`. **Sur ce domaine, cet endpoint renvoie une version
périmée.** Vérifié sur les trois pages : la config de l'API ne porte **aucune** `conditions`
sur les KPI ni sur les graphiques, alors que l'écran affiche des chiffres filtrés sur
« Collège » ; les UID de séries diffèrent aussi (`series_MH2CGPIVW1SE9` à l'API contre
`series_MH0W5FLE83VVR` à l'écran).

**La configuration réellement exécutée est celle embarquée dans le HTML servi**, dans l'appel
`appEvent.detail.initialize(document.getElementById('main'), { slug, dataProviders, layouts,
blocks, filters })` du listener `HuwiseAppReady` :

```bash
curl -sL "https://dataeducation.opendatasoft.com/p/<slug>/" \
  | grep -o "appEvent.detail.initialize(.*" | head -1
```

C'est cette version qui est archivée dans `_sources/`. Sans le relevé réseau, j'aurais écrit
que les KPI de la page collèges et ceux de la page lycées affichent les mêmes chiffres — c'est
faux, et c'est exactement le cas prévu par la règle « quand le rendu contredit le code, c'est
le rendu qui gagne ».

## Le domaine : trois entrées du catalogue de l'État hébergées chez le prestataire

Les entrées 7, 8 et 9 du catalogue `dataviz-a-la-une` de `data.education.gouv.fr` pointent
toutes trois vers `dataeducation.opendatasoft.com`. Constaté sur place :

| Point vérifié | Constat |
|---|---|
| Domaine | `dataeducation.opendatasoft.com` — `.com`, nom du prestataire, **hors** `gouv.fr` |
| Bandeau d'en-tête | **Présent** : Marianne + « GOUVERNEMENT / Liberté Égalité Fraternité », puis le titre du service en gros : « **data.education.gouv.fr** » |
| Pied de page | **Présent** : bloc GOUVERNEMENT, liens `info.gouv.fr` / `service-public.gouv.fr` / `legifrance.gouv.fr` / `data.gouv.fr`, « Plan du site · Accessibilité · Mentions légales · Données personnelles · Gestion des cookies », mention « licence etalab-2.0 » |
| Charte | Ce n'est **pas** le DSFR : polices, magenta `#a5117e`-like des KPI, boutons « Connexion / Inscription » bordeaux, cartes à ombre — c'est le thème Opendatasoft habillé aux couleurs de l'État |
| Mentions légales | `/terms/terms-and-conditions` → CGU du ministère de l'Éducation nationale. **Existent.** |
| Déclaration d'accessibilité | `/pages/accessibilite` → **deux phrases** : « Data.education.gouv.fr s'engage à rendre son site internet accessible conformément à l'article 47 de la loi n°2005-102 du 11 février 2005. » / « Le site internet data.education.gouv.fr est en cours d'audit d'accessibilité. » Pas de niveau de conformité, pas de date, pas de contact, pas de voie de recours, et le lien du pied de page ne porte pas la mention de niveau exigée. Elle nomme `data.education.gouv.fr` alors qu'elle est servie sur le `.com`. |
| Plan du site | `/pages/plan-site` → page **vide** (aucun contenu sous le chrome). |
| Bandeau cookies | « Gestion de vos préférences sur les cookies » — Matomo **désactivé par défaut** (bon point). Choix retenu : refus. |
| Traceur non déclaré | Le HTML servi initialise **Mixpanel** (`mixpanel.init(...)`, `mixpanel.identify(...)`, `planName: "ultimate"`, `clientType: "paying"`) — un service SaaS américain, **absent du bandeau cookies** qui ne mentionne que Matomo. |

**Ce que ça implique, dit franchement** : un usager parti du catalogue officiel se retrouve sur
un `.com` privé, avec le bandeau de l'État mais pas sa charte, une déclaration d'accessibilité
qui n'en est pas une, un plan du site vide et un traceur non déclaré. **C'est l'argument le
plus direct du banc d'essai** : une reproduction `dsfr-data` ramène ces trois pages sous
`*.gouv.fr`, sous DSFR, et sous le régime d'accessibilité du site hôte — sans changer une
ligne de donnée, puisque (voir plus bas) les deux jeux sont servis à l'identique par le portail
officiel.

### API : aucune clé nécessaire, CORS ouvert

Testé en anonyme, avec `Origin: https://lab.miweb.run` :

| Appel | Résultat |
|---|---|
| `https://dataeducation.opendatasoft.com/api/explore/v2.1/catalog/datasets/fr-en-indicateurs_personnels_etablissements2d` | **200**, `access-control-allow-origin: *` |
| idem `…/records`, `…/facets`, `…/exports/json` | 200 sans en-tête `Authorization` |
| **`https://data.education.gouv.fr/api/explore/v2.1/…/fr-en-indicateurs_personnels_etablissements2d/records`** | **200**, `access-control-allow-origin: *`, `total_count: 10697` — **même jeu, mêmes lignes, sur le portail officiel** |

La clé publique du `_METHODE.md` ne sert donc à rien ici : ni sur le `.com`, ni sur le
`gouv.fr` pour ces deux jeux. **Conséquence directe pour la transposition : on branche
`base-url="https://data.education.gouv.fr"` et le `.com` disparaît du produit.**

## Champs utiles du jeu (40 au total)

| Champ | Type | Remarque |
|---|---|---|
| `annee_de_la_rentree_scolaire` | text | **une seule valeur : `2024`** — voir Défauts n° 3 |
| `nature_de_l_etablissement` | text | **12 valeurs** (tableau ci-dessous) — c'est ce champ qui découpe les trois pages |
| `secteur` | text | `Public` 7 803 · `Privé` 2 894 |
| `refcode_region` / `reflibelle_region` | text | 19 valeurs + **39 lignes à `null`** |
| `code_departement` / `libelle_departement` | text | **101 valeurs**, aucune nulle (01-95, 2A, 2B, 971-974, 976) |
| `code_academie` / `libelle_academie` | text | 30 valeurs |
| `identifiant_de_l_etablissement`, `nom_de_l_etablissement` | text | UAI + raison sociale |
| `etp_total` | double | ETP tous personnels |
| `etp_de_personnels_de_vie_scolaire` | double | |
| `etp_enseignants_hommes_et_femmes` | double | dénominateur de **tous** les ratios de la page |
| `etp_de_femmes_enseignantes` | double | |
| `etp_d_enseignants_{agreges, certifies_peps, plp, titulaires_d_un_autre_corps, non_titulaires}` | double | statut/diplôme |
| `etp_d_enseignants_de_{moins_de_35_ans, 35_a_moins_de_50_ans, 50_ans_ou_plus}` | double | âge |
| `etp_d_enseignants_ayant_une_anciennete_dans_l_etablissement_de_{moins_de_2_ans, 2_ans_a_moins_de_5_ans, 5_ans_a_moins_de_8_ans, 8_ans_ou_plus}` | double | ancienneté |
| `proportion_{femmes_enseignantes, agreges, certifies, non_titulaires, moins_de_35_ans, 35_50_ans, plus_de_50_ans}` | double | ratios **par établissement** — **la page ne les utilise pas** (voir Limites n° 2) |
| `anciennete_{moins_de_2_ans, 2_a_5_ans, 5_a_8_ans, 8_ans}` | double | idem |
| `geolocalisation` | geo_point_2d | **présent, et jamais utilisé par aucune des trois pages** |
| `num_ligne` | double | technique |

**Facettes déclarées au back-office** (`/facets`) : `annee_de_la_rentree_scolaire` (1),
`secteur` (2), `nature_de_l_etablissement` (12), `code_academie` (30), `reflibelle_region` (19),
`libelle_departement` (100 — plafond d'API), `libelle_academie` (30), `nom_de_l_etablissement`
(100 — plafond). `server-facets` est donc utilisable tel quel.

### Les 12 natures d'établissement, et le découpage réel des trois pages

| `nature_de_l_etablissement` | Lignes | `etp_total` | Page qui la couvre |
|---|---:|---:|---|
| Collège | 6 979 | 289 417,86 | collèges |
| Collège climatique | 2 | 61,37 | collèges |
| Collège spécialisé | 6 | 112,83 | collèges |
| Lycée d'enseignement général et technologique | 1 061 | 92 457,34 | lycées |
| Lycée polyvalent | 979 | 106 988,36 | lycées |
| Lycée professionnel | 1 094 | 57 759,89 | lycées |
| Lycée d'enseignement général | 417 | 20 652,35 | lycées |
| Lycée d'enseignement technologique | 54 | 2 154,99 | lycées |
| Lycée climatique | 4 | 213,00 | lycées |
| Etablissement régional d'enseignement adapté / **Lycée** d'enseignement adapté | 77 | 3 269,20 | **lycées** (par accident, voir la fiche lycées) |
| Etablissement composé uniquement de STS et/ou de CPGE | 22 | 578,12 | **aucune** |
| Ecole secondaire spécialisée (second cycle) | 2 | 25,20 | **aucune** |

6 987 (collèges) + 3 686 (lycées) = 10 673. **24 établissements du second degré ne figurent
sur aucune des trois pages** et rien ne le signale.

## Objectif de la dataviz et informations véhiculées

- **Question** : « Combien de personnes, en équivalents temps plein, font tourner les collèges
  de France, et à quoi ressemblent-elles — sexe, statut, âge, ancienneté ? »
- **Message porté**, tel que la page l'écrit elle-même : c'est une opération de transparence
  (« présente pour la première fois les chiffres relatifs au nombre d'équivalents temps plein
  dans les collèges », « démarche de transparence et d'ouverture des données publiques »).
  Le message chiffré est : 290 000 ETP dont 219 000 enseignants, deux tiers de femmes, huit
  enseignants sur dix certifiés, un enseignant sur deux dans son établissement depuis plus de
  huit ans.
- **Ce que l'utilisateur doit obtenir** : les quatre grands totaux nationaux, les trois
  proportions de statut, la géographie de deux d'entre elles, et la pyramide âge/ancienneté —
  le tout re-calculable pour sa région, son département ou son secteur.
- **Ce qui n'est pas dans l'objet** :
  - **aucune donnée par établissement** — la page le dit (« Retrouvez bientôt ces indicateurs
    par établissement sur l'application *Trouver un établissement* ») ; le jeu porte pourtant
    `nom_de_l_etablissement` **et** `geolocalisation` ;
  - **aucune série temporelle** : le jeu n'a qu'une rentrée (2024), et l'axe X des deux
    graphiques est justement l'année ;
  - **aucune comparaison collèges / lycées**, alors que les deux pages partagent la même table ;
  - **aucun effectif d'élèves**, donc aucun taux d'encadrement ;
  - **aucune donnée académique**, alors que `libelle_academie` (30 valeurs) est facetté ;
  - **aucun tableau, aucun export global, aucune donnée brute affichée**.

## Relevé visuel exhaustif, bloc par bloc

Ordre défini par `layouts.default` : **texte → 2 images → filtres → titre 1 → 4 KPI →
titre 2 → 3 KPI → 4 cartes → titre 3 → 2 graphiques**.

### 0. Chrome de page

En-tête : Marianne « GOUVERNEMENT », titre « **data.education.gouv.fr** », boutons
« Connexion » / « Inscription » (bordeaux). Barre de navigation : **Données ·
Data-visualisations · Démarche · Créer une carte · Créer un graphique · Nous contacter**.
Pas de fil d'Ariane. Une **bulle de chat magenta** flotte en bas à droite en permanence (son
conteneur porte un titre accessible « Fenêtre de chat », de niveau **h1**).

### 1. Bloc texte (`block_MCKRZDB5DAQ91`, `type: text`, `align: center`)

Le contenu markdown ouvre par **deux `#`**, donc **deux `<h1>` distincts** :

> # Les collèges français en chiffres : effectifs en équivalents temps plein
> # et profils des personnels

Puis, mot pour mot :

> « Cette datavisualisation, réalisée par le ministère de l'Éducation nationale à partir des
> données mises à disposition par la DEPP, **présente pour la première fois les chiffres
> relatifs au nombre d'équivalents temps plein dans les collèges.** Elle décrit la répartition
> des personnels selon la mixité, l'ancienneté, l'âge et le niveau de diplôme, dans une
> **démarche de transparence et d'ouverture des données publiques**. »
>
> « Grâce à cette visualisation interactive, chacun pourra explorer la composition des équipes
> au service des élèves au sein de son territoire et mieux comprendre la diversité des profils
> qui font vivre le service public d'éducation. »
>
> « Retrouvez bientôt ces indicateurs par établissement sur l'application
> [Trouver un établissement](https://dataeducation.opendatasoft.com/pages/accueil/) »

### 2. Deux images (`block_MCKS1PD24KWWA`, `block_MCKS1PD2TY313`, `type: media`, `fit: original`)

`/assets/theme_image/enseignante-college.jpg` et `/assets/theme_image/coll-ge---scx0609136-193905.jpg`,
côte à côte, pleine largeur de conteneur. **`alt=""` sur les deux** (vérifié dans le DOM) —
acceptable si elles sont décoratives, ce qu'elles sont.

### 3. Section « filtres » (`section_MH0X2RTAV6577`, `type: filters`)

Trois `select`, tous sur le même `dataProviderUid` `85km58y8kh` (le jeu 2d),
`layout_single_selection`, `title: ""`, aucune valeur par défaut :

| # | `fieldName` | Libellé affiché | Valeurs |
|---|---|---|---|
| 1 | `reflibelle_region` | **Libellé région** | 19, alphabétiques |
| 2 | `libelle_departement` | **Libellé département** | 101 (cascade) |
| 3 | `secteur` | **Secteur** | `Public`, `Privé` |

Les libellés viennent du schéma du jeu (`title` vide), d'où « Libellé région » / « Libellé
département » — le mot « libellé » est une notion de back-office, pas un mot d'usager.

**Rendu observé** : un `<select>`-like DSFR-ish qui, ouvert, affiche « Sélectionnez une
valeur » et déroule la liste. **Pas de compteur, pas de champ de recherche, choix unique.**
Les 19 régions relevées à l'écran : Auvergne-Rhône-Alpes, Bourgogne-Franche-Comté, Bretagne,
Centre-Val de Loire, Corse, Grand Est, Guadeloupe, Guyane, Hauts-de-France, Ile-de-France,
La Réunion, Martinique, Mayotte, Normandie, Nouvelle-Aquitaine, Occitanie, Pays de la Loire,
Provence-Alpes-Côte d'Azur, **TOM et Collectivités territoriales**.

**Cascade vérifiée** : `Libellé région = Corse` → la liste `Libellé département` ne propose
plus que **Corse-du-Sud** et **Haute-Corse**. La requête sous-jacente est
`…/records/?group_by=\`libelle_departement\` as value&where=((\`libelle_departement\` is not
null) AND (not (\`libelle_departement\`)=""))`, rejouée avec le refine.

**Recalcul vérifié** avec `Corse` : les sept KPI passent à **1 310 / 182 / 957 / 66,7 % /
4 % / 81 % / 10,6 %** (API : 1 309,71 · 181,93 · 957,10 · 66,656 % · 4,04 % · 81,02 % ·
10,6 % — exact).

**L'URL n'est jamais synchronisée** : elle reste
`…/p/personnels-enseignants-dans-les-colleges-en-france/` quel que soit le filtrage.

### 4. Titre « 1. Les personnels dans les collèges - Données clés » (`block_MCKS4C28QE7FU`)

Bloc `text`, `align: left`, contenu `# 1. …` + `---` → **un `<h1>` de plus** et un filet.

### 5. Quatre KPI (`section_MCKS5YV2MNWTX`)

Tous `kpiType: simple`, `layout_context_and_image` (pictogramme couleur au-dessus, valeur en
magenta, libellé gris dessous), `notation: standard`. Tous portent la même condition
`nature_de_l_etablissement contains ["Collège"]`, traduite en
`where=(((suggest(\`nature_de_l_etablissement\`, "Collège"))))`.

| Bloc | `yFunction` / formule exacte | `maximumFractionDigits` | Pictogramme | Valeur à l'écran | API |
|---|---|---|---|---|---|
| `block_MCKS5YV2CN1XG` | `sum(etp_total)` | 0 | `environment.png` | **289 592** — « Equivalents Temps Plein au service des élèves » | 289 592,06 ✔ |
| `block_MCKS5YV22X2K6` | `sum(etp_de_personnels_de_vie_scolaire)` | 0 | `social-care.png` | **34 736** — « Equivalents Temps Plein sont dédiés à la vie scolaire » | 34 736,41 ✔ |
| `block_MCKS5YV2J0526` | `sum(etp_enseignants_hommes_et_femmes)` | 0 | `training.png` | **218 899** — « Equivalents Temps Plein sont enseignants » | 218 899,40 ✔ |
| `block_MH295EC9GRDJ9` | `sum(etp_de_femmes_enseignantes)/sum(etp_enseignants_hommes_et_femmes)*100`, `format.suffix: "%"` | 1 | `parity.png` | **65,1 %** — « proportion des femmes dans les Equivalents Temps Plein enseignants » | 65,136 % ✔ |

Chaque KPI porte un kebab « ⋮ » (menu identique à celui des graphiques, § 8).

### 6. Titre « 2. Le personnel enseignant - Enseignements clés par statut/diplôme » + trois KPI

Trois blocs `kpi`, `layout_context_only` (pas de pictogramme), 1 décimale, suffixe `%`, même
condition « Collège » :

| Bloc | Formule | Écran | API |
|---|---|---|---|
| `block_MH0V0HEH2OS3I` | `sum(etp_d_enseignants_agreges)/sum(etp_enseignants_hommes_et_femmes)*100` | **5,6 %** « des enseignant(e)s sont agrégé(e)s » | 5,598 % ✔ |
| `block_MH0V0HEHA1BID` | `sum(etp_d_enseignants_certifies_peps)/sum(etp_enseignants_hommes_et_femmes)*100` | **80,3 %** « des enseignant(e)s sont certifié(e)s » | 80,263 % ✔ |
| `block_MH0V0HEHLUZ0W` | `sum(etp_d_enseignants_non_titulaires)/sum(etp_enseignants_hommes_et_femmes)*100` | **8,8 %** « des enseignant(e)s sont non titulaires » | 8,800 % ✔ |

Les trois `yField` déclarés (`proportion_agreges`, `proportion_certifies`,
`proportion_non_titulaires`) sont **ignorés** : c'est `customFunction` qui gagne. La requête
émise ne contient pas ces colonnes.

Le titre de section est `# 2. …` → **encore un `<h1>`**.

### 7. Quatre cartes choroplèthes (`mapType: choropleth.georef`)

Deux paires (région / département), une paire par indicateur, en grille 2 × 2. Toutes :
`shapeSource: {type: georef, layer: world_fr, breakdown: "40"|"60"}`,
`bbox: [-5.4517733, 41.2611155, 9.8282225, 51.3055721]` (métropole),
`navigationMaps: ["fr_60_971","fr_60_973","fr_60_974","fr_60_972","fr_60_976"]`,
`aspectRatio: 16-9`, `layout_tt_ll`, `colorsScale: {type: palette, steps: "6"}`,
`displayFormat: {notation: compact_short, maximumFractionDigits: "1"}`.

| Bloc | Découpage | `dataKey` | Formule | Titre affiché | `legendLabel` | Teinte |
|---|---|---|---|---|---|---|
| `MH0VAJI4M6YDC` | régions (40) | `refcode_region` | `sum(etp_d_enseignants_agreges)/sum(etp_enseignants_hommes_et_femmes)*100` | « Représentation des enseignants agrégés par région » | « Proportion d'enseignant(e)s agrégé(e)s dans les collèges » | `@chart[12]` — **rouge brique** |
| `MH0VAJI4ZE92H` | départements (60) | `code_departement` | idem | « Représentation des enseignants agrégés par département » | « Proportion d'enseignants agrégés dans les collèges » | `@chart[12]` |
| `MH2B7WK6H7WCG` | régions (40) | `refcode_region` | `sum(etp_d_enseignants_certifies_peps)/sum(etp_enseignants_hommes_et_femmes)*100` | « Représentation des enseignant(e)s certifié(e)s par région » | « Proportion d'enseignants certifiés dans les collèges » | `@chart[15]` — **brun doré** |
| `MH2B7WK6AFLPJ` | départements (60) | `code_departement` | idem | « Représentation des enseignants certifiés par département » | « Proportion d'enseignant(e)s certifié(e)s dans les collèges » | `@chart[15]` |

Noter l'inconstance rédactionnelle : titre et légende écrivent tantôt « enseignants agrégés »,
tantôt « enseignant(e)s agrégé(e)s », et la paire région/département inverse les deux formes.

**Requête effectivement émise** (relevée au réseau) — une par carte, sur un **autre chemin**
que les KPI :
`GET …/catalog/datasets/fr-en-indicateurs_personnels_etablissements2d/exports/json/?group_by=\`refcode_region\` as x&select=sum(etp_d_enseignants_agreges)/sum(etp_enseignants_hommes_et_femmes)*100 as y&timezone=Europe/Paris&where=((suggest(\`nature_de_l_etablissement\`, "Collège")))`
(les KPI et les graphiques passent, eux, par `/catalog/assets/<jeu>/records/`).

**Rendu, contrôles, habillage** :
- pas de fond de tuiles : SVG plein, mer blanche, aucun libellé de territoire ;
- boutons `+` / `−` en haut à droite ;
- attribution en bas à droite : « **INSEE IGN NaturalEarth** » (régions) et « **INSEE IGN
  NaturalEarth DGGL** » (départements) avec une pastille « i » ;
- **sous la carte, cinq vignettes DROM** (Guadeloupe, Martinique, Guyane, La Réunion, Mayotte),
  colorées, **sans aucun libellé**. Cliquer une vignette **navigue la carte principale** vers
  ce territoire et fait apparaître une flèche « ← » de retour. Vérifié sur Mayotte : la carte
  affiche la seule silhouette de Mayotte, sans côte ni nom, teintée selon sa valeur.
- **légende** : le `legendLabel` sur deux lignes, puis une bande de **6 pavés** et **7 bornes
  chiffrées**. L'échelle est **linéaire à pas égal du minimum au maximum des données**, les
  bornes étant rendues en `compact_short` à ~2 chiffres significatifs. Relevées à l'écran :

  | Carte | Bornes affichées | Reconstitution |
  |---|---|---|
  | agrégés / région | 0,83 · 2,2 · 3,5 · 4,9 · 6,2 · 7,6 · **8,9** | min 0,83 (Guyane) → max **8,90 = le groupe `null`**, pas une région |
  | agrégés / département | 0,83 · 2,8 · 4,7 · 6,7 · 8,7 · 11 · 13 | min 0,83 (Guyane) → max 12,60 (Paris) |
  | certifiés / région | 40 · 47 · 54 · 62 · 69 · 77 · 84 | min 39,61 (Mayotte) → max 84,17 (Normandie) |
  | certifiés / département | 40 · 47 · 55 · 63 · 70 · 78 · 86 | min 39,61 (Mayotte) → max 85,90 (Maine-et-Loire) |

- **infobulle au survol** relevée mot pour mot sur la carte des régions :
  ```
  Centre-Val de Loire
  81,9
  ```
  Deux lignes : le nom du territoire, puis la valeur **sans unité, sans nom d'indicateur**.

**Valeurs réelles par région, collèges** (API, pour la fidélité) :

| Région | agrégés % | certifiés % |
|---|---:|---:|
| Auvergne-Rhône-Alpes | 7,23 | 78,88 |
| Ile-de-France | 7,17 | 78,13 |
| Grand Est | 6,32 | 79,07 |
| Provence-Alpes-Côte d'Azur | 6,21 | 80,65 |
| Nouvelle-Aquitaine | 5,83 | 81,05 |
| Occitanie | 5,74 | 82,12 |
| Bourgogne-Franche-Comté | 5,56 | 82,04 |
| Centre-Val de Loire | 4,89 | 81,94 |
| Normandie | 4,65 | 84,17 |
| Bretagne | 4,19 | 83,41 |
| Corse | 4,04 | 81,02 |
| Hauts-de-France | 3,77 | 83,34 |
| Pays de la Loire | 3,61 | 83,27 |
| La Réunion | 3,46 | 82,32 |
| *(TOM et Collectivités territoriales)* | 3,39 | 65,82 |
| Martinique | 1,77 | 75,81 |
| Guadeloupe | 1,44 | 80,85 |
| Mayotte | 1,06 | 39,61 |
| Guyane | 0,83 | 57,37 |
| **`null` (5 collèges)** | **8,90** | 69,16 |

Extrêmes départementaux : agrégés Paris 12,6 · Bas-Rhin 10,0 · Alpes-de-Haute-Provence 9,7 …
Guyane 0,8 · Mayotte 1,1 · Guadeloupe 1,6. Certifiés Maine-et-Loire 85,9 · Manche 85,5 …
Cantal 70,4 · Guyane 57,4 · Mayotte 39,6.

### 8. Titre « 3. … Répartition par âge et par ancienneté dans l'établissement » + deux graphiques

Encore un `# 3. …` → **cinquième `<h1>`**.

**a) « Répartition par âge »** (`block_MH0W4ASF24MIZ`, `chartType: comparison.bars` — barres
**horizontales**, `layout_xy_tt_gr`, `axisAssemblage: separate`,
`displayFormat {compact_short, 1 décimale}`) :
`xField: annee_de_la_rentree_scolaire`, `order: {by: x, direction: desc}`, trois séries à
condition « Collège » :

| Série | Légende | Couleur | Formule | Valeur (API) |
|---|---|---|---|---|
| `MH0W5FLE83VVR` | Moins de 35 ans | `@chart[10]` — rose très pâle | `sum(etp_d_enseignants_de_moins_de_35_ans)/sum(etp_enseignants_hommes_et_femmes)*100` | **19,57** |
| `MH0W5JQDG9PZJ` | 35 - 50 ans | `@chart[9]` — rose moyen | `…de_35_a_moins_de_50_ans…` | **43,28** |
| `MH0W5NHTCUYXN` | Plus de 50 ans | `@chart[8]` — rose soutenu | `…de_50_ans_ou_plus…` | **37,14** |

Requête : `…/records/?group_by=\`annee_de_la_rentree_scolaire\` as x&order_by=x DESC&select=…
as series_MH0W5FLE83VVR, … as series_MH0W5JQDG9PZJ, … as series_MH0W5NHTCUYXN&where=(((\`annee_de_la_rentree_scolaire\` IS NOT NULL) AND ((suggest(\`nature_de_l_etablissement\`, "Collège")))))`

**Rendu à l'écran** : **une seule catégorie sur l'axe des ordonnées, « 2024 »**, donc trois
barres horizontales. Axe des ordonnées intitulé « **Année** », axe des abscisses gradué
0 · 5 · 10 · … · 45 et intitulé « **Tranche d'âge** ». Légende en pied : trois pastilles
« Moins de 35 ans / 35 - 50 ans / Plus de 50 ans ». Infobulle relevée mot pour mot :
```
2024
■ Moins de 35 ans: 19,6
■ 35 - 50 ans: 43,3
■ Plus de 50 ans: 37,1
```
**Aucun signe `%` nulle part** — ni sur l'axe, ni dans l'infobulle, ni dans la légende, alors
que les trois séries somment à 100.

**b) « Répartition par ancienneté dans l'établissement »** (`block_MH0W4ASFY02KK`,
`chartType: comparison.columns` — barres **verticales**), `order: {by: x, direction: asc}`,
quatre séries :

| Série | Légende (**telle qu'écrite**) | Couleur | Formule (suffixe de champ) | Valeur (API) |
|---|---|---|---|---|
| `MH0XCGXH3RIIC` | `Moins  de 2 ans` (**double espace**) | `@chart[5]` — lavande très pâle | `…de_moins_de_2_ans` | **24,11** |
| `MH0XCSPHMUREL` | 2 à 5 ans | `@chart[4]` | `…de_2_ans_a_moins_de_5_ans` | **16,34** |
| `MH0XCTXPNDPOW` | 5 à 8 ans | `@chart[3]` | `…de_5_ans_a_moins_de_8_ans` | **12,77** |
| `MH0XCUOGTTMDV` | Plus de 8 ans | `@chart[2]` — indigo soutenu | `…de_8_ans_ou_plus` | **46,78** |

Rendu : quatre colonnes sur la seule catégorie « 2024 ». Axe Y gradué 0 → 50, intitulé
« **Niveau d'ancienneté** » ; axe X « **Année** ». Même absence de `%`.

**Kebab « ⋮ » de chaque bloc** (KPI, cartes et graphiques), relevé à l'écran :
`View dataset source` (**en anglais**), `Exporter au format PNG`, `Exporter au format CSV`,
`Exporter au format JSON`, `Exporter au format Excel`.

### 9. Pied de page

Bloc GOUVERNEMENT + Marianne, liens `info.gouv.fr` · `service-public.gouv.fr` ·
`legifrance.gouv.fr` · `data.gouv.fr`, puis « Plan du site | Accessibilité | Mentions légales |
Données personnelles | Gestion des cookies » et « Sauf mention contraire, tous les contenus de
ce site sont sous licence etalab-2.0 ».

## Défauts et bizarreries de l'original

1. **Cinq `<h1>` sur une page** (+ un sixième pour la bulle de chat), **aucun `<h2>`**, et des
   `<h3>` pour les titres de cartes et de graphiques — plus un `<h3>` « Portails de région
   académique » **avant** le premier `<h1>`. Hiérarchie inexploitable (RGAA 9.1). La cause est
   mécanique : chaque titre de section est un bloc `text` dont le markdown commence par `#`, et
   le rendu markdown ne connaît pas le niveau du contexte.
2. **L'unité `%` n'apparaît jamais sur les deux graphiques.** Les KPI, eux, l'ont
   (`format.suffix: "%"`). Un lecteur voit « 43,3 » sur un axe intitulé « Tranche d'âge » — deux
   informations fausses au même endroit.
3. **Les axes sont intitulés à l'envers.** Le `xLabel: "Année"` et le `yLabel: "Tranche d'âge"`
   sont posés sans tenir compte du fait que `comparison.bars` est horizontal : l'axe qui porte
   les **pourcentages** est titré « Tranche d'âge », et l'axe qui porte l'unique catégorie 2024
   est titré « Année ». Même inversion sur le second graphique (« Niveau d'ancienneté » sur
   l'axe des valeurs).
4. **Deux graphiques temporels sur un jeu qui n'a qu'une année.** `xField:
   annee_de_la_rentree_scolaire` sur un champ à valeur unique produit une catégorie « 2024 » et
   rien d'autre. Le gabarit a manifestement été pensé pour une série ; il rend un histogramme
   de composition déguisé en série temporelle. **Ce sont les deux seuls graphiques de la page**,
   et la variable qu'ils annoncent (âge, ancienneté) n'est pas sur l'axe des catégories.
5. **Le groupe `null` de `reflibelle_region` fixe le maximum de l'échelle de la carte des
   régions.** 39 lignes du jeu (dont 5 collèges) n'ont pas de région ; leur agrégat vaut
   8,90 % d'agrégés, au-dessus de toutes les régions réelles (max 7,23 %). La légende affiche
   donc **8,9** comme borne haute, **et aucune région n'atteint cette couleur** : le pavé le
   plus foncé de la légende ne correspond à rien sur la carte. Sur la page lycées, le même
   groupe fixe la borne **basse** (0,42). Ces 39 établissements sont par ailleurs comptés dans
   les KPI et absents des cartes régionales, sans mention.
6. **Une échelle linéaire à 6 classes écrasée par une valeur aberrante.** Sur les deux cartes
   « certifiés », Mayotte (39,6) et la Guyane (57,4) tirent le minimum très bas alors que la
   métropole se tient entre 70 et 86 : **toute la France métropolitaine tombe dans les deux
   classes les plus sombres** et la carte est visuellement uniforme. Une carte qui ne
   discrimine rien.
7. **La précision des bornes de légende est incohérente** : « 0,83 · 2,8 · 4,7 · 6,7 · 8,7 ·
   11 · 13 » — deux décimales, puis une, puis zéro, dans la même bande.
8. **Filtrer sur une région casse les quatre cartes.** Vérifié avec `Corse` : la France entière
   passe en **gris « pas de données »**, seule la Corse est colorée, la carte **ne se recadre
   pas** sur la sélection (le `bbox` métropolitain est figé dans la configuration), et la
   légende dégénère — celle des régions affiche « **4 4 4 4 4 4 4** » (sept bornes identiques,
   une seule valeur dans les données), celle des départements « 3,3 · 3,5 · 3,8 · 4 · 4,2 ·
   4,5 · 4,7 » pour deux départements. Quatre cartes inutiles dès le premier filtre.
9. **Aucune synchronisation d'URL.** Un état filtré n'est ni partageable ni « bookmarkable ».
10. **Les libellés de filtres sont ceux du back-office** : « Libellé région », « Libellé
    département ». Le champ `title` des trois filtres est vide dans la configuration.
11. **Facettes sans compteur et sans recherche** : 101 départements dans une liste déroulante
    nue. L'information de volume existe pourtant côté serveur.
12. **Pas de filtre sur `nature_de_l_etablissement`**, alors que c'est le champ qui définit
    l'objet de la page. L'usager ne peut pas savoir que « collège » recouvre ici trois natures
    (collège, collège climatique, collège spécialisé), ni voir que 24 établissements du second
    degré ne sont couverts par aucune des trois pages.
13. **Pas de filtre sur l'année**, alors que le jeu la facette — inoffensif tant qu'il n'y a
    qu'une rentrée, mais les deux graphiques prétendent déjà être temporels.
14. **`geolocalisation` est dans le jeu et n'est utilisé nulle part** : aucune des trois pages
    ne pose de carte de points, alors que le jeu est intégralement géolocalisé.
15. **Une chaîne non traduite** : l'entrée de kebab « **View dataset source** ».
16. **Un double espace dans une légende** : « Moins  de 2 ans ».
17. **Aucun tableau de données, aucun texte alternatif de graphique** : `document.querySelectorAll('table').length === 0`,
    six `<canvas>`, aucune alternative. Les sept KPI, les quatre cartes et les deux graphiques
    sont inaccessibles au lecteur d'écran.
18. **Le kebab propose quatre exports par bloc** (PNG, CSV, JSON, Excel) mais **aucun export de
    la page ni du jeu filtré**, et le lien « View dataset source » sort vers le jeu complet.
19. **Le site est un `.com`** avec une déclaration d'accessibilité en deux phrases, un plan du
    site vide et un traceur Mixpanel non déclaré au bandeau cookies (§ « Le domaine »).

## Transposition vers `dsfr-data`

Attributs vérifiés via le MCP ChartsBuilder (`get_skill(dsfrDataSource|dsfrDataQuery|dsfrDataKpi|dsfrDataChart|dsfrDataUnpivot|chartTypes|attributeGrammars, …)`)
et, pour `format="pourcentage"`, dans le source (`packages/shared/src/utils/formatters.ts`).
Tout ce qui n'a pas été vérifié est marqué **non vérifié**.

### Architecture retenue et pourquoi

Chronométré trois fois sur `data.education.gouv.fr` (le portail officiel, pas le `.com`) :

| Requête | Poids gzip | Durée |
|---|---:|---:|
| `/exports/json?limit=-1` (40 champs, 10 697 lignes) | 3,58 Mo (19,8 Mo brut) | 0,99 · 1,39 · 1,60 s |
| `/exports/json?limit=-1&select=<18 champs utiles>` | **680 Ko** | **0,83 · 0,86 · 0,84 s** |

**Le `select` paie ici**, contrairement au jeu `fr-en-internats` où il coûtait plus qu'il ne
rapportait (piège « `select` sur un champ texte long » du `CLAUDE.md`) : 5,3× plus léger et
plus rapide. La différence tient au ratio champs utiles / champs totaux (18 sur 40, dont on
écarte les 11 colonnes `proportion_*` et `anciennete_*` recalculables). **Le piège du dépôt
doit être lu comme « mesurer », pas comme « ne jamais mettre de select ».**

680 Ko et 0,85 s pour 10 697 lignes : **tout charger côté client** est le bon choix. On obtient
gratuitement ce que l'original n'a pas — compteurs de facettes, cascade instantanée, recalcul
sans aller-retour — et on peut faire une chose que l'original ne peut pas : le graphique
âge/ancienneté par **tranche** plutôt que par année, via `dsfr-data-unpivot`.

Les deux ratios qui ne se laissent pas exprimer côté client (`sum(a)/sum(b)*100`, cf. Limites
n° 1) passent par un second `dsfr-data-source` en mode adaptateur ODS avec un `select` ODSQL —
qui, lui, **écoute bien les facettes** (`getEffectiveWhere()` fusionne le `where` statique et
les surcouches dynamiques).

### Correspondance bloc à bloc

| Bloc / directive ODS Studio | Composant + attributs `dsfr-data` |
|---|---|
| `dataProviders: {85km58y8kh: fr-en-indicateurs_personnels_etablissements2d}` | `<dsfr-data-source id="p2d" api-type="opendatasoft" base-url="https://data.education.gouv.fr" dataset-id="fr-en-indicateurs_personnels_etablissements2d" select="…18 champs…" max-records="12000">` — **pas d'`api-key-ref`** (200 en anonyme, `ACAO: *` vérifié), et **le domaine `.com` disparaît** |
| condition `nature_de_l_etablissement contains ["Collège"]`, répétée **18 fois** dans la config | **une seule fois**, `where="nature_de_l_etablissement like 'Collège'"` sur la source (dialecte ODSQL, PG-015). `like` reproduit exactement le `suggest()` d'ODS Studio sur ce champ : 6 987 lignes, valeurs identiques au pourcentage près (vérifié sur les sept KPI) |
| `section type: filters`, 3 `select` `layout_single_selection` | `<dsfr-data-facets id="f" source="p2d" fields="reflibelle_region, libelle_departement, secteur, nature_de_l_etablissement, libelle_academie" labels="reflibelle_region:Région \| libelle_departement:Département \| secteur:Secteur \| nature_de_l_etablissement:Type d'établissement \| libelle_academie:Académie" display="reflibelle_region:select \| libelle_departement:select \| secteur:radio-inline" searchable="libelle_departement" url-sync url-params>` — séparateur **`\|`** pour `labels`/`display`, **`,`** pour `fields`/`searchable` (PG-022) |
| `layout_single_selection` | `display="champ:select"` — **pas `:radio`**, qui rend un menu déroulant, ni la virgule comme séparateur (PG-022, PG-023) |
| libellés « Libellé région » / « Libellé département » | corrigés par `labels` : le `title` vide de l'original est un oubli, pas une exigence |
| valeurs de facettes **sans compteur** | ne rien faire : `dsfr-data-facets` les affiche par défaut |
| cascade région → département | native en mode client (les compteurs se recalculent sur les données chargées) ; `server-facets` la ferait côté serveur, inutile ici |
| **manque** : filtre sur l'année et sur la nature | ajoutés à `fields` — les deux sont facettés au back-office |
| **manque** : URL partageable | `url-sync url-params` sur la facette |
| KPI `sum(etp_total)`, `layout_context_and_image`, 0 décimale | `<dsfr-data-kpi source="f" value="etp_total:sum" format="nombre" decimals="0" heading="Sélection" label="ETP au service des élèves" col="3">` |
| les 4 puis 3 KPI en rangée | `<dsfr-data-kpi-group>` + `col="3"` / `col="4"`. **Ne pas** poser `display:block` sur le groupe, qui est `grid` (PG-011) |
| pictogrammes `environment.png`, `social-care.png`, `training.png`, `parity.png` | `icon="ri-…"` (classe d'icône). Les PNG couleur de l'original n'ont pas d'équivalent — cosmétique, cf. Limites n° 4 |
| KPI de ratio `sum(a)/sum(b)*100` + `format.suffix: "%"` | **pas exprimable en `value="champ:fn"`** → source d'agrégat dédiée : `<dsfr-data-source id="ratios" api-type="opendatasoft" … select="sum(etp_de_femmes_enseignantes)/sum(etp_enseignants_hommes_et_femmes)*100 as pct_femmes, …*100 as pct_agreges, …" where="nature_de_l_etablissement like 'Collège'" limit="1">` puis `<dsfr-data-kpi source="ratios" value="pct_femmes:max" format="pourcentage" decimals="1">`. `limit="1"` + lecture en `:max` : piège maison « `select=…` sans `group_by` renvoie la valeur répétée ». `format="pourcentage"` attend une valeur **déjà en pourcentage** (65,1 → « 65,1 % ») — vérifié dans `formatters.ts` |
| `choropleth.georef` `breakdown: 40`, `dataKey: refcode_region` | `<dsfr-data-chart type="map-reg" code-field="refcode_region" value-field="pct_agreges" name="Part d'agrégés (%)">` — **DSFR Chart**, pas `dsfr-data-map` |
| `choropleth.georef` `breakdown: 60`, `dataKey: code_departement` | `type="map"` + `code-field="code_departement"` (codes INSEE 01-95, 2A, 2B, 971-976 — les 101 valeurs du jeu sont toutes valides) |
| source de la carte : `group_by=refcode_region as x&select=…` | `<dsfr-data-source id="agr-reg" api-type="opendatasoft" … group-by="refcode_region as code" select="sum(etp_d_enseignants_agreges)/sum(etp_enseignants_hommes_et_femmes)*100 as pct_agreges, …" where="nature_de_l_etablissement like 'Collège' and reflibelle_region is not null">` — l'alias `as` est **obligatoire** côté ODS sur `group-by` |
| groupe `null` qui fixe le max de l'échelle | `and reflibelle_region is not null` **sur le `where` de la source déjà présente** (PG-015). Corrige le défaut n° 5 |
| `colorsScale {palette, 6 pas, linéaire min→max}` | `selected-palette="sequentialAscending"` (palette recommandée pour `map`/`map-reg`). **Le nombre de classes et la méthode de discrétisation ne sont pas exposés par `dsfr-data-chart`** — cf. Limites n° 3 |
| 5 vignettes DROM cliquables (`navigationMaps`) | pas d'équivalent : les cartes DSFR Chart sont des SVG figés. Les DROM y figurent (ou non) selon le tracé livré — **non vérifié au navigateur** |
| infobulle « territoire / valeur » sans unité | `unit-tooltip="%"` sur le `dsfr-data-chart` — l'unité manquante de l'original |
| `comparison.bars` × 3 séries sur un seul X | **réécrit** : `<dsfr-data-unpivot id="age" source="f" id-cols="secteur, reflibelle_region" value-cols="etp_d_enseignants_de_moins_de_35_ans:Moins de 35 ans, etp_d_enseignants_de_35_a_moins_de_50_ans:35 à 50 ans, etp_d_enseignants_de_50_ans_ou_plus:Plus de 50 ans" var-name="tranche" value-name="etp">` puis `<dsfr-data-query id="age-agg" source="age" group-by="tranche" aggregate="etp:sum">` et `<dsfr-data-chart source="age-agg" type="bar" horizontal label-field="tranche" value-field="etp__sum">` — l'alias inline `colonne:Libellé` de `value-cols` porte les libellés, séparateur **virgule** |
| axes intitulés à l'envers, sans `%` | `unit-tooltip="%"`, et la tranche d'âge devient l'axe des catégories : les deux défauts tombent avec la réécriture |
| `name` de série | **chaîne simple** (`name="Part des ETP enseignants"`) — jamais `'["…"]'` sur une carte (AM-023) |
| légende « Moins  de 2 ans » | corrigée dans l'alias de `value-cols` |
| kebab « Exporter au format PNG/CSV » | `databox databox-download databox-screenshot databox-source="DEPP — fr-en-indicateurs_personnels_etablissements2d, rentrée 2024"` sur chaque `dsfr-data-chart` |
| kebab « View dataset source » | `databox-actions='["Voir le jeu de données"]'` ou un lien DSFR sous le bloc |
| — (absent de l'original) | `<dsfr-data-a11y for="…" source="…" table download>` sous chaque graphique et chaque carte : les 18 blocs de l'original n'ont **aucune** alternative |
| — (absent de l'original) | `<dsfr-data-list source="f" columns="nom_de_l_etablissement, nature_de_l_etablissement, secteur, libelle_departement, etp_total, etp_enseignants_hommes_et_femmes" search sort="etp_total:desc" pagination="20">` : la donnée par établissement que la page promet « bientôt » et qui est déjà dans le jeu. **Attention** : `sort` de `dsfr-data-list` est une **expression de tri par défaut** (`"champ:desc"`), pas un booléen — un `sort` nu ne trie rien (vérifié dans le source, `dsfr-data-list.ts` l. 88-90) ; et les formes françaises `colonnes`/`recherche`/`filtres`/`tri` sont dépréciées |
| — (absent de l'original) | `<dsfr-data-map>` sur `geolocalisation` : 10 697 points géolocalisés inutilisés. **`max-items` à relever explicitement** (défaut 5 000 < 10 697, PG-013) |
| 5 `<h1>` | `heading-level="2"` sur les `dsfr-data-chart` (défaut 3) et des `<h2>` HTML pour les trois sections |

### Esquisse de code

```html
<!-- ============ Sources ============
     10 697 lignes, 18 champs : 680 Ko gzip / 0,85 s mesuré. Un seul aller-retour.
     Portail OFFICIEL, pas le .com : même jeu, 200 en anonyme, ACAO *. -->
<dsfr-data-source id="p2d"
  api-type="opendatasoft"
  base-url="https://data.education.gouv.fr"
  dataset-id="fr-en-indicateurs_personnels_etablissements2d"
  where="nature_de_l_etablissement like 'Collège'"
  select="annee_de_la_rentree_scolaire, secteur, nature_de_l_etablissement,
          reflibelle_region, refcode_region, libelle_departement, code_departement,
          libelle_academie, nom_de_l_etablissement, geolocalisation,
          etp_total, etp_de_personnels_de_vie_scolaire, etp_enseignants_hommes_et_femmes,
          etp_de_femmes_enseignantes, etp_d_enseignants_agreges,
          etp_d_enseignants_certifies_peps, etp_d_enseignants_non_titulaires,
          etp_d_enseignants_de_moins_de_35_ans, etp_d_enseignants_de_35_a_moins_de_50_ans,
          etp_d_enseignants_de_50_ans_ou_plus,
          etp_d_enseignants_ayant_une_anciennete_dans_l_etablissement_de_moins_de_2_ans,
          etp_d_enseignants_ayant_une_anciennete_dans_l_etablissement_de_2_ans_a_moins_de_5_ans,
          etp_d_enseignants_ayant_une_anciennete_dans_l_etablissement_de_5_ans_a_moins_de_8_ans,
          etp_d_enseignants_ayant_une_anciennete_dans_l_etablissement_de_8_ans_ou_plus"
  max-records="12000">
</dsfr-data-source>

<!-- Les ratios sum(a)/sum(b) : inexprimables en value="champ:fn", ODSQL les fait. -->
<dsfr-data-source id="ratios"
  api-type="opendatasoft" base-url="https://data.education.gouv.fr"
  dataset-id="fr-en-indicateurs_personnels_etablissements2d"
  where="nature_de_l_etablissement like 'Collège'"
  select="sum(etp_de_femmes_enseignantes)/sum(etp_enseignants_hommes_et_femmes)*100 as pct_femmes,
          sum(etp_d_enseignants_agreges)/sum(etp_enseignants_hommes_et_femmes)*100 as pct_agreges,
          sum(etp_d_enseignants_certifies_peps)/sum(etp_enseignants_hommes_et_femmes)*100 as pct_certifies,
          sum(etp_d_enseignants_non_titulaires)/sum(etp_enseignants_hommes_et_femmes)*100 as pct_non_titulaires"
  limit="1">
</dsfr-data-source>

<!-- Cartes : agrégat serveur par région / par département.
     « is not null » écarte les 39 lignes sans région qui, dans l'original,
     fixent seules le maximum de l'échelle. -->
<dsfr-data-source id="agr-reg"
  api-type="opendatasoft" base-url="https://data.education.gouv.fr"
  dataset-id="fr-en-indicateurs_personnels_etablissements2d"
  where="nature_de_l_etablissement like 'Collège' and reflibelle_region is not null"
  group-by="refcode_region as code"
  select="sum(etp_d_enseignants_agreges)/sum(etp_enseignants_hommes_et_femmes)*100 as pct_agreges,
          sum(etp_d_enseignants_certifies_peps)/sum(etp_enseignants_hommes_et_femmes)*100 as pct_certifies">
</dsfr-data-source>

<dsfr-data-source id="agr-dep"
  api-type="opendatasoft" base-url="https://data.education.gouv.fr"
  dataset-id="fr-en-indicateurs_personnels_etablissements2d"
  where="nature_de_l_etablissement like 'Collège'"
  group-by="code_departement as code"
  select="sum(etp_d_enseignants_agreges)/sum(etp_enseignants_hommes_et_femmes)*100 as pct_agreges,
          sum(etp_d_enseignants_certifies_peps)/sum(etp_enseignants_hommes_et_femmes)*100 as pct_certifies">
</dsfr-data-source>

<!-- Âge et ancienneté : le jeu est « wide » (une colonne par tranche).
     unpivot le bascule en tidy, ce qui met la TRANCHE sur l'axe des catégories
     — là où l'original met l'année, dont il n'a qu'une valeur. -->
<dsfr-data-unpivot id="age" source="f"
  value-cols="etp_d_enseignants_de_moins_de_35_ans:Moins de 35 ans,
              etp_d_enseignants_de_35_a_moins_de_50_ans:35 à 50 ans,
              etp_d_enseignants_de_50_ans_ou_plus:Plus de 50 ans"
  var-name="tranche" value-name="etp"></dsfr-data-unpivot>
<dsfr-data-query id="age-agg" source="age"
  group-by="tranche" aggregate="etp:sum"></dsfr-data-query>

<dsfr-data-unpivot id="anc" source="f"
  value-cols="etp_d_enseignants_ayant_une_anciennete_dans_l_etablissement_de_moins_de_2_ans:Moins de 2 ans,
              etp_d_enseignants_ayant_une_anciennete_dans_l_etablissement_de_2_ans_a_moins_de_5_ans:2 à 5 ans,
              etp_d_enseignants_ayant_une_anciennete_dans_l_etablissement_de_5_ans_a_moins_de_8_ans:5 à 8 ans,
              etp_d_enseignants_ayant_une_anciennete_dans_l_etablissement_de_8_ans_ou_plus:8 ans et plus"
  var-name="anciennete" value-name="etp"></dsfr-data-unpivot>
<dsfr-data-query id="anc-agg" source="anc"
  group-by="anciennete" aggregate="etp:sum"></dsfr-data-query>

<!-- ============ Page ============ -->
<div class="fr-container fr-mt-6w">
  <h1>Les collèges français en chiffres : effectifs en équivalents temps plein
      et profils des personnels</h1>
  <p class="fr-text--lead">
    Rentrée 2024. 6&nbsp;987 collèges, 289&nbsp;592 équivalents temps plein au service des
    élèves, dont 218&nbsp;899 enseignants. Source&nbsp;: DEPP.
  </p>

  <div class="fr-grid-row fr-grid-row--gutters">
    <div class="fr-col-12 fr-col-md-3">
      <h2 class="fr-h6">Filtrer</h2>
      <dsfr-data-facets id="f" source="p2d"
        fields="reflibelle_region, libelle_departement, secteur, nature_de_l_etablissement, libelle_academie"
        labels="reflibelle_region:Région | libelle_departement:Département | secteur:Secteur | nature_de_l_etablissement:Type d'établissement | libelle_academie:Académie"
        display="reflibelle_region:select | libelle_departement:select | secteur:radio-inline"
        searchable="libelle_departement"
        url-sync url-params></dsfr-data-facets>
    </div>

    <div class="fr-col-12 fr-col-md-9">
      <h2 class="fr-h4">1. Les personnels — données clés</h2>
      <dsfr-data-kpi-group class="fr-mb-4w">
        <dsfr-data-kpi source="f" value="etp_total:sum" format="nombre" decimals="0"
          col="3" label="ETP au service des élèves"></dsfr-data-kpi>
        <dsfr-data-kpi source="f" value="etp_de_personnels_de_vie_scolaire:sum"
          format="nombre" decimals="0" col="3" label="ETP de vie scolaire"></dsfr-data-kpi>
        <dsfr-data-kpi source="f" value="etp_enseignants_hommes_et_femmes:sum"
          format="nombre" decimals="0" col="3" label="ETP enseignants"></dsfr-data-kpi>
        <!-- ratio : lu sur la source d'agrégat, en :max faute de group_by -->
        <dsfr-data-kpi source="ratios" value="pct_femmes:max" format="pourcentage"
          decimals="1" col="3" label="de femmes parmi les ETP enseignants"></dsfr-data-kpi>
      </dsfr-data-kpi-group>

      <h2 class="fr-h4">2. Statut et diplôme des enseignants</h2>
      <dsfr-data-kpi-group class="fr-mb-4w">
        <dsfr-data-kpi source="ratios" value="pct_agreges:max" format="pourcentage"
          decimals="1" col="4" label="d'agrégé(e)s"></dsfr-data-kpi>
        <dsfr-data-kpi source="ratios" value="pct_certifies:max" format="pourcentage"
          decimals="1" col="4" label="de certifié(e)s"></dsfr-data-kpi>
        <dsfr-data-kpi source="ratios" value="pct_non_titulaires:max" format="pourcentage"
          decimals="1" col="4" label="de non-titulaires"></dsfr-data-kpi>
      </dsfr-data-kpi-group>

      <div class="fr-grid-row fr-grid-row--gutters">
        <div class="fr-col-12 fr-col-lg-6">
          <dsfr-data-chart id="c-agr-reg" source="agr-reg" type="map-reg"
            code-field="code" value-field="pct_agreges"
            name="Part d'agrégés" unit-tooltip="%"
            selected-palette="sequentialAscending" heading-level="3"
            databox databox-title="Enseignants agrégés par région"
            databox-source="DEPP — fr-en-indicateurs_personnels_etablissements2d, rentrée 2024"
            databox-download databox-screenshot></dsfr-data-chart>
          <dsfr-data-a11y for="c-agr-reg" source="agr-reg" table download
            label-field="code" value-field="pct_agreges"></dsfr-data-a11y>
        </div>
        <div class="fr-col-12 fr-col-lg-6">
          <dsfr-data-chart id="c-agr-dep" source="agr-dep" type="map"
            code-field="code" value-field="pct_agreges"
            name="Part d'agrégés" unit-tooltip="%"
            selected-palette="sequentialAscending" heading-level="3"
            databox databox-title="Enseignants agrégés par département"
            databox-download></dsfr-data-chart>
          <dsfr-data-a11y for="c-agr-dep" source="agr-dep" table download></dsfr-data-a11y>
        </div>
      </div>
      <!-- idem pour pct_certifies -->

      <h2 class="fr-h4 fr-mt-4w">3. Âge et ancienneté des enseignants</h2>
      <div class="fr-grid-row fr-grid-row--gutters">
        <div class="fr-col-12 fr-col-lg-6">
          <dsfr-data-chart id="c-age" source="age-agg" type="bar" horizontal
            label-field="tranche" value-field="etp__sum"
            name="ETP enseignants" heading-level="3"
            databox databox-title="Répartition par âge" databox-download></dsfr-data-chart>
          <dsfr-data-a11y for="c-age" source="age-agg" table download></dsfr-data-a11y>
        </div>
        <div class="fr-col-12 fr-col-lg-6">
          <dsfr-data-chart id="c-anc" source="anc-agg" type="bar"
            label-field="anciennete" value-field="etp__sum"
            name="ETP enseignants" heading-level="3"
            databox databox-title="Ancienneté dans l'établissement"
            databox-download></dsfr-data-chart>
          <dsfr-data-a11y for="c-anc" source="anc-agg" table download></dsfr-data-a11y>
        </div>
      </div>

      <h2 class="fr-h4 fr-mt-4w">Les collèges un par un</h2>
      <dsfr-data-list source="f"
        columns="nom_de_l_etablissement, nature_de_l_etablissement, secteur, libelle_departement, etp_total, etp_enseignants_hommes_et_femmes"
        search sort="etp_total:desc" pagination="20"></dsfr-data-list>
    </div>
  </div>
</div>
```

> Note : l'esquisse remplace la lecture « en pourcentage du total enseignant » par une lecture
> « en ETP » sur les deux graphiques réécrits, parce qu'une fois la tranche mise sur l'axe des
> catégories, la somme des barres **est** le total : le pourcentage devient lisible dans
> l'infobulle sans le calculer. Pour rester au plus près de l'original (pourcentages), il faut
> quatre `dsfr-data-source` d'agrégat de plus, un par tranche — arbitrage à trancher au
> navigateur. **Non vérifié.**

## Limites et points durs identifiés

1. **Un ratio `sum(a)/sum(b)` n'est pas exprimable dans le pipeline client.**
   *Obstacle* : la grammaire de `dsfr-data-kpi value` et de `dsfr-data-query aggregate` est
   `champ:fonction` — `sum`, `avg`, `count`, `min`, `max`. Aucune expression, aucun quotient.
   Or **les quatre KPI de proportion, les quatre cartes et les sept séries de graphique de
   cette page sont tous des quotients de sommes** : c'est la forme dominante de l'objet.
   *Voie native essayée et retenue* : `select` ODSQL sur `dsfr-data-source` en mode adaptateur
   (`sum(a)/sum(b)*100 as pct`), qui fusionne bien avec les surcouches de facettes
   (`getEffectiveWhere()` documenté). Fonctionne, et reste déclaratif.
   *Coût* : une source par grille d'agrégation (globale, par région, par département) au lieu
   d'un `dsfr-data-query` par bloc, et le piège `limit="1"` + `value=":max"`.
   *Verdict* : **limite réelle mais contournée nativement**, à remonter comme demande
   d'évolution (`aggregate="ratio(a,b)"` ou une expression dans `value`), pas comme blocage.
   Sur quel type de jeu le contournement cesse de marcher : sur un provider **sans ODSQL**
   (Tabular, Grist, source générique), où il n'y a pas de `select` calculé — là, il faudrait
   charger les deux colonnes et faire le rapport à la main.

2. **Le faux ami : les colonnes `proportion_*` du jeu.**
   Le jeu porte `proportion_agreges`, `proportion_femmes_enseignantes`, etc. La tentation est
   d'écrire `value="proportion_agreges:avg"` et de se passer du point 1. **C'est faux** : la
   moyenne non pondérée des ratios par établissement n'est pas le ratio des sommes. Sur ce jeu,
   l'écart est structurel (un collège de 20 ETP pèse autant qu'un lycée de 200). L'original ne
   s'y trompe pas — il déclare `yField: proportion_agreges` mais l'ignore au profit de
   `customFunction`. **À ne pas reproduire en croyant simplifier.**

3. **Discrétisation de la choroplèthe.**
   *Obstacle* : `dsfr-data-chart` en `type="map"` / `map-reg` expose `code-field`,
   `value-field`, `selected-palette`, `map-highlight` — **aucun attribut de nombre de classes
   ni de méthode** (quantile, seuils manuels), contrairement à `dsfr-data-map-layer` qui a
   `classes`, `method`, `breaks`. Le défaut n° 6 de l'original (échelle linéaire écrasée par
   Mayotte) n'est donc **pas corrigeable par attribut** sur une carte DSFR Chart.
   *Voies possibles* : (a) écarter l'outlier par le `where` de la source — malhonnête ;
   (b) passer à `dsfr-data-map` + `dsfr-data-map-layer type="geoshape"` sur un GeoJSON de
   régions simplifié (`public/data/geo/regions-simplifiees.geojson` existe déjà dans le dépôt,
   métropole seulement, AM-016) avec `classes`/`method="quantile"` — mais on perd les DROM ;
   (c) laisser tel quel et le dire dans le texte.
   *Où remonter* : **chez `GouvernementFR/dsfr-chart`**, pas ici — c'est le composant natif qui
   décide de l'échelle (règle AM-022/AM-016). **Non vérifié au navigateur** : je n'ai pas
   mesuré ce que `sequentialAscending` produit sur ces valeurs.

4. **Pictogrammes couleur dans les KPI.**
   *Obstacle* : `dsfr-data-kpi icon` prend une **classe** d'icône (Remix icon), pas une image ;
   les quatre PNG illustrés de l'original (globe, famille, tableau noir, parité) n'ont pas
   d'équivalent.
   *Verdict* : **cosmétique**, et discutable — ces pictogrammes ne portent aucune information
   (ils sont en `alt=""`). Ne pas le compter comme un manque.

5. **Vignettes DROM cliquables sous la carte.**
   *Obstacle* : les cartes DSFR Chart sont des SVG entiers, sans mécanisme de navigation vers
   un territoire. L'original y ajoute cinq vignettes qui « zooment » le SVG.
   *Voie native* : `map-highlight="<code>"` met un territoire en avant, ce n'est pas la même
   chose. `dsfr-data-map` + GeoJSON + `insets="drom"` le ferait, mais c'est l'autre famille de
   composants.
   *Verdict* : **écart assumé**. Le besoin réel (voir les DROM) est déjà couvert : les cartes
   DSFR Chart les affichent, et le tableau `dsfr-data-a11y` donne la valeur exacte de chacun —
   ce que les vignettes sans libellé de l'original ne font pas.

6. **Le graphique « une seule catégorie » n'a pas à être reproduit.**
   Reproduire fidèlement `xField: annee_de_la_rentree_scolaire` sur un jeu à une seule rentrée
   produirait exactement le même non-sens. `dsfr-data-unpivot` met la tranche sur l'axe des
   catégories : c'est la même donnée, lisible. **Ce n'est pas une limite de `dsfr-data`, c'est
   un défaut de l'original qu'il ne faut pas transposer** — cas d'école de la règle du dépôt.
   *Réserve* : `dsfr-data-unpivot` bascule les lignes brutes ; sur 10 697 lignes × 3 colonnes
   = 32 091 lignes intermédiaires, tenable. Sur le jeu 1d (94 584 × 3), non — voir la fiche
   écoles. **Non vérifié au navigateur** : la chaîne unpivot → query → chart n'a pas été
   exécutée.

7. **`geolocalisation` et `max-items`.**
   Si l'on ajoute la carte de points que l'original n'a pas, 10 697 points dépassent le plafond
   de 5 000 de `dsfr-data-map-layer` : `max-items` à relever explicitement, sinon troncature
   silencieuse avec un bandeau « zoomez » qui ne charge rien (PG-013). Avec `cluster`, un
   plafond de 20 000 est sans risque.

8. **Ce que la transposition gagne**, à dire honnêtement : le domaine et la charte de l'État,
   un plan de titres valide, des tableaux de données sous chaque visuel, l'unité `%` partout,
   l'axe des catégories qui porte la bonne variable, les 39 lignes sans région écartées de
   l'échelle, des compteurs de facettes, une URL partageable, deux filtres de plus (année,
   nature), la donnée par établissement, et la carte de points que le jeu permettait depuis le
   début. **Quatorze des dix-neuf défauts relevés tombent d'eux-mêmes.**

## Données à reproduire fidèlement

- [ ] Jeu `fr-en-indicateurs_personnels_etablissements2d`, **rentrée 2024**, filtre
      `nature_de_l_etablissement like "Collège"` → **6 987** établissements
      (Collège 6 979 + climatique 2 + spécialisé 6).
- [ ] Secteur : Public **5 326** (247 962 ETP) / Privé **1 661** (41 630 ETP).
- [ ] KPI : **289 592** ETP totaux · **34 736** ETP vie scolaire · **218 899** ETP enseignants ·
      **65,1 %** de femmes.
- [ ] Statut : **5,6 %** agrégés · **80,3 %** certifiés/PEPS · **8,8 %** non titulaires.
- [ ] Âge : **19,6 %** < 35 ans · **43,3 %** 35-50 ans · **37,1 %** > 50 ans (somme 100).
- [ ] Ancienneté : **24,1 %** < 2 ans · **16,3 %** 2-5 ans · **12,8 %** 5-8 ans ·
      **46,8 %** ≥ 8 ans (somme 100).
- [ ] Carte régions, agrégés : de Auvergne-Rhône-Alpes **7,2 %** à Guyane **0,8 %** —
      **sans** le groupe `null` (5 collèges, 8,9 %) qui, dans l'original, définit seul la
      borne haute de l'échelle.
- [ ] Carte départements, agrégés : Paris **12,6 %** en tête, Guyane **0,8 %** en queue.
- [ ] Carte régions, certifiés : Normandie **84,2 %** en tête, Mayotte **39,6 %** en queue ;
      carte départements : Maine-et-Loire **85,9 %** … Mayotte **39,6 %**.
- [ ] Filtre `Corse` → **1 310 / 182 / 957 / 66,7 % / 4,0 % / 81,0 % / 10,6 %**, et
      la liste des départements réduite à Corse-du-Sud + Haute-Corse.
- [ ] Titres de blocs : « Représentation des enseignants agrégés par région / par département »,
      « Représentation des enseignant(e)s certifié(e)s par région », « Représentation des
      enseignants certifiés par département », « Répartition par âge », « Répartition par
      ancienneté dans l'établissement ».
- [ ] Trois filtres au minimum (région, département, secteur), cascade effective.
- [ ] **Et ce que la fidélité impose d'ajouter** : le signe `%`, le nom de l'indicateur dans
      l'infobulle de carte, et la mention que 39 établissements du jeu n'ont pas de région.

## Gabarit partagé

Les trois pages du triplet (Écoles id 9, **Collèges id 8**, Lycées id 7) sortent du même
gabarit Studio. Vérifié en comparant les trois configurations **servies** (pas celles de
l'API), bloc par bloc.

**Strictement identique entre collèges et lycées** — au point que ce sont les **mêmes UID de
blocs** (`block_MCKRZDB5DAQ91`, `block_MCKS1PD24KWWA`, `block_MCKS5YV2CN1XG`,
`block_MH0W4ASF24MIZ`…), les mêmes UID de filtres, la même section `filters`, les mêmes
`layout`, `displayFormat`, `colorsScale`, `bbox`, `navigationMaps`, les mêmes couleurs
`@chart[…]`, le même double espace « Moins  de 2 ans ». **Deux des quatre cartes ont même un
UID différent d'une page à l'autre** (`MH2B7WK6*` côté collèges, `MH0VNCYV*` côté lycées) :
signature d'un dupliquer-coller, pas d'un gabarit paramétré.

| | Écoles (id 9) | **Collèges (id 8)** | Lycées (id 7) |
|---|---|---|---|
| `uid` de page | `sp_w53z2w` | `sp_begi38` | `sp_98eklp` |
| Jeu des blocs | `…etablissements1d` | **`…etablissements2d`** | `…etablissements2d` |
| Jeu des filtres | **`…2d`** (aucun bloc ne l'utilise) | `…2d` | `…2d` |
| Condition de nature | **aucune** (le jeu 1d ne contient que des écoles) | `like "Collège"` | `like "Lycée"` |
| Rentrées dans le jeu | **2 (2024, 2025)** | 1 (2024) | 1 (2024) |
| Sections | 2 | **3** | 3 |
| KPI | **2** (dont 1 en erreur) | 7 | 7 |
| Cartes | **0** | 4 | 4 |
| Graphiques | 2 (**tous deux en erreur**) | 2 | 2 |
| Champ de dénominateur | `etp_d_enseignants_hommes_et_femmes` | `etp_enseignants_hommes_et_femmes` | `etp_enseignants_hommes_et_femmes` |
| Blocs fonctionnels | **1 sur 4** | 13 sur 13 | 13 sur 13 |

**Un seul gabarit `dsfr-data` suffirait-il pour les trois ?** Oui, et c'est la deuxième
factorisation du lot 12 après les quatre pages IPS — mais elle est plus intéressante, parce
qu'elle porte sur **deux jeux différents** et qu'elle explique les trois pannes de la page
écoles. Les paramètres du gabarit :

1. `dataset-id` (`…1d-numerique` ou `…2d`) ;
2. le nom du champ « ETP enseignants » — **`etp_d_enseignants_hommes_et_femmes` en 1d,
   `etp_enseignants_hommes_et_femmes` en 2d** : un `d_` de différence, et c'est cette
   divergence de nommage entre deux jeux frères du même producteur qui rend la factorisation
   nécessaire plutôt que triviale ;
3. le `where` de nature (`like 'Collège'` / `like 'Lycée'` / rien) ;
4. la liste des indicateurs disponibles — le jeu 1d n'a **ni** `etp_total`, **ni** vie
   scolaire, **ni** statut/diplôme, donc ni la section 2 ni les quatre cartes ;
5. le libellé du niveau (« collèges » / « lycées » / « écoles primaires et maternelles »).

Tout le reste — sources, facettes, unpivot âge/ancienneté, KPI, `dsfr-data-a11y`, mise en page
— est identique. **Les dix-neuf défauts relevés ici sont communs aux trois pages** (sauf ceux
qui n'existent que faute de bloc côté écoles) et se corrigent une fois. Surtout : le gabarit
`dsfr-data` **empêche par construction** les deux pannes de la page écoles, parce que le
`where` de nature et le jeu des filtres seraient les mêmes attributs sur la même source, au
lieu d'être dix-huit `conditions` recopiées et un `dataProviderUid` choisi bloc par bloc dans
un back-office.
