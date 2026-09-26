# Technique — Bulletins officiels des finances publiques

> Les problemes rencontres en reproduisant, et ce qui les a resolus.
> **Ce fichier n'est jamais ecrase par un script.**

## Composants `dsfr-data` employes

`dsfr-data-source` (5 : liste serveur, total, agrégat annuel, jour d'ouverture, date max),
`dsfr-data-context`, `dsfr-data-search` (`server-search count count-label`),
`dsfr-data-facets` (`server-facets context`), `dsfr-data-query` (`running_sum`, `share_percent`),
`dsfr-data-normalize` (`rename`, `round`), `dsfr-data-chart` (`bar`, `databox`),
`dsfr-data-a11y`, `dsfr-data-repeat` (3 phrases calculées), `dsfr-data-display`, `dsfr-data-kpi`.

## Ce qui a coince

### Le sens de `debut_de_validite` (2026-09-26)

Observé : la page disait « entrée en vigueur ». Cause : champ lu sans son libellé portail
(« Début de validité ») ; il date la **version publiée** du commentaire (suffixe du permalien,
page BOFiP de BOI-INT-CVB-HUN). Résolu : vocabulaire « version en vigueur ».

### `year()` rend un entier, formaté « 2 012 » dans le tableau a11y

Résolu par `group-by="date_format(debut_de_validite,'yyyy') as annee"` : chaîne « 2012 »,
HTTP 200, l'adaptateur ne coupe pas la virgule entre parenthèses (#767).

### `decimals` sur `dsfr-data-a11y` s'applique à toutes les colonnes numériques

Proposé par la relecture pour la part cumulée ; écarté sans essai au navigateur, sur lecture du
source (`formatCellValue` → `formatNumberFr(value, {decimals})` pour tout `number`) : les colonnes
entières auraient pris une décimale. Remplacé par `round="cumul_part:1"` sur le normalize dédié.

### Chronologie et facettes

Résolu par `dsfr-data-context sources="bofip bofip-annees"` + `context="bofip-ctx"` sur les
facettes (qui gardent `source="bofip-q"` pour leurs comptes et la chaîne de recherche). Vérifié :
la requête annuelle part avec `where type = "Actualité"`. La recherche plein texte reste hors
contexte (en mode `context`, elle deviendrait un `contains` sur un champ).

### Compteur doublé

`dsfr-data-display` ne sait pas taire son compteur (AM-077) : masquage visuel CSS de
`#bofip-liste .dsfr-data-display > p[role="status"]` (reste lu par les lecteurs d'écran).

## Renvois au registre

PG-014 (levé), AM-036 (levé, appliqué), AM-034, AM-044, AM-077, AM-001 (voie contexte
appliquée), AM-003 / FP-001 (reste_vrai à corriger : `server-facets` marche sans facette
déclarée dès que `fields` est donné), PG-008.

## Pieges reperes sur cette page

- Un corpus versionné date la version, pas la règle — nouveau, pas au CLAUDE.md.
- « Jeu sans facette déclarée → `server-facets` rend une liste vide » : **faux avec `fields`**
  sur ce jeu (`/facets` vide, `/facets?facet=…` peuplé). La ligne du CLAUDE.md est à nuancer.
- `uid-field` sur une clé non unique (23 identifiants juridiques en double) : `permalien`.
