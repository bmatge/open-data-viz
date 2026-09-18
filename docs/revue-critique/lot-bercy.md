# Revue critique — portail Bercy (24 pages `public/viz/` + `bercy.html`)

Lecture intégrale des 25 fichiers (2026-09-13, dépôt en `dsfr-data@0.29.1`), constats sourcés dans
`revue-bercy.json` (86 entrées : 7 hautes, 28 moyennes, 51 basses ; 55 quick wins, 9 refactors,
22 rédactionnels). Le fichier `metriques.json` du parent n'existait pas au moment de l'écriture :
les affirmations de performance reposent sur la structure du code et sur **six chargements ciblés**
mesurés au navigateur (carburants, DGFiP, fiscalité, APD, comptabilité, plan-de-relance mobile), plus
deux mesures directes à l'API. Tout ce qui n'a pas été mesuré est dit tel quel.

## 1. Motifs transverses

**M1 — Le code vit avec ses béquilles ; seule l'analyse a été mise à jour.** C'est le motif dominant.
Chaque page porte un encadré « ✅ Corrigé depuis » qui dit noir sur blanc : « le code de la page porte
encore son contournement, qui n'est simplement plus nécessaire ». Le résultat est un dépôt en 0.29.1
dont le code est, par endroits, écrit pour la 0.20. Inventaire :
- conditionnelles rendues par CSS d'attribut au lieu de `{{#if}}` (0.22) : DGFiP, QT, T&H, EPV,
  Notre-Dame (deux `<style>` locaux de 8-9 règles) ;
- tableaux rendus `a,b` ou par index au lieu de `:join` / `{{#each}}` : DGFiP, CCT, EPV, rappelconso ;
- dates ISO brutes au lieu de `:date` : bofip, cuivre, prix-CT, EPV ;
- légendes de carte écrites à la main avec `style` inline au lieu de `dsfr-data-map-legend` (0.22) :
  DGFiP (avec un commentaire « vérifié dans le source 0.20.0 »), EPV, cuivre ;
- `dsfr-data-query` intermédiaires pour un KPI `where` (0.24) ou un `distinct` (0.24) : minimis,
  comptabilité, Notre-Dame, plan-de-relance, DGFiP, QT, T&H, CCT, carburants ;
- ratio à six balises sur EPV alors que `count{…} / count` est en 0.29 ;
- script + champs cachés sur rappel-conso-tdb pour un manque corrigé en 0.21.1 et 0.23.
Recommandation de règle : **quand un constat passe en « corrigé », la page qui le porte est migrée
dans le même lot**, et l'encadré dit « migré au lot N » — c'est ce que le lot 20 a fait pour six
pages, et ce que les lots 13 à 18 n'ont pas fait pour le reste.

**M2 — Les sélecteurs écrits en dur, sept pages, deux familles à distinguer.** Migrables vers
`dsfr-data-facets context="…" server-facets` (AM-043, 0.23) : decp (7 selects, 80 options, 20 acheteurs
figés), rappel-conso-tdb (10 + 57 options, cascade perdue), comptabilité (56 missions), APD (2 listes).
Légitimement en dur : baromètre (119 questions : code → libellé, AM-081), fiscalité (idem), cuivre
(facette non déclarée), prix-CT (`/facets` vide). Les pages ne font pas la différence : toutes citent
AM-043 comme « corrigé » et gardent leurs options.

**M3 — Trois chiffres ou libellés faux en production, tous détectables sans lire le code.**
CCT : « 14 régions couvertes » pour 18 (KPI sur une query `limit="14"`, PG-017 repayé, la console
l'annonce). Signal Conso : barres et courbe **inversées** (les réponses étiquetées « Signalements
déposés », et réciproquement), tableau accessible amputé de la seconde série. APD : un titre de
graphique dit « ne suit pas les filtres » alors qu'il les suit depuis le lot 18. Aucun n'est vu par la
recette, qui compare des nombres à eux-mêmes ; les deux premiers l'auraient été par un contrôle des
avertissements `dsfr-data-kpi … chiffre partiel` et par une lecture d'`y-bar` contre `name-bar`.

**M4 — La grille `.odv-dashboard` déborde sur téléphone.** Mesuré sur plan-de-relance à 390 px :
scrollWidth 406 (16 px de trop), l'élément dépassant est le résumé d'accordéon a11y dans la colonne
`1fr`. Cause probable : aucun `min-width: 0` sur les enfants de grille (site.css:40-50). Une ligne de
CSS, quatorze pages concernées — à confirmer avec le relevé mobile du parent.

