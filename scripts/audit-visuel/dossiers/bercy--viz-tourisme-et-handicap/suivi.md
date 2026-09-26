# Suivi — Label Tourisme & Handicap

> Le journal de la transformation. Une ligne par intervention, la plus recente en haut.
> **Ce fichier n'est jamais ecrase par un script.**

| Date | Ce qui a change | Pourquoi | Verifie comment |
|---|---|---|---|
| 2026-09-26 | Recréation en récit : titre-message (le label suit ses relais locaux), chapeau et phrases calculés, 4 KPI, régions + premier département (concat), top 20 départements, parts par handicap, top 10 activités, encadré « ce qu'on ne montre pas » ; annuaire (recherche, facettes, carte, grille) conservé en exploration ; podium retiré | L'ancienne page lisait la concentration au niveau régional (« d'abord en Nouvelle-Aquitaine ») alors qu'elle tient à un département ; aucune phrase ne disait pour quels handicaps le label est attribué | Chiffres rejoués sur l'export (3 708 lignes) ; recette `viz/tourisme-et-handicap` err 0, 4 KPI, 4 graphiques, 6 cartes ; Playwright 0 erreur console (avertissements #765 et 108 lignes sans coordonnées attendus), survol du graphique régions ; capture `captures/recreation-2026-09-26/reprise.png` |
