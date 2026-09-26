# Emploi culturel par département — analyse métier

Page : `public/culture/emploi-culturel.html` (création, fiche 9 de `docs/portail-culture/proposition.md`).
Jeux : établissements culturels employeurs par département 2016-2022 (`ed8f9703…`, 700 lignes) ;
ETP salariés des secteurs culturels par département 2016-2022 (`2308f8e2…`, 700 lignes). Ministère de la Culture (Deps-Doc).

## L'histoire

Le cadrage titrait sur les établissements : 9,1 % des établissements employeurs parisiens sont culturels,
1,6 % dans les Ardennes (2022). C'est vrai, mais c'est la **concentration de l'emploi** qui raconte :
Paris pèse 7,7 % de l'emploi salarié du pays et **31,9 %** de l'emploi salarié culturel ; avec les
Hauts-de-Seine, **43,6 %** de l'emploi culturel pour 23,2 % des établissements culturels et 12,2 % de
l'emploi total. Dès le 3e département, la part de l'emploi culturel est **inférieure** à la part de
l'emploi total (sauf Seine-Saint-Denis). Titre retenu : « Emploi culturel : Paris pèse 8 % de l'emploi
salarié du pays, mais 32 % de celui de la culture ».

Angles écartés : le classement des taux (Paris/Ardennes) seul — il dit « métropoles », pas « Paris » ;
l'évolution en effectifs d'établissements — rupture de série 2016→2017.

## Plan

1. Titre-message + chapô calculé (Paris 7,7 / 31,9 % ; 1 sur 11 à Paris, 1 sur 62 dans les Ardennes) + 3 KPI.
2. Preuve : barres groupées top 10, part de l'emploi culturel vs part de l'emploi total.
3. Carte : part des établissements culturels, résumé pondéré (3,74 %, ratio de sommes ; la moyenne des taux ferait 3,0 %).
4. Nuance : établissements vs emploi (23,2 % / 43,6 %) ; 4,7 ETP par établissement en France, 13,2 dans les Hauts-de-Seine, 1,5 en Lozère.
5. Temps : part de Paris 30,1 % (2016) → 31,9 % (2022), axe à zéro ; creux 2020 (culture = 1,71 % de l'emploi salarié).
6. Exploration : tableau des 100 départements, recherche, export, évolution 2017-2022 en points.
7. Ce qu'on ne montre pas ; analyse.

## Honnêteté

- `Pct_culturel` publié jamais moyenné ni utilisé : tous les taux recalculés depuis les effectifs.
- Rupture de série : total des établissements +15 % entre 2016 et 2017, puis +1 à +4 %/an. Évolutions en parts, écart pris 2017-2022.
- Emploi salarié en ETP seulement (ni intermittents au cachet hors champ, ni auteurs, ni indépendants).
- Emploi rattaché à l'établissement déclarant (effet siège possible, non vérifiable dans le jeu : formulé prudemment).
- Mayotte absente (100 départements). Notice des jeux périmée (« Données 2018 », « zone d'emploi »).

## Phrase de lecture (chapô)

« En 2022, Paris concentre 7,7 % des emplois salariés de France, en équivalents temps plein, mais 31,9 %
de ceux des secteurs culturels » — calculée par `dsfr-data-repeat`, rien en dur.
