# Analyse metier — Cartographie PIX fiche établissement

> La lecture `dataviz-metier` : le sens avant la syntaxe.
> **Ce fichier n'est jamais ecrase par un script.** Les sorties du modele
> multimodal arrivent dans `constats/` ; ce qui est retenu se reecrit ici, a la main.

## La question posee, et pour quel lecteur

Pix touche-t-il plus d'élèves, ou les fait-il passer plus souvent ? Pour un lecteur de
politique éducative (rectorat, presse, chef d'établissement) qui voit monter les chiffres
de participation et veut savoir ce qu'ils mesurent.

## L'histoire trouvée (rejouée à l'API le 2026-09-26)

Jeu `…_participations_aux_campagnes_par_etablissement_sans_collecte_de_profil`, 41 422 lignes.

- Participations 2022 → 2025 : 5 309 373 → 8 504 480 (**+60 %**).
- Élèves participants : 3 288 367 → 3 670 219 (**+12 %**).
- Parcours par élève participant : **1,61 → 2,32**. Médiane par établissement 1,18 → 1,84 ;
  part des établissements sous 1,5 parcours : 68 % → 32 %.
- Collèges (nom en « Collège ») : 1,81 → 2,66 parcours par élève, élèves **+27 %**.
  Lycées (« Lycée », « LP », « LGT ») : 1,36 → 1,72, élèves **−8 %** — l'intensité ne
  monte qu'en 2025 (1,36 / 1,37 / 1,37 / 1,72).
- Les 32 académies présentes aux deux campagnes progressent toutes.
- Nuance secondaire : participations au résultat partagé 78,5 % → 86,6 %.

Figure : **le paradoxe / l'écart** entre deux comptes qui semblent dire la même chose.
Renverse l'angle de la page précédente, qui mettait en avant le « taux d'envoi ».

## La forme retenue, et pourquoi elle sert cette question

1. Barres groupées participations / élèves par campagne (même unité, millions) : l'écart
   qui se creuse se voit sans lire un chiffre.
2. Barres groupées collèges / lycées du ratio parcours par élève (bar plutôt que line :
   DSFR Chart traite `annee` comme un nombre et invente 2022.5 sur l'axe).
3. Barres horizontales académies × {2022 gris, 2025 bleu}, triées sur 2025.
4. Exploration : carte des établissements d'une campagne, couleur = tranche de parcours
   par élève (séquentielle bleue), filtres, tableau.

## Honnetete de l'echelle

Axes à zéro. Tous les ratios sont des ratios de sommes (Σ participations / Σ élèves), jamais
une moyenne de ratios d'établissements. Arrondis en aval seulement.

## Phrase de lecture

« De la campagne 2022 à la campagne 2025, les participations des collèges et lycées aux
parcours Pix sont passées de 5,3 à 8,5 millions (+60 %). Le nombre d'élèves qui y
participent n'a progressé que de 12 %. Chaque élève participant a suivi en moyenne 2,32
parcours en 2025, contre 1,61 en 2022. » — calculée (`dsfr-data-repeat` sur `pix-bilan`).

## Ce qu'on ne montre pas, et qu'il faut dire

- Élèves comptés par établissement (somme de distincts) ; pas d'effectifs scolarisés, donc
  pas de taux de couverture.
- Secret statistique : moins de 5 participations non publiées.
- Type d'établissement lu dans le nom ; ~166 lignes/an (EREA, ensembles scolaires, campus)
  hors des deux séries.
- 14 UAI en double en 2025 (compteur en `uai:distinct`).
- 50 à 130 positions nulles par an (54 en 2025) : hors carte, dans les compteurs.
- Nouvelle-Calédonie et Wallis-et-Futuna présentes en 2022 et 2024 seulement (effet
  < 1 point sur la hausse nationale).
- `annee` = étiquette du producteur, sans précision 2024-2025 / 2025-2026.
- `libelle_region` vide sur 645 lignes : facette sur `libelle_de_la_region` (4 vides).

## Ecarts avec l'original

- Le jeu de la carte d'origine (`…_certification_…_par_eple`) a toujours **une seule
  position pour 43 479 lignes** (revérifié le 2026-09-26) : la page utilise le jeu frère.
- La fiche maître-détail (4 accordéons sur 4 autres jeux) n'est pas reprise ; le panneau de
  la carte donne la fiche de la campagne affichée.
- Ajout d'un filtre de campagne, absent de l'original.
