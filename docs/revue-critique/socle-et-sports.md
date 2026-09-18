# Revue critique — socle transverse et portail Sports (#24)

> Lecture seule, 2026-09-13, dépôt en `dsfr-data@0.29.1` (`main` = fb07b7a). Les constats
> détaillés, avec preuve et recommandation, sont dans `revue-socle.json` (31 entrées, dont 7 de sévérité haute). Ce
> document en donne la lecture : d'abord les mesures sur les 66 pages, puis le socle (serveur,
> assets, scripts), puis les fiches, puis le classement effort / impact.

## 1. Lecture transverse des mesures (66 pages, desktop 1400 px + mobile 390 px, 2026-09-13)

Source : `scripts/metriques-pages.mjs` → `metriques.json`. Octets = tailles **décodées** (le CDN
compresse, le serveur du dépôt non) ; « repos » = délai jusqu'au `networkidle` initial, avant
défilement et ouverture des onglets.

### 1.1 Les distributions

| Mesure | min | Q1 | médiane | Q3 | max | total |
|---|---:|---:|---:|---:|---:|---:|
| Requêtes | 11 | 32 | **50** | 61 | 83 | 3 113 |
| dont API des portails | 0 | 1 | **1** | 5 | 56 | 308 |
| dont CDN jsDelivr | 8 | 21 | 23 | 26 | 31 | 1 483 |
| Ko transférés | 255 | 756 | **1 674** | 3 928 | **20 798** | 212 980 |
| dont API | 0 | 10 | 94 | 2 428 | 19 270 | 125 060 (59 %) |
| dont CDN | 234 | 616 | **701** | 702 | 746 | 42 483 (20 %) |
| ms jusqu'au repos réseau | 589 | 1 025 | **1 208** | 1 869 | **8 887** | — |
| Ko de HTML | 6 | 18 | 25 | 32 | 96 | 1 857 |
| Balises `dsfr-data-*` | 0 | 16 | 20 | 28 | 219 | 1 828 |
| Sources | 0 | 1 | 1 | 4 | 46 | 269 |
| Hauteur de page (px) | 2 099 | 5 733 | 7 164 | 8 542 | **115 248** | — |
| Part de la section `#analyse` dans le HTML | 0 % | 30 % | **36 %** | 41 % | 64 % | — |

Ce que ces chiffres disent :

- **Le plancher est le CDN, pas la donnée.** 700 Ko décodés par page quelle que soit la page (DSFR,
  utilitaires, DSFR Chart, `dsfr-data`, Leaflet) ; la médiane des octets d'API n'est que de 94 Ko.
  La moitié des pages coûte moins de 1,7 Mo, dont 40 % de bibliothèque.
- **Le temps ne suit ni le nombre de sources, ni celui des requêtes, ni les octets** : corrélations
  de 0,18, 0,18 et 0,17 avec le délai de repos. Il suit la **lenteur de quelques points d'API** :
  `dnma-usages-ent` attend neuf réponses de 2,7 à 5,8 s (agrégats sur `fr-en-dnma-par-uai-*`),
  `portrait-de-territoire-sports` une seule de **8,2 s** (`count` sur `insee-2020-geoapi-2023`,
  equipements.sports), `decp-augmente` trois de 1,6 à 2,2 s. La règle du dépôt (« chronométrer
  avant de conclure ») est confirmée par ses propres mesures.
- **Une page coûte 20,8 Mo** : `annuaire-services-dgfip` tire **19,3 Mo d'API** — l'export complet
  de `coordonnees-des-structures-dgfip` (21 761 lignes) avec un `select` qui garde une douzaine de
  colonnes de texte, dont les démarches. Sept autres pages dépassent 8 Mo (annuaire-bureaux 13,4,
  prix-des-carburants 9,9, cnr-education 9,7, generation-2024 9,3, contrôle technique 8,6, carto-pix
  8,5, personnels-colleges 8,1). Toutes chargent un jeu entier côté client pour une carte à grappes ou
  une liste : c'est le modèle « tout charger » choisi au lot 1, et il a un prix mesurable sur mobile.
