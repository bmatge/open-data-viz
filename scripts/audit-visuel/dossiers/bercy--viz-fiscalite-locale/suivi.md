# Suivi — Fiscalité locale des particuliers et des professionnels

> Le journal de la transformation. Une ligne par intervention, la plus recente en haut.
> **Ce fichier n'est jamais ecrase par un script.**

| Date | Ce qui a change | Pourquoi | Verifie comment |
|---|---|---|---|
| 2026-09-26 | Recréation de `public/viz/fiscalite-locale.html` en page-récit : titre-message sur la majoration THRS (233 → 1 628 communes, rupture 2024), KPI et phrases calculés (pivot + compute + repeat), carte départementale pondérée, nuance TFB (barres à zéro), puis l'outil départemental (exercice + département, KPI vs France, choroplèthe communale, tableau serveur). Moyennes pondérées par la population partout ; sélecteur de région supprimé. `#analyse` réécrite. | Brief de recréation : la page ne disait rien avant clic, et ses moyennes simples surpondéraient les petites communes. | Chiffres rejoués à l'API le 2026-09-26 ; `RECETTE_BASE=http://localhost:3302 RECETTE_PAGES=viz/fiscalite-locale node scripts/recette-pages.mjs` → 0 erreur, 0 erreur de config, 12 KPI, 4 graphiques, 1 carte ; Playwright : survol de la barre 2024 (« 2024 1 461 »), clic commune (fiche avec majoration), `?dep=21` (698 communes, TFB 44,91 %). Capture `captures/recreation-2026-09-26/reprise.png`. |
