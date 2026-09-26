# Analyse metier — Ted-i : Déploiement des robots de téléprésence

> La lecture `dataviz-metier` : le sens avant la syntaxe.
> **Ce fichier n'est jamais ecrase par un script.** Les sorties du modele
> multimodal arrivent dans `constats/` ; ce qui est retenu se reecrit ici, a la main.

## La question posee, et pour quel lecteur

« Combien de robots Ted-i servent vraiment en ce moment, et comment ce nombre évolue-t-il
au fil de l'année ? » — pour un lecteur grand public, un élu ou un pilote du programme.

L'original (et la reproduction précédente) répondaient par des compteurs et un **cumul des
poses**, qui ne redescend jamais. Le jeu porte pourtant la date de **fin** : le parc en service
se reconstitue mois par mois (poses cumulées − restitutions cumulées). Recréation du 2026-09-26.

## L'histoire trouvée (export du 2026-09-26, 3 948 lignes)

- **Accroche — le parc respire avec l'année scolaire.** Il monte de septembre à avril
  (pic 1 273 en avril 2025, 1 293 en avril 2026) puis chute en mai-juin ; 62 à 63 % des
  restitutions d'une campagne ont lieu en mai ou juin (906 / 1 427 ; 1 278 / 2 059).
- **Nuance — l'été n'est pas identique.** Fin juillet 2025, 402 robots restaient en service ;
  fin juillet 2026, 43. Élèves suivis d'une année sur l'autre ou restitutions saisies en retard :
  le jeu ne tranche pas (dit en page).
- **Changement — la rentrée 2026 démarre plus vite.** Du 1er août au 25 septembre :
  419 poses (2026-2027) contre 302 (2025-2026) et 288 (2024-2025), +39 %. Les poses d'août ont
  doublé (77 contre 37). Deux campagnes complètes : 1 829 puis 1 700 (campagnes août→juillet),
  donc pas de tendance à la hausse établie.
- **Le vide — les lignes sans établissement ne sont pas dispersées.** 184 lignes (4,7 %) n'ont
  que UAI et dates ; elles portent 47 codes, dont quatre en concentrent 123 (0062205P : 42,
  0811300Y : 39, 0753742K : 25, 0211322Y : 17). Les cinq plus fréquents sont absents de
  `fr-en-annuaire-education` (vérifié à l'API). La page précédente parlait d'un « appariement
  qui n'a pas eu lieu » ; c'est plutôt une poignée de structures prêteuses hors annuaire
  (hypothèse, dite comme telle).

Angles écartés : classement des académies en volume (Lille 521, Versailles 312 — sans effectif
d'élèves par académie, mesure la taille autant que le recours) ; couverture « 27 académies
sur 30 » (acquise dès la première année) ; durée des prêts en jours (médiane 144 j, calculée
hors page : `compute` n'a pas de différence de dates).

## La forme retenue, et pourquoi elle sert cette question

1. Courbe du parc en service en fin de mois (stock) — la preuve.
2. Barres groupées poses / restitutions par mois — le mécanisme (deux vagues opposées).
3. Barres groupées par mois de campagne, une série par campagne (en cours en bleu, précédentes
   en gris) — la comparaison à la même période.
4. Phrase chiffrée pour le vide (un graphique n'ajouterait rien à quatre nombres).
5. Exploration : recherche, facettes (statut, campagne, degré, académie, département), carte,
   tableau.

Campagne = août → juillet (les poses de fin août servent la rentrée suivante ; aucune pose en
juillet). Noms de série relatifs (« Campagne en cours ») pour que `color-map` survive au
changement d'année.

## Honnetete de l'echelle

Axes à zéro. Aucun taux moyen. Le stock est un cumul exact d'événements (+1/−1). La
comparaison « à date » prend la date de la dernière pose du jeu, pas l'horloge du lecteur.

## Phrase de lecture

« Du 1er août au 25/09/2026, 419 robots ont été posés pour la campagne 2026-2027, contre 302
sur la même période de la campagne précédente (39 % d'écart) et 288 deux ans plus tôt. » —
calculée (`dsfr-data-repeat` sur jointure + pivot), comme le chapô, les pics, les fins de
juillet et la part des restitutions en mai-juin.

## Ce qu'on ne montre pas, et qu'il faut dire

- Le jeu compte des robots, pas des élèves.
- 184 robots sans établissement : dans les courbes et compteurs, absents de la carte.
- Un robot rendu sans date saisie reste compté en service.
- Pas de durée en jours dans la page (médiane citée, datée, calcul externe).
- La campagne en cours est incomplète par construction.

## Ecarts avec l'original

- Stock en service au lieu du cumul des poses (le cumul de l'original projetait en outre onze
  mois futurs en mode « temps réel »).
- Campagne août → juillet au lieu de septembre → août (37 robots d'août 2025 changent d'année).
- Groupe « Établissement non identifié » nommé, au lieu d'être perdu par la barre 1er/2nd degré
  et par la carte.
