# Démonstrations n° 4 et n° 5 — propositions

> Exploration de data.gouv.fr menée le 2026-09-27 (MCP data.gouv + tunnel SOCKS pour l'API
> Tabular et les exports Parquet ; appels directs pour data.ameli.fr, api.insee.fr,
> equipements.sports.gouv.fr). Tous les chiffres ci-dessous ont été **recalculés en Python
> depuis les exports**, jamais lus dans un tableau de bord. Rien n'a été écrit dans le dépôt
> hors ce fichier.

## 1. Ce qu'est une « démonstration » ici (lu dans `public/demo/`)

Les trois pages existantes partagent une signature qu'il faut retrouver :

| Trait | IPS collège | Délinquance | Cuivre |
|---|---|---|---|
| Une question **qu'aucun portail ne pose** | ce qui décide de l'IPS | pourquoi il n'y a pas de total | qui bascule d'abord |
| Des jeux de **plusieurs producteurs** qui ne se rencontrent nulle part | Éducation × INSEE × Sports | SSMSI × INSEE | Bercy × INSEE |
| Une **jointure dans le navigateur** sur une clé publique | code commune | code département | code INSEE |
| Un **piège statistique** traité de front, pas contourné | moyenne d'ensemble nulle qui cache deux pentes | additionner des unités différentes ; moyenne de taux | une ligne par code postal ; part de communes ≠ part d'habitants |
| Une **capacité dsfr-data qu'on ne lui demandait pas** | deux jointures en chaîne + `pivot` | premier fournisseur Tabular + `map-summary weighted` | `require-where` sur 40 Mo de contours |
| Chaque chiffre **recalculé indépendamment** avant la première balise | oui | oui | oui |
| Section « Notes — hypothèses éditoriales » + « Ce que cette page démontre » + `#analyse` | oui | oui | oui |

Deux règles du dépôt pèsent sur le choix : **vérifier l'unicité du côté droit de chaque
jointure avant de joindre** (PG-001, repayé trois fois), et **ne jamais faire une moyenne de
taux** (LIM-014 → `map-summary="weighted"`).

## 2. Méthode d'exploration

1. Recherches par thème triées par vues (`commune`, `département`, `santé`, `logement`,
   `IRVE`, `élections`…), en écartant ce que les 83 dataviz du catalogue couvrent déjà
   (rien en santé, rien en logement ancien, rien en électoral, rien en mobilité électrique).
2. Pour chaque jeu retenu : `list_dataset_resources`, `get_resource_info` (Tabular ?),
   `get_metrics` (usage), lecture de l'API `/api/2/datasets/resources/{rid}/` pour l'export
   Parquet, puis téléchargement et **recalcul** : unicité de la clé, taux de jointure,
   secret statistique, ratio de sommes vs moyenne de taux.
