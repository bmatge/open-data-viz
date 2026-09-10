# GAR — les données sur les ressources numériques éducatives

- **URL** : https://data.education.gouv.fr/explore/assets/gar-les-donnees-sur-les-ressources-numeriques-educatives/view/
  (testé `curl -sIL` : **200 direct, aucune redirection**).
- **Id catalogue** : 6 · **Thématique** : Éducation.
- **Nature** : **page Opendatasoft Studio** (`uid: sp_c8g0ff`, `updated_at` **2026-05-15T20:23:05Z**).
  Configuration archivée dans
  **`docs/portail-education/_sources/gar-les-donnees-sur-les-ressources-numeriques-educatives.studio.json`**.
- **Titre** (H1 et fil d'Ariane) : « GAR - Les données sur les ressources numériques éducatives accessibles
  via le GAR ». `description` de l'actif : « GAR - les données sur les ressources numériques éducatives ».
- **Relevé visuel** : 2026-09-10, Chrome (extension), fenêtre 1440 × 690 CSS px.

## La page compose CINQ jeux de données

C'est sa particularité : contrairement aux autres cibles du lot, elle ne repose pas sur un jeu unique.
Cinq `data_providers` déclarés, tous **DNE — Ministère de l'Éducation Nationale DNE-SN1**, tous en
Licence Ouverte v2.0 sauf le dernier (**licence non renseignée**) :

| uid | Jeu | Lignes | Champs | Champ de mesure | Géo |
|---|---|---:|---:|---|---|
| `22ocpwk50n9` | `fr-en-gestionnaire-dacces-aux-ressources-gar-liste_des_ressources-2026` | **15 630** | 8 | *(comptage)* | non |
| `z5d9e3byobd` | `fr-en-gar-accedants_academie2024-2025` | **31** | 8 | `accedants` (int) | `geo_point` + `geo_shape` |
| `fqns71zu9eb` | `fr-en-gar-acces_academie` | **31** | 8 | `acces` (int) | idem |
| `uct5madnj4` | `fr-en-gar-affectations_academie2024-2025` | **31** | 8 | `affectations` (int) | idem |
| `sy2e0d0x86` | `fr-en-gar-acces_profil2024-2025` | **5** | 2 | `acces` (int) | non |

**Aucun de ces cinq jeux n'est dans `_JEUX.md`** : ils s'ajoutent à l'inventaire du lot 12.

Les trois jeux « par académie » sont **structurellement identiques** (`libelle_aca`,
`libelle_aca_majuscules`, `libelle_region_2016`, `code_academie`, `code_region_2016`, `geo_point`,
`geo_shape` + une colonne de mesure) et portent les **mêmes 31 lignes** : 30 académies + une ligne
**« Autres »** dont `libelle_aca_majuscules`, `code_academie`, `libelle_region_2016` et `geo_point` sont
**tous nuls**. La description du graphique 1 précise ce que couvre « Autres » : « **Saint Pierre et
Miquelon, Polynésie Française, Andorre** ».

Le jeu `fr-en-gar-acces_profil2024-2025` compte cinq lignes : **Elève 48 473 661 · Enseignants 5 255 190 ·
Documentaliste 197 081 · Autres 87 545 · `Null` 79 258** — la dernière étant la **chaîne littérale
« Null »**, pas une valeur manquante.

**Les données sont pré-agrégées à la source.** Il n'y a ni établissement, ni ressource individuelle, ni
série temporelle : chaque jeu est déjà un tableau de 31 ou 5 lignes. C'est le fait déterminant pour la
transposition (§ Architecture).

⚠️ **Incohérence entre deux sources.** `sum(acces)` vaut **54 096 270** sur `fr-en-gar-acces_academie` et
**54 092 735** sur `fr-en-gar-acces_profil2024-2025` — **3 535 accès d'écart**. Le KPI de la page affiche
le premier ; le camembert du bas décompose le second. Rien ne le signale.

⚠️ **Périmètre déclaré vs périmètre réel.** Le titre du bloc de texte dit « **2024 - 2025** », mais le jeu
`fr-en-gestionnaire-dacces-aux-ressources-gar-liste_des_ressources-**2026**` (celui du KPI « Nombre de
ressources », 15 630) est daté **2026** et `modified` au **2025-12-16**. Le premier chiffre de la page
n'est donc pas de la même campagne que les quatre autres.

## Objectif de la dataviz et informations véhiculées

- **Question** : « Quel est le volume d'usage du Gestionnaire d'accès aux ressources, et comment se
  répartit-il entre académies et entre profils d'utilisateurs ? »
  C'est un **bilan annuel de service**, publié en cinq chiffres et sept visualisations.
- **Message porté** : le GAR est un service de masse — **10,8 millions d'accédants**, **54 millions
  d'accès**, **86,5 millions d'affectations** — et son usage est **massivement élève** (48,5 M des 54 M
  d'accès, soit 89,6 %). Le second message, implicite, est la disparité académique : Versailles pèse
  6,3 M d'accès contre 39 857 pour la Guadeloupe, soit un rapport de 158.
- **Ce que l'utilisateur doit obtenir** : les cinq totaux nationaux, puis le détail par académie pour
  chacune des trois mesures, plus la ventilation par profil.
- **Ce qui n'est pas dans l'objet** :
  - **aucun filtre** : la section `filters` de la configuration est **vide** (`"layout": []`) ;
  - **aucune série temporelle** : pas de comparaison 2023-2024 / 2024-2025, alors que le millésime est
    dans le titre — le seul « historique » possible serait de comparer deux jeux, ce que la page ne fait pas ;
  - **aucun taux** : accès **par** accédant, affectations **par** ressource, aucune normalisation par
    effectif — pourtant la seule lecture qui rende les académies comparables ;
  - **aucune vue par ressource ni par éditeur**, alors que le jeu des 15 630 ressources porte `type`,
    `cout`, `libelle_de_l_editeur`, `libelle_du_distributeur_technique_dtr`,
    `libelle_du_distributeur_commercial_dcr` et `nouveau`. **Le jeu le plus riche de la page ne sert qu'à
    un comptage.**
  - **aucun établissement** : la carte des établissements déployés est une **page séparée**, renvoyée par
    un lien.

## Relevé visuel exhaustif, bloc par bloc

Ordre défini par `content.layouts.default` : **titre → 1 KPI → 4 KPI → renvoi + capture → carte → graphique
→ carte → graphique → carte → graphique → camembert**. Onze sections, aucune n'est une section `filters`.

### 0. Chrome de page

En-tête DSFR, fil d'Ariane « Catalogue › GAR - Les données sur le… › **Consultation** », H1 sur deux lignes,
icône signet. Bulle de chat magenta flottante.

### 1. Bloc titre (`block_MMT7H98XTKTER`, `type: text`, centré)

Contenu markdown littéral :
`"# \n\n---\n\n# \n\n---\n\n# **Données du GAR**\n\n# **2024 - 2025**\n\n---\n\n# "`

Soit **quatre `#` vides** et **trois filets** autour de deux titres réels. À l'écran : deux filets
horizontaux pleine largeur, un vide vertical d'environ 60 px, puis « **Données du GAR** » et
« **2024 - 2025** » en très gros centré, puis un troisième filet. **Trois titres de niveau 1 vides sont
donc injectés dans le DOM** — le bloc de texte est utilisé comme outil de mise en page.

### 2. KPI « Nombre de ressources » (`block_MMT5OF03D31JO`, `kpiType: simple`, `layout_title_only`)

Pleine largeur, encadré, libellé au-dessus, valeur en **magenta** en dessous :
**« Nombre de ressources » / 15 630**. `yFunction: count`, aucune condition, `maximumFractionDigits: 2`.
Vérifié : `records_count` du jeu = 15 630 ✔.

### 3. Section 4 KPI (`section_MMNOFEZF42X3T`, quatre colonnes)

| Bloc | Jeu | Formule | Libellé | Valeur lue |
|---|---|---|---|---|
| `MMNOFEZFUMTFN` | `…accedants_academie2024-2025` | `sum(accedants)` | Nombre d'accédants dans le GAR | **10 829 562** |
| `MMNOFEZFWXH9L` | `…acces_academie` | `sum(acces)` | Nombre d'accès aux ressources numériques pédagogiques | **54 096 270** |
| `MMT0FE1DWNEIX` | `…acces_profil2024-2025` | `sum(acces)` **où `profil = 'Elève'`** | Nombre d'accès … par les élèves | **48 473 661** |
| `MMP0600K6QOZQ` | `…affectations_academie2024-2025` | `sum(affectations)` | Nombre d'affectation des ressources | **86 549 678** |

Les quatre vérifiés à l'API ✔. Tous en notation `standard` (donc **« 86 549 678 » en toutes lettres**,
pas « 86,5 M »), 2 décimales max, magenta, libellé au-dessus.

Les libellés sont longs et **s'enroulent sur trois à cinq lignes** dans des cartes étroites, ce qui décale
verticalement les quatre valeurs les unes par rapport aux autres (relevé à l'écran : la valeur du 3<sup>e</sup>
KPI est 37 px plus bas que celle du 1<sup>er</sup>). « Nombre d'**affectation** » est au singulier.

### 4. Renvoi vers la carte des établissements (`section_MP75SJB46IAEJ`, deux colonnes)

**Gauche** (`block_MP753SV8SENMV`, `type: text`, centré) : deux filets, puis un **H1 markdown** entièrement
cliquable — « **Explorer la carte des établissements déployés dans le GAR** » — en très gros, souligné,
pointant vers `https://data.education.gouv.fr/explore/assets/test-carte-gar-etablissements-deployes/view/`.
Puis un filet, un H2 vide, un H3 « **en cliquant sur le titre ou en copiant le lien** », et **l'URL en
clair, non cliquable**, répétée en dessous.

**Droite** (`block_MP765WMAWARN9`, `type: media`, `fit: original`) : une **capture d'écran** de la page
cible (`/assets/theme_image/chrome-capture-2026-05-15.png`), avec son panneau de filtres, ses clusters
violets et son attribution Leaflet. `alt` = **l'URL de la cible**, pas une description.

Constats :
- la cible existe (200 vérifié) mais son slug commence par **`test-`** : une page de recette exposée en
  production, et référencée depuis une page publiée ;
- elle n'est pas dans la liste des 23 pages Studio du portail (`studio_pages/test-carte-gar-etablissements-deployes`
  → 404) : c'est donc, comme Ted-i, une **custom view** ;
