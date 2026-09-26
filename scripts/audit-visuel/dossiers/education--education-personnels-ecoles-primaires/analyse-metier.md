# Analyse metier — Les personnels dans les écoles primaires et maternelles

> La lecture `dataviz-metier` : le sens avant la syntaxe.
> **Ce fichier n'est jamais ecrase par un script.** Les sorties du modele
> multimodal arrivent dans `constats/` ; ce qui est retenu se reecrit ici, a la main.

## L'histoire trouvée (recréation du 2026-09-26)

Des trois jeux « personnels », celui du premier degré est le seul à porter **deux rentrées**
(2024, 2025). L'histoire est temporelle : **en un an, la part des ETP enseignants de 50 ans et
plus passe de 33,3 % à 35,2 % (+1,9 point) et augmente dans les 31 académies sur 31** (98
départements sur 102). Les 50 ans et plus gagnent 4 302 ETP quand les 35-49 ans en perdent
4 469 et les moins de 35 ans 1 454, pour un total mesuré qui recule de 1 625 ETP.
Rejoué à l'API le 2026-09-26 (`group_by=annee_de_la_rentree_scolaire[, libelle_academie |
code_departement]`, `where etp_de_femmes_enseignantes is not null`).

La page précédente avait ce chiffre dans un paragraphe figé ; elle ouvrait sur les pannes de
l'original. La recréation en fait le titre.

Nuance trouvée en explorant : **le secret statistique est inégal**. 17,9 % des ETP sont
masqués en France (écoles < 5 ETP, 2025), mais 63,8 % dans la Creuse, 43,0 % en Haute-Loire
(le département le plus âgé, 51,3 % de 50 ans et plus), 1,0 % à Mayotte. Corrélation entre
part masquée et part des 50 ans et plus : 0,53 sur les départements. La carte des âges
décrit, en zone rurale, les seules écoles de 5 ETP et plus.

## La question posee, et pour quel lecteur

Pour un lecteur grand public ou un élu : « le corps enseignant des écoles vieillit-il, et
où ? » — puis, pour l'usager local, « quel profil dans mon territoire ? » (exploration).

## La forme retenue, et pourquoi elle sert cette question

1. Chapô calculé + 3 KPI (part 2025, compte d'académies en hausse, moins de 35 ans).
2. Avant/après : barres groupées tranche × rentrée (unpivot + `series-field`).
3. Barres horizontales triées de l'**écart en points** par académie : toutes du même côté,
   c'est la preuve visuelle de « partout ».
4. Carte départementale 2025 de la part des 50 ans et plus (du simple au double).
5. Carte de la part d'ETP sous secret : la limite du récit, montrée et non dite en note.
6. Exploration (rentrée, secteur, région, académie, département), agrégée côté serveur.

## Honnetete de l'echelle

Parts = rapports de sommes d'ETP, dénominateur restreint aux écoles renseignées (sinon
tranches à 82 %). Barres à zéro (`y-min="0"`). Résumés de carte `weighted` sur la colonne
brute (`map-summary-field`), pondérés par les ETP (renseignés pour l'âge, totaux pour le
secret). Écarts calculés sur les parts non arrondies.

## Phrase de lecture

« À la rentrée 2025, 35,2 % des enseignants des écoles ont 50 ans ou plus, contre 33,3 % un an
plus tôt : +1,9 point, dans 31 académies sur 31. » — calculée (`dsfr-data-repeat` sur une
chaîne de jointures à clé constante).

## Ce qu'on ne montre pas, et qu'il faut dire

- Les écoles < 5 ETP (20 120 en 2025) : hors des parts, leur poids montré par une carte.
- Deux rentrées ne font pas une tendance ; l'hypothèse « génération qui passe la
  cinquantaine » est une lecture de la symétrie des chiffres, le jeu ne suit pas les personnes.
- Le périmètre renseigné varie un peu d'une rentrée à l'autre (pas un panel).
- 983 « Nouvelle Calédonie » hors carte (code INSEE 988).
- Le tableau accessible des cartes s'arrête à 100 lignes sur 102 (Guyane, Mayotte seulement
  dans le CSV).
- Angles écartés : féminisation (87 %, stable, > 80 % partout sauf Mayotte), ancienneté, carte
  des moins de 35 ans (redit celle des collèges).

## Ecarts avec l'original

Jeu `…1d-numerique` au lieu de `…1d` (colonnes texte, 3 blocs sur 4 en erreur 400) ; rentrée
filtrée au lieu de deux rentrées additionnées (631 578) ; filtres branchés sur le bon jeu ;
comparaison entre rentrées, écart par académie, deux cartes et liste par école en plus.
