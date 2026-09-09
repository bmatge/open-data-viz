# Demandes à déposer sur bmatge/dsfr-data

> Fichier généré par `node scripts/build-retours.mjs` depuis `public/data/retours.json`.
> 12 demandes — 2 bugs, 10 améliorations.
> Chaque bloc est rédigé pour être collé tel quel dans une issue.

## BUG-001 — Pagination arrêtée à la première page sur une requête agrégée Opendatasoft

**Labels suggérés** : `bug`, `severity:haute`, `opendatasoft-adapter`

### Contexte

Constat issu du banc d'essai [open-data-viz](https://github.com/bmatge/open-data-viz) —
reproduction du catalogue de visualisations de data.economie.gouv.fr.
Rencontré sur : decp-augmente.

### Constat

Sur un `group_by`, l'API Opendatasoft renvoie un `total_count` égal à la TAILLE DE PAGE (100), pas au nombre réel de groupes. La boucle de `fetchAll` (packages/core/src/adapters/opendatasoft-adapter.ts:143) s'arrête sur `allResults.length >= totalCount` et ne récupère donc que la première page. L'avertissement de pagination incomplète compare lui aussi au totalCount faux : il ne se déclenche pas. Résultat : des agrégats silencieusement tronqués.

### Observation

Tableau croisé `source × nature × procedure` sur decp_augmente = 235 groupes réels (mesurés en paginant à la main). Page construite dessus : une seule requête émise, KPI affiché 632 062 au lieu de 994 123 marchés. Aucun message en console.

### Contournement actuel

Aucun côté appelant : ni `limit` ni `max-records` ne changent la condition d'arrêt. Il faut rester sous 100 groupes (les croisements deux à deux de DECP tiennent : source×nature = 47, source×procedure = 79, nature×procedure = 83).

### Demande

Sur une requête agrégée (présence de `group_by`), ne se fier qu'à `pageResults.length < pageSize` pour arrêter la boucle, et ignorer `total_count`.

---

## BUG-002 — L'en-tête `apikey` n'est pas réécrit à l'exécution : préflight CORS refusée

**Labels suggérés** : `bug`, `severity:haute`, `dsfr-data-source`, `providers`

### Contexte

Constat issu du banc d'essai [open-data-viz](https://github.com/bmatge/open-data-viz) —
reproduction du catalogue de visualisations de data.economie.gouv.fr.
Rencontré sur : catalogue.

### Constat

`headers='{"apikey":"…"}'` — la forme que suggère la documentation de l'attribut `headers` — échoue : Opendatasoft n'autorise que `Authorization` dans son `Access-Control-Allow-Headers`, donc le navigateur refuse la préflight. La bibliothèque SAIT corriger ça (`normalizeProviderAuthHeaders`, packages/shared/src/providers/index.ts:198, qui réécrit en `Authorization: Apikey <clé>`), mais la fonction n'est appelée que dans l'interface du builder, pas dans le chemin d'exécution.

### Observation

Console navigateur : « Request header field apikey is not allowed by Access-Control-Allow-Headers in preflight response » puis `TypeError: Failed to fetch`. Préflight OPTIONS testée au curl : `access-control-allow-headers: Authorization, X-Requested-With, Origin, …` — pas d'`apikey`.

### Contournement actuel

`api-key-ref` + `window.DSFR_DATA_KEYS = { 'ods-mef': 'Apikey <clé>' }`, qui pose directement l'en-tête `Authorization`.

### Demande

Appeler `normalizeProviderAuthHeaders` dans l'adaptateur au moment de construire la requête, pas seulement dans l'UI du builder.

---

## AM-001 — Un `dsfr-data-facets` ne peut piloter qu'une seule source

**Labels suggérés** : `enhancement`, `severity:haute`, `dsfr-data-facets`, `dsfr-data-context`

### Contexte

