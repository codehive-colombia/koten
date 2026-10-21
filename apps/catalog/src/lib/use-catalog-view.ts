import type { KotenLocale } from "@koten/ui";
import { useCallback, useEffect, useState } from "react";
import type { DensityId, ThemeId } from "../data/tokens";

export type CatalogView = {
  theme: ThemeId;
  density: DensityId;
  locale: KotenLocale;
};

const defaultView: CatalogView = {
  theme: "kanso",
  density: "default",
  locale: "es",
};

const densityIds: readonly DensityId[] = ["compact", "default", "comfortable"];
const themeIds: readonly ThemeId[] = ["chirashi", "daicho", "kanso", "sumi"];
const localeIds: readonly KotenLocale[] = ["es", "ja", "en"];

function isTheme(value: string | null): value is ThemeId {
  return themeIds.some((theme) => theme === value);
}

function isDensity(value: string | null): value is DensityId {
  return densityIds.some((density) => density === value);
}

function isLocale(value: string | null): value is KotenLocale {
  return localeIds.some((locale) => locale === value);
}

export function readViewFromUrl(search = window.location.search): CatalogView {
  const params = new URLSearchParams(search);
  const theme = params.get("theme");
  const density = params.get("density");
  const lang = params.get("lang");

  return {
    theme: isTheme(theme) ? theme : defaultView.theme,
    density: isDensity(density) ? density : defaultView.density,
    locale: isLocale(lang) ? lang : defaultView.locale,
  };
}

export function syncViewToUrl(view: CatalogView) {
  document.documentElement.dataset.theme = view.theme;
  document.documentElement.dataset.density = view.density;
  document.documentElement.lang = view.locale;

  const url = new URL(window.location.href);
  url.searchParams.set("theme", view.theme);
  url.searchParams.set("density", view.density);
  url.searchParams.set("lang", view.locale);
  window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
}

export function useCatalogView() {
  const [view, setView] = useState<CatalogView>(() => readViewFromUrl());

  useEffect(() => {
    syncViewToUrl(view);
  }, [view]);

  useEffect(() => {
    const onPopState = () => setView(readViewFromUrl());

    window.addEventListener("popstate", onPopState);

    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const setTheme = useCallback((theme: ThemeId) => {
    setView((current) => ({ ...current, theme }));
  }, []);

  const setDensity = useCallback((density: DensityId) => {
    setView((current) => ({ ...current, density }));
  }, []);

  const setLocale = useCallback((locale: KotenLocale) => {
    setView((current) => ({ ...current, locale }));
  }, []);

  return {
    theme: view.theme,
    density: view.density,
    locale: view.locale,
    setTheme,
    setDensity,
    setLocale,
  };
}
