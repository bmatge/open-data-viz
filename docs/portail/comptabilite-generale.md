# Données de comptabilité générale de l'État (2016-2025)

- **URL d'entrée** : https://data.economie.gouv.fr/pages/comptabilite-generale/ — mais la dataviz est un **ensemble de 4 pages** reliées par une barre d'onglets (liens, pas des onglets JS) :
  1. `/pages/comptabilite-generale/` — **Vue générale**
  2. `/pages/comptabilite-generale-par-mission/` — **Vue par mission**
  3. `/pages/comptabilite-generale-reference/` — **Références**
  4. `/pages/comptabilite-generale-glossaire/` — **Glossaire**
- **Producteur (badge catalogue)** : DGFiP
- **Jeux de données** (tous appelés avec la clé `8c1e558f…` présente en clair dans le source ; les trois annexes sont en visibilité *restricted*, le principal est *domain*) :
  - `balances_des_comptes_etat` — 517 489 lignes. Champs utiles : `annee` (date), `categorie` (Actif / Passif / Charges / Produits / EHB / Situation nette), `postes`, `sous_postes`, `mission`, `libellemission`, `programme`, `balance_sortie` (€), `balance_sortie_2` (€, sert aux KPI « en 2025 » divisés par 10⁹), `balance_sortie_3` (Md€, sert aux graphiques « Générale » et aux soldes), `balance_sortie_4` (M€, sert aux graphiques « Par postes » avec `multiplier=0.001`).
  - `comptabilite_generale_glossaires_et_references_07052025` — 46 lignes (`titre`, `definition`, `lettre`) : nourrit les accordéons « Comprendre la légende » et la page Glossaire.
  - `missions_glossaires_et_references` — 62 lignes (`mission`, `code_mission`, `descriptif`, `faits_marquants_de_l_exercice_2025_rdp`, `affichage_bilan`) : texte d'intro de chaque mission.
  - `nomenclature-programme` — 199 lignes (`programme`, `libelleprogramme`, `libellemission`, `mission`).
- **Relevé visuel** : 2026-09-09, Chrome 1440 px.

## Objectif de la dataviz et informations véhiculées

- **Question à laquelle elle répond** : « Quelle est la situation patrimoniale de l'État et son résultat, sur dix exercices, et comment se décomposent-ils ? » C'est une **pédagogie du Compte général de l'État** (bilan et compte de résultat) destinée aux citoyens et parlementaires, portée par la DGFiP.
- **Message porté** : la trajectoire — l'actif croît (1 000 → 1 326 Md€) mais le passif croît plus vite (2 180 → 3 442 Md€) ; le solde (situation nette) se creuse chaque année (-1 203 → -2 116 Md€, « + 6 % ») ; charges > produits chaque année (déficit patrimonial de -52 à -166 Md€). La vue « Soldes » avec ses évolutions N/N-1 est le cœur du message, plus que les histogrammes.
- **Informations que l'utilisateur doit obtenir** : les 4 chiffres 2025 ; la série 2016-2025 des 4 agrégats ; la décomposition par postes (8 postes d'actif, 6 de passif, 4 de charges, 4 de produits) ; le solde et son évolution annuelle ; la définition de chaque terme (glossaire de 46 entrées relié aux graphiques). Vue par mission : la même lecture (résultat, postes) pour chacune des 56 missions budgétaires, en M€, avec son descriptif et ses faits marquants.
- **Vocabulaire à respecter** : « Bilan », « Compte de résultat », « Actif / Passif », « Produits / Charges », « Situation nette », « Montants en Md€ » (M€ par mission). Les couleurs bleu = actif/produits, rouge = passif/charges sont un code de lecture, pas une décoration.
- **Ce que la page n'est pas** : ni un budget (loi de finances) ni de la comptabilité budgétaire — la notice le rappelle ; ne pas mélanger avec les données de budget.gouv.fr.

## Page 1 — Vue générale (~4 000 px)

