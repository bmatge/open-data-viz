# Suivi — culture / festivals

## 2026-09-26 — création (agent vague 1, fiche 5)

**Fait.** Page créée `public/culture/festivals.html` (dsfr-data 0.42.0 bundle complet pour la carte
Leaflet, DSFR 1.14.4, DSFR Chart 2.1.1 + CSS). Source unique : Tabular
`47ac11c2-8a00-46a7-9fa8-9b802643f975` en `fetch-mode="export"` (Parquet) avec `select` de 12
colonnes ; tout le reste côté client.

**Vérifié comment.**
- Chiffres du texte recalculés en Python (pandas) sur le Parquet complet
  (`hydra.s3.rbx.io.cloud.ovh.net/parquet/47ac11c2….parquet`, 7 283 lignes = `total_lines` du
  profil Tabular) ; identiques à l'affichage relevé au navigateur (voir `analyse-metier.md`).
- Chargement chronométré (Playwright via tunnel SOCKS, port 3818) : 1 appel
  `api/2/datasets/resources/{rid}/` puis 13 lectures `Range` parallèles du Parquet (≈ 377 Ko sur
  710), terminées en ~1,2 s ; liste prête à ~1 s après `domcontentloaded`.
- Recette (`scripts/recette-pages.mjs`, copie temporaire avec `bypass: 'localhost'` sur le proxy —
  le script du dépôt envoie aussi `localhost` dans le tunnel, `ERR_SOCKS_CONNECTION_FAILED`) :
  err 0, kpi 6, graph 4, carte 6, cfg 0, légendes fausses 0.
- Console : 0 erreur de page, 0 erreur de configuration ; avertissements attendus #765 (queries
  multiples sur une même source) et « 33 lignes sans coordonnées ». Une 404 isolée sur une tuile
  IGN hors couverture (`TILEMATRIX=8`, encart) lors d'un passage, non reproduite à la capture.
- Survol du graphique empilé : infobulle stylée, trois valeurs (50,2 / 27,5 / 20,9 % pour la
  musique), séries non nommées (AM-086, connu).
- Carte : couleurs par discipline comptées (Musique 3 215 points = 3 229 − 14 sans coordonnées) ;
  après clic « Cinéma », 679 points dans chaque carte, tous `#a558a0`.
- 375 px : pas de défilement horizontal.
- Captures : `captures/creation-2026-09-26/` (page, survol).

**Corrigé en cours de route.**
- `contains()` est insensible à la casse : « Avant-saison ( » contenait « saison ( » et les trois
  périodes tombaient en été (4 638 au lieu de 2 703, ratio 6,9). Rang de période tiré de la chaîne
  brute (« 1er janvier », « 21 juin », « 6 septembre »).
- « Cinéma et livre préfèrent l'automne » retiré : faux en volume (avant-saison plus fournie).
- Encarts réduits de neuf à cinq (DROM) : chaque encart redessine toute la couche ; clic de facette
  2,4 s avec neuf encarts, 0,7 à 1,4 s avec cinq. Les 5 festivals géolocalisés hors encart comptés en
  page (sans double compte avec les 33 sans coordonnées).
