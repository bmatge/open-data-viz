# Analyse métier — La fin du fioul (D6, portail Développement durable)

Page : `/developpement-durable/fin-du-fioul` — création, pas de page d'origine.
Jeux SDES (DiDo) : ventes de produits pétroliers par département `445d1fbb-…` (jeu 36),
EPTB maisons construites par mode de chauffage `a903cdb0-…` (jeu 31), conjoncture mensuelle —
prix des produits pétroliers `daf4715a-…` (jeu 1). Niveau dataviz-metier : avancé.

## L'histoire

**Titre-message** : « La fin du fioul : deux fois moins vendu qu'en 2012, et presque plus de gaz
dans les maisons neuves ».

Rejoué à l'API le 2026-09-26 (dernier millésime) :

- Fioul domestique (FOD), France métropolitaine : 7 632 kt (2012) → 3 561 kt (2024), **÷ 2,1 (−53 %)**.
- Le cadrage disait « ÷ 4,4 depuis 2005 » (15 749 → 3 561). Faux comme message : le gazole non
  routier (GNR) apparaît dans le fichier en 2012 (0 en 2011, 3 972 kt en 2012) quand le FOD perd
  3 849 kt. Rupture de nomenclature (engins agricoles et de chantier). FOD + GNR : 15 749 (2005) →
  7 924 (2024), **÷ 2,0**. Les deux mesures honnêtes convergent : « deux fois moins ».
- Contraste 2012 → 2024 : fioul lourd −83 %, FOD −53 %, GPL −25 %, gazole routier −18 %,
  carburéacteur +4 %, GNR +10 %, supercarburants +55 %.
- Maisons individuelles neuves (EPTB, métropole, PCS « ensemble ») : gaz **13,4 % (2016, maximum
  depuis 2010) → 5,4 % (2021) → 1,6 % (2022) → 0,2 % (2024)**. Renouvelables (seules ou combinées
  + combinées à un autre mode) 34 % (2010) → 77 % (2024) ; électricité seule 38 % → 15 %.
  Le cadrage disait 17,3 % → 2,0 % : non reproduit (aucun calcul ne redonne ces valeurs).
- Prix du FOD (€ TTC courants / 100 kWh) : 7,89 (janv. 2021) → record **17,92 (avril 2026)** →
  17,00 (août 2026).

## Corrections du cadrage (données, pas bibliothèque)

- `NB_MAISONS` n'est pas « des maisons enquêtées (2 296 en 2024) » : 2 296 est la valeur de
  l'Île-de-France. L'EPTB est **exhaustive sur son champ depuis 2010** (notice méthodologique,
  nov. 2025) : ce sont des permis de maisons individuelles en secteur diffus, avec imputation.
- « Région fictive » `XX` n'est pas un résidu : ce sont les **DROM regroupés** (notice).
- Les six modes de chauffage forment une partition de « ensemble » : « EnR seules et combinées »
  **n'inclut pas** « EnR combinées à un autre mode ». Écart résiduel ≤ 0,1 % sauf 2016-2018 et
  2022-2023 (2,0 % en 2022, dont cinq régions sans aucune cellule secrète).
- Pétrole : l'année **2008 manque** au fichier ; 96 départements (métropole seule) ; les lignes
  `XX` « Département fictif » ne portent que du GPL régional (2005-2015).

## La forme

1. Chapô calculé + 3 KPI (variation FOD depuis 2012, part du gaz dans le neuf, prix du dernier mois).
2. Preuve : barres empilées FOD + GNR par année — montre à la fois la baisse et la rupture 2012.
3. Contraste : barres horizontales triées, variation 2012 → dernière année par produit, les deux
   fiouls mis en évidence (palette neutre + `highlight-index`).
4. Rupture : part du gaz dans les maisons neuves, une barre par année, ligne de référence RE2020 ;
   puis barres empilées à 100 % des six modes.
5. Nuance : prix mensuel du fioul (courbe) — « ceux qui restent paient au plus haut », avec la
   réserve que la baisse des ventes précède la flambée de 2022 (pas de causalité affirmée).
6. Exploration : carte départementale de la variation 2012 → dernière année, facette région,
   tableau triable ; lecture calculée (5 départements sur 96 en hausse, Haute-Corse +157 %).
7. Ce qu'on ne montre pas, puis `#analyse`.

Angles écartés : la carte du ratio 2024/2005 proposée au cadrage (mélange la rupture GNR et les
effets de localisation des ventes : Loire 727 kt en 2005, Val-d'Oise 42 kt) ; le prix des maisons
et des terrains (hors du propos « comment se chauffe-t-on ») ; les volumes de maisons (le nombre
d'autorisations s'effondre, une part stable y cacherait un volume qui fond).

## L'honnêteté

- Ventes au département de livraison, pas consommation : dit sous le graphique et en exploration.
- Rupture GNR 2012 : dite dans la phrase de lecture et visible dans le graphique.
- Secret statistique EPTB : compté en page (8 cellules sur 91 en 2024, 41 maisons, 0,08 %).
- Parts calculées sur le total publié : les barres 2022-2023 n'atteignent pas 100 %, et c'est dit.
- Prix en euros courants, sans correction de l'inflation.
- DROM : exclus (m³ côté pétrole, secret côté EPTB) ; le fond de carte les dessine sans valeur,
  dit en note.
- Années de référence écrites en dur (2005, 2012, janvier 2021) parce qu'elles sont des repères
  datés ; la dernière année et le dernier mois sont lus dans la donnée.

## Phrase de lecture (chapô)

« En 2024, il s'est vendu 3 561 milliers de tonnes de fioul domestique en France métropolitaine,
contre 7 632 en 2012 : 2,1 fois moins. […] parmi les maisons individuelles autorisées en 2024,
0,2 % seulement se chaufferont au gaz, et 77 % aux énergies renouvelables. »

## Ce qu'on ne montre pas

DROM ; parc de chaudières existant ; nombre de maisons ; logements collectifs et lotissements
(hors champ EPTB) ; détail des renouvelables (PAC, bois, solaire non distingués) ; le fioul dans
le neuf (sans modalité propre, compté dans « autres modes »).
