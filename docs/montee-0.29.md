# Montée en `dsfr-data` 0.29 — bilan

> **Fait le 2026-09-12.** La 0.29.0 a été publiée le 2026-09-11 à 22 h 02 UTC. Les 64 balises du
> dépôt sont montées, les 66 pages rejouées à la recette, et le registre passé à jour :
> **24 constats déposés sont corrigés**, aucun ne reste en attente de dépôt, 11 restent ouverts.
>
> Ce document gardait, avant publication, le plan de ce qu'il faudrait faire ; il garde maintenant
> ce qui a été fait et ce qui a été vérifié. La partie « avant publication » est conservée telle
> quelle plus bas : c'est la trace de ce qu'une vérification anticipée permet de savoir.

## Résultat de la montée (0.28.0 → 0.29.0, CDN)

- **64 pages sur 66 identiques** à la recette. Les deux écarts sont des KPI de
  `tedi-robots-telepresence`, dus à une donnée republiée (jeu quotidien), pas à la version :
  vérifié en rejouant la page sous les deux bundles dans la même minute.
- **Zéro erreur de configuration**, et les trois erreurs console préexistantes sont inchangées.
  Une erreur 404 apparue une fois sur `accessibilite-equipements-sportifs` ne s'est pas
  reproduite : passagère, pas une régression.
- **BUG-016 vérifié en production** : le contrôle `legendesFausses` de la recette passe de
  **15 pastilles contraires à 0** sur les cinq graphiques à `color-map`.
- **BUG-012 vérifié en page** : plus aucun faux avertissement de dépréciation sur les quatre
  pages concernées.
