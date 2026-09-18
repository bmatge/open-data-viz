# Revue critique des 66 pages — qualité du code, performance, ergonomie

> Issue [#24](https://github.com/bmatge/open-data-viz/issues/24). Lecture faite le 2026-09-13 sur
> `main` (fb07b7a, `dsfr-data@0.29.1`), **sans modifier une page** : ce document dit ce qu'il
> faudrait changer, et pourquoi, pas ce qui a été changé. Les 244 constats sourcés sont dans
> [`revue-critique/constats.json`](revue-critique/constats.json) ; les quatre lectures par lot,
> plus longues, sont en annexe (§ 8).

## 1. Méthode, et ce qui a été vérifié deux fois

1. **Mesurer d'abord.** `scripts/metriques-pages.mjs` (nouveau, versionné) charge chaque page en
   1400 px puis en 390 px et relève : requêtes (total, API, CDN, tuiles), octets décodés, délai
   jusqu'au repos réseau, avertissements console, débordement horizontal, KPI vides, compteurs
   non accentués, hauteur de page ; et, dans le HTML : balises par type, sources et leurs attributs
   de volume, `<style>` locaux, commentaires ⚠️, poids de la section `#analyse`.
2. **Lire ensuite.** Quatre lectures parallèles, sur des lots disjoints (Bercy 25 pages, Éducation
   2 × 17, Sports + socle), avec la même grille : constat → preuve (`fichier:ligne`, mesure ou
   JSDoc du bundle publié) → recommandation, classée *quick win* / *refactor* / *rédactionnel* et
   par sévérité (haute = chiffre faux, mobile cassé, a11y bloquante ; moyenne = coût réel
   évitable ; basse = propreté).
3. **Revérifier ce qui pèse.** Chaque constat de sévérité haute cité dans ce document a été
   rejoué indépendamment de la lecture qui l'a produit : le débordement mobile (chaîne de boîtes
   relevée sur `plan-de-relance`, puis cause de la grille sur `aides-de-minimis`), les neuf
   départements à zéro du portrait Sports (API : `codedepartement='1'` → 0 ligne, `'01'` →
   392 communes, 657 417 habitants), les séries inversées de `signalconso` (JSDoc :
   `value-field-2` = courbe), le KPI « 14 régions » (query `limit="14"` sous un `count`), le
   « 57 lignes » de Cactus (API : 32), les 14 requêtes paginées de Capytale (mesure), le crash du
   serveur sur `/%` (instance :3999, `URIError`, `/healthz` refusé ensuite) et l'absence de
   compression (en-têtes live).

Ce qui n'a pas pu l'être est dit à chaque fois (§ 7).

## 2. Les chiffres qui cadrent tout le reste

| Mesure (66 pages) | médiane | max | ce que ça dit |
|---|---:|---:|---|
| Requêtes au chargement | 50 | 83 | dont **23 au CDN** et **1 seule à l'API** pour la moitié des pages ; le reste, ce sont des tuiles de carte |
| Octets décodés | 1,7 Mo | **20,8 Mo** | le plancher est le CDN (700 Ko constants) ; 8 pages dépassent 8 Mo, toutes chargent un jeu entier pour une carte à grappes ou une liste |
| Délai jusqu'au repos réseau | 1,2 s | **8,9 s** | ne suit ni les sources, ni les requêtes, ni les octets (r ≈ 0,18) ; suit quelques points d'API lents (DNMA : 9 réponses de 2,7 à 5,8 s ; `insee-2020-geoapi-2023` : 8,2 s) |
| Débordement horizontal à 390 px | **56 pages sur 66** | +635 px | deux causes seulement, § 3.1 |
| Part de `#analyse` dans le HTML | 36 % | 64 % | le livrable prend la place : normal, mais la lisibilité s'en ressent (§ 5.3) |
| Compteur « N resultats » sans accent | 42 pages | 54 occ. | `dsfr-data-display` **et** les facettes (AM-077 à élargir) |
| Sources avec un état vide traité (`idle-message`/`empty`) | 59 sur 269 | — | l'état vide est traité sur une source sur cinq |

Le fond est sain là où on l'attendait : h1 unique partout, aucune image sans `alt`, aucun
`target="_blank"` sans `rel`, aucun texte sous 12 px, `dsfr-data-a11y` sous 57 des 58 pages à
graphique ou carte (manque : `fermeture-reseau-cuivre`).

## 3. Les constats transverses, par ordre de rapport effort / impact

### 3.1 Deux règles CSS, et 56 pages cessent de déborder sur téléphone — *quick win, 5 min*

- **51 pages débordent de 16 px** parce que `dsfr-data-a11y` rend
  `<details><summary class="fr-accordion__btn">` : la classe DSFR est écrite pour un `<button>`,
  qui est `border-box` par défaut ; un `<summary>` est `content-box`, reçoit `width: 100 %` et
  16 px de padding de chaque côté, et fait 390 px dans un conteneur de 358 (chaîne de boîtes relevée,
  `dsfr-data-a11y.ts:391`, aucun `box-sizing` posé). **Défaut de la bibliothèque** (BUG-018, à
  déposer) ; en attendant : `dsfr-data-a11y summary { box-sizing: border-box }` dans `site.css`.
