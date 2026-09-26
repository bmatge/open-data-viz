# Suivi — Quelles personnalités ont donné leur nom aux écoles ?

> Le journal de la transformation. Une ligne par intervention, la plus recente en haut.
> **Ce fichier n'est jamais ecrase par un script.**

| Date | Ce qui a change | Pourquoi | Verifie comment |
|---|---|---|---|
| 2026-09-26 | **Recréation** (niveau avancé) : nouvelle histoire « le stock reste masculin (20,0 %), le flux 2019→2024 est presque paritaire (48,2 % des gains) ». Deux sources agrégées serveur (`pat-an` 18 lignes, `pat-flux` ≈ 5 500 lignes en export) + 2 sondes ; pivot + compute pour gains/pertes ; 4 KPI ratio ; barres de part 2019-2024 (parité marquée), top 15 gains et top 20 stock colorés par genre ; phrases toutes calculées (`dsfr-data-repeat`) ; tableau exploratoire ; section « ce qu'on ne montre pas » ; filtre d'année 2009-2024 retiré ; `#analyse` réécrite. | Les rentrées 2009-2018 portent des patronymes recopiés en arrière (Samuel Paty dès 2009) : l'ancienne page laissait lire une évolution inexistante. | API rejouée pour chaque chiffre (2 297/9 164/20,0 % ; 18,5 % en 2019 ; 267/554, 81/518 ; Simone Veil 120→193 ; 35 952 ; 10 354 ; 485/2 821). Playwright dsfr-data 0.42.0 : 0 erreur, 0 HTTP ≥ 400, 9 avertissements #765 ; survol des trois graphiques (infobulles stylées, « 2022 19,3 % », « SIMONE VEIL 73 / 0 », « JULES FERRY 0 / 428 »), légendes conformes. `recette-pages.mjs` : err 0, kpi 4, graph 3. Capture `captures/recreation-2026-09-26/reprise.png`. |
| | | | |
