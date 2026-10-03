// Referentiel INSEE des communes (millesime 2020, geographie 2023), fige en fichier statique.
//
// Pourquoi : quatre pages de /demo le chargeaient en entier depuis
// equipements.sports.gouv.fr a chaque visite. Mesure le 2026-10-03 : 2,3 s en mediane,
// jusqu'a 7,6 s, pour 0,5 a 0,8 Mo transferes — et une seule colonne (107 Ko) met encore
// 3,1 s : c'est le temps que le portail met a produire l'export, pas le poids. Le portail
// repond de plus `cache-control: no-store` : aucun cache navigateur ne peut l'absorber.
// Comme tout y etait joint, aucun chiffre ne s'affichait avant lui.
//
// Le jeu est un millesime : il ne bouge pas. On le fige donc ici, une fois, et les pages
// le lisent chez nous (`url="/data/ref/insee-communes-2020.json"`).
//
//   node scripts/build-referentiel-insee.mjs
//
// A relancer seulement si le portail republie le jeu (le script dit le nombre de lignes
// et s'arrete si la cle n'est pas unique — PG-001).

import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const RACINE = join(dirname(fileURLToPath(import.meta.url)), '..');
const SORTIE = join(RACINE, 'public/data/ref/insee-communes-2020.json');
const BASE = 'https://equipements.sports.gouv.fr/api/explore/v2.1/catalog/datasets/insee-2020-geoapi-2023';

// L'union des colonnes lues par les pages. En ajouter une ici avant de la lire en page.
const COLONNES = [
  'code_geographique', 'nomcommune', 'codedepartement', 'nom_departement',
  'population', 'med20', 'ettot20', 'dens_lib', 'typo_rurb_crte', 'commune_loi_montagne'
];

const t0 = Date.now();
const rep = await fetch(`${BASE}/exports/json?select=${COLONNES.join(',')}&order_by=code_geographique&limit=-1`);
if (!rep.ok) throw new Error(`export : HTTP ${rep.status}`);
const lignes = await rep.json();

const total = (await (await fetch(`${BASE}/records?limit=0`)).json()).total_count;
if (lignes.length !== total) throw new Error(`export tronque : ${lignes.length} lignes pour ${total} au portail`);

const codes = new Set(lignes.map((l) => l.code_geographique));
if (codes.size !== lignes.length) throw new Error(`cle non unique : ${lignes.length} lignes, ${codes.size} codes`);

// Une ligne par commune : le fichier reste lisible et ses diffs aussi.
writeFileSync(SORTIE, '[\n' + lignes.map((l) => JSON.stringify(l)).join(',\n') + '\n]\n');
console.log(`${lignes.length} communes, cle unique, ${COLONNES.length} colonnes → ${SORTIE} (${Date.now() - t0} ms)`);
