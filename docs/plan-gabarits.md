# Gabarits — le plan, et le brief des avis

> Brief unique du chantier « gabarits sur les 61 pages de dataviz ».
> Méthode arrêtée avec Bertrand le 2026-09-20.

## Pourquoi ce document

Une première passe a posé le gabarit par une **règle mécanique unique** (« on coupe à la
carte »), appliquée par script à 26 pages. Elle a corrigé un vrai défaut — les compteurs
étaient coincés dans la colonne de droite, laissant un vide le long de la carte — mais
elle a deux torts :

1. elle ne dit rien des pages dont l'objet principal n'est pas une carte ;
2. elle ignore les quatre familles de Claude Design, alors que le choix du gabarit avait
   été fait **page par page** lors du lot précédent.

D'où la règle de ce chantier : **le gabarit n'est pas une décision de structure, c'est la
conséquence d'un avis éditorial.** Une page = un avis `dataviz-metier`, puis une
application, puis une vérification au navigateur.

## Les quatre archétypes

| Famille | Signature dans le code | Ce que le lecteur vient chercher |
|---|---|---|
| **A — Localisateur** | carte + recherche + facettes, peu de KPI | « où est-ce, près de chez moi ? » |
| **B — Tableau de bord** | KPI + graphiques + contexte, pas de recherche plein texte | « comment ça se répartit, comment ça évolue ? » |
| **C — Corpus documentaire** | recherche plein texte + liste, pas de carte | « ce document existe-t-il, et que dit-il ? » |
| **D — Portrait d'une entité** | un sélecteur pilote toute la page, beaucoup de KPI | « dis-moi tout sur CELLE-CI » |

## Le format de l'avis (figé — tout avis s'y conforme)

```yaml
page: viz/qualite-tourisme.html
question: "la question à laquelle la page répond, en une phrase de lecteur"
lecteur: "qui la pose, et accessoirement qui d'autre"
objet_principal: carte        # carte | série | classement | corpus | entité
famille: A2                   # A1/A2 B1/B2 C1/C2 D1/D2
mise_en_page:
  bandeau: "ce qui va dans le bandeau pleine largeur"
  pleine_largeur: [kpi]       # ce qui monte sous le bandeau
  aligné_sur_filtres: carte   # l'objet que la colonne de filtres accompagne
  dessous: [graphique, liste] # dans l'ordre
dataviz:                      # LE livrable : ce qui ment, manque ou trompe
  - "« Diversité 28 » sans sa base : 28 activités sur combien ?"
  - "la carte n'a pas de phrase de lecture chiffrée"
a11y: "tableau équivalent présent ? colonnes nommées ?"
risques: "pièges connus du dépôt que la page porte ou frôle"
```

Le champ `dataviz` est le cœur de l'avis. Le gabarit, lui, tombe presque tout seul une
fois `objet_principal` connu : c'est lui qui s'aligne sur les filtres, tout le reste suit.

## Famille A — le motif de référence (validé par Bertrand le 2026-09-20)

Page pilote : `viz/qualite-tourisme.html`. Toute page de la famille A s'y conforme.

```
┌─────────────────────────────────────────────────────────┐
│ BANDEAU pleine largeur — recherche + compteur           │  ← elle pilote la page
├─────────────────────────────────────────────────────────┤
│ COMPTEURS pleine largeur — phrase de lecture + KPI      │  ← sous la recherche, comme elle
├───────────────┬─────────────────────────────────────────┤
│ FILTRES       │ TITRE + phrase de lecture               │
│ (colonne,     │ CARTE                                   │  ← les filtres accompagnent
│  repliable)   │ (encarts DROM)                          │     l'objet qu'ils pilotent
├───────────────┴─────────────────────────────────────────┤
│ GRAPHIQUE, puis TABLEAU — pleine largeur                │
└─────────────────────────────────────────────────────────┘
```

Les deux erreurs que ce motif corrige, et qu'il ne faut pas réintroduire :

1. **Les compteurs dans la colonne de droite.** Ils y étaient parce que tout le contenu
   avait été mis dans un seul `fr-col-lg-9`. Résultat mesuré : 894 px au lieu de 1 200,
   et une colonne de filtres de trois `select` longeant d'abord les compteurs, puis du
   vide sur toute la hauteur de la carte.
2. **La recherche enfermée dans la colonne de filtres.** Une recherche plein texte qui
   pilote toute la page n'est pas un filtre parmi d'autres : elle va dans le bandeau.
   (Cas de `fermeture-reseau-cuivre`, qui n'avait aucun bandeau.)

## Ce qu'on attend d'un avis — et ce qu'on refuse

**On attend** que la grille en douze points de `dataviz-metier` soit réellement passée :
la question et le lecteur, la forme qui sert contre celle qui trahit, les échelles
honnêtes (jamais une moyenne de pourcentages), le sens des variations, la phrase de
lecture, le tableau équivalent comme lecture, et ce qu'on ne montre pas (groupe null,
troncature, échantillon).

**On refuse** un avis qui décrit la page au lieu de la juger, un reproche non vérifié
dans la donnée, et toute critique qui impute à `dsfr-data` le coût d'avoir voulu
reproduire le portail à l'identique — c'est la règle la plus importante du dépôt.

## Les garde-fous, à chaque page appliquée

1. balises équilibrées (`div`, `details`, `section`) ;
2. aucune balise `dsfr-data-*` perdue — comptage avant / après ;
3. chargement au navigateur **avec défilement jusqu'à la carte** : cartes et graphiques
   se rendent à la visibilité, une mesure prise trop tôt voit du vide ;
4. zéro erreur console, zéro défilement horizontal ;
5. le panneau « Voir le code » montre le source **tel qu'il est écrit** : toute
   transformation préserve l'indentation relative.

## Le séquencement

Le motif se valide **une fois par famille**, sur une page pilote soumise à Bertrand
(capture + avis), puis la famille se déroule en autonomie.

| Lot | Contenu | Pilote |
|---|---|---|
| 1 | Famille A — 24 localisateurs | `qualite-tourisme` |
| 2 | Famille C — 5 corpus | `bofip` |
| 3 | Famille B — 25 tableaux de bord | `fiscalite-locale` |
| 4 | Famille D — 5 portraits | `portrait-territoire` |

Les 26 pages de la passe mécanique appartiennent à A : elles sont **reprises** par
l'avis, pas conservées telles quelles.

## Ce qui remonte au dépôt

Constats nouveaux au registre (`verifie` obligatoire, fusionner avant d'ajouter),
enseignement transverse dans `public/synthese.html`, ADR si l'un des motifs se révèle
structurant.
