# Demandes à déposer sur bmatge/dsfr-data — rapport de cadrage

> Fichier généré par `node scripts/build-retours.mjs` depuis `public/data/retours.json`.
> 12 demandes cadrées — 5 bugs,
> 4 améliorations,
> 3 pièges à désamorcer dans la bibliothèque plutôt que dans la documentation.
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

32 critiques ont été **retirées** au fil du
banc d'essai parce qu'une vérification a montré une voie native ou une erreur de notre part (entrées
`faux-probleme` du registre), et 109
autres sont marquées **corrigées** parce que la bibliothèque les a résolues depuis (leur trace reste au
registre, avec ce qui en demeure vrai). Ce rapport ne liste que ce qui a résisté à la vérification.

Un rappel de méthode issu du lot 12, qui vaut avertissement : une capacité peut être **native, publiée,
et malgré tout absente du bundle chargé** par un site — les 26 pages de ce dépôt ont épinglé
`dsfr-data@0.20.0` pendant que npm servait déjà 0.23.0, puis 0.24.0. Avant de conclure à un manque,
il faut donc chercher l'attribut dans le source, **puis vérifier dans quelle version publiée il
apparaît**. Trois demandes de ce rapport sont nées de ce piège, et deux constats antérieurs
(AM-017, AM-039) en sont sortis.

Le dépôt est désormais monté en `dsfr-data@0.28.0`, et le registre en tire les conséquences :
les jalons 0.21.1 à 0.28.0 ont comblé 109 des constats déposés,
passés au statut `corrige` et sortis de ce rapport. Chaque constat restant a été **rejoué contre
la 0.28.0** avant d'entrer ici : ce qui suit n'est ni livré ni planifié à la date de ce rapport.

## Priorisation

### P1 — immédiat : chiffres faux ou fonctions inutilisables, correction courte

| Id | Demande | Type | Effort | Pages | Décision |
|---|---|---|---|---|---|
| PG-033 | API Tabular : un tri serveur combiné à la pagination **perd des lignes en silence** — 177 distinctes sur 180 rendues, et une courbe qui plonge à zéro | piege | S | 1 | Déposer chez dsfr-data |
| BUG-026 | Une source groupée perd son `group_by` quand un `dsfr-data-normalize` s'intercale devant une `dsfr-data-query group-by` seule lectrice | bug | S | 1 | Déposer chez dsfr-data |
| BUG-027 | Un `where` de `dsfr-data-query` sur un alias d'agrégat est délégué au portail (HTTP 400), et l'échec de l'export fait passer les autres sources du même jeu en pagination | bug | S | 1 | Déposer chez dsfr-data |
| BUG-028 | `dsfr-data-query` : `avg`, `sum`, `min` et `max` rendent 0 pour un groupe dont toutes les valeurs sont nulles, au lieu de null | bug | S | 2 | Déposer chez dsfr-data |

_4 demandes — S 4, M 0, L 0._

### P2 — prochain cycle : gain net, effort mesuré

| Id | Demande | Type | Effort | Pages | Décision |
|---|---|---|---|---|---|
| PG-032 | `dsfr-data-a11y` n'accepte pas la grammaire `champ:Libellé` de son propre graphique : les en-têtes gardent le nom de colonne, et écrire le libellé **vide le tableau** sans un mot | piege | S | 3 | Déposer chez dsfr-data |
| PG-034 | API Tabular : `__in` **ignore toute valeur contenant une parenthèse**, avec un HTTP 200 et zéro ligne — là où `__exact` accepte la même valeur | piege | S | 1 | Déposer chez dsfr-data et signaler à data.gouv.fr |
| BUG-023 | L'agrégat `max` (et `min`) de `dsfr-data-query` lit une date ISO comme un nombre : `2026-09-25` devient 2026, là où le KPI rend 25/09/2026 | bug | S | 1 | Déposer chez dsfr-data |
| AM-089 | `series-field` de `dsfr-data-chart` comble les cellules (année, série) absentes par 0 : une série qui s'arrête est tracée à plat sur zéro | amelioration | S | 1 | Déposer chez dsfr-data |
| BUG-029 | `dsfr-data-chart series-field` remplit de 0 les cellules sans observation : une série absente devient « 0 » dans l'infobulle et un segment nul | bug | S | 3 | Déposer chez dsfr-data |
| AM-087 | La fiche `apiProviders` annonce que Tabular exige un proxy CORS : l'API répond `access-control-allow-origin: *`, requêtes et préflight comprises | amelioration | XS | 1 | Déposer chez dsfr-data |

_6 demandes — S 5, M 0, L 0._

### P3 — backlog : confort, cas moins fréquents

| Id | Demande | Type | Effort | Pages | Décision |
|---|---|---|---|---|---|
| AM-088 | `subtitle-field` du podium affiche le nombre brut : ni séparateur de milliers, ni format, ni suffixe | amelioration | S | 1 | Déposer chez dsfr-data |
| AM-090 | `compute` n'a aucun échappement de la quote simple dans un littéral : `'J''en ai'` est impossible | amelioration | XS | 1 | Déposer chez dsfr-data |

_2 demandes — S 1, M 0, L 0._

### P4 — hors périmètre ou refus motivé

| Id | Demande | Type | Effort | Pages | Décision |
|---|---|---|---|---|---|


_0 demandes — S 0, M 0, L 0._

## Les demandes

## PG-033 — API Tabular : un tri serveur combiné à la pagination **perd des lignes en silence** — 177 distinctes sur 180 rendues, et une courbe qui plonge à zéro

**Priorité** P1 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Déposer chez dsfr-data
**Labels suggérés** : `enhancement, dx`, `severity:haute`, `dsfr-data-source`, `dsfr-data-query`
**Rencontré sur** 1 page(s) : demo/delinquance-sans-total

