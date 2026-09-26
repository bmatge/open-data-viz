/* En-tete et pied de page DSFR communs, injectes dans #site-header / #site-footer.
   Script classique place en fin de <body> : il s'execute avant le module DSFR
   (differe), qui trouve donc un DOM complet a instrumenter. */
(() => {
  const TITRE = 'open-data-viz';
  const BASELINE = 'Les capacités de dsfr-data, démontrées sur des dataviz de données publiques';

  /* Menu recentre (2026-09-26) : la vitrine d'abord (accueil, toutes les
     dataviz, demonstrations), puis les portails en sous-menu, puis le banc
     d'essai qui sert de preuve. Une entree a `enfants` devient un sous-menu
     DSFR (bouton + fr-menu) ; son bouton est marque courant quand l'une de
     ses pages l'est. */
  const LIENS = [
    { href: '/', libelle: 'Accueil' },
    { href: '/dataviz', libelle: 'Toutes les dataviz' },
    { href: '/demo', libelle: 'Démonstrations' },
    { id: 'portails', libelle: 'Par portail', enfants: [
      { href: '/bercy', libelle: 'Économie (Bercy)' },
      { href: '/education', libelle: 'Éducation' },
      { href: '/sports', libelle: 'Sports' },
      { href: '/culture', libelle: 'Culture' },
      { href: '/developpement-durable', libelle: 'Développement durable' }
    ] },
    { id: 'banc', libelle: "Banc d'essai", enfants: [
      { href: '/banc', libelle: 'Tableau de bord du banc' },
      { href: '/synthese', libelle: 'Synthèse des analyses' },
      { href: '/retours', libelle: 'Registre des retours' }
    ] }
  ];

  const courant = window.location.pathname.replace(/\/$/, '').replace(/\.html$/, '') || '/';

  // Une entree est courante pour sa page ET pour ses sous-pages (/demo couvre
  // /demo/cuivre-qui-bascule, /culture couvre /culture/festivals) ; la racine
  // ne l'est que pour elle-meme. Les pages Bercy vivent sous /viz/.
  const estCourant = (href) => {
    if (href === '/') return courant === '/';
    const prefixes = href === '/bercy' ? [href, '/viz'] : [href];
    return prefixes.some((c) => courant === c || courant.startsWith(c + '/'));
  };

  const lien = ({ href, libelle }) =>
    `<a class="fr-nav__link" href="${href}"${estCourant(href) ? ' aria-current="page"' : ''}>${libelle}</a>`;

  const navigation = LIENS.map((entree) => {
    if (!entree.enfants) return `<li class="fr-nav__item">${lien(entree)}</li>`;
    const actif = entree.enfants.some((e) => estCourant(e.href)) ? ' aria-current="true"' : '';
    const items = entree.enfants.map((e) => `<li>${lien(e)}</li>`).join('');
    return `<li class="fr-nav__item">
      <button class="fr-nav__btn" aria-expanded="false" aria-controls="menu-${entree.id}"${actif}>${entree.libelle}</button>
      <div class="fr-collapse fr-menu" id="menu-${entree.id}"><ul class="fr-menu__list">${items}</ul></div>
    </li>`;
  }).join('');

  const entete = `
<header role="banner" class="fr-header">
  <div class="fr-header__body">
    <div class="fr-container">
      <div class="fr-header__body-row">
        <div class="fr-header__brand fr-enlarge-link">
          <div class="fr-header__brand-top">
            <div class="fr-header__logo">
              <p class="fr-logo">République<br>Française</p>
            </div>
            <div class="fr-header__navbar">
              <button class="fr-btn--menu fr-btn" data-fr-opened="false" aria-controls="menu-principal"
                      aria-haspopup="menu" id="bouton-menu" title="Menu">Menu</button>
            </div>
          </div>
          <div class="fr-header__service">
            <a href="/" title="Accueil — ${TITRE}">
              <p class="fr-header__service-title">${TITRE}</p>
            </a>
            <p class="fr-header__service-tagline">${BASELINE}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="fr-header__menu fr-modal" id="menu-principal" aria-labelledby="bouton-menu">
    <div class="fr-container">
      <button class="fr-btn--close fr-btn" aria-controls="menu-principal">Fermer</button>
      <div class="fr-header__menu-links"></div>
      <nav class="fr-nav" role="navigation" aria-label="Menu principal">
        <ul class="fr-nav__list">${navigation}</ul>
      </nav>
    </div>
  </div>
</header>`;

  const pied = `
<footer class="fr-footer" role="contentinfo" id="footer">
  <div class="fr-container">
    <div class="fr-footer__body">
      <div class="fr-footer__brand fr-enlarge-link">
        <p class="fr-logo">République<br>Française</p>
      </div>
      <div class="fr-footer__content">
        <p class="fr-footer__content-desc">
          Vitrine de <code>dsfr-data</code>, la bibliothèque de composants dataviz du Système de
          design de l'État, appuyée sur un banc d'essai indépendant&nbsp;: des dataviz reproduites
          ou recréées depuis
          <a class="fr-footer__content-link" href="https://data.economie.gouv.fr/pages/catalogue-visualisations/"
             target="_blank" rel="noopener external">data.economie.gouv.fr</a>,
          <a class="fr-footer__content-link" href="https://data.education.gouv.fr/pages/dataviz-list/"
             target="_blank" rel="noopener external">data.education.gouv.fr</a> et
          <a class="fr-footer__content-link" href="https://data.sports.gouv.fr/pages/accueil/"
             target="_blank" rel="noopener external">data.sports.gouv.fr</a>, et des dataviz créées sur
          les données de la Culture et du Développement durable. Les données sont lues en direct sur
          les API des portails (Opendatasoft, Tabular, DiDo, INSEE).
        </p>
        <ul class="fr-footer__content-list">
          <li class="fr-footer__content-item">
            <a class="fr-footer__content-link" href="https://github.com/bmatge/dsfr-data" target="_blank" rel="noopener external">dsfr-data</a>
          </li>
          <li class="fr-footer__content-item">
            <a class="fr-footer__content-link" href="https://www.systeme-de-design.gouv.fr" target="_blank" rel="noopener external">systeme-de-design.gouv.fr</a>
          </li>
          <li class="fr-footer__content-item">
            <a class="fr-footer__content-link" href="https://data.economie.gouv.fr" target="_blank" rel="noopener external">data.economie.gouv.fr</a>
          </li>
          <li class="fr-footer__content-item">
            <a class="fr-footer__content-link" href="https://data.education.gouv.fr" target="_blank" rel="noopener external">data.education.gouv.fr</a>
          </li>
          <li class="fr-footer__content-item">
            <a class="fr-footer__content-link" href="https://data.sports.gouv.fr" target="_blank" rel="noopener external">data.sports.gouv.fr</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="fr-footer__bottom">
      <ul class="fr-footer__bottom-list">
        <li class="fr-footer__bottom-item"><a class="fr-footer__bottom-link" href="/">Accueil</a></li>
        <li class="fr-footer__bottom-item"><a class="fr-footer__bottom-link" href="/dataviz">Toutes les dataviz</a></li>
        <li class="fr-footer__bottom-item"><a class="fr-footer__bottom-link" href="/demo">Démonstrations</a></li>
        <li class="fr-footer__bottom-item"><a class="fr-footer__bottom-link" href="/banc">Tableau de bord du banc</a></li>
        <li class="fr-footer__bottom-item"><a class="fr-footer__bottom-link" href="/synthese">Synthèse des analyses</a></li>
        <li class="fr-footer__bottom-item"><a class="fr-footer__bottom-link" href="/retours">Registre des retours</a></li>
        <li class="fr-footer__bottom-item">
          <a class="fr-footer__bottom-link" href="https://github.com/bmatge/open-data-viz" target="_blank" rel="noopener external">Code source</a>
        </li>
      </ul>
      <div class="fr-footer__bottom-copy">
        <p>Sauf mention contraire, les contenus de ce banc d'essai sont sous
          <a href="https://github.com/etalab/licence-ouverte/blob/master/LO.md" target="_blank" rel="noopener external">licence etalab-2.0</a>.
        </p>
      </div>
    </div>
  </div>
</footer>`;

  const poser = (id, html) => {
    const cible = document.getElementById(id);
    if (cible) cible.outerHTML = html;
  };

  poser('site-header', entete);
  poser('site-footer', pied);

  /* ------------------------------------------ Colonne de filtres repliable */
  /* Sur telephone, la colonne de filtres s'empile au-dessus des donnees : le
     premier chiffre de la page tombait entre 1 et 5 ecrans de defilement
     (mesure du 2026-09-19 a 390 x 780). Le panneau se replie donc sous le point
     de rupture ou `.odv-dashboard` passe en deux colonnes -- 62em, la meme
     valeur qu'en CSS, tenue ici en une constante pour qu'elles ne divergent pas.

     On pose l'attribut `open` plutot que de forcer l'ouverture en CSS : Chrome
     masque le contenu d'un <details> ferme par `::details-content`, qu'aucune
     regle sur l'enfant ne defait. Le HTML porte `open` par defaut, donc une page
     sans JavaScript garde ses filtres deployes -- degradation vers l'etat
     d'avant, jamais vers des filtres inatteignables. */
  /* Deux points de rupture, parce que les pages ont deux grilles : les pages
     Bercy passent en deux colonnes a 62em (`.odv-dashboard`), les pages
     Education et Sports a 48em (`fr-col-md-3`). Le repli doit cesser quand la
     place arrive, pas a une valeur unique choisie pour la commodite du script. */
  const RUPTURES = {
    lg: window.matchMedia('(min-width: 62em)'),
    md: window.matchMedia('(min-width: 48em)'),
  };

  const panneaux = [...document.querySelectorAll('details.odv-filtres')];

  const ruptureDe = (panneau) => panneau.classList.contains('odv-filtres--md') ? RUPTURES.md : RUPTURES.lg;

  /* Replie, le panneau doit dire ce qu'il cache : sans ce compte, l'utilisateur
     qui a filtre puis referme ne voit plus que sa page est filtree. Les filtres
     actifs se lisent sur les controles rendus par dsfr-data (cases cochees,
     selects renseignes, champ de recherche non vide). */
  const compter = (panneau) => {
    const coches = panneau.querySelectorAll('input[type="checkbox"]:checked, input[type="radio"]:checked:not([value=""])').length;
    const selects = [...panneau.querySelectorAll('select')].filter((s) => s.value && s.value !== '').length;
    const textes = [...panneau.querySelectorAll('input[type="search"], input[type="text"]')].filter((i) => i.value.trim() !== '').length;
    return coches + selects + textes;
  };

  const rafraichirCompte = (panneau) => {
    const cible = panneau.querySelector('.odv-filtres__compte');
    if (!cible) return;
    const n = compter(panneau);
    cible.textContent = n ? ` (${n} actif${n > 1 ? 's' : ''})` : '';
  };

  const appliquer = () => {
    for (const panneau of panneaux) {
      panneau.open = ruptureDe(panneau).matches;
      rafraichirCompte(panneau);
    }
  };

  if (panneaux.length) {
    appliquer();
    for (const mq of Object.values(RUPTURES)) mq.addEventListener('change', appliquer);
    /* Les facettes se rendent apres coup et se re-rendent a chaque refiltre :
       on ecoute le panneau plutot que de compter une fois pour toutes. */
    for (const panneau of panneaux) {
      panneau.addEventListener('change', () => rafraichirCompte(panneau));
      panneau.addEventListener('input', () => rafraichirCompte(panneau));
    }
  }
})();
