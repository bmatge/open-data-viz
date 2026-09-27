# Analyse metier — Portrait de territoire

> La lecture `dataviz-metier` : le sens avant la syntaxe.
> **Ce fichier n'est jamais ecrase par un script.** Les sorties du modele
> multimodal arrivent dans `constats/` ; ce qui est retenu se reecrit ici, a la main.

_Recréation du 2026-09-27 (niveau avancé : une page). Chiffres rejoués à l'API
`equipements.sports.gouv.fr` le 2026-09-27 via le tunnel du VPS._

## La question posee, et pour quel lecteur

Un élu, un service des sports ou un journaliste local : **mon département est-il bien ou mal
équipé en équipements sportifs ?** — et la réponse honnête passe par une seconde question : *par
rapport à quoi ?* Pas à la moyenne nationale seule, que la densité fausse.

## L'histoire trouvée

- 333 695 équipements pour 68 029 342 habitants : **49 pour 10 000** en France.
- D'un département à l'autre, **de 1 à 19** : 264,9 (Hautes-Alpes) contre 13,6 (Paris).
- **La densité l'explique pour l'essentiel** : 113,3 pour 10 000 dans les communes rurales à
  habitat très dispersé, 25,9 dans les grands centres urbains (4,4 fois moins). Le classement
  brut est un classement de densité.
- D'où l'angle : comparer chaque département à **ce que sa densité laisse attendre**
  (standardisation directe : population du département par classe × taux national de la classe).
  Gironde 36,4 contre 46,2 attendus (indice 0,79, 81e sur 101) ; Paris 13,6 contre 25,9 (0,53) ;
  Hautes-Alpes 264,9 contre 64,0 (4,14, porté par les sports de nature et le ski — 7,6 fois leur
  poids national). À densité égale, les moins dotés sont Mayotte (0,39), Paris, Corse-du-Sud,
  Guadeloupe, Seine-Saint-Denis, Ille-et-Vilaine (0,65) ; les mieux dotés les départements de
  montagne (Hautes-Alpes, Lozère, Ariège, Pyrénées).
- C'est une trouvaille par rapport à la page précédente : ses indicateurs « pour 10 000
  habitants » comparés à la France mesuraient d'abord la densité du territoire choisi.

## La forme retenue, et pourquoi elle sert cette question

1. Chapô calculé (France, extrêmes, pente de densité) → la réponse avant le clic.
2. Portrait : titre `context-value`, phrase calculée (taux, écart à la France, rang, attendu,
   verdict), trois KPI de poids différents, **trois barres** — le département mis en évidence,
   « attendu à densité égale » et « France » en gris (`selected-palette="neutral"` +
   `highlight-index`).
3. Nuance : les sept classes de densité, barres triées ; encadré « ce que cette pente ne dit pas ».
4. Ce qui distingue le département : indice de spécialisation par famille (top 8, ≥ 10 équipements).
5. Exploration : tableau triable des 101 départements (indice compris), carte paresseuse.
6. Conclusion, puis ce qu'on ne montre pas et les angles écartés.

## Honnetete de l'echelle

Barres à zéro. Taux = ratio de sommes (jamais de moyenne de taux). L'indice est un rapport
observé / attendu, 1 = comme la France à densité égale. Unité de compte : l'équipement, pas sa
taille — dit en page.

## Phrase de lecture

« Gironde : 36 équipements sportifs pour 10 000 habitants, 26 % de moins que la moyenne
nationale (49) — 81e département sur 101. À densité égale, on en attendrait 46 : le département
est moins équipé que sa densité ne le laisse attendre, de 21 %. » (calculée, `dsfr-data-repeat`)

## Ce qu'on ne montre pas, et qu'il faut dire

- 1 005 équipements sans département (dans le total national, dans aucun portrait) ; 3 340 sans
  classe de densité (hors calcul de l'attendu). Calculés en page.
- Les six COM : dans la France entière, hors classement (population sans classe de densité) ;
  1 586 habitants de l'Aveyron n'ont pas non plus de classe.
- Parc d'aujourd'hui, population 2020. Recensement déclaratif : un indice bas peut être un
  recensement incomplet.
- Angles écartés : âge (jeu d'agrégation non synchrone), accessibilité (page dédiée), zonages
  ZRR/ZFRR/CRTE, maille communale.

## Ecarts avec l'original

- Une seule maille (département) au lieu de six ; plus de comparaison à un second territoire
  choisi — remplacée par la comparaison à l'attendu, calculée pour tous.
- Plus de 40 indicateurs : quatre chiffres et une phrase, le reste en exploration.
- Requêtes : original 71 au chargement / 87 au changement ; page précédente 12 / 13 ;
  recréation 2 au chargement (3 en défilant), 1 par changement de département (+1 carte).
