# Équipements sportifs en milieu scolaire (portail Sports)

- **URL du catalogue** : https://equipements.sports.gouv.fr/pages/education-equipement/**?headless=true**
- **URL réelle de la page** : https://equipements.sports.gouv.fr/pages/education-equipement/
- **Id catalogue** : **27** — thématique **Sports**, titre catalogue « Équipements sportifs en
  milieu scolaire ». **Titre réel de la page : « Équipements en milieu scolaire »** ;
  fil d'Ariane et `<title>` : « Équipements scolaires » / « Equipements scolaire — Data ES ».
  Trois libellés différents pour la même page.
- **⚠️ Source cross-portail** : hébergée par `equipements.sports.gouv.fr`, pas par
  `data.education.gouv.fr`. Même portail que les id 13 et 14.
- **Clé API** : **aucune** (portail ouvert, CORS `*` — voir `accessibilite-equipements-sportifs.md`).
- **Template archivé** : `_sources/education-equipement.html` (42 382 caractères désechappés)
  + `_sources/education-equipement.css` (4 641). Relevé le 2026-09-10.
- **Relevé visuel** : 2026-09-10, Chrome, viewport 1568 × 751, **les deux variantes chargées et
  comparées** (avec et sans `?headless=true`).

## Les quatre jeux de la page (et un cinquième qui n'existe pas)

| Contexte(s) | Jeu | Lignes | Paramètres posés |
|---|---|---|---|
| `dataes`, `acadataes`, `grpscoldataes` | `data-es` | 333 611 | `q = '#search(equip_utilisateur,Scolaire)'` — les équipements **utilisables par des scolaires** |
| `datamap`, `etabscoldataes`, `scolaireclubsdep` | `data-es` | 333 611 | `q = '#search(inst_part_type_filter,scolaire)'` — les équipements **situés dans une enceinte scolaire** |
| `scolaireclubs` | `data-es` | 333 611 | `q = '#search(equip_utilisateur,Clubs)'` + `ng-init refine.inst_part_type_filter = 'Etablissement scolaire'` |
| `dataestotal` | `data-es` | 333 611 | nu — le dénominateur de la jauge |
| `educ`, `acaeduc` | **`annuaire-educ`** — *Annuaire de l'éducation*, 71 champs, `records_count` 68 534, **modifié le 2023-10-19** | 68 534 | `disjunctive.code_nature` + 24 valeurs de `code_nature` (`101,103,151,153,162,169,300,301,302,306,307,310,315,320,332,334,335,340,344,345,349,350,352,400`) |
| `qpv` | `quartiers-prioritaires-de-la-politique-de-la-ville-qpv` | 1 584 | refine `nom_epci` |
| `searchepci` | `insee-epci` (`epci_code, epci_nom, dep_code, aca_nom`) | 1 360 | référentiel de recherche |
| `categories` | **`data-es-categories`** | — | **le jeu n'existe pas** : `GET /api/datasets/1.0/data-es-categories/` → **HTTP 404**, `GET /api/explore/v2.1/catalog/datasets/data-es-categories` → `NotFoundResource`. Voir défaut n° 1 |

**Huit contextes déclarés sur un seul `<ods-dataset-context>`, dont six sur le même jeu
`data-es` avec cinq `q` différents.**

**Champs utiles** — `data-es` : `equip_numero`, `equip_utilisateur`, `inst_part_type_filter`,
`inst_uai`, `equip_prop_type`, `equip_type_famille`, `equip_type_name`, `categorie`,
`reg_nom`, `dep_nom`, `epci_code`, `equip_coordonnees`.
`annuaire-educ` : `identifiant_de_l_etablissement`, `nom_etablissement`, `type_etablissement`,
`statut_public_prive`, `code_nature`, `libelle_nature`, `nombre_d_eleves`, `epci_code`,
`aca_nom`, `libelle_academie`, `code_academie`, `code_region`.

---

## 1. `?headless=true` — ce que le paramètre retire réellement

**C'est le constat propre à cette page, et il ne figure au catalogue que pour elle.** Le
catalogue pointe l'URL **avec** le paramètre ; la page se charge parfaitement sans. Les deux
variantes ont été chargées dans le même onglet, avec la même attente (20 s), et mesurées.

