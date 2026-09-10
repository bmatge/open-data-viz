# Éducajou — ÉcoleMap

> **⚠️ Mise à jour du 2026-09-10 — les jalons v0.24.0 et v0.25.0 sont livrés.**
> Cette fiche a été écrite le matin même, quand ils étaient encore en cours ; elle y renvoie
> donc au futur (« prévu au jalon v0.25.0 »). **Tout ce qui y est annoncé comme prévu est
> désormais disponible** : `dsfr-data@0.25.0` livre `fetch-mode="export"` (#689) et
> `require-where` (#690), et le dépôt est monté en 0.25.0. Les analyses ne sont pas réécrites —
> elles disent ce qui a été rencontré au moment du portage, et c'est leur valeur. Pour l'état
> courant du backlog et les quatre verdicts, voir [`_CIBLE-0.25.md`](_CIBLE-0.25.md).


- **URL du catalogue** : https://educajou.forge.apps.education.fr/ecolemap/ — **200**, page vivante.
- **Id catalogue** : 26 · **Thématique** : Éducation (pas de sous-thématique) · **Filtre** : aucun.
  Titre au catalogue : « Vue cartographique d'un établissement produite par la forge des communs
  numériques éducatifs ». Description : « Recherche et visualisation cartographique d'un
  établissement, intégrée à la forge des communs numériques
  (https://docs.forge.apps.education.fr/) ». Vignette `/assets/theme_image/educajou.jpg`.
- **Nature de la cible** : **ce n'est pas une page Opendatasoft.** Ni page AngularJS `/pages/`
  (pas de `$scope.blocks`), ni page Studio (`/api/portal/v1.0/studio_pages/…` sans objet), ni vue
  d'actif. C'est une **application web statique** publiée en GitLab Pages sur la **forge des communs
  numériques éducatifs** (`forge.apps.education.fr`), l'instance GitLab de l'Éducation nationale.
  **C'est la seule cible du lot 12 qui n'a rien du modèle ODS à transposer.**
- **Dépôt source** : https://forge.apps.education.fr/educajou/ecolemap — **public**, branche `main`,
  créé le **2024-11-29**, dernière activité le **2026-03-16**, 1 étoile, 0 fork, aucun fichier de
  licence déclaré à GitLab mais **licence GNU GPL annoncée dans le README**.
  Auteur : **Arnaud Champollion** (mention dans le code et dans le README).
  Éducajou est un ensemble d'applications pédagogiques de la même forge
  (page d'accueil `https://educajou.forge.apps.education.fr/`, liée à PrimTux et à un salon Tchap).
- **Relevé visuel** : 2026-09-10, Chrome (extension), viewport 1 568 × 751 CSS px.
  **Aucun bandeau cookies** sur ce domaine (voir § Défauts, n° 8).
- **Sources archivées** : `docs/portail-education/_sources/ecolemap.html`,
  `ecolemap.script.js` (433 lignes), `ecolemap.README.md`.

## La question à trancher d'abord : est-ce dans le périmètre du banc d'essai ?

**Oui.** Le lien sort du portail, mais la **donnée y est**. La leçon LIM-006 s'applique à la lettre :
un lien hors portail ne prouve pas que la donnée n'y est pas.

Vérifié dans le code servi (`script.js`, fonctions `getEtablissement` et `getEtablissements`) et au
réseau, dans le navigateur :

```
GET https://data.education.gouv.fr/api/records/1.0/search/
      ?dataset=fr-en-annuaire-education&q=identifiant_de_l_etablissement:0160889E&rows=1
```

L'application **n'a pas de donnée propre** : pas de fichier statique embarqué, pas de base, pas
d'API tierce de contenu. Elle interroge **`fr-en-annuaire-education` sur `data.education.gouv.fr`**,
en **API v1** (`/api/records/1.0/search/`), en anonyme, à chaque frappe. Le README le dit
explicitement, et les neuf requêtes relevées au réseau le confirment.

Un seul service tiers intervient, et seulement pour la **position** : l'**API Overpass
d'OpenStreetMap** (`overpass-api.de`), interrogée sur le tag `ref:UAI`. Le code la préfère à la
position du portail, et retombe sur `position` du jeu quand OSM ne connaît pas l'UAI (vu en console :
« Recherche sur OSM de 0160889E » puis « position déterminée par Data.gouv.fr »).
**Le README ne mentionne pas ce détour par OSM** : il annonce des coordonnées « renvoyées par l'API
de data.education.gouv.fr ». Divergence code/documentation.

**La cible est donc reproductible avec `dsfr-data`**, et c'est une comparaison intéressante : une
application maison de 433 lignes de JavaScript contre une poignée de balises.

## La pile réelle

| Élément | Ce que c'est |
|---|---|
| Framework | **aucun**. JavaScript natif, 433 lignes, `document.getElementById`, `fetch`, template literals |
| Bibliothèque de carte | **aucune non plus** — ni Leaflet, ni MapLibre, ni OpenLayers. La « carte » est un **`<iframe>`** vers `https://www.geoportail.gouv.fr/embed/visu.html?c=<lon>,<lat>&z=19&l0=…&permalink=yes`, `sandbox="allow-forms allow-scripts allow-same-origin"`. Changer de vue = **réécrire `iframe.src`** |
| Fonds de carte | deux couches WMTS du Géoportail, basculées par un bouton : `ORTHOIMAGERY.ORTHOPHOTOS` (défaut) et `OPEN_STREET_MAP`. Attribution rendue par l'iframe : « © IGN, Planet Observer », ou « © IGN, FEDER, Région Pays-de-la-Loire, Préfecture de la région Pays-de-la-Loire » selon l'emprise |
| Données | `fr-en-annuaire-education`, **API v1 d'Opendatasoft** sur `data.education.gouv.fr`, sans clé |
| Géolocalisation | **Overpass API** (`overpass-api.de`, service communautaire allemand) sur `ref:UAI`, avec repli sur `position` du jeu |
| CSS | `style.css` maison, **3 740 octets**. **Zéro DSFR** (aucune occurrence de `fr-`, `dsfr` ou `marianne` dans la feuille). Bandeau bleu ardoise, icônes en **émojis** (🔎 ✉️ ☎️ 🇫🇷 📌) |
| Dépendances JS servies | `dom.js` (2 904 o) et `dom-to-image-more.min.js` (16 581 o) — **toutes deux mortes**, voir défauts n° 10 et 11 |
| Mesure d'audience | **Matomo**, `https://wa.phm.education.gouv.fr/snp/`, `idsite=17`, posé en dur dans le `<head>`, `trackPageView` **au chargement, sans consentement** |
| Synchronisation d'URL | `?uai=XXXXXXXX`, posé par `history.replaceState` et relu au chargement. **La seule chose que la page fait mieux que la moitié du portail** |

## Le jeu de données

**`fr-en-annuaire-education`** — « Annuaire de l'éducation », **68 608 lignes**, **71 champs**,
producteur **DNE — Ministère de l'Éducation Nationale**, **Licence Ouverte v2.0 (Etalab)**,
donnée modifiée le **2026-09-10 05:01 UTC** (quotidienne). API ouverte sans clé.

- `type_etablissement` : **Ecole 48 383** · Collège 9 186 · Lycée 5 645 · Médico-social 2 311 ·
  Service Administratif 1 961 · Information et orientation 418 · Autre 374 · **null 250** · EREA 80.
  **L'application filtre sur `École OR Collège OR Lycée` → 63 214 établissements** (92,1 % du jeu) ;
  elle exclut donc les EREA, le médico-social, les CIO et les services administratifs.
- `etat` : OUVERT 68 606 · **A FERMER 2**. L'application n'exploite pas ce champ.
- **429 lignes sans `position`.**
- Facettes déclarées au back-office : **34**, dont `type_etablissement`, `libelle_academie`,
  `libelle_departement`, `libelle_region`, `nom_commune`, `code_postal`, `statut_public_prive`,
  `appartenance_education_prioritaire`, `ulis`, `segpa`, `restauration`, `hebergement`,
  `section_sport`, `section_internationale`, `lycee_des_metiers`, `greta`, `ministere_tutelle`…
  **L'application n'en utilise aucune.**
- Champs affichés par l'application (7 sur 71) : `nom_etablissement`, `adresse_1`, `adresse_2`,
  `code_postal`, `nom_commune`, `mail`, `telephone`, plus `nom_circonscription` /
  `code_circonscription` et `position`.

## Objectif de l'application et informations véhiculées

- **Question à laquelle elle répond** : « À quoi ressemble, vu du ciel, le quartier de tel
  établissement scolaire ? » Ce n'est **pas** une dataviz : il n'y a ni agrégat, ni comparaison, ni
  distribution, ni classement. C'est un **localisateur d'un établissement à la fois**, à l'échelle
  du bâtiment.
- **Message porté** : aucun. La page n'énonce rien ; elle sert un outil.
- **Ce que l'utilisateur doit obtenir** : trouver un établissement par son nom, sa commune ou son
  UAI, voir son emprise sur l'orthophoto IGN au zoom 19, lire son adresse, son courriel, son
  téléphone et sa circonscription, et repartir avec une URL partageable.
- **À qui elle s'adresse** : le cas d'usage se lit dans les champs choisis — courriel académique
  `ce.<uai>@ac-…`, téléphone, circonscription du 1er degré. C'est un outil de **professionnel de
  l'éducation** (directeur, IEN, circonscription), pas de grand public.
- **Ce qui n'est pas dans l'objet** :
  - **aucune vue d'ensemble** : jamais plus d'un établissement à l'écran, jamais de couche de points ;
  - **aucun filtre** sur les 34 facettes du jeu (secteur, académie, éducation prioritaire, ULIS,
    SEGPA, restauration, internat…) ;
  - **aucun des 61 autres champs** de l'annuaire — le site web de l'établissement, la fiche Onisep,
    le SIRET, le statut public/privé, les sections, l'appartenance à l'éducation prioritaire sont
    tous dans la donnée et aucun n'est affiché ;
  - **aucune donnée agrégée**, donc rien qui ressemble à la « dataviz » que le catalogue annonce ;
  - **aucun export**, aucun téléchargement (le bouton prévu ne fonctionne pas, défaut n° 10).

## Relevé visuel exhaustif

### 1. Bandeau supérieur (`#haut`), fond bleu ardoise, pleine largeur

De gauche à droite :

- **Logo Éducajou** rond (`images/educajou.png`, une mascotte cartable), lien vers `../`
  (l'accueil Éducajou). **Pas d'`alt`.**
- **Deux champs de saisie empilés** (`#saisie`), placeholders **« 🔎 Nom, adresse ou commune »** et
  **« 🔎 UAI (RNE) »** (`maxlength="8"`). **Aucun `<label>`** : le seul intitulé est le placeholder,
  qui disparaît à la saisie (RGAA 11.1).
- **Bloc `#infos`** en texte blanc, sur deux lignes :
  > « Affichez un établissement scolaire sur fond Orthophoto IGN ou Openstreetmap.
  > Les données proviennent de **l'API data.education.gouv.fr**. **Infos sur cette application** »

  Le premier lien pointe vers la vue table du jeu sur le portail (avec ses sept `disjunctive.*`),
  le second vers l'ancre `#écolemap` du README sur la forge.
- **Un bouton de bascule de fond** (`#bouton-fonds`, `onclick="changeFond()"`), **sans intitulé
  textuel** : à l'écran, une **vignette photo carrée** en haut à droite (un aperçu de l'autre fond)
  avec un petit « i ». Rien ne dit ce qu'il fait.

En **mode portrait**, le bloc `#infos` est déplacé de `#haut` vers `#bas` par un
`matchMedia("(orientation: portrait)")` — la seule concession au responsive.

### 2. Liste de résultats (`#resultats-recherche`)

Panneau blanc flottant sous les champs, chaque ligne = **`<strong>nom</strong><br>commune (dep)`**,
le code département étant amputé de son zéro de tête (`'016'` → `'16'`). **Ce sont des `<p>`
cliquables, pas des `<button>` ni des `<a>` : la liste n'est ni focusable, ni navigable au clavier**
(RGAA 7.1). Elle se ferme sur n'importe quel clic dans la fenêtre et sur `blur`.

**Relevé à l'écran, recherche « Ouessant »** (capture du 2026-09-10) — sept lignes, précédées de
la mention **« Aucun résultat »** :

```
Aucun résultat
Collège de Ouégoa                                  Ouégoa (988)
Ecole primaire Omessa Francardo bilingue LCC       Omessa (2B)
Ecole primaire de Ouégoa                           Ouegoa (988)
Ecole primaire de Paimboas                         Ouegoa (988)
Ecole Primaire Publique Jules Verne                Ousse (64)
E.M.PU OUEST 13 rue de l'Ouest                     Paris 14e Arrondissement (75)
ECOLE MATERNELLE OUEST                             Dijon (21)
```

**Aucune de ces sept écoles n'est à Ouessant.** L'école d'Ouessant existe pourtant dans le jeu
(`0290851T`, « Ecole primaire publique Jacques Burel », Ouessant, type `Ecole`). Voir défauts
n° 1 à 3.

### 3. Bloc d'informations, une fois un établissement choisi

Le bloc `#infos` est **remplacé** par deux sections, relevées mot pour mot sur `?uai=0160889E` :

```
Ecole élémentaire Condorcet          ✉️ ce.0160889E@ac-poitiers.fr
2 rue des Colis                      ☎️ 0545950590
16000 Angoulême                      🇫🇷 Voir sur data.education.gouv.fr
Circonscription d'Angoulême Est      📌 Openstreetmap  📌 Google Maos
```

- Le nom de la circonscription est nettoyé du fragment « d'inspection du 1er degré » et devient un
  lien vers la vue table du jeu filtrée sur `code_circonscription`.
- « Voir sur data.education.gouv.fr » → `/explore/dataset/fr-en-annuaire-education/table/?q=<uai>`.
- **« Google Maos »** : la faute de frappe est dans le code source et **s'affiche telle quelle**.
- L'adresse, le courriel et le téléphone portent la classe `hide-mobile` : **en portrait, il ne
  reste que le code postal et la commune.**
- Un second relevé sur `?uai=0530011Z` donne « Lycée Douanier Rousseau / 7 rue des Archives BP 11339
  / 53013 Laval / ce.0530011z@ac-nantes.fr / 02 43 53 04 60 » — **sans ligne de circonscription**
  (champ vide pour le second degré, la ligne reste dans le DOM mais vide).

### 4. La carte (`#zonecarte` → `<iframe id="carte">`)

- **Au chargement** : `c=1.6207813872013777,47.201944857404385&z=6`, fond Orthophoto. À l'écran, une
  vue satellite de la France entière et d'une partie de l'Europe, échelle **200 km**, logo
  **géoportail** + bloc **RÉPUBLIQUE FRANÇAISE** en haut à droite, contrôles `+` / `−` en haut à
  gauche, bouton plein écran en bas à droite, mention « © IGN, Planet Observer » sous le cadre.
  **Aucune donnée n'est affichée** : la carte d'accueil est un fond, rien d'autre.
- **Après sélection** : `iframe.src` est réécrit avec `c=<lon>,<lat>&z=19`. L'échelle passe à
  **20 m**.
- **Aucun marqueur, aucune épingle, aucun cerclage.** L'établissement est « au centre », et c'est
  tout : sur une orthophoto de centre-ville, rien ne distingue l'école de l'immeuble voisin.
  **C'est le manque le plus visible de l'application** — elle s'appelle ÉcoleMap et ne montre pas
  où est l'école.
- **Défaut de premier rendu, reproduit deux fois** : au premier passage au zoom 19, le cadre reste
  **gris uni pendant plus de quinze secondes** (mesuré : 6 s, puis 8 s de plus, toujours gris), alors
  que l'iframe est bien chargée (l'échelle et la mention d'attribution sont à jour, et la mention
  change bien de « Planet Observer » à « FEDER, Région Pays-de-la-Loire » selon l'emprise).
  **Une interaction de zoom force la peinture** : après deux clics sur `−` puis deux sur `+`,
  l'orthophoto s'affiche complètement — on distingue la cour de l'école Condorcet et ses jeux
  peints au sol. Reproduit à l'identique sur `?uai=0530011Z` (Laval).
- **Aucune console d'erreur** : les 18 messages relevés sont des `console.log` de débogage laissés
  en place (« Lancement de la recherche sur… », « Recherche \n ((nom_etablissement:C~ … », « position
  déterminée par Data.gouv.fr »).

### 5. Pied de page (`#bas`)

Vide en mode paysage. **Pas de mentions légales, pas de déclaration d'accessibilité, pas de
politique de confidentialité, pas de mention de licence, pas de lien vers le dépôt** autre que
« Infos sur cette application ».

## Défauts et bizarreries de l'original

1. **La recherche est inexploitable.** La requête construite est
   `((nom_etablissement:<terme>~ OR nom_commune:<terme>~ OR adresse_1:<terme>~)) AND (type_etablissement:"École" OR "Collège" OR "Lycée")`.
   L'opérateur **`~`** est le *fuzzy* de Lucene : il accepte les mots à une ou deux substitutions
   près, **sans pondérer la correspondance exacte**. Rejoué en ligne de commande sur huit termes :

   | Recherche | `nhits` | Trois premiers résultats renvoyés |
   |---|---|---|
   | `Ouessant` | 14 | Ecole primaire de Lussant · Ecole publique de Clohars-**Fouesnant** · Lycée agricole de Bréhoulou |
   | `Kervignac` | 63 | Ecole primaire de Ger**mignac** · Ecole primaire de Pé**rignac** · Ecole primaire de Mé**rignac** |
   | `Coligny` | 192 | Ecole primaire PO**LIGNY** · Ecole primaire **Coligny**-Cornet (à Poitiers) · ENILEA campus de Poligny |
   | `Monnerville` | 58 | Ecole Gaston **MONNERVILLE** · Ecole primaire Thuet BON**NEVILLE** · Ecole Gaston Monnerville Sousceyrac |

   Dans trois cas sur quatre, **l'établissement cherché n'est pas dans les résultats affichés**.
2. **Le paramètre de pagination est faux, donc ignoré.** Le code passe
   `nombreDeResultats: 100` à l'API v1 d'Opendatasoft, qui ne connaît que **`rows`**. Le paramètre
   est ignoré en silence : l'API renvoie son défaut, **10 enregistrements**. Sur les 192 hits de
   « Coligny », l'utilisateur en voit dix. Le commentaire du code dit pourtant
   `nombreDeResultats = 100`.
3. **Course entre les requêtes : la liste affichée mélange plusieurs recherches.**
   `inputRecherche.addEventListener('input', …)` déclenche une requête **par frappe**, sans
   `debounce`, sans annulation, sans garde d'ordre. `chercherEcoles` vide la liste de façon
   **synchrone** (`innerHTML=''`), puis chaque réponse **ajoute** ses lignes (`appendChild`) quand
   elle arrive. Conséquences vues à l'écran :
   - taper « Coligny » émet **7 requêtes** (relevées au réseau : `C~`, `Co~`, `Col~`, `Coli~`,
     `Colig~`, `Colign~`, `Coligny~`) ;
   - la liste rendue contient des résultats de **préfixes différents** — pour « Coligny » elle a
     affiché « Ecole Maternelle Julia **Colin** – Chantraine (88) », « Ecole élémentaire le Grand
     Pavois – Saint-Valery-en-Caux », « Ecole élémentaire **Condorcet** – Angoulême », qui
     n'appartiennent à **aucune** des dix lignes de la réponse à `Coligny~` (rejouée en curl) ;
   - **« Aucun résultat » s'affiche en tête d'une liste de sept résultats** (capture « Ouessant ») :
     une réponse à un préfixe court a écrit le message via `innerHTML`, les réponses suivantes ont
     empilé leurs lignes en dessous.
4. **Le seuil de résultats est à `> 1`.** `if (etablissements.length > 1)` : **un établissement
   trouvé, exactement un, tombe dans la branche « Aucun résultat »**. *Lu dans le code, non reproduit
   à l'écran* — l'opérateur *fuzzy* rend le cas quasi inatteignable (les huit termes testés donnent
   tous ≥ 10 réponses). Le bug est réel mais masqué par le défaut n° 1.
5. **Aucun marqueur sur la carte.** L'établissement est au centre du cadre, sans repère visuel.
6. **La carte d'accueil est vide et centrée sur rien.** `c=1.62,47.20&z=6`, une vue satellite de la
   France sans un seul point. À la différence des pages IPS du portail, au moins le centre est
   en France — mais l'écran d'accueil ne montre aucune donnée.
7. **Le premier rendu de l'orthophoto au zoom 19 reste gris plus de quinze secondes**, et il faut
   interagir avec la carte pour que les tuiles se peignent. Reproduit sur deux établissements.
8. **Matomo est chargé et déclenche `trackPageView` au chargement, sans bandeau ni consentement.**
   Requête relevée : `POST https://wa.phm.education.gouv.fr/snp/matomo.php?…&cookie=1&res=1470x956&_id=…`,
   204. Le tracker est celui de l'Éducation nationale, ce qui plaide pour une configuration exemptée
   — mais **rien dans la page ne le dit**, et il n'y a ni page « données personnelles », ni mention
   légale, ni déclaration d'accessibilité.
9. **Un lien de sortie vers Google Maps** (« Google **Maos** ») depuis une application publiée sur un
   domaine de l'Éducation nationale, à côté du lien OpenStreetMap.
10. **Le bouton de capture d'écran est mort.** `<button id="photo" class="hide" onclick="creerImage()">`
    est dans le HTML, `dom-to-image-more.min.js` (16,6 Ko) est chargé — mais **`creerImage()` n'est
    définie nulle part** (vérifié : absente de `script.js`, de `dom.js` et de la bibliothèque), et
    **rien ne retire jamais la classe `hide`**. Le bouton est invisible et, s'il était cliqué,
    lèverait une `ReferenceError`.
11. **`dom.js` est du code mort d'une autre application.** Ses 45 lignes cherchent `#bulles`,
    `#bouton_onomatopee`, `#modele_pensee`, `#galerie_images`, `#police_couleur`… — le DOM d'un
    **éditeur de bande dessinée** (une autre application Éducajou). Aucun de ces identifiants
    n'existe dans `ecolemap/index.html` : le fichier assigne 45 variables globales à `null` à chaque
    chargement.
12. **Deux fautes visibles à l'écran** : « Google Maos » (bloc d'informations) et
    « le **qaurtier** » (README de la forge).
13. **Le lien OpenStreetMap est malformé** : `?mlat=${latitude}&mlon${longitude}#map=…` — il manque
    le `=` après `mlon`. Le fragment `#map=` sauve la navigation, mais le marqueur n'est pas posé.
14. **Aucun label de formulaire, aucun `alt`, aucune liste focusable.** Les deux champs n'ont que
    leur placeholder ; le logo et le bouton de fond n'ont pas d'intitulé accessible ; les résultats
    sont des `<p>` avec un `click`. **Rien de tout cela n'est navigable au clavier.**
15. **Dépendance à un service tiers non souverain pour la position** : `overpass-api.de`, service
    communautaire hébergé en Allemagne, sans engagement de disponibilité, interrogé à chaque
    sélection. Le repli sur la position du portail existe, mais **seulement en cas de réponse vide** :
    si Overpass est lent ou en panne, `getPosition` **lève** (`throw error`) et
    `mettreAJourCarteEtInfos` n'affiche rien. *Lu dans le code, non provoqué à l'écran.*
16. **Le périmètre exclut les EREA et le médico-social** (`types = ["École","Collège","Lycée"]`),
    sans que rien ne le dise. 5 394 établissements du jeu sont inatteignables.
17. **Le filtre de type est écrit avec accents** (`type_etablissement:"École"`) alors que la valeur
    du jeu est **`Ecole`** sans accent. Sans conséquence — vérifié : l'analyseur d'ODS plie les
    accents, les deux requêtes renvoient **48 383** — mais c'est un appui sur un comportement non
    garanti.
18. **`console.log` de débogage laissés en production** : 18 messages relevés pour une recherche et
    une sélection, dont la requête Lucene complète.
19. **La page ne dit pas ce qu'elle contient.** Le catalogue l'annonce comme une
    « vue cartographique produite par la forge des communs numériques éducatifs » ; la forge n'est
    pas un producteur de vue, c'est un hébergeur. Le producteur réel est une personne nommée, et la
    donnée vient du portail — **le catalogue crédite l'hébergeur et tait la source**.

## Transposition vers `dsfr-data`

**Version de référence : `dsfr-data` 0.25.0** (`docs/portail-education/_CIBLE-0.25.md`). Le dépôt
épingle 0.20.0, npm sert **0.23.0**, les jalons v0.24.0 et v0.25.0 sont cadrés.
Attributs vérifiés dans le source local (`~/Developer/GitHub/dsfr-data`, paquets **0.23.0**) :
`dsfr-data-map.ts` (presets de tuiles, `center`, `zoom`, `max-zoom`, `fit-*`, `insets`, `name`),
`dsfr-data-map-layer.ts` (`refine-on-click`, `context`, `time-*`, événement `dsfr-data-map-select`),
`dsfr-data-map-popup.ts`, `dsfr-data-search.ts` (`debounce`, `min-length`, `server-search`,
`search-template`, `url-search-param`, `url-sync`, `operator`, `count`),
`dsfr-data-source.ts`, `dsfr-data-display.ts`, `dsfr-data-list.ts`, `dsfr-data-context.ts`,
`dsfr-data-facets.ts`, `template-expression.ts`. Liste des 22 issues ouvertes relevée le
2026-09-10 (`gh issue list`). Tout attribut non vérifié est signalé.

> ⚠️ **Note de méthode.** Le tableau « Pièges déjà payés » du `CLAUDE.md` affirme
> « Conditionnelle dans un template : **aucune** » (AM-039). **Vérifié faux aujourd'hui au source** :
> `packages/core/src/utils/template-expression.ts` implémente `{{#if chemin}}…{{/if}}` et
> `{{#unless …}}…{{/unless}}` (blocs non imbriqués), et `dsfr-data-map-popup.ts:161-164` dit
> explicitement utiliser « le même moteur que `<dsfr-data-display>` (#426, #694) : blocs `{{#if}}` ».
> C'est décisif ici : le bloc d'informations d'ÉcoleMap a des champs facultatifs (circonscription
> vide sur le second degré, courriel ou téléphone manquants). **À requalifier au registre** — hors
> périmètre de cette fiche.

### Architecture retenue et pourquoi

**68 608 lignes, 71 champs : le chargement client est exclu.** Et il n'a aucun intérêt ici :
l'application ne montre **jamais plus d'un établissement**. L'architecture native qui correspond est
la **recherche serveur** :

- `<dsfr-data-source api-type="opendatasoft" base-url="https://data.education.gouv.fr"
  dataset-id="fr-en-annuaire-education" server-side page-size="10" where="…">` ;
- `<dsfr-data-search server-search>` pousse une clause `{where}` à la source, qui re-`fetch`.
  **`debounce` vaut 300 ms par défaut** (JSDoc de `dsfr-data-search.ts:117-119`) : le défaut n° 3 —
  sept requêtes pour sept frappes — **disparaît sans rien écrire**. `min-length="3"` l'achève.
- Le `where` de périmètre (`type_etablissement`, `etat`) se pose **sur la balise `dsfr-data-source`
  déjà présente**, pas dans un composant de plus (PG-015).

**Pas de `server-facets` dans la version minimale** — l'original n'a aucun filtre. Mais la version
« utile » en pose : c'est le principal apport gratuit (voir § Ce que la transposition gagne).

### Correspondance élément à élément

| Élément d'ÉcoleMap | Composant + attributs `dsfr-data` |
|---|---|
| `getEtablissements()` : `fetch` v1, requête Lucene *fuzzy* montée à la main, 1 appel par frappe | `<dsfr-data-search source="ann" server-search fields="nom_etablissement" operator="words" min-length="3" count url-sync>` — le `debounce` de 300 ms est **le défaut**, l'`operator` est explicite, et `count` affiche le total serveur (`meta.total`) que l'original ne montre jamais |
| `nombreDeResultats: 100` (paramètre inexistant, ignoré) | `page-size` sur `dsfr-data-source` — un attribut qui existe |
| la liste `<p>` cliquable, non focusable | `<dsfr-data-list source="ann" columns="nom_etablissement, nom_commune, code_postal, type_etablissement" pagination="10">` (attributs **anglais** : les formes françaises sont dépréciées) ou `<dsfr-data-display>` + `<template>` de tuiles DSFR — dans les deux cas, du HTML sémantique navigable au clavier |
| `getEtablissement(uai)` : requête par UAI, `rows=1` | `where="identifiant_de_l_etablissement = '…'"` sur la source, ou **`refine-on-click`** depuis la carte (`dsfr-data-map-layer.ts:209`) |
| `?uai=…` + `history.replaceState` | `url-sync` + `url-search-param` sur `dsfr-data-search` (`dsfr-data-search.ts:145-151`) ; `url-sync url-params` sur `dsfr-data-facets` |
| `<iframe src="geoportail.gouv.fr/embed/visu.html?…&l0=ORTHOIMAGERY.ORTHOPHOTOS…">` | `<dsfr-data-map tiles="ign-ortho">` — **le preset existe** et vise la même couche : `https://data.geopf.fr/wmts?…LAYER=ORTHOIMAGERY.ORTHOPHOTOS…` (`dsfr-data-map.ts:38-41`) |
| `l0=OPEN_STREET_MAP` (bouton de bascule) | `tiles="osm-fr"` ou `osm-standard` — deux presets, mais **la bascule à l'exécution n'est pas un attribut** : deux lignes de page (`map.setAttribute('tiles', …)`), voir § Limites, point 2 |
| `c=<lon>,<lat>&z=19`, réécriture du `src` | `center="lat,lon"` + `zoom` — et **`max-zoom="19"`**, car le défaut est **18** (`dsfr-data-map.ts:276-277`, JSDoc de `zoom` : « (1-18) »). Voir § Limites, point 1 |
| **manque** : aucun marqueur | `<dsfr-data-map-layer type="circle" radius="9" geo-field="position">` — le défaut de l'original tombe de lui-même |
| `getPosition()` : Overpass sur `ref:UAI`, repli sur le portail | `geo-field="position"` : la position du portail suffit. **Overpass n'a pas d'équivalent et n'a pas à en avoir** — c'est un raffinement de précision propre à l'auteur, pas une capacité manquante. Voir § Limites, point 4 |
| bloc `#infos` : template literal de 20 lignes, champs facultatifs laissés vides | `<dsfr-data-display source="…" cols="1">` + `<template>` avec `{{#if mail}}…{{/if}}`, `{{mail:url}}` (filtre d'URL qui ne laisse passer que `http:`, `https:`, `mailto:`, `tel:` et le relatif) et `{{champ|défaut}}` |
| lien « Voir sur data.education.gouv.fr » | `<a href="…/explore/dataset/fr-en-annuaire-education/table/?q={{identifiant_de_l_etablissement}}">` dans le même template |
| bouton photo mort + `dom-to-image-more` | `databox-screenshot` sur un `dsfr-data-chart`. **Sur la carte, il n'y a pas d'équivalent** : voir § Limites, point 3 |
| `dom.js` (code mort d'un autre projet) | néant |
| Matomo en dur, sans consentement | hors périmètre de la bibliothèque |
| **manque** : aucun des 34 filtres du jeu | `<dsfr-data-facets server-facets fields="type_etablissement, statut_public_prive, libelle_academie, libelle_departement, appartenance_education_prioritaire, ulis, segpa" …>` — voir § Limites, point 5 |
| **manque** : aucune vue d'ensemble | une couche de points sur la sélection courante, plafonnée par `max-items` (PG-013) |

### Esquisse de code

```html
<!-- 68 608 lignes, 71 champs : recherche serveur, pas de chargement client.
     Le périmètre de l'original (École/Collège/Lycée, 63 214 lignes) est posé
     par un `where` sur la balise déjà présente, pas par un composant de plus. -->
<dsfr-data-source id="ann"
  api-type="opendatasoft"
  base-url="https://data.education.gouv.fr"
  dataset-id="fr-en-annuaire-education"
  where="type_etablissement in ('Ecole','Collège','Lycée') and etat = 'OUVERT' and position is not null"
  server-side page-size="10">
</dsfr-data-source>

<div class="fr-container fr-mt-4w">
  <h1>Où est cet établissement&nbsp;?</h1>
  <p class="fr-text--lead">
    Écoles, collèges et lycées de l'annuaire de l'éducation, situés sur l'orthophotographie
    de l'IGN. 63&nbsp;214 établissements ouverts, mis à jour quotidiennement par la DNE.
  </p>

  <div class="fr-grid-row fr-grid-row--gutters">
    <div class="fr-col-12 fr-col-md-4">
      <!-- debounce = 300 ms par défaut : une requête par pause de frappe, pas par frappe. -->
      <dsfr-data-search id="ann-q" source="ann" server-search
        fields="nom_etablissement"
        label="Chercher un établissement"
        placeholder="Nom, commune, UAI…"
        operator="words" min-length="3" count
        url-sync url-search-param="q"></dsfr-data-search>

      <dsfr-data-facets id="ann-f" source="ann-q" server-facets
        fields="type_etablissement, statut_public_prive, libelle_academie, libelle_departement, appartenance_education_prioritaire"
        labels="type_etablissement:Type | statut_public_prive:Secteur | libelle_academie:Académie | libelle_departement:Département | appartenance_education_prioritaire:Éducation prioritaire"
        searchable="libelle_departement"
        display="type_etablissement:select"
        max-values="6" url-sync url-params></dsfr-data-facets>

      <h2 class="fr-h6 fr-mt-4w">Résultats</h2>
      <dsfr-data-display source="ann-f" cols="1" empty="Aucun établissement ne correspond.">
        <template>
          <div class="fr-card fr-card--sm fr-enlarge-link fr-mb-2v">
            <div class="fr-card__body"><div class="fr-card__content">
              <h3 class="fr-card__title fr-text--sm">{{nom_etablissement}}</h3>
              <p class="fr-card__desc fr-text--xs">
                {{code_postal}} {{nom_commune}} — {{type_etablissement}}
              </p>
            </div></div>
          </div>
        </template>
      </dsfr-data-display>
    </div>

    <div class="fr-col-12 fr-col-md-8">
      <!-- ign-ortho vise la même couche WMTS que l'iframe Géoportail de l'original.
           max-zoom : le défaut de dsfr-data-map est 18, l'original va à 19. -->
      <dsfr-data-map id="carte-etab" name="Localisation de l'établissement"
        center="46.6,2.3" zoom="6" max-zoom="19" height="620px"
        tiles="ign-ortho" fit-bounds fit-max-zoom="19" insets="drom">
        <dsfr-data-map-layer id="couche-etab" source="ann-f"
          type="circle" radius="9" geo-field="position"
          color-field="statut_public_prive" color-map="Public:#18753C,Privé:#000091"
          tooltip-field="nom_etablissement"
          refine-on-click="identifiant_de_l_etablissement">
        </dsfr-data-map-layer>
        <dsfr-data-map-legend for="couche-etab" label="Secteur"></dsfr-data-map-legend>
        <dsfr-data-map-popup mode="panel-right" title-field="nom_etablissement" width="360px">
          <template>
            <p class="fr-badge fr-badge--sm fr-mb-2v">{{type_etablissement}} · {{statut_public_prive}}</p>
            <p class="fr-text--sm fr-mb-1v">{{adresse_1}} {{adresse_2|}}</p>
            <p class="fr-text--sm fr-mb-2v"><strong>{{code_postal}} {{nom_commune}}</strong></p>
            {{#if nom_circonscription}}
              <p class="fr-text--sm fr-mb-2v">{{nom_circonscription}}</p>
            {{/if}}
            {{#if mail}}
              <p class="fr-text--sm fr-mb-1v"><a href="{{mail:url}}">{{mail}}</a></p>
            {{/if}}
            {{#if telephone}}
              <p class="fr-text--sm fr-mb-1v"><a href="{{telephone:url}}">{{telephone}}</a></p>
            {{/if}}
            {{#if web}}
              <p class="fr-text--sm fr-mb-2v"><a href="{{web:url}}">Site de l'établissement</a></p>
            {{/if}}
            <p class="fr-text--xs fr-mb-0">
              UAI {{identifiant_de_l_etablissement}} —
              <a href="https://data.education.gouv.fr/explore/dataset/fr-en-annuaire-education/table/?q={{identifiant_de_l_etablissement}}">voir la fiche source</a>
            </p>
          </template>
        </dsfr-data-map-popup>
      </dsfr-data-map>
      <p class="fr-hint-text">
        Fond : orthophotographie IGN. 429 établissements de l'annuaire n'ont pas de position
        et ne peuvent pas être affichés.
      </p>
    </div>
  </div>
</div>
```

## Limites et points durs identifiés

Points classés selon les quatre verdicts de `_CIBLE-0.25.md` : **natif** · **natif mais postérieur
à la 0.20.0 épinglée** · **prévu à un jalon** (n° d'issue) · **manque réel**.

**La question posée à cette cible** — c'est la seule du lot qui n'est pas du modèle Opendatasoft :
*qu'est-ce qui manquerait à quelqu'un qui voudrait remplacer cette application maison par des
balises ?* Trois choses, dont **deux sont des manques réels sans issue ouverte**.

### Manques réels — le résidu de cette page

1. **Aucun composant d'affichage de liste ne sait pousser une sélection dans le pipeline.** ⭐
   *C'est le motif central d'ÉcoleMap, et le résidu le plus net du lot.*
   *Le besoin* : l'utilisateur tape trois lettres, une **liste de résultats** apparaît, il **clique
   une ligne**, et le **détail** (carte recentrée au zoom 19 + fiche de l'établissement) se met à
   jour. C'est le maître-détail le plus banal qui soit, et c'est tout ce que fait l'application.
   *Ce qui existe* : `dsfr-data-map-layer` sait **exactement** faire l'inverse —
   `refine-on-click="champ"` + `context="id"` poussent une clause `eq` au contexte, et l'élément
   émet `dsfr-data-map-select` (`dsfr-data-map-layer.ts:135-136, 209, 213, 529`). Le bus de
   contexte est **ouvert** : « tout composant qui remplit le contrat `ContextFilterLike` peut s'y
   enregistrer » (`dsfr-data-context.ts:46-51`).
   *Ce qui n'existe pas* : ni `dsfr-data-list` ni `dsfr-data-display` n'ont d'attribut de sélection,
   de `refine-on-click`, d'attribut `context`, ni le moindre `@fires` de sélection de ligne
   (relevé exhaustif des `@property` de `dsfr-data-list.ts` : `columns`, `search`, `filters`,
   `sort`, `pagination`, `url-sync`, `url-page-param`, `server-sort`… — **aucun de sélection** ;
   `dsfr-data-display.ts` n'émet aucun événement). Un `fr-enlarge-link` dans un `<template>` de
   `dsfr-data-display` fait un **lien**, pas un filtre : il faut recharger la page.
   *Contournement* : un `addEventListener('click')` de page qui appelle
   `dispatchSourceCommand` ou pose un `where` — c'est-à-dire écrire soi-même la moitié de ce que
   `refine-on-click` fait déjà pour la carte.
   *Est-ce prévu ?* **Non** — aucune des 22 issues ouvertes au 2026-09-10 ; ni #690
   (`require-where`) ni #674 (`where` sur le KPI) ne couvrent la sélection d'une ligne.
   *Demande à formuler* : `refine-on-click` + `context` sur `dsfr-data-list` et
   `dsfr-data-display`, symétriques de ceux de `dsfr-data-map-layer`, avec un événement
   `dsfr-data-row-select`. Sans cela, **le maître-détail « liste → détail » n'est pas faisable en
   balises**, alors que « carte → détail » l'est depuis la 0.23.0. L'asymétrie est arbitraire.
2. **Aucun contrôle de bascule de fond de carte.** ⭐
   *Le besoin* : le bouton unique d'ÉcoleMap (Orthophoto ↔ OpenStreetMap) est la deuxième
   interaction de l'application, après la recherche. Sur une carte à l'orthophoto, pouvoir repasser
   au plan est ce qui rend la vue lisible.
   *Ce qui existe* : les deux presets (`ign-ortho`, `osm-fr`, plus `ign-plan`, `ign-cadastre`,
   `osm-standard`, `opentopomap` — `dsfr-data-map.ts:34-63`), et le composant **réagit bien** à un
   changement d'attribut à chaud (`changedProperties.has('tiles')`, `dsfr-data-map.ts:445`).
   *Ce qui n'existe pas* : le contrôle. Il n'y a ni attribut `tiles-switch`, ni sélecteur de
   couche, ni contrôle Leaflet de fonds — les seuls contrôles rendus sont `+` / `−`, masqués par
   `no-controls`.
   *Contournement* : deux boutons DSFR et `map.setAttribute('tiles', …)`, quatre lignes de page.
   *Est-ce prévu ?* **Non** — aucune issue ouverte.
   *Verdict* : **manque réel, mineur mais avéré** — c'est une fonction que l'utilisateur voit, sur
   un composant qui a déjà tout ce qu'il faut pour la rendre. Une demande d'un attribut
   `tiles-switch="ign-ortho, ign-plan, osm-fr"` (liste de presets à proposer) est proportionnée.
3. **Plein écran et capture PNG d'une carte.** `databox-fullscreen` / `databox-screenshot` existent
   sur `dsfr-data-chart`, **pas** sur `dsfr-data-map`. Aucune issue ouverte.
   *Nuance honnête pour cette cible* : le bouton de capture de l'original **ne fonctionne pas**
   (défaut n° 10), et le plein écran vient de l'iframe Géoportail, pas de l'application.
   Il n'y a donc rien à égaler ici.
   *Verdict* : **manque réel, mais déjà relevé par la fiche « Annuaire des internats »** →
   **fusionner**, ne pas créer une seconde entrée.

### Natif — rien à demander

4. **La requête par frappe.** Le défaut n° 3 de l'original (sept requêtes pour sept frappes,
   réponses qui se mélangent) **disparaît sans rien écrire** : `dsfr-data-search` a
   `debounce = 300` **par défaut** (`dsfr-data-search.ts:117-119`), plus `min-length`
   (`:121-123`). L'annulation d'ordre est interne au composant. **Faux problème si on avait
   écrit qu'il fallait le gérer soi-même.**
5. **L'URL partageable.** `url-sync` + `url-search-param` sur `dsfr-data-search`
   (`:145-151`), `url-sync url-params` sur `dsfr-data-facets`, `url-sync` sur
   `dsfr-data-list` / `dsfr-data-display`. Natif, et plus complet que le `?uai=` maison.
6. **L'orthophoto IGN.** `tiles="ign-ortho"` vise **la même couche WMTS**
   (`LAYER=ORTHOIMAGERY.ORTHOPHOTOS` sur `data.geopf.fr`, `dsfr-data-map.ts:38-41`) que l'iframe
   Géoportail de l'original. Il n'y a pas de « projection particulière » ni de fond manquant.
7. **Le zoom au bâtiment.** `max-zoom="19"` est un attribut public (`dsfr-data-map.ts:276-277`) ;
   le JSDoc de `zoom` dit « (1-18) » mais c'est le **défaut**, pas un plafond dur, et le preset
   `ign-ortho` ne fixe **aucun** `maxZoom` dans ses `options` (contrairement à `osm-standard`,
   plafonné à 19, et `opentopomap`, à 17). **Non rejoué au navigateur** : reste à confirmer que
   les tuiles WMTS PM de l'IGN répondent au niveau 19 sur l'emprise visée — mais c'est une question
   de service de tuiles, **pas une limite de la bibliothèque**.
8. **La recherche multi-champs en mode serveur.** Le JSDoc du mode `context` prévient que « la
   clause colon ne sait pas dire "ou" entre plusieurs champs » (`dsfr-data-search.ts:170-180`) —
   mais **hors mode `context`**, `server-search` accepte un `search-template`, « Ex ODS:
   `search("{q}")` » (`:161-168`), c'est-à-dire la recherche plein texte d'Opendatasoft, qui porte
   sur **tous** les champs. Plus large que les trois champs de l'original, et **sans le *fuzzy***
   qui le rend inutilisable. *Le rendu exact de `search-template='search("{q}")'` sur l'adaptateur
   ODS n'a pas été rejoué au navigateur* — mais l'attribut existe et son JSDoc le documente.
9. **Les états vides et les messages.** `dsfr-data-display` a `empty` ; `dsfr-data-search` a
   `count` (compte serveur `meta.total`) — l'original n'affiche jamais son nombre de résultats.

### Prévu à un jalon

10. **Ne rien charger tant qu'aucun filtre n'est posé.** ÉcoleMap n'interroge rien au démarrage —
    et c'est le bon comportement sur 68 608 lignes. En `dsfr-data`, une source `server-side`
    fetche sa première page dès le chargement.
    **Prévu au jalon v0.25.0 : `require-where` (#690, épic #700)** — « pas de requête tant
    qu'aucun filtre n'est posé, état `idle` rendu en message DSFR ». C'est exactement le motif.
    **Pas une limite dure : une dépendance de calendrier.**
11. **Charger l'annuaire en entier** (68 608 lignes) si l'on voulait la vue d'ensemble que
    l'original n'a pas : l'adaptateur pagine `/records` 100 par 100 et l'API refuse
    `offset+limit > 10 000`. **Prévu au jalon v0.25.0 : `fetch-mode="export"` (#689, épic #699).**
    *Non mesuré ici* — l'esquisse retenue reste en `server-side`, qui n'en a pas besoin.

### Natif, mais postérieur à la version épinglée (0.20.0)

12. **`{{#if}}` / `{{#unless}}` dans les templates** (0.22.0, #694) — décisif ici, le bloc
    d'informations a quatre champs facultatifs. **Montée de version, pas une demande** ;
    AM-039 est à requalifier au registre (voir la note plus haut).
13. **`refine-on-click`, `context`, `label`, `dsfr-data-map-select`** sur `dsfr-data-map-layer`
    (0.23.0, #681) — et **toujours absents de `get_skill(dsfrDataMap, "reference")`** :
    cette fiche **confirme** le résidu n° 3 de `_CIBLE-0.25.md`, elle ne le redépose pas.

### Hors périmètre de `dsfr-data` — ne pas remonter

14. **La position via Overpass.** `dsfr-data-map-layer` lit un champ géographique de la source
    (`geo-field`) ; il n'interroge pas de service de géocodage tiers.
    *La question de la règle la plus importante du dépôt* : capacité de bibliothèque, ou choix
    d'implémentation propre à l'auteur ? **Le second.** L'annuaire porte `position` sur 68 179 de
    ses 68 608 lignes ; l'auteur préfère OSM parce que la position du portail est parfois le
    centroïde de la commune plutôt que le bâtiment. C'est un **raffinement de qualité de la
    donnée**, pas une fonction d'affichage — et une bibliothèque de visualisation qui irait
    chercher des coordonnées chez un tiers à chaque clic serait un défaut, pas une qualité.
    Le remède natif, s'il faut le traiter, est un `dsfr-data-join` sur un référentiel de positions
    préparé en amont. **Ne pas remonter.**
15. **`server-facets` sur `nom_commune`** (facette déclarée, très grande cardinalité) : l'API
    `/facets` d'ODS plafonne le nombre de valeurs. **Non vérifié** — l'esquisse ne pose pas cette
    facette et s'appuie sur `dsfr-data-search server-search`, qui répond au même besoin.
    À ne pas déposer sans avoir compté les valeurs réellement rendues.
16. **Ce qui ne se transpose pas, et n'a pas à l'être.**
    - L'`<iframe>` Géoportail : un raccourci d'implémentation, pas une fonctionnalité — et il coûte
      à l'original son marqueur, son responsive et son premier rendu.
    - Le lien Google Maps : sur un service public, un défaut, pas une capacité.
    - `dom.js` et `dom-to-image-more` : du code mort.
    - **Ni saisie, ni export, ni mode hors ligne** : l'application n'en a aucun. Le résidu attendu
      de ce côté-là est **vide**, et il faut le dire — la seule chose qu'ÉcoleMap fait et que des
      balises ne font pas, c'est la sélection d'une ligne de liste (point 1) et la bascule de fond
      (point 2).

### Ce que la transposition gagne et perd

17. **Gagne** : une recherche qui trouve ce qu'on cherche
   (`operator="words"` au lieu du *fuzzy* de Lucene), une requête par pause de frappe au lieu d'une
   par frappe (défaut de la bibliothèque, rien à écrire), pas de course entre réponses, un compteur
   de résultats, une pagination réelle au lieu de dix lignes sur cent-quatre-vingt-douze, **un
   marqueur sur la carte**, cinq filtres là où il n'y en a aucun, une vue d'ensemble en plus de la
   vue au bâtiment, les champs facultatifs traités par `{{#if}}` au lieu de lignes vides, une liste
    de résultats navigable au clavier, des libellés de champ, et la charte de l'État.
18. **Perd** : l'affinage de position par OpenStreetMap (point 14, hors périmètre), la bascule de
    fond en un bouton (point 2, **manque réel**), et — jusqu'à ce que #690 arrive (point 10) —
    l'absence de requête au chargement. **Et la sélection d'une ligne de liste (point 1), qui est
    aujourd'hui la seule chose qu'ÉcoleMap fait et que des balises `dsfr-data` ne font pas.**

## Verdict

**Reproductible, et dans le périmètre du banc d'essai** — la donnée est sur
`data.education.gouv.fr`, en Licence Ouverte, sans clé. Ce n'est pas une dataviz au sens du
catalogue (aucun agrégat, aucune comparaison), mais c'est exactement le motif « recherche + carte +
fiche » que `dsfr-data` sait tenir en une vingtaine de balises, et la comparaison est instructive :
**433 lignes de JavaScript maison, deux dépendances mortes, une bibliothèque de carte remplacée par
une `<iframe>`, et six bugs — dont trois visibles dans une seule capture d'écran — contre un
`dsfr-data-source`, un `dsfr-data-search`, un `dsfr-data-facets`, un `dsfr-data-map` et deux
`<template>`.**

**Mais la comparaison ne tourne pas entièrement à l'avantage des balises, et c'est le produit utile
de cette cible.** Deux choses qu'ÉcoleMap fait et que `dsfr-data` ne sait pas faire aujourd'hui,
ni au source ni au backlog v0.24/v0.25 :

1. **cliquer une ligne de résultat pour piloter le détail** — `refine-on-click` et `context`
   existent sur `dsfr-data-map-layer` depuis la 0.23.0, mais **ni `dsfr-data-list` ni
   `dsfr-data-display` n'ont d'équivalent**, alors que le bus de contexte est ouvert à tout
   composant remplissant `ContextFilterLike`. Le maître-détail « carte → détail » est faisable ;
   « liste → détail » ne l'est pas ;
2. **basculer de fond de carte** — les six presets existent et le composant réagit au changement
   d'attribut à chaud, mais **aucun contrôle** n'est rendu.

Le troisième point sur lequel l'original garde un avantage, l'affinage de position par
OpenStreetMap, relève de la qualité de la donnée et non de l'affichage : il est hors périmètre.

**Ce que cette cible dit du catalogue** : l'entrée 26 crédite « la forge des communs numériques
éducatifs » comme productrice d'une « vue cartographique ». La forge est un hébergeur GitLab ;
l'auteur est une personne nommée qui publie sous GPL ; la donnée est celle du portail lui-même.
Le catalogue référence donc **une réutilisation de son propre jeu de données** en la présentant
comme une production institutionnelle, et sans le signaler comme une réutilisation.

## Données à reproduire fidèlement

- [ ] Jeu **`fr-en-annuaire-education`**, **68 608 lignes**, 71 champs, Licence Ouverte v2.0,
      DNE, mis à jour quotidiennement.
- [ ] **Périmètre de l'original** : `École` + `Collège` + `Lycée` = **63 214** établissements
      (Ecole 48 383 · Collège 9 186 · Lycée 5 645). Les EREA (80), le médico-social (2 311),
      les CIO (418), les services administratifs (1 961), « Autre » (374) et les 250 sans type
      **sont exclus** — le dire, ou élargir le périmètre en le disant aussi.
- [ ] **429 établissements sans `position`** : les signaler, ne pas les faire disparaître en silence.
- [ ] **2 établissements « A FERMER »** sur 68 608.
- [ ] **Champs de la fiche** : `nom_etablissement`, `adresse_1`, `adresse_2`, `code_postal`,
      `nom_commune`, `mail`, `telephone`, `nom_circonscription` (nettoyé de « d'inspection du
      1er degré ») — **au minimum**, plus `type_etablissement`, `statut_public_prive`, `web`
      et l'UAI, que l'original a sous la main et n'affiche pas.
- [ ] **Fond orthophoto IGN** (`ORTHOIMAGERY.ORTHOPHOTOS`) et **fond OSM**, basculables.
- [ ] **Zoom au bâtiment** : l'original va à **19**, échelle 20 m. C'est le test de fidélité de
      cette page — un zoom 18 change la nature de l'outil.
- [ ] **URL partageable `?uai=…`** — la seule chose que l'original fait mieux que la moitié
      des pages du portail.
- [ ] **Un marqueur sur l'établissement**, que l'original n'a pas.
- [ ] Recherche qui trouve : « Ouessant » doit renvoyer **`0290851T` — Ecole primaire publique
      Jacques Burel, Ouessant**, et non sept écoles de Ouégoa, Omessa, Ousse, Paris 14ᵉ et Dijon.
