// Soumet les captures de chaque dataviz au modele multimodal et depose ses constats
// dans le dossier de suivi de cette dataviz.
//
//   AUDIT_MODELE=anthropic:claude-haiku-4-5-20251001 ANTHROPIC_API_KEY=… \
//     node scripts/audit-visuel/analyse.mjs --n 5
//   AUDIT_MODELE=mistral:pixtral-large-latest MISTRAL_API_KEY=… \
//     node scripts/audit-visuel/analyse.mjs --rythme 6000
//
// Ecrit dossiers/<id>/constats/<releve>--<modele>.json et le meme en .md lisible.
// Deux modeles sur les memes images cohabitent : on peut les comparer.
//
// ⚠️ La sortie est une FILE DE CANDIDATS, jamais un verdict. Rien n'entre au
// registre (`public/data/retours.json`) sans un champ `verifie` decrivant une
// observation rejouee. Ce que le modele voit sur une image n'est pas une preuve :
// c'est une piste a aller verifier au navigateur ou a l'API.
import { readFile, writeFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { resoudre, interroger, extraireJSON } from './client.mjs';
import { SYSTEME, messageUtilisateur } from './prompt.mjs';

const ICI = dirname(fileURLToPath(import.meta.url));
const DOSSIERS = join(ICI, 'dossiers');
const args = process.argv.slice(2);
const opt = (n, d = null) => { const i = args.indexOf(n); return i === -1 ? d : args[i + 1]; };
const attendre = (ms) => new Promise((r) => setTimeout(r, ms));

const cible = resoudre();
const rythme = Number(opt('--rythme', 0));
const etiquette = `${cible.nom}-${cible.modele.replace(/[^a-z0-9.-]+/gi, '-')}`;

let ids = (await readdir(DOSSIERS, { withFileTypes: true })).filter((d) => d.isDirectory()).map((d) => d.name).sort();
if (opt('--id')) ids = ids.filter((i) => i === opt('--id'));
if (opt('--portail')) ids = ids.filter((i) => i.startsWith(opt('--portail') + '--'));
if (opt('--n')) ids = ids.slice(0, Number(opt('--n')));

console.log(`modele : ${cible.nom}:${cible.modele} (${cible.base})`);
console.log(`${ids.length} dataviz${rythme ? `, ${rythme} ms entre deux appels` : ''}\n`);

let entree = 0, sortie = 0, analysees = 0, ecartsTotal = 0, pertesTotal = 0;

for (const [i, id] of ids.entries()) {
  const d = join(DOSSIERS, id);
  const fiche = JSON.parse(await readFile(join(d, 'fiche.json'), 'utf8'));

  // Le relevé le plus recent qui porte les deux cotes.
  const releves = existsSync(join(d, 'captures'))
    ? (await readdir(join(d, 'captures'), { withFileTypes: true })).filter((e) => e.isDirectory()).map((e) => e.name).sort()
    : [];
  const releve = opt('--releve') || releves[releves.length - 1];
  const dossierCaptures = releve ? join(d, 'captures', releve) : null;
  const mesuresFichier = dossierCaptures && join(dossierCaptures, 'mesures.json');
  if (!mesuresFichier || !existsSync(mesuresFichier)) {
    console.log(`[${i + 1}/${ids.length}] SAUTE   ${id} (aucune capture)`);
    continue;
  }
  const mesures = JSON.parse(await readFile(mesuresFichier, 'utf8'));
  const o = mesures.cotes.original, r = mesures.cotes.reprise;
  if (!o?.fichier || !r?.fichier) {
    console.log(`[${i + 1}/${ids.length}] SAUTE   ${id} (capture incomplete)`);
    continue;
  }

  const debut = Date.now();
  try {
    const rep = await interroger({
      cible,
      systeme: SYSTEME,
      texte: messageUtilisateur({ ...fiche, releve }),
      images: [
        { legende: "CAPTURE 1 — L'ORIGINAL, sur le portail Opendatasoft :", fichier: join(dossierCaptures, o.fichier) },
        { legende: 'CAPTURE 2 — LA REPRISE, sur le banc DSFR / dsfr-data :', fichier: join(dossierCaptures, r.fichier) }
      ]
    });
    const j = extraireJSON(rep.texte);
    entree += rep.usage.entree || 0;
    sortie += rep.usage.sortie || 0;
    analysees++;

    const constat = {
      id, titre: fiche.titre, onglet: fiche.onglet, portail: fiche.portail,
      releve, modele: `${cible.nom}:${cible.modele}`,
      analyse_le: (() => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; })(),
      original: fiche.original, reprise: fiche.reprise,
      tronquee: { original: !!o.tronquee, reprise: !!r.tronquee },
      erreurs_console_reprise: r.erreurs_console || [],
      ...j,
      usage: rep.usage
    };
    const base = join(d, 'constats', `${releve}--${etiquette}`);
    await writeFile(`${base}.json`, `${JSON.stringify(constat, null, 2)}\n`, 'utf8');
    await writeFile(`${base}.md`, enMarkdown(constat), 'utf8');

    const ne = (j.ecarts_donnees || []).length, np = (j.pertes_lecteur || []).length;
    ecartsTotal += ne; pertesTotal += np;
    const lis = j.lisible?.original && j.lisible?.reprise ? '' : '  [capture illisible]';
    console.log(`[${i + 1}/${ids.length}] ${String(ne).padStart(2)} ecart(s) ${String(np).padStart(2)} perte(s)  ${((Date.now() - debut) / 1000).toFixed(1)}s  ${id}${lis}`);
  } catch (e) {
    console.log(`[${i + 1}/${ids.length}] ERREUR  ${id} : ${String(e.message || e).slice(0, 160)}`);
  }
  if (rythme && i < ids.length - 1) await attendre(rythme);
}

