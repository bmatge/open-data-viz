# Cartographie PIX — fiche établissement

- **URL** : https://data.education.gouv.fr/pages/carto-pix-fiche-etablissement/
- **Catalogue** : id **28**, thématique **Éducation**, sous-thématique **`null`**, filtre `null`.
  Description : « Cette carte permet d'accéder aux détails des évaluations et certifications
  PIX de chaque établissement scolaire. » Vignette `/assets/theme_image/dataviz-pix-preview.png`.
- **Relevé visuel** : 2026-09-10, Chrome, fenêtre 1568 × 751 (viewport interne 1440 × 690).
- **Cinq jeux de données**, tous publics, licence Ouverte v2.0 (Etalab), lisibles sans clé.
  La page ne pose **aucun `ctx-apikey`**.

| Contexte | Jeu | Lignes | Champs | Rôle dans la page |
|---|---|---:|---:|---|
| `ctxmap`, `ctxetab` | `fr-en-pix_certification_pix_inscription_et_passation_par_eple` | **43 479** | 26 | la carte **et** l'en-tête + le bloc annuel de la fiche |
| `ctx1` | `fr-en-pix_participations_aux_campagnes_par_profil_cible_et_mef_code` | **354 012** | 23 | accordéon « Détail par profil et par formation » |
| `ctx2` | `fr-en-pix_resultats_des_campagnes_de_rentree_par_eple` | **334 050** | 18 | accordéon « Détail par niveau scolaire et par palier » |
| `ctx3` | `fr-en-pix_participations_aux_campagnes_par_etablissement_sans_collecte_de_profil` | **41 422** | 19 | les deux lignes « participations aux parcours » de chaque année |
| `ctx5` | `fr-en-pix_certifications_par_classes` | **72 568** | 18 | accordéon « Détail par classe » — **pas de champ `position`** |

Volumes repris de `_JEUX.md` (relevé 2026-09-10). Mises à jour : les quatre jeux `..._eple`,
`..._mef_code`, `..._sans_collecte`, `..._par_classes` datent du **23/07/2026** ;
`..._resultats_des_campagnes_de_rentree_par_eple` du **07/09/2026**.

### Le jeu de la carte, en détail (`fr-en-pix_certification_pix_inscription_et_passation_par_eple`)

- **26 champs** : `annee` (text), `academie_nom/code`, `departement_nom/code`, `commune_nom/code`,
  `etablissement`, `uai`, `position` (geo_point_2d), `secteur`, `sessions_programmees`,
  `sessions_finalisees`, `inscrits`, `inscrits_distincts`, `participants`, `certifies`,
  `non_obtenues`, `average_pix_score`, `median_pix_score`, `first_quartile_pix_score`,
  `third_quartile_pix_score`, plus deux paires redondantes de code/libellé de région
  (`code_insee_de_la_region` / `libelle_de_la_region` **et** `code_region` / `libelle_region`).
- **12 facettes déclarées au back-office** : `academie_nom`, `academie_code`, `departement_nom`,
  `departement_code`, `commune_nom`, `commune_code`, `etablissement`, `uai`, `secteur`, `annee`,
  `code_region`, `libelle_region`.
- **4 années** : 2022 **11 076** · 2023 **10 897** · 2024 **10 893** · 2025 **10 613**.
- **11 113 UAI distincts** (`group_by=uai&limit=-1` : 11 113 groupes). ⚠️ `count(distinct uai)`
  renvoie **11 406** : l'agrégat `distinct` d'ODS v2.1 est **approximatif** (cardinalité ES).
  Même écart sur le jeu `..._sans_collecte` en 2025 : `count(distinct uai)` = 10 781 pour
  **10 385 lignes**. Ne pas s'en servir pour un chiffre publié.
- **Secteur** : `PUBLIC` 31 735 · `PRIVE` 11 736 · **`null` 8**.
- **34 académies** (dont Nouvelle Calédonie, Polynésie Française, Wallis et Futuna,
  Saint Pierre et Miquelon), **108 départements** (dont une valeur **« Andorre »**),
  **3 974 communes**.
- **Les quatre champs de score (`average_/median_/first_quartile_/third_quartile_pix_score`)
  ne sont utilisés nulle part par la page.**

---

## Objectif de la dataviz et informations véhiculées

- **Question à laquelle elle répond** : « Où est mon établissement, et quel est son bilan PIX —
  participations aux parcours, sessions de certification, certifications obtenues — année
  scolaire par année scolaire ? » C'est un **motif maître-détail** : la carte est un sélecteur,
  la fiche est le livrable.
- **Message porté** : aucun. Pas une ligne de texte hors le titre « Cartographie PIX  - fiches
  établissement » (avec sa double espace) et les libellés de filtres. Ni définition de PIX, ni
  de « palier », ni de « profil cible », ni de « MEF ». Aucun total national, aucune comparaison,
  aucun taux.
- **Information que l'utilisateur doit obtenir** : pour un UAI donné, une fiche de ~30 000
  caractères en quatre blocs annuels (2025 → 2022), chacun avec cinq à dix phrases chiffrées et
  trois accordéons de détail.
- **Ce qui n'est pas dans l'objet** :
  - **aucun filtre d'année** : la carte superpose les **quatre millésimes** ; son compteur
    affiche des **lignes**, pas des établissements (Aix-Marseille : « 1 828 » pour **464** UAI) ;
  - **aucune donnée n'est encodée visuellement** : pas de couleur, pas de taille variable, pas
    de légende (`display-legend="false"`) — la carte ne dit rien d'autre que « il y a des
    établissements » ;
  - **aucun des quatre scores PIX** du jeu (`average_pix_score` & co) n'est affiché ;
  - **aucun téléchargement**, aucun lien vers les cinq jeux, aucune source, aucune date de mise
    à jour ;
  - **aucun état partageable** : pas d'`urlsync`, l'URL ne bouge jamais ;
  - **aucun tableau, aucun KPI, aucun graphique.**

---

## Le template AngularJS

`_sources/carto-pix-fiche-etablissement.html` (22 439 car.) + **13 345 caractères de CSS**
maison (variables `--drawer-width: 500px`, `--filters-width: 300px`,
`--map-drawer-container-height: 600px`, un backdrop, un tiroir animé, trois accordéons).

### Un contexte multiple à sept branches

```html
<ods-dataset-context context="ctx1,ctx2,ctx3,ctx4,ctx5,ctxmap,ctxetab"
  ctx1-dataset="…_par_profil_cible_et_mef_code"   ctx1-sort="profil_cible"
  ctx2-dataset="…_resultats_des_campagnes_de_rentree_par_eple" ctx2-sort="niveau_scolaire"
  ctx3-dataset="…_sans_collecte_de_profil"
  ctx4-dataset="…_certification_pix_inscription_et_passation_par_eple" ctx4-sort="-annee"
  ctx5-dataset="…_certifications_par_classes"     ctx5-sort="classe"
  ctxetab-dataset="…_certification_pix_inscription_et_passation_par_eple"
  ctxmap-dataset="…_certification_pix_inscription_et_passation_par_eple"
  …-parameters="{'disjunctive.departement_nom':true,'disjunctive.commune_nom':true}">
```

**Sept contextes pour cinq jeux** : `ctx4`, `ctxetab` et `ctxmap` pointent le **même** jeu
`..._eple`. `ctxmap` porte la carte et les quatre filtres ; `ctxetab` porte l'en-tête de la
fiche ; `ctx4` porte la boucle annuelle. Trois contextes là où un seul aurait suffi côté
détail — mais la séparation `ctxmap` / `ctxetab` est *juste* : elle empêche la carte de se
filtrer elle-même au clic (voir « Transposition », le même piège existe dans `dsfr-data`).

### Comment la sélection se propage — le cœur du motif

```html
<ods-map-layer context="ctxmap"
  refine-on-click-context="[ctx1,ctx2,ctx3,ctx4,ctx5,ctxetab]"
  refine-on-click-ctx1-context-field="uai" refine-on-click-ctx1-map-field="uai"
  refine-on-click-ctx1-replace-refine="true"
  … (idem ctx2, ctx3, ctx4, ctx5, ctxetab) …>
```

- **L'identifiant pivot est `uai`**, présent dans les cinq jeux.
- **18 attributs** (3 × 6 contextes) pour dire une chose : « au clic, pose
  `refine.uai = <uai de l'objet cliqué>` sur ces six contextes, en remplacement ».
