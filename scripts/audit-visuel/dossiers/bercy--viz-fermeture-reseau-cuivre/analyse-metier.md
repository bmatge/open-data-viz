# Analyse metier — Fermeture du réseau cuivre

> La lecture `dataviz-metier` : le sens avant la syntaxe.
> **Ce fichier n'est jamais ecrase par un script.** Les sorties du modele
> multimodal arrivent dans `constats/` ; ce qui est retenu se reecrit ici, a la main.

Recréation du 2026-09-26 (niveau avancé : une page). Chiffres rejoués à l'API le même jour.

## L'histoire trouvée

Le jeu porte **deux dates** par commune, et leur décalage est l'histoire. La fin de la
commercialisation (plus de nouvel abonnement cuivre) est intervenue au plus tard le
31/01/2026 pour **76,6 %** des lignes (27 029 / 35 305 ; 77,5 % en communes distinctes,
26 694 / 34 423). L'arrêt technique, lui, tombe en 2028-2029 pour **85 %** des dates fixées
(17 526 / 20 617), et **41,6 %** des lignes n'ont pas de date (14 688, lots de présélection 6
et 7). **Paradoxe** : parmi ces lignes à qui le jeu répond « l'arrêt n'est pas encore prévu
dans votre commune », **65,6 %** (9 635 ; 64,2 % en communes distinctes) ont déjà perdu la
commercialisation. Nuance régionale : Bretagne 27,9 % et Auvergne-Rhône-Alpes 40,8 % de
commercialisation close, contre 94,5 % en Hauts-de-France — qui garde pourtant 60,5 % de
lignes sans date d'arrêt. « Déjà fermé » (phrase du jeu) : 1 003 lignes, 2,8 %.

La page précédente racontait l'année d'arrêt technique seule ; la date de fin de
commercialisation était une facette, sans récit. C'est la trouvaille : pour l'usager, la
date qui change quelque chose d'abord est passée dans trois communes sur quatre.

## La question posee, et pour quel lecteur

« Qu'est-ce qui a déjà changé pour moi, et quand ma ligne s'arrêtera-t-elle ? » — pour un
habitant, un élu local, un journaliste. L'outil de recherche par commune reste, en
exploration.

## La forme retenue, et pourquoi elle sert cette question

1. Titre-message + chapô calculé + 4 KPI (ratios de sommes).
2. Preuve : barres groupées par année, deux séries (commercialisation / arrêt technique) —
   l'avant/après du calendrier se lit d'un coup d'œil (pic 2026 contre pic 2029), plus un
   groupe « Pas de date ».
3. Nuance 1 : la phrase `output_usager` citée telle quelle, puis 3 barres (sans date, par
   année de fin de commercialisation), 2026 mise en évidence.
4. Nuance 2 : barres horizontales triées par région (13 régions ≥ 100 lignes), les deux
   retardataires en évidence, le reste grisé.
5. Exploration : recherche, facettes, carte et fiches serveur de la page précédente.
6. Ce qu'on ne montre pas + choix éditoriaux + `#analyse`.

## Honnetete de l'echelle

Axes à zéro ; parts régionales bornées 0-100. Parts = ratios de sommes, jamais de moyenne
de taux. L'unité (ligne commune × code postal) est dite partout ; les deux proportions du
titre vérifiées aussi en communes distinctes (78 % et 64 %).

## Phrase de lecture

« Selon le calendrier publié en octobre 2025, la commercialisation du cuivre a pris fin au
plus tard le 31 janvier 2026 pour 77 % des communes ; l'arrêt technique tombe à 85 % en
2028-2029, et 42 % des communes n'ont pas encore de date — dont 66 % où l'abonnement cuivre
n'est déjà plus proposé. » (calculée par `dsfr-data-repeat`)

## Ce qu'on ne montre pas, et qu'il faut dire

- Un calendrier, pas un constat : échéances « au plus tard », jeu du 20/10/2025.
- 3 167 lignes sans coordonnées = exactement les lignes sans région ni département (même
  ensemble, vérifié à l'API) : absentes de la carte et de ces facettes.
- 7 territoires ultramarins (150 lignes) hors du graphique régional.
- Les définitions des deux étapes ne sont pas dans le jeu (plan Arcep).
- Pas de lot en filtre (identifiant technique).

## Ecarts avec l'original

Ajout de la fin de commercialisation comme axe du récit ; comptes par année déplacés dans un
graphique à deux séries ; parts régionales. Recherche, facettes département/région, carte par
année d'arrêt : équivalents conservés. Facette « lot » retirée.
