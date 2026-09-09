// Registre des retours du banc d'essai — generateur.
//
// Source de verite : public/data/retours.json (versionne avec les pages qui ont
// produit les constats). Ce script en derive deux sorties :
//
//   1. export/issues-dsfr-data.md   demandes pretes a deposer sur bmatge/dsfr-data
//   2. <vault>/30-Knowledge/chartsbuilder-retours-banc-essai.md   note lisible
//
//   node scripts/build-retours.mjs [--vault=/chemin/vers/Obsidian]
//
// Le vault par defaut est ~/Documents/Obsidian ; s'il est absent, la note est
// simplement passee (le script reste utilisable sur une autre machine).

import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { homedir } from 'node:os';

const RACINE = dirname(dirname(fileURLToPath(import.meta.url)));

const argVault = process.argv.find((a) => a.startsWith('--vault='));
const VAULT =
  (argVault && argVault.slice('--vault='.length)) ||
  process.env.OBSIDIAN_VAULT ||
  join(homedir(), 'Documents', 'Obsidian');

/** Ordre de lecture voulu : d'abord ce qui corrige nos propres erreurs. */
const TYPES = [
  {
    cle: 'faux-probleme',
    titre: 'Faux problèmes — corrigés après vérification',
    resume:
      "Constats que j'avais classés en limite, et qui n'en sont pas : ils venaient d'une reproduction " +
      "à l'identique du modèle Opendatasoft, alors que ChartsBuilder offre une autre voie. Ce sont " +
      'les entrées les plus importantes du registre : chacune retire une critique infondée.',
  },
  {
    cle: 'bug',
    titre: 'Bugs — comportement incorrect',
    resume: 'Ce qui ne fait pas ce qui est annoncé. Prioritaire : ces défauts produisent des chiffres faux.',
  },
  {
    cle: 'amelioration',
    titre: 'Améliorations demandables à ChartsBuilder',
    resume: "Manques comblables : chaque entrée est rédigée pour devenir une issue telle quelle.",
  },
  {
    cle: 'limite-dure',
    titre: 'Limites non dépassables',
    resume:
      "Contraintes qui ne dépendent pas de la bibliothèque — API du portail, qualité des données. " +
      "Ce qui se contourne n'est jamais la limite elle-même, mais le besoin d'y être confronté.",
  },
  {
    cle: 'avantage',
    titre: 'Ce que ChartsBuilder fait mieux',
    resume: "Points où la reproduction dépasse l'original. À porter au crédit de la bibliothèque.",
  },
  {
    cle: 'piege',
    titre: 'Pièges — ça marche, mais on se trompe facilement',
    resume: "Rien à corriger dans le code : de la documentation, ou de la vigilance.",
  },
];

const PICTOS = {
  'faux-probleme': '🔄',
  bug: '🐛',
  amelioration: '💡',
  'limite-dure': '🧱',
  avantage: '✅',
  piege: '🪤',
};

const POIDS_SEVERITE = { haute: 0, moyenne: 1, basse: 2 };

const retours = JSON.parse(await readFile(join(RACINE, 'public', 'data', 'retours.json'), 'utf8'));

const parType = (cle) =>
  retours
    .filter((r) => r.type === cle)
    .sort((a, b) => (POIDS_SEVERITE[a.severite] ?? 3) - (POIDS_SEVERITE[b.severite] ?? 3));

const bloc = (r) => {
  const lignes = [`### ${r.id} — ${r.titre}`, ''];
  const meta = [
    r.severite && `**Sévérité** ${r.severite}`,
    r.composants?.length && `**Composants** \`${r.composants.join('`, `')}\``,
    r.dataviz?.length && `**Rencontré sur** ${r.dataviz.join(', ')}`,
    r.statut && `**Statut** ${r.statut}`,
  ].filter(Boolean);
  lignes.push(meta.join(' · '), '');
  lignes.push(r.constat, '');
  if (r.correction) lignes.push(`**Ce qui est vrai.** ${r.correction}`, '');
  if (r.reste_vrai) lignes.push(`**Ce qui reste vrai.** ${r.reste_vrai}`, '');
  if (r.verifie) lignes.push(`**Vérifié.** ${r.verifie}`, '');
  if (r.contournement) lignes.push(`**Contournement.** ${r.contournement}`, '');
  if (r.demande) lignes.push(`**Demande.** ${r.demande}`, '');
  return lignes.join('\n');
};

// ---------------------------------------------------------------- note vault

const compte = (cle) => parType(cle).length;
const aujourdhui = retours.reduce((max, r) => (r.date > max ? r.date : max), '');
const dataviz = [...new Set(retours.flatMap((r) => r.dataviz || []))].sort();

