# Challenge Wikidata en classe 2026

- **URL** : https://data.education.gouv.fr/pages/wikidata-en-classe-2026/
- **Catalogue** : id **3**, thématique **Éducation**, sous-thématique *(vide)*, filtre *(vide)*.
  Description du catalogue : « Les 12 mars 2026 à l'Edulab Pasteur, à Rennes, la Délégation
  régionale académique au numérique éducatif a organisé la finale du challenge
  « Wikidata en classe ». » Vignette `/assets/theme_image/wikidata-2026.jpeg`.
- **Jeu(x) de données utilisé(s) par la page** : **aucun**. Pas de `ods-dataset-context`,
  aucune directive `ods-*`, **aucune requête vers `/api/`** au chargement.
- **Relevé visuel** : 2026-09-10, Chrome, fenêtre 1568 × 751, conteneur `.ods-box` à 1420 px.
- **À lire en premier** : la fiche `wikidata-en-classe.md` (édition 2025). Cette fiche-ci
  n'énonce que ce qui **diffère** ; les constats communs y sont établis une fois pour toutes.

## Ce que la page est réellement

La même chose que 2025 — un compte rendu d'événement, titre + chapô + galerie de projets —
mais **sur un gabarit refait**, avec un projet de plus (6 au lieu de 5) et un CSS repris de
zéro. Le template pèse 8 356 caractères contre 4 958 en 2025.

### Relevé bloc par bloc

| # | Bloc | Contenu relevé à l'écran |
|---|---|---|
| 1 | Titre | H2 « Challenge Wikidata en classe 2026 », brun `#755348`, 50 px — **millésimé**, contrairement à 2025 |
| 2 | Bandeau d'intro, **deux colonnes** | à gauche un texte de 4 lignes à `font-size:130%` (« Le Challenge « Wikidata en classe » permet aux élèves de mener des enquêtes documentaires à partir de données ouvertes et de contribuer à Wikidata autour de grandes thématiques citoyennes. L'édition 2026 explore les enjeux liés au genre, à l'engagement et à la représentation des femmes dans l'histoire, les médias, le sport et la société. ») ; à droite l'affiche `wikidata-2026.jpeg` (1404 × 738 → 650 × 342) |
| 3 | Amorce | « Les projets sélectionnés pour la grande finale 2026 : » en gras, `font-size:200%` (rendu comme un titre de section, mais c'est un `<p>`) |
| 4 | 6 rangs projet | image 420 px à gauche, H2-lien + résumé à droite |
| 5 | Clôture | « Ces projets illustrent la diversité des approches proposées par les élèves autour des questions d'égalité, d'engagement et de représentation dans les sociétés contemporaines et dans l'histoire. » |

L'affiche du bandeau porte, **en texte incrusté dans l'image**, le message de la campagne :
« Avec le challenge Wikidata en classe, interrogeons les représentations / Pensons, analysons
et créons des données sur le réel / pour combattre les biais et agir pour un monde plus
juste », plus le crédit « Jacky Fleming, *Le problème avec les femmes*, Dargaud, 2016 ».
Cette image **n'a pas d'`alt`** : c'est la seule des sept sans alternative textuelle, et
c'est celle qui porte le plus de texte.

### Les six projets, tels qu'affichés

Tous les liens pointent vers `porte-plume.app/projet/challenge-wikidata-en-classe/blog/billet/…`
(forme unique, contrairement à 2025 qui mélangeait UUID et slug). **Les six répondent 200**
(testés en curl).

| Titre affiché | Slug du billet | Image | `alt` relevé dans le DOM |
|---|---|---|---|
| Le combat pour les droits des femmes au XXIème siècle | `le-combat-pour-les-droits-des-femmes-au-xxie-siecle-` (noter le tiret final) | `wikidata-2026-1.jpeg` | « Simone Veil prend la parole dans l'assemblé national pour défendre le droit a l'avortement » |
| Aujourd'hui quelle est la place des femmes dans les médias ? | `aujourdhui-quelle-est-la-place-des-femmes-dans-les-medias` | `wikidata-2026-2.jpeg` | « Anne-Laure BONNET - Journaliste pour BeIn Sports - Crédit Photo : Le Parisien / Frédéric Dugit » |
| Les droits des athlètes transgenres dans le sport | `les-droits-des-athletes-transgenres-dans-le-sport` | `wikidata-2026-3.jpeg` | « La sprinteuse Halba Diouf dénonce l'exclusion des athlètes transgenres dans les compétitions féminines » |
| Au péril de la vie. Lutter pour l'égalité des genres en Iran | `au-peril-de-sa-vie-lutter-pour-l-egalite-des-genres-en-iran` (« sa vie » dans l'URL, « la vie » dans le titre) | `wikidata-2026-4.jpeg` | « Photo de Craig Melville sur Unsplash » |
| La place des femmes dans la piraterie | `la-place-des-femmes-dans-la-piraterie` | `wikidata-2026-5.jpeg` | « Mary Read révélant sa féminité. Wikipedia » |
| La parité dans les élections présidentielles en France | `la-parite-dans-les-elections-presidentielles-en-france` | `wikidata-2026-6.jpeg` | « Seulement 28% des postes de pouvoir sont occupés par des femmes en France. Rapport d'OXFAM » |