**M5 — Le compteur de recherche sans nom sur 10 pages.** `count-label` (0.29) n'a été posé que sur
trois pages au lot 20 ; les dix autres disent « N résultats ». Quick win uniforme.

**M6 — 31 graphiques écrivent `name='["…"]'`** là où la grammaire recommandée depuis AM-023 est la
chaîne simple, et 9 pages l'emploient déjà : incohérence pure, un `sed`.

**M7 — Duplication structurelle assumée mais non outillée.** 25 têtes de page identiques, 64 balises
de version, montées par `sed`. Sans build, deux voies : un fragment de head injecté par `server.js`,
ou au minimum un contrôle « une seule version de dsfr-data dans `public/` » dans la recette.

**M8 — Performance : le modèle est sain, trois points à mesurer.** Les architectures sont choisies et
justifiées page par page (client / agrégé / serveur) et les mesures d'origine sont écrites. Restent :
`fl-geo` en 7 requêtes `/records` (≈3,4 Mo) là où `fetch-mode="export"` en ferait une ; APD dont les
9 agrégations `/records` ont mis 4-6 s à un chargement alors que la même requête isolée répond en
0,15 s (concurrence ou aléa — à re-mesurer avant de conclure) ; APD encore, qui charge le bundle
complet sans carte Leaflet. Et un ordre de grandeur à écrire noir sur blanc : DGFiP rapatrie 19 Mo
décompressés (1,6 Mo compressés) pour une grille paginée à 12.

## 2. Fiche par page (Q = qualité du code, P = performance, E = ergonomie ; A → D)

