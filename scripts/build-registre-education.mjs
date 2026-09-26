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
    'Recréée en récit (2026-09-26) : l’écart public-privé se creuse à chaque rentrée, 20,0 points en 2024 ; mesuré dans chaque méthode DEPP (PG-043)', 'angular'],
  'IPS Ecoles': ['reproduite', '/education/dataviz-ips-ecoles',
    'Recréée en récit (2026-09-26) : les écarts se jouent au quartier, 67 points entre déciles à Strasbourg pour 31 entre départements ; écoles sans IPS sorties de « 125 et plus » (PG-045)', 'angular'],
  'Etablissements labellisés Euroscol': ['reproduite', '/education/etablissements-euroscol',
    'Recréée en récit (2026-09-26) : un label de lycée, 15,4 % des lycées contre 0,9 % des écoles ; « Lille 149 » classait la taille des académies (FP-035), « 34 % de sections européennes » en fait 73 % des lycées (FP-036)', 'vue'],
  'Annuaire des internats': ['reproduite', '/education/annuaire-des-internats',
    'Gabarit annuaire éprouvé chez Bercy, rejoué sur un jeu à 44 colonnes vides sur 79', 'vue'],
  'Données ouvertes de France Éducation international': ['reproduite', '/education/fei-chiffres-cles',
    'Recréée en récit (2026-09-26) : +54 % d’inscriptions au TCF, 86 % de la hausse par les tests canadiens — l’histoire tient dans `declinaison` ; la carte du monde écarte 749 dossiers ENIC, pas 85 (FP-040)', 'studio'],
  'Territoires numériques éducatifs': ['reproduite', '/education/tne-dashboard',
    'Recréée en récit (2026-09-26) : l’Aisne, 5,8 % des élèves, 25,8 % des participants ; le « 80 % de premier degré » ne portait que sur 38,9 % de profils renseignés (FP-038)', 'angular'],

  // --- Lot 15 : les deux dernieres pages IPS (le gabarit etait deja ecrit) et
  // trois cartographies AngularJS.
  'IPS Lycées': ['reproduite', '/education/dataviz-ips-lycees',
    'Recréée en récit (2026-09-26) : 24,8 points entre voie générale et voie pro, plus que privé/public ; les deux IPS se comparent (FP-027), la synthèse est dans ips_etab (FP-028)', 'angular'],
  'IPS EREA': ['reproduite', '/education/dataviz-ips-erea',
    'Recréée en récit (2026-09-26) : 19,3 points sous les collèges publics, écart stable à méthode constante ; « référence départementale » = moyenne des EREA (FP-033)', 'angular'],
  'Cartographie des labellisations Egalité fille-garçon': ['reproduite', '/education/label-egalite-fille-garcon',
    'Recréée en récit (2026-09-26) : 18,7 % des établissements publics, de 61,8 % (La Réunion) à 6,5 % (Strasbourg) ; 1 502 établissements, pas 1 529 — UAI en minuscule (FP-041)', 'angular'],
  'Cartographie de l’accompagnement de la déficience sensorielle': ['reproduite', '/education/accompagnement-deficience-sensorielle',
    'Trois drapeaux repliés par fold ; la moitié du jeu ne dit pas quel accompagnement il propose', 'angular'],
  'Cartographie des ULIS-TFV': ['reproduite', '/education/implantation-ulis-tfv',
    '52 dispositifs, 25 départements sur 101 ; le seul jeu du banc sans aucun trou', 'angular'],

  // --- Lot 16 : premiere page ecrite APRES la montee en 0.27.0.
  'Offre de langues dans les collèges et lycées': ['reproduite', '/education/offre-formation-langues',
    'Recréée en récit (2026-09-26) : anglais partout, l’allemand dépend du territoire (100 % à Strasbourg) ; 9 743 établissements, pas 9 759 (FP-026)', 'angular'],

  'Génération 2024': ['reproduite', '/education/generation-2024',
    'Recréée en récit (2026-09-26) : 30,8 % des collèges, 15,3 % des écoles ; « 7 413 écoles, le label déborde le second degré » mesurait la taille du parc (FP-035)', 'angular'],
  'Cartographie Conseil National de la Refondation - CNR Education': ['reproduite', '/education/cnr-education',
    'Recréée en récit (2026-09-26) : 19,3 % des collèges publics engagés, 7,5 % des écoles publiques ; « les écoles portent 61 % des projets » décrivait le parc (FP-035)', 'angular'],

  // --- Lot 17 : les trois vues de jeu heritees.
  'Hybridation de l’enseignement en lycée': ['reproduite', '/education/hybridation-enseignement-lycee',
    '19 régions portant leur geo_shape : premier emploi de fill-field, là où il fonctionne', 'vue'],
  "L'annuaire des bureaux des entreprises": ['reproduite', '/education/annuaire-bureaux-des-entreprises',
    '1 381 métiers en multivalué (explode) ; cinq contacts valent « #N/A »', 'vue'],
  'Appel à projet Socle Numérique dans les Ecoles Elémentaires': ['reproduite', '/education/aap-socle-numerique-ecoles',
    'Jumeau de l’hybridation à la maille communale : le même taux, coloré par un autre chemin', 'vue'],

  'Cartographie PIX fiche établissement': ['reproduite', '/education/carto-pix-fiche-etablissement',
    'Recréée en récit (2026-09-26) : +60 % de parcours pour +12 % d’élèves, 2,32 parcours par élève ; une tranche « 1,5 à 2 » perdue au rechargement d’URL (BUG-031)', 'angular'],

  'Suivi d\'impact de l\'Opération de Sensibilisation au risque de l\'hameçonnage "Cactus"': ['reproduite', '/education/cactus-hameconnage',
    '904 réponses ; fold suppose des booléens, un questionnaire produit des ternaires', 'studio'],
  'Quelles personnalités ont donné leur nom aux écoles ?': ['reproduite', '/education/patronymes-des-ecoles',
    'Recréée en récit (2026-09-26) : 20,0 % de femmes au stock, 48,2 % des gains 2019-2024 ; rentrées 2009-2018 écartées, noms recopiés en arrière (FP-022)', 'asset'],

  // --- Lot 18 : les cinq assets et les huit cibles hors portail.
  'GAR - les données sur les ressources numériques éducatives accessibles via le GAR': ['reproduite', '/education/gar-ressources-numeriques',
    'Recréée en récit (2026-09-26) : usage ×30 entre académies, le Grand Est en tête (5,0 accès par accédant en France) ; mise en évidence par rang (AM-096)', 'asset'],
  'Capytale Analyse des usages': ['reproduite', '/education/capytale-usages',
    'Recréée en récit (2026-09-26) : visites pour 100 élèves, de 20 à 221 ; le classement en volume mesurait la taille des académies (FP-025)', 'asset'],
  'DNMA Les usages numériques constatés via les ENT': ['reproduite', '/education/dnma-usages-ent',
    'Recréée en récit (2026-09-26) : ×4 établissements mesurés, −21 % de visites ; la « rupture de méthode » était un changement de périmètre (FP-037), le 81,7 % au smartphone une part sur 51 % des visites (FP-038)', 'asset'],
  'Ted-i : Déploiement des robots de téléprésence': ['reproduite', '/education/tedi-robots-telepresence',
    'Recréée en récit (2026-09-26) : le parc suit l’année scolaire, 62 % des restitutions en mai-juin ; les 184 lignes vides portent des UAI hors annuaire (FP-039), stock reconstitué par running_sum (AV-041)', 'asset'],
  'France Éducation international - Sélection de projets européens portant sur les données': ['reproduite', '/education/fei-projets-europeens-donnees',
    'Recréée en récit (2026-09-26) : la France, 7 initiatives nationales pour 4 projets européens, 35 % des initiatives nationales recensées ; 24 pays sur 33 seulement en consortium', 'asset'],
  'Les personnels dans les collèges français': ['reproduite', '/education/personnels-colleges',
    'Recréée en récit (2026-09-26) : moins de 35 ans, de 6,2 % (Finistère) à 49,7 % (Seine-Saint-Denis) ; le privé ne déclare que ses enseignants (FP-030)', 'externe'],
  'Les personnels dans les lycées français': ['reproduite', '/education/personnels-lycees',
    'Recréée en récit (2026-09-26) : 37,6 % d’agrégés en voie générale, 1,0 % en voie pro ; la carte d’origine mesurait la part de lycées pro (FP-034)', 'externe'],
  'Les personnels dans les écoles primaires et maternelles': ['reproduite', '/education/personnels-ecoles-primaires',
    'Recréée en récit (2026-09-26) : les 50 ans et plus passent de 33,3 % à 35,2 %, dans 31 académies sur 31 ; âge sous secret pour 17,9 % des ETP, 63,8 % dans la Creuse', 'externe'],
  "Passe ton Hack d'abord!": ['reproduite', '/education/passe-ton-hack-dabord',
    'huwise.com est un alias d’hôte, pas une autre plateforme : 200 en anonyme sur le portail officiel', 'externe'],
  'Équipements sportifs en milieu scolaire': ['reproduite', '/education/equipements-sportifs-milieu-scolaire',
    'equipements.sports.gouv.fr : API ouverte sans clé ; « 13 036 UAI uniques » en vaut 12 214', 'externe'],
  'Accessibilité des équipements sportifs': ['reproduite', '/education/accessibilite-equipements-sportifs',
    'Recréée en récit (2026-09-26) : le recensement ne sait dire que « oui », 42,1 % de fiches vides en moteur (FP-029)', 'externe'],
  'Portrait de territoire': ['reproduite', '/education/portrait-de-territoire-sports',
    '40 indicateurs sur 4 jeux ; les ratios inter-jeux restent hors de portée', 'externe'],
  'Vue cartographique d’un établissement produite par la forge des communs numériques éducatifs': ['reproduite', '/education/educajou-ecolemap',
    'L’application de la forge n’a aucune donnée propre : elle interroge le portail. LIM-006 à la lettre', 'externe'],

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
