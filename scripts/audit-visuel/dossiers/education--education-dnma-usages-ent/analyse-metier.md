# Analyse metier — DNMA Les usages numériques constatés via les ENT

> La lecture `dataviz-metier` : le sens avant la syntaxe.
> **Ce fichier n'est jamais ecrase par un script.** Les sorties du modele
> multimodal arrivent dans `constats/` ; ce qui est retenu se reecrit ici, a la main.

## La question posee, et pour quel lecteur

Les ENT sont-ils plus ou moins utilisés, et par qui ? Lecteur : décideur académique, presse,
grand public. Réponse de la page : **le DNMA ne permet pas de le dire d'une année sur l'autre**,
parce que son périmètre change — et voici de combien.

## L'histoire trouvée (recréation du 2026-09-26)

- **La rupture est de périmètre, pas de méthode ni d'usage.** Établissements mesurés à la
  semaine la plus haute : 7 060 en 2023-2024, 22 104 en 2024-2025, 30 026 en 2025-2026 (×4,3) —
  les écoles entrent en deux vagues (septembre 2024, septembre 2025). Visites : 821 572 897 →
  649 492 449 (−21 %). Visites par établissement et par semaine : 2 450 → 440.
- **Quatre académies sortent presque de la mesure en septembre 2025** : Strasbourg
  (81,3 M → 2,3 M), Dijon (26,5 M → 65 950), Clermont-Ferrand (21,9 M → 222 173), Besançon
  (20,5 M → 336 312) ; ensemble 150,3 M → 2,9 M, soit plus que la baisse nationale (−122 M).
  Leurs établissements restent dans le jeu (Strasbourg : 366 UAI en 2024-2025, 401 en 2025-2026)
  avec presque plus de visites. Toulouse, Montpellier, Reims, Lyon, Nancy-Metz perdent 60 à 86 %.
  Nantes ×9,5 (5,1 M → 48,5 M). Paris, Versailles, Créteil avaient fait l'aller-retour en
  2024-2025.
- **Trouvaille qui renverse la page précédente** : elle attribuait la bascule élèves → parents
  (élèves 468 → 261 M, parents 182 → 243 M) à « un changement de méthode de mesure ». C'est la
  composition : les écoles font 204,3 M de visites en 2025-2026, dont 77,8 % par des parents ;
  les collèges passent de 461,7 M à 247,3 M par la sortie des académies ci-dessus.
- **Le « 81,7 % des parents au smartphone »** de la page précédente est vrai mais porte sur
  51 % des visites de parents (appareil connu), et mélange écoles (90,2 %), collèges (74,9 %),
  lycées (65,5 %). Le jeu profil × appareil ne commence que le 18 août 2025.
- **`count(distinct uai)` du portail est approché** : 29 470 pour une semaine de 28 698 lignes
  (UAI unique par semaine, vérifié) ; 37 371 au lieu de 36 291 sur l'année. La page compte des
  lignes et des semaines.

## La forme retenue, et pourquoi elle sert cette question

1. Petits multiples par année scolaire : établissements mesurés / visites, mêmes abscisses, deux
   dernières années mises en évidence (gris + bleu) — les deux séries divergent.
2. Barres horizontales groupées avant/après par académie (2024-2025 gris, 2025-2026 bleu),
   triées par volume 2024-2025 : les barres qui disparaissent se voient d'un coup d'œil. Les
   académies sorties sont aussi dites en phrases calculées.
3. Barres empilées profil × type d'établissement (2025-2026) : le bloc orange des parents est
   dans les écoles.
4. Barres groupées de part au smartphone par type, parents/élèves, axe 0-100.
5. Exploration : année scolaire + académie → KPI (établissements par semaine, visites,
   visites par établissement-semaine, part des parents) et 25 services triés.

## Honnetete de l'echelle

- Aucune évolution nationale présentée comme un usage ; le chapô le dit.
- Parts = ratios de sommes (national smartphone = Σ smartphone / Σ appareil connu, pas moyenne
  des types).
- Parts au smartphone sur l'appareil connu, couverture affichée par type.
- Année en cours exclue (< 40 semaines). Axes à zéro.

## Phrase de lecture

« Entre 2023-2024 et 2025-2026, le nombre d'établissements mesurés en une semaine est multiplié
par 4,3, tandis que les visites évoluent de −21 %. » — calculée (`dsfr-data-repeat` sur `comp`).

## Ce qu'on ne montre pas, et qu'il faut dire

- Les « utilisateurs » (somme d'utilisateurs distincts par UAI et par semaine : 143 M pour
  12 M d'élèves).
- La cause de la sortie des quatre académies (hypothèse : ENT non raccordé, non vérifiable).
- 135 visites sans académie ; 928 971 visites 2025-2026 sans profil ; académies < 1 M de visites
  (tableau seulement).
- Angles écartés : carte et classement des académies (dessinent la couverture), OS/navigateurs,
  série hebdomadaire complète.

## Ecarts avec l'original

- Sept années scolaires au lieu de trois boutons figés ; 25 services au lieu de 5.
- Profils par type d'établissement, avant/après par académie, couverture de l'appareil :
  absents de l'original.
- Retirés par rapport à la reproduction précédente : carte map-aca, podium, OS, navigateurs,
  KPI « utilisateurs ».
