import "@testing-library/jest-dom/vitest";
import { KotenProvider } from "@koten/ui";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SettingsPanel } from "./settings-panel";

type SettingsPanelProps = Parameters<typeof SettingsPanel>[0];

function renderPanel(overrides: Partial<SettingsPanelProps> = {}) {
  const props: SettingsPanelProps = {
    locale: "es",
    theme: "kanso",
    density: "default",
    onThemeChange: vi.fn(),
    onDensityChange: vi.fn(),
    onLocaleChange: vi.fn(),
    ...overrides,
  };

  render(
    <KotenProvider locale={props.locale}>
      <SettingsPanel {...props} />
    </KotenProvider>,
  );

  return props;
}

describe("SettingsPanel", () => {
  it("opens a floating panel with the three configuration groups", async () => {
    renderPanel();

    fireEvent.click(screen.getByRole("button", { name: "Configuración" }));

    expect(await screen.findByText("Tema, densidad e idioma del catálogo.")).toBeInTheDocument();
    expect(screen.getByRole("group", { name: "Tema" })).toBeInTheDocument();
    expect(screen.getByRole("group", { name: "Densidad" })).toBeInTheDocument();
    expect(screen.getByRole("group", { name: "Idioma" })).toBeInTheDocument();
    expect(
      screen.getByText("Se guarda en la URL y se comparte con el enlace."),
    ).toBeInTheDocument();
  });

  it("reports theme, density and locale changes", async () => {
    const props = renderPanel();

    fireEvent.click(screen.getByRole("button", { name: "Configuración" }));
    fireEvent.click(await screen.findByRole("button", { name: "Chirashi" }));
    fireEvent.click(screen.getByRole("button", { name: "Compacta" }));
    fireEvent.click(screen.getByRole("button", { name: "日本語" }));

    expect(props.onThemeChange).toHaveBeenCalledWith("chirashi");
    expect(props.onDensityChange).toHaveBeenCalledWith("compact");
    expect(props.onLocaleChange).toHaveBeenCalledWith("ja");
  });

  it("localizes the trigger and the panel", async () => {
    renderPanel({ locale: "en" });

    fireEvent.click(screen.getByRole("button", { name: "Settings" }));

    expect(
      await screen.findByText("Theme, density and language for the catalog."),
    ).toBeInTheDocument();
    expect(screen.getByRole("group", { name: "Theme" })).toBeInTheDocument();
    expect(screen.getByRole("group", { name: "Density" })).toBeInTheDocument();
    expect(screen.getByRole("group", { name: "Language" })).toBeInTheDocument();
  });
});