### Constat

L'adaptateur Tabular délègue `order-by` au serveur (`champ__sort=asc`) et pagine par 50, plafond de l'API. Les deux ensemble donnent un ordre **instable d'une page à l'autre** dès que le champ de tri n'est pas unique : des lignes reviennent deux fois, d'autres ne reviennent jamais. Le compte total, lui, est juste — c'est ce qui rend le défaut invisible.

Sur la base départementale de la délinquance (SSMSI), une source `group-by="annee, indicateur"` + `order-by="annee:asc"` rend **180 lignes dont 177 distinctes** : trois doublons de 2018, trois couples (année × indicateur) disparus, HTTP 200 sur les quatre pages. « Usage de stupéfiants » 2018 faisait partie des disparus, et la courbe du chapitre 1 de la page **plongeait à zéro au milieu du graphique**. Le même défaut sans `group-by` : 101 départements triés par `nombre__sort=desc` en rendent 99 distincts.

La faute est celle de l'API Tabular (pagination par offset sur un tri non total), pas de la bibliothèque. Mais c'est la bibliothèque qui compose `champ__sort` **et** la boucle de pagination : elle est le seul endroit où le garde-fou peut vivre. Sans tri, les 180 lignes — et les 101 — sont toujours complètes, vérifié en rejouant les pages à l'API hors de toute page.

⚠️ Seul un recalcul indépendant, ou un zéro assez voyant pour sauter aux yeux, révèle ce genre de perte : aucune recette comptant des lignes ne la voit, puisque le compte est bon.

### Impact de l'erreur ou du manque

Des données **manquantes sans aucun signal** : compte total juste, HTTP 200, rien en console. La page l'a payé par une courbe fausse, visible seulement parce que le trou tombait au milieu d'un graphique. Sur un tableau ou un KPI, il serait passé. Tout jeu Tabular de plus de 50 lignes trié au serveur est concerné, c'est-à-dire le cas nominal.

### Objectif métier de la correction

Qu'un chargement paginé sur Tabular rende toujours l'ensemble des lignes, ou dise qu'il ne le garantit pas.

### Pérennité et reproductibilité du besoin

Structurel tant que l'API Tabular pagine par offset sans clé de départage. Le défaut est dans l'API ; la bibliothèque est le seul endroit où il peut être neutralisé, puisqu'elle compose le tri et la boucle de pagination.

### Comment ça a été vérifié

Relevé au navigateur le 2026-09-21 contre `dsfr-data@0.42.0` (courbe « Total enregistré » à 0 en 2018 sur `/demo/delinquance-sans-total`, `q-stups` rendant 28 lignes au lieu de 30), puis **reproduit à l'API hors de toute page** : les quatre pages de `?annee__sort=asc&page_size=50&page=N&annee__groupby&indicateur__groupby&nombre__sum` rendent 180 lignes / 177 couples distincts, avec (2018, 'Usage de stupéfiants'), (2018, 'Usage de stupéfiants (AFD)') et (2018, "Vols d'accessoires sur véhicules") manquants et trois autres couples de 2018 en double ; les mêmes quatre pages **sans** `annee__sort` rendent 180 lignes / 180 distinctes. Contre-épreuve sans `group-by` : `?indicateur__exact=Homicides&annee__exact=2025&nombre__sort=desc` sur trois pages rend 101 lignes / 99 départements distincts (56 et 49 en double) ; sans tri, 101 / 101.

### Contournement actuel

Ne rien trier au serveur sur ce fournisseur : retirer `order-by` de la `dsfr-data-source` et le poser en aval, sur une `dsfr-data-query` qui travaille sur des lignes déjà toutes chargées. C'est ce que fait la page. Le coût est nul tant que le jeu tient en mémoire ; il devient réel en `server-side`, où le tri n'a pas d'aval — et là il n'y a pas de contournement.

### Demande

Sur l'adaptateur Tabular, ne pas déléguer `order-by` quand le chargement est paginé (plus d'une page attendue), ou à défaut avertir en console que le tri serveur combiné à la pagination peut perdre des lignes sur ce fournisseur. Idéalement : compléter le tri délégué par une clé de départage stable (les champs du `group-by`, ou `__id`) pour rendre l'ordre total.

### Critères d'acceptation

- [ ] Un chargement Tabular paginé avec `order-by` rend le même ensemble de lignes qu'un chargement sans `order-by` (test sur un jeu de plus de 100 lignes, tri sur un champ non unique).
- [ ] À défaut de correctif : un avertissement console nommant le champ de tri et le nombre de pages, émis une fois.
- [ ] Aucune régression sur un chargement d'une seule page, où le tri serveur reste utile et sûr.

---

## BUG-026 — Une source groupée perd son `group_by` quand un `dsfr-data-normalize` s'intercale devant une `dsfr-data-query group-by` seule lectrice

**Priorité** P1 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Déposer chez dsfr-data
**Labels suggérés** : `bug`, `severity:haute`, `dsfr-data-query`, `dsfr-data-normalize`, `dsfr-data-source`
**Rencontré sur** 1 page(s) : decp-augmente

### Constat

Chaîne : source `select="procedure, count(*) as n" group-by="procedure"`, puis `normalize replace-fields`, puis `query group-by="procedure" aggregate="n:sum:n"`, seule lectrice. La requête part **sans `group_by`**, avec `select=procedure, count(*) as n` et `order_by=n DESC&limit=101`. Le KPI en aval affiche 96 667 200 au lieu de 966 672 (5 groupes au lieu de 19), avec un simple avertissement en console. Sans le `normalize`, la même chaîne envoie bien `group_by=procedure`. Le chiffre faux est plausible et rien ne le signale. Même famille que BUG-009 et BUG-025 : la délégation dépend de la topologie de la chaîne, et ici elle traverse un transformateur qu'elle ne devrait pas traverser.

