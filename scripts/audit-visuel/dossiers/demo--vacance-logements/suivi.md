# Suivi — demo / vacance-logements

## 2026-09-27 — création (démonstration n° 5)

**Fait.** Page `public/demo/vacance-logements.html` (DSFR 1.14.4, DSFR Chart 2.1.1 + CSS,
dsfr-data 0.42.0). Trois ressources Tabular en `fetch-mode="export"` (Parquet) + `select`,
`max-records="40000"`, une source ODS `insee-2020-geoapi-2023` en export ; trois `dsfr-data-join`
inner en chaîne ; `query` globale + trois `dsfr-data-unpivot` + deux `join` sur le millésime pour le
tableau de rupture ; KPI, trois petits multiples, carte `map-summary="weighted"`, explorateur.

**Vérifié comment.**
- Chiffres recalculés en DuckDB sur les trois Parquet et l'export JSON ODS (scratchpad
  `demo-vacance-logements/page.py`, `calc.py`) : identiques à l'affichage — 955 673 / 28 549 632 =
  3,35 % ; 12 430 lisibles / 34 884 ; 22 454 non lisibles ; zones 2,21 / 2,03 / 2,88 / 3,69 / 5,38 ;
  loyers 2,21 / 2,46 / 3,23 / 4,79 / 7,48 ; densité 2,35 … 8,14 ; A+Abis 2,08 %, × 2,6 ; tableau
  des sept millésimes (sommes, communes secrétisées) ; dix villes ; résumé de carte 3,35 ;
  recherche « Creuse » 262 communes / 92 lisibles / 6 079 / 10,0 %.
- Totaux France producteur lus dans `Lovac_opendata_France.csv` ; définitions et dates dans
  `Lovac_opendata_schema.csv` ; encodage vérifié sur les octets du CSV d'origine (`file` :
  ISO-8859, `e8` pour « è »).
- Navigateur (Playwright, tunnel SOCKS, port 3862) : 0 erreur console, 0 erreur de configuration.
  Avertissements attendus : #765 × 5 (AM-094) ; jointures `j-loyer` (18 orphelines) et `j-insee`
  (10). Données prêtes en 2,9 à 3,6 s. Chronométrage : 3 métadonnées data.gouv à 250-275 ms, les
  Parquet par plages de 337 à 869 ms (25 lectures, dont 17 pour LOVAC, enchaînées **une à une** à ~25 ms d'écart, une par
  colonne projetée) ; l'export ODS arrive à 2,27 s et fixe la durée.
- Survol du graphique des loyers : infobulle stylée « 16 € et plus — 2,21 % ».
- Rejeu sans clé PLM (`page.route` qui retire `code_abc`) : la jointure `j-zone` dit « 45 ligne(s)
  gauche … sans correspondance », taux 3,40 %.
- Recette `scripts/recette-pages.mjs` : err 0, kpi 7, graph 3, cfg 0, légendes fausses 0
  (carte 0 : compte indicatif, la page n'a pas de carte Leaflet).
- Captures `captures/creation-2026-09-27/` : page, carte, survol-loyer, explorateur-secretise.

**Corrigé en cours de route.**
- Clé parente PLM ajoutée (45 lignes perdues, Paris hors A bis).
- Ratio : numérateur et dénominateur publiés ensemble (3,55 % → 3,35 %).
- `{{a - b}}` dans un gabarit de `repeat` remplacé par une colonne calculée.
- Millésime affiché « 2 020 » (séparateur de milliers) : colonne texte `annee`.
- `y-max="9"` rendait un axe 0-10 : passé à 10 et texte aligné.
- Tableau des villes débordant : département fondu dans le nom.
- Retirés : « la vacance longue est la moins déformée » (faux : +32 % quand le total fait −36 %),
  « les exploitants la jugent la plus robuste » et les causes de la vacance ultramarine (non vérifiés),
  « sans avertissement » pour la jointure PLM (la bibliothèque avertit).
- Encart Mayotte peint en bleu : dit en page (AM-104).
