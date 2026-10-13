import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { SiteTabs } from "@/components/site-tabs";
import { Topbar } from "@/components/topbar";
import { libraryStore } from "@/lib/library-store";

/** Espace d'un site : en-tête commun + onglets (vue d'ensemble, sections, composants, design system). */
export default async function SiteLayout({
  params,
  children,
}: {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
}) {
  const { slug } = await params;
  const site = await libraryStore.getSite(slug);
  if (!site) notFound();
  const sector = site.tags.find((t) => t.family === "secteur")?.label;
  const c = site.kit?.colors ?? {};
  return (
    <>
      <Suspense>
        <Topbar crumbs={[{ label: "Sites", href: "/sites" }, { label: site.name }]} />
      </Suspense>
      <div className="space-y-8 px-5 py-8 sm:px-8 sm:py-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex min-w-0 items-center gap-5">
            <span
              className="grid size-16 shrink-0 place-items-center rounded-[20px] text-2xl ring-1 ring-black/5"
              style={{ background: c.bg, color: c.primary, fontFamily: site.kit?.typography.families.heading, fontWeight: 700 }}
            >
              Aa
            </span>
            <div className="min-w-0">
              <h1 className="heading text-[40px] leading-[1.05] sm:text-[52px]">{site.name}</h1>
              {site.description && <p className="mt-2 max-w-2xl text-lg text-mute">{site.description}</p>}
            </div>
          </div>
          <div className="flex flex-wrap gap-2 text-sm">
            {sector && <span className="rounded-full bg-paper-2 px-3 py-1.5 font-medium">{sector}</span>}
            <span className="rounded-full bg-paper-2 px-3 py-1.5 font-medium">{site.status === "VALIDATED" ? "Validé" : "Brouillon"}</span>
            {site.url ? (
              <a href={site.url} target="_blank" rel="noopener noreferrer" className="btn-outline">
                {new URL(site.url).hostname.replace(/^www\./, "")} <ExternalLink className="size-3.5" />
              </a>
            ) : (
              <span className="rounded-full bg-paper-2 px-3 py-1.5 font-medium">Créé en interne</span>
            )}
          </div>
        </div>
        <SiteTabs slug={slug} counts={site.counts} />
        {children}
      </div>
    </>
  );
}
