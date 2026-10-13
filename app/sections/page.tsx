import { Suspense } from "react";
import { Gallery, type SearchParams } from "@/components/gallery";
import { PageIntro } from "@/components/page-intro";
import { Topbar } from "@/components/topbar";

export const metadata = { title: "Sections" };

export default async function SectionsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const sp = await searchParams;
  return (
    <>
      <Suspense>
        <Topbar crumbs={[{ label: "Sections" }]} />
      </Suspense>
      <div className="space-y-10 px-5 py-8 sm:px-8 sm:py-10">
        <PageIntro title="Sections" subtitle="Des blocs de page complets, responsives, prêts à assembler." />
        <Suspense>
          <Gallery kind="section" searchParams={sp} basePath="/sections" />
        </Suspense>
      </div>
    </>
  );
}
