# Crues et construction — analyse métier

Création (pas d'original). Page : `public/developpement-durable/crues-construction.html`,
URL `/developpement-durable/crues-construction`. Cadrage : D4 de
`docs/portail-developpement-durable/proposition.md`. Niveau dataviz-metier : avancé.

## L'histoire

Question : « Construit-on encore là où l'eau peut monter ? » Lecteur : élus, presse, services de
l'État ; puis l'explorateur par intercommunalité.

Rejouée à l'API DiDo le 2026-09-26 (exports `/json` complets, recalcul Python, puis lecture au
navigateur, chiffres identiques) :

| Mesure | Valeur |
|---|---|
| Personnes dans l'EAIP débordement (somme des 1 255 EPCI, Fideli 2021) | 18 000 730 |
| Logements dans l'EAIP | 10 936 543 |
| Logements exposés dont la période est publiée | 10 420 707 (515 836 sans période ou sous secret ; 192 cellules `secret`) |
| … construits après 2005 | **1 473 499, soit 14,1 %** (« un sur sept ») |
| … construits 1990-2005 | 1 380 101 |
| Logements commencés 2019-2024, EPCI retenus (1 249) | 1 768 068 |
| Rythme, EPCI dont ≥ 30 % des habitants sont exposés (part publiée), 374 EPCI | **4,1 logements / 1 000 hab. / an** |
| Rythme, EPCI exposés à moins de 10 %, 294 EPCI | **5,0** (écart −19 %) |
| Part de la population / des logements commencés, EPCI ≥ 30 % | 38,6 % / 36,1 % |
| Submersion marine (211 EPCI) | 1 359 391 logements, 1 506 071 personnes |

Rythme par tranche de part publiée : < 10 % 5,03 ; 10-20 % 4,35 ; 20-30 % 4,34 ; 30-50 % 4,05 ;
≥ 50 % 4,14.

**Écart au cadrage.** Le cadrage classait les EPCI par `Part_logements_exposes` et titrait « les EPCI
les plus exposés continuent de construire » (64,1 % des logements commencés dans les 716 EPCI exposés
à ≥ 20 %). Deux choses ont changé :

1. *Le fichier ne tient pas par EPCI.* La part publiée (`Part_pop_exposee`) ne se retrouve en
   divisant `Pop_exposee` par la population Insee 2022 (ITDD, `i017`) qu'à 10 % près pour **168 EPCI
   sur 1 249** ; **114 EPCI** ont plus de personnes exposées que d'habitants (Caux Seine Agglo :
   722 302 exposés pour 77 968 habitants ; Toulon Provence Méditerranée : 29 % publiés, 6 949
   exposés sur 449 782 habitants, soit 1,5 %). Les lignes sont pourtant cohérentes en interne (âges
   qui somment, 1 244 EPCI) et les totaux nationaux se recoupent (18,0 M par les comptes, 17,7 M par
   part × population) : c'est l'attribution à l'EPCI qui est en cause, pas les totaux. Aucune
   permutation simple n'a été trouvée (appariement par population implicite : pas de décalage
   constant par code ni par libellé).
2. *Rapporté à la population, le « continuent de construire » est vrai mais pas saillant.* Les EPCI
   exposés reçoivent une part des mises en chantier voisine de leur part de population ; leur rythme
   est un peu plus bas. Le résultat tient avec les trois mesures d'exposition essayées : part publiée
   (5,0 → 4,1), part logements publiée (5,1 → 3,9 aux extrêmes), part recalculée hors EPCI
   incohérents (5,0 → 3,7).

Titre retenu : **« Un logement exposé aux crues sur sept a été construit après 2005 »** — le seul
chiffre qui se lit à l'échelle du logement (pas d'erreur écologique) et qui ne dépend que des totaux
nationaux, cohérents. Le résultat par EPCI devient le deuxième bloc (« à peine moins que les
autres »).

## Plan (accroche → preuve → rythme → nuance → explorer → hors champ)

1. Titre-message + chapô calculé + 3 KPI (personnes, logements, construits après 2005 + part).
2. Preuve : barres par période de construction, ordre explicite (`<1919`… `>2005` en texte),
   « Après 2005 » mis en évidence, grisé sinon. Phrase : autant qu'entre 1990 et 2005, sur une durée
   comparable ; « avant 1919 » cumule tout.
3. Rythme : barres « logements commencés / 1 000 hab. / an » par tranche d'exposition, axe à zéro,
   deux tranches ≥ 30 % mises en évidence. Ratio de sommes, jamais une moyenne d'EPCI.
4. Nuance : le fichier se contredit par EPCI (168/1 249, 114, exemple Toulon calculé en page), la
   conclusion ne dépend pas de la colonne, donc pas de classement.
5. Exploration : `dsfr-data-list` des 1 255 EPCI avec colonne « plus d'exposés que d'habitants ».
6. Ce qu'on ne montre pas : erreur écologique, constructibilité réglementaire, submersion (lazy),
   6 EPCI sortis (1 secret, 5 Mayotte sans population), 16 407 logements commencés dans 19 codes
   Sitadel absents du fichier, 2025 non publiée, pas de palmarès.

## Honnêteté

- EAIP = enveloppe maximaliste (≈ 27 % de la population), dit dans la ligne de source.
- Échelle : barres à zéro ; l'écart 5,0 / 4,1 n'est pas grossi.
- Moyenne de taux : aucune ; rythme = Σ logements commencés ÷ Σ population ÷ 6 × 1 000.
- Secret : compté (192 cellules de période) et dit sous le graphique.
- Périodes de longueurs inégales : dit en phrase de lecture ; la comparaison porte sur deux périodes
  d'une quinzaine d'années.
- Erreur écologique : le titre ne dit pas « on construit en zone inondable » à partir des EPCI ; le
  chiffre « après 2005 » est un chiffre de logements.

## Phrase de lecture (calculée)

« Entre 2019 et 2024, les 374 intercommunalités où au moins 30 % des habitants vivent dans
l'enveloppe d'inondation ont mis en chantier 4,1 logements pour 1 000 habitants par an, contre 5,0
dans les 294 où moins de 10 % le sont : un rythme inférieur de 19 %, pas un arrêt. »

## Angles écartés

- Palmarès d'EPCI (Grenoble 92,2 % du cadrage) : repose sur une colonne dont on ne sait pas si elle
  est juste ligne à ligne.
- Carte EPCI : pas de fond EPCI dans DSFR Chart, et même raison que le palmarès.
- Nuage de 1 255 points : illisible et exposé au même défaut.
