# Analyse metier — IPS EREA

> La lecture `dataviz-metier` : le sens avant la syntaxe.
> **Ce fichier n'est jamais ecrase par un script.** Les sorties du modele
> multimodal arrivent dans `constats/` ; ce qui est retenu se reecrit ici, a la main.

## La question posee, et pour quel lecteur

Où se situent socialement les élèves des EREA par rapport à ceux du collège public, et cet
écart évolue-t-il ? Lecteur : grand public, décideur académique — pas l'explorateur d'un
établissement (servi en section 4).

## L'histoire trouvée (recréation du 2026-09-26)

- **L'écart** : rentrée 2024-2025, IPS moyen des 77 EREA 80,9 contre 100,2 pour les 5 326
  collèges publics (19,3 points). 88,3 % des EREA sont sous 90, contre 23,1 % des collèges
  publics ; 81,8 % des EREA tiennent dans la bande 70-90, où ne sont que 21,5 % des collèges.
- **La rupture** : l'écart vaut 26,4 → 25,3 points avec l'ancienne méthode (2016-2022), 19,6 →
  19,3 avec la nouvelle. Il a perdu ~6 points en 2022 **par la méthode seule** : les mêmes 76
  EREA gagnent +5,6 points de 2021-2022 à 2022-2023 (74 en hausse), les collèges publics +0,1.
  À méthode constante (2022-2023 → 2024-2025), +0,7 point. Sans suivi apparié on titrait
  « l'écart se réduit ».
- **L'exception** : deux EREA seulement dépassent 100, voisins, dans les Hauts-de-Seine
  (Vaucresson 125,9, Garches 109,9). Le plus bas : Mamoudzou 63,3, seul ultramarin et seul privé.
- **Trouvaille qui renverse la page précédente** : `ips_departemental` / `ips_academique` ne sont
  pas des références du territoire mais la moyenne (pondérée) des SEULS EREA du département ou
  de l'académie. 49 départements sur 61 n'ont qu'un EREA, dont la « référence » est son propre
  IPS (égalité stricte vérifiée sur les 49). La carte précédente colorait donc 49 EREA « au-dessus
  de la référence départementale » par simple égalité (`else` de `ips < ips_departemental`).

## La forme retenue, et pourquoi elle sert cette question

1. Barres groupées de répartition (% de chaque population par classe de dix points) : deux
   distributions qui se touchent à peine — plus parlant qu'une moyenne.
2. Courbes de niveau des deux populations + ligne de rupture 2022 : montre QUI bouge (les EREA),
   ce qu'une barre d'écart ne dit pas.
3. Phrases pour les exceptions (trois établissements : un graphique ne battrait pas le texte).
4. Carte colorée par classe d'IPS, recherche, facettes académie/département, tableau.

## Honnetete de l'echelle

- Moyennes d'établissements (aucun jeu ne porte les effectifs) ; `ips_national` (82,2, DEPP)
  pèse autrement, signalé en note.
- Comparaison aux collèges **publics** (76 EREA sur 77 publics).
- Parts `share_percent` sur l'ensemble de chaque population ; classes sans EREA = 0, pas absentes.
- Courbe en y 60-110 : grandeur d'indice, pas un volume ; l'écart est dit en texte.

## Phrase de lecture

« À la rentrée 2024-2025, 88,3 % des EREA ont un IPS inférieur à 90, contre 23,1 % des collèges
publics. » — calculée (`dsfr-data-repeat` sur `dist-sous90`).

## Ce qu'on ne montre pas, et qu'il faut dire

- Les références départementale/académique (trompeuses, note 2 de la page).
- Deux EREA sans IPS en 2022-2023 (hors moyenne et hors suivi).
- La spécialité des EREA (handicap moteur, etc.) : absente du jeu, donc pas d'explication des
  deux exceptions.
- La cause du saut de 2022 : hypothèse écrite comme telle.

## Ecarts avec l'original

- Série de neuf rentrées au lieu d'une rentrée figée ; dernière rentrée 2024-2025 (la page
  précédente était figée sur 2023-2024).
- Comparaison aux collèges publics (second jeu), absente de l'original.
- Carte colorée par classe d'IPS (original : épingles uniformes).
- Facette « secteur » retirée (un seul privé) ; facette classe d'IPS retirée (tri alpha
  incohérent sur des classes numériques ; la légende porte l'information).
