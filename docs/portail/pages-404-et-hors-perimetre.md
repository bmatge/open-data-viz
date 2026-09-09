# Pages 404 et cibles hors périmètre (constat du 2026-09-09)

> **Révisé le même jour (lots 6 à 8).** Signal Conso, Rappel Conso et contrôle technique ont été
> reconstitués sur leurs jeux successeurs (`/viz/signalconso`, `/viz/rappelconso`,
> `/viz/centres-controle-technique`). Les deux « vues natives » sont reproduites (`/viz/impot-sur-le-revenu`,
> `/viz/aides-de-minimis` — cette dernière est en fait une page Studio, pas une vue asset). Sur les neuf
> cibles externes : réseau cuivre, BOFiP, APD et prix des contrôles techniques sont reproduits,
> France Bleu, prix-carburants.gouv.fr et Label EPV renvoient à des pages existantes, OFGL est analysé
> (`/viz/ofgl`), la Charte reste hors périmètre. Le constat d'origine est conservé ci-dessous.

## Pages du portail répondant 404 (vérifié par `curl`, code HTTP 404)
| Entrée du catalogue | URL | Constat |
|---|---|---|
| Tableau de bord Signal Conso | `/pages/signalconso/` | 404. Jeu `signalconso` vivant (voir registre). |
| Tableau de bord Rappel Conso | `/pages/rappelconso/` | 404 ; **remplacée par `/pages/rappel-conso-v2/`** (décrite dans `rappel-conso.md`). |
| Annuaire des centres agréés de contrôle technique | `/pages/annuaire-centres-controles-techniques/` | 404. |
| Livre d'or | `/pages/livre-d-or/` | 404. |
| Tableau de bord des comptes de l'État | `/pages/comptabilite-etat/` | 404 ; doublon de « Comptabilité générale » (`comptabilite-generale.md`). |

## Vues natives du portail (pas des pages composées)
- **L'impôt sur le revenu : les déclarations nationales** → `/explore/dataset/ir-declarations-2042-nat/` : page « explore » standard Opendatasoft (onglets Informations / Tableau / Carte / Analyse / Export / API). Pas de mise en page spécifique à reproduire ; la « dataviz » est l'explorateur générique.
- **Registre des aides de minimis** → `/explore/assets/registre-public-des-aides-de-minimis/view/` : idem, vue « asset ».

## Cibles externes (hors portail)
Charte Open Data des MEF (139bercy.github.io), Fermeture du réseau cuivre (economie.gouv.fr), OFGL (data.ofgl.fr), Label EPV (entreprises.gouv.fr), Bulletins officiels des finances publiques (economie.gouv.fr/dgfip), France Bleu prix des carburants, prix-carburants.gouv.fr, Prix des contrôles techniques (prix.conso.gouv.fr), Aide publique au développement (data.aide-developpement.gouv.fr). Non visitées : elles ne sont pas des pages Opendatasoft du portail.
