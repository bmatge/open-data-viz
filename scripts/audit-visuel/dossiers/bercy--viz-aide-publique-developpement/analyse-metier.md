# Analyse metier — L'aide publique au développement de la France

> La lecture `dataviz-metier` : le sens avant la syntaxe.
> **Ce fichier n'est jamais ecrase par un script.** Les sorties du modele
> multimodal arrivent dans `constats/` ; ce qui est retenu se reecrit ici, a la main.

Recréation du 2026-09-26, niveau avancé (une page).

## L'histoire trouvée

**En 2020, l'APD française gagne 1,49 Md€ (10,9 → 12,4 Md€ en équivalent-don, +14 %) ; les prêts
en font 79 %, les dons +54 M€ seulement.** Or un euro prêté ne compte que 45 centimes d'APD
(15,6 Md€ versés → 7,0 Md€ d'équivalent-don, 2018-2020). Figures : le changement (2020), le
mécanisme (l'équivalent-don), puis deux nuances — les prêts vont aux pays à revenu intermédiaire
(PRITI : 5,9 Md€ reçus, 54 % en prêts ; PMA : 3,7 Md€, 26 %) ; et 60 % de l'APD ne se rattache à
aucun pays (40 % multilatéral, 21 % régional ou non ventilé).

Chiffres rejoués à l'API le 2026-09-26 (export agrégé `apd-france`, `type_de_flux = 'APD'`) et
au navigateur (chapô, KPI, phrases de lecture, infobulle 2020 : 8,87 / 3,07 / 0,12 / 0,34 Md€).

**Ce qui renverse la page précédente.** Elle ouvrait sur « 44,9 Md€ versés » : une somme qui
mêle 2,6 Md€ de flux qui ne sont pas de l'APD (« AASP hors crédits-export », « non-apports »)
et des prêts à leur valeur faciale. La mesure officielle du CAD depuis 2018 est l'équivalent-don :
33,6 Md€ sur trois ans. Et sa note « 46 % des montants sans pays » sous-estimait le trou :
en équivalent-don APD, **60 %** n'ont pas de pays.

## La question posee, et pour quel lecteur

Lecteur grand public ou parlementaire : « la France a-t-elle augmenté son aide, et comment ? »
Réponse : oui, surtout en prêtant, et vers les pays à revenu intermédiaire.

Angles écartés : le classement des pays (fait par le tableau en exploration, pas un message) ;
les secteurs et les ODD (treize graphiques de l'original, aucun ne répond à une question) ;
les marqueurs (genre, climat) — faute de temps de vérification de leur codage (0/1/2), non retenus.

## La forme retenue, et pourquoi elle sert cette question

- Preuve : barres horizontales triées de la **variation 2019-2020 par instrument**, une seule
  série, prêts mis en évidence (`selected-palette="neutral"` + `highlight-index`). Pas de
  `color-map` : BUG-022.
- Contexte : barres empilées par année (dons stables, prêts variables) — multisérie en palette
  par défaut, pour que l'infobulle ne mente pas (BUG-022 ; elle ne nomme pas les séries, AM-086).
- Mécanisme : avant/après (15,6 Md€ versés → 7,0 Md€ comptés) puis barres 0-100 « pour 100 €
  versés, combien comptent ».
- Nuance : part des prêts par catégorie de revenu, catégories rangées du plus pauvre au plus
  riche, montant reçu dans le libellé.
- Destination : trois barres (multilatéral / régional / pays), pour dire ce que la carte ne peut
  pas montrer avant de la montrer.
- Exploration : facettes (année, instrument, revenu) → deux KPI, carte `map-monde`, tableau triable.

## Honnetete de l'echelle

Axes à zéro ; barres 0-100 bornées pour les parts ; aucune moyenne de taux (toutes les parts
sont des ratios de sommes calculés après agrégation) ; résumé de carte désactivé
(`map-summary="none"`) : la somme des pays dessinés n'est ni le total de la sélection ni celui
des pays.

## Phrase de lecture

« De 2019 à 2020, l'aide française gagne 1,49 milliard d'euros en équivalent-don. Les prêts en
apportent 79 %, les allègements de dette 22 % ; les dons presque rien. » — calculée
(`dsfr-data-repeat` sur la ligne de synthèse).

## Ce qu'on ne montre pas, et qu'il faut dire

- 2,6 Md€ versés hors APD (2 098 lignes), écartés partout — dit et chiffré en page (calculé).
- Montants versés : lisibles dans le tableau, pas en tête.
- 19 pays et territoires sans forme sur le fond `map-monde` (Wallis-et-Futuna 225 M€, Maurice
  198 M€, Comores 58 M€, Kosovo…, ~0,5 Md€ au total) : dit sous la carte, présents au tableau.
- Autres pays à faible revenu (10,6 M€) hors du graphique par revenu.
- Garanties (404 lignes à zéro), remboursements non soustraits, rien après 2020 (jeu figé au
  3 août 2022, 2021 jamais publiée).

## Ecarts avec l'original

Mesure : équivalent-don au lieu de montants versés, flux hors APD écartés. Treemap ODD, secteurs,
canaux et camemberts non repris (éditorial). Filtre agence retiré : il servait l'exploration
d'un axe du jeu, pas le récit — le tableau et les facettes gardent année, instrument, revenu.
