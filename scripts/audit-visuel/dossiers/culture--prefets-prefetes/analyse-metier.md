# Analyse métier — culture / prefets-prefetes

Fiche 22 du cadrage (`docs/portail-culture/proposition.md`). Niveau avancé (page-récit).

## L'histoire

Jeu : *Préfets et préfètes français depuis 1800* (Archives nationales), ressource Tabular
`fdd11c64-06b5-4aa0-9c0d-b4b2d443e129`, 3 918 lignes, une par personne, mise à jour 2025-10-13.

- 99 femmes sur 3 918 (2,5 %) — 98 personnes réelles : Catherine (Sarlandie de la) Robertie figure
  deux fois (même Wikidata Q33111860).
- De 1800 à 1979 : 2 910 premières nominations en département, 18 décennies, **zéro femme**.
- Première : Yvette Chassagne, 1981, Loir-et-Cher. Puis Hélène Blanc, 1984 (Cantal).
- Depuis 2010 : 62 premières nominations féminines sur 251, **25 %** (2010s : 40/160 ; 2020-2024 : 22/91).
- Par lustre : 12 % en 2005-2009, 17,6 % en 2010-2014, **34,8 % en 2015-2019** (24/69), puis 24,2 %
  en 2020-2024 (22/91). Ce pic et ce recul n'étaient pas dans le cadrage.

Titre provisoire du cadrage : une question. Titre final : « Préfets : aucune femme pendant 180 ans,
puis une nomination sur quatre depuis 2010 ». Angle secondaire (nuance) : le pic 2015-2019 et le recul,
dit avec la prudence qu'imposent 69 à 91 personnes par lustre.

## La forme

1. Barres verticales par décennie (23 barres) : la longue rangée de zéros **est** le message ; deux
   dernières décennies mises en évidence (`neutral` + `highlight-index`).
2. Barres par lustre depuis 1975 : la décennie lisse le pic ; le lustre le montre.
3. Tableau des 84 préfètes datées, dans l'ordre (l'exception nommée, la preuve individuelle).
4. Exploration : recherche, facettes (sexe, décennie, poste éclaté par `split`), fiches avec liens
   Archives nationales / Wikidata.

Écartés : carte (postes mélangeant codes actuels, libellés sans code et départements disparus ;
et une préfète de l'Aveyron n'y dirait rien de plus que la facette) ; classement des départements
par nombre de préfètes (les premiers postes d'une carrière préfectorale sont souvent des petits
départements, pour les hommes aussi : l'effet de carrière se confondrait avec un effet de genre,
non vérifié ici) ; durée moyenne en poste (fin de poste dans du texte).

## Honnêteté

- La mesure est une **arrivée** (année du premier poste en département), pas un effectif en poste.
- Part = moyenne d'un indicateur 0/100 par personne = proportion, pas une moyenne de taux.
- 313 personnes sans poste daté (15 femmes) : au dénominateur de l'en-tête, hors des séries. Dit en page.
- Décennie 2020 = 2020-2024 (dernière année du jeu, lue dans la donnée et affichée).
- Année = premier poste **listé** : 3 lignes où il n'est pas le plus ancien, 2 changent de décennie,
  aucune femme (vérifié en Python sur le min de toutes les années de début).
- Petits effectifs par lustre : dit dans la phrase de lecture (« ne dit pas encore une tendance »).

## Phrases de lecture (calculées)

- Chapeau : n, f, part, première année, attente, f10/n10/part10 (`syn-t`).
- Bloc 1 : 2 910 personnes / 18 décennies / première préfète / 2010s (`dec-zero-t`, `premiere`, `dec-10`).
- Bloc 2 : 2005-2009, sommet, dernier lustre (`lus-2005`, `lus-max`, `lus-der`).

## Ce qu'on ne montre pas (écrit en page)

Sans poste daté ; effectif en poste par année ; durée en poste ; postes hors département ; carte ;
doublon.
