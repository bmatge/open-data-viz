# Demandes à remonter chez GouvernementFR/dsfr-chart

> Fichier tenu à la main depuis `public/data/retours.json`. Il ne part PAS sur
> `bmatge/dsfr-data` : ces trois constats portent sur les composants web de
> **DSFR Chart** (`bar-chart`, `line-chart`, `map-chart`), que `dsfr-data`
> instancie sans pouvoir en changer les attributs.

C'est la **règle n° 4 du lot 11** du banc d'essai, apprise en déposant deux fois au
mauvais endroit (AM-022, AM-016) : *une limite de `map-chart` ou de `line-chart` se
remonte chez `GouvernementFR/dsfr-chart`, pas chez `dsfr-data`.*

La preuve commune aux trois, relevée le **2026-09-19** contre `dsfr-data@0.31.0` sur des
pages minimales (`scripts/rejeu-findings/pages/am055.html`, `am063.html`) : l'élément
DSFR Chart réellement instancié expose une liste d'attributs close, qui ne contient ni
cadrage géographique, ni type d'échelle, ni mode de graduation d'axe. `dsfr-data` ne peut
pas poser un attribut que l'élément ne lit pas.

## AM-055 — `map-monde` rend le planisphère entier : aucun attribut de cadrage

**Type au registre du banc** : amelioration · **Statut** : acte (acté : ne relève pas de `dsfr-data`)
**Composants** `dsfr-data-chart`
**Rencontré sur** edu/fei-projets-europeens-donnees

### Constat

`dsfr-data-chart type="map-monde"` n'a ni attribut de zone, ni de bbox, ni de zoom : une carte consacrée à l'Europe s'affiche sur un planisphère où l'Europe occupe un huitième de la surface. ⚠️ **Relève probablement de `GouvernementFR/dsfr-chart` et non de `dsfr-data`** — à trancher avant dépôt (règle n° 4 du lot 11 : une limite de `map-chart` se remonte chez dsfr-chart).

### Comment ça a été vérifié

