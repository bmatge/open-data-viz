# Analyse métier — Registre des aides de minimis

> La lecture `dataviz-metier` : le sens avant la syntaxe.
> **Ce fichier n'est jamais écrasé par un script.** Les sorties du modèle
> multimodal arrivent dans `constats/` ; ce qui est retenu se réécrit ici, à la main.
>
> Relecture du 2026-09-26, niveau **avancé** (une page entière). Tout chiffre ci-dessous a été
> rejoué le jour même à l'API `data.economie.gouv.fr` (`/api/explore/v2.1/catalog/datasets/aides_minimis`,
> clé `ods-mef`) et, pour les rendus, au navigateur (Playwright, dsfr-data 0.33.0, zéro erreur console).
> État du jeu : 17 621 lignes, 190 209 959,61 € d'équivalent-subvention brut, modifié le 2026-09-25.

## La question posée, et pour quel lecteur

**Qui a déclaré quelles aides de minimis depuis le 1er janvier 2026, pour combien, sous quelle forme — et une entreprise donnée y figure-t-elle ?**

Deux lecteurs, pas un : le lecteur de rapport (journaliste, agent d'une autorité d'octroi) qui veut l'ordre de grandeur et la répartition ; l'explorateur (une entreprise, un cabinet) qui cherche un SIREN. La page Studio d'origine ne sert que le second : quatre sommes et un tableau. La reprise ajoute le premier avec un podium et un graphique, ce qui est le bon geste — mais ses deux phrases de lecture, qui sont ce qu'un lecteur pressé retient, sont l'une trompeuse et l'autre fausse dès qu'on filtre (voir R1, R2).

**L'histoire que le jeu raconte, et que la page ne dit pas encore** — trouvée par les trois passes d'exploration :

- *Le paradoxe* : qui déclare le plus n'est pas qui verse le plus. DGE (6 872 aides, moyenne 3 249 €) et DGDDI (5 164 aides, 5 294 €) portent **68,3 % des aides pour 26,1 % des montants** ; à l'inverse la Caisse des dépôts déclare 237 aides à 53 801 € de moyenne, les Régions AURA et Nouvelle-Aquitaine 25 000 à 29 000 €. Une aide de minimis est petite : médiane 3 187 €, moyenne 10 799 €, 9e décile 20 072 €.
- *La concentration* : 89,0 % des montants passent par la subvention directe ; 128 autorités, dont les trois premières font 38,5 % — une concentration modérée, pas une domination.
- *L'exception* (angle écarté, à ne pas mettre en page sans enquête) : 18 aides dépassent 300 000 €, dont **6 du régime général**, qui excèdent à elles seules le plafond de minimis par entreprise sur trois ans (1 231 384 € à INITIATIVE AUVERGNE RHÔNE-ALPES, 1 040 000 € à FRANCE ACTIVE AURA). Un chiffre à signaler comme question au producteur, pas comme constat de dépassement : le registre porte des équivalents-subvention déclarés, dont on ne connaît ni les corrections ni les cumuls.
- *Le mouvement* : avril 2026 concentre 50,6 M€ et 5 851 aides (3 972 de la DGDDI en un mois) ; août et septembre tombent à 4,0 M€ chacun. Ce n'est pas une baisse des aides, c'est le délai de déclaration — d'où l'importance de dater la page (R4).

## La forme retenue, et pourquoi elle sert cette question

