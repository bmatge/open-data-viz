# Analyse métier — culture / presse-cppap

Fiche 17 du cadrage `docs/portail-culture/proposition.md`. Niveau `dataviz-metier` : avancé (page complète).

## L'histoire

Le registre de la CPPAP est un **historique** : 26 731 titres y sont passés, 4 965 y sont inscrits le
27 septembre 2026 (18,6 %). Trois messages, dans l'ordre de l'argument :

1. **Usure** — moins d'un titre sur cinq reste inscrit ; mais 46 % des services de presse en ligne
   (1 094 / 2 385) contre 16 % des publications imprimées (3 871 / 24 346). Les sites font 22 % du stock.
2. **Concentration géographique** — 55 % des titres inscrits dont le département est connu sont
   édités en Île-de-France (2 552 / 4 681), 1 470 à Paris (30 % de tous les inscrits) ; sur tout
   l'historique, Paris pèse 31 % (8 310).
3. **Concentration de l'argent** — aide à l'exemplaire posté 2023 : 73,3 M€ pour 379 titres ;
   les 37 premiers (un sur dix) en reçoivent 74 %, la moitié la moins aidée (190) 3,5 %.
   Les hebdomadaires régionaux font 70 % des titres (264) et 10 % de l'argent (7,5 M€) ; les
   58 quotidiens IPG 41 % (29,9 M€). Télérama en tête (5,25 M€), La Croix ensuite (4,26 M€).

Nuance : l'inscription vaut le plus souvent cinq ans (4 141 inscrits sur 4 965 à ± 6 mois) ;
631 échéances d'ici fin 2026, 107 renouvellements en cours pour des inscrits, 267 pour des titres
déjà expirés, 57 premières demandes. Aide aux sites tout en ligne : 8,0 M€ / 52 sites en 2022,
4,0 M€ / 58 en 2023. Ultramarins : 1,89 / 2,00 / 1,50 M€ (2021-2023).

## Écart au cadrage

- Titre provisoire (« un sur cinq encore inscrit ; 2 385 SPEL ») tenu, reformulé : le contraste
  imprimé / en ligne est plus parlant que le compte brut des SPEL, et la concentration francilienne
  (non chiffrée au cadrage) entre dans le titre.
- **Piste IPG écartée** : `qualification` = motif de la dernière décision. Le Figaro, Libération,
  Ouest-France, Télérama, La Croix y sont « CIBLAGE_POSTAL_D_19_2 ». Compter les « IPG » dessus
  (338 SPEL contre 105 imprimés) aurait fait écrire un faux paradoxe.
- **Carte départementale écartée** : aucun code ultramarin dans `departement` (284 inscrits sans
  département), Corse en « 20 » ; rapportée à la population (ODS public, 2026) Paris est à 70 titres
  pour 100 000 hab. contre 6,9 pour l'ensemble : une carte n'aurait montré que Paris. Barres par zone.
- Aides × registre : jointure non tentée (« CROIX (LA) » / « LA CROIX », pas de n° CPPAP).

## Formes

- Barres horizontales empilées inscrits / plus inscrits par type : échelle ET part d'un coup d'œil.
- Barres par zone (Paris mis en évidence, `neutral` + `highlight-index`) ; part de chaque zone par
  `share_percent` dans le tableau a11y.
- Barres empilées par année d'échéance (imprimé / en ligne).
- Top 15 des titres aidés, barres triées ; tableau complet avec part et part cumulée
  (`share_percent` → `running_sum`).
- Part des titres vs part des montants par catégorie (deux séries, gris / bleu) : le contraste
  « 70 % des titres, 10 % de l'argent » se lit sans calcul.
- Aides au pluralisme : deux petits tableaux (2 et 3 lignes : un graphique n'apporterait rien).

## Honnêteté

- Parts rapportées au bon dénominateur : IDF sur les inscrits dont le département est connu (dit
  en page) ; Paris sur tous les inscrits.
- « Plus inscrit » ne distingue pas expiration, radiation, refus : dit sous le graphique.
- `max-records` relevé à 40 000 (le défaut 25 000 tronquerait 1 731 titres).
- « Un sur dix » = rang cumulé ≤ 10 % des titres (37 titres = 9,8 %) : calculé, pas fixé.

## Phrases de lecture

Toutes calculées (`dsfr-data-repeat` sur des synthèses `group-by k`) ; aucun chiffre en dur sauf
dans « ce qu'on ne montre pas » (taux Paris / France, daté du 27/09/2026, calculé hors page).

## Ce qu'on ne montre pas (en page)

Aides d'un titre inscrit ; série des aides (fichier pluriannuel hors Tabular) ; presse IPG ;
motif de sortie du registre (57 titres sans date) ; 284 inscrits sans département, Corse, outre-mer,
carte ; diffusion / audience.
