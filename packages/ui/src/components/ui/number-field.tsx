import { NumberField as BaseNumberField } from "@base-ui/react/number-field";
import { Minus, Plus } from "lucide-react";
import { useId } from "react";
import { cn } from "../../lib/cn";

export type NumberFieldProps = {
  label: string;
  defaultValue?: number;
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  onValueChange?: (value: number | null) => void;
  disabled?: boolean;
  name?: string;
  decrementLabel: string;
  incrementLabel: string;
  className?: string;
};

export function NumberField({
  label,
  defaultValue,
  value,
  min,
  max,
  step,
  onValueChange,
  disabled = false,
  name,
  decrementLabel,
  incrementLabel,
  className,
}: NumberFieldProps) {
  const id = useId();

  return (
    <BaseNumberField.Root
      id={id}
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      step={step}
      onValueChange={(next) => onValueChange?.(next)}
      disabled={disabled}
      name={name}
    >
      <div className={cn("grid min-w-0 gap-[calc(var(--koten-gap)*0.5)]", className)}>
        <label htmlFor={id} className="text-xs font-semibold leading-tight text-ink">
          {label}
        </label>
        <BaseNumberField.Group className="flex h-[var(--koten-control-h)] w-fit border border-rule-strong bg-surface">
          <BaseNumberField.Decrement
            aria-label={decrementLabel}
            className="flex w-8 items-center justify-center border-e border-rule-strong text-muted transition-colors hover:bg-tint disabled:cursor-not-allowed disabled:text-faint"
          >
            <Minus className="size-3.5" aria-hidden="true" />
          </BaseNumberField.Decrement>
          <BaseNumberField.Input
            data-slot="number-field-input"
            className="w-16 border-0 bg-transparent px-2 text-center text-sm tabular-nums text-ink outline-hidden focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-focus disabled:cursor-not-allowed disabled:bg-tint disabled:text-muted"
          />
          <BaseNumberField.Increment
            aria-label={incrementLabel}
            className="flex w-8 items-center justify-center border-s border-rule-strong text-muted transition-colors hover:bg-tint disabled:cursor-not-allowed disabled:text-faint"
          >
            <Plus className="size-3.5" aria-hidden="true" />
          </BaseNumberField.Increment>
        </BaseNumberField.Group>
      </div>
    </BaseNumberField.Root>
  );
}
