// Metriques des pages du depot, pour la revue critique (#24).
//
// Deux releves par page, ecrits dans un JSON comparable d'une execution a l'autre :
//
//   statique  — lu dans le HTML : poids, balises dsfr-data par type, sources (adaptateur,
//               fichier local, donnees inline), max-records, fetch-mode, require-where,
//               <style> local, commentaires ⚠️ (contournements documentes), longueur de
//               la section #analyse, attributs deprecies connus.
//   dynamique — mesure au navigateur, desktop 1400 px puis mobile 390 px : requetes
//               (total, API des portails, CDN), octets transferes, delai jusqu'au repos
//               reseau, avertissements et erreurs console, debordement horizontal mobile,
//               nombre de controles de filtre, d'onglets, de messages d'attente.
//
//   npm start
//   node scripts/metriques-pages.mjs [sortie.json]      RECETTE_PAGES=motif,motif pour filtrer
//
// La recette (recette-pages.mjs) dit si une page marche ; ce script dit ce qu'elle coute
// et ce qu'elle expose. Les deux se completent, aucun ne remplace la lecture du code.
// Playwright est emprunte a ~/Developer/GitHub/dsfr-data/node_modules.

import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const BASE = process.env.RECETTE_BASE || 'http://localhost:3000';
const pw = await import(join(homedir(), 'Developer/GitHub/dsfr-data/node_modules/playwright/index.js'));
const { chromium } = pw.default ?? pw;

const html = (dossier, prefixe) => {
  try {
    return readdirSync(dossier).filter((f) => f.endsWith('.html')).map((f) => ({ url: prefixe + f, fichier: join(dossier, f) }));
  } catch {
    return [];
  }
};
const motifs = (process.env.RECETTE_PAGES || '').split(',').filter(Boolean);
const pages = [...html('public', '/'), ...html('public/viz', '/viz/'), ...html('public/education', '/education/'), ...html('public/sports', '/sports/')]
  .filter((p) => !motifs.length || motifs.some((m) => p.url.includes(m)))
  .sort((a, b) => a.url.localeCompare(b.url));

