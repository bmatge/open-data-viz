/* Panneau « Voir le code » — un bouton par dataviz, replie par defaut.
   ---------------------------------------------------------------------------
   Objectif : ce site doit convaincre de passer a dsfr-data. L'argument le plus
   fort n'est pas de DIRE que c'est court, c'est de MONTRER le code -- a
   condition qu'il ne soit pas dans le chemin de lecture. D'ou un <details>
   replie, sous chaque bloc, avec un bouton « Copier ».

   Le code affiche est le code SOURCE de la page, pas le DOM rendu : on refait
   un `fetch` du document et on y decoupe la region marquee. Sans cela on
   montrerait les <canvas>, les <svg> et les gabarits rehausses -- c'est-a-dire
   tout sauf ce qu'un integrateur ecrirait.

   Usage, dans la page :
     <div class="odv-viz" data-code="Licences par departement">…balises…</div>
   Le contenu de `data-code` titre le panneau. Rien d'autre a ecrire.           */
(() => {
  const PAGE = fetch(location.pathname, { cache: 'force-cache' }).then((r) => r.text()).catch(() => null);

  /* Coloration maison. Une dependance de plus pour trois couleurs ne se
     justifie pas, et l'argument du depot est « une balise, un CDN ». Ordre des
     remplacements : on echappe d'abord, puis on balise -- l'inverse colorerait
     les balises qu'on vient d'ecrire. */
  const colorer = (src) => {
    const ech = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    /* UN SEUL balayage, et on n'inspecte jamais ce qu'on vient d'ecrire : la
       premiere version colorait le texte puis recolorait ses propres <span>,
       dont les `class=` retombaient dans la regle des attributs. On decoupe
       donc la source en commentaires / balises / texte, et chaque morceau
       n'est traite qu'une fois. */
    let out = '';
    const re = /<!--[\s\S]*?-->|<\/?[a-zA-Z][\w-]*(?:"[^"]*"|'[^']*'|[^>"'])*>/g;
    let pos = 0, m;
    while ((m = re.exec(src))) {
      out += ech(src.slice(pos, m.index));
      const t = m[0];
      pos = m.index + t.length;
      if (t.startsWith('<!--')) { out += '<span class="odv-c-com">' + ech(t) + '</span>'; continue; }
      /* Interieur d'une balise : le nom, puis chaque paire attribut="valeur". */
      out += ech(t)
        .replace(/^(&lt;\/?)([a-zA-Z][\w-]*)/, '$1<span class="odv-c-bal">$2</span>')
        .replace(/([a-zA-Z-][\w-]*)(=)(&quot;)([\s\S]*?)(&quot;)/g,
          '<span class="odv-c-att">$1</span>$2<span class="odv-c-val">$3$4$5</span>');
    }
    return out + ech(src.slice(pos));
  };

  /* Retire l'indentation commune : un extrait colle depuis une page indentee a
     six niveaux est illisible. */
  const degauchir = (src) => {
    const l = src.replace(/\t/g, '  ').split('\n');
    const min = l.filter((x) => x.trim()).reduce((m, x) => Math.min(m, x.match(/^ */)[0].length), 99);
    return l.map((x) => x.slice(min)).join('\n').trim();
  };

  /* Decoupe la region marquee dans le SOURCE, par equilibrage de balises.
     On repere l'ouverture par son attribut `data-code`, qui est unique. */
  const extraire = (source, titre) => {
    const ouv = new RegExp('<div class="odv-viz"[^>]*data-code="' + titre.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '"[^>]*>');
    const m = ouv.exec(source);
    if (!m) return null;
    let i = m.index + m[0].length, prof = 1, re = /<(\/?)div\b[^>]*?(\/?)>/g;
    re.lastIndex = i;
    let t;
    while ((t = re.exec(source))) {
      if (t[2] === '/') continue;
      prof += t[1] ? -1 : 1;
      if (prof === 0) return degauchir(source.slice(i, t.index));
    }
    return null;
  };

  const poser = async (bloc) => {
    const titre = bloc.dataset.code;
    const source = await PAGE;
    const code = source && extraire(source, titre);
    if (!code) return;                      // pas de panneau plutot qu'un panneau faux

    const d = document.createElement('details');
    d.className = 'odv-code';
    d.innerHTML = `
      <summary class="fr-btn fr-btn--tertiary fr-btn--sm fr-icon-code-s-slash-line fr-btn--icon-left">
        Voir le code
      </summary>
      <div class="odv-code__corps">
        <div class="odv-code__barre">
          <p class="fr-text--xs fr-mb-0">${titre.replace(/</g, '&lt;')} — ${code.split('\n').length} lignes</p>
          <button class="fr-btn fr-btn--sm fr-btn--tertiary-no-outline fr-icon-clipboard-line fr-btn--icon-left" type="button">Copier</button>
        </div>
        <pre class="odv-code__pre"><code>${colorer(code)}</code></pre>
      </div>`;

    d.querySelector('button').addEventListener('click', async (ev) => {
      const b = ev.currentTarget;
      try {
        await navigator.clipboard.writeText(code);
        b.textContent = 'Copié';
      } catch {
        /* Presse-papiers refuse (page non securisee, permission) : on ne ment
           pas a l'utilisateur, on selectionne le texte pour qu'il copie. */
        const r = document.createRange();
        r.selectNodeContents(d.querySelector('code'));
        const s = getSelection(); s.removeAllRanges(); s.addRange(r);
        b.textContent = 'Sélectionné — Ctrl/Cmd+C';
      }
      setTimeout(() => { b.textContent = 'Copier'; }, 2500);
    });

    bloc.appendChild(d);
  };

  const demarrer = () => document.querySelectorAll('.odv-viz[data-code]').forEach(poser);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', demarrer);
  else demarrer();
})();
