// Rejeu du 2026-10-03 : `proxy-url` relaie-t-il un portail Opendatasoft, et le relais
// générique est-il cachable par un cache indexé par URL (CDN, cache de page) ?
//
//   node scripts/rejeu-findings/run-proxy.mjs
//
// Aucune dépendance au serveur du banc : la page est servie par interception, sur une
// origine factice, et `/relais` répond 200 `[]` pour qu'on ne lise que les requêtes émises.
import { readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const pw = await import(join(homedir(), 'Developer/GitHub/dsfr-data/node_modules/playwright/index.js'));
const { chromium } = pw.default ?? pw;
const ici = dirname(fileURLToPath(import.meta.url));
const ORIGINE = 'http://rejeu.test';

const nav = await chromium.launch();
const page = await nav.newPage();
const vues = [];
await page.route(ORIGINE + '/**', (route) => {
  const u = new URL(route.request().url());
  if (u.pathname === '/page.html') {
    return route.fulfill({ contentType: 'text/html; charset=utf-8', body: readFileSync(join(ici, 'pages/proxy-relais.html')) });
  }
  return route.fulfill({ contentType: 'application/json', body: '{"results":[],"total_count":0}' });
});
page.on('request', (r) => {
  const u = r.url();
  if (/jsdelivr|page\.html/.test(u)) return;
  vues.push({ methode: r.method(), url: decodeURIComponent(u).slice(0, 150), cible: r.headers()['x-target-url'] || null });
});
await page.goto(ORIGINE + '/page.html');
await page.waitForLoadState('networkidle');
await page.waitForTimeout(1500);
console.log(JSON.stringify(vues, null, 1));
await nav.close();
