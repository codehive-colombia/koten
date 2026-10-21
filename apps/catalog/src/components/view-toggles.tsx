import { cn, type KotenLocale } from "@koten/ui";
import { type DensityId, densities, type ThemeId, themes } from "../data/tokens";

const toggleClassName =
  "inline-flex h-[var(--koten-control-h)] items-center border px-[var(--koten-control-px)] text-2xs font-semibold transition-colors";

type ToggleProps<T extends string> = {
  label: string;
  value: T;
  options: readonly { id: T; label: string }[];
  onChange: (value: T) => void;
};

function ToggleGroup<T extends string>({ label, value, options, onChange }: ToggleProps<T>) {
  return (
    <fieldset className="m-0 flex min-w-0 items-center gap-2 border-0 p-0">
      <legend className="sr-only">{label}</legend>
      <span aria-hidden="true" className="text-2xs text-faint">
        {label}
      </span>
      <div className="flex">
        {options.map((option, index) => {
          const active = option.id === value;

          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(option.id)}
              className={cn(
                toggleClassName,
                index > 0 && "-ms-px",
                active
                  ? "relative border-primary-strong bg-primary text-primary-foreground hover:bg-primary-hover"
                  : "border-rule-strong bg-surface text-muted hover:bg-tint",
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

export function ThemeToggle({
  value,
  label,
  onChange,
}: {
  value: ThemeId;
  label: string;
  onChange: (theme: ThemeId) => void;
}) {
  return (
    <ToggleGroup
      label={label}
      value={value}
      onChange={onChange}
      options={themes.map((theme) => ({ id: theme.id, label: theme.label }))}
    />
  );
}

export function DensityToggle({
  value,
  label,
  optionLabels,
  onChange,
}: {
  value: DensityId;
  label: string;
  optionLabels: Record<DensityId, string>;
  onChange: (density: DensityId) => void;
}) {
  return (
    <ToggleGroup
      label={label}
      value={value}
      onChange={onChange}
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
}: {
  value: KotenLocale;
  label: string;
  onChange: (locale: KotenLocale) => void;
}) {
  return (
    <ToggleGroup
      label={label}
      value={value}
      onChange={onChange}
      options={[
        { id: "es", label: "ES" },
        { id: "ja", label: "日本語" },
        { id: "en", label: "EN" },
      ]}
    />
  );
}
