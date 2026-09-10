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

**Preuve au bundle publié** : la regex de bloc du moteur est
`/\{\{#(if|unless)\s+…\}\}([\s\S]*?)\{\{\/\1\s*\}\}/g` — elle ne connaît **que**
`if` et `unless`. Absente de 0.20.0, présente dès 0.22.0 (#664). Il n'y a donc pas de `#each`,
et ce n'est pas un oubli de documentation.
*Demande : `{{#each champ}}…{{/each}}`, ou un pipe `{{champ:tags}}` qui rende N éléments.*
FEI porte **trois** champs multivalués qui structurent visuellement la fiche et le panneau.

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

## 13. Aucune maille géographique non française n'est livrée ni documentée

**Établi par** : `fei-projets-europeens-donnees.md`.

`packages/core/geo/` ne contient que `regions.json` et `departements.json` (#688). Le motif
« fond administratif » du guide ne parle que de contours français. Le seul recours hors France
est `map-monde`, c'est-à-dire le planisphère sans cadrage (entrée 8). La seule carte non
française du portail oblige donc l'auteur à produire et maintenir son propre GeoJSON d'Europe.
*Demande : `geo/europe.json` sur le modèle de #688, nom français en propriété.*

## 14. Aucun référentiel « nom de pays en français → ISO 3166-1 alpha-2 »

**Établi par** : `fei-projets-europeens-donnees.md`.

`toIsoA2` convertit l'alpha-3 et le numérique, mais **ne connaît aucun nom**. Or aucun jeu
français ne stocke des codes ISO : il stocke « Allemagne », « slovénie ». La table de 66 lignes
écrite à la main dans le template ODS d'origine est la conséquence directe de ce manque, et
chaque réutilisateur la réécrira.
*Demande : `geo/pays-iso.json`, ou un `code-field-lookup="nom-fr"`.*

## 15. Aucun opérateur d'« année scolaire »

**Établi par** : `capytale-usages.md` et `dnma-usages-ent.md`.

Tous les opérateurs de `dsfr-data-context-filter` raisonnent en année **civile** ou en fenêtre
glissante. `year-of` est ici activement trompeur : il coupe l'année scolaire en deux, en
silence. `between` fonctionne, mais impose un `<select>` dont les bornes sont écrites à la main.

**L'année scolaire est l'unité de temps de tout ce portail** — c'est la différence structurelle
la plus nette avec Bercy, qui n'a pas ce découpage. Rien dans le backlog ne l'aborde.
*Demande : `operator="school-year"`, ou un `year-start-month` sur les opérateurs existants.*

## 16. Les compteurs de facette ne veulent rien dire sur une table de mesures

**Établi par** : `dnma-usages-ent.md`.

La facette `academie` compte des lignes UAI × semaine : « Lille 326 879 » se lit comme un
volume d'usage et classe Lille devant Versailles, **qui a pourtant plus de visites**. Aucun
attribut ne pondère une facette par une mesure, ni ne masque un compte qui n'a pas de sens.

C'est un écart de **modèle de donnée**, pas de fonctionnalité : les jeux de Bercy sont « une
ligne = un objet », où le compte **est** l'information. Trois jeux de ce portail dépassent
3 millions de lignes sur le modèle inverse (une ligne = une mesure datée).
*Demande : `weight-field` sur `dsfr-data-facets`, ou un masquage automatique des compteurs
assorti d'un avertissement.*

---

## Ce que ce résidu dit du banc d'essai

Le résidu se range en trois familles, et aucune ne ressemble aux 53 demandes du lot 10.

**Des asymétries et des silences** (entrées 1, 2, 3, 6, 11, 12) : une capacité qui existe sur
un composant et pas sur son voisin (`refine-on-click` sur la carte mais pas sur la liste ;
`time-mode="cumulative"` sur la couche mais pas sur `query`), une documentation juste à un
endroit et fausse à l'autre, un échec qui ne se signale pas. Aucune n'est un « la bibliothèque
ne sait pas faire ». Un second portail ne redemande pas les mêmes fonctions : il montre où
l'édifice est inégal.

**Ce qui tient au domaine** (entrées 13, 14, 15) : l'éducation compte en **années scolaires**,
et un de ses jeux regarde vers l'**Europe**. Ni l'un ni l'autre n'existait à Bercy. Ce ne sont
pas des cas exotiques — l'année scolaire est l'unité de temps de tout le portail.

**Ce qui tient au modèle de donnée** (entrée 16, et l'entrée 7 par ricochet) : Bercy publie des
**objets** (une ligne = une entreprise, un point de vente, un marché), où compter les lignes
répond à la question. Ce portail publie aussi des **mesures** (une ligne = un UAI × une
semaine), où compter les lignes ne répond à rien et induit en erreur. Trois jeux dépassent
3 millions de lignes sur ce modèle. C'est l'apport le moins prévisible du lot, et le plus
structurant : il ne se corrige pas par un attribut de plus, il demande que les composants
sachent qu'un compte peut être dénué de sens.
