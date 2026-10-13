// Logique de liste partagée par toutes les sources de données :
// filtres combinables (OU dans une famille, ET entre familles), compteurs, similarité.

import { COLOR_FAMILIES, FILTER_FAMILIES, type FilterFamily } from "./taxonomy";
import type { FacetValue, Filters, LibraryElement, ListResult } from "./types";

export function valuesOf(el: LibraryElement, family: FilterFamily): string[] {
  if (family === "couleur") return el.colorFamily ? [el.colorFamily] : [];
  if (family === "site") return [el.site.slug];
  return el.tags.filter((t) => t.family === family).map((t) => t.value);
}

/** OU à l'intérieur d'une famille, ET entre familles. */
export function matches(el: LibraryElement, filters: Filters, skip?: FilterFamily): boolean {
  for (const { key } of FILTER_FAMILIES) {
    if (key === skip) continue;
    const wanted = filters[key];
    if (!wanted?.length) continue;
    const have = valuesOf(el, key);
    if (!wanted.some((w) => have.includes(w))) return false;
  }
  return true;
}

/** Applique les filtres et calcule les compteurs de chaque famille (avec les filtres des autres familles). */
export function buildListResult(
  candidates: LibraryElement[],
  filters: Filters,
  labels: Map<string, string>,
  limit?: number,
): ListResult {
  const facets = {} as Record<FilterFamily, FacetValue[]>;
  for (const { key } of FILTER_FAMILIES) {
    const counts = new Map<string, number>();
    for (const el of candidates) {
      if (!matches(el, filters, key)) continue;
      for (const v of valuesOf(el, key)) counts.set(v, (counts.get(v) ?? 0) + 1);
    }
    // Une valeur sélectionnée reste visible même à 0, pour pouvoir la retirer.
    for (const v of filters[key] ?? []) if (!counts.has(v)) counts.set(v, 0);
    facets[key] = [...counts.entries()]
      .map(([value, count]) => ({
        value,
        count,
        label: labels.get(`${key}:${value}`) ?? value,
        swatch: key === "couleur" ? COLOR_FAMILIES[value]?.swatch : undefined,
      }))
      .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, "fr"));
  }

  const items = candidates.filter((el) => matches(el, filters));
  return { items: limit ? items.slice(0, limit) : items, total: items.length, facets };
}

export function rankSimilar(element: LibraryElement, items: LibraryElement[], limit: number): LibraryElement[] {
  const score = (el: LibraryElement) => {
    let s = 0;
    if (el.category === element.category) s += 4;
    if (el.colorFamily && el.colorFamily === element.colorFamily) s += 1;
    for (const t of el.tags) if (element.tags.some((o) => o.family === t.family && o.value === t.value)) s += 1;
    return s;
  };
  return items
    .filter((el) => el.slug !== element.slug)
    .map((el) => ({ el, s: score(el) }))
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map((x) => x.el);
}
