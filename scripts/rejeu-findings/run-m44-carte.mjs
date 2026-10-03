// Rejeu des constats « facettes » et « cartes de points » pour la montée 0.42.0 → 0.44.0
// (2026-10-03). Chaque test se joue deux fois, bundle substitué par REJEU_BUNDLE.
//
//   REJEU_BASE=http://localhost:3111 REJEU_BUNDLE=<pkg42>/package/dist node scripts/rejeu-findings/run-m44-carte.mjs BUG-031
//   REJEU_BASE=http://localhost:3111 REJEU_BUNDLE=<pkg44>/package/dist node scripts/rejeu-findings/run-m44-carte.mjs BUG-031
//
// Tests (pages minimales pages/m44-<id>.html, données inline, aucun portail interrogé) :
//   BUG-031  valeur de facette à virgule : écriture dans l'URL puis rechargement
//   BUG-037  élément répété dans une cellule tableau : compteur de facette et lignes rendues
//   BUG-034  encarts insets="drom" : lignes et cercles par carte, avant et après un filtre
//   AM-102   préréglages la-reunion et wallis-et-futuna : le point est-il dans le cadre ?
//   AM-107   radius-field : rayons relevés pour 1, 4, 100 ; radius-scale="sqrt" ; sqrt() de compute
//
// BUG-039 et AM-113 ont déjà leur test : run-70-71.mjs idle / legend.
import { ouvrir } from './harness.mjs';

const [test] = process.argv.slice(2);
const bundle = process.env.REJEU_BUNDLE || undefined;
const attendre = (ms) => new Promise((r) => setTimeout(r, ms));
const journal = (t, motif = /./) =>
  t.logs.filter((l) => l.type !== 'log' && motif.test(l.texte)).map((l) => `${l.type}: ${l.texte.slice(0, 260)}`);

// État d'une facette + du display aval
const etatFacette = (page) =>
  page.evaluate(() => {
    const f = document.getElementById('f');
    const cases = [...f.querySelectorAll('input[type=checkbox]')];
    const lib = (i) => (i.closest('.fr-checkbox-group')?.textContent ?? i.closest('label')?.textContent ?? '').replace(/\s+/g, ' ').trim();
    return {
      url: decodeURIComponent(location.search),
      urlBrute: location.search,
      cases: cases.map((i) => `${i.checked ? '[x]' : '[ ]'} ${lib(i)}`),
      nbCochees: cases.filter((i) => i.checked).length,
      lignes: [...document.querySelectorAll('#d .ligne')].map((e) => e.textContent.trim()),
      texteDisplay: document.getElementById('d').innerText.replace(/\s+/g, ' ').trim().slice(0, 120),
    };
  });

const cocher = async (page, texte) => {
  const ok = await page.evaluate((texte) => {
    const f = document.getElementById('f');
    const i = [...f.querySelectorAll('input[type=checkbox]')].find((i) =>
      (i.closest('.fr-checkbox-group')?.textContent ?? '').includes(texte)
    );
    if (!i) return false;
    i.click();
    return true;
  }, texte);
  if (!ok) throw new Error('case introuvable : ' + texte);
};

// Par carte (hôte et encarts) : lignes de chaque couche, cercles au DOM, cercles dans le cadre
const etatCartes = (page, idHote) =>
  page.evaluate((idHote) => {
    const hote = document.getElementById(idHote);
    const cartes = [hote, ...hote.querySelectorAll('dsfr-data-map')];
    return cartes.map((c) => {
      const cadre = c.querySelector('.leaflet-container')?.getBoundingClientRect();
      const chemins = [...c.querySelectorAll('.leaflet-overlay-pane path.leaflet-interactive')].filter(
        (p) => p.closest('dsfr-data-map') === c
      );
      const dedans = chemins.filter((p) => {
        const d = p.getAttribute('d') || '';
        if (!cadre || d === 'M0 0' || d === '') return false;
        const r = p.getBoundingClientRect();
        const x = r.left + r.width / 2;
        const y = r.top + r.height / 2;
        return x >= cadre.left && x <= cadre.right && y >= cadre.top && y <= cadre.bottom;
      });
      const couches = [...c.querySelectorAll('dsfr-data-map-layer')].filter((l) => l.closest('dsfr-data-map') === c);
      return {
        carte: c === hote ? 'hôte' : c.closest('dsfr-data-map-inset')?.getAttribute('territory') || c.getAttribute('name'),
        cadre: cadre ? `${Math.round(cadre.width)}x${Math.round(cadre.height)}` : null,
        centreZoom: `${c.getAttribute('center')} z${c.getAttribute('zoom')}`,
        lignesCouche: couches.map((l) => l._data?.length ?? null),
        cerclesDom: chemins.length,
        cerclesDansLeCadre: dedans.length,
      };
    });
  }, idHote);

