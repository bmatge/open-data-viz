# ÉcoleMap

Cette application interroge l'annuaire de l'Éducation via l'API [data.education.gouv.fr](https://data.education.gouv.fr/explore/dataset/fr-en-annuaire-education/table/?disjunctive.type_etablissement&disjunctive.code_postal&disjunctive.nom_commune&disjunctive.code_departement&disjunctive.appartenance_education_prioritaire&disjunctive.libelle_academie&disjunctive.libelle_region&disjunctive.ministere_tutelle).

Une fois l'établissement scolaire trouvé (école, collège ou lycée) elle affiche le qaurtier sur un fond Orthophoto IGN ou Openstreetmap, via une Iframe mise à jour en fonction des coordonnées (longitude, latitude) renvoyées par l'API de data.education.gouv.fr.

Cette application  a été créée par Arnaud Champollion.
Elle est placée sous licence libre GNU GPL.