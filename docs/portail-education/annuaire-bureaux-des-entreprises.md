# L'annuaire des bureaux des entreprises

- **URL du catalogue** (entrée n° 30) : https://data.education.gouv.fr/explore/dataset/fr-en-annuaire_bde_lycees_pro/carte/
  → **302** vers `https://data.education.gouv.fr/explore/assets/fr-en-annuaire_bde_lycees_pro/` (page d'actif du jeu).
- **URL réelle de la dataviz** :
  **`https://data.education.gouv.fr/explore/assets/visualisation-annuaire-des-bureaux-des-entreprises-des-lycees-professionnels-et-polyvalents/view/`**
  (lien « Cet actif a été lié à l'actif suivant : … - Visualization » en tête de la description du jeu).
- **Id catalogue** : 30 · **Thématique** : Éducation · **Sous-thématique** : Lycées · **Filtre** : aucun.
- **Nature de la cible** : **vue personnalisée ODS héritée** (« custom view »), **pas** une
  page Studio ni une page `/pages/`. Particularité : **son slug de vue n'est pas `custom`
  mais `carte`** (`extra_metas.visualization.custom_view_slug`), d'où l'URL de catalogue en
  `/carte/`. Configuration récupérée à
  `https://data.education.gouv.fr/explore/embed/dataset/fr-en-annuaire_bde_lycees_pro/carte/`
  (attribut `ctx-dataset-schema`, **ne redirige pas** ; les slugs `custom` et
  `carte-personnalisee` renvoient 404 sur ce jeu). Archivée dans
  `docs/portail-education/_sources/fr-en-annuaire_bde_lycees_pro.customview.json`.
  `custom_view_title` = « **Carte** », `custom_view_css` = 4 076 caractères.
- **Relevé visuel** : 2026-09-10, Chrome (extension), viewport 1568 × 751.

## Jeu de données

`fr-en-annuaire_bde_lycees_pro` — **1 942 lignes**, 19 champs, `visibility: domain`,
Licence Ouverte v2.0 (Etalab), données modifiées le 2026-03-20. Producteur non renseigné.

| Champ | Type | Remarque mesurée |
|---|---|---|
| `numero_uai` | text | clé, 1 942 valeurs |
| `appellation_officielle` | text | titre de l'infobulle |
| `adresse_uai` | text | **1 vide** |
| `lieu_dit_uai` | text | **1 807 vides sur 1 942** |
| `code_postal_uai` / `localite_acheminement_uai` | text | **1 546** / **1 317** valeurs distinctes |
| `libelle_commune` | text | **1 143** valeurs |
| `libelle_departement` | text | **105** valeurs |
| `libelle_region` | text | **19** valeurs (dont `TOM et Collectivités territoriales`, 19 lignes) |
| `libelle_academie` | text | **33** valeurs |
| `mail_bde` | **text multi-valué** | **2 vides** ; renvoyé en **tableau** par l'API v2.1 |
| `telephone` | text | **903 vides sur 1 942 (46 %)** |
| `web` | text | **81 vides** ; 5 valeurs partagées par ≥ 2 lycées |
| `position` | geo_point_2d | **10 nulles** → 1 932 points cartographiables |
| `localisation` | text | qualité du géocodage — **10 modalités incohérentes**, voir Défauts |
| `secteur` | text | Public **1 709** · Privé **233** |
| `metiers_prepares` | **text multi-valué** | **1 381 valeurs distinctes** ; 0 à **410** par lycée, **moyenne 126** ; 122 lycées sans aucune |
| `diplomes_prepares` | **text multi-valué** | **355 valeurs distinctes** ; 0 à 36 par lycée, moyenne 10,4 ; 122 sans aucune |
| `romesv3` | **text multi-valué** | **175 codes ROME distincts** ; 157 lycées sans aucun |

**Le point structurant du jeu : trois colonnes multi-valuées, dont une très large.**
En v1 ODS elles sont des chaînes séparées par `|` (d'où le `.split('|')` du template) ;
en v2.1 elles reviennent en **tableaux JSON**.

**Répartition par région** (API) : Île-de-France 336 · Auvergne-Rhône-Alpes 227 ·
Hauts-de-France 191 · Nouvelle-Aquitaine 181 · Grand Est 180 · Occitanie 175 ·
PACA 122 · Bourgogne-Franche-Comté 110 · Pays de la Loire 106 · Normandie 73 ·
Centre-Val de Loire 61 · Bretagne 54 · La Réunion 31 · Martinique 22 · Guadeloupe 19 ·
TOM et Collectivités territoriales 19 · Guyane 13 · Mayotte 13 · Corse 9.

**Facettes déclarées au back-office** : `code_postal_uai`, `localite_acheminement_uai`,
`libelle_commune`, `libelle_departement`, `libelle_region`, `libelle_academie` (toutes
`facetsort: alphanum`, `disjunctive: true`), puis `secteur`, `metiers_prepares`,
`diplomes_prepares`, `romesv3` (sans tri, non disjonctives). **Aucune n'est rendue par le
visualiseur** : cette vue construit ses propres filtres dans son template.

**Poids mesurés** (`/exports/json?limit=-1`, gzip, 3 mesures) :

| Requête | Poids | Temps |
|---|---:|---|
| export **complet** | **2 097 Ko** gzip (11 988 Ko brut) | 0,38 / 0,34 / 0,33 s |
| export **sans** `metiers_prepares`, `diplomes_prepares`, `romesv3` | **239 Ko** gzip | 0,27 / 0,26 / 0,82 s |

**⚠️ Ce jeu inverse le piège « `select` sur un champ texte long » du `CLAUDE.md`.** Sur les
internats, restreindre le `select` allégeait le transfert et **ralentissait** la requête.
Ici, écarter les trois colonnes multi-valuées divise le poids par **8,8** et la requête
n'est pas plus lente. La différence : là-bas les colonnes écartées étaient du texte long
indexé, ici ce sont des **tableaux à 126 entrées en moyenne**. La règle du dépôt reste
juste (« mesurer avant de conclure ») ; sa conclusion, non — elle dépend du jeu.
**Mais on ne peut pas les écarter** : les deux filtres de la page portent dessus.
1 942 lignes, 2,1 Mo gzip, **un aller-retour de 0,33 s** : ça tient largement côté client.

## Objectif de la dataviz et informations véhiculées

- **Question** : « Quel lycée professionnel près de chez moi a un bureau des entreprises,
  quels métiers et diplômes y prépare-t-on, et **qui contacter** ? »
- **Message porté** : le réseau des BDE couvre tout le territoire, DROM-COM compris, et il
  est très majoritairement **public** (1 709 / 1 942).
- **Ce que l'utilisateur doit obtenir** : un **contact opérationnel** — c'est la seule des
  quatre cibles du lot dont l'objet est de mettre en relation. L'infobulle donne mail du
  BDE, téléphone, adresse postale, site de l'établissement, puis la liste des métiers et
  des diplômes préparés.
- **Ce qui n'est pas dans l'objet** :
  - **aucun compteur** : à aucun moment la page ne dit combien de lycées correspondent au
    filtre en cours — ni « 1 942 », ni « 9 en Corse » ;
  - **aucune distinction public / privé** à l'écran, alors que `secteur` est facetté au
    back-office et présent dans le jeu ;
  - aucun tableau, aucun graphique, aucun KPI ;
  - aucun export, aucune synchronisation d'URL ;
  - aucun code ROME visible (le champ existe, 175 valeurs, jamais affiché).

## Relevé visuel exhaustif, bloc par bloc

### 0. Chrome de page

En-tête DSFR, menu horizontal, fil d'Ariane « Catalogue › Visualisation - Annuaire … ›
**Consultation** ». H1 sur deux lignes : « **Visualisation - Annuaire des bureaux des
entreprises des lycées professionnels et polyvalents** ». Icône signet. Bulle de chat.

Titre du bloc, en **bleu marine, centré, très gros** (style du visualiseur d'actif, pas de
la vue) : « **Localisation des bureaux des entreprises des lycées professionnels et
polyvalents** ».

### 1. Mise en page

`custom_view_css` pose un **flex à deux colonnes** :
`.carteBde { display:flex; flex-flow: row wrap; height:100%; column-gap:10px }`,
`.divListesDeroulantes { flex: 1 0 250px }` (colonne de filtres),
`.divMapClass { flex: 100 1 auto; min-width:250px; height:100% }` (carte).
Observé : colonne de filtres ~285 px à gauche, carte sur tout le reste.

La colonne de filtres est conditionnée par `ng-if="ctx.parameters['displayFilters']==1"` —
un paramètre d'URL. **Elle est bien affichée par défaut** (observé), donc le paramètre est
posé en amont par le visualiseur.

### 2. Colonne de filtres — six contrôles

| # | Composant | Champ | Placeholder observé | Multi ? |
|---|---|---|---|---|
| 1 | `ods-select` + `ods-facet-results` | `libelle_region` | « Selectionner une région » | **non** (`multiple="false"`) |
| 2 | `ods-select` | `libelle_academie` | « Selectionner une académie » | non |
| 3 | `ods-select` | `libelle_departement` | « Selectionner un département » | non |
| 4 | `ods-select` | `libelle_commune` | « Selectionner une commune » | non |
| 5 | `ods-text-search` | `metiers_prepares` | « Chercher un métier » | recherche plein texte |
| 6 | `ods-text-search` | `diplomes_prepares` | « Chercher un diplôme » | recherche plein texte |
| — | bouton | — | « **Supprimer tous les filtres** » (pilule bleue `#0088cc`, croix) | — |

- Les quatre `ods-select` sont alimentés par `ods-facet-results-sort="alphanum"` : valeurs
  **triées A→Z, sans compteur**. **Vérifié à l'écran** : le menu « région » s'ouvre en
  liste déroulante avec un champ « Filtre » en tête et les 19 valeurs alphabétiques
  (Auvergne-Rhône-Alpes, Bourgogne-Franche-Comté, Bretagne, Centre-Val de Loire, Corse,
  Grand Est, Guadeloupe, Guyane, …), **aucun nombre à côté**.
- Les deux `ods-text-search` portent chacun un `ng-submit` qui **vide l'autre** :
  `ng-submit="ctx.parameters['q.diplomes_prepares']=''"` sur le champ métier et
  réciproquement. **Les deux recherches sont donc mutuellement exclusives** — on ne peut
  pas chercher « boulanger » ET « CAP » en même temps. Ce n'est pas une contrainte
  technique, c'est un choix écrit dans le template.
- Les placeholders sont en **bleu-violet `#667dcf`** (règle CSS dédiée), pas en gris DSFR.
- « Supprimer tous les filtres » remet à vide les six paramètres, un par un, dans un
  `ng-click` en ligne.
- Écrits **« Selectionner »**, sans accent, dans les quatre placeholders.

### 3. La carte

`<ods-map display-control="false" display-control-single-layer="false" display-legend="false"
 no-refit="false" ods-auto-resize="false" scroll-wheel-zoom="true" search-box="true"
 toolbar-drawing="false" toolbar-fullscreen="false" toolbar-geolocation="false"
 ng-init="detail.open = ''">`

- **Moteur Leaflet**, fond clair type « positron » (« Leaflet | Powered by Huwise -
  Map data © IGN »). Contrôles : `+` / `−` et sélecteur de fond seulement — le plein écran,
  le dessin et la géolocalisation sont explicitement désactivés.
- **`search-box="true"`** : un champ « **Rechercher un lieu** » flotte en haut à gauche de
  la carte (recherche de toponyme, pas d'établissement).
- **`no-refit="false"` → la carte se recadre sur les données.** À l'ouverture, la boîte
  englobante inclut la Polynésie, la Nouvelle-Calédonie, La Réunion et les Antilles :
  **la vue d'ouverture est le planisphère**. Observé : quatre clusters et un marqueur isolé.

  | Cluster observé | Effectif affiché | Territoire |
  |---|---:|---|
  | Europe | **1 825** | métropole + Corse |
  | Atlantique ouest | **55** | Antilles + Guyane |
  | Océan Indien | **44** | La Réunion + Mayotte |
  | Pacifique | **7** | Polynésie + Nouvelle-Calédonie |
  | épingle isolée (Atlantique nord) | 1 | Saint-Pierre-et-Miquelon |
  | **Total** | **1 932** | = 1 942 − 10 sans `position` ✔ |

- **Clustering actif** : la couche n'a pas d'attribut `display`, donc ODS applique son mode
  par défaut, qui regroupe. Le nombre s'affiche dans une pastille ronde bleu ardoise.
- **Une seule couche** : `<ods-map-layer color="#2C3F56" context="ctx" picto="ods-administration">`.
  Une seule couleur pour tout le monde, un picto « fronton d'édifice public » dans une
  épingle. **Vérifié** : filtre `région = Corse` → recadrage sur la Corse, 8 épingles
  dépliées à picto fronton.
- **Le recadrage se rejoue à chaque filtre.** Corse → vue Corse ; recherche « boulanger »
  → **retour au planisphère** (les lycées correspondants sont dispersés jusqu'en Polynésie).

### 4. L'infobulle — le morceau de bravoure du template

Rendue au clic, dans un `.infoPaneLayout.mapInfoClass`, structurée en `<dl>`.
Relevée mot pour mot sur le LP Fred Scamaroni (Bastia) :

```
Lycée professionnel Fred Scamaroni - Bastia
Contact bureau des entreprises
    bde-lpo-scamaroni@ac-corse.fr           ← lien mailto:
Numéro de téléphone
                                            ← LIGNE VIDE (lien tel: vide)
Adresse
    rue 4ème div marocaine de montagne
    20200 BASTIA
Site internet de l'établissement
    https://ernest-ferroul.mon-ent-occitanie.fr/   ← lien target="_blank"
[ métiers | diplômes ]                      ← onglets
  • Accompagnant de personnes dépendantes
  • Accompagnante de personnes dépendantes
  Plus ⌄
```

- **Adresse** : trois `ng-if` gèrent les combinaisons `adresse_uai` / `lieu_dit_uai`
  (`{{adresse | lowercase}} ({{lieu_dit}})`, l'un, l'autre), puis toujours
  `{{code_postal_uai}} {{localite_acheminement_uai}}`. **L'adresse est passée en
  minuscules**, mais pas la localité : « rue 4ème div marocaine de montagne » puis
  « 20200 BASTIA ».
- **Onglets `ods-simple-tabs class="little-tabs"`** : « métiers » et « diplômes ».
  `keep-content="true"`. L'onglet « diplômes » porte un `ng-if="record.fields.diplomes_prepares"`
  — il disparaît pour les 122 lycées sans diplôme renseigné.
- **Repli « Plus / Moins »** : chaque onglet affiche `slice(0,2)` puis, au clic sur
  « Plus ⌄ », la liste complète et « Moins ⌃ ». **Vérifié** : « Plus » sur l'onglet métiers
  déroule la liste complète (Accompagnant éducatif et social, Agent brancardier, Agent de
  restauration…) dans un cadre à bordure noire, l'infobulle devenant scrollable.
  L'état est porté par un **unique** `detail.open = record.recordid`, partagé par les deux
  onglets d'un même établissement.
- La liste est produite par `metiers_prepares.split('|')` dans un `ng-init` : c'est le
  format v1 de la colonne multi-valuée.
- **Vérifié** : passer sur l'onglet « diplômes » ré-affiche 2 entrées + « Plus »
  (Bac pro accompagnement soins et services à la personne, Bac pro commercialisation et
  services en restauration).

### 5. Recherche par métier — comportement observé

Saisie « **boulanger** » dans « Chercher un métier », Entrée : la carte se recadre sur le
planisphère et n'affiche plus qu'une trentaine d'épingles dépliées (Europe, Antilles,
Guyane, océan Indien, Pacifique). **Aucun compteur n'indique combien de lycées restent.**
Observé également : la sélection du `ods-select` région précédemment posée n'était plus
affichée après cette manipulation — comportement non reproduit proprement, donc **non
retenu comme défaut**.

## Défauts et bizarreries de l'original

1. **La carte s'ouvre sur le planisphère.** `no-refit="false"` sur un jeu qui va de la
   Polynésie (−149 °O) à La Réunion (55 °E) : la métropole tient dans une tache d'une
   centaine de pixels. Même défaut que la carte des internats, cause identique.
2. **Le numéro de téléphone est une ligne vide pour 903 lycées sur 1 942 (46 %).** Le
   template rend inconditionnellement `<dt>Numéro de téléphone</dt><dd><a href="tel:{{…}}">{{…}}</a></dd>` :
   quand le champ est nul, on obtient un intitulé suivi d'un blanc, et un lien `tel:` vide
   dans le DOM. **Vu à l'écran** sur le LP Fred Scamaroni. Même mécanique pour `web`
   (81 lycées) et `mail_bde` (2).
3. **Des sites internet manifestement faux.** Le LP Fred Scamaroni (Bastia, académie de
   Corse) pointe vers `https://ernest-ferroul.mon-ent-occitanie.fr/` — l'ENT d'Occitanie,
   pour un autre établissement. Le LPO Tuianu Le Gayic (Papara, **Polynésie française**)
   pointe vers `lyc-saint-exupery-bellegarde.ent.auvergnerhonealpes.fr`. Cinq URL sont
   partagées par plusieurs lycées (une par quatre). Le champ n'est pas fiable, et le
   template le présente comme s'il l'était.
4. **Les deux recherches s'annulent l'une l'autre.** Chercher un diplôme efface la
   recherche métier, et réciproquement (`ng-submit`). « Un CAP de boulanger » n'est pas une
   requête exprimable.
5. **Aucun compteur de résultats.** Ni total, ni résultat de filtre, nulle part. C'est le
   manque le plus lourd pour un objet nommé « annuaire » : on ne sait jamais si l'on
   regarde 9 lycées ou 336.
6. **Aucune recherche par nom d'établissement.** On peut chercher un lieu (`search-box`),
   un métier, un diplôme — pas « Fred Scamaroni ».
7. **`secteur` (Public / Privé) n'est ni filtrable ni affiché**, alors qu'il est facetté au
   back-office et dans le jeu (1 709 / 233). Les 233 lycées privés sont indiscernables.
8. **`romesv3` (175 codes ROME) n'apparaît jamais.** C'est pourtant la clé
   d'interopérabilité avec France Travail que porte le jeu.
9. **Les quatre filtres sont mono-sélection** (`multiple="false"`) alors que les facettes
   sont déclarées **disjonctives** au back-office. Comparer deux académies est impossible.
10. **Facettes sans compteur, tri alphabétique** : impossible de voir que l'Île-de-France
    pèse 336 et la Corse 9. L'information existe côté serveur.
11. **« Selectionner » sans accent**, quatre fois.
12. **Casse incohérente dans l'adresse** : rue en minuscules forcées (`| lowercase`),
    localité en capitales brutes. « rue 4ème div marocaine de montagne » / « 20200 BASTIA ».
13. **`localisation` : dix modalités qui mélangent trois conventions.** Comptées à l'API :
    `Numéro de rue` 1 551 · `Rue` 234 · `PLAQUE_ADRESSE` 99 · `BATIMENT` 23 ·
    `NE SAIT PAS` 15 · `Ville` 9 · `Lieu-dit` 5 · `0` 3 · `CENTRE_PARCELLE` 1 ·
    `CENTRE_PARCELLE_PROJETE` 1. Français capitalisé, SCREAMING_SNAKE et un `0`. Le champ
    n'est jamais affiché — mais la qualité du géocodage qu'il décrit, elle, se voit.
14. **10 lycées sans `position`** (dont le LPO Tuianu Le Gayic) ne figurent nulle part, et
    rien ne le signale.
15. **Aucune synchronisation d'URL** : un état filtré n'est ni partageable ni
    « bookmarkable ».
16. **Le repli « Plus / Moins » est partagé entre les deux onglets** d'un même
    établissement (`detail.open` unique) : déplier les métiers puis basculer sur les
    diplômes ne conserve pas l'état de façon prévisible.
17. **Jusqu'à 410 métiers dans une infobulle.** Le « Plus » déroule tout, dans un cadre de
    ~350 px de large — soit plusieurs écrans de scroll à l'intérieur d'une popup Leaflet.
    Et la liste est saturée de doublons de genre (« Boulanger » / « Boulangère »,
    « Agent d'accueil » / « Agente d'accueil ») : sur 1 381 valeurs distinctes, une bonne
    moitié sont des paires. C'est un fait du référentiel ROME, mais le template l'affiche
    tel quel, ce qui double la longueur perçue de la liste.
18. **Bulle de chat par-dessus la carte**, en permanence.

## Transposition vers `dsfr-data`

### Architecture retenue et pourquoi

1 942 lignes, **2 097 Ko gzip en 0,33 s** (3 mesures) pour l'export complet. Un seul
`dsfr-data-source` en mode URL générique sur `/exports/json`, **sans `select`** (les deux
filtres métier/diplôme et l'infobulle ont besoin des colonnes multi-valuées), tout le reste
côté client. 2 Mo est le poids de la fonctionnalité, pas un accident : la version sans les
trois colonnes ne pèse que 239 Ko mais ne permet plus de filtrer.

Une option si le poids devient un problème sur mobile : deux sources, une légère pour la
carte et une lourde chargée à la demande. **Non nécessaire ici** — 0,33 s pour tout, en un
aller-retour.

### Ce que le multi-valué change, et c'est le point neuf de cette fiche

`dsfr-data-facets` **gère nativement les colonnes multi-valuées** (#421). Lu dans la source
(`packages/core/src/components/dsfr-data-facets.ts`) :

```
/** ... Une cellule multi-valeurs (ex. ChoiceList Grist) fournit chaque element ;
 *  une cellule scalaire fournit sa valeur. ... L'ancien String(val) stringifiait
 *  le tableau (« a,b ») : la valeur ne matchait jamais une selection. */
private _facetValuesOf(val: unknown): string[] {
  if (Array.isArray(val)) return val.filter(...).map(String);
  return [String(val)];
}
/** La cellule matche-t-elle la selection ? Intersection pour les tableaux (#421). */
```

Conséquence directe : **`metiers_prepares` et `diplomes_prepares` peuvent devenir de vraies
facettes** — valeurs exactes, compteurs, sélection multiple, recherche intra-facette — là
où l'original n'offre qu'une recherche plein texte mono-terme. C'est un **gain net** sur
l'original, pas un contournement.

À l'inverse, **`dsfr-data-search` ne connaît pas les tableaux** : `_matchRecord` fait
`String(record[f] ?? '')`, ce qui donne `"Boulanger,Boulangère,…"`. La recherche `contains`
y trouvera bien « boulanger », mais **par coercition, pas par élément** — un terme à cheval
sur deux valeurs adjacentes matcherait aussi. Pour les métiers, préférer la facette.

### Correspondance bloc à bloc

| Directive ODS de la vue personnalisée | Composant + attributs `dsfr-data` |
|---|---|
| `ods-dataset-context` (implicite, `ctx` du visualiseur) | `<dsfr-data-source id="bde" url="…/fr-en-annuaire_bde_lycees_pro/exports/json">` |
| 4 × `ods-facet-results` + `ods-select multiple="false"` | `<dsfr-data-facets id="bde-f" fields="libelle_region, libelle_academie, libelle_departement, libelle_commune, secteur" display="libelle_region:select \| libelle_academie:select \| libelle_departement:select \| libelle_commune:multiselect \| secteur:radio-inline" …>` — séparateur **`\|`** pour `display` et `labels` (PG-022) |
| `ods-facet-results-sort="alphanum"` | `sort="alpha:asc"` (le défaut est `count:desc` ; **ne jamais écrire `-count`**, PG-012) |
| valeurs **sans** compteur | ne rien faire : `dsfr-data-facets` les affiche. `hide-counts` existe mais serait une régression |
| `multiple="false"` | `display="champ:select"` = liste déroulante native à **choix unique** — **pas** `:radio`, qui rend un menu déroulant à panneau (PG-023) ; `radio-inline` (#684) rend des boutons radio en ligne avec une option « Tous » |
| facettes déclarées `disjunctive: true` au back-office | `disjunctive="libelle_academie, libelle_departement"` — l'attribut existe et porte le même nom que la notion ODS |
| `ods-text-search field="metiers_prepares"` | **`dsfr-data-facets` sur `metiers_prepares`** (multi-valué géré nativement, #421) + `searchable="metiers_prepares"` + `max-values="8"` — supérieur à l'original |
| `ods-text-search field="diplomes_prepares"` | idem sur `diplomes_prepares` (355 valeurs) |
| `ng-submit` qui vide l'autre recherche | **rien** : deux facettes se combinent, c'est le comportement voulu (défaut n° 4 corrigé par omission) |
| « Supprimer tous les filtres » (`ng-click` en ligne) | bouton natif de `dsfr-data-facets` (« Réinitialiser les filtres ») — `no-reset` le masque si l'on préfère `dsfr-data-context-tags clear-all` |
| — (rien dans l'original) | `<dsfr-data-search fields="appellation_officielle, libelle_commune, numero_uai" operator="words" count>` — chercher un lycée par son nom |
| — (rien dans l'original) | `url-sync` + `url-params` sur les facettes et la recherche |
| `<ods-map no-refit="false">` (fit mondial) | `<dsfr-data-map fit-bounds fit-zone="41,-5.5,51.5,10" fit-max-zoom="12" insets="drom,saint-pierre-et-miquelon,nouvelle-caledonie,polynesie-francaise">` — le clip métropole est même **le défaut** dès qu'un encart ultramarin est posé (#687) |
| `search-box="true"` (recherche de lieu) | **pas d'équivalent** — voir § Limites |
| `<ods-map-layer color="#2C3F56" picto="ods-administration">` | `<dsfr-data-map-layer type="marker" color="#2C3F56" geo-field="position">` |
| clustering (mode par défaut ODS) | `cluster cluster-radius="60"` — le JSDoc précise qu'avec `cluster`, `max-items="20000"` est sans risque ; 1 932 points passent de toute façon sous le plafond de 5 000 |
| — (rien dans l'original) | `color-field="secteur" color-map="Public:#18753C,Privé:#000091"` + `<dsfr-data-map-legend>` — rend visible ce que le jeu porte et que la vue cache |
| `display-legend="false"` | l'absence de `<dsfr-data-map-legend>` |
| infobulle `<dl>` à 4 rubriques + 2 onglets | `<dsfr-data-map-popup mode="panel-right" width="420px">` + `<template>` |
| `<a href="mailto:{{mail_bde}}">` | `<a href="mailto:{{mail_bde}}">` dans le template — l'interpolation dans un attribut est le motif AM-039 |
| lignes vides quand le champ est nul | `{{telephone\|Non communiqué}}` — repli explicite, **on ne reproduit pas** le libellé orphelin |
| `ods-simple-tabs` métiers / diplômes | `fr-tabs` du DSFR dans le `<template>`, **ou** deux `<ul>` — mais voir § Limites : le repli « Plus » n'a pas d'équivalent déclaratif |
| `metiers_prepares.split('|')` + `slice(0,2)` | rien à découper (l'API v2.1 renvoie un tableau) ; le tronquage, voir § Limites |
| — (rien dans l'original) | `<dsfr-data-list>` triable + `<dsfr-data-kpi value="count">` |

### Esquisse de code

```html
<!-- ================= Source ================= -->
<!-- 1 942 lignes mais 2 097 Ko gzip : les trois colonnes multi-valuées pèsent 88 % du
     transfert (126 métiers par lycée en moyenne, jusqu'à 410). Mesuré 0,33 s, un aller-
     retour. Pas de `select` : les facettes « métier » et « diplôme » en dépendent. -->
<dsfr-data-source id="bde"
  url="https://data.education.gouv.fr/api/explore/v2.1/catalog/datasets/fr-en-annuaire_bde_lycees_pro/exports/json">
</dsfr-data-source>

<!-- Ce que la vue d'origine ne sait pas faire : chercher un lycée par son nom. -->
<dsfr-data-search id="bde-q" source="bde"
  fields="appellation_officielle, libelle_commune, numero_uai"
  label="Rechercher un lycée" placeholder="Nom de l'établissement, commune, UAI…"
  operator="words" count url-sync></dsfr-data-search>

<div class="fr-container fr-mb-8w">
  <h1 class="fr-h2">Les bureaux des entreprises des lycées professionnels et polyvalents</h1>

  <div class="fr-grid-row fr-grid-row--gutters">

    <!-- ================= Colonne de filtres ================= -->
    <div class="fr-col-12 fr-col-md-3">
      <dsfr-data-facets id="bde-f" source="bde-q"
        fields="libelle_region, libelle_academie, libelle_departement, libelle_commune, secteur, metiers_prepares, diplomes_prepares"
        labels="libelle_region:Région | libelle_academie:Académie | libelle_departement:Département | libelle_commune:Commune | secteur:Secteur | metiers_prepares:Métier préparé | diplomes_prepares:Diplôme préparé"
        display="libelle_region:select | libelle_academie:select | libelle_departement:select | libelle_commune:multiselect | secteur:radio-inline | metiers_prepares:multiselect | diplomes_prepares:multiselect"
        searchable="libelle_departement, libelle_commune, metiers_prepares, diplomes_prepares"
        disjunctive="libelle_academie, libelle_departement, metiers_prepares, diplomes_prepares"
        sort="alpha:asc" max-values="8"
        url-sync url-params></dsfr-data-facets>
    </div>

    <!-- ================= Carte ================= -->
    <div class="fr-col-12 fr-col-md-9">
      <dsfr-data-kpi-group class="fr-mb-2w">
        <dsfr-data-kpi source="bde-f" value="count" format="nombre"
          label="bureaux des entreprises" col="12"></dsfr-data-kpi>
      </dsfr-data-kpi-group>

      <dsfr-data-map name="Localisation des bureaux des entreprises"
        center="46.55,2.5" zoom="5" height="620px"
        tiles="ign-plan" tiles-style="muted"
        fit-bounds fit-zone="41,-5.5,51.5,10" fit-max-zoom="12"
        insets="drom,saint-pierre-et-miquelon,nouvelle-caledonie,polynesie-francaise">

        <dsfr-data-map-layer id="c-bde" source="bde-f" type="marker"
          geo-field="position"
          color-field="secteur" color-map="Public:#18753C,Privé:#000091"
          cluster cluster-radius="60" max-items="6000"
          tooltip-field="appellation_officielle">
        </dsfr-data-map-layer>

        <dsfr-data-map-legend for="c-bde" label="Secteur de l'établissement">
        </dsfr-data-map-legend>

        <dsfr-data-map-popup mode="panel-right" title-field="appellation_officielle" width="420px">
          <template>
            <p class="fr-badge fr-badge--sm fr-mb-2v">{{secteur}}</p>

            <h4 class="fr-h6 fr-mb-1v">Contact du bureau des entreprises</h4>
            <p class="fr-text--sm fr-mb-1v"><a href="mailto:{{mail_bde}}">{{mail_bde|Non communiqué}}</a></p>
            <p class="fr-text--sm fr-mb-2v">
              <a class="odv-tel" href="tel:{{telephone}}">{{telephone|Téléphone non communiqué}}</a></p>

            <h4 class="fr-h6 fr-mb-1v">Adresse</h4>
            <p class="fr-text--sm fr-mb-1v">{{adresse_uai|—}}</p>
            <p class="fr-text--sm fr-mb-2v">{{code_postal_uai}} {{localite_acheminement_uai}}</p>

            <p class="fr-text--sm fr-mb-2v">
              <a class="odv-web" href="{{web}}" target="_blank" rel="noopener">Site de l'établissement</a></p>

            <p class="fr-text--xs">UAI {{numero_uai}} · {{libelle_academie}}</p>
          </template>
        </dsfr-data-map-popup>
      </dsfr-data-map>

      <!-- ================= Tableau : rien de tel dans l'original ================= -->
      <h2 class="fr-h4 fr-mt-4w">La liste</h2>
      <dsfr-data-list source="bde-f"
        columns="appellation_officielle, secteur, libelle_commune, libelle_departement, libelle_academie, mail_bde, telephone"
        sort pagination="25"></dsfr-data-list>
    </div>
  </div>
</div>
```

```css
/* Masquer les liens dont l'href interpolé est vide : le motif AM-039 du dépôt
   (pas de conditionnelle dans les templates → interpoler puis masquer en CSS). */
.odv-web[href=""], .odv-tel[href="tel:"] { display: none; }
```

## Limites et points durs identifiés

1. **Le repli « Plus / Moins » sur une liste de 410 valeurs, dans une infobulle.**
   *Obstacle* : le `<template>` de `dsfr-data-map-popup` interpole des champs ; il n'a ni
   boucle (`ng-repeat`), ni tranche (`slice`), ni conditionnelle (AM-039). Un champ
   multi-valué interpolé sort en `String()`, soit « a,b,c ».
   *Voie native essayée* : `popup-fields="metiers_prepares"` (tableau automatique) — rend
   la même chaîne, sans repli.
   *Contournement* : `<details><summary>` du DSFR autour d'un `<p>{{metiers_prepares}}</p>`
   dans le template : on obtient le pli, pas les deux premiers éléments visibles avant le
   pli, ni la puce par valeur. Sur un jeu où la médiane est ~126 métiers, `<details>` est
   sans doute la meilleure réponse de toute façon.
   *Verdict* : **manque réel, à remonter** — une itération dans les templates
   (`{{#each champ}}` ou `list-field="metiers_prepares"` sur le popup). C'est le seul point
   dur de cette fiche. **Attention à ne pas le sur-vendre** : l'original lui-même n'affiche
   que deux entrées avant repli, et sa liste complète est inutilisable ; le vrai service
   rendu au lecteur est la **facette** « Métier préparé », que `dsfr-data` fait mieux.
2. **Deux onglets dans une infobulle.**
   *Obstacle* : `fr-tabs` du DSFR a besoin de son JS d'initialisation ; un template injecté
   dans une popup Leaflet ne le déclenche pas nécessairement.
   *Contournement* : deux `<details>` empilés, ou deux sections l'une sous l'autre — la
   popup est en `mode="panel-right"`, elle a la place.
   *Verdict* : **choix d'ergonomie, pas capacité manquante.**
3. **Recherche de lieu sur la carte** (`search-box="true"`, « Rechercher un lieu »).
   *Obstacle* : `dsfr-data-map` n'expose pas de géocodeur. `no-controls` ne masque que le
   zoom.
   *Voie native* : `dsfr-data-search` cherche dans les **données** (commune, adresse), pas
   dans un référentiel de toponymes. Sur cet annuaire, chercher « Bastia » dans
   `libelle_commune` donne le même service.
   *Verdict* : **petit manque réel**, sans conséquence ici : le jeu porte ses propres
   communes. À remonter seulement si un cas exige de naviguer vers un lieu **absent** des
   données.
4. **Filtrer sur un tableau via `dsfr-data-search`.**
   *Obstacle* : `_matchRecord` fait `String(record[f])` — un tableau devient « a,b,c ».
   `contains` fonctionne (vérifié en lecture de source), mais la frontière entre deux
   éléments n'est pas respectée.
   *Voie native correcte* : `dsfr-data-facets`, qui **traite les tableaux élément par
   élément** (#421, `_facetValuesOf`, intersection sur la sélection).
   *Verdict* : **pas une limite — un aiguillage.** À dire tel quel : la recherche plein
   texte n'est pas le bon outil sur un multi-valué, la facette l'est.
5. **1 381 valeurs dans une facette.**
   *Obstacle* : `max-values` limite l'affichage (« Voir plus »), `searchable` donne la
   recherche intra-facette. Le calcul des 1 381 groupes se fait à chaque changement de
   filtre, côté client, sur 1 942 lignes × ~126 valeurs ≈ 245 000 entrées.
   *À mesurer* : le coût du recalcul n'a **pas été chronométré** ici. Ne pas conclure sans
   l'avoir fait — c'est la règle du dépôt.
   *Repli si le coût est réel* : n'exposer que `diplomes_prepares` (355 valeurs, 20 000
   entrées), qui est de toute façon la porte d'entrée la plus utile pour un élève.
6. **Doublons de genre du référentiel ROME.** « Boulanger » / « Boulangère » sont deux
   valeurs distinctes : la facette en affichera deux.
   *Voie native* : `dsfr-data-normalize` fait de l'arrondi, du renommage et du nettoyage —
   pas de la fusion de valeurs par règle morphologique.
   *Verdict* : **problème de donnée, pas de bibliothèque.** À traiter en amont si le projet
   le justifie ; le signaler dans la page sinon.
7. **`display="champ:select"` sur 1 143 communes.** Le `select` natif à choix unique est
   inutilisable à cette taille ; `multiselect` (menu repliable avec cases **et recherche**)
   est le bon mode. C'est ce que fait l'esquisse.
8. **Ce que la transposition gagne** : un compteur de résultats (le manque n° 1 de
   l'original), une recherche par nom d'établissement, des facettes multi-valeurs avec
   compteurs sur les métiers et les diplômes (au lieu de deux recherches mutuellement
   exclusives), le secteur public/privé rendu visible en couleur + légende, un cadrage
   métropolitain avec encarts ultramarins, des replis explicites au lieu de lignes vides,
   les liens morts masqués, une URL partageable, et un tableau accessible.
   **Onze des dix-huit défauts relevés tombent d'eux-mêmes.**

## Données à reproduire fidèlement

- [ ] **1 942** bureaux des entreprises, dont **1 932 géolocalisables** (10 sans `position`
      — le signaler).
- [ ] **Secteur** : Public 1 709 / Privé 233 — rendu visible (l'original le cache).
- [ ] **Région** : 19 valeurs, d'Île-de-France 336 à Corse 9, plus
      « TOM et Collectivités territoriales » 19.
- [ ] **Académie** 33 valeurs · **Département** 105 · **Commune** 1 143 ·
      **Code postal** 1 546 · **Localité** 1 317.
- [ ] **Métiers** : 1 381 valeurs distinctes, 0 à 410 par lycée, moyenne 126 ;
      **122 lycées sans aucun métier renseigné**.
- [ ] **Diplômes** : 355 valeurs distinctes, moyenne 10,4 par lycée.
- [ ] **ROME** : 175 codes — à afficher (l'original ne le fait pas).
- [ ] **Téléphone renseigné pour 1 039 lycées sur 1 942** : repli explicite, pas de ligne
      vide.
- [ ] **81 lycées sans site web**, et des URL fausses (LP Fred Scamaroni → ENT Occitanie ;
      LPO Tuianu Le Gayic → ENT Auvergne-Rhône-Alpes) : lien masqué si vide, et le champ
      présenté pour ce qu'il est.
- [ ] Infobulle : appellation officielle (titre), mail du BDE (mailto), téléphone (tel),
      adresse + code postal + localité, site de l'établissement, métiers, diplômes —
      **plus le secteur**.
- [ ] Clustering visible : Europe 1 825 · Antilles-Guyane 55 · océan Indien 44 ·
      Pacifique 7 · SPM 1.
- [ ] Cadrage métropole par défaut, encarts pour les DROM-COM.
- [ ] Titre « Localisation des bureaux des entreprises des lycées professionnels et
      polyvalents ».
