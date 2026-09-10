# Ted-i — robots de téléprésence pour élèves hospitalisés

- **URL** : https://data.education.gouv.fr/explore/assets/visualisation-fr-en-deploiemement_tedi/view/
  (testé `curl -sIL` : **200 direct, aucune redirection**).
- **Id catalogue** : 25 · **Thématique** : Éducation · Producteur : **DNE — Ministère de l'Éducation Nationale**.
- **Jeu** : `fr-en-deploiemement_tedi` — **3 734 lignes**, **9 champs**, Licence Ouverte v2.0 (Etalab),
  `update_frequency: DAILY` (`modified` relevé : 2026-09-10T06:00:08Z), features `timeserie, geo, analyze,
  custom_view`. API **ouverte sans clé** (vérifié : `/records`, `/exports/json` répondent 200 en anonyme).
- **Relevé visuel** : 2026-09-10, Chrome (extension), fenêtre 1440 × 690 CSS px.

## ⚠️ Ce n'est PAS une page Studio

`GET /api/portal/v1.0/studio_pages/visualisation-fr-en-deploiemement_tedi` → **`{"message":"Pas trouvé.",
"error_code":"not_found"}`**, et le slug n'apparaît pas dans la liste des 23 pages Studio du portail
(`/api/portal/v1.0/studio_pages/?limit=100`).

C'est une **« custom view » AngularJS**, la génération *précédente* : le jeu porte la feature `custom_view`
et sa description contient le crosslink `<div class="ods-asset-customview-crosslink">` vers l'actif
`/explore/assets/visualisation-fr-en-deploiemement_tedi/`. Le template se récupère **exactement comme une
page `/pages/<slug>/`** :

```bash
curl -sL --compressed "https://data.education.gouv.fr/explore/assets/visualisation-fr-en-deploiemement_tedi/view/" \
  | grep -o '\$scope.blocks = .*' | head -1
```

→ JSON `{html, css}` désechappé dans **`docs/portail-education/_sources/visualisation-fr-en-deploiemement_tedi.html`**
(20 746 caractères) et **`…​.css`** (12 765 caractères). *Enseignement de repérage : sur ce portail, une URL
`/explore/assets/<slug>/view/` peut être une page Studio **ou** une custom view AngularJS. Interroger
`studio_pages/<slug>` d'abord ; un 404 renvoie vers `$scope.blocks`.*

## Champs du jeu (9)

| Champ | Libellé au schéma | Type | Observations vérifiées à l'API |
|---|---|---|---|
| `uai` | UAI | text | **2 524 UAI distincts** pour 3 734 lignes → un établissement peut recevoir plusieurs robots successifs |
| `debut_utilisation` | debut_utilisation | datetime | min **2024-08-22T06:17Z**, max **2026-09-09T13:39Z** |
| `fin_utilisation` | fin_utilisation | datetime | **null pour 208 lignes** = les robots encore en service |
| `nom_etablissement` | Nom_etablissement | text | ex. « Ecole primaire privée Sainte Noyale » |
| `type_etablissement` | Type_etablissement | text | Collège 1 313 · Lycée 1 165 · Ecole 1 026 · **null 175** · Service Administratif 29 · EREA 13 · Autre 7 · Médico-social 6 |
| `nom_commune` | Nom_commune | text | — |
| `position` | position | geo_point_2d | **175 lignes sans position** (les mêmes que les `type_etablissement` nuls ? non vérifié) |
| `libelle_departement` | Libelle_departement | text | 97 valeurs distinctes |
| `libelle_academie` | Libelle_academie | text | **27 valeurs distinctes** sur l'ensemble du jeu |

`bbox` du jeu : 55,83 °E → −61,10 °O, 51,05 °N → −21,34 °S (La Réunion, Martinique, Guadeloupe).

## Objectif de la dataviz et informations véhiculées

- **Question** : « Combien de robots Ted-i sont en service aujourd'hui, où, et comment le déploiement
  progresse-t-il depuis la rentrée ? » C'est un **tableau de bord de pilotage de programme**, pas un
  annuaire : on ne cherche pas un établissement, on regarde une courbe de montée en charge.
- **Message porté** : le dispositif couvre la quasi-totalité du territoire (27 académies sur 30 en cumul,
  97 départements sur 101) et le rythme s'accélère — 1 865 robots déployés en 2024-2025, 1 740 en 2025-2026,
  **128 dès la première semaine de septembre 2026**.
- **Ce que l'utilisateur doit obtenir** : quatre chiffres de tête (académies, départements, robots en
  service, établissements accompagnés), un classement d'académies, une répartition 1er/2nd degré, une
  courbe cumulée mensuelle, et une carte des implantations.
