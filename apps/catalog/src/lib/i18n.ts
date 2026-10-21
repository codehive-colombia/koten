import type { KotenLocale } from "@koten/ui";

/**
 * Catalog text per locale. Spanish is the source and the documentation
 * fallback; JA/EN are full translations of the body.
 */
export type Localized<T = string> = Record<KotenLocale, T>;

export function pickLocalized<T>(value: Localized<T>, locale: KotenLocale): T {
  return value[locale];
}
