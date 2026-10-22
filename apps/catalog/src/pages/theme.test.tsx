import "@testing-library/jest-dom/vitest";
import { KotenProvider } from "@koten/ui";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { ReactElement } from "react";
import { MemoryRouter } from "react-router";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ThemeDesignerPage } from "./theme";

function renderPage(ui: ReactElement, locale: "es" | "ja" | "en" = "es") {
  return render(
    <KotenProvider locale={locale}>
      <MemoryRouter>{ui}</MemoryRouter>
    </KotenProvider>,
  );
}

function preview() {
  const element = document.querySelector<HTMLElement>('[data-slot="theme-preview"]');

  if (!element) throw new Error("Theme preview not found");

  return element;
}

beforeEach(() => {
  window.history.replaceState(null, "", "/");
});

afterEach(() => {
  Reflect.deleteProperty(navigator, "clipboard");
});

describe("theme designer page", () => {
  it("starts from a full AA theme and exports its semantic tokens", () => {
    renderPage(<ThemeDesignerPage />);

    expect(screen.getByRole("heading", { level: 1, name: /Diseñar un tema/ })).toBeInTheDocument();
    expect(screen.getByText(/11 de 11 comprobaciones AA/)).toBeInTheDocument();
    expect(preview().style.getPropertyValue("--koten-bg")).toBe("#F5F0E4");
    expect(preview().style.getPropertyValue("--koten-primary")).toBe("#1E3A5F");
    expect(screen.getByText(/--koten-primary: #1E3A5F;/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Copiar CSS" })).toBeEnabled();
  });

  it("switches register, keeps the URL shareable and writes a dark theme", () => {
    renderPage(<ThemeDesignerPage />);

    fireEvent.click(screen.getByRole("button", { name: /^Sumi/ }));

    expect(preview().style.getPropertyValue("--koten-bg")).toBe("#171512");
    expect(preview().style.getPropertyValue("--koten-primary")).toBe("#9CC2EF");
    expect(screen.getByText(/color-scheme: dark;/)).toBeInTheDocument();
    expect(new URLSearchParams(window.location.search).get("ks")).toBe("sumi.ai.2.2.default");
    expect(screen.getByText(/11 de 11 comprobaciones AA/)).toBeInTheDocument();
  });

  it("blocks export when Shu is paired with the warmest paper, then fixes the paper", async () => {
    renderPage(<ThemeDesignerPage />);

    fireEvent.click(screen.getByRole("button", { name: /^Shu/ }));
    fireEvent.click(screen.getByRole("button", { name: /^Papel 5/ }));

    expect(screen.getByText(/10 de 11 comprobaciones AA/)).toBeInTheDocument();
    expect(screen.getAllByText("No cumple").length).toBeGreaterThan(0);
    expect(screen.getByRole("button", { name: "Copiar CSS" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Descargar .css" })).toBeDisabled();

    fireEvent.click(screen.getByRole("button", { name: "Usar papel seguro" }));

    expect(screen.getByText(/11 de 11 comprobaciones AA/)).toBeInTheDocument();
    expect(screen.queryByText("No cumple")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Copiar CSS" })).toBeEnabled();
    expect(preview().style.getPropertyValue("--koten-primary")).toBe("#C23B22");
    expect(preview().style.getPropertyValue("--koten-bg")).toBe("#F5F0E4");
    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Copiar CSS" })).toHaveFocus();
    });
  });

  it("renders the designer copy in Japanese and English", () => {
    const japanese = renderPage(<ThemeDesignerPage />, "ja");

    expect(screen.getByRole("heading", { level: 1, name: /テーマを設計/ })).toBeInTheDocument();
    expect(screen.getByText(/件がAA/)).toBeInTheDocument();
    japanese.unmount();

    renderPage(<ThemeDesignerPage />, "en");

    expect(screen.getByRole("heading", { level: 1, name: /Design a theme/ })).toBeInTheDocument();
    expect(screen.getByText(/of 11 AA checks/)).toBeInTheDocument();
  });

  it("copies the generated CSS when the clipboard is available", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });
    renderPage(<ThemeDesignerPage />);

    fireEvent.click(screen.getByRole("button", { name: "Copiar CSS" }));

    await waitFor(() => {
      expect(writeText).toHaveBeenCalledWith(expect.stringContaining("--koten-bg: #F5F0E4;"));
    });
    expect(screen.getByRole("button", { name: "Copiado" })).toBeInTheDocument();
  });
});
