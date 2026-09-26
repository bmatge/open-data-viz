# Suivi — culture / plan-relance-culture

## 2026-09-27 — création (agent vague 5, fiche 27)

**Fait.** Page `public/culture/plan-relance-culture.html` (dsfr-data 0.42.0 bundle complet pour la carte ; DSFR 1.14.4 ;
DSFR Chart 2.1.1 + CSS). Une source Tabular `4b798b56…` en `fetch-mode="export"` (Parquet ; pas de `select` : la
colonne `Coordonnees GPS [lat,lon]` contient une virgule). Deux `normalize` : `rename` (virgule en `%2C`), puis
`split="gps"` + `compute` (régions en casse lisible, enveloppes abrégées, tranches, clé de doublon). Tout en client.

**Vérifié comment.**
- Jeu entier téléchargé via le tunnel SOCKS (2 pages de 200) et recalculé en Python : 328 lignes, 503 438 203 €, aucun
  montant nul ; max 100 000 000 (Villers-Cotterêts, 19,86 %) ; top 10 196 972 759 (39,1 %) ; ≤ 500 k€ : 167 lignes,
  25 617 222 € (5,09 %) ; ≥ 5 M€ : 18 lignes, 245 872 760 (48,8 %) ; tranches 81/79/53/97/15/3 lignes ; enveloppes
  (CMN 17 / 155,2 M€ ; FTE 108 / 21,2 M€ …) ; régions (HDF 120,2 M€ dont 100 M€ Villers ; IDF 118,4) ; 16 lignes
  « Fonctionnement spectacle vivant » sans commune, lieu ni opération ; 65 sans coordonnées (46,9 M€) ; doublons sur
  (région, lieu, opération, montant) : 5 clés, 8 lignes en trop, 12 096 018 €. Export Parquet présent
  (`analysis:parsing:parquet_url`).
- Navigateur (Playwright, tunnel SOCKS, port 3877) : 0 erreur console, 0 erreur de configuration ; chapô, KPI et
  phrases de lecture identiques aux chiffres Python. Avertissements : #765 (queries en aval d'une source partagée,
  attendu) ; carte « 65 lignes sans coordonnées » (attendu, dit en page). 263 cercles rendus.
- Survol : infobulle « 1 à 5 M€ — 29,6 % / 39,4 % », pastilles grise et bleue conformes au `color-map`
  (`captures/creation-2026-09-26/survol.png`).
- Recette : `RECETTE_BASE=http://localhost:3877 RECETTE_PAGES=culture/plan-relance-culture
  RECETTE_PROXY=socks5://localhost:1080` → err 0, kpi 7, graph 4, carte 1, cfg 0.
- Capture pleine page : `captures/creation-2026-09-26/page.png`.
- Premier jet corrigé : `value-fields` sur `dsfr-data-a11y` (inconnu, ignoré en silence, averti en console) →
  `value-field="Lignes, Montant"`.
