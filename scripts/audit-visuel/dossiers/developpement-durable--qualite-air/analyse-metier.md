# Analyse métier — L'air des villes s'est assaini en vingt-cinq ans, sauf l'ozone

Niveau **avancé** (skill `datavizMetier`) : une page de récit, sept fichiers DiDo, neuf graphiques.

## La question et le lecteur

« Respire-t-on mieux qu'en 2000 ? Où reste-t-on hors norme ? » — grand public, presse locale.
Hors objet : la qualité de l'air intérieur, les émissions (inventaires Citepa), la santé.

## L'histoire

Figure dominante : **le contraste** (quatre polluants qui baissent, un qui ne baisse pas), doublé
d'une **exception** (l'ozone suit les étés, pas la tendance). Chiffres rejoués le 2026-09-26, millésime
2025-10 :

- NO₂ en fond urbain 29,3 → 12,0 µg/m³ (−59 %), près du trafic 51,8 → 21,9 (−58 %) ;
- indice base 100 en 2000, fond urbain, 2024 : SO₂ 13, NO₂ 43, PM2,5 45, PM10 50, **O₃ 99** (max 126 en 2003) ;
- agglomérations hors norme NO₂ 20 % → 1,2 % ; ozone 23 % (2000), 66 % (2003), 32 % (2020), 9,9 % (2024) ;
- depuis 2000, 64 % des agglomérations suivies ont dépassé la norme ozone au moins une année, 25 % pour le NO₂ ;
  17 agglomérations l'ont dépassée chaque année mesurée ; Paris 25 ans sur 25 pour le NO₂.

Écart au cadrage : aucun sur le message. Le fichier « indice base 100 » (b10a6294), absent du cadrage,
porte l'ozone et devient la preuve principale — plus directe que les concentrations, qui n'ont pas d'ozone.

## La forme

1. Chapô + 4 KPI (NO₂ −59 %, NO₂ hors norme 1,2 %, ozone hors norme 9,9 %, indice ozone 99).
2. **Petits multiples** de l'indice, même échelle (0-130), ligne « niveau 2000 », ozone seul en couleur
   (palette calculée dans la donnée, interpolée par `dsfr-data-repeat`).
3. Nuance NO₂ : fond / trafic avec valeurs limites 40 et 20 µg/m³ (directive 2024/2881, 2030).
4. Rupture : part des agglomérations hors norme, NO₂ contre ozone.
5. Nuance ozone : barres triennales, repère « été 2003 ».
6. Exploration : barres triées (ozone mis en évidence), exceptions de la dernière année, tableau de
   822 lignes avec facette polluant, recherche et export.
7. Ce qu'on ne montre pas.

Écartées : un graphique multisérie des cinq indices (illisible, et null tracé à 0 pour PM2,5 avant
2009) ; une carte (les agglomérations n'ont ni code commune ni géométrie dans le fichier).

## L'honnêteté

- « En dépassement » ≠ « pollué » : norme réglementaire, recommandations OMS plus strictes — dit deux fois.
- Moyennes de stations dont le nombre change et n'est pas publié — dit sous le graphique NO₂ et en fin de page.
- Aucune moyenne de taux calculée par la page : toutes les parts viennent du SDES ; les parts
  « au moins une année » sont des ratios de comptes (n / tot).
- Les séries PM10 (2007) et PM2,5 (2009) ne sont pas tracées avec celles qui commencent en 2000 : la
  bibliothèque aurait dessiné des zéros (vérifié). Leurs chiffres sont donnés en phrase.
- Ozone et étés chauds : présenté comme une lecture, pas une mesure (pas de températures dans le jeu).
- DROM et PM10 : attribution aux brumes de sable présentée comme « habituellement attribuée », le fichier
  ne distingue pas les sources.
- Couleur : pas de couleur « auto » ; aucune couleur ne code bon/mauvais.

## Phrases de lecture

Toutes calculées (`dsfr-data-repeat` sur une `dsfr-data-query limit="1"` ou une jointure sur la dernière
année). En dur, et assumés : 2000 (première année du fichier, et le « vingt-cinq ans » du titre), les
valeurs limites réglementaires (40 et 20 µg/m³, OMS 10), l'été 2003.

## Ce qu'on ne montre pas

Nombre de stations ; autres polluants ; norme ozone végétation ; les deux codes du même polluant
(PM2_5 / PM25) ; différence de couverture entre fichier annuel (185 agglos en 2024) et fichier
pluriannuel (266 codes) ; lignes vides de l'indicateur d'exposition (porte-objectifs 2025-2030).
