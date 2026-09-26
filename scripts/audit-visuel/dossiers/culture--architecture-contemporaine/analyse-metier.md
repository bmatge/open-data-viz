# Analyse métier — culture / architecture-contemporaine

Fiche 15 de `docs/portail-culture/proposition.md`. Niveau `dataviz-metier` : avancé (page), chaque bloc relu au niveau base.

## L'histoire

Le cadrage titrait « 1 824 édifices labellisés depuis 2000 » : un inventaire, pas une histoire, et un chiffre faux
(13 lignes sont « anciennement labellisées » ; le stock est de 1 811). L'exploration a trouvé le paradoxe dans la
**date de construction** (champ multivalué `Datation_de_l_edifice`), pas dans la date du label :

- l'architecture « contemporaine » labellisée a surtout soixante ans : 994 des 1 794 édifices datés (55 %) ont été
  commencés entre 1945 et 1974 ; les années 1950 et 1960 en fournissent 742 (41 %) ;
- 71 seulement (4 %) datent de 2000 ou après ; le plus récent de 2020 ;
- un édifice reçoit le label en moyenne 54 ans après le début de son chantier ;
- 83 édifices encore labellisés ont un chantier commencé en 1926 ou avant, alors que le producteur présente le label
  comme réservé aux moins de cent ans.

**Titre-message** : « L'architecture "contemporaine" labellisée par l'État a surtout soixante ans : un édifice sur deux
date des Trente Glorieuses ».

## Angles écartés

- *Le label par année* comme histoire principale : la série suit les campagnes régionales (2003 : 143 des 150 en
  Auvergne-Rhône-Alpes ; 2017 : 39 sur 39 en Occitanie), pas l'architecture. Gardé en nuance.
- *Densité par habitant* : un compte de labels dépend du rythme des commissions, pas du parc construit.
- *Propriétaires* : `Statut_juridique_du_proprietaire` vide pour 1 352 des 1 824 lignes.
- *« Anciennement labellisés, souvent devenus MH »* (cadrage) : 3 sur 13 seulement portent une référence `PA…`.

## Plan de page (accroche → preuve → nuance → exploration → conclusion)

1. Titre-message, chapô calculé, 4 KPI (stock, part 1945-1974, part 2000+, âge moyen au label).
2. Preuve : barres par décennie de début de chantier, onze classes fixes, 1950 et 1960 mises en évidence.
3. Nuance 1 : barres par année du label (pics 2003, 2015, 2023) + barres triées par région (la région dit où l'on a
   labellisé).
4. Nuance 2 : familles de dénomination (cinq familles entre 235 et 296 édifices : la vie quotidienne).
5. Nuance 3 : architectes (≥ 10 édifices ; Andrault et Parat 23 chacun, tous cosignés ; Pouillon 21) et
   l'Organisation Todt (13 ouvrages du mur de l'Atlantique et bases sous-marines).
6. Nuance 4 : les 83 « centenaires », en tableau.
7. Exploration : recherche (nom, commune, auteurs), facettes (période, région, département), 3 KPI de la sélection,
   carte des points colorée par période, tableau exportable.
8. Ce qu'on ne montre pas ; `#analyse`.

## Honnêteté

- Année de construction = la plus petite année citée (début connu du chantier). `numeric` lit le nombre de tête :
  « 1922-1930 » → 1922. 17 édifices sans année (15 datations vides, 2 phrases) : hors des parts, dit en page.
- Parts calculées sur les édifices datés (1 794), dénominateur affiché.
- Âge au label : moyenne d'âges (pas de taux), sur les édifices datés ayant une année de label.
- Familles : recodage par mots sur les termes de dénomination, compte d'édifices **distincts** par famille ; un édifice
  peut relever de deux familles, 47 n'entrent dans aucune (dit en page).
- Architectes : rôle exact « (architecte) », compte d'édifices distincts.
- « Centenaires » : borne 1926 écrite en clair (« cent ans ou plus en 2026 ») ; la page ne dit pas ce que prévoit le
  droit pour eux, seulement ce que dit la description du jeu.

## Phrases de lecture

Toutes calculées (`dsfr-data-repeat` sur une ligne de synthèse) : parts, effectifs, année la plus récente, années du
label min/max, 2003 et 2017 (région dominante), Organisation Todt, lignes sans date / sans label / sans coordonnées,
lignes « anciennement labellisées ».

## Ce qu'on ne montre pas

Anciennement labellisés (13), édifices sans année (17), sans année de label (5), sans coordonnées (78), types
exclusifs, densité par habitant, propriétaires, historique des retraits.
