# DNMA — Les usages numériques constatés via les ENT

> **⚠️ Mise à jour du 2026-09-10 — les jalons v0.24.0 et v0.25.0 sont livrés.**
> Cette fiche a été écrite le matin même, quand ils étaient encore en cours ; elle y renvoie
> donc au futur (« prévu au jalon v0.25.0 »). **Tout ce qui y est annoncé comme prévu est
> désormais disponible** : `dsfr-data@0.25.0` livre `fetch-mode="export"` (#689) et
> `require-where` (#690), et le dépôt est monté en 0.25.0. Les analyses ne sont pas réécrites —
> elles disent ce qui a été rencontré au moment du portage, et c'est leur valeur. Pour l'état
> courant du backlog et les quatre verdicts, voir [`_CIBLE-0.25.md`](_CIBLE-0.25.md).


- **URL du catalogue** : https://data.education.gouv.fr/explore/assets/**dmna**-les-usages-numeriques-constates-v2/view/
  → **200 direct, aucune redirection** (`curl -sIL`).
- **Id catalogue** : 4 · **Thématique** : `Education` (**sans accent**, comme l'entrée 5 ;
  l'entrée 1 porte `Éducation` — la facette du catalogue est scindée en deux). Pas de
  sous-thématique. Vignette `dnma.gif`.
- **Relevé visuel** : 2026-09-10, Chrome (extension), viewport 1440 × 690 CSS px.
- **Producteur des jeux** : DNE — Ministère de l'Éducation nationale.

## Deux défauts dans l'identifiant lui-même

1. **`dmna` au lieu de `dnma`.** Inversion des lettres N et M. Vérifié : le titre du catalogue dit
   « **DNMA** Les usages numériques constatés via les ENT », le `<h1>` de la page dit
   « **DNMA** des ENT », les quatre jeux s'appellent `fr-en-**dnma**-par-uai-*` — et l'URL publique
   dit `dmna`. DNMA = *Dispositif National de Mesure d'Audience* ; « DMNA » ne veut rien dire.
2. **`-v2`** dans un identifiant public : un numéro de version de brouillon exposé dans l'URL,
   partagé, référencé, indexé.

Le `<link rel="canonical">` confirme : `https://data.education.gouv.fr/pages/dmna-les-usages-numeriques-constates-v2/`.

## ⚠️ Ce n'est pas une page Studio

`GET /api/portal/v1.0/studio_pages/dmna-les-usages-numeriques-constates-v2` → `not_found`, et le
slug n'est pas dans les 23 pages Studio du portail ; ce n'est pas non plus un jeu. C'est une
**page AngularJS `/pages/<slug>/` servie sous une URL `/explore/assets/…`**, avec `$scope.blocks`.
Template désechappé archivé dans `_sources/dmna-les-usages-numeriques-constates-v2.html`
(28 626 c.), CSS dans `.css` (31 388 c.). Décoder les entités HTML en **une seule passe**.

## Jeux de données — quatre, tous massifs

| Jeu | Lignes | Champs | Rôle dans la page |
|---|---:|---:|---|
| `fr-en-dnma-par-uai-profils` | **3 896 557** | 24 | contexte de facette + `ctxprofils` (local) + `ctxprofilsnational` |
| `fr-en-dnma-par-uai-services` | **3 093 552** | 81 | `ctxservices` |
| `fr-en-dnma-par-uai-profils-appareils` | **1 479 646** | 58 | `ctxprofilsappareils` |
| `fr-en-dnma-par-uai-appareils` | **3 881 534** | 73 | `ctxappareils` — **contexte déclaré, jamais lu** (0 agrégation) |

**Total : 12,35 millions de lignes.** Tous : `visibility: domain`, **Licence Ouverte v2.0**,
features `['timeserie','analyze']`, `modified` 2026-09-09.

Grain commun : **une ligne = un UAI × une semaine**. Clés de contexte partagées par les quatre
jeux : `debutsemaine` (date), `uai`, `academie`, `commune`, `departement`, `region`, `ministere`,
`circonscription`, `nature_uai`, `secteur`. Puis, selon le jeu, des triplets
`visites_X` / `utilisateurs_X` / `duree_X` (`duree_*` est de type **text**, jamais utilisé ici).

Structure **« wide »** systématique : les modalités sont dans les **noms de colonnes**, pas dans
les valeurs. `fr-en-dnma-par-uai-profils` a 4 profils × 3 mesures ; `…-services` a **24 services**
× 3 mesures ; `…-profils-appareils` a 4 profils × 4 appareils × 3 mesures.

**Profondeur** : la première semaine du jeu profils est `2019-09-02`.

**Facette `academie` — 35 valeurs** (relevées dans le scope Angular, avec leurs compteurs de
lignes, **sur l'ensemble du jeu, sans filtre d'année**) : Versailles 303 524 · Lille 326 879 ·
Nantes 267 250 · Créteil 265 283 · Rennes 256 027 · Toulouse 224 161 · Montpellier 204 928 ·
Orléans-Tours 191 526 · Amiens 190 436 · Nancy-Metz 182 139 · Normandie 178 642 · Lyon 159 322 ·
Bordeaux 154 619 · Grenoble 113 694 · Reims 105 531 · Paris 99 667 · Aix-Marseille 93 051 ·
Poitiers 88 041 · Strasbourg 79 656 · Nice 71 362 · Clermont-Ferrand 62 622 · La Réunion 51 742 ·
Dijon 49 096 · Besançon 44 473 · Martinique 32 773 · Guadeloupe 23 636 · Limoges 21 064 ·
Corse 15 170 · Guyane 13 092 · Mayotte 12 648 · Polynésie Française 12 355 ·
Nouvelle-Calédonie 1 945 · **Etranger 79** · Saint-Pierre-et-Miquelon 52 · Wallis-et-Futuna 31.
**Libellés en casse normale, avec accents** — l'inverse exact de la page Capytale du même portail.

## Objectif de la dataviz et informations véhiculées

- **Question** : « Combien, et par qui, les ENT sont-ils utilisés — nationalement, par académie,
  par profil, par service, et depuis quel appareil ? »
- **Message porté** : les ENT sont massivement utilisés (649 M de visites en 2025-2026) ; élèves et
  parents pèsent chacun ~40 % des visites ; la vie scolaire et le courrier électronique dominent
  les services ; **les élèves y accèdent majoritairement au smartphone (54 %) et les parents
  massivement (82 %)** — c'est le constat le plus intéressant de la page.
- **Ce que l'utilisateur doit obtenir** : un ordre de grandeur national, une comparaison
  local/national par académie, et la répartition par profil, service et appareil.
- **Ce qui n'est pas dans l'objet** :
  - **aucune série temporelle**, alors que les quatre jeux sont hebdomadaires depuis 2019 et
    déclarés `timeserie`. La page n'a **aucun graphique** : uniquement des cartes de chiffres et
    des barres de proportion en CSS ;
  - **aucune carte** ;
  - **aucun grain sous l'académie** (ni département, ni commune, ni UAI, ni `secteur`, ni
    `nature_uai`), pourtant tous présents dans les quatre jeux ;
  - **19 des 24 services** ne sont jamais affichés ;
  - **le jeu `fr-en-dnma-par-uai-appareils` (3,9 M lignes, navigateurs et OS) est chargé mais
    jamais utilisé** ;
  - aucun `utilisateurs_*` en dehors d'un seul KPI, aucune `duree_*`.

## Relevé visuel exhaustif, bloc par bloc

### 0. Chrome de portail

En-tête DSFR, menu, fil d'Ariane « Catalogue › DNMA Les usages numé… › Consultation », titre du
catalogue, icône signet. Bulle de chat magenta flottante.
**Headings relevés dans le DOM** : `h1` = « DNMA des ENT » (+ « Fenêtre de chat », injecté par le
widget de chat) ; six `h2` (les six sections) ; **un seul `h3`**. Les titres de cartes
(`.dnma-card-title`, `.dnma-visual-title`) sont des `<div>` : **ils ne sont pas dans le plan de
titres**.

### 1. En-tête éditorial (`.dnma-header`)

`<h1 class="dnma-logo">` « **DNMA des ENT** » ; sous-titre « USAGES DU NUMÉRIQUE ÉDUCATIF » ;
badge pilule « data.education.gouv.fr · données DNMA » ; intro « Tableau de bord des usages des
espaces numériques de travail : vue d'ensemble, lecture locale, profils utilisateurs, services ENT,
modes d'accès et comparaison territoriale connectée. » ; quatre liens pilule **Profils**,
**Services**, **Profils × appareils**, **Appareils** → `…/explore/dataset/<jeu>/`.

### 2. Architecture des contextes — cinq contextes imbriqués + un sixième pour la facette

```
ods-dataset-context ctxfiltreaca          (profils — alimente UNIQUEMENT la facette académie)
└ ctxprofils           (profils)   ← refine.academie + q
  └ ctxprofilsnational (profils)   ← q seul
    └ ctxservices      (services)  ← refine.academie + q
      └ ctxprofilsappareils        ← refine.academie + q
        └ ctxappareils             ← refine.academie + q  … et 0 agrégation
```

Les paramètres sont posés par une **unique expression d'interpolation à effet de bord** en tête du
bloc (`{{ ctxprofils.parameters = {…}; ctxservices.parameters = {…}; … ; '' }}`).

**Le filtre d'année passe par `q`, pas par un refine** :
`q = 'debutsemaine >= "2025/08/01" AND debutsemaine <= "2026/07/31"'` — une clause de champ
injectée dans le paramètre de recherche plein texte de l'API v1.

**`ctxfiltreaca` ne reçoit ni refine ni `q`** : la liste des académies est donc calculée sur
**l'intégralité du jeu**, toutes années confondues. Un utilisateur peut choisir une académie qui
n'a aucune ligne pour l'année sélectionnée.

### 3. « Vue d'ensemble nationale » — 4 KPI (`ctxprofilsnational`, insensibles à l'académie)

| Carte | Formule | 2025-2026 | 2024-2025 | 2026-2027 |
|---|---|---:|---:|---:|
| VISITES ENT (bleu) | `SUM(visites_globales)` | **649 492 449** | 771 736 489 | 5 121 954 |
| VISITES ENSEIGNANTS (vert) | `SUM(visites_enseignant)` | **124 802 399** | 106 113 305 | 1 469 755 |
| VISITES ÉLÈVES (orange) | `SUM(visites_eleve)` | **261 014 932** | 468 195 843 | 1 470 069 |
| VISITES PARENTS (rose) | `SUM(visites_parent)` | **243 368 682** | 182 226 220 | 1 917 779 |

Sous-titre de la première carte : l'année scolaire courante (`{{parameters.schoolyearlabel}}`).
Filtre `| number` d'AngularJS → séparateurs de milliers par espace fine.

### 4. « Vue nationale et locale » — deux panneaux de contrôle

**a) Année scolaire** : trois boutons pilule **2024-2025**, **2025-2026** (actif au chargement),
**2026-2027**. Chaque `ng-click` réécrit `parameters.schoolyearlabel` **et** la chaîne
`schoolyearquery`. Pas de select, pas de « toutes les années », pas de 2023-2024 ni antérieur —
alors que le jeu remonte à **septembre 2019**.

**b) Filtre académie** : `<ods-select multiple="false">` alimenté par
`ods-facet-results="facetsAcademie"` (`sort="alphanum"`), placeholder « **Vue nationale —
sélectionner une académie** », bouton **Réinitialiser** (`parameters.acaselection = ''`).
**Sans compteurs** à l'écran.

