# Analyse metier — Offre de langues dans les collèges et lycées

> La lecture `dataviz-metier` : le sens avant la syntaxe.
> **Ce fichier n'est jamais ecrase par un script.** Les sorties du modele
> multimodal arrivent dans `constats/` ; ce qui est retenu se reecrit ici, a la main.

## L'histoire trouvee (recreation du 2026-09-26)

Rentrée 2024, 9 743 collèges et lycées (compte exact, voir plus bas) : **trois langues sont
proposées presque partout** — anglais 100 %, espagnol 95,9 %, allemand 80,2 % — **et toutes les
autres presque nulle part** : italien 29,5 %, chinois 6,4 %, 27 des 37 langues sous 1 %.

La troisième langue n'est pas répartie comme les deux autres : l'allemand est proposé dans
**100 %** des établissements de l'académie de Strasbourg (LV1 dans 99 %), mais dans **52 %**
seulement des six académies du Sud où il est le moins présent (Corse 23 %, Bordeaux 49 %,
Toulouse 50 %, Nice 53 %, Aix-Marseille 56 %, Montpellier 57 %). **L'italien ne prend le relais
qu'au sud-est** (Nice 96 %, Corse 98 %, Grenoble 93 %, Aix-Marseille 86 %) ; au sud-ouest rien ne
le remplace, et l'offre se resserre : 2,8 langues vivantes par établissement à Bordeaux et
Toulouse, contre 3,9 à Lyon et 3,8 à Grenoble. Outre-mer : 10 % aux Antilles, en Guyane et à
Mayotte, mais 88 % à La Réunion.

**Ce que ça renverse.** La page précédente écrivait « Trente langues » (il y en a 37) et
suggérait un allemand et un espagnol à égalité (10 194 et 10 054 **lignes**) : compté en
établissements, l'espagnol devance l'allemand de 1 533 établissements, parce que l'allemand est
souvent proposé deux fois (LV1 et LV2) au même endroit. La fiche d'audit retenait 9 759
établissements : c'est le `count(distinct)` **approché** d'Opendatasoft (PG-026) ; le vrai compte
est 9 743.

Angles écartés : public / privé (écart faible, hors question), collège / lycée (le jeu ne recense
presque pas le latin au collège, la comparaison serait biaisée), carte par département (petits
effectifs, bruit).

## La question posee, et pour quel lecteur

« Quelles langues un élève trouve-t-il à l'offre de son collège ou de son lycée, selon l'endroit
où il vit ? » — pour un parent, un élu ou un journaliste ; puis, pour le parent, « où trouver
telle langue près de chez moi ? » (exploration).

## La forme retenue, et pourquoi elle sert cette question

1. KPI de part (espagnol, allemand, italien) : trois chiffres suffisent à dire la concentration.
2. Barres horizontales triées, part des établissements par langue (15 premières, tableau complet
   en a11y) : la marche après l'allemand se voit d'un coup d'œil.
3. Carte par académie (`map-aca`) de la part proposant l'allemand : l'histoire est géographique.
4. Barres groupées allemand / italien par académie, triées sur l'allemand, **axe commun 0-100** :
   la comparaison ne passe pas par deux cartes, qui n'auraient pas partagé leur échelle de
   couleurs.
5. Phrases pour le nombre moyen de langues, l'outre-mer et la LV1 : quatre chiffres battent un
   graphique.
6. Exploration : sélecteur de langue (compteurs en établissements) + carte en `require-where`.

## Honnetete de l'echelle

- Unité : l'établissement, compté une fois quel que soit le nombre de niveaux. Jamais la ligne.
- Tous les taux sont des ratios de comptes (établissements proposant / établissements), jamais
  une moyenne de taux ; les agrégats « Sud » et « Antilles-Guyane-Mayotte » sont des ratios de
  sommes.
- Résumé de la carte : `map-summary="weighted"` pondéré par le nombre d'établissements. Il porte
  sur les académies **dessinées** (81,1 %) : Collectivités d'outre-mer et Polynésie, hors
  découpage DSFR Chart, en sont exclues — l'écart d'un point avec la part nationale (80,2 %) est
  écrit sous la carte.
- Barres depuis zéro, axe 0-100 commun aux deux séries.
- Comptes distincts faits dans le navigateur, sur un regroupement exact du portail, et non par
  `count(distinct)` (écarts mesurés jusqu'à +5,8 %).

## Phrase de lecture

« À la rentrée 2024, les 9 743 collèges et lycées recensés proposent tous l'anglais, 96 %
l'espagnol et 80 % l'allemand. Au-delà de ces trois langues, l'offre s'effondre : l'italien dans
30 % des établissements, le chinois dans 6 %. » — calculée (`dsfr-data-repeat`), comme toutes les
phrases de la page.

## Ce qu'on ne montre pas, et qu'il faut dire

- Les élèves : le jeu recense une offre, pas des effectifs (dit en page).
- Le latin et le grec au collège : 5 lignes LCA pour tous les collèges ; exclus du nombre de
  langues vivantes.
- 56 établissements (197 lignes) sans position : comptés dans les parts, absents de la carte
  d'exploration.
- 3 établissements sans académie : comptés au national, absents des vues par académie.
- Libellés « Français », « Américain », « Monégasque » gardés tels quels ; « Grec » = grec ancien.
- Polynésie française (2 établissements) : 50 % sur deux établissements, à lire avec le tableau.

## Ecarts avec l'original

- L'original ne comptait rien et ne montrait aucune géographie de l'offre : la page ajoute
  parts, carte par académie et comparaison allemand / italien.
- Le filtre « Secteur » vide de l'original fonctionne ici ; la légende de carte est tirée du
  rendu.
- La fiche LV1/LV2/LV3/LCA regroupée par établissement n'est pas reproduite : un point par offre,
  avec panneau latéral.
