# Rapport à dsfr-data : les 26 demandes du banc, revérifiées le 2026-09-27

Ce rapport répond à open-data-viz#95. Il s'adresse au mainteneur de `dsfr-data`, qui doit analyser et trancher chaque demande.
Il est tiré de `public/data/retours.json`, qui reste la source de vérité : chaque constat y porte sa preuve complète dans le champ `verifie`.
L'export prêt à déposer est `export/issues-dsfr-data.md`, régénéré par `node scripts/build-retours.mjs`.

| | |
|---|---|
| **Date** | 2026-09-27 |
| **Version de référence** | `dsfr-data@0.42.0`, dernière version publiée sur npm (`npm view dsfr-data version`). C'est celle que charge le banc. |
| **État du dépôt** | `origin/main` 23b1b9a = v0.42.0 + 7 commits. `git diff v0.42.0 origin/main -- packages/core` est **vide**. Les commits touchent seulement `packages/app-ui` et `packages/shared/src/ui` (retours d'usage de l'assistant). La PR de version #1154 (0.42.1) ne contient qu'eux. |
| **DSFR Chart** | 2.1.1 (`node_modules/@gouvfr/dsfr-chart` de dsfr-data) |
| **Périmètre** | Les 27 entrées au statut `a-deposer` le 2026-09-27 : les 24 d'open-data-viz#95, plus PG-083, BUG-039 et AM-113, ajoutées par les rejeux de #70 et #71. S'y ajoutent les deux entrées au statut `depose` (PG-029, PG-030), dont les issues ont été fermées chez dsfr-data. |

---

## 1. Résumé exécutif

**Toutes les demandes sont à trancher.** Parmi les 27 entrées, une était un doublon : AM-089 a été réunie à BUG-029. Il reste **26 demandes**, et chacune a été revérifiée sur `origin/main` :

| Verdict ADR-120 | Nombre |
|---|---|
| Capacité native (faux problème) | **0** |
| Native, mais postérieure à la 0.42.0 publiée | **0**. Aucune version n'a été publiée après la 0.42.0. |
| Livrée sur `origin/main`, pas encore publiée | **0**. Aucun commit ne touche `packages/core` depuis v0.42.0. |
| Absente du source : vraie demande | **26** |

| Priorité | Nombre | Constats |
|---|---|---|
| **P1** : chiffre faux ou perte silencieuse | **11** | BUG-026, BUG-028, BUG-029, BUG-023, BUG-032, PG-083, PG-033, PG-034, BUG-038, BUG-037, BUG-031 |
| **P2** : contournement coûteux | **10** | BUG-027, BUG-036, PG-032, BUG-033, BUG-034, BUG-035, BUG-039, AM-103, AM-107, AM-087 |
| **P3** : confort | **5** | AM-088, AM-090, AM-102, AM-110, AM-113 |

**Destinataires.** Les 26 demandes vont toutes à `dsfr-data`, parce que c'est le seul endroit où le correctif peut vivre. Quatre ont en plus une part ailleurs :
- **data.gouv.fr (API Tabular)** : PG-033 et PG-034. La cause est dans l'API, et elle est **toujours présente à l'API le 2026-09-27**.
- **DSFR Chart** : PG-083, pour le libellé « en France », et BUG-029, pour le rendu de `null` dans l'infobulle, qui n'est pas vérifié.

La section 5 recense aussi les 9 constats DSFR Chart déjà au statut `acte`, qu'il reste à déposer chez `GouvernementFR/dsfr-chart`.

**Les 5 décisions à prendre d'abord.** Chacune règle une famille entière de constats :

1. **« Une absence n'est pas un zéro » (#301) dans la query et le graphique** : BUG-028 et BUG-029, soit 10 pages. Faut-il rendre `null` pour `avg`, `min`, `max` **et `sum`** d'un groupe sans valeur, et pour toute cellule absente de `series-field` et du format large ?
2. **La délégation qui traverse la chaîne** : BUG-026, BUG-036 et BUG-027. Faut-il refuser toute délégation dans deux cas : quand la source visée porte déjà son propre `group-by`, et quand un élément intermédiaire (query comprise) change ou peut changer le schéma ?
3. **Le parseur strict qui accepte un préfixe** : BUG-023 et BUG-032. Faut-il que `toNumber(v, true)` refuse toute chaîne qui n'est pas entièrement numérique, et que `min`/`max` de la query passent par `computeExtremum`, comme le KPI ?
4. **Le résumé de carte qui écarte des lignes sans le dire à l'écran** : PG-083, 3 pages vérifiées et 31 qui portent un `map-summary`. Faut-il afficher le nombre de lignes écartées sous la carte ?
5. **L'API Tabular qui perd des lignes** : PG-033 et PG-034. Faut-il cesser de déléguer à Tabular le tri d'un chargement paginé, ainsi qu'un `in` dont une valeur porte une parenthèse ?

**Statuts changés par la revérification :**
- **AM-089** passe à `retire` : c'est un doublon de BUG-029, qui reçoit sa page et sa variante de demande.
- **PG-029** et **PG-030** passent de `depose` à `corrige`. Chacun a été rejoué contre la 0.42.0 publiée, et chacun garde un champ « reste vrai » (voir section 6).
- **Priorités.** Huit priorités ont été réalignées sur la grille ci-dessus : six ont monté vers P1 et deux sont descendues en P2 (BUG-027, BUG-036). Chaque changement est motivé dans le champ `cadrage.impact`.
- **Blocs `cadrage`.** BUG-031 et BUG-032 en ont reçu un. Sans ce bloc, `build-retours.mjs` les omettait de l'export sans le signaler.

---

## 2. Méthode

