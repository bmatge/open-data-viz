# Refonte « convaincre » — brief unique pour tous les lots

> Lire ce fichier AVANT de toucher une page. Il tient lieu de consigne commune :
> ne pas réinventer les motifs, ne pas renégocier les règles.

## Le changement d'objectif

Le dépôt reste un banc technique, **mais sa page devient une démonstration**.
Le lecteur visé n'est plus l'intégrateur : c'est un **décideur, un sponsor ou un
utilisateur de dataviz Huwise** qu'il faut convaincre de passer à `dsfr-data`.

Conséquence, en une phrase : **le résultat au fil du texte, la technique dans un
accordéon.** Rien n'est supprimé — tout est réordonné.

## Les quatre gestes, sur chaque page

### 1. La technique passe en `<details class="odv-technique">`

La section `#analyse` (« Ce qui a été simple / Ce qui a coincé », le tableau de
correspondance, le verdict) **reste intégralement**, mais repliée :

```html
<details class="odv-technique" id="analyse">
  <summary>Analyse technique — ce que la reproduction a coûté</summary>
  …la section existante, inchangée…
</details>
```

Idem pour les encarts « Le jeu de données utilisé » : ils sont déjà en
`<details class="odv-contexte">`, ne pas y toucher.

### 2. Chaque dataviz expose son code

Envelopper le bloc (titre + phrase + graphique + a11y) dans :

```html
<div class="odv-viz" data-code="Titre lisible du bloc">
  …
</div>
```

`odv-code.js` ajoute seul un `<details>` « Voir le code » avec coloration et
bouton Copier. Il relit le **source** de la page et en découpe la région : rien
à dupliquer, jamais de code faux. Charger le script une fois, après `layout.js` :

```html
<script src="/assets/odv-code.js"></script>
```

⚠️ `data-code` doit être **unique dans la page** (c'est la clé de découpage).

### 3. Une phrase de lecture avant chaque graphique

Le skill `dataviz-metier` l'exige : une phrase qui dit **ce qu'on va voir**, pas
ce que le graphique contient. C'est la thèse, pas une légende.

```html
<p class="odv-lecture">En 2026, <strong>quatre fois plus de communes</strong>
  basculent qu'en 2027 — pour autant d'habitants.</p>
```

### 4. Varier les formes, et les pousser

Une page qui aligne six `type="bar"` ne démontre rien. Alterner, **quand la
question le justifie** (jamais pour faire joli) :

- `dsfr-data-podium` pour un classement — `value-unit`, `max-items`,
  `subtitle-field`, `bar-max` ;
- `bar-line` quand deux séries **partagent leur échelle** (jamais sinon :
  le double axe Y est proscrit) ;
- `series-field` plutôt que deux graphiques quand les abscisses sont les mêmes ;
- `reference-lines` pour une moyenne, un seuil, un objectif ;
- `map-summary="sum"` sur une carte de volumes, `"weighted"` + `map-summary-weight`
  sur une carte de taux ;
- `share_percent` pour une part du total ;
- `dsfr-data-repeat` + `scopes` + `lazy` pour « un graphique par ligne » ;
- `count-label` sur toute liste ; `empty-label` sur tout tableau a11y dont le
  graphique nomme son groupe null.

## Les règles qui ne changent pas

- **Vérifier au navigateur**, pas seulement en code. Une page qui « a l'air
  correcte » dans le HTML n'a rien prouvé. Et **survoler** : l'infobulle est le
  dernier endroit où l'on regarde, et c'est là que BUG-022 s'est caché.
- **Ne pas inventer d'attribut.** Le JSDoc fait foi — `get_skill(id, section)`
  ou le source. Un attribut inconnu est ignoré, et la bibliothèque le dit en
  console depuis la 0.31.0 : lire la console.
- **Aucun chiffre écrit à la main** dans une page. S'il faut un nombre dans une
  phrase, il vient d'un `dsfr-data-kpi` ou d'un `dsfr-data-context-value`.
- **Ne jamais casser un chiffre juste.** Relever les KPI avant/après
  (`scripts/recette-pages.mjs`), et n'accepter un écart que s'il est expliqué.
- Feuille **`DSFRChart.css` obligatoire** dès qu'une page porte un graphique.
- Pas de règle CSS visant le DOM interne d'un composant (leçon BUG-018).

## Ce qu'on ne fait pas

- Pas de dépendance nouvelle. Pas de framework, pas de bibliothèque de
  coloration : `odv-code.js` fait le travail en 80 lignes.
- Pas de couleur hors palette DSFR, pas de composant DSFR redéfini. La liberté
  est dans la **mise en page**.
- Pas de suppression de contenu d'analyse : il est replié, pas retiré.
