# Analyse métier — D'où viennent les déchets (D7, portail Développement durable)

Page : `/developpement-durable/dechets` — création, pas de page d'origine.
Jeux SDES (DiDo) : production et traitement des déchets (jeu 38, `6622107a…`) — fichiers
`4ffeb0da-…` (production, large par secteur NACE) et `fda380ad-…` (traitement, large par mode) ;
ITDD départemental (jeu 23) `aa011e5d-…`, filtré `VARIABLE=in:dma_qhab,taux_val_dechets`.
Niveau dataviz-metier : avancé.

## L'histoire

**Titre-message** : « Sept déchets sur dix viennent du bâtiment, moins d'un sur dix des ménages ».

Rejoué à l'API le 2026-09-26 (exports `/json` complets, dernier millésime) :

- 2022 : **343,2 Mt** produites ; construction (NACE 41-43) 247,4 Mt = **72,1 %** ; ménages
  31,3 Mt = **9,1 %** (un sur onze, d'où « moins d'un sur dix ») ; ratio 7,9 ; tous les autres
  secteurs 64,4 Mt. Somme des 19 colonnes = total publié (vérifié).
- **L'histoire que le cadrage n'avait pas** : la catégorie « Terres » pèse **170,1 Mt, 49,6 %** de
  tous les déchets (48,3 % en 2016, stable), dont 166,7 Mt produits par la construction (67 % de
  ses déchets). Terres + déchets minéraux de C&D (71,4 Mt) = 70 % du total. C'est la terre de
  chantier qui fait la place du bâtiment.
- Déchets dangereux : 11,4 Mt, 3,3 %.
- Ménages : 16,2 Mt de « déchets ménagers et similaires » sur 31,3 (52 %) ; déchets végétaux 4,8
  (15 %, « un sixième ») ; gravats 3,4 ; verre 1,9 ; papiers 1,5.
- Traitement : 295,1 Mt traitées en 2022. Décharge 82,1 Mt (27,1 %, 2016) → 87,1 (2018) → 56,7
  (2020) → **59,0 (20,0 %)** ; remblayage 31,5 → **56,6 Mt** (10,4 % → 19,2 %) ; recyclage
  54,9 % → 52,3 %. Terres en décharge 43,4 → 29,0 Mt : 14,4 des 23,1 Mt de recul.
- Production par année : 320,3 / 341,1 / 307,3 (2020, point bas) / 343,2.
- ITDD 2021, DMA par habitant : Landes 1 110, Côtes-d'Armor 941, Var 869 … Hauts-de-Seine 397 ;
  99 départements sur 101 (Guyane, Mayotte null). Taux de valorisation matière et organique :
  Lozère 99,9 %, Vendée 86,6 % … Martinique 22,2 %.

## La forme

1. Chapô calculé + 4 KPI (total, part construction, part ménages, part terres).
2. Preuve : barres horizontales triées, 8 familles de secteurs (19 postes NACE regroupés par
   `compute`, regroupement écrit sous le graphique), construction et ménages en évidence
   (`selected-palette="neutral"` + `highlight-index="[0, 1]"`).
3. Révélation : les 8 catégories de déchets les plus lourdes (sur 33), terres en évidence.
4. Nuance ménages : les 8 catégories les plus lourdes chez les ménages ; encadré « trois notions
   voisines » (déchets des ménages / déchets ménagers et similaires / DMA).
5. Où ils vont : barres empilées par année, 5 traitements ; titre « la décharge recule, le
   remblayage prend sa place ».
6. Exploration : carte départementale DMA kg/hab (dernière année lue dans la donnée par
   `unpivot` + tri), `map-summary="none"`, tableau triable avec le taux de valorisation.
7. Ce qu'on ne montre pas, puis `#analyse`.

Angles écartés : « un sur dix » (arrondi flatteur de 9,1 %) ; une tendance de production (quatre
points biennaux qui suivent l'activité du BTP, creux Covid) ; les barres empilées décharge en
couleur proposées au cadrage (la décharge seule cache le transfert vers le remblayage) ; un
résumé national de carte (moyenne de ratios non pondérée).

## L'honnêteté

- Tonnes = encombrement, pas nocivité ; boues en matière sèche mêlées au poids humide (comme le
  total SDES) ; résidus de la filière déchets recomptés (convention Eurostat, non isolable).
- Production ≠ traitement (343 vs 295 Mt) : exports/imports, stocks, prétraitements — dit.
- « Recyclage » R2-R11 = surtout concassage de gravats pour les minéraux — dit.
- Deux millésimes sur la page (2022 national, 2021 départemental), chacun lu dans la donnée.
- Ratio par habitant rapporté à la population résidente : hypothèse touristique / résidences
  secondaires / déchets assimilés d'entreprises **énoncée comme lecture prudente, non vérifiée
  par la donnée de la page**.
- Lozère 99,9 % : valeur publiée telle quelle, explication non vérifiable avec ce jeu, dit.
- Guyane et Mayotte sans valeur : la carte DSFR Chart les peint en bleu uni hors échelle — dit
  sous la carte et dans la description accessible.
- Aucune cellule `secret` / `na` dans les trois fichiers (compté sur l'export complet) — dit.

## Phrase de lecture (chapô)

« En 2022, la France a produit 343 millions de tonnes de déchets. Le bâtiment et les travaux
publics en ont produit 72,1 %, les ménages 9,1 % : 8 fois moins. Et la moitié de tous ces déchets,
49,6 %, est de la terre, presque entièrement sortie des chantiers. »

## Ce qu'on ne montre pas

Nocivité ; déclinaison territoriale de la production ; années impaires ; doubles comptes de la
filière ; hétérogénéité des boues ; population touristique.
