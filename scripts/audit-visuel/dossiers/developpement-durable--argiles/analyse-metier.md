# Maisons et argiles — analyse métier

Création (pas d'original). Page : `public/developpement-durable/argiles.html`,
URL `/developpement-durable/argiles`. Cadrage : deuxième vague (§ 5) de
`docs/portail-developpement-durable/proposition.md`, « Un logement sur cinq en zone d'argile forte,
et l'on construit dessus ». Niveau dataviz-metier : avancé. Même dispositif que D4 (crues), angle
argiles ; la page D4 n'a pas été touchée.

## L'histoire

Question : « Les maisons sont-elles bâties sur des sols argileux, et continue-t-on d'y construire ? »
Lecteur : lecteur de rapport (élus, presse), puis l'explorateur par intercommunalité.

Rejouée à l'API DiDo le 2026-09-26 (exports complets, deux fichiers RGA de 7 404 lignes chacun,
Sitadel EPCI filtré à 15 068 lignes) et recalculée en Python, à l'identique de la page :

| Mesure | Valeur |
|---|---|
| Maisons en zone d'exposition faible, moyenne ou forte (fichier EPCI) | 16 107 414 |
| dont zone forte | 3 154 612 (19,6 %) |
| dont moyenne ou forte | 66 % |
| Part en zone forte, maisons bâties avant 1919 / après 2005 (fichier par période) | 18,4 % / 20,7 % |
| Maisons bâties après 2005 en zone forte | 453 376 |
| Maisons commencées 2019-2024 (individuel pur + groupé, Sitadel), EPCI couverts | 683 606 (sur 714 483) |
| Part de ces maisons dans les EPCI où ≥ 25 % des maisons exposées sont en zone forte | 35 % (parc : 35 %) |
| Grand Paris + Aix-Marseille, maisons en zone forte | 302 338 (10 % du total) |

**Écart au cadrage.** Les chiffres sondés sont retrouvés (16,07 M, 3,14 M, 19,6 %, 453 376 sur le
fichier par période). Mais le titre « un logement sur cinq » était faux deux fois : le fichier ne
compte que des **maisons individuelles**, et seulement celles qui sont **dans une zone d'exposition**
(la notice : croisement des maisons Fidéli 2021 avec la carte BRGM 2020 ; les maisons hors zone ne
sont pas dans le fichier). Faute de dénominateur, « une maison sur cinq » serait faux aussi. Titre
retenu : « Argiles : une maison exposée sur cinq l'est fortement, et l'on construit toujours
dessus ». Le « on construit dessus » est établi deux fois : par période (la part en zone forte ne
décroît pas avec le temps, 18,4 % → 20,7 %) et par Sitadel (les EPCI les plus argileux reçoivent leur
part des maisons neuves, 35 % contre 35 % du parc).

**Découverte en cours de route : le fichier est faux pour 1 EPCI sur 7.** La surface argileuse publiée
dépasse la superficie de l'EPCI (geo.api.gouv.fr) pour 236 EPCI au sens strict, 184 au-delà de +5 %,
jusqu'à 3,2 fois (Vallée des Baux-Alpilles : 1 034 km² exposés pour 321 km², et 94 219 maisons pour
27 706 habitants). 122 EPCI ont plus de maisons exposées que d'habitants. Au total, le fichier classe
47,9 % de la superficie en exposition moyenne ou forte, ce qui est la part publiée par le ministère pour
la carte 2020 (48 %) : l'erreur semble **déplacer** des valeurs entre EPCI plutôt que gonfler le total
(hypothèse, non démontrée pour les maisons). Les ratios tiennent sans les EPCI incohérents
(20,0 % en zone forte ; 18,5 % avant 1919, 20,9 % après 2005).

## Plan (accroche → preuve → aujourd'hui → où → nuance → explorer → hors champ)

