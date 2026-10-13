"use client";

import { useMemo, useState } from "react";
import { Monitor, Moon, Smartphone, Sun, Tablet } from "lucide-react";
import { LivePreview } from "./live-preview";
import { CodeTabs } from "./code-tabs";
import { isDark } from "@/lib/color";
import { toPascalCase } from "@/lib/jsx";
import { kitToCss, withAmbiance } from "@/lib/kit";
import type { KitTokens, LibraryElement } from "@/lib/types";

const DEVICES = [
  { id: "desktop", label: "Desktop", width: 1280, icon: Monitor },
  { id: "tablette", label: "Tablette", width: 768, icon: Tablet },
  { id: "mobile", label: "Mobile", width: 390, icon: Smartphone },
] as const;

type KitOption = { slug: string; name: string; kit: KitTokens | null; primary?: string };

/**
 * Banc d'essai de la fiche : aperçu redimensionnable, bascule clair/sombre,
 * sélecteur de kit (voir l'élément aux couleurs d'un autre site) et code.
 */
export function ElementWorkbench({ element, kits }: { element: LibraryElement; kits: KitOption[] }) {
  const isSection = element.kind === "section";
  const [device, setDevice] = useState<(typeof DEVICES)[number]["id"]>("desktop");
  const [kitSlug, setKitSlug] = useState(element.site.slug);
  const baseKit = kits.find((k) => k.slug === kitSlug)?.kit ?? null;
  const naturalMode = baseKit && isDark(baseKit.colors.bg) ? "sombre" : "clair";
  const [mode, setMode] = useState<"origine" | "clair" | "sombre">("origine");

  const kit = useMemo(
    () => (baseKit && mode !== "origine" && mode !== naturalMode ? withAmbiance(baseKit, mode) : baseKit),
    [baseKit, mode, naturalMode],
  );
  const effectiveMode = mode === "origine" ? naturalMode : mode;
  const dev = DEVICES.find((d) => d.id === device)!;
  const fileBase = element.slug;

  const tabs = [
    { id: "html", label: "HTML", code: element.html, filename: `${fileBase}.html` },
    { id: "css", label: "CSS", code: element.css, filename: `${fileBase}.css` },
    { id: "react", label: "React", code: element.react, filename: `${toPascalCase(fileBase)}.tsx` },
    { id: "tokens", label: "Tokens du kit", code: kit ? kitToCss(kit) : "/* aucun kit */", filename: "tokens.css" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <div className="seg" role="tablist" aria-label="Taille d'écran">
          {DEVICES.map((d) => (
            <button key={d.id} data-active={device === d.id} onClick={() => setDevice(d.id)} className="seg-item flex items-center gap-2">
              <d.icon className="size-4" />
              <span className="hidden sm:inline">{d.label}</span>
            </button>
          ))}
        </div>
        <div className="seg" aria-label="Ambiance">
          <button
            data-active={effectiveMode === "clair"}
            onClick={() => setMode(naturalMode === "clair" ? "origine" : "clair")}
            className="seg-item flex items-center gap-2"
          >
            <Sun className="size-4" /> <span className="hidden sm:inline">Clair</span>
          </button>
          <button
            data-active={effectiveMode === "sombre"}
            onClick={() => setMode(naturalMode === "sombre" ? "origine" : "sombre")}
            className="seg-item flex items-center gap-2"
          >
            <Moon className="size-4" /> <span className="hidden sm:inline">Sombre</span>
          </button>
        </div>
        <label className="ml-auto flex items-center gap-2 rounded-full border border-line bg-paper py-1 pl-4 pr-1 text-sm">
          <span className="text-mute">Kit appliqué</span>
          <span className="size-3 rounded-full ring-1 ring-black/10" style={{ background: baseKit?.colors.primary }} />
          <select
            value={kitSlug}
            onChange={(e) => setKitSlug(e.target.value)}
            className="cursor-pointer rounded-full bg-paper-2 py-1.5 pl-3 pr-2 font-medium text-ink outline-none"
          >
            {kits.map((k) => (
              <option key={k.slug} value={k.slug}>
                {k.name}
                {k.slug === element.site.slug ? " (origine)" : ""}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="card overflow-hidden bg-paper-2 p-3 sm:p-5">
        <div
          className="mx-auto overflow-hidden rounded-2xl border border-line bg-paper shadow-[0_20px_50px_-30px_rgba(0,0,0,.4)] transition-[max-width] duration-500"
          style={{ maxWidth: dev.width }}
        >
          <LivePreview
            key={dev.id}
            html={element.html}
            css={element.css}
            kit={kit}
            layout={isSection ? "page" : "center"}
            viewport={dev.width}
            height={isSection ? (dev.id === "mobile" ? 720 : 620) : 420}
            lazy={false}
            title={`Aperçu : ${element.name}`}
          />
        </div>
        <p className="mt-3 text-center font-mono text-xs text-mute">
          {dev.width} px · {effectiveMode} · kit {kits.find((k) => k.slug === kitSlug)?.name}
        </p>
      </div>

      <CodeTabs tabs={tabs} />
    </div>
  );
}

