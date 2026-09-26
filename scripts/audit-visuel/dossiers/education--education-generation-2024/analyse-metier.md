# Analyse metier — Génération 2024

> La lecture `dataviz-metier` : le sens avant la syntaxe.
> **Ce fichier n'est jamais ecrase par un script.** Les sorties du modele
> multimodal arrivent dans `constats/` ; ce qui est retenu se reecrit ici, a la main.

## La question posee, et pour quel lecteur

« Qui le label Génération 2024 a-t-il touché, rapporté à ce qui existe ? » — pour un lecteur
grand public ou un élu qui veut savoir si le label a été large, ciblé, ou inégal.

L'original (une carte seule) et l'ancienne reproduction répondaient à « où sont les
établissements labellisés ? » en volumes : 7 413 écoles sur 11 221, « le label déborde le second
degré ». **Rapporté à l'annuaire de l'éducation, c'est l'inverse** (recréation du 2026-09-26) :
15,3 % des écoles, 20,6 % des lycées, **30,8 % des collèges**. Les volumes mesuraient la taille
du parc d'écoles, pas le label.

## L'histoire trouvée

- **Accroche** : près d'un collège public d'éducation prioritaire sur deux a été labellisé
  (REP+ 47,3 %, REP 44,5 %), contre 35,1 % des autres collèges publics et 15,3 % des privés.
- **Preuve** : le même gradient privé < public hors EP < REP < REP+ dans les écoles
  (6,9 / 15,7 / 19,8 / 22,5 %) ; les lycées (hors EP) : privé 9,1 %, public 29,1 %.
- **Nuance** : l'académie pèse plus que l'éducation prioritaire — parmi les académies d'au moins
  100 collèges publics, de 11,3 % (Rennes) à 58,8 % (Versailles). Vérifié public seul, pour ne
  pas mesurer la part de privé (Rennes public 11,3 %, privé 8,4 %).
- **Contexte** : 40 % des labels datent de 2022 ; les 11 221 labels ont pris fin le 2025-09-01.

Angles écartés : les QPV (871 nulls, deux nomenclatures de distance) ; les dispositifs (ils
décrivent les établissements, pas le label) ; le poids en élèves.

## La forme retenue, et pourquoi elle sert cette question

- Barres groupées type × segment (4 segments, gris pour le privé, bleus de plus en plus foncés
  vers REP+) : un seul graphique porte les deux contrastes (public/privé, EP/hors EP).
- Barres horizontales triées par académie (taux, pas volumes).
- Barres par année de début de labellisation.
- Taux = labellisés / établissements de l'annuaire du même type et segment, dénominateur agrégé
  côté serveur (deux requêtes de quelques lignes), jointure `on="type,seg"`.

## Honnetete de l'echelle

Axes à zéro. Aucun taux moyen : chaque taux est un rapport de comptes, les agrégats (par type)
sont des rapports de sommes. Les taux ne suivent pas les facettes (le dénominateur ne le
pourrait pas) — dit en page.

## Phrase de lecture

« Le label Génération 2024 a touché 30,8 % des collèges de France (2 375 sur 7 705) : 47,3 % des
collèges publics en REP+ et 44,5 % en REP, contre 35,1 % des autres collèges publics et 15,3 % des
collèges privés. » — calculée (`dsfr-data-repeat` sur le pivot), comme les trois autres.

## Ce qu'on ne montre pas, et qu'il faut dire

- Numérateur 2017-2024, dénominateur = annuaire courant (établissements fermés depuis).
- Sections SEGPA/SEP/SGT (2 343 UAI) retirées du dénominateur ; 9 lignes au secteur atypique
  hors taux ; 39 « types » du jeu, seuls écoles/collèges/lycées ont un dénominateur.
- 292 établissements sans coordonnées (dont 81 des 100 lycées français à l'étranger) : pas sur
  la carte, présents dans compteurs et tableau.
- Académies de moins de 100 collèges publics écartées de la phrase (Polynésie 77,1 %,
  Nouvelle-Calédonie / Wallis / SPM à 0 %), présentes dans le graphique.

## Ecarts avec l'original

L'original n'avait ni chiffre ni filtre et répartissait la carte en 8 couches par tutelle
(97 établissements sur aucune couche). La recréation ajoute le dénominateur, qui n'existe dans
aucun des deux jeux pris seuls.
