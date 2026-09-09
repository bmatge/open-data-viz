# Label Tourisme & Handicap

- **URL** : https://data.economie.gouv.fr/pages/tourisme-et-handicap/ + fiche de détail `/pages/fiche-etablissement/?…&dataset=etablissements-labellises-tourisme-et-handicap` (même gabarit que Qualité Tourisme, voir `qualite-tourisme.md`).
- **Producteur (badge catalogue)** : DGE
- **Jeu** : `etablissements-labellises-tourisme-et-handicap` — **3 708 lignes**, public, 50 champs (dont `activite`, `handicaps_attribues` multivalué `;`, `handicap_auditif/mental/moteur/visuel`, `date_du_classement`, `note_moyenne_nationale`, `note_moyenne_regionale`, `organisme_evaluateur`, `relai_local`, `filiere`, `autres_labels`… **non affichés** par la page).
- **Relevé visuel** : 2026-09-09.

## Différences avec Qualité Tourisme (tout le reste est identique)

1. **En-tête** : H1 « Tourisme et Handicap » sans logo ; paragraphe « Le label Tourisme & Handicap contribue à mieux répondre aux besoins des personnes en situation de handicap, quel que soit le handicap : moteur, visuel, auditif et mental, afin de permettre à chacun de choisir ses vacances et ses loisirs en toute liberté. » puis lien « En savoir plus ↗ ». Pas de lien « nos données ».
2. **Filtres sur deux lignes** : ligne 1 = trois selects multiples pleine largeur **Activités** / **Département** / **Handicap** ; ligne 2 = **Mots clés** / **Commune ou code postal** / bouton **Rechercher**.
   - **Activités** (`activite`, 22 valeurs) : Meublé de tourisme 1 040 · Office de tourisme 616 · Lieu de visite 494 · Hôtel 349 · Etablissement de loisir 211 · Sortie nature 165 · Restauration 161 · Chambre d'hôtes 150 · Hébergement collectif 124 · Camping 113 · Visite d'entreprise 48 · Sport de nature 47 · Hôtel-restaurant 38 · Village de vacances 26 · Loisir éducatif 24 · Parc à thème 19 · Visite guidée 19 · Parc de loisir 18 · Hébergement insolite 17 · Résidence de tourisme 16 · Café, bar, brasserie 8 · Partenaire du tourisme 5.
   - **Handicap** (`handicaps_attribues`, facette multivaluée) : MENTAL 3 311 · AUDITIF 3 174 · MOTEUR 2 893 · VISUEL 2 696 (354 lignes sans valeur). Un établissement compte dans chaque handicap qu'il détient.
3. **Compteur** : « **3708** établissements labellisés ».
4. **Carte** : clusters au chargement 1 132 (Ouest), 440, 391, 360, 341, 287, 246, 209, 182, 6 (Corse). Infobulle identique (tag activité, nom, ville - CP, bouton « **Voir la fiche en détail** » — libellé légèrement différent). Mêmes 6 boutons de recentrage (dont Mayotte).
5. **Vue liste** : mêmes cartes 12/page, le tag activité est placé en pied de carte (`fr-card__start`), le titre est un lien.

## Fiche établissement (variante T&H)
Même page que Qualité Tourisme, avec **deux rubriques supplémentaires** : « **Activités** » (`activite`, ex. « Lieu de visite ») et « **Handicap** » = liste verticale de `handicaps_attribues` avec un **picto par handicap** (images `/assets/theme_image/Deficients-moteur-RVB.jpg` etc. : AUDITIF, MENTAL, MOTEUR, VISUEL). Pas de bouton « Donner son avis » (le champ questionnaire n'existe pas dans ce jeu). Le lien « ← Nouvelle recherche » renvoie vers `/pages/tourisme-et-handicap`. Observé sur « Carré d'Art Bibliothèque et Musée » (NIMES) : Etablissement / Adresse (Place de la Maison Carrée, 30000 NIMES, Gard, Occitanie) / Activités / Site Web (`https:www.carreartmusee.com`, URL malformée dans la donnée) / Informations de contact (tél, e-mail) / Handicap (AUDITIF, MENTAL, MOTEUR) / mini-carte.

## Données à reproduire fidèlement
- Les 3 facettes (22 activités, départements, 4 handicaps) + recherche nom + recherche commune/CP, déclenchées par le bouton.
- Compteur, carte à clusters + infobulle + 6 recentrages, liste 12/page.
- Fiche à 11 champs avec les 4 pictos handicap.
