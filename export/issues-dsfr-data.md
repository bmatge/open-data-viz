# Demandes à déposer sur bmatge/dsfr-data — rapport de cadrage

> Fichier généré par `node scripts/build-retours.mjs` depuis `public/data/retours.json`.
> 54 demandes cadrées — 4 bugs,
> 43 améliorations,
> 6 pièges à désamorcer dans la bibliothèque plutôt que dans la documentation.
> Chaque bloc est rédigé pour être collé tel quel dans une issue.

## Comment lire ce rapport

Chaque demande naît d'une reproduction réelle du banc d'essai
[open-data-viz](https://github.com/bmatge/open-data-viz) (30 entrées du catalogue de visualisations
de data.economie.gouv.fr, 24 reproduites) et porte la trace de sa vérification. Le cadrage ajoute ce
qu'il faut pour décider :

- **Impact** — ce qui se passe pour l'utilisateur ou l'auteur de page tant que ce n'est pas fait ;
- **Objectif métier** — ce que la correction permet, formulé côté usage ;
- **Pérennité** — si le besoin est structurel (tout projet le rencontrera), récurrent, ou ponctuel ;
- **Critères d'acceptation** — des tests observables, pour clore l'issue sans discussion ;
- **Effort** — S (moins d'un jour), M (un à trois jours), L (conception + développement), estimé
  d'après le code source lu, pas d'après la description ;
- **Priorité** — impact × faisabilité : P1 corrige des chiffres faux ou des fonctions inutilisables
  à faible coût ; P2 apporte un gain net à effort mesuré ; P3 est du confort ; P4 sort du périmètre.

Les entrées de type *piège* ne sont pas des bugs : le composant fait ce qu'il annonce. Elles sont
ici parce qu'un avertissement ou un défaut plus sûr dans la bibliothèque coûterait moins que la
vigilance qu'elles exigent de chaque auteur de page.

Neuf critiques ont été **retirées** au fil du banc d'essai parce qu'une vérification a montré une voie
native ou une erreur de notre part (faux problèmes FP-001 à FP-009 du registre) : ce rapport ne liste
que ce qui a résisté à la vérification.

## Priorisation

### P1 — immédiat : chiffres faux ou fonctions inutilisables, correction courte

| Id | Demande | Type | Effort | Pages | Décision |
|---|---|---|---|---|---|
| BUG-001 | Pagination arrêtée à la première page sur une requête agrégée Opendatasoft | bug | S | 2 | Accepter |
| BUG-002 | L'en-tête `apikey` n'est pas réécrit à l'exécution : préflight CORS refusée | bug | S | 1 | Accepter |
| AM-002 | `max-records` tronque en silence | amelioration | S | 1 | Accepter |
| BUG-004 | `fit-bounds` + `max-bounds` : la carte ne zoome jamais sur une sélection réduite à un point | bug | S | 9 | Accepter |
| PG-012 | `sort="-count"` sur les facettes trie par compte CROISSANT : la convention est l'inverse d'Opendatasoft | piege | S | 11 | Accepter (sémantique ou doc) |
| PG-017 | Un KPI `count` sur une query limitée compte la limite | piege | S | 3 | Accepter |
| PG-013 | `max-items` d'une couche carte plafonne à 5 000 : la moitié des stations manquaient | piege | S | 3 | Accepter |
| AM-032 | Les encarts territoriaux n'ont pas de largeur par défaut : ils s'écrasent à la largeur de leur libellé | amelioration | S | 4 | Accepter |
| AM-034 | Pas de compteur du total en mode serveur | amelioration | S | 3 | Accepter |
| AM-043 | Pas de moyen déclaratif de remplir un `<select>` depuis une source, ni de cascade entre selects | amelioration | L | 7 | Accepter, issue de conception |

_10 demandes — S 9, M 0, L 1._

### P2 — prochain cycle : gain net, effort mesuré

| Id | Demande | Type | Effort | Pages | Décision |
|---|---|---|---|---|---|
| AM-005 | Les valeurs nulles apparaissent en légende sous le nom de repli « Série N » | amelioration | S | 6 | Accepter |
| AM-006 | Pas de rappel des filtres actifs avec `dsfr-data-facets` | amelioration | S | 1 | Accepter |
| AM-025 | Une jointure sur des clés de types différents échoue sans rien dire | amelioration | S | 1 | Accepter |
| AM-026 | Pas d'indicateur de couverture sur une jointure | amelioration | S | 1 | Accepter |
| AM-027 | Une carte ignore en silence les lignes sans code géographique | amelioration | S | 1 | Accepter |
| AM-029 | Les opérateurs de date `year-of` et `month-of` refusent une date complète | amelioration | S | 1 | Accepter |
| AM-031 | Les formats de KPI n'ont pas de réglage de décimales : `euro` arrondit à l'unité | amelioration | S | 1 | Accepter |
| PG-015 | Un `group_by` Opendatasoft renvoie un groupe null que les graphiques du portail n'affichent pas | piege | S | 3 | Accepter |
| PG-018 | `group-by` client produit un groupe `null` que `count` inclut | piege | S | 3 | Fusionner avec PG-015 |
| BUG-003 | Les graphiques cartographiques journalisent une erreur de parsing à chaque chargement | bug | S | 2 | Accepter |
| AM-033 | Le tableau `dsfr-data-a11y` affiche les flottants bruts | amelioration | S | 1 | Accepter |
| AM-036 | Les templates ne formatent pas les dates | amelioration | S | 2 | Accepter |
| AM-040 | Pas de format de jonction pour les champs tableau dans les templates | amelioration | S | 3 | Accepter |
| AM-007 | Pas de conditionnelle dans les templates : les liens optionnels deviennent un défaut d'accessibilité | amelioration | M | 8 | Fusionner avec AM-039 |
| AM-015 | Cliquer un objet de la carte ne filtre pas les autres vues | amelioration | M | 1 | Accepter |
| AM-022 | La discrétisation d'une choroplèthe n'est pas paramétrable | amelioration | M | 1 | Accepter |
| AM-039 | Conditionnelle par CSS faute de conditionnelle de template | amelioration | M | 5 | Accepter |
| LIM-009 | Pas de légende de carte | limite-dure | M | 4 | Accepter |
| AM-001 | Un `dsfr-data-facets` ne peut piloter qu'une seule source | amelioration | L | 2 | À discuter avec AM-043 |

_19 demandes — S 13, M 5, L 1._

### P3 — backlog : confort, cas moins fréquents

| Id | Demande | Type | Effort | Pages | Décision |
|---|---|---|---|---|---|
| AM-003 | `server-facets` pourrait découvrir seul les champs de facettes | amelioration | S | 4 | Accepter |
| AM-004 | Pas d'agrégat « valeurs distinctes » | amelioration | S | 1 | Accepter |
| AM-017 | Aucun fond de carte neutre parmi les préréglages | amelioration | S | 8 | À discuter (choix éditorial souverain) |
| PG-014 | L'adaptateur Opendatasoft entoure `group-by` d'accents graves : une expression comme `year(…)` vaut un HTTP 400 | piege | S | 2 | Accepter |
| AM-009 | `fit-bounds` pourrait clipper automatiquement quand `insets` est déclaré | amelioration | S | 1 | Accepter |
| AM-010 | La rangée d'encarts territoriaux est à l'étroit | amelioration | S | 1 | Fusionner avec AM-032 |
| AM-014 | Pas de moyen de replier des colonnes parallèles en une seule facette | amelioration | S | 1 | Accepter |
| AM-019 | Un KPI ne sait pas filtrer sa source | amelioration | S | 1 | Accepter |
| AM-020 | Après un unpivot, les noms de colonnes restent en étiquettes | amelioration | S | 3 | Accepter |
| AM-021 | Pas de moyen déclaratif d'afficher la fraîcheur des données | amelioration | S | 1 | Accepter |
| AM-023 | L'attribut `name` change de forme selon le type de graphique | amelioration | S | 2 | Accepter |
| AM-024 | Pas de moyen d'agréger une date en facette (par année) | amelioration | S | 1 | Accepter |
| AM-028 | Le séparateur de valeurs multiples entre en conflit avec la grammaire des attributs | amelioration | S | 1 | Accepter |
| AM-030 | Pas de valeur par défaut dynamique (« aujourd'hui ») pour un filtre de contexte | amelioration | S | 1 | Accepter |
| AM-035 | Un graphique n'a pas d'état « vide tant qu'aucun filtre n'est posé » | amelioration | S | 1 | Accepter |
| AM-038 | `replace-fields` ne sait pas récrire une valeur qui contient des deux-points, ni par motif | amelioration | S | 1 | Accepter |
| AM-042 | `display="champ:radio"` rend une liste déroulante, pas des boutons radio | amelioration | S | 1 | Accepter |
| AM-011 | L'adaptateur Opendatasoft devrait charger par `/exports/json`, pas par 31 requêtes paginées | amelioration | M | 13 | À discuter (contournement en une ligne) |
| AM-008 | `bbox` ne filtre pas le premier chargement | amelioration | M | 1 | Accepter |
| AM-041 | Un ratio de deux agrégats coûte six balises | amelioration | M | 1 | Accepter |
| AM-013 | L'interface des facettes se rend là où la balise est écrite, pas là où on la veut | amelioration | M | 8 | Accepter |
| AM-016 | Pas de fond administratif embarqué pour une couche geoshape | amelioration | M | 1 | Accepter |
| AM-018 | Pas d'arithmétique entre séries (actif − passif, taux d'évolution) | amelioration | L | 1 | Requalifier : seule l'évolution N/N-1 reste |

_23 demandes — S 17, M 5, L 1._

### P4 — hors périmètre ou refus motivé

| Id | Demande | Type | Effort | Pages | Décision |
|---|---|---|---|---|---|
| AM-012 | La recette CDN recommandée charge Chart.js pour rien | amelioration | S | 16 | Corriger la skill (doc) |
| AM-037 | Pas de treemap | amelioration | L | 1 | Transférer à DSFR Chart |

_2 demandes — S 1, M 0, L 1._

## Les demandes

## BUG-001 — Pagination arrêtée à la première page sur une requête agrégée Opendatasoft

**Priorité** P1 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Accepter
**Labels suggérés** : `bug`, `severity:haute`, `opendatasoft-adapter`
**Rencontré sur** 2 page(s) : decp-augmente, comptabilite-generale

### Constat

Sur un `group_by`, l'API Opendatasoft renvoie un `total_count` égal à la TAILLE DE PAGE (100), pas au nombre réel de groupes. La boucle de `fetchAll` (packages/core/src/adapters/opendatasoft-adapter.ts:143) s'arrête sur `allResults.length >= totalCount` et ne récupère donc que la première page. L'avertissement de pagination incomplète compare lui aussi au totalCount faux : il ne se déclenche pas. Résultat : des agrégats silencieusement tronqués.

### Impact de l'erreur ou du manque

Un agrégat de plus de 100 groupes est tronqué à 100 sans avertissement ; sur DECP un KPI affichait 632 062 marchés au lieu de 994 123.

### Objectif métier de la correction

Qu'une agrégation serveur soit complète ou signale qu'elle ne l'est pas.

### Pérennité et reproductibilité du besoin

Structurel : tout croisement à plus de 100 groupes (année × catégorie, département × type). Le portail renverra toujours `total_count` = taille de page sur un `group_by`.

### Comment ça a été vérifié

Deux cas. (1) DECP : tableau croisé `source × nature × procedure` = 235 groupes réels ; une page bâtie dessus n'émet qu'une requête et affiche 632 062 marchés au lieu de 994 123, sans message. (2) Comptabilité générale : le graphique « postes × année » compte 264 groupes — c'est le premier cas où le bug BLOQUE réellement une reproduction, le graphique principal de la page n'aurait montré qu'un tiers des données.

### Contournement actuel

**Trouvé au lot 3** : `/exports/json` accepte `group_by` et renvoie TOUS les groupes en une requête — 264 groupes en 0,5 s. Écrire la source en mode générique (`url=` vers `/exports/json` + `params`) contourne donc entièrement le bug. En mode adaptateur, aucun contournement : ni `limit` ni `max-records` ne changent la condition d'arrêt.

### Demande

Sur une requête agrégée (présence de `group_by`), ne se fier qu'à `pageResults.length < pageSize` pour arrêter la boucle, et ignorer `total_count`.

### Critères d'acceptation

- [ ] Sur `select=…&group_by=source,nature,procedure` (235 groupes), la source publie 235 lignes.
- [ ] La boucle s'arrête sur une page incomplète, jamais sur `total_count` quand `group_by` est présent.
- [ ] Test avec un faux serveur renvoyant `total_count` = 100 et 3 pages.

---

## BUG-002 — L'en-tête `apikey` n'est pas réécrit à l'exécution : préflight CORS refusée

**Priorité** P1 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Accepter
**Labels suggérés** : `bug`, `severity:haute`, `dsfr-data-source`, `providers`
**Rencontré sur** 1 page(s) : catalogue

### Constat

`headers='{"apikey":"…"}'` — la forme que suggère la documentation de l'attribut `headers` — échoue : Opendatasoft n'autorise que `Authorization` dans son `Access-Control-Allow-Headers`, donc le navigateur refuse la préflight. La bibliothèque SAIT corriger ça (`normalizeProviderAuthHeaders`, packages/shared/src/providers/index.ts:198, qui réécrit en `Authorization: Apikey <clé>`), mais la fonction n'est appelée que dans l'interface du builder, pas dans le chemin d'exécution.

### Impact de l'erreur ou du manque

La forme documentée `headers='{"apikey":…}'` échoue en préflight CORS sur tout portail Opendatasoft : première page, premier échec, message du navigateur opaque.

### Objectif métier de la correction

Que la documentation et l'exécution disent la même chose ; qu'une clé ODS fonctionne dès la première tentative.

### Pérennité et reproductibilité du besoin

Structurel : tous les portails Opendatasoft n'autorisent que `Authorization` en CORS.

### Comment ça a été vérifié

Console navigateur : « Request header field apikey is not allowed by Access-Control-Allow-Headers in preflight response » puis `TypeError: Failed to fetch`. Préflight OPTIONS testée au curl : `access-control-allow-headers: Authorization, X-Requested-With, Origin, …` — pas d'`apikey`.

### Contournement actuel

`api-key-ref` + `window.DSFR_DATA_KEYS = { 'ods-mef': 'Apikey <clé>' }`, qui pose directement l'en-tête `Authorization`.

### Demande

Appeler `normalizeProviderAuthHeaders` dans l'adaptateur au moment de construire la requête, pas seulement dans l'UI du builder.

### Critères d'acceptation

- [ ] `headers='{"apikey":"K"}'` sur une source `api-type="opendatasoft"` émet `Authorization: Apikey K` et aucun en-tête `apikey`.
- [ ] La fonction `normalizeProviderAuthHeaders` est appelée dans l'adaptateur (test unitaire).

---

## AM-002 — `max-records` tronque en silence

**Priorité** P1 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement`, `severity:haute`, `dsfr-data-source`, `opendatasoft-adapter`
**Rencontré sur** 1 page(s) : plan-de-relance

### Constat

Le plafond par défaut de l'adaptateur Opendatasoft est de 1 000 enregistrements. Un jeu de 3 080 lignes se charge donc au tiers, sans erreur ni indication visuelle : la page affiche des chiffres faux avec l'aplomb de chiffres justes. C'est le piège le plus coûteux rencontré.

### Impact de l'erreur ou du manque

Un jeu de 3 080 lignes se charge au tiers ; les KPI et graphiques sont faux avec l'aplomb de chiffres justes.

### Objectif métier de la correction

Qu'une troncature soit toujours visible du développeur (console) et idéalement de l'utilisateur.

### Pérennité et reproductibilité du besoin

Structurel : le plafond est un défaut de sécurité légitime, mais il doit se voir.

### Comment ça a été vérifié

Constaté en écrivant la page Plan de relance : sans `max-records="3500"`, KPI et carte ne portent que 1 000 des 3 080 projets.

### Contournement actuel

Fixer `max-records` explicitement dès qu'un jeu peut dépasser 1 000 lignes — donc savoir à l'avance combien il en contient.

### Demande

Un avertissement console systématique quand la troncature est effective (un `console.warn` existe mais dépend d'un `total_count` que l'API ne fournit pas toujours — voir BUG-001), et idéalement un état visible sur le composant.

### Critères d'acceptation

- [ ] Quand `fetchAll` s'arrête sur le plafond alors qu'une page suivante existe, `console.warn` nomme la source, le plafond et l'attribut à relever.
- [ ] Événement `dsfr-data-truncated` (ou champ de meta) exploitable par une bannière.

---

## BUG-004 — `fit-bounds` + `max-bounds` : la carte ne zoome jamais sur une sélection réduite à un point

**Priorité** P1 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Accepter
**Labels suggérés** : `bug`, `severity:haute`, `dsfr-data-map`
**Rencontré sur** 9 page(s) : prix-des-carburants, qualite-tourisme, tourisme-et-handicap, entreprises-restauration-notre-dame, annuaire-services-dgfip, entreprise-patrimoine-vivant, centres-controle-technique, plan-de-relance, fermeture-reseau-cuivre

### Constat

Quand `max-bounds` est posé (ce que le CLAUDE.md impose dès qu'un jeu a des DROM), `clipBoundsForFit` intersecte l'emprise des données avec la zone et renvoie null si `south >= north || west >= east`. Une sélection d'un seul point — ou de plusieurs points au même endroit — a une emprise de surface nulle : la condition est vraie, le fit est ignoré, la vue ne bouge pas. Or c'est le résultat le plus courant d'une recherche par commune sur un annuaire. Les trois annuaires du lot 2 sont touchés.

### Impact de l'erreur ou du manque

Sur neuf pages cartographiques, chercher une commune et n'obtenir qu'un point laisse la carte sur la France entière : l'utilisateur ne trouve pas ce qu'il a cherché. Aucun message.

### Objectif métier de la correction

Qu'une recherche à résultat unique — le cas le plus fréquent d'un annuaire — aboutisse à une carte centrée sur le résultat.

### Pérennité et reproductibilité du besoin

Structurel : tout annuaire cartographié avec DROM pose `max-bounds`, donc rencontre le cas. Reproduit sur 9 pages du banc d'essai.

### Comment ça a été vérifié

Navigateur, page prix-des-carburants avec `fit-bounds max-bounds="41,-5.5,51.5,10"` : facette Occitanie → zoom 7 centré 43.76,2.30 (le fit marche) ; recherche « Montgenèvre » (1 station, layerBounds 6.733,44.934,6.733,44.934) → zoom 5, centre inchangé. Après retrait de `max-bounds` : zoom 18 centré 44.93,6.73. Source : `packages/core/src/components/dsfr-data-map.ts`, `clipBoundsForFit`, `if (south >= north || west >= east) return null`.

### Contournement actuel

Vérifié sur une variante de la page Prix des carburants sans `max-bounds` ni `insets` (le jeu est purement métropolitain : 0 point hors [41–51.5, -6–10]) : Leaflet zoome alors au maximum sur le point. La page retenue garde `max-bounds` par cohérence avec le gabarit ; huit pages sont touchées. Au lot 9, la page Prix des carburants applique ce contournement (jeu 100 % métropolitain vérifié par `where=not in_bbox(geom,41,-5.5,51.5,10)` → 0 station) : zoom 18 sur une commune à station unique.

### Demande

Dans `clipBoundsForFit`, traiter une emprise dégénérée (point ou segment) comme un point : si elle est dans la zone, renvoyer un petit carré autour (ou `setView` au zoom max) au lieu de null. La condition `>=` devrait être `>`.

### Critères d'acceptation

- [ ] Avec `fit-bounds max-bounds="41,-5.5,51.5,10"`, une source réduite à un point situé dans la zone produit un zoom sur ce point (test : Montgenèvre 44.93,6.73 → zoom ≥ 15).
- [ ] Un point hors zone laisse la vue inchangée (comportement actuel conservé).
- [ ] Test unitaire sur `clipBoundsForFit` avec une emprise dégénérée (sud = nord).

---

## PG-012 — `sort="-count"` sur les facettes trie par compte CROISSANT : la convention est l'inverse d'Opendatasoft

**Priorité** P1 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Accepter (sémantique ou doc)
**Labels suggérés** : `enhancement, dx`, `severity:haute`, `dsfr-data-facets`
**Rencontré sur** 11 page(s) : catalogue, retours, annuaire-services-dgfip, barometre-france-num, centres-controle-technique, entreprise-patrimoine-vivant, entreprises-restauration-notre-dame, plan-de-relance, prix-des-carburants, qualite-tourisme, tourisme-et-handicap

### Constat

Dans `dsfr-data-facets`, `sort="count"` (le défaut) trie du plus fréquent au plus rare, et `sort="-count"` du plus rare au plus fréquent. Chez Opendatasoft (`ods-facet-results-sort`) comme dans la plupart des API, le tiret signifie « décroissant ». En écrivant `-count` pour obtenir « les plus fréquents d'abord », onze de nos pages ont affiché, depuis le lot 1, les valeurs les plus rares en tête — et, avec `max-values="6"`, caché Gazole, Auvergne-Rhône-Alpes ou Bouches-du-Rhône derrière « Voir plus ». Personne ne l'a vu pendant trois lots : les listes avaient l'air correctes, juste « dans un ordre ».

### Impact de l'erreur ou du manque

`sort="-count"` trie croissant : les valeurs les plus fréquentes cachées derrière « Voir plus » sur onze pages.

### Objectif métier de la correction

Une convention alignée sur ODS et l'usage.

### Pérennité et reproductibilité du besoin

Structurel.

### Comment ça a été vérifié

Source `_sortValues` : `case 'count': b.count - a.count` ; `case '-count': a.count - b.count`. Navigateur, facette carburants avec `-count` : GPLc 1494, SP95 2935, E85 3933, SP98 7163 (croissant, Gazole 9531 caché) ; sans attribut : Gazole 9529, E10 7231, SP98 7155, E85 3931.

### Contournement actuel

Ne rien écrire (`count` décroissant est le défaut). Retiré sur les onze pages.

### Demande

Aligner la sémantique sur la convention dominante (`-count` = décroissant) ou, à défaut, l'écrire noir sur blanc dans la fiche du composant, qui liste aujourd'hui « count, -count, alpha, -alpha » sans dire lequel est lequel.

### Critères d'acceptation

- [ ] `-count` = décroissant (ou la sémantique actuelle écrite dans la fiche du composant et un `console.warn` de transition).

---

## PG-017 — Un KPI `count` sur une query limitée compte la limite

**Priorité** P1 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement, dx`, `severity:haute`, `dsfr-data-kpi`, `dsfr-data-query`
**Rencontré sur** 3 page(s) : qualite-tourisme, tourisme-et-handicap, annuaire-services-dgfip

### Constat

`dsfr-data-kpi value="count"` branché sur une `dsfr-data-query limit="12"` affiche 12 quelle que soit la donnée. Les trois annuaires du lot 2 affichaient « 12 activités » pour 28, 22 et 29 réelles — un chiffre faux d'apparence plausible, pendant sept lots.

### Impact de l'erreur ou du manque

Un KPI `count` sur une query `limit` compte la limite : « 12 activités » pour 28, trois pages, sept lots.

### Objectif métier de la correction

Un chiffre faux doit se voir.

### Pérennité et reproductibilité du besoin

Structurel.

### Comment ça a été vérifié

Playwright, KPI 12→28 (Qualité Tourisme), 12→22 (Tourisme & Handicap), 12→29 (DGFiP) après ajout d'une query sans limite.

### Contournement actuel

Une seconde query sans `limit` réservée au KPI.

### Demande

—

### Critères d'acceptation

- [ ] `console.warn` quand un KPI `count` consomme une query avec `limit`.

---

## PG-013 — `max-items` d'une couche carte plafonne à 5 000 : la moitié des stations manquaient

**Priorité** P1 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement, dx`, `severity:moyenne`, `dsfr-data-map-layer`
**Rencontré sur** 3 page(s) : prix-des-carburants, annuaire-services-dgfip, centres-controle-technique

### Constat

Le plafond par défaut d'une couche est de 5 000 éléments. Sur 9 805 stations, la carte n'en dessinait que 5 000 et affichait un bandeau « 5 000 éléments affichés sur 9 805 disponibles. Zoomez pour voir plus de détail » — sauf que zoomer ne charge rien de plus, les données étant déjà là. Le bandeau se répète dans chaque encart territorial (la couche y est clonée) et en recouvre les libellés. Même famille qu'AM-002 (`max-records`) : un plafond utile, mais un défaut trop bas pour un jeu national avec grappes, et un message qui promet un remède qui n'existe pas en mode client. Deux autres pages étaient dans le même cas sans le savoir : l'annuaire DGFiP (21 761 structures chargées, 5 000 dessinées — 77 % manquantes) et les centres de contrôle technique (6 113).

### Impact de l'erreur ou du manque

Le plafond de 5 000 points cache 77 % des structures DGFiP avec un bandeau qui promet un zoom qui ne charge rien.

### Objectif métier de la correction

Un plafond honnête.

### Pérennité et reproductibilité du besoin

Structurel.

### Comment ça a été vérifié

`getRenderedCount()` = 5000 et 1 bandeau par carte (6 avec les encarts) avant ; 9805 et 0 bandeau après. Sur main : `max-items` posé sur les trois pages ; comptes rendus vérifiés au navigateur après correctif.

### Contournement actuel

`max-items="12000"` sur la couche. Avec `cluster`, 9 805 points se rendent sans peine.

### Demande

—

### Critères d'acceptation

- [ ] Message du bandeau différencié : en mode client, « relevez max-items » ; défaut relevé à 10 000 quand `cluster` est actif.

---

## AM-032 — Les encarts territoriaux n'ont pas de largeur par défaut : ils s'écrasent à la largeur de leur libellé

**Priorité** P1 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement`, `severity:moyenne`, `dsfr-data-map-inset`
**Rencontré sur** 4 page(s) : entreprises-restauration-notre-dame, prix-des-carburants, qualite-tourisme, tourisme-et-handicap

### Constat

`dsfr-data-map-inset` se pose en `display:inline-block` sans largeur, et la mini-carte interne n'en a pas non plus : chaque encart prend la largeur de son libellé, de 48 px (Guyane) à 77 px (Guadeloupe), pour 160 px de haut. Les trois annuaires du lot 2 vivaient avec depuis leur livraison ; AV-003 (« encarts en un attribut ») a été écrit sans regarder leur rendu de près.

### Impact de l'erreur ou du manque

Les encarts DROM s'écrasent à 50 px sur sept pages sans règle de page.

### Objectif métier de la correction

Des encarts lisibles par défaut.

### Pérennité et reproductibilité du besoin

Structurel : toute carte avec `insets`.

### Comment ça a été vérifié

`getBoundingClientRect()` des cinq encarts : 77×188, 69×188, 48×188, 70×188, 53×188 sur les pages prix-des-carburants ET qualite-tourisme ; 160×188 chacun après la règle de page.

### Contournement actuel

Règle de page : `dsfr-data-map-inset { width: 10rem; margin: .5rem .5rem 0 0 }`.

### Demande

Une largeur par défaut (l'attribut `height` existe déjà, un `width` symétrique suffirait) ou un ratio.

### Critères d'acceptation

- [ ] Sans CSS de page, un encart `insets="drom"` fait au moins 10 rem de large ; attribut `width` symétrique de `height`.

---

## AM-034 — Pas de compteur du total en mode serveur

**Priorité** P1 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement`, `severity:moyenne`, `dsfr-data-kpi`, `dsfr-data-source`
**Rencontré sur** 3 page(s) : fermeture-reseau-cuivre, bofip, prix-controle-technique

### Constat

Avec `server-side`, la source ne publie que la page courante ; `dsfr-data-kpi value="count"` compte donc 20 ou 30, jamais le total de la recherche. Le total est pourtant connu (`total_count` de la réponse, exposé à la pagination via getDataMeta). Sur un moteur de recherche, « 1 766 communes » ou « 12 documents » est l'information la plus utile.

### Impact de l'erreur ou du manque

Sur un moteur de recherche en mode serveur, impossible d'afficher « 1 766 communes trouvées » ; seul indice : la pagination.

### Objectif métier de la correction

Donner le résultat le plus utile d'une recherche : combien.

### Pérennité et reproductibilité du besoin

Structurel : toute page `server-side`. La donnée (`total_count`) est déjà dans la meta.

### Comment ça a été vérifié

Page fermeture-reseau-cuivre : `records?…&limit=20`, la réponse porte `total_count: 35305` ; un KPI `count` sur la source affiche 20.

### Contournement actuel

Aucun déclaratif : la pagination est le seul indice du nombre de résultats. Une source agrégée `count(*)` séparée ne suit ni la recherche ni les facettes (elles ne relaient qu'à leur propre amont).

### Demande

Une expression `value="$total"` (ou `meta:total`) sur `dsfr-data-kpi`, lue dans la meta de la source amont en mode serveur.

### Critères d'acceptation

- [ ] `<dsfr-data-kpi source="src" value="$total">` affiche `total_count` de la dernière réponse d'une source `server-side`, et suit recherche et facettes.
- [ ] Sur une source non paginée, `$total` = nombre de lignes.

---

## AM-043 — Pas de moyen déclaratif de remplir un `<select>` depuis une source, ni de cascade entre selects

**Priorité** P1 · **Effort estimé** L (conception + développement) · **Décision proposée** Accepter, issue de conception
**Labels suggérés** : `enhancement`, `severity:haute`, `dsfr-data-context-filter`, `dsfr-data-facets`
**Rencontré sur** 7 page(s) : comptabilite-generale, fiscalite-locale, barometre-france-num, aide-publique-developpement, decp-augmente, rappel-conso-tableau-de-bord, prix-controle-technique

### Constat

Les `<select>` qui pilotent un `dsfr-data-context` sont écrits en dur : 56 missions, 101 départements, 119 questions, 20 agences… générés hors ligne depuis l'API. Une cascade région → département reste du JavaScript. C'est la conséquence la plus coûteuse d'AM-001, et la friction la plus répétée du banc d'essai (sept pages).

### Impact de l'erreur ou du manque

Sept pages du banc d'essai portent des `<select>` écrits en dur (56 missions, 101 départements, 119 questions) générés hors ligne : toute évolution de la donnée les rend faux, et une cascade région → département exige du JavaScript.

### Objectif métier de la correction

Qu'un tableau de bord à plusieurs agrégations serveur se filtre sans une seule valeur écrite à la main, comme le fait le contexte Opendatasoft.

### Pérennité et reproductibilité du besoin

Structurel et récurrent : c'est la friction la plus répétée du banc d'essai. Tout dashboard multi-vues sur un jeu volumineux la rencontre.

### Comment ça a été vérifié

Trois pages du lot 9 avec options générées par script ; `dsfr-data-facets` ne pilote que sa propre source (source vérifié).

### Contournement actuel

Générer les options depuis un `group_by` de l'API au moment d'écrire la page (script de construction).

### Demande

Un `dsfr-data-context-filter` capable de peupler son `ui` depuis une source (`options-source`, `options-field`), avec restriction par les autres filtres du contexte.

### Critères d'acceptation

- [ ] `<dsfr-data-context-filter field="region" options-source="src-regions" options-field="region">` peuple son `<select>` depuis la source, avec les compteurs si disponibles.
- [ ] Les options se restreignent par les autres filtres du contexte (cocher une région restreint les départements).
- [ ] Une valeur pré-sélectionnée par l'URL est conservée après peuplement.
- [ ] Démonstration : la page Comptabilité générale sans `<option>` écrite en dur.

---

## AM-005 — Les valeurs nulles apparaissent en légende sous le nom de repli « Série N »

**Priorité** P2 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement`, `severity:moyenne`, `dsfr-data-chart`
**Rencontré sur** 6 page(s) : plan-de-relance, decp-augmente, restauration-notre-dame, comptabilite-generale, barometre-france-num, signalconso

### Constat

21 des 3 080 projets n'ont pas de `type_entreprise` ; le camembert les regroupe sous « Série 4 », le libellé par défaut de DSFR Chart, au lieu de « Non renseigné ». Sur une page publique, c'est une coquille visible.

### Impact de l'erreur ou du manque

Les valeurs nulles apparaissent en légende sous « Série 4 » sur une page publique.

### Objectif métier de la correction

Un libellé maîtrisé pour l'absence.

### Pérennité et reproductibilité du besoin

Structurel : tout jeu avec des nuls.

### Comment ça a été vérifié

Légende du camembert « Répartition par type d'entreprise ». Vérifié à l'API : `group_by=type_entreprise` renvoie bien un groupe `null` de 21 lignes.

### Contournement actuel

Aucun de propre : `dsfr-data-normalize` travaille sur des motifs de chaînes (`replace`, `replace-fields`), pas sur `null`. Il faut filtrer les lignes ou nettoyer à la source.

### Demande

Un attribut de libellé pour les valeurs manquantes (ex. `empty-label="Non renseigné"`) sur le graphique, ou une option `null-as` sur `dsfr-data-normalize`.

### Critères d'acceptation

- [ ] `empty-label="Non renseigné"` sur le graphique ; sans lui, « Non renseigné » par défaut plutôt que « Série N ».

---

## AM-006 — Pas de rappel des filtres actifs avec `dsfr-data-facets`

**Priorité** P2 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement`, `severity:moyenne`, `dsfr-data-facets`, `dsfr-data-context-tags`
**Rencontré sur** 1 page(s) : plan-de-relance

### Constat

Opendatasoft affiche un `ods-filter-summary` : les filtres actifs en tags supprimables, avec un bouton « tout effacer ». `dsfr-data-context-tags` fait l'équivalent, mais uniquement pour `dsfr-data-context`. Une page filtrée par facettes n'a aucun récapitulatif.

### Impact de l'erreur ou du manque

Pas de rappel des filtres actifs avec des facettes, contrairement à `ods-filter-summary`.

### Objectif métier de la correction

Voir et retirer ses filtres d'un clic.

### Pérennité et reproductibilité du besoin

Structurel.

### Comment ça a été vérifié

Page Plan de relance : après trois cases cochées dans trois facettes différentes, rien ne résume l'état courant hors de la colonne de filtres.

### Contournement actuel

Aucun sans JavaScript.

### Demande

Faire accepter à `dsfr-data-context-tags` une source de type `dsfr-data-facets`, ou fournir un `dsfr-data-facets-tags`.

### Critères d'acceptation

- [ ] `dsfr-data-context-tags for="id-facettes"` liste les sélections actives des facettes, supprimables, avec « tout effacer ».

---

## AM-025 — Une jointure sur des clés de types différents échoue sans rien dire

**Priorité** P2 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement`, `severity:moyenne`, `dsfr-data-join`
**Rencontré sur** 1 page(s) : barometre-france-num

### Constat

`code_unifie` est un entier dans `questions-reponses` et une chaîne dans `bfn-2022-resultats-2022`. `dsfr-data-join` compare les valeurs sans harmoniser les types : aucune ligne ne s'apparie. En jointure gauche, le symptôme est particulièrement discret — le nombre de lignes reste exact, seules les colonnes jointes sont vides.

### Impact de l'erreur ou du manque

Une jointure entier ↔ chaîne n'apparie rien, sans message ; le résultat a l'air juste.

### Objectif métier de la correction

Une jointure qui prévient.

### Pérennité et reproductibilité du besoin

Structurel : les types divergent souvent entre jeux.

### Comment ça a été vérifié

`questions-reponses` renvoie `code_unifie: 201` (int), `bfn-2022-resultats-2022` renvoie `'201'` (str). Jointure sans correction : 0 ligne appariée, aucun message. Après `dsfr-data-normalize numeric="code_unifie"` : 237 lignes appariées.

### Contournement actuel

`dsfr-data-normalize numeric="<clé>"` du côté où la clé est une chaîne.

### Demande

Comparer les clés de jointure après normalisation de type (au minimum nombre ↔ chaîne numérique), ou avertir en console quand les deux côtés n'ont pas le même type.

### Critères d'acceptation

- [ ] Clés comparées après normalisation nombre ↔ chaîne numérique ; `console.warn` si les types diffèrent.

---

## AM-026 — Pas d'indicateur de couverture sur une jointure

**Priorité** P2 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement`, `severity:moyenne`, `dsfr-data-join`
**Rencontré sur** 1 page(s) : barometre-france-num

### Constat

Rien n'indique quelle proportion des lignes de gauche a trouvé une correspondance à droite. C'est pourtant le seul signal capable d'alerter sur une jointure qui « fonctionne » mais rapproche des clés homonymes désignant des choses différentes (voir PG-009).

### Impact de l'erreur ou du manque

Aucun taux d'appariement : une jointure sur des clés homonymes passe inaperçue.

### Objectif métier de la correction

Rendre visible la qualité d'une jointure.

### Pérennité et reproductibilité du besoin

Structurel.

### Comment ça a été vérifié

Sur le Baromètre, la jointure appariait 237 lignes sur 1 065 et 9 questions sur 119. Ce taux de 22 % aurait dû alerter immédiatement ; il a fallu comparer les deux jeux à la main pour le calculer.

### Contournement actuel

Compter soi-même dans la console du navigateur.

### Demande

Exposer le taux d'appariement sur le composant (attribut de diagnostic ou `console.info`), et l'afficher dans le volet Diagnostic prévu par l'epic #602 de dsfr-data.

### Critères d'acceptation

- [ ] `dsfr-data-join` expose le taux de lignes appariées (attribut de diagnostic + `console.info`), visible dans le volet Diagnostic (#602).

---

## AM-027 — Une carte ignore en silence les lignes sans code géographique

**Priorité** P2 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement`, `severity:moyenne`, `dsfr-data-chart`
**Rencontré sur** 1 page(s) : signalconso

### Constat

L'agrégation Signal Conso par département renvoie un groupe dont le `dep_code` est nul : 95 309 signalements, soit 5,5 % du total. La carte les écarte sans rien afficher, et le total qu'elle représente n'est donc pas celui du KPI affiché juste au-dessus. C'est le pendant cartographique du piège des valeurs nulles (AM-005) : sur un graphique elles deviennent « Série N », sur une carte elles disparaissent.

### Impact de l'erreur ou du manque

5,5 % des signalements écartés d'une carte sans que rien ne le dise ; total carte ≠ total KPI.

### Objectif métier de la correction

Rendre visible ce que la carte tait.

### Pérennité et reproductibilité du besoin

Structurel.

### Comment ça a été vérifié

`group_by=dep_code, dep_name` sur signalconso : premier groupe `{dep_code: null, n: 95309}`. Carte rendue sans mention, KPI total à 1 733 022.

### Contournement actuel

Compter soi-même les lignes sans code et l'indiquer en note, ou les exclure explicitement par un `where` pour que les chiffres concordent.

### Demande

Signaler, sur le composant ou en console, le nombre de lignes écartées faute de code géographique reconnu — l'écart entre total et total cartographié est une source d'erreur classique.

### Critères d'acceptation

- [ ] Le composant expose le nombre de lignes sans code reconnu (console + attribut), et peut l'afficher sous la carte.

---

## AM-029 — Les opérateurs de date `year-of` et `month-of` refusent une date complète

**Priorité** P2 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement`, `severity:moyenne`, `dsfr-data-context-filter`
**Rencontré sur** 1 page(s) : rappel-conso-tableau-de-bord

### Constat

`year-of` n'accepte que « AAAA », `month-of` que « AAAA-MM », `lt-day-after` que « AAAA-MM-JJ ». Un tableau de bord daté (« au 9 septembre : total, année en cours, mois en cours ») a besoin des trois à partir d'une seule date. Un `<input type="date">` ne peut pas les nourrir, et la valeur au mauvais format ne produit ni erreur ni avertissement : `monthRange`/`yearRange` renvoient null, la clause est vide, le filtre est simplement absent. Le compteur « année » affiche alors le total sans que rien ne le signale.

### Impact de l'erreur ou du manque

Un `<input type="date">` ne peut pas nourrir `year-of` / `month-of` ; le filtre est silencieusement absent et le compteur « année » affiche le total.

### Objectif métier de la correction

Un tableau de bord daté (total, année, mois) sans script.

### Pérennité et reproductibilité du besoin

Récurrent : tout bulletin mensuel.

### Comment ça a été vérifié

Source `dsfr-data-context-filter.ts` : `monthRange` teste `/^(\d{4})-(\d{2})$/`, `yearRange` teste `/^\d{4}$/`, retour null → `buildColonWhere` renvoie ''. En navigateur, avec les champs cachés : `where=date_publication < "2026-09-10" AND date_publication >= "2026-01-01" AND date_publication < "2027-01-01"` sur rc-annee, 2 402 fiches, chiffre égal à la facette date_publication=2026 de l'API. Page : /viz/rappel-conso-tableau-de-bord (reproduction fidèle de la page vivante /pages/rappel-conso-v2/, variante de /viz/rappelconso).

### Contournement actuel

Deux `<input type="hidden">` (AAAA et AAAA-MM) dérivés de la date par un script de dix lignes, qui dispatche un `change` sur chacun. C'est le seul JavaScript de la page Rappel Conso.

### Demande

Accepter une date ISO complète dans `year-of` et `month-of` (tronquer à 4 ou 7 caractères), et signaler par `reportConfigError` ou `console.warn` une valeur non parsable au lieu de retirer silencieusement le filtre.

### Critères d'acceptation

- [ ] `year-of` et `month-of` acceptent « AAAA-MM-JJ » (troncature).
- [ ] Une valeur non parsable déclenche `reportConfigError` au lieu d'un filtre vide.

---

## AM-031 — Les formats de KPI n'ont pas de réglage de décimales : `euro` arrondit à l'unité

**Priorité** P2 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement`, `severity:moyenne`, `dsfr-data-kpi`
**Rencontré sur** 1 page(s) : prix-des-carburants

### Constat

`format="euro"` passe par `Intl.NumberFormat` avec `maximumFractionDigits: 0` : un prix moyen du gazole s'affiche « 2 € ». `format="decimal"` impose 1 à 2 décimales : « 2,29 » à côté de « 2,1 » (pour 2,10), et la troisième décimale des prix à la pompe est perdue. Aucun attribut ne règle le nombre de décimales ni l'unité.

### Impact de l'erreur ou du manque

`euro` arrondit un prix au litre à « 2 € » ; `decimal` affiche « 2,1 » à côté de « 2,29 » ; les milliards s'écrivent en 12 chiffres.

### Objectif métier de la correction

Des KPI monétaires lisibles à la précision du métier.

### Pérennité et reproductibilité du besoin

Structurel : tout KPI de prix ou de montant.

### Comment ça a été vérifié

Source `packages/shared/src/utils/formatters.ts` : `formatCurrency` → `minimumFractionDigits: 0, maximumFractionDigits: 0` ; `formatDecimal` → 1 à 2. Navigateur : KPI E10 rendu « 2,1 » quand la moyenne vaut 2,10, Gazole « 2,29 » (API : 2,2942).

### Contournement actuel

`format="decimal"` avec l'unité écrite dans `label` (« € / litre »).

### Demande

Un attribut `decimals` (min = max) et un attribut `unit` (suffixe libre) sur `dsfr-data-kpi`, ou un `format="euro:3"`. `formatCurrency` et `formatDecimal` sont dans `@dsfr-data/shared` : la modification est locale.

### Critères d'acceptation

- [ ] `decimals="3"` fixe min = max ; `unit="€/L"` ajoute un suffixe ; `format="compact"` → « 44,9 Md€ ».

---

## PG-015 — Un `group_by` Opendatasoft renvoie un groupe null que les graphiques du portail n'affichent pas

**Priorité** P2 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement, dx`, `severity:moyenne`, `dsfr-data-source`, `dsfr-data-chart`
**Rencontré sur** 3 page(s) : decp-augmente, rappel-conso-tableau-de-bord, prix-controle-technique

### Constat

Chaque `select count(*) … group_by champ` remonte une ligne à clé vide (decp_augmente : 399 sources, 3 724 natures, 27 451 procédures ; rappelconso : 2 001 natures et modalités). Elle devient une barre ou une part sans libellé, alors qu'`ods-chart` l'écarte silencieusement — d'où des écarts avec les chiffres du portail.

### Impact de l'erreur ou du manque

Le groupe null d'un `group_by` devient une barre sans libellé ; comptes décalés de l'original.

### Objectif métier de la correction

Parité avec `ods-chart`.

### Pérennité et reproductibilité du besoin

Structurel.

### Comment ça a été vérifié

Tableaux `dsfr-data-a11y` avant/après : 8→7, 10→9, 20→19 lignes sur DECP ; 3→2 sur la nature juridique Rappel Conso, parts 14 402 / 2 178 égales à la fiche d'audit.

### Contournement actuel

`where="champ is not null"` statique sur la source agrégée ; il se combine en AND avec les filtres de `dsfr-data-context`.

### Demande

—

### Critères d'acceptation

- [ ] `drop-null` sur source et query ; ou libellé « Non renseigné » par défaut (AM-005).

---

## PG-018 — `group-by` client produit un groupe `null` que `count` inclut

**Priorité** P2 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Fusionner avec PG-015
**Labels suggérés** : `enhancement, dx`, `severity:moyenne`, `dsfr-data-query`, `dsfr-data-kpi`
**Rencontré sur** 3 page(s) : qualite-tourisme, tourisme-et-handicap, annuaire-services-dgfip

### Constat

146 lignes sans département forment un groupe null : le KPI « départements couverts » affichait 100 au lieu de 99. Pendant client de PG-015 (côté serveur).

### Impact de l'erreur ou du manque

Idem côté client.

### Objectif métier de la correction

Idem.

### Pérennité et reproductibilité du besoin

Idem.

### Comment ça a été vérifié

KPI 100→99 (QT), 98→97 (T&H), 107→106 (DGFiP).

### Contournement actuel

`where="champ:isnotnull"` sur la query (opérateur vérifié dans `filter-translator.ts`).

### Demande

—

### Critères d'acceptation

- [ ] Couvert par PG-015.

---

## BUG-003 — Les graphiques cartographiques journalisent une erreur de parsing à chaque chargement

**Priorité** P2 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Accepter
**Labels suggérés** : `bug`, `severity:basse`, `dsfr-data-chart`
**Rencontré sur** 2 page(s) : prix-des-carburants, fiscalite-locale

### Constat

Un `dsfr-data-chart` de type cartographique (`map`, `map-reg`) émet en console « Erreur lors du parsing des données data: SyntaxError: "undefined" is not valid JSON » à chaque chargement de page. La carte s'affiche correctement une fois les données arrivées : le composant DSFR Chart est manifestement instancié avec un attribut `data` encore indéfini, avant la première émission de la source. Sans conséquence fonctionnelle, mais une erreur console permanente masque les vraies — et elle se multiplie : la page Fiscalité locale, qui porte deux cartes, en produit quatre.

### Impact de l'erreur ou du manque

Une erreur console à chaque chargement d'une carte DSFR Chart ; bruit qui masque les vraies erreurs.

### Objectif métier de la correction

Console propre.

### Pérennité et reproductibilité du besoin

Structurel.

### Comment ça a été vérifié

Reproduit sur une page minimale ne contenant qu'une source et un `dsfr-data-chart type="map-reg"` : une erreur, systématique. Confirmé sur `type="map"` (page Fiscalité locale, 4 occurrences pour 2 cartes). Les graphiques `bar`, `line` et `pie` des autres pages n'en produisent aucune.

### Contournement actuel

Aucun ; l'erreur est cosmétique.

### Demande

Ne créer le composant `map-chart` qu'une fois les données disponibles, ou passer un tableau vide plutôt qu'`undefined`.

### Critères d'acceptation

- [ ] Aucune erreur console au chargement d'un `type="map"`/`map-reg`/`map-monde`.

---

## AM-033 — Le tableau `dsfr-data-a11y` affiche les flottants bruts

**Priorité** P2 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement`, `severity:basse`, `dsfr-data-a11y`
**Rencontré sur** 1 page(s) : prix-des-carburants

### Constat

Le tableau équivalent sous le graphique des prix par région rend « 2.2665920000000006 » là où le graphique dit 2,27. Un lecteur d'écran lira seize chiffres. Le formateur `fr-FR` existe (il sert au KPI et à `{{champ:number}}` des templates), il n'est pas appliqué ici.

### Impact de l'erreur ou du manque

Le tableau d'accessibilité lit « 2.2665920000000006 » à un lecteur d'écran.

### Objectif métier de la correction

Que l'équivalent accessible soit aussi lisible que le graphique.

### Pérennité et reproductibilité du besoin

Structurel : toute moyenne.

### Comment ça a été vérifié

Navigateur : `dsfr-data-a11y tbody tr` première ligne « Corse | 2.2665920000000006 | 126 ».

### Contournement actuel

Aucun déclaratif ; arrondir en amont demanderait un `dsfr-data-query` avec une fonction d'arrondi, qui n'existe pas.

### Demande

Formater les nombres du tableau a11y comme le graphique (même locale, mêmes décimales), ou exposer un attribut `decimals`.

### Critères d'acceptation

- [ ] Les nombres du tableau a11y passent par le même formateur fr-FR que le graphique, mêmes décimales.

---

## AM-036 — Les templates ne formatent pas les dates

**Priorité** P2 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement`, `severity:basse`, `dsfr-data-display`, `dsfr-data-map-popup`
**Rencontré sur** 2 page(s) : fermeture-reseau-cuivre, bofip

### Constat

`{{champ:number}}` existe, `{{champ:date}}` non : les dates ISO s'affichent brutes (« 2028-01-31 », « 2012-09-12 ») dans les cartes et les panneaux. `formatDate` existe pourtant dans `@dsfr-data/shared`.

### Impact de l'erreur ou du manque

Dates ISO brutes dans les fiches (« 2028-01-31 ») ; contournable en ODSQL seulement (FP-003).

### Objectif métier de la correction

Un format de date natif, indépendant du fournisseur.

### Pérennité et reproductibilité du besoin

Structurel.

### Comment ça a été vérifié

Cartes des communes du réseau cuivre : « Fermeture technique : 2028-01-31 ». Source : `formatTemplateValue` ne connaît que `number`.

### Contournement actuel

Côté Opendatasoft : `date_format()` dans le `select` de l'export (voir FP-003). Côté client : aucun.

### Demande

Un format `:date` (JJ/MM/AAAA) et `:datetime` dans `resolveTemplateExpression`, branchés sur `formatDate`.

### Critères d'acceptation

- [ ] `{{champ:date}}` → JJ/MM/AAAA, `{{champ:datetime}}` → JJ/MM/AAAA HH:mm, via `formatDate` de shared ; valeur invalide → « — ».

---

## AM-040 — Pas de format de jonction pour les champs tableau dans les templates

**Priorité** P2 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement`, `severity:basse`, `dsfr-data-display`, `dsfr-data-map-popup`
**Rencontré sur** 3 page(s) : annuaire-services-dgfip, prix-des-carburants, entreprise-patrimoine-vivant

### Constat

`{{public}}` sur un tableau rend « particuliers,professionnels » (`String(array)`, sans espace) ; le portail affiche « Particuliers et Professionnels ».

### Impact de l'erreur ou du manque

Un champ tableau s'affiche « a,b,c » sans espace ; le portail affiche « a et b ».

### Objectif métier de la correction

Rendre lisibles les champs multivalués, très fréquents sur Opendatasoft.

### Pérennité et reproductibilité du besoin

Structurel : les tableaux sont le format natif des multivalués ODS.

### Comment ça a été vérifié

Panneau du buraliste « LE PARIS » (Noyon) : « particuliers,professionnels » ; `services_service` sur Prix des carburants idem.

### Demande

`{{champ:join}}` ou `{{champ:join(" et ")}}` dans `resolveTemplateExpression`.

### Critères d'acceptation

- [ ] `{{champ:join}}` → « a, b, c » ; `{{champ:join(" et ")}}` → séparateur libre.

---

## AM-007 — Pas de conditionnelle dans les templates : les liens optionnels deviennent un défaut d'accessibilité

**Priorité** P2 · **Effort estimé** M (un à trois jours) · **Décision proposée** Fusionner avec AM-039
**Labels suggérés** : `enhancement`, `severity:moyenne`, `dsfr-data-display`
**Rencontré sur** 8 page(s) : catalogue, qualite-tourisme, tourisme-et-handicap, restauration-notre-dame, entreprise-patrimoine-vivant, annuaire-services-dgfip, centres-controle-technique, rappelconso

### Constat

Le moteur de template gère `{{champ}}`, `{{champ|défaut}}`, `{{champ:number}}` et les chemins pointés, mais pas de conditionnelle. Sur la page catalogue, cela obligeait seulement à précalculer les données — un déplacement de complexité acceptable. Les trois pages d'annuaire du lot 2 en montrent la vraie conséquence : `site_web` est vide pour une partie des établissements, et `<a href="{{site_web}}">` produirait alors un lien vide, qui pointe vers la page courante et qu'un lecteur d'écran annonce comme un lien valide. Sur la page Tourisme & Handicap, consacrée à l'accessibilité, l'ironie est complète.

### Impact de l'erreur ou du manque

Voir AM-039 : lien vide annoncé comme valide par un lecteur d'écran.

### Objectif métier de la correction

Idem AM-039.

### Pérennité et reproductibilité du besoin

Idem.

### Comment ça a été vérifié

Champ `site_web` absent d'une partie des enregistrements des trois jeux d'annuaire. Le contournement retenu — afficher l'URL en texte plutôt qu'en lien — est visible sur les cartes et les panneaux de détail des trois pages.

### Contournement actuel

Précalculer en données quand c'est possible (page catalogue), ou renoncer au lien et afficher la valeur en texte (pages d'annuaire). Aucune des deux solutions ne restitue un lien cliquable quand la valeur existe.

### Demande

Au minimum, une conditionnelle de présence (`{{#si champ}}…{{/si}}`) pour envelopper un fragment. À défaut, un mécanisme dédié aux liens optionnels, le cas étant fréquent dans les annuaires publics.

### Critères d'acceptation

- [ ] Couvert par les critères d'AM-039.

---

## AM-015 — Cliquer un objet de la carte ne filtre pas les autres vues

**Priorité** P2 · **Effort estimé** M (un à trois jours) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement`, `severity:moyenne`, `dsfr-data-map-layer`
**Rencontré sur** 1 page(s) : restauration-notre-dame

### Constat

Opendatasoft offre `refine-on-click-context`, `refine-on-click-context-field` et `refine-on-click-map-field` : cliquer un objet de la carte pose un filtre sur le contexte, donc sur toutes les vues de la page. `dsfr-data-map-layer` n'a pas d'équivalent — un clic ouvre une popup ou un panneau, il n'émet aucune commande vers la source. Sur une cartographie d'annuaire, c'est l'interaction attendue : je clique un point, la liste et les compteurs se recentrent dessus.

### Impact de l'erreur ou du manque

Cliquer un objet de la carte n'affine pas les autres vues, contrairement au `refine-on-click` d'Opendatasoft ; les annuaires y perdent leur interaction principale.

### Objectif métier de la correction

La carte comme filtre.

### Pérennité et reproductibilité du besoin

Structurel : tout annuaire cartographié.

### Comment ça a été vérifié

Attributs `refine-on-click-*` présents sur la couche entreprises de la page d'origine. Aucun attribut correspondant dans la référence de `dsfr-data-map-layer`, et aucun événement de commande émis au clic (la couche n'émet que vers le compagnon popup).

### Contournement actuel

Aucun sans JavaScript.

### Demande

Un attribut du type `refine-on-click="champ"` sur la couche, qui émettrait la même commande `where` que les facettes vers la source amont.

### Critères d'acceptation

- [ ] `refine-on-click="champ"` sur la couche émet la commande `where champ = valeur` vers l'amont, avec un `whereKey` stable, et un tag supprimable apparaît.

---

## AM-022 — La discrétisation d'une choroplèthe n'est pas paramétrable

**Priorité** P2 · **Effort estimé** M (un à trois jours) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement`, `severity:moyenne`, `dsfr-data-chart`
**Rencontré sur** 1 page(s) : fiscalite-locale

### Constat

`ods-color-gradient` expose le nombre de classes (`nb-classes`), les couleurs de début et de fin (`low`, `high`) et la méthode de discrétisation. `dsfr-data-chart type="map"` applique un dégradé continu qu'on ne paramètre pas : ni seuils, ni quantiles, ni nombre de paliers, ni palette. Sur des taux d'imposition dont la distribution est resserrée, un dégradé linéaire écrase les écarts que des quantiles feraient ressortir. Lot 9 : la choroplèthe communale de Fiscalité locale (698 contours en `geoshape fill-field`) confirme — quantiles imposés par `quantileBreaks(values, palette.length)`, aucune légende dans le DOM, là où l'original a 4 classes égales, une palette par taxe et une légende chiffrée.

### Impact de l'erreur ou du manque

Choroplèthes en quantiles imposés, sans légende, là où l'original a des classes et une légende chiffrée.

### Objectif métier de la correction

Une choroplèthe paramétrable et lisible.

### Pérennité et reproductibilité du besoin

Structurel : toute carte thématique.

### Comment ça a été vérifié

Carte « taux moyen TFB par département » : légende continue de 21,21 à 63,2 %, la quasi-totalité des départements dans une nuance indiscernable. Aucun attribut de la référence de `dsfr-data-chart` ne concerne la discrétisation ; `selected-palette` n'agit que sur les séries catégorielles.

### Contournement actuel

Aucun. On peut pré-calculer des classes en amont et passer à un rendu catégoriel, mais on perd la légende continue.

### Demande

Exposer sur les types cartographiques le nombre de classes et la méthode (linéaire, quantiles, seuils manuels), à l'image de `ods-color-gradient`.

### Critères d'acceptation

- [ ] `classes="4"`, `method="equal|quantile|manual"`, `breaks="…"` sur `type="map"` et `geoshape fill-field`, avec légende chiffrée rendue.

---

## AM-039 — Conditionnelle par CSS faute de conditionnelle de template

**Priorité** P2 · **Effort estimé** M (un à trois jours) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement`, `severity:moyenne`, `dsfr-data-display`, `dsfr-data-map-popup`
**Rencontré sur** 5 page(s) : qualite-tourisme, tourisme-et-handicap, annuaire-services-dgfip, entreprises-restauration-notre-dame, entreprise-patrimoine-vivant

### Constat

Une valeur interpolée dans un attribut (`class="odv-picto--{{champ|absent}}"`, `href="{{champ|}}"`, `data-intitule` + `{{champ|}}`) et une règle CSS (`:empty`, `[href=""]`, `:has()`) font le travail d'un `ng-if`, sans JavaScript. Mais c'est une convention à connaître, et les intitulés passent en `::before`.

### Impact de l'erreur ou du manque

Sans conditionnelle, un champ absent produit un lien vide (défaut d'accessibilité) ou une rubrique orpheline ; le contournement CSS d'attribut fonctionne mais doit être connu.

### Objectif métier de la correction

Écrire une fiche avec des champs optionnels sans convention cachée.

### Pérennité et reproductibilité du besoin

Structurel : toute fiche d'annuaire. Rencontré sur 8 pages (avec AM-007).

### Comment ça a été vérifié

Pictos handicap (Oui/Non/null → 3, 0 badges), rubriques DGFiP (SIP Beaune 5 visibles vs buraliste 3), lien vide de « BEST HOTEL » en `display:none`.

### Contournement actuel

Le motif ci-dessus, documenté dans `site.css` (bloc « Annuaires (lot 9) »).

### Demande

`{{#if champ}}…{{/if}}` ou un format `{{champ:link}}` / `{{champ:mailto}}`.

### Critères d'acceptation

- [ ] `{{#if champ}}…{{/if}}` dans `dsfr-data-display` et `dsfr-data-map-popup`, sans réévaluation de la valeur substituée (pas d'injection).
- [ ] `{{champ:link}}` rend `<a href>` si valeur http, texte sinon, rien si vide.

---

## LIM-009 — Pas de légende de carte

**Priorité** P2 · **Effort estimé** M (un à trois jours) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement`, `severity:moyenne`, `dsfr-data-map-layer`
**Rencontré sur** 4 page(s) : annuaire-services-dgfip, fermeture-reseau-cuivre, plan-de-relance, fiscalite-locale

### Constat

`color-map` colore les points mais rien ne décrit la correspondance ; la légende est une liste HTML écrite à la main, à maintenir à part du `color-map`.

### Impact de l'erreur ou du manque

Une carte colorée par `color-map` n'a pas de légende : on écrit une liste HTML à maintenir à part.

### Objectif métier de la correction

Une légende dérivée du mapping, toujours juste.

### Pérennité et reproductibilité du besoin

Structurel : toute carte catégorielle.

### Comment ça a été vérifié

grep « legend » vide dans `dsfr-data-map*.ts` (0.20.0 et 0.21.0).

### Contournement actuel

Liste DSFR statique sous la carte.

### Demande

Un attribut `legend` sur la couche (ou un composant `dsfr-data-map-legend`) dérivé de `color-map`.

### Critères d'acceptation

- [ ] `legend` sur la couche rend une liste DSFR des paires valeur/couleur de `color-map`, plus la couleur de repli si des valeurs n'y sont pas.

---

## AM-001 — Un `dsfr-data-facets` ne peut piloter qu'une seule source

**Priorité** P2 · **Effort estimé** L (conception + développement) · **Décision proposée** À discuter avec AM-043
**Labels suggérés** : `enhancement`, `severity:haute`, `dsfr-data-facets`, `dsfr-data-context`
**Rencontré sur** 2 page(s) : decp-augmente, fiscalite-locale

### Constat

C'est le dernier obstacle réel pour un tableau de bord bâti sur plusieurs agrégations serveur. Les facettes émettent leur commande `where` vers leur source amont uniquement. `dsfr-data-context` sait diffuser à N sources, mais exige qu'on fournisse soi-même l'interface ET les valeurs : `dsfr-data-context-filter` lit un `<select>` ou un `<input>` (packages/core/src/components/dsfr-data-context-filter.ts:283), il ne sait pas s'abonner à un composant de facettes. Les deux mécanismes ne se composent pas. La page Fiscalité locale en donne la forme la plus visible : ses cartes s'appuient sur des agrégats départementaux et son tableau sur les 174 668 lignes brutes en pagination serveur ; filtrer le tableau sur un département ne recadre pas les cartes, et inversement. La page d'origine, elle, partage un contexte : tout se refiltre ensemble. Précision du lot 9 : `dsfr-data-context-filter` n'a aucun opérateur de recherche textuelle (`OPERATORS` = eq, in, lt, gte, between, month-of, year-of, lt-day-after, last-n-days, current-year), donc une facette à des milliers de valeurs (nomAcheteur sur DECP) n'a d'équivalent qu'une liste écrite en dur des 20 premières.

### Impact de l'erreur ou du manque

Une barre de facettes serveur ne pilote qu'une source ; pour N agrégations il faut abandonner les facettes et repartir de zéro avec un contexte.

### Objectif métier de la correction

Réutiliser `server-facets` (valeurs, compteurs, recalcul contextuel — déjà au niveau d'Opendatasoft) pour piloter N sources.

### Pérennité et reproductibilité du besoin

Structurel. Partiellement couvert par AM-043 si les filtres de contexte savent se peupler.

### Comment ça a été vérifié

Sur DECP, les quatre graphiques s'appuient sur quatre agrégations distinctes. Avec des facettes, une seule se refiltre. Avec un contexte, les quatre se refiltrent mais les valeurs des trois listes déroulantes sont écrites à la main.

### Contournement actuel

Écrire les valeurs de filtre en dur dans des `<select>` DSFR pilotés par `dsfr-data-context`. Elles ne suivent pas l'évolution du jeu de données.

### Demande

Soit un attribut `apply-to`/`context` sur `dsfr-data-facets` pour diffuser à N sources ; soit un `dsfr-data-context-filter` capable de peupler ses valeurs depuis `/facets` et de rendre une UI de facettes.

### Critères d'acceptation

- [ ] `<dsfr-data-facets apply-to="src-a src-b">` (ou `context="ctx"`) émet ses `where` vers toutes les cibles, avec un `whereKey` stable par facette.
- [ ] Les compteurs de facettes restent calculés sur une seule source déclarée.

---

## AM-003 — `server-facets` pourrait découvrir seul les champs de facettes

**Priorité** P3 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement`, `severity:moyenne`, `dsfr-data-facets`
**Rencontré sur** 4 page(s) : decp-augmente, fiscalite-locale, rappelconso, prix-controle-technique

### Constat

En mode `server-facets`, l'attribut `fields` est obligatoire (pas d'auto-détection). Or l'endpoint `/facets` d'Opendatasoft renvoie déjà la liste des facettes déclarées au back-office avec leurs valeurs : c'est exactement ce dont `ods-facets` se sert pour ne demander aucune configuration.

### Impact de l'erreur ou du manque

`fields` obligatoire en `server-facets` alors que `/facets` renvoie déjà la liste.

### Objectif métier de la correction

Zéro configuration, comme `ods-facets`.

### Pérennité et reproductibilité du besoin

Récurrent.

### Comment ça a été vérifié

`GET /api/explore/v2.1/catalog/datasets/decp_augmente/facets` renvoie 7 facettes nommées (source, formeprix, nature, procedure, datenotification, natureobjetmarche, nomacheteur) sans qu'on ait rien précisé.

### Contournement actuel

Nommer les champs à la main — coût faible, mais c'est la dernière ligne qui sépare de l'équivalence stricte avec `ods-facets`.

### Demande

Rendre `fields` facultatif en mode `server-facets` : sans lui, exposer les facettes que l'endpoint renvoie.

### Critères d'acceptation

- [ ] Sans `fields`, `server-facets` expose toutes les facettes renvoyées par `/facets`.

---

## AM-004 — Pas d'agrégat « valeurs distinctes »

**Priorité** P3 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement`, `severity:moyenne`, `dsfr-data-kpi`, `dsfr-data-query`
**Rencontré sur** 1 page(s) : plan-de-relance

### Constat

Les fonctions d'agrégation sont avg, sum, count, min, max, first, last (packages/core/src/utils/aggregations.ts:9). Pas de `distinct`. Pour un KPI « N départements concernés », `value="nom_departement:distinct"` est ignoré en silence.

### Impact de l'erreur ou du manque

`value="champ:distinct"` est ignoré en silence.

### Objectif métier de la correction

Un KPI « N départements couverts » en un attribut.

### Pérennité et reproductibilité du besoin

Récurrent.

### Comment ça a été vérifié

Première écriture de la page Plan de relance : le KPI restait vide, sans message.

### Contournement actuel

Intercaler un `dsfr-data-query group-by="nom_departement"` et compter ses lignes avec `value="count"`. Le pipeline reste lisible.

### Demande

Ajouter `distinct` (ou `count-distinct`) à la grammaire commune, et signaler une fonction inconnue au lieu de l'ignorer.

### Critères d'acceptation

- [ ] `distinct` dans la grammaire commune ; une fonction inconnue déclenche `reportConfigError`.

---

## AM-017 — Aucun fond de carte neutre parmi les préréglages

**Priorité** P3 · **Effort estimé** S (moins d'un jour) · **Décision proposée** À discuter (choix éditorial souverain)
**Labels suggérés** : `enhancement`, `severity:moyenne`, `dsfr-data-map`
**Rencontré sur** 8 page(s) : restauration-notre-dame, plan-de-relance, qualite-tourisme, tourisme-et-handicap, prix-des-carburants, entreprise-patrimoine-vivant, annuaire-services-dgfip, centres-controle-technique

### Constat

Les préréglages sont `ign-plan`, `ign-ortho`, `ign-cadastre`, `osm-fr`, `osm-standard`, `opentopomap` — tous très détaillés. `carto-positron`, le fond clair et neutre, est déprécié et redirige vers `ign-plan`. Or une carte thématique a besoin d'un fond qui s'efface : sur `ign-plan`, les aplats régionaux de la page Notre-Dame sont quasi invisibles et les grappes de points se disputent l'attention avec le réseau routier. Les cartes d'origine du portail utilisent `jawg.light`, précisément pour cette raison.

### Impact de l'erreur ou du manque

Les fonds IGN détaillés concurrencent la donnée thématique.

### Objectif métier de la correction

Un fond neutre lisible.

### Pérennité et reproductibilité du besoin

Récurrent.

### Comment ça a été vérifié

Couche régions rendue (26 polygones confirmés par `getRenderedCount()`) mais illisible à l'écran sur `ign-plan`, même en remontant l'opacité. Le préréglage `carto-positron` émet un avertissement de dépréciation et bascule sur `ign-plan`.

### Contournement actuel

Une URL de tuiles personnalisée avec `tiles-attribution` — mais on sort alors des fonds souverains, ce qui annule l'avantage principal de la bibliothèque sur ce terrain.

### Demande

Un préréglage clair et neutre, souverain de préférence (l'IGN publie un style `plan-ign-clair`), pour que la donnée thématique reste lisible.

### Critères d'acceptation

- [ ] Un préréglage `ign-clair` (style plan IGN clair) parmi les fonds souverains.

---

## PG-014 — L'adaptateur Opendatasoft entoure `group-by` d'accents graves : une expression comme `year(…)` vaut un HTTP 400

**Priorité** P3 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement, dx`, `severity:moyenne`, `dsfr-data-source`
**Rencontré sur** 2 page(s) : bofip, aide-publique-developpement

### Constat

`group-by="year(debut_de_validite) as annee"` part en `group_by=\`year(debut_de_validite) as annee\`` : l'adaptateur protège la valeur comme un nom de champ, et l'API renvoie 400. ODSQL accepte pourtant les fonctions dans `group_by` (avec l'alias déclaré là, cf. PG-008). Grouper par un champ date brut donne des libellés ISO complets (« 2018-01-01T00:00:00+00:00 »).

### Impact de l'erreur ou du manque

`year(…)` dans `group-by` → 400 ; contournement trouvé (fonction dans `select`).

### Objectif métier de la correction

Ne pas protéger une expression.

### Pérennité et reproductibilité du besoin

Récurrent sur les dates.

### Comment ça a été vérifié

Requête émise sur bofip : `records?select=count(*)+as+nb&group_by=\`year(debut_de_validite)+as+annee\`` → 400 ; la même sans accents graves → 15 lignes.

### Contournement actuel

Source générique (`url` + `params` + `transform="results"`) pour l'agrégat concerné — au prix de l'auth automatique par en-tête et, surtout, des commandes de contexte : une source générique n'écoute pas `dsfr-data-context`, le graphique ne suit plus les filtres (vu sur APD). Mieux (lot 9, comptabilité générale) : garder le champ brut dans `group-by` et mettre la fonction dans `select` — `group-by="categorie, annee" select="year(annee) as an, sum(…)"` passe l'adaptateur (200, 20 à 60 groupes).

### Demande

Ne pas protéger une valeur de `group-by` qui contient une parenthèse, ou accepter un `group-by-raw`.

### Critères d'acceptation

- [ ] Une valeur de `group-by` contenant une parenthèse n'est pas entourée d'accents graves.

---

## AM-009 — `fit-bounds` pourrait clipper automatiquement quand `insets` est déclaré

**Priorité** P3 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement`, `severity:basse`, `dsfr-data-map`
**Rencontré sur** 1 page(s) : plan-de-relance

### Constat

Avec des données ultramarines, `fit-bounds` seul embrasse la Polynésie et la Nouvelle-Calédonie : la métropole devient un point au milieu de l'Atlantique. Il faut ajouter `max-bounds` à la main. Or déclarer `insets="drom"` dit déjà que l'outre-mer est traité à part.

### Impact de l'erreur ou du manque

Sans `max-bounds`, un jeu avec DROM dézoome sur l'Atlantique ; avec, BUG-004.

### Objectif métier de la correction

Que `insets` suffise à un cadrage sensé.

### Pérennité et reproductibilité du besoin

Structurel.

### Comment ça a été vérifié

Première version de la page Plan de relance, capture d'écran à l'appui : vue centrée sur l'océan.

### Contournement actuel

`max-bounds="41,-5.5,51.5,10"`, documenté mais non évident.

### Demande

Quand `insets` est renseigné, restreindre par défaut le calcul de `fit-bounds` aux points hors territoires d'encart.

### Critères d'acceptation

- [ ] Avec `insets` déclaré et sans `max-bounds`, `fit-bounds` exclut les points des territoires d'encart.

---

## AM-010 — La rangée d'encarts territoriaux est à l'étroit

**Priorité** P3 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Fusionner avec AM-032
**Labels suggérés** : `enhancement`, `severity:basse`, `dsfr-data-map-inset`
**Rencontré sur** 1 page(s) : plan-de-relance

### Constat

Les cinq mini-cartes DROM et leurs libellés se tassent sur la gauche du conteneur au lieu de s'étaler sur sa largeur ; les libellés se chevauchent.

### Impact de l'erreur ou du manque

Voir AM-032.

### Objectif métier de la correction

Idem.

### Pérennité et reproductibilité du besoin

Idem.

### Comment ça a été vérifié

Capture de `dsfr-data-map` en 896 px de large : les encarts occupent les 330 premiers pixels.

### Contournement actuel

Aucun sans CSS externe.

### Demande

Répartir les encarts sur la largeur disponible.

### Critères d'acceptation

- [ ] Couvert par AM-032.

---

## AM-014 — Pas de moyen de replier des colonnes parallèles en une seule facette

**Priorité** P3 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement`, `severity:basse`, `dsfr-data-facets`, `dsfr-data-unpivot`
**Rencontré sur** 1 page(s) : tourisme-et-handicap

### Constat

Le jeu Tourisme & Handicap porte quatre colonnes booléennes parallèles — `handicap_auditif`, `handicap_mental`, `handicap_moteur`, `handicap_visuel` — qui décrivent la même dimension. En faire une facette « handicap couvert » demanderait de les replier en un champ multi-valeurs. `dsfr-data-unpivot` bascule des colonnes en lignes, ce qui multiplierait les établissements au lieu de les enrichir.

### Impact de l'erreur ou du manque

Quatre colonnes booléennes parallèles ne font pas une facette.

### Objectif métier de la correction

Une facette « handicap couvert » sans prétraitement.

### Pérennité et reproductibilité du besoin

Récurrent sur les jeux à colonnes parallèles.

### Comment ça a été vérifié

Le jeu fournit heureusement une colonne de résumé `handicaps_attribues`, déjà en tableau, qui rend le repliage inutile ici. Sans elle, la facette n'aurait pas été reproductible sans JavaScript.

### Contournement actuel

S'appuyer sur une colonne de résumé quand le producteur en fournit une — ce qui est le cas ici, et ce que fait aussi la page d'origine.

### Demande

Une option de repliage de colonnes en champ multi-valeurs (par exemple `fold="handicap_*:handicaps"` sur `dsfr-data-normalize`), le motif « une colonne booléenne par modalité » étant courant dans les données publiques.

### Critères d'acceptation

- [ ] `fold="handicap_*:handicaps"` sur `dsfr-data-normalize` produit un tableau des noms de colonnes vraies.

---

## AM-019 — Un KPI ne sait pas filtrer sa source

**Priorité** P3 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement`, `severity:basse`, `dsfr-data-kpi`
**Rencontré sur** 1 page(s) : comptabilite-generale

### Constat

`dsfr-data-kpi` agrège tout ce que sa source lui transmet. Pour « l'actif en 2025 », il faut isoler une ligne parmi six : cela passe par un `dsfr-data-query where="categorie:eq:Actif"` par KPI. Trois KPI côte à côte coûtent donc trois transformateurs, là où l'original écrit une expression.

### Impact de l'erreur ou du manque

Trois KPI côte à côte coûtent trois queries.

### Objectif métier de la correction

Un KPI conditionnel en une balise.

### Pérennité et reproductibilité du besoin

Récurrent.

### Comment ça a été vérifié

Page comptabilité générale : trois `dsfr-data-query` n'existent que pour alimenter trois KPI. La grammaire `count:champ:valeur` existe mais ne compte que des occurrences ; elle ne sait pas sommer sous condition.

### Contournement actuel

Un `dsfr-data-query where` par KPI. Lisible, mais verbeux.

### Demande

Un attribut `where` sur `dsfr-data-kpi`, ou une grammaire d'agrégation conditionnelle du type `montant:sum:categorie=Actif`.

### Critères d'acceptation

- [ ] `where="categorie:eq:Actif"` sur `dsfr-data-kpi`.

---

## AM-020 — Après un unpivot, les noms de colonnes restent en étiquettes

**Priorité** P3 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement`, `severity:basse`, `dsfr-data-unpivot`
**Rencontré sur** 3 page(s) : prix-des-carburants, signalconso, rappelconso

### Constat

`dsfr-data-unpivot` bascule six colonnes de prix en lignes, mais la colonne `variable` contient les noms techniques : `gazole_prix`, `sp95_prix`… qui se retrouvent tels quels sur l'axe du graphique. `var-format` ne sait reformater qu'à partir des jetons d'un motif (dates, numéros), pas appliquer une table de correspondance.

### Impact de l'erreur ou du manque

Noms techniques sur l'axe après un unpivot.

### Objectif métier de la correction

Étiquettes lisibles.

### Pérennité et reproductibilité du besoin

Récurrent.

### Comment ça a été vérifié

Premier rendu du graphique « prix moyen par carburant » : axe en `gazole_prix`, `sp98_prix`… Corrigé par un `dsfr-data-normalize replace-fields` de six règles.

### Contournement actuel

Un `dsfr-data-normalize replace-fields="carburant:gazole_prix:Gazole | …"` en aval — une balise et autant de règles que de colonnes dépliées.

### Demande

Un dictionnaire d'étiquettes sur l'unpivot lui-même, par exemple `var-labels="gazole_prix:Gazole | sp95_prix:SP95"`.

### Critères d'acceptation

- [ ] `var-labels="gazole_prix:Gazole | …"` sur `dsfr-data-unpivot`.

---

## AM-021 — Pas de moyen déclaratif d'afficher la fraîcheur des données

**Priorité** P3 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement`, `severity:basse`, `dsfr-data-chart`
**Rencontré sur** 1 page(s) : prix-des-carburants

### Constat

Le jeu s'appelle « flux instantané » et porte une date de mise à jour par carburant. Rien ne permet d'afficher « données à jour au … » : `databox-date` attend une chaîne fixe, pas une valeur lue dans les données. Sur une visualisation temps réel, c'est l'information qui manque le plus.

### Impact de l'erreur ou du manque

Impossible d'afficher « données à jour au … » depuis la donnée.

### Objectif métier de la correction

Afficher la fraîcheur.

### Pérennité et reproductibilité du besoin

Récurrent sur les flux.

### Comment ça a été vérifié

Attribut `databox-date` de `dsfr-data-chart` : chaîne statique. Aucun composant n'expose le maximum d'un champ date autrement qu'en KPI dédié, dont le format n'affiche pas de date.

### Contournement actuel

Écrire la date à la main, donc la laisser vieillir.

### Demande

Accepter une expression de champ dans `databox-date` (par exemple `databox-date-field="gazole_maj:max"`), et un format date pour les KPI.

### Critères d'acceptation

- [ ] `databox-date-field="champ:max"` lit la valeur dans la source et la formate en date.

---

## AM-023 — L'attribut `name` change de forme selon le type de graphique

**Priorité** P3 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement`, `severity:basse`, `dsfr-data-chart`
**Rencontré sur** 2 page(s) : fiscalite-locale, prix-des-carburants

### Constat

Sur les graphiques cartésiens, `name` attend un tableau JSON : `name='["Série 1"]'`. Sur les types cartographiques, la même écriture s'affiche telle quelle dans l'encadré — crochets et guillemets compris — et il faut passer une chaîne simple. La documentation ne mentionne que la forme tableau.

### Impact de l'erreur ou du manque

`name` attend un tableau JSON ici, une chaîne là.

### Objectif métier de la correction

Une grammaire cohérente.

### Pérennité et reproductibilité du besoin

Une fois.

### Comment ça a été vérifié

Carte de la fiscalité locale : `name='["Taux moyen TFB (%)"]'` affiche littéralement `["Taux moyen TFB (%)"]` en titre de série ; `name="Taux moyen TFB (%)"` affiche le libellé attendu. Capture avant/après à l'appui.

### Contournement actuel

Chaîne simple pour les cartes, tableau JSON pour le reste.

### Demande

Accepter les deux formes partout, ou documenter la différence dans la référence de l'attribut.

### Critères d'acceptation

- [ ] Les deux formes acceptées sur tous les types, documentées.

---

## AM-024 — Pas de moyen d'agréger une date en facette (par année)

**Priorité** P3 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement`, `severity:basse`, `dsfr-data-facets`, `dsfr-data-normalize`
**Rencontré sur** 1 page(s) : entreprise-patrimoine-vivant

### Constat

Le portail déclare une facette `date_de_labellisation` à sept valeurs : Opendatasoft sait replier une date sur son année dans ses facettes déclarées. Côté dsfr-data, une facette sur un champ date produirait autant de valeurs que de dates distinctes. Extraire l'année demanderait une manipulation de chaîne, or `dsfr-data-normalize compute` ne gère que l'arithmétique et la concaténation.

### Impact de l'erreur ou du manque

Une facette sur une date fait autant de valeurs que de jours.

### Objectif métier de la correction

Facette par année comme Opendatasoft.

### Pérennité et reproductibilité du besoin

Récurrent.

### Comment ça a été vérifié

Endpoint `/facets` d'EPV : `date_de_labellisation` renvoie 7 valeurs. Le champ brut est une date pleine.

### Contournement actuel

Aucun sans pré-agrégation serveur — possible avec `year(...)` dans un `group_by`, mais pas pour alimenter une facette côté client.

### Demande

Une granularité de facette sur les champs date (`granularity="year"`), ou une fonction d'extraction dans `compute`.

### Critères d'acceptation

- [ ] `granularity="year|month"` par champ dans `dsfr-data-facets`.

---

## AM-028 — Le séparateur de valeurs multiples entre en conflit avec la grammaire des attributs

**Priorité** P3 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement`, `severity:basse`, `dsfr-data-normalize`
**Rencontré sur** 1 page(s) : rappelconso

### Constat

Le champ `risques_encourus` de Rappel Conso vaut `blessures|incendie` : des valeurs séparées par une barre verticale dans une chaîne. C'est exactement le cas prévu par `dsfr-data-normalize split="champ:séparateur"` — sauf que la barre verticale est aussi le séparateur d'entrées de la grammaire d'attributs de la bibliothèque (`labels="a:A | b:B"`). Aucun échappement n'est documenté.

### Impact de l'erreur ou du manque

Le séparateur `|` d'un champ entre en conflit avec la grammaire de `split`.

### Objectif métier de la correction

Éclater les valeurs `a|b`.

### Pérennité et reproductibilité du besoin

Récurrent sur Rappel Conso.

### Comment ça a été vérifié

Valeurs du champ inspectées à l'API : `blessures|incendie`, `chimique|allergene`. Le champ est finalement affiché tel quel plutôt que facetté.

### Contournement actuel

Aucun de propre. On peut renoncer à la facette, ou pré-traiter la donnée hors de la page.

### Demande

Documenter un échappement (par exemple `\\|`), ou accepter une écriture alternative du séparateur (`split="champ:pipe"`).

### Critères d'acceptation

- [ ] `split="champ:pipe"` ou échappement `\|` documenté.

---

## AM-030 — Pas de valeur par défaut dynamique (« aujourd'hui ») pour un filtre de contexte

**Priorité** P3 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement`, `severity:basse`, `dsfr-data-context-filter`
**Rencontré sur** 1 page(s) : rappel-conso-tableau-de-bord

### Constat

Un filtre s'applique au montage si son UI est déjà remplie, et `url-sync` sait pré-remplir depuis l'URL. Mais rien ne permet de déclarer « la date du jour » comme valeur initiale d'une entrée : une page statique ne connaît pas la date. Sans script, un tableau de bord « au jour J » s'ouvre soit vide (année et mois montrent le total), soit figé sur une date écrite en dur.

### Impact de l'erreur ou du manque

Un tableau de bord « au jour J » s'ouvre vide ou figé sur une date en dur.

### Objectif métier de la correction

Ouvrir sur aujourd'hui sans JavaScript.

### Pérennité et reproductibilité du besoin

Récurrent avec AM-029.

### Comment ça a été vérifié

Chronométrage en navigateur : les sept requêtes partent à +230 ms, toutes avec la clause de date, aucune requête non filtrée préalable. En retirant le script, les compteurs année et mois affichent 18 581 (le total) au chargement. Page : /viz/rappel-conso-tableau-de-bord (reproduction fidèle de la page vivante /pages/rappel-conso-v2/, variante de /viz/rappelconso).

### Contournement actuel

Le même script que AM-029 pose `date.value = aujourd'hui` avant le chargement de dsfr-data ; le filtre trouve une UI remplie au montage et s'applique dès la première requête — une seule salve de sept requêtes, sans double fetch.

### Demande

Un attribut `default` sur `dsfr-data-context-filter` acceptant des littéraux relatifs (`today`, `first-of-month`, `first-of-year`), appliqué à l'UI au montage puis émis par le chemin habituel — cohérent avec l'esprit de `last-n-days` et `current-year`, qui savent déjà calculer « maintenant » côté clause.

### Critères d'acceptation

- [ ] `default="today"` (et `first-of-month`, `first-of-year`) sur `dsfr-data-context-filter` remplit l'UI au montage puis émet par le chemin normal.

---

## AM-035 — Un graphique n'a pas d'état « vide tant qu'aucun filtre n'est posé »

**Priorité** P3 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement`, `severity:basse`, `dsfr-data-chart`
**Rencontré sur** 1 page(s) : impot-sur-le-revenu

### Constat

Sur un jeu où l'agrégat global n'a pas de sens (additionner toutes les cases d'une déclaration de revenus), la page s'ouvre sur une courbe absurde tant que l'utilisateur n'a rien choisi. Le composant dessine ce qu'il reçoit ; rien ne permet de dire « attends un filtre ».

### Impact de l'erreur ou du manque

Une page d'exploration s'ouvre sur un agrégat absurde tant qu'aucun filtre n'est posé.

### Objectif métier de la correction

Un état vide explicite.

### Pérennité et reproductibilité du besoin

Récurrent sur les pages d'exploration.

### Comment ça a été vérifié

Page impot-sur-le-revenu sans paramètre : KPI « pic de déclarants » = max de toutes les cases confondues, courbe sur 19 388 lignes hétérogènes.

### Contournement actuel

Liens d'exemple (`?nom=1AJ`) et texte d'aide ; `url-params` sur les facettes pour que le catalogue pointe directement sur une case.

### Demande

Un attribut `require-filter` (ou `empty-until-filtered`) sur les composants d'affichage, avec un message DSFR à la place du rendu.

### Critères d'acceptation

- [ ] `require-filter` sur les composants d'affichage : message DSFR tant qu'aucun filtre amont n'est actif.

---

## AM-038 — `replace-fields` ne sait pas récrire une valeur qui contient des deux-points, ni par motif

**Priorité** P3 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement`, `severity:basse`, `dsfr-data-normalize`
**Rencontré sur** 1 page(s) : aide-publique-developpement

### Constat

La grammaire `CHAMP:motif:remplacement` réserve les deux-points, et la comparaison est stricte (`===`). Une date ISO (« 2018-01-01T00:00:00+00:00 ») ne peut donc ni être ciblée ni être ramenée à « 2018 » : le motif est coupé au premier deux-points de la valeur. `compute` n'a pas de fonction de sous-chaîne.

### Impact de l'erreur ou du manque

`replace-fields` ne peut ni cibler une valeur avec deux-points ni remplacer par motif.

### Objectif métier de la correction

Récrire une date ISO ou un libellé par regex.

### Pérennité et reproductibilité du besoin

Récurrent.

### Comment ça a été vérifié

Source `_parseReplaceFields` : `indexOf(':')` deux fois puis `normalizedValue === pattern` ; en page, le libellé reste « 2018-01-01T00:00:00+00:00 » après la règle.

### Contournement actuel

Aucun côté client ; côté serveur, `year()` est refusé par l'adaptateur (PG-014).

### Demande

Accepter une expression régulière (`/…/`) dans `replace` et `replace-fields`, ou un séparateur échappable.

### Critères d'acceptation

- [ ] Motif `/regex/` accepté dans `replace` et `replace-fields`, ou séparateur échappable.

---

## AM-042 — `display="champ:radio"` rend une liste déroulante, pas des boutons radio

**Priorité** P3 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement`, `severity:basse`, `dsfr-data-facets`
**Rencontré sur** 1 page(s) : entreprises-restauration-notre-dame

### Constat

Le mode « radio » de `dsfr-data-facets` est un dropdown à choix unique (`_renderRadioGroup`), pas deux boutons radio DSFR en ligne comme le Oui / Non du portail.

### Impact de l'erreur ou du manque

`display="champ:radio"` rend un dropdown, pas des radios.

### Objectif métier de la correction

Des boutons radio DSFR pour un Oui/Non.

### Pérennité et reproductibilité du besoin

Récurrent.

### Comment ça a été vérifié

DOM inspecté : aucun `input[type=radio]` hors panneau déplié.

### Contournement actuel

Cases à cocher.

### Demande

—

### Critères d'acceptation

- [ ] Mode `radio` rend `input[type=radio]` DSFR en ligne.

---

## AM-011 — L'adaptateur Opendatasoft devrait charger par `/exports/json`, pas par 31 requêtes paginées

**Priorité** P3 · **Effort estimé** M (un à trois jours) · **Décision proposée** À discuter (contournement en une ligne)
**Labels suggérés** : `enhancement`, `severity:haute`, `opendatasoft-adapter`, `dsfr-data-source`
**Rencontré sur** 13 page(s) : plan-de-relance, qualite-tourisme, tourisme-et-handicap, restauration-notre-dame, comptabilite-generale, prix-des-carburants, fiscalite-locale, entreprise-patrimoine-vivant, annuaire-services-dgfip, barometre-france-num, signalconso, rappelconso, centres-controle-technique

### Constat

En mode adaptateur, un chargement complet passe par `/records` avec `limit=100` et un `offset` croissant : la boucle de `fetchAll` est strictement séquentielle (packages/core/src/adapters/opendatasoft-adapter.ts:121). Pour 3 080 lignes, cela fait 31 allers-retours l'un après l'autre. Or Opendatasoft expose `/exports/json`, qui renvoie le jeu entier en une requête, accepte `select`, et répond en CORS `*`.

### Impact de l'erreur ou du manque

31 requêtes séquentielles pour 3 080 lignes (31 s) là où `/exports/json` coûte 0,6 s.

### Objectif métier de la correction

Un chargement complet rapide par défaut.

### Pérennité et reproductibilité du besoin

Structurel, mais contournable par `url=` sur l'export.

### Comment ça a été vérifié

Chronométrage en navigateur sur la même page : 31 requêtes, concurrence maximale 1, durée moyenne 931 ms (max 3 721 ms — la pagination profonde se dégrade), 28,9 s passées dans les requêtes contre 37 ms entre elles. Le poids n'y est pour rien : un `select` divisant le transfert par 3,7 n'a fait gagner aucune seconde. La même page basculée sur `/exports/json` : 1 requête, 0,62 s, 185 Ko. Lot 3 : `/exports/json` avec `group_by=postes, year(annee) as an` sur 517 489 lignes renvoie les 264 groupes en 0,50 s.

### Contournement actuel

Écrire la source en mode générique (`url=` vers `/exports/json` + `params` pour le `select`) au lieu du mode adaptateur. On y perd la délégation serveur du `where`/`order-by` — sans conséquence quand toute la page travaille côté client.

### Demande

Quand la source demande un chargement complet (pas de `server-side`, pas de pagination), utiliser `/exports/json` plutôt que la boucle sur `/records`. L'endpoint accepte AUSSI `group_by`, `select` et `where` : il couvre donc à la fois le chargement de lignes et les agrégations, et règle du même coup BUG-001. À défaut, paralléliser les pages une fois `total_count` connu : 8 requêtes concurrentes prennent 0,44 s contre 2,4 s en série.

### Critères d'acceptation

- [ ] Sans `server-side`, l'adaptateur ODS charge par `/exports/json` avec `select`/`where`, et retombe sur `/records` si l'export échoue.

---

## AM-008 — `bbox` ne filtre pas le premier chargement

**Priorité** P3 · **Effort estimé** M (un à trois jours) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement`, `severity:moyenne`, `dsfr-data-map-layer`
**Rencontré sur** 1 page(s) : plan-de-relance

### Constat

La commande `in_bbox` part sur `moveend`/`zoomend` (packages/core/src/components/dsfr-data-map-layer.ts:505). Au chargement, la source a déjà récupéré sa première page sans filtre géographique : sur un gros jeu, les premiers points affichés ne sont pas ceux du viewport.

### Impact de l'erreur ou du manque

En mode `bbox`, le premier chargement rapatrie 100 lignes sans filtre géographique.

### Objectif métier de la correction

Un premier affichage déjà cadré.

### Pérennité et reproductibilité du besoin

Structurel au mode bbox.

### Comment ça a été vérifié

Page de test : au chargement `plan-de-relance/records?limit=100` (sans in_bbox), carte centrée sur Paris mais les 100 cercles rendus étaient hors cadre. Le `in_bbox` n'apparaît qu'après le premier déplacement.

### Contournement actuel

Poser un `where` initial sur la source, ou accepter un premier rendu approximatif.

### Demande

Émettre la commande bbox une fois la carte prête, avant ou à la place du premier fetch de la source.

### Critères d'acceptation

- [ ] La première requête d'une source alimentant une couche `bbox` porte déjà `in_bbox` de la vue initiale.

---

## AM-041 — Un ratio de deux agrégats coûte six balises

**Priorité** P3 · **Effort estimé** M (un à trois jours) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement`, `severity:moyenne`, `dsfr-data-query`, `dsfr-data-join`, `dsfr-data-normalize`
**Rencontré sur** 1 page(s) : entreprise-patrimoine-vivant

### Constat

Un KPI de proportion sur un champ multivalué (« 24 % proposent des produits à moins de 200 € » = count(contains) / total) exige trois `dsfr-data-query` groupées sur une clé constante, deux `dsfr-data-join` et un `compute` : aucun composant ne divise deux agrégats.

### Impact de l'erreur ou du manque

Un KPI de proportion coûte six balises.

### Objectif métier de la correction

Un ratio en une expression.

### Pérennité et reproductibilité du besoin

Récurrent : toute part en %.

### Comment ça a été vérifié

EPV : 24,3 % et 15,9 % = 308/1 267 et 202/1 267 (API) ; suivent les filtres (Arts de la table : 49,2 % et 32,3 %).

### Contournement actuel

`compute="k = 1"` ; `group-by="k"` sur chaque agrégat ; `join on="k"` ; `compute="pct = a / b * 100"`.

### Demande

Une expression `value="a:count / b:count"` sur le KPI, ou un `dsfr-data-query` acceptant une agrégation conditionnelle (`count-if`).

### Critères d'acceptation

- [ ] `value="a:count / b:count"` sur le KPI ou `count-if` sur la query.

---

## AM-013 — L'interface des facettes se rend là où la balise est écrite, pas là où on la veut

**Priorité** P3 · **Effort estimé** M (un à trois jours) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement`, `severity:basse`, `dsfr-data-facets`, `dsfr-data-search`
**Rencontré sur** 8 page(s) : plan-de-relance, qualite-tourisme, tourisme-et-handicap, restauration-notre-dame, prix-des-carburants, entreprise-patrimoine-vivant, annuaire-services-dgfip, centres-controle-technique

### Constat

Le câblage du pipeline se fait par `id`, indépendamment de la position dans le DOM — c'est la bonne propriété. Mais `dsfr-data-facets` et `dsfr-data-search` rendent leur interface à l'endroit exact où la balise est écrite. Sur un tableau de bord à colonne de filtres, ils doivent donc être physiquement dans cette colonne, alors que les `dsfr-data-query` qui les consomment s'écrivent plus haut. L'ordre du fichier cesse de refléter l'ordre du pipeline.

### Impact de l'erreur ou du manque

Les facettes se rendent où la balise est écrite ; mise en page contrainte.

### Objectif métier de la correction

Découpler déclaration et affichage.

### Pérennité et reproductibilité du besoin

Récurrent.

### Comment ça a été vérifié

Constaté sur les quatre pages à colonne de filtres du dépôt. Première écriture de la page Plan de relance : les facettes déclarées dans le bloc de pipeline s'affichaient au-dessus du conteneur, hors de la colonne.

### Contournement actuel

Déclarer les composants d'interface dans le conteneur voulu et les référencer par `id` depuis le bloc de pipeline. Ça marche, mais la lecture du fichier en souffre.

### Demande

Un attribut de rendu délégué (par exemple `render-into="#mon-conteneur"`) qui découplerait le point de déclaration du point d'affichage, comme le `for` de `dsfr-data-a11y` le fait déjà pour sa cible.

### Critères d'acceptation

- [ ] `render-into="#cible"` sur facettes et recherche déplace le rendu sans changer le câblage.

---

## AM-016 — Pas de fond administratif embarqué pour une couche geoshape

**Priorité** P3 · **Effort estimé** M (un à trois jours) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement`, `severity:basse`, `dsfr-data-map`, `dsfr-data-map-layer`
**Rencontré sur** 1 page(s) : restauration-notre-dame

### Constat

Afficher les contours des régions comme repère oblige à charger un jeu externe : 26 polygones, 135 Ko, 4 à 5 s de réponse, pour du décor. Or `dsfr-data-chart type="map-reg"` embarque déjà les géométries administratives françaises pour ses cartes choroplèthes.

### Impact de l'erreur ou du manque

Afficher des contours régionaux comme repère coûte un jeu externe de 135 Ko et 5 s.

### Objectif métier de la correction

Réutiliser les géométries déjà embarquées pour `map-reg`.

### Pérennité et reproductibilité du besoin

Récurrent.

### Comment ça a été vérifié

Couche régions de la page Notre-Dame alimentée par `public.opendatasoft.com/…/georef-france-region/records` : 4,3 à 5,5 s selon les essais, 135 Ko.

### Contournement actuel

Charger le jeu externe, en parallèle du reste. Ça n'empêche rien, mais c'est un aller-retour et une dépendance de plus.

### Demande

Exposer les fonds administratifs déjà embarqués (régions, départements) comme couche déclarative de `dsfr-data-map`, par exemple `<dsfr-data-map-layer builtin="regions">`.

### Critères d'acceptation

- [ ] `<dsfr-data-map-layer builtin="regions|departements" no-interactive>` rend les contours sans requête réseau.

---

## AM-018 — Pas d'arithmétique entre séries (actif − passif, taux d'évolution)

**Priorité** P3 · **Effort estimé** L (conception + développement) · **Décision proposée** Requalifier : seule l'évolution N/N-1 reste
**Labels suggérés** : `enhancement`, `severity:moyenne`, `dsfr-data-query`, `dsfr-data-normalize`
**Rencontré sur** 1 page(s) : comptabilite-generale

### Constat

La page d'origine calcule dans son template l'écart actif − passif par année, puis son taux d'évolution d'une année sur l'autre. Côté dsfr-data, `dsfr-data-normalize compute` fait de l'arithmétique LIGNE À LIGNE sur des valeurs brutes ; il ne sait ni comparer deux séries, ni accéder à la ligne précédente. Reproduire l'écart demande deux sources, un `dsfr-data-join` sur l'année et un `compute` — quatre balises pour une soustraction. Le taux d'évolution, qui suppose un décalage d'une ligne, reste hors de portée.

### Impact de l'erreur ou du manque

Le solde se lit dans la colonne signée (FP-007) ; reste l'évolution d'une année sur l'autre, calculée dans le template par le portail.

### Objectif métier de la correction

Taux d'évolution sans script.

### Pérennité et reproductibilité du besoin

Récurrent sur les séries temporelles.

### Comment ça a été vérifié

Documentation de `compute` : « Hors périmètre : conditions, fonctions, calculs sur valeurs agrégées. » Les KPI d'évolution de la page d'origine n'ont pas été reproduits.

### Contournement actuel

Deux sources + `dsfr-data-join` + `compute` pour une différence. Rien pour une variation temporelle.

### Demande

Des colonnes calculées portant sur des séries : différence entre deux séries d'un même group-by, et accès décalé (`lag`) pour les évolutions — le besoin le plus fréquent d'un tableau de bord financier ou statistique.

### Critères d'acceptation

- [ ] `compute` avec accès décalé (`lag(champ, 1)`) sur une query ordonnée, ou une agrégation `evolution` sur le KPI.

---

## AM-012 — La recette CDN recommandée charge Chart.js pour rien

**Priorité** P4 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Corriger la skill (doc)
**Labels suggérés** : `enhancement`, `severity:moyenne`, `skills`, `documentation`
**Rencontré sur** 16 page(s) : decp-augmente, plan-de-relance, synthese, retours, qualite-tourisme, tourisme-et-handicap, restauration-notre-dame, comptabilite-generale, prix-des-carburants, fiscalite-locale, entreprise-patrimoine-vivant, annuaire-services-dgfip, barometre-france-num, signalconso, rappelconso, centres-controle-technique

### Constat

La skill `compositionPatterns` prescrit six dépendances CDN « dans cet ordre exact », dont `chart.js@4.4.1` avant `@gouvfr/dsfr-chart@2.1.1`. Or DSFR Chart 2.1.1 embarque déjà Chart.js : le script séparé pèse 201 Ko et ne sert à rien.

### Impact de l'erreur ou du manque

201 Ko chargés pour rien sur chaque page qui suit la recette.

### Objectif métier de la correction

Une recette CDN juste.

### Pérennité et reproductibilité du besoin

Une fois.

### Comment ça a été vérifié

Les quatre pages du dépôt privées de `chart.umd.min.js` : les huit graphiques (barres, barres horizontales, camemberts) se dessinent tous — vérifié en lisant les pixels du canvas, pas seulement la présence de la balise. `window.Chart` est `undefined`, donc rien d'autre ne s'appuyait sur la variable globale.

### Contournement actuel

Retirer la ligne. 201 Ko économisés par page.

### Demande

Corriger la recette CDN de la skill : retirer `chart.js`, ou préciser dans quel cas il reste nécessaire.

### Critères d'acceptation

- [ ] La skill `compositionPatterns` ne liste plus `chart.js`.

---

## AM-037 — Pas de treemap

**Priorité** P4 · **Effort estimé** L (conception + développement) · **Décision proposée** Transférer à DSFR Chart
**Labels suggérés** : `enhancement`, `severity:basse`, `dsfr-data-chart`
**Rencontré sur** 1 page(s) : aide-publique-developpement

### Constat

La page d'origine de l'APD répartit les ODD en treemap. DSFR Chart n'a pas ce type ; barres horizontales à la place.

### Impact de l'erreur ou du manque

Pas de treemap.

### Objectif métier de la correction

Parité avec le portail sur un type rare.

### Pérennité et reproductibilité du besoin

Rare.

### Comment ça a été vérifié

Source data.aide-developpement.gouv.fr/pages/chiffres_cles : `chart-type="treemap"` sur `odd_agrege` ; liste des types de `dsfr-data-chart` sans treemap.

### Contournement actuel

`type="bar" horizontal`.

### Demande

Dépend de DSFR Chart, pas de dsfr-data ; à remonter là-bas.

### Critères d'acceptation

- [ ] Hors périmètre dsfr-data ; issue chez @gouvfr/dsfr-chart.
