# Suivi — culture / lieux-culturels

## 2026-09-27 — création (agent vague 3, fiche 11)

**Fait.** Page créée `public/culture/lieux-culturels.html` (dsfr-data 0.42.0 bundle `core`, DSFR
1.14.4, DSFR Chart 2.1.1 + CSS). Source : Tabular `dced78ee-0823-4b61-86e6-57717308d4e4` en
`fetch-mode="export"` (Parquet) avec `select` de 13 colonnes et `max-records="100000"` ; population
régionale `4dfccc0d-…` (17 lignes) jointe sur le code région. Tout le reste côté client.

**Vérifié comment.**
- Chiffres du texte recalculés en Python (pandas) sur le Parquet complet
  (`hydra.s3.rbx.io.cloud.ovh.net/parquet/dced78ee….parquet`, 86 366 lignes = `total_lines` du
  profil Tabular) ; tous identiques à l'affichage relevé au navigateur (voir `analyse-metier.md`).
- Modalités sondées sur l'export : 11 domaines, 20 types, 7 niveaux GCD + 84 vides,
  `Demographie_AP` = « Actif » sur toutes les lignes.
- Recette (`RECETTE_PAGES=culture/lieux-culturels`, `RECETTE_PROXY=socks5://localhost:1080`, port
  3836) : err 0, kpi 10, graph 4, carte 0, cfg 0.
- Console : 0 erreur ; avertissements attendus #765 (plusieurs queries sur une même source) et
  « 7 lignes gauches sans correspondance » de la jointure régionale (Mayotte, COM, étranger — dit
  en page).
- Chargement : 3 requêtes réseau (métadonnées de ressource, Parquet par plages, population) ;
  section régionale remplie 2,2 à 2,7 s après `domcontentloaded` (deux mesures).
- Facette « Rural à habitat très dispersé » : KPI 6 821 / 78 % / 93 %, identiques à la section
  densité ; `url-sync` écrit `?gcd=…`.
- Survol du graphique empilé : infobulle stylée, 54,8 / 7,1 / 25,7 / 12,4 % pour les grands centres
  urbains, pastilles aux couleurs du `color-map` (BUG-022 non reproduit en 0.42.0), séries non
  nommées (AM-086, connu).
- 375 px : `scrollWidth` 375, pas de défilement horizontal.
- Captures : `captures/creation-2026-09-26/page.png` (pleine page), `survol.png`.

**Corrigé en cours de route.**
- `x-max="100"` sans effet sur une barre horizontale (réservé à line/scatter/bar-line) ; l'axe
  montait à 120 parce que des parts arrondies sommaient à 100,1. `y-max="100"` essayé : il ajoute
  une catégorie « 100 » à l'axe des libellés. Solution retenue : dernière part en reste, sans borne.
- Phrase sur les monuments : les 1 998 monuments non MH portent ACR (1 782), Unesco (121),
  monument national (94) ou musée national (1) — « monument national » ajouté.
