# Demandes à déposer sur bmatge/dsfr-data — rapport de cadrage

> Fichier généré par `node scripts/build-retours.mjs` depuis `public/data/retours.json`.
> 47 demandes cadrées — 9 bugs,
> 32 améliorations,
> 5 pièges à désamorcer dans la bibliothèque plutôt que dans la documentation.
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
et malgré tout absente du bundle chargé** par un site — les 26 pages de ce dépôt ont épinglé
`dsfr-data@0.20.0` pendant que npm servait déjà 0.23.0, puis 0.24.0. Avant de conclure à un manque,
il faut donc chercher l'attribut dans le source, **puis vérifier dans quelle version publiée il
apparaît**. Trois demandes de ce rapport sont nées de ce piège, et deux constats antérieurs
(AM-017, AM-039) en sont sortis.

Le dépôt est désormais monté en `dsfr-data@0.24.0`, et le registre en tire les conséquences :
les jalons 0.21.1, 0.22.0, 0.23.0 et 0.24.0 ont comblé 50 des constats déposés,
passés au statut `corrige` et sortis de ce rapport. Ce qui reste ci-dessous n'est ni livré ni
planifié — à deux exceptions près, signalées comme telles : `fetch-mode="export"` (#689) et
`require-where` (#690), prévus au jalon v0.25.0.

## Priorisation

### P1 — immédiat : chiffres faux ou fonctions inutilisables, correction courte

| Id | Demande | Type | Effort | Pages | Décision |
|---|---|---|---|---|---|
| BUG-005 | Le refine d'une facette serveur sur un champ date est typé texte : HTTP 400 silencieux | bug | S | 1 | Accepter |
| AM-048 | Aucun diagnostic quand un attribut désigne un champ qui n'existe pas dans le schéma | amelioration | S | 5 | Accepter |
| AM-050 | Aucun opérateur d'année scolaire : `year-of` coupe l'année scolaire en deux, en silence | amelioration | S | 4 | Accepter |
| AM-052 | La fiche servie par le serveur MCP est en retard sur la documentation du dépôt | amelioration | S | 4 | Accepter |
| AM-053 | Un attribut inconnu d'un composant est ignoré sans aucun avertissement | amelioration | S | 2 | Accepter |
| AM-064 | En mode adaptateur, aucun moyen de passer un paramètre de requête qui n'est pas une clause (`timezone`) | amelioration | S | 1 | Accepter |
| BUG-013 | Une facette `url-params` s'approprie le paramètre d'URL d'un contexte `url-sync` et vide le pipeline en silence | bug | S | 1 | Accepter |
| BUG-014 | `normalizeDeptCode` sait ajouter un zéro de tête, jamais en retirer un : un code sur trois caractères vide la carte | bug | S | 1 | Accepter |
| AM-045 | La sélection ne part que d'une carte : ni une liste, ni une fiche, ni un graphique ne peut filtrer un contexte | amelioration | M | 5 | Accepter |
| AM-049 | Un ratio dont le numérateur et le dénominateur viennent de deux sources différentes | amelioration | M | 4 | Accepter |
| AM-066 | `fill-field` et ses quatre attributs compagnons sont ignorés sans un mot sur une couche `type="circle"` | amelioration | M | 1 | Accepter |
| BUG-009 | Une `dsfr-data-query group-by` branchée sur une source Opendatasoft réécrit la source pour tous ses autres consommateurs | bug | L | 2 | Accepter |

_12 demandes — S 8, M 3, L 1._

### P2 — prochain cycle : gain net, effort mesuré

| Id | Demande | Type | Effort | Pages | Décision |
|---|---|---|---|---|---|
| AM-072 | Les blocs de gabarit ne s'imbriquent pas, et l'imbrication échoue en silence | amelioration | S | 6 | Accepter |
| PG-022 | Les grammaires d'attributs multi-entrées diffèrent d'un attribut à l'autre : `|` ici, `,` là | piege | S | 3 | Accepter (documentation + avertissement) |
| BUG-007 | `replace-fields` est silencieusement sans effet sur une valeur numérique | bug | S | 1 | Accepter |
| AM-067 | Une facette bâtie sur une source pré-agrégée affiche « 1 » partout : aucun attribut ne lui désigne la colonne d'effectif | amelioration | S | 1 | Accepter |
| BUG-010 | Un alias de `group-by` sans parenthèse est backquoté et vaut un HTTP 400 : le correctif #641 ne couvre que les expressions à fonction | bug | S | 1 | Accepter |
| AM-068 | Le cumul est arrivé, son inverse manque : aucun moyen de retrouver le flux d'une série déjà cumulée | amelioration | S | 1 | Accepter |
| AM-071 | `replace-fields` ignore silencieusement les champs multivalués — ceux qu'on a précisément besoin de nettoyer | amelioration | S | 2 | Accepter |
| AM-044 | Le compteur `count` de `dsfr-data-search` rend « 35305 resultats » : ni séparateur de milliers, ni accent | amelioration | S | 3 | Accepter |
| LIM-014 | Le résumé « en France » d'une choroplèthe DSFR Chart est une moyenne non pondérée des territoires, et il est faux | limite-dure | M | 3 | Accepter |
| AM-046 | Le cumul existe, mais seulement dans un `_bucketDate` privé de la couche de carte | amelioration | M | 2 | Accepter |
| BUG-006 | Un champ multivalué : `dsfr-data-facets` éclate les valeurs, un `group-by` client compte les combinaisons | bug | M | 2 | Accepter |
| AM-047 | Pas de boucle dans un template : impossible d'émettre un élément par valeur d'un champ multivalué | amelioration | M | 2 | Accepter |
| AM-051 | Les compteurs de facette n'ont pas de sens sur une table de mesures, et rien ne le dit | amelioration | M | 2 | Accepter |
| AM-056 | Changer le champ d'un filtre selon la source, et vider un groupe de filtres exclusifs | amelioration | M | 1 | Accepter |
| AM-070 | Le ratio d'un KPI sait filtrer un `count`, pas une `sum` : une part n'est pas calculable sur une source pré-agrégée | amelioration | M | 1 | Accepter |
| BUG-011 | Une virgule à l'intérieur d'une fonction casse `group-by` : l'adaptateur découpe avant d'analyser les parenthèses | bug | M | 1 | Accepter |
| AM-074 | Aucune union dans le pipeline : empiler quatre séries demande quatre pivots, trois jointures et un dépliage | amelioration | M | 2 | Accepter |
| AM-075 | Un ratio dont le numérateur et le dénominateur viennent de deux jeux n'a aucune voie native | amelioration | L | 2 | Accepter |

_18 demandes — S 8, M 9, L 1._

### P3 — backlog : confort, cas moins fréquents

| Id | Demande | Type | Effort | Pages | Décision |
|---|---|---|---|---|---|
| AM-054 | Aucune maille géographique non française, ni référentiel de noms de pays en français | amelioration | S | 1 | Accepter |
| PG-024 | Deux `for` voisins de la même carte désignent deux choses différentes : la couche pour la légende, la carte pour l'a11y | piege | S | 1 | Accepter |
| PG-016 | Le tri des facettes est global, pas par champ | piege | S | 2 | Accepter |
| LIM-011 | `color-map` sépare ses paires par une virgule, que des valeurs métier contiennent | amelioration | S | 3 | Accepter |
| AM-057 | La valeur courante d'un filtre n'est pas interpolable dans du texte | amelioration | S | 1 | Accepter |
| AM-059 | Colorer une cellule selon un seuil dans un tableau | amelioration | S | 2 | Étudier |
| AM-060 | `color-map` n'existe que sur une couche de carte, pas sur `dsfr-data-chart` | amelioration | S | 2 | Accepter |
| AM-065 | `dsfr-data-search count` n'a pas d'état vide : il affiche « 0 résultats » quand rien n'a été demandé | amelioration | S | 1 | Accepter |
| PG-027 | L'adaptateur Opendatasoft backquote `group-by` mais pas `select` : un champ au nom non standard vaut un HTTP 400 | piege | S | 1 | Accepter |
| BUG-012 | La grammaire du ratio déclenche l'avertissement de dépréciation qu'elle ne devrait pas : `count:champ:valeur` est la forme recommandée | bug | S | 2 | Accepter |
| AM-058 | Un filtre qui traverse un référentiel (académie → départements) | amelioration | M | 2 | Étudier |
| AM-069 | Une couche dont tous les points sont confondus se comporte comme une couche qui marche : rien ne le signale | amelioration | M | 1 | Accepter |

_12 demandes — S 10, M 2, L 0._

### P4 — hors périmètre ou refus motivé

| Id | Demande | Type | Effort | Pages | Décision |
|---|---|---|---|---|---|
| AM-062 | Aucune position documentée sur l'encastrement en iframe | amelioration | S | 1 | Accepter |
| PG-025 | Le `where` d'un `dsfr-data-context` ne peut pas porter sur un alias d'agrégat : il s'applique avant le `group_by` | piege | S | 1 | Accepter |
| AM-073 | `cell-class` n'accepte qu'un identifiant CSS : le libellé restitué aux lecteurs d'écran est un slug | amelioration | S | 1 | Accepter |
| AM-061 | Contrôles de carte : bascule du fond, plein écran, capture | amelioration | M | 2 | Étudier |
| AM-037 | Pas de treemap | amelioration | L | 1 | Transférer à DSFR Chart |

_5 demandes — S 3, M 1, L 1._

## Les demandes

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
**Rencontré sur** 4 page(s) : edu/offre-formation-langues, edu/carto-pix-fiche-etablissement, edu/fei-projets-europeens-donnees, edu/tne-dashboard

### Constat

`get_skill(dsfrDataMap, "reference")` sert une référence de `dsfr-data-map-layer` **sans** `refine-on-click`, `context`, `label` ni l'événement `dsfr-data-map-select`, alors que `skills/dsfr-data/references/dsfr-data-map.md` **les documente**. Ce n'est donc pas un manque de documentation : c'est un décalage entre la doc du dépôt et celle que sert le MCP — plus insidieux, parce que le lecteur consciencieux qui interroge le MCP obtient une réponse fausse par omission. Le même décalage frappe `dsfrDataDisplay`, dont la fiche ignore `{{#if}}`, `{{champ:date}}` et les pipes livrés en 0.22.0. — Deuxième occurrence, sur un autre composant (2026-09-10) : la référence de l'attribut `value` de `dsfr-data-kpi` servie par `get_skill(dsfrDataKpi, "reference")` documente `champ:fn`, `distinct`, `meta:total`, le ratio, `count:champ:valeur` et `evolution` — mais **pas `first` ni `last`**, qui existent pourtant (`packages/core/src/utils/aggregations.ts`, `case 'last'`). Sur le tableau de bord TNE, `:last` est la seule écriture juste pour lire la dernière valeur d'une série chronologique ; faute de la connaître, la page affichait le maximum mensuel (95 672) au lieu de la valeur du dernier mois publié (94 383). Un chiffre faux, trouvé en lisant le source.

### Impact de l'erreur ou du manque

Une documentation en retard ne ralentit pas : elle fait écrire des critiques fausses. Trois agents en une journée, dont un jusqu'à la rédaction.

### Objectif métier de la correction

Que la fiche servie par le MCP corresponde à la version publiée, et le dise.

### Pérennité et reproductibilité du besoin

Structurel : l'écart se recreusera à chaque version tant que la génération n'est pas automatique.

### Comment ça a été vérifié

Trois agents du lot 12 s'y sont fait prendre le même jour. L'un a écrit un faux manque (« rien ne relie déclarativement un clic carte à une seconde source ») avant correction ; un autre a écarté une voie native et l'a rouverte après signalement, ce qui a réglé deux défauts qu'il avait classés sans solution ; un troisième a d'abord classé cinq limites qui n'en étaient pas. Vérifié des deux côtés : l'attribut est dans `packages/core/src/components/dsfr-data-map-layer.ts` (propriété l. 209) et dans `skills/dsfr-data/references/dsfr-data-map.md`, absent de la sortie du MCP. — Recoupé le 2026-09-10 : `get_skill(dsfrDataKpi, "reference")` appelé dans la session ne mentionne ni `first` ni `last` ; les deux sont présents au source et fonctionnent en page (`value="…:last"` rend 94 383, la dernière ligne de la série triée `mois_saisie:asc`).

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

## AM-064 — En mode adaptateur, aucun moyen de passer un paramètre de requête qui n'est pas une clause (`timezone`)

**Priorité** P1 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement`, `severity:haute`, `dsfr-data-source`
**Rencontré sur** 1 page(s) : prix-des-carburants

### Constat

`fetch-mode="export"` (#689) doit permettre de retirer les contournements par source générique. Il ne le permet pas partout : le mode adaptateur ne transmet que des **clauses** (`select`, `where`, `group-by`, `order-by`, `limit`), et `this.params` n'est lu que sur le chemin URL générique. Or l'API Opendatasoft accepte des **paramètres de requête** qui ne sont pas des clauses, dont `timezone`, indispensable dès qu'un `date_format` ODSQL rend une heure. Une page qui en a besoin ne peut donc pas être migrée — et si on la migre sans s'en apercevoir, elle affiche des heures **justes en apparence et fausses de deux heures**.

### Impact de l'erreur ou du manque

Le seul cas connu où `fetch-mode="export"` ne peut pas remplacer le contournement qu'il vient supprimer. Et le mode d'échec est le pire : migrer sans le voir donne des heures fausses sans aucun message.

### Objectif métier de la correction

Qu'une page ayant besoin d'un paramètre de requête non-clause puisse quand même passer en mode adaptateur.

### Pérennité et reproductibilité du besoin

Structurel : `timezone` concerne tout jeu horodaté rendu avec `date_format`, c'est-à-dire une grande partie des jeux temps réel des portails.

### Comment ça a été vérifié

Établi au source le 2026-09-10 : `AdapterParams` (`dsfr-data-source.ts`, `getAdapterParams()` l. 923) ne porte ni `timezone` ni passe-plat ; `this.params` n'apparaît qu'aux lignes 988, 1034 et 1057, toutes sur le chemin générique ; aucune occurrence de `timezone` dans `dsfr-data-source.ts` ni dans `opendatasoft-adapter.ts`. Contournement par la clause écarté par test à l'API : `date_format(champ, "…", "Europe/Paris")` renvoie une ODSQLSyntaxError. Conséquence mesurée sur la page des prix des carburants : sans `timezone=Europe/Paris`, une même station rend « 09:23 » au lieu de « 11:23 », sur les six dates de mise à jour et 9 807 stations. La page est donc **restée en mode générique** au lot 13, seule des quinze.

### Contournement actuel

Rester en source générique (`url=` + `params`) — c'est-à-dire renoncer au mode adaptateur, ce que #689 était censé rendre inutile.

### Demande

Un attribut `timezone` sur `dsfr-data-source` en mode adaptateur, ou plus généralement un passe-plat de paramètres de requête pour ce que le portail accepte hors clauses.

### Critères d'acceptation

- [ ] Une source en `fetch-mode="export"` avec `timezone="Europe/Paris"` rend les mêmes heures que la source générique équivalente.
- [ ] Le paramètre est transmis aussi bien en mode `records` qu'en mode `export`.
- [ ] Un paramètre non reconnu par le portail produit un message, pas un silence.

---

## BUG-013 — Une facette `url-params` s'approprie le paramètre d'URL d'un contexte `url-sync` et vide le pipeline en silence

**Priorité** P1 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Accepter
**Labels suggérés** : `bug`, `severity:haute`, `dsfr-data-facets`, `dsfr-data-context`
**Rencontré sur** 1 page(s) : edu/carto-pix-fiche-etablissement

### Constat

Sur une page où un `dsfr-data-context url-sync` écrit `?annee=2025` dans l'URL et où un `dsfr-data-facets url-params` lit cette URL sans déclarer `context`, la facette applique une sélection sur le champ `annee` — qui n'est pourtant PAS dans ses `fields`. La garde de #312 (« seuls les paramètres correspondant à des champs connus ») est trop large : les champs connus incluent toutes les colonnes des données reçues, pas seulement ceux que la facette expose. Cette sélection n'est appliquée qu'une fois, au premier chargement, et reste FIGÉE. Dès que le contexte fait recharger la source sur une autre année, la sélection ne correspond plus à aucune ligne et la facette rend zéro ligne — silencieusement, alors que la source a bien reçu ses données et que le composant de recherche en amont affiche le bon total. Deux composants prétendent posséder le même paramètre d'URL, et le plus discret gagne. La bibliothèque prévoit d'ailleurs la collision, mais seulement quand la facette déclare `context="…"`.

### Impact de l'erreur ou du manque

Page entièrement vide après un changement de filtre, sans le moindre message. Le motif — un contexte qui porte le filtre principal, des facettes qui affinent — est celui que la bibliothèque encourage depuis #678, et `url-params` est la façon documentée de rendre une page partageable. Les deux ensemble cassent la page.

### Objectif métier de la correction

Qu'une facette ne s'approprie pas un paramètre d'URL qui ne lui appartient pas.

### Pérennité et reproductibilité du besoin

Durable : la coexistence contexte + facettes est le motif standard d'une page d'exploration.

### Comment ça a été vérifié

Reproduit isolément au navigateur le 2026-09-10 (dsfr-data 0.28.0) sur `fr-en-pix_participations_aux_campagnes_par_etablissement_sans_collecte_de_profil`. Page minimale : une source, un `dsfr-data-context url-sync` avec un filtre `annee` (défaut 2025), une `dsfr-data-facets url-sync url-params` déclarant `fields="secteur, academie_nom"`, un KPI `count` branché sur la facette. Au chargement : URL `?annee=2025`, KPI **10 331**, et **deux cases à cocher `annee` fantômes** présentes dans le DOM de la facette. Après bascule sur 2023 par le sélecteur : URL `?annee=2023`, la source recharge correctement (10 186 lignes confirmées à l'API), et le KPI tombe à **0**. Aucune erreur console, aucune erreur de configuration.

### Contournement actuel

Poser `url-param-map` sur la facette en nommant explicitement ses propres paramètres : la lecture bascule alors en liste blanche et la synchronisation d'URL des facettes est conservée. Ou retirer `url-params` de la facette, au prix de la restauration de ses sélections.

### Demande

Qu'une facette en `url-params` ne lise que les paramètres correspondant à ses propres `fields`, et non à toutes les colonnes des données. À défaut, signaler en erreur de configuration la collision entre un paramètre de facette et un paramètre de contexte de la même page.

### Critères d'acceptation

- [ ] Une facette en `url-params` ignore un paramètre dont le nom n'est pas dans ses `fields`.
- [ ] Aucune case à cocher n'est créée pour un champ non déclaré.
- [ ] Un changement de filtre du contexte n'annule pas les données de la facette.
- [ ] Le cas `url-param-map` explicite continue de fonctionner à l'identique.

---

## BUG-014 — `normalizeDeptCode` sait ajouter un zéro de tête, jamais en retirer un : un code sur trois caractères vide la carte

**Priorité** P1 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Accepter
**Labels suggérés** : `bug`, `severity:haute`, `dsfr-data-chart`
**Rencontré sur** 1 page(s) : edu/educajou-ecolemap

### Constat

La normalisation des codes de département de `dsfr-data-chart type="map"` complète à deux chiffres (`9` → `09`) mais ne traite pas le cas symétrique : un code déjà sur trois caractères est rendu tel quel. Or `fr-en-annuaire-education`, l'un des jeux les plus employés du portail Éducation, publie `code_departement` sur TROIS caractères (`059`, `075`). DSFR Chart attend `59` : 101 départements sur 107 sont donc ignorés et la carte sort presque entièrement grise, pour un seul avertissement en console. Le correctif tient en une ligne — retirer un zéro de tête quand le reste forme un code valide — et il est symétrique de celui qui existe déjà.

### Impact de l'erreur ou du manque

Carte quasi vide sur l'un des jeux les plus utilisés du portail Éducation, pour un seul avertissement console. Le format à trois caractères est courant : c'est celui du COG.

### Objectif métier de la correction

Qu'un code de département publié sur trois caractères soit reconnu.

### Pérennité et reproductibilité du besoin

Durable : le zéro de tête est une convention répandue des référentiels administratifs.

### Comment ça a été vérifié

Lu au source le 2026-09-10 (dsfr-data 0.28.0), `packages/shared/src/utils/dept-codes.ts` : `if (/^\d+$/.test(code) && code.length < 3) return code.padStart(2, '0'); return code;` — la garde `length < 3` exclut explicitement les codes à trois caractères. Constaté en page sur la reproduction d'ÉcoleMap : 101 départements sur 107 ignorés, carte quasi grise, contourné par `compute="code_departement * 1"`.

### Contournement actuel

`compute` avec une multiplication par 1, qui force la conversion numérique et retire le zéro. Fonctionne, mais suppose d'avoir diagnostiqué que le problème vient du format du code et non de la donnée.

### Demande

Retirer le zéro de tête d'un code à trois caractères quand les deux derniers forment un code de département valide, symétriquement au `padStart` existant. Attention aux codes d'outre-mer à trois chiffres (971 à 976), qui doivent rester intacts.

### Critères d'acceptation

- [ ] `059` est reconnu comme `59`.
- [ ] `9` reste complété en `09`.
- [ ] `971` à `976` restent intacts.
- [ ] Un test couvre les trois formes.

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

## AM-066 — `fill-field` et ses quatre attributs compagnons sont ignorés sans un mot sur une couche `type="circle"`

**Priorité** P1 · **Effort estimé** M (un à trois jours) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement`, `severity:haute`, `dsfr-data-map-layer`, `dsfr-data-map-legend`
**Rencontré sur** 1 page(s) : edu/dataviz-ips-colleges

### Constat

Colorer des points par une valeur numérique est le besoin élémentaire d'une carte de mesures — ici l'IPS de 6 971 collèges, qui est le sujet annoncé par le titre de la page. Le chemin évident est `fill-field` + `classes` / `method` / `breaks` / `selected-palette`, et c'est ce que décrivent leurs JSDoc : « champ numérique utilisé pour le remplissage en choroplèthe », « nombre de classes de la choroplèthe (`fill-field`) ». Rien n'y dit « polygones seulement ». Sur `type="circle"`, les cinq attributs sont acceptés puis ignorés : la condition au source est `this.fillField && this.type === 'geoshape'`, aux deux endroits qui comptent — le calcul des classes (`classifyValues`) et la construction de la légende (`_buildLegendEntries`). L'échec est total et muet : tous les cercles sortent en `color` (bleu France), `getLegendEntries()` renvoie une entrée unique sans libellé, ce qui fait rendre la légende `hidden`, et `getSkippedCount()` vaut 0. Voie native existante, trouvée après coup : discrétiser soi-même en `dsfr-data-normalize compute`, puis colorer par `color-field` + `color-map`, catégoriels et fonctionnels sur les points. Elle produit un bon résultat — et même un bénéfice, la tranche devient une facette — mais elle n'est suggérée nulle part à cet endroit, et elle oblige à écrire à la main la discrétisation que `method` / `breaks` savent faire.

### Impact de l'erreur ou du manque

Une carte de points colorée par une mesure est le motif le plus courant de la dataviz territoriale, et le chemin que la documentation désigne ne marche pas. L'échec est silencieux : la carte s'affiche, elle est simplement fausse de sens — la variable annoncée n'est pas représentée. Cinq attributs écrits pour rien, sans un mot.

### Objectif métier de la correction

Qu'une carte de points puisse encoder une valeur numérique par le même vocabulaire qu'une choroplèthe de polygones.

### Pérennité et reproductibilité du besoin

Durable : les jeux d'établissements, d'équipements et de points de service portent presque tous une mesure à représenter.

### Comment ça a été vérifié

Rejoué au navigateur le 2026-09-10 sur /education/dataviz-ips-colleges (dsfr-data 0.25.0). Avec `type="circle" fill-field="ips" breaks="90,100,110,125" selected-palette="divergentAscending"` : 6 971 chemins Leaflet rendus, `getLegendEntries()` = [{color:'#000091',label:''}], légende rendue avec l'attribut `hidden`, zéro erreur console, `getSkippedCount()` = 0. Après passage à `color-field="tranche_ips"` + `color-map` (tranche produite par `compute`) : `getLegendEntries()` renvoie les cinq classes attendues et la légende s'affiche. Condition lue au source, packages/core/src/components/dsfr-data-map-layer.ts lignes 658, 1101 et 1339. — **Rejoué contre dsfr-data 0.27.0 le 2026-09-10** : TIENT, et TOUJOURS EN SILENCE. `<dsfr-data-map-layer type="circle" fill-field="ips" breaks="70,80,90,100" selected-palette="divergentAscending">` sur le jeu des EREA : `getLegendEntries()` renvoie toujours [{color:'#000091',label:''}], aucune erreur de configuration, aucun message. L'épic 0.26.0 « les échecs se voient » (#727) ne couvre pas ce cas : il nomme les attributs qui désignent un CHAMP ABSENT et les attributs INCONNUS de la version chargée. Ici l'attribut est connu et le champ existe — c'est la COMBINAISON attribut × type de couche qui est inopérante, et cette famille-là reste muette. La demande garde donc tout son objet, et gagne un argument : la bibliothèque a montré en 0.26.0 qu'elle savait rendre ces échecs visibles.

### Demande

Faire agir `fill-field` et ses compagnons (`classes`, `method`, `breaks`, `selected-palette`) sur `type="circle"` — la valeur pilotant la couleur de remplissage du cercle, la légende étant construite comme pour un `geoshape`. À défaut, refuser explicitement la combinaison en erreur de configuration plutôt que de l'ignorer, et le dire dans les cinq JSDoc concernés.

### Critères d'acceptation

- [ ] `type="circle"` + `fill-field` colore les cercles selon les classes calculées.
- [ ] `classes`, `method`, `breaks` et `selected-palette` agissent comme sur `geoshape`.
- [ ] `dsfr-data-map-legend` reçoit les classes et s'affiche.
- [ ] Si la combinaison reste refusée, elle lève une erreur de configuration visible (console + `data-dsfr-config-error`) au lieu d'être ignorée.

---

## BUG-009 — Une `dsfr-data-query group-by` branchée sur une source Opendatasoft réécrit la source pour tous ses autres consommateurs

**Priorité** P1 · **Effort estimé** L (conception + développement) · **Décision proposée** Accepter
**Labels suggérés** : `bug`, `severity:haute`, `dsfr-data-query`, `dsfr-data-source`
**Rencontré sur** 2 page(s) : edu/dataviz-ips-colleges, edu/tne-dashboard

### Constat

`dsfr-data-query` négocie à l'initialisation la délégation de `group-by` / `aggregate` / `order-by` au serveur quand l'adaptateur le supporte : c'est documenté, voulu, et c'est même l'exemple du JSDoc de la classe, qui montre une query branchée directement sur la source. Ce que la délégation fait en pratique, c'est envoyer une commande à la source, qui repart chercher un agrégat — et la source ré-émet alors cet agrégat à TOUS ses abonnés. Une page qui branche une query d'agrégat sur la même source qu'une carte, un KPI ou une facette voit donc ses données remplacées par les quelques lignes de l'agrégat, sans aucun message. Le motif « une source, plusieurs vues » — un compteur, une carte et un graphique d'agrégat sur le même jeu — est pourtant le plus banal qui soit ; c'est celui de presque toutes les pages de ce banc, et il n'échouait pas jusqu'ici seulement parce qu'elles branchent leurs queries sur la facette et non sur la source. — **Repayé sur le tableau de bord TNE alors que le piège était déjà connu et écrit**, ce qui en dit long sur sa capacité à passer inaperçu : cette page-là a trois consommateurs du même jeu (un KPI, une query de répartition par département, une query d'agrégats pour trois camemberts). Le KPI « participants aux formations » affichait **0** et les trois camemberts étaient vides, pendant que la query voisine rendait, elle, les bons chiffres par département — de sorte que la page avait l'air à moitié juste, ce qui est le pire des symptômes. Le contournement a coûté un `dsfr-data-normalize` sans aucun attribut, dont l'unique fonction est de s'interposer entre la source et ses queries.

### Impact de l'erreur ou du manque

Chiffres faux et carte vide sur le motif le plus courant de la bibliothèque — une source, plusieurs vues — dans la configuration exacte que le JSDoc donne en exemple. L'échec est entièrement silencieux : la page s'affiche, tout paraît fonctionner, seuls les nombres sont faux. Repayé deux fois en une seule journée par un opérateur qui connaissait le piège et l'avait lui-même consigné quatre heures plus tôt : le motif est trop banal pour qu'on pense à s'en méfier à chaque balise.

### Objectif métier de la correction

Qu'ajouter un graphique d'agrégat à une page ne change pas ce que ses autres composants affichent.

### Pérennité et reproductibilité du besoin

Durable, et structurel : c'est le contrat du data-bridge entre une source et ses abonnés multiples.

### Comment ça a été vérifié

Rencontré au navigateur le 2026-09-10 sur /education/dataviz-ips-colleges (dsfr-data 0.25.0), source `donnees-ips-colleges` en `fetch-mode="export"`. Avec `<dsfr-data-query id="ips-par-secteur" source="ips" group-by="secteur" aggregate="ips:avg:ips_moyen">` : `document.getElementById('ips').getData().length` = 2 au lieu de 6 971, le KPI « Collèges » affichait 2, et la couche avertissait « 2 ligne(s) sur 2 sans coordonnées exploitables ». Aucune erreur console, aucune erreur de configuration. La seule modification `source="ips"` → `source="ips-f"` (la facette en aval) ramène la source à 6 971 lignes et tous les afficheurs à leurs valeurs justes ; les deux mesures ont été prises dans la même session, sur la même page, sans autre changement. — Reproduit une seconde fois le 2026-09-10 sur /education/tne-dashboard, jeu `fr-en-tne_personnels_formes_par_departement_secteur_type_etablissement` : avec les deux queries branchées sur la source, `tne-totaux` rend `{d1:0, d2:0, p1:0, p2:0, nc:0, tot:0}` et le KPI affiche 0, tandis que la query `group-by="departement"` rend les douze valeurs justes (Aisne 13 811). L'interposition d'un `<dsfr-data-normalize>` vide ramène tout aux chiffres de référence (53 491 / 32 688 / 12 363 / 2 999 / 13 350 / 7 453). — **Rejoué contre dsfr-data 0.27.0 le 2026-09-10** : TIENT. Source `donnees-ips-colleges` en `fetch-mode="export"` (6 971 lignes attendues) avec une `dsfr-data-query group-by="secteur"` branchée directement dessus : la source retombe à 2 lignes et le KPI `count` affiche 2. Aucun message. Mieux — ou pire : le bug a saboté la page de test écrite pour rejouer les AUTRES constats de cette session, en réécrivant la source que trois vérifications lisaient, ce qui a d'abord fait croire qu'`explode` et `{{#each}}` ne marchaient pas. Il a fallu réisoler chaque test derrière un `dsfr-data-normalize` vide. C'est une démonstration involontaire de l'impact : le motif « une source, plusieurs vues » est si banal qu'on le reproduit sans y penser, y compris en écrivant un harnais de vérification.

### Contournement actuel

Ne jamais brancher une `dsfr-data-query` d'agrégat directement sur une `dsfr-data-source` qui a d'autres consommateurs : l'intercaler derrière un transformateur (facette, normalize), ou déclarer une seconde `dsfr-data-source` dédiée à l'agrégat. Le contournement cesse d'être satisfaisant dès qu'on veut un agrégat NON filtré à côté d'une vue filtrée : il faut alors payer une source de plus, donc une requête de plus.

### Demande

Que la délégation serveur d'une query ne modifie pas ce que la source publie à ses autres abonnés — soit en réservant la réponse agrégée à la query qui l'a demandée, soit en refusant la délégation dès que la source a plusieurs consommateurs, soit à tout le moins en avertissant en console que la source est réécrite.

### Critères d'acceptation

- [ ] Une source ayant plusieurs abonnés continue de publier ses lignes après l'ajout d'une query d'agrégat branchée sur elle.
- [ ] La query reçoit bien son agrégat, délégué au serveur si l'adaptateur le permet.
- [ ] Le cas est couvert par un test : une source, un KPI `count` et une query `group-by`, tous trois branchés directement sur la source.

---

## AM-072 — Les blocs de gabarit ne s'imbriquent pas, et l'imbrication échoue en silence

**Priorité** P2 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement`, `severity:haute`, `dsfr-data-display`, `dsfr-data-map-popup`
**Rencontré sur** 6 page(s) : edu/fei-projets-europeens-donnees, edu/annuaire-bureaux-des-entreprises, edu/cnr-education, edu/cactus-hameconnage, edu/generation-2024, prix-des-carburants

### Constat

Les gabarits acceptent `{{#if}}` / `{{#unless}}` (0.22.0) et `{{#each}}` (0.27.0), mais ces blocs ne s'imbriquent pas — la documentation de `{{#each}}` le dit d'ailleurs (« les blocs ne s'imbriquent pas »). Le problème n'est pas la limite, c'est son signalement : un `{{#each}}` placé à l'intérieur d'un `{{#if}}` ne rend RIEN, sans erreur ni avertissement. Or l'imbrication est le premier réflexe : on veut afficher un intitulé ET la liste, seulement si la liste existe. Le contournement — mettre les blocs à plat, en répétant la condition — fonctionne mais oblige à écrire deux fois la même garde, et rien n'indique qu'il le faut. — **Et le silence a effectivement mordu, sur ce dépôt même.** CINQ pages écrites au lot 17 portaient la forme imbriquée, toutes réputées vérifiées : leurs infobulles affichaient un intertitre (« Contacter le bureau », « Thèmes », « Effets observés », « Dispositifs », « Services ») suivi du vide, sur la totalité des enregistrements. Le défaut a échappé à la vérification parce que celle-ci portait sur les erreurs console, les erreurs de configuration et les valeurs des KPI — tous corrects — et non sur le CONTENU rendu dans l'infobulle. C'est ce qui rend ce constat plus grave qu'il n'en a l'air : il ne se voit ni dans le HTML source (le gabarit est syntaxiquement correct), ni en console, ni dans le volet Diagnostic, ni dans un harnais de non-régression qui compte des éléments. Il faut ouvrir une infobulle et la lire.

### Impact de l'erreur ou du manque

Cinq pages de ce dépôt ont été publiées avec des infobulles à moitié vides sans que personne ne le voie. Le défaut est invisible au HTML, à la console, au volet Diagnostic et à un harnais qui compte des éléments : il ne se constate qu'en ouvrant une infobulle. C'est la définition d'un échec muet coûteux.

### Objectif métier de la correction

Que la limite d'imbrication se signale au lieu de rendre du vide.

### Pérennité et reproductibilité du besoin

Durable tant que les blocs ne s'imbriquent pas.

### Comment ça a été vérifié

Vérifié au navigateur le 2026-09-10 (dsfr-data 0.27.0) sur `fr-en-carto-acc-sensoriel`, champ `langue` (tableau). Gabarit imbriqué `{{#if langue}}[DEBUT{{#each langue}}<i>{{.}}</i>{{/each}}FIN]{{/if}}` : rendu `[DEBUTFIN]` — la boucle intérieure est ignorée, le texte statique du bloc `if` est conservé. Le même contenu à plat, `{{#each langue}}<i>{{.}}</i>{{/each}}`, rend `LSF2`. Zéro message en console dans les deux cas. — Confirmé sur le dépôt le 2026-09-10 : `public/education/annuaire-bureaux-des-entreprises.html` rendait « Contacter le bureau » et « Diplômes préparés » sans aucun contenu sur les 1 932 établissements. Après désimbrication (le `<ul>` sort de la condition, le `{{#each}}` reste seul, un `ul:empty` masque le cas vide), l'infobulle du lycée Émile-Letournel rend « bde-lp-emile-letournel@ac-spm.fr », le téléphone, le lien du site et les huit diplômes préparés.

### Contournement actuel

Mettre les blocs à plat et répéter la garde : `{{#if champ}}intitulé{{/if}}` puis `{{#each champ}}…{{/each}}`. Fonctionne, mais duplique la condition et se remarque mal à la relecture.

### Demande

À défaut de supporter l'imbrication, la signaler : un `{{#each}}` ou un `{{#if}}` rencontré à l'intérieur d'un bloc doit produire un avertissement console nommant le gabarit et la construction non supportée. Le silence est ici plus coûteux que la limite.

### Critères d'acceptation

- [ ] Un bloc imbriqué produit un avertissement console, une fois par gabarit.
- [ ] Le message nomme la construction et rappelle la forme à plat.
- [ ] Un gabarit sans imbrication reste silencieux.

---

## PG-022 — Les grammaires d'attributs multi-entrées diffèrent d'un attribut à l'autre : `|` ici, `,` là

**Priorité** P2 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Accepter (documentation + avertissement)
**Labels suggérés** : `enhancement, dx`, `severity:moyenne`, `dsfr-data-facets`, `dsfr-data-normalize`, `dsfr-data-chart`
**Rencontré sur** 3 page(s) : rappelconso, prix-des-carburants, entreprises-restauration-notre-dame

### Constat

`labels` et `display` de `dsfr-data-facets` séparent leurs entrées par `|` ; `split`, `round` et `fields` par `,` ; `name` de `dsfr-data-chart` accepte une chaîne simple ou un tableau JSON. Rien ne le rappelle d'une fiche à l'autre, et une grammaire fausse ne produit aucune erreur : `display="a:select, b:select"` rend zéro `<select>`, `split="champ:|"` que je croyais impossible marche. Quatre constats du banc (ex-AM-028, AM-031, AM-033, ex-AM-042) tombaient à la lecture du JSDoc de l'attribut plutôt que de la fiche du composant.

**Ce qui est vrai.** Partiellement traité par #657, livré en 0.21.1 : une fiche « grammaires d'attributs » a été ajoutée aux skills et au guide, qui rappelle par attribut le séparateur attendu et les voies natives ratées par le banc d'essai. Le piège est documenté.

**Ce qui reste vrai.** Rien n'avertit à l'exécution : `display="a:select, b:select"` rend toujours zéro `<select>` sans un mot en console. Tant que l'échec reste silencieux, la documentation ne suffit pas — c'est la demande qui tient.

### Impact de l'erreur ou du manque

Une grammaire fausse est silencieuse : l'attribut est simplement ignoré.

### Objectif métier de la correction

Qu'un auteur ne devine plus le séparateur.

### Pérennité et reproductibilité du besoin

Structurel : tout attribut multi-entrées.

### Comment ça a été vérifié

Page de test (réseau cuivre, `server-facets`) : `display="region:select, departement:select"` → 0 select rendu ; `display="region:select | departement:select"` → 2 selects, 21 et 95 options. `split="risques_encourus:|"` → tableau (FP-010). `round="prix_moyen:2"` (virgule pour plusieurs champs) → 2.31 (AM-033). — **Rejoué contre dsfr-data 0.27.0 le 2026-09-10** : PARTIELLEMENT CORRIGÉ, et sur le point qui comptait : l'échec n'est plus muet. `display="type_etablissement:select, libelle_region:select"` (virgules au lieu de barres) rend toujours zéro liste déroulante, mais émet désormais en console : « dsfr-data-facets[f1] : attribut "display" — les entrées semblent séparées par une virgule, or le séparateur attendu est la barre verticale. Forme attendue : "champ:valeur | champ2:valeur2" ». Le message nomme le composant, l'attribut, la valeur reçue et la forme attendue (#731, 0.26.0). Le piège subsiste sur les attributs non couverts par l'avertissement, mais le cas le plus fréquent est désormais visible.

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

## AM-067 — Une facette bâtie sur une source pré-agrégée affiche « 1 » partout : aucun attribut ne lui désigne la colonne d'effectif

**Priorité** P2 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement`, `severity:moyenne`, `dsfr-data-facets`
**Rencontré sur** 1 page(s) : edu/dataviz-ips-ecoles

### Constat

Le motif « proposer une liste de valeurs avec leur effectif, obtenue en une seule requête agrégée » est la bonne architecture dès qu'on ne veut pas charger les lignes : c'est ce que fait cette page pour ses 104 départements (une requête de 93 ms au lieu de 28,9 Mo), et c'est aussi ce que l'original implémente à la main. La source renvoie alors une ligne par valeur, avec l'effectif dans une colonne (`count(*) as n`). `dsfr-data-facets` compte ses propres lignes : chaque département n'en ayant qu'une, la facette affiche « Nord 1 » là où il y a 1 268 écoles. Aucun attribut ne permet de lui désigner la colonne de poids — ni `count-field`, ni équivalent. Il ne reste qu'à poser `hide-counts`, c'est-à-dire à masquer une information qui a été calculée, transmise, et qui est dans la ligne. Le compteur est par ailleurs l'un des arguments de la facette face à un `select` nu.

**Ce qui est vrai.** [object Object]

### Impact de l'erreur ou du manque

Sur les jeux à gros volume, l'agrégation serveur est la seule architecture tenable pour proposer une liste de valeurs — et c'est justement là que la facette perd son compteur. Soit on affiche un chiffre faux, soit on masque un chiffre qu'on possède.

### Objectif métier de la correction

Qu'une facette alimentée par un agrégat serveur affiche les vrais effectifs.

### Pérennité et reproductibilité du besoin

Durable : le motif « choisir d'abord, charger ensuite » est celui que `require-where` encourage, et il suppose des listes de valeurs pré-agrégées.

### Comment ça a été vérifié

Relevé au navigateur le 2026-09-10 sur /education/dataviz-ips-ecoles. Source `donnees-ips-ecoles` agrégée par `group-by="libelle_departement"` + `select="libelle_departement, count(*) as n"` (104 lignes, une par département, `n` renseigné — vérifié dans la réponse API). La facette rend « Nord1, 1 resultat » ; l'export du même département renvoie 1 268 lignes, et le KPI branché en aval affiche bien 1 268. Absence de `count-field` vérifiée au source, packages/core/src/components/dsfr-data-facets.ts. — **Rejoué contre dsfr-data 0.27.0 le 2026-09-10** : CORRIGÉ. `weight-field` est livré en 0.27.0 (#739), le jour même où ce constat a été écrit. Vérifié en page : `<dsfr-data-facets source="…agrégée" fields="libelle_departement" weight-field="n">` rend « Nord 1 268, total 1 268 » là où la même facette sans l'attribut affichait « Nord 1 ». Le `hide-counts` de dépit a été retiré de /education/dataviz-ips-ecoles. L'attribut est client uniquement : en `server-facets`, où la somme n'existe pas dans la réponse `/facets`, les compteurs sont masqués ET le composant le dit, plutôt que d'afficher un nombre de lignes sous un libellé de somme.

### Contournement actuel

`hide-counts`, qui masque le compteur au lieu de le corriger. Le contournement cesse d'être acceptable dès que le compteur est l'information utile — choisir un département en sachant combien d'établissements il porte, par exemple.

### Demande

Un attribut désignant la colonne d'effectif d'une source pré-agrégée (par exemple `count-field="champ"`, ou `count-fields="champ_facette:colonne"` pour en viser plusieurs), pour que la facette affiche l'effectif porté par la donnée plutôt que son propre nombre de lignes.

### Critères d'acceptation

- [ ] Un attribut permet de désigner la colonne portant l'effectif de chaque valeur.
- [ ] La facette affiche cet effectif au lieu de son nombre de lignes.
- [ ] Sans cet attribut, le comportement actuel est inchangé.
- [ ] Le tri `count:desc` s'appuie sur l'effectif désigné.

---

## BUG-010 — Un alias de `group-by` sans parenthèse est backquoté et vaut un HTTP 400 : le correctif #641 ne couvre que les expressions à fonction

**Priorité** P2 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Accepter
**Labels suggérés** : `bug`, `severity:moyenne`, `dsfr-data-source`
**Rencontré sur** 1 page(s) : edu/fei-chiffres-cles

### Constat

Le correctif #641 avait réglé PG-014 : l'adaptateur Opendatasoft ne backquote plus un élément de `group-by` qui est une expression, de sorte que `year(annee) as an` passe tel quel. Mais la détection d'une expression est `field.includes('(')` — littéralement, « contient une parenthèse ouvrante ». Un **alias simple**, `pays_centre as pays` ou `periode as an`, n'en contient pas : il est traité comme un nom de champ, part en `` `periode as an` ``, et l'API répond 400. Or l'aliasing sans fonction est la forme la plus courante de l'aliasing ODSQL, et c'est le seul moyen d'harmoniser les noms de colonnes entre plusieurs jeux qui nomment différemment la même chose — exactement ce que demande une page multi-sources. Sur les neuf jeux de France Éducation international, quatre nomment le pays autrement (`pays_centre`, `pays_participants`) et trois nomment l'année autrement (`annee` date, `annee` texte, `periode` entier) : aucun ne peut être aliasé. Le JSDoc de `group-by` annonce pourtant « un élément peut être une expression aliasée […] transmise telle quelle — l'alias `as` est obligatoire côté ODS », sans restreindre aux expressions à fonction.

### Impact de l'erreur ou du manque

Sur une page multi-sources — le motif que ce second portail a rendu courant — l'aliasing est le seul moyen d'harmoniser des colonnes qui portent le même sens sous trois noms. Il échoue sur la moitié des cas, et le JSDoc annonce qu'il fonctionne.

### Objectif métier de la correction

Qu'un `group-by` accepte l'aliasing ODSQL sous toutes ses formes, pas seulement celle qui porte une fonction.

### Pérennité et reproductibilité du besoin

Durable : le correctif est une ligne, et il complète un correctif déjà livré.

### Comment ça a été vérifié

Relevé au navigateur le 2026-09-10 sur /education/fei-chiffres-cles (dsfr-data 0.25.0). Avec `group-by="pays, iso2_pays, periode as an"`, l'URL émise est `…&group_by=pays,iso2_pays,`periode+as+an`&limit=100` (relevée au réseau, accents graves présents) → HTTP 400, source en erreur, message en console. La même requête sans accents graves répond 200 en curl, avec ou sans guillemets sur la valeur. Le comportement est lu au source : `isOdsqlExpression(field) { return field.includes('('); }` puis `escapeOdsqlGroupField`, packages/core/src/adapters/opendatasoft-adapter.ts l. 109-116. Dans la même page, `year(annee) as an` passe et rend les bons chiffres (513 435 inscrits DELF-DALF en 2025) : la bascule tient bien à la seule parenthèse. — **Rejoué contre dsfr-data 0.27.0 le 2026-09-10** : TIENT. `group-by="pays, iso2_pays, periode as an"` part toujours en `group_by=pays,iso2_pays,`periode+as+an`` (accents graves relevés dans l'URL au réseau) → HTTP 400, source en erreur. L'échec reste franc, ce qui le distingue des deux précédents.

### Contournement actuel

Garder le nom d'origine du champ dans le `group-by` et renommer en aval (`dsfr-data-normalize rename`), au prix d'un composant de plus et de gabarits non homogènes entre sources. Le contournement ne marche pas quand l'alias sert à faire coïncider deux sources destinées à être jointes ou comparées sur le même nom de colonne.

### Demande

Reconnaître comme expression tout élément de `group-by` contenant ` as ` (en plus du test sur la parenthèse), afin qu'un alias simple soit transmis tel quel.

### Critères d'acceptation

- [ ] `group-by="periode as an"` émet `group_by=periode as an`, sans accents graves.
- [ ] `group-by="year(annee) as an"` continue de passer tel quel.
- [ ] Un nom de champ à espaces sans ` as ` reste échappé (#289).
- [ ] Un test couvre les trois formes.

---

## AM-068 — Le cumul est arrivé, son inverse manque : aucun moyen de retrouver le flux d'une série déjà cumulée

**Priorité** P2 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement`, `severity:moyenne`, `dsfr-data-query`, `dsfr-data-normalize`
**Rencontré sur** 1 page(s) : edu/tne-dashboard

### Constat

Le point n° 1 du résidu du lot 12 visait le cumul dans les deux sens. `running_sum` (#738, 0.27.0) comble le premier : cumuler une série qui ne l'est pas, ce que le tableau de bord TNE d'origine fait en douze expressions de template. Le second reste ouvert : passer d'une série CUMULÉE au flux de la période — « combien de visiteurs ce mois-ci » — suppose de soustraire la ligne précédente, c'est-à-dire `lag`, explicitement différé depuis la 0.24.0, et que `compute` exclut de son périmètre (« ni fenêtre, ni cumul, ni ligne précédente »). Le besoin n'est pas symétrique du premier par simple élégance : beaucoup de producteurs publient DÉJÀ des compteurs cumulés — c'est le cas des cinq jeux du programme TNE, dont toutes les métriques montent par construction — et la seule question intéressante qu'on leur pose est celle de leur incrément. Un tableau de bord qui ne sait pas dé-cumuler affiche des courbes qui montent toujours, et ne peut pas dire si le rythme ralentit.

### Impact de l'erreur ou du manque

Les compteurs cumulés sont un format de publication très répandu dans l'open data institutionnel. Sur ces jeux, toutes les courbes montent par construction, et la page ne peut pas montrer le rythme — la seule information que le lecteur cherche.

### Objectif métier de la correction

Qu'une série déjà cumulée puisse être rendue en flux de période.

### Pérennité et reproductibilité du besoin

Durable, et symétrique d'une capacité déjà livrée : le calcul et les garde-fous de `running_sum` sont réemployables tels quels.

### Comment ça a été vérifié

Vérifié en page le 2026-09-10 contre dsfr-data 0.27.0, sur `fr-en-tne_suivi_audiences`. `<dsfr-data-query order-by="mois_saisie:asc" aggregate="nombre_de_visiteurs_uniques_a_la_plateforme_tne:running_sum">` rend bien la série cumulée (909, 3 496, 6 771 … 1 923 385 au dernier mois) : le sens « cumuler » fonctionne. L'absence du sens inverse est lue au source : aucun `lag` ni équivalent dans `packages/core/src/utils/aggregations.ts` (les agrégats sont count, sum, avg, min, max, first, last, distinct, evolution, et running_sum côté query), et le JSDoc de `compute` exclut « valeurs agrégées, ligne précédente, cumul ». `champ:evolution` donne un taux global (dernière − première) / première, pas une série d'incréments.

### Contournement actuel

Aucun côté client. Il faut soit demander le flux au producteur, soit reconstruire la série hors de la page. Un pivot long → large puis `compute` (la voie suggérée pour `lag` en 0.24.0) permet la différence entre DEUX séries, pas entre deux lignes successives d'une même série.

### Demande

Un agrégat `diff` (ou `lag`) symétrique de `running_sum` sur `dsfr-data-query` : une ligne par ligne de sortie, chacune portant l'écart avec la précédente, calculé après `order-by`, côté client, avec le même avertissement en l'absence d'`order-by`.

### Critères d'acceptation

- [ ] `aggregate="champ:diff"` rend une ligne par ligne, portant l'écart avec la précédente.
- [ ] La première ligne rend null, jamais 0.
- [ ] Le calcul suit `order-by`, et son absence produit le même avertissement que `running_sum`.
- [ ] Cumulable avec `running_sum` sur la même query sans interférence.

---

## AM-071 — `replace-fields` ignore silencieusement les champs multivalués — ceux qu'on a précisément besoin de nettoyer

**Priorité** P2 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement`, `severity:moyenne`, `dsfr-data-normalize`
**Rencontré sur** 2 page(s) : edu/fei-projets-europeens-donnees, edu/accompagnement-deficience-sensorielle

### Constat

`replace` et `replace-fields` ont été étendus en 0.26.0 (#730) aux colonnes numériques et booléennes — la comparaison porte désormais sur la forme chaîne de la valeur. Les TABLEAUX restent hors du champ : une colonne multivaluée traverse l'attribut intacte, sans avertissement. Or c'est exactement sur ces champs-là que le besoin se pose : ce sont eux qui portent les nomenclatures saisies à la main, donc les doublons de casse, les graphies concurrentes et les valeurs d'erreur. Sur le jeu des projets européens de FEI, `pays`, `theme` et `public_cible` sont des tableaux qui comptent respectivement 36, 22 et 21 valeurs brutes pour 33 et 19 valeurs réelles après fusion des doublons — et aucune ne peut être corrigée à la source. Le contournement par `explode` puis second regroupement ne sauve que les agrégats : les FACETTES continuent d'afficher les valeurs non fusionnées, puisqu'elles lisent le champ d'origine.

### Impact de l'erreur ou du manque

Les champs multivalués portent les nomenclatures les plus sales des jeux rencontrés par ce banc. Ne pas pouvoir les nettoyer oblige à publier des facettes fausses — 36 pays affichés pour 33 réels — ou à renoncer à la facette.

### Objectif métier de la correction

Qu'un champ multivalué se nettoie comme les autres.

### Pérennité et reproductibilité du besoin

Durable : le multivalué est la forme normale des nomenclatures en open data.

### Comment ça a été vérifié

Vérifié au navigateur le 2026-09-10 (dsfr-data 0.27.0) sur `fr-en-carto-acc-sensoriel`, dont le champ `langue` est un tableau. Avec `<dsfr-data-normalize replace-fields="langue:LSF2:Langue seconde">` : les 120 lignes portant une langue ressortent inchangées (`["LSF2"]`), aucun message en console, aucune erreur de configuration. Le remplacement est gardé au source par un test de type qui accepte string, number et boolean, jamais Array.

### Contournement actuel

`explode` puis `group-by` sur la valeur corrigée — ne vaut que pour les agrégats, pas pour les facettes. Sinon, corriger en amont côté producteur.

### Demande

Appliquer `replace` et `replace-fields` élément par élément quand la valeur est un tableau, en conservant le tableau. C'est le prolongement naturel de #730, sur le seul type de champ resté à l'écart — et celui qui en a le plus besoin.

### Critères d'acceptation

- [ ] `replace-fields="langue:LSF2:Langue seconde"` transforme `["LSF2"]` en `["Langue seconde"]`.
- [ ] Un tableau reste un tableau, et sa longueur est inchangée.
- [ ] Deux éléments devenant identiques après remplacement ne sont pas dédoublonnés silencieusement (ou le sont, mais c'est documenté).
- [ ] Les types déjà couverts par #730 gardent leur comportement.

---

## AM-044 — Le compteur `count` de `dsfr-data-search` rend « 35305 resultats » : ni séparateur de milliers, ni accent

**Priorité** P2 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement`, `severity:basse`, `dsfr-data-search`
**Rencontré sur** 3 page(s) : fermeture-reseau-cuivre, bofip, prix-controle-technique

### Constat

Le compteur existe et suit recherche, facettes et contexte (AM-034 réduit). Mais il rend le nombre brut et le mot sans accent, là où le KPI voisin écrit « 35 305 ». Sur un moteur de recherche, c'est la première chose qu'on lit.

**Ce qui est vrai.** Corrigé à moitié par #654, livré en 0.21.1 : le mot « résultat » est accentué et accordé, et le compteur ne parle plus en double au lecteur d'écran quand un afficheur aval annonce déjà son compte. Vérifié dans le bundle publié `dsfr-data@0.24.0` (`dist/dsfr-data.core.esm.js`) : le libellé y est bien `${count} résultat${s}`.

**Ce qui reste vrai.** Le nombre reste rendu brut, sans séparateur de milliers — « 35305 résultats » là où le KPI voisin écrit « 35 305 » —, et il n'existe toujours pas de `count-label` pour remplacer le mot par « communes » ou « documents ». La demande tient, réduite de moitié.

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

## LIM-014 — Le résumé « en France » d'une choroplèthe DSFR Chart est une moyenne non pondérée des territoires, et il est faux

**Priorité** P2 · **Effort estimé** M (un à trois jours) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement`, `severity:haute`, `dsfr-data-chart`
**Rencontré sur** 3 page(s) : edu/personnels-colleges, edu/personnels-lycees, edu/personnels-ecoles-primaires

### Constat

Une carte `type="map"` de DSFR Chart affiche sous le titre une valeur « en France » présentée comme le chiffre national. C'est la MOYENNE ARITHMÉTIQUE NON PONDÉRÉE des valeurs départementales : la Lozère y pèse autant que le Nord. Sur un taux, l'écart avec la vraie valeur nationale est immédiat et important. Aucun attribut de `dsfr-data-chart` ne permet de désactiver ce résumé ni d'en fournir la valeur juste. Le chiffre faux est affiché au même niveau visuel que le titre, donc lu en premier. **C'est une limite de DSFR Chart, pas de `dsfr-data`** : à remonter chez `GouvernementFR/dsfr-chart` (règle du dépôt, AM-022 et AM-016).

### Impact de l'erreur ou du manque

Un chiffre faux affiché au niveau du titre d'une carte publique, sans moyen de l'ôter. Sur un taux, l'erreur atteint 30 % en valeur relative.

### Objectif métier de la correction

Qu'une carte n'affiche pas un national qui n'en est pas un.

### Pérennité et reproductibilité du besoin

Durable, et hors du périmètre de dsfr-data : c'est un relais à assurer.

### Comment ça a été vérifié

Mesuré le 2026-09-10 sur les trois pages « personnels », en comparant l'affichage de la carte au calcul sur les sommes : collèges **4,27 % affiché contre 5,6 % réel**, lycées **14,96 contre 19,3**, écoles **85,53 contre 86,9**. Les valeurs réelles sont recoupées à l'API par un ratio de deux sommes sur `fr-en-indicateurs_personnels_etablissements2d`.

### Contournement actuel

Afficher la valeur juste dans un `dsfr-data-kpi` à côté de la carte, et le dire dans la page — ce que font les trois pages concernées. Le chiffre faux reste affiché par le composant.

### Demande

À porter chez GouvernementFR/dsfr-chart : rendre le résumé désactivable, ou permettre de lui fournir la valeur nationale, ou le pondérer.

### Critères d'acceptation

- [ ] Le résumé peut être masqué par un attribut.
- [ ] Ou une valeur nationale peut lui être fournie.
- [ ] Le comportement par défaut est documenté comme une moyenne non pondérée.

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

## AM-070 — Le ratio d'un KPI sait filtrer un `count`, pas une `sum` : une part n'est pas calculable sur une source pré-agrégée

**Priorité** P2 · **Effort estimé** M (un à trois jours) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement`, `severity:moyenne`, `dsfr-data-kpi`
**Rencontré sur** 1 page(s) : edu/patronymes-des-ecoles

### Constat

Le ratio de `dsfr-data-kpi` (#673) permet d'écrire une part : `value="count:statut:ouvert / count"`. Le filtre y est porté par la grammaire à trois parties `champ:fn:valeur`, qui ne fonctionne QUE pour `count` — et qui filtre sur le champ qu'elle agrège. Pour une `sum`, il n'existe pas de forme équivalente : `montant:sum:valeur` filtrerait sur `montant` lui-même, ce qui n'a pas de sens. Le `where` du KPI (#674) ne comble pas le manque : il s'applique aux DEUX côtés du ratio à la fois, si bien que `ecoles:sum / ecoles:sum` avec un `where` unique rend mécaniquement 100 %. Conséquence : sur une source PRÉ-AGRÉGÉE — une ligne par modalité, la mesure dans une colonne — une part n'est pas calculable en un KPI. Or c'est exactement la forme qu'impose un gros jeu : sur 809 225 lignes, on n'a pas le choix d'agréger côté serveur, et la question « quelle part de femmes ? » devient alors inexprimable, alors qu'elle l'est sur un jeu chargé ligne à ligne.

### Impact de l'erreur ou du manque

Une part est l'indicateur le plus courant d'un tableau de bord, et l'agrégation serveur est obligatoire dès qu'un jeu dépasse quelques dizaines de milliers de lignes. Les deux se rencontrent souvent — et là, la part devient inexprimable. Le symptôme est de surcroît trompeur : le KPI affiche 100 %, une valeur plausible pour un pourcentage, pas une erreur.

### Objectif métier de la correction

Qu'une part soit calculable sur une source pré-agrégée, comme elle l'est sur des lignes brutes.

### Pérennité et reproductibilité du besoin

Durable : c'est le pendant naturel de #673, sur le régime de données qu'impose le gros volume.

### Comment ça a été vérifié

Rencontré au navigateur le 2026-09-10 sur /education/patronymes-des-ecoles (dsfr-data 0.27.0). Source agrégée `group-by="sexe_ou_genre" select="count(*) as ecoles"` — trois lignes : masculin 9 164, féminin 2 297, null 35 952. Avec `value="ecoles:sum / ecoles:sum" where="sexe_ou_genre:isnotnull"`, le KPI affiche **100,0 %** : le `where` filtre les deux côtés, la division porte sur la même valeur. Absence de forme `champ:sum:valeur` filtrant sur un AUTRE champ vérifiée au source (packages/core/src/utils/aggregations.ts : la branche à trois parties pose `filterField: field`, le champ agrégé lui-même). Les chiffres justes (20,0 % rapporté aux écoles, 17,2 % rapporté aux patronymes distincts) ont dû être écrits dans une note en prose, calculés hors de la page.

### Contournement actuel

Aucun en un KPI. Il faut soit charger les lignes brutes (impossible ici : 809 225 lignes), soit calculer la part hors de la page et l'écrire en dur — ce qui la fige et la rend fausse au premier changement de filtre. Une query intermédiaire ne résout rien : le pivot d'une colonne de modalités vers des colonnes nommées demanderait `dsfr-data-pivot`, puis un `compute` — trois composants pour un pourcentage.

### Demande

Étendre le filtre par valeur aux agrégats autres que `count`, sur un champ différent de celui agrégé — par exemple `ecoles:sum:sexe_ou_genre:féminin`, ou un `where` par côté du ratio (`value="ecoles:sum{sexe_ou_genre:eq:féminin} / ecoles:sum"`). La seconde forme a l'avantage de réemployer le dialecte colon déjà en place.

### Critères d'acceptation

- [ ] Un côté d'un ratio peut être filtré sur un champ autre que celui qu'il agrège.
- [ ] L'autre côté reste non filtré, ou porte son propre filtre.
- [ ] Le `where` global du KPI continue de s'appliquer aux deux côtés, sans ambiguïté avec la nouvelle forme.
- [ ] Un test couvre le cas « source pré-agrégée, une ligne par modalité ».

---

## BUG-011 — Une virgule à l'intérieur d'une fonction casse `group-by` : l'adaptateur découpe avant d'analyser les parenthèses

**Priorité** P2 · **Effort estimé** M (un à trois jours) · **Décision proposée** Accepter
**Labels suggérés** : `bug`, `severity:moyenne`, `dsfr-data-source`
**Rencontré sur** 1 page(s) : edu/dnma-usages-ent

### Constat

`splitGroupBy` découpe la valeur de `group-by` sur la virgule AVANT toute analyse des parenthèses, puis applique l'échappement élément par élément. Une fonction ODSQL à plusieurs arguments — `date_format(champ, 'yyyy-MM-dd') as semaine`, `round(x, 2) as y`, `concat(a, b) as c` — est donc coupée en deux morceaux dont le second, ne contenant pas de parenthèse OUVRANTE, est pris pour un nom de champ et backquoté. C'est le troisième défaut de la même famille : BUG-010 backquote trop (alias sans parenthèse), PG-027 pas assez (`select`), et celui-ci découpe au mauvais endroit. Les trois viennent du même choix — traiter ces clauses comme des listes de noms de champs plutôt que comme des expressions — et se corrigeraient ensemble par un découpage qui respecte les parenthèses et les quotes.

### Impact de l'erreur ou du manque

Toute fonction ODSQL à plusieurs arguments est inutilisable dans `group-by`, ce qui écarte le formatage de date — le besoin le plus courant sur un jeu chronologique. L'échec est franc (400), mais le message d'API ne désigne pas la cause.

### Objectif métier de la correction

Qu'une expression ODSQL valide passe telle quelle, quelle que soit sa forme.

### Pérennité et reproductibilité du besoin

Durable, et à traiter avec BUG-010 et PG-027 : trois symptômes d'un même découpage.

### Comment ça a été vérifié

Rejoué au navigateur le 2026-09-10 (dsfr-data 0.27.0) sur `fr-en-dnma-usages-services`. Avec `group-by="date_format(debutsemaine, 'yyyy-MM-dd') as semaine"`, l'URL réellement émise — relevée au réseau — est `…&group_by=date_format(debutsemaine,`'yyyy-MM-dd') as semaine`&…` : la virgule a coupé l'expression et le second morceau est entouré d'accents graves. HTTP 400, source en erreur, zéro ligne. La même expression envoyée en curl sans découpage répond 200.

### Contournement actuel

Éviter toute fonction à plusieurs arguments dans `group-by`. Pour un regroupement de date, `year(champ) as a` passe (un seul argument, une parenthèse) ; au-delà, il faut préparer la clé en amont — par exemple `compute="semaine = replace(champ, 'T00:00:00+00:00', '')"` côté client. Ce contournement cesse de fonctionner dès qu'on veut un vrai regroupement calendaire (mois, trimestre) sur un gros jeu, puisqu'il suppose d'avoir chargé les lignes.

### Demande

Découper `group-by` (et `select`) en respectant les parenthèses et les chaînes entre quotes, au lieu d'un `split(',')` brut. Le même correctif règle BUG-010 et PG-027 si l'échappement est ensuite décidé sur la nature de l'élément (nom de champ contre expression) plutôt que sur la présence d'une parenthèse.

### Critères d'acceptation

- [ ] `group-by="date_format(d, 'yyyy-MM') as mois"` émet l'expression intacte et répond 200.
- [ ] `group-by="a, b"` continue de produire deux éléments.
- [ ] Une virgule à l'intérieur d'une chaîne entre quotes ne découpe pas non plus.
- [ ] Un test couvre les trois formes, dans `group-by` comme dans `select`.

---

## AM-074 — Aucune union dans le pipeline : empiler quatre séries demande quatre pivots, trois jointures et un dépliage

**Priorité** P2 · **Effort estimé** M (un à trois jours) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement`, `severity:moyenne`, `dsfr-data-join`, `dsfr-data-query`
**Rencontré sur** 2 page(s) : edu/accessibilite-equipements-sportifs, edu/portrait-de-territoire-sports

### Constat

`dsfr-data-join` juxtapose des COLONNES : il apparie deux jeux sur une clé et élargit les lignes. Il n'existe rien pour l'opération inverse — empiler des LIGNES de même schéma, c'est-à-dire l'union. Or c'est ce que demande tout indicateur composé de plusieurs mesures parallèles : quatre taux d'accessibilité à mettre côte à côte dans un même graphique ont exigé quatre pivots, trois jointures et un dépliage, soit huit composants pour quatre nombres. La page d'accessibilité en porte une soixantaine pour ses quinze jauges. Le pipeline sait tout faire, mais le coût d'écriture croît de façon non linéaire avec le nombre de mesures.

### Impact de l'erreur ou du manque

Le motif « comparer N mesures parallèles » est le plus courant des tableaux de bord d'indicateurs. Aujourd'hui il coûte deux composants par mesure, ce qui décourage d'en afficher plus de trois.

### Objectif métier de la correction

Qu'empiler des lignes de même schéma coûte une balise.

### Pérennité et reproductibilité du besoin

Durable : c'est l'opération symétrique d'une capacité déjà présente.

### Comment ça a été vérifié

Relevé en construisant /education/accessibilite-equipements-sportifs et /education/portrait-de-territoire-sports le 2026-09-10 (dsfr-data 0.28.0). Les deux pages rendent leurs chiffres exacts — les quinze jauges (52/23/26/45/32/22/42 · 4/2/4/4/24/2) sont contrôlées à l'API — mais au prix d'un empilement de composants sans rapport avec la simplicité de la question posée. Absence d'un composant ou d'un mode d'union vérifiée dans la liste des composants de la bibliothèque.

### Contournement actuel

Chaîne pivot → join → unpivot. Elle fonctionne et reste déclarative, mais devient illisible au-delà de trois mesures et se duplique à chaque indicateur.

### Demande

Un mode d'union — soit un attribut `type="union"` sur `dsfr-data-join` quand les schémas coïncident, soit un composant dédié acceptant plusieurs `sources` et concaténant leurs lignes, avec une colonne d'origine optionnelle.

### Critères d'acceptation

- [ ] Plusieurs sources de même schéma se concatènent en une seule.
- [ ] Une colonne d'origine peut être ajoutée.
- [ ] Un schéma divergent est signalé en erreur de configuration, jamais silencieusement tronqué.

---

## AM-075 — Un ratio dont le numérateur et le dénominateur viennent de deux jeux n'a aucune voie native

**Priorité** P2 · **Effort estimé** L (conception + développement) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement`, `severity:moyenne`, `dsfr-data-kpi`, `dsfr-data-query`
**Rencontré sur** 2 page(s) : edu/portrait-de-territoire-sports, edu/equipements-sportifs-milieu-scolaire

### Constat

« Des équipements pour 10 000 habitants », « des élèves par équipement » : l'indicateur territorial le plus courant rapporte une mesure d'un jeu à une population venue d'un autre. Le ratio de `dsfr-data-kpi` (#673) évalue ses deux membres sur UNE source ; `dsfr-data-join` peut apparier les deux jeux sur un code géographique, mais seulement si les deux ont la même maille et une clé commune — et le résultat n'est plus agrégeable simplement. Sur le portrait de territoire, 13 indicateurs sur 40 sont dans ce cas et n'ont pas pu être reproduits. Ce constat prolonge AM-049, écrit au lot 12 et confirmé après livraison de #673 : le ratio est bien mono-source.

### Impact de l'erreur ou du manque

L'indicateur territorial rapporté à la population est la forme la plus répandue de la statistique publique locale. Deux pages sur deux du portail Sports en ont besoin ; treize indicateurs sur quarante sont perdus.

### Objectif métier de la correction

Qu'un ratio puisse croiser deux jeux.

### Pérennité et reproductibilité du besoin

Durable et structurant : c'est la limite la plus citée du pipeline depuis le lot 12.

### Comment ça a été vérifié

Relevé en construisant /education/portrait-de-territoire-sports le 2026-09-10 (dsfr-data 0.28.0), sur quatre jeux dont `data-es` (équipements) et `insee-2020-geoapi-2023` (population). Les 27 indicateurs mono-jeu sont reproduits et exacts (333 611 installations, 68 029 342 habitants, 638 529 km², 1 584 QPV) ; les 13 indicateurs rapportant l'un à l'autre sont absents de la page, et le manque y est écrit.

### Contournement actuel

Joindre les deux jeux sur un code géographique puis calculer en `compute` — ne vaut que si les mailles coïncident exactement, et interdit toute agrégation ultérieure du ratio.

### Demande

Permettre à un `dsfr-data-kpi` de lire deux sources pour un ratio, ou fournir un composant de calcul inter-sources sur une clé commune.

### Critères d'acceptation

- [ ] Un KPI peut rapporter une mesure d'une source à une mesure d'une autre, sur une clé commune.
- [ ] Les mailles divergentes sont signalées.
- [ ] Le résultat suit les filtres des deux sources.

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

## PG-024 — Deux `for` voisins de la même carte désignent deux choses différentes : la couche pour la légende, la carte pour l'a11y

**Priorité** P3 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement, dx`, `severity:moyenne`, `dsfr-data-map-legend`, `dsfr-data-a11y`
**Rencontré sur** 1 page(s) : edu/dataviz-ips-colleges

### Constat

Dans le bloc d'une même carte, `dsfr-data-map-legend for="…"` attend l'id d'un `dsfr-data-map-layer` (ou la valeur de son attribut `source`), tandis que `dsfr-data-a11y for="…"`, écrit six lignes plus bas, attend l'id de la `dsfr-data-map`. Les deux balises sont enfants ou voisines de la carte, portent le même nom d'attribut, et l'id de la carte est celui qu'on a sous les yeux. Y mettre l'id de la carte dans la légende ne produit ni erreur ni avertissement : `_targetLayers()` renvoie un tableau vide, `getEntries()` aussi, et la légende se rend avec l'attribut `hidden` — visuellement identique à une page où l'on n'aurait pas mis de légende du tout.

### Impact de l'erreur ou du manque

La légende disparaît sans un mot, et l'auteur croit que le composant ne marche pas. Le diagnostic a demandé de lire le source du composant.

### Objectif métier de la correction

Qu'un `for` mal ciblé se signale au lieu de rendre une légende vide.

### Pérennité et reproductibilité du besoin

Durable : toute carte avec légende pose les deux `for` côte à côte.

### Comment ça a été vérifié

Rencontré et corrigé au navigateur le 2026-09-10 sur /education/dataviz-ips-colleges. Avec `for="carte-ips"` (l'id de la `dsfr-data-map`) : `getLegendEntries()` de la couche renvoyait pourtant ses cinq classes, mais la légende était rendue `<div class="dsfr-data-map-legend" … hidden="">`, sans message. Après avoir donné un id à la couche et pointé `for="couche-ips"` : les cinq entrées s'affichent. Comportement lu au source, packages/core/src/components/dsfr-data-map-legend.ts, `_targetLayers()`.

### Contournement actuel

Donner systématiquement un `id` à la couche et le reprendre dans le `for` de la légende ; à défaut, laisser `for` vide, qui décrit toutes les couches directes de la carte hôte.

### Demande

Avertir en console quand le `for` d'une légende désigne un élément existant qui n'est pas une couche (typiquement la carte elle-même) — le cas est distinguable d'un id absent, et c'est la confusion la plus probable.

### Critères d'acceptation

- [ ] Un `for` pointant un élément qui n'est pas un `dsfr-data-map-layer` produit un avertissement console nommant l'attribut et l'élément trouvé.
- [ ] Le cas `for` vide (toutes les couches de la carte) reste silencieux.

---

## PG-016 — Le tri des facettes est global, pas par champ

**Priorité** P3 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement, dx`, `severity:basse`, `dsfr-data-facets`
**Rencontré sur** 2 page(s) : prix-des-carburants, entreprise-patrimoine-vivant

### Constat

`sort="count|alpha"` s'applique à toutes les facettes du composant ; le portail trie régions et départements en alphanumérique et carburants par effectif dans la même barre. Sur EPV, une gamme de prix ne peut pas suivre l'ordre des montants (`static-values` masquerait les compteurs).

**Ce qui est vrai.** Partiellement traité par #645, livré en 0.21.1 : le tri des facettes adopte la grammaire `critère:sens` (`sort="count:desc"`), ce qui lève l'ambiguïté du tiret (PG-012).

**Ce qui reste vrai.** Le tri demeure global : `_resolveSort()` lit un seul `sort` pour tout le composant (vérifié au source, `dsfr-data-facets.ts`, et dans le bundle publié 0.24.0). La grammaire par champ `champ:tri | champ2:tri`, déjà en usage pour `labels` et `display`, n'existe pas — une barre ne peut toujours pas trier les départements en alphanumérique et les carburants par effectif.

### Impact de l'erreur ou du manque

Une page qui veut trier une facette par ordre alphabétique et une autre par compte doit écrire deux composants de facettes, ou renoncer.

### Objectif métier de la correction

Trier chaque facette selon ce qui a du sens pour son champ.

### Pérennité et reproductibilité du besoin

Structurel, et la grammaire existe déjà : `champ:valeur | champ2:valeur` est celle de `labels` et `display` sur le même composant. C'est une extension, pas une conception.

### Comment ça a été vérifié

`dsfr-data-facets.ts`, propriété `sort` (l. 70) et `_sortValues` (l. 648), sans grammaire par champ.

### Contournement actuel

Aucun : choisir le tri dominant, ou deux composants de facettes.

### Demande

Accepter la grammaire `champ:tri | champ2:tri` déjà utilisée par `labels` et `display`.

### Critères d'acceptation

- [ ] `sort="academie:alpha:asc | type:count:desc"` trie chaque facette séparément.
- [ ] Un `sort` sans nom de champ garde le comportement global actuel.
- [ ] Une grammaire invalide produit un avertissement, pas un silence (PG-022).

---

## LIM-011 — `color-map` sépare ses paires par une virgule, que des valeurs métier contiennent

**Priorité** P3 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement`, `severity:basse`, `dsfr-data-map-layer`
**Rencontré sur** 3 page(s) : entreprise-patrimoine-vivant, edu/generation-2024, edu/label-egalite-fille-garcon

### Constat

`_parseColorMap` découpe sur « , » : une valeur qui contient une virgule ne peut pas recevoir de couleur. **Requalifié de `limite-dure` en `amelioration` le 2026-09-10** : ce n'est pas une contrainte extérieure mais un choix de grammaire, et #676 a précisément montré la voie en ajoutant l'échappement percent (`%3A`, `%7C`, `%2C`, `%25`) à `replace` et `replace-fields`. Le même échappement réglerait ce cas.

### Impact de l'erreur ou du manque

Un jeu dont les libellés contiennent une virgule ne peut pas être coloré du tout, et rien ne le signale — la carte sort monochrome.

### Objectif métier de la correction

Colorer par une modalité dont le libellé contient une virgule.

### Pérennité et reproductibilité du besoin

Structurel : les nomenclatures métier énumèrent (« A, B et C »). Deux portails sur deux l'ont rencontré. Le mécanisme d'échappement existe déjà depuis #676.

### Comment ça a été vérifié

Deux portails, deux jeux. Bercy : `dsfr-data-map-layer.ts` l. 290, couleur #639F6A appliquée seulement après renommage de « Equipements Industriels, Médicaux, Mécaniques ». Éducation (lot 12) : le champ `type` de `fr-en-etablissements-labellises-generation-2024` compte **39 valeurs réelles dont plusieurs contiennent une virgule** — aucune n'est cartographiable. Le découpage sur « , » est inchangé dans le bundle publié 0.25.0.

### Contournement actuel

Renommer la valeur en amont par `dsfr-data-normalize replace-fields`.

### Demande

Accepter l'échappement percent dans `color-map`, avec la même convention que `replace-fields` depuis #676.

### Critères d'acceptation

- [ ] `color-map="Equipements Industriels%2C Médicaux:#639F6A"` applique la couleur.
- [ ] La convention est celle de `replace-fields` (#676), documentée au même endroit.
- [ ] Une grammaire invalide produit un avertissement, pas un silence (cf. PG-022).

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

## AM-060 — `color-map` n'existe que sur une couche de carte, pas sur `dsfr-data-chart`

**Priorité** P3 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement`, `severity:basse`, `dsfr-data-chart`, `dsfr-data-map-layer`
**Rencontré sur** 2 page(s) : edu/portrait-de-territoire-sports, edu/label-egalite-fille-garcon

### Constat

`color-map` est porté par `dsfr-data-map-layer`, pas par `dsfr-data-chart` : une même modalité ne peut pas garder sa couleur entre la carte et le graphique de la même page, ce qui est la première attente d'un tableau de bord. (Le second point de la rédaction initiale — le séparateur virgule — a été **fusionné dans LIM-011**, qui le portait déjà depuis le portail Bercy : règle « fusionner avant d'ajouter ».)

### Impact de l'erreur ou du manque

Une modalité change de couleur entre deux blocs de la même page ; et un jeu dont les libellés contiennent une virgule ne peut pas être coloré du tout.

### Objectif métier de la correction

Qu'un codage couleur soit déclaré une fois et respecté partout.

### Pérennité et reproductibilité du besoin

Structurel : les libellés métier contiennent des virgules, et les tableaux de bord mêlent cartes et graphiques.

### Comment ça a été vérifié

Relevé sur « Portrait de territoire », dont l'original code la même modalité de deux couleurs différentes entre sa carte et ses graphiques. Grep sur `packages/core/src` : `color-map` n'apparaît que dans `dsfr-data-map-layer.ts`.

### Demande

`color-map` sur `dsfr-data-chart`, et un séparateur qui admette des valeurs à virgule (ou un échappement, cohérent avec #676).

### Critères d'acceptation

- [ ] `color-map` est accepté par `dsfr-data-chart` avec la même grammaire que sur la couche.
- [ ] Une valeur contenant une virgule est cartographiable (séparateur ou échappement).
- [ ] Une grammaire invalide produit un avertissement, pas un silence (cf. PG-022).

---

## AM-065 — `dsfr-data-search count` n'a pas d'état vide : il affiche « 0 résultats » quand rien n'a été demandé

**Priorité** P3 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement`, `severity:basse`, `dsfr-data-search`
**Rencontré sur** 1 page(s) : impot-sur-le-revenu

### Constat

Avec `require-where` (#690), les afficheurs passent correctement en état `idle` tant qu'aucun filtre n'est posé — sauf le compteur de `dsfr-data-search`, qui annonce « 0 résultats ». L'utilisateur lit donc « aucun résultat » là où il faudrait lire « faites un choix ». C'est l'angle mort d'une fonctionnalité par ailleurs juste.

### Impact de l'erreur ou du manque

Un message contredit les cinq autres afficheurs sur la même page, et dit le contraire de la vérité.

### Objectif métier de la correction

Que le compteur de recherche se taise quand la page attend un choix.

### Pérennité et reproductibilité du besoin

Durable : le motif `require-where` a vocation à servir sur toute page d'exploration.

### Comment ça a été vérifié

Relevé au navigateur le 2026-09-10 sur la page de l'impôt sur le revenu, après mise en œuvre de `require-where` : zéro requête au chargement (vérifié au réseau), les six afficheurs en état idle, et le compteur de recherche affichant « 0 résultats ».

### Demande

Propager l'état `idle` au compteur de `dsfr-data-search`, avec un libellé paramétrable.

### Critères d'acceptation

- [ ] Sous `require-where` et sans filtre, le compteur n'affiche pas « 0 résultats ».
- [ ] Le libellé de l'état d'attente est paramétrable, comme celui des autres afficheurs.
- [ ] Poser un filtre rétablit le compteur normal.

---

## PG-027 — L'adaptateur Opendatasoft backquote `group-by` mais pas `select` : un champ au nom non standard vaut un HTTP 400

**Priorité** P3 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement, dx`, `severity:basse`, `dsfr-data-source`
**Rencontré sur** 1 page(s) : edu/cnr-education

### Constat

Le jeu du CNR Éducation publie un champ nommé littéralement `1_uai`. Ce n'est pas un identifiant ODSQL valide — il commence par un chiffre — et l'API le refuse s'il n'est pas entouré d'accents graves : « ODSQL syntax exception: unexpected _uai at position 1 ». Or l'adaptateur transmet le `select` tel quel, alors qu'il échappe les éléments du `group-by`. Un champ que le portail publie est donc inutilisable dans un `select` sans le backquoter à la main, geste que rien ne suggère. C'est le MIROIR de BUG-010 : dans `group-by`, l'adaptateur backquote TROP (un alias `x as y` est protégé comme un nom de champ et vaut un 400) ; dans `select`, il ne backquote PAS ASSEZ. Deux clauses voisines, deux traitements opposés, deux échecs symétriques — et l'auteur d'une page n'a aucun moyen de deviner lequel s'applique où.

### Impact de l'erreur ou du manque

Faible en fréquence — peu de jeux nomment un champ avec un chiffre en tête — mais total quand il survient : la page ne charge rien. L'échec est franc, donc diagnosticable ; le coût est le temps de comprendre que le nom du champ est en cause.

### Objectif métier de la correction

Qu'un champ publié par le portail soit utilisable dans un `select` sans échappement manuel.

### Pérennité et reproductibilité du besoin

Durable, et à traiter avec BUG-010 : c'est la même règle d'échappement, appliquée de façon cohérente aux deux clauses.

### Comment ça a été vérifié

Rencontré au navigateur le 2026-09-10 sur /education/cnr-education (dsfr-data 0.27.0). Avec `select="1_uai, etab_verif, …"` : HTTP 400 sur `/exports/json`, repli automatique sur `/records` qui échoue de même, source en erreur et les quatre KPI affichant « Erreur de chargement ». Recoupé à l'API en curl : `select=1_uai,etab_verif` → 400 avec le message ci-dessus ; `select=%601_uai%60,etab_verif` (backquoté) → 200. Contournement appliqué dans l'attribut : `select="`1_uai`, etab_verif, …"` → HTTP 200 et 6 024 lignes.

### Contournement actuel

Backquoter le champ dans l'attribut `select` de la page. Fonctionne (vérifié), mais suppose de savoir que l'échec vient de là : le message d'API parle de « position 1 », pas du nom du champ.

### Demande

Échapper les éléments du `select` comme ceux du `group-by` — un élément qui est un simple nom de champ (sans parenthèse, sans ` as `, sans opérateur) est backquoté ; les expressions passent telles quelles. La règle serait alors la même dans les deux clauses, ce qui réglerait aussi BUG-010 par symétrie.

### Critères d'acceptation

- [ ] `select="1_uai, etab_verif"` émet `select=`1_uai`,etab_verif` et répond 200.
- [ ] Une expression (`sum(x) as v`, `year(d) as a`) continue de passer telle quelle.
- [ ] Un nom de champ ordinaire n'est pas altéré au point de changer le nom de la colonne reçue.
- [ ] Un test couvre les trois formes, dans `select` comme dans `group-by`.

---

## BUG-012 — La grammaire du ratio déclenche l'avertissement de dépréciation qu'elle ne devrait pas : `count:champ:valeur` est la forme recommandée

**Priorité** P3 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Accepter
**Labels suggérés** : `bug`, `severity:basse`, `dsfr-data-kpi`
**Rencontré sur** 2 page(s) : edu/cactus-hameconnage, edu/fei-projets-europeens-donnees

### Constat

La grammaire `count:champ:valeur` est celle du ratio livré en 0.24.0 (#673) : `value="count:statut:ouvert / count"` est l'exemple même du JSDoc. Mais le parseur la confond avec l'ancienne forme `fn:champ`, dépréciée en #303, et émet « la grammaire "count:type_etablissement" (fn:champ) est dépréciée — utilisez la grammaire commune du pipeline "champ:fn" ». Le résultat affiché est JUSTE ; seul l'avertissement est faux. Il pousse à « corriger » du code correct vers une forme qui, elle, ne saurait pas exprimer le filtre — et il pollue la console des pages qui suivent la documentation. Deux pages de ce dépôt déjà en ligne le déclenchent.

### Impact de l'erreur ou du manque

Faible techniquement — le chiffre est juste — mais l'avertissement dit à l'auteur que son code est obsolète alors qu'il suit la documentation. Sur un dépôt qui traque les messages de console, un faux positif coûte de l'attention à chaque relecture.

### Objectif métier de la correction

Que l'avertissement ne vise que la forme réellement dépréciée.

### Pérennité et reproductibilité du besoin

Durable tant que les deux grammaires cohabitent.

### Comment ça a été vérifié

Vérifié au navigateur le 2026-09-10 (dsfr-data 0.27.0). `<dsfr-data-kpi source="…" value="count:type_etablissement:Ecole / count" format="pourcentage">` sur `fr-en-ulis-tfv` affiche **44,2 %**, valeur exacte (23 écoles sur 52), et émet en console l'avertissement de dépréciation cité ci-dessus. La forme suggérée par le message (`champ:fn`) ne permet pas d'exprimer un filtre par valeur.

### Demande

Ne pas déclencher l'avertissement `fn:champ` quand l'expression est un `count:champ:valeur` — reconnaissable à son premier segment `count` et à ses trois parties. La forme à trois parties n'a jamais existé dans la grammaire dépréciée.

### Critères d'acceptation

- [ ] `value="count:champ:valeur"` n'émet aucun avertissement de dépréciation.
- [ ] `value="count:champ:valeur / count"` non plus.
- [ ] `value="sum:population"` (forme réellement dépréciée) continue de l'émettre.

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

## AM-069 — Une couche dont tous les points sont confondus se comporte comme une couche qui marche : rien ne le signale

**Priorité** P3 · **Effort estimé** M (un à trois jours) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement`, `severity:moyenne`, `dsfr-data-map-layer`
**Rencontré sur** 1 page(s) : edu/carto-pix-fiche-etablissement

### Constat

Le jeu que la page Pix du portail cartographie porte 43 479 lignes et 11 113 établissements distincts pour UNE SEULE coordonnée : toutes ses lignes ont hérité de la position de la première (45,97497 / 5,35024 — le lycée Alexandre-Bérard à Ambérieu-en-Bugey). La carte se comporte pourtant normalement : les coordonnées sont valides, `getSkippedCount()` vaut 0, aucun avertissement n'est émis, le cluster s'affiche et annonce 43 479. Il ne se disperse simplement jamais, y compris au zoom 19 — et c'est le SEUL signe visible : il ne se passe rien. Une carte dont tous les points sont confondus est visuellement indiscernable d'une carte dont le clustering fonctionne mal, ou dont le fit est mal réglé. Le diagnostic a demandé d'exporter le jeu et de dédoublonner les coordonnées en dehors de la page. Or la bibliothèque tient déjà les données : elle est le seul acteur de la chaîne en position de compter les positions distinctes d'une couche, et de dire « 43 479 éléments, 1 position distincte » — ce qui aurait fait gagner une heure et, surtout, aurait empêché de publier une carte inopérante.

### Impact de l'erreur ou du manque

Le défaut est rare mais total : la dataviz d'origine est entièrement inopérante et personne ne s'en est aperçu. C'est aussi le genre de défaut qu'une reprise de jeu introduit sans bruit — un géocodage qui échoue et retombe sur une valeur par défaut. La bibliothèque est le seul maillon qui puisse le voir.

### Objectif métier de la correction

Qu'une carte dont les points sont tous confondus le dise, au lieu de ressembler à une carte qui fonctionne.

### Pérennité et reproductibilité du besoin

Durable : c'est une mesure sur les données rendues, indépendante du portail et de l'adaptateur.

### Comment ça a été vérifié

Établi le 2026-09-10 en construisant /education/carto-pix-fiche-etablissement (dsfr-data 0.27.0). Export complet de `fr-en-pix_certification_pix_inscription_et_passation_par_eple` (`/exports/json?select=position,uai`, 43 479 lignes, 3,7 Mo) puis dédoublonnage des coordonnées arrondies à 5 décimales : **1 position distincte pour 11 113 UAI distincts**. Recoupé par l'API elle-même, dont l'emprise du jeu entier est un point : `/records/1.0/boundingbox/` renvoie `bbox` aux quatre coordonnées identiques. Les trois jeux frères du même producteur ont de vraies positions — `…_sans_collecte_de_profil` rend 10 095 coordonnées distinctes pour 41 422 lignes, mesuré de la même façon. La page a été bâtie sur ce jeu-là.

### Contournement actuel

Compter soi-même les positions distinctes, hors de la page, avant de faire confiance à une carte. Aucun moyen de le faire depuis la page.

### Demande

Que `dsfr-data-map-layer` expose le nombre de positions distinctes de ce qu'elle a rendu (par exemple `getDistinctPositionCount()`, à côté de `getSkippedCount()` et `getRenderedCount()`), et avertisse en console quand ce nombre est très inférieur au nombre d'éléments — par exemple une position pour plus de dix éléments. Le seuil doit rester silencieux sur les cas légitimes : plusieurs services à une même adresse, plusieurs millésimes d'un même établissement.

### Critères d'acceptation

- [ ] La couche expose le nombre de positions distinctes rendues.
- [ ] Un avertissement console est émis quand ce nombre est très inférieur au nombre d'éléments, avec les deux chiffres.
- [ ] Le seuil ne se déclenche pas sur un jeu où quelques éléments partagent une adresse.
- [ ] L'information apparaît dans le volet Diagnostic.

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

## PG-025 — Le `where` d'un `dsfr-data-context` ne peut pas porter sur un alias d'agrégat : il s'applique avant le `group_by`

**Priorité** P4 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement, dx`, `severity:basse`, `dsfr-data-context`, `dsfr-data-context-filter`, `dsfr-data-source`
**Rencontré sur** 1 page(s) : edu/fei-chiffres-cles

### Constat

Quand plusieurs sources agrégées partagent un alias commun (`… as an`), il est tentant de poser un seul `dsfr-data-context-filter field="an"` pour les filtrer toutes d'un geste : c'est le sens même de l'alias. Mais le filtre du contexte est diffusé aux sources comme une clause `where`, et `where` s'applique AVANT `group_by` côté serveur — l'alias n'existe pas encore. L'API répond « Unknown field » / HTTP 400 sur chacune des sources visées. Il faut donc écrire un filtre par typage de champ d'origine (`year-of` sur une date, `eq` sur un texte ou un entier), chacun ciblant ses sources par `apply-to` — c'est-à-dire écrire trois fois ce que l'alias promettait d'unifier une fois.

### Impact de l'erreur ou du manque

Faible : l'échec est franc et immédiatement diagnosticable — c'est le SEUL du lot 14 qui n'ait pas été silencieux. Le coût est une demi-heure de tâtonnement, pas une page fausse mise en ligne.

### Objectif métier de la correction

Que la documentation dise où s'applique le `where` d'un contexte par rapport à l'agrégation.

### Pérennité et reproductibilité du besoin

Durable dès qu'une page agrège plusieurs sources, motif courant sur un portail multi-jeux.

### Comment ça a été vérifié

Rencontré et corrigé au navigateur le 2026-09-10 sur /education/fei-chiffres-cles. Avec `<dsfr-data-context-filter field="an" operator="eq" default="2025">` sur les sept sources agrégées : sept requêtes `…&where=an = "2025"&group_by=…` → sept HTTP 400, sept messages `dsfr-data-source[<id>]: Erreur de chargement Error: HTTP 400` en console. Remplacé par trois filtres partageant le même `ui` — `field="annee" operator="year-of" apply-to="delf tcf belc mob"`, `field="annee" operator="eq" apply-to="enic"`, `field="periode" operator="eq" apply-to="asfr aslve"` — : zéro erreur, et les sept KPI rendent les chiffres de référence de l'original (513 435, 310 473, 1 146, 50 477, 1 486, 4 376, 522).

### Contournement actuel

Un filtre de contexte par champ d'origine et par typage, ciblé avec `apply-to`, tous sur le même `ui`. Plusieurs `dsfr-data-context-filter` peuvent partager un même élément d'UI : un seul contrôle à l'écran.

### Demande

Rien à demander sur le comportement, qui est celui d'ODSQL. En revanche, le mentionner dans le JSDoc de `dsfr-data-context-filter` et dans celui de `group-by` : c'est le premier réflexe qu'on a devant plusieurs sources agrégées partageant un alias.

### Critères d'acceptation

- [ ] Le JSDoc de `dsfr-data-context-filter` précise que le filtre est diffusé en `where` et ne peut donc pas porter sur un alias de `group-by`.
- [ ] Le JSDoc de `group-by` renvoie à ce point.
- [ ] Le motif « plusieurs filtres, un seul `ui`, `apply-to` par source » est donné en exemple.

---

## AM-073 — `cell-class` n'accepte qu'un identifiant CSS : le libellé restitué aux lecteurs d'écran est un slug

**Priorité** P4 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Accepter
**Labels suggérés** : `enhancement`, `severity:basse`, `dsfr-data-list`
**Rencontré sur** 1 page(s) : edu/annuaire-des-internats

### Constat

`cell-class` (#740, 0.27.0) fait d'une colonne calculée la classe CSS d'une cellule, et satisfait le RGAA 1.4.1 par construction : quand la colonne de classe n'est pas affichée, sa valeur est restituée en `fr-sr-only` — l'information ne passe donc pas par la seule couleur. Mais la valeur retenue doit être un identifiant CSS valide, donc sans espace : impossible d'y mettre une phrase. La cellule rend « 100 (occupation-saturee) », et un lecteur d'écran énonce le slug tel quel. Le mécanisme est juste, sa restitution ne l'est pas tout à fait.

### Impact de l'erreur ou du manque

Faible : l'information passe, mais sous une forme technique. Sur un tableau destiné au grand public, un slug énoncé à voix haute est une gêne réelle.

### Objectif métier de la correction

Que le texte restitué soit rédigé, pas dérivé d'un nom de classe.

### Pérennité et reproductibilité du besoin

Durable tant que `cell-class` sert à signaler des seuils.

### Comment ça a été vérifié

Relevé au navigateur le 2026-09-10 (dsfr-data 0.27.0) sur /education/annuaire-des-internats, colonne « Occupation pré-bac (%) » classée par une colonne `occupation_seuil` produite en `compute`. Le DOM rend `<td class="occupation-saturee">100 <span class="fr-sr-only">(occupation-saturee)</span></td>`.

### Demande

Séparer la classe du libellé accessible — par exemple `cell-class="taux:classe:libellé"`, ou accepter une seconde colonne portant le texte à restituer.

### Critères d'acceptation

- [ ] Un libellé rédigé peut être associé à une classe.
- [ ] En son absence, le comportement actuel est conservé.
- [ ] Le texte reste rendu en `fr-sr-only` quand la colonne de classe n'est pas affichée.

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

**Ce qui est vrai.** Refusé côté `dsfr-data` (#692, 0.21.1), et pour la bonne raison : le type de graphique appartient à DSFR Chart. Une demande de treemap se dépose chez `GouvernementFR/dsfr-chart`, pas ici — c'est la quatrième des cinq règles du lot 11.

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
