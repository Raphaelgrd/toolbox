import { Suspense } from "react";
import Link from "next/link";
import { Gallery, type SearchParams } from "@/components/gallery";
import { PageIntro } from "@/components/page-intro";
import { Topbar } from "@/components/topbar";
import { libraryStore } from "@/lib/library-store";

export default async function Home({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const sp = await searchParams;
  const counts = await libraryStore.navCounts();
  const today = new Intl.DateTimeFormat("fr-FR", { weekday: "long", day: "numeric", month: "long" }).format(new Date());
  const stats = [
    { label: "Composants", value: counts.totalComponents, href: "/composants" },
    { label: "Sections", value: counts.totalSections, href: "/sections" },
    { label: "Kits", value: counts.kits.length, href: "/kits" },
    { label: "Catégories", value: Object.keys(counts.components).length + Object.keys(counts.sections).length, href: "/composants" },
  ];
  return (
    <>
      <Suspense>
        <Topbar crumbs={[{ label: "Explorer" }]} />
      </Suspense>
      <div className="space-y-10 px-5 py-8 sm:px-8 sm:py-10">
        <PageIntro title="Explorer la librairie" subtitle={`${today[0].toUpperCase()}${today.slice(1)} · tout le kit UI, prêt à copier.`} />
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Link
              key={s.label}
              href={s.href}
              className={`rounded-[var(--radius-card)] border px-6 py-5 transition ${
                i === 0 ? "border-ink bg-ink text-paper" : "border-line bg-paper hover:border-ink-2"
              }`}
            >
              <span className={`eyebrow ${i === 0 ? "text-paper/70" : ""}`}>{s.label}</span>
              <span className="mt-3 block text-[34px] font-bold leading-none tracking-[-0.03em] tabular-nums">{s.value}</span>
            </Link>
          ))}
        </div>
        <Suspense>
          <Gallery searchParams={sp} basePath="/" />
        </Suspense>
      </div>
    </>
  );
}
