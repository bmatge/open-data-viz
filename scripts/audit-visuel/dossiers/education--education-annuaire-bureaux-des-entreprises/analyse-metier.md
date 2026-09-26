# Analyse metier — L'annuaire des bureaux des entreprises

> La lecture `dataviz-metier` : le sens avant la syntaxe.
> **Ce fichier n'est jamais ecrase par un script.** Les sorties du modele
> multimodal arrivent dans `constats/` ; ce qui est retenu se reecrit ici, a la main.

## La question posee, et pour quel lecteur

« Cet annuaire recense-t-il vraiment tous les bureaux des entreprises ? » — pour l'élu,
l'entreprise ou le journaliste qui s'en sert comme d'une liste complète ; puis, pour l'usager,
« quel bureau contacter près de chez moi ».

## L'histoire trouvée (recréation du 2026-09-26)

Rapporté à l'annuaire de l'éducation (lycées de l'éducation nationale avec
`voie_professionnelle = 1`, dédoublonnés par UAI), l'annuaire publié le 20/03/2026 recense
**233 bureaux privés pour 540 lycées privés sous contrat (43 %)**, contre **1 709 bureaux
publics pour 1 552 lycées publics** (> 100 %, SEP et EREA ayant leur propre ligne). Dans
**9 académies sur 30** qui comptent des lycées privés, aucun bureau privé n'est recensé —
Rennes 0/39, Normandie 0/31, Toulouse 0/30 ; Grenoble 1/34, Montpellier 1/22. Ailleurs, les
deux se rejoignent (Nantes 41/39, Nancy-Metz 24/25, Versailles 24/22). Le téléphone suit la
même logique : 100 % dans 12 académies, 0 % dans 3 (Normandie, La Réunion, Corse).

**Renversement** : la page précédente lisait « le privé, minoritaire partout, et absent de
départements entiers » et « Part du privé 12 % » comme un fait sur les lycées. C'est un fait
sur la collecte, académie par académie.

Angles écartés : le classement des métiers (compte les fiches ROME, pas l'offre — 861 lycées
à égalité sur six synonymes de « matelot ») ; le podium des diplômes (mêle paliers de seconde
et diplômes, compte des lycées et non des élèves).

## La forme retenue, et pourquoi elle sert cette question

- Barres horizontales groupées par académie : lycées privés (gris) / bureaux recensés (bleu),
  triées par nombre de lycées manquants. Le volume (et non le seul taux) garde visibles les
  zéros — une barre de 0 % disparaît, une barre grise sans bleu se voit.
- Barres horizontales triées de la part des bureaux avec téléphone : de 100 % à 0 %.
- Puis l'exploration (recherche, facettes, carte, liste) inchangée dans son principe.

## Honnetete de l'echelle

Comparaison de COMPTES à la maille académie × secteur, pas appariement UAI par UAI (un bureau
est souvent déclaré sous l'UAI d'une section professionnelle : l'appariement strict ne retrouve
que 185 lycées privés). Rapport national = somme / somme. Part avec téléphone = moyenne d'un
indicateur 0/100 par bureau, donc un ratio de sommes. `count(distinct)` ODS écarté : approché
(551 au lieu de 540).

## Phrase de lecture

« L'annuaire publié en recense 233 dans le privé, pour 540 lycées privés sous contrat qui
proposent la voie professionnelle : un rapport de 43 %. Dans 9 académies sur 30, aucun bureau
privé n'est recensé. » — calculée (`dsfr-data-repeat` sur l'agrégat national).

## Ce qu'on ne montre pas, et qu'il faut dire

10 bureaux sans coordonnées (hors carte, dans les comptes) ; 122 sans métier ni diplôme ;
5 courriels « #N/A » ; sites internet non vérifiés (ENT d'un autre établissement) ; 40 lignes
privées « sous contrat pour une partie des classes » gardées au dénominateur (les retirer
laisse le rapport sous 50 %). Tout est dit en fin de page, compté par la page.

## Ecarts avec l'original

Ajouts de données : le dénominateur (annuaire de l'éducation), les compteurs, le secteur
visible et filtrable, les manques du jeu nommés. Rien de retiré de ce que l'original donnait
au lecteur (contact, adresse, diplômes, recherche de métier).
