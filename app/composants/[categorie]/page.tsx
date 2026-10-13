import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Gallery, type SearchParams } from "@/components/gallery";
import { PageIntro } from "@/components/page-intro";
import { Topbar } from "@/components/topbar";
import { COMPONENT_CATEGORIES } from "@/lib/taxonomy";

type Props = { params: Promise<{ categorie: string }>; searchParams: Promise<SearchParams> };

export async function generateMetadata({ params }: Props) {
  const { categorie } = await params;
  return { title: COMPONENT_CATEGORIES.find((c) => c.value === categorie)?.label ?? "Composants" };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const [{ categorie }, sp] = await Promise.all([params, searchParams]);
  const cat = COMPONENT_CATEGORIES.find((c) => c.value === categorie);
  if (!cat) notFound();
  return (
    <>
      <Suspense>
        <Topbar crumbs={[{ label: "Composants", href: "/composants" }, { label: cat.label }]} />
      </Suspense>
      <div className="space-y-10 px-5 py-8 sm:px-8 sm:py-10">
        <PageIntro title={cat.label} subtitle="Survole, clique, teste : les aperçus sont de vrais rendus." />
        <Suspense>
          <Gallery kind="component" category={cat.value} searchParams={sp} basePath={`/composants/${cat.value}`} />
        </Suspense>
      </div>
    </>
  );
}
