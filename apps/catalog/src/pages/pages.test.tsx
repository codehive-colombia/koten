import "@testing-library/jest-dom/vitest";
import { KotenProvider } from "@koten/ui";
import { fireEvent, render, screen } from "@testing-library/react";
import type { ReactElement } from "react";
import { MemoryRouter, Route, Routes } from "react-router";
import { beforeEach, describe, expect, it } from "vitest";
import { BlockDocPage, PrimitiveDocPage } from "../components/doc-page";
import { blockCategories, blockDocs, primitiveDocs } from "../data/docs";
import { allBlockDoc, allBlockDocs, allPrimitiveBySlug, allPrimitiveDocs } from "../data/docs/all";
import type { BlockCategoryId } from "../data/docs/types";
import { PACKAGE_MANAGER_STORAGE_KEY } from "../lib/package-manager";
import { AIPage } from "./ai";
import { BlockCategoryPage, BlocksIndexPage } from "./blocks/index";
import { ComponentsIndexPage } from "./components/index";
import { NotFoundPage } from "./not-found";
import { OverviewPage } from "./overview";
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

function primitive(slug: string) {
  const doc = allPrimitiveBySlug.get(slug);

  if (!doc) {
    throw new Error(`Missing primitive doc: ${slug}`);
  }

  return doc;
}

function block(category: BlockCategoryId, slug: string) {
  const doc = allBlockDoc(category, slug);

  if (!doc) {
    throw new Error(`Missing block doc: ${category}/${slug}`);
  }

  return doc;
}

