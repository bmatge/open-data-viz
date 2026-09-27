// Rejeu des issues open-data-viz#70 et #71 (2026-09-27) contre la 0.42.0 publiée
// et contre origin/main de dsfr-data.
//
//   PORT=3911 node server.js &                       # le banc (ou tout port libre)
//   REJEU_BASE=http://localhost:3911 node scripts/rejeu-findings/run-70-71.mjs summary
//   REJEU_BUNDLE=<origin/main>/packages/core/dist REJEU_BASE=… node … summary
//
// Tests :
//   summary   #70 : map-summary="sum" sur des lignes hors découpage (977, 978, 986, 987, vide)
//   idle      #71 : la couche d'une dsfr-data-map se vide-t-elle quand la query repasse en attente ?
//   legend    #71 : le repli « Autres valeurs » de dsfr-data-map-legend se renomme-t-il ?
//   alias     #71 / BUG-027 : where de query sur un alias d'agrégat, query seule lectrice
//   median    #71 : median() ODSQL dans le select, avec et sans group_by
//
// Les deux derniers interrogent data.education.gouv.fr (une page à la fois, deux ou trois
// requêtes chacune).
import { ouvrir } from './harness.mjs';

const [test] = process.argv.slice(2);
const bundle = process.env.REJEU_BUNDLE || undefined;
const attendre = (ms) => new Promise((r) => setTimeout(r, ms));

function reseau(page, motif) {
  const vus = [];
  page.on('response', (r) => {
    if (motif.test(r.url())) vus.push({ status: r.status(), url: decodeURIComponent(r.url()).replace(/^https:\/\/[^/]+/, '') });
  });
  return vus;
}

const cercles = (page) =>
  page.evaluate(() => document.querySelectorAll('#m .leaflet-overlay-pane path.leaflet-interactive').length);

const tests = {
  async summary() {
    const t = await ouvrir('/_test/f70-map-summary.html', { bundle });
    await t.page.locator('#c-sum').scrollIntoViewIfNeeded();
    await attendre(4000);
    const r = await t.page.evaluate(() => {
      const c = document.getElementById('c-sum');
      const mc = c.querySelector('map-chart');
      return {
        kpi: document.getElementById('k').innerText.replace(/\s+/g, ' ').trim(),
        skipped: c.getSkippedCount?.(),
        data: mc?.getAttribute('data'),
        value: mc?.getAttribute('value'),
        texteCarte: ((mc?.shadowRoot?.textContent || '') + ' ' + (mc?.textContent || '')).replace(/\s+/g, ' ').trim().slice(0, 300),
      };
    });
    console.log('version', await t.version());
    console.log(JSON.stringify(r, null, 1));
    console.log('console :', t.logs.filter((l) => /dsfr-data|ignor/.test(l.texte)).map((l) => `${l.type}: ${l.texte}`));
    await t.page.locator('#c-sum').screenshot({ path: `capture-f70-${bundle ? 'main' : 'cdn'}.png` });
    await t.fermer();
  },

  async idle() {
    const t = await ouvrir('/_test/f71-map-idle.html', { bundle });
    await attendre(3000);
    const etat = async (etape) => ({
      etape,
      display: await t.page.evaluate(() => document.getElementById('d').innerText.replace(/\s+/g, ' ').trim()),
      cercles: await cercles(t.page),
      texteCarte: await t.page.evaluate(() => {
        const m = document.getElementById('m');
        return [...m.querySelectorAll('.fr-alert, [role=status], .dsfr-data-map__status, p')].map((e) => e.innerText.trim()).filter(Boolean).join(' | ');
      }),
    });
    const r = [await etat('1. chargement, aucun filtre')];
    await t.page.evaluate(() => document.getElementById('q').setAttribute('where', 't:eq:a'));
    await attendre(2000);
    r.push(await etat('2. where="t:eq:a"'));
    await t.page.evaluate(() => document.getElementById('q').removeAttribute('where'));
    await attendre(2000);
    r.push(await etat('3. where retiré'));
    console.log('version', await t.version());
    console.log(JSON.stringify(r, null, 1));
    console.log('console :', t.logs.filter((l) => /dsfr-data/.test(l.texte)).map((l) => `${l.type}: ${l.texte}`));
    await t.fermer();
  },

  async legend() {
    const t = await ouvrir('/_test/f71-map-legend.html', { bundle });
    await attendre(2000);
    await t.page.locator('#m2').scrollIntoViewIfNeeded();
    await attendre(2000);
    const r = await t.page.evaluate(() => ({
      legende: document.getElementById('lg').innerText.replace(/\s+/g, ' ').trim(),
      entrees: document.getElementById('l').getLegendEntries?.(),
      contournement: document.getElementById('lg2').innerText.replace(/\s+/g, ' ').trim(),
      donneesRecodees: document.getElementById('l2')._data?.map((r) => r.t2),
    }));
    console.log('version', await t.version());
    console.log(JSON.stringify(r, null, 1));
    console.log('console :', t.logs.filter((l) => /label|inconnu|dsfr-data/.test(l.texte)).map((l) => `${l.type}: ${l.texte}`));
    await t.fermer();
  },

  async alias() {
    const t = await ouvrir('/_test/f71-where-alias.html', { bundle });
    const vus = reseau(t.page, /data\.education\.gouv\.fr\/api/);
    await attendre(12000);
    const r = await t.page.evaluate(() => ({
      k: document.getElementById('k').innerText.replace(/\s+/g, ' ').trim(),
      k2: document.getElementById('k2').innerText.replace(/\s+/g, ' ').trim(),
    }));
    console.log('version', await t.version());
    console.log(JSON.stringify({ r, reseau: vus }, null, 1));
    console.log('console :', t.logs.filter((l) => l.type !== 'log' || /dsfr-data/.test(l.texte)).map((l) => `${l.type}: ${l.texte}`));
    await t.fermer();
  },

  async median() {
    const t = await ouvrir('/_test/f71-median.html', { bundle });
    const vus = reseau(t.page, /data\.education\.gouv\.fr\/api/);
    await attendre(10000);
    const r = await t.page.evaluate(() => ({
      k1: document.getElementById('k1').innerText.replace(/\s+/g, ' ').trim(),
      k2: document.getElementById('k2').innerText.replace(/\s+/g, ' ').trim(),
    }));
    console.log('version', await t.version());
    console.log(JSON.stringify({ r, reseau: vus }, null, 1));
    console.log('console :', t.logs.filter((l) => l.type === 'error' || l.type === 'warning').map((l) => `${l.type}: ${l.texte}`));
    await t.fermer();
  },
};

if (!tests[test]) {
  console.error(`usage : node run-70-71.mjs <${Object.keys(tests).join('|')}>`);
  process.exit(1);
}
await tests[test]();