1. **Relevé.** Toutes les entrées `a-deposer` et `depose` de `public/data/retours.json` ont été relevées.
2. **Écart entre versions.** `git fetch` sur `~/Developer/GitHub/dsfr-data`, puis `git log v0.42.0..origin/main` et `git diff --stat v0.42.0 origin/main -- packages/`. Résultat : aucun changement dans `packages/core`, ni dans les utilitaires partagés concernés (`number-parser`, `compute`, `pivot`). Le CHANGELOG de `packages/core` s'arrête à la 0.42.0. La PR de version ouverte (#1154) ne prépare qu'une 0.42.1 sans rien de `core`.
3. **Issues.** `gh issue list -R bmatge/dsfr-data` (ouvertes, et recherche par mot-clé dans les fermées) : aucune issue ne couvre l'une des 26 demandes. Deux antécédents sont cités là où ils éclairent le correctif : #855 et #765 pour BUG-026, #1045 et #1019 pour PG-033.
4. **Source.** Chaque constat a été relu sur `origin/main` au fichier et à la ligne. Les numéros de ligne cités ici sont ceux d'`origin/main` 23b1b9a.
5. **Rejeux du jour.** Ils sont datés dans le champ `verifie` de chaque entrée.
   - **Unitaire** : fonctions pures du source `origin/main`, exécutées par `vite-node` (`toNumber`, `readUrlSelections`/`writeUrlSelections`, `countFacetValues`, `compileCompute`), plus l'étalement `Math.min(...)` sous Node 24. Concerne BUG-023, BUG-031, BUG-032, BUG-037, BUG-038, AM-090, AM-103 et AM-107.
   - **API par le tunnel**, une requête à la fois : PG-033 (19 requêtes), PG-034 (3) et AM-087 (1).
   - **Navigateur contre le paquet publié 0.42.0** (`npm pack`, `REJEU_BUNDLE`) : PG-029 et PG-030.
   - PG-083, BUG-039 et AM-113 ont été rejoués au navigateur le même jour, contre la 0.42.0 et contre un build d'`origin/main` (commit 2365f06 de ce dépôt).
6. **Ce qui n'a pas été rejoué aujourd'hui au navigateur** : les autres constats. Leur preuve au navigateur date de 2026-09-20 à 2026-09-27 et porte sur la 0.33.0 ou la 0.42.0 (voir chaque fiche). Comme `packages/core` n'a pas bougé depuis la 0.42.0, une preuve obtenue en 0.42.0 vaut pour `origin/main`. Une preuve plus ancienne (0.33.0 : PG-032, AM-089, et BUG-023 en partie) est complétée par la relecture du source actuel.

---

## 3. Les 26 demandes

Chaque fiche donne le constat, la preuve, les pages touchées, l'impact, une proposition de correction, la priorité et la décision attendue. La preuve est reprise du champ `verifie` ; sa version complète est au registre.

### 3.1 P1 : chiffre faux ou perte silencieuse

#### BUG-026 — Une source groupée perd son `group_by` quand un `normalize` s'intercale devant une `query group-by` seule lectrice

- **Constat.** Voici la chaîne : source `select="procedure, count(*) as n" group-by="procedure"`, puis `normalize replace-fields`, puis `query group-by="procedure" aggregate="n:sum:n"`. La requête part **sans `group_by`**. Le KPI affiche 96 667 200 au lieu de 966 672 : 5 groupes au lieu de 19.
- **Preuve.** Page minimale, 0.42.0, 2026-09-26. La requête relevée au réseau est `exports/json?select=procedure, count(*) as n&…&order_by=n DESC&limit=101`. Sans `normalize`, elle porte bien `group_by=procedure` et le KPI affiche 966 672. Le 2026-09-27, `_delegationTarget` a été relu (`dsfr-data-query.ts` l. 786-800) : il ne teste que `transformsSchema()`.
- **Pages.** decp-augmente.
- **Impact.** Un chiffre faux de deux ordres de grandeur, signalé par un simple avertissement console. C'est le geste qu'imposent les doublons de libellés (LIM-003).
- **Correction proposée.** Dans `dsfr-data-query.ts` `_delegationTarget()`, ne pas déléguer quand la source visée porte déjà son propre `group-by` ou un agrégat dans `select`, comme `_delegateOrderBy()` refuse déjà une source qui porte son `order-by` (`sourceEl.orderBy`). Antécédents : le correctif de #855 a fait traverser `normalize` à la délégation, et #765 lui avait interdit de réécrire la source pour ses autres lecteurs. Le défaut naît de la rencontre des deux.
- **Priorité.** P1, effort S.
- **Décision.** Une source qui porte déjà son `group-by` doit-elle être exclue de toute délégation de `group-by` venant de l'aval ? (oui / non)

#### BUG-028 — `avg`, `sum`, `min` et `max` rendent 0 pour un groupe sans aucune valeur numérique

- **Constat.** Un groupe entièrement `null` sort à 0. On lit alors « voie professionnelle 0,0 », l'AEFE est classée avec `eleves: 0`, et la page affiche « 0 logement commencé en 2025 ».
- **Preuve.** Page minimale, 0.42.0, 2026-09-26 : le groupe `null, null` donne `m: 0, s: 0, mi: 0`, le groupe mixte donne la bonne moyenne. Source relue le 2026-09-27 : `dsfr-data-query.ts` `_computeAggregate` l. 1833-1849 réduit `sum` depuis 0, et `avg`/`min`/`max` rendent `0` quand `values.length === 0`.
- **Pages.** edu/dataviz-ips-lycees, edu/capytale-usages, developpement-durable/logements-neufs.
- **Impact.** Un 0 plausible entre dans les classements, les moyennes nationales et les totaux. C'est contraire à #301, que `pivot` et `compute` appliquent déjà.
- **Correction proposée.** `_computeAggregate()` rend `number | null`, et `null` quand `values.length === 0` pour `avg`, `min`, `max`, et pour `sum` si la décision le retient. `count` reste inchangé.
- **Priorité.** P1, effort S.
- **Décision.** La `sum` d'un groupe sans aucune valeur numérique doit-elle rendre `null`, comme `avg`, `min` et `max` ? (oui : cohérent avec #301 / non : documenter l'exception)

