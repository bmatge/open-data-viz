# Analyse métier — Pesticides : le kilo n'est pas le danger (D5, portail Développement durable)

Page : `/developpement-durable/pesticides` — création, pas de page d'origine.
Jeux SDES (DiDo) : achats de produits phytosanitaires par département de l'acheteur (jeu 15,
`64394106…`, fichier `6fc4f14f-8510-48bb-82dc-9f29e3619761`, 1 390 685 lignes, 2013-2024) ;
ITDD départemental (jeu 23) `aa011e5d-…`, filtré `VARIABLE=in:saue,part_agribio_surf`.
Niveau dataviz-metier : avancé.

## L'histoire

**Titre-message** : « Pesticides : le kilo n'est pas le danger — la Gironde en achète six fois la
moyenne à l'hectare, dont près de la moitié de soufre ».

Rejoué à l'API le 2026-09-26 (export `/json` filtré, recalcul Python indépendant, identique à
l'affichage) :

- 2024 : **68 600 t** de substances actives achetées ; SAU 2024 (ITDD, 100 départements)
  26 825 092 ha → **2,56 kg/ha**. 1 533 lignes « na » (exclues des sommes). Code 00
  « INDETERMINE » : 334,7 t (dans le total, hors carte).
- CMR1 : 6 126 t (2014, max depuis 2014), 5 504 t (2018), **68 t (2024)** : −98,9 % depuis le max.
- Classes 2024 : Autre 28 587 t, Env-A 25 031, CMR2 11 363, Santé-A 2 381, Env-B 1 170, CMR1 68 ;
  CMR1+CMR2 = **16,7 %** des kilos.
- Utilisables en bio (UAB) : **37 %** des kilos nationaux ; Gironde **68 %**.
- Kg/ha (SAU ≥ 10 000 ha, 96 départements) : Gironde **16,5** (6,4 × la moyenne), Vaucluse 12,9,
  Gard 10,6, Hérault 10,2, Var 8,7, Bouches-du-Rhône 8,0, Pyrénées-Orientales 7,2, Aude 6,6 — les
  huit premiers sont viticoles et à 68-84 % UAB. Hors UAB : Gironde 5,3, Somme 4,1, Eure-et-Loir
  3,7, Oise 3,6.
- Gironde 2024 : 3 723 t, soufre 1 833 t (**49,2 %**), fosétyl-Al 397, folpel (CMR2) 275.
- Glyphosate : 9 343 t (2018), 5 965 (2019), 5 782 (2022, creux), **8 176 (2024)**.

**Ce qui diffère du cadrage, et pourquoi** :

1. La SAU 2024 est publiée : kg/ha sur la même année que les achats (Gironde 16,5, pas 16,1).
2. **La corrélation r = +0,71 entre part de surfaces bio et kg/ha est un artefact** : elle tient
   aux seuls Hauts-de-Seine (1 ha de SAU, 100 % bio, 13 001 kg/ha). Sans eux r = +0,37
   (99 départements), +0,39 avec le seuil de 10 000 ha (96). Le « paradoxe bio » n'est donc pas
   affirmé ; ce qui tient est la part de soufre/cuivre dans les kilos des vignobles
   (r entre part UAB des kilos et kg/ha = +0,48).
3. Le glyphosate n'a pas baissé : c'est la nuance du récit « le danger recule ».
4. La comparaison 2018 → 2024 du total (82 610 → 68 600 t) **n'est pas montrée** : le total par
   année exige tout le fichier.

## La forme

1. Chapô calculé (deux `dsfr-data-repeat`) + 4 KPI (tonnes, kg/ha, CMR1, part UAB).
2. Accroche : barres CMR1 par année (2014-2024), 2013 écartée (base incomplète).
3. Preuve : barres horizontales par classe de danger, ordre fixe du plus au moins dangereux
   (`rang` calculé) pour que `highlight-index="[0, 1]"` vise toujours les deux classes CMR.
4. Nuance : glyphosate par année (source `lazy`).
5. Révélation : les 15 départements aux plus forts kg/ha, empilés « utilisables en bio » /
   « autres » ; phrase calculée du classement hors UAB.
6. Exploration : carte kg/ha (map-summary `none`) + tableau 96 départements ; explorateur d'un
   département (facette `select` à défaut Gironde → répéteur à `key-field` → source DiDo filtrée
   par le code dans l'URL) : barres empilées par année + dix substances de la dernière année.
7. Ce qu'on ne montre pas, puis `#analyse`.

## L'honnêteté

- **Unité de compte** : l'adresse de l'acheteur, pas la parcelle. Départements < 10 000 ha de SAU
  écartés (Hauts-de-Seine, Val-de-Marne, Seine-Saint-Denis, Mayotte) et nommés en page avec leur
  ratio ; Paris sans SAU publiée.
- **Ratio national** = total (code 00 compris) / SAU totale — pas une moyenne de ratios. Pas de
  résumé sur la carte, qui dessine un autre périmètre.
- **« na »** : compté et dit (1 533 lignes en 2024), exclu des sommes sans devenir zéro.
- **2018** : année de stockage avant la hausse de la redevance (dit sous l'accroche et dans le
  glyphosate). **2013** écartée des séries.
- **UAB** est une propriété de la substance, pas de l'exploitation : dit sous le graphique.
- Pas de `color-map` sur les empilés : BUG-022 (pastilles d'infobulle fausses). Palette par défaut,
  légende, barres et infobulle concordent (vérifié au survol).

## La phrase de lecture

« Rapportés à la surface agricole, les achats classent en tête les départements de vigne. La
Gironde achète 16,5 kg de substances actives par hectare, 6,4 fois la moyenne nationale ; mais
11,1 kg sont des substances utilisables en agriculture biologique. »

## Ce qu'on ne montre pas

Le total national par année (1,39 M lignes, ≈ 150 Mo estimés en cinq colonnes) ; le lieu et la
date d'épandage ; la toxicité réelle (dose, exposition) ; une corrélation bio/pesticides ; les
ventes (département du distributeur).
