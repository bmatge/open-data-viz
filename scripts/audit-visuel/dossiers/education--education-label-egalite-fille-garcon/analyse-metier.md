# Analyse metier — Cartographie des labellisations Egalité fille-garçon

> La lecture `dataviz-metier` : le sens avant la syntaxe.
> **Ce fichier n'est jamais ecrase par un script.** Les sorties du modele
> multimodal arrivent dans `constats/` ; ce qui est retenu se reecrit ici, a la main.

## L'histoire trouvée (recréation du 2026-09-26)

**Le label dépend d'abord de l'académie.** Rapporté aux collèges, lycées et EREA publics de
l'annuaire, 1 467 établissements sur 7 862 ont été labellisés au moins une fois en trois
campagnes (18,7 %) — mais 61,8 % à La Réunion (76/123) contre 6,5 % à Strasbourg (14/217), et
zéro en Guadeloupe (71), Guyane (55) et Mayotte (34). Écart du simple au décuple entre académies ;
l'éducation prioritaire ne pèse, elle, que de 16,5 % (collèges hors EP) à 25,1 % (REP+).
Deuxième fait : sur 162 établissements labellisés à plusieurs campagnes, 130 ont relevé leur
niveau (30 le même, 2 l'ont abaissé).

**Ce que ça renverse.** La reproduction précédente montrait des *volumes* par académie
(Normandie 119, Versailles 113…) : elle classait la taille des académies. Et la fiche d'audit
annonçait 1 529 établissements et 140 labellisés plusieurs fois : **faux**, 164 lignes portent un
UAI terminé par une minuscule (`0220082v`), 27 établissements y figurent sous deux graphies. Réel :
**1 502 établissements**, **162** labellisés à plusieurs campagnes.

Angles écartés : volumes par académie (taille), carte seule (1 678 points ne montrent pas une
proportion), classement d'établissements (le label n'est pas une note).

## La question posee, et pour quel lecteur

Pour un lecteur de politique éducative (rectorat, presse, élu) : le label s'est-il diffusé
également, et qu'est-ce qui explique qu'un établissement le porte ? Pour une famille ou un chef
d'établissement : quels établissements voisins sont labellisés (section exploration).

## La forme retenue, et pourquoi elle sert cette question

- Accroche : trois KPI (taux national, académie la plus / la moins engagée, trajectoires).
- Preuve : barres horizontales triées des 30 académies, en taux, palette neutre, la tête mise en
  évidence ; académies à zéro nommées en étiquettes au-dessus.
- Nuance 1 : trois barres (collèges hors EP / REP / REP+), REP+ en évidence, + phrase sur les lycées.
- Nuance 2 : trajectoires des établissements relabellisés (3 barres) et campagnes × niveau empilées.
- Exploration : recherche, facettes, carte colorée par niveau, liste.

## Honnetete de l'echelle

- Ratios de sommes (`sum(labellise)/count`), jamais de moyenne de taux. Axes à zéro.
- Dénominateur : annuaire filtré serveur (public, tutelle EN, Collège/Lycée/EREA, **hors
  `libelle_nature` SECTION…** — SEGPA et SEP ont leur UAI propre, 2 099 lignes qui abaissaient les
  taux d'un cinquième —, hors COM). **Dédoublonné par UAI** : l'annuaire compte 7 893 lignes pour
  7 862 UAI (cités scolaires collège + lycée).
- Comparaison EP limitée aux collèges (les lycées n'en relèvent pas).
- Numérateur « labellisé au moins une fois » : le jeu n'a pas d'échéance, ce n'est pas un stock
  d'aujourd'hui (dit en page).

## Phrase de lecture

Calculée (`dsfr-data-repeat`) : « En trois campagnes, de 2022-2023 à 2024-2025, 1467 collèges,
lycées et EREA publics sur 7862 ont obtenu au moins une fois le label, soit 18,7 %. Mais la
proportion va de 61,8 % dans l'académie de La Réunion à 6,5 % dans celle de Strasbourg, soit 10
fois moins. »

## Ce qu'on ne montre pas, et qu'il faut dire

Le privé (31 établissements labellisés) hors des taux ; 4 labellisés publics absents de
l'annuaire (dont un lycée français de l'étranger et une école des armées) ; les 4 labellisations
AEFE (Maurice, Tunisie) en marge de la carte ; deux UAI partagés collège/lycée à l'étranger ; deux
établissements labellisés deux fois dans la même campagne 2023-2024 à deux niveaux (le plus élevé
retenu) ; la campagne « 2024- 2025 » corrigée. Tout est écrit en notes de page.

## Ecarts avec l'original

L'original ne donne aucun chiffre ; la page ajoute un dénominateur (annuaire), les taux par
académie et par éducation prioritaire, et les trajectoires de niveau. Même jeu, mêmes
labellisations, même carte et mêmes filtres (niveau, campagne, type, secteur, académie,
département).
