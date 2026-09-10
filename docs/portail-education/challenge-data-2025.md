# Challenge de la Data 2025

- **URL** : https://data.education.gouv.fr/pages/challenge-data-2025/
- **Catalogue** : id **15**, thématique **Éducation**, sous-thématique *(vide)*, filtre *(vide)*.
  Description du catalogue : « Le challenge de la Data 2025 s'est tenu vendredi 28 mars à
  l'IUT Bordeaux Montaigne, » (la virgule finale est dans la donnée).
  Vignette `/assets/theme_image/data-challenge.png`.
- **Jeu de données *cité* par la page** : **`fr-en-challenge-data`** — « Données du challenge
  de la donnée 2025 », **3 lignes**, `visibility: domain`, lisible **sans clé**
  (`/records` répond 200 en anonyme, vérifié en curl). Modifié le 2025-07-04.
  - **5 champs** : `annee` (text), `nom_equipe` (text), `etablissement` (text),
    `dossier` (**file**), `image` (**file**, `has_thumbnails: true`).
  - Aucune licence, aucun thème, aucun mot-clé, aucune description au back-office.
- **Mais la page n'interroge pas ce jeu** : elle en recopie six URL de fichier en dur.
  Voir « Preuve ».
- **Relevé visuel** : 2026-09-10, Chrome, fenêtre 1568 × 751, conteneur `.ods-box` à 1420 px.

## Ce que la page est réellement

Une **page éditoriale de palmarès** : un titre, trois paragraphes de contexte, une liste à
puces, puis quatre blocs « visuel de couverture à gauche / titre-lien + résumé à droite »,
et une phrase de félicitations. Aucun composant.

### Relevé bloc par bloc

| # | Bloc | Contenu relevé à l'écran |
|---|---|---|
| 1 | Titre | H2 « Challenge de la Data 2025 », brun `#755348`, 50 px |
| 2 | Contexte, § 1 | Organisation : « co-organisé par deux IUTs ( Tours et Bordeaux) » (espace parasite après la parenthèse), 3ᵉ année du BUT InfoCom parcours INO ; jury Université/IUT Bordeaux Montaigne + IUT de Tours + professionnels ; sponsors « les ministères chargés de l'Éducation Nationale et des Sports » |
| 3 | Contexte, § 2 | Le thème : les JOP de Paris 2024, et la question posée aux étudiants |
| 4 | Contexte, § 3 + `<ul>` | Trois cas d'application : compétitions sportives scolaires et universitaires / grands festivals culturels et concerts / autres événements de grande ampleur |
| 5 | Amorce | « Voici les 3 projets lauréats retenus par le jury : » en gras |
| 6 | 3 rangs lauréat | couverture de dossier 180 px + H2-lien vers le PDF + résumé (celui de « Data Lympixs » est une liste à trois puces) |
| 7 | 4ᵉ rang | « **Prix coup de cœur** », lien **vide** (`href=""`), texte « Un prix coup de cœur a obtenu la 4eme place, il sera bientôt dévoilé sur cette page… » |
| 8 | Clôture | « Félicitations aux gagnants pour le travail accompli ! » |

### Les quatre rangs, tels qu'affichés

| Titre affiché | Image (`src`) | Lien (`href`) | Cible réelle |
|---|---|---|---|
| Datatenders | `…/files/e0346890be22daf68f758ee1c31a72a7/download/` | `…/files/051aa9ea30a50f745b3ccc086d908a5c/download/` | `challenge_data_datatenders-iut_tours.pdf` — **55 pages, A4, 4,1 Mo** |
| Data Lympixs | `…/files/19f740b852843e6951f722ce51dfd454/download/` | `…/files/fe1ecc1860e25c775ae92d3db21d95f5/download/` | `dossier challenge de la data 2025 - data'lympixs.pdf` — **52 pages, A2, 7,6 Mo** |
| Para Data | `…/files/e691e440e19c533c2967a7ca7fc5f5d4/download/` | `…/files/510f38b542e865417d1905aee63905c3/download/` | `dossier challenge de la data 2025 para-data.pdf` — **23 pages, A4, 2,6 Mo** |
| Prix coup de cœur | `/assets/theme_image/4e%20prix.png` (874 × 1161) | **`""`** | — |

