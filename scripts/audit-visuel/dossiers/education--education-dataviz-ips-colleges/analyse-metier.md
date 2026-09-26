# Analyse metier — IPS Collèges

> La lecture `dataviz-metier` : le sens avant la syntaxe.
> **Ce fichier n'est jamais ecrase par un script.** Les sorties du modele
> multimodal arrivent dans `constats/` ; ce qui est retenu se reecrit ici, a la main.

## L'histoire trouvée (recréation du 2026-09-26, niveau avancé)

Le jeu `donnees-ips-colleges` porte **neuf rentrées** (2016-2017 à 2024-2025) ; l'original et la
reproduction précédente en figeaient une. Exploré à l'API le 2026-09-26 :

- **Le changement** — l'écart entre l'IPS moyen des collèges privés sous contrat et celui des
  publics augmente à chaque rentrée : 13,1 → 13,3 → 13,9 → 14,1 → 14,3 → 14,3 (ancienne méthode,
  2016-2021), puis 17,0 → 19,3 → 20,0 (nouvelle méthode, 2022-2024). 2024-2025 : privé 120,3,
  public 100,2.
- **La rupture** — la DEPP a changé sa table de passage PCS → IPS à la rentrée 2022 et exclut
  depuis les élèves dont les deux PCS sont inconnues (description de `fr-en-ips-colleges-ap2022`).
  Le « +7 points en neuf ans » serait faux : on ne compare qu'à l'intérieur de chaque méthode.
- **Pas un effet de composition** — mêmes collèges, même secteur, 2022-2023 → 2024-2025 :
  privé **+3,07** (1 652 collèges), public **+0,12** (5 302). Le privé monte, le public stagne.
- **Confirmé à l'échelle des élèves** — références DEPP (`fr-en-ips-colleges-ap2023`) :
  23,2 (2023-2024), 24,2 (2024-2025), 24,7 (2025-2026).
- **La concentration** — 23,8 % des collèges sont privés (1 661 / 6 987) ; 67,3 % de ceux à
  IPS ≥ 125 (586 / 871) ; 1,9 % de ceux sous 90 (24 / 1 256, donc 98,1 % publics). Par classes
  de dix points, la part du privé croît sans exception : 1,3 → 2,3 → 6,4 → 19,9 → 34,2 → 53,2 →
  66,7 → 81,4 %.
- **La nuance** — l'écart par académie va de 7,6 (Besançon) à 37,7 (Guyane, 6 collèges privés).
  Île-de-France en haut (Versailles 32,2, Créteil 30,5, Paris 29,1). Corrélation part du privé /
  écart : −0,47 (29 académies), −0,33 en métropole : tendance, pas règle — d'où la formulation
  prudente et l'exception parisienne dite en page.

Message principal : « le fossé social entre collèges publics et privés se creuse, et c'est le
privé qui bouge ». X parce que Y donc Z : l'écart grandit parce que le recrutement social du
privé monte à collèges constants, donc la question est celle du privé, pas du public.

## La question posee, et pour quel lecteur

Grand public, presse, élus : « Les collèges publics et privés accueillent-ils les mêmes
élèves, et est-ce que ça change ? » Le parent qui cherche *son* collège reste servi, en
section 4 (martini glass : récit guidé, puis localisateur).

## La forme retenue, et pourquoi elle sert cette question

1. Accroche : trois KPI de poids différents (écart, part du privé chez les plus favorisés,
   part du public chez les plus défavorisés).
2. Preuve : barres de l'écart par rentrée, `y-min="0"`, ligne verticale à la rupture de 2022.
   L'écart (et non deux courbes public/privé) parce que c'est lui le message, et que l'IPS n'a
   pas de zéro naturel : deux courbes sur un axe à 0 écraseraient tout, sur un axe tronqué
   exagéreraient.
3. Deux encadrés texte : à collèges constants, et pondéré par les élèves (une phrase bat un
   graphique pour deux chiffres).
4. Concentration : barres de la part du privé par classe de dix points, ligne de référence
   à la part d'ensemble.
5. Nuance : barres horizontales triées de l'écart par académie ; le tableau donne l'effectif.
6. Exploration : recherche, facettes, carte des collèges colorée par tranche, tableau.
7. Conclusion (`fr-callout`) et notes (hypothèses, angles écartés).

## Honnetete de l'echelle

- Moyennes **de collèges** (le jeu n'a pas d'effectifs) — dit au chapô, en note, et mis en regard
  de la référence DEPP par élèves, sans jamais les mettre sur le même axe.
- Écart calculé avant tout arrondi (`round` en aval uniquement, PG-031).
- Parts : ratio de comptes, dénominateur explicite (le secteur est renseigné sur 6 987 / 6 987).
- Axes à zéro ; part du privé bornée 0-100.
- La ligne de référence à 23,8 % est un littéral daté (reference-lines n'accepte pas
  d'expression) ; le KPI d'accroche le recalcule depuis la donnée.

## Phrase de lecture

« À la rentrée 2024-2025, l'IPS moyen des collèges privés sous contrat est de 120,3, celui des
publics de 100,2 : 20,0 points d'écart. À méthode constante, l'écart est passé de 17,0 à 20,0
en deux rentrées ; il avait gagné 1,1 point en cinq ans avec l'ancienne méthode. » — calculée en
page par `dsfr-data-repeat` sur la série pivotée.

## Ce qu'on ne montre pas, et qu'il faut dire

- La rupture de série de 2022 (note 2 et ligne verticale).
- 6 collèges 2024-2025 sans nom, commune, académie ni position : dans la série et l'accroche,
  hors académies et carte. 1 collège sans IPS : hors moyennes, nommé sur la carte.
- Mayotte : aucun collège privé sous contrat, donc pas d'écart.
- Outre-mer : écarts sur 6 à 9 collèges privés.
- La cause : ni frais, ni sélection, ni choix des familles ne sont dans le jeu (conclusion).
- 2025-2026 existe dans le jeu public, pas dans le jeu géolocalisé.

## Ecarts avec l'original

- Millésime : 2024-2025 au lieu de 2023-2024 figé ; les neuf rentrées exploitées.
- Capacité : l'IPS est représenté (couleur), le secteur est filtrable, 3 791 communes au lieu
  de 100, URL partageable, tableau accessible.
- Tout ce qui précède la section 4 n'existe pas dans l'original.
