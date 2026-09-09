# Liste des compléments alimentaires déclarés

- **URL** : https://data.economie.gouv.fr/pages/visualisation-liste-des-complements-alimentaires/
- **Producteur (badge catalogue)** : DGCCRF
- **Jeu référencé** : `liste-des-complements-alimentaires-declares` — **n'existe plus** (le seul survivant du portail est un jeu « [Obsolète] » à 0 ligne).
- **Relevé visuel** : 2026-09-09 : la page est **servie mais vide** : gabarit catalogue (fil d'Ariane, H1, encadré « Les jeux de données utilisés »), badge « **enregistrements** » sans chiffre, colonne de facettes vide, une carte KPI « **0** Compléments » avec une **icône cassée** (logo GitLab affiché à la place du picto Font Awesome), rien d'autre.

## Ce que la page faisait (gabarit générique ODS « liste + filtres + KPI »)
Le source (`src/visualisation-liste-des-complements-alimentaires.unescaped.html`) déclare : facettes automatiques, selects de filtres paramétrés (`filters`), curseur de période sur un champ date (`fieldDate`), une carte KPI (COUNT « Compléments »), une vue tableau (20 lignes/page) et une vue cartes (8 × `itemsPerRow`). Sans jeu de données, aucun libellé de champ n'est résolu.

## Données à reproduire
Aucune : source disparue. Statut « impossible / source disparue » déjà posé dans le registre — la description visuelle confirme que la page publique est bien vide en production (KPI à 0, icône cassée).
