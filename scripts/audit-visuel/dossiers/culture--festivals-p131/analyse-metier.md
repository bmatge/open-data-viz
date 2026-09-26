# Festivals soutenus par l'État (programme 131) — analyse métier

Création (pas d'original). Page : `public/culture/festivals-p131.html`, URL `/culture/festivals-p131`.
Cadrage : fiche 25 de `docs/portail-culture/proposition.md`. Niveau dataviz-metier : avancé.

## Le jeu

« Festivals financés au titre du programme 131 : Création » (ministère de la Culture, DGCA),
ressource Tabular `e4761b32-c601-4ec9-b361-658315d07389`, 1 602 lignes, 10 colonnes, export Parquet
disponible. **Une ligne = une aide** (année × festival × guichet), pas un festival. Aides des DRAC et
de l'administration centrale (« Région = DGCA »). Seul le programme 131 : ni les autres programmes
du ministère, ni les collectivités.

## L'histoire

Question : « À qui va l'argent que l'État consacre aux festivals de la création ? » Lecteur : presse,
élus, organisateurs de festivals.

Chiffres rejoués le 2026-09-27 sur les 1 602 lignes (pagination Tabular via le tunnel, Python), puis
relus identiques à l'affichage (Playwright) :

| Mesure (2024) | Valeur |
|---|---|
| Aides / crédits | 810 / 31 740 281 € (797 noms distincts) |
| Aix (DGCA) / Avignon (DGCA) | 5 108 000 € / 4 336 398 € → 29,8 % à eux deux |
| Festival d'Automne (3e) | 1 380 000 € ; 4e (Musica) 862 750 € |
| Rang où l'on franchit 50 % des crédits | 12e aide (cumul 11e : 49,8 %) |
| Aides ≤ 10 000 € | 503 (62,1 %) pour 3 291 173 € (10,4 %) < Aix seul |
| Aide moyenne | 39 186 € (médiane 10 000 €, non affichée : pas d'agrégat médiane) |
| Administration centrale | 18 aides, 11,71 M€ (36,9 %) |
| DRAC la plus dotée | PACA 2,66 M€, 109 aides ; Aix = 1,9 × PACA |
| Théâtre (après `trim` : « Théâtre » saisi une fois avec espace) | 63 aides, 6,46 M€, Avignon 67 % |
| Musiques de répertoire et contemporaine | 9,48 M€, Aix 54 % |
| Tranche > 500 000 € | 7 aides (0,9 %), 44,1 % des crédits |
| 2023 (contrôle) | 792 aides, 31,74 M€, Aix + Avignon 28,5 %, DGCA 36,6 %, ≤ 10 000 € 57,1 % |

Le titre provisoire (« Aix et Avignon d'abord ») tient. Titre retenu : « Aix et Avignon reçoivent
près de trois euros sur dix » (29,8 % en 2024, 28,5 % en 2023).

## La forme

1. Chapô + 3 KPI calculés (crédits, part d'Aix et d'Avignon, part des petites aides).
2. Barres horizontales triées, top 15, deux premières en évidence (contraste) ; tableau a11y avec
   part et part cumulée (`share_percent` + `running_sum`).
3. Barres groupées par tranche : part des aides (gris) contre part des crédits (bleu) — la forme
   qui montre la concentration sans courbe de Lorenz.
4. Nuance domaine : barres empilées « Aix et Avignon » / « autres festivals » — le théâtre n'est
   gros que par Avignon.
5. Nuance guichet : DGCA à part (ce n'est pas une région), barres des DRAC en volumes, dit comme tel.
6. Stabilité : tableau 2023 / 2024 (deux années, pas une tendance).
7. Exploration : facettes (année toujours fixée par `default="annee:2024"` et `radio-inline`,
   guichet, région, domaine, tranche), 3 KPI, liste triée par montant.

## L'honnêteté

- Une ligne = une aide : les festivals se comptent en noms distincts ; « France Design Week » a
  dix lignes en 2024.
- Additionner les deux années compterait deux fois : l'exploration impose une année.
- Moyenne (39 186 €) citée pour dire qu'elle ne représente rien ; tranches à la place de la médiane.
- Part d'Aix et d'Avignon = part **des crédits de ce programme**, pas de leur budget.
- Régions en volumes, pas par habitant (pas de population dans le jeu) ; Aix et Avignon absents
  du classement régional (versés par la DGCA).
- Aix et Avignon repérés par motif de nom, homonymes vérifiés (Off d'Avignon et « Cycle de
  musiques sacrées du Festival d'Avignon » : DRAC PACA ; TOMA : sans « FESTIVAL D »).

## La phrase de lecture

« En 2024, deux festivals, Aix-en-Provence et Avignon, reçoivent 29,8 % des 31,7 M€ que le programme
131 consacre aux festivals ; les 503 aides de 10 000 € ou moins, six sur dix, en reçoivent 10,4 %,
moins que le seul Festival d'Aix. »

## Ce qu'on ne montre pas (dit en page)

Tout l'argent public des festivals ; le nombre exact de festivals (SIRET : 3 manquants sur 810 en
2024, **792 sur 792 en 2023** — le cadrage disait « souvent vide » : c'est une année entière) ;
le lien avec le recensement (pas de clé) ; montants par habitant ou par spectateur ; une carte (pas
de coordonnées) ; une tendance (deux années).

## Angles écartés

- Carte départementale par code postal : codes « 00000 » (15), Corse ambiguë, code INSEE souvent
  vide ; les régions suffisent à la question.
- Croisement avec la liste des festivals (fiche 5) : pas de clé commune.