- **Quatre KPI par régime** (repris de Studio) : forme juste pour quatre niveaux, mais le quatrième, « De minimis agricole 0 € », est un zéro calculé sur un régime non publié avant 2027 — un chiffre qui dit « aucune aide agricole » alors que la vérité est « pas encore collecté » (R5). Le remplacer par une tuile textuelle sans valeur.
- **Podium des dix autorités par montant** : bonne forme pour un classement, mais le titre « Qui déclare » et le code « qui déclarent le plus » désignent l'autre classement (en nombre), où la DGE est première. Renommer « Qui verse le plus » et donner le nombre d'aides sous chaque barre (`subtitle-field`) : c'est précisément ce qui rend le paradoxe lisible (R2).
- **Camembert des instruments** : onze parts dont une à 89 % et sept sous 0,5 %. Le message tient dans la phrase ; le graphique n'ajoute que la légende. Onze barres horizontales triées (`type="bar" horizontal`) rendraient les petites modalités lisibles (R7).
- **Recherche plein texte + facettes + tableau** : la bonne architecture pour l'explorateur, qui bat les listes déroulantes à 15 000 entrées de Studio. Le tableau est la lecture de référence ; ses dates ISO et ses codes NAF nus (« J.59.11 ») sont une occasion manquée, pas un écart (R9).

## Honnêteté de l'échelle

- **Sommes, pas moyennes** : tous les KPI sont des `montant_esb:sum`, aucune moyenne de taux — rien à redire. Les 30 aides à 0 € ne pèsent rien dans les sommes.
- **La part** (`share_percent`) est calculée sur le groupement complet avant la coupe `limit="1"`, vérifié : 27 338 842 / 190 209 959 = 14,37 %, la page affiche 14,4 %.
- **Le zéro qui n'en est pas un** : « De minimis agricole 0 € » (R5).
- **La troncature qui vient** : `max-records="20000"` pour un jeu à 17 621 lignes qui croît d'environ 63 lignes par jour (16 610 le 2026-09-10 → 17 621 le 2026-09-26). Plafond atteint vers le 3 novembre 2026, et la troncature est silencieuse : KPI, podium et parts deviendraient faux sans erreur console (R3).
- **Les lignes en double** : 221 lignes identiques sur tous les champs publiés (17 400 groupes pour 17 621 lignes ; 720 442 € ; 140 chez la DGE). Elles sont sommées et listées comme des aides distinctes — les lignes 1 et 3 du tableau au chargement (MAMMA ROMAN, 2 536 €, CNC, index 11440 et 11441) le montrent au premier regard. On ne peut pas les dédoublonner (rien ne dit que ce sont des erreurs), on doit le dire (R6).
- **Deux compteurs qui divergent** après filtre : le bandeau de recherche affiche « 17 621 aides » (il compte en amont des facettes, par construction : `mi-f` lit `mi-q`), la liste affiche la sélection. Pas faux, mais à savoir ; le compteur de la liste est la référence.

## Phrase de lecture

Ce qu'un datajournaliste écrirait, chiffres du 2026-09-26 :

> **Depuis le 1er janvier 2026, 17 621 aides de minimis ont été déclarées au registre public, pour 190,2 millions d'euros d'équivalent-subvention.** Deux directions de Bercy en déclarent plus des deux tiers (DGE 6 872, DGDDI 5 164) mais à peine un quart des montants : l'aide médiane est de 3 187 €. Par montant, la DGDDI vient en tête (27,3 M€, 14,4 % du total), devant la Région Auvergne-Rhône-Alpes (23,6 M€) et la DGE (22,3 M€) ; les trois premières autorités sur 128 font 38,5 % de l'ensemble. Neuf aides sur dix en montant sont des subventions directes (89,0 %). Le régime général représente 174,5 M€, les SIEG 15,0 M€, la pêche-aquaculture 0,65 M€ ; l'agricole n'est publié qu'à partir de 2027. Registre à jour du 25 septembre 2026 ; les deux derniers mois sont incomplets, les autorités déclarant avec délai.

En page, les deux phrases calculées existent déjà et suivent les filtres — c'est leur texte fixe qui est à retirer (R1) et leur seconde lecture (en nombre) qui manque (R2).

## Ce qu'on ne montre pas, et qu'il faut dire

