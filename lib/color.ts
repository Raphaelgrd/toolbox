// Calcul de la couleur dominante et rangement dans une famille de teinte.
// C'est ce qui rend le filtre couleur fiable : on ne compte pas sur un tag saisi à la main.

export function parseHex(hex: string): [number, number, number] | null {
  const m = hex.trim().match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (!m) return null;
  let h = m[1];
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)) as [number, number, number];
}

export function rgbToHsl([r, g, b]: [number, number, number]): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
  else if (max === g) h = (b - r) / d + 2;
  else h = (r - g) / d + 4;
  return [h * 60, s, l];
}

export function colorFamily(hex: string): string {
  const rgb = parseHex(hex);
  if (!rgb) return "gris";
  const [h, s, l] = rgbToHsl(rgb);
  if (l < 0.12) return "noir";
  if (l > 0.9) return "blanc";
  if (s < 0.15) return l < 0.25 ? "noir" : "gris";
  if (h < 15 || h >= 345) return l < 0.35 && s < 0.6 ? "marron" : "rouge";
  if (h < 40) return l < 0.4 ? "marron" : "orange";
  if (h < 65) return "jaune";
  if (h < 160) return "vert";
  if (h < 190) return "turquoise";
  if (h < 255) return "bleu";
  if (h < 290) return "violet";
  return "rose";
}

/** Une couleur est-elle sombre ? (pour choisir texte clair ou foncé) */
export function isDark(hex: string): boolean {
  const rgb = parseHex(hex);
  if (!rgb) return false;
  const [r, g, b] = rgb.map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 0.25;
}

// Rôles du kit qui décrivent le « papier » plutôt que l'identité de l'élément.
const NEUTRAL_ROLES = new Set(["bg", "surface", "border", "muted"]);

/**
 * Couleur dominante d'un élément : on lit son CSS, on résout les variables
 * --color-* avec le kit, et on pondère par surface probable
 * (fond > bordure > texte). Les fonds de page et couleurs quasi neutres
 * comptent moins, pour qu'un bouton bleu sur fond blanc soit classé « bleu ».
 */
export function dominantColor(css: string, colors: Record<string, string>): string | null {
  const scores = new Map<string, number>();
  const add = (hex: string, w: number) => {
    const rgb = parseHex(hex);
    if (!rgb) return;
    const [, s] = rgbToHsl(rgb);
    const key = hex.toLowerCase();
    scores.set(key, (scores.get(key) ?? 0) + w * (s < 0.15 ? 0.35 : 1));
  };
  const decl = /(--[a-z0-9-]+|background(?:-color)?|border(?:-[a-z]+)?(?:-color)?|color|fill|stroke|box-shadow)\s*:\s*([^;}]+)/gi;
  let m: RegExpExecArray | null;
  while ((m = decl.exec(css))) {
    const prop = m[1].toLowerCase();
    const weight = prop.startsWith("background") ? 5 : prop.startsWith("--") ? 3 : prop.startsWith("border") ? 2 : prop === "box-shadow" ? 0.5 : 1.5;
    for (const r of m[2].matchAll(/var\(--color-([a-z0-9-]+)/gi)) {
      const role = r[1];
      if (!colors[role]) continue;
      add(colors[role], weight * (NEUTRAL_ROLES.has(role) ? 0.2 : role === "text" ? 0.6 : 1));
    }
    for (const hex of m[2].match(/#[0-9a-f]{3,6}\b/gi) ?? []) add(hex, weight);
  }
  let best: string | null = null;
  let bestScore = 0;
  for (const [hex, score] of scores) if (score > bestScore) { best = hex; bestScore = score; }
  return best;
}
