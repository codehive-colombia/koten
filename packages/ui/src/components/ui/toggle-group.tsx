import { Toggle } from "@base-ui/react/toggle";
import { ToggleGroup as BaseToggleGroup } from "@base-ui/react/toggle-group";
import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

export type ToggleGroupItem = {
  value: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
};

export type ToggleGroupProps = {
  label: string;
  items: readonly ToggleGroupItem[];
  value?: readonly string[];
  defaultValue?: readonly string[];
  onValueChange?: (value: string[]) => void;
  multiple?: boolean;
  disabled?: boolean;
  orientation?: "horizontal" | "vertical";
  className?: string;
};

export function ToggleGroup({
  label,
  items,
  value,
  defaultValue,
  onValueChange,
  multiple = false,
  disabled = false,
  orientation = "horizontal",
  className,
}: ToggleGroupProps) {
  return (
    <BaseToggleGroup
      aria-label={label}
      value={value}
      defaultValue={defaultValue}
      onValueChange={(next) => onValueChange?.(next)}
      multiple={multiple}
      disabled={disabled}
      orientation={orientation}
      data-slot="toggle-group"
      className={cn(
        "flex w-fit border border-rule-strong bg-surface",
        orientation === "vertical" ? "flex-col" : "flex-row",
        className,
      )}
    >
      {items.map((item, index) => (
        <Toggle
          key={item.value}
          value={item.value}
          disabled={item.disabled}
          aria-label={item.label}
          className={cn(
            "inline-flex h-[var(--koten-control-h)] min-w-[var(--koten-control-h)] items-center justify-center gap-1.5 px-[var(--koten-control-px)] text-xs text-muted transition-colors hover:bg-tint data-pressed:bg-primary data-pressed:font-semibold data-pressed:text-primary-foreground disabled:cursor-not-allowed disabled:text-faint",
            orientation === "horizontal" && index > 0 && "-ms-px",
            orientation === "vertical" && index > 0 && "-mt-px",
          )}
        >
          {item.icon ?? <span>{item.label}</span>}
          {item.icon ? <span className="sr-only">{item.label}</span> : null}
        </Toggle>
      ))}
    </BaseToggleGroup>
  );
}
