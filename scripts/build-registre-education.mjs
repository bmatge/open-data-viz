// Reconstruit public/data/registre-education.json depuis le catalogue vivant du
// portail Education (jeu `dataviz-a-la-une`) + le tableau de statuts ci-dessous.
// Le registre est joint aux enregistrements ODS (cle : `titre`) par
// <dsfr-data-join> sur la page /education.
//
//   node scripts/build-registre-education.mjs
//
// Jumeau de build-registre.mjs, qui fait le meme travail pour data.economie.
// Deux differences avec le portail Bercy, toutes deux relevees au lot 12 :
//   1. le catalogue Education repond SANS cle (CORS ouvert, verifie a l'API) ;
//   2. il porte 36 entrees mais au plus 33 dataviz : trois pages ne contiennent
//      aucune directive ods-*, aucun iframe, aucune requete /api/ — ce sont des
//      galeries editoriales de liens. Elles sont classees `analyse`.
//
// Statuts : memes cinq que le portail Bercy, memes libelles.

import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const DATASET = 'dataviz-a-la-une';
const ENDPOINT =
  `https://data.education.gouv.fr/api/explore/v2.1/catalog/datasets/${DATASET}/records` +
  `?limit=100&order_by=id%20desc`;

const LIBELLES = {
  reproduite: { texte: 'Reproduite', classe: 'fr-badge--success' },
  'a-faire': { texte: 'À reproduire', classe: 'fr-badge--info' },
  analyse: { texte: 'Analyse seule', classe: 'fr-badge--new' },
  'hors-perimetre': { texte: 'Hors périmètre', classe: 'fr-badge--grey' },
  impossible: { texte: 'Source disparue', classe: 'fr-badge--error' }
};

// Les quatre familles de cibles du portail, relevees au lot 12 (docs/portail-education/README.md).
// Portee en donnee pour que la page catalogue puisse en faire une facette : c'est
// la difference structurelle la plus nette avec Bercy, qui n'avait qu'une famille.
const NATURES = {
  angular: 'Page AngularJS',
  vue: 'Vue de jeu héritée',
  studio: 'Page Studio',
  asset: 'Asset /explore/assets',
  externe: 'Hors portail Éducation'
};

// Cle = champ `titre` du catalogue (unique sur les 36 entrees, verifie a l'API).
// Valeur = [statut, url locale ou null, note, nature].
const STATUTS = {
  // --- Lot 14 (vague pilote) : six pages, choisies pour couvrir les quatre
  // familles de sources et les motifs que Bercy n'a pas montres.
  'IPS Collèges': ['reproduite', '/education/dataviz-ips-colleges',
    'Maille académique : 6 980 collèges, choroplèthe par académie et distribution des IPS', 'angular'],
  'IPS Ecoles': ['reproduite', '/education/dataviz-ips-ecoles',
    '279 318 points : require-where + fetch-mode=export, aucune requête tant qu’aucun filtre', 'angular'],
  'Etablissements labellisés Euroscol': ['reproduite', '/education/etablissements-euroscol',
    'Vue de jeu héritée ; les six drapeaux 0/1 repliés en un multivalué par fold', 'vue'],
  'Annuaire des internats': ['reproduite', '/education/annuaire-des-internats',
    'Gabarit annuaire éprouvé chez Bercy, rejoué sur un jeu à 44 colonnes vides sur 79', 'vue'],
  'Données ouvertes de France Éducation international': ['reproduite', '/education/fei-chiffres-cles',
    'Page Studio à neuf jeux : la config Studio lue comme spécification', 'studio'],
  'Territoires numériques éducatifs': ['reproduite', '/education/tne-dashboard',
    'Tableau de bord multi-sources : pivot natif, et le cumul qui reste au résidu', 'angular'],

  // --- Les trois galeries editoriales : aucune dataviz a reproduire.
  'Challenge wikidata en classe': ['analyse', '/education/non-reproduites',
    'Galerie éditoriale de liens : aucune directive ods-*, aucun iframe, aucune requête /api/', 'angular'],
  'Challenge wikidata en classe 2026': ['analyse', '/education/non-reproduites',
    'Même nature que l’édition précédente : page de liens, pas de dataviz', 'angular'],
  'Challenge de la Data 2025': ['analyse', '/education/non-reproduites',
    'Page de présentation du challenge : aucune visualisation de données', 'angular']
};

