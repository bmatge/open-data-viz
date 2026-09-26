# Technique — Baromètre France Num

> Les problemes rencontres en reproduisant, et ce qui les a resolus.
> **Ce fichier n'est jamais ecrase par un script.**

## Composants `dsfr-data` employes

Refonte (`public/viz/barometre-france-num-v2.html`, état au 2026-09-26, dsfr-data 0.33.0) :
`dsfr-data-source` (7, toutes en `fetch-mode="export"`), `dsfr-data-context` + `dsfr-data-facets
context default url-sync` (profil), `dsfr-data-join`, `dsfr-data-normalize` (`compute`, `rename`),
`dsfr-data-pivot`, `dsfr-data-query` (`group-by`, `aggregate`, `where`, `limit`),
`dsfr-data-kpi-group` / `dsfr-data-kpi` (`format="compact"`), `dsfr-data-chart` (DataBox,
`color-map`), `dsfr-data-a11y`, `dsfr-data-repeat` (`scopes`, `lazy`, phrases de lecture),
`dsfr-data-facets` client (`value-labels`, `default`), `dsfr-data-search`, `dsfr-data-list`.

## Ce qui a coince

### Classement 2024 → 2025 faussé par une réponse scindée (2026-09-26)

- **Observé** : n° 1 de « Ce qui bouge le plus » = 1401 « Oui, en interne » 46,25 → 32,96.
- **Cause** : en 2025 la réponse est scindée (« Oui, en interne » + « Oui, en interne (dirigeants,
  salariés…) », 22,1 %). Le pivot apparie par libellé et ignore la nouvelle modalité.
- **Résolu** : règle « même jeu de réponses les deux années », calculée : `normalize` marque les
  couples orphelins (`p24`, `p25`, `orphelin`), `query group-by="code_unifie"
  aggregate="p24:sum, p25:sum, orphelin:sum"` compte par question (colonnes `champ__sum`),
  `normalize` en tire un `statut`, `join` le rapporte sur les lignes, `mvt-top
  where="statut:eq:comparable, delta_abs:gt:0"`. Cinq questions écartées : 605, 1311, 1401, 1422, 1425.

### « J'en ai » / « Oui » : l'apostrophe impossible dans `compute`

- **Observé** : 802-807 hors comparaison (« J'en ai » 2024, « Oui » 2025) ; `libelle_reponse_unifie`
  vide sur ces lignes.
- **Cause** : il faut unifier avant le pivot, mais le tokenizer de `compute`
  (`packages/shared/src/utils/compute.ts`) termine un littéral à la première quote simple, sans
  échappement (ni `''`, ni `\'`) : `'J''en ai'` ne s'écrit pas.
- **Résolu** : `when contains(libelle_reponse, 'en ai') then 'Oui' else libelle_reponse`. Sûr ici
  seulement : « J'en ai » est le seul libellé 2024-2025 contenant « en ai », et aucune question ne
  porte les deux libellés la même année (vérifié à l'API le 2026-09-26). Sur un autre jeu, le
  `contains` peut attraper un voisin.

### En-têtes de tableau illisibles

- **Observé** : `etiquette | score_prof | score_nat | ecart`, `libelle_unifie | an_2024 | an_2025`.
- **Cause** : `dsfr-data-a11y value-field` n'accepte que des noms de colonnes (pas d'alias).
- **Résolu** : `dsfr-data-normalize rename` (accepte espace et parenthèses) dans un second
  normalize après le calcul : `ecarts-l` et `mvt-tab`. `compute` ne suffit pas (identifiants
  `[A-Za-zÀ-ÿ0-9_]` seulement). Conséquence : graphiques et tableaux lisent `France`, `Profil`,
  `Réponse`, `Question`, `Écart (pt)`.

### Sélecteur de question à options mortes

- **Observé** : 119 `<option>` en dur, 16 sans ligne 2025 → « Aucune donnée disponible ».
- **Résolu** : `dsfr-data-facets id="det" source="ecarts-l" fields="code_unifie"
  display="code_unifie:select" value-labels="code_unifie:libelle_unifie" default="code_unifie:923"`.
  Filtrage client, aucune requête ; deux sources `require-where`, un contexte et une jointure
  supprimés. Le tri `sort="code_unifie:alpha"` porte sur le libellé (JSDoc de `value-labels`).

### Libellés longs tronqués sur le graphique horizontal des variations

- **Observé** (capture du 2026-09-26) : « Part des factures émises sous un format électronique
  structuré… — 0% » est coupé à gauche de l'axe. Non corrigé : DSFR Chart ne propose pas de retour
  à la ligne des libellés d'axe ; le tableau équivalent porte le libellé complet.

## Renvois au registre

AM-081, AM-084 (consommés par le sélecteur de question), PG-022 (séparateurs), BUG-022 et AM-086
(infobulle, revus au survol), LIM-004 (requalifié, `repeat`), PG-001 (doublons de lignes : parenté).

## Pieges reperes sur cette page

- Réponse scindée entre deux éditions → faux mouvement dans un pivot par libellé (nouveau).
- Pas d'échappement de quote dans `compute` (nouveau).
- `valeurs_dans_calcul` ≠ ce qui est compté : lire `descriptif_de_question` (nouveau, propre au jeu).
- Couples (question, réponse) publiés deux fois dans `questions-reponses` 2025 (nouveau, propre au jeu).
