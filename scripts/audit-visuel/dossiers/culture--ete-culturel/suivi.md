# Suivi — culture / ete-culturel

## 2026-09-27 — création (agent vague 5, fiche 24)

**Fait.** Page `public/culture/ete-culturel.html` (dsfr-data 0.42.0 bundle complet pour la carte ; DSFR 1.14.4 ; DSFR
Chart 2.1.1 + CSS). Deux sources Tabular : événements `affd17b7…` en `fetch-mode="export"` (Parquet, 13 colonnes sur 39
par `select`) ; aides `872361c7…` (21 lignes, pas d'export Parquet, une page Tabular). Tout le reste en client :
région par `compute replace()` sur le titre de l'agenda ; libellés des aides recodés par `replace-fields` ; parts par
`share_percent` ; jointure `full` événements ↔ crédits ; totaux annuels par `dsfr-data-unpivot` + `group-by` ; semaine
de première date par `compute` (`month`, `day`, `floor`, `when`).

**Vérifié comment.**
- CSV complet téléchargé via le tunnel SOCKS (static.data.gouv.fr, 2 365 lignes) et aides via l'API Tabular (21 lignes),
  recalcul Python : agendas 715 · 254 · 249 · 245 · 221 · 182 · 148 · 71 · 67 · 48 · 45 · 39 · 36 · 14 · 5 + 26 hors
  DRAC ; crédits 16 295 654 / 16 318 610 / 16 258 245 € ; IDF 3 000 000 (18,45 %) ; semaines ISO 8 · 37 · 68 · 230 ·
  335 · 336 · 384 · 246 · 210 · 121 · 128 · 163 · 25 · 39 · 29 · 6 ; juillet 1 443 ; juin + septembre 224 ; multi-dates
  795 ; 2022 = 2023 sur 19 lignes ; écarts 2021→2023 HdF −608 396, IDF −600 000, PdL −331 865, PACA +600 000, GE
  +207 482, Occ +200 000 ; six territoires sans agenda 555 110 €. Tous identiques en page (caches des transformateurs
  lus au navigateur). Communes 1 176 codes INSEE distincts non vides.
- Navigateur (Playwright, tunnel SOCKS, port 3874) : 0 erreur console, 0 erreur de configuration ; requêtes : 1
  résolution d'export, lectures Parquet (hydra), 1 page Tabular pour les aides. Avertissements : #765 (AM-094) sur les
  queries en aval de sources partagées.
- Carte : 2 365 cercles, légende à quatre mois. Recherche « cirque » → 61 événements, 35 communes, 68,9 % en juillet.
- Survol du graphique groupé : infobulle stylée « Île-de-France 18,5 / 30,2 » (`captures/creation-2026-09-26/survol.png`) ;
  légende conforme aux deux séries (pas de `color-map`).
- Recette : `RECETTE_BASE=http://localhost:3874 RECETTE_PAGES=culture/ete-culturel RECETTE_PROXY=socks5://localhost:1080`
  → err 0, kpi 7, graph 4, carte 1, cfg 0.
- Capture pleine page : `captures/creation-2026-09-26/page.png`.

**Corrigé en cours de route.**
- Recodage des libellés par `compute when … 'Provence-Alpes-Côtes-d''Azur'` : impossible, un littéral de `compute`
  n'accepte pas d'apostrophe (rejoué sur page minimale 0.42.0 `core` : `''` → « "then" attendu … trouvé 'Oise' »,
  `\'` → « chaîne non terminée »). Passé en `replace-fields`. Constat existant au registre (même tokenizer).
- Parts d'abord calculées par query de total + clé constante + jointure : `share_percent` (0.33.0) le fait en un
  attribut ; remplacé, analyse réécrite avant publication.
- Textes corrigés contre la donnée : « autant que les trois suivants réunis » (faux : 715 < 748) → « près de trois fois
  plus que n'importe quelle autre région » ; « ce n'est le cas nulle part » (faux : Grand Est 7,3 / 7,7) ; « une
  cinquantaine de lieux hors région » → une trentaine ; « gratuits ou presque » retiré (non vérifié ; le producteur dit
  « accessibles et gratuits » dans la description du jeu aides).
