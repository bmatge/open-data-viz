# Suivi — developpement-durable--entrepots

## 2026-09-27 — création (vague 3)

- Page `public/developpement-durable/entrepots.html` créée (coquille de `logements-neufs.html`,
  dsfr-data 0.42.0 core, DSFR Chart 2.1.1 + CSS).
- Chiffres rejoués sur les exports `/json` complets (Python, scratchpad) : total 92,8 M m²,
  3 877 EPL, IdF+HdF 34,3 M m² = 37,0 %, 8,2 % de la superficie, trio 49,4 %, densité moyenne
  171,9 m²/km², IdF ×8,3, HdF ×3,1, +2,2 M m² (+2,4 %) et +58 EPL en un an ; départements publiés
  88,2 – 96,35 M m², 8 secrets, 4 à zéro ; EPCI 1 233 dont 354 secrets, 602 à zéro ; 171 aires dont 6 ≥ 1 M m².
  Page au navigateur : mêmes valeurs.
- Navigateur (Playwright, :3834) : défilement complet, survol des barres régionales, empilées et
  départementales (infobulles stylées, valeurs justes), carte rendue (secrets et DROM en bleu uni
  hors légende, dit en page), dernière page de la liste EPCI = lignes `secret` (tri null en fin).
  Console : 0 erreur ; avertissements #765 seulement (queries sœurs sur une même source).
- Recette `RECETTE_PAGES=developpement-durable/entrepots` : err 0, kpi 3, graph 4, cfg 0.
- Capture : `captures/creation-2026-09-26/page.png`.
- Corrigé en cours de route : `prefix-right` ne préfixe que les collisions (phrase « 0 régions ») ;
  `null + 50000` rend la chaîne « 50000 » en `compute` (borne haute des départements secrets
  comptée 50 000 m² : 96,8 au lieu de 96,35) → garde `is_null(bas)`.