- Le tiroir s'ouvre par une classe CSS conditionnée au même paramètre :
  `ng-class="{'map-drawer-container--active': ctxetab.parameters['refine.uai']}"`.
  Deux fermetures : la croix et le backdrop, toutes deux
  `ng-click="ctxetab.parameters['refine.uai'] = undefined"` — **elles ne remettent à zéro que
  `ctxetab`** ; `ctx1`…`ctx5` gardent leur `refine.uai`. Sans conséquence visible (le tiroir est
  masqué), mais les cinq contextes restent filtrés sur l'établissement précédent.
- **`ctxmap` n'est pas dans la liste** : la carte garde tous ses points au clic.
- Les six `ods-results` du tiroir sont **imbriqués** et plafonnés :
  `detailEtabs` (ctxetab, max **1**) › `detailEtab1` (ctx1, max **100**) › `detailEtab2` (ctx2,
  max **100**) › `detailEtab3` (ctx3, max **10**) › `detailEtab4` (ctx4, max **10**) ›
  `detailEtab5` (ctx5, max **100**).
- **La jointure inter-jeux est faite à la main, en boucles imbriquées** :
  `ng-repeat="detailEtablissement4 in detailEtab4"` × `ng-repeat="… in detailEtab3"` +
  `ng-if="…4.fields.annee == …3.fields.annee"`. Pour l'accordéon niveau/palier, c'est une
  **triple** boucle : `ods-facet-results(niveau_scolaire)` × `ods-facet-results(palier)` ×
  `detailEtab2`, avec un `ng-if` à trois conditions. Idem pour profil × MEF × `detailEtab1`.
  C'est un produit cartésien rendu dans le DOM.

### Les quatre filtres

Quatre `ods-select`, tous alimentés par un `ods-facet-results` **sur `ctxmap`**, tri `alphanum`,
liés à `ctxmap.parameters['refine.<champ>']` — donc **aucun des cinq jeux de détail n'est
filtré par les selects**, seule la carte l'est. C'est cohérent : le détail est adressé par `uai`.

| # | H3 | Champ | Placeholder | Source |
|---|---|---|---|---|
| 1 | Académie | `academie_nom` | « Sélectionnez une académie » | `ods-facet-results` sur `ctxmap` |
| 2 | Département | `departement_nom` | « Sélectionnez un département » | idem |
| 3 | Commune | `commune_nom` | « Sélectionnez une commune » | idem |
| 4 | Secteur public/privé | `secteur` | « Sélectionnez un secteur » | idem |

Pas de filtre `annee`, alors que la facette existe au back-office.

---

## Relevé visuel exhaustif

### 1. Le bloc dans la page

Un seul bloc pleine largeur, hauteur **600 px** (`--map-drawer-container-height`), bordure bleue
de 10 px, entre l'en-tête DSFR du portail et le pied de page. Rien au-dessus, rien en dessous :
pas de H1, pas de chapô, pas de lien.

Bandeau de titre bleu très clair, centré, gras : « **Cartographie PIX  - fiches établissement** »
(double espace conservé dans le DOM ; le catalogue, lui, dit « Cartographie PIX fiche
établissement » au singulier).

### 2. La carte au chargement

`<ods-map location="3,18.50166,-3.66683" no-refit="true" scroll-wheel-zoom="true"
search-box="true" display-control="false" display-legend="false" toolbar-drawing="false"
toolbar-fullscreen="false" toolbar-geolocation="false">`

- **Cadrage initial : zoom 3 sur 18,50 N / −3,67 E, c'est-à-dire le nord du Mali.** À l'écran :
  l'Atlantique, les États-Unis, le Mexique, l'Amérique du Sud, l'Afrique entière, l'Inde.
  Échelle **1 000 km**. La France tient dans un timbre-poste en haut à droite.
- **Fond** : plan raster couleur type OSM/relief, non atténué.
- **Contrôles** : un champ « Rechercher un lieu » (géocodeur, en haut à gauche, **par-dessus** le
  panneau de filtres), un bouton « ▼ FILTRES », l'échelle métrique/impériale, un sélecteur de
  calques. Ni zoom +/−, ni plein écran, ni géolocalisation, ni dessin de zone, ni légende.
- **Un seul objet sur la carte : une pastille bleu marine portant « 43 479 »**, posée entre
  l'Espagne et la France. C'est un cluster serveur (`/api/records/1.0/geocluster/`).
- Le géocodeur propose deux entrées : « Rechercher <terme> dans les données affichées » et les
  résultats de géocodage.

### 3. Le panneau de filtres

Clic sur « ▼ FILTRES » : un panneau blanc de **300 px** se glisse à gauche **en poussant la
carte** (elle se re-rend plus étroite). Titre « Filtrer les établissements » + croix de fermeture.
Quatre groupes H3 + `ods-select`.

Chaque `ods-select` est un **combobox à recherche** : au clic, un champ « Filtre » remplace le
placeholder et une liste déroulante s'ouvre, en-têtée d'une ligne « Tous **(N options)** ».
La recherche est un `contains` **non ancré** et sans accent-folding (taper « V » ramène
« Alpes-de-Haute-Provence », « Aveyron », « Calvados »…).

**Nombre réel d'options, relevé dans le DOM :**

| Select | Options rendues | Valeurs réelles du jeu | Première → dernière |
|---|---:|---:|---|
| Académie | **34** | 34 | Aix-Marseille → Wallis et Futuna |
| Département | **100** | **108** | Ain → Val-de-Marne |
| Commune | **100** | **3 974** | Abbeville → Anzin-Saint-Aubin |
| Secteur | **2** | 2 (+ 8 lignes `null`) | PRIVE / PUBLIC |

Les 34 académies vues à l'écran : Aix-Marseille, Amiens, Besançon, Bordeaux, Clermont-Ferrand,
Corse, Créteil, Dijon, Grenoble, Guadeloupe, Guyane, La Réunion, Lille, Limoges, Lyon,
Martinique, Mayotte, Montpellier, Nancy-Metz, Nantes, Nice, Normandie, **Nouvelle Calédonie**,
Orléans-Tours, Paris, Poitiers, **Polynésie Française**, Reims, Rennes,
**Saint Pierre et Miquelon**, Strasbourg, Toulouse, Versailles, **Wallis et Futuna**.

**Le plafond de 100 est celui de l'API ODS, vérifié des deux côtés** :
`…/records/1.0/search/?rows=0&facet=departement_nom&facetsort.departement_nom=alphanum` renvoie
100 valeurs, Ain → Val-de-Marne. Les **huit départements manquants** sont donc les huit derniers
dans l'ordre alphanumérique : **Var, Vaucluse, Vendée, Vienne, Vosges, Wallis et Futuna, Yonne,
Yvelines**. Vérifié à l'écran : taper « osges » dans le select Département affiche
« **Aucune option** » ; taper « Seine » ramène bien Hauts-de-Seine, Seine-Maritime,
Seine-Saint-Denis, Seine-et-Marne. Côté Commune, taper « Paris » affiche « **Aucune option** » ;
taper « Anz » ramène Anzin et Anzin-Saint-Aubin, les deux dernières de la liste.

