# Logements neufs : ventes et prix — analyse métier

Création (pas d'original). Page : `public/developpement-durable/logements-neufs.html`,
URL `/developpement-durable/logements-neufs`. Cadrage : D2 de
`docs/portail-developpement-durable/proposition.md`. Niveau dataviz-metier : avancé.

## L'histoire

Question : « La crise du neuf, c'est quoi en chiffres, et pourquoi les prix ne baissent-ils pas ? »
Lecteur : lecteur de rapport d'abord, puis l'explorateur départemental.

Rejouée à l'API DiDo le 2026-09-26 (fichier national brut, « Toutes constructions », collectif) :

| Mesure | 2019 | 2025 | Écart |
|---|---|---|---|
| Appartements réservés par des particuliers | 131 505 | 61 955 | −53 % |
| Mis en vente | 115 497 | 70 426 | −39 % |
| Stock fin d'année | 104 202 | 115 461 | +11 % |
| Prix €/m², pondéré par les réservations | 4 289 | 4 918 | +14,7 % |
| IPC annuel Insee (base 2025) | 86,18 | 100 | +16,0 % |
| Prix en euros constants | | | −1,2 % |

Sitadel (tous logements, France entière) : commencés 337 731 (2019) → 210 195 (2024), −38 % ;
autorisés 310 518 (2024, plus bas) → 357 452 (2025), +15 %. Commencés 2025 : null dans les 101 départements.

Départements (collectif, 2019 vs 2025) : dix plus gros marchés de 2019 = 47 % des ventes, −58 % ;
le reste −48 % ; 31 des 49 départements à plus de 500 réservations en 2019 divisés par deux ou plus.
Haute-Garonne −73 %, Bouches-du-Rhône −67 %, Gironde −64 % ; Loire +20 % seule hausse parmi eux.
La somme des départements égale le national (131 505 / 61 955) : pas de double compte.

**Écart au cadrage.** Le titre provisoire parlait de « prix qui montent ». En euros courants oui
(+15 %), mais l'inflation a fait +16 % sur la même période : en euros constants, le prix est à plat.
Titre retenu : « deux fois moins de ventes qu'en 2019, des prix qui n'ont pas baissé », et le bloc
prix titre « ils ont suivi l'inflation ». Les chiffres du cadrage (131 505 → 61 955 ; 4 268 → 4 896
sur les départements hors secret) sont retrouvés ; la page prend le prix du fichier national (4 289 →
4 918), qui n'a pas de secret.

## Plan (accroche → preuve → paradoxe → amont → où → explorer → hors champ)

1. Titre-message + chapô calculés + 3 KPI (réservations, prix courant, prix constant).
2. Preuve : barres annuelles 2017→dernière année complète, 2023 en évidence (la cassure).
3. Paradoxe : prix courant et constant, axe depuis zéro.
4. Amont : autorisés et commencés, deux graphiques à même échelle (voir honnêteté).
5. Où : barres triées des dix plus gros marchés de 2019.
6. Explorer : carte du recul (≥ 500 réservations en 2019) + tableau des 96 départements.
7. Ce qu'on ne montre pas, puis `#analyse`.

## Honnêteté

- Prix annuel = moyenne trimestrielle pondérée par les réservations, jamais une moyenne simple.
- Fichier national : chaque logement y est trois fois (`NATURE_PROJET`) → filtre « Toutes constructions ».
- Années incomplètes écartées (compteur de trimestres `nt`) et dites dans « ce qu'on ne montre pas ».
- Mises en chantier de la dernière année : null ≠ 0. Deux pièges successifs (sum de nulls → 0 ;
  graphique à deux séries → null redevient 0), d'où deux graphiques séparés à même échelle.
- Secret statistique : 59 trimestres-départements sur 384 en 2025 (collectif) ont un prix « secret » ;
  comptés et dits sous le tableau. Les réservations ne sont jamais secrètes (0 cellule non numérique
  dans tout le fichier départemental ; 7 546 `PRIX_M2` secrets, dont 1 596 en collectif).
- Carte : seuil de 500 réservations en 2019 (sous ce seuil un rapport n'a pas de sens : Lot-et-Garonne
  1 → 280) ; mesure = recul (foncé = plus fort recul) ; territoires sans valeur peints par DSFR Chart
  d'un bleu hors légende — dit en texte.
- Sitadel ≠ ECLN (champ différent) : dit sous les graphiques d'amont.

## Phrase de lecture (chapô, calculée)

« En {an}, les promoteurs ont vendu {resa} appartements neufs à des particuliers, contre {ref_resa}
en 2019 : {baisse} % de moins. Le prix, lui, est passé de {ref_prix} à {prix} euros le mètre carré
(+{hausse_prix} %) — à peu près ce qu'ont pris tous les prix à la consommation (+{inflation} %). »

## Ce qu'on ne montre pas

Maisons, ventes en bloc, outre-mer (ECLN), annulations, année en cours, séries CVS, causes.

## Hypothèses éditoriales

- 2019 = référence (dernière année pleine avant la crise sanitaire). Écrite dans les `where` de
  référence et dans l'URL départementale (avec 2025) : à déplacer quand 2026 sera complète.
- Déflateur = IPC ensemble France (Insee Melodi), pas un indice du coût de la construction.
