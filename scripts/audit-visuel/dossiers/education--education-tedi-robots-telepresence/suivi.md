# Suivi — Ted-i : Déploiement des robots de téléprésence

> Le journal de la transformation. Une ligne par intervention, la plus recente en haut.
> **Ce fichier n'est jamais ecrase par un script.**

| Date | Ce qui a change | Pourquoi | Verifie comment |
|---|---|---|---|
| 2026-09-26 | Recréation en récit : parc en service reconstitué mois par mois (concat poses/restitutions + `running_sum`), flux poses/restitutions, comparaison des campagnes à la même date (jointure sur la dernière pose + pivot, séries relatives colorées), section sur les 184 lignes sans établissement (47 UAI, 4 en portent 123) ; campagne août→juillet ; exploration conservée (recherche, facettes, carte, tableau) | Brief de recréation (lot 5) : les compteurs et le cumul de l'original cachaient que le parc se remplit et se vide chaque année scolaire | Chiffres recalculés en Python sur l'export du 2026-09-26 (3 948 lignes) et relus au navigateur ; 5 UAI vides absents de l'annuaire à l'API ; recette `err: 0 kpi: 7 graph: 3 carte: 3 cfg:0` ; Playwright port 3609 : infobulles août 1/37/77, 2025-09 = 667 en service, 2024-09 = 345 posés / 2 rendus ; capture `captures/recreation-2026-09-26/reprise.png` |
| | | | |
