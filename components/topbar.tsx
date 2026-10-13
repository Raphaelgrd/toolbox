import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SearchBox } from "./search-box";

export type Crumb = { label: string; href?: string };

/** En-tête du panneau : fil d'Ariane à gauche, recherche globale à droite. */
export function Topbar({ crumbs }: { crumbs: Crumb[] }) {
  const all: Crumb[] = [{ label: "Librairie", href: "/" }, ...crumbs];
  return (
    <header className="flex flex-wrap items-center gap-4 border-b border-line px-5 py-4 sm:px-8 sm:py-5">
      <nav aria-label="Fil d'Ariane" className="flex min-w-0 flex-1 items-center gap-2 text-[15px]">
        {all.map((c, i) => {
          const last = i === all.length - 1;
          return (
            <span key={i} className="flex min-w-0 items-center gap-2">
              {i > 0 && <ChevronRight className="size-3.5 shrink-0 text-mute" />}
              {c.href && !last ? (
                <Link href={c.href} className="truncate text-mute hover:text-ink">
                  {c.label}
                </Link>
              ) : (
                <span className={`truncate ${last ? "font-semibold text-ink" : "text-mute"}`}>{c.label}</span>
              )}
            </span>
          );
        })}
      </nav>
      <SearchBox />
    </header>
  );
}
