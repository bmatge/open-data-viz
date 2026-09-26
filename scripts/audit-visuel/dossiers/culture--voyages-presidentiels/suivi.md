# Suivi — culture / voyages-presidentiels

## 2026-09-27 — création (agent vague 5, fiche 21)

**Fait.** Page créée `public/culture/voyages-presidentiels.html` (dsfr-data 0.42.0 bundle `core` :
la carte est un `map-monde` DSFR Chart, pas une carte Leaflet ; DSFR 1.14.4 ; DSFR Chart 2.1.1 +
CSS). Source unique : Tabular `d6df4e06-d55c-4616-a974-2b53d0d4e025` en `fetch-mode="export"`
(Parquet, 3,5 Mo à cause des contours GeoJSON), `select` de 9 colonnes sur 14, `max-records="5000"`.
Tout le reste côté client (`compute` : hors de France, recodage ISO, rang et libellé des mandats).

**Vérifié comment.**
- CSV complet téléchargé par le tunnel SOCKS (2 750 lignes = profil Tabular) ; chaque chiffre du
  texte recalculé en Python avec les mêmes règles, identique à l'affichage : 1 352 / 794 / 59 % /
  125 pays ; de Gaulle 64/223 (29 %), Mitterrand 63 %, Chirac 195/238 (82 %), Hollande 55/61
  (90 %), Macron 49/55 (89 %) ; France 159/131/43/6 ; PM 1 398 dont 33 % ; Raffarin 427 (15 %),
  Fillon 89 (91 %) ; 8 PM sous 20 étapes (86) ; Allemagne 83, États-Unis 48, 7 présidents ; 24 étapes
  hors carte.
- Chargement (Playwright, tunnel SOCKS, port 3871) : 1 appel `api/2/datasets/resources/{rid}/` +
  10 lectures `Range` du Parquet ; `networkidle` à 1,5 s.
- Recette `RECETTE_BASE=http://localhost:3871 RECETTE_PAGES=culture/voyages-presidentiels
  RECETTE_PROXY=socks5://localhost:1080` : err 0, kpi 6, graph 4, carte 0, cfg 0.
- Console : 0 erreur ; 9 avertissements #765 attendus (plusieurs queries sur `d-n`, `pm`, `py`).
  Les avertissements de la carte (« 6 ligne(s) sur 124 ignorée(s) », « L'élément de la carte
  n'existe pas pour la valeur SG / BH ») ont disparu une fois les 11 codes écartés en amont.
- Survol du graphique empilé : infobulle stylée « Nicolas Sarkozy (2007-2012) — 18 étapes /
  89 étapes », pastilles = légende (pas de `color-map`). Capture `survol.png`.
- Premier rendu du graphique empilé : légende « Série 1 / Série 2 » avec `value-fields` sur des
  colonnes renommées → corrigé par `name='["En France","Hors de France"]'`.
- Exploration : recherche « Bonn » → 62 étapes, 89 % hors de France, 4 pays (recalcul Python :
  62, 55 hors de France, DEU/ESP/FRA/PRT).
- 375 px : `scrollWidth` 375, pas de défilement horizontal.
- Captures : `captures/creation-2026-09-26/page.png`, `survol.png`.

**Corrigé en cours d'écriture (relecture contre la donnée).** Titre de bloc « chaque président plus
que le précédent » faux (Giscard 45,0 < Pompidou 47,1 ; Macron 89,1 < Hollande 90,2) → « presque à
chaque mandat » ; « étapes à l'étranger du même ordre » faux (55 à 225) ; « la part en dossiers est
la même à un point près » faux pour de Gaulle et Pompidou ; « tournée de 1958 : six étapes » → sept.
