/** Titre de page : grand, serré, avec un sous-titre gris. */
export function PageIntro({ title, subtitle, children }: { title: string; subtitle?: string; children?: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-6">
      <div className="min-w-0">
        <h1 className="heading text-[40px] leading-[1.05] sm:text-[52px]">{title}</h1>
        {subtitle && <p className="mt-3 max-w-2xl text-lg text-mute sm:text-[22px] sm:leading-snug">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}
