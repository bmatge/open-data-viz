# Tableau de bord Rappel Conso

- **URL catalogue** : `/pages/rappelconso/` → **404** ; la page vivante est https://data.economie.gouv.fr/pages/rappel-conso-v2/ (titre « Rappel Conso - V2 »).
- **Producteur (badge catalogue)** : DGCCRF
- **Jeu** : `rappelconso-v2-gtin-espaces` (18 573 rappels au 2026-09-09 ; champs de la fiche RappelConso : `categorie_produit`, `sous_categorie_produit`, `nature_juridique_rappel`, `modalites_de_compensation`, `date_publication`, …).
- **Relevé visuel** : 2026-09-09.

## Structure

1. **H1 centré dynamique** : « Tableau de bord Rappel Conso de **septembre 2026** » (mois/année de la date sélectionnée, par défaut aujourd'hui).
2. **« Sélection d'une autre date »** : un `<input type="date">` DSFR (jj/mm/aaaa, min 2019-01-01, max aujourd'hui, debounce 600 ms). Choisir une date `J` recalcule tout avec **trois fenêtres** : total = `date_publication < J`, année = `>= 1er janvier de l'année de J et < J`, mois = `>= 1er du mois de J et < J`. Le titre et les libellés des KPI suivent (« Sur l'année 2026 », « Sur le mois de septembre 2026 »).
3. **Carte « Filtres »** (*sticky* : elle reste collée en haut de l'écran pendant le scroll et masque le haut des sections) : deux **`<select>` natifs DSFR** :
   - **Catégorie du produit** (`categorie_produit`, facette alphanum) — 10 valeurs : alimentation · appareils électriques, outils · automobiles et moyens de déplacement · autres · bébés-enfants (hors alimentaire) · equipements de communication · hygiène-beauté · maison-habitat · sports-loisirs · vêtements, mode, epi.
   - **Sous-catégorie du produit** (`sous_categorie_produit`) — 55 valeurs (additifs alimentaires … viandes, liste complète dans le texte de page ci-dessus / API). Les deux listes sont **contextuelles** (facettes du contexte filtré) et les deux filtres s'appliquent aux 3 compteurs et aux 4 graphiques.
4. **« Nombre de rappels »** : trois KPI en grands chiffres bleus :
   - **18 573** « Sur toute la période (depuis Mars 2021) »
   - **2 394** « Sur l'année 2026 »
   - **90** « Sur le mois de septembre 2026 »
   (= `nhits` de chaque contexte).
5. **« Graphiques »** : 4 cartes (2 × 2) :
   - **Répartition par catégorie de produits** : barres verticales bordeaux `#721C24`, X = `categorie_produit` trié par valeur décroissante (max 20), Y « Nombre » (0-15k) : alimentation ≫ automobiles… > bébés-enfants > maison-habitat > appareils électriques > hygiène-beauté > vêtements > autres > sports-loisirs > equipements de communication. Légende « Nombre ».
   - **Famille de produits avec le plus de rappels** : barres bleu nuit `#1f2b50`, X = `sous_categorie_produit`, **top 20** décroissant (lait et produits laitiers ≈ 3,3k, viandes ≈ 3,2k, automobiles/motos ≈ 1,7k, produits de la pêche, autres, plats préparés, jouets, céréales, aliments diététiques, produits sucrés, fruits et légumes, herbes et épices, appareils électriques, cosmétiques, divers, soupes-sauces, matériel de cuisine, articles pour enfants, produits chimiques, cacao-café-thé) ; axe X masqué (`hide-x-legend`) mais labels inclinés visibles.
   - **Nature juridique du rappel** : camembert 2 parts (vert foncé « volontaire (sans arrêté préfectoral) » ≈ 87 %, ocre « imposé par arrêté préfectoral »).
   - **Modalités de compensation** : camembert (max 20 parts) — remboursement 12 401 · autre (voir informations complémentaires) 1 346 · remboursement|echange 1 317 · echange 933 · remboursement|autre 210 · réparation 149 · echange|autre 72 · + 8 combinaisons < 60 ; **2 001 lignes vides** exclues. Les valeurs combinées `a|b|c` sont des chaînes brutes distinctes (pas éclatées).
   - Nature juridique : volontaire 14 402 · imposé 2 178 · 2 001 vides.
   Palette des camemberts : `range-custom` (vert foncé, ocre, bleus).
6. Bouton bleu « **Consultez les données** ↗ » vers le jeu.

## Données à reproduire fidèlement
- Sélecteur de date avec les 3 fenêtres temporelles et le titre dynamique ; 3 KPI ; 2 selects contextuels (10 + 55 valeurs).
- 4 graphiques (2 barres triées desc, top 20 ; 2 camemberts) sur le contexte filtré par date + catégorie + sous-catégorie.
- Le lien du catalogue est cassé : le signaler dans le registre (page migrée).
