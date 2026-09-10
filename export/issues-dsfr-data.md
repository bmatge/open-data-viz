# Demandes à déposer sur bmatge/dsfr-data — rapport de cadrage

> Fichier généré par `node scripts/build-retours.mjs` depuis `public/data/retours.json`.
> 69 demandes cadrées — 7 bugs,
> 55 améliorations,
> 6 pièges à désamorcer dans la bibliothèque plutôt que dans la documentation.
> Chaque bloc est rédigé pour être collé tel quel dans une issue.

## Comment lire ce rapport

Chaque demande naît d'une confrontation réelle au banc d'essai
[open-data-viz](https://github.com/bmatge/open-data-viz) et porte la trace de sa vérification.
Le banc couvre désormais **deux portails Opendatasoft de l'État** :

- **data.economie.gouv.fr** — 30 entrées du catalogue de visualisations, 24 reproduites (lots 1 à 11) ;
- **data.education.gouv.fr** — 36 entrées du catalogue de data-visualisations, auditées et transposées
  sur le papier (lot 12, fiches dans `docs/portail-education/`), y compris les cibles hébergées sur
  `equipements.sports.gouv.fr`, `dataeducation.opendatasoft.com` et la forge des communs numériques.

Le second portail n'a pas redemandé les fonctions du premier : il a fait apparaître des **asymétries**
(une capacité présente sur un composant et absente de son voisin), des **silences** (un attribut qui
ne produit rien sans le dire) et deux écarts de terrain que Bercy ne pouvait pas montrer — l'unité de
temps du domaine est l'**année scolaire**, et une partie de ses jeux sont des **tables de mesures**
(une ligne = une entité × une date) là où Bercy publie des tables d'objets, ce qui prive de sens les
compteurs de facette. Le détail est dans `docs/portail-education/_RESIDU.md`.

Le cadrage ajoute ce qu'il faut pour décider :

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

${retours.filter((r) => r.type === 'faux-probleme').length} critiques ont été **retirées** au fil du
banc d'essai parce qu'une vérification a montré une voie native ou une erreur de notre part (entrées
`faux-probleme` du registre), et ${retours.filter((r) => r.statut === 'corrige' && r.type !== 'faux-probleme').length}
autres sont marquées **corrigées** parce que la bibliothèque les a résolues depuis (leur trace reste au
registre, avec ce qui en demeure vrai). Ce rapport ne liste que ce qui a résisté à la vérification.

Un rappel de méthode issu du lot 12, qui vaut avertissement : une capacité peut être **native, publiée,
et malgré tout absente du bundle chargé** par un site — les 26 pages de ce dépôt épinglent encore
`dsfr-data@0.20.0` alors que npm sert 0.23.0. Avant de conclure à un manque, il faut donc chercher
l'attribut dans le source, **puis vérifier dans quelle version publiée il apparaît**. Trois demandes de
ce rapport sont nées de ce piège, et deux constats antérieurs (AM-017, AM-039) en sont sortis.

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
| BUG-005 | Le refine d'une facette serveur sur un champ date est typé texte : HTTP 400 silencieux | bug | S | 1 | Accepter |
| AM-048 | Aucun diagnostic quand un attribut désigne un champ qui n'existe pas dans le schéma | amelioration | S | 5 | Accepter |
| AM-050 | Aucun opérateur d'année scolaire : `year-of` coupe l'année scolaire en deux, en silence | amelioration | S | 4 | Accepter |
| AM-052 | La fiche servie par le serveur MCP est en retard sur la documentation du dépôt | amelioration | S | 3 | Accepter |
| AM-053 | Un attribut inconnu d'un composant est ignoré sans aucun avertissement | amelioration | S | 2 | Accepter |
| PG-013 | `max-items` d'une couche carte plafonne à 5 000 : la moitié des stations manquaient | piege | S | 3 | Bandeau à corriger ; défaut inchangé, documentation max-items avec cluster |
| AM-032 | Les encarts territoriaux n'ont pas de largeur par défaut : ils s'écrasent à la largeur de leur libellé | amelioration | S | 4 | Accepter |
| AM-045 | La sélection ne part que d'une carte : ni une liste, ni une fiche, ni un graphique ne peut filtrer un contexte | amelioration | M | 5 | Accepter |
| AM-049 | Un ratio dont le numérateur et le dénominateur viennent de deux sources différentes | amelioration | M | 4 | Accepter |
| AM-043 | Les `<select>` qui pilotent un contexte sont écrits en dur — parce qu'une facette ne parle pas au contexte (dérivé d'AM-001) | amelioration | L | 7 | Fusionner avec AM-001 (facets context="ctx") |

_16 demandes — S 13, M 2, L 1._

### P2 — prochain cycle : gain net, effort mesuré

| Id | Demande | Type | Effort | Pages | Décision |
|---|---|---|---|---|---|
| AM-005 | Les valeurs nulles apparaissent en légende sous le nom de repli « Série N » | amelioration | S | 6 | Accepter |
| AM-006 | Pas de rappel des filtres actifs avec `dsfr-data-facets` | amelioration | S | 1 | Gratuit avec AM-001 |
| AM-026 | Pas d'indicateur de couverture sur une jointure | amelioration | S | 1 | Accepter |
| AM-027 | Une carte ignore en silence les lignes sans code géographique | amelioration | S | 1 | Accepter |
| AM-029 | Les opérateurs de date `year-of` et `month-of` refusent une date complète | amelioration | S | 1 | Accepter |
| AM-031 | Les formats de KPI n'ont ni réglage de décimales ni suffixe d'unité — `compact` existe pour les grands nombres | amelioration | S | 2 | Accepter |
| PG-015 | Un `group_by` — serveur ou client — renvoie un groupe null que `count` inclut et que le graphique dessine sans libellé | piege | S | 7 | Documenter + empty-label (pas de drop-null par défaut) |
| PG-022 | Les grammaires d'attributs multi-entrées diffèrent d'un attribut à l'autre : `|` ici, `,` là | piege | S | 3 | Accepter (documentation + avertissement) |
| BUG-007 | `replace-fields` est silencieusement sans effet sur une valeur numérique | bug | S | 1 | Accepter |
| BUG-003 | Les graphiques cartographiques journalisent une erreur de parsing à chaque chargement | bug | S | 2 | Accepter |
| AM-033 | Le tableau `dsfr-data-a11y` ne localise pas les nombres (point décimal, pas de fr-FR) — l'arrondi, lui, existe | amelioration | S | 1 | Accepter |
| AM-036 | Les templates ne formatent pas les dates | amelioration | S | 2 | Accepter |
| AM-040 | Pas de format de jonction pour les champs tableau dans les templates | amelioration | S | 3 | Accepter |
| AM-044 | Le compteur `count` de `dsfr-data-search` rend « 35305 resultats » : ni séparateur de milliers, ni accent | amelioration | S | 3 | Accepter |
| AM-007 | Pas de conditionnelle dans les templates : les liens optionnels deviennent un défaut d'accessibilité | amelioration | M | 8 | Fusionner avec AM-039 |
| AM-015 | Cliquer un objet de la carte ne filtre pas les autres vues | amelioration | M | 1 | Accepter |
| AM-022 | La discrétisation d'une choroplèthe `dsfr-data-map-layer fill-field` n'est pas paramétrable, sans légende | amelioration | M | 1 | Accepter sur map-layer ; issue amont DSFR Chart pour type="map" |
| LIM-009 | Pas de légende de carte | limite-dure | M | 4 | Accepter |
| AM-046 | Le cumul existe, mais seulement dans un `_bucketDate` privé de la couche de carte | amelioration | M | 2 | Accepter |
| BUG-006 | Un champ multivalué : `dsfr-data-facets` éclate les valeurs, un `group-by` client compte les combinaisons | bug | M | 2 | Accepter |
| AM-047 | Pas de boucle dans un template : impossible d'émettre un élément par valeur d'un champ multivalué | amelioration | M | 2 | Accepter |
| AM-051 | Les compteurs de facette n'ont pas de sens sur une table de mesures, et rien ne le dit | amelioration | M | 2 | Accepter |
| AM-056 | Changer le champ d'un filtre selon la source, et vider un groupe de filtres exclusifs | amelioration | M | 1 | Accepter |
| AM-001 | Un `dsfr-data-facets` ne peut piloter qu'une seule source | amelioration | L | 2 | À discuter avec AM-043 |

_24 demandes — S 14, M 9, L 1._

### P3 — backlog : confort, cas moins fréquents

| Id | Demande | Type | Effort | Pages | Décision |
|---|---|---|---|---|---|
| AM-003 | `server-facets` pourrait découvrir seul les champs de facettes | amelioration | S | 4 | Accepter |
| AM-004 | Pas d'agrégat « valeurs distinctes » | amelioration | S | 1 | Accepter |
| AM-054 | Aucune maille géographique non française, ni référentiel de noms de pays en français | amelioration | S | 1 | Accepter |
| AM-009 | `fit-bounds` pourrait clipper automatiquement quand `insets` est déclaré | amelioration | S | 1 | Accepter |
| AM-010 | La rangée d'encarts territoriaux est à l'étroit | amelioration | S | 1 | Fusionner avec AM-032 |
| AM-014 | Pas de moyen de replier des colonnes parallèles en une seule facette | amelioration | S | 1 | Accepter |
| AM-019 | Un KPI ne sait pas filtrer sa source | amelioration | S | 1 | Accepter |
| AM-020 | Après un unpivot, les noms de colonnes restent en étiquettes | amelioration | S | 3 | Accepter |
| AM-021 | Pas de moyen déclaratif d'afficher la fraîcheur des données | amelioration | S | 1 | Accepter |
| AM-023 | Sur les cartes, `name` n'est pas enveloppé : la forme tableau JSON s'affiche littéralement | amelioration | S | 2 | Accepter |
| AM-030 | Pas de valeur par défaut dynamique (« aujourd'hui ») pour un filtre de contexte — `current-year` existe | amelioration | S | 1 | Accepter |
| AM-034 | Un KPI ne peut pas lire le total d'une source en mode serveur (`total_count`) — le compteur, lui, existe sur `dsfr-data-search` | amelioration | S | 3 | Accepter |
| AM-035 | Un graphique n'a pas d'état « vide tant qu'aucun filtre n'est posé » | amelioration | S | 1 | Accepter |
| AM-038 | `replace-fields` ne sait pas récrire une valeur qui contient des deux-points, ni par motif | amelioration | S | 1 | Accepter |
| PG-023 | Le mode `display="champ:radio"` des facettes est un menu déroulant à panneau, pas des boutons radio en ligne | piege | S | 1 | Accepter (mode radio-inline) |
| AM-057 | La valeur courante d'un filtre n'est pas interpolable dans du texte | amelioration | S | 1 | Accepter |
| AM-059 | Colorer une cellule selon un seuil dans un tableau | amelioration | S | 2 | Étudier |
| AM-060 | `color-map` n'existe que sur une couche de carte, et sa grammaire sépare par des virgules | amelioration | S | 3 | Accepter |
| AM-011 | L'adaptateur Opendatasoft devrait charger par `/exports/json`, pas par 31 requêtes paginées | amelioration | M | 13 | À discuter (contournement en une ligne) |
| AM-008 | `bbox` ne filtre pas le premier chargement | amelioration | M | 1 | Accepter |
| AM-041 | Un ratio de deux agrégats coûte six balises | amelioration | M | 1 | Accepter |
| AM-058 | Un filtre qui traverse un référentiel (académie → départements) | amelioration | M | 2 | Étudier |
| AM-016 | Pas de fond administratif livré avec la bibliothèque pour une couche geoshape — mais un GeoJSON statique fait le travail | amelioration | M | 1 | Accepter (GeoJSON dans le paquet, hors bundle) ; `builtin` refusé |
| AM-018 | Pas d'arithmétique entre séries (actif − passif, taux d'évolution) | amelioration | L | 1 | Requalifier : seule l'évolution N/N-1 reste |

