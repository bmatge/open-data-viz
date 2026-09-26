# Analyse metier — L'impôt sur le revenu : les déclarations nationales

> La lecture `dataviz-metier` : le sens avant la syntaxe.
> **Ce fichier n'est jamais ecrase par un script.** Les sorties du modele
> multimodal arrivent dans `constats/` ; ce qui est retenu se reecrit ici, a la main.

Niveau avancé : une page entière, relue au navigateur (Playwright, dsfr-data 0.33.0 CDN, cinq états : `?nom=1AJ`, `?nom=0AC`, `?nom=1BI`, `?nom=1CT`, recherche « pensions » sans case, page vide) et à l'API (`/exports/json` complet, 19 388 lignes, et `/records` pour les recoupements). Les chiffres ci-dessous sont ceux du 2026-09-26 ; le jeu a été modifié le 2026-04-07.

## La question posee, et pour quel lecteur

**Question** : « Pour une case donnée de la déclaration 2042, combien de foyers l'ont remplie et quel total y a été déclaré, année après année depuis 2006 ? »

**Lecteur** : un explorateur — quelqu'un qui cherche *sa* case (un fiscaliste, un journaliste qui suit les dons ou les pensions, un agent qui vérifie un ordre de grandeur). Ce n'est pas un lecteur de rapport : il n'y a pas *un* message, il y en a 2 253, un par case. La page est de famille exploration, et elle a raison de l'être — l'original n'existe pas, le catalogue renvoie à la fiche du jeu.

**Ce que l'usager obtient** : une case adressable par l'URL, deux courbes, un tableau exportable.

**Hors objet** : comparer des cases entre elles, agréger des cases (l'addition de cases hétérogènes n'a pas de sens, et la page le sait : `require-where`).

Ce que la page ne dit pas encore au lecteur et qui change sa lecture : **une ligne n'est pas toujours « des foyers et des euros »**. Pour 209 codes, `montant` est un effectif recopié ; pour 29 codes « Nombre de … », `montant` compte des personnes (des enfants, des ascendants) ; et **un code n'est pas une case** : la DGFiP réattribue des codes libérés à d'autres cases.

## La forme retenue, et pourquoi elle sert cette question

Deux courbes `type="line"` sur une `dsfr-data-query group-by="annee"`, trois KPI, un tableau. Pour une série de 6 à 19 points par case, la courbe est la bonne forme ; le tableau en dessous, trié par année décroissante, est le bon complément pour un explorateur. La facette `nom` en `select`, restreinte par la recherche serveur, tient la promesse « une case, dix-neuf ans » (2 253 cases dans un select seraient inutilisables ; « pensions » en ramène 96).

Trois défauts de forme, vérifiés :

1. **La courbe additionne plusieurs cases dès qu'on a cherché sans choisir.** `require-where` sur la source est levé par la recherche serveur ; la facette, en mode client, ne commande rien. Taper « pensions » sans choisir de case trace la somme de 96 cases (762 lignes) : 3,35 M en 2006, 4,33 M en 2018, **29,9 M en 2019, 47,5 M en 2021** — un « décollage » qui n'est que l'arrivée de nouveaux libellés contenant le mot. Et le KPI « Pic de déclarants » (19 838 253 = une seule ligne, le max) ne se recoupe pas avec la courbe (une somme). Le texte d'aide l'avoue ; la page le trace quand même. La voie native existe et a été éprouvée sur une page minimale : **un `dsfr-data-context sources="ir ir2"` + `dsfr-data-facets context="ctx"` + une seconde source `require-where` pour les courbes** — recherche « pensions » → liste 762 lignes, courbes en attente ; choix de 1BI → courbes 18 points, URL `?nom=1BI` ; `?nom=1AJ` → les deux sources se réveillent sur `nom = "1AJ"`.

