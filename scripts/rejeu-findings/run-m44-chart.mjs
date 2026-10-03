// Rejeu des constats graphiques du registre à la montée dsfr-data 0.42.0 → 0.44.0 (2026-10-03).
//
// Chaque test se joue DEUX fois, sur la même page minimale, en substituant le bundle :
//
//   REJEU_BASE=http://localhost:3111 REJEU_BUNDLE=<pkg42>/package/dist node scripts/rejeu-findings/run-m44-chart.mjs bug029
//   REJEU_BASE=http://localhost:3111 REJEU_BUNDLE=<pkg44>/package/dist node scripts/rejeu-findings/run-m44-chart.mjs bug029
//
// (`npm pack dsfr-data@0.42.0 && tar xzf …` pour obtenir un dist publié.)
// Règle : « corrigé » seulement si le défaut se reproduit sous 0.42.0 ET disparaît sous 0.44.0.
//
// Tests :
//   bug029   series-field / value-fields : une cellule sans observation vaut-elle 0 dans `y` ?
//   bug033   color-map sur type="line" : les points prennent-ils la couleur du trait ? (pixels du canvas)
//   bug035   tableau de la DataBox : une colonne par série ? coupé à 100 lignes ?
//   pg032    dsfr-data-a11y : grammaire `champ:Libellé`
//   pg083    map-summary : ce que le résumé écarte est-il dit à l'écran ? (page f70-map-summary.html)
//   am088    podium : format de la valeur et du sous-titre
import { ouvrir } from './harness.mjs';

const [test] = process.argv.slice(2);
const bundle = process.env.REJEU_BUNDLE || undefined;
const attendre = (ms) => new Promise((r) => setTimeout(r, ms));

// Les graphiques se rendent à la visibilité : défiler jusqu'à chacun, puis attendre.
async function montrer(page, ids, ms = 2500) {
  for (const id of ids) {
    await page.evaluate((i) => document.getElementById(i).scrollIntoView({ block: 'center' }), id);
    await attendre(ms);
  }
}

function bilan(t, filtre = /dsfr-data|ignor|écart/i) {
  console.log('console :', t.logs.filter((l) => l.type !== 'log' || filtre.test(l.texte)).map((l) => `${l.type}: ${l.texte.slice(0, 300)}`));
}

// Balaye le canvas à la souris et rend, dans l'ordre, chaque texte d'infobulle distinct rencontré.
async function infobulles(page, id) {
  const box = await page.evaluate((i) => {
    const c = document.querySelector('#' + i + ' canvas');
    if (!c) return null;
    const r = c.getBoundingClientRect();
    return { x: r.x, y: r.y, w: r.width, h: r.height };
  }, id);
  if (!box) return ['(pas de canvas)'];
  const vus = [];
  for (let fx = 0.05; fx < 1; fx += 0.03)
    for (const fy of [0.85, 0.7, 0.5, 0.3]) {
      await page.mouse.move(box.x + box.w * fx, box.y + box.h * fy, { steps: 3 });
      await attendre(120);
      const v = await page.evaluate((i) => {
        const tt = document.querySelector('#' + i + ' .tooltip');
        return tt ? tt.innerText.replace(/\s+/g, ' ').trim() : '';
      }, id);
      if (v && !vus.includes(v)) vus.push(v);
    }
  return vus;
}

// Captures d'écran seulement si REJEU_CAPTURES désigne un dossier (rien n'est écrit dans le dépôt sinon).
const CAPTURES = process.env.REJEU_CAPTURES || '';
const etiquette = bundle ? bundle.split('/').slice(-3, -2)[0] : 'cdn';
async function capturer(page, id, nom) {
  if (!CAPTURES) return;
  await page.locator('#' + id).screenshot({ path: `${CAPTURES}/capture-m44-${nom}-${etiquette}.png` }).catch(() => {});
}

