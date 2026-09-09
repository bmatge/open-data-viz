# Demandes à déposer sur bmatge/dsfr-data

> Fichier généré par `node scripts/build-retours.mjs` depuis `public/data/retours.json`.
> 47 demandes — 4 bugs, 43 améliorations.
> Chaque bloc est rédigé pour être collé tel quel dans une issue.

## BUG-001 — Pagination arrêtée à la première page sur une requête agrégée Opendatasoft

**Labels suggérés** : `bug`, `severity:haute`, `opendatasoft-adapter`

### Contexte

Constat issu du banc d'essai [open-data-viz](https://github.com/bmatge/open-data-viz) —
reproduction du catalogue de visualisations de data.economie.gouv.fr.
Rencontré sur : decp-augmente, comptabilite-generale.

### Constat

Sur un `group_by`, l'API Opendatasoft renvoie un `total_count` égal à la TAILLE DE PAGE (100), pas au nombre réel de groupes. La boucle de `fetchAll` (packages/core/src/adapters/opendatasoft-adapter.ts:143) s'arrête sur `allResults.length >= totalCount` et ne récupère donc que la première page. L'avertissement de pagination incomplète compare lui aussi au totalCount faux : il ne se déclenche pas. Résultat : des agrégats silencieusement tronqués.

### Observation

Deux cas. (1) DECP : tableau croisé `source × nature × procedure` = 235 groupes réels ; une page bâtie dessus n'émet qu'une requête et affiche 632 062 marchés au lieu de 994 123, sans message. (2) Comptabilité générale : le graphique « postes × année » compte 264 groupes — c'est le premier cas où le bug BLOQUE réellement une reproduction, le graphique principal de la page n'aurait montré qu'un tiers des données.

### Contournement actuel

**Trouvé au lot 3** : `/exports/json` accepte `group_by` et renvoie TOUS les groupes en une requête — 264 groupes en 0,5 s. Écrire la source en mode générique (`url=` vers `/exports/json` + `params`) contourne donc entièrement le bug. En mode adaptateur, aucun contournement : ni `limit` ni `max-records` ne changent la condition d'arrêt.

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

## BUG-004 — `fit-bounds` + `max-bounds` : la carte ne zoome jamais sur une sélection réduite à un point

**Labels suggérés** : `bug`, `severity:haute`, `dsfr-data-map`

### Contexte

Constat issu du banc d'essai [open-data-viz](https://github.com/bmatge/open-data-viz) —
reproduction du catalogue de visualisations de data.economie.gouv.fr.
Rencontré sur : prix-des-carburants, qualite-tourisme, tourisme-et-handicap, entreprises-restauration-notre-dame, annuaire-services-dgfip, entreprise-patrimoine-vivant, centres-controle-technique, plan-de-relance, fermeture-reseau-cuivre.

### Constat

