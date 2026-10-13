import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Gallery, type SearchParams } from "@/components/gallery";
import { PageIntro } from "@/components/page-intro";
import { Topbar } from "@/components/topbar";
import { SECTION_TYPES } from "@/lib/taxonomy";

type Props = { params: Promise<{ type: string }>; searchParams: Promise<SearchParams> };

export async function generateMetadata({ params }: Props) {
  const { type } = await params;
  return { title: SECTION_TYPES.find((c) => c.value === type)?.label ?? "Sections" };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const [{ type }, sp] = await Promise.all([params, searchParams]);
  const cat = SECTION_TYPES.find((c) => c.value === type);
  if (!cat) notFound();
  return (
    <>
      <Suspense>
        <Topbar crumbs={[{ label: "Sections", href: "/sections" }, { label: cat.label }]} />
      </Suspense>
      <div className="space-y-10 px-5 py-8 sm:px-8 sm:py-10">
        <PageIntro title={cat.label} subtitle="Aperçus en largeur desktop ; ouvre la fiche pour tester tablette et mobile." />
        <Suspense>
          <Gallery kind="section" category={cat.value} searchParams={sp} basePath={`/sections/${cat.value}`} />
        </Suspense>
      </div>
    </>
  );
}
