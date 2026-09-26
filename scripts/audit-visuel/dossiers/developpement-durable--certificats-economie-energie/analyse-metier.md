# Où l'on rénove : les CEE par habitant — analyse métier

Création (vague 3, 2026-09-27), deuxième vague § 5 de `docs/portail-developpement-durable/proposition.md`.
Page : `public/developpement-durable/certificats-economie-energie.html`.

## L'histoire

**Rénovation aidée : cinq fois plus par habitant dans la Meuse qu'à Paris, un écart fait surtout des
primes aux ménages modestes.** De 2015 à 2022, les CEE ont financé dans les logements 2 176 TWh cumac
(7,4 M de dossiers), 32,1 MWh cumac par habitant. Meuse 77,1 ; Paris 14,9 (×5,2) ; Corse-du-Sud 6,7
(plus bas de métropole). Les dix départements métropolitains les plus hauts reçoivent 3,8 fois plus que
les dix plus bas ; l'écart est de 2,2 fois sur les CEE classiques et de **6,3 fois sur les CEE précarité**.
Nuances : un pic 2019-2021 (502 TWhc en 2021, ×6 depuis 2015), puis −58 % en 2022 (précarité −75 %) ;
l'isolation porte 58 % des économies, les combles seuls 27 %.

## Écarts au cadrage

- **« 75 % de lignes sous secret » : non reproduit.** Fichier par année d'engagement : 3 852 lignes sur
  20 352 (18,9 %), toujours les trois colonnes à la fois, et seulement des lignes de moins de 3 dossiers.
  Borne de ce qui est caché (résidentiel) : 2 215 lignes × 2 = 4 430 dossiers sur 7 352 726 (0,06 %).
  Estimation en kWh (2 dossiers × kWhc moyen par dossier de la fiche) : ≈ 12 TWhc, 0,5 %.
- **Maille retenue : le département.** Le fichier EPCI (141 450 lignes, 26 Mo en 7 colonnes) a 29,1 % de
  lignes secrètes et une somme nationale inférieure de 59 TWhc (2,6 %) à celle des départements. C'est
  lui qui ne tient pas.
- **Deux colonnes d'économies disjointes** : `ECO_NRJ_KWHCUMAC` (classique) et
  `ECO_NRJ_PRECARITE_KWHCUMAC` (précarité) s'additionnent. Les chiffres du cadrage (172 / 246 / 155 TWhc
  en 2019 / 2021 / 2022) sont la seule colonne classique, tous secteurs. Total tous secteurs : 464 / 519
  / 222 TWhc ; résidentiel : 448 / 502 / 210.
- **Jointure population** : pas l'énergie (COG annuel) mais l'ITDD départemental (`VARIABLE=pop`,
  `NO_INDIC=i017`, 101 lignes, clé unique), A2022 seule renseignée ; Mayotte sans population.

## La forme

- Carte départementale (`type="map"`) en MWhc/hab, résumé **pondéré par la population**
  (`map-summary="weighted"`, `map-summary-field` sur la valeur non arrondie) = ratio national 32,12.
- Barres horizontales empilées précarité / classique, 10 plus hauts + 10 plus bas de métropole
  (`concat`) : c'est la forme qui montre que l'écart est fait de précarité.
- Barres empilées par année (le pic, la chute), barres triées des huit premières fiches (combles en
  évidence, reste en `neutral`).
- Tableau exportable par département (MWhc/hab, dont précarité, dossiers pour 1 000 hab., part
  précarité, total, lignes sous secret).

## L'honnêteté

- Ratios de groupe = somme / somme, jamais moyenne de ratios.
- kWh cumac = forfait conventionnel cumulé actualisé, pas une économie mesurée : dit en chapeau et en
  « ce qu'on ne montre pas ».
- Causes (maisons, climat, revenus) non présentes dans le jeu : formulées comme pistes, pas comme mesures.
- Population 2022 pour un cumul 2015-2022 : approximation dite.
- Référence externe : fin du volet isolation du « Coup de pouce » mi-2021 (contexte public, pas dans la
  donnée).

## Phrase de lecture (exemple)

« Les dix départements métropolitains qui rénovent le plus par habitant reçoivent 3,8 fois plus
d'économies CEE que les dix qui rénovent le moins. Côté CEE classiques, l'écart n'est que de 2,2 fois ;
côté CEE précarité, il est de 6,3 fois. »

## Ce qu'on ne montre pas

Économies réelles ; rénovation hors CEE ; causes ; maille EPCI ; années après 2022 ; variation de
population ; tertiaire (4 % des économies) ; secret (compté et borné en page) ; Mayotte et codes hors
département (NA, 975, 977, 988 : 0,05 TWhc).
