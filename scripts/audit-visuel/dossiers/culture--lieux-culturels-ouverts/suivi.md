# Suivi — culture / lieux-culturels-ouverts

## 2026-09-27 — création (agent vague 3, fiche 12)

**Fait.** Page créée `public/culture/lieux-culturels-ouverts.html` (dsfr-data 0.42.0 bundle complet
pour la carte Leaflet, DSFR 1.14.4, DSFR Chart 2.1.1 + CSS). Source unique : Tabular
`4bd1a20e-4dfd-40ff-bd4d-c714f7085de8` en `fetch-mode="export"` (Parquet), `select` de 12 colonnes,
`max-records="60000"` (plafond par défaut 25 000 < 36 392 lignes). Deux `normalize` (reconstruction
des listes par `contains()`, puis `split`), tout le reste côté client.

**Vérifié comment.**
- Chiffres du texte recalculés en DuckDB sur le Parquet complet (36 392 lignes = `total_lines` du
  profil Tabular) ; identiques à l'affichage relevé au navigateur (tableau dans `analyse-metier.md`).
- Chargement (Playwright via tunnel SOCKS, port 3837) : 1 appel `api/2/datasets/resources/{rid}/`
  puis 13 lectures `Range` du Parquet ; chapô rendu 2,8 à 4,9 s après `domcontentloaded` selon le
  passage (tunnel).
- Recette (`RECETTE_PROXY=socks5://localhost:1080`) : err 0, kpi 6, graph 2, carte 6, cfg 0.
- Console : 0 erreur ; avertissements #765 attendus (plusieurs queries sur une même source).
- Survol du graphique des domaines : infobulle stylée, « Lecture, livre et presse 18,3 % ».
- Facette « Déclaré fermé au public » : KPI 223 en 464 ms ; 5 points isolés + 218 dans les grappes = 223.
- Recherche « Arles » (`operator="starts"`) : 38 lieux, recalcul Python indépendant 38. En `contains`
  (défaut) : 338, « Charles », « Marles »… — d'où `starts`.
- Clic d'un point : volet avec statut, adresse, domaine, lien « Compléter ou corriger cette fiche »
  (`basedeslieux.culture.gouv.fr/lieux/{id}` : 200 et formulaire prérempli ; id inventé → 302).
- Doublons de tableau : page minimale injectée (`["Patrimoine","Patrimoine"]`, `["Patrimoine"]`) —
  la facette affiche « Patrimoine 3 » pour 2 lignes, et `query explode` compte aussi 3. D'où la
  reconstruction sans doublon par `contains()`.
- 375 px : pas de défilement horizontal (scrollWidth 375).
- Captures : `captures/creation-2026-09-26/` (page, survol, fiche-carte).

**Corrigé en cours de route.**
- « Les bibliothèques, premier contingent de la base » : faux (Patrimoine 16 697 > Lecture 15 379
  une fois chaque domaine compté). Titre de bloc réécrit.
- « La médiathèque, le lieu le plus fréquenté au quotidien » : non vérifié, retiré.
- Couleur « fermé » passée du rouge au violet et « ouvert » du bleu au vert : les grappes de
  `cluster` sont bleues (< 100) puis rouges (≥ 100) en dur dans la bibliothèque.
- « Sans message » sur la troncature à 25 000 : faux, l'adaptateur avertit en console. Réécrit.
- Affirmation « 36 000 cercles figeraient la carte » non chronométrée : remplacée par la mesure de la
  page festivals (2,4 s par clic pour 7 250 cercles × cadres) et la mesure d'ici avec grappes (464 ms).
