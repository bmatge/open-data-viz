# Annuaire des services DGFiP / Points d'accueil des finances publiques

- **URL** : https://data.economie.gouv.fr/pages/annuaire-des-services-dgfip/ (les deux entrées du catalogue « Annuaire des services DGFiP » et « Points d'accueil des finances publiques » pointent vers cette même page).
- **Producteur (badge catalogue)** : DGFiP
- **Jeu principal** : `coordonnees-des-structures-dgfip` — **21 761 lignes**, public. Champs utiles : `type_de_service` (Buralistes 16 163 · France Services 3 081 · Centre des Finances publiques 1 948 · Permanences finances publiques 465 · Direction 104), `nom_du_service`, `libelle_du_service`, `adresse`, `code_postal`, `commune`, `code_commune`, `current_code`, `com_name`, `departement`, `dep_code`, `dep_name`, `reg_name`, `public` (multivalué `;` : particuliers 21 332 / professionnels 16 733), `service` (multivalué : Payer mes impôts 17 050 · Payer mes factures locales 16 926 · Payer mes factures d'hôpital 16 369 · Payer mes amendes 16 251 · Obtenir un renseignement, effectuer une démarche 5 336), `type_de_demarche`, `telephone_1`, `telephone_2`, `courriel`, `horaires_1`, `accueil_sur_rdv` (texte libre, 21 472 vides), `lundi`…`vendredi`, `geocodage`.
- **Jeu secondaire** : `georef-france-departement-millesime` (liste des départements du select, champs `dep_code`, `dep_name`).
- **Relevé visuel** : 2026-09-09. Page courte (~1 300 px) : en-tête, filtres, une ligne de titre, puis carte (640 px) à gauche et panneau de détail à droite.

## Structure

1. **Titre** : logo DGFiP + « Direction générale des finances publiques » (H1 discret, gras). Aucun texte d'intro.
2. **Barre de 4 selects** (une ligne) :
   | Select | Options | Comportement |
   |---|---|---|
   | **Tous publics** | Tous publics / Particuliers / Professionnels (liste **codée en dur**) | pose `refine.public`. |
   | **Tous services** | Si public ≠ professionnels : Tous services / Obtenir un renseignement, effectuer une démarche / Payer mes amendes / Payer mes impôts / Payer mes factures locales (cantine, crèche...) / Payer mes factures d'hôpital. Si Professionnels : même liste **sans** « factures locales » (5 options). Codé en dur. | pose `refine.service`. |
   | **Tous départements** | Liste des `dep_name` du jeu géographique (≈ 100), recherche par saisie (« Côte » → Côte-d'Or, Côtes-d'Armor). | pose `refine.departement` (code, ex. 21) sur tous les contextes ; l'URL se met à jour (`?refine.departement=21`). La carte se recadre sur le département. |
   | **Toutes communes** | **Désactivé tant qu'aucun département n'est choisi.** Ensuite : communes du département ayant au moins un lieu, libellé « Beaune (8 lieux) » / « Ahuy (1 lieu) », triées par nom (analyse `COUNT(*)` groupée par `current_code`/`com_name`, max 10 000). | pose `refine.current_code` (ex. 21054), URL mise à jour. |
   Sous les selects, dès qu'un filtre est actif : lien centré « **Supprimer tous les filtres ⊗** ».
3. **Titre dynamique** en capitales : « SÉLECTIONNEZ UN LIEU SUR LA CARTE » → avec un département : « SÉLECTIONNEZ UN LIEU DANS LE DÉPARTEMENT CÔTE-D'OR ».
4. **Carte** (gauche, ≈ 690 × 640 px, `jawg.light`, pas de barre d'outils de dessin, pas de recherche, géolocalisation activée, molette active) :
   - zoom 1-8 : **clusters** bleu nuit `#002a40` avec effectifs (au chargement : 3 129 (Paris), 1 763 (Lyon), 1 116, 1 039, 933, 895, 737, 703, 695, 671, 627, 620, 598, 593, 531, 529, 509, 503, 496, 484, 461, 441, 422, 405, 384, 377, 280, 238, 182 (Corse)…). Vue initiale : France métropolitaine (Cologne → Barcelone).
   - zoom ≥ 9 : **points colorés par `type_de_service`** en deux couches : lieux hors buralistes (France Services `#f8b334` jaune, Centre de Finances publiques `#004c6c` bleu foncé, Permanences `#5d8fa4` bleu-gris, autre `#263892`) et buralistes (`#6c5d53` brun).
   - **Légende fixe en bas à droite de la carte** (4 pastilles) : Finances publiques · Permanences finances publiques · France Services · Buralistes-partenaires agréés.
   - Clic sur un point : pose `geofilter.distance` sur le contexte `lieuxselected` (tous les lieux **à la même position**), et le point sélectionné devient une **étoile** (picto `ods-star`), sans infobulle.
5. **Panneau droit** :
   - Par défaut : titre à bord gauche bleu nuit « **Points d'accueil des Finances Publiques** » (le titre change selon le service choisi : « Établissements pour obtenir un renseignement ou effectuer une démarche », « Établissements pour payer vos impôts », « Établissements pour payer vos factures locales », « Établissements pour payer mes amendes », « Établissements pour payer mes factures d'hôpital ») + encadré « Sélectionnez un point sur la carte ».
   - Après clic sur un point (observé : Beaune) : bouton sombre « **Effacer la sélection ↓** », puis :
     - H3 = `type_de_service` en capitales (« CENTRE DES FINANCES PUBLIQUES ») + logo selon le type (4 images : France Services, buralistes « paiement de proximité », permanences, finances publiques).
     - Si plusieurs services au même point : « **3 services à cette adresse (cliquez sur un service pour afficher les détails) :** » puis liste à puces cliquable (SIP BEAUNE en gras = actif, SIE BEAUNE, Antenne de TH DES HOPITAUX DE COTE D'OR). Max 10 services.
     - H3 = `nom_du_service` (« SIP BEAUNE »).
     - Rubriques en petites capitales grasses, chacune conditionnelle : **PUBLIC** (`public` splitté sur « ; » joint par « et », capitalisé : « Particuliers ») · **DÉMARCHES PROPOSÉES** (`type_de_demarche`, ex. « Obtenir un renseignement sur mes impôts et factures, Effectuer une démarche, Payer mes impôts. ») · **ADRESSE** (« 1 rue gaston roupnel, 21200 Beaune ») · **TÉLÉPHONE** (`telephone_1` puis `telephone_2`) · **COURRIEL** (texte brut, ex. « utilisez votre messagerie sécurisée disponible dans votre espace particulier ») · **HORAIRE** (`horaires_1` puis `accueil_sur_rdv`) — absente pour le SIP de Beaune.
     - Le panneau scrolle en interne (max 700 px).

## Données à reproduire fidèlement
- Les 4 selects avec leurs listes exactes (dont la variante « professionnels » à 5 services), la dépendance département → communes avec compte de lieux, le lien « Supprimer tous les filtres », la synchronisation URL.
- Le titre dynamique (6 variantes).
- Carte : clusters, puis points colorés par 4 types + « autre », légende à 4 entrées, sélection par position (plusieurs services au même point), marqueur étoile.
- Fiche : type + logo, liste des services co-localisés, nom, et les 6 rubriques conditionnelles.
- Le jeu compte 21 761 lignes : bien au-delà des 5 000 points par défaut d'une couche.
