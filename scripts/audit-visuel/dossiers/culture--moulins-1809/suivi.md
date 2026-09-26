# Suivi — culture / moulins-1809

## 2026-09-27 — création (agent vague 4, fiche 19)

**Fait.** Page `public/culture/moulins-1809.html` (dsfr-data 0.42.0 bundle complet pour la carte
Leaflet, DSFR 1.14.4, DSFR Chart 2.1.1 + CSS). Source unique : Tabular `912c2c2f…` (20 313 notices),
`fetch-mode="export"` (Parquet) + `select` de 10 colonnes. Récit : titre-message, chapô et 4 KPI
calculés → part du vent par département (1809) → trois enquêtes empilées → part du vent de l'an II →
exploration (recherche, facettes à enquête par défaut, carte, tableau) → ce qu'on ne montre pas →
`#analyse`.

**Vérifié comment.**
- Agrégats serveur Tabular (`Date de l'enquête__groupby&Type de moulin__groupby&Nombre de
  moulins__sum`) et export Parquet complet relu en pandas (1 100 338 octets) : chiffres identiques à
  l'affichage — 1809 France : 12 082 moulins, 9 795 eau, 2 285 vent, 8 466 notices, 33 départements
  (Seine → Paris), Nord 831 vent (36 %), Paris 53 ; an II : 78 départements, 15 034 moulins, 21,4 %
  vent, 56 départements ≥ 100 dont 7 à vent majoritaire ; an X : 14, 5 320, 33,4 % ; Manche 6 → 1 218 ;
  hors France 1809 : 533 notices, 684 moulins ; 36 notices françaises de 1809 sans coordonnées. Les
  trois tableaux a11y comparés ligne à ligne.
- Navigateur (Playwright via tunnel SOCKS, port 3846) : 0 erreur console, 0 erreur de configuration ;
  avertissements attendus : #765 (queries multiples sur une même source, calcul client voulu), 569
  lignes sans coordonnées (533 hors France + 36).
- Survol des trois graphiques : infobulles stylées ; sur le graphique empilé, les pastilles de
  l'infobulle sont bien bleue (eau) et orange (vent) — `color-map` n'a pas faussé l'infobulle ici.
- Facette enquête : défaut 1809 (8 999 notices, 8 430 points) ; bascule an II → 15 072 moulins, 6 761
  points, KPI à jour.
- Recette (`RECETTE_PAGES=culture/moulins-1809`, `RECETTE_PROXY`) : err 0, kpi 7, graph 3, carte 1,
  cfg 0.
- Captures : `captures/creation-2026-09-26/` (page, carte, survol-g-enq).

**Corrigé en cours de route.**
- « dont une dizaine réduits à quelques communes » : faux, 3 départements sous 30 moulins.
- « la Bretagne, un moulin sur trois au vent » : le Finistère est à 29 %, fourchette réécrite
  (un sur quatre à deux sur cinq).
- Titre de bloc « tous au nord de la Seine » : faux pour Paris et les Hauts-de-Seine, réécrit.
