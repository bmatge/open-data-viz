# Analyse metier — Capytale Analyse des usages

> La lecture `dataviz-metier` : le sens avant la syntaxe.
> **Ce fichier n'est jamais ecrase par un script.** Les sorties du modele
> multimodal arrivent dans `constats/` ; ce qui est retenu se reecrit ici, a la main.

## La question posee, et pour quel lecteur

Capytale se diffuse-t-elle, et de la meme facon partout ? Pour un lecteur de pilotage
(DNE, rectorats) comme pour le grand public : la croissance d'abord, puis l'inegalite de
diffusion entre academies, une fois la taille des academies neutralisee.

## L'histoire trouvee (recreation du 2026-09-26)

- **La croissance** : 5 202 747 visites rattachees a une academie en 2025-2026 contre
  4 058 980 en 2024-2025, **+28 %**, et l'annee la plus recente au-dessus de la precedente
  **chaque mois** de septembre a aout (verifie mois par mois a l'API).
- **L'ecart, qui renverse la page precedente** : le classement en volume (Orleans-Tours,
  Versailles, Normandie...) mesurait la taille des academies. Rapporte aux eleves du second
  degre de la rentree 2025 (jeu DEPP `fr-en-mode-hebergement-eleves-etablissements-2d`, meme
  portail, meme casse d'academie), l'usage va de **20 visites pour 100 eleves
  (Clermont-Ferrand) a 221 (Orleans-Tours)**, un rapport de **un a onze** ; moyenne nationale
  ponderee 92. Versailles, 2e en volume, passe sous la moyenne (80).
- **L'exception geographique** : les trois academies d'Auvergne-Rhone-Alpes (Lyon 22,
  Grenoble 29, Clermont-Ferrand 20) sont parmi les cinq dernieres. Cause non etablie ; ecrit
  prudemment (mode d'acces possible).
- **La nuance** : le jeu par academie = les visites connectees (a moins de 1 % pres, le jeu
  par profil compte les memes). Leur part dans les visites du site recule : **68 % (2023-2024),
  63 %, 58 % (2025-2026)**. Le site croit plus vite (+38 %) que ce que les academies mesurent.
- **Recul** : Martinique (-8 %) et Grenoble (-4 %) sont les deux seules academies en baisse.

## La forme retenue, et pourquoi elle sert cette question

1. KPI d'accroche (volume + evolution, taux national, rapport max/min, part rattachee).
2. Courbes par mois de l'annee scolaire, 2024-2025 contre 2025-2026 (avant/apres a mois egal :
   la croissance se lit sans etre brouillee par la saisonnalite).
3. Barres horizontales triees du taux pour 100 eleves, puis carte map-aca du meme taux
   (la carte se justifie : le creux AURA est spatial).
4. Barres empilees par annee : visites rattachees / sans academie (la nuance).
5. Exploration : selecteur d'academie + 36 barres mensuelles + tableau triable.

## Honnetete de l'echelle

- Axes a zero (courbes et barres).
- Moyenne nationale = ratio de sommes (`visites100:sum / eleves:sum`), jamais moyenne de taux ;
  resume de carte `map-summary="weighted"` pondere par les eleves, calcule sur la colonne brute
  (`map-summary-field="taux"`), la colonne arrondie ne servant qu'au trace.
- 2023-2024 retiree des courbes : son septembre, sorti de la fenetre glissante, etait dessine
  **a zero** (vu au navigateur).

## Phrase de lecture

Calculee (`dsfr-data-repeat` sur une ligne de resume : pivot des annees + deux jointures sur
cle constante) : « De septembre 2025 a aout 2026, ... 5 202 747 visites ..., 28 % de plus ...
de 20 pour 100 eleves (Clermont-Ferrand) a 221 pour 100 eleves (Orleans-Tours) : un ecart de
un a 11 ». Idem pour la part rattachee (68 / 63 / 58 %) et les academies en recul.

## Ce qu'on ne montre pas, et qu'il faut dire

- Des visites, pas des eleves (aucun visiteur unique par academie).
- Denominateur = second degre seulement (CM1-CM2 et CPGE hors champ) ; enseignants au
  numerateur (~9 %).
- AEFE (419 visites en 2025-2026) sans effectif DEPP : hors taux. Polynesie francaise dans le
  classement, pas sur la carte (hors decoupage DSFR Chart).
- Fenetre glissante de 36 mois ; septembre 2026 en cours (donnees au 2026-09-25).
- Actions par visite ecartees : saut de ~6,5 a ~7,5 en fevrier 2026 dans 31 academies sur 32 a
  la fois, jusqu'en juin — rupture de mesure plus vraisemblable qu'un changement d'usage. La
  page precedente en faisait un classement.

## Ecarts avec l'original

- L'original n'a aucun denominateur ; ses classements en volume sont ecrits a la main.
- Il cite deux jeux sans les lire ; ils portent ici la nuance (visites rattachees, profils).
