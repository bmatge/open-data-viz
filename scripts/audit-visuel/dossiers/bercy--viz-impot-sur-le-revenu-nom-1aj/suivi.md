# Suivi — L'impôt sur le revenu : les déclarations nationales

> Le journal de la transformation. Une ligne par intervention, la plus recente en haut.
> **Ce fichier n'est jamais ecrase par un script.**

| Date | Ce qui a change | Pourquoi | Verifie comment |
|---|---|---|---|
| 2026-09-26 | Relecture `dataviz-metier` appliquée (IR-01 à IR-08, IR-10 ; IR-09 consigné comme constat, pas de `series-field`). Deux sources + un contexte (`ir` recherche/liste, `ir2` courbes/KPI, `dsfr-data-facets context`, recherche sur `?q=`) ; unité du montant calculée (`normalize compute`), plus aucun « € » statique ; fiche de la case (bornes + libellés portés par le code) ; KPI `nom:distinct`, `libelle:distinct`, `format="compact"` ; `y-min="0"` ; `count-label="ligne"` ; descriptions a11y ; titre `dsfr-data-context-value` ; `#analyse` réécrite (AM-031 corrigé, « seule clé stable » retiré). | Les « € » s'affichaient sur des effectifs (0AC), un code réattribué (1BI) se lisait comme une chute, une recherche sans case sommait 96 cases. | Playwright (dsfr-data 0.33.0 CDN, port 3102) sur page vide, ?nom=1AJ/0AC/0CF/1BI/1CT, « pensions » puis 1BI : 0 erreur console (2 avertissements #765 attendus), 0 requête page vide, 2 requêtes par case, 1 requête après « pensions » (762 lignes, 96 codes, courbes en attente), 0 « € » hors #analyse, KPI 616 Md (1AJ), fiche 1BI = 3 libellés 2006-2017 / 2019-2020 / 2021-2024, 1CT « 8 années couvertes, de 2006 à 2024 », axes à 0, infobulle survolée (« 2,024 » : préexistant, DSFR Chart). Recette `recette-pages.mjs` : err 0, cfg 0. Export API rejoué : 1 242 lignes / 209 codes montant = nombre, 0 null. |
| | | | |
