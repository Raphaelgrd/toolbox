import { Suspense } from "react";
import { Gallery, type SearchParams } from "@/components/gallery";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<SearchParams> };

export default async function SiteSections({ params, searchParams }: Props) {
  const [{ slug }, sp] = await Promise.all([params, searchParams]);
  return (
    <Suspense>
      <Gallery kind="section" searchParams={{ ...sp, site: slug }} basePath={`/sites/${slug}/sections`} hide={["site", "secteur"]} />
    </Suspense>
  );
}
