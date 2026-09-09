// Reconstruit public/data/registre.json depuis le catalogue ODS vivant + le
// tableau de statuts ci-dessous. Le registre est joint aux enregistrements ODS
// (cle : `lien`) par <dsfr-data-join> sur la page d'accueil.
//
//   node scripts/build-registre.mjs
//
// Statuts :
//   reproduite     -> une page de ce repo reproduit la dataviz
//   a-faire        -> reproductible, pas encore traitee
//   analyse        -> non reproduite, analyse detaillee a la place
//   hors-perimetre -> la cible n'est pas une page de dataviz du portail ODS
//   impossible     -> page cible et/ou jeu de donnees source disparus

import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const APIKEY = 'cd2cbe36f45ff5f17f5455606e4ae3af783fc8b793993b0b7528e7b1';
const DATASET = 'interne-contenus-catalogue-visualisations';
const ENDPOINT =
  `https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/${DATASET}/records` +
  `?limit=100&order_by=classement_a_la_une%20desc&apikey=${APIKEY}`;

const LIBELLES = {
  reproduite: { texte: 'Reproduite', classe: 'fr-badge--success' },
  'a-faire': { texte: 'À reproduire', classe: 'fr-badge--info' },
  analyse: { texte: 'Analyse seule', classe: 'fr-badge--new' },
  'hors-perimetre': { texte: 'Hors périmètre', classe: 'fr-badge--grey' },
  impossible: { texte: 'Source disparue', classe: 'fr-badge--error' }
};

// Cle = champ `lien` du catalogue ODS, tel que renvoye par l'API (a la barre finale pres).
const STATUTS = {
  '/pages/visualisation-decp-augmente/': ['reproduite', '/viz/decp-augmente', '4 graphiques agrégés côté serveur sur 994 000 lignes'],
  '/pages/dataviz-plan-de-relance': ['reproduite', '/viz/plan-de-relance', 'Carte POI + 2 graphiques + facettes sur un seul fetch'],

  '/pages/dataviz-prix-des-carburants': ['reproduite', '/viz/prix-des-carburants', 'unpivot des 6 colonnes de prix + choroplèthe régionale embarquée'],
  '/pages/entreprise-patrimoine-vivant/': ['reproduite', '/viz/entreprise-patrimoine-vivant', '61 600 caractères de template contre une trentaine de lignes'],
  '/pages/comptabilite-generale/': ['reproduite', '/viz/comptabilite-generale', '517 489 lignes, 6 agrégations serveur, aucune ligne dans le navigateur'],
  '/pages/qualite-tourisme/': ['reproduite', '/viz/qualite-tourisme', 'Annuaire cartographié : 1 carte au lieu de 6, facettes cherchables'],
  '/pages/annuaire-des-services-dgfip/': ['reproduite', '/viz/annuaire-services-dgfip', '21 761 services — quatrième emploi du gabarit annuaire'],
  '/pages/tourisme-et-handicap/': ['reproduite', '/viz/tourisme-et-handicap', 'Même gabarit que Qualité Tourisme ; facette multivaluée native'],
  '/pages/accompagnements-actions-fnum/': ['analyse', '/viz/formations-france-num', 'Jeu de données à zéro enregistrement : analyse au lieu de reproduction'],
  '/pages/entreprises-restauration-notre-dame': ['reproduite', '/viz/entreprises-restauration-notre-dame', 'Carte à 2 couches issues de 2 portails Opendatasoft'],
  '/pages/fiscalite-locale-particuliers/?headless=true': ['reproduite', '/viz/fiscalite-locale', 'Choroplèthe départementale + tableau serveur sur 174 668 lignes'],
  '/pages/barometre-france-num/': ['reproduite', '/viz/barometre-france-num', 'Explorateur des 6 millésimes ; jointure des libellés retirée (référentiels homonymes)'],

  '/pages/comptabilite-etat/': ['analyse', '/viz/non-reproduites', 'Page 404, jeu supprimé — sujet couvert par la page Comptabilité générale'],
  '/pages/signalconso/': ['reproduite', '/viz/signalconso', 'Page 404 mais jeu vivant : 1,7 M de signalements reconstitués'],
  '/pages/rappelconso/': ['reproduite', '/viz/rappelconso', 'Page 404 et jeu renommé : la v2 existe, mise à jour ce jour'],
  '/pages/annuaire-centres-controles-techniques/': ['reproduite', '/viz/centres-controle-technique', 'Page 404 et jeux renommés : 6 113 centres retrouvés'],
  '/pages/livre-d-or/': ['analyse', '/viz/non-reproduites', 'Page 404, aucun jeu associé : rien à reprendre'],
  '/pages/visualisation-liste-des-complements-alimentaires/': ['analyse', '/viz/non-reproduites', 'Page servie mais jeu supprimé : seul un jeu « preprod » vide subsiste']
};

