# Analyse métier — Bulletins officiels des finances publiques

> La lecture `dataviz-metier` : le sens avant la syntaxe.
> **Ce fichier n'est jamais écrasé par un script.** Les sorties du modèle
> multimodal arrivent dans `constats/` ; ce qui est retenu se réécrit ici, à la main.
>
> Relecture du 2026-09-26, niveau **avancé** (une page entière), en lecture seule. Chaque chiffre
> ci-dessous a été rejoué à l'API `data.economie.gouv.fr` (`bofip-vigueur`, 9 148 lignes,
> `modified` 2026-09-17) et la page a été chargée au navigateur (Playwright, dsfr-data 0.33.0,
> 0 erreur console). Piste héritée de #75 et check-list de #76 revérifiées point par point.

## La question posée, et pour quel lecteur

_Une phrase. Si on ne sait pas la dire, la dataviz ne sait pas ce qu'elle montre._

**Question** : « Quel commentaire de l'administration fiscale s'applique aujourd'hui à ma
situation, et de quand date la version que je lis ? » **Lecteur** : un fiscaliste, un comptable,
un contribuable averti qui cherche *son* BOI — un **explorateur**, pas un lecteur de rapport.
La page est d'abord un moteur de recherche (bandeau plein texte, facettes série / division /
type, cartes vers le permalien) : c'est juste, et c'est ce que l'original d'economie.gouv.fr
ne fait pas lui-même (il renvoie vers bofip.impots.gouv.fr).

Le seul bloc « récit » est la chronologie. Sa question réelle n'est pas « de quand date le
droit applicable » mais **« de quand date la version en vigueur des commentaires »** — et
cette différence est le défaut de fond de la page (voir Honnêteté).

**Hors objet, à écrire** : la page ne dit rien du droit (dates d'application des mesures,
textes commentés), rien de l'historique des versions (le jeu ne porte que la version en
vigueur), rien du volume de doctrine par impôt au sens économique (une série n'est pas un
poids fiscal).

## La forme retenue, et pourquoi elle sert cette question

- **Moteur serveur** (`server-search` + `server-facets` + pagination serveur) : la seule forme
  possible sur un corpus dont chaque ligne porte plusieurs Ko de texte ; la recherche porte
  sur l'index Opendatasoft du champ `contenu` sans jamais le charger. « crédit d'impôt
  recherche » → 504 documents, « BOI-IR-RICI » → 502, « Corse » → 206 : l'index répond.
- **Cartes horizontales** avec identifiant, date, pastilles série / division / type : la bonne
  unité pour un explorateur qui balaie des titres longs.
- **Barres annuelles** pour la chronologie (15 barres, 2012-2026) : la forme convient à un
  compte par année ; le cumul est resté dans le tableau accessible après un essai `bar-line`
  écarté à bon droit (deux axes Y). La phrase de lecture (médiane du cumul par
  `share_percent` + `running_sum`) est calculée, pas écrite : c'est le bon geste.
- **Ce qui manque à la forme** : un sous-titre de méthode sous la chronologie (mesure,
  périmètre, « ne suit pas les filtres »), et l'explication du pic de 2012.

