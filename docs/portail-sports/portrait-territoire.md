# Portrait de territoires (data.sports.gouv.fr)

- **URL** : https://data.sports.gouv.fr/pages/portrait-territoire/
- **Portail** : `data.sports.gouv.fr` (ministère des Sports, de la Jeunesse et de la Vie
  associative), Opendatasoft / Huwise, page AngularJS (`$scope.blocks`).
- **Template archivé** : `_sources/portrait-territoire.html` (291 311 caractères désechappés) +
  `_sources/portrait-territoire.css` (22 281). Relevé le 2026-09-11.
- **Clé API** : aucune. CORS ouvert (`access-control-allow-origin: *`). **Quota anonyme :
  5 000 requêtes par jour et par IP** (`x-ratelimit-limit`), remis à zéro à minuit UTC — à
  surveiller : une visite complète de l'original en coûte 174.
- **Relevé visuel** : 2026-09-11, Chromium (Playwright), viewport 1400 × 1000, deux passes :
  France entière (état initial), puis **Gironde (33)**, territoire de référence de cette fiche.
- **Voisine** : `docs/portail-education/portrait-de-territoire-sports.md` décrit le « Portrait de
  territoire » d'`equipements.sports.gouv.fr` (lot 12) — autre page, autres jeux, même famille.

## Les jeux de données