- **4 pages débordent de 291 à 635 px** (`aides-de-minimis`, `centres-controle-technique`,
  `prix-des-carburants`, `retours`) : `.odv-dashboard { grid-template-columns: 1fr }`
  (`site.css:43`) — `1fr` vaut `minmax(auto, 1fr)`, la colonne prend la largeur *min-content* des
  facettes (976 px mesurés). **Défaut du dépôt** : `minmax(0, 1fr)`.
- Derrière ces deux-là, un troisième attend : les **61 pages à tableaux** utilisent l'ancien
  balisage `div.fr-table > table`, sans le `fr-table__wrapper / __container / __content` du
  DSFR 1.12+ qui donne le défilement horizontal. Masqué aujourd'hui par le débordement du summary,
  il apparaîtra dès que celui-ci sera corrigé. Un script, une heure.

### 3.2 Six chiffres ou libellés faux en production — *quick wins, 4 à 10 lignes chacun*

| Page | Ce qui est faux | Preuve | Correctif |
|---|---|---|---|
| `education/portrait-de-territoire-sports` (l. 246-335, 198-203) | **Neuf départements à zéro en silence** (Ain → Ariège) : le `<select>` envoie `1`…`9` aux filtres `codedepartement` et `departement_code`, qui sont sur deux caractères | API : `codedepartement='1'` → 0 ligne ; `'01'` → 392 communes, 657 417 hab. | clé par le nom (les quatre jeux en ont un) ou valeurs sur deux caractères |
| `viz/signalconso` (l. 137-140) | **Séries inversées** : `value-field="reponse"` alimente les barres nommées « Signalements déposés », `value-field-2="n"` la courbe « Ayant reçu une réponse » ; unités d'infobulle inversées de même ; le tableau accessible n'a que `an, reponse` | JSDoc de `value-field-2` : « pour bar-line : y-line » | échanger les deux `value-field`, `value-field="n, reponse"` sur l'a11y |
| `viz/centres-controle-technique` (l. 89, 119) | KPI « **14** régions couvertes » pour **18** : `count` sur une query `limit="14"` faite pour le graphique | console 0.29 : « compte 14 lignes reçues, l'amont en détient 18 » | `value="nom_region:distinct"` sur la source filtrée (PG-017, repayé) |
| `education/personnels-lycees` (l. 261-268) | **Sept parts recopiées des collèges** (19,6 / 43,3 / 37,1 ; 24,1 / 16,3 / 12,8 / 46,8) — le chapô de la même page dit 48,8 % | API `nature like 'Lycée'` : 13,5 / 37,7 / 48,8 ; 21,0 / 16,1 / 12,5 / 50,4 | réécrire, et ne plus écrire de part en dur à côté d'un graphique filtrable |
| `education/cactus-hameconnage` (l. 57) | « **57** lignes sans position » | API `position is null` → **32** ; la console de la page le dit aussi ; 57 = 904 − 847 confond lignes et positions distinctes | 32 |
| `education/tedi-robots-telepresence` (l. 7, 40-43) | « 3 734 déploiements, 2 497 établissements » figés dans le chapô et la `meta description` d'un jeu **quotidien** | recette du 12 : 3 753 / 2 505 | un `dsfr-data-kpi` inline, ou une formule sans chiffre |

Et deux affirmations d'interface fausses : `viz/aide-publique-developpement` (l. 221) titre un
graphique « ensemble du jeu, ne suit pas les filtres » alors que sa source est dans le contexte
depuis le lot 18 ; `viz/fiscalite-locale` (l. 316-319) dessine une choroplèthe **sans légende ni
classes** alors que `classes`/`method`/`breaks` et `dsfr-data-map-legend` existent depuis la 0.22 —
et que la page les cite comme « corrigés » (l. 542-543).

### 3.3 Le serveur : un crash et zéro compression — *quick win, 1 h, zéro dépendance*

- **`server.js:29` meurt sur une URL malformée** : `decodeURIComponent` hors de tout `try`,
  rejet non géré, Node 22 termine le processus. Reproduit : `curl --path-as-is /%` → connexion
  fermée, `/healthz` refusé. En production, `restart: unless-stopped` masque le crash au prix
  d'une coupure et d'une alerte Kuma à chaque robot qui passe.
- **Aucune compression** (pas de `content-encoding` en ligne), **aucun validateur de cache** (ni
  `ETag` ni `Last-Modified`) : à l'expiration des 300 s, tout est retéléchargé. Gains `gzip`
  mesurés : `retours.json` 394 → 117 Ko, `portrait-federation.html` 98 → 21 Ko, GeoJSON des
  régions 225 → 89 Ko. Le meilleur endroit est le middleware `compress` de Traefik, qui
  profiterait à tous les protos du lab ; sinon `zlib` dans `server.js`.
- Mineur : `.geojson` servi en `application/octet-stream`, barre finale en 404 (`/sports/`),
  aucun en-tête de sécurité, pas de `.dockerignore` (`docs/` part dans le contexte de build).

