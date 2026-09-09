# Relevé visuel des dataviz du portail (data.economie.gouv.fr)

Descriptions **exhaustives, faites au navigateur** (Chrome, 2026-09-09) de chaque page de dataviz du
[catalogue de visualisations](https://data.economie.gouv.fr/pages/catalogue-visualisations/). Elles
complètent la lecture du code `$scope.blocks` : ce qui s'affiche réellement, les valeurs des
filtres, le contenu des infobulles et des fiches, les KPI et leurs formules, les défauts de
l'original. **Elles sont la référence de fidélité des données pour le portage vers `dsfr-data`** :
la forme peut changer, pas les données, les filtres ni les niveaux de détail.

Chaque fiche commence par **« Objectif de la dataviz et informations véhiculées »** (la question à
laquelle la page répond, le message qu'elle porte, ce que l'utilisateur doit en retenir, ce que la page
ne cherche pas à dire) et se termine par « Données à reproduire fidèlement ». Les listes de valeurs de
facettes ont été vérifiées par l'API v2.1 le même jour ; les effectifs bougent avec le temps.

## Méthode et limites du relevé

- Chaque page a été chargée dans Chrome, scrollée de haut en bas, et ses interactions jouées : selects
  ouverts et valeurs choisies, recherche saisie et validée, points de carte cliqués, fiches ouvertes,
  accordéons dépliés, recentrages DROM, sélecteur de date, bascules carte/table, popin de notice,
  visionneuse photo. Les captures ont été lues, pas seulement le DOM.
- Le code `$scope.blocks` a servi à nommer les champs et les formules, jamais à décrire un rendu qui
  n'a pas été vu. Quand le rendu réel contredisait le code, c'est le rendu qui a été retenu (Baromètre :
  « Vue combinée » à deux barres par année ; EPV : carrousel d'exemples indépendant des filtres,
  recherche plein-texte, épingles uniformes sur un seul univers).
- **Non vu à l'écran** : le clic sur une valeur de facette `ods-facets` (Plan de relance, DECP) n'a pas
  pris dans l'automate ; le comportement décrit (refine → recalcul du compteur et des graphiques) est
  celui du composant standard, vérifié sur les tags « ✕ » d'EPV et de Notre-Dame. Le Baromètre n'a été
  ouvert qu'avec un filtre Région ; Secteur et Taille sont supposés se comporter de même.
- Ouvrir les 12 chapitres du Baromètre à la fois fige l'onglet (≈ 100 000 px, plusieurs centaines de
  graphiques) : le relevé s'est fait chapitre par chapitre.

| Page du portail | Fiche | Statut registre | Jeux |
|---|---|---|---|
| Prix des carburants | [prix-des-carburants.md](prix-des-carburants.md) | à reproduire (lot 3 en cours) | `prix-des-carburants-en-france-flux-instantane-v2` |
| Entreprises du patrimoine vivant | [entreprise-patrimoine-vivant.md](entreprise-patrimoine-vivant.md) | à reproduire | `entreprises-du-patrimoine-vivant-epv` + `georef-france-region@public` |
| Comptabilité générale de l'État (4 pages) | [comptabilite-generale.md](comptabilite-generale.md) | à reproduire | `balances_des_comptes_etat` + 3 jeux *restricted* (clé dans le source) |
| Label Qualité tourisme (+ fiche établissement) | [qualite-tourisme.md](qualite-tourisme.md) | reproduite | `etablissements-labellises-qualite-tourisme` |
| Annuaire des services DGFiP / Points d'accueil | [annuaire-des-services-dgfip.md](annuaire-des-services-dgfip.md) | à reproduire | `coordonnees-des-structures-dgfip` (21 761 l.) + `georef-france-departement-millesime` |
| Label Tourisme & Handicap (+ fiche) | [tourisme-et-handicap.md](tourisme-et-handicap.md) | reproduite | `etablissements-labellises-tourisme-et-handicap` |
| Plan de relance | [plan-de-relance.md](plan-de-relance.md) | reproduite | `plan-de-relance` |
| Calendrier des formations France Num | [accompagnements-actions-fnum.md](accompagnements-actions-fnum.md) | **vide en production** (jeu à 0 ligne) | `donnees-sessions-formations-france-num` |
| Rebâtir Notre-Dame | [entreprises-restauration-notre-dame.md](entreprises-restauration-notre-dame.md) | reproduite | `restauration-notre-dame` + `georef-france-region@public` |
| Fiscalité locale particuliers + professionnels (2 pages) | [fiscalite-locale-particuliers.md](fiscalite-locale-particuliers.md) | à reproduire | `fiscalite-locale-des-particuliers-geo`, `fiscalite-locale-des-entreprises-copie` (174 668 l. chacun) |
| Rappel Conso (page migrée `rappel-conso-v2`) | [rappel-conso.md](rappel-conso.md) | reproduite | `rappelconso-v2-gtin-espaces` |
| DECP augmentées | [decp-augmente.md](decp-augmente.md) | reproduite | `decp_augmente` (994 123 l.) |
| Baromètre France Num | [barometre-france-num.md](barometre-france-num.md) | à reproduire | `questions-reponses` (479 405 l.) + `bfn-table-de-correspondance` |
| Compléments alimentaires | [complements-alimentaires.md](complements-alimentaires.md) | source disparue (page servie, KPI à 0) | — |
| Pages 404, vues natives, cibles externes | [pages-404-et-hors-perimetre.md](pages-404-et-hors-perimetre.md) | — | — |

