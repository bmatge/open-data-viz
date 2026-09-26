# Suivi — Données de comptabilité générale de l'État (2016-2025)

> Le journal de la transformation. Une ligne par intervention, la plus recente en haut.
> **Ce fichier n'est jamais ecrase par un script.**

| Date | Ce qui a change | Pourquoi | Verifie comment |
|---|---|---|---|
| 2026-09-26 | Recréation éditoriale : chapeau et phrases calculés (pivot + join + repeat), 3 courbes actif/dette/autres passifs, situation nette avec N/N-1 (`diff`), résultat avant/après 2020, charges par poste, top 15 missions 2025, exploration par mission (charges seules, facette en contexte) | Brief de recréation : trouver l'histoire — la dette financière = 90 % de la hausse du passif ; déficit ×2,1 depuis 2020 ; 95 % des produits sans mission | Chiffres rejoués à l'API (exports/json) ; recette `err: 0 kpi: 3 graph: 7` ; Playwright port 3306 : 7 canvas, tableaux a11y relus, survol (infobulle « 2021 −142,09 Md€ »), sélection « Défense » → refetch filtré + URL ; capture `captures/recreation-2026-09-26/reprise.png` |
