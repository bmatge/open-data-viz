# Analyse métier — culture / livre-trente-ans

Fiche 8 du cadrage (`docs/portail-culture/proposition.md`). Niveau `dataviz-metier` : avancé.

## L'histoire

Où les particuliers achètent-ils leurs livres imprimés, et qu'est-ce qui a vraiment changé en trente
ans ? Chiffres rejoués le 2026-09-26 sur l'API Tabular (ressource `9f55911c`, 33 lignes, dernière
année **2025** — le cadrage s'arrêtait à 2024) :

| Lieu d'achat | 1993 | 2001 | 2010 | 2012 | 2025 |
|---|---|---|---|---|---|
| Clubs, VPC, courtage | 40 | 25 | 13 | 15 | 2 |
| Grandes surfaces culturelles (GSS) | 10 | 20 | 22 | 23 | 30 |
| Internet | — | — | 13 | 17 | 20 (premier relevé 2002 : 2) |
| Librairies | 31 | 28 | 23 | 22 | 26 (plancher 22 de 2012 à 2020) |
| Grandes surfaces alimentaires | 13 | 18 | 19 | 20 | 17 |
| Autres | 7 | 9 | 9 | 4 | 6 |

Message : **les clubs ont perdu 38 points ; GSS (+20) et Internet (+20) ont pris leur place ; la
librairie a reculé jusqu'en 2010 (−8) puis a tenu (plancher 22 %, 26 % en 2025)**. Deux temps : de
1993 à 2001, avant tout relevé d'Internet, les clubs perdent déjà 15 points et les GSS en gagnent 10.

Écart au cadrage : titre gardé, dernière année 2025 (clubs 2 % et non 1 %, librairie 26 % et non
27 %), et **rupture de série en 2012** (dictionnaire des variables, ressource `f342fe6b` : « source
Kantar, rupture à partir de 2012 » ; 2011 vide ; « autres » 9 → 4 % entre 2010 et 2012).

## La forme

1. KPI de la dernière année, libellés « en {an_max}, contre X % en {an_min} » (composants dans un
   `dsfr-data-repeat` pour interpoler les années).
2. Avant/après : barres horizontales groupées première / dernière année, triées par part finale,
   première année en gris, dernière en bleu.
3. Trajectoire : **petits multiples**, un graphique par lieu d'achat, mêmes axes (y 0-40), ligne de
   rupture 2012. Une seule courbe à six séries a été essayée puis abandonnée : elle traçait Internet
   à 0 % de 1993 à 2001 (valeur absente → 0 dans `dsfr-data-chart`).
4. Nuance librairie (texte + encadré sur la rupture), nuance occasion (courbe 2011-2025 : 13 → 21 %
   des volumes, 10 % en valeur, numérique 4 % en valeur).
5. Exploration : tableau de toutes les années, triable, export CSV.

## Honnêteté

- Internet absent avant 2002 : ni barre en 1993, ni courbe avant 2002, `null` (pas 0) dans le
  tableau accessible de l'avant/après.
- Rupture 2012 dessinée et dite ; l'encadré dit qu'un écart d'un ou deux points à cheval dessus ne
  vaut rien.
- Les parts publiées somment de 99 à 102 % (arrondi au point) : dit, non rééchelonné.
- Valeur ou volume non précisé par le dictionnaire pour les lieux d'achat : dit.
- Parts d'occasion / numérique (marché des particuliers hors scolaire) et parts de lieux d'achat
  (livre imprimé) : deux périmètres, dit sous le graphique.

## Phrase de lecture (calculée)

« Entre 1993 et 2025, les clubs et la vente par correspondance ont perdu 38 points de part de
marché. Les grandes surfaces culturelles en ont gagné 20, Internet 20 : 40 points à eux deux, pour
38 perdus par les clubs. »

## Ce qu'on ne montre pas

2011 ; la continuité exacte à travers 2012 ; la méthode Kantar (non décrite par le dictionnaire) ;
qui vend sur Internet ; les ~100 autres colonnes du fichier (dont plusieurs mal typées) ;
l'implantation des librairies (Base des librairies, non croisée).

## Angles écartés

- Carte des librairies LIR par département : autre question (implantation, pas trajectoire), autre jeu.
- Traductions / manga, concentration des ventes (`pdm_10000_meilleurs`) : colonnes à espaces de
  tête et sens non établi par le dictionnaire lu ; une autre page.
