# Analyse metier — Les personnels dans les collèges français

> La lecture `dataviz-metier` : le sens avant la syntaxe.
> **Ce fichier n'est jamais ecrase par un script.** Les sorties du modele
> multimodal arrivent dans `constats/` ; ce qui est retenu se reecrit ici, a la main.

Recréation du 2026-09-26, niveau **avancé** (une page).

## L'histoire trouvée

L'original additionnait des totaux nationaux (289 592 ETP, 65 % de femmes, 80 % de certifiés)
et cartographiait les agrégés et les certifiés — deux indicateurs sans relief en métropole.
Le jeu porte une géographie que personne ne montrait : **la part des ETP enseignants de moins
de 35 ans dans les collèges publics va de 6,2 % (Finistère) à 49,7 % (Seine-Saint-Denis)**,
pour 20,1 % en France. Les académies de Créteil et de Versailles réunissent 16,9 % des ETP
enseignants de collège public et **33,2 % des moins de 35 ans**. Paris, au centre de cette
couronne, a la part d'agrégés la plus haute de France (16,5 %, 1er département sur 101) et
43 % d'enseignants de 50 ans ou plus contre 14,9 % en Seine-Saint-Denis — alors que le
renouvellement annuel est le même des deux côtés (29,4 % / 30,6 % arrivés depuis moins de
deux ans). Nuance : outre-mer, la jeunesse va avec la précarité (Mayotte 54,8 % de
non-titulaires, Guyane 29,7 %), ce que la banlieue parisienne n'a pas (Créteil 8,1 %,
Versailles 7,0 %, France publique 7,2 %).

Tout rejoué à l'API (ODSQL `sum(a)/sum(b)` par académie et par département) et sur l'export
complet des 6 987 collèges, le 2026-09-26.

**Trouvaille d'honnêteté (renverse l'original et la reproduction précédente)** : dans le
privé sous contrat, le jeu ne compte **que les enseignants** — `etp_total` ≈ ETP enseignants
(41 630 / 41 530) et la vie scolaire est vide sur 1 661 lignes privées sur 1 661. Le
« 289 592 ETP au service des élèves » additionne donc tous les personnels du public (247 962)
et les seuls enseignants du privé ; les 34 736 ETP de vie scolaire sont publics seulement.

## La question posee, et pour quel lecteur

« Qui enseigne dans les collèges, et est-ce le même corps enseignant partout ? » — pour un
parent, un élu, un journaliste. Réponse avant le clic : non, l'âge des enseignants dépend
fortement du territoire, et la banlieue parisienne concentre les jeunes.

## La forme retenue, et pourquoi elle sert cette question

- Accroche : trois KPI (France, poids de Créteil + Versailles, département le plus jeune lu
  dans la donnée).
- Preuve : barres horizontales **triées** des 30 académies, palette neutre, Créteil et
  Versailles en évidence (`highlight-index`).
- Géographie : carte des départements (la couronne se voit) + barres groupées Paris /
  Seine-Saint-Denis sur quatre indicateurs (contraste).
- Nuance : phrases calculées (outre-mer, public / privé) — deux lignes battent un graphique.
- Exploration : facettes, les KPI de l'original recalculés, âge et ancienneté **en %** avec la
  tranche sur l'axe (l'original mettait l'année, valeur unique), liste des collèges.

## Honnetete de l'echelle

- Toutes les parts sont des **rapports de sommes d'ETP**, jamais la moyenne des colonnes
  `proportion_*` (qui donnerait le même poids à un collège de 5 ETP et de 100).
- Résumé de carte `map-summary="weighted"` pondéré par `ens`, calculé sur la colonne brute
  (`map-summary-field`, PG-031) : affiche 20,09, le taux national, et non la moyenne des
  départements.
- Barres à zéro. Récit restreint au **public** (le privé recrute autrement : 17,4 % de moins de
  35 ans, 15,8 % de non-titulaires, 1,9 % d'agrégés) — le dire en page, fait.
- KPI « tous personnels » et « vie scolaire » bornés au public par un `where`.

## Phrase de lecture

« À la rentrée 2024, 20,1 % des enseignants des collèges publics ont moins de 35 ans — un sur
cinq. Mais la moyenne cache un écart de un à huit : 49,7 % en Seine-Saint-Denis, 6,2 % dans le
Finistère. Les académies de Créteil et de Versailles réunissent 16,9 % des enseignants de
collège public, et 33,2 % des moins de 35 ans. » — entièrement calculée
(`dsfr-data-repeat` sur deux jointures).

## Ce qu'on ne montre pas, et qu'il faut dire

- 16 collèges sans ETP enseignant (15 privés, 1 public) : hors des parts.
- 5 collèges sans région (Nantes, Lille, Strasbourg, Besançon, Grenoble) : présents dans
  académies et départements, absents du filtre par région.
- Une seule rentrée : aucune tendance. « Arrivés depuis moins de deux ans » = ancienneté dans
  le collège, pas dans le métier.
- Le pourquoi (mutations, vœux) n'est pas dans le jeu : formulation descriptive seulement.
- Choix nommés dans le code (Créteil/Versailles, Paris/Seine-Saint-Denis, Mayotte/Guyane) ;
  chiffres recalculés, extrêmes du chapô lus dans la donnée.

## Ecarts avec l'original

- Les quatre choroplèthes agrégés/certifiés sont remplacées par une carte des moins de 35 ans
  (angle écarté dit en page).
- Le total « ETP au service des élèves » public + privé n'est plus affiché : deux périmètres.
- Âge et ancienneté en pourcentage, tranche sur l'axe, suivant les facettes.
- Filtre académie ajouté, URL partageable ; nature d'établissement retirée des facettes (le
  périmètre est dit dans l'encadré du jeu).
