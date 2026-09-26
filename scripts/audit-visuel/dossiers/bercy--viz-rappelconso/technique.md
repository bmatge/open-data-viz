# Technique — Tableau de bord Rappel Conso

> Les problemes rencontres en reproduisant, et ce qui les a resolus.
> **Ce fichier n'est jamais ecrase par un script.**

## Composants `dsfr-data` employes

`dsfr-data-source` (une `server-side` + `order-by` pour la grille, quatre `fetch-mode="export"` pour les agrégats),
`dsfr-data-query` (part `share_percent` sans `group-by`, tri), `dsfr-data-normalize` (`round`, `split`),
`dsfr-data-search` (`server-search` + `search-template`), `dsfr-data-facets` (`server-facets`),
`dsfr-data-kpi`, `dsfr-data-chart` (barres), `dsfr-data-a11y` (`description`), `dsfr-data-display` (pagination serveur).

## Ce qui a coince

### Une ligne du jeu n'etait pas un rappel (2026-09-26)

- **Observe** : `rappelconso-v2-gtin-trie` = 18 472 lignes pour 12 435 `numero_fiche` distincts (export `group_by=numero_fiche`) ; fiche 2025-03-0160 sur 81 lignes ; 6 264 fiches du jeu `-espaces` absentes (produits sans GTIN), dont 1 697 vehicules sur 1 756.
- **Cause** : jeu choisi au lot 6 sans demander ce qu'est une ligne.
- **Resolu** : `dataset-id="rappelconso-v2-gtin-espaces"` (18 699 lignes = 18 699 fiches ; memes champs, memes facettes declarees).

### Recherche locale sur 12 lignes

- **Observe** : sans `server-search`, compteur « 12 rappels » au chargement, « ammo » → 0.
- **Resolu** : `server-search`. En 0.33.0, `fields` n'est pas lu en mode serveur (gabarit par defaut `search("{q}")`, tous champs ; `{fields}` n'existe pas dans le bundle 0.33.0) : les champs sont repetes dans `search-template='search(libelle, marque_produit, …, "{q}")'` (ODSQL accepte plusieurs champs dans `search()`, verifie a l'API : 200).

### Tri sur un alias d'agregat delegue au serveur (0.33.0)

- **Observe** : `dsfr-data-query group-by="categorie_produit" aggregate="n:sum:fiches, fiches:share_percent:part" order-by="fiches:desc"`, seule lectrice de sa source → `exports/json?…&order_by=fiches DESC` → 400, repli `/records` → 400, KPI voisin « Erreur de chargement: HTTP 400 ». Avec un second lecteur (KPI) sur la source, tout restait client (avertissement #765) et fonctionnait.
- **Cause** : `_delegateOrderBy` de la 0.33.0 ne tenait pas compte d'un regroupement non delegue ; corrige en 0.36.0 (#1045, changelog — non rejoue ici).
- **Resolu** : part sans `group-by` (`aggregate="n:share_percent:part" order-by="n:desc"`), la source etant deja groupee par le portail ; le tri sur `n` part au serveur et y est valide.

### Annees graduees 2021.5 sur `type="line"`

- **Observe** : axe X 2021, 2021.5, 2022… meme avec `an` en texte (`date_format`).
- **Resolu** : `type="bar"` (LIM-017, DSFR Chart).

### Fenetres de dates

- A l'API, `exports/json?select=count(*) as n&where=…` sans `group_by` rend la valeur repetee une fois par ligne (2 520 objets `{"n": 2520}`, verifie le 2026-09-26) : lue en `n:sum`, comme l'ecrit la recommandation R3, elle donnerait 2 520² si la bibliotheque transmettait la reponse telle quelle. Non essaye dans la page (le source recent traite ce cas a part, #810, version de livraison non verifiee) : `group-by="year(date_publication) as an"` rend une seule ligne par fenetre et ote la question.

## Renvois au registre

AV-018, PG-010, PG-001 (etendu au comptage), PG-015, LIM-017, AM-020, AM-007, FP-010, PG-026 (count distinct approximatif, dans l'analyse metier).

## Pieges reperes sur cette page

- « `select=count(*)` sans `group_by` » : deja au tableau du CLAUDE.md — repaye en lisant la recommandation R3, rattrape avant ecriture.
- « `dsfr-data-join` sur une cle non unique » : sa variante sans jointure (une ligne n'est pas l'unite comptee) n'y figure pas encore.
- « Recette qui ne compte que des nombres » : aucune recette ne pouvait voir l'erreur d'unite (18 472 est un nombre plausible).
