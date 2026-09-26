# Suivi — developpement-durable / certificats-economie-energie

## 2026-09-27 — création (vague 3)

**Fait.** Page `public/developpement-durable/certificats-economie-energie.html` : deux sources DiDo
(CEE départements par année d'engagement, rid `e38710ac-…` ; ITDD départements, population i017,
rid `aa011e5d-…`), carte par habitant, écart précarité / classique (10 + 10), série annuelle, fiches,
tableau, « ce qu'on ne montre pas », `#analyse`. Bundle `core` 0.42.0.

**Vérifié comment.**
- Chiffres rejoués en Python sur les exports `/json` complets (scratchpad `verif.py`) : 2 176,4 TWhc
  résidentiel, 96,0 % du total, 60,2 % précarité, 7 352 726 dossiers, 32,12 MWhc/hab (100 départements,
  67 760 573 hab.), Meuse 77,13 / Paris 14,86 (×5,19) / Corse-du-Sud 6,69 ; top 10 / bottom 10 :
  ×3,85, classique ×2,16, précarité ×6,34 ; 2021 502,4 → 2022 210,1 (−58 %) ; isolation BAR-EN 57,5 %,
  combles 26,8 %. Secret : 3 852 / 20 352 lignes, 2 215 résidentielles.
- EPCI (fichier `bb1f2879-…`, 141 450 lignes) : 41 101 lignes secrètes (29,1 %), 2 207,3 TWhc tous
  secteurs contre 2 266,2 au département.
- Navigateur (Playwright, port 3831) : les mêmes chiffres s'affichent dans le chapeau, les KPI et les
  phrases de lecture ; 0 erreur console, 0 `data-dsfr-config-error`, 0 requête en échec ; seuls les
  avertissements #765 (calcul client) attendus. Les quatre graphiques portent les séries attendues
  (lues dans les attributs `x`/`y`/`data` de DSFR Chart). Survol du graphique annuel : infobulle
  stylée (position absolute), « 2021 · 273 TWh cumac · 229,3 TWh cumac » — séries non nommées (AM-086).
- Recette : `RECETTE_PAGES=developpement-durable/certificats-economie-energie` → err 0, kpi 3, graph 3,
  carte 0 (compte indicatif : la carte est bien rendue, vérifiée à l'écran).
- Capture pleine page : `captures/creation-2026-09-26/page.png`. Mayotte peinte d'un bleu hors échelle
  par DSFR Chart (sans valeur) : dit en page.
