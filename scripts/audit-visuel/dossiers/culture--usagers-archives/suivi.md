# Suivi — culture / usagers-archives

## 2026-09-27 — création (agent vague 4, fiche 20)

**Fait.** Page `public/culture/usagers-archives.html` (dsfr-data 0.42.0 `core`, DSFR 1.14.4, DSFR
Chart 2.1.1 + CSS). Source unique Tabular `bc564101-e2c8-407b-ab07-1396326bce50` en
`fetch-mode="export"` (Parquet présent : `analysis:parsing:parquet_url` dans les extras de la
ressource), `select` de 12 colonnes sur 106. Un `compute` rapproche les modalités des deux
éditions ; `unpivot drop-empty` → deux `group-by` + `join on="question,annee"` → part parmi les
répondants → `pivot` 2014/2021 → graphiques et `repeat scopes` (petits multiples). Branche
d'exploration séparée derrière `dsfr-data-facets` (même chaîne) → `dsfr-data-list`.

**Vérifié comment.**
- Export Parquet complet téléchargé par le tunnel SOCKS, profil `/profile/` lu ; chaque part
  recalculée en Python (pandas) avec les mêmes règles de rapprochement. 50 couples
  question × réponse : valeurs `y` des `bar-chart` relevées au DOM identiques à une décimale.
- Facette « Recherche historique » : notes 9-10 35,1 % → 46,1 % sur 763 / 2 510 répondants,
  identique au recalcul Python.
- Questionnaires PDF 2014 et 2021 (ressources `e698bf18`, `1776fea4`) lus : même question de
  recommandation 0-10 ; motif posé différemment (voir analyse-metier).
- Recette `RECETTE_PAGES=culture/usagers-archives RECETTE_PROXY=socks5://localhost:1080` :
  err 0, kpi 4, graph 11, carte 0, cfg 0.
- Console : 0 erreur ; 8 avertissements #765 attendus (plusieurs lecteurs par source).
- Chronométrage : KPI rendus en 2,5 s ; 14 requêtes `Range` sur le Parquet (≈ 230 Ko lus sur
  2,37 Mo) + 1 requête de métadonnées.
- Survol `g-reco` : infobulle stylée « 9 ou 10 / 39,2 % / 51,9 % », pastilles grise et bleue
  conformes au `color-map`.
- 375 px : `scrollWidth` 375.
- Captures : `captures/creation-2026-09-26/page.png`, `survol-g-reco.png`.

**Corrigé en cours de route.**
- Double arrondi : parts arrondies à 0,1 puis au point dans le texte (0-6 en 2014 : 23,47 →
  23,5 → « 24 % »). Parts gardées exactes dans la chaîne, arrondies seulement à l'affichage.
- Effectifs sans séparateur de milliers (« 18556 ») : `{{champ:number}}`.
- Deux phrases qui affirmaient un suivi de personnes (« la génération de 2014 a vieilli », « les
  mécontents sont devenus enthousiastes ») : deux coupes transversales ne le permettent pas,
  réécrites.
- Un élément inventé (`dsfr-data-facets-slot`) retiré avant le premier chargement : les facettes
  se rendent là où la balise est posée.