### En-tête
- Barre d'onglets DSFR (fond bleu très pâle, **sticky** en haut au scroll) : Vue générale (actif) / Vue par mission / Références / Glossaire, avec à droite la phrase « La **Vue générale** présente un aperçu global des comptes de l'État. Pour accéder à une vue thématique (missions), cliquez sur **Vue par mission.** »
- Bandeau gris-bleu : H1 « Datavisualisation des comptes de l'État », sous-titre gras « Bienvenue dans ce tableau de bord conçu et développé par le bureau en charge de la production et de la valorisation des comptes de l'État à la DGFiP et la Délégation à la Transformation numérique », paragraphe « Cette interface vous permettra d'appréhender la situation comptable de l'État sur une profondeur de 10 exercices… », « **Comment manipuler l'outil ?** » + phrase explicative, bouton bleu « En savoir plus sur les comptes de l'État » (ancre `#scrollBntComptabilite`). Illustration balance à droite.

### « Données générales » — bloc **Bilan : Actif / Passif**
Titre-lien souligné « Bilan : » puis « Actif » / « Passif » (liens vers le glossaire). À droite, un **contrôle segmenté** à 3 positions : **Générale** (défaut) / **Par postes** / **Soldes**. Colonne droite : deux cartes KPI (bord gauche bleu / rouge) :
- « Actif en 2025 » → **1 326 Md€** (`sum(balance_sortie_2) where year(annee)=2025 and categorie='Actif'` / 10⁹)
- « Passif en 2025 » → **3 442 Md€** (idem Passif)

| Vue | Rendu observé |
|---|---|
| **Générale** | Un histogramme groupé, 10 années 2016→2025 en X (labels inclinés), Y « Montants en Md€ » de 0 à 4 000. Deux séries : **Actif** (bleu `#263891`, ~1 000 → 1 326) et **Passif** (rouge `#BA0129`, 2 180 → 3 442). `SUM(balance_sortie_3)` par année, `series-breakdown=categorie`. Légende sous le graphe. |
| **Par postes** | **Deux** histogrammes **empilés** l'un sous l'autre : Actif par postes (Y 0-1 400, palette bleue : Charges constatées d'avance, Comptes de régularisation - Actif, Créances, Immobilisations corporelles, Immobilisations financières, Immobilisations incorporelles, Stocks, Trésorerie active) puis Passif par postes (Y 0-4 000, palette rouge : Autres passifs (hors trésorerie), Comptes de régularisation - Passif, Dettes financières, Dettes non financières, Provisions, Trésorerie passive). `SUM(balance_sortie_4) × 0.001`. Infobulle au survol « 2020 / Immobilisations corporelles 508,13 ». Les couleurs par poste sont fixées dans le source (`category-colors`), et diffèrent entre les deux pages du site. |
| **Soldes** | Pas un ods-chart : un **graphique fait en HTML/CSS** (`bar-custom`). Une barre rouge par année, orientée vers le bas, avec le solde écrit verticalement dedans : **-1 203, -1 260, -1 296, -1 370, -1 536, -1 658, -1 758, -1 875, -1 987, -2 116 Md€** (2016→2025), axe avec « 0 Md€ » et « -1000 Md€ », et sous chaque barre l'**évolution N/N-1** en gras coloré : + 5 %, + 3 %, + 6 %, + 12 %, + 8 %, + 6 %, + 7 %, + 6 %, + 6 % (rien pour 2016). Formule : `solde = Σactif − Σpassif` sur `balance_sortie_3`, hauteur relative au solde de la dernière année. Un `fr-table` masqué (overflow hidden) double ces valeurs. |

Sous chaque graphique : accordéon **« Comprendre la légende »** : une rangée de pastilles (les catégories ou postes du graphe, celle sélectionnée en gras, les autres grisées) + un encadré avec la définition tirée du glossaire (`definition where titre = <pastille>`). Ex. : « Les charges constatées d'avance sont des charges dont le paiement est intervenu au cours de l'exercice, mais pour lesquelles le service fait interviendra sur l'exercice suivant. »

### Bloc **Compte de résultat : Produits / Charges**
Même gabarit, même contrôle segmenté (Générale / Par postes / Soldes), KPI :
- « Produits en 2025 » → **526 Md€** ; « Charges en 2025 » → **655 Md€**.

| Vue | Rendu observé |
|---|---|
| Générale | Histogramme groupé, Y 0-700 Md€, **Charges** (rouge, 495 → 655) et **Produits** (bleu, 420 → 526). L'ordre des séries est Charges puis Produits (inverse du bilan). |
| Par postes | Charges empilées (Charges de fonctionnement direct, Charges d'intervention, Charges de fonctionnement indirect, Charges financières) puis Produits empilés (Produits de fonctionnement, Produits régaliens nets, Produits d'intervention, Produits financiers). |
| Soldes | Barres CSS : **-76, -61, -52, -85, -166, -142, -160, -125, -124, -129 Md€** avec évolutions -19 %, -15 %, + 63 %, + 96 %, -14 %, + 13 %, -22 %, -1 %, + 5 %. Axe « 0 Md€ » / « -100 Md€ ». Hauteur relative au **max** des soldes (pas à la dernière année, contrairement au bilan). |

### Suite de la page
- Section « Tout comprendre sur les comptes de l'État » (ancre du bouton d'en-tête) : illustration, titre « Quelles informations apporte la comptabilité générale de l'État ? », trois colonnes illustrées avec mots-clés en liens vers le glossaire (« Une évaluation des *charges* et des *produits* au sein d'un *compte de résultat*… », « Une présentation de la situation patrimoniale… *actif* et son *passif* au sein d'un *bilan* unifié. », « Des informations sur les engagements… »), paragraphe de conclusion, « Pour aller plus loin » → bouton externe « Accéder aux documents relatifs aux comptes de l'État » (budget.gouv.fr, comptes 2025).
- Pied de page à deux volets : bleu « Source des données » (bouton vers `/explore/assets/balances_des_comptes_etat/view/`) et bleu pâle « Une question ? » (bouton « Envoyer un message » vers `/pages/contact0/`).

