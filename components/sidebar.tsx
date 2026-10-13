"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Blocks,
  ChevronLeft,
  ChevronRight,
  Compass,
  LayoutTemplate,
  Menu,
  X,
  Palette,
  Shapes,
  type LucideIcon,
} from "lucide-react";
import type { NavCounts } from "@/lib/types";
import { COMPONENT_CATEGORIES, FOUNDATIONS, SECTION_TYPES } from "@/lib/taxonomy";

const STORAGE_KEY = "toolbox:sidebar-collapsed";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <span className="accent-gradient grid size-8 place-items-center rounded-[10px] shadow-[0_0_24px_-6px_var(--color-hot)]">
        <span className="size-3 rounded-[4px] border-2 border-white" />
      </span>
      {!compact && (
        <span className="flex items-baseline gap-2">
          <span className="text-[22px] font-bold tracking-[-0.04em] text-white">Toolbox</span>
          <span className="text-sm text-shell-text">librairie UI</span>
        </span>
      )}
    </span>
  );
}

function NavItem({
  href,
  label,
  count,
  icon: Icon,
  dot,
  active,
  collapsed,
}: {
  href: string;
  label: string;
  count?: number;
  icon?: LucideIcon;
  dot?: string | null;
  active: boolean;
  collapsed: boolean;
}) {
  return (
    <Link
      href={href}
      title={collapsed ? label : undefined}
      data-active={active}
      className={`group flex items-center gap-3 rounded-2xl border px-3 py-2 text-[15px] transition-colors ${
        active
          ? "border-shell-line bg-shell-2 font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,.04)]"
          : "border-transparent text-shell-text hover:text-white"
      } ${collapsed ? "justify-center px-0" : ""}`}
    >
      {Icon ? (
        <Icon className="size-[18px] shrink-0" strokeWidth={1.75} />
      ) : dot !== undefined ? (
        <span className="size-2.5 shrink-0 rounded-full ring-1 ring-white/15" style={{ background: dot ?? "#555" }} />
      ) : (
        <span className="size-[18px] shrink-0" />
      )}
      {!collapsed && <span className="flex-1 truncate">{label}</span>}
      {!collapsed && count !== undefined && (
        <span className={`font-mono text-xs tabular-nums ${active ? "text-white/60" : "text-white/30"}`}>{count}</span>
      )}
    </Link>
  );
}

function Group({ title, collapsed, children }: { title: string; collapsed: boolean; children: React.ReactNode }) {
  return (
    <div className="mt-6">
      {collapsed ? (
        <div className="mx-auto mb-2 h-px w-6 bg-shell-line" />
      ) : (
        <p className="mb-1.5 px-3 text-sm text-shell-text/80">{title}</p>
      )}
      <div className="space-y-0.5">{children}</div>
    </div>
  );
}

export function Sidebar({ counts }: { counts: NavCounts }) {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    try {
      setCollapsed(localStorage.getItem(STORAGE_KEY) === "1");
    } catch {}
  }, []);

  const toggle = () => {
    setCollapsed((c) => {
      try {
        localStorage.setItem(STORAGE_KEY, c ? "0" : "1");
      } catch {}
      return !c;
    });
  };

  return (
    <aside
      className={`sticky top-0 hidden h-dvh shrink-0 flex-col overflow-y-auto px-4 pb-6 pt-7 transition-[width] duration-300 lg:flex ${
        collapsed ? "w-[84px]" : "w-[288px]"
      }`}
    >
      <div className={`mb-8 flex items-center ${collapsed ? "flex-col gap-4" : "justify-between pl-2"}`}>
        <Link href="/" aria-label="Accueil">
          <Logo compact={collapsed} />
        </Link>
        <button
          onClick={toggle}
          className="grid size-8 place-items-center rounded-full text-shell-text hover:bg-shell-2 hover:text-white"
          aria-label={collapsed ? "Déplier la barre latérale" : "Replier la barre latérale"}
        >
          {collapsed ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
        </button>
      </div>

      <NavContent counts={counts} collapsed={collapsed} />
    </aside>
  );
}

