# Demandes à déposer sur bmatge/dsfr-data — rapport de cadrage

> Fichier généré par `node scripts/build-retours.mjs` depuis `public/data/retours.json`.
> 27 demandes cadrées — 14 bugs,
> 9 améliorations,
> 4 pièges à désamorcer dans la bibliothèque plutôt que dans la documentation.
> Chaque bloc est rédigé pour être collé tel quel dans une issue.

## Comment lire ce rapport

Chaque demande naît d'une confrontation réelle au banc d'essai
[open-data-viz](https://github.com/bmatge/open-data-viz) et porte la trace de sa vérification.
Le banc couvre **trois portails Opendatasoft de l'État** reproduits, et deux portails de création :

- **data.economie.gouv.fr** — le catalogue de visualisations (lots 1 à 11) ;
- **data.education.gouv.fr** — le catalogue de data-visualisations (à partir du lot 12, fiches dans
  `docs/portail-education/`), y compris les cibles hébergées sur `equipements.sports.gouv.fr`,
  `dataeducation.opendatasoft.com` et la forge des communs numériques ;
- **data.sports.gouv.fr** — les portraits de territoire et de fédération (lot 19) ;
- **Culture** et **Développement durable** — pas de dataviz d'origine : des dataviz nouvelles, créées
  en récit sur les jeux de ces ministères.

Le portail Éducation n'a pas redemandé les fonctions du premier : il a fait apparaître des **asymétries**
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

63 critiques ont été **retirées** au fil du
banc d'essai parce qu'une vérification a montré une voie native ou une erreur de notre part (entrées
`faux-probleme` du registre), et 111
autres sont marquées **corrigées** parce que la bibliothèque les a résolues depuis (leur trace reste au
registre, avec ce qui en demeure vrai). Ce rapport ne liste que ce qui a résisté à la vérification.

Un rappel de méthode issu du lot 12, qui vaut avertissement : une capacité peut être **native, publiée,
et malgré tout absente du bundle chargé** par un site — les 26 pages de ce dépôt ont épinglé
`dsfr-data@0.20.0` pendant que npm servait déjà 0.23.0, puis 0.24.0. Avant de conclure à un manque,
il faut donc chercher l'attribut dans le source, **puis vérifier dans quelle version publiée il
apparaît**. Trois demandes de ce rapport sont nées de ce piège, et deux constats antérieurs
(AM-017, AM-039) en sont sortis.

Le dépôt charge aujourd'hui `dsfr-data@0.42.0`. Les montées successives ont comblé
111 des constats déposés,
passés au statut `corrige` et sortis de ce rapport. Chaque constat restant porte dans son champ
*Vérifié* la date et la version contre lesquelles il a été rejoué : c'est cette preuve, et non la
version du dépôt, qui établit qu'il tient encore.

## Priorisation

### P1 — immédiat : chiffres faux ou fonctions inutilisables, correction courte

| Id | Demande | Type | Effort | Pages | Décision |
|---|---|---|---|---|---|
| PG-033 | API Tabular : un tri serveur combiné à la pagination **perd des lignes en silence** — 177 distinctes sur 180 rendues, et une courbe qui plonge à zéro | piege | S | 1 | Déposer chez dsfr-data |
| BUG-026 | Une source groupée perd son `group_by` quand un `dsfr-data-normalize` s'intercale devant une `dsfr-data-query group-by` seule lectrice | bug | S | 1 | Déposer chez dsfr-data |
| BUG-028 | `dsfr-data-query` : `avg`, `sum`, `min` et `max` rendent 0 pour un groupe dont toutes les valeurs sont nulles, au lieu de null | bug | S | 3 | Déposer chez dsfr-data |
| PG-034 | API Tabular : `__in` **ignore toute valeur contenant une parenthèse**, avec un HTTP 200 et zéro ligne — là où `__exact` accepte la même valeur | piege | S | 1 | Déposer chez dsfr-data et signaler à data.gouv.fr |
| BUG-023 | L'agrégat `max` (et `min`) de `dsfr-data-query` lit une date ISO comme un nombre : `2026-09-25` devient 2026, là où le KPI rend 25/09/2026 | bug | S | 3 | Déposer chez dsfr-data |
| BUG-029 | `dsfr-data-chart series-field` remplit de 0 les cellules sans observation : une série absente devient « 0 » dans l'infobulle et un segment nul | bug | S | 8 | Déposer chez dsfr-data |
| BUG-031 | Une valeur de facette qui contient une virgule ne survit pas au rechargement de l'URL : `join(',')` à l'écriture, `split(',')` à la lecture | bug | S | 1 | Déposer chez dsfr-data |
| BUG-032 | `min` / `max` d'une query sur un mois « 2024-09 » rendent 2024 : le parseur numérique strict accepte un préfixe | bug | S | 2 | Déposer chez dsfr-data, avec BUG-023 (même racine) |
| PG-083 | Le résumé d'une carte (`map-summary`) ne porte que sur les lignes dessinées : les lignes hors découpage en sortent, et l'écran ne le dit pas | piege | S | 3 | Déposer chez dsfr-data |
| BUG-038 | `min` / `max` de `dsfr-data-query` sur plus de ~125 000 valeurs par groupe : `Math.min(...values)` dépasse la pile, et l'affichage garde l'ancien résultat | bug | XS | 1 | Déposer chez dsfr-data |
| BUG-037 | Un élément répété dans une cellule tableau compte deux fois dans une facette : « Patrimoine 3 » pour 2 lignes, et la sélection en rend 2 | bug | XS | 1 | Déposer chez dsfr-data |

_11 demandes — S 9, M 0, L 0._

### P2 — prochain cycle : gain net, effort mesuré

| Id | Demande | Type | Effort | Pages | Décision |
|---|---|---|---|---|---|
| BUG-027 | Un `where` de `dsfr-data-query` sur un alias d'agrégat est délégué au portail (HTTP 400), et l'échec de l'export fait passer les autres sources du même jeu en pagination | bug | S | 1 | Déposer chez dsfr-data |
| BUG-036 | Une query en aval de `normalize(rename) → query → normalize(valeurs)` est déléguée à la source sous les noms renommés : l'export Parquet est abandonné, l'API Tabular refuse, et toute la source tombe | bug | S | 1 | Déposer chez dsfr-data |
| PG-032 | `dsfr-data-a11y` n'accepte pas la grammaire `champ:Libellé` de son propre graphique : les en-têtes gardent le nom de colonne, et écrire le libellé **vide le tableau** sans un mot | piege | S | 4 | Déposer chez dsfr-data |
| AM-103 | `compute` n'a pas de sous-chaîne : ni SIREN depuis un SIRET, ni département depuis un code commune | amelioration | S | 9 | Déposer chez dsfr-data |
| BUG-033 | `color-map` sur `type="line"` recolore le trait et la légende, pas les points : quatrième surface de la famille BUG-016 / BUG-022 | bug | S | 4 | Déposer chez dsfr-data |
| BUG-035 | La vue tableau de la DataBox ne montre que `label-field` et `value-field` : les séries de `value-fields` en sont absentes, et les lignes sont coupées à 100 | bug | S | 1 | Déposer chez dsfr-data |
| AM-107 | `radius-field` fait croître le rayon, pas l'aire, et la plus petite valeur prend `radius-min` : pas de cercles proportionnels honnêtes, et `compute` n'a pas de racine carrée pour compenser | amelioration | S | 1 | Déposer chez dsfr-data |
| BUG-039 | La couche d'une `dsfr-data-map` ignore le retour en attente (`require-where`) : après retrait du dernier filtre, les marqueurs restent | bug | S | 2 | Déposer chez dsfr-data |
| BUG-034 | Un encart de carte clone la couche entière : chaque encart dessine tous les points, parfois en double, et garde les anciens après un filtre | bug | M | 2 | Déposer chez dsfr-data |
| AM-114 | `proxy-url` ne relaie pas un portail Opendatasoft, et le relais générique passe sa cible dans un en-tête : un site hôte ne peut pas mettre les données d'une dataviz dans son cache (CDN, cache de page) | amelioration | M | 2 | Déposer chez dsfr-data |
| AM-087 | La fiche `apiProviders` annonce que Tabular exige un proxy CORS : l'API répond `access-control-allow-origin: *`, requêtes et préflight comprises | amelioration | XS | 1 | Déposer chez dsfr-data |

_11 demandes — S 8, M 2, L 0._

### P3 — backlog : confort, cas moins fréquents

| Id | Demande | Type | Effort | Pages | Décision |
|---|---|---|---|---|---|
| AM-110 | `share_percent` n'a pas de partition : la part se calcule sur toutes les lignes de sortie, jamais par groupe — une part « parmi les répondants de l'année » coûte un second `group-by`, une jointure et un `compute` | amelioration | S | 1 | Déposer chez dsfr-data |
| AM-088 | Le podium ne formate ni sa valeur ni son sous-titre : la valeur est arrondie à l'unité (9,98 et 10,41 deviennent « 10 »), `subtitle-field` affiche le nombre brut | amelioration | S | 2 | Déposer chez dsfr-data |
| AM-102 | Préréglages d'encart : La Réunion (zoom 9) coupe le sud de l'île, et Wallis-et-Futuna (zoom 7) laisse ses deux îles hors cadre | amelioration | S | 3 | Déposer chez dsfr-data |
| AM-113 | Le repli « Autres valeurs » de la légende de carte est écrit en dur : `dsfr-data-map-layer` et `dsfr-data-map-legend` n'ont pas d'équivalent d'`empty-label` | amelioration | S | 2 | Déposer chez dsfr-data |
| AM-090 | `compute` n'a aucun échappement de la quote simple dans un littéral : `'J''en ai'` est impossible | amelioration | XS | 4 | Déposer chez dsfr-data |

_5 demandes — S 4, M 0, L 0._

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

**Revérifié pour le rapport #95 (2026-09-27)** : origin/main de dsfr-data 23b1b9a = v0.42.0 + 7 commits ; `git diff v0.42.0 origin/main -- packages/core` est vide, et la PR de version #1154 (0.42.1) ne porte que l'assistant (`packages/app-ui`, `packages/shared/src/ui`). **API rejouée par le tunnel** : `indicateur__exact=Homicides&annee__exact=2025&nombre__sort=desc&page_size=50`, trois pages → 101 lignes, 99 départements distincts (49 et 56 en double) — toujours vrai côté data.gouv.fr. Avec une seconde clé `__id__sort=asc` : même perte, et 34 inversions d'`__id` entre valeurs égales — **l'API n'applique qu'une clé de tri**, donc la clé de départage proposée dans la demande est impossible par la requête. À `page_size=200`, la taille de page de la bibliothèque depuis #1019 : 1 818 lignes (toutes les infractions de 2025, `nombre__sort=desc`) sur 10 pages → 1 818 distinctes, **non reproduit**. Les deux cas de la page (101 et 180 lignes) tiennent désormais en une page. Le risque reste structurel au-delà de 200 lignes. Source : `tabular-adapter.ts` `buildUrl` l. 1090-1093 et `fetchAll` l. 663-671 : le tri part au serveur sur un chargement paginé, sans départage. Le tri local sur groupes complets (`_fetchAllSortedLocally`, #1045) existe déjà et peut servir de correctif. Verdict ADR-120 : **absent du source** (vraie demande). Rapport : `docs/rapport-dsfr-data-2026-09-27.md`.

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

**Revérifié pour le rapport #95 (2026-09-27)** : origin/main de dsfr-data 23b1b9a = v0.42.0 + 7 commits ; `git diff v0.42.0 origin/main -- packages/core` est vide, et la PR de version #1154 (0.42.1) ne porte que l'assistant (`packages/app-ui`, `packages/shared/src/ui`). Source relu : `dsfr-data-query.ts` `_delegationTarget` l. 786-800 ne teste que `transformsSchema()`. Rien ne refuse une source qui porte déjà son `group-by`, alors que `_delegateOrderBy` refuse une source qui porte son `order-by` (`sourceEl.orderBy`). Antécédents : #855 (délégation à travers `normalize`, 2026-09-14) et #765. Non rejoué au navigateur. Verdict ADR-120 : **absent du source** (vraie demande). Rapport : `docs/rapport-dsfr-data-2026-09-27.md`.

### Contournement actuel

Donner un second lecteur au `normalize`. La query cesse alors de déléguer et calcule côté client.

### Demande

Ne pas déléguer `group-by` à travers un transformateur (`normalize`, `pivot`…) ; à défaut, ne jamais retirer le `group_by` que la source porte déjà.

### Critères d'acceptation

- [ ] La chaîne source groupée → `normalize replace-fields` → `query group-by` seule lectrice envoie `group_by=procedure` ou calcule côté client, et le KPI rend 966 672.
- [ ] La même chaîne sans `normalize` garde son comportement.
- [ ] Un test couvre la délégation à travers un transformateur.

---

## BUG-028 — `dsfr-data-query` : `avg`, `sum`, `min` et `max` rendent 0 pour un groupe dont toutes les valeurs sont nulles, au lieu de null

**Priorité** P1 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Déposer chez dsfr-data
**Labels suggérés** : `bug`, `severity:haute`, `dsfr-data-query`
**Rencontré sur** 3 page(s) : edu/dataviz-ips-lycees, edu/capytale-usages, developpement-durable/logements-neufs

### Constat

Un groupe sans aucune valeur numérique sort à 0 : « voie professionnelle 0,0 » pour les lycées à voie générale seule ; sur Capytale, l'AEFE, sans correspondance dans la jointure gauche, sort avec `eleves: 0`, reste en queue du classement et verse ses visites dans la moyenne nationale. Un 0 plausible là où il fallait un vide : exactement ce que la règle #301 interdit ailleurs (`pivot`, `compute`). Un groupe partiellement nul, lui, donne la bonne moyenne.

**Vague 1 de création (2026-09-26)** : `sum` aussi. Les mises en chantier 2025 de Sitadel valent `null` dans les 101 départements ; la somme nationale sortait à 0, soit « 0 logement commencé en 2025 ». La page compte les départements renseignés puis remet `null`. Cela tranche la question laissée ouverte (« `sum`, à trancher ») : un zéro fabriqué par `sum` se lit comme un effondrement.

### Impact de l'erreur ou du manque

Un 0 plausible entre dans un classement et dans une moyenne nationale (AEFE sur Capytale) ou s'affiche comme valeur (« voie professionnelle 0,0 »), sans avertissement.

### Objectif métier de la correction

Qu'un groupe sans valeur numérique rende null, conformément à #301.

### Pérennité et reproductibilité du besoin

Structurel : les jointures gauches et les champs optionnels produisent ces groupes à chaque page.

### Comment ça a été vérifié

Page minimale 0.42.0 (agent IPS lycées, 2026-09-26) : groupe `b` à `v: null, null` → `m: 0, s: 0, mi: 0` ; groupe mixte → moyenne 10, juste. Capytale : `aggregate="eleves:max"` → AEFE `eleves: 0`, relevé dans le pipeline le même jour. **Lu au source à la consignation** (`dsfr-data` main, `packages/core/src/components/dsfr-data-query.ts` l. 1851-1858) : `sum` réduit depuis 0, et `avg`, `min`, `max` rendent `0` quand `values.length === 0`.

/developpement-durable/logements-neufs, 0.42.0, 2026-09-26 (agent).

**Revérifié pour le rapport #95 (2026-09-27)** : origin/main de dsfr-data 23b1b9a = v0.42.0 + 7 commits ; `git diff v0.42.0 origin/main -- packages/core` est vide, et la PR de version #1154 (0.42.1) ne porte que l'assistant (`packages/app-ui`, `packages/shared/src/ui`). Source relu : `dsfr-data-query.ts` l. 1833-1849 : `sum` réduit depuis 0 ; `avg`, `min` et `max` rendent `0` quand `values.length === 0` ; type de retour `number`. Verdict ADR-120 : **absent du source** (vraie demande). Rapport : `docs/rapport-dsfr-data-2026-09-27.md`.

### Contournement actuel

Un `where="champ:isnotnull"` (ou `:gt:0`) sur chaque query concernée.

### Demande

Rendre `null` pour `avg`, `min`, `max` (et `sum`, à trancher) quand le groupe n'a aucune valeur numérique, comme `pivot` le fait pour une cellule sans observation.

### Critères d'acceptation

- [ ] `avg`, `min`, `max` d'un groupe entièrement nul rendent null.
- [ ] Un groupe partiellement nul garde sa moyenne sur les valeurs présentes.
- [ ] Le comportement de `sum` est tranché et documenté.

---

## PG-034 — API Tabular : `__in` **ignore toute valeur contenant une parenthèse**, avec un HTTP 200 et zéro ligne — là où `__exact` accepte la même valeur

**Priorité** P1 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Déposer chez dsfr-data et signaler à data.gouv.fr
**Labels suggérés** : `enhancement, dx`, `severity:moyenne`, `dsfr-data-source`, `dsfr-data-query`
**Rencontré sur** 1 page(s) : demo/delinquance-sans-total

### Constat

`where="champ:in:a|b|c"` part chez Tabular en `champ__in=a,b,c`. Dès qu'une des valeurs contient une parenthèse, elle est **écartée sans un mot** : la réponse est un 200 avec les lignes des autres valeurs, ou zéro ligne s'il n'y en a pas d'autre. Le même `champ__exact=<valeur à parenthèses>` rend, lui, toutes les lignes attendues — ce n'est donc pas un problème d'encodage mais du parseur de liste.

Sur la base SSMSI, trois des dix-huit indicateurs portent une parenthèse (« Usage de stupéfiants (AFD) », « Usage de stupéfiants (hors AFD) ») : un `where="indicateur:in:…"` pour tracer les trois courbes du chapitre 1 aurait rendu un graphique **incomplet sans prévenir**. Les libellés parenthésés sont courants en open data français (millésimes, variantes, unités), ce qui rend le piège banal.

### Impact de l'erreur ou du manque

Un graphique ou un tableau amputé d'une partie de ses séries, sans erreur ni avertissement. Le cas est d'autant plus facile à payer que `__exact` sur la même valeur fonctionne : rien n'invite à se méfier de la forme liste. — **Priorité revue le 2026-09-27 (rapport #95) : P2 → P1**, des séries disparaissent en silence (HTTP 200).

### Objectif métier de la correction

Qu'une clause `in` déléguée à Tabular rende les mêmes lignes qu'un filtrage client, ou dise qu'elle ne le fait pas.

### Pérennité et reproductibilité du besoin

Durable tant que le parseur de liste de l'API Tabular n'est pas corrigé. Les libellés parenthésés sont fréquents dans les nomenclatures publiques.

### Comment ça a été vérifié

Relevé à l'API le 2026-09-21, six requêtes sur la ressource `2b27a675-e3bf-41ef-a852-5fb9ab483967` avec `annee__exact=2025` : `indicateur__exact=Usage de stupéfiants (AFD)` → **101** lignes ; `indicateur__in=Usage de stupéfiants (AFD)` → **0** ; `indicateur__in=Homicides,Usage de stupéfiants (AFD)` → **101** (seul « Homicides » retenu, au lieu de 202) ; contre-épreuves sans parenthèse : `indicateur__in=Homicides,Tentatives d'homicide` → 202, `indicateur__in=Usage de stupéfiants,Trafic de stupéfiants` → 202. Aucune erreur, aucun avertissement dans aucun des cas.

**Revérifié pour le rapport #95 (2026-09-27)** : origin/main de dsfr-data 23b1b9a = v0.42.0 + 7 commits ; `git diff v0.42.0 origin/main -- packages/core` est vide, et la PR de version #1154 (0.42.1) ne porte que l'assistant (`packages/app-ui`, `packages/shared/src/ui`). **API rejouée par le tunnel**, `annee__exact=2025` : `indicateur__exact=Usage de stupéfiants (AFD)` → 101 ; `indicateur__in=` la même valeur → 0 ; `indicateur__in=Homicides,Usage de stupéfiants (AFD)` → 101 au lieu de 202. Toujours vrai côté data.gouv.fr. Source : `tabular-adapter.ts` `_applyColonFilters` l. 1193-1200 joint la liste par `,` sans garde ; `supportsServerWhere` (l. 1253) ne refuse que les clauses multi-champs, alors que le même fichier sait qu'une parenthèse casse le parseur de `or=(…)` (l. 1217-1240). Verdict ADR-120 : **absent du source** (vraie demande). Rapport : `docs/rapport-dsfr-data-2026-09-27.md`.

### Contournement actuel

Dériver une colonne par `dsfr-data-normalize compute="…"` et filtrer dessus : le `compute` change le schéma, donc la `dsfr-data-query` en aval cesse de déléguer et filtre côté client, où la parenthèse ne gêne pas. C'est ce que fait la page (colonne `serie`, puis `where="serie:isnotnull"`). Le contournement cesse de marcher dès que le jeu est trop gros pour être chargé entièrement — c'est-à-dire exactement quand la délégation serveur était nécessaire.

### Demande

Avertir en console quand une valeur de `in` / `notin` déléguée à Tabular contient une parenthèse, la clause étant alors silencieusement incomplète. Le correctif de fond appartient à `data.gouv.fr` ; la bibliothèque peut au moins refuser de déléguer la clause et la calculer côté client.

### Critères d'acceptation

- [ ] Un `where="champ:in:…"` dont une valeur contient une parenthèse rend les mêmes lignes que le même filtre appliqué côté client, ou émet un avertissement console nommant la valeur en cause.
- [ ] Aucun changement pour une liste dont aucune valeur ne contient de parenthèse.

---

## BUG-023 — L'agrégat `max` (et `min`) de `dsfr-data-query` lit une date ISO comme un nombre : `2026-09-25` devient 2026, là où le KPI rend 25/09/2026

**Priorité** P1 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Déposer chez dsfr-data
**Labels suggérés** : `bug`, `severity:moyenne`, `dsfr-data-query`, `dsfr-data-kpi`
**Rencontré sur** 3 page(s) : aides-de-minimis, edu/passe-ton-hack-dabord, culture/entrepreneurs-spectacles

### Constat

`aggregate="d:max:dmax"` sur une colonne de dates ISO rend **2026**, avec ou sans `group-by`. La même expression `d:max` sur `dsfr-data-kpi` rend **25/09/2026** : le KPI compare les dates en texte (#667, `computeExtremum`, branche ISO), la query passe par `toNumber` (`_computeAggregate`), qui garde l'année. Deux résultats pour la même expression, sans avertissement. Conséquence : impossible de porter une date de fraîcheur jusqu'aux lignes groupées d'un graphique, donc `databox-date-field` (livré pour AM-021) est inutilisable sur tout graphique alimenté par un `group-by`.

**Lot 6 et vague 2 (2026-09-26)** : deux pages de plus. Passe ton hack : `aggregate="cree_a:max"` rend 2026, alors que le KPI `cree_a:max format="date"` rend bien 20/09/2026. Entrepreneurs de spectacles : `aggregate="date_depot_dossier:min"` rend 2020, que le gabarit formate en « Depuis le 01/01/1970 » dans le chapô. La troncature ne se voit plus comme une année : elle devient une **date fausse**. Contournement : `order-by` ascendant et `limit="1"`.

### Impact de l'erreur ou du manque

Une date devient une année sans un mot, et la même expression rend deux résultats selon le composant. La fraîcheur des données — l'information que `databox-date-field` était venue servir — ne peut pas atteindre un graphique groupé. — **Priorité revue le 2026-09-27 (rapport #95) : P2 → P1**, une date devient une année, ou une date fausse (« Depuis le 01/01/1970 »), sans signal : chiffre faux.

### Objectif métier de la correction

Que `d:max` veuille dire la même chose sur une query et sur un KPI.

### Pérennité et reproductibilité du besoin

Permanent : toute page qui date ses données par un `max` sur un jeu groupé.

### Comment ça a été vérifié

Page minimale le 2026-09-26, dsfr-data 0.33.0 du CDN. Source en ligne [{g:A,d:2026-09-01},{g:A,d:2026-09-25},{g:B,d:2026-08-10}] : `group-by="g" aggregate="d:max:dmax"` rend dmax=2026 pour A et pour B ; l'agrégat global rend 2026 ; `dsfr-data-kpi value="d:max" format="date"` rend 25/09/2026. Aucun message console hors #765. Source : `dsfr-data-query.ts` `_computeAggregate` (`toNumber` strict), `utils/aggregations.ts` `computeExtremum`. **Toujours présent sur origin/main (0.42.0)** le 2026-09-26 : `_computeAggregate` passe toujours par `toNumber`.

Passe ton hack : query injectée au navigateur, `max=2026 min=2026`, 2026-09-26. Entrepreneurs : page minimale, 0.42.0 du CDN, query `min=2020 max=2026`, KPI `d:min` 23/04/2020 (agents). **Toujours présent sur origin/main le 2026-09-27** : `toNumber` (`packages/shared/src/utils/number-parser.ts`) se termine par `parseFloat(cleaned)`, qui lit « 2026-09-20 » comme 2026.

**Revérifié pour le rapport #95 (2026-09-27)** : origin/main de dsfr-data 23b1b9a = v0.42.0 + 7 commits ; `git diff v0.42.0 origin/main -- packages/core` est vide, et la PR de version #1154 (0.42.1) ne porte que l'assistant (`packages/app-ui`, `packages/shared/src/ui`). **Rejeu unitaire du source** (vite-node, origin/main) : `toNumber('2026-09-25', true)` = 2026 ; `dsfr-data-query.ts` `_computeAggregate` l. 1833-1849 passe toujours par `toNumber`, alors que `utils/aggregations.ts` `computeExtremum` (l. 600-616) a une branche ISO. Verdict ADR-120 : **absent du source** (vraie demande). Rapport : `docs/rapport-dsfr-data-2026-09-27.md`.

### Contournement actuel

KPI de fraîcheur hors du graphique (`dsfr-data-kpi value="date_octroi:max" format="date"`) ; pas de date par ligne groupée.

### Demande

Aligner `min`/`max` de `dsfr-data-query` sur `computeExtremum` : une colonne de dates ISO rend la date extrême (chaîne ISO), pas un nombre. À défaut, avertir en console quand `toNumber` tronque une valeur ISO.

### Critères d'acceptation

- [ ] `aggregate="d:max:dmax"` sur des dates ISO rend la date la plus récente, avec et sans `group-by`.
- [ ] Même résultat que `dsfr-data-kpi value="d:max"` sur les mêmes lignes.
- [ ] Les colonnes numériques gardent le comportement actuel.

---

## BUG-029 — `dsfr-data-chart series-field` remplit de 0 les cellules sans observation : une série absente devient « 0 » dans l'infobulle et un segment nul

**Priorité** P1 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Déposer chez dsfr-data
**Labels suggérés** : `bug`, `severity:moyenne`, `dsfr-data-chart`
**Rencontré sur** 8 page(s) : edu/gar-ressources-numeriques, tourisme-et-handicap, edu/capytale-usages, developpement-durable/logements-neufs, developpement-durable/qualite-air, developpement-durable/portrait-odd, culture/livre-trente-ans, impot-sur-le-revenu

### Constat

En format long (`series-field`), le graphique pivote lui-même les lignes en séries, et toute cellule (libellé, série) absente vaut 0. Sur GAR, l'infobulle de Nancy-Metz affiche « 12,7 accès par accédant / 0 accès par accédant ». Sur Tourisme & Handicap, « 0 établissements » pour la série absente d'une région, que la valeur calculée soit 0 ou `null`. **Règle 4 tranchée** : l'agent se demandait si c'était DSFR Chart ; c'est `dsfr-data`, le `bar-chart` reçoit déjà `y=[[12.7,11.6,10.9,0,0,…],[0,0,0,8.4,…]]`. Contraire à la règle #301 que `dsfr-data-pivot` applique (« une cellule sans observation vaut `null`, jamais 0 »). Même symptôme sur une courbe en format large (Capytale) : un mois sorti de la fenêtre glissante tracé à 0 — observé à la capture, cause non isolée.

**Vagues 1 et 2 de création (2026-09-26) : le contournement de ce constat était faux.** Le format large trace lui aussi une valeur absente à 0. Dans `_processData`, chaque valeur de `value-field` / `value-fields` passe par `toNumber` **non strict** (`dsfr-data-chart.ts` l. 728), qui rend 0 pour `null`. « Pré-pivoter avec `dsfr-data-pivot` et passer en `value-fields` » ne fait donc que déplacer le zéro : le pivot rend bien `null`, et le graphique le redessine à 0. Relevé trois fois : livre (Internet à 0 de 1993 à 2001, `y=[0,0,0,0,0,0,0,0,0,2,3,…]`), qualité de l'air (PM10 à 0 de 2000 à 2006, `y=[0,0,0,0,0,0,0,27.3,…]`), logements neufs (courbe « Logements commencés » à 0 en 2025). Et une fois de plus en format long : sur Portrait ODD, Paris, sans surface bio, reçoit une barre à 0. Même mécanisme sur les cartes (l. 833). ⚠️ AM-089 décrit le même défaut que ce constat (format long, `_processTidyData`, mêmes lignes de source) : les deux entrées sont à réunir.

**AM-089 réuni ici (2026-09-27)** : sur `ir-declarations-2042-nat`, séparer par `series-field` les deux libellés du code 1BI prolonge la série « pension capital PER dec2 » à zéro jusqu'en 2024, et fait naître l'autre à zéro en 2019-2020 (`y='[[409,2321,0,0,0,0],[0,0,8618,15772,20436,25815]]'`, 0.33.0, 2026-09-26). Ce sont deux fins de série fabriquées, qui se lisent comme des effondrements. AM-089 proposait aussi un attribut `missing="gap|zero"`, avec `gap` par défaut.

### Impact de l'erreur ou du manque

L'infobulle affiche « 0 » pour une série qui n'existe pas à ce libellé ; en courbe, un trou devient une chute à zéro. — **Priorité revue le 2026-09-27 (rapport #95) : P2 → P1**, une série absente est dessinée à 0 et annoncée « 0 » dans l'infobulle, sans signal : chiffre faux.

### Objectif métier de la correction

Même règle dans `series-field` que dans `dsfr-data-pivot` : une cellule sans observation vaut null.

### Pérennité et reproductibilité du besoin

Structurel : `series-field` est la voie documentée du format long.

### Comment ça a été vérifié

GAR, `#g-aca`, 0.42.0, 2026-09-26 : attribut `y` relevé au DOM sur `<bar-chart>`, infobulle au survol. Tourisme, `#g-reg`, survol d'Auvergne-Rhône-Alpes avec `else 0` puis `else null` : même rendu. **Lu au source à la consignation** : `dsfr-data-chart.ts` l. 649-675, `_processTidyData` — « Missing (label, series) cells are 0 », `new Array(labels.length).fill(0)`. Capytale : capture du 2026-09-26, septembre 2023 à 0.

Attributs `y` relevés au DOM par les agents, 0.42.0, 2026-09-26 (livre `g-internet` ; qualité de l'air ; Portrait ODD `y=[[0,90,83,43,…],[100,35,1,0,100,98,3]]`). **Lu au source à la consignation** (origin/main, 2026-09-27) : `dsfr-data-chart.ts` l. 728, `allSeries[i].push(toNumber(getByPath(record, allFields[i])))` sans `strict` ; `number-parser.ts` : `if (typeof val !== 'string') return strict ? null : 0`.

**Revérifié pour le rapport #95 (2026-09-27)** : origin/main de dsfr-data 23b1b9a = v0.42.0 + 7 commits ; `git diff v0.42.0 origin/main -- packages/core` est vide, et la PR de version #1154 (0.42.1) ne porte que l'assistant (`packages/app-ui`, `packages/shared/src/ui`). Source relu : `dsfr-data-chart.ts` l. 674 (`fill(0)`) et l. 728 (`toNumber` non strict). DSFR Chart 2.1.1 (`dist/LineChart/LineChart.js`) passe chaque ligne de `y` telle quelle à Chart.js (`data: e`), qui interrompt une courbe sur `null` : lecture du dist, **non rejouée au navigateur** ; le rendu de l'infobulle sur `null` n'est pas vérifié. Verdict ADR-120 : **absent du source** (vraie demande). Rapport : `docs/rapport-dsfr-data-2026-09-27.md`.

### Contournement actuel

**Corrigé le 2026-09-27.** L'ancien contournement (« pré-pivoter avec `dsfr-data-pivot` et passer en `value-fields` ») ne marche pas : le format large trace aussi `null` à 0. Voies qui marchent : des petits multiples où chaque graphique ne reçoit que les années de sa série (livre, qualité de l'air), deux graphiques d'une série à la même échelle (logements neufs), ou ne garder que les indicateurs publiés partout (Portrait ODD).

### Demande

Remplir de `null` dans `_processTidyData`, comme `dsfr-data-pivot`. Même règle pour le format large : `toNumber(…, true)` et `null` conservé dans `y` (l. 728), comme dans les valeurs de carte (l. 833). Variante proposée par AM-089 : un attribut `missing="gap|zero"`, `gap` par défaut.

### Critères d'acceptation

- [ ] `_processTidyData` remplit de null les cellules absentes.
- [ ] L'infobulle n'affiche pas de ligne pour une série absente (ou l'affiche vide).
- [ ] Un test aligne `series-field` sur `dsfr-data-pivot`.
- [ ] Une valeur `null` en format large (`value-field`, `value-fields`) rend `null` dans `y`.

---

## BUG-031 — Une valeur de facette qui contient une virgule ne survit pas au rechargement de l'URL : `join(',')` à l'écriture, `split(',')` à la lecture

**Priorité** P1 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Déposer chez dsfr-data
**Labels suggérés** : `bug`, `severity:moyenne`, `dsfr-data-facets`
**Rencontré sur** 1 page(s) : edu/carto-pix-fiche-etablissement

### Constat

La tranche « 1,5 à 2 parcours » s'écrit bien dans l'URL (`?intensite=1%2C5+%C3%A0+2+parcours`), mais au rechargement la facette la relit comme deux valeurs, « 1 » et « 5 à 2 parcours » : deux cases cochées, zéro établissement, aucune erreur. Une valeur sans virgule (« 2 à 3 parcours ») se recharge bien (1 081). Cause lue au source : `writeUrlSelections` assemble les valeurs par `[...values].join(',')`, `readUrlSelections` les relit par `paramValue.split(',')`, sans échappement. Même famille que LIM-011 (`color-map`) et BUG-011 (`group-by`) : la virgule sert de séparateur dans une grammaire dont les valeurs métier la contiennent. Toute valeur française décimale (« 1,5 ») ou énumérative y passe.

### Impact de l'erreur ou du manque

Un lien profond vers une modalité qui contient une virgule rend zéro ligne au rechargement, avec deux cases cochées que personne n'a choisies, sans erreur. Les modalités décimales françaises (« 1,5 à 2 ») et énumératives (« Lettres, langues ») y passent toutes.

### Objectif métier de la correction

Qu'une sélection de facette survive au rechargement de l'URL quelle que soit sa ponctuation.

### Pérennité et reproductibilité du besoin

Structurel : toute facette `url-sync` dont une valeur porte une virgule.

### Comment ça a été vérifié

Agent de recréation, /education/carto-pix-fiche-etablissement, navigateur, 0.42.0, 2026-09-26 : 0 établissement et deux cases cochées au rechargement, 1 081 pour une valeur sans virgule. **Relu à la consignation** : `packages/core/src/components/facets/facets-url.ts` sur origin/main (9755f63), `.split(',')` l. 47 et `params.set(paramName, [...values].join(','))` l. 93 ; `git diff v0.42.0 origin/main` vide sur ce fichier. **Verdict ADR-120 : absent du source** (non corrigé après 0.42.0) → demande à la bibliothèque. Aucune issue trouvée (`gh issue list` sur « virgule facette url »).

**Revérifié pour le rapport #95 (2026-09-27)** : origin/main de dsfr-data 23b1b9a = v0.42.0 + 7 commits ; `git diff v0.42.0 origin/main -- packages/core` est vide, et la PR de version #1154 (0.42.1) ne porte que l'assistant (`packages/app-ui`, `packages/shared/src/ui`). **Rejeu unitaire du source** (vite-node, origin/main) : `writeUrlSelections` avec « 1,5 à 2 parcours » écrit `?intensite=1%2C5+%C3%A0+2+parcours` ; `readUrlSelections` relit `["1", "5 à 2 parcours"]`. Verdict ADR-120 : **absent du source** (vraie demande). Rapport : `docs/rapport-dsfr-data-2026-09-27.md`.

### Contournement actuel

Écrire les modalités sans virgule en amont (« 1 et demi à 2 parcours ») par `replace-fields` ou `compute`.

### Demande

Répéter le paramètre (`?intensite=a&intensite=b`, que `readUrlSelections` sait déjà lire puisqu'il itère `params.entries()`) au lieu de joindre par virgule, ou échapper la virgule en `%2C` dans la valeur comme #676 l'a fait pour `replace`.

### Critères d'acceptation

- [ ] « 1,5 à 2 parcours » cochée, puis page rechargée : une seule case cochée, 1 081 établissements ou le compte attendu, pas zéro.
- [ ] Les URL déjà publiées sans virgule dans les valeurs se relisent comme avant.
- [ ] Un test aller-retour `writeUrlSelections` → `readUrlSelections` couvre une valeur à virgule.

---

## BUG-032 — `min` / `max` d'une query sur un mois « 2024-09 » rendent 2024 : le parseur numérique strict accepte un préfixe

**Priorité** P1 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Déposer chez dsfr-data, avec BUG-023 (même racine)
**Labels suggérés** : `bug`, `severity:moyenne`, `dsfr-data-query`
**Rencontré sur** 2 page(s) : edu/tne-dashboard, culture/architecture-contemporaine

### Constat

`aggregate="mois_concerne:min:debut, mois_concerne:max:fin"` sur le jeu de satisfaction TNE affichait « 2024 à 2025 » : les mois ont perdu leur partie mois, sans erreur. Cause lue au source : `_computeAggregate` passe chaque valeur par `toNumber(v, true)`, dont la dernière étape est `parseFloat(cleaned)` — or `parseFloat("2024-09")` vaut 2024 : le mode strict n'exclut que `NaN`, pas une chaîne dont seul le **préfixe** est numérique. Un `min`/`max` de dates ISO rend donc l'année, et n'importe quel code alphanumérique à préfixe chiffré (« 75A ») devient un nombre.

**Vague 3 de création (2026-09-27)** : Même parseur, autre porte : `numeric` de `dsfr-data-normalize` lit « 1922-1930 » comme 1922 et « 2008 : 2012 » comme 2008. Ici, c'est ce que la page voulait (la première année du chantier), et 1 794 édifices datés en page correspondent exactement à une émulation Python. Mais c'est silencieux. Le même comportement qui sert cette page transforme un mois « 2024-09 » en 2024 sur une autre (TNE).

### Impact de l'erreur ou du manque

Un mois « 2024-09 » devient 2024 et un code « 75A » devient 75, sans signal : le mode strict de `toNumber` accepte tout préfixe numérique. La période affichée (« 2024 à 2025 ») est fausse et plausible.

### Objectif métier de la correction

Qu'une valeur qui n'est pas entièrement un nombre ne soit jamais lue comme un nombre en mode strict.

### Pérennité et reproductibilité du besoin

Structurel : `toNumber` strict sert tous les agrégats de `dsfr-data-query`.

### Comment ça a été vérifié

Agent de recréation, /education/tne-dashboard, navigateur, 0.42.0, 2026-09-26 (« 2024 à 2025 »). **Relu à la consignation** (origin/main) : `dsfr-data-query.ts` l. 1834-1849 (`toNumber(getByPath(item, agg.field), true)` puis `Math.min`/`Math.max`) et `packages/shared/src/utils/number-parser.ts` (`const num = parseFloat(cleaned); return isNaN(num) ? … : num`). **Non rejoué sur une page minimale** : la chaîne de causes est lue, pas mesurée isolément.

Vague 3 (2026-09-27) : Agent, 2026-09-27 : émulation Python de `number-parser.ts` = 1 794 édifices datés, comme la page. Source relu sur origin/main (5b3bf7e) : `parseFloat(cleaned)`, inchangé depuis la consignation de BUG-032.

**Revérifié pour le rapport #95 (2026-09-27)** : origin/main de dsfr-data 23b1b9a = v0.42.0 + 7 commits ; `git diff v0.42.0 origin/main -- packages/core` est vide, et la PR de version #1154 (0.42.1) ne porte que l'assistant (`packages/app-ui`, `packages/shared/src/ui`). **Rejeu unitaire du source** (vite-node, origin/main) : `toNumber('2024-09', true)` = 2024, `toNumber('75A', true)` = 75, `toNumber('1922-1930', true)` = 1922, alors que `looksLikeNumber('2026-09-25')` = false. La chaîne de causes est donc mesurée au niveau de la fonction ; elle n'est toujours pas rejouée sur une page minimale. Même racine que BUG-023 : les deux se déposent ensemble. Verdict ADR-120 : **absent du source** (vraie demande). Rapport : `docs/rapport-dsfr-data-2026-09-27.md`.

### Contournement actuel

Libellé de période écrit en toutes lettres (la page), ou `compute` d'une clé numérique `year(d) * 100 + month(d)` avant le `min`/`max`.

### Demande

En mode strict, refuser une chaîne qui n'est pas entièrement numérique (comparer à `looksLikeNumber`), et offrir `min`/`max` lexicographiques sur les chaînes ISO.

### Critères d'acceptation

- [ ] `toNumber('2024-09', true)` et `toNumber('75A', true)` rendent `null`.
- [ ] `min` / `max` de `dsfr-data-query` sur des mois ou des dates ISO rendent la valeur extrême en chaîne, comme `computeExtremum` du KPI.
- [ ] `numeric` de `dsfr-data-normalize` garde un mode qui lit le préfixe (« 1922-1930 » → 1922), explicite et documenté, pour les pages qui s'en servent.

---

## PG-083 — Le résumé d'une carte (`map-summary`) ne porte que sur les lignes dessinées : les lignes hors découpage en sortent, et l'écran ne le dit pas

**Priorité** P1 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Déposer chez dsfr-data
**Labels suggérés** : `enhancement, dx`, `severity:moyenne`, `dsfr-data-chart`
**Rencontré sur** 3 page(s) : edu/educajou-ecolemap, edu/offre-formation-langues, edu/fei-chiffres-cles

### Constat

`map-summary="sum"` (comme `avg` et `weighted`) calcule le résumé sur les lignes que la carte **dessine**, pas sur les lignes qu'elle **reçoit**. Une ligne dont le code géographique sort du découpage (collectivités d'outre-mer 975 à 988 sur une carte départementale, entité hors académies, pays absent du fond) est écartée de la carte **et** du chiffre affiché sous le titre « …, en France ». Seul un `console.warn` compte les lignes ignorées, et il ne dit pas que le résumé les ignore aussi. Le total affiché est plausible et faux de la part écartée.

C'est le comportement documenté : le JSDoc de `map-summary` écrit « calculé sur les lignes dessinées » et « les lignes écartées faute de code géographique exploitable ne sont dans aucun résumé — le compte de ces lignes est déjà journalisé ». Mais un journal de console n'est pas un signal pour le lecteur. La même famille est déjà apparue deux fois au registre : la moyenne académique pondérée de l'allemand (81,13 % contre 80,2 %, PG-031, lot 3) et les sommes de la carte du monde d'ENIC (49 734 pour 50 477, AM-095, lot 5). La page d'origine (`educajou-ecolemap`, relecture du 2026-09-20 : 62 485 affichés pour 63 186, écart 701 = somme des cinq collectivités ignorées) a été recréée depuis avec `map-summary="none"`.

### Impact de l'erreur ou du manque

Un total national faux de la part hors découpage, affiché sous le titre de la carte, plausible et sans signal à l'écran. Trois pages du banc l'ont payé (éducation outre-mer, académies, carte du monde). — **Priorité revue le 2026-09-27 (rapport #95) : P2 → P1**, le total affiché sous la carte est faux de la part hors découpage, sans signal à l'écran.

### Objectif métier de la correction

Qu'un lecteur sache, sans ouvrir la console, que le chiffre sous la carte ne porte pas sur toutes les lignes reçues.

### Pérennité et reproductibilité du besoin

Structurel : tout jeu national qui inclut les collectivités d'outre-mer, ou tout jeu mondial, a des lignes que DSFR Chart ne dessine pas.

### Comment ça a été vérifié

**Rejoué le 2026-09-27 (issue #70)**, page minimale `scripts/rejeu-findings/pages/f70-map-summary.html`, `node scripts/rejeu-findings/run-70-71.mjs summary`, Playwright. Neuf lignes en données inline, total 201 : 75, 13, 2A, 971 (165 à elles quatre) plus 977, 978, 986, 987 et un code vide (36). **Bundle publié 0.42.0 (jsDelivr)** : KPI témoin « 201 » ; carte `type="map" map-summary="sum"` : `data` du `map-chart` = `{"13":50,"75":100,"971":5,"2A":10}`, attribut `value` = 165, texte rendu « Nombre, en France 165 » ; `getSkippedCount()` = 5 ; console : un seul avertissement, « 5 ligne(s) sur 9 ignorée(s) — code géographique absent, invalide ou hors référentiel dans "dep" pour map ». **`origin/main` de dsfr-data (23b1b9a, 0.42.0 + 7 commits sans changement dans `packages/core`), construit par `git archive` + `vite-node scripts/build-lib.ts` et substitué au bundle du CDN** : relevé identique. Source lu : `_processMapData` fait `continue` avant `_mapRows.push`, `_computeMapSummary` parcourt `_mapRows` (`packages/core/src/components/dsfr-data-chart.ts`, 0.42.0) ; `isValidDeptCode` n'accepte que 01-95, 2A, 2B et 971-976 (`packages/shared/src/utils/dept-codes.ts`).

**Revérifié pour le rapport #95 (2026-09-27)** : origin/main de dsfr-data 23b1b9a = v0.42.0 + 7 commits ; `git diff v0.42.0 origin/main -- packages/core` est vide, et la PR de version #1154 (0.42.1) ne porte que l'assistant (`packages/app-ui`, `packages/shared/src/ui`). Rejoué le même jour contre la 0.42.0 et origin/main (voir plus haut). Verdict ADR-120 : **absent du source** (vraie demande). Rapport : `docs/rapport-dsfr-data-2026-09-27.md`.

### Contournement actuel

Comparer le résumé à un KPI calculé sur les lignes reçues : l'écart est le signal. Quand les lignes hors découpage existent, soit `map-summary-value` (valeur nationale publiée), soit `map-summary="none"` et le total dans un KPI à côté de la carte, avec une phrase qui dit ce que la carte ne montre pas (c'est ce que fait `educajou-ecolemap` recréée). `map-summary-value` est un littéral : il ne suit plus les filtres.

### Demande

Rendre la part écartée visible là où le chiffre est lu : au minimum un avertissement qui dit que le RÉSUMÉ ignore N lignes (valeur écartée incluse en mode `sum`), idéalement une mention sous la carte (« hors 5 territoires non cartographiés ») ou un mode qui résume les lignes reçues. Le libellé « en France » appartient à DSFR Chart ; le calcul et le compte appartiennent à `dsfr-data`.

### Critères d'acceptation

- [ ] Sur la page minimale f70 (201 reçus, 165 dessinés), l'écran ou au moins l'avertissement console dit que le résumé porte sur 4 lignes sur 9 et en écarte 36.
- [ ] Le calcul par défaut ne change pas sans attribut (aucun chiffre déjà publié ne bouge).

---

## BUG-038 — `min` / `max` de `dsfr-data-query` sur plus de ~125 000 valeurs par groupe : `Math.min(...values)` dépasse la pile, et l'affichage garde l'ancien résultat

**Priorité** P1 · **Effort estimé** XS · **Décision proposée** Déposer chez dsfr-data
**Labels suggérés** : `bug`, `severity:moyenne`, `dsfr-data-query`
**Rencontré sur** 1 page(s) : culture/sibil-lieux

### Constat

`_computeAggregate` calcule `min` et `max` par `Math.min(...values)` et `Math.max(...values)`. L'étalement passe chaque valeur en argument, et V8 lève « RangeError: Maximum call stack size exceeded » entre 120 000 et 125 000 arguments. Sibil (204 628 lignes) : la date minimale sur tout le jeu plante la query, et le `dsfr-data-repeat` en aval continue d'afficher l'ancien résultat, sans message à l'écran. Le même motif est dans `utils/aggregations.ts` (min/max du KPI) et dans `dsfr-data-map-layer.ts` (bornes de la discrétisation). Le seuil dépend du moteur : ce n'est pas un plafond qu'une page peut connaître d'avance.

### Impact de l'erreur ou du manque

Un agrégat sur un grand jeu échoue et l'affichage garde un chiffre périmé, sans rien à l'écran. — **Priorité revue le 2026-09-27 (rapport #95) : P2 → P1**, l'affichage garde un résultat périmé sans message à l'écran.

### Objectif métier de la correction

Que `min` et `max` tiennent sur n'importe quel volume chargé.

### Pérennité et reproductibilité du besoin

Structurel : `fetch-mode="export"` rend courants les jeux de plus de 100 000 lignes.

### Comment ça a été vérifié

Agent, page minimale inline, 0.42.0, 2026-09-27 : 100 000 lignes passent, 200 000 lèvent la `RangeError`. **Rejoué à la consignation** : Node 24 (V8), `Math.min(...new Array(n).fill(1))` passe à 120 000, lève « Maximum call stack size exceeded » à 125 000. Source relu sur origin/main de dsfr-data (23b1b9a, 0.42.0 + 7 commits hors `packages/core`) : `dsfr-data-query.ts` l. 1846-1849, `packages/core/src/utils/aggregations.ts` l. 616, `dsfr-data-map-layer.ts` l. 1126-1127.

**Revérifié pour le rapport #95 (2026-09-27)** : origin/main de dsfr-data 23b1b9a = v0.42.0 + 7 commits ; `git diff v0.42.0 origin/main -- packages/core` est vide, et la PR de version #1154 (0.42.1) ne porte que l'assistant (`packages/app-ui`, `packages/shared/src/ui`). Rejeu Node 24 : `Math.min(...)` passe à 120 000 arguments, lève « Maximum call stack size exceeded » à 125 000. Étalements sur des tableaux de données relevés sur origin/main : `dsfr-data-query.ts` l. 1847-1849, `utils/aggregations.ts` l. 616, `dsfr-data-map-layer.ts` l. 1126-1127, `packages/shared/src/utils/pivot.ts` l. 189. Verdict ADR-120 : **absent du source** (vraie demande). Rapport : `docs/rapport-dsfr-data-2026-09-27.md`.

### Contournement actuel

Regrouper d'abord (par date), puis prendre le minimum des groupes.

### Demande

Remplacer l'étalement par une boucle (`reduce`) partout où un tableau de données est étalé en arguments.

### Critères d'acceptation

- [ ] `aggregate="x:min"` sur 500 000 lignes rend la bonne valeur.
- [ ] Plus aucun `Math.min(...` / `Math.max(...` sur un tableau de données dans `packages/core/src`.

---

## BUG-037 — Un élément répété dans une cellule tableau compte deux fois dans une facette : « Patrimoine 3 » pour 2 lignes, et la sélection en rend 2

**Priorité** P1 · **Effort estimé** XS · **Décision proposée** Déposer chez dsfr-data
**Labels suggérés** : `bug`, `severity:basse`, `dsfr-data-facets`, `dsfr-data-query`
**Rencontré sur** 1 page(s) : culture/lieux-culturels-ouverts

### Constat

Avec deux lignes `["Patrimoine","Patrimoine"]` et `["Patrimoine"]`, la facette affiche « Patrimoine 3 ». Cocher la valeur rend 2 lignes. Le compteur promet donc plus que la sélection ne donne. `facetValuesOf` renvoie chaque élément du tableau sans dédoublonner, et le comptage ajoute un poids par élément. `query explode` compte aussi 3, ce qui se défend pour un éclatement, mais fausse un « nombre de lieux par domaine ». La base des lieux a 2 851 lignes à tableaux collés (PG-073) : le doublon y est courant.

### Impact de l'erreur ou du manque

Compteur de facette supérieur au nombre de lignes que la sélection rend. — **Priorité revue le 2026-09-27 (rapport #95) : P3 → P1**, le compteur de la facette est faux en silence (effort XS).

### Objectif métier de la correction

Le compteur d’une valeur égale le nombre de lignes rendues par sa sélection.

### Pérennité et reproductibilité du besoin

Jeux à champs multivalués saisis à la main ou concaténés.

### Comment ça a été vérifié

Agent, page minimale injectée, 0.42.0, 2026-09-27 : « Patrimoine 3 » pour 2 lignes, `explode` 3. Source relu sur origin/main (5b3bf7e) : `packages/core/src/components/facets/facets-client.ts` l. 37-43 (`facetValuesOf`, sans `Set`) et l. 131-145 (`countFacetValues`, un poids par élément).

**Revérifié pour le rapport #95 (2026-09-27)** : origin/main de dsfr-data 23b1b9a = v0.42.0 + 7 commits ; `git diff v0.42.0 origin/main -- packages/core` est vide, et la PR de version #1154 (0.42.1) ne porte que l'assistant (`packages/app-ui`, `packages/shared/src/ui`). **Rejeu unitaire du source** (vite-node, origin/main) : `countFacetValues([{d:['Patrimoine','Patrimoine']},{d:['Patrimoine']}], 'd', '')` → `Patrimoine: 3`. Verdict ADR-120 : **absent du source** (vraie demande). Rapport : `docs/rapport-dsfr-data-2026-09-27.md`.

### Contournement actuel

Dédoublonner la cellule en amont (réécriture du texte avant `split`, PG-073).

### Demande

Dédoublonner les valeurs d'une cellule dans `facetValuesOf` : une ligne compte une fois par valeur distincte.

### Critères d'acceptation

- [ ] `["A","A"]` et `["A"]` → « A 2 ».

---

## BUG-027 — Un `where` de `dsfr-data-query` sur un alias d'agrégat est délégué au portail (HTTP 400), et l'échec de l'export fait passer les autres sources du même jeu en pagination

**Priorité** P2 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Déposer chez dsfr-data
**Labels suggérés** : `bug`, `severity:haute`, `dsfr-data-query`, `dsfr-data-source`
**Rencontré sur** 1 page(s) : edu/dataviz-ips-ecoles

### Constat

Une `dsfr-data-query where="n:gte:40"`, seule lectrice d'une source Opendatasoft groupée (`count(ips) as n`), ajoute `AND n >= 40` au `where` de l'export. Le portail répond 400 (« Aggregation functions are only available in a select or an order by clause »), la console annonce « l'export ne sera plus retenté », et une autre source sur le même jeu (`paire`), qui n'avait rien demandé d'illégal, part directement en pagination `/records` et finit elle aussi en 400. Même famille que BUG-025 (un `order-by` sur un alias client délégué, corrigé en 0.36.0) : le correctif a couvert `order-by`, pas `where`.

### Impact de l'erreur ou du manque

Une page entière tombe en 400 dès qu'on filtre un agrégat (« communes d'au moins 40 écoles »), et l'échec s'étend aux autres sources du même jeu. — **Priorité revue le 2026-09-27 (rapport #95) : P1 → P2**, le rejeu du 2026-09-27 montre une erreur affichée (« Erreur de chargement: HTTP 400 »), pas un chiffre faux, et l'extension à la source voisine n'est pas reproduite.

### Objectif métier de la correction

Qu'un filtre sur un alias d'agrégat reste côté client, comme le fait `order-by` depuis 0.36.0.

### Pérennité et reproductibilité du besoin

Structurel : filtrer un agrégat par un seuil d'effectif est le geste qu'impose toute moyenne honnête.

### Comment ça a été vérifié

Agent de recréation, /education/dataviz-ips-ecoles, dsfr-data 0.42.0, 2026-09-26 : requête d'export relevée au réseau avec `…AND n >= 40`, HTTP 400, message console « l'export ne sera plus retenté », source `paire` en `/records` puis 400. Seuil déplacé derrière un `dsfr-data-normalize` : les deux exports répondent 200 (835 ms et 2 757 ms). Non rejoué sur une page minimale.

— **Rejoué sur page minimale le 2026-09-27 (issue #71)** : `scripts/rejeu-findings/pages/f71-where-alias.html`, `run-70-71.mjs alias`, Playwright. Source Opendatasoft `donnees-ips-ecoles`, `select="code_departement, count(ips) as n" group-by="code_departement"`, `fetch-mode="export"` ; `dsfr-data-query where="n:gte:500"` seule lectrice ; une source voisine `s2` sur le même jeu. **Bundle publié 0.42.0** : export `…where=rentree_scolaire = '2024-2025' AND n >= 500…` → **HTTP 400**, avertissement « export JSON indisponible … l'export ne sera plus retenté », repli `/records` avec la même clause → 400, erreur `dsfr-data-source[s]`. **`origin/main` de dsfr-data (23b1b9a, 0.42.0 + 7 commits sans changement dans `packages/core`), construit par `git archive` + `vite-node scripts/build-lib.ts` et substitué au bundle du CDN** : relevé identique. **Confirmé en 0.42.0 et sur origin/main.** Deux précisions : (1) ce n'est pas silencieux à l'écran — le KPI branché sur la query affiche « Erreur de chargement: HTTP 400: » ; (2) **l'extension de l'échec à la source voisine n'est pas reproduite** sur la page minimale : `s2` part en export et répond 200 dans les deux ordres observés (avant et après l'échec de `s`) — la seconde moitié du constat reste attestée par la seule page `dataviz-ips-ecoles`. Contrôle à l'API du même jour : un `where` sur l'alias d'un champ de groupement (`dep = '075'`, alias posé dans `select` ou dans `group_by`) répond 200 — seul l'alias d'**agrégat** pose problème, ce qui situe la relecture du 2026-09-20 (« where délégué sur un alias de group-by ») dans ce constat.

**Revérifié pour le rapport #95 (2026-09-27)** : origin/main de dsfr-data 23b1b9a = v0.42.0 + 7 commits ; `git diff v0.42.0 origin/main -- packages/core` est vide, et la PR de version #1154 (0.42.1) ne porte que l'assistant (`packages/app-ui`, `packages/shared/src/ui`). Source relu : `dsfr-data-query.ts` `_delegateWhereOnly` l. 934-950 délègue sans regarder si le champ est un alias d'agrégat de la source. `opendatasoft-adapter.ts` l. 923-928 : tout 4xx hors 429 condamne l'export pour le **jeu** (`_exportUnavailable`, clé `_datasetKey`), y compris un 400 dû à une clause. Verdict ADR-120 : **absent du source** (vraie demande). Rapport : `docs/rapport-dsfr-data-2026-09-27.md`.

### Contournement actuel

Intercaler un `dsfr-data-normalize` (ou donner un second lecteur à la source) pour que le filtre reste côté client.

### Demande

Ne pas déléguer un `where` qui porte sur un alias d'agrégat ; et ne pas étendre à tout un jeu l'abandon de l'export décidé pour une requête invalide.

### Critères d'acceptation

- [ ] Une query seule lectrice `where="n:gte:40"` sur une source ODS groupée n'envoie pas `n >= 40` au portail et rend les lignes attendues.
- [ ] L'échec d'un export n'interdit pas l'export aux autres sources du même jeu.
- [ ] Un test couvre `where` sur alias, à côté de celui d'`order-by` (#1045).

---

## BUG-036 — Une query en aval de `normalize(rename) → query → normalize(valeurs)` est déléguée à la source sous les noms renommés : l'export Parquet est abandonné, l'API Tabular refuse, et toute la source tombe

**Priorité** P2 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Déposer chez dsfr-data
**Labels suggérés** : `bug`, `severity:haute`, `dsfr-data-normalize`, `dsfr-data-query`, `dsfr-data-source`
**Rencontré sur** 1 page(s) : culture/architecture-contemporaine

### Constat

Chaîne sur une source Tabular `fetch-mode="export"` : `normalize` qui renomme (`Date_de_Label:d`), `query where="d:isnotnull"` (ou `explode`), `normalize numeric="d"`, puis `query group-by="d" aggregate="ref:count:n"`. La dernière query est jugée délégable. La source abandonne l'export Parquet (« fetch-mode="export" ignoré… la clause est exécutée par l'API paginée ») et envoie `?d__groupby&ref__count`, sous des noms que l'API ne connaît pas. La réponse arrive sans CORS, et **toute la source** passe en « Failed to fetch » : sur la page, tous les blocs qui la lisent sont vides. **Cause, lue au source** : `transformsSchema()` du second normalize, qui ne touche que des valeurs, renvoie la réponse de sa source. Or cette source est une `dsfr-data-query`, qui n'implémente pas `transformsSchema`. La remontée s'arrête donc là, et le `rename` du premier normalize est oublié. Sans la query intermédiaire, ou sans le second normalize, rien n'est délégué. Même famille que BUG-026 et BUG-009 : la délégation dépend de la topologie de la chaîne.

### Impact de l'erreur ou du manque

Une chaîne légale fait tomber toute une source, donc tous les blocs qui la lisent. L'erreur visible (CORS) ne désigne pas la cause. — **Priorité revue le 2026-09-27 (rapport #95) : P1 → P2**, l'échec est visible (blocs vides, erreur CORS en console) : la cause est mal désignée, mais rien de faux n'est affiché.

### Objectif métier de la correction

Ne jamais déléguer une clause sous un nom créé par un `rename` en amont.

### Pérennité et reproductibilité du besoin

Structurel : `rename` puis filtre puis typage est une chaîne ordinaire.

### Comment ça a été vérifié

Rejoué à la consignation (2026-09-27), page minimale Playwright, bundle `dsfr-data@0.42.0` du CDN (`dsfr-data.core.esm.js`), ressource Tabular `80b6ac20-…` par le tunnel : variante `normalize(rename) → query(where) → normalize(numeric) → query(group-by)` → requête `/data/?page_size=200&page=1&d__groupby&ref__count`, erreur CORS, « dsfr-data-source[s]: Erreur de chargement TypeError: Failed to fetch » ; variante avec `explode` → `?ref__groupby&d__min`, même échec ; sans le second normalize → 1 809 lignes, aucune requête `tabular-api`. Scripts : `scratchpad/culture-architecture-contemporaine/repro.mjs`. Source relu sur origin/main (5b3bf7e, pas de commit de code depuis la 0.42.0) : `dsfr-data-normalize.ts` l. 316-326 ; `transformsSchema` n'existe que dans normalize, pivot et unpivot (`git grep`).

**Revérifié pour le rapport #95 (2026-09-27)** : origin/main de dsfr-data 23b1b9a = v0.42.0 + 7 commits ; `git diff v0.42.0 origin/main -- packages/core` est vide, et la PR de version #1154 (0.42.1) ne porte que l'assistant (`packages/app-ui`, `packages/shared/src/ui`). Source relu : `dsfr-data-normalize.ts` `transformsSchema` l. 316-326 ; `transformsSchema` n'existe que dans normalize, pivot et unpivot. `dsfr-data-query.ts` l. 798 la consulte sans l'implémenter. Verdict ADR-120 : **absent du source** (vraie demande). Rapport : `docs/rapport-dsfr-data-2026-09-27.md`.

### Contournement actuel

Un `rename` (même neutre) dans le second normalize : `transformsSchema()` rend alors `true` et coupe la délégation.

### Demande

`dsfr-data-query` (et tout transformateur) doit répondre à `transformsSchema()` en remontant sa propre source, ou la remontée doit traverser les éléments qui ne l'implémentent pas.

### Critères d'acceptation

- [ ] La chaîne rename → query → normalize(numeric) → query(group-by) calcule côté client, sans requête `tabular-api`.
- [ ] Test de non-régression pour les sources ODS et Tabular.

---

## PG-032 — `dsfr-data-a11y` n'accepte pas la grammaire `champ:Libellé` de son propre graphique : les en-têtes gardent le nom de colonne, et écrire le libellé **vide le tableau** sans un mot

**Priorité** P2 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Déposer chez dsfr-data
**Labels suggérés** : `enhancement, dx`, `severity:moyenne`, `dsfr-data-a11y`, `dsfr-data-chart`
**Rencontré sur** 4 page(s) : sports/portrait-federation, aides-de-minimis, barometre-france-num, developpement-durable/fret-ports

### Constat

Sur un graphique multi-séries, `dsfr-data-chart` nomme ses séries dans l'attribut lui-même : `value-field="v_fede:Fédération sélectionnée"`, `value-fields="v_gp:Son groupe de fédérations, v_all:Ensemble des fédérations"`. Le `dsfr-data-a11y` qui lui est apparié, **trois lignes plus bas dans le même bloc**, ne connaît pas cette grammaire : son `value-field` attend des noms de colonnes nus, séparés par des virgules. La conséquence n'est pas seulement cosmétique. Deux effets, dans cet ordre de gravité :

1. **En écrivant la grammaire du chart, le tableau se vide.** L'en-tête affiche littéralement la chaîne `dep_nom:Departement`, et **les cellules du corps sont vides** — la colonne est cherchée sous un nom qui n'existe pas. Aucune erreur console, aucun avertissement : le tableau équivalent est rendu, il a le bon nombre de lignes, et il ne contient rien.
2. **En écrivant la grammaire attendue, les en-têtes restent techniques.** Le graphique dit « Fédération sélectionnée », le tableau équivalent dit `v_fede`. Or le tableau équivalent est destiné aux lecteurs d'écran : c'est précisément là que le nom technique coûte le plus cher.

Le piège est d'autant plus facile à payer que les deux balises sont adjacentes et que l'une des deux accepte la forme. Il ne s'agit pas d'un attribut manquant mais d'une **asymétrie de grammaire entre deux composants appariés par conception** — le `for="g-base100"` de l'`a11y` déclare explicitement l'appariement.

**Relecture métier du 2026-09-26** — le piège payé sur deux pages, et la voie `rename` éprouvée.** Sur aides-de-minimis, le tableau équivalent du graphique des instruments porte en en-tête `instrument_aide | total | part`. Sur le Baromètre, un `dsfr-data-normalize rename` placé **après** le calcul donne des en-têtes lisibles — avec espaces et parenthèses (« Écart (pt) », « Variation (pt) »), que `compute` ne peut pas produire (identifiants `[A-Za-zÀ-ÿ0-9_]`). Le tableau et le CSV portent ces en-têtes, et graphiques et query en aval lisent les nouveaux noms (`order-by="Réponse:asc"` fonctionne). Le coût annoncé par le contournement se confirme : le libellé vit désormais dans le pipeline.

**Vague 2 de création (2026-09-26)** : contourné par `rename` sur fret-ports.

### Impact de l'erreur ou du manque

Un tableau équivalent **vide** — lignes présentes, cellules blanches — rendu sans aucun message console dès qu'on recopie la grammaire du graphique voisin. Le tableau équivalent est l'un des trois avantages nets que ce banc reconnaît à la bibliothèque face au portail d'origine : quand il est vide et qu'il le reste en silence, c'est l'argument qui tombe. Aucune recette comptant des lignes ne peut le voir. Secondairement, les en-têtes restent techniques (`v_fede`) là où le graphique dit « Fédération sélectionnée », et ce sont les lecteurs d'écran qui les reçoivent.

### Objectif métier de la correction

Aligner la grammaire de `dsfr-data-a11y` sur celle de `dsfr-data-chart`, avec lequel il est apparié par conception (`for="…"`), pour qu'un tableau équivalent porte les mêmes noms de séries que le graphique qu'il double.

### Pérennité et reproductibilité du besoin

Structurel. Tout graphique multi-séries de la bibliothèque appelle un `a11y` apparié, et l'asymétrie se présente à chaque fois, sur deux balises adjacentes. Le banc en porte 15 ; le risque grandit avec l'usage puisque la forme fautive est celle qu'on vient d'écrire une ligne plus haut.

### Comment ça a été vérifié

Relevé au navigateur le 2026-09-20 contre la 0.33.0 (`node scripts/rejeu-findings/run.mjs am082`, page `pages/am082.html`, cas 4). Deux `dsfr-data-a11y` sur la même source `q` : celui en grammaire nue rend les en-têtes `["dep_nom", "dep_nom__count"]` et un corps rempli ; celui en grammaire du chart (`label-field="dep_nom:Departement" value-field="dep_nom__count:Nombre d'equipements"`) rend les en-têtes `["dep_nom:Departement", "dep_nom__count:Nombre d'equipements"]` et une première ligne `["", ""]` — **cellules vides**. Console : aucun message pour ce cas (le seul message émis concerne le garde-fou de `series-field`, qui lui est bien dit). JSDoc de l'attribut relu au source (`packages/core/src/components/dsfr-data-a11y.ts`) : « Colonne(s) utilisée(s) pour les valeurs du tableau (séparées par des virgules) » — la grammaire à libellés n'y figure pas, ce qui confirme que c'est une absence assumée et non un bug de parsing.

**Le banc est sain** : `grep` sur les 70 pages, **zéro** `dsfr-data-a11y` ne porte la grammaire à deux-points. Le piège est donc documenté avant d'avoir été payé — pour une fois. — **2026-09-26, 0.33.0.** Navigateur, /viz/aides-de-minimis : première ligne du `dsfr-data-a11y` de #g-instrument = « instrument_aide | total | part ». Navigateur, /viz/barometre-france-num : en-têtes « Question | Profil | France | Écart (pt) », « Question | 2024 | 2025 | Variation (pt) », « Réponse | France | Profil | Écart (pt) », valeurs inchangées (923 Bretagne 28,25 / 37,03 / −8,78), zéro erreur console.

/developpement-durable/fret-ports, 2026-09-26 (agent).

**Revérifié pour le rapport #95 (2026-09-27)** : origin/main de dsfr-data 23b1b9a = v0.42.0 + 7 commits ; `git diff v0.42.0 origin/main -- packages/core` est vide, et la PR de version #1154 (0.42.1) ne porte que l'assistant (`packages/app-ui`, `packages/shared/src/ui`). Source relu : `dsfr-data-a11y.ts` l. 68-76, JSDoc de `value-field` « séparées par des virgules », aucun appel à `parseAliasedColumn` (que `dsfr-data-chart` utilise). Verdict ADR-120 : **absent du source** (vraie demande). Rapport : `docs/rapport-dsfr-data-2026-09-27.md`.

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

## AM-103 — `compute` n'a pas de sous-chaîne : ni SIREN depuis un SIRET, ni département depuis un code commune

**Priorité** P2 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Déposer chez dsfr-data
**Labels suggérés** : `enhancement`, `severity:moyenne`, `dsfr-data-normalize`
**Rencontré sur** 9 page(s) : culture/entrepreneurs-spectacles, culture/depenses-culturelles-collectivites, developpement-durable/reseaux-chaleur, developpement-durable/entrepots, culture/architecture-contemporaine, culture/imprimeurs-19e, demo/vacance-logements, culture/prefets-prefetes, culture/journees-patrimoine

### Constat

Entrepreneurs de spectacles : impossible de tirer le SIREN (les 9 premiers caractères) du SIRET. Le renouvellement des licences est donc mesuré au SIRET (45 %), alors qu'il vaut 58 % au SIREN : une entreprise qui change d'établissement n'est pas une nouvelle entreprise. Dépenses culturelles : impossible de filtrer les communes par département, faute de lire les deux premiers caractères du code INSEE. La liste blanche de `compute` compte `lower`, `upper`, `trim`, `len`, `concat`, `replace` et `contains`, mais ni `left` ni `substr`. Distinct d'AM-038 (`replace-fields` sans motif).

**Vague 3 de création (2026-09-27)** : Trois pages de plus. **Entrepôts** : lire la borne basse d'une tranche « ] 6 500 000 ; 6 600 000 ] m² » demande quatre `replace()` imbriqués puis `floor()`. Ce contournement tient tant que les bornes sont entières et séparées par un seul « ; ». Il cesse de marcher sur « 50 à 99 » ou « Moins de 171 » (règle 5 du lot 11). **Architecture contemporaine** : il n'y a pas non plus d'index de tableau. Tirer la première année d'une datation multivaluée coûte quatre étapes (`split`, `explode`, `numeric`, `min`) et une jointure, et la dénomination principale (le premier terme) reste hors d'atteinte. **Réseaux de chaleur** : le département ne se dérive pas du code commune. Une carte a été écartée pour cette raison, entre autres. La demande s'élargit : `left`, `substr`, et un accès au n-ième élément d'un tableau.

**Vague 4 de création (2026-09-27)** et **Démonstrations n° 4 et 5 (2026-09-27)** : deux pages de plus. Imprimeurs : impossible d'extraire l'année d'une date écrite « 4 décembre 1837 ». La page passe par une cascade de `contains(debut, '181')` … `'187'` (FP-059), qui ne marche que sur ce type de texte. Vacance des logements : la commune parente d'un arrondissement se calcule par des intervalles de codes (`code >= '75101' and code <= '75120'`), faute de `substr`.

**Vague 5 de création (2026-09-27)** : Deux pages de plus. **Préfets** : ni sous-chaîne ni minimum sur les éléments d'un tableau. Le premier poste listé est pris pour le plus ancien, ce qui est faux sur 3 lignes (dont 2 changent de décennie) ; et l'année se lit en détournant `year()` (PG-081). **Journées du patrimoine** : la colonne `Département` est inexploitable (126 graphies, 664 vides) et le département ne se tire pas des deux premiers caractères du code INSEE.

### Impact de l'erreur ou du manque

Un identifiant composite (SIRET, code commune) ne se ramène pas à son parent : 45 % au lieu de 58 %, sans avertissement possible.

### Objectif métier de la correction

Dériver un code parent d'un code enfant dans le pipeline.

### Pérennité et reproductibilité du besoin

Structurel : SIRET/SIREN et commune/département sont les deux hiérarchies de codes les plus courantes des jeux publics.

### Comment ça a été vérifié

Liste blanche relue à la consignation (origin/main, `packages/shared/src/utils/compute.ts`, objet `FUNCTIONS`, 2026-09-27). 45 % et 58 % : DuckDB, agent, 2026-09-26, non rejoués.

Vague 3 (2026-09-27) : Liste blanche relue sur origin/main (5b3bf7e, 2026-09-27), `packages/shared/src/utils/compute.ts`, objet `FUNCTIONS` : ni `left`, ni `substr`, ni index de tableau. Entrepôts : 88,2 M m² en somme des bornes basses, identiques au calcul Python sur l'export (agent). Architecture : agent, 2026-09-27.

Vague 4 : relu sur origin/main de dsfr-data (23b1b9a, 0.42.0 + 7 commits hors `packages/core`) : la table `FUNCTIONS` de `packages/shared/src/utils/compute.ts` n'a ni `substr`, ni `left`, ni `match` (abs, floor, ceil, round, lower, upper, trim, len, concat, replace, coalesce, is_null, is_empty, join, contains…). Intervalles relus dans `public/demo/vacance-logements.html` à la consignation.

Vague 5 (2026-09-27) : Agents, recalcul Python, 2026-09-27. Liste blanche relue à la consignation (`packages/shared/src/utils/compute.ts`, origin/main 23b1b9a, `FUNCTIONS` l. 167-257) : ni `substr`, ni `left`, ni `min` sur tableau.

**Revérifié pour le rapport #95 (2026-09-27)** : origin/main de dsfr-data 23b1b9a = v0.42.0 + 7 commits ; `git diff v0.42.0 origin/main -- packages/core` est vide, et la PR de version #1154 (0.42.1) ne porte que l'assistant (`packages/app-ui`, `packages/shared/src/ui`). **Rejeu unitaire du source** (vite-node, origin/main) : `left(s, 9)` et `substr(s, 1, 2)` → « fonction inconnue » ; `COMPUTE_FUNCTIONS` = year, month, day, round, abs, floor, ceil, lower, upper, trim, len, concat, replace, coalesce, is_null, is_empty, join, contains (18). Verdict ADR-120 : **absent du source** (vraie demande). Rapport : `docs/rapport-dsfr-data-2026-09-27.md`.

### Contournement actuel

Aucun dans la page ; mesurer à la maille disponible et le dire.

### Demande

`left(s, n)` et `substr(s, debut, n)` dans `compute`.

### Critères d'acceptation

- [ ] `left(siret, 9)` rend le SIREN.
- [ ] `substr(code_insee, 1, 2)` rend le département (hors DROM à trois caractères, à documenter).

---

## BUG-033 — `color-map` sur `type="line"` recolore le trait et la légende, pas les points : quatrième surface de la famille BUG-016 / BUG-022

**Priorité** P2 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Déposer chez dsfr-data
**Labels suggérés** : `bug`, `severity:moyenne`, `dsfr-data-chart`
**Rencontré sur** 4 page(s) : developpement-durable/qualite-air, culture/entrepreneurs-spectacles, culture/livre-trente-ans, culture/sibil-lieux

### Constat

Sur une courbe, `color-map` pose `borderColor` et `backgroundColor` du jeu de données, mais ni `pointBackgroundColor` ni `pointBorderColor` : les points gardent la palette par défaut. Qualité de l'air : trait gris, points violets. Entrepreneurs : courbe orange, points bleu clair. Livre : de 603 à 790 pixels par couleur demandée, contre 2 796 à 2 981 par couleur de la palette par défaut (`#5c68e5`, `#82b5f2`, `#29598f`, `#31a7ae`, `#81eef5`, `#b478f1`). Le défaut se produit avec et sans `databox`. **Règle 4 : c'est `dsfr-data`.** Le recoloriage est fait par `utils/color-map.ts` sur les jeux de données Chart.js, après le rendu de DSFR Chart, et c'est lui qui omet les propriétés des points.

**Vague 4 de création (2026-09-27)** : Sibil, sans `databox` : trois lignes recolorées, points restés à la palette par défaut. Cinquième page ; toujours `dsfr-data` (règle 4).

### Impact de l'erreur ou du manque

Sur une courbe à plusieurs séries, le point d'une série prend la couleur d'une autre : la même confusion que BUG-022, sur le graphique lui-même.

### Objectif métier de la correction

Qu'une série ait une seule couleur, trait et points compris.

### Pérennité et reproductibilité du besoin

Structurel : toute courbe multisérie avec `color-map`.

### Comment ça a été vérifié

Agents, 0.42.0, 2026-09-26 : capture (qualité de l'air), page minimale à deux séries avec et sans `databox` (entrepreneurs, `rejeu-colormap-points-ligne.png`), pixels du canvas comptés (livre). **Source relu à la consignation** (origin/main, `packages/core/src/utils/color-map.ts` l. 90-112) : seules `backgroundColor`, `borderColor`, `hoverBackgroundColor` et `hoverBorderColor` sont posées ; aucune occurrence de `pointBackgroundColor`.

Vague 4 : agent, page minimale à trois lignes inline sans `databox`, 0.42.0, capture `rejeu-colormap-courbe.png`. Relu sur origin/main de dsfr-data (23b1b9a, 0.42.0 + 7 commits hors `packages/core`) : `git grep pointBackgroundColor` dans `packages/core/src/utils/color-map.ts` ne trouve toujours rien.

**Revérifié pour le rapport #95 (2026-09-27)** : origin/main de dsfr-data 23b1b9a = v0.42.0 + 7 commits ; `git diff v0.42.0 origin/main -- packages/core` est vide, et la PR de version #1154 (0.42.1) ne porte que l'assistant (`packages/app-ui`, `packages/shared/src/ui`). `git grep pointBackgroundColor packages/core/src` ne rend rien. DSFR Chart 2.1.1 pose lui-même `pointBackgroundColor` et `pointBorderColor` (`dist/LineChart/LineChart.js`) : c'est la recoloration de `utils/color-map.ts`, faite après lui, qui ne les reprend pas. Règle 4 confirmée : `dsfr-data`. Verdict ADR-120 : **absent du source** (vraie demande). Rapport : `docs/rapport-dsfr-data-2026-09-27.md`.

### Contournement actuel

Retirer `color-map` des courbes (qualité de l'air) ou garder la palette par défaut.

### Demande

Poser aussi `pointBackgroundColor`, `pointBorderColor` (et leurs variantes `hover`) dans `applyColorMap` pour `type="line"`.

### Critères d'acceptation

- [ ] Sur `type="line"`, les points prennent la couleur de `color-map` de leur série.
- [ ] Un test compare les pixels des points à ceux du trait, comme `scripts/rejeu-findings/run.mjs tooltip`.

---

## BUG-035 — La vue tableau de la DataBox ne montre que `label-field` et `value-field` : les séries de `value-fields` en sont absentes, et les lignes sont coupées à 100

**Priorité** P2 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Déposer chez dsfr-data
**Labels suggérés** : `bug`, `severity:moyenne`, `dsfr-data-chart`
**Rencontré sur** 1 page(s) : developpement-durable/fret-ports

### Constat

Sur un graphique multisérie en format large avec `databox`, l'onglet tableau de la DataBox n'a que deux colonnes : « Port / Vracs liquides » sur 6 séries (fret), et 1 série sur 2 sur un second graphique. La DataBox propose donc un tableau qui ne contient pas ce que montre le graphique. Il est en outre tronqué à 100 lignes sans le dire (même plafond que LIM-012 pour `dsfr-data-a11y`).

### Impact de l'erreur ou du manque

Le tableau que la DataBox présente comme équivalent au graphique en omet les séries : un défaut d'accessibilité.

### Objectif métier de la correction

Que le tableau de la DataBox porte toutes les séries du graphique.

### Pérennité et reproductibilité du besoin

Structurel : tout graphique multisérie avec `databox`.

### Comment ça a été vérifié

Agent, 0.42.0, 2026-09-26 : tableaux `databox-g-compo-table-default` et `databox-g-cc-table-default` sur /developpement-durable/fret-ports. **Source relu à la consignation** (origin/main, `dsfr-data-chart.ts` l. 2035-2060, `_injectDataboxTable`) : colonnes = `labelField` et `parseAliasedColumn(this.valueField)` seulement ; `rows = this._data.slice(0, 100)`.

**Revérifié pour le rapport #95 (2026-09-27)** : origin/main de dsfr-data 23b1b9a = v0.42.0 + 7 commits ; `git diff v0.42.0 origin/main -- packages/core` est vide, et la PR de version #1154 (0.42.1) ne porte que l'assistant (`packages/app-ui`, `packages/shared/src/ui`). Source relu : `dsfr-data-chart.ts` `_injectDataboxTable` l. 2035-2060, inchangé. Verdict ADR-120 : **absent du source** (vraie demande). Rapport : `docs/rapport-dsfr-data-2026-09-27.md`.

### Contournement actuel

Un `dsfr-data-a11y table` à côté du graphique, qui porte toutes les séries.

### Demande

Prendre les colonnes de `_getAllValueFields()` (et les séries de `series-field` après pivot) dans le tableau de la DataBox, et signaler la troncature.

### Critères d'acceptation

- [ ] Avec `value-fields`, le tableau a une colonne par série, avec les libellés d'alias.
- [ ] La troncature à 100 lignes est dite, ou supprimée.

---

## AM-107 — `radius-field` fait croître le rayon, pas l'aire, et la plus petite valeur prend `radius-min` : pas de cercles proportionnels honnêtes, et `compute` n'a pas de racine carrée pour compenser

**Priorité** P2 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Déposer chez dsfr-data
**Labels suggérés** : `enhancement`, `severity:moyenne`, `dsfr-data-map-layer`, `dsfr-data-normalize`
**Rencontré sur** 1 page(s) : culture/musees-monuments

### Constat

Pour des symboles proportionnels, c'est l'aire du cercle qui doit être proportionnelle à la valeur. `radius-field` fait l'inverse : le rayon est une fonction affine de la valeur, entre `radius-min` et `radius-max`. Une valeur dix fois plus grande a donc un cercle jusqu'à cent fois plus grand. Et la plus petite valeur prend `radius-min` au lieu d'un rayon proche de 0, si bien que même les rapports de rayon sont faux. Côté page, `compute` n'a ni `sqrt` ni puissance, ce qui interdit de passer la racine de la valeur. La page des musées (fréquentation de 0 à 9 M d'entrées) garde un rayon fixe.

### Impact de l'erreur ou du manque

Une carte à symboles proportionnels surestime les grandes valeurs au carré : c'est l'erreur de lecture que la sémiologie graphique proscrit en premier.

### Objectif métier de la correction

Que l'aire d'un cercle soit proportionnelle à la valeur.

### Pérennité et reproductibilité du besoin

Structurel : toute carte de volumes (entrées, effectifs, montants) par point.

### Comment ça a été vérifié

Source relu sur origin/main (5b3bf7e) : `dsfr-data-map-layer.ts` l. 1119-1132, `rMin + ((val - min) / range) * (rMax - rMin)` ; liste blanche `FUNCTIONS` de `packages/shared/src/utils/compute.ts` sans `sqrt` ni `pow`. Verdict ADR-120 : absent du source. Page : agent, 2026-09-27.

**Revérifié pour le rapport #95 (2026-09-27)** : origin/main de dsfr-data 23b1b9a = v0.42.0 + 7 commits ; `git diff v0.42.0 origin/main -- packages/core` est vide, et la PR de version #1154 (0.42.1) ne porte que l'assistant (`packages/app-ui`, `packages/shared/src/ui`). Source relu : `dsfr-data-map-layer.ts` l. 1132 (`rMin + ((val - min) / range) * (rMax - rMin)`). Rejeu unitaire : `sqrt(v)` → « fonction inconnue ». Verdict ADR-120 : **absent du source** (vraie demande). Rapport : `docs/rapport-dsfr-data-2026-09-27.md`.

### Contournement actuel

Rayon fixe, ou classes de taille par `compute` (trois ou quatre paliers), légende écrite à la main.

### Demande

Une échelle en aire pour `radius-field` (`radius-scale="sqrt"`, et pourquoi pas par défaut), ancrée à 0 ; et `sqrt()` dans `compute`.

### Critères d'acceptation

- [ ] Avec `radius-scale="sqrt"`, une valeur quatre fois plus grande a un rayon deux fois plus grand.
- [ ] Une valeur nulle a un rayon nul (ou `radius-min` documenté comme plancher visuel, non comme origine).
- [ ] `sqrt(x)` dans `compute`, `null` pour un négatif.

---

## BUG-039 — La couche d'une `dsfr-data-map` ignore le retour en attente (`require-where`) : après retrait du dernier filtre, les marqueurs restent

**Priorité** P2 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Déposer chez dsfr-data
**Labels suggérés** : `bug`, `severity:moyenne`, `dsfr-data-map-layer`, `dsfr-data-map`
**Rencontré sur** 2 page(s) : prix-controle-technique, edu/educajou-ecolemap

### Constat

Quand une source ou une query en `require-where` repasse en attente (le dernier filtre est retiré), les afficheurs rendent leur message « choisissez un filtre » : c'est le rôle de `onSourceReset`, que `SourceSubscriberMixin` appelle sur l'événement `dsfr-data-idle` pour qu'« un graphique ne garde pas les lignes du filtre qu'on vient de retirer ». `dsfr-data-map-layer` ne surcharge pas `onSourceReset` : la couche garde les marqueurs du dernier filtre, sous une page dont le reste dit « aucun filtre ». La carte n'a pas non plus d'`idle-message`. Vu à la relecture du 2026-09-20 sur `prix-controle-technique` (les 30 derniers marqueurs restaient après retrait du filtre) ; `educajou-ecolemap` recréée porte le même montage (source `require-where` → couche), non rejoué sur la page.

### Impact de l'erreur ou du manque

Une carte qui montre des points que plus aucun filtre ne sélectionne, à côté d'une liste et d'un compteur qui disent « choisissez un filtre » : deux parties de la page se contredisent.

### Objectif métier de la correction

Que la carte suive l'état d'attente comme le display, la liste et le graphique.

### Pérennité et reproductibilité du besoin

Structurel : toute page d'exploration en `require-where` avec une carte (localisateur, annuaire).

### Comment ça a été vérifié

**Rejoué le 2026-09-27 (issue #71)**, page minimale `scripts/rejeu-findings/pages/f71-map-idle.html`, `run-70-71.mjs idle`, Playwright : trois points inline, `dsfr-data-query require-where`, un `dsfr-data-display` témoin et une couche `type="circle"` sur la query. **Bundle publié 0.42.0** : (1) chargement : display « Choisissez un filtre », 0 cercle ; (2) `where="t:eq:a"` posé : display « 2 resultats Paris Lyon », 2 cercles, annonce « Couches : 2 cercles » ; (3) `where` retiré : display revenu à « Choisissez un filtre », **2 cercles toujours dessinés**, annonce inchangée. Aucune erreur console. **`origin/main` de dsfr-data (23b1b9a, 0.42.0 + 7 commits sans changement dans `packages/core`), construit par `git archive` + `vite-node scripts/build-lib.ts` et substitué au bundle du CDN** : relevé identique. Source lu (0.42.0) : `dsfr-data-map-layer.ts` n'implémente que `onSourceData`, l'`onSourceReset` du mixin est un no-op.

**Revérifié pour le rapport #95 (2026-09-27)** : origin/main de dsfr-data 23b1b9a = v0.42.0 + 7 commits ; `git diff v0.42.0 origin/main -- packages/core` est vide, et la PR de version #1154 (0.42.1) ne porte que l'assistant (`packages/app-ui`, `packages/shared/src/ui`). Rejoué le même jour contre la 0.42.0 et origin/main (voir plus haut). `git grep onSourceReset` dans `dsfr-data-map-layer.ts` ne rend rien. Verdict ADR-120 : **absent du source** (vraie demande). Rapport : `docs/rapport-dsfr-data-2026-09-27.md`.

### Contournement actuel

Aucun vérifié depuis la page. Le texte d'accompagnement doit dire que la carte garde la dernière sélection.

### Demande

Implémenter `onSourceReset` sur `dsfr-data-map-layer` (vider la couche, les grappes et l'entrée de légende) et donner à `dsfr-data-map` un état d'attente (`idle-message`), comme les autres afficheurs depuis #690.

### Critères d'acceptation

- [ ] Sur la page minimale f71-map-idle, après retrait du `where`, la couche compte 0 cercle.
- [ ] La carte affiche un message d'attente configurable tant que la source est en attente.

---

## BUG-034 — Un encart de carte clone la couche entière : chaque encart dessine tous les points, parfois en double, et garde les anciens après un filtre

**Priorité** P2 · **Effort estimé** M (un à trois jours) · **Décision proposée** Déposer chez dsfr-data
**Labels suggérés** : `bug`, `severity:moyenne`, `dsfr-data-map-inset`, `dsfr-data-map-layer`
**Rencontré sur** 2 page(s) : culture/festivals, culture/bibliotheques

### Constat

`dsfr-data-map-inset` crée sa carte interne et y clone chaque couche par ses attributs (`cloneNode(false)`). La couche de l'encart recharge et redessine donc **tous** les points, pas seulement ceux de son emprise. Festivals : 7 250 cercles dans chacune des 6 cartes (la principale et 5 encarts). Avec 9 encarts, cela fait 10 cartes, et un clic de filtre met 2,4 s à rafraîchir la liste (de 0,7 à 1,4 s avec 5 encarts). Bibliothèques, sur une page minimale de 4 points : certains encarts dessinent 8 cercles au lieu de 4, puis 6 au lieu de 2 après un filtre. Sur la page, un clic de facette figeait l'affichage 7 s, contre 0,5 s sans encarts. Conséquence, dite en page : une fois les encarts retirés, un filtre sur un département d'outre-mer ne recentre pas la carte.

### Impact de l'erreur ou du manque

Coût multiplié par le nombre d'encarts à chaque filtre (jusqu'à 7 s de gel), et points doublés ou périmés dans les encarts.

### Objectif métier de la correction

Qu'un encart ne dessine que ses points, une fois, à jour.

### Pérennité et reproductibilité du besoin

Permanent : `insets="drom"` est le motif recommandé pour toute carte nationale.

### Comment ça a été vérifié

Agents, 0.42.0, 2026-09-26 : festivals, cercles comptés au DOM et chronométrage ; bibliothèques, page minimale (`scratchpad/culture-bibliotheques/min/`), 3 exécutions avec et sans facettes. **Source relu à la consignation** (origin/main, `packages/core/src/components/dsfr-data-map-inset.ts` l. 240-246) : boucle `for (const layer of layers)` → `layer.cloneNode(false)`, sans filtre d'emprise. Le doublement et la persistance après filtre n'ont pas été rejoués à la consignation.

**Revérifié pour le rapport #95 (2026-09-27)** : origin/main de dsfr-data 23b1b9a = v0.42.0 + 7 commits ; `git diff v0.42.0 origin/main -- packages/core` est vide, et la PR de version #1154 (0.42.1) ne porte que l'assistant (`packages/app-ui`, `packages/shared/src/ui`). Source relu : `dsfr-data-map-inset.ts` l. 242, `layer.cloneNode(false)` sans filtre d'emprise. Verdict ADR-120 : **absent du source** (vraie demande). Rapport : `docs/rapport-dsfr-data-2026-09-27.md`.

### Contournement actuel

Limiter les encarts aux territoires qui portent des points (festivals : de 9 à 5), ou les retirer (bibliothèques).

### Demande

Filtrer la couche clonée à l'emprise de l'encart, et remplacer (au lieu d'ajouter) ses entités à chaque nouvelle donnée.

### Critères d'acceptation

- [ ] Un encart ne contient que les entités de son emprise.
- [ ] Après un filtre, chaque encart a exactement les entités filtrées de son emprise.
- [ ] Le temps de refiltre ne croît pas avec le nombre d'encarts vides.

---

## AM-114 — `proxy-url` ne relaie pas un portail Opendatasoft, et le relais générique passe sa cible dans un en-tête : un site hôte ne peut pas mettre les données d'une dataviz dans son cache (CDN, cache de page)

**Priorité** P2 · **Effort estimé** M (un à trois jours) · **Décision proposée** Déposer chez dsfr-data
**Labels suggérés** : `enhancement`, `severity:moyenne`, `dsfr-data-source`
**Rencontré sur** 2 page(s) : demo/ips-college-territoire, demo/cuivre-qui-bascule

### Constat

Question posée par PG-084 : un site intégrateur qui a du cache (Drupal, Varnish, CDN) peut-il éviter que chaque visiteur aille rechercher la donnée au portail ? Il faut pour cela que la requête passe par son domaine, sous une URL qui identifie la donnée. Deux obstacles. (1) En mode adaptateur Opendatasoft, `proxy-url` (avec ou sans `use-proxy`) est sans effet : la réécriture ne connaît qu'une liste fixe d'hôtes (Tabular, Grist, Albert, INSEE) et rend l'URL d'un portail inchangée, sans avertissement. (2) En mode URL générique, `use-proxy` appelle toujours la même adresse (`<proxy>/cors-proxy`) et passe la cible dans l'en-tête `X-Target-URL` : deux jeux différents ont la même URL, un cache indexé par URL ne peut ni les distinguer ni les servir. Par ailleurs `cache-ttl` n'est lu qu'en repli sur échec de requête (hors ligne), jamais avant le réseau, et seulement si la page enregistre `window.DSFR_DATA_CACHE_PROVIDER`.

### Impact de l'erreur ou du manque

Sur un portail lent ou qui interdit le cache, chaque visiteur repaie l'export. Mesuré ici : 2 à 7 s par chargement sur six pages. Un intégrateur dont le site a déjà un cache ne peut pas s'en servir pour les données.

### Objectif métier de la correction

Qu'un site hôte puisse servir les données d'une dataviz depuis son propre cache, en posant un attribut sur la source.

### Pérennité et reproductibilité du besoin

Structurel : tout portail lent, limité par quota ou en `no-store`.

### Comment ça a été vérifié

**Rejoué le 2026-10-03**, page minimale `scripts/rejeu-findings/pages/proxy-relais.html`, `node scripts/rejeu-findings/run-proxy.mjs`, Playwright, **bundle publié 0.42.0** du CDN. Source A (`api-type="opendatasoft"` + `proxy-url="/relais"`) et source B (la même + `use-proxy`) : requêtes émises vers `https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/fermeture-reseau-cuivre/records?…`, aucune vers `/relais`. Sources C et D (mode `url=` + `use-proxy proxy-url="/relais"`, deux portails différents) : deux requêtes vers la **même** URL `http://rejeu.test/relais/cors-proxy`, distinguées seulement par `x-target-url`. **Lecture du source** (`packages/shared/src/api/proxy.ts`, `rewriteKnownHost` et `buildProxiedRequest` ; `packages/core/src/components/dsfr-data-source.ts`, `_getCache` appelé dans les seules branches d'erreur) sur le dépôt local au commit d3c3d88f, **en retard de 3 commits sur `origin/main`** : `origin/main` n'a pas été construit ni rejoué.

### Contournement actuel

Sans toucher la bibliothèque : pointer la source sur une URL du site hôte (`url="/relais/…"` ou fichier figé, PG-084), donc en mode générique, sans `where` ni `group-by` délégués. Cesse de convenir dès que la page filtre ou agrège au portail.

### Demande

Un mode de relais cachable : la cible portée par l'URL (chemin et paramètres, par exemple `<relais>/<hôte>/<chemin>?<requête>`), applicable à tout hôte y compris les portails Opendatasoft, en restant en mode adaptateur ; des URL déterministes (même requête, même URL) ; la clé d'API laissée au relais plutôt qu'en `Authorization` navigateur, qu'un CDN ne cache pas. Avec un contrat documenté et un relais de référence (Node sans dépendance, nginx, module Drupal) borné par une liste blanche d'hôtes. À défaut, un avertissement quand `proxy-url` est posé sur un hôte qu'il ne relaie pas.

### Critères d'acceptation

- [ ] Sur la page minimale `proxy-relais.html`, la source A émet sa requête vers le relais, et deux cibles différentes produisent deux URL différentes.
- [ ] Une même requête rejouée produit la même URL au caractère près.
- [ ] Sans relais configuré, le comportement actuel ne change pas.

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

**Revérifié pour le rapport #95 (2026-09-27)** : origin/main de dsfr-data 23b1b9a = v0.42.0 + 7 commits ; `git diff v0.42.0 origin/main -- packages/core` est vide, et la PR de version #1154 (0.42.1) ne porte que l'assistant (`packages/app-ui`, `packages/shared/src/ui`). `curl` rejoué par le tunnel : HTTP 200, `access-control-allow-origin: *`. La fiche est inchangée : `skills/dsfr-data/references/api-providers.md` l. 152 et 172, `packages/shared/src/skills/skills.ts` l. 3038 et 3058. Verdict ADR-120 : **absent du source** (vraie demande). Rapport : `docs/rapport-dsfr-data-2026-09-27.md`.

### Contournement actuel

Aucun nécessaire : ne pas poser `proxy-url` sur une source Tabular. Le piège est purement documentaire.

### Demande

Corriger la fiche `apiProviders` : retirer Tabular de la phrase sur les APIs sans CORS, et l'ajouter à la liste « APIs avec CORS natif (pas de proxy nécessaire) » aux côtés d'Opendatasoft et d'INSEE Melodi. L'endpoint `/tabular-proxy` reste utile pour d'autres raisons (cache, quota) et peut être mentionné comme tel, pas comme une nécessité.

### Critères d'acceptation

- [ ] La fiche `apiProviders` liste `tabular-api.data.gouv.fr` parmi les APIs à CORS natif.
- [ ] Un exemple Tabular de la fiche ne porte pas `proxy-url`.

---

## AM-110 — `share_percent` n'a pas de partition : la part se calcule sur toutes les lignes de sortie, jamais par groupe — une part « parmi les répondants de l'année » coûte un second `group-by`, une jointure et un `compute`

**Priorité** P3 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Déposer chez dsfr-data
**Labels suggérés** : `enhancement`, `severity:moyenne`, `dsfr-data-query`
**Rencontré sur** 1 page(s) : culture/usagers-archives

### Constat

Usagers des archives compare deux enquêtes (2014 et 2021) : la part de chaque réponse parmi les répondants d'une question, une année donnée. `share_percent` rapporte chaque ligne au total de **toutes** les lignes de sortie. Avec `group-by="annee, question, reponse"`, la part d'une réponse est donc divisée par la somme des deux années et de toutes les questions. Il a fallu un second `group-by="question, annee"`, un `join on="question,annee"` et un `compute n / tot * 100`. Le motif « part au sein d'un groupe » est le cas courant des enquêtes et des séries par catégorie.

### Impact de l'erreur ou du manque

Toute répartition par catégorie à plusieurs groupes (année, région) coûte trois balises de plus.

### Objectif métier de la correction

Qu'une part au sein d'un groupe s'écrive dans la query qui compte.

### Pérennité et reproductibilité du besoin

Structurel : enquêtes, séries par catégorie, compositions par territoire.

### Comment ça a été vérifié

Agent, navigateur, 0.42.0, 2026-09-27 : parts identiques au recalcul pandas avec le contournement. **Relu à la consignation** sur origin/main de dsfr-data (23b1b9a, 0.42.0 + 7 commits hors `packages/core`) : `dsfr-data-query.ts` l. 1807-1821 (`_applyShareAggregate` : `total` = somme de la colonne sur toutes les lignes `data`), JSDoc l. 347-375 (« divisée par la somme de cette colonne sur toutes les lignes de sortie ») ; aucune option de partition.

**Revérifié pour le rapport #95 (2026-09-27)** : origin/main de dsfr-data 23b1b9a = v0.42.0 + 7 commits ; `git diff v0.42.0 origin/main -- packages/core` est vide, et la PR de version #1154 (0.42.1) ne porte que l'assistant (`packages/app-ui`, `packages/shared/src/ui`). Source relu : `dsfr-data-query.ts` `_applyShareAggregate` l. 1807-1821, total sur toutes les lignes, sans partition. Verdict ADR-120 : **absent du source** (vraie demande). Rapport : `docs/rapport-dsfr-data-2026-09-27.md`.

### Contournement actuel

Second `group-by` sur la partition, `dsfr-data-join` sur ses clés, puis `compute` du ratio.

### Demande

Une partition pour `share` / `share_percent` (par exemple `share-by="annee, question"`).

### Critères d'acceptation

- [ ] Avec une partition `annee`, les parts de chaque année somment à 100.
- [ ] Sans l'attribut, le comportement actuel est inchangé.

---

## AM-088 — Le podium ne formate ni sa valeur ni son sous-titre : la valeur est arrondie à l'unité (9,98 et 10,41 deviennent « 10 »), `subtitle-field` affiche le nombre brut

**Priorité** P3 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Déposer chez dsfr-data
**Labels suggérés** : `enhancement`, `severity:basse`, `dsfr-data-podium`
**Rencontré sur** 2 page(s) : aides-de-minimis, demo/diabete-age-egal

### Constat

Pour porter le nombre d'aides sous chaque barre du podium — ce qui rend lisible le paradoxe « qui déclare le plus n'est pas qui verse le plus » —, `subtitle-field="nb"` afficherait « 5164 ». Le podium lit le champ par `String(getByPath(record, subtitleField))` et n'offre aucun attribut de format.

**Démonstrations n° 4 et 5 (2026-09-27)** : **la valeur du podium elle-même est arrondie à l'unité, sans attribut de décimales.** Diabète à âge égal : la Nièvre (9,98 %) et la Seine-Saint-Denis (10,41 %) affichaient toutes deux « 10 % ». Un classement de taux proches devient illisible. Le constat couvre donc les deux textes du podium : le sous-titre brut, et la valeur arrondie.

### Impact de l'erreur ou du manque

Le sous-titre est l'endroit naturel du second classement d'un podium (le nombre derrière le montant). Sans format, il faut cinq assignations de `compute` pour écrire « 5 164 aides ».

### Objectif métier de la correction

Qu'un sous-titre de podium se formate comme une valeur de KPI.

### Pérennité et reproductibilité du besoin

Tout podium qui croise deux mesures.

### Comment ça a été vérifié

Source `packages/core/src/components/dsfr-data-podium.ts` l. 389-391 (`String()`, aucun format), identique sur origin/main (0.42.0) le 2026-09-26. Navigateur 2026-09-26, /viz/aides-de-minimis, 0.33.0 du CDN : avec le contournement, le podium rend « 5 164 aides », « 937 aides », « 1 aide ».

Démonstrations : agent, navigateur, 0.42.0, 2026-09-27. **Relu à la consignation** sur origin/main de dsfr-data (23b1b9a, 0.42.0 + 7 commits hors `packages/core`) : `dsfr-data-podium.ts` l. 436-438, `_formatValue` appelle `formatNumber(value)` sans décimales ; `packages/shared/src/utils/formatters.ts` l. 140-145, sans `decimals` → `Math.round(value)`. Aucune `@property` de décimales ni de format parmi celles du podium.

**Revérifié pour le rapport #95 (2026-09-27)** : origin/main de dsfr-data 23b1b9a = v0.42.0 + 7 commits ; `git diff v0.42.0 origin/main -- packages/core` est vide, et la PR de version #1154 (0.42.1) ne porte que l'assistant (`packages/app-ui`, `packages/shared/src/ui`). Source relu : `dsfr-data-podium.ts` l. 389-391 (`String()`) et l. 437 (`formatNumber(value)` sans décimales) ; aucune propriété de format ni de décimales parmi les `@property` du podium. Verdict ADR-120 : **absent du source** (vraie demande). Rapport : `docs/rapport-dsfr-data-2026-09-27.md`.

### Contournement actuel

Un `dsfr-data-normalize compute` de cinq assignations (milliers, reste, zéros de tête, espace fine insécable, singulier) produit « 5 164 aides ».

### Demande

Un `subtitle-format` (nombre, euro, pourcentage) avec suffixe, ou un `subtitle-template` qui accepte la grammaire de gabarit (`{{nb:number}} aides`). Et un attribut `decimals` (ou `format`) pour la valeur, comme sur `dsfr-data-kpi`.

### Critères d'acceptation

- [ ] `subtitle-format="number"` rend « 5 164 » ; un suffixe (`subtitle-unit` ou gabarit) rend « 5 164 aides ».
- [ ] Sans l'attribut, le rendu actuel est inchangé.

---

## AM-102 — Préréglages d'encart : La Réunion (zoom 9) coupe le sud de l'île, et Wallis-et-Futuna (zoom 7) laisse ses deux îles hors cadre

**Priorité** P3 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Déposer chez dsfr-data
**Labels suggérés** : `enhancement`, `severity:basse`, `dsfr-data-map-inset`, `dsfr-data-map`
**Rencontré sur** 3 page(s) : edu/implantation-ulis-tfv, edu/hybridation-enseignement-lycee, culture/expositions-interet-national

### Constat

Dans un encart de 10 rem × 160 px (largeur posée par `site.css`, AM-032), deux préréglages de `utils/territories.ts` ne montrent pas leur territoire. `la-reunion` (centre −21,115 / 55,53, zoom 9) : Saint-Pierre (−21,347) sort du cadre, et l'encart ULIS-TFV, dont l'unique point ultramarin est le Collège Terre Sainte, était vide. `wallis-et-futuna` (centre −13,80 / −177,15, zoom 7) : Wallis (≈ −176,2) et Futuna (≈ −178,1) sont chacune à près d'un degré de longitude du centre, au-delà d'une demi-largeur de 80 px, et l'encart de l'hybridation était vide. Règle 4 : c'est bien `dsfr-data` (préréglages de la bibliothèque), pas DSFR Chart.

**Vague 5 de création (2026-09-27)** : Expositions d'intérêt national : l'encart de La Réunion ne montre qu'un des cinq musées labellisés de l'île. Même cause que ci-dessus (préréglage au zoom 9).

### Impact de l'erreur ou du manque

Un encart vide se lit comme « aucune donnée outre-mer » : c'est l'erreur qu'ULIS-TFV avait écrite (FP-045).

### Objectif métier de la correction

Que chaque préréglage montre son territoire entier dans l'encart par défaut.

### Pérennité et reproductibilité du besoin

Permanent : toute carte qui pose ces deux encarts.

### Comment ça a été vérifié

Agents, 0.42.0, 2026-09-26 : captures des encarts vides ; `zoom="8"` (La Réunion) et `center="-13.75,-177.15" zoom="6"` (Wallis-et-Futuna) font apparaître les points. **Préréglages relus et calculés à la consignation** (origin/main, `packages/core/src/utils/territories.ts` l. 10 et 21). En Web Mercator, une carte fait 256·2^z px pour 360°. Au zoom 9, cela donne 364 px par degré de longitude, soit ≈ 390 px par degré de latitude à −21° : Saint-Pierre, à 0,23° au sud du centre, tombe à ≈ 90 px, hors d'une demi-hauteur de 80 px. Au zoom 7, 91 px par degré : Wallis et Futuna, à ≈ 0,97° du centre, tombent à ≈ 88 px, hors d'une demi-largeur de 80 px.

Vague 5 (2026-09-27) : Agent, capture de la carte, 2026-09-27. Non rejoué à la consignation ; cohérent avec le calcul de l'emprise ci-dessus.

**Revérifié pour le rapport #95 (2026-09-27)** : origin/main de dsfr-data 23b1b9a = v0.42.0 + 7 commits ; `git diff v0.42.0 origin/main -- packages/core` est vide, et la PR de version #1154 (0.42.1) ne porte que l'assistant (`packages/app-ui`, `packages/shared/src/ui`). Source relu : `utils/territories.ts` l. 10 (`la-reunion`, zoom 9) et l. 21 (`wallis-et-futuna`, zoom 7), inchangés. Verdict ADR-120 : **absent du source** (vraie demande). Rapport : `docs/rapport-dsfr-data-2026-09-27.md`.

### Contournement actuel

`<dsfr-data-map-inset>` avec `zoom` ou `center` explicites.

### Demande

Recaler les deux préréglages pour une emprise de 160 px : La Réunion au zoom 8, Wallis-et-Futuna au zoom 6 (ou dériver centre et zoom de l'emprise du territoire).

### Critères d'acceptation

- [ ] Un point à Saint-Pierre de La Réunion est visible dans l'encart `la-reunion` de 160 px.
- [ ] Wallis et Futuna sont visibles dans l'encart `wallis-et-futuna` de 160 px.

---

## AM-113 — Le repli « Autres valeurs » de la légende de carte est écrit en dur : `dsfr-data-map-layer` et `dsfr-data-map-legend` n'ont pas d'équivalent d'`empty-label`

**Priorité** P3 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Déposer chez dsfr-data
**Labels suggérés** : `enhancement`, `severity:basse`, `dsfr-data-map-layer`, `dsfr-data-map-legend`
**Rencontré sur** 2 page(s) : fermeture-reseau-cuivre, edu/educajou-ecolemap

### Constat

Quand une valeur de `color-field` n'est pas dans `color-map`, le point prend la couleur `color` et la légende ajoute une entrée « Autres valeurs ». Ce libellé est une constante de `dsfr-data-map-layer` (`getLegendEntries`) ; `dsfr-data-map-legend` n'a que `for` et `label`. Impossible de dire « Non renseigné » ou « Secteur inconnu », alors que `dsfr-data-a11y` et `dsfr-data-facets` savent nommer leur valeur vide (`empty-label`). Relevé à la relecture du 2026-09-20 (`fermeture-reseau-cuivre`, `educajou-ecolemap`).

### Impact de l'erreur ou du manque

Une légende qui nomme mal une catégorie (« Autres valeurs » pour des lignes sans valeur), ou un `compute` de recodage à écrire et à maintenir par page.

### Objectif métier de la correction

Nommer le repli de légende comme on nomme la valeur vide d'un tableau ou d'une facette.

### Pérennité et reproductibilité du besoin

Durable : toute carte catégorielle sur un champ incomplet.

### Comment ça a été vérifié

**Rejoué le 2026-09-27 (issue #71)**, page minimale `scripts/rejeu-findings/pages/f71-map-legend.html`, `run-70-71.mjs legend`, Playwright : trois points (a, b, c), `color-map="a:…,b:…"`, `color="#929292"`. **Bundle publié 0.42.0** : légende « Type a b Autres valeurs », `getLegendEntries()` = a, b, « Autres valeurs » ; `empty-label`, `other-label` et `fallback-label` posés sur la couche : trois avertissements « attribut … inconnu de la version chargée », sans effet ; les mêmes sur la légende : sans effet et **sans avertissement**. **`origin/main` de dsfr-data (23b1b9a, 0.42.0 + 7 commits sans changement dans `packages/core`), construit par `git archive` + `vite-node scripts/build-lib.ts` et substitué au bundle du CDN** : relevé identique. Contournement vérifié dans la même page : `dsfr-data-normalize compute="t2 = when t = 'a' then 'a' else when t = 'b' then 'b' else 'Non renseigné'"` puis `color-map` qui nomme « Non renseigné » : légende « Type a b Non renseigné ».

**Revérifié pour le rapport #95 (2026-09-27)** : origin/main de dsfr-data 23b1b9a = v0.42.0 + 7 commits ; `git diff v0.42.0 origin/main -- packages/core` est vide, et la PR de version #1154 (0.42.1) ne porte que l'assistant (`packages/app-ui`, `packages/shared/src/ui`). Rejoué le même jour contre la 0.42.0 et origin/main (voir plus haut). Constante « Autres valeurs » : `dsfr-data-map-layer.ts` l. 597. Verdict ADR-120 : **absent du source** (vraie demande). Rapport : `docs/rapport-dsfr-data-2026-09-27.md`.

### Contournement actuel

Recoder en amont (`dsfr-data-normalize compute="… else 'Non renseigné'"`) et donner sa couleur à la catégorie dans `color-map` : le repli ne sert plus. Ne tient que si l'ensemble des valeurs est connu et fermé ; sur un champ ouvert (une nouvelle valeur apparaît dans le jeu), elle retombe dans le `else` sous le nom choisi, ce qui peut mentir si ce nom est « Non renseigné » alors que la valeur est renseignée.

### Demande

Un attribut de libellé du repli (`other-label` ou nom équivalent) sur `dsfr-data-map-layer`, relayé par `getLegendEntries()` à la légende.

### Critères d'acceptation

- [ ] Sur la page minimale f71-map-legend, l'attribut rend « Non renseigné » à la place d'« Autres valeurs », sans recodage.
- [ ] Sans attribut, la légende est inchangée.

---

## AM-090 — `compute` n'a aucun échappement de la quote simple dans un littéral : `'J''en ai'` est impossible

**Priorité** P3 · **Effort estimé** XS · **Décision proposée** Déposer chez dsfr-data
**Labels suggérés** : `enhancement`, `severity:basse`, `dsfr-data-normalize`
**Rencontré sur** 4 page(s) : barometre-france-num, entreprises-restauration-notre-dame, edu/cactus-hameconnage, culture/ete-culturel

### Constat

Le tokenizer de `compute` (`packages/shared/src/utils/compute.ts`) termine un littéral texte à la première quote, sans accepter `''` ni `\'`. On ne peut donc pas écrire `when libelle = 'J''en ai'`, alors que les libellés à apostrophe ASCII sont courants dans les jeux publics. Le JSDoc ne mentionne pas la limite.

**Lot 4 de recréation (2026-09-26)** : la famille « Métiers d'art et du patrimoine » de /viz/entreprises-restauration-notre-dame ne s'écrit pas en littéral ; contournée par `contains(…, 'art et du patrimoine')`. Deuxième jeu public qui bute sur la même apostrophe.

**Lot 6 de recréation (2026-09-26)** : Cactus contourne l'apostrophe de « heure de vie de classe » par `contains(join(…), 'heure de vie de classe')`, sans essayer d'échappement. C'est cohérent avec ce constat.

**Vague 5 de création (2026-09-27)** : Été culturel : « Provence-Alpes-Côte d'Azur » ne s'écrit pas dans un littéral. L'erreur est signalée, pas silencieuse : `''` donne « "then" attendu … trouvé 'Oise' », `\'` donne « chaîne non terminée ». Contournement natif : `replace-fields`.

### Impact de l'erreur ou du manque

Toute comparaison à un libellé français contenant une apostrophe ASCII passe par un `contains` approximatif.

### Objectif métier de la correction

Comparer un libellé exactement, quelle que soit sa ponctuation.

### Pérennité et reproductibilité du besoin

Permanent : l'apostrophe est partout dans les nomenclatures françaises.

### Comment ça a été vérifié

Source `compute.ts` l. 330-340 (boucle jusqu'à `input[j] !== "'"`) relue le 2026-09-26, grammaire identique dans le bundle 0.33.0 du CDN et sur origin/main (0.42.0). Contournement appliqué sur /viz/barometre-france-num : 802-807 unifiées, 802 9,46 → 21,91 affichée au navigateur. — Lot 4 (2026-09-26) : page Notre-Dame, 0.42.0, chiffres de la famille identiques au recalcul sur l'export (103 entreprises).

Contournement lu dans /education/cactus-hameconnage (agent, 2026-09-26).

Vague 5 (2026-09-27) : Agent, page minimale 0.42.0 `core`, 2026-09-27. Non rejoué à la consignation.

**Revérifié pour le rapport #95 (2026-09-27)** : origin/main de dsfr-data 23b1b9a = v0.42.0 + 7 commits ; `git diff v0.42.0 origin/main -- packages/core` est vide, et la PR de version #1154 (0.42.1) ne porte que l'assistant (`packages/app-ui`, `packages/shared/src/ui`). **Rejeu unitaire du source** (vite-node, origin/main) : `compileCompute("x = when l = 'J''en ai' then 1 else 0")` → « "then" attendu après la condition d'un "when", trouvé 'en ai' ». L'erreur est **dite**, pas silencieuse. Tokenizer `compute.ts` l. 331-334 inchangé. Verdict ADR-120 : **absent du source** (vraie demande). Rapport : `docs/rapport-dsfr-data-2026-09-27.md`.

### Contournement actuel

`contains(champ, 'en ai')`, qui ne tient que si aucun autre libellé ne contient la sous-chaîne — à vérifier jeu par jeu.

### Demande

Accepter `''` dans un littéral, comme SQL et ODSQL ; à défaut, le dire dans le JSDoc de `compute`.

### Critères d'acceptation

- [ ] `when libelle = 'J''en ai' then 1 else 0` compare au libellé « J'en ai ».
- [ ] Les littéraux sans quote gardent leur comportement.
