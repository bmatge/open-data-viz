# Suivi — Observatoire des finances et de la gestion publique locales

> Le journal de la transformation. Une ligne par intervention, la plus recente en haut.
> **Ce fichier n'est jamais ecrase par un script.**

| Date | Ce qui a change | Pourquoi | Verifie comment |
|---|---|---|---|
| 2026-09-26 | Dossier créé. `public/viz/ofgl.html` passe d'une analyse seule à une page-récit sur `ofgl-base-departements-consolidee` (data.ofgl.fr) : épargne brute des 95 départements 12,1 → 5,1 Md€ (2022 → 2024), ciseaux en base 100, 18 départements en épargne nette négative, carte du taux d'épargne brute 2024, tableau des 95. `#analyse` réécrite, LIM-007 à requalifier. | L'analyse précédente jugeait la page irreproductible faute de règle d'agrégation ; l'OFGL publie ces agrégats (calculés depuis les balances DGFiP) sur un portail ODS ouvert, CORS `*`, sans clé. | Chiffres rejoués à l'API le 2026-09-26 (records + exports) ; `RECETTE_BASE=http://localhost:3505 RECETTE_PAGES=viz/ofgl node scripts/recette-pages.mjs` → err 0, kpi 4, graph 4, cfg 0 ; Playwright : 5 graphiques rendus, survol barre 2024 (« 2024 5,1 Md€ »), survol carte (« Savoie 14 »), seul avertissement : Alsace `67A` hors référentiel carte. Capture `captures/recreation-2026-09-26/reprise.png`. |
