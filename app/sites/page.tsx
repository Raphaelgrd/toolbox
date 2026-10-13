import Link from "next/link";
import { Suspense } from "react";
import { PageIntro } from "@/components/page-intro";
import { Topbar } from "@/components/topbar";
import { libraryStore } from "@/lib/library-store";

export const metadata = { title: "Sites" };

export default async function SitesPage() {
  const sites = await libraryStore.listSites();
  return (
    <>
      <Suspense>
        <Topbar crumbs={[{ label: "Sites" }]} />
      </Suspense>
      <div className="space-y-10 px-5 py-8 sm:px-8 sm:py-10">
        <PageIntro title="Sites" subtitle="Chaque site a son espace : son design system, ses sections et ses composants." />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {sites.map((s) => {
            const c = s.kit?.colors ?? {};
            return (
              <Link key={s.slug} href={`/sites/${s.slug}`} className="card group overflow-hidden transition-shadow hover:shadow-[0_18px_40px_-20px_rgba(18,18,18,.35)]">
                <div className="relative h-40 p-6" style={{ background: c.bg, color: c.text }}>
                  <p className="text-3xl leading-none" style={{ fontFamily: s.kit?.typography.families.heading, fontWeight: Number(s.kit?.typography.weights.bold) }}>
                    Aa
                  </p>
                  <div className="absolute bottom-6 left-6 flex -space-x-2">
                    {["primary", "secondary", "accent", "surface", "text"].map((k) => (
                      <span key={k} className="size-9 rounded-full ring-2" style={{ background: c[k], ["--tw-ring-color" as string]: c.bg }} />
                    ))}
                  </div>
                  <span
                    className="absolute bottom-6 right-6 px-4 py-2 text-sm font-medium"
                    style={{ background: c.primary, color: c.bg, borderRadius: s.kit?.radii.md, boxShadow: s.kit?.shadows.sm }}
                  >
                    Bouton
                  </span>
                </div>
                <div className="flex items-center justify-between px-5 py-4">
                  <div>
                    <h3 className="font-semibold text-ink">{s.name}</h3>
                    <p className="text-[13px] text-mute">
                      {s.tags.find((t) => t.family === "secteur")?.label} · {s.counts.components} composants · {s.counts.sections} sections
                    </p>
                  </div>
                  <span className="text-mute transition group-hover:translate-x-1 group-hover:text-ink">→</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
