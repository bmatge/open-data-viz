# Suivi — culture / prefets-prefetes

## 2026-09-27 — création (agent vague 5, fiche 22)

**Fait.** Page créée `public/culture/prefets-prefetes.html` (dsfr-data 0.42.0 bundle `core`, pas de
carte ; DSFR 1.14.4 ; DSFR Chart 2.1.1 + CSS). Source unique : Tabular
`fdd11c64-06b5-4aa0-9c0d-b4b2d443e129` en `fetch-mode="export"` (Parquet), `max-records="5000"`,
pas de `select` (9 colonnes). Tout côté client : `split="Poste en département:|"` pour les postes,
`compute` pour l'année (`year(replace(dates, '-', ' '))`), la décennie, le lustre.

**Vérifié comment.**
- Jeu complet relu à l'API Tabular par le tunnel SOCKS (20 pages de 200 = 3 918 lignes = profil) ;
  chaque chiffre recalculé en Python avec la même règle que le `compute` (regex ISO de `dateParts`
  sur la cellule aux tirets remplacés) : 3 918 / 99 / 2,5 % / 1981 / 2 910 sur 18 décennies /
  62 sur 251 depuis 2010 / 40 sur 160 (2010s) / 12 % (2005-09) / 24 sur 69 = 34,8 % (2015-19) /
  22 sur 91 = 24,2 % (2020-24) / 313 sans date dont 15 femmes / 84 préfètes datées — identiques à
  l'affichage.
- Règle de l'année : zéro cellule non vide non lue ; 3 lignes où le premier poste listé n'est pas le
  plus ancien (2 changent de décennie, hommes).
- Recette `RECETTE_BASE=http://localhost:3872 RECETTE_PAGES=culture/prefets-prefetes
  RECETTE_PROXY=socks5://localhost:1080` : err 0, kpi 7, graph 2, carte 0, cfg 0.
- Console : 0 erreur ; avertissements #765 attendus (plusieurs queries sur `p-n`, `dec`, `lus`).
- Survol `g-lus` : infobulle stylée « 2015-2019 — 34,8 % » (`captures/.../survol.png`).
- Exploration : recherche « Aveyron » → 102 personnes dont 8 préfètes (= Python) ; case Femme → 99.
- 375 px : `scrollWidth` 375. Chargement complet (networkidle) ~2,1 s.
- Captures : `captures/creation-2026-09-26/page.png`, `survol.png`.

**Observé, non corrigé ici.**
- KPI : aucun format ne rend une année sans séparateur de milliers (`1 981`) ; KPI remplacé par
  l'attente en années, année dans le chapeau.
- `compute` sans sous-chaîne : l'année se tire en détournant `year()`.
- Doublon Robertie dans le jeu (même Wikidata, deux graphies) : au producteur.