beforeEach(() => {
  window.localStorage.removeItem(PACKAGE_MANAGER_STORAGE_KEY);
});

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

  it("separates using the components from developing the repository", () => {
    renderPage(<StartPage />);

    expect(screen.getByRole("heading", { level: 1, name: /Empezar/ })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: /Usar Koten UI en tu proyecto/ }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: /Desarrollar Koten UI/ }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Quiero usar Koten UI/ })).toHaveAttribute(
      "href",
      "#usar",
    );
    expect(screen.getByRole("link", { name: /Quiero desarrollar Koten UI/ })).toHaveAttribute(
      "href",
      "#desarrollar",
    );
    expect(screen.getByText(/koten-theme\.json/)).toBeInTheDocument();
    expect(screen.getAllByText(/bun run dev/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/bun run check/).length).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: "Ver componentes" })).toHaveAttribute(
      "href",
      "/components",
    );
    expect(screen.getByRole("link", { name: "IA y agentes" })).toHaveAttribute("href", "/ai");
    expect(screen.queryByText(/cp packages\/ui/)).not.toBeInTheDocument();
  });

  it("explains the three AI access levels", () => {
    renderPage(<AIPage />);

    expect(screen.getByRole("heading", { level: 1, name: /IA y agentes/ })).toBeInTheDocument();
    expect(screen.getAllByText(/npx skills add codehive-colombia\/koten/).length).toBeGreaterThan(
      0,
    );
    expect(screen.getAllByText(/koten-design-language/).length).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: /llms\.txt/ })).toHaveAttribute(
      "href",
      "http://localhost:5173/llms.txt",
    );
    expect(screen.getByRole("link", { name: /Markdown/ })).toHaveAttribute(
      "href",
      "http://localhost:5173/md/components/button.md",
    );
  });

  it("indexes the foundation pages", () => {
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

  it("follows the locale in the format preview", () => {
    renderPage(<TokensFormatPage />, "ja");

    expect(screen.getAllByText("閉じる").length).toBeGreaterThan(0);
    expect(screen.getAllByText("2026/10/21").length).toBeGreaterThan(0);
  });

  it("lists every primitive with search, ID and reference", () => {
    renderPage(<ComponentsIndexPage />);

    expect(screen.getByRole("heading", { level: 1, name: /^Componentes/ })).toBeInTheDocument();
    expect(screen.getAllByRole("row")).toHaveLength(primitiveDocs.length + 1);
    expect(screen.getByText("46 componentes")).toBeInTheDocument();

    fireEvent.change(screen.getByRole("searchbox", { name: "Buscar componente" }), {
      target: { value: "toast" },
    });

    expect(screen.getByRole("link", { name: "Toast" })).toHaveAttribute(
      "href",
      "/components/toast",
    );
    expect(screen.queryByRole("link", { name: "Button" })).not.toBeInTheDocument();
    expect(screen.getByText("1 componentes")).toBeInTheDocument();
  });

  it("documents a primitive with installation, preview/code, props and a11y", () => {
    renderPage(<PrimitiveDocPage doc={primitive("button")} />);

    expect(screen.getByRole("heading", { level: 1, name: /Button/ })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: /^Instalación/ })).toBeInTheDocument();
    expect(
      screen.getByText("npx shadcn@latest add http://localhost:5173/r/button.json"),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: "Código" }).length).toBeGreaterThan(0);
    expect(screen.getByRole("heading", { level: 2, name: /^Props/ })).toBeInTheDocument();
    expect(screen.getByRole("list", { name: /Button · Accesibilidad/ })).toBeInTheDocument();
    expect(screen.getByText(/HTML nativo/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Markdown para agentes/ })).toHaveAttribute(
      "href",
      "http://localhost:5173/md/components/button.md",
    );
  });

  it("switches shadcn commands between npx and bunx and remembers the choice", () => {
    const first = renderPage(<PrimitiveDocPage doc={primitive("button")} />);

    expect(
      screen.getByText("npx shadcn@latest add http://localhost:5173/r/button.json"),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "bunx" }));

    expect(
      screen.getByText("bunx shadcn@latest add http://localhost:5173/r/button.json"),
    ).toBeInTheDocument();
    expect(window.localStorage.getItem(PACKAGE_MANAGER_STORAGE_KEY)).toBe("bun");
    first.unmount();

    renderPage(<BlockDocPage doc={block("storefront", "product-card")} />);

    expect(
      screen.getByText("bunx shadcn@latest add http://localhost:5173/r/product-card.json"),
    ).toBeInTheDocument();
  });

  it("uses the saved runner in the getting started commands", () => {
    window.localStorage.setItem(PACKAGE_MANAGER_STORAGE_KEY, "bun");

    renderPage(<StartPage />);

    expect(
      screen.getAllByText(/bunx shadcn@latest add .*koten-theme\.json/).length,
    ).toBeGreaterThan(0);
    expect(screen.getAllByText(/bunx shadcn@latest init/).length).toBeGreaterThan(0);
    expect(screen.queryByText(/npx shadcn@latest add .*koten-theme\.json/)).not.toBeInTheDocument();
  });

  it("marks form components with a form usage section", () => {
    renderPage(<PrimitiveDocPage doc={primitive("field")} />);

    expect(
      screen.getByRole("heading", { level: 2, name: /^Uso en un formulario/ }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("textbox", { name: /Correo/ }).length).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: /Base UI/ })).toHaveAttribute(
      "href",
      "https://base-ui.com/react/components/field",
    );
  });

  it("declares provider and hook requirements for Toast", () => {
    renderPage(<PrimitiveDocPage doc={primitive("toast")} />);

    expect(
      screen.getByRole("heading", { level: 2, name: /^Requisitos de uso/ }),
    ).toBeInTheDocument();
    expect(screen.getAllByText(/ToastProvider/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/useToast/).length).toBeGreaterThan(0);
    expect(screen.getByRole("button", { name: /Show toast/i })).toBeInTheDocument();
  });

  it("opens a Dialog from its example", () => {
    renderPage(<PrimitiveDocPage doc={primitive("dialog")} />);

    fireEvent.click(screen.getByRole("button", { name: /Abrir diálogo/ }));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Detalle del pedido/ })).toBeInTheDocument();
  });

  it("documents tables and date controls", () => {
    const table = renderPage(<PrimitiveDocPage doc={primitive("table")} />);
    expect(screen.getAllByRole("table").length).toBeGreaterThan(0);
    table.unmount();

    renderPage(<PrimitiveDocPage doc={primitive("date-picker")} />);
    expect(screen.getByRole("button", { name: /Fecha de entrega/ })).toBeInTheDocument();
  });

  it("lists blocks by category and renders one block per page", () => {
    const index = renderPage(<BlocksIndexPage />);
    expect(screen.getByRole("heading", { level: 1, name: /^Bloques/ })).toBeInTheDocument();
    expect(screen.getAllByRole("row")).toHaveLength(blockDocs.length + 1);
    for (const category of blockCategories) {
      expect(
        screen.getAllByRole("link", { name: new RegExp(category.title.es) }).length,
      ).toBeGreaterThan(0);
    }
    index.unmount();

    render(
      <KotenProvider locale="es">
        <MemoryRouter initialEntries={["/blocks/storefront"]}>
          <Routes>
            <Route path="/blocks/:category" element={<BlockCategoryPage />} />
          </Routes>
        </MemoryRouter>
      </KotenProvider>,
    );
    expect(screen.getByRole("heading", { level: 1, name: /^Storefront/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /ProductCard/ })).toHaveAttribute(
      "href",
      "/blocks/storefront/product-card",
    );
  });

  it("documents a block with installation, props and a11y", () => {
    renderPage(<BlockDocPage doc={block("storefront", "product-card")} />);

    expect(screen.getByRole("heading", { level: 1, name: /^ProductCard/ })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: /^Instalación/ })).toBeInTheDocument();
    expect(
      screen.getByText("npx shadcn@latest add http://localhost:5173/r/product-card.json"),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: /^Props/ })).toBeInTheDocument();
  });

  it("renders a translated 404 page", () => {
    renderPage(<NotFoundPage />, "en");

    expect(screen.getByRole("heading", { name: "Page not found" })).toBeInTheDocument();
  });
});

