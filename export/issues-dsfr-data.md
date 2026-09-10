# Demandes à déposer sur bmatge/dsfr-data — rapport de cadrage

> Fichier généré par `node scripts/build-retours.mjs` depuis `public/data/retours.json`.
> 27 demandes cadrées — 3 bugs,
> 22 améliorations,
> 2 pièges à désamorcer dans la bibliothèque plutôt que dans la documentation.
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
les jalons 0.21.1, 0.22.0, 0.23.0 et 0.24.0 ont comblé 49 des constats déposés,
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
| AM-052 | La fiche servie par le serveur MCP est en retard sur la documentation du dépôt | amelioration | S | 3 | Accepter |
| AM-053 | Un attribut inconnu d'un composant est ignoré sans aucun avertissement | amelioration | S | 2 | Accepter |
| AM-064 | En mode adaptateur, aucun moyen de passer un paramètre de requête qui n'est pas une clause (`timezone`) | amelioration | S | 1 | Accepter |
| AM-045 | La sélection ne part que d'une carte : ni une liste, ni une fiche, ni un graphique ne peut filtrer un contexte | amelioration | M | 5 | Accepter |
| AM-049 | Un ratio dont le numérateur et le dénominateur viennent de deux sources différentes | amelioration | M | 4 | Accepter |

_8 demandes — S 6, M 2, L 0._

### P2 — prochain cycle : gain net, effort mesuré

| Id | Demande | Type | Effort | Pages | Décision |
|---|---|---|---|---|---|
| PG-022 | Les grammaires d'attributs multi-entrées diffèrent d'un attribut à l'autre : `|` ici, `,` là | piege | S | 3 | Accepter (documentation + avertissement) |
| BUG-007 | `replace-fields` est silencieusement sans effet sur une valeur numérique | bug | S | 1 | Accepter |
| AM-044 | Le compteur `count` de `dsfr-data-search` rend « 35305 resultats » : ni séparateur de milliers, ni accent | amelioration | S | 3 | Accepter |
| AM-046 | Le cumul existe, mais seulement dans un `_bucketDate` privé de la couche de carte | amelioration | M | 2 | Accepter |
| BUG-006 | Un champ multivalué : `dsfr-data-facets` éclate les valeurs, un `group-by` client compte les combinaisons | bug | M | 2 | Accepter |
| AM-047 | Pas de boucle dans un template : impossible d'émettre un élément par valeur d'un champ multivalué | amelioration | M | 2 | Accepter |
| AM-051 | Les compteurs de facette n'ont pas de sens sur une table de mesures, et rien ne le dit | amelioration | M | 2 | Accepter |
| AM-056 | Changer le champ d'un filtre selon la source, et vider un groupe de filtres exclusifs | amelioration | M | 1 | Accepter |

_8 demandes — S 3, M 5, L 0._

### P3 — backlog : confort, cas moins fréquents

| Id | Demande | Type | Effort | Pages | Décision |
|---|---|---|---|---|---|
| AM-054 | Aucune maille géographique non française, ni référentiel de noms de pays en français | amelioration | S | 1 | Accepter |
| PG-016 | Le tri des facettes est global, pas par champ | piege | S | 2 | Accepter |
| LIM-011 | `color-map` sépare ses paires par une virgule, que des valeurs métier contiennent | amelioration | S | 3 | Accepter |
| AM-057 | La valeur courante d'un filtre n'est pas interpolable dans du texte | amelioration | S | 1 | Accepter |
| AM-059 | Colorer une cellule selon un seuil dans un tableau | amelioration | S | 2 | Étudier |
| AM-060 | `color-map` n'existe que sur une couche de carte, pas sur `dsfr-data-chart` | amelioration | S | 2 | Accepter |
| AM-065 | `dsfr-data-search count` n'a pas d'état vide : il affiche « 0 résultats » quand rien n'a été demandé | amelioration | S | 1 | Accepter |
| AM-058 | Un filtre qui traverse un référentiel (académie → départements) | amelioration | M | 2 | Étudier |

_8 demandes — S 7, M 1, L 0._

### P4 — hors périmètre ou refus motivé

| Id | Demande | Type | Effort | Pages | Décision |
|---|---|---|---|---|---|
| AM-062 | Aucune position documentée sur l'encastrement en iframe | amelioration | S | 1 | Accepter |
| AM-061 | Contrôles de carte : bascule du fond, plein écran, capture | amelioration | M | 2 | Étudier |
| AM-037 | Pas de treemap | amelioration | L | 1 | Transférer à DSFR Chart |

_3 demandes — S 1, M 1, L 1._

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
