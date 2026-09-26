# Analyse metier — GAR - les données sur les ressources numériques éducatives accessibles via le GAR

> La lecture `dataviz-metier` : le sens avant la syntaxe.
> **Ce fichier n'est jamais ecrase par un script.** Les sorties du modele
> multimodal arrivent dans `constats/` ; ce qui est retenu se reecrit ici, a la main.

Recréation du 2026-09-26, niveau avancé (une page).

## La question posee, et pour quel lecteur

Pour un responsable du numérique éducatif, académique ou national : **qui se sert du GAR, et
où ?** L'original répondait « combien » (cinq totaux, sept graphiques de volumes) ; les volumes
par académie ne mesurent que la taille des académies.

## L'histoire trouvée

Rapporté au nombre d'accédants, l'usage varie **d'un facteur 30** entre académies en
2024-2025 : 12,7 accès par accédant à Nancy-Metz, 0,4 en Guadeloupe (5,0 en France, ratio des
totaux). Et c'est une **géographie**, pas un effet de taille : les trois académies du Grand Est
sont aux trois premières places ; le Grand Est fait **21,8 % des accès avec 9,3 % des
accédants** — plus d'accès que toute l'Île-de-France (11,81 M contre 11,67 M) avec deux fois
moins d'accédants. Les Hauts-de-France, deuxième région par les accédants (11,4 %), pèsent
3,6 % des accès ; Lille, deuxième académie par les accédants, n'ouvre que 1,1 ressource par
accédant (28e sur 30). Reims (2e) et Amiens (26e) sont voisines.

Nuances : être équipé n'est pas s'en servir (63 accès pour 100 affectations en France ;
Limoges affecte 18,4 ressources par accédant et en ouvre 2,7). Neuf accès sur dix sont ceux
d'élèves (89,6 %). Le catalogue 2026 : 84 % de manuels, 85 % payants, trois distributeurs
(KNE, EDULIB, Interforum) portent 86,9 % des entrées.

La reproduction précédente avait déjà calculé le ratio, mais le rangeait en troisième bloc
derrière deux graphiques de volumes, et n'avait pas vu le motif régional.

Tous les chiffres ont été rejoués à l'API le 2026-09-26 (trois jeux joints en Python sur
`libelle_aca`, catalogue exporté en entier).

## La forme retenue, et pourquoi elle sert cette question

1. Accroche : trois KPI en ratios (accès par accédant national ; part des accès vs part des
   accédants pour le Grand Est et les Hauts-de-France).
2. Preuve : barres horizontales appariées par région, part des accédants / part des accès —
   l'écart entre les deux barres est le message.
3. Détail : 30 académies triées par accès par accédant, palette neutre et les trois académies
   du Grand Est en évidence ; carte `map-aca` du même ratio, qui montre la frontière.
4. Nuance : phrases calculées (Créteil/Lille, accès pour 100 affectations, Limoges).
5. Profils : deux KPI et barres des cinq profils (plus de camembert à deux parts).
6. Catalogue : trois KPI et barres des huit premiers distributeurs en part du catalogue.
7. Exploration : recherche, facettes, tableau du catalogue. Puis « Ce qu'il faut retenir » et
   les hypothèses écrites.

## Honnetete de l'echelle

- Ratio de sommes partout (KPI `acces:sum / accedants:sum`), jamais une moyenne de ratios.
- Carte : `map-summary="weighted"` pondéré par les accédants, calculé sur la colonne brute
  (`map-summary-field="app"`), l'affichage sur la colonne arrondie.
- Barres à zéro ; parts calculées sur la France entière (`share_percent`, « Autres » compris).
- Mise en évidence par `highlight-index="[0, 1, 2]"` : un index de rang, juste parce que les
  trois premières académies du tri sont celles du Grand Est dans ce millésime ; le titre de la
  DataBox le dit (« en bleu, les trois académies du Grand Est »).

## Phrase de lecture

« En 2024-2025, 10 829 562 élèves et personnels pouvaient ouvrir des ressources numériques par
le GAR ; ils l'ont fait 54 096 270 fois, soit 5,0 accès par accédant. Mais un accédant du Grand
Est en compte 11,8, un accédant des Hauts-de-France 1,6. » — calculée dans la page
(`dsfr-data-repeat` sur totaux + pivot régional joints sur une clé constante).

## Ce qu'on ne montre pas, et qu'il faut dire

- « Autres » (Saint-Pierre-et-Miquelon, Polynésie, Andorre : 7 189 accédants) : dans les totaux
  et les parts régionales (« Autres territoires »), hors classement et hors carte.
- Les deux jeux d'accès ne somment pas pareil : 54 096 270 (académies) contre 54 092 735
  (profils), 3 535 d'écart, calculé et affiché.
- Accédant n'est pas élève : pas de population scolaire dans le jeu, donc pas de taux de
  couverture.
- Pourquoi le Grand Est : le jeu ne le dit pas (ni niveau d'enseignement, ni ressources
  ouvertes, ni politique d'achat). Écrit en page, aucune hypothèse causale avancée.
- Le catalogue (2026) n'est pas de la même campagne que les usages (2024-2025) ; aucun jeu ne
  relie un accès à une ressource. Une entrée du catalogue n'est pas une œuvre (15 255 titres
  distincts pour 15 630 entrées).
- Le graphique des distributeurs montre les huit premiers ; les parts portent sur tout le
  catalogue.

## Ecarts avec l'original

- Ratios au lieu de volumes ; les trois jeux académiques croisés (le portail ne le fait jamais).
- Carte choroplèthe par académie au lieu de trois cartes de points à rayon uniforme, DROM
  inclus.
- Les cinq profils au lieu d'un camembert « hors élèves » à deux parts qui écartait 166 803 accès.
- Le catalogue exploité (types, coût, distributeurs, recherche) au lieu d'un simple compteur.
