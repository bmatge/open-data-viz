# Suivi — demo / diabete-age-egal

## 2026-09-27 — création (démonstration n° 4)

**Fait.** Page `public/demo/diabete-age-egal.html` (DSFR 1.14.4, DSFR Chart 2.1.1 + CSS,
dsfr-data 0.42.0). Quatre sources : CNAM `effectifs` (ODS data.ameli.fr, export, 2 520 lignes,
`max-records="3000"`), INSEE Melodi `DS_FILOSOFI_CC` (97 lignes, un appel), référentiel
`insee-2020-geoapi-2023` (ODS Sports). Standardisation directe en balises : `share` sans
`group-by` → `join on="cla_age_5"` (1-N voulu) → `compute` → `group-by dept sum` ; puis la même
standardisation repliée par tranche (65+ et pauvreté). Deux cartes, deux top 10 en barres
appariées, trois graphiques, un tableau des 101 départements.

**Vérifié comment.**
- Chiffres recalculés en Python sur l'export complet (scripts `calc.py`, `pauv.py`, `age.py` dans
  le scratchpad de session) ; comparés au navigateur : 100 lignes du tableau a11y + Vaucluse par la
  recherche de la liste → 0 écart ; tranches et KPI identiques (voir `analyse-metier.md`).
- Playwright (tunnel SOCKS, port 3861) : défilement jusqu'à chaque carte et graphique ; 0 erreur
  console, 0 `data-dsfr-config-error`. Avertissements : 9 × #765 (délégation impossible par
  construction, AM-094) et 1 × jointure `ages-t` (100 lignes DROM écartées, voulu).
- Survol : `g-pauv` et `g-top-brut`, infobulle stylée (fond blanc, `absolute`), pastilles
  `#929292` / `#6e445a` = `color-map` (BUG-022 non reproduit en 0.42.0) ; séries non nommées
  (AM-086, connu).
- Chronométrage : export ameli 31 Ko, 0,06-0,73 s selon le passage ; Melodi données 1,9 Ko,
  0,09 s ; **Melodi `/range` 1,69 Mo transférés, 0,32-0,37 s** (13 Mo décompressés, 41 599
  territoires) ; `networkidle` à 1,2-1,8 s.
- Recette : `err: 0 kpi: 3 graph: 5 carte: 0 cfg:0`.
- 375 px, chargement direct : `scrollWidth` 375, pas de défilement horizontal.
- Rejeu `replace(GEO, …)` vs `replace(GEO_CODE, …)` sur une page minimale : 0 ligne jointe vs 2.
- Robustesse du classement au standard européen 2013 : recalcul Python.
- Captures : `captures/creation-2026-09-27/` (page, survols, mobile-375).

**Corrigé en cours de route.**
- Podiums remplacés par des barres appariées : `dsfr-data-podium` arrondit à l'unité (Nièvre
  « 10 % » comme la Seine-Saint-Denis).
- Graphique par âge trié explicitement : l'export ODS rendait « 95et+ » en premier.
- Texte : minimum de pauvreté = Vendée (pas Haute-Savoie) ; « un sur cinq entre 70 et 90 ans »
  (à 95+ c'est 12 %) ; phrases non vérifiables (déterminants sociaux, sous-diagnostic) réduites à
  ce que les données permettent ; `prefix-right` inutile retiré (PG-064).

**Reste ouvert.** Aucun rang calculé en page (texte vérifié au recalcul) ; résumé de la carte
standardisée volontairement absent ; `x-max="11"` posé sur les deux top 10 rend un axe à 12 (les
deux échelles sont égales, but atteint, mécanisme non instruit).
