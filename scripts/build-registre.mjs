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
  '/pages/visualisation-decp-augmente/': ['reproduite', '/viz/decp-augmente', 'Recréée en récit (2026-09-26) : AWS-Achat s’arrête en 2023, PES Marchés prend le relais ; 994 123 lignes, pas autant de marchés (FP-020)'],
  '/pages/dataviz-plan-de-relance': ['reproduite', '/viz/plan-de-relance', 'Recréée en récit (2026-09-26) : 61 % de PME, mais 61 % de grandes entreprises sur la décarbonation ; un site = 19,5 % du CO₂'],

  '/pages/dataviz-prix-des-carburants': ['reproduite', '/viz/prix-des-carburants', 'Recréée en récit (2026-09-26) : la station fait le prix, pas la région ; heures de relevé rendues justes (timezone retiré, FP-019)'],
  '/pages/entreprise-patrimoine-vivant/': ['reproduite', '/viz/entreprise-patrimoine-vivant', 'Recréée en récit (2026-09-26) : un label de très petites entreprises, 62 % de PME parmi les tailles déclarées, pas 34 % ; une fiche sur trois vide (FP-024)'],
  '/pages/comptabilite-generale/': ['reproduite', '/viz/comptabilite-generale', 'Recréée en récit (2026-09-26) : la dette fait 90 % de la hausse du passif ; plus de solde par mission (95 % des produits sans mission, PG-042)'],
  '/pages/qualite-tourisme/': ['reproduite', '/viz/qualite-tourisme', 'Annuaire cartographié : 1 carte au lieu de 6, facettes cherchables'],
  '/pages/annuaire-des-services-dgfip/': ['reproduite', '/viz/annuaire-services-dgfip', '21 761 services — quatrième emploi du gabarit annuaire'],
  '/pages/tourisme-et-handicap/': ['reproduite', '/viz/tourisme-et-handicap', 'Recréée en récit (2026-09-26) : le label suit ses relais locaux, la Charente-Maritime pèse un tiers de la Nouvelle-Aquitaine (PG-049)'],
  '/pages/accompagnements-actions-fnum/': ['analyse', '/viz/formations-france-num', 'Jeu de données à zéro enregistrement : analyse au lieu de reproduction'],
  '/pages/entreprises-restauration-notre-dame': ['reproduite', '/viz/entreprises-restauration-notre-dame', 'Carte à 2 couches issues de 2 portails Opendatasoft'],
  '/pages/fiscalite-locale-particuliers/?headless=true': ['reproduite', '/viz/fiscalite-locale', 'Recréée en récit (2026-09-26) : la surtaxe des résidences secondaires ×7, rupture de 2024 ; moyennes pondérées par la population'],
  '/pages/barometre-france-num/': ['reproduite', '/viz/barometre-france-num', 'Refonte en trois régimes d’accès (profil partagé), relue le 2026-09-26 ; la reproduction fidèle a été retirée le même jour'],

  '/pages/comptabilite-etat/': ['analyse', '/viz/non-reproduites', 'Page 404, jeu supprimé — sujet couvert par la page Comptabilité générale'],
  '/pages/signalconso/': ['reproduite', '/viz/signalconso', 'Page 404, jeu vivant. Recréée en récit (2026-09-26) : 40 % jamais transmis ; 70,6 % de réponses parmi les transmis, pas 38 % (FP-021)'],
  '/pages/rappelconso/': ['reproduite', '/viz/rappelconso', 'Page 404 et jeu renommé : la v2 existe ; relecture métier du 2026-09-26, compte des fiches (jeu -espaces) et non des codes-barres'],
  '/pages/annuaire-centres-controles-techniques/': ['reproduite', '/viz/centres-controle-technique', 'Page 404 et jeux renommés : 6 113 centres retrouvés'],
  '/pages/livre-d-or/': ['analyse', '/viz/non-reproduites', 'Page 404, aucun jeu associé : rien à reprendre'],
  '/pages/visualisation-liste-des-complements-alimentaires/': ['analyse', '/viz/non-reproduites', 'Page servie mais jeu supprimé : seul un jeu « preprod » vide subsiste']
};

// Lot 8 (2026-09-09) : les entrees « hors perimetre » reprises une a une. Le lien
// sort du portail, mais la donnee y est : la plupart se reproduisent.
Object.assign(STATUTS, {
  'https://www.economie.gouv.fr/treshautdebit/la-fermeture-du-reseau-cuivre-dans-votre-commune':
    ['reproduite', '/viz/fermeture-reseau-cuivre', 'Recréée en récit (2026-09-26) : l’abonnement cuivre a fermé dans 77 % des communes, l’arrêt technique tombe à 85 % en 2028-2029 (AV-037)'],
  '/explore/assets/registre-public-des-aides-de-minimis/view/':
    ['reproduite', '/viz/aides-de-minimis', 'Page Studio (4 KPI, 4 filtres, tableau) : le JSON de Studio lu comme spécification ; relecture métier du 2026-09-26'],
  '/explore/dataset/ir-declarations-2042-nat/':
    ['reproduite', '/viz/impot-sur-le-revenu?nom=1AJ', 'Jeu sans dataviz : exploration case par case sur 19 ans, état dans l\'URL ; unité du montant calculée (relecture du 2026-09-26)'],
  'https://www.economie.gouv.fr/dgfip/bulletins-officiels':
    ['reproduite', '/viz/bofip', 'Moteur de recherche plein texte serveur sur 9 148 documents, chronologie des versions publiées (relecture du 2026-09-26)'],
  'https://data.aide-developpement.gouv.fr':
    ['reproduite', '/viz/aide-publique-developpement', 'Recréée en récit (2026-09-26) : en équivalent-don, les prêts font 79 % de la hausse de 2020 ; 33,6 Md€ et non 44,9 versés, 60 % sans pays (FP-023)'],
  'https://prix.conso.gouv.fr/controle-technique':
    ['reproduite', '/viz/prix-controle-technique', 'Recréée en récit (2026-09-26) : changer de centre fait gagner autant que changer de département ; facettes serveur possibles (FP-018)'],
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
