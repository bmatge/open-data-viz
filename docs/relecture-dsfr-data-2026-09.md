# Relecture des 54 demandes par le projet dsfr-data — ce qui ne tient pas

> Relecture faite le 2026-09-09 côté `bmatge/dsfr-data`, sur le code de **0.21.0** (`2467489`), à partir
> de `export/issues-dsfr-data.md` (lot 10). Chaque affirmation du rapport a été confrontée au source
> (`fichier:ligne`), plusieurs à l'API ODS en direct ou en `node` contre `packages/shared/dist`.
> Bilan : **38 demandes tiennent** (24 telles quelles, 12 avec la cause ou le périmètre à corriger, 2 hors
> périmètre) et sont reprises dans le backlog de dsfr-data. **Ce document ne traite que les 16 autres** :
> 2 infondées, 12 où une voie native a été ratée en tout ou partie, et 2 contournements du rapport qui sont
> faux et ne doivent pas être documentés comme équivalents.
>
> Il est écrit pour être exploité selon la règle du dépôt (« un constat corrigé ne s'efface pas ») : chaque
> bloc donne *ce qui était cru / ce qui est vrai / ce qui reste vrai / comment c'est vérifié / geste à faire ici*.
> Le geste n'a pas été fait : le registre exige un champ `verifie` observé au navigateur sur la page, et la
> réécriture de l'analyse de chaque page appartient à ce projet.
>
> **Lot 11 (2026-09-10) : les seize gestes ont été faits**, chacun rejoué au navigateur. Correspondance des
> identifiants après requalification : AM-028 → FP-010, AM-024 → FP-011 + BUG-005, AM-025 → FP-012,
> AM-042 → PG-023, PG-018 fusionné dans PG-015 ; nouveaux : AM-044 (rendu de `search count`), PG-022
> (grammaires d'attributs). AM-024 tranché : le refine `= "2022"` renvoie 400 (`IncompatibleTypesInComparisonFilter`).
> La recette « date brute » de PG-014 reste sur les deux pages où le jeu est annuel (vérifié à l'API), avec
> la condition écrite en commentaire ; retirée du CLAUDE.md comme équivalent. Détail : § 3 decies de `synthese.html`.

## Résumé des gestes

| Id | Verdict dsfr-data | Geste dans open-data-viz |
|---|---|---|
| AM-025 | Infondé | → `faux-probleme` ; retirer le `normalize numeric` du Baromètre s'il n'a pas d'autre rôle ; retrouver la vraie cause des 0 appariements |
| AM-028 | Infondé | → `faux-probleme` ; `split="risques_encourus:\|"` fonctionne |
| AM-042 | Comportement documenté | → `piege` requalifié (nom trompeur), pas une amélioration ; utiliser `display="champ:select"` |
| AM-034 | Voie native ratée (partiel) | ajouter `count` sur les `dsfr-data-search` des 3 moteurs de recherche ; garder la demande KPI en P3 |
| AM-033 | Voie native ratée (partiel) | `normalize round="champ:2"` sur la page a11y ; garder la demande « fr-FR » |
| AM-031 | Voie native ratée (partiel) | `format="compact"` pour les milliards ; garder `decimals`/`unit` |
| AM-030 | Voie native ratée (partiel) | `current-year` pour le compteur « année en cours » (supprime une partie des 10 lignes de script) |
| AM-024 | Voie native à valider | essayer `server-facets` sur EPV ; consigner le résultat du refine `= "2019"` |
| AM-017 | Voie native ratée (partiel) | filtre CSS sur `.leaflet-tile-pane` ; corriger l'affirmation « plan IGN clair en raster » |
| AM-016 | Prémisse fausse | recette GeoJSON simplifié statique du guide ; corriger « dsfr-chart embarque des GeoJSON » |
| AM-043 | Voie native ratée (partiel) | `display="champ:select"` + `server-facets` donnent select peuplé **et** cascade ; le manque réel = AM-001 |
| AM-006 | Partiel, deux affirmations inverses | facets **a** « Réinitialiser » ; `context-tags` **n'a pas** « tout effacer » |
| AM-022 | Faux sur `dsfr-data-chart type="map"` | `selected-palette` agit sur les cartes ; la limite de discrétisation est dans DSFR Chart, pas dans dsfr-data |
| AM-023 | Faux sur les cartésiens | `name="Taux"` marche partout sauf sur les cartes ; réécrire le constat |
| PG-018 | Voie native ratée | `where="champ:isnotnull"` sur la même query ; → `faux-probleme` ou fusion PG-015 |
| PG-015 | Voie native existante | `where="champ is not null"` sur la source ; ne pas demander `drop-null` par défaut |
| PG-014 (contournement) | **Contournement faux** | grouper par la date brute ≠ grouper par année ; retirer la recette des pages et du CLAUDE.md si elle y est |
| AM-013 | Choix de conception | refusé côté lib (risque a11y) ; le découplage demandé est le modèle contexte |

## Les deux infondés

### AM-025 — « Une jointure sur des clés de types différents échoue sans rien dire »
- **Ce qui était cru** : `dsfr-data-join` compare `201` (nombre) et `'201'` (chaîne) sans harmoniser, 0 ligne appariée.
- **Ce qui est vrai** : `packages/shared/src/utils/join.ts:139`, `buildKey` fait `String(row[f] ?? '')` des deux côtés. `201` et `'201'` produisent la même clé. Fichier inchangé depuis `6149bab`, donc identique en 0.20.0.
- **Comment c'est vérifié** : en `node` sur `packages/shared/dist/utils/join.js`, `{code_unifie:201}` ⋈ `{code_unifie:'201'}` → appariée. Sur l'API : `questions-reponses` renvoie `201`, `bfn-2022-resultats-2022` renvoie `"201"`.
- **Ce qui reste vrai** : les 0 appariements initiaux étaient réels, mais la cause est ailleurs — probablement l'homonymie de PG-009, un zéro de tête (`"0201"` ≠ `"201"`), un espace non trimé, ou l'ordre d'émission des deux sources. Le `normalize numeric` n'a pas changé la clé calculée ; si la page a « marché » après, quelque chose d'autre a changé en même temps.
- **Geste** : `faux-probleme` ; rejouer la page Baromètre en retirant `normalize numeric="code_unifie"` et observer ; consigner la vraie cause. La demande utile qui reste est AM-026 (taux d'appariement), acceptée côté lib.

### AM-028 — « Le séparateur `|` de `split` entre en conflit avec la grammaire des attributs »
- **Ce qui était cru** : `split` utilise `|` entre ses entrées comme `labels`, donc on ne peut pas découper sur `|`.
- **Ce qui est vrai** : `split` sépare ses entrées par **virgule** et le premier `:` isole le séparateur (`dsfr-data-normalize.ts:407-425`). Le JSDoc l.72-73 donne l'exemple `"Axes:|, Cibles:;"`. La skill le dit en toutes lettres (`references/dsfr-data-normalize.md:36,59` : « Ne pas utiliser `|` entre les entrées : c'est le séparateur le plus courant à découper »). Tests : `tests/dsfr-data-normalize.test.ts:787,816,839`.
- **Geste** : `faux-probleme` ; `split="risques_encourus:|"` sur la page concernée. Leçon transverse pour le CLAUDE.md : **les grammaires d'attributs diffèrent d'un attribut à l'autre** (`|` vs `,`), lire le JSDoc de l'attribut avant de conclure.

## Les voies natives ratées

### AM-042 — `display="champ:radio"` rend une liste déroulante
- **Vrai** factuellement, mais **documenté** : la skill dit « radio : dropdown collapsible avec radio buttons DSFR » (`references/dsfr-data-facets.md:47`). `_renderRadioGroup` (`dsfr-data-facets.ts:1640-1720`) rend un bouton `fr-select` + panneau `role=dialog`. Le choix unique en ligne natif est `display="champ:select"` (l.1517).
- **Geste** : requalifier en `piege` (mode mal nommé). Côté lib : ajout d'un mode `radio-inline`, sans changer `radio`.

### AM-034 — « Pas de compteur du total en mode serveur »
- **Vrai** pour le KPI seulement : `dsfr-data-kpi._computeValue` (`dsfr-data-kpi.ts:182-195`) ne lit jamais la meta.
- **Raté** : le total serveur est déjà affiché par trois composants. `dsfr-data-search count server-search` lit `getDataMeta(...).total` (`dsfr-data-search.ts:72-74, 294-296, 590-608`, documenté `skills.ts:489,845`) et suit recherche et facettes puisque la meta est reposée à chaque fetch. `dsfr-data-list` (l.730-753) et `dsfr-data-display` (l.379-411) rendent « N résultats ».
- **Geste** : sur `fermeture-reseau-cuivre`, `bofip`, `prix-controle-technique`, poser `count` sur le `dsfr-data-search`. La demande KPI (`value="meta:total"`) reste acceptée côté lib, en P3.

### AM-033 — « Le tableau `dsfr-data-a11y` affiche les flottants bruts »
- **Vrai** : `dsfr-data-a11y.ts:382` rend `${row[col] ?? ''}` sans format.
- **Raté** : « aucune fonction d'arrondi » est faux — `dsfr-data-normalize round="champ:2"` existe (`dsfr-data-normalize.ts:82-84, 340-352`), documenté (`references/dsfr-data-normalize.md:37,125`). Il donne `2.27` (point) : la localisation `2,27` reste manquante.
- **Geste** : poser `round` sur la page ; le constat devient « pas de localisation fr-FR », accepté côté lib (avec #640 pt 7).

### AM-031 — « Les formats de KPI n'ont pas de réglage de décimales »
- **Vrai** : `formatCurrency` arrondit à l'unité (`formatters.ts:71-79`), pas de `decimals` sur le KPI.
- **Raté** : `format="compact"` existe (`formatters.ts:52-57`, présent en 0.20.0, documenté `skills.ts:945`) et donne « 44,9 Md » — sans le `€`, ce qui est la seule partie qui manque vraiment. Circonstance atténuante : le JSDoc du KPI (`dsfr-data-kpi.ts:78`) omet `compact`.
- **Geste** : utiliser `compact` pour les milliards de la Comptabilité générale ; la demande `decimals` + `unit` reste acceptée.

### AM-030 — « Pas de valeur par défaut dynamique (aujourd'hui) »
- **Vrai** : aucun attribut `default` sur `dsfr-data-context-filter` (l.66-84).
- **Raté** : `current-year` (`dsfr-data-context-filter.ts:341-344`) avec une checkbox cochée au montage émet dès `_bind` (l.181-183) — le compteur « année en cours » de Rappel Conso se fait sans script. L'agent l'avait listé dans `OPERATORS` en AM-001 sans l'exploiter ici. Reste vrai pour « mois en cours » et « jusqu'à aujourd'hui ».
- **Geste** : sur `rappel-conso`, remplacer la partie « année » des 10 lignes de script par `current-year` ; consigner ce qui reste (mois, `lt-day-after` à aujourd'hui). La demande `default="today|…"` reste acceptée.

### AM-024 — « Pas de moyen d'agréger une date en facette (par année) »
- **À valider** : la page EPV utilise facets en mode **client** sur `qt-q` (`public/viz/entreprise-patrimoine-vivant.html:148-152`), sans `server-facets`. Or l'agent constate lui-même que `/facets` renvoie 7 valeurs annuelles — c'est ce que `server-facets` afficherait tel quel (`opendatasoft-adapter.ts:290-314` lit `facets[].value`).
- **Point ouvert** : le refine émis serait `date_de_labellisation = "2019"` (`buildFacetWhere`, l.332-345). Si ODSQL ne l'accepte pas sur un champ date, la lib doit produire un intervalle — c'est la partie retenue côté lib.
- **Geste** : essayer `server-facets fields="date_de_labellisation"` sur EPV, cliquer 2019, relever la requête et le code HTTP. Consigner dans `verifie`.

### AM-017 — « Aucun fond de carte neutre parmi les préréglages »
- **Vrai** : les 6 presets (`dsfr-data-map.ts:24-57`) sont tous des plans complets, CARTO déprécié (#576).
- **Raté** : un fond qui s'efface s'obtient en CSS de page sur le light DOM Leaflet : `.leaflet-tile-pane { filter: grayscale(1) opacity(.55) }`. Le guide de la lib utilise déjà ce type de filtre (`guide/examples/carte-territoires-electrification.html:54`). Souverain, zéro dépendance.
- **Faux** : « l'IGN publie un style plan-ign-clair » — le WMTS libre ne sert que `PLANIGNV2/normal` en raster ; atténué/gris/épuré sont des tuiles **vectorielles** (`PLAN.IGN`) que Leaflet ne rend pas sans MapLibre.
- **Geste** : règle CSS sur les 8 pages de choroplèthes ; corriger l'affirmation IGN. Côté lib : `tiles-style="muted"` accepté.

### AM-016 — « Pas de fond administratif embarqué pour une couche geoshape »
- **Prémisse fausse** : `map-chart` de DSFR Chart embarque des **SVG** (`MapChart.js` ~643 Ko, aucun GeoJSON ni coordonnées), pas des géométries réutilisables par Leaflet. Rien à « réutiliser ».
- **Raté** : la recette sans API existe dans le guide : GeoJSON simplifié statique (`guide/examples/data/regions-simplifiees.geojson`, 225 Ko) chargé par `<dsfr-data-source url=… transform="features">` (`carte-territoires-electrification-v2.html:141`) + couche `no-interactive`.
- **Geste** : appliquer la recette ; corriger le constat. Côté lib : livraison de GeoJSON simplifiés dans le paquet npm (hors bundle), `builtin` refusé.

### AM-043 — « Pas de moyen déclaratif de remplir un `<select>` depuis une source, ni de cascade »
- **Raté, et c'est le plus coûteux du rapport** : `dsfr-data-facets display="champ:select"` (`dsfr-data-facets.ts:1517`) **est** un `<select>` peuplé depuis la donnée, avec compteurs ; et en `server-facets` la **cascade existe** : chaque facette est refetchée avec le `where` des autres (l.755-767, `whereToFields`), région → département se restreint seul.
- **Ce qui reste vrai** : une facette ne pilote que sa propre `source`, elle ne sait pas parler à un `dsfr-data-context` — c'est exactement AM-001. Les 56 missions et 101 départements en dur viennent de là, pas d'un manque de peuplement.
- **Geste** : réécrire le constat comme un doublon d'AM-001 ; la solution retenue côté lib est `facets context="ctx"` (un seul bus de diffusion), pas `options-source`. La démonstration « Comptabilité générale sans `<option>` en dur » reste le critère d'acceptation, elle sera possible avec AM-001.

### AM-006 — « Pas de rappel des filtres actifs avec `dsfr-data-facets` »
- **Vrai** : `dsfr-data-context-tags` n'accepte qu'un contexte (`dsfr-data-context-tags.ts:57`) et facets n'émet aucun événement sur l'élément.
- **Deux affirmations inverses** : « `context-tags` fait l'équivalent [avec tout effacer] » — il n'a **pas** de « tout effacer » (l.70-90) ; et facets **a** déjà « Réinitialiser les filtres » (l.1404-1414). Le manque réel est seulement le récapitulatif en tags hors de la colonne.
- **Geste** : corriger le constat ; gratuit une fois AM-001 livré.

### AM-022 — « La discrétisation d'une choroplèthe n'est pas paramétrable »
- **Vrai** pour `dsfr-data-map-layer` geoshape `fill-field` : quantiles imposés, 9 classes, pas de légende (`dsfr-data-map-layer.ts:678`).
- **Faux** pour `dsfr-data-chart type="map"` sur deux points : `selected-palette` **agit** sur les cartes (`dsfr-data-chart.ts:532` le transmet, `MapChart.js:16855`) ; et l'échelle continue min→max est celle de DSFR Chart (`chroma.scale([colorLeft,colorRight])`), aucune prop `nb-classes` — limite amont, pas dsfr-data.
- **Geste** : réduire le constat à `map-layer` ; « `selected-palette` ne sert qu'aux catégorielles » est à retirer. Côté lib : `classes/method/breaks` + légende sur `map-layer`, issue amont chez DSFR Chart.

### AM-023 — « L'attribut `name` change de forme selon le type de graphique »
- **Faux dans un sens** : une chaîne simple est déjà acceptée sur les cartésiens et enveloppée automatiquement (`dsfr-data-chart.ts:539-548`, depuis 0.10.0) — `name="Taux"` marche partout. **Vrai dans l'autre** : sur les cartes le JSON est passé tel quel (l.544-545), d'où l'affichage littéral.
- **Geste** : réécrire « sur les cartésiens `name` attend un tableau JSON » ; contournement = chaîne simple partout. Correctif XS côté lib.

### PG-018 — « `group-by` client produit un groupe null que `count` inclut »
- **Raté** : `where="champ:isnotnull"` sur la **même** `dsfr-data-query` (l.774-777) — un attribut, zéro balise. L'agent le cite comme contournement : c'est la voie native.
- **Nuance non vue** : la clé de groupe ressort en `''` et non `null` (`dsfr-data-query.ts:793`), donc un `isnull` en aval ne l'attraperait pas. Côté lib, ce point est repris avec AM-005 (« Série N » vient de là).
- **Geste** : fusionner avec PG-015 en une entrée `piege` documentée ; retirer la demande `drop-null`.

### PG-015 — « Un `group_by` Opendatasoft renvoie un groupe null »
- **Voie native** : `where="champ is not null"` sur la `dsfr-data-source`, même balise. Un `drop-null` par défaut serait un masquage silencieux, contraire à la ligne de la lib (#301 : jamais de 0 silencieux). Côté lib, la réponse retenue est `empty-label="Non renseigné"` sur le graphique : rendre visible plutôt que supprimer.
- **Geste** : documenter le motif `isnotnull` comme « parité ods-chart » dans les pages ; pas de demande de suppression par défaut.

### AM-013 — « L'interface des facettes se rend là où la balise est écrite »
- **Choix de conception**, pas un manque : facets/search sont des composants visuels en light DOM (`dsfr-data-facets.ts:28-31, 176`) ; le pattern « orchestrateur invisible + UI libre câblée par `id` » existe déjà, c'est le contexte. Un `render-into` déplacerait focus, `aria-controls` et régions live (risque a11y 4/5). Refusé côté lib ; le remède à « l'ordre du fichier ne reflète plus le pipeline » est AM-001.
- **Geste** : convention de lecture (bloc pipeline commenté en tête, UI dans la mise en page).

## Les deux contournements à ne pas propager

### PG-014 — « champ brut dans `group-by`, fonction dans `select` »
Le bug est confirmé (les backquotes de `escapeOdsqlIdentifier` cassent `year(…)`, correctif accepté en P1). Mais le contournement du rapport **ne groupe pas par année** : il groupe par valeur de date distincte, et ne « marche » que parce que les jeux cités sont déjà annuels. Sur un jeu quotidien il produirait un graphique à 365 barres par an. À retirer des pages où il sert, et à ne pas inscrire dans le CLAUDE.md comme équivalent. Le seul contournement sûr en attendant : source générique `url=…/exports/json` + `params`.

### PG-013 — « défaut relevé à 10 000 quand `cluster` est actif »
Le plafond de 5 000 est documenté (`references/dsfr-data-map.md:78`) et protège des marqueurs DOM (`divIcon`), le fit et les popups — pas seulement le rendu. Ce qui est cassé, c'est le **bandeau** (« Zoomez » faux hors `bbox`, et répété dans chaque encart). Relever le défaut selon `cluster` est refusé ; la lib documentera « avec `cluster`, `max-items="20000"` est sans risque ». Les pages gardent leur `max-items` explicite.

## Enseignements transverses pour ce dépôt

1. **Lire le JSDoc de l'attribut, pas seulement la fiche du composant.** Quatre constats (AM-028, AM-031, AM-033, AM-042) tombent à cette seule lecture : les grammaires diffèrent d'un attribut à l'autre et le skill ne les rappelle pas toutes.
2. **Essayer `server-facets` avant d'écrire qu'une facette ne sait pas.** Cascade, select peuplé, facette annuelle : trois « manques » (AM-043, AM-024, une partie d'AM-003) sont des modes non essayés. C'est la règle n°1 du CLAUDE.md (« chercher l'architecture native avant »), appliquée cette fois à un attribut plutôt qu'à un modèle.
3. **Un `where` sur la balise déjà présente vaut mieux qu'un nouvel attribut** (PG-015, PG-018).
4. **Distinguer dsfr-data de DSFR Chart** (AM-022, AM-016, AM-037) : une limite de `map-chart` se remonte chez `GouvernementFR/dsfr-chart`, pas ici.
5. **Un contournement qui « marche » sur le jeu testé n'est pas un équivalent** (PG-014) : dire sur quel type de jeu il cesse de marcher.
