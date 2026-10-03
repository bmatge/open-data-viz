# Demandes à déposer sur bmatge/dsfr-data — rapport de cadrage

> Fichier généré par `node scripts/build-retours.mjs` depuis `public/data/retours.json`.
> 19 demandes cadrées — 7 bugs,
> 9 améliorations,
> 3 pièges à désamorcer dans la bibliothèque plutôt que dans la documentation.
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
`faux-probleme` du registre), et 119
autres sont marquées **corrigées** parce que la bibliothèque les a résolues depuis (leur trace reste au
registre, avec ce qui en demeure vrai). Ce rapport ne liste que ce qui a résisté à la vérification.

Un rappel de méthode issu du lot 12, qui vaut avertissement : une capacité peut être **native, publiée,
et malgré tout absente du bundle chargé** par un site — les 26 pages de ce dépôt ont épinglé
`dsfr-data@0.20.0` pendant que npm servait déjà 0.23.0, puis 0.24.0. Avant de conclure à un manque,
il faut donc chercher l'attribut dans le source, **puis vérifier dans quelle version publiée il
apparaît**. Trois demandes de ce rapport sont nées de ce piège, et deux constats antérieurs
(AM-017, AM-039) en sont sortis.

Le dépôt charge aujourd'hui `dsfr-data@0.44.0`. Les montées successives ont comblé
119 des constats déposés,
passés au statut `corrige` et sortis de ce rapport. Chaque constat restant porte dans son champ
*Vérifié* la date et la version contre lesquelles il a été rejoué : c'est cette preuve, et non la
version du dépôt, qui établit qu'il tient encore.

## Priorisation

### P1 — immédiat : chiffres faux ou fonctions inutilisables, correction courte

| Id | Demande | Type | Effort | Pages | Décision |
|---|---|---|---|---|---|
| PG-033 | API Tabular : un tri serveur combiné à la pagination **perd des lignes en silence** — 177 distinctes sur 180 rendues, et une courbe qui plonge à zéro | piege | S | 1 | Déposer chez dsfr-data |
| PG-034 | API Tabular : `__in` **ignore toute valeur contenant une parenthèse**, avec un HTTP 200 et zéro ligne — là où `__exact` accepte la même valeur | piege | S | 1 | Déposer chez dsfr-data et signaler à data.gouv.fr |
| BUG-031 | Une valeur de facette qui contient une virgule ne survit pas au rechargement de l'URL : `join(',')` à l'écriture, `split(',')` à la lecture | bug | S | 1 | Déposer chez dsfr-data |
| BUG-038 | `min` / `max` de `dsfr-data-query` sur plus de ~125 000 valeurs par groupe : `Math.min(...values)` dépasse la pile, et l'affichage garde l'ancien résultat | bug | XS | 1 | Déposer chez dsfr-data |
| BUG-037 | Un élément répété dans une cellule tableau compte deux fois dans une facette : « Patrimoine 3 » pour 2 lignes, et la sélection en rend 2 | bug | XS | 1 | Déposer chez dsfr-data |

_5 demandes — S 3, M 0, L 0._

### P2 — prochain cycle : gain net, effort mesuré

| Id | Demande | Type | Effort | Pages | Décision |
|---|---|---|---|---|---|
| PG-032 | `dsfr-data-a11y` n'accepte pas la grammaire `champ:Libellé` de son propre graphique : les en-têtes gardent le nom de colonne, et écrire le libellé **vide le tableau** sans un mot | piege | S | 4 | Déposer chez dsfr-data |
| AM-103 | `compute` n'a pas de sous-chaîne : ni SIREN depuis un SIRET, ni département depuis un code commune | amelioration | S | 9 | Déposer chez dsfr-data |
| BUG-033 | `color-map` sur `type="line"` recolore le trait et la légende, pas les points : quatrième surface de la famille BUG-016 / BUG-022 | bug | S | 4 | Déposer chez dsfr-data |
| BUG-035 | La vue tableau de la DataBox ne montre que `label-field` et `value-field` : les séries de `value-fields` en sont absentes, et les lignes sont coupées à 100 | bug | S | 1 | Déposer chez dsfr-data |
| AM-107 | `radius-field` fait croître le rayon, pas l'aire, et la plus petite valeur prend `radius-min` : pas de cercles proportionnels honnêtes, et `compute` n'a pas de racine carrée pour compenser | amelioration | S | 1 | Déposer chez dsfr-data |
| BUG-039 | La couche d'une `dsfr-data-map` ignore le retour en attente (`require-where`) : après retrait du dernier filtre, les marqueurs restent | bug | S | 2 | Déposer chez dsfr-data |
| BUG-034 | Un encart de carte clone la couche entière : chaque encart dessine tous les points, parfois en double, et garde les anciens après un filtre | bug | M | 2 | Déposer chez dsfr-data |
| AM-114 | `proxy-url` ne relaie pas un portail Opendatasoft, et le relais générique passe sa cible dans un en-tête : un site hôte ne peut pas mettre les données d'une dataviz dans son cache (CDN, cache de page) | amelioration | M | 2 | Déposer chez dsfr-data |
| AM-087 | La fiche `apiProviders` annonce que Tabular exige un proxy CORS : l'API répond `access-control-allow-origin: *`, requêtes et préflight comprises | amelioration | XS | 1 | Déposer chez dsfr-data |