Les six premières URL sont des **fichiers attachés au jeu `fr-en-challenge-data`**, servis
par la route `/explore/dataset/…/files/<id>/download/`. Testées en curl : **200**,
`content-type: image/png` pour les images, `application/pdf` pour les dossiers.
La route API équivalente (`/api/explore/v2.1/catalog/datasets/fr-en-challenge-data/files/<id>`)
répond elle aussi 200, avec `access-control-allow-origin: *` — ce point compte pour la
transposition.

L'image du 4ᵉ rang, `4e prix.png`, est un **montage de deux captures d'écran de carte** : en
haut un plan sombre de l'agglomération parisienne semé de points orange et bleus avec des
tracés de lignes (rendu de type Kepler.gl), en bas une vue rapprochée 3D d'un quartier avec
un amas rouge. C'est l'image la plus « dataviz » de la page — et c'est un PNG statique posé
sous un lien vide, pour un lauréat non annoncé.

## Preuve : pas de dataviz, et pas d'appel au jeu

1. **Réseau.** Filtré sur `challenge-data` : **quatre** requêtes — le document HTML de la
   page, et **trois** images de fichier. **Aucune requête vers `/api/`**, donc aucun
   `/records`, aucun `/facets`. La page ne lit pas `fr-en-challenge-data` : elle a recopié
   six identifiants de fichier hexadécimaux dans son HTML.
2. **DOM.** Dans `.ods-box` : `0` `<iframe>`, `0` `<canvas>`, `0` `<svg>`, `0` balise
   `ods-*`. Inventaire complet : `h2, div, p, ul, li, br, img, a`. Quatre `<img>`,
   **aucune avec `alt`**. Quatre `<a>`, dont un à `href=""`.
3. **Console.** Aucun message.

## Et dans les fichiers attachés ? Les trois dossiers PDF

C'est la question qui pouvait renverser le constat, et elle a été instruite : les trois PDF
ont été téléchargés et leur texte extrait.

**Oui, les projets primés sont des travaux de visualisation de données** — c'était l'exercice.
Leurs sommaires le disent :

| Dossier | Section dataviz | Pages |
|---|---|---|
| DataTenders (IUT Tours) | « Visualisation Interactive » | 8 → 25 (sur 55) |
| Data'Lympixs | « Data Visualisations » | 9 → ~30 (sur 52), format **A2** — un dossier conçu pour être lu en grand |
| PARA-DATA | « DATAVIZ » | 5 → 10 (sur 23) |

**Mais rien de tout cela n'est en ligne.** Aucun des trois PDF ne contient d'URL vers une
visualisation publiée : les liens extraits sont des liens **vers des jeux de données** et
des sources de presse. Data'Lympixs ne cite qu'une seule URL dans tout son dossier —
`https://openai.com/`. Les « visualisations interactives » sont donc des captures d'écran
imprimées dans un PDF ; l'interactivité annoncée dans le titre de section de DataTenders
n'existe nulle part sur le web.

**En revanche, les jeux qu'ils ont exploités, eux, sont sur ce portail-ci.** Les dossiers
DataTenders et PARA-DATA citent nommément :

`paris-2024-cheminements-parking-velo-psa`, `paris-2024-boutiques-officielles`,
`paris-2024-evenements-olympiade-culturelle`, `paris-2024-flux-pietons-accredites`,
`paris-2024-itineraires-spectateurs`, `paris-2024-sites-de-competition`,
`paris-2024-parkings-pfr-taxi-ts`, `fr-en-data-es-base-de-donnees`.

