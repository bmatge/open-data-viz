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
  '/pages/annuaire-des-services-dgfip/': ['a-faire', null, ''],
  '/pages/tourisme-et-handicap/': ['reproduite', '/viz/tourisme-et-handicap', 'Même gabarit que Qualité Tourisme ; facette multivaluée native'],
  '/pages/accompagnements-actions-fnum/': ['a-faire', null, ''],
  '/pages/entreprises-restauration-notre-dame': ['reproduite', '/viz/entreprises-restauration-notre-dame', 'Carte à 2 couches issues de 2 portails Opendatasoft'],
  '/pages/fiscalite-locale-particuliers/?headless=true': ['reproduite', '/viz/fiscalite-locale', 'Choroplèthe départementale + tableau serveur sur 174 668 lignes'],
  '/pages/barometre-france-num/': ['a-faire', null, ''],

  '/pages/comptabilite-etat/': ['impossible', null, 'Page 404 et jeu de données absent du catalogue'],
  '/pages/signalconso/': ['impossible', null, 'Page 404 (le jeu de données, lui, existe toujours)'],
  '/pages/rappelconso/': ['impossible', null, 'Page 404 et jeu de données absent du catalogue'],
  '/pages/annuaire-centres-controles-techniques/': ['impossible', null, 'Page 404, jeux de données absents, accès non public'],
  '/pages/livre-d-or/': ['impossible', null, 'Page 404'],
  '/pages/visualisation-liste-des-complements-alimentaires/': ['impossible', null, 'Page servie mais jeu de données supprimé : dataviz vide en production']
};

const DEFAUT_HORS_PERIMETRE = 'Cible externe au portail : pas une page de dataviz Opendatasoft';

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
