# Analyse métier — culture / voyages-presidentiels

Fiche 21 du cadrage (`docs/portail-culture/proposition.md`). Niveau `dataviz-metier` : avancé.
Jeu : Archives nationales, *Déplacements des présidents de la République et des Premiers ministres
depuis 1945*, ressource Tabular `d6df4e06-d55c-4616-a974-2b53d0d4e025` (2 750 lignes, CSV du
2025-08-27). Chiffres rejoués sur le CSV complet le 2026-09-27.

## L'exploration

- **Unité** : une ligne = un lieu d'un dossier de voyage (« étape »), pas un voyage. La tournée
  africaine de 1958 fait 7 lignes, le voyage au Japon de 2000 en fait 3. 1 352 lignes
  présidentielles pour 1 075 intitulés de dossier distincts.
- **Deux fonctions mélangées** : 1 352 lignes de présidents, 1 398 de Premiers ministres. Le cadrage
  ne le disait pas.
- **Part hors de France par président (étapes)** : Auriol 9,0 %, Coty 25 % (4 étapes), de Gaulle
  28,7 %, Pompidou 47,1 %, Giscard 45,0 %, Mitterrand 63,2 %, Chirac 81,9 %, Sarkozy 83,2 %,
  Hollande 90,2 %, Macron 89,1 %. En dossiers distincts : même tendance, de Gaulle 36,6 %, Pompidou
  53,7 %, identique à un point dès Mitterrand.
- **Étapes en France** : de Gaulle 159, Mitterrand 131, Chirac 43, Sarkozy 18, Hollande 6, Macron 6.
  Étapes à l'étranger : 64, 225, 195, 89, 55, 49. → la hausse de la part vient d'abord de
  l'effondrement des étapes en France dans le fonds.
- **Premiers ministres** : part hors de France sans tendance (Raffarin 14,8 % sur 427 étapes,
  Fillon 91,0 % sur 89, Balladur 21,6 %, Rocard 65,3 %) : l'effet de versement d'archives est patent.
- **Pays** : Allemagne 83 étapes présidentielles, États-Unis 48, Belgique 42, Royaume-Uni 29,
  Russie 27. 125 codes pays distincts hors France (CDN/RCH recodés CAN/CHL). 7 présidents sur 10 ont
  une étape en Allemagne (pas Hollande, pas Auriol, pas Coty).
- **Couverture** : 1945-2018 ; aucune étape présidentielle en 1955, 1956, 1996 ; Chirac commence en
  1997, Hollande s'arrête en 2016, Macron n'a que 2017-2018. De Gaulle est « Président de la
  République » dès 1945 (43 étapes avant 1959). Auriol a deux années fautives (1960, 1972 pour 1950,
  1952). Giscard a 5 étapes de 1993-1994.

## L'histoire retenue, et pourquoi elle diffère du cadrage

Le cadrage demandait « où vont les présidents ? » (barres pays, pas de carte monde). La donnée dit
plus fort autre chose : **dans le fonds, l'étranger passe de 29 % des étapes (de Gaulle) à 90 %
(Hollande)** — et cette bascule est au moins pour moitié un effet d'archive (six étapes en France
pour Hollande en cinq ans). Le titre porte donc « dans les archives », et la page consacre sa
nuance à le prouver (France vs étranger empilés, Premiers ministres sans tendance). « Où » reste un
bloc (carte monde + top 15), avec l'Allemagne en tête.

Angles écartés : série annuelle (quelques dizaines d'étapes par an, trous de versement : elle
raconterait les versements) ; comparaison président / Premier ministre sur une même période (les
fonds PM sont trop hétérogènes) ; nombre de voyages par an de mandat (le fonds n'est pas un agenda).

## La forme

1. KPI : 1 352 étapes, 59 % hors de France, 125 pays et territoires.
2. Barres verticales, ordre des mandats, 0-100 %, gris + de Gaulle et Hollande en évidence.
3. Barres horizontales empilées France / hors de France : le volume montre l'effet d'archive.
4. Barres PM, ordre d'arrivée dans le fonds, gris uniforme : l'absence de tendance est le message.
5. Carte monde (`map-monde`) + top 15 barres triées, Allemagne en évidence.
6. Exploration : recherche + facettes (fonction, où, personne, pays) + fiches avec lien notice.

## Honnêteté

- Part par groupe = `avg` d'un indicateur 0/100 par ligne : une proportion, pas une moyenne de taux.
- Seuil de 20 étapes (Coty, 8 PM) dit en note, comptes calculés.
- « Hors de France » = pays actuel du jeu : Algérie avant 1962 et Afrique 1958-1959 hors de France
  (dit ; l'inverse accentuerait la tendance).
- 24 étapes non coloriées sur la carte (États disparus, Kosovo, micro-États absents de la table de
  conversion ou de la carte DSFR Chart), dites en page, gardées dans barres et liste.
- Mandats en libellés : dates constitutionnelles recodées à la main (pas lues dans le jeu), dit en
  commentaire ; anomalies de fonction et de date dites en « ce qu'on ne montre pas ».

## Phrase de lecture

« Sur les 223 étapes de Charles de Gaulle conservées, 64 sont à l'étranger (29 %). […] Sous François
Hollande, 55 sur 61 (90 %). » — calculée par `dsfr-data-repeat`.

## Ce qu'on ne montre pas

L'agenda réel ; des voyages (des lieux) ; des mandats complets ; des fonctions exactes (de Gaulle
1945) ; une série annuelle. Tout est écrit en page.
