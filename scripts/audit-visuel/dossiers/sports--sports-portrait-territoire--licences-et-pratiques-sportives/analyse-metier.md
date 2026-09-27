# Analyse metier — Portrait de territoire — Licences et pratiques sportives

> La lecture `dataviz-metier` : le sens avant la syntaxe.
> **Ce fichier n'est jamais ecrase par un script.** Les sorties du modele
> multimodal arrivent dans `constats/` ; ce qui est retenu se reecrit ici, a la main.
>
> Recreation du 2026-09-27 (niveau avance, une page). Ce dossier porte l'analyse de
> **toute** la page `public/sports/portrait-territoire.html` : les cinq autres dossiers
> `sports--sports-portrait-territoire--*` (un par onglet de l'original) y renvoient.

## La question posee, et pour quel lecteur

« En sport, qu'est-ce qui distingue mon territoire de la France, et ou se classe-t-il
parmi ses pairs ? » — un elu, un service deconcentre, un journaliste local : des lecteurs
de rapport, qui veulent le message avant de cliquer, puis explorer.

## L'histoire trouvee (verifiee a l'API le 2026-09-27)

- **L'ecart, pour chaque territoire** : licences pour 1 000 habitants rapportees a la
  France (248,6 en 2024), et le rang parmi les pairs. Gironde : 259,2, +4 %, 45e sur 101 ;
  mais equipements 35,0 pour 10 000 habitants, -28 %, 83e — la licence au-dessus de la
  moyenne, l'equipement en dessous. Hautes-Alpes 1re (375,0) ; Mayotte 101e (137,8) ;
  ratio extremes 2,7.
- **Le paradoxe (nuance)** : l'Ile-de-France est la region de metropole la moins
  licenciee (210,8, -15 %, 13e sur 18) et pourtant 63 % de ses 15 ans et plus declarent
  une pratique reguliere (France 60 %, egale a la Bretagne et a PACA-Corse, les plus
  hautes). En metropole, licence et pratique declaree ne se suivent pas : correlation
  de 0,09 sur 13 regions (0,60 avec l'outre-mer, bas partout). La licence mesure le club,
  pas le sport.
- **Angle ecarte, et pourquoi** : « plus on est rural, plus on est licencie ». Verifie par
  quintiles de densite (population / surface du jeu equipements) : 272, 258, 267, 268
  puis **223** pour le cinquieme le plus dense — pas de pente, un decrochage des seuls
  departements tres denses ; et la region explique 59 % de la variance entre
  departements. Le premier titre de carte l'affirmait ; retire avant livraison.
- **Angle ecarte** : taux de recours au Pass'Sport. Le jeu `portrait_territoires_base`
  a des colonnes `psp_eligibles` et `psp_tx_recours`, **vides sur 107 lignes sur 107** :
  aucun taux calculable. Les volumes seuls (1 649 414) ne distinguent pas un territoire.

## La forme retenue, et pourquoi elle sert cette question

1. Titre-message et chapeau calcules sur la ligne choisie (valeur, ecart, rang, puis
   clubs, equipements, part des femmes) — la reponse avant tout clic.
2. Tableau de quatre indicateurs × (territoire, France, ecart, rang) : quatre unites
   differentes, donc un tableau, pas un graphique.
3. Carte des pairs (departements ou regions selon le choix), taux et non volume,
   resume France pondere par la population.
4. Nuance : phrase calculee sur la region de metropole la moins licenciee + tableau
   des regions (licence, pratique declaree, territoire d'enquete).
5. Exploration : tableau des 119 territoires, triable, cherchable, CSV.

## Honnetete de l'echelle

- Ratios de sommes partout : regions et France = sommes de departements, jamais une
  moyenne de taux. Une seule population (1er janvier 2024, celle de `lics_dep`, identique
  a `pop_dep_age_sexe` 2024 sur 101 departements) pour les trois taux.
- Resume de carte `weighted` par la population, calcule sur la colonne non arrondie
  (`map-summary-field="lpm"`, PG-031) : 248,59 = le taux national.
- Ecarts relatifs en % (licences, clubs, equipements), en points pour une part (femmes).

## Phrase de lecture

« Gironde (33) : 259 licences sportives pour 1 000 habitants, 4 % de plus qu'en France —
45e des 101 departements ; ses equipements : 35,0 pour 10 000 habitants, 28 % de moins
qu'en France. » (calculee, 2024).

## Ce qu'on ne montre pas, et qu'il faut dire (dit en page, section « Ce que cette page ne montre pas »)

- Des licences, pas des licencies (multi-licences).
- 148 226 licences hors departements sur 17 161 064 (etranger 67 873, COM, NR) : sans
  population, ecartees de tous les totaux.
- Pratique reguliere : enquete par region, PACA+Corse et Antilles fusionnees, Mayotte
  absente ; un departement recoit la valeur de sa region.
- Commune et EPCI ; formations, volontariat, dispositifs de l'Etat (volumes sans
  denominateur, Pass'Sport sans eligibles) ; comparateur a deux territoires (remplace
  par le rang et le tableau de tous les territoires).
- Equipements : 331 339 rattaches a un departement ; 12 sans departement.

## Ecarts avec l'original

- Plus de niveau commune / EPCI ; quatre onglets sur six non repris (voir ci-dessus).
- Equipements rapportes a la population 2024 des licences, pas a celle du referentiel
  `ref-geo-dataes` : Gironde 35,0 (original 36,4), France 48,4 (original 49,0 sur un
  autre jeu, LIM-015).
- Deep links de l'ancienne reproduction (`?newreg=…&dep=…`) remplaces par
  `?territoire=D33` / `R75`.
