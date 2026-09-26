# Portail Développement durable (SDES / DiDo) — proposition de cadrage

> Niveau **avancé** de la skill `dataviz-metier` : des pages qui racontent, pas des reproductions.
> Ce portail est le premier du dépôt **sans dataviz d'origine à reproduire** : le catalogue du SDES
> (<https://www.statistiques.developpement-durable.gouv.fr/catalogue>) publie des jeux, pas des pages.
> On **crée** donc, au format des pages recréées du 2026-09-26 (`viz/fiscalite-locale.html`,
> `education/dataviz-ips-colleges.html`, `viz/aide-publique-developpement.html`) : titre-message,
> chapeau calculé, accroche, preuve, nuance, exploration, « ce qu'on ne montre pas », notes
> éditoriales, puis la section `#analyse` du dépôt.
>
> Tous les chiffres de ce document ont été **sondés à l'API DiDo le 2026-09-26** (scripts dans le
> scratchpad de session, non versionnés). Ce qui n'a pas pu être mesuré est marqué **non sondé**.
> Rien n'a été vérifié au navigateur : ce document cadre, il ne livre pas.

---

## 0. Résumé

- **41 jeux**, 260 fichiers de données (`datafiles`), 5 thèmes (Énergie 12, Logement 11, Transports 7,
  Environnement 8, Changement climatique 3). Beaucoup de très gros fichiers (le plus lourd : locaux non
  résidentiels mensuels, **87,3 M lignes**), quelques tout petits (déchets : 216 lignes).
- **Huit dataviz recommandées en première vague** (§ 4), toutes portées par au moins un chiffre sondé,
  six d'entre elles par un **croisement** de jeux. Neuf autres en deuxième vague (§ 5), quinze jeux
  écartés ou fusionnés avec leur raison (§ 6).
- **Faisabilité `dsfr-data` × DiDo : bonne, par le mode URL, sans adaptateur** (§ 2). L'export
  `/json` d'un fichier rend un tableau JSON brut, CORS ouvert, filtrable colonne par colonne dans
  l'URL, réductible par `columns=` : c'est exactement ce que `dsfr-data-source url=` sait lire.
  Ce que DiDo **ne fait pas** : agréger. Tout `group-by` se fait côté client, donc il faut que le
  filtre serveur ramène un volume chargeable — c'est le cas de 7 des 8 dataviz de première vague.
  La huitième (phytosanitaires) est le cas limite qui décide de la stratégie sur les gros jeux.
- **Alternative Tabular (data.gouv.fr)** pour 29 jeux sur 41 : agrégation serveur, 200 lignes/page,
  25 000 lignes par défaut, `select` traduit en `columns=`, mais pas d'export, tri serveur à
  proscrire (PG-033), `__in` fragile (PG-034). Les jeux qui en auraient le plus besoin (phytos, parc,
  immatriculations, RPLS) **n'y sont pas**. La comparaison millésime Tabular ↔ DiDo **n'a pas pu être
  rejouée** (hôtes `*.data.gouv.fr` injoignables depuis la machine de session) : § 2.4 dit ce qu'il
  faut rejouer et les valeurs attendues.

---

## 1. Ce qu'est DiDo, vérifié à l'API

Base : `https://data.statistiques.developpement-durable.gouv.fr/dido/api/v1`. OpenAPI :
`/swagger.json` (460 Ko, « DiDo - API diffusion v1 »). En-têtes vérifiés : `access-control-allow-origin: *`,
`access-control-expose-headers: Content-Type,Content-Disposition`. Aucune clé, aucun quota
observé (≈ 60 requêtes en une heure, dont une de 102 Mo, sans refus).

| Endpoint | Ce qu'il rend | Vérifié |
|---|---|---|
| `GET /datasets?pageSize=100&page=1` | `{total, data[41], page, pageSize, nextPage…}` ; chaque jeu embarque ses `datafiles`, leurs `millesimes`, et pour chaque millésime `rows` et `columns[{name, description, unit, type, filters}]` | 41 jeux, 260 datafiles |
| `GET /datafiles/{rid}/json?…` | **tableau JSON brut** (`[{…}, …]`), sans enveloppe, tout le millésime | 505 lignes / 83 Ko / 0,28 s ; 108 803 lignes / 26 Mo / 4,7 s ; 584 931 lignes / 102 Mo / 17 s |
| `GET /datafiles/{rid}/csv?…` | CSV `;` avec guillemets, en-tête optionnel (`withColumnName`, `withColumnDescription`, `withColumnUnit`) | oui |
| `GET /datafiles/{rid}/rows?pageSize=&page=` | `{total, page, pageSize, data[], firstPage, previousPage, nextPage, lastPage}` ; **`pageSize` obligatoire, énuméré 10/20/50/100** — omis → HTTP 400 | oui |
| `GET /datafiles/{rid}/count?…` | `{total}` du filtre | oui |
| `GET /datafiles/{rid}/spatial/geojson?geoField=` | GeoJSON (non sondé sur un jeu ; aucun jeu candidat ne porte de géométrie) | non sondé |
| `GET /referentiels/{cog,geozones,naf,…}/json`, `/cog/spatial/geojson` | référentiels géographiques et nomenclatures (COG avec `GEO_SHAPE`) | listés dans l'OpenAPI, **non sondés** |

**Filtres** : un paramètre par colonne, `COLONNE=op:valeur` avec `op ∈ {eq, ne, gt, gte, lt, lte, in, nin, contains}`
(la liste par colonne est dans `columns[].filters`). Vérifiés : `ANNEE=eq:2024`, `TYPE_LGT=eq:Tous Logements`
(espace encodé `%20`), `VARIABLE=in:a,b,c` (909 = 101 + 101 + 707), `COMMUNE_CODE=contains:750`,
plusieurs filtres combinés. **Colonnes** : `columns=A,B,C` réduit la charge (le fichier ITDD
départemental passe de ~20 colonnes-années à 11). **Tri** : `orderBy=-col1,col2`. **Millésime** :
`millesime=YYYY-MM`, **le dernier si omis** — le `rid` d'un datafile est stable d'un millésime à
l'autre (ITDD : 5 millésimes, même rid). L'apidoc par millésime annoncée dans l'OpenAPI
(`/datafiles/{rid}/millesime={m}/apidoc.html`) rend une page de 30 octets : elle n'existe pas ou plus.

**Typage réel des valeurs JSON** (le piège central de ce portail) :

- les nombres sont des nombres JSON… **sauf quand la cellule est sous secret** : la chaîne `"secret"`
  remplace alors la valeur (ECLN départemental : 1 596 cellules `PRIX_M2` sur 24 667 lignes ; rail :
  3 801 ; EPTB : 1 924 ; **CEE départements : 15 357 lignes sur 20 352, 75 %** ; risque inondation :
  24). Les phytosanitaires utilisent `"na"` (4 809 cellules `QUANTITE_SUBSTANCE` en 2024) ;
- `ANNEE` est une chaîne (`"2024"`) même quand la colonne est typée `year` ; `TRIMESTRE` vaut
  `"2026-T2"` ; `PERIODE` mensuelle vaut `"2026-07"` ;
- un `null` est un `null` (pas 0) : les mises en chantier 2025 (`LOG_COM`) sont `null` dans les
  101 départements, quand les autorisations 2025 sont renseignées (357 452). « Données non estimées, en
  date réelle » : un `null` qui veut dire « pas encore connu », pas « zéro » ;
- plusieurs jeux sont **larges par année** (`A2025 … A1982` pour l'ITDD, `PARC_2011 … PARC_2026`,
  `IMMAT_2010 … IMMAT_2025`) : à dépivoter côté client ;
- **lignes dupliquées** dans l'ITDD : la « population totale » d'un département apparaît 5 fois, sous
  cinq numéros d'indicateur (`i017`, `i021`, `i079b`, `i086`, `i093b`), avec des années couvertes
  différentes. Sommer sans filtrer `NO_INDIC` compte cinq fois.

### 1.1 Les 41 jeux en une table

Maille = `spatial.granularity` déclarée (souvent `other` quand le jeu porte plusieurs mailles) ; volume =
lignes du dernier millésime, tous datafiles ; fraîcheur = `last_update`.

