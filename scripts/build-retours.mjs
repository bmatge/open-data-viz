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
//
// Rapport de cadrage : toute entree qui porte un bloc `cadrage` (bugs,
// ameliorations, et les pieges qui meritent une correction dans la lib).
// Ordre : priorite (P1..P4), puis effort (S, M, L), puis severite.

const POIDS_PRIORITE = { P1: 0, P2: 1, P3: 2, P4: 3 };
const POIDS_EFFORT = { S: 0, M: 1, L: 2 };
const LIBELLE_PRIORITE = {
  P1: 'P1 — immédiat : chiffres faux ou fonctions inutilisables, correction courte',
  P2: 'P2 — prochain cycle : gain net, effort mesuré',
  P3: 'P3 — backlog : confort, cas moins fréquents',
  P4: 'P4 — hors périmètre ou refus motivé',
};
const LIBELLE_EFFORT = { S: 'S (moins d\'un jour)', M: 'M (un à trois jours)', L: 'L (conception + développement)' };

const aDeposer = retours
  .filter((r) => r.cadrage)
  .sort(
    (a, b) =>
      (POIDS_PRIORITE[a.cadrage.priorite] ?? 9) - (POIDS_PRIORITE[b.cadrage.priorite] ?? 9) ||
      (POIDS_EFFORT[a.cadrage.effort] ?? 9) - (POIDS_EFFORT[b.cadrage.effort] ?? 9) ||
      (POIDS_SEVERITE[a.severite] ?? 3) - (POIDS_SEVERITE[b.severite] ?? 3)
  );

const labelType = (r) => (r.type === 'bug' ? 'bug' : r.type === 'piege' ? 'enhancement, dx' : 'enhancement');

const issue = (r) => {
  const c = r.cadrage;
  return `## ${r.id} — ${r.titre}

**Priorité** ${c.priorite} · **Effort estimé** ${LIBELLE_EFFORT[c.effort] || c.effort} · **Décision proposée** ${c.decision}
**Labels suggérés** : \`${labelType(r)}\`, \`severity:${r.severite}\`${
    r.composants?.length ? `, \`${r.composants.join('`, `')}\`` : ''
  }
**Rencontré sur** ${(r.dataviz || []).length} page(s) : ${(r.dataviz || []).join(', ') || '—'}

### Constat

${r.constat}
${r.correction ? `\n**Ce qui est vrai.** ${r.correction}\n` : ''}${r.reste_vrai ? `\n**Ce qui reste vrai.** ${r.reste_vrai}\n` : ''}
### Impact de l'erreur ou du manque

${c.impact}

### Objectif métier de la correction

${c.objectif}

### Pérennité et reproductibilité du besoin

${c.perennite}

### Comment ça a été vérifié

${r.verifie || '—'}
${r.contournement ? `\n### Contournement actuel\n\n${r.contournement}\n` : ''}
### Demande

${r.demande || r.proposition || '—'}

### Critères d'acceptation

${c.acceptation.map((a) => `- [ ] ${a}`).join('\n')}
`;
};

const parPriorite = (p) => aDeposer.filter((r) => r.cadrage.priorite === p);
const compteEffort = (liste, e) => liste.filter((r) => r.cadrage.effort === e).length;

const tableauPriorisation = ['P1', 'P2', 'P3', 'P4']
  .map(
    (p) => `### ${LIBELLE_PRIORITE[p]}

| Id | Demande | Type | Effort | Pages | Décision |
|---|---|---|---|---|---|
${parPriorite(p)
  .map((r) => `| ${r.id} | ${r.titre} | ${r.type} | ${r.cadrage.effort} | ${(r.dataviz || []).length} | ${r.cadrage.decision} |`)
  .join('\n')}

_${parPriorite(p).length} demandes — S ${compteEffort(parPriorite(p), 'S')}, M ${compteEffort(parPriorite(p), 'M')}, L ${compteEffort(parPriorite(p), 'L')}._
`
  )
  .join('\n');

const exportIssues = `# Demandes à déposer sur bmatge/dsfr-data — rapport de cadrage

