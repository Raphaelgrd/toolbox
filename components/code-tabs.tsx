"use client";

import { useState } from "react";
import { CopyButton } from "./copy-button";

export type CodeTab = { id: string; label: string; code: string; filename?: string };

/** Onglets de code (fond sombre, police mono) avec bouton copier. */
export function CodeTabs({ tabs, defaultTab }: { tabs: CodeTab[]; defaultTab?: string }) {
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.id);
  const tab = tabs.find((t) => t.id === active) ?? tabs[0];
  return (
    <div className="overflow-hidden rounded-[var(--radius-card)] bg-shell text-white">
      <div className="flex flex-wrap items-center gap-2 border-b border-shell-line px-3 py-3">
        <div className="flex flex-wrap gap-1 rounded-full bg-white/5 p-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                t.id === tab.id ? "bg-white text-ink" : "text-shell-text hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        {tab.filename && <span className="hidden font-mono text-xs text-shell-text sm:block">{tab.filename}</span>}
        <CopyButton text={tab.code} className="ml-auto" />
      </div>
      <pre className="max-h-[480px] overflow-auto p-5 font-mono text-[13px] leading-relaxed text-[#e6e6e6]">
        <code>{tab.code}</code>
      </pre>
    </div>
  );
}
