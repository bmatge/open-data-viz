# Analyse métier — Quelles personnalités ont donné leur nom aux écoles ?

> La lecture `dataviz-metier` : le sens avant la syntaxe.
> **Ce fichier n'est jamais écrasé par un script.** Les sorties du modèle
> multimodal arrivent dans `constats/` ; ce qui est retenu se réécrit ici, à la main.
>
> Recréation du 2026-09-26, niveau **avancé** (une page). Chiffres rejoués à l'API
> `data.education.gouv.fr` (`effectifs-deleves-par-ecole-copie0`, 809 225 lignes, `modified`
> 2026-06-02) ; page chargée au navigateur (Playwright, dsfr-data 0.42.0, 0 erreur console,
> 0 HTTP ≥ 400).

## L'exploration, et l'histoire trouvée

1. **Parts par rentrée et par genre** (`group_by year(rentree_scolaire), sexe_ou_genre`) : la
   part féminine passe de 18,7 % (2009) à 20,0 % (2024). En apparence, une lente progression.
2. **La série est fausse avant 2019.** Le nombre d'écoles à nom féminin chute de 2 258 (2018) à
   2 111 (2019) puis remonte. En suivant des noms datés : **SAMUEL PATY** nomme 5 écoles de 2009
   à 2018, 0 de 2019 à 2021, puis 3, 6, 7 ; **GISELE HALIMI** 4 de 2009 à 2018, 0 en 2019. Les
   mêmes `numero_de_l_ecole` portent le nom dès 2009 (ex. 0030697S, Buxières-les-Mines). Les
   rentrées 2009-2018 portent donc les patronymes d'un **instantané récent recopié en arrière** ;
   seules les rentrées 2019+ ont leur nom de l'année. L'ancienne page proposait un filtre
   2009 / 2015 / 2020 / 2024 qui laissait lire une histoire que le jeu ne contient pas.
3. **Stock contre flux, 2019 → 2024** (pivot par patronyme) :
   - stock 2024 : 2 297 écoles à nom féminin sur 11 461 = **20,0 %** (18,5 % en 2019) ;
   - gains nets par nom : **267** écoles pour des noms de femmes sur **554** = **48,2 %** ;
   - pertes nettes : **81** sur **518** = **15,6 %**.
   Le stock reste masculin, le flux est presque paritaire : c'est l'histoire.
4. **Concentration** : SIMONE VEIL passe de 120 à 193 écoles (+73, 27 % des gains féminins) ;
   sans elle, les gains féminins restent à 40,3 % (194 / 481), le double du stock. Les pertes
   touchent les grands noms masculins : JACQUES PREVERT −27, JULES FERRY −13, ANATOLE FRANCE −8.

**Angles écartés** : « qui ? » (le palmarès seul, angle de l'original et de l'ancienne page —
conservé en bloc secondaire) ; métiers et nationalités Wikidata (n'éclairent pas la question) ;
l'évolution 2009-2024 (fausse, voir 2).

## La question posée, et pour quel lecteur

« Les écoles françaises honorent-elles davantage de femmes qu'avant ? » — pour un lecteur
grand public, élu ou journaliste : la page répond avant qu'on clique (chapeau et quatre KPI),
puis laisse chercher un nom.

## La forme retenue, et pourquoi elle sert cette question

- **Quatre KPI** : stock 2024 (20,0 %), part féminine des gains (48,2 %), des pertes (15,6 %),
  et la base (11 461 écoles). Le contraste stock / flux se lit en un coup d'œil.
- **Barres 2019-2024 de la part féminine, axe 0-60 %, parité à 50 % marquée** : la lenteur
  du stock et la distance à la parité. (Une ligne a été essayée : DSFR Chart met l'année en axe
  linéaire, graduations « 2019,5 » ; les barres partent de zéro et règlent les deux.)
- **Barres horizontales triées des 15 plus forts gains**, femmes en bleu France, hommes en gris
  (une série par genre, `stacked`) : la preuve du flux.
- **Nuance** en phrases calculées (poids de Simone Veil, trois plus fortes pertes, solde net).
- **Palmarès 2024 (top 20)**, même code couleur : le stock reste masculin.
- **Tableau** de tous les noms (2019, 2024, écart), recherche, filtre par genre, export.

## Honnêteté de l'échelle

- Toutes les parts ont le même dénominateur : les écoles dont le patronyme est rattaché à une
  personne de genre connu (11 461 en 2024). Dit dans le chapeau et dans « ce qu'on ne montre pas ».
- Parts calculées en ratio de sommes (KPI `gain:sum{…} / gain:sum`), jamais en moyenne de parts.
- Axe des barres à zéro. Aucun chiffre de texte recopié : chapeau, lectures, nuances et
  réserves passent par `dsfr-data-repeat`.
- **Biais du rapprochement Wikidata, découvert en recréant** : parmi les écoles « sans personne
  identifiée », PAUL LANGEVIN (160), JEAN MACE (148), PAUL BERT (120), PIERRE ET MARIE CURIE (90).
  Le palmarès identifié omet donc des noms masculins qui y figureraient (Langevin et Macé devant
  Louise Michel, 140). La page le dit sous le palmarès. L'effet sur le flux n'est pas mesuré.

## Phrase de lecture

« À la rentrée 2024, 20,0 % des écoles au nom d'une personne identifiée portent celui d'une
femme ; la part n'a gagné que 1,6 point depuis 2019. Mais parmi les noms qui ont gagné des
écoles entre 2019 et 2024, 48 % sont des noms de femmes, et 16 % seulement parmi ceux qui en
ont perdu. »

## Ce qu'on ne montre pas, et qu'il faut dire

- Rentrées 2009-2018 (patronymes recopiés en arrière ; preuve calculée : Samuel Paty en 2009).
- 35 952 écoles sans personne identifiée en 2024 (75,8 %), dont 10 354 au tiret « - ».
- Personnes plutôt qu'écoles : 485 noms féminins sur 2 821 (17,2 %).
- Solde net par nom : renommages internes et changements de graphie invisibles ou comptés à tort
  (SAINT-EXUPERY −7 / ANTOINE DE SAINT EXUPERY +5).
- Variantes non regroupées (JEANNE D'ARC / JEANNE D ARC ; JOLIOT-CURIE compté féminin).
- Métiers, nationalités, dates Wikidata non exploités.

## Écarts avec l'original

- L'original ne donne aucune part féminine ni aucune évolution ; la page recréée en fait son
  sujet, sur 2019-2024 seulement.
- Radars, courbe des naissances et nationalités écartés (hors question).
- Le filtre d'année de l'ancienne page est retiré : avant 2019, il ne filtrait pas une histoire.
