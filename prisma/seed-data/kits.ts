import type { KitTokens } from "../../lib/types";

// Kits de démonstration : des sites fictifs créés en interne,
// chacun avec un design system complet.

const SANS = "'Helvetica Neue', Helvetica, Arial, system-ui, sans-serif";
const GROTESK = "'Avenir Next', 'Segoe UI', system-ui, sans-serif";
const SERIF = "'Iowan Old Style', 'Palatino Linotype', Georgia, serif";
const MONO = "ui-monospace, 'SF Mono', Menlo, Consolas, monospace";

function kit(p: {
  colors: KitTokens["colors"];
  heading: string;
  body: string;
  radii: KitTokens["radii"];
  shadows: KitTokens["shadows"];
  headingWeight?: string;
  ease?: string;
}): KitTokens {
  return {
    colors: p.colors,
    typography: {
      families: { heading: p.heading, body: p.body, mono: MONO },
      sizes: {
        xs: "12px", sm: "14px", base: "16px", lg: "18px", xl: "22px",
        "2xl": "28px", "3xl": "36px", "4xl": "48px", "5xl": "64px",
      },
      weights: { regular: "400", medium: "500", bold: p.headingWeight ?? "700" },
      leading: { tight: "1.1", snug: "1.3", normal: "1.55" },
    },
    spacing: {
      "1": "4px", "2": "8px", "3": "12px", "4": "16px", "5": "20px", "6": "24px",
      "8": "32px", "10": "40px", "12": "48px", "16": "64px", "20": "80px", "24": "96px",
    },
    radii: p.radii,
    shadows: p.shadows,
    breakpoints: { sm: "640px", md: "768px", lg: "1024px", xl: "1280px" },
    motion: {
      durations: { fast: "150ms", base: "250ms", slow: "450ms" },
      easings: { standard: p.ease ?? "cubic-bezier(0.2, 0, 0, 1)", emphasized: "cubic-bezier(0.3, 0, 0, 1.3)" },
    },
  };
}

export interface SeedSite {
  slug: string;
  name: string;
  url: string | null;
  domain: string | null;
  sector: { value: string; label: string };
  description: string;
  style: string;
  ambiance: "clair" | "sombre";
  kit: KitTokens;
}

