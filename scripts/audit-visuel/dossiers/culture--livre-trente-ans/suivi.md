# Suivi — culture / livre-trente-ans

## 2026-09-26 — création (agent vague 2, fiche 8)

**Fait.** Page `public/culture/livre-trente-ans.html` (dsfr-data 0.42.0 `core`, DSFR 1.14.4, DSFR
Chart 2.1.1 + CSS). Source unique Tabular `9f55911c-63b2-4d33-8757-348abde08235`, `select` de 11
colonnes, une requête (33 lignes ; pas d'export Parquet : `parquet_url` absent des extras de la
ressource). Tout le reste côté client : trois `group-by` constants + trois `join` pour les bornes,
`compute when … else 0` + somme pour chaque chiffre du texte ; `unpivot` + `repeat scopes` pour les
petits multiples.

**Vérifié comment.**
- Données brutes lues par curl via le tunnel SOCKS (`/data/?page_size=50`, `meta.total` = 33) et
  profil (`/profile/` : colonnes lues typées `float`, `annee` `int`). Chaque chiffre du texte recalculé
  en Python sur ces lignes ; identique au rendu relevé au navigateur (Playwright, port 3828).
- Dictionnaire des variables (xlsx, ressource `f342fe6b`) lu : source Kantar, « rupture à partir de
  2012 » pour les parts de marché, occasion et numérique.
- Recette `RECETTE_PAGES=culture/livre-trente-ans RECETTE_PROXY=socks5://localhost:1080` : err 0,
  kpi 4, graph 8, carte 0, cfg 0.
- Console : 0 erreur ; avertissements #765 attendus (plusieurs queries sur une même source).
- Survol : infobulle stylée ; `g-internet` → « 2,002 2 % », `g-occ` → « 2,015 14 % 6 % 3 % »
  (année au format nombre anglais : BUG-024, connu ; séries non nommées : AM-086, connu).
- 375 px : `scrollWidth` 375, pas de défilement horizontal.
- Captures : `captures/creation-2026-09-26/` (page, survol-g-occ, survol-g-internet).

**Corrigé en cours de route.**
- Première version : une courbe à six séries (`value-fields`). Attribut `y` du `line-chart` relevé
  au DOM : Internet `[0,0,0,0,0,0,0,0,0,2,3,…]` alors que la source a `null` de 1993 à 2001. Même
  version : `color-map` recolore les traits mais pas les points (pixels du canvas : 603 à 790 par
  couleur demandée, 2 796 à 2 981 par couleur de la palette `categorical` par défaut). Remplacée par
  des petits multiples ; `color-map` retiré des courbes.
- `lib:count` comptait 33 années (2011 incluse) : remplacé par une somme d'indicateur (32).
- Affirmations non vérifiées retirées de « ce qu'on ne montre pas » (méthode du panel, datation de
  la Base des librairies).
