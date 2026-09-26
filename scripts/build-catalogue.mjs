// Construit public/data/dataviz.json : le catalogue unique de TOUTES les dataviz
// du site, lu par l'accueil, la page « Toutes les dataviz » et les pages de
// portail, qui le rendent avec dsfr-data (source url= + facets + display).
//
//   node scripts/build-catalogue.mjs
//
// A relancer apres chaque dataviz ajoutee, recreee ou retouchee. Il remplace la
// maintenance a la main des tuiles de culture.html / developpement-durable.html.
//
// Ce qui est DEDUIT, et d'ou (rien n'est saisi a la main, sauf les libelles) :
//   titre        le <h1> de la page (le titre-message), a defaut le <title>
//   resume       la <meta name="description">
//   portail      le dossier de la page (viz/ = Bercy, education/, sports/,
//                culture/, developpement-durable/, demo/)
//   nature       demo/ -> demonstration ; culture/ et developpement-durable/ ->
//                creee ; */non-reproduites -> analyse ; une page dont l'historique
//                git porte un commit « ... en récit » -> recreee ; sinon reproduite
//   methode      vrai si l'historique git de la page (--follow) porte un commit
//                de la methode dataviz-metier : les lots « recréer ... en récit »,
//                les vagues de creation des portails Culture / DD, et les commits
//                du pilote « relecture (dataviz-)métier ». Le commit qui l'etablit
//                est ecrit dans `methode_preuve` : la mention est verifiable.
//   origine      les registres de reproduction : registre.json (Bercy, champ
//                `lien`), registre-education.json joint au catalogue vivant du
//                portail Education (jeu `dataviz-a-la-une`, champ `lien`, lu sans
//                cle), registre-sports.json (`repro_origine`). Plusieurs entrees
//                d'origine peuvent mener a la meme page : la premiere hebergee
//                sur le portail lui-meme devient `origine_url`, les autres restent
//                dans `origines`.
//   sources      les balises <dsfr-data-source> : api-type, base-url, url=
//   composants   les balises <dsfr-data-*> de la page, commentaires retires
//   capacites    derivees des composants et de leurs attributs (table CAPACITES)
//   modifie_le   date du dernier commit de la page
//
// SORTIE : un OBJET, lu par `transform` (chemin JSONPath) :
//   dataviz    [{ ... }]  une ligne par page de dataviz
//   capacites  [{ capacite, description, n, exemple_url, exemple_titre }]
//
// Garde-fou : le gabarit de carte est recopie dans chaque page qui affiche le
// catalogue (pas d'inclusion possible sans script applicatif). Le script compare
// tous les <template> precedes du commentaire `gabarit:carte-dataviz` et echoue
// s'ils divergent — une carte differente d'une page a l'autre est precisement
// ce que ce catalogue doit empecher.

import { readFile, writeFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative } from 'node:path';

