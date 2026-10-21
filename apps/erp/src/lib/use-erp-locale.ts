import type { KotenLocale } from "@koten/ui";
import { useCallback, useEffect, useState } from "react";

const locales: readonly KotenLocale[] = ["es", "ja", "en"];

export const defaultErpLocale: KotenLocale = "es";

function isLocale(value: string | null): value is KotenLocale {
  return locales.some((locale) => locale === value);
}

export function readErpLocale(search = window.location.search): KotenLocale {
  const lang = new URLSearchParams(search).get("lang");

  return isLocale(lang) ? lang : defaultErpLocale;
}

export function useErpLocale() {
  const [locale, setLocaleState] = useState<KotenLocale>(() => readErpLocale());

  useEffect(() => {
    document.documentElement.lang = locale;
    const theme = new URLSearchParams(window.location.search).get("theme");
    document.documentElement.dataset.theme = theme === "sumi" ? "sumi" : "daicho";
    document.documentElement.dataset.density = "compact";

    const url = new URL(window.location.href);
    url.searchParams.set("lang", locale);
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
  }, [locale]);

  useEffect(() => {
    const onPopState = () => setLocaleState(readErpLocale());
    window.addEventListener("popstate", onPopState);

    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const setLocale = useCallback((next: KotenLocale) => {
    setLocaleState(next);
  }, []);

  return { locale, setLocale };
}
