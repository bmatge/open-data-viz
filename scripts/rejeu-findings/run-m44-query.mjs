// Rejeu de la montée dsfr-data 0.42.0 → 0.44.0 (2026-10-03) : constats du registre qui
// touchent dsfr-data-query. Chaque test se rejoue DEUX fois, bundle substitué par REJEU_BUNDLE :
// un constat n'est « corrigé » que si le défaut se reproduit sous 0.42.0 ET disparaît sous 0.44.0.
//
//   REJEU_BASE=http://localhost:3111 REJEU_BUNDLE=<pkg42>/package/dist node scripts/rejeu-findings/run-m44-query.mjs bug023
//   REJEU_BASE=http://localhost:3111 REJEU_BUNDLE=<pkg44>/package/dist node scripts/rejeu-findings/run-m44-query.mjs bug023
//
// Tests (pages ./pages/m44-<id>.html) :
//   bug023   max/min de query sur des dates ISO (données en ligne)
//   bug028   avg/sum/min/max d'un groupe entièrement nul (données en ligne)
//   bug032   min/max sur « 2024-09 » et « 75A », numeric de normalize sur « 1922-1930 » (en ligne)
//   bug038   min/max sur N valeurs — second argument : N (défaut 200000)
//   am110    share_percent sans partition (en ligne)
//   bug026   group_by perdu derrière un normalize — data.economie.gouv.fr, 1 requête
//            (second argument « temoin » : la même chaîne sans normalize)
//   bug036   délégation sous des noms renommés — tabular-api.data.gouv.fr
// BUG-027 se rejoue par l'existant : run-70-71.mjs alias.
import { ouvrir } from './harness.mjs';

const [test, arg] = process.argv.slice(2);
const bundle = process.env.REJEU_BUNDLE || undefined;
const attendre = (ms) => new Promise((r) => setTimeout(r, ms));

function reseau(page, motif) {
  const vus = [];
  page.on('response', (r) => {
    if (motif.test(r.url())) vus.push({ status: r.status(), url: decodeURIComponent(r.url()).replace(/^https:\/\/[^/]+/, '') });
  });
  page.on('requestfailed', (r) => {
    if (motif.test(r.url())) vus.push({ status: 'ECHEC ' + (r.failure()?.errorText || ''), url: decodeURIComponent(r.url()).replace(/^https:\/\/[^/]+/, '') });
  });
  return vus;
}

// Données d'un transformateur et texte d'un KPI, lus dans la page.
const lire = (page, ids, kpis = []) =>
  page.evaluate(
    ([ids, kpis]) => {
      const out = {};
      for (const id of ids) {
        const el = document.getElementById(id);
        out[id] = el?.getData ? el.getData() : (el?._data ?? '(pas de getData)');
        const err = el?.getError?.();
        if (err) out[id + ' [erreur]'] = String(err.message || err);
      }
      for (const id of kpis) out['kpi ' + id] = document.getElementById(id)?.innerText.replace(/\s+/g, ' ').trim();
      return out;
    },
    [ids, kpis]
  );

async function simple(fichier, ids, kpis, { delai = 3000, filtre = /./ } = {}) {
  const t = await ouvrir('/_test/' + fichier, { bundle });
  await attendre(delai);
  const r = await lire(t.page, ids, kpis);
  console.log('version', await t.version());
  console.log(JSON.stringify(r, null, 1));
  console.log('console :', t.logs.filter((l) => l.type !== 'log' && filtre.test(l.texte)).map((l) => `${l.type}: ${l.texte.slice(0, 400)}`));
  await t.fermer();
}

const tests = {
  bug023: () => simple('m44-bug023.html', ['qg', 'q'], ['k', 'kq']),
  bug028: () => simple('m44-bug028.html', ['qg', 'q'], ['k']),
  bug032: () => simple('m44-bug032.html', ['q', 'qg', 'qn', 'rn', 'rnp'], []),
  am110: async () => {
    const t = await ouvrir('/_test/m44-am110.html', { bundle });
    await attendre(3000);
    const r = await lire(t.page, ['q1', 'q2', 'q3']);
    const sommes = {};
    for (const [id, rows] of Object.entries(r)) {
      if (!Array.isArray(rows)) continue;
      sommes[id] = { total: 0 };
      for (const row of rows) {
        const p = Number(row.part) || 0;
        sommes[id].total += p;
        sommes[id][row.annee] = (sommes[id][row.annee] || 0) + p;
      }
    }
    console.log('version', await t.version());
    console.log(JSON.stringify(r, null, 1));
    console.log('sommes des parts (total, puis par année) :', JSON.stringify(sommes));
    console.log('console :', t.logs.filter((l) => l.type !== 'log').map((l) => `${l.type}: ${l.texte.slice(0, 400)}`));
    await t.fermer();
  },
  bug038: async () => {
    const n = Number(arg || 200000);
    const t = await ouvrir('/_test/m44-bug038.html?n=' + n, { bundle });
    await attendre(n > 150000 ? 12000 : 8000);
    const r = await lire(t.page, ['qx', 'qxg', 'qd', 'qs'], ['kx', 'kd']);
    r.lignesSource = await t.page.evaluate(() => document.getElementById('s').getData?.()?.length);
    console.log('version', await t.version(), '— N =', n);
    console.log(JSON.stringify(r, null, 1));
    console.log('console :', t.logs.filter((l) => l.type !== 'log').map((l) => `${l.type}: ${l.texte.slice(0, 400)}`));
    await t.fermer();
  },
  bug026: async () => {
    const t = await ouvrir('/_test/m44-bug026.html' + (arg === 'temoin' ? '?temoin=1' : ''), { bundle });
    const vus = reseau(t.page, /data\.economie\.gouv\.fr\/api/);
    await attendre(15000);
    const r = await lire(t.page, ['q'], ['k']);
    r.groupes = Array.isArray(r.q) ? r.q.length : null;
    console.log('version', await t.version(), arg === 'temoin' ? '— TÉMOIN sans normalize' : '— chaîne avec normalize');
    console.log(JSON.stringify({ r, reseau: vus }, null, 1));
    console.log('console :', t.logs.filter((l) => l.type !== 'log').map((l) => `${l.type}: ${l.texte.slice(0, 500)}`));
    await t.fermer();
  },
  bug036: async () => {
    const t = await ouvrir('/_test/m44-bug036.html', { bundle });
    const vus = reseau(t.page, /data\.gouv\.fr/);
    await attendre(20000);
    const r = await lire(t.page, [], ['k', 'kg']);
    const q2 = await t.page.evaluate(() => document.getElementById('q2').getData?.() ?? []);
    r.q2_lignes = q2.length;
    r.q2_extrait = q2.slice(0, 3);
    r.q1_lignes = await t.page.evaluate(() => document.getElementById('q1').getData?.()?.length);
    r.source_lignes = await t.page.evaluate(() => document.getElementById('s').getData?.()?.length);
    console.log('version', await t.version());
    console.log(JSON.stringify({ r, reseau: vus }, null, 1));
    console.log('console :', t.logs.filter((l) => l.type !== 'log').map((l) => `${l.type}: ${l.texte.slice(0, 500)}`));
    await t.fermer();
  },
};

if (!tests[test]) {
  console.error(`usage : node run-m44-query.mjs <${Object.keys(tests).join('|')}> [argument]`);
  process.exit(1);
}
await tests[test]();
