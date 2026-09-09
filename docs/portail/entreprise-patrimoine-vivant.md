# Entreprises du patrimoine vivant (EPV)

- **URL** : https://data.economie.gouv.fr/pages/entreprise-patrimoine-vivant/
- **Producteur (badge catalogue)** : DGE
- **Jeu de données** : `entreprises-du-patrimoine-vivant-epv` (1 267 lignes au 2026-09-09, accès public sans clé) + `georef-france-region@public` (contours régionaux, fond violet des cartes).
- **Relevé visuel** : 2026-09-09, Chrome, viewport 1440 px. Page haute de ~4 000 px.

## Objectif de la dataviz et informations véhiculées

- **Question à laquelle elle répond** : « Quelles entreprises labellisées EPV existent, où, dans quel métier, et sont-elles accessibles (prix, visite) ? » Double usage : annuaire de recherche (par univers, secteur, produit, région, prix, visite) et **vitrine du label** (message éditorial « l'excellence accessible »).
- **Message porté** : le label est un gage d'excellence *et* d'ancrage territorial (carte par région, DROM inclus) ; il n'est pas réservé au luxe (KPI « 24 % proposent des produits à moins de 200 € », « 16 % à moins de 50 € », carrousel d'exemples < 200 €, encadré « Accessible ne veut pas dire bon marché »). Les KPI ont été choisis pour ce message : PME, artisanat, prix.
- **Information que l'utilisateur doit obtenir** : pour une entreprise, sa fiche complète (13 champs : taille, artisanat, région, site, date de labellisation, NAF, clientèle, univers, secteur, description, produits, gamme de prix, visite) ; pour un territoire ou un métier, la liste et le compte.
- **Niveaux de lecture** : national (KPI + clusters régionaux) → filtré (liste alphabétique + compteur) → individuel (fiche). Les trois doivent exister.
- **Public** : grand public curieux ou acheteur, presse, acteurs locaux ; l'appel à action final est « Candidater au label ».

## Structure de la page (de haut en bas)

1. **Bandeau jaune pâle** : logo rond EPV, titre H1 sur deux lignes « Les entreprises labellisées / Entreprise du patrimoine vivant ».
2. **Trois paragraphes éditoriaux** (texte exact dans le source) : « Gage de qualité, d'innovation… créé en 2005… », « Attribué par les préfets pour cinq ans… », et en gras « Un point commun ? L'excellence ! … Cette cartographie est mise à jour chaque mois. » suivi d'une petite flèche courbe dessinée vers le bloc de filtres.
3. **Bloc de filtres** (carte blanche bordée), grille de 3 lignes :
   - Ligne 1 : **Recherche** (champ « Un mot, un produit, une entreprise… » + bouton loupe bleu, 2/3 de largeur) et **Univers** (select multiple, 1/3).
   - Ligne 2 : **Secteur d'activité** (select multiple, 1/2) et **Type de produits** (select multiple, 1/2).
   - Ligne 3 : **Région** (select multiple), **Gamme de prix** (select multiple), **Visite autorisée** (deux boutons radio « Oui » / « Non »).
   - Sous la grille, quand au moins un filtre est actif : **tags DSFR supprimables** « ✕ Moins de 50 € », « ✕ ACT 1892 »… et un lien « ✕ Effacer la sélection ».
