import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { PageIntro } from "@/components/page-intro";
import { Topbar } from "@/components/topbar";
import { isDark } from "@/lib/color";
import { libraryStore } from "@/lib/library-store";
import { FOUNDATIONS } from "@/lib/taxonomy";
import type { KitTokens, SiteSummary } from "@/lib/types";

type Props = { params: Promise<{ type: string }> };

const INTROS: Record<string, string> = {
  couleurs: "Toutes les palettes côte à côte, pour comparer les choix de chaque site.",
  typographies: "Les familles et l'échelle de titres de chaque kit.",
  espacements: "Les échelles d'espacement, du plus serré au plus aéré.",
  ombres: "Les élévations de chaque kit, rendues sur leur propre fond.",
  animations: "Durées et courbes d'animation, en mouvement.",
};

export async function generateMetadata({ params }: Props) {
  const { type } = await params;
  return { title: FOUNDATIONS.find((f) => f.value === type)?.label ?? "Fondations" };
}

export default async function FoundationPage({ params }: Props) {
  const { type } = await params;
  const foundation = FOUNDATIONS.find((f) => f.value === type);
  if (!foundation) notFound();
  const sites = (await libraryStore.listSites()).filter((s): s is SiteSummary & { kit: KitTokens } => !!s.kit);

  return (
    <>
      <Suspense>
        <Topbar crumbs={[{ label: "Fondations" }, { label: foundation.label }]} />
      </Suspense>
      <div className="space-y-10 px-5 py-8 sm:px-8 sm:py-10">
        <PageIntro title={foundation.label} subtitle={INTROS[type]} />
        <div className="space-y-5">
          {sites.map((s) => (
            <section key={s.slug} className="card overflow-hidden">
              <header className="flex items-center justify-between border-b border-line px-6 py-4">
                <Link href={`/kits/${s.slug}`} className="flex items-center gap-3 font-semibold text-ink hover:underline">
                  <span className="size-3 rounded-full" style={{ background: s.kit.colors.primary }} />
                  {s.name}
                </Link>
                <span className="text-sm text-mute">{s.tags.find((t) => t.family === "secteur")?.label}</span>
              </header>
              <div className="p-6">
                <FoundationRow type={type} kit={s.kit} />
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}

function FoundationRow({ type, kit }: { type: string; kit: KitTokens }) {
  if (type === "couleurs") {
    return (
      <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
        {Object.entries(kit.colors).map(([name, hex]) => (
          <div key={name} title={`--color-${name}: ${hex}`}>
            <div
              className="flex h-16 items-end rounded-xl p-2 ring-1 ring-black/5"
              style={{ background: hex, color: isDark(hex) ? "#fff" : "#111" }}
            >
              <span className="font-mono text-[10px] opacity-80">{hex}</span>
            </div>
            <p className="mt-1.5 truncate text-xs text-mute">{name}</p>
          </div>
        ))}
      </div>
    );
  }
  if (type === "typographies") {
    const f = kit.typography.families;
    return (
      <div className="grid gap-6 md:grid-cols-[1fr_260px]">
        <p
          className="text-[40px] leading-[1.05] text-ink"
          style={{ fontFamily: f.heading, fontWeight: Number(kit.typography.weights.bold) }}
        >
          Le design se voit dans les détails.
        </p>
        <div className="space-y-1 font-mono text-[11px] text-mute">
          <p><span className="text-ink">titres</span> {f.heading}</p>
          <p><span className="text-ink">texte</span> {f.body}</p>
          <p><span className="text-ink">tailles</span> {Object.values(kit.typography.sizes).join(" · ")}</p>
        </div>
      </div>
    );
  }
  if (type === "espacements") {
    return (
      <div className="flex flex-wrap items-end gap-3">
        {Object.entries(kit.spacing).map(([name, v]) => (
          <div key={name} className="text-center">
            <div className="accent-gradient rounded-md" style={{ width: v, height: v, minWidth: 4, minHeight: 4 }} />
            <p className="mt-1.5 font-mono text-[10px] text-mute">{name}</p>
          </div>
        ))}
      </div>
    );
  }
  if (type === "ombres") {
    return (
      <div className="grid gap-5 rounded-2xl p-6 sm:grid-cols-3" style={{ background: kit.colors.bg }}>
        {Object.entries(kit.shadows).map(([name, v]) => (
          <div
            key={name}
            className="grid h-20 place-items-center font-mono text-xs"
            style={{ boxShadow: v, background: kit.colors.surface, color: kit.colors.text, borderRadius: kit.radii.md }}
          >
            {name}
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {Object.entries(kit.motion.durations).map(([name, d]) => (
        <div key={name} className="space-y-2">
          <p className="font-mono text-xs text-mute">
            {name} · {d}
          </p>
          <div className="h-10 rounded-full bg-paper-2 p-1">
            <div
              className="size-8 rounded-full"
              style={{
                background: kit.colors.primary,
                animation: `fd-move ${parseInt(d) * 6}ms ${kit.motion.easings.standard} infinite alternate`,
              }}
            />
          </div>
        </div>
      ))}
      <style>{`@keyframes fd-move{to{transform:translateX(calc(min(240px,20vw)))}}`}</style>
      <p className="font-mono text-[11px] text-mute sm:col-span-3">{kit.motion.easings.standard}</p>
    </div>
  );
}