### Impact de l'erreur ou du manque

Un compte faux de deux ordres de grandeur, sans erreur, dès qu'on nettoie des libellés (`replace-fields`) entre une source agrégée et une query : c'est le geste qu'appellent les doublons d'écriture du champ `procedure` (LIM-003).

### Objectif métier de la correction

Qu'insérer un `normalize` dans une chaîne ne change pas le résultat d'un agrégat.

### Pérennité et reproductibilité du besoin

Structurel : le nettoyage de libellés avant agrégation est un motif courant sur les jeux publics.

### Comment ça a été vérifié

Page minimale, dsfr-data 0.42.0, 2026-09-26 (agent de recréation DECP). Requête relevée au réseau : `exports/json?select=procedure, count(*) as n&where=…&order_by=n DESC&limit=101`, sans `group_by`. KPI 96 667 200. Sans `normalize` : `group_by=procedure`, KPI 966 672. Le contournement est appliqué sur /viz/decp-augmente.

### Contournement actuel

Donner un second lecteur au `normalize`. La query cesse alors de déléguer et calcule côté client.

### Demande

Ne pas déléguer `group-by` à travers un transformateur (`normalize`, `pivot`…) ; à défaut, ne jamais retirer le `group_by` que la source porte déjà.

### Critères d'acceptation

- [ ] La chaîne source groupée → `normalize replace-fields` → `query group-by` seule lectrice envoie `group_by=procedure` ou calcule côté client, et le KPI rend 966 672.
- [ ] La même chaîne sans `normalize` garde son comportement.
- [ ] Un test couvre la délégation à travers un transformateur.

---

## BUG-027 — Un `where` de `dsfr-data-query` sur un alias d'agrégat est délégué au portail (HTTP 400), et l'échec de l'export fait passer les autres sources du même jeu en pagination

**Priorité** P1 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Déposer chez dsfr-data
**Labels suggérés** : `bug`, `severity:haute`, `dsfr-data-query`, `dsfr-data-source`
**Rencontré sur** 1 page(s) : edu/dataviz-ips-ecoles

### Constat

Une `dsfr-data-query where="n:gte:40"`, seule lectrice d'une source Opendatasoft groupée (`count(ips) as n`), ajoute `AND n >= 40` au `where` de l'export. Le portail répond 400 (« Aggregation functions are only available in a select or an order by clause »), la console annonce « l'export ne sera plus retenté », et une autre source sur le même jeu (`paire`), qui n'avait rien demandé d'illégal, part directement en pagination `/records` et finit elle aussi en 400. Même famille que BUG-025 (un `order-by` sur un alias client délégué, corrigé en 0.36.0) : le correctif a couvert `order-by`, pas `where`.

### Impact de l'erreur ou du manque

Une page entière tombe en 400 dès qu'on filtre un agrégat (« communes d'au moins 40 écoles »), et l'échec s'étend aux autres sources du même jeu.

### Objectif métier de la correction

Qu'un filtre sur un alias d'agrégat reste côté client, comme le fait `order-by` depuis 0.36.0.

### Pérennité et reproductibilité du besoin

Structurel : filtrer un agrégat par un seuil d'effectif est le geste qu'impose toute moyenne honnête.

### Comment ça a été vérifié

Agent de recréation, /education/dataviz-ips-ecoles, dsfr-data 0.42.0, 2026-09-26 : requête d'export relevée au réseau avec `…AND n >= 40`, HTTP 400, message console « l'export ne sera plus retenté », source `paire` en `/records` puis 400. Seuil déplacé derrière un `dsfr-data-normalize` : les deux exports répondent 200 (835 ms et 2 757 ms). Non rejoué sur une page minimale.

### Contournement actuel

Intercaler un `dsfr-data-normalize` (ou donner un second lecteur à la source) pour que le filtre reste côté client.

### Demande

Ne pas déléguer un `where` qui porte sur un alias d'agrégat ; et ne pas étendre à tout un jeu l'abandon de l'export décidé pour une requête invalide.

### Critères d'acceptation

- [ ] Une query seule lectrice `where="n:gte:40"` sur une source ODS groupée n'envoie pas `n >= 40` au portail et rend les lignes attendues.
- [ ] L'échec d'un export n'interdit pas l'export aux autres sources du même jeu.
- [ ] Un test couvre `where` sur alias, à côté de celui d'`order-by` (#1045).

---

## BUG-028 — `dsfr-data-query` : `avg`, `sum`, `min` et `max` rendent 0 pour un groupe dont toutes les valeurs sont nulles, au lieu de null

**Priorité** P1 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Déposer chez dsfr-data
**Labels suggérés** : `bug`, `severity:haute`, `dsfr-data-query`
**Rencontré sur** 2 page(s) : edu/dataviz-ips-lycees, edu/capytale-usages

### Constat

Un groupe sans aucune valeur numérique sort à 0 : « voie professionnelle 0,0 » pour les lycées à voie générale seule ; sur Capytale, l'AEFE, sans correspondance dans la jointure gauche, sort avec `eleves: 0`, reste en queue du classement et verse ses visites dans la moyenne nationale. Un 0 plausible là où il fallait un vide : exactement ce que la règle #301 interdit ailleurs (`pivot`, `compute`). Un groupe partiellement nul, lui, donne la bonne moyenne.

### Impact de l'erreur ou du manque

Un 0 plausible entre dans un classement et dans une moyenne nationale (AEFE sur Capytale) ou s'affiche comme valeur (« voie professionnelle 0,0 »), sans avertissement.

### Objectif métier de la correction

Qu'un groupe sans valeur numérique rende null, conformément à #301.

### Pérennité et reproductibilité du besoin

Structurel : les jointures gauches et les champs optionnels produisent ces groupes à chaque page.

