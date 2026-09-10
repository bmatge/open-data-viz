# Cible du portage : `dsfr-data` 0.25.0, pas 0.20.0

**La faisabilité de chaque page se juge contre 0.25.0** — mais 0.25.0 est le **plancher**,
pas la réponse. Le dépôt épingle encore `dsfr-data@0.20.0` sur ses 26 pages, npm sert
`0.23.0`, et les jalons v0.24.0 et v0.25.0 sont déjà cadrés et en cours.

> ### À quoi sert ce document
>
> **Pas à conclure que tout est déjà prévu.** Le backlog v0.24/v0.25 a été écrit à partir
> d'**un seul portail** (data.economie.gouv.fr, lots 1 à 11). Toute la raison d'étendre
> l'exercice à data.education.gouv.fr est de trouver **ce qu'un second portail révèle et que
> le premier n'a pas montré**. Ce document sert donc à écarter le bruit — ne pas redéposer une
> demande déjà cadrée, ne pas classer en limite dure ce qui est planifié — pour que **le
> résidu ressorte**. Le résidu est le livrable du lot 12.
>
> Un portail différent apporte des choses qu'un autre ne pouvait pas donner : ici trois
> générations de pages superposées (AngularJS, vues personnalisées héritées, Studio), des
> volumes d'un autre ordre (279 318 et 354 012 points sur une carte), des mailles
> géographiques que Bercy n'avait pas (académies, régions académiques, une carte d'Europe),
> et des motifs neufs (maître-détail à cinq jeux, tableau de bord multi-sources, choroplèthe
> portée par un `geo_shape` du jeu). C'est là qu'il faut chercher.
>
> **Donc : à la moindre hésitation, écrire le constat.** Une demande en double se fusionne au
> registre en trente secondes (règle « fusionner avant d'ajouter ») ; une demande jamais
> écrite parce qu'on a présumé qu'elle était couverte est perdue. Vérifier reste obligatoire —
> présumer *couvert* est aussi fautif que présumer *impossible*.

État relevé le 2026-09-10 sur `bmatge/dsfr-data` : 0.21.1, 0.22.0 et 0.23.0 **livrées**
(elles absorbent l'essentiel des 53 demandes du lot 10), **22 issues ouvertes**, dont
neuf au jalon v0.24.0 et quatre au jalon v0.25.0.

## Les quatre verdicts, à ne plus confondre

| Verdict | Ce que ça veut dire | Ce qu'on écrit |
|---|---|---|
| **Natif** | Présent dans la version publiée (≤ 0.23.0) | Faux problème si on a écrit l'inverse |
| **Natif, postérieur à la version épinglée** | Publié mais absent du bundle chargé par le dépôt | Montée de version **ici**, pas une demande |
| **Prévu** | Issue ouverte à un jalon v0.24.0 / v0.25.0 | Citer le numéro d'issue et le jalon ; **pas** une limite dure |
| **Manque réel** | Rien au source, rien au backlog | Demande à consigner — c'est le seul cas |

Un attribut d'une version non chargée est **ignoré sans erreur console** : l'échec est
silencieux, comme `display="a:select, b:select"` (PG-022) ou `max-records` qui tronque.

## ⚠️ Mise à jour du 2026-09-10, 10 h — **v0.24.0 est sortie pendant la rédaction de ce lot**

Le jalon v0.24.0 a été **entièrement fermé à 09 h 48** (#671 à #677, #255, épic #696) et publié :
`packages/core` est en **0.24.0**, commit `c14c762` « expressions et conditions, agrégats étendus,
fold et pivot ». Le jalon v0.23.0 (#678 à #684, épic #697) avait été fermé à 08 h 52.

**Le tableau ci-dessous décrit donc du livré, plus du prévu.** Il reste au jalon v0.25.0 :
#689 (`fetch-mode="export"`), #690 (`require-where`), les épics #699 et #700, le cadrage #705 et
la recette #625.

Une vérification a été refaite contre le code livré, parce qu'elle conditionnait une demande
classée P1 : **le ratio de #673 est bien mono-source** — `dsfr-data-kpi` l'évalue sur
`this._filteredData()`, les données d'une source unique. La demande AM-049 (ratio dont le
numérateur et le dénominateur viennent de deux jeux) reste donc valide après livraison.

**Leçon de méthode** : ce document a eu tort en moins d'une heure. Ne pas se fier à un état du
backlog daté — le revérifier (`gh issue list`, version de `packages/core`) avant de classer quoi
que ce soit en « prévu ».

## Ce que le jalon v0.24.0 apporte — **livré le 2026-09-10** (épic #696 « expressions et conditions »)

| Issue | Apport | Ce que ça débloque dans nos fiches |
|---|---|---|
| **#671** | Grammaire v2 de `compute` : fonctions en liste blanche, `when … then … else`, booléens, `null` (ADR-105) | Le recodage par ligne, huit demandes du lot 10 d'un coup. **Garde-fou explicite : par ligne uniquement — ni fenêtre, ni cumul, ni ligne précédente.** |
| **#672** | Agrégat `distinct` (client, ODS `count(distinct)`, Grist `COUNT(DISTINCT)`) | « N communes », « N établissements » sans query intermédiaire — le manque relevé sur les patronymes, le GAR et les IPS |
| **#673** | Ratio de deux agrégats `value="<expr> / <expr>"`, et `count:champ:valeur` | Les taux : jauges d'accessibilité, part de Oui de Cactus |
| **#674** | `where` sur le KPI (dialecte colon, côté client), aussi sur `trend` et `lines` | Un KPI filtré à côté d'un KPI global, sans second contexte |
| **#675** | Agrégat `evolution` (N / N-1) ; `lag` différé | Comparaisons annuelles |
| **#676** | Échappement `%3A` dans `replace` / `replace-fields` | Le blocage AM-038 sur les valeurs à deux-points |
| **#677** | `fold="prefixe_*:champ"` — replier des colonnes booléennes parallèles en un multi-valeurs | **Les six drapeaux 0/1 d'Euroscol**, et le motif « une colonne Oui/Non par modalité », très courant en open data |
| **#255** | `dsfr-data-pivot` — repli long → wide, symétrique d'`unpivot` | Les deux camemberts faits main du tableau de bord TNE |

## Ce que le jalon v0.25.0 apporte

| Issue | Apport | Ce que ça débloque |
|---|---|---|
| **#689** (épic #699) | `fetch-mode="export"` — charger par `/exports/json`, opt-in puis défaut | **Le mur des 10 000 offsets.** C'est la réponse directe au constat central du lot 12 : l'adaptateur pagine `/records` 100 par 100 et l'API refuse `offset+limit > 10 000`, donc le chargement complet est aujourd'hui impossible au-delà. Repli automatique sur `/records` prévu ; `meta.truncated` obtenu par `limit+1` faute de `total_count` |
| **#690** (épic #700) | `require-where` — aucune requête tant qu'aucun filtre n'est posé, état `idle` rendu en message DSFR | **Le motif « carte vide au chargement »** des pages à gros volume (IPS écoles 279 318 pts, PIX 354 012). L'original le fait mal — il charge puis n'affiche rien ; ici la page dirait « Choisissez un filtre » sans requête |

## Conséquences directes pour nos fiches

**À reclasser de « limite dure » en « prévu » :** le mur des 10 000 offsets (#689), l'absence
de `count(distinct)` (#672), les taux et pourcentages faute d'agrégat conditionnel (#671, #673,
#674), les drapeaux booléens parallèles (#677), le repli long → wide (#255), le chargement
différé sur gros volume (#690).

**Le résidu — ce qui reste un manque réel, et qui est le vrai produit du lot 12.**
Rien au source, rien au backlog au 2026-09-10. Liste **ouverte** : elle doit grossir à mesure
que les fiches rentrent, c'est le signe que le second portail sert à quelque chose.

1. **Le cumul** (somme cumulée le long d'une série) — le tableau de bord TNE le fait en douze
   expressions de template. Non seulement absent, mais **explicitement hors périmètre de #671**
   (« ni fenêtre, ni cumul, ni ligne précédente »). S'il doit exister, c'est ailleurs —
   `dsfr-data-query` ou `-chart`. Demande à formuler.
2. **`replace-fields` silencieusement sans effet sur un nombre** : `_normalizeRow` ne visite que
   `typeof value === 'string'`. Voisin de #676 mais distinct : là c'est l'échappement, ici c'est
   le typage. Un correctif, pas une fonctionnalité.
3. **`refine-on-click`, `context`, `label` et `dsfr-data-map-select` absents de la fiche servie
   par `get_skill(dsfrDataMap, "reference")`** alors que
   `skills/dsfr-data/references/dsfr-data-map.md` les documente. La fiche du MCP est en retard
   sur le dépôt : deux agents induits en erreur le même jour.
4. **`type="map-reg"` attend des codes ISO 3166-2 et non l'INSEE**, et les clés de `map-aca` sont
   désaccentuées : une carte entièrement grise, **sans erreur et avec `getSkippedCount() = 0`**.
   ⚠️ Établi par lecture du code, **non rejoué au navigateur** — à confirmer avant dépôt, et à
   trancher : ce qui relève de DSFR Chart se remonte chez `GouvernementFR/dsfr-chart`, pas ici.

## Comment l'écrire dans une fiche

Dans la section « Limites et points durs », classer chaque point par verdict, et pour un
point « prévu », citer le numéro d'issue et le jalon :

> **Charger les 39 858 lignes.** Impossible aujourd'hui : l'adaptateur pagine `/records` et
> l'API ODS refuse `offset+limit > 10 000` (HTTP 400 vérifié à l'offset 9 901).
> **Prévu au jalon v0.25.0** : `fetch-mode="export"` (#689) charge par `/exports/json` en une
> requête — mesuré ici à 3,1 s pour 18,2 Mo contre 10,5 s pour les 10 000 premières lignes en
> pagination. Ce n'est donc pas une limite dure, c'est une dépendance de calendrier.

## Où chercher le résidu en priorité

Les endroits où le portail Éducation diffère structurellement de Bercy, donc où le backlog
existant a le plus de chances d'être muet :

- **Les mailles géographiques propres à l'éducation** — académie, région académique,
  département de l'établissement contre département de la collectivité. Bercy n'avait ni
  `map-aca` ni le besoin d'apparier des libellés d'académie.
- **Les volumes d'un autre ordre** : 279 318 et 354 012 points cartographiés. Au-delà du
  chargement (#689), tout ce qui vient après — rendu, cluster, légende, facettes, compteurs,
  recherche — n'a jamais été éprouvé à cette échelle par le banc.
- **Les trois générations de pages superposées** : ce que le portage doit rendre n'est pas un
  modèle ODS mais trois, et le passage de l'un à l'autre n'a pas d'équivalent chez Bercy.
- **Les jeux mal formés** : position unique pour 43 479 lignes, `email` sans arobase, refine
  sur des valeurs inexistantes, 44 colonnes vides sur 79, labels tous échus. La question
  n'est pas de les reproduire mais de savoir **si la bibliothèque aide à voir le problème ou
  le masque** — un `getSkippedCount()` à 0 sur une carte grise est un manque, pas un détail.
- **Le multi-sources** : tableau de bord à cinq jeux, maître-détail à cinq jeux, page à neuf
  jeux (FEI). Bercy était très majoritairement mono-jeu.
- **Ce qui n'a rien à voir avec la donnée** : l'accessibilité des rendus, les libellés non
  traduits, les états vides, les messages d'erreur. Un manque y compte autant.