**La cascade fonctionne** (vérifiée à l'écran) : Académie = Corse → le select Département ne
propose plus que **Corse-du-Sud** et **Haute-Corse**. À l'API, le même refine ramène 2
départements et **22 communes** (Ajaccio, Bastia, Biguglia, Bonifacio, Calvi, Cervione…).

**Sélection unique en pratique** : après avoir choisi Aix-Marseille, la liste déroulante ne
contient plus que « Aix-Marseille ⊗ » — on retire, on ne cumule pas, malgré les
`disjunctive.departement_nom` / `disjunctive.commune_nom` du contexte.

**Récapitulatif** sous les selects, en texte brut non stylé : « Académie : Aix-Marseille » puis
« Supprimer tous les filtres ⊗ ». Il n'affiche que `[0]` de chaque tableau de refine.
Le bouton fonctionne : vérifié, retour à « 43 479 » et aux quatre placeholders.

### 4. Ce que la carte fait quand on filtre

- Académie = Corse : le cluster « 43 479 » devient un **picto laptop** (`picto="ods-computer"`)
  **sans compteur**, au même endroit. La carte **ne se recentre pas** (`no-refit="true"`),
  elle reste au zoom 3 sur le Mali. Vérifié deux fois.
- Académie = Aix-Marseille : le cluster affiche « **1 828** ». C'est le nombre de **lignes**
  (4 millésimes) ; l'académie compte **464** établissements distincts.
- Le géocodeur, lui, déplace bien la vue (Ajaccio → échelle 2 km).

### 5. Ce que la carte **ne** fait **pas** : le défaut central

**Les 43 479 lignes du jeu porté par la carte ont toutes exactement la même `position`.**

Preuve la plus courte, l'API le dit elle-même :

```
GET /api/records/1.0/boundingbox/?geofilter.bbox=-90,-180,90,180&dataset=…_par_eple
→ {"count": 43479,
   "bbox": [5.350240208208561, 45.97496537491679, 5.350240208208561, 45.97496537491679],
   "geometries": {"Point": 43479}}
```

L'emprise du jeu entier est **un point**. Confirmé par un export complet
(`/exports/json?select=uai,position&limit=-1`, 43 479 lignes) : **1 seule position distincte**,
`45,97497 / 5,35024`.

Vérifié au navigateur jusqu'au bout :

1. Cliquer le cluster zoome d'un cran. Répété jusqu'au **zoom 19** (échelle 20 m), la pastille
   affiche **toujours « 43 479 »** et ne se disperse jamais.
2. À ce zoom, le fond de carte nomme le lieu : le **Lycée Professionnel Alexandre Bérard**, à
   **Ambérieu-en-Bugey (Ain)** — UAI **0010001W**, la **première ligne du jeu**. Tout le fichier
   a hérité de la position de son premier enregistrement.
3. `document.querySelectorAll('.leaflet-marker-icon').length` = **0** hors géocodeur, à tous les
   zooms et sur tous les filtres essayés.

**Conséquence : le `refine-on-click` ne peut jamais se déclencher.** Le motif maître-détail
annoncé par le titre de la page est, en production, **inatteignable par l'interaction prévue**.
Les trois jeux frères, eux, ont de vraies positions (vérifié sur 100 lignes de chacun :
`..._sans_collecte` 100 positions distinctes sur 100 lignes, `..._mef_code` 94/100,
`..._resultats_de_rentree` 55/100).

### 6. Le tiroir « fiche établissement »

Non atteignable par la carte. Pour le relever, j'ai posé le refine dans le scope Angular
(`ctxN.parameters['refine.uai'] = '0010001W'` sur les six contextes) — c'est le chemin exact
qu'aurait pris le clic. Ce qui suit est le rendu réel du tiroir.

- Tiroir blanc de **500 px** glissé depuis la droite, sur toute la hauteur du bloc.
  À son ouverture, le CSS **masque le panneau de filtres, le bouton FILTRES et le géocodeur**
  (`.map-drawer-container--active .filtres { display:none }`). Backdrop cliquable à gauche.
- **En-tête bleu**, une ligne : `{{etablissement}} - {{commune_nom}}` →
  « Lycée professionnel Alexandre Bérard - Ambérieu-en-Bugey ». **Le texte déborde** : la
  hauteur d'en-tête est figée à 35 px (`--details-header-height`), la deuxième ligne
  (« -en-Bugey ») est coupée par le fond. Croix de fermeture blanche à droite.
- **Bloc d'identité** (5 lignes, libellé gras + valeur, tirées de `ctxetab`) :
  Académie : Lyon · Département : Ain · Commune : Ambérieu-en-Bugey · Secteur : PUBLIC ·
  Code UAI : 0010001W.
- **Quatre blocs annuels**, dans l'ordre `-annee` : **2025, 2024, 2023, 2022**. Longueur totale
  du tiroir : **30 381 caractères**, **12 boutons d'accordéon** (3 × 4 ans).

Contenu d'un bloc annuel (2025, relevé mot pour mot) :

```
Année scolaire 2025
248 participations aux parcours dont 151 ont partagé le résultat.       ← ctx3
192 élèves ont participé aux parcours et 103 ont partagé leurs résultats. ← ctx3
Pas de session de certifications programmée.                            ← ctx4 (valeur 0)
27 sessions de certifications finalisées.                               ← ctx4
265 candidats inscrits à la certification.                              ← ctx4 inscrits
253 élèves inscrits à la certification.                                 ← ctx4 inscrits_distincts
228 participants à la certification.                                    ← ctx4 participants
228 certifications obtenues pour cet établissement.                     ← ctx4 certifies
  [ Détail par niveau scolaire et par palier  ⌄ ]
  [ Détail par profil et par formation        ⌄ ]
  [ Détail par classe                         ⌄ ]
```

(2024 ajoute « 1 certification non obtenue pour cet établissement. » — le `ng-if` sur
`non_obtenues` masque la ligne quand la valeur vaut 0, comme il masque « sessions programmées »
quand elle vaut 0 : **un vrai zéro et une valeur absente sont indiscernables**.)

**Accordéon 1 — « Détail par niveau scolaire et par palier »** (ctx2). 5 entrées pour 2025 :

| Ligne relevée |
|---|
| Niveau : 1ère pro - Palier : 2 — 5 participations, 8 envois par niveau, **168 participants** |
| Niveau : 3ème - Palier : 2 — 8 participations, 9 envois par niveau, **168 participants** |
| Niveau : CAP2 - Palier : 2 — 5 participations, 11 envois par niveau, **168 participants** |
| Niveau : Terminale pro - Palier : 1 — 9 participations, 39 envois par niveau, **168 participants** |
| Niveau : Terminale pro - Palier : 2 — 28 participations, 39 envois par niveau, **168 participants** |

« 168 participants » est répété sur **toutes** les lignes : `total_participants` est un total
d'établissement-année, pas un compte par palier. Le texte déborde de la largeur du tiroir.

**Accordéon 2 — « Détail par profil et par formation »** (ctx1) : **vide**. 0 `<li>` rendu, alors
que l'établissement a **98 lignes** dans `..._mef_code` (profils « [LP] Parcours de rentrée
CAP / 2nde Pro / 1ère Pro / Tle Pro », MEF « 2cap2 métallier », « Tle pro logistique »…).
Le bouton et le chevron s'affichent quand même. Cause observée : la requête
`facet=mef_libelle` **n'est jamais émise** (voir le décompte réseau plus bas), donc la boucle
`ng-repeat="mef_libelle in mef_libelles"` itère sur `undefined`.

**Accordéon 3 — « Détail par classe »** (ctx5) : **19 `<li>`**, soit **toutes les classes des
quatre années**, répétées à l'identique dans chacun des quatre blocs annuels. Le template n'a
pas de `ng-if` sur l'année pour cette boucle (contrairement aux deux autres) :

```
Classe : 1ère pro — 226 élèves importés, 1 inscrit, 1 inscrit distinct, 1 participant, …   ← 2023
Classe : 1ère pro — 149 élèves importés, 48 inscrits, 48 inscrits distincts, 0 participants ← 2022
Classe : 3ème — 92 élèves importés, 24 inscrits, …                                          ← 2023
Classe : 3ème — 53 élèves importés, 25 inscrits, …                                          ← 2024
…
```

Deux entrées « 1ère pro » et quatre « 3ème » dans le bloc « Année scolaire 2025 », sans qu'aucun
millésime ne soit indiqué. **Le lecteur ne peut pas savoir de quelle année vient une ligne.**

- **Pied du tiroir** : `<div class="detail-footer">` **vide**. Pas de lien vers le jeu, pas
  d'export, pas de date de mise à jour.

### 7. Console et réseau

**Aucun message en console** au chargement ni après les interactions (filtre, clic cluster,
ouverture du tiroir, accordéons).

**Chargement de la page — 17 appels API, chronométrés** (`performance.getEntriesByType`,
chargement froid, DOMContentLoaded à 163 ms, `load` à 995 ms) :

| t (ms) | durée | appel |
|---:|---:|---|
| 257–258 | 19–81 ms | 5 × `/api/datasets/1.0/<jeu>/?extrametas=true…` (métadonnées des 5 jeux) |
| 313 | 43 ms | `/records/1.0/search/?rows=10` — ctx3, **non filtré** |
| 348 | 71 ms | `…rows=100&sort=profil_cible` — ctx1, **non filtré** (sur 354 012 lignes) |
| 401 | 63 ms | `…rows=100&sort=niveau_scolaire` — ctx2, **non filtré** |
| 455 | 88 ms | `…rows=1` — ctxetab |
| 456 | 92 ms | `…rows=10&sort=-annee` — ctx4 |
| 456–463 | 53–88 ms | 4 × `…rows=0&facet=<champ>&facetsort.<champ>=alphanum` (les 4 selects) |
| 515 | 78 ms | `…rows=100&sort=classe` — ctx5 |
| **11 413** | 47 ms | `/records/1.0/boundingbox/?geofilter.bbox=…` |
| **11 461** | 43 ms | `/records/1.0/geocluster/?clusterdistance=50&clusterprecision=3&geofilter.bbox=…&return_polygons=true` |

**Durée médiane d'un appel : 63 ms ; maximum : 92 ms.** Toute la plomberie de données est finie
à **593 ms**. Puis **10,8 s de silence** avant que la carte demande ses données : le premier
pixel de donnée n'arrive qu'à **11,5 s**. Ce n'est pas le réseau, c'est l'initialisation du
widget `ods-map`. **Le coût n'est pas le poids, c'est le séquencement.**