// Nature des entrees pas encore traitees, pour que la facette soit renseignee
// des maintenant. Source : le tableau des 36 entrees de docs/portail-education/README.md.
const NATURES_A_FAIRE = {
  'Offre de langues dans les collèges et lycées': 'angular',
  'IPS EREA': 'angular',
  'Génération 2024': 'angular',
  'IPS Lycées': 'angular',
  "L'annuaire des bureaux des entreprises": 'vue',
  'Cartographie Conseil National de la Refondation - CNR Education': 'angular',
  'Cartographie PIX fiche établissement': 'angular',
  'Équipements sportifs en milieu scolaire': 'externe',
  'Vue cartographique d’un établissement produite par la forge des communs numériques éducatifs': 'externe',
  'Ted-i : Déploiement des robots de téléprésence': 'asset',
  'Hybridation de l’enseignement en lycée': 'vue',
  'Appel à projet Socle Numérique dans les Ecoles Elémentaires': 'vue',
  'Cartographie des ULIS-TFV': 'angular',
  'Cartographie de l’accompagnement de la déficience sensorielle': 'angular',
  'Cartographie des labellisations Egalité fille-garçon': 'angular',
  'Suivi d\'impact de l\'Opération de Sensibilisation au risque de l\'hameçonnage "Cactus"': 'studio',
  'Portrait de territoire': 'externe',
  'Accessibilité des équipements sportifs': 'externe',
  'Passe ton Hack d\'abord!': 'externe',
  'Les personnels dans les écoles primaires et maternelles': 'externe',
  'Les personnels dans les collèges français': 'externe',
  'Les personnels dans les lycées français': 'externe',
  'GAR - les données sur les ressources numériques éducatives accessibles via le GAR': 'asset',
  'Capytale Analyse des usages': 'asset',
  'DNMA Les usages numériques constatés via les ENT': 'asset',
  'Quelles personnalités ont donné leur nom aux écoles ?': 'asset',
  'France Éducation international - Sélection de projets européens portant sur les données': 'asset'
};

function statutPour(record) {
  const titre = record.titre || '';
  if (STATUTS[titre]) return STATUTS[titre];
  return ['a-faire', null, '', NATURES_A_FAIRE[titre] || 'angular'];
}

const reponse = await fetch(ENDPOINT);
if (!reponse.ok) throw new Error(`ODS ${reponse.status} ${reponse.statusText}`);
const { results } = await reponse.json();

const registre = results.map((record) => {
  const [statut, url, note, nature] = statutPour(record);
  const libelle = LIBELLES[statut];
  // Seuls `titre` (la cle de jointure) et des champs prefixes `repro_` sortent
  // d'ici. `dsfr-data-join` ne prefixe QUE les champs en collision (verifie au
  // source, `mergeRow`) : republier `lien` ou `thematique` les ferait arriver en
  // `reg_lien` / `reg_thematique` dans le template, ce qui se lit mal. La
  // graphie « Education » sans accent est corrigee cote source, par
  // `dsfr-data-normalize replace-fields`, pas ici.
  return {
    titre: record.titre,
    repro_statut: statut,
    repro_libelle: libelle.texte,
    repro_badge: libelle.classe,
    repro_url: url || record.lien,
    repro_cible: url ? '_self' : '_blank',
    repro_note: note,
    repro_nature: NATURES[nature] || NATURES.angular
  };
});

const cible = join(dirname(dirname(fileURLToPath(import.meta.url))), 'public', 'data', 'registre-education.json');
await writeFile(cible, `${JSON.stringify(registre, null, 2)}\n`, 'utf8');

const compte = registre.reduce((acc, r) => ({ ...acc, [r.repro_statut]: (acc[r.repro_statut] || 0) + 1 }), {});
console.log(`${registre.length} entrées écrites dans ${cible}`);
console.log(compte);
