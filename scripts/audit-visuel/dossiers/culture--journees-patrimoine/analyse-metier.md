# Journées du patrimoine 2023 — analyse métier

Page : `public/culture/journees-patrimoine.html` (`/culture/journees-patrimoine`). Fiche 23 du cadrage
`docs/portail-culture/proposition.md`. Jeu : *Journées européennes du patrimoine 2023*, ressource Tabular
`22c595ae-8104-4911-b7c3-3cad982eee9c` (28 395 lignes, une ligne = un événement OpenAgenda).

## L'histoire

Titre provisoire du cadrage : « 28 395 événements, un sur cinq accessible en fauteuil ». Les chiffres tiennent
(5 910 événements contiennent « handicap moteur », 20,8 %), mais **le titre trompait** : 22 257 événements
(78,4 %) ne renseignent **aucune** accessibilité. « Un sur cinq accessible » laisse entendre « quatre sur cinq
inaccessibles » ; le fichier ne le dit pas. L'histoire devient donc celle de la **déclaration** :

> Un événement sur cinq se dit accessible en fauteuil, les quatre autres ne disent rien.

La preuve que le champ mesure la saisie et non le lieu : dans les lieux labellisés « Tourisme et handicap »,
44 % seulement des 722 événements déclarent le fauteuil et 53 % ne déclarent rien ; et sur 1 588 lieux à
plusieurs événements qui déclarent au moins une fois le fauteuil, 981 (62 %) ont d'autres événements qui ne le
déclarent pas.

## Plan de page

1. Accroche : titre-message + chapeau calculé + 4 KPI (événements, lieux 18 322, 20,8 %, 78,4 %).
2. Preuve : barres par handicap déclaré (moteur 5 910, intellectuel 1 081, psychique 938, auditif 873, visuel 690).
3. Contraste : part déclarée par tag du lieu (≥ 500 événements, 24 barres) — archives 38 %, musées 30 %,
   châteaux 15 %, jardins remarquables 12 %, monuments historiques 18 % ; « Tourisme et handicap » en tête
   (44 %) mis en évidence parce qu'il devrait être à 100 %.
4. Nuance : un même lieu, deux réponses (981 / 607 / 3 118).
5. Où : part par région (≥ 40 événements) — Hexagone de 16,5 % (BFC) à 25,4 % (Hauts-de-France).
6. Exploration : facettes (déclaration, handicap, région, tag, premier jour) + liste + KPI de sélection.
7. Ce qu'on ne montre pas ; analyse.

## Forme

Barres horizontales triées partout (libellés longs, comparaison de parts). Contraste `neutral` + `highlight-index`
sur la barre qui porte le message. Pas de carte : 28 395 points ne racontent pas la déclaration, et la colonne
département est inexploitable (126 graphies, 664 vides).

## Honnêteté

- Parts d'**événements**, jamais de lieux ; jamais « inaccessible » pour « non renseigné ».
- Tags et handicaps multivalués : `explode`, et la page dit que les barres ne s'additionnent pas.
- Seuils d'affichage (500 événements par tag, 40 par région) dits sous les graphiques ; 386 événements sans région
  comptés dans les totaux, hors graphique régional.
- L'hypothèse « le bâti ancien pèse » est écrite comme hypothèse non démontrable par le fichier.

## Phrase de lecture (tag)

« Dans les services d'archives, 38 % des événements se déclarent accessibles en fauteuil ; […] dans les lieux
labellisés Tourisme et handicap, seuls 44 % des 722 événements déclarent l'accès en fauteuil, et 53 % ne
déclarent rien du tout. » — calculée (`dsfr-data-repeat` sur une ligne de synthèse).

## Ce qu'on ne montre pas

Accessibilité réelle des lieux ; carte départementale ; fréquentation ; autres éditions ; séances multiples ;
doublons entre agendas régionaux.
