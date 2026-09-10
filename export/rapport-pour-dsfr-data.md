# Rapport au projet `dsfr-data` — issues restantes et garde-fous à documenter

> Source : banc d'essai [open-data-viz](https://github.com/bmatge/open-data-viz), **deux portails
> Opendatasoft de l'État** confrontés à `dsfr-data` — data.economie.gouv.fr (30 entrées, 24
> reproduites, lots 1 à 11) et data.education.gouv.fr (36 entrées auditées et transposées, lot 12),
> plus la montée en 0.24.0 puis 0.25.0 et la migration des pages (lot 13).
> Registre complet : `public/data/retours.json`, **142 constats**, chacun avec le champ `verifie`
> qui dit l'observation qui l'établit. Rapport rédigé le 2026-09-10.

Ce rapport contient deux choses, indépendantes l'une de l'autre :

1. **[Les issues](#1-issues)** — ce que le banc a fait remonter, ce qui est livré, ce qui reste.
2. **[Les garde-fous](#2-garde-fous)** — la matière d'une skill et d'une page de documentation,
   avec une proposition de découpage argumentée contre les skills existantes.

---

# 1. Issues

## 1.1 Ce qui est déjà livré — 49 constats corrigés

Le banc a déposé 53 demandes au lot 10 ; **51 issues citant le banc d'essai sont fermées**. Par
version de livraison, telle qu'inscrite au registre :

| Version | Constats corrigés |
|---|---:|
| 0.21.1 | 18 |
| 0.22.0 | 15 |
| 0.23.0 | 9 |
| 0.24.0 | 5 |
| 0.25.0 | 2 |

**Les deux de 0.25.0 méritent d'être signalées comme des succès nets**, parce qu'elles ont été
mises en production dans la foulée :

- **AM-011 → #689 `fetch-mode="export"`.** C'était la demande de sévérité haute la plus ancienne
  encore ouverte. Le banc contournait en écrivant ses sources en mode générique (`url=` vers
  `/exports/json` + `params`), ce qui achetait la requête unique **au prix du mode adaptateur**.
  **15 pages, 30 sources** ont été migrées vers la voie native ; aucune valeur de KPI n'a bougé.
- **AM-035 → #690 `require-where`.** Mis en œuvre sur la page de l'impôt sur le revenu, qui
  s'ouvrait sur la somme de toutes les cases d'une déclaration — un chiffre sans aucun sens.

Trois entrées du registre ont aussi été **requalifiées de « limite » à « corrigé »** parce que la
bibliothèque avait résolu le problème sans que le banc s'en aperçoive : **PG-014** (`group-by`
avec une fonction ODSQL, #641), **AM-039** (conditionnelle de template, #664) et **AM-017** (fond
de carte atténué, #686). Cela dit quelque chose du canal de retour : *le banc ne sait pas
spontanément quand une de ses demandes est satisfaite.* Une ligne « résout le constat X du banc
d'essai » dans les notes de version suffirait.

## 1.2 Ce qui reste — 25 demandes cadrées

Toutes sont dans `export/issues-dsfr-data.md`, rédigées pour être collées telles quelles, avec
impact, objectif métier, pérennité, critères d'acceptation, effort et priorité. **19 des 25
viennent du portail Éducation** — c'est le rendement de l'exercice sur un second portail.

### P1 — sept demandes

| Id | Effort | Origine | Demande |
|---|---|---|---|
| **AM-048** | S | Éducation | **Aucun diagnostic quand un attribut désigne un champ inexistant.** Cinq pages, quatre relectures indépendantes, le même mode d'échec. Le volet Diagnostic (#602, #693) existe : c'est sa place naturelle. **Le mieux étayé de tout le lot.** |
| **AM-053** | S | Éducation | **Un attribut inconnu d'un composant est ignoré sans aucun avertissement.** Une page peut être écrite juste, contre une doc juste, et ne rien faire, parce que le bundle chargé est antérieur à l'attribut. |
| **AM-052** | S | Éducation | **La fiche servie par le MCP est en retard sur la doc du dépôt.** `get_skill(dsfrDataMap)` ne mentionne pas `refine-on-click`, `context`, `label` ni `dsfr-data-map-select`, que `skills/dsfr-data/references/dsfr-data-map.md` documente. **Trois agents induits en erreur le même jour**, dont un jusqu'à la rédaction d'un faux manque. |
| **AM-050** | S | Éducation | **Aucun opérateur d'année scolaire.** Tous les opérateurs raisonnent en année civile ; `year-of` coupe l'année scolaire en son milieu, en silence. C'est l'unité de temps de tout un portail. |
| **AM-045** | M | Éducation | **La sélection ne part que d'une carte.** `refine-on-click` existe sur `dsfr-data-map-layer` depuis 0.23.0 ; ni `dsfr-data-list`, ni `dsfr-data-display`, ni `dsfr-data-chart` n'ont d'équivalent, alors que le bus de contexte est ouvert. |
| **AM-049** | M | Éducation | **Ratio dont les deux membres viennent de deux sources.** #673 est explicitement mono-source (corps de l'issue lu). C'est le motif de tout indicateur « par habitant », donc de toute comparaison entre territoires de tailles différentes. 13 indicateurs sur 40 d'une seule page. |
| **BUG-005** | S | Bercy | Le refine d'une facette serveur sur un champ date est typé texte → HTTP 400 silencieux. |

### P2 — huit demandes
`AM-046` (le cumul existe, mais seulement dans un `_bucketDate` privé de la couche carte, et
#671 l'exclut explicitement) · `BUG-006` (un champ multivalué : les facettes éclatent, un
`group-by` client compte les combinaisons) · `AM-047` (pas de boucle de template) ·
`AM-051` (compteurs de facette dénués de sens sur une table de mesures) · `BUG-007`
(`replace-fields` sans effet sur un nombre) · `AM-056` (champ de filtre variable par source) ·
`AM-044` · `PG-022`.

### P3 — sept · P4 — trois
`PG-016`, `LIM-011`, `AM-054`, `AM-057`, `AM-058`, `AM-059`, `AM-060` · `AM-037`, `AM-061`, `AM-062`.

## 1.3 Trois réserves, à ne pas déposer en l'état

- **BUG-008** (`map-reg` attend de l'ISO 3166-2 et non l'INSEE ; les clés de `map-aca` sont
  désaccentuées) est **établi par lecture du bundle DSFR Chart, non rejoué au navigateur**. Les
  conséquences, elles, sont mesurées : 3 académies perdues sur 32 sur une page, 9 sur 35 sur une
  autre, `getSkippedCount()` à 0 dans les deux cas. **À confirmer avant dépôt**, et à scinder :
  la désaccentuation relève de `dsfr-data`, les territoires absents du découpage relèvent de
  `GouvernementFR/dsfr-chart`.
- **AM-055** (`map-monde` sans attribut de cadrage) et **AM-063** (pas d'échelle logarithmique)
  relèvent probablement de `dsfr-chart`. Laissés ouverts exprès.

## 1.4 Ce que le banc a retiré de lui-même — 12 critiques

`FP-001` à `FP-012` : douze critiques invalidées **par vérification**, dont plusieurs sévères. Elles
restent au registre avec le motif de leur retrait. C'est la contrepartie honnête des demandes
ci-dessus, et le taux vaut d'être connu : sur les 16 constats que le projet `dsfr-data` avait
contestés au lot 11, **onze visaient une capacité qui existait**.

---

# 2. Garde-fous

## 2.1 Le constat qui organise tout : les échecs sont muets

Deux portails, treize lots, 142 constats. En les relisant, **la famille la plus nombreuse et la
plus coûteuse n'est pas celle des fonctions manquantes** : c'est celle des comportements qui ne
produisent **aucun signal**. Une page écrite de travers rend un résultat plausible, et rien ne
distingue « il n'y a pas de donnée » de « votre attribut ne fait rien ».

C'est un axe que les skills existantes ne couvrent pas :

| Skill existante | Axe | Ce qu'elle range |
|---|---|---|
| `troubleshooting` | **le symptôme** | « le graphique est vide », « la carte ne s'affiche pas » |
| `attributeGrammars` | **l'attribut** | la grammaire exacte de `split`, `round`, `display`… |
| *(proposée)* | **le silence** | ce qui échoue sans le dire, et comment s'en apercevoir |

La différence n'est pas cosmétique : on ne cherche pas dans `troubleshooting` tant qu'on **n'a pas
de symptôme**, et le propre de ces cas est qu'il n'y en a pas. Le seul moment où l'on peut les
attraper est **avant** d'écrire, ou par une recette qui compare des chiffres.

## 2.2 Matière : les dix-sept échecs muets relevés

Chacun a été rencontré en production sur au moins une page, et le registre en porte l'observation.

**Troncatures silencieuses**
1. **`max-records`, plafond 1 000 par défaut** — tronque sans un mot. Rencontré **trois fois**,
   dont deux pendant la migration vers `fetch-mode="export"` du lot 13 : deux pages affichaient
   1 000 lignes sur 3 604 et sur 3 708. *Repasser en mode adaptateur fait de nouveau s'appliquer
   ce plafond* — c'est le piège que la correction d'un autre piège fait apparaître.
2. **`max-items` d'une couche carte, 5 000** — tronque avec un bandeau « zoomez » qui ne charge
   rien de plus.
3. **`total_count` faux sur un agrégat ODS** — la pagination s'arrêtait à la première page
   (BUG-001, corrigé #641).
4. **KPI `count` derrière un `limit` ou une page** — compte la limite, pas la donnée (PG-017,
   corrigé #659 par `meta:total` et un avertissement).

**Grammaires**
5. **Le séparateur d'entrées change d'un attribut à l'autre** : `|` pour `labels` et `display`,
   `,` pour `split`, `round`, `fields`, **`;` pour `compute`**. Une grammaire fausse est ignorée
   sans erreur : `display="a:select, b:select"` rend **zéro** select (PG-022).
6. **`replace-fields` est sans effet sur une valeur numérique** — `_normalizeRow` ne visite que
   les chaînes (BUG-007).
7. **`color-map` découpe sur la virgule**, que des libellés métier contiennent (LIM-011).
8. **`select=count(*)` sans `group_by`** renvoie la valeur répétée une fois par ligne.

**Références et champs**
9. **Un attribut désignant un champ inexistant ne produit rien** — cinq pages (AM-048).
10. **`map-reg` attend de l'ISO 3166-2, pas l'INSEE** ; **`map-aca` des clés désaccentuées** :
    carte grise, `getSkippedCount()` **à 0** (BUG-008, à confirmer).
11. **Un groupe `null`** rend une barre sans libellé et décale les comptes (PG-015).

**Versions et modes**
12. **Un attribut d'une version non chargée est ignoré sans erreur** (AM-053). Le dépôt a vécu
    quatre versions mineures de retard sans s'en apercevoir.
13. **`fetch-mode="export"` ne se combine pas avec `server-side`** — celui-là *est* signalé en
    console, et c'est exactement ce qu'il faut faire ailleurs.
14. **`year-of` / `month-of` nourris par une date complète** donnaient un filtre silencieusement
    absent (AM-029, corrigé #646 — qui avertit désormais).

**Rendu**
15. **Une règle `display:` de page écrase le `:host` d'un composant** (PG-011).
16. **`fit-bounds` + `max-bounds` sur une emprise réduite à un point** ne zoomait pas (BUG-004,
    corrigé #642).
17. **Le `name` d'un `dsfr-data-chart` en forme JSON** s'affiche littéralement sur les cartes
    (AM-023, corrigé #653).

> **Ce que la liste suggère au projet**, au-delà de la documentation : neuf de ces dix-sept sont
> détectables à la construction du pipeline. Le volet Diagnostic (#602, #693) est le bon endroit,
> et **AM-048 + AM-053 en couvriraient six à eux deux**.

## 2.3 Les six règles de méthode

Elles ne parlent pas de la bibliothèque mais de la façon de l'évaluer. Elles ont toutes été
apprises en se trompant.

1. **Avant de classer en limite : est-ce la bibliothèque, ou d'avoir voulu transposer le modèle
   Opendatasoft à l'identique ?** ODS impose un contexte unique ; `dsfr-data` propose plusieurs
   architectures. Transposer le modèle puis en imputer le coût à la bibliothèque produit des
   critiques fausses. **C'est la règle la plus rentable : elle a retiré douze critiques.**
2. **Lire le JSDoc de l'attribut, pas la fiche du composant.** Les grammaires diffèrent d'un
   attribut à l'autre, et la fiche peut être en retard sur le code (AM-052).
3. **Quatre verdicts, à ne jamais confondre** : *natif* (faux problème) · *natif mais postérieur
   à la version chargée* (montée de version chez l'appelant, pas une demande) · *prévu à un
   jalon* (citer l'issue) · *absent du source* (demande légitime). Vérifier dans quelle **version
   publiée** un attribut apparaît : `npm pack dsfr-data@<v>` puis grep dans `package/dist/`.
4. **Chronométrer avant de conclure sur la performance.** Le poids transféré et le nombre
   d'allers-retours sont deux choses différentes, et c'est presque toujours le second qui coûte.
   Corollaire contre-intuitif, mesuré deux fois : **un `select` étroit peut être plus lent que
   l'export complet** quand il force le portail à projeter.
5. **Vérifier au navigateur, et faire défiler.** Cartes et graphiques se rendent **à la
   visibilité** : une mesure prise trop tôt voit du vide. Trois faux positifs en une journée sont
   venus de là, dont un qui a failli faire annuler une montée de version saine.
6. **Une recette qui crie au loup cesse d'être crue.** Un harnais de non-régression doit
   distinguer ce qui est fiable (valeurs de KPI, erreurs de configuration) de ce qui ne l'est pas
   (comptes d'éléments à rendu différé). Implémentation de référence :
   `scripts/recette-pages.mjs` du banc d'essai.

## 2.4 Proposition concrète

### Une skill — `piegesSilencieux`

`apps/builder-ia/src/skills.ts` est la source de vérité ; `skills/dsfr-data/references/` est
**régénéré** (`build-skills-claude.ts` fait un `rmSync`), donc rien ne doit y être écrit à la main.

```ts
piegesSilencieux: {
  id: 'piegesSilencieux',
  name: 'Échecs silencieux — ce qui ne marche pas sans le dire',
  description:
    "Les cas où le composant rend un résultat plausible et faux sans aucun message : troncature "
    + "(max-records, max-items, total_count agrégé), grammaire d'attribut invalide ignorée, "
    + "champ inexistant, clé hors référentiel de carte, attribut d'une version non chargée, "
    + "replace-fields sans effet sur un nombre. À lire AVANT d'écrire, pas après.",
  trigger: [
    'silencieux', 'sans erreur', 'tronqu', 'incomplet', 'chiffre faux', 'valeur fausse',
    'ne fait rien', 'ignoré', 'carte grise', 'vide sans message', 'plafond', 'max-records',
    'max-items', 'pourquoi 1000', 'compte faux', 'total faux',
  ],
  sections: { guide: '…', pieges: '…', reference: '…' },
}
```

Le corps reprend le § 2.2, **une entrée par piège**, chacune sous la même forme : *ce qu'on écrit
· ce qu'on obtient · comment s'en apercevoir · la voie correcte*. Le troisième champ est le plus
important et c'est celui qui manque partout ailleurs.

**Découpage proposé avec l'existant, pour ne pas dupliquer** — `troubleshooting` garde les
symptômes visibles et **renvoie** à `piegesSilencieux` en tête (« si vous n'avez pas de symptôme
mais un doute sur un chiffre, voir… ») ; `attributeGrammars` garde les grammaires exactes et
`piegesSilencieux` s'y **réfère** au lieu de les recopier. La skill neuve n'apporte qu'une chose,
mais qui n'existe nulle part : **le mode de détection**.

### Une page de documentation — `docs/PIEGES-ET-VERIFICATION.md`

Deux sections, et la seconde est celle qui manque le plus :

- **« Erreurs communes »** — le § 2.2 en tableau, rangé par famille (troncature, grammaire,
  référence, version, rendu), avec pour chacune la ligne de vérification qui l'attrape.
- **« Vérifier une page avant de la croire »** — le § 2.3 : les quatre verdicts, le chronométrage,
  le rendu différé, et le principe d'une recette de non-régression. Le banc d'essai peut fournir
  `scripts/recette-pages.mjs` comme point de départ : il charge chaque page, attend la
  stabilisation du DOM, relève erreurs console, erreurs de configuration, valeurs de KPI et
  comptes de rendu, et compare deux états.

> **Une remarque de fond pour finir.** Sur les 142 constats, ceux qui ont le plus coûté ne sont
> presque jamais des fonctions absentes — ce sont des **asymétries** (une capacité présente sur un
> composant et pas sur son voisin) et des **silences**. Une bibliothèque déclarative est jugée sur
> sa prévisibilité autant que sur son étendue : un attribut qui n'existe pas se découvre en une
> minute, un attribut qui existe et ne fait rien se paie en heures — et parfois en chiffres faux
> publiés.
