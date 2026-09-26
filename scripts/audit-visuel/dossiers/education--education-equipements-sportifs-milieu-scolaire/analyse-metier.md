# Analyse metier — Équipements sportifs en milieu scolaire

> La lecture `dataviz-metier` : le sens avant la syntaxe.
> **Ce fichier n'est jamais ecrase par un script.** Les sorties du modele
> multimodal arrivent dans `constats/` ; ce qui est retenu se reecrit ici, a la main.

## La question posee, et pour quel lecteur

Les équipements sportifs des établissements scolaires sont-ils ouverts aux clubs ? Pour un
lecteur de politique publique (ministère, rectorat, collectivité propriétaire) qui suit la
politique d'ouverture lancée à la rentrée 2024.

## L'histoire trouvée (recréation du 2026-09-26)

Le taux national (19 %, 5 753 / 29 596 au 2026-09-26) est un **effet de composition**. Les
city-stades, terrains extérieurs de petits jeux collectifs et équipements d'athlétisme — les
terrains de la cour — font 55 % du parc (16 180) et ne sont ouverts qu'à 7 % ; hors eux, 34 % ;
**les gymnases (famille « Salle multisports », 4 094) à 51 %**. D'où un paradoxe par
propriétaire : les communes ont le taux d'ensemble le plus bas des collectivités (13 %), parce
que 65 % de leurs 11 454 équipements scolaires sont des terrains de cour, et 62 % de leurs
gymnases sont ouverts (plus que les régions, 50 %). À gymnase égal, restent de vrais écarts :
privé (25 %) et associations (21 %) en bas ; régions de 41 % (Normandie) à 71 % (La Réunion, 56
gymnases). Rejoué à l'API le 2026-09-26.

La page précédente et l'original portaient le 19 % (et 41 % « structurant ») comme mesure de
l'ouverture ; la recréation dit que c'est surtout une mesure du nombre de cours d'école.

## La forme retenue, et pourquoi elle sert cette question

1. Barres empilées triées par volume (ouverts en bleu, autres en gris), taux dans le libellé :
   montre en un coup d'œil que le nombre vient des terrains de cour et l'ouverture des salles.
2. Barres groupées « tous / gymnases » par propriétaire, triées par taux des gymnases : le
   paradoxe des communes se voit comme l'écart entre deux barres.
3. Même forme par région : la nuance à famille égale.
4. Exploration (académie, département, famille, propriétaire) : KPI, barres, carte à deux couches.

## Honnetete de l'echelle

Taux = ratio de sommes (jamais moyenne de taux), axe 0-100. Seuils affichés pour les petits
effectifs (familles < 100, propriétaires < 200, territoires < 500), dits en page et comptés.

## Phrase de lecture

« Mis à part les terrains de la cour, 34 % des 13 416 autres équipements scolaires sont déclarés
ouverts ; les gymnases, 51 %. » — calculée par `dsfr-data-repeat`, comme toutes les autres.

## Ce qu'on ne montre pas, et qu'il faut dire

152 fiches sans aucun type d'utilisateur ; 129 sans propriétaire ; 298 sans région ; 11 familles
< 100 ; 10 territoires < 500 ; pas d'évolution ; pas d'usage réel (seulement la case cochée) ;
plus de fiche EPCI (annuaire-educ figé au 2023-10-19). Tous comptés en page.

## Ecarts avec l'original

- Plus de catégorie « structurant » (définition introuvable, colonne vide pour 13 148
  équipements scolaires) : remplacée par la famille.
- Plus de fiche EPCI / élèves par équipement (annuaire 2023).
- Onglet « Rectorat » : devient la facette `aca_nom`, qui existe désormais dans `data-es`.
