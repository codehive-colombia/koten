import { Radio } from "@base-ui/react/radio";
import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group";
import { type ReactNode, useId } from "react";
import { cn } from "../../lib/cn";

export type RadioOption = {
  value: string;
  label: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
};

export type RadioGroupProps = {
  label: string;
  options: readonly RadioOption[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  name?: string;
  orientation?: "vertical" | "horizontal";
  className?: string;
};

export function RadioGroup({
  label,
  options,
  defaultValue,
  value,
  onValueChange,
  disabled = false,
  name,
  orientation = "vertical",
  className,
}: RadioGroupProps) {
  const labelId = useId();

  return (
    <div className={cn("grid min-w-0 gap-[calc(var(--koten-gap)*0.5)]", className)}>
      <p id={labelId} className="text-xs font-semibold leading-tight text-ink">
        {label}
      </p>
      <BaseRadioGroup
        aria-labelledby={labelId}
        defaultValue={defaultValue}
        value={value}
        onValueChange={(next) => onValueChange?.(String(next))}
        disabled={disabled}
        name={name}
        data-slot="radio-group"
        className={cn(
          "flex min-w-0 gap-x-[var(--koten-gap)] gap-y-1",
          orientation === "vertical" ? "flex-col" : "flex-wrap",
        )}
      >
        {options.map((option) => (
          <div key={option.value} className="min-w-0">
            {/* biome-ignore lint/a11y/noLabelWithoutControl: Base UI Radio renders its own hidden input. */}
            <label className="flex min-w-0 items-start gap-2 text-xs">
              <Radio.Root
                value={option.value}
                disabled={option.disabled}
                className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border border-rule-strong bg-surface p-0 text-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:bg-tint data-checked:border-primary-strong"
              >
                <Radio.Indicator className="flex items-center justify-center data-unchecked:hidden before:block before:size-2 before:rounded-full before:bg-primary" />
              </Radio.Root>
              <span className="block font-medium text-ink">{option.label}</span>
            </label>
            {option.description ? (
              <p className="ms-6 mt-0.5 text-2xs leading-relaxed text-faint">
                {option.description}
              </p>
            ) : null}
          </div>
        ))}
      </BaseRadioGroup>
    </div>
  );
}
