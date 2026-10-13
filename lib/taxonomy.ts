// Vocabulaire partagé par l'app web, le seed et (plus tard) le MCP.

export type ElementKind = "component" | "section";

export const COMPONENT_CATEGORIES = [
  { value: "boutons", label: "Boutons" },
  { value: "cartes", label: "Cartes" },
  { value: "inputs", label: "Inputs" },
  { value: "navigation", label: "Navigation" },
  { value: "toggles", label: "Toggles" },
  { value: "loaders", label: "Loaders" },
  { value: "badges", label: "Badges" },
  { value: "modales", label: "Modales" },
  { value: "sliders", label: "Sliders" },
] as const;

export const SECTION_TYPES = [
  { value: "hero", label: "Hero" },
  { value: "features", label: "Features" },
  { value: "pricing", label: "Pricing" },
  { value: "temoignages", label: "Témoignages" },
  { value: "cta", label: "CTA" },
  { value: "faq", label: "FAQ" },
  { value: "footer", label: "Footer" },
  { value: "contact", label: "Contact" },
] as const;

export const FOUNDATIONS = [
  { value: "couleurs", label: "Couleurs" },
  { value: "typographies", label: "Typographies" },
  { value: "espacements", label: "Espacements" },
  { value: "ombres", label: "Ombres" },
  { value: "animations", label: "Animations" },
] as const;

/** Familles de filtres de la barre du haut, dans l'ordre d'affichage. */
export const FILTER_FAMILIES = [
  { key: "secteur", label: "Secteur" },
  { key: "couleur", label: "Couleur" },
  { key: "style", label: "Style" },
  { key: "ambiance", label: "Ambiance" },
  { key: "complexite", label: "Complexité" },
  { key: "site", label: "Site d'origine" },
] as const;

export type FilterFamily = (typeof FILTER_FAMILIES)[number]["key"];

/** Familles de teinte et leur pastille. */
export const COLOR_FAMILIES: Record<string, { label: string; swatch: string }> = {
  rouge: { label: "Rouge", swatch: "#e5484d" },
  orange: { label: "Orange", swatch: "#f76b15" },
  jaune: { label: "Jaune", swatch: "#f5c518" },
  vert: { label: "Vert", swatch: "#30a46c" },
  turquoise: { label: "Turquoise", swatch: "#12a594" },
  bleu: { label: "Bleu", swatch: "#3e63dd" },
  violet: { label: "Violet", swatch: "#8e4ec6" },
  rose: { label: "Rose", swatch: "#e93d82" },
  marron: { label: "Marron", swatch: "#a07553" },
  noir: { label: "Noir", swatch: "#111111" },
  gris: { label: "Gris", swatch: "#8b8d98" },
  blanc: { label: "Blanc", swatch: "#f4f4f5" },
};

export function categoryLabel(kind: ElementKind, value: string): string {
  const list = kind === "component" ? COMPONENT_CATEGORIES : SECTION_TYPES;
  return list.find((c) => c.value === value)?.label ?? value;
}
