// Construit public/data/registre-sports.json : l'etat de reproduction des
// dataviz du portail data.sports.gouv.fr (lot 19).
//
//   node scripts/build-registre-sports.mjs
//
// Troisieme registre, et le premier SANS catalogue vivant. Les deux premiers
// portails publient leur catalogue de dataviz dans un jeu de donnees
// (`interne-contenus-catalogue-visualisations`, `dataviz-a-la-une`), que les
// pages /bercy et /education joignent au registre par `titre`. data.sports n'en
// a pas : son accueil (/pages/accueil/) est une page statique qui propose trois
// « parcours » en dur — deux pages portraits et un renvoi vers Data ES
// (equipements.sports.gouv.fr). Verifie a l'API le 2026-09-11 : aucun des 51
// jeux du portail ne decrit ses pages.
//
// Consequence : le registre est ecrit ici en entier, sans rien a joindre. Et sa
// granularite est l'ONGLET, pas la page : chaque portrait est un generateur de
// fiche a cinq ou six onglets, chacun avec ses jeux, ses graphiques et ses KPI
// propres. C'est l'onglet qui a la taille d'une dataviz des deux autres
// portails ; compter deux entrees pour ~160 requetes d'agregation serait faux.
//
// Statuts et libelles : les memes cinq que les deux autres registres. Les champs
// sont ceux de registre-education.json, plus `page` et `onglet`, et `titre`
// (compose) reste la cle, par symetrie, bien que rien ne s'y joigne.

import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ORIGINE = 'https://data.sports.gouv.fr/pages';

const LIBELLES = {
  reproduite: { texte: 'Reproduite', classe: 'fr-badge--success' },
  'a-faire': { texte: 'À reproduire', classe: 'fr-badge--info' },
  analyse: { texte: 'Analyse seule', classe: 'fr-badge--new' },
  'hors-perimetre': { texte: 'Hors périmètre', classe: 'fr-badge--grey' },
  impossible: { texte: 'Source disparue', classe: 'fr-badge--error' }
};

const PAGES = {
  'portrait-territoire': { libelle: 'Portrait de territoire', origine: `${ORIGINE}/portrait-territoire/` },
  'portrait-federation': { libelle: 'Portrait de fédération', origine: `${ORIGINE}/portrait-federation/?refine.code_fs=101` },
  'data-es': { libelle: 'Équipements sportifs', origine: 'https://equipements.sports.gouv.fr/pages/accueil/' }
};

// [page, onglet (libelle exact de l'original), statut, note]
// L'URL locale est /sports/<page> pour toute entree reproduite ou analysee.
const ONGLETS = [
  // --- Lot 19. Les deux portraits, reproduits en entier aux mailles région,
  // département et France (portrait de territoire) et pour toute fédération
  // ou groupe (portrait de fédération). Une page par portrait, un panneau
  // fr-tabs par onglet d'origine.
  ['portrait-territoire', 'Licences et pratiques sportives', 'reproduite',
    'Pyramide des âges en deux graphiques ; pratique régulière publiée par région, retrouvée par jointure'],
  ['portrait-territoire', 'Equipements sportifs', 'reproduite',
    'L’original compte « la France » sur un autre jeu que le territoire : 333 629 contre 331 677'],
  ['portrait-territoire', 'Enseignement et diplômes', 'reproduite',
    'BPJEPS et STAPS, taux d’insertion lus au niveau régional'],
  ['portrait-territoire', 'Volontariat sportif', 'reproduite',
    'Vide pour les régions d’outre-mer : la région y est un entier, le filtre compare « 01 » en texte'],
  ['portrait-territoire', 'Dispositifs Etat', 'reproduite',
    'Pass’Sport sur deux jeux dans l’original, qui ne donnent pas le même total'],
  ['portrait-territoire', 'Me comparer', 'reproduite',
    'Un second contexte au lieu de 46 contextes suffixés ; 11 requêtes par changement de territoire'],
  ['portrait-federation', 'Licences et clubs', 'reproduite',
    'Base 100 par deux jointures ; le dernier millésime lu à l’API, jamais écrit en dur'],
  ['portrait-federation', 'Mon territoire', 'reproduite',
    'Trois chiffres faux de l’original y sont justes : les valeurs de groupe se joignent au lieu de se recopier'],
  ['portrait-federation', 'Fiche signalétique', 'reproduite',
    'Huit rubriques d’une ligne : neuf « 1 resultat » à taire'],
  ['portrait-federation', 'Structuration', 'reproduite',
    'Une « part du total » coûte quatre composants par répartition'],
  ['portrait-federation', 'Me comparer', 'reproduite',
    'Comparaison à une fédération ou à un groupe ; le lien profond ?refine.code_fs= marche, pas dans l’original'],
  // Le troisieme parcours de l'accueil sort du portail : c'est l'accueil de
  // Data ES, pas une dataviz. Ses trois dataviz sont deja reproduites au lot 12
  // (portail Education, qui y renvoie aussi) : on n'ouvre pas une quatrieme page.
  ['data-es', 'Parcours « Equipements sportifs »', 'hors-perimetre',
    'Renvoie à l’accueil de Data ES (equipements.sports.gouv.fr), dont les trois dataviz sont reproduites au portail Éducation']
];

const registre = ONGLETS.map(([page, onglet, statut, note]) => {
  const p = PAGES[page];
  const libelle = LIBELLES[statut];
  const local = statut === 'reproduite' || statut === 'analyse';
  return {
    titre: page === 'data-es' ? onglet : `${p.libelle} — ${onglet}`,
    page: p.libelle,
    onglet,
    repro_statut: statut,
    repro_libelle: libelle.texte,
    repro_badge: libelle.classe,
    repro_url: local ? `/sports/${page}` : page === 'data-es' ? '/education' : p.origine,
    repro_cible: local || page === 'data-es' ? '_self' : '_blank',
    repro_origine: p.origine,
    repro_note: note
  };
});

const cible = join(dirname(dirname(fileURLToPath(import.meta.url))), 'public', 'data', 'registre-sports.json');
await writeFile(cible, `${JSON.stringify(registre, null, 2)}\n`, 'utf8');

const compte = registre.reduce((acc, r) => ({ ...acc, [r.repro_statut]: (acc[r.repro_statut] || 0) + 1 }), {});
console.log(`${registre.length} entrées écrites dans ${cible}`);
console.log(compte);
