# Analyse métier — Les dépenses de l'État pour la culture (fiche 3, portail Culture)

Page : `/culture/depenses-etat-culture` — création, pas de page d'origine.
Jeux (ministère de la Culture, API Tabular de data.gouv.fr) : Dépenses du ministère de la Culture
par département 2019 `f6883692-2aa6-4c04-820e-f0186e29a884` (100 lignes, hors personnel) ;
Dépenses culturelles des départements 2023 `6126f348-eb0b-49e6-8850-5fe1e1a350e3` (95 lignes).
Niveau dataviz-metier : avancé.

## L'histoire

**Titre-message** : « Plus d'un euro sur deux que le ministère de la Culture dépense dans les
départements l'est à Paris ».

Rejoué à l'API le 2026-09-26 (100 lignes, recalcul Python identique à l'affichage) :

- Total 2019 hors personnel : **3 101 112 082 €** (fonctionnement 2 545 870 530, investissement 555 241 548).
- Paris : **1 751 725 123 € = 56,5 %** du total, pour **3,3 %** de la population (dérivée) ;
  **801 €/hab** (676 fonctionnement, 125 investissement). **20,3 fois** le deuxième département
  (Seine-Saint-Denis, 86,3 M€). Île-de-France (8 départements) : **66 %**. Paris absorbe **49 %** de
  l'investissement et 58 % du fonctionnement.
- Hors Paris : **20,8 €/hab** (moyenne pondérée) ; France entière 46,2 €/hab ; médiane 17 € (non
  affichée : pas d'agrégat médiane) ; **60 départements sur 100** sous 20 €/hab ; minimum **5 €**
  (Landes, Corse), Haute-Savoie 6.
- Premier hors Paris : **Meuse 110 €/hab, 90 % d'investissement** (20,7 M€).
- Croisement avec les conseils départementaux 2023 (94 départements appariés) : par tranche de
  dépense de l'État (< 12 € : 21 dép. ; 12-19 € : 36 ; ≥ 20 € : 37), l'État dépense 8,5 / 15,4 / 30,2 €/hab
  et le département **18,0 / 18,8 / 16,2 €/hab**. Rang de Spearman État × département : −0,11. Aucun
  lien : ni compensation ni cumul.

## Écarts avec le cadrage

- Le titre provisoire (801 € par Parisien, 5 € par Landais) est **exact** mais oppose deux extrêmes.
  Le message le plus fort et le moins trompeur est la **concentration** (56 % à Paris) : il est
  retenu en titre, 801 € et 5 € passent dans le chapô et les KPI.
- La question « compense-t-il ? » laissée ouverte par le cadrage a une réponse : non.
- Le cadrage prévoyait deux cartes (État 2019 / département 2023) : remplacées par des barres
  groupées par tranche, qui répondent à la question sans rapprocher une ligne 2019 d'une ligne 2023.
  La carte des départements est laissée à la page « collectivités » (autre agent).
- Le fichier régional n'est **pas** utilisé : 3 809 871 739 € sur 18 régions contre 3 101 112 082 €
  sur 100 départements (écart 709 M€) ; sa notice cite en plus le service des ressources humaines.
  Hypothèse (non vérifiée) : il inclut une part de personnel. Dit en page, sans conclure.

## La forme

1. Chapô calculé + 3 KPI (part de Paris / par Parisien / hors Paris).
2. Preuve : barres horizontales des 10 premiers en M€, Paris mis en évidence (neutre + highlight) —
   la barre écrasante *est* le message ; pas de barre tronquée.
3. Nuance : 15 premiers hors Paris, par habitant, fonctionnement / investissement empilés — la Meuse
   se lit d'un coup d'œil.
4. Nuance : barres groupées État 2019 × département 2023 par tranche de l'État.
5. Exploration : carte hors Paris (Corse dupliquée en 2A/2B), résumé pondéré par la population ;
   tableau des 100 lignes.

## Honnêteté

- **Dépensé à Paris ≠ pour les Parisiens** : dit dans le chapô et dans « ce qu'on ne montre pas ».
- **Population dérivée** (total ÷ €/hab arrondi) : erreur < 0,1 % à Paris, jusqu'à ±10 % à 5 €/hab ;
  elle ne sert qu'aux ratios de sommes. Contrôle : population dérivée des Landes 440 674 vs
  434 933 (population 2023 du fichier départemental).
- Pas de moyenne de taux : toutes les moyennes par habitant sont des ratios de sommes.
- Deux années différentes (2019 / 2023) : comparaison de niveaux par groupe, jamais de ratio par ligne.
- Tranches (12 et 20 €) : bornes éditoriales, proches des tiers ; dit en commentaire.
- La Meuse : 90 % d'investissement est un fait ; « quelle opération » ne l'est pas — la page ne la nomme pas.

## Phrase de lecture

« En 2019, hors salaires de ses agents, le ministère de la Culture a dépensé 3,10 milliards d'euros
répartis par département. 56 % sont allés à Paris, où vivent 3,3 % des habitants : 801 € par
Parisien, contre 21 € en moyenne dans le reste de la France. »

## Ce qu'on ne montre pas

Salaires ; évolution (une seule année) ; fichier régional ; bénéficiaires réels d'une dépense
localisée ; population exacte. Jointure : Paris, Corse, Martinique, Guyane, Bas-Rhin et Haut-Rhin
(ligne « 67,68 » de la CEA) sans ligne 2023 — la console de `dsfr-data-join` les liste.
