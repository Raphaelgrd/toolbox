import { Suspense } from "react";
import { notFound } from "next/navigation";
import { CodeTabs } from "@/components/code-tabs";
import { Gallery, type SearchParams } from "@/components/gallery";
import { KitSpecimen } from "@/components/kit-specimen";
import { PageIntro } from "@/components/page-intro";
import { Topbar } from "@/components/topbar";
import { kitToCss, kitToJson, kitToTailwind } from "@/lib/kit";
import { libraryStore } from "@/lib/library-store";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<SearchParams> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return { title: (await libraryStore.getSite(slug))?.name ?? "Kit" };
}

export default async function KitPage({ params, searchParams }: Props) {
  const [{ slug }, sp] = await Promise.all([params, searchParams]);
  const site = await libraryStore.getSite(slug);
  if (!site) notFound();
  const sector = site.tags.find((t) => t.family === "secteur")?.label;
  return (
    <>
      <Suspense>
        <Topbar crumbs={[{ label: "Kits", href: "/kits" }, { label: site.name }]} />
      </Suspense>
      <div className="space-y-12 px-5 py-8 sm:px-8 sm:py-10">
        <PageIntro title={site.name} subtitle={site.description ?? undefined}>
          <div className="flex flex-wrap gap-2 text-sm">
            {sector && <span className="rounded-full bg-paper-2 px-3 py-1.5 font-medium">{sector}</span>}
            <span className="rounded-full bg-paper-2 px-3 py-1.5 font-medium">
              {site.status === "VALIDATED" ? "Validé" : "Brouillon"}
            </span>
            <span className="rounded-full bg-paper-2 px-3 py-1.5 font-medium">{site.url ?? "Créé en interne"}</span>
          </div>
        </PageIntro>

        {site.kit && (
          <>
            <section className="space-y-4">
              <h2 className="heading text-2xl">Exporter le kit</h2>
              <CodeTabs
                tabs={[
                  { id: "css", label: "Variables CSS", code: kitToCss(site.kit), filename: "tokens.css" },
                  { id: "tailwind", label: "Tailwind", code: kitToTailwind(site.kit), filename: "globals.css" },
                  { id: "json", label: "JSON", code: kitToJson(site.kit), filename: "tokens.json" },
                ]}
              />
            </section>
            <KitSpecimen kit={site.kit} />
          </>
        )}

        <section className="space-y-6">
          <h2 className="heading text-3xl">Les éléments de {site.name}</h2>
          <Suspense>
            <Gallery searchParams={{ ...sp, site: slug }} basePath={`/kits/${slug}`} hide={["site"]} />
          </Suspense>
        </section>
      </div>
    </>
  );
}