Vérifié : `server-facets` fonctionne sur ce jeu **qui ne déclare aucune facette** au
back-office — `/facets` est vide à l'API, mais le composant émet
`/facets?facet=serie&facet=division&facet=type` et le portail calcule à la demande
(« Contenu 6357 / Actualité 2791 » à l'écran). Le piège « jeu sans facette déclarée →
liste vide » du CLAUDE.md est à nuancer : c'est vrai sans `fields`, faux avec.

## Honnêteté de l'échelle

_Axe à zéro ? Moyenne de taux pondérée ? Résumé de carte pondérée ?_

- **Axe à zéro** : oui (barres, 0 → 1 600). Pas de double axe, pas de moyenne de taux, pas de
  carte. Les nombres sont justes : le KPI (9 148), le compteur (9 148), la médiane
  (4 788 / 9 148 = 52,3 % fin 2018 ; 46,9 % fin 2017) et les quinze lignes du tableau
  coïncident avec l'API au document près.
- **Le mot est faux, pas le nombre.** `debut_de_validite` date la **version publiée** du
  commentaire, pas l'entrée en vigueur du droit. Preuves : le libellé du champ au portail est
  « Début de validité » ; chaque permalien porte cette date en suffixe
  (`BOI-TVA-DECLA-10-10-20-20260909`) ; la page BOFiP de `BOI-INT-CVB-HUN` (version du
  12/09/2012) commente une convention « signée le 28 avril 1980 », applicable « à compter du
  1er janvier 1982 ». Dire « en vigueur depuis le 12/09/2012 » est faux de trente ans. La page
  le dit huit fois (h2, phrase de lecture, `databox-title`, `name`, description a11y, cartes,
  encadré). **Bloquant** (R1).
- **Le pic de 2012 n'est pas une année féconde** : `min(debut_de_validite)` = 2012-09-12,
  zéro document avant, **1 354 documents datés de ce seul jour** (la date suivante en pèse
  119) sur 1 478 pour l'année — l'ouverture du BOFiP, où la doctrine antérieure a été versée
  d'un bloc. La barre domine le graphique sans un mot. **Bloquant** (R2).
- **2026 est une année en cours** : 611 documents jusqu'au 9 septembre, contre 403 sur la même
  fenêtre de 2025 et 520 pour 2025 entière. La barre dépasse 2025 et se lit comme un record ;
  aucune date des données n'est affichée (le pied de la DataBox finit sur une virgule
  orpheline, « via data.economie.gouv.fr, »). **Important** (R4).
- **Chiffres écrits à la main** : l'encadré dit « les 9 146 documents » et « mis à jour le
  3 septembre 2026 » à côté d'un KPI qui affiche 9 148 ; le portail date la modification du
  17 septembre. **Important** (R5).
- **Tableau équivalent** : en-têtes bruts (`annee`, `nb`, `cumul_nb`, `cumul_part`), années
  rendues « 2 012 » parce que `year()` renvoie un entier, part à deux décimales flottantes.
  C'est pourtant la colonne que la phrase de lecture désigne. `date_format(…,'yyyy')` renvoie
  une chaîne « 2012 » (vérifié HTTP 200) et l'adaptateur découpe le `group-by` hors
  parenthèses (#767). **Important** (R6).

## Phrase de lecture

_Ce qu'un datajournaliste écrirait sous le graphique, avec chiffres et millésime._

Ce qui s'affiche aujourd'hui : « La moitié du corpus applicable aujourd'hui est entrée en
vigueur en 2018 ou avant : c'est l'année où le cumul franchit 52 % des documents (colonne du
tableau). » — arithmétiquement juste, sémantiquement fausse.

Ce qu'il faudrait lire, tout calculé dans la donnée (les nombres ci-dessous sont ceux du
2026-09-26) :

> **La moitié des 9 148 documents en vigueur au BOFiP sont dans leur version actuelle depuis
> 2018 ou avant** (le cumul franchit 52 % cette année-là). 2012 n'est pas une année féconde :
> 1 354 documents portent la date du 12 septembre 2012, jour d'ouverture du BOFiP, où la
> doctrine antérieure a été reprise en bloc. 2026 est l'année en cours, arrêtée au 9 septembre
> (611 documents). Le corpus compte 6 357 commentaires et 2 791 actualités ; la date est celle
> de la version publiée, pas celle d'entrée en vigueur des règles commentées.

Sous-titre de méthode du graphique : « Nombre de documents en vigueur par année de leur
version actuelle, 2012-2026 — ensemble du corpus, ne suit pas la recherche ni les filtres. »

## Ce qu'on ne montre pas, et qu'il faut dire

_Groupe null, troncature, échantillon, millésime manquant._

- **2 801 documents sans division** (2 791 actualités + 10 contenus) : la facette « Division »
  les écarte en silence — Opendatasoft ne renvoie jamais le groupe null dans `/facets` — et
  les cartes rendent une pastille vide (2 sur 30 au chargement, 10 sur 10 après la facette
  Actualité). À dire sous la facette, et `{{#if division}}` dans le gabarit (R3).
