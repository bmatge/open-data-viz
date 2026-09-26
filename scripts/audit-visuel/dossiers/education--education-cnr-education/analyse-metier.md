# Analyse metier — Cartographie Conseil National de la Refondation - CNR Education

> La lecture `dataviz-metier` : le sens avant la syntaxe.
> **Ce fichier n'est jamais ecrase par un script.** Les sorties du modele
> multimodal arrivent dans `constats/` ; ce qui est retenu se reecrit ici, a la main.

_Recréation du 2026-09-26 (niveau avancé : une page)._

## L'histoire trouvée

Compter les projets, c'est compter les écoles de France : les écoles portent 61 % des 5 695
projets distincts parce qu'elles sont 42 150 sur 52 368 établissements publics. **Rapporté au
parc ouvert** (annuaire de l'éducation, apparié par UAI), le récit se renverse :
19,3 % des collèges publics, 17,3 % des lycées publics et 24,7 % des EREA ont porté au moins
un projet, contre **7,5 % des écoles publiques** (2,6 fois moins que les collèges) et
**2,5 % des établissements privés**. L'engagement varie de 37,8 % (Martinique) à 5,1 % (Reims),
7,4 fois ; Créteil, première en volume (514 projets), n'est que neuvième en taux (14,6 %).
70,2 % des projets datés ont démarré en 2022-2023, 22,5 % en 2023-2024, 49 projets en 2024-2025.

Chiffres rejoués le 2026-09-26 : export complet du jeu CNR + export de l'annuaire filtré,
recalcul Python indépendant (52 368 / 5 089 / 19,3 / 7,5 / 2,5 / 37,8 / 5,1 / 63 hors parc),
identiques à la page.

**Ce qui renverse la page précédente** : elle affichait « les écoles portent près de 61 % des
projets » comme message ; c'est une composition du parc, pas un engagement.

## La question posée, et pour quel lecteur

« Qui s'est saisi du CNR Éducation, et où ? » — pour un lecteur de politique publique
(élu, rectorat, presse), qui veut un taux et non un volume.

## La forme retenue, et pourquoi elle sert cette question

1. Barres horizontales groupées, type × secteur, triées sur le public : le contraste
   public (bleu) / privé (gris) et collèges / écoles d'un coup d'œil.
2. Barres horizontales triées des académies, en taux : le classement en volume est écarté
   (il mesure la taille des académies) ; la phrase de lecture l'oppose au taux.
3. Barres verticales par année scolaire de démarrage (septembre-août) : la concentration
   sur la première année.
4. Les douze thèmes (explode), « Non mentionné » gardé en tête.
Puis exploration (recherche, facettes, carte, liste) et notes.

## Honnetete de l'echelle

Axes à zéro. Les taux sont des **ratios de comptes** (engagés / ouverts), jamais des moyennes
de taux. Académies sous 50 établissements publics écartées du classement
(Saint-Pierre-et-Miquelon, 7). Annuaire dédoublonné par UAI avant jointure (63 UAI en double).

## Phrase de lecture

« Sur les 52 368 écoles, collèges, lycées et EREA publics ouverts, 5 089 (9,7 %) ont porté au
moins un projet ; 19,3 % des collèges publics, 7,5 % des écoles publiques, 2,5 % des
établissements privés. » — calculée par `dsfr-data-repeat` sur un pivot + jointure.

## Ce qu'on ne montre pas, et qu'il faut dire

- Dénominateur = parc ouvert au jour du chargement, pas celui de 2022-2024 ; 63 UAI du jeu
  absentes (fermées, fusionnées, Andorre) sortent du taux.
- Nouvelle-Calédonie, Polynésie, Wallis-et-Futuna hors périmètre (aucun projet, compétence locale).
- 79 projets sans date ou datés de 2323 hors du graphique temporel ; 361 datés d'avant
  septembre 2022 (antérieurs ou erreurs de saisie : non tranché).
- Fin de série : on ne sait pas si la démarche s'essouffle ou si la collecte s'arrête.
- Pas de moyenne d'élèves (médiane 147, queue à 30 000).

## Ecarts avec l'original

L'original ne compte rien. La page ajoute un second jeu (annuaire) pour le dénominateur, ce qui
change le message. La recherche couvre trois champs courts (intitulé, établissement, commune),
pas les dix champs de l'original.
