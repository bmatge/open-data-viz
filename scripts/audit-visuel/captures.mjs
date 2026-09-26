// Capture chaque paire original / reprise dans le dossier de sa dataviz.
//
//   npm start &
//   node scripts/audit-visuel/paires.mjs      # les 68 paires
//   node scripts/audit-visuel/dossiers.mjs    # les 68 dossiers de suivi
//   node scripts/audit-visuel/captures.mjs --n 5
//
// Ecrit dans dossiers/<id>/captures/<releve>/ : original.png, reprise.png, mesures.json
// Rien n'est jamais ecrase : un nouveau relevé = un nouveau dossier date, et une
// capture deja prise dans le relevé courant n'est pas refaite (--refaire pour forcer).
//
// Trois precautions, toutes payees par le depot :
//   1. Cartes et graphiques se rendent A LA VISIBILITE (piege « croire un ecart de
//      recette sur un rendu differe ») : on deroule la page AVANT de capturer, des
//      deux cotes, sinon on photographie du vide et on croit a une regression.
//   2. Cadrage identique des deux cotes, sinon le modele compare des cadrages et
//      non des donnees. Hauteur plafonnee : au-dela, l'image est redimensionnee a
//      la lecture et les chiffres deviennent illisibles.
//   3. Les deux cotes sont captures le MEME JOUR, et la date est ecrite : un ecart
//      de chiffres peut venir d'une mise a jour du jeu ODS, pas d'un bug.
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { homedir } from 'node:os';

const pw = await import(join(homedir(), 'Developer/GitHub/dsfr-data/node_modules/playwright/index.js'));
const { chromium } = pw.default ?? pw;

const ICI = dirname(fileURLToPath(import.meta.url));
const DOSSIERS = join(ICI, 'dossiers');
// Date LOCALE, pas UTC : passe minuit a Paris, toISOString() rend la veille et
// deux cotes captures dans la meme minute se retrouvent dans deux releves.
const aujourdhui = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};
const RELEVE = process.env.AUDIT_RELEVE || aujourdhui();
const LARGEUR = 1280;
const HAUTEUR_MAX = 2600;
const attendre = (ms) => new Promise((r) => setTimeout(r, ms));

const args = process.argv.slice(2);
const opt = (n, d = null) => { const i = args.indexOf(n); return i === -1 ? d : args[i + 1]; };
const refaire = args.includes('--refaire');

let paires = JSON.parse(await readFile(join(ICI, 'paires.json'), 'utf8'));
if (opt('--id')) paires = paires.filter((p) => p.id === opt('--id'));
if (opt('--portail')) paires = paires.filter((p) => p.portail === opt('--portail'));
if (opt('--n')) paires = paires.slice(0, Number(opt('--n')));

console.log(`releve ${RELEVE} — ${paires.length} paire(s)\n`);
const navigateur = await chromium.launch({ headless: true });
let complets = 0;

for (const [i, paire] of paires.entries()) {
  const dossier = join(DOSSIERS, paire.id, 'captures', RELEVE);
  await mkdir(dossier, { recursive: true });
  const mesuresFichier = join(dossier, 'mesures.json');
  const anciennes = existsSync(mesuresFichier)
    ? JSON.parse(await readFile(mesuresFichier, 'utf8'))
    : {};
  const mesures = { id: paire.id, titre: paire.titre, releve: RELEVE, cotes: {} };

  for (const cote of ['original', 'reprise']) {
    const fichier = join(dossier, `${cote}.png`);
    if (!refaire && existsSync(fichier) && anciennes.cotes?.[cote]) {
      mesures.cotes[cote] = anciennes.cotes[cote];
      continue;
    }
    try {
      mesures.cotes[cote] = { fichier: `${cote}.png`, ...(await capturer(paire[cote], fichier)) };
    } catch (e) {
      mesures.cotes[cote] = { fichier: null, erreur: String(e.message || e).slice(0, 200) };
    }
  }

  await writeFile(mesuresFichier, `${JSON.stringify(mesures, null, 2)}\n`, 'utf8');
  const ok = ['original', 'reprise'].every((c) => mesures.cotes[c].fichier);
  if (ok) complets++;
  console.log(`[${i + 1}/${paires.length}] ${(ok ? 'ok' : 'PARTIEL').padEnd(7)} ${paire.id}`);
  for (const c of ['original', 'reprise'])
    if (mesures.cotes[c].erreur) console.log(`          ${c} : ${mesures.cotes[c].erreur}`);
}

await navigateur.close();
console.log(`\n${complets}/${paires.length} paires completes — dossiers/<id>/captures/${RELEVE}/`);

async function capturer(url, fichier) {
  const ctx = await navigateur.newContext({ viewport: { width: LARGEUR, height: 1000 }, deviceScaleFactor: 1 });
  const logs = [];
  const page = await ctx.newPage();
  page.on('console', (m) => { if (m.type() === 'error') logs.push(m.text().slice(0, 200)); });
  page.on('pageerror', (e) => logs.push(String(e).slice(0, 200)));
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {});
    await page.evaluate(async () => {
      const pas = window.innerHeight * 0.8;
      for (let y = 0; y < document.body.scrollHeight; y += pas) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 250));
      }
      window.scrollTo(0, 0);
    });
    await attendre(3000);
    const hauteur = await page.evaluate(() => document.body.scrollHeight);
    await page.screenshot({ path: fichier, clip: { x: 0, y: 0, width: LARGEUR, height: Math.min(hauteur, HAUTEUR_MAX) } });
    return { hauteur, tronquee: hauteur > HAUTEUR_MAX, erreurs_console: logs.slice(0, 5) };
  } finally {
    await ctx.close();
  }
}
