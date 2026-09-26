# Analyse métier — Tableau de bord Rappel Conso

> La lecture `dataviz-metier` : le sens avant la syntaxe.
> **Ce fichier n'est jamais écrasé par un script.** Les sorties du modèle
> multimodal arrivent dans `constats/` ; ce qui est retenu se réécrit ici, à la main.

Relecture du 2026-09-26, **niveau avancé** (une page entière, famille C « corpus documentaire »).
Chaque chiffre ci-dessous a été rejoué le jour même à l'API de `data.economie.gouv.fr` (jeu `rappelconso-v2-gtin-trie`, modifié à 13:05 UTC ; jeu voisin `rappelconso-v2-gtin-espaces`) et la page relue au navigateur (Playwright, `dsfr-data` 0.33.0 depuis le CDN). Les recommandations R1 à R6 sont détaillées dans la sortie structurée ; ce fichier dit pourquoi elles comptent.

## La question posée, et pour quel lecteur

**Question** : « Quels produits ont été rappelés, pour quel risque, et combien de rappels par an et par famille de produits ? » — la page n'est pas le tableau de bord statistique de l'original (couvert par la variante `/viz/rappel-conso-tableau-de-bord`), c'est un **corpus consultable** : la recherche est l'action, la liste le résultat, les graphiques le contexte.

**Lecteur** : un explorateur — consommateur, journaliste, agent — qui cherche *sa* fiche (une marque, un produit) et veut, en passant, un ordre de grandeur du dispositif.

**Ce qu'il doit obtenir** : la fiche (lien vers rappel.conso.gouv.fr), les compteurs par catégorie, nature et compensation, la tendance annuelle.

**Hors objet** : le rejeu du tableau de bord à une date passée (variante), la géographie (le champ `zone_geographique_de_vente` est du texte libre à 110 modalités, pas une clé cartographique).

**Ce que l'exploration a révélé, et que la page ne sait pas** : l'unité. Une ligne de `rappelconso-v2-gtin-trie` est **un code-barre (GTIN)**, pas un rappel : 18 472 lignes pour **12 435 `numero_fiche` distincts** (ratio 1,485). La fiche `2025-03-0160` (« enamel paints », marque « ammo of mig jimenez ») pèse 81 lignes au libellé identique ; 110 fiches en ont dix ou plus. Et la description du jeu prévient : « ne contient pas les produits sans GTIN ». Le jeu voisin `rappelconso-v2-gtin-espaces` — celui de la page vivante du portail — fait **18 699 lignes pour 18 699 fiches distinctes** : c'est le jeu à une ligne par rappel, et il porte **6 264 fiches (33,5 %) que la page ne montre pas**, dont 1 697 des 1 756 rappels automobiles (les véhicules n'ont pas de GTIN). La page a donc choisi le mauvais jeu au lot 6, faute d'avoir demandé ce qu'est une ligne — la règle « avant tout compte, demander ce qu'est une ligne » (skill, § question-et-lecteur) s'applique ici mot pour mot.

La piste héritée de #75 est **confirmée** (surcompte ~50 %, fiche de peinture à 81 cartes, cartes de 2021 en tête) et **nuancée** : lignes contre fiches, le podium des catégories garde son trio (alimentation, bébés-enfants, maison-habitat) et ne se réordonne qu'aux rangs 4-8 (vêtements 4e → 7e, hygiène-beauté 7e → 4e) ; c'est le podium des **sous-catégories** qui s'inverse (viandes 3 310 lignes > lait 3 176 ; lait 2 381 fiches > viandes 2 325). Et la piste sous-estimait le problème : le vrai écart n'est pas 18 472 contre 12 435, c'est 12 435 contre 18 699.

## La forme retenue, et pourquoi elle sert cette question

