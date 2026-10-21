import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

export type BreadcrumbItem = {
  label: ReactNode;
  href?: string;
  current?: boolean;
};

export type BreadcrumbProps = {
  items: readonly BreadcrumbItem[];
  label: string;
  separator?: ReactNode;
  className?: string;
};

export function Breadcrumb({ items, label, separator = "/", className }: BreadcrumbProps) {
  return (
    <nav aria-label={label} data-slot="breadcrumb" className={cn("min-w-0", className)}>
      <ol className="flex flex-wrap items-center gap-1 text-xs">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const current = item.current ?? isLast;

          return (
            <li
              key={`${item.href ?? "crumb"}-${String(item.label)}`}
              className="flex items-center gap-1"
            >
              {index > 0 ? (
                <span aria-hidden="true" className="text-faint">
                  {separator}
                </span>
              ) : null}
              {item.href && !current ? (
                <a
                  href={item.href}
                  className="text-link underline decoration-rule-strong underline-offset-2 hover:decoration-link"
                >
                  {item.label}
                </a>
              ) : (
                <span
                  aria-current={current ? "page" : undefined}
                  className={current ? "font-semibold text-ink" : "text-muted"}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
