# Analyse metier — Suivi d'impact de l'Opération de Sensibilisation au risque de l'hameçonnage "Cactus"

> La lecture `dataviz-metier` : le sens avant la syntaxe.
> **Ce fichier n'est jamais ecrase par un script.** Les sorties du modele
> multimodal arrivent dans `constats/` ; ce qui est retenu se reecrit ici, a la main.

Recréation du 2026-09-26, niveau avancé (une page).

## La question posee, et pour quel lecteur

« L'opération Cactus a-t-elle eu un effet, et où a-t-elle le moins pris ? » — pour un pilote
académique ou national de la sensibilisation cyber, qui doit décider où relancer.

## L'histoire trouvée (rejouée à l'API le 2026-09-26)

- 904 réponses, 887 UAI distincts (group_by exact ; `count(distinct)` ODS rend 877, approximatif).
- 618 réponses (68,4 %) font état de signalements de sécurité numérique.
- 265 des 873 réponses sur les suites (30,4 %) n'envisagent **aucune action**.
- **Le paradoxe** : 98/252 (38,9 %) des établissements sans sensibilisation préalable n'envisagent
  aucune action, contre 167/621 (26,9 %) des déjà sensibilisés. Signalements 60,7 % vs 71,4 % ;
  « pas de changement » 31,1 % vs 26,3 %. L'opération a moins pris là où elle était la plus nécessaire.
- L'écart tient par sous-groupe : collèges 41,1 vs 25,3 (16 pts), lycées 35,9 vs 30,8 (5 pts) ;
  top-7 académies 40,8 vs 27,5, autres 35,8 vs 25,7.
- 106 réponses (11,7 %) cumulent « pas de changement » et « aucune action ».
- Concentration : 7 académies = 597 réponses (66 %), 30 académies présentes.

**Renversement** : la page précédente titrait « 84 % ont mis en place un suivi » sur
`suivi_sensi_cyber`. 220 des 265 réponses « aucune action envisagée » y répondent « Oui » : le champ
ne peut pas signifier « suivi mis en place ». Sens non documenté (libellé « Suivi Sensibilité
Cyber », aucune description) → écarté du récit, dit en note. La page précédente affichait aussi
« 877 UAI distincts » (valeur approximative d'ODS) et groupait les actions sur la colonne brute
`sensibilisation_post_cactus` (combinaisons) au lieu de la colonne multivaluée nettoyée.

Angles écartés : la courbe des saisies (rythme du questionnaire, 44 % seulement pendant les
19-21 mars) ; le total d'« élèves sensibilisés » (somme d'effectifs, doublons compris) ; les
choroplèthes de volume (où l'on a répondu, sans dénominateur).

## La forme retenue, et pourquoi elle sert cette question

1. Chapô et trois KPI calculés (68 %, 30 %, écart de 12 points).
2. Preuve : barres groupées, trois constats × deux groupes, le groupe « sans sensibilisation
   préalable » en bleu France, l'autre en gris (`series-field` + `color-map`).
3. Robustesse : même mesure collèges / lycées séparés, phrase calculée par type.
4. Nuance : effets observés et suites envisagées en **part des réponses** (drapeaux 0/100 +
   `avg`), barre clé en évidence (`highlight-index`).
5. Géographie : barres triées par académie, sept premières en évidence.
6. Exploration : recherche, facettes, carte colorée par suites envisagées, tableau.
7. Notes : unité, dénominateur absent, champs écartés.

## Honnetete de l'echelle

Barres à zéro. Les parts sont des parts de réponses (une réponse peut citer plusieurs effets :
dit en page, les barres ne somment pas à 100 %). « Aucune action » a pour dénominateur les
réponses sur les suites (873), les 31 sans réponse sortent du dénominateur via un drapeau `null`
ignoré par `avg` (vérifié : 30,4 % = 265/873, pas 265/904).

## Phrase de lecture

« 39 % des établissements sans sensibilisation préalable n'envisagent aucune action après Cactus,
contre 27 % de ceux qui en avaient déjà une : un écart de 12 points. » — calculée
(`dsfr-data-pivot` sur la query par groupe), réponses de mars-avril 2025.

## Ce qu'on ne montre pas, et qu'il faut dire

Dénominateur des établissements sollicités (absent du jeu) ; doublons d'UAI (887 pour 904) ;
32 réponses sans localisation (absentes de la carte) ; 31 sans réponse sur les suites ;
`suivi_sensi_cyber` (sens non documenté, contradictoire) ; quatre drapeaux 0/1 renseignés sur
50 lignes ; `d4_pix_prec` vide ; 6 réponses cochant « aucune action » et une action (comptées
dans « aucune »). Tous dits en page, les comptes par KPI calculés.

## Ecarts avec l'original

- L'original ne publie aucun taux ; la page recréée ne publie que des parts, au bon dénominateur.
- Les barres « observations » et « actions » de l'original somment des occurrences (1 329 et
  1 088) ; ici, parts de réponses.
- Le croisement sensibilisation préalable × suites, absent de l'original, porte le récit.
- Pas de série temporelle ni de choroplèthes : écartées volontairement (voir angles écartés).
