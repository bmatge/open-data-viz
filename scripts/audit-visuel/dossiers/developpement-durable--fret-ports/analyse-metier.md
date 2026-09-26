# Analyse métier — Fret : les ports et le rail (deuxième vague, portail Développement durable)

Page : `/developpement-durable/fret-ports` — création, pas de page d'origine.
Jeux SDES (DiDo) :
- Maritime : marchandises (jeu 13, `6870fd60…`) — fichier `89c4e831-…` port × année × sens,
  1 540 lignes, 2000 → 2025 (millésime 2026-08), réduit par `columns=` (864 → 398 Ko) ;
- Rail : marchandises (jeu 8, `677d45b0…`) — fichier national `b7894d99-…` (2 980 lignes, 1980 →
  2025, `columns=` 642 → 335 Ko) et fichier « conventionnel et combiné » `478d95f8-…` (57 lignes,
  2016 → 2025) ;
- Fluvial : marchandises (jeu 22, `66684be9…`) — fichier national `ad270003-…` (588 lignes, 2011 → 2024).

Niveau dataviz-metier : avancé.

## L'histoire

**Titre-message** (celui du cadrage, qui tient) : « Cinq ports font les quatre cinquièmes du fret
maritime ; le rail ne décolle pas ».

Rejoué à l'API le 2026-09-26 (exports `/json` complets, dernier millésime) :

- **2025 est publiée** depuis le cadrage : 333,5 Mt, 42 ports déclarants. Cinq premiers (HAROPA 84,4,
  Marseille 74,0, Dunkerque 48,0, Calais 39,1, Nantes-Saint-Nazaire 26,2) = **81,5 %**. En 2024 : 325,5 Mt,
  81,5 % (chiffres du cadrage justes).
- **Tare** : `TONNAGE_TOT = MAR_TOT + TARE_TOT` sur les 1 540 lignes. À Calais, la tare (camions,
  remorques, voitures des ferries) fait **62 %** du tonnage. Hors tare, les cinq premiers font **81,6 %**,
  mais Nantes-Saint-Nazaire (25,8 Mt) passe devant Calais (14,8 Mt, 5,3 %). Vracs liquides : 41 % des tonnes
  de tous les ports ; tare : 16,8 %.
- **Le recul du cadrage (« 2008 → 2024 : −15 % ») mélangeait deux champs** : 21 ports déclarants en 2008,
  39 en 2024, 42 en 2025 (20 en 2000). Série publiée : 384,3 (2008) → 333,5 (2025) = **−13,2 %** ; à liste
  constante (les 20 ports de 2000) : 382,3 → 322,0 = **−15,8 %**.
- **Rail : le « 34,4 → 38,1 Md t-km (2019 → 2025) » du cadrage est faux.** La ligne de total (toutes
  dimensions vides) vaut 34,2 en 2019 et 34,4 en 2025 ; la somme des quatre types (national, international
  entrant et sortant, transit) l'égale exactement chaque année. Le « 88,9 Md t-km à type vide » additionnait
  le total, les matières dangereuses et le détail. 1980 : 66,4 → 2025 : 34,4 (**−48 %**). Depuis 2009 : de
  30,0 (2023 ; 2010 à 29,96 aussi) à 36,5 (2021). Le titre tient : le rail ne décolle pas.
- **L'histoire en plus : le combiné.** 2016 → 2025 : combiné 9,7 → 15,8 Md t-km (**+63 %**) ;
  conventionnel 25,1 → 18,6 (**−26 %**). Le combiné fait 46 % du fret ferroviaire en 2025.
- **Fluvial** : 8,9 (2011) → 6,0 Md t-km (2024), base 100 = 68. Rail 96, ports (liste constante) 90.
- **Secret** : fichier rail, 316 cellules `secret` (TKM et TONNES), toutes dans les lignes par marchandise
  NST ; 1 120 `nd` sur TONNES et 136 `nd` sur TRAINSKM, dans le détail. 0 dans les lignes de total utilisées
  (compté en page). Fluvial : 406 `nd` sur EVP / EVP_KM, colonnes non utilisées. Ports : aucune.

## La forme

1. Chapô calculé + 4 KPI (tonnage des ports, part des cinq, t-km du rail, variation depuis 1980).
2. Preuve : barres horizontales triées, douze premiers ports, les cinq en évidence (`neutral` +
   `highlight-index`) ; part calculée par `share_percent` sur **tous** les ports, avant `limit`.
3. Nuance : barres horizontales empilées des cinq premiers, marchandises par conditionnement + tare —
   Calais se lit d'un coup d'œil.
4. Le temps : deux courbes, série publiée et liste constante (jointures internes sur les ports de la
   première année), axe à zéro.
5. Le rail : courbe 1980 → dernière année, axe à zéro ; phrase avec la fourchette depuis 2009.
6. Nuance rail : conventionnel contre combiné, deux courbes.
7. Conclusion : base 100 sur les années communes aux trois fichiers (ports à liste constante, rail,
   fleuve). Base 100 et non volumes : tonnes et tonnes-kilomètres ne s'additionnent pas.
8. Exploration : facettes façade / statut + liste de tous les ports de la dernière année (tonnage, hors
   tare, part nationale, EVP), export CSV.
9. Ce qu'on ne montre pas ; `#analyse`.

## L'honnêteté

- La part des cinq est une part du **tout**, pas du top (share avant limit).
- La série publiée des ports n'est pas une tendance : le champ s'élargit. Les deux courbes sont dessinées,
  la phrase donne les deux reculs.
- Tonnes portuaires et tonnes-kilomètres ne sont jamais additionnées ; la base 100 le dit sous le graphique.
- Pas de part modale : la route n'est dans aucun des trois jeux, la page ne dit pas « le rail fait X % ».
- Le secret est compté et situé (hors des lignes utilisées), pas seulement mentionné.
- 2009 est écrit en dur (borne éditoriale de la fourchette) ; toutes les autres années sont lues dans la donnée.
- Noms de ports tels que publiés (capitales) : pas de recodage arbitraire.

## Phrases de lecture (calculées)

« En 2025, les cinq premiers ports traitent 271,8 millions de tonnes, soit 81,5 % du fret portuaire. Les
37 autres se partagent les 18,5 % restants. » — « À Calais, 62 % des tonnes sont la tare. » — « À liste
constante — les 20 ports déclarants dès 2000 —, le recul depuis 2008 est de −15,8 %. » — « Le combiné fait
désormais 46 % du fret ferroviaire. »

## Ce qu'on ne montre pas

La route (pas de part modale) ; des volumes additionnés d'un mode à l'autre ; les transbordements comptés
deux fois ; Mayotte et les COM ; le détail par marchandise du rail (secret) ; les fichiers régionaux du rail
et du fleuve.

## Angles écartés

- Part modale rail / fleuve : impossible sans la route.
- Rail par marchandise (NST) : 316 cellules secrètes ; une somme sous-estimerait sans le dire.
- Évolution port par port : 42 courbes illisibles ; la liste d'exploration donne la dernière année.
