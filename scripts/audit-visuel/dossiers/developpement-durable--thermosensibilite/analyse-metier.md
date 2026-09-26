# Analyse métier — Consommer moins ou réchauffer moins

Page : `/developpement-durable/thermosensibilite` — création (vague 4), deuxième vague § 5 de
`docs/portail-developpement-durable/proposition.md`. Niveau dataviz-metier : avancé.

## L'histoire

Question du cadrage : dans chaque intercommunalité, la baisse de consommation d'énergie des logements
vient-elle de la sobriété ou d'hivers plus doux ? Le cadrage comptait sur `THERMOR` (kWh/degré-jour) et
`PART` (part thermosensible) du jeu 34 pour y répondre lieu par lieu.

**Ce que la donnée dit (rejoué le 2026-09-27)** : ces deux colonnes sont publiées **sans séparateur
décimal** dans les trois formats de l'API (JSON, CSV, `/rows`) et sur toutes les années sondées (2018 :
12 à 15 chiffres ; 2022 : 6 à 13 ; 2024 : 5 à 10 pour `THERMOR`) ; même défaut dans le fichier régional
(jeu 33). Bourges Plus 2024 : `THERMOR = 33615346`, `PART = 2127`. L'échelle est irrécupérable sans deviner
(« 15 » = 15 % ou 1,5 %). Le gaz ne porte aucune valeur. L'angle « par EPCI » ne tient pas.

**Angle retenu** : la borne nationale. Gaz résidentiel par compteur (GRDF, EPCI ≥ 100 compteurs en 2019,
présents les deux années, 986 EPCI) : **12 167 → 9 434 kWh, −22,5 %** entre 2019 et 2024 ; degrés-jours
unifiés **1 408,6 → 1 250,1, −11,3 %**. Même si tout le gaz était thermosensible, le climat en
expliquerait au plus **50 %**. **977 EPCI sur 986** ont baissé plus que les degrés-jours ; 984 ont baissé.
Électricité (Enedis, 1 174 EPCI) : 4 567 → 4 118 kWh, **−9,8 %** ; 225 EPCI seulement sous −11,3 % —
ce qui ne borne rien, puisque l'essentiel de l'électricité ne chauffe pas.

Angles écartés : série complète 2018-2024 (14 fichiers, limite de 3 connexions DiDo) ; consommation par
habitant (jointure ITDD, sixième requête, et le compteur suffit) ; reconstruction heuristique de `PART`
(4 chiffres → /100…) : ce serait deviner ; carte (pas de contours EPCI dans DSFR Chart).

## Les années

2019 et 2024. 2024 : dernier millésime. 2019 plutôt que 2021 : 2021 est un hiver froid (1 572 DJU), qui
gonflerait la baisse (gaz par compteur 2021 → 2024 : −23,3 %, DJU −20,5 % : la borne perdrait son sens).

## La forme

- Chapô + 4 KPI calculés (gaz/compteur 2024, variation, degrés-jours, nombre d'EPCI au-delà du climat).
- Preuve : histogramme des EPCI par tranche de 5 points de variation, ligne de référence sur la tranche
  des degrés-jours — la distribution montre que ce n'est pas une moyenne.
- Nuance 1 : histogramme croisé gaz / électricité (même découpage, jointure `full`).
- Nuance 2 : le défaut de la donnée montré par la donnée (longueur des valeurs `THERMOR` et `PART`).
- Exploration : tableau cherchable, une ligne par EPCI, gaz et électricité 2019/2024.

## Honnêteté

- Ratio de sommes (jamais moyenne des variations d'EPCI) pour le national.
- Seuls GRDF et Enedis : les régies publient des valeurs aberrantes (Roquebillière 2024 : 4 594 884 MWh pour
  1 264 compteurs, ≈ 2,9 % du total national électricité ; Caléo Guebwiller 2024 : 88 MWh pour 9 056 compteurs)
  et des `secret` (58 lignes électricité, 17 gaz en 2024). GRDF = 95,9 % des compteurs gaz, Enedis 92,3 %
  des compteurs électricité (2024). Territoires absents dits en page (Strasbourg, Metz, Chartres, Colmar,
  DROM ; Bordeaux, Colmar pour le gaz).
- Degrés-jours nationaux : borne, pas correction ; dit sous le graphique.
- Compteur ≠ ménage ; codes EPCI changés (11 gaz, 14 électricité) écartés, périmètres modifiés sous même
  code non détectables.

## Phrase de lecture

« Entre 2019 et 2024, un compteur de gaz résidentiel est passé de 12 167 à 9 434 kWh par an : −22,5 %.
Les degrés-jours n'ont varié que de −11,3 % : même si tout le gaz servait à chauffer, la douceur
n'expliquerait qu'au plus 50 % de la baisse. » (calculée, `dsfr-data-repeat`).

## Ce qu'on ne montre pas

Correction climatique locale ; régies ; ménages ; EPCI < 100 compteurs ; années 2020-2023 ; carte.
