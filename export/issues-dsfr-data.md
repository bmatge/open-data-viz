# Demandes à déposer sur bmatge/dsfr-data — rapport de cadrage

> Fichier généré par `node scripts/build-retours.mjs` depuis `public/data/retours.json`.
> 4 demandes cadrées — 0 bugs,
> 1 améliorations,
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

16 critiques ont été **retirées** au fil du
banc d'essai parce qu'une vérification a montré une voie native ou une erreur de notre part (entrées
`faux-probleme` du registre), et 108
autres sont marquées **corrigées** parce que la bibliothèque les a résolues depuis (leur trace reste au
registre, avec ce qui en demeure vrai). Ce rapport ne liste que ce qui a résisté à la vérification.

Un rappel de méthode issu du lot 12, qui vaut avertissement : une capacité peut être **native, publiée,
et malgré tout absente du bundle chargé** par un site — les 26 pages de ce dépôt ont épinglé
`dsfr-data@0.20.0` pendant que npm servait déjà 0.23.0, puis 0.24.0. Avant de conclure à un manque,
il faut donc chercher l'attribut dans le source, **puis vérifier dans quelle version publiée il
apparaît**. Trois demandes de ce rapport sont nées de ce piège, et deux constats antérieurs
(AM-017, AM-039) en sont sortis.

Le dépôt est désormais monté en `dsfr-data@0.28.0`, et le registre en tire les conséquences :
les jalons 0.21.1 à 0.28.0 ont comblé 108 des constats déposés,
passés au statut `corrige` et sortis de ce rapport. Chaque constat restant a été **rejoué contre
la 0.28.0** avant d'entrer ici : ce qui suit n'est ni livré ni planifié à la date de ce rapport.

## Priorisation

### P1 — immédiat : chiffres faux ou fonctions inutilisables, correction courte

| Id | Demande | Type | Effort | Pages | Décision |
|---|---|---|---|---|---|
| PG-033 | API Tabular : un tri serveur combiné à la pagination **perd des lignes en silence** — 177 distinctes sur 180 rendues, et une courbe qui plonge à zéro | piege | S | 1 | Déposer chez dsfr-data |

_1 demandes — S 1, M 0, L 0._

### P2 — prochain cycle : gain net, effort mesuré

| Id | Demande | Type | Effort | Pages | Décision |
|---|---|---|---|---|---|
| PG-032 | `dsfr-data-a11y` n'accepte pas la grammaire `champ:Libellé` de son propre graphique : les en-têtes gardent le nom de colonne, et écrire le libellé **vide le tableau** sans un mot | piege | S | 1 | Déposer chez dsfr-data |
| PG-034 | API Tabular : `__in` **ignore toute valeur contenant une parenthèse**, avec un HTTP 200 et zéro ligne — là où `__exact` accepte la même valeur | piege | S | 1 | Déposer chez dsfr-data et signaler à data.gouv.fr |
| AM-087 | La fiche `apiProviders` annonce que Tabular exige un proxy CORS : l'API répond `access-control-allow-origin: *`, requêtes et préflight comprises | amelioration | XS | 1 | Déposer chez dsfr-data |

_3 demandes — S 2, M 0, L 0._

### P3 — backlog : confort, cas moins fréquents

| Id | Demande | Type | Effort | Pages | Décision |
|---|---|---|---|---|---|


_0 demandes — S 0, M 0, L 0._

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

Relevé au navigateur le 2026-09-21 contre `dsfr-data@0.33.0` (courbe « Total enregistré » à 0 en 2018 sur `/demo/delinquance-sans-total`, `q-stups` rendant 28 lignes au lieu de 30), puis **reproduit à l'API hors de toute page** : les quatre pages de `?annee__sort=asc&page_size=50&page=N&annee__groupby&indicateur__groupby&nombre__sum` rendent 180 lignes / 177 couples distincts, avec (2018, 'Usage de stupéfiants'), (2018, 'Usage de stupéfiants (AFD)') et (2018, "Vols d'accessoires sur véhicules") manquants et trois autres couples de 2018 en double ; les mêmes quatre pages **sans** `annee__sort` rendent 180 lignes / 180 distinctes. Contre-épreuve sans `group-by` : `?indicateur__exact=Homicides&annee__exact=2025&nombre__sort=desc` sur trois pages rend 101 lignes / 99 départements distincts (56 et 49 en double) ; sans tri, 101 / 101.

### Contournement actuel

Ne rien trier au serveur sur ce fournisseur : retirer `order-by` de la `dsfr-data-source` et le poser en aval, sur une `dsfr-data-query` qui travaille sur des lignes déjà toutes chargées. C'est ce que fait la page. Le coût est nul tant que le jeu tient en mémoire ; il devient réel en `server-side`, où le tri n'a pas d'aval — et là il n'y a pas de contournement.

### Demande

Sur l'adaptateur Tabular, ne pas déléguer `order-by` quand le chargement est paginé (plus d'une page attendue), ou à défaut avertir en console que le tri serveur combiné à la pagination peut perdre des lignes sur ce fournisseur. Idéalement : compléter le tri délégué par une clé de départage stable (les champs du `group-by`, ou `__id`) pour rendre l'ordre total.

