import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

export type FormSectionProps = {
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  columns?: 1 | 2;
  className?: string;
};

export function FormSection({
  title,
  description,
  children,
  columns = 2,
  className,
}: FormSectionProps) {
  return (
    <fieldset
      data-slot="form-section"
      className={cn("min-w-0 border border-rule bg-surface p-[var(--koten-panel-p)]", className)}
    >
      <legend className="px-1 text-xs font-semibold text-ink">{title}</legend>
      {description ? (
        <p className="mt-1 text-2xs leading-relaxed text-muted">{description}</p>
      ) : null}
      <div
        className={cn(
          "mt-[var(--koten-gap)] grid gap-[var(--koten-gap)]",
          columns === 2 && "sm:grid-cols-2",
        )}
      >
        {children}
      </div>
    </fieldset>
  );
}
