# Suivi — Plan de relance - Soutien aux projets industriels

> Le journal de la transformation. Une ligne par intervention, la plus recente en haut.
> **Ce fichier n'est jamais ecrase par un script.**

| Date | Ce qui a change | Pourquoi | Verifie comment |
|---|---|---|---|
| 2026-09-26 | Recréation complète : titre-message « un plan de PME, une décarbonation de grands groupes », chapô et cartes miroir calculés, barres 100 % taille × mesure avec repère « Ensemble », top 10 des sites en part du CO₂, nuances, exploration (facettes, KPI, carte + légende, régions), « ce qu'on ne montre pas », `#analyse` réécrite courte. Camembert et histogramme région × mesure retirés. | Le jeu établit un paradoxe (61 % PME / 61 % GE en décarbonation) et une concentration du CO₂ (1 site = 19,5 %, 10 sites = 42,0 %) que la reproduction ne montrait pas. | Chiffres rejoués sur l'export complet et `group_by` API ; recette `viz/plan-de-relance` err 0 / kpi 3 / graph 3 / cfg 0 ; Playwright : survol des deux graphiques (infobulles stylées), facette Bretagne → 98 projets, 64,3 % PME, preuves inchangées ; pas de débordement à 390 px ; capture `captures/recreation-2026-09-26/reprise.png`. |
