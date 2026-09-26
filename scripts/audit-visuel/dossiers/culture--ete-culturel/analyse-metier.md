# Analyse métier — culture / ete-culturel

Fiche 24 de `docs/portail-culture/proposition.md`. Niveau `dataviz-metier` : avancé (page), chaque bloc relu au niveau base.

## L'histoire

Le cadrage titrait « Été culturel : 2 365 événements en 2025, 3 M€ pour l'Île-de-France ». Les deux chiffres sont
justes (rejoués), mais juxtaposés ils ne racontent rien. L'histoire est dans leur **écart** :

- l'agenda 2025 compte 2 365 événements (1 176 communes, 1 680 lieux) ; l'agenda de la DRAC Île-de-France en publie
  715, soit **30,2 %**, 2,8 fois le suivant (Provence-Alpes-Côte d'Azur, 254) ;
- l'Île-de-France reçoit 3 M€ sur 16,26 M€ de crédits déconcentrés en 2023, soit **18,5 %** ;
- ailleurs l'écart va dans les deux sens : Hauts-de-France et Occitanie 7,1 % des crédits chacune, 1,9 % et 2,8 % des
  événements ; Bourgogne-Franche-Comté 4,4 % des crédits, 10,4 % des événements ; Pays de la Loire 4,7 % / 10,5 % ;
- six territoires financés (La Réunion, Mayotte, Guyane, Nouvelle-Calédonie, Polynésie, Saint-Pierre-et-Miquelon,
  555 110 € en 2023) n'ont aucun événement dans l'agenda.

Conclusion : **l'agenda mesure l'habitude de publier sur OpenAgenda, pas l'activité ni l'argent.**

**Titre-message** : « Été culturel 2025 : trois événements publiés sur dix sont franciliens, et l'agenda ne suit pas la
carte des crédits ».

## Deux millésimes, et ce qu'on s'interdit

Les crédits publiés s'arrêtent à 2023 ; l'agenda porte sur 2025 (malgré le titre « Été culturel 2024 » du jeu). La page
compare des **parts**, jamais des euros par événement, et le dit sous le chapô et dans « ce que la page ne montre pas ».
Le rapprochement reste défendable parce que l'enveloppe est quasi constante (16,30 / 16,32 / 16,26 M€) et que 19 des
21 lignes sont identiques entre 2022 et 2023 : la répartition régionale de 2023 est stable.

## Angles écartés

- *Euros par événement* : deux années différentes, et aucun lien événement ↔ subvention dans les fichiers.
- *Événements pour 100 000 habitants* : la densité mesurerait encore l'usage de l'agenda, pas l'offre.
- *Gratuité, accessibilité* : champs vides pour 52 % et 80 % des lignes.
- *Évolution du nombre d'événements* : le jeu ne garde que la dernière édition (fichier remplacé le 2025-08-27).

## Plan de page (accroche → preuve → nuance → exploration → conclusion)

1. Titre-message + chapô calculé + 4 KPI (événements, part IDF, crédits 2023, part IDF des crédits).
2. Preuve : barres horizontales triées par agenda, IDF en évidence.
3. Nuance 1 : barres groupées part des crédits 2023 / part des événements 2025, par région (jointure complète : les
   territoires sans agenda et les « autres agendas » restent visibles).
4. Nuance 2 : l'enveloppe stable mais redistribuée — barres d'écart 2023 − 2021 triées (IDF, HdF, PACA en évidence) ;
   note sur les colonnes 2022 = 2023.
5. Nuance 3 : calendrier par semaine de première date, pic de la semaine du 21 juillet ; 224 événements hors juillet-août
   alors que l'opération est présentée pour juillet et août.
6. Exploration : recherche, facettes (mois, agenda, département), 3 KPI de sélection, carte colorée par mois, tableau.
7. Ce que la page ne montre pas ; analyse.

## Honnêteté

- Région = agenda de publication (DRAC), pas la colonne « Région » du lieu (17 vides, 5 en minuscules, ~33 lieux hors de
  la région de leur agenda). 26 événements viennent d'agendas non-DRAC : groupe « Autres agendas », visible, sans crédit.
- Une ligne = un événement (2 365 identifiants distincts, vérifié). 795 événements ont plusieurs dates : comptés une fois,
  à leur première date.
- Semaines : rang du jour calculé depuis `month()`/`day()` ; comptes identiques aux semaines ISO calculées en Python.

## Phrases de lecture (toutes calculées en page)

Chapô, lecture de chaque bloc, note 2022 = 2023 : `dsfr-data-repeat` sur une ligne de synthèse jointe (événements ×
crédits × comparaison). Les seuls littéraux sont des bornes de lecture (« moins de 3 % », « entre 220 et 255 ») et les
descriptions a11y, relues contre les données le 2026-09-27.
