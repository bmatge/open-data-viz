# Analyse metier — Cartographie des ULIS-TFV

> La lecture `dataviz-metier` : le sens avant la syntaxe.
> **Ce fichier n'est jamais ecrase par un script.** Les sorties du modele
> multimodal arrivent dans `constats/` ; ce qui est retenu se reecrit ici, a la main.

## L'histoire trouvée (recréation du 2026-09-26)

**Pour un élève aveugle ou malvoyant, l'offre spécialisée se referme après le collège.**
Rentrée 2024 (`fr-en-ulis-tfv`, 52 lignes, rejoué à l'API le 2026-09-26) : 44 des 52 ULIS-TFV
sont en école (23) ou en collège (21), dans 23 départements ; après le collège il en reste 8
(6 lycées, 2 EREA), dans **4 départements et 4 villes** — Villeurbanne 3, Saint-Lô 3,
Saint-Quentin 1, Rambouillet 1. Départements couverts par étape : 18 (école), 17 (collège),
4 (lycée ou EREA). L'Île-de-France porte 25 dispositifs (48 %), mais un seul après le collège
(lycée Louis Bascan, Rambouillet) ; Auvergne-Rhône-Alpes et Normandie tirent au contraire leur
rang de leurs lycées et EREA.

La reproduction précédente s'arrêtait à « rare et concentré en Île-de-France » : vrai, mais la
concentration ne vaut que pour l'école et le collège. L'angle « parcours » est le renversement.

## La question posee, et pour quel lecteur

« Si mon enfant est scolarisé en ULIS-TFV, pourra-t-il la poursuivre, et où ? » — familles,
enseignants référents, décideurs académiques.

## La forme retenue, et pourquoi elle sert cette question

1. Chapô et trois KPI calculés (44 / 8 dans 4 villes / 25 départements sur 101).
2. Preuve : barres groupées par étape dans l'ordre du parcours (pas triées par valeur : l'ordre
   est le sens), dispositifs et départements couverts ; puis les 4 villes en tags et les 8
   établissements en tableau (8 lignes : un tableau bat un graphique).
3. Nuance : barres horizontales empilées par région, triées par total, étape en couleur, rouge
   pour « après le collège » — la seule série mise en évidence.
4. Exploration : recherche, facettes, carte (mêmes couleurs, encart La Réunion), liste avec
   contact (`mail`, renseigné 52/52, absent de l'original).

## Honnetete de l'echelle

Comptes entiers, axe à zéro. Pas de taux : le jeu ne porte aucun effectif, et un dispositif
régional n'a pas de bassin défini — un « pour 100 000 élèves » serait inventé.

## Phrase de lecture

« À la rentrée 2024, 44 des 52 ULIS-TFV sont en école ou en collège ; après le collège, il n'en
reste que 8, dans 4 villes. » Calculée (`dsfr-data-repeat` sur une ligne jointe).

## Ce qu'on ne montre pas, et qu'il faut dire

- Aucun effectif ni nombre de places : on compare des implantations.
- Lycée et EREA réunis (2 EREA, dans des villes qui ont déjà un lycée à ULIS-TFV).
- Un département sans ULIS-TFV n'est pas sans accompagnement (autres dispositifs hors jeu).
- Un seul millésime, public seulement, aucune licence déclarée.

## Ecarts avec l'original

- Un point ultramarin (Collège Terre Sainte, Saint-Pierre, La Réunion) servi par un encart au
  lieu d'un cadrage mondial. **La page précédente affirmait « aucune ligne ultramarine »** : faux.
- Contact exposé, liens conditionnels, tableau et export, légende.
