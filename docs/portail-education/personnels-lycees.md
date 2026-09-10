# Les personnels dans les lycées français

> **Page sœur de `personnels-colleges.md`.** Le gabarit, le domaine, le jeu, les filtres, les
> sept KPI, les quatre cartes, les deux graphiques, les dix-neuf défauts et toute la
> transposition y sont décrits **en entier**. Cette fiche ne traite que ce qui diffère.
> Lire `personnels-colleges.md` d'abord — en particulier son § « ⚠️ Piège de méthode neuf »
> (la config Studio de l'API n'est pas celle qui est servie) et son § « Le domaine ».

- **URL** : https://dataeducation.opendatasoft.com/p/personnels-enseignants-dans-les-lycees-en-france/
- **Catalogue** : id **7**, thématique **Éducation**, sous-thématique **Lycées**. Vignette
  `https://data.education.gouv.fr/assets/theme_image/personnel_lycees_francais.gif` — c'est la
  **seule** des trois vignettes du triplet hébergée sur le domaine officiel (celles des
  collèges et des écoles sont sur le `.com`).
- **Page Studio** `uid: sp_98eklp`, `updated_at` 2026-01-29T23:32:41Z (3 minutes après celle
  des collèges — ordre de duplication : collèges 23:29, lycées 23:32, écoles 23:20).
- **Jeu** : `fr-en-indicateurs_personnels_etablissements2d`, **le même que la page collèges**
  (10 697 lignes, 40 champs, rentrée 2024). Champs, facettes, volumes, CORS, disponibilité sur
  `data.education.gouv.fr` : voir `personnels-colleges.md` § « Champs utiles » et § « API ».
- **Relevé visuel** : 2026-09-10, Chrome (extension), fenêtre 1568 × 751 CSS px.
- **Configuration archivée** :
  `docs/portail-education/_sources/personnels-enseignants-dans-les-lycees-en-france.studio.json`.

## Ce qui diffère de la page collèges

### 1. Le titre interne du site est en casse différente

Le `<title>` de la page est « Personnels **E**nseignants dans les lycées en France » (majuscule
à Enseignants), là où les deux autres écrivent « personnels enseignants ». Détail, mais c'est
le seul endroit du triplet où la casse diverge.

### 2. Le filtre de nature attrape les EREA

Le seul écart fonctionnel réel du gabarit, et il n'est pas anodin. Les 18 `conditions` de la
page portent `nature_de_l_etablissement contains ["Lycée"]`, traduit en
`where=(((suggest(\`nature_de_l_etablissement\`, "Lycée"))))`. **Sept natures matchent, pas
six** :

| Nature | Lignes | `etp_total` |
|---|---:|---:|
| Lycée professionnel | 1 094 | 57 759,89 |
| Lycée d'enseignement général et technologique | 1 061 | 92 457,34 |
| Lycée polyvalent | 979 | 106 988,36 |
| Lycée d'enseignement général | 417 | 20 652,35 |
| Lycée d'enseignement technologique | 54 | 2 154,99 |
| Lycée climatique | 4 | 213,00 |
| **Etablissement régional d'enseignement adapté / Lycée d'enseignement adapté** | **77** | **3 269,20** |
| **Total « Lycée »** | **3 686** | **283 495,13** |

Les **77 EREA** entrent dans le compte parce que leur libellé de nature contient le mot
« Lycée » après le slash. Un EREA n'est pas un lycée au sens courant (c'est un établissement
d'enseignement adapté, avec internat éducatif, relevant de l'ASH) ; il pèse **1,2 % des ETP**
de la page. Rien ne le signale, et le titre dit « Les lycées français ».

Symétriquement, **22 établissements « composés uniquement de STS et/ou de CPGE »** (578 ETP)
et **2 « écoles secondaires spécialisées (second cycle) »** (25 ETP) ne sont dans **aucune**
des trois pages — voir `personnels-colleges.md` § « Les 12 natures ».

C'est le défaut propre à cette page-ci : **un filtre plein texte sur un libellé sert de
définition de périmètre.** Un `in` sur une liste explicite de natures — ou, mieux, un champ
« niveau » au jeu — donnerait un périmètre nommable.

### 3. Toutes les valeurs affichées

Structure, ordre des blocs, formules, couleurs, layouts, kebabs, infobulles, pied de page :
**identiques** à `personnels-colleges.md` § « Relevé visuel ». Seules les valeurs changent.
Toutes vérifiées à l'écran **et** à l'API (`where=nature_de_l_etablissement like "Lycée"`).

