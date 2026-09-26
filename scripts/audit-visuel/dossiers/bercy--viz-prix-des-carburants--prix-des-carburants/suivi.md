# Suivi — Prix des carburants

> Le journal de la transformation. Une ligne par intervention, la plus recente en haut.
> **Ce fichier n'est jamais ecrase par un script.**

| Date | Ce qui a change | Pourquoi | Verifie comment |
|---|---|---|---|
| 2026-09-26 | Recreation editoriale : titre-message, chapo calcule (4 repeats), 3 preuves (prix par carburant, etendue intra-regionale + reference inter-regionale, surcout autoroute), localisateur conserve, « ce qu'on ne montre pas » ; choroplethe retiree ; `timezone=Europe/Paris` retire (flux en heure de Paris etiquetee UTC) ; tableau et infobulle a 3 decimales | Brief recreation : la page doit raconter avant d'explorer ; l'heure affichee etait fausse de +2 h | Chiffres rejoues a l'API (export complet, python) ; recette `err: 0 kpi: 5 graph: 3 carte: 1 cfg:0` ; Playwright : survol des 3 graphiques, panneau de la station 89100001 = 09:07 comme le brut `@maj`, capture `captures/recreation-2026-09-26/reprise.png` |
| | | | |
