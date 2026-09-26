# Suivi — Capytale Analyse des usages

> Le journal de la transformation. Une ligne par intervention, la plus recente en haut.
> **Ce fichier n'est jamais ecrase par un script.**

| Date | Ce qui a change | Pourquoi | Verifie comment |
|---|---|---|---|
| 2026-09-26 | Page recreee en recit : croissance par annee scolaire (courbes 2024-2025 / 2025-2026), taux de visites pour 100 eleves du second degre (jointure DEPP rentree 2025), carte ponderee, part des visites rattachees, exploration. Classement en volume et « actions par visite » retires. | Le volume mesurait la taille des academies ; rapporte aux eleves, l'usage va de un a onze. Les actions par visite portent une rupture de mesure (fevr. 2026). | Chiffres rejoues a l'API (exports des 4 jeux, script scratchpad) ; recette `education/capytale-usages` : 0 erreur, 5 KPI, 0 erreur de config ; Playwright : survol de la courbe (nov. 554 425 / 676 265, conforme), capture `captures/recreation-2026-09-26/reprise.png`. |
