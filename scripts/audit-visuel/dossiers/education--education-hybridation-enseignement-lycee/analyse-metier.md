# Analyse metier — Hybridation de l’enseignement en lycée

> La lecture `dataviz-metier` : le sens avant la syntaxe.
> **Ce fichier n'est jamais ecrase par un script.** Les sorties du modele
> multimodal arrivent dans `constats/` ; ce qui est retenu se reecrit ici, a la main.

## L'histoire trouvée (recréation du 2026-09-26)

Relevé à l'API le 2026-09-26 (19 collectivités, données traitées le 2026-01-29) :

- **La part de l'État est une règle, pas une variable.** 13 collectivités sur 19 sont à
  50,00 % exactement, 15 à 49,5 % ou plus. En dessous : Île-de-France (46,1 %),
  Auvergne-Rhône-Alpes (46,1 %), Hauts-de-France (40,1 %) — **les trois plus grosses
  dépenses du dispositif** — et Saint-Pierre-et-Miquelon (47,0 %). Taux national : 46,6 %
  (ratio de sommes, 13,95 M€ / 29,90 M€).
- **La variable, c'est la dépense des collectivités rapportée aux classes** : 616 € par
  classe au national (29,90 M€ / 48 559 divisions), de **1 408 € en Île-de-France** à
  **121 € en Occitanie** (5 906 classes), soit 11,6 fois moins. PACA : 141 €.
- Conséquence : la subvention **suit** la dépense (la moitié de chaque euro), elle ne corrige
  pas les écarts entre régions.

**Ce que ça renverse.** La reproduction précédente écrivait « le taux varie fortement d'une
région à l'autre » : faux, il vaut 50 % pour 13 collectivités sur 19. Elle mettait aussi en
avant la subvention par lycée, qui pèse autant un lycée de 7 classes qu'un de 60.

## La question posee, et pour quel lecteur

« L'État a-t-il aidé toutes les régions de la même façon à équiper leurs lycées ? » — pour un
lecteur non spécialiste (élu, journaliste, parent). Réponse : oui en proportion, non en
volume par classe, parce que la dépense des régions diffère d'un facteur dix.

## La forme retenue, et pourquoi elle sert cette question

1. **Barres horizontales empilées, triées, par classe** : part de l'État (foncée) + part de la
   collectivité (claire). Un seul graphique porte les deux messages : les deux moitiés sont
   égales presque partout, la longueur totale varie de un à dix. Ligne de référence = dépense
   nationale par classe, calculée.
2. **Tags + barres grisées du taux**, rangées par dépense décroissante : les exceptions sous la
   moitié sont en tête, ce qui montre qu'elles sont les plus grosses dépenses.
3. **Choroplèthe de la dépense par classe** (et non du montant, qui mesure la taille) sur le
   `geo_shape` du jeu, bornes 200/400/600/1 000 posées après lecture de la distribution.
4. **Exploration** : recherche + facettes + liste des 1 713 lycées listés.

## Honnetete de l'echelle

- Barres à zéro. Taux national et dépense nationale par classe en **ratio de sommes**
  (KPI `a:sum / b:sum`, query `group-by="k"` + `compute`), jamais en moyenne des 19 ratios.
- Seuil « la moitié » = 49,5 % : choix d'auteur, écrit en note.
- Petits dénominateurs outre-mer (SPM 7 classes, Wallis-et-Futuna 17, Saint-Martin 77) :
  gardés, mais aucune phrase ne s'appuie sur eux ; le dire en note.

## Phrase de lecture

« En Île-de-France, la collectivité a dépensé 1 408 € par classe de lycée ; en Occitanie,
121 €, pour 5 906 classes. Dans presque toutes les barres, la subvention de l'État égale la
part de la collectivité : la subvention suit la dépense, elle ne la corrige pas. » —
calculée (`dsfr-data-repeat` sur la jointure France × plus forte × plus faible).

## Ce qu'on ne montre pas, et qu'il faut dire

- Territoires absents du jeu : Normandie, La Réunion, Nouvelle-Calédonie, Polynésie,
  Saint-Barthélemy (non-signature ou ligne manquante : le jeu ne le dit pas).
- Liste des lycées incomplète : 1 713 listés pour 1 803 déclarés ; PACA (82) et
  Wallis-et-Futuna (1) n'ont aucun lycée au jeu de détail — calculé en page par jointure
  à gauche + `isnull`.
- « Dépense réalisée » = dépense déclarée au titre de la mesure, pas l'effort numérique total ;
  aucune période ni date de dépense dans le jeu.
- Pas de montant par lycée.

## Ecarts avec l'original

- L'original colore le **montant** de subvention (taille des régions) ; la page colore la
  dépense par classe.
- La couche « lycées au zoom 7 » devient une recherche + liste (chercher un lycée plutôt que
  zoomer) ; le manque de PACA, invisible dans l'original, est nommé.
- Les sept territoires ultramarins présents sont en encarts (l'original les laissait hors cadre).
