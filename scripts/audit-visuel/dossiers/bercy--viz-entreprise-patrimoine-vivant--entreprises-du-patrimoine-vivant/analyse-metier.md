# Analyse metier — Entreprises du patrimoine vivant

> La lecture `dataviz-metier` : le sens avant la syntaxe.
> **Ce fichier n'est jamais ecrase par un script.** Les sorties du modele
> multimodal arrivent dans `constats/` ; ce qui est retenu se reecrit ici, a la main.

## Recréation du 2026-09-26 (niveau avancé)

### L'histoire trouvée

Le chiffre vitrine de l'original est un artefact de dénominateur. Sur 1 267 entreprises
labellisées (export du 2026-08-24, labellisation la plus récente le 06/08/2026), **401 fiches
(32 %) sont vides** : aucun des huit champs descriptifs (site, taille, clientèle, description,
secteur, produits, gamme de prix, visite) n'est rempli. L'original divise pourtant par 1 267 :

| Indicateur | Original (÷ toutes les fiches) | Parmi les fiches qui répondent |
|---|---|---|
| PME | 34 % (434 / 1 267) | 62 % (434 / 703) ; TPE ou PME **96 %** (677 / 703) |
| Produits < 200 € | 24 % (308 / 1 267) | **42 %** (308 / 739) |
| Artisanales | 56 % (705 / 1 267) | 59 % (705 / 1 205) — le dénominateur change peu |

Deux histoires secondaires, vérifiées à l'API :
- **Rupture 2025** : 3 % de fiches vides parmi les labels de 2025 (11 / 368), contre 33 % à 53 %
  les autres années (2020 : 10 / 19). Le jeu ne dit pas pourquoi : on le dit, sans hypothèse.
- **L'écart par métier écrase la moyenne « accessible »** : parmi les entreprises qui publient
  une gamme, 97 % en Gastronomie (95 / 98) vendent sous 200 €, 12 % en Architecture et Patrimoine
  Bâti (14 / 119), où 77 % indiquent « Selon devis ».
- 66 entreprises ont une date de fin de label antérieure à la labellisation la plus récente du jeu
  (19 échues le 01/10/2025).

Angles écartés : la carte régionale en volume (pas de population ni de tissu d'entreprises
dans le jeu : Paris seul pèse 138 entreprises) ; un historique du label (le jeu ne publie que
les labels en cours).

### La forme retenue

- Avant / après (deux cartes) : le même champ, deux dénominateurs.
- Barres verticales empilées par année : la hauteur dit le rythme, la part claire le trou.
  Palette par défaut, sans `color-map`, pour que les pastilles d'infobulle restent justes (BUG-022).
- Barres horizontales triées, taux et non volumes, première barre mise en évidence
  (`selected-palette="neutral"` + `highlight-index`), effectif entre parenthèses dans le libellé.
- Exploration : recherche, facettes (dont « État de la fiche » et « Taille : Non renseignée »),
  quatre KPI ratio qui suivent les filtres, carte par univers, régions, liste.

### Honnêteté

Toutes les parts sont des ratios de comptes (indicateurs 0/1 ou 0/100 par entreprise) ;
aucune moyenne de taux. Les KPI d'exploration portent leur dénominateur dans le libellé
(« parmi les tailles déclarées »). L'hypothèse implicite — les fiches vides ressemblent aux
autres — est écrite en nuance.

### Phrase de lecture (calculée)

« Parmi les 703 qui déclarent leur taille, 96 % sont des TPE ou des PME ; mais 401 fiches (32 %)
ne disent rien d'autre que le nom, l'adresse et le métier. »

### Ce qu'on ne montre pas

Labels échus ou retirés (pas d'historique) ; parts rapportées aux fiches vides (nommées, jamais
comptées comme réponse) ; taux régionaux ; deux doublons de casse d'`univers` fusionnés.

### Écarts avec l'original

- KPI recalculés sur les fiches qui répondent (l'original compte les vides au dénominateur).
- Carrousel « moins de 200 € » et encadré éditorial retirés : la page ne plaide plus pour le
  label, elle le décrit. Liens utiles conservés en une ligne.
- Facette « État de la fiche » ajoutée.
