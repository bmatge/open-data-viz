# Analyse metier — IPS Ecoles

> La lecture `dataviz-metier` : le sens avant la syntaxe.
> **Ce fichier n'est jamais ecrase par un script.** Les sorties du modele
> multimodal arrivent dans `constats/` ; ce qui est retenu se reecrit ici, a la main.

Recreation du 2026-09-26 (niveau avance : une page), rentree 2024-2025.

## L'histoire trouvee

L'ecart social entre ecoles se joue a l'echelle du quartier, pas du departement.
D'un departement de metropole a l'autre, l'IPS moyen des ecoles va de 94,0
(Seine-Saint-Denis) a 125,1 (Hauts-de-Seine) : 31,0 points — deux voisins. Mais a
Strasbourg, 67,0 points separent le 1er decile des ecoles du 9e ; dans 27 des 28 communes
d'au moins 40 ecoles, et dans 51 departements sur 101, l'ecart interdecile depasse ces
31 points. Decomposition de variance (calcul hors page, 30 003 ecoles) : 18,8 % de la
variance de l'IPS est entre departements, 8,6 % entre secteurs.

Exploration qui y a mene : series par secteur (l'ecart prive-public grandit, comme au
college : 10,2 -> 11,3 ancienne methode, 11,8 -> 13,4 nouvelle), puis dispersion par
departement (ecarts-types de 6,5 en Lozere a 20,7 dans les Hauts-de-Seine), puis par commune.

Angles ecartes : la carte de l'IPS moyen par departement (elle raconte l'inverse) ; le
classement des ecoles ; le classement des communes par IPS moyen (version precedente, une
commune d'une ecole y dominait) ; l'ecart prive-public comme angle principal (deja porte
par la page colleges, et le secteur n'explique que 8,6 % de la variance).

## La question posee, et pour quel lecteur

Grand public, parent, elu local : « L'ecart social entre ecoles est-il une affaire de
territoires ou de quartiers ? » — puis « ou se situe l'ecole de mon quartier dans son
departement ? ».

## La forme retenue, et pourquoi elle sert cette question

- Barres horizontales empilees = barres d'etendue : segment gris 0 -> 1er decile,
  segment bleu 1er -> 9e decile, triees par ecart ; deux lignes de reference aux moyennes
  departementales extremes de metropole. Le lecteur voit chaque barre deborder la bande.
- Meme forme pour les communes (28, toutes) et les departements (30 premiers, 101 au tableau).
- Barres par rentree pour l'ecart prive-public, rupture 2022 marquee.
- Exploration : KPI, histogramme par classe de 10 points, carte des ecoles, chargees a la
  demande (`require-where`).

## Honnetete de l'echelle

- Axe a zero (impose par l'empilement) : les barres sont tassees a droite mais pas trompeuses.
- Deciles et moyennes comptent chaque ecole pour une (le jeu ne porte pas les effectifs) ;
  la reference DEPP ponderee par les eleves est affichee a part en section 4.
- Ecart interdecile compare a un ecart entre moyennes : deux mesures en points d'IPS, pas de
  meme nature — la page dit « les ecoles sont plus eloignees que les departements », pas
  « la ville est plus inegale que la France ».
- Aucune moyenne de moyennes : l'ecart prive-public est une difference de moyennes d'ecoles.

## Phrase de lecture

« Dans 27 communes sur 28, la barre est plus longue que la bande ; l'exception est
Saint-Denis (Seine-Saint-Denis), ou les ecoles se ressemblent parce que neuf sur dix ont un
IPS inferieur a 101,1. » — calculee (`dsfr-data-repeat` sur une ligne jointe).

## Ce qu'on ne montre pas, et qu'il faut dire

- 2 506 ecoles sur 32 509 sans IPS publie (moins de 25 CM2 en cinq ans) : surtout rurales
  (51 % en Lozere, 32 % dans le Cantal) — les departements ruraux paraissent plus homogenes.
  Maternelles hors champ. Avant 2022 le jeu ne listait pas ces ecoles.
- IPS d'ecole = moyenne glissante de cinq cohortes de CM2 : evolutions amorties.
- 156 ecoles sans referentiel d'adresse ; Saint-Barthelemy et Saint-Martin (< 20 ecoles) ;
  Paris, Lyon, Marseille publies par arrondissement (seuls trois arrondissements parisiens
  passent le seuil de 40 ecoles) ; outre-mer hors du calcul de l'ecart entre departements.
- Rupture de serie DEPP en 2022.

## Ecarts avec l'original

- Rentree 2024-2025 (l'original fige 2023-2024 par `ng-init`).
- Recit en trois sections avant l'exploration ; l'original n'est que la section 4.
- La carte colore par IPS et nomme « IPS non publie » (l'original : epingles uniformes ;
  la reproduction precedente peignait les ecoles sans IPS en « 125 et plus »).
- L'infobulle situe l'ecole par rapport aux references DEPP (departement public/prive, national).