// Lot 8 (2026-09-09) : les entrees « hors perimetre » reprises une a une. Le lien
// sort du portail, mais la donnee y est : la plupart se reproduisent.
Object.assign(STATUTS, {
  'https://www.economie.gouv.fr/treshautdebit/la-fermeture-du-reseau-cuivre-dans-votre-commune':
    ['reproduite', '/viz/fermeture-reseau-cuivre', 'Page Drupal derrière Cloudflare ; pipeline serveur (recherche, facettes, pagination), carte par année'],
  '/explore/assets/registre-public-des-aides-de-minimis/view/':
    ['reproduite', '/viz/aides-de-minimis', 'Page Studio (4 KPI, 4 filtres, tableau) : le JSON de Studio lu comme spécification'],
  '/explore/dataset/ir-declarations-2042-nat/':
    ['reproduite', '/viz/impot-sur-le-revenu?nom=1AJ', 'Jeu sans dataviz : exploration case par case sur 19 ans, état dans l\'URL'],
  'https://www.economie.gouv.fr/dgfip/bulletins-officiels':
    ['reproduite', '/viz/bofip', 'Moteur de recherche plein texte serveur sur 9 146 documents, chronologie'],
  'https://data.aide-developpement.gouv.fr':
    ['reproduite', '/viz/aide-publique-developpement', 'Portail Opendatasoft tiers : 7 contextes → 1, carte du monde en un attribut'],
  'https://prix.conso.gouv.fr/controle-technique':
    ['reproduite', '/viz/prix-controle-technique', 'Jeu successeur de controle_techn ; aucune facette déclarée : filtres en dur, choroplèthe des prix'],
  'https://data.ofgl.fr':
    ['analyse', '/viz/ofgl', 'Atelier de cartographie sur des agrégats OFGL, pas une dataviz ; les balances brutes exigent une règle comptable'],
  'https://www.francebleu.fr/services/prix-carburants':
    ['reproduite', '/viz/prix-des-carburants', 'Même jeu que Prix des carburants : la reproduction couvre carburant, distributeur et horaires'],
  'https://www.prix-carburants.gouv.fr':
    ['reproduite', '/viz/prix-des-carburants', 'Même jeu que Prix des carburants : carte et recherche de points de vente'],
  'https://www.entreprises.gouv.fr/espace-entreprises/s-informer-sur-la-reglementation/le-label-entreprise-du-patrimoine-vivant':
    ['reproduite', '/viz/entreprise-patrimoine-vivant', 'Page réglementaire ; le jeu EPV est celui de la page Entreprises du patrimoine vivant'],
  'https://139bercy.github.io/charte-open-data-mef/':
    ['hors-perimetre', null, 'Document de gouvernance sans jeu de données : la seule entrée réellement hors périmètre']
});

const DEFAUT_HORS_PERIMETRE = 'Cible externe au portail — voir l\'inventaire des entrées non reproduites';

function statutPour(record) {
  const lien = record.lien || '';
  if (STATUTS[lien]) return STATUTS[lien];
  if (/^https?:/i.test(lien)) return ['hors-perimetre', null, DEFAUT_HORS_PERIMETRE];
  if (lien.startsWith('/explore/')) return ['hors-perimetre', null, 'Vue native du portail (explore/asset), pas une page composée'];
  return ['a-faire', null, ''];
}

const reponse = await fetch(ENDPOINT);
if (!reponse.ok) throw new Error(`ODS ${reponse.status} ${reponse.statusText}`);
const { results } = await reponse.json();

const registre = results.map((record) => {
  const [statut, url, note] = statutPour(record);
  const libelle = LIBELLES[statut];
  return {
    lien: record.lien,
    titre: record.titre,
    repro_statut: statut,
    repro_libelle: libelle.texte,
    repro_badge: libelle.classe,
    repro_url: url || record.lien,
    repro_cible: url ? '_self' : '_blank',
    repro_note: note
  };
});

const cible = join(dirname(dirname(fileURLToPath(import.meta.url))), 'public', 'data', 'registre.json');
await writeFile(cible, `${JSON.stringify(registre, null, 2)}\n`, 'utf8');

const compte = registre.reduce((acc, r) => ({ ...acc, [r.repro_statut]: (acc[r.repro_statut] || 0) + 1 }), {});
console.log(`${registre.length} entrées écrites dans ${cible}`);
console.log(compte);