102 contextes déclarés sur un seul `<ods-dataset-context>`, sur 29 jeux (28 de
`data.sports.gouv.fr`, `data-es` d'`equipements.sports.gouv.fr`). Volumes relevés à l'API le
2026-09-11 (`records_count` de la métadonnée).

| Jeu | Lignes | Onglet | Clé département / région |
|---|---:|---|---|
| `lics_dep` | 12 870 | 1, 6 | `dep` / `newreg` |
| `lics_dep_sexe` | 12 870 | 1, 6 | `dep` / `newreg` |
| `lics_dep_age_sexe` | 463 320 | 1, 6 | `dep` / `newreg` |
| `pop_dep_age_sexe` | 34 340 | 1, 6 | `dep` / `newreg` (10 millésimes, 2024 retenu) |
| `clubs_dep` | 39 270 | 1, 6 | `dep` / `newreg` (`annee` en date) |
| `prat_reg_sexe` | 18 | 1, 6 | — / `reg_code` (PACA+Corse, Antilles fusionnées ; `FR`) |
| `prat_reg_pcs_cat` | 144 | 1 | — / `reg_code` |
| `data-es-par-commune` | 28 474 | 2, 6 | `dep_code_filled` / `reg_code` |
| `data-es-par-commune-type-equip` | 143 710 | 2 | `dep_code_filled` / `reg_code` |
| `data-es-territoires` | 333 635 | 2 (carte) | `departement_code_complet` / `region_code` |
| `ref-geo-dataes` | 35 075 | 2, 6 | `codedepartement` / `coderegion` |
| `data-es` (equipements.sports.gouv.fr) | 333 629 | 2 (France) | — |
| `bpjeps_dipl_emploi` | 21 | 3, 6 | — / `reg_code` (taux en TEXTE « 84,3 », « n.d ») |
| `bpjeps_dipl_mention` | 209 | 3 | — / `reg_code` |
| `sections-sportives-scolaires` | 2 739 | 3 | `dep_code` / `reg_code` |
| `sections-excellence-sportive` | 274 | 3 | `dep_code` / `reg_code` |
| `mesr_sies_staps_inscrits` | 138 | 3 | `dep_code` / `region_depeta` |
| `mesr_sies_staps_diplomes` | 132 | 3 | `dep_code` / `region_depeta` |
| `sc_missions` | 104 | 4, 6 | `dep` / `reg` (**entier**) |
| `portrait_territoires_base` | 107 | 5 | `dep_code` / `reg_code` |
| `portrait_territoires_base_annees` | 749 | 5 | `dep_code` / `reg_code` |
| `passsport_fede` | 6 841 | 5 | `dep_code` / `reg_code` |
| `referentiel-communes`, `lics_cc`, `lics_cc_wide`, `lics_cc_pyra`, `clubs_cc`, `pop_cc_age`, `diag_commune` | 34 935 à 953 292 | recherche, niveau commune/EPCI | `cc_2024`, `epci_code` |

**Onze noms pour deux clés.** Département : `dep`, `dep_code`, `dep_code_filled`,
`codedepartement`, `departement_code_complet`. Région : `newreg`, `reg_code`, `reg`,
`coderegion`, `region_depeta`, `region_code`. Tous sur deux caractères (« 01 », « 33 »), sauf
`sc_missions.reg`, un entier.

## 1. Objectif et informations véhiculées

- **Question** : « Quel est le visage sportif de mon territoire — commune, EPCI, département,
  région — et comment se situe-t-il par rapport à la France ou à un autre territoire ? »
- **Message** : aucun message éditorial ; un générateur de fiche de synthèse en six thèmes.
- **Ce que l'utilisateur obtient** : une quarantaine d'indicateurs, chacun doublé de sa valeur
  nationale, deux Top 10, une pyramide des âges des licenciés, une carte des équipements, une
  courbe, et un comparateur de deux territoires sur treize indicateurs.
- **Hors de l'objet** : aucune série temporelle hors du Savoir rouler à vélo ; aucune
  explication des écarts.

## 2. Relevé visuel

En-tête commun : bandeau illustré, titre « Portrait de territoires », une barre de recherche
« Rechercher une commune, une EPCI, un département, une région... » (« Géographie 2024 »). La
saisie ouvre quatre onglets de résultats (Communes, EPCI, Départements, Régions, 20 résultats
au plus), chaque résultat étant un tag cliquable. Puis « Territoire : France entière » (ou
« Gironde (33) » + bouton « Réinitialiser »), et six onglets `ods-simple-tab`.

### Onglet 1 — Licences et pratiques sportives

| Bloc | France | Gironde | Formule |
|---|---|---|---|
| Phrase KPI | 17 012 838 licences en 2024 | 441 801 | `lics_dep`, `sum(lics)`, hors ETR, COM, NR, 975, 977, 978, 980, 986-988 |
| Établissements actifs | 154 779 | 3 740 | `clubs_dep` 2024, `sum(n_actifs)`, mêmes exclusions |
| Part des licences des moins de 20 ans | 56,1 % | 52,0 % (56,1 % en France) | `lics_dep_age_sexe`, somme des tranches 0-19 / total |
| Licences pour 1 000 habitants | 248,6 | 259,2 | `lics_dep` / `pop_dep_age_sexe` 2024 (deux jeux) |
| Part des licences féminines | 38,9 % | 39,5 % | `lics_dep_sexe`, `sum(lics_f)/sum(lics_tot)` |
| Pyramide « Par groupe d'âges, en 2024 » | F / H | F / H territoire + France | barres en `div`, largeur `n / total du sexe × 400 %`, valeurs dans l'infobulle seulement |
| Population de moins de 20 ans | 23,2 % | 22,3 % | `pop_dep_age_sexe` 2024 |
| Population de 65 ans et plus | 21,4 % | 20,3 % | idem |
| Top 10 fédérations | FF de Football 2 349 862 … FFEPGV 444 334 | FF de Football 48 986 … Judo 17 009 + la France à côté | `lics_dep` `group_by federation_court` |
| Pratique régulière des 15 ans et plus | 60 % (2024-2025) | 58 % « dans la région Nouvelle-Aquitaine » | `prat_reg_sexe` — **région** même pour un département |
| Jauges hommes / femmes | 61 % / 58 % | 56 % / 60 % (région) | idem |
| Par PCS (7 catégories) | 69, 61, 75, 56, 49, 72, 51 % | 64, 60, 74, 65, 45, 66, 51 % | `prat_reg_pcs_cat`, hors « ensemble » |

Sources en bas d'onglet : 4 liens niveau commune, 6 niveau département/région/France.

### Onglet 2 — Équipements sportifs

| Bloc | France | Gironde |
|---|---|---|
| Phrase KPI | « 333 629 équipements sportifs en France » (`data-es`, autre portail) | « 5 963 … dans le département Gironde » (`data-es-par-commune`) |
| Carte `ods-map` à grappes | grappes sur le monde | 10 grappes sur la Gironde (2 710 sur Bordeaux) et un marqueur isolé |
| Équipements pour 10 000 habitants | 49,0 | 36,4 (49,0 en France) |
| Équipements par km² | 0,6 | 0,6 (0,6 en France) |
| Top 10 des familles | Divers équipements Sports de nature 42 136 … Terrain extérieur de petits jeux coll… 14 557 | Court de tennis 1 093 … Salle ou terrain spécialisé 275 |

### Onglet 3 — Enseignement et diplômes

| Bloc | France | Gironde |
|---|---|---|
| Insertion BPJEPS Sport à un an | 84,2 % (2023-2024) | 84,3 % « dans la région Nouvelle-Aquitaine » (84,2 % en France) |
| Diplômes BPJEPS délivrés | 11 097 | 1 277 (région) |
| Top 5 mentions | Activités physiques pour tous 3 561, Forme 3 133, Aquatiques 1 201, Équestres 951, Basket-ball 282 | Forme 384, APT 312, Aquatiques 137, Équestres 110, Surf 66 |
| Sections sportives scolaires (rentrée 2024) | 2 739 | 33 |
| Sections d'excellence sportive (rentrée 2022) | 274 | 5 |
| Inscrits STAPS (rentrée 2024) | 56 904 | 1 175 |
| Diplômés STAPS (session 2024) | 12 149 | 329 |

### Onglet 4 — Volontariat sportif

| Bloc | France | Gironde |
|---|---|---|
| Missions de Service Civique 2024 | 86 406 | 2 284 (86 406 en France) |
| dont sport | 13 714, « soit 16 % » | 286, « soit 13 % » |

### Onglet 5 — Dispositifs État

| Bloc | France | Gironde |
|---|---|---|
| Pass'Sports utilisés en 2024 | 1 649 414 | 39 899 (1 649 414 en France) |
| Top 10 fédérations Pass'Sport | Football 488 436 … Rugby 41 053 | Football 10 108 … Équitation 1 237 |
| Clubs au Handiguide | 5 924 | 171 |
| Maisons Sport-Santé | 574 | 8 |
| Aisance aquatique | 59 339 « projets » pour 131 871 enfants | 253 pour 417 |
| Savoir rouler à vélo 2025 | 378 923 | 5 064 |
| Courbe 2020-2025 (spline + points) | 5 349, 64 075, 123 193, 179 198, 393 592, 378 923 | 0, 900, 1 885, 3 189, 6 466, 5 064 |

### Onglet 6 — Me comparer

Deux barres de recherche (référence, comparaison), puis treize indicateurs en deux colonnes :
licences, licences pour 1 000 habitants, part féminine, part des moins de 20 ans, part de la
population de moins de 20 ans, Top 10 fédérations, clubs et EPA actifs, équipements pour
10 000 habitants et par km², missions SC dans le sport et leur taux, pratique régulière,
insertion BPJEPS. Gironde / France : 441 801 / 17 012 838 ; 259,2 / 248,6 ; 39,5 / 38,9 % ;
52,0 / 56,1 % ; 22,3 / 23,2 % ; 3 740 / 154 779 ; 36,4 / 49,0 ; 0,6 / 0,6 ; 286 / 13 714 ;
13 / 16 % ; « Données non disponible à ce niveau de territoire » / 60 % ;
« Données non disponible… » / 84,2 %.

### Coût réseau mesuré

68 requêtes API au chargement (onglet 1), puis au premier affichage : 10 (onglet 2), 10 (3),
3 (4), 7 (5), 42 à 46 (6). 174 pour la visite complète France puis Gironde.

## 3. Défauts et bizarreries de l'original

1. **Trois comptes d'équipements** : `data-es-par-commune` (331 677, le territoire),
   `data-es` d'un autre portail (333 629, « en France »), `data-es-territoires` (333 635, la
   carte ; 5 953 en Gironde contre 5 963 dans le KPI). Le ratio « pour 10 000 habitants » compare
   un territoire calculé sur un jeu à une France calculée sur un autre.
