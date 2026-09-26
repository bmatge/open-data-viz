# Analyse metier — Plan de relance - Soutien aux projets industriels

> La lecture `dataviz-metier` : le sens avant la syntaxe.
> **Ce fichier n'est jamais ecrase par un script.** Les sorties du modele
> multimodal arrivent dans `constats/` ; ce qui est retenu se reecrit ici, a la main.

## La question posee, et pour quel lecteur

Recréation du 2026-09-26 (niveau avancé : une page).
**Qui porte les projets industriels lauréats de France Relance, et qui porte la décarbonation ?**
Lecteur : citoyen, élu, journaliste qui veut savoir à qui profite le volet industriel du plan
(redevabilité), puis retrouver les projets de son territoire.

L'original répondait à « où sont les projets ? » (carte + camembert des tailles + histogramme
région × mesure). Le jeu établit une histoire plus forte, que l'original ne montrait pas.

### L'histoire trouvée (vérifiée à l'API le 2026-09-26, export complet 3 080 lignes)

- **Le paradoxe** : 61,4 % des 3 080 projets sont portés par des TPE / PME (1 890) ; mais sur les
  185 projets de décarbonation (efficacité énergétique 94 + chaleur bas carbone 91), 61,1 % (113)
  sont ceux de grandes entreprises, contre 18,6 % sur l'ensemble. Deux majorités miroir.
- **La gradation** : la part des GE croît avec le lien au carbone — efficacité énergétique 75,5 %,
  chaleur bas carbone 46,2 %, … projets territoriaux 6,3 %.
- **La concentration** : le seul champ quantitatif du jeu (tonnes éq. CO₂, 186 projets) totalise
  3 756 083 t ; les GE en déclarent 63,5 % ; **un site (ArcelorMittal Méditerranée, Fos-sur-Mer,
  deux lignes) 19,5 %** ; les dix premiers sites 42,0 % (sur 184 sites).

Angles écartés : la géographie (nombre de projets par région = reflet du tissu industriel, sans
population ni emploi dans le jeu pour en faire un taux — gardée en exploration seulement) ; les
entreprises multi-lauréates (190 SIREN, 486 projets — intéressant mais secondaire) ; la date
`mise_a_jour` (date de publication par lots, pas date d'attribution : aucune chronologie honnête).

## La forme retenue, et pourquoi elle sert cette question

1. Chapô calculé + deux cartes miroir (`odv-avant-apres`) : 61 % / 61 %, le contraste d'abord.
2. Barres horizontales empilées à 100 %, une par mesure, triées par part des GE, avec une barre
   « Ensemble des projets » en tête comme repère (`dsfr-data-concat`). GE en bleu France, le reste
   en tons clairs et gris.
3. Barres triées des dix premiers sites en part du CO₂ total, palette neutre, le premier mis en
   évidence (`highlight-index`) ; phrases de lecture (premier site, cumul des dix) calculées.
4. Exploration : facettes (taille, mesure, région, département, filière) → compteur + 2 KPI de part,
   carte avec légende, barres triées par région.

Le camembert de l'original est retiré : une répartition globale masquait précisément l'écart.

## Honnetete de l'echelle

- Les parts par mesure sont des **moyennes d'indicateurs 0/100 par projet**, donc des parts de
  projets (ratio de comptes), pas une moyenne de taux. Elles somment à 100 par barre (±0,1 d'arrondi).
- Parts de CO₂ : `share_percent` calculé sur **tous** les sites avant le `limit` ; le cumul par
  `running_sum`. Axe à zéro.
- Axe de valeur du graphique empilé : DSFR Chart le prolonge à 120 (somme arrondie 100,1) ; `x-max`
  transmis mais sans effet sur un bar horizontal, `y-max` ajoute une catégorie « 100 ». Laissé tel quel.

## Phrase de lecture

« Sur les 3 080 projets industriels lauréats publiés, 61 % sont portés par des TPE et des PME. La
décarbonation de l'industrie dit l'inverse : 61 % de ses 185 projets sont ceux de grandes
entreprises, qui annoncent 64 % des 3,8 millions de tonnes équivalent CO₂ déclarées. »
(données arrêtées au 31/03/2022 — toutes les valeurs calculées dans la page).

## Ce qu'on ne montre pas, et qu'il faut dire

- **Aucun montant** (secret statistique invoqué par le producteur) : un projet vaut un, quelle que
  soit l'aide. Dit en chapô et en nuance.
- **CO₂ déclaratif, sans période ni méthode** ; 186 projets seulement le portent.
- **21 projets sans taille, tous en décarbonation**, 11 % du CO₂ déclaré → la part des GE est un
  minimum.
- **Taille déclarée non corrigée** : CIMENTS CALCIA (Airvault) et SAICA (Laveyron) sont en
  « TPE / PME » parmi les plus gros tonnages.
- **10 projets sans coordonnées** (NC, Polynésie, un en BFC) : comptés, absents de la carte.
- Jeu figé depuis le 31/03/2022 (dernière `mise_a_jour`), sept mesures seulement.
- Nettoyage : « Hauts-de-France » (1 ligne) fusionnée dans HAUTS-DE-FRANCE ; « Mode et luxe » (2)
  dans « Mode et Luxe ».

## Ecarts avec l'original

- Ajout : lecture par taille × mesure et concentration du CO₂ (champ ignoré par l'original).
- Histogramme région × mesure (8 régions sur 20 chez l'original, `maxpoints=50`) remplacé par un
  classement complet des régions, filtrable.
- Camembert des tailles retiré (remplacé par la preuve 1 et deux KPI de part filtrables).
- Facettes : `volet_relance` retiré (redondant avec la mesure : chaque mesure appartient à un volet),
  `mesure` longue remplacée par `mesure_light` ; `taille` recodée (GE, ETI, TPE / PME, Autre statut,
  Non renseigné).