- **une image fixe tient lieu d'aperçu** d'une carte interactive. Elle vieillira sans que personne
  s'en aperçoive.

### 5–10. Trois couples carte + graphique, un par mesure

Les trois blocs suivent le **même moule** : une carte POI, puis un graphique en colonnes.

#### Cartes (`block_MMNOFBP8IYONV`, `MMP297SQE9F9A`, `MMSZ5DZOE1IWE`)

`mapType: poi`, `layout_tt_ll` (titre + légende), basemap **`ign.planv2`**, moteur MaplibreGL, une seule
géométrie sur `geo_point`, une seule couche `points`, `dividedByCategory: **false**`, `style.type: circle`,
couleur unique `@chart[0]` (**bleu nuit**).

- **Titres** : « GAR- Les accédants dans le GAR par académie » (sans espace après le tiret),
  « GAR - Les données d'accès aux ressources numériques pédagogiques via le GAR par académie »,
  « GAR - Données d'affectation des ressources numériques pédagogiques dans le GAR par académie ».
- **`legendLabel` détourné en glossaire** : sous chaque carte s'affiche, en gras, non pas un titre de
  légende mais une **définition** — « Les accédants sont les élèves, enseignants, ou agents de l'éducation
  nationale, qui peuvent accéder aux ressources qui leur sont affectées dans le GAR. », « Accès : Connexion
  réussie à une ressource numérique via le GAR, caractérisée par la création d'une session GAR sur la
  ressource. », « L'affectation à une ressource crée une association entre un droit d'accès et un accédant
  du GAR. L'affectation rend la ressource visible dans le médiacentre (ENT ou ÉduGAR) et permet l'accès à
  la ressource par un lien. » Le même texte est **aussi** dans `styles.description`, donc affiché deux fois.
