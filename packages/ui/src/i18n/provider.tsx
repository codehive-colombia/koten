import { createContext, type ReactNode, useContext, useMemo } from "react";
import { formatCurrency, formatDate, formatNumber } from "../lib/format";
import { type KotenLabels, type KotenLocale, labelsByLocale } from "./labels";

export type KotenConfig = {
  locale: KotenLocale;
  labels: KotenLabels;
  timeZone?: string;
  currency?: string;
};

const fallback: KotenConfig = {
  locale: "es",
  labels: labelsByLocale.es,
};

const KotenContext = createContext<KotenConfig>(fallback);

export type KotenProviderProps = {
  locale?: KotenLocale;
  labels?: Partial<KotenLabels>;
  timeZone?: string;
  currency?: string;
  children: ReactNode;
};

export function KotenProvider({
  locale = "es",
  labels,
  timeZone,
  currency,
  children,
}: KotenProviderProps) {
  const value = useMemo<KotenConfig>(
    () => ({
      locale,
      labels: labels ? { ...labelsByLocale[locale], ...labels } : labelsByLocale[locale],
      timeZone,
      currency,
    }),
    [locale, labels, timeZone, currency],
  );

  return <KotenContext.Provider value={value}>{children}</KotenContext.Provider>;
}

export function useKoten(): KotenConfig {
  return useContext(KotenContext);
}

export type KotenFormatters = {
  formatNumber: (value: number, options?: Intl.NumberFormatOptions) => string;
  formatCurrency: (value: number, options?: Intl.NumberFormatOptions) => string;
  formatDate: (value: Date | string | number, options?: Intl.DateTimeFormatOptions) => string;
};

export function useKotenFormatters(): KotenFormatters {
  const { locale, timeZone, currency } = useKoten();

  return useMemo(
    () => ({
      formatNumber: (value, options) => formatNumber(value, { locale, ...options }),
      formatCurrency: (value, options) => formatCurrency(value, { locale, currency, ...options }),
      formatDate: (value, options) => formatDate(value, { locale, timeZone, ...options }),
    }),
    [locale, timeZone, currency],
  );
}
