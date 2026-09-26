# Analyse metier — Cartographie de l’accompagnement de la déficience sensorielle

> La lecture `dataviz-metier` : le sens avant la syntaxe.
> **Ce fichier n'est jamais ecrase par un script.** Les sorties du modele
> multimodal arrivent dans `constats/` ; ce qui est retenu se reecrit ici, a la main.

Recréation du 2026-09-26 (niveau avancé). Chiffres rejoués à l'API
(`/exports/json?limit=-1`, 307 lignes, jeu modifié le 2026-01-29, rentrée 2024).

## L'histoire trouvée

**Chaque dispositif a son âge, et le silence du jeu aussi.** Sur les 305 établissements
localisés :

| Niveau | n | PEJS | LSF1 | LSF2 | aucun |
|---|---|---|---|---|---|
| Écoles | 107 | 27 (25,2 %) | **0** | 2 (1,9 %) | **78 (72,9 %)** |
| Collèges | 82 | 15 (18,3 %) | **25 (30,5 %)** | 4 (4,9 %) | 51 (62,2 %) |
| Lycées | 114 | 15 (13,2 %) | 12 (10,5 %) | **80 (70,2 %)** | 20 (17,5 %) |
| EREA | 2 | 0 | 0 | 0 | 2 |

- Pôle à l'école, LSF langue première au collège, LSF langue seconde au lycée (80 des 86 LSF2).
- Le privé (54 lignes) n'entre que par la LSF2 : 50 LSF2 (dont 45 lycées), 0 PEJS, 0 LSF1 ;
  il porte 58 % des LSF2.
- Géographie du silence : Île-de-France 53 des 151 sans dispositif (35 %), 79 % de ses 67 ;
  Grand Est 84 % (16/19) ; Nouvelle-Aquitaine 17 %.

**Ce que ça renverse** : la page précédente disait « la moitié du jeu est muette » (49,5 %).
Vrai, mais c'est la moyenne de trois réalités — 73 % des écoles, 18 % des lycées.

Angles écartés : volumes par région (taille), carte comme preuve, empilement par dispositif
(les dispositifs se cumulent : 24 établissements en portent plusieurs).

## La question posee, et pour quel lecteur

Parent ou professionnel : « quel accompagnement en langue des signes existe à quel âge, et où ? »
— puis trouver l'établissement.

## La forme retenue, et pourquoi elle sert cette question

1. Trois KPI « part sans dispositif » par niveau (accroche : le gradient école → lycée).
2. Barres groupées niveau × dispositif, en **taux** du niveau, quatre séries dont « aucun »
   en gris. Groupées, pas empilées : les dispositifs se cumulent.
3. Une phrase (pas de graphique) pour le privé : trois nombres suffisent.
4. Barres horizontales triées, part sans dispositif par région (≥ 10 établissements),
   `selected-palette="neutral"` + `highlight-index="[0, 1]"`.
5. Exploration : recherche, facettes (dont `dispositifs` replié par `fold`), carte colorée
   par la seule information exclusive (dispositif déclaré / aucun), liste.

## Honnetete de l'echelle

Axes à zéro, bornés à 100 %. Taux = ratio de comptes, jamais de moyenne de taux. Régions
de moins de 10 établissements écartées du graphique (dit en page), gardées sur la carte.

## Phrase de lecture

« Au collège, 30 % des 82 établissements enseignent en LSF langue première et 18 % sont des
pôles ; la langue seconde n'y concerne que 4 collèges. Au lycée, c'est l'inverse. » —
calculée par `dsfr-data-repeat`, comme le chapô et les phrases des blocs 2 et 3.

## Ce qu'on ne montre pas, et qu'il faut dire

- « Aucun dispositif » ≠ « aucun accompagnement » : absence des trois marqueurs.
- Aucun effectif d'élèves : un établissement pèse un.
- 2 lignes fantômes (UAI seul) écartées : 87 LSF2 au jeu, 86 en page.
- 4 UAI sur deux lignes (lycées privés LSF2) : 305 lignes, 301 UAI distincts ; on compte des lignes.
- EREA hors graphique par niveau ; 5 régions < 10 hors graphique régional ; Guyane et Mayotte :
  aucun dispositif déclaré.
- Un seul millésime.

## Ecarts avec l'original

L'original superpose trois couches (un établissement à deux dispositifs dessiné deux fois,
les 151 sans dispositif absents) et ne compte rien. Ici : tout le jeu localisé est visible,
le croisement se filtre, les taux par niveau et par région sont calculés.
