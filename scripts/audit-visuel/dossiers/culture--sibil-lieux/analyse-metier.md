# Analyse métier — culture / sibil-lieux

Fiche 16 du cadrage (`docs/portail-culture/proposition.md`). Niveau avancé : une page.

## L'histoire

Le fichier ouvert de Sibil porte le nom d'un système de **billetterie**, mais la billetterie en a
été retirée (avis CADA n° 20235072 du 12/10/2023, cité par le producteur) : ni billets, ni
recettes, ni prix. Il reste une date, un lieu, un déclarant, parfois un festival — 204 628
déclarations de représentations, du 26/09/2024 au 24/09/2026 (dates corrigées).

Ce qu'il mesure, c'est la **géographie et le rythme de l'activité déclarée** :
- Paris : 46 314 déclarations, **22,6 %**, pour 3,2 % des habitants ; 2 142 déclarations pour
  100 000 habitants contre 240 dans le reste de la France (**8,9 fois**). Deuxième : Vaucluse, 872,
  dont 35 % rattachées à un festival (Avignon). Dernier : Guyane, 24.
- Les lieux qui déclarent le plus sont de petites scènes à forte rotation (Point-Virgule, The Joke,
  Comédie Bastille, Spotlight, Improvidence) : 9 des 15 premiers sont parisiens. Paris n'a que
  5,2 % des lieux (760 / 14 752). 382 lieux (2,6 %) portent 47 % des déclarations ; 6 969 (47 %)
  n'apparaissent qu'une fois.
- Saison : pic en mars 2026 (12 924), creux en août 2025 (3 206) ; les festivals passent de 2,8 %
  des déclarations (décembre 2024) à 43 % (juillet 2025). Ensemble : 9,6 % (19 683).

## Écart au cadrage

- Titre provisoire : « 204 628 déclarations, 22,6 % à Paris » — **confirmé**.
- Festival : 16 879 (8 %) au cadrage → **19 683 (9,6 %)** (`festival_ID_sibil` renseigné).
- « Dates de représentation à partir de 2024-01-10 » : **faux** — c'est le 1er octobre 2024 lu à
  l'envers. L'analyse de data.gouv.fr (API Tabular et export Parquet) lit les dates JJ-MM-AAAA du
  CSV en MM-JJ quand le jour est ≤ 12 : 75 001 dates sur 204 564 (37 %) ont jour et mois
  intervertis. Vérifié sur les 12 premières lignes du CSV brut contre l'API. Correction
  déterministe (jour publié ≤ 12 → c'est le mois). Sans correction, le fichier « couvre » janvier
  2024 – décembre 2026 et 11 498 déclarations sont « créées » après sa date d'export.
- Encodage : CSV ISO-8859-15 lu en Windows-1250 (« Isčre », « THÉÂTRE Ŕ L'OUEST ») ; recodé.
- Pas de carte : le cadrage prévoyait une carte départementale ; un classement en barres des
  taux dit mieux l'écart de Paris (2 142 contre un 2e à 872) qu'un aplat où Paris est un point.

## Forme

1. KPI (déclarations, lieux, part de Paris, part des festivals).
2. Encadré « ce que le fichier ne contient pas » — le titre en dépend.
3. Barres horizontales triées, 20 premiers départements en taux pour 100 000 hab., Paris en
   évidence ; tableau a11y des 97 départements comparés.
4. Barres horizontales, 15 premiers lieux ; paragraphe de concentration.
5. Barres empilées mensuelles festival / hors festival, octobre 2024 – juin 2026 (trimestres
   clôturés).
6. Deux courbes : dates publiées contre dates corrigées — la preuve de la correction.
7. Exploration : facettes département/ville, liste des lieux agrégés.

## Honnêteté

- Une déclaration ≠ un public : dit dans l'encadré, dans le titre du bloc des lieux, et en
  « ce qu'on ne montre pas ».
- Pas de croissance : Oct–juin 2025-26 = 92 866 contre 88 106 un an plus tôt, mais on ne sépare
  pas activité et taux de déclaration. Écrit comme tel.
- Trimestre en cours (juillet–septembre 2026) : 5 625 déclarations « ENREGISTRE », exactement les
  lignes de ce trimestre ; hors de la courbe mensuelle, dans les totaux.
- 64 sans date, 251 sans lieu, 661 sans département : nommés.
- Population : fichier départemental 2023 du ministère sans Paris, Martinique ni Guyane et avec
  l'Alsace en une ligne ; complété par le fichier communal (75056) et régional (02, 03).
- Identifiants de lieux fusionnés (1 378 au statut FUSIONNE) non regroupés : dit.

## Phrase de lecture (calculée)

« Paris compte 2 142 déclarations pour 100 000 habitants, contre 240 dans le reste de la
France, soit 8,9 fois plus. »

## Ce qu'on ne montre pas

Public, recettes, prix ; évolution ; exhaustivité ; trimestre en cours dans la courbe ;
déclarants (licences non joignables : formats différents) ; carte de points (pas de
coordonnées) ; orthographe parfaite des noms.