- **`retours.html` mesure 115 248 px de haut** — seize fois la médiane. 183 constats rendus d'un coup.

### 1.2 Mobile : 56 pages sur 66 débordent, pour deux raisons, toutes deux dans le dépôt ou la bibliothèque

| Débordement | Pages | Cause établie |
|---|---|---|
| **+16 px** | **51** | `dsfr-data-a11y` rend `details > summary.fr-accordion__btn` ; `summary` est en `box-sizing: content-box` (UA), reçoit `width: 100 %` **et** 16 px de padding de chaque côté → 390 px dans un conteneur de 358. Toute page qui porte un `dsfr-data-a11y` déborde. Diagnostic sur `plan-de-relance` (chaîne de boîtes relevée : summary 390 px, `details` 358 px, `pl: 16px`, `box: content-box`). **Défaut de la bibliothèque**, contournable en une règle : `dsfr-data-a11y summary { box-sizing: border-box }`. |
| +141 px | 1 | `barometre-france-num` : même summary + un tableau. |
| **+291 à +635 px** | 4 | `aides-de-minimis` (+635), `centres-controle-technique` (+625), `retours` (+487), `prix-des-carburants` (+291) : `.odv-dashboard { grid-template-columns: 1fr }` (`site.css:43`) — `1fr` vaut `minmax(auto, 1fr)`, la colonne prend la largeur *min-content* des facettes (fieldset relevé à 865-993 px). **Défaut du dépôt** : `minmax(0, 1fr)` ou `min-width: 0` sur `.odv-filtres`. Vingt pages portent `.odv-dashboard`, quatre débordent parce qu'elles ont des facettes à valeurs longues. |

Les **tableaux d'analyse** débordent aussi (synthèse : `thead` de 478 et 616 px) : les 61 pages à
`.fr-table` utilisent l'ancien balisage `div.fr-table > table` ; **aucune** n'a le
`fr-table__wrapper / __container / __content` du DSFR 1.12+, qui donne le défilement horizontal. Le
débordement est masqué à 390 px par celui du summary, il ne l'est plus une fois celui-ci corrigé.

### 1.3 Ce que les avertissements console disent en production (0.29.1)