Constat issu du banc d'essai [open-data-viz](https://github.com/bmatge/open-data-viz) —
reproduction du catalogue de visualisations de data.economie.gouv.fr.
Rencontré sur : decp-augmente.

### Constat

C'est le dernier obstacle réel pour un tableau de bord bâti sur plusieurs agrégations serveur. Les facettes émettent leur commande `where` vers leur source amont uniquement. `dsfr-data-context` sait diffuser à N sources, mais exige qu'on fournisse soi-même l'interface ET les valeurs : `dsfr-data-context-filter` lit un `<select>` ou un `<input>` (packages/core/src/components/dsfr-data-context-filter.ts:283), il ne sait pas s'abonner à un composant de facettes. Les deux mécanismes ne se composent pas.

### Observation

Sur DECP, les quatre graphiques s'appuient sur quatre agrégations distinctes. Avec des facettes, une seule se refiltre. Avec un contexte, les quatre se refiltrent mais les valeurs des trois listes déroulantes sont écrites à la main.

### Contournement actuel

Écrire les valeurs de filtre en dur dans des `<select>` DSFR pilotés par `dsfr-data-context`. Elles ne suivent pas l'évolution du jeu de données.

### Demande

Soit un attribut `apply-to`/`context` sur `dsfr-data-facets` pour diffuser à N sources ; soit un `dsfr-data-context-filter` capable de peupler ses valeurs depuis `/facets` et de rendre une UI de facettes.

---

## AM-002 — `max-records` tronque en silence

**Labels suggérés** : `enhancement`, `severity:haute`, `dsfr-data-source`, `opendatasoft-adapter`

### Contexte

Constat issu du banc d'essai [open-data-viz](https://github.com/bmatge/open-data-viz) —
reproduction du catalogue de visualisations de data.economie.gouv.fr.
Rencontré sur : plan-de-relance.

### Constat

Le plafond par défaut de l'adaptateur Opendatasoft est de 1 000 enregistrements. Un jeu de 3 080 lignes se charge donc au tiers, sans erreur ni indication visuelle : la page affiche des chiffres faux avec l'aplomb de chiffres justes. C'est le piège le plus coûteux rencontré.

### Observation

Constaté en écrivant la page Plan de relance : sans `max-records="3500"`, KPI et carte ne portent que 1 000 des 3 080 projets.

### Contournement actuel

Fixer `max-records` explicitement dès qu'un jeu peut dépasser 1 000 lignes — donc savoir à l'avance combien il en contient.

### Demande

Un avertissement console systématique quand la troncature est effective (un `console.warn` existe mais dépend d'un `total_count` que l'API ne fournit pas toujours — voir BUG-001), et idéalement un état visible sur le composant.

---

## AM-003 — `server-facets` pourrait découvrir seul les champs de facettes

**Labels suggérés** : `enhancement`, `severity:moyenne`, `dsfr-data-facets`

### Contexte

Constat issu du banc d'essai [open-data-viz](https://github.com/bmatge/open-data-viz) —
reproduction du catalogue de visualisations de data.economie.gouv.fr.
Rencontré sur : decp-augmente.

### Constat

En mode `server-facets`, l'attribut `fields` est obligatoire (pas d'auto-détection). Or l'endpoint `/facets` d'Opendatasoft renvoie déjà la liste des facettes déclarées au back-office avec leurs valeurs : c'est exactement ce dont `ods-facets` se sert pour ne demander aucune configuration.

### Observation

`GET /api/explore/v2.1/catalog/datasets/decp_augmente/facets` renvoie 7 facettes nommées (source, formeprix, nature, procedure, datenotification, natureobjetmarche, nomacheteur) sans qu'on ait rien précisé.

### Contournement actuel

Nommer les champs à la main — coût faible, mais c'est la dernière ligne qui sépare de l'équivalence stricte avec `ods-facets`.

### Demande

