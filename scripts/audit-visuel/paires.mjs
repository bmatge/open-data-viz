// Apparie chaque dataviz reproduite du banc avec son original sur le portail.
//
//   node scripts/audit-visuel/paires.mjs            # ecrit paires.json, resume a l'ecran
//
// Les trois registres ne portent pas l'origine de la meme facon :
//   - Bercy      : champ `lien` present dans registre.json
//   - Education  : `lien` existe au catalogue ODS mais n'est PAS republie dans le
//                  registre (collision de jointure, cf. build-registre-education.mjs
//                  l.180) -> on le relit au catalogue et on joint par `titre`,
//                  cle verifiee unique sur les 36 entrees par ce meme script.
//   - Sports     : champ `repro_origine`, deja absolu.
//
// Plusieurs onglets Sports partagent une meme page reproduite : une paire par
// onglet, distinguee par le champ `onglet` (c'est l'original qui change, pas la reprise).
import { writeFile, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const RACINE = dirname(dirname(dirname(fileURLToPath(import.meta.url))));
const DONNEES = join(RACINE, 'public', 'data');
const BANC = process.env.AUDIT_BANC || 'http://localhost:3000';

const lire = async (f) => JSON.parse(await readFile(join(DONNEES, f), 'utf8'));

const absolu = (url) => (/^https?:/.test(url) ? url : BANC + url);

// Les `lien` des catalogues ODS sont souvent RELATIFS au portail (17 des 24
// entrees Bercy) : sans cette resolution, Playwright refuse l'URL.
const PORTAILS = {
  bercy: 'https://data.economie.gouv.fr',
  education: 'https://data.education.gouv.fr',
  sports: 'https://data.sports.gouv.fr'
};
const origine = (url, portail) => (/^https?:/.test(url) ? url : PORTAILS[portail] + url);

const CATALOGUE_EDUCATION =
  'https://data.education.gouv.fr/api/explore/v2.1/catalog/datasets/dataviz-a-la-une/records?limit=100';

const paires = [];
const sansOrigine = [];

// --- Bercy ---------------------------------------------------------------
for (const e of await lire('registre.json')) {
  if (e.repro_statut !== 'reproduite') continue;
  paires.push({
    id: `bercy--${slug(e.repro_url)}`,
    portail: 'bercy',
    titre: e.titre,
    original: origine(e.lien, 'bercy'),
    reprise: absolu(e.repro_url),
    note: e.repro_note
  });
}

// --- Education : le `lien` se relit au catalogue -------------------------
const liensEducation = new Map();
{
  const r = await fetch(CATALOGUE_EDUCATION);
  if (!r.ok) throw new Error(`catalogue Education : HTTP ${r.status}`);
  const { results } = await r.json();
  for (const rec of results) liensEducation.set(rec.titre, rec.lien);
}
for (const e of await lire('registre-education.json')) {
  if (e.repro_statut !== 'reproduite') continue;
  const original = liensEducation.get(e.titre);
  if (!original) { sansOrigine.push(`education : ${e.titre}`); continue; }
  paires.push({
    id: `education--${slug(e.repro_url)}`,
    portail: 'education',
    titre: e.titre,
    original: origine(original, 'education'),
    reprise: absolu(e.repro_url),
    note: e.repro_note
  });
}

// --- Sports : une paire par onglet ---------------------------------------
for (const e of await lire('registre-sports.json')) {
  if (e.repro_statut !== 'reproduite') continue;
  if (!e.repro_origine) { sansOrigine.push(`sports : ${e.titre}`); continue; }
  paires.push({
    id: `sports--${slug(e.repro_url)}${e.onglet ? '--' + slug(e.onglet) : ''}`,
    portail: 'sports',
    titre: e.titre,
    onglet: e.onglet,
    original: e.repro_origine,
    reprise: absolu(e.repro_url),
    note: e.repro_note
  });
}

function slug(s) {
  return String(s)
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

// Plusieurs dataviz d'origine peuvent partager une meme page reproduite (3 pour
// /viz/prix-des-carburants, 2 pour deux autres, et les onglets Sports) : l'id doit
// distinguer l'ORIGINAL, sinon les captures s'ecrasent entre elles.
{
  const vus = new Map();
  for (const p of paires) vus.set(p.id, (vus.get(p.id) || 0) + 1);
  const rang = new Map();
  for (const p of paires) {
    if (vus.get(p.id) === 1) continue;
    const n = (rang.get(p.id) || 0) + 1;
    rang.set(p.id, n);
    p.id = `${p.id}--${slug(p.onglet || p.titre).slice(0, 40)}`;
  }
  const doublons = paires.map((p) => p.id).filter((v, i, a) => a.indexOf(v) !== i);
  if (doublons.length) throw new Error(`ids encore en double : ${[...new Set(doublons)].join(', ')}`);
}

const cible = join(dirname(fileURLToPath(import.meta.url)), 'paires.json');
await writeFile(cible, `${JSON.stringify(paires, null, 2)}\n`, 'utf8');

const parPortail = paires.reduce((a, p) => ({ ...a, [p.portail]: (a[p.portail] || 0) + 1 }), {});
console.log(`${paires.length} paires ecrites dans ${cible}`);
console.log(' ', JSON.stringify(parPortail));
if (sansOrigine.length) console.log(`  ${sansOrigine.length} sans origine :`, sansOrigine);
