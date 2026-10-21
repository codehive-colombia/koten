import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import { Check, Minus } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "../../lib/cn";

export type CheckboxProps = Omit<
  ComponentProps<typeof BaseCheckbox.Root>,
  "className" | "children"
> & {
  label: ReactNode;
  description?: ReactNode;
  className?: string;
};

export function Checkbox({ label, description, className, ...props }: CheckboxProps) {
  return (
    <div className={cn("min-w-0", className)}>
      {/* biome-ignore lint/a11y/noLabelWithoutControl: Base UI Checkbox renders its own hidden input. */}
      <label className="flex items-start gap-2 text-xs">
        <BaseCheckbox.Root
          data-slot="checkbox"
          className="group mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-sm border border-rule-strong bg-surface p-0 text-primary-foreground transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:bg-tint data-checked:border-primary-strong data-checked:bg-primary data-indeterminate:border-primary-strong data-indeterminate:bg-primary"
          {...props}
        >
          <BaseCheckbox.Indicator className="flex items-center justify-center data-unchecked:hidden">
            <Minus className="hidden size-3 group-data-[indeterminate]:block" aria-hidden="true" />
            <Check className="size-3 group-data-[indeterminate]:hidden" aria-hidden="true" />
          </BaseCheckbox.Indicator>
        </BaseCheckbox.Root>
        <span className="block font-medium text-ink">{label}</span>
      </label>
      {description ? (
        <p className="ms-6 mt-0.5 text-2xs leading-relaxed text-faint">{description}</p>
      ) : null}
    </div>
  );
}
