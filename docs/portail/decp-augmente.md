# Données essentielles de la commande publique - données enrichies (DECP augmentées)

- **URL** : https://data.economie.gouv.fr/pages/visualisation-decp-augmente/
- **Producteur (badge catalogue)** : DAJ
- **Jeu** : `decp_augmente` — **994 123 lignes** (au 2026-09-09).
- **Relevé visuel** : 2026-09-09. Gabarit « catalogue » (fil d'Ariane, H1, encadré « Les jeux de données utilisés » → `decp_augmente`) puis une grande carte DSFR : badge « **994 123 enregistrements** », colonne de facettes à gauche (250 px), 4 graphiques à droite. Aucune carte géographique.

## Facettes (`ods-facets` automatique : toutes les facettes du jeu, 6 valeurs + « › Plus »)
- **source** : AWS-Achat 347 055 · API AIFE 284 714 · PES Marchés 245 179 · Dematis 71 276 · Megalis Bretagne 34 363 · Territoires numériques BFC 10 873 · (Plus : Grand Lyon 264).
- **formePrix** : Révisable 496 879 · Ferme 282 094 · Ferme et actualisable 196 281 · Ferme actualisable 28 · Non disponible 1.
- **nature** : MARCHE 599 071 · ACCORD-CADRE 349 117 · MARCHE SUBSEQUENT 41 412 · CONCESSION DE SERVICE 254 · MARCHE DE PARTENARIAT 191 · MARCHE HORS ACCORD CADRE 120 · Plus (DELEGATION DE SERVICE PUBLIC 119, CONCESSION DE SERVICE PUBLIC 93, CONCESSION DE TRAVAUX 22).
- **procedure** : Procédure adaptée 579 644 · Appel d offres ouvert 288 604 · Appel d'offres ouvert 50 443 (**doublon d'apostrophe**) · Marché négocié sans publicité ni mise en concurrence préalable 17 752 · Procédure avec négociation 5 748 · Procédure négociée avec mise en concurrence préalable 5 582 · Plus (19 valeurs au total, dont « NC » 7 et une valeur mal encodée « ProcÃ©dure adaptÃ©e » 1).
- **dateNotification** : facette **par année** (1990 : 1, 1997 : 1, 1999 : 2, 2001 : 5, 2002 : 21, 2003 : 4, Plus…) — tri par valeur, pas par effectif.
- **natureObjetMarche** : Travaux 405 866 · Services 348 369 · Fournitures 239 888.
- **nomAcheteur** : SCE DEPARTEMENTAL INCENDIE ET SECOURS 16 187 · VILLE DE PARIS 6 101 · CENTRE HOSPITALIER REGIONAL DE MARSEILLE 4 087 · Ministères sociaux 3 712 · DEPARTEMENT DE L ISERE 3 514 · COLLECTIVITE DE CORSE 3 472 · Plus.
Chaque valeur est cliquable ; le badge et les 4 graphiques suivent.

## Graphiques (contexte filtré, `function-y=COUNT`)
1. **Source des données collectées** (haut gauche) : barres verticales bleu nuit, X = `source` (7 valeurs), valeurs affichées au-dessus des barres (347 055, 284 714, 245 179, 71 276, 34 363, 10 873, 264), Y « Nombre » 0-400k.
2. **Répartition par nature de marché** (haut droite) : **anneau** (donut) sur `nature`, bleus pâle/moyen + vert, étiquettes externes : MARCHE, ACCORD-CADRE, MARCHE SUBSEQUENT, CONCESSION DE SERVICE, MARCHE DE PARTENARIAT (5 étiquettes visibles, les petites parts non étiquetées).
3. **Répartition des données collectées par type de procédure** (milieu, pleine largeur ≈ 500 px) : **barres horizontales** bleu clair, Y = `procedure` (19 valeurs, libellés tronqués), valeurs en bout de barre (579 644 … 1), axe 0-800k.
4. **Répartition des données collectées par nature de marché** (bas, pleine largeur) : barres verticales bleu nuit, X = `nature` (9 valeurs), valeurs au-dessus, Y 0-800k.
5. Un **cinquième graphique masqué** (`style="display:none"`) existe dans le source : « Répartition des données collectées par région (acheteur) », barres `#3a80ab` sur `libelleregionacheteur`. Invisible pour l'utilisateur : ne pas le compter comme donnée à reproduire, mais le mentionner.
Couleurs : barres `#1f2b50`, barres horizontales `#8EBBD8`, donut `range-Paired` ; tous en `sort=serie1-1` (décroissant), `maxpoints=0` (illimité).

## Données à reproduire fidèlement
- Le compteur et les 7 facettes avec leurs valeurs (y compris les doublons de libellés et la valeur mal encodée : à reproduire telles quelles ou à signaler, pas à corriger en silence).
- Les 4 agrégations `COUNT` par `source`, `nature` (×2 : donut + barres), `procedure`, toutes réactives aux facettes.
- Volume : 994 k lignes → tout doit être agrégé côté serveur.
