// Point d'accès unique aux données de la librairie.
//
// L'interface `LibraryStore` est fixe : l'app web (et plus tard le MCP) ne connaît
// qu'elle. Aujourd'hui elle est implémentée sur Postgres via Prisma ; demain on
// branchera Signal derrière la même interface sans toucher au reste.

import type { Prisma } from "@prisma/client";
import { prisma } from "./db";
import { colorFamily, dominantColor } from "./color";
import { buildReactSource, extractTokens } from "./jsx";
import { normalizeKit } from "./kit";
import { folderStore } from "./folder-store";
import { buildListResult, rankSimilar } from "./list-logic";
import { COLOR_FAMILIES, FILTER_FAMILIES, type ElementKind } from "./taxonomy";
import type {
  CreateElementInput,
  Filters,
  KitTokens,
  LibraryElement,
  ListParams,
  ListResult,
  NavCounts,
  SiteSummary,
  TagRef,
} from "./types";

export interface LibraryStore {
  /** Liste filtrée + compteurs par famille de filtre. */
  list(params: ListParams): Promise<ListResult>;
  /** Recherche texte (nom, description, tags) combinable avec les filtres. */
  search(query: string, params?: Omit<ListParams, "query">): Promise<ListResult>;
  /** Un élément complet par son identifiant. */
  get(kind: ElementKind, slug: string): Promise<LibraryElement | null>;
  /** Enregistre un composant ou une section (code nettoyé, tags, site d'origine). */
  create(input: CreateElementInput): Promise<LibraryElement>;

  // Lectures annexes utilisées par la navigation et les fiches.
  navCounts(): Promise<NavCounts>;
  listSites(): Promise<SiteSummary[]>;
  getSite(slug: string): Promise<SiteSummary | null>;
  similar(element: LibraryElement, limit?: number): Promise<LibraryElement[]>;
  /** Section -> composants qu'elle contient ; composant -> sections qui l'utilisent. */
  linked(kind: ElementKind, slug: string): Promise<{ kind: ElementKind; slug: string; name: string }[]>;
}

// ---------------------------------------------------------------------------
// Implémentation Prisma

const siteInclude = { select: { slug: true, name: true, url: true, sector: true, tags: true } } as const;

type ComponentRow = Prisma.ComponentGetPayload<{ include: { tags: true; site: typeof siteInclude } }>;
type SectionRow = Prisma.SectionGetPayload<{ include: { tags: true; site: typeof siteInclude } }>;

function toTagRef(t: { family: string; value: string; label: string }): TagRef {
  return { family: t.family, value: t.value, label: t.label };
}

function toElement(kind: ElementKind, row: ComponentRow | SectionRow): LibraryElement {
  const category = kind === "component" ? (row as ComponentRow).category : (row as SectionRow).type;
  // Le secteur est porté par le site : on l'hérite pour que le filtre secteur marche partout.
  const ownTags = row.tags.map(toTagRef);
  const inherited = row.site.tags
    .filter((t) => t.family === "secteur" && !ownTags.some((o) => o.family === t.family && o.value === t.value))
    .map(toTagRef);
  return {
    kind,
    slug: row.slug,
    name: row.name,
    category,
    description: row.description,
    html: row.html,
    css: row.css,
    react: row.react,
    dependencies: row.dependencies,
    tokensUsed: row.tokensUsed,
    dominantColor: row.dominantColor,
    colorFamily: row.colorFamily,
    license: row.license,
    tags: [...ownTags, ...inherited],
    site: { slug: row.site.slug, name: row.site.name, url: row.site.url, sector: row.site.sector },
    variants: kind === "component" ? (row as ComponentRow).variants : undefined,
  };
}

function textWhere(query?: string) {
  const q = query?.trim();
  if (!q) return {};
  return {
    OR: [
      { name: { contains: q, mode: "insensitive" as const } },
      { description: { contains: q, mode: "insensitive" as const } },
      { tags: { some: { label: { contains: q, mode: "insensitive" as const } } } },
      { site: { name: { contains: q, mode: "insensitive" as const } } },
    ],
  };
}

