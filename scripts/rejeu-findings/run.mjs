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
//
// Dette de preuve (open-data-viz#39, rejouée le 2026-09-19 contre la 0.31.0) :
//   am056   une clé, deux noms de champ : la voie native marche, et ce qu'elle coûte
//   am055   cadrage d'une map-monde : les attributs du map-chart reellement instancie
//   am063   échelle logarithmique : trois orthographes, et l'arbitrage dsfr-data / dsfr-chart
//   am081   libellé de valeur sur une facette : trois formes, toutes rendent le code
//   bug009  query group-by sur une source partagée, forme immédiate ET forme tardive (#853)
//   pg028   deux contextes url-sync sur le même nom de champ : l'URL n'en garde qu'un
//   pg029   deux contextes sur un même <select> : l'ordre de déclaration décide
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

  // ── Dette de preuve (open-data-viz#39) : six entrees etablies au source ou au
  // JSDoc, jamais rejouees au navigateur. Rejouees ici contre la 0.31.0.

  // AM-056 : une cle, deux noms de champ selon le jeu. La voie native est un
  // context-filter par jeu sur le meme `ui` — verifie qu'elle marche.
  async am056() {
    const t = await ouvrir('/_test/am056.html', { bundle });
    await attendre(3000);
    const lire = () => t.page.evaluate(() => ({
      es: document.getElementById('k-es').innerText.replace(/\s+/g, ' ').trim(),
      insee: document.getElementById('k-insee').innerText.replace(/\s+/g, ' ').trim(),
      tags: document.getElementById('tags').innerText.replace(/\s+/g, ' ').trim(),
      requetes: performance.getEntriesByType('resource').filter((r) => /equipements\.sports/.test(r.name)).length,
    }));
    console.log('version', await t.version());
    console.log('au chargement (require-where) :', JSON.stringify(await lire()));
    await t.page.selectOption('#sel', 'Bretagne');
    await attendre(4000);
    console.log('Bretagne            :', JSON.stringify(await lire()));
    await t.page.selectOption('#sel', 'Nouvelle-Aquitaine');
    await attendre(4000);
    console.log('Nouvelle-Aquitaine  :', JSON.stringify(await lire()));
    console.log('console :', t.logs.filter((l) => l.type !== 'log').map((l) => l.type + ': ' + l.texte.slice(0, 160)).slice(0, 6));
    await t.fermer();
  },

  // AM-055 : cadrage d'une map-monde. Arbitrage dsfr-data / dsfr-chart : on releve
  // les attributs de l'element map-chart REELLEMENT instancie.
  async am055() {
    const t = await ouvrir('/_test/am055.html', { bundle });
    await attendre(8000);
    const r = await t.page.evaluate(() => {
      const lire = (id) => ({
        elementsInstancies: [...new Set([...document.getElementById(id).querySelectorAll('*')].map((e) => e.tagName.toLowerCase()).filter((n) => n.includes('-')))],
        attributsDuMapChart: [...(document.getElementById(id).querySelector('map-chart')?.attributes ?? [])].map((a) => a.name),
      });
      return { nu: lire('g1'), avecCadrage: lire('g2'), attributsRetenus: [...document.getElementById('g2').attributes].map((a) => a.name) };
    });
    console.log('version', await t.version());
    console.log(JSON.stringify(r, null, 1));
    console.log('console :', t.logs.filter((l) => l.type !== 'log').map((l) => l.type + ': ' + l.texte.slice(0, 200)).slice(0, 8));
    await t.fermer();
  },

  // AM-063 : echelle logarithmique. Trois orthographes essayees + inspection de
  // l'objet Chart.js reellement construit par DSFR Chart.
  async am063() {
    const t = await ouvrir('/_test/am063.html', { bundle });
    await attendre(6000);
    const r = await t.page.evaluate(() => {
      const ech = (id) => {
        const c = document.getElementById(id).querySelector('canvas');
        const ch = window.Chart?.getChart?.(c);
        return ch ? { typeAxeY: ch.scales.y?.type, min: ch.scales.y?.min, max: ch.scales.y?.max } : 'Chart global indisponible';
      };
      return {
        defaut: ech('g1'),
        avecLog: ech('g2'),
        attributsRetenus: [...document.getElementById('g2').attributes].map((a) => a.name),
        barChartAttrs: [...(document.getElementById('g2').querySelector('bar-chart')?.attributes ?? [])].map((a) => a.name),
      };
    });
    console.log('version', await t.version());
    console.log(JSON.stringify(r, null, 1));
    console.log('console :', t.logs.filter((l) => l.type !== 'log').map((l) => l.type + ': ' + l.texte.slice(0, 200)).slice(0, 8));
    await t.fermer();
  },

  // AM-081 : libelle de valeur sur une facette. Trois formes, dont un attribut
  // invente — pour verifier qu'il est ignore EN SILENCE.
  async am081() {
    const t = await ouvrir('/_test/am081.html', { bundle });
    await attendre(6000);
    const r = await t.page.evaluate(() => {
      const vals = (id) => [...document.getElementById(id).querySelectorAll('label, .fr-label, legend')].map((e) => e.textContent.trim()).filter(Boolean).slice(0, 12);
      return { f1: vals('f1'), f2: vals('f2'), f3: vals('f3') };
    });
    console.log('version', await t.version());
    console.log(JSON.stringify(r, null, 1));
    console.log('console :', t.logs.filter((l) => l.type !== 'log').map((l) => l.type + ': ' + l.texte.slice(0, 200)).slice(0, 8));
    await t.fermer();
  },

  // BUG-009 : une query group-by branchee sur une source partagee. Forme immediate
  // ET forme TARDIVE (#853, livree en 0.30.0) : la query ajoutee au DOM apres coup.
  async bug009() {
    const t = await ouvrir('/_test/bug009.html', { bundle });
    await attendre(6000);
    const avant = await t.page.evaluate(() => ({
      kpiSource: document.getElementById('k').innerText.replace(/\s+/g, ' ').trim(),
      lignesListe: document.querySelectorAll('#d .l').length,
      premieres: [...document.querySelectorAll('#d .l')].map((e) => e.textContent.trim()).slice(0, 3),
      kpiQuery: document.getElementById('kq').innerText.replace(/\s+/g, ' ').trim(),
    }));
    console.log('version', await t.version());
    console.log('avant la query tardive :', JSON.stringify(avant));
    await attendre(7000); // la seconde query est injectee a t+4 s
    const apres = await t.page.evaluate(() => ({
      kpiSource: document.getElementById('k').innerText.replace(/\s+/g, ' ').trim(),
      lignesListe: document.querySelectorAll('#d .l').length,
      premieres: [...document.querySelectorAll('#d .l')].map((e) => e.textContent.trim()).slice(0, 3),
      kpiQuery: document.getElementById('kq').innerText.replace(/\s+/g, ' ').trim(),
      kpiQueryTardive: document.getElementById('kq2')?.innerText.replace(/\s+/g, ' ').trim() ?? 'absent',
    }));
    console.log('apres la query tardive :', JSON.stringify(apres));
    console.log('console :', t.logs.filter((l) => l.type !== 'log' || /partag|source|group/i.test(l.texte)).map((l) => l.type + ': ' + l.texte.slice(0, 200)).slice(0, 10));
    await t.fermer();
  },

  // PG-028 : deux contextes url-sync sur le MEME nom de champ. On choisit deux
  // regions differentes, on releve l'URL, on la recharge.
  async pg028() {
    const t = await ouvrir('/_test/pg028-a.html', { bundle });
    await attendre(3000);
    await t.page.selectOption('#sel-ref', 'Bretagne');
    await attendre(2500);
    await t.page.selectOption('#sel-cmp', 'Normandie');
    await attendre(4000);
    const etat = () => t.page.evaluate(() => ({
      url: location.search,
      selRef: document.getElementById('sel-ref').value,
      selCmp: document.getElementById('sel-cmp').value,
      kRef: document.getElementById('k-ref').innerText.replace(/\s+/g, ' ').trim(),
      kCmp: document.getElementById('k-cmp').innerText.replace(/\s+/g, ' ').trim(),
    }));
    console.log('version', await t.version());
    const a = await etat();
    console.log('apres les deux choix :', JSON.stringify(a));
    await t.page.goto('http://localhost:3000/_test/pg028-a.html' + a.url, { waitUntil: 'domcontentloaded' });
    await attendre(6000);
    console.log('apres rechargement   :', JSON.stringify(await etat()));
    console.log('console :', t.logs.filter((l) => l.type !== 'log').map((l) => l.type + ': ' + l.texte.slice(0, 200)).slice(0, 8));
    await t.fermer();
  },

  // PG-029 : deux contextes sur un meme <select>, l'un url-sync l'autre non.
  // L'ordre de declaration decide si le lien profond s'applique aux deux.
  async pg029() {
    for (const ordre of ['plain-dabord', 'sync-dabord']) {
      const t = await ouvrir(`/_test/pg029-${ordre}.html?reg_nom=Bretagne`, { bundle });
      await attendre(7000);
      const r = await t.page.evaluate(() => ({
        select: document.getElementById('sel').value,
        a: document.getElementById('k-a').innerText.replace(/\s+/g, ' ').trim(),
        b: document.getElementById('k-b').innerText.replace(/\s+/g, ' ').trim(),
        requetes: performance.getEntriesByType('resource').filter((r) => /where=/.test(r.name)).map((r) => decodeURIComponent(r.name).match(/where=[^&]*/)?.[0]).filter(Boolean),
      }));
      console.log(ordre.padEnd(14), '| version', await t.version(), '|', JSON.stringify(r));
      console.log('   console :', t.logs.filter((l) => l.type !== 'log').map((l) => l.type + ': ' + l.texte.slice(0, 160)).slice(0, 4));
      await t.fermer();
    }
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
