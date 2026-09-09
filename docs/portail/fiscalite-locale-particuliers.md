# Fiscalité locale des particuliers et des professionnels

- **URL catalogue** : `/pages/fiscalite-locale-particuliers/?headless=true` (le `headless` retire l'en-tête et le pied de page du portail : la page est conçue pour être **intégrée en iframe** dans impots.gouv.fr). Deux pages sœurs, reliées par des onglets : **Particuliers** `/pages/fiscalite-locale-particuliers/` et **Professionnels** `/pages/fiscalite-locale-entreprises/?headless=true`.
- **Producteur (badge catalogue)** : DGFiP (Bureau GP2A).
- **Jeux** : `fiscalite-locale-des-particuliers-geo` (**174 668 lignes** = ~34 950 communes × 5 exercices 2021-2025 ; champs de taux `taux_global_tfb`, `taux_global_tfnb`, `taux_plein_teom`, `taux_global_th`, majoration `ind_majothrs` / `thsurtaxrstau`, population `mpoid`, EPCI `sirepci`/`optepci`/`q03`, géométries `geom`/`centroid` + une paire par millésime `geom2021…geom2025`, et les taux détaillés `b12vote…h52ggemapi`) ; `fiscalite-locale-des-entreprises-copie` (même volume, taux `taux_global_cfe_hz`, `taux_global_cfe_zae`, `taux_global_cfe_eol` à la place de la TH). Le téléchargement pointe vers `fiscalite-locale-des-particuliers` (jeu sans géométrie).
- **Relevé visuel** : 2026-09-09.

## Objectif de la dataviz et informations véhiculées

- **Question à laquelle elle répond** : « Quels taux d'impôts locaux s'appliquent dans *ma* commune, et comment se situent-ils par rapport au département et à la région ? » Outil de **comparaison territoriale** des taux globaux (TFB, TFNB, TEOM, TH pour les particuliers ; TFB, TFNB, TEOM, trois CFE pour les professionnels), conçu pour être intégré dans impots.gouv.fr.
- **Message porté** : le taux « vision contribuable » (communal + intercommunal + syndicats + taxes annexes), différent du taux voté ; la dispersion intra-départementale (choroplèthe à 4 classes) ; la position de chaque commune par rapport aux moyennes (Moy Dép / Moy Rég) ; la majoration de TH sur résidences secondaires quand elle existe. La notice méthodologique est constitutive du message (ce que le taux inclut et n'inclut pas, TEOM à part, REOM absente).
- **Information que l'utilisateur doit obtenir** : pour une commune, ses 4 (ou 6) taux, sa population, son EPCI et son régime fiscal ; pour un département, la carte et les moyennes ; la possibilité de comparer plusieurs communes côte à côte et d'exporter.
- **Niveaux** : exercice (5 ans) → région → département → commune(s). Le parcours guidé en deux écrans est un choix d'ergonomie pour un public non expert.

## Écran 1 (« slide1 ») : sélection

Carte centrée étroite (≈ 780 px) **posée sur une carte de France statique floutée** en fond (`ods-map static-map`, zoom 7, `jawg.light`, sans contrôle). Contenu :
1. H1 « Site fiscalité locale des particuliers et des professionnels ».
2. Encadré gris avec logo Finances Publiques : « Ce site permet de visualiser les taux d'impositions directes locales appliqués aux particuliers et aux professionnels sur le territoire d'une commune. » / « **Source :** Calcul DGFiP, fichier de recensement des éléments d'imposition (REI) » / « **DGFiP - Bureau GP2A** ».
3. **Onglets** Particuliers (actif) / Professionnels (lien vers la page sœur).
4. Trois selects en cascade, dans une carte : 
   - « **Sélectionner un exercice** » : `group_by exercice` → **2021, 2022, 2023, 2024, 2025** ; **2025 présélectionné**.
   - « **Sélectionner une région** » (placeholder « Région… ») : `group_by reg, libreg` trié par libellé, libellés en capitales sans accents (AUVERGNE-RHONE-ALPES, BOURGOGNE-FRANCHE-COMTE, BRETAGNE, CENTRE-VAL DE LOIRE, CORSE…). Changer de région vide le département.
   - « **Sélectionner un département** » : n'apparaît qu'une fois la région choisie ; libellé « COTE-D'OR (21) », « DOUBS (25) »… trié par code.
   - Bouton bleu « **➜ Suivant** » (apparaît quand région + département sont choisis) → passe à l'écran 2.

## Écran 2 (« slide2 ») : le tableau de bord départemental

- **Bandeau d'en-tête** : lien « ← Retour » ; titre « Fiscalité Locale des Particuliers » ; sous-titre surligné « Taux globaux appliqués en 2025 par type de taxe » ; les **3 selects rappelés** (exercice / région / département, modifiables ici) ; à droite un **groupe de 4 boutons** : « 🌐 CARTE » / « ☰ TABLE - 698 lignes » (bascule de vue, le nombre = COUNT du contexte communes : 698 communes en Côte-d'Or, puis « 2 lignes » quand deux communes sont cochées) / « ⬇ Télécharger » (export ODS du jeu filtré) / « ? Notice » (ouvre la popin Méthodologie).
- « **Sélectionnez un type de fiscalité** » : **4 tuiles-boutons** (celle active en orange `#FF6F4C` plein) : « Taxe Foncière sur les Propriétés Bâties (TFB) » (icône immeuble) · « Taxe Foncière sur les Propriétés Non Bâties (TFNB) » (feuille, vert) · « Taxe d'Enlèvement des Ordures Ménagères (TEOM) » (recyclage, brun) · « Taxe d'Habitation sur les résidences secondaires (THRS) et les logements vacants (THLV) » (maison, bleu). Chaque tuile porte deux moyennes : « **Moy Dép : 37,97 %** / **Moy Rég : 39,12 %** » (AVG du taux sur le département / sur la région ; observé Côte-d'Or 2025 : TFB 37,97 / 39,12 · TFNB 79,87 / 83,35 · TEOM 10,00 / 10,59 · TH 17,97 / 20,94). La tuile choisie pilote la carte (`params.legende`). En mobile c'est un select « Fiscalité… ».
- **Colonne gauche « Sélectionnez des communes »** : select **multiple** avec recherche (« Sélectionnez un ou plusieurs éléments »), options « DIJON (21231) », « FONTAINE LES DIJON (21278) »… (`group_by libcom, insee_com`, tri par libellé). Une fois des communes cochées : **une carte par commune** (4 par page, pagination à droite) :
  - « **DIJON (21231)** - 163 169 hab. » (`mpoid`), en italique l'EPCI « Dijon Métropole (FPU) » (`q03` + `optepci`),
  - 4 valeurs : « **TFB :** 52,05 % » (tuile orange si TFB est la taxe active), « TFNB : 136,14 % », « TEOM : 6,4 % », « THRS et THLV : 33,47 % »,
  - si `ind_majothrs` : « La commune applique une majoration de x % à la taxe d'habitation » (`thsurtaxrstau`),
  - une note « (*) » pour les communes sans géométrie (liste séparée `geom IS NULL`).
- **Vue CARTE** (droite) : **choroplèthe des communes du département** (`reidep`), gradient 4 classes calculé côté client (`ods-color-gradient`, classes égales sur AVG du taux par commune ; gris `rgb(167,167,167)` sans valeur). **Une palette par taxe** : TFB `rgb(254,233,231)` → `#FF6F4C` (orange) ; TFNB `rgb(199,246,252)` → `#00AC8C` (vert) ; TEOM `rgb(254,235,208)` → `#A26859` (brun) ; TH `#E6ECFF` → `#484D7A` (bleu), contours gris ; **légende en haut à droite** : titre de la taxe, « Taux global (en %) », 4 classes (« 24,1 - 32,5 · 32,5 - 40,9 · 40,9 - 49,2 · 49,2 - 57,6 » pour la TFB en Côte-d'Or). Cliquer une commune sur la carte la **coche** dans le select (`refine-on-click`, cumulatif) ; les communes cochées reçoivent un **contour noir épais** (couche `reicom` transparente). Pas d'infobulle. Molette active, pas de plein écran.
- **Vue TABLE** : `ods-table` des communes cochées (ou de tout le département si aucune) avec colonnes EXERCICE, REG, LIBREG, DEP, LIBDEP, SIREPCI, OPTEPCI, Q03, COM, INSEE COM, LIBCOM, MPOID, Taux_Global_TFB, Taux_Global_TFNB, Taux_Plein_TEOM, Taux_Global_TH (tri par colonne), mention « Toutes les dates et heures sont affichées dans le fuseau horaire Europe/Paris ».
- **Bandeau gris de pied** : « Taux globaux reconstitués pour chaque commune pour les principales taxes de fiscalité locale à fin de comparaison (plus d'informations disponibles dans la *Notice*). / **Service des gestions publiques locales, des activités bancaires et économiques - DGFiP** ».
- **Popin « Méthodologie »** (bouton Notice) : long texte en 4 puces + 4 notes de bas de page, « Focus par taxe » (TFB, TFNB, TEOM, TH avec listes d'agrégation), « Liste des acronymes » (CA, CC, CU, MET, TEOM, TFB, TFNB, TH, THRS, THLV), bouton « Retour ». Texte intégral dans `src/fiscalite-locale-particuliers.unescaped.html` (l. 420-520).

## Page Professionnels (`fiscalite-locale-entreprises`)
Même gabarit exactement (vérifié à l'écran en `?headless=true` : ni en-tête ni pied de page du portail), sur `fiscalite-locale-des-entreprises-copie`, avec **6 taxes** : TFB, TFNB, TEOM, **CFE HZ** (Cotisation Foncière des Entreprises Hors Zone d'Activité Économique), **CFE ZAE** (en Zone d'Activité Économique), **CFE EOL** (Zone Éolienne) ; 6 tuiles (couleur active : orange TFB, vert TFNB, brun TEOM, bleu CFE HZ, vert olive CFE ZAE, brun-rouge CFE EOL), 6 légendes, table à 18 colonnes, cartes-communes à 6 valeurs, notice enrichie d'un « Taux de cotisation foncière des entreprises (CFE) » en 3 sous-parties et d'acronymes CFE. **Observé (Finistère 2025)** : TFB Moy Dép 37,33 % / Moy Rég 40,19 % · TFNB 76,62 / 93,71 · TEOM 9,44 / 11,29 · CFE HZ 24,94 / 26,00 · **CFE ZAE et CFE EOL : « Moy Dép : Sans objet » / « Moy Rég : Sans objet »** (aucune commune concernée) et, une fois la tuile choisie, **carte entièrement grise avec une légende sans classes**. Pour la TEOM, la légende comporte une 5ᵉ entrée grise « **Aucune valeur** » (communes financées par la REOM, nombreuses dans le Finistère) — la classe « sans valeur » fait partie de la lecture, pas seulement de la palette.

## Données à reproduire fidèlement
- Cascade exercice (5) → région → département → écran 2 ; rappel des selects ; compteur de lignes.
- 4 (resp. 6) taxes avec moyennes départementale et régionale (AVG) recalculées par exercice.
- Choroplèthe communale à 4 classes avec légende, sélection cumulative au clic, contour des sélectionnées ; vue table ; export.
- Cartes-communes avec population, EPCI, 4 (6) taux, majoration TH conditionnelle.
- La notice méthodologique complète et les textes d'en-tête.
- Attention au volume : 174 668 lignes, ~700 géométries par département (chargées par `refine.dep`), 5 jeux de géométries millésimées.
