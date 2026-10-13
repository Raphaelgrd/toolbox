// Remplit la base avec les données de démo.
// 1. Si un dossier de composants existe (TOOLBOX_IMPORT_DIR, par défaut
//    ~/mon-clone/components/toolbox), ses fichiers .html sont importés.
// 2. Sinon (et en plus), on crée les kits, composants et sections de démonstration.

import { existsSync, readdirSync, readFileSync } from "node:fs";
import { homedir } from "node:os";
import { basename, join } from "node:path";
import type { Prisma } from "@prisma/client";
import { prisma } from "../lib/db";
import { libraryStore } from "../lib/library-store";
import { COMPONENT_CATEGORIES } from "../lib/taxonomy";
import { SITES } from "./seed-data/kits";
import { COMPONENTS, type SeedElement } from "./seed-data/components";
import { SECTIONS } from "./seed-data/sections";

const STYLE_LABELS: Record<string, string> = {
  minimaliste: "Minimaliste",
  editorial: "Éditorial",
  corporate: "Corporate",
  organique: "Organique",
  brutaliste: "Brutaliste",
  glassmorphism: "Glassmorphism",
};
const COMPLEXITE_LABELS = { simple: "Simple", moyenne: "Moyenne", avancee: "Avancée" };
const LICENCE_LABELS = { libre: "Réutilisable", inspiration: "Inspiration seulement" };

function tagsFor(el: SeedElement) {
  const site = SITES.find((s) => s.slug === el.site)!;
  const licence = el.licence ?? "libre";
  return [
    { family: "style", value: el.style, label: STYLE_LABELS[el.style] ?? el.style },
    { family: "ambiance", value: site.ambiance, label: site.ambiance === "sombre" ? "Sombre" : "Clair" },
    { family: "complexite", value: el.complexite, label: COMPLEXITE_LABELS[el.complexite] },
    { family: "licence", value: licence, label: LICENCE_LABELS[licence] },
  ];
}

async function reset() {
  await prisma.section.deleteMany();
  await prisma.component.deleteMany();
  await prisma.tokenKit.deleteMany();
  await prisma.site.deleteMany();
  await prisma.tag.deleteMany();
}

async function seedSites() {
  for (const s of SITES) {
    const sectorTag = await prisma.tag.upsert({
      where: { family_value: { family: "secteur", value: s.sector.value } },
      update: {},
      create: { family: "secteur", value: s.sector.value, label: s.sector.label },
    });
    await prisma.site.create({
      data: {
        slug: s.slug,
        name: s.name,
        url: s.url,
        domain: s.domain,
        sector: s.sector.value,
        description: s.description,
        status: "VALIDATED",
        tags: { connect: [{ id: sectorTag.id }] },
        kit: { create: s.kit as unknown as Prisma.TokenKitCreateWithoutSiteInput },
      },
    });
  }
}

/** Import optionnel : chaque fichier .html du dossier devient un composant du kit Pulsor. */
async function importToolboxDir(): Promise<number> {
  const dir = process.env.TOOLBOX_IMPORT_DIR ?? join(homedir(), "mon-clone/components/toolbox");
  if (!existsSync(dir)) return 0;
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
    const category =
      COMPONENT_CATEGORIES.find((c) => slug.includes(c.value.replace(/s$/, "")))?.value ?? "cartes";
    await libraryStore.create({
      kind: "component",
      slug,
      name: basename(file, ".html").replace(/[-_]+/g, " "),
      category,
      description: `Importé depuis ${file}`,
      html,
      css,
      siteSlug: "pulsor",
      tags: [
        { family: "style", value: "minimaliste", label: "Minimaliste" },
        { family: "ambiance", value: "clair", label: "Clair" },
        { family: "complexite", value: "moyenne", label: "Moyenne" },
        { family: "licence", value: "libre", label: "Réutilisable" },
      ],
    });
    count++;
  }
  return count;
}

async function main() {
  await reset();
  await seedSites();

  const imported = await importToolboxDir();
  if (imported) console.log(`↳ ${imported} composant(s) importé(s) depuis la boîte à outils`);

  for (const c of COMPONENTS) {
    await libraryStore.create({
      kind: "component",
      slug: c.slug,
      name: c.name,
      category: c.category,
      description: c.description,
      html: c.html,
      css: c.css,
      dependencies: c.dependencies,
      license: c.licence,
      siteSlug: c.site,
      tags: tagsFor(c),
    });
  }
  for (const s of SECTIONS) {
    await libraryStore.create({
      kind: "section",
      slug: s.slug,
      name: s.name,
      category: s.category,
      description: s.description,
      html: s.html,
      css: s.css,
      dependencies: s.dependencies,
      license: s.licence,
      siteSlug: s.site,
      tags: tagsFor(s),
      componentSlugs: s.components,
    });
  }
  // Les variantes déclarées dans les données de démo.
  for (const c of COMPONENTS.filter((c) => c.variants)) {
    await prisma.component.update({ where: { slug: c.slug }, data: { variants: c.variants } });
  }

  console.log(`✓ ${SITES.length} kits, ${COMPONENTS.length + imported} composants, ${SECTIONS.length} sections`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
