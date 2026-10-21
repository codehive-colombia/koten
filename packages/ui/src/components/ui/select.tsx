import { Select as BaseSelect } from "@base-ui/react/select";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "../../lib/cn";

export type SelectItem = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type SelectProps = {
  label: string;
  items: readonly SelectItem[];
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string | null) => void;
  disabled?: boolean;
  name?: string;
  className?: string;
};

export function Select({
  label,
  items,
  placeholder = "Seleccionar…",
  defaultValue,
  value,
  onValueChange,
  disabled = false,
  name,
  className,
}: SelectProps) {
  return (
    <BaseSelect.Root
      items={items}
      defaultValue={defaultValue}
      value={value}
      onValueChange={(next) => onValueChange?.(next)}
      disabled={disabled}
      name={name}
    >
      <div className={cn("grid min-w-0 gap-[calc(var(--koten-gap)*0.5)]", className)}>
        <BaseSelect.Label className="text-xs font-semibold leading-tight text-ink">
          {label}
        </BaseSelect.Label>
        <BaseSelect.Trigger
          data-slot="select-trigger"
          className="flex h-[var(--koten-control-h)] w-full min-w-0 items-center justify-between gap-2 rounded-sm border border-rule-strong bg-surface px-[var(--koten-control-px)] text-left text-sm text-ink transition-colors select-none focus-visible:border-primary data-disabled:cursor-not-allowed data-disabled:bg-tint data-disabled:text-muted data-popup-open:border-primary"
        >
          <BaseSelect.Value
            data-slot="select-value"
            placeholder={placeholder}
            className="min-w-0 truncate data-placeholder:text-faint"
          />
          <BaseSelect.Icon className="shrink-0 text-muted">
            <ChevronsUpDown className="size-3.5" aria-hidden="true" />
          </BaseSelect.Icon>
        </BaseSelect.Trigger>

        <BaseSelect.Portal>
          <BaseSelect.Positioner sideOffset={4} className="z-50 outline-hidden">
            <BaseSelect.Popup
              data-slot="select-popup"
              className="max-h-[min(18rem,var(--available-height))] min-w-[var(--anchor-width)] overflow-hidden border border-rule bg-surface text-ink shadow-overlay"
            >
              <BaseSelect.List className="max-h-[min(18rem,var(--available-height))] overflow-y-auto overscroll-contain p-1">
                {items.map((item) => (
                  <BaseSelect.Item
                    key={item.value}
                    value={item.value}
                    disabled={item.disabled}
                    className="grid h-[var(--koten-row-h)] cursor-default grid-cols-[1rem_minmax(0,1fr)] items-center gap-2 rounded-sm px-[var(--koten-control-px)] text-xs outline-hidden select-none data-disabled:cursor-not-allowed data-disabled:text-faint data-highlighted:bg-tint data-selected:font-semibold"
                  >
                    <BaseSelect.ItemIndicator className="col-start-1">
                      <Check className="size-3.5 text-primary" aria-hidden="true" />
                    </BaseSelect.ItemIndicator>
                    <BaseSelect.ItemText className="col-start-2 truncate">
                      {item.label}
                    </BaseSelect.ItemText>
                  </BaseSelect.Item>
                ))}
              </BaseSelect.List>
            </BaseSelect.Popup>
          </BaseSelect.Positioner>
        </BaseSelect.Portal>
      </div>
    </BaseSelect.Root>
  );
}