- **Un champ de recherche seul dans son bandeau, puis trois KPI, deux graphiques, une grille de cartes paginée sur le serveur avec facettes à compteurs.** La forme est la bonne pour un corpus (famille C) et la pagination serveur sur des cartes est un vrai acquis (AV-018). Mais la recherche **ne cherche pas** : sans `server-search`, `dsfr-data-search` filtre les 12 lignes déjà reçues. Au chargement, son compteur dit « 12 rappels » (la grille aussi) ; « ammo » rend 0 (150 lignes à l'API) ; et `libelle`, le nom du produit, n'est pas dans `fields` (« kool » : 0 contre 2 à l'API) alors que le placeholder promet « Produit, marque, motif ». L'action promise par la page est vide (R2).
- **La grille s'ouvre sur mars 2021** (« autocuiseur kool'or 7 l », fiche 2021-03-0028) : sans `order-by`, l'ordre d'indexation du portail. Pour des rappels, le plus récent est l'information ; l'ordre inverse fait croire une page à l'arrêt (R4).
- **Courbe annuelle sur six points** : forme juste pour une évolution ; mais le dernier point est une année de 268 jours (voir échelle).
- **Barres horizontales triées, dix catégories** : forme juste pour un classement ; mais une barre de 14 287 écrase neuf barres de 6 à 1 262, et la seule lecture possible est « tout est alimentaire ». La part (`share_percent`) rendrait lisibles les rangs 2 à 4 — et sur le jeu complet, ce rang 2 est « automobiles », 9,4 %, absent de la page (R6).
- **Trois KPI de même poids** : « 18 472 rappels de produits », « 10 catégories », « 4 031 rappels publiés » (année la plus chargée — laquelle ? le KPI ne le dit pas). Le second ne porte aucun message ; le troisième vieillira sans qu'on le voie. L'accroche n'a pas de hiérarchie (A12).
- Pas de phrase de lecture, pas de conclusion : la page se termine sur la grille, puis sur l'analyse technique.

## Honnêteté de l'échelle

- **L'unité est fausse partout** : KPI, `count-label="rappel"` de la recherche et de la grille, compteurs des facettes (alimentation 14 287 « rappels » pour 10 361 fiches), séries « Rappels publiés » / « Rappels », texte du callout. Une fiche à 81 GTIN compte 81 fois. Ce n'est pas une nuance de vocabulaire : « 18 472 rappels » est un chiffre faux de 48,5 % (R1).
- **Le périmètre est amputé d'un tiers** sans que la page le dise, et l'amputation n'est pas neutre : elle efface 97 % d'une catégorie. Le graphique par catégorie donne automobiles = 127 lignes (59 fiches) pour 1 756 rappels réels (R1).
- **L'année en cours lue comme une baisse** : la courbe finit 2025 = 3 298 → 2026 = 2 466 (−25 %). À date égale (25 septembre), 2026 dépasse 2025 : 2 466 contre 2 405 lignes, 1 506 contre 1 445 fiches ; sur « espaces » 2 520 contre 2 187. Ce n'est pas un record (2021 à date : 2 824 lignes / 2 041 fiches) mais ce n'est pas une baisse. ODSQL sait borner sans littéral : `date_publication < now(month=1, day=1)` (vérifié : 5 années pleines) et la paire `now(month=1, day=1)` / `now(years=-1, …)` pour « à ce jour » contre « même date l'an dernier » (2 466 / 2 410) (R3).
- **Axe à zéro** : oui sur les barres ; la courbe part de 2 466, Chart.js cadre au plus bas — sur six points d'amplitude 2 466-4 031 l'effet est faible mais `y-min="0"` coûte un attribut.
- **Années formatées en nombres** : le tableau a11y rend « 2 021 », « 2 026 » ; `date_format(date_publication, 'yyyy') as an` rend un texte (R5).
- Aucune moyenne de taux, aucun arrondi avant calcul, aucun double axe : rien à signaler sur ces trois points.
- **Les littéraux vieillissent** : « 18 331 » écrit trois fois dans la page, 18 472 à l'API seize jours plus tard, et « mise à jour le jour même » qui n'est vrai que le jour de l'écriture.

## Phrase de lecture

Sur le jeu complet (`rappelconso-v2-gtin-espaces`, 18 699 fiches au 26 septembre 2026) :

> Depuis le lancement de RappelConso en avril 2021, l'État publie environ **3 000 fiches de rappel par an** (3 917 en 2021, 3 148 en 2025). **Près des trois quarts concernent l'alimentation** (13 792 fiches, 73,8 %), loin devant les véhicules (1 756, 9,4 %) et les articles pour bébés et enfants (1 164, 6,2 %) ; lait et produits laitiers (3 282) et viandes (3 219) sont les deux familles les plus rappelées. Quand la nature du rappel est renseignée, **87 % sont volontaires** et le remboursement est la compensation dans deux cas sur trois (12 495). **2026 est déjà au-dessus de 2025 à date égale** (2 520 fiches au 25 septembre contre 2 187), sans atteindre 2021.

Sur le jeu actuel de la page, la même phrase ne peut pas s'écrire : « 18 472 » ne compte pas des rappels et les véhicules y sont absents.

## Ce qu'on ne montre pas, et qu'il faut dire

- **Les produits sans GTIN** : 6 264 fiches (33,5 %), dont 1 697 automobiles, 3 431 alimentaires. Aujourd'hui tu, à corriger par le changement de jeu (R1) ou, à défaut, à écrire sous le KPI.
- **Le groupe null du jeu complet** : sur « espaces », 2 001 fiches sans nature juridique ni compensation — toutes parmi les fiches sans GTIN, 228 datées 2018-2020 (avant le site), 437 en 2026. Le jeu « trié » n'en a aucune, ce qui a caché le sujet. En basculant : `where="… is not null"` sur `rc-nature` **ou** `empty-label="Non renseignée"`, et une phrase — nommer ou écarter, mais le dire (PG-015). Le « 87 % volontaires » se calcule hors nulls (14 520 / 16 698).
- **2018-2020** : 228 fiches sur « espaces » ; le heading « Depuis 2021 » devient faux ou demande un `where`.
- **Le compte distinct d'Opendatasoft est approximatif** : `count(distinct numero_fiche)` rend 12 262 (12 435 exacts) et, sur « espaces », 18 940 pour 18 699 lignes — plus que le total. Le compte exact est celui des lignes d'un `group_by` exporté (PG-026).
- **Le recouvrement des libellés de risque** : `risques_encourus` reste multivalué (`blessures|brûlures`, 1 193 lignes sur « espaces ») ; le `split` en aval découpe l'affichage des cartes, mais la facette serveur compte des chaînes combinées, pas des risques. Idem pour `modalites_de_compensation` (15 modalités dont 11 combinaisons `a|b|c`). L'original fait pareil ; le dire suffit.
- **La recherche ne dit pas qu'elle est locale** : « 0 rappels » pour « ammo » ressemble à une absence de rappel, c'est une absence de requête (R2).
- **L'année en cours** n'est nommée nulle part comme incomplète (R3).

## Écarts avec l'original

_Uniquement des écarts de données ou de capacité du lecteur — l'équivalence visée est fonctionnelle, pas pixel._

- **Jeu de données** : l'original (`/pages/rappel-conso-v2/`, fiche d'audit du 2026-09-09) lit `rappelconso-v2-gtin-espaces` — une ligne par fiche, 18 573 alors, 18 699 aujourd'hui. La page lit `rappelconso-v2-gtin-trie` — une ligne par GTIN, un tiers des fiches en moins. **Toutes les valeurs diffèrent** : total (18 472 lignes / 12 435 fiches contre 18 699), alimentation (77,3 % contre 73,8 %), automobiles (0,7 % contre 9,4 % — la 2e barre de l'original a disparu), nature volontaire (87,6 % de lignes contre 87,0 % de fiches renseignées). L'écart de jeu était noté au lot 9 (« Relecture face au relevé visuel ») comme un simple « autre jeu » ; c'est en réalité une différence d'unité et de périmètre.
- **Groupe null** : l'original écarte 2 001 fiches sans nature (camembert à deux parts) ; la page n'a pas le sujet parce que son jeu ne les contient pas. Il revient avec le bon jeu.
- **Ce que la page apporte et que l'original n'a pas** : les fiches elles-mêmes (grille paginée, lien vers rappel.conso.gouv.fr), les facettes contextuelles à compteurs, le tableau équivalent sous chaque graphique (AV-001). C'est la bonne raison d'être de cette page — à condition que la recherche cherche (R2) et que les cartes récentes viennent en premier (R4).
- **Ce que la page n'a pas et n'a pas à avoir** : le sélecteur de date et les trois fenêtres, le top 20 des sous-catégories, les deux camemberts — couverts par la variante fidèle. Aucune de ces absences n'est un écart à corriger ici.
- **Ce que le registre porte de faux par ricochet** : AV-018 (« 18 331 rappels »), AV-019 (« 18 331 rappels sur 10 catégories »), et la fiche `docs/portail/rappel-conso.md` elle-même (« 18 573 rappels » : sur « espaces », exact en fiches). À rectifier quand R1 sera fait, en gardant la trace (entrée `faux-probleme` ou `piege` : « une ligne est un GTIN » vaut au-delà de cette page — c'est le PG-001 des jointures, transposé au compte simple).
