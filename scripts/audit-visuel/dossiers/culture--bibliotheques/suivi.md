# Suivi — culture / bibliotheques

## 2026-09-26 — création (agent vague 1, fiche 4)

**Fait.** Page `public/culture/bibliotheques.html` (dsfr-data 0.42.0 bundle complet pour la carte
Leaflet, DSFR 1.14.4, DSFR Chart 2.1.1 + CSS). Source unique : Tabular `806a8aa1…`,
`fetch-mode="export"` (Parquet) + `select` de 14 colonnes. Récit : titre-message, chapô et 3 KPI
calculés → barres lieux/prêts → barres « sans salarié » + gratuité/dimanche → exploration (recherche,
facettes, carte, tableau) → ce qu'on ne montre pas → `#analyse`.

**Vérifié comment.**
- Tous les chiffres recalculés en DuckDB sur l'export Parquet complet (hydra, 1 657 935 octets) :
  identiques à l'affichage (9 130 / 58 %, 8,7 %, 13 % / 61 %, 4 812 / 7 632 = 63 %, 39 236 / 64 921,
  71 % / 43 %, 584 / 11 914, 12 797 / 12 889, 166 sans coordonnées, 192 points outre-mer, tableaux
  a11y ligne à ligne). Millésime lu dans la description du jeu (MCP data.gouv).
- Navigateur (Playwright via tunnel SOCKS, port 3817) : 0 erreur console, 0 erreur de configuration ;
  avertissements attendus : #765 (deux queries sur `bib-n`), 166 lignes sans coordonnées.
- Chargement chronométré : métadonnées data.gouv, pied Parquet, 14 lectures par plage en parallèle
  (~0,8 Mo) ; données complètes ~1,2 s après la première requête.
- Survol des deux graphiques : infobulle stylée ; multisérie sans nom de série (AM-086).
- Filtre Département = Finistère : 255 lignes, 250 points, carte recentrée. Filtre tranche : 0,5 s.
- Recette (`scripts/recette-pages.mjs` avec contournement localhost du proxy, copie temporaire) :
  err 0, kpi 6, graph 2, carte 1, cfg 0, légendes fausses 0.
- Captures : `captures/creation-2026-09-26/` (page, carte, zone-finistere, survol-prets).

**Corrigé en cours de route.**
- KPI en `format="pourcentage"` sur une fraction de colonne (0,087 → « 0,1 % ») : passés en ratio
  d'agrégats dans le KPI.
- `insets="drom"` retiré : encarts dessinés deux fois et copies périmées après filtre (rejoué sur une
  page minimale de 4 points, avec et sans facettes, 3 exécutions) ; 7 s de gel par clic de facette.
  Conséquence dite en page : un filtre ultramarin ne recentre pas la carte (vérifié : La Réunion).
- Texte « population non renseignée » corrigé : ce sont surtout les bibliothèques départementales
  (155 sur 189), pas l'outre-mer.
- Affirmation « activité des grandes villes comptée sur une ligne » retirée (non vérifiable) ;
  seuls les faits Lyon 1/17 et Paris 0/69 restent.