**Section 1 — quatre KPI** (`layout_context_and_image`) :

| Libellé | Écran | API |
|---|---|---|
| « Equivalents Temps Plein au service des élèves » | **283 495** | 283 495,13 ✔ |
| « Equivalents Temps Plein sont dédiés à la vie scolaire » | **25 071** | 25 070,67 ✔ |
| « Equivalents Temps Plein sont enseignants » | **221 952** | 221 952,20 ✔ |
| « proportion des femmes dans les Equivalents Temps Plein enseignants » | **54,7 %** | 54,748 % ✔ |

**Section 2 — trois KPI** (`layout_context_only`) :

| Libellé | Écran | API |
|---|---|---|
| « des enseignant(e)s sont agrégé(e)s » | **19,3 %** | 19,276 % ✔ |
| « des enseignant(e)s sont certifié(e)s » | **43,9 %** | 43,853 % ✔ |
| « des enseignant(e)s sont non titulaires » | **11,8 %** | 11,789 % ✔ |

**Comparaison directe avec les collèges** — ce que le triplet permettrait de dire et ne dit
nulle part :

| | Collèges | Lycées |
|---|---:|---:|
| ETP totaux | 289 592 | 283 495 |
| ETP enseignants | 218 899 | 221 952 |
| Femmes parmi les enseignants | **65,1 %** | **54,7 %** |
| Agrégés | **5,6 %** | **19,3 %** |
| Certifiés / PEPS | **80,3 %** | **43,9 %** |
| Non titulaires | 8,8 % | 11,8 % |
| Public / Privé (établissements) | 5 326 / 1 661 | 2 477 / 1 209 |
| Public / Privé (ETP totaux) | 247 962 / 41 630 | 239 319 / 44 176 |

Deux populations très différentes présentées comme deux instances du même gabarit, sur deux
pages qui ne se citent pas.

**Section 3 — deux graphiques**, mêmes types, mêmes couleurs, même axe X à une seule catégorie
« 2024 », mêmes titres d'axes inversés, même absence de `%` :

| Série | Lycées | (Collèges) |
|---|---:|---:|
| Moins de 35 ans | **13,52 %** | 19,57 % |
| 35 - 50 ans | **37,67 %** | 43,28 % |
| Plus de 50 ans | **48,80 %** | 37,14 % |
| Moins  de 2 ans | **21,02 %** | 24,11 % |
| 2 à 5 ans | **16,05 %** | 16,34 % |
| 5 à 8 ans | **12,53 %** | 12,77 % |
| Plus de 8 ans | **50,40 %** | 46,78 % |

Le corps enseignant des lycées est nettement plus âgé (48,8 % de plus de 50 ans contre 37,1 %).

**Quatre cartes**, mêmes découpages, mêmes formules, mêmes teintes (`@chart[12]` rouge brique
pour les agrégés, `@chart[15]` brun doré pour les certifiés). Seules les deux cartes
« certifiés » ont un UID de bloc différent de la page collèges (`MH0VNCYVBQJBY` /
`MH0VNCYVB827J` contre `MH2B7WK6H7WCG` / `MH2B7WK6AFLPJ`) — trace du dupliquer-coller.
`legendLabel` : « Proportion d'enseignant(e)s agrégé(e)s dans **les lycées** », etc.

Bornes de légende relevées à l'écran :

| Carte | Bornes affichées | Reconstitution (min → max des données) |
|---|---|---|
| agrégés / région | **0,42** · 4,7 · 9 · 13 · 18 · 22 · 26 | min **0,42 = le groupe `null`** (12 lycées) → max 26,10 (Ile-de-France) |
| agrégés / département | 3 · 8,4 · 14 · 19 · 24 · 30 · 35 | 3,00 (Mayotte) → 35,20 (Paris) |
| certifiés / région | 25 · 29 · 33 · 38 · 42 · 47 · 51 | 24,56 (Mayotte) → 50,94 (Corse) |
| certifiés / département | 25 · 30 · 35 · 40 · 45 · 50 · 55 | 24,56 (Mayotte) → 54,70 (Haute-Corse) |