- **« group-by, aggregate et order-by restent calculés côté client — la source est partagée »**
  (correctif BUG-009, #811) sur `fei-chiffres-cles` (×8 !), `portrait-territoire`, `rappelconso`,
  `signalconso`, `fiscalite-locale`. Le comportement est juste, mais huit avertissements par
  chargement sur une page correcte finissent ignorés : chaque emplacement mérite une décision
  (source dédiée, ou accepter et le dire en commentaire).
- **`centres-controle-technique`** : « `dsfr-data-kpi value="count"` sur `qt-activites` compte 14
  lignes reçues, mais l'amont en détient 18 » — un avertissement neuf qui désigne un **chiffre
  potentiellement faux** (variante de PG-017). À vérifier par la revue Bercy.
- **`patronymes-des-ecoles`** : « plafond max-records (200) atteint sur une requête group-by, des
  groupes peuvent manquer » (`pat-top`, l. 108) — plafond volontaire pour un top, mais non commenté,
  donc indiscernable d'une troncature.
- **Lignes ignorées « hors référentiel »** sur douze pages (1 à 6 lignes par carte) : les codes
  `975`, `98x`, `ETR`, académies hors référentiel. Attendu, mais chaque page devrait dire en
  commentaire quelles lignes et pourquoi (BUG-008 reste ouvert sur ce point).
- Trois erreurs 404 passagères (annuaires, langues) : tuiles ou vignettes, non reproductibles.

### 1.4 Signaux d'ergonomie relevés en masse

- **KPI vides à l'atterrissage** (« — », « Choisissez… ») : `portrait-territoire` 26/73,
  `fiscalite-locale` **10/11**, `dataviz-ips-ecoles` 4/4, `offre-formation-langues` 4/4,
  `impot-sur-le-revenu` 3/3, `equipements-sportifs-milieu-scolaire` 3/6. Cinq pages accueillent
  le visiteur avec une rangée de tirets : le choix `require-where` (ne rien charger sans filtre) est
  défendable pour un jeu de 280 000 lignes, il doit s'accompagner d'un état d'accueil explicite —
  un seul encart qui dit quoi faire, pas N KPI qui répètent la même phrase.
- **« N resultats » sans accent** : présent sur **42 pages**, jusqu'à 54 occurrences sur `retours`
  et 44 sur `patrimoine-vivant`. La source est double : le compteur de `dsfr-data-display` (AM-077)
  et le texte des facettes (`… resultats` dans les libellés de cases, lu au bundle : `resultat${e > 1 ?`
  ×2, « resultats se mettent a jour automatiquement »). AM-077 doit être **élargi aux facettes**.
- **Sections d'analyse** : 36 % du HTML en médiane, 64 % sur `plan-de-relance`. C'est le livrable, il
  ne se discute pas ; mais 41 `idle-message` et 18 `empty` pour 269 sources disent que **l'état vide
  n'est traité que sur une source sur six**.
- Bonne nouvelle mesurée : **h1 unique partout, aucune image sans `alt`, aucun `_blank` sans
  `rel`, aucun texte sous 12 px, `dsfr-data-a11y` sur 57 des 58 pages à graphique ou carte.**


## 2. Le socle : ce qui, corrigé une fois, améliore les 66 pages

### 2.1 `server.js` — quatre-vingts lignes, cinq défauts, tous corrigeables en une heure

| # | Sévérité | Constat | Preuve |
|---|---|---|---|
| S1 | **haute** | **Le serveur meurt sur une URL malformée.** `decodeURIComponent` (l. 29) lève `URIError` hors de tout `try` ; la promesse du handler est rejetée ; Node 22 termine le processus. | Instance de test sur :3999, `curl --path-as-is /%` → connexion fermée, `/healthz` refusé ensuite ; journal : `URIError: URI malformed at resolveFile (server.js:29:27)`. En production `restart: unless-stopped` masque le crash, au prix d'une coupure et d'une alerte Kuma à chaque robot qui passe. |
| S2 | **haute** | **Aucune compression HTTP**, ni au serveur ni chez Traefik. | En-têtes live : pas de `content-encoding`. Gains `gzip -9` mesurés : `retours.json` 394 → 117 Ko (−71 %), `regions-simplifiees.geojson` 225 → 89 Ko, `portrait-federation.html` 98 → 21 Ko (−79 %), `synthese.html` 65 → 22 Ko. |
| S3 | moyenne | **Pas d'`ETag` ni de `Last-Modified`** : aucune réponse 304 possible ; à l'expiration des 300 s, tout est retéléchargé en entier, `retours.json` compris. Le HTML est `no-cache` sans validateur. | `server.js:70-73` ; en-têtes live identiques. |
| S4 | basse | `.geojson` servi en `application/octet-stream`. | `curl -sI …/regions-simplifiees.geojson`. |
| S5 | basse | Une **barre finale rend 404** (`/sports/`, `/viz/decp-augmente/`), alors que toutes les URL du portail d'origine en portent une. | `resolveFile` ne teste que `<base>.html` et `<base>/index.html`. |
| S6 | basse | Aucun en-tête de sécurité (nosniff, `Referrer-Policy`, HSTS) ; 404 en HTML nu ; `HEAD` renvoie un corps. | En-têtes live : `cache-control`, `content-type`, `date`, `x-robots-tag` seulement. |

**Recommandation groupée (quick win, ~1 h, zéro dépendance)** : `try/catch` autour du décodage (→ 400) + `process.on('unhandledRejection')` ; `zlib` selon `Accept-Encoding` sur `text/*`, `json`, `svg`, `geojson` ; `Last-Modified` + ETag faible `W/"<taille>-<mtime>"` et réponse 304 ; `.geojson` dans la table MIME ; barre finale retirée avant résolution ; trois en-têtes fixes. Si la compression est posée chez Traefik (`compress` middleware), elle profite à tous les protos du lab — c'est le meilleur endroit.

### 2.2 Les bundles chargés : 14 pages paient ce qu'elles n'utilisent pas

- **11 pages chargent `dsfr-data.esm.js` complet (549 Ko, 138 Ko gz) sans aucune carte Leaflet** : `index`, `capytale-usages`, `dnma-usages-ent`, `fei-projets-europeens-donnees`, `patronymes-des-ecoles`, `personnels-colleges`, `personnels-ecoles-primaires`, `personnels-lycees`, `tne-dashboard`, `portrait-federation`, `aide-publique-developpement`. Le bundle `core` (443 Ko, 109 Ko gz) définit **tout ce qu'elles emploient** — chart (y compris les cartes DSFR Chart `map-reg`), kpi, facets, list, podium, context, display, join, pivot, unpivot, a11y ; seuls `dsfr-data-map*` manquent. Vérifié en listant les `customElements.define` des deux bundles publiés.
- **3 pages chargent DSFR Chart sans un seul `<dsfr-data-chart>`** : `retours.html`, `accessibilite-equipements-sportifs`, `fermeture-reseau-cuivre`.
- Économie : ~106 Ko par visite aujourd'hui (sans compression), ~29 Ko une fois S2 fait. Quick win : un `sed`, puis un contrôle « bundle ↔ balises » dans `metriques-pages.mjs` pour que ça ne revienne pas.

### 2.3 `layout.js`, accessibilité de la coquille

- **Aucun lien d'évitement** sur les 66 pages (`href="#contenu"` : 0), alors que `<main id="contenu">` est là partout et que le DSFR fournit `fr-skiplinks`.
- **En-tête et pied injectés par script, sans `<noscript>`** : sans JavaScript, ni navigation ni mentions ni licence. La donnée est de toute façon inaccessible sans JS, la navigation ne devrait pas l'être. Quick win dans `layout.js`.

### 2.4 `site.css` — une politique à trancher, un bloc périmé

- **18 classes ne servent qu'à une page** (`odv-badge--*`, `odv-retour--*`, `odv-statut--*` : le registre) alors que **quatre pages gardent un `<style>` local** « à monter si le motif revient » — et le motif des boîtes chiffrées est revenu (fédération → territoire). Règle proposée : partagé par ≥ 2 pages → `site.css`, sinon local, dans les deux sens.
- **Le bloc « Annuaires » (`odv-lien`, `odv-rubrique`) est toujours là** et toujours porté par cinq pages (annuaire-services-dgfip ×11, qualite-tourisme, tourisme-et-handicap, patrimoine-vivant, notre-dame) qui utilisent déjà `{{#if}}` deux fois chacune dans le même gabarit : la migration d'AM-039 (natif depuis 0.22) est à moitié faite. C'est un résidu de « monter sans consommer » qui a échappé aux lots 18 et 20.
- Le commentaire du bloc « fond atténué » (l. 209-213) est une trace sans règle : utile, mais site.css n'est pas le journal.

### 2.5 Scripts

- **Trois `build-registre-*` , trois copies de `LIBELLES`** (diff : identiques) et la clé d'API de Bercy **en dur** dans `build-registre.mjs:18` alors que `cles.js` la centralise. Un `scripts/lib/registre.mjs` et trois tables.
- **`recette-pages.mjs` relève du CSS dans les KPI** : `textContent` inclut le `<style>` injecté dans le DOM léger du composant — chaque valeur se termine par « `.dsfr-data-kpi { display: flex; …` » et la comparaison numérique porte dessus (`m-0291.json` : `"Portails reproduits 3 data.economie… .ds"`). `innerText`, ou exclure les nœuds `style`. Au passage : la recette ne mesure ni largeur ni couleur — les deux défauts de la 0.29.0 qu'elle n'a pas vus.
- **`metriques-pages.mjs`** (nouveau) : le relevé `chargementResiduel` compte le mot « Chargement » dans la prose (synthèse, registre : trois faux positifs) — restreindre aux composants.
- Pas de `.dockerignore` : `docs/` (3,6 Mo) et `export/` partent dans le contexte de build pour rien.

## 3. Fiches

### 3.1 `public/sports/portrait-territoire.html` (92 Ko, 219 balises, 46 sources, 73 KPI, 6 onglets)

| Angle | Constat | Nature |
|---|---|---|
| Qualité | **609 lignes d'`<option>` en dur** sur les deux portraits, sans script de régénération ; ici le sélecteur de département (101 options) et celui de région sont **présents deux fois à l'identique** (l. 249-378 et 732-861, `diff` : seul l'`id` diffère). Une commune fusionnée = quatre éditions manuelles. | refactor (script `build-options-sports.mjs` écrivant entre marqueurs) |
| Qualité | **`<style>` local ciblant le DOM interne du composant** (`.dsfr-data-display > p[role="status"]`, `.dsfr-data-status--idle > .fr-icon-filter-line`, l. 18-26) : hors API, cassera en silence ; masquer `role="status"` retire l'annonce aux lecteurs d'écran. Contournement d'AM-077 payé en accessibilité. | quick win : une seule règle, dans `site.css`, marquée « à retirer dès AM-077 » |
| Qualité | Point positif : la contrainte d'ordre de BUG-015 est écrite **à l'endroit où ça casse** (l. 80 : « ILS DOIVENT ÊTRE DÉCLARÉS AVANT t-reg »). Mais 46 sources en tête de fichier, 400 à 900 lignes avant leurs consommateurs ; le portrait de fédération, lui, groupe par onglet. | rédactionnel |
| Perf | Les sources des six onglets partent toutes au chargement (**83 requêtes dont 56 API** mesurées, 880 Ko) ; un panneau fermé ne se rend pas mais tire quand même. Aucun attribut « charger à la visibilité » n'existe : **demande à formuler** à la bibliothèque. | demande + réordonner les sources |
| Ergo | Sans territoire choisi, l'onglet 1 mélange France entière et **sept fois** « Choisissez une région ou un département » (l. 500-613). Une invitation en tête et des messages distincts qui disent *pourquoi* (le modèle existe : la carte, l. 563). | rédactionnel |
| Ergo | Le comparateur recopie la colonne de référence : **24 KPI** en deux colonnes, libellés dupliqués, alignement non garanti. Un tableau `indicateur / référence / comparaison / écart` (ce que fait l'original). | refactor |

### 3.2 `public/sports/portrait-federation.html` (93 Ko, 5 onglets, 3 contextes)

| Angle | Constat | Nature |
|---|---|---|
| Qualité | `sel-fede` (120 options, l. 80-201) ⊂ `sel-comp` (126, l. 820-947) : **120 options communes**, deux copies. Même remède que ci-dessus. | refactor |
| Qualité | `<style>` local (l. 18-31) : `.fede-boite*` (motif réutilisable → `site.css`) et `.fede-sans-compteur .dsfr-data-display > p[role="status"]` (même fragilité qu'au territoire). | quick win |
| Qualité | Point positif : PG-029 documenté au bon endroit (l. 219 « ⚠️ ORDRE »), sources groupées par onglet (« Onglet 4 », l. 357). C'est le modèle à généraliser. | — |
| Perf | Charge le bundle complet **sans carte Leaflet** (6 cartes DSFR Chart SVG) : −106 Ko avec `core`. 28 requêtes au chargement mais repos à 2,0 s contre 1,0 s pour l'original : tout part d'emblée. | quick win + demande « lazy » |
| Ergo | Trois sélecteurs de 100+ options sans recherche (`fr-select` natif) : trouver « Fédération française de la retraite sportive » dans 120 entrées demande de dérouler. Un `<datalist>` ou une facette `searchable` (si AM-081 arrive) rendrait la liste tapable. | refactor |

### 3.3 `public/sports.html`

Courte et juste : registre local sans jointure, tuiles statiques comme l'original. Un seul point : le compteur « 12 resultats » (AM-077) est laissé visible ici, masqué par CSS dans les deux portraits — **trois traitements du même défaut sur trois pages du même portail**. Choisir, et le dire dans `site.css`.

### 3.4 `public/index.html`

Tableau de bord juste et bien commenté (les pièges de `transform`, de BUG-009, du scan de balises sont expliqués sur place). Deux points : charge le bundle complet et DSFR Chart alors que `core` suffit ; et le KPI « Entrées suivies » additionne des entrées de catalogue et des onglets Sports — c'est dit sous le KPI, mais un lecteur pressé lit « 78 dataviz ». Un libellé « entrées et onglets suivis » lèverait l'ambiguïté sans note.

### 3.5 `public/education.html` et `public/bercy.html`

Le gabarit catalogue tient : source → jointure → recherche → facettes → display, quatre KPI par `where`. Rien à redire sur le code ; l'ergonomie dépend de `dsfr-data-display` (pagination 12, `fr-enlarge-link`). Le hack `.odv-carte-statut { z-index }` pour sortir le badge du lien agrandi est documenté et légitime.

### 3.6 `public/synthese.html` (65 Ko, 20 sections)

**Le document le plus lu du dépôt est le moins navigable.** Quinze sections « 3 bis … 3 quindecies » disent une chose : la page a poussé par accrétion chronologique. Aucun sommaire (`fr-summary` : 0) ; la section 4 fait 134 lignes ; le débordement mobile de 16 px est là aussi. Recommandation rédactionnelle, pas technique : **scinder** en « Ce que le banc établit » (thématique) et « Journal des lots » (chronologique), renuméroter, poser un `fr-summary`. C'est l'endroit où une heure de rédaction vaut plus qu'une journée de code.

### 3.7 `public/retours.html`

Rend les **183 constats d'un coup** (display sans `pagination`, l. 118) depuis un JSON de 394 Ko non compressé dont 98 Ko de `verifie` et 21 Ko de `cadrage` — jamais affichés en entier dans la carte. `pagination="20"` est un attribut ; la compression (S2) règle les deux tiers du reste ; à terme `build-retours.mjs` peut émettre un JSON d'affichage sans `cadrage`. Charge DSFR Chart sans graphique.

## 4. Dix gestes, classés effort / impact

| # | Geste | Effort | Impact | Où |
|---|---|---|---|---|
| 1 | `try/catch` + `unhandledRejection` dans `server.js` | 10 min | Plus de crash sur `/%` | S1 |
| 2 | Compression gzip/brotli (serveur ou Traefik) | 30 min | −60 à −79 % sur JSON, GeoJSON, HTML ; retours.json 394 → 117 Ko | S2 |
| 3 | `minmax(0, 1fr)` sur `.odv-dashboard` + `dsfr-data-a11y summary { box-sizing: border-box }` | 5 min | 56 pages cessent de déborder sur mobile (le second est un contournement : à déposer chez `dsfr-data`) | § 1.2 |
| 4 | Bundle `core` sur 11 pages, DSFR Chart retiré de 3 | 15 min | −106 Ko décodés par visite, et une règle « bundle ↔ balises » dans les métriques | § 2.2 |
| 5 | `pagination="20"` sur `/retours` | 2 min | 115 248 px → une page lisible | § 3.7 |
| 6 | ETag / Last-Modified / 304 | 30 min | Rechargements à coût nul après la première visite | S3 |
| 7 | Balisage `fr-table__wrapper` sur les 61 tableaux (un script) | 1 h | Tableaux défilables sur mobile ; à faire *après* le geste 3 pour le voir | § 1.2 |
| 8 | Liens d'évitement + `<noscript>` dans `layout.js` | 20 min | Accessibilité de la coquille sur 66 pages | § 2.3 |
| 9 | `scripts/build-options-sports.mjs` + `scripts/lib/registre.mjs` | 2 h | 609 lignes d'options régénérables, trois registres sur une seule table de libellés | § 3.1, § 2.5 |
| 10 | Scinder la synthèse (établi / journal) + `fr-summary` | 2 h de rédaction | Le document le plus lu redevient navigable | § 3.6 |

Et **trois demandes à la bibliothèque** qui sortent de cette lecture : le `summary` en
`content-box` de `dsfr-data-a11y` (51 pages), « N resultats » des facettes (extension d'AM-077), et
un attribut « charger à la visibilité » pour les sources des onglets fermés (portraits Sports).
