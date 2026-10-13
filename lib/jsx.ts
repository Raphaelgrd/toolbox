// Conversion HTML -> composant React, utilisée à l'import des éléments.
// Volontairement simple : le HTML de la librairie est propre (pas de scripts inline).

const ATTR_MAP: Record<string, string> = {
  class: "className",
  for: "htmlFor",
  tabindex: "tabIndex",
  readonly: "readOnly",
  maxlength: "maxLength",
  autocomplete: "autoComplete",
  autofocus: "autoFocus",
  "stroke-width": "strokeWidth",
  "stroke-linecap": "strokeLinecap",
  "stroke-linejoin": "strokeLinejoin",
  "fill-rule": "fillRule",
  "clip-rule": "clipRule",
  viewbox: "viewBox",
};

const VOID = ["area", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"];

function styleToObject(style: string): string {
  const parts = style
    .split(";")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((decl) => {
      const i = decl.indexOf(":");
      const prop = decl.slice(0, i).trim();
      const value = decl.slice(i + 1).trim().replace(/"/g, '\\"');
      const key = prop.startsWith("--") ? `"${prop}"` : prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      return `${key}: "${value}"`;
    });
  return `{{ ${parts.join(", ")} }}`;
}

export function htmlToJsx(html: string): string {
  let out = html.replace(/<!--([\s\S]*?)-->/g, "{/*$1*/}");
  out = out.replace(/<([a-zA-Z][a-zA-Z0-9-]*)([^>]*?)(\/?)>/g, (_, tag: string, attrs: string, selfClose: string) => {
    const newAttrs = attrs.replace(
      /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*("[^"]*"|'[^']*'))?/g,
      (full: string, name: string, value?: string) => {
        const lower = name.toLowerCase();
        // Les gestionnaires inline (onclick="...") ne sont pas valides en React : à réécrire à la main.
        if (/^on[a-z]+$/.test(lower)) return "";
        if (lower === "style" && value) return `style=${styleToObject(value.slice(1, -1))}`;
        const mapped = ATTR_MAP[lower] ?? name;
        if (value === undefined) return mapped;
        return `${mapped}=${value}`;
      },
    );
    const close = VOID.includes(tag.toLowerCase()) && !selfClose ? " /" : selfClose ? " /" : "";
    return `<${tag}${newAttrs.replace(/\s+/g, " ").replace(/\s+$/, "")}${close}>`;
  });
  return out;
}

export function toPascalCase(slug: string): string {
  return slug
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join("");
}

export function buildReactSource(slug: string, html: string): string {
  const name = toPascalCase(slug);
  const body = htmlToJsx(html.trim())
    .split("\n")
    .map((l) => `      ${l}`)
    .join("\n");
  return `import "./${slug}.css";\n\nexport function ${name}() {\n  return (\n    <>\n${body}\n    </>\n  );\n}\n`;
}

/** Variables CSS du kit utilisées par un bout de CSS. */
export function extractTokens(css: string): string[] {
  return [...new Set([...css.matchAll(/var\((--[a-z0-9-]+)/gi)].map((m) => m[1]))].sort();
}
