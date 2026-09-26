# Réseaux de chaleur — analyse métier (création, 2026-09-27)

Page : `public/developpement-durable/reseaux-chaleur.html` (`/developpement-durable/reseaux-chaleur`).
Jeu : DiDo n° 18, « Données locales de consommation de chaleur et de froid — commune (à partir
de 2018) », un fichier par année (7 fichiers, 2018 → 2024), une ligne par réseau.

## L'histoire

Titre-message : **« Les réseaux de chaleur : un tiers encore au gaz, et Paris en brûle plus d'un quart »**.

- 2024, chaleur seule : 961 réseaux, 33,1 TWh ; gaz 10,6 TWh = **32,0 %** ; fossiles 33,1 % ;
  chaleur récupérée 34,6 % (incinération des déchets 29,9 %) ; renouvelables 32,3 % (biomasse 23,8 %).
- **Concentration** (l'angle trouvé en rejouant) : le réseau « Paris et communes limitrophes »
  produit 6,0 TWh, 18,2 % de toute la chaleur, dont 48 % au gaz → **27,0 % de tout le gaz des
  réseaux**. Sans lui, la part du gaz tombe à 28,6 %. Les 162 réseaux majoritairement au gaz ne font
  que 10,3 % de la chaleur (26,1 % du gaz) ; 334 réseaux n'en brûlent pas.
- **Évolution** : part du gaz 36,3 % (2018) → 29,7 % (2022, point bas) → 32,0 % (2024) ; charbon +
  fioul + GPL 1,51 → 0,34 TWh. La croissance (779 → 961 réseaux) vient de la chaleur récupérée
  (10,1 → 11,4 TWh) et des renouvelables (8,6 → 10,7 TWh).

Écart au cadrage : « 33,5 TWh, gaz 31,6 % » comptait le froid (31 réseaux) avec la chaleur. Le titre
tient ; il gagne la concentration parisienne.

## Plan et formes

1. Chapô + 4 KPI (production, part du gaz, part renouvelable ou récupérée, CO₂ pondéré 89 g/kWh).
2. Preuve : barres horizontales triées par filière, gaz mis en évidence (`highlight-index="[0]"` —
   dépend du rang, gaz 10,6 contre déchets 9,9 TWh).
3. Concentration : barres empilées gaz / autres pour les dix plus gros réseaux (`color-map`) ;
   phrase sur les petits réseaux au gaz.
4. Évolution : barres empilées par famille, 7 années (`dsfr-data-concat`).
5. Exploration : tableau des 961 réseaux, recherche, tri, CSV.
6. Ce qu'on ne montre pas, puis `#analyse`.

## Honnêteté

- Moyenne de CO₂ **pondérée par la production** (somme de CO₂ × production / somme de production),
  jamais la moyenne des taux par réseau.
- Parts par réseau **nulles** (et non 0) quand la production est nulle (9 réseaux).
- Production non corrigée du climat (2021 froide), dit sous le graphique.
- Classement des filières en familles : décision éditoriale écrite sous le graphique (UIOM rangée
  entière en « récupérée », alors que la statistique publique en compte la moitié en renouvelable).
- `secret` : 136 réseaux de chaleur sur 961 ont CONSOTOT/PDL à « secret » en 2024 ; la page ne somme
  que la production (jamais sous secret) et le dit, avec le compte lu dans la donnée.

## Phrases de lecture (calculées)

Toutes les phrases chiffrées sont des `dsfr-data-repeat` sur des lignes agrégées ; le premier réseau
et l'année du point bas sont lus dans la donnée (tri + `limit="1"`), pas écrits.

## Ce qu'on ne montre pas

Consommation (secret), froid, puissance installée (colonne corrompue en 2022), CO₂ dans le temps
(manquant pour ~1 réseau sur 5 en 2018-2019), carte (angle écarté : moyenne départementale sans
sens pour des réseaux locaux), chaleur hors réseaux.

## Angles écartés

- Carte départementale de la part du gaz : mélange Paris et des chaufferies ; pas de question
  d'usager derrière. (Techniquement il faudrait aussi dériver le département du code commune :
  `compute` n'a pas de fonction de sous-chaîne.)
- Pertes réseau (production − livraisons) : livraisons sous secret pour 14 % des réseaux.
