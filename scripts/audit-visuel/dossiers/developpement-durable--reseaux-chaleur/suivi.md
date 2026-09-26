# Suivi — developpement-durable--reseaux-chaleur

## 2026-09-27 — création (vague 3)

**Fait** : page créée depuis le cadrage § 5 de `docs/portail-developpement-durable/proposition.md`.
Sept sources DiDo (une par année, `FILIERE=eq:C&columns=…` identiques), `dsfr-data-concat` pour
l'évolution, `lazy` en deux vagues pour respecter la limite de 3 connexions.

**Vérifié comment** :
- Chiffres rejoués sur l'export complet des 7 fichiers (script Python du scratchpad) : 33,09 TWh,
  gaz 32,0 %, fossiles 33,1 / récupérée 34,6 / renouvelables 32,3 %, Paris 18,2 % de la chaleur et
  27,0 % du gaz, sans Paris 28,6 %, 162 réseaux > 50 % gaz (10,3 % de la chaleur), gaz 36,3 → 29,7 →
  32,0 %, charbon+fioul+GPL 1,51 → 0,34 TWh. Page au navigateur : mêmes valeurs.
- Playwright (1280×800, défilement 0,8 écran / 250 ms) : 3 graphiques rendus, 4 KPI, 0 erreur
  console (seulement les avertissements #765 « source lue aussi par… »), survol du top 10 : infobulle
  stylée, pastilles orange/gris conformes à `color-map`. Capture : `captures/creation-2026-09-26/`.
- Concurrence DiDo relevée requête par requête : 1re version (cible `lazy` sur le graphique des
  filières, à 817 px AVANT données) → 4 requêtes en vol au chargement, une 429 « Failed to fetch »,
  évolution vide. Cibles déplacées (#t-paris à 1 317 px avant données, #g-evo-slot) → 3 en vol au plus
  sur 4 passages sur 5 ; un passage réseau lent a vu 6 en vol (toutes en 200).
- Recette : `RECETTE_BASE=http://localhost:3832 RECETTE_PAGES=developpement-durable/reseaux-chaleur`
  → err 0, kpi 4, graph 3, cfg 0.
- Bug de page trouvé et corrigé : collision de préfixe `prefix-right="p_"` sur un champ déjà nommé
  `p_gaz` (« dont 11 504 315,1 % au gaz ») → préfixe `d_` et champ `pct_gaz`.
