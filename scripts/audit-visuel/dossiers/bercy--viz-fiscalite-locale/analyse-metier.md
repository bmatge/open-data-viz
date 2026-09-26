# Analyse metier — Fiscalité locale des particuliers et des professionnels

> La lecture `dataviz-metier` : le sens avant la syntaxe.
> **Ce fichier n'est jamais ecrase par un script.** Les sorties du modele
> multimodal arrivent dans `constats/` ; ce qui est retenu se reecrit ici, a la main.

Recréation du 2026-09-26, niveau « avancé » (une page). Chiffres rejoués à l'API
`fiscalite-locale-des-particuliers` le même jour.

## L'exploration qui a trouvé l'histoire

- `group_by exercice, ind_majothrs` : les communes qui **majorent la taxe d'habitation sur les
  résidences secondaires** passent de 233 (2021) à 255, 308, **1 461 (2024)**, 1 628 (2025). Soit
  ×7,0 en quatre ans, dont +1 153 en une seule année (contre +75 sur 2021-2023). Appariement par
  `insee_com` : 1 398 communes majorent en 2025 sans le faire en 2021, 3 seulement ont cessé.
- Part des habitants (`mpoid`) vivant dans une commune qui majore : 14,9 % en 2021, **25,4 % en
  2025** (17,5 M sur 69,2 M).
- Taux voté en 2025 : 656 communes sur 1 628 (40 %) au **plafond de 60 %** ; le taux suivant le
  plus fréquent (30 %) n'en réunit que 227.
- Géographie 2025 : la part des habitants concernés dépasse 50 % dans 10 départements (75, 06,
  83, 2A, 92, 74, 13, 2B, 94, 34) ; **40 départements sur 101 n'ont aucune commune qui majore**.
- Taxe foncière bâtie : moyenne pondérée par la population 41,13 % → 43,13 % (+2,0 pts) ;
  moyenne simple des communes 39,45 % → 40,91 %. Appariement : 30 782 communes sur 34 862
  (88 %) ont un taux 2025 supérieur à 2021 — **écarté de la page** (voir plus bas).

## Angle retenu, angles écartés

- **Retenu : la rupture.** « En 2024, la surtaxe des résidences secondaires a changé d'échelle ».
  C'est la seule variation du jeu qui ne soit pas incrémentale, et ni l'original ni la reproduction
  précédente ne la montraient (ils présentaient quatre moyennes départementales, sans
  chronologie de la majoration).
- **Nuance : la taxe foncière**, qui touche tous les propriétaires, monte aussi mais lentement.
- **Écarté : « 88 % des communes ont relevé leur TFB ».** Vrai, mais il faut les 70 000 lignes
  brutes pour apparier les communes (export mesuré : 9,7 s). Pas de phrase sans calcul en page.
- **Écarté : le classement des départements par TFB** (reproduction précédente) : une
  moyenne simple de communes, qui donne au village de 5 habitants le poids de Marseille.
- **Écarté : la cause.** La bascule coïncide avec l'élargissement du zonage par décret de 2023 ;
  écrit en page comme hypothèse de lecture, pas comme donnée.

## La question posee, et pour quel lecteur

Pour le contribuable et le lecteur de presse : « Combien de communes surtaxent les résidences
secondaires, depuis quand, et où ? » ; puis, pour le contribuable seul, l'outil de l'original :
« Quels taux dans mon département, comparés à la France ? ».

## La forme retenue, et pourquoi elle sert cette question

1. Chapeau calculé + quatre KPI (communes, rapport 2025/2021, part des habitants avec 2021 en
   ligne secondaire, part au plafond).
2. Barres par exercice, **2024 mis en évidence** (palette neutre + `highlight-index`) : la rupture
   se voit sans lire. À côté, barres horizontales des tranches de taux, plafond en évidence.
3. Carte départementale de la **part des habitants** (un taux, pas un volume de communes, qui
   avantagerait les départements à nombreuses petites communes) + barres triées des 15 premiers.
4. Barres groupées TFB par habitant / par commune, axe à zéro : la hausse est lente, et la forme
   le dit.
5. Exploration : exercice + département (`url-sync`), KPI département vs France, choroplèthe
   communale à 5 quantiles avec légende, fiche commune, tableau serveur avec export.

## Honnetete de l'echelle

- **Toutes les moyennes de taux sont pondérées par la population** (`sum(taux*mpoid)/sum(mpoid)`
  côté serveur, ratio de sommes côté KPI). L'original faisait des `AVG` simples : pour la
  Côte-d'Or 2025, TFB 37,97 % en moyenne simple contre **44,91 %** par habitant (Dijon pèse).
- La pondération idéale serait par les bases imposables, absentes du jeu : dit en page.
- Résumé de la carte : `map-summary="weighted"` sur les habitants → 25,36 %, égal au KPI national.
- Axe à zéro sur les barres TFB, choisi pour montrer la lenteur de la hausse.

## Phrase de lecture

« En 2025, 1 628 communes majorent la taxe d'habitation due sur les résidences secondaires,
contre 233 en 2021 : 7,0 fois plus. Le mouvement tient en une année, 2024, avec 1 153 communes de
plus qu'en 2023. » — calculée (`pivot` → `compute` → `dsfr-data-repeat`), aucun chiffre en dur.

## Ce qu'on ne montre pas, et qu'il faut dire

- Des montants : le jeu n'a que des taux ; « un habitant sur quatre vit dans une commune qui
  majore » ≠ « un habitant sur quatre paie ».
- La TEOM en moyenne : 10 470 communes sans taux en 2025 (relevé le 2026-09-26).
- Les communes fusionnées (34 963 en 2021 → 34 874 en 2025) ; 12 communes 2025 sans contour
  dans le jeu `-geo`.
- La CFE des professionnels (jeu voisin).

## Ecarts avec l'original

- Région supprimée du sélecteur, remplacée par la France entière : sans cascade, l'original (et
  la reproduction) permettait de comparer un département aux moyennes d'une autre région.
- Moyennes pondérées au lieu d'`AVG` simples : les chiffres diffèrent de l'original, à dessein.
- Carte communale : TFB seule (pas les quatre tuiles de taxe), cinq quantiles au lieu de quatre
  classes égales ; la fiche commune ajoute la majoration.
- Pas de sélection cumulative de communes ni de notice méthodologique complète.