2. **Deux Pass'Sport** : 39 899 (KPI, `portrait_territoires_base`) contre 39 155 (somme du jeu
   par fédération qui nourrit le Top 10) ; 1 649 414 contre 1 642 136 en France.
3. **« Me comparer » contredit les onglets 1 et 3** : pratique régulière et BPJEPS « non
   disponibles à ce niveau » pour un département, alors que les onglets affichent la valeur de
   sa région.
4. **Les deux recherches partagent quatre contextes** (`ctxcommunes`, `ctxepcis`, `ctxdepts`,
   `ctxregions`) : l'expression de l'onglet 6 remet leur `q` à `undefined`, et le panneau de
   résultats du haut de page affiche « Départements (20 résultats) » de l'Ain au Cher sous un
   champ qui dit « Gironde » (capture `33-6`).
5. **Densité d'équipements à une décimale** : 0,6 partout (0,59 en Gironde, 0,58 en France).
6. **« Projets Aisance Aquatique »** somme le champ `aq_interventions`.
7. **Mayotte** traitée par un test en dur sur le code région (`=='06'` ou `!='06'`), dix-sept fois dans le template.

## 4. Transposition vers `dsfr-data`

| Original | `dsfr-data` |
|---|---|
| `<ods-dataset-context>` × 102 | 51 `dsfr-data-source` (t- territoire, f- France, c- comparaison, s- jeux régionaux entiers) |
| recherche libre 4 mailles | 2 `<select>` (région, département) + `dsfr-data-context url-sync` |
| affectation de 96 `refine` | 11 `dsfr-data-context-filter` (un par nom de clé), `apply-to` |
| `selectedReg = item.newreg` | référentiel `portrait_territoires_base` `group-by="reg_code, reg_nom" require-where` ⨝ jeu régional |
| `sum(a)/sum(b)` inter-jeux | `group-by` des deux côtés → `dsfr-data-join` → `a:sum / b:sum` |
| part des moins de 20 ans | `compute` `u20 = when … then lics else 0` → `u20:sum / lics:sum` (0.29 : `lics:sum{trage:in:…}`) |
| pyramide `div` | `dsfr-data-chart type="bar" horizontal` × 2 (F, H), séries territoire / France |
| Top 10 `ods-subaggregation` | `dsfr-data-podium max-items="10"` |
| `ods-map` | `dsfr-data-map` + couche `circle cluster` sur `fetch-mode="export" require-where` |
| comparateur | second `dsfr-data-context` (`ctx2`), 12 sources |