## Page 2 — Vue par mission

- Même barre d'onglets. Texte « **Sélectionnez une mission** pour accéder aux données » avec flèche courbe, puis un bloc bleu pâle avec un **select simple « Mission »** (placeholder « Selectionnez une mission », champ « Filtre » de recherche). **56 options** triées alphabétiquement (`group_by libellemission` sur `balances_des_comptes_etat`, **moins 16 missions exclues en dur** : Aides à l'acquisition de véhicules propres, Avances à l'audiovisuel public, Avances au fonds d'aide à l'acquisition de véhicules propres (pourtant vu dans la liste !), Avances aux organismes de sécurité sociale, Contrôle et exploitation aériens, Couverture des risques financiers de l'État, Crédits non répartis, Émission des monnaies métalliques, Gestion des actifs carbone de l'État, Lancement de certains matériels de guerre…, Liquidation d'établissements publics…, Prêts et avances à divers services…, Remboursements et dégrèvements, Renouvellement des concessions hydroélectriques, Sécurité civile, Services nationaux de transport conventionnés de voyageurs). Premières options observées : Action extérieure de l'État, Administration générale et territoriale de l'État, Agriculture…, Aide publique au développement, Anciens combattants…, Approvisionnement de l'État et des forces armées en produits pétroliers…, Avances au fonds d'aide…, Avances aux collectivités territoriales…, Cantine et travail des détenus…, Cohésion des territoires, Conseil et contrôle de l'État, Contrôle de la circulation et du stationnement routiers, Culture, Défense, Développement agricole et rural, Direction de l'action du Gouvernement, Ecologie…, Economie, Engagements financiers de l'État, Enseignement scolaire, Exploitations industrielles des ateliers…
- **Sans mission** : encadré gris à bord violet avec flèche ↑ « Sélectionnez une mission pour accéder aux données ». Rien d'autre.
- **Avec mission** (observé : « Approvisionnement de l'État et des forces armées en produits pétroliers… ») :
  1. **Accordéon** « <nom de la mission> » (bouton) contenant le `descriptif` HTML de la mission (long texte réglementaire « - en recettes… ; - en dépenses… ») et, si présent, un callout « **Faits marquants** » (`faits_marquants_de_l_exercice_2025_rdp`).
  2. **Bloc Bilan** (seulement si `affichage_bilan !== 'non'` pour cette mission ; absent pour la mission observée) : « Comparez l'actif et le passif de l'État sur les dix dernières années », segmenté **Total / Postes de l'actif / Postes du passif** (+ soldes), unité **M€** (`balance_sortie_3 × 1000`).
  3. **Bloc Compte de résultat** : « Compte de résultat : Produits / Charges », sous-titre « Comparez les charges et les produits de l'État sur les dix dernières années », segmenté **Total / Postes des charges / Postes des produits**. Vue Total observée : histogramme groupé Produits (bleu, 70 → 205) / Charges (rouge, ~ 900-1 000), Y « Montants en M€ », 2016-2025 ; légende Produits · Charges ; accordéon « Comprendre la légende ».
  - Le filtre appliqué aux contextes est `refine.libellemission` (disjunctive), avec en plus un filtre `programme` possible (non exposé dans l'UI).
- **Pas de KPI « en 2025 »** sur cette page.

## Page 3 — Références
Titre « Références », encadré bleu pâle « Ressources complémentaires » (« Retrouvez ici le compte général de l'État et les autres productions valorisant les comptes de l'État. ») avec **5 cartes illustrées** (visuels typographiques colorés) : Le compte général de l'État (PDF), Rapport de présentation du compte général de l'État (PDF), La balance générale des comptes de l'État (PDF), Le rapport sur le contrôle interne comptable… (Lien externe), La plaquette 4 pages (« À venir »). Puis « **Documentation réglementaire** » avec 2 cartes : La loi organique relative aux lois de finances (Lien externe), Le recueil des normes comptables de l'État (RNCE) (Lien externe). Texte de chaque carte dans `src/comptabilite-generale-reference.unescaped.html`. Page 100 % statique (aucune donnée).

## Page 4 — Glossaire
Titre « Glossaire », **champ « Rechercher »**, puis un **alphabet A→Z** : lettres en bleu gras si au moins une définition commence par cette lettre (A B C D I L M O P R S T), grisées sinon. **Au chargement, aucune définition n'est affichée** ; cliquer une lettre liste les fiches (titre bleu + définition) : « A » → Actif, Autres passifs (hors trésorerie). 46 entrées au total (liste dans l'API : Actif, Bilan, Charges, … Trésorerie passive). Données : `comptabilite_generale_glossaires_et_references_07052025` (`titre`, `definition`, `lettre`).

## Données à reproduire fidèlement
- Les 4 KPI 2025 (1 326 / 3 442 / 526 / 655 Md€) et leur formule.
- Les 6 graphiques de la vue générale (2 groupés, 4 empilés) sur 10 exercices, avec les catégories et postes exacts listés ci-dessus, et les 2 graphiques de soldes avec les évolutions N/N-1.
- Les 6 accordéons « Comprendre la légende » reliés au glossaire.
- Le select des 56 missions (avec la liste d'exclusion), la description + faits marquants par mission, le bilan conditionnel, le compte de résultat par mission (Total / postes), en **M€**.
- Le glossaire (46 fiches, filtrage par lettre et par recherche) et la page Références (7 cartes).
- Les définitions de `balance_sortie_2/3/4` (€, Md€, M€) : choisir la bonne colonne selon la vue.

## Remarques d'observation
- Sur la page « Vue par mission », après un scroll vers le bas, le contenu (accordéon + graphiques) a disparu de l'écran pour ne laisser que le select et le pied de page : rendu instable de l'original (plusieurs captures identiques). Le chargement de 517 k lignes en agrégation est visible : 5 à 8 s avant affichage des graphiques.
- La barre d'onglets sticky masque le haut des graphiques au scroll.
