# Analyse metier — France Éducation international - Sélection de projets européens portant sur les données

> La lecture `dataviz-metier` : le sens avant la syntaxe.
> **Ce fichier n'est jamais ecrase par un script.** Les sorties du modele
> multimodal arrivent dans `constats/` ; ce qui est retenu se reecrit ici, a la main.

## L'histoire trouvée (recréation du 2026-09-26)

Rejoué à l'API (export v2.1, 44 lignes, jeu modifié le 2026-08-27, graphies fusionnées) :
24 projets européens, 20 initiatives nationales, 33 pays. **La France figure 11 fois, dont
7 initiatives nationales et 4 projets européens** — seul pays cité plus de deux fois dont la
majorité des entrées sont nationales (Finlande : 2 nationales, 0 européen). 7 des 20
initiatives nationales (35 %) sont françaises ; l'Allemagne en a 4. À l'inverse, 24 pays sur
33 n'apparaissent que par des consortiums européens, dont l'Espagne (12), le Portugal (9) et la
Grèce (8). La reproduction précédente comptait les pays sans distinguer le type
(« Allemagne 15, Italie 13, Espagne 12, France 11 ») et ne voyait pas cet écart.

Nuance 1 — les publics : 71 % des projets européens visent les enseignants (17/24), 13 % le
grand public (3/24) ; 50 % des initiatives nationales visent les enseignants (10/20), 40 % le
grand public (8/20). 23 des 24 projets européens sont financés par Erasmus+.

Nuance 2 — l'observateur : FEI, auteur du recensement, est un opérateur du ministère ; les 7
initiatives françaises sont des outils du ministère ou de ses opérateurs (plateforme
data.education, serveur MCP, tableau de bord du numérique éducatif, Pix, IH2EF, Futur Pro,
Challenge Wikidata). FEI coordonne en outre AIDL. Le déséquilibre dit au moins autant qui a
regardé que ce qui existe — formulé prudemment en page.

Angles écartés : classement des thèmes (la littératie domine par construction), nombre de pays
par projet européen (montage Erasmus+), carte (pas de géométrie européenne, AM-054).

## La question posee, et pour quel lecteur

Pour un lecteur curieux des politiques éducatives : comment les pays d'Europe s'engagent-ils
dans la littératie des données, et la France s'y distingue-t-elle ?

## La forme retenue, et pourquoi elle sert cette question

Barres horizontales empilées triées par total (33 pays), européen en gris, national en bleu
France (`color-map`) : le bleu se voit d'un coup d'œil sur la France. Puis barres groupées de
**parts** de projets par type (les deux groupes n'ont pas la même taille), le grand public en
bleu. Puis un tableau (7 lignes) pour la nuance sur l'observateur : un tableau bat le graphique.

## Honnetete de l'echelle

Axes à zéro. Les parts de publics sont des moyennes d'indicateurs 0/1 par projet (proportions),
pas des moyennes de taux ; un projet visant plusieurs publics, elles ne somment pas à 100 %
(dit en page). Un projet européen compte pour chacun de ses pays (dit en page).

## Phrase de lecture

Calculée (`dsfr-data-repeat`) : « La France y figure 11 fois, mais 7 de ces entrées sont des
initiatives nationales et 4 seulement des partenariats européens. » ; « Espagne : 12 projets,
tous européens. » ; « Initiatives nationales (20) : 50 % visent les enseignants, 55 % les
élèves, 40 % les citoyens et le grand public. »

## Ce qu'on ne montre pas, et qu'il faut dire

Sélection et non inventaire ; `pays` pris tel que déclaré (Agile EDU nomme un partenaire suédois
sans citer la Suède) ; graphies fusionnées ; pas de date exploitable (années dans le titre
seulement) ; pas de carte ; quatre colonnes de suivi interne écartées par `select` ; lien EVIDALI
sans schéma.

## Ecarts avec l'original

La carte d'Europe n'est pas reproduite (AM-054, AM-055). Le panneau maître-détail devient un
`<details>` par fiche. Les graphies en double ne sont plus exposées dans les facettes.
