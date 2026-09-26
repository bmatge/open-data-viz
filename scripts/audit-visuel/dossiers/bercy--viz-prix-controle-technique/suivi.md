# Suivi — Prix des contrôles techniques

> Le journal de la transformation. Une ligne par intervention, la plus recente en haut.
> **Ce fichier n'est jamais ecrase par un script.**

| Date | Ce qui a change | Pourquoi | Verifie comment |
|---|---|---|---|
| 2026-09-26 | Recréation en récit : chapô calculé, carte des départements (VP diesel), 10 plus chers / 10 moins chers, énergie centre par centre (pivot), comparateur conservé avec `server-facets` + contexte + `default` au lieu des `<select>` en dur, seuil d'exclusion porté de 0 € à < 30 €, `y-min` retiré des barres horizontales | Brief de recréation (dataviz-metier avancé) ; la page précédente affirmait qu'aucune facette n'était possible (faux, FP-018) | Chiffres rejoués à l'API (select/group_by/percentile + export VP) ; décomposition de variance hors page ; Playwright : 0 erreur console, 0 config-error, survol OK, recherche « Annecy » + facettes ; recette `err: 0 kpi: 1 graph: 2 carte: 1 cfg:0` ; capture `captures/recreation-2026-09-26/reprise.png` |
