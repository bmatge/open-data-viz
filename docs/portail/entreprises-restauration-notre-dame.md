# Rebâtir Notre-Dame (Les entreprises à l'œuvre pour la restauration de Notre-Dame de Paris)

- **URL** : https://data.economie.gouv.fr/pages/entreprises-restauration-notre-dame/
- **Producteur (badge catalogue)** : DGE
- **Jeux** : `restauration-notre-dame` (**225 lignes**, public ; 160 ont des `images`) + `georef-france-region@public` (fond violet des régions, filtré par `reg_name`).
- Champs : `id, entreprise, siret, siren, epv, categories_de_metiers, etablissement_* (adresse éclatée), indiquez_l_adresse_de_votre_site_internet, presentez_brievement_votre_entreprise_et_votre_activite, presentez_brievement_votre_intervention_sur_le_chantier_de_notre_dame_de_paris, indiquez_le_s_credit_s_des_photos_deposees, est_ce_que_votre_entreprise_atelier_ouvre_ses_portes_au_public, indiquez_le_lien_ci_apres_pour_les_conditions_de_visite, adresse_complete, images, coordonnees_manuelle, nom_officiel_region, geo_point, reg_name`.
- **Relevé visuel** : 2026-09-09.

## Objectif de la dataviz et informations véhiculées

- **Question à laquelle elle répond** : « Qui a reconstruit Notre-Dame, avec quel savoir-faire, et peut-on visiter ces ateliers ? » Page de **valorisation** (DGE + établissement public Rebâtir Notre-Dame) : mettre en lumière des entreprises et des métiers, susciter des vocations (paragraphe sur le recrutement et la formation des jeunes).
- **Message porté** : l'excellence française est répartie sur tout le territoire (carte, régions teintées, 30 entreprises hors de France) et couvre quatre familles de métiers (art et patrimoine 103, accompagnement 54, pilotage 48, bâtiment 20) ; l'ampleur humaine (« + 3 000 compagnons et artisans », chiffre éditorial) ; l'ouverture au public (61 entreprises visitables, 28 labellisées EPV).
- **Information que l'utilisateur doit obtenir** : pour une entreprise, son rôle précis sur le chantier (paragraphe dédié), son activité, sa catégorie, son adresse, son site, si elle se visite et comment réserver, et **ses photos** (la galerie est le support émotionnel de la page).
- **Registre** : storytelling institutionnel autant que dataviz ; les sections éditoriales (établissement public, « En savoir plus ») font partie du message.

## Structure (de haut en bas)

1. **H1** « Les entreprises à l'œuvre pour la restauration de Notre-Dame de Paris » + 4 paragraphes éditoriaux (incendie du 15 avril 2019, réouverture le 8 décembre 2024, DGE + établissement public Rebâtir Notre-Dame de Paris, « Cette cartographie a vocation à évoluer… ») avec deux liens externes ; flèche courbe vers les filtres.
2. **Bloc de filtres** (carte blanche, une ligne) :
   - **Recherche** : champ « Nom établissement » + bouton loupe ; autocomplétion `entreprise LIKE 'x*'` (10 suggestions au format « NOM – CP LOCALITÉ », puis « + de 10 résultats »). Choisir une suggestion pose `refine.entreprise` → ouvre la fiche.
   - **Accueil du public** : radios **Oui / Non** (`refine.est_ce_que_votre_entreprise_atelier_ouvre_ses_portes_au_public`) — Non 164 · Oui 61.
   - **Catégories de métier** : select multiple, 4 valeurs : Métiers d'art et du patrimoine 103 · Métiers de l'accompagnement et du soutien de la restauration 54 · Métiers de l'aide au pilotage 48 · Métiers du bâtiment et des grands chantiers 20.
   - **Région** : select multiple sur `reg_name` : Île-de-France 86 · Grand Est 19 · Nouvelle-Aquitaine 17 · Pays de la Loire 13 · Centre-Val de Loire 10 · Occitanie 10 · Auvergne-Rhône-Alpes 9 · Normandie 9 · Hauts-de-France 6 · PACA 6 · Bourgogne-Franche-Comté 5 · Bretagne 4 · Guyane 1 ; **30 lignes sans région** (entreprises étrangères : Italie, Belgique, Allemagne… visibles sur la carte hors des régions teintées).
   - Sous les filtres : tags supprimables (ex. « ✕ COMES STUDIO ASSOCIATO ») + « ✕ Effacer la sélection ».