- 🐛 **L'entrée de légende porte l'identifiant technique du jeu.** Sous chaque carte, une pastille bleu nuit
  suivie de **« fr-en-gar-accedants_academie2024-2025 »**, **« fr-en-gar-acces_academie »**,
  **« fr-en-gar-affectations_academie2024-2025 »**. C'est la valeur par défaut de `categories[0].label`,
  jamais renseignée. Relevé à l'écran sur les trois cartes.
- 🐛 **Tous les cercles ont le même rayon.** `dividedByCategory: false` et aucun encodage de taille : une
  carte de quantités où la quantité n'est **pas** représentée. La valeur n'est lisible qu'au clic, un point
  à la fois. La carte n'apporte rien que le graphique en colonnes juste en dessous ne dise mieux.
- **Infobulle** (`layout_title_context`, ouverture au clic), relevée mot pour mot sur la carte 1 :
  ```
  Lille
  Accedants :
  865143
  ```
  Le titre vient de `libelle_aca` (carte 1) ou `libelle_aca_majuscules` (cartes 2 et 3) ; le libellé
  « **Accedants** » (sans accent) vient du schéma du jeu ; la valeur est **brute, sans séparateur de
  milliers**. Vérifié à l'API : Lille = 865 143 ✔.
- **Filtres d'exclusion, écrits en dur et incohérents d'une carte à l'autre :**

  | Carte | Clause | Effet |
  |---|---|---|
  | accédants | `code_academie != 33, 31, 28, 32, 43` | exclut Guyane, Martinique, La Réunion, Guadeloupe, Mayotte |
  | accès | `libelle_aca not_contains` **Guyane, Mayotte, Guyane (bis), Martinique, Mayotte (bis), Guadeloupe, La Réunion** | mêmes cinq, avec **Guyane et Mayotte listées deux fois** |
  | affectations | `libelle_aca not_contains` Guyane, Martinique, Guadeloupe, Mayotte, La Réunion | mêmes cinq |

  Deux syntaxes différentes (code / libellé) pour la même intention, et deux conditions dupliquées.
  La ligne « Autres » n'est pas exclue : elle disparaît d'elle-même, faute de `geo_point`.
  **Résultat : 25 points sur les trois cartes** (31 − 5 DROM − « Autres »).
- **Cadrage** : métropole + Corse, France entière visible, environ 30 % de la surface occupée par
  l'Allemagne, l'Espagne et l'Italie. Contrôles `+`/`−`, plein écran. Mention
  « **Utilisez ⌘ + molette pour zoomer la carte.** » (le zoom molette seul est neutralisé, contrairement
  à la page Ted-i).
- **Aucun encart ultramarin** : les cinq académies d'outre-mer sont simplement absentes des cartes, alors
  qu'elles figurent dans les graphiques juste en dessous. Rien ne le dit.

#### Graphiques en colonnes (`block_MMP1SX70EYWGG`, `MMSXDSA6SW0YN`, `MMT074PT5D416`)

`comparison.columns`, `layout_xy_tt_gr`, une série, couleur `@chart[2]` (**bleu-violet**),
`displayFormat: compact_short` (axe Y en « 1 M », « 7 M », « 10 M »), `order: {by: x, direction: asc}`
— donc **tri alphabétique**, pas par valeur.

| # | Titre | `xField` | Agrégat | Axe X | Axe Y | Barres |
|---|---|---|---|---|---|---|
| 1 | GAR - Les accédants dans le GAR par académie | **`libelle_aca`** | `sum(accedants)` | « Académie » | 🐛 « **nombre d'accès fournis** » | **31**, casse mixte |
| 2 | GAR - Les données d'accès … par académie | **`libelle_aca_majuscules`** | `sum(acces)` | « Académie » | « nombre d'accès fournis » | **30**, CAPITALES |
| 3 | GAR - Données d'affectation … par académie | **`libelle_aca_majuscules`** | `sum(affectations)` | « Académie » | « Nombre d'affectations » | **30**, CAPITALES |

🐛 **Trois graphiques jumeaux, trois traitements différents :**
1. le graphique 1 groupe sur `libelle_aca` (casse mixte) : ses étiquettes sont
   *Aix-Marseille, Amiens, **Autres**, Besançon, Bordeaux, Clermont-Ferrand, Corse, Créteil, Dijon,
   Grenoble, Guadeloupe, Guyane, La Réunion, Lille, Limoges, Lyon, Martinique, Mayotte, Montpellier,
   Nancy-Metz, Nantes, Nice, Normandie, Orléans-Tours, Paris, Poitiers, Reims, Rennes, Strasbourg,
   Toulouse, Versailles* — **31 barres**, dont une minuscule pour « Autres » (7 189, quasi invisible entre
   Amiens et Besançon) ;
2. les graphiques 2 et 3 groupent sur `libelle_aca_majuscules`, qui est **nul pour la ligne « Autres »** :
   la catégorie disparaît sans qu'aucune barre vide ne soit rendue. **30 barres**, et **1 935 accès /
   25 281 affectations manquent au total**.
