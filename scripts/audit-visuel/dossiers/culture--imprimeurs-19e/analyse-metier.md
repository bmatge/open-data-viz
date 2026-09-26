# Imprimeurs, libraires et lithographes du 19e siècle — analyse métier

Création (pas d'original). Page : `public/culture/imprimeurs-19e.html`, URL `/culture/imprimeurs-19e`.
Cadrage : fiche 18 de `docs/portail-culture/proposition.md`. Niveau dataviz-metier : avancé.

## Le jeu

« Imprimeurs, libraires et lithographes en France au 19e siècle » (Archives nationales, ministère de
la Culture), ressource Tabular `1c3f80c4-ace5-41ef-b6e1-983a8ccb5c69`, 17 969 lignes, 24 colonnes,
export Parquet disponible. **Un dossier par personne** (plusieurs brevets regroupés). Les notices
**détaillées** (dates, adresses, prédécesseurs) ne concernent que Paris / la Seine, Bordeaux, Lille,
Marseille et Rouen (description du jeu) — vérifié : 5 899 dossiers datés, dont les 5 096 de la Seine.

## L'histoire

Question : « Quelle place les femmes tenaient-elles dans les métiers du livre sous le régime du
brevet, et par quelle porte y entraient-elles ? » Lecteur : curieux d'histoire, presse, généalogiste ;
puis l'explorateur qui cherche un nom.

Chiffres rejoués le 2026-09-27 sur le Parquet complet (pandas) et relus identiques à l'affichage
(Playwright, attributs `x`/`y` des graphiques et textes calculés) :

| Mesure | Valeur |
|---|---|
| Dossiers / femmes / sexe non précisé | 17 969 / 3 261 (18,1 %) / 44 |
| Part des femmes par métier (après `explode`) | libraire 21,8 % (2 908 / 13 329) ; imprimeur 11,1 % (434 / 3 900) ; taille-doucier 8,6 % (32 / 373) ; lithographe 6,9 % (283 / 4 098) |
| Dossiers à plusieurs métiers | 3 026 |
| Désignation des femmes | veuve 1 207 (37,0 %) ; épouse 450 ; nom de naissance seul 247 ; demoiselle 23 ; rien 1 334 (40,9 %) |
| Veuves parmi les femmes à précision | 63 % (1 207 / 1 927) |
| Seine : femmes / à précision / veuves | 1 003 / 356 / 355 |
| Seine, part des femmes par décennie du 1er brevet | 1810 : 10,7 ; 1820 : 20,9 ; 1830 : 14,9 ; 1840 : 10,8 ; 1850 : 13,1 ; 1860 : 30,4 (371/1 219) ; 1870 : 44,2 (102/231) |
| Départements ≥ 100 brevetés | 55 ; max Morbihan 31,1 % (33/106), min Rhône 9,1 % (48/528) ; Seine 19,7 % |
| Départements < 100 | 36 départements, 2 295 dossiers |

## Écart au cadrage

- Le titre provisoire (« 18 % de femmes ») tient. Le sous-titre « le plus souvent des veuves » est
  **ramené à un plancher** : 37 % sont dites veuves, 41 % des notices de femmes ne disent rien, et à
  Paris la précision n'est portée que pour les veuves (355 sur 356). Titre final : « 18 % de femmes
  brevetées, dont au moins une sur trois veuve ».
- Le cadrage disait « pas d'année exploitable, aucune série temporelle ». Une décennie s'obtient
  (cascade `contains(debut, '181')`…), mais **seulement pour Paris** : la série est présentée comme
  parisienne, en nuance, avec un encadré qui dit pourquoi elle ne peut pas être nationale.
- Vérification « prédécesseur = même nom » (piste du cadrage) abandonnée : 226 veuves seulement ont
  un prédécesseur renseigné ; aucune affirmation n'en est tirée (« la notice ne dit pas toujours de
  qui la veuve a repris le brevet »).
- Pas de carte : géolocalisation à la commune (Paris = 4 884 dossiers sur un point) et départements
  d'époque sans code INSEE. Anti-motif « la carte parce qu'il y a des coordonnées » évité, et dit.

## La forme

1. KPI (dossiers, part des femmes, plancher des veuves).
2. Barres horizontales triées, part des femmes **dans** chaque métier (≥ 100 brevetés), libraire en
   évidence : un taux, pas un volume (les libraires sont 13 329, les autres < 4 100).
3. Barres de la désignation, ordre fixe (veuve → rien de précisé), « rien de précisé » visible en
   gris — le groupe inconnu est montré, pas écarté.
4. Nuance : barres verticales par décennie, Seine seule, 1860 et 1870 en évidence.
5. Barres triées par département d'époque (seuil 100), sans mise en évidence.
6. Exploration : recherche → facettes (sexe, métier, désignation, département) → KPI + fiches avec
   lien vers la notice.

## Honnêteté

- Parts calculées comme `avg` d'un indicateur 0/100 par dossier = ratio de sommes, pas moyenne de
  taux. Seuils d'effectif (100) sur métiers, départements et décennies, dits en page.
- Un dossier à deux métiers compte dans les deux : les parts par métier ne somment pas, c'est dit.
- Les 44 dossiers au sexe non précisé restent au dénominateur : dit.
- La décennie est celle du **premier** brevet : dit.

## Phrases de lecture

Toutes calculées (`dsfr-data-repeat` sur des queries). Restent en dur, qualitatives : « oscille entre
11 et 21 % » (bornes relues sur la série), « trois fois plus fréquentes » (31,1 / 9,1 = 3,4), la
qualification des régions en haut et en bas du classement, « autorisations de 1870 » (183 des 231
dossiers des années 1870 commencent en 1870 ; régime assoupli à partir de 1870 selon la description
du jeu).

## Ce qu'on ne montre pas (en page)

Série nationale ; part exacte des veuves ; brevets vs personnes ; 44 sexes non précisés ; carte ;
activité réelle des ateliers.
