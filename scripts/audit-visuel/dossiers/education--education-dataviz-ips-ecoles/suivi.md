# Suivi — IPS Ecoles

> Le journal de la transformation. Une ligne par intervention, la plus recente en haut.
> **Ce fichier n'est jamais ecrase par un script.**

| Date | Ce qui a change | Pourquoi | Verifie comment |
|---|---|---|---|
| 2026-09-26 | Recreation en recit (rentree 2024-2025) : titre-message, chapo et 3 KPI calcules, etendues 1er-9e decile par commune et par departement, ecart prive-public par rentree + suivi a ecoles constantes (`lazy`), exploration par departement (`require-where`) avec histogramme et carte ; branche `is_null` ajoutee aux tranches | La page etait un localisateur ; le jeu raconte que l'ecart social se joue entre ecoles voisines | Chiffres rejoues a l'API (31,0 ; 67,0 ; 27/28 ; 51/101 ; 13,4 ; 39,8 ; +1,8/+0,3) ; recette `err: 0 kpi: 7 graph: 3 carte: 1` ; Playwright : 4 graphiques + carte (Bouches-du-Rhone, 687 cercles), survol, zero erreur console ; capture `captures/recreation-2026-09-26/reprise.png` |
| | | | |
