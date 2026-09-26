# Suivi — Fréquentation des monuments nationaux

> Le journal de la transformation. Une ligne par intervention, la plus recente en haut.
> **Ce fichier n'est jamais ecrase par un script.**

| Date | Ce qui a change | Pourquoi | Verifie comment |
|---|---|---|---|
| 2026-09-26 | Création de la page (fiche 10, vague 2) : chapô et 4 KPI calculés ; premier monument par année (barres groupées des 4 premiers de 2019 + tableau) ; indice base 100 Paris / reste ; périmètre constant, entrants et sortants parisiens, écart à 2019 des 15 premiers ; petits multiples des 12 premiers (axe commun) ; exploration pivot + facette région ; ce qu'on ne montre pas ; `#analyse`. Titre-message corrigé : Chambord premier **deux** années ; ajout « seul Paris a fait mieux qu'en 2019 » ; Chambord hors CMN (description du jeu) | Deuxième vague Culture | Chiffres recalculés en Python sur les 396 lignes Tabular et identiques à l'affichage (chapô, KPI, phrases, 15 titres de graphiques, tableau des premiers) ; recette `err: 0 kpi: 4 graph:15 carte: 0 cfg:0` (port 3830, RECETTE_PROXY) ; Playwright : défilement complet, 0 erreur console, avertissements #765 seulement (et un avertissement de jointure inner voulue, top4-j) ; survol barre Chambord 2020 : infobulle 428,6 / 497 / 575,9 / 269,4 milliers (conforme, séries non nommées : AM-086) ; version en courbe de l'indice abandonnée (spline sous les points, axe « 2019.5 ») ; captures `captures/creation-2026-09-26/page.png`, `survol.png` |
