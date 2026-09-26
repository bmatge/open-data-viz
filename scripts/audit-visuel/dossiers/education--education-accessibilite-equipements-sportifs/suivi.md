# Suivi — Accessibilité des équipements sportifs

> Le journal de la transformation. Une ligne par intervention, la plus recente en haut.
> **Ce fichier n'est jamais ecrase par un script.**

| Date | Ce qui a change | Pourquoi | Verifie comment |
|---|---|---|---|
| 2026-09-26 | Recréation en récit : trois états (aire accessible / autre case / aucune case) au lieu du oui/non ; preuve moteur vs sensoriel, nuances région et famille, exploration (13 critères via `dsfr-data-concat`, facettes `server-facets context`, carte à trois couleurs) ; installations retirées | Les booléens `false` mêlent « non accessible » et « jamais rempli » : 42 % des fiches moteur, 82 % sensoriel n'ont coché aucune case (liste `equip_acces_handi_*` nulle) ; la page précédente affirmait que ce troisième état n'existait pas | API rejouée (tous les chiffres des phrases) ; recette `err: 0 kpi: 7 graph: 4` ; Playwright : console sans erreur, survol du graphique régional (infobulle Bretagne 63 % / 2,3 % / 34,7 %), filtre Bretagne (19 212 équipements, 63 %, URL `?reg_nom=Bretagne`) ; capture `captures/recreation-2026-09-26/reprise.png` |