- **Le millésime et la fraîcheur** : rien en page. Octroi du 2026-01-01 au 2026-09-25 ; `date_publication` nulle sur 594 lignes (préférer `date_declaration` pour `databox-date-field`, max 2026-09-25) (R4).
- **Le régime agricole** : absent du jeu par construction, pas nul (R5).
- **Les doublons apparents** : 221 lignes (R6).
- **Le groupe null** : une seule ligne sans autorité (négligeable, hors top 10), aucun instrument nul (l'`empty-label` posé est inoffensif), 403 secteurs vides dans le tableau (cellule vide, colonne « Secteur »).
- **La facette Pays** : France 17 602 sur 17 621 (99,9 %), sept valeurs dont « French Polynesia » et « Korea, Republic of » — une facette qui ne filtre presque rien ; elle ne trompe pas, elle occupe de la place. À garder ou non, mais le dire dans l'analyse.
- **Les aides au-dessus du plafond** : 6 aides du régime général dépassent 300 000 € à elles seules. Ne pas l'afficher sans l'avoir demandé au producteur ; le noter comme angle écarté.
- **Le délai de déclaration** : les 4,0 M€ d'août et de septembre ne sont pas une chute.

## Écarts avec l'original

Écarts de données ou de capacité du lecteur seulement — la mise en page n'est pas comparée.

| | Page Studio | Reprise | Verdict |
|---|---|---|---|
| Quatre sommes par régime | `sum(montant_esb)` sous `regime = …`, suffixe €, 0 décimale | identiques (174 536 650 / 15 024 416 / 0 / 648 893 €) | égal ; le « 0 € » agricole est reproduit alors qu'il ne devrait pas l'être (R5) |
| Filtres | régime (multiple) ; identifiant, raison sociale, commune (multiples **et** cherchables, sélection exacte) | régime, instrument, autorité, pays en facettes ; identifiant, nom, commune en recherche plein texte `operator="words"` | la reprise perd la sélection exacte de plusieurs SIREN (« ces trois précisément »), gagne la recherche et deux facettes que Studio n'avait pas ; cardinalités réelles : 15 536 identifiants, 10 671 noms, 6 640 communes (R8) |
| Tableau | 13 colonnes : + `pays_beneficiaire`, `date_declaration`, `date_publication`, `operateur` ; tri `date_octroi` desc ; 20 lignes | 9 colonnes, même tri, même pagination, export CSV en plus | quatre colonnes retirées : `operateur` distingue l'opérateur de l'autorité (DGFiP 3 651 lignes, BPI 3 445 en opérateur, absents du podium des autorités) — le lecteur qui cherche « qui a versé » ne peut plus le voir ; à réintégrer ou à dire |
| Sous-titre du tableau Studio | « les aides octroyées avant [le 1er janvier 2026] ne sont donc [pas] recensées… l'agricole à partir de 2027 » | repris en partie dans l'encadré | la période manque dans la reprise (R4) |
| Graphiques, podium, phrases, a11y | aucun | ajoutés | ajout justifié ; c'est leur texte qui est à corriger (R1, R2) |
| Effectif écrit | aucun | « 16 610 aides » figé dans l'encadré | 17 621 à l'API ; retirer ou rendre vivant (R3) |

## Piste héritée (#75) — verdict

Confirmée : le podium classe par montant (DGDDI 27,3 M€) là où son titre parle de « déclarer le plus » (DGE, 6 872 aides) ; la phrase des instruments a une queue figée, fausse dès qu'on filtre (rendue « 100,0 % … se partagent le reste » sur Prêt/Avances). Nuancée : la phrase des autorités n'est pas fausse et suit les filtres, mais « Une seule autorité » à 14,4 % annonce une concentration que 128 autorités ne portent pas.

## Notes — hypothèses éditoriales

- Choisi : montrer les deux classements (montant et nombre) plutôt que d'en choisir un, parce que leur écart **est** le message.
- Écarté : une série mensuelle (le mouvement est un artefact de déclaration) ; une carte par commune (6 640 communes, aucune coordonnée, et la question n'est pas territoriale) ; l'angle « dépassements de plafond » (à instruire avant de publier).
- Hypothèse : `montant_esb` est l'équivalent-subvention brut déclaré, non corrigé ; les lignes identiques sont comptées telles que publiées.
