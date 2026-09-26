# Suivi — developpement-durable / argiles

## 2026-09-26 — création (agent vague 2)

**Fait.** Page créée `public/developpement-durable/argiles.html` (dsfr-data 0.42.0 core, DSFR 1.14.4,
DSFR Chart 2.1.1 + CSS). Sources : DiDo RGA par EPCI (`1a9ad5c2-…`, 7 404 lignes), RGA par période
(`1d6ff531-…`, 7 404 lignes, 5 colonnes), Sitadel EPCI (`cb3c0612-…`, filtré 2019-2024 × individuel,
15 068 lignes, 2 colonnes) — trois connexions DiDo au montage, pas une de plus ; geo.api.gouv.fr
`/epcis?fields=code,surface,population` (1 254 lignes) pour le contrôle de cohérence.

**Vérifié comment.**
- Chiffres du texte recalculés en Python sur les exports DiDo complets et geo.api (scripts dans le
  scratchpad de session) ; identiques à l'affichage (écart d'arrondi de 0,1 point sur une tranche).
- Navigateur (Playwright, port 3824) : 0 erreur console, 0 erreur de configuration une fois les
  noms de champs corrigés ; seuls avertissements : #765 (queries lues par plusieurs consommateurs).
- Recette (`RECETTE_PAGES=developpement-durable/argiles`) : err 0, kpi 3, graph 3, cfg 0, légendes
  fausses 0. Deux exécutions sur quatre ont eu **un** `Failed to fetch` sur une source DiDo (CORS
  absent = 429) pendant que d'autres agents chargeaient DiDo depuis la même IP ; rechargée seule, la
  page passe.
- Survol du graphique groupé : infobulle stylée, deux valeurs, pastilles conformes à la légende ; les
  séries ne sont pas nommées dans l'infobulle (AM-086, connu).
- Captures : `captures/creation-2026-09-26/page.png` (pleine page), `survol-tranches.png`.

**Corrigé en cours de route.**
- Titre du cadrage (« un logement sur cinq ») : faux, le fichier compte des maisons exposées.
- Champs après `dsfr-data-join` : `prefix-right` ne s'applique qu'aux champs en collision ; les phrases
  lisaient `nat_cl`, `e_incoh`… vides (et le graphique groupé affichait des zéros). Renommés.
- Suffixe de KPI `lines` : l'unité « % » est déjà posée, le suffixe la doublait.
- « La part ne baisse jamais » : faux (18,4 → 17,4 % entre les deux premières périodes) ; réécrit.
- Découverte : 184 EPCI (seuil +5 %) à surface exposée supérieure à leur superficie ; contrôle ajouté en page.
