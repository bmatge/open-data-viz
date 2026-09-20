// Vérification d'une page de gabarit — les cinq garde-fous en une commande.
//
//   node scripts/verif-gabarit.mjs viz/qualite-tourisme.html
//   node scripts/verif-gabarit.mjs viz/qualite-tourisme.html --ref /tmp/avant.html
//
// Sort un rapport lisible et un code de retour non nul si un garde-fou tombe.
// Le serveur du banc doit tourner (npm start sur :3000).
//
// Ce que le script fait et qu'un contrôle naïf ne fait pas :
//  - il FAIT DÉFILER jusqu'à la carte et jusqu'à chaque graphique avant de mesurer :
//    cartes et graphiques se rendent à la visibilité, une mesure prise trop tôt voit
//    du vide (trois faux positifs en une journée dans l'historique du dépôt) ;
//  - il mesure à 1280 ET à 390 px : un dépassement n'apparaît souvent qu'en mobile ;
//  - il compare le compte des balises dsfr-data à un fichier de référence si on lui
//    en donne un (--ref), pour prouver qu'aucune n'a été perdue.
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { homedir } from 'node:os';

const pw = await import(join(homedir(), 'Developer/GitHub/dsfr-data/node_modules/playwright/index.js'));
const { chromium } = pw.default ?? pw;

const [chemin, ...opts] = process.argv.slice(2);
if (!chemin) { console.error('usage : node scripts/verif-gabarit.mjs <chemin/page.html> [--ref <fichier>]'); process.exit(2); }
const ref = opts.includes('--ref') ? opts[opts.indexOf('--ref') + 1] : null;
const url = 'http://localhost:3000/' + chemin.replace(/^\/?(public\/)?/, '');
const fichier = 'public/' + chemin.replace(/^\/?(public\/)?/, '');

let ko = 0;
const dit = (ok, quoi, detail) => { if (!ok) ko++; console.log((ok ? '  ok  ' : '  KO  ') + quoi.padEnd(38) + (detail ?? '')); };

// ---- 1 & 2 : le source, avant d'ouvrir quoi que ce soit --------------------
const src = readFileSync(fichier, 'utf8');
console.log('\n' + fichier);
for (const t of ['div', 'details', 'section', 'template', 'li']) {
  const o = (src.match(new RegExp('<' + t + '(?=[\\s/>])', 'gi')) || []).length;
  const f = (src.match(new RegExp('</' + t + '\\s*>', 'gi')) || []).length;
  if (o || f) dit(o === f, 'balises <' + t + '> équilibrées', o + ' / ' + f);
}
const compte = (s) => Object.fromEntries([...s.matchAll(/<(dsfr-data-[\w-]+)(?=[\s/>])/g)]
  .reduce((m, x) => m.set(x[1], (m.get(x[1]) ?? 0) + 1), new Map()));
const ici = compte(src);
const total = Object.values(ici).reduce((a, b) => a + b, 0);
if (ref && existsSync(ref)) {
  const avant = compte(readFileSync(ref, 'utf8'));
  const noms = [...new Set([...Object.keys(avant), ...Object.keys(ici)])].sort();
  const ecarts = noms.filter((n) => (avant[n] ?? 0) !== (ici[n] ?? 0))
    .map((n) => n + ' ' + (avant[n] ?? 0) + '→' + (ici[n] ?? 0));
  dit(ecarts.length === 0, 'aucune balise dsfr-data perdue', ecarts.length ? ecarts.join(', ') : total + ' balises');
} else {
  dit(true, 'balises dsfr-data (pas de référence)', total + ' balises, ' + Object.keys(ici).length + ' types');
}

// ---- 3, 4, 5 : au navigateur, APRÈS défilement ------------------------------
const nav = await chromium.launch({ headless: true });
for (const largeur of [1280, 390]) {
  const ctx = await nav.newContext({ viewport: { width: largeur, height: 900 } });
  const page = await ctx.newPage();
  const erreurs = [];
  page.on('console', (m) => { if (m.type() === 'error') erreurs.push(m.text()); });
  page.on('pageerror', (e) => erreurs.push(String(e)));
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(5000);
  // Faire défiler jusqu'à CHAQUE objet différé, puis laisser le DOM se stabiliser.
  const cibles = await page.$$('dsfr-data-map, dsfr-data-chart, dsfr-data-list, dsfr-data-display');
  for (const c of cibles) { await c.scrollIntoViewIfNeeded().catch(() => {}); await page.waitForTimeout(400); }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(2500);

  const r = await page.evaluate(() => {
    const b = (s) => { const e = document.querySelector(s); return e ? e.getBoundingClientRect() : null; };
    const kg = b('dsfr-data-kpi-group'), f = b('.odv-filtres'), lc = b('.leaflet-container');
    const m = document.querySelector('dsfr-data-map'), fe = document.querySelector('.odv-filtres');
    return {
      debord: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      kpiL: kg ? Math.round(kg.width) : null,
      // Largeur UTILE du conteneur : sa boite moins son padding. Comparer a la
      // largeur exterieure donne un faux negatif de la valeur du padding (48 px).
      contenuL: (() => { const e = document.querySelector('.fr-container'); if (!e) return 0;
        const st = getComputedStyle(e);
        return Math.round(e.getBoundingClientRect().width - parseFloat(st.paddingLeft) - parseFloat(st.paddingRight)); })(),
      filtresL: f ? Math.round(f.width) : null,
      carteL: lc ? Math.round(lc.width) : null,
      carteRendue: !!lc,
      nbCartes: document.querySelectorAll('dsfr-data-map').length,
      memeRangee: m && fe ? m.closest('.odv-zone') === fe.closest('.odv-zone') : 'n/a',
      vides: [...document.querySelectorAll('dsfr-data-chart, dsfr-data-kpi')]
        .filter((e) => !e.innerText.trim() && !e.querySelector('canvas, svg')).length,
    };
  });
  console.log('  — à ' + largeur + ' px');
  dit(r.debord <= 2, 'aucun défilement horizontal', 'débord ' + r.debord + ' px');
  dit(erreurs.length === 0, 'zéro erreur console', erreurs.length ? erreurs[0].slice(0, 110) : '');
  if (r.nbCartes) dit(r.carteRendue, 'carte rendue après défilement', r.carteRendue ? r.carteL + ' px' : 'AUCUN .leaflet-container');
  dit(r.vides === 0, 'aucun graphique / KPI vide', r.vides ? r.vides + ' vide(s)' : '');
  if (largeur === 1280) {
    if (r.kpiL) dit(Math.abs(r.kpiL - r.contenuL) <= 4, 'compteurs en pleine largeur', r.kpiL + ' / ' + r.contenuL + ' px');
    if (r.nbCartes && r.memeRangee !== 'n/a') dit(r.memeRangee === true, 'filtres et carte dans la même rangée', r.memeRangee ? r.filtresL + ' + ' + r.carteL + ' px' : 'rangées différentes');
  }
  await ctx.close();
}
await nav.close();
console.log(ko ? '\n' + ko + ' garde-fou(s) en échec\n' : '\nles cinq garde-fous passent\n');
process.exit(ko ? 1 : 0);
