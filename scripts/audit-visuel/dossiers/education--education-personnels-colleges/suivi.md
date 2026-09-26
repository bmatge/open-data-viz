# Suivi — Les personnels dans les collèges français

> Le journal de la transformation. Une ligne par intervention, la plus recente en haut.
> **Ce fichier n'est jamais ecrase par un script.**

| Date | Ce qui a change | Pourquoi | Verifie comment |
|---|---|---|---|
| 2026-09-26 | Page recréée en récit : titre-message sur la concentration des jeunes enseignants de collège public (20,1 % en France, 49,7 % en Seine-Saint-Denis, 6,2 % dans le Finistère ; Créteil + Versailles = 16,9 % des ETP, 33,2 % des moins de 35 ans) ; barres triées par académie, carte départementale à résumé pondéré, contraste Paris / Seine-Saint-Denis, nuance outre-mer et privé ; l'ancienne reproduction devient la section d'exploration (âge et ancienneté en %) | Brief de recréation (dataviz-metier avancé) : les totaux nationaux taisaient un écart de un à huit ; et le total « tous personnels » additionnait deux périmètres (le privé n'a que ses enseignants dans le jeu) | Chiffres rejoués à l'API (ODSQL par académie/département) et sur l'export des 6 987 collèges ; recette 0 erreur, 12 KPI, 4 graphiques + 1 carte ; Playwright : survol barres et barres groupées, tableaux a11y (31/101 lignes), filtre URL Seine-Saint-Denis → 47,5 % ; capture `captures/recreation-2026-09-26/reprise.png` |
| | | | |
