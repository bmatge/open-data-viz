# Le résidu du lot 12 — ce que le portail Éducation révèle et que Bercy n'a pas montré

**C'est le produit du lot.** Le backlog `dsfr-data` (22 issues ouvertes, jalons v0.24.0 et
v0.25.0) a été écrit à partir d'un seul portail. Auditer un second n'a d'intérêt que par ce
qui en sort et qui n'y était pas. Tout ce qui est déjà natif ou déjà planifié est écarté ici
et documenté dans `_CIBLE-0.25.md`.

Inventaire provisoire au 2026-09-10, une entrée par constat, avec la page qui l'établit et
l'observation qui le fonde. **Rien n'entre ici sans observation** (règle du dépôt : pas de
champ `verifie`, pas d'entrée). Les entrées marquées ⚠️ ne sont pas encore rejouées au
navigateur et ne doivent pas être déposées en l'état.

## 1. Sélection d'une ligne de liste vers un détail — l'asymétrie la plus nette

**Établi par** : `educajou-ecolemap.md`, recoupé par `carto-pix-fiche-etablissement.md`.

`refine-on-click`, `context` et `label` existent sur **`dsfr-data-map-layer`** depuis 0.23.0
(#681, ADR-104) : cliquer un point diffuse une clé à N sources via le contexte. **Ni
`dsfr-data-list` ni `dsfr-data-display` n'ont d'équivalent**, alors que le bus de contexte est
ouvert et que l'interface `ContextFilterLike` est en place. Conséquence : « liste → détail »
n'est pas faisable en balises, alors que « carte → détail » l'est.

C'est un motif au moins aussi courant que le second, et il est le seul disponible quand la
donnée n'est pas géographique. Le portail Éducation en compte plusieurs (annuaires, palmarès,
fiches d'établissement atteintes autrement que par la carte).

## 2. Cumul et agrégation temporelle hors carte

**Établi par** : `tne-dashboard.md` (cumul mensuel écrit en douze expressions de template),
recoupé par `educajou-ecolemap.md`.

`time-field`, `time-bucket` (`hour` … `year`) et `time-mode="cumulative"` existent — **mais
seulement sur `dsfr-data-map-layer`, dans un `_bucketDate` privé**. Rien d'équivalent sur
`dsfr-data-query` ni `dsfr-data-chart`. Et ce n'est pas un oubli qui se rattrapera au jalon
v0.24.0 : **#671 exclut explicitement le cumul de sa grammaire** (« par ligne uniquement :
pas de fenêtre, cumul ni ligne précédente »), en renvoyant les besoins inter-lignes à `query`
— qui ne sait pas le faire non plus.

Il y a donc un trou assumé entre deux composants. La capacité existe déjà dans le code, sur le
mauvais composant. À arbitrer : la remonter dans la grammaire commune, ou l'exposer sur
`query`/`chart`.

## 3. `group-by` client sur un champ multivalué : deux comportements dans le même pipeline

**Établi par** : `educajou-ecolemap.md`.

Sur un même champ multivalué, `dsfr-data-facets` **éclate** les valeurs (3 modalités) tandis
qu'un `group-by` client **compte les combinaisons** (8 lignes). Deux réponses différentes à la
même question, dans le même pipeline, sans que rien ne le signale. `dsfr-data-unpivot` ne
s'y applique pas : il travaille sur des noms de colonnes, pas sur des cellules.

## 4. Un tag par valeur d'un champ multivalué dans un template

**Établi par** : `fei-projets-europeens-donnees.md`.

Aucune boucle dans le moteur de templates, donc aucun moyen de rendre « une pastille DSFR par
thème » à partir d'un champ multivalué. Le pipe `join` (#663) produit une chaîne, pas N
éléments. Pas de contournement propre — le motif est très courant sur les fiches.

## 5. Colorer une cellule selon un seuil dans `dsfr-data-list`

**Établi par** : `capytale-usages.md`.

`threshold-*` n'existe que sur le KPI ; `compute` ne fait pas de condition (et #671, qui l'y
ajoutera, produit une **valeur**, pas une classe CSS) ; CSS ne compare pas de nombres. Un
tableau dont une colonne doit signaler un dépassement n'a pas de voie déclarative.
À rapprocher de #671 sans être couvert par lui : il faudra vérifier au jalon si une valeur
calculée peut alimenter un attribut de classe.

## 6. `replace-fields` est silencieusement sans effet sur un nombre

**Établi par** : `etablissements-euroscol.md` (six drapeaux `int` 0/1).

`_normalizeRow` ne visite que `typeof value === 'string'`. Un `replace-fields` sur une colonne
numérique **ne fait rien, sans erreur ni avertissement**. Correctif, pas fonctionnalité.
Distinct de #676, qui traite l'échappement `%3A` et non le typage.