- **Ce qui n'est pas dans l'objet** :
  - **aucun filtre** — ni académie, ni type, ni recherche. Le seul contrôle est le sélecteur de période.
    La liste des académies est en lecture seule (elle n'est **pas** cliquable : vérifié).
  - **aucune durée d'utilisation** exposée, alors que `debut_utilisation` et `fin_utilisation` la donnent ;
  - **aucune vue élève** : le jeu compte des robots et des établissements, jamais des enfants ;
  - aucune donnée avant août 2024 (l'année scolaire 2023-2024 est **explicitement exclue** par le template,
    cf. § « Dérivation des années scolaires »).

## Chiffres de référence (API v2.1, relevé 2026-09-10 ~10 h 50)

| Mesure | `#null(fin_utilisation)` (« Temps réel ») | 2024-2025 | 2025-2026 | 2026-2027 |
|---|---:|---:|---:|---:|
| Robots (lignes) | **208** | 1 865 | 2 160 | *(en cours)* |
| UAI distincts | **187** | 1 369 | 1 636 | — |
| Départements distincts | **55** | 97 | 96 | — |
| Académies distinctes | **23** | 27 | 27 | — |
| Nouveaux depuis la rentrée | — | 1 865 | 1 740 | **128** |

⚠️ **Piège de relevé payé ici.** Au premier chargement la page affichait **184 / 164 / 52 / 23 et 104**, soit
24 de moins que l'API sur chacune des mesures de flux. Après un rechargement (`navigate` explicite), la page
affichait **208 / 187 / 55 / 23 et 128**, en accord exact avec l'API. Le jeu se rafraîchit à 06:00 UTC ;
les réponses `/records` sont servies avec un cache HTTP que le navigateur réutilise. **Une page annoncée
« temps réel » peut donc afficher des chiffres de la veille.** Ce n'est pas un défaut de conception du
tableau de bord, c'est la conséquence du cache — mais l'utilisateur n'a aucun moyen de le savoir.

## Le template AngularJS, bloc par bloc

### 0. Chrome de page

En-tête DSFR « GOUVERNEMENT » + « data.education.gouv.fr », menu (Données · Data-visualisations · Démarche ·
Créer une carte · Créer un graphique · Nous contacter), fil d'Ariane « Catalogue › Visualisation - TED-i : dé… ›
**Consultation** », H1 **« Visualisation - TED-i : déploiement des robots de télé-présence destinés aux élèves
hospitalisés »**, icône signet à droite. Une **bulle de chat magenta** flotte en bas à droite en permanence.

Puis le template ouvre son propre H2 avec **le même titre sans le préfixe « Visualisation - »** : le titre est
donc écrit deux fois, à deux niveaux de titre, à 100 px d'écart.

### 1. Quatre contextes ODS emboîtés (et non un seul)

```html
<ods-dataset-context context="ctx" ctx-dataset="fr-en-deploiemement_tedi" ng-init="variables={}">
  <ods-dataset-context context="datesdeploiemementtedi" …>        <!-- dérivation des années scolaires -->
    <ods-dataset-context context="frendeploiemementtedi"
        …-parameters="{'q':'#null(fin_utilisation)','sort':'debut_utilisation'}">   <!-- bandeau KPI -->
      <ods-dataset-context context="rentreetedi"
          …-parameters="{'q':'debut_utilisation>=2025-09-01'}">    <!-- bloc « Depuis la rentrée » -->
      <ods-dataset-context context="cartetedi" …>                 <!-- carte -->
```

Cinq contextes sur le **même** jeu, plus un `ods-adv-analysis` racine (`count(*) as total`) dont le résultat
est stocké dans `variables.records` et **jamais affiché**. Code mort.

**Requêtes réellement émises** (relevées au réseau, 19 appels `/api/`) : toutes passent par
`GET /api/explore/v2.1/catalog/datasets/fr-en-deploiemement_tedi/records` avec **`qv1=`** — la couche de
compatibilité qui accepte le `q` de l'API v1 sur l'endpoint v2.1 (`qv1=(%23null(fin_utilisation))`).

### 2. Dérivation des années scolaires (`annees_sco`)

```html
<div ods-adv-analysis="myData" ods-adv-analysis-context="datesdeploiemementtedi"
     ods-adv-analysis-group-by="date_format(debut_utilisation, 'MM/YYYY') as annee_mois_x"
     ods-adv-analysis-select="min(month(debut_utilisation)/12 + year(debut_utilisation)) as annee_mois">
```

Le serveur renvoie **24 mois distincts** (08/2024 → 09/2026, 07/2025 et 07/2026 absents). Une double boucle
`ng-repeat`/`ng-init` en reconstruit les années scolaires en JavaScript de template :
`mois < 9 ? annee-1 : annee`, puis pose pour chacune un `param` ODSQL
`debut_utilisation<AAAA-09-01 and (fin_utilisation>AAAA-09-01 or #null(fin_utilisation))`.
**L'année 2023-2024 est écartée en dur** (`annee_sco != '2023-2024' ? … : ''`) : 08/2024 y tombe.

Résultat : trois clés — `2024-2025`, `2025-2026`, `2026-2027`. Mais **les boutons ne sont pas générés depuis
cet objet** : ils sont écrits en dur dans le template, un `<button>` par année. `annees_sco` ne sert qu'à
fournir le `param` et à calculer `latestYear` pour le bouton « Temps réel ».

### 3. Sélecteur de période (`div.choixperiode`, `role="group"`, `aria-label="Choix de la période affichée"`)

Quatre pilules : **« Temps réel » (active au chargement, fond bleu marine plein) · 2024-2025 · 2025-2026 ·
2026-2027**. Cliquer une année pose `displayhistory=true` ; « Temps réel » repose
`baseQ = '#null(fin_utilisation)'` et `rentreeDebut = latestYear` (donc 2026).

**Ce groupe de boutons est dupliqué à l'identique** au-dessus de la carte (`aria-label="Choix de la période
affichée (carte)"`), pilotant les mêmes variables. Deux jeux de boutons synchronisés, sans indication qu'ils
sont liés : cliquer l'un met l'autre à jour, à 900 px de distance.

Un `<span class="periode-note">` prévu pour « Aucun déploiement enregistré pour l'instant sur cette période. »
ne s'affiche que si `annees_sco['2026-2027']` est absent — il ne s'affiche donc **pas** aujourd'hui.

### 4. Bandeau KPI principal (`div.kpi-bandeau`, `role="region"`)

Cinq cartes, dans cet ordre, toutes sur le contexte `frendeploiemementtedi` (`q = baseQ`) :

| # | Rendu | Requête | Valeur lue (Temps réel) |
|---|---|---|---|
| 1 | **Anneau CSS** `conic-gradient(#000091 x%, #e5e5e5 0)`, valeur au centre + « / 30 » | `select=count(distinct libelle_academie) as nb` | **23 / 30** « académies couvertes » |
| 2 | idem, « / 101 » | `select=count(distinct libelle_departement) as nb` | **55 / 101** « départements couverts » |
| 3 | Picto robot SVG + grand nombre | `select=count(*) as nb` | **208** « robots en service actuellement » |
| 4 | Picto bâtiment SVG + grand nombre | `select=count(distinct uai) as nb` | **187** « établissements accompagnés » |
| 5 | Carte statique « **Chatbot TED-i** » (pas de donnée) | — | lien vers `drne.region-academique-bourgogne-franche-comte.fr` |

Les dénominateurs **30** et **101** sont écrits en dur dans le template et dans l'`aria-label`
(« 23 académies sur 30, soit 77 pour cent »). Le libellé de la carte 3 est pluralisé en template
(`{{ nb > 1 ? 's' : '' }}`) et change de suffixe selon le mode : « actuellement » vs « pendant l'année
scolaire 2024-2025 ».

**Défaut de mise en page observé** : en mode année scolaire, l'anneau ne montre plus que deux cartes
donut + deux compteurs, et **la carte « Chatbot » passe seule à la ligne suivante**, laissant une bande
vide de 400 px. Le bandeau n'a pas de règle de remplissage.

### 5. Bloc « Depuis la rentrée AAAA-AAAA » (contexte `rentreetedi`)

H3 dynamique : « **Depuis la rentrée 2026-2027** » (temps réel) ou l'année choisie. Le `q` du contexte est
recomposé à chaque digest :
`debut_utilisation>=<rentreeDebut>-09-01` (+ ` and debut_utilisation<<rentreeFin>-09-01` en mode historique).

**a) KPI « nouveaux robots »** (`kpi-card kpi-highlight`, bordure gauche bleue, fond bleu très clair)
`select=count(*) as nb` → **128** « Nouveaux robots déployés depuis la rentrée 2026-2027 ».

