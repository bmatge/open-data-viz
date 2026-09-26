# Analyse metier — Territoires numériques éducatifs

> La lecture `dataviz-metier` : le sens avant la syntaxe.
> **Ce fichier n'est jamais ecrase par un script.** Les sorties du modele
> multimodal arrivent dans `constats/` ; ce qui est retenu se reecrit ici, a la main.

Recréation du 2026-09-26, niveau avancé (une page).

## L'histoire trouvée

**Un participant aux formations TNE sur quatre vient de l'Aisne** : 13 811 sur 53 491
(25,8 %, cumul à mars 2025), pour 5,8 % des élèves bénéficiaires du programme
(141 626 sur 2 435 461, juin 2025). 97,5 participants pour 1 000 élèves bénéficiaires,
contre 22,0 pour les douze départements réunis ; le deuxième, le Cher, est à 36,5.

L'explication évidente — l'Aisne est pionnière (données dès novembre 2020, les dix autres
à partir de février 2022) — ne tient pas seule : de février 2022 à mars 2025, à période égale,
l'Aisne ajoute 68,3 participants pour 1 000 élèves contre 16,2 pour les onze autres réunis
(×4,2). Le Val-d'Oise, pionnier au même titre, est à 11,6, dixième sur douze.

Seconde trouvaille, qui renverse une lecture de l'original et de la reproduction précédente :
les camemberts « 80 % premier degré / 20 % second degré » ne décrivent pas les participants.
Seuls 38,9 % ont un profil renseigné, et les deux départements pionniers fournissent 61,9 % des
profils renseignés et 72,9 % des degrés connus (Bouches-du-Rhône : 5,6 % de profils renseignés).
Hors pionniers, le premier degré tombe à 65,4 %. La reproduction précédente disait « 61 % hors
champ » mais pas *qui* restait dans le champ.

Angles retenus en nuance : satisfaction (la maîtrise de l'intervenant, 93,6 %, devant la
transférabilité en classe, 81,0 %, moyenne pondérée par 318 réponses sur six mois ; maîtrise
en tête chacun des six mois) ; plateforme (90 752 connexions ajoutées en 2023, ×3,6 sur 2022,
puis 95 338 en 2024, +5,1 % ; T1 2025 −17,2 % sur T1 2024).

Angles écartés : la carte des douze (douze valeurs dispersées, lues mieux triées) ; la durée
moyenne de visite (ne dit rien du programme) ; la série des formations avant 2022 (doublons,
cumul qui recule) ; le jeu des volumes horaires, qui mériterait sa page.

## La question posee, et pour quel lecteur

Où le programme TNE forme-t-il vraiment ses personnels, rapporté à sa taille dans chaque
département ? Pour un lecteur de pilotage (rectorats, collectivités, Canopé) et la presse.

## La forme retenue, et pourquoi elle sert cette question

1. Barres horizontales appariées, deux parts du total (participants / élèves bénéficiaires),
   triées : l'écart se lit sans calcul.
2. Barres triées d'un taux à période égale (participants gagnés 02/2022→03/2025 pour 1 000
   élèves), Aisne en bleu, le reste en gris (deux séries empilées + `color-map`, robuste au
   tri).
3. Barres triées du taux de profils renseignés, pionniers en bleu ; trois phrases calculées
   par groupe à la place des camemberts.
4. Barres des six critères de satisfaction, axe 0-100.
5. Barres annuelles de connexions (années complètes) puis série mensuelle filtrable
   (exploration).
6. Tableau triable des douze départements, export CSV.

## Honnetete de l'echelle

Axes à zéro partout. Taux pondérés : ratio de sommes pour les parts, les taux par
département et la satisfaction (Σ taux × répondants / Σ répondants), jamais une moyenne de
taux. Les arrondis (`round()` dans `compute`) ne servent qu'à l'affichage ; les sommes du
résumé repartent des valeurs brutes.

## Phrase de lecture

« De novembre 2020 à mars 2025, les formations TNE ont compté 53 491 participants dans douze
départements. L'Aisne en rassemble 25,8 %, alors qu'elle ne compte que 5,8 % des élèves
bénéficiaires : 97,5 participants pour 1 000 élèves, contre 22,0 dans l'ensemble. » —
calculée en page (`dsfr-data-repeat` sur une query de synthèse).

## Ce qu'on ne montre pas, et qu'il faut dire

- « Participants » : personnes ou inscriptions ? Non dit par le jeu ; 10 participants par
  enseignant bénéficiaire dans l'Aisne fait pencher vers des inscriptions (hypothèse écrite).
- Le dénominateur (élèves bénéficiaires) est la taille du programme, pas la population ; juin
  2025 contre mars 2025 pour les formations.
- « Corse » (déploiement) apparié à « Corse-du-Sud » (formations).
- Les dates de coupe (2025-03, 2022-02) sont écrites dans les `where` : à revoir si le jeu est
  mis à jour.
- Ligne vide « 2024-01 » de l'audience écartée ; visiteurs uniques non utilisés (deux reculs,
  LIM-016) ; août jamais publié, septembre le porte.
- Satisfaction : quelques dizaines de réponses par mois, non représentatives.
- Jeu « par solution » en 404 ; trois successeurs apparents au même total (2 435 461 élèves,
  16 667 enseignants, rejoué le 2026-09-26).

## Ecarts avec l'original

- Plus de camemberts de degré et de profil : remplacés par le taux de renseignement et trois
  phrases par groupe, parce que la répartition des participants n'est pas connue.
- Plus de KPI « visiteurs uniques » ni de courbes cumulées : un compteur cumulé monte par
  construction ; la page montre le flux annuel et mensuel.
- Ajout du dénominateur (jeu du déploiement joint aux formations) et de la coupe 02/2022.
- La section « par solution numérique » (404) n'est pas reproduite.
