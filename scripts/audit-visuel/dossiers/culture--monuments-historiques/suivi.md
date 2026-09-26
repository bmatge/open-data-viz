# Suivi — culture / monuments-historiques

## 2026-09-26 — création (agent vague 2, fiche 6)

**Fait.** Page `public/culture/monuments-historiques.html` (dsfr-data 0.42.0 bundle `core`, map-chart
DSFR Chart ; DSFR 1.14.4 ; DSFR Chart 2.1.1 + CSS). Sources : Tabular `3a52af4a…` en quatre
regroupements serveur (statut × protection : 785 groupes, 4 pages ; département : 104 groupes ;
siècle : 775 groupes, 4 pages, `lazy`) + une source `server-side` de 20 lignes (`lazy`, `select` 7
colonnes) pour la recherche ; ODS `public.opendatasoft.com` pour la population. Récit : titre-message,
chapô, 4 KPI → propriétaires → part classée par propriétaire → nombre vs par habitant → siècles →
carte → recherche + tableau → ce qu'on ne montre pas → `#analyse`.

**Vérifié comment.**
- Chiffres recalculés à l'API (curl via tunnel SOCKS) : regroupements Tabular paginés sommés en Python
  (46 760 ; classé 14 990 / inscrit 31 322 / non renseigné 448 ; propriétaires 20 580 / 19 160 /
  2 768 + ≈ 8 selon la casse ; part classée 21,4 % privés, 41,3 % communes ; siècles 3 007 · 1 347 ·
  5 827 · 4 035 · 3 180 · 6 627 · 9 021 · 8 152 · 8 785 · 6 626 · 3 043 · 890) ; densités sur
  population ODS 2026 (Cantal 28,4 ; Paris 9,0 ; Seine-Saint-Denis 0,5 ; national 6,86 pondéré,
  46 726 immeubles / 68 094 280 habitants). Affichage identique (données des transformateurs lues dans
  `window.__dsfrDataCache`). Écart 19 161 vs 19 160 communes : `contains()` est insensible à la casse
  (« propriété de la Commune du Pecq »).
- Navigateur (Playwright, tunnel SOCKS, port 3826) : 0 erreur console, 0 erreur de configuration ;
  12 requêtes (9 Tabular, 2 ODS dont une sonde `offset=100` vide, 1 page de recherche).
  Avertissements : #765 sur quatre queries en aval de normalize (voir constat candidat), jointure
  (4 clés orphelines attendues : 975, 976, 01;71, 12;81).
- Survol : infobulle stylée « Privé (particulier ou société) 44 % » (capture `survol.png`).
- Recherche serveur : « Conques » → 7, « eglise » → 65, « Église » → 10 593 (accents non ignorés, dit
  en page), requêtes `or=(Titre…__contains,Commune…__contains)`.
- Recette : `RECETTE_BASE=http://localhost:3826 RECETTE_PAGES=culture/monuments-historiques
  RECETTE_PROXY=socks5://localhost:1080` → err 0, kpi 4, graph 5, carte 0, cfg 0.
- Carte : `path.FR-976` sans `fill`, peint `rgb(92,104,229)` par la feuille DSFR Chart (Cantal
  `#00005f`, Seine-Saint-Denis `#dbdaff`) — dit en page.
- Capture pleine page : `captures/creation-2026-09-26/page.png`.

**Corrigé en cours de route.**
- `split="s:;"` écrit sur le nom renommé : aucun découpage, sans message (split s'exécute avant
  rename) → nom d'origine de la colonne. Avant correction, 12e siècle = 1 679 au lieu de 5 827.
- `compute="part = round(part, 1)"` après `rename` : créait un champ vide, l'infobulle montrait 44,01 %
  → `round="part:1"`.
- « Le 20e siècle, protégé plus récemment » retiré (non vérifié). Deux descriptions a11y recalées sur
  les valeurs (« sous 6 % », « de la Gironde au Bas-Rhin »).