**b) Carte « Académies (par ordre décroissant) »**
`group_by=libelle_academie`, `select=libelle_academie, count(*) as nb`, `order_by=nb desc`, `limit=35`.
Rendue **à la main** en HTML : une ligne par académie = libellé + `div.ranking-bar-track` /
`div.ranking-bar-fill` dont la largeur vaut `nb / toutesAcademies[0].nb * 100 %` + la valeur.
Repli `{{ acad.libelle_academie || 'Non renseigné' }}`.
Le conteneur `.ranking-list-scroll` a une hauteur fixe (~220 px) : **7 lignes visibles sur 27**, le reste
au scroll interne. **La molette y est capturée** : scroller la page au-dessus de cette carte fait défiler
le classement au lieu de la page (constaté deux fois).
Valeurs lues (2025-2026, 27 lignes) : Lille 238 · Dijon 133 · Versailles 125 · Poitiers 105 · Grenoble 97 ·
Normandie 94 · Créteil 91 · Nantes 87 · Bordeaux 81 · Lyon 67 · Rennes 61 · Montpellier 57 · Aix-Marseille 53 ·
Reims 47 · Toulouse 47 · Orléans-Tours 43 · Nancy-Metz 33 · Strasbourg 33 · Nice 32 · Amiens 23 ·
Clermont-Ferrand 21 · Besançon 19 · Limoges 19 · La Réunion 14 · Paris 13 · Martinique 6 · Corse 5.

**c) Carte « Répartition 1er / 2nd degré »**
`group_by=type_etablissement`, `select=type_etablissement, count(*) as nb`. Le regroupement est fait en
template par un filtre AngularJS :
- **1er degré** = `Ecole`
- **2nd degré** = `Collège` + `Lycée` + `EREA`
- **Autres** = `Autre` + `Médico-social` + `Service Administratif`

Rendu : une barre horizontale à trois segments (bleu marine / **rouge** / gris) + une légende à pastilles.
`title="1er degré"` en infobulle native sur chaque segment.

⚠️ **Les lignes à `type_etablissement` nul disparaissent du total.** Vérifié trois fois :

| Période | Total du KPI | 1er | 2nd | Autres | Somme | Écart |
|---|---:|---:|---:|---:|---:|---:|
| Temps réel (2026-2027) | 128 | 43 | 74 | 6 | 123 | **−5** |
| 2024-2025 | 1 865 | 517 | 1 256 | 18 | 1 791 | **−74** |
| 2025-2026 | 1 740 | 466 | 1 160 | 18 | 1 644 | **−96** |

Le jeu compte **175 lignes sans `type_etablissement`**. La barre prétend représenter un tout et en oublie
jusqu'à 5,5 %, sans le dire.

**d) Carte « Déploiements cumulés par mois — AAAA-AAAA »**
`group_by=date_format(debut_utilisation,'MM/YYYY') as mois`, `select=count(*) as nb`. Le cumul est calculé
**en template**, douze expressions `cVal1 … cVal12` en cascade, sur un ordre de mois écrit en dur
(Sept. → Août, avec `role:'D'` ou `'F'` pour choisir l'année d'affichage du libellé).
Rendu : douze colonnes CSS dont la hauteur vaut `cumul / total * 100 %`, valeur imprimée au-dessus,
libellé « Sept. 25 », « Oct. 25 »… en dessous.
2025-2026 relevé : **301 · 536 · 754 · 941 · 1163 · 1305 · 1495 · 1600 · 1654 · 1663 · 1663 · 1740**.

