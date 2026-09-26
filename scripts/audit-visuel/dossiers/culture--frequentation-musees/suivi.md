# Suivi — Fréquentation des musées de France

> Le journal de la transformation. Une ligne par intervention, la plus recente en haut.
> **Ce fichier n'est jamais ecrase par un script.**

| Date | Ce qui a change | Pourquoi | Verifie comment |
|---|---|---|---|
| 2026-09-26 | Création de la page (fiche 2, vague 1) : chapô et 4 KPI calculés ; top 15 par musée (Muséofile) avec Louvre et Versailles mis en évidence ; part des musées / part des entrées par tranche ; part par région ; indice base 100 en 2019 (Louvre, Versailles, autres) + périmètre constant ; exploration facettes + recherche + liste des sites ; ce qu'on ne montre pas ; `#analyse`. Titre-message confirmé (23,9 %) et complété : « quinze musées la moitié » ; nuance nouvelle : la reprise au-dessus de 2019 vient des autres musées (indice 112), pas du Louvre (91) | Première vague Culture | Tous les chiffres recalculés en pandas sur l'export Parquet complet (12 292 lignes) et identiques à l'affichage ; source `api-type="tabular" fetch-mode="export"` : 1 requête de métadonnées + 10 plages Parquet (pied puis 9 colonnes en parallèle), ≈ 200 Ko, ≈ 0,6 s par le tunnel SOCKS ; recette (copie scratchpad du script avec `bypass: 'localhost'` du proxy) `err: 0 kpi: 4 graph: 4 cfg:0`, 0 légende fausse ; Playwright port 3815 : défilement de chaque graphique, 0 erreur console, 9 avertissements #765 ; survol du point 2024 : 91,2 / 102,2 / 112,3 (conforme), en-tête « 2,024 » (BUG-024, DSFR Chart) ; facette Bretagne → 35 sites (conforme) ; captures `captures/creation-2026-09-26/page.png`, `survol.png` |
