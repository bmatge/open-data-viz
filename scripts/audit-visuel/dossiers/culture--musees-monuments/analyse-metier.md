# Analyse métier — Musées de France dans un monument historique (fiche 13, portail Culture)

Page : `/culture/musees-monuments` — création, pas de page d'origine.
Jeux : Muséofile (ministère de la Culture), ressource Tabular `5ccd6238-4fb0-4b2c-b14a-581909489320`,
1 216 lignes, export Parquet du 2026-09-21 ; Fréquentation des Musées de France, ressource
`7708e380-e7f8-4b56-936a-5d2a262d852d` (dernière année : 2024). Niveau dataviz-metier : avancé.

## L'histoire

**Titre-message** : « Quatre musées de France sur dix occupent un monument historique, et reçoivent
deux entrées sur trois ».

Rejoué en pandas sur les deux exports Parquet le 2026-09-27, identique à l'affichage :

- 1 216 musées, 1 216 identifiants distincts. `Protection_batiment` contient « monuments historiques »
  (sans tenir compte de la casse) : **487 = 40,0 %** (486 en respectant la casse). 727 cellules vides,
  2 remplies sans rapport (« Site patrimonial remarquable. », « BtuA (Bernard Tschumi Architectes) »).
- Contrôle indépendant : la colonne `Refmer` (références Mérimée) porte une référence PA pour 475 des
  487, et pour 7 seulement des 729 autres. Le champ déclaratif est cohérent.
- Jointure avec la fréquentation 2024 (sites additionnés par `IDMuseofile`) : 70 474 094 entrées
  rattachées ; musées en MH **47 003 577 = 66,7 %** ; hors Louvre et Versailles **56,1 %**
  (29 964 424 / 53 434 941). 718 151 entrées sans identifiant Muséofile rattachable (Metz, Lens, et
  9 204 sur deux identifiants absents de Muséofile), hors calcul, dit en page.
- **Gradient** (la preuve) : part en MH par tranche d'entrées 2024 : ≥ 1 M 7/10 (70 %),
  100 000-1 M 49/96 (51,0 %), 10 000-100 000 209/415 (50,4 %), < 10 000 112/350 (32,0 %),
  aucune entrée 110/345 (31,9 %). Médiane (hors page) 22 820 contre 10 911 entrées.
- Régions : Bourgogne-Franche-Comté 53/101 (52,5 %) en tête, Pays-de-la-Loire 14/54 (25,9 %) en
  dernier ; Île-de-France 65/133 (48,9 %).
- Domaines (casse ramenée, multivalués) : arts décoratifs 210/397 (52,9 %) en tête des domaines
  ≥ 150 musées, technique et industrie 95/278 (34,2 %) en dernier.

## Corrections du cadrage

- « 133 sont en Île-de-France » : faux. 133 est le nombre de musées de France franciliens ; 65 sont
  dans un monument historique.
- 487 ne tient qu'en ignorant la casse (une cellule en minuscules).
- L'histoire ne s'arrêtait pas au compte : la jointure avec la fréquentation donne le message (deux
  entrées sur trois), et le gradient par tranche en est la preuve.
- EIN (expositions d'intérêt national) : écartées, autre question.

## La forme

- Chapô + 4 KPI (compte, part, part des entrées, part hors Louvre-Versailles — le KPI qui répond
  d'avance à « c'est juste le Louvre »).
- Barres verticales ordonnées par tranche (ordre de grandeur, pas de tri par valeur), échelle 0-100.
- Barres horizontales triées région et domaine, meilleure mise en évidence, reste en gris.
- Carte de points colorée par statut (rayon fixe : `radius-field` linéaire en rayon, pas de racine
  carrée dans `compute`), facettes, liste avec le texte brut de la protection.

## Honnêteté

- Parts calculées en ratio de comptes (jamais de moyenne de taux).
- « Sans protection déclarée », pas « non protégé » ; le minimum est dit, et étayé par `Refmer`.
- Petits effectifs dits : tranche du million (10 musées), Corse (10 musées).
- Multi-domaines : barres non additives, dit sous le graphique.
- Pas de causalité : note sous le premier graphique.

## Phrase de lecture

« Parmi les 10 musées qui dépassent le million d'entrées, 7 sont dans un monument historique (70 %).
Parmi les 350 qui en reçoivent moins de 10 000, la part tombe à 32 %. »

## Ce qu'on ne montre pas

Musées sans protection déclarée (minimum), casse, musées sans entrée, entrées sans musée, niveau
de protection (classé/inscrit), protections d'espace, EIN.