#### BUG-029 (AM-089 réunie) — `dsfr-data-chart` dessine à 0 une cellule sans observation, en format long comme en format large

- **Constat.** En format long, `_processTidyData` remplit les cellules absentes par `fill(0)`. En format large, `toNumber` non strict convertit `null` en 0. Une série qui s'arrête devient une chute à zéro, et l'infobulle affiche « 0 » pour une série absente.
- **Preuve.** Attributs `y` relevés au DOM en 0.42.0 le 2026-09-26 : GAR `y=[[12.7,11.6,10.9,0,0,…],…]` ; livre `y=[0,0,0,0,0,0,0,0,0,2,3,…]` ; Portrait ODD. Pour AM-089 (0.33.0) : `y='[[409,2321,0,0,0,0],[0,0,8618,…]]'`. Source relue le 2026-09-27 : `dsfr-data-chart.ts` l. 650 et 674 (`fill(0)`), l. 728 (`toNumber` sans `strict`). Côté DSFR Chart 2.1.1, `LineChart` passe `y` tel quel à Chart.js (`data: e`), qui interrompt une courbe sur `null`. C'est une lecture du dist, pas un rejeu au navigateur.
- **Pages.** edu/gar-ressources-numeriques, tourisme-et-handicap, edu/capytale-usages, developpement-durable/logements-neufs, developpement-durable/qualite-air, developpement-durable/portrait-odd, culture/livre-trente-ans, impot-sur-le-revenu (8).
- **Impact.** Des événements fabriqués (effondrements, naissances à zéro), sans signal. Les deux contournements naturels (pré-pivoter, passer en `value-fields`) redessinent aussi le zéro.
- **Correction proposée.** Dans `dsfr-data-chart.ts`, `new Array(labels.length).fill(null)` (l. 674) et `toNumber(…, true)` (l. 728), avec un type `y` en `(number | null)[]`, comme les valeurs de carte (l. 833). Vérifier ensuite l'infobulle de DSFR Chart sur `null` ; si elle affiche « null » ou « NaN », remonter chez `GouvernementFR/dsfr-chart`. Variante d'AM-089 : un attribut `missing="gap|zero"`, `gap` par défaut.
- **Priorité.** P1 (P2 avant revue), effort S.
- **Décision.** Faut-il passer le remplissage à `null` par défaut, sans attribut, en acceptant qu'une barre absente disparaisse au lieu de valoir 0 ? (oui / non : attribut `missing` opt-in)

#### BUG-023 et BUG-032 — `min`/`max` de `dsfr-data-query` lisent une date ou un mois comme un nombre (même racine)

- **Constat.** `aggregate="d:max"` rend 2026 pour `2026-09-25`, alors que `dsfr-data-kpi value="d:max"` rend 25/09/2026. Pour un mois, `2024-09` devient 2024. Un chapô affiche « Depuis le 01/01/1970 ». La cause commune : le mode strict de `toNumber` se termine par `parseFloat(cleaned)` et accepte tout préfixe numérique.
- **Preuve.** Page minimale 0.33.0 (2026-09-26) et pages en 0.42.0 : passe-ton-hack, entrepreneurs, TNE « 2024 à 2025 ». **Rejeu unitaire du source `origin/main`, 2026-09-27** : `toNumber('2026-09-25', true)` = 2026, `toNumber('2024-09', true)` = 2024, `toNumber('75A', true)` = 75, `toNumber('1922-1930', true)` = 1922, alors que `looksLikeNumber('2026-09-25')` = false.
- **Pages.** aides-de-minimis, edu/passe-ton-hack-dabord, culture/entrepreneurs-spectacles, edu/tne-dashboard, culture/architecture-contemporaine.
- **Impact.** Des dates fausses et plausibles. La même expression rend deux résultats selon le composant. `databox-date-field` (AM-021) est inutilisable sur un graphique groupé.
- **Correction proposée.**
  1. `packages/shared/src/utils/number-parser.ts` : en mode strict, rendre `null` si la chaîne nettoyée ne correspond pas entièrement à un nombre, par exemple en réutilisant `looksLikeNumber`.
  2. `dsfr-data-query.ts` `_computeAggregate()` : pour `min` et `max`, déléguer à `computeExtremum` (`utils/aggregations.ts` l. 600-616), qui a une branche ISO.
  3. `normalize numeric` : garder un mode « préfixe » **explicite**. culture/architecture-contemporaine en dépend (« 1922-1930 » → 1922, 1 794 édifices datés).
- **Priorité.** P1 (BUG-023 était P2), effort S.
- **Décision.** Le mode strict de `toNumber` doit-il refuser une chaîne partiellement numérique, au prix d'un changement de comportement de `normalize numeric`, qui deviendrait opt-in pour la lecture du préfixe ? (oui / non)

#### PG-083 — Le résumé de carte (`map-summary`) ne porte que sur les lignes dessinées

