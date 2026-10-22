const locales: Record<string, string> = {
  es: "es-ES",
  ja: "ja-JP",
  en: "en-US",
};

/** Resolves a short code (`es`) or lets a full BCP 47 tag through (`fr-FR`). */
export function toIntlLocale(locale: string): string {
  return locales[locale] ?? locale;
}