> Fichier généré par \`node scripts/build-retours.mjs\` depuis \`public/data/retours.json\`.
> ${aDeposer.length} demandes cadrées — ${aDeposer.filter((r) => r.type === 'bug').length} bugs,
> ${aDeposer.filter((r) => r.type === 'amelioration').length} améliorations,
> ${aDeposer.filter((r) => r.type === 'piege').length} pièges à désamorcer dans la bibliothèque plutôt que dans la documentation.
> Chaque bloc est rédigé pour être collé tel quel dans une issue.

## Comment lire ce rapport

Chaque demande naît d'une confrontation réelle au banc d'essai
[open-data-viz](https://github.com/bmatge/open-data-viz) et porte la trace de sa vérification.
Le banc couvre désormais **deux portails Opendatasoft de l'État** :

- **data.economie.gouv.fr** — 30 entrées du catalogue de visualisations, 24 reproduites (lots 1 à 11) ;
- **data.education.gouv.fr** — 36 entrées du catalogue de data-visualisations, auditées et transposées
  sur le papier (lot 12, fiches dans \`docs/portail-education/\`), y compris les cibles hébergées sur
  \`equipements.sports.gouv.fr\`, \`dataeducation.opendatasoft.com\` et la forge des communs numériques.

Le second portail n'a pas redemandé les fonctions du premier : il a fait apparaître des **asymétries**
(une capacité présente sur un composant et absente de son voisin), des **silences** (un attribut qui
ne produit rien sans le dire) et deux écarts de terrain que Bercy ne pouvait pas montrer — l'unité de
temps du domaine est l'**année scolaire**, et une partie de ses jeux sont des **tables de mesures**
(une ligne = une entité × une date) là où Bercy publie des tables d'objets, ce qui prive de sens les
compteurs de facette. Le détail est dans \`docs/portail-education/_RESIDU.md\`.

Le cadrage ajoute ce qu'il faut pour décider :

- **Impact** — ce qui se passe pour l'utilisateur ou l'auteur de page tant que ce n'est pas fait ;
- **Objectif métier** — ce que la correction permet, formulé côté usage ;
- **Pérennité** — si le besoin est structurel (tout projet le rencontrera), récurrent, ou ponctuel ;
- **Critères d'acceptation** — des tests observables, pour clore l'issue sans discussion ;
- **Effort** — S (moins d'un jour), M (un à trois jours), L (conception + développement), estimé
  d'après le code source lu, pas d'après la description ;
- **Priorité** — impact × faisabilité : P1 corrige des chiffres faux ou des fonctions inutilisables
  à faible coût ; P2 apporte un gain net à effort mesuré ; P3 est du confort ; P4 sort du périmètre.

Les entrées de type *piège* ne sont pas des bugs : le composant fait ce qu'il annonce. Elles sont
ici parce qu'un avertissement ou un défaut plus sûr dans la bibliothèque coûterait moins que la
vigilance qu'elles exigent de chaque auteur de page.

\${retours.filter((r) => r.type === 'faux-probleme').length} critiques ont été **retirées** au fil du
banc d'essai parce qu'une vérification a montré une voie native ou une erreur de notre part (entrées
\`faux-probleme\` du registre), et \${retours.filter((r) => r.statut === 'corrige' && r.type !== 'faux-probleme').length}
autres sont marquées **corrigées** parce que la bibliothèque les a résolues depuis (leur trace reste au
registre, avec ce qui en demeure vrai). Ce rapport ne liste que ce qui a résisté à la vérification.

Un rappel de méthode issu du lot 12, qui vaut avertissement : une capacité peut être **native, publiée,
et malgré tout absente du bundle chargé** par un site — les 26 pages de ce dépôt ont épinglé
\`dsfr-data@0.20.0\` pendant que npm servait déjà 0.23.0, puis 0.24.0. Avant de conclure à un manque,
il faut donc chercher l'attribut dans le source, **puis vérifier dans quelle version publiée il
apparaît**. Trois demandes de ce rapport sont nées de ce piège, et deux constats antérieurs
(AM-017, AM-039) en sont sortis.

Le dépôt est désormais monté en \`dsfr-data@0.24.0\`, et le registre en tire les conséquences :
les jalons 0.21.1, 0.22.0, 0.23.0 et 0.24.0 ont comblé ${retours.filter((r) => r.statut === 'corrige' && r.type !== 'faux-probleme').length} des constats déposés,
passés au statut \`corrige\` et sortis de ce rapport. Ce qui reste ci-dessous n'est ni livré ni
planifié — à deux exceptions près, signalées comme telles : \`fetch-mode="export"\` (#689) et
\`require-where\` (#690), prévus au jalon v0.25.0.

## Priorisation

${tableauPriorisation}
## Les demandes

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
