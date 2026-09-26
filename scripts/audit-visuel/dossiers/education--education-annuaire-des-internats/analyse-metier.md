# Analyse metier — Annuaire des internats

> La lecture `dataviz-metier` : le sens avant la syntaxe.
> **Ce fichier n'est jamais ecrase par un script.** Les sorties du modele
> multimodal arrivent dans `constats/` ; ce qui est retenu se reecrit ici, a la main.

_Recréation du 2026-09-26 (niveau avancé : une page). Chiffres relevés à l'API ce jour-là._

## La question posee, et pour quel lecteur

Les internats publics sont-ils remplis ? Pour un lecteur de politique éducative (élu, rectorat,
presse) — puis, en exploration, pour une famille qui cherche un internat.

## L'histoire trouvée

- **Le jeu d'origine a disparu** : `fr-en-internats` renvoie 404 (records, exports, page d'actif).
  C'était la cause des 4 erreurs console de la recette (deux 404 réseau, l'erreur de chargement
  de la source, le délai de navigation) : la page était vide, en 0.33.0 comme en 0.42.0.
- Sur `fr-en-occupation-internats`, rentrée 2024-2025, après dédoublonnage (1 641 → 1 623
  lignes) : 221 062 lits, 173 961 occupés, **78,7 %**, **47 101 lits vides** (21,3 %).
- **Le paradoxe** : 353 internats remplis à 95 % ou plus, 335 à moins de 60 % — 42 % des
  internats sont aux deux extrémités.
- **La concentration** : collèges 62,9 %, EREA 60,7 % contre ~80 % pour les lycées (LG 85,9 %).
- **L'écart géographique** (académies ≥ 10 internats) : Paris 95,4 %, Créteil 67,6 %.
- **Renversement** : la page précédente racontait des volumes (4 661 internats, lits pré-bac
  2022) ; la question du remplissage n'y figurait pas.

## Angles écartés

Volumes par académie (taille des académies) ; camembert public / privé (ne dit rien du
remplissage) ; classement des internats les plus vides (causes inconnues du jeu) ; évolution
2020-2025 (millésimes antérieurs inexploitables, voir plus bas).

## La forme retenue, et pourquoi elle sert cette question

Chapô et KPI calculés → barres par tranche d'occupation (les deux bouts mis en avant) → barres
horizontales triées par type (collège et EREA mis en avant) → barres triées par académie →
exploration : recherche, facettes, carte colorée par remplissage (orange = moins de 60 %,
bleu France = plein, gris = non mesuré), liste.

## Honnetete de l'echelle

Axes à zéro. Tous les taux agrégés sont des ratios de sommes (lits occupés / lits disponibles),
jamais des moyennes de taux. Compteurs de l'exploration sur UAI uniques (28 UAI doublés dans
l'annuaire, dont 8 internats mesurés).

## Phrase de lecture

« En 2024-2025, les 1 623 internats publics du second degré dont l'occupation est publiée
offraient 221 062 lits ; 78,7 % étaient occupés, 47 101 restaient vides. 353 étaient remplis à
95 % ou plus, 335 occupés à moins de 60 %. » (calculée par `dsfr-data-repeat`)

## Ce qu'on ne montre pas, et qu'il faut dire

- Millésimes 2020-2021 à 2023-2024 : lits occupés > disponibles pour 1 339 internats sur 1 595
  en 2023-2024 (129 % au total). Comparé à `fr-en-lits-internats-publics-2d` (rentrée 2022),
  2022-2023 reproduit l'enquête **inversée** pour 709 internats, conforme pour 6.
- 2024-2025 : aucun internat > 100 %, 225 exactement à 100 % — plafonnement possible.
- 18 lignes en double exact (2 637 lits comptés deux fois).
- Périmètre : public du 2d degré EN seulement ; 1 615 des 2 778 lignes publiques de l'annuaire
  avec hébergement sont mesurées ; le privé (1 875 lignes) jamais.
- 27 internats sans académie ni type ; 11 sans lit déclaré ; 54 lignes de l'annuaire sans
  position (45 Polynésie, 7 Nouvelle-Calédonie, 1 Wallis, 1 Rennes).

## Ecarts avec l'original

Jeu remplacé (l'original est vide aussi) ; annuaire de l'éducation `hebergement = 1` : 4 620 UAI
(4 653 lignes) contre 4 661 ; les lits pré/post-bac 2022 de l'original ne sont plus affichés,
remplacés par l'occupation 2024-2025 ; ajout téléphone, site, fiche Onisep.
