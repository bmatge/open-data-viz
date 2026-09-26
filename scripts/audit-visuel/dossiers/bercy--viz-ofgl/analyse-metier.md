# Analyse metier — Observatoire des finances et de la gestion publique locales

> La lecture `dataviz-metier` : le sens avant la syntaxe.
> **Ce fichier n'est jamais ecrase par un script.**

Recréation du 2026-09-26, niveau « avancé » (une page). Chiffres rejoués à l'API
`data.ofgl.fr` / `ofgl-base-departements-consolidee` le même jour.

## Ce qui a renversé l'ancienne page

L'ancienne page (analyse seule, LIM-007) jugeait qu'on ne pouvait rien publier à partir des
balances brutes du MEF sans la règle comptable de l'OFGL. C'est vrai des balances. Mais l'OFGL
publie ses agrégats **déjà calculés à partir de ces balances** (« Le calcul des agrégats a été
réalisé par l'OFGL à partir des données des balances comptables … publiées par la DGFiP »,
métadonnées du jeu, modifié le 2026-07-17), sur un portail Opendatasoft ouvert : CORS
`access-control-allow-origin: *`, sans clé, quota de 10 000 requêtes par jour. 95 jeux au catalogue, dont
les bases consolidées régions, départements, GFP, communes et SDIS.

## L'exploration qui a trouvé l'histoire

- Périmètre : `categ` DEPT / ML / PARIS. Nombre de collectivités DEPT : 101 (2012) → 99 (2016,
  Guyane et Martinique en CTU) → 97 (2018, Corse) → 96 (2019, Paris sort en PARIS) → 95 (2021,
  Alsace `67A`). **Périmètre territorial constant depuis 2019** : les séries commencent là.
- Épargne brute DEPT (Md€) : 9,4 (2019), 8,0, 11,5, **12,1 (2022)**, 7,4, **5,1 (2024)**, 6,7 (2025).
  −58 % de 2022 à 2024.
- Taux d'épargne brute (EB / recettes de fonctionnement) : 16,8 % (2022) → 7,1 % (2024) → 9,1 % (2025).
- Ciseaux 2022 → 2024 : recettes de fonctionnement −0,5 Md€, dépenses +6,5 Md€. DMTO après péréquation
  14,6 → 10,3 Md€ (−4,3) ; RSA + APA + PCH + frais d'hébergement +3,4 Md€ (32,1 → 35,5).
- **94 départements sur 95** ont une épargne brute 2024 inférieure à celle de 2022 : phénomène
  général, pas local.
- Épargne nette négative : 1 département en 2022, 5 en 2023, **18 en 2024**, 10 en 2025 (dont 7
  déjà en 2024). Gironde la plus négative (−130 M€ en 2024, −59 M€ en 2025).
- Taux médian d'EB : 16,5 % (2022), 7,8 % (2024), 9,6 % (2025).

## Angle retenu, angles écartés

- **Retenu : la chute et son mécanisme** : « En deux ans, l'épargne des départements a fondu de
  plus de moitié ». Accroche (KPI), preuve (barres 2019-2025), mécanisme (deux petits multiples
  en base 100 à la même échelle : ciseaux recettes/dépenses, puis DMTO/dépenses sociales), nuance
  (les 18 en épargne nette négative, avant/après 2025), exploration (carte du taux 2024 +
  tableau des 95).
- **Écarté : l'atelier de cartes** (choix libre de l'agrégat et des classes) : c'est un outil,
  pas une page ; renvoyé vers data.ofgl.fr.
- **Écarté : la série 2012-2025** : ruptures de périmètre (Paris, Corse, CTU) qui se lisent
  comme des évolutions.
- **Écarté : la dette et l'investissement** (encours DEPT 31,6 → 35,4 Md€ de 2022 à 2025) : une autre page, même jeu.
- **Écarté : la cause** (marché immobilier, revalorisations) : non portée par le jeu, dite en
  page comme lecture habituelle.

## Forme et honnêteté

- Barres à zéro pour les montants ; base 100 pour comparer des pentes de postes de tailles
  différentes, avec la mention que l'indice ne dit pas le poids (dépenses sociales = 2,2 à 3,4 fois
  les DMTO selon l'exercice).
- Carte en **taux** (EB / RRF), pas en montant ; résumé pondéré par les recettes
  (`map-summary="weighted"` + `map-summary-field` sur la colonne non arrondie). Résumé 7,03 %
  contre 7,1 % en KPI : l'Alsace (`67A`) n'a pas de contour, c'est dit en page.
- Épargne nette en M€ arrondie au centième : la Maine-et-Loire est à −0,02 M€ en 2025 ; un arrondi
  au dixième l'affichait « 0 » (puis « -0 ») alors qu'elle est comptée parmi les négatives.
- Paris et Métropole de Lyon écartés (compétences communales/métropolitaines).

## Phrase de lecture (calculée)

« Les départements dégageaient {{eb22}} Md€ d'épargne brute en 2022 ; ils n'en dégagent plus que
{{eb24}} Md€ en 2024, soit {{chute}} % de moins. » : pivot sur `poste_an` + `compute`, rendu
par `dsfr-data-repeat`.

## Ce qu'on ne montre pas

Années avant 2019, Paris et Lyon, la Corse, la Guyane et la Martinique (dans la base régions), la cause, la dette,
l'investissement, l'atelier de cartes.
