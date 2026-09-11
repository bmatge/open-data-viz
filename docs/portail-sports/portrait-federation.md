# Portrait de fédération (portail Sports)

- **URL** : https://data.sports.gouv.fr/pages/portrait-federation/?refine.code_fs=101
- **Portail** : `data.sports.gouv.fr` (ministère des Sports, de la Jeunesse et de la Vie
  associative ; données INJEP-MEDES). Troisième portail du banc, après Bercy et Éducation.
- **Nature** : page AngularJS (`$scope.blocks`), cinq onglets `ods-simple-tab` :
  *Licences et clubs* · *Mon territoire* · *Fiche signalétique* · *Structuration* · *Me comparer*.
- **Clé API** : aucune. Tout se lit en anonyme, CORS `*`. **Quota anonyme : 5 000 requêtes par
  jour et par IP** (`x-ratelimit-limit: 5000`, remise à zéro 00:00 UTC) — une visite complète
  de l'original en consomme 169.
- **Template archivé** : `_sources/portrait-federation.html` (327 k désechappés, dont six copies
  d'une carte SVG départementale en sept morceaux) + `_sources/portrait-federation.css`.
- **Relevé** : 2026-09-11, Chromium (Playwright), viewport 1400 × 1000, fédérations 101
  (athlétisme) et 111 (football), région Bretagne. Chiffres recoupés à l'API v2.1.
- **Reproduction** : `public/sports/portrait-federation.html`.

## Les treize jeux

| Jeu | Lignes | Clé fédération | Rôle |
|---|---:|---|---|
| `msjva-portraits-de-federations-base-2024` | 120 | `code_fs` (texte) | Liste des fédérations, fiche signalétique, structuration, dispositifs, ANS total |
| `msjva-portraits-de-federations-shn-2024` | 536 | `code_fs` | Sportifs de haut niveau par catégorie et sexe (2025) |
| `indicateurs_cles_fede` | 126 | `code_fede_ref` (texte), `code_fede_2024` | **Une ligne par fédération + 6 lignes de groupe** (`code_fede_ref = 'TOT'`, `code_fede_2024` = 0…6) : licences, féminisation, QPV, ZRR, âge et taille médians, typologie urbain/rural |
| `lics_histo` | 3 067 | `code_fede_ref` (texte) | Licences 2002-2024, **indice base 100 déjà publié** (`lics_100_2016`) ; lignes `TOT` par groupe |
| `lics_dep` | 12 870 | `code_fede_ref` (texte) | Licences et licences pour 1 000 hab. par département (2024) |
| `lics_dep_age_sexe` | 463 320 | `code_fede_ref` (entier) | Pyramide des âges ; **pas** de ligne `TOT` : la somme par `fede_gp` redonne le groupe (10 065 626 = ligne TOT olympique) |
| `lics_dep_sexe` | 12 870 | `code_fede_ref` (entier) | Part féminine ; `france = '1'` pour les départements, `'0'` pour l'étranger |
| `lics_distr_age` | 14 763 | `code_fede_ref` (texte) | Âge médian à quatre `niveau` : France, Région, Département, Total ; lignes `TOT` par groupe |
| `lics_clubs_dep_ruralurbain` | 40 365 | `code_fede_ref` (entier) | Licences, établissements et population par département × type de commune (2022, zonage 2023) ; **aucune ligne de groupe** |
| `clubs_dep` | 39 270 | `code_fede_ref` (entier) | Établissements actifs (clubs, EPA) par département, 2022-2024 |
| `dispositif-ans` | 1 800 | `code_fs`, `code_fede_ref` | Financements ANS par ligne budgétaire |
| `georef-svg` | 123 | — | Chemins SVG des départements (7 découpages : métropole, IDF, 5 DROM) |
| `pop_dep_age_sexe` | 34 340 | — | **Contexte mort** : sert à calculer `anneeRef.popAnnee`, qui n'est relu nulle part |

**La clé est propre.** `code_fs`, `code_fede_ref` et `code_fede_2024` portent le même code pour
les 120 fédérations (vérifié sur les 126 lignes d'`indicateurs_cles_fede` : aucun écart), et
les onze jeux départementaux écrivent `01`…`976`, `2A`, `2B` à l'identique. ODS convertit
`code_fede_ref = "101"` et `= 101` dans les deux sens, jeu texte ou entier (vérifié HTTP 200,
mêmes comptes). C'est l'inverse du portail des équipements (`../portail-education/portrait-de-territoire-sports.md`).

**59 contextes** déclarés sur un seul `ods-dataset-context`, dont deux jamais branchés
(`dummycontext`, `popdepref`) et deux autres (`ctxlicencesallcompare`, `ctxlicencesrefcompare`)
configurés mais absents de la liste `context=`.

---

## 1. Objectif et informations véhiculées

- **Question** : « Que pèse ma fédération, qui y joue, où, et comment se situe-t-elle dans son
  groupe ? »
- **Message** : aucun message éditorial ; une fiche générée pour chacune des 120 fédérations
  agréées, **toujours mise en regard de son groupe** (olympiques, délégataires non-olympiques,
  affinitaires, para-sportives, scolaires) — c'est le fil conducteur de la page.
- **Ce que l'usager obtient** : volume et évolution des licences, géographie, profil
  (sexe, âge, QPV, ZRR, urbain/rural), établissements, fiche administrative, haut niveau,
  financements ANS, dispositifs ministériels, et une comparaison à une autre fédération ou à un
  groupe.
- **Hors objet** : aucune donnée à la commune (un lien renvoie vers une image JPEG par
  fédération), aucune série de financements dans le temps.

## 2. Relevé visuel, onglet par onglet (fédération 101)

**En-tête** : titre « Portrait de fédérations », `ods-select` des 120 fédérations
(« 101 - Fédération Française d'Athlétisme »), bandeau « Fédération sélectionnée : … ».

### Onglet 1 — Licences et clubs

| Bloc | Vu à l'écran | Formule / source | API |
|---|---|---|---|
| Titre | **313 957** licences sportives annuelles en 2024 | `sum(lics_tot_semidef)` sur `indicateurs_cles_fede` | 313 957 ✓ |
| Base 100 | 3 courbes spline + points étiquetés, 2016-2024 : fédération (bleu), « Fédérations olympiques », « Ensemble des fédérations » | `lics_100_2016` de `lics_histo`, lignes fédé / `TOT` du groupe / `TOT` 0 | 100 → 85,98 (2021) → 103,97 ✓ ; olympiques 111,07 ; ensemble 79,17 → 105,54 ✓ |
| Carte | Choroplèthe départementale SVG, bascule « pour 1 000 hab. » / « Total », 5 classes (0,9 – 9,4), DROM en encarts, lien « Voir la carte des communes » (image JPEG) | `ods-color-gradient` sur `lics_dep`, `SUM(lics_pop)` / `SUM(lics)` | ✓ |
| Top 10 | Barres HTML : Ardennes 9,4 · Mayenne 8,0 · Martinique 7,6 · Maine-et-Loire 7,1 · Guadeloupe 7,0 · Vosges 6,8 · Ille-et-Vilaine 6,7 · Lozère 6,7 · Loir-et-Cher 6,6 · Loire-Atlantique 6,5 | `sum(lics_pop)` group by `dep_name`, 10 premiers | ✓ |
| KPI | 4,5 licences pour 1 000 hab. « en 2024 » | `lics_tot_def / pop_fr * 1000` | 307 021 / 68 143 433 = 4,51 (**millésime 2023**, voir défauts) |
| KPI ×2 | QPV 3,2 % (4,6 % olympiques) · ZRR 13,9 % (14,7 %) | `pct_qpv_def`, `pct_zrr_tot_def` fédé et `TOT` du groupe | ✓ |
| Jauges | Taux de féminisation 48,0 % / 33,7 % olympiques | `pct_f_semidef` | ✓ |
| Pyramide | Barres HTML Femmes (gauche) / Hommes (droite), 17 tranches 0-4 → 80+, fédération et groupe superposés, infobulle « N licenciées (x %) » | 7 `ods-adv-analysis` sur `lics_dep_age_sexe` ; largeur = part du total × 400 % | f_F 10-14 ans = 35 139 ✓ |
| KPI | Âge médian **22 ans** — « **15 ans** pour les fédérations olympiques » | `med_age` de `lics_distr_age` | fédé 22 ✓ ; groupe **16** (voir défauts) |
| Titre | **2 498** établissements sportifs actifs en 2024 | `clubsepa_actifs_semidef` | ✓ |
| Barres | Établissements actifs 2022-2024, empilé clubs / EPA : 2 451 · 2 474 · 2 498 (EPA 0) | `clubs_dep` | ✓ |
| KPI | Taille médiane 80 licences (76 olympiques) | `med_taille_semidef` | ✓ |

### Onglet 2 — Mon territoire

Deux `ods-select` (Région : 18 régions ; Département : **110 valeurs**, dont « Etranger »,
« Non réparti », Monaco, trois COM — que la source filtrée exclut ensuite).

| Bloc | National | Bretagne |
|---|---|---|
| Licences | 310 480 (hors étranger/COM) · 4,5 / 1 000 hab. | 19 467 · 5,6 / 1 000 hab. · « 4,5 en France » |
| 2 cartes en bascule (licences / 1 000 hab., total) | ✓ | seuls les 4 départements colorés |
| Répartition par type de communes (part des licences vs part de la population) | 33/37 · 36/31 · 20/19 · 11/13 % | — |
| Communes avec au moins une licence | 61,5 % | 84,8 % |
| Âge médian | 22 ans — « **22 ans** pour les fédérations olympiques » | 17 ans — « **21 ans** » |
| Part féminine | 48,0 % — 33,7 % | **48,1 %** — 33,6 % |
| Établissements | 2 454 · 3,6 / 100 000 hab. | 148 · 4,3 · « 3,6 en France » |
| 2 cartes en bascule (nombre, pour 100 000 hab.), répartition par type de communes | ✓ | — |
| Communes avec au moins un établissement actif | 5,0 % | — |

### Onglet 3 — Fiche signalétique

Nom, adresse (33 Avenue Pierre de Coubertin, 75013 Paris), « Voir le site internet »
(`https://` + `sites_internet`, publié sans protocole : `www.athle.fr`), Groupement
(« Olympiques »), agrément 2005, saisonnalité « Scolaire », délégation parasportive « Non »,
disciplines délégataires (liste séparée par « ; »).

### Onglet 4 — Structuration

Présidence « Homme » (pictogramme ♂ — le fichier s'appelle `sexe-feminin-picto.png`, mais le
rendu est juste) ; 75 conseillers techniques sportifs ; **283** sportifs de haut niveau listés ;
barres empilées Femmes/Hommes : Elite 17/16 · Reconversion 1/3 · Relève 84/99 · Sénior 19/44 ;
ANS **9 862 404 €** et dix barres colorées développement / haute performance ; Pass'Sports
35 214, Handiguide 116, Maisons Sport-Santé 7, partenariats 103. Tout ✓ à l'API.

### Onglet 5 — Me comparer

Deux sélecteurs : fédération de référence (= celle de l'en-tête) et de comparaison
(126 entrées : 6 groupes « 0. Toutes fédés »… puis les 120 fédérations), **par défaut la même
fédération** des deux côtés. Deux colonnes : licences, base 100, pour 1 000 hab., féminisation,
âge médian, QPV, ZRR, répartition par type de communes, communes avec licence, établissements.

## 3. Défauts de l'original

1. **Le lien profond ne marche pas.** `?refine.code_fs=111` affiche l'athlétisme (vérifié) :
   `selectedFede` est initialisé à `['101']` sans lire l'URL ; `dummycontext-urlsync` n'écrit
   que dans un sens. L'URL fournie par le catalogue ne fonctionne que parce que 101 est la
   valeur par défaut.
2. **Âge médian du groupe faux, deux fois, de deux façons.** Onglet 1 : `licencesagerefmed`
   filtre `fede_gp` et `TOT` mais pas `niveau` → la première ligne est une **région** (Guyane,
   15 ans). Onglet 2 : `licencesageref` filtre `fede_gp` et `niveau` mais pas `TOT` → la
   première ligne est **l'athlétisme lui-même** (22 ans). La valeur juste est **16 ans**
   (`lics_distr_age`, `TOT`, olympique, France). En Bretagne : « 21 ans » pour 16.
3. **Part féminine d'une région = part nationale.** Les deux premiers `ng-if` du bloc
   `partfemmes` portent la même condition ; le second remet `newreg` à `undefined`. Bretagne :
   48,1 % affiché, **48,8 %** réel (9 504 / 19 467).
4. **Millésime mal étiqueté** : « 4,5 licences pour 1 000 habitants **en 2024** » divise
   `lics_tot_def` (définitif **2023**) ; en 2024 le taux est 4,61 (313 957 / 68 143 433).
5. **Barres ANS : une hiérarchie aplatie.** « Part territoriale » (3 836 588 €) est affichée à
   côté de ses deux sous-lignes (1 051 319 + 2 573 500), et la « Part nationale »
   (`libelle` nul, 1 741 292 €) disparaît : les barres « développement » somment 9,41 M€ pour un
   total développement de 5,58 M€. Les barres « haute performance » forment, elles, une partition
   exacte (4 284 568 €).
6. **Sélecteur de département** : 110 entrées dont 9 que les sources filtrées de l'onglet
   excluent (Etranger, Non réparti, Monaco, six COM) — lu dans le template, non rejoué.
7. **Comparer une fédération à elle-même** par défaut ; un contexte mort (`pop_dep_age_sexe`).

## 4. Transposition vers `dsfr-data`

| Original | `dsfr-data` |
|---|---|
| `ods-select` fédération → `selectedFede` recopié dans 30 `refine` | `<select id="sel-fede">` (120 options générées hors ligne) + `dsfr-data-context-filter field="code_fede_ref"` (14 sources) et, dans un 2ᵉ contexte, `field="code_fs"` (2 sources) |
| `refine.fede_gp = variables.groupefede` ×8 | source des 6 lignes `TOT` + `dsfr-data-join on="fede_gp" type="inner"` |
| `dummycontext-urlsync` | `url-sync url-param-map="refine.code_fs:code_fede_ref \| region:newreg \| departement:dep"` |
| base 100 (3 `ods-chart-query`) | 3 sources `lics_histo` + 2 `dsfr-data-join` (`on="an,fede_gp"`, `on="an"`) + `type="line"` |
| 6 cartes SVG + `ods-color-gradient` | `dsfr-data-chart type="map" code-field="dep"` |
| top 10 (`ods-subaggregation`) | source `order-by="lics_pop:desc"` + `dsfr-data-query limit="10"` |
| pyramide HTML | 2 `dsfr-data-pivot` (sexe en colonnes) + 2 `join` + `compute` des parts + 2 histogrammes horizontaux |
| répartitions par type de communes | source groupée + source totale, `compute="k = 1"` des deux côtés, `join on="k"`, `compute` des parts |
| âge médian par maille (3 `ng-if` × 3 paramètres) | `compute rang` (France 0, Région 1, Département 2) + `query order-by="rang:asc" limit="1"` + `join on="fede_gp,niveau"` sur les lignes `TOT` |
| `max(annee)` → `refine.annee` | source `max(year(annee)) as an` + `join type="inner" on="an"` |
| `ods-results` (fiche) | `dsfr-data-display` + `compute` (`year()`, `concat('https://', …)`) |
| barres ANS `ng-class` | `series-field="dev_htp"` + `replace-fields` |
| 2ᵉ sélecteur (comparaison) | 3ᵉ contexte sur `code_fede_2024` (couvre fédérations **et** groupes) |

## 5. Limites et points durs

- **Part du total** : aucune agrégation ne donne le total à côté des groupes ; motif à quatre
  composants (clé constante), trois fois dans la page.
- **Résumé de carte** : moyenne non pondérée (4,61 pour 4,54 ; 3 074 « en France » sur la carte
  des totaux). `map-summary-weight` (0.29, rejoué sur `origin/main`) règle les taux, pas les
  volumes ; le libellé « en France » est écrit par DSFR Chart.
- **Ordre des contextes** : un filtre lit son contrôle au montage, le pré-remplissage d'URL
  n'émet pas d'événement → le contexte non synchronisé doit suivre le contexte synchronisé.
- **Compteur de `dsfr-data-display`** : « 1 resultat » imposé au-dessus d'une fiche.
- **Légendes littérales** : le nom de la fédération ne peut pas être un nom de série sans union.
- **Groupes dans la comparaison** : `lics_clubs_dep_ruralurbain` n'a pas de ligne de groupe ;
  « communes avec licence » vaut « — » pour un groupe (l'original affiche « Données non
  disponibles »). La typologie vient alors d'`indicateurs_cles_fede`, qui la porte pour les
  groupes comme pour les fédérations.

## 6. Check-list de fidélité (fédération 101)

- [x] 313 957 licences 2024 ; base 100 : 85,98 en 2021, 103,97 en 2024 ; groupe 111,07 ; ensemble 105,54
- [x] Top 10 : Ardennes 9,4 … Loire-Atlantique 6,5
- [x] QPV 3,2 % / 4,6 % ; ZRR 13,9 % / 14,7 % ; féminisation 48,0 % / 33,7 %
- [x] Âge médian 22 ans / **16** ans (et non 15 ni 22) ; taille médiane 80 / 76
- [x] Établissements 2 498 ; 2 451 · 2 474 · 2 498
- [x] Territoire : 310 480 ; 4,5 ; 61,5 % ; 2 454 ; 3,6 ; 5,0 % ; typologie 33/37 · 36/31 · 20/19 · 11/13
- [x] Bretagne : 19 467 ; 5,6 ; 84,8 % ; 17 ans / 16 ; **48,8 %** ; 148 ; 4,3
- [x] Fiche : agrément 2005, « Scolaire », délégation « Non »
- [x] SHN 283 ; Elite 17/16, Reconversion 1/3, Relève 84/99, Sénior 19/44 ; ANS 9 862 404 € ; Pass'Sports 35 214
- [x] Lien profond `?refine.code_fs=111` → football (2 352 238 licences)
