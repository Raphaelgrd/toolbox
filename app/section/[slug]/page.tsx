import { ElementPage } from "@/components/element-page";
import { libraryStore } from "@/lib/library-store";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return { title: (await libraryStore.get("section", slug))?.name ?? "Section" };
}

export default async function SectionPage({ params }: Props) {
  const { slug } = await params;
  return <ElementPage kind="section" slug={slug} />;
}