Sept d'entre eux répondent **200** sur `data.education.gouv.fr` (un seul lien du dossier,
`paris-2024-parkings-velo-spectateurs`, est un 404 : le jeu s'appelle
`paris-2024-parkings-velo-spectateurs-en-idf`, la coquille est dans le PDF).
Recherche élargie au catalogue : **35 jeux « Paris 2024 » vivent sur le portail**, dont
`paris-2024-liste-athletes-engages-olypara` (12 625 lignes),
`paris-2024-territoires-labellises-terre-de-jeux` (4 513),
`paris-2024-evenements-olympiade-culturelle` (4 316),
`paris-2024-centres-de-preparation-aux-jeux` (3 000),
`paris-2024-messages-chatbot-centre-de-contact-grand-public` (**202 246**) — sur 306 jeux
au total, soit un neuvième du portail.

**Aucun de ces 35 jeux n'a d'entrée au catalogue des data-visualisations.** Le portail
héberge la matière première d'un concours de dataviz, publie le compte rendu du concours
dans son catalogue de dataviz, et n'y publie **aucune** dataviz faite avec cette matière.
C'est le constat le plus utile de cette page, et il est vérifié.

## Pourquoi cette page figure au catalogue des data-visualisations

Même mécanique que pour les deux pages Wikidata : le jeu `dataviz-a-la-une` qui pilote le
catalogue n'a que `titre`, `description`, `image`, `lien` et trois champs de rangement — rien
qui dise de quelle nature est l'objet pointé. Une page qui *parle* de données y entre aussi
facilement qu'une carte.

Ici, la nuance mérite d'être posée : la page **pointe vers** trois travaux de dataviz. Elle
n'en montre aucun, mais elle n'est pas hors sujet comme le serait un communiqué. Le catalogue
mélange donc trois natures d'objet sans les distinguer : **la visualisation** (les 33 autres
entrées), **le compte rendu d'un travail de visualisation** (celle-ci), **le compte rendu
d'un dispositif pédagogique** (les deux pages Wikidata). Un champ `type` à trois valeurs dans
`dataviz-a-la-une` résoudrait le problème d'un coup, et le composant de facettes du portail
en ferait un filtre en une ligne — c'est exactement ce que fait déjà le champ `thematique`.

**Arithmétique du catalogue** : 36 entrées annoncées, **3 sans aucune représentation de
données** (ids 18, 3, 15) → **33 dataviz réelles au maximum**, avant examen des 33 autres.
Constat transverse, à ne reporter qu'une fois dans `public/synthese.html`.

## Défauts et bizarreries de l'original

1. **Un lien vide, en production depuis dix-sept mois.** `<a href="">Prix coup de cœur</a>` :
   cliquer recharge la page. Le texte annonce « il sera bientôt dévoilé sur cette page… »
   ; le challenge s'est tenu le **28 mars 2025**, le jeu attaché a été modifié pour la
   dernière fois le **4 juillet 2025**, et au **10 septembre 2026** le lauréat n'est
   toujours pas dévoilé. Le jeu `fr-en-challenge-data` compte toujours **3 lignes**.
2. **Aucun `alt` sur les quatre images** (4 / 4), dont trois sont des couvertures de dossier
   portant le nom de l'équipe — l'information est dans l'image, pas dans le texte, pour un
   lecteur d'écran.
3. **Aucun H1** : le titre est un `<h2>` grossi à 50 px en style en ligne. Le seul `<h1>` du
   document est celui du widget de chat tiers.
4. **Le CSS est celui du tutoriel W3Schools, commentaire compris — le même fichier que la
   page `wikidata-en-classe`**, au caractère près sauf les largeurs :
   ```css
   .column { float: left; padding: 10px; height: 300px; /* Should be removed. Only for demonstration */ }
   .left  { width: 200px; }
   .right { width: calc(100% - 200px); }
   ```
   Le `height: 300px` n'a pas été retiré : mesuré, les huit `.column` de la page font toutes
   exactement 300 px. Les couvertures de dossier, en portrait (559 × 793, 530 × 750,
   560 × 781), sont réduites à **180 × 255** — illisibles — et le montage du 4ᵉ prix
   (874 × 1161) à 180 × 239. Le titre et les trois puces de « Data Lympixs » débordent de
   leur colonne de 300 px. Aucune media query : à 400 px de large, la colonne image reste
   figée à 200 px.
