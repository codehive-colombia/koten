import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import { Check, ChevronsUpDown } from "lucide-react";
import { useId } from "react";
import { cn } from "../../lib/cn";

export type ComboboxProps = {
  label: string;
  items: readonly string[];
  placeholder?: string;
  emptyLabel: string;
  triggerLabel: string;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string | null) => void;
  disabled?: boolean;
  name?: string;
  className?: string;
};

export function Combobox({
  label,
  items,
  placeholder = "Buscar…",
  emptyLabel,
  triggerLabel,
  defaultValue,
  value,
  onValueChange,
  disabled = false,
  name,
  className,
}: ComboboxProps) {
  const id = useId();

  return (
    <BaseCombobox.Root
      items={[...items]}
      defaultValue={defaultValue}
      value={value}
      onValueChange={(next) => onValueChange?.(next)}
      disabled={disabled}
      name={name}
    >
      <div className={cn("grid min-w-0 gap-[calc(var(--koten-gap)*0.5)]", className)}>
        <label htmlFor={id} className="text-xs font-semibold leading-tight text-ink">
          {label}
        </label>
        <BaseCombobox.InputGroup className="relative flex min-w-0 items-center">
          <BaseCombobox.Input
            id={id}
            data-slot="combobox-input"
            placeholder={placeholder}
            className="h-[var(--koten-control-h)] w-full min-w-0 rounded-sm border border-rule-strong bg-surface px-[var(--koten-control-px)] pr-8 text-sm text-ink transition-colors placeholder:text-faint focus-visible:border-primary disabled:cursor-not-allowed disabled:bg-tint disabled:text-muted"
          />
          <BaseCombobox.Trigger
            aria-label={triggerLabel}
            className="absolute end-0 flex h-[var(--koten-control-h)] w-8 items-center justify-center text-muted outline-hidden hover:text-ink focus-visible:text-ink disabled:cursor-not-allowed disabled:text-faint"
          >
            <ChevronsUpDown className="size-3.5" aria-hidden="true" />
          </BaseCombobox.Trigger>
        </BaseCombobox.InputGroup>

        <BaseCombobox.Portal>
          <BaseCombobox.Positioner sideOffset={4} className="z-50 outline-hidden">
            <BaseCombobox.Popup
              data-slot="combobox-popup"
              className="min-w-[var(--anchor-width)] border border-rule bg-surface text-ink shadow-overlay"
            >
              <BaseCombobox.Empty>
                <div className="px-[var(--koten-panel-p)] py-2 text-xs text-faint">
                  {emptyLabel}
                </div>
              </BaseCombobox.Empty>
              <BaseCombobox.List className="max-h-[min(18rem,var(--available-height))] overflow-y-auto overscroll-contain p-1 data-empty:p-0">
                {(item: string) => (
                  <BaseCombobox.Item
                    key={item}
                    value={item}
                    className="grid h-[var(--koten-row-h)] cursor-default grid-cols-[1rem_minmax(0,1fr)] items-center gap-2 rounded-sm px-[var(--koten-control-px)] text-xs outline-hidden select-none data-highlighted:bg-tint data-selected:font-semibold"
                  >
                    <BaseCombobox.ItemIndicator className="col-start-1">
                      <Check className="size-3.5 text-primary" aria-hidden="true" />
                    </BaseCombobox.ItemIndicator>
                    <span className="col-start-2 truncate">{item}</span>
                  </BaseCombobox.Item>
                )}
              </BaseCombobox.List>
            </BaseCombobox.Popup>
          </BaseCombobox.Positioner>
        </BaseCombobox.Portal>
      </div>
    </BaseCombobox.Root>
  );
}
