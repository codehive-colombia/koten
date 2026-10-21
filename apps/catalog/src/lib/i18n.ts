import type { KotenLocale } from "@koten/ui";

/**
 * Texto del catálogo por idioma. El español es la fuente y el fallback
 * documental; JA/EN son traducciones completas del cuerpo.
 */
export type Localized<T = string> = Record<KotenLocale, T>;

export function pickLocalized<T>(value: Localized<T>, locale: KotenLocale): T {
  return value[locale];
}
