# Calendrier des formations France Num

- **URL** : https://data.economie.gouv.fr/pages/accompagnements-actions-fnum/
- **Producteur (badge catalogue)** : DGE
- **Jeu** : `donnees-sessions-formations-france-num` — **0 ligne** (jeu vidé ; dernière modification 2026-01-26). Champs encore déclarés : `libelle_du_programme, chef_de_file, presentation_du_programme, region, secteur_d_activite_cible, type_de_formation, duree, niveau, format, theme, sous_theme, votre_titre_de_formation, id_formation, id_session, description_courte_de_la_formation, description_detaillee_programme_et_formation, date_de_debut, lien_d_inscription, adresse_si_presentiel, ville_si_presentiel, citation, auteur, site_internet`.
- **Relevé visuel** : 2026-09-09. **La page est vide en production** : « **0** Nombre de sessions », aucun résultat, aucune carte. Statut à proposer : *dataviz vide / dispositif clos* (les données ont disparu, la page est encore servie).

## Objectif de la dataviz et informations véhiculées

- **Question à laquelle elle répondait** : « Quelles formations France Num puis-je suivre, quand, où et sur quel thème ? » Agenda de sessions à venir (période démarrant à aujourd'hui par défaut), avec inscription en ligne.
- **Message porté aujourd'hui** : le dispositif est clos depuis le 30 juin 2025 ; la page renvoie vers la rubrique formation de francenum.gouv.fr. Le seul chiffre affiché, « 0 session », dit tout.
- **Information que l'utilisateur devait obtenir** : titre, thème, sous-thème, type, format, durée, secteur, chef de file, date de début, région, adresse/ville si présentiel, description, lien d'inscription.
- **À porter** : rien de vivant ; documenter le gabarit et le constat, et prévoir que la page puisse renaître si le jeu est réalimenté.

## Ce qui s'affiche

1. H1 « Calendrier des formations France Num ».
2. Texte : « Mis à jour le 1er juillet 2025. » puis « Le dispositif des formations France Num est clos depuis le 30 juin 2025, nous vous invitons à consulter *la rubrique formation du site de France Num* ↗ ».
3. Carte DSFR de filtres : champ « 🔍 Rechercher » (plein texte) et **7 selects en pilules** (tous vides faute de données) : Théme de la formation (multiple) · Sous-théme (multiple) · Type de formation · Format · Région (multiple) · Chef de file du groupement (multiple) · Secteur d'activité. Bouton « Supprimer tous les filtres » (masqué sans filtre).
4. Carte KPI centrée « **0** / Nombre de sessions » (`count(*)`).
5. Une icône de lien externe orpheline à droite (le lien « source des données » sans libellé).

## Ce que la page faisait (d'après le gabarit générique ODS « liste + filtres »)
- Un **curseur de période** (`ods-date-range-slider` sur `date_de_debut`, précision jour, borné par min/max du jeu, **début par défaut = aujourd'hui** : `fieldDefaultRangeStartsNow`), absent quand il n'y a pas de dates.
- Des **cartes** (2 par ligne), titre = `votre_titre_de_formation`, 13 champs listés : Thème, Sous-thème, Type de formation, Durée, Secteur d'activité, Format, Chef de file du groupement, Description courte du programme, Site internet, Date de début (format date), Région, Adresse (si présentiel), Ville (si présentiel) ; bouton « S'inscrire » vers `lien_d_inscription`. Tri `-date_de_debut`, défilement infini.
- Une **vue tableau** alternative (10 lignes/page) et une **vue carte** (bascule `mapView`, couche `display=auto`) prévues par le gabarit.

## Données à reproduire
Rien de reproductible au 2026-09-09 : le jeu ne contient aucune ligne. Reproduire = page d'analyse (dispositif clos, jeu vidé, gabarit générique documenté ci-dessus) et statut « source disparue » dans le registre.
