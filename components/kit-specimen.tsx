import { isDark } from "@/lib/color";
import type { KitTokens } from "@/lib/types";

/** Page design system d'un kit : palette, typo, espacements, rayons, ombres, animations. */
export function KitSpecimen({ kit }: { kit: KitTokens }) {
  return (
    <div className="space-y-10">
      <Palette kit={kit} />
      <TypeScale kit={kit} />
      <div className="grid gap-5 lg:grid-cols-2">
        <Spacing kit={kit} />
        <Radii kit={kit} />
      </div>
      <Shadows kit={kit} />
      <Motion kit={kit} />
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="heading text-2xl">{title}</h2>
      {children}
    </section>
  );
}

export function Palette({ kit, compact = false }: { kit: KitTokens; compact?: boolean }) {
  return (
    <Block title="Couleurs">
      <div className={`grid gap-3 ${compact ? "grid-cols-5 sm:grid-cols-10" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"}`}>
        {Object.entries(kit.colors).map(([name, hex]) => (
          <div key={name} className="card overflow-hidden">
            <div
              className={`flex items-end p-3 ${compact ? "h-16" : "h-24"}`}
              style={{ background: hex, color: isDark(hex) ? "#fff" : "#111" }}
            >
              {!compact && <span className="font-mono text-xs opacity-80">{hex}</span>}
            </div>
            <div className="px-3 py-2">
              <p className="truncate text-sm font-medium text-ink">{name}</p>
              <p className="truncate font-mono text-[11px] text-mute">--color-{name}</p>
            </div>
          </div>
        ))}
      </div>
    </Block>
  );
}

export function TypeScale({ kit }: { kit: KitTokens }) {
  const sizes = Object.entries(kit.typography.sizes).reverse();
  return (
    <Block title="Typographie">
      <div className="grid gap-5 lg:grid-cols-[280px_1fr]">
        <div className="card space-y-4 p-6">
          {Object.entries(kit.typography.families).map(([name, family]) => (
            <div key={name}>
              <p className="eyebrow">{name}</p>
              <p className="mt-1 text-2xl text-ink" style={{ fontFamily: family }}>
                Aa Bb Cc 123
              </p>
              <p className="mt-1 truncate font-mono text-[11px] text-mute" title={family}>
                {family}
              </p>
            </div>
          ))}
        </div>
        <div className="card divide-y divide-line overflow-hidden">
          {sizes.map(([name, size]) => (
            <div key={name} className="flex items-baseline gap-4 px-6 py-3">
              <span className="w-24 shrink-0 font-mono text-xs text-mute">
                {name} · {size}
              </span>
              <span
                className="truncate text-ink"
                style={{
                  fontFamily: kit.typography.families.heading,
                  fontSize: size,
                  fontWeight: Number(kit.typography.weights.bold),
                  lineHeight: kit.typography.leading.tight,
                }}
              >
                Une interface nette
              </span>
            </div>
          ))}
        </div>
      </div>
    </Block>
  );
}

function Spacing({ kit }: { kit: KitTokens }) {
  return (
    <Block title="Espacements">
      <div className="card space-y-2 p-6">
        {Object.entries(kit.spacing).map(([name, value]) => (
          <div key={name} className="flex items-center gap-4">
            <span className="w-24 shrink-0 font-mono text-xs text-mute">
              {name} · {value}
            </span>
            <span className="accent-gradient h-3 rounded-full" style={{ width: value }} />
          </div>
        ))}
      </div>
    </Block>
  );
}

function Radii({ kit }: { kit: KitTokens }) {
  return (
    <Block title="Rayons">
      <div className="card grid grid-cols-2 gap-5 p-6 sm:grid-cols-4">
        {Object.entries(kit.radii).map(([name, value]) => (
          <div key={name} className="space-y-2 text-center">
            <div
              className="mx-auto size-20 border-2 border-ink bg-paper-2"
              style={{ borderRadius: value === "999px" ? "999px" : value }}
            />
            <p className="font-mono text-xs text-mute">
              {name} · {value}
            </p>
          </div>
        ))}
      </div>
    </Block>
  );
}

function Shadows({ kit }: { kit: KitTokens }) {
  return (
    <Block title="Ombres">
      <div className="grid gap-5 rounded-[var(--radius-card)] p-8 sm:grid-cols-3" style={{ background: kit.colors.bg }}>
        {Object.entries(kit.shadows).map(([name, value]) => (
          <div
            key={name}
            className="grid h-28 place-items-center"
            style={{
              boxShadow: value,
              background: kit.colors.surface,
              borderRadius: kit.radii.md,
              color: kit.colors.text,
              border: `1px solid ${kit.colors.border}`,
            }}
          >
            <span className="font-mono text-xs">--shadow-{name}</span>
          </div>
        ))}
      </div>
    </Block>
  );
}

function Motion({ kit }: { kit: KitTokens }) {
  return (
    <Block title="Animations">
      <div className="card grid gap-6 p-6 sm:grid-cols-2">
        <div className="space-y-3">
          {Object.entries(kit.motion.durations).map(([name, d]) => (
            <div key={name} className="space-y-1.5">
              <p className="font-mono text-xs text-mute">
                --duration-{name} · {d}
              </p>
              <div className="h-2 overflow-hidden rounded-full bg-paper-2">
                <div
                  className="accent-gradient h-full w-1/4 rounded-full"
                  style={{ animation: `tb-slide ${parseInt(d) * 6}ms ${kit.motion.easings.standard} infinite alternate` }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          {Object.entries(kit.motion.easings).map(([name, e]) => (
            <p key={name} className="font-mono text-xs text-mute">
              <span className="text-ink">--ease-{name}</span>
              <br />
              {e}
            </p>
          ))}
        </div>
      </div>
      <style>{`@keyframes tb-slide{to{transform:translateX(300%)}}`}</style>
    </Block>
  );
}
