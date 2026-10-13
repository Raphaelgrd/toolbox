import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { LivePreview } from "./live-preview";
import { categoryLabel } from "@/lib/taxonomy";
import { COLOR_FAMILIES } from "@/lib/taxonomy";
import type { KitTokens, LibraryElement } from "@/lib/types";

export function elementHref(el: Pick<LibraryElement, "kind" | "slug">) {
  return `/${el.kind === "component" ? "composant" : "section"}/${el.slug}`;
}

/**
 * Carte d'aperçu partagée : la galerie l'utilise aujourd'hui, le sélecteur
 * à 3 choix du MCP la réutilisera (même rendu, même composant).
 */
export function PreviewCard({ element, kit }: { element: LibraryElement; kit: KitTokens | null }) {
  const isSection = element.kind === "section";
  const style = element.tags.find((t) => t.family === "style");
  const swatch = element.colorFamily ? COLOR_FAMILIES[element.colorFamily]?.swatch : undefined;
  return (
    <article className="card group overflow-hidden transition-shadow hover:shadow-[0_18px_40px_-20px_rgba(18,18,18,.35)]">
      <div className="border-b border-line">
        <LivePreview
          html={element.html}
          css={element.css}
          kit={kit}
          layout={isSection ? "page" : "center"}
          height={isSection ? 260 : 240}
          interactive={!isSection}
          title={`Aperçu : ${element.name}`}
        />
      </div>
      <Link href={elementHref(element)} className="flex items-center gap-3 px-5 py-4">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-[15px] font-semibold tracking-[-0.01em] text-ink">{element.name}</h3>
          <p className="mt-0.5 truncate text-[13px] text-mute">
            {element.site.name} · {categoryLabel(element.kind, element.category)}
            {style ? ` · ${style.label}` : ""}
          </p>
        </div>
        {swatch && <span className="size-3 shrink-0 rounded-full ring-1 ring-black/10" style={{ background: swatch }} />}
        <span className="grid size-8 shrink-0 place-items-center rounded-full border border-line text-mute transition group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
          <ArrowUpRight className="size-4" />
        </span>
      </Link>
    </article>
  );
}
