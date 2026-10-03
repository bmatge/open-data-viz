// Rejeu du 2026-10-03, montée dsfr-data 0.42.0 → 0.44.0 : constats « source » du registre
// (PG-033, PG-034, AM-103, AM-090, AM-114). AM-087 est documentaire (fiche + curl).
//
//   REJEU_BASE=http://localhost:3111 REJEU_BUNDLE=<pkg>/package/dist \
//     node scripts/rejeu-findings/run-m44-source.mjs <test>
//
// Chaque test se rejoue DEUX fois : bundle 0.42.0 (témoin, le défaut doit s'y reproduire)
// puis bundle 0.44.0. Sans REJEU_BUNDLE, c'est la version écrite dans la page (CDN).
//
// Tests :
//   tri          PG-033 : lignes brutes, order-by sur un champ non unique, 1 818 lignes / 10 pages
//   tri-groupe   PG-033 : la même chose sur un chargement groupé de 1 818 groupes
//   tri-tronque  PG-033 : tri serveur sur un chargement tronqué par max-records
//   in-query     PG-034 : `in` à parenthèse posé sur une dsfr-data-query
//   in-source    PG-034 : `in` à parenthèse posé sur la dsfr-data-source
//   compute      AM-103 / AM-090 : left(), substr(), quote échappée (données locales)
//   proxy        AM-114 : pages/proxy-relais.html (inchangée), bundle substitué
//
// Les cinq premiers interrogent tabular-api.data.gouv.fr (10 requêtes au plus, en série) :
// un test à la fois. Le runner ouvre d'abord une page vide pour poser ses écoutes, puis
// navigue : aucune requête du montage ne lui échappe.
import { ouvrir } from './harness.mjs';

const [test] = process.argv.slice(2);
const bundle = process.env.REJEU_BUNDLE || undefined;
const BASE = process.env.REJEU_BASE || 'http://localhost:3000';
const attendre = (ms) => new Promise((r) => setTimeout(r, ms));

async function charger(fichier, { motif = /tabular-api\.data\.gouv\.fr/, jusqua, delai = 90000, avant } = {}) {
  const t = await ouvrir('/_test/m44-vide.html', { bundle });
  const requetes = [];
  t.page.on('request', (r) => {
    if (!motif.test(r.url())) return;
    requetes.push({ url: decodeURIComponent(r.url()), cible: r.headers()['x-target-url'] || null });
  });
  const statuts = [];
  t.page.on('response', (r) => motif.test(r.url()) && statuts.push(r.status()));
  // Dernière émission de chaque source, relevée sur le bus de la bibliothèque.
  await t.page.addInitScript(() => {
    window.__vu = {};
    window.__emissions = {};
    document.addEventListener('dsfr-data-loaded', (e) => {
      const { sourceId, data } = e.detail || {};
      window.__vu[sourceId] = data;
      window.__emissions[sourceId] = (window.__emissions[sourceId] || 0) + 1;
    });
  });
  if (avant) await avant(t.page);
  t.logs.length = 0;
  await t.page.goto(`${BASE}/_test/${fichier}`, { waitUntil: 'domcontentloaded' });
  if (jusqua) await t.page.waitForFunction((id) => Array.isArray(window.__vu?.[id]), jusqua, { timeout: delai }).catch(() => {});
  await attendre(2500);
  return { t, requetes, statuts };
}

const consoleUtile = (logs) =>
  logs.filter((l) => l.type !== 'log' && l.type !== 'debug' && l.type !== 'info').map((l) => `${l.type}: ${l.texte.slice(0, 400)}`);

// URL Tabular réduite à ses paramètres, la pagination mise à part.
function resumeReseau(requetes, statuts) {
  const params = requetes.map((r) => r.url.split('/data/?')[1] || r.url);
  const sansPage = [...new Set(params.map((p) => p.split('&').filter((x) => !/^page(_size)?=/.test(x)).join('&')))];
  return {
    requetes: requetes.length,
    statuts: [...new Set(statuts)],
    avecSort: params.filter((p) => /__sort=/.test(p)).length,
    avecIn: params.filter((p) => /__in=/.test(p)).length,
    formesDistinctesHorsPagination: sansPage,
    pages: params.map((p) => (p.match(/(?:^|&)page=(\d+)/) || [])[1] || '1').join(','),
  };
}

