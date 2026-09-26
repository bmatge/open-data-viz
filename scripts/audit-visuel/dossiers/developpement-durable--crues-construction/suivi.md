# Suivi — developpement-durable / crues-construction

## 2026-09-26 — création (agent vague 2, D4)

**Fait.** Page créée `public/developpement-durable/crues-construction.html` (dsfr-data 0.42.0 core,
DSFR 1.14.4, DSFR Chart 2.1.1 + CSS). Sources DiDo, mode URL : exposition débordement
(`63c3cde7…`, 3 indicateurs, 3 765 lignes → `dsfr-data-pivot`), exposition par période
(`9312e60b…`, 7 530 lignes), Sitadel EPCI (`cb3c0612…`, tous logements 2019-2024, 7 534 lignes →
`group-by EPCI` avant jointure), population ITDD EPCI (`9b27ee21…`, `VARIABLE=pop&NO_INDIC=i017`,
1 256 lignes, `lazy`), submersion (`ef9ea429…`, `lazy`).

**Vérifié comment.**
- Chiffres du texte recalculés en Python sur les exports DiDo complets (scratchpad
  `developpement-durable-crues-construction/verif.py`), identiques à l'affichage : 18 000 730 ;
  10 936 543 ; 1 473 499 / 10 420 707 = 14,1 % ; 1 380 101 ; 192 secrets ; 4,1 vs 5,0 (374 / 294 EPCI) ;
  38,6 % / 36,1 % ; 168 / 1 249 ; 114 ; Toulon 29 % vs 1,5 % ; recalculé 3,7 vs 5,0 ; submersion
  1 359 391 / 1 506 071 / 211 ; 6 EPCI exclus ; 16 407 logements dans 19 codes hors fichier ;
  LOG_COM 2025 null dans les 1 256 lignes.
- Navigateur (Playwright, port 3821) : 0 erreur console, 0 erreur de configuration ; avertissements
  #765 attendus. Survol : infobulles stylées (« Après 2005 1 473 499 logements », « 50 % et plus
  4,1 pour 1 000 hab. / an »). 375 px : pas de défilement horizontal.
- Concurrence DiDo mesurée : 3 requêtes au chargement, la population part au défilement.
- Recette (`RECETTE_BASE=http://localhost:3821 RECETTE_PAGES=developpement-durable/crues-construction`) :
  err 0, kpi 3, graph 2, cfg 0, légendes fausses 0.
- Captures : `captures/creation-2026-09-26/` (page, survol-periodes, survol-rythme).

**Corrigé en cours de route.**
- Classement par `Part_logements_exposes` du cadrage abandonné : le fichier se contredit par EPCI
  (voir `analyse-metier.md`) ; titre basculé sur le chiffre « après 2005 ».
- `lazy-target="#t-rythme, …"` : à 1400×1000 (recette), la population partait au chargement
  (4 requêtes simultanées) et la recette échouait trois fois de suite (une source refusée, CORS).
  Cible déplacée sur `#t-explorer, #t-hors`. Un échec isolé revu ensuite avec 3 requêtes seulement,
  pendant que d'autres agents interrogeaient DiDo : limite par adresse.
- Trois affirmations non vérifiées retirées (recouvrement submersion/débordement, fusions d'EPCI,
  exemples de règles d'urbanisme).
