# open-data-viz

**Le catalogue de visualisations de [data.economie.gouv.fr](https://data.economie.gouv.fr/pages/catalogue-visualisations/),
rejoué avec [`dsfr-data`](https://github.com/bmatge/dsfr-data) (ChartsBuilder).**

Ce dépôt est un **banc d'essai**, pas un produit. Il répond à une question :

> Ce que le portail produit avec Opendatasoft / Huwise est-il réalisable facilement
> avec ChartsBuilder et les composants web `dsfr-data` ?

La méthode : reproduire la page catalogue, puis chaque dataviz du catalogue dans une
page dédiée, sur **les mêmes jeux de données lus en direct** sur l'API Opendatasoft du
portail. Chaque page se termine par une **analyse de reproduction** — ce qui a été
simple, ce qui a coincé, un tableau de correspondance directive ODS → composant
`dsfr-data`, et un verdict. Quand une dataviz n'est pas reproductible (page ou jeu de
données disparu, cible hors portail), elle reçoit une analyse détaillée à la place.

La synthèse transverse vit sur [`/synthese`](public/synthese.html).

## Démarrer

```bash
npm start          # http://localhost:3000
npm run dev        # idem, avec --watch
```

Aucune dépendance : le serveur est un `node:http` de 80 lignes qui sert `public/`.
DSFR, DSFR Chart et `dsfr-data@0.20.0` sont chargés depuis jsDelivr — c'est
volontaire, l'argument à démontrer étant « une balise, un CDN, et ça marche ».

## Structure

```
public/
  index.html              reproduction de la page catalogue (+ son analyse)
  synthese.html           synthèse transverse des analyses
  viz/<slug>.html         une page par dataviz reproduite
  data/registre.json      état de reproduction, joint au catalogue ODS
  assets/
    cles.js               clé de lecture publique de l'API ODS du portail
    layout.js             en-tête et pied de page DSFR communs
    site.css              habillage minimal par-dessus le DSFR
scripts/
  build-registre.mjs      régénère public/data/registre.json depuis le catalogue vivant
server.js                 serveur statique zéro-dépendance
```

## Le registre de reproduction

`public/data/registre.json` porte, pour chaque entrée du catalogue officiel, son état :

| Statut | Sens |
|---|---|
| `reproduite` | une page de ce dépôt rejoue la dataviz |
| `a-faire` | reproductible, pas encore traitée |
| `analyse` | non reproduite, analyse détaillée à la place |
| `hors-perimetre` | la cible n'est pas une page de dataviz du portail |
| `impossible` | page cible et/ou jeu de données disparus |

Il est joint au catalogue vivant par `<dsfr-data-join on="titre">` : les cartes de la
page d'accueil viennent du portail, les badges d'avancement viennent d'ici.

Pour le régénérer après avoir traité une dataviz : éditer la table `STATUTS` de
`scripts/build-registre.mjs`, puis `node scripts/build-registre.mjs`.

## Avancement

Au 9 septembre 2026 — 26 visualisations au catalogue officiel :

- **2 reproduites** — [catalogue](public/index.html) ·
  [DECP augmenté](public/viz/decp-augmente.html) ·
  [Plan de relance](public/viz/plan-de-relance.html)
- **11 à reproduire**
- **8 hors périmètre** (liens sortants vers d'autres sites de l'État)
- **5 sources disparues** (page 404 et/ou jeu de données supprimé)

## Ce que le banc d'essai a trouvé jusqu'ici

Résumé — le détail est dans l'analyse en pied de chaque page et sur `/synthese`.

**Ça marche, et c'est plus court.** Zéro ligne de JavaScript applicatif sur les trois
pages traitées. 7 900 caractères de template AngularJS pour le catalogue d'origine
contre une quinzaine de lignes de balises ; `ods-chart` + `ods-chart-query` +
`ods-chart-serie` réduits à un `dsfr-data-chart`.

**Trois gains nets** : l'accessibilité (`dsfr-data-a11y` pose le tableau de données
équivalent sous chaque graphique — l'original n'a rien), les fonds de carte IGN
souverains là où le portail utilise Jawg, et l'habillage éditorial natif (`databox-*`).

**Un écart réel** : `ods-facets` construit la barre de filtres à partir des métadonnées
du jeu de données, sans configuration. `dsfr-data` n'a pas d'équivalent quand la source
ne renvoie que des agrégats — il faut alors écrire les valeurs de filtre à la main.

**Des pièges silencieux**, plus dangereux que difficiles : le plafond `max-records`
(1 000 par défaut) qui tronque sans rien dire, la clé d'API en en-tête `apikey` refusée
par la préflight CORS d'Opendatasoft, `fit-bounds` sans `max-bounds` qui étire la carte
jusqu'au Pacifique.

**Et l'état du catalogue d'origine** : 5 pages en 404, 6 jeux de données référencés
disparus (dont un qui rend une dataviz vide en production), le jeu de DECP marqué
« déprécié » sous une visualisation « incontournable ».

## Sources

- Catalogue : jeu de données `interne-contenus-catalogue-visualisations` sur
  data.economie.gouv.fr, API Explore v2.1.
- La clé d'API utilisée est **publique** : le portail l'expose lui-même en clair dans le
  source HTML de ses pages (`ctx-apikey`). Elle est en lecture seule sur les jeux publics.

## Licence

Code sous licence MIT. Contenus rédactionnels sous
[licence Ouverte 2.0](https://github.com/etalab/licence-ouverte/blob/master/LO.md).
Les données restent la propriété de leurs producteurs (DGE, DGFiP, DGCCRF, DAJ…).
