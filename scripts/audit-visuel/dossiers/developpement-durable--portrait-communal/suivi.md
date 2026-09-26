# Suivi — developpement-durable--portrait-communal

## 2026-09-27 — création

- Page `public/developpement-durable/portrait-communal.html`, bundle `dsfr-data@0.42.0` core, DSFR Chart 2.1.1
  avec sa feuille.
- Mécanique : référentiel communes (geo.api.gouv.fr) → deux facettes chaînées (département, commune ;
  `value-labels`, `url-sync`) → `query limit="1"` → `dsfr-data-repeat key-field="code"` dont le gabarit
  porte les sources DiDo filtrées par `{{code}}` / `{{pfx}}` (préfixe d'arrondissement pour Paris, Lyon,
  Marseille).
- Vérifié au navigateur (Playwright, port 3842) : Rennes (défaut), Marseille (changement de département),
  Paris (`?departement=75&commune=75056`), L'Abergement-Clémenciat (petite commune sans gaz).
- Chiffres recalculés hors page (Python sur l'export DiDo) : France 359 280 → 261 204 (−27 %), gaz
  12,1 → 9,4 MWh (−23 %) ; Rennes 2 236 → 1 365 (−39 %), élec 2,09 / gaz 6,86 MWh, VP 2026 diesel 39,7 %,
  électrique 3,4 % ; Paris élec 2,631 MWh (1 357 946 PDL, 27 lignes secret), diesel 43,1 → 20,8 %,
  logements 3 238 → 1 413 (−56 %). Tous identiques à la page.
- Recette : `RECETTE_PAGES=developpement-durable/portrait-communal` → err 0, graph 3, cfg 0.
- Console : aucune erreur sur Rennes ; « Failed to fetch » ponctuels quand plus de 3 requêtes DiDo se
  chevauchaient (autres agents sur la même IP, défilement rapide) — rejoués, disparus après répartition
  `lazy` / `lazy-target`. Petite commune sans gaz : HTTP 400 attendu (« Le fichier est vide. »).
- Survol : infobulle du graphique des voitures sans nom de série (AM-086, connu).
- Captures : `captures/creation-2026-09-26/page.png`, `survol-voitures.png`.