_24 demandes — S 18, M 5, L 1._

### P4 — hors périmètre ou refus motivé

| Id | Demande | Type | Effort | Pages | Décision |
|---|---|---|---|---|---|
| AM-012 | La recette CDN recommandée charge Chart.js pour rien | amelioration | S | 16 | Corriger la skill (doc) |
| AM-062 | Aucune position documentée sur l'encastrement en iframe | amelioration | S | 1 | Accepter |
| AM-013 | L'interface des facettes se rend là où la balise est écrite, pas là où on la veut | amelioration | M | 8 | Refusé côté lib (a11y) ; remède = AM-001 + convention |
| AM-061 | Contrôles de carte : bascule du fond, plein écran, capture | amelioration | M | 2 | Étudier |
| AM-037 | Pas de treemap | amelioration | L | 1 | Transférer à DSFR Chart |

_5 demandes — S 2, M 2, L 1._

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

## BUG-005 — Le refine d'une facette serveur sur un champ date est typé texte : HTTP 400 silencieux

**Priorité** P1 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Accepter
**Labels suggérés** : `bug`, `severity:haute`, `dsfr-data-facets`, `dsfr-data-source`
**Rencontré sur** 1 page(s) : entreprise-patrimoine-vivant

### Constat

Avec `server-facets` sur un champ de type date, la liste des années s'affiche (FP-011), mais cocher une valeur émet `where=date_de_labellisation = "2022"`. Opendatasoft refuse la comparaison d'une date à un texte : `IncompatibleTypesInComparisonFilter`, 400. La liste reste sur la page précédente ; seule la console le dit. Pour l'utilisateur, la facette « ne fait rien ».

### Impact de l'erreur ou du manque

Une facette date en mode serveur s'affiche mais ne filtre pas ; l'échec est invisible pour l'utilisateur.

### Objectif métier de la correction

Filtrer par année depuis une facette serveur sur un champ date, comme le portail.

### Pérennité et reproductibilité du besoin

Structurel : tout jeu ODS avec une facette déclarée sur une date.

### Comment ça a été vérifié

Page de test EPV (source adaptateur `server-side`, `server-facets fields="date_de_labellisation"`) : clic sur 2022 → `400 …/records?where=date_de_labellisation+=+"2022"&limit=10`, erreur console `dsfr-data-source[epv]: Erreur de chargement Error: HTTP 400`. À l'API, les quatre formes suivantes renvoient 250 lignes : `date_de_labellisation = date'2022'`, `year(date_de_labellisation) = 2022`, `date_de_labellisation >= "2022-01-01" AND date_de_labellisation < "2023-01-01"`, et le paramètre `refine=date_de_labellisation:2022` (la grammaire native des facettes ODS).

### Contournement actuel

Aucun côté page : le refine est construit par l'adaptateur (`buildFacetWhere`).

### Demande

Pour une facette dont l'API `/facets` renvoie des valeurs annuelles sur un champ date, émettre `refine=champ:valeur` (grammaire ODS) ou un intervalle `[AAAA-01-01, AAAA+1-01-01)`, et remonter l'erreur HTTP dans l'interface plutôt que dans la console seule.

### Critères d'acceptation

