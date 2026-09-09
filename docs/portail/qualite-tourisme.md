# Label Qualité tourisme

- **URL** : https://data.economie.gouv.fr/pages/qualite-tourisme/ + page de détail `/pages/fiche-etablissement/?ville=…&activite=…&nom=…&dataset=etablissements-labellises-qualite-tourisme` (partagée avec Tourisme & Handicap).
- **Producteur (badge catalogue)** : DGE
- **Jeu** : `etablissements-labellises-qualite-tourisme` — 3 604 lignes, public. Champs : `docid, nom_du_professionnel, partenaires, activite_du_professionnel, ville, code_postal_du_professionnel, site_web, adresse, telephone, email_de_l_etablissement, questionnaire_de_satisfaction, coordonnees_geographiques, region, departement` (146 lignes sans département).
- **Relevé visuel** : 2026-09-09.

## Page principale

1. **En-tête** : logo « Qualité Tourisme » + H1 « Qualité Tourisme ». Deux paragraphes : « La marque Qualité Tourisme™ est la seule marque d'État attribuée aux professionnels du tourisme pour la qualité de leur accueil et de leurs prestations. » puis « Découvrez *nos données* ↗ (lien vers `/explore/dataset/etablissements-labellises-qualite-tourisme`) ainsi que les établissements labellisés. *En savoir plus* ↗ (atout-france.fr/fr/qualite-tourisme) ».
2. **Barre de recherche** sur une ligne, 5 éléments : 
   - **Mots clés** (champ texte, placeholder « Mots clés ») avec **autocomplétion** sur `nom_du_professionnel LIKE 'xxx*'` (10 suggestions + « + de 10 résultats »). Validé, il pose `q = nom_du_professionnel:<texte>` (recherche plein texte sur le nom).
   - **Activités** : select multiple « Séléctionner une ou plusieurs options » (sic), facette `activite_du_professionnel`, **28 valeurs** : Office de tourisme 862 · Camping 634 · Lieu de visite 459 · Hôtel-restaurant 287 · Hôtel 238 · Restaurant 219 · Caveaux et points de vente 182 · Sport de nature 169 · Chambre d'hôtes 94 · Café, bar, brasserie 63 · Sortie nature 61 · Parc de loisir 45 · Commerce 40 · VTC - Limousine 37 · Visite d'entreprise 37 · Restaurant de plage 33 · Etablissement de loisir 27 · Site de mémoire 24 · Village de vacances 22 · Agence de locations saisonnières 20 · Ecomusée 18 · Résidence de tourisme 10 · Visite guidée 10 · Séminaire 5 · Maison d'écrivain 3 · Parc à thème 2 · Site de préhistoire 2 · Port de plaisance 1.
   - **Département** : select multiple, facette `departement` triée alphanum.
   - **Commune ou code postal** : champ texte avec autocomplétion groupée `code_postal, ville` (`ville LIKE 'x*' OR code_postal LIKE 'x*'`), 10 suggestions.
   - Bouton bleu **Rechercher** : c'est lui qui applique les filtres (les selects ne filtrent pas à la volée : ils remplissent `params.search`, le bouton copie dans `ctx.parameters`). Les facettes des selects sont calculées sur un contexte `ctxsearch` séparé (elles se restreignent mutuellement, pas par le résultat affiché).
   - Un lien de réinitialisation (« Nouvelle recherche ») remet tout à zéro. L'URL est synchronisée avec les filtres (`ctxurl-urlsync`).
3. **Compteur** H4 bleu « **3604** établissements labellisés » (COUNT du contexte filtré) et, à droite, un **select « Vue carte / Vue liste »** (Vue carte par défaut).
4. **Vue carte** : une carte Leaflet pleine largeur (≈ 600 px), fond Huwise/diplomatie, une couche `#000091` en clusters numérotés (au chargement : 442, 317, 281, 238, 795, 704, 201, 178, 164, 23 en Corse…). **Infobulle au clic** = une `fr-card` : tag « <activité> » avec icône gobelet, titre bleu = nom, « VILLE - CP », bouton secondaire « Voir la fiche » vers la page de détail. Sous la carte, bandeau bleu pâle « **Centrer la carte sur :** » avec 6 boutons : France Métropolitaine (actif, plein) / Martinique / Guadeloupe / Guyane / La Réunion / Mayotte — chaque bouton remplace la carte par une autre `ods-map` (six `ng-if`) centrée sur le territoire.
5. **Vue liste** : grille de **12 cartes DSFR par page** (4 colonnes) : tag violet clair « <activité> », titre en gras (nom du professionnel, casse d'origine, souvent MAJUSCULES), « VILLE - CP ». Chaque carte est un lien vers la fiche. **Pagination** en bas : « 1 2 3 4 5 6 7 8 >> » (8 numéros visibles, 301 pages en tout). Ordre = ordre du jeu (pas de tri exposé).

## Page de détail « Fiche établissement »
- Lien retour « ← Nouvelle recherche » (vers `/pages/qualite-tourisme` ou `/pages/tourisme-et-handicap` selon le paramètre `dataset`).
- H1 = nom ; à droite bouton bleu « **Donner son avis** ↗ » (lien `questionnaire_de_satisfaction`).
- Carte DSFR « **Informations générales** » en 3 colonnes : **Etablissement** (nom) / **Adresse** (`adresse`, `CP VILLE`, `Département, Région`) / **carte Leaflet** zoomée (max-zoom 17, épingle bleue, sans infobulle). Deuxième rangée : **Site Web** (lien externe) / **Informations de contact** (téléphone, e-mail). Chaque rubrique a un petit soulignement bleu.
- Sélection de l'enregistrement par `refine.ville` + `refine.nom_du_professionnel` + `refine.activite` (attention : le paramètre s'appelle `activite`, pas `activite_du_professionnel` ; en pratique la fiche s'est bien affichée).

## Données à reproduire fidèlement
- Compteur, 28 activités, ~100 départements, recherche par nom (autocomplétion) et par commune/CP (autocomplétion), déclenchement par bouton.
- Carte cluster + infobulle 3 champs + lien fiche ; 6 recentrages territoriaux (dont **Mayotte**).
- Liste paginée 12/page avec le même triplet (activité, nom, ville-CP).
- Fiche : 9 champs (nom, adresse, CP, ville, département, région, site web, téléphone, e-mail) + lien questionnaire + mini-carte.
