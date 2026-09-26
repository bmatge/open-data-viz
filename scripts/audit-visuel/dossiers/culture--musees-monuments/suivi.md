# Suivi — Musées de France dans un monument historique

> Le journal de la transformation. Une ligne par intervention, la plus recente en haut.
> **Ce fichier n'est jamais ecrase par un script.**

| Date | Ce qui a change | Pourquoi | Verifie comment |
|---|---|---|---|
| 2026-09-27 | Création de la page (fiche 13, vague 3) : chapô et 4 KPI calculés ; part en MH par tranche de fréquentation ; par région ; par domaine (`explode`) ; carte + facettes + liste ; ce qu'on ne montre pas (dont contrôle `Refmer`) ; `#analyse`. Titre corrigé : « 133 en Île-de-France » était le total francilien (65 en MH) ; histoire complétée par la jointure fréquentation (66,7 % des entrées, 56,1 % hors Louvre-Versailles) | Troisième vague Culture | Chiffres recalculés en pandas sur les deux exports Parquet et identiques à l'affichage (487, 40,0 %, 67 %, 56 %, 7/10, 32 %, 52,5 % BFC, 25,9 % PdL, 65/133 IdF, 397 arts déco 53 %, 278 techniques 34 %, 718 151 entrées hors calcul, 475/7 `Refmer`) ; recette `err: 0 kpi: 4 graph: 3 carte: 1 cfg:0` ; Playwright port 3838 : défilement de chaque graphique, 0 erreur console, avertissements #765 et « 1 ligne sans coordonnées » (dit en page) ; survol tranche 10 000-100 000 → 50,4 % ; facette « Dans un monument historique » → 487 musées, 487 marqueurs ; captures `captures/creation-2026-09-26/page.png`, `survol.png` |
