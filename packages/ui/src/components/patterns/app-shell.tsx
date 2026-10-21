import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

export type AppShellProps = {
  skipLabel: string;
  skipHref?: string;
  brand: ReactNode;
  sidebar: ReactNode;
  sidebarLabel: string;
  topbar: ReactNode;
  children: ReactNode;
  className?: string;
};

export function AppShell({
  skipLabel,
  skipHref = "#contenido",
  brand,
  sidebar,
  sidebarLabel,
  topbar,
  children,
  className,
}: AppShellProps) {
  return (
    <div
      data-slot="app-shell"
      className={cn(
        "min-h-dvh bg-paper text-ink lg:grid lg:grid-cols-[232px_minmax(0,1fr)]",
        className,
      )}
    >
      <a
        href={skipHref}
        className="sr-only focus:not-sr-only focus:absolute focus:start-3 focus:top-3 focus:z-50 focus:border focus:border-primary focus:bg-surface focus:px-3 focus:py-2 focus:text-xs focus:font-semibold"
      >
        {skipLabel}
      </a>

      <aside aria-label={sidebarLabel} className="hidden border-e border-rule bg-surface lg:block">
        <div className="sticky top-0 flex h-dvh flex-col">
          <div className="flex h-12 shrink-0 items-center border-b border-rule px-3">{brand}</div>
          <div className="min-h-0 flex-1 overflow-y-auto">{sidebar}</div>
        </div>
      </aside>

      <div className="min-w-0">
        {topbar}
        <main id="contenido" className="min-w-0 p-[var(--koten-page-px)]">
          {children}
        </main>
      </div>
    </div>
  );
}
