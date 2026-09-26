# Suivi — Données essentielles de la commande publique - données enrichies

> Le journal de la transformation. Une ligne par intervention, la plus recente en haut.
> **Ce fichier n'est jamais ecrase par un script.**

| Date | Ce qui a change | Pourquoi | Verifie comment |
|---|---|---|---|
| 2026-09-26 | Recréation éditoriale : titre-message « la collecte a changé de canal », chapô calculé (pivot + repeat), flux mensuel + ligne de référence, barres groupées canal × année, bloc « ce que compte une ligne » (unité, montants, procédures), exploration par facettes serveur + recherche acheteur en contexte, section « ce qu'on ne montre pas ». Plus aucune `<option>` en dur. | Brief de recréation : répondre avant le clic ; l'original ne portait aucune dimension temporelle, qui est l'histoire du jeu. | Chiffres rejoués à l'API ; Playwright (7 graphiques, 10 KPI, 0 erreur console, survol : pastilles d'infobulle = `color-map`) ; filtre Dematis + « paris » → 129 lignes = API ; recette `recette-pages.mjs` err 0 ; capture `captures/recreation-2026-09-26/reprise.png`. |
