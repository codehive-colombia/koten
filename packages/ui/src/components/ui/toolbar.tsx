import { Toolbar as BaseToolbar } from "@base-ui/react/toolbar";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "../../lib/cn";

export type ToolbarProps = Omit<ComponentProps<"div">, "children"> & {
  label: string;
  children: ReactNode;
  orientation?: "horizontal" | "vertical";
};

export function Toolbar({
  label,
  children,
  orientation = "horizontal",
  className,
  ...props
}: ToolbarProps) {
  return (
    <BaseToolbar.Root
      aria-label={label}
      orientation={orientation}
      data-slot="toolbar"
      className={cn(
        "flex w-fit items-center gap-0.5 border border-rule bg-surface p-0.5",
        orientation === "vertical" && "flex-col",
        className,
      )}
      {...props}
    >
      {children}
    </BaseToolbar.Root>
  );
}

export function ToolbarGroup({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <BaseToolbar.Group aria-label={label} className={cn("flex items-center gap-0.5", className)}>
      {children}
    </BaseToolbar.Group>
  );
}

export type ToolbarButtonProps = ComponentProps<typeof BaseToolbar.Button> & {
  label: string;
};

export function ToolbarButton({ label, className, children, ...props }: ToolbarButtonProps) {
  return (
    <BaseToolbar.Button
      aria-label={label}
      className={cn(
        "inline-flex h-[var(--koten-control-h)] min-w-[var(--koten-control-h)] items-center justify-center gap-1.5 px-[var(--koten-control-px)] text-xs text-muted transition-colors hover:bg-tint data-pressed:bg-primary data-pressed:text-primary-foreground disabled:cursor-not-allowed disabled:text-faint",
        className,
      )}
      {...props}
    >
      {children}
    </BaseToolbar.Button>
  );
}

export function ToolbarSeparator({ className }: { className?: string }) {
  return <BaseToolbar.Separator className={cn("mx-1 h-4 w-px bg-rule", className)} />;
}
