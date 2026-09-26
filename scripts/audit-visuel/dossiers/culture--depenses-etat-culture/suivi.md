# Suivi — Les dépenses de l'État pour la culture

> Le journal de la transformation. Une ligne par intervention, la plus recente en haut.
> **Ce fichier n'est jamais ecrase par un script.**

| Date | Ce qui a change | Pourquoi | Verifie comment |
|---|---|---|---|
| 2026-09-26 | Création de la page (fiche 3, vague 1) : chapô et 3 KPI calculés ; top 10 en M€ (Paris mis en évidence) ; top 15 hors Paris par habitant, fonctionnement/investissement empilés ; État 2019 × conseil départemental 2023 par tranche ; carte hors Paris (Corse dupliquée 2A/2B) + tableau des 100 lignes ; ce qu'on ne montre pas ; `#analyse`. Titre-message recentré sur la concentration (56 % à Paris) ; 801 € / 5 € confirmés | Première vague Culture | Les deux jeux lus en entier à l'API Tabular (tunnel SOCKS) et recalculés en Python : tous les chiffres identiques à l'affichage (56 %, 3,3 %, 801/676, 21 € et 20,78 au résumé de carte, 46 €, 60/100, 5 €, 20 fois, 66 %, 49 %, Meuse 110/90 %, 94 appariés, 8,5/15,4/30,2 vs 18,0/18,8/16,2) ; unicité de `code_insee` côté droit (95/95) ; recette (copie locale avec `bypass` localhost du proxy) `err: 0 kpi: 3 graph: 3 cfg:0`, 0 légende fausse ; Playwright port 3816 : défilement de chaque graphique, 0 erreur console, 7 avertissements #765 + 1 avertissement de jointure (5 clés orphelines attendues) ; survol du graphique empilé : Haute-Vienne 68 / 8 €/hab. (conforme) ; capture `captures/creation-2026-09-26/page.png` |