**Le groupe `null` de `reflibelle_region` frappe ici par le bas** : 12 lycées sans région,
0,42 % d'agrégés, très en dessous de toute région réelle (min Mayotte 3,0). La borne basse de
la légende ne correspond donc à aucune région affichée — variante du défaut n° 5 de la fiche
collèges, où le même groupe fixait la borne **haute**. C'est le même bug, dans les deux sens :
un groupe non cartographiable ne devrait pas participer à l'échelle.

**Valeurs par région, lycées** (API) :

| Région | agrégés % | certifiés % |
|---|---:|---:|
| Ile-de-France | 26,10 | 39,75 |
| Auvergne-Rhône-Alpes | 20,87 | 43,28 |
| Provence-Alpes-Côte d'Azur | 19,61 | 45,19 |
| Occitanie | 19,51 | 44,60 |
| Grand Est | 19,45 | 43,10 |
| Nouvelle-Aquitaine | 18,61 | 45,28 |
| Bourgogne-Franche-Comté | 18,34 | 45,41 |
| Centre-Val de Loire | 18,27 | 44,73 |
| Normandie | 17,30 | 46,08 |
| Pays de la Loire | 15,59 | 47,84 |
| Bretagne | 15,40 | 50,02 |
| Corse | 15,04 | 50,94 |
| Hauts-de-France | 14,61 | 46,05 |
| La Réunion | 14,03 | 40,91 |
| Guadeloupe | 12,17 | 44,34 |
| Martinique | 8,53 | 45,79 |
| Guyane | 5,27 | 29,89 |
| Mayotte | 3,00 | 24,56 |
| *(TOM et Collectivités territoriales)* | 2,52 | 33,42 |
| **`null` (12 lycées)** | **0,42** | 32,58 |

Extrêmes départementaux : agrégés Paris 35,2 · Hauts-de-Seine 32,2 · Bas-Rhin 29,3 …
Lozère 5,6 · Guyane 5,3 · Mayotte 3,0. Certifiés Haute-Corse 54,7 · Vendée 53,3 …
Paris 35,2 · Guyane 29,9 · Mayotte 24,6.

### 4. Le texte d'introduction

Même structure (deux `#` → deux `<h1>`), un mot changé :

> # Les lycées français en chiffres : effectifs en équivalents temps plein
> # et profils des personnels
>
> « Cette datavisualisation, réalisée par le ministère de l'Éducation nationale à partir des
> données mises à disposition par la DEPP, **présente pour la première fois les chiffres
> relatifs au nombre d'équivalents temps plein dans les lycées.** … »

Une différence typographique avec la page collèges : la mention finale y est
« Retrouvez **bientôt** ces indicateurs par établissement » sans emphase, alors que la page
écoles met « bientôt » en gras. Détail de saisie.

### 5. Les deux images

`/assets/theme_image/personnels-enseignants-047-scx0622777-48014.jpg` et
`/assets/theme_image/neutre-11-226762.jpg`, `alt=""` toutes deux.

## Défauts propres à cette page

Les **dix-neuf défauts** listés dans `personnels-colleges.md` s'appliquent tous, à l'identique,
avec deux ajouts :

20. **Le périmètre « lycée » est défini par une recherche plein texte sur un libellé.**
    77 EREA (3 269 ETP) entrent dans la page parce que leur nature s'écrit « Etablissement
    régional d'enseignement adapté / **Lycée** d'enseignement adapté ». C'est un choix
    d'implémentation qui devient une définition statistique, et il n'est écrit nulle part.
21. **La borne basse de l'échelle des deux cartes « agrégés » est le groupe sans région**
    (0,42 %), donc **aucune région n'a la couleur la plus claire de la légende**. Sur la page
    collèges, le même groupe fixe la borne haute. Le défaut est symétrique, ce qui montre
    qu'il est structurel et non accidentel.

## Transposition vers `dsfr-data`

**Identique à `personnels-colleges.md` § « Transposition »**, au `where` près. Trois points
seulement méritent d'être écrits ici.

