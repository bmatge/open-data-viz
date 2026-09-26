# Analyse métier — Fréquentation des musées de France (fiche 2, portail Culture)

Page : `/culture/frequentation-musees` — création, pas de page d'origine.
Jeu : « Fréquentation des Musées de France » (ministère de la Culture, Patrimostat), ressource
Tabular `7708e380-e7f8-4b56-936a-5d2a262d852d`, 12 292 lignes (site × année, 2014-2024), export
Parquet du 2026-09-21. Niveau dataviz-metier : avancé.

## L'histoire

**Titre-message** : « Musées de France en 2024 : le Louvre et Versailles font un quart des entrées,
quinze musées la moitié ».

Rejoué sur l'export Parquet complet le 2026-09-26 (pandas), identique à l'affichage :

- 2024 : **71 192 245 entrées** (1 040 sites, 1 029 musées). Louvre 8 681 079, Versailles
  8 358 074 : **17 039 153 = 23,9 %**. Dix premiers : 45,8 % (dont 9 à Paris). **15 musées** font la
  moitié (14 donnent 49,6 %). 874 musées déclarent au moins une entrée.
- Longue traîne : 10 musées ≥ 1 M = 1,1 % des musées, 45,8 % des entrées ; 351 musées < 10 000
  = 40,2 % des musées, 2,2 % des entrées.
- Île-de-France 58,8 % des entrées (106 sites) ; deuxième région PACA 5,9 %.
- Gratuit : 40,6 % des entrées.
- **Nuance que le cadrage n'avait pas** : 2024 dépasse 2019 de 8,0 % (71,19 M contre 65,93 M) ;
  à périmètre constant (826 sites présents les deux années) +7,9 %. Mais le Louvre est à l'indice
  91 (8,68 M contre 9,52 M), Versailles 102, **tous les autres musées 112**. La reprise ne doit rien au
  Louvre. Creux : 23,8 M en 2020.

## Corrections du cadrage (données, pas bibliothèque)

- La part « à rejouer » : 23,9 %. Le titre provisoire tient.
- **Une ligne est un site, pas un musée** (`IDPatrimostat`) : Carnavalet a trois lignes (874 743 +
  607 730 + 142 103), la Marine six dans cinq villes, Rodin deux (Paris, Meudon). Un classement par
  ligne montrait Carnavalet deux fois dans le top 15. Unité retenue : l'identifiant Muséofile
  (`IDMuseofile`), sites additionnés.
- Deux sites sans nom **ni** identifiant Muséofile (Metz 308 438, Lens 400 509) et un sans nom
  (Troyes, M01216) : clé `coalesce(IDMuseofile, IDPatrimostat)`, libellé « nom non publié (VILLE) ».
- `ferme` est l'état **actuel**, constant sur les onze années d'un musée : 448 lignes « OUI » portent
  des entrées. Inutilisable comme « fermé cette année-là ». 155 musées à 0 ou sans chiffre en 2024,
  comptés à part, sans cause inventée.
- `total` vide : 1 ligne en 2024 (Géo-Charles), 1 en 2018, 1 en 2021 — écartées par `total:gt:0`.
- Deux doublons site × année, tous deux en 2021 (Mistral, reine Bérengère, < 10 000 entrées).
- `payant + gratuit = total` sur 99,8 % des lignes.

## La forme

1. Chapô calculé + 4 KPI (entrées, part des deux premiers, musées pour la moitié, évolution vs 2019).
2. **Preuve** : barres horizontales triées, top 15 par musée, les deux premiers mis en évidence
   (`selected-palette="neutral"` + `highlight-index="[0, 1]"`) — le rang EST le propos.
3. **Concentration** : barres groupées part des musées / part des entrées par tranche de
   fréquentation — les deux barres se croisent, c'est le graphique qui dit la longue traîne.
4. **Géographie** : part des entrées par région, IDF mise en évidence. Pas de carte : une carte de
   volumes répéterait Paris ; une carte par habitant mesurerait le tourisme, pas l'offre.
5. **Nuance** : indice base 100 en 2019, trois courbes (Louvre, Versailles, autres), ligne de
   référence à 100, `y-min="0"`. Périmètre constant calculé en page (jointure interne 2019 × dernière
   année sur `IDPatrimostat`).
6. **Exploration** : facettes région/département + recherche + liste des sites (entrées, part
   gratuite, évolution depuis 2019), avec réserve sur les variations extrêmes (Carnavalet < 9 000
   entrées par an de 2017 à 2020).

## Honnêteté

- Parts calculées sur l'ensemble des entrées, jamais de moyenne de taux.
- Périmètre variable d'une année à l'autre dit, et neutralisé par le calcul à périmètre constant.
- Une entrée n'est pas un visiteur ; parts régionales non rapportées à la population (tourisme).
- Colonnes d'âge écartées : vides pour 46 % (moins de 18 ans) et 64 % (18-25 ans) des sites en 2024.

## Phrase de lecture

« En 2024, les musées de France ont déclaré 71,2 millions d'entrées. Les deux premiers en font
23,9 %, et il suffit de 15 musées pour atteindre la moitié. La fréquentation dépasse de 8 % celle de
2019 — mais pas au Louvre, qui n'en retrouve que 91 %. » (calculée, `dsfr-data-repeat`)

## Ce qu'on ne montre pas (dit en page)

Musées sans entrée (155), sites un par un dans les classements, noms manquants (3 sites, 718 k),
âge des visiteurs, visiteurs uniques, doublons 2021.

## Angles écartés

- Carte des entrées pour 1 000 habitants (proposée au cadrage) : mesure le tourisme parisien, pas
  une offre ; demanderait une jointure population pour un message déjà porté par le graphique
  régional.
- Restreindre la série aux musées présents onze années : remplacé par la comparaison à périmètre
  constant 2019 / dernière année, qui répond directement à la question posée.
