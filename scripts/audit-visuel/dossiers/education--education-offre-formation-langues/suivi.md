# Suivi — Offre de langues dans les collèges et lycées

> Le journal de la transformation. Une ligne par intervention, la plus recente en haut.
> **Ce fichier n'est jamais ecrase par un script.**

| Date | Ce qui a change | Pourquoi | Verifie comment |
|---|---|---|---|
| 2026-09-26 | Recréation en récit : chapeau et KPI calculés, barres triées des langues (part d'établissements), carte `map-aca` de l'allemand, barres allemand/italien par académie, nuances (langues par établissement, outre-mer, LV1), exploration conservée (sélecteur en établissements), section « ce qu'on ne montre pas », `#analyse` réécrite. Comptes distincts faits côté client sur un export regroupé par établissement. | L'histoire du jeu (trois langues partout, l'allemand qui recule au sud) ; l'ancien chapeau était faux (30 langues au lieu de 37, lignes lues comme établissements) ; `count(distinct)` ODS approché (PG-026). | Chiffres rejoués sur l'export complet (Python) ; recette `recette-pages.mjs` : 4 KPI, 2 graphiques, 0 erreur de config, 1 erreur console = tuile IGN 404 externe ; Playwright : défilement, survol, choix « Italien » (2 867 établissements localisés) ; capture `captures/recreation-2026-09-26/reprise.png`. |
