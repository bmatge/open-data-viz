# Analyse métier — demo / vacance-logements

Création du 2026-09-27 (démonstration n° 5, candidat B de `docs/demonstrations/propositions-4-5.md`),
niveau `dataviz-metier` avancé. Page : `public/demo/vacance-logements.html` (`/demo/vacance-logements`).

## Les jeux

| Jeu | Producteur | Accès | Lignes | Clé | Unicité (export complet) |
|---|---|---|---|---|---|
| LOVAC communes, ressource `2e0417b4…` | Cerema / DGALN | Tabular, export Parquet | 34 912 | `CODGEO_26` | 34 912 distincts |
| Carte des loyers 2025, appartements, `55b34088…` | ANIL / DHUP | Tabular, export Parquet | 34 900 | `INSEE_C` | 34 900 |
| Zonage ABC au 26 juin 2026, `13f7282b…` | DHUP | Tabular, export Parquet | 34 875 | `CODGEO` | 34 875 |
| `insee-2020-geoapi-2023` | INSEE via equipements.sports.gouv.fr | ODS, `fetch-mode="export"` | 35 075 | `code_geographique` | 35 075 |

Jointures inner en chaîne : 34 912 → 34 894 (18 sans loyer : 17 Mayotte + Saint-Martin 97127) →
34 894 (0 sans zonage **après** rattachement des arrondissements PLM) → 34 884 (10 absentes du
référentiel 2023).

## L'histoire

Là où la vacance longue ET le parc privé sont publiés (12 430 communes, 36 %, mais 86 % du parc
privé France), 955 673 logements sont vides depuis plus de deux ans pour 28 549 632 : 3,35 %, un sur
trente. Zone C 5,38 % (un sur 19) contre 2,08 % en A + A bis (un sur 48) : × 2,6. Loyer d'annonce
sous 9 €/m² : 7,48 % ; 16 € et plus : 2,21 %. Densité : 8,14 % en rural très dispersé, 2,35 % dans
les grands centres. Départements : Creuse 10,1 % en tête, Yvelines 1,6 % en queue. Exception : les
grandes villes des Antilles et de Guyane (Cayenne 11,5 %, zone B1, 16,6 €/m²) contredisent la pente.

## Écarts avec la proposition (tous recalculés en DuckDB sur les exports complets)

1. **Le parc aussi est secrétisé** (18 321 communes), et pas dans les mêmes communes que la vacance
   (4 692 vacance publiée / parc secret ; 4 138 l'inverse). Le « 1 052 304 / 29 650 998 = 3,55 % »
   de la proposition rapportait deux populations différentes ; ratio honnête (les deux publiés) :
   **3,35 %**. La proposition disait le secret « insensible » ; il ne l'est pas : la part cachée
   (total France producteur − communes lisibles) est vacante à **4,8 %**. Le biais sous-estime la
   vacance des territoires peu denses, donc va dans le sens de la conclusion.
2. **« 51 % des communes secrétisées pour 3,6 % du parc » est faux** : les communes non lisibles
   portent 14 % du parc privé (base : total France du producteur, 33 194 351).
3. **Paris, Lyon, Marseille** : LOVAC/loyers/INSEE par arrondissement, zonage par commune → 45
   lignes, 1,79 M logements perdus par la jointure. Rattachés : A bis 2,21 % (proposition 2,12),
   A 2,03 % (1,94) ; loyer ≥ 16 € 2,21 % (2,16). Les zones B1, B2, C et les tranches basses sont
   inchangées.
4. **Libellés LOVAC corrompus** (Latin-1 décodé en cp1250 par l'analyse data.gouv) : noms pris au
   référentiel INSEE — ce qui justifie la quatrième source.
5. **Décalage d'un an** : vacants au 01/01/2025, parc au 01/01/2024 (schéma du producteur).
6. Moyenne des taux communaux : 4,77 % sur 12 426 communes (4 ont un parc nul), proposition 4,78 %.
7. « Première page à lire un export Parquet Tabular » : faux, `culture/bibliotheques` (vague 1) le
   fait déjà. La démo est la première à en lire **trois** et à les joindre.

## Les formes

- Ch. 1 : **tableau** des sept millésimes (pas de courbe), phrase calculée −36 % / +34 %.
- Ch. 2 : quatre KPI (volume, ratio de sommes, communes lisibles, part lisible) + encadré du biais.
- Ch. 3 : exergue × 2,6 calculé, **trois petits multiples** même axe (0-10 %), `neutral` +
  `highlight-index` sur la dernière barre, sens de lecture commun (marché qui se détend vers la droite).
- Ch. 4 : choroplèthe de taux, résumé pondéré par le parc (`map-summary-field` sur le brut) =
  3,35 % ; tableau des 10 villes > 10 000 logements (l'exception ultramarine).
- Ch. 5 : recherche + facettes + KPI de sélection en ratio de sommes + tableau paginé.

## Phrase de lecture

« En zone C, 5,4 % du parc privé est vide depuis plus de deux ans — un logement sur 19. En zones A
et A bis, 2,1 %, un sur 48. Sous 9 €/m² de loyer d'annonce, 7,5 % ; à 16 € et plus, 2,2 %. » —
`dsfr-data-repeat` sur la ligne de synthèse.

## Ce qu'on ne montre pas (dit en page)

Évolution (rupture de série) ; parc social ; 28 communes non appariées ; densité de
Conques-en-Rouergue ; causalité du zonage ; loyer « maille » (84 % des communes lisibles < 9 €) ;
disponibilité réelle des logements ; Mayotte (encart peint en bleu par DSFR Chart, AM-104).

## Angles écartés

- Évolution 2020-2026 : interdite par la note de version.
- Vacance totale : frictionnelle, et c'est elle que la seconde rupture déforme le plus.
- Corrélation départementale vacance × loyer (−0,53 dans l'exploration) : un coefficient n'est pas
  une forme de lecture ; les tranches disent la même chose.
- Carte communale : 51 % des communes secrétisées la trouent, et le trou est rural.