const note = `---
type: reference
created: 2026-09-09
updated: ${aujourdhui}
tags: [dataviz, dsfr, chartsbuilder, opendatasoft, banc-essai, retours]
projects: [open-data-viz, dsfr-data]
---

# ChartsBuilder — registre des retours du banc d'essai

> ⚠️ **Note générée.** Ne pas éditer ici : la source est \`public/data/retours.json\` dans
> [[open-data-viz]]. Après modification, relancer \`node scripts/build-retours.mjs\`.

Registre tenu au fil de la reproduction du catalogue de visualisations de data.economie.gouv.fr
avec [[dsfr-data]]. Chaque entrée naît d'une reproduction réelle, et porte la preuve de sa
vérification. Voir la fiche [[open-data-viz]] pour l'avancement.

## Où en est le registre

| | Catégorie | Entrées |
|---|---|---|
| ${PICTOS['faux-probleme']} | Faux problèmes (critiques retirées après vérification) | ${compte('faux-probleme')} |
| ${PICTOS.bug} | Bugs | ${compte('bug')} |
| ${PICTOS.amelioration} | Améliorations demandables | ${compte('amelioration')} |
| ${PICTOS['limite-dure']} | Limites non dépassables | ${compte('limite-dure')} |
| ${PICTOS.avantage} | Ce que ChartsBuilder fait mieux | ${compte('avantage')} |
| ${PICTOS.piege} | Pièges | ${compte('piege')} |
| | **Total** | **${retours.length}** |

Dataviz couvertes à ce jour : ${dataviz.join(', ')}.

## Règle de tenue

Une entrée n'est pas une impression : elle porte un champ **Vérifié** décrivant l'observation
qui l'établit (requête, message de console, capture, comparaison de chiffres). Un constat non
vérifié n'entre pas au registre.

Et surtout : avant de classer quelque chose en limite, se demander si l'obstacle ne vient pas
d'avoir voulu **reproduire à l'identique** ce que fait Opendatasoft. ChartsBuilder propose
souvent une autre architecture pour le même besoin. C'est ce que consigne la catégorie
« faux problème » — et elle s'est déjà remplie deux fois.

${TYPES.map(
  (t) => `## ${PICTOS[t.cle]} ${t.titre}

${t.resume}

${parType(t.cle).map(bloc).join('\n\n')}`
).join('\n\n')}

## Export

Les entrées de type *bug* et *amélioration* sont exportées prêtes à déposer sur
[bmatge/dsfr-data](https://github.com/bmatge/dsfr-data/issues) :
\`open-data-viz/export/issues-dsfr-data.md\`.
`;

// ------------------------------------------------------------ export issues

const aDeposer = [...parType('bug'), ...parType('amelioration')];

const issue = (r) => `## ${r.id} — ${r.titre}

**Labels suggérés** : \`${r.type === 'bug' ? 'bug' : 'enhancement'}\`, \`severity:${r.severite}\`${
  r.composants?.length ? `, \`${r.composants.join('`, `')}\`` : ''
}

### Contexte

Constat issu du banc d'essai [open-data-viz](https://github.com/bmatge/open-data-viz) —
reproduction du catalogue de visualisations de data.economie.gouv.fr.
Rencontré sur : ${(r.dataviz || []).join(', ') || '—'}.

### Constat

${r.constat}

### Observation

${r.verifie || '—'}
${r.contournement ? `\n### Contournement actuel\n\n${r.contournement}\n` : ''}
### Demande

${r.demande || '—'}
`;

const exportIssues = `# Demandes à déposer sur bmatge/dsfr-data

> Fichier généré par \`node scripts/build-retours.mjs\` depuis \`public/data/retours.json\`.
> ${aDeposer.length} demandes — ${parType('bug').length} bugs, ${parType('amelioration').length} améliorations.
> Chaque bloc est rédigé pour être collé tel quel dans une issue.

${aDeposer.map(issue).join('\n---\n\n')}`;

// ------------------------------------------------------------------ ecriture

await mkdir(join(RACINE, 'export'), { recursive: true });
const cibleIssues = join(RACINE, 'export', 'issues-dsfr-data.md');
await writeFile(cibleIssues, exportIssues, 'utf8');
console.log(`${aDeposer.length} demandes écrites dans ${cibleIssues}`);

try {
  await access(join(VAULT, '30-Knowledge'));
  const cibleNote = join(VAULT, '30-Knowledge', 'chartsbuilder-retours-banc-essai.md');
  await writeFile(cibleNote, note, 'utf8');
  console.log(`${retours.length} entrées écrites dans ${cibleNote}`);
} catch {
  console.log(`vault absent (${VAULT}) — note non générée`);
}

console.log(
  TYPES.map((t) => `  ${PICTOS[t.cle]} ${t.cle.padEnd(15)} ${compte(t.cle)}`).join('\n')
);
