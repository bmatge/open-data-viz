# Revue critique — Éducation A (17 pages + `education.html`)

Lecture seule, 2026-09-13, dépôt en `dsfr-data@0.29.1`. Chaque constat a été lu dans le code
(`fichier:ligne`) et, quand il porte sur un rendu, relevé au navigateur ; les mesures de
performance viennent de `metriques.log` (desktop 1400 px, mobile 390 px). Le JSON compagnon
(`revue-education-a.json`, 71 constats) est la source ; ce document en est la lecture.

## 1. Motifs transverses

1. **Toutes les pages débordent de 16 px à 390 px — et c'est une ligne de CSS.** 17 pages sur 18
   du lot (toutes celles qui ont un `dsfr-data-a11y`) rendent un `scrollWidth` de 406 px. Cause
   tracée dans la chaîne calculée : `dsfr-data-a11y` rend `<details><summary class="fr-accordion__btn">` ;
   la classe DSFR est écrite pour un `<button>` (border-box), le `<summary>` reste en content-box,
   donc 358 px + 2 × 16 px de padding = 390 px posés à x = 16. Correctif : `dsfr-data-a11y summary.fr-accordion__btn { box-sizing: border-box }`
   dans `site.css` — les 64 pages du dépôt d'un coup — et une issue à `dsfr-data`. *(haute, quick win)*

