# Challenge Wikidata en classe (2025)

- **URL** : https://data.education.gouv.fr/pages/wikidata-en-classe/
- **Catalogue** : id **18**, thématique **Éducation**, sous-thématique *(vide)*, filtre *(vide)*.
  Description du catalogue : « Les 12 et 13 mars à l'Edulab Pasteur, à Rennes, la Délégation
  régionale académique au numérique éducatif a organisé la finale du challenge
  « Wikidata en classe ». » Vignette `/assets/theme_image/challenge-wikidata.jpg`.
- **Jeu(x) de données utilisé(s) par la page** : **aucun**. Pas de `ods-dataset-context`,
  pas de `ctx-apikey`, aucune directive `ods-*` dans le template, **aucune requête vers
  `/api/`** au chargement (97 requêtes relevées, cf. « Preuve »).
- **Relevé visuel** : 2026-09-10, Chrome, fenêtre 1568 × 751, conteneur `.ods-box` à 1420 px.

## Ce que la page est réellement

Une **page éditoriale de compte rendu d'événement** : un titre, un chapô de trois lignes,
cinq blocs « image à gauche / titre-lien + résumé à droite », une phrase de clôture.
Rien d'autre. Le H2 de titre est stylé en dur à 50 px (`style="color:#755348; font-size:50px"`),
il n'y a **aucun H1 dans la page** (le seul `<h1>` du document est celui du widget de chat
`semantics-chat.wikit.ai`, « Fenêtre de chat »).

### Relevé bloc par bloc, dans l'ordre

| # | Bloc | Contenu relevé à l'écran |
|---|---|---|
| 1 | Titre | H2 « Challenge Wikidata en classe », brun `#755348`, 50 px |
| 2 | Chapô | « Les 12 et 13 mars à l'Edulab Pasteur, à Rennes, la Délégation régionale académique au numérique éducatif a organisé la finale du challenge « Wikidata en classe », 27 élèves venus de 5 classes des lycées Chaptal et Brizeux à Quimper (29), Jean Brito à Bain-de-Bretagne (35) et Chateaubriand à Combourg (35) étaient présents (**plus d'informations sur le site de l'académie**). » |
| 3 | Amorce | « Les 5 projets retenus par le jury Wikidata en classe : » en gras |
| 4 | 5 rangs projet | image 330 px + H2-lien vers `porte-plume.app` + un paragraphe de résumé |
| 5 | Clôture | « Les 5 projets ont été récompensés à la fin de la journée. Félicitations à tous les élèves pour leur travail ! » |

### Les cinq projets, tels qu'affichés

| Titre affiché sur le portail | Résumé | Lien | Vignette (naturel → rendu) |
|---|---|---|---|
| La place des femmes dans l'enseignement. | « Investiguer la place des femmes dans l'enseignement en Bretagne… » | `porte-plume.app/projet/cc95889b-3af5-4b09-9ac9-07a8e9ba8401/blog/billet/les-femmes-dans-lenseignement-en-bretagne` | `wikidata4.png` 1340 × 682 → 330 × 168 |
| Les peintres bretonnes oubliées. | « Mettre en évidence les peintres bretonnes oubliées, telles Marguerite Le Moine, Jeanne Malivel… » | `…/challenge-wikidata-en-classe/blog/billet/les-femmes-peintres-bretonnes` | `wikidata2.jpg` 1600 × 1181 → 330 × 243 |
| L'espace public modèle nos imaginaires. | « Comment mieux mettre en valeur notre matrimoine dans l'espace public… » | `…/blog/billet/b69566ea-713d-44d0-845c-3501d5bb5ff2` | `wikidata5.PNG` 737 × 555 → 330 × 248 |
| Les conteuses bretonnes. | « Comment ont-elles influencé la transmission des récits folkloriques jusqu'à nos jours ? » | `…/blog/billet/les-conteuses-bretonnes` | `wikidata3.jpg` 1280 × 853 → 330 × 220 |
| Le groupe Marceau : message d'égalité et d'espoir. | « Un projet de recherche autour de 5 jeunes filles du lycée Brizeux… » | `…/blog/billet/challenge-wikidata-les-resistantes-bretonnes` | `wikidata1.png` 1554 × 1440 → 330 × 280 |