### 5. « Profils utilisateurs » (`ctxprofils`)

Quatre cartes `SUM` : Élèves (`visites_eleve`), Parents (`visites_parent`),
Enseignants (`visites_enseignant`), Admin / vie scolaire / tech (`visites_admin_vie_scol_tech`).

Puis **« Lecture comparative des profils »** : quatre lignes `libellé / piste grise / barre / valeur`.
La largeur est calculée en Angular, **normalisée sur la somme des quatre seules valeurs
affichées** : `width = v / (e + p + ens + admin) * 100 %`.
Cela impose **quatre `ods-aggregation` supplémentaires**, en doublon exact des quatre KPI
au-dessus — mêmes contexte, mêmes expressions, mêmes fonctions, autres noms de variables.

Valeurs relevées, **2025-2026 national** : Élèves 261 014 932 (40,2 %) · Parents 243 368 682
(37,5 %) · Enseignants 124 802 399 (19,2 %) · Admin 19 377 465 (3,0 %).
Somme = 648 563 478, soit **928 971 de moins que `visites_globales`** (649 492 449). L'écart n'est
ni affiché ni expliqué.

Couleurs : bleu RF, vert, orange brûlé, rouge/rose. **Aucune légende** : la couleur ne porte rien
(chaque barre est déjà étiquetée), elle est décorative.

### 6. « Services ENT » (`ctxservices`)

- Une grande carte **« SERVICE LE PLUS STRUCTURANT / Vie scolaire »** —
  **le libellé « Vie scolaire » est écrit en dur dans le template**, seule la valeur est calculée
  (`SUM(visites_services_vie_scolaire)`).
- Quatre mini-cartes : Courrier électronique, Cahier de textes, Notes, Production collaborative.
- **« Lecture comparative des services »** : cinq barres, normalisées sur la somme des cinq.

Valeurs relevées, **2025-2026 national** :

| Service | Visites | Part des 5 affichés |
|---|---:|---:|
| Courrier électronique | **198 425 504** | 39,0 % |
| Vie scolaire | 197 863 169 | 38,9 % |
| Cahier de textes | 64 388 531 | 12,7 % |
| Production collaborative | 47 463 878 | 9,3 % |
| **Notes** | **1 644** | **0,0003 %** |

