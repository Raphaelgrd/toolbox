import Link from "next/link";
import { SearchX } from "lucide-react";
import { FilterBar } from "./filter-bar";
import { PreviewCard } from "./preview-card";
import { filtersFromSearchParams, libraryStore } from "@/lib/library-store";
import type { ElementKind, FilterFamily } from "@/lib/taxonomy";
import type { KitTokens } from "@/lib/types";

export type SearchParams = Record<string, string | string[] | undefined>;

/** Grille d'aperçus vivants + barre de filtres. Utilisée par toutes les pages de galerie. */
export async function Gallery({
  kind,
  category,
  searchParams,
  basePath,
  hide,
}: {
  kind?: ElementKind;
  category?: string;
  searchParams: SearchParams;
  basePath: string;
  hide?: FilterFamily[];
}) {
  const filters = filtersFromSearchParams(searchParams);
  const query = typeof searchParams.q === "string" ? searchParams.q : undefined;
  const [{ items, total, facets }, sites] = await Promise.all([
    libraryStore.list({ kind, category, query, filters }),
    libraryStore.listSites(),
  ]);
  const kits = new Map<string, KitTokens | null>(sites.map((s) => [s.slug, s.kit]));
  const sections = items.filter((i) => i.kind === "section");
  const components = items.filter((i) => i.kind === "component");

  return (
    <div className="space-y-8">
      <FilterBar facets={facets} total={total} hide={hide} />

      {total === 0 ? (
        <div className="card flex flex-col items-center gap-4 px-6 py-16 text-center">
          <span className="grid size-12 place-items-center rounded-full bg-paper-2 text-mute">
            <SearchX className="size-5" />
          </span>
          <div>
            <p className="heading text-2xl">Rien ne correspond.</p>
            <p className="mt-2 max-w-md text-mute">
              Plutôt que de montrer des résultats hors sujet : retire un filtre, ou élargis la recherche à toute la librairie.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            <Link href={basePath} className="btn-outline">
              Effacer les filtres
            </Link>
            <Link href="/" className="btn-solid">
              Toute la librairie
            </Link>
          </div>
        </div>
      ) : (
        <>
          {sections.length > 0 && (
            <div className="space-y-4">
              {!kind && <h2 className="heading text-2xl">Sections</h2>}
              <div className="grid gap-5 md:grid-cols-2">
                {sections.map((el) => (
                  <PreviewCard key={el.slug} element={el} kit={kits.get(el.site.slug) ?? null} />
                ))}
              </div>
            </div>
          )}
          {components.length > 0 && (
            <div className="space-y-4">
              {!kind && <h2 className="heading text-2xl">Composants</h2>}
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {components.map((el) => (
                  <PreviewCard key={el.slug} element={el} kit={kits.get(el.site.slug) ?? null} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
