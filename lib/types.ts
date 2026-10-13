import type { ElementKind, FilterFamily } from "./taxonomy";

export interface KitTokens {
  colors: Record<string, string>;
  typography: {
    families: Record<string, string>;
    sizes: Record<string, string>;
    weights: Record<string, string>;
    leading: Record<string, string>;
  };
  spacing: Record<string, string>;
  radii: Record<string, string>;
  shadows: Record<string, string>;
  breakpoints: Record<string, string>;
  motion: { durations: Record<string, string>; easings: Record<string, string> };
}

export interface TagRef {
  family: string;
  value: string;
  label: string;
}

export interface SiteSummary {
  slug: string;
  name: string;
  url: string | null;
  sector: string;
  description: string | null;
  status: "DRAFT" | "VALIDATED";
  tags: TagRef[];
  kit: KitTokens | null;
  counts: { components: number; sections: number };
}

/** Un composant ou une section, tel que l'interface le manipule. */
export interface LibraryElement {
  kind: ElementKind;
  slug: string;
  name: string;
  category: string;
  description: string | null;
  html: string;
  css: string;
  react: string;
  dependencies: string[];
  tokensUsed: string[];
  dominantColor: string | null;
  colorFamily: string | null;
  license: string;
  tags: TagRef[];
  site: { slug: string; name: string; url: string | null; sector: string };
  variants?: unknown;
}

export type Filters = Partial<Record<FilterFamily, string[]>>;

export interface ListParams {
  kind?: ElementKind;
  category?: string;
  query?: string;
  filters?: Filters;
  limit?: number;
}

export interface FacetValue {
  value: string;
  label: string;
  count: number;
  swatch?: string;
}

export interface ListResult {
  items: LibraryElement[];
  total: number;
  /** Compteurs par famille, calculés avec les filtres des autres familles. */
  facets: Record<FilterFamily, FacetValue[]>;
}

export interface NavCounts {
  components: Record<string, number>;
  sections: Record<string, number>;
  totalComponents: number;
  totalSections: number;
  kits: { slug: string; name: string; count: number; primary: string | null }[];
}

export interface CreateElementInput {
  kind: ElementKind;
  slug: string;
  name: string;
  category: string;
  description?: string;
  html: string;
  css: string;
  react?: string;
  dependencies?: string[];
  license?: string;
  siteSlug: string;
  tags?: { family: string; value: string; label?: string }[];
  componentSlugs?: string[];
}