**Le « service le plus structurant » n'est pas le premier.** Vérifié aussi en **2026-2027**
(Courrier 2 438 042 contre Vie scolaire 1 162 625, soit plus du double) et en **Corse 2025-2026**
(là, Vie scolaire 1 142 868 > Courrier 696 164 — le libellé est donc juste *par endroits*, ce qui
est pire qu'un libellé franchement faux).

**`visites_notes` s'est arrêté** : 197 507 603 sur tout l'historique, **1 644 en 2025-2026**,
**0 en 2026-2027**. La page affiche « NOTES 0 » et une barre à 0,0003 % sans le signaler.

**19 services sur 24 ne sont jamais montrés** : accueil (le plus gros de tous, 2 573 827 261 en
cumul), actualités, cahier de liaison, messagerie instantanée, visioconférence, stockage partagé,
documentation CDI, parcours pédagogique, réservation de salles, service collectivité, gestion du
temps, absences, gestion des compétences, manuel numérique, ressource multimédia, ressource
orientation, ressource production, ressource accompagnement/entraînement, ressource
référence/dictionnaire, ressource documentaire. La « répartition entre les principaux services
ENT » porte donc sur un cinquième des services et **ne totalise pas 100 % de l'usage**.

### 7. « Modes d'accès » (`ctxprofilsappareils`)

Deux cartes de trois KPI (Ordinateur / Smartphone / Tablette), pour les élèves puis les parents,
puis **« Lecture comparative des modes d'accès »** : deux blocs de trois barres, chacun normalisé
sur ses trois valeurs.

**2025-2026 national** :

| | Ordinateur | Smartphone | Tablette |
|---|---:|---:|---:|
| Élèves | 89 240 445 (44,2 %) | **108 531 590 (53,8 %)** | 3 995 791 (2,0 %) |
| Parents | 22 096 691 (17,8 %) | **101 170 716 (81,7 %)** | 585 539 (0,5 %) |

**Corse 2025-2026** : élèves 731 775 / 535 228 / 22 576 ; parents 72 332 / 183 071 / 1 481.
La quatrième modalité du jeu (`visites_*_autresappareil`) est ignorée, donc les pourcentages
affichés ne sont pas ceux de la donnée.

Aucun graphique pour enseignants ni admin, bien que les colonnes existent.

### 8. « Territoires » — deux cartes

**a) Territoire observé** : « VUE AFFICHÉE » (académie ou « National ») + l'année, puis trois KPI
sur `ctxprofils` : **Visites ENT** (`SUM visites_globales`), **Utilisateurs**
(`SUM utilisateurs_globales`), **Enregistrements** (`COUNT`).
National 2025-2026 : 649 492 449 / 143 170 883 / **1 476 743**.
Corse 2025-2026 : 2 945 299 / 687 455 / **3 207**.

**b) Comparaison locale / nationale** : deux grands nombres côte à côte, sans barre.
Sous-titre, mot pour mot : « Comparaison en valeurs connectées. **Les barres ont été retirées pour
éviter toute proportion fausse.** » — l'auteur signale lui-même que les barres normalisées du reste
de la page posent problème.
**Au chargement (vue nationale), la carte affiche deux fois le même nombre** :
« Vue affichée 649 492 449 » et « National 649 492 449 ».

### 9. Ce que la page ne rend pas

Aucun graphique DSFR Chart, aucune carte, aucune série temporelle, aucun tableau, aucun export,
aucun lien vers la licence. Toutes les « visualisations » sont des `<div>` à largeur en pourcentage.

## Mesure de performance (chronométrée, pas supposée)

**Au chargement**, relevé via `performance.getEntriesByType('resource')` : **47 appels API**, dont
**39 `/api/records/1.0/analyze/`** — un par `ods-aggregation` (39 dans le template, comptés :
12 `ctxprofils`, 12 `ctxprofilsappareils`, 10 `ctxservices`, 5 `ctxprofilsnational`).
Médiane 25 ms, max 132 ms, **somme des durées 1 250 ms**.

**Changer d'année scolaire** : **39 requêtes rejouées**, somme des durées **10 589 ms**, max 429 ms.
**Changer d'académie** : **34 requêtes** (les 5 de `ctxprofilsnational` ne se rejouent pas — c'est
correct).

Ce n'est pas le poids qui coûte (chaque réponse fait quelques centaines d'octets), **c'est le
nombre d'allers-retours**. Mesuré en ligne de commande, trois fois chacun :

| Requête | Poids | Durée |
|---|---:|---:|
| 1 agrégat v1 `analyze` (`SUM visites_globales`, 2025-2026) | — | 0,18 / 0,11 / 0,11 s |
| **v2.1 : 5 sommes en un seul appel** (profils, même `where`) | ~200 o | **0,10 / 0,11 / 0,15 s** |
| **v2.1 : les 24 sommes de services en un seul appel** | **847 o** | 2,99 / 0,51 / 0,98 s |
| v2.1 : `group_by=academie` + somme (3,9 M lignes) | 1 578 o | 0,25 / 0,10 / 0,09 s |
| v2.1 : `group_by=debutsemaine` + 4 sommes, une année (**52 semaines**) | **5 494 o** | **0,17 / 0,10 / 0,10 s** |

Conclusion mesurée : **les 39 requêtes de la page tiennent en 4** (une par jeu), pour un coût
serveur du même ordre par requête. Et la série hebdomadaire que la page n'affiche pas coûte
**0,10 s et 5,5 Ko**.

## Défauts et bizarreries de l'original

1. **`dmna` dans l'URL** au lieu de `dnma`, et **`-v2`** en suffixe public.
2. **39 requêtes là où 4 suffisent.** Chaque clic d'année en rejoue 39, chaque changement
   d'académie 34. Chronométré ci-dessus.
3. **Huit des 39 agrégations sont des doublons exacts** : les quatre `barProfil*` répètent les
   quatre `aggProfil*`, et cinq `barService*` répètent quatre `aggService*` + le focus. Mêmes
   contexte, expression et fonction, seul le nom de variable change — parce qu'AngularJS n'expose
   pas une valeur d'agrégation en dehors de l'élément qui la déclare, d'où six `<div>` imbriqués
   uniquement pour porter des directives.
4. **« Service le plus structurant : Vie scolaire » est écrit en dur** alors que Courrier
   électronique le dépasse au national, sur les deux années où les deux sont peuplées.
   Un libellé statique posé sur une valeur dynamique.
5. **Un contexte entièrement mort** : `ctxappareils` sur `fr-en-dnma-par-uai-appareils`
   (3,88 M lignes, 73 colonnes) est déclaré, initialisé, ses paramètres sont recalculés à chaque
   filtre — et **aucune agrégation ne le lit**. Le jeu qui porte navigateurs et systèmes
   d'exploitation n'apparaît nulle part à l'écran.
