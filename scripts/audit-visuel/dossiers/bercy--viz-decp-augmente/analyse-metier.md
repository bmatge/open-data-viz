# Analyse metier — Données essentielles de la commande publique - données enrichies

> La lecture `dataviz-metier` : le sens avant la syntaxe.
> **Ce fichier n'est jamais ecrase par un script.** Les sorties du modele
> multimodal arrivent dans `constats/` ; ce qui est retenu se reecrit ici, a la main.

Recréation du 2026-09-26 (niveau « avancé » : une page). Tous les chiffres ci-dessous rejoués à
l'API `decp_augmente` le même jour.

## L'histoire trouvée

L'original répartit 994 123 lignes par canal, nature et procédure, sans dimension de temps. En
croisant **canal × année de notification**, le jeu raconte autre chose : **la collecte a changé de
canal**.

- AWS-Achat apporte 45 % des lignes en 2019 (87 350 / 192 318), puis s'arrête net : 3 591 lignes
  en décembre 2022, 137 en janvier 2023, 199 sur toute l'année 2023 (contre 72 511 en 2022).
- PES Marchés, le flux des comptables publics, passe de 18 317 lignes (2019) à 81 100 (2022),
  ×4,4, et devient le premier canal en 2022 (35 % de l'année).
- 2019-2022 portent 88 % des lignes (875 609). 2023 n'en a que 87 340 : marche en janvier (départ
  d'AWS-Achat), pente à l'automne, 25 lignes en novembre et 36 en décembre. Le jeu (marqué
  « déprécié ») s'éteint ; la chute de 2023 n'est pas celle des achats publics.

Angles écartés : « la procédure adaptée domine » (vrai — 60 % des lignes renseignées — mais
statique, gardé en nuance) ; « les montants » (inexploitables en somme, voir plus bas) ; « les
acheteurs » (laissé à l'exploration).

## La question posee, et pour quel lecteur

Pour qui veut utiliser les DECP (analyste, journaliste, acheteur, DAJ) : **d'où viennent ces
données, quelle période couvrent-elles vraiment, et que compte une ligne ?** La page répond avant
tout clic, puis laisse filtrer.

## La forme retenue, et pourquoi elle sert cette question

1. Barres mensuelles 2019-2023 + ligne de référence « AWS-Achat cesse de transmettre » (janvier
   2023) : la rupture se voit, datée.
2. Barres groupées canal × année, une seule échelle, deux canaux en couleur (PES Marchés bleu
   France, AWS-Achat orange), API AIFE et les plateformes régionales en gris. Une courbe
   (`type="line"`) a été essayée puis écartée : axe X numérique (« 2018.5 ») et lissage qui
   invente des valeurs entre deux années. Tableau croisé complet des sept canaux en accordéon.
3. Nuance : « une ligne n'est pas un marché », montants (KPI 712 lignes ≥ 1 Md€ = 99,9 % de la
   somme ; médiane ≈ 93 000 €), procédures en barres triées (doublons d'écriture fusionnés).
4. Exploration : facettes serveur + recherche d'acheteur, via un contexte, sur des sources
   distinctes du récit (le récit ne bouge pas quand on filtre).

## Honnetete de l'echelle

Axes à zéro partout. Une seule échelle pour les quatre séries de canaux (barres groupées, pas de
petits multiples à échelles libres). Aucune somme de montants : 712 lignes à 1 Md€ ou plus
portent 99,9 % de la somme (687 227 Md€ sur 688 145 Md€), dont 3 lignes à 100 000 Md€. La part de
la procédure adaptée est un ratio de sommes sur les lignes **renseignées** (579 645 / 966 672),
dit en page. Médiane : `median()` d'Opendatasoft est approchée (93 075,63 puis 93 044,09 sur deux
appels), arrondie au millier.

## Phrase de lecture

Calculée (pivot canal × année → `compute` → `dsfr-data-repeat`) : « En 2019, AWS-Achat apportait
45 % des lignes du jeu. En 2022, le premier canal est PES Marchés, le flux des comptables publics :
81 100 lignes, soit 4,4 fois plus qu'en 2019 et 35 % de l'année. En 2023, AWS-Achat n'envoie plus
que 199 lignes, contre 72 511 l'année précédente. »

## Ce qu'on ne montre pas, et qu'il faut dire

- Unité : des **lignes**, pas des marchés. 753 320 couples identifiant × acheteur pour 994 123
  lignes (export groupé, 37 s, 2026-09-26) ; 9 360 lignes sur des identifiants de remplissage
  (`0000000000000000`, `00`). L'identifiant n'est unique que par acheteur.
- Années : 2 274 lignes avant 2018, 75 après 2023 (2024-2048, erreurs de saisie), 4 777 « nan ».
  Écartées du récit, sélectionnables dans l'exploration.
- Nulls écartés des graphiques : 399 sources, 3 724 natures, 27 451 procédures.
- Aucun total ni ventilation de montants.
- Doublons d'écriture de `procedure` fusionnés dans les graphiques (« Appel d offres » /
  « Appel d'offres » ×2, mojibake « ProcÃ©dure adaptÃ©e ») ; libellés de l'ancien et du nouveau
  code non fusionnés (interprétation juridique). La facette montre les valeurs brutes.
- La cause de l'arrêt du jeu : non avancée.

## Ecarts avec l'original

- La répartition par canal devient une chronologie (canal × année) ; ajout du flux mensuel.
- L'anneau par nature (doublon des barres) disparaît ; nature reste en barres dans l'exploration.
- L'acheteur passe d'une liste de facettes à une recherche « contient » (`dsfr-data-search context`).
- Le 5e graphique masqué de l'original (`libelleregionacheteur`) reste absent : champ inexistant.
