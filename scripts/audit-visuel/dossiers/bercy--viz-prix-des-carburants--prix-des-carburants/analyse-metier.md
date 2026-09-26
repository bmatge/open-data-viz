# Analyse metier — Prix des carburants

> La lecture `dataviz-metier` : le sens avant la syntaxe.
> **Ce fichier n'est jamais ecrase par un script.** Les sorties du modele
> multimodal arrivent dans `constats/` ; ce qui est retenu se reecrit ici, a la main.

Recreation du 2026-09-26 (niveau avance : une page). Chiffres rejoues a l'API
(`/exports/json`, 9 801 stations, `data_processed` 2026-09-26 14:32 UTC) et au navigateur.

## L'histoire trouvee

- **Le paradoxe** : le gazole (2,397 EUR/L en moyenne, 8 918 stations) est plus cher que le
  SP95-E10 (2,170 EUR/L) dans **6 879 des 6 880** stations qui vendent les deux, de 0,229 EUR en
  moyenne. Le gazole est le plus cher des six carburants au litre.
- **La station plus que la region** : les moyennes regionales du gazole ne s'ecartent que de
  **0,12 EUR** (Corse 2,309 -> Grand Est 2,430). A l'interieur d'un departement, entre la station
  la moins chere et la plus chere : **0,41 EUR en moyenne** (96 departements ; 0,36 EUR hors
  autoroute). Dans chaque region, l'etendue (0,34 en Corse a 0,79 en Ile-de-France) depasse
  l'ecart entre regions.
- **La nuance** : autoroute (`pop = A`, 436 stations) contre route : +0,081 EUR/L sur le gazole
  (2,474 contre 2,393), soit 4,05 EUR sur un plein de 50 L ; +0,13 sur l'E85.
- **Trouvaille qui renverse la page precedente** : les horodatages du flux sont l'heure de Paris
  etiquetee `+00:00`. 102 prix portaient une heure posterieure a l'heure de la requete (14:37 UTC).
  Le `timezone=Europe/Paris` ajoute au lot 18 comme « correction » decalait chaque heure de +2 h
  (id 89100001 : brut `@maj` 09:07:28, affiche 11:07). Retire.

Angles ecartes : la choroplethe regionale (elle mettait au centre l'ecart le plus faible du jeu),
un classement des departements (meme raison), un prix « moyen » presente comme prix paye.

## La question posee, et pour quel lecteur

Automobiliste et lecteur grand public : « combien coute le carburant, et ou le payer moins
cher ? ». Message : le choix de la station pese plus que la region ; le gazole n'est plus le
carburant bon marche. L'usager obtient ensuite le localisateur d'origine (recherche, facettes,
carte, tableau trie par prix du gazole).

## La forme retenue, et pourquoi elle sert cette question

1. Chapo calcule (quatre `dsfr-data-repeat` sur des queries a une ligne).
2. Barres horizontales triees, prix moyen par carburant, palette neutre + la barre la plus chere
   en evidence (`highlight-index="[0]"`, vraie par construction apres `order-by desc`).
3. Barres triees de l'etendue intra-regionale + ligne de reference = ecart entre moyennes
   regionales, interpolee depuis la donnee (graphique clone par `dsfr-data-repeat`).
4. Barres du surcout autoroute par carburant (pivot A/R + compute), seuil 30 stations par cote.
5. Exploration : recherche, facettes, KPI min/max de la selection, carte, tableau.

## Honnetete de l'echelle

Toutes les barres partent de zero. Pas de moyenne de taux : des moyennes de prix affiches, dites
non ponderees par les volumes. L'etendue min-max est sensible a une station isolee : dit sous le
graphique, et doublee de l'ecart moyen par departement. Pas de centile disponible (voir constat).

## Phrase de lecture

« Dans les 9 801 stations-service du flux, le litre de gazole est affiche en moyenne a 2,40 EUR,
celui de SP95-E10 a 2,17 EUR. Le gazole est plus cher que le SP95-E10 dans 6 879 des 6 880 stations
qui vendent les deux. D'une region a l'autre, le prix moyen ne varie que de 0,12 EUR ; a
l'interieur d'un meme departement, de 0,41 EUR en moyenne. » (26/09/2026, calculee au chargement.)

## Ce qu'on ne montre pas, et qu'il faut dire

- 578 stations sans aucun prix (hors moyennes) ; 5 sans region (hors comparaisons territoriales).
- Anciennete des prix : au 26/09/2026, 1 529 des 8 918 prix du gazole ont plus de 7 jours, 103
  plus de 30 (calcul en heure de Paris).
- Moyennes non ponderees par les volumes ; prix au litre, pas au kilometre ; pas d'historique ;
  pas d'outre-mer.
- SP95 sur autoroute : 12 stations, exclu du surcout (seuil 30).

## Ecarts avec l'original

- Heures de releve : valeur faciale du flux (l'original, rendu dans le fuseau du navigateur, et
  la page precedente affichaient +2 h).
- Ajouts : prix agreges, comparaisons, surcout autoroute — l'original n'en montre aucun.
- Autocompletion a 10 suggestions remplacee par une recherche qui filtre (inchange).
