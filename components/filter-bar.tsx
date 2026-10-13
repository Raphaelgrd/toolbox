"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { Check, ChevronDown, X } from "lucide-react";
import { FILTER_FAMILIES, type FilterFamily } from "@/lib/taxonomy";
import type { FacetValue } from "@/lib/types";

/**
 * Barre de filtres combinables. L'état vit dans l'URL (?couleur=bleu,vert&style=…) :
 * une recherche se partage par simple copier-coller du lien.
 * OU à l'intérieur d'une famille, ET entre familles (calculé côté serveur).
 */
export function FilterBar({
  facets,
  total,
  hide = [],
}: {
  facets: Record<FilterFamily, FacetValue[]>;
  total: number;
  hide?: FilterFamily[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [pending, startTransition] = useTransition();
  const [open, setOpen] = useState<FilterFamily | null>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (barRef.current && !barRef.current.contains(e.target as Node)) setOpen(null);
    };
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", esc);
    };
  }, []);

  const selected = (family: FilterFamily) => params.get(family)?.split(",").filter(Boolean) ?? [];

  const push = (next: URLSearchParams) => {
    const qs = next.toString();
    startTransition(() => router.replace(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false }));
  };

  const toggle = (family: FilterFamily, value: string) => {
    const current = selected(family);
    const values = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
    const next = new URLSearchParams(params.toString());
    if (values.length) next.set(family, values.join(","));
    else next.delete(family);
    push(next);
  };

  const clearAll = () => {
    const next = new URLSearchParams();
    const q = params.get("q");
    if (q) next.set("q", q);
    push(next);
  };

  const families = FILTER_FAMILIES.filter((f) => !hide.includes(f.key));
  const active = families.flatMap((f) =>
    selected(f.key).map((v) => ({
      family: f.key,
      value: v,
      label: facets[f.key]?.find((x) => x.value === v)?.label ?? v,
    })),
  );
  const query = params.get("q");

  return (
    <div ref={barRef} className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        {families.map((f) => {
          const values = facets[f.key] ?? [];
          const count = selected(f.key).length;
          if (f.key === "couleur") {
            return (
              <div key={f.key} className="flex items-center gap-1 rounded-full border border-line bg-paper py-1 pl-4 pr-1.5">
                <span className="mr-1.5 text-sm font-medium text-ink-2">Couleur</span>
                {values.map((v) => {
                  const on = selected("couleur").includes(v.value);
                  return (
                    <button
                      key={v.value}
                      onClick={() => toggle("couleur", v.value)}
                      title={`${v.label} (${v.count})`}
                      aria-pressed={on}
                      disabled={!v.count && !on}
                      className={`relative grid size-7 place-items-center rounded-full transition disabled:opacity-25 ${
                        on ? "ring-2 ring-ink ring-offset-2" : "hover:scale-110"
                      }`}
                    >
                      <span className="size-5 rounded-full ring-1 ring-black/10" style={{ background: v.swatch }} />
                    </button>
                  );
                })}
              </div>
            );
          }
          return (
            <div key={f.key} className="relative">
              <button
                onClick={() => setOpen(open === f.key ? null : f.key)}
                aria-expanded={open === f.key}
                className={`btn border ${
                  count ? "border-ink bg-ink text-paper" : "border-line bg-paper text-ink-2 hover:border-ink"
                }`}
              >
                {f.label}
                {count > 0 && <span className="rounded-full bg-paper/20 px-1.5 font-mono text-[11px]">{count}</span>}
                <ChevronDown className="size-3.5 opacity-60" />
              </button>
              {open === f.key && (
                <div className="absolute left-0 top-[calc(100%+8px)] z-30 w-64 rounded-2xl border border-line bg-paper p-1.5 shadow-[0_24px_48px_-16px_rgba(0,0,0,.25)]">
                  {values.length === 0 && <p className="px-3 py-2 text-sm text-mute">Aucune valeur</p>}
                  {values.map((v) => {
                    const on = selected(f.key).includes(v.value);
                    return (
                      <button
                        key={v.value}
                        onClick={() => toggle(f.key, v.value)}
                        disabled={!v.count && !on}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm hover:bg-paper-2 disabled:opacity-40"
                      >
                        <span
                          className={`grid size-4 place-items-center rounded-[5px] border ${
                            on ? "border-ink bg-ink text-paper" : "border-line"
                          }`}
                        >
                          {on && <Check className="size-3" strokeWidth={3} />}
                        </span>
                        <span className="flex-1 text-ink">{v.label}</span>
                        <span className="font-mono text-xs tabular-nums text-mute">{v.count}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
        <span className={`ml-auto font-mono text-sm tabular-nums text-mute transition-opacity ${pending ? "opacity-40" : ""}`}>
          {total} élément{total > 1 ? "s" : ""}
        </span>
      </div>

      {(active.length > 0 || query) && (
        <div className="flex flex-wrap items-center gap-2">
          {query && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-paper-2 px-3 py-1 text-[13px] text-ink">
              « {query} »
              <button
                aria-label="Retirer la recherche"
                onClick={() => {
                  const next = new URLSearchParams(params.toString());
                  next.delete("q");
                  push(next);
                }}
              >
                <X className="size-3.5 text-mute hover:text-ink" />
              </button>
            </span>
          )}
          {active.map((a) => (
            <span
              key={`${a.family}:${a.value}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-paper-2 px-3 py-1 text-[13px] text-ink"
            >
              {a.label}
              <button aria-label={`Retirer ${a.label}`} onClick={() => toggle(a.family, a.value)}>
                <X className="size-3.5 text-mute hover:text-ink" />
              </button>
            </span>
          ))}
          {active.length > 0 && (
            <button onClick={clearAll} className="text-[13px] font-medium text-mute underline-offset-4 hover:text-ink hover:underline">
              Tout effacer
            </button>
          )}
        </div>
      )}
    </div>
  );
}
