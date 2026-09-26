# Analyse metier — Appel à projet Socle Numérique dans les Ecoles Elémentaires

> La lecture `dataviz-metier` : le sens avant la syntaxe.
> **Ce fichier n'est jamais ecrase par un script.** Les sorties du modele
> multimodal arrivent dans `constats/` ; ce qui est retenu se reecrit ici, a la main.

_Recréation du 2026-09-26, niveau avancé (une page). Chiffres relus sur l'export complet de
`fr-en-aap-snee-collectivites` (6 870 lignes, jeu modifié le 27/11/2024)._

## La question posee, et pour quel lecteur

Quelle part de la facture du socle numérique l'État a-t-il réellement payée aux communes, et
pourquoi le taux d'ensemble (52,5 %) ne ressemble-t-il à aucune d'elles ? Lecteur : élu ou
agent de collectivité, journaliste, citoyen curieux du plan de relance.

## L'histoire trouvée

- Taux d'ensemble 52,5 % (103,1 M€ / 196,5 M€), mais **45 % des signataires (3 101 / 6 870)
  couverts à 65 % ou plus**, un seul au-delà de 70 % (82 %) ; médiane des taux 63,7 %.
- Le taux décroît à chaque palier de dépense : 63,5 % (< 5 k€) → 39,3 % (≥ 200 k€).
  Les 107 conventions de 200 k€ et plus = 1,6 % des signataires, 22,6 % de la dépense.
- Nuance : la taille n'explique pas tout. Seine-Saint-Denis (34,0 %, 26 conventions de
  435 k€ en moyenne) et La Réunion (32,5 %) suivent la règle ; la Moselle (43,8 %, 113
  conventions de 27,5 k€ en moyenne, ≈ moyenne nationale de 28,6 k€) ne la suit pas.
- Renverse la page précédente : son camembert et sa phrase présentaient le taux national
  comme la référence dont les collectivités s'écartent ; c'est l'inverse, le taux national
  est tiré par une minorité.
- Angles écartés : montants absolus par région (original — redessine la population
  scolaire), écoles par région (reproduction précédente), subvention par école.

## La forme retenue, et pourquoi elle sert cette question

1. Barres ordonnées par palier de dépense, taux (ratio de sommes), dernier palier mis en
   évidence (`selected-palette="neutral"` + `highlight-index`), ligne de référence du taux
   d'ensemble **calculée** (graphique estampé dans un `dsfr-data-repeat` du bilan).
2. Histogramme des collectivités par tranche de taux, tranche « 65 % et plus » en évidence.
3. Barres horizontales triées : les dix départements les moins couverts, tableau a11y avec
   dépense moyenne par convention (ce qui porte la nuance).
4. Exploration : recherche, facettes (dont tranches), carte des conventions colorée par
   tranche de taux, tableau trié par dépense décroissante.

## Honnetete de l'echelle

Axes à zéro (`y-min="0"` sur les barres verticales ; retiré sur l'horizontal, où il ajoute
une catégorie « 0 », cf. LIM-018). Tous les taux de groupe sont des ratios de sommes, jamais
des moyennes de taux ; tranches calculées sur le taux non arrondi.

## Phrase de lecture

« Pour 6 870 conventions, l'État a couvert 52,5 % des dépenses ; mais 45 % des collectivités
l'ont été à 65 % ou plus, et les 107 conventions de plus de 200 000 € — 22,6 % de la
dépense — seulement à 39,3 %. » Toutes les phrases de la page sont calculées.

## Ce qu'on ne montre pas, et qu'il faut dire

- Le règlement (taux, plafonds) n'est pas dans le jeu : le plafond à 70 % est observé, pas
  expliqué.
- 6 870 lignes pour 6 866 SIREN (quatre doubles conventions) : on compte des conventions.
- 6 conventions sans département (Polynésie ×4, Saint-Barthélemy, Saint-Pierre-et-Miquelon) :
  dans les totaux, hors classement départemental.
- Jeu par école : 6 995 des 12 624 lignes au SIREN « #N/A » → pas de montant par classe.
- « Montant de la subvention » : accordé ou versé, non précisé ; pas de date de convention.

## Ecarts avec l'original

L'original ne montre que des montants absolus (choroplèthes régions / départements) et aucun
total ni taux. La recréation remplace le montant par le taux et ajoute totaux, distribution,
recherche et tableau. Les six conventions `code_region = "00"` perdues par l'original sont
ici dans les totaux et sur la carte.
