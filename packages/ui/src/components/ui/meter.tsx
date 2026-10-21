import { Meter as BaseMeter } from "@base-ui/react/meter";
import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

export type MeterTone = "success" | "warning" | "danger" | "neutral";

const indicatorTones: Record<MeterTone, string> = {
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
  neutral: "bg-primary",
};

export type MeterProps = {
  label: ReactNode;
  value: number;
  max?: number;
  tone?: MeterTone;
  showValue?: boolean;
  className?: string;
};

export function Meter({
  label,
  value,
  max = 100,
  tone = "success",
  showValue = true,
  className,
}: MeterProps) {
  return (
    <BaseMeter.Root
      value={value}
      max={max}
      data-slot="meter"
      className={cn("grid w-full grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-1", className)}
    >
      <BaseMeter.Label className="text-xs font-semibold text-ink">{label}</BaseMeter.Label>
      {showValue ? <BaseMeter.Value className="text-end text-2xs tabular-nums text-muted" /> : null}
      <BaseMeter.Track className="col-span-2 h-2 overflow-hidden rounded-sm border border-rule bg-tint">
        <BaseMeter.Indicator
          className={cn("h-full transition-[width] duration-200", indicatorTones[tone])}
        />
      </BaseMeter.Track>
    </BaseMeter.Root>
  );
}
