import type { KotenLocale } from "../i18n/labels";

const locales: Record<KotenLocale, string> = {
  es: "es-ES",
  ja: "ja-JP",
  en: "en-US",
};

/** Resuelve un código corto (`es`) o deja pasar un BCP 47 completo (`fr-FR`). */
export function toIntlLocale(locale: string): string {
  if (locale in locales) {
    return locales[locale as KotenLocale];
  }

  return locale;
}
