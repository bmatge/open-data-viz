# Le prix du terrain à bâtir — analyse métier

Création, deuxième vague (§ 5) de `docs/portail-developpement-durable/proposition.md`.
Page : `public/developpement-durable/prix-terrains.html`. Jeu 31 (EPTB), fichier 1
`7b0b1184-f92e-4f8a-8a6a-19b4b23d5118` (terrains achetés par région), millésime 2024-01.

## L'histoire

Le mètre carré de terrain à bâtir coûte **4,1 fois** plus cher en Île-de-France (227 €/m²) qu'en
Bourgogne-Franche-Comté (55 €/m²) en 2024 — et c'est **l'écart le plus faible de la série**
(5,25 en 2012, 4,37 en 2010, 6,8 en 2006). Les deux régions extrêmes sont les mêmes chaque année.
Le mètre carré francilien a culminé à 253 € en 2022 et recule (−10 %) ; celui de la
Bourgogne-Franche-Comté a pris +45 % depuis 2010.

Nuances :
- **Pas un effet de moyenne** : le 1er quartile francilien (170 €/m²) dépasse le 3e quartile de
  Bourgogne-Franche-Comté (99 €/m²).
- **Au terrain entier**, l'écart tombe à 2,3 (158 673 € contre 68 937 €) : les terrains franciliens
  font 698 m², ceux de Bourgogne-Franche-Comté 1 263 m². Le terrain le plus cher est en PACA (186 433 €).
- **France entière** : 57 → 102 €/m² de 2010 à 2024 (×1,8), surface 1 108 → 932 m² (−16 %),
  prix d'un terrain +51 % seulement (63 103 → 95 030 €).
- **Marché fondu** : 87 140 terrains achetés en 2021, 29 029 en 2024 (÷3,0) ; le prix au m² n'a pas reculé.

## Ce qui diffère du cadrage

- « 227 vs 55 » : exact. Mais l'histoire manquait sa moitié : l'écart se resserre.
- « maison 164 → 266 k€ (2006→2024) » : ce sont les prix de l'**Île-de-France** (fichier 3, zone 11),
  pas un national. Écarté de la page, dit dans « ce qu'on ne montre pas ».
- « `secret` » : **aucune** cellule secrète ni `na` dans ce fichier (0/266 lignes).

## La forme

Barres horizontales triées (contraste : la plus chère et la moins chère en évidence, le reste en
gris) ; barres groupées Q1/médiane/Q3 (dispersion) ; barres triées du prix au terrain (nuance) ;
barres du rapport max/min par année, axe à 0 ; courbes en base 100 (m², prix, surface) ; barres
du nombre de terrains, axe à 0 ; exploration par région (select avec défaut) + tableaux.

## Honnêteté

- `PTM2_MOY` = `PT_MOY / SURFT_MOY` (ratio de moyennes, vérifié sur 266 lignes) : souvent sous
  la médiane. Dit en page. Le national est recomposé en ratio de sommes (Σ prix / Σ surface),
  même définition — jamais une moyenne des moyennes régionales.
- Depuis 2010 seulement : l'enquête devient exhaustive sur son champ en 2010 (notice
  méthodologique EPTB, nov. 2025) ; l'Île-de-France perd 35 €/m² entre 2009 et 2010.
- Euros courants ; champ = maisons individuelles hors lotissement, particuliers, avec achat de terrain.
- DROM regroupés (« Région fictive » XX) : gardés, renommés « Outre-mer (DROM regroupés) ».

## Phrase de lecture (calculée)

« En 2024, … 227 € le mètre carré en Île-de-France, contre 55 € en Bourgogne-Franche-Comté : 4,1 fois
plus. » — régions, année et rapport lus dans la donnée (tri + `limit="1"` + jointure). La phrase
« le quart le moins cher reste au-dessus du quart le plus cher » est sous `{{#if}}`, avec sa
contraire sous `{{#unless}}`.

## Ce qu'on ne montre pas

Lotissements et collectif ; départements et communes ; 2006-2009 ; prix de la maison ; inflation ;
DROM un par un ; (absence de) secret statistique.

## Hypothèses et angles écartés

- Carte régionale : écartée, 14 barres triées disent la même chose plus lisiblement.
- Prix de la maison (fichier 3) : autre histoire (coût de construction), et le cadrage s'y était trompé.
- `highlight-index="[0, 13]"` suppose 14 zones : à revoir si le fichier change de découpage.
