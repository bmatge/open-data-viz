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
//
// Deux variables d'environnement :
//   RECETTE_PAGES=sports/,education/carto   ne releve que les pages dont le chemin
//                                           contient l'un des motifs
//   RECETTE_BUNDLE=<dossier dist/>          sert le bundle dsfr-data de ce dossier a la
//                                           place de jsDelivr, quelle que soit la version
//                                           epinglee : c'est ainsi qu'on rejoue les pages
//                                           contre une version construite mais pas publiee.

import { readdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
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
    if ((y.legendesFausses?.length ?? 0) > 0)
      l.push(`⛔ légende contraire au graphique ×${y.legendesFausses.length} : ${y.legendesFausses[0]}`);
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

// Trois portails : public/viz (Bercy), public/education, public/sports (lot 19).
const html = (dossier, prefixe) => {
  try {
    return readdirSync(dossier).filter((f) => f.endsWith('.html')).map((f) => prefixe + f);
  } catch {
    return [];
  }
};
const motifs = (process.env.RECETTE_PAGES || '').split(',').filter(Boolean);
const pages = [
  ...html('public', '/'),
  ...html('public/viz', '/viz/'),
  ...html('public/education', '/education/'),
  ...html('public/sports', '/sports/'),
]
  .filter((p) => !motifs.length || motifs.some((m) => p.includes(m)))
  .sort();

const bundle = process.env.RECETTE_BUNDLE;
if (bundle && !existsSync(join(bundle, 'dsfr-data.esm.js'))) {
  console.error(`RECETTE_BUNDLE : pas de dsfr-data.esm.js dans ${bundle}`);
  process.exit(2);
}
if (bundle) console.log(`Bundle dsfr-data servi depuis ${bundle}\n`);

const sortie = process.argv[2] || 'recette.json';
const navigateur = await chromium.launch();
const etat = {};

for (const p of pages) {
  const ctx = await navigateur.newContext({ viewport: { width: 1400, height: 1000 } });
  if (bundle) {
    // Toute version epinglee est remplacee : les fichiers annexes (leaflet-*, map)
    // sont resolus relativement au bundle, donc servis du meme dossier.
    await ctx.route(/cdn\.jsdelivr\.net\/npm\/dsfr-data@[^/]+\/dist\/(.+)$/, (route) => {
      const fichier = route.request().url().match(/\/dist\/([^?#]+)/)[1];
      const chemin = join(bundle, fichier);
      if (!existsSync(chemin)) return route.continue();
      const type = fichier.endsWith('.css') ? 'text/css' : 'text/javascript';
      return route.fulfill({ path: chemin, contentType: `${type}; charset=utf-8` });
    });
  }
  const page = await ctx.newPage();
  const erreurs = [];
  page.on('console', (m) => { if (m.type() === 'error') erreurs.push(m.text().slice(0, 200)); });
  page.on('pageerror', (e) => erreurs.push('PAGEERROR ' + String(e).slice(0, 200)));
  // Defilement complet : sans lui, cartes et graphiques ne se rendent pas.
  const defiler = () =>
    page.evaluate(async () => {
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
  const stabiliser = async () => {
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
  };
  try {
    await page.goto(BASE + p, { waitUntil: 'networkidle', timeout: 45000 });
    await defiler();
    await stabiliser();
    // Onglets DSFR (pages Sports, lot 19) : un panneau masque ne se rend pas,
    // donc chaque onglet est ouvert, defile et stabilise tour a tour. Les KPI
    // et graphiques des panneaux deja ouverts restent dans le DOM : le releve
    // final couvre toute la page.
    const onglets = await page.locator('.fr-tabs__tab').count();
    for (let i = 1; i < onglets; i++) {
      await page.locator('.fr-tabs__tab').nth(i).click();
      await page.evaluate(() => { window.__recetteStable = 0; });
      await defiler();
      await stabiliser();
    }
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
      // Legende qui contredit le graphique (BUG-016) : pour chaque graphique a
      // `color-map`, une pastille dont le libelle est dans la table doit porter
      // sa couleur. Le defaut ne leve aucune erreur et a vecu sur les cinq
      // emplois du depot sans qu'aucune recette ne le voie : une recette qui ne
      // compare que des nombres ne voit pas une legende qui ment.
      legendesFausses: [...document.querySelectorAll('dsfr-data-chart[color-map]')].flatMap((c) => {
       try {
        // Meme decodage que la bibliotheque (`unescapeColonValue`) : seulement
        // %2C, %3A, %25. `decodeURIComponent` leverait sur « Moins de 70 % ».
        const decode = (s) => s.replace(/%2C/gi, ',').replace(/%3A/gi, ':').replace(/%25/g, '%');
        const rgb = (hex) => {
          const h = hex.replace('#', '');
          const v = h.length === 3 ? h.split('').map((x) => x + x).join('') : h;
          return `rgb(${parseInt(v.slice(0, 2), 16)}, ${parseInt(v.slice(2, 4), 16)}, ${parseInt(v.slice(4, 6), 16)})`;
        };
        const table = new Map(
          c.getAttribute('color-map').split(',').map((p) => {
            const i = p.lastIndexOf(':');
            return [decode(p.slice(0, i).trim()).toLowerCase(), p.slice(i + 1).trim()];
          })
        );
        return [...c.querySelectorAll('.legend_dot')].flatMap((dot) => {
          const libelle = (dot.parentElement?.textContent || '').trim().toLowerCase();
          const attendu = table.get(libelle);
          if (!attendu || !/^#[0-9a-f]{3,6}$/i.test(attendu)) return [];
          const vu = getComputedStyle(dot).backgroundColor;
          return vu === rgb(attendu) ? [] : [`${c.id || 'graphique'} « ${libelle} » : ${vu} au lieu de ${attendu}`];
        });
       } catch (e) {
        return [`${c.id || 'graphique'} : contrôle de légende impossible (${e.message})`];
       }
      }),
    };
  }).catch(() => ({ erreur: 'relevé impossible' }));
  etat[p] = { erreurs, ...releve };
  process.stdout.write(
    `${p.padEnd(46)} err:${String(erreurs.length).padStart(2)}` +
    ` kpi:${String((releve.kpi || []).length).padStart(2)}` +
    ` graph:${String(releve.nbCanvas ?? 0).padStart(2)}` +
    ` carte:${String(releve.nbCarte ?? 0).padStart(2)}` +
    ` cfg:${(releve.erreursConfig || []).length}` +
    ((releve.legendesFausses || []).length ? ` légende≠:${releve.legendesFausses.length}` : '') +
    '\n'
  );
  await ctx.close();
}
await navigateur.close();
writeFileSync(sortie, JSON.stringify(etat, null, 2));
console.log(`\n→ ${sortie}`);