2. **Un code réattribué est tracé comme une seule série.** 1BI : 147 652 foyers en 2017 (case à cocher « Conjoint demandeur d'emploi + 1 an »), 409 en 2019 (« pension capital PER dec2 », en euros). La courbe montre une chute ; c'est un changement de case. Le tableau porte le libellé par année, mais la courbe et les KPI le gomment. Éprouvé : `series-field="libelle"` sépare bien les séries, **mais le pivot comble les cellules absentes par 0** (`_processTidyData`, « Missing (label, series) cells are 0 », `dsfr-data-chart.ts` l. 651) : la série retirée est tracée à plat sur zéro. Pas utilisable ici tant que ce n'est pas corrigé ; à remonter à la bibliothèque. La forme honnête disponible : un bloc « libellés portés par ce code » (query `group-by="libelle"` + `annee:min` / `annee:max`, rendu par `dsfr-data-display`) et un KPI `libelle:distinct`.

3. **Le titre ne reprend pas le choix du lecteur** (A18). « Nombre de foyers ayant rempli la case, par année » est le même titre pour 1AJ et pour 0AC. Avec le contexte ci-dessus, `dsfr-data-context-value template="Case {{nom}}" fallback="Choisissez une case" live` rend « Case 1AJ » (vérifié).

## Honnetete de l'echelle

- **L'unité est fausse pour 238 codes.** `format="euro"` sur le KPI, « (€) » dans le nom de série, `unit-tooltip="€"`, « Montant (€) » dans le tableau. Sur `?nom=0AC` — l'un des cinq exemples que la page met en avant — le lecteur lit « 17 934 123 € euros déclarés » de célibataires. Preuve : 1 242 lignes / 209 codes avec `montant == nombre` (146 codes sur toutes leurs lignes) ; 29 codes « Nombre de … » avec un montant-effectif différent de `nombre` (0CF : 8 784 002 foyers, 15 153 706 enfants). La description du champ à l'API le documente à moitié (« il peut s'agir de la somme d'un nombre de personnes selon le libellé ») et se trompe sur l'autre moitié (« la case est vide s'il s'agit d'une case à cocher » : zéro null dans le jeu). Geste vérifié : `dsfr-data-normalize compute="unite = when montant = nombre or contains(lower(libelle), 'nombre') or contains(lower(libelle), 'coch') then 'effectif' else 'euros'"` rend `effectif` pour 0AC (19 lignes), `euros` pour 1AJ, et 719 / 43 sur la recherche « pensions ». Résidu à dire : 7FZ (« nombre de m² ») n'est ni l'un ni l'autre.
- **L'axe Y ne part pas de zéro.** Sur 1AJ, l'axe court de 21 M à 23 M : une variation de 6,7 % remplit le cadre, le creux de 2016 (21,28 M) ressemble à un effondrement. `y-min` existe sur `dsfr-data-chart` (l. 274) ; avec `y-min="0"` l'axe part de 0 (vérifié sur la page d'essai). `setBound` ne pose une borne basse que s'il y a des `targets` : sans lui, c'est Chart.js qui cadre sur la donnée.
- **Les grands nombres sont en notation complète** : « 616 007 685 378 € ». La page l'impute à l'absence d'un format compact et son verdict dit « AM-031 confirmé » — or AM-031 est **corrigé depuis 0.22.0** (`format="compact"`, `unit`, `decimals`), et le dépôt charge 0.33.0. Le paragraphe est périmé ; `format="compact"` rend « 616 Md ». Ne pas y accoler `unit="€"` : l'unité dépend de la case (point précédent).
- **Le compteur de recherche compte des lignes et les appelle « cases ».** `count-label="case"` : « 762 cases » pour 96 cases distinctes (`search("pensions")` → `total_count` 762, `count(distinct nom)` 96) ; « 19 cases » pour 1AJ. `count-label="ligne"` (vérifié : « 762 lignes ») et un KPI `value="nom:distinct"` (vérifié : 96) disent le vrai.
- Le KPI « Lignes — années × cases » est juste mais ne répond à aucune question ; « Première année / Dernière année / Années couvertes » (query `aggregate="annee:min:premiere, annee:max:derniere, annee:count:n"`, vérifié : 2006 / 2024 / 8 sur 1CT) rend visible ce qui manque.
- Pas de moyenne de taux, pas de double axe, pas d'arrondi amont : rien à signaler.

## Phrase de lecture

Il n'y en a aucune : ni `description` sur les deux `dsfr-data-a11y`, ni chapô calculé. Pour un explorateur, la phrase ne peut pas être un message figé ; elle peut être **la fiche de la case**, calculée dans la donnée et rendue par un `dsfr-data-display` sous le titre :

> **1AJ** — libellés portés par ce code : « Salaires - vous » (2006-2020), « Salaires - Déclarant 1 » (2021-2024). 19 années couvertes sur 2006-2024. Le montant est en **euros**.

> **1BI** — « Conjoint demandeur d'emploi + 1 an » (2006-2017), « pension capital PER dec2 » (2019-2020), « Pensions en capital des nouveaux PER - Déclarant 2 » (2021-2024). 18 années couvertes sur 2006-2024 : 2018 est absente. **Ce code a changé de case** : les deux courbes ne décrivent pas la même chose avant et après 2018.

> **0AC** — « Situation du foyer fiscal : Célibataire » (case à cocher). 19 années. Le « montant » est un **effectif** : la DGFiP y recopie le nombre de foyers.

La phrase générique qui manque sous les courbes, valable pour toutes les cases : « Une année absente n'est pas un zéro : la case n'existait pas cette année-là, ou elle est soumise au secret statistique. Un libellé qui change peut signaler une réattribution du code à une autre case : vérifiez le tableau. » Elle va dans `dsfr-data-a11y description`.

À ne pas raconter : le pic de 7UF « Dons aux œuvres » en 2017-2018 (7,28 Md puis 6,89 Md, contre 2,13 Md en 2016 et 2,21 Md en 2019, **même libellé**). La donnée ne l'explique pas (changement de périmètre ? erreur de collecte ?) ; la courbe le montre sans un mot. Une rupture se vérifie avant de se raconter — ici on ne peut que la signaler.

## Ce qu'on ne montre pas, et qu'il faut dire

- **Les années absentes.** 674 codes sur 2 253 ont des trous dans leur propre plage (5 863 lignes) ; 264 codes seulement couvrent les 19 ans ; 256 n'ont qu'une année. La courbe trace un segment continu à travers le trou (1CT : une droite de 2008 à 2020, onze ans sans donnée). Le KPI « Lignes 8 » est le seul indice, et il ne dit pas lesquelles manquent. Aucun geste natif n'insère un `null` pour une année manquante ; on le dit (bornes + phrase).
- **Le secret statistique est invisible.** La documentation du jeu annonce une valeur vide ; le jeu n'en contient aucune (0 null sur 19 388 lignes, deux requêtes `is null` → 0). Le secret ne peut être qu'une ligne absente — indiscernable d'une case inexistante. À écrire tel quel.
- **Les codes réattribués.** 63 codes basculent entre « case à cocher » et « montant » (53 en un seul bloc : une case, puis une autre) ; ~650 codes ont deux libellés consécutifs sans aucun mot commun (mesure large, qui attrape aussi les abréviations). La page écrit « la facette sur le code est la seule clé stable ; c'est le jeu, pas l'outil (LIM-003) » : la seconde moitié est vraie, la première est fausse — le code n'est stable que pour les cases pérennes (1AJ, 1AS, 0AC, 7UF le sont).
- **L'état « recherche sans case »** additionne 96 cases sous des titres qui parlent de « la case ». Voir forme, point 1.
- **La liste et les courbes ne comptent pas la même chose** dans l'architecture à deux sources : la liste garde « recherche ET case » (6 lignes de 1BI dont le libellé contient « pensions »), les courbes la case entière (18 années). C'est voulu ; le libellé du compteur de la liste doit le dire (« ligne correspondant à la recherche »).
- **L'échantillon** : sans objet, le jeu est exhaustif (déclarations nationales). **Le groupe null** : sans objet, aucun null.

## Ecarts avec l'original

Il n'y a pas d'original : l'onglet « Analyse » du portail, réglé à la main. Écarts de capacité du lecteur, pas de mise en page :

- **Ce que la page ajoute** à l'onglet Analyse : une adresse par case, un état d'attente honnête au chargement (`require-where`, vérifié : zéro requête sur la page vide, six afficheurs en `idle`), une facette restreinte par la recherche, l'export.
- **Ce que l'onglet Analyse ne faisait pas mieux** : il tracerait lui aussi 0AC en euros et 1BI en une seule courbe — la donnée est la même. Mais il ne prétend pas non plus à une lecture ; cette page, si.
- **Ce que la page dit de faux sur elle-même** (`#analyse`) : « faute d'un format compact » et « AM-031 confirmé » (corrigé en 0.22.0, la page charge 0.33.0) ; « le code est la seule clé stable » (faux pour 63 codes prouvés). Les chiffres de cadrage sont justes : 19 388 lignes, 2 253 cases, 193 couples (libellé, année) multi-codes, 616 007 685 378 € pour 1AJ en 2024 — tous rejoués.
- **Ce qui remonte à la bibliothèque, pas à la page** : le pivot `series-field` qui comble par 0 au lieu de `null` (données manquantes ≠ zéro ; nouveau constat à consigner avec `verifie`) ; la graduation en demi-années de DSFR Chart sur une série courte (2019.5, 2020.5) — chez `GouvernementFR/dsfr-chart`.

Angles écartés et hypothèses : (1) un « montant moyen par foyer » (`montant / nombre`) aurait été parlant pour les cases en euros — écarté tant que l'unité n'est pas calculée, il donnerait « 1 € par célibataire » ; (2) séparer les séries par libellé — écarté à cause du remplissage par 0 ; (3) une règle d'unité par regex sur le libellé est une heuristique, la description du champ étant elle-même inexacte : la dire comme telle et lister son résidu (7FZ en m²).
