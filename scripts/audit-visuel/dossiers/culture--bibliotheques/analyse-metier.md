# Analyse métier — culture / bibliotheques

Création du 2026-09-26 (fiche 4 de `docs/portail-culture/proposition.md`), niveau `dataviz-metier` avancé.

## Le jeu

« Les bibliothèques des collectivités territoriales : adresses et données d'activité » (ministère de la
Culture, Service du livre et de la lecture), ressource Tabular `806a8aa1-952f-404d-9857-3f27b7c0ca86`,
15 704 lignes × 46 colonnes. Adresses au 05/06/2025, chiffres d'activité de l'année 2023 (description du
jeu). Une ligne par lieu (`Code_bib` unique : 15 704 valeurs distinctes), 14 069 communes.

## L'histoire

Le maillage contre l'activité. 9 130 bibliothèques sur 15 704 (58 %) sont dans une commune de moins de
2 000 habitants ; elles font 8,7 % des 246,9 millions de prêts déclarés pour 2023. Les communes de
10 000 habitants et plus abritent 13 % des lieux et 61 % des prêts. Nuance : ce réseau rural tient
par les bénévoles (63 % des petites bibliothèques qui déclarent leur personnel n'ont aucun salarié :
4 812 sur 7 632 ; 39 236 des 64 921 bénévoles, 60 %). Contre-intuition : les petites sont plus souvent
gratuites (71 % contre 43 % au-delà de 50 000 habitants). Le dimanche : 584 sur 11 914 répondantes (4,9 %).

Écart au cadrage : le titre provisoire (« 9 130 des 15 704 ; 584 ouvrent le dimanche ») tient pour
le premier chiffre. Le « 3,7 % » du dimanche rapportait 584 à toutes les lignes alors que 3 790 ne
répondent pas : la page rapporte aux répondantes (4,9 %). Le dimanche est descendu en nuance : il n'est
pas l'histoire.

## Les formes

- KPI × 3 (part des lieux, part des prêts, part sans salarié) : trois nombres qui font la phrase.
- Barres groupées part des lieux / part des prêts par tranche : le contraste se lit d'un coup (deux
  barres qui se croisent à 2 000 habitants). Les parts sont `share_percent` — même dénominateur que le
  texte ; la tranche « population non renseignée » est une barre visible, pas écartée.
- Barres « sans aucun salarié » par tranche, palette neutre, deux premières tranches en évidence,
  axe 0-100.
- Exploration : recherche, facettes client (tranche, statut, dimanche, gratuité, département), carte
  de 15 538 points colorés par tranche (bleus = moins de 2 000 hab., gris au-delà), tableau trié par prêts.

## Honnêteté

- **Population répétée** : `Population commune` est celle de la commune d'implantation, répétée
  (Paris : 69 lignes). Elle ne sert qu'à classer ; jamais sommée (la somme naïve donnerait 312 M).
- **Dénominateurs** : chaque taux sur les lignes renseignées, effectif affiché (prêts 12 797,
  personnel 12 889, dimanche 11 914).
- **Déclaration par réseau** : Lyon porte ses prêts sur 1 bibliothèque sur 17 ; aucune des 69
  bibliothèques parisiennes n'a de nombre de salariés. Dit en page.
- **Population non renseignée** (189) : pour l'essentiel les bibliothèques départementales (155) ;
  dernière barre du premier graphique, rouge sur la carte.
- **Amplitude horaire** écartée : 11 valeurs > 80 h, max 1 630, pas de médiane dans dsfr-data.

## Phrase de lecture

« Les bibliothèques des communes de moins de 2 000 habitants sont 58 % des lieux et réalisent 8,7 %
des 246 882 640 prêts déclarés pour 2023. » — calculée (`dsfr-data-repeat` sur la ligne de synthèse).

## Ce qu'on ne montre pas

Lieux sans activité déclarée, sans coordonnées (166), sans population ; lieux non ouverts au public
(bibliobus, réserves, administratifs — gardés dans les comptes) ; population desservie et prêts par
habitant (pas de population d'EPCI) ; heures d'ouverture ; causes (budgets, distances).

## Angles écartés

Prêts par habitant par département (population d'implantation répétée, intercommunalités) ; croisement
avec les dépenses culturelles des communes (page parallèle) et Basilic (cohérent à 2 unités, n'apporte
rien à l'histoire) ; classement des plus gros prêteurs (désigne des établissements, et les réseaux
déclarent sur une ligne).
