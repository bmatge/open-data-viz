# Suivi — culture--journees-patrimoine

## 2026-09-27 — création (vague 5)

- Sondage : profil Tabular (36 colonnes, 28 395 lignes), métadonnées de ressource (`parquet_url` présent, 15,3 Mo),
  export CSV complet téléchargé par le tunnel SOCKS et recalculé en pandas : 5 910 moteur, 22 257 vides, 228 autre
  handicap seulement ; 18 322 lieux ; 44 tags ; parts par tag et par région ; 4 706 lieux multi-événements dont
  981 mixtes, 607 constants, 3 118 muets. Tous les chiffres de la page coïncident avec ce recalcul.
- Page créée : `fetch-mode="export"` + `select` de 10 colonnes, `max-records="100000"`, tout le reste côté client
  (`compute`, `split`, `explode`, `group-by`, `join`).
- Corrections en cours de vérification : alias `{{un__sum}}` → `{{n}}` (sortie `un:sum:n`) ; `where` sur un tag
  contenant des virgules échappé en `%2C` puis remplacé par une ligne de synthèse ; phrases de lecture à plusieurs
  `dsfr-data-repeat` (rendues en blocs, une ligne par morceau) regroupées en un seul gabarit (ligne unique via
  `group-by="k"` et `dsfr-data-join prefix-right`) ; phrase « outre-mer » corrigée (La Réunion a 274 événements).
- Vérifié au navigateur (Playwright, proxy SOCKS) : 3 graphiques, 10 KPI, zéro erreur console (avertissements #765
  attendus : agrégations côté client voulues) ; survol du graphique par tag → infobulle « Tourisme et handicap
  43,9 % » ; recette `RECETTE_PAGES=culture/journees-patrimoine` : `err: 0 kpi:10 graph: 3 cfg:0`.
- Capture : `captures/creation-2026-09-26/page.png`.
