# Analyse métier — culture / sites-patrimoniaux

Page : `public/culture/sites-patrimoniaux.html` — fiche 14 du cadrage `docs/portail-culture/proposition.md`.
Niveau `dataviz-metier` : avancé (page), chaque bloc relu au niveau base.

## Le jeu

« Liste des sites patrimoniaux remarquables » (ministère de la Culture), ressource Tabular
`b916f51e-7252-41c2-8a0e-eb47e0c9292b`, jeu `628da9ff836d8bf454c7fd48`, export Parquet présent.
1 145 lignes, 19 colonnes. **Une ligne = une commune dans un SPR** (pas un SPR, pas une commune) :
1 022 numéros de SPR distincts, 1 082 codes commune distincts (1 029 sur les lignes numérotées).
58 lignes sans numéro (52 sans régime d'origine, dont 46 « AVAP à l'étude ») : des projets.
Régime d'origine et plan en vigueur sont saisis par ligne ; 13 numéros de SPR ont des valeurs
divergentes d'une commune à l'autre (origine, date ou plan).

## L'histoire

Cadrage : « six SPR sur dix héritent d'une ZPPAUP » (693 / 1 145 lignes = 60,5 %). Rejoué : juste
en lignes brutes, mais le dénominateur inclut les projets. Sur les 1 087 lignes numérotées :
693 ZPPAUP = **63,8 %** (« près de deux sur trois »). L'histoire plus forte est dans le croisement
avec le plan en vigueur : **464 communes-sites (42,7 %) appliquent encore un règlement de ZPPAUP**,
soit 67 % des nées ZPPAUP ; le PVAP créé par la loi LCAP de 2016 n'en couvre que **35 (3,2 %)** ;
69 des 75 SPR créés directement depuis 2016 n'ont aucun plan renseigné.

Titre : « Sites patrimoniaux remarquables : près de deux sur trois sont nés ZPPAUP, et plus de quatre
sur dix en appliquent encore le règlement ».

## Plan de page

1. Accroche : titre-message, chapô calculé, 4 KPI (1 022 SPR, 1 029 communes, 64 %, 43 %).
2. Preuve 1 — barres horizontales par régime d'origine, **ordre chronologique** (1962, 1983, 2010,
   2016, non renseigné), ZPPAUP mis en évidence (`neutral` + `highlight-index`).
3. Preuve 2 — barres empilées origine × plan en vigueur : la transition inachevée se lit en une
   barre (ZPPAUP aux deux tiers « règlement de ZPPAUP »).
4. Rythme — barres empilées décennie × origine : relais secteur sauvegardé → ZPPAUP → AVAP → SPR, et
   ralentissement (374 dans les années 2000, 205 dans les années 2010, 110 en 2020-2025).
5. Nuance — un vieux règlement n'est pas un site oublié ; 127 des 464 déclarent un remplacement à
   l'étude ou à venir.
6. Exploration — facettes (plan, origine, région, département), carte colorée par plan, KPI de
   sélection, liste avec recherche.
7. Ce qu'on ne montre pas, puis `#analyse`.

## Honnêteté

- Dénominateur : lignes numérotées, dit en chapô et en source ; le chiffre sur 1 145 lignes est
  donné dans « ce qu'on ne montre pas ».
- Unité « commune-site » nommée partout ; nombre de SPR distincts donné à part.
- Décennie 2020 incomplète (six ans) dite sous le graphique et dans la phrase de lecture.
- « PSMV + PVAP » (3) rangé en PVAP ; « LCAP », « rien » et vide rangés en « Aucun plan renseigné » ;
  « secteur S + LCAP » (1) en secteur sauvegardé. Choix écrits dans le source.
- Population sans millésime : non exploitée (seulement le compte < 2 000 hab., 404, 37 %).
- Pas de `color-map` sur les graphiques empilés (BUG-022, pastilles d'infobulle) : palette par défaut.

## Phrase de lecture (exemple)

« Sur les 693 communes-sites nées ZPPAUP, 464 (67 %) appliquent encore le règlement d'origine,
adopté pour l'essentiel dans les années 1990 ou 2000. » — calculée par `dsfr-data-repeat`.

## Angles écartés

- Croisement MH × SPR par code commune : possible, mais codes MH périmés (appariement partiel à
  chiffrer) ; renvoyé à la page Monuments historiques.
- Âge des règlements (date du plan en vigueur) : 151 lignes vides et des « 1900-01-01 » de remplissage.
- Densité par habitant : population sans millésime.
