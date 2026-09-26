# Suivi — Génération 2024

> Le journal de la transformation. Une ligne par intervention, la plus recente en haut.
> **Ce fichier n'est jamais ecrase par un script.**

| Date | Ce qui a change | Pourquoi | Verifie comment |
|---|---|---|---|
| 2026-09-26 | Recréation en récit : taux de labellisation rapportés à l'annuaire de l'éducation (agrégé côté serveur, jointure type × segment, pivot) ; accroche collèges d'éducation prioritaire, barres groupées type × secteur/EP, taux des collèges publics par académie, calendrier et échéance ; exploration (recherche, facettes dont EP, carte, tableau) conservée ; source sans `where position is not null` | Brief de recréation (lot 5) : compté en volumes, le label paraissait « d'écoles » ; rapporté à l'existant, ce sont les écoles les moins touchées (15,3 %) et les collèges publics en REP+ les plus (47,3 %) | Chiffres recalculés en Python sur les deux exports du 2026-09-26 (jointure UAI et agrégats) et relus au navigateur ; recette `err: 0 kpi: 8 graph: 3 cfg:0` ; Playwright port 3605 : défilement des 3 graphiques et de la carte, infobulle « Collèges 15,3 % 35,1 % 44,5 % 47,3 % », tableaux a11y remplis ; capture `captures/recreation-2026-09-26/reprise.png` |
| | | | |