3. **Zone carte (gauche, ≈ 60 %) + panneau droit** :
   - **Carte** `jawg.light`, centre `47.13, 2.59` zoom 5, `no-refit`, molette active, plein écran, outils de dessin. Couche régions (violet `#9398ba`, contours blancs), puis couche points `display=categories` sur `categories_de_metiers` avec **épingles à picto** : Métiers d'art et du patrimoine `#009099` (pinceau, turquoise), Accompagnement/soutien `#FFCA00` (électricité, jaune), Aide au pilotage `#000091` (calendrier, bleu nuit), Bâtiment et grands chantiers `#F95A5C` (marteau, rouge). 4 autres catégories ont une couleur définie dans le source mais **n'existent pas dans les données** (gros œuvre, recherche scientifique, restauration intérieure liée au culte, aménagement intérieur). Vue initiale : de l'Irlande à l'Autriche ; des épingles en Belgique, Pays-Bas, Allemagne, Italie.
   - **Légende sous la carte** : « Légende » + 4 entrées avec l'épingle-picto de chaque catégorie (générées depuis les valeurs présentes, `paramLegend`).
   - Clic sur une épingle : `refine.entreprise` → **fiche dans le panneau droit** (pas d'infobulle), la carte ne garde que cette épingle, tag « ✕ NOM » sous les filtres.
   - **Panneau droit, état initial : « La restauration de Notre-Dame de Paris en quelques chiffres : »** — 4 cartes KPI à bord gauche bleu (2 × 2) :
     - « Nombre d'entreprises participant à la restauration * » → **225** (`count(id)` sur le contexte filtré).
     - « Nombre d'entreprises qui accueillent du public » → **61** (`where … LIKE 'oui'`).
     - « Nombre d'entreprises labellisées « Entreprises du patrimoine vivant » » → **28** (`where epv LIKE 'EPV'`).
     - « Nombre de compagnons et artisans 2019 – 2024 : » → **+ 3 000** (**valeur codée en dur**, pas dans les données).
     - puis carte « **Nombre d'entreprises par catégories de métiers** » : **camembert** (COUNT(id) par `categories_de_metiers`, couleurs de la palette ci-dessus, sans étiquettes sur les parts) + légende à puces colorées sous le graphe (4 entrées). Tout suit les filtres (`ctxfilter`).
   - **Panneau droit, état « liste »** (quand un filtre est actif) : liste alphabétique des entreprises avec picto de catégorie, cliquable (comme EPV).
   - **Panneau droit, fiche entreprise** (observé : COMES STUDIO ASSOCIATO) : bouton ✕ ; nom en capitales ; `adresse_complete` (« 695 VIALE ARIOSTO 50019 SESTO FIORENTINO FI ») ; site internet (lien si commence par http, sinon texte) ; « **Catégorie de l'entreprise :** » ; « **Activité de l'entreprise :** » (paragraphe) ; « **Son rôle sur le chantier de Notre-Dame de Paris :** » (paragraphe) ; « **Accueil du public : Non/Oui** » + si Oui et lien renseigné : « Pour réserver une visite : » + lien ; « **Galerie de photos :** » + « Crédit photo : … » + **bande horizontale défilante de vignettes** (`images` = liste de fichiers séparés par des virgules, servis depuis `https://www.entreprises.gouv.fr/files/files/img-carto-rebatir-nd/<fichier>`), clic sur une vignette → **visionneuse modale** plein écran (`params.image_selected`). 160 entreprises sur 225 ont des photos.
4. Note en bas de la zone : « * Seules les entreprises ayant répondu à ce jour au questionnaire figurent sur cette cartographie, qui pourra évoluer. »
5. **Section blanche « L'établissement public Rebâtir Notre-Dame de Paris »** : 5 paragraphes + photo du chantier (`datEco-notre-dame-constrution.png`), puis « **En savoir plus sur le projet** » : 4 paragraphes, liens DGE, Instagram `@rebatirnotredamedeparis`, `rebatirnotredamedeparis.fr`. Textes complets dans `src/entreprises-restauration-notre-dame.unescaped.html`.

## Données à reproduire fidèlement
- 3 KPI calculés + 1 KPI codé en dur (« + 3 000 »), camembert 4 catégories.
- 4 filtres (recherche avec autocomplétion, radios, 2 selects), tags + effacer.
- Carte 2 couches (régions + épingles à picto par catégorie), 30 entreprises hors région (étranger) à ne pas perdre.
- Fiche 8 rubriques + galerie photos externe (images hébergées sur entreprises.gouv.fr) + visionneuse.
- Liste alphabétique filtrée.
