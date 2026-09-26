# Suivi — Tableau de bord Rappel Conso (variante)

> Le journal de la transformation. Une ligne par intervention, la plus recente en haut.
> **Ce fichier n'est jamais ecrase par un script.**

| Date | Ce qui a change | Pourquoi | Verifie comment |
|---|---|---|---|
| 2026-09-26 | Page recréée en récit : H1-message (oxyde d'éthylène → listeria), chapeau calculé (`dsfr-data-repeat` sur repères joints par clé constante), 2 KPI listeria année en cours / même date N-1 (`now()`), barres empilées par année close et motif, part listeria par sous-catégorie, taux de rappels imposés par année, exploration par facettes `context` (cascade catégorie → famille, zéro `<option>` en dur), section « ce qu'on ne montre pas ». Sélecteur de date, script JS, 4 graphiques de répartition et 67 options en dur retirés. Dossier d'audit créé (la page n'en avait pas). | Relecture dataviz-metier niveau avancé : répartitions sur toute la période muettes et trompeuses (le 87 % volontaire mélange la crise 2021 à 34 % imposés et des années à ~5 %). | API 2026-09-26 (records + export local de 18 699 fiches) : 3 917 / 2 196 / 289 / 764 / 667 / 478 / 2 435 (68,1 %) / 34,1 % / 5,4 % identiques à la page. Playwright (0.42.0 CDN) : 5 graphiques rendus, survol « 2021 289 2 196 1 432 », facette alimentation → risques listeria 3 522 ; 0 erreur console, 4 avertissements #765 (voir technique) ; `recette-pages.mjs` err 0, kpi 2, graph 5. Capture `captures/recreation-2026-09-26/reprise.png`. |
