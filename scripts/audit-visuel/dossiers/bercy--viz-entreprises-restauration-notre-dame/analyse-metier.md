# Analyse metier — Rebâtir Notre-Dame

> La lecture `dataviz-metier` : le sens avant la syntaxe.
> **Ce fichier n'est jamais ecrase par un script.** Les sorties du modele
> multimodal arrivent dans `constats/` ; ce qui est retenu se reecrit ici, a la main.

## La question posee, et pour quel lecteur

Grand public, curieux du chantier : **qui a rebâti Notre-Dame, d'où viennent ces savoir-faire,
et peut-on aller les voir ?** L'original y répond par juxtaposition (carte, camembert, KPI) ;
la recréation croise métier × lieu × ouverture au public.

## L'histoire trouvée (jeu relevé le 2026-09-26, mis à jour le 2026-07-16, 225 lignes)

- 225 entreprises déclarées ; **117 (52 %) hors d'Île-de-France**, dont 3 à l'étranger
  (Varsovie, Bruxelles, Sesto Fiorentino).
- Métiers d'art et du patrimoine : 103 (46 %), le premier contingent ;
  **59 % hors d'Île-de-France** (60 en région, 1 à l'étranger).
- Ils ouvrent leur atelier au public à **35 %** (36/103), contre **20 %**
  des 122 autres (25) ; les trois autres familles sont toutes entre 20 et 21 %.
- 26 des 28 labels EPV sont chez eux.
- À l'opposé, l'accompagnement (sécurité incendie, gardiennage, électricité, propreté) est
  francilien à 61 % (33/54).
- Nuances : l'Île-de-France = Paris 22, petite couronne 54, grande couronne 32 ; 61 disent
  « ouvert au public » mais 7 seulement donnent un moyen de visiter.

Angles écartés : « l'Île-de-France d'abord » (vrai en volume, 108/225, mais c'est ce que disait
déjà la vitrine et il s'inverse pour les ateliers d'art) ; « + 3 000 compagnons » (pas dans les
données) ; taux régionaux (aucun dénominateur dans le jeu).

## La forme retenue, et pourquoi elle sert cette question

1. Avant/après en deux cartes (`odv-avant-apres`) : 20 % / 35 % d'ouverture au public.
2. Barres horizontales triées de **taux** d'ouverture par famille, art mis en évidence
   (`selected-palette="neutral"` + `highlight-index`) — remplace le camembert des volumes.
3. Barres empilées à 100 % Île-de-France / autres régions / étranger par famille, triées de la
   moins à la plus francilienne. Palette par défaut, pas de `color-map` (BUG-022).
4. Exploration : recherche (y compris dans les récits d'intervention), facettes, 4 KPI qui
   suivent les filtres, carte + panneau fiche avec galerie, barres des régions, liste.

## Honnetete de l'echelle

Taux = ratios de comptes (indicateurs 0/1 sommés), jamais des moyennes de taux. Axes à zéro.
Parts arrondies à l'unité, dit sous le graphique (une barre peut faire 99 ou 101 %).
Les graphiques de preuve portent sur tout le jeu ; les filtres n'agissent que sur l'exploration,
dit en page (vérifié : filtre « Bâtiment » → KPI 20, graphique inchangé).

## Phrase de lecture

« En Art et patrimoine, 36 entreprises sur 103 déclarent ouvrir leurs portes au public, soit
35 %. » — calculée (`dsfr-data-repeat` sur la ligne de tête), comme le chapô et les nuances.

## Ce qu'on ne montre pas, et qu'il faut dire

Les personnes (le « + 3 000 » n'est pas repris) ; les non-répondants au questionnaire ;
1 entreprise sans coordonnées (Ferronnerie Picard Duboscq, comptée, absente de la carte) ;
`reg_name` écarté au profit de `nom_officiel_region` ; 65 entreprises sans photo. Tout est
écrit en page, chiffres calculés.

## Ecarts avec l'original

- Camembert des volumes → taux par famille et répartition géographique par famille.
- KPI « + 3 000 compagnons » retiré (chiffre éditorial absent des données), mentionné en page.
- Fond régional décoratif (GeoJSON) retiré : `tiles-style="muted"` suffit.
- Galerie par `{{#each images}}` (toutes les photos, plus de plafond à 12) ; pas de visionneuse.
- Sites « www.… » préfixés en https (sinon lien relatif cassé).
