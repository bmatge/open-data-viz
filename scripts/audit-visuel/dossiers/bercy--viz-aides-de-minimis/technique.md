# Technique — Registre des aides de minimis

> Les problemes rencontres en reproduisant, et ce qui les a resolus.
> **Ce fichier n'est jamais ecrase par un script.**

## Composants `dsfr-data` employes

`dsfr-data-source` (`fetch-mode="export"`, `max-records="100000"`, `select` avec `date_format`),
`dsfr-data-search`, `dsfr-data-facets`, `dsfr-data-query` (where, group-by, aggregate avec
`share_percent`, agrégat global, `limit`), `dsfr-data-normalize` (`compute`), `dsfr-data-kpi`
(somme, `count`, `date_octroi:max` + `format="date"`, littéral `=Non publié`),
`dsfr-data-kpi-group`, `dsfr-data-repeat` (`{{#if}}` / `{{#unless}}`), `dsfr-data-podium`
(`subtitle-field`), `dsfr-data-chart` (`type="bar" horizontal`, `databox`), `dsfr-data-a11y`,
`dsfr-data-list`. Version chargée : 0.33.0.

## Ce qui a coince

### Le sous-titre du podium n'a pas de format numérique (2026-09-26)

- **Observé** : `subtitle-field="nb"` afficherait « 5164 » ; le podium lit le champ par
  `String(getByPath(record, subtitleField))` (`dsfr-data-podium.ts:389-391`), sans format.
- **Résolu** : `dsfr-data-normalize id="mi-par-autorite-n" compute="mil = floor(nb / 1000); reste = …; aides = when … concat(mil, ' 00', reste, ' aides') …"`
  (espace fine insécable `&#8239;`, singulier pour 1). Rendu vérifié : « 5 164 aides », « 1 aide ».
- Valable au-delà de cette page → constat proposé au registre.

### Pas de date dans la DataBox du graphique (2026-09-26)

- **Observé** : `databox-date-field` lit la date dans les lignes **du graphique**, qui sont
  groupées par instrument, donc sans date. Tentative : `aggregate="d:max:dmax"` sur la query →
  rend **2026** (page minimale, 0.33.0 CDN, jeu inline `["2026-09-01","2026-09-25","2026-08-10"]`),
  alors que `dsfr-data-kpi value="d:max" format="date"` rend « 25/09/2026 » sur les mêmes lignes.
  `_computeAggregate` de la query passe par `toNumber` ; le KPI (`computeExtremum`, #667)
  compare les dates ISO en texte.
- **Résolu** : date portée par un KPI « Dernière aide octroyée », pas par la DataBox.
- Constat proposé (bug de la query).

### `{{#if}}` tient 0 pour vrai (2026-09-26)

- **Observé** : `{{#if tot}}` avec `tot = 0` ouvre le bloc (même page minimale) ;
  `isTemplateTruthy` ne ferme que sur null, undefined, '', [] et false
  (`template-expression.ts:177`).
- **Résolu** : `compute="doublons = when lignes > distinctes then lignes - distinctes else null"`.

### Plafond `max-records` sous un jeu qui croît (2026-09-26)

- 16 610 lignes le 2026-09-10, 17 621 le 2026-09-26 : ~63/jour, plafond de 20 000 atteint vers
  début novembre 2026. Porté à 100 000 ; recette sans avertissement de troncature.

### KPI qui débordent leur tuile (2026-09-26, préexistant)

- `dsfr-data-kpi-group cols="4"` dans la colonne de 9 : « 174 536 650 € » mesure 251 px pour
  208 px de tuile (relevé sur la version d'avant correction, même mesure). Passé à `cols="2"`.

### Barres horizontales dans une demi-colonne (2026-09-26)

- En `fr-col-lg-5`, onze libellés longs se chevauchaient (`aspect-ratio="2"` transmis au `bar-chart` par dsfr-data-chart).
  Le graphique passe en pleine largeur.

## Renvois au registre

AV-020 (Studio comme spécification ; ses chiffres de `verifie` datent du 2026-09-09),
AM-031, PG-032 (en-têtes du tableau a11y : `instrument_aide | total | part`), AM-002
(`max-records`), LIM-003 (qualité du jeu : 221 lignes répétées), AM-007 (retiré de la page :
la mention était périmée).

## Pieges reperes sur cette page

- `max-records` explicite trop bas : déjà au tableau des pièges (ligne `max-records` et
  « Chargement complet via /records ») ; la nouveauté est la **croissance** du jeu.
- `{{#if}}` sur un nombre nul : pas au tableau.
- Agrégat `max` de query sur une date : pas au tableau.
