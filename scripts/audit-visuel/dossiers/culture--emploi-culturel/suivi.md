# Suivi — culture--emploi-culturel

## 2026-09-26 — création (vague 2)

- Page créée : `public/culture/emploi-culturel.html`, dsfr-data 0.42.0 (bundle core), DSFR Chart 2.1.1 + CSS.
- Données : deux sources Tabular `fetch-mode="export"` (Parquet, `parquet_url` vérifié sur `/api/2/datasets/resources/{rid}/`).
- Vérifications :
  - Jeux complets téléchargés par l'API Tabular (tunnel SOCKS), recalcul Python indépendant : unicité code × millésime
    (700 clés de chaque côté), aucun null, 100 codes identiques des deux côtés ; tous les chiffres du texte
    (7,7 / 31,9 / 43,6 / 23,2 / 12,2 / 3,74 / 4,7 / 13,2 / 1,5 / 30,1 / 1,71 / +0,25 Alpes-Maritimes / −0,87 Hauts-de-Seine,
    1 sur 11 / 1 sur 62) identiques au rendu navigateur.
  - Recette `RECETTE_PAGES=culture/emploi-culturel` : err 0, kpi 3, graph 3 (carte DSFR Chart comptée hors « carte »).
  - Playwright : défilement jusqu'aux 4 graphiques, survol des barres (infobulle stylée : « Paris 31,9 % 7,7 % »),
    tables a11y présentes, 0 erreur console. 15 avertissements #765 (query client sur source partagée), attendus.
  - Capture : `captures/creation-2026-09-26/page.png`.
- Écart au cadrage : titre recentré sur l'emploi (cf. analyse-metier.md) ; Ardennes « un sur 62 » (cadrage : soixante).
