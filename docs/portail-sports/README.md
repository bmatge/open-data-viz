# Relevé visuel des dataviz du portail Sports (data.sports.gouv.fr)

Troisième banc d'essai, après `../portail/` (data.economie) et `../portail-education/`.
Relevé au navigateur le **2026-09-11** (lot 19), selon la méthode du lot 12
([`../portail-education/_METHODE.md`](../portail-education/_METHODE.md)) : objectif → relevé
visuel onglet par onglet → défauts de l'original → transposition → limites → check-list de
fidélité, chiffres recoupés à l'API v2.1.

## Le portail n'a pas de catalogue

L'accueil (`/pages/accueil/`, template archivé en [`_sources/accueil.html`](_sources/accueil.html))
est du HTML DSFR écrit à la main : **zéro directive `ods-*`, zéro appel `/api/`**. Il propose
trois parcours :

| Parcours | Cible | Traitement |
|---|---|---|
| Portrait de territoires | `/pages/portrait-territoire/` — 6 onglets, 102 contextes sur 29 jeux | [fiche](portrait-territoire.md) · `public/sports/portrait-territoire.html` |
| Portrait de fédérations | `/pages/portrait-federation/?refine.code_fs=101` — 5 onglets, 59 contextes sur 13 jeux | [fiche](portrait-federation.md) · `public/sports/portrait-federation.html` |
| Équipements sportifs | `equipements.sports.gouv.fr` (Data ES) | Renvoi : ses trois dataviz sont reproduites au portail Éducation (lot 12) |

Aucun des 51 jeux du portail ne décrit ses pages : le registre
(`public/data/registre-sports.json`) est écrit en entier par
`scripts/build-registre-sports.mjs`, **une entrée par onglet** — c'est à cette maille que jeux,
graphiques et KPI changent.

## Contraintes du portail, relevées une fois pour toutes

- **Aucune clé**, CORS `*`, pour les deux portraits.
- **Quota anonyme de 5 000 requêtes par jour et par IP** (`x-ratelimit-limit`, remise à zéro à
  00:00 UTC). Une visite complète de l'original du portrait de fédération en tire 169. C'est le
  quota de l'auditeur et de la recette, pas du public : chaque visiteur a le sien.
- Le jeu `data-es` du portrait de territoire vit sur `equipements.sports.gouv.fr` (domaine
  `equipements-sgsocialgouv`), autre quota.
- Les deux templates : 253 `ods-adv-analysis`, 57 `ods-results`, 8 `ods-chart-query`.

## Sources archivées

`_sources/portrait-territoire.{html,css}`, `_sources/portrait-federation.{html,css}`,
`_sources/accueil.html` — templates désechappés tirés de `$scope.blocks`.
