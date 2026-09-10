// Recette de non-regression des pages du depot.
//
// Charge chaque page de public/ dans un navigateur, la fait defiler en entier
// (les cartes et les graphiques se rendent a la visibilite : sans defilement,
// on mesure du vide et on croit a une regression), puis releve les erreurs
// console, les erreurs de configuration dsfr-data, les valeurs des KPI et le
// nombre de rendus. Ecrit un etat JSON comparable d'une execution a l'autre.
//
//   npm start                                  # serveur sur :3000
//   node scripts/recette-pages.mjs avant.json  # avant la modification
//   ...                                        # modification
//   node scripts/recette-pages.mjs apres.json
//   node scripts/recette-pages.mjs --diff avant.json apres.json
//
// Playwright est emprunte a ~/Developer/GitHub/dsfr-data/node_modules.

import { readdirSync, writeFileSync, readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const BASE = process.env.RECETTE_BASE || 'http://localhost:3000';

// ── Mode comparaison ────────────────────────────────────────────────────────
if (process.argv[2] === '--diff') {
  const a = JSON.parse(readFileSync(process.argv[3], 'utf8'));
  const b = JSON.parse(readFileSync(process.argv[4], 'utf8'));
  const chiffres = (s) => (String(s).match(/[\d   ,.]+/g) || []).join('|');
  let ecarts = 0;
  const indicatif = [];
  for (const p of Object.keys(a)) {
    const x = a[p], y = b[p] || {};
    const l = [];
    if ((x.erreurs?.length ?? 0) !== (y.erreurs?.length ?? 0))
      l.push(`erreurs console ${x.erreurs.length} → ${y.erreurs.length}`);
    if ((y.erreursConfig?.length ?? 0) > 0)
      l.push(`⛔ erreur de configuration ×${y.erreursConfig.length} : ${y.erreursConfig[0]}`);
    for (const k of ['nbCanvas', 'nbLignesTable', 'nbFacettes'])
      if (x[k] !== y[k]) l.push(`${k} ${x[k]} → ${y[k]}`);
    // `nbCarte` est INDICATIF, jamais bloquant : les cartes se rendent a la
    // visibilite et leur nombre depend du moment ou l'on regarde. Trois faux
    // positifs en une journee sont venus de la — dont un qui a failli faire
    // annuler une montee de version saine. On l'affiche, on n'en conclut rien.
    if (x.nbCarte !== y.nbCarte) indicatif.push(`${p} : conteneurs de carte ${x.nbCarte} → ${y.nbCarte} (indicatif)`);
    const ka = (x.kpi || []).map(chiffres), kb = (y.kpi || []).map(chiffres);
    if (ka.length !== kb.length) l.push(`nombre de KPI ${ka.length} → ${kb.length}`);
    else {
      const ch = ka.map((v, i) => (v !== kb[i] ? `${x.kpi[i]} → ${y.kpi[i]}` : null)).filter(Boolean);
      if (ch.length) l.push(`KPI modifiés (${ch.length}) : ${ch.slice(0, 3).join(' ; ')}`);
    }
    if (l.length) { ecarts++; console.log(`\n■ ${p}`); l.forEach((s) => console.log('   ' + s)); }
  }
  console.log(`\n${Object.keys(a).length - ecarts} pages identiques, ${ecarts} avec un écart.`);
  if (indicatif.length) {
    console.log('\nIndicatif (jamais bloquant, rendu differe) :');
    indicatif.forEach((s) => console.log('   ' + s));
  }
  process.exit(ecarts ? 1 : 0);
}

// ── Mode relevé ─────────────────────────────────────────────────────────────
const pw = await import(join(homedir(), 'Developer/GitHub/dsfr-data/node_modules/playwright/index.js'));
const { chromium } = pw.default ?? pw;

// Deux portails depuis le lot 14 : public/viz (Bercy) et public/education.
const html = (dossier, prefixe) => {
  try {
    return readdirSync(dossier).filter((f) => f.endsWith('.html')).map((f) => prefixe + f);
  } catch {
    return [];
  }
};
const pages = [
  ...html('public', '/'),
  ...html('public/viz', '/viz/'),
  ...html('public/education', '/education/'),
].sort();

const sortie = process.argv[2] || 'recette.json';
const navigateur = await chromium.launch();
const etat = {};

for (const p of pages) {
  const ctx = await navigateur.newContext({ viewport: { width: 1400, height: 1000 } });
  const page = await ctx.newPage();
  const erreurs = [];
  page.on('console', (m) => { if (m.type() === 'error') erreurs.push(m.text().slice(0, 200)); });
  page.on('pageerror', (e) => erreurs.push('PAGEERROR ' + String(e).slice(0, 200)));
  try {
    await page.goto(BASE + p, { waitUntil: 'networkidle', timeout: 45000 });
    // Defilement complet : sans lui, cartes et graphiques ne se rendent pas.
    await page.evaluate(async () => {
      const pas = window.innerHeight * 0.8;
      for (let y = 0; y < document.body.scrollHeight; y += pas) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 250));
      }
      window.scrollTo(0, 0);
    });
    // Stabilisation : on attend que le DOM cesse de bouger plutot qu'une duree
    // fixe. Trois faux positifs en une journee (conteneurs de carte, puis deux
    // KPI lus avant la fin du chargement) ont montre qu'une attente constante
    // ne suffit pas : les pages a pagination serveur + agregations multiples
    // rendent par vagues. Une recette qui crie au loup est pire qu'une absence
    // de recette — on cesse de la croire.
    await page.waitForFunction(
      () => {
        const w = window;
        const signature =
          document.body.innerText.length + ':' +
          document.querySelectorAll('canvas, .leaflet-container, tbody tr').length;
        if (w.__recetteSignature === signature) {
          w.__recetteStable = (w.__recetteStable || 0) + 1;
        } else {
          w.__recetteSignature = signature;
          w.__recetteStable = 0;
        }
        return w.__recetteStable >= 3;
      },
      { timeout: 20000, polling: 500 }
    ).catch(() => {});
    await page.waitForTimeout(1500);
  } catch (e) {
    erreurs.push('NAVIGATION ' + String(e.message).slice(0, 120));
  }
  const releve = await page.evaluate(() => {
    const txt = (el) => (el.textContent || '').replace(/\s+/g, ' ').trim();
    return {
      kpi: [...document.querySelectorAll('dsfr-data-kpi')].map((e) => txt(e).slice(0, 70)),
      erreursConfig: [...document.querySelectorAll('[data-dsfr-config-error]')].map((e) => txt(e).slice(0, 140)),
      nbCanvas: document.querySelectorAll('canvas').length,
      nbCarte: document.querySelectorAll('.leaflet-container, .maplibregl-map').length,
      nbLignesTable: document.querySelectorAll('table tbody tr').length,
      nbFacettes: document.querySelectorAll('dsfr-data-facets input, dsfr-data-facets select').length,
    };
  }).catch(() => ({ erreur: 'relevé impossible' }));
  etat[p] = { erreurs, ...releve };
  process.stdout.write(
    `${p.padEnd(46)} err:${String(erreurs.length).padStart(2)}` +
    ` kpi:${String((releve.kpi || []).length).padStart(2)}` +
    ` graph:${String(releve.nbCanvas ?? 0).padStart(2)}` +
    ` carte:${String(releve.nbCarte ?? 0).padStart(2)}` +
    ` cfg:${(releve.erreursConfig || []).length}\n`
  );
  await ctx.close();
}
await navigateur.close();
writeFileSync(sortie, JSON.stringify(etat, null, 2));
console.log(`\n→ ${sortie}`);