1. **Le `where` de la source.** Deux écritures possibles, et elles ne sont **pas**
   équivalentes :

   ```html
   <!-- (a) reproduit exactement l'original, EREA compris : 3 686 lignes -->
   where="nature_de_l_etablissement like 'Lycée'"

   <!-- (b) périmètre nommable, EREA exclus : 3 609 lignes, 280 226 ETP -->
   where="nature_de_l_etablissement in ('Lycée d''enseignement général et technologique',
          'Lycée polyvalent', 'Lycée professionnel', 'Lycée d''enseignement général',
          'Lycée d''enseignement technologique', 'Lycée climatique')"
   ```

   L'esquisse retient **(a)** pour la fidélité, et **affiche le périmètre en clair sous le
   H1** (« 3 686 établissements, dont 77 EREA »). C'est la correction honnête : ni changer les
   chiffres en silence, ni les publier sans dire ce qu'ils recouvrent.
   *Réserve* : la syntaxe `in (…)` avec apostrophes échappées en ODSQL **n'a pas été testée**
   contre l'API — **non vérifié**. Le repli sûr est un `dsfr-data-facets` sur
   `nature_de_l_etablissement` (facette déclarée, 12 valeurs) qui laisse le lecteur composer
   son périmètre — ce qu'aucune des trois pages ne permet.

2. **Le filtre de nature comme facette plutôt que comme `where`.** Puisque
   `nature_de_l_etablissement` est facetté au back-office, la voie la plus native est de
   **ne pas figer le périmètre** : une source unique sur les 10 697 lignes, un
   `dsfr-data-facets` avec `nature_de_l_etablissement` en `display="…:multiselect"` et une
   valeur par défaut. C'est le point où « équivalence fonctionnelle, pas clone pixel »
   (décision de cadrage n° 1 du dépôt) paie le plus : une seule page couvre les trois, les
   24 établissements orphelins cessent de l'être, et la comparaison collèges/lycées devient
   possible. Voir § « Gabarit partagé ».

3. **Le groupe `null` de région**, qui ici tire l'échelle vers le bas :
   `and reflibelle_region is not null` sur le `where` de la source d'agrégat régional —
   le même attribut que côté collèges (PG-015), pas un composant de plus.

## Données à reproduire fidèlement

- [ ] Jeu `fr-en-indicateurs_personnels_etablissements2d`, rentrée **2024**, filtre
      `like "Lycée"` → **3 686** établissements, **dont 77 EREA** (à mentionner).
- [ ] Secteur : Public **2 477** (239 319 ETP) / Privé **1 209** (44 176 ETP).
- [ ] KPI : **283 495** ETP totaux · **25 071** ETP vie scolaire · **221 952** ETP enseignants ·
      **54,7 %** de femmes.
- [ ] Statut : **19,3 %** agrégés · **43,9 %** certifiés/PEPS · **11,8 %** non titulaires.
- [ ] Âge : **13,5 %** < 35 ans · **37,7 %** 35-50 ans · **48,8 %** > 50 ans.
- [ ] Ancienneté : **21,0 %** < 2 ans · **16,1 %** 2-5 ans · **12,5 %** 5-8 ans ·
      **50,4 %** ≥ 8 ans.
- [ ] Carte régions, agrégés : Ile-de-France **26,1 %** … Mayotte **3,0 %** — **sans** le
      groupe `null` (12 lycées, 0,42 %) qui, dans l'original, définit seul la borne basse.
- [ ] Carte départements, agrégés : Paris **35,2 %** … Mayotte **3,0 %**.
- [ ] Carte régions, certifiés : Corse **50,9 %** … Mayotte **24,6 %** ; départements :
      Haute-Corse **54,7 %** … Mayotte **24,6 %**.
- [ ] Titres, légendes et libellés : identiques à la page collèges, « lycées » substitué à
      « collèges » dans les quatre `legendLabel`.
- [ ] Trois filtres (région, département, secteur), cascade effective, mêmes 19 régions et
      101 départements que la page collèges (les listes viennent du jeu entier, pas du
      périmètre lycée).

## Gabarit partagé

Voir `personnels-colleges.md` § « Gabarit partagé » pour le tableau complet des trois pages.
Le point qui concerne celle-ci : **collèges et lycées sont le même fichier**, aux mêmes UID de
blocs près, à trois choses près — la valeur `"Collège"`/`"Lycée"` recopiée dans 18
`conditions`, deux images, et le mot du titre. Deux des quatre cartes portent un UID
différent, ce qui prouve la duplication manuelle plutôt qu'un gabarit.

Un unique gabarit `dsfr-data` paramétré par `where` + libellé couvre les deux sans effort.
Mieux : **une seule page** avec `nature_de_l_etablissement` en facette les couvre toutes les
deux *et* rattrape les 24 établissements du second degré que ni l'une ni l'autre n'affiche.