Rendre `fields` facultatif en mode `server-facets` : sans lui, exposer les facettes que l'endpoint renvoie.

---

## AM-004 — Pas d'agrégat « valeurs distinctes »

**Labels suggérés** : `enhancement`, `severity:moyenne`, `dsfr-data-kpi`, `dsfr-data-query`

### Contexte

Constat issu du banc d'essai [open-data-viz](https://github.com/bmatge/open-data-viz) —
reproduction du catalogue de visualisations de data.economie.gouv.fr.
Rencontré sur : plan-de-relance.

### Constat

Les fonctions d'agrégation sont avg, sum, count, min, max, first, last (packages/core/src/utils/aggregations.ts:9). Pas de `distinct`. Pour un KPI « N départements concernés », `value="nom_departement:distinct"` est ignoré en silence.

### Observation

Première écriture de la page Plan de relance : le KPI restait vide, sans message.

### Contournement actuel

Intercaler un `dsfr-data-query group-by="nom_departement"` et compter ses lignes avec `value="count"`. Le pipeline reste lisible.

### Demande

Ajouter `distinct` (ou `count-distinct`) à la grammaire commune, et signaler une fonction inconnue au lieu de l'ignorer.

---

## AM-005 — Les valeurs nulles apparaissent en légende sous le nom de repli « Série N »

**Labels suggérés** : `enhancement`, `severity:moyenne`, `dsfr-data-chart`

### Contexte

Constat issu du banc d'essai [open-data-viz](https://github.com/bmatge/open-data-viz) —
reproduction du catalogue de visualisations de data.economie.gouv.fr.
Rencontré sur : plan-de-relance, decp-augmente.

### Constat

21 des 3 080 projets n'ont pas de `type_entreprise` ; le camembert les regroupe sous « Série 4 », le libellé par défaut de DSFR Chart, au lieu de « Non renseigné ». Sur une page publique, c'est une coquille visible.

### Observation

Légende du camembert « Répartition par type d'entreprise ». Vérifié à l'API : `group_by=type_entreprise` renvoie bien un groupe `null` de 21 lignes.

### Contournement actuel

Aucun de propre : `dsfr-data-normalize` travaille sur des motifs de chaînes (`replace`, `replace-fields`), pas sur `null`. Il faut filtrer les lignes ou nettoyer à la source.

### Demande

Un attribut de libellé pour les valeurs manquantes (ex. `empty-label="Non renseigné"`) sur le graphique, ou une option `null-as` sur `dsfr-data-normalize`.

---

## AM-006 — Pas de rappel des filtres actifs avec `dsfr-data-facets`

**Labels suggérés** : `enhancement`, `severity:moyenne`, `dsfr-data-facets`, `dsfr-data-context-tags`

### Contexte

Constat issu du banc d'essai [open-data-viz](https://github.com/bmatge/open-data-viz) —
reproduction du catalogue de visualisations de data.economie.gouv.fr.
Rencontré sur : plan-de-relance.

### Constat

Opendatasoft affiche un `ods-filter-summary` : les filtres actifs en tags supprimables, avec un bouton « tout effacer ». `dsfr-data-context-tags` fait l'équivalent, mais uniquement pour `dsfr-data-context`. Une page filtrée par facettes n'a aucun récapitulatif.

### Observation

Page Plan de relance : après trois cases cochées dans trois facettes différentes, rien ne résume l'état courant hors de la colonne de filtres.

### Contournement actuel

Aucun sans JavaScript.

### Demande

Faire accepter à `dsfr-data-context-tags` une source de type `dsfr-data-facets`, ou fournir un `dsfr-data-facets-tags`.

---

## AM-008 — `bbox` ne filtre pas le premier chargement

**Labels suggérés** : `enhancement`, `severity:moyenne`, `dsfr-data-map-layer`

### Contexte

Constat issu du banc d'essai [open-data-viz](https://github.com/bmatge/open-data-viz) —
reproduction du catalogue de visualisations de data.economie.gouv.fr.
Rencontré sur : plan-de-relance.

