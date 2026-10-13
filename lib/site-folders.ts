// Lecture des dossiers sites/<slug>/ : un emplacement par site.
//
// sites/<slug>/
//   site.json          nom, URL, secteur, description, style, ambiance
//   kit.json           design system (couleurs, typo, espacements…)
//   composants/*.html  un fichier par composant
//   sections/*.html    un fichier par section
//
// Chaque fichier .html commence par un commentaire de métadonnées
// (name, category, description, style, complexite…), puis un <style>, puis le HTML.
// Les dossiers qui commencent par « _ » (ex. _modele) sont ignorés.

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { basename, join } from "node:path";
import { COMPONENT_CATEGORIES, SECTION_TYPES, type ElementKind } from "./taxonomy";
import type { KitTokens } from "./types";

export interface SiteFolderInfo {
  name: string;
  url: string | null;
  domain: string | null;
  sector: { value: string; label: string };
  description: string;
  style: string;
  ambiance: "clair" | "sombre";
}

export interface FolderElement {
  kind: ElementKind;
  slug: string;
  name: string;
  category: string;
  description: string;
  style: string;
  complexite: string;
  licence: string;
  dependencies: string[];
  variants: string[];
  components: string[];
  html: string;
  css: string;
  file: string;
}

export interface SiteFolder {
  slug: string;
  dir: string;
  info: SiteFolderInfo;
  kit: KitTokens;
  elements: FolderElement[];
}

const list = (v?: string) => (v ? v.split(",").map((s) => s.trim()).filter(Boolean) : []);

function dedent(text: string): string {
  const lines = text.replace(/^\n+|\s+$/g, "").split("\n");
  const indent = Math.min(...lines.filter((l) => l.trim()).map((l) => l.match(/^ */)![0].length));
  return lines.map((l) => l.slice(indent)).join("\n");
}

export function parseElementFile(file: string, kind: ElementKind): FolderElement {
  const raw = readFileSync(file, "utf8");
  const metaMatch = raw.match(/^\s*<!--([\s\S]*?)-->/);
  const meta: Record<string, string> = {};
  for (const line of (metaMatch?.[1] ?? "").split("\n")) {
    const i = line.indexOf(":");
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  const rest = metaMatch ? raw.slice(metaMatch[0].length) : raw;
  const css = [...rest.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map((m) => dedent(m[1])).join("\n");
  const html = rest.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "").trim();
  const slug = basename(file, ".html");

  const allowed = (kind === "component" ? COMPONENT_CATEGORIES : SECTION_TYPES).map((c) => c.value as string);
  if (!meta.name) throw new Error(`${file} : « name » manquant dans l'en-tête`);
  if (!allowed.includes(meta.category))
    throw new Error(`${file} : catégorie « ${meta.category} » inconnue (attendu : ${allowed.join(", ")})`);

  return {
    kind,
    slug,
    name: meta.name,
    category: meta.category,
    description: meta.description ?? "",
    style: meta.style ?? "minimaliste",
    complexite: meta.complexite ?? "simple",
    licence: meta.licence ?? "libre",
    dependencies: list(meta.dependencies),
    variants: list(meta.variants),
    components: list(meta.components),
    html,
    css,
    file,
  };
}

function readElements(dir: string, kind: ElementKind): FolderElement[] {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith(".html"))
    .sort()
    .map((f) => parseElementFile(join(dir, f), kind));
}

export function readSiteFolder(dir: string): SiteFolder {
  const slug = basename(dir);
  const info = JSON.parse(readFileSync(join(dir, "site.json"), "utf8")) as SiteFolderInfo;
  const kit = JSON.parse(readFileSync(join(dir, "kit.json"), "utf8")) as KitTokens;
  return {
    slug,
    dir,
    info,
    kit,
    elements: [...readElements(join(dir, "composants"), "component"), ...readElements(join(dir, "sections"), "section")],
  };
}

export function readSitesDir(root: string): SiteFolder[] {
  if (!existsSync(root)) return [];
  const sites = readdirSync(root)
    .filter((d) => !d.startsWith("_") && !d.startsWith(".") && statSync(join(root, d)).isDirectory())
    .sort()
    .map((d) => readSiteFolder(join(root, d)));
  // Un identifiant d'élément doit être unique dans toute la librairie.
  const seen = new Map<string, string>();
  for (const s of sites)
    for (const el of s.elements) {
      const key = `${el.kind}:${el.slug}`;
      if (seen.has(key)) throw new Error(`« ${el.slug} » existe à la fois dans ${seen.get(key)} et ${s.slug}`);
      seen.set(key, s.slug);
    }
  return sites;
}