const RACINE = join(dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC = join(RACINE, 'public');
const SORTIE = join(PUBLIC, 'data', 'dataviz.json');

const PORTAILS = {
  viz: { cle: 'bercy', libelle: 'Économie (Bercy)', page: '/bercy', ordre: 1 },
  education: { cle: 'education', libelle: 'Éducation', page: '/education', ordre: 2 },
  sports: { cle: 'sports', libelle: 'Sports', page: '/sports', ordre: 3 },
  culture: { cle: 'culture', libelle: 'Culture', page: '/culture', ordre: 4 },
  'developpement-durable': { cle: 'developpement-durable', libelle: 'Développement durable', page: '/developpement-durable', ordre: 5 },
  demo: { cle: 'demo', libelle: 'Croisements multi-portails', page: '/demo', ordre: 6 },
};

const NATURES = {
  demonstration: { libelle: 'Démonstration', badge: 'fr-badge--purple-glycine', ordre: 1 },
  creee: { libelle: 'Créée', badge: 'fr-badge--green-emeraude', ordre: 2 },
  recreee: { libelle: 'Recréée en récit', badge: 'fr-badge--green-archipel', ordre: 3 },
  reproduite: { libelle: 'Reproduite', badge: 'fr-badge--blue-cumulus', ordre: 4 },
  analyse: { libelle: 'Analyse (non reproductible)', badge: 'fr-badge--beige-gris-galet', ordre: 5 },
};

// Pages sans entree propre dans un registre, mais variante d'une page qui en a
// une : elles heritent de ses origines. Le tableau de bord Rappel Conso est la
// seconde lecture de l'entree `/pages/rappelconso/` du catalogue Bercy (note de
// l'entree dans build-registre.mjs), recreee a part le 2026-09-26.
const VARIANTES = { '/viz/rappel-conso-tableau-de-bord': '/viz/rappelconso' };

// Commits de la methode dataviz-metier (sujet de commit, hors fusions).
const METHODE = [
  /en récit/i,
  /^feat\(portails\): vague \d/i,
  /relecture (dataviz-)?m[ée]tier/i,
];

// Capacites : un libelle lisible, ce qui la declenche, et une phrase pour
// l'accueil. L'ordre est celui d'affichage.
const CAPACITES = [
  { capacite: 'Graphique', test: (p) => p.charts.some((t) => !/^map/.test(t)),
    description: 'Barres, lignes, secteurs, empilements et séries multiples : DSFR Chart piloté par des attributs.' },
  { capacite: 'Carte choroplèthe', test: (p) => p.charts.some((t) => /^map/.test(t)),
    description: 'Départements, régions, académies ou pays coloriés par une valeur, outre-mer compris.' },
  { capacite: 'Carte interactive', test: (p) => p.tags.has('dsfr-data-map'),
    description: 'Points, cercles et contours sur fond de carte, avec infobulles et légende.' },
  { capacite: 'Chiffres clés', test: (p) => p.tags.has('dsfr-data-kpi'),
    description: 'Des indicateurs calculés sur la donnée, qui suivent les filtres.' },
  { capacite: 'Phrase calculée', test: (p) => p.tags.has('dsfr-data-repeat') || p.tags.has('dsfr-data-context-value'),
    description: 'Le chiffre écrit dans la phrase, recalculé à chaque chargement : le récit ne se périme pas.' },
  { capacite: 'Tableau', test: (p) => p.tags.has('dsfr-data-list'),
    description: 'Tableaux triables, paginés et exportables, y compris sur des dizaines de milliers de lignes.' },
  { capacite: 'Recherche', test: (p) => p.tags.has('dsfr-data-search'),
    description: 'Recherche plein texte, locale ou déléguée à l’API du portail.' },
  { capacite: 'Facettes', test: (p) => p.tags.has('dsfr-data-facets'),
    description: 'Filtres à cases, listes ou menus, comptés sur la donnée.' },
  { capacite: 'Filtres partagés', test: (p) => p.tags.has('dsfr-data-context'),
    description: 'Un filtre posé une fois, diffusé à tous les blocs de la page et gardé dans l’URL.' },
  { capacite: 'Jointure', test: (p) => p.tags.has('dsfr-data-join'),
    description: 'Deux jeux appariés dans le navigateur, sans base intermédiaire.' },
  { capacite: 'Agrégation', test: (p) => p.agrege,
    description: 'Regroupements, sommes, moyennes et parts, au serveur quand l’API le permet.' },
  { capacite: 'Pivot', test: (p) => p.tags.has('dsfr-data-pivot') || p.tags.has('dsfr-data-unpivot'),
    description: 'Passer d’une colonne par année à une ligne par année, et inversement.' },
  { capacite: 'Union de jeux', test: (p) => p.tags.has('dsfr-data-concat'),
    description: 'Plusieurs jeux de même forme mis bout à bout.' },
  { capacite: 'Croisement de sources', test: (p) => p.hotes.size > 1,
    description: 'Des données de plusieurs portails ou API réunies dans une même page.' },
];

// ── Utilitaires ────────────────────────────────────────────────────────────

const ENTITES = { nbsp: ' ', amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", rsquo: '’', lsquo: '‘',
  laquo: '«', raquo: '»', hellip: '…', ndash: '–', mdash: '—', eacute: 'é', egrave: 'è', agrave: 'à', thinsp: ' ' };

function texte(html) {
  return html
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&([a-z]+);/gi, (m, n) => ENTITES[n.toLowerCase()] ?? m)
    .replace(/[ \t\r\n]+/g, ' ')
    .trim();
}

