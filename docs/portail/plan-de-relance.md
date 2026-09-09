# Plan de relance - Soutien aux projets industriels

- **URL** : https://data.economie.gouv.fr/pages/dataviz-plan-de-relance/
- **Producteur (badge catalogue)** : DGE
- **Jeu** : `plan-de-relance` — **3 080 lignes**, public. Champs : `entreprise, type_entreprise, siren, volet_relance, mesure, nom_departement, nom_commune, code_postal, coordonnees_gps, description_projet, mesure_light, mise_a_jour, filiere, tonnes_equivalent_co2_pour_les_projets_decarbonation, code_departement, nom_region`.
- **Relevé visuel** : 2026-09-09. Gabarit « catalogue » (fil d'Ariane, H1, encadré « Les jeux de données utilisés » → `plan-de-relance`), puis une grande carte DSFR contenant tout.

## Objectif de la dataviz et informations véhiculées

- **Question à laquelle elle répond** : « Quels projets industriels France Relance a-t-il soutenus, où, dans quels secteurs et chez quel type d'entreprises ? » Page de **redevabilité** (transparence sur l'emploi d'un plan public) plus que d'orientation.
- **Message porté** : l'ampleur (3 080 projets) et la répartition territoriale (chaque projet est un point sur la carte, dans tous les départements, DROM compris) ; la prédominance des TPE/PME (61,8 %) ; la ventilation par mesure (territoriaux, relocalisation, automobile, aéronautique, nucléaire, efficacité énergétique…) et par volet (Indépendance/Compétitivité vs Verdissement).
- **Information que l'utilisateur doit obtenir** : pour un projet, l'entreprise, sa taille, son SIREN, sa localisation, le volet, la mesure et la description du projet ; pour un territoire ou une mesure, le compte et la carte filtrée ; par région, le croisement région × mesure (histogramme empilé, à rendre **complet**).
- **Ce que la page ne montre pas** : les montants (le champ `montant_participation_etat` sert d'expression mais avec COUNT ; aucune somme d'euros n'est affichée) ni le CO₂ évité. La reproduction ne doit pas inventer d'indicateur financier.

## Structure de la carte principale

1. **Badge bleu nuit** « **3080 enregistrements** » (COUNT du contexte) + résumé des filtres actifs (`ods-filter-summary` avec bouton « tout effacer », masqué tant qu'aucun filtre).
2. **Colonne gauche (250 px) : facettes ODS standard** (`ods-facets` automatique, c'est-à-dire *toutes* les facettes déclarées sur le jeu), titre en capitales = nom technique du champ, 6 valeurs affichées puis lien « › Plus » :
   - **TYPE_ENTREPRISE** : TPE / PME 1 890 · GE 572 · ETI 541 · Association 21 · Organisme de recherche 13 · EPIC 8 · (Plus : Etablissement public 6, GIE 3, Organisme de formation 3, Autre 2 ; 21 lignes vides).
   - **NOM_DEPARTEMENT** : BOUCHES-DU-RHÔNE 102 · NORD 97 · HAUTE-SAVOIE 92 · RHÔNE 92 · HAUTE-GARONNE 89 · LOIRE-ATLANTIQUE 89 · Plus.
   - **VOLET_RELANCE** : Indépendance / Compétitivité 1 962 · Verdissement 1 118.
   - **NOM_REGION** : AUVERGNE-RHÔNE-ALPES 492 · ÎLE-DE-FRANCE 286 · HAUTS-DE-FRANCE 275 · PAYS DE LA LOIRE 270 · GRAND EST 267 · NOUVELLE-AQUITAINE 256 · Plus (BOURGOGNE-FRANCHE-COMTÉ 244, CENTRE-VAL DE LOIRE 224, OCCITANIE 224, NORMANDIE 182, PACA 182, BRETAGNE 98, GUYANE 17, LA RÉUNION 17, CORSE 14, GUADELOUPE 12, MARTINIQUE 10, NOUVELLE-CALÉDONIE 6, POLYNÉSIE FRANÇAISE 3, et une valeur parasite « Hauts-de-France » 1).
   - **MESURE** : Soutien à l'investissement industriel dans les territoires 1 158 · (Re)localisation dans les secteurs critiques 518 · Modernisation de la filière automobile 484 · Modernisation de la filière aéronautique 449 · Fonds de soutien aux investissements du secteur nucléaire 195 · Efficacité énergétique et évolution des procédés dans l'industrie 94 · Plus (Soutien à la chaleur bas carbone 91, AMI Capacity… COVID-19 48, Renforcement des compétences 43).
   Chaque valeur est cliquable (refine), les compteurs se recalculent.
3. **Carte** (droite, ≈ 910 × 660 px, `jawg.light`, centre `46.55,-0.64` zoom 6 — cadrée sur l'ouest, `no-refit`, molette désactivée, **barre de recherche de lieu** « Rechercher un lieu » en haut à gauche, plein écran, géolocalisation, outils de dessin, sélecteur de couches en haut à droite « Plan de relance - Projets industriels : liste, … »).
   - Une couche `display="categories"` sur `mesure_light`, **points (picto `dot`) sans marqueur, taille 2**, couleurs : Projets territoriaux `#6D7A87` gris · Automobile `#619FC8` bleu · Aéronautique `#F7C87E` jaune · Relocalisation `#CB516D` rose · Efficacité énergétique `#F7AD84` orange · Santé - Capacités Covid `#5D9FA3` turquoise · Soutien à la chaleur bas carbone `#64905C` vert. **Nucléaire (195) et Nucléaire - Compétences (43) ne sont pas dans la liste de couleurs** : ils prennent la couleur « autre » (points noirs observés autour de Lyon).
   - **Légende** en bas à droite (repliable) : titre de la couche, « MESURE_LIGHT », 4 entrées + « 3 éléments de plus … » ; dépliée elle montre les 7 couleurs sur deux colonnes.
   - **Bandeau jaune d'avertissement** au chargement : « ⚠ Certaines couches sont affichées partiellement pour des raisons de performance. Essayez de zoomer. » → **l'original lui-même tronque les points au niveau France.**
   - **Infobulle au clic** (template par défaut, tous les champs, paginée « 1 / 2 » quand plusieurs projets partagent la position) : ENTREPRISE (« Optique Fichou »), TYPE_ENTREPRISE (« ETI »), SIREN, NOM_DEPARTEMENT (« LOIRE »), NOM_COMMUNE (« PUYBRUN »), CODE_POSTAL (« 42000 »), VOLET_RELANCE (« Verdissement »), MESURE (« Modernisation de la filière aéronautique »), DESCRIPTION_PROJET (paragraphe long). Les champs `mesure_light`, `mise_a_jour`, `filiere`, `tonnes_equivalent_co2…`, `code_departement`, `nom_region` n'apparaissent pas dans l'infobulle.
4. **Deux graphiques côte à côte** sous la carte (500 px de haut) :
   - **« Décompte par région et par type de mesure »** : histogramme **empilé** X = `nom_region` (labels tronqués à 9 caractères : AUVERG…, BOURGO…, BRETAGNE, CENTRE…, CORSE, GRAND EST, GUADEL…, GUYANE), Y « Nombre » (COUNT), empilement par `mesure` (9 séries, légende sous le graphe avec libellés tronqués). **Défaut de l'original : `maxpoints=50` avec 9 séries × 20 régions → seules les 8 premières régions dans l'ordre alphabétique sont tracées** (jusqu'à GUYANE). Hauts-de-France, Île-de-France, Normandie, Nouvelle-Aquitaine, Occitanie, PACA, Pays de la Loire… sont absents du graphique alors qu'ils sont dans les facettes. Une reproduction fidèle *aux données* doit tracer les 20 régions (119 combinaisons région × mesure).
   - **« Répartition par type d'entreprise »** : camembert X = `type_entreprise`, COUNT, palette `range-PuBu` (bleus pâles), étiquettes externes (Association, Autre, EPIC, ETI, Etablissem…, GE, GIE, Organisme …, Organisme …, TPE / PME), infobulle « TPE / PME — Nombre 1 890 (61,8%) ».
   Les deux graphiques suivent les facettes (même contexte).

## Données à reproduire fidèlement
- Compteur, 5 facettes (avec les valeurs complètes ci-dessus), résumé des filtres.
- Carte à points colorés par `mesure_light` (7 couleurs + « autre »), infobulle à 9 champs paginée, recherche de lieu.
- Histogramme empilé région × mesure **complet** (20 régions, 9 mesures) et camembert par type (11 valeurs dont vide).
- Ne pas oublier : la couche originale est tronquée à l'échelle France ; c'est un défaut à signaler, pas à imiter.
