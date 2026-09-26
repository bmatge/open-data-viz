# Analyse metier — Annuaire des services DGFiP

> La lecture `dataviz-metier` : le sens avant la syntaxe.
> **Ce fichier n'est jamais ecrase par un script.** Les sorties du modele
> multimodal arrivent dans `constats/` ; ce qui est retenu se reecrit ici, a la main.

Recreation du 2026-09-26 (niveau avance : une page). Chiffres rejoues a l'API
(`/exports/json`, 21 757 lignes, jeu relu le 2026-09-26) puis au navigateur.

## L'histoire trouvee

**L'accueil fiscal de proximite ne passe plus d'abord par la DGFiP.** Pour payer, c'est le
buraliste (94,8 % a 99,4 % des points selon le paiement) ; pour se renseigner, d'abord une
maison France Services (58 % des 5 332 points). Les centres des Finances publiques ne sont
presents que dans 751 communes, contre 2 781 pour France Services et 7 688 pour les buralistes.
Nuance : dans 37 departements et collectivites sur 104, les centres ne sont que dans cinq
communes ou moins ; dans 100 sur 104, France Services couvre plus de communes qu'eux.

La page precedente traitait les 74 % de buralistes comme un defaut de perimetre du jeu
(« annuaire au perimetre discutable »). Lus par service, ils sont l'histoire.

Angles ecartes : le classement des departements en volume (suit le nombre de communes, sans
population on ne peut rien rapporter) ; la typologie des services des centres (SIP, SIE, SGC :
interessant pour l'administration, pas pour l'usager).

## La question posee, et pour quel lecteur

Pour l'usager et le lecteur curieux du service public : « qui m'accueille, concretement, pour
payer ou me renseigner sur mes impots ? ». L'annuaire (« ou aller pres de chez moi ») reste en
bas de page, pour l'usager qui cherche un point.

## La forme retenue, et pourquoi elle sert cette question

1. Barres horizontales triees des **communes desservies** par type (pas des lignes : un centre
   compte une ligne par service, 2,6 par commune). La barre des centres en couleur distincte
   (deux colonnes empilees, pas de `color-map`, BUG-022).
2. Barres empilees a 100 % par service : le contraste paiement / renseignement se lit d'un coup.
3. Tableau par departement (104 lignes, triable, cherchable) : un graphique de 104 barres
   serait illisible, et le lecteur y cherche son departement.
4. Exploration : recherche, facettes (« Je veux », « Je suis », departement, commune), carte
   coloree par type, fiche a rubriques, liste.

## Honnetete de l'echelle

Axes a zero. Parts = ratios de sommes par service (`explode` : un point multi-services compte
dans chaque barre, ce qui est dit). Paris, Lyon, Marseille recodes en une commune : le jeu code
les centres en 75056 et buralistes/France Services par arrondissement (751xx) — sans recodage,
Paris pesait 1 commune chez les uns, 20 chez les autres.

## Phrase de lecture

« Pour chacun des 4 paiements, de 94,8 % a 99,4 % des points sont des buralistes. Pour obtenir
un renseignement, sur 5 332 points : 58 % de maisons France Services, 34 % de centres, 9 % de
permanences. » Toutes calculees (`dsfr-data-repeat`), aucune figee.

## Ce qu'on ne montre pas, et qu'il faut dire

- Pas de population, de distance ni de temps de trajet : communes desservies non rapportees.
- Une ligne n'est pas un lieu (services multiples d'un centre).
- Les conditions du paiement chez le buraliste (moyen, plafond) : absentes du jeu, non affirmees.
- 134 lignes sans coordonnees, 31 sans code commune, 2 sans departement.
- Pas d'evolution : photographie, le « n'est plus » du titre decrit une repartition.
- Les 104 directions ne sont pas dessinees (102 sans service ouvert au public).

## Ecarts avec l'original

- Le titre dynamique du portail (« Etablissements pour payer vos impots ») n'est pas repris ;
  les facettes « Je veux / Je suis » portent la meme entree.
- Pas de liste nominative des services co-localises dans la fiche : eventail du regroupement.
- Le portail retire « factures locales » aux professionnels en dur ; la donnee le contredit,
  les facettes suivent la donnee.