_9 demandes — S 6, M 2, L 0._

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

**Ce qui reste vrai.** Corrigé en 0.43.0 pour un chargement brut qui tient sous `max-records`. Restent faux, en silence pour le premier : un chargement **groupé** trié au serveur, et un chargement **tronqué**. Le défaut d'origine est celui de l'API Tabular (pagination par offset sur une clé de tri non unique) : à signaler à data.gouv.fr.

### Impact de l'erreur ou du manque

Des données **manquantes sans aucun signal** : compte total juste, HTTP 200, rien en console. La page l'a payé par une courbe fausse, visible seulement parce que le trou tombait au milieu d'un graphique. Sur un tableau ou un KPI, il serait passé. Tout jeu Tabular de plus de 50 lignes trié au serveur est concerné, c'est-à-dire le cas nominal.

### Objectif métier de la correction

Qu'un chargement paginé sur Tabular rende toujours l'ensemble des lignes, ou dise qu'il ne le garantit pas.

### Pérennité et reproductibilité du besoin

Structurel tant que l'API Tabular pagine par offset sans clé de départage. Le défaut est dans l'API ; la bibliothèque est le seul endroit où il peut être neutralisé, puisqu'elle compose le tri et la boucle de pagination.

### Comment ça a été vérifié

Relevé au navigateur le 2026-09-21 contre `dsfr-data@0.44.0` (courbe « Total enregistré » à 0 en 2018 sur `/demo/delinquance-sans-total`, `q-stups` rendant 28 lignes au lieu de 30), puis **reproduit à l'API hors de toute page** : les quatre pages de `?annee__sort=asc&page_size=50&page=N&annee__groupby&indicateur__groupby&nombre__sum` rendent 180 lignes / 177 couples distincts, avec (2018, 'Usage de stupéfiants'), (2018, 'Usage de stupéfiants (AFD)') et (2018, "Vols d'accessoires sur véhicules") manquants et trois autres couples de 2018 en double ; les mêmes quatre pages **sans** `annee__sort` rendent 180 lignes / 180 distinctes. Contre-épreuve sans `group-by` : `?indicateur__exact=Homicides&annee__exact=2025&nombre__sort=desc` sur trois pages rend 101 lignes / 99 départements distincts (56 et 49 en double) ; sans tri, 101 / 101.

**Revérifié pour le rapport #95 (2026-09-27)** : origin/main de dsfr-data 23b1b9a = v0.42.0 + 7 commits ; `git diff v0.42.0 origin/main -- packages/core` est vide, et la PR de version #1154 (0.42.1) ne porte que l'assistant (`packages/app-ui`, `packages/shared/src/ui`). **API rejouée par le tunnel** : `indicateur__exact=Homicides&annee__exact=2025&nombre__sort=desc&page_size=50`, trois pages → 101 lignes, 99 départements distincts (49 et 56 en double) — toujours vrai côté data.gouv.fr. Avec une seconde clé `__id__sort=asc` : même perte, et 34 inversions d'`__id` entre valeurs égales — **l'API n'applique qu'une clé de tri**, donc la clé de départage proposée dans la demande est impossible par la requête. À `page_size=200`, la taille de page de la bibliothèque depuis #1019 : 1 818 lignes (toutes les infractions de 2025, `nombre__sort=desc`) sur 10 pages → 1 818 distinctes, **non reproduit**. Les deux cas de la page (101 et 180 lignes) tiennent désormais en une page. Le risque reste structurel au-delà de 200 lignes. Source : `tabular-adapter.ts` `buildUrl` l. 1090-1093 et `fetchAll` l. 663-671 : le tri part au serveur sur un chargement paginé, sans départage. Le tri local sur groupes complets (`_fetchAllSortedLocally`, #1045) existe déjà et peut servir de correctif. Verdict ADR-120 : **absent du source** (vraie demande). Rapport : `docs/rapport-dsfr-data-2026-09-27.md`.

