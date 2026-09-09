# Prix des carburants

- **URL** : https://data.economie.gouv.fr/pages/dataviz-prix-des-carburants/
- **Producteur (badge catalogue)** : DGCCRF
- **Jeux de données affichés dans l'encadré « Les jeux de données utilisés »** : `interne-test-discussions` (lien mort / jeu interne, ne sert à rien dans la page), `prix-des-carburants-en-france-flux-instantane-v2` (le seul jeu réellement utilisé).
- **Relevé visuel** : 2026-09-09, Chrome, viewport 1440 px.

## Objectif de la dataviz et informations véhiculées

- **Question à laquelle elle répond** : « Où trouver, près de chez moi, une station qui a *ce* carburant, et à quel prix ? » Usage grand public, orienté recherche locale (commune, département), pas analyse.
- **Message porté** : la disponibilité (et l'indisponibilité, filtre à part entière) autant que le prix ; la fraîcheur de l'information (chaque prix est daté à l'heure près dans l'infobulle ; la carte est « mise à jour en temps réel » selon le catalogue).
- **Information que l'utilisateur doit obtenir** : pour une station donnée, les 6 prix (Gazole, SP95-E10, E85, SP98, SP95, GPLc) avec leur date, l'adresse, les services et l'automate 24/24 ; et une idée du nombre de stations correspondant à ses critères (« 126 parmi 9 805 »).
- **Ce que l'original ne cherche pas à dire** : aucune comparaison de prix (pas de moyenne, min, max, ni de classement) ; ce n'est pas un comparateur, c'est un localisateur. Une reproduction qui ajouterait des statistiques changerait l'objet.
- **Public** : automobilistes ; l'entrée principale est la commune (champ en tête de colonne, autofocus).

## Structure de la page (de haut en bas)

1. Fil d'Ariane « Catalogue des visualisations / Prix des carburants ».
2. Titre H1 « Prix des carburants ».
3. Carte DSFR « Les jeux de données utilisés » : liste des identifiants de jeux avec flèche, chacun lié vers `/explore/dataset/<id>`.
4. **Une seule grande carte DSFR** contenant tout l'outil, en deux colonnes (1/3 – 2/3) :

### Colonne gauche : filtres (dans l'ordre)

| # | Bloc | Élément | Comportement observé |
|---|---|---|---|
| 1 | **Rechercher une commune** (H3) | Champ texte, placeholder « Rechercher une commune », debounce 1 s | Dès la saisie, une liste déroulante blanche apparaît sous le champ avec au plus 10 communes commençant par la saisie (`ville LIKE 'xxx*'`, groupées par `ville`). Au-delà de 10 : mention « + de 10 résultats, affinez votre recherche ». Aucun résultat : « Aucun nom de communes correspondant ». **La liste est restreinte par la région et le département déjà choisis** (saisie « Dij » avec Côte-d'Or sélectionnée → Dijon, Fontaine-Lès-Dijon, Sennecey-Lès-Dijon). Cliquer une commune pose `refine.ville` et vide le champ. |
| 2 | **Carburants disponibles** (H3) | Select multiple, placeholder « Selectionnez un ou plusieurs type de carburant » | Options observées (facette `carburants_disponibles`) : **Gazole, E10, SP98, E85, SP95, GPLc** (6). Un champ « Filtre » de recherche en tête de liste, et une entrée « Tous (6 options) ». |
| 3 | **Carburants non disponibles** (H3) | Select multiple, même placeholder | Facette `carburants_indisponibles`, mêmes 6 valeurs. |
| 4 | **Localisation** (H3) | Select simple « Selectionnez une région » | Facette `region`, tri alphabétique. 13 régions observées : Auvergne-Rhône-Alpes, Bourgogne-Franche-Comté, Bretagne, Centre-Val de Loire, Corse, Grand Est, Hauts-de-France, Île-de-France, Normandie, Nouvelle-Aquitaine, Occitanie, Pays de la Loire, Provence-Alpes-Côte d'Azur. **Pas de DROM dans ce jeu.** Changer de région efface le département et la ville. |
| 5 | (idem) | Select simple « Selectionnez un département » | Facette `departement`, tri alphabétique, **96 départements sans filtre** ; une fois la région choisie la liste ne contient plus que les départements de cette région (contexte `ctxfilterdept` qui hérite de `refine.region`). Changer de département efface la ville. |
| 6 | **Commune : <nom> ✖** (H3, bleu) | N'apparaît que si une commune est sélectionnée | Cliquer la croix retire `refine.ville`. |

Les selects région/département ne sont affichés que sur le contexte filtré : les facettes viennent de `ctxfilter` (jamais restreint par les carburants) et `ctxfilterdept` (restreint par la région).

### Colonne droite : carte + bandeau compteur

- **Carte Leaflet** (`ods-map`, sans légende), fond « Powered by Huwise – https://www.diplomatie.gouv.fr », contrôles : plein écran, zoom +/−, géolocalisation, **outils de dessin** (polygone, rectangle, cercle « pour filtrer », modifier, effacer) et sélecteur de fond de carte (icône couches).
- Une seule couche, titre « prix carburants quotidien - stations », couleur `#004976`, picto `ods-circle`, `display="auto"` : au niveau France on voit des **clusters ronds bleus avec effectifs** (au chargement : 1 938 / 1 350 / 1 418 / 1 263 / 1 211 / 890 / 951 … ), au niveau département des **marqueurs individuels** (épingles bleues).
- **Vue initiale** : France métropolitaine entière (de Guernesey à Naples visibles). À chaque changement de filtre, la carte **se recadre automatiquement** sur l'emprise des résultats (région → zoom sur la région ; département → épingles individuelles ; commune → zoom sur la commune).
- **Infobulle au clic sur une épingle** (template par défaut du jeu, dans cet ordre) :
  - Adresse (ex. « LE BUISSON MICHELIN »)
  - Ville (ex. « Liernais »)
  - Code Postal (« 21430 »)
  - Gazole `B7` → « 2,430 € (03/09/2026 à 09:42) » ou « Indisponible »
  - SP95-E10 `E10` → prix + date ou « Indisponible »
  - E85 → idem
  - SP98 → « 2,223 € (26/08/2026 à 16:15) »
  - SP95 → « 2,178 € (26/08/2026 à 16:15) »
  - GPLc → idem
  - Automate 24/24h → « Oui »
  - Services → « Piste poids lourds//Automate CB 24/24 » (chaîne brute avec `//` comme séparateur)
  Les pictos B7/E10 sont les étiquettes européennes des carburants, en petit badge à côté du nom.
- **Bandeau sous la carte** (fond `#004976`, texte blanc centré) :
  - sans filtre : « **9 805** stations » (COUNT(id) du contexte non filtré ; à relever au moment de la reproduction, le chiffre bouge chaque jour — la vignette du catalogue dit 9 991).
  - avec au moins un filtre (carburants, ville, région ou département) : « **667** stations parmi 9 805 correspondent aux filtres ». Observé : Bourgogne-Franche-Comté → 667 ; + Côte-d'Or → 126 ; + Dijon → 13.

## Requêtes API observées lors d'un filtrage (v1 `records/1.0`)

- `analyze/?refine.region=…&refine.departement=…&refine.ville=…&y.serie1.expr=id&y.serie1.func=COUNT` → compteur.
- `boundingbox/?refine…` puis `download/?…&rows=100&geofilter.distance=…` et `download/?…&rows=1000&fields=geom&geofilter.bbox=…` → couche carte (chargement par viewport).

## Données à reproduire fidèlement

- Compteur total et compteur filtré (COUNT sur `id`).
- Les 6 valeurs de carburants sur les deux facettes, les 13 régions, les 96 départements (restreints par région), la recherche de commune limitée à 10 suggestions et restreinte par région/département.
- Tous les champs de l'infobulle (adresse, ville, cp, 6 prix + dates de mise à jour ou « Indisponible », automate 24/24, services).
- Recadrage automatique de la carte sur le sous-ensemble filtré.
- Ce que le portail **ne montre pas** : aucun tableau, aucun graphique, aucune statistique de prix (moyenne, min, max) — uniquement la carte et le compteur.
