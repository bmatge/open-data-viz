# Analyse metier — Les personnels dans les lycées français

> La lecture `dataviz-metier` : le sens avant la syntaxe.
> **Ce fichier n'est jamais ecrase par un script.** Les sorties du modele
> multimodal arrivent dans `constats/` ; ce qui est retenu se reecrit ici, a la main.

Recréation du 2026-09-26 (niveau avancé : une page).

## L'histoire trouvée

Le « 19,3 % d'agrégés » de l'original est une moyenne de deux métiers. Le jeu porte une colonne
qu'aucune version n'affichait, `etp_d_enseignants_plp` (professeurs de lycée professionnel, 24,5 %
des ETP enseignants). Dans les lycées publics hors EREA, rentrée 2024 (rejoué à l'API, export
complet, 2 399 lycées) :

- voie générale et technologique : **37,6 %** d'agrégés, 57,4 % de certifiés, 0,3 % de PLP ;
- lycée professionnel : **1,0 %** d'agrégés, **71,1 %** de PLP, **18,0 %** de non-titulaires ;
- lycée polyvalent : entre les deux (18,7 / 43,8 / 25,2 / 12,0).

Deuxième temps : les agrégés sont concentrés. **135 lycées publics** ont une majorité d'agrégés
et emploient **23,2 %** des agrégés du public (8 % des ETP enseignants) ; 29 sont à Paris, 13 dans
les Hauts-de-Seine. À voie égale (agrégés / (agrégés + certifiés)), la part va de **10,9 %**
(Mayotte) à **59,8 %** (Paris), France **34,8 %**.

**Ce que ça renverse** : les quatre cartes de l'original (et de l'ancienne reproduction)
rapportaient les agrégés à TOUS les enseignants ; elles mesuraient donc d'abord la part de voie
professionnelle de chaque département. Les cartes « certifiés » en sont le négatif.

Angles écartés : comparaison collèges/lycées (autre page), mixité (majorité de femmes partout),
cartes de certifiés, l'âge comme message principal (il est le même dans les trois familles :
46,9 à 50,9 % de 50 ans et plus).

## La question posee, et pour quel lecteur

Qui enseigne au lycée, et où — pour un lecteur grand public ou élu qui croit qu'un « professeur
de lycée » est une seule figure.

## La forme retenue, et pourquoi elle sert cette question

1. Barres horizontales empilées à 100 % par famille de lycée (5 corps) : la composition, le
   contraste d'un coup d'œil.
2. Carte départementale à voie égale, résumé pondéré.
3. Barres triées (top 10 départements, Paris mis en évidence) + liste complète des 135 lycées à
   majorité d'agrégés : l'exception nommée.
4. Nuance : barres groupées indicateur × famille (50 ans et plus, non-titulaires, arrivés
   depuis moins de 2 ans, moins de 35 ans) — l'âge rassemble, le statut sépare.
5. Exploration : facettes (dont la nature d'établissement), KPI de ratio, âge et ancienneté en %,
   liste.

## Honnetete de l'echelle

Toutes les parts sont des ratios de sommes d'ETP (jamais `proportion_*` moyennées). Barres empilées
à 100 % en axe 0 ; carte au résumé pondéré par le dénominateur (`map-summary-weight="ac"`,
`map-summary-field="pct_ac"`) → 34,84 = rapport national. Le choix du dénominateur de la carte
(agrégés + certifiés) est dit en page et les deux mesures figurent dans le tableau équivalent.

## Phrase de lecture

« À la rentrée 2024, 22,4 % des enseignants des lycées publics sont agrégés. Mais ce chiffre mêle
deux métiers : 37,6 % d'agrégés dans les lycées généraux et technologiques, 1,0 % dans les lycées
professionnels, où 71,1 % des enseignants sont PLP et 18,0 % non titulaires. 23,2 % des agrégés
enseignent dans les 135 lycées où ils sont majoritaires. » — entièrement calculée
(`dsfr-data-repeat` sur deux jointures à clé constante).

## Ce qu'on ne montre pas, et qu'il faut dire

- Les 77 EREA (le périmètre `like 'Lycée'` de l'original les attrape) : écartés du récit, une phrase
  calculée (27,7 % de titulaires d'un autre corps), gardés dans l'exploration.
- Le privé sous contrat : une phrase calculée (7,4 % d'agrégés, 17,2 % de non-titulaires).
- 28 lignes sans ETP enseignant (26 privés, 2 publics) ; 12 lycées sans région.
- Les classes préparatoires : le jeu ne les porte pas ; les noms de la liste le suggèrent, la page
  le dit comme hypothèse, pas comme fait.
- Une seule rentrée : aucune tendance.
- Personnels non enseignants : public seulement (vie scolaire vide sur 1 209 lignes privées sur 1 209).

## Ecarts avec l'original

- Périmètre identique en exploration (3 686 lignes), récit restreint au public hors EREA (2 399).
- Ajout des PLP (colonne du jeu jamais affichée).
- Quatre cartes → une carte à voie égale.
- Âge et ancienneté en % (et non en ETP sur un axe « année »).
