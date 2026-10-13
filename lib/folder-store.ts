// Source de données sans base : lit directement les dossiers sites/.
// Utilisée quand DATABASE_URL n'est pas défini (ex. premier déploiement Vercel).
// Mêmes calculs que l'enregistrement en base : couleur dominante, React, tokens, tags.

import { join } from "node:path";
import { colorFamily, dominantColor } from "./color";
import { buildReactSource, extractTokens } from "./jsx";
import { normalizeKit } from "./kit";
import { buildListResult, rankSimilar } from "./list-logic";
import { readSitesDir, tagsFor, type SiteFolder } from "./site-folders";
import { COLOR_FAMILIES } from "./taxonomy";
import type { LibraryStore } from "./library-store";
import type { LibraryElement, SiteSummary } from "./types";

interface Snapshot {
  sites: SiteSummary[];
  elements: LibraryElement[];
  folders: SiteFolder[];
  labels: Map<string, string>;
}

let cache: Snapshot | null = null;

function load(): Snapshot {
  // En développement on relit à chaque requête pour voir tout de suite un fichier modifié.
  if (cache && process.env.NODE_ENV === "production") return cache;
  const folders = readSitesDir(join(process.cwd(), "sites"));
  const labels = new Map<string, string>();
  for (const [k, v] of Object.entries(COLOR_FAMILIES)) labels.set(`couleur:${k}`, v.label);

  const elements: LibraryElement[] = [];
  const sites: SiteSummary[] = [];
  for (const f of folders) {
    const kit = normalizeKit(f.kit);
    const sectorTag = { family: "secteur", value: f.info.sector.value, label: f.info.sector.label };
    labels.set(`site:${f.slug}`, f.info.name);
    labels.set(`secteur:${sectorTag.value}`, sectorTag.label);
    for (const el of f.elements) {
      const tags = [...tagsFor(el, f), sectorTag];
      for (const t of tags) labels.set(`${t.family}:${t.value}`, t.label);
      const dom = dominantColor(el.css, kit.colors);
      elements.push({
        kind: el.kind,
        slug: el.slug,
        name: el.name,
        category: el.category,
        description: el.description || null,
        html: el.html,
        css: el.css,
        react: buildReactSource(el.slug, el.html),
        dependencies: el.dependencies,
        tokensUsed: extractTokens(el.css),
        dominantColor: dom,
        colorFamily: dom ? colorFamily(dom) : null,
        license: el.licence,
        tags,
        site: { slug: f.slug, name: f.info.name, url: f.info.url, sector: f.info.sector.value },
        variants: el.kind === "component" ? el.variants : undefined,
      });
    }
    sites.push({
      slug: f.slug,
      name: f.info.name,
      url: f.info.url,
      sector: f.info.sector.value,
      description: f.info.description,
      status: "VALIDATED",
      tags: [sectorTag],
      kit,
      counts: {
        components: f.elements.filter((e) => e.kind === "component").length,
        sections: f.elements.filter((e) => e.kind === "section").length,
      },
    });
  }
  // Même ordre que la base : par catégorie puis par nom.
  elements.sort((a, b) => a.kind.localeCompare(b.kind) || a.category.localeCompare(b.category) || a.name.localeCompare(b.name, "fr"));
  sites.sort((a, b) => a.name.localeCompare(b.name, "fr"));
  cache = { sites, elements, folders, labels };
  return cache;
}

function matchesQuery(el: LibraryElement, query?: string) {
  const q = query?.trim().toLowerCase();
  if (!q) return true;
  return [el.name, el.description ?? "", el.site.name, ...el.tags.map((t) => t.label)].some((v) => v.toLowerCase().includes(q));
}

export const folderStore: LibraryStore = {
  async list(params) {
    const { elements, labels } = load();
    const candidates = elements.filter(
      (el) =>
        (!params.kind || el.kind === params.kind) &&
        (!params.category || !params.kind || el.category === params.category) &&
        matchesQuery(el, params.query),
    );
    return buildListResult(candidates, params.filters ?? {}, labels, params.limit);
  },

  async search(query, params = {}) {
    return this.list({ ...params, query });
  },

  async get(kind, slug) {
    return load().elements.find((el) => el.kind === kind && el.slug === slug) ?? null;
  },

  async create() {
    throw new Error("Source en lecture seule : ajoute un fichier dans sites/<site>/, ou configure DATABASE_URL.");
  },

  async navCounts() {
    const { elements, sites } = load();
    const count = (kind: LibraryElement["kind"]) => {
      const out: Record<string, number> = {};
      for (const el of elements) if (el.kind === kind) out[el.category] = (out[el.category] ?? 0) + 1;
      return out;
    };
    const components = count("component");
    const sections = count("section");
    return {
      components,
      sections,
      totalComponents: Object.values(components).reduce((a, b) => a + b, 0),
      totalSections: Object.values(sections).reduce((a, b) => a + b, 0),
      kits: sites.map((s) => ({
        slug: s.slug,
        name: s.name,
        count: s.counts.components + s.counts.sections,
        primary: s.kit?.colors.primary ?? null,
      })),
    };
  },

  async listSites() {
    return load().sites;
  },

  async getSite(slug) {
    return load().sites.find((s) => s.slug === slug) ?? null;
  },

  async similar(element, limit = 3) {
    return rankSimilar(element, load().elements.filter((el) => el.kind === element.kind), limit);
  },

  async linked(kind, slug) {
    const { folders, elements } = load();
    const all = folders.flatMap((f) => f.elements);
    const name = (k: LibraryElement["kind"], s: string) => elements.find((e) => e.kind === k && e.slug === s)?.name;
    if (kind === "section") {
      const section = all.find((e) => e.kind === "section" && e.slug === slug);
      return (section?.components ?? [])
        .map((s) => ({ kind: "component" as const, slug: s, name: name("component", s) }))
        .filter((l): l is { kind: "component"; slug: string; name: string } => !!l.name);
    }
    return all
      .filter((e) => e.kind === "section" && e.components.includes(slug))
      .map((e) => ({ kind: "section" as const, slug: e.slug, name: e.name }));
  },
};