async function lignes(page, id, cles, tri) {
  return page.evaluate(
    ({ id, cles, tri }) => {
      const d = window.__vu[id];
      if (!Array.isArray(d)) return { erreur: `aucune émission de « ${id} »`, emissions: window.__emissions };
      const k = d.map((r) => cles.map((c) => r[c]).join('|'));
      const vus = new Set();
      const doublons = [];
      for (const x of k) (vus.has(x) ? doublons.push(x) : vus.add(x));
      let trie = null;
      if (tri) {
        trie = true;
        for (let i = 1; i < d.length; i++) if (String(d[i - 1][tri]) > String(d[i][tri])) trie = false;
      }
      return {
        emissions: window.__emissions[id],
        lignesRendues: d.length,
        lignesDistinctes: vus.size,
        doublons: doublons.length,
        exemplesDoublons: doublons.slice(0, 5),
        ...(tri ? { [`trieSur_${tri}`]: trie } : {}),
        kpi: document.getElementById('k')?.innerText.replace(/\s+/g, ' ').trim(),
      };
    },
    { id, cles, tri },
  );
}

async function testTabular(fichier, { id = 's', cles = ['__id'], tri, detail } = {}) {
  const { t, requetes, statuts } = await charger(fichier, { jusqua: id });
  const r = await lignes(t.page, id, cles, tri);
  const plus = detail ? await t.page.evaluate(detail) : undefined;
  console.log('version', await t.version());
  console.log(JSON.stringify({ reseau: resumeReseau(requetes, statuts), resultat: r, ...(plus ? { detail: plus } : {}) }, null, 1));
  console.log('console :', consoleUtile(t.logs));
  await t.fermer();
}

const tests = {
  tri: () => testTabular('m44-pg033-brut.html', { tri: 'Code_region' }),
  'tri-groupe': () => testTabular('m44-pg033-groupe.html', { cles: ['Code_departement', 'indicateur'], tri: 'Code_departement' }),
  'tri-tronque': () => testTabular('m44-pg033-tronque.html', { tri: 'Code_region' }),
  'in-query': () =>
    testTabular('m44-pg034-query.html', {
      id: 'q',
      detail: () => {
        const parIndicateur = {};
        for (const r of window.__vu.q || []) parIndicateur[r.indicateur] = (parIndicateur[r.indicateur] || 0) + 1;
        return { parIndicateur, lignesDeLaSource: window.__vu.s?.length };
      },
    }),
  'in-source': () =>
    testTabular('m44-pg034-source.html', {
      detail: () => {
        const parIndicateur = {};
        for (const r of window.__vu.s || []) parIndicateur[r.indicateur] = (parIndicateur[r.indicateur] || 0) + 1;
        return { parIndicateur };
      },
    }),

  async compute() {
    const { t } = await charger('m44-compute.html', { jusqua: 'n0', delai: 15000 });
    const r = await t.page.evaluate(() => {
      const attr = (id) => document.getElementById(id).getAttribute('compute');
      const o = {};
      for (const id of ['n0', 'n1', 'n2', 'n3', 'n4', 'n5']) {
        const d = window.__vu[id];
        o[id] = { compute: attr(id), x: Array.isArray(d) ? d.map((l) => (l.x === undefined ? '(colonne absente)' : l.x)) : '(aucune émission)' };
      }
      return o;
    });
    console.log('version', await t.version());
    console.log(JSON.stringify(r, null, 1));
    console.log('console :', consoleUtile(t.logs));
    await t.fermer();
  },

  // AM-114 : la page de run-proxy.mjs, servie telle quelle par le harnais (qui substitue
  // le bundle quelle que soit la version écrite dans la page). `/relais` répond 200 vide.
  async proxy() {
    const { t, requetes } = await charger('proxy-relais.html', {
      motif: /\/relais|data\.(economie|education)\.gouv\.fr/,
      avant: (page) =>
        page.route(/\/relais(\/|$|\?)/, (route) => route.fulfill({ contentType: 'application/json', body: '{"results":[],"total_count":0}' })),
    });
    await attendre(2500);
    console.log('version', await t.version());
    console.log(JSON.stringify(requetes.map((r) => ({ url: r.url.slice(0, 170), cible: r.cible })), null, 1));
    console.log('console :', consoleUtile(t.logs));
    await t.fermer();
  },
};

if (!tests[test]) {
  console.error(`usage : node run-m44-source.mjs <${Object.keys(tests).join('|')}>`);
  process.exit(1);
}
await tests[test]();
