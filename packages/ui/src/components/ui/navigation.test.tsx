import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Accordion } from "./accordion";
import { Breadcrumb } from "./breadcrumb";
import { Link } from "./link";
import { Pagination } from "./pagination";
import { Tabs } from "./tabs";

describe("Link", () => {
  it("marks external links and adds safe attributes", () => {
    render(<Link href="https://example.com">Ejemplo</Link>);

    const link = screen.getByRole("link", { name: /Ejemplo/ });

    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noreferrer");
    expect(link).toHaveAttribute("data-external", "");
  });

  it("keeps internal links in the same tab", () => {
    render(<Link href="/docs">Documentación</Link>);

    expect(screen.getByRole("link", { name: "Documentación" })).not.toHaveAttribute("target");
  });
});

describe("Breadcrumb", () => {
  it("marks the current page", () => {
    render(
      <Breadcrumb
        label="Migas"
        items={[
          { label: "Inicio", href: "/" },
          { label: "Pedidos", href: "/orders" },
          { label: "KURA-0142" },
        ]}
      />,
    );

    expect(screen.getByRole("navigation", { name: "Migas" })).toBeInTheDocument();
    expect(screen.getByText("KURA-0142")).toHaveAttribute("aria-current", "page");
  });
});

describe("Pagination", () => {
  it("reports page changes and disables the previous button on page 1", () => {
    const onPageChange = vi.fn();
    render(
      <Pagination
        page={1}
        pageCount={5}
        onPageChange={onPageChange}
        previousLabel="Anterior"
        nextLabel="Siguiente"
        navLabel="Paginación"
        pageLabel={(page) => `Página ${page}`}
      />,
    );

    expect(screen.getByRole("button", { name: "Anterior" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Página 1" })).toHaveAttribute(
      "aria-current",
      "page",
    );

    fireEvent.click(screen.getByRole("button", { name: "Página 2" }));

    expect(onPageChange).toHaveBeenCalledWith(2);
  });
});

describe("Tabs", () => {
  it("switches panels with the tab list", () => {
    render(
      <Tabs
        label="Vista de pedido"
        defaultValue="resumen"
        items={[
          { value: "resumen", label: "Resumen", content: "Contenido del resumen" },
          { value: "lineas", label: "Líneas", content: "Contenido de líneas" },
        ]}
      />,
    );

    expect(screen.getByRole("tablist", { name: "Vista de pedido" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Resumen" })).toHaveAttribute("aria-selected", "true");

    fireEvent.click(screen.getByRole("tab", { name: "Líneas" }));

    expect(screen.getByText("Contenido de líneas")).toBeInTheDocument();
  });
});

describe("Accordion", () => {
  it("opens and closes a section", () => {
    render(
      <Accordion
        items={[
          { value: "what", title: "¿Qué es Koten?", content: "Un sistema de componentes." },
          { value: "how", title: "¿Cómo empiezo?", content: "Lee el catálogo." },
        ]}
      />,
    );

    const trigger = screen.getByRole("button", { name: "¿Qué es Koten?" });

    expect(trigger).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Un sistema de componentes.")).toBeInTheDocument();
  });
});
