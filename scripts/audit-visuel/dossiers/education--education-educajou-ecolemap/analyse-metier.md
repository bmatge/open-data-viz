# Analyse metier — Vue cartographique d’un établissement produite par la forge des communs numériques éducatifs

> La lecture `dataviz-metier` : le sens avant la syntaxe.
> **Ce fichier n'est jamais ecrase par un script.** Les sorties du modele
> multimodal arrivent dans `constats/` ; ce qui est retenu se reecrit ici, a la main.

## L'histoire trouvée (recréation du 2026-09-26)

ÉcoleMap centre l'orthophoto sur UN établissement, au zoom du bâtiment, et va chercher ses
coordonnées chez OpenStreetMap avant l'annuaire. Pourquoi ? `precision_localisation` répond.
Sur 68 570 établissements ouverts (API, 2026-09-26), **96,2 %** sont placés au numéro, à la rue
ou au bâtiment ; **2 148** seulement au centre de leur commune (`Ville` 2 139 + `COMMUNE` 9) et
**431** sans position. La concentration est nette :

- **l'adresse** : parmi les 2 212 établissements dont `adresse_1` se résume à « Le Bourg »,
  « Le Village » ou « Chef-lieu » (22 graphies), **62,3 %** sont au centre de la commune, contre
  **1,2 %** des 66 358 autres — ~52 fois plus. Le géocodage ne trouve pas une rue non écrite ;
- **le type** : écoles 4,0 % (1 925/48 351), collèges 0,8 %, lycées 0,9 % ;
- **la géographie** : Gers 32,1 %, Lot 30,0 %, Corrèze 29,0 %, Corse-du-Sud, Cantal, Haute-Loire ;
  56 territoires sur 107 sous 2 % ;
- **l'exception** : Polynésie française (311/311) et Wallis-et-Futuna (21/21) sans aucune
  position — dont ~40 lignes à précision « BATIMENT »/« CENTRE_PARCELLE » mais sans coordonnées.

Angle écarté : la densité d'établissements par département (carte de la version précédente),
qui redit la population.

## La question posee, et pour quel lecteur

« Quand je centre une carte sur un établissement de l'annuaire, est-ce que je tombe dessus ? »
Pour le professionnel de l'éducation (usager d'ÉcoleMap) et le réutilisateur du jeu.

## La forme retenue, et pourquoi elle sert cette question

Chapô et 3 KPI calculés ; barres horizontales à deux modalités (contraste : la barre « Le Bourg »
en couleur, l'autre grise) pour l'explication ; trois phrases pour le type (un graphique n'y
ajoute rien) ; choroplèthe de **taux** par département pour la géographie ; paragraphe calculé
pour les collectivités non dessinées ; puis le localisateur, avec une facette « Précision de la
position » qui relie l'exploration au récit.

## Honnetete de l'echelle

Taux, jamais volumes, sur la carte. Résumé « en France » désactivé (`map-summary="none"`) :
pondéré, il ne porterait que sur les territoires dessinés et écarterait la Polynésie (100 %).
Le taux national est dans le chapô, sur tout le jeu. Barres sans `y-min` (voir constat).

## Phrase de lecture

« 1 378 des 2 212 établissements dont l'adresse se résume à « Le Bourg », « Le Village » ou
« Chef-lieu » ne sont placés qu'au centre de leur commune : 62,3 %, contre 1,2 % pour toutes les
autres adresses » — calculée (`dsfr-data-repeat`), jeu du jour.

## Ce qu'on ne montre pas, et qu'il faut dire

- « Rue » (10 095, 14,7 %) et « Lieu-dit » sont comptés comme placés : 96,2 % est un plafond.
- La liste des 22 graphies est manuelle ; les variantes rares restent dans « autre adresse »
  (écart plutôt sous-estimé).
- Périmètre : établissements ouverts tous types ; les 2 « à fermer » écartés.
- La carte ne dessine pas 975, 977, 978, 986, 987, 988 ; le tableau et le CSV les gardent.

## Ecarts avec l'original

Zoom 18 au lieu de 19 (preset `ign-ortho` sans `maxZoom`). Pas d'affinage OSM : la page mesure
au contraire où il compte.
