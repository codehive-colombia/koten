import type { ComponentProps, ReactNode } from "react";
import { cn } from "../../lib/cn";

const lineVariants = {
  hairline: "border-t border-rule",
  strong: "border-t border-rule-strong",
  double: "border-t-[3px] border-double border-rule-strong",
  dashed: "border-t border-dashed border-rule",
} as const;

export type RuleProps = Omit<ComponentProps<"hr">, "children"> & {
  variant?: keyof typeof lineVariants;
  label?: ReactNode;
};

export function Rule({ variant = "hairline", label, className, ...props }: RuleProps) {
  if (label) {
    return (
      <div
        data-slot="rule"
        className={cn("flex items-center gap-2 text-2xs text-faint", className)}
        {...props}
      >
        <span aria-hidden="true" className={cn("flex-1", lineVariants[variant])} />
        <span className="shrink-0">{label}</span>
        <span aria-hidden="true" className={cn("flex-1", lineVariants[variant])} />
      </div>
    );
  }

  return (
    <hr data-slot="rule" className={cn("w-full", lineVariants[variant], className)} {...props} />
  );
}
