import { cn, type KotenLocale } from "@koten/ui";
import { type DensityId, densities, type ThemeId, themes } from "../data/tokens";
import type { PackageManager } from "../lib/package-manager";

const toggleBaseClassName =
  "inline-flex h-[var(--koten-control-h)] items-center justify-center text-2xs font-semibold transition-colors";
const inlineToggleClassName = "border px-[var(--koten-control-px)]";
const stackedToggleClassName = "min-w-0 px-1.5 text-center";

const stackedColumns = {
  2: "grid-cols-2",
  3: "grid-cols-3",
} as const;

type ToggleProps<T extends string> = {
  label: string;
  value: T;
  options: readonly { id: T; label: string }[];
  onChange: (value: T) => void;
  layout?: "inline" | "stacked";
  columns?: 2 | 3;
};

function ToggleGroup<T extends string>({
  label,
  value,
  options,
  onChange,
  layout = "inline",
  columns = 2,
}: ToggleProps<T>) {
  const stacked = layout === "stacked";

  return (
    <fieldset
      className={cn("m-0 min-w-0 border-0 p-0", stacked ? "block" : "flex items-center gap-2")}
    >
      <legend
        className={cn(
          stacked
            ? "mb-1.5 text-2xs font-semibold uppercase tracking-[0.12em] text-faint"
            : "sr-only",
        )}
      >
        {label}
      </legend>
      {stacked ? null : (
        <span aria-hidden="true" className="text-2xs text-faint">
          {label}
        </span>
      )}
      <div
        className={cn(
          stacked ? cn("grid gap-px border border-rule bg-rule", stackedColumns[columns]) : "flex",
        )}
      >
        {options.map((option, index) => {
          const active = option.id === value;

          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(option.id)}
              className={cn(
                toggleBaseClassName,
                stacked
                  ? cn(
                      stackedToggleClassName,
                      active
                        ? "bg-primary text-primary-foreground hover:bg-primary-hover"
                        : "bg-surface text-muted hover:bg-tint hover:text-ink",
                    )
                  : cn(
                      inlineToggleClassName,
                      index > 0 && "-ms-px",
                      active
                        ? "relative border-primary-strong bg-primary text-primary-foreground hover:bg-primary-hover"
                        : "border-rule-strong bg-surface text-muted hover:bg-tint",
                    ),
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

type ToggleControlProps<T extends string> = {
  value: T;
  label: string;
  onChange: (value: T) => void;
  layout?: "inline" | "stacked";
  columns?: 2 | 3;
};

export function ThemeToggle({
  value,
  label,
  onChange,
  layout,
  columns,
}: ToggleControlProps<ThemeId>) {
  return (
    <ToggleGroup
      label={label}
      value={value}
      onChange={onChange}
      layout={layout}
      columns={columns}
      options={themes.map((theme) => ({ id: theme.id, label: theme.label }))}
    />
  );
}

export function DensityToggle({
  value,
  label,
  optionLabels,
  onChange,
  layout,
  columns,
}: ToggleControlProps<DensityId> & {
  optionLabels: Record<DensityId, string>;
}) {
  return (
    <ToggleGroup
      label={label}
      value={value}
      onChange={onChange}
      layout={layout}
      columns={columns}
      options={densities.map((density) => ({
        id: density.id,
        label: optionLabels[density.id],
      }))}
    />
  );
}

export function LocaleToggle({
  value,
  label,
  onChange,
  layout,
  columns,
}: ToggleControlProps<KotenLocale>) {
  return (
    <ToggleGroup
      label={label}
      value={value}
      onChange={onChange}
      layout={layout}
      columns={columns}
      options={[
        { id: "es", label: "ES" },
        { id: "ja", label: "日本語" },
        { id: "en", label: "EN" },
      ]}
    />
  );
}

export function PackageManagerTabs({
  value,
  label,
  onChange,
}: {
  value: PackageManager;
  label: string;
  onChange: (value: PackageManager) => void;
}) {
  return (
    <ToggleGroup
      label={label}
      value={value}
      onChange={onChange}
      options={[
        { id: "npm", label: "npx" },
        { id: "bun", label: "bunx" },
      ]}
    />
  );
}
