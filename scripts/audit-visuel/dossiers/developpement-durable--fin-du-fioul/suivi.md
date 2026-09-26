# Suivi — La fin du fioul

> Le journal de la transformation. Une ligne par intervention, la plus recente en haut.
> **Ce fichier n'est jamais ecrase par un script.**

| Date | Ce qui a change | Pourquoi | Verifie comment |
|---|---|---|---|
| 2026-09-26 | Création de la page (D6) : chapô et 3 KPI calculés ; FOD + GNR par année ; variation par produit depuis 2012 ; part du gaz dans les maisons neuves (RE2020) et six modes empilés ; prix mensuel du fioul ; carte + facette région + tableau départemental ; ce qu'on ne montre pas ; `#analyse`. Titre-message corrigé : « deux fois moins qu'en 2012 » au lieu de « quatre fois moins qu'en 2005 » (rupture GNR) ; gaz 13,4 % → 0,2 % au lieu de 17,3 → 2,0 | Première vague DD | Tous les chiffres recalculés en Python sur les exports DiDo complets (`/json`, millésimes du 2026-09-26) et identiques à l'affichage ; notice méthodologique EPTB lue (exhaustivité 2010, XX = DROM) ; recette (copie locale du script avec `public/developpement-durable`) `err: 0 kpi: 3 graph: 5 cfg:0`, 0 légende fausse ; Playwright port 3803 : défilement de chaque graphique, 0 erreur console, 8 avertissements #765 ; survol du graphique empilé : infobulle 2023 = 65,5 / 13 / 14 / 3,1 / 0,3 / 2,5 % (conforme) ; captures `captures/creation-2026-09-26/page.png` |
