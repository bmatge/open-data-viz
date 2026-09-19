// Rejeu des constats revérifiés le 2026-09-19 (voir l'epic open-data-viz#40).
//
//   npm start                                       # le banc sur :3000
//   node scripts/rejeu-findings/run.mjs bug015      # contre le bundle du CDN épinglé par les pages
//   REJEU_BUNDLE=/chemin/package/dist node scripts/rejeu-findings/run.mjs bug015   # contre un paquet npm
//
// Tests : bug008 (clés de carte hors référentiel), bug015 (jointure require-where selon
// l'ordre du DOM), bug017 (plein écran + encarts), bug018 (summary content-box, + LIM-012),
// lim004 (répéteur imbriqué), lim001 (nombre de requêtes du Plan de relance),
// overlays (databox + reference-lines/targets, groupe null dans a11y, millésimes numériques).
import { ouvrir } from './harness.mjs';

const [test] = process.argv.slice(2);
const bundle = process.env.REJEU_BUNDLE || undefined;
const v = bundle ? 'bundle' : 'cdn';
const attendre = (ms) => new Promise((r) => setTimeout(r, ms));

const tests = {
  async bug008() {
    const t = await ouvrir('/_test/bug008.html', { bundle });
    await attendre(4000);
    const r = await t.page.evaluate(() => {
      const lire = (id) => {
        const el = document.getElementById(id);
        const mc = el.querySelector('map-chart');
        return {
          skipped: typeof el.getSkippedCount === 'function' ? el.getSkippedCount() : 'n/a',
          data: mc ? mc.getAttribute('data') : '(pas de map-chart)',
          paths: mc ? mc.shadowRoot?.querySelectorAll('path').length ?? mc.querySelectorAll('path').length : 0,
        };
      };
      return { reg: lire('c-reg'), aca: lire('c-aca') };
    });
    console.log('version', await t.version());
    console.log(JSON.stringify(r, null, 1));
    console.log('console :', t.logs.filter((l) => /ignor|référentiel|dsfr-data-chart/.test(l.texte)).map((l) => l.texte));
    await t.page.screenshot({ path: `capture-bug008-${v}.png`, fullPage: true });
    await t.fermer();
  },

  async bug017() {
    const t = await ouvrir('/_test/bug017.html', { bundle });
    await attendre(3000);
    console.log('version', await t.version());
    for (const id of ['m-sans', 'm-avec']) {
      const avant = await t.page.evaluate((id) => document.getElementById(id).querySelector('.leaflet-container').getBoundingClientRect().height, id);
      await t.page.click(`#${id} .dsfr-data-map__fullscreen`, { force: true });
      await attendre(1200);
      const r = await t.page.evaluate((id) => {
        const el = document.getElementById(id);
        const c = el.querySelector('.leaflet-container').getBoundingClientRect();
        return { fs: document.fullscreenElement?.id ?? null, largeur: c.width, hauteur: c.height, encarts: [...el.querySelectorAll('dsfr-data-map-inset')].map((i) => Math.round(i.getBoundingClientRect().height)) };
      }, id);
      await t.page.screenshot({ path: `capture-bug017-${id}-${v}.png` });
      await t.page.keyboard.press('Escape');
      await attendre(800);
      const apresEchap = await t.page.evaluate(() => document.fullscreenElement?.id ?? null);
      if (apresEchap) await t.page.evaluate(() => document.exitFullscreen());
      await attendre(800);
      const apres = await t.page.evaluate((id) => ({ fs: document.fullscreenElement?.id ?? null, h: document.getElementById(id).querySelector('.leaflet-container').getBoundingClientRect().height }), id);
      console.log(id, 'avant', avant, '→ plein écran', JSON.stringify(r), '→ après Échap : fullscreenElement =', apresEchap, '→ après exitFullscreen()', JSON.stringify(apres));
    }
    console.log('erreurs console :', t.logs.filter((l) => l.type === 'error' || l.type === 'pageerror').map((l) => l.texte));
    await t.fermer();
  },

  async lim004() {
    const t = await ouvrir('/_test/lim004.html', { bundle });
    await attendre(3000);
    console.log('version', await t.version());
    const r = await t.page.evaluate(() => ({
      sections: [...document.querySelectorAll('section.chapitre')].map((s) => s.dataset.ch),
      questions: [...document.querySelectorAll('p.question')].map((p) => p.textContent),
      queries: [...document.querySelectorAll('dsfr-data-query')].map((q) => q.id + ' where=' + q.getAttribute('where')),
      cache: Object.keys(window.__dsfrDataCache || {}),
    }));
    console.log(JSON.stringify(r, null, 1));
    console.log('console :', t.logs.map((l) => l.type + ': ' + l.texte).slice(0, 10));
    await t.fermer();
  },

  async bug015() {
    for (const ordre of ['mauvais', 'bon']) {
      const t = await ouvrir(`/_test/bug015-${ordre}.html`, { bundle });
      await attendre(7000);
      const r = await t.page.evaluate(() => ({
        kpi: document.getElementById('k').innerText.replace(/\s+/g, ' ').trim(),
        display: document.getElementById('d').innerText.replace(/\s+/g, ' ').trim().slice(0, 80),
      }));
      console.log(ordre, '| version', await t.version(), '|', JSON.stringify(r));
      await t.page.selectOption('#sel-reg', '53');
      await attendre(5000);
      const r2 = await t.page.evaluate(() => ({
        kpi: document.getElementById('k').innerText.replace(/\s+/g, ' ').trim(),
        display: document.getElementById('d').innerText.replace(/\s+/g, ' ').trim().slice(0, 80),
      }));
      console.log(ordre, '| après choix Bretagne', JSON.stringify(r2));
      console.log('  console :', t.logs.filter((l) => l.type !== 'log').map((l) => l.type + ': ' + l.texte.slice(0, 160)).slice(0, 6));
      await t.fermer();
    }
  },

  // Trois faits relevés par le chantier 4 (skill métier), rejoués en isolant la variable.
  async overlays() {
    const t = await ouvrir('/_test/overlays.html', { bundle });
    await attendre(6000);
    const r = await t.page.evaluate(() => {
      const ov = (id) => {
        const el = document.getElementById(id);
        return {
          reflines: el.querySelectorAll('svg.dsfr-data-chart__reflines').length,
          targets: el.querySelectorAll('svg.dsfr-data-chart__targets').length,
          marqueurs: el.querySelectorAll('.dsfr-data-chart__target-marker').length,
          conteneur: el.querySelector('.dsfr-data-chart__wrapper') ? 'wrapper' : el.querySelector('.dsfr-data-chart__databox-wrapper') ? 'databox-wrapper' : 'aucun',
          x: el.querySelector('line-chart')?.getAttribute('x'),
          legende: el.innerText.includes('Trajectoire') || el.innerText.includes('projet'),
        };
      };
      const cellules = (id) => [...document.getElementById(id).querySelectorAll('tbody tr')].map((tr) => [...tr.children].map((c) => c.textContent.trim()).join(' | '));
      const ticks = (id) => {
        const c = document.getElementById(id).querySelector('canvas');
        const ch = window.Chart?.getChart?.(c);
        return ch ? ch.scales.x.ticks.map((tk) => tk.label) : 'Chart global indisponible';
      };
      return {
        sans: ov('g-sans'), avec: ov('g-avec'),
        nul: { axeX: document.getElementById('g-null').querySelector('bar-chart')?.getAttribute('x'), table: cellules('a-null') },
        anneesNum: { xTransmis: document.getElementById('g-num').querySelector('line-chart')?.getAttribute('x'), ticks: ticks('g-num'), table: cellules('a-num') },
        anneesTxt: { xTransmis: document.getElementById('g-txt').querySelector('line-chart')?.getAttribute('x'), ticks: ticks('g-txt'), table: cellules('a-txt') },
      };
    });
    console.log('version', await t.version());
    console.log(JSON.stringify(r, null, 1));
    console.log('console :', t.logs.filter((l) => /overlay|introuvable|dsfr-data-chart|error/i.test(l.texte) || l.type === 'error').map((l) => l.type + ': ' + l.texte.slice(0, 200)));
    await t.page.screenshot({ path: `capture-overlays-${v}.png`, fullPage: true });
    await t.fermer();
  },

  async bug018() {
    const t = await ouvrir('/viz/plan-de-relance', { bundle, width: 390, height: 800 });
    await attendre(6000);
    const r = await t.page.evaluate(() => {
      const s = document.querySelector('dsfr-data-a11y summary.fr-accordion__btn');
      if (!s) return 'pas de summary';
      const cs = getComputedStyle(s);
      const a11y = document.querySelector('dsfr-data-a11y');
      return { boxSizing: cs.boxSizing, width: s.getBoundingClientRect().width, parent: s.parentElement.getBoundingClientRect().width, scrollW: document.documentElement.scrollWidth, innerW: window.innerWidth,
        lim012: { lignesTable: a11y.querySelectorAll('tbody tr').length, tronque: /limite aux \d+ premi/.test(a11y.textContent) ? a11y.textContent.match(/[^.]*limite aux \d+ premi[^.]*/)[0].trim() : 'non tronqué' } };
    });
    console.log('version', await t.version(), JSON.stringify(r));
    await t.fermer();
  },
};

if (!tests[test] && test !== "lim001") {
  console.error('tests :', Object.keys(tests).join(', '));
  process.exit(1);
}
if (tests[test]) await tests[test]();

// LIM-001 : combien de requêtes API pour charger le Plan de relance en entier ?
if (test === 'lim001') {
  const t = await ouvrir('/viz/plan-de-relance', { bundle });
  const reqs = [];
  t.page.on('request', (r) => { if (/data\.economie\.gouv\.fr/.test(r.url())) reqs.push(r.url()); });
  await attendre(8000);
  const total = await t.page.evaluate(() => document.querySelector('dsfr-data-kpi')?.innerText.replace(/\s+/g, ' ').trim());
  console.log('version', await t.version(), '| requêtes API :', reqs.length);
  reqs.forEach((u) => console.log('  ', u.replace(/^https:\/\/data\.economie\.gouv\.fr\/api\/explore\/v2\.1\/catalog\/datasets\//, '…/').slice(0, 160)));
  console.log('premier KPI :', total);
  await t.fermer();
}
