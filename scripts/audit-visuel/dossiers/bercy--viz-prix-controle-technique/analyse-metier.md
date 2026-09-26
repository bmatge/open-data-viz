# Analyse metier — Prix des contrôles techniques

> La lecture `dataviz-metier` : le sens avant la syntaxe.
> **Ce fichier n'est jamais ecrase par un script.** Les sorties du modele
> multimodal arrivent dans `constats/` ; ce qui est retenu se reecrit ici, a la main.

Recréation du 2026-09-26, niveau avancé (une page).

## La question posee, et pour quel lecteur

Un automobiliste : « combien coûte un contrôle technique, et est-ce que ça vaut la peine de
comparer ? » La page d'origine (prix.conso.gouv.fr) est un comparateur ; elle ne répond qu'à
« combien ici ».

## L'histoire trouvee

- **Unité de compte.** Une ligne = un tarif (centre × catégorie × énergie), 145 878 lignes pour
  5 980 centres. Le récit compare UN produit, la visite d'une voiture particulière diesel : une
  ligne par centre (group_by `cct_siret` → n = 1 partout), 6 094 tarifs, 45 à 125 €, aucune
  valeur aberrante. L'essence donne 80,23 € contre 80,31 € : le choix ne décide de rien.
- **L'écart (accroche).** Moyenne départementale de 68,88 € (Loiret) à 102,37 € (Haute-Savoie) :
  × 1,49 pour une visite réglementée identique partout.
- **La nuance qui renverse l'intuition — et la page précédente.** Hors extrêmes, l'écart entre le
  10e département le plus cher (87,63 €) et le 10e moins cher (75,08 €) est de 13 € ; l'écart
  interne moyen p90 − p10 d'un département est de 14 €. Décomposition de variance sur les 6 094
  tarifs : 41 % entre départements, 59 % à l'intérieur. Une première rédaction disait « l'adresse
  compte plus que le centre » : c'était faux, corrigé avant publication.
- **L'exception.** Haute-Savoie : +11 € sur le deuxième (Savoie, 91,48 €), alors que du 2e au 10e
  les moyennes tiennent en 4 €. Son premier décile (90,50 €) dépasse la moyenne de 93 des 98
  départements classés.
- **Second message.** Électrique +6,6 €, hybride +6,2 €, gaz +15 € en moyenne ; mais centre par
  centre, 3 758 des 6 039 centres (62 %) surtaxent l'électrique, 2 256 (37 %) non, 25 moins cher.

Angles écartés (écrits en page) : réseaux d'enseignes (l'enseigne n'est dans la dénomination que
pour une minorité), médiane départementale (même classement à la marge), évolution (pas d'historique).

## La forme retenue, et pourquoi elle sert cette question

Chapô calculé (4 phrases, `dsfr-data-repeat`) → carte choroplèthe (la géographie EST le propos :
Alpes, Paris, Corse, outre-mer en tête) → barres triées des 10 plus chers + 10 moins chers, la
Haute-Savoie seule en couleur (neutral + highlight) → barres par énergie, trois foncées, et la
phrase centre par centre (pivot) → comparateur (recherche + facettes serveur + carte + cartes) →
conclusion → ce qu'on ne montre pas. Une phrase plutôt qu'un graphique pour l'écart interne.

## Honnetete de l'echelle

Barres depuis zéro (axe des valeurs par défaut ; `y-min="0"` retiré car il ajoutait une catégorie
« 0 » sur un graphique horizontal). Résumé de carte pondéré par le nombre de centres, calculé sur la
colonne non arrondie : égal au chapô (80,31 €). Déciles calculés par le portail (`percentile`), pas
de moyenne de moyennes. Départements de moins de 10 centres (Mayotte 1, Guyane 5, Corse-du-Sud 7)
exclus des classements, gardés sur la carte, et dit en page.

## Phrase de lecture

« Pour une voiture particulière diesel, les 6 094 centres qui déclarent leur tarif facturent la
visite 80,31 € en moyenne. D'un département à l'autre, la moyenne va de 68,88 € à 102,37 € ; hors
extrêmes, l'écart entre départements (13 €) est celui qui sépare les centres d'un même département
(14 €). » (relevé du 26/09/2026 — en page, tous ces chiffres sont calculés au chargement).

Seuls les titres (H1, H2 « La Haute-Savoie décroche ») nomment un département en dur : ils valent au
26/09/2026 et devront être relus si le classement bouge.

## Ce qu'on ne montre pas, et qu'il faut dire

- 1 475 tarifs sous 30 € écartés (1 459 à 0 € = prix non renseigné ; 16 de 1 à 7 €) ; le plus bas
  tarif plausible est à 35 € (cyclomoteur).
- 3 tarifs voiture de 250 à 999 € gardés : effet ≤ 0,24 € sur la moyenne du gaz, 0,07 € sur l'électrique.
- 2 706 des 6 094 tarifs VP diesel datent d'avant 2021 (surtout l'été 2020) : prix inchangé ou non
  redéclaré, indiscernable.
- Moyennes de tarifs affichés, un centre = une voix, pas de prix payé.
- Autres catégories non racontées (disponibles dans la recherche).

## Ecarts avec l'original

L'original est un comparateur : il est conservé en bas (recherche, type, énergie, carte, fiches).
La vue « tous les centres de mon département » n'est pas reprise (la carte montre la page courante,
30 tarifs). Ajouts : tout le récit (aucun prix agrégé sur l'original).