### 3.4 Quatorze pages paient ce qu'elles n'utilisent pas — *quick win, un `sed`*

**11 pages chargent le bundle complet (`dsfr-data.esm.js`, 549 Ko) sans une seule carte
Leaflet** : `index`, `capytale-usages`, `dnma-usages-ent`, `fei-projets-europeens-donnees`,
`patronymes-des-ecoles`, `personnels-*` (×3), `tne-dashboard`, `portrait-federation`,
`aide-publique-developpement`. Le bundle `core` (443 Ko) définit tout ce qu'elles emploient, cartes
DSFR Chart comprises (vérifié sur les `customElements.define` des deux bundles publiés). **3 pages
chargent DSFR Chart sans graphique** (`retours`, `accessibilite-equipements-sportifs`,
`fermeture-reseau-cuivre`). Puis une règle « bundle ↔ balises » dans `metriques-pages.mjs` pour
que ça ne revienne pas.

### 3.5 Monter sans consommer, troisième épisode — *rédactionnel + quick wins*

Les lots 18 et 20 ont relu le journal des versions contre les pages ; il en reste :

- **Neuf `dsfr-data-normalize` vides** (contournement de BUG-009, corrigé #811) sur 8 pages
  (`fei-projets:200`, `offre:225`, `patronymes:245-250`, `personnels-ecoles:350`,
  `portrait-sports:574`, `tedi:175`, `tne:131`) ; deux composants morts (`cap-fn`, `ann-prec-n`)
  et une source sans consommateur (`accessibilite`, `s-ins`, une requête par filtre).
- **Cinq annuaires** portent encore le CSS conditionnel d'AM-039 (`odv-lien`, `odv-rubrique` dans
  `site.css`) alors qu'ils utilisent déjà `{{#if}}` dans le même gabarit : la migration est à
  moitié faite.
- **Neuf pages** posent une `dsfr-data-query` intermédiaire pour un KPI que `where` ou `:distinct`
  écrit en un attribut depuis 0.24 ; `entreprise-patrimoine-vivant` garde un ratio à six balises
  que `count{…} / count` écrit en une ; `accessibilite-equipements-sportifs` produit ses treize
  indicateurs par **39 composants** (normalize → pivot → normalize) là où
  `value="n:sum{equip_pmr_aire:eq:true} / n:sum"` rend 51,9 % — vérifié identique à l'API.
- **Dix-huit passages d'analyse au présent** décrivent un manque corrigé (BUG-009/010/011,
  AM-066, AM-070, PG-027, `first`/`last`, AM-043 sur les `<select>`), et **trois pages se
  contredisent** entre leur corps et leur tableau de correspondance (`fei-projets`, `tne`, `cnr`).
  Règle à écrire dans `CLAUDE.md` : *quand un constat passe en « corrigé », la page qui le porte est
  migrée et relue dans le même lot* — le lot 20 a mis à jour les commentaires ⚠️, pas les analyses.

### 3.6 Le modèle « tout charger » a un prix mesurable — *refactors ciblés*

Huit pages dépassent 8 Mo décodés ; trois gestes suffisent pour la plupart :

| Page | Mo | Cause | Geste |
|---|---:|---|---|
| `viz/annuaire-services-dgfip` | **20,8** (19,3 d'API) | export complet de 21 761 lignes avec une douzaine de colonnes de texte, dont les démarches | `select` sans les textes longs ; les démarches à la demande dans le panneau |
| `education/annuaire-bureaux-des-entreprises` | 13,4 | export gardant `metiers_prepares` et les textes | idem |
| `viz/prix-des-carburants` | 9,9 | jeu entier pour la carte | `bbox` sur la couche, ou `select` |
| `education/cnr-education` | 9,7 | `objectifs_detailles` dans le `select` (l. 100) | le retirer |
| `education/dataviz-ips-colleges` | 4,9, **6,5 s** | export de 29 champs sans `select` (8 utilisés), 6 971 cercles sans `cluster` ; l'analyse annonce 0,42 s | `select` + `cluster` |
| `education/capytale-usages` | — | **14 requêtes `/records` paginées** faute de `fetch-mode="export"` | l'attribut |
| `viz/fiscalite-locale` | — | `fl-geo` en 7 requêtes `/records` | idem |

Le temps, lui, est ailleurs : `dnma-usages-ent` (6,4 s) et `portrait-de-territoire-sports`
(8,9 s) attendent des agrégats lents du serveur — rien à gagner côté page sans changer de
requête ou la mettre en cache. La règle du dépôt s'applique à lui-même : chronométrer avant de
conclure.

### 3.7 L'état vide n'est traité qu'une source sur cinq — *rédactionnel*

Cinq pages accueillent le visiteur par une rangée de tirets : `fiscalite-locale` (**10 KPI vides
sur 11**), `dataviz-ips-ecoles` (4/4), `offre-formation-langues` (4/4), `impot-sur-le-revenu`
(3/3), `portrait-territoire` (26/73, dont sept fois la même phrase « Choisissez une région ou un
département »). Le choix `require-where` est juste pour un jeu de 280 000 lignes ; il appelle un
**seul encart d'accueil** qui dit quoi faire, pas N KPI qui répètent la consigne. Même famille :
tranches numériques dans le désordre dans les facettes (« 100 à 110, 110 à 125, 125 et plus, 90 à
100, Moins de 90 » sur `ips-colleges` — `sort` ne connaît que compte et alpha), trois sélecteurs de
100 à 126 options sans recherche sur les portraits Sports, et `retours.html` haut de **115 248 px**
(183 constats sans `pagination`).

### 3.8 Ce qui est écrit en dur, et comment on le régénère — *refactor, 2 h*

- **609 lignes d'`<option>`** sur les deux portraits Sports, sans script ; le sélecteur de
  département y est présent **deux fois à l'identique** (l. 249-378 et 732-861, seul l'`id`
  diffère) et `sel-fede` ⊂ `sel-comp` (120 options sur 126). Une commune fusionnée = quatre éditions.
  → `scripts/build-options-sports.mjs` écrivant entre marqueurs.