function attrs(balise) {
  const sortie = {};
  for (const m of balise.matchAll(/([a-z][a-z0-9-]*)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'))?/gi)) {
    sortie[m[1].toLowerCase()] = m[2] ?? m[3] ?? '';
  }
  return sortie;
}

function git(...args) {
  try {
    return execFileSync('git', args, { cwd: RACINE, encoding: 'utf8' }).trim();
  } catch {
    return '';
  }
}

const sansRequete = (u) => u.replace(/[?#].*$/, '').replace(/\/$/, '');

// ── Sources de donnees d'une page ──────────────────────────────────────────

function typeDeSource(a) {
  const url = a.url || '';
  const base = a['base-url'] || '';
  const type = (a['api-type'] || '').toLowerCase();
  if (type === 'opendatasoft') return 'Opendatasoft';
  if (type === 'tabular' || /tabular-api\.data\.gouv\.fr/.test(url + base)) return 'API Tabular (data.gouv.fr)';
  if (type === 'insee') return 'INSEE Melodi';
  if (type === 'grist') return 'Grist';
  if (/\/dido\/api\//.test(url)) return 'DiDo (SDES)';
  if (/geo\.api\.gouv\.fr/.test(url)) return 'API Géo';
  if (/\/api\/explore\/v2/.test(url)) return 'Opendatasoft';
  if (url.startsWith('/')) return 'Fichier du dépôt';
  if (url) return 'Autre API';
  return null; // `data='…'` embarque : metadonnees, pas une source
}

function hoteDeSource(a) {
  const brut = a['base-url'] || a.url || '';
  const m = brut.match(/^https?:\/\/([^/]+)/);
  if (m) return m[1];
  if ((a['api-type'] || '').toLowerCase() === 'insee') return 'api.insee.fr';
  if (brut.startsWith('/')) return 'ce dépôt';
  return null;
}

// ── Origines, depuis les registres ─────────────────────────────────────────

async function lireJson(chemin) {
  return JSON.parse(await readFile(join(PUBLIC, 'data', chemin), 'utf8'));
}

async function catalogueEducation() {
  const url = 'https://data.education.gouv.fr/api/explore/v2.1/catalog/datasets/dataviz-a-la-une/records'
    + '?limit=100&select=titre,lien';
  try {
    const r = await fetch(url, { signal: AbortSignal.timeout(20000) });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const { results } = await r.json();
    return new Map(results.map((e) => [e.titre, e.lien]));
  } catch (e) {
    console.warn(`⚠ catalogue Éducation injoignable (${e.message}) : origines reprises du dataviz.json précédent.`);
    return null;
  }
}

function hote(u) {
  const m = u.match(/^https?:\/\/([^/]+)/);
  return m ? m[1] : '';
}

async function origines(precedent) {
  const parPage = new Map(); // chemin local -> [{url, libelle, hote}]
  const ajouter = (page, url, libelle, portailHote, statut) => {
    if (!page || !url || !page.startsWith('/')) return;
    const cle = sansRequete(page);
    const liste = parPage.get(cle) ?? [];
    if (liste.some((o) => o.url === url)) return;
    liste.push({ url, libelle, hote: hote(url), surPortail: hote(url) === portailHote, statut });
    parPage.set(cle, liste);
  };

  for (const e of await lireJson('registre.json')) {
    const url = e.lien.startsWith('/') ? `https://data.economie.gouv.fr${e.lien}` : e.lien;
    ajouter(e.repro_url, url, e.titre, 'data.economie.gouv.fr', e.repro_statut);
  }

  const liensEdu = await catalogueEducation();
  for (const e of await lireJson('registre-education.json')) {
    let lien = liensEdu?.get(e.titre);
    if (!liensEdu) {
      // Repli hors ligne : l'origine deja connue pour cette page, si elle existe.
      const ancien = precedent.get(sansRequete(e.repro_url));
      lien = ancien?.origines?.find((o) => o.libelle === e.titre)?.url;
    }
    if (lien) ajouter(e.repro_url, lien.startsWith('/') ? `https://data.education.gouv.fr${lien}` : lien, e.titre, 'data.education.gouv.fr', e.repro_statut);
  }

  for (const e of await lireJson('registre-sports.json')) {
    // Une entree par onglet : l'origine est la page du portrait, pas l'onglet.
    ajouter(e.repro_url, e.repro_origine, e.page || e.titre, 'data.sports.gouv.fr', e.repro_statut);
  }

  // Tri : l'entree hebergee sur le portail lui-meme d'abord, puis l'ordre des registres.
  for (const liste of parPage.values()) liste.sort((a, b) => Number(b.surPortail) - Number(a.surPortail));
  for (const [variante, modele] of Object.entries(VARIANTES)) {
    if (!parPage.has(variante) && parPage.has(modele)) parPage.set(variante, parPage.get(modele));
  }
  return parPage;
}

// ── Analyse d'une page ─────────────────────────────────────────────────────

function analyserPage(html) {
  const sansCommentaires = html.replace(/<!--[\s\S]*?-->/g, '');
  const tags = new Set([...sansCommentaires.matchAll(/<(dsfr-data-[a-z0-9-]+)/g)].map((m) => m[1]));
  const sources = [...sansCommentaires.matchAll(/<dsfr-data-source\b([^>]*)>/g)].map((m) => attrs(m[1]));
  const charts = [...sansCommentaires.matchAll(/<dsfr-data-chart\b([^>]*)>/g)].map((m) => attrs(m[1]).type || 'bar');
  const queries = [...sansCommentaires.matchAll(/<dsfr-data-query\b([^>]*)>/g)].map((m) => attrs(m[1]));
  const agrege = queries.some((q) => q['group-by'] || q.aggregate) || sources.some((s) => s['group-by'] || s.aggregate);

  const typesSources = [...new Set(sources.map(typeDeSource).filter(Boolean))];
  const hotes = new Set(sources.map(hoteDeSource).filter((h) => h && h !== 'ce dépôt'));

  const h1 = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i);
  const title = html.match(/<title>([\s\S]*?)<\/title>/i);
  const desc = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
  let titre = h1 ? texte(h1[1]) : '';
  // Un <h1> complete au chargement (« Portrait de territoire — » + nom) : le <title> dit mieux.
  if (!titre || /[—–:]\s*$/.test(titre)) titre = title ? texte(title[1]).replace(/\s+—\s+open-data-viz$/, '') : titre;

  const page = { tags, charts, agrege, hotes };
  return {
    titre,
    resume: desc ? texte(desc[1]) : '',
    sources: typesSources,
    hotes: [...hotes].sort(),
    composants: [...tags].sort(),
    capacites: CAPACITES.filter((c) => c.test(page)).map((c) => c.capacite),
  };
}

function historique(chemin) {
  const brut = git('log', '--follow', '--no-merges', '--format=%h%x09%cs%x09%s', '--', chemin);
  return brut ? brut.split('\n').map((l) => { const [h, d, ...s] = l.split('\t'); return { h, d, s: s.join('\t') }; }) : [];
}

// ── Garde-fou du gabarit de carte ─────────────────────────────────────────

async function verifierGabarits(fichiers) {
  const gabarits = [];
  for (const f of fichiers) {
    const html = await readFile(f, 'utf8');
    for (const m of html.matchAll(/<!--\s*gabarit:carte-dataviz\s*-->[\s\S]*?<template>([\s\S]*?)<\/template>/g)) {
      gabarits.push({ f: relative(RACINE, f), t: m[1].replace(/\s+/g, ' ').trim() });
    }
  }
  const differents = gabarits.filter((g) => g.t !== gabarits[0]?.t);
  if (differents.length) {
    console.error(`✖ gabarit de carte divergent (référence : ${gabarits[0].f}) :`);
    differents.forEach((g) => console.error(`   ${g.f}`));
    process.exitCode = 1;
  }
  return gabarits.length;
}

// ── Principal ──────────────────────────────────────────────────────────────

const precedent = new Map();
if (existsSync(SORTIE)) {
  try {
    for (const d of JSON.parse(await readFile(SORTIE, 'utf8')).dataviz) precedent.set(d.url, d);
  } catch { /* premier passage */ }
}

const parPage = await origines(precedent);

// Une page d'origine peut avoir ete retiree du portail (plusieurs l'ont ete,
// cf. les notes « Page 404 » de build-registre.mjs). Le lien est GARDE — c'est
// la reference de la reproduction — mais la carte le dit. Relevé a chaque build ;
// hors ligne, l'etat precedent est repris.
const etats = new Map();
const aVerifier = [...new Set([...parPage.values()].flat().map((o) => o.url))];
await Promise.all(aVerifier.map(async (u) => {
  try {
    const r = await fetch(u, { redirect: 'follow', signal: AbortSignal.timeout(30000) });
    etats.set(u, r.status === 404 || r.status === 410 ? `— page retirée du portail (HTTP ${r.status} au ${new Date().toISOString().slice(0, 10)})` : null);
  } catch {
    const ancien = [...precedent.values()].find((d) => d.origine_url === u);
    etats.set(u, ancien?.origine_etat ?? null);
  }
}));
const lignes = [];

for (const [dossier, portail] of Object.entries(PORTAILS)) {
  const rep = join(PUBLIC, dossier);
  const fichiers = (await readdir(rep)).filter((f) => f.endsWith('.html') && !(dossier === 'demo' && f === 'index.html')).sort();
  for (const f of fichiers) {
    const chemin = join(rep, f);
    const url = `/${dossier}/${f.replace(/\.html$/, '')}`;
    const page = analyserPage(await readFile(chemin, 'utf8'));
    const hist = historique(relative(RACINE, chemin));
    const preuve = [...hist].reverse().find((c) => METHODE.some((re) => re.test(c.s)));

    const entrees = parPage.get(url) ?? [];

    let nature;
    if (dossier === 'demo') nature = 'demonstration';
    else if (dossier === 'culture' || dossier === 'developpement-durable') nature = 'creee';
    // Toutes ses entrees de registre classees « analyse » : la page analyse une
    // dataviz qu'on ne peut pas refaire (jeu vide, galerie de liens...), meme
    // quand elle a ete reecrite en recit.
    else if (f === 'non-reproduites.html' || (entrees.length && entrees.every((o) => o.statut === 'analyse'))) nature = 'analyse';
    else if (hist.some((c) => /en récit/i.test(c.s))) nature = 'recreee';
    else nature = 'reproduite';

    const orig = entrees.map(({ url: u, libelle, hote: h }) => ({ url: u, libelle, hote: h }));
    const autres = orig.length - 1;

    lignes.push({
      url,
      titre: page.titre,
      resume: page.resume,
      portail: portail.cle,
      portail_libelle: portail.libelle,
      portail_page: portail.page,
      nature,
      nature_libelle: NATURES[nature].libelle,
      nature_badge: NATURES[nature].badge,
      methode_metier: Boolean(preuve),
      methode_libelle: preuve ? 'Méthode dataviz-metier' : 'Sans la méthode dataviz-metier',
      methode_preuve: preuve ? `${preuve.h} — ${preuve.s}` : null,
      origine_url: orig[0]?.url ?? null,
      origine_libelle: orig[0] ? `${orig[0].libelle} (${orig[0].hote})` : null,
      origine_etat: orig[0] ? etats.get(orig[0].url) ?? null : null,
      origine_autres: autres > 0 ? `et ${autres} autre${autres > 1 ? 's' : ''} entrée${autres > 1 ? 's' : ''} du catalogue d’origine` : null,
      origines: orig,
      sources: page.sources,
      sources_texte: page.sources.join(' · ') || '—',
      hotes: page.hotes,
      hotes_texte: page.hotes.join(', ') || 'ce dépôt',
      composants: page.composants,
      composants_n: page.composants.length,
      composants_texte: page.composants.join(' '),
      capacites: page.capacites,
      modifie_le: hist[0]?.d ?? null,
      _ordre: `${NATURES[nature].ordre}-${portail.ordre}`,
    });
  }
}

lignes.sort((a, b) => a._ordre.localeCompare(b._ordre) || (b.modifie_le ?? '').localeCompare(a.modifie_le ?? '') || a.titre.localeCompare(b.titre, 'fr'));
for (const l of lignes) delete l._ordre;

// Une capacite illustree par une dataviz du catalogue : la premiere dans l'ordre
// ci-dessus (demonstrations, puis creations, puis recreations) qui la porte.
// Exemples tous differents quand c'est possible : les capacites les plus rares
// choisissent d'abord, parmi les porteurs dans l'ordre du catalogue.
const dejaPris = new Set();
const exemples = new Map();
for (const { capacite } of [...CAPACITES].sort((a, b) =>
  lignes.filter((l) => l.capacites.includes(a.capacite)).length - lignes.filter((l) => l.capacites.includes(b.capacite)).length)) {
  const porteurs = lignes.filter((l) => l.capacites.includes(capacite));
  // Varier aussi les portails : le porteur libre dont le portail a deja fourni
  // le moins d'exemples, a egalite le premier dans l'ordre du catalogue.
  const parPortail = (p) => [...exemples.values()].filter((e) => e.portail === p).length;
  const libres = porteurs.filter((l) => !dejaPris.has(l.url));
  const exemple = libres.reduce((m, l) => (!m || parPortail(l.portail) < parPortail(m.portail) ? l : m), null) ?? porteurs[0];
  if (exemple) { dejaPris.add(exemple.url); exemples.set(capacite, exemple); }
}
const capacites = CAPACITES.map(({ capacite, description }) => ({
  capacite,
  description,
  n: lignes.filter((l) => l.capacites.includes(capacite)).length,
  exemple_url: exemples.get(capacite)?.url ?? null,
  exemple_titre: exemples.get(capacite)?.titre ?? null,
})).filter((c) => c.n > 0);

await writeFile(SORTIE, JSON.stringify({ dataviz: lignes, capacites }, null, 2) + '\n');

// ── Compte rendu ───────────────────────────────────────────────────────────
const compte = (cle) => lignes.reduce((acc, l) => ({ ...acc, [l[cle]]: (acc[l[cle]] ?? 0) + 1 }), {});
const pagesCatalogue = [join(PUBLIC, 'index.html'), join(PUBLIC, 'dataviz.html'), join(PUBLIC, 'demo', 'index.html'),
  ...['bercy', 'education', 'sports', 'culture', 'developpement-durable'].map((p) => join(PUBLIC, `${p}.html`))].filter(existsSync);
const nGabarits = await verifierGabarits(pagesCatalogue);

console.log(`${relative(RACINE, SORTIE)} : ${lignes.length} dataviz`);
console.log('  par portail :', compte('portail'));
console.log('  par nature  :', compte('nature'));
console.log(`  méthode dataviz-metier : ${lignes.filter((l) => l.methode_metier).length}`);
console.log(`  origines retirées du portail : ${lignes.filter((l) => l.origine_etat).map((l) => l.url).join(', ') || 'aucune'}`);
console.log(`  avec lien d'origine : ${lignes.filter((l) => l.origine_url).length} pages, ${lignes.reduce((n, l) => n + l.origines.length, 0)} entrées d'origine`);
console.log('  sans résumé :', lignes.filter((l) => !l.resume).map((l) => l.url).join(', ') || 'aucune');
console.log(`  gabarits de carte comparés : ${nGabarits}`);
