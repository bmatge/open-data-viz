# Portail Culture — proposition de trente dataviz (cadrage du 2026-09-26)

Ministère de la Culture sur data.gouv.fr (organisation `534fff91a3a7292c64a77f73`, front
thématique culture.data.gouv.fr). L'ancien portail Opendatasoft `data.culture.gouv.fr` n'a plus
d'API : tout passe par **l'API Tabular** (`tabular-api.data.gouv.fr`), donc par l'adaptateur
`api-type="tabular"` de `dsfr-data` (0.42.0 chargée par le dépôt).

Il n'y a pas de dataviz d'origine à reproduire : on **crée**, au format des pages recréées du dépôt
(titre-message, chapô calculé, accroche, preuve, nuance, exploration, « ce qu'on ne montre pas »,
notes éditoriales). Niveau `dataviz-metier` : **avancé** pour le cadrage, chaque page se relit au
niveau base.

## 0. Méthode et limites de ce cadrage

- **Inventaire** : 244 jeux, 110 avec au moins une ressource servie par Tabular (liste de
  l'orchestrateur, `culture-tabular.json`). Ce cadrage a en outre **trouvé sept jeux à fort
  trafic absents de cette liste mais bien servis par Tabular** (vérifié le 2026-09-26 via
  l'outil data.gouv : « ✅ Available via Tabular API ») : Fréquentation des Musées de France,
  Immeubles protégés MH (version vivante, 46 760 lignes), Bibliothèques des collectivités,
  Muséofile, Jardins remarquables, Maisons des illustres, Publications de presse (CPPAP). Ils
  entrent dans la proposition.
- **Sondages** : un premier passage direct sur `/profile/` a rendu 30 profils complets, puis
  l'IP de la machine a été **coupée par data.gouv** (connexion refusée sur `tabular-api` et
  `www.data.gouv.fr`, encore au moment d'écrire). Le reste des sondages a été fait **par le
  connecteur MCP data.gouv** (même API Tabular, autre IP) : il donne les **comptes exacts**
  (`meta.total`) sur un filtre `__exact`/`__contains`, les extrêmes par tri, et des échantillons,
  mais **pas d'agrégat** (`__sum`, `__groupby`). Conséquence : tous les **comptes** ci-dessous
  sont sondés et datés ; les **sommes** (entrées totales, montants totaux) sont marquées
  « à rejouer » et devront l'être avant d'écrire un titre dessus. Rien de non sondé n'est écrit
  comme un fait.
- Fichiers de travail : `scratchpad/culture-profiles.json` (30 profils Tabular avec colonnes,
  types, échantillon), `culture-dg.json`, `culture-tabular.json`.

## 1. Ce que l'API Tabular permet vraiment (vérifié dans le source, `packages/core/src/adapters/tabular-adapter.ts`, 0.42.0)

| Capacité | État | Conséquence pour les pages |
|---|---|---|
| Pagination | **200 lignes/page** (maximum réel de l'API, #1019) ; `max-records` honoré, **25 000 par défaut** (125 pages, relevable, #1027) | Un jeu de 15 000 lignes = 75 allers-retours : acceptable ; 100 000 = 500 : non. |
| Export complet | **`fetch-mode="export"` existe (#1055)** : lit l'export **Parquet** de la ressource via `www.data.gouv.fr/api/2/datasets/resources/{rid}/` → `parquet_url`. Conditions : **aucun** `where`, `group-by`, `aggregate`, `order-by` sur la source (sinon repli paginé, dit une fois en console) ; la ressource doit avoir un export Parquet | À tester ressource par ressource — **non vérifié pour les jeux Culture** (blocage réseau). Si présent, un jeu de 15 000 lignes se charge en une requête. La ligne du CLAUDE.md « pas d'endpoint d'export » est périmée. |
| Projection | `select` → `columns=` (#985) | Indispensable sur les jeux larges (MH : 82 colonnes, JEP : 36) : ne lire que ce qu'on trace. |
| Filtre | `where` colon → `champ__exact`, `__contains`, `__less`, `__greater`, `__in` (liste à virgules)… ; **OU multi-champs** `or=(a__op.v,b__op.v)`, un seul groupe par requête (#1026) | `__in` ignore les valeurs à parenthèse (PG-034) ; deux filtres même champ sont ET-és. |
| Agrégation serveur | `group-by` **+** `aggregate` délégués en flags nus `champ__groupby&champ__sum` ; `count`, `sum`, `avg`, `min`, `max` ; **pas** de `distinct` (#672) ; **un `group-by` sans agrégat n'est pas délégué** (#1025, l'API renverrait des modalités répétées) | C'est **la** voie pour Basilic (86 366), Licences (115 832), Sibil (204 628), MH (46 760) : on ne charge jamais ces jeux. Pas de fonction `year()` côté serveur : une série annuelle sur une colonne date exige une colonne année dans le jeu, ou N requêtes `date__greater/__less`. |
| Tri serveur | délégué (`champ__sort`) ; la colonne de regroupement se trie, **pas** un agrégat (`x__sum__sort` → 400) ; tri local sur groupes complets (#1045) | PG-033 reste vrai : **ne jamais trier au serveur ce qu'on pagine** — `order-by` sur une query en aval. |
| Noms de colonnes | délégables sauf s'ils contiennent `,` `:` `\|` (séparateurs de la grammaire colon) | Non délégables donc : `Type de voie (rue, Avenue, boulevard, etc.)` (festivals), `Coordonnees GPS [lat,lon]` (plan de relance). Les noms à **espaces de tête/queue** (`" pdm_valeur_jeunesse "`, `"code_commune "`) passent mais se recopient au caractère près. |
| Facettes serveur | `serverFacets: false` | `dsfr-data-facets` ne fonctionne qu'en **mode client** : facettes seulement sur un jeu chargé entièrement (ou sur une agrégation serveur préalable). |
| Recherche serveur | `serverSearch: true` (`__contains`) | `dsfr-data-search` utilisable sur les gros jeux. |
| Géo | `serverGeo: false` | Pas de `bbox` : une carte de points exige le chargement complet ; au-delà de 5 000 points, `max-items` (PG-013) ou agrégation par département. |
| CORS | ouvert (`*`) sur requête et préflight (AM-087) | Pas de `proxy-url`. |

Trois pièges spécifiques au corpus Culture, tous rencontrés en sondant :

1. **Les modalités ne sont pas celles qu'on devine.** `Décennie de création = "De 2010 à 2019"` → 0 ligne ; la modalité est `"2010 et après"`. `Domaine = "Spectacle vivant"` dans Basilic → 0 ligne. `Statut juridique = "propriété d'une personne privée"` → 15 lignes, `"propriété privée"` → 18 373. Un filtre sur une modalité fausse rend **zéro ligne sans erreur** : sonder les modalités (`group-by` + `count`) avant d'écrire un `where`.
2. **Les nulls sortent en tête d'un tri décroissant** (bibliothèques triées par prêts : les trois premières lignes ont `nombre_de_prets` vide ; musées 2024 triés par `total` : le premier est vide). Un « top 10 » serveur est faux sans `champ:isnotnull`.
3. **Typage silencieux de l'API** : dans « Chiffres clés du livre », `tirage_moyen` est parsé en **date** (`0253-04-24`), les parts sont tantôt `0.08` tantôt `"0,08"`, les montants `"2 901,60"`. Une colonne mal typée n'est pas une colonne.

## 2. Inventaire par famille (110 jeux Tabular + 7 retrouvés)

| Famille | Jeux exploitables (lignes sondées) | Verdict |
|---|---|---|
| **Finances publiques de la culture** | Dépenses culturelles des communes 2023 (3 255), départements 2023 (95), EPCI 2023 (879), régions 2023 (17) ; Dépenses du ministère par département 2019 (100) et par région ; Plan de relance (328) ; aides Été culturel 2021-2023 (21) | Cœur de la vague 1 : petit, propre, même maille (INSEE), €/habitant déjà calculés. |
| **Lieux et équipements** | Basilic (86 366), Base des lieux culturels ouverts (36 392), Bibliothèques (15 704), Librairies (3 237), Muséofile (1 216), Jardins remarquables (503), Maisons des illustres, Établissements publics (84) | Cartes, densités par habitant, croisements avec les finances. |
| **Patrimoine protégé** | Immeubles MH vivant (46 760) et archive (43 870), SPR (1 145 communes), ACR (1 824), Monuments nationaux fréquentation 2019-2022 (396) | Vague 1-2. |
| **Musées** | Fréquentation 2014-2024 (12 292), Muséofile, Expositions d'intérêt national 2014-2025 (276) | Vague 1 (fréquentation) et 2 (croisement). |
| **Spectacle vivant** | Licences d'entrepreneurs (115 832), Sibil (204 628), Activité temporaire d'entrepreneurs étrangers (1 658), Festivals (7 283), Festivals P131 2023-2024 (1 602), Compagnonnage (38), cirques (35 + n) | Agrégation serveur obligatoire sur les deux gros. |
| **Presse et livre** | Publications CPPAP (26 731), Aide à l'exemplaire postés 2023 (382), SPTEL (110), ultramarins (32), FSDP (81, 2014), Chiffres clés du livre 1993-2024 (33 × 105 colonnes) | Vague 1 (livre) et 2 (presse). |
| **Emploi et entreprises culturelles** | Établissements culturels par département 2016-2022 (700), Salariés par département 2016-2022 (700), Professions culturelles 2017 (101) + versions région/zone d'emploi | Vague 1 : séries courtes, taux déjà calculés. |
| **Archives (fonds historiques)** | Imprimeurs-libraires 19e (17 969), Moulins 1794-1809 (20 313), Meuniers 1801 (5 157), Préfets depuis 1800 (3 918), Déplacements présidentiels (2 750), Tombes 1870-71 (1 415), Pensions révolutions (5 343), Sûreté nationale, émigrés… | Deux ou trois récits historiques bien choisis (vagues 2-3) ; le reste est un catalogue de notices, pas une histoire chiffrée. |
| **Événementiel annuel** | JEP 2023 (28 395 — la ressource `22c595ae` est l'édition 2023, pas 2025), JEP 2024, Nuits des musées 2015/2022/2023/2024, Nuits de la lecture, Rendez-vous aux jardins, Été culturel 2024 (fichier réellement 2025 : 2 365) | Un seul par famille ; les schémas changent d'une édition à l'autre. |
| **Enquêtes** | Usagers en ligne des archives 2014/2021 (46 279 répondants), Enquête archives universitaires | Vague 2, avec les précautions d'échantillon. |
| **Méta et référentiels** | Catalogue des données (261), Catalogue topic, Cartographie des démarches, Vocabulaires, Thésaurus, Autor, FranceArchives (lieux, autorités, inventaires), Compar:IA (structure seulement, 104 lignes), Documentation d'architecture (68 910 notices), Palais-Royal, Grands documents | Écartés (§ 6). |

## 3. Première vague — dix pages solides, chiffres sondés

Convention des fiches : **T** titre-message provisoire · **Q** question et lecteur · **J** jeux
(rid Tabular) · **H** histoire pressentie, chiffres sondés le 2026-09-26 · **F** formes ·
**C** capacités `dsfr-data` · **P** pièges d'honnêteté · **V** voie technique · **E** effort.

### 1. Culture des collectivités : de 4 à 69 € par habitant selon le département

- **T** « Un habitant des Hautes-Alpes voit son département dépenser 69 € pour la culture, un
  Lorrain de Meurthe-et-Moselle 4 € »
- **Q** Où les collectivités financent-elles la culture, et à quel échelon ? Lecteur : élu local,
  journaliste régional, habitant qui cherche sa commune.
- **J** Départements 2023 `6126f348-eb0b-49e6-8850-5fe1e1a350e3` (95 lignes) ; Régions 2023
  `4dfccc0d-962c-4800-8599-b47730823a33` (17) ; EPCI 2023 `c7328fc7-eef9-485e-b5f6-6d93495a1f09`
  (879) ; Communes 2023 `f27f0329-1a0c-487c-9186-cc6f387fe155` (3 255, communes ≥ 3 500 hab).
- **H** Départements : Hautes-Alpes 69 €/hab (dont 55 € d'investissement), Alpes-de-Haute-Provence
  65, Hauts-de-Seine 62, Hautes-Pyrénées 59, Creuse 56 ; en bas Meurthe-et-Moselle 4, Mayotte 5,
  Côte-d'Or 6, La Réunion 7. Régions : Corse 90 €/hab, Guyane 45, Martinique 31 ; Île-de-France 7
  (89,8 M€ pour 12,4 M hab) — les DROM et la Corse en tête parce que la région y porte des
  compétences que la métropole laisse aux départements. EPCI : Amiens Métropole 239 €/hab,
  Chamonix 234, Grand Verdun 222. Communes : **106 communes sur 3 255 déclarent 0 €** (3,3 %) ;
  Rungis 1 744 €/hab (5 673 hab), Saint-Tropez 1 469, Villard-de-Lans 1 043 — des communes
  riches et petites. L'histoire : **l'écart n'est pas nord/sud ni riche/pauvre, il est
  institutionnel** (qui porte quoi) et **conjoncturel** (une année d'investissement).
- **F** Accroche 4 KPI (écart max, médiane, part des communes à 0, total) ; preuve : carte
  choroplèthe départementale €/hab (`type="map"`, `map-summary="weighted"` pondéré par
  `population_annee`) ; nuance : barres empilées fonctionnement/investissement pour les 10 premiers
  (Hautes-Alpes = investissement ponctuel) ; petits multiples régions avec encarts DROM ;
  exploration : tableau des communes avec recherche et tri.
- **C** `dsfr-data-chart type="map"` + `insets="drom"` ; `dsfr-data-kpi` ratio de sommes
  (jamais `avg` des €/hab) ; `dsfr-data-normalize compute` pour la tranche de dépense ;
  `dsfr-data-list sort search count-label` ; `dsfr-data-a11y`.
- **P** Les colonnes `part_..._pct` sont du **texte** (`"24,7%"`, `"2%"`) : ne pas les tracer,
  recalculer `k_eur / total` n'est pas possible (le total des dépenses n'est pas dans le jeu) →
  les afficher en tableau seulement, le dire. Communes : périmètre ≥ 3 500 hab, une commune sur
  dix manque sûrement (3 255 lignes pour ~3 400 communes de cette taille : compter). Le 0 € est
  une déclaration comptable (fonction « culture » non renseignée), pas une absence de culture.
  Investissement = une année : ne pas titrer « priorité culturelle » sur les Hautes-Alpes.
- **V** Quatre chargements complets (au total 4 246 lignes, ≈ 22 requêtes ; Parquet à tester).
  Jointure inutile entre échelons (pas de clé commune commune→EPCI dans ces fichiers).
- **E** M.

### 2. Musées de France : deux établissements pèsent 17 millions d'entrées

- **T** « Le Louvre et Versailles : 17 millions d'entrées en 2024 ; les 1 000 autres musées de
  France se partagent le reste » (la part exacte est **à rejouer** : somme non sondée)
- **Q** Qui va dans quels musées, et la fréquentation est-elle revenue au niveau de 2019 ?
  Lecteur : presse, élu, DRAC.
- **J** Fréquentation des Musées de France `7708e380-e7f8-4b56-936a-5d2a262d852d` — **hors liste
  des 110, servi par Tabular** (vérifié). 12 292 lignes = musée × année, **2014-2024** (2001 vide,
  premier millésime 2014, dernier 2024) ; 1 155 lignes en 2019, 1 100 en 2020, 1 040 en 2024.
  Colonnes : `payant`, `gratuit`, `total`, `individuel`, `scolaires`, `moins_18_ans_hors_scolaires`,
  `_18_25_ans`, `ferme` (1 354 lignes « OUI »), `codeInseeCommune`, `IDMuseofile`.
- **H** 2024 : Louvre 8 681 079 entrées (3,18 M gratuites), Versailles 8 358 074. Concentration
  extrême à mesurer (part des 10 premiers), courbe 2014-2024 avec le creux 2020-2021, part du
  gratuit, carte de la fréquentation par département, musées fermés.
- **F** KPI (entrées 2024, évolution vs 2019, part gratuit, nombre de musées déclarants) ; courbe
  annuelle `y-min="0"` ; barres triées top 15 avec le reste grisé ; part cumulée
  (`running_sum` sur `share_percent`) ; carte départementale des entrées pour 1 000 habitants
  (jointure population des départements 2023, fiche 1) ; petits multiples par région ; tableau
  recherche « mon musée ».
- **C** `group-by="annee" aggregate="total:sum"` **côté serveur** pour la série ; chargement
  complet (62 requêtes) pour la table et les facettes région/département/année ;
  `dsfr-data-join` sur `code_insee` du département (unicité vérifiée : 95 lignes = 95 codes) ;
  `color-map` pour griser ; `dsfr-data-search`.
- **P** `total` **vide** sur certains musées ouverts (musée Géo-Charles 2024) : il sort **premier**
  d'un tri décroissant → `total:isnotnull` partout ; lignes `ferme=OUI` à 0 (les écarter du
  dénominateur des « musées déclarants », les compter à part) ; `lien_avec` (musées rattachés) →
  double compte possible, vérifier ; la base de 2014 n'est pas celle de 2024 (musées entrés et
  sortis) : la courbe nationale est une somme à périmètre variable, le dire, ou la restreindre aux
  musées présents les 11 années (`group-by IDMuseofile` + `count = 11`).
- **V** Agrégats serveur (série annuelle, par région, par département) + un chargement complet
  filtré `annee:eq:2024` pour l'exploration (1 040 lignes, 6 requêtes).
- **E** M.

### 3. L'État dépense 801 € par Parisien pour la culture, 5 € par Landais

- **T** « Hors salaires, le ministère de la Culture a dépensé 801 € par habitant à Paris en 2019,
  5 € dans les Landes »
- **Q** Où l'argent de l'État va-t-il, et compense-t-il ou double-t-il celui des collectivités ?
  Lecteur : presse, parlementaire, DRAC.
- **J** Dépenses du ministère par département 2019 `f6883692-2aa6-4c04-820e-f0186e29a884` (100) ;
  par région `70a59c37-bc10-4d85-add0-fe4123f55232` ; croisement avec Dépenses culturelles des
  départements 2023 (fiche 1) et Professions culturelles 2017 `84018ddf-6cb8-42cf-bf54-550b73ec49f7`.
- **H** Paris 1 751 725 123 € = 801 €/hab (fonctionnement 676) ; Meuse 110 €/hab dont **90 %
  d'investissement** (un chantier, une année) ; Haute-Vienne 76 ; Seine-Saint-Denis 53 ; en bas
  Landes 5, Corse 5, Haute-Savoie 6. Paris concentre aussi 7,7 % d'actifs en professions
  culturelles (Hauts-de-Seine 4,6 %, Allier 1,08 %). L'histoire : « dépensé à Paris » ≠ « pour
  les Parisiens » (Louvre, Opéra, BnF sont localisés à Paris et servent le pays) — le titre doit
  porter cette nuance.
- **F** Barres triées horizontales avec Paris hors échelle (le dire : Paris en KPI, la barre
  tronquée est interdite) ; deux cartes côte à côte État 2019 / département 2023 en €/hab ;
  nuage `type="scatter"` État × collectivité par département ; tableau.
- **C** `dsfr-data-join on="code_insee"` (100 × 95 : vérifier la Corse `20` côté État vs `2A/2B`
  côté départements, et Paris `75` présent des deux côtés) ; `highlight-index` après tri ;
  `reference-lines` médiane.
- **P** Années différentes (2019 vs 2023) : deux cartes, pas un ratio ; « hors dépenses de
  personnel » ; l'effet Meuse est un investissement ponctuel ; l'« euros par habitant » d'un
  équipement national est une convention, pas un bénéfice local. Les codes région portent des
  libellés hétérogènes (`Auvergne-Rhônes Alpes`, `Ile-de-France` sans accent) : ne pas joindre
  sur le libellé.
- **V** Chargements complets (195 lignes).
- **E** S/M.

### 4. Bibliothèques : six sur dix sont dans des communes de moins de 2 000 habitants

- **T** « 9 130 des 15 704 bibliothèques publiques sont dans des communes de moins de 2 000
  habitants ; 584 ouvrent le dimanche »
- **Q** Quel est le maillage réel de la lecture publique, et qui ouvre, prête, emploie ? Lecteur :
  élu, bibliothécaire, habitant.
- **J** Bibliothèques des collectivités `806a8aa1-952f-404d-9857-3f27b7c0ca86` (15 704, **hors liste,
  servi par Tabular**) ; croisement Basilic `dced78ee-0823-4b61-86e6-57717308d4e4` (15 702 lignes
  « Bibliothèque » : les deux bases sont cohérentes à 2 unités) et Dépenses des communes (fiche 1).
- **H** 15 289 bâtiments ouverts ; 12 244 municipales, 2 614 intercommunales ; 584 ouvertes le
  dimanche (3,7 %) ; 8 026 gratuites (51 %) ; 9 130 dans des communes < 2 000 hab (58 %). Le
  ratio à construire : emprunteurs / population, prêts / habitant, ETP / 10 000 hab par
  département ; la nuance : le réseau rural est tenu par des bénévoles (`Nombre de bénévoles`).
- **F** KPI ; carte de points (15 000 → `max-items` relevé) ou choroplèthe départementale du taux
  d'emprunteurs ; barres par tranche de population (`compute` tranches) ; facettes Statut /
  dimanche / gratuité / wifi ; tableau.
- **C** `dsfr-data-map-layer type="circle" radius-field` ; facettes **client** (jeu chargé) ;
  `dsfr-data-normalize compute="tranche = when …"` ; `group-by="code_insee_commune"` **avant** toute
  somme de population.
- **P** **`Population commune` est répétée sur chaque bibliothèque de la commune** (donnée longue) :
  sommer sans dédoublonner surestime la population → `group-by` commune d'abord (règle du dépôt sur
  le total d'entité répété). Colonnes d'activité **vides** pour une part des lieux (les trois plus
  « gros prêteurs » d'un tri décroissant ont `nombre_de_prets` vide) : `isnotnull` et afficher
  l'effectif renseigné. Millésime d'activité non porté dans le fichier : le lire dans la
  description du jeu avant de dater.
- **V** Chargement complet 79 requêtes (4,6 Mo CSV ; Parquet à tester : ce serait la ressource
  la plus rentable du portail) ; `select` pour ne lire que ~15 colonnes.
- **E** L (M si Parquet disponible).

### 5. Festivals : près d'un sur deux est né après 2010

- **T** « 3 358 des 7 283 festivals recensés ont été créés en 2010 ou après ; 44 % sont de musique,
  36 % se tiennent l'été »
- **Q** Qu'est-ce que la France appelle festival, où et quand ? Lecteur : presse, collectivité,
  organisateur.
- **J** Liste des festivals `47ac11c2-8a00-46a7-9fa8-9b802643f975` (7 283, recensement 2019 mis
  à jour 2026-09) ; croisement Festivals financés P131 `e4761b32-c601-4ec9-b361-658315d07389`
  (1 602 lignes 2023-2024, 810 en 2024).
- **H** Musique 3 229, Spectacle vivant 1 634 ; « 2010 et après » 3 358 (46 %) ; saison
  21 juin-5 septembre 2 644 (36 %) ; « Internationale » 54 seulement (`Envergure territoriale`
  très souvent vide). Côté financement : Festival d'Aix 5 108 000 € en 2024, Avignon 4 688 998 €
  en 2023, « Région = DGCA » pour les crédits centraux → concentration à mesurer (somme à rejouer).
- **F** Barres triées discipline ; barres par décennie de création ; anneau saisons (4 parts) ;
  carte de points avec `refine-on-click` par région ; petit multiple par région (discipline) ;
  tableau P131 trié montant avec part cumulée.
- **C** Facettes client (discipline, décennie, période, région) ; `dsfr-data-map-layer` avec
  `max-items="8000"` ; `share_percent` + `running_sum` ; `dsfr-data-search`.
- **P** Modalité `"De 2010 à 2019"` → 0 ligne : lire les modalités réelles. `Envergure` nulle sur
  la majorité : ne pas titrer dessus. Recensement fondé sur 2019 (critères d'inclusion en
  description). La jointure festivals × P131 est **fragile** (SIRET souvent vide côté P131, noms
  en majuscules avec article postposé) : ne pas la promettre ; comparer par région seulement.
  Colonne `Type de voie (rue, Avenue, boulevard, etc.)` non délégable (virgules) — ne pas la
  filtrer au serveur.
- **V** Chargement complet 37 requêtes ; P131 9 requêtes.
- **E** M.

### 6. Monuments historiques : 46 760 immeubles, un sur cinq classé, deux sur cinq privés

- **T** « 9 904 immeubles classés, 16 015 inscrits ; 18 373 sont des propriétés privées, 19 132
  communales »
- **Q** Quel est le patrimoine protégé, à qui appartient-il, et où ? Lecteur : presse, élu,
  propriétaire, DRAC.
- **J** Immeubles protégés MH `3a52af4a-f9da-4dcc-8110-b07774dfb3bc` (46 760, 82 colonnes, 95 Mo —
  **hors liste, servi par Tabular**) ; croisement SPR `b916f51e-7252-41c2-8a0e-eb47e0c9292b`
  (1 145 communes, `population`) et Dépenses des départements (population 2023).
- **H** Paris 1 893 immeubles ; « 20e siècle » dans le siècle principal : 3 205 ; typologies
  `classé MH` 9 904 / `inscrit MH` 16 015 / `inscrit MH partiellement` et mixtes pour le reste.
  À construire : densité de MH pour 10 000 habitants par département (la Creuse ou la Dordogne
  devant Paris), propriété par région, siècle de construction.
- **F** Carte choroplèthe départementale (MH / 10 000 hab) ; barres empilées propriété × région ;
  histogramme par siècle (`compute` tranche depuis le premier siècle cité) ; tableau recherche
  par commune.
- **C** **Agrégation serveur** : `group-by="Departement_format_numerique"
  aggregate="Reference:count"` puis jointure population ; `group-by="Statut_juridique_de_l_edifice,
  Region"` ; `dsfr-data-search` sur `Titre_editorial_de_la_notice`.
- **P** Jamais de chargement complet (234 pages, textes longs). Champs **multivalués** `;`
  (`16e siècle;19e siècle;20e siècle`) : un `count` par siècle compte les immeubles à campagnes
  multiples plusieurs fois → dire « immeubles dont une campagne date du… ». Libellés de statut
  hétérogènes (`propriété privée` 18 373 vs `propriété d'une personne privée` 15) → regrouper par
  `compute`, ou nommer l'écart. `COG_Insee_lors_de_la_protection` est le code **à la date de la
  protection** (fusions de communes) : jointure avec SPR sur ce code = appariement partiel, à
  chiffrer. Version « archives » (`edf158f9…`, 43 870 lignes) : ne pas l'utiliser, la description
  renvoie à la version vivante.
- **V** 100 % agrégats serveur + recherche serveur.
- **E** M.

### 7. Entrepreneurs de spectacles : 115 832 récépissés, un sur deux encore valide

- **T** « 63 159 licences valides sur 115 832 récépissés déposés depuis avril 2020 ; 55 % sont des
  renouvellements »
- **Q** Qui exploite, produit, diffuse du spectacle vivant, et où ? Lecteur : DRAC, professionnel,
  presse spécialisée.
- **J** Licences `fb6c3b2e-da8c-4e69-a719-6a96329e4cb2` (115 832, 2020-04 → 2025) ; croisement
  Activité temporaire d'entrepreneurs établis hors de France `e6a3517f-dac4-446f-bffd-02216be7bfb0`
  (1 658, Royaume-Uni 171).
- **H** Statuts : Valide 63 159 (54,5 %), Expiré 20 654, Invalidé (à sonder) ; catégories :
  1 (exploitants de lieux) 18 425, 2 (producteurs) 66 611, 3 (diffuseurs) 30 777 ; Île-de-France
  24 201 (21 %) ; plus ancien dépôt 2020-04-23. Histoire : le récépissé remplace la licence
  depuis 2019, la vague de 2020-2021 est un stock qui expire en 2025 — le pic de renouvellements
  se lit dans `date_expire_licence`.
- **F** Barres empilées statut × catégorie ; carte départementale des licences valides pour
  100 000 hab ; courbe des dépôts par mois (voir V) ; barres par `type_declarant` ; tableau
  recherche raison sociale.
- **C** `group-by="statut_recepisse, categorie" aggregate="numero_recepisse:count"` (serveur) ;
  `group-by="departement_siret"` ; `dsfr-data-search` serveur.
- **P** Un récépissé ≠ une entreprise (une commune de Saint-Gilles porte 2 lignes, cat. 2 et 3) :
  compter des récépissés, dire « structures » seulement après `group-by siren_siret`. Encodage
  cassé de la modalité `Premičre demande` (č) : filtrer avec la valeur telle quelle. Pas de
  fonction date au serveur : la série mensuelle = une requête par mois (`date_depot_dossier__greater`
  / `__less`) ou un chargement complet impossible (580 pages) → **12 requêtes par an, à assumer et
  chronométrer**. `region_siret` vide pour une part (siège hors France ou non géocodé) :
  l'afficher comme groupe « non renseigné ».
- **V** Agrégats serveur + recherche serveur.
- **E** M.

### 8. Le livre en trente ans : Internet a pris la place des clubs, la librairie a tenu

- **T** « Parts de marché du livre : les clubs et la VPC de 40 % (1993) à 1 % (2024) ; Internet
  de 0 à 20 % ; la librairie de 31 % à 27 % »
- **Q** Comment achète-t-on des livres, et qu'est-ce qui a vraiment changé ? Lecteur : grand public,
  presse, libraire.
- **J** Chiffres clés du secteur du livre `9f55911c-63b2-4d33-8757-348abde08235` (33 lignes
  1993-2025, 105 colonnes) ; croisement Base des librairies `bcd7d584-89c3-46b6-a164-4582eb2d43b5`
  (3 237 librairies, 502 labellisées LIR).
- **H** 1993 : librairies 0,31, GSA 0,13, GSS 0,10, VPC/clubs 0,40 ; 2008 : librairies 0,25,
  Internet 0,10, VPC 0,16 ; 2024 : librairies 0,27, GSS 0,30, GSA 0,18, Internet 0,20, VPC 0,01.
  Aussi : occasion 20 % des volumes en 2024, numérique 4 % en valeur, 12 774 traductions dont
  6 832 de l'anglais et 2 270 du japonais (manga), 2 % des références vendues font 49 % ?
  (`pdm_10000_meilleurs` 0,49 — à lire dans la notice avant d'écrire).
- **F** Aires empilées 100 % des circuits 1993-2024 (`type="bar" stacked` par année ou courbes) ;
  petits multiples par indicateur, même échelle ; KPI 2024 ; carte des librairies LIR par
  département pour 100 000 hab.
- **C** `dsfr-data-normalize` lourd (×100, renommage) ; `dsfr-data-pivot` si passage long ;
  `dsfr-data-display` pour un graphique par indicateur.
- **P** Le fichier est **sale** : virgules décimales sur certaines cellules (`0,08`, `-0,03`),
  espaces dans les nombres (`85 197`), `tirage_moyen` typé date par l'API (inutilisable), noms
  de colonnes avec espaces de tête/queue. Ne tracer que les colonnes proprement numériques après
  vérification du profil ; **dire lesquelles sont écartées et pourquoi**. Une part est une part de
  ce que mesure la source (panel) : le nommer.
- **V** Une requête (33 lignes) ; librairies 17 requêtes.
- **E** S/M.

### 9. Emploi culturel : 9 % des établissements parisiens, 1,6 % dans les Ardennes

- **T** « À Paris, un établissement employeur sur onze est culturel ; dans les Ardennes, un sur
  soixante »
- **Q** L'économie culturelle est-elle une affaire de métropoles ? Lecteur : élu, développeur
  économique, presse régionale.
- **J** Établissements culturels par département 2016-2022 `ed8f9703-ad77-48d2-bc24-99fcc6f81b74`
  (700) ; Salariés des secteurs culturels par département 2016-2022
  `2308f8e2-211b-425a-bb38-0e08700e14ab` (700) ; Professions culturelles 2017 `84018ddf…` (101) ;
  versions région (`94c99406…`, `023632ee…`, `cd0e4f61…`) et zone d'emploi.
- **H** Paris : 17 790 établissements culturels en 2022 (9,1 %, 13 174 en 2016), 139 157 ETP
  culturels (7,8 %). Ardennes 1,6 %, Aisne 1,8 %, Haute-Marne 1,8 %. La série 2016-2022 permet
  la pente (qui a gagné des points ?).
- **F** Carte choroplèthe 2022 ; barres groupées 2016/2022 triées sur l'écart (pente approchée) ;
  scatter établissements % × salariés % ; tableau.
- **C** `dsfr-data-join` sur `code_insee` + `millesime` (unicité : 100 × 7 = 700 des deux côtés) ;
  `dsfr-data-pivot column="millesime"` puis `compute="ecart"` ; `map-summary="weighted"` pondéré
  par `nombre_etablissements`.
- **P** Casse différente des clés (`code_insee` / `Code_insee`) selon le jeu ; `Pct_culturel`
  fourni : ne jamais le moyenner, recalculer le national en ratio de sommes ; 2017 seul pour les
  professions ; définition « culturel » = nomenclature NAF listée en description, la citer.
- **V** Chargements complets (≈ 1 500 lignes).
- **E** S.

### 10. Monuments nationaux 2019-2022 : l'année où Chambord a dépassé l'Arc de Triomphe

- **T** « En 2020, le premier monument national n'était plus à Paris : Chambord 575 910 entrées
  devant le Mont-Saint-Michel ; en 2022 l'Arc de Triomphe est repassé à 1 754 750 »
- **Q** Comment la fréquentation des 99 monuments du CMN a-t-elle traversé la crise ? Lecteur :
  presse, tourisme, CMN.
- **J** Fréquentation des monuments nationaux `4b6182c9-1989-456f-925c-d98bd363cee7` (396 = 99 × 4).
- **H** 2022 : Arc de Triomphe 1 754 750, Mont-Saint-Michel 1 285 610, Sainte-Chapelle 1 201 620.
  2020 : Chambord 575 910, Mont-Saint-Michel 497 000. Totaux annuels **à rejouer**.
- **F** Petits multiples des 12 premiers (`dsfr-data-display` + un `dsfr-data-chart` par
  monument, `y-max` commun) ; pente 2019→2022 (barres groupées triées sur l'écart) ; carte à
  cercles proportionnels 2022 ; tableau.
- **C** Motif « un graphique par ligne » ; `dsfr-data-pivot column="Année"` ; `radius-field`.
- **P** Chiffres arrondis à la dizaine (dit dans la description) ; le domaine national de
  Chambord est-il dans le périmètre toutes les années (vérifier 99 lignes chaque année : oui,
  99/99/99/99) ; Paris intra-muros regroupe plusieurs monuments : ne pas confondre le monument et
  la ville.
- **V** Deux requêtes.
- **E** S.

## 4. Deuxième vague — dix pages, matière vérifiée, histoire à confirmer

### 11. Basilic : 86 366 lieux culturels, six sur dix sont du patrimoine

- **T** « La base des lieux culturels compte 53 503 lieux de patrimoine, 15 702 bibliothèques et
  2 081 cinémas »
- **Q** Combien de lieux culturels pour 10 000 habitants, et de quels types, selon les territoires
  (grille de densité `GCD`, aire d'attraction `AAV`, QPV) ? Lecteur : DEPS, élu, chercheur.
- **J** Basilic `dced78ee-0823-4b61-86e6-57717308d4e4` (86 366, 54 colonnes) ; population par
  département (fiche 1).
- **H** Domaine Patrimoine 53 503 (62 %) ; Type « Cinéma » 2 081 (fauteuils, écrans, multiplexe) ;
  « Bibliothèque » 15 702. À construire : lieux hors patrimoine pour 10 000 hab par département ;
  part des lieux en QPV (`identifiant_QPV_24` non nul) ; répartition par `GCD` (rural à habitat
  dispersé → centres urbains).
- **F** Barres triées domaines (patrimoine grisé, pour que le reste se lise) ; carte départementale ;
  barres par grille de densité ; KPI QPV.
- **C** Tout en **agrégats serveur** (`Domaine__groupby`, `N_Département__groupby`, `GCD__groupby`,
  `Nombre_fauteuils_de_cinema__sum`) ; jamais de chargement complet (432 pages).
- **P** La modalité `Spectacle vivant` **n'existe pas** dans `Domaine` (0 ligne) : lire la liste des
  domaines. `Demographie_AP` porte des lieux **fermés** : filtrer `Actif`. Le patrimoine écrase tout :
  le griser ou le sortir de l'échelle, en le disant.
- **V** Agrégats serveur.
- **E** M.

### 12. Trouver un lieu culturel ouvert (Base des lieux culturels ouverts, 2026)

- **T** « 36 392 lieux ouverts au public, avec leurs conditions d'ouverture » — page **explorateur**
  (martini glass inversé : trois repères, puis la recherche).
- **Q** Qu'est-ce qui est ouvert près de chez moi ? Lecteur : habitant.
- **J** Base des lieux culturels ouverts `4bd1a20e-4dfd-40ff-bd4d-c714f7085de8` (36 392, mise à jour
  2026-09-26 ; Île-de-France 3 368).
- **F** Carte de points (36 000 → `max-items`), recherche serveur, facettes région/département,
  liste avec gabarit (nom, adresse, conditions, lien).
- **C** `dsfr-data-search` serveur ; `select` strict (10 colonnes) ; `{{#each}}` sur les champs
  tableau… **si** l'API les rend en tableau.
- **P** `domaines`, `labels`, `types` sont des **tableaux sérialisés en texte** (`["Lecture, livre et
  presse"]`) : `contains` fonctionne sur le libellé, pas un `exact` ; le split `,` de `dsfr-data`
  casserait `"Lecture, livre et presse"`. Codes Corse `2B298`. Descriptions longues : ne pas les
  projeter. Successeur de Basilic (11) : ne pas additionner les deux bases.
- **V** Chargement complet avec `select` (182 requêtes, ou Parquet) **ou** recherche serveur seule.
- **E** M.

### 13. Musées de France : 487 musées sur 1 216 sont eux-mêmes des monuments historiques

- **T** « Quatre musées de France sur dix sont abrités dans un monument protégé ; 133 sont en
  Île-de-France »
- **J** Muséofile `5ccd6238-4fb0-4b2c-b14a-581909489320` (1 216, **hors liste, servi par Tabular**) ;
  Fréquentation 2024 (fiche 2) ; Expositions d'intérêt national
  `3f102027-0472-46f9-9a01-8d2526659cb5` (276, 2014-2025, 33 en 2025).
- **H** `Protection_batiment` contient « Monuments historiques » : 487 ; par `Domaine_thematique`
  (multi `;`) ; musées ayant reçu le plus de labels EIN depuis 2014.
- **F** Carte des musées, rayon = entrées 2024 ; barres domaines thématiques ; barres triées des
  musées les plus labellisés ; tableau.
- **C** `dsfr-data-join on="IDMuseofile"` (unicité côté Muséofile : 1 216 identifiants uniques à
  vérifier par `group-by`) ; `split=";"` sur le domaine ; facettes client.
- **P** Un musée sans ligne de fréquentation n'est pas un musée vide (non-déclarant) ; `Categorie`
  souvent vide ; multi-domaines → un musée compte dans plusieurs barres, le dire.
- **V** Chargements complets (≈ 2 500 lignes).
- **E** M.

### 14. Sites patrimoniaux remarquables : 1 145 communes, six SPR sur dix héritent d'une ZPPAUP

- **J** SPR `b916f51e-7252-41c2-8a0e-eb47e0c9292b` (1 145) ; MH par commune (fiche 6).
- **H** `spr_initial_regime_de_creation = ZPPAUP` 693 (60 %) ; communes de 53 habitants
  (Rochebrune) à Paris ; lignes « AVAP à l'étude » **sans numéro de SPR** (le tri sur
  `nombre_de_spr` les met en tête : nulls) ; création par décennie (`spr_initial_date_de_creation`).
- **F** Carte de points ; barres régime d'origine ; barres par décennie de création ; tableau
  recherche commune.
- **C** `dsfr-data-map-layer` ; `compute` décennie depuis la date (texte `2008-12-19` → substring,
  à vérifier dans la grammaire `compute`) ; jointure MH sur `code_insee`.
- **P** Nommer les lignes sans SPR effectif ; `population` sans millésime.
- **V** 6 requêtes. **E** S/M.

### 15. Architecture contemporaine remarquable : 1 824 édifices labellisés depuis 2000

- **J** ACR `80b6ac20-41b1-400c-8860-af201ff7dcb6` (1 824).
- **H** Premier label 2000 ; `Cadre_de_l_etude` porte deux modalités : « Labellisé » et
  « **Anciennement** labellisé » (édifices sortis du label, souvent devenus MH :
  `Ancienne_reference_de_la_notice_RENV` = `PA…`) ; architectes multi (`a;b;c`).
- **F** Barres par année de label ; carte de points ; barres par dénomination ; liste recherche
  architecte.
- **P** `Date_de_Label` vide sur une part (tri décroissant → nulls en tête) ; ne pas compter les
  « anciennement labellisés » dans le stock.
- **V** 10 requêtes. **E** S.

### 16. Sibil ne publie pas les billets, mais les lieux : 204 628 déclarations, 22,6 % à Paris

- **T** « Le fichier ouvert de Sibil décrit 204 628 déclarations clôturées à 97 % ; il ne contient
  aucun nombre de billets »
- **J** Sibil `cc51d662-d0e0-4a84-bca0-bd26c643b879` (204 628).
- **H** CLOTURE 198 934, BROUILLON 69 ; lieux à Paris 46 314 ; rattachées à un festival 16 879
  (8 %) ; dates de représentation à partir de 2024-01-10 (plus ancienne triée).
- **F** Carte départementale des déclarations pour 100 000 hab ; barres festival / hors festival ;
  top des lieux (`lieu_ID_sibil__groupby`, `count`) ; courbe mensuelle (requêtes par mois).
- **C** Agrégats serveur exclusivement (1 023 pages sinon).
- **P** Le titre doit dire ce que le jeu **ne** contient pas (pas de fréquentation, pas de recette).
  La jointure avec les Licences (`declarant_numero_licence` `2-1058290` vs `numero_recepisse`
  `2-PLATESV-R-2020-005380`) est impossible : formats différents — le dire. Un déclarant peut
  déclarer un lieu qui n'est pas le sien (Live Nation à l'Alhambra) : compter des lieux, pas des
  exploitants.
- **V** Agrégats serveur. **E** M.

### 17. Presse : 26 731 titres passés par la CPPAP, 4 965 inscrits aujourd'hui

- **T** « Un titre sur cinq du registre CPPAP est encore inscrit ; 2 385 sont des services de presse
  en ligne » + volet aides : « Télérama 5,25 M€, La Croix 4,26 M€ d'aide à l'exemplaire posté en
  2023 »
- **J** Publications de presse `a98cced2-babe-45b4-95dd-ce5336155dbc` (26 731, **hors liste, servi
  par Tabular**) ; Aide à l'exemplaire postés `126591d3-a0cd-4b99-b898-dc99c0215102` (382 lignes,
  **2023 seulement**) ; SPTEL `90207bad-994d-4998-8cac-531842a709f8` (110, 2022-2023, 0 en 2024) ;
  Ultramarins `ea9eab5e-6a34-4afb-b6b6-e7e0d89a3538` (32) ; FSDP `9383d0ba-c30a-4e79-82b7-1f6f8f9b49db`
  (81, **2014 seulement**).
- **H** Imprimé 24 346 / SPEL 2 385 ; Inscrit 4 965 ; Paris 8 310 (31 %) ; 30 % des titres aidés
  captent quelle part (sommes à rejouer) ; catégories (`HEBDOMADAIRES REGIONAUX`, `QUOTIDIENS IPG`,
  `QFRP-QFRA ≥ 35 g`).
- **F** Barres statut × type ; carte départementale des titres inscrits ; barres triées des aides
  avec part cumulée ; facette catégorie ; tableau.
- **C** Agrégats serveur sur CPPAP (`departement__groupby`, `statut_inscription__groupby`) ;
  chargement complet des aides ; `running_sum`.
- **P** Jointure titres aidés × CPPAP **impossible** sans normalisation (`CROIX (LA)` vs
  `LA CROIX`) : ne pas la promettre. Aides : une seule année par fichier, pas de série. Le registre
  CPPAP est un **historique** (expirés, radiés) : le stock vivant est `Inscrit`.
- **V** Mixte. **E** S/M.

### 18. Imprimeurs, libraires et lithographes du 19e siècle : 18 % de femmes brevetées

- **T** « 3 261 femmes sur 17 969 brevetés entre 1810 et 1881 — le plus souvent des veuves qui
  reprennent le brevet »
- **J** `1c3f80c4-ace5-41ef-b6e1-983a8ccb5c69` (17 969).
- **H** Sexe femme 3 261 ; `Nom d'épouse` renseigné → hypothèse veuves à vérifier par comptage
  (`Prédécesseur(s)` = même nom) ; par département d'époque (`Seine`) ; par type de brevet.
- **F** Barres part des femmes par type de brevet ; carte de points (`Géolocalisation`) ;
  barres par département ; liste recherche nom.
- **C** Agrégats serveur `Sexe__groupby`, `Type de brevet__groupby` ; chargement complet (90
  requêtes) pour la carte et la recherche.
- **P** Dates en texte libre (`4 décembre 1837`) : **pas d'année exploitable** sans transformation
  hors `dsfr-data` → aucune série temporelle ; le dire. Départements de 1850 ≠ 2026.
- **V** Mixte. **E** M.

### 19. Moulins à eau, moulins à vent : la France de 1809

- **J** Enquêtes moulins 1794-1809 `912c2c2f-9a5f-4316-8671-c2d995f55ca5` (20 313 notices, colonne
  `Nombre de moulins`) ; Meuniers 1801 `a8f094da-8aa1-41ca-997f-790657993c99` (5 157).
- **H** 4 258 notices « moulin à vent » (≈ 21 % des notices, mais la somme de `Nombre de moulins`
  est à rejouer) ; carte eau/vent par département actuel.
- **F** Deux couches de cercles (eau, vent) par département ; barres par enquête ; tableau.
- **C** `group-by="Département actuel, Type de moulin" aggregate="Nombre de moulins:sum"` (serveur).
- **P** **Trois enquêtes** (1794, 1801, 1809) : additionner les trois compte trois fois → filtrer
  `Date de l'enquête`. Communes hors France actuelle (`Pays`). Une notice ≠ un moulin.
- **V** Agrégats serveur. **E** M.

### 20. Usagers en ligne des archives : 2014 vs 2021, ce qui a changé

- **J** `bc564101-e2c8-407b-ab07-1396326bce50` (46 279 réponses : 18 556 en 2014, 27 723 en 2021).
- **H** Généalogie motif dominant, âge (`age_num`), recommandation (0-10), premières visites ; le
  message : « qui répond » (retraités diplômés) autant que « ce qu'ils disent ».
- **F** Barres groupées 2014/2021 par motif ; distribution d'âge par tranche ; KPI recommandation ;
  petits multiples par question.
- **C** `group-by="Année, but_visite" aggregate="N°Obs:count"` (serveur) ; `compute` tranches.
- **P** **Libellés différents entre éditions** (`rech. généalogique` vs `Pour une recherche
  généalogique`) : table de correspondance par `compute`, sinon deux barres pour un motif.
  Multi-réponses `;`. Enquête en ligne auto-administrée : **pas représentative**, l'effectif
  s'affiche partout, pas de « les Français ». Une colonne de nom `N°Obs` (caractère `°`) et
  `1ere_consult` : vérifier qu'elles se délèguent.
- **V** Agrégats serveur. **E** M.

## 5. Troisième vague — huit pages (la matière ne justifie pas dix)

### 21. Voyages officiels depuis 1945 : où vont les présidents ?

- **J** Déplacements `d6df4e06-d55c-4616-a974-2b53d0d4e025` (2 750, `Pays`, `Code pays` ISO3,
  `Année du voyage`, `Individu`, `Fonction`).
- **F** Petits multiples voyages/an par président ; barres pays (pas de carte monde dans DSFR
  Chart : tableau trié) ; tableau.
- **P** Fonds d'archives : couverture par période à établir (`Année du voyage` min/max) avant de
  comparer des présidents. **E** S.

### 22. Préfets et préfètes depuis 1800 : quand les femmes arrivent-elles ?

- **J** `fdd11c64-06b5-4aa0-9c0d-b4b2d443e129` (3 918 ; colonne `Sexe`, années de naissance et de
  mort, postes datés). Part des femmes et année de la première nomination **à sonder**
  (`Sexe__groupby` non rejoué : blocage réseau) — le titre se calcule dans la page, pas de
  littéral.
- **F** Part des femmes par décennie de nomination ; durée moyenne en poste ; tableau.
- **P** `Poste en département (dates)` = `1928-1929 : Belfort|1929-1930 : Corrèze` : multi-postes
  séparés par `|`, à éclater (`split` de `dsfr-data` sépare sur `,` — vérifier le séparateur
  configurable) ; la décennie se dérive d'un texte. **E** M.

### 23. Journées du patrimoine 2023 : 28 395 événements, un sur cinq accessible en fauteuil

- **J** JEP `22c595ae-8104-4911-b7c3-3cad982eee9c` (28 395, **édition 2023**) ; population par
  département (fiche 1).
- **H** Île-de-France 3 048 (10,7 %), Paris 584 ; `Accessibilité` contient « moteur » : 5 910
  (21 %).
- **F** Carte départementale événements / 10 000 hab ; barres accessibilité (multi `;`) ; facettes
  tags du lieu ; tableau.
- **P** Colonnes `Code d'accessibilité`, `Accès / Itinéraire` (apostrophe, slash) : la délégation
  d'un nom à apostrophe rend 42703 selon le source de l'adaptateur → agréger côté client ou
  éviter ces colonnes au serveur. Un événement a plusieurs dates. **E** M.

### 24. Été culturel : 2 365 événements en 2025, 3 M€ pour l'Île-de-France

- **J** Été culturel « 2024 » `affd17b7-a8a6-4603-859a-1c20603a0889` (2 365 lignes datées **2025**) ;
  aides déconcentrées Été culturel 2021-2023 `872361c7-fc90-4257-b96f-64422c0036ea` (21 régions,
  Île-de-France 3 600 000 → 3 000 000 €, Guyane 77 500 → 86 000 €).
- **F** Carte de points ; barres régions 2021/2022/2023 ; KPI.
- **P** Trois colonnes-années à passer en long (`dsfr-data-pivot` inverse : vérifier l'existence
  d'un dépivot, sinon trois `normalize`) ; le titre du jeu (2024) ne correspond pas aux dates
  (2025). **E** S.

### 25. Festivals financés par le programme 131 : Aix et Avignon d'abord

- **J** `e4761b32-c601-4ec9-b361-658315d07389` (1 602 ; 810 en 2024).
- **H** Aix 5 108 000 € (2024), Avignon 4 688 998 € (2023) ; concentration à rejouer ; domaines.
- **F** Barres triées + part cumulée ; barres domaines ; carte de points par code postal
  (géocodage absent : pas de coordonnées → carte départementale seulement) ; tableau.
- **P** Un festival sur deux années = deux lignes : dédoublonner sur nom (SIRET souvent vide) ;
  `Lieu du festival` avec espace final ; « Région = DGCA » n'est pas une région. **E** S.

### 26. Entrepreneurs de spectacles étrangers en France : 1 658 déclarations en dix-sept mois

- **J** `e6a3517f-dac4-446f-bffd-02216be7bfb0` (1 658, dépôts depuis 2025-04-29 ; Royaume-Uni 171).
- **F** Barres pays ; barres région de première représentation ; durée (`date_fin − date_debut`,
  `compute`) ; tableau.
- **P** `status` vide sur une part ; jeu jeune (pas de saisonnalité lisible). **E** S.

### 27. Plan de relance culture : 328 projets, 17 décembre 2021

- **J** `4b798b56-c1d4-4ad4-8395-cf7709d817bf` (328, `Montant (€)`, enveloppes, coordonnées).
- **F** Barres par enveloppe ; carte de points ; tableau.
- **P** Coordonnées manquantes sur une part (ligne 2 sans code INSEE, adresse à Bayonne pour un
  projet à Tours : **incohérence dans la source**, à signaler) ; colonne `Coordonnees GPS [lat,lon]`
  non délégable (virgule). Photographie figée. **E** S.

### 28. Expositions d'intérêt national 2014-2025 : quels musées reviennent ?

- **J** `3f102027-0472-46f9-9a01-8d2526659cb5` (276 ; 33 en 2025).
- **F** Barres par année ; podium des musées les plus labellisés ; carte de points ; liste.
- **P** Petit jeu : une page courte, ou un bloc de la fiche 13. **E** S.

## 6. Écartés, et pourquoi

| Jeu | Raison |
|---|---|
| Compar:IA (`278fb12a…`) | La ressource Tabular n'est que le **dictionnaire des colonnes** (104 lignes) ; les données sont ailleurs (Hugging Face). |
| Catalogue des données, Catalogue topic, Cartographie des démarches, Répertoire des ressources documentaires, Vocabulaires, Thésaurus iconographie chrétienne, Autor, FranceArchives (lieux, autorités, inventaires), Institutions productrices de ressources pédagogiques | Référentiels et catalogues : une liste, pas une question chiffrée. Utilisables comme **index** du portail, pas comme dataviz. |
| Documentation d'architecture (68 910), Images du Palais-Royal, Grands documents AN, Mémoire MPP, C2RMF (notices), Corpus numérisés, Inventaires AN, Expositions temporaires AN, Manuscrits de théâtre, Pièces écrites par des femmes 1809-1906 | Notices documentaires ; les deux dernières auraient une histoire (part des autrices) mais **non sondées** (blocage) : à reprendre si la matière manque ailleurs. |
| Pratiques culturelles des Français 1973-2008 (`6709d178…`) | 17 lignes de **liens vers des .xls** : rien à tracer. |
| Terres de jeux 2024 (communes, EPCI, régions) | Hors thème culture ; labels sans variable. |
| Nuit des musées 2015/2022/2023/2024, Nuits de la lecture 2022, Rendez-vous aux jardins 2023, JEP 2024, Semaine de la langue française 2018 | Programmes d'une édition ; schémas hétérogènes d'une année à l'autre (la Nuit 2015 a 60 colonnes). Une famille = une page (JEP 2023, fiche 23). |
| Protocoles de remise d'archives, expositions itinérantes, activités pédagogiques, publications scientifiques des archives, accès anticipé, revendications, circulation des archives (3 jeux), enquête archives universitaires, Dossiers Sûreté nationale, émigrés, pourvois Cour de cassation, pensions 1789-1848, bannissement 1816, tombes 1870-71, chômeurs artistiques, presse allophone, cadastre Paris, événements climatiques | Fonds patrimoniaux à faible variable quantitative ou **non sondés** ; le « suivi mensuel des ventes aux enchères » (`31674339…`) est le seul qui pourrait porter une série — à sonder. |
| Établissements publics (84), Dix plus hautes rémunérations (hors Tabular) | Trop petit ; pas de mesure. |
| Premières pages (42/…), Contrats départementaux lecture, Compagnonnage (38), cirques (35 + n), Cahier des aides nationales cirque/rue (hors Tabular) | Listes de bénéficiaires < 50 lignes : un tableau suffit, éventuellement en bloc de la fiche 4 (lecture) ou 25 (spectacle). |
| Immeubles MH « archives » (`edf158f9…`) | Remplacé par la version vivante (fiche 6). |
| Dépenses culturelles 2019-2020 (communes), régions (total) 2022 | Millésimes antérieurs des fiches 1 : à garder pour une série si les schémas coïncident (à vérifier), pas comme pages. |

### Hors Tabular à fort potentiel (à signaler au producteur ou à traiter autrement)

| Jeu (vues) | État Tabular | Ce qu'on perd |
|---|---|---|
| Aides à la presse : classement des titres aidés (71 370 vues, **jeu le plus consulté**) | CSV **non disponible** (« may not be tabular data ») ; JSON 3,7 Mo | La seule série pluriannuelle des aides à la presse (2012-2023). Demander un CSV propre. |
| Joconde (56 227) | CSV 1,2 Go, non testé | Collections : hors portée du client de toute façon. |
| Objets mobiliers MH / Palissy (10 303) | CSV 365 Mo, non testé | Pendant mobilier de la fiche 6. |
| Aides déconcentrées au spectacle vivant ADSV 2022-2024 (7 244) | **Non disponible** | Le financement du spectacle vivant par région : c'était la clé du croisement Licences × Sibil × aides. |
| Données essentielles des conventions de subvention (7 081) | CSV 163 Mo, non testé | Toutes les subventions du ministère. |
| Dépenses culturelles **par secteur** (régions, départements, EPCI) | non testés | Enrichiraient la fiche 1 (quel secteur pèse). |
| Liste et localisation des Musées de France (47 866) | ODS/XLSX 2022 | Remplacé par Muséofile. |
| Panorama des festivals (16 765), Structures de la création artistique, Label 100 % EAC, Actifs des secteurs culturels, Fréquentation des salles de cinéma (2018) | non testés (blocage) | À tester dès que l'accès revient. |

## 7. Croisements retenus (même maille, unicité à vérifier avant d'écrire)

| Croisement | Clé | Côté droit unique ? | Fiches |
|---|---|---|---|
| Dépenses départements ↔ dépenses État ↔ emploi | `code_insee` département | 95 / 100 / 101 lignes : vérifier Corse (`20` vs `2A/2B`) et DROM | 1, 3, 9 |
| Fréquentation musées ↔ Muséofile ↔ EIN | `IDMuseofile` / `Identifiant` / `ID Muséofile` | Muséofile : 1 216 identifiants, `group-by` à rejouer | 2, 13 |
| MH ↔ SPR | `COG_Insee_lors_de_la_protection` ↔ `code_insee` | code périmé côté MH : appariement partiel à chiffrer | 6, 14 |
| Bibliothèques ↔ Basilic ↔ dépenses communes | `code_insee_commune` | Basilic 15 702 ≈ 15 704 : cohérent | 4, 11 |
| Toute carte départementale ↔ population 2023 | `code_insee` | 95 départements (Mayotte inclus) | 2, 4, 6, 7, 11, 16, 17, 23 |
| Festivals ↔ P131 | nom / SIRET | **non** (SIRET vide, noms différents) : comparaison par région seulement | 5, 25 |
| Licences ↔ Sibil | numéro de licence | **non** (formats différents) | 7, 16 |
| Aides presse ↔ CPPAP | titre | **non** sans normalisation | 17 |

## 8. À rejouer avant d'écrire une page (sondages empêchés par le blocage réseau)

1. **Export Parquet** : pour chaque ressource de la vague 1, `GET www.data.gouv.fr/api/2/datasets/resources/{rid}/` → `parquet_url` présent ? Décide entre `fetch-mode="export"` et la pagination (fiches 2, 4, 5).
2. **Sommes** : entrées totales des musées par année et part Louvre + Versailles (2) ; totaux
   annuels des monuments nationaux (10) ; total des dépenses de l'État et part de Paris (3) ;
   montants P131 par région et part du top 10 (25) ; aides presse par catégorie (17) ; `Nombre
   de moulins` par type (19).
3. **Modalités** : `statut_recepisse` complet (7) ; `Domaine` de Basilic (11) ; `Statut` des
   bibliothèques (4) ; `Typologie_de_la_protection` complète (6) ; `Décennie de création` (5).
4. **Unicités** des clés de jointure du § 7.
5. **Délégabilité** des colonnes à caractères spéciaux (`N°Obs`, `Code d'accessibilité`,
   `Montant (€)`, `Nombre d'actifs exerçant une profession culturelle_2017`) : un `group-by`
   serveur sur chacune, HTTP 200 ou 42703.
6. Les jeux hors Tabular listés au § 6 : réessayer `/profile/` ressource par ressource.
