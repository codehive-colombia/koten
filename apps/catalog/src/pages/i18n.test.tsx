import "@testing-library/jest-dom/vitest";
import { KotenProvider } from "@koten/ui";
import { render, screen } from "@testing-library/react";
import type { ReactElement } from "react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import { PrimitiveDocPage } from "../components/doc-page";
import { shellLabels } from "../data/catalog";
import { allPrimitiveBySlug } from "../data/docs/all";
import { syncViewToUrl } from "../lib/use-catalog-view";
import { BlocksIndexPage } from "./blocks/index";
import { OverviewPage } from "./overview";
import { TokensColorPage } from "./tokens/color";

function renderPage(ui: ReactElement, locale: "es" | "ja" | "en") {
  return render(
    <KotenProvider locale={locale}>
      <MemoryRouter>{ui}</MemoryRouter>
    </KotenProvider>,
  );
}

function primitive(slug: string) {
  const doc = allPrimitiveBySlug.get(slug);

  if (!doc) {
    throw new Error(`Missing primitive doc: ${slug}`);
  }

  return doc;
}

describe("catalog i18n", () => {
  it("translates the landing body into Japanese and English", () => {
    const japanese = renderPage(<OverviewPage />, "ja");
    expect(screen.getByText(/手段の簡素さ/)).toBeInTheDocument();
    expect(screen.getByText("色は意味を示し、装飾しない。")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: /三つの様式、一つの文法/ }),
    ).toBeInTheDocument();
    expect(screen.queryByText(/El color señala/)).not.toBeInTheDocument();
    japanese.unmount();

    renderPage(<OverviewPage />, "en");
    expect(screen.getByText(/Simplicity of means/)).toBeInTheDocument();
    expect(screen.getByText("Principles")).toBeInTheDocument();
    expect(screen.queryByText("Principios")).not.toBeInTheDocument();
  });

  it("translates token sections, captions and notes", () => {
    renderPage(<TokensColorPage />, "en");

    expect(screen.getByRole("heading", { level: 2, name: /^Palette/ })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: /^Semantic roles/ })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { level: 2, name: /^Paleta/ })).not.toBeInTheDocument();
  });

  it("translates the internal docs labels and prop notes", () => {
    renderPage(<PrimitiveDocPage doc={primitive("button")} />, "en");

    expect(screen.getAllByRole("button", { name: "Copy" }).length).toBeGreaterThan(0);
    expect(screen.getByText(/The color is decided by the theme/)).toBeInTheDocument();
    expect(screen.getByRole("list", { name: /Button · Accessibility/ })).toBeInTheDocument();
  });

  it("translates the block index and category descriptions", () => {
    renderPage(<BlocksIndexPage />, "ja");

    expect(screen.getByRole("heading", { level: 1, name: /^ブロック/ })).toBeInTheDocument();
    expect(screen.getAllByText(/HIKARI の商品ページ/).length).toBeGreaterThan(0);
  });

  it("declares the document language when syncing the view", () => {
    syncViewToUrl({ theme: "kanso", density: "default", locale: "ja" });
    expect(document.documentElement.lang).toBe("ja");

    syncViewToUrl({ theme: "kanso", density: "default", locale: "en" });
    expect(document.documentElement.lang).toBe("en");
  });

  it("keeps the shell labels in all three languages", () => {
    for (const locale of ["es", "ja", "en"] as const) {
      const labels = shellLabels[locale];

      expect(labels.docsLanguage.length).toBeGreaterThan(0);
      expect(labels.catalog.length).toBeGreaterThan(0);
      expect(labels.tagline.length).toBeGreaterThan(0);
    }

    expect(shellLabels.es.docsLanguage).not.toBe(shellLabels.en.docsLanguage);
    expect(shellLabels.es.docsLanguage).not.toBe(shellLabels.ja.docsLanguage);
  });
});