**Les six liens sortants ont été testés en curl** : les cinq `porte-plume.app` répondent 200,
le lien académique `https://www.ac-rennes.fr/challenge-wikidata-en-classe-2025-125387`
répond **403** en curl (protection anti-robot probable ; non vérifié au navigateur).

Détail du rendu : `wikidata5.PNG` (projet « L'espace public ») est **une capture d'écran de
carte** — fond de plan clair de l'agglomération rennaise semé de points bleus et orange.
C'est l'image la plus proche d'une dataviz de toute la page, et c'est un PNG.

## Preuve : il n'y a pas de dataviz cachée

Le constat ne vient pas de la lecture du template mais de trois mesures faites dans l'onglet.

1. **Réseau.** 97 requêtes au chargement complet, **aucune vers `/api/`** — ni
   `explore/v2.1`, ni `records/1.0`, ni `/facets`. Les seules requêtes de contenu sont les
   cinq images `theme_image/wikidata*.png|jpg` ; le seul tiers est
   `semantics-chat.wikit.ai/chat-embed.js` (la bulle de chat en bas à droite, posée par le
   thème du portail, pas par la page). Tout le reste est le bundle AngularJS/React du portail.
2. **DOM.** Dans `.ods-box` : `0` `<iframe>`, `0` `<canvas>`, `0` `<svg>`, `0` élément dont le
   nom de balise commence par `ods-`. L'inventaire complet des balises est
   `h2, div, a, br, p, img` — six noms de balise, dont aucun n'est un composant.
3. **Console.** Aucun message.

Il n'y a donc **ni graphique, ni carte, ni tableau, ni filtre, ni KPI, ni compteur**.

## Et derrière les liens ? Les billets `porte-plume`

Vérifié sur le billet « Les Femmes dans l'enseignement en Bretagne » (`porte-plume.app`
redirige vers `porte-plume.suite.studio`, même contenu). Le billet, lui, **contient des
représentations de données** — mais **toutes en images matricielles** :

- « INSEE. Part des femmes dans l'enseignement en premier degré, par régions » (image) ;
- « … par département » (image) ;
- « SPARQL : Lieu de naissance des femmes liées à l'enseignement en Bretagne » (capture de la
  carte de résultats du *Wikidata Query Service*) ;
- « Évolution de la place des femmes dans l'enseignement en Bretagne. Source : Insee »
  (« diagramme en rectangle » d'après le texte des élèves) ;
- un tableau de trois lignes (NOM / Prénom / Lieu / Profession / Dates), saisi à la main
  en HTML dans le billet.

`find` sur le DOM du billet ne renvoie que des éléments de type `image` : **aucun `iframe`,
aucun graphique vivant**. Le dispositif pédagogique produit donc bien de la donnée et de la
visualisation, mais **sous forme de captures d'écran**, sur une plateforme tierce
(`porte-plume`, Académie de Rennes, Next.js) qui n'expose ni jeu ni API.

Conséquence pour le banc d'essai : il n'y a **rien à reproduire** — ni sur la page, ni
derrière ses liens. Le contenu source n'est pas de la donnée, ce sont des PNG.

## Pourquoi cette page figure au catalogue des data-visualisations

Le catalogue `dataviz-a-la-une` (36 lignes, 8 champs : `id, thematique, sous_thematique,
filtre, titre, description, image, lien`) **ne contient aucun champ qui dise ce qu'est
l'objet pointé**. Un `lien` suffit à entrer ; rien ne distingue une carte Opendatasoft d'un
billet de blog. C'est un **catalogue de liens éditorialisés**, pas un catalogue de
visualisations, et son nom (« Data-visualisations », H1 de la page `/pages/dataviz-list/`)
promet plus que ce que son modèle de données sait tenir.

Le motif de la présence est lisible : la page **parle** de données ouvertes, de SPARQL et de
Wikidata. Elle relève de la rubrique « ce que la communauté éducative fait avec la donnée »,
pas de « bibliothèque de visualisations ». C'est un **défaut de rangement du catalogue**, pas
un défaut de la page : le compte rendu de challenge est un contenu légitime, mal étiqueté.

**Arithmétique du catalogue, pour le banc d'essai** : le catalogue annonce **36 entrées**.
Trois d'entre elles (ids **18**, **3** et **15** — les deux Wikidata et le Challenge de la
Data) ne contiennent **aucune** représentation de données, mesuré au navigateur.
**Le catalogue plafonne donc à 33 dataviz réelles**, avant même l'examen des 33 autres
entrées (dont **8** pointent hors du portail : `equipements.sports.gouv.fr` ×3,
`dataeducation.opendatasoft.com` ×3, `dataeducation.huwise.com`,
`educajou.forge.apps.education.fr`). L'écart « 36 annoncées / 33 au mieux » est un constat
transverse à reporter à la synthèse.

