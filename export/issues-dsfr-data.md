# Demandes à déposer sur bmatge/dsfr-data — rapport de cadrage

> Fichier généré par `node scripts/build-retours.mjs` depuis `public/data/retours.json`.
> 1 demandes cadrées — 0 bugs,
> 0 améliorations,
> 1 pièges à désamorcer dans la bibliothèque plutôt que dans la documentation.
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


_0 demandes — S 0, M 0, L 0._

### P2 — prochain cycle : gain net, effort mesuré

| Id | Demande | Type | Effort | Pages | Décision |
|---|---|---|---|---|---|
| PG-032 | `dsfr-data-a11y` n'accepte pas la grammaire `champ:Libellé` de son propre graphique : les en-têtes gardent le nom de colonne, et écrire le libellé **vide le tableau** sans un mot | piege | S | 1 | Déposer chez dsfr-data |

_1 demandes — S 1, M 0, L 0._

### P3 — backlog : confort, cas moins fréquents

| Id | Demande | Type | Effort | Pages | Décision |
|---|---|---|---|---|---|


_0 demandes — S 0, M 0, L 0._

### P4 — hors périmètre ou refus motivé

| Id | Demande | Type | Effort | Pages | Décision |
|---|---|---|---|---|---|


_0 demandes — S 0, M 0, L 0._

## Les demandes

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
