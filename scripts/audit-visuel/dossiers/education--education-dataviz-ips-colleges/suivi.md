# Suivi — IPS Collèges

> Le journal de la transformation. Une ligne par intervention, la plus recente en haut.
> **Ce fichier n'est jamais ecrase par un script.**

| Date | Ce qui a change | Pourquoi | Verifie comment |
|---|---|---|---|
| 2026-09-26 | Recréation en page éditoriale : titre-message, accroche 3 KPI, preuve (écart public/privé par rentrée, rupture 2022), suivi à collèges constants, références DEPP, concentration par classe d'IPS, écarts par académie, puis le localisateur (millésime 2024-2025), conclusion et notes | La page était un localisateur juste mais muet ; le jeu porte neuf rentrées et une histoire (l'écart se creuse) | Chiffres rejoués à l'API (group_by rentrée × secteur, exports 2022/2024 appariés par UAI, refs `fr-en-ips-colleges-ap2023`) ; recette `err: 0 kpi: 7 graph: 3 carte: 6 cfg:0` ; Playwright : 0 erreur console, survol des 3 graphiques, capture `captures/recreation-2026-09-26/reprise.png` |