### Critères d'acceptation

- [ ] Un chargement Tabular paginé avec `order-by` rend le même ensemble de lignes qu'un chargement sans `order-by` (test sur un jeu de plus de 100 lignes, tri sur un champ non unique).
- [ ] À défaut de correctif : un avertissement console nommant le champ de tri et le nombre de pages, émis une fois.
- [ ] Aucune régression sur un chargement d'une seule page, où le tri serveur reste utile et sûr.

---

## PG-032 — `dsfr-data-a11y` n'accepte pas la grammaire `champ:Libellé` de son propre graphique : les en-têtes gardent le nom de colonne, et écrire le libellé **vide le tableau** sans un mot

**Priorité** P2 · **Effort estimé** S (moins d'un jour) · **Décision proposée** Déposer chez dsfr-data
**Labels suggérés** : `enhancement, dx`, `severity:moyenne`, `dsfr-data-a11y`, `dsfr-data-chart`
**Rencontré sur** 1 page(s) : sports/portrait-federation

### Constat

Sur un graphique multi-séries, `dsfr-data-chart` nomme ses séries dans l'attribut lui-même : `value-field="v_fede:Fédération sélectionnée"`, `value-fields="v_gp:Son groupe de fédérations, v_all:Ensemble des fédérations"`. Le `dsfr-data-a11y` qui lui est apparié, **trois lignes plus bas dans le même bloc**, ne connaît pas cette grammaire : son `value-field` attend des noms de colonnes nus, séparés par des virgules. La conséquence n'est pas seulement cosmétique. Deux effets, dans cet ordre de gravité :

1. **En écrivant la grammaire du chart, le tableau se vide.** L'en-tête affiche littéralement la chaîne `dep_nom:Departement`, et **les cellules du corps sont vides** — la colonne est cherchée sous un nom qui n'existe pas. Aucune erreur console, aucun avertissement : le tableau équivalent est rendu, il a le bon nombre de lignes, et il ne contient rien.
2. **En écrivant la grammaire attendue, les en-têtes restent techniques.** Le graphique dit « Fédération sélectionnée », le tableau équivalent dit `v_fede`. Or le tableau équivalent est destiné aux lecteurs d'écran : c'est précisément là que le nom technique coûte le plus cher.

Le piège est d'autant plus facile à payer que les deux balises sont adjacentes et que l'une des deux accepte la forme. Il ne s'agit pas d'un attribut manquant mais d'une **asymétrie de grammaire entre deux composants appariés par conception** — le `for="g-base100"` de l'`a11y` déclare explicitement l'appariement.

### Impact de l'erreur ou du manque

Un tableau équivalent **vide** — lignes présentes, cellules blanches — rendu sans aucun message console dès qu'on recopie la grammaire du graphique voisin. Le tableau équivalent est l'un des trois avantages nets que ce banc reconnaît à la bibliothèque face au portail d'origine : quand il est vide et qu'il le reste en silence, c'est l'argument qui tombe. Aucune recette comptant des lignes ne peut le voir. Secondairement, les en-têtes restent techniques (`v_fede`) là où le graphique dit « Fédération sélectionnée », et ce sont les lecteurs d'écran qui les reçoivent.

### Objectif métier de la correction

Aligner la grammaire de `dsfr-data-a11y` sur celle de `dsfr-data-chart`, avec lequel il est apparié par conception (`for="…"`), pour qu'un tableau équivalent porte les mêmes noms de séries que le graphique qu'il double.

### Pérennité et reproductibilité du besoin

Structurel. Tout graphique multi-séries de la bibliothèque appelle un `a11y` apparié, et l'asymétrie se présente à chaque fois, sur deux balises adjacentes. Le banc en porte 15 ; le risque grandit avec l'usage puisque la forme fautive est celle qu'on vient d'écrire une ligne plus haut.

### Comment ça a été vérifié

Relevé au navigateur le 2026-09-20 contre la 0.33.0 (`node scripts/rejeu-findings/run.mjs am082`, page `pages/am082.html`, cas 4). Deux `dsfr-data-a11y` sur la même source `q` : celui en grammaire nue rend les en-têtes `["dep_nom", "dep_nom__count"]` et un corps rempli ; celui en grammaire du chart (`label-field="dep_nom:Departement" value-field="dep_nom__count:Nombre d'equipements"`) rend les en-têtes `["dep_nom:Departement", "dep_nom__count:Nombre d'equipements"]` et une première ligne `["", ""]` — **cellules vides**. Console : aucun message pour ce cas (le seul message émis concerne le garde-fou de `series-field`, qui lui est bien dit). JSDoc de l'attribut relu au source (`packages/core/src/components/dsfr-data-a11y.ts`) : « Colonne(s) utilisée(s) pour les valeurs du tableau (séparées par des virgules) » — la grammaire à libellés n'y figure pas, ce qui confirme que c'est une absence assumée et non un bug de parsing.

**Le banc est sain** : `grep` sur les 70 pages, **zéro** `dsfr-data-a11y` ne porte la grammaire à deux-points. Le piège est donc documenté avant d'avoir été payé — pour une fois.

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
