import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

export type StatDelta = {
  value: ReactNode;
  tone?: "success" | "danger" | "neutral";
};

export type StatCardProps = {
  label: ReactNode;
  value: ReactNode;
  delta?: StatDelta;
  meta?: ReactNode;
  sparkline?: ReactNode;
  className?: string;
};

const deltaTones: Record<NonNullable<StatDelta["tone"]>, string> = {
  success: "text-success",
  danger: "text-danger",
  neutral: "text-muted",
};

export function StatCard({ label, value, delta, meta, sparkline, className }: StatCardProps) {
  return (
    <div
      data-slot="stat-card"
      className={cn("border border-rule bg-surface p-[var(--koten-panel-p)]", className)}
    >
      <p className="text-2xs font-semibold uppercase tracking-[0.12em] text-faint">{label}</p>
      <div className="mt-1 flex flex-wrap items-end justify-between gap-2">
        <p className="text-2xl font-semibold leading-none tabular-nums text-ink">{value}</p>
        {delta ? (
          <span
            className={cn(
              "text-2xs font-semibold tabular-nums",
              deltaTones[delta.tone ?? "neutral"],
            )}
          >
            {delta.value}
          </span>
        ) : null}
      </div>
      {meta ? <p className="mt-1 text-2xs text-muted">{meta}</p> : null}
      {sparkline ? <div className="mt-2 text-primary">{sparkline}</div> : null}
    </div>
  );
}
