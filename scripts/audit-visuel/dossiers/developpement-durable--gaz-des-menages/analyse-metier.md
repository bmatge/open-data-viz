# Analyse métier — Le gaz des ménages (D1, création du 2026-09-26)

## L'histoire

**Question** : les ménages ont-ils vraiment réduit le gaz depuis la crise de 2022, et ce qu'ils paient
a-t-il suivi ? **Lecteur** : lecteur de rapport (presse, élus, ménages) ; l'explorateur régional vient après.

**Message** : le gaz consommé par les logements a baissé d'un quart (136,7 TWh en 2021 → 101,8 en 2024,
−25,5 %), à nombre de compteurs quasi constant (−2,8 %) : ce sont les mêmes logements qui consomment
moins. Le prix moyen payé a été multiplié par 1,84 (moyennes annuelles 2021 → 2025).

**Figures trouvées** :
- *rupture* : la marche de 2022, jamais remontée ;
- *écart* : par compteur, le gaz baisse de 23 % depuis 2019 quand les degrés-jours baissent de 11 % et
  l'électricité de 7 % ;
- *paradoxe* (absent du cadrage) : la facture gazière de la France (solde importateur) a triplé en
  2022 puis est retombée en 2025 au niveau de 2021 (15,3 Md€ contre 14,6), pendant que le prix payé
  par les ménages n'avait pris que 26 % en 2022 et continuait de monter (+84 % en 2025) ;
- *absence d'exception* : toutes les régions baissent, de −21,9 % (Bretagne) à −30,2 % (Occitanie).

## Ce qui a changé par rapport au cadrage

- **2021 est un hiver froid** (1 572 degrés-jours, 1 409 en 2019, 1 250 en 2024). Comparer à 2021
  seul gonfle la baisse. La page compare aussi à 2019 : −25,5 % également. Le chiffre tient ; il fallait
  le montrer.
- **« Prix ×2,07 »** mesurait du semestre le plus bas (S1 2021) au plus haut (S2 2025). En moyennes
  annuelles : ×1,84. Titre : « presque doublé ».
- **Rupture industrie/tertiaire** : en 2020 (industrie 69,7 → 15,3 TWh), pas 2021. Le résidentiel n'est
  pas touché ; la page n'utilise que lui.
- La carte régionale non sondée au cadrage a été calculée : uniforme.

## La forme

| Bloc | Forme | Pourquoi |
|---|---|---|
| Accroche | chapô calculé + 4 KPI | répond avant le premier clic |
| Preuve | barres annuelles, repère 2022 | une rupture se lit en marche d'escalier |
| Nuance climat | 3 courbes base 100 (2019) | unités différentes (kWh/compteur, DJU) : seul l'indice les rend comparables |
| Prix | 2 courbes semestrielles, même unité (€/100 kWh), `y-min=0` | la série est semestrielle ; axe à zéro pour ne pas exagérer |
| Paradoxe | 3 courbes base 100 (2021) | milliards d'euros contre €/100 kWh : indice obligatoire |
| Exploration | carte `map-reg` + tableau | 12 régions ; la carte confirme l'uniformité, le tableau donne les chiffres |

## L'honnêteté

- Consommation **non corrigée du climat** au niveau régional (le champ THERMOR est vide pour le gaz
  résidentiel) : dit sous le graphique, et la page n'en tire qu'une **borne** — même si toute la
  consommation suivait les degrés-jours, le climat n'expliquerait au plus que 50 % de la baisse.
- Résumé de la carte : `map-summary="weighted"` pondéré par la consommation 2021 = la variation
  nationale exacte (−25,54 %), pas une moyenne de taux.
- Prix « toutes tranches » = moyenne pondérée, pas un tarif ; euros courants ; kWh PCS (gaz) et PCI
  (électricité) : comparaison en évolution seulement.
- Années incomplètes écartées par le compte des mois (`nm:eq:12`).
- Secret : 23 lignes « secret » sur 975 dans l'électricité résidentielle (petites régies, une « région
  fictive » 2018), comptées et dites ; zéro dans le gaz.

## Phrase de lecture (bloc principal)

« Base 100 en 2019. En 2024, l'hiver a compté 89 degrés-jours pour 100 en 2019 : il a fait moins
froid. Mais la consommation d'un compteur de gaz est descendue à 77, quand celle d'un compteur
d'électricité est restée à 93. » — calculée par `dsfr-data-repeat`, aucun chiffre en dur.

## Ce qu'on ne montre pas (dit en page)

Correction climatique régionale ; ménages (le fichier compte des compteurs) ; industrie et tertiaire
(rupture de classement 2020) ; décalage d'un an entre consommations (2024) et prix (2025) ; secret
statistique de l'électricité. Hypothèse éditoriale écrite : le bouclier tarifaire est nommé comme
facteur possible du décalage prix/facture, sans que la donnée permette de le mesurer.

## Angles écartés

- La facture énergétique totale (46,9 → 118,5 Md€) : dilue le propos ; seule la part gaz sert.
- Le gaz corrigé du climat France entière (`_COR2`) : tous secteurs confondus, pas comparable au
  résidentiel.
- Les tranches de prix D1/D2/D3 : la moyenne suffit au propos.