Deux remarques de plus :

- **Les six `ods-results` partent non filtrés au chargement**, alors que le tiroir est masqué :
  la fiche est pré-remplie avec un établissement arbitraire (le premier du tri de chaque jeu).
- Sur une navigation avec cache chaud, **la séquence part deux fois** (34 requêtes relevées par
  l'extension pour 17 distinctes).

**Sélection d'un établissement — 39 appels pour une fiche.** Décompte exact
(`performance`, après pose du `refine.uai`) :

| Appel | Nombre |
|---|---:|
| `records rows=1` (ctxetab) | 1 |
| `records rows=100` (ctx1, ctx2, ctx5) | 3 |
| `records rows=10` (ctx3, ctx4) | 2 |
| **`facet=niveau_scolaire` (ctx2), identiques** | **22** |
| **`facet=profil_cible` (ctx1), identiques** | **11** |
| `facet=palier` | **0** |
| `facet=mef_libelle` | **0** |

Les 33 requêtes de facettes sont **la même URL, répétée** : chaque itération des `ng-repeat`
imbriqués instancie une nouvelle directive `ods-facet-results` qui refait son appel. Et les deux
facettes **internes** (`palier`, `mef_libelle`) ne sont jamais demandées — d'où l'accordéon
« profil et formation » vide.

Pour référence, les mêmes données coûtent **5 requêtes** en interrogeant directement les cinq
jeux sur `where uai="0010001W"` : **0,089 s à 0,207 s** chacune, **36 Ko au total**, **58
enregistrements** (4 + 4 + 35 + 11 + 4).

---

## Défauts et bizarreries de l'original

1. **Le jeu de la carte n'a qu'une seule position pour ses 43 479 lignes**
   (45,97497 / 5,35024, la cour du lycée Alexandre Bérard à Ambérieu-en-Bugey, UAI 0010001W —
   la première ligne du fichier). La bounding box du jeu est un point : l'API elle-même le dit.
   **La carte ne localise rien et le clic ne peut jamais isoler un établissement** : la fiche,
   qui est le sujet de la page, est inaccessible par l'interaction prévue. C'est le défaut
   n° 1 et il rend les douze suivants secondaires.
2. **Cadrage initial sur le nord du Mali** (`location="3,18.50166,-3.66683"`, zoom 3, échelle
   1 000 km) : le premier écran montre l'Atlantique et l'Afrique. Cousin du centrage sur la
   Suisse des quatre pages IPS — même famille de bug, autre coordonnée.
3. **`no-refit="true"` : la carte ne se recadre jamais.** Choisir « Corse » ou « Aix-Marseille »
   ne bouge pas la vue d'un pixel. Combiné au défaut n° 2, l'utilisateur filtre à l'aveugle.
4. **Le compteur du cluster compte des lignes, pas des établissements** : « 43 479 » pour
   11 113 UAI, « 1 828 » pour 464 établissements en Aix-Marseille. Rien dans la page ne dit que
   le jeu porte quatre millésimes empilés.
5. **Aucun filtre d'année**, alors que `annee` est une facette déclarée et que la fiche, elle,
   ventile tout par année.
6. **Le select Département perd 8 valeurs sur 108** (Var, Vaucluse, Vendée, Vienne, Vosges,
   Wallis et Futuna, Yonne, Yvelines) et **le select Commune 3 874 sur 3 974** (il s'arrête à
   Anzin-Saint-Aubin). Plafond de 100 valeurs par facette de l'API ODS, en v1 comme en v2.1.
   **Paris, Marseille, Lyon sont inatteignables par le filtre Commune** sans passer d'abord par
   un département — ce que rien n'indique.
7. **`<ods-clear-all-filters>` est mort.** Vérifié dans le DOM : présent, `ng-hide`, `0 × 0`,
   `display:none`. Son `ng-show` teste `ctx1.parameters['q.type_etab']`,
   `refine.themes_projets`, `refine.dep_name`, `refine.libelle_academie`, `q.timerange` —
   **aucun de ces champs n'existe dans les jeux PIX** ; son `except="'refine.type_etablissement'"`
   non plus. Copier-coller d'une autre page. Son libellé (« Tout effacer ») n'a jamais été vu par
   personne. Le bouton qui marche est le « Supprimer tous les filtres » maison, écrit juste
   au-dessus.
8. **L'accordéon « Détail par profil et par formation » est toujours vide** : la facette
   `mef_libelle` n'est jamais chargée. Un bouton et un chevron pour un tiroir sans contenu, sur
   les quatre années.
9. **L'accordéon « Détail par classe » ignore l'année** : les 19 lignes du jeu
   `..._certifications_par_classes` (toutes années confondues) sont répétées dans chacun des
   quatre blocs annuels, sans millésime. Deux « 1ère pro » et quatre « 3ème » sous « Année
   scolaire 2025 ». C'est le seul des trois accordéons dont le `ng-repeat` n'a pas de
   `ng-if` sur `annee`.
10. **`total_participants` est répété à l'identique sur chaque ligne de palier** (« 168
    participants » cinq fois) : c'est un total d'établissement présenté comme un détail.
11. **Trente-trois requêtes de facettes identiques par fiche ouverte**, et deux facettes
    nécessaires jamais demandées. Symptôme direct des `ng-repeat` imbriqués sur
    `ods-facet-results`.
12. **Six `ods-results` non filtrés partent au chargement**, dont deux `rows=100` sur des jeux
    de 354 012 et 334 050 lignes, pour alimenter un tiroir invisible.
13. **Les pluriels sont faux par copier-coller.** Dans l'accordéon palier, le test est
    `detailEtablissement2.total_participation_par_palier.non_obtenues != 1` — une expression qui
    vaut toujours `undefined ≠ 1`, donc « s » systématique. Dans l'accordéon profil, les quatre
    tests portent sur `detailEtablissement2` alors que la boucle itère sur
    `detailEtablissement1`.
14. **Une valeur `0` et une valeur absente sont rendues pareil** (`ng-if` sur la truthiness) :
    « Pas de session de certifications programmée » s'affiche aussi bien pour un vrai 0 que pour
    un champ vide.
15. **Fermeture partielle** : la croix et le backdrop ne vident que `ctxetab.refine.uai` ;
    `ctx1`…`ctx5` restent filtrés sur l'établissement précédent.
16. **Débordements de texte** : en-tête du tiroir coupé en deux (« Lycée professionnel Alexandre
    Bérard - Ambérieu-… »), lignes d'accordéon tronquées à droite (« 168 participan »).
17. **Le géocodeur chevauche le panneau de filtres** : ouvert, il recouvre le H3 « Académie » et
    son select.
18. **Aucun état partageable, aucune source, aucun export.** Pas d'`urlsync`, `detail-footer`
    vide, pas un lien vers les cinq jeux, pas une date de mise à jour, pas de mention des
    quatre scores PIX que le jeu contient.
19. **Double espace dans le titre** (« Cartographie PIX  - fiches établissement ») et titre du
    catalogue au singulier — deux libellés différents pour la même page.
20. **Une valeur « Andorre » dans `departement_nom`** (avec 4 lignes) : le référentiel
    géographique du jeu n'est pas celui de l'INSEE.

---

## Transposition vers `dsfr-data`

Attributs vérifiés dans le code source (`~/Developer/GitHub/dsfr-data`,
`packages/core/src/components/dsfr-data-map-layer.ts`, `…/dsfr-data-facets.ts`,
`…/adapters/opendatasoft-adapter.ts`) et dans
`get_skill(dsfrDataSource|dsfrDataFacets|dsfrDataMap|dsfrDataContext|dsfrDataContextFilter|dsfrDataSearch|dsfrDataDisplay, "reference")`
+ `get_skill(attributeGrammars, "guide")`. Ce qui n'a pas été vérifié est marqué.