1. Titre-message + chapô calculé + 3 KPI (zone forte, dont après 2005, part des maisons neuves dans les EPCI très exposés).
2. Preuve : barres de la part en zone forte par période, axe depuis zéro, « Après 2005 » en évidence.
   L'axe depuis zéro montre des barres presque égales : c'est le message (pas d'évitement).
3. Aujourd'hui : barres groupées, part du parc et part des maisons commencées 2019-2024 par tranche
   d'EPCI (EPCI cohérents seulement).
4. Où : dix EPCI qui comptent le plus de maisons en zone forte (cohérents), Paris et Marseille en évidence.
5. Nuance : la qualité du fichier, comptée et recalculée dans la page (jointure geo.api).
6. Explorer : tableau des 1 234 EPCI, recherche, CSV, colonne « Contrôle ».
7. Ce qu'on ne montre pas, puis `#analyse`.

## Honnêteté

- Dénominateur : maisons **exposées**, jamais « toutes les maisons » ni « logements ».
- Erreur écologique : la tranche d'un EPCI n'est pas la zone d'une maison neuve ; dit sous le graphique.
- Secret : cellule = chaîne « secret » ; aucune cellule ne vaut 0 et la plus petite valeur publiée est 12,
  donc le secret masque les petites valeurs, zéro compris (392 des 423 EPCI « secret » en zone forte ont
  0 km² de zone forte). Recodé en 0 et compté : 3 115 cellules « zone forte » sur 7 404 dans le fichier par
  période ; borne de l'erreur 34 265 maisons (1,1 %) ; écart entre les deux fichiers 10 019.
- EPCI incohérents : écartés des classements, signalés dans le tableau, comptés en page ; le contrôle ne
  voit que les erreurs de surface (Pyrénées Haut Garonnaises, 49 173 maisons pour 15 379 habitants, passe
  le contrôle) — dit en page.
- Périodes : les libellés du fichier (« 1970-1990 ») diffèrent de ceux de la notice (« 1975-1990 ») ; la
  page suit le fichier.
- Carte 2020 remplacée le 1er juillet 2026 (55 % du territoire en moyen ou fort, contre 48 %) : dit en
  page, source ministère (ecologie.gouv.fr, page « sols argileux, sécheresse et construction »).

## Phrase de lecture (chapô, calculée)

« En France métropolitaine, {cl} maisons individuelles sont bâties sur un sol argileux […]. {r3} d'entre
elles, {part3} %, sont en zone d'exposition forte ; {part_mf} % en zone moyenne ou forte. Les maisons
récentes n'ont pas évité ces sols : {part3 après 2005} % de celles bâties après 2005 sont en zone forte,
contre {part3 avant 1919} % de celles d'avant 1919. »

## Ce qu'on ne montre pas

Maisons hors zone, appartements, sinistres, parcelle, carte EPCI, nouvelle carte 2026, application de
l'étude géotechnique (loi ÉLAN), secret, outre-mer (30 877 maisons commencées hors fichier), maisons
bâties depuis 2022.

## Angles écartés

- « Un logement sur cinq » : faux (voir plus haut).
- Carte EPCI : pas de fond EPCI dans DSFR Chart, et 1 ligne sur 7 serait peinte d'une valeur fausse.
- Surfaces exposées comme message : moins parlant que les maisons, et c'est la colonne la plus fautive.
- Classement par part en zone forte : dominé par de petits EPCI ; le classement en volume dit où sont les maisons.

## Hypothèses éditoriales

- Seuil de contrôle : surface exposée > superficie × 1,05 (tolérance pour les écarts de découpage entre
  2021 et la géographie actuelle de geo.api).
- Tranches d'EPCI : secret (< 12 maisons) / < 10 % / 10-25 % / 25-50 % / ≥ 50 % ; « très exposé » = ≥ 25 %.
- Sitadel : individuel pur + individuel groupé, années 2019-2024 écrites dans l'URL (2025 : `LOG_COM` null).
