# Technique — L'impôt sur le revenu : les déclarations nationales

> Les problemes rencontres en reproduisant, et ce qui les a resolus.
> **Ce fichier n'est jamais ecrase par un script.**

## Composants `dsfr-data` employes

État au 2026-09-26 (dsfr-data 0.33.0, CDN) :

- `dsfr-data-context id="ctx" sources="ir ir2" url-sync` — porte `?nom=`.
- Deux `dsfr-data-source` sur le même jeu, `fetch-mode="export" max-records="25000" require-where` :
  `ir` (recherche → facette, liste, KPI « cases ») et `ir2` (case seule → courbes, KPI de pic, fiche).
- `dsfr-data-search server-search url-search-param="q" count count-label="ligne"` sur `ir`.
- `dsfr-data-facets source="ir-q" display="nom:select" context="ctx"` (plus de `url-params url-sync` : en mode contexte, l'URL est au contexte).
- `dsfr-data-normalize compute="unite = when … then 'effectif' else 'euros'"` (deux fois : `ir2-u` pour la fiche, `ir-lu` pour la liste).
- `dsfr-data-query` : `ir-annees` (group-by annee), `ir-libelles` (group-by `libelle, unite`, `annee:min/max/count`), `ir-bornes` (agrégat global, sans group-by).
- `dsfr-data-repeat` pour la ligne des bornes (pas de compteur ni de région annoncée), `dsfr-data-display count-label="libellé"` pour les libellés.
- `dsfr-data-kpi` : `nom:distinct`, `libelle:distinct`, `nombre:max`, `montant:max format="compact"`.
- `dsfr-data-chart type="line" y-min="0" value-field="champ:Libellé"` ; `dsfr-data-a11y description`.
- `dsfr-data-context-value template="Case {{nom}}" fallback="Choisissez une case" live`.

## Ce qui a coince

### Une recherche levait l'attente des courbes
Observé : `require-where` est levé par la recherche serveur ; avec une source unique, « pensions » sans case traçait la somme de 96 cases.
Cause : la facette en mode client ne commande rien à la source. Résolu : seconde source `ir2` ne recevant que le contexte ;
vérifié au navigateur (une requête après « pensions », courbes en `idle` ; le choix de 1BI envoie deux requêtes distinctes).

### `display` ne sait pas taire son compteur
Une fiche d'une ligne rendue par `dsfr-data-display` affichait « 1 resultat » au-dessus. Le JSDoc (ADR-135) renvoie à
`dsfr-data-repeat` pour une ligne sans compteur ; présent dans le bundle 0.33.0, et il ne rend rien en `idle`.

### Trois queries sur la même source : deux avertissements console
`ir-annees`, `ir-libelles`, `ir-bornes` lisent la chaîne de `ir2` : la bibliothèque garde les agrégats côté client et
avertit (#765). Voulu : une case fait au plus 19 lignes, et une délégation ferait recevoir des lignes agrégées aux KPI de pic.

### `series-field` comble les trous par 0
Page minimale (0.33.0, 1BI à partir de 2019) : `y='[[409,2321,0,0,0,0],[0,0,8618,15772,20436,25815]]'`. Source
`dsfr-data-chart.ts` l. 650 et 674. Non utilisé sur la page ; constat proposé au registre.

## Renvois au registre

AM-011, AM-031 (corrigé 0.22.0 — l'ancienne analyse le disait « confirmé »), AM-035, AM-065, LIM-003, PG-015.

## Pieges reperes sur cette page

- Le champ `montant` n'a pas d'unité fixe (effectif recopié pour les cases à cocher) et sa description ODS est inexacte (« vide pour une case à cocher » : 0 null). Pas encore au tableau du CLAUDE.md.
- Un code ODS de case n'est pas une clé stable dans le temps (réattribution). Pas au tableau.
- L'infobulle DSFR Chart écrit l'année « 2,024 » (préexistant, DSFR Chart).
