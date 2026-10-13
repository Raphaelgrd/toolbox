// Conversion d'un kit de tokens vers les formats utilisables dans un projet.
import type { KitTokens } from "./types";

/** Liste à plat des variables CSS d'un kit : [["--color-primary", "#000"], ...] */
export function kitVariables(kit: KitTokens): [string, string][] {
  const vars: [string, string][] = [];
  for (const [k, v] of Object.entries(kit.colors)) vars.push([`--color-${k}`, v]);
  for (const [k, v] of Object.entries(kit.typography.families)) vars.push([`--font-${k}`, v]);
  for (const [k, v] of Object.entries(kit.typography.sizes)) vars.push([`--text-${k}`, v]);
  for (const [k, v] of Object.entries(kit.typography.weights)) vars.push([`--weight-${k}`, v]);
  for (const [k, v] of Object.entries(kit.typography.leading)) vars.push([`--leading-${k}`, v]);
  for (const [k, v] of Object.entries(kit.spacing)) vars.push([`--space-${k}`, v]);
  for (const [k, v] of Object.entries(kit.radii)) vars.push([`--radius-${k}`, v]);
  for (const [k, v] of Object.entries(kit.shadows)) vars.push([`--shadow-${k}`, v]);
  for (const [k, v] of Object.entries(kit.motion.durations)) vars.push([`--duration-${k}`, v]);
  for (const [k, v] of Object.entries(kit.motion.easings)) vars.push([`--ease-${k}`, v]);
  return vars;
}

export function kitToCss(kit: KitTokens, selector = ":root"): string {
  const lines = kitVariables(kit).map(([k, v]) => `  ${k}: ${v};`);
  return `${selector} {\n${lines.join("\n")}\n}`;
}

/** Thème Tailwind v4 (@theme) : les tokens deviennent des utilitaires. */
export function kitToTailwind(kit: KitTokens): string {
  const out: string[] = [];
  for (const [k, v] of Object.entries(kit.colors)) out.push(`  --color-${k}: ${v};`);
  for (const [k, v] of Object.entries(kit.typography.families)) out.push(`  --font-${k}: ${v};`);
  for (const [k, v] of Object.entries(kit.typography.sizes)) out.push(`  --text-${k}: ${v};`);
  for (const [k, v] of Object.entries(kit.spacing)) out.push(`  --spacing-${k}: ${v};`);
  for (const [k, v] of Object.entries(kit.radii)) out.push(`  --radius-${k}: ${v};`);
  for (const [k, v] of Object.entries(kit.shadows)) out.push(`  --shadow-${k}: ${v};`);
  for (const [k, v] of Object.entries(kit.breakpoints)) out.push(`  --breakpoint-${k}: ${v};`);
  for (const [k, v] of Object.entries(kit.motion.easings)) out.push(`  --ease-${k}: ${v};`);
  return `@import "tailwindcss";\n\n@theme {\n${out.join("\n")}\n}`;
}

export function kitToJson(kit: KitTokens): string {
  return JSON.stringify(kit, null, 2);
}

/**
 * Variante claire ou sombre d'un kit : on remplace le « papier »
 * (fond, surface, texte, bordures) et on garde l'identité (primaire, accents).
 */
export function withAmbiance(kit: KitTokens, mode: "clair" | "sombre"): KitTokens {
  const paper =
    mode === "sombre"
      ? { bg: "#0f0f11", surface: "#18181b", text: "#f4f4f5", muted: "#a1a1aa", border: "#2c2c30" }
      : { bg: "#ffffff", surface: "#f7f7f6", text: "#141414", muted: "#6b6b6b", border: "#e6e4e1" };
  return { ...kit, colors: { ...kit.colors, ...paper } };
}

// Postgres (JSONB) ne conserve pas l'ordre des clés : on remet l'ordre canonique à la lecture.
const ORDER = {
  colors: ["primary", "secondary", "accent", "bg", "surface", "text", "muted", "border", "success", "danger"],
  families: ["heading", "body", "mono"],
  sizes: ["xs", "sm", "base", "lg", "xl", "2xl", "3xl", "4xl", "5xl"],
  weights: ["regular", "medium", "bold"],
  leading: ["tight", "snug", "normal"],
  radii: ["sm", "md", "lg", "full"],
  shadows: ["sm", "md", "lg"],
  breakpoints: ["sm", "md", "lg", "xl"],
  durations: ["fast", "base", "slow"],
  easings: ["standard", "emphasized"],
};

function ordered<T>(obj: Record<string, T>, order: string[]): Record<string, T> {
  const keys = Object.keys(obj).sort((a, b) => {
    const ia = order.indexOf(a), ib = order.indexOf(b);
    return (ia < 0 ? 999 : ia) - (ib < 0 ? 999 : ib) || a.localeCompare(b);
  });
  return Object.fromEntries(keys.map((k) => [k, obj[k]]));
}

export function normalizeKit(kit: KitTokens): KitTokens {
  return {
    colors: ordered(kit.colors, ORDER.colors),
    typography: {
      families: ordered(kit.typography.families, ORDER.families),
      sizes: ordered(kit.typography.sizes, ORDER.sizes),
      weights: ordered(kit.typography.weights, ORDER.weights),
      leading: ordered(kit.typography.leading, ORDER.leading),
    },
    spacing: kit.spacing,
    radii: ordered(kit.radii, ORDER.radii),
    shadows: ordered(kit.shadows, ORDER.shadows),
    breakpoints: ordered(kit.breakpoints, ORDER.breakpoints),
    motion: {
      durations: ordered(kit.motion.durations, ORDER.durations),
      easings: ordered(kit.motion.easings, ORDER.easings),
    },
  };
}