console.log(`\n${analysees}/${ids.length} dataviz analysees — relevé le plus recent de chaque dossier`);
console.log(`  ${ecartsTotal} ecart(s) de donnees, ${pertesTotal} perte(s) lecteur`);
console.log(`  tokens : ${entree} en entree, ${sortie} en sortie`);
if (analysees) console.log(`  soit ~${Math.round(entree / analysees)} + ${Math.round(sortie / analysees)} par dataviz`);
console.log('\n  Ce sont des CANDIDATS : aucun n\'entre au registre sans preuve rejouee.');

function enMarkdown(c) {
  const l = (t) => (t && t.length ? t : null);
  return `# Constats — ${c.titre}${c.onglet ? ` (${c.onglet})` : ''}

Relevé **${c.releve}**, analysé le ${c.analyse_le} par \`${c.modele}\`.
Original : <${c.original}> · Reprise : \`${c.reprise}\`

> ⚠️ **Candidats, pas verdicts.** Rien ici n'entre au registre sans avoir été rejoué.
${c.tronquee.original || c.tronquee.reprise ? `\n> Capture tronquée à 2600 px : ${[c.tronquee.original && 'original', c.tronquee.reprise && 'reprise'].filter(Boolean).join(' et ')}. Le bas de page n'a pas été vu.\n` : ''}
## Lisibilité des captures

- original : ${c.lisible?.original ? 'lisible' : '**illisible**'}
- reprise : ${c.lisible?.reprise ? 'lisible' : '**illisible**'}
${c.lisible?.commentaire ? `- ${c.lisible.commentaire}\n` : ''}
## Écarts de données

${l(c.ecarts_donnees)
  ? `| Quoi | Original | Reprise | Où |\n|---|---|---|---|\n${c.ecarts_donnees.map((e) => `| ${e.quoi} | ${e.original} | ${e.reprise} | ${e.ou || ''} |`).join('\n')}`
  : '_Aucun._'}

## Pertes pour le lecteur

${l(c.pertes_lecteur)
  ? c.pertes_lecteur.map((p) => `- **${p.quoi}**\n  ${p.pourquoi || ''}`).join('\n')
  : '_Aucune._'}

## Phrase de lecture proposée

${c.phrase_de_lecture?.proposition
  ? `> ${c.phrase_de_lecture.proposition}\n\nChiffres utilisés : ${(c.phrase_de_lecture.chiffres_utilises || []).map((x) => `\`${x}\``).join(', ') || '_non cités_'}`
  : '_Le modèle n\'a pas pu lire de chiffres exploitables._'}

${l(c.erreurs_console_reprise) ? `## Erreurs console relevées sur la reprise\n\n${c.erreurs_console_reprise.map((e) => `- \`${e}\``).join('\n')}\n` : ''}`;
}