3. le graphique 1 affiche donc des libellés accentués en casse mixte, les deux autres des CAPITALES non
   accentuées (« BESANCON », « CRETEIL », « LA REUNION »). Trois graphiques qui devraient se lire ensemble,
   trois conventions typographiques.

🐛 **L'axe Y du graphique 1 est intitulé « nombre d'accès fournis » alors qu'il compte des accédants.**
Vérifié dans la configuration (`yLabel: "nombre d'accès fournis"` sur un bloc titré « Les accédants ») et
à l'écran. Copié-collé depuis le graphique des accès. Les deux libellés commencent en outre par une
**minuscule**, contrairement au troisième (« Nombre d'affectations »).

**Valeurs de référence, vérifiées à l'API** (les trois jeux, 31 lignes chacun) :

| Académie | Accédants | Accès | Affectations |
|---|---:|---:|---:|
| Versailles | 747 564 | **6 312 657** | **11 343 027** |
| Créteil | **987 220** | 3 859 850 | 8 390 137 |
| Nancy-Metz | 413 632 | 5 236 932 | 5 750 736 |
| Lille | 865 143 | 983 336 | 1 651 569 |
| Strasbourg | 354 449 | 3 864 026 | 3 290 345 |
| Bordeaux | 584 983 | 1 918 590 | 5 634 981 |
| … | … | … | … |
| Guadeloupe | 95 059 | **39 857** | 263 512 |
| **Autres** | **7 189** | **1 935** | **25 281** |
| **Total** | **10 829 562** | **54 096 270** | **86 549 678** |

Trois classements très différents : Créteil est premier en accédants, Versailles en accès et en
affectations, et Lille — deuxième en accédants — n'est que quinzième en accès. **La page ne rapproche
jamais les trois mesures**, alors que c'est là que se trouve l'information (le taux d'usage par accédant).

### 11. Camembert par profil (`block_MMT0FE1DMKWYI`, `composition.pie`, `layout_tt_se_na_va`)

- `xField: profil`, `sum(acces)`, `order by series desc`, `displayFormat: compact_short`.
- **Conditions** (relevées telles quelles dans la configuration) :
  `contains "Enseignants"` **and** `or contains "Documentaliste"` **or** `contains "Elève"` **and**
  `not_contains "Elève"`. Quatre clauses dont deux s'annulent : le résultat net est
  « Enseignants ou Documentaliste ».
- **Rendu à l'écran** : un **camembert plein** à **deux secteurs**, étiquettes posées sur les parts —
  « **Enseignants 5,3 M** » (bleu nuit, 96,4 %) et « **Documentaliste 197,1 k** » (indigo, 3,6 %).
- 🐛 **« Hors élèves » exclut aussi « Autres » (87 545) et « Null » (79 258)** : **166 803 accès**,
  soit 3 % du hors-élèves, disparaissent sans mention. Le titre promet un complément, il livre une
  sélection.
- Un camembert à deux parts dont l'une fait 3,6 % : la forme ne dit rien qu'une phrase ne dirait mieux.
- **Aucun libellé d'axe, aucune légende séparée** (`layout_tt_se_na_va`), et aucune définition du profil
  « Documentaliste » alors que les trois cartes en donnaient une pour chaque mesure.

### 12. Kebab « ⋮ » et pied de page

Kebab sur chaque KPI, chaque carte et chaque graphique. Pied de page : « Conditions d'utilisation |
Politique de confidentialité | Gestion des cookies ».

## Défauts et bizarreries de l'original — récapitulatif

1. **Trois cartes de quantités où la quantité n'est pas représentée** : cercles de rayon uniforme,
   valeur lisible seulement au clic, un point à la fois.
2. **La légende de chaque carte affiche l'identifiant technique du jeu** (`fr-en-gar-acces_academie`…).
3. **Cinq académies ultramarines exclues des cartes**, présentes dans les graphiques, sans mention ni encart.
4. **Deux syntaxes d'exclusion différentes** entre la carte 1 (codes) et les cartes 2-3 (libellés), avec
   **Guyane et Mayotte listées deux fois** dans la carte 2.
5. **La catégorie « Autres » disparaît de deux graphiques sur trois** (`libelle_aca_majuscules` nul) :
   1 935 accès et 25 281 affectations manquants, sans barre vide.
6. **Trois conventions typographiques** pour la même liste d'académies : casse mixte accentuée (graphique 1),
   CAPITALES non accentuées (graphiques 2-3 et infobulles 2-3).
7. **L'axe Y du graphique des accédants dit « nombre d'accès fournis »** — copié-collé.
8. **Le camembert « hors élèves » écarte silencieusement 166 803 accès** (« Autres » et « Null »).
9. **Une valeur `profil` vaut littéralement la chaîne « Null »** dans le jeu source.
10. **Deux sources se contredisent de 3 535 accès** (54 096 270 vs 54 092 735) ; la page affiche l'une
    et décompose l'autre.
11. **Le KPI « Nombre de ressources » vient d'un jeu millésimé 2026** sous un titre « 2024 - 2025 ».
12. **Quatre `#` markdown vides** dans le bloc de titre : trois H1 vides injectés dans le DOM.
13. **Un H1 markdown sert de lien** vers une autre page, et l'URL est répétée en clair juste en dessous,
    non cliquable.
14. **La page cible du renvoi a un slug `test-`** : une recette exposée en production.
15. **Une capture d'écran fixe tient lieu d'aperçu d'une carte interactive**, avec l'URL en `alt`.
16. **Les infobulles affichent des nombres bruts** (« 865143 »).
17. **La définition de chaque mesure est affichée deux fois** (`legendLabel` + `description`).
18. **Libellés de KPI longs et non alignés**, « Nombre d'affectation » au singulier.
19. **Aucun filtre**, aucune synchronisation d'URL, aucune comparaison temporelle, aucun ratio.
20. **Le jeu le plus riche (15 630 ressources, 8 colonnes : type, coût, éditeur, distributeurs, nouveauté)
    ne sert qu'à afficher son nombre de lignes.**

## Transposition vers `dsfr-data`

### Architecture retenue et pourquoi

**Le volume n'est pas un sujet ici** : 31 + 31 + 31 + 5 = 98 lignes de données agrégées, plus un jeu de
15 630 lignes dont la page n'utilise que le compte. Tout tient côté client, sans discussion. Chronométrer
serait du zèle : les trois jeux « académie » font moins de 20 Ko chacun en `/exports/json`.

La vraie question d'architecture est ailleurs : **la page compose cinq sources, et c'est ce que
`dsfr-data` fait le plus naturellement.** Une `dsfr-data-source` par jeu, et — puisque les trois jeux
académiques partagent la clé `libelle_aca_majuscules` — un **`dsfr-data-join`** qui les réunit en une
seule table de 31 lignes portant `accedants`, `acces` et `affectations` côte à côte. C'est ce que
l'original ne fait pas, et c'est ce qui manque le plus à sa lecture.

⚠️ **Piège de jointure à payer d'avance.** `dsfr-data-join on="cle"` compare les clés **converties en
chaîne, sans trim** ; `null` et `""` valent tous deux la clé vide et **se joignent entre eux**. La ligne
« Autres » a `libelle_aca_majuscules = null` dans les trois jeux : elle se joindrait à elle-même, ce qui
est ici le comportement voulu — mais il faut le savoir. Joindre plutôt sur **`libelle_aca`**, qui est
renseigné partout (« Autres » compris) et unique : c'est la clé sûre.

### Correspondance bloc à bloc

| Bloc Studio | Composant + attributs `dsfr-data` |
|---|---|
| 5 `data_providers` | 5 `<dsfr-data-source api-type="opendatasoft" base-url="https://data.education.gouv.fr" dataset-id="…">` |
| aucun lien entre les 3 jeux académiques | `<dsfr-data-join id="aca" sources="s-acced,s-acces,s-affect" on="libelle_aca">` → **une** table de 31 lignes, 3 mesures. Joindre sur `libelle_aca` et **pas** sur `libelle_aca_majuscules`, nul pour « Autres » |
| `block type: text` fait de `#` vides | HTML DSFR (`fr-h1` + `fr-hr`). Pas de titres vides |
| `kpi simple`, `layout_title_only`, `count` | `<dsfr-data-kpi source="s-ress" value="count" format="nombre" heading="Catalogue GAR" label="ressources référencées">` — `heading` est le surtitre, `label` le sous-titre |
| `sum(accedants)`, `sum(acces)`, `sum(affectations)` | `value="accedants:sum"` etc. (grammaire `champ:fn`) |
| valeurs à 8 chiffres en notation `standard` | `format="compact"` → « 86,5 M » (l'attribut est absent du JSDoc du KPI mais documenté dans `attributeGrammars` ; AM-031). Garder la valeur exacte dans le `dsfr-data-a11y` |
| `sum(acces) where profil = 'Elève'` | `<dsfr-data-query id="q-eleve" source="s-profil" where="profil:eq:Elève">` + KPI dessus — syntaxe **colon** obligatoire sur `dsfr-data-query` |
| les 4 KPI côte à côte | `<dsfr-data-kpi-group>` + `col="3"`. **Ne pas** poser `display:block` dessus, c'est une grille (PG-011) |
| **manque** : aucun ratio | `<dsfr-data-normalize compute="acces_par_accedant:acces/accedants">` sur la table jointe, puis un KPI et un graphique. **Grammaire `compute` non vérifiée** — à relire dans la référence de `dsfr-data-normalize` avant d'écrire |
| `block map` `mapType: poi`, cercles de rayon uniforme | **`<dsfr-data-map-layer type="circle" radius-field="accedants" radius-min="6" radius-max="34">`** — l'auto-échelle des rayons est native. C'est le correctif du défaut n° 1 |
| une carte par mesure, trois fois le même fond | **une seule** carte + trois couches, ou mieux : `<dsfr-data-chart type="map-aca" code-field="libelle_aca_majuscules" value-field="accedants" selected-palette="sequentialAscending">` — la **choroplèthe par académie** de DSFR Chart. `code-field` attend le **nom d'académie en majuscules**, exactement le format de `libelle_aca_majuscules` (AIX-MARSEILLE, CRETEIL, LA REUNION…). **Voie native à essayer en premier ; non vérifiée au rendu.** Une limite éventuelle de `map-aca` se remonte chez `GouvernementFR/dsfr-chart`, pas ici (AM-022) |
| basemap `ign.planv2` | `tiles="ign-plan"` + **`tiles-style="muted"`** (#686) — natif, **rend obsolète** le contournement CSS `odv-fond-attenue` d'AM-017 |
| 5 académies ultramarines exclues en dur | on ne les exclut **pas** : `insets="guadeloupe,martinique,guyane,la-reunion,mayotte"`. Le clip du fit sur la métropole devient automatique dès qu'un encart ultramarin est posé (`resolveFitZone()`), et `dsfr-data-map-inset { width: 18% }` évite les 10 rem par défaut (AM-032) |
| `legendLabel` détourné en définition | `<dsfr-data-map-legend for="couche" label="Accédants par académie">` pour la **légende**, et la définition dans un `databox-tooltip-content` ou un `fr-callout` — deux fonctions, deux emplacements |
| entrée de légende = id du jeu | disparaît : `getLegendEntries()` produit les classes de `radius-field`/`fill-field`, et `label` nomme l'entrée d'une couche monochrome |
| popup `layout_title_context`, valeur brute | `<dsfr-data-map-popup title-field="libelle_aca">` + `<template>`. Le séparateur de milliers passe par `dsfr-data-normalize` en amont — **il n'y a pas de format dans un template** (AM-039 : ni conditionnelle, ni format) |
| `comparison.columns`, `order by x asc` | `<dsfr-data-chart type="bar" horizontal label-field="libelle_aca" value-field="accedants" name="Accédants">` sur la table jointe, `order-by="accedants:desc"` dans une `dsfr-data-query` — **le tri par valeur, pas alphabétique** |
| 3 graphiques jumeaux, 3 conventions | **un seul** graphique multi-séries : `value-field="accedants" value-fields="acces, affectations" name='["Accédants","Accès","Affectations"]'`. Un `name` en **tableau JSON** est la forme prévue pour le multi-séries ; une chaîne simple suffit pour une série unique (AM-023) |
| « Autres » absent de deux graphiques sur trois | `empty-label="Autres territoires"` sur le chart, ou — mieux — la jointure sur `libelle_aca` conserve la ligne partout |
| axe Y « nombre d'accès fournis » sur les accédants | corrigé : un axe par série, libellés justes |
| `composition.pie` à 2 secteurs, conditions contradictoires | `<dsfr-data-query source="s-profil" where="profil:neq:Elève" order-by="acces:desc">` + `<dsfr-data-chart type="bar" horizontal>` — **quatre barres** (Enseignants, Documentaliste, Autres, Null) plutôt que deux parts d'un camembert. La règle du guide `chartTypes` : le camembert vaut pour des parts d'un tout, 5 à 7 segments |
| `profil = "Null"` (chaîne littérale) | `<dsfr-data-normalize replace-fields="profil:Null:Profil non renseigné">` — **grammaire non vérifiée** ; AM-038 rappelle que les deux-points sont réservés et la comparaison stricte, ce qui convient ici (« Null » n'en contient pas) |
| kebab « Exporter au format PNG/CSV » | `databox databox-download databox-screenshot databox-source="DNE-SN1 — GAR 2024-2025"` |
| kebab « View dataset source » | `databox-actions='["Voir le jeu de données"]'` |
| **manque** : le jeu des 15 630 ressources inexploité | `<dsfr-data-facets source="s-ress" fields="type, cout, libelle_de_l_editeur, nouveau" display="type:select \| cout:select">` + `<dsfr-data-list source="…" columns="titre, type, cout, libelle_de_l_editeur" search sort pagination="20">`. C'est l'apport le plus évident de la transposition |
| **manque** : aucun filtre transverse | `<dsfr-data-context sources="…">` + `<dsfr-data-context-tags>` |
| **manque** : URL partageable | `url-sync url-params` |
| **manque** : accessibilité | `<dsfr-data-a11y for="…" source="…" table download>` sous chaque graphique |

### Esquisse de code

```html
<!-- ================= Cinq sources, 98 lignes d'agrégats + un catalogue ================= -->
<dsfr-data-source id="s-acced" api-type="opendatasoft" base-url="https://data.education.gouv.fr"
  dataset-id="fr-en-gar-accedants_academie2024-2025"></dsfr-data-source>
<dsfr-data-source id="s-acces" api-type="opendatasoft" base-url="https://data.education.gouv.fr"
  dataset-id="fr-en-gar-acces_academie"></dsfr-data-source>
<dsfr-data-source id="s-affect" api-type="opendatasoft" base-url="https://data.education.gouv.fr"
  dataset-id="fr-en-gar-affectations_academie2024-2025"></dsfr-data-source>
<dsfr-data-source id="s-profil" api-type="opendatasoft" base-url="https://data.education.gouv.fr"
  dataset-id="fr-en-gar-acces_profil2024-2025"></dsfr-data-source>
<dsfr-data-source id="s-ress" api-type="opendatasoft" base-url="https://data.education.gouv.fr"
  dataset-id="fr-en-gestionnaire-dacces-aux-ressources-gar-liste_des_ressources-2026"
  max-records="20000"></dsfr-data-source>
<!-- max-records explicite : 15 630 lignes, le plafond ODS par défaut est 1 000 et tronque EN SILENCE. -->

<!-- Ce que l'original ne fait pas : réunir les trois mesures sur la même ligne.
     Clé = libelle_aca (renseigné partout, « Autres » compris) et NON libelle_aca_majuscules,
     qui est null pour « Autres » — deux nulls se joignent entre eux (piège de dsfr-data-join). -->
<dsfr-data-join id="aca" sources="s-acced,s-acces,s-affect" on="libelle_aca"></dsfr-data-join>

<dsfr-data-query id="aca-tri" source="aca" order-by="accedants:desc"></dsfr-data-query>
<dsfr-data-query id="profil-hors-eleves" source="s-profil"
  where="profil:neq:Elève" order-by="acces:desc"></dsfr-data-query>

<div class="fr-container fr-mb-8w">

  <h1 class="fr-h2">Le GAR en 2024-2025</h1>
  <p class="fr-text--lead">Gestionnaire d'accès aux ressources numériques éducatives.</p>

  <!-- ================= Les cinq chiffres ================= -->
  <dsfr-data-kpi-group class="fr-mb-2w">
    <dsfr-data-kpi source="s-ress" value="count" format="nombre" col="4"
      heading="Catalogue 2026" label="ressources référencées"></dsfr-data-kpi>
    <dsfr-data-kpi source="s-acced" value="accedants:sum" format="compact" col="4"
      heading="2024-2025" label="accédants"></dsfr-data-kpi>
    <dsfr-data-kpi source="s-acces" value="acces:sum" format="compact" col="4"
      heading="2024-2025" label="accès aux ressources"></dsfr-data-kpi>
    <dsfr-data-kpi source="q-eleve" value="acces:sum" format="compact" col="6"
      heading="Dont élèves" label="accès (89,6 % du total)"></dsfr-data-kpi>
    <dsfr-data-kpi source="s-affect" value="affectations:sum" format="compact" col="6"
      heading="2024-2025" label="affectations de ressources"></dsfr-data-kpi>
  </dsfr-data-kpi-group>

  <div class="fr-callout fr-mb-4w">
    <p class="fr-callout__text fr-text--sm">
      <strong>Accédant</strong> : élève, enseignant ou agent qui peut accéder aux ressources qui lui sont
      affectées. <strong>Accès</strong> : connexion réussie à une ressource, matérialisée par une session
      GAR. <strong>Affectation</strong> : association entre un droit d'accès et un accédant, qui rend la
      ressource visible dans le médiacentre (ENT ou ÉduGAR).
    </p>
  </div>

  <!-- ================= Une carte, trois mesures, DROM compris ================= -->
  <h2 class="fr-h4">Les accédants par académie</h2>
  <dsfr-data-map name="Accédants au GAR par académie" center="46.6,2.3" zoom="6" height="560px"
    tiles="ign-plan" tiles-style="muted" fit-bounds fit-max-zoom="9"
    insets="guadeloupe,martinique,guyane,la-reunion,mayotte">
    <!-- Le rayon PORTE la quantité : c'est ce qui manque à l'original. -->
    <dsfr-data-map-layer id="c-acced" source="aca" type="circle" geo-field="geo_point"
      radius-field="accedants" radius-min="6" radius-max="34" fill-opacity="0.6"></dsfr-data-map-layer>
    <dsfr-data-map-legend for="c-acced" label="Accédants au GAR"></dsfr-data-map-legend>
    <dsfr-data-map-popup for="c-acced" title-field="libelle_aca">
      <template>
        <p class="fr-text--sm"><strong>{{accedants}}</strong> accédants</p>
        <p class="fr-text--sm">{{acces}} accès · {{affectations}} affectations</p>
      </template>
    </dsfr-data-map-popup>
  </dsfr-data-map>
  <p class="fr-hint-text">La ligne « Autres » (Saint-Pierre-et-Miquelon, Polynésie française, Andorre —
    7 189 accédants) n'a pas de coordonnées et n'apparaît pas sur la carte.</p>

  <!-- ================= UN graphique pour les trois mesures ================= -->
  <h2 class="fr-h4 fr-mt-4w">Les trois mesures, académie par académie</h2>
  <div class="odv-chart-slot">
    <dsfr-data-chart id="g-aca" source="aca-tri" type="bar" horizontal
      label-field="libelle_aca"
      value-field="accedants" value-fields="acces, affectations"
      name='["Accédants","Accès","Affectations"]'
      empty-label="Autres territoires"
      databox databox-title="GAR par académie, 2024-2025"
      databox-source="DNE-SN1 — fr-en-gar-*_academie" databox-download databox-screenshot
      heading-level="3"></dsfr-data-chart>
    <dsfr-data-a11y for="g-aca" source="aca-tri" table download></dsfr-data-a11y>
  </div>

  <!-- ================= Profils : des barres, pas un camembert à deux parts ================= -->
  <h2 class="fr-h4 fr-mt-4w">Les accès hors élèves</h2>
  <div class="odv-chart-slot">
    <dsfr-data-chart id="g-profil" source="profil-hors-eleves" type="bar" horizontal
      label-field="profil" value-field="acces" name="Accès"
      databox databox-title="Accès hors élèves par profil"
      databox-source="DNE-SN1 — fr-en-gar-acces_profil2024-2025" databox-download></dsfr-data-chart>
    <dsfr-data-a11y for="g-profil" source="profil-hors-eleves" table download></dsfr-data-a11y>
  </div>

  <!-- ================= Le catalogue, que l'original n'exploite pas ================= -->
  <h2 class="fr-h4 fr-mt-4w">Les 15 630 ressources du GAR</h2>
  <dsfr-data-search id="q-ress" source="s-ress" fields="titre, libelle_de_l_editeur"
    label="Rechercher une ressource" operator="words" count url-sync></dsfr-data-search>
  <dsfr-data-facets id="f-ress" source="q-ress" fields="type, cout, nouveau, libelle_de_l_editeur"
    labels="type:Type | cout:Coût | nouveau:Nouveauté | libelle_de_l_editeur:Éditeur"
    display="type:select | cout:select" searchable="libelle_de_l_editeur"
    max-values="8" url-sync url-params></dsfr-data-facets>
  <dsfr-data-list source="f-ress"
    columns="titre, type, cout, libelle_de_l_editeur, libelle_du_distributeur_commercial_dcr"
    sort pagination="20"></dsfr-data-list>

</div>
```

## Limites et points durs identifiés

1. **La choroplèthe par académie (`type="map-aca"`) est-elle exploitable telle quelle ?**
   *Constat* : le guide `chartTypes` dit que `code-field` attend « le nom d'académie en majuscules :
   PARIS, LYON, STRASBOURG… », et `libelle_aca_majuscules` fournit exactement ce format pour les
   30 académies. **Non vérifié au rendu** : il reste à contrôler que les 30 valeurs du jeu correspondent
   au découpage attendu (notamment NORMANDIE, code académie 70, fusion de Caen et Rouen ; ORLEANS-TOURS ;
   NANCY-METZ) et ce que `getSkippedCount()` renvoie.
   *Verdict provisoire* : **voie native la plus prometteuse de cette page**, à essayer avant tout
   contournement. Si une valeur ne correspond pas, le manque est chez `GouvernementFR/dsfr-chart`, pas
   chez `dsfr-data` (AM-022).

2. **Le format des nombres dans un template de popup.**
   *Obstacle* : les templates de `dsfr-data-map-popup` interpolent la valeur brute ; il n'existe ni format,
   ni conditionnelle (AM-039). « 865143 » resterait « 865143 » — le défaut n° 16 de l'original.
   *Voie native* : `dsfr-data-normalize` en amont, qui peut produire un champ texte formaté ; ou, sur une
   source ODS, un `select` avec une expression de formatage.
   *Contournement* : un champ dérivé `accedants_txt`.
   *Verdict* : **manque réel, déjà connu** (AM-039). Rien de nouveau à remonter, mais la page le rencontre
   à trois endroits.

3. **`dsfr-data-join` sur trois sources.**
   *Obstacle* : la référence documente `on="cle"` ou `on="cle_gauche=cle_droite"` et le multi-clé par
   virgule. **Le nombre de sources joignables n'est pas explicité dans la section relue** ; l'attribut
   `sources="a,b,c"` de l'esquisse ci-dessus est **à vérifier** — il se peut qu'il faille chaîner deux
   `dsfr-data-join`.
   *Verdict* : **point à vérifier avant d'écrire la page**, pas une limite constatée.

4. **Le ratio accès / accédant.**
   *Obstacle* : `dsfr-data-normalize compute` calcule ligne à ligne — ce qui suffit ici, puisque la
   jointure a mis les deux mesures sur la même ligne. **Grammaire de `compute` non relue** dans cette
   session.
   *Verdict* : **à vérifier**, mais l'architecture (join puis compute) est la bonne, et elle produit la
   lecture que l'original ne donne pas.

5. **Un camembert à deux secteurs.**
   *Constat* : `dsfr-data-chart type="pie" fill` le reproduit sans difficulté. La reproduction n'est pas
   le problème — le choix de forme l'est. Le guide `chartTypes` réserve le camembert à « 5-7 segments
   maximum » de parts d'un tout ; deux parts à 96 / 4 ne se lisent pas.
   *Verdict* : **non-problème de capacité, écart de forme assumé.** Exactement le cas visé par la règle la
   plus importante du dépôt : ce n'est pas la bibliothèque qui limite, c'est l'idée de recopier.

6. **Les trois cartes ne sont pas une contrainte.**
   *Constat* : reproduire trois cartes POI identiques serait facile, et inutile. `dsfr-data` offre trois
   voies supérieures pour la même intention — `radius-field` (cercles proportionnels), `fill-field`
   (choroplèthe sur GeoJSON), `type="map-aca"` (choroplèthe académique DSFR Chart). **Aucune limite à
   déclarer ici** ; c'est un endroit où la transposition est franchement meilleure que l'original.

7. **Ce que la transposition gagne** : une carte où la taille dit la quantité, les cinq académies
   ultramarines rendues en encarts au lieu d'être supprimées, une légende qui nomme la mesure au lieu du
   jeu, un graphique unique où les trois mesures se comparent, la catégorie « Autres » présente partout,
   un tri par valeur, un ratio accès/accédant, des barres au lieu d'un camembert à deux parts, une URL
   partageable, un tableau accessible sous chaque graphique — et **un catalogue de 15 630 ressources
   enfin explorable**, avec recherche, facettes (type, coût, éditeur, nouveauté) et tableau paginé.
   **Quinze des vingt défauts relevés tombent.**

## Données à reproduire fidèlement

- [ ] **Cinq jeux**, avec leur millésime réel : `…liste_des_ressources-2026` (15 630),
      `…accedants_academie2024-2025` (31), `…acces_academie` (31), `…affectations_academie2024-2025` (31),
      `…acces_profil2024-2025` (5).
- [ ] **Cinq totaux** : 15 630 ressources · **10 829 562** accédants · **54 096 270** accès ·
      **48 473 661** accès élèves · **86 549 678** affectations.
- [ ] **31 lignes académiques**, dont « **Autres** » (Saint-Pierre-et-Miquelon, Polynésie française,
      Andorre) : 7 189 accédants / 1 935 accès / 25 281 affectations. **Elle doit apparaître partout.**
- [ ] **Extrêmes** : Créteil 987 220 accédants (1<sup>er</sup>), Versailles 6 312 657 accès et
      11 343 027 affectations (1<sup>er</sup> sur ces deux mesures), Guadeloupe 39 857 accès (dernière hors
      « Autres »), Lille 865 143 accédants mais seulement 983 336 accès.
- [ ] **Cinq académies ultramarines** (Guadeloupe, Guyane, Martinique, Mayotte, La Réunion) : présentes,
      en encarts, pas supprimées.
- [ ] **Profils** : Elève 48 473 661 · Enseignants 5 255 190 · Documentaliste 197 081 · Autres 87 545 ·
      « Null » 79 258 — les **cinq**, pas deux.
- [ ] **Écart de 3 535 accès** entre `acces_academie` (54 096 270) et `acces_profil` (54 092 735) :
      à mentionner, pas à masquer.
- [ ] **Définitions** d'accédant, accès et affectation, une fois chacune, dans un encadré — pas dans une
      légende de carte, et pas en double.
- [ ] Titres des blocs : « Nombre de ressources », « Nombre d'accédants dans le GAR », « Nombre d'accès aux
      ressources numériques pédagogiques », « Nombre d'accès aux ressources numériques pédagogiques par les
      élèves », « Nombre d'affectation des ressources », et les trois titres « GAR - … par académie ».
- [ ] Renvoi vers la carte des établissements déployés
      (`/explore/assets/test-carte-gar-etablissements-deployes/view/`) — en **lien DSFR**, pas en H1, et
      sans capture d'écran fixe.