function NavContent({ counts, collapsed }: { counts: NavCounts; collapsed: boolean }) {
  const pathname = usePathname();
  const is = (href: string) => pathname === href;
  return (
    <>
      <nav className="space-y-0.5">
        <NavItem
          href="/"
          label="Explorer"
          icon={Compass}
          count={counts.totalComponents + counts.totalSections}
          active={is("/")}
          collapsed={collapsed}
        />
      </nav>

      <Group title="Sites" collapsed={collapsed}>
        <NavItem href="/sites" label="Tous les sites" icon={Palette} count={counts.kits.length} active={is("/sites")} collapsed={collapsed} />
        {!collapsed &&
          counts.kits.map((k) => (
            <NavItem
              key={k.slug}
              href={`/sites/${k.slug}`}
              label={k.name}
              dot={k.primary}
              count={k.count}
              active={pathname.startsWith(`/sites/${k.slug}`)}
              collapsed={collapsed}
            />
          ))}
      </Group>

      <Group title="Sections" collapsed={collapsed}>
        <NavItem
          href="/sections"
          label="Toutes les sections"
          icon={LayoutTemplate}
          count={counts.totalSections}
          active={is("/sections")}
          collapsed={collapsed}
        />
        {!collapsed &&
          SECTION_TYPES.map((s) => (
            <NavItem
              key={s.value}
              href={`/sections/${s.value}`}
              label={s.label}
              count={counts.sections[s.value] ?? 0}
              active={is(`/sections/${s.value}`)}
              collapsed={collapsed}
            />
          ))}
      </Group>

      <Group title="Composants" collapsed={collapsed}>
        <NavItem
          href="/composants"
          label="Tous les composants"
          icon={Shapes}
          count={counts.totalComponents}
          active={is("/composants")}
          collapsed={collapsed}
        />
        {!collapsed &&
          COMPONENT_CATEGORIES.map((c) => (
            <NavItem
              key={c.value}
              href={`/composants/${c.value}`}
              label={c.label}
              count={counts.components[c.value] ?? 0}
              active={is(`/composants/${c.value}`)}
              collapsed={collapsed}
            />
          ))}
      </Group>

      <Group title="Fondations" collapsed={collapsed}>
        {collapsed ? (
          <NavItem href="/fondations/couleurs" label="Fondations" icon={Blocks} active={pathname.startsWith("/fondations")} collapsed />
        ) : (
          FOUNDATIONS.map((f) => (
            <NavItem
              key={f.value}
              href={`/fondations/${f.value}`}
              label={f.label}
              count={counts.kits.length}
              active={is(`/fondations/${f.value}`)}
              collapsed={collapsed}
            />
          ))
        )}
      </Group>
    </>
  );
}

/** Navigation mobile : barre sombre + tiroir plein écran. */
export function MobileNav({ counts }: { counts: NavCounts }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => setOpen(false), [pathname]);
  return (
    <div className="flex items-center justify-between px-4 py-3 lg:hidden">
      <Link href="/" aria-label="Accueil">
        <Logo />
      </Link>
      <button
        onClick={() => setOpen(true)}
        className="grid size-10 place-items-center rounded-full border border-shell-line text-white"
        aria-label="Ouvrir le menu"
      >
        <Menu className="size-5" />
      </button>
      {open && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-shell px-4 pb-10 pt-4">
          <div className="mb-6 flex items-center justify-between">
            <Logo />
            <button
              onClick={() => setOpen(false)}
              className="grid size-10 place-items-center rounded-full border border-shell-line text-white"
              aria-label="Fermer le menu"
            >
              <X className="size-5" />
            </button>
          </div>
          <NavContent counts={counts} collapsed={false} />
        </div>
      )}
    </div>
  );
}
