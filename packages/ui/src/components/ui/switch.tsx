import { Switch as BaseSwitch } from "@base-ui/react/switch";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "../../lib/cn";

export type SwitchProps = Omit<ComponentProps<typeof BaseSwitch.Root>, "className" | "children"> & {
  label: ReactNode;
  description?: ReactNode;
  className?: string;
};

export function Switch({ label, description, className, ...props }: SwitchProps) {
  return (
    <div className={cn("min-w-0", className)}>
      {/* biome-ignore lint/a11y/noLabelWithoutControl: Base UI Switch renders its own hidden input. */}
      <label className="flex min-w-0 items-center justify-between gap-3 text-xs">
        <span className="block font-medium text-ink">{label}</span>
        <BaseSwitch.Root
          data-slot="switch"
          className="relative flex h-5 w-9 shrink-0 items-center rounded-full border border-rule-strong bg-surface p-0.5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:bg-tint data-checked:border-primary-strong data-checked:bg-primary"
          {...props}
        >
          <BaseSwitch.Thumb className="block size-3.5 rounded-full bg-rule-strong transition-transform data-checked:translate-x-4 data-checked:bg-primary-foreground" />
        </BaseSwitch.Root>
      </label>
      {description ? (
        <p className="mt-0.5 text-2xs leading-relaxed text-faint">{description}</p>
      ) : null}
    </div>
  );
}