Quand `max-bounds` est posé (ce que le CLAUDE.md impose dès qu'un jeu a des DROM), `clipBoundsForFit` intersecte l'emprise des données avec la zone et renvoie null si `south >= north || west >= east`. Une sélection d'un seul point — ou de plusieurs points au même endroit — a une emprise de surface nulle : la condition est vraie, le fit est ignoré, la vue ne bouge pas. Or c'est le résultat le plus courant d'une recherche par commune sur un annuaire. Les trois annuaires du lot 2 sont touchés.

### Observation

Navigateur, page prix-des-carburants avec `fit-bounds max-bounds="41,-5.5,51.5,10"` : facette Occitanie → zoom 7 centré 43.76,2.30 (le fit marche) ; recherche « Montgenèvre » (1 station, layerBounds 6.733,44.934,6.733,44.934) → zoom 5, centre inchangé. Après retrait de `max-bounds` : zoom 18 centré 44.93,6.73. Source : `packages/core/src/components/dsfr-data-map.ts`, `clipBoundsForFit`, `if (south >= north || west >= east) return null`.

### Contournement actuel

Vérifié sur une variante de la page Prix des carburants sans `max-bounds` ni `insets` (le jeu est purement métropolitain : 0 point hors [41–51.5, -6–10]) : Leaflet zoome alors au maximum sur le point. La page retenue garde `max-bounds` par cohérence avec le gabarit ; huit pages sont touchées. Au lot 9, la page Prix des carburants applique ce contournement (jeu 100 % métropolitain vérifié par `where=not in_bbox(geom,41,-5.5,51.5,10)` → 0 station) : zoom 18 sur une commune à station unique.

### Demande

—

---

## BUG-003 — Les graphiques cartographiques journalisent une erreur de parsing à chaque chargement

**Labels suggérés** : `bug`, `severity:basse`, `dsfr-data-chart`

### Contexte

Constat issu du banc d'essai [open-data-viz](https://github.com/bmatge/open-data-viz) —
reproduction du catalogue de visualisations de data.economie.gouv.fr.
Rencontré sur : prix-des-carburants, fiscalite-locale.

### Constat

Un `dsfr-data-chart` de type cartographique (`map`, `map-reg`) émet en console « Erreur lors du parsing des données data: SyntaxError: "undefined" is not valid JSON » à chaque chargement de page. La carte s'affiche correctement une fois les données arrivées : le composant DSFR Chart est manifestement instancié avec un attribut `data` encore indéfini, avant la première émission de la source. Sans conséquence fonctionnelle, mais une erreur console permanente masque les vraies — et elle se multiplie : la page Fiscalité locale, qui porte deux cartes, en produit quatre.

### Observation

Reproduit sur une page minimale ne contenant qu'une source et un `dsfr-data-chart type="map-reg"` : une erreur, systématique. Confirmé sur `type="map"` (page Fiscalité locale, 4 occurrences pour 2 cartes). Les graphiques `bar`, `line` et `pie` des autres pages n'en produisent aucune.

### Contournement actuel

Aucun ; l'erreur est cosmétique.

### Demande

Ne créer le composant `map-chart` qu'une fois les données disponibles, ou passer un tableau vide plutôt qu'`undefined`.

---

## AM-001 — Un `dsfr-data-facets` ne peut piloter qu'une seule source

**Labels suggérés** : `enhancement`, `severity:haute`, `dsfr-data-facets`, `dsfr-data-context`

### Contexte

Constat issu du banc d'essai [open-data-viz](https://github.com/bmatge/open-data-viz) —
reproduction du catalogue de visualisations de data.economie.gouv.fr.
Rencontré sur : decp-augmente, fiscalite-locale.

### Constat

C'est le dernier obstacle réel pour un tableau de bord bâti sur plusieurs agrégations serveur. Les facettes émettent leur commande `where` vers leur source amont uniquement. `dsfr-data-context` sait diffuser à N sources, mais exige qu'on fournisse soi-même l'interface ET les valeurs : `dsfr-data-context-filter` lit un `<select>` ou un `<input>` (packages/core/src/components/dsfr-data-context-filter.ts:283), il ne sait pas s'abonner à un composant de facettes. Les deux mécanismes ne se composent pas. La page Fiscalité locale en donne la forme la plus visible : ses cartes s'appuient sur des agrégats départementaux et son tableau sur les 174 668 lignes brutes en pagination serveur ; filtrer le tableau sur un département ne recadre pas les cartes, et inversement. La page d'origine, elle, partage un contexte : tout se refiltre ensemble. Précision du lot 9 : `dsfr-data-context-filter` n'a aucun opérateur de recherche textuelle (`OPERATORS` = eq, in, lt, gte, between, month-of, year-of, lt-day-after, last-n-days, current-year), donc une facette à des milliers de valeurs (nomAcheteur sur DECP) n'a d'équivalent qu'une liste écrite en dur des 20 premières.

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

## AM-011 — L'adaptateur Opendatasoft devrait charger par `/exports/json`, pas par 31 requêtes paginées

**Labels suggérés** : `enhancement`, `severity:haute`, `opendatasoft-adapter`, `dsfr-data-source`

### Contexte

Constat issu du banc d'essai [open-data-viz](https://github.com/bmatge/open-data-viz) —
reproduction du catalogue de visualisations de data.economie.gouv.fr.
Rencontré sur : plan-de-relance, qualite-tourisme, tourisme-et-handicap, restauration-notre-dame, comptabilite-generale, prix-des-carburants, fiscalite-locale, entreprise-patrimoine-vivant, annuaire-services-dgfip, barometre-france-num, signalconso, rappelconso, centres-controle-technique.

### Constat

En mode adaptateur, un chargement complet passe par `/records` avec `limit=100` et un `offset` croissant : la boucle de `fetchAll` est strictement séquentielle (packages/core/src/adapters/opendatasoft-adapter.ts:121). Pour 3 080 lignes, cela fait 31 allers-retours l'un après l'autre. Or Opendatasoft expose `/exports/json`, qui renvoie le jeu entier en une requête, accepte `select`, et répond en CORS `*`.

### Observation

Chronométrage en navigateur sur la même page : 31 requêtes, concurrence maximale 1, durée moyenne 931 ms (max 3 721 ms — la pagination profonde se dégrade), 28,9 s passées dans les requêtes contre 37 ms entre elles. Le poids n'y est pour rien : un `select` divisant le transfert par 3,7 n'a fait gagner aucune seconde. La même page basculée sur `/exports/json` : 1 requête, 0,62 s, 185 Ko. Lot 3 : `/exports/json` avec `group_by=postes, year(annee) as an` sur 517 489 lignes renvoie les 264 groupes en 0,50 s.

### Contournement actuel

Écrire la source en mode générique (`url=` vers `/exports/json` + `params` pour le `select`) au lieu du mode adaptateur. On y perd la délégation serveur du `where`/`order-by` — sans conséquence quand toute la page travaille côté client.

### Demande

Quand la source demande un chargement complet (pas de `server-side`, pas de pagination), utiliser `/exports/json` plutôt que la boucle sur `/records`. L'endpoint accepte AUSSI `group_by`, `select` et `where` : il couvre donc à la fois le chargement de lignes et les agrégations, et règle du même coup BUG-001. À défaut, paralléliser les pages une fois `total_count` connu : 8 requêtes concurrentes prennent 0,44 s contre 2,4 s en série.

---

## AM-043 — Pas de moyen déclaratif de remplir un `<select>` depuis une source, ni de cascade entre selects

**Labels suggérés** : `enhancement`, `severity:haute`, `dsfr-data-context-filter`, `dsfr-data-facets`

### Contexte

Constat issu du banc d'essai [open-data-viz](https://github.com/bmatge/open-data-viz) —
reproduction du catalogue de visualisations de data.economie.gouv.fr.
Rencontré sur : comptabilite-generale, fiscalite-locale, barometre-france-num, aide-publique-developpement, decp-augmente, rappel-conso-tableau-de-bord, prix-controle-technique.

### Constat

Les `<select>` qui pilotent un `dsfr-data-context` sont écrits en dur : 56 missions, 101 départements, 119 questions, 20 agences… générés hors ligne depuis l'API. Une cascade région → département reste du JavaScript. C'est la conséquence la plus coûteuse d'AM-001, et la friction la plus répétée du banc d'essai (sept pages).

### Observation

Trois pages du lot 9 avec options générées par script ; `dsfr-data-facets` ne pilote que sa propre source (source vérifié).

### Contournement actuel

Générer les options depuis un `group_by` de l'API au moment d'écrire la page (script de construction).

### Demande

—

---

## AM-003 — `server-facets` pourrait découvrir seul les champs de facettes

**Labels suggérés** : `enhancement`, `severity:moyenne`, `dsfr-data-facets`

### Contexte

Constat issu du banc d'essai [open-data-viz](https://github.com/bmatge/open-data-viz) —
reproduction du catalogue de visualisations de data.economie.gouv.fr.
Rencontré sur : decp-augmente, fiscalite-locale, rappelconso, prix-controle-technique.

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
Rencontré sur : plan-de-relance, decp-augmente, restauration-notre-dame, comptabilite-generale, barometre-france-num, signalconso.

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

## AM-007 — Pas de conditionnelle dans les templates : les liens optionnels deviennent un défaut d'accessibilité

**Labels suggérés** : `enhancement`, `severity:moyenne`, `dsfr-data-display`

### Contexte

Constat issu du banc d'essai [open-data-viz](https://github.com/bmatge/open-data-viz) —
reproduction du catalogue de visualisations de data.economie.gouv.fr.
Rencontré sur : catalogue, qualite-tourisme, tourisme-et-handicap, restauration-notre-dame, entreprise-patrimoine-vivant, annuaire-services-dgfip, centres-controle-technique, rappelconso.

### Constat

Le moteur de template gère `{{champ}}`, `{{champ|défaut}}`, `{{champ:number}}` et les chemins pointés, mais pas de conditionnelle. Sur la page catalogue, cela obligeait seulement à précalculer les données — un déplacement de complexité acceptable. Les trois pages d'annuaire du lot 2 en montrent la vraie conséquence : `site_web` est vide pour une partie des établissements, et `<a href="{{site_web}}">` produirait alors un lien vide, qui pointe vers la page courante et qu'un lecteur d'écran annonce comme un lien valide. Sur la page Tourisme & Handicap, consacrée à l'accessibilité, l'ironie est complète.

### Observation

Champ `site_web` absent d'une partie des enregistrements des trois jeux d'annuaire. Le contournement retenu — afficher l'URL en texte plutôt qu'en lien — est visible sur les cartes et les panneaux de détail des trois pages.

### Contournement actuel

Précalculer en données quand c'est possible (page catalogue), ou renoncer au lien et afficher la valeur en texte (pages d'annuaire). Aucune des deux solutions ne restitue un lien cliquable quand la valeur existe.

