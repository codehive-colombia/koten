import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { readViewFromUrl, useCatalogView } from "./use-catalog-view";

beforeEach(() => {
  window.history.replaceState(null, "", "/");
  document.documentElement.dataset.theme = "kanso";
  document.documentElement.dataset.density = "default";
  document.documentElement.lang = "es";
});

describe("readViewFromUrl", () => {
  it("falls back to Kanso, default density and Spanish", () => {
    expect(readViewFromUrl("")).toEqual({
      theme: "kanso",
      density: "default",
      locale: "es",
    });
  });

  it("reads a valid theme, density and locale", () => {
    expect(readViewFromUrl("?theme=chirashi&density=compact&lang=ja")).toEqual({
      theme: "chirashi",
      density: "compact",
      locale: "ja",
    });
  });

  it("rejects unknown values", () => {
    expect(readViewFromUrl("?theme=neon&density=huge&lang=fr")).toEqual({
      theme: "kanso",
      density: "default",
      locale: "es",
    });
  });
});

describe("useCatalogView", () => {
  it("applies the URL state to the document and keeps it in sync", () => {
    window.history.replaceState(null, "", "/?theme=daicho&density=comfortable&lang=en");

    const { result } = renderHook(() => useCatalogView());

    expect(result.current.theme).toBe("daicho");
    expect(result.current.density).toBe("comfortable");
    expect(result.current.locale).toBe("en");
    expect(document.documentElement.dataset.theme).toBe("daicho");
    expect(document.documentElement.dataset.density).toBe("comfortable");

    act(() => result.current.setTheme("chirashi"));

    expect(document.documentElement.dataset.theme).toBe("chirashi");
    expect(new URL(window.location.href).searchParams.get("theme")).toBe("chirashi");
    expect(new URL(window.location.href).searchParams.get("density")).toBe("comfortable");
    expect(new URL(window.location.href).searchParams.get("lang")).toBe("en");
  });

  it("writes the default state on mount", () => {
    renderHook(() => useCatalogView());

    expect(new URL(window.location.href).searchParams.get("theme")).toBe("kanso");
    expect(new URL(window.location.href).searchParams.get("density")).toBe("default");
    expect(new URL(window.location.href).searchParams.get("lang")).toBe("es");
  });

  it("reacciona a popstate leyendo la URL", () => {
    const { result } = renderHook(() => useCatalogView());

    act(() => {
      window.history.replaceState(null, "", "/?theme=chirashi&density=compact&lang=ja");
      window.dispatchEvent(new PopStateEvent("popstate"));
    });

    expect(result.current.theme).toBe("chirashi");
    expect(result.current.density).toBe("compact");
    expect(result.current.locale).toBe("ja");
  });
});
