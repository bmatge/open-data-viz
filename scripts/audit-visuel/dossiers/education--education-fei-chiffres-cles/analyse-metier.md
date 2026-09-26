# Analyse metier — Données ouvertes de France Éducation international

> La lecture `dataviz-metier` : le sens avant la syntaxe.
> **Ce fichier n'est jamais ecrase par un script.** Les sorties du modele
> multimodal arrivent dans `constats/` ; ce qui est retenu se reecrit ici, a la main.

Recréation du 2026-09-26 (niveau avancé : une page). Chiffres rejoués à l'API le même jour.

## L'histoire trouvée

Sept chiffres de 2025 de même poids cachaient le seul qui bouge. Le TCF passe de
**201 199 inscriptions (2023) à 310 473 (2025), +54 %** ; sur les 109 274 inscriptions
supplémentaires, **86 %** viennent du TCF Canada (42 155 → 124 667, ×3,0) et du TCF Québec
(12 814 → 24 314). Les deux versions canadiennes passent de 27 % à 48 % des inscriptions.
Le TCF Canada se passe de plus en plus **au Canada même** (2 749 → 44 677) et au **Cameroun**
(11 366 → 35 881) ; il stagne en Algérie (6 537 → 6 737) et recule au Maroc (5 737 → 4 749).
Pendant ce temps, le DELF-DALF ne gagne que **+5 %** (489 217 → 513 435) et **62 %** de ses
inscriptions 2025 sont scolaires (DELF Prim, scolaire et junior). Prolongement : les dossiers
ENIC-NARIC doublent de 2019 (23 899) à 2023 (51 772), puis plafonnent (50 477 en 2025).

La colonne qui porte l'histoire, `declinaison`, n'était affichée ni par l'original ni par la
reproduction précédente.

## La question posée, et pour quel lecteur

« D'où vient la croissance de l'opérateur ? » — pour un lecteur de politique publique
(ministère, presse), pas un chercheur de valeur pays.

## La forme retenue, et pourquoi elle sert cette question

- Barres empilées par année et par déclinaison : le total ET sa composition ; deux bleus
  (Canada, Québec, empilés côte à côte en bas) contre des gris (`color-map`).
- Barres groupées première / dernière année pour les huit premiers pays du TCF Canada : le
  changement, pas le classement.
- Même forme pour le DELF-DALF (élèves en bleu) : comparaison directe avec le TCF.
- ENIC-NARIC en barres annuelles (7 ans), axe à zéro.
- Exploration ensuite : sélecteur d'année, sept KPI de l'original, trois cartes du monde,
  carte des implantations.

## Honnetete de l'echelle

Axes à zéro (barres). Parts = rapports de sommes. Les deux graphiques empilés n'ont pas la même
échelle (TCF ~300 000, DELF ~500 000) ; ils ne sont pas juxtaposés. Résumé des cartes en
`map-summary="sum"` (la moyenne par pays d'un volume ne mesurait rien : « 3 314,29 »).

## Phrase de lecture

Calculée (`dsfr-data-repeat` + jointures sur clé constante), années comprises : la première et
la dernière année sont lues dans la donnée (min/max de `an`), aucune n'est écrite en dur dans le
récit. « Entre 2023 et 2025, les inscriptions au TCF sont passées de 201 199 à 310 473, soit
+54 %. Sur ces 109 274 inscriptions supplémentaires, 86 % viennent du TCF Canada et du TCF Québec. »

## Ce qu'on ne montre pas, et qu'il faut dire

- Des inscriptions, pas des personnes ; pays du centre, pas nationalité ; aucun résultat TCF.
- Trois années seulement pour TCF et DELF-DALF ; la cause de la hausse n'est pas dans le jeu.
- Casse changeante « DELF scolaire/junior » (2023-24) / « Delf scolaire/junior » (2025),
  recousue par `contains()`.
- Cartes du monde : en 2025, 7 066 inscriptions DELF-DALF (1,4 %), 944 TCF, 749 dossiers ENIC
  (1,5 %) absentes des cartes — petits États hors fond de carte (Maurice, Comores, Seychelles,
  Hong Kong, Singapour, Kosovo…) et, pour ENIC, 85 dossiers d'entités historiques. L'ancienne
  page n'en déclarait que 85 (ENIC) + 90 (assistants).
- Sélecteur limité à 2023-2025 : un KPI `v:sum` sur une année non publiée affiche 0, pas « — ».
  BELC et mobilité : 0 en 2023 = non publié (dit en page).

## Angles écartés

Classement des pays DELF-DALF (taille des réseaux scolaires) ; BELC, assistants, mobilité
(petits, stables) ; carte du monde en tête ; taux de réussite DELF par déclinaison (niveaux
A1-C2 non comparables).

## Ecarts avec l'original

- Récit ajouté (hausse du TCF, déclinaisons) ; tops 10 remplacés par première/dernière année.
- Année sélectionnable (2023-2025) au lieu de 2025 figée.
- Cartes : total sommé au lieu de la moyenne implicite ; lignes non cartographiées déclarées.
