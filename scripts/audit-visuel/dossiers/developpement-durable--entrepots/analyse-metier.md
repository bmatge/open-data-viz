# Entrepôts et plateformes logistiques — analyse métier

Création (vague 3), 2026-09-27. Jeu SDES 32 `675c0ad59718fa4d74fc907c`, millésime 2025-11
(années 2023 et 2024), cinq fichiers DiDo, quatre utilisés (régions, départements, EPCI, aires).

## L'histoire

Une concentration. En 2024, 3 877 entrepôts de 10 000 m² ou plus totalisent 92,8 M m² en
métropole. L'Île-de-France (17,1) et les Hauts-de-France (17,2) en font **37 %** (34,3 M m²)
**sur 8 % du territoire** ; avec Auvergne-Rhône-Alpes, 49 %. Le cadrage disait « 40 % » : la
donnée dit 37 %, le titre dit « plus d'un tiers ».

Trois échelles, un même message :
1. **Région** (valeurs publiées) — le chiffre ;
2. **Densité** — IdF 1 419 m²/km², 8,3 fois la moyenne métropolitaine (172, pondérée par la
   superficie déduite de surface ÷ densité) ; HdF 3,1 fois ; aucune autre au double ;
3. **Département** (tranches) — la Seine-et-Marne seule (≥ 6,5 M m²) dépasse 7 régions ;
   avec le Nord (≥ 5,8), au moins 13 % du total.
Nuance : les exploitants diffèrent (commerce de gros 46 % en Bretagne ; industrie 33 % en
Bourgogne-Franche-Comté ; entreposage-transport 45 % en PACA) — parts en **nombre**, pas en surface.

Angles écartés : la croissance (deux années seulement, +2,4 % — dit en « ce qu'on ne montre pas »,
pas de courbe) ; une carte des aires logistiques (contours en GeoPackage UTM, non lisible).

## Formes

- Barres horizontales triées, deux régions en évidence (`highlight-index="[0, 1]"`).
- Densité en barres triées, IdF en évidence ; la moyenne dans la phrase de lecture (une
  `reference-lines` aurait exigé une valeur écrite en dur).
- Barres empilées à 100 % (4 groupes au lieu de 6 catégories), triées par part du commerce de gros.
- Douze départements en barres : **borne basse** de la tranche, dit en titre et en note.
- Carte départementale (borne basse) ; listes des aires, départements, EPCI avec tranches textuelles.

## Honnêteté

- Tranches → borne basse par `floor(replace(...))` ; somme des départements publiés donnée en
  fourchette (88,2 – 96,4 M m²), qui encadre la somme régionale (92,8).
- Secret compté et affiché : 8 départements / 96, 354 EPCI / 1 233 (602 sans entrepôt).
- Moyenne de densité pondérée, jamais moyenne des 13 densités.
- Total métropolitain = somme d'arrondis au dixième, dit.

## Phrase de lecture

Calculée à chaque bloc (`dsfr-data-repeat`) ; année lue dans la donnée (max de `ANNEE` joint
sur clé constante), aucun millésime écrit.

## Ce qu'on ne montre pas

Tendance (2 ans), entrepôts < 10 000 m², valeurs exactes sous la région, outre-mer, flux et
emplois, contours des aires.
