"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { buildPreviewDoc } from "@/lib/preview";
import type { KitTokens } from "@/lib/types";

/**
 * Aperçu vivant : le vrai rendu dans une iframe isolée.
 * - sandbox="allow-scripts" sans allow-same-origin : le code n'accède ni à l'app ni aux cookies ;
 * - la CSP du document interdit tout appel réseau ;
 * - `viewport` simule une largeur d'écran, puis on réduit à l'échelle du conteneur.
 */
export function LivePreview({
  html,
  css,
  kit,
  layout,
  viewport,
  height,
  lazy = true,
  interactive = true,
  title = "Aperçu",
}: {
  html: string;
  css: string;
  kit: KitTokens | null;
  layout: "center" | "page";
  /** Largeur simulée en px. Par défaut : 1280 pour une section, largeur réelle pour un composant. */
  viewport?: number;
  /** Hauteur visible en px. */
  height: number;
  lazy?: boolean;
  interactive?: boolean;
  title?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [visible, setVisible] = useState(!lazy);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(el);
    let io: IntersectionObserver | undefined;
    if (lazy) {
      io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io?.disconnect();
          }
        },
        { rootMargin: "300px" },
      );
      io.observe(el);
    }
    return () => {
      ro.disconnect();
      io?.disconnect();
    };
  }, [lazy]);

  const doc = useMemo(() => buildPreviewDoc({ html, css, kit, layout }), [html, css, kit, layout]);

  const virtual = viewport ?? (layout === "page" ? 1280 : width || 1);
  const scale = width && virtual > width ? width / virtual : 1;
  const frameWidth = width && virtual > width ? virtual : width;
  const offset = width && frameWidth < width ? (width - frameWidth) / 2 : 0;

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ height, background: kit?.colors.bg ?? "#fff" }}
    >
      {visible && width > 0 && (
        <iframe
          title={title}
          srcDoc={doc}
          sandbox="allow-scripts"
          referrerPolicy="no-referrer"
          loading="lazy"
          className="absolute top-0 border-0"
          style={{
            left: offset,
            width: frameWidth,
            height: height / scale,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            pointerEvents: interactive ? "auto" : "none",
          }}
        />
      )}
    </div>
  );
}
