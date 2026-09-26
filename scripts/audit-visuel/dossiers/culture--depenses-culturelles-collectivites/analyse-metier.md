# Analyse métier — La culture des collectivités (fiche 1, portail Culture)

Page : `/culture/depenses-culturelles-collectivites` — création, pas de page d'origine.
Jeux du ministère de la Culture (Deps-Doc, comptes de gestion 2023 DGFiP), API Tabular :
départements `6126f348-…` (95 lignes), régions `4dfccc0d-…` (17), EPCI `c7328fc7-…` (879,
export Parquet), communes de 3 500 hab. et plus `f27f0329-…` (3 255, export Parquet).
Niveau dataviz-metier : avancé.

## L'histoire

**Titre-message** : « Culture : de 4 à 69 € par habitant selon le département, mais six euros
sur dix viennent des communes ».

Rejoué le 2026-09-26 sur les quatre jeux complets (pagination Tabular via le tunnel) :

- Départements : Hautes-Alpes 69,2 €/hab (dont 54,6 d'investissement), Meurthe-et-Moselle 4,0 :
  **÷ 17**. Ratio des sommes : 17 €/hab (1 131 M€ / 65,3 M hab publiés).
- Échelons (en euros, sommes des fichiers) : communes ≥ 3 500 hab. 6 540 M€ (**59,7 %**), EPCI
  2 504 M€ (22,9 %), départements 1 131 M€ (10,3 %), régions et collectivités uniques 781 M€
  (7,1 %) ; total 10 957 M€.
- Régions : Corse 90, Guyane 45, Martinique 31 (collectivités uniques) ; métropole de 7
  (Île-de-France) à 18 (Hauts-de-France).
- Communes, ratio des sommes par taille : 83 €/hab (3 500-9 999, 2 214 communes) → 136 → 151 →
  201 €/hab (100 000 et plus, 42 villes). 106 communes à 0 k€ sur 3 255.
- Top 10 départemental : 3 sur 10 investissent plus qu'ils ne fonctionnent ; 15 sur 95 au total.

**Écart au cadrage** : le « de 4 à 69 € » tient, mais il porte sur l'échelon qui pèse un dixième.
L'histoire principale est l'échelon (les communes paient), l'écart départemental devient la
preuve secondaire. Titre élargi, pas remplacé.

## Corrections du cadrage (données, pas bibliothèque)

- 95 lignes départementales et non 101 : Paris (dans les communes, 210 €/hab), Corse, Martinique,
  Guyane (collectivités uniques, dans les régions) absents ; Alsace = une ligne `67,68`.
- Rhône : `population_annee` = 1 926 989 = Rhône + Métropole de Lyon (1 432 690, dans le fichier
  EPCI). 8 €/hab publiés → 30 €/hab hors Métropole (14 915 k€ / 494 299). Recalculé en page par
  jointure, chiffre publié gardé sur la carte.
- Population EPCI : 68,9 M (> population française) — Métropole du Grand Paris (7,1 M) et ses
  EPT comptent les mêmes habitants. D'où aucun €/hab par échelon.
- Codes communes en double : 69149 (Oullins + Pierre-Bénite, deux SIREN) ; 97129 porté par
  Sainte-Rose de La Réunion (SIREN 219740198, code attendu 97419).
- `part_..._pct` en texte (« 2% », « 5,2% »), arrondi variable : non tracé.
- 25 départements, 745 communes, 155 EPCI ont F + I ≠ total à ±1 k€ près (arrondis).

## La forme

1. Barres horizontales triées des quatre échelons (Md€), communes mises en évidence
   (`neutral` + `highlight-index`) — le contraste porte le message.
2. Carte départementale €/hab, `sequentialAscending` (la palette par défaut rendait les
   valeurs hautes les plus claires), `map-summary="none"` (Alsace dédoublée).
3. Barres empilées fonctionnement/investissement du top 10 — la nuance « une année de travaux ».
4. Barres des régions en trois séries (collectivité unique / région d'outre-mer / métropole),
   séries à `null` hors groupe : la couleur explique le classement sans dépendre du rang.
5. Barres par taille de commune, ratio des sommes (jamais moyenne des €/hab).
6. Exploration : trois tableaux (communes avec deux facettes, EPCI, départements), recherche, CSV.

## Honnêteté

- Ratio des sommes partout, jamais `avg` de €/hab.
- Pas de €/hab par échelon (populations qui se chevauchent).
- Doubles comptes possibles entre échelons (subventions) : dit sous le graphique.
- Communes < 3 500 absentes : la part des communes est un plancher.
- 0 € = écriture comptable, pas absence de culture.
- Une seule année : l'investissement ponctuel est nommé comme tel.
- Territoires sans valeur peints en bleu hors échelle par DSFR Chart : dit sous la carte.

## Phrase de lecture (calculée)

« En 2023, le département qui a le plus dépensé pour la culture par habitant — Hautes-Alpes — y a
consacré 69 € ; le moins dépensier — Meurthe-et-Moselle — 4 € : 17 fois moins. Mais le
département est un petit financeur : sur 11,0 milliards d'euros déclarés par les quatre échelons
de collectivités, 60 % viennent des communes et 10 % des départements. »

## Angles écartés

- Classement des communes en titre (Rungis 1 744 €/hab) : petites communes riches, un effet de
  dénominateur, gardé dans le tableau.
- Croisement avec les dépenses de l'État par département (fiche 3) : autre page.
- Part de la culture dans le budget : colonne texte, pas de budget total.
