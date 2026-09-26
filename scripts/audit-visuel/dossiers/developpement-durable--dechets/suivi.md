# Suivi — D'où viennent les déchets

> Le journal de la transformation. Une ligne par intervention, la plus recente en haut.
> **Ce fichier n'est jamais ecrase par un script.**

| Date | Ce qui a change | Pourquoi | Verifie comment |
|---|---|---|---|
| 2026-09-26 | Création de la page (D7) : chapô et 4 KPI calculés ; secteurs regroupés en 8 familles ; 8 catégories de déchets (terres en évidence) ; 8 catégories des ménages + trois notions voisines ; traitement empilé par année ; carte DMA kg/hab + tableau avec taux de valorisation ; ce qu'on ne montre pas ; `#analyse`. Titre-message corrigé : « moins d'un sur dix » (9,1 %) ; histoire ajoutée : 49,6 % des déchets sont des terres ; « la décharge recule » nuancé par le transfert vers le remblayage | Première vague DD | Chiffres recalculés en Node sur les exports DiDo complets (`/json`, 2026-09-26) et identiques à l'affichage (chapô, KPI, phrases, ordre des barres lu dans les transformateurs) ; 0 cellule non numérique comptée dans les trois fichiers ; recette port 3812 `err: 0 kpi: 4 graph: 4 carte: 0 cfg:0` (carte indicative : rendu à la visibilité, vérifiée à la main) ; Playwright : défilement de chaque graphique, 0 erreur console, 20 avertissements #765 (AM-094) ; survol du graphique empilé 2022 = 154,2 / 56,6 / 21,4 / 59 / 3,8 Mt (conforme) ; carte : Guyane et Mayotte (absentes des données) peintes `rgb(92,104,229)` sans attribut `fill`, texte de la page corrigé en conséquence ; captures `captures/creation-2026-09-26/page.png`, `survol-g-trait.png`, `carte.png` |
