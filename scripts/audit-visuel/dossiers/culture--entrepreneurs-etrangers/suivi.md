# Suivi — culture / entrepreneurs-etrangers

## 2026-09-27 — création (agent vague 5, fiche 26)

**Fait.** Page créée `public/culture/entrepreneurs-etrangers.html` (dsfr-data 0.42.0 bundle
`core`, DSFR 1.14.4, DSFR Chart 2.1.1 + CSS). Source Tabular
`e6a3517f-dac4-446f-bffd-02216be7bfb0` en `fetch-mode="export"` (Parquet présent, vérifié via
`/api/2/datasets/resources/{rid}/`). Délai et durée calculés dans `compute` par un numéro de jour
civil (year/month/day/floor), faute de fonction de différence de dates.

**Vérifié comment.**
- Chiffres : recalcul Python sur l'export complet (voir `analyse-metier.md`), identiques à
  l'affichage relevé au navigateur (Playwright, tunnel SOCKS, port 3876).
- Recette `RECETTE_PROXY=socks5://localhost:1080 RECETTE_PAGES=culture/entrepreneurs-etrangers` :
  err 0, kpi 7, graph 5, carte 0, cfg 0.
- Console : 0 erreur ; 10 avertissements #765 (plusieurs queries sur `dec-n`, attendus).
- Survol du graphique des délais : infobulle stylée (« 30 à 44 jours avant — 726 déclarations »),
  pastille grise conforme à la barre (`captures/creation-2026-09-26/survol-delai.png`).
- Facette par URL `?tranche_delai=Déclarée après le début` → 23 déclarations, KPI 100 % / 0 %.
- 375 px : `scrollWidth` 375.
- Capture pleine page : `captures/creation-2026-09-26/page.png`.

**Corrigé en cours de route.** `{{d_date_depot_dossier}}` vide dans le chapô : le
`prefix-right` de `dsfr-data-join` ne s'applique qu'aux champs en collision ; la date du premier
dépôt garde son nom (`date_depot_dossier`), celle du dernier (seconde jointure) devient
`f_date_depot_dossier`. Documenté (« en cas de collision ») : erreur de lecture, pas un constat.