### Constat

La commande `in_bbox` part sur `moveend`/`zoomend` (packages/core/src/components/dsfr-data-map-layer.ts:505). Au chargement, la source a déjà récupéré sa première page sans filtre géographique : sur un gros jeu, les premiers points affichés ne sont pas ceux du viewport.

### Observation

Page de test : au chargement `plan-de-relance/records?limit=100` (sans in_bbox), carte centrée sur Paris mais les 100 cercles rendus étaient hors cadre. Le `in_bbox` n'apparaît qu'après le premier déplacement.

### Contournement actuel

Poser un `where` initial sur la source, ou accepter un premier rendu approximatif.

### Demande

Émettre la commande bbox une fois la carte prête, avant ou à la place du premier fetch de la source.

---

## AM-007 — Pas de conditionnelle dans les templates de `dsfr-data-display`

**Labels suggérés** : `enhancement`, `severity:basse`, `dsfr-data-display`

### Contexte

Constat issu du banc d'essai [open-data-viz](https://github.com/bmatge/open-data-viz) —
reproduction du catalogue de visualisations de data.economie.gouv.fr.
Rencontré sur : catalogue.

### Constat

Le moteur gère `{{champ}}`, `{{champ|défaut}}`, `{{champ:number}}` et les chemins pointés, mais pas de `ng-if`. Toute logique d'affichage doit être précalculée en données.

### Observation

Page catalogue : la logique « lien interne ou externe ? quel badge ? » a été déplacée dans `public/data/registre.json` (`repro_url`, `repro_cible`, `repro_badge`).

### Contournement actuel

Précalculer en données — ce qui est la bonne pratique, et rend le template lisible.

### Demande

À arbitrer : soit une conditionnelle minimale, soit documenter explicitement « précalculer en données » comme la réponse officielle. Le contournement étant meilleur que le problème, la deuxième option se défend.

---

## AM-009 — `fit-bounds` pourrait clipper automatiquement quand `insets` est déclaré

**Labels suggérés** : `enhancement`, `severity:basse`, `dsfr-data-map`

### Contexte

Constat issu du banc d'essai [open-data-viz](https://github.com/bmatge/open-data-viz) —
reproduction du catalogue de visualisations de data.economie.gouv.fr.
Rencontré sur : plan-de-relance.

### Constat

Avec des données ultramarines, `fit-bounds` seul embrasse la Polynésie et la Nouvelle-Calédonie : la métropole devient un point au milieu de l'Atlantique. Il faut ajouter `max-bounds` à la main. Or déclarer `insets="drom"` dit déjà que l'outre-mer est traité à part.

### Observation

Première version de la page Plan de relance, capture d'écran à l'appui : vue centrée sur l'océan.

### Contournement actuel

`max-bounds="41,-5.5,51.5,10"`, documenté mais non évident.

### Demande

Quand `insets` est renseigné, restreindre par défaut le calcul de `fit-bounds` aux points hors territoires d'encart.

---

## AM-010 — La rangée d'encarts territoriaux est à l'étroit

**Labels suggérés** : `enhancement`, `severity:basse`, `dsfr-data-map-inset`

### Contexte

Constat issu du banc d'essai [open-data-viz](https://github.com/bmatge/open-data-viz) —
reproduction du catalogue de visualisations de data.economie.gouv.fr.
Rencontré sur : plan-de-relance.

### Constat

Les cinq mini-cartes DROM et leurs libellés se tassent sur la gauche du conteneur au lieu de s'étaler sur sa largeur ; les libellés se chevauchent.

### Observation

Capture de `dsfr-data-map` en 896 px de large : les encarts occupent les 330 premiers pixels.

### Contournement actuel

Aucun sans CSS externe.

### Demande

Répartir les encarts sur la largeur disponible.
