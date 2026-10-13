// Remplit la base à partir des dossiers sites/<slug>/ (un emplacement par site).
// Ajouter un site = ajouter un dossier, puis `npm run db:seed`.
//
// En plus : si un dossier de composants existe (TOOLBOX_IMPORT_DIR, par défaut
// ~/mon-clone/components/toolbox), ses fichiers .html sont importés dans le site Pulsor.

import { existsSync, readdirSync, readFileSync } from "node:fs";
import { homedir } from "node:os";
import { basename, join } from "node:path";
import type { Prisma } from "@prisma/client";
import { prisma } from "../lib/db";
import { libraryStore } from "../lib/library-store";
import { readSitesDir, type FolderElement, type SiteFolder } from "../lib/site-folders";
import { COMPONENT_CATEGORIES } from "../lib/taxonomy";

const SITES_DIR = join(__dirname, "..", "sites");

const STYLE_LABELS: Record<string, string> = {
  minimaliste: "Minimaliste",
  editorial: "Éditorial",
  corporate: "Corporate",
  organique: "Organique",
  brutaliste: "Brutaliste",
  glassmorphism: "Glassmorphism",
};
const COMPLEXITE_LABELS: Record<string, string> = { simple: "Simple", moyenne: "Moyenne", avancee: "Avancée" };
const LICENCE_LABELS: Record<string, string> = { libre: "Réutilisable", inspiration: "Inspiration seulement" };

function tagsFor(el: Pick<FolderElement, "style" | "complexite" | "licence">, site: SiteFolder) {
  const ambiance = site.info.ambiance;
  return [
    { family: "style", value: el.style, label: STYLE_LABELS[el.style] ?? el.style },
    { family: "ambiance", value: ambiance, label: ambiance === "sombre" ? "Sombre" : "Clair" },
    { family: "complexite", value: el.complexite, label: COMPLEXITE_LABELS[el.complexite] ?? el.complexite },
    { family: "licence", value: el.licence, label: LICENCE_LABELS[el.licence] ?? el.licence },
  ];
}

async function reset() {
  await prisma.section.deleteMany();
  await prisma.component.deleteMany();
  await prisma.tokenKit.deleteMany();
  await prisma.site.deleteMany();
  await prisma.tag.deleteMany();
}

async function createSite(s: SiteFolder) {
  const sectorTag = await prisma.tag.upsert({
    where: { family_value: { family: "secteur", value: s.info.sector.value } },
    update: {},
    create: { family: "secteur", value: s.info.sector.value, label: s.info.sector.label },
  });
  await prisma.site.create({
    data: {
      slug: s.slug,
      name: s.info.name,
      url: s.info.url,
      domain: s.info.domain,
      sector: s.info.sector.value,
      description: s.info.description,
      status: "VALIDATED",
      tags: { connect: [{ id: sectorTag.id }] },
      kit: { create: s.kit as unknown as Prisma.TokenKitCreateWithoutSiteInput },
    },
  });
}

async function createElement(el: FolderElement, site: SiteFolder) {
  await libraryStore.create({
    kind: el.kind,
    slug: el.slug,
    name: el.name,
    category: el.category,
    description: el.description,
    html: el.html,
    css: el.css,
    dependencies: el.dependencies,
    license: el.licence,
    siteSlug: site.slug,
    tags: tagsFor(el, site),
    componentSlugs: el.kind === "section" ? el.components : undefined,
  });
  if (el.kind === "component" && el.variants.length) {
    await prisma.component.update({ where: { slug: el.slug }, data: { variants: el.variants } });
  }
}

/** Import optionnel de l'ancienne boîte à outils : chaque .html devient un composant de Pulsor. */
async function importToolboxDir(sites: SiteFolder[]): Promise<number> {
  const dir = process.env.TOOLBOX_IMPORT_DIR ?? join(homedir(), "mon-clone/components/toolbox");
  const pulsor = sites.find((s) => s.slug === "pulsor");
  if (!existsSync(dir) || !pulsor) return 0;
  let count = 0;
  for (const file of readdirSync(dir).filter((f) => f.endsWith(".html"))) {
    const raw = readFileSync(join(dir, file), "utf8");
    const css = [...raw.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map((m) => m[1]).join("\n");
    const html = raw
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<\/?(html|head|body)[^>]*>/gi, "")
      .trim();
    const slug = `pulsor-${basename(file, ".html").toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
    const category = COMPONENT_CATEGORIES.find((c) => slug.includes(c.value.replace(/s$/, "")))?.value ?? "cartes";
    await libraryStore.create({
      kind: "component",
      slug,
      name: basename(file, ".html").replace(/[-_]+/g, " "),
      category,
      description: `Importé depuis ${file}`,
      html,
      css,
      siteSlug: "pulsor",
      tags: tagsFor({ style: "minimaliste", complexite: "moyenne", licence: "libre" }, pulsor),
    });
    count++;
  }
  return count;
}

async function main() {
  const sites = readSitesDir(SITES_DIR);
  await reset();
  for (const s of sites) await createSite(s);

  // Les composants d'abord : les sections peuvent pointer vers ceux de n'importe quel site.
  for (const s of sites) for (const el of s.elements.filter((e) => e.kind === "component")) await createElement(el, s);
  for (const s of sites) for (const el of s.elements.filter((e) => e.kind === "section")) await createElement(el, s);

  const imported = await importToolboxDir(sites);

  for (const s of sites) {
    const c = s.elements.filter((e) => e.kind === "component").length;
    const sec = s.elements.length - c;
    console.log(`  ${s.info.name.padEnd(16)} ${c} composants, ${sec} sections`);
  }
  if (imported) console.log(`  + ${imported} composant(s) importé(s) depuis la boîte à outils`);
  const total = sites.reduce((n, s) => n + s.elements.length, 0) + imported;
  console.log(`✓ ${sites.length} sites, ${total} éléments`);
}

main()
  .catch((e) => {
    console.error(e instanceof Error ? e.message : e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