## Défauts et bizarreries de l'original

1. **Aucun H1.** Le titre de la page est un `<h2>` grossi en CSS en ligne à 50 px. Le seul
   `<h1>` du document appartient au widget de chat tiers. Défaut d'accessibilité, commun aux
   trois pages éditoriales du catalogue.
2. **Les cinq images n'ont aucun `alt`** (`imgSansAlt` = 5 sur 5). Deux d'entre elles portent
   pourtant de l'information — la capture de carte du projet « L'espace public », et la
   photographie du groupe Marceau. Non-conformité RGAA franche, sur une page hébergée par un
   portail d'État.
3. **Le CSS est celui du tutoriel W3Schools « two unequal columns », commentaire compris** :
   ```css
   .column { float: left; padding: 10px; height: 300px; /* Should be removed. Only for demonstration */ }
   ```
   Le `height: 300px` **n'a pas été retiré**. Mesuré à l'écran : les dix `.column` de la page
   font toutes exactement `300 px` de haut, quelle que soit la hauteur de leur image ou de
   leur texte. La mise en page ne s'adapte donc à rien ; les rangs ne tiennent que par les
   `<br/><br/>` intercalés à la main entre les blocs (et il en manque un entre les rangs 1
   et 2). Le même bloc CSS, au caractère près, se retrouve sur `challenge-data-2025`.
4. **Pas de media query.** `.left { width: 25% }` / `.right { width: 75% }` en dur, flottants,
   hauteur fixe : à 400 px de large la vignette tombe à ~85 px. Le gabarit 2026 corrige ce
   point (flexbox + `@media (max-width: 768px)`), pas celui-ci.
5. **Deux formes d'URL pour la même chose.** Le premier projet pointe vers
   `projet/cc95889b-3af5-4b09-9ac9-07a8e9ba8401/…`, les quatre autres vers
   `projet/challenge-wikidata-en-classe/…`. Les deux redirigent vers le même billet : trace
   d'un copier-coller depuis l'interface de rédaction avant que le slug de projet existe.
6. **Les titres affichés ne sont pas ceux des billets.** Le portail annonce « La place des
   femmes dans l'enseignement. » ; le billet s'intitule « Les Femmes dans l'enseignement en
   Bretagne - 203 - Bain-de-Bretagne ». Le lecteur qui suit le lien ne retrouve pas
   l'intitulé sur lequel il a cliqué.
7. **Rien n'indique que les liens sortent du portail** : pas de `target`, pas de `rel`, pas
   d'icône de lien externe visible à 1568 px. Les cinq titres de projet quittent
   `data.education.gouv.fr` sans prévenir.
