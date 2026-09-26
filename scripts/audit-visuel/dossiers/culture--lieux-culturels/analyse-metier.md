# Lieux culturels (Basilic) : le patrimoine d'abord, la bibliothèque ensuite — analyse métier

Création (pas d'original). Page : `public/culture/lieux-culturels.html`, URL `/culture/lieux-culturels`.
Cadrage : fiche 11 de `docs/portail-culture/proposition.md`. Niveau dataviz-metier : avancé.

## Le jeu

« Base des lieux et équipements culturels (Basilic) », DEPS, ministère de la Culture. Ressource
Tabular `dced78ee-0823-4b61-86e6-57717308d4e4`, 86 366 lignes, 54 colonnes, fichier mis à jour le
2026-02-18 ; export Parquet 10,6 Mo. Une ligne = un lieu ou un équipement, toutes sources
agrégées (DGPA, DGCA, DGMIC, CNC, CNL, Artcena…). Population : « Dépenses culturelles des régions
2023 » (`4dfccc0d-…`, 17 lignes, Mayotte absente).

## L'histoire

Question : « Qu'est-ce que la base compte comme lieu culturel, et qu'en reste-t-il selon qu'on vit
en ville ou à la campagne ? » Lecteur : DEPS, élu, chercheur, journaliste.

Chiffres rejoués le 2026-09-27 sur l'export Parquet complet (pandas) puis relus identiques à
l'affichage (Playwright) :

| Mesure | Valeur |
|---|---|
| Lieux | 86 366 |
| Patrimoine (domaine) | 53 503 (61,9 %) |
| Type « Monument » / label « Monument historique » | 48 654 (56 %) / 46 656 (54 %) |
| Hors patrimoine | 32 863 : bibliothèques 15 702, librairies-presse 11 756, autres 5 405 |
| Part du patrimoine, grands centres urbains → rural très dispersé | 54,8 % → 77,9 % ; ceintures urbaines 49,3 % |
| Bibliothèques parmi les lieux hors patrimoine | 15,7 % (grands centres) → 93,2 % (rural très dispersé) |
| Librairies-presse / autres, rural très dispersé | 1,0 % / 0,5 % |
| Hors patrimoine pour 100 000 hab. (17 régions du fichier) | 48,2 ; BFC 64,1 ; IdF 38,4 ; HdF 36,6 ; 4 DROM 26,5 |
| Cinémas / écrans / fauteuils | 2 081 / 6 408 / 1 184 597 |
| Multiplexes | 254 (12 %), 44,9 % des écrans, 46,3 % des fauteuils |
| Lieux en QPV 2024 | 2 482 (2,9 %) ; hors patrimoine 1 395 (4,2 %) |
| Hors grille de densité | 84 (COM, étranger, TAAF) |
| Hors taux régional (hors patrimoine) | 85 (Mayotte 45, Nouvelle-Calédonie 28, autres COM, sans région) |

## Écart au cadrage

- Les chiffres du cadrage tiennent (86 366, 53 503, 15 702, 2 081). L'histoire se précise : le
  « patrimoine » est d'abord la liste des monuments historiques (46 656 lignes, une par protection),
  ce qui interdit toute densité de patrimoine par habitant. Le vrai contraste est ce qui reste : en
  ville, librairies, presse et équipements ; à la campagne, la bibliothèque.
- Le cadrage voulait des agrégats serveur : la ressource a un export Parquet, tout est client.
- Le cadrage voulait une carte départementale : écartée (fichier départemental sans Paris, Rhône
  compté avec la Métropole). Un taux régional la remplace, jointure **sur le code** (les libellés
  diffèrent : « Grand-Est » / « Grand Est », « Pays-de-la-Loire » / « Pays de la Loire »).
- `Demographie_AP` vaut « Actif » partout : le filtre prévu est sans objet.
- QPV : compté et dit, sans verdict — aucun fichier lu ne donne la population des QPV.

## La forme

1. Accroche : titre-message, chapô calculé, 4 KPI (total, part patrimoine, bibliothèques, taux hors
   patrimoine).
2. Preuve : barres horizontales triées par type, `neutral` + `highlight-index` sur « Monument ».
3. Contraste : barres empilées à 100 % par niveau de densité (patrimoine en gris, `color-map`) +
   barres « part des bibliothèques hors patrimoine », rural très dispersé en évidence.
4. Où : barres triées, lieux hors patrimoine pour 100 000 hab. par région (patrimoine exclu du taux,
   dit en page).
5. Nuance : un lieu n'a pas de taille (multiplexes : 12 % des cinémas, 45 % des écrans) ; QPV sans
   point de comparaison.
6. Exploration : facettes (famille, type, densité, région, département, label) + liste cherchable.
7. Ce qu'on ne montre pas ; analyse.

## Honnêteté

- Parts plutôt que volumes pour la grille de densité (pas de population par niveau).
- Patrimoine exclu du taux par habitant : un immeuble protégé n'est pas un équipement.
- Parts arrondies : la dernière est le reste (`100 - a - b - c`), l'axe tient à 100.
- Doublons possibles (avertissement du producteur) : dit, non traité.

## Phrase de lecture

« Hors patrimoine, 93 % des lieux culturels du rural très dispersé sont des bibliothèques, contre
16 % dans les grands centres urbains. »

## Ce qu'on ne montre pas

Offre réelle (horaires, fréquentation), densité de patrimoine, densité par niveau de grille, carte
départementale, carte de points (la Base des lieux culturels ouverts, fiche 12, s'en charge), 84
lieux hors grille, Mayotte et COM hors taux, doublons.
