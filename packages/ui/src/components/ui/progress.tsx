import { Progress as BaseProgress } from "@base-ui/react/progress";
import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

export type ProgressTone = "primary" | "success" | "warning" | "danger";

const indicatorTones: Record<ProgressTone, string> = {
  primary: "bg-primary",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
};

export type ProgressProps = {
  label: ReactNode;
  value: number | null;
  max?: number;
  tone?: ProgressTone;
  showValue?: boolean;
  className?: string;
};

export function Progress({
  label,
  value,
  max = 100,
  tone = "primary",
  showValue = true,
  className,
}: ProgressProps) {
  return (
    <BaseProgress.Root
      value={value}
      max={max}
      data-slot="progress"
      className={cn("grid w-full grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-1", className)}
    >
      <BaseProgress.Label className="text-xs font-semibold text-ink">{label}</BaseProgress.Label>
      {showValue ? (
        <BaseProgress.Value className="text-right text-2xs tabular-nums text-muted" />
      ) : null}
      <BaseProgress.Track className="col-span-2 h-2 overflow-hidden rounded-sm border border-rule bg-tint">
        <BaseProgress.Indicator
          className={cn("h-full transition-[width] duration-200", indicatorTones[tone])}
        />
      </BaseProgress.Track>
    </BaseProgress.Root>
  );
}
