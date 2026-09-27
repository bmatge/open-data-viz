# Suivi — Portrait de territoire

> Le journal de la transformation. Une ligne par intervention, la plus recente en haut.
> **Ce fichier n'est jamais ecrase par un script.**

| Date | Ce qui a change | Pourquoi | Verifie comment |
|---|---|---|---|
| 2026-09-27 | Recréation en récit : « le rang d'un département dit d'abord sa densité » ; portrait = écart à la France **et à l'attendu à densité égale**, rang, spécialisation par famille ; tableau des 101 départements, carte paresseuse. Une maille (département), paramètre d'URL `dep_nom` conservé. 2 requêtes au chargement (avant 12), 1 par changement (avant 13). | Brief de recréation (lot 2) : page la plus lourde, un inventaire de 40 indicateurs sans question. | Chiffres rejoués à l'API (tunnel VPS) : France 333 695 / 68 029 342 / 49,05 ; Gironde 36,4 / 46,2 / 81e ; Paris 13,6 / 25,9 / 101e ; Hautes-Alpes 264,9 / 64,0 / 1er. Playwright : 4 départements + changement au `<select>`, survol (« Nord 33,2 pour 10 000 hab. »), 0 erreur, 11 avertissements #765. Recette : err 0. Capture `captures/recreation-2026-09-26/reprise.png`. |
