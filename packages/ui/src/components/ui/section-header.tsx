import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

const rules = {
  hairline: "border-b border-rule",
  strong: "border-b border-rule-strong",
  double: "border-b-[3px] border-double border-rule-strong",
  none: "border-b-0",
} as const;

export type SectionHeaderProps = {
  title: ReactNode;
  jp?: ReactNode;
  meta?: ReactNode;
  actions?: ReactNode;
  rule?: keyof typeof rules;
  as?: "h2" | "h3" | "h4";
  className?: string;
};

export function SectionHeader({
  title,
  jp,
  meta,
  actions,
  rule = "strong",
  as: Heading = "h2",
  className,
}: SectionHeaderProps) {
  return (
    <header
      data-slot="section-header"
      className={cn(
        "flex flex-wrap items-end justify-between gap-x-4 gap-y-1 pb-1",
        rules[rule],
        className,
      )}
    >
      <div className="min-w-0">
        <Heading className="flex items-baseline gap-2 text-lg font-semibold">
          <span aria-hidden="true" className="mb-0.5 inline-block h-4 w-1 shrink-0 bg-primary" />
          {title}
          {jp ? <span className="text-xs font-normal text-faint">{jp}</span> : null}
        </Heading>
        {meta ? <p className="mt-0.5 text-2xs text-faint">{meta}</p> : null}
      </div>
      {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
    </header>
  );
}
