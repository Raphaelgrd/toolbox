"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";

/** Recherche texte : reste sur la galerie courante, sinon renvoie vers l'explorateur. */
export function SearchBox() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [value, setValue] = useState(params.get("q") ?? "");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => setValue(params.get("q") ?? ""), [params]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isGallery = pathname === "/" || pathname.startsWith("/composants") || pathname.startsWith("/sections");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next = new URLSearchParams(isGallery ? params.toString() : "");
    if (value.trim()) next.set("q", value.trim());
    else next.delete("q");
    const qs = next.toString();
    router.push(`${isGallery ? pathname : "/"}${qs ? `?${qs}` : ""}`, { scroll: false });
  };

  return (
    <form onSubmit={submit} className="order-last w-full sm:order-none sm:w-auto">
      <label className="flex h-10 items-center gap-2 rounded-full border border-line bg-paper-2 pl-4 pr-1.5 text-mute transition focus-within:border-ink focus-within:bg-paper sm:w-80">
        <Search className="size-4 shrink-0" />
        <input
          ref={inputRef}
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Rechercher un composant, un site…"
          className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-mute"
        />
        <kbd className="hidden rounded-full border border-line bg-paper px-2 py-1 font-mono text-[11px] sm:block">⌘K</kbd>
      </label>
    </form>
  );
}