3. Vérification des capacités dans `~/Developer/GitHub/dsfr-data/packages/core/src` et
   dans la skill technique : `api-type="tabular"` (200 lignes/page, `max-records` 25 000
   par défaut), **`fetch-mode="export"` sur Tabular = export Parquet depuis la 0.38.0**
   (#1103, vérifié dans `packages/core/CHANGELOG.md`), `api-type="insee"` (Melodi,
   filtres d'égalité par dimension, CORS ouvert), `dsfr-data-join`, `dsfr-data-unpivot`
   (tokens `{YY}` acceptés), `dsfr-data-pivot`, `dsfr-data-repeat`, `compute` avec
   `replace()`/`when`/`coalesce`, `aggregate="x:share_percent"`. Les pages de
   démonstration chargent **dsfr-data 0.42.0** (dernière publiée sur npm, 2026-09-25) —
   le `CLAUDE.md` parle encore de 0.33.0.

## 3. Les candidats

### A — « Le diabète : la carte brute dessine la vieillesse, la carte à âge égal dessine la pauvreté » ★ recommandé (démo n° 4)

**Question (qu'aucun portail ne pose).** La cartographie des pathologies de l'Assurance
Maladie affiche une prévalence brute par département. Où le diabète est-il vraiment plus
fréquent **à âge égal**, et cette carte-là suit-elle la pauvreté ? **Lecteur** : élu ou
journaliste local qui lit « la Nièvre, département le plus diabétique de métropole » et
va le répéter.

**Histoire pressentie (chiffres sondés le 2026-09-27, année 2024, tous sexes).**
- France : 4 471 940 patients pris en charge pour diabète sur 67 612 360 → **6,61 %**.
- Brut, la métropole est menée par la **Nièvre (9,98 %, 3e des 101)**, la Creuse (9,22 %)
  et l'Indre (8,80 %) ; la Seine-Saint-Denis est 22e (7,82 %), l'Essonne 82e (6,03 %).
- Standardisé par âge (structure France 2024, 20 classes quinquennales, calcul direct
  Σ taux_âge × poids_âge) : la **Seine-Saint-Denis passe 5e (10,41 %) et 1re de métropole**,
  le Val-d'Oise 2e de métropole (8,58 %), la Nièvre retombe **16e (7,62 %)**, la Creuse
  37e (6,90 %). **Mayotte passe du 81e au 1er rang (6,09 % → 12,29 %)** : le plus grand
  déplacement du classement.
- Croisement (chiffre du croisement) : corrélation entre la prévalence et le **taux de
  pauvreté Filosofi 2021** (INSEE, 98 départements) : **0,58 en brut, 0,69 après
  standardisation** ; Seine-Saint-Denis 28,4 % de pauvreté (2e), Nièvre 16,1 %.
  Melodi donne la version 2023 : Seine-Saint-Denis 29,5 %, Nièvre 17,3 %.
- Chapitre optionnel « les médecins sont-ils là où sont les malades ? » : densité de
  généralistes 2024 (CNAM) Hautes-Alpes 126,8 pour 100 000, Paris 107,0, **Nièvre 60,6**,
  Oise 59,9 — même producteur que le premier jeu, donc à présenter comme complément et non
  comme croisement.

**Jeux.**

| Jeu | Producteur | Accès | Volume | Fraîcheur | Clé |
|---|---|---|---|---|---|
| `effectifs` — patients par pathologie, sexe, âge, territoire (data.gouv `62b31f7b128643f46ea1f848`) | CNAM | **Opendatasoft** `https://data.ameli.fr`, CORS `*`, sans clé | 5 796 000 lignes (2015-2024) ; le filtre `patho_niv1="Diabète" and sexe="9" and annee=date'2024'` en rend **2 520** dont 2 100 dept × âge | 2026-07-06 | `dept` (01…95, 2A, 2B, 971-976) |
| `DS_FILOSOFI_CC` — taux de pauvreté `PR_MD60` (data.gouv `69dfa98bda55a687d20bae47`, ressource `d4fd659a-d107-4b15-b134-2452035dadb9`) | INSEE | **Tabular** (`GEO_OBJECT__exact=DEP&FILOSOFI_MEASURE__exact=PR_MD60` → **98 lignes**, une page) **ou INSEE Melodi** `DS_FILOSOFI_CC` (2023, `GEO=DEP-58` → `"2026-DEP-58"`) | 833 400 lignes brutes ; Parquet 3,2 Mo | 2026-04-15 (2021) / Melodi 2023 | `GEO` |
| `demographie-effectifs-et-les-densites` (data.gouv `6490ec5ccc5ebef87643d74a`) | CNAM | Opendatasoft data.ameli.fr | 3 456 960 lignes ; filtré → 101 | 2025-12-15 (2024) | `departement` |
| `insee-2020-geoapi-2023` (noms de départements, déjà utilisé par les 3 démos) | INSEE via portail Sports | Opendatasoft | 35 075 → `group-by codedepartement` → 101 | — | `codedepartement` |

**Unicité vérifiée (PG-001).** Côté droit de chaque jointure : national × âge = 20 lignes,
une par `cla_age_5` (la ligne `tsage` est le total, à écarter) ; Filosofi DEP × `PR_MD60`
= 98 lignes, une par `GEO` ; densité MG 2024 tous sexes tout âge = une ligne par
département. **Piège relevé** : dans `effectifs`, les lignes régionales et nationale portent
`dept = "999"` (19 régions + France) — un `group-by dept` naïf ajoute 20 lignes ; le filtre
`dept != "999"` est indispensable, et la France se lit sur `dept="999" and region="99"`.

**Piège statistique traité honnêtement.** (1) La **standardisation par âge** elle-même :
une prévalence brute compare des pyramides des âges, pas des états de santé ; la page
montre les **deux cartes côte à côte, cette fois différentes** (miroir de la démo 2 où elles
étaient identiques). (2) `prev` est un taux : **jamais de `prev:avg`**, ratio de sommes
partout, résumé de carte pondéré par `npop`. (3) **74 cellules dept × âge ont `ntop` nul**
(secret sur petits effectifs, surtout DROM) : le taux standardisé de ces départements est
calculé sur 17 à 19 classes sur 20, et la page doit le dire (colonne « classes manquantes »
dans le tableau équivalent). (4) Corrélation ≠ cause : le titre reste un « suit », pas un
« explique ». (5) La densité de généralistes vient du même producteur que la prévalence :
on ne la présente pas comme un croisement.

**Capacités dsfr-data démontrées.** **Trois fournisseurs d'API dans une page** : Opendatasoft
(ameli), Tabular (data.gouv) et **INSEE Melodi — premier emploi dans le banc**, avec la clé
recodée par `compute="dep = replace(GEO, '2026-DEP-', '')"`. La standardisation **en balises** :
`dsfr-data-query` sur les 20 lignes nationales avec `aggregate="npop:share:poids"` →
`dsfr-data-join on="cla_age_5"` (1-N voulu, côté droit unique) → `normalize compute="taux =
ntop / npop * poids"` → `query group-by="dept" aggregate="taux:sum"`. Deux cartes
`type="map"` avec `map-summary="weighted" map-summary-weight="npop"`. Un graphique en
tranches de pauvreté (ratio de sommes par tranche) plutôt qu'un nuage de points.
Existence vérifiée : `share`/`share_percent` (query), `replace()` dans `compute`, adaptateur
`insee` avec `where="FILOSOFI_MEASURE:eq:PR_MD60"`.

**Faisabilité.** Quatre requêtes ODS (`fetch-mode="export"`), une page Tabular ou un appel
Melodi, tout en dessous de 3 000 lignes : chargement instantané, aucun `max-records` à
relever. CORS vérifié le 2026-09-27 sur les trois hôtes (ameli `*`, Melodi echo de l'origine,
Tabular `*`). Melodi est limité à 30 req/min : un seul appel. **Effort : M.**

---

### B — « La vacance qu'on peut lire : longue durée, loyers bas, zone C » ★ recommandé (démo n° 5)

**Question.** Le gouvernement publie un compteur de logements vacants par commune (LOVAC) et
une carte des loyers ; personne ne les superpose. Les logements vides depuis plus de deux
ans sont-ils là où le loyer est bas et où l'État n'a pas classé la commune « tendue » ?
**Lecteur** : maire ou chargé d'habitat qui reçoit « 3,2 millions de logements vacants » en
titre de presse.

**Histoire pressentie (chiffres sondés le 2026-09-27, millésime 2026 = situation au
01/01/2025).**
- **Le total ne se lit pas dans le temps** : France 3 687 140 vacants (2024) →
  **2 380 076 (2025) → 3 160 235 (2026)** — un plongeon de 35 % puis une remontée de 33 %,
  que la note de version du jeu explique par le changement de source (fin de la taxe
  d'habitation, GMBI, « données sources avant chaîne de traitement fiscale depuis 2025 »).
  La vacance de plus de deux ans bouge moins (1 154 436 → 1 348 470 → 1 179 845) mais
  bouge aussi : **la page ne montre aucune évolution, seulement la photographie 2026**.
- Ratio national de vacance longue : 1 179 845 / 33 194 351 = **3,55 %** ; recalculé sur
  les seules communes non secrétisées : 1 052 304 / 29 650 998 = **3,55 %** aussi.
- **Zonage ABC** (chiffre du croisement) : vacance > 2 ans **1,94 % en zone A, 2,12 % en
  A bis, 2,88 % en B1, 3,69 % en B2, 5,38 % en zone C** ; la vacance totale va de 7,96 %
  (A) à 11,47 % (C).
- **Loyers** (chiffre du croisement) : **7,48 %** de vacance longue dans les communes à
  moins de 9 €/m² d'annonce, **2,16 %** au-dessus de 16 €/m². Par département,
  corrélation vacance longue × loyer moyen pondéré : **−0,53**.
- Densité INSEE : 8,14 % dans le rural à habitat très dispersé, 2,35 % dans les grands
  centres urbains, 2,52 % dans les ceintures urbaines.
- Villes de 10 000 logements ou plus : **Cayenne 11,5 %, Montluçon 10,7 %, Fort-de-France
  10,2 %, Nevers 8,8 %** ; Montigny-le-Bretonneux, Plaisir, Le Plessis-Robinson **0,6 %**.

**Jeux.**

| Jeu | Producteur | Accès | Volume | Fraîcheur | Clé |
|---|---|---|---|---|---|
| LOVAC communes (data.gouv `61816c6e23197bb34835228e`, ressource `2e0417b4-902d-4c60-90e7-bf5df148cb87`) | Cerema / DGALN (MTE) | **Tabular** ; **Parquet 1,27 Mo** | 34 912 lignes, 29 colonnes (7 millésimes en colonnes) | 2026-06-25 | `CODGEO_26` (COG 2026) |
| Carte des loyers 2025, appartements (data.gouv `693aa2feed1bf4da603faa49`, ressource `55b34088-0964-415f-9df7-d87dd98a09be`) | DHUP (MTE) | Tabular ; **Parquet 0,94 Mo** ; 56 451 téléchargements sur trois mois | 34 900 lignes | 2025-12-11 | `INSEE_C` |
| Zonage ABC en vigueur au 26 juin 2026 (data.gouv `656715871172d08f8f680063`, ressource `13f7282b-8a25-43ab-9713-8bb4e476df55`) | DHUP (MTE) | Tabular ; Parquet 0,42 Mo | 34 875 lignes | 2026-07-03 | `CODGEO` |
| `insee-2020-geoapi-2023` (population, densité, `typo_rurb_crte`) | INSEE via portail Sports | Opendatasoft, `fetch-mode="export"` | 35 075 lignes | — | `code_geographique` |

**Unicité vérifiée (PG-001).** Les quatre clés sont **strictement uniques** : 34 912 / 34 912,
34 900 / 34 900, 34 875 / 34 875, 35 075 / 35 075 codes distincts, zéro doublon. Taux de
jointure : LOVAC ∩ loyers 34 894, LOVAC ∩ loyers ∩ ABC **34 849**, LOVAC ∩ INSEE 34 901.

**Pièges statistiques à traiter honnêtement.** (1) **La rupture de série** ci-dessus :
aucune courbe ; le dire dans le premier chapitre. (2) **Le secret statistique** : la vacance
longue est secrétisée (`s`) dans **17 767 communes sur 34 912 (50,9 %)**, mais elles ne
portent que **3,6 % du parc** — le ratio de sommes est insensible, une carte communale ne
le serait pas. Tabular type donc ces colonnes en **chaîne** (`pp_vacant_plus_2ans_26 :
string`) : `dsfr-data-normalize numeric` rend `s` → `null`, et un KPI compte les communes
écartées. (3) **Moyenne des taux** : la moyenne des 12 449 taux communaux donne 4,78 %,
celle des 101 taux départementaux 4,43 %, contre **3,55 %** en ratio de sommes.
(4) **Un loyer prédit, pas observé** : `TYPPRED = maille` pour 30 029 communes sur 34 900
(86 %), 9 035 communes sans aucune annonce (`nbobs_com = 0`) — soit 22,1 % du parc. Les
tranches de loyer se présentent comme un modèle, et les communes « maille » sont
distinguées dans le tableau équivalent. (5) Le zonage ABC est une décision administrative
qui **suit** la tension : montrer la vacance par zone ne prouve pas que le zonage cause quoi
que ce soit. (6) Vacance longue ≠ logement disponible (indivisions, insalubrité, DROM).

**Capacités dsfr-data démontrées.** **Trois ressources Tabular chargées par export Parquet**
(`fetch-mode="export"`, 0.38.0+) — première page du banc à le faire, 2,6 Mo pour 105 000
lignes au lieu de 525 pages ; **jointure en chaîne de quatre sources sur le code commune** ;
`dsfr-data-unpivot value-cols-pattern="pp_vacant_{YY}"` pour montrer, dans les Notes, la
rupture de série sous forme de tableau (un jeu « large » à sept millésimes bascule en
« long ») ; carte départementale de taux `map-summary="weighted"` pondérée par le parc ;
`dsfr-data-search` + `facets` (zone, tranche de loyer, densité) sur 34 849 communes.
Existence vérifiée dans le source : `unpivot` accepte les tokens `{YY}` ; `join` multi-sources
ne dépend plus de l'ordre du DOM (0.32.0, BUG-015).

**Faisabilité.** Quatre requêtes de chargement, ~140 000 lignes au total dans le navigateur
(comparable aux 35 305 + 35 075 de la démo cuivre, en trois fois plus large) ; vérifier
`max-records="40000"` sur chaque source et **chronométrer** la jointure triple (règle du
dépôt). CORS du S3 Parquet vérifié (`Access-Control-Allow-Origin: *`, `Accept-Ranges: bytes`,
206 sur `Range`). **Effort : M/L** (L si l'on ajoute la carte communale filtrée par
département, comme le cuivre).

---

### C — « Une borne pour combien de voitures électriques ? » (non recommandé en l'état)

**Question.** Le fichier consolidé des bornes (Etalab, mis à jour chaque nuit) et le parc de
voitures rechargeables par commune (Agence ORE) ne se croisent nulle part : combien de
voitures par point de charge selon le département ?

**Chiffres sondés (Parquet du 2026-09-26, 8,9 Mo).** 221 956 lignes, **166 135
`id_pdc_itinerance` distincts** : **55 821 lignes en doublon (25 %)**, un même point publié
par QualiCharge, Gireve et l'opérateur. **54 118 lignes (24 %) sans `code_insee_commune`**,
85 686 sans code postal : 53 658 points distincts **ne peuvent être rattachés à aucun
département** sans passer par les coordonnées. Paris compte 5 824 points distincts, Nord
5 123, Gironde 4 764 ; Martinique et Réunion 2 chacun. Base ORE : 703 545 lignes
(35 000 communes × arrêtés trimestriels, dernier 2025-09-30), servie par **data-fair**
(`opendata.agenceore.fr`, CORS `*`) — un fournisseur que dsfr-data ne connaît que par
l'adaptateur générique, sans agrégation serveur.

**Verdict.** Le piège (« la base consolidée compte un point 1,3 fois et en perd un quart sur
la carte ») est excellent, mais il **dévore la question** : le ratio départemental repose
sur 68 % des points. Le jeu Ecolab « voitures par type de carburant » (Tabular, 4 242
lignes, 1 128 155 électriques) mesure des **immatriculations annuelles**, pas le parc — un
faux ami vérifié. Effort **L** (adaptateur générique data-fair + dédoublonnage `group-by
id_pdc_itinerance` + géocodage). À garder comme démonstration de qualité de données, si
QualiCharge publie un jour un fichier dédoublonné.

### D — « Municipales 2026 : qui a voté, et où l'on n'a pas eu le choix »

**Question.** Participation et listes uniques au premier tour de mars 2026 selon la taille
et la densité de la commune. Jeu très frais (Intérieur, `69b82a7de5d58cc06ad35ce0`,
11 445 téléchargements sur quatre mois) ; 13,8 Mo au niveau commune, 41 colonnes de listes
« en large » (candidat 1, 2, 3…) — cas d'école pour `dsfr-data-unpivot`.

**Frein constaté le 2026-09-27.** L'API Tabular répond « Resource … has been permanently
deleted on 2026-04-02 by its producer » pour la ressource « Résultats – Communes » du T1
(`4feeef01-24f7-4d5a-914f-8aa806f31ec2`) **alors que le catalogue la liste encore et que le
fichier se télécharge** : ni Tabular ni Parquet. L'alternative « Données des élections
agrégées » (Parquet 67,6 Mo sur un S3 OVH hors data.gouv) n'est pas lisible par
`fetch-mode="export"`, qui résout l'export via l'API des ressources. Pièges éditoriaux :
scrutin plurinominal sous 1 000 habitants (les « % voix » ne se comparent pas), élus sans
concurrence, Paris-Lyon-Marseille en secteurs. Effort **L**, et une dépendance à une
ressource fantôme — à remonter à data.gouv.fr avant d'y investir.

### E — « Les généralistes sont-ils là où sont les malades ? »

Densité de généralistes 2024 (CNAM) × prévalence standardisée (CNAM) × pauvreté (INSEE).
Chiffres : Hautes-Alpes 126,8 généralistes pour 100 000, Paris 107,0, Nièvre 60,6, Oise
59,9. Vrai sujet, mais les deux jeux santé viennent du **même producteur et du même portail**
(data.ameli.fr) : le trait « producteurs qui ne se rencontrent pas » est faible. Proposé
comme **chapitre optionnel de A**, pas comme démonstration autonome. Effort S en complément.

## 4. Recommandation

| | Démo n° 4 | Démo n° 5 |
|---|---|---|
| Titre-message provisoire | Le diabète : la carte brute dessine la vieillesse, la carte à âge égal dessine la pauvreté | La vacance qu'on peut lire : longue durée, loyers bas, zone C |
| Producteurs croisés | CNAM (ODS) × INSEE (Tabular **et** Melodi) × INSEE-Sports | Cerema/DGALN × DHUP × DHUP (Tabular/Parquet) × INSEE-Sports (ODS) |
| Capacité nouvelle pour le banc | **3 fournisseurs d'API**, premier Melodi, standardisation par âge en balises | **Export Parquet Tabular** (0.38.0), quadruple jointure, `unpivot` d'un jeu à millésimes en colonnes |
| Piège porteur | prévalence brute vs standardisée ; `dept=999` = régions ; 74 cellules secrétisées | série cassée par changement de source ; 51 % des communes secrétisées pour 3,6 % du parc ; loyer prédit |
| Effort | M | M/L |

Les deux se complètent : A est **départemental et statistique** (101 lignes, le calcul est le
sujet), B est **communal et volumétrique** (35 000 lignes × 4, le chargement est le sujet).
Ensemble avec les trois premières, le banc aura couvert Opendatasoft, Tabular paginé, Tabular
Parquet et INSEE Melodi.

## 5. Ce qu'il faudra vérifier avant d'écrire la première balise

- **A** : rejouer la standardisation dans le navigateur et comparer aux 101 valeurs Python
  (`diab_std.json` dans le scratchpad de session) ; confirmer que l'adaptateur `insee`
  accepte `GEO:in:` sur 101 codes ou préférer la ressource Tabular 2021 ; choisir entre
  Filosofi 2021 (Tabular, 98 dép.) et 2023 (Melodi) et le dire.
- **B** : chronométrer le chargement Parquet des trois ressources et la jointure ;
  vérifier que `normalize numeric` sur une colonne typée `string` par Tabular convertit
  bien « 26 755 » sans espace fine (le fichier **départements** porte des espaces
  insécables dans ses valeurs et ses en-têtes ; le fichier **communes** est propre — utiliser
  celui-ci et agréger côté client) ; recalculer les cinq taux par zone ABC depuis la page.
- Les deux : `select` sans texte long, `max-records` explicite, `map-summary-field` sur la
  colonne brute, tableau équivalent avec la colonne « secrétisé / classes manquantes ».

## 6. Limites de cette exploration

- L'IP de la machine étant bloquée par data.gouv.fr, Tabular et les Parquet ont été lus
  via le tunnel SOCKS ; le MCP a servi au catalogue et aux métriques. Aucun test **dans un
  navigateur** n'a été fait : les capacités sont vérifiées dans le source et le changelog,
  pas rejouées (règle FP-014 : un attribut présent dans le bundle ne prouve rien tant
  qu'une page ne le porte pas).
- Le MCP n'a pas pu vérifier la disponibilité Tabular de la carte des loyers
  (« Could not check ») ; elle a été confirmée directement (`meta.total = 34 900`).
- Les corrélations citées (0,58 / 0,69 ; −0,53) sont des repères d'exploration, pas des
  chiffres à publier : la page montrera des tranches, comme les trois premières.
- Non explorés faute de temps : covoiturage (RPC, 92 ressources mensuelles), contrôle
  sanitaire de l'eau, accidents de la route (BAAC), Sirene. Aucun n'avait de croisement
  aussi net que A ou B au premier regard.