const tests = {
  async 'BUG-031'() {
    const t = await ouvrir('/_test/m44-BUG-031.html', { bundle });
    await attendre(2500);
    const r = [{ etape: '1. chargement sans paramètre', ...(await etatFacette(t.page)) }];
    await cocher(t.page, '1,5 à 2 parcours');
    await attendre(1500);
    r.push({ etape: '2. « 1,5 à 2 parcours » cochée', ...(await etatFacette(t.page)) });
    await t.page.reload({ waitUntil: 'domcontentloaded' });
    await attendre(2500);
    r.push({ etape: '3. page rechargée sur la même URL', ...(await etatFacette(t.page)) });
    // Témoin : valeur sans virgule, même parcours
    await t.page.goto(t.page.url().split('?')[0], { waitUntil: 'domcontentloaded' });
    await attendre(2500);
    await cocher(t.page, '2 à 3 parcours');
    await attendre(1500);
    await t.page.reload({ waitUntil: 'domcontentloaded' });
    await attendre(2500);
    r.push({ etape: '4. témoin : « 2 à 3 parcours » cochée puis rechargée', ...(await etatFacette(t.page)) });
    // Forme à paramètre répété (la demande du registre) : est-elle lue ?
    await t.page.goto(t.page.url().split('?')[0] + '?intensite=' + encodeURIComponent('2 à 3 parcours') + '&intensite=' + encodeURIComponent('1,5 à 2 parcours'), { waitUntil: 'domcontentloaded' });
    await attendre(2500);
    r.push({ etape: '5. URL à paramètre répété, dont une valeur à virgule', ...(await etatFacette(t.page)) });
    console.log('version', await t.version());
    console.log(JSON.stringify(r, null, 1));
    console.log('console :', journal(t));
    await t.fermer();
  },

  async 'BUG-037'() {
    const t = await ouvrir('/_test/m44-BUG-037.html', { bundle });
    await attendre(2500);
    const explode = () => t.page.evaluate(() => [...document.querySelectorAll('#dq .groupe')].map((e) => e.textContent.trim()));
    const r = [{ etape: '1. chargement', ...(await etatFacette(t.page)), explode: await explode() }];
    await cocher(t.page, 'Patrimoine');
    await attendre(1500);
    r.push({ etape: '2. « Patrimoine » cochée', ...(await etatFacette(t.page)) });
    console.log('version', await t.version());
    console.log(JSON.stringify(r, null, 1));
    console.log('console :', journal(t));
    await t.fermer();
  },

  async 'BUG-034'() {
    const t = await ouvrir('/_test/m44-BUG-034.html', { bundle });
    await attendre(2000);
    await t.page.locator('#m').scrollIntoViewIfNeeded();
    await attendre(3000);
    // Chaque encart doit être passé à la visibilité avant d'être relevé
    for (const e of await t.page.locator('#m dsfr-data-map-inset').all()) await e.scrollIntoViewIfNeeded();
    await attendre(3000);
    const r = [{ etape: '1. sans filtre (4 points : 2 métropole, 1 Réunion, 1 Guadeloupe)', cartes: await etatCartes(t.page, 'm') }];
    await cocher(t.page, 'a');
    await attendre(3000);
    r.push({ etape: '2. filtre t=a (2 points, tous en métropole)', cartes: await etatCartes(t.page, 'm') });
    await cocher(t.page, 'a');
    await attendre(3000);
    r.push({ etape: '3. filtre retiré', cartes: await etatCartes(t.page, 'm') });
    console.log('version', await t.version());
    for (const e of r) {
      console.log(e.etape);
      console.table(e.cartes.map((c) => ({ ...c, lignesCouche: c.lignesCouche.join('+') })));
    }
    console.log('console :', journal(t));
    await t.page.locator('#m').screenshot({ path: `${process.env.REJEU_CAPTURES || '/tmp'}/m44-BUG-034-${bundle ? bundle.split('/').slice(-3, -2)[0] : 'cdn'}.png` }).catch(() => {});
    await t.fermer();
  },

  async 'AM-102'() {
    const t = await ouvrir('/_test/m44-AM-102.html', { bundle });
    await attendre(2000);
    const r = {};
    for (const id of ['m1', 'm2']) {
      await t.page.locator('#' + id).scrollIntoViewIfNeeded();
      await attendre(2500);
      for (const e of await t.page.locator(`#${id} dsfr-data-map-inset`).all()) await e.scrollIntoViewIfNeeded();
      await attendre(2500);
      r[id] = await etatCartes(t.page, id);
      // Position de chaque point de l'encart par rapport au centre du cadre, en px
      r[id + '-positions'] = await t.page.evaluate((id) => {
        return [...document.querySelectorAll(`#${id} dsfr-data-map-inset`)].map((i) => {
          const cadre = i.querySelector('.leaflet-container').getBoundingClientRect();
          const inner = i.querySelector('dsfr-data-map');
          const carte = inner._map || inner.map || Object.values(inner).find((v) => v && typeof v.latLngToContainerPoint === 'function');
          const pts = (i.querySelector('dsfr-data-map-layer')._data || []).map((d) => {
            if (!carte) return { nom: d.nom, erreur: 'carte Leaflet inaccessible' };
            const p = carte.latLngToContainerPoint([d.lat, d.lon]);
            const dedans = p.x >= 0 && p.x <= cadre.width && p.y >= 0 && p.y <= cadre.height;
            return { nom: d.nom, x: Math.round(p.x), y: Math.round(p.y), dedans };
          });
          return { encart: i.id, cadre: `${Math.round(cadre.width)}x${Math.round(cadre.height)}`, zoom: carte?.getZoom?.(), points: pts.filter((p) => p.nom !== 'Paris') };
        });
      }, id);
      await t.page.locator('#' + id).screenshot({ path: `${process.env.REJEU_CAPTURES || '/tmp'}/m44-AM-102-${id}-${bundle ? bundle.split('/').slice(-3, -2)[0] : 'cdn'}.png` }).catch(() => {});
    }
    console.log('version', await t.version());
    console.log(JSON.stringify(r, null, 1));
    console.log('console :', journal(t));
    await t.fermer();
  },

  async 'AM-107'() {
    const t = await ouvrir('/_test/m44-AM-107.html', { bundle });
    await attendre(2000);
    const rayons = async (id) => {
      await t.page.locator('#' + id).scrollIntoViewIfNeeded();
      await attendre(2500);
      return t.page.evaluate((id) => {
        // Un circleMarker Leaflet est tracé par deux arcs « a r,r 0 1,0 … » : le rayon se lit dans le d
        return [...document.querySelectorAll(`#${id} .leaflet-overlay-pane path.leaflet-interactive`)]
          .map((p) => {
            const m = /a\s*([\d.]+)[ ,]([\d.]+)/i.exec(p.getAttribute('d') || '');
            return { rayonD: m ? Number(m[1]) : null, largeurPx: Math.round(p.getBoundingClientRect().width * 100) / 100 };
          })
          .sort((a, b) => a.rayonD - b.rayonD);
      }, id);
    };
    const r = { 'm1 radius-field': await rayons('m1'), 'm2 radius-scale=sqrt': await rayons('m2') };
    for (const k of Object.keys(r)) {
      const [a, b, c] = r[k].map((x) => x.rayonD);
      r[k + ' — rapports'] = { 'r(4)/r(1)': +(b / a).toFixed(3), 'r(100)/r(1)': +(c / a).toFixed(3), 'attendu en aire': '2 et 10' };
    }
    await t.page.locator('#d2').scrollIntoViewIfNeeded();
    await attendre(1500);
    Object.assign(r, await t.page.evaluate(() => ({
      'compute sqrt(v)': document.getElementById('d').innerText.replace(/\s+/g, ' ').trim(),
      'témoin abs(v)': document.getElementById('d2').innerText.replace(/\s+/g, ' ').trim(),
    })));
    console.log('version', await t.version());
    console.log(JSON.stringify(r, null, 1));
    console.log('console :', journal(t));
    await t.fermer();
  },
};

if (!tests[test]) {
  console.error(`usage : node run-m44-carte.mjs <${Object.keys(tests).join('|')}>`);
  process.exit(1);
}
await tests[test]();