- [ ] Cocher « 2022 » sur une facette date renvoie 200 et les lignes de l'année.
- [ ] Une réponse 4xx d'un refine est signalée dans l'interface (état d'erreur du composant).

---

## AM-048 — Aucun diagnostic quand un attribut désigne un champ qui n'existe pas dans le schéma

**Priorité** P1 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement`, `severity:haute`, `dsfr-data-source`, `dsfr-data-map-layer`, `dsfr-data-chart`, `dsfr-data-facets`
**Rencontré sur** 5 page(s) : edu/portrait-de-territoire-sports, edu/fei-chiffres-cles, edu/cactus-hameconnage, edu/generation-2024, edu/cnr-education

### Constat

Un attribut nomme un champ absent du schéma de la source, et **il ne se passe rien** : pas d'erreur, pas d'avertissement, pas de compteur d'écarts. La page rend un bloc vide, une carte grise ou des marqueurs sans couleur, et rien ne distingue « aucune donnée ne correspond » de « ce champ n'existe pas ». C'est le mode d'échec le plus fréquemment rencontré du lot 12 — et il frappe autant l'original que sa transposition. Le volet Diagnostic (#602, #693) existe désormais : le champ inexistant y a sa place naturelle.

### Impact de l'erreur ou du manque

Le mode d'échec le mieux étayé du lot : cinq pages, quatre agents. Deux bugs de l'original en découlent directement et n'ont jamais été vus par leurs auteurs.

### Objectif métier de la correction

Qu'un champ inexistant se voie, au lieu de produire un rendu vide indiscernable d'un jeu vide.

### Pérennité et reproductibilité du besoin

Structurel : les schémas bougent, les jeux sont renommés, les copier-coller entre pages survivent. Le coût est faible — le schéma est déjà connu de la source.

### Comment ça a été vérifié

Cinq pages, quatre agents indépendants, le même symptôme. Sur « Portrait de territoire », l'onglet « Rectorat » est **entièrement vide** parce que sa facette porte sur `aca_nom`, champ absent de `data-es` (vérifié au schéma de l'API). Sur Génération 2024, `color-by-field="type_etablissement"` vise un champ nommé `type` : marqueurs noirs, légende affichée quand même. Sur le CNR, `color-by-field="avancement_du_projet"` désigne un champ inexistant. Sur FEI et Cactus, un code région hors référentiel produit une carte grise avec `getSkippedCount() = 0` — lu dans `_processMapData`, qui ne compte comme ignorée qu'une chaîne vide hors `type="map"`.

### Demande

Signaler dans le volet Diagnostic tout attribut désignant un champ absent du schéma de la source.

### Critères d'acceptation

- [ ] Un `color-by-field` sur un champ absent produit une ligne de Diagnostic nommant le champ et la source.
- [ ] Idem pour `fill-field`, `geo-field`, `group-by`, `fields` de facettes et `value` de KPI.
- [ ] Le message distingue « champ absent du schéma » de « champ présent mais vide sur toutes les lignes ».

---

## AM-050 — Aucun opérateur d'année scolaire : `year-of` coupe l'année scolaire en deux, en silence

**Priorité** P1 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement`, `severity:haute`, `dsfr-data-context-filter`
**Rencontré sur** 4 page(s) : edu/capytale-usages, edu/dnma-usages-ent, edu/dataviz-ips-colleges, edu/tne-dashboard

### Constat

Tous les opérateurs de `dsfr-data-context-filter` raisonnent en année **civile** ou en fenêtre glissante. Or l'unité de temps de tout ce portail est l'**année scolaire** — septembre à août. `year-of` n'est pas seulement inadapté : il est trompeur, puisqu'il coupe l'année scolaire en son milieu sans que rien ne le signale. `between` fonctionne, mais impose un `<select>` dont les bornes sont écrites à la main, page par page.

### Impact de l'erreur ou du manque

C'est la différence structurelle la plus nette entre le portail Éducation et celui de Bercy. Tout le domaine compte en années scolaires ; la bibliothèque ne sait compter qu'en années civiles.

### Objectif métier de la correction

Qu'une année scolaire se déclare, au lieu de s'écrire en deux bornes à la main.

### Pérennité et reproductibilité du besoin

Structurel et pas seulement éducatif : les exercices comptables, les saisons et les campagnes annuelles décalées relèvent du même besoin.

### Comment ça a été vérifié

Relevé sur les jeux d'usage : `…usages-academiques-douzederniersmois` couvre 36 mois, les jeux DNMA sont hebdomadaires depuis 2019, et les jeux d'IPS sont estampillés `rentree_scolaire`. Sur les quatre pages, aucune ne peut exprimer « l'année scolaire 2024-2025 » autrement qu'en écrivant deux dates. Vérifié dans la liste des opérateurs : `eq, in, lt, gte, between, month-of, year-of, lt-day-after, last-n-days, current-year` — aucun ne connaît de découpage à mois de départ paramétrable.

### Demande

`operator="school-year"`, ou un `year-start-month` sur les opérateurs d'année existants.

### Critères d'acceptation

- [ ] `operator="school-year"` avec la valeur `2024` filtre du 1er septembre 2024 au 31 août 2025.
- [ ] Le mois de départ est paramétrable, pour couvrir les exercices décalés.
- [ ] Le libellé rendu par `dsfr-data-context-tags` dit « 2024-2025 », pas une paire de dates.

---

## AM-052 — La fiche servie par le serveur MCP est en retard sur la documentation du dépôt

**Priorité** P1 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement`, `severity:haute`, `documentation`
**Rencontré sur** 3 page(s) : edu/offre-formation-langues, edu/carto-pix-fiche-etablissement, edu/fei-projets-europeens-donnees

### Constat

`get_skill(dsfrDataMap, "reference")` sert une référence de `dsfr-data-map-layer` **sans** `refine-on-click`, `context`, `label` ni l'événement `dsfr-data-map-select`, alors que `skills/dsfr-data/references/dsfr-data-map.md` **les documente**. Ce n'est donc pas un manque de documentation : c'est un décalage entre la doc du dépôt et celle que sert le MCP — plus insidieux, parce que le lecteur consciencieux qui interroge le MCP obtient une réponse fausse par omission. Le même décalage frappe `dsfrDataDisplay`, dont la fiche ignore `{{#if}}`, `{{champ:date}}` et les pipes livrés en 0.22.0.

### Impact de l'erreur ou du manque

Une documentation en retard ne ralentit pas : elle fait écrire des critiques fausses. Trois agents en une journée, dont un jusqu'à la rédaction.

### Objectif métier de la correction

Que la fiche servie par le MCP corresponde à la version publiée, et le dise.

### Pérennité et reproductibilité du besoin

Structurel : l'écart se recreusera à chaque version tant que la génération n'est pas automatique.

### Comment ça a été vérifié

Trois agents du lot 12 s'y sont fait prendre le même jour. L'un a écrit un faux manque (« rien ne relie déclarativement un clic carte à une seconde source ») avant correction ; un autre a écarté une voie native et l'a rouverte après signalement, ce qui a réglé deux défauts qu'il avait classés sans solution ; un troisième a d'abord classé cinq limites qui n'en étaient pas. Vérifié des deux côtés : l'attribut est dans `packages/core/src/components/dsfr-data-map-layer.ts` (propriété l. 209) et dans `skills/dsfr-data/references/dsfr-data-map.md`, absent de la sortie du MCP.

### Demande

Générer les fiches du MCP depuis le source (ou depuis `skills/`) à chaque publication, et y porter la version dont elles sont issues.

### Critères d'acceptation

- [ ] `get_skill(dsfrDataMap, "reference")` liste `refine-on-click`, `context`, `label` et `dsfr-data-map-select`.
- [ ] Chaque fiche porte le numéro de version dont elle est issue.
- [ ] Une vérification de CI échoue si une fiche diverge du source.

---

## AM-053 — Un attribut inconnu d'un composant est ignoré sans aucun avertissement

**Priorité** P1 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement`, `severity:haute`, `dsfr-data-source`, `documentation`
**Rencontré sur** 2 page(s) : edu/offre-formation-langues, edu/carto-pix-fiche-etablissement

### Constat

Une page peut être écrite juste, contre une documentation juste, et ne rien faire — parce que le bundle chargé est antérieur à l'attribut employé. Aucune erreur, aucun avertissement : l'attribut est silencieusement ignoré. C'est la même famille que PG-022 (grammaire fausse silencieuse) et que `max-records` qui tronque sans le dire, mais appliquée à la version elle-même.

### Impact de l'erreur ou du manque

L'écart entre « ça ne marche pas » et « votre version est trop ancienne » est aujourd'hui invisible. C'est le pire mode d'échec pour un intégrateur qui découvre la bibliothèque.

### Objectif métier de la correction

Qu'un attribut inconnu se signale, au lieu de produire du vide.

### Pérennité et reproductibilité du besoin

Structurel, et le coût est faible : la liste des attributs connus est déjà déclarée par chaque composant.

### Comment ça a été vérifié

Vérifié version par version dans les bundles npm publiés (`npm pack dsfr-data@<v>` puis grep dans `package/dist/`) : `refine-on-click` et `dsfr-data-map-select` sont absents de 0.20.0, 0.21.0 et 0.22.0, présents en 0.23.0. Sur une page chargeant 0.20.0 — c'est-à-dire les 26 pages de ce dépôt — les trois attributs `refine-on-click`, `context` et `label` **ne déclenchent aucune erreur console**.

### Demande

Un avertissement de développement lorsqu'un composant `dsfr-data` reçoit un attribut qu'il ne connaît pas, et une ligne de Diagnostic le récapitulant.

### Critères d'acceptation

- [ ] Un attribut inconnu produit un avertissement console nommant le composant, l'attribut et la version.
- [ ] Le volet Diagnostic récapitule les attributs ignorés de la page.
- [ ] Aucun bruit en production (avertissement de développement seulement).

---

## PG-013 — `max-items` d'une couche carte plafonne à 5 000 : la moitié des stations manquaient

**Priorité** P1 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Bandeau à corriger ; défaut inchangé, documentation max-items avec cluster
**Labels suggérés** : `enhancement, dx`, `severity:moyenne`, `dsfr-data-map-layer`
**Rencontré sur** 3 page(s) : prix-des-carburants, annuaire-services-dgfip, centres-controle-technique

### Constat

Le plafond par défaut d'une couche est de 5 000 éléments. Sur 9 805 stations, la carte n'en dessinait que 5 000 et affichait un bandeau « 5 000 éléments affichés sur 9 805 disponibles. Zoomez pour voir plus de détail » — sauf que zoomer ne charge rien de plus, les données étant déjà là. Le bandeau se répète dans chaque encart territorial (la couche y est clonée) et en recouvre les libellés. Même famille qu'AM-002 (`max-records`) : un plafond utile, mais un défaut trop bas pour un jeu national avec grappes, et un message qui promet un remède qui n'existe pas en mode client. Deux autres pages étaient dans le même cas sans le savoir : l'annuaire DGFiP (21 761 structures chargées, 5 000 dessinées — 77 % manquantes) et les centres de contrôle technique (6 113).

Relecture du lot 11 : le plafond de 5 000 est documenté et protège le DOM (marqueurs `divIcon`), le `fit` et les popups — pas seulement le rendu ; relever le défaut selon `cluster` est refusé côté lib. Ce qui est cassé, c'est le bandeau (« Zoomez » faux hors `bbox`, répété dans chaque encart). La bibliothèque documentera « avec `cluster`, `max-items="20000"` est sans risque » ; les pages gardent leur `max-items` explicite.

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

- [ ] Le bandeau ne dit « zoomez » que si un `bbox` est actif ; il n'est rendu qu'une fois, pas dans chaque encart.
- [ ] La référence de `max-items` indique « avec `cluster`, 20 000 est sans risque ».

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

## AM-045 — La sélection ne part que d'une carte : ni une liste, ni une fiche, ni un graphique ne peut filtrer un contexte

**Priorité** P1 · **Effort estimé** M (un à trois jours) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement`, `severity:haute`, `dsfr-data-list`, `dsfr-data-display`, `dsfr-data-chart`, `dsfr-data-context`
**Rencontré sur** 5 page(s) : edu/educajou-ecolemap, edu/fei-projets-europeens-donnees, edu/carto-pix-fiche-etablissement, edu/portrait-de-territoire-sports, edu/annuaire-des-internats

### Constat

Depuis 0.23.0 (#681, ADR-104), `refine-on-click` + `context` + `label` sur `dsfr-data-map-layer` diffusent la valeur d'un objet cliqué à N sources via le contexte, au dialecte de chacune. Le bus est ouvert, l'interface `ContextFilterLike` est en place — mais **aucun autre composant ne sait s'en servir**. Cliquer une ligne de tableau, une fiche d'une grille, ou une barre d'un graphique pour filtrer le reste de la page n'a pas d'équivalent déclaratif. C'est le motif maître-détail, et la carte n'en est qu'une porte d'entrée parmi trois : les annuaires et les palmarès entrent par la liste, les tableaux de bord par le graphique, et toute donnée non géographique n'a pas le choix.

### Impact de l'erreur ou du manque

Le maître-détail est le motif central de cinq pages du portail Éducation. Faute de ce geste, la reproduction remplace un clic par un menu déroulant : le sens est conservé, l'ergonomie non.

### Objectif métier de la correction

Qu'un composant d'affichage puisse filtrer un contexte, comme une couche de carte le fait déjà.

### Pérennité et reproductibilité du besoin

Structurel : tout annuaire, tout palmarès, tout tableau de bord cliquable. La fondation existe déjà (bus de contexte, tag, URL) — c'est le branchement qui manque.

### Comment ça a été vérifié

Grep sur `packages/core/src` : `refine-on-click` n'apparaît que dans `dsfr-data-map-layer.ts`, et `dsfr-data-map-select` est le seul événement de sélection de toute la bibliothèque. Constaté indépendamment par deux agents (fiches `educajou-ecolemap.md` et `portrait-de-territoire-sports.md`). Sur FEI, la grille de 44 fiches projet est le sélecteur principal de la page d'origine et n'a pas de transposition ; contournement retenu dans la fiche : un `<select>` + `dsfr-data-context-filter`, qui gagne l'URL partageable mais perd le clic sur la fiche.

### Demande

Le symétrique de #681 sur `dsfr-data-display` (une fiche), `dsfr-data-list` (une ligne) et `dsfr-data-chart` (une barre, un secteur) : même trio d'attributs `refine-on-click` / `context` / `label`, même événement de sélection, même retrait au second clic.

### Critères d'acceptation

- [ ] Cliquer une ligne de `dsfr-data-list` pose un filtre `eq` sur le contexte nommé par `context`.
- [ ] Un second clic sur la même ligne retire le filtre, comme sur la couche de carte.
- [ ] Le tag `dsfr-data-context-tags` et la synchronisation d'URL fonctionnent à l'identique.
- [ ] Même comportement sur `dsfr-data-display` et sur une barre de `dsfr-data-chart`.

---

## AM-049 — Un ratio dont le numérateur et le dénominateur viennent de deux sources différentes

**Priorité** P1 · **Effort estimé** M (un à trois jours) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement`, `severity:haute`, `dsfr-data-kpi`, `dsfr-data-query`, `dsfr-data-join`
**Rencontré sur** 4 page(s) : edu/portrait-de-territoire-sports, edu/equipements-sportifs-milieu-scolaire, edu/personnels-colleges, edu/accessibilite-equipements-sportifs

### Constat

« Équipements pour 10 000 habitants », « enseignants par élève », « dossiers par établissement » : le numérateur vient d'un jeu, le dénominateur d'un autre. **#673 ne couvre pas ce cas** — le corps de l'issue est explicite, son ratio est mono-source. Un `dsfr-data-join` rapproche bien deux jeux, mais à la maille de la ligne, pas à celle de l'agrégat : joindre 333 611 équipements à une table de population pour en tirer une division est un contresens de volume.

### Impact de l'erreur ou du manque

C'est le motif de tout indicateur « par habitant », donc de toute comparaison entre territoires de tailles différentes. Sans lui, une fiche de territoire ne peut afficher que des volumes bruts, qui classent mécaniquement les grandes villes en tête.

### Objectif métier de la correction

Qu'un KPI puisse diviser un agrégat d'une source par un agrégat d'une autre.

### Pérennité et reproductibilité du besoin

Structurel : la population, les effectifs et les surfaces vivent toujours dans un référentiel séparé.

### Comment ça a été vérifié

Relevé sur « Portrait de territoire » : **13 indicateurs sur 40** sont de cette forme, numérateur `count`/`sum` sur `data-es`, dénominateur `SUM(population)` sur `insee-2020-geoapi-2023`. Le motif se répète sur la seconde page Sports, et sur les pages « personnels » où 15 des 18 blocs sont des ratios (là mono-source, réalisables par `select` ODSQL). Le corps de #673 a été lu pour vérifier qu'il ne s'applique pas. — Revérifié le 2026-09-10 APRÈS la livraison de #673 en 0.24.0 (commit c14c762) : `dsfr-data-kpi` évalue son expression sur `this._filteredData()`, c'est-à-dire les données d'une source unique. Le ratio livré est donc bien mono-source et ne couvre pas ce besoin.

### Contournement actuel

Aucun côté client. Côté serveur, seulement si les deux mesures vivent dans le même jeu (`select` ODSQL) — ce qui n'est pas le cas ici.

### Demande

—

### Critères d'acceptation

- [ ] `value="src_a:count / src_b:sum:population"` rend le ratio attendu.
- [ ] Les deux membres suivent le même filtre de contexte (le territoire choisi).
- [ ] Un dénominateur nul rend un état vide explicite, pas `Infinity` ni `NaN`.

---

## AM-043 — Les `<select>` qui pilotent un contexte sont écrits en dur — parce qu'une facette ne parle pas au contexte (dérivé d'AM-001)

**Priorité** P1 · **Effort estimé** L (conception + développement) · **Décision proposée** Fusionner avec AM-001 (facets context="ctx")
**Labels suggérés** : `enhancement`, `severity:haute`, `dsfr-data-context-filter`, `dsfr-data-facets`
**Rencontré sur** 7 page(s) : comptabilite-generale, fiscalite-locale, barometre-france-num, aide-publique-developpement, decp-augmente, rappel-conso-tableau-de-bord, prix-controle-technique

### Constat

Sept pages portent des `<select>` générés hors ligne (56 missions, 101 départements, 119 questions…). J'avais écrit qu'aucun moyen déclaratif ne peuplait un `<select>` depuis une source ni ne faisait de cascade. Voie native ratée, et c'est la plus coûteuse du rapport (lot 11) : `dsfr-data-facets display="champ:select"` *est* un `<select>` peuplé depuis la donnée, avec compteurs ; et en `server-facets` la cascade existe — chaque facette est refetchée avec le `where` des autres. Ce qui reste vrai, et qui explique les listes en dur : une facette ne pilote que sa propre source, elle ne sait pas parler à un `dsfr-data-context` qui en pilote sept. C'est exactement AM-001.

### Impact de l'erreur ou du manque

Sept pages du banc d'essai portent des `<select>` écrits en dur (56 missions, 101 départements, 119 questions) générés hors ligne : toute évolution de la donnée les rend faux, et une cascade région → département exige du JavaScript.

### Objectif métier de la correction

Qu'un tableau de bord à plusieurs agrégations serveur se filtre sans une seule valeur écrite à la main, comme le fait le contexte Opendatasoft.

### Pérennité et reproductibilité du besoin

Structurel et récurrent : c'est la friction la plus répétée du banc d'essai. Tout dashboard multi-vues sur un jeu volumineux la rencontre.

### Comment ça a été vérifié

Lot 11, page de test (réseau cuivre, `server-facets`, `display="region:select | departement:select"`) : 21 régions et 95 départements peuplés avec compteurs ; choisir « Bretagne » refetch `facets?facet=departement&where=region = "Bretagne"` et le second select tombe à 4 départements (Côtes-d'Armor 345, Ille-et-Vilaine 337, Finistère 279, Morbihan 251). Source : `dsfr-data-facets.ts:1517` (select), l.755-767 (`whereToFields`).

### Contournement actuel

Options générées hors ligne depuis un `group_by` de l'API ; ou, quand une seule source est à piloter, `facets display="champ:select" server-facets`.

### Demande

Non pas un `options-source` sur `dsfr-data-context-filter`, mais un `dsfr-data-facets context="ctx"` : les facettes (select, cases, cascade) diffusent dans le contexte, qui pilote toutes les sources. Un seul bus.

### Critères d'acceptation

- [ ] `<dsfr-data-facets context="ctx" server-facets display="mission:select">` peuple son select depuis `/facets` et pousse le `where` dans le contexte.
- [ ] Les options se restreignent par les autres filtres (cascade), comme aujourd'hui en `server-facets`.
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

**Priorité** P2 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Gratuit avec AM-001
**Labels suggérés** : `enhancement`, `severity:moyenne`, `dsfr-data-facets`, `dsfr-data-context-tags`
**Rencontré sur** 1 page(s) : plan-de-relance

### Constat

Opendatasoft affiche un `ods-filter-summary` : les filtres actifs en tags supprimables, avec « tout effacer ». Une page filtrée par `dsfr-data-facets` n'a aucun récapitulatif hors de la colonne. Deux affirmations de ma première version étaient inverses (relecture du lot 11) : `dsfr-data-context-tags` n'a *pas* de « tout effacer » — il n'est donc pas « l'équivalent » — et les facettes *ont* un bouton « Réinitialiser les filtres ». Le manque réel se réduit au récapitulatif en tags hors de la colonne, qui tombera avec AM-001.

### Impact de l'erreur ou du manque

Pas de rappel des filtres actifs avec des facettes, contrairement à `ods-filter-summary`.

### Objectif métier de la correction

Voir et retirer ses filtres d'un clic.

### Pérennité et reproductibilité du besoin

Structurel.

### Comment ça a été vérifié

Page Plan de relance : après trois cases cochées dans trois facettes différentes, rien ne résume l'état courant hors de la colonne de filtres. Lot 11, Plan de relance : après une case cochée, bouton « Réinitialiser les filtres » présent dans `dsfr-data-facets` ; aucun « tout effacer » dans `dsfr-data-context-tags.ts:70-90`.

### Contournement actuel

Aucun sans JavaScript.

### Demande

Faire accepter à `dsfr-data-context-tags` une source de type `dsfr-data-facets`, ou fournir un `dsfr-data-facets-tags`.

### Critères d'acceptation

- [ ] `dsfr-data-context-tags for="id-facettes"` liste les sélections actives des facettes, supprimables, avec « tout effacer ».

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

## AM-031 — Les formats de KPI n'ont ni réglage de décimales ni suffixe d'unité — `compact` existe pour les grands nombres

**Priorité** P2 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement`, `severity:moyenne`, `dsfr-data-kpi`
**Rencontré sur** 2 page(s) : prix-des-carburants, aide-publique-developpement

### Constat

`format="euro"` arrondit à l'unité (« 2 € » pour un prix au litre) et `format="decimal"` impose 1 à 2 décimales (« 2,1 » à côté de « 2,29 »). J'avais aussi écrit que « 44,9 Md€ » était hors de portée : faux, `format="compact"` existe depuis 0.20.0 (absent du JSDoc du KPI, c'est là que je l'ai raté) et l'échelle se règle dans le `select` ODSQL (`sum(montant_verse_k_eur)*1000`). Ce qui reste vrai : pas de `decimals`, et le symbole d'unité va dans `label` — « 44,9 Md » puis « € » sur la ligne suivante.

### Impact de l'erreur ou du manque

`euro` arrondit un prix au litre à « 2 € » ; `decimal` affiche « 2,1 » à côté de « 2,29 » ; les milliards passent par `compact` mais sans leur unité.

### Objectif métier de la correction

Des KPI monétaires lisibles à la précision du métier.

### Pérennité et reproductibilité du besoin

Structurel : tout KPI de prix ou de montant.

### Comment ça a été vérifié

Source `packages/shared/src/utils/formatters.ts` : `formatCurrency` → `minimumFractionDigits: 0, maximumFractionDigits: 0` ; `formatDecimal` → 1 à 2. Navigateur : KPI E10 rendu « 2,1 » quand la moyenne vaut 2,10, Gazole « 2,29 » (API : 2,2942). Lot 11, APD : `value="m_eur:max" format="compact"` rend « 44,9 Md » et « 33,6 Md ». Source : `formatters.ts:52-57`.

### Contournement actuel

`format="decimal"` avec l'unité dans `label` ; `format="compact"` + facteur d'échelle dans le `select` pour les milliards.

### Demande

Un attribut `decimals` (min = max) et un attribut `unit` (suffixe libre) sur `dsfr-data-kpi`, ou un `format="euro:3"`. `formatCurrency` et `formatDecimal` sont dans `@dsfr-data/shared` : la modification est locale.

### Critères d'acceptation

- [ ] `decimals="3"` fixe min = max ; `unit="€/L"` ajoute un suffixe ; `format="compact"` → « 44,9 Md€ ».

---

## PG-015 — Un `group_by` — serveur ou client — renvoie un groupe null que `count` inclut et que le graphique dessine sans libellé

**Priorité** P2 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Documenter + empty-label (pas de drop-null par défaut)
**Labels suggérés** : `enhancement, dx`, `severity:moyenne`, `dsfr-data-source`, `dsfr-data-chart`, `dsfr-data-query`, `dsfr-data-kpi`
**Rencontré sur** 7 page(s) : decp-augmente, rappel-conso-tableau-de-bord, prix-controle-technique, qualite-tourisme, tourisme-et-handicap, annuaire-services-dgfip, prix-des-carburants

### Constat

Chaque `select count(*) … group_by champ` remonte une ligne à clé vide (decp_augmente : 399 sources, 3 724 natures, 27 451 procédures ; rappelconso : 2 001 natures et modalités). Elle devient une barre ou une part sans libellé, alors qu'`ods-chart` l'écarte silencieusement — d'où des écarts avec les chiffres du portail.

Fusion du lot 11 (ex-PG-018) : le même piège existe côté client — `dsfr-data-query group-by` produit un groupe pour les lignes sans valeur, et la clé ressort en `''` (chaîne vide), pas en `null` ; un `isnull` posé en aval ne l'attraperait donc pas. La voie native est identique dans les deux cas et tient dans un attribut de la balise déjà présente : `where="champ is not null"` sur la `dsfr-data-source`, `where="champ:isnotnull"` sur la `dsfr-data-query`. Un `drop-null` par défaut serait un masquage silencieux, contraire à la ligne de la bibliothèque (jamais de 0 silencieux) ; la réponse retenue côté lib est un `empty-label="Non renseigné"` sur le graphique, qui rend visible au lieu de supprimer.

### Impact de l'erreur ou du manque

Le groupe null d'un `group_by` devient une barre sans libellé ; comptes décalés de l'original.

### Objectif métier de la correction

Parité avec `ods-chart`.

### Pérennité et reproductibilité du besoin

Structurel.

### Comment ça a été vérifié

Tableaux `dsfr-data-a11y` avant/après : 8→7, 10→9, 20→19 lignes sur DECP ; 3→2 sur la nature juridique Rappel Conso, parts 14 402 / 2 178 égales à la fiche d'audit. Lot 11, Prix des carburants : le tableau des régions s'ouvrait sur « | | 2.36 » (stations sans région) ; `where="region:isnotnull"` sur la query → première ligne « Grand Est | 44 | 2.31 ». Relecture dsfr-data : `dsfr-data-query.ts:774-777` (isnotnull) et l.793 (clé `''`).

### Contournement actuel

`where="champ is not null"` (source) ou `where="champ:isnotnull"` (query), sur la balise existante. Motif « parité ods-chart » à poser systématiquement sur un `group-by`.

### Demande

—

### Critères d'acceptation

- [ ] La référence de `group-by` (source et query) mentionne le groupe null et le `where … is not null` / `:isnotnull`.
- [ ] Un graphique nourri d'un groupe `null` ou `''` l'affiche sous `empty-label` (« Non renseigné ») au lieu d'une barre sans libellé.

---

## PG-022 — Les grammaires d'attributs multi-entrées diffèrent d'un attribut à l'autre : `|` ici, `,` là

**Priorité** P2 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Accepter (documentation + avertissement)
**Labels suggérés** : `enhancement, dx`, `severity:moyenne`, `dsfr-data-facets`, `dsfr-data-normalize`, `dsfr-data-chart`
**Rencontré sur** 3 page(s) : rappelconso, prix-des-carburants, entreprises-restauration-notre-dame

### Constat

`labels` et `display` de `dsfr-data-facets` séparent leurs entrées par `|` ; `split`, `round` et `fields` par `,` ; `name` de `dsfr-data-chart` accepte une chaîne simple ou un tableau JSON. Rien ne le rappelle d'une fiche à l'autre, et une grammaire fausse ne produit aucune erreur : `display="a:select, b:select"` rend zéro `<select>`, `split="champ:|"` que je croyais impossible marche. Quatre constats du banc (ex-AM-028, AM-031, AM-033, ex-AM-042) tombaient à la lecture du JSDoc de l'attribut plutôt que de la fiche du composant.

### Impact de l'erreur ou du manque

Une grammaire fausse est silencieuse : l'attribut est simplement ignoré.

### Objectif métier de la correction

Qu'un auteur ne devine plus le séparateur.

### Pérennité et reproductibilité du besoin

Structurel : tout attribut multi-entrées.

### Comment ça a été vérifié

Page de test (réseau cuivre, `server-facets`) : `display="region:select, departement:select"` → 0 select rendu ; `display="region:select | departement:select"` → 2 selects, 21 et 95 options. `split="risques_encourus:|"` → tableau (FP-010). `round="prix_moyen:2"` (virgule pour plusieurs champs) → 2.31 (AM-033).

### Contournement actuel

Lire le JSDoc de l'attribut (source ou `get_skill(id, section)`) avant de conclure ; ne pas transposer la grammaire d'un attribut à un autre.

### Demande

Une règle unique documentée en tête de chaque fiche (« entrées séparées par … »), et un avertissement console quand une valeur de `display` ou `labels` ne contient aucun séparateur reconnu alors qu'elle en contient un autre.

### Critères d'acceptation

- [ ] Chaque fiche de composant rappelle le séparateur de chaque attribut multi-entrées.
- [ ] Un `display`/`labels` sans `|` mais avec `,` déclenche un avertissement console.

---

## BUG-007 — `replace-fields` est silencieusement sans effet sur une valeur numérique

**Priorité** P2 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Accepter
**Labels suggérés** : `bug`, `severity:moyenne`, `dsfr-data-normalize`
**Rencontré sur** 1 page(s) : edu/etablissements-euroscol

### Constat

`_normalizeRow` ne visite que les valeurs dont `typeof value === 'string'`. Un `replace-fields` posé sur une colonne numérique **ne fait rien, sans erreur ni avertissement**. C'est distinct de #676, qui traite l'échappement `%3A` : ici le problème est le typage. Conséquence pratique : même après #677 (`fold`), une facette bâtie sur des colonnes de drapeaux affichera « 0 » et « 1 » au lieu de libellés.

### Impact de l'erreur ou du manque

Un attribut écrit correctement qui ne produit rien, sans le dire — la famille de PG-022.

### Objectif métier de la correction

Qu'un remplacement de valeur fonctionne quel que soit le type de la colonne.

### Pérennité et reproductibilité du besoin

Structurel : les drapeaux 0/1 et les codes numériques sont partout en open data.

### Comment ça a été vérifié

Relevé sur Euroscol : les six drapeaux de la popup sont typés `int` (0/1) au schéma de l'API. `replace-fields` a été écarté après lecture de `_normalizeRow` dans le source. Deux vérifications annexes : la grammaire de l'attribut sépare par `|` et non par la virgule (PG-022), et l'ODSQL du portail refuse `if()`/`case()` — trois HTTP 400 testés. Le contournement `data-v` + CSS règle l'infobulle mais **pas les facettes**.

### Demande

Appliquer `replace` / `replace-fields` aux valeurs numériques et booléennes, en comparant sur leur forme chaîne. Demande jumelle : `value-labels` sur `dsfr-data-facets`.

### Critères d'acceptation

- [ ] `replace-fields="drapeau:1:Oui | drapeau:0:Non"` sur une colonne `int` produit « Oui » / « Non ».
- [ ] Une facette sur cette colonne affiche les libellés, pas les codes.
- [ ] Le CSV exporté conserve la valeur d'origine.

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

## AM-033 — Le tableau `dsfr-data-a11y` ne localise pas les nombres (point décimal, pas de fr-FR) — l'arrondi, lui, existe

**Priorité** P2 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement`, `severity:basse`, `dsfr-data-a11y`
**Rencontré sur** 1 page(s) : prix-des-carburants

### Constat

Le tableau rend `${row[col] ?? ''}` sans format : « 2.2665920000000006 » là où le graphique dit 2,27. J'avais écrit « aucune fonction d'arrondi » : faux, `dsfr-data-normalize round="champ:2"` existe (voie native ratée, lot 11). Ce qui reste vrai : `round` donne « 2.31 » avec un point ; la localisation fr-FR du tableau manque.

### Impact de l'erreur ou du manque

Précision réglable par `round`, mais le tableau accessible écrit 2.31 quand le graphique dit 2,31.

### Objectif métier de la correction

Que l'équivalent accessible soit aussi lisible que le graphique.

### Pérennité et reproductibilité du besoin

Structurel : toute moyenne.

### Comment ça a été vérifié

Lot 9 : première ligne « Corse | 2.2665920000000006 | 126 ». Lot 11, `round="prix_moyen:2"` sur la source de la carte régionale : « Grand Est | 44 | 2.31 » ; `round="prix_moyen:3"` sur les carburants : « Gazole | 2.294 ». Source : `dsfr-data-a11y.ts:382` ; `dsfr-data-normalize.ts:82-84, 340-352`.

### Contournement actuel

`dsfr-data-normalize round="champ:N"` en amont du tableau (précision juste, séparateur décimal faux).

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

## AM-044 — Le compteur `count` de `dsfr-data-search` rend « 35305 resultats » : ni séparateur de milliers, ni accent

**Priorité** P2 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement`, `severity:basse`, `dsfr-data-search`
**Rencontré sur** 3 page(s) : fermeture-reseau-cuivre, bofip, prix-controle-technique

### Constat

Le compteur existe et suit recherche, facettes et contexte (AM-034 réduit). Mais il rend le nombre brut et le mot sans accent, là où le KPI voisin écrit « 35 305 ». Sur un moteur de recherche, c'est la première chose qu'on lit.

### Impact de l'erreur ou du manque

Le seul compteur de total en mode serveur est illisible au-delà de mille et fautif.

### Objectif métier de la correction

« 35 305 résultats » — et « 35 305 communes » si l'auteur le demande.

### Pérennité et reproductibilité du besoin

Tout moteur de recherche serveur.

### Comment ça a été vérifié

Navigateur : `.dsfr-data-search-count` = « 35305 resultats » (réseau cuivre), « 9146 resultats » puis « 1226 resultats » après la facette BIC (BOFiP), « 145146 resultats » puis « 28808 resultats » après le choix « Voiture particulière » (contrôle technique). Source : `${this._resultCount} resultat${… ? 's' : ''}` dans `dsfr-data-search.ts`.

### Contournement actuel

Aucun : le texte est produit par le composant.

### Demande

Passer le nombre par le formateur fr-FR déjà utilisé par le KPI (`35 305`), écrire « résultat(s) » avec l'accent, et proposer un `count-label` pour le mot (« communes », « documents »).

### Critères d'acceptation

- [ ] `count` rend « 35 305 résultats ».
- [ ] `count-label="communes"` rend « 35 305 communes ».

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

## AM-022 — La discrétisation d'une choroplèthe `dsfr-data-map-layer fill-field` n'est pas paramétrable, sans légende

**Priorité** P2 · **Effort estimé** M (un à trois jours) · **Décision proposée** Accepter sur map-layer ; issue amont DSFR Chart pour type="map"
**Labels suggérés** : `enhancement`, `severity:moyenne`, `dsfr-data-chart`
**Rencontré sur** 1 page(s) : fiscalite-locale

### Constat

`ods-color-gradient` expose le nombre de classes, les couleurs et la méthode. Deux affirmations réduites au lot 11 : `selected-palette` *agit* sur les cartes (`dsfr-data-chart.ts:532` le transmet à `MapChart`), je l'avais limité aux catégorielles ; et l'échelle continue min→max de `type="map"` est celle de DSFR Chart (`chroma.scale` entre deux couleurs, aucune prop de classes) — limite amont, à remonter chez `GouvernementFR/dsfr-chart`, pas ici. Ce qui reste imputable à dsfr-data : `dsfr-data-map-layer fill-field` découpe en quantiles imposés (9 classes) sans légende, là où l'original a 4 classes égales, une palette par taxe et une légende chiffrée.

### Impact de l'erreur ou du manque

Choroplèthes en quantiles imposés, sans légende, là où l'original a des classes et une légende chiffrée.

### Objectif métier de la correction

Une choroplèthe paramétrable et lisible.

### Pérennité et reproductibilité du besoin

Structurel : toute carte thématique.

### Comment ça a été vérifié

Carte « taux moyen TFB par département » : légende continue de 21,21 à 63,2 %, la quasi-totalité des départements dans une nuance indiscernable. Aucun attribut de la référence de `dsfr-data-chart` ne concerne la discrétisation ; `selected-palette` n'agit que sur les séries catégorielles. Lot 11, fiscalité locale : `selected-palette` passé de `categorical` à `divergentAscending` puis `sequentialDescending` sur la carte des taux → les 101 remplissages changent (`#999fd9…` → `#904a2b…` → `#7675b5…`) ; `map-chart` porte l'attribut.

### Contournement actuel

`selected-palette="sequentialAscending"` sur `type="map"` (posé sur les deux cartes départementales) ; rien pour `map-layer`.

### Demande

Sur `dsfr-data-map-layer` : `classes`, `method` (quantiles, égales, seuils) et `breaks`, avec une légende. Côté DSFR Chart : issue amont pour un `nb-classes` sur `map-chart`.

### Critères d'acceptation

- [ ] `classes="4"`, `method="equal|quantile|manual"`, `breaks="…"` sur `type="map"` et `geoshape fill-field`, avec légende chiffrée rendue.

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

## AM-046 — Le cumul existe, mais seulement dans un `_bucketDate` privé de la couche de carte

**Priorité** P2 · **Effort estimé** M (un à trois jours) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement`, `severity:moyenne`, `dsfr-data-query`, `dsfr-data-chart`, `dsfr-data-map-layer`
**Rencontré sur** 2 page(s) : edu/tne-dashboard, edu/educajou-ecolemap

### Constat

`time-field`, `time-bucket` (`hour` … `year`) et `time-mode="cumulative"` sont implémentés — sur `dsfr-data-map-layer` uniquement, dans une fonction privée. Rien d'équivalent sur `dsfr-data-query` ni sur `dsfr-data-chart`. Et ce n'est pas un manque que le jalon v0.24.0 comblera : #671 **exclut explicitement** le cumul de la grammaire de `compute` (« par ligne uniquement : pas de fenêtre, cumul ni ligne précédente ») en renvoyant les besoins inter-lignes à `query` — qui ne sait pas le faire non plus. Il y a donc un trou assumé entre deux composants, et la capacité est déjà écrite, sur le mauvais.

### Impact de l'erreur ou du manque

Une série cumulée est la forme normale d'un suivi de déploiement. Sans elle, la reproduction affiche des valeurs mensuelles là où l'original montre une progression.

### Objectif métier de la correction

Qu'un cumul se déclare, au lieu de s'écrire à la main dans un template.

### Pérennité et reproductibilité du besoin

Structurel, et le code existe déjà : c'est un déplacement, pas une conception.

### Comment ça a été vérifié

Le tableau de bord TNE rend sa courbe de cumul mensuel par **douze expressions de template** successives, relevées dans son `$scope.blocks`. Côté bibliothèque, grep sur `packages/core/src` : `time-mode` et `time-bucket` n'apparaissent que dans `dsfr-data-map-layer.ts`. Le corps de #671 a été lu : l'exclusion du cumul y est écrite noir sur blanc.

### Demande

Remonter `time-bucket` / `time-mode="cumulative"` dans la grammaire commune, ou les exposer sur `dsfr-data-query` et `dsfr-data-chart`.

### Critères d'acceptation

- [ ] `time-mode="cumulative"` sur `dsfr-data-query` produit une série cumulée.
- [ ] Même résultat qu'un cumul calculé à la main sur le jeu TNE (50 lignes).
- [ ] Le `time-bucket` accepte les mêmes valeurs que sur la couche de carte.

---

## BUG-006 — Un champ multivalué : `dsfr-data-facets` éclate les valeurs, un `group-by` client compte les combinaisons

**Priorité** P2 · **Effort estimé** M (un à trois jours) · **Décision proposée** Accepter
**Labels suggérés** : `bug`, `severity:moyenne`, `dsfr-data-facets`, `dsfr-data-query`
**Rencontré sur** 2 page(s) : edu/educajou-ecolemap, edu/accompagnement-deficience-sensorielle

### Constat

Sur un même champ multivalué et dans le même pipeline, deux composants donnent deux réponses différentes à la même question : les facettes **éclatent** les valeurs (une entrée par modalité), un `group-by` côté client **compte les combinaisons** (une ligne par assemblage observé). Rien ne signale la divergence. `dsfr-data-unpivot` ne rattrape pas le cas : il travaille sur des noms de colonnes, pas sur des cellules.

### Impact de l'erreur ou du manque

Deux chiffres contradictoires sur la même page, sans avertissement : c'est la famille des défauts qui produisent des résultats faux sans se voir.

### Objectif métier de la correction

Que le traitement d'un champ multivalué soit le même dans tout le pipeline, ou qu'il se déclare.

### Pérennité et reproductibilité du besoin

Structurel : les champs multivalués sont courants en open data (langues, dispositifs, publics).

### Comment ça a été vérifié

Mesuré sur le champ multivalué d'`ecolemap` : 3 modalités côté facettes, 8 lignes côté `group-by` client. Le motif est confirmé sur la déficience sensorielle, où `langue` est multivalué et où 24 établissements appartiennent à deux couches (union = 155, somme = 181).

### Contournement actuel

Agrégation serveur (ODS éclate correctement), au prix de la perte du fonctionnement hors ligne et d'un aller-retour supplémentaire.

### Demande

—

### Critères d'acceptation

- [ ] Un `group-by` client sur un champ multivalué rend les mêmes modalités que `dsfr-data-facets`.
- [ ] Si le comportement « combinaisons » est voulu, il se demande par un attribut explicite.
- [ ] Le volet Diagnostic signale qu'un champ groupé est multivalué.

---

## AM-047 — Pas de boucle dans un template : impossible d'émettre un élément par valeur d'un champ multivalué

**Priorité** P2 · **Effort estimé** M (un à trois jours) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement`, `severity:moyenne`, `dsfr-data-display`, `dsfr-data-list`, `dsfr-data-map`
**Rencontré sur** 2 page(s) : edu/fei-projets-europeens-donnees, edu/annuaire-des-internats

### Constat

Le moteur de templates connaît `{{#if}}` et `{{#unless}}` (#664) mais **aucune boucle**. Le pipe `join` (#663) produit une chaîne ; il n'y a pas moyen de rendre « une pastille `fr-tag` par thème » à partir d'un champ multivalué. Or c'est la forme visuelle standard d'une fiche : les thèmes, les publics, les langues, les dispositifs s'affichent en tags, pas en phrase séparée par des virgules.

### Impact de l'erreur ou du manque

Les fiches d'un annuaire perdent leur structure visuelle : une liste de tags devient une phrase.

### Objectif métier de la correction

Rendre N éléments de balisage à partir d'un champ multivalué, de façon déclarative.

### Pérennité et reproductibilité du besoin

Structurel : les champs multivalués sont partout, et le tag DSFR est leur rendu canonique.

### Comment ça a été vérifié

Vérifié dans le bundle npm publié 0.23.0 : la regex de bloc est `/\{\{#(if|unless)\s+([^}]+?)\s*\}\}([\s\S]*?)\{\{\/\1\s*\}\}/g` — elle ne reconnaît que `if` et `unless`. Ce n'est donc pas un oubli de documentation. La page FEI porte **trois** champs multivalués qui structurent la fiche et le panneau de détail.

### Demande

`{{#each champ}}…{{/each}}`, ou un pipe `{{champ:tags}}` qui rende N éléments plutôt qu'une chaîne.

### Critères d'acceptation

- [ ] Un champ à 3 valeurs rend 3 éléments `fr-tag` distincts.
- [ ] Le cas à 0 valeur ne rend rien (pas de conteneur vide).
- [ ] Fonctionne dans `dsfr-data-display`, dans une cellule de `dsfr-data-list` et dans une popup de carte.

---

## AM-051 — Les compteurs de facette n'ont pas de sens sur une table de mesures, et rien ne le dit

**Priorité** P2 · **Effort estimé** M (un à trois jours) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement`, `severity:moyenne`, `dsfr-data-facets`
**Rencontré sur** 2 page(s) : edu/dnma-usages-ent, edu/capytale-usages

### Constat

Sur un jeu où une ligne est un **objet** (un établissement, un marché), compter les lignes d'une facette **est** l'information. Sur un jeu où une ligne est une **mesure datée** (un UAI × une semaine), ce compte ne répond à rien et induit en erreur : il se lit comme un volume alors qu'il mesure une densité d'observation. Aucun attribut ne pondère une facette par une mesure, ni ne masque un compte dénué de sens.

### Impact de l'erreur ou du manque

Un chiffre faux mais plausible, affiché à côté de chaque valeur de facette, qui inverse un classement.

### Objectif métier de la correction

Qu'une facette compte ce qui a un sens sur le jeu, ou se taise.

### Pérennité et reproductibilité du besoin

Structurel : les portails publient de plus en plus de tables de mesures à côté de leurs tables d'objets. Le banc n'avait jamais rencontré ce modèle avant ce portail.

### Comment ça a été vérifié

Mesuré sur DNMA : la facette `academie` affiche « Lille 326 879 », ce qui **classe Lille devant Versailles alors que Versailles a plus de visites** — le compte porte sur des lignes UAI × semaine, pas sur des usages. Les jeux concernés font 12,35 millions de lignes au total, dont un de 3,9 millions déclaré et jamais lu.

### Demande

`weight-field` sur `dsfr-data-facets` (compter une somme plutôt que des lignes), ou à défaut un masquage des compteurs assorti d'un avertissement en Diagnostic.

### Critères d'acceptation

- [ ] `weight-field="nb_visites"` fait afficher la somme de la mesure au lieu du nombre de lignes.
- [ ] Sans `weight-field`, le comportement actuel est inchangé.
- [ ] Le Diagnostic signale qu'une facette compte des lignes sur un jeu à plusieurs lignes par entité.

---

## AM-056 — Changer le champ d'un filtre selon la source, et vider un groupe de filtres exclusifs

**Priorité** P2 · **Effort estimé** M (un à trois jours) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement`, `severity:moyenne`, `dsfr-data-context`, `dsfr-data-context-filter`
**Rencontré sur** 1 page(s) : edu/portrait-de-territoire-sports

### Constat

Un sélecteur de territoire à six mailles (commune, EPCI, bassin de vie, département, région, France) sur neuf jeux se heurte à deux manques. **Un** : la clé pivot change de nom d'un jeu à l'autre et d'une maille à l'autre — `new_code`, `code_geographique`, `code_insee`, `installation_insee`, tantôt un code tantôt un libellé. Un `dsfr-data-context-filter` par jeu écoutant le même `ui` répond au besoin, mais au prix d'une balise par jeu. **Deux** : rien ne permet de **vider un groupe de filtres mutuellement exclusifs** quand on change de maille.

### Impact de l'erreur ou du manque

Le motif « fiche de territoire » est un genre entier de la donnée publique locale. Le bug de remise à zéro observé dans l'original montre que le contournement manuel est fragile.

### Objectif métier de la correction

Qu'un même choix d'utilisateur adresse des champs de noms différents selon la source, et se retire proprement.

### Pérennité et reproductibilité du besoin

Structurel : les référentiels géographiques ne nomment jamais leurs clés de la même façon.

### Comment ça a été vérifié

24 couples (jeu, maille) relevés sur « Portrait de territoire », avec le nom de clé de chacun. Le second manque cause un bug **mesuré dans l'original** : après un passage d'un EPCI à « France », l'écran affiche « territoire : France » avec **5 QPV au lieu de 1 584**, parce que la remise à zéro efface `epci_code` mais que le jeu QPV porte `code_epci`. La voie `apply-to` + `field` a été lue au source (`dsfr-data-context.ts:316-322`, `dsfr-data-context-filter.ts:325-328`), **non rejouée au navigateur**.

### Demande

Un `field-map` par source sur un filtre de contexte, et une notion de groupe de filtres mutuellement exclusifs qui se vide d'un coup.

### Critères d'acceptation

- [ ] Un filtre unique alimente neuf sources dont les champs portent quatre noms différents.
- [ ] Changer de maille vide les filtres des autres mailles, sans en laisser derrière.
- [ ] L'URL reflète la maille courante et se recharge à l'identique.

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

## AM-054 — Aucune maille géographique non française, ni référentiel de noms de pays en français

**Priorité** P3 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement`, `severity:moyenne`, `dsfr-data-map`, `dsfr-data-chart`
**Rencontré sur** 1 page(s) : edu/fei-projets-europeens-donnees

### Constat

Deux manques jumeaux, rencontrés sur la même page. **Un** : `packages/core/geo/` ne livre que `regions.json` et `departements.json` (#688), et le motif « fond administratif » ne parle que de contours français ; le seul recours hors France est `map-monde`, c'est-à-dire le planisphère (voir AM-055). **Deux** : `toIsoA2` convertit l'alpha-3 et le numérique, mais ne connaît **aucun nom de pays**. Or aucun jeu français ne stocke des codes ISO : il stocke « Allemagne », « slovénie ». Chaque réutilisateur réécrit donc la même table d'appariement.

### Impact de l'erreur ou du manque

Une carte d'Europe oblige aujourd'hui l'auteur à produire et maintenir son propre GeoJSON, plus une table de 66 appariements.

### Objectif métier de la correction

Que les données publiques françaises qui parlent de l'étranger trouvent leur maille et leur référentiel.

### Pérennité et reproductibilité du besoin

Structurel mais peu fréquent : une entrée sur 36 dans ce portail. Le coût est faible (deux fichiers).

### Comment ça a été vérifié

Relevé sur la seule carte non française du portail (44 projets européens). La page d'origine porte une table de **66 lignes** écrite à la main dans son template, qui est la conséquence directe du second manque. Vérifié au source : `toIsoA2` ne prend que des codes ; `geo/` ne contient que les deux fichiers français.

### Demande

`geo/europe.json` sur le modèle de #688 (nom français en propriété), et `geo/pays-iso.json` — ou un `code-field-lookup="nom-fr"` qui résolve le nom vers l'ISO alpha-2.

### Critères d'acceptation

- [ ] `geo/europe.json` est livré hors bundle, comme les régions et départements (#688).
- [ ] Un champ « Allemagne » se résout en `DE` sans table écrite à la main.
- [ ] Les noms sont en français et couvrent au moins l'Union et l'Espace économique européen.

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

## AM-023 — Sur les cartes, `name` n'est pas enveloppé : la forme tableau JSON s'affiche littéralement

**Priorité** P3 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement`, `severity:basse`, `dsfr-data-chart`
**Rencontré sur** 2 page(s) : fiscalite-locale, prix-des-carburants

### Constat

J'avais écrit que les graphiques cartésiens exigeaient `name='["Série"]'`. Faux : une chaîne simple est acceptée partout et enveloppée automatiquement depuis 0.10.0 (`dsfr-data-chart.ts:539-548`). Vrai dans l'autre sens : sur les cartes le JSON est passé tel quel, d'où `["Prix moyen du gazole (€/L)"]` affiché avec crochets et guillemets. Contournement : chaîne simple partout.

### Impact de l'erreur ou du manque

`name` attend un tableau JSON ici, une chaîne là.

### Objectif métier de la correction

Une grammaire cohérente.

### Pérennité et reproductibilité du besoin

Une fois.

### Comment ça a été vérifié

Carte de la fiscalité locale : `name='["Taux moyen TFB (%)"]'` affiche littéralement `["Taux moyen TFB (%)"]` en titre de série ; `name="Taux moyen TFB (%)"` affiche le libellé attendu. Capture avant/après à l'appui. Lot 11, carburants : `name="Prix moyen (€/L)"` en chaîne simple sur le `bar` → légende « Prix moyen (€/L) » ; avant/après sur la carte régionale : `["Prix moyen du gazole (€/L)"]` littéral → « Prix moyen du gazole (€/L) ».

### Contournement actuel

Chaîne simple partout.

### Demande

Déballer la forme tableau sur les cartes (correctif XS), et documenter que la chaîne simple est la forme canonique.

### Critères d'acceptation

- [ ] Les deux formes acceptées sur tous les types, documentées.

---

## AM-030 — Pas de valeur par défaut dynamique (« aujourd'hui ») pour un filtre de contexte — `current-year` existe

**Priorité** P3 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement`, `severity:basse`, `dsfr-data-context-filter`
**Rencontré sur** 1 page(s) : rappel-conso-tableau-de-bord

### Constat

Un filtre s'applique au montage si son UI est déjà remplie, et `url-sync` sait pré-remplir depuis l'URL. Mais rien ne permet de déclarer « la date du jour » comme valeur initiale d'une entrée : une page statique ne connaît pas la date. Sans script, un tableau de bord « au jour J » s'ouvre soit vide (année et mois montrent le total), soit figé sur une date écrite en dur.

Réduction du lot 11 : `operator="current-year"` existe, piloté par une case à cocher cochée au montage, et émet dès `_bind` — un compteur « année en cours » se fait sans script. Il ne remplace pas le script du tableau de bord Rappel Conso, parce que le portail compte l'année *de la date choisie* et non l'année du jour. Reste vrai : pas de `current-month`, pas de « aujourd'hui » comme valeur d'un champ date.

### Impact de l'erreur ou du manque

Un tableau de bord « au jour J » s'ouvre vide ou figé sur une date en dur.

### Objectif métier de la correction

Ouvrir sur aujourd'hui sans JavaScript.

### Pérennité et reproductibilité du besoin

Récurrent avec AM-029.

### Comment ça a été vérifié

Chronométrage en navigateur : les sept requêtes partent à +230 ms, toutes avec la clause de date, aucune requête non filtrée préalable. En retirant le script, les compteurs année et mois affichent 18 581 (le total) au chargement. Page : /viz/rappel-conso-tableau-de-bord (reproduction fidèle de la page vivante /pages/rappel-conso-v2/, variante de /viz/rappelconso). Lot 11, page de test : `current-year` + `<input type="checkbox" checked hidden>` → `where=date_publication >= "2026-01-01" AND < "2027-01-01"`, KPI « 2 402 » sans script. Source : `dsfr-data-context-filter.ts:341-344`, `_bind` l.181-183.

### Contournement actuel

`current-year` pour l'année en cours ; script pour tout le reste.

### Demande

Un attribut `default` sur `dsfr-data-context-filter` acceptant des littéraux relatifs (`today`, `first-of-month`, `first-of-year`), appliqué à l'UI au montage puis émis par le chemin habituel — cohérent avec l'esprit de `last-n-days` et `current-year`, qui savent déjà calculer « maintenant » côté clause.

### Critères d'acceptation

- [ ] `default="today"` (et `first-of-month`, `first-of-year`) sur `dsfr-data-context-filter` remplit l'UI au montage puis émet par le chemin normal.

---

## AM-034 — Un KPI ne peut pas lire le total d'une source en mode serveur (`total_count`) — le compteur, lui, existe sur `dsfr-data-search`

**Priorité** P3 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement`, `severity:basse`, `dsfr-data-kpi`, `dsfr-data-source`
**Rencontré sur** 3 page(s) : fermeture-reseau-cuivre, bofip, prix-controle-technique

### Constat

Avec `server-side`, la source ne publie que la page courante ; `dsfr-data-kpi value="count"` compte donc 20 ou 30, jamais le total. J'en avais conclu « aucun déclaratif ». Voie native ratée (relecture du lot 11) : `dsfr-data-search count` lit `getDataMeta().total` et l'affiche ; la méta étant reposée à chaque fetch, il suit la recherche, les facettes et le contexte. `dsfr-data-list` et `dsfr-data-display` rendent aussi « N résultats ». Ce qui reste vrai : un KPI ne lit jamais la méta (`_computeValue`), donc pas de « 35 305 communes » dans une tuile chiffrée.

### Impact de l'erreur ou du manque

Le total d'une recherche serveur est affichable par `search count`, pas par un KPI.

### Objectif métier de la correction

Donner le résultat le plus utile d'une recherche : combien.

### Pérennité et reproductibilité du besoin

Structurel : toute page `server-side`. La donnée (`total_count`) est déjà dans la meta.

### Comment ça a été vérifié

Lot 11, `count` posé sur les trois moteurs serveur : « 35305 resultats » (réseau cuivre) puis « 1 resultat » après « Siévoz » ; « 9146 » → « 1226 » après la facette BIC (BOFiP) ; « 145146 » → « 28808 » après le choix « Voiture particulière » du contexte (contrôle technique). Source : `dsfr-data-search.ts:294-296, 590-608` ; `dsfr-data-kpi.ts:182-195` ne lit pas la méta.

### Contournement actuel

`dsfr-data-search count` (rendu brut, voir AM-044).

### Demande

Une expression `value="$total"` (ou `meta:total`) sur `dsfr-data-kpi`, lue dans la meta de la source amont en mode serveur.

### Critères d'acceptation

- [ ] `dsfr-data-kpi value="meta:total"` affiche le `total_count` de la source amont en mode serveur.

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

## PG-023 — Le mode `display="champ:radio"` des facettes est un menu déroulant à panneau, pas des boutons radio en ligne

**Priorité** P3 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Accepter (mode radio-inline)
**Labels suggérés** : `enhancement, dx`, `severity:basse`, `dsfr-data-facets`
**Rencontré sur** 1 page(s) : entreprises-restauration-notre-dame

### Constat

Le nom promet deux boutons radio DSFR côte à côte (le Oui / Non du portail) ; le composant rend un bouton `fr-select` qui ouvre un panneau `role=dialog` contenant les radios. C'est documenté ainsi (« radio : dropdown collapsible avec radio buttons DSFR »), donc un nom trompeur plutôt qu'un manque (ex-AM-042, requalifié au lot 11). Le choix unique en ligne natif est `display="champ:select"` : un `<select class="fr-select">` avec « Tous » et les valeurs comptées.

### Impact de l'erreur ou du manque

Nom de mode trompeur ; le choix unique en ligne existe sous un autre nom.

### Objectif métier de la correction

Un Oui / Non en deux boutons radio visibles, comme sur le portail.

### Pérennité et reproductibilité du besoin

Récurrent.

### Comment ça a été vérifié

Page Notre-Dame, facette « Accueil du public » en `display="…:select"` : `<select>` rendu avec « Tous / Non (164) / Oui (61) » ; choisir Oui ramène le KPI « Sélection courante » à 61. Aucun `input[type=radio]` hors panneau en mode `radio` (DOM inspecté, lot 8). Source : `_renderRadioGroup`, `dsfr-data-facets.ts:1640-1720` ; select l.1517.

### Contournement actuel

`display="champ:select"` pour un choix unique en ligne.

### Demande

Un mode `radio-inline` (boutons radio DSFR en ligne, sans panneau), sans changer `radio`.

### Critères d'acceptation

- [ ] `display="champ:radio-inline"` rend des `input[type=radio]` DSFR en ligne, sans panneau.

---

## AM-057 — La valeur courante d'un filtre n'est pas interpolable dans du texte

**Priorité** P3 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement`, `severity:basse`, `dsfr-data-context`
**Rencontré sur** 1 page(s) : edu/portrait-de-territoire-sports

### Constat

Une fiche de territoire écrit « Équipements sportifs à **Rennes** » : le libellé choisi doit apparaître dans les titres et les phrases de la page. Aucun moyen déclaratif de reprendre l'état courant d'un contexte hors d'un composant de donnée.

### Impact de l'erreur ou du manque

Sans cela, une page filtrée ne peut pas se nommer : les titres restent génériques alors que le contenu est spécifique. C'est aussi un point d'accessibilité (le contexte de la page doit être annoncé).

### Objectif métier de la correction

Reprendre dans une phrase la valeur que l'utilisateur vient de choisir.

### Pérennité et reproductibilité du besoin

Structurel : toute page filtrée a des titres à qualifier.

### Comment ça a été vérifié

Relevé sur « Portrait de territoire », dont l'original interpole le nom du territoire dans une dizaine de titres et d'intertitres. Contournement possible par un `dsfr-data-display` sur une source d'une ligne, mais c'est une requête pour afficher un mot déjà connu du contexte.

### Demande

Interpolation de l'état du contexte dans du texte libre (par exemple un composant `dsfr-data-context-value` ou un attribut sur un élément hôte).

### Critères d'acceptation

- [ ] Le libellé du filtre courant s'affiche dans un `<h1>` sans requête supplémentaire.
- [ ] L'état vide rend un texte de repli déclaré.
- [ ] La valeur affichée est le libellé, pas le code.

---

## AM-059 — Colorer une cellule selon un seuil dans un tableau

**Priorité** P3 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Étudier
**Labels suggérés** : `enhancement`, `severity:basse`, `dsfr-data-list`
**Rencontré sur** 2 page(s) : edu/capytale-usages, edu/portrait-de-territoire-sports

### Constat

`threshold-*` n'existe que sur `dsfr-data-kpi`. `compute` ne fait pas de condition — et #671, qui l'y ajoutera, produira une **valeur**, pas une classe CSS. CSS ne compare pas de nombres. Un tableau dont une colonne doit signaler un dépassement n'a donc pas de voie déclarative.

### Impact de l'erreur ou du manque

Un tableau de suivi sans signalement visuel oblige le lecteur à comparer les nombres un à un.

### Objectif métier de la correction

Marquer visuellement une cellule qui dépasse un seuil.

### Pérennité et reproductibilité du besoin

Fréquent sur les tableaux de bord ; dépend de ce que #671 rendra possible.

### Comment ça a été vérifié

Relevé sur Capytale, dont le classement d'académies est écrit en dur avec ses pastilles de seuil (10 lignes de HTML statique, dont trois chiffres déjà faux — vérifiés à l'API). À rapprocher de #671 sans être couvert par lui : il faudra vérifier au jalon si une valeur calculée peut alimenter un attribut de classe.

### Demande

Un `threshold-*` sur une colonne de `dsfr-data-list`, ou la possibilité d'alimenter un attribut `class` depuis une valeur calculée.

### Critères d'acceptation

- [ ] Une colonne dépassant un seuil déclaré reçoit une classe DSFR.
- [ ] Le CSV exporté n'est pas affecté.
- [ ] L'information portée par la couleur est aussi disponible en texte (RGAA 1.4.1).

---

## AM-060 — `color-map` n'existe que sur une couche de carte, et sa grammaire sépare par des virgules

**Priorité** P3 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement`, `severity:basse`, `dsfr-data-chart`, `dsfr-data-map-layer`
**Rencontré sur** 3 page(s) : edu/portrait-de-territoire-sports, edu/generation-2024, edu/label-egalite-fille-garcon

### Constat

Deux points sur le même attribut. **Un** : `color-map` est porté par la couche de carte, pas par `dsfr-data-chart` — une même modalité ne peut donc pas garder sa couleur entre la carte et le graphique de la même page, ce qui est pourtant la première attente d'un tableau de bord. **Deux** : sa grammaire sépare les paires par des virgules, or des valeurs métier en contiennent.

### Impact de l'erreur ou du manque

Une modalité change de couleur entre deux blocs de la même page ; et un jeu dont les libellés contiennent une virgule ne peut pas être coloré du tout.

### Objectif métier de la correction

Qu'un codage couleur soit déclaré une fois et respecté partout.

### Pérennité et reproductibilité du besoin

Structurel : les libellés métier contiennent des virgules, et les tableaux de bord mêlent cartes et graphiques.

### Comment ça a été vérifié

Relevé sur Génération 2024, dont le champ `type` compte **39 valeurs réelles dont plusieurs contiennent une virgule** : la grammaire ne permet pas de les cartographier. Le besoin de couleur partagée carte/graphique vient de « Portrait de territoire » ; le besoin de `color-map` tout court est établi sur le Label égalité, où trois niveaux de labellisation doivent être distingués.

### Demande

`color-map` sur `dsfr-data-chart`, et un séparateur qui admette des valeurs à virgule (ou un échappement, cohérent avec #676).

### Critères d'acceptation

- [ ] `color-map` est accepté par `dsfr-data-chart` avec la même grammaire que sur la couche.
- [ ] Une valeur contenant une virgule est cartographiable (séparateur ou échappement).
- [ ] Une grammaire invalide produit un avertissement, pas un silence (cf. PG-022).

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

## AM-058 — Un filtre qui traverse un référentiel (académie → départements)

**Priorité** P3 · **Effort estimé** M (un à trois jours) · **Décision proposée** Étudier
**Labels suggérés** : `enhancement`, `severity:moyenne`, `dsfr-data-context-filter`, `dsfr-data-join`
**Rencontré sur** 2 page(s) : edu/portrait-de-territoire-sports, edu/dataviz-ips-ecoles

### Constat

Choisir une académie doit filtrer un jeu qui ne porte que le département. La relation est un référentiel stable, mais il faut aujourd'hui charger un jeu d'appariement et joindre côté client pour un filtre que le contexte pourrait résoudre seul.

### Impact de l'erreur ou du manque

Sans cela, toute hiérarchie territoriale absente du jeu impose une jointure côté client.

### Objectif métier de la correction

Filtrer un jeu par un niveau qu'il ne porte pas, via un référentiel.

### Pérennité et reproductibilité du besoin

Structurel : académie/département, EPCI/commune, région/département — les jeux ne portent jamais tous les niveaux.

### Comment ça a été vérifié

Relevé sur « Portrait de territoire » (onglet Rectorat) et retrouvé sur les pages d'IPS, où la cascade académie → département → commune est le geste principal. Sur les écoles, la cascade des facettes serveur ne suffit pas : **79 des 103 départements ont plus de 100 communes**, or `/facets` plafonne à 100 valeurs — mesuré.

### Demande

Résolution d'un filtre à travers une table de correspondance déclarée (le filtre porte une valeur, la source reçoit la liste des valeurs correspondantes).

### Critères d'acceptation

- [ ] Un filtre « académie » restreint un jeu qui n'a qu'un champ « département ».
- [ ] La table de correspondance est déclarée une fois, pas rechargée par filtre.
- [ ] Le tag affiche l'académie choisie, pas la liste des départements.

---

## AM-016 — Pas de fond administratif livré avec la bibliothèque pour une couche geoshape — mais un GeoJSON statique fait le travail

**Priorité** P3 · **Effort estimé** M (un à trois jours) · **Décision proposée** Accepter (GeoJSON dans le paquet, hors bundle) ; `builtin` refusé
**Labels suggérés** : `enhancement`, `severity:basse`, `dsfr-data-map`, `dsfr-data-map-layer`
**Rencontré sur** 1 page(s) : restauration-notre-dame

### Constat

Afficher les contours des régions comme repère obligeait à charger un jeu externe (`georef-france-region` sur public.opendatasoft.com, 307 Ko, 1 à 5 s selon les essais). J'avais écrit que `dsfr-data-chart type="map-reg"` « embarque déjà les géométries » : prémisse fausse, DSFR Chart embarque des SVG (`MapChart.js`, ~643 Ko), aucun GeoJSON réutilisable par Leaflet. Voie native ratée (lot 11) : la recette du guide est un GeoJSON simplifié *statique* servi par la page, `<dsfr-data-source url="…geojson" transform="features">` + couche `no-interactive`. Reste vrai : ce fichier n'est pas dans le paquet npm, et celui du guide ne couvre que la métropole.

### Impact de l'erreur ou du manque

Afficher des contours régionaux comme repère coûte un jeu externe de 135 Ko et 5 s.

### Objectif métier de la correction

Réutiliser les géométries déjà embarquées pour `map-reg`.

### Pérennité et reproductibilité du besoin

Récurrent.

### Comment ça a été vérifié

Lot 11, Notre-Dame : `url="/data/geo/regions-simplifiees.geojson" transform="features"`, `geo-field="geometry"` → 13 polygones rendus (`getRenderedCount()`), plus aucune requête vers public.opendatasoft.com ; 225 Ko servis en 0,8 ms en local contre 307 Ko et 1,07 s pour le jeu distant ce jour. Les encarts DROM n'ont plus de contour.

### Contournement actuel

GeoJSON simplifié statique servi par la page (recette `guide/examples/carte-territoires-electrification-v2.html`).

### Demande

Livrer des GeoJSON simplifiés (régions, départements, métropole + DROM) dans le paquet npm, hors bundle, référençables par URL CDN.

### Critères d'acceptation

- [ ] `dsfr-data/geo/regions.geojson` et `departements.geojson` publiés dans le paquet npm, chargeables depuis jsDelivr.
- [ ] Le guide documente la couche décorative depuis ces fichiers.

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

## AM-062 — Aucune position documentée sur l'encastrement en iframe

**Priorité** P4 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement`, `severity:basse`, `documentation`
**Rencontré sur** 1 page(s) : edu/equipements-sportifs-milieu-scolaire

### Constat

Le portail Sports publie une page dont l'unique raison d'être est d'être encastrée ailleurs (`?headless=true`). Rien dans la documentation de `dsfr-data` ne traite de l'encastrement — ni comme motif à servir, ni comme motif à décourager. Or l'argument du banc d'essai est précisément qu'une dataviz `dsfr-data` **est** le contenu de la page hôte : pas de second document, pas de second moteur, pas de mentions légales perdues en route.

### Impact de l'erreur ou du manque

Une page encastrée qui perd sa déclaration d'accessibilité et ses mentions légales est un problème de conformité, pas d'ergonomie.

### Objectif métier de la correction

Dire ce que la bibliothèque recommande quand une dataviz doit vivre dans un site tiers.

### Pérennité et reproductibilité du besoin

Durable : la demande d'encastrement revient à chaque fois qu'un site institutionnel veut réutiliser une dataviz d'un autre.

### Comment ça a été vérifié

Mesuré, deux chargements comparés avec et sans le paramètre : `?headless=true` vide l'en-tête et le pied — dont **la déclaration d'accessibilité, la gestion des cookies, les CGU, la politique de confidentialité et la licence** —, retire le widget de chat, 4 scripts, **18 feuilles de style**, 70 ressources, 20 Ko et 463 px. Mais il garde le moteur entier : **48 requêtes d'API et 55 Ko à l'identique**, 27 scripts et 13 CSS d'AngularJS/ODS. L'hôte hérite donc de la donnée sans les mentions obligatoires.

### Demande

Une position documentée sur l'encastrement, et sur ce qu'il advient des mentions obligatoires.

### Critères d'acceptation

- [ ] Le guide dit quand encastrer, quand intégrer les balises, et ce que devient l'accessibilité.
- [ ] Le cas « site tiers hors DSFR » est traité explicitement.

---

## AM-013 — L'interface des facettes se rend là où la balise est écrite, pas là où on la veut

**Priorité** P4 · **Effort estimé** M (un à trois jours) · **Décision proposée** Refusé côté lib (a11y) ; remède = AM-001 + convention
**Labels suggérés** : `enhancement`, `severity:basse`, `dsfr-data-facets`, `dsfr-data-search`
**Rencontré sur** 8 page(s) : plan-de-relance, qualite-tourisme, tourisme-et-handicap, restauration-notre-dame, prix-des-carburants, entreprise-patrimoine-vivant, annuaire-services-dgfip, centres-controle-technique

### Constat

Le câblage du pipeline se fait par `id`, indépendamment de la position dans le DOM — c'est la bonne propriété. Mais `dsfr-data-facets` et `dsfr-data-search` rendent leur interface à l'endroit exact où la balise est écrite. Sur un tableau de bord à colonne de filtres, ils doivent donc être physiquement dans cette colonne, alors que les `dsfr-data-query` qui les consomment s'écrivent plus haut. L'ordre du fichier cesse de refléter l'ordre du pipeline.

Décision du lot 11 (relecture dsfr-data) : choix de conception, pas un manque. Facettes et recherche sont des composants visuels en light DOM ; le motif « orchestrateur invisible + UI libre câblée par `id` » existe déjà, c'est le contexte. Un `render-into` déplacerait focus, `aria-controls` et régions live (risque a11y). Le remède à « l'ordre du fichier ne reflète plus le pipeline » est AM-001, plus une convention de lecture (bloc pipeline commenté en tête, UI dans la mise en page).

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

## AM-061 — Contrôles de carte : bascule du fond, plein écran, capture

**Priorité** P4 · **Effort estimé** M (un à trois jours) · **Décision proposée** Étudier
**Labels suggérés** : `enhancement`, `severity:basse`, `dsfr-data-map`
**Rencontré sur** 2 page(s) : edu/educajou-ecolemap, edu/annuaire-des-internats

### Constat

Trois contrôles usuels d'une carte n'ont pas de composant : le **choix du fond** (six préréglages existent et réagissent à chaud, mais rien ne les expose à l'utilisateur), le **plein écran**, et la **capture** de la carte en image. Les deux derniers sont offerts par Opendatasoft et par la plupart des visualiseurs.

### Impact de l'erreur ou du manque

Confort ; aucune donnée n'est perdue sans ces contrôles.

### Objectif métier de la correction

Offrir sur une carte les gestes que les utilisateurs y attendent.

### Pérennité et reproductibilité du besoin

Durable mais non bloquant. Le fond est le plus simple : le mécanisme existe déjà.

### Comment ça a été vérifié

Relevé sur `ecolemap`, dont l'application maison expose le choix du fond, et sur l'annuaire des internats, dont le kebab de bloc propose l'export PNG. Entrée issue de la fusion de deux constats distincts relevés par deux agents (règle « fusionner avant d'ajouter »).

### Demande

Un `dsfr-data-map-controls` (ou des attributs sur `dsfr-data-map`) exposant le fond, le plein écran et la capture.

### Critères d'acceptation

- [ ] Un contrôle de fond permet de basculer entre les préréglages livrés.
- [ ] Le plein écran est atteignable au clavier et annonce son état.
- [ ] La capture rend une image contenant la légende.

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
