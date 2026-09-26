# Analyse metier — Etablissements labellisés Euroscol

> La lecture `dataviz-metier` : le sens avant la syntaxe.
> **Ce fichier n'est jamais ecrase par un script.** Les sorties du modele
> multimodal arrivent dans `constats/` ; ce qui est retenu se reecrit ici, a la main.

## La question posee, et pour quel lecteur

Quels établissements portent le label Euroscol, et le label est-il réparti également ?
Lecteur : décideur académique, DAREIC, grand public curieux — l'explorateur d'un établissement
(monter un projet avec lui) est servi en section 4.

## L'histoire trouvée (recréation du 2026-09-26)

Toutes les valeurs rejouées à l'API le 2026-09-26 (Euroscol mis à jour le 2026-02-02 ;
annuaire lu en direct, publics + privés sous contrat, hors contrat exclu, dédoublonné).

- **La concentration (un label de lycée)** : 782 lycées labellisés sur 5 071 (15,4 %),
  466 collèges sur 8 615 (5,4 %), 410 écoles sur 47 167 (0,9 %).
- **L'écart entre académies** : 9,3 % des collèges et lycées labellisés en moyenne
  (1 248 / 13 479, 30 académies), de 22,1 % en Corse (15/68) à 0,9 % en Guadeloupe (1/112).
  À taille comparable (plus de 500 collèges et lycées) : Orléans-Tours 15,7 % (87/555),
  Lyon 2,6 % (16/623) — six fois moins.
- **Le paradoxe (nuance)** : l'éducation prioritaire est SUR-représentée chez les labellisés —
  17,8 % des collèges labellisés sont REP/REP+ contre 12,8 % de l'ensemble des collèges
  (1 104/8 615) ; 22,4 % des écoles labellisées contre 13,9 % (6 551/47 167).
- **Trouvailles qui renversent la page précédente** :
  1. « Lille 149, Mayotte 1 » classait des tailles d'académie. En taux, Lille est au milieu
     (10,2 %), Poitiers (21,2 %) et la Corse en tête.
  2. « section européenne 573 des 1 672, soit 34 % » : le drapeau n'est renseigné QUE pour les
     lycées (0 collège, 0 école — idem dans l'annuaire). La part réelle est 573/782 = 73 %.

## La forme retenue, et pourquoi elle sert cette question

1. Trois KPI de taux (lycées, collèges, écoles) avec « un sur N » : l'accroche, trois nombres.
2. Barres horizontales triées, taux par académie (30) : le classement EST le message ; un taux,
   pas un volume.
3. Barres groupées labellisés / ensemble (couleur vs gris) pour l'éducation prioritaire : deux
   niveaux, deux populations — l'écart se voit sans lire.
4. Une phrase pour les sections des lycées (trois nombres : le texte bat le graphique).
5. Exploration : recherche, facettes (dont les six drapeaux repliés par `fold`), carte, liste.

## Honnetete de l'echelle

- Taux = ratio de sommes (numérateur Euroscol / dénominateur annuaire), jamais moyenne de taux ;
  moyenne nationale = somme des labellisés / somme des établissements des 30 académies.
- Dénominateur académique = compte distinct d'UAI fait dans le navigateur ; le
  `count(distinct)` de l'API est faux à cette échelle (Versailles 1 011 pour 981, PG-026).
- Barres à zéro (défaut des barres) ; petites académies signalées (< 120 collèges et lycées).
- Numérateur et dénominateur viennent de deux jeux : 19 labellisés n'ont pas d'UAI ouvert dans
  l'annuaire (9 lycées, 1 collège, 9 écoles) — ratio de comptes, dit en note.

## Phrase de lecture

« Parmi les académies de plus de 500 collèges et lycées, Orléans-Tours en labellise 15,7 %
(87 sur 555) ; Lyon, 2,6 % (16 sur 623) — 6 fois moins. » — calculée (`dsfr-data-repeat` sur
`gd-c`, deux `limit="1"` joints sur une clé constante).

## Ce qu'on ne montre pas, et qu'il faut dire

- Quatre académies/vice-rectorats sans aucun labellisé (Nouvelle-Calédonie, Polynésie,
  Wallis-et-Futuna, Saint-Pierre-et-Miquelon) : hors du classement (jointure `inner`), dit en note.
- EREA (7) et « Autre » (7) : sur la carte, pas dans les taux par niveau.
- Pas de millésime d'attribution : aucune évolution.
- `caracteristiques_du_choix_de_cet_etablissement` : 100 % vide.
- Pourquoi les académies diffèrent : le jeu ne le dit pas, la page ne l'avance pas.

## Ecarts avec l'original

- Taux rapportés à un second jeu (annuaire), absents de l'original.
- Deux graphiques et trois KPI de taux ; l'original n'a qu'une carte et un compteur figé.
- Carte : couleurs recadrées sur les trois niveaux du récit (lycée en bleu France) ; EREA et
  Autre en repli gris.