### Demande

Au minimum, une conditionnelle de présence (`{{#si champ}}…{{/si}}`) pour envelopper un fragment. À défaut, un mécanisme dédié aux liens optionnels, le cas étant fréquent dans les annuaires publics.

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

## AM-012 — La recette CDN recommandée charge Chart.js pour rien

**Labels suggérés** : `enhancement`, `severity:moyenne`, `skills`, `documentation`

### Contexte

Constat issu du banc d'essai [open-data-viz](https://github.com/bmatge/open-data-viz) —
reproduction du catalogue de visualisations de data.economie.gouv.fr.
Rencontré sur : decp-augmente, plan-de-relance, synthese, retours, qualite-tourisme, tourisme-et-handicap, restauration-notre-dame, comptabilite-generale, prix-des-carburants, fiscalite-locale, entreprise-patrimoine-vivant, annuaire-services-dgfip, barometre-france-num, signalconso, rappelconso, centres-controle-technique.

### Constat

La skill `compositionPatterns` prescrit six dépendances CDN « dans cet ordre exact », dont `chart.js@4.4.1` avant `@gouvfr/dsfr-chart@2.1.1`. Or DSFR Chart 2.1.1 embarque déjà Chart.js : le script séparé pèse 201 Ko et ne sert à rien.

### Observation

Les quatre pages du dépôt privées de `chart.umd.min.js` : les huit graphiques (barres, barres horizontales, camemberts) se dessinent tous — vérifié en lisant les pixels du canvas, pas seulement la présence de la balise. `window.Chart` est `undefined`, donc rien d'autre ne s'appuyait sur la variable globale.

### Contournement actuel

Retirer la ligne. 201 Ko économisés par page.

### Demande

Corriger la recette CDN de la skill : retirer `chart.js`, ou préciser dans quel cas il reste nécessaire.

---

## AM-015 — Cliquer un objet de la carte ne filtre pas les autres vues

**Labels suggérés** : `enhancement`, `severity:moyenne`, `dsfr-data-map-layer`

### Contexte

Constat issu du banc d'essai [open-data-viz](https://github.com/bmatge/open-data-viz) —
reproduction du catalogue de visualisations de data.economie.gouv.fr.
Rencontré sur : restauration-notre-dame.

### Constat

Opendatasoft offre `refine-on-click-context`, `refine-on-click-context-field` et `refine-on-click-map-field` : cliquer un objet de la carte pose un filtre sur le contexte, donc sur toutes les vues de la page. `dsfr-data-map-layer` n'a pas d'équivalent — un clic ouvre une popup ou un panneau, il n'émet aucune commande vers la source. Sur une cartographie d'annuaire, c'est l'interaction attendue : je clique un point, la liste et les compteurs se recentrent dessus.

### Observation

Attributs `refine-on-click-*` présents sur la couche entreprises de la page d'origine. Aucun attribut correspondant dans la référence de `dsfr-data-map-layer`, et aucun événement de commande émis au clic (la couche n'émet que vers le compagnon popup).

### Contournement actuel

Aucun sans JavaScript.

### Demande

Un attribut du type `refine-on-click="champ"` sur la couche, qui émettrait la même commande `where` que les facettes vers la source amont.

---

## AM-017 — Aucun fond de carte neutre parmi les préréglages

**Labels suggérés** : `enhancement`, `severity:moyenne`, `dsfr-data-map`

### Contexte

Constat issu du banc d'essai [open-data-viz](https://github.com/bmatge/open-data-viz) —
reproduction du catalogue de visualisations de data.economie.gouv.fr.
Rencontré sur : restauration-notre-dame, plan-de-relance, qualite-tourisme, tourisme-et-handicap, prix-des-carburants, entreprise-patrimoine-vivant, annuaire-services-dgfip, centres-controle-technique.

### Constat

Les préréglages sont `ign-plan`, `ign-ortho`, `ign-cadastre`, `osm-fr`, `osm-standard`, `opentopomap` — tous très détaillés. `carto-positron`, le fond clair et neutre, est déprécié et redirige vers `ign-plan`. Or une carte thématique a besoin d'un fond qui s'efface : sur `ign-plan`, les aplats régionaux de la page Notre-Dame sont quasi invisibles et les grappes de points se disputent l'attention avec le réseau routier. Les cartes d'origine du portail utilisent `jawg.light`, précisément pour cette raison.

### Observation

Couche régions rendue (26 polygones confirmés par `getRenderedCount()`) mais illisible à l'écran sur `ign-plan`, même en remontant l'opacité. Le préréglage `carto-positron` émet un avertissement de dépréciation et bascule sur `ign-plan`.

### Contournement actuel

Une URL de tuiles personnalisée avec `tiles-attribution` — mais on sort alors des fonds souverains, ce qui annule l'avantage principal de la bibliothèque sur ce terrain.

### Demande