| Page | Q | P | E | Recommandation principale |
|---|---|---|---|---|
| bercy.html | B | A | B | Corriger « jointure sur `lien` » (c'est `titre`) et mettre au passé « pas de conditionnelle » |
| plan-de-relance | B | A | B | `empty-label` sur le camembert (Série 4), `context-tags` ; `min-width:0` sur la grille (déborde à 390 px) |
| decp-augmente | C | A | C | Migrer les 7 selects (80 options, acheteurs figés) vers `facets context server-facets` |
| aide-publique-developpement | C | C | C | Titre « ne suit pas les filtres » faux ; texte sous la carte (46 % non cartographiés) ; bundle core ; re-mesurer les 9 requêtes |
| aides-de-minimis | B | A | B | 4 queries → `where` du KPI ; `cols`/`col` redondants ; vérifier le tableau 9 colonnes sur mobile |
| annuaire-services-dgfip | C | B | B | `dsfr-data-map-legend` à la place de la liste inline ; `:join`, `{{#if}}` ; commentaire « 0.20.0 » périmé |
| barometre-france-num | B | A | C | Retirer le KPI « score moyen » (moyenne sans sens) ; distinguer AM-043 (régions) d'AM-081 (questions) |
| bofip | B | A | B | Commentaire BUG-010 périmé ; `:date` ; `meta:total` au lieu d'une source dédiée |
| centres-controle-technique | C | A | C | **KPI faux : 14 régions pour 18** → `nom_region:distinct` ; relever les avertissements KPI à la recette |
| comptabilite-generale | B | A | B | `color-map` actif/passif (0.26) ; `diff` pour l'évolution N/N-1 (0.29) ; 4 queries → `where` |
| entreprise-patrimoine-vivant | C | A | B | Ratio six balises → `count{…} / count` (0.29) ; supprimer le `<style>` ; `map-legend` |
| entreprises-restauration-notre-dame | C | A | B | `{{#each images}}`, `{{#if}}` à la place du `<style>` ; `radio-inline` ; trancher `refine-on-click` |
| fermeture-reseau-cuivre | B | A | B | `map-legend` (le tag noir est illisible) ; `:date` ; BUG-004 cité au présent |
| fiscalite-locale | B | B | C | **Choroplèthe communale sans légende** → `classes` + `map-legend` ; `fl-geo` en export (7 → 1 requête) |
| impot-sur-le-revenu | A | A | B | `format="compact"` ; consigner l'état idle du compteur de recherche |
| prix-controle-technique | B | A | C | État initial trompeur (30 tarifs les moins chers) → `require-where` + `idle-message` ; `:date` |
| prix-des-carburants | A | B | A | Écrire le poids compressé réel ; chronométrer un clic de facette (unpivot 59 k lignes) ; alias inline |
| qualite-tourisme | B | A | B | `{{#if}}` à la place d'`odv-rubrique` ; `context-tags clear-all` sur les cinq annuaires |
| rappel-conso-tableau-de-bord | C | A | B | Retirer champs cachés + `default="today"` ; facettes contexte pour la cascade catégorie → sous-catégorie |
| rappelconso | B | A | B | `:join` sur les risques ; `{{#if}}` sur le lien ; ranger le `normalize` avec le pipeline |
| signalconso | B | A | D | **Séries inversées** sur le graphique combiné ; a11y à deux séries ; texte « 5,5 % non cartographiés » |
| tourisme-et-handicap | B | A | B | `{{#if}}` ou `fold` à la place d'`odv-picto--` ; paragraphe AM-014 au passé |
| formations-france-num, non-reproduites | B | B | A | Retirer `cles.js` + bundle : aucune balise dsfr-data |
| ofgl | B | A | B | Poser `<section id="analyse">` : les liens `#analyse` n'aboutissent pas |

Lecture des notes : aucune page n'est en dessous de C en qualité — le code est lisible, commenté,
et chaque choix d'architecture est argumenté avec des mesures datées. Les C viennent tous du même
défaut : des contournements conservés après correction. Les D/C en ergonomie viennent de chiffres ou
libellés faux (signalconso, CCT, APD) et d'états initiaux non expliqués (prix-CT, baromètre).

## 3. Top 10 par rapport effort / impact

1. **signalconso** — inverser `value-field` / `value-field-2` (ou l'ordre de `name`) et compléter
   `dsfr-data-a11y` (`value-field="n, reponse"`). 2 lignes, un graphique faux depuis le lot 6.
2. **centres-controle-technique** — `value="nom_region:distinct"` ; 1 ligne, un KPI faux. Et ajouter à
   `recette-pages.mjs` le relevé des avertissements `dsfr-data-kpi … chiffre partiel` : c'est le signal
   qui existait et que personne ne lisait.
3. **site.css** — `.odv-dashboard > * { min-width: 0 }` ; 1 ligne, 14 pages, débordement mobile.
4. **fiscalite-locale** — `classes="4" method="equal"` + `dsfr-data-map-legend` sur la choroplèthe
   communale ; 3 lignes, une carte enfin chiffrable (l'original a une légende).
5. **aide-publique-developpement** — corriger le titre du graphique des années, écrire la phrase sous
   la carte, passer en `core.umd.js`. 3 lignes.
6. **10 pages** — `count-label` sur les compteurs de recherche ; 10 attributs.
7. **entreprise-patrimoine-vivant** — quatre KPI `count{…} / count` à la place de 8 balises et d'un
   `<style>` ; c'est la démonstration la plus nette de ce que la 0.29 apporte, à vérifier au chiffre près.
8. **decp-augmente + rappel-conso-tdb** — migrer les selects vers `facets context server-facets` ;
   c'est la seule action de refactor qui change la fidélité (acheteurs complets, cascade retrouvée).
9. **3 pages** — `dsfr-data-map-legend` à la place des légendes inline (DGFiP, EPV, cuivre) ; retire
   19 `style=""` et un `<style>`.
10. **Analyses** — une passe rédactionnelle sur les 12 affirmations au présent devenues fausses
    (bercy `lien`, bofip BUG-010, DGFiP « 0.20.0 », cuivre BUG-004, fiscalité #288, EPV « six balises »,
    T&H AM-014, comptabilité couleurs, plan-de-relance 185 Ko, IR compact, baromètre AM-043,
    carburants étiquettes). Le livrable du banc est l'analyse : elle ne peut pas contredire le code.

## 4. Ce que je n'ai pas pu vérifier

- Le relevé dynamique complet (`metriques.json`) : absent à l'écriture. Le débordement mobile n'est
  mesuré que sur plan-de-relance ; les 13 autres pages à `odv-dashboard` sont une déduction.
- La lenteur d'APD (4-6 s par requête) : une seule mesure, contredite par la mesure directe (0,15 s).
- Le poids **compressé** réel des exports (mes octets sont décompressés) ; seuls les chiffres des
  analyses (1,6 Mo DGFiP, 8,8 Mo carburants) disent le transféré.
- Le tableau de minimis à 9 colonnes sur mobile (débordement probable, non mesuré).
- Que `facets context server-facets` fonctionne sur les 7 champs de decp sans HTTP 400 (un champ
  absent d'une source visée est désormais nommé en erreur, #820 — à essayer, pas à supposer).