⚠️ **En mode « Temps réel », les douze barres affichent la même valeur (128) — dont onze pour des mois qui
n'ont pas eu lieu** (Oct. 26 → Août 27). C'est arithmétiquement correct (un cumul reste plat sans nouvel
apport) mais le graphique projette l'année entière comme si elle était close. Rien ne distingue le passé
du futur.

### 6. Carte (`ods-map`, contexte `cartetedi`)

```html
<ods-map context="cartetedi" display-legend="true" location="2,18.54229,-2.63587" scroll-wheel-zoom="true">
```

- **Cadrage initial : zoom 2 sur 18,54 °N / −2,64 °O**, c'est-à-dire le sud du Sahara. À l'écran : **le
  planisphère entier**, de l'Alaska à l'Australie ; la France est un amas de pastilles de 60 px.
  Ce n'est pas un `fit-bounds` mal clippé (défaut n° 1 de la page internats) mais une **valeur écrite en dur**.
- **Fond** : tuiles Huwise/IGN (« Leaflet | Powered by Huwise - Map data © IGN »), plan raster couleur.
- **Contrôles** : plein écran, dessin polygone / rectangle / cercle pour filtrer par zone (+ modifier /
  effacer le filtre de zone), zoom ±, loupe de géocodage, géolocalisation, échelle km/mi. `scroll-wheel-zoom`
  est **actif** (contrairement aux pages Studio, qui exigent ⌘ + molette).
- **Clustering actif** (défaut `ods-map`) : au premier écran, trois bulles rouges **2 002 · 20 · 8** pour la
  période 2025-2026. **2 002 + 20 + 8 = 2 030**, alors que le KPI annonce 2 160 : **130 lignes de la période
  n'ont pas de `position`** (vérifié à l'API : `where=position is null` sur la même fenêtre → 130). Rien ne
  le signale. Cliquer une bulle dézoome/écarte jusqu'aux épingles rouges individuelles.
- **Infobulle** (`ods-map` sans `ods-map-tooltip` : rendu par défaut) : liste `label / valeur` avec les
  **noms techniques des champs**, pas de titre. Relevée mot pour mot :
  ```
  UAI                  0561583S
  debut_utilisation    5 novembre 2025 13:13
  fin_utilisation      15 juin 2026 13:17
  Nom_etablissement    Ecole primaire privée Sainte Noyale
  Type_etablissement   Ecole
  Nom_commune          Noyal-Pontivy
  ```
  Six champs affichés ; `libelle_departement`, `libelle_academie` et `position` **n'y figurent pas**.
  Les libellés viennent du schéma, qui n'a jamais été renseigné : « debut_utilisation », « Nom_etablissement »
  avec majuscule et tiret bas. Les dates sont formatées en français avec l'heure à la minute — une heure de
  livraison de robot, sans intérêt pour le lecteur.
