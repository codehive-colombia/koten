import type { ComponentProps, ReactNode } from "react";
import { cn } from "../../lib/cn";

export type PanelTone = "plain" | "tinted" | "accent";

const panelTones: Record<PanelTone, string> = {
  plain: "bg-surface",
  tinted: "bg-tint",
  accent: "border-s-[3px] border-s-primary bg-surface",
};

export type PanelProps = ComponentProps<"section"> & {
  tone?: PanelTone;
};

export function Panel({ className, tone = "plain", ...props }: PanelProps) {
  return (
    <section
      data-slot="panel"
      data-tone={tone}
      className={cn("min-w-0 border border-rule text-ink", panelTones[tone], className)}
      {...props}
    />
  );
}

export function PanelHeader({ className, ...props }: ComponentProps<"header">) {
  return (
    <header
      data-slot="panel-header"
      className={cn(
        "flex flex-wrap items-center justify-between gap-2 border-b border-rule bg-tint px-[var(--koten-panel-p)] py-1.5",
        className,
      )}
      {...props}
    />
  );
}

export type PanelTitleProps = ComponentProps<"h2"> & {
  as?: "h2" | "h3" | "h4";
};

export function PanelTitle({ as: Tag = "h2", className, ...props }: PanelTitleProps) {
  return (
    <Tag
      data-slot="panel-title"
      className={cn("min-w-0 truncate text-xs font-semibold", className)}
      {...props}
    />
  );
}

export function PanelActions({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="panel-actions"
      className={cn("flex shrink-0 items-center gap-1.5", className)}
      {...props}
    />
  );
}

export type PanelBodyProps = ComponentProps<"div"> & {
  flush?: boolean;
};

export function PanelBody({ className, flush = false, ...props }: PanelBodyProps) {
  return (
    <div
      data-slot="panel-body"
      data-flush={flush ? "" : undefined}
      className={cn("min-w-0", flush ? "p-0" : "p-[var(--koten-panel-p)]", className)}
      {...props}
    />
  );
}

export function PanelFooter({
  className,
  children,
  ...props
}: ComponentProps<"footer"> & { children?: ReactNode }) {
  return (
    <footer
      data-slot="panel-footer"
      className={cn(
        "flex flex-wrap items-center justify-end gap-2 border-t border-rule bg-surface px-[var(--koten-panel-p)] py-2",
        className,
      )}
      {...props}
    >
      {children}
    </footer>
  );
}
