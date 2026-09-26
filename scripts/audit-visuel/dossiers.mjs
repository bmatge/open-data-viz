// Cree (sans jamais ecraser) un dossier de suivi par dataviz.
//
//   node scripts/audit-visuel/dossiers.mjs
//
// Un dossier = tout ce qui documente la transformation d'UNE dataviz :
//
//   dossiers/<id>/
//     fiche.json            identite, regenere a chaque passe (seul fichier ecrasable)
//     corpus.md             le contexte : jeux mobilises, millesime, definitions, source
//     analyse-metier.md     la lecture dataviz-metier : question posee, forme, honnetete
//     technique.md          problemes rencontres et solutions, avec renvois au registre
//     suivi.md              le journal : ce qui a change, quand, et pourquoi
//     captures/<releve>/    original.png + reprise.png + mesures.json
//     constats/             sorties brutes du modele, par releve et par modele
//
// Les cinq .md sont amorces une fois avec un squelette, puis appartiennent a
// l'humain (ou a une session) : ce script ne les touche plus jamais. Seul
// `fiche.json` est regenere, parce qu'il ne contient que du derive.
import { mkdir, writeFile, readFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ICI = dirname(fileURLToPath(import.meta.url));
const RACINE = dirname(dirname(ICI));
const DOSSIERS = join(ICI, 'dossiers');
const paires = JSON.parse(await readFile(join(ICI, 'paires.json'), 'utf8'));

// Les jeux de donnees mobilises se lisent dans la page elle-meme : c'est la
// premiere chose qu'on veut dans le corpus, et elle est deja ecrite quelque part.
async function jeuxDe(reproUrl) {
  const chemin = join(RACINE, 'public', reproUrl.replace(/^https?:\/\/[^/]+/, '').replace(/^\//, '') + '.html');
  if (!existsSync(chemin)) return { chemin: null, jeux: [], urls: [] };
  const html = await readFile(chemin, 'utf8');
  // L'attribut s'ecrit `dataset-id`, et la balise <dsfr-data-source> est souvent
  // sur plusieurs lignes : chercher l'attribut, pas la balise.
  const jeux = [...html.matchAll(/\bdataset-id=["']([^"']+)["']/g)].map((m) => m[1]);
  // Une source generique (`url=`) n'a pas de dataset-id : on releve l'URL, sinon
  // le corpus laisse croire que la page ne lit aucune donnee.
  const urls = [...html.matchAll(/<dsfr-data-source\b[^>]*?\burl=["']([^"']+)["']/gs)].map((m) => m[1]);
  return {
    chemin: chemin.replace(RACINE + '/', ''),
    jeux: [...new Set(jeux)].sort(),
    urls: [...new Set(urls)].sort()
  };
}

const SQUELETTES = {
  'corpus.md': (p, j) => `# Corpus — ${p.titre}

> Le contexte de la dataviz : de quoi elle parle, d'ou viennent les chiffres,
> ce qu'il faut savoir pour ne pas les lire de travers.
> **Ce fichier n'est jamais ecrase par un script.**

## Source

- Original : <${p.original}>
- Reprise : \`${p.reprise}\`
- Page du banc : ${j.chemin ? `\`${j.chemin}\`` : '_non localisee_'}
${p.onglet ? `- Onglet d'origine : ${p.onglet}\n` : ''}
## Jeux de donnees mobilises

${j.jeux.length ? j.jeux.map((d) => `- \`${d}\``).join('\n') : '_Aucun `dataset-id` dans la page._'}
${j.urls.length ? `\nURL declarees sur une \`<dsfr-data-source>\` (base de portail, ou source generique) :\n${j.urls.map((u) => `- \`${u}\``).join('\n')}\n` : ''}

## Millesime et perimetre

_Sur quelle annee portent les chiffres ? Quel territoire ? Quelle population exclue ?_

## Definitions a connaitre

_Les termes que le lecteur doit comprendre pour ne pas se tromper de lecture._

## Ce que la note du registre en dit

${p.note ? `> ${p.note}` : '_Aucune note._'}
`,

  'analyse-metier.md': (p) => `# Analyse metier — ${p.titre}

> La lecture \`dataviz-metier\` : le sens avant la syntaxe.
> **Ce fichier n'est jamais ecrase par un script.** Les sorties du modele
> multimodal arrivent dans \`constats/\` ; ce qui est retenu se reecrit ici, a la main.

## La question posee, et pour quel lecteur

_Une phrase. Si on ne sait pas la dire, la dataviz ne sait pas ce qu'elle montre._

## La forme retenue, et pourquoi elle sert cette question

## Honnetete de l'echelle

_Axe a zero ? Moyenne de taux ponderee ? Resume de carte ponderee ?_

## Phrase de lecture

_Ce qu'un datajournaliste ecrirait sous le graphique, avec chiffres et millesime._

## Ce qu'on ne montre pas, et qu'il faut dire

_Groupe null, troncature, echantillon, millesime manquant._

## Ecarts avec l'original

_Uniquement des ecarts de DONNEES ou de capacite du lecteur.
Jamais de mise en page : l'equivalence visee est fonctionnelle, pas pixel._
`,

  'technique.md': (p, j) => `# Technique — ${p.titre}

> Les problemes rencontres en reproduisant, et ce qui les a resolus.
> **Ce fichier n'est jamais ecrase par un script.**

## Composants \`dsfr-data\` employes

## Ce qui a coince

_Un probleme par section. Pour chacun : ce qui a ete observe, ce qui l'a cause,
ce qui l'a resolu. Si le constat vaut au-dela de cette page, il va au registre
(\`public/data/retours.json\`) avec un champ \`verifie\` — pas ici seulement._

## Renvois au registre

_Les identifiants concernes : AM-xxx, PG-xxx, BUG-xxx, FP-xxx, LIM-xxx._

## Pieges reperes sur cette page

_Et s'ils sont deja au tableau des « pieges deja payes » du CLAUDE.md, le dire._
`,

  'suivi.md': (p) => `# Suivi — ${p.titre}

> Le journal de la transformation. Une ligne par intervention, la plus recente en haut.
> **Ce fichier n'est jamais ecrase par un script.**

| Date | Ce qui a change | Pourquoi | Verifie comment |
|---|---|---|---|
| | | | |
`
};

let crees = 0, deja = 0, fichiers = 0;
for (const p of paires) {
  const d = join(DOSSIERS, p.id);
  const neuf = !existsSync(d);
  await mkdir(join(d, 'captures'), { recursive: true });
  await mkdir(join(d, 'constats'), { recursive: true });

  const j = await jeuxDe(p.reprise);
  // Seul fichier regenere : il ne contient que du derive du registre et de la page.
  await writeFile(join(d, 'fiche.json'), `${JSON.stringify({ ...p, page: j.chemin, jeux: j.jeux, urls: j.urls }, null, 2)}\n`, 'utf8');

  for (const [nom, gabarit] of Object.entries(SQUELETTES)) {
    const f = join(d, nom);
    if (existsSync(f)) continue;
    await writeFile(f, gabarit(p, j), 'utf8');
    fichiers++;
  }
  neuf ? crees++ : deja++;
}

const avecJeux = [];
for (const p of paires) {
  const { jeux } = JSON.parse(await readFile(join(DOSSIERS, p.id, 'fiche.json'), 'utf8'));
  if (jeux.length) avecJeux.push(p.id);
}
console.log(`${paires.length} dossiers dans ${DOSSIERS}`);
console.log(`  ${crees} cree(s), ${deja} deja present(s), ${fichiers} fichier(s) amorce(s)`);
console.log(`  ${avecJeux.length}/${paires.length} avec des jeux de donnees releves dans la page`);
