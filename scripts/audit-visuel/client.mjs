// Client multimodal interchangeable : Anthropic (Haiku) ou tout endpoint
// OpenAI-compatible (Mistral multimodal, Albert, OpenRouter, vLLM local...).
//
// Choix du fournisseur par la variable AUDIT_MODELE, au format "<provider>:<modele>",
// meme convention que sophia-lycee (app/llm/router.py) :
//
//   AUDIT_MODELE=anthropic:claude-haiku-4-5-20251001   ANTHROPIC_API_KEY=...
//   AUDIT_MODELE=openai:mistral-small-3.2-24b          OPENAI_BASE_URL=http://.../v1  OPENAI_API_KEY=...
//   AUDIT_MODELE=mistral:pixtral-large-latest          MISTRAL_API_KEY=...
//
// Un provider = une base_url + une cle. Tout ce qui parle OpenAI passe par `openai`.
import { readFile } from 'node:fs/promises';

const PROVIDERS = {
  anthropic: {
    forme: 'anthropic',
    base: () => process.env.ANTHROPIC_BASE_URL || 'https://api.anthropic.com/v1',
    cle: () => process.env.ANTHROPIC_API_KEY
  },
  openai: {
    forme: 'openai',
    base: () => process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1',
    cle: () => process.env.OPENAI_API_KEY
  },
  mistral: {
    forme: 'openai',
    base: () => process.env.MISTRAL_BASE_URL || 'https://api.mistral.ai/v1',
    cle: () => process.env.MISTRAL_API_KEY
  },
  albert: {
    forme: 'openai',
    base: () => process.env.ALBERT_BASE_URL || 'https://albert.api.etalab.gouv.fr/v1',
    cle: () => process.env.ALBERT_API_KEY
  },
  openrouter: {
    forme: 'openai',
    base: () => process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1',
    cle: () => process.env.OPENROUTER_API_KEY
  }
};

export function resoudre(spec = process.env.AUDIT_MODELE) {
  if (!spec) throw new Error('AUDIT_MODELE absent (ex. "anthropic:claude-haiku-4-5-20251001" ou "mistral:pixtral-large-latest")');
  const i = spec.indexOf(':');
  if (i === -1) throw new Error(`AUDIT_MODELE mal forme : "${spec}" — attendu "<provider>:<modele>"`);
  const nom = spec.slice(0, i);
  const modele = spec.slice(i + 1);
  const p = PROVIDERS[nom];
  if (!p) throw new Error(`Provider inconnu : "${nom}" — connus : ${Object.keys(PROVIDERS).join(', ')}`);
  const cle = p.cle();
  if (!cle) throw new Error(`Cle absente pour "${nom}" (variable d'environnement non definie)`);
  return { nom, modele, forme: p.forme, base: p.base().replace(/\/$/, ''), cle };
}

const b64 = async (f) => (await readFile(f)).toString('base64');

// Renvoie { texte, usage } — `usage` normalise en { entree, sortie }.
export async function interroger({ systeme, texte, images = [], cible, max_tokens = 2000, temperature = 0 }) {
  const c = cible || resoudre();
  return c.forme === 'anthropic'
    ? anthropic(c, { systeme, texte, images, max_tokens, temperature })
    : openai(c, { systeme, texte, images, max_tokens, temperature });
}

async function anthropic(c, { systeme, texte, images, max_tokens, temperature }) {
  const contenu = [];
  for (const im of images) {
    contenu.push({ type: 'text', text: im.legende });
    contenu.push({ type: 'image', source: { type: 'base64', media_type: 'image/png', data: await b64(im.fichier) } });
  }
  contenu.push({ type: 'text', text: texte });
  const r = await fetch(`${c.base}/messages`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': c.cle,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: c.modele, max_tokens, temperature,
      system: systeme,
      messages: [{ role: 'user', content: contenu }]
    })
  });
  if (!r.ok) throw new Error(`anthropic HTTP ${r.status} : ${(await r.text()).slice(0, 300)}`);
  const j = await r.json();
  return {
    texte: j.content.filter((b) => b.type === 'text').map((b) => b.text).join(''),
    usage: { entree: j.usage?.input_tokens, sortie: j.usage?.output_tokens }
  };
}

async function openai(c, { systeme, texte, images, max_tokens, temperature }) {
  const contenu = [];
  for (const im of images) {
    contenu.push({ type: 'text', text: im.legende });
    contenu.push({ type: 'image_url', image_url: { url: `data:image/png;base64,${await b64(im.fichier)}` } });
  }
  contenu.push({ type: 'text', text: texte });
  const r = await fetch(`${c.base}/chat/completions`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: `Bearer ${c.cle}` },
    body: JSON.stringify({
      model: c.modele, max_tokens, temperature,
      messages: [{ role: 'system', content: systeme }, { role: 'user', content: contenu }]
    })
  });
  if (!r.ok) throw new Error(`${c.nom} HTTP ${r.status} : ${(await r.text()).slice(0, 300)}`);
  const j = await r.json();
  const u = j.usage || {};
  return {
    texte: j.choices?.[0]?.message?.content ?? '',
    usage: { entree: u.prompt_tokens, sortie: u.completion_tokens }
  };
}

// Extrait le premier objet JSON d'une reponse, que le modele l'ait ou non
// enrobe de ```json ... ``` ou de phrases (les petits modeles le font).
export function extraireJSON(s) {
  const bloc = s.match(/```(?:json)?\s*([\s\S]*?)```/);
  const brut = (bloc ? bloc[1] : s).trim();
  const d = brut.indexOf('{');
  const f = brut.lastIndexOf('}');
  if (d === -1 || f === -1) throw new Error(`pas de JSON dans la reponse : ${s.slice(0, 200)}`);
  return JSON.parse(brut.slice(d, f + 1));
}
