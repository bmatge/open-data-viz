# Analyse métier — culture / monuments-historiques

Création du 2026-09-26 (fiche 6 de `docs/portail-culture/proposition.md`), niveau `dataviz-metier` avancé.

## Le jeu

« Immeubles protégés au titre des monuments historiques » (ministère de la Culture, base Mérimée),
ressource Tabular `3a52af4a-f9da-4dcc-8110-b07774dfb3bc`, 46 760 lignes × 82 colonnes (95 Mo), mise à
jour hebdomadaire (dernière : 2026-09-24). Jamais chargé : quatre regroupements serveur
(`champ__groupby&Reference__count`) et une recherche paginée. Population : INSEE, populations légales
par département (recensement 2023, en vigueur au 1er janvier 2026), republiées sur
`public.opendatasoft.com` (`demographyref-france-pop-legale-departement-millesime`).

## L'histoire

Qui possède le patrimoine protégé. 20 580 immeubles sur 46 760 (44 %) appartiennent à des particuliers
ou des sociétés, 19 161 (41 %) aux communes ; l'État et toutes les autres personnes publiques, 2 776
(6 %). Le croisement statut × protection donne l'angle : les privés n'ont que 21 % de classés contre
41 % pour les communes — ils détiennent 51 % des 31 322 inscrits mais 29 % des 14 990 classés, dont
les communes ont 53 %. Géographie : Paris premier en nombre (1 893) mais 9,0 pour 10 000 habitants,
près de la moyenne nationale (6,9) ; le Cantal en compte 28,4, 57 fois la Seine-Saint-Denis (0,5).

**Écart au cadrage.** « Un sur cinq classé » (9 904) ne comptait que la modalité exacte `classé MH` ;
la typologie en a 41, multivaluées : 14 990 immeubles portent un classement, en tout ou partie (32 %).
« Deux sur cinq privés » (18 373) ne comptait que `propriété privée` ; sur 318 libellés regroupés,
particuliers + sociétés = 20 580 (44 %). Le titre devient « plus de quatre sur dix ».

**Angles écartés.** Propriété × région (barres empilées du cadrage) : 21 régions × 7 familles, la
page aurait répété le graphique national sans nouvelle histoire. Croisement MH × SPR sur
`COG_Insee_lors_de_la_protection` : code communal d'avant fusions, appariement partiel non chiffré —
dit en page, non tracé.

## Les formes

- Chapô et 4 KPI calculés (total, privés, communaux, classés).
- Barres horizontales triées, deux barres mises en évidence (privés, communes) : la concentration.
- Barres de taux « part classée » par propriétaire, triées croissant, privés en évidence, échelle 0-100.
  Ratio de sommes dans chaque groupe (jamais une moyenne de taux).
- Deux classements côte à côte (en nombre / par habitant) : le contraste Paris ↔ France rurale.
- Barres chronologiques par siècle, trois siècles mis en évidence ; `split` + `explode` assumés.
- Carte départementale (exploration), résumé pondéré par la population (`map-summary="weighted"`).
- Recherche serveur + tableau sur les 46 760 lignes.

## Honnêteté

- Parts de propriétaire : `share_percent` sur une partition (chaque immeuble une fois).
- Siècles : un immeuble compte dans chaque siècle cité (36 % des immeubles datés) ; les barres somment
  à plus que le total — dit dans la phrase de lecture et le titre du graphique ; 7 276 sans siècle (16 %)
  dits. 99 cellules répètent un siècle (« 16e s.;16e s. ») : comptées deux fois, écart ≤ 0,1 %.
- Densité : 100 départements joints ; 975 (population fausse à 5,97 M dans le fichier ODS), 976
  (absent du fichier de population) et deux lignes bi-départementales écartées (46 726 / 46 760).
- Recodage des propriétaires par mots (`contains`, insensible à la casse) : « État » attrape aussi une
  dizaine d'« État étranger » — rangés dans les personnes publiques ; « Autre libellé » ≈ 116.

## Phrase de lecture

« Chez les communes, 41 % des immeubles sont classés ; chez les propriétaires privés, 21 % seulement.
Les privés détiennent 51 % des immeubles inscrits, mais 29 % des classés, dont les communes possèdent
53 %. » — calculée (`dsfr-data-repeat` sur la synthèse).

## Ce qu'on ne montre pas (dit en page)

Libellés de propriétaire tels que publiés (318) ; objets mobiliers (Palissy) ; état et financement ;
évolution (pas d'historique) ; appariement communal (code à la date de protection) ; Mayotte et
Saint-Pierre-et-Miquelon hors calculs par habitant ; Mayotte peinte en bleu vif par la carte alors
qu'elle n'a pas de valeur.