- **Aucune couleur par catégorie**, aucune légende (malgré `display-legend="true"`, rien ne s'affiche :
  la couche n'a pas de champ de série).

### 7. Ligne de statut sous la carte

```html
<span ng-if="!displayhistory">Déploiement des robots Ted-i au {{ datetime|moment:'DD/MM/YYYY' }} (temps réel)</span>
<span ng-if="displayhistory" ods-datetime="datetime">Déploiement … pendant l'année scolaire {{ annees_sco_select }}</span>
```

🐛 **Bug visible.** La directive `ods-datetime="datetime"`, qui alimente la variable `datetime`, est posée
sur le **second** `<span>` — celui du mode historique. En mode « Temps réel » (l'état par défaut), `datetime`
est `undefined` et la ligne s'affiche littéralement :

> **« Déploiement des robots Ted-i au (temps réel) »**

avec un trou à la place de la date. En mode année scolaire, l'autre `<span>` s'affiche correctement
(« Déploiement des robots Ted-i pendant l'année scolaire 2025-2026 »). Vérifié dans les deux modes.

### 8. Quatre requêtes en échec à chaque chargement

🐛 Relevé au réseau, systématiquement, **quatre appels retournent 503** avant que les mêmes appels
réussissent :

```
…/records?…&qv1=(debut_utilisation>=-09-01)&select=count(*) as nb                     → 503
…/records?…&qv1=(debut_utilisation>=-09-01)&group_by=libelle_academie…                → 503
…/records?…&qv1=(debut_utilisation>=-09-01)&group_by=type_etablissement…              → 503
…/records?…&qv1=(debut_utilisation>=-09-01)&group_by=date_format(…) as mois…          → 503
```

`rentreeDebut` est **vide** au premier cycle de digest : le `q` composé vaut `debut_utilisation>=-09-01`,
une expression ODSQL invalide. La même URL rejouée en `curl` renvoie **400** (`ODSQLSyntaxError`) — le 503
est ce que la couche de cache du portail retourne au navigateur. Angular relance ensuite les quatre requêtes
avec `2026-09-01` et elles répondent 200. **Le tableau de bord double son nombre de requêtes analytiques
à chaque visite** ; rien n'est visible côté utilisateur, aucune erreur en console.

## Défauts et bizarreries de l'original — récapitulatif

1. **La carte s'ouvre sur le planisphère** (`location="2,18.54,-2.64"`, zoom 2 codé en dur).
2. **Date manquante en mode temps réel** : « Déploiement des robots Ted-i au (temps réel) » — `ods-datetime`
   posé sur le mauvais `<span>`.
3. **Quatre requêtes 503 à chaque chargement**, dues à un `q` composé avant que `rentreeDebut` soit défini.
4. **La barre 1er/2nd degré perd les `type_etablissement` nuls** — jusqu'à 96 robots sur 1 740.
5. **La carte perd les lignes sans `position`** — 130 sur 2 160 en 2025-2026 — sans le signaler.
6. **Le cumul mensuel affiche onze mois futurs** en mode temps réel, tous à la même valeur.
7. **Sélecteur de période dupliqué** à deux endroits de la page, sans lien visuel.
8. **Titre écrit deux fois**, en H1 (préfixé « Visualisation - ») et en H2.
9. **Infobulle en noms de champs techniques** (`debut_utilisation`, `Nom_etablissement`), sans titre, sans
   académie ni département, avec l'heure à la minute.
10. **Le classement d'académies capture la molette** : impossible de scroller la page en le survolant.
11. **Sept académies visibles sur 27** dans un conteneur à hauteur fixe, sans indication du reste.
12. **Dénominateurs en dur** (`/ 30`, `/ 101`) dans le HTML et dans l'`aria-label`.
13. **Aucun filtre** : pas de sélection d'académie, de département ou de type ; le classement n'est pas
    cliquable.
14. **Aucune synchronisation d'URL** : l'état « 2024-2025 » n'est ni partageable ni « bookmarkable ».
15. **Code mort** : le premier `ods-adv-analysis` (`count(*) as total` → `variables.records`) n'est jamais lu.
16. **La bulle de chat magenta** recouvre en permanence le coin bas droit du contenu.
17. **Un chiffre « temps réel » peut être celui de la veille** (cache HTTP, cf. § Chiffres de référence).

## Transposition vers `dsfr-data`

### Architecture retenue et pourquoi — mesurée

`/exports/json?limit=-1` sur le jeu complet, chronométré trois fois en ligne de commande :
**282 Ko gzip (1,40 Mo brut) pour 3 734 lignes, en 0,57 s / 0,61 s / 0,08 s (cache).**

**Donc : une seule `dsfr-data-source` en mode URL générique sur `/exports/json`, tout le reste côté client.**
Sur ce volume, invoquer une limite de performance serait faux (règle du dépôt) : l'original émet **19 requêtes
dont 4 en échec** pour afficher ce que **un** aller-retour de 0,6 s permet de recalculer sans réseau à chaque
changement de période. Le mode client rend en outre gratuits les filtres que l'original n'a pas.

Le champ `position` sort de `/exports/json` en `{lon, lat}` : accepté tel quel par `geo-field`.

### Correspondance bloc à bloc

| Directive / bloc AngularJS | Composant + attributs `dsfr-data` |
|---|---|
| 5 `ods-dataset-context` sur le même jeu | **une** `<dsfr-data-source id="tedi" url="…/fr-en-deploiemement_tedi/exports/json?limit=-1">` |
| `ctx-parameters="{'q':'#null(fin_utilisation)'}"` | `<dsfr-data-query id="tedi-actif" source="tedi" where="fin_utilisation:isnull">` (syntaxe **colon** obligatoire sur `dsfr-data-query` ; la syntaxe ODSQL n'y est pas supportée — elle l'est sur le `where` de `dsfr-data-source`) |
| `q` de période `debut<X and (fin>Y or #null(fin))` | même chose en deux `dsfr-data-query` chaînées, ou un `<dsfr-data-context>` + `<dsfr-data-context-filter>` piloté par les boutons de période (voir § Limites, point 1) |
| boutons « Temps réel / 2024-2025 / … » | `<dsfr-data-context sources="tedi">` + `<dsfr-data-context-filter field="debut_utilisation" operator="year-of" ui="…">`. ⚠️ `year-of` lit « AAAA », pas une date complète (AM-029) — et une **année scolaire** n'est pas une année civile : voir § Limites, point 1 |
| `count(distinct libelle_academie)` | **pas d'agrégat `distinct`** (piège connu du dépôt) : `<dsfr-data-query id="aca" source="tedi-actif" group-by="libelle_academie">` puis `<dsfr-data-kpi source="aca" value="count">` — le KPI compte les **lignes du groupby**, c'est-à-dire les académies distinctes |
| idem pour `count(distinct uai)` et `count(distinct libelle_departement)` | même motif, une `dsfr-data-query group-by` par dénombrement |
| anneau `conic-gradient(#000091 x%, #e5e5e5 0)` « 23 / 30 » | `<dsfr-data-chart type="gauge" gauge-value="…">` (le seul type qui rend une progression vers un objectif ; `gauge-value` est un nombre, **pas** un champ de source — donc valeur calculée ou littérale). Alternative sans script : `<dsfr-data-kpi value="count" label="académies couvertes sur 30">` |
| `count(*) as nb` du bandeau | `<dsfr-data-kpi source="tedi-actif" value="count" format="nombre" label="robots en service">` |
| les 4 cartes côte à côte | `<dsfr-data-kpi-group>` + `col="3"` sur chaque KPI. **Ne pas** poser `display:block` sur le groupe, qui est `grid` (PG-011) |
| carte « Chatbot TED-i » (statique) | une `<div class="fr-callout">` DSFR avec `fr-btn` — pas un composant de données |
| `ranking-list-scroll` + `ranking-bar-fill` (barres proportionnelles maison) | **`<dsfr-data-podium source="aca-rentree" label-field="libelle_academie" value-field="count" max-items="10">`** — le composant existe exactement pour ça (rang, barres proportionnelles, palette `sequentialDescending` par défaut). `no-sort` si on veut garder l'ordre de la query |
| classement complet (27 lignes) | `max-items="27"` — ou `dsfr-data-chart type="bar" horizontal`, qui évite le scroll interne |
| `group_by=libelle_academie … order_by=nb desc` | `<dsfr-data-query id="aca-rentree" source="tedi-rentree" group-by="libelle_academie" aggregate="uai:count" order-by="uai__count:desc" where="libelle_academie:isnotnull">` — l'alias produit est **`champ__fn`** (`uai__count`), et le `where` va sur la balise déjà présente (PG-015) |
| barre 1er/2nd degré à 3 segments + légende | `<dsfr-data-query group-by="type_etablissement">` + `<dsfr-data-chart type="bar" stacked horizontal>` ; le regroupement Ecole / Collège+Lycée+EREA / reste se fait en amont par `<dsfr-data-normalize replace-fields="…">` (**non vérifié** : la grammaire de `replace-fields` interdit les deux-points et compare strictement, AM-038 — sur des libellés sans deux-points elle devrait convenir, à essayer) |
| lignes `type_etablissement` nulles écartées en silence | `empty-label="Type non renseigné"` sur le `dsfr-data-chart` : la catégorie vide est **nommée** au lieu de disparaître. C'est le correctif du défaut n° 4 |
| cumul mensuel calculé en 12 expressions de template | `<dsfr-data-query group-by="…" >` **ne sait pas cumuler**. Voir § Limites, point 2 |
| `ods-map location="2,18.54,-2.64"` | `<dsfr-data-map center="46.6,2.3" zoom="6" tiles="ign-plan" tiles-style="muted" height="560px">` — `tiles-style="muted"` (#686) est natif et **rend obsolète** le contournement CSS `odv-fond-attenue` d'AM-017 |
| DROM (La Réunion, Martinique, Guadeloupe) présents dans le jeu | `insets="la-reunion,martinique,guadeloupe"` + `fit-bounds` : le clip du fit sur la métropole est **automatique** dès qu'un encart ultramarin est posé (`resolveFitZone()`), plus besoin de `fit-zone` explicite. Poser `dsfr-data-map-inset { width: 20% }` (AM-032 : 10 rem par défaut) |
| clustering `ods-map` par défaut | `<dsfr-data-map-layer cluster cluster-radius="60" max-items="20000">` — avec `cluster`, un `max-items` élevé est sans risque (les marqueurs regroupés ne pèsent pas sur le DOM) |
| 130 lignes sans `position` non signalées | `layer.getSkippedCount()` donne le compte ; l'afficher sous la carte. Correctif du défaut n° 5 |
| infobulle par défaut en noms de champs | `<dsfr-data-map-popup title-field="nom_etablissement">` + `<template>` explicite avec des libellés français |
| date `debut_utilisation` dans le template de popup | pas de format `:date` dans un template (FP-003) ; poser un `<dsfr-data-normalize>` ou, si on repasse en source ODS, `date_format(debut_utilisation,'dd/MM/yyyy') as debut_txt` dans le `select` |
| **manque** : aucun filtre | `<dsfr-data-facets source="tedi" fields="libelle_academie, libelle_departement, type_etablissement" display="libelle_academie:select \| type_etablissement:select" searchable="libelle_departement" url-sync>` — séparateur **`\|`** pour `display`, **`,`** pour `fields` (PG-022) |
| **manque** : URL partageable | `url-sync` sur les facettes et le contexte |
| **manque** : tableau accessible | `<dsfr-data-a11y for="g-aca" source="aca-rentree" table download>` sous chaque graphique |
| **manque** : export du bloc | `databox databox-download databox-screenshot databox-source="DNE — fr-en-deploiemement_tedi"` |
| — (rien dans l'original) | `<dsfr-data-chart type="map-aca" code-field="…" value-field="…">` donnerait une **choroplèthe par académie**, que l'original n'a pas. ⚠️ `code-field` attend le **nom d'académie en majuscules** ; `libelle_academie` est en casse mixte ici (« Lille », « Nancy-Metz ») → `dsfr-data-normalize` en amont. **Non vérifié au rendu.** |

### Esquisse de code

```html
<!-- ================= Source unique ================= -->
<!-- 3 734 lignes, 282 Ko gzip, 0,6 s mesuré : un aller-retour, tout le reste en client. -->
<dsfr-data-source id="tedi"
  url="https://data.education.gouv.fr/api/explore/v2.1/catalog/datasets/fr-en-deploiemement_tedi/exports/json?limit=-1">
</dsfr-data-source>

<!-- Robots encore en service : la lecture « temps réel » de l'original. -->
<dsfr-data-query id="tedi-actif" source="tedi" where="fin_utilisation:isnull"></dsfr-data-query>

<!-- Dénombrements distincts : pas d'agrégat `distinct`, on compte les groupes. -->
<dsfr-data-query id="d-aca" source="tedi-actif" group-by="libelle_academie"
  where="libelle_academie:isnotnull"></dsfr-data-query>
<dsfr-data-query id="d-dep" source="tedi-actif" group-by="libelle_departement"
  where="libelle_departement:isnotnull"></dsfr-data-query>
<dsfr-data-query id="d-uai" source="tedi-actif" group-by="uai"></dsfr-data-query>

<!-- Classement des académies sur la période. -->
<dsfr-data-query id="aca-rang" source="tedi-actif" group-by="libelle_academie"
  aggregate="uai:count" order-by="uai__count:desc" where="libelle_academie:isnotnull"></dsfr-data-query>

<!-- Répartition par type, groupe nul NOMMÉ et non supprimé. -->
<dsfr-data-query id="par-type" source="tedi-actif" group-by="type_etablissement"
  aggregate="uai:count" order-by="uai__count:desc"></dsfr-data-query>

<div class="fr-container fr-mb-8w">

  <h1 class="fr-h2">Ted-i — robots de téléprésence pour élèves hospitalisés</h1>
  <p class="fr-text--lead">Dans le cadre du programme Ted-i, chaque enfant hospitalisé ou maintenu
    durablement à domicile peut disposer gratuitement d'un système de téléprésence pour suivre sa classe.</p>

  <!-- ================= Filtres : ce que l'original n'a pas ================= -->
  <dsfr-data-facets id="tedi-f" source="tedi"
    fields="libelle_academie, libelle_departement, type_etablissement"
    labels="libelle_academie:Académie | libelle_departement:Département | type_etablissement:Type d'établissement"
    display="libelle_academie:select | type_etablissement:select"
    searchable="libelle_departement" url-sync url-params></dsfr-data-facets>

  <!-- ================= KPI ================= -->
  <dsfr-data-kpi-group class="fr-mb-2w">
    <dsfr-data-kpi source="d-aca" value="count" format="nombre" col="3"
      heading="Sur 30" label="académies couvertes"></dsfr-data-kpi>
    <dsfr-data-kpi source="d-dep" value="count" format="nombre" col="3"
      heading="Sur 101" label="départements couverts"></dsfr-data-kpi>
    <dsfr-data-kpi source="tedi-actif" value="count" format="nombre" col="3"
      label="robots en service"></dsfr-data-kpi>
    <dsfr-data-kpi source="d-uai" value="count" format="nombre" col="3"
      label="établissements accompagnés"></dsfr-data-kpi>
  </dsfr-data-kpi-group>
  <p class="fr-hint-text">Données du jeu <code>fr-en-deploiemement_tedi</code>, mises à jour
    quotidiennement à 6 h. Un robot est « en service » tant que sa date de fin d'utilisation est vide.</p>

  <!-- ================= Classement des académies ================= -->
  <h2 class="fr-h4 fr-mt-4w">Où sont les robots</h2>
  <dsfr-data-podium source="aca-rang" label-field="libelle_academie" value-field="uai__count"
    max-items="10" value-unit="robots"></dsfr-data-podium>

  <!-- ================= Répartition par type ================= -->
  <div class="odv-chart-slot fr-mt-4w">
    <dsfr-data-chart id="g-type" source="par-type" type="bar" horizontal
      label-field="type_etablissement" value-field="uai__count" name="Robots"
      empty-label="Type non renseigné"
      databox databox-title="Robots par type d'établissement"
      databox-source="DNE — fr-en-deploiemement_tedi" databox-download databox-screenshot>
    </dsfr-data-chart>
    <dsfr-data-a11y for="g-type" source="par-type" table download></dsfr-data-a11y>
  </div>

  <!-- ================= Carte ================= -->
  <h2 class="fr-h4 fr-mt-4w">Cartographie des déploiements</h2>
  <dsfr-data-map name="Déploiement des robots Ted-i" center="46.6,2.3" zoom="6"
    height="560px" tiles="ign-plan" tiles-style="muted"
    fit-bounds fit-max-zoom="12" insets="guadeloupe,martinique,la-reunion">

    <dsfr-data-map-layer id="couche-tedi" source="tedi-actif" type="marker"
      geo-field="position" cluster cluster-radius="60" max-items="20000"
      tooltip-field="nom_etablissement"></dsfr-data-map-layer>

    <dsfr-data-map-popup for="couche-tedi" mode="panel-right"
      title-field="nom_etablissement" width="380px">
      <template>
        <p class="fr-badge fr-badge--sm fr-mb-2v">{{type_etablissement|Type non renseigné}}</p>
        <p class="fr-text--sm"><strong>{{nom_commune}}</strong> — {{libelle_departement}},
          académie de {{libelle_academie}}</p>
        <p class="fr-text--sm">En service depuis le {{debut_utilisation}}</p>
        <p class="fr-text--xs">UAI {{uai}}</p>
      </template>
    </dsfr-data-map-popup>
  </dsfr-data-map>
  <p class="fr-hint-text" id="tedi-hors-carte"><!-- rempli depuis getSkippedCount() --></p>

</div>
```

## Limites et points durs identifiés

1. **Le filtre « année scolaire » n'a pas d'équivalent déclaratif.**
   *Obstacle* : la période de l'original est `debut < AAAA-09-01 and (fin > AAAA-09-01 or fin is null)` —
   un intervalle **à cheval sur deux années civiles** portant sur **deux champs**.
   *Voies natives essayées (lecture de la référence)* : `dsfr-data-context-filter operator="year-of"` lit
   « AAAA » (année **civile**) ; `current-year` produit `[1er janvier, 1er janvier suivant)` ; `last-n-days`
   est relatif. Aucun opérateur ne couvre un intervalle glissant sur deux champs.
   *Contournement* : dériver en amont un champ `annee_scolaire` (chaîne « 2025-2026 ») par
   `dsfr-data-normalize compute`, puis en faire une facette `display="annee_scolaire:select"`. Ce n'est **pas**
   strictement équivalent : l'original compte un robot dans une année s'il a **chevauché** cette année, le
   champ dérivé le compterait dans son année de **début**. Sur ce jeu, les deux mesures diffèrent
   (2024-2025 : 1 865 en chevauchement contre 1 865 en date de début — elles coïncident ici parce que
   `min(debut_utilisation)` est le 22 août 2024 ; **sur un jeu où les locations durent plus d'un an, elles
   divergeraient**).
   *Verdict* : **différence de modèle, pas de capacité** — mais à dire précisément. La voie honnête est de
   séparer « robots en service pendant l'année » (deux `dsfr-data-query` chaînées, `where` sur chaque champ)
   de « robots déployés depuis la rentrée » (un `where` sur `debut_utilisation`), ce que l'original mélange
   déjà dans le même bandeau.

2. **Le cumul mensuel.**
   *Obstacle* : ni `dsfr-data-query` ni `dsfr-data-chart` ne calculent une somme cumulée. La référence de
   `dsfr-data-query` ne liste que `group-by`, `aggregate`, `where`, `order-by`, `limit` ; la référence de
   `dsfr-data-chart` n'a pas d'option de cumul.
   *Voie native essayée* : `dsfr-data-normalize compute` (calcul par ligne) — ne voit pas les lignes
   précédentes, donc ne cumule pas.
   *Contournement* : (a) afficher les déploiements **par mois** au lieu du cumul, ce qui est plus lisible et
   ne cache pas les mois vides ; (b) calculer le cumul dans la page en quelques lignes de JS sur
   `dsfr-data-loaded`, avant de le repasser à un `dsfr-data-source data="…"` inline.
   *Verdict* : **manque réel, à remonter** — une série cumulée est un besoin courant de tableau de bord de
   déploiement. À proposer comme option de `dsfr-data-query` (`cumulative="champ"`) ou de `dsfr-data-chart`.

3. **L'anneau de progression « 23 / 30 ».**
   *Obstacle* : `dsfr-data-kpi` n'a pas de rendu circulaire ; `dsfr-data-chart type="gauge"` prend un
   `gauge-value` **numérique littéral**, pas une expression de source (référence relue : « gauge-value :
   Valeur pour la jauge », `number | null`, et le guide précise « PAS de label-field ni source obligatoire »).
   *Voie native* : `dsfr-data-kpi format="pourcentage"` + `heading="Sur 30 académies"` donne l'information
   sans le cercle.
   *Contournement* : deux lignes de JS pour poser `gauge-value` depuis `dsfr-data-loaded`.
   *Verdict* : **petit manque réel** — une jauge branchée sur une source (`gauge-field` + `gauge-max`)
   manque au catalogue. Cosmétique cependant : le chiffre passe par le texte.

4. **Le sélecteur de période à deux exemplaires synchronisés.**
   *Constat* : `dsfr-data-context` est précisément fait pour ça — plusieurs UI pilotant le même filtre
   transverse (`ui="id-de-l-element"`). Deux `<dsfr-data-context-filter>` sur le même champ, ou un seul
   filtre écoutant deux éléments. **Non vérifié** qu'un même filtre accepte deux `ui` ; à défaut, deux
   filtres sur le même champ.
   *Verdict* : **non-problème**, la voie native existe. Et dupliquer le sélecteur est de toute façon un
   défaut d'ergonomie, pas une exigence.

5. **Le bandeau « ⋮ » d'export par bloc.**
   *Constat* : l'original n'en a **pas** (c'est une custom view AngularJS, pas une page Studio). C'est
   `dsfr-data` qui **ajoute** `databox-download` / `databox-screenshot`. À porter au crédit de la
   transposition, pas au débit.

6. **`scroll-wheel-zoom` de la carte.**
   *Constat* : `dsfr-data-map` n'expose pas d'attribut de neutralisation de la molette (`locked` désactive
   **toute** interaction). Sur une page longue, une carte qui capture la molette est un piège d'ergonomie —
   les pages Studio du même portail affichent d'ailleurs « Utilisez ⌘ + molette pour zoomer la carte ».
   *Verdict* : **manque réel, mineur, à remonter** (`scroll-zoom="ctrl"` ou équivalent).

7. **Ce que la transposition gagne**, et qu'il faut dire : un seul aller-retour au lieu de dix-neuf (dont
   quatre en échec), une carte cadrée sur la France avec encarts ultramarins, une infobulle en français avec
   l'académie et le département, le groupe « type non renseigné » nommé au lieu d'escamoté, le compte des
   points hors carte affiché, trois filtres et une URL partageable, un tableau accessible sous chaque
   graphique. **Neuf des dix-sept défauts relevés tombent d'eux-mêmes.**

## Données à reproduire fidèlement

- [ ] **3 734** déploiements au total, **2 524** UAI distincts, **208** robots en service au 10/09/2026.
- [ ] **Types** : Collège 1 313 · Lycée 1 165 · Ecole 1 026 · **non renseigné 175** · Service Administratif 29 ·
      EREA 13 · Autre 7 · Médico-social 6 — le groupe nul **doit apparaître**.
- [ ] **175 lignes sans `position`** : à signaler sous la carte, jamais à escamoter.
- [ ] **Couverture** : 27 académies et 97 départements en cumul ; 23 et 55 sur les robots en service.
- [ ] **Par année scolaire** : 2024-2025 → 1 865 robots / 1 369 établissements / 27 académies / 97 dép. ;
      2025-2026 → 2 160 / 1 636 / 27 / 96 ; depuis la rentrée 2026 → **128**.
- [ ] **Cumul 2025-2026** : 301 · 536 · 754 · 941 · 1163 · 1305 · 1495 · 1600 · 1654 · 1663 · 1663 · 1740 —
      et **ne pas afficher de mois futurs**.
- [ ] **Classement 2025-2026** : Lille 238 en tête, Corse 5 en queue, 27 académies.
- [ ] **Infobulle** : nom d'établissement en titre, puis type, commune, département, académie, date de début
      **en JJ/MM/AAAA sans l'heure**, UAI. Jamais les noms techniques de colonnes.
- [ ] Mention explicite de la fraîcheur (« mise à jour quotidienne à 6 h ») plutôt que le mot « temps réel ».