> ⚠️ **Piège de méthode payé sur cette page.** La fiche MCP de `dsfr-data-map`
> (`get_skill(dsfrDataMap, "reference")`) **ne liste pas** `refine-on-click`, `context` ni
> `label` sur `dsfr-data-map-layer`, et pas l'événement `dsfr-data-map-select`. J'ai failli
> écrire « pas d'équivalent au `refine-on-click-context` d'ODS ». Les trois attributs existent,
> sont documentés dans le JSDoc du source (#681, ADR-104), dans
> `skills/dsfr-data/references/dsfr-data-map.md` et dans `docs/USER-GUIDE.md` sous le titre
> « **Recette annuaire : la carte filtre la liste** ». **Lire le source, pas seulement la fiche
> générée.**

### Comment la sélection se propage, des deux côtés

| | Opendatasoft | `dsfr-data` |
|---|---|---|
| Déclaration | 18 attributs `refine-on-click-ctxN-*` sur `ods-map-layer` | `refine-on-click="uai" context="fiche" label="Établissement"` — **3 attributs** |
| Diffusion | chaque contexte reçoit `refine.uai` dans son propre dialecte v1 | `dsfr-data-context sources="…"` diffuse une clause `eq` **au dialecte de chaque source** |
| Cibles | listées sur la couche | listées sur le **contexte** (`sources`) — la couche n'a pas d'`apply-to` |
| Carte non filtrée par le clic | `ctxmap` absent de la liste | la source de la carte n'est **pas** dans `sources` du contexte (piège documenté à l'identique) |
| Retrait | croix + backdrop `= undefined` (partiel, bug n° 15) | second clic sur le même objet, ou croix du tag `dsfr-data-context-tags` — **un seul chemin**, `clear()` |
| Partage d'URL | aucun | `url-sync` sur le contexte |
| Ouverture du tiroir | classe CSS conditionnée au paramètre | `dsfr-data-map-popup mode="panel-right"` (natif) **ou** un `dsfr-data-display` masqué en CSS |

### Tableau de correspondance

