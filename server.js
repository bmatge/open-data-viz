// Serveur statique zero-dependance pour open-data-viz.
// Sert public/ ; URLs propres (/viz/decp-augmente -> public/viz/decp-augmente.html).
//
// Revue critique du 2026-09-13, § 3.3 — trois defauts corriges le 2026-09-19 :
//   1. `decodeURIComponent` hors de tout try/catch : `curl --path-as-is /%` tuait
//      le processus (URIError non rattrapee dans un handler async => rejet non
//      gere => Node 22+ termine). Reproduit avant correctif, retente apres.
//   2. Aucune compression : `retours.json` partait en 394 Ko.
//   3. Aucun validateur de cache : a l'expiration des 300 s, tout etait
//      retelecharge, meme inchange.

import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join, normalize, extname } from 'node:path';
import { gzipSync, brotliCompressSync, constants as zlibConstants } from 'node:zlib';
import { createHash } from 'node:crypto';

const PORT = parseInt(process.env.PORT || '3000', 10);
const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, 'public');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.geojson': 'application/geo+json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.map': 'application/json; charset=utf-8'
};

// Compressibles : tout ce qui est texte. Les images et woff2 sont deja compresses.
const COMPRESSIBLE = /^(text\/|application\/(javascript|json|geo\+json)|image\/svg)/;
const SEUIL_COMPRESSION = 1024; // en dessous, l'en-tete coute plus que le gain

// Cache memoire des reponses deja lues et compressees, invalide par mtime+taille.
// Le depot sert 66 pages et un registre de 394 Ko : tout tient largement.
const cache = new Map();

/** Resout une URL vers un fichier de public/, en refusant toute sortie du dossier. */
async function resolveFile(pathname) {
  // `decodeURIComponent` leve une URIError sur une sequence % invalide (`/%`,
  // `/%zz`, `/%e0%a4%a`) : sans ce try, le rejet remonte non gere et tue Node.
  let decode;
  try {
    decode = decodeURIComponent(pathname);
  } catch {
    return null; // URL malformee : 404, pas de crash
  }
  const clean = normalize(decode).replace(/^(\.\.[/\\])+/, '');
  const base = join(PUBLIC_DIR, clean);
  if (!base.startsWith(PUBLIC_DIR)) return null;

  const candidates = [base];
  // Barre finale (`/sports/`) : `normalize` la garde, `extname` est vide, donc
  // `${base}.html` donne `/sports/.html`. `index.html` du dossier reste le bon
  // candidat, et on ajoute la variante sans barre (`/sports` -> `sports.html`).
  if (!extname(base)) {
    const nu = base.replace(/[/\\]+$/, '');
    candidates.push(`${nu}.html`, join(base, 'index.html'));
  }

  for (const candidate of candidates) {
    try {
      const info = await stat(candidate);
      if (info.isFile()) return { chemin: candidate, mtime: info.mtimeMs, taille: info.size };
    } catch {
      /* candidat suivant */
    }
  }
  return null;
}

/** Corps, ETag et variantes compressees d'un fichier, memorises par mtime+taille. */
async function charger({ chemin, mtime, taille }) {
  const cle = `${chemin}|${mtime}|${taille}`;
  const connu = cache.get(cle);
  if (connu) return connu;

  const brut = await readFile(chemin);
  const type = MIME[extname(chemin)] || 'application/octet-stream';
  const entree = {
    brut,
    type,
    lastModified: new Date(mtime).toUTCString(),
    etag: `"${createHash('sha1').update(brut).digest('base64url').slice(0, 27)}"`,
    gzip: null,
    br: null
  };
  if (COMPRESSIBLE.test(type) && brut.length >= SEUIL_COMPRESSION) {
    entree.gzip = gzipSync(brut, { level: 9 });
    entree.br = brotliCompressSync(brut, {
      params: { [zlibConstants.BROTLI_PARAM_QUALITY]: 5 }
    });
  }
  // Cache borne : les 96 fichiers du depot tiennent largement, et la cle porte
  // mtime+taille, donc une version perimee n'est jamais servie — elle est juste
  // evincee quand le plafond est atteint (insertion la plus ancienne d'abord).
  if (cache.size >= 200) cache.delete(cache.keys().next().value);
  cache.set(cle, entree);
  return entree;
}

const server = createServer(async (req, res) => {
  try {
    // `new URL` leve aussi sur certaines URL malformees : tout est sous try.
    const { pathname } = new URL(req.url, `http://${req.headers.host || 'localhost'}`);

    if (pathname === '/healthz') {
      res.writeHead(200, { 'content-type': 'text/plain; charset=utf-8' });
      return res.end('ok');
    }

    const trouve = await resolveFile(pathname === '/' ? '/index.html' : pathname);
    if (!trouve) {
      res.writeHead(404, { 'content-type': 'text/html; charset=utf-8', ...ENTETES_SECURITE });
      return res.end('<h1>404 — page introuvable</h1><p><a href="/">Retour au catalogue</a></p>');
    }

    const f = await charger(trouve);
    const html = f.type.startsWith('text/html');
    const entetes = {
      'content-type': f.type,
      'cache-control': html ? 'no-cache' : 'public, max-age=300',
      etag: f.etag,
      'last-modified': f.lastModified,
      vary: 'accept-encoding',
      ...ENTETES_SECURITE
    };

    // Validateurs : 304 si le client a deja la bonne version.
    const inm = req.headers['if-none-match'];
    const ims = req.headers['if-modified-since'];
    if ((inm && inm.split(/,\s*/).includes(f.etag)) || (!inm && ims && ims === f.lastModified)) {
      res.writeHead(304, entetes);
      return res.end();
    }

    const accepte = req.headers['accept-encoding'] || '';
    let corps = f.brut;
    if (f.br && /\bbr\b/.test(accepte)) {
      corps = f.br;
      entetes['content-encoding'] = 'br';
    } else if (f.gzip && /\bgzip\b/.test(accepte)) {
      corps = f.gzip;
      entetes['content-encoding'] = 'gzip';
    }
    entetes['content-length'] = corps.length;

    res.writeHead(200, entetes);
    return res.end(req.method === 'HEAD' ? undefined : corps);
  } catch (err) {
    console.error('[open-data-viz]', err);
    if (res.headersSent) return res.destroy();
    res.writeHead(500, { 'content-type': 'text/plain; charset=utf-8' });
    return res.end('500');
  }
});

const ENTETES_SECURITE = {
  'x-content-type-options': 'nosniff',
  'referrer-policy': 'strict-origin-when-cross-origin'
};

// Dernier filet : un defaut ailleurs dans le processus ne doit pas couper le
// service et declencher une alerte Kuma. Le `restart: unless-stopped` du
// compose masquait le crash au prix d'une coupure a chaque robot qui passait.
process.on('unhandledRejection', (raison) => {
  console.error('[open-data-viz] rejet non gere :', raison);
});
process.on('uncaughtException', (err) => {
  console.error('[open-data-viz] exception non rattrapee :', err);
});

server.listen(PORT, () => console.log(`open-data-viz sur http://localhost:${PORT}`));
