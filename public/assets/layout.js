/* En-tete et pied de page DSFR communs, injectes dans #site-header / #site-footer.
   Script classique place en fin de <body> : il s'execute avant le module DSFR
   (differe), qui trouve donc un DOM complet a instrumenter. */
(() => {
  const TITRE = 'open-data-viz';
  const BASELINE = 'Reproduire les catalogues de visualisations de data.economie.gouv.fr et data.education.gouv.fr avec dsfr-data';

  const LIENS = [
    { href: '/', libelle: 'Accueil' },
    { href: '/bercy', libelle: 'Portail Bercy' },
    { href: '/education', libelle: 'Portail Éducation' },
    { href: '/synthese', libelle: 'Synthèse' },
    { href: '/retours', libelle: 'Registre des retours' }
  ];

  const courant = window.location.pathname.replace(/\/$/, '') || '/';

  const navigation = LIENS.map(({ href, libelle, externe }) => {
    const actif = !externe && href.replace(/\/$/, '') === courant ? ' aria-current="page"' : '';
    const cible = externe ? ' target="_blank" rel="noopener external"' : '';
    return `<li class="fr-nav__item"><a class="fr-nav__link" href="${href}"${actif}${cible}>${libelle}</a></li>`;
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
          Banc d'essai indépendant : chaque page rejoue une visualisation des catalogues
          <a class="fr-footer__content-link" href="https://data.economie.gouv.fr/pages/catalogue-visualisations/"
             target="_blank" rel="noopener external">data.economie.gouv.fr</a>
          et
          <a class="fr-footer__content-link" href="https://data.education.gouv.fr/pages/dataviz-list/"
             target="_blank" rel="noopener external">data.education.gouv.fr</a>
          avec les composants <code>dsfr-data</code> (ChartsBuilder), puis documente ce qui a été
          simple ou coûteux. Les données sont lues en direct sur l'API Opendatasoft des portails.
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
        </ul>
      </div>
    </div>
    <div class="fr-footer__bottom">
      <ul class="fr-footer__bottom-list">
        <li class="fr-footer__bottom-item"><a class="fr-footer__bottom-link" href="/">Accueil</a></li>
        <li class="fr-footer__bottom-item"><a class="fr-footer__bottom-link" href="/bercy">Portail Bercy</a></li>
        <li class="fr-footer__bottom-item"><a class="fr-footer__bottom-link" href="/education">Portail Éducation</a></li>
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
})();
