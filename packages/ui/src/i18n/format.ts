import { toIntlLocale } from "./intl";

export type FormatOptions = {
  /** Short BCP 47 code (`es`, `ja`, `en`) or a full one (`fr-FR`). */
  locale?: string;
};

export function formatNumber(
  value: number,
  options: Intl.NumberFormatOptions & FormatOptions = {},
): string {
  const { locale = "es", ...intlOptions } = options;

  return new Intl.NumberFormat(toIntlLocale(locale), intlOptions).format(value);
}

export function formatCurrency(
  value: number,
  options: Intl.NumberFormatOptions & FormatOptions = {},
): string {
  const { locale = "ja", currency = "JPY", ...intlOptions } = options;

  return new Intl.NumberFormat(toIntlLocale(locale), {
    style: "currency",
    currency,
    currencyDisplay: "narrowSymbol",
    useGrouping: true,
    ...intlOptions,
  }).format(value);
}

export function formatDate(
  value: Date | string | number,
  options: Intl.DateTimeFormatOptions & FormatOptions = {},
): string {
  const { locale = "es", ...formatOptions } = options;
  const hasExplicitParts = [
    "dateStyle",
    "timeStyle",
    "year",
    "month",
    "day",
    "weekday",
    "era",
    "hour",
    "minute",
    "second",
    "timeZoneName",
  ].some((part) => part in formatOptions);

  const intlOptions: Intl.DateTimeFormatOptions = hasExplicitParts
    ? formatOptions
    : { dateStyle: "medium", ...formatOptions };

  return new Intl.DateTimeFormat(toIntlLocale(locale), intlOptions).format(toDate(value));
}

function toDate(value: Date | string | number): Date {
  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    throw new TypeError("formatDate received an invalid date");
  }

  return date;
}