4. **Compteur** : « **1267** entreprises du patrimoine vivant » (nombre en gras, `count(*)` du contexte filtré ; devient « 202 entreprises… » puis « 1 entreprises… » (sic, pas d'accord au singulier)).
5. **Zone carte + panneau latéral** (grille 60 / 40) :
   - **Carte principale France** (`jawg.light`, centrée `47.13, 2.59` zoom 5, `no-refit` : elle **ne se recadre pas** quand on filtre) avec sous elle une rangée de **trois mini-cartes DROM** : La Réunion (zoom 8), Guyane (zoom 6), Guadeloupe + Martinique (zoom 6). Mayotte absente.
   - **Panneau droit** : soit les **KPI** (état non filtré), soit la **liste des entreprises** (dès qu'un filtre est actif), soit la **fiche entreprise** (quand une entreprise est sélectionnée).
6. **Légende** (sous les cartes) : 8 pictos ronds colorés + libellés : Mode et beauté, Ameublement et Décoration, Architecture et Patrimoine Bâti, Arts de la table, Culture et Communication, Equipements Industriels, Médicaux, Mécaniques, Gastronomie, Loisirs et Transports. Quand un filtre Univers est actif, les autres entrées passent à 30 % d'opacité.
7. Lien à droite « Voir la source des données → » (vers `/explore/assets/entreprises-du-patrimoine-vivant-epv/`).
8. **Section blanche « Les savoir-faire français pour tous »** : deux paragraphes, puis 5 badges à coche bleue : « Ancrés dans tous les territoires », « Pour les particuliers comme pour les professionnels », « Des prix pour tous les budgets », « Des produits variés, responsables et durables », « Des savoir-faire d'exception à découvrir ».
9. **« Quelques exemples »** + sous-titre « Découvrez des exemples d'Entreprises du patrimoine vivant, s'adressant aux particuliers et dans une gamme de prix inférieurs à 200€ » : **carrousel de cartes** (4 par écran sur PC, 3 tablette, 1 mobile, flèches ← →), chaque carte = tag univers avec picto (ex. « Gastronomie »), type de produits en bleu (ex. « Boissons alcoolisées »), raison sociale en gris tronquée (« SCI DU CHATEAU RAU… »). Source : `select type_de_produits, raison_sociale, univers where gamme_de_prix LIKE '%50 € – 200 €%' OR gamme_de_prix LIKE '%Moins de 50 €%'`, sans limite (≈ 120 cartes chargées). **Observé : le carrousel ne change pas quand on filtre** (mêmes cartes avec « Berger » ou « Arts de la table » qu'à vide, seul l'ordre varie d'un chargement à l'autre) — le contexte `ctxfilter` ne reçoit pas les refines. C'est une sélection **aléatoire** d'exemples nationaux, indépendante des filtres.
10. **Encadré gris à bord violet « Accessible ne veut pas dire "bon marché" »** : paragraphe, 4 coches (« la qualité des matériaux », « son temps de conception et de fabrication », « sa durabilité », « l'impact économique et social de sa fabrication »), paragraphe de conclusion.
11. **Bandeau jaune « Aller plus loin »** : 4 tuiles-liens : En savoir plus sur le label EPV / Candidater au label EPV / Consulter la foire aux questions sur le label EPV / Découvrez le Réseau Excellence.
12. **Bandeau bleu pâle « Informations techniques »** : 3 tuiles : Voir la source des données / Consulter le décret / Contactez-nous.

## Les filtres en détail

| Filtre | Champ | Valeurs observées (API, 2026-09-09) | Remarques |
|---|---|---|---|
| Recherche | `q` (plein texte sur toute la fiche, pas seulement le nom) | — | Autocomplétion à la saisie (debounce 1 s) : jusqu'à 10 suggestions « RAISON SOCIALE (département) » (observé « Berger » → PRODUITS BERGER (Eure), MAISON COMBES ROQUEFORT LE VIEUX BERGER (Aveyron), ATELIERS BERGER - RUE DE L'ATELIER (Isère), BERGERE DE FRANCE SCOP (Meuse), **CECCALDI CREATIONS (Paris)** — cette dernière n'a pas « Berger » dans son nom : la recherche porte sur tous les champs) puis « + de 10 résultats, affinez votre recherche ». Cliquer une suggestion pose `refine.raison_sociale` (ouvre la fiche). Entrée ou la loupe pose `q` (tag « ✕ Berger », compteur « 5 entreprises », liste des 5, carte recadrée sur les 5 épingles avec picto d'univers) **et remet tous les autres filtres à zéro**. |
| Univers | `univers` | Ameublement et décoration 265 · Mode et beauté 246 · Equipements Industriels, Médicaux, Mécaniques 213 · Architecture et Patrimoine Bâti 207 · Gastronomie 149 · Arts de la table 65 · Culture et Communication 59 · Loisirs et transports 47 · **Ameublement et Décoration 10** (doublon de casse) · Fournitures, Équipements et Matériaux 5 · **Loisirs et Transports 1** (doublon de casse) | Les options sont des `group_by` bruts : les doublons de casse apparaissent tels quels dans le select. La légende n'a que 8 entrées : « Fournitures… » n'a pas de picto (couleur « other » `#000091`). |
| Secteur d'activité | `secteur_d_activite` | Ameublement et décoration 325 · Architecture et patrimoine 234 · Mode et accessoires 161 · Gastronomie / produits gourmands / boissons 120 · Equipements industriels / médicaux / mécaniques 86 · Arts de la table 82 · Bijouterie et joaillerie 65 · Loisirs et transports 55 · Papeterie / arts graphiques / communication 52 · Musique / spectacle / objets culturels 47 · Textile d'art 43 · Cosmétiques et parfums 36 · + 3 valeurs parasites à 1 (« Couverture - Toiture - Charpente », « Gastronomie », « produits gourmands et boissons ») ; 413 lignes vides | Champ multivalué (virgule). |
| Type de produits | `type_de_produits` | 66 valeurs distinctes (Décoration 162, Travaux ou restauration de sites historiques 137, Mobilier / Ebénisterie 131, Restauration d'œuvres 85, Bijouterie et Horlogerie 59, Textile d'art 53, Accessoires textiles/cuir 52…) ; 410 lignes vides | Multivalué. |
| Région | `region` | Île-de-France 250 · Auvergne-Rhône-Alpes 184 · Nouvelle-Aquitaine 150 · Grand Est 113 · Bourgogne-Franche-Comté 95 · Occitanie 90 · Pays de la Loire 87 · Hauts-de-France 69 · PACA 64 · Normandie 62 · Bretagne 54 · Centre-Val de Loire 42 · Corse 2 · Guyane 2 · Guadeloupe 1 · Martinique 1 · Réunion 1 | |
| Gamme de prix | `gamme_de_prix` (tri par `gamme_de_prix_order`) | Ordre affiché : Moins de 50 € (202) · 50 € – 200 € (204) · 200 € – 500 € (151) · 500 € – 1 000 € (133) · 1 000 € – 5 000 € (140) · 5 000 € – 20 000 € (105) · Plus de 20 000 € (87) · Selon devis (345) ; 528 vides | Multivalué ; un champ de tri dédié existe dans le jeu. |
| Visite autorisée | `visite_autorisee` | Oui 379 · Non 315 · 573 vides | Radios exclusives. |

Chaque select est **contextuel** : ses options sont recalculées avec les autres filtres actifs (5 contextes `ctxfilter*`, un par select, chacun recevant les refines des 4 autres). Chaque select a un champ « Filtre » de recherche, une case « Tous (n options) » et la mention « Aucune option sélectionnée » en pied.

## Le panneau droit

### État non filtré : KPI « En France, le label EPV c'est : »
- Carte à bord bleu gauche, picto médaille : « Nombre d'entreprises labellisées » → **1267** (gros chiffre bleu).
  - picto camembert « dont **34%** de PME » = `count(taille_d_entreprise='PME') / total` (434 / 1267).
  - picto camembert « dont **56%** d'entreprises artisanales » = `count(entreprise_artisanale='oui') / total` (705 / 1267).
- « Sur toutes ces entreprises labellisées : » puis deux cartes côte à côte, picto pièce :
  - « Proposent des **produits à moins de 200 €** » → **24%** = `count(gamme_de_prix LIKE '%50 € – 200 €%' OR LIKE '%Moins de 50 €%') / total`.
  - « Proposent des **produits à moins de 50 €** » → **16%** = `count(gamme_de_prix LIKE '%Moins de 50 €%') / total`.
  Les 4 KPI sont recalculés sur le contexte filtré mais **le panneau est remplacé par la liste dès qu'un filtre est actif** (vérifié avec Univers = Arts de la table : compteur « 65 », liste alphabétique 3EME DEGRE, A. RAYNAUD ET COMPAGNIE, ALINA PRODUCTION, ARC FRANCE, ARTIGA, ARTORIA, ATELIER 1515… avec picto fourchette-couteau, ascenseur interne). En pratique les KPI ne se lisent qu'à 1 267.

### État filtré : liste alphabétique
Liste déroulante (ascenseur interne) de **toutes** les entreprises du sous-ensemble (`ods-results max=-1`, tri `raison_sociale`), une ligne par entreprise : picto de l'univers + RAISON SOCIALE en majuscules bleues. Message rouge « Aucune entreprise dans votre sélection » si vide. Cliquer une ligne pose `refine.raison_sociale` et ouvre la fiche.

### Fiche entreprise (au clic sur une ligne, sur une épingle, ou sur une suggestion de recherche)
Remplace la liste ; bouton ✕ en haut à droite. Contenu observé pour ACT 1892, dans l'ordre :
1. Raison sociale en gros (« ACT 1892 »).
2. Tags gris : taille d'entreprise (« PME ») + « Entreprise artisanale » si `entreprise_artisanale='oui'`.
3. Région (« Occitanie »).
4. Site internet en lien externe.
5. « Date de labellisation : » → date formatée « 21 juin 2024 ».
6. « Code et libellé NAF : » → « 14.13Z - Fabrication de vêtements de dessus (14.13Z) ».
7. « Type de clients : » → tags séparés (« Particuliers », « Professionnels ») à partir de `type_de_clientele` splitté sur la virgule.
8. « Univers : » → picto + libellé.
9. « Secteur d'activité de l'entreprise : » → valeurs jointes par « , ».
10. « En savoir plus sur l'activité de l'entreprise : » → `description_courte` (paragraphe long).
11. « Type de produits de l'entreprise : » → `type_de_produits` brut.
12. « Gamme de prix proposée : » → `gamme_de_prix` brut.
13. « Visites : Oui » uniquement si `visite_autorisee='Oui'`.
Chaque bloc est conditionnel (absent si le champ est vide). Le compteur passe à « 1 entreprises… » et la carte n'affiche plus que l'épingle de l'entreprise (colorée selon l'univers, ici orange saumon Mode et beauté). Un tag « ✕ ACT 1892 » s'ajoute sous les filtres.

## La carte en détail

Quatre paliers de zoom sur la carte principale (`display=clusters` puis `categories`) :
- zoom ≤ 3 : clusters « pays » (jamais visible, la vue démarre à 5).
- zoom 4 à 6 : **un cluster par région** (le contexte `ctxmapfranceregion` groupe par région) : au chargement 250 (IDF), 184, 106, 181, 87, 86, 86, 69, 64, 62, 54, 44, 42, 27, 15, 9, 3, 2 (Corse)… Les régions sont teintées en violet `#9398ba` (couche `georef-france-region@public`, opacité 0.8, contours blancs).
- zoom 7 à 8 : clusters classiques.
- zoom ≥ 9 : **points colorés par univers** (palette `categories` : Mode et beauté `rgba(225,139,118)`, Ameublement `rgba(106,106,244)`, Architecture `#A94645`, …, « autre » `#000091`).
- Si le sous-ensemble filtré fait ≤ 150 entreprises, on saute directement aux points quel que soit le zoom. **Observé avec Univers = Arts de la table (65) : des épingles Leaflet bleues uniformes**, pas des points colorés (une seule catégorie → couleur « autre » `#000091` sur toute la couche ?) ; avec la recherche « Berger » (5 entreprises de 4 univers) : épingles **colorées et avec le picto de l'univers** (bleu nuit, bleu clair, saumon). La couleur par univers n'est donc visible que quand plusieurs univers coexistent.
- **Clic sur un point** : `refine-on-click` sur `raison_sociale` → ouvre la fiche (pas d'infobulle Leaflet).
- Les trois mini-cartes DROM n'ont que la couche « points colorés » et ne changent pas de zoom.
- Barre d'outils : plein écran, dessin polygone/rectangle/cercle, modifier/effacer la zone, zoom, géolocalisation, sélecteur de fond.

## Données à reproduire fidèlement

- Le compteur, les 4 KPI et leurs formules ; la liste complète alphabétique ; les 13 champs de la fiche.
- Les 6 filtres avec leurs valeurs (y compris les doublons de casse, à signaler plutôt qu'à corriger silencieusement), leur caractère contextuel, la recherche full-text avec autocomplétion et sa règle « Entrée efface les autres filtres ».
- Les 8 univers de la légende avec leurs couleurs, et la 9ᵉ catégorie sans picto.
- Le carrousel « Quelques exemples » (< 200 €, suit les filtres).
- Les textes éditoriaux et les 7 tuiles de liens (récupérer les `href` dans le source : `src/entreprise-patrimoine-vivant.unescaped.html`).
- Le fait que la carte ne se recadre pas sur le filtre et que les DROM ont trois cartes séparées.

## Remarque de rendu observée
À 1440 px, juste après le clic sur une entreprise depuis la liste, la fiche s'est brièvement dessinée hors du cadre (à droite, coupée) avant de se replacer correctement dans le panneau au scroll : instabilité de mise en page de l'original, pas une donnée à reproduire.
