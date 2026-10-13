import { notFound } from "next/navigation";
import { CodeTabs } from "@/components/code-tabs";
import { KitSpecimen } from "@/components/kit-specimen";
import { kitToCss, kitToJson, kitToTailwind } from "@/lib/kit";
import { libraryStore } from "@/lib/library-store";

type Props = { params: Promise<{ slug: string }> };

export default async function SiteKit({ params }: Props) {
  const { slug } = await params;
  const site = await libraryStore.getSite(slug);
  if (!site?.kit) notFound();
  return (
    <div className="space-y-10">
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
    </div>
  );
}