async function loadCandidates(params: ListParams): Promise<LibraryElement[]> {
  const include = { tags: true, site: siteInclude } as const;
  const text = textWhere(params.query);
  const out: LibraryElement[] = [];
  if (params.kind !== "section") {
    const rows = await prisma.component.findMany({
      where: { ...text, ...(params.kind === "component" && params.category ? { category: params.category } : {}) },
      include,
      orderBy: [{ category: "asc" }, { name: "asc" }],
    });
    out.push(...rows.map((r) => toElement("component", r)));
  }
  if (params.kind !== "component") {
    const rows = await prisma.section.findMany({
      where: { ...text, ...(params.kind === "section" && params.category ? { type: params.category } : {}) },
      include,
      orderBy: [{ type: "asc" }, { name: "asc" }],
    });
    out.push(...rows.map((r) => toElement("section", r)));
  }
  return out;
}

async function facetLabels(): Promise<Map<string, string>> {
  const [tags, sites] = await Promise.all([
    prisma.tag.findMany({ select: { family: true, value: true, label: true } }),
    prisma.site.findMany({ select: { slug: true, name: true } }),
  ]);
  const labels = new Map<string, string>();
  for (const t of tags) labels.set(`${t.family}:${t.value}`, t.label);
  for (const s of sites) labels.set(`site:${s.slug}`, s.name);
  for (const [k, v] of Object.entries(COLOR_FAMILIES)) labels.set(`couleur:${k}`, v.label);
  return labels;
}

function toSiteSummary(
  s: Prisma.SiteGetPayload<{ include: { kit: true; tags: true; _count: { select: { components: true; sections: true } } } }>,
): SiteSummary {
  return {
    slug: s.slug,
    name: s.name,
    url: s.url,
    sector: s.sector,
    description: s.description,
    status: s.status,
    tags: s.tags.map(toTagRef),
    kit: s.kit
      ? normalizeKit({
          colors: s.kit.colors,
          typography: s.kit.typography,
          spacing: s.kit.spacing,
          radii: s.kit.radii,
          shadows: s.kit.shadows,
          breakpoints: s.kit.breakpoints,
          motion: s.kit.motion,
        } as unknown as KitTokens)
      : null,
    counts: { components: s._count.components, sections: s._count.sections },
  };
}

const siteSummaryInclude = {
  kit: true,
  tags: true,
  _count: { select: { components: true, sections: true } },
} as const;