8. **Une année sans millésime.** Le titre est « Challenge Wikidata en classe », sans « 2025 ».
   Depuis la publication de la page 2026 (id 3), le catalogue affiche deux cartes dont l'une
   n'est datée que par sa description. Pire, le catalogue trie par `-id` (lu dans
   `_sources/_dataviz-list.html` : `ctx.parameters['sort']='-id'`), et l'édition **2026 porte
   l'id 3** contre **18** pour 2025 : **l'édition la plus récente est affichée après
   l'ancienne**, en 34ᵉ position sur 36.
9. **Le lien académique répond 403** en accès direct (curl). Le seul lien de la page qui
   documente l'événement lui-même est aussi le seul qui ne réponde pas 200.

## Ce que `dsfr-data` a à voir là-dedans

**Franchement : rien, sur le fond.** Il n'y a pas de donnée à représenter, donc pas de
transposition de dataviz à écrire. Écrire un « équivalent `dsfr-data` » de cette page serait
exactement le faux problème que le dépôt s'est engagé à ne plus produire.

**Mais il y a une chose à dire sur la forme**, et elle est vérifiable : la page **est** une
galerie de cartes, et le portail sait déjà faire cette galerie **pilotée par un jeu de
données** — c'est littéralement ce que fait la page catalogue elle-même
(`_sources/_dataviz-list.html`, jeu `dataviz-a-la-une`, `ods-results` + `fr-card`). La page
2025 fait la même chose **en dur**, dans un template HTML de 4 958 caractères, avec du CSS
W3Schools. Les deux gestes coexistent sur le même portail.

Le composant `dsfr-data` correspondant n'est ni `dsfr-data-list` (c'est un **tableau** :
recherche, tri, pagination, export) ni un hypothétique `dsfr-data-cards` (**il n'existe
pas** — vérifié à `list_skills`, les 30 skills ne comportent aucune entrée de ce nom) :
c'est **`dsfr-data-display`**, dont la fiche dit « Affichage dynamique de données via
template HTML (cartes, tuiles, listes) ».

### Correspondance

