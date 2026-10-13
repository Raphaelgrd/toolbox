import type { SeedElement } from "./components";

// Sections de démonstration : blocs de page complets, responsives,
// écrits uniquement avec les variables du kit.

export const SECTIONS: SeedElement[] = [
  {
    slug: "hero-editorial-sombre",
    name: "Hero éditorial sombre",
    category: "hero",
    site: "maison-lumen",
    description: "Grand titre serif, filet doré, deux actions et chiffres de confiance.",
    style: "editorial",
    complexite: "moyenne",
    components: ["lien-fleche-filet"],
    html: `<section class="h-ed">
  <p class="h-ed__eyebrow">Cabinet de conseil · depuis 1998</p>
  <h1>Le droit, <em>avec clarté</em> et sang-froid.</h1>
  <p class="h-ed__lead">Nous accompagnons dirigeants et familles dans les décisions qui engagent l'avenir.</p>
  <div class="h-ed__actions"><a href="#" class="h-ed__btn">Prendre rendez-vous</a><a href="#" class="h-ed__link">Nos expertises ⟶</a></div>
  <dl class="h-ed__facts"><div><dt>25 ans</dt><dd>d'exercice</dd></div><div><dt>1 200</dt><dd>dossiers suivis</dd></div><div><dt>4</dt><dd>associés</dd></div></dl>
</section>`,
    css: `.h-ed{padding:var(--space-24) var(--space-8) var(--space-16);max-width:1100px;margin:0 auto;color:var(--color-text)}
.h-ed__eyebrow{margin:0 0 var(--space-8);font:var(--text-sm)/1 var(--font-body);letter-spacing:.18em;text-transform:uppercase;color:var(--color-primary);display:flex;align-items:center;gap:var(--space-4)}
.h-ed__eyebrow::before{content:"";width:48px;height:1px;background:var(--color-primary)}
.h-ed h1{margin:0;font:var(--weight-bold) clamp(44px,7vw,88px)/1.02 var(--font-heading);letter-spacing:-.02em;max-width:14ch}
.h-ed h1 em{color:var(--color-primary)}
.h-ed__lead{max-width:52ch;margin:var(--space-8) 0 var(--space-10);font-size:var(--text-lg);line-height:var(--leading-normal);color:var(--color-muted)}
.h-ed__actions{display:flex;gap:var(--space-8);align-items:center;flex-wrap:wrap}
.h-ed__btn{background:var(--color-primary);color:var(--color-bg);text-decoration:none;padding:var(--space-4) var(--space-8);border-radius:var(--radius-sm);font-weight:var(--weight-medium)}
.h-ed__link{color:var(--color-text);text-decoration:none;border-bottom:1px solid var(--color-primary);padding-bottom:var(--space-1)}
.h-ed__facts{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-8);margin:var(--space-20) 0 0;padding-top:var(--space-8);border-top:1px solid var(--color-border)}
.h-ed__facts dt{font:var(--weight-bold) var(--text-3xl)/1 var(--font-heading)}
.h-ed__facts dd{margin:var(--space-2) 0 0;color:var(--color-muted);font-size:var(--text-sm)}
@media (max-width:640px){.h-ed{padding:var(--space-16) var(--space-5)}.h-ed__facts{grid-template-columns:1fr}}`,
  },
  {
    slug: "hero-saas-capture",
    name: "Hero SaaS avec capture",
    category: "hero",
    site: "nordwave",
    description: "Titre centré, badge d'annonce, CTA doubles et maquette d'interface en dessous.",
    style: "corporate",
    complexite: "avancee",
    components: ["barre-navigation"],
    html: `<section class="h-saas">
  <a href="#" class="h-saas__pill"><span>Nouveau</span>Rapports automatiques →</a>
  <h1>Pilotez vos équipes <br/>sans tableur.</h1>
  <p>Planification, suivi et reporting au même endroit. Prêt en dix minutes.</p>
  <div class="h-saas__ctas"><a href="#" class="is-primary">Essai gratuit</a><a href="#">Voir la démo</a></div>
  <div class="h-saas__shot">
    <div class="h-saas__bar"><i></i><i></i><i></i></div>
    <div class="h-saas__grid"><aside></aside><div class="h-saas__cards"><span></span><span></span><span></span><div class="h-saas__chart"></div></div></div>
  </div>
</section>`,
    css: `.h-saas{text-align:center;padding:var(--space-20) var(--space-6) 0;background:radial-gradient(60% 50% at 50% 0%,color-mix(in srgb,var(--color-primary) 14%,transparent),transparent),var(--color-bg);overflow:hidden}
.h-saas__pill{display:inline-flex;gap:var(--space-3);align-items:center;padding:var(--space-1) var(--space-4) var(--space-1) var(--space-1);border:1px solid var(--color-border);border-radius:var(--radius-full);background:var(--color-surface);color:var(--color-text);text-decoration:none;font-size:var(--text-sm)}
.h-saas__pill span{background:var(--color-primary);color:#fff;padding:var(--space-1) var(--space-3);border-radius:var(--radius-full);font-weight:var(--weight-medium)}
.h-saas h1{margin:var(--space-8) auto var(--space-5);font:var(--weight-bold) clamp(40px,6vw,72px)/1.05 var(--font-heading);letter-spacing:-.03em;color:var(--color-text)}
.h-saas p{margin:0 auto var(--space-8);max-width:46ch;color:var(--color-muted);font-size:var(--text-lg)}
.h-saas__ctas{display:flex;gap:var(--space-3);justify-content:center}
.h-saas__ctas a{padding:var(--space-4) var(--space-6);border-radius:var(--radius-md);text-decoration:none;font-weight:var(--weight-medium);color:var(--color-text);border:1px solid var(--color-border);background:var(--color-surface)}
.h-saas__ctas a.is-primary{background:var(--color-primary);border-color:var(--color-primary);color:#fff;box-shadow:var(--shadow-md)}
.h-saas__shot{max-width:960px;margin:var(--space-16) auto 0;border:1px solid var(--color-border);border-bottom:0;border-radius:var(--radius-lg) var(--radius-lg) 0 0;background:var(--color-surface);box-shadow:var(--shadow-lg);overflow:hidden}
.h-saas__bar{display:flex;gap:6px;padding:var(--space-3) var(--space-4);border-bottom:1px solid var(--color-border)}
.h-saas__bar i{width:10px;height:10px;border-radius:50%;background:var(--color-border)}
.h-saas__grid{display:grid;grid-template-columns:180px 1fr;min-height:300px}
.h-saas__grid aside{border-right:1px solid var(--color-border);background:var(--color-bg)}
.h-saas__cards{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-4);padding:var(--space-6);align-content:start}
.h-saas__cards span{height:72px;border-radius:var(--radius-md);border:1px solid var(--color-border);background:var(--color-bg)}
.h-saas__chart{grid-column:1/-1;height:150px;border-radius:var(--radius-md);background:linear-gradient(180deg,color-mix(in srgb,var(--color-primary) 22%,transparent),transparent),var(--color-bg);border:1px solid var(--color-border)}
@media (max-width:640px){.h-saas__grid{grid-template-columns:1fr}.h-saas__grid aside{display:none}.h-saas__cards{grid-template-columns:1fr 1fr}}`,
  },
  {
    slug: "features-grille-icones",
    name: "Grille de fonctionnalités",
    category: "features",
    site: "nordwave",
    description: "Titre de section et grille 3 colonnes de cartes à pictogramme.",
    style: "corporate",
    complexite: "moyenne",
    components: ["carte-fonctionnalite"],
    html: `<section class="feat">
  <header><p class="feat__kicker">Fonctionnalités</p><h2>Tout ce qu'il faut, rien de trop.</h2></header>
  <div class="feat__grid">
    <article><b>⚡</b><h3>Automatisations</h3><p>Des règles simples pour les tâches répétitives.</p></article>
    <article><b>◎</b><h3>Objectifs</h3><p>Suivez la progression de chaque équipe.</p></article>
    <article><b>⌘</b><h3>Raccourcis</h3><p>Tout est accessible au clavier.</p></article>
    <article><b>↻</b><h3>Synchronisation</h3><p>Vos outils restent à jour en temps réel.</p></article>
    <article><b>◐</b><h3>Mode sombre</h3><p>Pour les longues journées.</p></article>
    <article><b>✓</b><h3>Validation</h3><p>Circuits d'approbation en deux clics.</p></article>
  </div>
</section>`,
    css: `.feat{padding:var(--space-20) var(--space-6);max-width:1120px;margin:0 auto}
.feat header{text-align:center;margin-bottom:var(--space-12)}
.feat__kicker{margin:0 0 var(--space-3);color:var(--color-primary);font-weight:var(--weight-bold);font-size:var(--text-sm);text-transform:uppercase;letter-spacing:.1em}
.feat h2{margin:0;font:var(--weight-bold) var(--text-4xl)/1.1 var(--font-heading);letter-spacing:-.02em;color:var(--color-text)}
.feat__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-5)}
.feat article{padding:var(--space-8);background:var(--color-surface);border:1px solid var(--color-border);border-radius:var(--radius-lg)}
.feat b{display:grid;place-items:center;width:44px;height:44px;border-radius:var(--radius-md);background:color-mix(in srgb,var(--color-primary) 12%,transparent);color:var(--color-primary);font-size:var(--text-lg)}
.feat h3{margin:var(--space-5) 0 var(--space-2);font:var(--weight-bold) var(--text-lg) var(--font-heading);color:var(--color-text)}
.feat article p{margin:0;color:var(--color-muted);line-height:var(--leading-normal)}
@media (max-width:860px){.feat__grid{grid-template-columns:1fr 1fr}}
@media (max-width:560px){.feat__grid{grid-template-columns:1fr}.feat h2{font-size:var(--text-3xl)}}`,
  },
  {
    slug: "features-blocs-brut",
    name: "Blocs services brutalistes",
    category: "features",
    site: "atelier-brut",
    description: "Liste de services numérotés en gros blocs, bordures épaisses.",
    style: "brutaliste",
    complexite: "simple",
    components: ["etiquettes-brut"],
    html: `<section class="svc">
  <h2>Ce qu'on fait.</h2>
  <ol>
    <li><span>01</span><strong>Identité</strong><p>Logos, systèmes, chartes qui tiennent debout.</p></li>
    <li><span>02</span><strong>Sites</strong><p>Rapides, lisibles, impossibles à oublier.</p></li>
    <li><span>03</span><strong>Motion</strong><p>Du mouvement qui sert le propos.</p></li>
  </ol>
</section>`,
    css: `.svc{padding:var(--space-16) var(--space-6);max-width:1100px;margin:0 auto}
.svc h2{margin:0 0 var(--space-8);font:var(--weight-bold) clamp(48px,9vw,120px)/.9 var(--font-heading);text-transform:uppercase;color:var(--color-text)}
.svc ol{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(3,1fr);border:3px solid var(--color-border);box-shadow:var(--shadow-lg);background:var(--color-surface)}
.svc li{padding:var(--space-8);border-right:3px solid var(--color-border)}
.svc li:last-child{border-right:0}
.svc li:nth-child(2){background:var(--color-primary)}
.svc span{font:var(--weight-bold) var(--text-sm) var(--font-body)}
.svc strong{display:block;margin:var(--space-10) 0 var(--space-3);font:var(--weight-bold) var(--text-3xl)/1 var(--font-heading);text-transform:uppercase}
.svc p{margin:0;font:var(--text-sm)/1.6 var(--font-body)}
@media (max-width:720px){.svc ol{grid-template-columns:1fr}.svc li{border-right:0;border-bottom:3px solid var(--color-border)}.svc li:last-child{border-bottom:0}}`,
  },
  {
    slug: "pricing-trois-offres",
    name: "Tarifs trois offres",
    category: "pricing",
    site: "pulsor",
    description: "Trois colonnes de prix, l'offre centrale mise en avant en noir.",
    style: "minimaliste",
    complexite: "moyenne",
    components: ["bouton-pilule"],
    html: `<section class="price">
  <h2>Des tarifs simples.</h2>
  <p class="price__sub">Sans engagement. Changez d'offre quand vous voulez.</p>
  <div class="price__grid">
    <article><h3>Essentiel</h3><strong>0 €</strong><ul><li>3 projets</li><li>1 membre</li><li>Support e-mail</li></ul><a href="#">Commencer</a></article>
    <article class="is-featured"><span class="price__tag">Populaire</span><h3>Studio</h3><strong>29 €</strong><ul><li>Projets illimités</li><li>5 membres</li><li>Support prioritaire</li></ul><a href="#">Essayer 14 jours</a></article>
    <article><h3>Équipe</h3><strong>79 €</strong><ul><li>Tout Studio</li><li>Membres illimités</li><li>Accompagnement</li></ul><a href="#">Nous contacter</a></article>
  </div>
</section>`,
    css: `.price{padding:var(--space-20) var(--space-6);max-width:1080px;margin:0 auto;text-align:center}
.price h2{margin:0;font:var(--weight-bold) var(--text-4xl)/1.1 var(--font-heading);letter-spacing:-.03em;color:var(--color-text)}
.price__sub{margin:var(--space-3) 0 var(--space-12);color:var(--color-muted);font-size:var(--text-lg)}
.price__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-4);text-align:left;align-items:stretch}
.price article{position:relative;display:flex;flex-direction:column;padding:var(--space-8);border:1px solid var(--color-border);border-radius:var(--radius-lg);background:var(--color-bg);box-shadow:var(--shadow-sm)}
.price article.is-featured{background:var(--color-text);color:var(--color-bg);border-color:var(--color-text)}
.price__tag{position:absolute;top:var(--space-6);right:var(--space-6);font:var(--weight-bold) var(--text-xs)/1 var(--font-body);padding:var(--space-2) var(--space-3);border-radius:var(--radius-full);background:linear-gradient(90deg,var(--color-primary),var(--color-secondary));color:#fff}
.price h3{margin:0;font:var(--weight-medium) var(--text-sm) var(--font-body);text-transform:uppercase;letter-spacing:.08em;color:var(--color-muted)}
.price strong{display:block;margin:var(--space-4) 0 var(--space-6);font:var(--weight-bold) var(--text-5xl)/1 var(--font-heading);letter-spacing:-.03em}
.price ul{list-style:none;margin:0 0 var(--space-8);padding:0;display:grid;gap:var(--space-3);flex:1}
.price li::before{content:"✓ ";color:var(--color-primary)}
.price article a{display:block;text-align:center;padding:var(--space-4);border-radius:var(--radius-full);text-decoration:none;font-weight:var(--weight-medium);border:1px solid var(--color-border);color:inherit}
.price article.is-featured a{background:var(--color-bg);color:var(--color-text);border-color:var(--color-bg)}
@media (max-width:820px){.price__grid{grid-template-columns:1fr}}`,
  },
  {
    slug: "temoignages-citations",
    name: "Témoignages en citations",
    category: "temoignages",
    site: "verdant",
    description: "Une grande citation et deux plus petites, avatars en initiales.",
    style: "organique",
    complexite: "simple",
    html: `<section class="quotes">
  <figure class="quotes__main"><blockquote>« La facture a baissé dès le premier hiver, et on sait enfin d'où vient notre électricité. »</blockquote><figcaption><span>CL</span>Claire L. · Lyon</figcaption></figure>
  <div class="quotes__side">
    <figure><blockquote>« Souscription en dix minutes, vraiment. »</blockquote><figcaption><span>MB</span>Marc B.</figcaption></figure>
    <figure><blockquote>« Un service client qui répond, et qui sait. »</blockquote><figcaption><span>SA</span>Sofia A.</figcaption></figure>
  </div>
</section>`,
    css: `.quotes{display:grid;grid-template-columns:1.4fr 1fr;gap:var(--space-5);padding:var(--space-20) var(--space-6);max-width:1100px;margin:0 auto}
.quotes figure{margin:0;padding:var(--space-8);border-radius:var(--radius-lg);background:var(--color-surface);border:1px solid var(--color-border);display:flex;flex-direction:column;justify-content:space-between;gap:var(--space-8)}
.quotes__main{background:var(--color-primary)!important;color:var(--color-surface);border:0!important}
.quotes__main blockquote{font:var(--weight-bold) var(--text-3xl)/1.25 var(--font-heading)}
.quotes__side{display:grid;gap:var(--space-5)}
.quotes blockquote{margin:0;font:var(--text-xl)/1.4 var(--font-heading);color:inherit}
.quotes__side blockquote{color:var(--color-text)}
.quotes figcaption{display:flex;align-items:center;gap:var(--space-3);font-size:var(--text-sm);color:var(--color-muted)}
.quotes__main figcaption{color:color-mix(in srgb,var(--color-surface) 80%,transparent)}
.quotes figcaption span{width:36px;height:36px;border-radius:50%;display:grid;place-items:center;background:var(--color-secondary);color:var(--color-text);font-weight:var(--weight-bold);font-size:var(--text-xs)}
@media (max-width:760px){.quotes{grid-template-columns:1fr}.quotes__main blockquote{font-size:var(--text-2xl)}}`,
  },
  {
    slug: "cta-bandeau-brut",
    name: "Bandeau CTA défilant",
    category: "cta",
    site: "atelier-brut",
    description: "Bandeau texte défilant en boucle et bouton à ombre dure.",
    style: "brutaliste",
    complexite: "moyenne",
    components: ["bouton-ombre-dure"],
    html: `<section class="cta-brut">
  <div class="cta-brut__marquee"><div>Un projet ? Parlons-en ✶ Un projet ? Parlons-en ✶ Un projet ? Parlons-en ✶ Un projet ? Parlons-en ✶&nbsp;</div><div aria-hidden="true">Un projet ? Parlons-en ✶ Un projet ? Parlons-en ✶ Un projet ? Parlons-en ✶ Un projet ? Parlons-en ✶&nbsp;</div></div>
  <div class="cta-brut__body"><p>Réponse sous 48 h. Devis gratuit.</p><a href="#">Écrire au studio</a></div>
</section>`,
    css: `.cta-brut{border-block:3px solid var(--color-border);background:var(--color-primary);overflow:hidden}
.cta-brut__marquee{display:flex;white-space:nowrap;border-bottom:3px solid var(--color-border);padding:var(--space-5) 0;font:var(--weight-bold) var(--text-4xl)/1 var(--font-heading);text-transform:uppercase;color:var(--color-text)}
.cta-brut__marquee div{animation:marquee 18s linear infinite;padding-right:var(--space-4)}
@keyframes marquee{to{transform:translateX(-100%)}}
.cta-brut__body{display:flex;justify-content:space-between;align-items:center;gap:var(--space-6);padding:var(--space-10) var(--space-8);background:var(--color-bg);flex-wrap:wrap}
.cta-brut__body p{margin:0;font:var(--text-lg) var(--font-body);color:var(--color-text)}
.cta-brut__body a{padding:var(--space-4) var(--space-8);background:var(--color-secondary);color:var(--color-text);border:3px solid var(--color-border);box-shadow:var(--shadow-md);text-decoration:none;font:var(--weight-bold) var(--text-lg) var(--font-heading);text-transform:uppercase}
.cta-brut__body a:hover{transform:translate(-2px,-2px);box-shadow:var(--shadow-lg)}`,
  },
  {
    slug: "faq-accordeon",
    name: "FAQ accordéon",
    category: "faq",
    site: "maison-lumen",
    description: "Questions fréquentes en accordéon natif (details/summary).",
    style: "editorial",
    complexite: "simple",
    html: `<section class="faq">
  <h2>Questions fréquentes</h2>
  <details open><summary>Comment se déroule un premier rendez-vous ?</summary><p>Une heure d'échange pour comprendre la situation et poser un premier diagnostic, sans engagement.</p></details>
  <details><summary>Quels sont vos honoraires ?</summary><p>Forfait ou temps passé selon le dossier ; une convention écrite est remise avant toute intervention.</p></details>
  <details><summary>Intervenez-vous à distance ?</summary><p>Oui, la plupart des échanges peuvent se tenir en visioconférence.</p></details>
  <details><summary>Sous quel délai pouvez-vous intervenir ?</summary><p>En urgence sous 24 h, sinon dans la semaine.</p></details>
</section>`,
    css: `.faq{max-width:760px;margin:0 auto;padding:var(--space-20) var(--space-6);color:var(--color-text)}
.faq h2{margin:0 0 var(--space-10);font:var(--weight-bold) var(--text-4xl)/1.1 var(--font-heading)}
.faq details{border-top:1px solid var(--color-border)}
.faq details:last-child{border-bottom:1px solid var(--color-border)}
.faq summary{list-style:none;cursor:pointer;display:flex;justify-content:space-between;gap:var(--space-6);padding:var(--space-6) 0;font:var(--text-xl)/1.3 var(--font-heading)}
.faq summary::-webkit-details-marker{display:none}
.faq summary::after{content:"+";color:var(--color-primary);font-family:var(--font-body);transition:transform var(--duration-base) var(--ease-standard)}
.faq details[open] summary::after{transform:rotate(45deg)}
.faq details p{margin:0 0 var(--space-6);color:var(--color-muted);line-height:var(--leading-normal);max-width:60ch}`,
  },
  {
    slug: "footer-colonnes",
    name: "Footer en colonnes",
    category: "footer",
    site: "pulsor",
    description: "Footer sombre : marque, colonnes de liens, newsletter et mentions.",
    style: "minimaliste",
    complexite: "moyenne",
    components: ["barre-recherche"],
    html: `<footer class="foot">
  <div class="foot__top">
    <div class="foot__brand"><span class="foot__mark"></span><p>Des interfaces nettes, livrées vite.</p></div>
    <nav><h4>Produit</h4><a href="#">Fonctionnalités</a><a href="#">Tarifs</a><a href="#">Nouveautés</a></nav>
    <nav><h4>Ressources</h4><a href="#">Guides</a><a href="#">Modèles</a><a href="#">Aide</a></nav>
    <nav><h4>Société</h4><a href="#">À propos</a><a href="#">Carrières</a><a href="#">Contact</a></nav>
  </div>
  <div class="foot__bottom"><span>© 2026 Marque</span><span>Mentions légales · Confidentialité</span></div>
</footer>`,
    css: `.foot{background:var(--color-text);color:var(--color-bg);padding:var(--space-16) var(--space-8) var(--space-8);border-radius:var(--radius-lg) var(--radius-lg) 0 0}
.foot__top{display:grid;grid-template-columns:2fr repeat(3,1fr);gap:var(--space-10);max-width:1120px;margin:0 auto}
.foot__mark{display:block;width:36px;height:36px;border-radius:var(--radius-sm);background:linear-gradient(135deg,var(--color-primary),var(--color-secondary))}
.foot__brand p{margin:var(--space-5) 0 0;max-width:28ch;color:color-mix(in srgb,var(--color-bg) 65%,transparent);line-height:var(--leading-normal)}
.foot h4{margin:0 0 var(--space-4);font:var(--weight-medium) var(--text-xs) var(--font-body);letter-spacing:.1em;text-transform:uppercase;color:color-mix(in srgb,var(--color-bg) 55%,transparent)}
.foot nav{display:grid;gap:var(--space-3);align-content:start}
.foot nav a{color:var(--color-bg);text-decoration:none;font-size:var(--text-sm)}
.foot nav a:hover{color:var(--color-secondary)}
.foot__bottom{display:flex;justify-content:space-between;gap:var(--space-4);flex-wrap:wrap;max-width:1120px;margin:var(--space-16) auto 0;padding-top:var(--space-6);border-top:1px solid color-mix(in srgb,var(--color-bg) 15%,transparent);font-size:var(--text-xs);color:color-mix(in srgb,var(--color-bg) 55%,transparent)}
@media (max-width:720px){.foot__top{grid-template-columns:1fr 1fr}.foot__brand{grid-column:1/-1}}`,
  },
  {
    slug: "contact-formulaire",
    name: "Contact avec formulaire",
    category: "contact",
    site: "verdant",
    description: "Deux colonnes : coordonnées à gauche, formulaire à droite.",
    style: "organique",
    complexite: "moyenne",
    components: ["champ-newsletter"],
    html: `<section class="contact">
  <div class="contact__info">
    <h2>Une question sur votre contrat ?</h2>
    <p>Notre équipe répond du lundi au samedi, de 8 h à 20 h.</p>
    <ul><li><b>Téléphone</b>01 23 45 67 89</li><li><b>E-mail</b>bonjour@exemple.fr</li></ul>
  </div>
  <form class="contact__form" onsubmit="return false">
    <label>Nom<input type="text" placeholder="Votre nom" /></label>
    <label>E-mail<input type="email" placeholder="vous@exemple.fr" /></label>
    <label class="is-full">Message<textarea rows="4" placeholder="Votre message"></textarea></label>
    <button type="submit">Envoyer</button>
  </form>
</section>`,
    css: `.contact{display:grid;grid-template-columns:1fr 1.2fr;gap:var(--space-12);max-width:1080px;margin:0 auto;padding:var(--space-20) var(--space-6)}
.contact h2{margin:0;font:var(--weight-bold) var(--text-4xl)/1.1 var(--font-heading);color:var(--color-text)}
.contact__info p{color:var(--color-muted);line-height:var(--leading-normal);margin:var(--space-5) 0 var(--space-8)}
.contact ul{list-style:none;margin:0;padding:0;display:grid;gap:var(--space-4)}
.contact li{display:grid;gap:var(--space-1);color:var(--color-text)}
.contact li b{font-size:var(--text-xs);text-transform:uppercase;letter-spacing:.1em;color:var(--color-primary)}
.contact__form{display:grid;grid-template-columns:1fr 1fr;gap:var(--space-4);padding:var(--space-8);background:var(--color-surface);border:1px solid var(--color-border);border-radius:var(--radius-lg);box-shadow:var(--shadow-md)}
.contact__form label{display:grid;gap:var(--space-2);font-size:var(--text-sm);font-weight:var(--weight-medium);color:var(--color-text)}
.contact__form .is-full{grid-column:1/-1}
.contact__form input,.contact__form textarea{font:var(--text-base) var(--font-body);padding:var(--space-3) var(--space-4);border:1px solid var(--color-border);border-radius:var(--radius-md);background:var(--color-bg);color:var(--color-text);resize:vertical}
.contact__form input:focus,.contact__form textarea:focus{outline:2px solid var(--color-primary);outline-offset:1px}
.contact__form button{grid-column:1/-1;border:0;padding:var(--space-4);border-radius:var(--radius-full);background:var(--color-primary);color:var(--color-surface);font:var(--weight-bold) var(--text-base) var(--font-body);cursor:pointer}
@media (max-width:760px){.contact{grid-template-columns:1fr}.contact__form{grid-template-columns:1fr}}`,
  },
];
