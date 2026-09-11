// Construit public/data/stats.json : les statistiques du banc d'essai lui-meme,
// lues par le tableau de bord de la page d'accueil (public/index.html).
//
//   node scripts/build-stats.mjs
//
// Trois entrees, toutes locales et versionnees :
//   public/data/registre.json            les 30 contenus du catalogue Bercy
//                                        (dont 26 types « Visualisation »)
//   public/data/registre-education.json  les 36 entrees du catalogue Education
//   public/data/registre-sports.json     les 12 onglets du portail Sports (lot 19 :
//                                        pas de catalogue vivant, un onglet = une entree)
//   public/**/*.html                     les pages du depot, scannees a la balise
//
// SORTIE : un OBJET a trois tableaux. `dsfr-data-source url=` sait descendre
// dans un JSON structure grace a `transform` (chemin JSONPath, ex.
// transform="composants") : la page pose donc TROIS sources sur le meme
// fichier, une par bloc, plutot qu'un tableau plat discrimine par un champ.
// Sans `transform`, la racine devrait etre un tableau : le contenu est publie
// tel quel et un objet ne produit aucune ligne, silencieusement.
//
//   chiffres    [{ cle, libelle, n }]                 -> les KPI d'ensemble
//   avancement  [{ portail, statut, libelle, n }]     -> avancement par portail
//   composants  [{ composant, occurrences, pages }]   -> usage reel des balises
//
// Ce que le script ne fait PAS : agreger les 151 constats de retours.json. La
// page le fait elle-meme avec <dsfr-data-query group-by>, ce qui est le sujet
// du depot. Ne sont precalcules ici que les deux agregats qu'aucun composant ne
// sait produire : l'UNION des deux registres (il existe un join, pas d'union)
// et le scan des balises (il faut lire le HTML du depot).
//
// Les tableaux sont ecrits DEJA TRIES dans l'ordre d'affichage : les
// graphiques les consomment sans <dsfr-data-query> intermediaire.
//
// PIEGES :
//   - Regenerer APRES avoir touche aux pages : le scan compte ce qui est sur le
//     disque au moment ou il tourne, index.html comprise (elle se compte
//     elle-meme, c'est voulu : c'est une page du banc comme les autres).
//   - Les commentaires HTML sont retires avant le scan : plusieurs pages citent
//     des balises en commentaire pour expliquer un contournement, et elles
//     seraient comptees comme des emplois reels. Les exemples en <code> sont
//     deja echappes (&lt;), donc invisibles au scan.
//   - Les libelles de statut viennent des registres (`repro_libelle`) et ne
//     sont PAS redefinis ici : deux tables de libelles divergeraient.

import { readFile, writeFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative } from 'node:path';

const RACINE = join(dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC = join(RACINE, 'public');

const lireJson = async (chemin) => JSON.parse(await readFile(join(PUBLIC, 'data', chemin), 'utf8'));

/** Tous les fichiers .html sous public/, recursivement. */
async function pagesHtml(dossier = PUBLIC) {
  const entrees = await readdir(dossier, { withFileTypes: true });
  const sorties = [];
  for (const e of entrees) {
    const chemin = join(dossier, e.name);
    if (e.isDirectory()) sorties.push(...(await pagesHtml(chemin)));
    else if (e.name.endsWith('.html')) sorties.push(chemin);
  }
  return sorties.sort();
}

// ── 1. Avancement : union des trois registres ────────────────────────────────
const bercy = await lireJson('registre.json');
const education = await lireJson('registre-education.json');
const sports = await lireJson('registre-sports.json');

const avancement = [];
for (const [portail, entrees] of [['Bercy', bercy], ['Éducation', education], ['Sports', sports]]) {
  const paquets = new Map();
  for (const e of entrees) {
    const cle = e.repro_statut;
    if (!paquets.has(cle)) paquets.set(cle, { libelle: e.repro_libelle, n: 0 });
    paquets.get(cle).n += 1;
  }
  for (const [statut, { libelle, n }] of paquets) {
    avancement.push({ portail, statut, libelle, n });
  }
}
// Ordre stable et lisible sur l'axe du graphique : du fait au non-fait.
const ORDRE = ['reproduite', 'analyse', 'a-faire', 'hors-perimetre', 'impossible'];
avancement.sort(
  (a, b) => ORDRE.indexOf(a.statut) - ORDRE.indexOf(b.statut) || a.portail.localeCompare(b.portail)
);

// ── 2. Usage reel des composants dsfr-data dans les pages du depot ──────────
const fichiers = await pagesHtml();
const usage = new Map(); // composant -> { occurrences, pages:Set }

for (const fichier of fichiers) {
  const brut = await readFile(fichier, 'utf8');
  const html = brut.replace(/<!--[\s\S]*?-->/g, ''); // cf. pieges en tete
  const page = '/' + relative(PUBLIC, fichier);
  for (const [, balise] of html.matchAll(/<(dsfr-data-[a-z0-9-]+)[\s>/]/g)) {
    if (!usage.has(balise)) usage.set(balise, { occurrences: 0, pages: new Set() });
    const u = usage.get(balise);
    u.occurrences += 1;
    u.pages.add(page);
  }
}

const composants = [...usage.entries()]
  .map(([composant, u]) => ({
    composant,
    occurrences: u.occurrences,
    pages: u.pages.size,
  }))
  .sort((a, b) => b.occurrences - a.occurrences || a.composant.localeCompare(b.composant));

// ── 3. Chiffres d'ensemble ──────────────────────────────────────────────────
const retours = await lireJson('retours.json');
const total = (rows, f = (r) => r.n) => rows.reduce((s, r) => s + f(r), 0);

const chiffres = [
  ['entrees', 'Entrées aux trois catalogues', avancement.length ? total(avancement) : 0],
  ['reproduites', 'Dataviz reproduites', total(avancement.filter((a) => a.statut === 'reproduite'))],
  ['portails', 'Portails Opendatasoft', 3],
  ['pages', 'Pages HTML du dépôt', fichiers.length],
  ['composants', 'Composants dsfr-data distincts', composants.length],
  ['balises', 'Balises dsfr-data posées', total(composants, (c) => c.occurrences)],
  ['constats', 'Constats au registre', retours.length],
].map(([cle, libelle, n]) => ({ cle, libelle, n }));

// ── 4. Ecriture ─────────────────────────────────────────────────────────────
const sortie = { genere: new Date().toISOString().slice(0, 10), chiffres, avancement, composants };
await writeFile(join(PUBLIC, 'data', 'stats.json'), JSON.stringify(sortie, null, 2) + '\n');

console.log(
  `stats.json : ${chiffres.length} chiffres, ${avancement.length} lignes d'avancement, ` +
    `${composants.length} composants sur ${fichiers.length} pages.`
);
for (const c of chiffres) console.log(`  ${c.libelle.padEnd(32)} ${c.n}`);
