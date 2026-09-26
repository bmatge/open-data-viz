# Suivi — La culture des collectivités

> Le journal de la transformation. Une ligne par intervention, la plus recente en haut.
> **Ce fichier n'est jamais ecrase par un script.**

| Date | Ce qui a change | Pourquoi | Verifie comment |
|---|---|---|---|
| 2026-09-26 | Création de la page (fiche 1 Culture) : chapô et 3 KPI calculés ; dépense par échelon (concat + `share_percent`) ; carte départementale €/hab (Alsace `67,68` par `split` + `explode`) ; top 10 fonctionnement/investissement ; régions en trois séries ; communes par taille (ratio des sommes) ; trois tableaux explorables ; Rhône recalculé hors Métropole de Lyon par jointure ; ce qu'on ne montre pas ; `#analyse`. Titre élargi : l'échelon communal pèse 59,7 % contre 10,3 % aux départements | Vague 1 Culture | Quatre jeux téléchargés en entier par l'API Tabular (tunnel SOCKS), chiffres recalculés en Python et identiques à l'affichage (69,2 / 4,0 / ÷17 ; 6 540 / 2 504 / 1 131 / 781 M€ ; 83 → 201 €/hab ; 106/3 255 ; Rhône 30 €) ; description des jeux data.gouv.fr lue (collectivités uniques, Métropole de Lyon dans les EPCI) ; Playwright port 3814 via proxy : défilement de chaque graphique, 0 erreur console, 17 avertissements #765 ; survol du graphique des échelons : infobulle « 6,54 Md€ » ; recette (copie locale du script avec `bypass` localhost) `err: 0 kpi: 3 graph: 4 cfg:0`, 0 légende fausse ; captures `captures/creation-2026-09-26/page.png`, `survol.png` |
