# Analyse métier — Tableau de bord Rappel Conso (variante, recréée)

> La lecture `dataviz-metier` : le sens avant la syntaxe.
> **Ce fichier n'est jamais écrasé par un script.**

Recréation du 2026-09-26, **niveau avancé** (une page). Page : `public/viz/rappel-conso-tableau-de-bord.html`.
Jeu : `rappelconso-v2-gtin-espaces` (une ligne = une fiche ; 18 699 lignes = 18 699 `numero_fiche`, modifié le 2026-09-26 16:05 UTC). Chiffres rejoués à l'API le jour même, page relue au navigateur (dsfr-data 0.42.0).

## L'histoire trouvée

L'original (et la première version, fidèle) montrait des répartitions sur toute la période : alimentation en tête, 87 % de rappels volontaires, remboursement dominant. Justes, mais muettes. Lues **par année et par motif** :

- **2021, l'année record (3 917 fiches), est une crise** : 2 196 fiches (56 %) citent l'oxyde d'éthylène dans leur motif. Il tombe à 611 en 2022, 26 en 2023, 4 en 2025.
- **Hors ces deux motifs, le reste est stable** : 2 120 à 2 380 fiches par an de 2022 à 2025.
- **La listeria fait la hausse** : 289 fiches (2021) → 467 → 662 → 729 → 764 (2025, 24 % des fiches de l'année) ; 2026 : 667 au 25 septembre contre 478 à la même date en 2025 (+40 %), 26 % des fiches de l'année.
- **Où** : viandes (1 431) et lait/produits laitiers (1 004) = 68,1 % des fiches listeria depuis 2021.
- **Paradoxe / nuance** : le taux de rappels imposés par arrêté préfectoral (sur les fiches à nature renseignée) passe de 34,1 % (2021) à 15,4 % (2022) puis 4,2-5,4 % (2023-2025). Le « 87 % volontaires » de l'original mélange une crise où l'État a contraint (886 des 1 208 rappels imposés de 2021 sont de l'oxyde d'éthylène, relevé local) et des années ordinaires à ~95 % volontaires. La listeria est rappelée volontairement à 94 % (204 imposés sur 3 578).

Angle écarté : la répartition par compensation (remboursement partout, rien à raconter) ; la géographie (texte libre). Angle laissé à la page sœur `/viz/rappelconso` : volume total, part par catégorie, recherche de fiches — cette page ne la contredit pas (mêmes totaux annuels, même jeu).

## La forme

1. Chapeau calculé (`dsfr-data-repeat` sur une ligne de repères jointe par clé constante) + deux KPI année en cours / même date l'an dernier (`now()` ODSQL).
2. Preuve : barres empilées par année close (listeria / oxyde d'éthylène / autres) — une fiche n'est jamais dans deux segments (intersection vérifiée : 0).
3. Détail : barres horizontales triées, part (%) des fiches listeria par sous-catégorie, top 6 (part calculée avant `limit`, dit en description).
4. Nuance : taux de rappels imposés par année close (taux, axe à zéro).
5. Exploration : facettes catégorie → famille (cascade serveur, `context`), fiches par année (année en cours incluse, dite incomplète) et dix risques les plus cités.
6. Ce qu'on ne montre pas, puis `#analyse` courte.

## Honnêteté

- Années closes seulement dans le récit ; l'année en cours comparée à date égale.
- 2021 = neuf mois d'activité du site : son pic est **minoré**, pas gonflé.
- Oxyde d'éthylène repéré en texte libre (`search(motif_rappel, 'éthylène')`) : borne basse (2 196 contre 2 215 avec un motif large, 2021) — dit.
- Taux imposés sur fiches renseignées (2 001 fiches sans nature, dont 1 663 des 1 756 véhicules) — dit.
- Risques multiples : `like '%listeria%'` compte les combinaisons (55 fiches) — dit.
- La cause de la hausse listeria n'est pas dans le jeu : formulé comme tel.

## Phrase de lecture

> En 2021, 56 % des 3 917 fiches de rappel citaient l'oxyde d'éthylène. Ce motif a presque disparu dès 2023 ; la listeria a pris la place : 289 fiches en 2021, 764 en 2025 (2,6 fois plus). Et 2026 va plus haut : 667 fiches au 25 septembre, contre 478 à la même date en 2025 (+40 %).
