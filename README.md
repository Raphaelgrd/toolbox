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
- **Page kit** : palette, échelle typo, espacements, rayons, ombres, animations, avec export en
  variables CSS, thème Tailwind v4 ou JSON.

## Données

Le schéma Prisma (`prisma/schema.prisma`) compte 5 modèles : `Site`, `TokenKit`, `Component`, `Section`, `Tag`.

- Le code des composants utilise uniquement des variables CSS (`--color-primary`, `--space-4`…),
  ce qui permet d'appliquer n'importe quel composant au kit d'un autre site.
- La **couleur dominante** est calculée automatiquement à l'enregistrement (`lib/color.ts`) : le CSS est lu,
  les variables sont résolues avec le kit, puis la couleur est rangée dans une famille de teinte.
- La version **React** est générée depuis le HTML (`lib/jsx.ts`).

Le seed crée 6 kits fictifs (Pulsor, Maison Lumen, Nordwave, Verdant, Atelier Brut, Glacier),
25 composants et 10 sections. Si le dossier `~/mon-clone/components/toolbox` existe
(ou le dossier indiqué par `TOOLBOX_IMPORT_DIR`), ses fichiers `.html` sont aussi importés.

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
prisma/              schéma, seed et données de démo
```

`components/preview-card.tsx` est la carte d'aperçu partagée. Le sélecteur à 3 choix du MCP
(phase 2) la réutilisera.
