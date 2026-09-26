# Analyse metier — Annuaire des centres agréés de contrôle technique

> La lecture `dataviz-metier` : le sens avant la syntaxe.
> **Ce fichier n'est jamais ecrase par un script.** Les sorties du modele
> multimodal arrivent dans `constats/` ; ce qui est retenu se reecrit ici, a la main.

## L'histoire trouvée (recréation du 2026-09-26)

L'original était un annuaire (carte + filtres), sans aucun chiffre. Exploration de l'export
complet (6 135 centres, 6 135 SIRET distincts) : les catégories de véhicules, en tableau, tracent
une **marche** — les cinq catégories de voitures sont déclarées par 5 953 à 6 105 centres, les
cinq catégories de deux-roues et quadricycles par 988 à 1 008. Un centre sur six (16,4 %) contrôle
les motos, et ce sont presque toujours des centres « voitures » (6 seulement sans voiture
particulière). Géographie nette : Pays de la Loire 29,0 %, Bretagne et Hauts-de-France 22 %,
contre PACA 10,8 %, Nouvelle-Aquitaine 11,6 %, Occitanie 12,0 % ; Martinique 0 sur 42.
21 départements ont au plus deux centres ouverts aux motos (5 aucun), dont l'Hérault
(2 sur 104), le Gard (2 sur 78), le Vaucluse (1 sur 60).

Angles écartés : « combien de centres par département » (volume, suit la population, n'apprend
rien) ; énergies (électrique 99 %, seul le gaz à 77 % — gardé en nuance) ; chaînes (Auto Bilan
France 185 centres : histoire de dénomination, pas de réseau fiable).

## La question posee, et pour quel lecteur

Où peut-on faire contrôler une moto, et le réseau des centres s'y est-il ouvert partout ?
Lecteur : grand public motard, élu local, presse.

## La forme retenue, et pourquoi elle sert cette question

1. Barres horizontales triées des 10 catégories, les 5 deux-roues en couleur (`highlight-index`),
   le reste neutre : la marche se lit sans légende.
2. Choroplèthe départementale de la **part** (taux, pas volume), palette `sequentialAscending`
   (foncé = mieux pourvu), + barres triées par région (≥ 20 centres).
3. Un **tableau** (dsfr-data-list) des départements à ≤ 2 centres motos : la question est « où »,
   la réponse une liste de noms.
4. Exploration conservée : recherche, facettes multi-valeurs, carte des points, fiches.

## Honnetete de l'echelle

Barres à zéro. Résumé « en France » de la carte pondéré par le nombre de centres
(`map-summary="weighted"`, `map-summary-field="part_brute"` non arrondi) : 16,43 = part nationale
du chapô. Régions < 20 centres (Mayotte, Guyane) hors classement, restées sur la carte.

## Phrase de lecture

« Sur les 6 135 centres agréés que recense la DGCCRF, 6 105 (99,5 %) contrôlent les voitures
particulières. Pour une moto, le choix se réduit à 1 008 centres : 16,4 %, à peu près un sur 6. »
— calculée au chargement (`dsfr-data-repeat`), comme toutes les phrases de la page.

## Ce qu'on ne montre pas, et qu'il faut dire

- L'offre, pas la demande : ni parc de motos, ni visites réalisées dans le jeu.
- Un compte n'est pas une distance (pas de temps de trajet).
- Ce que le centre déclare, pas ce qu'il contrôle effectivement.
- `cct_commune` corrompu (nom répété par couple véhicule × énergie) : on lit `cct_code_commune`.
- 3 294 centres sans site web, 678 sans téléphone (2026-09-26).
- Tableau équivalent de la carte limité à 100 lignes par la bibliothèque (le CSV a les 101).

## Ecarts avec l'original

L'original (404) n'avait aucun agrégat. La recréation ajoute le récit ; l'annuaire (recherche,
facettes, carte, fiches) est conservé tel quel en exploration.
