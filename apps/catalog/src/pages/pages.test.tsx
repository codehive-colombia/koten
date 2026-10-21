import "@testing-library/jest-dom/vitest";
import { KotenProvider } from "@koten/ui";
import { fireEvent, render, screen } from "@testing-library/react";
import type { ReactElement } from "react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import { BadgePage } from "./components/badge";
import { ButtonPage } from "./components/button";
import { CommandPalettePage } from "./components/command";
import { ControlsPage } from "./components/controls";
import { DataPage } from "./components/data";
import { DatePickerPage } from "./components/date";
import { FeedbackPage } from "./components/feedback";
import { FormsPage } from "./components/forms";
import { ComponentsIndexPage } from "./components/index";
import { InputsPage } from "./components/inputs";
import { NavigationPage } from "./components/navigation";
import { OverlaysPage } from "./components/overlays";
import { PanelPage } from "./components/panel";
import { SurfacesPage } from "./components/surfaces";
import { NotFoundPage } from "./not-found";
import { OverviewPage } from "./overview";
import { ErpPatternsPage } from "./patterns/erp";
import { PatternsIndexPage } from "./patterns/index";
import { StorefrontPatternsPage } from "./patterns/storefront";
import { StartPage } from "./start";
import { TokensColorPage } from "./tokens/color";
import { TokensDensityPage } from "./tokens/density";
import { TokensFormatPage } from "./tokens/format";
import { TokensIndexPage } from "./tokens/index";
import { TokensShapePage } from "./tokens/shape";
import { TokensSpacingPage } from "./tokens/spacing";
import { TokensThemesPage } from "./tokens/themes";
import { TokensTypographyPage } from "./tokens/typography";

function renderPage(ui: ReactElement, locale: "es" | "ja" | "en" = "es") {
  return render(
    <KotenProvider locale={locale}>
      <MemoryRouter>{ui}</MemoryRouter>
    </KotenProvider>,
  );
}

