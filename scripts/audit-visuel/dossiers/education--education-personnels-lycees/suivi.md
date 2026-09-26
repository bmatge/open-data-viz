# Suivi — Les personnels dans les lycées français

> Le journal de la transformation. Une ligne par intervention, la plus recente en haut.
> **Ce fichier n'est jamais ecrase par un script.**

| Date | Ce qui a change | Pourquoi | Verifie comment |
|---|---|---|---|
| 2026-09-26 | Recréation en page éditoriale : titre-message et chapô calculés (deux métiers : 37,6 % d'agrégés en voie GT, 71,1 % de PLP en LP), barres empilées à 100 % par famille, carte à voie égale (agrégés / agrégés + certifiés), 135 lycées à majorité d'agrégés (liste + top 10), nuance âge/statut, exploration avec facette nature, PLP ajoutés ; dsfr-data 0.42.0 | La page additionnait des moyennes nationales qui mêlent deux corps ; la carte des agrégés mesurait la part de voie pro | Chiffres rejoués à l'API (export complet, Python) ; recette `err: 0 cfg: 0` ; Playwright : défilement, survol (infobulle des barres empilées stylée), console sans erreur (13 avertissements #765 informatifs), capture `captures/recreation-2026-09-26/reprise.png` |
| | | | |
