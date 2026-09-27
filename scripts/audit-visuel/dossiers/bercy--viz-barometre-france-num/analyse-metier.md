# Analyse métier — Baromètre France Num (recréation du 2026-09-27)

> Lecture `dataviz-metier`, niveau **avancé** (une page). La relecture précédente (R1-R11, 2026-09-26)
> reste dans l'historique git de ce fichier ; ses pièges sont repris ici, pas repayés.
> Chaque chiffre ci-dessous a été rejoué à l'API `data.economie.gouv.fr` (clé `ods-mef`) le 2026-09-27
> et relu au navigateur (Chromium/Playwright, `localhost:3905`, France entière et `?region=Bretagne`).
> **Ce fichier n'est jamais écrasé par un script.**

## L'histoire trouvée

**En 2025, une TPE-PME sur quatre utilise l'IA (25,6 %), deux fois plus qu'en 2024 (12,8 %), à
question identique — et c'est le seul usage qui bouge nettement plus que l'échantillon.** Trois des
quatre plus forts mouvements comparables de l'enquête sont des usages de l'IA (801 +12,8 pt ;
802 IA générative 9,5 → 21,9 ; 805 assistants 5,3 → 13,6), le quatrième est 1421 (trouver un
prestataire sans difficulté, 57,0 → 48,5). **Nuance** : l'écart entre secteurs (numérique 55,5 %,
agriculture 8,9 %) est plus grand que la hausse de l'année ; la taille joue moins et pas dans un
ordre simple (0 salarié 26,8 %, 1-9 : 23,7 %, 10-49 : 32,4 %, 50-249 : 42,2 %).

**Trouvaille qui renverse la page précédente.** Son n° 1 de « Ce qui bouge le plus » après la
relecture était la 713, factures sans aucun format électronique structuré, « 0 % » : 19,2 → 32,1 %
(+12,9 pt). Ce n'est pas un mouvement : la question 2025 ajoute « (fichier de données structurées,
excluant le PDF simple et l'email) » (`libelle_2025` de la table de correspondance). La règle
« mêmes réponses possibles les deux années » ne voyait pas une définition resserrée. Deuxième
condition ajoutée, calculée : `libelle_2024 = libelle_2025`. Bilan relu en page et à l'API :
**55 comparables, 28 nouvelles, 5 à réponses changées, 12 reformulées** (604, 607, 608, 625, 713,
721, 723, 724, 725, 733, 1006, 1301). La règle est conservatrice : 625 ne change que d'un accord
(« viennent » → « vient »), dit en page.

**Étalon d'échantillon.** La 205 (âge de l'entreprise) décrit l'échantillon, pas un usage ; elle
bouge pourtant de 8 points (« 3 à 10 ans » 30,6 → 22,6 %). Le poids total est identique les deux
années (2 144 976) : la pondération ne cale pas l'âge. D'où deux gestes : le classement ne retient
que les questions à sens déclaré (`sens_de_l_augmentation` ≠ « ni fav, ni défav »), et la 205
s'affiche comme seuil de prudence. Au-dessus de 8 points : les trois usages IA et 1421, rien d'autre.

## La forme, et pourquoi

- **Titre-message + chapô calculé** (`dsfr-data-repeat` sur la ligne 801 du pivot) + avant/après
  2024 | 2025 : le chiffre qui porte l'histoire, sans graphique.
- **Preuve** : six plus fortes variations comparables, deux barres par ligne (2024, 2025) — on voit le
  niveau et l'écart. Libellés d'axe raccourcis par `compute replace()` (DSFR Chart tronque) ; le libellé
  complet reste dans le tableau.
- **Détail IA** : sept usages, 2024 et 2025, triés par 2025.
- **Nuance** : IA par secteur (barres triées, palette neutre, le premier en évidence) et par taille ;
  population représentée dans le tableau.
- **Nuance 2** : la 713 en phrase (un chiffre et sa cause, un graphique n'ajouterait rien), le bilan
  de la règle compté, l'étalon 205 en encadré.
- **Exploration** (conservée, c'est la force de la page) : profil région × secteur × taille avec
  poids, quatre repères, six plus forts écarts ; tout le questionnaire en accordéons, un graphique par
  question (deux `dsfr-data-repeat` imbriqués) ; recherche + sélecteur de question.

## Honnêteté

- Pas de moyenne de taux : les parts sont celles du producteur, sommées sur une partition.
- Axes à zéro (barres). Pas de `color-map` : pastilles d'infobulle conformes à la légende (relevé au
  survol : #5C68E5 / #82B5F2, légende identique).
- Repère Connectivité selon la règle du producteur (Très + Plutôt satisfaisant, 81,0 % France,
  75,2 % Bretagne) — correction R3 conservée.
- Doublons de 7 questions (602, 605, 627, 1311, 1414, 1422, 1425) sommés comme l'original, dit en page.
- Profil : `max(poids_question)` affiché (2,1 M France, 109,4 k Bretagne).

## Phrase de lecture (France entière, édition 2025)

« En 2025, 25,6 % des TPE-PME utilisent l'IA, contre 12,8 % en 2024 : une part multipliée par 2,0,
à question identique, et le plus fort mouvement de l'enquête. L'IA générative passe de 9,5 % à
21,9 %. Mais 55,5 % des entreprises du numérique l'utilisent, contre 8,9 % dans l'agriculture. »

## Ce qu'on ne montre pas (dit en page)

Éditions 2020-2023 ; 16 questions de la table absentes de 2025 (dont tout le chapitre 12 « Modes
d'acquisition et d'installation », 1201-1202 — la page précédente lui gardait un accordéon vide) ;
201-203 retirées des écarts ; « Sans réponse » ; nombre de répondants par profil (non publié) ; aucun
indice de synthèse ; le sens déclaré ne colore que les écarts des repères.

## Angles écartés

- **La facturation électronique comme histoire** (« un tiers des TPE-PME sans facture électronique à
  un an de l'obligation ») : le chiffre 2025 est juste en niveau, mais sa comparaison à 2024 est
  fausse ; en faire l'accroche aurait invité le lecteur à lire un recul.
- **Le profil comme ouverture** (page précédente) : il répond à « où suis-je ? » avant d'avoir dit ce
  que l'enquête apprend ; il passe en exploration.