Relevé sur les 44 projets européens de FEI. La solution retenue dans la fiche contourne `map-monde` entièrement : `dsfr-data-map` + GeoJSON Europe en `geoshape no-interactive`, ce qui redonne le cadrage, les classes (#685) et le clic-pour-filtrer (#681) — mais au prix du GeoJSON à fournir soi-même (voir AM-054). — **Revue du 2026-09-12, contre la 0.29.0 publiée** : Non traité par la 0.29.0.

— **Arbitrage tranché le 2026-09-19, page minimale `am055.html`, bundle `dsfr-data@0.31.0`** : `dsfr-data-chart type="map-monde"` instancie un `map-chart` de DSFR Chart, et cet élément expose exactement `selected-palette`, `name`, `level`, `data`, `databox-source`, `value`, `date` — **aucun attribut de zone, de bbox ni de zoom**. Les trois essayés sur la balise `dsfr-data-chart` (`zone`, `bbox`, `zoom`) sont annoncés inconnus en console par la 0.31.0. `dsfr-data` ne peut pas poser un cadrage sur un élément qui n'en lit aucun : **la demande relève de `GouvernementFR/dsfr-chart`**, comme AM-022 et AM-016 (règle n° 4 du lot 11). Non déposée sur `bmatge/dsfr-data`, et c'est le constat lui-même.

### Contournement actuel dans le banc

`dsfr-data-map` + GeoJSON statique, qui est de toute façon meilleur ici : cadrage, légende bornée et sélection.

---

## AM-063 — Pas d'échelle logarithmique sur un graphique

**Type au registre du banc** : amelioration · **Statut** : acte (acté : ne relève pas de `dsfr-data`)
**Composants** `dsfr-data-chart`
**Rencontré sur** edu/portrait-de-territoire-sports

### Constat

Sur une distribution très étalée, l'échelle linéaire écrase tout ce qui n'est pas le maximum. ⚠️ **Relève probablement de `GouvernementFR/dsfr-chart` et non de `dsfr-data`** — à trancher avant dépôt (règle n° 4 du lot 11).

### Comment ça a été vérifié

Relevé sur « Portrait de territoire », dont plusieurs indicateurs varient de un à plusieurs milliers entre une commune rurale et la France entière. Non rejoué au navigateur sur une transposition. — **Revue du 2026-09-12, contre la 0.29.0 publiée** : Toujours absent : aucune échelle logarithmique dans le bundle publié.

— **Rejeu du 2026-09-19 (dette de preuve, open-data-viz#39)**, harnais `scripts/rejeu-findings/`, page minimale servie par interception, bundle **`dsfr-data@0.31.0` du CDN** : page `am063.html`, deux graphiques sur la meme distribution etalee (regions, de 5 852 a 36 095 equipements) : l'un nu, l'autre portant `log`, `y-scale="log"` et `scale="log"`. **Les trois attributs sont inconnus de `dsfr-data-chart`**, et la 0.31.0 le DIT desormais en console — « attribut "log" inconnu de la version chargee de dsfr-data — il sera ignore en silence » (trois avertissements, un par attribut). **Arbitrage tranche, et il ne va pas ici** : l'element `bar-chart` que `dsfr-data-chart` instancie expose `x-min`, `x-max`, `y-min`, `y-max`, `bar-size`, `max-bar-size`, `aspect-ratio`, `unit-tooltip` — **aucun attribut de TYPE d'echelle**. Or l'echelle logarithmique de Chart.js EST embarquee dans le bundle DSFR Chart 2.1.1 (`static id = "logarithmic"`, classe presente dans `DSFRChart.js`, 812 Ko) : la capacite existe dans le moteur, ce qui manque est l'attribut qui l'expose, et cet attribut appartient a `GouvernementFR/dsfr-chart`. `dsfr-data` ne peut pas le poser sur un element qui ne le lit pas. **Requalifie en constat a remonter chez `dsfr-chart`** (regle n° 4 du lot 11), comme LIM-017.

---

## LIM-017 — `line-chart` de DSFR Chart gradue des millésimes en 2022,2 / 2022,4 : trois années deviennent un axe continu

**Type au registre du banc** : limite-dure · **Statut** : acte (acté : ne relève pas de `dsfr-data`)
**Composants** `dsfr-data-chart`
**Rencontré sur** rejeu-findings (page minimale), skill-metier (page de démonstration)

### Constat

Un `type="line"` sur trois millésimes (2022, 2023, 2024) rend un axe X gradué 2022, 2022.2, 2022.4 … 2024 : DSFR Chart `line-chart` interprète des libellés qui ressemblent à des nombres comme une échelle continue. **Ce n’est pas `dsfr-data`** : le composant transmet `x` = `["2022","2023","2024"]` (des chaînes) que la source publie des nombres ou des chaînes — la variable isolée ne change rien. La graduation est le fait de `GouvernementFR/dsfr-chart` (règle n° 4 du lot 11 : une limite de `line-chart` se remonte là-bas).

### Comment ça a été vérifié

2026-09-19, page minimale (`overlays.html`, test `overlays`), 0.29.1 et 0.30.0 : deux sources, `an` en nombres (2022) et en chaînes ("2022") ; `line-chart` reçoit dans les deux cas `x` = `[["2022","2023","2024"]]` ; captures des deux graphiques : axe gradué 2022, 2022.2, 2022.4, 2022.6, 2022.8, 2023 … 2024 dans les deux cas.

### Contournement actuel dans le banc

Non trouvé sans quitter `type="line"` : `dsfr-data` ne peut pas forcer une échelle catégorielle qu’il ne contrôle pas. Non exploré : un libellé non numérique (« 2022 » suffixé). Un `type="bar"` gradue par catégorie.

---
