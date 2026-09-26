# Analyse métier — Expositions d'intérêt national 2014-2025

Fiche 28 de `docs/portail-culture/proposition.md`. Niveau `dataviz-metier` : avancé (page), chaque bloc relu au niveau base.

## L'histoire

Question du cadrage : « quels musées reviennent ? ». Réponse de la donnée (rejouée le 2026-09-27 sur les 276 lignes
et sur Muséofile, 1 216 musées) :

- 261 expositions labellisées de 2014 à 2025, dans **170 musées** de France (14,0 % des 1 216 de Muséofile).
- **102 musées (60 %) ne l'ont eu qu'une fois ; les 68 autres (40 %) totalisent 173 des 275 labels-musée, 62,9 %.**
- Les habitués : beaux-arts de Lyon et musée Fabre (6), beaux-arts de Rouen et muséum de Toulouse (5), LaM, musée de
  Flandre, beaux-arts de Lille (4). Aucun au-delà de 6 en 12 éditions.
- Part des musées déjà labellisés depuis 2014, par année : ≈ 25-35 % en 2015-2018, 42-50 % en 2019-2023, 59 % en 2024,
  56 % en 2025 (18 sur 32). Effet de fenêtre en partie mécanique (série tronquée à gauche : label créé en 1999), dit en page.
- Taux par région (musées labellisés / musées de France de Muséofile) : outre-mer 31,8 % (7/22), Grand Est 19,0 %,
  Nouvelle-Aquitaine 18,9 % … Île-de-France 9,8 % (13/133), Centre-Val de Loire 9,4 %.

Écart au cadrage : « 276 ; 33 en 2025 » compte une ligne entièrement vide (2025) → 275 labels-musée, 32 en 2025 ;
9 expositions sont coproduites (23 lignes) → 261 expositions, pas 275.

## La forme

1. Barres groupées part des musées / part des labels par classe (1, 2, 3, 4-6 fois) : le croisement des deux barres est la
   concentration (gris = musées, bleu = labels, `color-map`).
2. Podium (`dsfr-data-podium`) des 7 musées labellisés au moins quatre fois, sous-titre ville + première/dernière année.
3. Barres empilées par année : premier label du fichier (gris) / déjà labellisé (bleu), encadré « hausse en partie mécanique ».
4. Taux par région, barres triées, outre-mer mis en évidence ; taux plutôt que comptes (dénominateur Muséofile).
5. Carte de cercles (rayon = nombre de labels), encarts DROM, vue fixe.
6. Exploration : facettes Année / Région / statut + liste recherchable.

## Honnêteté

- Clé = identifiant Muséofile, nom repris de Muséofile (11 identifiants ont deux graphies dans le fichier des labels).
- Une ligne contradictoire (2016, « beaux-arts » de Bordeaux sous l'identifiant du musée d'Aquitaine) : l'identifiant fait foi, dit en page.
- Région reprise de Muséofile (trois graphies de la Bourgogne-Franche-Comté dans le fichier des labels).
- « Label » = un couple musée × exposition ; une exposition coproduite compte pour chaque musée : dit dans le chapô et en fin de page.
- Taux régionaux sur petits effectifs : effectifs dans le tableau a11y.
- Le label vise les musées « dans les régions » (description du jeu) : le faible taux francilien décrit aussi la cible du label.

## Phrases de lecture

Toutes calculées (`dsfr-data-repeat`) : chapô, répartition, podium, année la plus récente / la plus fournie / la plus basse,
région en tête / Île-de-France / région la plus basse, expositions partagées, ligne vide.

## Ce qu'on ne montre pas

Labels avant 2014 ; montant du soutien ; fréquentation des expositions ; candidatures non retenues ; la ligne vide ;
les graphies du fichier.