describe("documentation data", () => {
  it("keeps one page per primitive with unique IDs and complete copy", () => {
    expect(allPrimitiveDocs).toHaveLength(46);
    expect(new Set(allPrimitiveDocs.map((doc) => doc.slug)).size).toBe(allPrimitiveDocs.length);
    expect(new Set(allPrimitiveDocs.map((doc) => doc.id)).size).toBe(allPrimitiveDocs.length);

    for (const doc of allPrimitiveDocs) {
      for (const locale of ["es", "ja", "en"] as const) {
        expect(doc.description[locale].length, `${doc.slug} description ${locale}`).toBeGreaterThan(
          20,
        );
        expect(doc.a11y[locale].length, `${doc.slug} a11y ${locale}`).toBeGreaterThan(1);
      }

      expect(doc.examples.length, `${doc.slug} examples`).toBeGreaterThan(0);
      expect(doc.props.length, `${doc.slug} props`).toBeGreaterThan(0);
      expect(doc.files.length, `${doc.slug} files`).toBeGreaterThan(0);
    }
  });

  it("keeps form components wired to a form example", () => {
    const formSlugs = [
      "field",
      "label",
      "input",
      "textarea",
      "form-row",
      "select",
      "combobox",
      "checkbox",
      "radio-group",
      "switch",
      "number-field",
    ];

    for (const slug of formSlugs) {
      expect(primitive(slug).formExample, `${slug} formExample`).toBeDefined();
    }
  });

  it("keeps every block in one of the declared categories", () => {
    expect(allBlockDocs).toHaveLength(20);
    expect(new Set(allBlockDocs.map((doc) => `${doc.category}/${doc.slug}`)).size).toBe(
      allBlockDocs.length,
    );

    for (const doc of allBlockDocs) {
      expect(blockCategories.some((category) => category.id === doc.category)).toBe(true);
      expect(doc.examples.length).toBeGreaterThan(0);
      expect(doc.props.length).toBeGreaterThan(0);
    }
  });
});
