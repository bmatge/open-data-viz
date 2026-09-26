# Analyse métier — culture / moulins-1809

Niveau `dataviz-metier` : avancé (page complète), chaque bloc relu au niveau base.

## L'histoire

En 1809, l'enquête impériale sur les moulins à farine compte 12 082 moulins dans les communes
aujourd'hui françaises : 81 % à eau, 19 % à vent. Le vent est un fait régional : le Nord porte à lui
seul 36 % des moulins à vent (831), Paris n'a que des moulins à vent (53, Montmartre, Belleville,
La Chapelle, Passy, Vaugirard), et seuls 3 des 30 départements à 30 moulins ou plus ont plus de
vent que d'eau. Mais la France de 1809 est en pointillés : 33 départements d'aujourd'hui.

**Écart au cadrage.** « 4 258 notices moulin à vent » additionnait les trois enquêtes (1 415 + 1 435
+ 1 408) ; « la France de 1809 » n'en couvre qu'un tiers. La description du jeu (« près de 9 000
moulins » en 1809) compte des notices : 8 999 notices, 12 766 moulins.

## Angles retenus / écartés

- Retenu : eau contre vent en 1809 (accroche), la géographie du vent (preuve), l'hétérogénéité des
  trois enquêtes (nuance), le vent de l'an II sur 78 départements (nuance qui élargit la carte).
- Écarté : une évolution 1794 → 1809 (la Manche passe de 6 à 1 218 moulins : c'est la réponse à
  l'enquête qui change, pas le parc) ; une carte choroplèthe départementale (le jeu n'a que des noms
  de département, et DSFR Chart peint les départements absents d'une couleur hors échelle — ici les
  deux tiers de la carte) ; les meuniers de 1801 (autre jeu, autre maille).

## La forme

- Barres horizontales triées de la part du vent, grisées sauf les trois départements où le vent est
  majoritaire ; seuil de 30 moulins, dit sous le graphique (trois départements à 1, 2, 10 moulins).
- Barres empilées eau/vent par enquête, libellé = enquête + nombre de départements couverts : la
  hauteur se lit comme une couverture, pas comme une évolution.
- An II : douze premières barres de la part du vent (≥ 100 moulins).
- Carte de points (une notice = un cercle, rayon = nombre de moulins, bleu eau / orange vent), une
  enquête à la fois (`default="enquete:1809"`) : les vides de la carte montrent la couverture.

## Honnêteté

- Parts = ratio de sommes (vent / total), jamais une moyenne de parts départementales.
- On compte des moulins (`Nombre de moulins`), pas des notices ; dit en page.
- Les trois enquêtes ne s'additionnent jamais ; l'exploration n'en montre qu'une.
- « Seine » recodé Paris (codes INSEE 751xx, communes annexées en 1860) ; dit en page.
- Hors frontières actuelles (533 notices, 684 moulins en 1809) exclus des chiffres, gardés dans
  l'exploration.

## Phrase de lecture

« Sur les 30 départements où l'enquête de 1809 compte au moins 30 moulins, 3 seulement ont plus de
moulins à vent que de moulins à eau. » Tous les nombres sont calculés dans la page
(`dsfr-data-repeat`).

## Ce qu'on ne montre pas

Une France complète ; une évolution ; des notices au lieu de moulins ; l'Empire hors frontières ;
36 notices françaises de 1809 sans coordonnées ; les moulins à marée / bateaux / à foulon (< 20) ;
la production de farine (dans les dossiers, pas dans le fichier).
