# Analyse metier — Accessibilité des équipements sportifs

> La lecture `dataviz-metier` : le sens avant la syntaxe.
> **Ce fichier n'est jamais ecrase par un script.** Les sorties du modele
> multimodal arrivent dans `constats/` ; ce qui est retenu se reecrit ici, a la main.

## L'histoire trouvée (recréation du 2026-09-26, niveau avancé)

**Le recensement ne sait dire que « oui ».** Les colonnes `equip_pmr_*` / `equip_pshs_*`
(`true`/`false`, zéro null) dérivent de deux listes à cases à cocher,
`equip_acces_handi_mobilite` et `equip_acces_handi_sensoriel`, qui sont **nulles quand
aucune case n'est cochée**. La documentation du producteur : une case se coche « si et
seulement si » l'accès est autonome — il n'existe ni case « non », ni « ne sait pas ».
`false` mélange donc « déclaré non accessible » et « jamais renseigné ».

Relevé à l'API le 2026-09-26 (333 695 lignes, fiche la plus récente au 25/09/2026) :

| Handicap moteur, aire de pratique | Équipements | Part |
|---|---|---|
| Aire cochée accessible | 173 167 | 51,9 % |
| Autre case cochée, pas l'aire | 20 105 | 6,0 % |
| Aucune case cochée | 140 423 | 42,1 % |

- Sur les 160 528 « non accessibles », **87,5 % n'ont coché aucune case**.
- Sensoriel : 4,2 % d'aires cochées, **81,8 % de fiches vides** (273 052).
- Cohérence vérifiée : liste nulle ⇔ les sept booléens moteur à `false` (140 423 lignes dans
  les deux sens ; zéro liste non nulle sans aucun `true`).
- **Régions** : l'écart d'accessibilité est un écart de fiches vides. Bretagne 63,0 %
  accessibles / 34,7 % vides ; Centre-Val de Loire 33,0 / 64,2 ; Nouvelle-Calédonie 18,7 / 75,6.
  Même dans la région où le silence pèse le moins (Hauts-de-France), 75,5 % des « non
  accessibles » n'ont coché aucune case.
- **Familles** : salles multisports 80,1 % accessibles ; « Divers équipements Sports de
  nature » (42 134 équipements) 94,9 % de fiches vides — 28,5 % de toutes les fiches vides du
  jeu à elle seule.

**Ce que ça renverse** : la page précédente écrivait « Le troisième état n'existe pas… zéro
null… la légende grise ne peut jamais s'allumer ». Vrai des booléens, faux du jeu : le null
est une colonne plus haut. La légende « Pas d'information (gris) » de l'original décrivait
une réalité qui pèse 42 % du parc.

## La question posee, et pour quel lecteur

Pour un lecteur grand public ou un élu : « Quelle part des équipements sportifs est
accessible en situation de handicap ? » — et la réponse honnête : on sait combien se
déclarent accessibles (un plancher), pas combien ne le sont pas.

## La forme retenue, et pourquoi elle sert cette question

- Accroche : quatre KPI de poids différents (aire accessible moteur en `span="6"`, fiches
  vides moteur, et les deux mêmes en sensoriel).
- Preuve : barres empilées à 100 %, deux barres (moteur, sensoriel), trois états. Le gris
  (aucune case) est la couleur du message.
- Nuance 1 : les mêmes barres par région, triées par part accessible — le gris grandit
  exactement à mesure que le vert diminue, la part intermédiaire reste mince.
- Nuance 2 : les mêmes barres par famille d'équipement.
- Exploration : facettes région/famille (contexte, URL), treize critères en barres groupées
  moteur/sensoriel, carte à trois couleurs sur l'état calculé.
- Conclusion en `fr-callout`, « ce que la page ne montre pas », hypothèses et angles écartés.

## Honnetete de l'echelle

- Parts = ratios de sommes (`oui__sum / n__sum`), jamais de moyenne de taux régionaux.
- Barres empilées à 100 %, axe à zéro. Défaut : l'axe des valeurs monte à 120 sur les
  graphiques région / famille (DSFR Chart passe `x-max` en `suggestedMax`, et la somme
  flottante des parts arrondies dépasse 100 de quelques ε). Aucune donnée n'est déformée.
- Les territoires de moins de 500 équipements (5, 588 équipements) sont exclus du graphique
  régional et comptés en page.

## Phrase de lecture

« Sur les 333 695 équipements sportifs recensés au 25/09/2026, 52 % ont une aire déclarée
accessible en fauteuil ; pour 42 %, aucune case d'accessibilité n'a été cochée — et 87 % des
équipements dits non accessibles sont en fait des fiches vides. » Calculée en page
(`dsfr-data-repeat`), jamais écrite en dur.

## Ce qu'on ne montre pas, et qu'il faut dire

- 1 005 équipements sans région (dans les chiffres nationaux, hors graphique régional).
- Aucun nombre d'installations : `count(distinct inst_numero)` est approximatif sur ce portail.
- Aucun « non accessible » : le formulaire ne le permet pas.
- Pas d'évolution : `equip_maj_date` n'est exploitable qu'après avril 2025 (producteur).
- Angles écartés, écrits en page : périodes de mise en service (pas de hausse après 2005 —
  1995-2004 à 47,7 %, après 2005 à 55,9 %, 1965-1974 à 59,1 % — mais composition des
  familles non ajustée) ; classement régional de l'accessibilité (il classerait la complétude).

## Ecarts avec l'original

- Trois états au lieu de deux : la part « aucune case » est rendue visible.
- Les quinze jauges deviennent un graphique de treize critères qui suit les filtres
  (valeurs France identiques à l'original : 52/23/26/45/32/22/42 · 4/2/4/4/24/2).
- Installations (jauges circulaires) retirées : compte approximatif côté portail.
- Carte : une couche à trois couleurs sur l'état calculé, qui suit les filtres.
