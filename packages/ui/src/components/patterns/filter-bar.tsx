import type { FormEvent, ReactNode } from "react";
import { cn } from "../../lib/cn";
import { Button } from "../ui/button";

export type FilterBarProps = {
  label: string;
  children: ReactNode;
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  onReset?: () => void;
  submitLabel: string;
  resetLabel: string;
  resultLabel?: ReactNode;
  className?: string;
};

export function FilterBar({
  label,
  children,
  onSubmit,
  onReset,
  submitLabel,
  resetLabel,
  resultLabel,
  className,
}: FilterBarProps) {
  return (
    <search
      aria-label={label}
      data-slot="filter-bar"
      className={cn("border border-rule bg-surface", className)}
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit?.(event);
        }}
        className="min-w-0"
      >
        <div className="grid gap-[var(--koten-gap)] p-[var(--koten-panel-p)] sm:grid-cols-2 xl:grid-cols-4">
          {children}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-rule bg-tint px-[var(--koten-panel-p)] py-1.5">
          <p className="text-2xs text-muted">{resultLabel}</p>
          <div className="flex items-center gap-2">
            <Button type="button" variant="ghost" size="sm" onClick={onReset}>
              {resetLabel}
            </Button>
            <Button type="submit" variant="primary" size="sm">
              {submitLabel}
            </Button>
          </div>
        </div>
      </form>
    </search>
  );
}