### Comment ça a été vérifié

Page minimale 0.42.0 (agent IPS lycées, 2026-09-26) : groupe `b` à `v: null, null` → `m: 0, s: 0, mi: 0` ; groupe mixte → moyenne 10, juste. Capytale : `aggregate="eleves:max"` → AEFE `eleves: 0`, relevé dans le pipeline le même jour. **Lu au source à la consignation** (`dsfr-data` main, `packages/core/src/components/dsfr-data-query.ts` l. 1851-1858) : `sum` réduit depuis 0, et `avg`, `min`, `max` rendent `0` quand `values.length === 0`.

### Contournement actuel

Un `where="champ:isnotnull"` (ou `:gt:0`) sur chaque query concernée.

### Demande

Rendre `null` pour `avg`, `min`, `max` (et `sum`, à trancher) quand le groupe n'a aucune valeur numérique, comme `pivot` le fait pour une cellule sans observation.

### Critères d'acceptation

- [ ] `avg`, `min`, `max` d'un groupe entièrement nul rendent null.
- [ ] Un groupe partiellement nul garde sa moyenne sur les valeurs présentes.
- [ ] Le comportement de `sum` est tranché et documenté.

---

## PG-032 — `dsfr-data-a11y` n'accepte pas la grammaire `champ:Libellé` de son propre graphique : les en-têtes gardent le nom de colonne, et écrire le libellé **vide le tableau** sans un mot

**Priorité** P2 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Déposer chez dsfr-data
**Labels suggérés** : `enhancement, dx`, `severity:moyenne`, `dsfr-data-a11y`, `dsfr-data-chart`
**Rencontré sur** 3 page(s) : sports/portrait-federation, aides-de-minimis, barometre-france-num

### Constat

Sur un graphique multi-séries, `dsfr-data-chart` nomme ses séries dans l'attribut lui-même : `value-field="v_fede:Fédération sélectionnée"`, `value-fields="v_gp:Son groupe de fédérations, v_all:Ensemble des fédérations"`. Le `dsfr-data-a11y` qui lui est apparié, **trois lignes plus bas dans le même bloc**, ne connaît pas cette grammaire : son `value-field` attend des noms de colonnes nus, séparés par des virgules. La conséquence n'est pas seulement cosmétique. Deux effets, dans cet ordre de gravité :

1. **En écrivant la grammaire du chart, le tableau se vide.** L'en-tête affiche littéralement la chaîne `dep_nom:Departement`, et **les cellules du corps sont vides** — la colonne est cherchée sous un nom qui n'existe pas. Aucune erreur console, aucun avertissement : le tableau équivalent est rendu, il a le bon nombre de lignes, et il ne contient rien.
2. **En écrivant la grammaire attendue, les en-têtes restent techniques.** Le graphique dit « Fédération sélectionnée », le tableau équivalent dit `v_fede`. Or le tableau équivalent est destiné aux lecteurs d'écran : c'est précisément là que le nom technique coûte le plus cher.

Le piège est d'autant plus facile à payer que les deux balises sont adjacentes et que l'une des deux accepte la forme. Il ne s'agit pas d'un attribut manquant mais d'une **asymétrie de grammaire entre deux composants appariés par conception** — le `for="g-base100"` de l'`a11y` déclare explicitement l'appariement.

**Relecture métier du 2026-09-26** — le piège payé sur deux pages, et la voie `rename` éprouvée.** Sur aides-de-minimis, le tableau équivalent du graphique des instruments porte en en-tête `instrument_aide | total | part`. Sur le Baromètre, un `dsfr-data-normalize rename` placé **après** le calcul donne des en-têtes lisibles — avec espaces et parenthèses (« Écart (pt) », « Variation (pt) »), que `compute` ne peut pas produire (identifiants `[A-Za-zÀ-ÿ0-9_]`). Le tableau et le CSV portent ces en-têtes, et graphiques et query en aval lisent les nouveaux noms (`order-by="Réponse:asc"` fonctionne). Le coût annoncé par le contournement se confirme : le libellé vit désormais dans le pipeline.

### Impact de l'erreur ou du manque

Un tableau équivalent **vide** — lignes présentes, cellules blanches — rendu sans aucun message console dès qu'on recopie la grammaire du graphique voisin. Le tableau équivalent est l'un des trois avantages nets que ce banc reconnaît à la bibliothèque face au portail d'origine : quand il est vide et qu'il le reste en silence, c'est l'argument qui tombe. Aucune recette comptant des lignes ne peut le voir. Secondairement, les en-têtes restent techniques (`v_fede`) là où le graphique dit « Fédération sélectionnée », et ce sont les lecteurs d'écran qui les reçoivent.

### Objectif métier de la correction

Aligner la grammaire de `dsfr-data-a11y` sur celle de `dsfr-data-chart`, avec lequel il est apparié par conception (`for="…"`), pour qu'un tableau équivalent porte les mêmes noms de séries que le graphique qu'il double.

### Pérennité et reproductibilité du besoin

Structurel. Tout graphique multi-séries de la bibliothèque appelle un `a11y` apparié, et l'asymétrie se présente à chaque fois, sur deux balises adjacentes. Le banc en porte 15 ; le risque grandit avec l'usage puisque la forme fautive est celle qu'on vient d'écrire une ligne plus haut.

### Comment ça a été vérifié