describe("catalog pages", () => {
  it("renders the landing page with its entry points and live plates", () => {
    const landing = renderPage(<OverviewPage />);

    expect(screen.getByRole("heading", { level: 1, name: /Koten UI/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Explorar componentes/ })).toHaveAttribute(
      "href",
      "/components",
    );
    expect(screen.getAllByRole("link", { name: /^Fundamentos/ }).length).toBeGreaterThan(0);
    expect(screen.getByRole("heading", { level: 2, name: /Tres registros/ })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: /Principios/ })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: /En contexto/ })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: "Pedido · KURA-1042" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("table", { name: "Pedido · KURA-1042" })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /Abrir demo/ })).toHaveLength(2);
    expect(screen.getByText("data-theme")).toBeInTheDocument();
    expect(landing.container.querySelectorAll("article[data-theme]")).toHaveLength(3);
  });

  it("explains how to start and copy a primitive", () => {
    renderPage(<StartPage />);

    expect(screen.getByRole("heading", { level: 1, name: /Empezar/ })).toBeInTheDocument();
    expect(screen.getAllByText(/bun run check/).length).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: "Ver componentes" })).toHaveAttribute(
      "href",
      "/components",
    );
  });

  it("indexes the seven foundation pages", () => {
    renderPage(<TokensIndexPage />);

    expect(screen.getByRole("heading", { level: 1, name: /Fundamentos/ })).toBeInTheDocument();

    for (const title of [
      "Color",
      "Tipografía",
      "Espaciado",
      "Forma y movimiento",
      "Densidad",
      "Temas",
      "Idioma y formato",
    ]) {
      expect(screen.getByRole("link", { name: new RegExp(title) })).toBeInTheDocument();
    }
  });

  it("shows color and semantic roles", () => {
    renderPage(<TokensColorPage />);

    expect(screen.getByRole("heading", { level: 2, name: /Paleta/ })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: /Roles semánticos/ })).toBeInTheDocument();
    expect(screen.getByText("--koten-kinari")).toBeInTheDocument();
    expect(screen.getByText("--koten-sale")).toBeInTheDocument();
  });

  it("shows typography, spacing and shape", () => {
    const typography = renderPage(<TokensTypographyPage />);
    expect(screen.getByText("text-4xl")).toBeInTheDocument();
    typography.unmount();

    const spacing = renderPage(<TokensSpacingPage />);
    expect(screen.getAllByText("64").length).toBeGreaterThan(0);
    spacing.unmount();

    renderPage(<TokensShapePage />);
    expect(screen.getByText("--koten-layout-wide")).toBeInTheDocument();
  });

  it("compares densities and themes with fixed samples", () => {
    const density = renderPage(<TokensDensityPage />);
    expect(density.container.querySelectorAll("div[data-density]")).toHaveLength(3);
    density.unmount();

    const themes = renderPage(<TokensThemesPage />);
    expect(themes.container.querySelectorAll("article[data-theme]")).toHaveLength(4);
  });

  it("documents CommandPalette", async () => {
    renderPage(<CommandPalettePage />);

    expect(screen.getByRole("heading", { level: 1, name: /CommandPalette/ })).toBeInTheDocument();

    const trigger = screen.getByRole("button", { name: "Abrir paleta" });
    fireEvent.click(trigger);

    const input = await screen.findByRole("combobox", { name: /Comandos de KURA/ });
    fireEvent.change(input, { target: { value: "pedidos" } });

    expect(screen.getByRole("option", { name: /Ver pedidos/ })).toBeInTheDocument();
  });

  it("documents DatePicker and Calendar", () => {
    renderPage(<DatePickerPage />);

    expect(screen.getByRole("heading", { level: 1, name: /DatePicker/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Fecha de entrega/ })).toBeInTheDocument();
    expect(screen.getByRole("table", { name: /octubre de 2026/i })).toBeInTheDocument();
  });

  it("follows the locale in the format preview", () => {
    renderPage(<TokensFormatPage />, "ja");

    expect(screen.getAllByText("閉じる").length).toBeGreaterThan(0);
    expect(screen.getAllByText("2026/10/21").length).toBeGreaterThan(0);
  });

  it("indexes and documents the three components", () => {
    const index = renderPage(<ComponentsIndexPage />);
    expect(screen.getAllByRole("link", { name: /^Button/ }).length).toBeGreaterThan(0);
    expect(screen.getByRole("table", { name: "Inventario de primitivas" })).toBeInTheDocument();
    expect(screen.getAllByRole("row")).toHaveLength(46);
    index.unmount();

    const button = renderPage(<ButtonPage />);
    expect(screen.getByRole("button", { name: "Guardando" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Copiar" })).toBeInTheDocument();
    button.unmount();

    const panel = renderPage(<PanelPage />);
    expect(screen.getByRole("heading", { level: 3, name: "Pedidos de hoy" })).toBeInTheDocument();
    panel.unmount();

    const badge = renderPage(<BadgePage />);
    expect(screen.getAllByText("En stock").length).toBeGreaterThan(0);
    badge.unmount();

    const forms = renderPage(<FormsPage />);
    expect(screen.getAllByRole("textbox", { name: /Correo/ }).length).toBeGreaterThan(0);
    expect(screen.getByRole("textbox", { name: "Notas de entrega" })).toBeInTheDocument();
    expect(screen.getByText("El correo no es válido.")).toBeInTheDocument();
    expect(forms.container.querySelector('[data-orientation="horizontal"]')).toBeInTheDocument();
    forms.unmount();

    const inputs = renderPage(<InputsPage />);
    expect(screen.getByRole("combobox", { name: "Almacén de salida" })).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: "Recibir avisos de stock" })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "Estándar" })).toBeInTheDocument();
    expect(screen.getByRole("switch", { name: "Notificaciones" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Unidades" })).toBeInTheDocument();
    inputs.unmount();

    const surfaces = renderPage(<SurfacesPage />);
    expect(screen.getByRole("heading", { level: 1, name: /Superficies/ })).toBeInTheDocument();
    expect(screen.getAllByRole("separator").length).toBeGreaterThan(0);
    expect(screen.getByRole("img", { name: "Sello Koten" })).toBeInTheDocument();
    surfaces.unmount();

    const feedback = renderPage(<FeedbackPage />);
    expect(screen.getByRole("heading", { level: 1, name: /Feedback/ })).toBeInTheDocument();
    expect(screen.getAllByRole("status").length).toBeGreaterThan(0);
    expect(screen.getAllByRole("alert").length).toBeGreaterThan(0);
    expect(screen.getAllByRole("progressbar").length).toBeGreaterThan(0);
    expect(screen.getAllByRole("meter").length).toBeGreaterThan(0);
    expect(screen.getByRole("button", { name: "Mostrar toast" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Sin pedidos" })).toBeInTheDocument();
    feedback.unmount();

    const navigation = renderPage(<NavigationPage />);
    expect(screen.getByRole("heading", { level: 1, name: /Navegación/ })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Migas de pan" })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Paginación de pedidos" })).toBeInTheDocument();
    expect(screen.getByRole("tablist", { name: "Vista del pedido" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Envío y entrega" })).toBeInTheDocument();
    navigation.unmount();

    const overlays = renderPage(<OverlaysPage />);
    expect(screen.getByRole("heading", { level: 1, name: /Overlays/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Abrir diálogo" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Abrir drawer" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Acciones" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Ver resumen" })).toBeInTheDocument();
    overlays.unmount();

    const data = renderPage(<DataPage />);
    expect(screen.getByRole("heading", { level: 1, name: /Datos/ })).toBeInTheDocument();
    expect(screen.getByRole("table", { name: "Pedidos KURA" })).toBeInTheDocument();
    expect(screen.getByText("Pedidos hoy")).toBeInTheDocument();
    expect(screen.getByRole("table", { name: "Pedidos por día" })).toBeInTheDocument();
    data.unmount();

    renderPage(<ControlsPage />);
    expect(screen.getByRole("heading", { level: 1, name: /Controles/ })).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: "Descargar" }).length).toBeGreaterThan(0);
    expect(screen.getByRole("group", { name: "Vista de pedidos" })).toBeInTheDocument();
    expect(screen.getByRole("toolbar", { name: "Acciones de pedidos" })).toBeInTheDocument();
  });

  it("documents the storefront and ERP patterns", () => {
    const index = renderPage(<PatternsIndexPage />);
    expect(screen.getByRole("heading", { level: 1, name: /Patrones/ })).toBeInTheDocument();
    expect(screen.getAllByRole("row")).toHaveLength(21);
    index.unmount();

    const storefront = renderPage(<StorefrontPatternsPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: /Patrones de storefront/ }),
    ).toBeInTheDocument();
    expect(screen.getByRole("searchbox", { name: "Buscar productos" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "HIKARI K-1 de frente" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Distribución" })).toBeInTheDocument();
    storefront.unmount();

    const erp = renderPage(<ErpPatternsPage />);
    expect(screen.getByRole("heading", { level: 1, name: /Patrones de ERP/ })).toBeInTheDocument();
    expect(screen.getAllByText("Pendiente").length).toBeGreaterThan(0);
    expect(screen.getByRole("button", { name: "Abrir detalle de pedido" })).toBeInTheDocument();
    erp.unmount();
  });

  it("renders a translated 404 page", () => {
    renderPage(<NotFoundPage />, "en");

    expect(screen.getByRole("heading", { name: "Page not found" })).toBeInTheDocument();
  });
});
