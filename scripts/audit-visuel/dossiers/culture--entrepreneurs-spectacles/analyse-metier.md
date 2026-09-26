# Analyse métier — culture / entrepreneurs-spectacles

Fiche 7 du cadrage `docs/portail-culture/proposition.md`. Niveau `dataviz-metier` : avancé (page
complète), chaque bloc relu au niveau base.

## Jeu

Ministère de la Culture — *Licences et demandes de licences d'entrepreneurs de spectacles vivants*
(dataset `5fc9b4729dbf684fecb13bae`, ressource Tabular `fb6c3b2e-da8c-4e69-a719-6a96329e4cb2`,
mise à jour quotidienne, export Parquet 3,5 Mo). 115 832 lignes le 2026-09-26, dépôts du
2020-04-23 au 2026-09-26. **Une ligne = une déclaration pour une catégorie**, pas une structure.

Définitions des statuts (description du jeu) : valide = vaut licence cinq ans ; invalide = refusée
(forme ou fond) ou jamais mise en conformité ; expiré = cinq ans écoulés ; invalidé = retirée après
validité (cessation, infraction, ou renouvellement anticipé) ; en instruction.

Population : *Dépenses culturelles des régions 2023* (`4dfccc0d-962c-4800-8599-b47730823a33`,
17 lignes, `libelle_region` identique au caractère près à `region_siret`, tirets compris). Mayotte
absente.

## L'histoire

Le cadrage titrait « un sur deux encore valide ». C'est vrai (63 159 / 115 832 = 54,5 %) mais c'est
un instantané. La donnée raconte un **cycle** : la licence vaut cinq ans, la base démarre en avril
2020, donc la première génération (2020) expire depuis juillet 2025 (20 654 expirées en quatorze
mois), la suivante (20 913 licences valides datant de 2021-2022) arrive à échéance d'ici fin 2027.
Les premières demandes, elles, sont stables (8 466 / 8 922 / 7 878 en 2023-2025) ; les
renouvellements font des vagues (14 585 en 2021, 3 832 en 2023, 10 075 en 2025).

**Titre-message retenu** : « Spectacle vivant : une déclaration sur deux vaut licence, et la
génération de 2020 arrive au bout de ses cinq ans ».

Angles écartés :
- « 55 % sont des renouvellements » (cadrage) : vrai (63 962), gardé en phrase de lecture, pas en
  titre — le chiffre agrège deux vagues de nature différente (renouvellement de licences antérieures
  à la base en 2020-2022, échéance des licences de 2020 en 2025-2026).
- Carte départementale pour 100 000 hab. : département en toutes lettres avec encodage cassé
  (« Isčre »), et le fichier de population départementale du ministère n'a pas Paris (ni Guyane,
  Martinique ; Alsace fusionnée). Le taux aurait manqué le premier département. Remplacé par un taux
  régional.
- Type de déclarant : deux nomenclatures coexistent (« Personne morale » 84 221 vs « une
  association de loi 1901 » 16 311) — pas de part associative honnête.

## Plan de page (ordre de l'argument)

1. Chapô + 4 KPI : valides 63 159, structures (SIRET distincts) 41 030, refusées 22 %, expirées 20 654.
2. Preuve — statuts (barres horizontales, valide mis en évidence).
3. Le cycle — dépôts mensuels, premières demandes vs renouvellements (deux courbes).
4. L'échéance — expirées par mois (gris) et licences valides à leurs cinq ans (bleu), juillet
   2025 – décembre 2027 (barres empilées). Nuance : une licence expirée n'est pas une structure
   disparue — 9 180 sur 20 612 (45 %) ont une licence valide ou en instruction sous le même SIRET et
   la même catégorie ; au SIREN (hors page, daté) 11 942 / 20 654 = 58 %.
5. Qui — catégories (producteurs 37 599, 60 %).
6. Où — licences valides pour 100 000 hab. par région : Occitanie 124, IDF 102 (mais 20 % du volume),
   ensemble 91, Hauts-de-France 50, Guyane 34.
7. Exploration — facettes (statut par défaut « valide »), recherche, liste, export.
8. Ce qu'on ne montre pas. 9. Analyse.

## Honnêteté

- Unité : « déclarations » et « licences » partout ; « structures » seulement pour le KPI groupé par
  SIRET.
- Taux, pas volumes, pour la géographie ; ratio de sommes pour l'ensemble (91), jamais moyenne de
  taux.
- Série mensuelle : premier mois (avril 2020, à partir du 23) et dernier mois incomplets, dit sous
  le graphique.
- Renouvellement au SIRET = minimum, dit en page ; la mesure au SIREN est donnée datée.
- Fenêtre d'échéance fixe (juillet 2025 – décembre 2027) écrite dans le titre du graphique.
- 32 licences encore « valides » au-delà de cinq ans (liseré bleu sur les barres grises), dit et daté.
- Groupes écartés comptés : 1 222 valides sans région, 22 à Mayotte, 19 sans catégorie, 805 sans SIRET.

## Phrases de lecture (calculées)

Toutes via `dsfr-data-repeat` sur la synthèse (`syn-t`, `syn-d`), la jointure IDF × national, et les
queries `reg-top`, `reg-nat-t`, `reg-bas`, `suite-p`. Aucun chiffre en dur sauf ceux datés du
2026-09-26 (58 % au SIREN, 32 licences en retard de statut) et le rappel du cadrage dans l'analyse.

## Vérification des chiffres

DuckDB sur le Parquet complet téléchargé le 2026-09-26 (via tunnel), comparé à l'affichage relevé au
navigateur : 115 832 ; valide 63 159 ; invalide 25 134 ; expiré 20 654 ; invalidé 5 094 ; en
instruction 1 791 ; renouvellement 63 962 ; SIRET distincts valides 41 030 ; cat. 1/2/3 valides
8 578 / 37 599 / 16 981 ; validité 2021 + 2022 = 4 099 + 16 814 = 20 913 ; renouvellement au
SIRET 9 180 / 20 612 ; au SIREN 11 942 / 20 654 ; taux régionaux identiques à l'unité.