## Preuve : pas de dataviz, ici non plus

Mêmes trois mesures que sur la page 2025, mêmes résultats.

1. **Réseau** : `read_network_requests` filtré sur `api` → **aucune requête**. Les seules
   requêtes de contenu sont les sept `theme_image/wikidata-2026*.jpeg` (deux encore
   `pending` au moment de la mesure, cf. défaut n° 3).
2. **DOM** : dans `.ods-box`, `0` `iframe`, `0` `canvas`, `0` `svg`, `0` balise `ods-*`.
   Inventaire complet des balises : `h2, div, img, p, br, a`.
3. **Console** : rien.

## Est-ce le même gabarit que 2025 ?

**Non — c'est une réécriture.** Le HTML garde les mêmes noms de classe (`.row`,
`.column.left`, `.column.right`), mais le CSS est entièrement neuf et le rendu est différent.

| | **2025** (id 18) | **2026** (id 3) |
|---|---|---|
| Longueur du `html` | 4 958 car. | 8 356 car. |
| Origine du CSS | tutoriel W3Schools « two unequal columns », commentaire `/* Should be removed. Only for demonstration */` inclus | écrit pour la page (`box-sizing`, commentaire `/* 🔥 IMPORTANT : MOBILE */`) |
| Mise en page | `float: left` + clearfix `.row:after` | `display: flex; align-items: flex-start; gap: 20px` |
| Hauteur des colonnes | **`height: 300px` en dur** (les dix `.column` mesurent exactement 300 px) | **libre** (mesuré : `.column.right` va de 200 à 347 px selon le texte) |
| Largeur des colonnes | `25 %` / `75 %` → 350 / 1049 px | `flex: 0 0 420px` / `flex: 1; max-width: 650px` → 420 / 650 px |
| Responsive | **aucune media query** | `@media (max-width: 768px)` : passage en colonne, `object-fit: cover`, `max-height: 260px` |
| Bandeau d'intro | non (chapô en texte simple) | oui, deux colonnes texte + affiche |
| Nombre de projets | 5 | 6 |
| `alt` sur les images | 0 / 5 | **6 / 7** |
| Forme des liens | UUID pour l'un, slug pour les quatre autres | slug pour les six |
| Millésime dans le titre | non | oui |