Le catalogue lui-même (28 cartes, recherche, 6 pilules « Producteurs » DGFiP / DGFIP / DGE /
DGCCRF / DAJ / Autre organisme public, vignettes, badge producteur, description, lien) est déjà
reproduit dans `public/index.html`. Le texte des 28 cartes est dans le relevé du 2026-09-09
(`get_page_text` de la page catalogue) ; deux entrées (« Annuaire des services DGFiP » et
« Points d'accueil des finances publiques ») pointent vers la même page.

## Écarts repérés entre les fiches et les reproductions existantes (`public/viz/`)

Relevé par `grep` sur les pages reproduites, à confirmer page par page par l'agent de portage :

- **qualite-tourisme.html / tourisme-et-handicap.html** : la vue liste est là (carte et liste
  affichées ensemble, choix documenté dans l'analyse), mais **pas de page de détail « Fiche
  établissement »** (`/pages/fiche-etablissement/`, 9 à 11 champs + mini-carte + bouton « Donner
  son avis » / pictos handicap). Les 6 recentrages territoriaux (dont **Mayotte**) ne ressortent
  pas au grep : vérifier que les DROM sont atteignables.
- **entreprises-restauration-notre-dame.html** : ni la **galerie de photos** (`images`,
  160 entreprises, visionneuse modale, crédit photo), ni le KPI codé en dur « **+ 3 000**
  compagnons et artisans », ni le lien « Pour réserver une visite » (`conditions_de_visite`),
  ni la liste alphabétique filtrée n'apparaissent au grep.
- **plan-de-relance.html** : l'infobulle originale a 9 champs ; `siren`, `code_postal` et
  `volet_relance` ne ressortent pas au grep. Vérifier aussi que l'histogramme région × mesure
  montre les 20 régions (l'original en tronque 12 : défaut à signaler, pas à imiter) et que
  les 2 catégories « Nucléaire » (238 projets) ont une couleur.
- **rappel-conso.html** : les 3 fenêtres de date (total < J, année, mois) et le titre
  « … de septembre 2026 » sont à vérifier ; la mention « (depuis Mars 2021) » n'apparaît pas.
- **decp-augmente.html** : vérifier que les 7 facettes (dont `dateNotification` par année et
  `nomAcheteur`) sont bien toutes présentes, et que les valeurs parasites (« Appel d'offres
  ouvert » en double, « ProcÃ©dure adaptÃ©e ») sont conservées ou signalées.
- **prix-des-carburants.html** (branche en cours) : à confronter à la fiche (infobulle à 11
  champs avec dates de mise à jour, autocomplétion communes restreinte par région/département,
  recadrage automatique, compteur « n parmi N »).

## Défauts de l'original observés (à consigner dans `retours.json` comme contexte, pas comme limites de dsfr-data)
- Plan de relance : graphique région × mesure tronqué à 8 régions (`maxpoints=50`) ; couche carte tronquée « pour des raisons de performance ».
- EPV : doublons de casse dans `univers` (« Ameublement et Décoration » ×2, « Loisirs et Transports » ×2), 9ᵉ univers sans picto ; fiche brièvement rendue hors cadre.
- Comptabilité générale : contenu de la vue par mission qui disparaît au scroll ; barre d'onglets sticky qui masque les graphiques ; jeux annexes en visibilité *restricted* avec clé exposée.
- Compléments alimentaires : KPI à 0 et icône cassée (logo GitLab) ; France Num : 0 session.
- Rappel Conso : lien du catalogue en 404 (page migrée en v2).
- Annuaire DGFiP : un filtre Public/Service sans département recadre la carte sur le monde entier (cluster unique « 16 167 »).
- Qualité tourisme : bouton « Mayotte » qui recentre sur une carte vide (aucun établissement).
- Fiscalité professionnels : tuiles CFE ZAE / EOL « Sans objet » et carte grise sans légende quand le département n'a pas la taxe.
- EPV : le carrousel « Quelques exemples » ignore les filtres (le code dit le contraire).
- DECP : facette `procedure` avec doublons et mojibake.
- Fiscalité locale : `?headless=true` dans le catalogue (page pensée pour une iframe).
