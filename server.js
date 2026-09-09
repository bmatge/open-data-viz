// Serveur statique zero-dependance pour open-data-viz.
// Sert public/ ; URLs propres (/viz/decp-augmente -> public/viz/decp-augmente.html).

import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join, normalize, extname } from 'node:path';

const PORT = parseInt(process.env.PORT || '3000', 10);
const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, 'public');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.map': 'application/json; charset=utf-8'
};

/** Resout une URL vers un fichier de public/, en refusant toute sortie du dossier. */
async function resolveFile(pathname) {
  const clean = normalize(decodeURIComponent(pathname)).replace(/^(\.\.[/\\])+/, '');
  const base = join(PUBLIC_DIR, clean);
  if (!base.startsWith(PUBLIC_DIR)) return null;

  const candidates = [base];
  if (!extname(base)) candidates.push(`${base}.html`, join(base, 'index.html'));

  for (const candidate of candidates) {
    try {
      const info = await stat(candidate);
      if (info.isFile()) return candidate;
    } catch {
      /* candidat suivant */
    }
  }
  return null;
}

const server = createServer(async (req, res) => {
  const { pathname } = new URL(req.url, `http://${req.headers.host || 'localhost'}`);

  if (pathname === '/healthz') {
    res.writeHead(200, { 'content-type': 'text/plain; charset=utf-8' });
    return res.end('ok');
  }

  const file = await resolveFile(pathname === '/' ? '/index.html' : pathname);
  if (!file) {
    res.writeHead(404, { 'content-type': 'text/html; charset=utf-8' });
    return res.end('<h1>404 — page introuvable</h1><p><a href="/">Retour au catalogue</a></p>');
  }

  try {
    const body = await readFile(file);
    res.writeHead(200, {
      'content-type': MIME[extname(file)] || 'application/octet-stream',
      'cache-control': extname(file) === '.html' ? 'no-cache' : 'public, max-age=300'
    });
    res.end(body);
  } catch (err) {
    console.error('[open-data-viz]', err);
    res.writeHead(500, { 'content-type': 'text/plain; charset=utf-8' });
    res.end('500');
  }
});

server.listen(PORT, () => console.log(`open-data-viz sur http://localhost:${PORT}`));
