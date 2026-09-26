# Analyse métier — Fréquentation des monuments nationaux (fiche 10, portail Culture)

Page : `/culture/monuments-nationaux` — création, pas de page d'origine.
Jeu : « Fréquentation des monuments nationaux » (ministère de la Culture ; source CMN, DEPS-doc 2023),
dataset `6545c1e0bcab951e5a4090dd`, ressource Tabular `4b6182c9-1989-456f-925c-d98bd363cee7`,
396 lignes = 99 monuments × 4 années (2019-2022), export Parquet présent. Niveau dataviz-metier : avancé.

## L'histoire

**Titre-message** : « Monuments nationaux : en 2020 et 2021, Chambord a dépassé l'Arc de Triomphe ;
en 2022, seul Paris a fait mieux qu'en 2019 ».

Rejoué sur les 396 lignes (Tabular, pagination 2 × 200, via le tunnel SOCKS) le 2026-09-26, identique à l'affichage :

- Totaux : 11 199 510 (2019), 4 078 510 (2020, −64 %), 5 446 740 (2021), 11 123 370 (2022, indice 99).
- Premier monument : Arc de Triomphe 1 606 710 (2019) ; **Chambord 575 910 (2020) et 707 710 (2021)** ;
  Arc de Triomphe 1 754 750 (2022). Le cadrage disait « l'année » : ce sont deux années.
- Paris (département 75, 12 monuments) : 40 % des entrées en 2019 ; indice 24 en 2020 (−76 %), 106 en 2022
  (43 % des entrées). Reste de la France : 45 en 2020 (−55 %), 95 en 2022.
- **Périmètre constant** (monuments avec entrées en 2019 et 2022) : Paris 6 monuments, indice 101 ;
  reste 79 monuments, indice 93. Entrants parisiens : Hôtel de la Marine 353 760, Colonne de Juillet 2 400,
  Palais-Royal 30 ; sortants : tours de Notre-Dame 126 050 en 2019, Plans-reliefs 790. La conclusion
  « Paris revenu, le reste non » tient au périmètre constant.
- Chambord a moins reculé (indice 51 en 2020) que l'Arc (27) : il n'a pas progressé, il a moins perdu.
- Top 15 de 2019 : quatre au-dessus de 2019 en 2022 (Saint-Cloud +9,8, Aigues-Mortes +9,4, Arc +9,2,
  Panthéon +8,5) ; Mont-Saint-Michel et Azay −13,1, Sainte-Chapelle −12,6, Carcassonne −13,5, Saint-Denis −21,3.

## Corrections du cadrage (données)

- **Chambord n'est pas administré par le CMN** (description du jeu). « 99 monuments du CMN » était faux :
  le premier des années de crise est l'exception du fichier. Dit en chapô et sous le premier graphique.
- Pas de coordonnées dans le jeu (seulement le code commune) : la carte à cercles proportionnels du
  cadrage n'est pas faite ; dit en « ce qu'on ne montre pas ».

## La forme

1. Accroche : barres groupées par année des 4 premiers de 2019 (series-field) + tableau du premier de
   chaque année (jointure du max annuel sur deux clés).
2. Preuve : indice base 100 en 2019, Paris / reste, en barres groupées avec ligne pointillée à 100.
   Une première version en courbe dessinait une spline qui plonge sous les points (sous 20 entre 2020 et
   2021) et un axe à « 2019.5 » : abandonnée, 4 points se lisent mieux en barres.
3. Nuance : entrants / sortants parisiens, périmètre constant, puis écart à 2019 des 15 premiers de 2019
   (barres horizontales triées, palette neutre, ligne à 0). Pas de couleur par signe : 2019 n'est pas un objectif.
4. Petits multiples : 12 premiers de la dernière année, axe commun (y-max lu dans la donnée), titre calculé
   (indice au plus bas et dernière année ; « pas d'indice » pour l'Hôtel de la Marine).
5. Exploration : pivot une colonne par année, recherche, facette région.

## Honnêteté

- Base 2019 fixe (année d'avant-crise), dernière année et année la plus basse lues dans la donnée.
- Indices non calculés sans base 2019 (`when … else null`), écrit en page.
- Cause (tourisme étranger) non affirmée : hypothèse nommée comme telle.

## Phrase de lecture

« En 2020, les monuments parisiens ne gardent que 24 % de leurs entrées de 2019, ceux du reste de la
France 45 %. En 2022, l'ordre s'inverse : Paris remonte à l'indice 106 ; le reste s'arrête à 95. »

## Ce qu'on ne montre pas

- Monuments à zéro entrée (12 / 15 / 9 / 8 par année ; 6 à zéro les quatre années) : cause inconnue.
- Gratuit / payant : arrondis séparément, somme ≠ total sur 93 lignes sur 396 (±10 ; −1 100 pour
  Chambord 2021).
- Pas de carte (pas de coordonnées). Pas de visiteurs (une entrée n'est pas une personne). Rien après 2022.
- Libellés de régions fautifs dans le jeu (« Provence-Alpes- Côte d’Azur », « Centre-Val de loire ») laissés tels quels.