| Sur la page 2025 | `dsfr-data` | Attributs vérifiés |
|---|---|---|
| 5 blocs `.row > .column.left img + .column.right h2>a + p` écrits à la main | `<dsfr-data-display>` + `<template>` | `source`, `cols="1"` (une carte par rang, comme l'original), `gap`, `empty`. `pagination="0"` = tout afficher (défaut). |
| L'image, le titre, le lien, le résumé | placeholders du `<template>` | `{{titre}}`, `{{resume}}`, `{{image:url}}`, `{{lien:url}}` — le filtre `:url` **existe** (`packages/core/src/utils/template-expression.ts`, `SAFE_URL_SCHEMES = ['http:','https:','mailto:','tel:']`) et la fiche impose de l'employer « dans tout `href` ». |
| Le lien académique, présent une seule fois | bloc conditionnel | `{{#if lien_academie}}…{{/if}}` — blocs `#if` / `#unless` disponibles, **non imbriquables** (guide de `dsfrDataDisplay`). C'est la voie native qui remplace la recette CSS `a[href=""]{display:none}` (AM-039). |
| — (absent de l'original) | `alt` d'image | `alt="{{alt_image}}"` : la donnée porte l'alternative textuelle, ce que le HTML en dur n'a pas fait cinq fois de suite. |
| Le jeu de données qui n'existe pas | `<dsfr-data-source>` | soit un jeu ODS à créer (5 lignes, comme `fr-en-challenge-data` en a 3), soit **`data="[…]"`** — attribut « Données JSON inline (pas de fetch) » de la référence de `dsfr-data-source`. |

### Esquisse

```html
<!-- Deux voies. (a) Un jeu ODS de 5 lignes, à créer au back-office comme
     l'a été fr-en-challenge-data ; (b) le JSON inline ci-dessous, si l'on
     ne veut pas d'un jeu pour cinq lignes. La bascule (b) -> (a) ne change
     qu'une balise : le <template> et tout l'aval sont identiques. -->
<dsfr-data-source id="projets" data='[
  {"titre":"La place des femmes dans l’enseignement",
   "resume":"Investiguer la place des femmes dans l’enseignement en Bretagne…",
   "lien":"https://porte-plume.app/projet/challenge-wikidata-en-classe/blog/billet/les-femmes-dans-lenseignement-en-bretagne",
   "image":"/assets/theme_image/wikidata4.png",
   "alt":"Jean Geoffroy, « En classe, le travail des petits », huile sur toile, 1889",
   "etablissement":"Lycée Jean Brito, Bain-de-Bretagne (35)"}
]'></dsfr-data-source>

<div class="fr-container fr-my-6w">
  <h1>Challenge « Wikidata en classe » — édition 2025</h1>
  <p class="fr-text--lead">
    Les 12 et 13 mars 2025 à l’Edulab Pasteur (Rennes), la DRANE de Bretagne a organisé la
    finale du challenge « Wikidata en classe » : 27 élèves, 5 classes, 4 lycées.
  </p>

  <dsfr-data-display source="projets" cols="1">
    <template>
      <div class="fr-card fr-card--horizontal fr-enlarge-link">
        <div class="fr-card__body"><div class="fr-card__content">
          <h2 class="fr-card__title"><a href="{{lien:url}}">{{titre}}</a></h2>
          <p class="fr-card__desc">{{resume}}</p>
          {{#if etablissement}}
            <div class="fr-card__end"><p class="fr-card__detail">{{etablissement}}</p></div>
          {{/if}}
        </div></div>
        <div class="fr-card__header"><div class="fr-card__img">
          <img class="fr-responsive-img" src="{{image:url}}" alt="{{alt}}">
        </div></div>
      </div>
    </template>
  </dsfr-data-display>
</div>
```

Ce que la bascule apporte, concrètement, et **rien de plus** : un H1, des `alt` portés par la
donnée, `fr-card--horizontal` responsive à la place du `float` + `height:300px`,
l'ajout d'un sixième projet sans toucher au HTML. Ce sont des gains de gabarit et
d'accessibilité — **pas** une dataviz. Il faut le dire dans ces termes : ce n'est pas
`dsfr-data` qui rendrait cette page pertinente au catalogue des visualisations.

### Ce que le banc d'essai en retient vraiment

Que **la page catalogue et la page de contenu ont exactement la même forme** — une grille de
cartes DSFR image + titre + résumé + lien — et que l'une est pilotée par un jeu tandis que
l'autre est écrite à la main avec le CSS d'un tutoriel. Le même portail, le même mois. C'est
un constat sur la gouvernance éditoriale d'un portail Opendatasoft, pas sur une bibliothèque
de composants.

## Statut proposé pour le registre

**`hors-perimetre`**, motif : *page éditoriale sans donnée*.

- Ce n'est **pas** un `analyse` au sens des pages 404 / jeux supprimés du lot 8 : rien n'a
  disparu, la page fonctionne exactement comme prévu, et son objet n'a jamais été de
  représenter des données.
- Ce n'est **pas** un `reproduite` : il n'y a ni jeu, ni graphique, ni carte, ni filtre ;
  la seule reproduction possible serait une refonte de gabarit HTML, qui ne démontre rien
  de `dsfr-data`.
- La leçon **LIM-006** (un lien qui paraît hors périmètre ne prouve rien) a été jouée : les
  cinq liens ont été suivis, un billet a été ouvert et son DOM inspecté, le réseau a été relu.
  Le verdict tient **après** vérification, pas avant : les billets contiennent bien des
  représentations de données, mais **toutes en images matricielles**, sur une plateforme
  tierce sans jeu ni API.

Constats à verser à `public/data/retours.json` : aucun sur `dsfr-data` (rien n'a été
transposé, donc rien n'a été éprouvé). Le constat utile est **sur le catalogue**
(36 annoncées, 33 au mieux) et se range dans la synthèse, pas dans le registre des retours
à la bibliothèque.