**Rejoué le 2026-10-03, montée 0.42.0 → 0.44.0**, Playwright, bundles des paquets npm publiés substitués à celui du CDN (`REJEU_BUNDLE`, 0.42.0 en contrôle puis 0.44.0), même page pour les deux versions. **Partiellement corrigé (dsfr-data#1202, 0.43.0).** Chargement brut trié (`where annee=2025`, `order-by="Code_region:asc"`, 1 818 lignes) — 0.42.0 : 10 requêtes toutes triées, 1 818 rendues, **1 718 distinctes**. 0.44.0 : une seule requête triée puis relecture sans tri, **1 818 distinctes**, tri fait côté client. **Non corrigé** — chargement groupé de plus de 200 groupes (`group-by` + `aggregate` + `order-by`) : 1 818 rendus, **1 805 distincts** dans les deux versions, sans avertissement ; chargement tronqué (`max-records="600"`) : 600 rendues, **550 distinctes** dans les deux versions, la 0.44.0 ajoute un avertissement console. Les deux cas historiques du registre (180 et 101 lignes) tiennent désormais dans une page de 200 et ne reproduisent plus rien. À l'API directement, par pages de 200 : `Code_region__sort=asc` → 1 718 distinctes sur 1 818 ; groupé + `Code_departement__sort=asc` → 1 805 ; sans tri → 1 818. Commande : `REJEU_BASE=… REJEU_BUNDLE=<dist> node scripts/rejeu-findings/run-m44-source.mjs tri | tri-groupe | tri-tronque`.

### Contournement actuel

Ne rien trier au serveur sur ce fournisseur : retirer `order-by` de la `dsfr-data-source` et le poser en aval, sur une `dsfr-data-query` qui travaille sur des lignes déjà toutes chargées. C'est ce que fait la page. Le coût est nul tant que le jeu tient en mémoire ; il devient réel en `server-side`, où le tri n'a pas d'aval — et là il n'y a pas de contournement.

### Demande

Sur l'adaptateur Tabular, ne pas déléguer `order-by` quand le chargement est paginé (plus d'une page attendue), ou à défaut avertir en console que le tri serveur combiné à la pagination peut perdre des lignes sur ce fournisseur. Idéalement : compléter le tri délégué par une clé de départage stable (les champs du `group-by`, ou `__id`) pour rendre l'ordre total.

### Critères d'acceptation

- [ ] Un chargement Tabular paginé avec `order-by` rend le même ensemble de lignes qu'un chargement sans `order-by` (test sur un jeu de plus de 100 lignes, tri sur un champ non unique).
- [ ] À défaut de correctif : un avertissement console nommant le champ de tri et le nombre de pages, émis une fois.
- [ ] Aucune régression sur un chargement d'une seule page, où le tri serveur reste utile et sûr.

---

## PG-034 — API Tabular : `__in` **ignore toute valeur contenant une parenthèse**, avec un HTTP 200 et zéro ligne — là où `__exact` accepte la même valeur

**Priorité** P1 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Déposer chez dsfr-data et signaler à data.gouv.fr
**Labels suggérés** : `enhancement, dx`, `severity:moyenne`, `dsfr-data-source`, `dsfr-data-query`
**Rencontré sur** 1 page(s) : demo/delinquance-sans-total

### Constat

`where="champ:in:a|b|c"` part chez Tabular en `champ__in=a,b,c`. Dès qu'une des valeurs contient une parenthèse, elle est **écartée sans un mot** : la réponse est un 200 avec les lignes des autres valeurs, ou zéro ligne s'il n'y en a pas d'autre. Le même `champ__exact=<valeur à parenthèses>` rend, lui, toutes les lignes attendues — ce n'est donc pas un problème d'encodage mais du parseur de liste.

Sur la base SSMSI, trois des dix-huit indicateurs portent une parenthèse (« Usage de stupéfiants (AFD) », « Usage de stupéfiants (hors AFD) ») : un `where="indicateur:in:…"` pour tracer les trois courbes du chapitre 1 aurait rendu un graphique **incomplet sans prévenir**. Les libellés parenthésés sont courants en open data français (millésimes, variantes, unités), ce qui rend le piège banal.

