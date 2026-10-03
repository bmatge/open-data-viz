# Demandes à déposer sur bmatge/dsfr-data — rapport de cadrage

> Fichier généré par `node scripts/build-retours.mjs` depuis `public/data/retours.json`.
> 0 demandes cadrées — 0 bugs,
> 0 améliorations,
> 0 pièges à désamorcer dans la bibliothèque plutôt que dans la documentation.
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


_0 demandes — S 0, M 0, L 0._

### P2 — prochain cycle : gain net, effort mesuré

| Id | Demande | Type | Effort | Pages | Décision |
|---|---|---|---|---|---|


_0 demandes — S 0, M 0, L 0._

### P3 — backlog : confort, cas moins fréquents

| Id | Demande | Type | Effort | Pages | Décision |
|---|---|---|---|---|---|


_0 demandes — S 0, M 0, L 0._

### P4 — hors périmètre ou refus motivé

| Id | Demande | Type | Effort | Pages | Décision |
|---|---|---|---|---|---|


_0 demandes — S 0, M 0, L 0._

## Les demandes

