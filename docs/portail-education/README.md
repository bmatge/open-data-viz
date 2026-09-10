# Relevé visuel des dataviz du portail Éducation (data.education.gouv.fr)

Descriptions **exhaustives, faites au navigateur** (Chrome, 2026-09-10) des 36 entrées du
[catalogue de data-visualisations](https://data.education.gouv.fr/pages/dataviz-list/), et
**proposition de transposition vers `dsfr-data`** pour chacune. Second banc d'essai, après
celui de data.economie.gouv.fr (`../portail/`).

Chaque fiche suit la même structure : objectif de la dataviz → relevé visuel bloc par bloc →
défauts de l'original → tableau de correspondance directive Opendatasoft / composant
`dsfr-data` + esquisse de code → limites et points durs → données à reproduire fidèlement.

> **⚠️ 2026-09-10 — les jalons v0.24.0 et v0.25.0 de `dsfr-data` ont été livrés le jour même
> de cet audit.** Les fiches ont été écrites le matin, quand ils étaient en cours : celles qui
> renvoient à « prévu au jalon v0.25.0 » décrivent donc quelque chose de désormais disponible
> (`fetch-mode="export"` #689, `require-where` #690). Le dépôt est monté en 0.25.0, et ses
> 15 pages qui portaient le contournement de chargement ont été migrées. Les analyses ne sont
> pas réécrites : elles disent ce qui a été rencontré au moment du portage. Voir
> [`_CIBLE-0.25.md`](_CIBLE-0.25.md) pour l'état courant.

## À lire avant toute fiche

| Fichier | Ce qu'il donne |
|---|---|
| [`_METHODE.md`](_METHODE.md) | Le brief : structure imposée, règles, les quatre familles de cibles du portail et comment récupérer la source de chacune |
| [`_CIBLE-0.25.md`](_CIBLE-0.25.md) | **La faisabilité se juge contre `dsfr-data` 0.25.0**, pas contre la version épinglée. Les quatre verdicts (natif / postérieur à la version épinglée / prévu à un jalon / manque réel) et l'état du backlog |
| [`_RESIDU.md`](_RESIDU.md) | **Le produit du lot** : les constats qui ne sont ni natifs ni planifiés — ce que ce portail révèle et que Bercy n'a pas montré |
| [`_JEUX.md`](_JEUX.md) | Volumes des jeux, relevés une fois pour toutes |
| [`_sources/`](_sources/) | Templates AngularJS désechappés et configurations Studio archivées |

## Le catalogue

Il est piloté par le jeu `dataviz-a-la-une` (36 lignes, champs `id, thematique,
sous_thematique, filtre, titre, description, image, lien`), export dans
[`_catalogue-source.json`](_catalogue-source.json). La page elle-même est une page AngularJS
dont le template est dans [`_sources/_dataviz-list.html`](_sources/_dataviz-list.html).

**Quatre familles de cibles**, découvertes en cours de lot — le portail superpose trois
générations d'Opendatasoft :

1. **Pages AngularJS** `/pages/<slug>/` — `$scope.blocks` dans le HTML servi (15 entrées).
2. **Vues personnalisées héritées** — template `ods-*` rangé dans `extra_metas.visualization`
   du jeu, invisible à l'API `datasets/1.0`, lisible via `/explore/embed/dataset/<jeu>/<slug>/`.
   L'URL du catalogue fait un 302 ; la page vivante est `/explore/assets/visualisation-<slug>/view/`.
3. **Pages Studio** `/p/<slug>/` — configuration à `/api/portal/v1.0/studio_pages/<slug>`.
   ⚠️ Cette API **peut être périmée** : la config vivante est dans le HTML servi
   (`appEvent.detail.initialize(...)`), et l'écart est lui-même un constat.
4. **Pages AngularJS servies sous une URL `/explore/assets/…`** — pas de page Studio associée,
   le `<link rel="canonical">` révèle la vraie nature.

Plus les cibles hors portail : `equipements.sports.gouv.fr` (3), `dataeducation.opendatasoft.com`
(3), `dataeducation.huwise.com` (1), la forge des communs numériques éducatifs (1).

## Les 36 entrées

| id | Titre | Thématique | Nature | Fiche |
|---:|---|---|---|---|
| 36 | Offre de langues dans les collèges et lycées | Éducation | page AngularJS | [offre-formation-langues.md](offre-formation-langues.md) |
| 35 | IPS EREA | Éducation / EREA | page AngularJS | [dataviz-ips-erea.md](dataviz-ips-erea.md) |
| 34 | IPS Ecoles | Éducation / Ecoles | page AngularJS | [dataviz-ips-ecoles.md](dataviz-ips-ecoles.md) |
| 33 | Génération 2024 | Éducation | page AngularJS | [generation-2024.md](generation-2024.md) |
| 32 | IPS Lycées | Éducation / Lycées | page AngularJS | [dataviz-ips-lycees.md](dataviz-ips-lycees.md) |
| 31 | IPS Collèges | Éducation / Collèges | page AngularJS | [dataviz-ips-colleges.md](dataviz-ips-colleges.md) |
| 30 | L'annuaire des bureaux des entreprises | Éducation / Lycées | vue de jeu | [annuaire-bureaux-des-entreprises.md](annuaire-bureaux-des-entreprises.md) |
| 29 | Cartographie Conseil National de la Refondation - CNR Education | Éducation | page AngularJS | [cnr-education.md](cnr-education.md) |
| 28 | Cartographie PIX fiche établissement | Éducation | page AngularJS | [carto-pix-fiche-etablissement.md](carto-pix-fiche-etablissement.md) |
| 27 | Équipements sportifs en milieu scolaire | Sports | portail Sports | [equipements-sportifs-milieu-scolaire.md](equipements-sportifs-milieu-scolaire.md) |
| 26 | Vue cartographique d’un établissement produite par la forge des communs numériques éducatifs | Éducation | hors ODS | [educajou-ecolemap.md](educajou-ecolemap.md) |
| 25 | Ted-i : Déploiement des robots de téléprésence | Éducation | asset Studio | [tedi-robots-telepresence.md](tedi-robots-telepresence.md) |
| 24 | Hybridation de l’enseignement en lycée | Éducation / Lycées | vue de jeu | [hybridation-enseignement-lycee.md](hybridation-enseignement-lycee.md) |
| 23 | Appel à projet Socle Numérique dans les Ecoles Elémentaires | Éducation / Ecoles | vue de jeu | [aap-socle-numerique-ecoles.md](aap-socle-numerique-ecoles.md) |
| 22 | Données ouvertes de France Éducation international | Éducation | page Studio | [fei-chiffres-cles.md](fei-chiffres-cles.md) |
| 21 | Cartographie des ULIS-TFV | Éducation | page AngularJS | [implantation-ulis-tfv.md](implantation-ulis-tfv.md) |
| 20 | Cartographie de l’accompagnement de la déficience sensorielle | Éducation | page AngularJS | [accompagnement-deficience-sensorielle.md](accompagnement-deficience-sensorielle.md) |
| 19 | Cartographie des labellisations Egalité fille-garçon | Éducation | page AngularJS | [label-egalite-fille-garcon.md](label-egalite-fille-garcon.md) |
| 18 | Challenge wikidata en classe | Éducation | page AngularJS | [wikidata-en-classe.md](wikidata-en-classe.md) |
| 17 | Annuaire des internats | Éducation | vue de jeu | [annuaire-des-internats.md](annuaire-des-internats.md) |
| 16 | Suivi d'impact de l'Opération de Sensibilisation au risque de l'hameçonnage "Cactus" | Éducation | page Studio | [cactus-hameconnage.md](cactus-hameconnage.md) |
| 15 | Challenge de la Data 2025 | Éducation | page AngularJS | [challenge-data-2025.md](challenge-data-2025.md) |
| 14 | Portrait de territoire | Sports | portail Sports | [portrait-de-territoire-sports.md](portrait-de-territoire-sports.md) |
| 13 | Accessibilité des équipements sportifs | Sports | portail Sports | [accessibilite-equipements-sportifs.md](accessibilite-equipements-sportifs.md) |
| 12 | Territoires numériques éducatifs | Éducation | page AngularJS | [tne-dashboard.md](tne-dashboard.md) |
| 11 | Passe ton Hack d'abord! | Éducation | domaine Huwise | [passe-ton-hack-dabord.md](passe-ton-hack-dabord.md) |
| 10 | Etablissements labellisés Euroscol | Éducation | vue de jeu | [etablissements-euroscol.md](etablissements-euroscol.md) |
| 9 | Les personnels dans les écoles primaires et maternelles | Éducation / Ecoles | domaine ODS | [personnels-ecoles-primaires.md](personnels-ecoles-primaires.md) |
| 8 | Les personnels dans les collèges français | Éducation / Collèges | domaine ODS | [personnels-colleges.md](personnels-colleges.md) |
| 7 | Les personnels dans les lycées français | Éducation / Lycées | domaine ODS | [personnels-lycees.md](personnels-lycees.md) |
| 6 | GAR - les données sur les ressources numériques éducatives accessibles via le GAR | Éducation | asset Studio | [gar-ressources-numeriques.md](gar-ressources-numeriques.md) |
| 5 | Capytale Analyse des usages | Education | asset Studio | [capytale-usages.md](capytale-usages.md) |
| 4 | DNMA Les usages numériques constatés via les ENT | Education | asset Studio | [dnma-usages-ent.md](dnma-usages-ent.md) |
| 3 | Challenge wikidata en classe 2026 | Éducation | page AngularJS | [wikidata-en-classe-2026.md](wikidata-en-classe-2026.md) |
| 2 | Quelles personnalités ont donné leur nom aux écoles ? | Éducation | asset Studio | [patronymes-des-ecoles.md](patronymes-des-ecoles.md) |
| 1 | France Éducation international - Sélection de projets européens portant sur les données | Éducation | asset Studio | [fei-projets-europeens-donnees.md](fei-projets-europeens-donnees.md) |

## Ce que le relevé établit sur le catalogue lui-même

- **36 entrées annoncées, 33 dataviz au mieux.** Trois pages (`wikidata-en-classe`,
  `wikidata-en-classe-2026`, `challenge-data-2025`) ne contiennent **aucune** directive `ods-*`,
  aucun `iframe`, aucune requête vers `/api/` — ce sont des galeries éditoriales de liens.
- **Le catalogue se scinde tout seul** : les pilules de thématique affichent « Éducation » et
  « Education » séparément, parce que le jeu porte les deux graphies (ids 4 et 5 sans accent).
- **Cinq entrées sortent du domaine de l'État** : trois vers `dataeducation.opendatasoft.com`,
  une vers `dataeducation.huwise.com` (l'alias d'hôte de l'éditeur — vérifié : mêmes IP, mêmes
  306 jeux, même config, avec le bloc-marque GOUVERNEMENT servi depuis un `.com`), une vers la
  forge. Dans les deux derniers cas, le catalogue **nomme mal ce vers quoi il pointe**.
- **Deux liens de catalogue mènent à une page qui redirige**, ce qui ne prouve rien : la
  dataviz vit ailleurs sur le même portail (leçon LIM-006, confirmée ici).

## Méthode et limites du relevé

- Chaque page a été chargée dans Chrome, scrollée entièrement, et ses interactions jouées :
  selects ouverts et valeurs choisies, points de carte cliqués, infobulles lues mot pour mot,
  couches basculées, accordéons dépliés, recherches saisies, paginations testées. Les captures
  ont été lues, pas seulement le DOM.
- Les chiffres affichés ont été **recoupés à l'API v2.1**, page par page. Les écarts sont
  consignés dans chaque fiche.
- Les durées et le nombre d'allers-retours ont été **mesurés** avant toute conclusion sur la
  performance, conformément à la règle du dépôt.
- Le code (`$scope.blocks`, config Studio) a servi à nommer les champs et les formules, jamais
  à décrire un rendu qui n'a pas été vu. Quand le rendu contredisait le code, le rendu a gagné.
- **Ce qui n'a pas été rejoué au navigateur est marqué comme tel** dans les fiches et dans
  `_RESIDU.md` (⚠️) : deux constats sur les codes attendus par `map-reg` et `map-aca` ont été
  établis par lecture du bundle DSFR Chart et **ne doivent pas être déposés en l'état**.
