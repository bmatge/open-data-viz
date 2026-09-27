# Suivi — Portrait de fédération — Licences et clubs

> Le journal de la transformation. Une ligne par intervention, la plus recente en haut.
> **Ce fichier n'est jamais ecrase par un script.**

| Date | Ce qui a change | Pourquoi | Verifie comment |
|---|---|---|---|
| 2026-09-27 | **Recréation en récit** de `public/sports/portrait-federation.html` : titre et chapeau calculés (rang de la fédération dans son groupe sur part des femmes, évolution 2019-2024, âge médian ; l'indicateur le plus extrême fait le titre), 3 petits multiples de pairs triés avec la fédération en couleur, base 100, carte d'un taux + tableau, fiche du ministère. 3 requêtes au chargement (28 avant), 5 après défilement. | Brief de recréation : la page était une fiche de cinq onglets, sans message. | Playwright via tunnel SOCKS (0.42.0) : fédérations 101, 111, 132, 260, 263, 426, 501, 604 ; rangs recalculés à l'API (101 : 7/38, 30/38, 12/38) ; recette `err: 0`, `legendesFausses: []` ; survol barre « FF d'Athlétisme 48 % » ; captures `captures/recreation-2026-09-26/`. |
