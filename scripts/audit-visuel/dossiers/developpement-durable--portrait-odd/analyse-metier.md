# Analyse métier — Portrait ODD d'un département

> Création (D8 de `docs/portail-developpement-durable/proposition.md`), 2026-09-26. Niveau avancé
> de `dataviz-metier`, famille D (portrait) de `pagePatterns`.

## L'histoire

Le cadrage partait d'un extrême : Mayenne 18,3 t éq. CO₂ par habitant, Paris 2,66 (2021). Rejoué à
l'API, le chiffre est juste — mais le rang des deux sur les autres indicateurs dit mieux : leurs
portraits sont **inversés**. Paris est 1er sur 100 pour les émissions et 99e sur 100 pour les
logements suroccupés (31,3 % en 2022) ; la Mayenne est 100e sur 100 pour les émissions et 17e pour
la suroccupation (3,5 %). Et c'est le cas général : sur sept indicateurs, **72 départements sur 101
(71 %)** sont dans le meilleur quart sur au moins un indicateur et dans le dernier quart sur au
moins un autre ; 16 seulement n'ont aucun dernier quart ; aucun n'a plus de 5 meilleurs quarts sur 7.
Rangs sur les départements, corrélation de rangs GES/hab ↔ suroccupation −0,54 ; suroccupation ↔
voitures Crit'Air 1 +0,86 (densité).

Titre-message : « Aucun département n'est bon partout : sept sur dix figurent parmi les meilleurs sur
un objectif et parmi les derniers sur un autre ».

## Pourquoi pas la France en référence (écart au cadrage)

Le fichier ITDD « France entière » (`305ea0e3…`) ne publie ni les GES par habitant, ni le taux de
pauvreté, ni les déchets par habitant, et publie le taux de valorisation à `null`. Trois valeurs France
seulement existent à l'année du département : suroccupation 9,7 % (2022), bio 10,1 % (2024),
Crit'Air 1 ou électriques 36,2 % (2024). La référence de la page
est donc le **rang** ; la valeur France est affichée seulement là où elle est publiée, à la même
année. Aucune moyenne de départements n'est substituée (ce ne serait pas le chiffre national).

## Les formes

- Preuve : barres horizontales groupées, deux séries (les deux extrêmes des émissions par habitant,
  lus dans la donnée), sur une échelle commune 0-100 « part des autres départements qui font moins
  bien ». Échelle commune sans jamais additionner des unités différentes.
- Portrait : même échelle, une série, pour le département choisi (facette `select`, défaut Mayenne,
  URL partageable `?departement=`).
- Petits multiples : un graphique par indicateur, ~100 barres triées du plus favorable au moins
  favorable, département choisi en évidence (`selected-palette="neutral"` + `highlight-index`
  interpolé = nombre de départements strictement meilleurs).
- Tableau équivalent : valeur, unité, année, rang, sur combien, position, France, objectif.

## Honnêteté

- Le sens « favorable » est une décision éditoriale (table `ind` de la page) et est écrit en page.
- Millésimes différents par indicateur (2021 à 2024) : lus dans la donnée, affichés partout.
- Ex æquo : rang = 1 + nombre strictement meilleurs ; la barre en évidence peut être un ex æquo.
- `series-field` dessine à 0 une cellule absente : l'indicateur bio (absent pour Paris) est retiré
  du graphique des deux extrêmes, et la page le dit (texte calculé).
- Le dernier d'un indicateur a une barre nulle (0) : dit sous le graphique.
- Aucune note globale.

## Phrase de lecture

« Mayenne : 18,3 t éq. CO₂/hab. en 2021, rang 100 sur 100, dans le dernier quart. » — une par
indicateur, calculée.

## Ce qu'on ne montre pas

Note globale ; pesticides dans les eaux de surface (médiane 0 %, ex æquo massifs, 8 départements
sans valeur dont l'Alsace-Moselle) ; catastrophes naturelles (exposition, pas performance) ; points
de recharge (volume) ; artificialisation (hectares) ; valeurs aberrantes publiées (Hauts-de-Seine
100 % bio, Lozère 99,9 % valorisés) conservées et signalées ; départements sans valeur (Mayotte,
Guyane, Guadeloupe, Paris pour le bio). Aucun `secret` ni `na` dans ces sept indicateurs.
