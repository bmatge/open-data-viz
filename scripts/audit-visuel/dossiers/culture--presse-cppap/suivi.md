# Suivi — culture / presse-cppap

## 2026-09-27 — création (agent vague 4, fiche 17)

**Fait.** Page créée `public/culture/presse-cppap.html` (dsfr-data 0.42.0 bundle `core`, DSFR 1.14.4,
DSFR Chart 2.1.1 + CSS). Sources Tabular :
- registre CPPAP `a98cced2-babe-45b4-95dd-ce5336155dbc` en `fetch-mode="export"` (Parquet 0,9 Mo),
  `select` de 9 colonnes, `max-records="40000"` ;
- aide à l'exemplaire posté 2023 `126591d3-a0cd-4b99-b898-dc99c0215102` (382 lignes, 2 pages) ;
- SPTEL `90207bad-994d-4998-8cac-531842a709f8` (110) ; ultramarins `ea9eab5e-6a34-4afb-b6b6-e7e0d89a3538` (32)
  — ni l'un ni l'autre n'a d'export Parquet (`parquet_url` absent).

**Vérifié comment.**
- Registre recalculé en Python sur le CSV complet du producteur (26 731 lignes, tunnel SOCKS) ;
  aides sur les lignes JSON Tabular. Tous les chiffres du texte identiques à l'affichage relevé au
  navigateur (26 731 / 4 965 / 18,6 % / 46 % / 16 % / 22 % / 1 470 / 649 / 2 552 / 55 % / 4 681 /
  31 % / 631 / 107 / 267 / 57 / 73,3 M€ / 379 / 37 → 74 % / 190 → 3,5 % / 264 → 70 %, 7,5 M€, 10 % /
  58 → 29,9 M€, 41 % / 8,0 M€-52 / 4,0 M€-58 / dernière décision 17/09/2026).
- Recette `RECETTE_BASE=http://localhost:3844 RECETTE_PAGES=culture/presse-cppap RECETTE_PROXY=socks5://localhost:1080` :
  err 0, kpi 7, graph 5, carte 0, cfg 0, aucune légende contraire.
- Console : 0 erreur ; 11 avertissements #765 (plusieurs queries sur `reg-n`, `aid-tit-n`, `aid-cum`),
  attendus.
- Survol : infobulle stylée sur le top 15 (« CROIX (LA) — 4 264 k€ »).
- Facette « Service de presse en ligne » cochée : KPI de sélection 1 094 titres, 100 % inscrits
  (statut par défaut), 100 % en ligne.
- 375 px : `scrollWidth` 375.
- Captures : `captures/creation-2026-09-26/page.png` (pleine page), `survol-echeances.png`.

**Corrigé en cours de route.**
- `{{d_date_derniere_decision}}` vide : `prefix-right` de `dsfr-data-join` ne s'applique qu'aux
  colonnes en collision → `{{date_derniere_decision:date}}`.
- Durée d'inscription « au plus cinq ans » fausse (écarts décision → échéance jusqu'à 5,9 ans, et
  1 à 4 ans pour 821 inscrits) → « le plus souvent cinq ans ».
- Chapô : « les autres ont disparu » (non établi par la donnée) → « n'y sont plus inscrits ».
