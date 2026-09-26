# Suivi — culture / festivals-p131

## 2026-09-27 — création (agent vague 5, fiche 25)

**Fait.** Page créée `public/culture/festivals-p131.html` (dsfr-data 0.42.0 bundle `core`, DSFR
1.14.4, DSFR Chart 2.1.1 + CSS). Source unique : Tabular `e4761b32-c601-4ec9-b361-658315d07389` en
`fetch-mode="export"` (Parquet présent : `hydra…/parquet/e4761b32….parquet`), `max-records="5000"`,
`trim`. Tout le reste côté client.

**Vérifié comment.**
- Chiffres du texte recalculés en Python sur les 1 602 lignes (9 pages Tabular via
  `curl --socks5-hostname localhost:1080`), identiques à l'affichage relevé au navigateur
  (tableau dans `analyse-metier.md`).
- Recette (`RECETTE_PROXY=socks5://localhost:1080`, port 3875) : err 0, kpi 6, graph 4, carte 0,
  cfg 0, aucune légende fausse.
- Console : 0 erreur ; avertissements attendus #765 (plusieurs queries sur une même source).
- Survol du graphique des tranches : infobulle stylée, « 100 001 à 500 000 € — 3,6 % / 21 % ».
  Pastilles d'infobulle non recolorées par `color-map` (BUG-022, connu).
- Facette année : `default="annee:2024"` sur un champ numérique pré-sélectionne bien 2024 (810 aides).
- 375 px au chargement : `scrollWidth` = 375, pas de défilement horizontal.
- Captures : `captures/creation-2026-09-26/page.png` (pleine page), `survol.png`.

**Corrigé en cours de route.**
- Deux graphiques vides (top 15, tranches) : `rename` et `compute` dans le même
  `dsfr-data-normalize` — `rename` s'exécute avant `compute` et ne voit pas les colonnes calculées,
  sans erreur ni avertissement. Scindé en deux normalize.
- KPI `lines` : format pourcentage par défaut (« en 810 % aides ») → `"format":"nombre"` ; suffixe
  « % des crédits » doublé → « des crédits ».
- `dsfr-data-list decimals="1"` formatait l'année (« 2 024 ») et les effectifs (« 792,0 ») :
  arrondis dans `compute`, année passée en texte (`concat('', annee)`).
- SIRET : 3 manquants en 2024, 792/792 en 2023 (le cadrage disait « souvent vide ») ; texte réécrit.
- Tranche > 500 000 € : 7 aides et non 8 (le 8e montant vaut exactement 500 000 €).
