# Suivi — culture / imprimeurs-19e

## 2026-09-27 — création (agent vague 4, fiche 18)

**Fait.** Page créée `public/culture/imprimeurs-19e.html` (dsfr-data 0.42.0 bundle `core`, pas de
carte ; DSFR 1.14.4 ; DSFR Chart 2.1.1 + CSS). Source unique : Tabular
`1c3f80c4-ace5-41ef-b6e1-983a8ccb5c69` en `fetch-mode="export"` (Parquet), `select` de 11 colonnes,
`max-records="20000"` ; tout le reste côté client (`split` + `explode` pour le métier, `compute` pour
l'état civil et la décennie).

**Vérifié comment.**
- Parquet complet téléchargé (`hydra.s3.rbx.io.cloud.ovh.net/parquet/1c3f80c4….parquet`, 17 969
  lignes = profil Tabular) ; chaque chiffre recalculé en pandas avec les mêmes règles que le
  `compute`, identique à l'affichage (voir `analyse-metier.md`).
- Décennie par cascade `contains()` comparée à une extraction regex `1[78]\d\d` (minimum) sur les
  5 096 lignes de la Seine : 3 écarts, tous dus à la regex (numéros de brevet « n° 1765 », « n° 1749 »
  dans la cellule de date) ; la cascade donne la bonne décennie. Un numéro « n° 18xx » la tromperait.
- Chargement (Playwright, tunnel SOCKS, port 3845) : 1 appel `api/2/datasets/resources/{rid}/` à
  0,3 s puis 12 lectures `Range` parallèles du Parquet, terminées à 0,94 s.
- Recette `RECETTE_PAGES=culture/imprimeurs-19e RECETTE_PROXY=socks5://localhost:1080` : err 0,
  kpi 6, graph 4, carte 0, cfg 0.
- Console : 0 erreur ; avertissements #765 attendus (plusieurs queries sur `b-n`, `dep`, `dep-tri`).
- Survol : infobulle stylée (« Années 1860 — 30,4 % ») ; libellés et valeurs des 4 graphiques relus
  dans les attributs `x`/`y`.
- Exploration : recherche « Didot » → 9 brevetés, fiches avec lien vers la notice ; KPI de sélection
  = KPI de synthèse sans filtre (17 969 / 18,1 % / 37 %).
- 375 px au chargement : `scrollWidth` 375, pas de défilement horizontal.
- Captures : `captures/creation-2026-09-26/page.png`, `survol.png`.

**Observé, non corrigé ici.** La légende d'un graphique `selected-palette="neutral"` +
`highlight-index` affiche une pastille grise alors que les barres mises en évidence sont bleues
(même rendu sur `festivals`) : légende d'une seule série, peu informative, pas fausse sur la valeur.
