# Analyse metier — IPS Lycées

> La lecture `dataviz-metier` : le sens avant la syntaxe.
> **Ce fichier n'est jamais ecrase par un script.** Les sorties du modele
> multimodal arrivent dans `constats/` ; ce qui est retenu se reecrit ici, a la main.

_Recréation du 2026-09-26, niveau avancé (une page). Chiffres rejoués à l'API le jour même._

## L'histoire trouvée

**Au lycée, la frontière sociale passe d'abord entre les voies, et elle traverse les
établissements.** Rentrée 2024-2025, moyennes de lycées : voie générale et technologique
**117,0**, voie professionnelle **92,2** — **24,8 points**, plus que l'écart public / privé
(17,9 en voie générale, 17,6 en voie pro). Dans les **965 lycées** qui portent les deux voies,
l'écart interne reste de **17,7 points**, et la voie générale est la plus favorisée dans
**948** d'entre eux (98,2 %). Stable dans le temps (19,7 → 19,8 avec l'ancienne méthode,
17,5 → 17,7 avec la nouvelle), présent dans les 30 académies (de 9,3 à Mayotte à 22,0 à Lyon).

**Elle renverse la page précédente**, qui affirmait « deux échelles qui ne se comparent pas »
et refusait de colorer la carte par l'IPS. La DEPP (description de `fr-en-ips-lycees-ap2023`)
définit l'IPS d'un établissement comme la moyenne des IPS de ses élèves ; l'IPS d'une voie est
la même moyenne sur les élèves de la voie, avec la même table de passage. Même indice : l'écart
est le sujet, pas un obstacle.

**Nuance de composition** : pourquoi 24,8 au national et 17,7 dans un même lycée ? Les lycées à
voie générale seule recrutent plus haut (121,3) que la voie générale des polyvalents (110,3) ;
la voie professionnelle est au même niveau partout (91,9 seule, 92,6 en polyvalent).

**Angles écartés** : l'écart public / privé dans le temps (faussé par le saut de 2023 dans le
privé, voir plus bas) ; le palmarès des lycées ; la voie post-bac (absente du jeu).

## La question posee, et pour quel lecteur

« Les élèves de la voie professionnelle et de la voie générale viennent-ils des mêmes milieux,
y compris dans un même lycée ? » — pour un lecteur grand public, élu ou journaliste ; puis
« où est mon lycée ? » pour l'usager, en section d'exploration.

## La forme retenue, et pourquoi elle sert cette question

1. Chapô + trois KPI calculés (écart des voies, écart interne, part des polyvalents où GT > PRO).
2. Barres groupées voie × secteur (`dsfr-data-unpivot` + `series-field`) : les deux barres GT
   dépassent les deux barres PRO — la voie domine le secteur, d'un regard.
3. Histogramme de l'écart interne des 965 polyvalents (classes de 5 points) : presque tout à
   droite de zéro. Suivi de la phrase de composition (texte, qui bat le graphique ici).
4. Barres par rentrée avec ligne de rupture 2022 : la stabilité.
5. Barres horizontales triées par académie : la généralité.
6. Localisateur : une ligne par (lycée, voie), facette « Voie » à défaut GT, une seule échelle
   de couleur pour les deux voies.

## Honnetete de l'echelle

Axes à zéro partout. Moyennes **de lycées** (le jeu ne porte pas les effectifs), dit en chapô ;
références DEPP pondérées par les élèves données à part (par type de lycée, pas par voie), jamais
sur le même axe. Écarts calculés avant arrondi. Rupture 2022 dessinée ; pas d'évolution lue à
travers elle. Seuil DEPP de 3 points rappelé.

## Phrase de lecture

« À la rentrée 2024-2025, l'IPS moyen de la voie générale et technologique des lycées est de
117,0, celui de la voie professionnelle de 92,2 : 24,8 points d'écart. Dans les 965 lycées qui
proposent les deux voies, l'écart entre leurs propres élèves reste de 17,7 points. » (calculée,
`dsfr-data-repeat` sur la jointure des deux séries serveur).

## Ce qu'on ne montre pas, et qu'il faut dire

- 41 lignes sans IPS dans aucune voie (36 privé) : hors moyennes et hors carte.
- 35 lignes sans commune, académie ni position : dans les moyennes nationales, pas dans les
  académies ni sur la carte (6 lignes sans position en voie GT, signalées en console).
- « Polyvalent » = porte un IPS dans les deux voies, pas la catégorie administrative LPO.
- Saut du privé en 2023 (seconde PCS remontée : 15 % → 75 %, DEPP) : +3,4 points à lycées
  constants en voie GT privée contre +0,5 en public, 2022-2023 → 2023-2024.
- `ips_ensemble_gt_pro` vide depuis 2023-2024 ici, mais publié sous `ips_etab` dans
  `fr-en-ips-lycees-ap2023`.

## Ecarts avec l'original

- Rentrée 2024-2025 (dernière du jeu) au lieu de 2023-2024 figée.
- L'IPS est enfin représenté sur la carte, une voie à la fois, sur une échelle commune.
- Neuf rentrées exploitées (série), là où l'original n'en lisait qu'une.
