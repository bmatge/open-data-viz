# Analyse metier — Données de comptabilité générale de l'État (2016-2025)

> La lecture `dataviz-metier` : le sens avant la syntaxe.
> **Ce fichier n'est jamais ecrase par un script.** Les sorties du modele
> multimodal arrivent dans `constats/` ; ce qui est retenu se reecrit ici, a la main.

## La question posee, et pour quel lecteur

« Qu'est-ce qui dégrade les comptes de l'État depuis dix ans ? » — pour un citoyen, un élu, un
journaliste qui connaît le mot « dette » mais pas « situation nette ».

## L'histoire trouvée (recréation du 2026-09-26, rejouée à l'API)

- **Concentration** : entre 2016 et 2025, la dette financière passe de 1 646,8 à 2 787,0 Md€
  (+1 140 Md€) ; c'est **90 %** de la hausse du passif (+1 261 Md€) et **3,3 fois** la hausse de
  l'actif (+348 Md€). Le reste du passif ne bouge presque pas (534 → 655 Md€). Dette / actif :
  1,7 → 2,1.
- **Rupture** : le résultat (produits − charges) est négatif les 10 exercices, mais le déficit
  moyen passe de 68 Md€/an (2016-2019) à 141 Md€/an (2020-2025), soit ×2,1, et ne revient pas.
- **Nuance** : la bosse de 2020 vient des charges d'intervention (205 → 273 Md€), qui refluent
  ensuite (251 en 2025) ; ce qui monte presque chaque année, ce sont les charges de fonctionnement
  direct (224 → 299 Md€).
- **Paradoxe / trouvaille** : 95,2 % des produits 2025 (500,6 Md€ sur 525,8) n'ont **aucune
  mission**. La vue par mission de l'original (charges vs produits par mission) fabrique donc un
  « déficit » par mission qui n'est qu'un effet de nomenclature. La recréation ne montre, par
  mission, que les charges.
- 7,4 % des charges 2025 (48,6 Md€) sont aussi sans mission.

Angles écartés : la trésorerie active (pic 2020-2021, 113-118 Md€) — réelle mais secondaire ;
la charge financière (50 → 69 Md€, pics 2020 et 2022) — mériterait sa page.

## La forme retenue, et pourquoi elle sert cette question

1. Chapeau calculé (repeat sur une ligne « début + fin de période ») : la réponse avant tout clic.
2. Trois courbes seulement (actif / dette financière / autres passifs) au lieu de 14 postes
   empilés : la courbe de la dette s'écarte, celle des autres passifs reste plate — le message.
3. Situation nette en barres sous zéro, ligne d'équilibre, variation N/N-1 au tableau (`diff`).
4. Résultat en barres, repère vertical 2020, deux KPI de moyenne avant/après.
5. Charges vs produits et charges par poste côte à côte (la nuance).
6. Exploration : missions triées (top 15, barre de tête mise en évidence) puis charges par poste
   de la mission choisie, titre qui suit le filtre.

## Honnetete de l'echelle

Axes à zéro (barres). Euros courants, non déflatés, dit en page. Moyennes avant/après = moyennes
de montants (pas de taux) : légitimes. La coupure 2020 est une hypothèse éditoriale, écrite en
page, et les 10 exercices restent visibles pour la contester.

## Phrase de lecture

« À la clôture de l'exercice 2025, l'État possède 1 326 Md€ et doit 3 442 Md€ : sa situation
nette est de −2 116 Md€, contre −1 203 Md€ en 2016. Sur la période, sa dette financière a
augmenté de 1 140 Md€ — 90 % de la hausse du passif, et 3,3 fois plus que l'actif. » — calculée
dans la page, aucun chiffre recopié.

## Ce qu'on ne montre pas, et qu'il faut dire

- Catégorie « Situation nette » du jeu (réserves, 1 986 Md€ en 2025) ≠ actif − passif (elle
  exclut le résultat de l'exercice : 1 127,3 = 1 202,9 − 75,6 en 2016).
- EHB : somme nulle chaque année, non représentée.
- Classement des missions figé sur 2025 (le where ODSQL ne sait pas viser « dernier exercice »).
- Dette financière de l'État ≠ dette publique Maastricht ; bilan sans capacité à lever l'impôt.
- Glossaire et descriptifs de mission : jeux restreints (LIM-013).

## Ecarts avec l'original

- Plus de KPI « Actif/Passif/Produits/Charges en 2025 » isolés : les chiffres sont dans le chapeau.
- Postes d'actif/passif non détaillés (dans les exports) ; seule la dette financière est isolée.
- Vue par mission : charges seules (les produits ne sont pas ventilés par mission dans le jeu).
- Liste des missions : 71 missions tirées de la donnée, plus d'exclusion en dur des 16 de l'original.