6. **Les barres ne sont pas des parts du tout.** Chaque groupe est normalisé sur la somme de ses
   propres items affichés : les services « pèsent » sur 5 des 24, les appareils sur 3 des 4.
   « Courrier électronique 39 % » n'est pas 39 % des visites de service. **La page le sait** —
   la carte de comparaison territoriale dit explicitement que « les barres ont été retirées pour
   éviter toute proportion fausse ».
7. **La somme des profils ne fait pas le total.** 648 563 478 contre 649 492 449 en 2025-2026
   (−928 971). Rien n'explique l'écart (profils non catégorisés ?).
8. **Le KPI « NOTES » affiche 0** en 2026-2027 et 1 644 en 2025-2026, contre 197,5 M en cumul
   historique : la colonne a cessé d'être alimentée. Affiché sans avertissement, à côté de valeurs
   à 9 chiffres.
9. **Rupture de série entre années, non signalée** : visites élèves 468 M (2024-2025) → 261 M
   (2025-2026), pendant que les visites parents font 182 M → 243 M. Un basculement de cette
   ampleur sur un an relève du changement de méthode, pas de l'usage — et la page invite pourtant
   à comparer les années d'un clic.
10. **La liste des académies ignore l'année choisie** (`ctxfiltreaca` n'a ni refine ni `q`) : on
    peut sélectionner une académie vide pour la période et obtenir une page de zéros.
11. **La comparaison local/national affiche deux fois le même nombre** à l'état initial.
12. **Aucune série temporelle** sur quatre jeux hebdomadaires déclarés `timeserie` et remontant à
    2019. C'est le manque le plus lourd : la question « est-ce que ça monte ? » n'a pas de réponse.
13. **Trois années seulement**, en boutons figés (2024-2025, 2025-2026, 2026-2027), pour un
    historique de sept années scolaires. Les libellés sont écrits en dur avec leurs bornes.
14. **2026-2027 est une année en cours de trois semaines** (5,1 M de visites) placée sur le même
    plan que deux années pleines, sans mention de complétude.
15. **`Etranger` (79 lignes) figure dans la liste des académies** au même rang que Versailles
    (303 524).
16. **Aucun grain sous l'académie** : `departement`, `commune`, `uai`, `secteur`, `nature_uai`,
    `circonscription` existent dans les quatre jeux et ne sont jamais exposés.
17. **Les titres de cartes sont des `<div>`**, pas des titres : le document n'a qu'un `h3` pour
    une vingtaine de blocs.
