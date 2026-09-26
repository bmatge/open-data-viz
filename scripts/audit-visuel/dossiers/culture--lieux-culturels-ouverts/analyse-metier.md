# Trouver un lieu culturel ouvert : la fiche muette — analyse métier

Création (pas d'original). Page : `public/culture/lieux-culturels-ouverts.html`, URL
`/culture/lieux-culturels-ouverts`. Cadrage : fiche 12 de `docs/portail-culture/proposition.md`.
Niveau dataviz-metier : avancé (page explorateur, « martini glass inversé » : trois repères, puis la
recherche). La page Basilic (fiche 11, `lieux-culturels`) compte les lieux ; celle-ci aide à en
trouver un. Les deux bases ne s'additionnent pas.

## Le jeu

« Base des lieux culturels ouverts » (ministère de la Culture), jeu data.gouv
`68f89f4286ea08466bdef24a`, ressource Tabular `4bd1a20e-4dfd-40ff-bd4d-c714f7085de8`, 36 392
lignes, 50 colonnes, mise à jour quotidienne (dernière : 2026-09-26T17:06). Alimentée à l'origine par
les jeux spécialisés du ministère, puis par des contributions en ligne modérées
(basedeslieux.culture.gouv.fr). Export Parquet 11 Mo, dont 3,7 Mo pour la seule `description`.

`accessible_au_public` vaut `["ouvert"]`, `["fermé"]`, `["ouvert","accès handicap moteur"]`… ou
rien. **« Ouvert » = accessible au public**, pas « ouvert en ce moment » : aucun horaire publié.

## L'histoire

Question : « Qu'est-ce qui est ouvert près de chez moi ? » Lecteur : habitant, visiteur.
La donnée répond mal : **deux fiches sur trois ne disent pas si le lieu est accessible**. C'est
l'histoire retenue, et l'explorateur reste le cœur de la page (chaque fiche mène au formulaire de
contribution du ministère, `basedeslieux.culture.gouv.fr/lieux/{id}` — vérifié : 200 et formulaire
prérempli pour un id réel, 302 pour un id inventé).

Chiffres rejoués le 2026-09-27 sur l'export Parquet complet (DuckDB), relus identiques à
l'affichage (Playwright) :

| Mesure | Valeur |
|---|---|
| Lieux | 36 392 |
| « ouvert » dans `accessible_au_public` (casse ignorée) | 11 242 (30,9 %) |
| « fermé » sans « ouvert » / les deux | 223 / 2 |
| Statut renseigné / muet | 11 465 (31,5 %) / 24 927 (68,5 %) |
| Accès handicap moteur déclaré | 4 890 (13,4 %) |
| `conditions_ouverture` renseignée | 11 055 |
| Lecture, livre et presse (un lieu compté dans chacun de ses domaines) | 2 808 / 15 379 = 18,3 % |
| Éducation / Cinéma / Patrimoine / Archives | 32,9 / 40,6 / 40,7 / 48,7 % |
| Arts du spectacle / Arts visuels | 74,8 % / 99,2 % (352 / 355) |
| Lecture : part issue du Service du livre et de la lecture | 14 805 / 15 379 (96 %) → « bibliothèques pour l'essentiel » |
| Normandie (région > 1 000 lieux la plus renseignée) | 1 216 / 1 858 = 65,4 % |
| Auvergne-Rhône-Alpes (la moins renseignée) | 1 185 / 4 954 = 23,9 % |
| DROM + Corse (hors graphique) | Réunion 81 %, Guadeloupe 73 %, Martinique 70 %, Guyane 67 %, Mayotte 67 % (8/12), Corse 28 % |
| Sans région | 69 (NC 24, étranger 31, St-Barth 4, SPM 4, PF 3, St-Martin 1, Wallis 1, 1 vide) |
| Recherche « Arles » (début de mot, nom/commune/adresse) | 38 (recalcul indépendant : 38) |

## Écart au cadrage

- Titre provisoire : « 36 392 lieux ouverts au public, avec leurs conditions d'ouverture ». **Faux** :
  les conditions manquent pour 25 337 lieux. Titre final : « Trouver un lieu culturel : deux fiches
  sur trois ne disent pas si l'on peut y entrer ».
- Premier jet : « les bibliothèques, premier contingent de la base ». **Faux** une fois un lieu compté
  dans chacun de ses domaines (Patrimoine 16 697 > Lecture 15 379). Titre de bloc réécrit.
- Le cadrage prévoyait `{{#each}}` sur les champs tableau « si l'API les rend en tableau » : le
  Parquet les rend en **texte JSON**, parfois concaténé (`["Patrimoine"],["Patrimoine"]`, 2 851
  lignes). Liste reconstruite par `contains()`.

## La forme

1. Chapô et trois KPI calculés (total, % ouverts, % muets).
2. Preuve : barres horizontales triées, % de fiches renseignées par domaine, échelle 0-100,
   « Lecture » mise en évidence (en tête par le tri croissant). Taux, pas volumes : le patrimoine a
   plus de fiches renseignées en nombre, mais c'est la part qui dit l'écart.
3. Nuance : même mesure par région, limitée aux régions de plus de 1 000 lieux (petits effectifs
   écartés du graphique, listés en toutes lettres dessous). Phrase prudente : l'écart mesure la
   complétude des fiches, pas l'accès réel, et le fichier ne permet pas de l'attribuer.
4. Encadré « ouvert veut dire accessible au public ».
5. Explorateur : recherche (début de mot, pour que « Arles » ne ramène pas « Charles »), facettes
   domaine / accès / conditions / accessibilité / région / département, KPI de la sélection, carte à
   grappes colorée par statut, fiches paginées avec liens et « Compléter ou corriger cette fiche ».
6. Ce qu'on ne montre pas, puis analyse.

## L'honnêteté

- Une fiche muette n'est pas un lieu fermé : gris, jamais présumé.
- Les 223 lieux « fermés » restent (violet) : les retirer ferait passer une fermeture pour une absence.
- Couleurs des points choisies **hors** du bleu et du rouge des grappes (fixés par la bibliothèque),
  sinon une grappe se lirait « ouvert » ou « fermé ». Phrase d'aide sous la carte.
- Domaines non additifs : dit sous le graphique.
- Liens : les éléments sans schéma reçoivent `https://` ; ceux en `http://` restent tels quels. Dit.

## Phrase de lecture

« 15 379 lieux relèvent de "Lecture, livre et presse", bibliothèques et médiathèques pour
l'essentiel. C'est le domaine où la fiche dit le moins souvent si le lieu est ouvert : 18 % des cas. »

## Ce qu'on ne montre pas

Horaires (absents de la base) ; valeur des fiches muettes ; densité par habitant ; Basilic ;
descriptions, téléphones, courriels (non chargés) ; 69 lieux hors régions (hors graphique et hors
encarts).

## Angles écartés

- Série temporelle des contributions : `date_creation` vide pour 14 116 lignes, et `date_modification`
  mêle imports et contributions — rien d'attribuable.
- Par source d'origine : 590 vides et des listes concaténées ; utile au producteur, pas à l'habitant.