Relevé au navigateur le 2026-09-20 contre la 0.33.0 (`node scripts/rejeu-findings/run.mjs am082`, page `pages/am082.html`, cas 4). Deux `dsfr-data-a11y` sur la même source `q` : celui en grammaire nue rend les en-têtes `["dep_nom", "dep_nom__count"]` et un corps rempli ; celui en grammaire du chart (`label-field="dep_nom:Departement" value-field="dep_nom__count:Nombre d'equipements"`) rend les en-têtes `["dep_nom:Departement", "dep_nom__count:Nombre d'equipements"]` et une première ligne `["", ""]` — **cellules vides**. Console : aucun message pour ce cas (le seul message émis concerne le garde-fou de `series-field`, qui lui est bien dit). JSDoc de l'attribut relu au source (`packages/core/src/components/dsfr-data-a11y.ts`) : « Colonne(s) utilisée(s) pour les valeurs du tableau (séparées par des virgules) » — la grammaire à libellés n'y figure pas, ce qui confirme que c'est une absence assumée et non un bug de parsing.

**Le banc est sain** : `grep` sur les 70 pages, **zéro** `dsfr-data-a11y` ne porte la grammaire à deux-points. Le piège est donc documenté avant d'avoir été payé — pour une fois. — **2026-09-26, 0.33.0.** Navigateur, /viz/aides-de-minimis : première ligne du `dsfr-data-a11y` de #g-instrument = « instrument_aide | total | part ». Navigateur, /viz/barometre-france-num : en-têtes « Question | Profil | France | Écart (pt) », « Question | 2024 | 2025 | Variation (pt) », « Réponse | France | Profil | Écart (pt) », valeurs inchangées (923 Bretagne 28,25 / 37,03 / −8,78), zéro erreur console.

### Contournement actuel

Aucun côté page : on écrit les noms de colonnes nus et on accepte des en-têtes techniques, ou bien on renomme les colonnes en amont (`dsfr-data-normalize rename="v_fede:Fédération sélectionnée"`), ce qui déplace le libellé dans la donnée mais oblige alors le `dsfr-data-chart` à référencer le nouveau nom — et rend le libellé impossible à changer sans retoucher le pipeline.

### Demande

Accepter sur `dsfr-data-a11y` la grammaire `champ:Libellé` déjà en vigueur sur `dsfr-data-chart` (`label-field` et `value-field`), le libellé alimentant l'en-tête de colonne. À défaut, **avertir en console** quand une entrée contient un deux-points introuvable dans les données, comme le fait déjà le garde-fou de `series-field` — le silence actuel est la partie coûteuse : un tableau vide passe toutes les recettes qui comptent des lignes.

### Critères d'acceptation

- [ ] `dsfr-data-a11y` accepte `label-field="champ:Libellé"` et `value-field="champ:Libellé, champ2:Libellé 2"`, le libellé alimentant l'en-tête de colonne du tableau et l'en-tête du CSV téléchargé.
- [ ] Un champ écrit sans deux-points continue de rendre l'en-tête technique : la forme actuelle reste valide, sans changement de comportement pour les 15 balises du banc.
- [ ] À défaut de la grammaire : un avertissement console lorsqu'une entrée de `label-field` ou `value-field` ne correspond à aucune colonne des données reçues, sur le modèle du garde-fou de `series-field` — le silence sur un tableau vide est la partie coûteuse.
- [ ] Un test couvre le cas « grammaire du chart recopiée » et vérifie que le corps du tableau n'est pas vide.

---

## PG-034 — API Tabular : `__in` **ignore toute valeur contenant une parenthèse**, avec un HTTP 200 et zéro ligne — là où `__exact` accepte la même valeur

**Priorité** P2 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Déposer chez dsfr-data et signaler à data.gouv.fr
**Labels suggérés** : `enhancement, dx`, `severity:moyenne`, `dsfr-data-source`, `dsfr-data-query`
**Rencontré sur** 1 page(s) : demo/delinquance-sans-total

### Constat

`where="champ:in:a|b|c"` part chez Tabular en `champ__in=a,b,c`. Dès qu'une des valeurs contient une parenthèse, elle est **écartée sans un mot** : la réponse est un 200 avec les lignes des autres valeurs, ou zéro ligne s'il n'y en a pas d'autre. Le même `champ__exact=<valeur à parenthèses>` rend, lui, toutes les lignes attendues — ce n'est donc pas un problème d'encodage mais du parseur de liste.

Sur la base SSMSI, trois des dix-huit indicateurs portent une parenthèse (« Usage de stupéfiants (AFD) », « Usage de stupéfiants (hors AFD) ») : un `where="indicateur:in:…"` pour tracer les trois courbes du chapitre 1 aurait rendu un graphique **incomplet sans prévenir**. Les libellés parenthésés sont courants en open data français (millésimes, variantes, unités), ce qui rend le piège banal.

### Impact de l'erreur ou du manque

Un graphique ou un tableau amputé d'une partie de ses séries, sans erreur ni avertissement. Le cas est d'autant plus facile à payer que `__exact` sur la même valeur fonctionne : rien n'invite à se méfier de la forme liste.

### Objectif métier de la correction

Qu'une clause `in` déléguée à Tabular rende les mêmes lignes qu'un filtrage client, ou dise qu'elle ne le fait pas.

### Pérennité et reproductibilité du besoin

Durable tant que le parseur de liste de l'API Tabular n'est pas corrigé. Les libellés parenthésés sont fréquents dans les nomenclatures publiques.

### Comment ça a été vérifié

