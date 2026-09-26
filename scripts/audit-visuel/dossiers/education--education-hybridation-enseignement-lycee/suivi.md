# Suivi — Hybridation de l’enseignement en lycée

> Le journal de la transformation. Une ligne par intervention, la plus recente en haut.
> **Ce fichier n'est jamais ecrase par un script.**

| Date | Ce qui a change | Pourquoi | Verifie comment |
|---|---|---|---|
| 2026-09-26 | Recréation en récit : titre-message « l'État a payé la moitié, les régions n'ont pas dépensé la même chose par classe » ; chapô et phrases calculés ; barres empilées de la dépense par classe (État / collectivité) avec ligne nationale ; taux trié par dépense ; choroplèthe de la dépense par classe ; recherche + facettes + liste des lycées ; notes sur les manques (PACA, Wallis, Normandie, Réunion). dsfr-data 0.42.0. | Le taux de couverture présenté comme variable vaut 50 % pour 13 collectivités sur 19 : l'écart est dans la dépense par classe (1 408 € IdF, 121 € Occitanie). | Chiffres rejoués à l'API (export JSON, 19 + 1 713 lignes) ; recette `recette-pages.mjs` : 0 erreur, 6 KPI, 2 graphiques ; Playwright : survol (infobulle 649 € / 759 € IdF, pastilles justes), légende de carte, 0 erreur console ; capture `captures/recreation-2026-09-26/reprise.png`. |