- **Sept listes en dur sur `decp-augmente`** (80 options, « les 20 acheteurs les plus présents »
  figés au lot 9) et 67 sur `rappel-conso-tableau-de-bord`, migrables vers
  `dsfr-data-facets context server-facets` — à distinguer des listes **légitimes** (`barometre`,
  `fiscalite` : code → libellé, AM-081 ; `cuivre`, `prix-CT` : facette non déclarée), ce que les
  pages ne font pas.
- **Trois `build-registre-*` avec trois copies de `LIBELLES`** (identiques au diff) et la clé
  d'API de Bercy en dur dans `build-registre.mjs:18` alors que `cles.js` la centralise.
- **Deux `<style>` locaux ciblent le DOM interne d'un composant** (`.dsfr-data-display >
  p[role="status"]`, `.dsfr-data-status--idle > …`, portraits Sports l. 18-31) : hors API, ils
  casseront en silence, et masquer `role="status"` retire l'annonce aux lecteurs d'écran. Trois
  traitements du même compteur sur les trois pages du même portail.

## 4. Par angle, en une phrase

- **Qualité du code (121 constats, 11 hautes).** Le squelette est dupliqué 66 fois et la tête de
  page est montée par `sed` ; c'est assumé (« une balise, un CDN ») et tenable tant qu'un script
  vérifie les invariants — c'est le rôle nouveau de `metriques-pages.mjs`. Le vrai coût est
  ailleurs : **les pages gardent leurs béquilles après que la bibliothèque a livré**, et les
  analyses ne sont pas relues au même rythme que les commentaires.
- **Performance (37 constats, 5 hautes).** Quatre gestes sur le socle (compression, validateurs de
  cache, bundle `core`, `fetch-mode`) valent plus que toute optimisation de page ; le seul vrai
  choix d'architecture à rouvrir est « tout charger » sur les huit pages à plus de 8 Mo.
- **Ergonomie (86 constats, 9 hautes).** Deux règles CSS pour le mobile, un état d'accueil sur
  cinq pages, six chiffres à corriger, et une synthèse à rendre navigable (§ 5.3).

## 5. Trois pages qui méritent une décision plutôt qu'un correctif

### 5.1 `sports/portrait-territoire.html` — 92 Ko, 219 balises, 46 sources, 73 KPI

Tout part au chargement (83 requêtes, 56 d'API) alors que cinq onglets sur six sont fermés : il
n'existe **aucun attribut « charger à la visibilité »** sur `dsfr-data-source` (vérifié au
source ; l'`IntersectionObserver` du bundle sert au rendu des cartes et graphiques, pas aux
sources) — c'est une demande à formuler (AM-083). Le comparateur recopie 24 KPI en deux colonnes
là où l'original fait un tableau *indicateur / référence / comparaison / écart*. Point positif à
généraliser : la contrainte d'ordre de BUG-015 est écrite à la ligne où ça casse (l. 80).

### 5.2 `education/accessibilite-equipements-sportifs.html`

Treize indicateurs, trente-neuf composants, une source morte, DSFR Chart chargé sans graphique.
C'est la page qui a le plus à gagner de la 0.29 et la seule où un refactor change vraiment la
lisibilité du code : 13 KPI à ratio filtré, et rien d'autre.

### 5.3 `synthese.html` — le document le plus lu est le moins navigable

Quinze sections « 3 bis … 3 quindecies », aucun sommaire, une section de 134 lignes : la page a
poussé par accrétion chronologique. Scinder en **« Ce que le banc établit »** (thématique, stable)
et **« Journal des lots »** (chronologique), renuméroter, poser un `fr-summary`. Une heure de
rédaction y vaut plus qu'une journée de code.

## 6. Plan d'action proposé

**Vague 1 — une demi-journée, tout en quick wins, aucune décision à prendre**
1. `site.css` : `minmax(0, 1fr)` + `dsfr-data-a11y summary { box-sizing: border-box }` (56 pages).
2. Les six chiffres faux (§ 3.2) et les deux titres/légendes faux.
3. `server.js` : `try/catch` + `unhandledRejection`, compression (ou Traefik), `ETag`/`Last-Modified`.
4. Bundle `core` sur 11 pages, DSFR Chart retiré de 3 ; `fetch-mode="export"` sur Capytale et
   `fl-geo` ; `select` sur `cnr` et `ips-colleges` ; `pagination="20"` sur `/retours`.
5. `count-label` sur les 10 pages à `search count` qui ne l'ont pas encore.
6. Trois constats à déposer chez `dsfr-data` : BUG-018 (summary `content-box`), extension d'AM-077
   aux facettes, AM-083 (sources différées).

**Vague 2 — une journée, refactors**
7. Balisage `fr-table__wrapper` sur les 61 tableaux (script).
8. `accessibilite-equipements-sportifs` : 39 → 13 composants ; `patrimoine-vivant` : ratio en une balise ;
   les neuf `normalize` vides et les composants morts.
9. `build-options-sports.mjs` ; `scripts/lib/registre.mjs` ; `.dockerignore`.
10. `decp` et `rappel-conso` : `facets context server-facets` à la place des listes en dur (le seul
    refactor qui change la fidélité à l'original), après avoir noté lesquelles sont légitimes.

**Vague 3 — rédactionnel**
11. Relire les 18 passages d'analyse périmés et les trois contradictions ; ajouter la règle
    « corrigé ⇒ migré et relu dans le même lot » au `CLAUDE.md`.
12. Un état d'accueil sur les cinq pages à KPI vides ; scinder la synthèse.
13. Métriques : contrôles « bundle ↔ balises » et « débordement mobile » ajoutés à la recette, pour
    que les deux défauts qu'un humain a vus ce mois-ci soient vus par la machine la prochaine fois.

## 7. Ce que cette revue n'a pas pu vérifier

- Les **tailles sur le fil** : toutes les mesures d'octets sont décodées (jsDelivr compresse, le
  serveur du dépôt non). Les ordres de grandeur tiennent, pas les valeurs absolues.
- La **lenteur d'APD** (9 requêtes de 4 à 6 s à un chargement, 0,15 s la même agrégation isolée) :
  une mesure, contredite par la mesure directe ; à rejouer avant d'en tirer quoi que ce soit.
- La bascule `core` sur les cartes `map-reg` des `personnels-*` : établie par la liste des éléments
  définis, pas rejouée au navigateur.
- La faisabilité de `facets context server-facets` sur les sept champs de `decp` (un champ absent
  d'une source visée est désormais nommé en erreur, #820 — à essayer).
- Les dix sources sans `max-records` ni `limit` du portrait de fédération (probablement petites,
  `require-where`), non contrôlées une à une.

## 8. Tableau par page

Requêtes et octets au chargement desktop ; « Mobile » = pixels de débordement à 390 px ;
H / M / B = constats de sévérité haute / moyenne / basse rattachés à la page (les constats
transverses — grille, summary, bundle — n'y sont pas répétés). Recommandation = celle du constat le
plus grave.

| Page | Req. (API) | Mo décodés | Repos ms | Mobile | H / M / B | Recommandation principale |
|---|---:|---:|---:|---:|---:|---|
| [bercy](../../public/bercy.html) | 32 / 8 | 3.3 | 1446 | — | 0 / 1 / 3 | Corriger la phrase ; c'est la page vitrine du premier portail. |
| [education](../../public/education.html) | 35 / 1 | 3.6 | 1717 | — | 0 / 0 / 3 | Attendre AM-077 (count-label / no-count sur display) ; en attendant la règle CSS locale des portraits Sports ( |
| [education/aap-socle-numerique-ecoles](../../public/education/aap-socle-numerique-ecoles.html) | 68 / 1 | 6.0 | 1809 | +16 | 0 / 0 / 0 | — |
| [education/accessibilite-equipements-sportifs](../../public/education/accessibilite-equipements-sportifs.html) | 68 / 16 | 1.7 | 1619 | +16 | 0 / 0 / 0 | — |
| [education/accompagnement-deficience-sensorielle](../../public/education/accompagnement-deficience-sensorielle.html) | 53 / 1 | 1.6 | 766 | +16 | 0 / 0 / 0 | — |
| [education/annuaire-bureaux-des-entreprises](../../public/education/annuaire-bureaux-des-entreprises.html) | 74 / 1 | 13.1 | 1754 | +16 | 0 / 0 / 0 | — |
| [education/annuaire-des-internats](../../public/education/annuaire-des-internats.html) | 79 / 1 | 6.7 | 1075 | +16 | 0 / 0 / 0 | — |
| [education/cactus-hameconnage](../../public/education/cactus-hameconnage.html) | 67 / 1 | 3.1 | 1058 | +16 | 0 / 0 / 0 | — |
| [education/capytale-usages](../../public/education/capytale-usages.html) | 41 / 14 | 0.8 | 1883 | +16 | 0 / 0 / 0 | — |
| [education/carto-pix-fiche-etablissement](../../public/education/carto-pix-fiche-etablissement.html) | 69 / 1 | 8.3 | 1700 | +16 | 0 / 0 / 0 | — |
| [education/cnr-education](../../public/education/cnr-education.html) | 71 / 1 | 9.4 | 2857 | +16 | 0 / 0 / 0 | — |
| [education/dataviz-ips-colleges](../../public/education/dataviz-ips-colleges.html) | 67 / 1 | 4.7 | 6517 | +16 | 0 / 0 / 0 | — |
| [education/dataviz-ips-ecoles](../../public/education/dataviz-ips-ecoles.html) | 53 / 2 | 1.7 | 1143 | +16 | 0 / 0 / 0 | — |
| [education/dataviz-ips-erea](../../public/education/dataviz-ips-erea.html) | 44 / 1 | 1.6 | 887 | +16 | 0 / 0 / 0 | — |
| [education/dataviz-ips-lycees](../../public/education/dataviz-ips-lycees.html) | 67 / 1 | 3.8 | 2044 | +16 | 0 / 0 / 0 | — |
| [education/dnma-usages-ent](../../public/education/dnma-usages-ent.html) | 41 / 14 | 0.7 | 6426 | +16 | 0 / 0 / 0 | — |
| [education/educajou-ecolemap](../../public/education/educajou-ecolemap.html) | 43 / 3 | 0.9 | 785 | +16 | 0 / 0 / 0 | — |
| [education/equipements-sportifs-milieu-scolaire](../../public/education/equipements-sportifs-milieu-scolaire.html) | 56 / 10 | 1.5 | 2600 | +16 | 0 / 0 / 0 | — |
| [education/etablissements-euroscol](../../public/education/etablissements-euroscol.html) | 71 / 1 | 3.4 | 1365 | +16 | 0 / 0 / 0 | — |
| [education/fei-chiffres-cles](../../public/education/fei-chiffres-cles.html) | 54 / 13 | 1.3 | 1425 | +16 | 0 / 0 / 3 | Une `dsfr-data-map-legend` par couche (`for="couche-cql"`, `for="couche-cpfx"`), et la largeur du select dans  |
| [education/fei-projets-europeens-donnees](../../public/education/fei-projets-europeens-donnees.html) | 30 / 1 | 0.8 | 745 | +16 | 1 / 1 / 2 | Réécrire la ligne du tableau (« Corrigé en 0.29 : un `replace-fields` en amont ») et le dernier tiers du verdi |
| [education/gar-ressources-numeriques](../../public/education/gar-ressources-numeriques.html) | 65 / 5 | 6.7 | 1673 | +16 | 0 / 2 / 1 | Déplacer la balise `dsfr-data-search` dans la colonne « Filtrer » du catalogue (:304-314), au-dessus des facet |
| [education/generation-2024](../../public/education/generation-2024.html) | 68 / 1 | 9.1 | 1903 | +16 | 0 / 1 / 2 | Mesurer le temps au repos réseau à 390 px ; si > 3 s, passer en `require-where` sur académie/région avec une f |
| [education/hybridation-enseignement-lycee](../../public/education/hybridation-enseignement-lycee.html) | 63 / 1 | 2.1 | 1072 | +16 | 0 / 1 / 1 | Réécrire les trois passages au passé (« jusqu'en 0.28 ») ; la page reste la première à avoir employé `fill-fie |
| [education/implantation-ulis-tfv](../../public/education/implantation-ulis-tfv.html) | 48 / 1 | 1.4 | 1100 | +16 | 0 / 0 / 2 | Retirer `search` de la liste quand une recherche globale existe (la liste suit déjà `ulis-f`), ou nommer la se |
| [education/label-egalite-fille-garcon](../../public/education/label-egalite-fille-garcon.html) | 70 / 1 | 3.1 | 2663 | +16 | 0 / 0 / 2 | Retirer la facette `ville` (la recherche couvre `ville`) et le `search` du tableau ; six facettes restent. |
| [education/non-reproduites](../../public/education/non-reproduites.html) | 11 / 0 | 0.2 | 589 | — | 0 / 0 / 1 | Reprendre le squelette de fil d'Ariane et sortir la section du container. |
| [education/offre-formation-langues](../../public/education/offre-formation-langues.html) | 59 / 1 | 1.7 | 730 | +16 | 0 / 2 / 1 | Supprimer `lang-liste-n`, brancher `lang-liste-tri` sur `lang-liste`, vérifier que le sélecteur de langues gar |
| [education/passe-ton-hack-dabord](../../public/education/passe-ton-hack-dabord.html) | 58 / 1 | 2.0 | 855 | +16 | 0 / 1 / 2 | Réécrire le point : « voie serveur possible depuis 0.29 ; voie cliente conservée parce qu'elle suit les facett |
| [education/patronymes-des-ecoles](../../public/education/patronymes-des-ecoles.html) | 35 / 9 | 0.7 | 1074 | +16 | 0 / 2 / 2 | Réécrire le commentaire dans les termes de l'analyse. |
| [education/personnels-colleges](../../public/education/personnels-colleges.html) | 30 / 1 | 7.9 | 1402 | +16 | 0 / 2 / 1 | Sans build, deux voies : générer les deux pages depuis un gabarit par script (comme les registres), ou au mini |
| [education/personnels-ecoles-primaires](../../public/education/personnels-ecoles-primaires.html) | 41 / 10 | 0.8 | 1076 | +16 | 0 / 2 / 1 | Retirer `e-ren-n` (brancher les deux `unpivot` sur `e-ren`), corriger le commentaire ; l'alias reste facultati |
| [education/personnels-lycees](../../public/education/personnels-lycees.html) | 30 / 1 | 4.7 | 1153 | +16 | 1 / 1 / 1 | Corriger les sept nombres, ou mieux les remplacer par des KPI calculés (cf. personnels-colleges) pour que la d |
| [education/portrait-de-territoire-sports](../../public/education/portrait-de-territoire-sports.html) | 58 / 12 | 1.5 | 8887 | +16 | 1 / 3 / 3 | Clé de département par le NOM, comme la région : les quatre jeux ont un champ texte (`dep_nom`, `nom_departeme |
| [education/tedi-robots-telepresence](../../public/education/tedi-robots-telepresence.html) | 66 / 1 | 3.5 | 2140 | +16 | 1 / 1 / 2 | Chapô sans nombres (ou datés : « au 10 septembre 2026 »), les nombres vivent dans les KPI ; la `meta descripti |
| [education/tne-dashboard](../../public/education/tne-dashboard.html) | 29 / 4 | 0.7 | 791 | +16 | 1 / 1 / 1 | Réécrire la ligne du tableau (« `running_sum` 0.27.0, `diff` 0.29.0 ») et le verdict ; le point « Ce qui a coi |
| [index](../../public/index.html) | 26 / 0 | 1.1 | 669 | +16 | 0 / 0 / 0 | — |
| [retours](../../public/retours.html) | 19 / 0 | 1.0 | 614 | +487 | 1 / 1 / 0 | `pagination="20"`. |
| [sports](../../public/sports.html) | 16 / 0 | 0.4 | 617 | — | 0 / 0 / 1 | Choisir une politique (laisser visible partout en attendant AM-077, ou masquer partout via une règle unique de |
| [sports/portrait-federation](../../public/sports/portrait-federation.html) | 50 / 28 | 0.9 | 1559 | — | 0 / 0 / 0 | — |
| [sports/portrait-territoire](../../public/sports/portrait-territoire.html) | 83 / 56 | 0.9 | 1869 | — | 1 / 1 / 2 | Regrouper ces deux règles en un seul endroit (site.css, section « contournement AM-077, à retirer ») avec la r |
| [synthese](../../public/synthese.html) | 26 / 1 | 0.7 | 787 | +16 | 0 / 1 / 0 | Un `fr-summary` généré depuis les `h3` (dix lignes de JS dans la page, ou statique) ; scinder en deux pages :  |
| [viz/aide-publique-developpement](../../public/viz/aide-publique-developpement.html) | 35 / 9 | 0.7 | 1070 | +16 | 1 / 3 / 1 | Titre : « Montants versés par année de déclaration (suit l'agence et la région, pas l'année) ». |
| [viz/aides-de-minimis](../../public/viz/aides-de-minimis.html) | 29 / 1 | 7.0 | 1935 | +635 | 0 / 1 / 3 | Vérifier `metriques.json` (mobile.debordement) ; si oui, réduire les colonnes sous 768 px ou envelopper. |
| [viz/annuaire-services-dgfip](../../public/viz/annuaire-services-dgfip.html) | 57 / 1 | 20.3 | 3130 | +16 | 1 / 2 / 2 | Pour la carte : ne charger que les champs de l'infobulle et la géométrie ; pour la fiche : `dsfr-data-map-popu |
| [viz/barometre-france-num](../../public/viz/barometre-france-num.html) | 35 / 5 | 0.9 | 1865 | +141 | 0 / 1 / 3 | Retirer ce KPI, ou le remplacer par un chiffre lisible (« 12 chapitres », ou le score de la question choisie e |
| [viz/bofip](../../public/viz/bofip.html) | 34 / 6 | 0.6 | 1103 | +16 | 0 / 1 / 2 | Mettre le commentaire à jour (« corrigé en 0.29.0, #796 »). |
| [viz/centres-controle-technique](../../public/viz/centres-controle-technique.html) | 61 / 1 | 8.4 | 1930 | +625 | 1 / 0 / 2 | `value="nom_region:distinct"` sur `qt-f` (ou `meta:total` sur la query) ; ajouter à la recette un relevé des a |
| [viz/comptabilite-generale](../../public/viz/comptabilite-generale.html) | 37 / 13 | 0.7 | 1038 | +16 | 0 / 1 / 3 | `color-map="Actif:#000091,Passif:#c9191e"` sur `g-bilan-an` et `gm-bilan`, `Produits/Charges` sur `g-cr-an` et |
| [viz/decp-augmente](../../public/viz/decp-augmente.html) | 29 / 4 | 0.6 | 2842 | +16 | 1 / 0 / 2 | Remplacer les 7 selects par `<dsfr-data-facets context="ctx-decp" server-facets source="decp-par-source" field |
| [viz/entreprise-patrimoine-vivant](../../public/viz/entreprise-patrimoine-vivant.html) | 58 / 1 | 2.9 | 965 | +16 | 0 / 2 / 2 | Quatre KPI : `count{pme:eq:PME} / count`, `count{entreprise_artisanale:eq:oui} / count`, `count{gamme_de_prix: |
| [viz/entreprises-restauration-notre-dame](../../public/viz/entreprises-restauration-notre-dame.html) | 66 / 1 | 2.5 | 2666 | +16 | 0 / 2 / 2 | `{{#each images}}<a href="…/{{.}}">…{{/each}}` (un `<img loading="lazy">` par valeur réelle : plus de repli «  |
| [viz/fermeture-reseau-cuivre](../../public/viz/fermeture-reseau-cuivre.html) | 53 / 3 | 1.6 | 1039 | — | 0 / 1 / 2 | `<dsfr-data-map-legend for="<id couche>">` ; à défaut, `color:#fff` sur le tag noir. |
| [viz/fiscalite-locale](../../public/viz/fiscalite-locale.html) | 56 / 12 | 4.9 | 2936 | +16 | 1 / 2 / 1 | `classes="4" method="equal"` (les quatre classes égales de l'original) + `<dsfr-data-map-legend for="couche-co |
| [viz/formations-france-num](../../public/viz/formations-france-num.html) | 13 / 0 | 0.3 | 1036 | — | 0 / 0 / 1 | Retirer les deux scripts sur ces deux pages (et `cles.js`). |
| [viz/impot-sur-le-revenu](../../public/viz/impot-sur-le-revenu.html) | 24 / 0 | 0.6 | 630 | +16 | 0 / 1 / 2 | Consigner au registre (amélioration : état idle du compteur de recherche) ; en attendant, masquer le compteur  |
| [viz/non-reproduites](../../public/viz/non-reproduites.html) | 15 / 0 | 0.4 | 607 | — | 0 / 0 / 0 | — |
| [viz/ofgl](../../public/viz/ofgl.html) | 11 / 0 | 0.2 | 594 | — | 0 / 0 / 1 | Envelopper le contenu dans `<section id="analyse" class="odv-analyse">` pour que les liens `#analyse` de la sy |
| [viz/plan-de-relance](../../public/viz/plan-de-relance.html) | 53 / 1 | 5.3 | 1473 | +16 | 0 / 2 / 2 | `empty-label="Non renseigné"` sur `g-type` et `g-region` ; vérifier la légende au navigateur. |
| [viz/prix-controle-technique](../../public/viz/prix-controle-technique.html) | 50 / 3 | 1.6 | 1085 | +16 | 0 / 1 / 2 | `require-where` sur `ct` avec `idle-message="Cherchez une commune ou choisissez un type de véhicule"` sur cart |
| [viz/prix-des-carburants](../../public/viz/prix-des-carburants.html) | 44 / 1 | 9.7 | 2441 | +291 | 0 / 1 / 2 | Rien à changer sur le fond ; mesurer le compressé réel (probablement < 1 Mo) et l'écrire dans l'analyse à la p |
| [viz/qualite-tourisme](../../public/viz/qualite-tourisme.html) | 57 / 1 | 3.5 | 1208 | +16 | 0 / 0 / 2 | `{{#if telephone}}…{{/if}}`, `{{#if site_web}}<a href="{{site_web:url}}">…{{/if}}`. |
| [viz/rappel-conso-tableau-de-bord](../../public/viz/rappel-conso-tableau-de-bord.html) | 35 / 7 | 0.7 | 1297 | +16 | 0 / 2 / 1 | Brancher `year-of` et `month-of` directement sur `#filtre-date`, poser `default="today"`, supprimer les champs |
| [viz/rappelconso](../../public/viz/rappelconso.html) | 36 / 6 | 0.7 | 1467 | +16 | 0 / 0 / 3 | `{{risques_encourus:join: · }}`. |
| [viz/signalconso](../../public/viz/signalconso.html) | 30 / 4 | 0.7 | 1025 | +16 | 2 / 1 / 1 | Soit `value-field="n" value-field-2="reponse"` (dépôts en barres, réponses en courbe, le sens naturel) et inve |
| [viz/tourisme-et-handicap](../../public/viz/tourisme-et-handicap.html) | 61 / 1 | 3.9 | 1203 | +16 | 0 / 0 / 2 | Garder la duplication (pas de partial de template dans la bibliothèque — à noter au registre si utile), passer |

## Annexes

- [`revue-critique/constats.json`](revue-critique/constats.json) — les 244 constats (page, angle, sévérité, nature, constat, preuve, recommandation).
- [`revue-critique/lot-bercy.md`](revue-critique/lot-bercy.md) — Bercy, 25 pages, motifs et fiches.
- [`revue-critique/lot-education-a.md`](revue-critique/lot-education-a.md) et [`lot-education-b.md`](revue-critique/lot-education-b.md) — Éducation, 2 × 17 pages.
- [`revue-critique/socle-et-sports.md`](revue-critique/socle-et-sports.md) — lecture transverse des mesures, serveur, assets, scripts, portraits Sports.
- Mesures brutes : `node scripts/metriques-pages.mjs` (≈ 40 min pour les 66 pages, deux largeurs).
