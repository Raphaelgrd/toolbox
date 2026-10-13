"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/** Onglets de l'espace d'un site, en contrôle segmenté. */
export function SiteTabs({ slug, counts }: { slug: string; counts: { components: number; sections: number } }) {
  const pathname = usePathname();
  const base = `/sites/${slug}`;
  const tabs = [
    { href: base, label: "Vue d'ensemble" },
    { href: `${base}/sections`, label: "Sections", count: counts.sections },
    { href: `${base}/composants`, label: "Composants", count: counts.components },
    { href: `${base}/kit`, label: "Design system" },
  ];
  return (
    <nav className="seg max-w-full overflow-x-auto" aria-label="Espace du site">
      {tabs.map((t) => (
        <Link key={t.href} href={t.href} data-active={pathname === t.href} className="seg-item flex shrink-0 items-center gap-2">
          {t.label}
          {t.count !== undefined && <span className="font-mono text-xs tabular-nums opacity-60">{t.count}</span>}
        </Link>
      ))}
    </nav>
  );
}