- **Constat.** `map-summary="sum"` (comme `avg` et `weighted`) écarte en silence les lignes hors découpage : COM 975-988, code vide, entité hors académies. Le chiffre sous le titre « …, en France » est plausible et faux. Seul un `console.warn` compte les lignes ignorées, et il ne dit pas que le résumé les ignore aussi.
- **Preuve.** Rejoué le 2026-09-27 (`f70-map-summary.html`) contre la 0.42.0 et contre `origin/main` construit : 201 lignes reçues, « Nombre, en France 165 », `getSkippedCount()` = 5. C'est le comportement documenté dans le JSDoc.
- **Pages.** edu/educajou-ecolemap (62 485 affichés pour 63 186), edu/offre-formation-langues, edu/fei-chiffres-cles. 31 pages du banc portent un `map-summary`, et **aucune n'a été contrôlée** pour ses lignes hors découpage.
- **Impact.** Un total national faux, affiché là où il est lu.
- **Correction proposée.** Dans `dsfr-data-chart.ts`, `_processMapData` compte déjà les lignes écartées : `_computeMapSummary()` (l. 862) peut les retourner avec la valeur écartée, et la carte peut les afficher sous le résumé (« hors 5 lignes non cartographiées, 36 »). Autre voie : un mode `map-summary-scope="received"`. Le libellé « en France » est fixé par DSFR Chart : le rendre configurable relève de `GouvernementFR/dsfr-chart`.
- **Priorité.** P1 (P2 avant revue), effort S.
- **Décision.** La carte doit-elle afficher à l'écran, sans attribut, la part que son résumé écarte ? (oui / non : avertissement console enrichi seulement)

#### PG-033 — API Tabular : tri serveur et pagination perdent des lignes en silence

- **Constat.** Un tri sur un champ non unique, paginé par offset, rend des doublons et des absents. Le compte total reste juste, ce qui rend la perte invisible.
- **Preuve.** Page, 2026-09-21 : 180 lignes dont 177 distinctes, courbe à zéro en 2018. **Rejeu à l'API le 2026-09-27** : `nombre__sort=desc&page_size=50`, 101 lignes, 99 distinctes. Toujours vrai chez data.gouv.fr. Deux faits nouveaux :
  - **L'API n'applique qu'une clé de tri.** Avec `&__id__sort=asc` en plus, la perte est la même, et on relève 34 inversions d'`__id` entre valeurs égales. La clé de départage qu'envisageait la demande est donc impossible par la requête.
  - **À `page_size=200`**, taille de page de la bibliothèque depuis #1019, 1 818 lignes sur 10 pages sont toutes distinctes : **non reproduit**. Les deux cas de la page tiennent désormais en une page. Le risque reste structurel au-delà de 200 lignes.
- **Pages.** demo/delinquance-sans-total.
- **Impact.** Des lignes manquantes sans aucun signal. L'exposition est réduite depuis #1019, mais on ne peut pas la borner.
- **Correction proposée.** Dans `tabular-adapter.ts` `fetchAll()` (l. 663-671), dès que plus d'une page est attendue, basculer toutes les parties du tri en `local` et passer par `_fetchAllSortedLocally()`, qui existe depuis #1045. `buildUrl()` (l. 1090-1093) n'émet alors plus `__sort`. Le tri serveur reste pour une requête d'une seule page.
- **Destinataires.** `dsfr-data`, ainsi que **data.gouv.fr** (pagination par offset sur un tri non total, clé de tri unique).
- **Priorité.** P1, effort S.
- **Décision.** Faut-il cesser de déléguer à Tabular le tri de tout chargement paginé, au prix d'un tri côté navigateur sur les lignes chargées ? (oui / non : avertissement seulement)

#### PG-034 — API Tabular : `__in` écarte en silence toute valeur qui contient une parenthèse