5. **Rien ne dit qu'on télécharge un PDF de plusieurs mégaoctets.** Les trois liens n'ont ni
   `target`, ni `rel`, ni mention de format ou de poids. Cliquer « Data Lympixs » lance
   **7,6 Mo** au format **A2**. Le DSFR a un composant fait pour ça (`fr-download`, qui
   affiche « PDF – 7,6 Mo »), il n'est pas employé.
6. **Les noms d'équipe ne coïncident pas avec la donnée.** Page → jeu :
   « Datatenders » → `DataTenders`, « Data Lympixs » → `Data'Lympixs`,
   « Para Data » → `PARA-DATA`. Trois graphies pour trois équipes : la source de vérité est
   inutilisée, donc elle diverge.
7. **L'ordre affiché n'est justifié par rien.** La page présente DataTenders, Data Lympixs,
   Para Data ; le jeu, interrogé sans tri, renvoie Data'Lympixs, DataTenders, PARA-DATA.
   Or le texte parle d'un prix qui « a obtenu la 4eme place » : il y a donc un classement,
   et **le jeu ne porte aucun champ de rang**. L'ordre du palmarès n'existe que dans l'ordre
   des `<div>` du template.
8. **Le jeu source n'est jamais mentionné.** Ni lien vers `fr-en-challenge-data`, ni vers les
   35 jeux Paris 2024 du portail que les lauréats ont exploités. Un lecteur qui voudrait
   refaire le travail n'a aucun point d'entrée, alors que la matière est sur le même domaine.
9. **Métadonnées absentes sur le jeu** : `fr-en-challenge-data` n'a ni licence, ni thème, ni
   mot-clé, ni description, et son champ `etablissement` n'est renseigné que pour une équipe
   sur trois (« IUT Tours »). Le champ `annee` vaut `"2025"` pour les trois lignes — il a été
   prévu pour accueillir les éditions suivantes, ce qui confirme que le jeu était bien conçu
   pour piloter une page millésimée.

## Ce que `dsfr-data` a à voir là-dedans

**Ici, contrairement aux deux pages Wikidata, il y a quelque chose à dire — et ce n'est
toujours pas une dataviz.** Le jeu existe, il est public, il est anonyme, il porte
exactement les champs de la page, et la page l'ignore. C'est le cas d'école du contenu
éditorial qui **devrait** être piloté par sa donnée, et le portail lui-même en administre la
preuve : sa page catalogue est une galerie de cartes DSFR pilotée par `dataviz-a-la-une`
(`_sources/_dataviz-list.html`, `ods-results` + `fr-card`).

Le composant n'est ni `dsfr-data-list` (c'est un **tableau** : recherche, tri, pagination,
export) ni un `dsfr-data-cards` — **qui n'existe pas**, vérifié à `list_skills` (30 skills,
aucune de ce nom). C'est **`dsfr-data-display`** : « Affichage dynamique de données via
template HTML (cartes, tuiles, listes) ».

### Correspondance

