// Document HTML autonome rendu dans l'iframe d'aperçu.
// La CSP interdit toute requête réseau : un code extrait d'un site tiers
// ne peut rien charger ni rien envoyer.
import { kitToCss } from "./kit";
import type { KitTokens } from "./types";

const CSP =
  "default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'; img-src data:; font-src data:; media-src data:";

export function buildPreviewDoc(opts: {
  html: string;
  css: string;
  kit: KitTokens | null;
  /** "center" pour un composant isolé, "page" pour une section pleine largeur. */
  layout: "center" | "page";
}): string {
  const { html, css, kit, layout } = opts;
  const base = `
*,*::before,*::after{box-sizing:border-box}
html,body{margin:0;min-height:100%}
body{background:var(--color-bg,#fff);color:var(--color-text,#111);font-family:var(--font-body,system-ui,sans-serif);-webkit-font-smoothing:antialiased}
${layout === "center" ? "body{display:grid;place-items:center;min-height:100vh;padding:24px}" : ""}
img{max-width:100%;display:block}`;
  return `<!doctype html><html lang="fr"><head><meta charset="utf-8">
<meta http-equiv="Content-Security-Policy" content="${CSP}">
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>${kit ? kitToCss(kit) : ""}${base}
${css}</style></head><body>${html}</body></html>`;
}
