# Suivi — culture / sibil-lieux

## 2026-09-27 — création (agent vague 4, fiche 16)

**Fait.** Page `public/culture/sibil-lieux.html` (dsfr-data 0.42.0 bundle `core`, DSFR 1.14.4,
DSFR Chart 2.1.1 + CSS). Source : Tabular `cc51d662-d0e0-4a84-bca0-bd26c643b879` en
`fetch-mode="export"` (Parquet 9,4 Mo), `select` de 8 colonnes, `max-records="250000"`.
Population : `6126f348…` (départements 2023), `f27f0329…` filtré sur 75056 (Paris),
`4dfccc0d…` filtré sur 02|03 (Martinique, Guyane), empilés par `dsfr-data-concat`.

**Vérifié comment.**
- Chiffres recalculés en DuckDB sur le Parquet complet (`hydra…/parquet/cc51d662….parquet`,
  204 628 lignes = `total_lines` du profil) : 204 628 ; CLOTURE 198 934, ENREGISTRE 5 625,
  BROUILLON 69 ; Paris 46 314 (22,6 %) ; festival 19 683 (9,6 %) ; 14 752 lieux, 760 à Paris ;
  382 lieux ≥ 100 déclarations (47 %), 6 969 à une seule ; taux Paris 2 142, reste 240, ×8,9 ;
  Vaucluse 872 (35 % festival) ; Guyane 24 ; mars 2026 12 924 ; août 2025 3 206 ; juillet 2025
  43 % festival ; décembre 2024 2,8 %. Tous identiques à l'affichage relevé au navigateur.
- Inversion jour-mois : CSV brut (`ministere-culture.s3…/Export_SIBIL_datagouv.csv`, 12 premières
  lignes) comparé à l'API et au Parquet : « 10-08-2026 » → 2026-10-08, « 31-08-2026 » → 2026-08-31,
  « 10-12-2019 » → 2019-10-12. 75 001 dates inversées sur 204 564. Après correction : première
  représentation 26/09/2024, dernière 24/09/2026, dernière création 25/09/2026 (export du 26).
- Encodage : caractères non ASCII recensés colonne par colonne (Č 4 718, Ŕ 4 037, Ę 1 144… dans
  `lieu_nom`) ; table de correspondance ISO-8859-15 → Windows-1250 vérifiée sur des exemples
  (BŒRSCH, L'HAŸ-LES-ROSES, ADÉLAÏDE).
- Recette (`RECETTE_PAGES=culture/sibil-lieux`, `RECETTE_PROXY=socks5://localhost:1080`, port
  3843) : err 0, kpi 7, graph 4, carte 0, cfg 0.
- Console : 0 erreur ; avertissements #765 attendus (plusieurs queries sur une source).
- Chargement : chapeau et taux remplis ≈ 5,6–6 s après `domcontentloaded` (trois mesures).
- Survol du graphique mensuel : infobulle stylée, juillet 2025 = 4 003 + 3 020 (= 7 023, DuckDB).
- Facette `?departement=Isère` : 346 lieux, 4 313 déclarations (DuckDB : 4 313) — le nom recodé
  sert de clé d'URL.
- 375 px : `scrollWidth` 375.
- Captures : `captures/creation-2026-09-26/page.png` (pleine page),
  `dates-publiees-corrigees.png`, `rejeu-colormap-courbe.png`.

**Corrigé en cours de route.**
- `aggregate="date_v:min"` sur 204 628 lignes : « RangeError: Maximum call stack size exceeded »
  (`Math.min(...values)`, `dsfr-data-query.ts` l. 1847). Rejoué sur page minimale inline :
  100 000 lignes OK, 200 000 KO — et le répéteur garde l'ancien résultat affiché. Contournement :
  `group-by="k, date_v"` puis min/max sur les 730 groupes.
- `an * 100 + mo` sur une ligne sans date rend `''` (le `+` concatène), que `isnotnull` laisse
  passer : un point « déc. » sans année en tête de la courbe. Rejoué sur page minimale. Garde
  `when sans_date = 1 then null else …`.
- `color-map` sur `type="line"` : lignes et légende recolorées, points non (palette par défaut) —
  point gris sur ligne bleue. Rejoué sans databox (3 lignes inline). Retiré de ce graphique.
- Titres : « quatre dates sur dix » → « plus d'une sur trois » (37 %) ; article devant le nom de
  département retiré des phrases calculées.
