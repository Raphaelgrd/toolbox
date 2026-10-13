import { Suspense } from "react";
import { Gallery, type SearchParams } from "@/components/gallery";
import { PageIntro } from "@/components/page-intro";
import { Topbar } from "@/components/topbar";

export const metadata = { title: "Composants" };

export default async function ComponentsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const sp = await searchParams;
  return (
    <>
      <Suspense>
        <Topbar crumbs={[{ label: "Composants" }]} />
      </Suspense>
      <div className="space-y-10 px-5 py-8 sm:px-8 sm:py-10">
        <PageIntro title="Composants" subtitle="Boutons, cartes, champs, navigation… chacun rendu en direct dans son kit d'origine." />
        <Suspense>
          <Gallery kind="component" searchParams={sp} basePath="/composants" />
        </Suspense>
      </div>
    </>
  );
}
