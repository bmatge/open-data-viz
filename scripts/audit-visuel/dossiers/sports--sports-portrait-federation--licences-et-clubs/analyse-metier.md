# Analyse metier — Portrait de fédération — Licences et clubs

> La lecture `dataviz-metier` : le sens avant la syntaxe.
> **Ce fichier n'est jamais ecrase par un script.** Les sorties du modele
> multimodal arrivent dans `constats/` ; ce qui est retenu se reecrit ici, a la main.

Recréation du 2026-09-27, niveau « avancé » (une page). Ce dossier porte la recréation
de toute la page : les quatre autres onglets de l'original y sont fondus ou écartés
(voir leurs `suivi.md`). Chiffres rejoués à l'API `data.sports.gouv.fr` le même jour,
via le tunnel du VPS.

## L'exploration qui a trouvé l'histoire

- `indicateurs_cles_fede` : 126 lignes (120 fédérations + 6 lignes de groupe `TOT`). Tout le
  profil d'une fédération et de son groupe y est, en une requête.
- Les écarts au groupe varient énormément d'une fédération à l'autre, et pas sur le même
  indicateur : football 10,5 % de femmes contre 33,7 % chez les olympiques (38e sur 38) ;
  golf, âge médian 58 ans contre 16 (1er sur 38) ; Double Dutch 80,5 % de femmes contre
  31,6 % (2e sur 54) ; athlétisme 48,0 % contre 33,7 % (7e sur 38), mais licences en recul
  de 0,9 % depuis 2019 quand le groupe gagne 10,7 % (30e sur 38).
- Donc **l'histoire n'est pas la même pour chaque fédération** : un titre figé mentirait
  pour la plupart. La page calcule, pour la fédération choisie, son rang dans le groupe sur
  trois indicateurs de profil (part des femmes, évolution 2019-2024, âge médian) et retient
  celui où elle est la plus extrême (rang depuis le bout le plus proche / nombre de pairs
  renseignés). Simulation hors ligne sur les 117 fédérations qui déclarent des licences :
  6 seulement ont leur meilleur rang hors du premier ou du dernier tiers, dont 5 dans les
  groupes de cinq fédérations ou moins (repli 1) ; une seule, le polo, reçoit le repli 2.
- Nulls : 3 fédérations publient 0 licence et aucun indicateur (421, 423, 426) ; 10 sans
  évolution sur cinq ans ; 4 sans âge médian. L'âge médian est entier : ex aequo fréquents
  (4 fédérations olympiques à 22 ans).

## Angle retenu, angles écartés

- **Retenu : l'écart au groupe, dit par le rang.** « Fédération Française de Football : la
  moins féminisée des 38 fédérations olympiques ». Le rang est la mesure commune qui rend
  comparables trois indicateurs d'unités différentes (points, %, années).
- **Repli 1 — groupe de 5 fédérations ou moins** (para-sportives, scolaires) : un rang sur 2
  ne dit rien ; le titre donne le poids dans le groupe (« UNSS : 36 % des licences des 5
  fédérations scolaires »).
- **Repli 2 — aucun rang dans le premier ou le dernier tiers** : « un profil proche du milieu
  des 54 fédérations délégataires non-olympiques ». C'est une information, pas un échec.
- **Écarté : le classement toutes disciplines** (cas d'école : il classe des sports).
- **Écartés : pyramide, QPV, ZRR, typologie urbain/rural, clubs, ANS détaillée,
  comparateur** — ils ne distinguent pas la fédération et coûtaient des requêtes à chaque
  changement. Dit en page, section « Ce que cette page ne montre pas ».

## La question posee, et pour quel lecteur

Pour un dirigeant fédéral, un journaliste, un service de l'État : « En quoi ma fédération
se distingue-t-elle des fédérations de son groupe ? » — puis où elle est implantée.

## La forme retenue, et pourquoi elle sert cette question

1. Bandeau : le sélecteur (seul levier), lien profond `?refine.code_fs=` de l'original.
2. Titre-message et chapeau calculés (`compute` + `dsfr-data-repeat`), chaque phrase
   n'apparaissant que si sa valeur est publiée.
3. Quatre KPI : licences, part des femmes, évolution 2019-2024, âge médian, chacun avec la
   valeur du groupe et le rang.
4. Preuve : trois petits multiples de barres triées (tous les pairs), la fédération seule en
   couleur (`selected-palette="neutral"` + `highlight-index` interpolé depuis le rang).
5. Nuance : base 100 en 2016, fédération / groupe / toutes, trait à 2019 (point de départ de
   l'évolution classée : dernière saison avant la crise sanitaire).
6. Géographie : choroplèthe d'un **taux** (licences pour 1 000 habitants), tableau triable
   avec effectif, taux et rapport au taux national.
7. Fiche du ministère (table), puis « ce qu'on ne montre pas ».

## Honnetete de l'echelle

- Rang de compétition (1 + nombre de pairs strictement devant) ; la fédération est placée
  en tête de ses ex aequo pour que la barre en couleur soit la sienne.
- Base 100 : axe qui ne part pas de zéro, dit dans la description accessible ; groupes à
  « champ constant 2016-2024 » (publiés tels quels).
- Carte : résumé pondéré par la population (`map-summary="weighted"`, `map-summary-field`
  sur la valeur brute) = `lics_pop_fr` publié (4,54 pour l'athlétisme).
- L'âge médian d'un groupe est celui de ses licences réunies, pas une moyenne de
  fédérations (dit en page).

## Phrase de lecture

« En 2024, la Fédération Française d'Athlétisme compte 313 957 licences, 3,1 % de celles
des fédérations olympiques. Les femmes en détiennent 48,0 %, 14,4 points de plus que dans son
groupe (33,7 %). Depuis 2019, ses licences ont reculé de 0,9 % (groupe : +10,7 %). » —
calculée, aucun chiffre dans le HTML.

## Ce qu'on ne montre pas, et qu'il faut dire

- Une licence n'est pas une personne (dit dans l'encadré des jeux).
- Les fédérations sans valeur ne sont pas classées ; le « sur N » ne compte que les
  renseignées.
- Les petits groupes (2 et 5 fédérations) : rangs affichés mais pas en titre.
- 11 lignes hors territoire écartées de la carte (étranger, COM, Monaco, non réparti).
- Saison 2024 semi-définitive.

## Ecarts avec l'original

- Trois chiffres faux de l'original (âge médian du groupe 15 et 22 pour 16 ; part féminine
  bretonne) ne peuvent plus se produire : l'âge du groupe vient de la ligne `TOT` jointe.
- Les onglets Mon territoire, Structuration et Me comparer ne sont pas repris (voir
  ci-dessus) ; la fiche signalétique l'est, en table.
- 169 requêtes (original, visite complète), 28 au chargement (reproduction précédente) →
  **3 au chargement, 5 après défilement, 3 par changement de fédération**.
