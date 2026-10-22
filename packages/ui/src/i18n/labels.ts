import { labelsByLocale } from "./dictionaries";

export type KotenLabels = {
  close: string;
  previous: string;
  next: string;
  empty: string;
  loading: string;
  select: string;
  remove: string;
  search: string;
  clear: string;
  apply: string;
  cancel: string;
  confirm: string;
  more: string;
  expand: string;
  collapse: string;
  sortAscending: string;
  sortDescending: string;
  selectAll: string;
  selected: string;
  noResults: string;
  required: string;
  optional: string;
};

/** Locales with an installed dictionary. */
export type KotenBuiltInLocale = keyof typeof labelsByLocale;

/**
 * Locale used by apps and dictionaries: the installed built-ins.
 * In the registry core this is only `"en"`; installing more packs widens it.
 */
export type KotenLocale = KotenBuiltInLocale;

/** Any BCP 47 tag; the installed locales keep autocomplete. */
export type KotenLocaleCode = KotenLocale | (string & {});

/** Locale used when no dictionary matches. The core always installs English. */
export const fallbackLocale: KotenLocale = "en";

export { labelsByLocale };

/**
 * Resolves the labels for a locale: the installed dictionary for that locale,
 * or the English base when there is none, then the provider overrides.
 */
export function resolveLabels(
  locale: KotenLocaleCode,
  overrides?: Partial<KotenLabels>,
): KotenLabels {
  const base = labelsByLocale[locale as KotenLocale] ?? {};
  const labels = { ...labelsByLocale[fallbackLocale], ...base };

  return overrides ? { ...labels, ...overrides } : labels;
}
