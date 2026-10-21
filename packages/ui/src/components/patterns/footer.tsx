import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

export type FooterLink = {
  label: string;
  href: string;
};

export type FooterColumn = {
  id: string;
  title: string;
  links: readonly FooterLink[];
};

export type FooterProps = {
  columns: readonly FooterColumn[];
  company: ReactNode;
  address?: ReactNode;
  legal: readonly FooterLink[];
  note?: ReactNode;
  navLabel: string;
  className?: string;
};

export function Footer({
  columns,
  company,
  address,
  legal,
  note,
  navLabel,
  className,
}: FooterProps) {
  return (
    <footer data-slot="footer" className={cn("mt-6 bg-inverse text-inverse-fg", className)}>
      <div className="koten-container py-5">
        <nav
          aria-label={navLabel}
          className="grid gap-[var(--koten-gap)] sm:grid-cols-2 lg:grid-cols-4"
        >
          {columns.map((column) => (
            <section key={column.id} className="min-w-0">
              <h2 className="border-b border-inverse-fg/25 pb-1 text-2xs font-semibold text-inverse-fg">
                {column.title}
              </h2>
              <ul className="mt-1.5 space-y-1">
                {column.links.map((link) => (
                  <li key={`${column.id}-${link.href}-${link.label}`}>
                    <a
                      href={link.href}
                      className="text-2xs text-inverse-fg/85 underline-offset-2 hover:text-inverse-fg hover:underline"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </nav>

        <div className="mt-5 flex flex-wrap items-start justify-between gap-3 border-t border-inverse-fg/25 pt-3 text-2xs text-inverse-fg/80">
          <div className="min-w-0">
            <p className="font-semibold text-inverse-fg">{company}</p>
            {address ? <p className="mt-0.5">{address}</p> : null}
          </div>
          <ul className="flex flex-wrap gap-x-3 gap-y-1">
            {legal.map((link) => (
              <li key={`${link.href}-${link.label}`}>
                <a
                  href={link.href}
                  className="text-inverse-fg/85 underline-offset-2 hover:text-inverse-fg hover:underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        {note ? <p className="mt-2 text-2xs text-inverse-fg/70">{note}</p> : null}
      </div>
    </footer>
  );
}
