# Suivi — culture / entrepreneurs-spectacles

## 2026-09-26 — création (agent vague 2, fiche 7)

**Fait.** Page créée `public/culture/entrepreneurs-spectacles.html` (dsfr-data 0.42.0 bundle `core`,
DSFR 1.14.4, DSFR Chart 2.1.1 + CSS). Source principale Tabular
`fb6c3b2e-da8c-4e69-a719-6a96329e4cb2` en `fetch-mode="export"` (Parquet), `select` de 11 colonnes,
`max-records="200000"` ; tout le reste côté client. Population régionale : Tabular
`4dfccc0d-962c-4800-8599-b47730823a33` (17 lignes), `dsfr-data-join` inner sur le nom de région.

**Vérifié comment.**
- Chiffres du texte recalculés en DuckDB sur le Parquet complet (115 832 lignes) ; identiques à
  l'affichage relevé au navigateur (liste dans `analyse-metier.md`).
- Chronométrage Playwright (tunnel SOCKS, port 3827), trois chargements : 35 lectures `Range` du
  Parquet terminées en 1,4 à 2,5 s ; chapô rendu à 4,0-5,3 s ; clic de facette (statut « expirée »)
  → liste rafraîchie en 0,66-0,76 s. Deux passages isolés à 14 et 40 s : lenteur du tunnel (les
  lectures Parquet elles-mêmes à 7,6 s), non reproduite.
- Recette `RECETTE_PROXY=socks5://localhost:1080 node scripts/recette-pages.mjs` : err 0, kpi 7,
  graph 5, carte 0, cfg 0, légendes fausses 0.
- Console : 0 erreur ; 12 avertissements #765 (plusieurs queries sur `lic-n` et `reg-t`, attendus,
  cf. AM-094). L'avertissement de jointure « Mayotte orpheline » a été supprimé en excluant Mayotte
  explicitement (`region:neq:Mayotte`), exclusion dite en page.
- Survol : infobulle stylée sur la courbe mensuelle (2023-09 : 648 / 233 déclarations) et sur les
  barres d'échéance (2026-03 : 1 444 / 0) ; pastilles de l'infobulle aux couleurs de `color-map`
  (gris / bleu) sur le graphique empilé.
- 375 px : `scrollWidth` 375, pas de défilement horizontal.
- Captures : `captures/creation-2026-09-26/` (page pleine, deux survols, rejeu `color-map` sur
  courbe).

**Corrigé en cours de route.**
- Chapô « Depuis le 01/01/1970 » : `aggregate="date_depot_dossier:min"` rend 2020 (l'année) — rejoué
  sur page minimale (inline, 0.42.0 CDN) : query `min=2020 max=2026`, KPI `d:min` → 23/04/2020.
  Remplacé par `order-by="date_depot_dossier:asc" limit="1"` joint à la synthèse (BUG-023, déjà au
  registre).
- `value-fields="valide:Valides, à leurs cinq ans ce mois-là"` : la virgule du libellé coupait la
  série en deux (légende « Valides » + « À leurs cinq ans ce mois-là »). Libellé sans virgule.
- Courbe mensuelle avec `color-map` : lignes et légende recolorées, **points non** (courbe orange à
  points bleu clair). Rejoué sur page minimale (deux séries `line`, avec et sans `databox`) : même
  défaut. `color-map` retiré de la courbe.
- Titre d'échéance « par centaines… 2027 plus chargé encore » : non soutenu par la donnée
  (767 à 2 100 expirées par mois ; 864 à 1 842 échéances par mois en 2027). Récrit.
- Liste triée par nom : les raisons sociales commençant par « : », « . » ou « " » passaient en tête ;
  tri par date de dépôt décroissante.
