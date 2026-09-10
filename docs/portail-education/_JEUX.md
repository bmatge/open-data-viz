# Volumes des jeux du portail Éducation (relevé API v2.1, 2026-09-10)

Relevé une fois pour toutes : `metas.default.records_count` de
`https://data.education.gouv.fr/api/explore/v2.1/catalog/datasets/<id>`.
**Ne pas re-interroger** pour ces jeux-là, les reprendre d'ici.

| Jeu | Lignes | Champs | Champ géo |
|---|---:|---:|---|
| `donnees-ips-ecoles` | 279318 | 29 | position |
| `donnees-ips-colleges` | 62646 | 11 | position |
| `donnees-ips-lycees` | 32618 | 13 | position |
| `donnees-ips-erea` | 706 | 24 | position |
| `fr-en-offre-langues-2d` | 39858 | 15 | position |
| `fr-en-etablissements-labellises-generation-2024` | 11221 | 79 | position |
| `fr-en-cnr-base-nefle` | 6024 | 40 | position |
| `fr-en-ulis-tfv` | 52 | 14 | position |
| `fr-en-carto-acc-sensoriel` | 307 | 17 | position |
| `fr-en-label-egalite-fille-garcon` | 1678 | 13 | position |
| `fr-en-internats` | 4661 | 25 | position |
| `fr-en-annuaire_bde_lycees_pro` | 1942 | 19 | position |
| `fr-en-hybridation_lycees_par_collectivite` | 19 | 12 | geo_shape/position_commune_siege |
| `fr-en-aap-snee-collectivites` | 6870 | 15 | position |
| `fr-en-etablissements-labellises-euroscol` | 1672 | 22 | position |
| `fr-en-challenge-data` | 3 | 5 | — |
| `fr-en-tne_suivi_deploiement_solutions_numeriques_par_solution_et_dept` | **HTTP 404** | — | — |
| `fr-en-tne_suivi_deploiement_solutions_numeriques_dept` | 12 | 7 | — |
| `fr-en-tne_indicateurs_satisfaction_formations` | 6 | 8 | — |
| `fr-en-tne_suivi_audiences` | 50 | 16 | — |
| `fr-en-tne_personnels_formes_par_departement_secteur_type_etablissement` | 460 | 12 | — |
| `fr-en-pix_participations_aux_campagnes_par_profil_cible_et_mef_code` | 354012 | 23 | position |
| `fr-en-pix_resultats_des_campagnes_de_rentree_par_eple` | 334050 | 18 | position |
| `fr-en-pix_participations_aux_campagnes_par_etablissement_sans_collecte_de_profil` | 41422 | 19 | position |
| `fr-en-pix_certification_pix_inscription_et_passation_par_eple` | 43479 | 26 | position |
| `fr-en-pix_certifications_par_classes` | 72568 | 18 | — |
| `fr-en-deploiemement_tedi` | 3734 | 9 | position |

## Ce que ces volumes impliquent pour le portage

- **`donnees-ips-ecoles` (279 318 l.), `fr-en-pix_participations_…_mef_code` (354 012 l.) et
  `fr-en-pix_resultats_des_campagnes_de_rentree_par_eple` (334 050 l.)** sont affichés sur
  une carte dans l'original. Trois pièges du dépôt s'appliquent d'emblée : `max-records`
  qui tronque en silence à 1 000, `max-items` d'une couche carte qui tronque à 5 000 avec
  un bandeau « zoomez » qui ne charge rien de plus, et le chargement par `/records`
  (100 lignes par appel, en série). **C'est ici que la question « quelle architecture
  `dsfr-data` ? » se pose vraiment** : tout côté client est hors de question, il faut
  arbitrer entre agrégation serveur, chargement par `bbox` et pagination serveur —
  et le mesurer, pas le supposer.
- **`fr-en-tne_suivi_deploiement_solutions_numeriques_par_solution_et_dept` n'existe plus** :
  l'API renvoie 404 alors que ses quatre jeux frères `fr-en-tne_*` répondent. La page
  `tne_dashboard` le référence pourtant dans son `ods-dataset-context`. À confirmer au
  navigateur : quel bloc de la page reste vide, et si l'original le signale ou non.
- À l'inverse **`fr-en-ulis-tfv` (52 l.)**, **`fr-en-tne_*` (6 à 460 l.)** et
  **`fr-en-challenge-data` (3 l.)** tiennent entièrement côté client : y invoquer une
  limite de performance serait faux.
- **`fr-en-hybridation_lycees_par_collectivite` (19 l.)** est le seul jeu du lot avec un
  `geo_shape` : c'est le seul candidat naturel à une choroplèthe portée par le jeu lui-même,
  tous les autres n'ont qu'un `position` (points).