Conséquence pratique : même après #677 (`fold`), une facette bâtie sur ces colonnes affichera
« 0 » et « 1 ». D'où la demande jumelle : **`value-labels` sur `dsfr-data-facets`**.

## 7. Cartes thématiques : le code attendu n'est pas celui de la donnée ⚠️

**Établi par** : `fei-chiffres-cles.md` et `cactus-hameconnage.md` — **par lecture du code
`dsfr-data` et du bundle DSFR Chart, non rejoué au navigateur.**

- `type="map-reg"` attend des codes **ISO 3166-2** (`IDF`, `GES`, `ARA`… `20R`), pas l'INSEE :
  un `code_region="44"` produit une carte **entièrement grise, sans erreur, avec
  `getSkippedCount() = 0`** — `_processMapData` ne valide que le vide hors `type="map"`.
- `map-aca` : ses 30 clés sont **désaccentuées et en capitales** (`ORLEANS-TOURS`, `BESANCON`,
  `REUNION`) alors que les jeux écrivent « Orléans-Tours », « La Réunion ». Mesuré sur Cactus :
  4 académies et 153 opérations muettes.

Le silence est le vrai défaut : une carte grise sans compteur d'écarts est indétectable.
**Avant dépôt** : rejouer au navigateur, puis trancher ce qui relève de
`GouvernementFR/dsfr-chart` plutôt que de `dsfr-data` (règle n° 4 du lot 11).

## 8. `map-monde` ne se cadre pas

**Établi par** : `fei-projets-europeens-donnees.md` — la seule carte non française du portail
(44 projets européens).

`dsfr-data-chart type="map-monde"` rend le **planisphère entier** ; aucun attribut de cadrage,
de zone ou de bbox. Une carte d'Europe est donc impossible autrement qu'en repassant à
`dsfr-data-map` + un GeoJSON Europe en `geoshape no-interactive`.
**Probablement à remonter chez `GouvernementFR/dsfr-chart`** — à trancher.

## 9. Pas de contrôle de bascule du fond de carte

**Établi par** : `educajou-ecolemap.md`.

Six préréglages de tuiles existent et réagissent à chaud, mais aucun composant ne les expose à
l'utilisateur. L'original (comme la plupart des portails) offre ce choix.

## 10. Plein écran et capture d'une carte

**Établi par** : `annuaire-des-internats.md` et `educajou-ecolemap.md` — **deux occurrences,
à fusionner en une entrée** (règle « fusionner avant d'ajouter »).

## 11. La fiche servie par le MCP est en retard sur le dépôt

**Établi par** : `offre-formation-langues.md` et `carto-pix-fiche-etablissement.md` — **deux
agents induits en erreur le même jour**, dont un a écrit un faux manque avant correction.

`get_skill(dsfrDataMap, "reference")` sert une référence de `dsfr-data-map-layer` **sans**
`refine-on-click`, `context`, `label` ni l'événement `dsfr-data-map-select`, alors que
`skills/dsfr-data/references/dsfr-data-map.md` les documente. Ce n'est pas un manque de
documentation : c'est un **décalage entre la doc du dépôt et celle que sert le MCP**, ce qui
est plus insidieux, parce que le lecteur consciencieux qui interroge le MCP obtient une réponse
fausse par omission.

Demande associée : que la génération des fiches du MCP soit tenue à jour depuis le source, ou
qu'elle porte la version dont elle est issue.

## 12. Un attribut d'une version non chargée échoue en silence

**Établi par** : `offre-formation-langues.md` (vérifié : en 0.20.0, `refine-on-click`,
`context` et `label` sont ignorés **sans aucune erreur console**).

Même famille que PG-022 (grammaire fausse silencieuse) et que `max-records` qui tronque sans le
dire. Une page peut être écrite juste, contre une doc juste, et ne rien faire.
Demande : un avertissement de développement sur attribut inconnu d'un composant `dsfr-data`.

---

## Ce que ce résidu dit du banc d'essai

Six des douze entrées (1, 2, 3, 6, 11, 12) sont des **asymétries ou des silences** : une
capacité qui existe sur un composant et pas sur son voisin, une doc qui existe à un endroit et
pas à l'autre, un échec qui ne se signale pas. Aucune n'est un « la bibliothèque ne sait pas
faire ». C'est la différence de nature avec les 53 demandes du lot 10, qui portaient sur des
fonctionnalités manquantes — et c'est ce qu'un second portail apporte : il ne redemande pas les
mêmes fonctions, il montre où l'édifice est inégal.