Squelette : voir `public/sports/portrait-territoire.html` (sources en tête, un `fr-tabs` à six
panneaux, transformateurs en pied).

## 5. Limites et points durs

- **Jointure figée sur « Chargement… »** quand une entrée est en `require-where` et que l'autre
  charge après elle (constaté 0.28.0 et 0.29 construite) : contourné par l'ordre du DOM.
- **Parts de sommes** : six normalisations en 0.28 ; natif en 0.29 (vérifié au bundle construit).
- **Onze tags et onze paramètres d'URL pour un choix** ; deux contextes `url-sync` qui partagent
  des noms de champ s'échangent leurs paramètres au rechargement (vérifié) : `ctx2` sans URL.
- **`sc_missions.reg` entier** : le filtre de contexte émet `reg = "01"`, vide pour les régions
  d'outre-mer (vérifié à l'API et en page minimale).
- **Nom du territoire** : `dsfr-data-context-value` rend le code ; un `dsfr-data-display` sur le
  référentiel donne le nom, précédé d'un « 1 resultat » masqué par CSS.
- **Courbe annuelle** : DSFR Chart gradue des années en « 2020,5 » ; rendue en barres.
- **Niveaux commune et EPCI** : non tentés (périmètre).

## 6. Check-list de fidélité (Gironde)

- [x] 441 801 licences, 3 740 établissements
- [x] 52,0 % / 259,2 / 39,5 % et 56,1 % / 248,6 / 38,9 % en France
- [x] 22,3 % et 20,3 % de la population (23,2 et 21,4 %)
- [x] Top 10 : Football 48 986 → Judo 17 009 ; France Football 2 349 862 → FFEPGV 444 334
- [x] Pratique 58 % (H 56, F 60), France 60 % (H 61, F 58), 7 PCS
- [x] 5 963 équipements, 36,4 pour 10 000 habitants, Top 10 familles (Court de tennis 1 093)
- [x] BPJEPS 84,3 % / 1 277, France 84,2 % / 11 097, Top 5 mentions
- [x] 33 sections sportives, 5 d'excellence, 1 175 inscrits et 329 diplômés STAPS
- [x] 2 284 missions, 286 sport, 13 % ; France 86 406, 13 714, 16 %
- [x] 39 899 Pass'Sport, Top 10 Football 10 108 ; Handiguide 171, MSS 8, AQ 253 / 417, SRAV 5 064
- [x] Savoir rouler 2020-2025 : 0, 900, 1 885, 3 189, 6 466, 5 064
- [ ] France des équipements : 331 665 / 48,9 ici contre 333 629 / 49,0 (écart voulu, défaut n° 1)
- [ ] Niveaux commune et EPCI
