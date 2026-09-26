# Suivi — developpement-durable / logements-neufs

## 2026-09-26 — création (agent vague 1, D2)

**Fait.** Page créée `public/developpement-durable/logements-neufs.html` (dsfr-data 0.42.0 core,
DSFR 1.14.4, DSFR Chart 2.1.1 + CSS). Sources : DiDo ECLN national brut (38 lignes filtrées),
ECLN départemental (768 lignes filtrées : collectif × 2019/2025), Sitadel départemental (1 313 lignes),
Insee Melodi `DS_IPC_PRINC` annuel (joint par l'année).

**Vérifié comment.**
- Chiffres du texte recalculés en Python sur les exports DiDo complets et l'API Melodi (et la série
  BDM 001763852 en contrôle : +15,5 % hors tabac, base 2015) ; identiques à l'affichage.
- Navigateur (Playwright, port 3805) : 0 erreur console, 0 erreur de configuration ; seuls
  avertissements : #765 (queries lues par plusieurs consommateurs, calcul client — attendu).
- Recette (`scripts/recette-pages.mjs`, copie locale élargie à `public/developpement-durable/`,
  le script du dépôt ne liste pas ce dossier) : err 0, kpi 3, graph 5, cfg 0, légendes fausses 0.
- Survol du graphique de prix : infobulle stylée, deux valeurs ; en-tête d'année « 2,021 » (BUG-024).
- Carte : couleurs relevées par département (Somme la plus foncée, Loire la plus claire, départements
  sans valeur et DROM en rgb(92,104,229), hors légende).
- Captures : `captures/creation-2026-09-26/` (page, carte, chantiers, survol-prix).

**Corrigé en cours de route.**
- Courbe des mises en chantier qui plongeait à 0 la dernière année (null → 0 dans le graphique) :
  séparée en deux graphiques.
- Carte d'abord en « évolution » (valeurs négatives, départements absents confondus avec les plus
  fortes baisses) : passée en « recul », palette `sequentialAscending`, légende texte des territoires
  sans valeur.
- Trois affirmations non vérifiables retirées (report vers les ventes en bloc, causes nommées,
  sens brut des annulations).
