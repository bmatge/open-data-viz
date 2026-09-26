# Analyse metier — Tableau de bord Signal Conso

> La lecture `dataviz-metier` : le sens avant la syntaxe.
> **Ce fichier n'est jamais ecrase par un script.** Les sorties du modele
> multimodal arrivent dans `constats/` ; ce qui est retenu se reecrit ici, a la main.

_Recréation du 2026-09-26, niveau « avancé » (une page). Chiffres rejoués à l'API
`/exports/json` le 2026-09-26 ; jeu arrêté au 09/05/2026 (`max(creationdate)`)._

## La question posee, et pour quel lecteur

**Qu'advient-il d'un signalement déposé sur SignalConso ?** Pour un lecteur grand public ou un
élu qui se demande si signaler « sert à quelque chose ». L'ancienne page répondait à « combien,
où, sur quoi » — l'activité du service, pas son effet.

## L'histoire trouvée

Exploration : volumes par année, année × statut, catégorie × compteurs, description des champs.

- Les trois compteurs (`signalement_transmis`, `_lu`, `_reponse`) **se déduisent exactement du
  statut** : transmis = PromesseAction, Infonde, MalAttribue, ConsulteIgnore, NonConsulte,
  Transmis, TraitementEnCours ; réponse = PromesseAction + Infonde + MalAttribue.
- **2025** (dernière année pleine) : 497 375 signalements (+56 % sur 2024). **39,6 % jamais
  transmis** à une entreprise (statut NA surtout). Sur les 300 517 transmis : réponse 70,6 %,
  mais **promesse d'action 37,3 %**, jugé infondé 26,4 %, mauvaise entreprise 7,0 %, lu sans
  réponse 6,9 %, jamais lu 22,5 %.
- **Concentration** : le démarchage abusif = 22,7 % des signalements mais 52,8 % des non-transmis
  (8,0 % transmis) ; l'achat sur internet 29,8 % des non-transmis (URL seule). À elles deux, 83 %.
- **Tendance** : promesse d'action / transmis 43,5 % (2021) → 42,5 → 39,4 → 39,2 → 37,3 % (2025) ;
  « infondé » 17,6 % (2023) → 26,4 % (2025).
- **Écart sectoriel** (≥ 1 000 transmis) : réponse 91 % en recouvrement amiable, 87 % banque,
  84 % énergie ; 22 % pour la catégorie « Internet » (influenceurs, avis en ligne).
- **Rupture cachée** : 100 % des 50 625 signalements 2018-2020 sont au statut `SuppressionRGPD`,
  et 40 151 de ceux de 2021.

**Ce que ça renverse dans l'ancienne page** : (1) son KPI « taux de réponse » (38 %) rapportait
les réponses à tous les dépôts, non-transmis compris — mauvais dénominateur ; (2) « NA, un code que
le jeu ne documente pas » : faux, la description du champ `status` le définit ; (3) « le champ de
suivi n'existe pas avant 2021 » : faux, il a été effacé (RGPD).

Angles écartés : la carte par département (volumes = population, sens du département non
documenté, 95 309 lignes sans département) ; les sous-catégories (multivaluées).

## La forme retenue, et pourquoi elle sert cette question

1. Titre-message + chapeau calculé + 4 KPI (2025) : la réponse avant le clic.
2. Preuve : barres horizontales triées, part de chaque statut dans les transmis 2025, promesse
   d'action mise en évidence (`selected-palette="neutral"` + `highlight-index`).
3. Nuance 1 : barres empilées transmis / jamais transmis par catégorie (top 12) — volume et part
   d'un coup d'œil ; le démarchage saute aux yeux.
4. Nuance 2 : parts par statut et par année 2021-2025 (barres groupées, LIM-017 interdit la
   courbe) ; volumes par année empilés suivi conservé / effacé RGPD.
5. Exploration : tableau triable des 19 catégories 2025.
6. Ce qu'on ne montre pas, puis `#analyse`.

## Honnetete de l'echelle

Toutes les parts sont des **ratios de sommes** (jamais de moyenne de taux). Dénominateur explicite
à chaque fois : « des transmis » vs « des déposés ». Barres à zéro. Une seule unité par graphique.
Arrondi unique à l'affichage (un double arrondi écrivait « 23 jamais lus » pour 22,46 %).

## Phrase de lecture

« Sur 100 signalements transmis en 2025, 37 ont obtenu une promesse d'action et 26 ont été jugés
infondés par l'entreprise ; 22 n'ont jamais été lus. » — calculée par `dsfr-data-repeat`.

## Ce qu'on ne montre pas, et qu'il faut dire

Carte (pourquoi), suivi avant 2021 (effacé), taux rapporté à tous les dépôts (mélange deux
questions), sous-catégories et tags (multivalués), statut = photographie à la date du jeu ;
2026 écartée des parts (TraitementEnCours) et marquée incomplète sur les volumes.

## Ecarts avec l'original

Aucun original (page 404, LIM-006). Écarts avec la reconstitution précédente : voir « Ce que ça
renverse » ci-dessus.