| Original Opendatasoft | `dsfr-data` | Attributs nécessaires |
|---|---|---|
| `ods-dataset-context` à 7 branches | **6 `<dsfr-data-source>`** (1 carte + 5 détail) | `api-type="opendatasoft"`, `base-url="https://data.education.gouv.fr"`, `dataset-id`. **Pas d'`api-key-ref`** : le portail répond en anonyme (vérifié en curl, 200). |
| `ctxmap` (la carte) | source **générique** `<dsfr-data-source url="…/exports/json" params="…" >` | `url` + `params` sur `/exports/json` : **une requête, 0,75 s** au lieu de 104 requêtes en série (voir « Limites », point 1). |
| `ods-map location="3,18.5,-3.67" no-refit="true"` | `<dsfr-data-map>` | `center="46.6,2.3"`, `zoom="6"`, `height="600px"`, `tiles="ign-plan"`, `tiles-style="muted"`, `fit-bounds`, `fit-max-zoom="13"`, `insets="drom,saint-pierre-et-miquelon"`, `name`. Le `no-refit` de l'original **ne se transpose pas et n'a pas à l'être** : c'est le défaut n° 3. |
| `ods-map-layer` épingles bleues uniformes | `<dsfr-data-map-layer>` | `type="circle"`, `geo-field="position"`, `radius-field="total_partipants"`, `radius-min`/`radius-max`, `cluster`, `cluster-radius`, `max-items="20000"` (**défaut 5 000 < 10 385**), `tooltip-field="etablissement"`. La taille variable rend enfin une donnée visible, ce que l'original ne fait pas. |
| `refine-on-click-context="[ctx1..ctx5,ctxetab]"` × 18 attributs | **même balise** | `refine-on-click="uai"`, `context="fiche"`, `label="Établissement"`. |
| `map-drawer-container--active` + tiroir CSS de 13 345 car. | `<dsfr-data-context id="fiche" sources="…" url-sync>` + `<dsfr-data-context-tags for="fiche">` | Le tiroir est un `dsfr-data-map-popup mode="panel-right" width="500px"` ; les blocs annuels sont des `dsfr-data-display` en dehors de la carte. Le CSS maison disparaît. |
| 4 × `ods-facet-results` + `ods-select` sur `ctxmap` | **un** `<dsfr-data-facets>` | `server-facets`, `fields="annee, academie_nom, departement_nom, commune_nom, secteur"` (**virgules**), `labels="…"` (**barres**), `display="annee:select \| academie_nom:select \| departement_nom:select \| commune_nom:radio \| secteur:select"` (**barres**), `sort="alpha:asc"`. `radio` = liste déroulante **avec recherche** (pas des boutons radio, PG-023). **Cascade native** en `server-facets` (vérifiée à l'API : refine Corse → 2 départements, 22 communes). |
| Le select Commune plafonné à 100 | `<dsfr-data-search server-search count>` en complément | `fields="etablissement, commune_nom"`, `search-template` lu de l'adapter ODS. C'est la seule voie qui ne bute pas sur le plafond de 100 (voir « Limites », point 3). |
| Boucles `ng-repeat` × `ng-if` pour joindre par `annee` | `<dsfr-data-display>` + `<template>` | `source`, `uid-field="annee"`, `cols="1"`, `empty`. Un `dsfr-data-display` **par jeu de détail**, chacun sur sa propre source déjà filtrée par le contexte : **pas de jointure à écrire**. Interpolation `{{champ\|défaut}}`, `{{champ:number}}`. |
| Jointure `ctx3 × ctx4` sur `annee` dans le template | `<dsfr-data-join>` | `on="annee"` — si l'on tient à un bloc annuel unique fusionnant participations (ctx3) et certifications (ctx4). Clés converties en chaîne des deux côtés (FP-012), `annee` est du texte partout : appariement sûr. |
| `ng-if="detailEtablissement4.fields.non_obtenues"` | — | **Pas de conditionnelle dans un template** (AM-039). Interpoler la valeur dans un attribut et masquer en CSS : `<p class="odv-si" data-v="{{non_obtenues}}">` + `.odv-si[data-v=""], .odv-si[data-v="0"] { display:none }`. Voir le bloc « Annuaires » de `site.css`. |
| Compteur du cluster « 43 479 » | `<dsfr-data-kpi>` × 3 | Sur une source d'agrégat dédiée : nombre d'établissements (`group_by=uai` compté), participations, certifications. **Pas `count`** sur une source paginée (PG-017, JSDoc `value` #659). |
| — (absent) | `<dsfr-data-a11y>` | `table`, `download`, `filename`, `for` : le tableau accessible et l'export CSV que l'original n'a pas. |
| — (absent) | `<dsfr-data-map-legend>` | `label="Élèves participants"` — la légende que l'original désactive (`display-legend="false"`) faute d'encoder quoi que ce soit. |

### Le changement de jeu, qui n'est pas un détail

`fr-en-pix_certification_pix_inscription_et_passation_par_eple` **ne peut pas porter la carte** :
une seule position pour 43 479 lignes. La transposition fidèle « aux données » consiste donc à
**changer de jeu pour la couche** et à garder `..._par_eple` pour le détail :

| Candidat | Lignes (2025) | Positions | Verdict |
|---|---:|---|---|
| `..._sans_collecte_de_profil` | **10 385** | 9 798 distinctes, **54 sans position** | ✅ retenu |
| `..._resultats_des_campagnes_de_rentree_par_eple` | ~83 500 | vraies, mais N lignes par UAI | trop redondant |
| `..._par_profil_cible_et_mef_code` | ~88 500 | vraies, 4 % de nulls | trop redondant |

Retenu : `..._sans_collecte_de_profil`, `where annee="2025"` → **10 385 lignes**, dont
**369 hors métropole** (La Réunion 134, Martinique 78, Guadeloupe 74, Guyane 52, Mayotte 29,
Saint-Pierre-et-Miquelon 2) et **54 sans position, dont les 51 lignes de toute la Polynésie
Française** — à dire dans la page.

### Esquisse de code

```html
<!-- ── LA CARTE ────────────────────────────────────────────────────────────
     Source GENERIQUE sur /exports/json : 10 385 lignes en UNE requete (0,75 s
     mesure) au lieu de 104 requetes en serie de l'adaptateur ODS (13,1 s
     extrapoles, et un 400 a offset 10 000). Sa contrepartie : ni server-side,
     ni server-facets sur CETTE source — d'ou la source ODS separee ci-dessous
     pour les facettes. -->
<dsfr-data-source id="carte"
  url="https://data.education.gouv.fr/api/explore/v2.1/catalog/datasets/fr-en-pix_participations_aux_campagnes_par_etablissement_sans_collecte_de_profil/exports/json"
  params='{"limit":"-1","where":"annee = \"2025\" and position is not null",
           "select":"uai,etablissement,commune_nom,departement_nom,academie_nom,secteur,total_participations,total_partipants,position"}'>
</dsfr-data-source>

<!-- Source ODS jumelle, uniquement pour les facettes serveur et leur cascade -->
<dsfr-data-source id="facettes-src" api-type="opendatasoft"
  base-url="https://data.education.gouv.fr"
  dataset-id="fr-en-pix_participations_aux_campagnes_par_etablissement_sans_collecte_de_profil"
  where="annee = '2025'" server-side page-size="20">
</dsfr-data-source>

<!-- ── LES CINQ SOURCES DE DETAIL ──────────────────────────────────────────
     Aucune ne charge quoi que ce soit d'utile tant qu'aucun uai n'est choisi :
     limit="1" les tient au minimum (l'original tire 100 lignes sur 354 012). -->
<dsfr-data-source id="d-eple"     api-type="opendatasoft" base-url="https://data.education.gouv.fr"
  dataset-id="fr-en-pix_certification_pix_inscription_et_passation_par_eple" order-by="-annee" limit="1"></dsfr-data-source>
<dsfr-data-source id="d-parcours" api-type="opendatasoft" base-url="https://data.education.gouv.fr"
  dataset-id="fr-en-pix_participations_aux_campagnes_par_etablissement_sans_collecte_de_profil" order-by="-annee" limit="1"></dsfr-data-source>
<dsfr-data-source id="d-palier"   api-type="opendatasoft" base-url="https://data.education.gouv.fr"
  dataset-id="fr-en-pix_resultats_des_campagnes_de_rentree_par_eple" order-by="-annee,niveau_scolaire,palier" limit="1"></dsfr-data-source>
<dsfr-data-source id="d-profil"   api-type="opendatasoft" base-url="https://data.education.gouv.fr"
  dataset-id="fr-en-pix_participations_aux_campagnes_par_profil_cible_et_mef_code" order-by="-annee,profil_cible" limit="1"></dsfr-data-source>
<dsfr-data-source id="d-classe"   api-type="opendatasoft" base-url="https://data.education.gouv.fr"
  dataset-id="fr-en-pix_certifications_par_classes" order-by="-annee,classe" limit="1"></dsfr-data-source>

<!-- ── LE CONTEXTE : ce qui remplace les 18 attributs refine-on-click-* ──────
     "carte" et "facettes-src" ne sont PAS dans sources : la carte garde tous
     ses points au clic (meme piege que le ctxmap absent de la liste ODS). -->
<dsfr-data-context id="fiche" sources="d-eple d-parcours d-palier d-profil d-classe" url-sync>
</dsfr-data-context>

<div class="fr-container fr-mt-6w">
  <h1>Certifications et parcours PIX, établissement par établissement</h1>
  <p class="fr-text--lead">
    10 385 établissements ont fait passer des parcours PIX en 2024-2025.
    Choisissez-en un sur la carte ou par la recherche pour voir sa fiche :
    participations, sessions de certification, détail par niveau, par formation
    et par classe, de 2022 à 2025.
  </p>
  <p class="fr-text--sm">
    54 établissements ne sont pas localisables faute de coordonnées, dont
    les 51 établissements de Polynésie française.
  </p>

  <div class="fr-grid-row fr-grid-row--gutters">
    <div class="fr-col-12 fr-col-md-3">
      <dsfr-data-search id="q" source="facettes-src" server-search count
        fields="etablissement, commune_nom"
        label="Rechercher un établissement ou une commune"></dsfr-data-search>

      <dsfr-data-facets id="f" source="q" server-facets
        fields="academie_nom, departement_nom, commune_nom, secteur"
        labels="academie_nom:Académie | departement_nom:Département | commune_nom:Commune | secteur:Secteur"
        display="academie_nom:select | departement_nom:select | commune_nom:radio | secteur:select"
        sort="alpha:asc"></dsfr-data-facets>
    </div>

    <div class="fr-col-12 fr-col-md-9">
      <dsfr-data-context-tags for="fiche"></dsfr-data-context-tags>

      <dsfr-data-map id="carte-pix" name="Établissements ayant fait passer des parcours PIX en 2024-2025"
        center="46.6,2.3" zoom="6" height="600px"
        tiles="ign-plan" tiles-style="muted"
        fit-bounds fit-max-zoom="13"
        insets="drom,saint-pierre-et-miquelon">
        <dsfr-data-map-layer source="carte" type="circle" geo-field="position"
          radius-field="total_partipants" radius-min="4" radius-max="18"
          cluster max-items="20000"
          tooltip-field="etablissement"
          refine-on-click="uai" context="fiche" label="Établissement">
        </dsfr-data-map-layer>
        <dsfr-data-map-legend for="carte-pix" label="Élèves ayant participé à un parcours"></dsfr-data-map-legend>
      </dsfr-data-map>

      <!-- ── LA FICHE : cinq blocs, cinq sources, zero jointure ecrite ─────── -->
      <section class="odv-fiche" aria-live="polite">
        <dsfr-data-display source="d-eple" cols="1" uid-field="annee" empty="">
          <template>
            <h2 class="fr-h4">{{etablissement}} — {{commune_nom}}</h2>
            <p class="fr-text--sm">Académie de {{academie_nom}} · {{departement_nom}} ·
               {{secteur|secteur non renseigné}} · UAI {{uai}}</p>
            <h3 class="fr-h6">Année scolaire {{annee}}</h3>
            <ul class="fr-text--sm">
              <li>{{sessions_finalisees:number}} session(s) de certification finalisée(s),
                  {{sessions_programmees:number}} programmée(s)</li>
              <li>{{inscrits_distincts:number}} élèves inscrits à la certification,
                  {{participants:number}} y ont participé</li>
              <li>{{certifies:number}} certifications obtenues,
                  {{non_obtenues:number}} non obtenues</li>
              <li>Score PIX médian&nbsp;: {{median_pix_score:number}}
                  (Q1 {{first_quartile_pix_score:number}} — Q3 {{third_quartile_pix_score:number}})</li>
            </ul>
          </template>
        </dsfr-data-display>

        <details class="fr-accordion">
          <summary class="fr-accordion__btn">Détail par niveau scolaire et par palier</summary>
          <dsfr-data-display source="d-palier" cols="1" empty="Aucun résultat de campagne de rentrée.">
            <template>
              <p class="fr-text--sm fr-mb-1v">
                <strong>{{annee}}</strong> · {{niveau_scolaire}}, palier {{palier}} —
                {{total_participation_par_palier:number}} participations,
                {{total_envoi_par_niveau:number}} envois par niveau
              </p>
            </template>
          </dsfr-data-display>
        </details>

        <details class="fr-accordion">
          <summary class="fr-accordion__btn">Détail par profil et par formation</summary>
          <dsfr-data-display source="d-profil" cols="1" empty="Aucun parcours par profil cible.">
            <template>
              <p class="fr-text--sm fr-mb-1v">
                <strong>{{annee}}</strong> · {{profil_cible}} — {{mef_libelle|formation non renseignée}} :
                {{total_participations:number}} participations,
                {{total_partipants:number}} participants
              </p>
            </template>
          </dsfr-data-display>
        </details>

        <details class="fr-accordion">
          <summary class="fr-accordion__btn">Détail par classe</summary>
          <dsfr-data-display source="d-classe" cols="1" empty="Aucune certification par classe.">
            <template>
              <p class="fr-text--sm fr-mb-1v">
                <strong>{{annee}}</strong> · {{classe}} —
                {{nombre_eleves_importes:number}} élèves importés,
                {{inscrits_distincts:number}} inscrits, {{participants_dictincts:number}} participants
              </p>
            </template>
          </dsfr-data-display>
        </details>

        <dsfr-data-a11y source="d-eple" for="carte-pix" table download
          filename="pix-etablissement.csv" label="Données de la fiche"></dsfr-data-a11y>
      </section>
    </div>
  </div>
</div>
```

Chaque `dsfr-data-display` affiche **son millésime dans son propre libellé** : le bug n° 9
(classes de toutes les années sous « Année scolaire 2025 ») disparaît parce qu'il n'y a plus de
boucle imbriquée à synchroniser — c'est une conséquence de l'architecture, pas une correction.

---

## Limites et points durs identifiés

1. **Charger 10 385 points : l'adaptateur ODS ne peut pas, la source générique le fait en
   0,75 s.** *Obstacle* : `fetchAll` de l'adaptateur ODS pagine à **100 records par requête**
   (`ODS_PAGE_SIZE = 100`, source), **en série**.
   *Mesuré* : 20 requêtes `/records?limit=100` consécutives sur ce jeu = **2,52 s**, soit
   **126 ms par requête** → **104 pages pour 10 385 lignes ≈ 13,1 s**.
   *Bloquant* : **l'API v2.1 refuse `offset + limit > 10 000`** — vérifié,
   `offset=9900` → 200, `offset=10000` → **400 `InvalidRESTParameterError`**. Un
   `max-records="12000"` ne suffirait donc pas : l'adaptateur **planterait à la page 101**.
   Au-delà de 10 000 lignes, `server-side` ne peut pas non plus paginer jusqu'au bout.
   *Voie native retenue* : source générique `url` + `params` sur `/exports/json`, **une seule
   requête**. Mesures : 10 385 lignes / 9 champs = **0,75 s, 3,05 Mo** ; les 4 années
   (41 422 lignes, 7 champs) = **2,79 s** ; le jeu de la carte d'origine en entier
   (43 479 lignes, 26 champs) = **3,24 s, 33 Mo** — et avec un `select` de 6 champs, **3,07 s,
   9,0 Mo**, ce qui confirme le piège maison « `select` sur un champ texte long » : le gain de
   poids est réel (33 → 9 Mo) mais le temps ne bouge pas.
   *Contrepartie assumée* : la source générique perd `server-side`, `server-facets` et
   `server-search`. D'où les **deux sources sur le même jeu** de l'esquisse — la carte lit
   l'export, les facettes lisent l'adaptateur ODS. C'est un coût de deux balises, pas une limite.
   **Non vérifié au navigateur** : le rendu de 10 385 cercles clusterisés.

2. **`max-items` (5 000 par défaut) et `max-records` (1 000 par défaut).** Les deux pièges
   maison s'appliquent : 10 385 > 5 000 → bandeau « zoomez » qui ne charge rien de plus (PG-013),
   et 10 385 > 1 000 → troncature **silencieuse** si l'on passait par l'adaptateur. Voie native :
   `max-items="20000"` + `cluster` (la référence dit explicitement que 20 000 est sans risque
   avec `cluster`, les marqueurs regroupés ne pesant pas sur le DOM). `max-records` devient sans
   objet en source générique. **Non vérifié au navigateur.**

3. **Le plafond de 100 valeurs par facette n'est pas une limite de `dsfr-data`.**
   *Obstacle* : le select Commune de l'original s'arrête à Anzin-Saint-Aubin.
   *Voie native essayée* : `server-facets` — l'adaptateur ODS appelle
   `/api/explore/v2.1/catalog/datasets/<id>/facets?facet=…&where=…`
   (`opendatasoft-adapter.ts`, `fetchFacets`). Interrogé directement, **cet endpoint plafonne
   lui aussi à 100** : `departement_nom` 100 valeurs (Ain → Val-de-Marne), `commune_nom` 100
   (Abbeville → Anzin-Saint-Aubin). **Le plafond est celui d'ODS, identique en v1 et en v2.1** ;
   `dsfr-data` ne fait ni mieux ni moins bien.
   *Deuxième voie essayée* : `searchable="commune_nom"`. Lu dans le source
   (`dsfr-data-facets.ts` l. 1962) : le filtre est **client**, sur les valeurs déjà chargées —
   donc sur les 100 reçues. **Ça ne débloque rien**, et c'est important de ne pas le promettre.
   *Ce qui marche, mesuré* : **la cascade `server-facets`**. `/facets` reçoit le `where` courant,
   donc choisir un département réduit la liste des communes côté serveur. Portée exacte :
   **2 départements sur 108 dépassent 100 communes** (Nord 139, Pas-de-Calais 102) ; en
   revanche **20 académies sur 34** les dépassent. Donc : cascade Académie → Département →
   Commune, et il reste **deux départements** où la liste des communes est tronquée.
   *Ce qui règle le cas restant* : `dsfr-data-search server-search` sur `etablissement` /
   `commune_nom` — une recherche plein texte serveur n'a pas de plafond de facette. C'est le
   sélecteur maître honnête, et il remplace en même temps le géocodeur d'ODS (dont
   `dsfr-data-map` n'a pas d'équivalent).
   **Non vérifié au navigateur** : le rendu du select `radio` sur 100 communes.

4. **La carte comme sélecteur : équivalence complète, à un attribut près.**
   Ce n'est **pas** une limite — c'est le point où j'ai failli en inventer une. `refine-on-click`
   + `context` couvre le `refine-on-click-context` d'ODS, avec en plus le tag supprimable et
   l'URL partageable. Deux écarts réels :
   - **Le retrait est un second clic** sur le même objet (ou la croix du tag), là où ODS a une
     croix et un backdrop dédiés. Sur une carte à 10 385 points clusterisés, retrouver l'objet
     déjà cliqué n'est pas immédiat : la croix du tag est le chemin praticable, et il faut donc
     poser `dsfr-data-context-tags`. **Non vérifié au navigateur.**
   - **Il n'y a pas d'attribut « champ de la couche ≠ champ de la source cible »** (l'équivalent
     de `…-map-field` / `…-context-field` distincts d'ODS). Ici sans conséquence : le champ
     s'appelle `uai` dans les cinq jeux. Sur des jeux aux noms de clé différents, il faudrait un
     `rename` de `dsfr-data-normalize` en amont. **Non vérifié.**

5. **Le tiroir : `panel-right` natif ou `dsfr-data-display` hors carte ?**
   *Obstacle* : la fiche d'origine fait 30 000 caractères et agrège **cinq** jeux ;
   `dsfr-data-map-popup` ne connaît que **le record cliqué de sa couche**.
   *Voie native* : le popup `mode="panel-right"` sert la carte d'identité (le record cliqué) ;
   les quatre blocs de détail vivent **hors de la carte**, alimentés par les quatre sources que
   le contexte a filtrées. C'est exactement la « recette annuaire » du guide, avec cinq listes
   au lieu d'une. Prix à payer : la fiche n'est plus *dans* la carte mais à côté — meilleur pour
   la lecture et l'accessibilité, différent visuellement de l'original. **Écart assumé.**
   Si l'on tient au tiroir superposé, c'est du CSS de page (`position:sticky` + `transform`),
   pas un composant : l'original y consacre 13 345 caractères de CSS, on n'en refera pas autant.

6. **`fit-bounds` + `insets` : le clip sur la métropole.** Le jeu retenu a **369 points
   ultramarins** (Réunion, Antilles, Guyane, Mayotte, Saint-Pierre-et-Miquelon), donc des encarts
   sont justifiés — et `dsfr-data-map-inset` a bien les `territory` correspondants.
   Mais le JSDoc de `fit-zone` est explicite : **dès qu'un encart ultramarin est présent, le fit
   est clippé sur la métropole** (`41,-5.5,51.5,10`). Filtrer sur « Guadeloupe » donnerait donc
   un fit sur une intersection vide — variante de BUG-004. *Voie native* : `fit-zone="none"`, au
   prix d'un dézoom mondial quand les DROM sont dans la sélection. **Non tranché, à vérifier au
   navigateur** : c'est le point le plus susceptible de mordre. Note : la **Polynésie n'a pas de
   position du tout** dans ce jeu (51 lignes sur 51), donc pas d'encart Polynésie à poser ;
   la **Nouvelle-Calédonie est absente** du jeu en 2025 (32 académies contre 34 sur `..._eple`).

7. **Compter des établissements, pas des lignes.** L'original affiche « 43 479 ».
   *Obstacle* : `count(distinct uai)` d'ODS v2.1 est **approximatif** — mesuré **11 406** contre
   **11 113** groupes réels sur `..._par_eple`, et **10 781** contre **10 385** lignes sur
   `..._sans_collecte` en 2025. *Voie native* (piège maison déjà payé) : intercaler un
   `dsfr-data-query group-by="uai"` et compter ses lignes avec un KPI `value="count"` — jamais
   `count(distinct …)`. Et **pas de `count` sur une source paginée** (PG-017).
   `group_by` sur `position` est par ailleurs **refusé par l'API**
   (« Aggregation on geo point field is not possible. Use the geo_cluster(position,
   int_precision) aggregation function instead ») : on ne peut pas dédoublonner un point par UAI
   côté serveur en une requête. **Contournement retenu** : filtrer une année
   (`where annee = "2025"`), qui donne une ligne par établissement dans `..._sans_collecte`.
   Ce contournement **cesse de marcher** sur `..._resultats_de_rentree` et `..._mef_code`, qui
   ont plusieurs lignes par établissement et par année.

8. **`geo_cluster` : ODS l'a, `dsfr-data` ne l'expose pas — et n'en a pas besoin ici.**
   L'original délègue le regroupement au serveur (`/api/records/1.0/geocluster/`, **43 ms**).
   `dsfr-data` n'a pas d'attribut pour l'agrégat ODSQL `geo_cluster(position, precision)` ;
   testé en `select`, l'API le refuse (`ODSQLSyntaxError`), il n'est accepté qu'en `group_by`.
   Ce n'est **pas** une limite au sens du dépôt : le clustering de `dsfr-data-map-layer` est
   **client** (`cluster` + `cluster-radius`), ce qui est le bon choix à 10 385 points chargés en
   une requête de 0,75 s. Le clustering serveur ne redeviendrait nécessaire qu'au-delà de
   ~100 000 points — sur `..._resultats_de_rentree` (334 050 lignes) par exemple, où il faudrait
   alors `bbox` (dont le JSDoc prévient que **le tout premier fetch reste non filtré**, donc
   `where` ou `limit` obligatoire sur la source). **Non testé.**

9. **Ce qui ne se transpose pas, et n'a pas à l'être.**
   - Le **géocodeur** « Rechercher un lieu » : aucun attribut de géocodage dans
     `dsfr-data-map`. Substitut : `dsfr-data-search server-search` sur `commune_nom` /
     `etablissement`, qui cherche **dans les données** plutôt que dans un référentiel externe —
     ce que l'utilisateur veut ici. **Écart assumé, pas un manque.**
   - `no-refit="true"`, le cadrage sur le Mali, le `display-legend="false"` : ce sont les
     défauts 2, 3 et le n° 18. Les reproduire serait un contresens.
   - Les **18 attributs `refine-on-click-*`** : 3 suffisent.
   - Les **13 345 caractères de CSS** du tiroir : remplacés par un composant et une grille DSFR.

10. **Point dur d'énoncé, pas de technique : la page ne peut pas être « reproduite ».**
    Son interaction centrale ne fonctionne pas en production (défaut n° 1). Une reproduction
    fidèle produirait une carte à un seul point et une fiche inatteignable. La transposition
    utile **change le jeu de la couche** et **ajoute ce que les jeux contiennent déjà** :
    un filtre d'année, un encodage de la taille par nombre de participants, les quatre scores
    PIX (moyenne, médiane, Q1, Q3) que la page ignore, un total honnête en établissements, un
    export CSV et une URL partageable.

---

## Données à reproduire fidèlement

- [ ] **Le motif** : un sélecteur maître (carte + recherche + facettes) et une fiche détail
      adressée par **`uai`**, alimentée par **cinq jeux distincts**.
- [ ] Les **5 blocs** de la fiche, dans l'ordre de l'original : identité (académie, département,
      commune, secteur, UAI) ; par année, participations aux parcours (`..._sans_collecte`) et
      certifications (`..._par_eple`) ; puis niveau/palier, profil/formation, classe.
- [ ] Les **4 années 2022 → 2025**, du plus récent au plus ancien.
- [ ] **Fiche de référence — UAI `0010001W`**, Lycée professionnel Alexandre Bérard,
      Ambérieu-en-Bugey, Ain, académie de Lyon, PUBLIC. 2025 : **248** participations dont
      **151** partagées, **192** élèves dont **103** ont partagé ; **0** session programmée,
      **27** finalisées ; **265** inscrits, **253** inscrits distincts, **228** participants,
      **228** certifiés, **0** non obtenue. 2024 : 328/149, 322/148, 19 sessions finalisées,
      258/256/256/255/**1**. Détail : 4 lignes ctx4, 4 ctx3, **35** ctx2, **98** ctx1,
      **19** ctx5.
- [ ] **Filtre Académie : 34 valeurs**, y compris Nouvelle Calédonie, Polynésie Française,
      Wallis et Futuna, Saint Pierre et Miquelon.
- [ ] **Filtre Département : 108 valeurs — et non 100.** Var, Vaucluse, Vendée, Vienne, Vosges,
      Wallis et Futuna, Yonne, Yvelines doivent être atteignables. C'est le test de fidélité qui
      distingue une reproduction d'un décalque.
- [ ] **Filtre Commune : 3 974 valeurs — et non 100.** Paris, Marseille, Lyon doivent être
      atteignables sans passer par un département.
- [ ] **Filtre Secteur : PUBLIC 31 735 / PRIVE 11 736** (+ 8 lignes sans secteur).
- [ ] **Cascade** : Académie = Corse → 2 départements (Corse-du-Sud, Haute-Corse) et
      22 communes.
- [ ] **Un compteur d'établissements, pas de lignes** : 11 113 UAI distincts sur `..._par_eple`
      (et non 43 479, ni le 11 406 approximatif de `count(distinct)`).
      Aix-Marseille : **464** établissements, **1 828** lignes.
- [ ] **Une carte qui localise** : 10 385 établissements en 2025 sur
      `..._sans_collecte_de_profil`, dont **369 hors métropole** (Réunion 134, Martinique 78,
      Guadeloupe 74, Guyane 52, Mayotte 29, Saint-Pierre-et-Miquelon 2) et **54 sans position,
      dont les 51 de Polynésie française** — chiffre à afficher dans la page.
- [ ] **Cadrage initial sur la France**, pas sur le Mali ; recadrage au filtre.
- [ ] Le **filtre d'année** que l'original n'a pas, et l'**URL partageable** qu'il n'a pas.

---

## Constats à porter au registre (`public/data/retours.json`)

Proposés, à fusionner avec l'existant avant création (règle « fusionner avant d'ajouter ») :

| Type | Constat | `verifie` |
|---|---|---|
| `faux-probleme` | « Pas d'équivalent au `refine-on-click-context` d'ODS » — faux : `refine-on-click` + `context` + `label` sur `dsfr-data-map-layer` (#681, ADR-104) font le travail avec 3 attributs au lieu de 18, et ajoutent tag et URL. | Les attributs sont absents de `get_skill(dsfrDataMap,"reference")` mais présents dans le JSDoc source (`dsfr-data-map-layer.ts` l. 188-225) et dans `docs/USER-GUIDE.md` § « Recette annuaire ». |
| `amelioration` | La fiche MCP `dsfrDataMap/reference` est en retard sur le source : ni `refine-on-click`, ni `context`, ni `label`, ni l'événement `dsfr-data-map-select`. | Comparaison ligne à ligne entre la sortie de `get_skill` et `packages/core/src/components/dsfr-data-map-layer.ts`. |
| `limite-dure` | ODS v2.1 refuse `offset + limit > 10 000` : le `fetchAll` de l'adaptateur (100 records/page) ne peut pas dépasser 10 000 lignes, quel que soit `max-records`, et `server-side` ne pagine pas au-delà. | `offset=9900` → 200 ; `offset=10000` → 400 `InvalidRESTParameterError` sur `fr-en-pix_certification_pix_inscription_et_passation_par_eple`. |
| `piege` | `searchable` de `dsfr-data-facets` filtre **côté client** les valeurs déjà chargées : avec `server-facets`, il cherche dans les 100 valeurs renvoyées par ODS, pas dans les 3 974 du jeu. | `dsfr-data-facets.ts` l. 1962-1970 ; `/api/explore/v2.1/…/facets?facet=commune_nom` renvoie 100 valeurs (Abbeville → Anzin-Saint-Aubin) sur 3 974. |
| `piege` | `count(distinct champ)` d'ODS v2.1 est **approximatif** : 11 406 contre 11 113 groupes réels. Compter par `group_by` + `value="count"`. | `count(distinct uai)` = 11 406 ; `group_by=uai&limit=-1` = 11 113 groupes. Idem 10 781 vs 10 385 sur `..._sans_collecte` 2025. |
| `piege` | `group_by` sur un champ `geo_point_2d` est refusé par ODS : on ne peut pas dédoublonner un point par entité côté serveur. | `group_by=uai,etablissement,position` → 400 « Aggregation on geo point field is not possible. Use the geo_cluster(position, int_precision) aggregation function instead ». |
| `avantage` | Pour un maître-détail multi-sources, `dsfr-data-context` + `refine-on-click` remplace 18 attributs ODS par 3, diffuse au dialecte de chaque source, et ajoute gratuitement le tag supprimable et l'URL partageable — que l'original n'a pas. | Template ODS (18 attributs, `_sources/carto-pix-fiche-etablissement.html` l. 14) vs `docs/USER-GUIDE.md` § « Recette annuaire ». |
| `avantage` | Une source générique sur `/exports/json` charge 10 385 lignes en **1 requête / 0,75 s**, là où l'adaptateur ODS en ferait **104 en série (≈ 13,1 s)** — et échouerait à la 101ᵉ. | Chronométrage : 20 × `/records?limit=100` = 2,52 s (126 ms/req) ; `/exports/json?limit=-1&select=…` = 0,75 s / 3,05 Mo. |
| `bug` (portail, pas `dsfr-data`) | `fr-en-pix_certification_pix_inscription_et_passation_par_eple` a **une seule position pour ses 43 479 lignes** : la carte de la page id 28 ne localise rien et son `refine-on-click` ne peut jamais se déclencher. | `/api/records/1.0/boundingbox/` renvoie une bbox dégénérée `[5.35024, 45.97497, 5.35024, 45.97497]` pour `count: 43479` ; export complet → 1 position distincte ; au navigateur, cluster « 43 479 » jusqu'au zoom 19 sur le Lycée Alexandre Bérard, 0 marqueur. |