| Mesure | sans `headless` | `?headless=true` | Δ |
|---|---|---|---|
| `<header>` | 1 balise, **remplie** : logo Marianne « Ministère des Sports, de la Jeunesse et de la Vie associative », `equipements.sports.gouv.fr`, baseline, « Déclarer votre équipement », bouton « Je donne mon avis », menu à 7 entrées (Accueil, Portrait de territoire, Equipements, Données, Tableaux de bord, Plus d'infos, Contact) | 1 balise, **vide** (`innerText === ""`) | l'habillage |
| `<footer>` | **2 balises, remplies** : sports.gouv.fr, data.gouv.fr, data.sports.gouv.fr, prn-si, espace sur demande, Accueil, Back Office, **Plan du site**, En savoir plus, Contact, **Accessibilité : non conforme**, **Gestion des cookies**, **Conditions d'utilisation**, **Politique de confidentialité**, mention de licence | **1 balise, vide** | les mentions légales |
| `<nav>` | 2 (`fr-header` + fil d'Ariane) | **1 — le fil d'Ariane est conservé** | la navigation principale |
| Widget de discussion (`#chatDiv`) | 2 éléments | **0** | le chat |
| `<script src>` | 31 | **27** | −4 |
| `<link rel=stylesheet>` | 31 | **13** | **−18** |
| Taille du DOM sérialisé | 835 569 car. | 799 161 car. | −36 Ko |
| Hauteur du document | 6 556 px | 6 093 px | −463 px |
| **Requêtes API** | **48** | **48** | **0** |
| **Octets d'API** | **55 Ko** | **55 Ko** | **0** |
| Ressources totales | 193 | 123 | −70 |
| Poids total transféré | 143 Ko | 123 Ko | −20 Ko |

**Ce que ça dit.** `headless=true` retire **le chrome du portail** : en-tête, pied de page,
chat. Il ne retire **rien** du moteur : les 27 scripts et 13 feuilles de style qui restent sont
AngularJS, les widgets Opendatasoft, Leaflet et Highcharts, et les **48 requêtes d'API sont
identiques à l'octet près**. Le paramètre existe donc pour **une seule raison : encastrer la
page en `<iframe>` sur un autre site**, et le catalogue de `data.education.gouv.fr` en fait
précisément cet usage.

Deux conséquences, à énoncer sans les surjouer :

1. **Ce qui disparaît avec le pied de page n'est pas décoratif.** « Accessibilité : non
   conforme », « Gestion des cookies », « Conditions d'utilisation », « Politique de
   confidentialité » et la mention de licence sont dans le `<footer>` supprimé. Une page
   encastrée porte donc la donnée sans porter la déclaration d'accessibilité qui la concerne,
   ni le gestionnaire de consentement, ni la licence de réutilisation. Le site hôte hérite du
   contenu sans hériter des obligations qui vont avec — et il n'a aucun moyen de le savoir.
2. **Une dataviz `dsfr-data` n'a pas ce problème parce qu'elle n'a pas besoin d'être
   encastrée : elle *est* le contenu de la page hôte.** Trois balises et un CDN produisent le
   même bloc directement dans le DOM du site — dans son en-tête, son pied de page, sa
   navigation, son fil d'Ariane, sa feuille de style, son gestionnaire de cookies et sa
   déclaration d'accessibilité. Il n'y a pas de second document, donc pas de double moteur
   (les 27 scripts et 13 CSS du portail ne sont pas rechargés), pas de hauteur d'iframe à
   négocier, pas de barre de défilement imbriquée, pas de contexte de focus séparé, et pas de
   mentions légales laissées de l'autre côté. **Il n'y a rien dans le backlog `dsfr-data` sur
   l'encastrement** — et c'est cohérent : le besoin n'existe pas dans ce modèle.

**Ce qu'il ne faut pas en conclure** : l'iframe reste la seule façon de réutiliser une page
Opendatasoft *telle quelle*, avec ses interactions. Le paramètre est un bon service rendu par
le portail. Le constat porte sur ce que coûte le modèle, pas sur l'intention.

---

## 2. Objectif de la dataviz et informations véhiculées

- **Question** : « Combien d'équipements sportifs y a-t-il dans les établissements scolaires,
  à qui appartiennent-ils, et combien sont ouverts aux clubs ? »
- **Message porté**, explicite et politique : depuis la rentrée 2024 le ministère chargé des
  sports pousse à l'ouverture des équipements scolaires aux clubs. La page **mesure l'écart au
  100 %** : 19 % sur l'ensemble, 41 % sur les seuls équipements structurants. Un encadré
  « Atteindre le 100 % d'ouverture ? » explique pourquoi le 100 % n'est pas atteignable.
- **Trois périmètres distincts, qu'il faut tenir séparés**, et que la page ne distingue
  jamais typographiquement :
  1. **dans** un établissement scolaire (`inst_part_type_filter` contient « scolaire ») → 29 452 ;
  2. **utilisable par** des scolaires et universitaires (`equip_utilisateur` contient
     « Scolaire ») → 141 976 ;
  3. **dans** un établissement scolaire **et** ouvert aux clubs → 5 680.
- **Ce que l'utilisateur doit obtenir** : le chiffre national, la répartition par propriétaire
  et par famille, le taux d'ouverture aux clubs par région ou par rectorat puis par
  département, et — en bas de page — une fiche par **EPCI** croisant établissements scolaires,
  équipements accessibles, élèves et QPV.
- **Ce qui n'est pas dans l'objet** : aucune série temporelle (alors que la mesure est datée de
  la rentrée 2024) ; aucun export ; aucune alternative non graphique ; aucun état partageable
  (pas d'`urlsync`) ; et **l'onglet « Rectorat » ne fonctionne pas** (défaut n° 2).

---

## 3. Relevé visuel exhaustif, bloc par bloc

### Bloc 1 — En-tête et le grand chiffre

Fil d'Ariane « Accueil › Équipements scolaires ». **H1 « Équipements en milieu scolaire »**.

À gauche, en très gros : **29 452** suivi de « source ⧉ » (lien vers
`/explore/dataset/data-es/table/?refine.inst_part_type_filter=Etablissement+scolaire`) puis
**H3 « Équipements sportifs dans les établissements scolaires »**.
Formule : `ods-aggregation COUNT` sur `etabscoldataes` (`q = #search(inst_part_type_filter,scolaire)`).
**Recoupé à l'API : 29 452 ✔.**

À droite, « A quoi correspond ce chiffre? » puis un paragraphe qui se termine par
« *A ce jour, la base compte **13 036 UAI uniques***. »
Formule : `count(distinct inst_uai)` sur le même contexte. **Non recoupé** (le `select` n'a pas
été rejoué à l'API ; la valeur affichée est celle de l'écran).

⚠️ **Le lien « source » ne mène pas au chiffre affiché** : il refine sur
`inst_part_type_filter = 'Etablissement scolaire'` (**égalité stricte**) alors que le chiffre
vient d'une recherche plein texte. Vérifié à l'API : égalité stricte → **29 424**, recherche →
**29 452**. **28 équipements d'écart**, ceux dont la colonne vaut une valeur composée
(`Complexe sportif;Etablissement scolaire` 24, `Etablissement scolaire;Complexe sportif` 4).

### Bloc 2 — La carte nationale

```html
<ods-map basemap="ign.planv2" display-control="false" displaylegend="false"
         scroll-wheel-zoom="false" search-box="false"
         toolbar-drawing="false" toolbar-fullscreen="true" toolbar-geolocation="false">
  <ods-map-layer-group>
    <ods-map-layer color="#000091" context="datamap" display="auto" function="COUNT"
                   picto="dot" show-marker="false" size-function="linear"></ods-map-layer>
  </ods-map-layer-group>
</ods-map>
```

- **Vue au chargement : le planisphère** (échelle 3000 km), comme les deux autres pages du
  portail. Bulles relevées : **27 712** (métropole) · **185** · **859** · **576** · **107** ·
  **4**. Somme **29 443** ; **recoupé** : 29 452 − **9 équipements sans `equip_coordonnees`** = 29 443 ✔.
- Contrôles : plein écran, zoom ±, **loupe** (présente malgré `search-box="false"` — même
  attribut sans effet qu'à la fiche id 13), sélecteur de calques. Molette désactivée.
- **Aucune infobulle déclarée**, aucun `<ods-map-tooltip>` : l'infobulle est celle du
  back-office. **Non ouverte à l'écran** (les bulles restent agrégées à l'échelle nationale et
  je n'ai pas zoomé jusqu'au point unitaire sur cette page).
- Aucune légende sous la carte.

### Bloc 3 — Les deux graphiques nationaux (contexte `datamap`)

Précédés de « ⧩ *Vous pouvez filtrer les équipements en cliquant sur les graphiques. Pour
retirer le filtre et revenir en arrière, il suffit de cliquer de nouveau sur le graphique.* »

**a. « Type de propriétaires (bâti) »** — `chart-type="pie"`, `field-x="equip_prop_type"`,
`sort="serie1"`, `refine-on-click-datamap-context-field="equip_prop_type"`.
Huit parts relevées à l'écran : **11 469 · 5 440 · 5 328 · 3 401 · 1 472 · 1 301 · 671 · 232**.
**Recoupées à l'API, exactes**, dans l'ordre Commune · Région · Département · Établissement
d'enseignement privé · Établissement Public · Association(s) · EPCI · État.
Somme 29 314 ; le 9ᵉ groupe de l'API est `null` (**138 équipements**), non représenté.
**Légende écrite à la main sous le camembert, dix entrées** rendues par
`ng-repeat="(proprietaire, color) in propcolors"` : Etat · Etablissement Public · Région ·
Département · EPCI · Commune · Privé non commercial · Autre · Association(s) · Etablissement
d'enseignement privé. **Deux entrées ne correspondent à aucune part** (Privé non commercial,
Autre), et **l'ordre de la légende n'est pas celui des parts** — la légende est illisible
comme clé de lecture du camembert. Voir défaut n° 4.

**b. « Famille des types d'équipements »** — `chart-type="column"`, `field-x="equip_type_famille"`,
`maxpoints="10"`, `sort="serie1-1"`, `color="#253791"`,
`refine-on-click-datamap-context-field="equip_type_famille"`.
Relevé : Multisports/City-stades **7 032** · Terrain extérieur de petits jeux collectifs **5 707**
· Salle multisports **4 050** · Equipement d'athlétisme **3 411** · Salle non spécialisée **2 296**
· Terrain de grands jeux **1 540** · Salle ou terrain spécialisé **1 470** · Equipement
d'activités de forme et de santé **1 181** · Structure Artificielle d'Escalade **991** ·
Court de tennis **496**. **Recoupés à l'API, exacts.**

### Bloc 4 — « Nombre d'équipements sportifs en capacité d'accueillir scolaires et universitaires »

Chapô : « *S'ils ne sont pas directement dans l'enceinte d'un établissement, beaucoup
d'équipements sont en capacité d'accueillir les groupes scolaires et universitaires pour la
pratique sportive.* »

À gauche, un `chart-type="bar"` (horizontal) sur `grpscoldataes`
(`q = #search(equip_utilisateur,Scolaire)`), `field-x="equip_type_name"`, `maxpoints="10"`,
`max="25000"`, **sans** `refine-on-click`. Relevé, **recoupé, exact** :
Terrain de football **18 173** · Salle multisports (gymnase) **17 271** ·
Multisports/City-stades **16 697** · Court de tennis **11 813** ·
Salles polyvalentes / des fêtes / non spécialisées **8 782** · Terrain de basket-ball **5 643** ·
Boucle de randonnée **5 059** · Dojo / Salle d'arts martiaux **4 351** ·
Piste d'athlétisme isolée **3 959** · Terrain de handball **2 833**.

À droite, un **`<ods-gauge display-mode="circle" max="nbtotal" value="nbacces">`** — anneau
affichant **43 %**, avec `nbacces = COUNT(grpscoldataes)` et `nbtotal = COUNT(dataestotal)`.
Sous l'anneau : « Référencés dans la base, **141 976** équipements accessibles aux scolaires et
universitaires ». **Recoupé** : 141 976 / 333 611 = 42,56 % → l'anneau arrondit à 43 % ✔.

### Bloc 5 — Fond bleu : l'ouverture aux clubs

**KPI** : **5680** (sans séparateur de milliers) + « source ⧉ », puis H3 « Équipements sportifs
dans les établissements scolaires ouverts aux clubs sportifs ».
Formule : `count(equip_numero)` sur `scolaireclubs`
(`q = #search(equip_utilisateur,Clubs)` + `refine.inst_part_type_filter = 'Etablissement scolaire'`).
**Recoupé à l'API : 5 680 ✔.**

⚠️ **La page « Portrait de territoire » du même portail affiche 5 684 pour le même
indicateur** (clause `(inst_part_type like 'scolaire') and (equip_utilisateur like 'Clubs')`).
**Recoupé, les deux sont exacts** — l'écart de 4 vient de la même cause que les 28 du bloc 1 :
égalité stricte contre recherche plein texte sur une colonne à valeurs composées. Deux pages du
même portail donnent deux chiffres pour le même énoncé.

Paragraphe explicatif + deux liens sortants : **Bulletin officiel n° 34 du 11 septembre 2025**
(`education.gouv.fr/bo/2025/Hebdo34/SPOV2525321C`) et **exemple de convention**
(`bulletin-officiel.education.gouv.fr/sites/default/files/2025-09/sport321_annexe.pdf`).
Photo `Handball.jpg` (alt : « Photo de trois joueurs de handball dans un gymnase »).

**Deux onglets DSFR : `Région` (par défaut) et `Rectorat`.** H4 « Détail par région et
département » / « Détail par rectorat et département ».

**Onglet Région** — un `<select class="fr-select">` peuplé par
`ods-facet-results facet-name="reg_nom" sort="alphanum"` sur `scolaireclubsdep`, option de tête
« France entière », puis **23 valeurs** relevées à l'écran :
Auvergne-Rhône-Alpes · Bourgogne-Franche-Comté · Bretagne · Centre-Val de Loire · Corse ·
Grand Est · Guadeloupe · Guyane · Hauts-de-France · Île-de-France · La Réunion · Martinique ·
Mayotte · Normandie · Nouvelle-Aquitaine · Nouvelle-Calédonie · Occitanie · Pays de la Loire ·
Polynésie française · Provence-Alpes-Côte d'Azur · Saint-Barthélemy · Saint-Martin ·
Wallis-et-Futuna. *(Saint-Pierre-et-Miquelon, présent dans `data-es`, n'a aucun équipement
scolaire.)*

Le tableau a **deux niveaux d'en-tête** : *Equipements Scolaires* / **Exhaustivité** (3 col.) /
**Structurant seulement\*** (3 col.), puis *Région* / *Total* / *Ouvert au clubs* / *Taux* ×2.
Quatre `ods-adv-analysis` le nourrissent (`perreg`, `perregstruc`, `clubperreg`,
`clubperregstruc`), tous `group-by` région, recollés côté client par
`| filter:{reg_nom: …}:true`.

Relevé intégral à l'écran (**Bretagne recoupée à l'API : 1712 / 204 / 395 ✔**) :

| Région | Total | Ouvert clubs | Taux | Struct. total | Struct. clubs | Taux |
|---|---|---|---|---|---|---|
| Auvergne-Rhône-Alpes | 2928 | 704 | 24 % | 740 | 359 | 49 % |
| Bourgogne-Franche-Comté | 1155 | 298 | 26 % | 358 | 164 | 46 % |
| Bretagne | 1712 | 204 | 12 % | 395 | 139 | 35 % |
| Centre-Val de Loire | 1084 | 124 | 11 % | 214 | 60 | 28 % |
| Corse | 96 | 21 | 22 % | 21 | 3 | 14 % |
| Grand Est | 2448 | 541 | 22 % | 703 | 356 | 51 % |
| Guadeloupe | 194 | 38 | 20 % | 48 | 10 | 21 % |
| Guyane | 186 | 51 | 27 % | 55 | 28 | 51 % |
| Hauts-de-France | 2037 | 360 | 18 % | 594 | 196 | 33 % |
| Île-de-France | 3928 | 772 | 20 % | 1016 | 403 | 40 % |
| La Réunion | 707 | 181 | 26 % | 131 | 72 | 55 % |
| Martinique | 187 | 32 | 17 % | 24 | 7 | 29 % |
| Mayotte | 152 | 34 | 22 % | 31 | 8 | 26 % |
| Normandie | 1478 | 178 | 12 % | 379 | 115 | 30 % |
| Nouvelle-Aquitaine | 3163 | 619 | 20 % | 763 | 324 | 42 % |
| Nouvelle-Calédonie | 185 | 13 | 7 % | 31 | 3 | 10 % |
| Occitanie | 3553 | 484 | 14 % | 743 | 245 | 33 % |
| Pays de la Loire | 2094 | 484 | 23 % | 428 | 167 | 39 % |
| Polynésie française | 108 | 31 | 29 % | 27 | 10 | 37 % |
| Provence-Alpes-Côte d'Azur | 1935 | 481 | 25 % | 462 | 240 | 52 % |
| Saint-Barthélemy | 1 | 0 | 0 % | 0 | 0 | 0 % |
| Saint-Martin | 9 | 0 | 0 % | 4 | 0 | 0 % |
| Wallis-et-Futuna | 4 | 2 | 50 % | 1 | 0 | 0 % |
| **France** *(Métropole uniquement)* | **29452** / *27611* | **5680** / *5270* | **19 %** / *19 %* | **7211** / *6816* | **2924** / *2771* | **41 %** / *41 %* |

La ligne « France » est nourrie par huit `ods-adv-analysis` distincts, dont quatre portent une
clause « métropole » écrite en **onze inégalités enchaînées** :
`reg_nom != 'Guadeloupe' and reg_nom != 'Martinique' and … and reg_nom != 'Wallis-et-Futuna'`.

Choisir une région remplace le `<select>` par un bouton **« ‹ <Région> »** et le tableau bascule
sur le détail par département (mêmes six colonnes, `group-by="dep_nom"`). Même mécanique
d'auto-destruction du `<select>` qu'à la fiche id 13 : **on ne peut pas passer d'une région à
une autre sans effacer d'abord**.

**Onglet Rectorat — vide.** Voir défaut n° 2.

**Note de bas de tableau** : « ***Structurants : ( source ⧉ )*** » — **la liste est vide**.
Voir défaut n° 1.

**Encadré `fr-callout`** : « Atteindre le 100% d'ouverture ? » + un paragraphe (contraintes de
sécurité, gardiennage, adaptation aux pratiques fédérales ; « chiffres donnés à titre
indicatif, sur la base des déclarations »).