- **Constat.** `where="champ:in:a|b"` part en `champ__in=a,b`. Une valeur à parenthèse est ignorée, avec HTTP 200. `__exact` accepte pourtant la même valeur.
- **Preuve.** **Rejoué à l'API le 2026-09-27** : `__exact=Usage de stupéfiants (AFD)` → 101 ; `__in=` la même valeur → 0 ; `__in=Homicides,Usage de stupéfiants (AFD)` → 101 au lieu de 202. Source relue : `tabular-adapter.ts` `_applyColonFilters` l. 1193-1200 joint la liste par `,`, sans garde. `supportsServerWhere` (l. 1253) ne refuse que les clauses multi-champs, alors que le même fichier sait qu'une parenthèse casse le parseur de `or=(…)` (l. 1217-1240).
- **Pages.** demo/delinquance-sans-total.
- **Impact.** Des séries disparaissent sans erreur. Les libellés à parenthèse sont banals dans les nomenclatures publiques.
- **Correction proposée.** `supportsServerWhere()` rend `false` quand une valeur de `in` ou `notin` contient `(`, `)` ou `,`. La query filtre alors côté client. Pour un `where` posé directement sur la source, qui n'a pas d'aval, émettre un avertissement unique depuis `_applyColonFilters()`.
- **Destinataires.** `dsfr-data`, ainsi que **data.gouv.fr** (parseur de liste de l'API Tabular).
- **Priorité.** P1 (P2 avant revue), effort S.
- **Décision.** Faut-il refuser de déléguer un `in`/`notin` dont une valeur porte une parenthèse ou une virgule ? (oui / non)

#### BUG-038 — `min`/`max` sur plus d'environ 125 000 valeurs : `Math.min(...values)` dépasse la pile

- **Constat.** V8 lève une `RangeError` entre 120 000 et 125 000 arguments. La query échoue, et le `repeat` en aval garde l'ancien résultat sans rien afficher.
- **Preuve.** Page minimale 0.42.0 (2026-09-27) : 100 000 lignes passent, 200 000 échouent. **Rejeu Node 24 le 2026-09-27** : 120 000 passe, 125 000 lève l'erreur.
- **Pages.** culture/sibil-lieux (204 628 lignes).
- **Impact.** Un chiffre périmé reste affiché, en silence. `fetch-mode="export"` rend ces volumes courants.
- **Correction proposée.** Remplacer l'étalement par une boucle aux endroits suivants, relevés sur `origin/main` : `dsfr-data-query.ts` l. 1847-1849, `utils/aggregations.ts` l. 616, `dsfr-data-map-layer.ts` l. 1126-1127 et `packages/shared/src/utils/pivot.ts` l. 189. Ajouter une règle de lint ou un test contre `Math.(min|max)(...` sur un tableau de données.
- **Priorité.** P1 (P2 avant revue), effort XS.
- **Décision.** Faut-il corriger les quatre occurrences dans le même correctif, avec un garde-fou statique ? (oui / non)

#### BUG-037 — Un élément répété dans une cellule tableau compte deux fois dans une facette

- **Constat.** Les lignes `["Patrimoine","Patrimoine"]` et `["Patrimoine"]` donnent « Patrimoine 3 », alors que la sélection rend 2 lignes.
- **Preuve.** Page minimale 0.42.0 (2026-09-27). **Rejeu unitaire du source le 2026-09-27** : `countFacetValues` → `Patrimoine: 3`.
- **Pages.** culture/lieux-culturels-ouverts (2 851 lignes à tableaux collés, PG-073).
- **Impact.** Le compteur promet plus que la sélection ne donne.
- **Correction proposée.** `facets/facets-client.ts` `facetValuesOf()` (l. 37-43) : `[...new Set(…)]`.
- **Priorité.** P1 (P3 avant revue ; c'est un compteur faux en silence), effort XS.
- **Décision.** Une ligne doit-elle compter une seule fois par valeur distincte dans une facette ? (oui / non)

#### BUG-031 — Une valeur de facette qui contient une virgule ne survit pas au rechargement de l'URL

- **Constat.** « 1,5 à 2 parcours » s'écrit bien dans l'URL, mais se relit comme deux valeurs, « 1 » et « 5 à 2 parcours ». Résultat : zéro établissement et deux cases cochées.
- **Preuve.** Navigateur, 0.42.0, 2026-09-26. **Rejeu unitaire du source le 2026-09-27** : `writeUrlSelections` écrit `?intensite=1%2C5+%C3%A0+2+parcours`, puis `readUrlSelections` rend `["1", "5 à 2 parcours"]` (`facets/facets-url.ts` l. 47 et 93).
- **Pages.** edu/carto-pix-fiche-etablissement.
- **Impact.** Un lien profond partagé rend zéro ligne sans erreur.
- **Correction proposée.** `writeUrlSelections()` émet un paramètre par valeur (`params.append`), et `readUrlSelections()` ne découpe plus sur `,` quand le paramètre est répété. Les anciennes URL à virgule unique restent lisibles.
- **Priorité.** P1 (nouveau cadrage), effort S.
- **Décision.** Faut-il répéter le paramètre d'URL (`?f=a&f=b`) plutôt que joindre par virgule, en gardant la lecture de l'ancien format ? (oui / non : échapper la virgule)

### 3.2 P2 : contournement coûteux

#### BUG-027 — Un `where` de query sur un alias d'agrégat est délégué au portail (HTTP 400)

- **Constat.** `where="n:gte:40"`, seule lectrice d'une source ODS groupée, ajoute `AND n >= 40` à l'export, et le portail répond 400. L'export est alors abandonné pour tout le jeu.
- **Preuve.** Rejoué le 2026-09-27 (`f71-where-alias.html`) contre la 0.42.0 et `origin/main` : 400 en export puis en `/records`. **Le KPI affiche l'erreur**, donc l'échec n'est pas silencieux. L'extension de l'échec à la source voisine n'est pas reproduite sur page minimale. Un alias de champ de groupement répond 200. Source : `_delegateWhereOnly` l. 934-950 ; `opendatasoft-adapter.ts` l. 923-928 (tout 4xx hors 429 condamne l'export du **jeu** : `_exportUnavailable`, clé `_datasetKey`).
- **Pages.** edu/dataviz-ips-ecoles.
- **Impact.** Une page tombe dès qu'on filtre un agrégat, geste qu'impose toute moyenne honnête. La cause est lisible dans le message du portail.
- **Correction proposée.** Dans `_delegateWhereOnly()`, ne déléguer que les champs de la clause qui sont des colonnes brutes ou des champs de groupement de la source, avec le même garde que celui posé pour `order-by` (#1045). Dans l'adaptateur ODS, ne pas mémoriser l'indisponibilité de l'export sur un 400 dû à la clause (message ODSQL). Ne la mémoriser que sur un 404, ou la mémoriser par URL.
- **Priorité.** P2 (P1 avant revue ; l'erreur est affichée et l'extension n'est pas reproduite), effort S.
- **Décision.** Un 400 de l'export doit-il cesser de condamner l'export pour tout le jeu ? (oui / non)

#### BUG-036 — `normalize(rename) → query → normalize(valeurs) → query` : délégation sous des noms renommés

- **Constat.** La dernière query est jugée délégable, parce que `transformsSchema()` du second `normalize` s'arrête sur une `dsfr-data-query` qui ne l'implémente pas. Tabular reçoit alors `?d__groupby`, et toute la source tombe en « Failed to fetch ».
- **Preuve.** Page minimale, 0.42.0 du CDN, le 2026-09-27. Source relue : `dsfr-data-normalize.ts` l. 316-326 ; `transformsSchema` n'existe que dans normalize, pivot et unpivot ; `dsfr-data-query.ts` l. 798 la consulte sans l'implémenter.
- **Pages.** culture/architecture-contemporaine.
- **Impact.** Tous les blocs d'une source se vident, et l'erreur affichée (CORS) ne désigne pas la cause.
- **Correction proposée.** Ajouter `transformsSchema()` à `dsfr-data-query` : `true` si la query regroupe, agrège, éclate ou calcule ; sinon, la réponse de sa propre source.
- **Priorité.** P2 (P1 avant revue ; l'échec est visible), effort S.
- **Décision.** `dsfr-data-query` doit-elle implémenter `transformsSchema()` pour que la remontée traverse toute la chaîne ? (oui / non)

#### PG-032 — `dsfr-data-a11y` n'accepte pas la grammaire `champ:Libellé` de son graphique apparié

- **Constat.** Recopier `value-field="v:Libellé"` du graphique vide les cellules du tableau équivalent, sans aucun message. La forme nue laisse des en-têtes techniques aux lecteurs d'écran.
- **Preuve.** Navigateur, 0.33.0, 2026-09-20 (`am082`, cas 4). Pages en 0.33.0 et 0.42.0 le 2026-09-26. Source relue : `dsfr-data-a11y.ts` l. 68-76, JSDoc « séparées par des virgules », sans appel à `parseAliasedColumn`.
- **Pages.** sports/portrait-federation, aides-de-minimis, barometre-france-num, developpement-durable/fret-ports. Contournées par `rename`.
- **Impact.** Un tableau équivalent vide ne se voit dans aucune recette qui compte des lignes. C'est l'avantage d'accessibilité de la bibliothèque qui tombe.
- **Correction proposée.** Parser `label-field` et `value-field` par `parseAliasedColumn`, comme le fait `dsfr-data-chart`, puis avertir quand une colonne est introuvable.
- **Priorité.** P2, effort S.
- **Décision.** `dsfr-data-a11y` doit-il accepter la grammaire `champ:Libellé` ? (oui / non : avertissement seulement)

#### BUG-033 — `color-map` sur `type="line"` ne recolore pas les points

- **Constat.** Le trait et la légende suivent `color-map`, mais les points gardent la palette par défaut.
- **Preuve.** Captures et pixels comptés, 0.42.0, 2026-09-26 et 27. `git grep pointBackgroundColor packages/core/src` ne rend rien. DSFR Chart 2.1.1 pose lui-même `pointBackgroundColor` (`dist/LineChart/LineChart.js`). C'est la recoloration de `utils/color-map.ts`, qui passe après lui, qui ne reprend pas ces propriétés : la règle 4 désigne bien `dsfr-data`.
- **Pages.** developpement-durable/qualite-air, culture/entrepreneurs-spectacles, culture/livre-trente-ans, culture/sibil-lieux.
- **Impact.** Le point d'une série prend la couleur d'une autre. C'est la quatrième surface de la famille BUG-016 / BUG-022.
- **Correction proposée.** `utils/color-map.ts` `applyColorMap` (l. 90-112) : poser `pointBackgroundColor`, `pointBorderColor`, `pointHoverBackgroundColor` et `pointHoverBorderColor`.
- **Priorité.** P2, effort S.
- **Décision.** Faut-il inclure ce correctif dans un test de pixels commun aux quatre surfaces de `color-map` ? (oui / non)

#### BUG-034 — Un encart de carte clone la couche entière

- **Constat.** Chaque encart dessine tous les points (7 250 cercles × 6 cartes), parfois en double, et garde les anciens après un filtre. Un filtre peut geler la page jusqu'à 7 s.
- **Preuve.** Comptage au DOM et chronométrage, 0.42.0, 2026-09-26. Source : `dsfr-data-map-inset.ts` l. 242, `layer.cloneNode(false)` sans filtre d'emprise. Le doublement n'a pas été rejoué à la consignation.
- **Pages.** culture/festivals, culture/bibliotheques.
- **Impact.** Le coût est multiplié par le nombre d'encarts, et les points sont périmés.
- **Correction proposée.** Filtrer les données de la couche clonée à l'emprise de l'encart, et remplacer ses entités à chaque émission au lieu de les ajouter.
- **Priorité.** P2, effort M.
- **Décision.** Faut-il que l'encart reçoive les données filtrées par son emprise plutôt qu'un clone de la couche ? (oui / non)

#### BUG-035 — La vue tableau de la DataBox ne montre que `label-field` et `value-field`

- **Constat.** Les séries de `value-fields` sont absentes du tableau, et celui-ci est tronqué à 100 lignes sans le dire.
- **Preuve.** 0.42.0, 2026-09-26 (fret-ports). Source : `dsfr-data-chart.ts` `_injectDataboxTable` l. 2035-2060, avec `rows = this._data.slice(0, 100)`.
- **Pages.** developpement-durable/fret-ports.
- **Impact.** Un défaut d'accessibilité : le tableau « équivalent » omet des séries.
- **Correction proposée.** Prendre les colonnes de `_getAllValueFields()`, et les séries après pivot pour `series-field`. Dire la troncature.
- **Priorité.** P2, effort S.
- **Décision.** Le tableau de la DataBox doit-il porter toutes les séries et signaler la troncature ? (oui / non)

#### BUG-039 — La couche de carte ignore le retour à l'état d'attente (`require-where`)

- **Constat.** Quand on retire le dernier filtre, le display revient à « Choisissez un filtre », mais les marqueurs restent sur la carte.
- **Preuve.** Rejoué le 2026-09-27 (`f71-map-idle.html`) contre la 0.42.0 et `origin/main` : 2 cercles restent affichés. `dsfr-data-map-layer.ts` n'implémente pas `onSourceReset`.
- **Pages.** prix-controle-technique, edu/educajou-ecolemap.
- **Impact.** Deux parties de la page se contredisent.
- **Correction proposée.** Implémenter `onSourceReset()` sur `dsfr-data-map-layer` (vider la couche, les grappes et l'entrée de légende), et ajouter un `idle-message` à `dsfr-data-map`, comme les autres afficheurs depuis #690.
- **Priorité.** P2, effort S.
- **Décision.** La carte doit-elle suivre l'état d'attente comme la liste et le graphique ? (oui / non)

#### AM-103 — `compute` n'a pas de sous-chaîne (`left`, `substr`) ni d'index de tableau

- **Constat.** On ne peut tirer ni le SIREN d'un SIRET, ni le département d'un code commune. Les contournements sont des cascades de `replace`/`contains` qui cessent de marcher selon le jeu.
- **Preuve.** **Rejeu unitaire du source le 2026-09-27** : `left(s, 9)` et `substr(s, 1, 2)` → « fonction inconnue ». `COMPUTE_FUNCTIONS` compte 18 fonctions. Les 45 % et 58 % de la page des entrepreneurs viennent de DuckDB et n'ont pas été rejoués.
- **Pages.** 9 pages : culture/entrepreneurs-spectacles, culture/depenses-culturelles-collectivites, developpement-durable/reseaux-chaleur, developpement-durable/entrepots, culture/architecture-contemporaine, culture/imprimeurs-19e, demo/vacance-logements, culture/prefets-prefetes, culture/journees-patrimoine.
- **Impact.** On mesure à la mauvaise maille (45 % au lieu de 58 %), ou on renonce à une carte.
- **Correction proposée.** Ajouter `left(s, n)`, `substr(s, debut, n)` et, en option, `at(tableau, n)` à la table `FUNCTIONS` de `packages/shared/src/utils/compute.ts` (l. 167-257).
- **Priorité.** P2, effort S.
- **Décision.** Faut-il ajouter `left` et `substr` à `compute`, et l'index de tableau dans le même lot ? (oui / non : sous-chaîne seulement)

#### AM-107 — `radius-field` fait croître le rayon, pas l'aire, et `compute` n'a pas `sqrt`

- **Constat.** Le rayon est affine entre `radius-min` et `radius-max`. Une valeur dix fois plus grande donne un cercle jusqu'à cent fois plus grand.
- **Preuve.** Source : `dsfr-data-map-layer.ts` l. 1132. **Rejeu unitaire le 2026-09-27** : `sqrt(v)` → « fonction inconnue ».
- **Pages.** culture/musees-monuments (la page garde un rayon fixe).
- **Impact.** Des symboles proportionnels malhonnêtes, alors que c'est la première règle de la sémiologie graphique.
- **Correction proposée.** Ajouter `radius-scale="sqrt"`, ancré à 0, sur la couche, et `sqrt()` à `compute`.
- **Priorité.** P2, effort S.
- **Décision.** L'échelle en racine doit-elle devenir le défaut de `radius-field`, au prix d'un changement de rendu des cartes existantes ? (oui / non : attribut opt-in)

#### AM-087 — La fiche `apiProviders` annonce qu'il faut un proxy CORS pour Tabular

- **Constat.** C'est faux : `tabular-api.data.gouv.fr` sert `access-control-allow-origin: *`.
- **Preuve.** **`curl` rejoué le 2026-09-27** : HTTP 200 et `access-control-allow-origin: *`. La fiche est inchangée : `skills/dsfr-data/references/api-providers.md` l. 152 et 172, `packages/shared/src/skills/skills.ts` l. 3038 et 3058.
- **Pages.** demo/delinquance-sans-total (sans proxy).
- **Impact.** Une IA qui lit la fiche déploie un proxy inutile et renonce à « une balise, un CDN ».
- **Correction proposée.** Déplacer Tabular dans la liste « APIs avec CORS natif ». Mentionner `/tabular-proxy` pour le cache ou le quota, pas comme une nécessité.
- **Priorité.** P2, effort XS.
- **Décision.** Faut-il corriger la fiche dans la prochaine version ? (oui / non)

### 3.3 P3 : confort

| id | Constat | Preuve (datée) | Pages | Correction proposée | Décision |
|---|---|---|---|---|---|
| **AM-088** | Le podium ne formate ni sa valeur (9,98 et 10,41 deviennent « 10 ») ni son sous-titre (« 5164 »). | Navigateur 0.42.0, 2026-09-27. Source : `dsfr-data-podium.ts` l. 389-391 et 437 ; aucune propriété de format parmi les `@property`. | aides-de-minimis, demo/diabete-age-egal | Ajouter `decimals` pour la valeur, et `subtitle-format` avec une unité (ou un gabarit `{{nb:number}} aides`). | Faut-il ajouter au podium `decimals` et `subtitle-format` ? (oui / non) |
| **AM-090** | Un littéral de `compute` n'échappe pas la quote : `'J''en ai'` est impossible. L'erreur est **dite**. | Rejeu unitaire, 2026-09-27 : « "then" attendu … trouvé 'en ai' ». Tokenizer : `compute.ts` l. 331-334. | barometre-france-num, entreprises-restauration-notre-dame, edu/cactus-hameconnage, culture/ete-culturel | Accepter `''` dans le tokenizer, comme SQL et ODSQL. | Faut-il accepter `''` ? (oui / non : documenter la limite) |
| **AM-102** | Préréglages d'encart : La Réunion (zoom 9) coupe le sud de l'île, et Wallis-et-Futuna (zoom 7) laisse ses deux îles hors cadre. | Captures 0.42.0 du 2026-09-26 et 27 ; emprise calculée. Source : `utils/territories.ts` l. 10 et 21. | edu/implantation-ulis-tfv, edu/hybridation-enseignement-lycee, culture/expositions-interet-national | Passer au zoom 8 et au zoom 6, ou dériver le cadrage de l'emprise du territoire. | Faut-il recaler les deux préréglages ? (oui / non) |
| **AM-110** | `share_percent` n'a pas de partition : la part se calcule sur toutes les lignes de sortie. | Navigateur 0.42.0, 2026-09-27, avec recalcul pandas. Source : `_applyShareAggregate` l. 1807-1821. | culture/usagers-archives | Ajouter `share-by="annee, question"`. | Faut-il ajouter une partition à `share` et `share_percent` ? (oui / non) |
| **AM-113** | Le repli « Autres valeurs » de la légende de carte est écrit en dur. | Rejoué le 2026-09-27 contre la 0.42.0 et `origin/main` : `empty-label`, `other-label` et `fallback-label` sont sans effet. Source : `dsfr-data-map-layer.ts` l. 597. | fermeture-reseau-cuivre, edu/educajou-ecolemap | Ajouter `other-label` sur la couche, relayé par `getLegendEntries()`. | Faut-il ajouter un libellé de repli configurable ? (oui / non) |

---

## 4. Producteurs de données

| Producteur | Constat | État le 2026-09-27 | Ce qui est à signaler |
|---|---|---|---|
| **data.gouv.fr (API Tabular)** | PG-033 | Toujours vrai : 101 lignes et 99 distinctes à `page_size=50`. L'API ignore une seconde clé `__sort`. | La pagination par offset sur un tri non total perd des lignes. Il faut soit un départage implicite par `__id`, soit plusieurs clés de tri. |
| **data.gouv.fr (API Tabular)** | PG-034 | Toujours vrai : `__in` rend 0 là où `__exact` rend 101. | Le parseur de `__in` écarte une valeur à parenthèse, avec HTTP 200. |

Les autres défauts de données rencontrés par les pages ne demandent rien à `dsfr-data` et restent au registre. C'est le cas de la colonne `Département` des Journées du patrimoine (126 graphies, 664 vides), citée dans AM-103, et du champ `reg` publié en entier par `sc_missions` (PG-030).

---

## 5. DSFR Chart (règle 4) : hors des 26, à remonter chez `GouvernementFR/dsfr-chart`

Parmi les 26 demandes, deux ont une part DSFR Chart :
- **PG-083** : le libellé « en France » du résumé est fixé par `map-chart`.
- **BUG-029** : il faut vérifier le rendu de l'infobulle quand une valeur `y` vaut `null`.

Neuf constats du registre visent DSFR Chart seul et sont au statut `acte`. Le banc ne les a pas déposés. **Leur état chez `GouvernementFR/dsfr-chart` n'a pas été vérifié ici.**

| id | Constat |
|---|---|
| AM-055 | `map-monde` rend le planisphère entier : aucun attribut de cadrage. |
| AM-063 | Pas d'échelle logarithmique. |
| LIM-017 | `line-chart` gradue des millésimes en 2022,2 / 2022,4. |
| AM-086 | L'infobulle multisérie ne nomme pas les séries. |
| BUG-024 | L'étiquette d'année de l'infobulle est formatée comme un nombre anglais (« 2,024 »). |
| LIM-018 | `bar` horizontal : `x-max="100"` est transmis, mais l'axe monte à 120. |
| PG-040 | `highlight-index` ne distingue rien sans `selected-palette="neutral"`. |
| AM-095 | `map-monde` écarte 19 codes ISO valides, sous un message ambigu. |
| AM-104 | `map-chart` peint un territoire absent en bleu `#5C68E5`, que la légende ne connaît pas. |

**Décision.** Faut-il déposer ces neuf constats chez `GouvernementFR/dsfr-chart`, avec les deux compléments de PG-083 et de BUG-029 ? (oui / non)

---

## 6. Statuts changés par cette revérification

| id | Avant | Après | Preuve |
|---|---|---|---|
| AM-089 | `a-deposer` | `retire` | Doublon de BUG-029 : mêmes lignes de source. Sa page et sa variante `missing="gap|zero"` sont reportées dans BUG-029. |
| PG-029 | `depose` (dsfr-data#923, fermée) | `corrige`, avec « reste vrai » | Rejeu `run.mjs pg029` contre la 0.42.0 le 2026-09-27. Dans le mauvais ordre, B reste à 2 651 (Normandie), mais **un avertissement console le dit désormais** (#942). **La dépendance à l'ordre reste.** |
| PG-030 | `depose` (dsfr-data#924 et #980, fermées) | `corrige`, avec « reste vrai » | Rejeu `run.mjs pg030` contre la 0.42.0 le 2026-09-27 : deux avertissements « comparée en TEXTE … publie "reg" en NOMBRE », y compris sur la source agrégée côté serveur (#1098). **La comparaison reste textuelle** : `reg = "01"` ne trouve toujours rien. |

**Décision.** Faut-il accepter l'avertissement comme correctif pour PG-029 et PG-030 (statut `corrige`), plutôt que de rouvrir #923 et #980 pour le correctif de fond (émettre un `change` au pré-remplissage ; émettre un `refine` sur ODS) ? (oui / non : rouvrir)

---

## 7. Ce que ce rapport ne prouve pas

- La relecture du source et les rejeux unitaires établissent que le défaut est **dans le code** d'`origin/main`. Ils ne remplacent pas un rejeu au navigateur de chaque page. Seuls PG-029, PG-030, PG-083, BUG-039, AM-113 et BUG-027 ont été rejoués au navigateur le 2026-09-27.
- BUG-034 (doublement des points) et les pourcentages d'AM-103 n'ont pas été rejoués depuis leur consignation.
- PG-033 n'est pas reproduit à `page_size=200` sur un échantillon de 1 818 lignes. Le risque est déduit de l'absence de départage, pas mesuré à cette taille de page.
- Les 31 pages qui portent un `map-summary` n'ont pas été contrôlées pour PG-083.
