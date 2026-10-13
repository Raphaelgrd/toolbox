import { ElementPage } from "@/components/element-page";
import { libraryStore } from "@/lib/library-store";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return { title: (await libraryStore.get("component", slug))?.name ?? "Composant" };
}

export default async function ComponentPage({ params }: Props) {
  const { slug } = await params;
  return <ElementPage kind="component" slug={slug} />;
}
