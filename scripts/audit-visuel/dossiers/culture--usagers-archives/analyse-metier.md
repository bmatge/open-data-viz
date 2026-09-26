# Analyse métier — culture / usagers-archives

Fiche 20 du cadrage (`docs/portail-culture/proposition.md`). Niveau `dataviz-metier` : avancé.

## L'histoire

Deux enquêtes en ligne du SIAF auprès des internautes des services d'archives, publiées dans un
seul fichier (ressource Tabular `bc564101`, 46 279 lignes, 106 colonnes) : 18 556 réponses en
2014, 27 723 en 2021. Chiffres rejoués le 2026-09-27 sur l'export Parquet complet (Python) puis
relevés identiques au navigateur :

| Question (part parmi les répondants à la question) | 2014 | 2021 |
|---|---|---|
| Note de recommandation 9 ou 10 | 39,2 % | 51,9 % |
| Note de recommandation 0 à 6 | 23,5 % | 12,4 % |
| Motif : généalogie | 94,2 % | 82,3 % |
| Motif : recherche historique | 4,4 % | 9,3 % |
| Retraités | 60,4 % | 63,5 % |
| 75 ans et plus | 9,1 % | 16,9 % |
| Femmes | 43,1 % | 48,1 % |
| Information trouvée « totalement » | 38,1 % | 39,9 % |
| Documents numérisés « très faciles » à lire | 37,2 % | 37,2 % |
| Arrivée par les favoris | 38,6 % | 31,5 % |

**Message retenu** : le public est le même (généalogistes, retraités, un peu plus âgé), et la
seule question posée dans les mêmes termes aux deux éditions — la recommandation sur 0-10 —
est celle qui bouge le plus (9-10 : +13 points ; 0-6 : −11).

**Écart au cadrage.** Le cadrage mettait l'accent sur « qui répond ». La donnée le déplace sur la
note : le profil bouge de quelques points, la note de treize. Et la comparaison du motif, que le
cadrage plaçait au centre (« barres groupées par motif »), est la plus fragile : les
questionnaires PDF joints au jeu montrent qu'en 2021 le motif est une question filtre obligatoire
à choix unique (8 réponses dont 2 nouvelles), alors qu'en 2014 c'était une sous-question à cases
multiples (« Si vous êtes venu consulter des archives, c'était… », 9 réponses). Le fichier ne porte
pourtant qu'une réponse par personne pour 2014, sans dire comment elle a été retenue. D'où
l'encadré sous le graphique du motif.

## La forme

1. Chapô calculé + 4 KPI « 2021, contre 2014 ».
2. Preuve : barres groupées 2014 (gris) / 2021 (bleu) sur trois classes de note.
3. Motif : barres horizontales groupées, triées par part 2021, avec l'encadré de comparabilité.
4. Nuance « qui répond » : petits multiples (âge, situation, sexe, diplôme), titres calculés
   « au plus N points d'écart ».
5. Nuance « ce qu'ils font » : petits multiples (information trouvée, documents numérisés,
   fréquence, arrivée, première visite) — rien ne bouge de plus de 7 points.
6. Exploration : facettes sur les répondants (motif, âge, situation, sexe) → toutes les parts
   recalculées pour ce sous-public, tableau avec les effectifs de chaque part.

## Honnêteté

- **Pas représentatif** : enquêtes auto-administrées, effectifs affichés partout, pas de « les
  Français ». Aucune pondération publiée.
- **Dénominateur** : chaque part est calculée parmi les répondants à la question, cette année-là
  (`unpivot drop-empty`). Les effectifs sont dans chaque source de graphique et dans le tableau.
  L'âge manque pour 2 869 répondants de 2014.
- **Libellés rapprochés par la page** (casse, abréviations). Le fichier se dit « harmonisé » mais
  ne l'est pas au niveau des modalités.
- **Réponses nouvelles en 2021** (« pas de recherche », « autre situation ») : dessinées à 0 en 2014,
  dit sous les graphiques ; vides dans le tableau accessible.
- **Arrondi** : parts du texte arrondies au point depuis la valeur exacte (une première version
  arrondissait deux fois : 23,47 → 23,5 → 24 ; corrigé).
- **Causalité** : la page ne dit pas pourquoi la note monte ; elle signale que l'information n'est
  pas mieux trouvée et que le périmètre des services peut avoir changé (type de service renseigné
  en 2021 seulement).
- Classes 9-10 / 7-8 / 0-6 : un choix de la page, dit.

## Phrase de lecture

« À la même question, la part des 9 et 10 gagne 13 points, de 39 à 52 %, et celle des notes de 0
à 6 en perd 11, de 23 à 12 %. » Tous les nombres viennent de `syn` (aucun en dur).

## Ce qu'on ne montre pas

Représentativité, identité des services d'une enquête à l'autre, cause de la hausse, non-réponses
(réparties nulle part), colonnes à réponses multiples (`statut_pro`, 497 lignes avec `;`), âges
invraisemblables (< 15 ans : 3 en 2014, 11 en 2021), la centaine d'autres colonnes (surtout 2021
seulement).

## Angles écartés

- Carte par département : `departement_nom` n'existe qu'en 2021 (9 612 vides) — pas de
  comparaison possible.
- Note moyenne (7,6 → 8,2) : juste, mais moins parlante que la distribution, et une moyenne
  d'échelle ordinale se discute.
