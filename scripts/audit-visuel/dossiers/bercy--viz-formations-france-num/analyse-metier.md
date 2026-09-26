# Analyse metier — Calendrier des formations France Num

> La lecture `dataviz-metier` : le sens avant la syntaxe.
> **Ce fichier n'est jamais ecrase par un script.**

Relecture du 2026-09-26. Page d'**analyse** (dataviz non reproductible) : rien n'est recréé.

## L'histoire trouvée

**Il n'y en a pas dans la donnée : le jeu est vide.** Au 2026-09-26, `donnees-sessions-formations-france-num`
publie 23 colonnes, 8 facettes (toutes à zéro valeur), `total_count` 0, un export CSV réduit à l'en-tête.
Métadonnées `modified` 2026-01-26, `data_processed` 2025-07-01. Le seul fait nouveau est au portail :
`/pages/formations-france-num/` répondait 200 le 2026-09-09, 404 le 2026-09-19 et le 2026-09-26.

Recherche d'un jeu successeur au catalogue (`search("france num")`, 45 jeux) : baromètre, bénéficiaires
des dispositifs, lauréats du plan de relance — aucun calendrier de sessions.

## La question posee, et pour quel lecteur

Celle qu'une recréation aurait posée : « quelle formation, près de chez moi, bientôt ? ». Sans une
ligne, on ne peut y répondre sans inventer.

## La forme retenue

Titre-message (« toujours vide »), chapeau daté, un **témoin vivant** (source + `dsfr-data-display`
sans filtre, message `empty` qui dit que c'est la source qui est vide), un tableau avant/après des
deux relevés (09-09 / 09-26). Aucun graphique : il n'y a rien à tracer.

## Honnêteté, ce qu'on ne montre pas

Aucun chiffre sur les formations : aucun n'est publié. Les autres jeux France Num ne remplacent pas
le calendrier et ne sont pas utilisés. Le relevé « 22 colonnes » du 09-09 est rapporté tel quel ; 23
au 09-26 (changement de schéma ou erreur de relevé : non tranchable).

## Phrase de lecture

Le bloc témoin : « Aucune session publiée par le jeu — aucun filtre n'est appliqué ici : c'est la
source qui est vide. » Calculée à chaque chargement ; si le jeu reprend vie, il liste les sessions.
