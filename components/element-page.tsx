import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ElementWorkbench } from "./element-workbench";
import { PreviewCard, elementHref } from "./preview-card";
import { Topbar } from "./topbar";
import { libraryStore } from "@/lib/library-store";
import { COLOR_FAMILIES, categoryLabel, type ElementKind } from "@/lib/taxonomy";

const FAMILY_LABELS: Record<string, string> = {
  secteur: "Secteur",
  style: "Style",
  ambiance: "Ambiance",
  complexite: "Complexité",
  licence: "Licence",
};

/** Fiche complète d'un composant ou d'une section. */
export async function ElementPage({ kind, slug }: { kind: ElementKind; slug: string }) {
  const element = await libraryStore.get(kind, slug);
  if (!element) notFound();
  const [sites, similar, linked] = await Promise.all([
    libraryStore.listSites(),
    libraryStore.similar(element, 3),
    libraryStore.linked(kind, slug),
  ]);
  const kitMap = new Map(sites.map((s) => [s.slug, s.kit]));
  const kits = sites.map((s) => ({ slug: s.slug, name: s.name, kit: s.kit }));
  const parentPath = kind === "component" ? "/composants" : "/sections";
  const parentLabel = kind === "component" ? "Composants" : "Sections";
  const catLabel = categoryLabel(kind, element.category);
  const color = element.colorFamily ? COLOR_FAMILIES[element.colorFamily] : null;

  return (
    <>
      <Suspense>
        <Topbar
          crumbs={[
            { label: parentLabel, href: parentPath },
            { label: catLabel, href: `${parentPath}/${element.category}` },
            { label: element.name },
          ]}
        />
      </Suspense>
      <div className="grid gap-10 px-5 py-8 sm:px-8 sm:py-10 xl:grid-cols-[minmax(0,1fr)_300px]">
        <div className="min-w-0 space-y-8">
          <div>
            <p className="eyebrow">{catLabel}</p>
            <h1 className="heading mt-2 text-[40px] leading-[1.05] sm:text-[52px]">{element.name}</h1>
            {element.description && <p className="mt-3 max-w-2xl text-lg text-mute">{element.description}</p>}
          </div>
          <ElementWorkbench element={element} kits={kits} />
        </div>

        <aside className="space-y-4 xl:sticky xl:top-6 xl:self-start">
          <div className="card p-6">
            <p className="eyebrow">Site d'origine</p>
            <Link href={`/sites/${element.site.slug}`} className="mt-3 flex items-center gap-3">
              <span
                className="size-9 rounded-xl ring-1 ring-black/10"
                style={{ background: kitMap.get(element.site.slug)?.colors.primary }}
              />
              <span>
                <span className="block font-semibold text-ink">{element.site.name}</span>
                <span className="text-sm text-mute">Voir le site →</span>
              </span>
            </Link>
          </div>

          <div className="card space-y-4 p-6">
            <p className="eyebrow">Tags</p>
            <dl className="space-y-3 text-sm">
              {color && (
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-mute">Couleur dominante</dt>
                  <dd className="flex items-center gap-2 font-medium">
                    <span className="size-3 rounded-full ring-1 ring-black/10" style={{ background: element.dominantColor ?? color.swatch }} />
                    {color.label}
                  </dd>
                </div>
              )}
              {element.tags.map((t) => (
                <div key={`${t.family}:${t.value}`} className="flex items-center justify-between gap-3">
                  <dt className="text-mute">{FAMILY_LABELS[t.family] ?? t.family}</dt>
                  <dd>
                    <Link
                      href={`${parentPath}?${t.family}=${t.value}`}
                      className={`rounded-full px-2.5 py-1 font-medium ${
                        t.family === "licence" && t.value === "inspiration" ? "bg-late-bg text-late" : "bg-paper-2 text-ink"
                      }`}
                    >
                      {t.label}
                    </Link>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="card space-y-3 p-6">
            <p className="eyebrow">Tokens utilisés</p>
            <div className="flex flex-wrap gap-1.5">
              {element.tokensUsed.map((t) => (
                <code key={t} className="rounded-md bg-paper-2 px-1.5 py-0.5 font-mono text-[11px] text-ink-2">
                  {t}
                </code>
              ))}
            </div>
            <p className="eyebrow pt-3">Dépendances</p>
            <p className="text-sm text-ink-2">
              {element.dependencies.length ? element.dependencies.join(", ") : "Aucune : HTML et CSS seuls."}
            </p>
          </div>

          {linked.length > 0 && (
            <div className="card space-y-3 p-6">
              <p className="eyebrow">{kind === "section" ? "Composants inclus" : "Utilisé dans"}</p>
              <ul className="space-y-2 text-sm">
                {linked.map((l) => (
                  <li key={l.slug}>
                    <Link
                      href={elementHref(l)}
                      className="font-medium text-ink underline-offset-4 hover:underline"
                    >
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>

        {similar.length > 0 && (
          <section className="space-y-4 xl:col-span-2">
            <h2 className="heading text-3xl">Éléments similaires</h2>
            <div className={`grid gap-5 ${kind === "section" ? "md:grid-cols-2 xl:grid-cols-3" : "sm:grid-cols-2 xl:grid-cols-3"}`}>
              {similar.map((el) => (
                <PreviewCard key={el.slug} element={el} kit={kitMap.get(el.site.slug) ?? null} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
