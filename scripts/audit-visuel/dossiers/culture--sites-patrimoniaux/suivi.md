# Suivi — culture / sites-patrimoniaux

## 2026-09-27 — création (agent vague 3, fiche 14)

**Fait.** Page créée `public/culture/sites-patrimoniaux.html` (dsfr-data 0.42.0 bundle complet pour
la carte, DSFR 1.14.4, DSFR Chart 2.1.1 + CSS). Source unique Tabular
`b916f51e-7252-41c2-8a0e-eb47e0c9292b` en `fetch-mode="export"` (Parquet), `select` de 13 colonnes ;
tout le reste côté client (normalize `compute`, queries, join sur clé constante pour le total brut).
Dossier d'audit créé (`analyse-metier.md`, ce fichier, captures `creation-2026-09-26/`).

**Vérifié comment.**
- Jeu complet relu par l'API Tabular (6 pages de 200 via tunnel SOCKS, `meta.total` = 1 145) et
  recompté en Python : 693 / 199 / 112 / 75 / 8 par origine (lignes numérotées), 464 ZPPAUP / 35 PVAP
  en plan, 464 ZPPAUP restées ZPPAUP, 127 remplacements à l'étude ou à venir, 69 LCAP sans plan,
  décennies 268 / 374 / 205 / 110, 9 non datées, 404 < 2 000 hab., 1 022 SPR, 1 029 communes.
  Tous identiques à l'affichage relevé au navigateur.
- Playwright (proxy SOCKS, bypass localhost, port 3839) : liste prête ~0,65 s après
  `domcontentloaded` ; 0 erreur de page, 0 erreur de configuration ; seuls avertissements : #765
  (queries multiples sur une même source), attendus.
- Survol du graphique empilé (barre ZPPAUP) : infobulle stylée, 464 / 197 / 0 / 27 / 5.
- Filtre « Plan de valorisation (PVAP) » : KPI 35, 77 % nées ZPPAUP, 0 % sous ZPPAUP ; liste 35.
- 375 px chargée d'emblée : `scrollWidth` 375, pas de défilement horizontal.
- Recette `RECETTE_PAGES=culture/sites-patrimoniaux RECETTE_PROXY=socks5://localhost:1080` :
  err 0, kpi 7, graph 3, carte 4, cfg 0.

**Corrigé en cours de route.**
- Dénominateur : le cadrage comptait les 1 145 lignes, projets sans numéro compris ; la page porte
  sur les 1 087 lignes numérotées (63,8 % au lieu de 60,5 %), et le dit.
- Phrase par décennie : quatre `dsfr-data-repeat` en `<span>` s'affichaient en blocs coupés ; une
  phrase complète par décennie.

**Remarque.** La carte s'ouvre au zoom 5 (France au centre d'une vue large), comme la page Festivals :
le fit est bien clippé à la métropole (`resolveFitZone` = `41,-5.5,51.5,10`), mais Leaflet arrondit au
zoom entier inférieur sur un conteneur de 830 px.
