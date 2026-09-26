# Analyse metier — Label Tourisme & Handicap

> La lecture `dataviz-metier` : le sens avant la syntaxe.
> **Ce fichier n'est jamais ecrase par un script.** Les sorties du modele
> multimodal arrivent dans `constats/` ; ce qui est retenu se reecrit ici, a la main.

Recréation du 2026-09-26 (niveau avancé). Chiffres rejoués sur l'export complet du jeu
(3 708 lignes, mis à jour le 2026-09-02).

## L'histoire trouvée

**Le label suit ses relais locaux plus que la carte du tourisme.** La Charente-Maritime
compte à elle seule 352 établissements labellisés (9,8 % des 3 600 localisés) — seules
2 des 16 régions en comptent davantage (Nouvelle-Aquitaine 1 065, Occitanie 425 ;
Auvergne-Rhône-Alpes 342). À l'inverse, Alpes-Maritimes 18, Haute-Savoie 14, Isère 8 ;
15 départements en comptent 5 ou moins. Les dix premiers départements font 35 %. Les
départements de tête ont un relais local dédié dans le champ `relai_local`
(Charentes Tourisme : 446 labels, Charente + Charente-Maritime ; ADT 64 : 184 ; Touraine : 113).

**Ce que ça renverse** : l'ancienne page disait « d'abord en Nouvelle-Aquitaine » — un tiers
de cette région tient à un seul département. Lecture au mauvais niveau géographique.

**Nuance** : là où il est attribué, le label est large. 70 % des 3 354 établissements
renseignés couvrent les quatre handicaps ; aucun n'en couvre un seul (323 deux, 696 trois,
2 335 quatre). Mental 99 %, auditif 95 %, moteur 86 %, visuel 80 % : le moteur n'est pas
le premier servi, le visuel est le dernier.

Angles écartés : l'évolution dans le temps (date de classement vide à 94 %, avis de
commission datés jusqu'au 2026-12-08, après la mise à jour du jeu) ; les notes (vides).

## La question posee, et pour quel lecteur

Pour un lecteur grand public ou un décideur du tourisme : *où le label existe-t-il vraiment,
et pour quels handicaps ?* — puis, pour la personne en situation de handicap : *quel
établissement près de moi ?* (annuaire conservé en exploration).

## La forme retenue, et pourquoi elle sert cette question

- Régions + premier département sur le même axe (`dsfr-data-concat`, deux colonnes empilées
  pour deux couleurs) : l'écart d'échelle se voit sans calcul.
- Top 20 départements, barres triées, le premier en évidence (`neutral` + `highlight-index`),
  et trois départements touristiques en contrepoint, en texte.
- Quatre barres triées des parts par handicap ; phrase avec la répartition 2/3/4.
- Top 10 activités, barres triées (le meublé de tourisme = 28 %).
- Exploration : recherche, facettes, carte, grille paginée avec pictos (inchangées).

## Honnetete de l'echelle

Axes à zéro. Parts par handicap = ratios de sommes sur les établissements renseignés, qui ne
se somment pas (un établissement compte dans chaque handicap) — dit sous le titre. Le graphique
régions + département ne se somme pas (le département est dans sa région) — dit sous le titre.
Aucun taux : le jeu n'a ni capacité ni fréquentation.

## Phrase de lecture

« Le département de tête, Charente-Maritime, compte à lui seul 352 établissements labellisés,
9,8 % de ceux dont on connaît le département. Sur les 16 régions où le label est présent,
seules 2 en comptent davantage. » — calculée (`dsfr-data-repeat`, jointure sur une constante).

## Ce qu'on ne montre pas, et qu'il faut dire

108 établissements sans localisation (ni département, ni région, ni coordonnées) ; 354 sans
handicaps ni avis de commission (mêmes lignes) ; pas de taux ; pas d'évolution ; pas de notes ;
coordonnées nominatives des référents non chargées. Tous dits en page, chiffres calculés.

## Ecarts avec l'original

L'original est un annuaire sans chiffre de synthèse autre que le compteur ; la recréation
ajoute le récit et garde l'annuaire. Mêmes effectifs par handicap que le portail
(MENTAL 3 311 · AUDITIF 3 174 · MOTEUR 2 893 · VISUEL 2 696). Comparateurs (Alpes-Maritimes,
Haute-Savoie, Isère) : choix éditorial, dit en page.
