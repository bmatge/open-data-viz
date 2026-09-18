# Revue critique — Éducation B (17 pages, `hybridation-enseignement-lycee` → `tne-dashboard`)

Lecture intégrale du code des 17 pages (dépôt en `dsfr-data@0.29.1`), le 2026-09-13. Chaque
constat est sourcé (`fichier:ligne`) dans `revue-education-b.json` (53 entrées). Vérifications
hors code : API v2.1 (personnels lycées, formats de codes département des quatre jeux Sports,
volumes par région), bundle publié 0.29.1 (`gauge-field`, molette, `idle` des facettes), trois
chargements ciblés Playwright (390 px et 1400 px). **`metriques.json` n'existait pas au moment
de la revue** : les conclusions de performance reposent sur ces chargements ciblés, la recette
`m-0291` et la lecture des sources — elles sont marquées comme telles.

## 1. Motifs transverses du lot

1. **Neuf `dsfr-data-normalize` vides survivent à la 0.29** — le contournement de BUG-009
   (corrigé #811). Pages : fei-projets:200, offre-formation-langues:225, patronymes:245/247/250,
   personnels-ecoles-primaires:350, portrait-de-territoire-sports:574, tedi:175, tne:131.
   Retrait mécanique, recette avant/après.
2. **Huit pages disent encore vrai ce que la 0.29 a rendu faux** : BUG-009 « toujours vrai »
   (generation, offre, tne), BUG-010 (patronymes:89, ecoles-primaires:147), BUG-011
   (passe-ton-hack:392), AM-066 (hybridation:60/213/282), `first`/`last` hors référence (tne:145).
   **Deux pages se contredisent elles-mêmes** : fei-projets (corps « corrigé » / tableau
   « Partiel » / verdict « toujours 36 pays ») et tne (graphique `diff` affiché / verdict « le
   second sens reste ouvert »).
3. **Des nombres en dur dans la prose, à côté de composants qui bougent** : personnels ×3
   (parts d'âge/ancienneté au-dessus de graphiques filtrés par 4 à 5 facettes), tedi (chapô sur
   un jeu quotidien, déjà périmé de 19 déploiements), portrait (chapô). Le cas extrême est
   personnels-lycees : **les nombres sont ceux des collèges**.
4. **Duplication collèges / lycées à 98 %**, et son coût direct : sept chiffres faux et deux
   commentaires faux dans la copie. Le dépôt n'a pas de build ; il a déjà des générateurs
   (`build-registre-*.mjs`) — un gabarit paramétré par `where`/titre est à sa portée, ou à
   défaut une recette qui diffère les pipelines jumeaux.
5. **Mobile 390 px : débordement horizontal de 16 px sur les trois pages mesurées**, causé par
   `div.fr-header__navbar` (layout.js, hors lot), `summary.fr-accordion__btn` (accordéon de
   `dsfr-data-a11y`) et les `<table>` sans conteneur `overflow-x`. Transverse au dépôt et en
   partie à la bibliothèque. Les KPI font 358 px = une tuile par ligne : `per-row="2 md:4"`
   (0.29, #819) rendrait 2 × 2.
6. **Recherche en double** (globale + `search` du tableau) sur cinq pages ; sur gar, la recherche
   du catalogue est rendue en haut de page, loin de sa cible en bas.
7. **Deux grammaires pour `name`** (`'["…"]'` et chaîne) selon la page ; **styles inline** sur
   trois pages ; **repères temporels relatifs** (« hier », « ce matin », « quatre heures après »)
   figés dans des commentaires et des verdicts.
8. **Ce qui va bien et mérite d'être dit** : ulis, label-egalite, hybridation, gar ont des
   analyses exactes face à la 0.29 ; les `dsfr-data-a11y` sont partout ; les `max-records` sont
   explicites partout ; aucune page ne charge le bundle complet sans carte.

## 2. Fiche par page (Q = qualité du code, P = performance, E = ergonomie)

| Page | Q | P | E | Recommandation principale |
|---|---|---|---|---|
| fei-chiffres-cles | B | A | B | Légende de carte par `dsfr-data-map-legend` et select d'année alimenté par la donnée |
| fei-projets-europeens-donnees | C | A | B | Réécrire tableau + verdict (contradiction), retirer `ini-fn` |
| gar-ressources-numeriques | B | B | C | Déplacer la recherche près du catalogue ; mesurer un `select` sur l'export de 5,2 Mo |
| generation-2024 | B | C | B | Mesurer le coût mobile des 7,2 Mo ; commentaire BUG-009 périmé |
| hybridation-enseignement-lycee | B | A | A | AM-066 au passé (livré 0.29) |
| implantation-ulis-tfv | A | A | B | Rien d'essentiel ; retirer le `search` du tableau |
| label-egalite-fille-garcon | A | A | B | Retirer la facette `ville` et le `search` du tableau |
| non-reproduites | B | A | B | Fil d'Ariane et section `#analyse` au squelette commun |
| offre-formation-langues | C | A | C | Retirer `lang-liste-n` ; message d'attente sur « Affiner » |
| passe-ton-hack-dabord | B | B | B | BUG-011 au passé ; retirer `refresh="600"` |
| patronymes-des-ecoles | C | A | B | Retirer les 3 normalize vides ; commentaire BUG-010 ; 5 KPI sur `cols="4"` |
| personnels-colleges | C | A | C | Parts d'âge en KPI calculés ; gabarit ou garde-fou de duplication |
| personnels-lycees | **D** | A | C | **Sept chiffres faux (ceux des collèges) : corriger aujourd'hui** |
| personnels-ecoles-primaires | B | A | C | Retirer `e-ren-n` ; parts en KPI ; commentaire BUG-010 |
| portrait-de-territoire-sports | **D** | B | C | **Clé département par le nom (9 départements à zéro)** ; § 5 en 4 KPI `{filtre}` ; bloc « pour 10 000 hab. » |
| tedi-robots-telepresence | C | A | B | Chapô sans chiffres figés ; retirer `tedi-fn` |
| tne-dashboard | C | A | B | Verdict et tableau (dé-cumul livré) ; retirer `tne-formes` |

Notation : A = rien à redire ; B = propreté ; C = au moins un coût réel évitable ou une
affirmation périmée ; D = chiffre faux affiché.

## 3. Top 10 effort / impact

| # | Action | Pages | Effort | Impact |
|---|---|---|---|---|
| 1 | Corriger les sept parts d'âge/ancienneté des lycées (API : 13,5/37,7/48,8 ; 21,0/16,1/12,5/50,4) | personnels-lycees:261-268 | 10 min | chiffre faux publié |
| 2 | Clé département par le nom (`dep_nom` / `nom_departement` / `departement_nom`) | portrait-de-territoire-sports:198-203, :246-354 | 1 h | 9 départements dont 12 indicateurs sont à zéro en silence |
| 3 | Retirer les 9 normalize vides (BUG-009 corrigé), recette avant/après | 8 pages | 1 h | 9 composants inutiles, 9 commentaires faux |
| 4 | Réécrire les deux analyses auto-contradictoires | fei-projets:446,463 ; tne:495,508 | 30 min | crédibilité du livrable |
| 5 | Chapôs sans nombres figés sur jeux vivants (ou datés) ; parts d'âge en KPI `{filtre}` | tedi, portrait, personnels ×3 | 2 h | prose qui cesse de contredire les graphiques |
| 6 | § 5 du portrait en quatre KPI ratio filtré (0.29) : −8 composants, alerte et deux points d'analyse retirés | portrait:376-396, :589-612 | 1 h | simplification nette + analyse à jour |
| 7 | Passer les BUG-010/011/AM-066/first-last au passé dans commentaires et analyses | 6 pages | 45 min | zéro affirmation périmée dans le lot |
| 8 | `per-row="2 md:4"` sur les `kpi-group`, tables dans `overflow-x:auto`, accordéon a11y à 100 % | tout le lot (site.css + pages) | 1 h | mobile sans débordement, 2 KPI par ligne |
| 9 | Recherche du catalogue GAR déplacée ; doublons `search` retirés (5 pages) | gar, ulis, label, hack, personnels ×2 | 30 min | un seul champ de recherche par vue |
| 10 | `max-records` de la carte du portrait à 60 000 ; `refresh="600"` retiré ; bornes `max` des mois TNE | portrait:183, hack:104, tne:251/257 | 15 min | troncature et churn évités |

## 4. Ce que je n'ai pas pu vérifier

- Les mesures de performance générales (`metriques.json` absent) : seules trois pages ont été
  chargées, une fois chacune par largeur. La valeur de 15,5 s au repos réseau du portrait à
  390 px est une mesure isolée, à rejouer avant d'en faire un constat.
- Le comportement du panneau de détail de fei-projets sous 768 px (déduit de la grille, non rejoué).
- L'existence au registre d'un constat pour « agrégation sur une colonne `text` sans
  avertissement » (ecoles-primaires:427) et pour la jauge / la molette (tedi) — à confirmer par le
  parent avant d'ouvrir des entrées.
- L'effet exact de `dsfr-data-a11y for=` multiple (personnels, cartes « certifiés ») : JSDoc non lu.
