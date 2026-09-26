# Analyse métier — culture / entrepreneurs-etrangers

Fiche 26 du cadrage (`docs/portail-culture/proposition.md`). Niveau `dataviz-metier` : avancé.
Jeu : *Activité temporaire en France d'entrepreneurs de spectacles établis hors de France*,
ministère de la Culture, Tabular `e6a3517f-dac4-446f-bffd-02216be7bfb0`, mis à jour chaque jour
(1 658 lignes le 2026-09-27, dépôts du 2025-04-29 au 2026-09-25).

## L'histoire

La description du jeu donne la règle : l'entrepreneur établi hors de France informe la DRAC
« au moins un mois au préalable ». Le délai dépôt → début d'activité se calcule ligne à ligne :
il s'entasse juste après trente jours (726 déclarations sur 1 625 aux dates cohérentes, 45 %,
entre 30 et 44 jours ; pic à 31 jours, 118 déclarations), et 451 (28 %) sont en deçà de trente
jours, dont 23 déposées après le début. Le mois réglementaire est devenu une date limite.

**Écart au cadrage.** Le titre provisoire (« 1 658 déclarations en dix-sept mois ») est un
volume, pas un message ; le pays cité (Royaume-Uni 171) n'est que troisième derrière la Belgique
(301) et les États-Unis (262). Angle retenu : le préavis. Angles écartés : les pays seuls
(palmarès sans question), la saisonnalité (dix-sept mois, deux étés : illisible, dit en page).

## Plan et formes

1. Titre-message + chapô calculé + 4 KPI (déclarations, pays étrangers, part < 30 jours, part d'un jour).
2. Preuve : barres verticales par tranche de délai, ordonnées, les trois tranches sous le mois
   en couleur (`highlight-index="[0, 1, 2]"`), le reste gris. Tableau EEE / hors EEE : même
   habitude (26 % / 29 % en deçà).
3. Qui : barres pays triées, top 15, Belgique en évidence ; tableau a11y = tous les pays.
4. Où : barres région de la première représentation ; Île-de-France 763 (46 %).
5. Nuance : durée (513 d'un jour, 32 %) — un mois de préavis pour un soir.
6. Rythme : barres mensuelles, premier et dernier mois incomplets, sans conclusion de saison.
7. Exploration : facettes (délai, zone, pays, région, durée, catégorie) + liste avec délai et durée.
8. Ce qu'on ne montre pas, puis `#analyse`.

## Honnêteté

- Seuil en jours (30) quand la règle dit « un mois » : dit sous le graphique, avec l'effectif en
  mois civils (465 au lieu de 451, mesuré hors page le 2026-09-27).
- « En deçà » ≠ infraction : la base ne dit pas si la DRAC a accepté, ni si une date a bougé.
- 33 déclarations aux dates incohérentes (fin avant début, années 0026 / 252026) écartées des
  délais et durées, gardées dans les totaux ; nombre affiché en page.
- Statut : la description annonce « transmis » seulement, la colonne est vide pour 846 lignes.
- Zone EEE lue dans le préfixe du numéro (IE/HE, défini par la description) ; elle contredit la
  colonne pays pour 86 lignes : dit en page.
- 98 lignes sans pays, 32 « France » : dans les totaux, hors du compte des pays étrangers ;
  « France » visible dans le graphique des pays, avec une note.
- Région = première représentation seulement.

## Phrase de lecture (chapô)

« Du 29/04/2025 au 25/09/2026, 1 658 déclarations ont été publiées. Le plus souvent, elles
tombent juste après l'échéance : 45 % sont déposées 30 à 44 jours avant le début de l'activité.
Mais 451 (28 %) le sont moins de trente jours avant, dont 23 après le début. »

## Chiffres rejoués (2026-09-27)

Export complet par l'API Tabular (9 pages de 200, tunnel SOCKS), recalcul Python indépendant de
la page (formule de jours civils identique, seuils identiques) : 1 658 ; 1 625 cohérentes ; 33
incohérentes ; 451 < 30 j ; 23 < 0 ; 726 entre 30 et 44 ; 513 d'un jour ; 157 > 30 jours ;
IE 841 / HE 817 ; Belgique 301 ; 98 sans pays ; 32 France ; 58 pays étrangers ; Île-de-France
763 ; statut vide 846 / Transmis 812 ; catégorie 2 : 1 537 (93 %). Tous identiques à l'affichage.
