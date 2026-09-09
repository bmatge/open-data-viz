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

Deux pages transverses : la synthèse des analyses sur [`/synthese`](public/synthese.html), et
le **registre des retours** sur [`/retours`](public/retours.html) — le relevé structuré, entrée
par entrée, de ce qu'il faut demander à ChartsBuilder et de ce qui ne dépend pas d'elle.

## Démarrer

```bash
npm start          # http://localhost:3000
npm run dev        # idem, avec --watch
```

Aucune dépendance : le serveur est un `node:http` de 80 lignes qui sert `public/`.
DSFR, DSFR Chart et `dsfr-data@0.20.0` sont chargés depuis jsDelivr — c'est
volontaire, l'argument à démontrer étant « une balise, un CDN, et ça marche ».

## Structure

Les couplages non-évidents (jointure du registre, ordre de chargement des scripts,
choix entre les deux mécanismes de filtrage) sont documentés dans
[`ARCHITECTURE.md`](ARCHITECTURE.md).

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
  data/retours.json       registre des retours (source de vérité)
  retours.html            le registre, rendu avec les composants qu'il évalue
scripts/
  build-registre.mjs      régénère public/data/registre.json depuis le catalogue vivant
  build-retours.mjs       dérive l'export d'issues + la note du vault depuis retours.json
export/
  issues-dsfr-data.md     demandes prêtes à déposer sur bmatge/dsfr-data (généré)
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

## Le registre des retours

`public/data/retours.json` est la source de vérité des constats. Une entrée par constat, typée :

| Type | Sens |
|---|---|
| `faux-probleme` | Je l'avais classé en limite ; la vérification a montré qu'une voie native existe |
| `bug` | Comportement incorrect de la bibliothèque |
| `amelioration` | Manque comblable → devient une issue |
| `limite-dure` | Ne dépend pas de ChartsBuilder (API du portail, qualité des données) |
| `avantage` | Ce que ChartsBuilder fait mieux que l'original |
| `piege` | Ça marche, mais on se trompe facilement |

**Règle** : chaque entrée porte un champ `verifie` décrivant l'observation qui l'établit —
requête émise, message de console, chiffres comparés. Sans lui, pas d'entrée.

**Règle de méthode**, la plus importante du dépôt : avant de classer quelque chose en limite,
se demander si l'obstacle vient de la bibliothèque ou d'avoir voulu *reproduire à l'identique*
le modèle d'Opendatasoft. Deux critiques sévères ont déjà été retirées pour cette raison.

```bash
node scripts/build-retours.mjs      # -> export/issues-dsfr-data.md + note du vault
```

## Avancement

Au 9 septembre 2026 — 26 visualisations au catalogue officiel :

- **15 entrées reproduites** (14 pages : le catalogue compte deux fois l'annuaire DGFiP) —
  [catalogue](public/index.html) · [DECP augmenté](public/viz/decp-augmente.html) ·
  [Plan de relance](public/viz/plan-de-relance.html) · [Qualité Tourisme](public/viz/qualite-tourisme.html) ·
  [Tourisme & Handicap](public/viz/tourisme-et-handicap.html) ·
  [Rebâtir Notre-Dame](public/viz/entreprises-restauration-notre-dame.html) ·
  [Comptabilité générale](public/viz/comptabilite-generale.html) ·
  [Prix des carburants](public/viz/prix-des-carburants.html) ·
  [Fiscalité locale](public/viz/fiscalite-locale.html) ·
  [Entreprises du patrimoine vivant](public/viz/entreprise-patrimoine-vivant.html) ·
  [Annuaire DGFiP](public/viz/annuaire-services-dgfip.html) ·
  [Baromètre France Num](public/viz/barometre-france-num.html) ·
  **[Signal Conso](public/viz/signalconso.html)** · **[Rappel Conso](public/viz/rappelconso.html)** ·
  **[Centres de contrôle technique](public/viz/centres-controle-technique.html)**
- **4 analyses détaillées** au lieu d'une reproduction —
  [Formations France Num](public/viz/formations-france-num.html) (jeu à zéro enregistrement) et
  [l'inventaire des entrées non reproduites](public/viz/non-reproduites.html)
- **6 entrées « hors périmètre » reproduites quand même** (lot 8) — leur lien sort du portail, mais
  leur donnée y est : [Fermeture du réseau cuivre](public/viz/fermeture-reseau-cuivre.html) ·
  [Aides de minimis](public/viz/aides-de-minimis.html) (page Studio) ·
  [Impôt sur le revenu](public/viz/impot-sur-le-revenu.html) ·
  [BOFiP](public/viz/bofip.html) · [Aide publique au développement](public/viz/aide-publique-developpement.html) ·
  [Prix des contrôles techniques](public/viz/prix-controle-technique.html)
- **3 renvois** vers des pages déjà reproduites (France Bleu et prix-carburants.gouv.fr → Prix des
  carburants ; Label EPV → Entreprises du patrimoine vivant)
- **1 analyse de plus** : [OFGL](public/viz/ofgl.html), un atelier de cartes sur des agrégats qui ne
  sont pas ceux du portail
- **1 seule entrée réellement hors périmètre** : la Charte Open Data, un document sans jeu de données
- **0 à reproduire**

Au total : **24 entrées reproduites, 5 analyses, 1 hors périmètre** sur 30.

**Lot 9 — mise à niveau face à l'audit visuel.** Un relevé indépendant du portail
(`docs/portail/`, 14 fiches lues au navigateur) a été confronté page par page aux reproductions.
Trois chiffres faux et deux mauvais jeux de données ont été trouvés et corrigés ; douze pages ont été
enrichies ; chaque analyse porte un bloc « Relecture face au relevé visuel du portail » qui dit ce qui a
été ajouté et ce qui manque encore. Le registre passe à 114 constats, dont 9 faux problèmes.

Les trois reconstitutions du lot 6 (Signal Conso, Rappel Conso, contrôle technique) ont une page
officielle en 404 et un identifiant de jeu périmé, mais la donnée existe toujours — parfois mise à
jour le jour même — sous un autre nom. Rappel Conso a en plus une variante fidèle à sa page vivante,
retrouvée sous un nouveau slug.

## Ce que le banc d'essai a trouvé jusqu'ici

Résumé — le détail est dans l'analyse en pied de chaque page et sur `/synthese`.

**Ça marche, et c'est plus court.** Zéro ligne de JavaScript applicatif sur les trois
pages traitées. 7 900 caractères de template AngularJS pour le catalogue d'origine
contre une quinzaine de lignes de balises ; `ods-chart` + `ods-chart-query` +
`ods-chart-serie` réduits à un `dsfr-data-chart`.

**Trois gains nets** : l'accessibilité (`dsfr-data-a11y` pose le tableau de données
équivalent sous chaque graphique — l'original n'a rien), les fonds de carte IGN
souverains là où le portail utilise Jawg, et l'habillage éditorial natif (`databox-*`).

**Un écart réel, et plus étroit qu'il n'y paraissait** : `dsfr-data-facets server-facets`
fait bien l'équivalent d'`ods-facets` — valeurs et compteurs lus sur l'endpoint `/facets`
d'Opendatasoft, y compris au-dessus d'une source agrégée, avec recalcul contextuel. Ce qui
manque est un point d'assemblage : un jeu de facettes ne pilote qu'une source, donc un
tableau de bord bâti sur plusieurs agrégations doit encore écrire ses valeurs à la main.

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
