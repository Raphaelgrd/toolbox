import { Suspense } from "react";
import { Gallery, type SearchParams } from "@/components/gallery";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<SearchParams> };

export default async function SiteComponents({ params, searchParams }: Props) {
  const [{ slug }, sp] = await Promise.all([params, searchParams]);
  return (
    <Suspense>
      <Gallery kind="component" searchParams={{ ...sp, site: slug }} basePath={`/sites/${slug}/composants`} hide={["site", "secteur"]} />
    </Suspense>
  );
}