Un préréglage clair et neutre, souverain de préférence (l'IGN publie un style `plan-ign-clair`), pour que la donnée thématique reste lisible.

---

## AM-018 — Pas d'arithmétique entre séries (actif − passif, taux d'évolution)

**Labels suggérés** : `enhancement`, `severity:moyenne`, `dsfr-data-query`, `dsfr-data-normalize`

### Contexte

Constat issu du banc d'essai [open-data-viz](https://github.com/bmatge/open-data-viz) —
reproduction du catalogue de visualisations de data.economie.gouv.fr.
Rencontré sur : comptabilite-generale.

### Constat

La page d'origine calcule dans son template l'écart actif − passif par année, puis son taux d'évolution d'une année sur l'autre. Côté dsfr-data, `dsfr-data-normalize compute` fait de l'arithmétique LIGNE À LIGNE sur des valeurs brutes ; il ne sait ni comparer deux séries, ni accéder à la ligne précédente. Reproduire l'écart demande deux sources, un `dsfr-data-join` sur l'année et un `compute` — quatre balises pour une soustraction. Le taux d'évolution, qui suppose un décalage d'une ligne, reste hors de portée.

### Observation

Documentation de `compute` : « Hors périmètre : conditions, fonctions, calculs sur valeurs agrégées. » Les KPI d'évolution de la page d'origine n'ont pas été reproduits.

### Contournement actuel

Deux sources + `dsfr-data-join` + `compute` pour une différence. Rien pour une variation temporelle.

### Demande

Des colonnes calculées portant sur des séries : différence entre deux séries d'un même group-by, et accès décalé (`lag`) pour les évolutions — le besoin le plus fréquent d'un tableau de bord financier ou statistique.

---

## AM-022 — La discrétisation d'une choroplèthe n'est pas paramétrable

**Labels suggérés** : `enhancement`, `severity:moyenne`, `dsfr-data-chart`

### Contexte

Constat issu du banc d'essai [open-data-viz](https://github.com/bmatge/open-data-viz) —
reproduction du catalogue de visualisations de data.economie.gouv.fr.
Rencontré sur : fiscalite-locale.

### Constat

`ods-color-gradient` expose le nombre de classes (`nb-classes`), les couleurs de début et de fin (`low`, `high`) et la méthode de discrétisation. `dsfr-data-chart type="map"` applique un dégradé continu qu'on ne paramètre pas : ni seuils, ni quantiles, ni nombre de paliers, ni palette. Sur des taux d'imposition dont la distribution est resserrée, un dégradé linéaire écrase les écarts que des quantiles feraient ressortir. Lot 9 : la choroplèthe communale de Fiscalité locale (698 contours en `geoshape fill-field`) confirme — quantiles imposés par `quantileBreaks(values, palette.length)`, aucune légende dans le DOM, là où l'original a 4 classes égales, une palette par taxe et une légende chiffrée.

### Observation

Carte « taux moyen TFB par département » : légende continue de 21,21 à 63,2 %, la quasi-totalité des départements dans une nuance indiscernable. Aucun attribut de la référence de `dsfr-data-chart` ne concerne la discrétisation ; `selected-palette` n'agit que sur les séries catégorielles.

### Contournement actuel

Aucun. On peut pré-calculer des classes en amont et passer à un rendu catégoriel, mais on perd la légende continue.

### Demande

Exposer sur les types cartographiques le nombre de classes et la méthode (linéaire, quantiles, seuils manuels), à l'image de `ods-color-gradient`.

---

## AM-025 — Une jointure sur des clés de types différents échoue sans rien dire

**Labels suggérés** : `enhancement`, `severity:moyenne`, `dsfr-data-join`

### Contexte

Constat issu du banc d'essai [open-data-viz](https://github.com/bmatge/open-data-viz) —
reproduction du catalogue de visualisations de data.economie.gouv.fr.
Rencontré sur : barometre-france-num.

### Constat

`code_unifie` est un entier dans `questions-reponses` et une chaîne dans `bfn-2022-resultats-2022`. `dsfr-data-join` compare les valeurs sans harmoniser les types : aucune ligne ne s'apparie. En jointure gauche, le symptôme est particulièrement discret — le nombre de lignes reste exact, seules les colonnes jointes sont vides.

### Observation

`questions-reponses` renvoie `code_unifie: 201` (int), `bfn-2022-resultats-2022` renvoie `'201'` (str). Jointure sans correction : 0 ligne appariée, aucun message. Après `dsfr-data-normalize numeric="code_unifie"` : 237 lignes appariées.

### Contournement actuel

`dsfr-data-normalize numeric="<clé>"` du côté où la clé est une chaîne.

### Demande

Comparer les clés de jointure après normalisation de type (au minimum nombre ↔ chaîne numérique), ou avertir en console quand les deux côtés n'ont pas le même type.

---

## AM-026 — Pas d'indicateur de couverture sur une jointure

**Labels suggérés** : `enhancement`, `severity:moyenne`, `dsfr-data-join`

### Contexte

Constat issu du banc d'essai [open-data-viz](https://github.com/bmatge/open-data-viz) —
reproduction du catalogue de visualisations de data.economie.gouv.fr.
Rencontré sur : barometre-france-num.

### Constat

Rien n'indique quelle proportion des lignes de gauche a trouvé une correspondance à droite. C'est pourtant le seul signal capable d'alerter sur une jointure qui « fonctionne » mais rapproche des clés homonymes désignant des choses différentes (voir PG-009).

### Observation

Sur le Baromètre, la jointure appariait 237 lignes sur 1 065 et 9 questions sur 119. Ce taux de 22 % aurait dû alerter immédiatement ; il a fallu comparer les deux jeux à la main pour le calculer.

### Contournement actuel

Compter soi-même dans la console du navigateur.

### Demande

Exposer le taux d'appariement sur le composant (attribut de diagnostic ou `console.info`), et l'afficher dans le volet Diagnostic prévu par l'epic #602 de dsfr-data.

---

## AM-027 — Une carte ignore en silence les lignes sans code géographique

**Labels suggérés** : `enhancement`, `severity:moyenne`, `dsfr-data-chart`

### Contexte

Constat issu du banc d'essai [open-data-viz](https://github.com/bmatge/open-data-viz) —
reproduction du catalogue de visualisations de data.economie.gouv.fr.
Rencontré sur : signalconso.

### Constat

L'agrégation Signal Conso par département renvoie un groupe dont le `dep_code` est nul : 95 309 signalements, soit 5,5 % du total. La carte les écarte sans rien afficher, et le total qu'elle représente n'est donc pas celui du KPI affiché juste au-dessus. C'est le pendant cartographique du piège des valeurs nulles (AM-005) : sur un graphique elles deviennent « Série N », sur une carte elles disparaissent.

### Observation

`group_by=dep_code, dep_name` sur signalconso : premier groupe `{dep_code: null, n: 95309}`. Carte rendue sans mention, KPI total à 1 733 022.

### Contournement actuel

Compter soi-même les lignes sans code et l'indiquer en note, ou les exclure explicitement par un `where` pour que les chiffres concordent.

### Demande

Signaler, sur le composant ou en console, le nombre de lignes écartées faute de code géographique reconnu — l'écart entre total et total cartographié est une source d'erreur classique.

---

## AM-029 — Les opérateurs de date `year-of` et `month-of` refusent une date complète

**Labels suggérés** : `enhancement`, `severity:moyenne`, `dsfr-data-context-filter`

### Contexte

Constat issu du banc d'essai [open-data-viz](https://github.com/bmatge/open-data-viz) —
reproduction du catalogue de visualisations de data.economie.gouv.fr.
Rencontré sur : rappel-conso-tableau-de-bord.

### Constat

`year-of` n'accepte que « AAAA », `month-of` que « AAAA-MM », `lt-day-after` que « AAAA-MM-JJ ». Un tableau de bord daté (« au 9 septembre : total, année en cours, mois en cours ») a besoin des trois à partir d'une seule date. Un `<input type="date">` ne peut pas les nourrir, et la valeur au mauvais format ne produit ni erreur ni avertissement : `monthRange`/`yearRange` renvoient null, la clause est vide, le filtre est simplement absent. Le compteur « année » affiche alors le total sans que rien ne le signale.

### Observation

Source `dsfr-data-context-filter.ts` : `monthRange` teste `/^(\d{4})-(\d{2})$/`, `yearRange` teste `/^\d{4}$/`, retour null → `buildColonWhere` renvoie ''. En navigateur, avec les champs cachés : `where=date_publication < "2026-09-10" AND date_publication >= "2026-01-01" AND date_publication < "2027-01-01"` sur rc-annee, 2 402 fiches, chiffre égal à la facette date_publication=2026 de l'API. Page : /viz/rappel-conso-tableau-de-bord (reproduction fidèle de la page vivante /pages/rappel-conso-v2/, variante de /viz/rappelconso).

### Contournement actuel

Deux `<input type="hidden">` (AAAA et AAAA-MM) dérivés de la date par un script de dix lignes, qui dispatche un `change` sur chacun. C'est le seul JavaScript de la page Rappel Conso.

### Demande

—

---

## AM-031 — Les formats de KPI n'ont pas de réglage de décimales : `euro` arrondit à l'unité

**Labels suggérés** : `enhancement`, `severity:moyenne`, `dsfr-data-kpi`

### Contexte

Constat issu du banc d'essai [open-data-viz](https://github.com/bmatge/open-data-viz) —
reproduction du catalogue de visualisations de data.economie.gouv.fr.
Rencontré sur : prix-des-carburants.

### Constat

`format="euro"` passe par `Intl.NumberFormat` avec `maximumFractionDigits: 0` : un prix moyen du gazole s'affiche « 2 € ». `format="decimal"` impose 1 à 2 décimales : « 2,29 » à côté de « 2,1 » (pour 2,10), et la troisième décimale des prix à la pompe est perdue. Aucun attribut ne règle le nombre de décimales ni l'unité.

### Observation

Source `packages/shared/src/utils/formatters.ts` : `formatCurrency` → `minimumFractionDigits: 0, maximumFractionDigits: 0` ; `formatDecimal` → 1 à 2. Navigateur : KPI E10 rendu « 2,1 » quand la moyenne vaut 2,10, Gazole « 2,29 » (API : 2,2942).

### Contournement actuel

`format="decimal"` avec l'unité écrite dans `label` (« € / litre »).

### Demande

—

---

## AM-032 — Les encarts territoriaux n'ont pas de largeur par défaut : ils s'écrasent à la largeur de leur libellé

**Labels suggérés** : `enhancement`, `severity:moyenne`, `dsfr-data-map-inset`

### Contexte

Constat issu du banc d'essai [open-data-viz](https://github.com/bmatge/open-data-viz) —
reproduction du catalogue de visualisations de data.economie.gouv.fr.
Rencontré sur : entreprises-restauration-notre-dame, prix-des-carburants, qualite-tourisme, tourisme-et-handicap.

### Constat

`dsfr-data-map-inset` se pose en `display:inline-block` sans largeur, et la mini-carte interne n'en a pas non plus : chaque encart prend la largeur de son libellé, de 48 px (Guyane) à 77 px (Guadeloupe), pour 160 px de haut. Les trois annuaires du lot 2 vivaient avec depuis leur livraison ; AV-003 (« encarts en un attribut ») a été écrit sans regarder leur rendu de près.

### Observation

`getBoundingClientRect()` des cinq encarts : 77×188, 69×188, 48×188, 70×188, 53×188 sur les pages prix-des-carburants ET qualite-tourisme ; 160×188 chacun après la règle de page.

### Contournement actuel

Règle de page : `dsfr-data-map-inset { width: 10rem; margin: .5rem .5rem 0 0 }`.

### Demande

—

---

## AM-034 — Pas de compteur du total en mode serveur

**Labels suggérés** : `enhancement`, `severity:moyenne`, `dsfr-data-kpi`, `dsfr-data-source`

### Contexte

Constat issu du banc d'essai [open-data-viz](https://github.com/bmatge/open-data-viz) —
reproduction du catalogue de visualisations de data.economie.gouv.fr.
Rencontré sur : fermeture-reseau-cuivre, bofip, prix-controle-technique.

### Constat

Avec `server-side`, la source ne publie que la page courante ; `dsfr-data-kpi value="count"` compte donc 20 ou 30, jamais le total de la recherche. Le total est pourtant connu (`total_count` de la réponse, exposé à la pagination via getDataMeta). Sur un moteur de recherche, « 1 766 communes » ou « 12 documents » est l'information la plus utile.

### Observation

Page fermeture-reseau-cuivre : `records?…&limit=20`, la réponse porte `total_count: 35305` ; un KPI `count` sur la source affiche 20.

### Contournement actuel

Aucun déclaratif : la pagination est le seul indice du nombre de résultats. Une source agrégée `count(*)` séparée ne suit ni la recherche ni les facettes (elles ne relaient qu'à leur propre amont).

### Demande

—

---

## AM-039 — Conditionnelle par CSS faute de conditionnelle de template

**Labels suggérés** : `enhancement`, `severity:moyenne`, `dsfr-data-display`, `dsfr-data-map-popup`

### Contexte

Constat issu du banc d'essai [open-data-viz](https://github.com/bmatge/open-data-viz) —
reproduction du catalogue de visualisations de data.economie.gouv.fr.
Rencontré sur : qualite-tourisme, tourisme-et-handicap, annuaire-services-dgfip, entreprises-restauration-notre-dame, entreprise-patrimoine-vivant.

### Constat

Une valeur interpolée dans un attribut (`class="odv-picto--{{champ|absent}}"`, `href="{{champ|}}"`, `data-intitule` + `{{champ|}}`) et une règle CSS (`:empty`, `[href=""]`, `:has()`) font le travail d'un `ng-if`, sans JavaScript. Mais c'est une convention à connaître, et les intitulés passent en `::before`.

### Observation

Pictos handicap (Oui/Non/null → 3, 0 badges), rubriques DGFiP (SIP Beaune 5 visibles vs buraliste 3), lien vide de « BEST HOTEL » en `display:none`.

### Contournement actuel

Le motif ci-dessus, documenté dans `site.css` (bloc « Annuaires (lot 9) »).

### Demande

—

---

## AM-041 — Un ratio de deux agrégats coûte six balises

**Labels suggérés** : `enhancement`, `severity:moyenne`, `dsfr-data-query`, `dsfr-data-join`, `dsfr-data-normalize`

### Contexte

Constat issu du banc d'essai [open-data-viz](https://github.com/bmatge/open-data-viz) —
reproduction du catalogue de visualisations de data.economie.gouv.fr.
Rencontré sur : entreprise-patrimoine-vivant.

### Constat

Un KPI de proportion sur un champ multivalué (« 24 % proposent des produits à moins de 200 € » = count(contains) / total) exige trois `dsfr-data-query` groupées sur une clé constante, deux `dsfr-data-join` et un `compute` : aucun composant ne divise deux agrégats.

### Observation

EPV : 24,3 % et 15,9 % = 308/1 267 et 202/1 267 (API) ; suivent les filtres (Arts de la table : 49,2 % et 32,3 %).

### Contournement actuel

`compute="k = 1"` ; `group-by="k"` sur chaque agrégat ; `join on="k"` ; `compute="pct = a / b * 100"`.

### Demande

—

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

---

## AM-013 — L'interface des facettes se rend là où la balise est écrite, pas là où on la veut

**Labels suggérés** : `enhancement`, `severity:basse`, `dsfr-data-facets`, `dsfr-data-search`

### Contexte

Constat issu du banc d'essai [open-data-viz](https://github.com/bmatge/open-data-viz) —
reproduction du catalogue de visualisations de data.economie.gouv.fr.
Rencontré sur : plan-de-relance, qualite-tourisme, tourisme-et-handicap, restauration-notre-dame, prix-des-carburants, entreprise-patrimoine-vivant, annuaire-services-dgfip, centres-controle-technique.

### Constat

Le câblage du pipeline se fait par `id`, indépendamment de la position dans le DOM — c'est la bonne propriété. Mais `dsfr-data-facets` et `dsfr-data-search` rendent leur interface à l'endroit exact où la balise est écrite. Sur un tableau de bord à colonne de filtres, ils doivent donc être physiquement dans cette colonne, alors que les `dsfr-data-query` qui les consomment s'écrivent plus haut. L'ordre du fichier cesse de refléter l'ordre du pipeline.

### Observation

Constaté sur les quatre pages à colonne de filtres du dépôt. Première écriture de la page Plan de relance : les facettes déclarées dans le bloc de pipeline s'affichaient au-dessus du conteneur, hors de la colonne.

### Contournement actuel

Déclarer les composants d'interface dans le conteneur voulu et les référencer par `id` depuis le bloc de pipeline. Ça marche, mais la lecture du fichier en souffre.

### Demande

Un attribut de rendu délégué (par exemple `render-into="#mon-conteneur"`) qui découplerait le point de déclaration du point d'affichage, comme le `for` de `dsfr-data-a11y` le fait déjà pour sa cible.

---

## AM-014 — Pas de moyen de replier des colonnes parallèles en une seule facette

**Labels suggérés** : `enhancement`, `severity:basse`, `dsfr-data-facets`, `dsfr-data-unpivot`

### Contexte

Constat issu du banc d'essai [open-data-viz](https://github.com/bmatge/open-data-viz) —
reproduction du catalogue de visualisations de data.economie.gouv.fr.
Rencontré sur : tourisme-et-handicap.

### Constat

Le jeu Tourisme & Handicap porte quatre colonnes booléennes parallèles — `handicap_auditif`, `handicap_mental`, `handicap_moteur`, `handicap_visuel` — qui décrivent la même dimension. En faire une facette « handicap couvert » demanderait de les replier en un champ multi-valeurs. `dsfr-data-unpivot` bascule des colonnes en lignes, ce qui multiplierait les établissements au lieu de les enrichir.

### Observation

Le jeu fournit heureusement une colonne de résumé `handicaps_attribues`, déjà en tableau, qui rend le repliage inutile ici. Sans elle, la facette n'aurait pas été reproductible sans JavaScript.

### Contournement actuel

S'appuyer sur une colonne de résumé quand le producteur en fournit une — ce qui est le cas ici, et ce que fait aussi la page d'origine.

### Demande

Une option de repliage de colonnes en champ multi-valeurs (par exemple `fold="handicap_*:handicaps"` sur `dsfr-data-normalize`), le motif « une colonne booléenne par modalité » étant courant dans les données publiques.

---

## AM-016 — Pas de fond administratif embarqué pour une couche geoshape

**Labels suggérés** : `enhancement`, `severity:basse`, `dsfr-data-map`, `dsfr-data-map-layer`

### Contexte

Constat issu du banc d'essai [open-data-viz](https://github.com/bmatge/open-data-viz) —
reproduction du catalogue de visualisations de data.economie.gouv.fr.
Rencontré sur : restauration-notre-dame.

### Constat

Afficher les contours des régions comme repère oblige à charger un jeu externe : 26 polygones, 135 Ko, 4 à 5 s de réponse, pour du décor. Or `dsfr-data-chart type="map-reg"` embarque déjà les géométries administratives françaises pour ses cartes choroplèthes.

### Observation

Couche régions de la page Notre-Dame alimentée par `public.opendatasoft.com/…/georef-france-region/records` : 4,3 à 5,5 s selon les essais, 135 Ko.

### Contournement actuel

Charger le jeu externe, en parallèle du reste. Ça n'empêche rien, mais c'est un aller-retour et une dépendance de plus.

### Demande

Exposer les fonds administratifs déjà embarqués (régions, départements) comme couche déclarative de `dsfr-data-map`, par exemple `<dsfr-data-map-layer builtin="regions">`.

---

## AM-019 — Un KPI ne sait pas filtrer sa source

**Labels suggérés** : `enhancement`, `severity:basse`, `dsfr-data-kpi`

### Contexte

Constat issu du banc d'essai [open-data-viz](https://github.com/bmatge/open-data-viz) —
reproduction du catalogue de visualisations de data.economie.gouv.fr.
Rencontré sur : comptabilite-generale.

### Constat

`dsfr-data-kpi` agrège tout ce que sa source lui transmet. Pour « l'actif en 2025 », il faut isoler une ligne parmi six : cela passe par un `dsfr-data-query where="categorie:eq:Actif"` par KPI. Trois KPI côte à côte coûtent donc trois transformateurs, là où l'original écrit une expression.

### Observation

Page comptabilité générale : trois `dsfr-data-query` n'existent que pour alimenter trois KPI. La grammaire `count:champ:valeur` existe mais ne compte que des occurrences ; elle ne sait pas sommer sous condition.

### Contournement actuel

Un `dsfr-data-query where` par KPI. Lisible, mais verbeux.

### Demande

Un attribut `where` sur `dsfr-data-kpi`, ou une grammaire d'agrégation conditionnelle du type `montant:sum:categorie=Actif`.

---

## AM-020 — Après un unpivot, les noms de colonnes restent en étiquettes

**Labels suggérés** : `enhancement`, `severity:basse`, `dsfr-data-unpivot`

### Contexte

Constat issu du banc d'essai [open-data-viz](https://github.com/bmatge/open-data-viz) —
reproduction du catalogue de visualisations de data.economie.gouv.fr.
Rencontré sur : prix-des-carburants, signalconso, rappelconso.

### Constat

`dsfr-data-unpivot` bascule six colonnes de prix en lignes, mais la colonne `variable` contient les noms techniques : `gazole_prix`, `sp95_prix`… qui se retrouvent tels quels sur l'axe du graphique. `var-format` ne sait reformater qu'à partir des jetons d'un motif (dates, numéros), pas appliquer une table de correspondance.

### Observation

Premier rendu du graphique « prix moyen par carburant » : axe en `gazole_prix`, `sp98_prix`… Corrigé par un `dsfr-data-normalize replace-fields` de six règles.

### Contournement actuel

Un `dsfr-data-normalize replace-fields="carburant:gazole_prix:Gazole | …"` en aval — une balise et autant de règles que de colonnes dépliées.

### Demande

Un dictionnaire d'étiquettes sur l'unpivot lui-même, par exemple `var-labels="gazole_prix:Gazole | sp95_prix:SP95"`.

---

## AM-021 — Pas de moyen déclaratif d'afficher la fraîcheur des données

**Labels suggérés** : `enhancement`, `severity:basse`, `dsfr-data-chart`

### Contexte

Constat issu du banc d'essai [open-data-viz](https://github.com/bmatge/open-data-viz) —
reproduction du catalogue de visualisations de data.economie.gouv.fr.
Rencontré sur : prix-des-carburants.

### Constat

Le jeu s'appelle « flux instantané » et porte une date de mise à jour par carburant. Rien ne permet d'afficher « données à jour au … » : `databox-date` attend une chaîne fixe, pas une valeur lue dans les données. Sur une visualisation temps réel, c'est l'information qui manque le plus.

### Observation

Attribut `databox-date` de `dsfr-data-chart` : chaîne statique. Aucun composant n'expose le maximum d'un champ date autrement qu'en KPI dédié, dont le format n'affiche pas de date.

### Contournement actuel

Écrire la date à la main, donc la laisser vieillir.

### Demande

Accepter une expression de champ dans `databox-date` (par exemple `databox-date-field="gazole_maj:max"`), et un format date pour les KPI.

---

## AM-023 — L'attribut `name` change de forme selon le type de graphique

**Labels suggérés** : `enhancement`, `severity:basse`, `dsfr-data-chart`

### Contexte

Constat issu du banc d'essai [open-data-viz](https://github.com/bmatge/open-data-viz) —
reproduction du catalogue de visualisations de data.economie.gouv.fr.
Rencontré sur : fiscalite-locale, prix-des-carburants.

### Constat

Sur les graphiques cartésiens, `name` attend un tableau JSON : `name='["Série 1"]'`. Sur les types cartographiques, la même écriture s'affiche telle quelle dans l'encadré — crochets et guillemets compris — et il faut passer une chaîne simple. La documentation ne mentionne que la forme tableau.

### Observation

Carte de la fiscalité locale : `name='["Taux moyen TFB (%)"]'` affiche littéralement `["Taux moyen TFB (%)"]` en titre de série ; `name="Taux moyen TFB (%)"` affiche le libellé attendu. Capture avant/après à l'appui.

### Contournement actuel

Chaîne simple pour les cartes, tableau JSON pour le reste.

### Demande

Accepter les deux formes partout, ou documenter la différence dans la référence de l'attribut.

---

## AM-024 — Pas de moyen d'agréger une date en facette (par année)

**Labels suggérés** : `enhancement`, `severity:basse`, `dsfr-data-facets`, `dsfr-data-normalize`

### Contexte

Constat issu du banc d'essai [open-data-viz](https://github.com/bmatge/open-data-viz) —
reproduction du catalogue de visualisations de data.economie.gouv.fr.
Rencontré sur : entreprise-patrimoine-vivant.

### Constat

Le portail déclare une facette `date_de_labellisation` à sept valeurs : Opendatasoft sait replier une date sur son année dans ses facettes déclarées. Côté dsfr-data, une facette sur un champ date produirait autant de valeurs que de dates distinctes. Extraire l'année demanderait une manipulation de chaîne, or `dsfr-data-normalize compute` ne gère que l'arithmétique et la concaténation.

### Observation

Endpoint `/facets` d'EPV : `date_de_labellisation` renvoie 7 valeurs. Le champ brut est une date pleine.

### Contournement actuel

Aucun sans pré-agrégation serveur — possible avec `year(...)` dans un `group_by`, mais pas pour alimenter une facette côté client.

### Demande

Une granularité de facette sur les champs date (`granularity="year"`), ou une fonction d'extraction dans `compute`.

---

## AM-028 — Le séparateur de valeurs multiples entre en conflit avec la grammaire des attributs

**Labels suggérés** : `enhancement`, `severity:basse`, `dsfr-data-normalize`

### Contexte

Constat issu du banc d'essai [open-data-viz](https://github.com/bmatge/open-data-viz) —
reproduction du catalogue de visualisations de data.economie.gouv.fr.
Rencontré sur : rappelconso.

### Constat

Le champ `risques_encourus` de Rappel Conso vaut `blessures|incendie` : des valeurs séparées par une barre verticale dans une chaîne. C'est exactement le cas prévu par `dsfr-data-normalize split="champ:séparateur"` — sauf que la barre verticale est aussi le séparateur d'entrées de la grammaire d'attributs de la bibliothèque (`labels="a:A | b:B"`). Aucun échappement n'est documenté.

### Observation

Valeurs du champ inspectées à l'API : `blessures|incendie`, `chimique|allergene`. Le champ est finalement affiché tel quel plutôt que facetté.

### Contournement actuel

Aucun de propre. On peut renoncer à la facette, ou pré-traiter la donnée hors de la page.

### Demande

Documenter un échappement (par exemple `\\|`), ou accepter une écriture alternative du séparateur (`split="champ:pipe"`).

---

## AM-030 — Pas de valeur par défaut dynamique (« aujourd'hui ») pour un filtre de contexte

**Labels suggérés** : `enhancement`, `severity:basse`, `dsfr-data-context-filter`

### Contexte

Constat issu du banc d'essai [open-data-viz](https://github.com/bmatge/open-data-viz) —
reproduction du catalogue de visualisations de data.economie.gouv.fr.
Rencontré sur : rappel-conso-tableau-de-bord.

### Constat

Un filtre s'applique au montage si son UI est déjà remplie, et `url-sync` sait pré-remplir depuis l'URL. Mais rien ne permet de déclarer « la date du jour » comme valeur initiale d'une entrée : une page statique ne connaît pas la date. Sans script, un tableau de bord « au jour J » s'ouvre soit vide (année et mois montrent le total), soit figé sur une date écrite en dur.

### Observation

Chronométrage en navigateur : les sept requêtes partent à +230 ms, toutes avec la clause de date, aucune requête non filtrée préalable. En retirant le script, les compteurs année et mois affichent 18 581 (le total) au chargement. Page : /viz/rappel-conso-tableau-de-bord (reproduction fidèle de la page vivante /pages/rappel-conso-v2/, variante de /viz/rappelconso).

### Contournement actuel

Le même script que AM-029 pose `date.value = aujourd'hui` avant le chargement de dsfr-data ; le filtre trouve une UI remplie au montage et s'applique dès la première requête — une seule salve de sept requêtes, sans double fetch.

### Demande

—

---

## AM-033 — Le tableau `dsfr-data-a11y` affiche les flottants bruts

**Labels suggérés** : `enhancement`, `severity:basse`, `dsfr-data-a11y`

### Contexte

Constat issu du banc d'essai [open-data-viz](https://github.com/bmatge/open-data-viz) —
reproduction du catalogue de visualisations de data.economie.gouv.fr.
Rencontré sur : prix-des-carburants.

### Constat

Le tableau équivalent sous le graphique des prix par région rend « 2.2665920000000006 » là où le graphique dit 2,27. Un lecteur d'écran lira seize chiffres. Le formateur `fr-FR` existe (il sert au KPI et à `{{champ:number}}` des templates), il n'est pas appliqué ici.

### Observation

Navigateur : `dsfr-data-a11y tbody tr` première ligne « Corse | 2.2665920000000006 | 126 ».

### Contournement actuel

Aucun déclaratif ; arrondir en amont demanderait un `dsfr-data-query` avec une fonction d'arrondi, qui n'existe pas.

### Demande

—

---

## AM-035 — Un graphique n'a pas d'état « vide tant qu'aucun filtre n'est posé »

**Labels suggérés** : `enhancement`, `severity:basse`, `dsfr-data-chart`

### Contexte

Constat issu du banc d'essai [open-data-viz](https://github.com/bmatge/open-data-viz) —
reproduction du catalogue de visualisations de data.economie.gouv.fr.
Rencontré sur : impot-sur-le-revenu.

### Constat

Sur un jeu où l'agrégat global n'a pas de sens (additionner toutes les cases d'une déclaration de revenus), la page s'ouvre sur une courbe absurde tant que l'utilisateur n'a rien choisi. Le composant dessine ce qu'il reçoit ; rien ne permet de dire « attends un filtre ».

### Observation

Page impot-sur-le-revenu sans paramètre : KPI « pic de déclarants » = max de toutes les cases confondues, courbe sur 19 388 lignes hétérogènes.

### Contournement actuel

Liens d'exemple (`?nom=1AJ`) et texte d'aide ; `url-params` sur les facettes pour que le catalogue pointe directement sur une case.

### Demande

—

---

## AM-036 — Les templates ne formatent pas les dates

**Labels suggérés** : `enhancement`, `severity:basse`, `dsfr-data-display`, `dsfr-data-map-popup`

### Contexte

Constat issu du banc d'essai [open-data-viz](https://github.com/bmatge/open-data-viz) —
reproduction du catalogue de visualisations de data.economie.gouv.fr.
Rencontré sur : fermeture-reseau-cuivre, bofip.

### Constat

`{{champ:number}}` existe, `{{champ:date}}` non : les dates ISO s'affichent brutes (« 2028-01-31 », « 2012-09-12 ») dans les cartes et les panneaux. `formatDate` existe pourtant dans `@dsfr-data/shared`.

### Observation

Cartes des communes du réseau cuivre : « Fermeture technique : 2028-01-31 ». Source : `formatTemplateValue` ne connaît que `number`.

### Contournement actuel

Côté Opendatasoft : `date_format()` dans le `select` de l'export (voir FP-003). Côté client : aucun.

### Demande

—

---

## AM-037 — Pas de treemap

**Labels suggérés** : `enhancement`, `severity:basse`, `dsfr-data-chart`

### Contexte

Constat issu du banc d'essai [open-data-viz](https://github.com/bmatge/open-data-viz) —
reproduction du catalogue de visualisations de data.economie.gouv.fr.
Rencontré sur : aide-publique-developpement.

### Constat

La page d'origine de l'APD répartit les ODD en treemap. DSFR Chart n'a pas ce type ; barres horizontales à la place.

### Observation

Source data.aide-developpement.gouv.fr/pages/chiffres_cles : `chart-type="treemap"` sur `odd_agrege` ; liste des types de `dsfr-data-chart` sans treemap.

### Contournement actuel

`type="bar" horizontal`.

### Demande

—

---

## AM-038 — `replace-fields` ne sait pas récrire une valeur qui contient des deux-points, ni par motif

**Labels suggérés** : `enhancement`, `severity:basse`, `dsfr-data-normalize`

### Contexte

Constat issu du banc d'essai [open-data-viz](https://github.com/bmatge/open-data-viz) —
reproduction du catalogue de visualisations de data.economie.gouv.fr.
Rencontré sur : aide-publique-developpement.

### Constat

La grammaire `CHAMP:motif:remplacement` réserve les deux-points, et la comparaison est stricte (`===`). Une date ISO (« 2018-01-01T00:00:00+00:00 ») ne peut donc ni être ciblée ni être ramenée à « 2018 » : le motif est coupé au premier deux-points de la valeur. `compute` n'a pas de fonction de sous-chaîne.

### Observation

Source `_parseReplaceFields` : `indexOf(':')` deux fois puis `normalizedValue === pattern` ; en page, le libellé reste « 2018-01-01T00:00:00+00:00 » après la règle.

### Contournement actuel

Aucun côté client ; côté serveur, `year()` est refusé par l'adaptateur (PG-014).

### Demande

—

---

## AM-040 — Pas de format de jonction pour les champs tableau dans les templates

**Labels suggérés** : `enhancement`, `severity:basse`, `dsfr-data-display`, `dsfr-data-map-popup`

### Contexte

Constat issu du banc d'essai [open-data-viz](https://github.com/bmatge/open-data-viz) —
reproduction du catalogue de visualisations de data.economie.gouv.fr.
Rencontré sur : annuaire-services-dgfip, prix-des-carburants, entreprise-patrimoine-vivant.

### Constat

`{{public}}` sur un tableau rend « particuliers,professionnels » (`String(array)`, sans espace) ; le portail affiche « Particuliers et Professionnels ».

### Observation

Panneau du buraliste « LE PARIS » (Noyon) : « particuliers,professionnels » ; `services_service` sur Prix des carburants idem.

### Demande

—

---

## AM-042 — `display="champ:radio"` rend une liste déroulante, pas des boutons radio

**Labels suggérés** : `enhancement`, `severity:basse`, `dsfr-data-facets`

### Contexte

Constat issu du banc d'essai [open-data-viz](https://github.com/bmatge/open-data-viz) —
reproduction du catalogue de visualisations de data.economie.gouv.fr.
Rencontré sur : entreprises-restauration-notre-dame.

### Constat

Le mode « radio » de `dsfr-data-facets` est un dropdown à choix unique (`_renderRadioGroup`), pas deux boutons radio DSFR en ligne comme le Oui / Non du portail.

### Observation

DOM inspecté : aucun `input[type=radio]` hors panneau déplié.

### Contournement actuel

Cases à cocher.

### Demande

—