// ── Statique ────────────────────────────────────────────────────────────────
function statique(fichier) {
  const brut = readFileSync(fichier, 'utf8');
  const sansCommentaires = brut.replace(/<!--[\s\S]*?-->/g, '');
  const balises = {};
  for (const [, b] of sansCommentaires.matchAll(/<(dsfr-data-[a-z0-9-]+)[\s>/]/g)) balises[b] = (balises[b] || 0) + 1;
  const sources = [...sansCommentaires.matchAll(/<dsfr-data-source\b([^>]*)>/g)].map((m) => m[1]);
  const attr = (s, a) => (s.match(new RegExp(`\\s${a}(?:="([^"]*)")?`)) || [])[1];
  const typeSource = (s) => (/api-type=/.test(s) ? 'adaptateur' : /\surl=/.test(s) ? 'url' : /\sdata=/.test(s) ? 'inline' : 'autre');
  const analyse = (brut.match(/<section[^>]*id="analyse"[\s\S]*?<\/section>/) || [''])[0];
  const styleLocal = [...brut.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].reduce((n, m) => n + m[1].length, 0);
  return {
    octets: statSync(fichier).size,
    lignes: brut.split('\n').length,
    balises,
    nbBalises: Object.values(balises).reduce((a, b) => a + b, 0),
    sources: {
      total: sources.length,
      adaptateur: sources.filter((s) => typeSource(s) === 'adaptateur').length,
      url: sources.filter((s) => typeSource(s) === 'url').length,
      inline: sources.filter((s) => typeSource(s) === 'inline').length,
      export: sources.filter((s) => /fetch-mode="export"/.test(s)).length,
      requireWhere: sources.filter((s) => /\srequire-where/.test(s)).length,
      serverSide: sources.filter((s) => /\sserver-side/.test(s)).length,
      maxRecords: sources.map((s) => attr(s, 'max-records')).filter(Boolean).map(Number),
      sansMaxRecordsNiLimit: sources.filter((s) => typeSource(s) === 'adaptateur' && !attr(s, 'max-records') && !attr(s, 'limit') && !/group-by=/.test(s)).length,
      hotes: [...new Set(sources.map((s) => attr(s, 'base-url')).filter(Boolean))],
    },
    styleLocalOctets: styleLocal,
    inlineStyleAttrs: (sansCommentaires.match(/\sstyle="/g) || []).length,
    commentairesAlerte: (brut.match(/<!--[\s\S]*?⚠️[\s\S]*?-->/g) || []).length,
    commentairesOctets: brut.length - sansCommentaires.length,
    analyseOctets: analyse.length,
    analysePresente: analyse.length > 0,
    a11y: balises['dsfr-data-a11y'] || 0,
    graphiques: (balises['dsfr-data-chart'] || 0),
    cartes: (balises['dsfr-data-map'] || 0),
    depreciesFrancais: (sansCommentaires.match(/\s(colonnes|recherche|filtres|tri)="/g) || []).length,
    versionDsfrData: (brut.match(/dsfr-data@([0-9.]+)\//) || [])[1] || null,
    idleMessages: (sansCommentaires.match(/idle-message=/g) || []).length,
    emptyMessages: (sansCommentaires.match(/\sempty=/g) || []).length,
    onglets: (sansCommentaires.match(/class="fr-tabs__tab/g) || []).length,
    scriptsInline: (sansCommentaires.match(/<script(?![^>]*src=)[^>]*>[\s\S]*?<\/script>/g) || []).filter((s) => s.replace(/<[^>]+>/g, '').trim().length > 0).length,
  };
}

// ── Dynamique ───────────────────────────────────────────────────────────────
const navigateur = await chromium.launch();

async function charger(url, largeur) {
  const ctx = await navigateur.newContext({ viewport: { width: largeur, height: largeur < 600 ? 800 : 1000 } });
  const page = await ctx.newPage();
  const req = { total: 0, api: 0, cdn: 0, tuiles: 0, octets: 0, octetsApi: 0, octetsCdn: 0, lentes: [] };
  const avert = [];
  const debuts = new Map();
  page.on('request', (r) => { debuts.set(r, Date.now()); });
  page.on('response', async (r) => {
    const u = r.url();
    const t0 = debuts.get(r.request());
    const duree = t0 ? Date.now() - t0 : 0;
    let taille = Number(r.headers()['content-length'] || 0);
    if (!taille) { try { taille = (await r.body()).length; } catch { taille = 0; } }
    req.total++; req.octets += taille;
    if (/\/api\/(explore|records|explore\/v2)/.test(u) || /\/api\//.test(u)) { req.api++; req.octetsApi += taille; if (duree > 1500) req.lentes.push({ url: u.slice(0, 160), ms: duree, octets: taille }); }
    else if (/cdn\.jsdelivr\.net/.test(u)) { req.cdn++; req.octetsCdn += taille; }
    else if (/tile|wxs|geopf|ign\.fr|openstreetmap|maplibre|tiles/.test(u)) req.tuiles++;
  });
  page.on('console', (m) => { if (['error', 'warning'].includes(m.type()) && !/Lit is in dev mode/.test(m.text())) avert.push(m.type()[0] + ' ' + m.text().replace(/\s+/g, ' ').slice(0, 160)); });
  const t0 = Date.now();
  let msRepos = null, msDom = null;
  try {
    await page.goto(BASE + url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    msDom = Date.now() - t0;
    await page.waitForLoadState('networkidle', { timeout: 60000 });
    msRepos = Date.now() - t0;
  } catch (e) { avert.push('NAVIGATION ' + String(e.message).slice(0, 100)); }
  // Defilement + ouverture des onglets, comme la recette : ce qui ne se rend pas ne coute rien.
  await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 700) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 150)); } scrollTo(0, 0); });
  const onglets = await page.locator('.fr-tabs__tab').count();
  for (let i = 1; i < onglets; i++) { try { await page.locator('.fr-tabs__tab').nth(i).click({ timeout: 3000 }); await page.waitForTimeout(1500); } catch {} }
  await page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {});
  await page.waitForTimeout(1000);
  const msTotal = Date.now() - t0;
  const releve = await page.evaluate(() => {
    const vis = (el) => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
    const debordants = [...document.querySelectorAll('body *')].filter((el) => { const r = el.getBoundingClientRect(); return r.right > innerWidth + 2 && vis(el); })
      .slice(0, 5).map((el) => (el.id ? '#' + el.id : el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? '.' + el.className.split(' ')[0] : '')));
    return {
      largeurDoc: document.documentElement.scrollWidth,
      largeurVue: innerWidth,
      debordement: document.documentElement.scrollWidth > innerWidth + 2,
      debordants,
      hauteurPage: document.documentElement.scrollHeight,
      controles: document.querySelectorAll('main select, main input:not([type=hidden]), main dsfr-data-facets input, main dsfr-data-facets select, main dsfr-data-context-filter select').length,
      kpi: document.querySelectorAll('dsfr-data-kpi').length,
      kpiVides: [...document.querySelectorAll('dsfr-data-kpi')].filter((k) => /—|Chargement|Choisissez|\bNaN\b/.test(k.textContent)).length,
      canvas: document.querySelectorAll('canvas').length,
      cartes: document.querySelectorAll('.leaflet-container').length,
      lignesTable: document.querySelectorAll('table tbody tr').length,
      chargementResiduel: (document.body.innerText.match(/Chargement/g) || []).length,
      cfg: document.querySelectorAll('[data-dsfr-config-error]').length,
      h1: document.querySelectorAll('h1').length,
      titre: document.title,
      compteursNonAccentues: (document.body.innerText.match(/\d+ resultats?/g) || []).length,
      imagesSansAlt: [...document.querySelectorAll('img')].filter((i) => !i.hasAttribute('alt')).length,
      liensExternesSansMention: [...document.querySelectorAll('a[target=_blank]')].filter((a) => !/external|noopener/.test(a.rel)).length,
      tailleTexteMin: Math.min(...[...document.querySelectorAll('main p, main li, main td')].slice(0, 400).map((e) => parseFloat(getComputedStyle(e).fontSize)).filter(Boolean), 99),
    };
  }).catch(() => ({ erreur: 'relevé impossible' }));
  await ctx.close();
  return { requetes: req, avertissements: [...new Set(avert)], msDom, msRepos, msTotal, ...releve };
}

const sortie = process.argv[2] || 'metriques.json';
const etat = {};
for (const p of pages) {
  const s = statique(p.fichier);
  const desktop = await charger(p.url, 1400);
  const mobile = await charger(p.url, 390);
  etat[p.url] = { statique: s, desktop, mobile };
  process.stdout.write(
    `${p.url.padEnd(46)} ${String(Math.round(s.octets / 1024)).padStart(4)}k` +
    ` bal:${String(s.nbBalises).padStart(3)} src:${String(s.sources.total).padStart(2)}` +
    ` req:${String(desktop.requetes.total).padStart(3)} api:${String(desktop.requetes.api).padStart(3)}` +
    ` ${String(Math.round(desktop.requetes.octets / 1024)).padStart(5)}k` +
    ` repos:${String(desktop.msRepos ?? '?').padStart(5)}ms` +
    ` avert:${desktop.avertissements.length}` +
    (mobile.debordement ? ` ⚠️mobile+${mobile.largeurDoc - mobile.largeurVue}px` : '') +
    (desktop.chargementResiduel ? ` ⏳${desktop.chargementResiduel}` : '') + '\n'
  );
}
await navigateur.close();
writeFileSync(sortie, JSON.stringify(etat, null, 2));
console.log(`\n→ ${sortie}`);