**Ce qui reste vrai.** Corrigé en 0.43.0 quand la clause est sur une query, au prix du chargement complet (10 requêtes au lieu d'une, 1 818 lignes pour en garder 202). Reste faux quand le `where` est sur la source, avec un avertissement console seulement. Le défaut d'origine est celui de l'API Tabular : à signaler à data.gouv.fr.

### Impact de l'erreur ou du manque

Un graphique ou un tableau amputé d'une partie de ses séries, sans erreur ni avertissement. Le cas est d'autant plus facile à payer que `__exact` sur la même valeur fonctionne : rien n'invite à se méfier de la forme liste. — **Priorité revue le 2026-09-27 (rapport #95) : P2 → P1**, des séries disparaissent en silence (HTTP 200).

### Objectif métier de la correction

Qu'une clause `in` déléguée à Tabular rende les mêmes lignes qu'un filtrage client, ou dise qu'elle ne le fait pas.

### Pérennité et reproductibilité du besoin

Durable tant que le parseur de liste de l'API Tabular n'est pas corrigé. Les libellés parenthésés sont fréquents dans les nomenclatures publiques.

### Comment ça a été vérifié

Relevé à l'API le 2026-09-21, six requêtes sur la ressource `2b27a675-e3bf-41ef-a852-5fb9ab483967` avec `annee__exact=2025` : `indicateur__exact=Usage de stupéfiants (AFD)` → **101** lignes ; `indicateur__in=Usage de stupéfiants (AFD)` → **0** ; `indicateur__in=Homicides,Usage de stupéfiants (AFD)` → **101** (seul « Homicides » retenu, au lieu de 202) ; contre-épreuves sans parenthèse : `indicateur__in=Homicides,Tentatives d'homicide` → 202, `indicateur__in=Usage de stupéfiants,Trafic de stupéfiants` → 202. Aucune erreur, aucun avertissement dans aucun des cas.

**Revérifié pour le rapport #95 (2026-09-27)** : origin/main de dsfr-data 23b1b9a = v0.42.0 + 7 commits ; `git diff v0.42.0 origin/main -- packages/core` est vide, et la PR de version #1154 (0.42.1) ne porte que l'assistant (`packages/app-ui`, `packages/shared/src/ui`). **API rejouée par le tunnel**, `annee__exact=2025` : `indicateur__exact=Usage de stupéfiants (AFD)` → 101 ; `indicateur__in=` la même valeur → 0 ; `indicateur__in=Homicides,Usage de stupéfiants (AFD)` → 101 au lieu de 202. Toujours vrai côté data.gouv.fr. Source : `tabular-adapter.ts` `_applyColonFilters` l. 1193-1200 joint la liste par `,` sans garde ; `supportsServerWhere` (l. 1253) ne refuse que les clauses multi-champs, alors que le même fichier sait qu'une parenthèse casse le parseur de `or=(…)` (l. 1217-1240). Verdict ADR-120 : **absent du source** (vraie demande). Rapport : `docs/rapport-dsfr-data-2026-09-27.md`.

**Rejoué le 2026-10-03, montée 0.42.0 → 0.44.0**, Playwright, bundles des paquets npm publiés substitués à celui du CDN (`REJEU_BUNDLE`, 0.42.0 en contrôle puis 0.44.0), même page pour les deux versions. **Partiellement corrigé (dsfr-data#1202, 0.43.0).** `in` posé sur une **query** — 0.42.0 : une requête `indicateur__in=Homicides,Usage de stupéfiants (AFD)`, 101 lignes au lieu de 202. 0.44.0 : la clause n'est plus déléguée, 10 requêtes sans `__in`, **202 lignes**. `in` posé sur la **source** : `__in` part toujours au serveur, **101 lignes au lieu de 202 dans les deux versions** ; la 0.44.0 ajoute un avertissement console qui conseille de poser la clause sur une query. À l'API directement (`annee__exact=2025`) : `__exact` sur la valeur à parenthèse → 101 ; `__in` sur la même → 0 ; liste mixte → 101 ; liste sans parenthèse → 202. Commande : `REJEU_BASE=… REJEU_BUNDLE=<dist> node scripts/rejeu-findings/run-m44-source.mjs in-query | in-source`.

### Contournement actuel

Dériver une colonne par `dsfr-data-normalize compute="…"` et filtrer dessus : le `compute` change le schéma, donc la `dsfr-data-query` en aval cesse de déléguer et filtre côté client, où la parenthèse ne gêne pas. C'est ce que fait la page (colonne `serie`, puis `where="serie:isnotnull"`). Le contournement cesse de marcher dès que le jeu est trop gros pour être chargé entièrement — c'est-à-dire exactement quand la délégation serveur était nécessaire.

### Demande

Avertir en console quand une valeur de `in` / `notin` déléguée à Tabular contient une parenthèse, la clause étant alors silencieusement incomplète. Le correctif de fond appartient à `data.gouv.fr` ; la bibliothèque peut au moins refuser de déléguer la clause et la calculer côté client.

### Critères d'acceptation

- [ ] Un `where="champ:in:…"` dont une valeur contient une parenthèse rend les mêmes lignes que le même filtre appliqué côté client, ou émet un avertissement console nommant la valeur en cause.
- [ ] Aucun changement pour une liste dont aucune valeur ne contient de parenthèse.

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

**Rejoué le 2026-10-03, montée 0.42.0 → 0.44.0**, Playwright, bundles des paquets npm publiés substitués à celui du CDN (`REJEU_BUNDLE`, 0.42.0 en contrôle puis 0.44.0), même page pour les deux versions. Toujours présent, identique dans les deux versions : « 1,5 à 2 parcours » cochée puis URL rechargée → deux cases fantômes cochées (« 1 (indisponible) », « 5 à 2 parcours (indisponible) »), la vraie décochée, aucun résultat. Le paramètre répété ne contourne pas. Commande : `REJEU_BASE=… REJEU_BUNDLE=<dist> node scripts/rejeu-findings/run-m44-carte.mjs BUG-031`.

### Contournement actuel

Écrire les modalités sans virgule en amont (« 1 et demi à 2 parcours ») par `replace-fields` ou `compute`.

### Demande

Répéter le paramètre (`?intensite=a&intensite=b`, que `readUrlSelections` sait déjà lire puisqu'il itère `params.entries()`) au lieu de joindre par virgule, ou échapper la virgule en `%2C` dans la valeur comme #676 l'a fait pour `replace`.

### Critères d'acceptation

- [ ] « 1,5 à 2 parcours » cochée, puis page rechargée : une seule case cochée, 1 081 établissements ou le compte attendu, pas zéro.
- [ ] Les URL déjà publiées sans virgule dans les valeurs se relisent comme avant.
- [ ] Un test aller-retour `writeUrlSelections` → `readUrlSelections` couvre une valeur à virgule.

---

## BUG-038 — `min` / `max` de `dsfr-data-query` sur plus de ~125 000 valeurs par groupe : `Math.min(...values)` dépasse la pile, et l'affichage garde l'ancien résultat

**Priorité** P1 · **Effort estimé** XS · **Décision proposée** Déposer chez dsfr-data
**Labels suggérés** : `bug`, `severity:moyenne`, `dsfr-data-query`
**Rencontré sur** 1 page(s) : culture/sibil-lieux

### Constat

`_computeAggregate` calcule `min` et `max` par `Math.min(...values)` et `Math.max(...values)`. L'étalement passe chaque valeur en argument, et V8 lève « RangeError: Maximum call stack size exceeded » entre 120 000 et 125 000 arguments. Sibil (204 628 lignes) : la date minimale sur tout le jeu plante la query, et le `dsfr-data-repeat` en aval continue d'afficher l'ancien résultat, sans message à l'écran. Le même motif est dans `utils/aggregations.ts` (min/max du KPI) et dans `dsfr-data-map-layer.ts` (bornes de la discrétisation). Le seuil dépend du moteur : ce n'est pas un plafond qu'une page peut connaître d'avance.

**Ce qui reste vrai.** Le cas d'origine (date minimale de Sibil) passe en 0.44.0. Le défaut reste entier sur une colonne numérique, query et KPI. Lecture du source, non rejouée : `Math.min(...values)` subsiste dans `utils/aggregations.ts`, `dsfr-data-map-layer.ts` et `shared/utils/pivot.ts`.

### Impact de l'erreur ou du manque

Un agrégat sur un grand jeu échoue et l'affichage garde un chiffre périmé, sans rien à l'écran. — **Priorité revue le 2026-09-27 (rapport #95) : P2 → P1**, l'affichage garde un résultat périmé sans message à l'écran.

### Objectif métier de la correction

Que `min` et `max` tiennent sur n'importe quel volume chargé.

### Pérennité et reproductibilité du besoin

Structurel : `fetch-mode="export"` rend courants les jeux de plus de 100 000 lignes.

### Comment ça a été vérifié

Agent, page minimale inline, 0.42.0, 2026-09-27 : 100 000 lignes passent, 200 000 lèvent la `RangeError`. **Rejoué à la consignation** : Node 24 (V8), `Math.min(...new Array(n).fill(1))` passe à 120 000, lève « Maximum call stack size exceeded » à 125 000. Source relu sur origin/main de dsfr-data (23b1b9a, 0.42.0 + 7 commits hors `packages/core`) : `dsfr-data-query.ts` l. 1846-1849, `packages/core/src/utils/aggregations.ts` l. 616, `dsfr-data-map-layer.ts` l. 1126-1127.

**Revérifié pour le rapport #95 (2026-09-27)** : origin/main de dsfr-data 23b1b9a = v0.42.0 + 7 commits ; `git diff v0.42.0 origin/main -- packages/core` est vide, et la PR de version #1154 (0.42.1) ne porte que l'assistant (`packages/app-ui`, `packages/shared/src/ui`). Rejeu Node 24 : `Math.min(...)` passe à 120 000 arguments, lève « Maximum call stack size exceeded » à 125 000. Étalements sur des tableaux de données relevés sur origin/main : `dsfr-data-query.ts` l. 1847-1849, `utils/aggregations.ts` l. 616, `dsfr-data-map-layer.ts` l. 1126-1127, `packages/shared/src/utils/pivot.ts` l. 189. Verdict ADR-120 : **absent du source** (vraie demande). Rapport : `docs/rapport-dsfr-data-2026-09-27.md`.

**Rejoué le 2026-10-03, montée 0.42.0 → 0.44.0**, Playwright, bundles des paquets npm publiés substitués à celui du CDN (`REJEU_BUNDLE`, 0.42.0 en contrôle puis 0.44.0), même page pour les deux versions. **Partiellement corrigé, par effet de bord de dsfr-data#1200.** 200 000 valeurs : sous 0.42.0, `min`/`max` lèvent « RangeError: Maximum call stack size exceeded » sur la colonne numérique comme sur la colonne de dates. Sous 0.44.0, la colonne de **dates** passe (« 2000-01-01 » / « 2024-08-21 ») ; la colonne **numérique** lève toujours la `RangeError`, en agrégat global comme groupé, et le KPI `x:max` reste vide avec une `pageerror`. 100 000 valeurs : tout passe dans les deux versions. Commande : `REJEU_BASE=… REJEU_BUNDLE=<dist> node scripts/rejeu-findings/run-m44-query.mjs bug038 200000`.

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

**Rejoué le 2026-10-03, montée 0.42.0 → 0.44.0**, Playwright, bundles des paquets npm publiés substitués à celui du CDN (`REJEU_BUNDLE`, 0.42.0 en contrôle puis 0.44.0), même page pour les deux versions. Toujours présent, identique dans les deux versions : « Patrimoine 3 » pour 2 lignes, la sélection en rend 2. Commande : `REJEU_BASE=… REJEU_BUNDLE=<dist> node scripts/rejeu-findings/run-m44-carte.mjs BUG-037`.

### Contournement actuel

Dédoublonner la cellule en amont (réécriture du texte avant `split`, PG-073).

### Demande

Dédoublonner les valeurs d'une cellule dans `facetValuesOf` : une ligne compte une fois par valeur distincte.

### Critères d'acceptation

- [ ] `["A","A"]` et `["A"]` → « A 2 ».

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

**Rejoué le 2026-10-03, montée 0.42.0 → 0.44.0**, Playwright, bundles des paquets npm publiés substitués à celui du CDN (`REJEU_BUNDLE`, 0.42.0 en contrôle puis 0.44.0), même page pour les deux versions. Toujours présent, identique dans les deux versions : avec la grammaire `champ:Libellé` du graphique, les en-têtes affichent la chaîne entière et les cellules sont vides ; console vide. Commande : `REJEU_BASE=… REJEU_BUNDLE=<dist> node scripts/rejeu-findings/run-m44-chart.mjs pg032`.

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

**Rejoué le 2026-10-03, montée 0.42.0 → 0.44.0**, Playwright, bundles des paquets npm publiés substitués à celui du CDN (`REJEU_BUNDLE`, 0.42.0 en contrôle puis 0.44.0), même page pour les deux versions. Toujours présent, identique dans les deux versions : `left(siret, 9)` et `substr(code, 1, 2)` → « fonction inconnue », même liste de 18 fonctions. Commande : `REJEU_BASE=… REJEU_BUNDLE=<dist> node scripts/rejeu-findings/run-m44-source.mjs compute`.

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

**Rejoué le 2026-10-03, montée 0.42.0 → 0.44.0**, Playwright, bundles des paquets npm publiés substitués à celui du CDN (`REJEU_BUNDLE`, 0.42.0 en contrôle puis 0.44.0), même page pour les deux versions. Toujours présent, comptes de pixels identiques dans les deux versions : traits aux couleurs demandées (599 px et 595 px), points restés à la palette par défaut (372 px et 331 px). Commande : `REJEU_BASE=… REJEU_BUNDLE=<dist> node scripts/rejeu-findings/run-m44-chart.mjs bug033`.

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

**Ce qui reste vrai.** Corrigé : une colonne par champ de `value-field` / `value-fields`, avec l'en-tête de la légende. Restent : la coupe silencieuse à 100 lignes, et en `series-field` un tableau sans colonne de série (on ne sait pas à quelle série appartient une ligne). `value-field-2` non rejoué.

### Impact de l'erreur ou du manque

Le tableau que la DataBox présente comme équivalent au graphique en omet les séries : un défaut d'accessibilité.

### Objectif métier de la correction

Que le tableau de la DataBox porte toutes les séries du graphique.

### Pérennité et reproductibilité du besoin

Structurel : tout graphique multisérie avec `databox`.

### Comment ça a été vérifié

Agent, 0.42.0, 2026-09-26 : tableaux `databox-g-compo-table-default` et `databox-g-cc-table-default` sur /developpement-durable/fret-ports. **Source relu à la consignation** (origin/main, `dsfr-data-chart.ts` l. 2035-2060, `_injectDataboxTable`) : colonnes = `labelField` et `parseAliasedColumn(this.valueField)` seulement ; `rows = this._data.slice(0, 100)`.

**Revérifié pour le rapport #95 (2026-09-27)** : origin/main de dsfr-data 23b1b9a = v0.42.0 + 7 commits ; `git diff v0.42.0 origin/main -- packages/core` est vide, et la PR de version #1154 (0.42.1) ne porte que l'assistant (`packages/app-ui`, `packages/shared/src/ui`). Source relu : `dsfr-data-chart.ts` `_injectDataboxTable` l. 2035-2060, inchangé. Verdict ADR-120 : **absent du source** (vraie demande). Rapport : `docs/rapport-dsfr-data-2026-09-27.md`.

**Rejoué le 2026-10-03, montée 0.42.0 → 0.44.0**, Playwright, bundles des paquets npm publiés substitués à celui du CDN (`REJEU_BUNDLE`, 0.42.0 en contrôle puis 0.44.0), même page pour les deux versions. **Partiellement corrigé en 0.43.1 (dsfr-data#1213).** Trois champs de valeur — 0.42.0 : en-têtes du tableau DataBox `port, liq`. 0.44.0 : `port, liq, sol, cont`, et avec alias `port, Vracs liquides, Vracs solides, Conteneurs`. **Non corrigé** : 120 lignes en entrée → 100 au tableau dans les deux versions, sans mention ; au format long (`series-field`), en-têtes `port, v` dans les deux versions, sans colonne de série. Commande : `REJEU_BASE=… REJEU_BUNDLE=<dist> node scripts/rejeu-findings/run-m44-chart.mjs bug035`.

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

**Rejoué le 2026-10-03, montée 0.42.0 → 0.44.0**, Playwright, bundles des paquets npm publiés substitués à celui du CDN (`REJEU_BUNDLE`, 0.42.0 en contrôle puis 0.44.0), même page pour les deux versions. Toujours présent, identique dans les deux versions : valeurs 1, 4, 100 → rayons 4, 5, 30 px ; `radius-scale` inconnu ; `sqrt` inconnue de `compute`. Commande : `REJEU_BASE=… REJEU_BUNDLE=<dist> node scripts/rejeu-findings/run-m44-carte.mjs AM-107`.

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

**Rejoué le 2026-10-03, montée 0.42.0 → 0.44.0**, Playwright, bundles des paquets npm publiés substitués à celui du CDN (`REJEU_BUNDLE`, 0.42.0 en contrôle puis 0.44.0), même page pour les deux versions. Toujours présent, identique dans les deux versions : après retrait du filtre, le display revient à « Choisissez un filtre » et 2 cercles restent dessinés. Commande : `REJEU_BASE=… REJEU_BUNDLE=<dist> node scripts/rejeu-findings/run-70-71.mjs idle`.

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

**Rejoué le 2026-10-03, montée 0.42.0 → 0.44.0**, Playwright, bundles des paquets npm publiés substitués à celui du CDN (`REJEU_BUNDLE`, 0.42.0 en contrôle puis 0.44.0), même page pour les deux versions. Toujours présent, identique dans les deux versions sur 5 essais : chaque encart charge toutes les lignes quelle que soit son emprise ; doublement des cercles dans 4 essais sur 5 (8 cercles pour 4 lignes), sur des encarts qui changent d'un essai à l'autre. Le défaut est intermittent : un essai propre ne prouve rien. Le gel n'est pas rejoué (4 points). Commande : `REJEU_BASE=… REJEU_BUNDLE=<dist> node scripts/rejeu-findings/run-m44-carte.mjs BUG-034`.

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

**Rejoué le 2026-10-03, montée 0.42.0 → 0.44.0**, Playwright, bundles des paquets npm publiés substitués à celui du CDN (`REJEU_BUNDLE`, 0.42.0 en contrôle puis 0.44.0), même page pour les deux versions. Toujours présent, identique dans les deux versions (quatre mêmes requêtes), aucun avertissement sur l'hôte non relayé. Commande : `REJEU_BASE=… REJEU_BUNDLE=<dist> node scripts/rejeu-findings/run-m44-source.mjs proxy`.

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

**Rejoué le 2026-10-03, montée 0.42.0 → 0.44.0**, Playwright, bundles des paquets npm publiés substitués à celui du CDN (`REJEU_BUNDLE`, 0.42.0 en contrôle puis 0.44.0), même page pour les deux versions. Toujours présent : la fiche `api-providers` est identique entre les étiquettes `v0.42.0` et `v0.44.0` du dépôt dsfr-data (`git diff` vide) et range toujours Tabular parmi les APIs sans CORS ; `curl -D-` avec `Origin` → `access-control-allow-origin: *`, requête (200) et préflight (204). `skills.json` n'est pas dans le paquet npm : la comparaison s'est faite sur le dépôt, pas sur le paquet.

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

**Rejoué le 2026-10-03, montée 0.42.0 → 0.44.0**, Playwright, bundles des paquets npm publiés substitués à celui du CDN (`REJEU_BUNDLE`, 0.42.0 en contrôle puis 0.44.0), même page pour les deux versions. Toujours présent, valeur pour valeur dans les deux versions : `share_percent` divise par le total de toutes les lignes (16,67 % et 83,33 % par année au lieu de 100 % chacune) ; `share-by`, `partition-by`, `share-partition` signalés inconnus. Commande : `REJEU_BASE=… REJEU_BUNDLE=<dist> node scripts/rejeu-findings/run-m44-query.mjs am110`.

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

**Rejoué le 2026-10-03, montée 0.42.0 → 0.44.0**, Playwright, bundles des paquets npm publiés substitués à celui du CDN (`REJEU_BUNDLE`, 0.42.0 en contrôle puis 0.44.0), même page pour les deux versions. Toujours présent, identique dans les deux versions : 10,41 / 9,98 / 7,25 → « 10 % », « 10 % », « 7 % » ; huit noms d'attribut de format essayés, chacun signalé « inconnu » en console (ils ne sont donc pas ignorés en silence). Commande : `REJEU_BASE=… REJEU_BUNDLE=<dist> node scripts/rejeu-findings/run-m44-chart.mjs am088`.

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

**Rejoué le 2026-10-03, montée 0.42.0 → 0.44.0**, Playwright, bundles des paquets npm publiés substitués à celui du CDN (`REJEU_BUNDLE`, 0.42.0 en contrôle puis 0.44.0), même page pour les deux versions. Toujours présent, identique au pixel près dans les deux versions : Saint-Pierre hors cadre à La Réunion (zoom 9), Mata-Utu et Leava hors cadre à Wallis-et-Futuna (zoom 7) ; le contournement (zoom 8 ; centre et zoom 6) les ramène dans le cadre. Commande : `REJEU_BASE=… REJEU_BUNDLE=<dist> node scripts/rejeu-findings/run-m44-carte.mjs AM-102`.

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

**Rejoué le 2026-10-03, montée 0.42.0 → 0.44.0**, Playwright, bundles des paquets npm publiés substitués à celui du CDN (`REJEU_BUNDLE`, 0.42.0 en contrôle puis 0.44.0), même page pour les deux versions. Toujours présent, identique dans les deux versions : « Autres valeurs », trois noms d'attribut essayés sans effet. Commande : `REJEU_BASE=… REJEU_BUNDLE=<dist> node scripts/rejeu-findings/run-70-71.mjs legend`.

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

**Rejoué le 2026-10-03, montée 0.42.0 → 0.44.0**, Playwright, bundles des paquets npm publiés substitués à celui du CDN (`REJEU_BUNDLE`, 0.42.0 en contrôle puis 0.44.0), même page pour les deux versions. Toujours présent, identique dans les deux versions : `'J''en ai'` et `'J\'en ai'` lèvent chacun une erreur de syntaxe (dite en console, pas silencieuse). Commande : `REJEU_BASE=… REJEU_BUNDLE=<dist> node scripts/rejeu-findings/run-m44-source.mjs compute`.

### Contournement actuel

`contains(champ, 'en ai')`, qui ne tient que si aucun autre libellé ne contient la sous-chaîne — à vérifier jeu par jeu.

### Demande

Accepter `''` dans un littéral, comme SQL et ODSQL ; à défaut, le dire dans le JSDoc de `compute`.

### Critères d'acceptation

- [ ] `when libelle = 'J''en ai' then 1 else 0` compare au libellé « J'en ai ».
- [ ] Les littéraux sans quote gardent leur comportement.
