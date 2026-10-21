import type { KotenLocale } from "../i18n/labels";

const locales: Record<KotenLocale, string> = {
  es: "es-ES",
  ja: "ja-JP",
  en: "en-US",
};

/** Resolves a short code (`es`) or lets a full BCP 47 tag through (`fr-FR`). */
export function toIntlLocale(locale: string): string {
  if (locale in locales) {
    return locales[locale as KotenLocale];
  }

  return locale;
}