export const SITES: SeedSite[] = [
  {
    slug: "pulsor",
    name: "Pulsor",
    url: null,
    domain: null,
    sector: { value: "agence", label: "Agence" },
    description: "La boîte à outils interne : composants sobres, accent magenta, rayons généreux.",
    style: "minimaliste",
    ambiance: "clair",
    kit: kit({
      colors: {
        primary: "#e5195e", secondary: "#ff7a1a", accent: "#7c3aed",
        bg: "#ffffff", surface: "#f6f5f4", text: "#141414", muted: "#6f6c69", border: "#e7e4e1",
        success: "#1f9d55", danger: "#d92d20",
      },
      heading: GROTESK,
      body: SANS,
      radii: { sm: "10px", md: "16px", lg: "24px", full: "999px" },
      shadows: {
        sm: "0 1px 2px rgba(20,20,20,.06)",
        md: "0 6px 20px -6px rgba(20,20,20,.14)",
        lg: "0 24px 48px -16px rgba(20,20,20,.22)",
      },
    }),
  },
  {
    slug: "maison-lumen",
    name: "Maison Lumen",
    url: null,
    domain: null,
    sector: { value: "juridique", label: "Juridique" },
    description: "Cabinet fictif : fond nuit, serif éditoriale, filets dorés.",
    style: "editorial",
    ambiance: "sombre",
    kit: kit({
      colors: {
        primary: "#d4b26a", secondary: "#8a7650", accent: "#e9dcc0",
        bg: "#0e0e10", surface: "#17171a", text: "#f3efe6", muted: "#9b968c", border: "#2a2925",
        success: "#7fb68b", danger: "#d9776b",
      },
      heading: SERIF,
      body: SANS,
      headingWeight: "500",
      radii: { sm: "2px", md: "4px", lg: "8px", full: "999px" },
      shadows: {
        sm: "0 1px 0 rgba(212,178,106,.15)",
        md: "0 12px 32px -12px rgba(0,0,0,.6)",
        lg: "0 32px 64px -24px rgba(0,0,0,.8)",
      },
      ease: "cubic-bezier(0.4, 0, 0.2, 1)",
    }),
  },
  {
    slug: "nordwave",
    name: "Nordwave",
    url: null,
    domain: null,
    sector: { value: "saas", label: "SaaS" },
    description: "Éditeur SaaS fictif : bleu franc, interface dense et nette.",
    style: "corporate",
    ambiance: "clair",
    kit: kit({
      colors: {
        primary: "#3b5bfd", secondary: "#0ea5e9", accent: "#f59e0b",
        bg: "#f7f8fb", surface: "#ffffff", text: "#0f172a", muted: "#64748b", border: "#e2e8f0",
        success: "#16a34a", danger: "#dc2626",
      },
      heading: SANS,
      body: SANS,
      radii: { sm: "6px", md: "10px", lg: "16px", full: "999px" },
      shadows: {
        sm: "0 1px 2px rgba(15,23,42,.06)",
        md: "0 8px 24px -8px rgba(15,23,42,.16)",
        lg: "0 24px 56px -20px rgba(15,23,42,.28)",
      },
    }),
  },
  {
    slug: "verdant",
    name: "Verdant",
    url: null,
    domain: null,
    sector: { value: "energie", label: "Énergie & environnement" },
    description: "Marque fictive d'énergie verte : tons naturels, papier chaud.",
    style: "organique",
    ambiance: "clair",
    kit: kit({
      colors: {
        primary: "#1f7a4d", secondary: "#c4d96f", accent: "#e07a3f",
        bg: "#f5f2ea", surface: "#fffdf7", text: "#1d2a22", muted: "#5d6b62", border: "#dfd9c9",
        success: "#1f7a4d", danger: "#b4432f",
      },
      heading: SERIF,
      body: GROTESK,
      headingWeight: "600",
      radii: { sm: "8px", md: "14px", lg: "28px", full: "999px" },
      shadows: {
        sm: "0 1px 2px rgba(29,42,34,.08)",
        md: "0 10px 24px -10px rgba(29,42,34,.2)",
        lg: "0 28px 56px -24px rgba(29,42,34,.3)",
      },
    }),
  },
  {
    slug: "atelier-brut",
    name: "Atelier Brut",
    url: null,
    domain: null,
    sector: { value: "creatif", label: "Studio créatif" },
    description: "Studio fictif : jaune vif, traits épais, ombres dures, zéro arrondi.",
    style: "brutaliste",
    ambiance: "clair",
    kit: kit({
      colors: {
        primary: "#ffd400", secondary: "#ff4f1f", accent: "#2f5bff",
        bg: "#fffbea", surface: "#ffffff", text: "#0a0a0a", muted: "#3d3d3d", border: "#0a0a0a",
        success: "#00a86b", danger: "#ff2e2e",
      },
      heading: "'Arial Black', 'Helvetica Neue', Arial, sans-serif",
      body: MONO,
      headingWeight: "900",
      radii: { sm: "0px", md: "0px", lg: "0px", full: "0px" },
      shadows: { sm: "3px 3px 0 #0a0a0a", md: "6px 6px 0 #0a0a0a", lg: "10px 10px 0 #0a0a0a" },
      ease: "steps(4, end)",
    }),
  },
  {
    slug: "glacier",
    name: "Glacier",
    url: null,
    domain: null,
    sector: { value: "fintech", label: "Fintech" },
    description: "Néobanque fictive : nuit profonde, verre dépoli, lueurs violettes.",
    style: "glassmorphism",
    ambiance: "sombre",
    kit: kit({
      colors: {
        primary: "#8b5cf6", secondary: "#22d3ee", accent: "#f472b6",
        bg: "#0b1020", surface: "#141a2e", text: "#eef1ff", muted: "#97a0c3", border: "#2a3354",
        success: "#34d399", danger: "#fb7185",
      },
      heading: GROTESK,
      body: GROTESK,
      headingWeight: "600",
      radii: { sm: "10px", md: "16px", lg: "28px", full: "999px" },
      shadows: {
        sm: "0 1px 0 rgba(255,255,255,.06) inset",
        md: "0 12px 40px -12px rgba(139,92,246,.45)",
        lg: "0 30px 80px -20px rgba(34,211,238,.35)",
      },
    }),
  },
];
