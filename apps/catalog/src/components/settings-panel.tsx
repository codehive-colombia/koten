import { Button, type KotenLocale, Popover, useKoten } from "@koten/ui";
import { SlidersHorizontal } from "lucide-react";
import { densityLabels, shellLabels } from "../data/catalog";
import type { DensityId, ThemeId } from "../data/tokens";
import { DensityToggle, LocaleToggle, ThemeToggle } from "./view-toggles";

export function SettingsPanel({
  locale,
  theme,
  density,
  onThemeChange,
  onDensityChange,
  onLocaleChange,
}: {
  locale: KotenLocale;
  theme: ThemeId;
  density: DensityId;
  onThemeChange: (theme: ThemeId) => void;
  onDensityChange: (density: DensityId) => void;
  onLocaleChange: (locale: KotenLocale) => void;
}) {
  const { labels: kotenLabels } = useKoten();
  const labels = shellLabels[locale];
  const densityOptions = {
    compact: densityLabels.compact[locale],
    default: densityLabels.default[locale],
    comfortable: densityLabels.comfortable[locale],
  };

  return (
    <Popover
      trigger={
        <Button variant="secondary" size="sm" aria-label={labels.settings}>
          <SlidersHorizontal className="size-3.5" aria-hidden="true" />
          <span className="hidden sm:inline">{labels.settings}</span>
        </Button>
      }
      title={labels.settings}
      description={labels.settingsDescription}
      closeLabel={kotenLabels.close}
      className="max-h-[calc(100dvh-4rem)] w-[min(22rem,calc(100vw-2rem))] overflow-y-auto [&>header]:sticky [&>header]:top-0 [&>header]:z-10"
    >
      <div className="space-y-4">
        <ThemeToggle
          value={theme}
          label={labels.theme}
          onChange={onThemeChange}
          layout="stacked"
          columns={2}
        />
        <DensityToggle
          value={density}
          label={labels.density}
          optionLabels={densityOptions}
          onChange={onDensityChange}
          layout="stacked"
          columns={3}
        />
        <LocaleToggle
          value={locale}
          label={labels.language}
          onChange={onLocaleChange}
          layout="stacked"
          columns={3}
        />
        <p className="border-t border-rule pt-2 text-2xs leading-relaxed text-faint">
          {labels.settingsHint}
        </p>
      </div>
    </Popover>
  );
}
