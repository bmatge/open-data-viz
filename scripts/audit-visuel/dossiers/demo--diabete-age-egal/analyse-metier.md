# Le diabète à âge égal — analyse métier

Démonstration n° 4 (pas d'original). Page : `public/demo/diabete-age-egal.html`, URL
`/demo/diabete-age-egal`. Cadrage : candidat A de `docs/demonstrations/propositions-4-5.md`,
validé par Bertrand le 2026-09-27. Niveau dataviz-metier : avancé.

## La question et le lecteur

« La Nièvre, département le plus diabétique de métropole » : vrai sur la carte brute de
l'Assurance Maladie, faux comme lecture de santé publique. Question : où le diabète est-il plus
fréquent **à âge égal**, et que suit cette carte-là ? Lecteur : élu, journaliste local, qui lit le
chiffre brut et va le répéter.

## Les jeux et les clés (unicité du côté droit vérifiée, PG-001)

| Jeu | Accès | Lignes utiles | Côté droit de jointure |
|---|---|---|---|
| CNAM `effectifs`, diabète (`top = DIA_CAT_CAT`), tous sexes, 2024 | ODS `data.ameli.fr`, `fetch-mode="export"` | 2 520 = 101 dép. × 21 + 19 lignes `dept = 999` × 21 | — |
| Poids d'âge France 2024 (`dept = 999`, `region = 99`, hors `tsage`) | dérivé | 20 | 1 ligne par `cla_age_5` |
| INSEE `DS_FILOSOFI_CC`, `PR_MD60`, 2023 | Melodi, `GEO=DEP` | 97 (métropole + La Réunion) | 1 par `GEO` |
| `insee-2020-geoapi-2023` groupé | ODS Sports | 107 | 1 par `codedepartement` |

`dept = 999` porte **18 régions + la France** (19 groupes, et non 20 comme l'écrivait le cadrage).

## Chiffres rejoués (Python, export complet, 2026-09-27) puis relus au navigateur

| Mesure | Recalcul | Page |
|---|---|---|
| France : patients / assurés / taux | 4 471 940 / 67 612 360 / 6,61 % | KPI identique |
| Somme des 101 départements | 4 460 460 / 67 380 400 → 6,62 % | résumé carte brute 6,62 |
| Nièvre brut / std, rangs métropole | 9,98 / 7,62 ; 1er → 11e (3e → 16e sur 101) | KPI identique |
| Seine-Saint-Denis | 7,82 / 10,41 ; 19e → 1re (22e → 5e sur 101) | KPI identique |
| Creuse, Indre | 9,22 → 6,90 (2e → 32e) ; 8,80 → 7,01 (3e → 27e) | tableau |
| Val-d'Oise | 6,75 → 8,58 (55e → 2e métropole) | tableau |
| Mayotte | 6,10 → 12,29 ; 81e → 1er sur 101, 3 classes secrétisées dont 95+ | tableau |
| Top 10 std métropole | 93, 95, 02, 62, 59, 80, 08, 57, 77, 60 | graphique identique |
| Cellules `ntop` secrétisées | **67** (56 dép. ; 65 chez les < 10 ans) — le cadrage disait 74 | liste identique |
| Tranche 65+ (< 20 % … ≥ 29 %), brut | 6,09 · 6,41 · 6,74 · 6,88 · 7,61 (13/17/24/30/12 dép.) | tableau a11y identique |
| idem, à âge égal | 7,12 · 6,59 · 6,33 · 5,90 · 6,04 | identique |
| Tranche pauvreté (< 13 % … ≥ 19 %), brut | 5,44 · 6,43 · 6,62 · 6,96 · 7,27 (17/23/29/12/15 dép.) | identique |
| idem, à âge égal | 5,31 · 6,39 · 6,55 · 6,64 · 7,61 | identique |
| Pauvreté extrêmes métropole | Vendée 9,2 % ; Seine-Saint-Denis 29,5 % | texte |
| Prévalence par sexe (France) | hommes 7,58 %, femmes 5,73 % | texte |
| Robustesse au standard (Europe 2013) | Spearman 0,9994, mêmes 10 premiers, décalage max 3 rangs ; 93 → 9,81, 58 → 7,11 | texte |
| 101 taux standardisés | 100 lus dans le tableau a11y (plafond LIM-012) + Vaucluse lu dans la liste : 0 écart > 0,01 | — |

## Écarts au cadrage

- **Corrélations non publiées.** Le cadrage donnait 0,58 → 0,69 (Filosofi 2021) ; avec Melodi 2023
  on trouve 0,50 → 0,67 sur 97 départements, 0,45 → 0,54 en métropole. Repères d'exploration :
  la page montre des tranches.
- **Angle affiné.** Le gradient pauvreté existe déjà sur la carte brute (5,44 → 7,27) ; ce qui
  change à âge égal, c'est surtout l'âge : le taux brut **monte** avec la part des 65+ et le taux
  standardisé **baisse**. Le chapitre 2 (vieillissement) porte donc la démonstration du titre,
  le chapitre 3 (pauvreté) la suite.
- **Clé Melodi.** Le cadrage proposait `replace(GEO, '2026-DEP-', '')` : faux, l'adaptateur a
  déjà remplacé `GEO` par le libellé. Voie juste : `GEO_CODE`.
- **Métropole seule aux chapitres 2-3** : Filosofi 2023 ne couvre pas 971, 972, 973, 976.
- **Pas de densité de généralistes** (chapitre optionnel E écarté : même producteur).
- **Pas de Tabular** : Melodi seul pour l'INSEE (plus récent ; premier emploi dans les démonstrations — `developpement-durable/logements-neufs` l'emploie déjà, sur `DS_IPC_PRINC`).
  La page a donc deux types d'API (ODS ×2 hôtes, INSEE), pas trois.

## Hypothèses éditoriales (écrites en page)

Standard France 2024 ; deux cartes côte à côte (la brute n'est pas fausse, elle mesure la charge de
soins) ; tranches plutôt que nuage ; ratio de sommes partout ; « suit », pas « explique » ; pas de
résumé sous la carte standardisée (`map-summary="none"` : la moyenne pondérée des taux
standardisés, 6,70 %, ne correspond à aucune population).
