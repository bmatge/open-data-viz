# Analyse metier — Label Qualité tourisme

> La lecture `dataviz-metier` : le sens avant la syntaxe.
> **Ce fichier n'est jamais ecrase par un script.** Les sorties du modele
> multimodal arrivent dans `constats/` ; ce qui est retenu se reecrit ici, a la main.

Recréation du 2026-09-26 (niveau avancé). Chiffres rejoués sur l'export complet du jeu
(3 604 lignes ; données modifiées le 2024-06-25 selon les métadonnées du portail).

## L'histoire trouvée

**La marque d'État est d'abord occitane, et elle l'est par un partenaire.** L'Occitanie compte
826 établissements labellisés, 24 % des 3 458 localisés — 1,8 fois la région suivante (PACA 449).
601 de ces 826 (73 %) citent la marque régionale « Qualité Tourisme Occitanie Sud de France »
dans le champ `partenaires` ; cette marque n'apparaît dans aucune autre région (618 lignes :
601 en Occitanie, 17 sans région). Sans elle, l'Occitanie tomberait au 5e rang sur 16 (225).
L'Hérault seul (224, 6,5 %) dépasse 11 des 16 régions ; 3 des 5 premiers départements sont
occitans ; Paris en compte 11, l'Île-de-France 47 ; 18 départements en comptent 5 ou moins.

**Nuance** : ce que la marque régionale apporte, ce sont d'abord des caves — 168 des 182
« Caveaux et points de vente » (92 %) sont occitans. Hors Occitanie, le label est d'abord celui
des offices de tourisme (768 sur 2 778, 28 %, première activité).

**Ce que ça renverse** : l'ancienne page notait « une densité plus forte en Occitanie et sur les
littoraux » comme un fait géographique ; c'est un fait de distribution (un réseau partenaire),
lisible seulement dans `partenaires`, que la page ne chargeait pas.

Angles écartés : l'évolution (aucune date de labellisation) ; les taux (ni capacité ni fréquentation).

## La question posee, et pour quel lecteur

Grand public et acteurs du tourisme : *où la marque est-elle vraiment présente, et pourquoi là ?* —
puis, pour le visiteur : *quel établissement labellisé près de moi ?* (annuaire conservé).

## La forme retenue, et pourquoi elle sert cette question

- Régions en barres triées empilées « marque régionale / autres partenaires » : la part de la
  marque ne se voit que sur une barre, c'est le message. Rang contrefactuel calculé en phrase.
- Top 20 départements empilés Occitanie / hors Occitanie ; Paris en phrase et en KPI.
- Top 10 activités empilées Occitanie / hors Occitanie : les caves presque entièrement occitanes,
  les offices de tourisme presque entièrement hors Occitanie.
- Exploration inchangée : recherche, facettes, carte à panneau, grille paginée.

## Honnetete de l'echelle

Axes à zéro, barres empilées de comptes (sommables). Parts = ratios de sommes sur les établissements
localisés. Aucun taux : dit en page. « Paris, première destination » = repère de contexte, dit comme tel.

## Phrase de lecture

« L'Occitanie compte 826 établissements labellisés, dont 601 par sa marque régionale. Sans eux, il en
resterait 225 : la région tomberait du premier au 5e rang des 16 régions où la marque est présente. »
— calculée (`dsfr-data-repeat`, jointure sur une constante).

## Ce qu'on ne montre pas, et qu'il faut dire

146 établissements sans région ni département (dont 17 de la marque occitane : la part occitane est
plutôt sous-estimée) ; pas de taux ; photographie de juin 2024 sans date de labellisation ; la marque
régionale détectée par sous-chaîne dans un texte concaténé. Tous dits en page, chiffres calculés.

## Ecarts avec l'original

L'original est un annuaire (compteur, filtres, carte, grille, fiche) ; la recréation ajoute le récit
et garde l'annuaire. Mêmes effectifs par activité que le portail (Office de tourisme 862, Camping 634…).
Pas d'autocomplétion (déjà consigné). Fiche = panneau latéral de la carte.