- **30,5 % d'actualités** dans un « corpus applicable » : le jeu s'intitule « Contenu doctrinal
  et actualités en vigueur » ; la page ne distingue les deux que par une facette. Le nommer
  dans l'encadré et la phrase (R3). La médiane ne bouge pas si l'on ne garde que les
  commentaires (cumul 3 352 ≥ 3 178,5 en 2018) : le message tient, il faut juste le dire.
- **23 identifiants juridiques en double** (9 125 distincts pour 9 148 lignes) : parfois deux
  versions « en vigueur » du même BOI (`BOI-RPPM-RCM-40-70` en 2023-06-19 et 2025-04-10),
  parfois deux enregistrements de même date (`BOI-BIC-RICI-10-60-10`). Le permalien est
  unique (9 148/9 148) : `uid-field="permalien"` plutôt que l'identifiant (R9). Le KPI
  « 9 148 documents » compte des lignes ; l'écart (0,25 %) se dit en une ligne.
- **6 lignes sans série** (annexes-racines `BOI-ANNX-000000`, `BOI-BAREME-000000`…) : négligeable,
  mais la facette Série ne les montre pas non plus.
- **La chronologie ne suit ni la recherche ni les facettes** : après « Actualité », les
  compteurs passent à 2 791 et le graphique reste celui des 9 148, sous le même titre. Rien ne
  le dit. Minimum : le sous-titre de méthode. Voie native à essayer : un `dsfr-data-context`
  visant `bofip` et `bofip-annees`, facettes en `context=` (le JSDoc de `dsfr-data-facets` dit
  que le contexte délègue chaque sélection aux sources qu'il vise) ; la recherche plein texte
  resterait à part (en mode `context` elle devient un `contains` sur un champ, pas le
  `search()` de l'index) (R7).
- **Pas de troncature** : les sources serveur paginent à 10, l'agrégat annuel tient en 15
  lignes sous `limit="30"`, le KPI lit `count(*)` en `:max`. Rien à signaler.
- **Ce que le jeu ne porte pas** : l'historique des versions, la date d'application du droit
  commenté, le texte légal visé. La page ne peut pas répondre à « depuis quand cette règle
  s'applique » — et doit cesser de le prétendre.

## Écarts avec l'original

_Uniquement des écarts de DONNÉES ou de capacité du lecteur.
Jamais de mise en page : l'équivalence visée est fonctionnelle, pas pixel._

- L'« original » du catalogue est une page éditoriale d'economie.gouv.fr sans dataviz ; la
  cible fonctionnelle réelle est le moteur de bofip.impots.gouv.fr. **Capacités
  équivalentes** : recherche plein texte (sur l'index ODS et non celui de la DGFiP — les
  classements de pertinence diffèrent), navigation par série / division, liste de résultats
  vers le permalien. **Capacité absente ici** : la navigation par plan (table des matières
  hiérarchique) et l'historique des versions d'un BOI, que seul le site source offre — le jeu
  ne les porte pas.
- **Ajout** par rapport à la cible : la chronologie des versions en vigueur, avec sa médiane.
  Elle est juste dans ses nombres et fausse dans ses mots (R1, R2, R4) ; corrigée, elle
  apporte une lecture que le site source ne donne pas.
- **Écart d'exposition** : « Contenu » et « Actualité » sont deux objets que le site source
  sépare (rubriques distinctes) ; ici ils sont mêlés dans un même compte et une même
  chronologie, avec une facette pour les distinguer. Acceptable pour un explorateur, à
  condition de le dire (R3).
- **Registre** : la relecture précédente (#75, #76) est confirmée sur tous ses points ; deux
  faits nouveaux (année en cours 2026, doubles versions « en vigueur ») s'y ajoutent. La
  section `#analyse` de la page décrit un contournement (source générique) que le code ne
  porte plus — à réécrire (R8). Les constats à consigner sont ceux listés dans #76, plus
  « un corpus versionné date la version, pas la règle » comme piège de la famille C.