const tests = {
  async bug029() {
    const t = await ouvrir('/_test/m44-bug029.html', { bundle });
    await attendre(2500);
    const ids = ['g-long-bar', 'g-long-line', 'g-large-line', 'g-large-bar'];
    await montrer(t.page, ids);
    const r = await t.page.evaluate((ids) =>
      Object.fromEntries(ids.map((id) => {
        const el = document.getElementById(id);
        const g = [...el.querySelectorAll('*')].find((e) => /-CHART$/.test(e.tagName));
        return [id, { balise: g?.tagName.toLowerCase(), x: g?.getAttribute('x'), y: g?.getAttribute('y'), name: g?.getAttribute('name') }];
      })), ids);
    console.log('version', await t.version());
    console.log(JSON.stringify(r, null, 1));
    // Infobulles : sous 0.42.0 la série absente y est écrite « 0 ».
    for (const id of ['g-long-bar', 'g-long-line']) {
      await t.page.evaluate((i) => document.getElementById(i).scrollIntoView({ block: 'center' }), id);
      await attendre(1500);
      console.log('infobulles', id, ':', JSON.stringify(await infobulles(t.page, id)));
      await capturer(t.page, id, 'bug029-' + id);
    }
    await capturer(t.page, 'g-large-line', 'bug029-g-large-line');
    bilan(t);
    await t.fermer();
  },

  async bug033() {
    const t = await ouvrir('/_test/m44-bug033.html', { bundle });
    await attendre(2500);
    await montrer(t.page, ['a', 'b', 'c']);
    console.log('version', await t.version());
    for (const id of ['a', 'b', 'c']) {
      await t.page.evaluate((i) => document.getElementById(i).scrollIntoView({ block: 'center' }), id);
      await attendre(1200);
      const r = await t.page.evaluate((i) => {
        const el = document.getElementById(i);
        const cv = el.querySelector('canvas');
        if (!cv) return '(pas de canvas)';
        const d = cv.getContext('2d').getImageData(0, 0, cv.width, cv.height).data;
        const vus = {};
        for (let p = 0; p < d.length; p += 4) {
          if (d[p + 3] < 250) continue;
          const [r, g, b] = [d[p], d[p + 1], d[p + 2]];
          if (Math.max(r, g, b) - Math.min(r, g, b) < 40) continue; // gris : axes, grille, texte
          const k = '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('');
          vus[k] = (vus[k] || 0) + 1;
        }
        const legende = [...el.querySelectorAll('[class*="legend"] [style*="background"]')].map((e) => getComputedStyle(e).backgroundColor);
        return {
          pixelsParCouleur: Object.entries(vus).sort((a, b) => b[1] - a[1]).slice(0, 6),
          demandees: { '#e1000f': vus['#e1000f'] || 0, '#00a95f': vus['#00a95f'] || 0 },
          legende: [...new Set(legende)],
        };
      }, id);
      console.log(id, JSON.stringify(r));
      await capturer(t.page, id, 'bug033-' + id);
    }
    bilan(t);
    await t.fermer();
  },

  async bug035() {
    const t = await ouvrir('/_test/m44-bug035.html', { bundle });
    await attendre(2500);
    const ids = ['g1', 'g2', 'g3', 'g4'];
    await montrer(t.page, ids, 3000);
    const r = await t.page.evaluate((ids) =>
      Object.fromEntries(ids.map((id) => {
        const el = document.getElementById(id);
        const g = [...el.querySelectorAll('*')].find((e) => /-CHART$/.test(e.tagName));
        const cont = el.querySelector('[id$="-table-default"]') || document.getElementById(el.querySelector('data-box')?.id + '-table-default');
        const table = cont?.querySelector('table');
        return [id, {
          conteneur: cont?.id ?? '(absent)',
          seriesDuGraphique: (() => { try { return JSON.parse(g?.getAttribute('y') || '[]').length; } catch { return '?'; } })(),
          legende: g?.getAttribute('name'),
          entetes: table ? [...table.querySelectorAll('thead th')].map((e) => e.textContent.trim()) : '(pas de table)',
          lignes: table ? table.querySelectorAll('tbody tr').length : 0,
          premiere: table ? [...(table.querySelector('tbody tr')?.children ?? [])].map((e) => e.textContent.trim()) : [],
          mentionTroncature: (cont?.innerText || '').replace(/\s+/g, ' ').match(/[^.]*(tronqu|premi[eè]res? lignes|sur 120|100 lignes|limit)[^.]*/i)?.[0] ?? null,
          legendeTableau: table?.querySelector('caption')?.textContent.trim() ?? null,
        }];
      })), ids);
    console.log('version', await t.version());
    console.log(JSON.stringify(r, null, 1));
    bilan(t);
    await t.fermer();
  },

  async pg032() {
    const t = await ouvrir('/_test/m44-pg032.html', { bundle });
    await attendre(2500);
    await montrer(t.page, ['g', 'a1', 'a2', 'a3'], 1200);
    const r = await t.page.evaluate(() => {
      const tab = (id) => {
        const table = document.getElementById(id).querySelector('table');
        if (!table) return '(pas de table)';
        return {
          entetes: [...table.querySelectorAll('thead th')].map((e) => e.textContent.trim()),
          lignes: [...table.querySelectorAll('tbody tr')].map((tr) => [...tr.children].map((e) => e.textContent.trim())),
        };
      };
      const g = [...document.getElementById('g').querySelectorAll('*')].find((e) => /-CHART$/.test(e.tagName));
      return { graphique: { name: g?.getAttribute('name'), y: g?.getAttribute('y') }, a1: tab('a1'), a2: tab('a2'), a3: tab('a3') };
    });
    console.log('version', await t.version());
    console.log(JSON.stringify(r, null, 1));
    console.log('console (tout sauf log) :', t.logs.filter((l) => l.type !== 'log').map((l) => `${l.type}: ${l.texte.slice(0, 300)}`));
    await t.fermer();
  },

  async pg083() {
    const t = await ouvrir('/_test/f70-map-summary.html', { bundle });
    await attendre(2000);
    await t.page.locator('#c-sum').scrollIntoViewIfNeeded();
    await attendre(4000);
    const r = await t.page.evaluate(() => {
      const c = document.getElementById('c-sum');
      const mc = c.querySelector('map-chart');
      const texteCarte = ((mc?.shadowRoot?.textContent || '') + ' ' + (mc?.textContent || '')).replace(/\s+/g, ' ').trim();
      // Tout ce que le composant écrit HORS de la balise de DSFR Chart.
      const horsCarte = [...c.querySelectorAll('*')]
        .filter((e) => !mc?.contains(e) && e.children.length === 0 && e.textContent.trim())
        .map((e) => ({ balise: e.tagName.toLowerCase(), classe: e.className, visible: !!(e.offsetWidth || e.offsetHeight), texte: e.textContent.replace(/\s+/g, ' ').trim() }));
      return {
        kpi: document.getElementById('k').innerText.replace(/\s+/g, ' ').trim(),
        skipped: c.getSkippedCount?.(),
        data: mc?.getAttribute('data'),
        value: mc?.getAttribute('value'),
        resumeDSFRChart: texteCarte.slice(0, 120),
        horsCarte,
        innerText: c.innerText.replace(/\s+/g, ' ').trim().slice(0, 400),
      };
    });
    console.log('version', await t.version());
    console.log(JSON.stringify(r, null, 1));
    bilan(t);
    await t.fermer();
  },

  async am088() {
    const t = await ouvrir('/_test/m44-am088.html', { bundle });
    await attendre(3000);
    const r = await t.page.evaluate(() =>
      Object.fromEntries(['p1', 'p2'].map((id) => {
        const el = document.getElementById(id);
        return [id, {
          libelles: [...el.querySelectorAll('.dsfr-data-podium__label')].map((e) => e.textContent.replace(/\s+/g, ' ').trim()),
          valeurs: [...el.querySelectorAll('.dsfr-data-podium__value')].map((e) => e.textContent.replace(/\s+/g, ' ').trim()),
          sousTitres: [...el.querySelectorAll('.dsfr-data-podium__subtitle')].map((e) => e.textContent.replace(/\s+/g, ' ').trim()),
          texte: el.innerText.replace(/\s+/g, ' ').trim().slice(0, 300),
        }];
      })));
    console.log('version', await t.version());
    console.log(JSON.stringify(r, null, 1));
    bilan(t);
    await t.fermer();
  },
};

if (!tests[test]) {
  console.error(`usage : node run-m44-chart.mjs <${Object.keys(tests).join('|')}>`);
  process.exit(1);
}
await tests[test]();