export const prismaStore: LibraryStore = {
  async list(params) {
    const filters = params.filters ?? {};
    const [candidates, labels] = await Promise.all([loadCandidates(params), facetLabels()]);

    return buildListResult(candidates, filters, labels, params.limit);
  },

  async search(query, params = {}) {
    return this.list({ ...params, query });
  },

  async get(kind, slug) {
    const include = { tags: true, site: siteInclude } as const;
    if (kind === "component") {
      const row = await prisma.component.findUnique({ where: { slug }, include });
      return row ? toElement("component", row) : null;
    }
    const row = await prisma.section.findUnique({ where: { slug }, include });
    return row ? toElement("section", row) : null;
  },

  async create(input) {
    const site = await prisma.site.findUniqueOrThrow({ where: { slug: input.siteSlug }, include: { kit: true } });
    const colors = (site.kit?.colors ?? {}) as Record<string, string>;
    const dom = dominantColor(input.css, colors);
    const tagConnect = await Promise.all(
      (input.tags ?? []).map((t) =>
        prisma.tag.upsert({
          where: { family_value: { family: t.family, value: t.value } },
          update: {},
          create: { family: t.family, value: t.value, label: t.label ?? t.value },
          select: { id: true },
        }),
      ),
    );
    const common = {
      slug: input.slug,
      name: input.name,
      description: input.description,
      html: input.html,
      css: input.css,
      react: input.react ?? buildReactSource(input.slug, input.html),
      dependencies: input.dependencies ?? [],
      tokensUsed: extractTokens(input.css),
      dominantColor: dom,
      colorFamily: dom ? colorFamily(dom) : null,
      license: input.license ?? "libre",
      site: { connect: { id: site.id } },
      tags: { connect: tagConnect },
    };
    if (input.kind === "component") {
      await prisma.component.create({ data: { ...common, category: input.category } });
    } else {
      await prisma.section.create({
        data: {
          ...common,
          type: input.category,
          components: input.componentSlugs?.length
            ? { connect: input.componentSlugs.map((slug) => ({ slug })) }
            : undefined,
        },
      });
    }
    return (await this.get(input.kind, input.slug))!;
  },

  async navCounts() {
    const [byCat, byType, sites] = await Promise.all([
      prisma.component.groupBy({ by: ["category"], _count: { _all: true } }),
      prisma.section.groupBy({ by: ["type"], _count: { _all: true } }),
      prisma.site.findMany({
        orderBy: { name: "asc" },
        include: { kit: { select: { colors: true } }, _count: { select: { components: true, sections: true } } },
      }),
    ]);
    const components = Object.fromEntries(byCat.map((r) => [r.category, r._count._all]));
    const sections = Object.fromEntries(byType.map((r) => [r.type, r._count._all]));
    return {
      components,
      sections,
      totalComponents: Object.values(components).reduce((a, b) => a + b, 0),
      totalSections: Object.values(sections).reduce((a, b) => a + b, 0),
      kits: sites.map((s) => ({
        slug: s.slug,
        name: s.name,
        count: s._count.components + s._count.sections,
        primary: ((s.kit?.colors ?? {}) as Record<string, string>).primary ?? null,
      })),
    };
  },

  async listSites() {
    const sites = await prisma.site.findMany({ orderBy: { name: "asc" }, include: siteSummaryInclude });
    return sites.map(toSiteSummary);
  },

  async getSite(slug) {
    const s = await prisma.site.findUnique({ where: { slug }, include: siteSummaryInclude });
    return s ? toSiteSummary(s) : null;
  },

  async similar(element, limit = 3) {
    const { items } = await this.list({ kind: element.kind });
    return rankSimilar(element, items, limit);
  },

  async linked(kind, slug) {
    if (kind === "section") {
      const row = await prisma.section.findUnique({ where: { slug }, select: { components: { select: { slug: true, name: true } } } });
      return (row?.components ?? []).map((c) => ({ kind: "component" as const, ...c }));
    }
    const row = await prisma.component.findUnique({ where: { slug }, select: { sections: { select: { slug: true, name: true } } } });
    return (row?.sections ?? []).map((c) => ({ kind: "section" as const, ...c }));
  },
};

/**
 * La source active : les dossiers sites/ par défaut (rien à configurer).
 * Postgres seulement si LIBRARY_SOURCE=postgres est défini explicitement, une fois la base
 * créée et remplie (`npm run db:push && npm run db:seed`). Un simple DATABASE_URL ne suffit pas :
 * une intégration Vercel peut l'ajouter sur une base encore vide.
 * Pour brancher Signal : exporter ici un `signalStore` qui implémente LibraryStore.
 */
export const libraryStore: LibraryStore = process.env.LIBRARY_SOURCE === "postgres" ? prismaStore : folderStore;

// ---------------------------------------------------------------------------
// Filtres <-> URL (partagés par la barre de filtres et les pages serveur)

export function filtersFromSearchParams(sp: Record<string, string | string[] | undefined>): Filters {
  const filters: Filters = {};
  for (const { key } of FILTER_FAMILIES) {
    const raw = sp[key];
    const str = Array.isArray(raw) ? raw.join(",") : raw;
    const values = str?.split(",").map((v) => v.trim()).filter(Boolean);
    if (values?.length) filters[key] = values;
  }
  return filters;
}
