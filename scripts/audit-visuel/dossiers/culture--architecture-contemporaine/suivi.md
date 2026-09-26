# Suivi — culture / architecture-contemporaine

## 2026-09-27 — création (agent vague 3, fiche 15)

**Fait.** Page `public/culture/architecture-contemporaine.html` (dsfr-data 0.42.0 bundle complet pour la carte
Leaflet ; DSFR 1.14.4 ; DSFR Chart 2.1.1 + CSS). Une source Tabular `80b6ac20…` en `fetch-mode="export"` (Parquet,
12 colonnes sur 45 par `select`), tout le reste en client : première année de construction par `split` + `explode` +
`numeric` + `min` + `dsfr-data-join` ; décennies, périodes, âge au label par `compute` ; familles et architectes par
`explode` + `distinct` ; carte depuis `Coordonnees` « lat,lon » par `split` + `geo-field`.

**Vérifié comment.**
- Jeu entier téléchargé via le tunnel SOCKS (10 pages de 200, colonnes projetées) et recalculé en Python : 1 824
  lignes, 1 811 en stock, 13 anciennement labellisées dont 3 avec référence `PA` ; datés 1 794 (émulation exacte de
  `toNumber` : espaces retirés, nombre de tête) ; 1945-1974 : 994 (55,4 %) ; 1950-1969 : 742 (41 %) ; ≥ 2000 : 71
  (3,96 %) ; ≤ 1926 : 83 ; max 2020 ; âge moyen au label 54,17 ; décennies 15 · 140 · 277 · 121 · 322 · 420 · 253 ·
  79 · 96 · 39 · 32 ; labels par année 2000-2026 (119 … 9), 5 sans année ; 2003 : 143/150 Auvergne-Rhône-Alpes ; 2017 :
  39/39 Occitanie ; régions (259 … 1) ; familles 296 · 289 · 251 · 245 · 235 · 100 · 97 · 96 · 91 · 39 · 26 ;
  architectes Andrault 23, Parat 23 (23 édifices communs), Pouillon 21, Novarina 16, Pellier 13, quatre à 11 ;
  Organisation Todt 13 (titres relus : bases sous-marines de Lorient, Saint-Nazaire, Bordeaux, blockhaus, batteries) ;
  78 sans coordonnées. Affichage identique (données des transformateurs lues dans `window.__dsfrDataCache`).
- Navigateur (Playwright, tunnel SOCKS, port 3840) : 0 erreur console, 0 erreur de configuration ; 1 appel
  `/api/2/datasets/resources/…` + lectures par plages du Parquet (hydra), aucune requête `tabular-api`.
  Avertissements : #765 sur les queries en aval de sources partagées (AM-094), carte « 78 lignes sans coordonnées »
  (attendu, dit en page).
- Carte : 1 733 cercles rendus, légende à cinq périodes. Recherche « Prouvé » → 29 édifices.
- Survol : infobulle stylée « Années 1960 — 420 » (`captures/creation-2026-09-26/survol.png`).
- Recette : `RECETTE_BASE=http://localhost:3840 RECETTE_PAGES=culture/architecture-contemporaine
  RECETTE_PROXY=socks5://localhost:1080` → err 0, kpi 7, graph 5, carte 1, cfg 0.
- Capture pleine page : `captures/creation-2026-09-26/page.png`.

**Corrigé en cours de route.**
- Première écriture `normalize(rename) → query(explode) → normalize numeric → query group-by/min` : la dernière query
  a été **déléguée à l'API Tabular** avec les noms renommés (`?ref__groupby&datation__min`), l'export abandonné,
  requête refusée sans CORS → toute la page en « Failed to fetch ». Rejoué sur page minimale (0.42.0, `core`) :
  même chose sans `explode` (`query where` intermédiaire) ; rien de délégué sans la query intermédiaire, ni sans le
  normalize de valeurs. Contournement : `rename` dans le second normalize. Constat candidat BUG.
- Années affichées « 1 838 » dans le tableau (nombre formaté) → colonnes texte `'' + annee`.
- Titre « Les années 1950 et 1960 ont fourni plus que tout le reste du siècle » : faux (742 contre 981) → « quatre
  sur dix ».
- « 2015 et 2023 sont des campagnes » : faux (2023 : région dominante 26 %) → « additionnent plusieurs régions ».
- « Intervalles 1922-1930 sans année » : faux, `numeric` en lit 1922 → texte réécrit.
- Pouillon « architecte du Vieux-Port » (non tiré du jeu) → répartition lue dans le jeu.
