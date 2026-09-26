# Festivals : un paysage jeune, musical et estival — analyse métier

Création (pas d'original). Page : `public/culture/festivals.html`, URL `/culture/festivals`.
Cadrage : fiche 5 de `docs/portail-culture/proposition.md`. Niveau dataviz-metier : avancé.

## Le jeu

« Liste des festivals en France » (ministère de la Culture, Deps-doc / France festivals / Cepel),
ressource Tabular `47ac11c2-8a00-46a7-9fa8-9b802643f975`, 7 283 lignes, 30 colonnes. Critères
d'inclusion (description du jeu) : avoir eu lieu en 2019, au moins deux éditions, plus d'une journée,
au moins cinq spectacles. **C'est un inventaire des festivals vivants en 2019.**

## L'histoire

Question : « Qu'est-ce que la France appelle festival, depuis quand, et quand ont-ils lieu ? »
Lecteur : presse, collectivité, organisateur ; puis l'explorateur local.

Chiffres rejoués le 2026-09-26 sur l'export Parquet complet (pandas) puis relus identiques à
l'affichage (Playwright) :

| Mesure | Valeur |
|---|---|
| Festivals | 7 283 |
| Nés « 2010 et après » | 3 358 (48,6 % des 6 914 à décennie connue ; 46,1 % du total) |
| Années 2000 / années 1990 (casse harmonisée) | 1 938 / 971 (réunies : 2 909 < 3 358) |
| Années 1980 / avant 1980 / sans décennie | 433 / 214 / 369 |
| Musique / spectacle vivant | 3 229 (44,3 %) / 1 634 ; ensemble 66,8 % |
| Saison (21 juin – 5 sept., 77 j) | 2 703 (37,1 %) → 245,7 par semaine |
| Avant-saison (171 j) / après-saison (117 j) | 2 498 / 1 935 → 107,7 par semaine hors été ; ratio 2,28 |
| Musique tenue en saison | 50,2 % |
| Cinéma : saison / avant / après | 12,7 % / 42,8 % / 41,8 % |
| Livre : saison / avant / après | 14,7 % / 45,5 % / 38,0 % |
| Période « autre » (mois isolés, vide) | 147 |
| Envergure vide | 5 384 |
| Sans coordonnées | 33 ; + 5 géolocalisés hors encarts DROM (NC, PF, SPM, St-Barth) |
| Année de création déclarée 2020-2022 | 76 (hors critère 2019) |

## Écart au cadrage

- Le titre provisoire « près d'un sur deux est né après 2010 » tient en chiffres, mais sa lecture
  naturelle (« on crée de plus en plus de festivals ») n'est pas établie : le fichier ne voit que les
  survivants de 2019. Titre final : « Festivals : en 2019, près d'un sur deux avait moins de dix ans »
  — un âge, pas un rythme de création. Une section de nuance le dit en toutes lettres.
- Le cadrage donnait « saison 2 644 (36 %) » : c'était la seule modalité à majuscule. Avec les 59
  variantes en minuscule, 2 703 (37 %).
- « Le cinéma et le livre préfèrent l'automne », tentant à la première lecture, est faux en volume
  (l'avant-saison est la plus fournie). La page dit seulement qu'ils évitent l'été.
- Pas de croisement avec le programme 131 (jointure fragile selon le cadrage) ni de carte par région
  en volume.

## La forme

1. Accroche : titre-message + chapeau calculé + trois KPI (total, part des jeunes, part de l'été).
2. Preuve : barres par décennie, `neutral` + `highlight-index` sur « 2010 et après » ; la barre
   « Non renseignée » est gardée, en dernier.
3. Nuance : encadré « inventaire des vivants, pas registre des naissances » (pas de graphique : aucun
   jeu ne mesure les disparitions).
4. Quoi : barres horizontales triées par discipline, musique en évidence.
5. Quand : **un taux par semaine** (les trois périodes ont 171, 77 et 117 jours — un volume aurait
   fait croire l'avant-saison plus chargée que l'été) ; puis barres empilées 100 % discipline ×
   période, triées par part de l'été.
6. Exploration : facettes client (discipline, période, création, région, département), KPI de
   sélection, carte de points colorés par discipline, liste avec recherche et export.
7. Ce qu'on ne montre pas, chiffré.

## Honnêteté

- Base des pourcentages de création : décennie connue (6 914), dite dans le KPI et le chapeau ;
  les 369 inconnues ont leur barre.
- Dénominateur de la part par période dans le graphique empilé : tous les festivals de la
  discipline (le reste jusqu'à 100 % = période « autre », dit dans la description a11y).
- La carte montre des volumes ; pas de densité par habitant (dit).
- Fréquentation / budget absents : un petit festival pèse autant qu'Avignon (dit).

## Phrase de lecture

« Sur les 7 283 festivals qui ont eu lieu en 2019, 3 358 étaient nés en 2010 ou après : 49 % de ceux
dont on connaît la date de création. […] en onze semaines d'été, il se tient 2,3 fois plus de
festivals par semaine que le reste de l'année. » — toutes les valeurs viennent de `syn-t`.

## Angles écartés

- Série annuelle de création : colonne « Année de création » libre (« 18ème », « 01/01/2015 00:00 »,
  « 20198 »…), pas d'extraction de sous-chaîne dans `compute`.
- Envergure (internationale 54) : 74 % de vide.
- Densité régionale (Corse 69 festivals) : demanderait une population jointe ; hors objet.