| Sur la page | `dsfr-data` | Attributs et grammaire **vérifiés** |
|---|---|---|
| Six identifiants de fichier hexadécimaux recopiés en dur | `<dsfr-data-source>` | `api-type="opendatasoft"`, `base-url="https://data.education.gouv.fr"`, `dataset-id="fr-en-challenge-data"`. **Pas d'`api-key-ref`** : `/records` répond 200 en anonyme (vérifié en curl). Pas de `max-records` : 3 lignes, très en deçà du plafond de 1 000 de l'adaptateur ODS. |
| L'ordre du palmarès, qui n'existe que dans le HTML | même balise | `order-by` — mais il faudrait d'abord **ajouter un champ `rang`** au jeu. En l'état, `order-by="nom_equipe"` donnerait un ordre alphabétique, pas le classement. C'est une limite **de la donnée**, pas du composant. |
| 4 blocs `.row > .column.left img + .column.right h2>a + p` | `<dsfr-data-display>` + `<template>` | `source`, `cols="1"`, `gap`, `empty`, `uid-field="nom_equipe"` (pose un `id="item-…"` par carte, donc une ancre par lauréat — ce que l'original n'a pas). |
| `<img src="…/files/e0346890…/download/">` | `{{image.url}}` | La **notation pointée** est documentée (`{{champ.sous.clé}}`) et implémentée : `dsfr-data-display` résout ses chemins avec `getByPath` (`packages/core/src/utils/json-path.ts`). L'adaptateur ODS republie `json.results` **sans aplatir** (`packages/core/src/adapters/opendatasoft-adapter.ts`, l. 187 et 255), donc l'objet `file` de v2.1 arrive intact avec ses clés `url`, `filename`, `format`, `width`, `height`. L'URL v2.1 sert bien le PNG (`content-type: image/png`, `access-control-allow-origin: *`, vérifié en curl). |
| `<a href="…/files/051aa9ea…/download/">` | `{{dossier.url:url}}` | Le filtre `:url` existe (`template-expression.ts`, `SAFE_URL_SCHEMES = ['http:','https:','mailto:','tel:']`) et la fiche impose de l'employer dans **tout** `href`. |
| « il sera bientôt dévoilé » + `href=""` | `{{#if dossier}}…{{/if}}` / `{{#unless}}` | Blocs conditionnels natifs, **non imbriquables**, et qui doivent englober un élément entier ou une valeur d'attribut complète (guide de `dsfrDataDisplay`). Voie native qui remplace la recette CSS `a[href=""]{display:none}` d'AM-039. |
| Rien n'annonce le poids du PDF | `{{dossier.format}}` dans un `fr-download` | Le format est dans la donnée (`"pdf"`). Le **poids** ne l'est pas : l'objet `file` d'ODS v2.1 porte `width`/`height` (300 × 300 pour un PDF, valeurs de remplissage) mais **pas** la taille en octets. Le « PDF – 7,6 Mo » du DSFR n'est donc pas atteignable depuis ce jeu. **Limite de la donnée ODS**, à ne pas imputer à `dsfr-data`. |
| `etablissement` renseigné 1 fois sur 3 | `{{etablissement\|}}` ou `{{#if}}` | Le fallback `{{champ\|défaut}}` est documenté. |
| Les 3 descriptions de projet, longues, écrites à la main | — | **Elles ne sont pas dans le jeu.** Il faudrait ajouter un champ `description` (et, pour « Data Lympixs », le résumé est une liste à trois puces : soit trois champs, soit du HTML dans la donnée rendu par `{{{description}}}`, la forme brute non échappée — à n'employer que sur une donnée maîtrisée au back-office). |

### Esquisse

```html
<!-- 3 lignes, 5 champs, aucune clé : le portail éducation répond en anonyme.
     Suppose deux champs ajoutés au back-office : `rang` (number) et `description` (text). -->
<dsfr-data-source id="laureats"
  api-type="opendatasoft"
  base-url="https://data.education.gouv.fr"
  dataset-id="fr-en-challenge-data"
  where="annee = '2025'"
  order-by="rang">
</dsfr-data-source>

<div class="fr-container fr-my-6w">
  <h1>Challenge de la Data 2025</h1>
  <p class="fr-text--lead">
    Le 28 mars 2025 à l’IUT Bordeaux Montaigne. Thème de l’édition : l’héritage des Jeux
    olympiques et paralympiques de Paris 2024. Les équipes ont travaillé sur les
    <a href="/explore/?q=paris+2024">35 jeux de données « Paris 2024 »</a> du portail.
  </p>

  <h2>Les projets lauréats</h2>
  <dsfr-data-display source="laureats" cols="1" uid-field="nom_equipe"
    empty="Le palmarès n’est pas encore publié.">
    <template>
      <div class="fr-card fr-card--horizontal">
        <div class="fr-card__body"><div class="fr-card__content">
          <h3 class="fr-card__title">{{nom_equipe}}</h3>
          <p class="fr-card__desc">{{description|}}</p>
          <div class="fr-card__start">
            <p class="fr-badge fr-badge--sm fr-badge--info">{{rang}}ᵉ prix</p>
          </div>
          <div class="fr-card__end">
            {{#if etablissement}}<p class="fr-card__detail">{{etablissement}}</p>{{/if}}
            {{#if dossier}}
              <a class="fr-link fr-link--download" download
                 href="{{dossier.url:url}}">Dossier — {{dossier.format}}</a>
            {{/if}}
            {{#unless dossier}}
              <p class="fr-text--sm fr-mb-0">Dossier non publié</p>
            {{/unless}}
          </div>
        </div></div>
        <div class="fr-card__header"><div class="fr-card__img">
          <img class="fr-responsive-img" loading="lazy"
               width="{{image.width}}" height="{{image.height}}"
               src="{{image.url:url}}"
               alt="Couverture du dossier de l’équipe {{nom_equipe}}">
        </div></div>
      </div>
    </template>
  </dsfr-data-display>
</div>
```

Ce que la bascule apporte, et rien de plus : l'édition 2026 s'ajoute en publiant trois
lignes au back-office, sans toucher au HTML ; le prix coup de cœur apparaît le jour où sa
ligne existe, au lieu d'un `href=""` figé dix-sept mois ; les noms d'équipe cessent de
diverger de la donnée ; les images portent leurs dimensions réelles (`{{image.width}}` /
`{{image.height}}` sont dans l'objet `file`), donc plus de saut de mise en page ; et le
`{{#unless}}` remplace la phrase « il sera bientôt dévoilé » écrite en dur.

Ce que la bascule **n'apporte pas** : une dataviz. Il n'y a que trois lignes et deux
fichiers ; aucun graphique n'a de sens ici. Le dire est le point de la fiche.

### Ce qui, en revanche, serait une vraie dataviz — et n'existe pas

Les 35 jeux Paris 2024 du portail. Un candidat évident, en une balise `dsfr-data-map` et une
`dsfr-data-source` : `paris-2024-sites-de-competition` (63 lignes) + les couches
`paris-2024-voies-olympiques-et-paralympiques` (2 000) et
`paris-2024-parkings-velo-spectateurs-en-idf` (41), c'est-à-dire la carte que PARA-DATA et
DataTenders ont produite à la main dans un PDF. Ce n'est **pas** l'objet de cette fiche —
la page à auditer est un palmarès, pas une carte — mais c'est la piste qu'un lot ultérieur
devrait ouvrir, et elle vient directement des sources citées dans les dossiers primés.

## Statut proposé pour le registre

**`hors-perimetre`**, motif : *page éditoriale de palmarès — aucune donnée représentée ;
le jeu associé (3 lignes, 2 fichiers) ne porte pas de dataviz*.

- Pas `reproduite` : il n'y a ni graphique, ni carte, ni filtre, ni KPI. La refonte en
  `dsfr-data-display` esquissée plus haut est un gain de gabarit et d'accessibilité, pas
  une reproduction de visualisation — la classer `reproduite` gonflerait artificiellement le
  compte du banc d'essai.
- Pas `analyse` au sens du lot 8 : rien n'a disparu, la page fonctionne, le jeu est vivant
  et lisible en anonyme.
- La leçon **LIM-006** a été jouée jusqu'au bout, et c'est ce qui a le plus rapporté ici :
  les trois PDF ont été téléchargés, comptés (55 / 52 / 23 pages) et leurs URL extraites.
  Le verdict « pas de dataviz sur la page » tient, mais l'instruction a mis au jour
  **35 jeux Paris 2024 sur le portail, dont aucun n'est au catalogue des dataviz** — ce
  qu'une lecture du seul template n'aurait jamais donné.

Constats à verser à `public/data/retours.json` : aucun sur `dsfr-data` (rien n'a été
transposé au navigateur, donc rien n'a été éprouvé — la correspondance ci-dessus est
documentaire, vérifiée dans la source et les fiches, pas exécutée). Les deux constats utiles
sont sur le **catalogue** (36 annoncées / 33 au mieux) et sur le **gisement Paris 2024
inexploité** ; ils vont à `public/synthese.html`.