- **AM-080 vérifié en page** : plus aucun avertissement de jointure sur `/sports/portrait-federation`.
- La 0.29.0 contient aussi ce qui n'était pas dans les 14 changesets lus la veille :
  `dsfr-data-concat` (#807, AM-074), le correctif de regroupement délégué (#811, BUG-009),
  le colonnage responsive `per-row` / `span` (#814, #819 — `cols` gardé tel quel), et les deux
  correctifs déposés dans la nuit : la légende sous `databox` (#815) et la jointure-filtre (#817).

## Ce qui reste ouvert après la 0.29.0, vérifié contre le bundle publié

| Constat | Ce qui manque encore |
|---|---|
| AM-077 | Le compteur de `dsfr-data-display` : `${totalItems} resultat`, sans accent ni formateur ; `count-label` n'existe que sur la recherche |
| AM-078 | Aucun agrégat de part du total (`running_sum` et `diff` seulement) |
| AM-079 | Le résumé d'une carte de volumes : ni mode `sum` calculé, ni `none` |
| AM-081 | Aucun libellé de valeur sur une facette : un code ne peut pas être présenté par son nom |
| AM-063, AM-055, BUG-008 | Inchangés |
| BUG-015, PG-028, PG-029, PG-030 | Relevés au lot 19, non traités par la 0.29 |

---

# Ce qui suit est le plan écrit AVANT la publication

> Relevé du **2026-09-11**, avant publication. La 0.29 n'est pas sur npm (dernière publiée :
> 0.28.1) ; elle est sur `origin/main` de `bmatge/dsfr-data` sous forme de **14 changesets**
> en attente (épic #781). Tout ce qui suit a été vérifié contre un bundle construit depuis
> `origin/main` (commit `7ca1e0d`), servi à la place de jsDelivr par
> `RECETTE_BUNDLE=<dist> node scripts/recette-pages.mjs`.
>
> **À la publication** : remplacer `dsfr-data@0.28.0` dans les pages, rejouer la recette, puis
> passer les constats ci-dessous en `corrige` **après** vérification contre le CDN — pas avant.

## 1. Non-régression : rien ne casse

Recette complète des **63 pages** de Bercy, d'Éducation et des pages transverses, deux fois,
0.28.0 (CDN) puis bundle `main` :

- **61 pages identiques** (erreurs console, KPI, graphiques, tableaux, facettes).
- **2 écarts de KPI** (capytale-usages, tedi-robots-telepresence), **pas dus à la version** :
  rejouées dans la même minute sous les deux bundles, elles donnent les mêmes chiffres. La
  donnée a été republiée entre les deux passes (Ted-i : 3 734 → 3 753 déploiements).
  ⚠️ Conséquence à part : `tedi-robots-telepresence.html` écrit « 3 734 » en dur dans sa prose,
  sur un jeu mis à jour quotidiennement.
- **Compte de formes Leaflet** instable sur accompagnement-deficience-sensorielle (1 830,
  2 135, 3 050 selon le chargement, **sous les deux bundles**) : rendu différé, le piège déjà
  consigné. Indicatif, non bloquant.
- Les trois erreurs console préexistantes (annuaire-bureaux-des-entreprises,
  annuaire-des-internats, offre-formation-langues) sont présentes à l'identique sous les deux.

## 2. Ce que la 0.29 corrige ou livre, constat par constat

Avertissements console relevés page par page sous les deux bundles (`avert-029.mjs`, scratchpad
de session), sur les 16 pages visées : seul BUG-012 produit un effet visible sans toucher aux
pages. **Aucun avertissement nouveau n'apparaît** : les signaux ajoutés par #769 à #772 ne se
déclenchent sur aucune d'elles — les gabarits sont déjà à plat, les légendes déjà bien câblées.

| Constat | Issue | Pages | Effet sans rien toucher | Geste à faire après publication |
|---|---|---|---|---|
| BUG-012 | #764 | cactus-hameconnage, fei-projets-europeens-donnees, **accompagnement-deficience-sensorielle, annuaire-bureaux-des-entreprises** | **Vérifié** : le faux avertissement de dépréciation disparaît sur les **quatre** pages (deux n'étaient pas au registre) | Aucun |
| LIM-014 | #763 | personnels-colleges, -lycees, -ecoles-primaires | Aucun (le défaut reste la moyenne non pondérée) | Poser `map-summary-weight` sur l'effectif, retirer le KPI de correction et l'avertissement de la page |
| BUG-014 | #766 | educajou-ecolemap | Aucun (le contournement `compute` ×1 masque le défaut) | Retirer le `compute` ×1 |
| BUG-010, BUG-011, PG-027 | #767 | fei-chiffres-cles, dnma-usages-ent, cnr-education | Aucun (contournements en place) | Rétablir l'alias dans `group-by`, la fonction à deux arguments, le `select` sans backquote |
| AM-066 | #768 | dataviz-ips-colleges | Aucun | `fill-field` possible sur la couche de cercles |
| AM-072 | #769 | six pages à gabarits | Avertissement si un bloc est imbriqué ; les pages sont déjà à plat | Aucun |
| AM-069 | #770 | carto-pix-fiche-etablissement | Signal console si tous les points se confondent | Aucun |
| PG-024 | #771 | dataviz-ips-colleges | Signal si le `for` d'une légende vise autre chose qu'une couche | Aucun |
| PG-022 | #772 | rappelconso, prix-des-carburants, … | Avertissement de séparateur étendu à `sort`, `rename`, `fold` | Aucun |
| BUG-013 | #773 | carto-pix-fiche-etablissement | La facette ne lit plus que ses paramètres | Le `url-param-map` de contournement peut rester ou partir |
| AM-071 | #774 | fei-projets-europeens-donnees, accompagnement-deficience-sensorielle | `replace-fields` agit sur les tableaux | Retirer le détour `explode` + `group-by` là où il ne sert qu'à corriger |
| AM-068 | #775 | tne-dashboard | — | `aggregate="cumul:diff"` rend le flux mensuel : le graphique qui manquait devient faisable |
| AM-070 | #776 | patronymes-des-ecoles | — | `value="effectif:sum{sexe:eq:F} / effectif:sum"` : la part devient calculable en un KPI |
| AM-044, AM-076, PG-025 | #779 | pages à `dsfr-data-search count` ; tne-dashboard ; fei-chiffres-cles | Documentation | `count-label` sur les compteurs de recherche |
| AM-062 | #778 | equipements-sportifs-milieu-scolaire | Documentation (encastrement en iframe) | Aucun |
| AM-061 | #780 | educajou-ecolemap, annuaire-des-internats | — | `fullscreen` sur les cartes denses |

**Hors 0.29, toujours ouverts** : BUG-009 (#765, une `query group-by` réécrit la source de ses
voisins) et AM-074 (#777, `dsfr-data-concat`, en cours de développement sur une branche locale).

## 3. Un défaut que la 0.29 ne corrige pas, trouvé en montant le portail Sports

`dsfr-data-display` affiche « 12 resultats » : ni accent, ni séparateur de milliers. Le
correctif de `dsfr-data-search` (accent en 0.21.1, `formatNumber` en 0.26.0, `count-label` en
0.29) **n'a pas été propagé au composant voisin**. Vérifié au navigateur sur `/sports` et au
source de `origin/main` : `dsfr-data-display.ts:559` (`${totalItems} resultat…`), `:534`
(`aria-label` « Liste de resultats »), `:90` (`empty` « Aucun resultat »). Consigné au registre.
