import type { KotenLocale } from "@koten/ui";
import { useCallback, useEffect, useState } from "react";

const locales: readonly KotenLocale[] = ["ja", "es", "en"];

export const defaultStorefrontLocale: KotenLocale = "ja";

function isLocale(value: string | null): value is KotenLocale {
  return locales.some((locale) => locale === value);
}

export function readStorefrontLocale(search = window.location.search): KotenLocale {
  const lang = new URLSearchParams(search).get("lang");

  return isLocale(lang) ? lang : defaultStorefrontLocale;
}

export function useStorefrontLocale() {
  const [locale, setLocaleState] = useState<KotenLocale>(() => readStorefrontLocale());

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dataset.theme = "chirashi";
    document.documentElement.dataset.density = "default";

    const url = new URL(window.location.href);
    url.searchParams.set("lang", locale);
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
  }, [locale]);

  useEffect(() => {
    const onPopState = () => setLocaleState(readStorefrontLocale());
    window.addEventListener("popstate", onPopState);

    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const setLocale = useCallback((next: KotenLocale) => {
    setLocaleState(next);
  }, []);

  return { locale, setLocale };
}
