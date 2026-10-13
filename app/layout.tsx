import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { MobileNav, Sidebar } from "@/components/sidebar";
import { libraryStore } from "@/lib/library-store";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Toolbox · Librairie UI", template: "%s · Toolbox" },
  description: "Composants, sections et kits de design, prêts à copier.",
};

// Les données viennent de la base à chaque requête (pas de pré-rendu au build).
export const dynamic = "force-dynamic";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const counts = await libraryStore.navCounts();
  return (
    <html lang="fr" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <div className="flex min-h-dvh">
          <Sidebar counts={counts} />
          <div className="flex min-w-0 flex-1 flex-col">
            <MobileNav counts={counts} />
            <main className="m-2 mt-0 flex min-h-[calc(100dvh-80px)] flex-1 flex-col overflow-hidden rounded-[var(--radius-panel)] bg-paper sm:m-3 sm:mt-0 lg:my-4 lg:ml-0 lg:mr-4 lg:min-h-[calc(100dvh-32px)]">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