18. **Aucune synchronisation d'URL** : ni l'année ni l'académie ne sont dans l'adresse.
19. **Aucun accès à la donnée** : les quatre liens d'en-tête pointent vers `/explore/dataset/<jeu>/`
    (URL de l'ancien explorateur), aucun export, aucune licence affichée.
20. **Aucune erreur console relevée.** (Le relevé a démarré après le chargement : à confirmer sur
    un rechargement si l'on veut en faire un constat ferme.)

## Transposition vers `dsfr-data`

### Architecture retenue et pourquoi — le seul vrai arbitrage du lot

12,35 millions de lignes. **Tout charger côté client est exclu**, et il n'y a pas à en débattre.
Les trois architectures possibles, et le verdict mesuré :

| Architecture | Verdict |
|---|---|
| Tout côté client (`/exports/json`) | **exclu** : 12,35 M lignes |
| `server-side` + pagination (le motif « liste ») | **hors sujet** : la page n'affiche aucune ligne, uniquement des agrégats |
| **Agrégation serveur dans la source** (`select="sum(...) as ..."`) | **retenu** : une requête par jeu, ~200 à 850 octets de réponse, 0,10 à 0,50 s mesurés |

`dsfr-data-source` porte nativement `select`, `where`, `group-by`, `aggregate` et les transmet à
l'adaptateur ODS. **Une source = une requête = une ligne de résultat portant N sommes**, que N KPI
lisent ensuite par `value="champ:max"`. C'est le renversement décisif : là où ODS impose *une
directive = une requête*, `dsfr-data` permet *une requête = N indicateurs*.

**39 requêtes deviennent 4 sources** :

| Source | Requête | Alimente |
|---|---|---|
| `s-profils-nat` | `select=sum(visites_globales) as g, sum(visites_eleve) as e, …` (5 sommes) | 4 KPI nationaux |
| `s-profils` | idem + `where` académie | 4 KPI + 4 barres + 3 KPI territoire + comparaison |
| `s-services` | `select=` **les 24 sommes** (847 o mesurés) | focus + 4 minis + barres — et les 19 services manquants |
| `s-appareils` | `select=` les 16 sommes profil × appareil | 6 KPI + 6 barres |

Plus **une cinquième source pour la série temporelle** que l'original n'a pas :
`group-by="debutsemaine"` + 4 sommes = **52 lignes, 5,5 Ko, 0,10 s**.

### Correspondance directive → composant

| Bloc / directive AngularJS ODS | Composant + attributs `dsfr-data` |
|---|---|
| 5 `ods-dataset-context` imbriqués + 1 pour la facette | **4 `<dsfr-data-source api-type="opendatasoft">`**, à plat. Le 5ᵉ (`ctxappareils`) est supprimé — ou branché sur un vrai bloc, voir plus bas |
| `{{ ctxX.parameters = {…}; '' }}` posé sur 5 contextes | **un `<dsfr-data-context id="ctx" sources="s-profils s-services s-appareils s-semaine" url-sync>`** : `sources` prend plusieurs ids séparés par des espaces. C'est exactement le composant fait pour « un filtre commun, plusieurs sources » |
| `refine.academie` propagé à 4 contextes | `<dsfr-data-context-filter field="academie" operator="eq" ui="sel-aca">` — **un seul filtre**, diffusé aux 4 sources |
| `q = 'debutsemaine >= "2025/08/01" AND …'` (clause de champ dans le plein texte) | `<dsfr-data-context-filter field="debutsemaine" operator="between" ui="an-debut an-fin">` (deux ids d'UI). ⚠️ **Piège AM-029** : `year-of`/`month-of` lisent « AAAA » / « AAAA-MM » ; une date complète donne un filtre **silencieusement absent**. Ici l'année **scolaire** ne coïncide pas avec l'année civile : `between` sur deux dates est la bonne voie, `year-of` ne convient pas |
| 3 boutons d'année en dur (2024-25 / 25-26 / 26-27) | `<select id="an">` peuplé à la main (l'année scolaire n'est pas une valeur du jeu) + `between`. Voie native alternative : `dsfr-data-normalize compute` pour dériver une colonne `annee_scolaire`… **impossible** : `compute` ne fait ni condition ni fonction de date. Voir § Limites |
| `<ods-select>` académie sans compteurs, calculé hors filtre d'année | `<dsfr-data-facets id="f-aca" source="s-profils" context="ctx" server-facets fields="academie" display="academie:select" sort="alpha:asc">` — **`server-facets` est le mode à essayer avant de conclure quoi que ce soit** : sur un adaptateur ODS il va chercher `/facets`, avec **compteurs** et **cascade** tenant compte des autres filtres. C'est précisément ce qui manque à l'original (défaut 10) |
| bouton **Réinitialiser** | `<dsfr-data-context-tags context="ctx" clear-all>` |
| 39 `ods-aggregation` | **0** : les sommes sont dans le `select` des sources ; chaque KPI lit un champ par `value="champ:max"` |
| KPI `SUM(visites_globales)` = 649 492 449 | `<dsfr-data-kpi source="s-profils-nat" value="g:max" format="compact" unit="visites" label="Visites ENT">` → « 649,5 M ». `format="compact"` évite les 9 chiffres bruts (AM-031) |
| les 4 KPI côte à côte | `<dsfr-data-kpi-group>` + `col="3"`. **Pas de `display:block`** sur le groupe (PG-011) |
| barres de proportion des profils (4 `<div>` + 4 agrégations doublons) | `<dsfr-data-unpivot id="u-profils" source="s-profils" value-cols="e:Élèves, p:Parents, ens:Enseignants, adm:Admin / vie scolaire / tech" var-name="profil" value-name="visites">` puis `<dsfr-data-chart type="bar" horizontal label-field="profil" value-field="visites">`. **`dsfr-data-unpivot` est le composant fait pour ça** : il bascule un tableau « wide » (modalités dans les noms de colonnes) en long/tidy, et l'alias inline `col:Libellé` donne directement les libellés d'affichage |
| barres des services (5 sur 24) | même motif sur les 24 sommes → **un graphique en barres horizontales trié des 24 services**, ce qui règle le défaut 6 sans effort supplémentaire (la voie native pour une répartition par catégorie est justement la barre horizontale triée) |
| barres des appareils (3 sur 4, ×2 profils) | `unpivot` sur les 16 colonnes + `series-field="profil"` sur un `type="bar" stacked` : les 4 profils × 4 appareils en une lecture, la quatrième modalité comprise |
| « SERVICE LE PLUS STRUCTURANT / Vie scolaire » en dur | `<dsfr-data-query id="top-svc" source="u-services" order-by="visites:desc" limit="1">` + `<dsfr-data-kpi source="top-svc" value="visites:max" heading="Service le plus utilisé" label="…">`. Le libellé suit la donnée. **Le nom du service** dans le titre demande une interpolation de texte : voir § Limites |
| « Comparaison locale / nationale » (2 nombres) | 2 `dsfr-data-kpi`, l'un sur `s-profils`, l'autre sur `s-profils-nat`. Et la part locale : `lines='[{"value":"part:max","suffix":"du national"}]'` sur un `compute` |
| **manque : la série hebdomadaire** | `<dsfr-data-source id="s-semaine" … group-by="debutsemaine" select="sum(visites_globales) as v, sum(visites_eleve) as e, sum(visites_parent) as p, sum(visites_enseignant) as ens">` + `<dsfr-data-chart type="line" label-field="debutsemaine" value-fields="e:Élèves, p:Parents, ens:Enseignants">`. **52 points, 5,5 Ko, 0,10 s mesurés.** L'alias inline `champ:Libellé` de `value-fields` nomme les séries sans `name` |
| **manque : la carte académique** | `<dsfr-data-source id="s-aca" … group-by="academie" select="sum(visites_globales) as v">` + `<dsfr-data-chart type="map-aca" code-field="academie" value-field="v">` — 0,09 s mesuré. Voir § Limites pour les libellés hors découpage |
| **manque : le classement des académies** | `<dsfr-data-podium source="s-aca" label-field="academie" value-field="v" max-items="10">` |
| **manque : le jeu `appareils` (navigateurs, OS)** | `unpivot` sur les 8 colonnes `visites_<os>` et les 10 `visites_<navigateur>` → deux graphiques de plus, pour le prix de 2 requêtes |
| **manque : URL partageable** | `url-sync` sur `dsfr-data-context` — un seul point pour l'année **et** l'académie **et** la facette |
| kebab / export absents | `databox databox-download databox-screenshot databox-source="DNE — DNMA, Licence Ouverte 2.0"` sur chaque graphique |
| titres de cartes en `<div>` | `heading-level="2"` sur les `databox` (RGAA 9.1) |
| — | `<dsfr-data-a11y for="…" table download>` sous chaque graphique |

### Esquisse de code

```html
<!-- ============ 4 sources = 4 requêtes = tout le tableau de bord ============ -->
<!-- National : insensible à l'académie, sensible à l'année. -->
<dsfr-data-source id="s-profils-nat" api-type="opendatasoft"
  base-url="https://data.education.gouv.fr" dataset-id="fr-en-dnma-par-uai-profils"
  select="sum(visites_globales) as g, sum(visites_eleve) as e, sum(visites_parent) as p,
          sum(visites_enseignant) as ens, sum(visites_admin_vie_scol_tech) as adm"></dsfr-data-source>

<!-- Local : même select, mais dans le contexte (donc filtré par académie ET par année). -->
<dsfr-data-source id="s-profils" api-type="opendatasoft"
  base-url="https://data.education.gouv.fr" dataset-id="fr-en-dnma-par-uai-profils"
  select="sum(visites_globales) as g, sum(utilisateurs_globales) as u, sum(visites_eleve) as e,
          sum(visites_parent) as p, sum(visites_enseignant) as ens,
          sum(visites_admin_vie_scol_tech) as adm"></dsfr-data-source>

<!-- Les 24 services en un appel : 847 octets mesurés (l'original en montre 5 sur 24). -->
<dsfr-data-source id="s-services" api-type="opendatasoft"
  base-url="https://data.education.gouv.fr" dataset-id="fr-en-dnma-par-uai-services"
  select="sum(visites_accueil) as accueil, sum(visites_services_vie_scolaire) as vie_scolaire,
          sum(visites_courrier_electronique) as courriel, sum(visites_cahier_textes) as cahier_textes,
          sum(visites_notes) as notes, sum(visites_production_collaborative) as collaboratif,
          sum(visites_actualites) as actualites, sum(visites_absences) as absences
          /* … les 16 autres … */"></dsfr-data-source>

<!-- Profils × appareils : 16 sommes en un appel. -->
<dsfr-data-source id="s-appareils" api-type="opendatasoft"
  base-url="https://data.education.gouv.fr" dataset-id="fr-en-dnma-par-uai-profils-appareils"
  select="sum(visites_eleve_ordinateur) as e_ordi, sum(visites_eleve_smartphone) as e_tel,
          sum(visites_eleve_tablette) as e_tab, sum(visites_eleve_autresappareil) as e_autre,
          sum(visites_parent_ordinateur) as p_ordi, sum(visites_parent_smartphone) as p_tel,
          sum(visites_parent_tablette) as p_tab, sum(visites_parent_autresappareil) as p_autre
          /* … enseignant, admin … */"></dsfr-data-source>

<!-- Ce que l'original n'a pas : la série hebdomadaire (52 points, 5,5 Ko, 0,10 s). -->
<dsfr-data-source id="s-semaine" api-type="opendatasoft"
  base-url="https://data.education.gouv.fr" dataset-id="fr-en-dnma-par-uai-profils"
  group-by="debutsemaine" order-by="debutsemaine"
  select="sum(visites_eleve) as e, sum(visites_parent) as p, sum(visites_enseignant) as ens"></dsfr-data-source>

<!-- … et la carte académique (0,09 s). -->
<dsfr-data-source id="s-aca" api-type="opendatasoft"
  base-url="https://data.education.gouv.fr" dataset-id="fr-en-dnma-par-uai-profils"
  group-by="academie" select="sum(visites_globales) as v" order-by="v desc"></dsfr-data-source>

<!-- ============ UN contexte pour QUATRE sources, et l'URL avec ============ -->
<div class="odv-filtres fr-mb-4w">
  <label class="fr-label" for="an">Année scolaire</label>
  <select class="fr-select" id="an">
    <option value="2019-09-01">2019-2020</option>
    <!-- … -->
    <option value="2025-08-01" selected>2025-2026</option>
    <option value="2026-08-01">2026-2027</option>
  </select>
  <!-- borne haute : second contrôle, l'opérateur « between » lit deux ids -->
  <input type="hidden" id="an-fin" value="2026-07-31">
</div>

<dsfr-data-context id="ctx" sources="s-profils s-services s-appareils s-semaine s-aca" url-sync>
  <dsfr-data-context-filter field="debutsemaine" operator="between" ui="an an-fin"
    label="Année scolaire"></dsfr-data-context-filter>
</dsfr-data-context>

<dsfr-data-facets id="f-aca" source="s-profils" context="ctx" server-facets
  fields="academie" labels="academie:Académie" display="academie:select"
  sort="alpha:asc"></dsfr-data-facets>
<dsfr-data-context-tags context="ctx" clear-all></dsfr-data-context-tags>

<!-- ============ KPI : plus une seule requête dédiée ============ -->
<dsfr-data-kpi-group>
  <dsfr-data-kpi source="s-profils-nat" value="g:max"   format="compact" unit="visites"
    heading="National" label="Visites ENT" col="3"></dsfr-data-kpi>
  <dsfr-data-kpi source="s-profils-nat" value="ens:max" format="compact" unit="visites"
    heading="National" label="Enseignants" col="3"></dsfr-data-kpi>
  <dsfr-data-kpi source="s-profils-nat" value="e:max"   format="compact" unit="visites"
    heading="National" label="Élèves" col="3"></dsfr-data-kpi>
  <dsfr-data-kpi source="s-profils-nat" value="p:max"   format="compact" unit="visites"
    heading="National" label="Parents" col="3"></dsfr-data-kpi>
</dsfr-data-kpi-group>

<!-- ============ Profils : le « wide » redressé ============ -->
<dsfr-data-unpivot id="u-profils" source="s-profils"
  value-cols="e:Élèves, p:Parents, ens:Enseignants, adm:Admin / vie scolaire / tech"
  var-name="profil" value-name="visites"></dsfr-data-unpivot>
<dsfr-data-chart id="g-profils" source="u-profils" type="bar" horizontal
  label-field="profil" value-field="visites" name="Visites"
  databox databox-title="Visites par profil" heading-level="2"
  databox-source="DNE — fr-en-dnma-par-uai-profils, Licence Ouverte 2.0"
  databox-download></dsfr-data-chart>
<dsfr-data-a11y for="g-profils" source="u-profils" table download></dsfr-data-a11y>

<!-- ============ Services : les 24, pas 5 ============ -->
<dsfr-data-unpivot id="u-services" source="s-services"
  value-cols="accueil:Accueil, vie_scolaire:Vie scolaire, courriel:Courrier électronique,
              cahier_textes:Cahier de textes, notes:Notes, collaboratif:Production collaborative,
              actualites:Actualités, absences:Absences"
  var-name="service" value-name="visites" drop-empty></dsfr-data-unpivot>
<dsfr-data-query id="q-services" source="u-services" order-by="visites:desc"></dsfr-data-query>
<dsfr-data-chart id="g-services" source="q-services" type="bar" horizontal
  label-field="service" value-field="visites" name="Visites"
  databox databox-title="Visites par service ENT" databox-download></dsfr-data-chart>

<!-- Le « service le plus utilisé », calculé et non écrit en dur -->
<dsfr-data-query id="top-svc" source="q-services" limit="1"></dsfr-data-query>
<dsfr-data-kpi source="top-svc" value="visites:max" format="compact" unit="visites"
  heading="Service le plus utilisé"></dsfr-data-kpi>

<!-- ============ Appareils : 4 profils × 4 appareils, empilés ============ -->
<dsfr-data-unpivot id="u-app" source="s-appareils"
  value-cols="e_ordi:Élèves — ordinateur, e_tel:Élèves — smartphone, e_tab:Élèves — tablette,
              e_autre:Élèves — autre, p_ordi:Parents — ordinateur, p_tel:Parents — smartphone,
              p_tab:Parents — tablette, p_autre:Parents — autre"
  var-name="cle" value-name="visites"></dsfr-data-unpivot>
<dsfr-data-chart id="g-app" source="u-app" type="bar" horizontal
  label-field="cle" value-field="visites" databox databox-download></dsfr-data-chart>

<!-- ============ Ce que l'original n'a pas ============ -->
<dsfr-data-chart id="g-semaine" source="s-semaine" type="line"
  label-field="debutsemaine" value-fields="e:Élèves, p:Parents, ens:Enseignants"
  databox databox-title="Visites hebdomadaires par profil" databox-download></dsfr-data-chart>
<dsfr-data-a11y for="g-semaine" source="s-semaine" table download></dsfr-data-a11y>

<dsfr-data-chart id="c-aca" source="s-aca" type="map-aca"
  code-field="academie" value-field="v" name="Visites" unit-tooltip="visites"
  databox databox-title="Visites ENT par académie" databox-download></dsfr-data-chart>
<dsfr-data-podium source="s-aca" label-field="academie" value-field="v"
  value-unit="visites" max-items="10"></dsfr-data-podium>
```

## Limites et points durs identifiés

> **Cible : `dsfr-data` 0.25.0** (`_CIBLE-0.25.md`), pas le `dsfr-data@0.20.0` épinglé par le
> dépôt. Quatre verdicts : **natif** / **natif mais postérieur à 0.20.0** / **prévu à un jalon**
> (numéro d'issue) / **manque réel**. Vérifications faites au source
> (`~/Developer/GitHub/dsfr-data`, HEAD = release 0.23.0) et dans le bundle DSFR Chart livré.

### Corrections après lecture du source (natif, postérieur à 0.20.0)

- **`meta.truncated`** (#658, 0.22.0) : une source qui ne livre qu'un sous-ensemble le dit, et le
  volet Diagnostic rend « tronqué à N / total lignes ». Sur des jeux de 3,9 M lignes, c'est le
  garde-fou qui manquait.
- **`value="meta:total"`** sur un KPI (#659, 0.22.0) : le total serveur, là où `count` ne compte
  que les lignes reçues. Directement utile au KPI « Enregistrements » de la carte Territoires.
- **Alias inline `col:Libellé` sur `value-cols` d'`unpivot`** (#668, 0.22.0) — c'est ce qui rend
  le repli des 24 colonnes de services lisible sans table de correspondance.
- **Une fonction d'agrégat inconnue lève une erreur de configuration** (#649, 0.21.1) au lieu de
  produire un 0 plausible. Sur une page à 39 agrégats, ce n'est pas un détail.
- **Blocs `{{#if}}` / `{{#unless}}` et pipes `:number:2`, `:date`, `:join`, `:url`** dans les
  templates de `dsfr-data-display` (#662, #663, #664, 0.22.0) : le piège AM-039 du `CLAUDE.md`
  décrit 0.20.0 et **est périmé**.

### Prévu à un jalon

- **Les parts (« 40,2 % des visites »)** que la page calcule à la main en divisant quatre
  agrégats : **#673** (ratio de deux agrégats, `value="<expr> / <expr>"`) et **#674** (`where` sur
  le KPI), v0.24.0. Aujourd'hui il faut passer par `compute` sur un résultat agrégé.
- **« Combien d'UAI distincts ? »** — la question qu'on se pose immédiatement sur un jeu
  UAI × semaine, et qu'aucun bloc de la page ne pose : **#672** (`count(distinct)`, v0.24.0).
- **Une colonne dérivée conditionnelle** (période scolaire / été, seuil d'intensité) : **#671**
  (`compute` v2 `when … then … else`, v0.24.0).
- **Le mur des 10 000 offsets** : sans objet ici, parce que **rien n'est chargé côté client** —
  les quatre sources n'exposent que des agrégats serveur. **#689** (`fetch-mode="export"`,
  v0.25.0) ne concerne pas cette page, et c'est en soi un enseignement : sur 12,35 M lignes,
  le bon réflexe n'est pas de mieux charger, c'est de ne pas charger.

### Manques réels

1. **Aucun opérateur d'« année scolaire ».**
   *Établi* : les opérateurs de `dsfr-data-context-filter` sont `eq, in, lt, gte, between,
   contains, month-of, year-of, lt-day-after, last-n-days, current-year, current-month`
   (référence + source). Tous raisonnent en **année civile** ou en fenêtre glissante.
   L'année scolaire (1ᵉʳ août → 31 juillet) n'existe nulle part, et `year-of` est **activement
   trompeur** ici : il tronque à l'année civile et couperait chaque année scolaire en deux, en
   silence.
   *Voie native retenue* : `operator="between"` avec deux contrôles d'UI, et un `<select>` dont
   chaque `<option value>` porte la borne basse — ce que fait l'original en substance, mais avec
   trois années écrites en dur au lieu des sept que contient le jeu.
   *Pourquoi c'est un constat et pas un caprice* : l'année scolaire est **l'unité de temps du
   portail Éducation**, comme l'exercice budgétaire l'est ailleurs. Elle apparaîtra sur toutes les
   pages de ce portail qui portent une date. Bercy n'avait ni ce besoin ni ce découpage — c'est
   exactement le type de résidu que l'extension à un second portail devait faire apparaître.
   *Demande* : `operator="school-year"` (ou un `year-of` avec un mois de bascule paramétrable,
   `year-start-month="8"`), qui produirait la plage `[1er août N, 1er août N+1)`.
   *Rien au source, rien au backlog v0.24/v0.25 au 2026-09-10.* **Manque réel.**
2. **Les compteurs de facette sur une table de mesures ne veulent rien dire.**
   *Établi à l'écran* : la facette `academie` de cette page compte des **lignes UAI × semaine** —
   « Lille 326 879 », « Versailles 303 524 ». Un lecteur y lit spontanément un volume d'usage ;
   c'est un nombre de lignes techniques, et il classe Lille devant Versailles alors que Versailles
   a plus de visites. `dsfr-data-facets` (en local comme en `server-facets`) ne sait compter que
   des lignes : aucun attribut ne permet de pondérer une facette par une mesure.
   *Voie native essayée* : `hide-counts` — masquer plutôt que tromper. C'est le bon réflexe ici,
   et c'est une régression d'information.
   *Pourquoi c'est propre à ce portail* : les jeux de Bercy sont très majoritairement « une ligne =
   un objet » (un établissement, une commune), où le compte de lignes **est** l'information. Les
   quatre jeux DNMA sont des tables de faits hebdomadaires : le compte de lignes n'y a aucun sens
   métier. Trois des jeux du portail Éducation dépassent 3 M de lignes sur ce modèle.
   *Demande* : `weight-field="visites_globales"` sur `dsfr-data-facets` (compteur = somme d'une
   mesure au lieu d'un nombre de lignes), au moins en mode local ; en `server-facets`, ODS ne le
   sait pas faire non plus, donc l'alternative honnête serait un `hide-counts` **automatique**
   assorti d'un avertissement.
   *Rien au source, rien au backlog.* **Manque réel.**
3. **`type="map-aca"` : neuf des 35 académies de ce jeu tombent, et `getSkippedCount()` renvoie 0.**
   *Établi par lecture du code, pas au navigateur.*
   Dans `dsfr-data-chart.ts` (`_processMapData`), la branche `map-aca` fait **uniquement**
   `code.toUpperCase()` et ne compte comme ignorée qu'une chaîne **vide**. Les clés du découpage
   `aca` extraites du bundle livré (`@gouvfr/dsfr-chart/dist/MapChart/MapChart.js`) sont **30, en
   majuscules non accentuées** (AIX-MARSEILLE, AMIENS, BESANCON, … ORLEANS-TOURS, …, GUADELOUPE,
   MARTINIQUE, GUYANE, **REUNION**, MAYOTTE).
   *Conséquence chiffrée sur ce jeu* : `academie` y est stocké **en casse normale accentuée**
   (« Orléans-Tours », « Besançon », « Créteil »). Après `toUpperCase()` on obtient
   `ORLÉANS-TOURS`, `BESANÇON`, `CRÉTEIL` — qui ne sont **pas** les clés. S'y ajoutent
   `LA RÉUNION` (la clé est `REUNION`, sans article ni accent), `POLYNÉSIE FRANÇAISE`,
   `NOUVELLE-CALÉDONIE`, `ETRANGER`, `SAINT-PIERRE-ET-MIQUELON`, `WALLIS-ET-FUTUNA`.
   **Neuf académies sur 35 muettes, sans warning, avec `getSkippedCount() = 0`.**
   *Le point qui fait la démonstration* : le jeu Capytale du **même portail** stocke ces mêmes
   académies en `MAJUSCULES SANS ACCENTS` et n'en perd que trois. **Deux jeux du même producteur,
   deux normalisations opposées, aucune des deux détectée.** Une désaccentuation dans
   `_processMapData` réglerait les six accents d'un coup.
   *Rapport avec `_CIBLE-0.25.md` point 4* : à **fusionner** avec ce constat, qui y est noté
   « établi par lecture du code, non rejoué ». Ce que cette page ajoute : les 30 clés exactes du
   bundle, le cas `LA RÉUNION` / `REUNION` (article **et** accent), et la contradiction entre deux
   jeux du même portail.
   *Deux demandes distinctes* : (a) chez `dsfr-data`, désaccentuer et normaliser la clé `aca`,
   **et compter comme ignorée** toute clé hors découpage ; (b) chez `GouvernementFR/dsfr-chart`,
   le découpage `aca` ignore AEFE, la Polynésie française, la Nouvelle-Calédonie,
   Wallis-et-Futuna et Saint-Pierre-et-Miquelon (règle 4 du lot 11).
   *À faire avant dépôt* : rejouer au navigateur pour confirmer que DSFR Chart ne normalise pas
   la clé de son côté.
### Arbitrages et non-problèmes (pour mémoire)

- **Le nom du service le plus utilisé dans un titre.** `dsfr-data-kpi` n'affiche qu'une valeur
  numérique (`heading` et `label` sont statiques) ; la voie native est
  `<dsfr-data-display source="top-svc" cols="1">` avec
  `<template><p class="fr-h4">{{service}}</p><p>{{visites:number}} visites</p></template>` —
  le composant interpole n'importe quel champ, y compris textuel, et `:number` formate.
  **Voie native existante, dans un autre composant que celui qu'on cherchait.** Ne pas remonter.
- **Cinq contextes ODS → deux `dsfr-data-context`.** `sources` accepte plusieurs ids séparés par
  des espaces, et un `dsfr-data-context-filter` diffuse à toutes les sources cibles avec un
  `whereKey` stable fusionné en `AND`. La distinction national / local se fait avec **deux
  contextes** : l'un `sources="s-profils-nat"` portant seulement l'année, l'autre
  `sources="s-profils s-services s-appareils s-semaine s-aca"` portant l'année **et** l'académie,
  avec des `url-param-map` distincts. C'est exactement le montage de l'original
  (`ctxprofilsnational` sans refine), en deux balises au lieu de cinq contextes imbriqués et
  d'une expression à effet de bord. **Pas une limite.**
- **Les 24 sommes dans un `select`.** L'attribut fait ~1 200 caractères — peu élégant. Mesuré :
  847 octets de réponse, **0,51 à 2,99 s** (variance réelle, première requête à froid) ; c'est le
  seul appel de la page à dépasser la demi-seconde. **Arbitrage lisibilité contre nombre
  d'allers-retours**, et le dépôt a déjà tranché : c'est presque toujours le nombre
  d'allers-retours qui coûte. Une requête d'une seconde vaut mieux que dix de 120 ms en rafale.
- **La rupture de série 2024-25 → 2025-26.** Problème de donnée, pas de bibliothèque. Mais la
  transposition doit **la montrer** plutôt que de la laisser sous un bouton d'année : la série
  hebdomadaire continue (5,5 Ko, 0,10 s) rend la rupture visible d'un coup d'oeil.
- **`operator="between"` pour l'année scolaire** : la mécanique fonctionne parfaitement une fois
  le `<select>` écrit à la main (bornes en `value`). C'est le **libellé** de l'opérateur qui
  manque, pas la capacité — d'où le manque réel n° 1, qui porte sur l'ergonomie de déclaration,
  pas sur la faisabilité.

### Ce que la transposition gagne

39 requêtes → 4 (mesuré) ; une série temporelle
hebdomadaire ; une carte académique et un podium ; les 24 services au lieu de 5 ; les 4
appareils au lieu de 3 ; le jeu `appareils` enfin exploité ; des compteurs et une cascade sur
la facette (`server-facets`) ; sept années au lieu de trois ; le « service le plus utilisé »
qui suit la donnée ; l'URL partageable ; un tableau accessible et un export sous chaque
graphique. **Quinze des vingt défauts relevés tombent d'eux-mêmes.**
Ce qu'elle perd : rien d'identifiable — hormis, tant que le manque réel n° 3 n'est pas traité,
neuf académies sur la carte que la transposition ajoute (l'original n'en a aucune).

## Données à reproduire fidèlement

- [ ] **2025-2026 national** : Visites ENT **649 492 449** · Utilisateurs **143 170 883** ·
      Enregistrements **1 476 743**.
- [ ] **Profils 2025-2026** : Élèves **261 014 932** (40,2 %) · Parents **243 368 682** (37,5 %) ·
      Enseignants **124 802 399** (19,2 %) · Admin **19 377 465** (3,0 %). Somme = 648 563 478,
      soit 928 971 de moins que `visites_globales` — **le dire**.
- [ ] **Services 2025-2026** : Courrier électronique **198 425 504** > Vie scolaire
      **197 863 169** > Cahier de textes **64 388 531** > Production collaborative **47 463 878** >
      **Notes 1 644**. Ne pas écrire « Vie scolaire » comme service le plus structurant.
- [ ] **Appareils 2025-2026** : élèves 89 240 445 / **108 531 590** / 3 995 791 ;
      parents 22 096 691 / **101 170 716** / 585 539. Ajouter la 4ᵉ modalité `autresappareil`.
- [ ] **2024-2025** : 771 736 489 · enseignants 106 113 305 · élèves 468 195 843 ·
      parents 182 226 220 — **rupture de série à signaler**.
- [ ] **2026-2027** (3 semaines) : 5 121 954 · 1 469 755 · 1 470 069 · 1 917 779. Signaler
      l'incomplétude.
- [ ] **Corse 2025-2026** (le contrôle du filtre) : 2 945 299 visites · 687 455 utilisateurs ·
      3 207 enregistrements ; profils 1 753 325 / 548 073 / 610 692 / 34 116 ; services
      Vie scolaire 1 142 868 > Courriel 696 164 > Production collaborative 314 907 >
      Cahier de textes 132 474 > Notes 0.
- [ ] **35 académies** dans la facette, de Lille 326 879 lignes à Wallis-et-Futuna 31,
      **Etranger 79 inclus** — avec compteurs, ce que l'original n'affiche pas.
- [ ] Profondeur réelle du jeu : **depuis la semaine du 2019-09-02**, pas trois années.
- [ ] **Ne pas reproduire** : les barres normalisées sur un sous-ensemble, le « service le plus
      structurant » en dur, le contexte mort sur `fr-en-dnma-par-uai-appareils`, la liste
      d'académies calculée hors année, ni les deux fois le même nombre dans la comparaison
      locale/nationale.