| # | id DiDo | Jeu | Thème | Maille réelle | Période | Volume | MàJ | Unité de compte réelle | Sort |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `631b03afb61e5c6479370169` | Conjoncture mensuelle de l'énergie | Énergie | national, mensuel | 1980→2026-07 | 19 fichiers × 559-572 | 2026-09-11 | GWh, TWh PCS, kt, € TTC/100 kWh, M€ | **V1** (D1, D6) |
| 2 | `653a73851c7e074730ec5b5b` | Locaux non résidentiels, séries mensuelles | Logement | commune × mois | 2013→2026-07 | **87,3 M** | 2026-09-04 | m² et locaux autorisés/commencés | écarté |
| 3 | `660432ce0b8987ef5dd9465d` | Logements autorisés/commencés, mensuel communal | Logement | commune × mois | 2013→2026-07 | 29,0 M | 2026-09-04 | logements | écarté |
| 4 | `6513ef5f3b05e5cd969c2711` | Locaux non résidentiels, séries annuelles | Logement | commune/dept/EPCI | 2013→2025 | 4,4 M | 2026-09-04 | m² | V2 (entrepôts) |
| 5 | `6513ee3a3b05e5cd969c270f` | Logements autorisés/commencés, séries annuelles | Logement | commune 2,3 M / **dept 6 565** / **EPCI 100 595** | 2013→2025 | 2,4 M | 2026-09-04 | logements (LOG_AUT, LOG_COM), m² (SDP) | **V1** (D2, D4) |
| 6 | `6513f0189d7d312c80ec5b5b` | Liste des permis de construire (Sitadel) | Logement | permis | 2013→2026-07 | 3,0 M | 2026-08-28 | un permis | écarté |
| 7 | `6513eed03b05e5cd969c2710` | Logements autorisés/commencés, séries mensuelles | Logement | dept/région × mois | 2000→2026-07 | 131 428 | 2026-08-28 | logements | V2 (D2 mensuel) |
| 8 | `677d45b0359a5cbb32fc907c` | Rail : marchandises | Transports | national, région | 1980→2025 | 41 159 | 2026-08-26 | tonnes, t-km | V2 (fret) |
| 9 | `63ecb0418b083b02288edf23` | ECLN national | Logement | national × trimestre | 1995→2026-T2 | 2 264 | 2026-08-20 | réservations, mises en vente, stock, €/m² | **V1** (D2) |
| 10 | `63ecb013d3616ab39e722df2` | ECLN régional | Logement | région × trimestre | 2005→2026-T2 | 6 760 | 2026-08-20 | idem | fusion D2 |
| 11 | `63ecafe2c23793f3638edf24` | ECLN départemental | Logement | **dept × trimestre**, 24 667 | 2005→2026-T2 | 24 667 | 2026-08-20 | idem, 1 596 `secret` | **V1** (D2) |
| 12 | `63ecaef1c23793f3638edf23` | ECLN zonage ABC | Logement | zone ABC × trimestre | 2005→2026-T2 | 1 606 | 2026-08-20 | idem | fusion D2 |
| 13 | `6870fd6046d2f7597817b8fe` | Maritime : marchandises | Transports | port × année (39 ports) | 2000→2024 | 1 540 | 2026-07-29 | tonnes par type de fret, EVP ; Entrée/Sortie | V2 (fret) |
| 14 | `64394162329d458db52e7189` | Phytosanitaires, code postal | Environnement | code postal × produit | 2015→2024 | 14,6 M | 2026-07-23 | kg de substance active achetée | écarté |
| 15 | `64394106723e32063d3a165a` | Phytosanitaires, département (achats + ventes) | Environnement | **dept × produit × substance**, 1,39 M + 1,68 M | 2013→2024 | 3,07 M | 2026-07-23 | kg SA **acheté** (adresse de l'acheteur) | **V1** (D5, cas limite) |
| 16 | `683d7766e2ff66a027f3b693` | Phytosanitaires estimés, commune | Environnement | commune | 2015→2024 | **0 datafile** | 2026-07-22 | — | écarté (vide) |
| 17 | `682c33e7d455a8571c7d00ff` | Parc de véhicules routiers | Transports | **commune** × carburant × Crit'Air × statut × catégorie, large 2011-2026 | 2011→2026 | 2,13 M | 2026-07-10 | véhicules estimés, révisables | V2 (portrait communal) |
| 18 | `6102491997d9292269ce2d70` | Chaleur et froid, commune (réseaux) | Énergie | réseau (992 en 2024) | 2018→2024 | 6 264 | 2026-06-25 | MWh, MW, gCO2/kWh | V2 |
| 19 | `6102495797d92922a8ce2d70` | Élec/gaz/chaleur locales 2008-2017 | Énergie | — | 2008→2017 | 567 571 | 2026-06-25 | MWh | écarté (ancien) |
| 20 | `6102466697d9291fc5ce2d70` | Élec/gaz/chaleur, points d'intérêt | Énergie | poi | 2018→2022 | 8,0 M | 2026-06-25 | MWh | écarté |
| 21 | `610244c9e436671e84ec5da8` | Élec/gaz/chaleur, IRIS | Énergie | IRIS | 2018→2023 | 4,3 M | 2026-06-25 | MWh | écarté (V2 portrait) |
| 22 | `66684be91c2b28d362ecbf4f` | Fluvial : marchandises | Transports | national, région | 2011→2024 | 18 990 | 2026-06-11 | tonnes, t-km | V2 (fret) |
| 23 | `632956d8eae137714f60ae22` | **ITDD** (Insee-SDES, ODD) | Environnement | France / région 14 526 / **dept 71 003** / EPCI 612 928 / CRTE / communes DROM | 1954→2025 | 17,7 M | 2026-04-22 | 311 variables, unités hétérogènes, large par année | **V1** (D5, D7, D8) |
| 24 | `62792fb07ca0d5368edf67a3` | Qualité de l'air, indicateurs nationaux | Environnement | national × polluant × typologie | 2000→2024 | 511 | 2026-03-12 | µg/m³, % de stations, % d'agglomérations | **V1** (D3) |
| 25 | `62792fb27ca0d5368edf67a4` | Qualité de l'air, indicateurs territoriaux | Environnement | agglomération (202) | 2020→2024 | 2 494 | 2026-03-12 | Respect / Dépassement ; nb d'années | **V1** (D3) |
| 26 | `682c30aad455a8571c7d00fe` | Immatriculations | Transports | commune, large 2010-2025 | 2010→2025 | 3,54 M | 2026-02-11 | immatriculations (chaînes !) | écarté |
| 27 | `6390f7cb84f0679b04942fc2` | RPLS détaillé au logement | Logement | **un logement par ligne** | 2022→2025 | 5,42 M | 2026-01-20 | logement social | écarté |
| 28 | `686790f156912d386b95d52e` | Exposition submersion marine | Climat | EPCI (202) | ponctuel (Fideli 2021) | 3 798 | 2025-12-10 | logements, personnes, % | **V1** (D4) |
| 29 | `68678efa1da66b014917b8fe` | Exposition débordement de cours d'eau | Climat | **EPCI (1 255)** | ponctuel (Fideli 2021) | 22 590 | 2025-12-10 | 12 indicateurs (EAIP) | **V1** (D4) |
| 30 | `68678c4364290d2dd795d52e` | Retrait-gonflement des argiles (RGA) | Climat | EPCI | ponctuel (Fideli 2021) | 14 808 | 2025-12-10 | maisons individuelles RGA1/2/3 | V2 |
| 31 | `63b8281ec113d45936722df2` | Prix des terrains et du bâti (EPTB) | Logement | région × année, **échantillon** | 2006→2024 | 90 202 | 2025-12-09 | €/m², € ; NB = maisons **enquêtées** | **V1** (D6) |
| 32 | `675c0ad59718fa4d74fc907c` | Entrepôts et plateformes logistiques | Transports | région (26) / dept / EPCI | 2023→2024 | 3 046 | 2025-11-06 | entrepôts ≥ 10 000 m², M m² ; tranches | V2 |
| 33 | `610247f1e43667219cec5da8` | Conso élec/gaz, **région** | Énergie | région × secteur × NAF2 | 2018→2024 | 32 302 | 2025-10-01 | MWh, PDL, THERMOR | **V1** (D1) |
| 34 | `6102486fe436672220ec5da8` | Conso élec/gaz, **EPCI** | Énergie | EPCI × secteur, 14 fichiers annuels | 2018→2024 | 535 991 | 2025-09-30 | MWh, PDL | V2 |
| 35 | `610244a997d9291e03ce2d70` | Produits pétroliers, mensuel national | Énergie | national × mois | 2017→2024 | 96 | 2025-09-30 | tonnes | fusion D6 |
| 36 | `6102445fe436671e1cec5da8` | Produits pétroliers, **département** | Énergie | dept × année (97) | 2005→2024 | 1 971 | 2025-09-30 | tonnes (m³ pour le plombé) | **V1** (D6) |
| 37 | `61024489e436671e47ec5da8` | Produits pétroliers, DROM | Énergie | DROM × année | 2011→2024 | 70 | 2025-09-30 | **m³** (pas tonnes) | fusion D6 (unité !) |
| 38 | `6622107a0a16ec992700eab5` | Production et traitement des déchets | Environnement | national, biennal | 2016→2022 | 432 | 2025-09-16 | tonnes par NACE / par traitement | **V1** (D7) |
| 39 | `62b2c411ed00fe7b9195e145` | GES et polluants, format AEA | Environnement | national × NACE | 2008→2020 | 19 966 | 2025-07-29 | tonnes | écarté (arrêté à 2020) |
| 40 | `649bf6dbea4a7593d724e365` | CEE — EPCI | Énergie | EPCI × fiche × année | 2015→2022 | 298 460 | 2025-04-16 | dossiers, kWh cumac | V2 |
| 41 | `649bf583ea4a7593d724e364` | CEE — Départements | Énergie | dept × fiche × année | 2015→2022 | 43 758 | 2025-04-16 | idem, **75 % de `secret`** | V2 |

---

## 2. Faisabilité technique : `dsfr-data` × DiDo, puis × Tabular

### 2.1 Ce qui a été vérifié dans le source (`~/Developer/GitHub/dsfr-data/packages`, `origin/main`)

- **Aucun adaptateur DiDo** : `core/src/adapters/` contient `opendatasoft`, `tabular`, `grist`,
  `insee`, `generic` ; aucune occurrence de « dido » ni de « developpement-durable » dans `core/src`
  ni `docs/`.
- **Mode URL de `dsfr-data-source`** (`components/dsfr-data-source.ts`, l. 107-135 et 969-1060) :
  `url` → `fetch` → `response.json()` ; sans `transform`, `this._data = json` ; un tableau est
  aplati selon le fournisseur détecté (`generic` : rien à aplatir). **Une réponse non JSON lève**
  « Réponse non-JSON (content-type: …) » (l. 1027-1030) : **le CSV DiDo n'est pas lisible en mode URL**,
  seul `/json` l'est. `params='{"ANNEE":"eq:2024"}'` est posé en query string en GET (l. 1431-1437),
  ce qui permet d'écrire le filtre DiDo hors de l'URL.
- **`paginate` du mode URL** (`shared/src/providers/generic.ts`, `GENERIC_CONFIG.pagination`, #1136) :
  convention `?page=N&page_size=M` en requête et `{data, meta:{page, page_size, total}}` en réponse.
  DiDo attend `pageSize` (énuméré) et répond `{total, page, pageSize, data}` à la racine : **le
  `page_size` de dsfr-data serait ignoré et DiDo répondrait 400** (« pageSize requis »). **Pas de
  pagination serveur possible avec DiDo** sans adaptateur ; c'est l'export `/json` filtré qui tient
  ce rôle.
- **Capacités de `GenericAdapter`** (`generic-adapter.ts`) : `serverFetch/Facets/Search/GroupBy/OrderBy: false`,
  `whereFormat: 'colon'`. Donc `where`, `group-by`, `order-by`, `select` posés sur une source URL
  **ne partent pas au serveur** : le filtre serveur DiDo s'écrit dans l'URL (ou `params`), tout le
  reste (`dsfr-data-query`, `pivot`, `normalize`, `join`) est client.
- **Non-nombres dans les agrégats** (`utils/aggregations.ts`, `collectNumericValues`, #301) :
  `toNumber` strict, « les non-numériques sont EXCLUS (jamais 0) ». Une cellule `"secret"` ou `"na"`
  **sort de la somme sans la fausser** — mais **sans un mot** : un total départemental où 75 % des
  cellules sont secrètes (CEE) a l'air d'un total. `utils/sort.ts` classe les chaînes non numériques
  après les nombres. **À vérifier au navigateur** : le rendu d'un `"secret"` par `dsfr-data-chart`
  (barre absente ? zéro ?) et par `dsfr-data-list` (texte, attendu).
- **`dsfr-data-unpivot`** existe (`components/dsfr-data-unpivot.ts`) : c'est la voie pour les jeux
  larges par année (ITDD `A2025…`, parc `PARC_*`). Grammaire **non lue** ici : à vérifier dans le
  JSDoc avant d'écrire (règle 1 du CLAUDE.md).
- **Version chargée par les pages** : `dsfr-data@0.42.0` sur 60 pages (le CLAUDE.md dit encore 0.33.0).
  Le bundle 0.42.0 (640 Ko) contient bien la chaîne `paginate` (8 occurrences) ; ses constantes de
  pagination minifiées n'ont pas pu être lues par simple `grep`.

### 2.2 Trois voies, et quand les prendre

| Voie | Mécanique `dsfr-data` | Quand | Coût typique mesuré |
|---|---|---|---|
| **A. DiDo filtré** (recommandée par défaut) | `dsfr-data-source url=".../datafiles/{rid}/json?COL=eq:v&columns=…"` puis `dsfr-data-query group-by` client | le filtre serveur ramène ≤ ~50 000 lignes / ≤ ~10 Mo ; un chiffre par ligne × clé | 505 lignes / 0,3 s (Sitadel dept 2024) ; 101 lignes / 20 Ko (un indicateur ITDD) ; 10 263 lignes / 3,9 Mo / 0,6 s (gaz région) ; 24 667 / 4,6 Mo / 1 s (ECLN dept) ; 31 400 / 5,7 Mo / 2,1 s (pop ITDD EPCI) |
| **B. Tabular agrégé** (data.gouv.fr) | `api-type="tabular" resource="…" group-by aggregate` délégués ; 200 lignes/page, `max-records` 25 000 par défaut (relevable), `select` → `columns=` (#1019, #1027, #985, publiés en 0.36.0) | un agrégat sur un gros jeu **servi par Tabular** ; jamais `order-by` sur la source (PG-033) ; pas de `in` avec parenthèses (PG-034) ; CORS natif (AM-087) | non mesuré ici (hôte injoignable) ; le banc a mesuré 364 allers-retours pour 18 180 lignes **avant** le passage à 200/page |
| **C. Chargement complet** | `/json` sans filtre | petits fichiers (< 5 000 lignes) : air, déchets, EPTB, pétrole dept, prix conjoncture, ports | 175 lignes / 17 Ko ; 1 971 / 738 Ko ; 1 540 / 843 Ko |

Ce que la voie A garantit et que B ne garantit pas : **la fraîcheur** (le `/json` sans `millesime`
est le dernier millésime au moment du chargement) et **l'identité des chiffres** avec le catalogue
SDES. Ce que B fait et que A ne sait pas faire : **agréger un fichier de 1,4 M lignes en une
requête**. Or, d'après l'inventaire de l'orchestrateur, Tabular ne sert **pas** les trois jeux
phytosanitaires, ni le parc, ni les immatriculations, ni RPLS, ni les logements mensuels communaux :
précisément les jeux où l'agrégation serveur manquerait. **Conséquence : aucune dataviz de première
vague ne dépend de Tabular** ; la voie B reste une option d'exploration (« et dans mon département ? »)
là où le jeu est servi, à condition de rejouer d'abord § 2.4.

### 2.3 Ce que le cadrage doit trancher avant la première page

1. **Écrire ou ne pas écrire un adaptateur DiDo dans `dsfr-data`.** Le mode URL suffit à la
   première vague. Un adaptateur apporterait : `where` → `COL=op:v`, `select` → `columns=`,
   `max-records` sur `/rows` (par pages de 100), `server-facets` impossible (pas d'endpoint),
   lecture du `count`. Gain réel : petit tant qu'on n'agrège pas côté serveur — et DiDo n'agrège pas.
   Recommandation : **pas d'adaptateur en première vague** ; consigner en `amelioration` l'écart
   `paginate` (convention `page_size`/`meta.*` non paramétrable) si une page en a besoin.
2. **Les gros jeux (phytos)** : (a) voie A avec `columns=` réduit à 4 colonnes (≈ 8 Mo estimés pour
   108 803 lignes ; **non sondé** en 4 colonnes, 26 Mo sondés en 9 colonnes) ; (b) un filtre serveur
   qui restreint l'histoire (glyphosate seul : 60 790 lignes, 9,1 Mo, 3,7 s) ; (c) une pré-agrégation
   statique dans `public/data/` régénérée par script, comme les GeoJSON simplifiés — qui contredit
   « une balise, un CDN » et doit alors être écrite comme **limite** (`LIM`) : « DiDo n'agrège pas,
   Tabular ne sert pas ce jeu ». Recommandation : (b) pour la preuve, (a) pour la carte, et le dire.
3. **Le secret statistique** est une donnée du portail, pas un accident : chaque page qui somme doit
   afficher le nombre de cellules secrètes de la sélection (`value="count" where="champ:eq:secret"`,
   à vérifier : `toNumber` ne s'applique pas au `count`) et le dire en phrase de lecture.

### 2.4 Tabular ↔ DiDo : ce qui reste à rejouer

`tabular-api.data.gouv.fr` et `www.data.gouv.fr` ont refusé la connexion depuis la machine de session
(DNS résolu vers `wildcard.infra.data.gouv.fr`, connexion refusée ; DiDo répondait 200 au même
instant ; l'orchestrateur signale une possible protection anti-rafale). **Non sondé** : profils,
agrégats, typage. Les métadonnées data.gouv (`sdes-dg.json`) montrent que les ressources CSV
pointent vers `…/dido/api/v1/datafiles/{rid}/csv` **sans paramètre `millesime`** : Tabular ingère
donc le dernier millésime *au moment de son crawl*. Dates `last_modified` cohérentes sur les trois
jeux à rejouer. À rejouer avant toute page Tabular, en comparant à DiDo :

| Ressource Tabular (id data.gouv) | Datafile DiDo | Attendu (DiDo, 2026-09-26) |
|---|---|---|
| `ae0d7970-0860-4418-a1b7-874eca038c11` (logements annuels, dept) | `a0ae7112-5184-4ad7-842d-87b09fd27df1`, millésime 2026-09 | `total_lines` = 6 565 ; `ANNEE__exact=2024&DEPARTEMENT_CODE__exact=01&TYPE_LGT__exact=Tous Logements` → `LOG_COM` = 1 876 ; 2025 → `LOG_COM` null |
| `380b0793-9ffd-4607-8776-9a6301c9022f` (gaz, région) | `f42f0a8f-36bf-413b-b404-5fd8a4c8da36`, millésime 2024-09 | 10 263 lignes ; `ANNEE__groupby&CONSO__sum&CODE_GRAND_SECTEUR__exact=R` → 2024 ≈ 101,8 TWh (101 800 000 MWh) |
| `9ca06a40-0419-4b82-95ea-85f04bad2cc6` (ECLN, dept) | `95e4190c-4d70-403f-9537-5b71fd005b1c`, millésime 2026-08 | 24 667 lignes ; dernier `TRIMESTRE` = `2026-T2` ; **`PRIX_M2` probablement typé texte** (1 596 `secret`) → `PRIX_M2__sum` impossible ou faux : à constater |

Le troisième point est le plus important : si Tabular type en texte toute colonne qui porte un
`secret`, l'agrégation serveur est **perdue exactement sur les colonnes sensibles** — un constat à
consigner (`piege`) dès qu'il est établi.

---

## 3. Comment les histoires ont été cherchées

Trois passes par jeu candidat (skill, « trouver l'histoire ») : volume et bords (`count`, nulls,
premières/dernières périodes), distributions (sommes par clé, parts), mouvement (par année). Les
sept figures cherchées : écart, changement, exception, concentration, rupture, paradoxe, vide. Les
croisements se sont limités aux **mailles partagées** vérifiées à l'API : département (Sitadel,
ECLN, pétrole, phytos, ITDD, CEE), EPCI (Sitadel, risques, énergie, CEE, ITDD — 1 255 codes
communs sur 1 274 entre Sitadel 2019-2024 et l'EAIP débordement), région (énergie, EPTB, ECLN),
année-mois (conjoncture). Un croisement dont la jointure n'a pas été comptée est marqué **non sondé**.

---

## 4. Première vague recommandée (8 dataviz)

Ordre = ordre de production recommandé (du plus sûr au plus risqué). Effort : S = une séance,
M = deux à trois, L = plus, ou une décision d'architecture à prendre avant.

### D1 — Le gaz des ménages : un quart de consommation en moins en trois ans, un prix doublé

- **Question / lecteur** : « Les Français ont-ils vraiment réduit le gaz depuis la crise de 2022, et
  ce qu'ils paient a-t-il suivi ? » — lecteur de rapport (presse, élus, ménages) ; l'explorateur
  régional vient après.
- **Jeux** : conso régionale gaz `f42f0a8f-36bf-413b-b404-5fd8a4c8da36` et électricité
  `e841c15d-03e0-4289-b336-8c97b2d3a594` (jeu 33) ; prix ménages gaz `9bb3b4e5-91e7-4ee5-95d9-aef38471ee75`
  et électricité `cd28227c-bc1e-401b-8d42-3073497c2973`, facture énergétique
  `005fa4ec-7283-45a6-9ec3-ad77bd19406c`, synthèse toutes énergies `ab989910-0cd6-4af0-b4d3-e0d4605dee46`
  (jeu 1).
- **Histoire sondée (2026-09-26)** : gaz résidentiel (secteur `R`, hors NAF) **136,7 TWh en 2021 →
  101,8 TWh en 2024 (−25,5 %)**, pour 11,17 → 10,86 M de points de livraison (−2,8 %) : la
  consommation **par point de livraison** passe de 12 233 à 9 366 kWh (−23 %). L'électricité
  résidentielle, elle, ne bouge presque pas : 169,6 → 156,2 TWh, 36,8 M de PDL. Prix TTC du gaz
  toutes tranches : **7,24 c€/kWh (janv. 2021) → 15,01 (déc. 2025), ×2,07** ; électricité 18,99 →
  24,81 (max 28,50 en déc. 2024). Facture énergétique nationale : 46,9 Md€ (2021) → **118,5 Md€
  (2022)** → 48,4 (2025). Gaz total France corrigé du climat (`COR2`) : 416 TWh (2021) → 328 (2025).
  Industrie 69,7 TWh (2019) → 10,0 (2024) dans le fichier régional : **une rupture de champ, pas une
  désindustrialisation** — à vérifier dans la note méthodologique avant d'en dire un mot (le secteur
  `T` tertiaire passe de 75,1 à 20,8 en même temps : reclassement NAF probable).
- **Formes** : accroche 4 KPI (TWh 2024 avec évolution depuis 2021, kWh/PDL, prix ×2, facture 2022) ;
  preuve : barres 2018-2024 gaz résidentiel avec 2022 en évidence ; nuance : les deux courbes de prix
  sur 2019-2025 (même unité, c€/kWh) et une ligne « électricité résidentielle » qui ne baisse pas ;
  exploration : carte régionale de la baisse 2024/2021 (**non sondé** : le calcul par région a planté
  au sondage, à refaire) et tableau.
- **Pièges** : la conso régionale **n'est pas corrigée du climat** (2022-2024 sont doux) — le champ
  `THERMOR` (kWh/degré-jour) existe pour le dire ; la synthèse nationale (`_COR2`) l'est : ne pas
  mélanger les deux sans l'écrire. PDL ≠ ménages. Prix Eurostat « toutes tranches » = moyenne
  pondérée, pas un tarif. `CODE_SECTEUR_NAF2_CODE = ''` distingue les lignes agrégées des lignes par
  NAF : filtrer, sinon double compte. Unités : `CONSO` en MWh, synthèse en GWh, gaz brut en TWh PCS.
- **Faisabilité** : voie A/C. Quatre fichiers ≤ 572 lignes chargés entiers (31 Ko chacun) ; le
  régional gaz en un `/json` (3,9 Mo) ou filtré `CODE_GRAND_SECTEUR=eq:R` (**non sondé** en volume,
  ≈ 282 lignes attendues). Tout le récit tient en client. **Effort M.**

### D2 — Logements neufs : deux fois moins de ventes qu'en 2019, des prix qui n'ont pas baissé

- **Question / lecteur** : « La crise du neuf, c'est quoi en chiffres, et pourquoi les prix ne
  baissent-ils pas ? » — lecteur de rapport, puis l'explorateur départemental.
- **Jeux** : ECLN départemental `95e4190c-4d70-403f-9537-5b71fd005b1c` (jeu 11), ECLN national CVS
  `7e002311-3413-4046-9248-b6e761803fd0` et brut `6a038126-312a-4974-b5a6-c5a1394b4267` (jeu 9),
  Sitadel départemental `a0ae7112-5184-4ad7-842d-87b09fd27df1` (jeu 5).
- **Histoire sondée** : réservations de logements collectifs (somme des départements, brut) **131 505
  en 2019 → 61 955 en 2025 (−53 %)** ; stock fin d'année 104 202 → 115 461 ; prix au m² du collectif
  pondéré par les réservations **4 268 → 4 896 €/m² (+15 %)**. Le paradoxe (moins de ventes, prix
  plus hauts) est l'histoire. En amont, Sitadel : logements commencés **386 797 (2017) → 210 195
  (2024), −46 %** ; individuel pur −54 % (109 595 → 50 276), collectif −47 % ; autorisations 2025
  **357 452, +15 % sur 2024** — le premier rebond. Départements (collectif, 2025/2019, ≥ 500 réservations
  en 2019) : Somme 0,14, Paris 0,18, Marne 0,21, Gard 0,23, Haute-Garonne 0,27 (7 716 en 2019) ; Loire
  1,20, Morbihan 0,99, Vendée 0,97.
- **Formes** : KPI (réservations 2025 vs 2019, prix m², stock, autorisations 2025 ↑) ; preuve : barres
  annuelles réservations avec 2023 en évidence ; nuance : prix m² pondéré en courbe partant de zéro
  (« les prix n'ont pas baissé ») et le rebond des autorisations 2025 sans mises en chantier connues ;
  exploration : carte départementale du rapport 2025/2019 et tableau `dsfr-data-list` avec la colonne
  `secret` visible.
- **Pièges** : **`LOG_COM` 2025 = `null` partout** (en date réelle, non estimé) — une page qui montre
  2025 en mises en chantier montre un trou, pas une chute ; le dire. `secret` sur `PRIX_M2` (1 596
  cellules) : le prix pondéré exclut ces départements-trimestres, l'écrire. Le fichier national brut
  compte chaque logement **trois fois** (`NATURE_PROJET` : toutes constructions + nouvelle + sur
  existant) : filtrer `Toutes constructions`. ECLN = programmes de **5 logements ou plus**, ventes
  aux **particuliers** : ni les ventes en bloc ni les maisons de constructeurs. Prix pondéré par les
  réservations, pas moyenne simple des départements (règle « moyenne de taux »).
- **Faisabilité** : voie A. ECLN dept entier (4,6 Mo, 1 s) ou filtré `TYPE_LGT=eq:Collectif` ;
  Sitadel dept filtré `TYPE_LGT=eq:Tous Logements` (1 313 lignes, 217 Ko). Pivot par année, calcul
  pondéré en `normalize`. **Effort M.**

### D3 — L'air des villes s'est assaini en vingt-cinq ans, sauf l'ozone

- **Question / lecteur** : « Respire-t-on mieux qu'en 2000 ? Où reste-t-on hors norme ? » — grand
  public, presse locale.
- **Jeux** : air national `9db8c875-10d8-49b3-ac30-1e6f358ab6b0` (concentrations),
  `a956734e-0f63-4629-821e-669f477d5f53` (% d'agglomérations en dépassement),
  `b2e6208a-43db-47ce-a908-4d6b71548248` (ozone santé), `d237b4e4-c1ce-431f-8716-4297be69f261`
  (exposition PM2,5 et objectifs) (jeu 24) ; territorial `375acfcb-c07f-4f74-8a41-09a1b6561cb1` et
  `ec071f19-2e4f-4481-8ee7-26b43ed88825` (jeu 25).
- **Histoire sondée** : NO₂ en fond urbain **29,3 µg/m³ (2000) → 12,0 (2024), −59 %** ; en proximité
  trafic 51,8 → 21,9 ; PM2,5 fond 17,8 (2010) → 8,2 ; SO₂ 12,1 → 1,3. Part des agglomérations en
  dépassement NO₂ : **20 % (2000) → 1,2 % (2024)** ; PM10 4,6 % (2015) → 1,8 % ; **ozone : 23 %
  (2000), encore 27 % en 2019, 9,9 % en 2024** — la seule série qui ne descend pas franchement
  (stations de fond en dépassement sur 3 ans glissants : 59,6 % en 2001-2003, 9,4 % en 2022-2024).
  Exceptions 2024 : Paris et Montpellier (NO₂), Fort-de-France, Cayenne, Mamoudzou (PM10). Paris en
  dépassement NO₂ **25 années sur 25**, Lyon 24. Objectif PM2,5 2030 : 10 µg/m³ (le fond urbain est
  déjà à 8,2 en moyenne — mais l'indicateur d'exposition triennal est vide après 2024 : à expliquer).
- **Formes** : KPI (NO₂ −59 %, agglos hors norme 1,2 %, ozone 9,9 %, Paris 25/25) ; preuve : petits
  multiples par polluant (même axe `y-min="0"`, même ordre), NO₂ en couleur, les autres grisés ; nuance :
  l'ozone en barres triennales, avec la canicule 2003 en évidence ; exploration : tableau des 202
  agglomérations × 4 polluants (nombre d'années de dépassement / d'années mesurées), tri.
- **Pièges** : moyennes de stations (un nombre de stations variable d'une année à l'autre) ; « en
  dépassement » ≠ « pollué » (norme réglementaire, pas recommandation OMS) ; les ultramarins PM10
  relèvent des poussières sahariennes/brumes de sable, à dire ; **ne pas colorer « auto »** : monter
  est mauvais pour tout, sauf le nombre d'années mesurées.
- **Faisabilité** : voie C, sept fichiers de 20 à 1 672 lignes, 17-224 Ko chacun. **Effort S.**

### D4 — Les intercommunalités les plus exposées aux crues continuent de construire

- **Question / lecteur** : « Construit-on encore là où l'eau peut monter ? » — élus, presse, services
  de l'État ; puis l'explorateur par EPCI.
- **Jeux** : exposition débordement `63c3cde7-ae7e-4985-9e80-44f591ed2047` et par période
  `9312e60b-09d6-42dd-98e0-27d2c8adaa60` (jeu 29) ; submersion `ef9ea429-fe81-4832-9a82-51249e830f03`
  (jeu 28) ; Sitadel EPCI `cb3c0612-e7d9-4a87-91be-cc0fb6448a4f` (jeu 5).
- **Histoire sondée** : **10,94 M de logements et 18,0 M de personnes** dans l'enveloppe approchée des
  inondations potentielles (EAIP) par débordement, dans 1 255 EPCI (Fideli 2021) ; 1,36 M de
  logements et 1,51 M de personnes pour la submersion marine (202 EPCI). **1,47 M de logements
  exposés ont été construits après 2005** (13,5 %). Croisement avec Sitadel 2019-2024 (1 255 EPCI
  communs sur 1 274) : dans les **716 EPCI où au moins 20 % du parc est en EAIP**, on a commencé
  **1 135 870 logements sur 1 772 271, soit 64,1 %** ; ≥ 30 % : 450 EPCI, 42,7 % ; Grenoble-Alpes-
  Métropole 92,2 % du parc en EAIP, 11 744 logements commencés en six ans.
- **Formes** : KPI (10,9 M, 18 M, 13,5 % construits après 2005, 64 %) ; preuve : barres des logements
  exposés par période de construction (`>2005` en évidence) ; nuance : distribution des EPCI par
  tranche d'exposition × logements commencés (barres par tranche, pas un nuage de 1 255 points) ;
  exploration : tableau EPCI (part exposée, logements commencés 2019-2024, population) avec `search`.
- **Pièges** : **erreur écologique** — la part du parc d'un EPCI en EAIP n'est pas la part des
  logements neufs construits en zone inondable ; le titre doit rester à l'échelle de l'EPCI (« les
  EPCI exposés construisent », pas « on construit en zone inondable »). L'EAIP est une **enveloppe
  maximaliste** (18 M de personnes, 27 % de la population) : le dire dès le chapô. Un EPCI est sous
  `secret` (24 cellules). Fideli 2021 vs EPCI 2024 de Sitadel : 19 EPCI sans correspondance,
  fusions probables — les compter dans « ce qu'on ne montre pas ». Périodes de construction en
  bornes textuelles (`<1919`, `>2005`) : ordonner explicitement.
- **Faisabilité** : voie A. Débordement entier (15 060 lignes, 2,4 Mo, 0,5 s) ou filtré
  `INDICATEUR_EXPOSITION=in:Logements_exposes,Part_logements_exposes` ; Sitadel EPCI filtré
  `ANNEE=in:2019,…,2024&TYPE_LGT=eq:Tous Logements` (7 534 lignes, 917 Ko). Jointure sur `EPCI_CODE`
  = `EPCI` **après** un `group-by` par EPCI côté Sitadel (règle d'unicité du côté droit, ADR-122).
  **Effort M.** L si l'on ajoute une carte EPCI (pas de fond EPCI dans DSFR Chart ; GeoJSON EPCI
  simplifié à produire, ou `dsfr-data-map` avec le référentiel `cog/spatial/geojson` de DiDo — **non
  sondé**).

### D5 — Pesticides : le kilo n'est pas le danger — la Gironde achète six fois la moyenne, surtout du soufre

- **Question / lecteur** : « Où achète-t-on le plus de pesticides, lesquels, et cela baisse-t-il ? » —
  presse, associations, agriculture ; c'est aussi la page qui apprend au lecteur à ne pas lire un
  classement en kilos.
- **Jeux** : achats départementaux `6fc4f14f-8510-48bb-82dc-9f29e3619761` (jeu 15) ; ITDD
  départemental `aa011e5d-e888-469d-8e72-a8af4f73d123` variables `saue` (SAU) et `part_agribio_surf`
  (jeu 23).
- **Histoire sondée** : **82 610 t de substances actives achetées en 2018 → 68 600 t en 2024 (−17 %)** ;
  les substances **CMR1 : 5 504 t → 68 t (−99 %)** ; glyphosate 9 343 t (2018) → 5 965 (2019) → 8 176
  (2024) ; fongicides 46 % du tonnage 2024. Rapporté à la SAU (ITDD 2023) : **2,55 kg/ha en France** ;
  Gironde 16,1, Vaucluse 13,1, Gard 10,8, Hérault 10,3, Var 9,0 — les vignobles ; Gironde 2024 : soufre
  1 833 t (utilisable en bio), fosetyl-Al 397 t, folpel 275 t (CMR2). Le paradoxe mesuré : **la part de
  surfaces bio et les kg/ha sont corrélés positivement (r = +0,71 sur 100 départements)** — parce que
  la viticulture, bio ou non, épand du soufre et du cuivre, lourds et peu toxiques.
- **Formes** : KPI (68 600 t, −17 %, CMR1 −99 %, 2,55 kg/ha) ; preuve : barres par classe de danger
  2018 vs 2024 (`series-field`), CMR1 en évidence ; nuance : les 15 départements les plus chargés en
  kg/ha avec la part « utilisable en bio » empilée (soufre/cuivre vs le reste) — c'est le graphique qui
  raconte ; exploration : tableau département (kg, kg/ha, part bio, part CMR).
- **Pièges** : **l'unité de compte est l'adresse de l'acheteur**, pas le lieu d'épandage : Hauts-de-Seine
  650 kg/ha (sièges de distributeurs, SAU quasi nulle) et « 100 % de surfaces bio » dans l'ITDD, Val-de-
  Marne 11 kg/ha — **écarter les départements à SAU < 10 000 ha et le dire**. 2018 est une année de
  **stockage** avant la hausse de la redevance 2019 (glyphosate 9 343 → 5 965) : comparer 2018 à 2024
  flatte la baisse ; proposer 2015-2017 en base. `na` sur 4 809 cellules (2024). Modalités en minuscules
  (`oui`/`non`, `uab`/`non uab`/`usages_non_renseignes`) : la casse est celle du jeu. 2013 incomplet
  (3 483 t de glyphosate). Les DROM : Réunion ×1 190 entre 2018 et 2024, effet de champ, pas
  d'usage.
- **Faisabilité** : **le cas limite du portail**. Une année = 108 803 lignes, 26 Mo en 9 colonnes
  (4,7 s) ; deux années = deux requêtes ; le glyphosate seul = 60 790 lignes, 9,1 Mo. Trois options
  (§ 2.3.2) ; Tabular **ne sert pas ce jeu**. Recommandation : preuve et nuance sur un sous-ensemble
  filtré au serveur (`DANGER_SUBSTANCE=in:CMR1,CMR2` : **non sondé**, quelques milliers de lignes
  attendues ; glyphosate ; `CODE_DEPARTEMENT_ACHETEUR=eq:33`), carte kg/ha depuis une pré-agrégation
  statique **déclarée comme limite**. **Effort L.** À faire en dernier de la vague, une fois la
  stratégie « gros jeux » arrêtée.

### D6 — La fin du fioul : quatre fois moins de fioul domestique qu'en 2005, et plus de gaz dans les maisons neuves

- **Question / lecteur** : « Comment se chauffe-t-on et roule-t-on, et qu'est-ce qui a changé ? » —
  grand public, collectivités.
- **Jeux** : produits pétroliers par département `445d1fbb-4ebd-48b0-b566-7d97f21a871e` (jeu 36) ;
  EPTB maisons construites par mode de chauffage `a903cdb0-63d8-4149-a5cd-468d83d1279f` et prix
  `d23a979d-8a05-4cc5-a434-c8e19ca9259c`, terrains `7b0b1184-f92e-4f8a-8a6a-19b4b23d5118` (jeu 31) ;
  prix ménages pétrole `daf4715a-0795-4098-bdb1-d90b6e6a568d` (jeu 1).
- **Histoire sondée** : fioul domestique **15 749 kt (2005) → 3 561 kt (2024), ÷ 4,4** ; gazole
  31 048 → 27 655 kt ; SP95-E10 0 → 6 597 kt ; E85 0 → 694 kt ; GNR 4 363 kt (depuis 2011). Paris et
  Hauts-de-Seine : 4 % du fioul de 2005 ; Finistère 66 % ; Haute-Corse ×1,44 (premier département en
  tonnes de fioul en 2024, 110 570 t : port, dépôt — à vérifier avant de titrer). Maisons neuves
  enquêtées (EPTB, PCS « ensemble ») : **chauffage au gaz 17,3 % en 2019 → 2,0 % en 2024** ; énergies
  renouvelables seules ou combinées **18,6 % → 55,5 %** ; électricité seule 33,8 % → 18,7 %. Prix du
  fioul : 7,89 €/100 kWh (janv. 2021) → 17,02 (juin 2022) → 17,00 (août 2026) ; gazole 1,30 → 2,07 →
  2,20 €/L. Prix moyen d'une maison neuve 164 088 € (2006) → 266 364 € (2024) ; terrain 227 €/m² en
  Île-de-France, 55 en Bourgogne-Franche-Comté (2024).
- **Formes** : KPI (fioul ÷ 4,4, gaz 2 % des maisons neuves, EnR 55 %, prix fioul ×2,2) ; preuve :
  barres empilées carburants 2005-2024 avec le fioul en couleur ; nuance : parts des modes de chauffage
  des maisons neuves 2010/2015/2019/2022/2024 (barres 100 %) — la RE2020 ; exploration : carte
  départementale du rapport fioul 2024/2005 et tableau.
- **Pièges** : **EPTB est une enquête** : `NB_MAISONS` compte des maisons **enquêtées** (2 296 en
  2024, 5 601 en 2019), pas construites — n'afficher que des parts, jamais le nombre ; `secret` sur
  1 924 cellules ; libellés dédoublés par une apostrophe droite/courbe (« électricité et bois
  d'appoint » × 2) et un libellé tronqué (« …combinées à un autre mod ») : `replace-fields` ou
  `normalize` avant `group-by`. Pétrole : **ventes** au lieu de livraison, pas consommation ; le
  DROM est en **m³** (jeu 37) et ne se somme pas avec les tonnes ; `SUPER_SANS_PLOMB` est une
  colonne total à ne pas additionner aux détails. Pas de ligne France dans l'EPTB (« Région fictive »
  `XX` est un résidu) : le national se calcule, pondéré par `NB_MAISONS`.
- **Faisabilité** : voie C. 1 971 lignes (738 Ko), 15 918 lignes filtrables `PCS_CODE=eq:99` (**non
  sondé**, ≈ 2 300 lignes attendues), 572 lignes de prix. **Effort S/M.**

### D7 — Un déchet sur dix vient des ménages ; sept sur dix du bâtiment

- **Question / lecteur** : « D'où viennent les déchets, où vont-ils, et le tri des ménages pèse-t-il ? » —
  grand public ; puis « et mon département ? ».
- **Jeux** : production `4ffeb0da-dec8-45c8-aab6-363738a997dc` et traitement
  `fda380ad-4bf0-4fae-bddb-6671deeb610b` (jeu 38) ; ITDD départemental `dma_qhab`,
  `taux_val_dechets` (jeu 23).
- **Histoire sondée** : **343,2 Mt de déchets produits en 2022** ; construction (NACE 41-43) 247,4 Mt =
  **72,1 %** ; ménages 31,3 Mt = **9,1 %** ; dangereux 11,4 Mt. Traitement 2022 (295,1 Mt) : recyclage
  154,2 Mt (52 %), remblayage 56,6, décharge 59,0 (20 %), valorisation énergétique 21,4, incinération
  3,4. Déchets ménagers et assimilés : 20,8 Mt. Par département (ITDD 2021) : **Landes 1 110 kg/hab,
  Côtes-d'Armor 941 ; Hauts-de-Seine 397** — le tourisme et les résidences secondaires gonflent le
  ratio par habitant ; taux de valorisation Lozère 99,9 %, Vendée 86,6 %, Martinique 22,2 %.
- **Formes** : une phrase calculée (« un sur dix ») + 3 KPI ; preuve : barres horizontales triées par
  secteur (construction en évidence) ; nuance : traitement en barres empilées 2016/2018/2020/2022
  (décharge en couleur) ; exploration : carte départementale kg/hab **avec le piège dit** et tableau.
- **Pièges** : tonnes humides sauf boues en matière sèche ; production ≠ traitement (343 vs 295 Mt :
  exports, stocks, prétraitements) ; biennal ; kg/hab rapporté à la population résidente dans un
  département touristique ; « recyclage » des déchets minéraux = réemploi de gravats. L'ITDD est de
  2021, le national de 2022 : deux millésimes sur la même page, à dater séparément.
- **Faisabilité** : voie C (216 + 216 lignes) + voie A pour deux indicateurs ITDD (2 × 101 lignes).
  **Effort S.**

### D8 — Portrait ODD d'un département

- **Question / lecteur** : « Où en est mon département sur les objectifs de développement durable, et par
  rapport à la France ? » — explorateur (famille D des `pagePatterns`) : un sélecteur, le titre qui le
  reprend, la France en référence sur chaque bloc.
- **Jeux** : ITDD départemental `aa011e5d-e888-469d-8e72-a8af4f73d123` (jeu 23), France entière
  `305ea0e3-269b-47ee-bab5-7553fec6f010` pour les références.
- **Histoire sondée** : neuf indicateurs retenus pour leur lisibilité (règle « quatre repères nommés »,
  pas un indice de synthèse) : GES par habitant 2021 (**Mayenne 18,3 t, Meuse 15,4 ; Paris 2,66, Var
  3,87**) ; part de surfaces bio 2024 (Hautes-Alpes 38,2 %, Val-d'Oise 1,6 %) ; taux de pauvreté 2021
  (Réunion 36,1 %, Seine-Saint-Denis 28,4, Vendée 9,1) ; points de recharge 2024 (Paris 3 589, Nord
  2 619, Guadeloupe et Guyane 0) ; déchets par habitant et taux de valorisation (D7) ; communes en
  catastrophe naturelle (`nb_com_catnat`, 9 sous-champs) ; artificialisation (`surf_sols_artif`, 4
  sous-champs, 2023) ; pesticides dans les eaux (`part_class_5_eau_sup_pes`, 2023).
- **Formes** : bandeau sélecteur ; 4 KPI département vs France (`lines` avec la référence lue dans le
  fichier France) ; un petit multiple par indicateur (barre du département en évidence parmi les 101,
  `selected-palette="neutral"` + `highlight-index` **positionnel** après tri : recalculer l'index) ;
  tableau des 9 indicateurs × 3 colonnes (département, France, rang).
- **Pièges** : **les mêmes lignes plusieurs fois** (`pop` sous 5 `NO_INDIC`) : filtrer `NO_INDIC`, jamais
  sommer ; sous-champs (`taux_pvt` : 7 tranches d'âge, garder `total`) ; **dernière année disponible
  variable par indicateur** (2021 à 2024) : la lire dans la donnée (`A2024` puis `A2023`…) et l'afficher ;
  Hauts-de-Seine « 100 % bio » (SAU résiduelle) ; unités hétérogènes, jamais de moyenne entre
  indicateurs ; `TYPE_VAR` `i` (indicateur) vs `c` (composante) ; format large → `dsfr-data-unpivot`
  (grammaire à vérifier).
- **Faisabilité** : voie A, un `/json?VARIABLE=in:…&columns=…` de 2 525 lignes (656 Ko, 0,4 s) pour
  neuf variables — ou une source par variable (101 lignes, 20 Ko). Filtre client par département via
  `dsfr-data-context` (pas de rechargement). **Effort M.**

### Récapitulatif de la première vague

| # | Titre-message provisoire | Jeux (id DiDo) | Chiffre sondé (2026-09-26) | Voie | Effort |
|---|---|---|---|---|---|
| D1 | Le gaz des ménages : −25 % en trois ans, prix ×2 | 33 + 1 | 136,7 → 101,8 TWh (2021→2024) ; 7,24 → 15,01 c€/kWh | A/C | M |
| D2 | Logements neufs : deux fois moins de ventes, des prix qui montent | 11 + 9 + 5 | réservations collectif 131 505 → 61 955 ; 4 268 → 4 896 €/m² ; commencés 386 797 → 210 195 | A | M |
| D3 | L'air des villes s'est assaini, sauf l'ozone | 24 + 25 | NO₂ fond 29,3 → 12,0 µg/m³ ; agglos hors norme NO₂ 20 % → 1,2 % ; O₃ 27 % en 2019 | C | S |
| D4 | Les EPCI les plus exposés aux crues continuent de construire | 29 + 28 + 5 | 10,94 M logements en EAIP ; 64,1 % des logements commencés 2019-24 dans des EPCI ≥ 20 % exposés | A | M (L avec carte) |
| D5 | Pesticides : le kilo n'est pas le danger | 15 + 23 | 82 610 → 68 600 t ; CMR1 5 504 → 68 t ; Gironde 16,1 kg/ha ; r(bio, kg/ha) = +0,71 | A (filtré) + statique | L |
| D6 | La fin du fioul | 36 + 31 + 1 | fioul 15 749 → 3 561 kt ; gaz 17 % → 2 % des maisons neuves | C | S/M |
| D7 | Un déchet sur dix vient des ménages | 38 + 23 | 343,2 Mt ; BTP 72,1 % ; ménages 9,1 % ; Landes 1 110 kg/hab | C + A | S |
| D8 | Portrait ODD d'un département | 23 | GES/hab Mayenne 18,3 t vs Paris 2,66 ; 9 indicateurs | A | M |

Test des titres seuls, à l'échelle du portail : *le gaz baisse et coûte double · le neuf se vend
deux fois moins mais pas moins cher · l'air est plus propre sauf l'ozone · on construit encore là où
l'eau monte · le kilo de pesticide n'est pas le danger · le fioul disparaît · les déchets sont ceux
du bâtiment · et votre département ?* — huit messages, un portail.

---

## 5. Deuxième vague

| Titre-message pressenti | Jeux | Chiffre sondé | Pourquoi pas tout de suite | Effort |
|---|---|---|---|---|
| Cinq ports font quatre cinquièmes du fret maritime ; le rail ne décolle pas | 13 + 8 + 22 | 2024 : 325,5 Mt ; HAROPA 25,4 %, Marseille 21,7, Dunkerque 14,1, Calais 12,4, Nantes-Saint-Nazaire 7,9 = **81,5 %** ; 2008 → 2024 : −15 % ; rail national 34,4 → 38,1 Md t-km (2019→2025) | rail : 3 801 `secret`, lignes à `TYPE_LIBELLE` vide dont le sens n'est pas établi (88,9 Md t-km, plus que la somme des types) ; fluvial : lignes total non identifiées — nomenclature à lire | M |
| Où l'on rénove : les CEE par habitant | 41 + 40 + 23 (`pop`) | 172 TWh cumac (2019), 246 (2021), 155 (2022) ; isolation des combles 201 TWhc cumulés | **75 % de lignes sous secret** au département ; s'arrête en 2022 ; clés `EPCI_2024` vs COG annuel de l'énergie (jointure **non sondée**) | M |
| Un logement sur cinq en zone d'argile forte, et l'on construit dessus | 30 (+ 5) | 16,07 M maisons classées, **3,14 M en RGA fort (19,6 %)**, 453 376 construites après 2005 | même dispositif que D4, à produire après lui | S (après D4) |
| Les réseaux de chaleur : un tiers encore au gaz | 18 | 992 réseaux en 2024, 33,5 TWh ; gaz 10,6 TWh (31,6 %), incinération 8,0, biomasse 7,9, géothermie 1,8, charbon 0,26 | 7 fichiers annuels, colonnes qui changent d'unité d'un millésime à l'autre (`PUISSANCE_*` en MWh puis MW) ; contenu CO₂ à pondérer | M |
| Le terrain à bâtir vaut quatre fois plus en Île-de-France qu'en Bourgogne | 31 | 227 vs 55 €/m² (2024) ; maison 164 → 266 k€ (2006→2024) | enquête (échantillon), `secret`, pas de ligne France | S |
| Consommer moins ou réchauffer moins : la thermosensibilité par EPCI | 34 + 23 | fichiers annuels 51 000-57 000 lignes (élec) ; `THERMOR` par EPCI | 14 fichiers, une source par année, jointure pop ITDD EPCI (31 400 lignes / 25 par EPCI, dédoublonner) | L |
| Entrepôts : l'Île-de-France et les Hauts-de-France font 40 % des surfaces | 32 (+ 4) | 2024 : IdF 690 entrepôts, 17,1 M m² ; HdF 643, 17,2 M m² ; Corse 0 | départements et EPCI en **tranches textuelles**, pas en valeurs | S |
| Portrait communal : logements, véhicules, énergie | 5 (commune) + 17 + 21 | Paris : 91 lignes de parc (0,98 s en `count`, 3,5 s en `/json`) ; `COMMUNE_CODE=eq:` fonctionne | trois jeux de 2 à 4 M lignes filtrés par commune : faisable ligne à ligne, mais 3,5 s par requête sur le parc et pas d'agrégat national possible | L |
| Le mix électrique mois par mois | 1 (`691526bb-…`) | 559 mois, nucléaire/hydro/éolien/PV en GWh | national seulement ; concurrence avec les pages d'éCO2mix existantes ailleurs | S |

---

## 6. Jeux écartés ou fusionnés, et pourquoi

| Jeu | Raison |
|---|---|
| 2 Locaux non résidentiels mensuels (87,3 M lignes), 3 Logements mensuels communaux (29,0 M) | volume sans agrégat serveur ; Tabular ne les sert pas ; l'annuel départemental/EPCI (5) porte l'histoire |
| 6 Liste des permis (3,0 M) | un permis par ligne ; pas de question éditoriale que 5 ne couvre déjà |
| 14 Phytos code postal (14,6 M), 16 Phytos commune (**0 datafile**) | 14 : volume ; 16 : jeu vide au sens de LIM-005 (statut « vide » au registre) |
| 17 Parc, 26 Immatriculations | commune seulement, 2,1 et 3,5 M lignes, larges par année, `IMMAT_*` typés **chaîne** ; pas de clé département ; `CARBURANT=eq:Electrique` = 75 474 lignes ; hors portrait communal (V2), aucune agrégation possible sans charger tout |
| 19, 20, 21 Énergie locale 2008-2017 / points d'intérêt / IRIS | ancien, ou maille infra-communale de plusieurs millions de lignes |
| 27 RPLS détaillé (5,4 M, un logement par ligne) | pas d'agrégat ; Tabular ne le sert pas ; le SDES publie les agrégats ailleurs |
| 39 GES format AEA | série arrêtée à 2020 ; l'ITDD `ges_emission_hab` (2021) sert D8 |
| 10, 12 ECLN régional et zonage ABC ; 35 pétrole mensuel national ; 37 pétrole DROM (**m³**) | fusionnés dans D2 et D6 ; le DROM ne se somme pas avec la métropole (unité) |
| 4 Locaux non résidentiels annuels | pas d'histoire trouvée au sondage (non exploré au-delà des métadonnées) ; réutilisable pour les entrepôts |

---

## 7. Pièges transverses à consigner dès la première page (candidats au registre)

1. **`"secret"` et `"na"` dans des colonnes numériques** : exclus des sommes par `toNumber` strict
   (vérifié dans le source), **sans avertissement** ; à compter et à afficher par page. Rendu par
   `dsfr-data-chart` **à vérifier au navigateur**.
2. **`null` ≠ 0, et un `null` qui veut dire « pas encore »** (`LOG_COM` 2025).
3. **Unité de compte ≠ unité de lecture** : achats à l'adresse de l'acheteur (phytos), ventes et non
   consommation (pétrole), enquête et non parc (EPTB), points de livraison et non ménages (énergie),
   enveloppe maximaliste et non zone réglementaire (EAIP).
4. **Lignes répétées** : population ITDD × 5 indicateurs ; ECLN national × 3 natures de projet ;
   énergie par NAF **et** agrégée dans le même fichier (`CODE_SECTEUR_NAF2_CODE = ''`).
5. **Millésime et fraîcheur par indicateur** : lire l'année dans la donnée, ne pas l'écrire.
6. **Casse et apostrophes des modalités** (`oui`/`non`, « d'appoint » / « d appoint ») : normaliser
   avant `group-by`.
7. **Ruptures de champ** déguisées en tendances (industrie gaz 69,7 → 10,0 TWh entre 2019 et 2021 ;
   Réunion phytos ×1 190) : lire la note méthodologique avant de titrer.
8. **Climat non corrigé** dans les données locales d'énergie (`THERMOR` disponible) vs corrigé dans la
   synthèse nationale (`_COR2`).
9. **Convention `paginate` du mode URL** incompatible avec DiDo (`pageSize` énuméré, méta à la racine) :
   constat `amelioration` possible côté bibliothèque si une page en a besoin.

---

## 8. Prochaines étapes proposées

1. Rejouer § 2.4 (Tabular ↔ DiDo) dès que `*.data.gouv.fr` répond ; consigner le typage des colonnes
   à `secret`.
2. Trancher § 2.3 (adaptateur non / stratégie gros jeux / affichage du secret).
3. Produire D3 puis D7 (petits fichiers, voie C) pour valider le motif « source URL + query client »
   au navigateur, y compris le rendu d'une cellule `secret` dans un graphique.
4. Enchaîner D1, D2, D6, D8, D4 ; D5 en dernier.
5. Créer `docs/portail-developpement-durable/<page>.md` par page (question, message, ce que l'usager
   obtient, hors objet) avant chaque HTML, comme pour les trois autres portails ; ajouter le portail à
   `scripts/build-registre.mjs` avec un statut « créé » distinct de « reproduit ».