2. **La 0.29 est montée, pas consommée dans les analyses.** Dix passages présentent au présent un
   manque corrigé : `fill-field` « ignoré sur les points » (aap-socle, ips-colleges — #798),
   « BUG-009, toujours » et ses « transformateurs d'isolement » (8 pages — #811 ; deux composants
   morts : `cap-fn`, `ann-prec-n`), « peupler un select de contexte n'a pas de voie déclarative »
   (accessibilité, équipements-sportifs — AM-043, 0.23), BUG-013 (carto-pix — #806), PG-027 au
   présent dans une page dont le commentaire dit le contournement retiré (cnr — #796), AM-070
   (accessibilité — #797). Le lot 20 a mis à jour les commentaires ⚠️, pas les sections `#analyse`.
   *(moyenne, rédactionnel)*

3. **Les tranches numériques s'affichent dans le désordre.** `sort="alpha:asc"` global sur les
   quatre pages IPS range « 100 à 110, 110 à 125, 125 et plus, 90 à 100, Moins de 90 » (relevé au
   DOM) ; `count` sur aap-socle et carto-pix ne vaut pas mieux. Le JSDoc de `sort` ne connaît que
   `count` et `alpha` : pas d'ordre déclaré. Préfixer les libellés dans le `compute` + tri par champ
   (le motif d'annuaire-des-internats), et demander un ordre de valeurs à la bibliothèque.
   *(moyenne, quick win + demande)*

4. **Trois pages transfèrent plus de 8 Mo, une autre met 6,5 s.** annuaire-bureaux 13,4 Mo
   (export avec deux tableaux de métiers/diplômes par ligne), cnr 9,7 Mo (`objectifs_detailles`
   dans le `select`), carto-pix 8,5 Mo (pas de `select`, 19 champs pour 13 utilisés) ;
   ips-colleges 6,5 s au repos (6 971 cercles sans `cluster`, pas de `select`, 5 encarts).
   Le modèle économe existe dans le lot : educajou, 891 Ko et 3 requêtes d'API pour 68 608 lignes,
   en `server-side server-search require-where`. *(haute, quick win à refactor)*

5. **Le piège `/records` paginé par 100 est encore dans le lot.** capytale charge 1 128 lignes en
   12 requêtes en série faute de `fetch-mode="export"` (14 requêtes d'API pour 805 Ko, 1,9 s). Le
   log montre le même symptôme hors lot (patronymes api:9, personnels-écoles api:10,
   fei-chiffres-clés api:13). *(moyenne, quick win)*

6. **Squelette recopié 17 fois.** Même `<head>`, même fil d'Ariane, même bloc de scripts, même
   structure d'analyse ; les quatre pages IPS partagent 80 % de leur pipeline. Une montée de version
   = 64 `sed`. Sans build (contrat du dépôt), un script de régénération des zones communes entre
   marqueurs est la voie la moins invasive. *(basse, refactor)*

7. **Petites dettes de forme, systématiques :** `name='["X"]'` (tableau JSON) pour une série
   unique sur 12 pages contre la chaîne simple sur 4 ; formules datées (« aujourd'hui », « le jour
   même ») sur 5 pages ; un paragraphe d'analyse collé mot pour mot dans cactus et cnr ; 3 `style=`
   inline pour des largeurs de select ; le mot « resultats » sans accent lu par les lecteurs d'écran
   dans chaque valeur de facette (famille AM-077). *(basse, quick win)*

8. **Un chiffre faux et deux chiffres qui se contredisent.** cactus l.57 annonce « 57 lignes sans
   position » : l'API en compte 32 (57 = 904 − 847 positions distinctes, confusion entre « sans
   position » et « position partagée »). ips-erea donne deux « IPS national » (80,6 en chapô, 81,8
   au KPI) sans dire que l'un est une moyenne simple et l'autre la référence pondérée. *(haute /
   moyenne, rédactionnel)*

## 2. Fiche par page (notes A → D : qualité du code · performance · ergonomie)

| Page | Q | P | E | Recommandation principale |
|---|:-:|:-:|:-:|---|
| education.html | B | B | B | Rien d'urgent ; `per-row` avec échelle mobile quand la passe 0.29 sera faite ; le « 36 resultats » attend AM-077 |
| aap-socle-numerique-ecoles | C | B | C | Réécrire les trois passages « fill-field impossible sur les points » (#798) ; ordonner les tranches ; mesurer un `select` |
| accessibilite-equipements-sportifs | **D** | B | C | **39 composants à retirer** : un KPI `n:sum{champ:eq:true} / n:sum` par indicateur (vérifié 51,9 % = API) ; supprimer la source morte `s-ins` ou l'afficher ; facette de contexte à la place des 53 `<option>` |
| accompagnement-deficience-sensorielle | A | A | B | Rien de spécifique (transverses seulement) |
| annuaire-bureaux-des-entreprises | B | **D** | B | **13,4 Mo** : passer en architecture serveur (educajou) ou `require-where` ; expliquer enfin le 404 (tuile IGN hors couverture, encart Pacifique) |
| annuaire-des-internats | B | C | B | Coût des 8 encarts à dire (~60 tuiles) ; dater le BUG-009 ; c'est la page de référence pour le tri par champ |
| cactus-hameconnage | C | B | C | **Corriger « 57 lignes sans position » → 32** ; dédoublonner le paragraphe copié de cnr ; grouper les 10 facettes |
| capytale-usages | C | C | A | `fetch-mode="export"` (12 requêtes en série évitées) ; retirer `cap-fn` (mort depuis #811) |
| carto-pix-fiche-etablissement | B | C | B | Mesurer un `select` (8,5 Mo par changement d'année) ; réécrire la fin de l'item BUG-013 (#806) ; classe CSS au lieu du `style=` |
| cnr-education | C | **D** | B | **9,7 Mo, 2,9 s** : sortir `objectifs_detailles` de l'export ou recherche serveur ; l'analyse contredit le commentaire (PG-027 au présent) |
| dataviz-ips-colleges | C | **D** | C | **6,5 s** : `cluster` + `select`, remesurer, corriger « 0,42 s / 2,6 Mo » ; réécrire fill-field ; ordre des tranches |
| dataviz-ips-ecoles | C | B | C | Le commentaire décrit un `cluster` absent de la couche ; `idle-message` sur la carte ; ordre des tranches |
| dataviz-ips-erea | B | A | B | Expliquer 80,6 vs 81,8 ; « Situation » en radio-inline |
| dataviz-ips-lycees | B | C | C | Ordre des tranches ; `select` + `cluster` |
| dnma-usages-ent | A | C | B | 6,4 s de latence API : relever la requête lente, différer ou borner la série hebdo ; libeller « 2026-2027 (en cours) » |
| educajou-ecolemap | B | **A** | A | Retirer `ann-prec-n` (mort), dater BUG-010 ; **modèle « annuaire serveur » à citer** |
| equipements-sportifs-milieu-scolaire | C | B | B | Région : facette de contexte (24 options en moins) ; EPCI : réécrire l'obstacle (AM-056 + AM-081, pas « aucune voie ») ; « neuf territoires » pour 8 |
| etablissements-euroscol | B | B | B | Dater BUG-009 ; deux facettes « Niveau » à articuler ; coût fixe carte à citer (3,3 Mo hors données) |

Lecture des notes : **A** rien à reprendre · **B** dettes de forme · **C** au moins un constat de
sévérité moyenne · **D** un constat haute (chiffre faux, coût réel, code mort massif).

## 3. Top 10 effort / impact

| # | Action | Pages | Effort | Impact |
|---|---|---|---|---|
| 1 | `dsfr-data-a11y summary.fr-accordion__btn { box-sizing: border-box }` dans site.css | 64 pages | 1 ligne | Supprime le défilement horizontal mobile partout |
| 2 | Corriger « 57 lignes sans position » → 32 | cactus | 1 phrase | Un chiffre faux de moins dans un banc dont c'est la règle n° 1 |
| 3 | `fetch-mode="export"` sur `cap-raw` | capytale | 1 attribut | 12 requêtes en série → 1 |
| 4 | 13 KPI à ratio filtré à la place de 39 composants | accessibilité | 1 h, vérif 13 valeurs | −47 % de balises, analyse remise à jour, motif réutilisable (portraits Sports) |
| 5 | Retirer `s-ins`, `cap-fn`, `ann-prec-n` | accessibilité, capytale, educajou | 3 suppressions | Une requête morte et deux composants morts |
| 6 | `cluster` + `select` sur ips-colleges/lycees ; `select` sur carto-pix ; mesurer | 3 pages | 1 h avec mesures | 6,5 s → probablement < 2 s ; 8,5 Mo par changement d'année |
| 7 | Ordre des tranches : préfixe dans `compute` + `sort` par champ | 6 pages | 30 min | Les facettes calculées redeviennent lisibles |
| 8 | Passe rédactionnelle « périmé par 0.29 » sur 10 passages | 9 pages | 1 h | Le livrable (l'analyse) redevient vrai |
| 9 | Annuaire des bureaux en architecture serveur (ou `require-where`) | 1 page | 2 h | 13,4 Mo → quelques centaines de Ko |
| 10 | `idle-message` sur la carte d'ips-ecoles, `sed` des 18 `name='["…"]'`, classe CSS pour les 3 `style=` | 13 pages | 20 min | Propreté et cohérence du portail |

## 4. Ce que je n'ai pas pu vérifier

- La **facette de contexte** en remplacement des `<option>` en dur (accessibilité, région des
  équipements sportifs) : établie par le JSDoc (`context` : « le champ doit exister SUR CES
  SOURCES », vrai ici) et le précédent dnma, **non rejouée** au navigateur — la cascade des
  compteurs `/facets` sous le second filtre reste à voir.
- `fill-field` **sur une couche circle** en 0.29.1 : JSDoc et changeset #798 lus, rendu non
  rejoué ; la recommandation se limite à réécrire les analyses, l'usage effectif est optionnel.
- Les **4 encarts sans conteneur Leaflet** 3 s après le repos réseau sur annuaire-bureaux
  (La Réunion, Mayotte, Polynésie, Nouvelle-Calédonie) : vu une fois, rendu différé probable, à
  recharger avant de conclure (piège consigné dans CLAUDE.md).
- Le **404 de tuile IGN** : attribué à un encart Pacifique par l'URL (`TILEMATRIX=8`), reproduit
  sur 2 chargements sur 3 ; la ligne/colonne exacte n'a pas été rapprochée d'un encart nommé.
- La **seconde requête d'API** d'ips-ecoles au chargement (api:2 pour une page qui promet « aucune
  requête hors la liste des départements ») n'est pas identifiée.
- Les **durées par requête** de dnma (6,4 s) : le JSON de métriques les listera (`lentes`), le log
  ne les a pas.
