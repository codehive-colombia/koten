import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../lib/cn";

export type PaginationProps = {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  previousLabel: string;
  nextLabel: string;
  navLabel: string;
  pageLabel?: (page: number) => string;
  className?: string;
};

function visiblePages(page: number, pageCount: number): (number | "gap")[] {
  if (pageCount <= 7) {
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  const pages = new Set([1, pageCount, page, page - 1, page + 1]);
  const sorted = [...pages]
    .filter((value) => value >= 1 && value <= pageCount)
    .sort((a, b) => a - b);
  const result: (number | "gap")[] = [];

  for (const value of sorted) {
    const previous = result.at(-1);

    if (typeof previous === "number" && value - previous > 1) {
      result.push("gap");
    }

    result.push(value);
  }

  return result;
}

export function Pagination({
  page,
  pageCount,
  onPageChange,
  previousLabel,
  nextLabel,
  navLabel,
  pageLabel = (value) => String(value),
  className,
}: PaginationProps) {
  const pages = visiblePages(page, pageCount);

  return (
    <nav
      aria-label={navLabel}
      data-slot="pagination"
      className={cn("flex flex-wrap items-center gap-1", className)}
    >
      <button
        type="button"
        aria-label={previousLabel}
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className="inline-flex size-[var(--koten-control-h)] items-center justify-center border border-rule-strong bg-surface text-muted transition-colors hover:bg-tint disabled:cursor-not-allowed disabled:text-faint"
      >
        <ChevronLeft className="size-3.5" aria-hidden="true" />
      </button>

      {pages.map((value, index) =>
        value === "gap" ? (
          <span
            key={`gap-${pages[index - 1] ?? "start"}`}
            aria-hidden="true"
            className="inline-flex size-[var(--koten-control-h)] items-center justify-center text-xs text-faint"
          >
            …
          </span>
        ) : (
          <button
            key={value}
            type="button"
            aria-label={pageLabel(value)}
            aria-current={value === page ? "page" : undefined}
            onClick={() => onPageChange(value)}
            className={cn(
              "inline-flex h-[var(--koten-control-h)] min-w-[var(--koten-control-h)] items-center justify-center border px-1 text-xs tabular-nums transition-colors",
              value === page
                ? "border-primary-strong bg-primary font-semibold text-primary-foreground"
                : "border-rule-strong bg-surface text-muted hover:bg-tint",
            )}
          >
            {value}
          </button>
        ),
      )}

      <button
        type="button"
        aria-label={nextLabel}
        disabled={page >= pageCount}
        onClick={() => onPageChange(page + 1)}
        className="inline-flex size-[var(--koten-control-h)] items-center justify-center border border-rule-strong bg-surface text-muted transition-colors hover:bg-tint disabled:cursor-not-allowed disabled:text-faint"
      >
        <ChevronRight className="size-3.5" aria-hidden="true" />
      </button>
    </nav>
  );
}
