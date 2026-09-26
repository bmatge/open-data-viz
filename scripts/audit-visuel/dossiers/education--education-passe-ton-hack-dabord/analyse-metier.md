# Analyse metier — Passe ton Hack d'abord!

> La lecture `dataviz-metier` : le sens avant la syntaxe.
> **Ce fichier n'est jamais ecrase par un script.** Les sorties du modele
> multimodal arrivent dans `constats/` ; ce qui est retenu se reecrit ici, a la main.

## L'histoire trouvée (recréation du 2026-09-26)

**Le jeu a été remis à zéro, et la page précédente ne l'a pas vu.** Le 2026-09-10, le jeu portait
les 557 inscriptions de la 4ᵉ édition (9 641 élèves, 2 257 équipes, 1 476 filles / 8 195 garçons).
Le 2026-09-26, il n'en porte plus que **49**, toutes de la 5ᵉ édition ouverte le 14 septembre 2026
(dernière donnée traitée le 2026-09-20). La page précédente écrivait 557 / 9 641 / 15,3 % en dur :
tout était faux, sans erreur ni alerte.

**L'histoire de l'édition en cours : les filles y restent l'exception, et elles tiennent dans
quelques lycées.** Sur 48 inscriptions déclarant au moins un élève (40 lycées, 1 257 élèves, 370
équipes) : **7,8 %** de filles parmi les élèves déclarés par sexe (102 sur 1 308), une pour 12
garçons — contre **15,3 %** à la clôture de la 4ᵉ édition. **18 inscriptions** n'en déclarent
aucune, **36 sur 48** au plus deux ; les **2** inscriptions qui en déclarent dix ou plus (Lycée
Galilée 22, Lycée Jean-Rostand 12) réunissent **33 %** des filles. Public 9,5 % (90/949) contre
privé 2,8 % (9/324). 23 des 48 inscriptions sont arrivées les deux premiers jours.

**Ce que ça renverse.** La page précédente présentait un bilan (4ᵉ édition) ; le jeu décrit
désormais une édition qui commence. Toute comparaison se fait donc contre les seuls chiffres de la
4ᵉ édition conservés par le dépôt (fiche d'audit, relevé API du 2026-09-10).

Angles écartés : classement des académies en volume (taille des académies ; 20 académies à 1-7
inscriptions), choroplèthes (quelques dizaines de lycées), taux de participation par académie
(instable à cet effectif — réservé pour la fin de campagne), parts par type de challenge
(multivalué : les parts dépasseraient 100 %).

## La question posee, et pour quel lecteur

Pour le pilotage du challenge (DGESCO, COMCYBER, rectorats, référents numériques) : l'édition
mobilise-t-elle au-delà du public habituel — en particulier les filles — et où ? Pour un
enseignant : quels lycées voisins sont inscrits (section exploration).

## La forme retenue, et pourquoi elle sert cette question

- Accroche : trois KPI (part des filles avec rappel 4ᵉ édition ; part des inscriptions sans
  aucune fille ; élèves / équipes / date de la dernière inscription).
- Preuve : barres des inscriptions par tranche de filles déclarées (aucune / 1-2 / 3-9 / 10+),
  palette neutre, « aucune fille » en évidence — la distribution montre que la moyenne ne décrit
  aucun lycée réel.
- Nuance : part des filles public / privé (deux barres, ratio de sommes) ; **titre calculé** par
  `{{#if}}`/`{{#unless}}` selon le sens de l'écart.
- Contexte : courbe cumulée des inscriptions par jour de dépôt (`running_sum`) — l'édition ne fait
  que commencer.
- Exploration : recherche, facettes (dont challenge multivalué et tranche de filles), carte par
  secteur avec encarts DROM, liste triée par nombre de filles.

## Honnetete de l'echelle

- Part des filles = `sum(nb_filles) / sum(nb_filles + nb_garcons)` : numérateur et dénominateur
  de la même déclaration. 3 inscriptions ne bouclent pas (somme par sexe ≠ total, +51 élèves) ;
  rapportée au total déclaré, la part serait 8,1 %. Même mesure pour la 4ᵉ édition (1 476 / 9 671
  = 15,3 %). Jamais une moyenne de taux.
- Axes à zéro (`y-min="0"`).
- Comparaison à la 4ᵉ édition : une clôture contre une ouverture. Dit dans le chapô implicite
  (« contre 15,3 % à la clôture ») et dans le bloc 3 : rien ne dit si les filles s'inscrivent plus
  tard, et la 4ᵉ édition n'a pas été archivée.

## Phrase de lecture

Calculée (`dsfr-data-repeat`) : « Depuis la réouverture des inscriptions le 14 septembre 2026,
48 inscriptions venues de 40 lycées déclarent 1 257 élèves et 370 équipes (dernière inscription
enregistrée le 20/09/2026). Parmi les élèves déclarés par sexe, 7,8 % sont des filles — une pour
12 garçons —, contre 15,3 % à la clôture de la 4ᵉ édition. Et ces filles tiennent dans quelques
lycées : 18 inscriptions n'en déclarent aucune. »

## Ce qu'on ne montre pas, et qu'il faut dire

- **Une inscription n'est pas un lycée** : 48 lignes pour 40 UAI ; certaines sont des équipes
  distinctes (lycéen + Sup), d'autres des ressaisies (0341521U : trois lignes identiques, 40 élèves
  chacune). Rien n'est retiré ; les totaux sont des déclarations.
- **2 inscriptions hors annuaire** (`095641F`, faute de frappe probable pour 0950641F déjà inscrit ;
  `5010004G`, lycée Condorcet de Sydney) : ni académie ni secteur ni position — comptées dans le
  chapô, absentes de la comparaison public/privé et de la carte.
- **1 ligne écartée à la source** (`CHX`, 0 élève, 0 équipe, `challenge` nul).
- Jours sans dépôt absents de la courbe cumulée.
- Champs non utilisés : `type_etablissement` (identifiants Grist), `voie_pro` / `voie_techno`
  (0 partout), `niveaux_de_classe` (codes non explicités).

## Ecarts avec l'original

- L'original (page Studio sur `huwise.com`) n'affiche que deux compteurs, un graphique de mixité
  sur des identifiants Grist, un anneau multivalué, un top 10 d'académies et deux choroplèthes. Ici :
  la mixité est l'accroche, la distribution par lycée la preuve, l'évolution promise (« suivre
  l'évolution ») est montrée.
- Aucun chiffre de l'édition en cours n'est écrit en dur : la page survit à la prochaine remise à
  zéro. Seuls les chiffres de la 4ᵉ édition sont écrits, datés (relevé API du 2026-09-10).
