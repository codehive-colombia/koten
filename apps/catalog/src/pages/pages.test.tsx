import "@testing-library/jest-dom/vitest";
import { KotenProvider } from "@koten/ui";
import { render, screen } from "@testing-library/react";
import type { ReactElement } from "react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import { BadgePage } from "./components/badge";
import { ButtonPage } from "./components/button";
import { ControlsPage } from "./components/controls";
import { DataPage } from "./components/data";
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

describe("páginas del catálogo", () => {
  it("muestra la portada con sus accesos", () => {
    renderPage(<OverviewPage />);

    expect(screen.getByRole("heading", { level: 1, name: /Koten UI/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Fundamentos/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Componentes/ })).toBeInTheDocument();
  });

  it("indexa las siete páginas de fundamentos", () => {
    renderPage(<TokensIndexPage />);

    expect(screen.getByRole("heading", { level: 1, name: /Tokens/ })).toBeInTheDocument();

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

  it("muestra color y roles semánticos", () => {
    renderPage(<TokensColorPage />);

    expect(screen.getByRole("heading", { level: 2, name: /Paleta/ })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: /Roles semánticos/ })).toBeInTheDocument();
    expect(screen.getByText("--koten-kinari")).toBeInTheDocument();
    expect(screen.getByText("--koten-sale")).toBeInTheDocument();
  });

  it("muestra tipografía, espaciado y forma", () => {
    const typography = renderPage(<TokensTypographyPage />);
    expect(screen.getByText("text-4xl")).toBeInTheDocument();
    typography.unmount();

    const spacing = renderPage(<TokensSpacingPage />);
    expect(screen.getAllByText("64").length).toBeGreaterThan(0);
    spacing.unmount();

    renderPage(<TokensShapePage />);
    expect(screen.getByText("--koten-layout-wide")).toBeInTheDocument();
  });

  it("compara densidades y temas con muestras fijas", () => {
    const density = renderPage(<TokensDensityPage />);
    expect(density.container.querySelectorAll("div[data-density]")).toHaveLength(3);
    density.unmount();

    const themes = renderPage(<TokensThemesPage />);
    expect(themes.container.querySelectorAll("article[data-theme]")).toHaveLength(3);
  });

  it("responde al locale en la vista previa de formato", () => {
    renderPage(<TokensFormatPage />, "ja");

    expect(screen.getAllByText("閉じる").length).toBeGreaterThan(0);
    expect(screen.getAllByText("2026/10/21").length).toBeGreaterThan(0);
  });

  it("indexa y documenta los tres componentes", () => {
    const index = renderPage(<ComponentsIndexPage />);
    expect(screen.getByRole("link", { name: /^Button/ })).toBeInTheDocument();
    index.unmount();

    const button = renderPage(<ButtonPage />);
    expect(screen.getByRole("button", { name: "Guardando" })).toBeDisabled();
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

  it("muestra una página 404 traducida", () => {
    renderPage(<NotFoundPage />, "en");

    expect(screen.getByRole("heading", { name: "Page not found" })).toBeInTheDocument();
  });
});
