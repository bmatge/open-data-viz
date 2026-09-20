# Brief d'un avis de gabarit — version allégée

> Tout agent chargé d'une page lit **ce fichier seul**. Il ne charge pas la skill
> `dataviz-metier` (sa grille est reproduite ici) et n'écrit pas son propre script de
> vérification (il appelle `scripts/verif-gabarit.mjs`).
>
> Raison d'être : les quatre premiers avis ont coûté **200 000 tokens par page** en
> moyenne, dont l'essentiel en redécouverte — chargement de la skill, exploration du
> dépôt, réécriture d'un Playwright, et re-constat des mêmes défauts d'une page à
> l'autre. On paie la découverte une fois.

## 1. La grille en douze points

À dérouler **page ouverte**, pas sur le source. Compter n'est pas regarder.

| # | Question | Geste si non |
|---|---|---|
| 1 | Le titre dit-il le **message**, le libellé de série la **mesure** ? | `databox-title`, `value-field="champ:Libellé"` |
| 2 | La **forme** répond-elle à la question (part / niveau / évolution / écart / classement) ? Plus de 15 barres ou 6 courbes → découper | un graphique par question, tableau, podium |
| 3 | Une **moyenne de taux** quelque part ? (`:avg` sur un champ qui est déjà un taux ; résumé « en France » d'une carte) | ratio de sommes `a:sum / b:sum`, `map-summary-weight` |
| 4 | Un **arrondi** précède-t-il un calcul ? | déplacer l'arrondi en aval (`decimals`) |
| 5 | L'**axe** part-il de zéro quand le lecteur le suppose ? Deux échelles Y ? | `y-min="0"` ; deux graphiques ou base 100 |
| 6 | Le **sens** de la variation est-il le bon ? Une couleur automatique juge-t-elle ? | couleur explicite, seuils retirés, `compute` du ton |
| 7 | La **légende** dit-elle ce que le graphique montre ? | comparer chaque pastille à sa barre |
| 8 | Le **total** se recoupe-t-il à l'API et entre blocs voisins ? | `max-records`, `meta:total`, `max-items` |
| 9 | Le **groupe null** est-il nommé ou écarté — et l'a-t-on dit ? | `empty-label` ou `where isnotnull` + une phrase |
| 10 | Le **tableau équivalent** se lit-il seul ? | alias dans la donnée, `order-by`, `dsfr-data-pivot` |
| 11 | La **phrase de lecture** existe-t-elle, et dit-elle ce qui manque ? | `description`, `databox-source`, `context-value` |
| 12 | Les **hypothèses éditoriales** sont-elles écrites pour être contestées ? | section « Notes — les hypothèses éditoriales » |

## 2. Les douze défauts déjà trouvés — vérifie-les, ne les redécouvre pas

Les quatre premières pages relues les ont tous sortis. **Contrôle chacun en une ligne ;
ne développe dans ton avis que ceux que ta page porte, et n'écris que ce qui la
distingue.** Inutile de re-justifier le principe, il est acquis.

1. **Chiffres en dur sur un jeu qui bouge.** Un chapeau qui annonce « 63 214 établissements,
   mis à jour quotidiennement » se contredit lui-même. → compteurs lus dans la donnée,
   encart daté.
2. **Un chiffre sans sa base.** « 18 régions couvertes » — sur combien ? Sans filtre, c'est
   tout le jeu, donc zéro information. → `label` qui porte la base.
3. **Valeurs sentinelles en tête d'un tri croissant.** 1 463 tarifs à 0 € ne sont pas des
   visites gratuites mais des prix non déclarés. → `where` statique + `require-where`.
4. **`limit` sur un `group_by` : troncature invisible.** `total_count` vaut la taille de page.
   → relever le nombre réel de groupes à l'API. Le **résumé pondéré d'une carte est un
   contrôle d'intégrité gratuit** : s'il ne retombe pas sur le KPI national, quelque chose
   est tronqué.
5. **Exclusion silencieuse dans un `where`.** `position is not null` rendait 430 établissements
   introuvables alors qu'ils ont adresse et téléphone. → l'écarter est un choix, il se dit.
6. **Lignes sans coordonnées.** Une couche carte les ignore avec un simple `console.warn`.
   → compter à l'API, le dire dans la phrase de lecture.
7. **Groupe null muet.** → `empty-label`, et il devient une barre, un KPI, une couleur.
8. **Tableau équivalent aux en-têtes techniques** (`nom_departement`, `nb`). PG-032 :
   `dsfr-data-a11y` n'a pas la grammaire `champ:Libellé`. → `rename` sur un
   `dsfr-data-normalize` **dédié au tableau**, branché à côté du graphique, pour que le
   graphique n'ait pas à référencer les nouveaux noms.
9. **Année numérique dans un tableau a11y** → « 2 021 ». → `date_format(champ,'yyyy')` dans
   le `group-by` rend l'année en texte.
10. **Lien optionnel en texte nu.** → `{{#if champ}}<a …>{{/if}}{{#unless champ}}non
    renseigné{{/unless}}`, blocs **côte à côte** (l'imbrication n'est pas prise en charge).
11. **Date ISO brute** dans une fiche. → `{{champ:date}}`.
12. **Pas de section d'hypothèses éditoriales.** → la copier d'une page voisine.

## 3. Ce qu'on attend de TOI

Ton avis vaut par ce qu'il trouve **en plus** de cette liste. Les quatre premières pages ont
sorti, chacune, un défaut que rien d'automatique ne pouvait voir — et les trois étaient du
**texte faux, pas des nombres faux** : un champ `commune` répété 25 fois par un produit
cartésien du jeu, un compteur qui disait « communes » pour des lignes commune × code postal,
un résumé de carte qui n'additionne que le dessiné. Cherche ça.

**Toute affirmation se vérifie** — dans la page, au navigateur, ou à l'API. Pas de
vérification, pas d'entrée. Et avant de classer quoi que ce soit en limite de `dsfr-data` :
est-ce la bibliothèque, ou le coût d'avoir voulu reproduire le portail à l'identique ?

## 4. Le motif (famille A)

```
BANDEAU pleine largeur — recherche + compteur
COMPTEURS pleine largeur — phrase de lecture + KPI
┌───────────┬──────────────────────────────┐
│ FILTRES   │ CE QU'ILS PILOTENT           │
└───────────┴──────────────────────────────┘
LE RESTE — pleine largeur
```

**La règle est « les filtres accompagnent ce qu'ils pilotent »**, pas « les filtres
accompagnent la carte » : sur une page où les facettes pilotent des tuiles de résultats et
où la carte ne montre qu'un point cliqué, ce sont les tuiles qui s'alignent. Applique la
règle, pas sa lettre — et dis-le en commentaire dans la page.

## 5. Vérification — une commande, pas un script à écrire

```bash
cp public/<ta-page>.html /tmp/<toi>-avant.html     # AVANT toute modification
node scripts/verif-gabarit.mjs <ta-page>.html --ref /tmp/<toi>-avant.html
```

Il déroule les cinq garde-fous : balises équilibrées, aucune balise `dsfr-data` perdue,
défilement jusqu'à chaque carte et graphique avant de mesurer, zéro erreur console et zéro
débordement **à 1280 et à 390 px**. Il sort non nul si un garde-fou tombe.

N'écris un Playwright à toi que pour ce qu'il ne couvre pas (un scénario de clic, un survol).

## 6. Interdits

- **N'écris pas dans `public/data/retours.json`**, `public/synthese.html`, `docs/`, `scripts/` :
  d'autres agents travaillent en parallèle. Remonte tes constats dans ton rapport.
- Ne commits pas, ne pushes pas, ne touche à aucune autre page.
- Le scratchpad est **partagé** : préfixe tous tes fichiers de ton nom de page.
