import type { ReactElement, ReactNode } from "react";
import { cn } from "../../lib/cn";
import { Drawer } from "../ui/drawer";

export type DetailDrawerProps = {
  trigger: ReactElement;
  title: ReactNode;
  description?: ReactNode;
  status?: ReactNode;
  summary?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  closeLabel: string;
  className?: string;
};

export function DetailDrawer({
  trigger,
  title,
  description,
  status,
  summary,
  children,
  footer,
  closeLabel,
  className,
}: DetailDrawerProps) {
  return (
    <Drawer
      trigger={trigger}
      title={title}
      description={description}
      footer={footer}
      closeLabel={closeLabel}
      className={className}
    >
      {status || summary ? (
        <div className="mb-[var(--koten-gap)] flex flex-wrap items-start justify-between gap-2 border-b border-rule pb-2">
          <div className="min-w-0">{summary}</div>
          {status ? <div className="shrink-0">{status}</div> : null}
        </div>
      ) : null}
      {children}
    </Drawer>
  );
}

export type DetailSectionProps = {
  title: ReactNode;
  meta?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function DetailSection({ title, meta, children, className }: DetailSectionProps) {
  return (
    <section className={cn("mb-[var(--koten-gap)] min-w-0", className)}>
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-rule pb-1">
        <h3 className="text-xs font-semibold text-ink">{title}</h3>
        {meta ? <p className="text-2xs text-faint">{meta}</p> : null}
      </div>
      <div className="pt-1.5">{children}</div>
    </section>
  );
}