### Bloc 6 — La fiche EPCI

**H3 « Recherchez votre EPCI (Établissement public de coopération intercommunale) »**, illustré
par `dsfr-map.svg`. Champ de recherche maison (`search-module`, `debounce: 300`, bouton croix
de vidage), `ods-results-max="11"` (10 affichés + « … »).
Aide affichée quand aucune sélection : « *Les ECPIs ont leur libellés réduits (par exemple
Communauté de Communes deviendra CC, Communauté Urbaine CU). Les apostrophes doivent être
précisées (exemple : CU d'Alençon).* » (« ECPIs » est dans le texte.)

**Territoire par défaut codé en dur** dans un `ng-init` :

```html
ng-init="search = {'query':'', selection:'CA du Grand Villeneuvois', academie:'Académie de Bordeaux'};
         dataes.parameters['refine.epci_code']  = '200023307';
         educ.parameters['refine.epci_code']    = '200023307';
         acadataes.parameters['refine.aca_nom'] = 'Académie de Bordeaux';
         acaeduc.parameters['refine.aca_nom']   = 'Académie de Bordeaux';
         qpv.parameters['refine.nom_epci']      = 'CA du Grand Villeneuvois'"
```

**H3 « {{search.academie}} - {{search.selection}} »** → à l'écran :
« **Académie de Bordeaux - CA du Grand Villeneuvois** ».

**Carte à trois couches** (`basemap="ign.planv2"`, échelle 10 km au chargement) :
`educ` en vert `#169B62` picto `ods-college` · `dataes` en bleu `#253791` picto
`ods-soccer_field` · `qpv` en rouge `#CE614A` (formes, `shape-opacity 0.6`).
Légende manuelle en trois pastilles : « Equipements accessibles (bleu) » · « Etablissements
scolaire (vert) » · « QPV (rouge) ». *(La légende inverse les couleurs annoncées par rapport à
l'ordre de déclaration des couches ; le texte entre parenthèses la rend néanmoins correcte.)*

**Trois cartes KPI** (`ods-aggregation` : `epcischool, epciequip, epcistud, acaschool,
acaequip, acastud, qpvcount`) :

| KPI | Formule | Écran | Recoupé à l'API |
|---|---|---|---|
| **54** — Écoles, collèges et lycées | `COUNT(educ)` | 54 | ✔ (`annuaire-educ`, `epci_code='200023307'` + les 24 `code_nature`) |
| sous-ligne : « **3392** établissements scolaire pour l'Académie de Bordeaux » | `COUNT(acaeduc)` | 3392 | ✔ (`aca_nom = 'Académie de Bordeaux'` + 24 natures) |
| **146** — Équipements sportifs, accessibles aux groupes scolaires | `COUNT(dataes)` | 146 | ✔ (`epci_code='200023307'` + `search(equip_utilisateur,"Scolaire")`) |
| sous-ligne : « et aux **2** QPV de l'EPCI » | `COUNT(qpv)` | 2 | ✔ (`nom_epci = 'CA du Grand Villeneuvois'`) |
| **8 739** — Élèves référencés | `SUM(nombre_d_eleves)` sur `educ` | 8 739 | ✔ |
| sous-ligne : « Soit **60** élèves par équipement » | `epcistud / epciequip` | 60 | ✔ (8 739 / 146 = 59,85) |
| sous-ligne : « **4** élèves par équipement pour l'Académie » | `acastud / acaequip` | **4** | **FAUX** — voir défaut n° 3 |

**Trois blocs interactifs** en bas :
- **« Nature établissement »** — `chart-type="pie"` sur `educ`, `field-x="type_etablissement"`,
  `expression-y="code_region" function-y="COUNT"`, trois couleurs en dur
  (`Ecole #0BB675`, `Collège #169B62`, `Lycée #0E7F4E`), `refine-on-click` sur `educ`.
  Légende relevée : « Ecole · Collège · Lycée ».
- **« Type d'installation »** — `<ods-facets context="dataes"><ods-facet disjunctive="true"
  name="inst_part_type_filter">`. Valeurs relevées : **Complexe sportif 83 · Etablissement
  scolaire 41 · Base de plein air et/ou de loisirs 4**.
- **« Famille d'équipements »** — même chose sur `equip_type_famille`. Valeurs relevées :
  **Terrain de grands jeux 31 · Terrain extérieur de petits jeux collectifs 19 · Salle
  multisports 17 · Salle ou terrain spécialisé 12 · Court de tennis 11 · Equipement équestre 11**
  + un lien **« Plus »**.

Texte final : « *Vous pouvez filtrer votre recherche en cliquant sur les différents éléments,
par exemple cliquez sur "Collège" dans le camembert de gauche et sur une famille d'équipement
sur la liste de droite.* »

### Chronométrage (mesuré, deux chargements complets, attente 20 s)

| Mesure | valeur |
|---|---|
| **Requêtes API au chargement** | **48** (identiques avec et sans `headless`) |
| dont métadonnées v1 `/api/datasets/1.0/<jeu>/` | 5 — dont **3 en HTTP 404** sur `data-es-categories` |
| dont `/api/records/1.0/analyze/` (les 5 graphiques + les 8 analyses régionales) | 14 |
| dont `/api/records/1.0/search/` (les 2 `ods-facets` + les facet-results) | 4 |
| dont `/api/explore/v2.1/catalog/datasets/data-es/records` | 13 |
| dont carte (`boundingbox` ×8, `geocluster`, `geopreview`) | 10 |
| dont `/api/records/1.0/download/` | 2 |
| **Octets d'API** | **55 Ko** |
| Durée cumulée | 8 898 ms (sans headless) / 11 647 ms (headless) |
| Durée médiane / max d'une requête | 173-185 ms / 970 ms |
| Ressources totales / poids | 193 / 143 Ko — 123 / 123 Ko en headless |

**48 requêtes et 55 Ko d'API pour cinq graphiques, deux cartes, quatre KPI et un tableau.**
Là encore, le coût est le nombre d'allers-retours : 1,1 Ko par réponse en moyenne. Trois de ces
48 requêtes sont des 404 sur un jeu inexistant, rejouées trois fois.

---

## 4. Défauts et bizarreries de l'original

1. **La note qui définit « structurant » est vide, et son lien est mort.**
   Le contexte `categories` pointe `data-es-categories`, un jeu qui **n'existe pas** :
   `/api/datasets/1.0/data-es-categories/` → **HTTP 404** (relevé trois fois dans l'onglet
   réseau à chaque chargement), `/api/explore/v2.1/catalog/datasets/data-es-categories` →
   `NotFoundResource`, et `/explore/dataset/data-es-categories/table/` → **302**. Résultat à
   l'écran : « ***Structurants : ( source ⧉ )*** ». Le tableau du bloc 5 a **deux colonnes sur
   six intitulées « Structurant seulement\* »**, et l'astérisque ne renvoie à rien.
2. **L'onglet « Rectorat » ne rend rien.** Vérifié à l'écran : le clic sélectionne bien
   l'onglet, le H4 devient « Détail par rectorat et département », puis **plus rien** — pas de
   `<select>`, pas de tableau, on passe directement à la note vide et à l'encadré. Cause :
   `ods-facet-results-facet-name="aca_nom"` sur le contexte `scolaireclubsdep`, qui est
   `data-es` — et **`data-es` n'a pas de champ `aca_nom`** (104 champs vérifiés à l'API,
   `aca_nom` absent ; les colonnes géographiques sont `reg_nom`, `dep_nom`, `dep_code`,
   `epci_code`, `lib_bdv`, `new_code`, `dens_lib`). La facette est donc vide, les deux branches
   `ng-if` sont fausses, et un demi-bloc de la page disparaît sans message ni erreur console.
3. **« 4 élèves par équipement pour l'Académie » est faux d'un facteur ~35.**
   La formule est `acastud / acaequip` ; `acastud` = `SUM(nombre_d_eleves)` sur `annuaire-educ`
   refiné par `aca_nom` (**champ qui existe** dans ce jeu) = **567 926** pour Bordeaux, vérifié.
   `acaequip` = `COUNT` sur `acadataes`, c'est-à-dire `data-es` refiné par
   `refine.aca_nom = 'Académie de Bordeaux'` — **sur un champ que `data-es` n'a pas**. Le refine
   est ignoré, et `acaequip` vaut donc le **total national** des équipements ouverts aux
   scolaires : **141 976**. 567 926 / 141 976 = **4,0002 → « 4 »**, exactement ce qui s'affiche.
   L'indicateur, mis juste sous « 60 élèves par équipement » pour l'EPCI, invite à conclure que
   l'académie de Bordeaux est quinze fois mieux dotée que le Grand Villeneuvois. C'est un
   artefact. **Même cause que le défaut n° 2** : `aca_nom` n'existe pas dans `data-es`.
4. **La légende du camembert des propriétaires est écrite à la main, sur-complète et
   désordonnée.** Dix entrées rendues par `ng-repeat` sur l'objet `propcolors`, dont **deux ne
   correspondent à aucune part** (Privé non commercial, Autre) ; l'ordre de la légende (Etat,
   Etablissement Public, Région, …) n'est pas celui des parts (Commune, Région, Département, …).
   Le camembert compte huit parts. Le 9ᵉ groupe de l'API, `equip_prop_type = null`
   (**138 équipements**), n'est ni dans le graphique ni dans la légende.
5. **Trois chiffres sur quatre ne sont pas formatés.** Le grand KPI du bloc 1 est
   « **29 452** » ; celui du bloc 5 est « **5680** », et toute la ligne « France » du tableau
   est brute : `29452 / 27611 / 5680 / 5270 / 7211 / 6816`. Le filtre `| number` manque sur ces
   interpolations, alors qu'il est présent sur `nbequip` et `epciequip`.
6. **Le lien « source » du grand chiffre ne mène pas au grand chiffre** : `29 452` affiché,
   `29 424` dans la table pointée (égalité stricte contre recherche plein texte sur une colonne
   à valeurs composées). Écart : **28**.
7. **Deux pages du même portail donnent deux chiffres pour le même indicateur.**
   « Équipements scolaires ouverts aux clubs » : **5 680** ici, **5 684** sur
   `/pages/portrait-territoire/`. Les deux sont exacts au regard de leur propre clause ; c'est
   la définition qui diffère, et rien ne le dit sur aucune des deux pages.
8. **Le taux d'ouverture, lui, n'existe que sur cette page.** La page « Portrait de
   territoire » affiche `5 684` puis, à la place du pourcentage, le libellé d'un lien
   (« non ouvert »). Ici le taux est calculé : **19 %**. La donnée est la même, la lisibilité
   ne l'est pas.
9. **La carte s'ouvre sur le planisphère** (échelle 3000 km), comme les deux autres pages du
   portail — la France y est une bulle « 27 712 » au milieu de l'Atlantique.
10. **`search-box="false"` est sans effet** : la loupe est présente. Même attribut ignoré qu'à
    la fiche id 13.
11. **Un EPCI codé en dur comme état initial.** Tout utilisateur qui arrive sur la page voit la
    fiche de la **CA du Grand Villeneuvois** (Lot-et-Garonne, 54 établissements). Rien ne
    signale que c'est un exemple ; le H3 affiche « Académie de Bordeaux - CA du Grand
    Villeneuvois » comme s'il s'agissait d'un résultat.
12. **Aucune synchronisation d'URL.** Choisir une région, un rectorat ou un EPCI ne change pas
    l'URL. Une page conçue pour être encastrée ailleurs ne peut donc pas être encastrée
    *pré-filtrée* — l'hôte ne peut pas dire « montre-moi mon EPCI ». C'est, pour une page
    `headless`, le défaut le plus contradictoire avec son propre usage.
13. **Le `<select>` de région s'auto-détruit à l'usage** (remplacé par un bouton « ‹ Bretagne »)
    : pour comparer deux régions il faut effacer puis rouvrir la liste. Même motif qu'à la
    fiche id 13, défaut n° 5.
14. **`annuaire-educ` a presque trois ans.** Métadonnée `modified` : **2023-10-19**. La page
    croise des équipements mis à jour quotidiennement avec un annuaire de la rentrée 2023, et
    parle de « la rentrée scolaire 2024 » dans son texte.
15. **Trois libellés pour une page** : « Équipements sportifs en milieu scolaire » (catalogue),
    « Équipements en milieu scolaire » (H1), « Équipements scolaires » (fil d'Ariane),
    « Equipements scolaire — Data ES » (`<title>`, sans accent ni accord).
16. **Le graphique « en capacité d'accueillir » n'est pas cliquable** alors que les quatre
    autres le sont, et que l'invite ne distingue pas — même incohérence qu'au bloc 5 de la page
    « Portrait de territoire ».
17. **Trois périmètres, aucun signal typographique.** 29 452 / 141 976 / 5 680 désignent trois
    populations différentes et se suivent sans que rien ne les distingue visuellement. Le
    lecteur pressé retiendra « 141 976 équipements scolaires », ce qui est faux.

---

## 5. Transposition vers `dsfr-data`

### 5.1 Le choix d'architecture

**Deux motifs superposés** : une **synthèse nationale** (blocs 1 à 5) et une **fiche par EPCI**
(bloc 6). Le second est le même maître-détail que « Portrait de territoire », en plus simple :
une seule maille (l'EPCI), trois jeux de détail, et **une clé pivot qui porte le même nom dans
deux jeux sur trois** (`epci_code` dans `data-es` et dans `annuaire-educ`, `nom_epci` — un
libellé — dans le jeu QPV).

Les huit contextes ODS se ramènent à **six sources**, parce que quatre d'entre eux ne diffèrent
que par leur `q` — ce qui, côté `dsfr-data`, est un `where` sur la balise déjà présente
(règle PG-015) :

| Contexte ODS | `dsfr-data` |
|---|---|
| `etabscoldataes`, `datamap`, `scolaireclubsdep` (même `q`) | **une** source `where="search(inst_part_type_filter,'scolaire')"` |
| `dataes`, `acadataes`, `grpscoldataes` (même `q`) | **une** source `where="search(equip_utilisateur,'Scolaire')"` |
| `scolaireclubs` | **une** source, ou mieux : un `group-by` sur la première (voir ci-dessous) |
| `dataestotal` | `select="count(*) as n" limit="1"` |
| `educ`, `acaeduc` | **une** source `annuaire-educ` |
| `qpv` | **une** source |

**Et le tableau régional à 23 lignes × 6 colonnes se ramène à UNE requête.** Les quatre
`ods-adv-analysis` (`perreg`, `perregstruc`, `clubperreg`, `clubperregstruc`) sont un
`group_by` sur trois champs :

```
group_by = reg_nom, categorie, equip_utilisateur   →  un compte par croisement
```

Vérifié comme motif à la fiche id 13 (5 jauges en 1 requête, 32 lignes, 273 ms). Ici la
troisième dimension est multivaluée (`equip_utilisateur` est un tableau JSON), donc la forme
sûre est plutôt **deux** requêtes : `group_by=reg_nom, categorie` (numérateurs de la moitié
gauche et droite) et la même avec `where=search(equip_utilisateur,'Clubs')`.
**Quatre allers-retours deviennent deux, et le recollage `| filter:{reg_nom:…}` disparaît.**

### 5.2 Tableau de correspondance

| Directive / composant Opendatasoft | Composant + attributs `dsfr-data` | Verdict |
|---|---|---|
| `<ods-dataset-context>` à 8 contextes, 5 `q` différents sur le même jeu | 6 `<dsfr-data-source api-type="opendatasoft" base-url="https://equipements.sports.gouv.fr" dataset-id="…" where="…">` — **pas d'`api-key-ref`** | natif |
| `q = '#search(champ,valeur)'` | `where="search(champ,'valeur')"` sur la balise déjà présente (dialecte ODSQL du `where` de `dsfr-data-source`) | natif |
| `ods-aggregation COUNT` (`nbequip`) | `<dsfr-data-kpi source="s-scol" value="meta:total" format="nombre">` — `meta:total`, jamais `count` en server-side | natif |
| `count(distinct inst_uai)` (13 036 UAI) | `select="count(distinct inst_uai) as t" limit="1"` + KPI `value="t:max"` ; l'agrégat `distinct` de la grammaire commune est **prévu #672 (v0.24.0)** | natif via `select` / prévu |
| `<ods-gauge display-mode="circle" max="nbtotal" value="nbacces">` (43 %) | `<dsfr-data-chart type="gauge">` attend **un pourcentage déjà calculé** (`gauge-value`, ou `value-field` d'une ligne unique). Les deux membres sont dans le même jeu (`data-es`), donc **#673 (v0.24.0)** donne le chemin direct : `<dsfr-data-kpi value="count:… / count" format="pourcentage">`. En attendant : `type="pie"` sur un `group-by="equip_utilisateur"` binaire, ou `gauge-value` calculé en amont | prévu (#673) ; contournement donut connu (fiche id 13, L1) |
| `<ods-chart chart-type="pie">` propriétaires + légende manuelle à 10 entrées | `<dsfr-data-chart type="pie" label-field="equip_prop_type" value-field="equip_numero__count" empty-label="Propriétaire non renseigné">` — la légende de DSFR Chart est **dérivée des parts rendues**, donc plus d'entrée fantôme, et `empty-label` **nomme** les 138 lignes nulles au lieu de les faire disparaître | natif, corrige les défauts n° 4 et n° 5 |
| `category-colors` (3 à 30 couleurs par valeur) | pas de `color-map` sur `dsfr-data-chart` (référence relue) | **manque réel — voir R6 de la fiche « Portrait de territoire »** (même constat, deux pages) |
| `refine-on-click-<ctx>-context-field="…"` sur les 4 graphiques cliquables | **rien sur `dsfr-data-chart`** (vérifié au source : `refine-on-click` n'existe que dans `dsfr-data-map-layer.ts`). Substitut : `<dsfr-data-facets context="ctx">` sur le même champ | **manque réel — voir R3 de la fiche « Portrait de territoire »** |
| `<ods-facets><ods-facet disjunctive="true" name="inst_part_type_filter">` (bloc 6) | `<dsfr-data-facets context="ctx" server-facets fields="inst_part_type_filter, equip_type_famille" labels="inst_part_type_filter:Type d'installation \| equip_type_famille:Famille d'équipements" display="inst_part_type_filter:checkbox \| equip_type_famille:checkbox">` — séparateur `\|` pour `labels`/`display`, `,` pour `fields` (PG-022) | natif |
| `ods-facet-results` + `<select>` de région | `<dsfr-data-facets context="ctx" server-facets fields="reg_nom" display="reg_nom:select">` — **et on peut passer d'une région à l'autre sans effacer** (défaut n° 13 corrigé) | natif |
| Le tableau 23 × 6 avec 4 `ods-adv-analysis` recollés par `\| filter:` | 2 sources `group-by="reg_nom, categorie"` + `<dsfr-data-list>` ou `<dsfr-data-display>` avec `<template>` ; **la colonne « Taux »** = ratio de deux agrégats du même jeu → **#673** | prévu (#673) |
| La clause « métropole » en 11 inégalités | `where="reg_nom not in ('Guadeloupe','Martinique',…)"` sur la balise déjà présente | natif |
| `<ods-map>` à 3 couches, planisphère | `<dsfr-data-map tiles="ign-plan" tiles-style="muted" center="46.6,2.3" zoom="6" fit-bounds>` + 3 `<dsfr-data-map-layer>` (`type="marker"` bleu, `type="marker"` vert, `type="geoshape"` rouge) + `<dsfr-data-map-legend>` **dérivée des couches** | natif, corrige le défaut n° 9 |
| Recherche d'EPCI (`ods-results` sur `insee-epci`) | `<select class="fr-select" id="sel-epci">` peuplé par `<dsfr-data-facets server-facets display="epci_nom:select">` (1 360 valeurs) **ou** `<dsfr-data-search server-search count>` ; puis `<dsfr-data-context-filter apply-to="…" field="epci_code" ui="sel-epci">` | natif |
| La diffusion de l'EPCI à `dataes`, `educ` et `qpv` (3 noms de colonne : `epci_code`, `epci_code`, `nom_epci`) | 2 `<dsfr-data-context-filter>` sur le même `ui` : `field="epci_code" apply-to="s-es s-educ"` et `field="nom_epci" apply-to="s-qpv"`. **Vérifié au source** (`dsfr-data-context.ts:316-322`, `dsfr-data-context-filter.ts:325-328`), **non rejoué au navigateur** | natif (à confirmer) |
| `acadataes.parameters['refine.aca_nom']` sur `data-es` | **ne se transpose pas : le champ n'existe pas.** Le bon montage est une **jointure** `data-es` × `insee-departements` (qui porte `aca_nom`) sur `dep_code`, ou un filtre par la liste des départements de l'académie. Voir R10 | manque réel (R10) |
| `acastud / acaequip` (élèves par équipement, académie) | numérateur `annuaire-educ`, dénominateur `data-es` : **ratio inter-jeux** | **manque réel — R1 de la fiche « Portrait de territoire »** |
| `epcistud / epciequip` (élèves par équipement, EPCI) | idem : `SUM(nombre_d_eleves)` sur `annuaire-educ` / `COUNT` sur `data-es` | **manque réel (R1)** |
| Rien dans l'original | `url-sync` sur le contexte — corrige le défaut n° 12, **indispensable pour une page destinée à l'iframe** | natif |
| Rien dans l'original | `<dsfr-data-a11y table download>` — la page n'a aucun export ni aucune alternative non graphique | natif, meilleur |

### 5.3 Esquisse de code (squelette)

```html
<!-- ── Portail Sports : ouvert, CORS *, aucune clé ─────────────────────── -->
<!-- Les trois périmètres, nommés une bonne fois -->
<dsfr-data-source id="s-dans-ecole" api-type="opendatasoft"
  base-url="https://equipements.sports.gouv.fr" dataset-id="data-es"
  where="search(inst_part_type_filter,'scolaire')"
  select="count(*) as n" limit="1"></dsfr-data-source>

<dsfr-data-source id="s-pour-scolaires" api-type="opendatasoft"
  base-url="https://equipements.sports.gouv.fr" dataset-id="data-es"
  where="search(equip_utilisateur,'Scolaire')"
  select="count(*) as n" limit="1"></dsfr-data-source>

<dsfr-data-source id="s-parc-total" api-type="opendatasoft"
  base-url="https://equipements.sports.gouv.fr" dataset-id="data-es"
  select="count(*) as n" limit="1"></dsfr-data-source>

<!-- Le tableau régional : DEUX requêtes au lieu de quatre -->
<dsfr-data-source id="s-reg" api-type="opendatasoft"
  base-url="https://equipements.sports.gouv.fr" dataset-id="data-es"
  where="search(inst_part_type_filter,'scolaire')"
  group-by="reg_nom, categorie" aggregate="equip_numero:count"></dsfr-data-source>
<dsfr-data-source id="s-reg-clubs" api-type="opendatasoft"
  base-url="https://equipements.sports.gouv.fr" dataset-id="data-es"
  where="search(inst_part_type_filter,'scolaire') and search(equip_utilisateur,'Clubs')"
  group-by="reg_nom, categorie" aggregate="equip_numero:count"></dsfr-data-source>

<!-- La fiche EPCI : trois jeux, une clé -->
<dsfr-data-source id="s-educ" api-type="opendatasoft"
  base-url="https://equipements.sports.gouv.fr" dataset-id="annuaire-educ"
  where="code_nature in (101,103,151,153,162,169,300,301,302,306,307,310,315,320,332,334,335,340,344,345,349,350,352,400)"
  select="count(*) as etabs, sum(nombre_d_eleves) as eleves" limit="1"></dsfr-data-source>
<dsfr-data-source id="s-educ-pts" api-type="opendatasoft" … max-records="20000"></dsfr-data-source>
<dsfr-data-source id="s-qpv" api-type="opendatasoft" …
  dataset-id="quartiers-prioritaires-de-la-politique-de-la-ville-qpv"></dsfr-data-source>

<h1>Équipements sportifs en milieu scolaire</h1>

<!-- ── Trois périmètres, trois KPI, et les trois libellés qui vont avec ── -->
<dsfr-data-kpi-group>
  <dsfr-data-kpi source="s-dans-ecole" value="n:max" format="nombre" col="4"
    heading="Dans une enceinte scolaire"
    label="équipements sportifs situés dans un établissement scolaire"></dsfr-data-kpi>
  <dsfr-data-kpi source="s-pour-scolaires" value="n:max" format="nombre" col="4"
    heading="Ouverts aux scolaires"
    label="équipements en capacité d'accueillir scolaires et universitaires"></dsfr-data-kpi>
  <!-- part du parc : deux agrégats du MÊME jeu → #673 (v0.24.0) -->
  <dsfr-data-kpi source="s-parc-crit" value="count:… / count" format="pourcentage" col="4"
    heading="Part du parc" label="du parc sportif national"></dsfr-data-kpi>
</dsfr-data-kpi-group>

<!-- ── Le sélecteur d'EPCI, diffusé aux trois jeux ─────────────────────── -->
<label class="fr-label" for="sel-epci">Établissement public de coopération intercommunale</label>
<select class="fr-select" id="sel-epci"><option value="">France entière</option>…</select>

<dsfr-data-context id="ctx" url-sync sources="s-es-epci s-educ s-educ-pts s-qpv">
  <dsfr-data-context-filter apply-to="s-es-epci s-educ s-educ-pts"
    field="epci_code" label="EPCI" ui="sel-epci"></dsfr-data-context-filter>
  <!-- le jeu QPV ne porte pas le code mais le libellé : second filtre, même UI -->
  <dsfr-data-context-filter apply-to="s-qpv"
    field="nom_epci" ui="sel-epci-nom"></dsfr-data-context-filter>
</dsfr-data-context>
<dsfr-data-context-tags for="ctx"></dsfr-data-context-tags>

<!-- ── La carte à trois couches, cadrée sur la France ──────────────────── -->
<dsfr-data-map id="carte" name="Établissements scolaires, équipements et QPV"
  tiles="ign-plan" tiles-style="muted" center="46.6,2.3" zoom="6" fit-bounds>
  <dsfr-data-map-layer source="s-educ-pts" type="marker" cluster color="#169B62"
    label="Établissements scolaires" geo-field="position"></dsfr-data-map-layer>
  <dsfr-data-map-layer source="s-es-epci" type="marker" cluster color="#253791"
    label="Équipements accessibles aux scolaires" geo-field="equip_coordonnees"
    max-items="20000"></dsfr-data-map-layer>
  <dsfr-data-map-layer source="s-qpv" type="geoshape" color="#CE614A"
    label="Quartiers prioritaires de la politique de la ville"></dsfr-data-map-layer>
</dsfr-data-map>
<dsfr-data-map-legend for="carte"></dsfr-data-map-legend>

<!-- ── Les facettes remplacent les graphiques cliquables ───────────────── -->
<dsfr-data-facets context="ctx" server-facets
  fields="equip_prop_type, equip_type_famille, inst_part_type_filter"
  labels="equip_prop_type:Propriétaire | equip_type_famille:Famille | inst_part_type_filter:Type d'installation"
  display="equip_prop_type:select | equip_type_famille:checkbox | inst_part_type_filter:checkbox">
</dsfr-data-facets>

<dsfr-data-chart type="pie" source="s-prop"
  label-field="equip_prop_type" value-field="equip_numero__count"
  empty-label="Propriétaire non renseigné"
  databox databox-title="Type de propriétaires (bâti)"
  databox-source="Data ES, Ministère des Sports" databox-download></dsfr-data-chart>

<!-- ── Ce que l'original n'a pas ───────────────────────────────────────── -->
<dsfr-data-a11y source="s-reg" table download filename="ouverture-clubs-par-region.csv"
  label="Taux d'ouverture aux clubs, par région"></dsfr-data-a11y>
```

---

## 6. Limites et points durs identifiés

Cible : **`dsfr-data` 0.25.0** (`_CIBLE-0.25.md`), pas la version 0.20.0 épinglée par le dépôt.

### Déjà consignés sur la fiche « Portrait de territoire », confirmés ici par une seconde page

- **R1 — ratio inter-jeux.** « Élèves par équipement » = `SUM(nombre_d_eleves)` sur
  `annuaire-educ` divisé par `COUNT` sur `data-es`. **#673 (v0.24.0) ne le couvre pas** : le
  corps de l'issue dit « chaque côté = grammaire actuelle », évaluée sur la source du KPI, et un
  `dsfr-data-kpi` n'a qu'un attribut `source`. Deux pages sur deux, deux portails sur deux :
  c'est le besoin structurel de toute fiche de territoire. **Manque réel.**
- **R3 — un graphique n'est pas cliquable.** Quatre des cinq graphiques de cette page portent
  un `refine-on-click`. Vérifié au source : `refine-on-click` n'existe que sur
  `dsfr-data-map-layer`. **Manque réel** (substitut : `dsfr-data-facets context="ctx"`).
- **R6 — pas de `color-map` sur un graphique.** Trois palettes nommées ici
  (`propcolors` 10 entrées, `Ecole/Collège/Lycée` 3 entrées). **Manque réel.**

### Résidu propre à cette page

### R10 — Filtrer un jeu par une maille qu'il ne porte pas. **Manque réel.**

*Obstacle* : la page veut compter les équipements « de l'académie de Bordeaux » dans `data-es`.
`data-es` porte `dep_code` et `reg_nom`, **pas** `aca_nom`. Le référentiel `insee-departements`
porte le triplet `dep_code / dep_nom / aca_nom`, et `insee-epci` porte `epci_code / aca_nom`.
L'original s'en tire mal (défaut n° 3 : le refine est ignoré, le chiffre est national).
*Voie native essayée* : `<dsfr-data-join left="s-es" right="s-dep" on="dep_code">` puis un
`where` sur `aca_nom`. **La jointure est côté client** : elle suppose d'avoir rapatrié les
lignes de `data-es`, soit 141 976 ici — au-delà du mur des 10 000 offsets, donc dépendante de
`fetch-mode="export"` (#689, v0.25.0), et de toute façon disproportionné pour obtenir un compte.
Une autre voie serait de résoudre l'académie en **liste de départements** côté page et de poser
`where="dep_code in (…)"` — mais c'est du JavaScript de page, pas du déclaratif.
*Demande à formuler* : **un filtre de contexte qui traverse un référentiel** — « la valeur
choisie dans l'UI est une clé de la source A ; filtrer la source B sur la colonne C, pour
l'ensemble des valeurs que A associe à cette clé ». C'est le motif « académie → départements »,
« EPCI → communes », « bassin de vie → communes ». Le portail Éducation le rencontre partout
(académie, région académique) ; Bercy ne l'avait pas.
*Repli acceptable en attendant* : ne proposer que les mailles réellement portées par le jeu
principal (région, département, EPCI, commune) — c'est-à-dire **retirer l'onglet Rectorat**, ce
qui est de toute façon ce que fait l'original, involontairement.

### R11 — Rien pour dire qu'une colonne filtrée n'existe pas. **Manque réel (diagnostic).**

*Obstacle* : les défauts n° 2 et n° 3 ont la même cause — un refine sur `aca_nom`, champ absent
de `data-es` — et **aucun des deux ne produit d'erreur**. Ni console, ni HTTP non-200 : ODS
ignore le refine, la facette rend une liste vide, un demi-bloc de page disparaît et un KPI
affiche un nombre faux mais plausible. J'ai mis un moment à trouver, et je n'y suis arrivé qu'en
listant les 104 champs à l'API.
*Voie native cherchée* : `dsfr-data-source` émet `dsfr-data-error` sur un échec de fetch ;
`dsfr-data-query` expose `getDelegation()` (quelles opérations ont été déléguées) et
`reportConfigError` signale une clause non parsable ; `dsfr-data-map-layer` expose
`getSkippedCount()`. **Rien n'existe pour « le champ que vous filtrez n'est pas dans le
schéma »** — alors que l'adaptateur ODS connaît le schéma (il appelle `/catalog/datasets/<id>`).
*Demande à formuler* : à la première requête, comparer les champs cités dans `where`,
`group-by`, `aggregate`, `select`, `fields` (facettes) et `geo-field` au schéma renvoyé par
l'API, et **signaler en console** ceux qui n'existent pas. C'est un correctif de diagnostic, pas
une fonctionnalité — mais c'est exactement la classe de bug que le lot 12 a rencontrée le plus
souvent (`_CIBLE-0.25.md`, « si la bibliothèque aide à voir le problème ou le masque »).
*Voisin, distinct* : le point 4 du résidu de `_CIBLE-0.25.md` (`map-reg` attend des codes ISO,
carte grise avec `getSkippedCount() = 0`) est le même symptôme sur les valeurs ; ici c'est sur
les **noms de colonnes**.

### R12 — L'encastrement. **Manque réel, ou non-sujet — à trancher, et rien au backlog.**

*Constat* : cette page **est** l'unique entrée du catalogue dont l'URL porte `?headless=true`.
Le portail a donc un mode « je suis un fragment ». Rien dans le backlog `dsfr-data` (22 issues
ouvertes au 2026-09-10, relues) ne traite de l'encastrement.
*Position du banc* : une dataviz `dsfr-data` **n'a pas besoin d'être encastrée** — elle est le
contenu de la page hôte. C'est un argument, pas un manque, et le § 1 le chiffre : le mode
headless du portail économise 70 ressources et 20 Ko de chrome, et **rien** sur les 48 requêtes
d'API et les 27 scripts du moteur.
*Mais deux questions restent ouvertes, et méritent d'être posées plutôt que présumées* :
1. **Le cas où l'hôte n'est pas maître de son DOM** (un CMS qui n'autorise qu'un `<iframe>`, un
   intranet). Y a-t-il une recommandation `dsfr-data` pour ce cas — un `<iframe>` vers une page
   `dsfr-data` minimale, avec quelle hauteur, quel `title`, quel comportement au redimensionnement ?
   Rien n'est écrit. Une page de guide suffirait.
2. **La réciproque du défaut n° 12** : pour être encastrée utilement, une page doit accepter son
   état par l'URL. `url-sync` (#231, ADR-031) fait exactement cela et **le fait mieux que le
   portail**, qui ne le fait pas du tout. À dire dans l'analyse : *l'iframe sans état d'URL est
   un cul-de-sac ; `dsfr-data` sans iframe mais avec `url-sync` rend le service que l'iframe
   promettait.*

### Prévu, à ne pas consigner comme limite

- **La part et les taux** (43 % de la jauge, 19 % et 41 % du tableau régional, 8,8 % du
  portrait) : deux agrégats du **même** jeu → **#673 (v0.24.0)**.
- **Un KPI filtré à côté d'un KPI global** (les colonnes « Exhaustivité » et « Structurant
  seulement » du même tableau) → **#674 (v0.24.0)**.
- **`count(distinct inst_uai)`** → **#672 (v0.24.0)** ; en attendant, le `select` ODSQL brut
  passe tel quel.
- **Charger les points de la carte** (29 452 puis 141 976) : au-delà des 10 000 offsets →
  **#689 (v0.25.0)**, `fetch-mode="export"`. Ici la carte se règle aussi par `bbox` + `cluster`.
- **Ne rien charger avant qu'un EPCI soit choisi** (le bloc 6 charge une fiche d'exemple codée
  en dur, défaut n° 11) → **#690 (v0.25.0)**, `require-where` + état `idle`.

### Non-limites

- **Les 48 requêtes.** Elles se ramènent à ~10 sources par `group-by` multi-champs et par
  fusion des contextes qui ne diffèrent que par leur `q`. Ce n'est pas une fatalité du sujet.
- **La légende manuelle, les couleurs en dur, le planisphère, le `<select>` qui s'auto-détruit.**
  Tous corrigés d'office par les composants natifs, et à dire comme tels dans l'analyse.

---

## 7. Données à reproduire fidèlement

- [ ] **Les trois périmètres, nommés et distingués** : **29 452** dans une enceinte scolaire ·
      **141 976** utilisables par des scolaires (**43 %** du parc) · **5 680** dans une enceinte
      scolaire et ouverts aux clubs. Plus **13 036 UAI uniques**.
- [ ] **Le camembert des propriétaires** : 11 469 Commune · 5 440 Région · 5 328 Département ·
      3 401 Établissement d'enseignement privé · 1 472 Établissement Public · 1 301
      Association(s) · 671 EPCI · 232 État — **et les 138 lignes à propriétaire nul**, que
      l'original masque.
- [ ] **Le top 10 des familles en enceinte scolaire** : 7 032 / 5 707 / 4 050 / 3 411 / 2 296 /
      1 540 / 1 470 / 1 181 / 991 / 496.
- [ ] **Le top 10 des types accessibles aux scolaires** : 18 173 Terrain de football / 17 271
      Salle multisports (gymnase) / 16 697 Multisports-City-stades / 11 813 Court de tennis /
      8 782 Salles polyvalentes / 5 643 / 5 059 / 4 351 / 3 959 / 2 833.
- [ ] **Le tableau régional complet** : 23 régions × 6 colonnes (§ 3 bloc 5), plus la ligne
      France 29452 / 5680 / 19 % / 7211 / 2924 / 41 % et sa variante métropole 27611 / 5270 /
      19 % / 6816 / 2771 / 41 %.
- [ ] **Le détail par département** sous chaque région.
- [ ] **Le rectorat**, ou son retrait assumé. L'original propose un onglet qui ne rend rien.
      Le reproduire suppose de résoudre R10 ; ne pas le reproduire suppose de le dire.
- [ ] **La fiche EPCI** : pour la CA du Grand Villeneuvois (`epci_code` 200023307) — 54
      établissements, 146 équipements, 8 739 élèves, 2 QPV, 60 élèves par équipement.
      **Ne pas reproduire le « 4 élèves par équipement pour l'Académie »** : il est faux
      (défaut n° 3). La valeur juste demande R10.
- [ ] **La carte** : 29 443 équipements scolaires géolocalisés (**9 sans coordonnées**),
      trois couches sur la fiche EPCI, cadrée sur la France.
- [ ] **La définition de « structurant »**, que l'original ne rend pas (jeu inexistant). La
      liste figure en clair dans la note de bas de tableau de « Portrait de territoire » :
      *aire de sports de glace sportive, bassin sportif et mixte, arènes, stade d'athlétisme,
      salle de spectacle / zenith, salle multisports (gymnase), anneau / piste de cyclisme,
      vélodrome, carrière, manège, stade d'aviron, site d'activités aquatiques et nautiques,
      salle de basket, volley, culturisme, tennis de table, escrime, squash, handball,
      racquetball, badminton, gymnastique sportive, terrain de soccer, de football, de rugby et
      mixte.*
- [ ] **Le texte éditorial** : « A quoi correspond ce chiffre? », le paragraphe UAI, le
      paragraphe sur l'ouverture aux clubs et ses deux liens (BO n° 34 du 11 septembre 2025,
      exemple de convention), l'encadré « Atteindre le 100% d'ouverture ? ». C'est le sens de la
      page ; l'omettre en ferait un tableau sans propos.

### À corriger par rapport à l'original (et à dire dans l'analyse de la page)

1. Rendre la définition de « structurant » (le jeu source a disparu), ou retirer l'astérisque.
2. Faire fonctionner le détail par rectorat, ou retirer l'onglet.
3. Supprimer « 4 élèves par équipement pour l'Académie » : la valeur est fausse.
4. Une seule définition du périmètre « ouvert aux clubs » entre les deux pages du portail
   (5 680 ici, 5 684 sur « Portrait de territoire »).
5. Faire pointer le lien « source » sur la clause qui a produit le chiffre (29 452, pas 29 424).
6. Formater tous les nombres en `fr-FR`.
7. Dériver les légendes des données rendues ; nommer le groupe `null`.
8. Cadrer la carte sur la France.
9. Activer `url-sync` — **c'est la condition pour qu'une page destinée à l'iframe soit
   réellement réutilisable**.
10. Ne pas afficher une fiche EPCI codée en dur comme état initial (`require-where`, #690).
11. Ajouter `dsfr-data-a11y` : ni export ni alternative non graphique dans l'original.
12. Signaler l'ancienneté d'`annuaire-educ` (2023-10-19) à côté d'un `data-es` quotidien.