Relevé à l'API le 2026-09-21, six requêtes sur la ressource `2b27a675-e3bf-41ef-a852-5fb9ab483967` avec `annee__exact=2025` : `indicateur__exact=Usage de stupéfiants (AFD)` → **101** lignes ; `indicateur__in=Usage de stupéfiants (AFD)` → **0** ; `indicateur__in=Homicides,Usage de stupéfiants (AFD)` → **101** (seul « Homicides » retenu, au lieu de 202) ; contre-épreuves sans parenthèse : `indicateur__in=Homicides,Tentatives d'homicide` → 202, `indicateur__in=Usage de stupéfiants,Trafic de stupéfiants` → 202. Aucune erreur, aucun avertissement dans aucun des cas.

### Contournement actuel

Dériver une colonne par `dsfr-data-normalize compute="…"` et filtrer dessus : le `compute` change le schéma, donc la `dsfr-data-query` en aval cesse de déléguer et filtre côté client, où la parenthèse ne gêne pas. C'est ce que fait la page (colonne `serie`, puis `where="serie:isnotnull"`). Le contournement cesse de marcher dès que le jeu est trop gros pour être chargé entièrement — c'est-à-dire exactement quand la délégation serveur était nécessaire.

### Demande

Avertir en console quand une valeur de `in` / `notin` déléguée à Tabular contient une parenthèse, la clause étant alors silencieusement incomplète. Le correctif de fond appartient à `data.gouv.fr` ; la bibliothèque peut au moins refuser de déléguer la clause et la calculer côté client.

### Critères d'acceptation

- [ ] Un `where="champ:in:…"` dont une valeur contient une parenthèse rend les mêmes lignes que le même filtre appliqué côté client, ou émet un avertissement console nommant la valeur en cause.
- [ ] Aucun changement pour une liste dont aucune valeur ne contient de parenthèse.

---

## BUG-023 — L'agrégat `max` (et `min`) de `dsfr-data-query` lit une date ISO comme un nombre : `2026-09-25` devient 2026, là où le KPI rend 25/09/2026

**Priorité** P2 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Déposer chez dsfr-data
**Labels suggérés** : `bug`, `severity:moyenne`, `dsfr-data-query`, `dsfr-data-kpi`
**Rencontré sur** 1 page(s) : aides-de-minimis

### Constat

`aggregate="d:max:dmax"` sur une colonne de dates ISO rend **2026**, avec ou sans `group-by`. La même expression `d:max` sur `dsfr-data-kpi` rend **25/09/2026** : le KPI compare les dates en texte (#667, `computeExtremum`, branche ISO), la query passe par `toNumber` (`_computeAggregate`), qui garde l'année. Deux résultats pour la même expression, sans avertissement. Conséquence : impossible de porter une date de fraîcheur jusqu'aux lignes groupées d'un graphique, donc `databox-date-field` (livré pour AM-021) est inutilisable sur tout graphique alimenté par un `group-by`.

### Impact de l'erreur ou du manque

Une date devient une année sans un mot, et la même expression rend deux résultats selon le composant. La fraîcheur des données — l'information que `databox-date-field` était venue servir — ne peut pas atteindre un graphique groupé.

### Objectif métier de la correction

Que `d:max` veuille dire la même chose sur une query et sur un KPI.

### Pérennité et reproductibilité du besoin

Permanent : toute page qui date ses données par un `max` sur un jeu groupé.

### Comment ça a été vérifié

Page minimale le 2026-09-26, dsfr-data 0.33.0 du CDN. Source en ligne [{g:A,d:2026-09-01},{g:A,d:2026-09-25},{g:B,d:2026-08-10}] : `group-by="g" aggregate="d:max:dmax"` rend dmax=2026 pour A et pour B ; l'agrégat global rend 2026 ; `dsfr-data-kpi value="d:max" format="date"` rend 25/09/2026. Aucun message console hors #765. Source : `dsfr-data-query.ts` `_computeAggregate` (`toNumber` strict), `utils/aggregations.ts` `computeExtremum`. **Toujours présent sur origin/main (0.42.0)** le 2026-09-26 : `_computeAggregate` passe toujours par `toNumber`.

### Contournement actuel

KPI de fraîcheur hors du graphique (`dsfr-data-kpi value="date_octroi:max" format="date"`) ; pas de date par ligne groupée.

### Demande

Aligner `min`/`max` de `dsfr-data-query` sur `computeExtremum` : une colonne de dates ISO rend la date extrême (chaîne ISO), pas un nombre. À défaut, avertir en console quand `toNumber` tronque une valeur ISO.

### Critères d'acceptation

- [ ] `aggregate="d:max:dmax"` sur des dates ISO rend la date la plus récente, avec et sans `group-by`.
- [ ] Même résultat que `dsfr-data-kpi value="d:max"` sur les mêmes lignes.
- [ ] Les colonnes numériques gardent le comportement actuel.

---

## AM-089 — `series-field` de `dsfr-data-chart` comble les cellules (année, série) absentes par 0 : une série qui s'arrête est tracée à plat sur zéro

**Priorité** P2 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Déposer chez dsfr-data
**Labels suggérés** : `enhancement`, `severity:moyenne`, `dsfr-data-chart`
**Rencontré sur** 1 page(s) : impot-sur-le-revenu

### Constat

Le pivot long → large (`_processTidyData`) remplit par 0 toute cellule absente, contre la règle « donnée manquante ≠ zéro ». Sur `ir-declarations-2042-nat`, séparer les courbes d'un code réattribué par libellé (1BI) prolonge la série « pension capital PER dec2 » (2019-2020) à zéro jusqu'en 2024, et fait naître l'autre série à zéro en 2019-2020. Deux fins de série fabriquées, qui se lisent comme des effondrements. ⚠️ La demande suppose que DSFR Chart accepte `null` dans `y` — non vérifié : si ce n'est pas le cas, la moitié du correctif se remonte chez `GouvernementFR/dsfr-chart` (règle n° 4).

### Impact de l'erreur ou du manque

Une série qui commence ou s'arrête dans la fenêtre est dessinée comme une chute à zéro : un événement fabriqué, sans erreur ni avertissement. Tout jeu dont les séries n'ont pas les mêmes bornes est concerné (codes réattribués, nomenclatures qui changent).

### Objectif métier de la correction

Qu'une absence de donnée se voie comme une absence.

### Pérennité et reproductibilité du besoin

Structurel : le pivot est le chemin de tout graphique multi-séries en format long.

### Comment ça a été vérifié

2026-09-26, page minimale, 0.33.0 du CDN. Source générique `/records where nom="1BI"`, query `where annee:gte:2019`, chart `type="line" label-field="annee" value-field="nombre" series-field="libelle"` → attribut rendu `y='[[409,2321,0,0,0,0],[0,0,8618,15772,20436,25815]]'`, zéro erreur console. Source `dsfr-data-chart.ts` l. 650 (« Missing (label, series) cells are 0 ») et l. 674 (`new Array(labels.length).fill(0)`), identiques sur origin/main (0.42.0) le 2026-09-26.

### Contournement actuel

Ne pas séparer les séries par `series-field` quand elles ne couvrent pas les mêmes années ; la page trace la seule case choisie.

### Demande

Remplir par `null` (que Chart.js interrompt) au lieu de 0, ou un attribut `missing="gap|zero"`, `gap` par défaut.

### Critères d'acceptation

- [ ] Une cellule (label, série) absente rend `null` dans `y`, et la courbe s'interrompt.
- [ ] Un 0 présent dans les données reste 0.
- [ ] Si DSFR Chart refuse `null`, le constat est remonté chez `GouvernementFR/dsfr-chart` et le comportement documenté.

---

## BUG-029 — `dsfr-data-chart series-field` remplit de 0 les cellules sans observation : une série absente devient « 0 » dans l'infobulle et un segment nul

**Priorité** P2 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Déposer chez dsfr-data
**Labels suggérés** : `bug`, `severity:moyenne`, `dsfr-data-chart`
**Rencontré sur** 3 page(s) : edu/gar-ressources-numeriques, tourisme-et-handicap, edu/capytale-usages

### Constat

En format long (`series-field`), le graphique pivote lui-même les lignes en séries, et toute cellule (libellé, série) absente vaut 0. Sur GAR, l'infobulle de Nancy-Metz affiche « 12,7 accès par accédant / 0 accès par accédant ». Sur Tourisme & Handicap, « 0 établissements » pour la série absente d'une région, que la valeur calculée soit 0 ou `null`. **Règle 4 tranchée** : l'agent se demandait si c'était DSFR Chart ; c'est `dsfr-data`, le `bar-chart` reçoit déjà `y=[[12.7,11.6,10.9,0,0,…],[0,0,0,8.4,…]]`. Contraire à la règle #301 que `dsfr-data-pivot` applique (« une cellule sans observation vaut `null`, jamais 0 »). Même symptôme sur une courbe en format large (Capytale) : un mois sorti de la fenêtre glissante tracé à 0 — observé à la capture, cause non isolée.

### Impact de l'erreur ou du manque

L'infobulle affiche « 0 » pour une série qui n'existe pas à ce libellé ; en courbe, un trou devient une chute à zéro.

### Objectif métier de la correction

Même règle dans `series-field` que dans `dsfr-data-pivot` : une cellule sans observation vaut null.

### Pérennité et reproductibilité du besoin

Structurel : `series-field` est la voie documentée du format long.

### Comment ça a été vérifié

GAR, `#g-aca`, 0.42.0, 2026-09-26 : attribut `y` relevé au DOM sur `<bar-chart>`, infobulle au survol. Tourisme, `#g-reg`, survol d'Auvergne-Rhône-Alpes avec `else 0` puis `else null` : même rendu. **Lu au source à la consignation** : `dsfr-data-chart.ts` l. 649-675, `_processTidyData` — « Missing (label, series) cells are 0 », `new Array(labels.length).fill(0)`. Capytale : capture du 2026-09-26, septembre 2023 à 0.