Autrement dit : le gabarit 2026 **corrige** quatre des défauts de 2025 (hauteur fixe,
absence de responsive, `alt` manquants, formes d'URL mélangées) et en introduit deux
nouveaux (voir ci-dessous). Ce n'est pas le même fichier rejoué : c'est un second essai.

### Une signature intéressante : le markup vient d'ailleurs

Les six `<img>` de projet portent `class="object-cover z-10"`, `data-nimg="fill"`,
`decoding="async"`, `loading="lazy"`. `object-cover z-10` est du **Tailwind** et `data-nimg`
est l'empreinte du composant `next/image` de **Next.js** — ni l'un ni l'autre n'existe dans
le portail Opendatasoft. Or `porte-plume.suite.studio`, où vivent les billets, **est** une
application Next.js. Le rédacteur a donc copié le markup depuis le rendu des billets et l'a
collé dans l'éditeur de page ODS, `alt` compris — ce qui explique du même coup pourquoi les
six images ont un `alt` (importé) et la septième non (ajoutée à la main).

Ces attributs sont **inertes** dans le portail : `object-cover` et `z-10` ne correspondent à
aucune règle (Tailwind n'est pas chargé), `data-nimg` n'est lu par personne. Le seul qui
agisse est `loading="lazy"` — et il fait des dégâts (défaut n° 3).

## Défauts et bizarreries de l'original

1. **Aucun H1** (comme 2025) : le titre est un `<h2>` à 50 px, et le seul `<h1>` du document
   est celui du widget de chat `semantics-chat.wikit.ai`. L'amorce « Les projets sélectionnés
   pour la grande finale 2026 : », qui joue visuellement le rôle d'un titre de section
   (200 %, gras), est un `<p>` : la hiérarchie de titres réelle est H2 (page) → H2 (chacun
   des six projets), c'est-à-dire aucune.
2. **L'image la plus porteuse de sens est la seule sans `alt`.** L'affiche du bandeau contient
   trois phrases de campagne en texte incrusté ; elle est annoncée au lecteur d'écran comme
   une image vide. Les six images de projet, elles, ont un `alt` — et deux de ces `alt`
   contiennent un crédit photo (« Crédit Photo : Le Parisien / Frédéric Dugit ») plutôt qu'une
   description, ce qui est le symptôme du copier-coller.
3. **`loading="lazy"` sans dimensions : la mise en page s'effondre au premier rendu.**
   Mesuré : tant que les images ne sont pas chargées, les six `.column.left` font
   **420 × 5 px** au lieu de 420 × ~280. Les rangs se replient les uns sur les autres, puis
   sautent quand chaque image arrive. Vu à l'écran : en scrollant, le rang « Les droits des
   athlètes transgenres » s'est d'abord affiché **sans son image**, colonne gauche vide, avant
   que la photographie apparaisse et décale tout le rang. Aucun `width`/`height` ni
   `aspect-ratio` n'est posé, alors que les dimensions sont connues.
4. **`max-width: 650px` sur la colonne de texte** : à 1568 px de large, un rang occupe
   420 + 20 + 650 = 1 090 px sur les 1 420 px du conteneur. **330 px de vide à droite de
   chaque rang**, sur toute la hauteur de la page. C'est le premier réflexe visuel à l'écran.
5. **Deux titres pour le même billet.** « Au péril de **la** vie » sur le portail,
   `au-peril-de-**sa**-vie…` dans l'URL ; le billet lui-même s'intitule « Au péril de la vie.
   Lutter pour l'égalité des genres en Iran ». Et le slug du premier projet se termine par un
   tiret orphelin (`…-au-xxie-siecle-`), trace d'un espace final au moment de la création.
6. **La description du catalogue contredit la page.** Le catalogue dit « Les 12 mars 2026 …
   **a organisé la finale** » (au passé, et avec l'accord fautif « Les 12 mars ») ; la page
   dit « Les projets **sélectionnés pour** la grande finale 2026 », c'est-à-dire avant
   l'événement. Vérification faite sur `porte-plume` : le billet « La parité dans les
   élections présidentielles » est daté du **12/03/2026** et porte le bandeau « La grande
   finale 2026 » — la finale a bien eu lieu. **C'est donc la page qui n'a pas été mise à
   jour après l'événement**, six mois plus tard. Elle n'annonce aucun lauréat, là où la
   page 2025 se termine par « Les 5 projets ont été récompensés ».
7. **Le classement du catalogue enterre l'édition récente.** Le catalogue trie par `-id`
   (`ctx.parameters['sort']='-id'` dans `_sources/_dataviz-list.html`). L'édition 2026 porte
   l'**id 3**, l'édition 2025 l'**id 18** : la page 2026 arrive en **34ᵉ position sur 36**,
   loin derrière la page 2025 (19ᵉ). Le champ `id` du jeu `dataviz-a-la-une` n'est pas
   chronologique, et rien d'autre dans le jeu ne l'est (pas de champ date).
8. **Rien n'indique que les liens sortent du portail** : ni `target`, ni `rel`, ni icône
   visible — vérifié sur les six liens.
9. **Un septième billet existe et n'est pas lié.** Le blog `challenge-wikidata-en-classe`
   contient « Challenge Wikidata 2026 » (20 nov. 2025), le billet de lancement du dispositif,
   qui explique la démarche. La page du portail ne le référence pas ; elle n'indique d'ailleurs
   nulle part que les six billets appartiennent à un même blog qu'on peut parcourir.

## Et derrière les liens ?

Le billet **« La parité dans les élections présidentielles en France »** (12/03/2026, par
« elya » et « Lauréla ») a été ouvert et son DOM inspecté. C'est le billet le plus riche en
données des six titres, et son contenu tranche la question :

- Il contient **neuf images**, dont **cinq sont des graphiques** — « Parité homme/femme
  d'après les données enregistrées sur Wikidata », « Parrainages des candidats à l'élection
  présidentielle française du 7 Mars 2022 », « Genre de l'élu qui apporte son parrainage »,
  « Parrainages des candidats en fonction de leur genre », « Recherche de parrainage pour les
  présidentielle de 2022 ».
- Le texte des élèves dit exactement comment ils ont été faits : « Nous avons donc ouvert le
  fichier dans LibreOffice et avons vu qu'il y avait plus de 150 000 résultats. […] On n'avait
  déjà plus que 250 résultats et **sur LibreOffice Calc on en a fait un diagramme**. »
- Deux autres images sont des **captures du Wikidata Query Service** (une requête SPARQL, un
  message « Limite du temps de requête atteinte »).
- `find` sur le DOM ne renvoie que des éléments de type `image` : **aucun `iframe`, aucun
  `canvas`, aucun graphique vivant**. Les sources citées (`explore.data.gouv.fr`, Wikidata,
  Arcom, Vie publique) ne sont pas exposées sous forme de jeu réutilisable ; ce sont des
  références en prose.

Il y a donc bien de la visualisation de données dans le dispositif Wikidata en classe — c'en
est même l'objet pédagogique déclaré (« Récupérer, structurer des données, représenter un
phénomène », lu dans la fiche du projet sur `porte-plume`). Mais elle est **produite dans
LibreOffice, exportée en PNG et publiée sur une plateforme tierce**. Rien de tout cela n'est
reproductible : il n'existe ni jeu, ni API, ni même les chiffres en clair.

## Ce que `dsfr-data` a à voir là-dedans

**Rien de plus qu'en 2025, et pour la même raison** : pas de donnée, pas de transposition.
La correspondance `dsfr-data-display` + `<template>` détaillée dans `wikidata-en-classe.md`
s'applique telle quelle, avec quatre différences de paramétrage :

| | 2025 | 2026 |
|---|---|---|
| `cols` | `1` | `1` (l'original est déjà en un rang par projet) |
| `alt` | à créer de toutes pièces | déjà présent dans le HTML, à verser dans un champ `alt` |
| Bandeau d'intro | absent | hors `dsfr-data-display` : c'est du contenu unique, un `fr-callout` ou un `fr-highlight` DSFR suffit |
| Lazy-loading | non posé | `loading="lazy"` **plus** `width`/`height` dans le `<template>` — le composant rend le HTML tel qu'il est écrit, la responsabilité du réservoir de place reste à l'auteur |

Le point qui vaut d'être écrit pour le banc d'essai est **le même que pour 2025, et il est
renforcé ici** : deux éditions du même contenu, deux gabarits HTML écrits à la main, deux
jeux de défauts différents — hauteur figée et `alt` absents en 2025, effondrement du lazy
et `max-width` mal calibré en 2026. Le contenu, lui, n'a pas changé de forme : titre, image,
résumé, lien, établissement. C'est précisément le cas d'usage de `dsfr-data-display` : **une
forme décrite une fois, des données qui changent chaque année**. La preuve que le portail le
sait est à deux clics — la page catalogue qui liste ces deux pages est elle-même une galerie
de cartes pilotée par le jeu `dataviz-a-la-une`.

Ce que cela ne prouve pas, et qu'il ne faut pas écrire : que `dsfr-data` améliorerait la
*dataviz* de cette page. Il n'y en a pas.

## Statut proposé pour le registre

**`hors-perimetre`**, motif : *page éditoriale sans donnée — même cas que l'id 18*.

Même raisonnement que pour l'édition 2025, avec une vérification supplémentaire propre à
cette page : la question « le gabarit 2026 diffère-t-il structurellement de 2025 ? » a été
posée parce qu'un gabarit refait aurait pu introduire un composant de visualisation. Il n'en
introduit aucun — la réécriture porte entièrement sur la mise en page (flexbox, media query),
pas sur le contenu.

Les deux pages Wikidata **ne doivent pas être fusionnées en une seule entrée** du registre :
elles ont deux ids de catalogue, deux gabarits distincts et deux jeux de défauts. Elles
partagent en revanche le même **constat de catalogue** (36 annoncées, 33 dataviz réelles au
mieux), qui se reporte une seule fois dans `public/synthese.html`.
