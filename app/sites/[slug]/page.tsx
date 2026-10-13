import Link from "next/link";
import { notFound } from "next/navigation";
import { PreviewCard } from "@/components/preview-card";
import { Palette } from "@/components/kit-specimen";
import { libraryStore } from "@/lib/library-store";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return { title: (await libraryStore.getSite(slug))?.name ?? "Site" };
}

/** Vue d'ensemble : chiffres, palette, et un aperçu des sections et composants du site. */
export default async function SiteOverview({ params }: Props) {
  const { slug } = await params;
  const site = await libraryStore.getSite(slug);
  if (!site) notFound();
  const { items } = await libraryStore.list({ filters: { site: [slug] } });
  const sections = items.filter((i) => i.kind === "section");
  const components = items.filter((i) => i.kind === "component");
  const f = site.kit?.typography.families;
  const stats = [
    { label: "Sections", value: String(sections.length) },
    { label: "Composants", value: String(components.length) },
    { label: "Police titres", value: f?.heading.split(",")[0].replace(/['"]/g, "") ?? "—" },
    { label: "Police texte", value: f?.body.split(",")[0].replace(/['"]/g, "") ?? "—" },
  ];
  return (
    <div className="space-y-12">
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`rounded-[var(--radius-card)] border px-6 py-5 ${i === 0 ? "border-ink bg-ink text-paper" : "border-line bg-paper"}`}
          >
            <span className={`eyebrow ${i === 0 ? "text-paper/70" : ""}`}>{s.label}</span>
            <span className="mt-3 block truncate text-[30px] font-bold leading-none tracking-[-0.03em]">{s.value}</span>
          </div>
        ))}
      </div>

      {site.kit && <Palette kit={site.kit} compact />}

      {sections.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-end justify-between gap-4">
            <h2 className="heading text-2xl">Sections</h2>
            <Link href={`/sites/${slug}/sections`} className="text-sm font-medium text-mute hover:text-ink">
              Tout voir →
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {sections.slice(0, 4).map((el) => (
              <PreviewCard key={el.slug} element={el} kit={site.kit} />
            ))}
          </div>
        </section>
      )}

      {components.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-end justify-between gap-4">
            <h2 className="heading text-2xl">Composants</h2>
            <Link href={`/sites/${slug}/composants`} className="text-sm font-medium text-mute hover:text-ink">
              Tout voir →
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {components.slice(0, 6).map((el) => (
              <PreviewCard key={el.slug} element={el} kit={site.kit} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