### Contournement actuel

Pré-pivoter avec `dsfr-data-pivot` (cellules nulles) et passer en `value-fields` ; ou écarter la série incomplète.

### Demande

Remplir de `null` dans `_processTidyData`, comme `dsfr-data-pivot`.

### Critères d'acceptation

- [ ] `_processTidyData` remplit de null les cellules absentes.
- [ ] L'infobulle n'affiche pas de ligne pour une série absente (ou l'affiche vide).
- [ ] Un test aligne `series-field` sur `dsfr-data-pivot`.

---

## AM-087 — La fiche `apiProviders` annonce que Tabular exige un proxy CORS : l'API répond `access-control-allow-origin: *`, requêtes et préflight comprises

**Priorité** P2 · **Effort estimé** XS · **Décision proposée** Déposer chez dsfr-data
**Labels suggérés** : `enhancement`, `severity:basse`, `dsfr-data-source`
**Rencontré sur** 1 page(s) : demo/delinquance-sans-total

### Constat

La section « Proxy CORS » de la fiche `apiProviders` range Tabular parmi les APIs qui « ne supportent pas le CORS navigateur : il faut un proxy CORS », et la liste « APIs avec CORS natif » juste en dessous ne mentionne qu'Opendatasoft et INSEE Melodi. C'est inexact : `tabular-api.data.gouv.fr` sert `access-control-allow-origin: *` sur la requête comme sur la préflight `OPTIONS`.

L'écart coûte cher en pratique : une IA ou un intégrateur qui lit la fiche conclut qu'il faut déployer un proxy pour toucher les données de `data.gouv.fr` depuis une page statique — c'est-à-dire qu'il renonce à l'argument central de la bibliothèque (« une balise, un CDN, et ça marche ») sur le portail de données de l'État le plus fréquenté. La page de démonstration ne porte ni `proxy-url`, ni `use-proxy`, ni clé.

### Impact de l'erreur ou du manque

La fiche est ce que lit une IA avant d'écrire la première balise. Annoncer un proxy obligatoire sur `data.gouv.fr` décourage l'usage direct de la bibliothèque sur le principal portail de données publiques françaises, pour une contrainte qui n'existe pas.

### Objectif métier de la correction

Que la documentation dise ce que l'API fait.

### Pérennité et reproductibilité du besoin

Ponctuel — une correction de fiche.

### Comment ça a été vérifié

Vérifié le 2026-09-21 : `curl -D- -H 'Origin: https://open-data-viz.lab.miweb.run' 'https://tabular-api.data.gouv.fr/api/resources/2b27a675-e3bf-41ef-a852-5fb9ab483967/data/?page_size=1'` rend HTTP 200 avec `access-control-allow-origin: *`, `access-control-allow-methods: GET, OPTIONS`, `access-control-expose-headers: *` ; la préflight `OPTIONS` avec `Access-Control-Request-Method: GET` rend 204 avec les mêmes en-têtes. Confirmé au navigateur : les 13 requêtes Tabular de `/demo/delinquance-sans-total` aboutissent depuis `localhost:3000` sans proxy et sans erreur CORS en console.

### Contournement actuel

Aucun nécessaire : ne pas poser `proxy-url` sur une source Tabular. Le piège est purement documentaire.

### Demande

Corriger la fiche `apiProviders` : retirer Tabular de la phrase sur les APIs sans CORS, et l'ajouter à la liste « APIs avec CORS natif (pas de proxy nécessaire) » aux côtés d'Opendatasoft et d'INSEE Melodi. L'endpoint `/tabular-proxy` reste utile pour d'autres raisons (cache, quota) et peut être mentionné comme tel, pas comme une nécessité.

### Critères d'acceptation

- [ ] La fiche `apiProviders` liste `tabular-api.data.gouv.fr` parmi les APIs à CORS natif.
- [ ] Un exemple Tabular de la fiche ne porte pas `proxy-url`.

---

## AM-088 — `subtitle-field` du podium affiche le nombre brut : ni séparateur de milliers, ni format, ni suffixe

**Priorité** P3 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Déposer chez dsfr-data
**Labels suggérés** : `enhancement`, `severity:basse`, `dsfr-data-podium`
**Rencontré sur** 1 page(s) : aides-de-minimis

### Constat

Pour porter le nombre d'aides sous chaque barre du podium — ce qui rend lisible le paradoxe « qui déclare le plus n'est pas qui verse le plus » —, `subtitle-field="nb"` afficherait « 5164 ». Le podium lit le champ par `String(getByPath(record, subtitleField))` et n'offre aucun attribut de format.

### Impact de l'erreur ou du manque

Le sous-titre est l'endroit naturel du second classement d'un podium (le nombre derrière le montant). Sans format, il faut cinq assignations de `compute` pour écrire « 5 164 aides ».

### Objectif métier de la correction

Qu'un sous-titre de podium se formate comme une valeur de KPI.

### Pérennité et reproductibilité du besoin

Tout podium qui croise deux mesures.

### Comment ça a été vérifié

Source `packages/core/src/components/dsfr-data-podium.ts` l. 389-391 (`String()`, aucun format), identique sur origin/main (0.42.0) le 2026-09-26. Navigateur 2026-09-26, /viz/aides-de-minimis, 0.33.0 du CDN : avec le contournement, le podium rend « 5 164 aides », « 937 aides », « 1 aide ».

### Contournement actuel

Un `dsfr-data-normalize compute` de cinq assignations (milliers, reste, zéros de tête, espace fine insécable, singulier) produit « 5 164 aides ».

### Demande

Un `subtitle-format` (nombre, euro, pourcentage) avec suffixe, ou un `subtitle-template` qui accepte la grammaire de gabarit (`{{nb:number}} aides`).

### Critères d'acceptation

- [ ] `subtitle-format="number"` rend « 5 164 » ; un suffixe (`subtitle-unit` ou gabarit) rend « 5 164 aides ».
- [ ] Sans l'attribut, le rendu actuel est inchangé.

---

## AM-090 — `compute` n'a aucun échappement de la quote simple dans un littéral : `'J''en ai'` est impossible

**Priorité** P3 · **Effort estimé** XS · **Décision proposée** Déposer chez dsfr-data
**Labels suggérés** : `enhancement`, `severity:basse`, `dsfr-data-normalize`
**Rencontré sur** 1 page(s) : barometre-france-num

### Constat

Le tokenizer de `compute` (`packages/shared/src/utils/compute.ts`) termine un littéral texte à la première quote, sans accepter `''` ni `\'`. On ne peut donc pas écrire `when libelle = 'J''en ai'`, alors que les libellés à apostrophe ASCII sont courants dans les jeux publics. Le JSDoc ne mentionne pas la limite.

### Impact de l'erreur ou du manque

Toute comparaison à un libellé français contenant une apostrophe ASCII passe par un `contains` approximatif.

### Objectif métier de la correction

Comparer un libellé exactement, quelle que soit sa ponctuation.

### Pérennité et reproductibilité du besoin

Permanent : l'apostrophe est partout dans les nomenclatures françaises.

### Comment ça a été vérifié

Source `compute.ts` l. 330-340 (boucle jusqu'à `input[j] !== "'"`) relue le 2026-09-26, grammaire identique dans le bundle 0.33.0 du CDN et sur origin/main (0.42.0). Contournement appliqué sur /viz/barometre-france-num : 802-807 unifiées, 802 9,46 → 21,91 affichée au navigateur.

### Contournement actuel

`contains(champ, 'en ai')`, qui ne tient que si aucun autre libellé ne contient la sous-chaîne — à vérifier jeu par jeu.

### Demande

Accepter `''` dans un littéral, comme SQL et ODSQL ; à défaut, le dire dans le JSDoc de `compute`.

### Critères d'acceptation

- [ ] `when libelle = 'J''en ai' then 1 else 0` compare au libellé « J'en ai ».
- [ ] Les littéraux sans quote gardent leur comportement.
