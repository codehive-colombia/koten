import { createContext, type ReactNode, useContext, useMemo } from "react";
import { formatCurrency, formatDate, formatNumber } from "./format";
import {
  type KotenLabels,
  type KotenLocale,
  type KotenLocaleCode,
  labelsByLocale,
  resolveLabels,
} from "./labels";

export type KotenConfig<L extends string = KotenLocale> = {
  locale: L;
  labels: KotenLabels;
  timeZone?: string;
  currency?: string;
};

const fallback: KotenConfig<string> = {
  locale: "en",
  labels: labelsByLocale.en,
};

const KotenContext = createContext<KotenConfig<string>>(fallback);

export type KotenProviderProps = {
  /** Any BCP 47 tag. The installed dictionaries keep autocomplete. */
  locale?: KotenLocaleCode;
  /** Partial overrides merged over the English base and the locale dictionary. */
  labels?: Partial<KotenLabels>;
  timeZone?: string;
  currency?: string;
  children: ReactNode;
};

export function KotenProvider({
  locale = "en",
  labels,
  timeZone,
  currency,
  children,
}: KotenProviderProps) {
  const value = useMemo<KotenConfig<string>>(
    () => ({
      locale,
      labels: resolveLabels(locale, labels),
      timeZone,
      currency,
    }),
    [locale, labels, timeZone, currency],
  );

  return <KotenContext.Provider value={value}>{children}</KotenContext.Provider>;
}

/**
 * Reads the kit config. The generic defaults to the installed dictionaries so
 * app copy dictionaries stay exhaustive; pass your own union or `string` when
 * you use a locale that has no installed dictionary.
 */
export function useKoten<L extends string = KotenLocale>(): KotenConfig<L> {
  return useContext(KotenContext) as KotenConfig<L>;
}

export type KotenFormatters = {
  formatNumber: (value: number, options?: Intl.NumberFormatOptions) => string;
  formatCurrency: (value: number, options?: Intl.NumberFormatOptions) => string;
  formatDate: (value: Date | string | number, options?: Intl.DateTimeFormatOptions) => string;
};

export function useKotenFormatters(): KotenFormatters {
  const { locale, timeZone, currency } = useKoten<string>();

  return useMemo(
    () => ({
      formatNumber: (value, options) => formatNumber(value, { locale, ...options }),
      formatCurrency: (value, options) => formatCurrency(value, { locale, currency, ...options }),
      formatDate: (value, options) => formatDate(value, { locale, timeZone, ...options }),
    }),
    [locale, timeZone, currency],
  );
}
