import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

export type TimelineTone = "neutral" | "info" | "success" | "warning" | "danger";

export type TimelineEvent = {
  id: string;
  time: ReactNode;
  dateTime?: string;
  title: ReactNode;
  description?: ReactNode;
  tone?: TimelineTone;
};

export type TimelineProps = {
  events: readonly TimelineEvent[];
  label: string;
  emptyLabel: string;
  className?: string;
};

const dotTones: Record<TimelineTone, string> = {
  neutral: "border-rule-strong bg-surface",
  info: "border-info bg-info",
  success: "border-success bg-success",
  warning: "border-warning bg-warning",
  danger: "border-danger bg-danger",
};

export function Timeline({ events, label, emptyLabel, className }: TimelineProps) {
  if (events.length === 0) {
    return <p className="text-xs text-muted">{emptyLabel}</p>;
  }

  return (
    <ol aria-label={label} data-slot="timeline" className={cn("min-w-0", className)}>
      {events.map((event, index) => (
        <li key={event.id} className="relative flex gap-3 pb-3 last:pb-0">
          {index < events.length - 1 ? (
            <span aria-hidden="true" className="absolute start-[5px] top-3 bottom-0 w-px bg-rule" />
          ) : null}
          <span
            aria-hidden="true"
            className={cn(
              "relative mt-1 size-2.5 shrink-0 rounded-full border",
              dotTones[event.tone ?? "neutral"],
            )}
          />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline justify-between gap-x-2">
              <p className="text-xs font-semibold text-ink">{event.title}</p>
              <time dateTime={event.dateTime} className="text-2xs tabular-nums text-faint">
                {event.time}
              </time>
            </div>
            {event.description ? (
              <p className="mt-0.5 text-2xs leading-relaxed text-muted">{event.description}</p>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
