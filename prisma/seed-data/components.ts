// Composants de démonstration. Tout le CSS passe par les variables du kit
// (--color-*, --space-*, --radius-*...) : on peut donc appliquer n'importe quel
// composant au kit d'un autre site. Contenus neutres, aucun texte ni logo réel.

export interface SeedElement {
  slug: string;
  name: string;
  category: string;
  site: string;
  description: string;
  style: string;
  complexite: "simple" | "moyenne" | "avancee";
  licence?: "libre" | "inspiration";
  dependencies?: string[];
  variants?: string[];
  components?: string[];
  html: string;
  css: string;
}

export const COMPONENTS: SeedElement[] = [
  // ---------------------------------------------------------------- Boutons
  {
    slug: "bouton-pilule",
    name: "Bouton pilule",
    category: "boutons",
    site: "pulsor",
    description: "Bouton plein en pilule avec sa variante contour, flèche qui glisse au survol.",
    style: "minimaliste",
    complexite: "simple",
    variants: ["plein", "contour"],
    html: `<div class="pill-row">
  <button class="pill pill--solid">Commencer <span class="pill__arrow">→</span></button>
  <button class="pill pill--ghost">En savoir plus</button>
</div>`,
    css: `.pill-row{display:flex;gap:var(--space-3);flex-wrap:wrap;justify-content:center}
.pill{font:var(--weight-medium) var(--text-base)/1 var(--font-body);padding:var(--space-4) var(--space-6);border-radius:var(--radius-full);cursor:pointer;display:inline-flex;align-items:center;gap:var(--space-2);transition:transform var(--duration-fast) var(--ease-standard),background var(--duration-base) var(--ease-standard)}
.pill--solid{background:var(--color-text);color:var(--color-bg);border:1px solid var(--color-text)}
.pill--solid:hover{background:var(--color-primary);border-color:var(--color-primary)}
.pill--ghost{background:transparent;color:var(--color-text);border:1px solid var(--color-border)}
.pill--ghost:hover{border-color:var(--color-text)}
.pill:active{transform:scale(.97)}
.pill__arrow{transition:transform var(--duration-base) var(--ease-standard)}
.pill:hover .pill__arrow{transform:translateX(4px)}`,
  },
  {
    slug: "bouton-lueur",
    name: "Bouton lueur",
    category: "boutons",
    site: "glacier",
    description: "Bouton dégradé avec halo animé, pour un CTA principal sur fond sombre.",
    style: "glassmorphism",
    complexite: "moyenne",
    html: `<button class="glow-btn"><span>Ouvrir un compte</span></button>`,
    css: `.glow-btn{position:relative;border:0;padding:var(--space-4) var(--space-8);border-radius:var(--radius-full);font:var(--weight-bold) var(--text-base)/1 var(--font-body);color:#fff;cursor:pointer;background:linear-gradient(120deg,var(--color-primary),var(--color-secondary));box-shadow:var(--shadow-md);isolation:isolate}
.glow-btn::before{content:"";position:absolute;inset:-3px;border-radius:inherit;background:linear-gradient(120deg,var(--color-primary),var(--color-accent),var(--color-secondary));filter:blur(14px);opacity:.6;z-index:-1;animation:glow-pulse 2.4s var(--ease-standard) infinite alternate}
.glow-btn:hover::before{opacity:.95}
@keyframes glow-pulse{from{transform:scale(.96)}to{transform:scale(1.04)}}`,
  },
  {
    slug: "bouton-ombre-dure",
    name: "Bouton ombre dure",
    category: "boutons",
    site: "atelier-brut",
    description: "Bouton brutaliste : trait épais, ombre décalée qui s'écrase au clic.",
    style: "brutaliste",
    complexite: "simple",
    html: `<button class="brut-btn">Envoyer le brief</button>`,
    css: `.brut-btn{font:var(--weight-bold) var(--text-lg)/1 var(--font-heading);text-transform:uppercase;letter-spacing:.02em;padding:var(--space-4) var(--space-6);background:var(--color-primary);color:var(--color-text);border:3px solid var(--color-border);border-radius:var(--radius-md);box-shadow:var(--shadow-md);cursor:pointer;transition:transform var(--duration-fast) linear,box-shadow var(--duration-fast) linear}
.brut-btn:hover{transform:translate(-2px,-2px);box-shadow:var(--shadow-lg)}
.brut-btn:active{transform:translate(6px,6px);box-shadow:none}`,
  },
  {
    slug: "lien-fleche-filet",
    name: "Lien filet",
    category: "boutons",
    site: "maison-lumen",
    description: "Lien d'action éditorial : filet qui se trace au survol, flèche fine.",
    style: "editorial",
    complexite: "simple",
    html: `<a href="#" class="rule-link">Prendre rendez-vous <span aria-hidden="true">⟶</span></a>`,
    css: `.rule-link{position:relative;display:inline-flex;gap:var(--space-3);align-items:center;font:var(--weight-regular) var(--text-xl)/1.2 var(--font-heading);color:var(--color-text);text-decoration:none;padding-bottom:var(--space-2)}
.rule-link::after{content:"";position:absolute;left:0;right:0;bottom:0;height:1px;background:var(--color-primary);transform:scaleX(.25);transform-origin:left;transition:transform var(--duration-slow) var(--ease-standard)}
.rule-link:hover::after{transform:scaleX(1)}
.rule-link span{color:var(--color-primary);transition:transform var(--duration-slow) var(--ease-standard)}
.rule-link:hover span{transform:translateX(6px)}`,
  },

  // ---------------------------------------------------------------- Cartes
  {
    slug: "carte-fonctionnalite",
    name: "Carte fonctionnalité",
    category: "cartes",
    site: "nordwave",
    description: "Carte avec pictogramme, titre, texte et lien ; se soulève au survol.",
    style: "corporate",
    complexite: "simple",
    html: `<article class="feat-card">
  <div class="feat-card__icon">
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>
  </div>
  <h3 class="feat-card__title">Automatisations</h3>
  <p class="feat-card__text">Déclenchez des actions à chaque étape, sans écrire une ligne de code.</p>
  <a href="#" class="feat-card__link">Découvrir →</a>
</article>`,
    css: `.feat-card{max-width:340px;background:var(--color-surface);border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:var(--space-8);box-shadow:var(--shadow-sm);transition:transform var(--duration-base) var(--ease-standard),box-shadow var(--duration-base) var(--ease-standard)}
.feat-card:hover{transform:translateY(-4px);box-shadow:var(--shadow-md)}
.feat-card__icon{width:44px;height:44px;display:grid;place-items:center;border-radius:var(--radius-md);background:color-mix(in srgb,var(--color-primary) 12%,transparent);color:var(--color-primary);margin-bottom:var(--space-5)}
.feat-card__title{margin:0 0 var(--space-2);font:var(--weight-bold) var(--text-xl)/var(--leading-snug) var(--font-heading);color:var(--color-text)}
.feat-card__text{margin:0 0 var(--space-5);color:var(--color-muted);font-size:var(--text-base);line-height:var(--leading-normal)}
.feat-card__link{color:var(--color-primary);font-weight:var(--weight-medium);text-decoration:none}`,
  },
  {
    slug: "carte-chiffre-cle",
    name: "Cartes chiffres clés",
    category: "cartes",
    site: "pulsor",
    description: "Rangée d'indicateurs : la première carte est mise en avant en plein.",
    style: "minimaliste",
    complexite: "simple",
    html: `<div class="kpi-row">
  <div class="kpi kpi--hero"><span class="kpi__label">Projets livrés</span><strong class="kpi__value">128</strong></div>
  <div class="kpi"><span class="kpi__label">En cours</span><strong class="kpi__value">12</strong></div>
  <div class="kpi"><span class="kpi__label">Satisfaction</span><strong class="kpi__value">98 %</strong></div>
</div>`,
    css: `.kpi-row{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:var(--space-4);width:min(100%,720px)}
@media (max-width:560px){.kpi-row{grid-template-columns:1fr}}
.kpi{border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:var(--space-6);background:var(--color-bg);box-shadow:var(--shadow-sm)}
.kpi--hero{background:var(--color-text);border-color:var(--color-text)}
.kpi__label{display:block;font:var(--weight-medium) var(--text-xs)/1 var(--font-body);letter-spacing:.08em;text-transform:uppercase;color:var(--color-muted)}
.kpi--hero .kpi__label{color:color-mix(in srgb,var(--color-bg) 70%,transparent)}
.kpi__value{display:block;margin-top:var(--space-4);font:var(--weight-bold) var(--text-3xl)/1 var(--font-heading);letter-spacing:-.02em;color:var(--color-text)}
.kpi--hero .kpi__value{color:var(--color-bg)}`,
  },
  {
    slug: "carte-produit",
    name: "Carte offre",
    category: "cartes",
    site: "verdant",
    description: "Carte d'offre avec visuel abstrait, badge et prix.",
    style: "organique",
    complexite: "moyenne",
    html: `<article class="offer-card">
  <div class="offer-card__media"><span class="offer-card__badge">Nouveau</span></div>
  <div class="offer-card__body">
    <h3>Offre Horizon</h3>
    <p>Électricité 100 % renouvelable, prix fixe pendant deux ans.</p>
    <div class="offer-card__foot"><strong>39 €<small>/mois</small></strong><button>Choisir</button></div>
  </div>
</article>`,
    css: `.offer-card{width:320px;background:var(--color-surface);border:1px solid var(--color-border);border-radius:var(--radius-lg);overflow:hidden;box-shadow:var(--shadow-md)}
.offer-card__media{position:relative;height:160px;background:radial-gradient(circle at 30% 30%,var(--color-secondary),transparent 60%),radial-gradient(circle at 80% 70%,var(--color-accent),transparent 55%),var(--color-primary)}
.offer-card__badge{position:absolute;top:var(--space-4);left:var(--space-4);background:var(--color-surface);color:var(--color-primary);font:var(--weight-bold) var(--text-xs)/1 var(--font-body);padding:var(--space-2) var(--space-3);border-radius:var(--radius-full)}
.offer-card__body{padding:var(--space-6)}
.offer-card h3{margin:0 0 var(--space-2);font:var(--weight-bold) var(--text-2xl)/1.1 var(--font-heading);color:var(--color-text)}
.offer-card p{margin:0 0 var(--space-6);color:var(--color-muted);line-height:var(--leading-normal)}
.offer-card__foot{display:flex;align-items:center;justify-content:space-between}
.offer-card__foot strong{font:var(--weight-bold) var(--text-2xl)/1 var(--font-heading);color:var(--color-text)}
.offer-card__foot small{font-size:var(--text-sm);color:var(--color-muted);font-weight:var(--weight-regular)}
.offer-card__foot button{border:0;background:var(--color-primary);color:var(--color-surface);padding:var(--space-3) var(--space-5);border-radius:var(--radius-full);font-weight:var(--weight-medium);cursor:pointer}`,
  },
  {
    slug: "carte-verre",
    name: "Carte verre dépoli",
    category: "cartes",
    site: "glacier",
    description: "Carte bancaire en verre dépoli sur fond de lueurs.",
    style: "glassmorphism",
    complexite: "moyenne",
    html: `<div class="glass-stage">
  <div class="glass-card">
    <div class="glass-card__top"><span>Solde</span><span class="glass-card__chip"></span></div>
    <strong class="glass-card__amount">12 480,00 €</strong>
    <div class="glass-card__bottom"><span>•••• 4821</span><span>09/29</span></div>
  </div>
</div>`,
    css: `.glass-stage{position:relative;padding:var(--space-12)}
.glass-stage::before,.glass-stage::after{content:"";position:absolute;width:180px;height:180px;border-radius:50%;filter:blur(40px);opacity:.8}
.glass-stage::before{background:var(--color-primary);top:0;left:0}
.glass-stage::after{background:var(--color-secondary);bottom:0;right:0}
.glass-card{position:relative;width:340px;padding:var(--space-6);border-radius:var(--radius-lg);background:color-mix(in srgb,var(--color-surface) 45%,transparent);border:1px solid color-mix(in srgb,var(--color-text) 18%,transparent);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);color:var(--color-text);box-shadow:var(--shadow-md)}
.glass-card__top,.glass-card__bottom{display:flex;justify-content:space-between;align-items:center;font:var(--text-sm)/1 var(--font-body);color:var(--color-muted)}
.glass-card__chip{width:36px;height:26px;border-radius:6px;background:linear-gradient(135deg,var(--color-accent),var(--color-primary))}
.glass-card__amount{display:block;margin:var(--space-8) 0;font:var(--weight-bold) var(--text-3xl)/1 var(--font-heading);letter-spacing:-.02em}
.glass-card__bottom{font-family:var(--font-mono)}`,
  },

  // ---------------------------------------------------------------- Inputs
  {
    slug: "champ-label-flottant",
    name: "Champ à label flottant",
    category: "inputs",
    site: "nordwave",
    description: "Input dont le label remonte au focus, sans JavaScript.",
    style: "corporate",
    complexite: "moyenne",
    html: `<label class="float-field">
  <input type="email" placeholder=" " />
  <span>Adresse e-mail</span>
</label>`,
    css: `.float-field{position:relative;display:block;width:320px}
.float-field input{width:100%;font:var(--text-base) var(--font-body);color:var(--color-text);padding:var(--space-6) var(--space-4) var(--space-2);border:1px solid var(--color-border);border-radius:var(--radius-md);background:var(--color-surface);outline:none;transition:border-color var(--duration-fast) var(--ease-standard),box-shadow var(--duration-fast) var(--ease-standard)}
.float-field input:focus{border-color:var(--color-primary);box-shadow:0 0 0 4px color-mix(in srgb,var(--color-primary) 18%,transparent)}
.float-field span{position:absolute;left:var(--space-4);top:50%;transform:translateY(-50%);color:var(--color-muted);font-size:var(--text-base);pointer-events:none;transition:all var(--duration-base) var(--ease-standard)}
.float-field input:focus+span,.float-field input:not(:placeholder-shown)+span{top:var(--space-4);font-size:var(--text-xs);color:var(--color-primary)}`,
  },
  {
    slug: "barre-recherche",
    name: "Barre de recherche",
    category: "inputs",
    site: "pulsor",
    description: "Recherche en pilule avec raccourci clavier affiché.",
    style: "minimaliste",
    complexite: "simple",
    html: `<label class="search-pill">
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
  <input type="search" placeholder="Rechercher un composant" />
  <kbd>⌘K</kbd>
</label>`,
    css: `.search-pill{display:flex;align-items:center;gap:var(--space-3);width:380px;max-width:100%;padding:var(--space-3) var(--space-3) var(--space-3) var(--space-5);border:1px solid var(--color-border);border-radius:var(--radius-full);background:var(--color-surface);color:var(--color-muted);transition:border-color var(--duration-fast) var(--ease-standard)}
.search-pill:focus-within{border-color:var(--color-text);background:var(--color-bg)}
.search-pill input{flex:1;border:0;background:transparent;outline:none;font:var(--text-base) var(--font-body);color:var(--color-text)}
.search-pill kbd{font:var(--text-xs)/1 var(--font-mono);padding:var(--space-2) var(--space-3);border-radius:var(--radius-full);background:var(--color-bg);border:1px solid var(--color-border);color:var(--color-muted)}`,
  },
  {
    slug: "champ-newsletter",
    name: "Inscription newsletter",
    category: "inputs",
    site: "verdant",
    description: "Champ e-mail et bouton accolés dans une même pilule.",
    style: "organique",
    complexite: "simple",
    html: `<form class="news-field" onsubmit="return false">
  <input type="email" placeholder="votre@email.fr" aria-label="E-mail" />
  <button type="submit">S'inscrire</button>
</form>`,
    css: `.news-field{display:flex;width:420px;max-width:100%;padding:var(--space-1);border-radius:var(--radius-full);background:var(--color-surface);border:1px solid var(--color-border);box-shadow:var(--shadow-sm)}
.news-field input{flex:1;min-width:0;border:0;background:transparent;padding:0 var(--space-5);font:var(--text-base) var(--font-body);color:var(--color-text);outline:none}
.news-field button{border:0;border-radius:var(--radius-full);padding:var(--space-3) var(--space-6);background:var(--color-primary);color:var(--color-surface);font:var(--weight-medium) var(--text-base) var(--font-body);cursor:pointer;transition:filter var(--duration-fast) var(--ease-standard)}
.news-field button:hover{filter:brightness(1.1)}`,
  },

  // ---------------------------------------------------------------- Navigation
  {
    slug: "onglets-segmentes",
    name: "Onglets segmentés",
    category: "navigation",
    site: "pulsor",
    description: "Contrôle segmenté en pilule : l'onglet actif ressort en blanc.",
    style: "minimaliste",
    complexite: "simple",
    html: `<nav class="seg" role="tablist">
  <button class="seg__tab is-active" role="tab" aria-selected="true">Aujourd'hui</button>
  <button class="seg__tab" role="tab">Semaine</button>
  <button class="seg__tab" role="tab">Mois</button>
  <button class="seg__tab" role="tab">Archives</button>
</nav>`,
    css: `.seg{display:inline-flex;gap:var(--space-1);padding:var(--space-1);border-radius:var(--radius-full);background:var(--color-surface);border:1px solid var(--color-border)}
.seg__tab{border:0;background:transparent;padding:var(--space-3) var(--space-5);border-radius:var(--radius-full);font:var(--weight-medium) var(--text-sm)/1 var(--font-body);color:var(--color-muted);cursor:pointer;transition:all var(--duration-base) var(--ease-standard)}
.seg__tab:hover{color:var(--color-text)}
.seg__tab.is-active{background:var(--color-bg);color:var(--color-text);box-shadow:var(--shadow-sm)}`,
  },
  {
    slug: "barre-navigation",
    name: "Barre de navigation",
    category: "navigation",
    site: "nordwave",
    description: "Navbar avec logo neutre, liens, et actions ; menu replié en mobile.",
    style: "corporate",
    complexite: "moyenne",
    html: `<header class="nav">
  <a href="#" class="nav__logo"><span class="nav__mark"></span>Marque</a>
  <nav class="nav__links"><a href="#">Produit</a><a href="#">Tarifs</a><a href="#">Ressources</a><a href="#">Contact</a></nav>
  <div class="nav__actions"><a href="#" class="nav__ghost">Connexion</a><a href="#" class="nav__cta">Essai gratuit</a></div>
</header>`,
    css: `.nav{width:100%;max-width:1080px;display:flex;align-items:center;gap:var(--space-8);padding:var(--space-3) var(--space-3) var(--space-3) var(--space-6);background:var(--color-surface);border:1px solid var(--color-border);border-radius:var(--radius-lg);box-shadow:var(--shadow-sm)}
.nav__logo{display:flex;align-items:center;gap:var(--space-2);font:var(--weight-bold) var(--text-lg) var(--font-heading);color:var(--color-text);text-decoration:none}
.nav__mark{width:22px;height:22px;border-radius:var(--radius-sm);background:linear-gradient(135deg,var(--color-primary),var(--color-secondary))}
.nav__links{display:flex;gap:var(--space-6);flex:1}
.nav__links a{color:var(--color-muted);text-decoration:none;font-size:var(--text-sm);font-weight:var(--weight-medium)}
.nav__links a:hover{color:var(--color-text)}
.nav__actions{display:flex;gap:var(--space-2);align-items:center}
.nav__ghost{color:var(--color-text);text-decoration:none;font-size:var(--text-sm);padding:var(--space-3) var(--space-4)}
.nav__cta{background:var(--color-primary);color:#fff;text-decoration:none;font-size:var(--text-sm);font-weight:var(--weight-medium);padding:var(--space-3) var(--space-5);border-radius:var(--radius-md)}
@media (max-width:720px){.nav__links,.nav__ghost{display:none}.nav{justify-content:space-between}}`,
  },
  {
    slug: "fil-ariane",
    name: "Fil d'Ariane",
    category: "navigation",
    site: "maison-lumen",
    description: "Fil d'Ariane éditorial en petites capitales.",
    style: "editorial",
    complexite: "simple",
    html: `<nav class="crumbs" aria-label="Fil d'Ariane">
  <a href="#">Accueil</a><span>/</span><a href="#">Expertises</a><span>/</span><em aria-current="page">Droit des sociétés</em>
</nav>`,
    css: `.crumbs{display:flex;gap:var(--space-3);align-items:center;font:var(--text-sm)/1 var(--font-body);letter-spacing:.14em;text-transform:uppercase}
.crumbs a{color:var(--color-muted);text-decoration:none;transition:color var(--duration-fast) var(--ease-standard)}
.crumbs a:hover{color:var(--color-text)}
.crumbs span{color:var(--color-primary)}
.crumbs em{font-style:normal;color:var(--color-text)}`,
  },

  // ---------------------------------------------------------------- Toggles
  {
    slug: "interrupteur",
    name: "Interrupteur",
    category: "toggles",
    site: "nordwave",
    description: "Switch accessible basé sur une checkbox, sans JavaScript.",
    style: "corporate",
    complexite: "simple",
    html: `<label class="switch"><input type="checkbox" checked /><span class="switch__track"><span class="switch__thumb"></span></span>Notifications</label>`,
    css: `.switch{display:inline-flex;align-items:center;gap:var(--space-3);font:var(--text-base) var(--font-body);color:var(--color-text);cursor:pointer}
.switch input{position:absolute;opacity:0;pointer-events:none}
.switch__track{width:44px;height:26px;border-radius:var(--radius-full);background:var(--color-border);padding:3px;transition:background var(--duration-base) var(--ease-standard)}
.switch__thumb{display:block;width:20px;height:20px;border-radius:50%;background:#fff;box-shadow:var(--shadow-sm);transition:transform var(--duration-base) var(--ease-emphasized)}
.switch input:checked+.switch__track{background:var(--color-primary)}
.switch input:checked+.switch__track .switch__thumb{transform:translateX(18px)}
.switch input:focus-visible+.switch__track{outline:2px solid var(--color-primary);outline-offset:2px}`,
  },
  {
    slug: "interrupteur-brut",
    name: "Bascule OUI / NON",
    category: "toggles",
    site: "atelier-brut",
    description: "Bascule brutaliste à deux états écrits.",
    style: "brutaliste",
    complexite: "simple",
    html: `<label class="brut-toggle"><input type="checkbox" /><span data-on="OUI" data-off="NON"></span></label>`,
    css: `.brut-toggle input{position:absolute;opacity:0}
.brut-toggle span{display:inline-grid;grid-template-columns:1fr 1fr;width:140px;border:3px solid var(--color-border);box-shadow:var(--shadow-sm);font:var(--weight-bold) var(--text-base)/1 var(--font-heading);cursor:pointer;background:var(--color-surface)}
.brut-toggle span::before,.brut-toggle span::after{padding:var(--space-3);text-align:center;transition:background var(--duration-fast) linear}
.brut-toggle span::before{content:attr(data-on)}
.brut-toggle span::after{content:attr(data-off);background:var(--color-text);color:var(--color-surface)}
.brut-toggle input:checked+span::before{background:var(--color-primary)}
.brut-toggle input:checked+span::after{background:transparent;color:var(--color-text)}`,
  },

  // ---------------------------------------------------------------- Loaders
  {
    slug: "loader-points",
    name: "Trois points",
    category: "loaders",
    site: "pulsor",
    description: "Trois points qui rebondissent en décalé.",
    style: "minimaliste",
    complexite: "simple",
    html: `<div class="dots" role="status" aria-label="Chargement"><i></i><i></i><i></i></div>`,
    css: `.dots{display:flex;gap:var(--space-2)}
.dots i{width:12px;height:12px;border-radius:50%;background:var(--color-primary);animation:dots-bounce 1s var(--ease-standard) infinite}
.dots i:nth-child(2){animation-delay:.15s;background:var(--color-secondary)}
.dots i:nth-child(3){animation-delay:.3s;background:var(--color-text)}
@keyframes dots-bounce{0%,80%,100%{transform:translateY(0);opacity:.5}40%{transform:translateY(-12px);opacity:1}}`,
  },
  {
    slug: "loader-anneau",
    name: "Anneau dégradé",
    category: "loaders",
    site: "glacier",
    description: "Anneau en dégradé conique qui tourne, avec masque.",
    style: "glassmorphism",
    complexite: "moyenne",
    html: `<div class="ring" role="status" aria-label="Chargement"></div>`,
    css: `.ring{width:64px;height:64px;border-radius:50%;background:conic-gradient(from 0deg,transparent,var(--color-primary),var(--color-secondary));-webkit-mask:radial-gradient(farthest-side,transparent calc(100% - 6px),#000 calc(100% - 5px));mask:radial-gradient(farthest-side,transparent calc(100% - 6px),#000 calc(100% - 5px));animation:ring-spin 1s linear infinite;filter:drop-shadow(0 0 12px var(--color-primary))}
@keyframes ring-spin{to{transform:rotate(1turn)}}`,
  },
  {
    slug: "loader-barre",
    name: "Barre de progression",
    category: "loaders",
    site: "verdant",
    description: "Barre indéterminée qui glisse, avec libellé.",
    style: "organique",
    complexite: "simple",
    html: `<div class="bar-loader"><span>Calcul de votre estimation…</span><div class="bar-loader__track"><div class="bar-loader__fill"></div></div></div>`,
    css: `.bar-loader{width:320px;font:var(--text-sm) var(--font-body);color:var(--color-muted)}
.bar-loader__track{margin-top:var(--space-3);height:8px;border-radius:var(--radius-full);background:color-mix(in srgb,var(--color-primary) 14%,transparent);overflow:hidden}
.bar-loader__fill{width:40%;height:100%;border-radius:inherit;background:linear-gradient(90deg,var(--color-primary),var(--color-secondary));animation:bar-slide 1.4s var(--ease-standard) infinite}
@keyframes bar-slide{from{transform:translateX(-100%)}to{transform:translateX(250%)}}`,
  },

  // ---------------------------------------------------------------- Badges
  {
    slug: "badges-statut",
    name: "Badges de statut",
    category: "badges",
    site: "nordwave",
    description: "Pastilles de statut avec point coloré : actif, en attente, en retard.",
    style: "corporate",
    complexite: "simple",
    html: `<div class="badges">
  <span class="badge badge--ok">Actif</span>
  <span class="badge badge--wait">En attente</span>
  <span class="badge badge--late">En retard</span>
</div>`,
    css: `.badges{display:flex;gap:var(--space-2);flex-wrap:wrap}
.badge{--tone:var(--color-muted);display:inline-flex;align-items:center;gap:var(--space-2);padding:var(--space-1) var(--space-3);border-radius:var(--radius-full);font:var(--weight-medium) var(--text-sm)/1.6 var(--font-body);color:var(--tone);background:color-mix(in srgb,var(--tone) 12%,transparent)}
.badge::before{content:"";width:6px;height:6px;border-radius:50%;background:currentColor}
.badge--ok{--tone:var(--color-success)}
.badge--wait{--tone:var(--color-accent)}
.badge--late{--tone:var(--color-danger)}`,
  },
  {
    slug: "etiquettes-brut",
    name: "Étiquettes tamponnées",
    category: "badges",
    site: "atelier-brut",
    description: "Étiquettes inclinées façon tampon, ombre dure.",
    style: "brutaliste",
    complexite: "simple",
    html: `<div class="stamps"><span>Branding</span><span>Web</span><span>Motion</span></div>`,
    css: `.stamps{display:flex;gap:var(--space-3)}
.stamps span{padding:var(--space-2) var(--space-4);border:3px solid var(--color-border);background:var(--color-primary);font:var(--weight-bold) var(--text-sm)/1 var(--font-heading);text-transform:uppercase;box-shadow:var(--shadow-sm);transform:rotate(-3deg)}
.stamps span:nth-child(2){background:var(--color-secondary);transform:rotate(2deg)}
.stamps span:nth-child(3){background:var(--color-accent);color:var(--color-surface);transform:rotate(-1deg)}`,
  },

  // ---------------------------------------------------------------- Modales
  {
    slug: "modale-confirmation",
    name: "Modale de confirmation",
    category: "modales",
    site: "nordwave",
    description: "Boîte de dialogue de confirmation d'action destructive.",
    style: "corporate",
    complexite: "moyenne",
    html: `<div class="modal-backdrop">
  <div class="modal" role="dialog" aria-modal="true" aria-labelledby="m-title">
    <div class="modal__icon">!</div>
    <h2 id="m-title">Supprimer le projet ?</h2>
    <p>Cette action est définitive. Les fichiers associés seront supprimés.</p>
    <div class="modal__actions"><button class="modal__ghost">Annuler</button><button class="modal__danger">Supprimer</button></div>
  </div>
</div>`,
    css: `.modal-backdrop{position:fixed;inset:0;display:grid;place-items:center;padding:var(--space-6);background:color-mix(in srgb,var(--color-text) 40%,transparent)}
.modal{width:min(100%,400px);background:var(--color-surface);border-radius:var(--radius-lg);padding:var(--space-8);box-shadow:var(--shadow-lg);animation:modal-in var(--duration-slow) var(--ease-emphasized)}
.modal__icon{width:44px;height:44px;border-radius:50%;display:grid;place-items:center;font-weight:var(--weight-bold);color:var(--color-danger);background:color-mix(in srgb,var(--color-danger) 12%,transparent);margin-bottom:var(--space-5)}
.modal h2{margin:0 0 var(--space-2);font:var(--weight-bold) var(--text-xl)/1.2 var(--font-heading);color:var(--color-text)}
.modal p{margin:0 0 var(--space-8);color:var(--color-muted);line-height:var(--leading-normal)}
.modal__actions{display:flex;gap:var(--space-3);justify-content:flex-end}
.modal__actions button{border-radius:var(--radius-md);padding:var(--space-3) var(--space-5);font:var(--weight-medium) var(--text-sm) var(--font-body);cursor:pointer}
.modal__ghost{background:transparent;border:1px solid var(--color-border);color:var(--color-text)}
.modal__danger{background:var(--color-danger);border:1px solid var(--color-danger);color:#fff}
@keyframes modal-in{from{opacity:0;transform:translateY(12px) scale(.98)}}`,
  },
  {
    slug: "modale-verre",
    name: "Feuille de verre",
    category: "modales",
    site: "glacier",
    description: "Panneau modal en verre dépoli qui monte du bas.",
    style: "glassmorphism",
    complexite: "moyenne",
    html: `<div class="sheet-stage">
  <div class="sheet" role="dialog" aria-modal="true">
    <span class="sheet__grip"></span>
    <h2>Virement envoyé</h2>
    <p>250,00 € vers Compte épargne. Disponible immédiatement.</p>
    <button>Terminé</button>
  </div>
</div>`,
    css: `.sheet-stage{position:fixed;inset:0;display:flex;align-items:flex-end;justify-content:center;padding:var(--space-6);background:radial-gradient(circle at 20% 20%,color-mix(in srgb,var(--color-primary) 50%,transparent),transparent 50%),radial-gradient(circle at 80% 40%,color-mix(in srgb,var(--color-secondary) 40%,transparent),transparent 50%),var(--color-bg)}
.sheet{width:min(100%,420px);text-align:center;padding:var(--space-6) var(--space-8) var(--space-8);border-radius:var(--radius-lg);background:color-mix(in srgb,var(--color-surface) 50%,transparent);border:1px solid color-mix(in srgb,var(--color-text) 14%,transparent);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);color:var(--color-text);animation:sheet-up var(--duration-slow) var(--ease-emphasized)}
.sheet__grip{display:block;width:40px;height:4px;margin:0 auto var(--space-6);border-radius:var(--radius-full);background:var(--color-muted)}
.sheet h2{margin:0 0 var(--space-2);font:var(--weight-bold) var(--text-2xl)/1.2 var(--font-heading)}
.sheet p{margin:0 0 var(--space-6);color:var(--color-muted)}
.sheet button{width:100%;border:0;padding:var(--space-4);border-radius:var(--radius-md);background:var(--color-text);color:var(--color-bg);font:var(--weight-bold) var(--text-base) var(--font-body);cursor:pointer}
@keyframes sheet-up{from{transform:translateY(40px);opacity:0}}`,
  },

  // ---------------------------------------------------------------- Sliders
  {
    slug: "curseur-plage",
    name: "Curseur de valeur",
    category: "sliders",
    site: "verdant",
    description: "Input range stylé avec valeur affichée en direct.",
    style: "organique",
    complexite: "moyenne",
    html: `<div class="range">
  <div class="range__head"><span>Consommation annuelle</span><output id="range-out">4 500 kWh</output></div>
  <input type="range" min="1000" max="12000" step="500" value="4500" oninput="document.getElementById('range-out').textContent=Number(this.value).toLocaleString('fr-FR')+' kWh'" />
</div>`,
    css: `.range{width:360px;font:var(--text-sm) var(--font-body);color:var(--color-muted)}
.range__head{display:flex;justify-content:space-between;margin-bottom:var(--space-4)}
.range output{font:var(--weight-bold) var(--text-lg) var(--font-heading);color:var(--color-text)}
.range input{width:100%;appearance:none;-webkit-appearance:none;height:8px;border-radius:var(--radius-full);background:linear-gradient(90deg,var(--color-primary),var(--color-secondary));outline:none}
.range input::-webkit-slider-thumb{-webkit-appearance:none;width:24px;height:24px;border-radius:50%;background:var(--color-surface);border:3px solid var(--color-primary);box-shadow:var(--shadow-md);cursor:grab}
.range input::-moz-range-thumb{width:20px;height:20px;border-radius:50%;background:var(--color-surface);border:3px solid var(--color-primary);cursor:grab}`,
  },
  {
    slug: "carrousel-defilement",
    name: "Carrousel à aimantation",
    category: "sliders",
    site: "maison-lumen",
    description: "Carrousel horizontal en CSS pur (scroll-snap), cartes éditoriales.",
    style: "editorial",
    complexite: "moyenne",
    html: `<div class="snap">
  <article><small>01</small><h3>Conseil</h3><p>Une analyse claire avant toute décision.</p></article>
  <article><small>02</small><h3>Négociation</h3><p>Défendre vos intérêts à chaque étape.</p></article>
  <article><small>03</small><h3>Contentieux</h3><p>Une stratégie construite pour durer.</p></article>
  <article><small>04</small><h3>Suivi</h3><p>Un interlocuteur unique, disponible.</p></article>
</div>`,
    css: `.snap{display:flex;gap:var(--space-4);width:min(100%,720px);overflow-x:auto;scroll-snap-type:x mandatory;padding-bottom:var(--space-4);scrollbar-width:thin;scrollbar-color:var(--color-primary) transparent}
.snap article{flex:0 0 260px;scroll-snap-align:start;padding:var(--space-8) var(--space-6);border:1px solid var(--color-border);border-radius:var(--radius-md);background:var(--color-surface)}
.snap small{font:var(--text-sm) var(--font-mono);color:var(--color-primary)}
.snap h3{margin:var(--space-10) 0 var(--space-2);font:var(--weight-bold) var(--text-2xl)/1.1 var(--font-heading);color:var(--color-text)}
.snap p{margin:0;color:var(--color-muted);line-height:var(--leading-normal)}`,
  },
];
