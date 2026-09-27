// Harnais de rejeu des constats du registre (revue des findings, 2026-09-19).
//
// Charge une page du banc (npm start sur :3000) ou une page minimale de ./pages/,
// servie sous /_test/<fichier> par interception ; substitue si demandé le bundle
// dsfr-data d'un dossier dist/ local à celui du CDN (même mécanisme que
// RECETTE_BUNDLE dans recette-pages.mjs) ; relève la console.
//
//   import { ouvrir } from './harness.mjs';
//   const t = await ouvrir('/_test/bug015-mauvais.html', { bundle: '/chemin/vers/package/dist' });
//
// Pour obtenir un bundle publié : `npm pack dsfr-data@0.30.0 && tar xzf dsfr-data-0.30.0.tgz`
// puis pointer sur package/dist. Playwright est emprunté à ~/Developer/GitHub/dsfr-data.
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { existsSync, readFileSync } from 'node:fs';
import { homedir } from 'node:os';

const pw = await import(join(homedir(), 'Developer/GitHub/dsfr-data/node_modules/playwright/index.js'));
const { chromium } = pw.default ?? pw;
const ICI = dirname(fileURLToPath(import.meta.url));
// REJEU_BASE : le banc sur un autre port (plusieurs agents en parallèle) ;
// REJEU_PROXY (ou RECETTE_PROXY) : navigateur derrière un tunnel, localhost exclu.
const BASE = process.env.REJEU_BASE || 'http://localhost:3000';
const PROXY = process.env.REJEU_PROXY || process.env.RECETTE_PROXY || '';

export async function ouvrir(chemin, { bundle, width = 1400, height = 1000, headless = true } = {}) {
  const browser = await chromium.launch({ headless, ...(PROXY ? { proxy: { server: PROXY, bypass: 'localhost,127.0.0.1' } } : {}) });
  const ctx = await browser.newContext({ viewport: { width, height } });
  const logs = [];
  let substitues = 0;
  if (bundle) {
    await ctx.route(/cdn\.jsdelivr\.net\/npm\/dsfr-data@[^/]+\/dist\/(.+)$/, (route) => {
      const fichier = route.request().url().match(/\/dist\/([^?#]+)/)[1];
      const local = join(bundle, fichier);
      if (!existsSync(local)) return route.continue();
      substitues++;
      return route.fulfill({ path: local, contentType: 'application/javascript; charset=utf-8' });
    });
  }
  await ctx.route(`${BASE}/_test/**`, (route) => {
    const f = route.request().url().replace(`${BASE}/_test/`, '').split('?')[0];
    const local = join(ICI, 'pages', f);
    if (!existsSync(local)) return route.fulfill({ status: 404, body: 'absent : ' + local });
    const type = f.endsWith('.json') ? 'application/json' : 'text/html; charset=utf-8';
    return route.fulfill({ body: readFileSync(local, 'utf8'), contentType: type });
  });
  const page = await ctx.newPage();
  page.on('console', (m) => logs.push({ type: m.type(), texte: m.text() }));
  page.on('pageerror', (e) => logs.push({ type: 'pageerror', texte: String(e) }));
  await page.goto(BASE + chemin, { waitUntil: 'domcontentloaded' });
  return {
    page,
    logs,
    version: async () => (bundle ? `bundle local ${bundle.split('/').slice(-3, -2)[0]} (${substitues} fichier(s) substitué(s))` : await page.evaluate(() => [...document.scripts].map((s) => s.src).find((s) => /dsfr-data@/.test(s)) || '?')),
    fermer: async () => browser.close(),
  };
}
