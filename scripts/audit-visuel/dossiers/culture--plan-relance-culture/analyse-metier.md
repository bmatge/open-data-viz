# Analyse métier — culture / plan-relance-culture

Fiche 27 de `docs/portail-culture/proposition.md`. Niveau `dataviz-metier` : avancé (page), chaque bloc relu au niveau base.

## L'histoire

Le cadrage proposait « 328 projets, 17 décembre 2021 » : un compte, pas une histoire. La donnée dit autre chose :
**la concentration**. 503,4 M€ ventilés sur 328 lignes ; une seule, l'accélération du chantier du château de
Villers-Cotterêts (100 M€, Centre des monuments nationaux), en fait 19,9 % ; les dix premières 39 % ; les 18 lignes de
5 M€ ou plus 49 %. À l'autre bout, 167 lignes (51 %) reçoivent 500 000 € ou moins et se partagent 5,1 % du montant.
Le fonds de transition écologique : 108 lignes (33 %), 4,2 % de l'argent.

Titre-message : « Plan de relance culture : un seul chantier, le château de Villers-Cotterêts, pèse un cinquième des
montants ventilés ».

Angles écartés : la carte comme sujet (la géographie est celle des adresses d'établissements nationaux, pas d'un
besoin) ; le « nombre de projets » (16 lignes sont des enveloppes régionales) ; une densité par habitant (trompeuse
pour des opérateurs nationaux).

## Plan de page

1. Chapô calculé + 4 KPI (montant, plus grosse ligne, dix premières, part des lignes ≤ 500 k€).
2. Preuve : les dix plus gros montants, barres horizontales triées, Villers-Cotterêts en évidence.
3. Preuve : part des lignes vs part du montant par tranche (deux séries, gris/bleu) — le contraste en une image.
4. Nuance : même forme par enveloppe (CMN 5 % des lignes / 31 % du montant ; FTE 33 % / 4 %).
5. Nuance : régions ; les Hauts-de-France premiers à cause d'un château (83 % de la région ; 20,2 M€ sans lui).
6. Exploration : recherche, facettes (enveloppe, tranche, région), KPI de sélection, carte à cercles proportionnels, tableau.
7. Ce qu'on ne montre pas ; analyse.

## Honnêteté

- Parts calculées par `share_percent` (ratio de sommes), jamais de moyenne de taux.
- Même forme (part des lignes / part du montant) sur les tranches et les enveloppes : lecture transposable.
- Doublons de géocodage : 5 opérations répétées (8 lignes en trop, 12,1 M€, 2,4 %) comptées en page ; montants
  gardés tels que publiés, total présenté comme un plafond.
- 65 lignes sans coordonnées (46,9 M€) : hors carte, dans tout le reste, dit sous la carte.
- Photographie figée au 17/12/2021 : montants attribués, pas versés ; le fichier ne dit pas quel budget total il ventile.

## Phrase de lecture (bloc tranches)

« Les 167 lignes de 500 000 € ou moins, 51 % de la liste, se partagent 25,6 M€, 5,1 % du montant. À droite,
l'inverse : 18 lignes de 5 M€ ou plus portent 246 M€, 49 % du total. » — calculée (`dsfr-data-repeat` sur la synthèse).

## Ce qu'on ne montre pas

Compte de projets (16 enveloppes régionales), total dédoublonné, lignes sans coordonnées, adresses fausses (Tours →
Bayonne), versements, part du plan couverte, densité par habitant, colonnes « Enveloppe…_1 à _4 » (restes de tableur,
`#REF!`).
