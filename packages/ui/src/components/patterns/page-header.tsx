import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

export type PageHeaderProps = {
  breadcrumb?: ReactNode;
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  meta?: ReactNode;
  actions?: ReactNode;
  className?: string;
};

export function PageHeader({
  breadcrumb,
  eyebrow,
  title,
  description,
  meta,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <header
      data-slot="page-header"
      className={cn(
        "flex flex-wrap items-end justify-between gap-x-4 gap-y-2 border-b border-rule-strong pb-[var(--koten-panel-p)]",
        className,
      )}
    >
      <div className="min-w-0">
        {breadcrumb ? <div className="mb-1">{breadcrumb}</div> : null}
        {eyebrow ? <p className="text-2xs font-semibold text-faint">{eyebrow}</p> : null}
        <h1 className="mt-0.5 font-serif text-2xl font-semibold leading-tight text-ink">{title}</h1>
        {description ? (
          <p className="mt-1 max-w-3xl text-xs leading-relaxed text-muted">{description}</p>
        ) : null}
        {meta ? <div className="mt-1 text-2xs text-faint">{meta}</div> : null}
      </div>
      {actions ? <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div> : null}
    </header>
  );
}
