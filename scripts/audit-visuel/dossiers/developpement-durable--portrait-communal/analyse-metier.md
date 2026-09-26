# Portrait communal : logements, voitures, énergie — analyse métier

Création (2026-09-27), deuxième vague § 5 de `docs/portail-developpement-durable/proposition.md`.
Niveau **avancé** de `dataviz-metier` ; famille D (portrait / explorateur).

## L'histoire

- **Titre-message** : « On commence plus d'un quart de logements de moins qu'avant 2020 : votre commune
  suit-elle la France ? »
- National, lu au chargement (rejoué à l'API le 2026-09-27) : 359 280 logements commencés par an en
  2017-2019, 261 204 en 2022-2024, **−27 %** (fichier départemental Sitadel, somme des 101 départements).
  Gaz résidentiel par point de livraison : 12,1 MWh (2019) → 9,4 (2024), −23 % (maille région).
- Le cadrage (§ 5) ne donnait pas de titre, seulement « trois jeux de 2 à 4 M lignes filtrés par commune ».
  L'angle retenu : la construction, seule des trois mesures qui ait à la fois une série communale et une
  référence nationale comparable (même source, même traitement). L'énergie compare un niveau (2024) ; les
  voitures, la commune à elle-même dans le temps.
- Angles écartés : « part de voitures Crit'Air 1 ou électriques vs France » (ITDD non comparable au parc
  communal : Paris 58,3 % ITDD 2024 contre 56,6 % / 61,5 % au 1er janvier 2024 / 2025 dans le parc) ;
  évolution du gaz par commune (une source DiDo de plus dans un bloc déjà à 2 sur 3 connexions).

## La forme

1. Logements : barres groupées autorisés / commencés par année (la dernière année n'a que des
   autorisations — valeur absente, pas zéro). Titre calculé : évolution moyenne 2022-2024 vs 2017-2019 ;
   sous 30 logements commencés en 2017-2019, le titre refuse le pourcentage.
2. Énergie : deux petits graphiques commune vs France (électricité, gaz), MWh par point de livraison.
3. Voitures : barres empilées à 100 % par motorisation, 2011 → 2026 ; titre : diesel première → dernière
   année, électriques + hybrides rechargeables à la dernière.

## L'honnêteté

- Moyennes triennales (et non 2019 vs 2024) pour résister au bruit communal.
- Séries Sitadel « non estimées, en date réelle » : dernière période sous-estimée, dit en page.
- Secret statistique (lignes IRIS « secret » pour la consommation ET les points) : écarté des deux sommes,
  compté et affiché (Rennes 1/92 élec, 4/91 gaz ; Paris 27/971 élec).
- Point de livraison ≠ logement (chaufferie collective) : Paris gaz 10,9 MWh > France, expliqué.
- Non corrigé du climat.

## Phrase de lecture (Rennes, 2026-09-27)

« Logements commencés par an, en moyenne : 2 236 de 2017 à 2019, 1 365 de 2022 à 2024. En France : 27 %
de moins. » — « 132 599 points de livraison… 2,1 MWh chacun (France : 4,3) » — « 93 343 voitures
particulières : 47,0 % essence, 39,7 % diesel, 7,2 % HNR, 1,8 % HR, 3,4 % électriques. »

## Ce qu'on ne montre pas

Référence nationale des voitures ; évolutions en % sous dix logements/an ; les lignes 75056 du parc
(31 lignes VP, 3 672 voitures au 01/01/2024) ; les 94 communes sans département du référentiel (COM) ;
les communes sans gaz (DiDo répond 400 « fichier vide »).
