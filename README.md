# Toolbox · librairie UI

Phase 1 du cahier des charges *MCP Librairie UI* : **l'app web**, une galerie façon uiverse.io
pour parcourir, prévisualiser et copier des composants, sections et kits de design.
Pas de connexion : l'app est accessible librement.

## Lancer l'app

Il faut Node 20+ et une base Postgres (locale, Supabase ou Neon).

```bash
npm install
cp .env.example .env        # puis renseigner DATABASE_URL
npm run db:push             # crée les tables
npm run db:seed             # remplit la base avec les données de démo
npm run dev                 # http://localhost:3000
```

`npm run db:reset` vide la base et la remplit à nouveau.

## Ce qu'il y a dedans

- **Explorer** (`/`) : tous les éléments, avec la barre de filtres et les compteurs.
- **Sidebar repliable** : Kits, Sections (Hero, Features, Pricing…), Composants (Boutons, Cartes…),
  Fondations (Couleurs, Typos, Espacements, Ombres, Animations), chaque entrée avec son nombre d'éléments.
- **Multi-filtres** : secteur, couleur dominante (pastilles), style, ambiance, complexité, site d'origine.
  C'est un OU à l'intérieur d'une famille (bleu *ou* vert) et un ET entre familles (bleu *et* SaaS).
  Les compteurs se mettent à jour en direct, et les filtres sont dans l'URL, donc on peut partager une recherche.
- **Aperçus vivants** : chaque élément tourne dans une iframe isolée (`sandbox` sans `allow-same-origin`,
  CSP qui bloque tout accès réseau).
- **Fiche élément** : aperçu desktop / tablette / mobile, bascule clair / sombre, sélecteur de kit pour voir
  l'élément aux couleurs d'un autre site, onglets HTML / CSS / React / Tokens avec bouton copier,
  tags, site d'origine, éléments similaires.
- **Un espace par site** (`/sites/<site>`) : vue d'ensemble, ses sections, ses composants et son
  design system (palette, typo, espacements, rayons, ombres, animations, export CSS / Tailwind v4 / JSON).

## Données

Le schéma Prisma (`prisma/schema.prisma`) compte 5 modèles : `Site`, `TokenKit`, `Component`, `Section`, `Tag`.

- Le code des composants utilise uniquement des variables CSS (`--color-primary`, `--space-4`…),
  ce qui permet d'appliquer n'importe quel composant au kit d'un autre site.
- La **couleur dominante** est calculée automatiquement à l'enregistrement (`lib/color.ts`) : le CSS est lu,
  les variables sont résolues avec le kit, puis la couleur est rangée dans une famille de teinte.
- La version **React** est générée depuis le HTML (`lib/jsx.ts`).

Chaque site a son dossier dans `sites/<site>/` (fiche, kit, composants et sections en `.html`) :
voir [`sites/README.md`](sites/README.md). Ajouter un site = ajouter un dossier puis `npm run db:seed`.

Sites présents : **Pulsor** (tiré de pulsor.agency : 13 composants, 4 sections, kit réel) et 5 sites
fictifs de démonstration (Atelier Brut, Glacier, Maison Lumen, Nordwave, Verdant), à retirer quand
les vrais sites arriveront. Si le dossier `~/mon-clone/components/toolbox` existe (ou celui indiqué
par `TOOLBOX_IMPORT_DIR`), ses `.html` sont aussi importés dans Pulsor.

## Brancher une autre source (Signal)

Tout l'accès aux données passe par `lib/library-store.ts`, derrière une interface fixe
(`list`, `search`, `get`, `create`, plus quelques lectures annexes). Pour brancher Signal, il suffira
d'écrire un `signalStore` qui implémente `LibraryStore` et de l'exporter comme `libraryStore`.
Le reste de l'app ne change pas.

## Structure

```
app/                 pages (App Router)
components/          sidebar, barre de filtres, carte d'aperçu, fiche, kit…
lib/library-store.ts accès aux données (interface + implémentation Prisma)
lib/kit.ts           conversion des kits (CSS, Tailwind, JSON)
lib/preview.ts       document HTML isolé des aperçus
prisma/              schéma et seed (lit le dossier sites/)
sites/               un dossier par site : site.json, kit.json, composants/, sections/
lib/site-folders.ts  lecture des dossiers de sites
```

`components/preview-card.tsx` est la carte d'aperçu partagée. Le sélecteur à 3 choix du MCP
(phase 2) la réutilisera.
