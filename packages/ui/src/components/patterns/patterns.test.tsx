import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Toolbar, ToolbarButton } from "../ui/toolbar";
import { CampaignBanner } from "./campaign-banner";
import { DetailDrawer, DetailSection } from "./detail-drawer";
import { FilterBar } from "./filter-bar";
import { FormSection } from "./form-section";
import { NoticeList } from "./notice-list";
import { PriceBlock } from "./price-block";
import { ProductGallery } from "./product-gallery";
import { ReviewSummary } from "./review-summary";
import { SearchBar } from "./search-bar";
import { SideNav } from "./side-nav";
import { StatusBadge } from "./status-badge";
import { Timeline } from "./timeline";

describe("patrones de storefront", () => {
  it("SearchBar envía el texto y la categoría", () => {
    const onSubmit = vi.fn();

    render(
      <SearchBar
        label="Buscar productos"
        placeholder="Modelo"
        categoriesLabel="Categorías"
        categories={[
          { value: "all", label: "Todo" },
          { value: "cameras", label: "Cámaras" },
        ]}
        submitLabel="Buscar"
        onSubmit={onSubmit}
      />,
    );

    fireEvent.change(screen.getByRole("searchbox", { name: "Buscar productos" }), {
      target: { value: "K-1" },
    });
    fireEvent.change(screen.getByRole("combobox", { name: "Categorías" }), {
      target: { value: "cameras" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Buscar" }));

    expect(onSubmit).toHaveBeenCalledWith("K-1", "cameras");
  });

  it("PriceBlock muestra precio anterior, puntos y stock", () => {
    render(
      <PriceBlock
        price="¥58,300"
        taxLabel="IVA incluido"
        listPrice="¥63,800"
        listPriceLabel="Precio anterior"
        points="583 puntos"
        stock={{ label: "En stock", tone: "success" }}
      />,
    );

    expect(screen.getByText("¥58,300")).toBeInTheDocument();
    expect(screen.getByText("Precio anterior")).toBeInTheDocument();
    expect(screen.getByText("583 puntos")).toBeInTheDocument();
    expect(screen.getByText("En stock")).toBeInTheDocument();
  });

  it("ProductGallery cambia la imagen principal con las miniaturas", () => {
    render(
      <ProductGallery
        label="Galería"
        images={[
          { src: "/front.svg", alt: "Vista frontal" },
          { src: "/top.svg", alt: "Vista superior" },
        ]}
        thumbLabel={(index, alt) => `${index + 1}. ${alt}`}
      />,
    );

    expect(screen.getByRole("img", { name: "Vista frontal" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "2. Vista superior" }));
    expect(screen.getByRole("img", { name: "Vista superior" })).toBeInTheDocument();
  });

  it("ProductGallery admite imágenes repetidas sin claves duplicadas", () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <ProductGallery
        label="Galería"
        images={[
          { id: "front", src: "/same.svg", alt: "Vista frontal" },
          { id: "top", src: "/same.svg", alt: "Vista superior" },
        ]}
        thumbLabel={(index, alt) => `${index + 1}. ${alt}`}
      />,
    );

    expect(screen.getAllByRole("button")).toHaveLength(2);
    expect(consoleError).not.toHaveBeenCalled();
    consoleError.mockRestore();
  });

  it("ReviewSummary muestra la distribución y las reseñas", () => {
    render(
      <ReviewSummary
        rating={4.6}
        count={10}
        ratingLabel={(value) => `${value} de 5`}
        countLabel={(count) => `${count} reseñas`}
        distributionLabel="Distribución"
        distribution={[
          { stars: 5, count: 8 },
          { stars: 4, count: 2 },
        ]}
        reviews={[
          {
            id: "r1",
            author: "Mika",
            date: "2026-10-12",
            rating: 5,
            title: "Muy ligera",
            body: "La llevo todos los días.",
            verified: true,
          },
        ]}
        verifiedLabel="Compra verificada"
        emptyLabel="Sin reseñas"
      />,
    );

    expect(screen.getByText("Distribución")).toBeInTheDocument();
    expect(screen.getByText("Muy ligera")).toBeInTheDocument();
    expect(screen.getByText("Compra verificada")).toBeInTheDocument();
  });

  it("NoticeList conserva la fecha ISO y enlaza el aviso", () => {
    render(
      <NoticeList
        label="Avisos"
        emptyLabel="Sin avisos"
        notices={[
          {
            id: "n1",
            date: "21/10",
            dateTime: "2026-10-21",
            title: "Nueva campaña",
            href: "/avisos",
          },
        ]}
      />,
    );

    expect(screen.getByText("Nueva campaña").closest("a")).toHaveAttribute("href", "/avisos");
    expect(screen.getByText("21/10")).toHaveAttribute("dateTime", "2026-10-21");
  });

  it("CampaignBanner expone un CTA real", () => {
    render(
      <CampaignBanner
        eyebrow="Campaña"
        title="12.000 ¥ de descuento"
        description="Hasta el 31 de octubre."
        cta={{ label: "Ver campaña", href: "/campana" }}
      />,
    );

    expect(screen.getByRole("link", { name: "Ver campaña" })).toHaveAttribute("href", "/campana");
  });
});

describe("patrones de ERP", () => {
  it("SideNav marca el activo y navega sin recargar", () => {
    const onNavigate = vi.fn();

    render(
      <SideNav
        label="Navegación"
        onNavigate={onNavigate}
        groups={[
          {
            id: "ops",
            label: "Operación",
            items: [
              { id: "dashboard", label: "Dashboard", href: "/" },
              { id: "orders", label: "Pedidos", href: "/orders", active: true, count: 3 },
            ],
          },
        ]}
      />,
    );

    expect(screen.getByRole("link", { name: /Pedidos/ })).toHaveAttribute("aria-current", "page");
    fireEvent.click(screen.getByRole("link", { name: /Pedidos/ }));
    expect(onNavigate).toHaveBeenCalledWith("/orders");
  });

  it("StatusBadge asocia estado y texto", () => {
    render(<StatusBadge status="pending" label="Pendiente" />);

    expect(screen.getByText("Pendiente")).toBeInTheDocument();
  });

  it("FilterBar dispara aplicar y limpiar", () => {
    const onSubmit = vi.fn();
    const onReset = vi.fn();

    render(
      <FilterBar
        label="Filtros"
        submitLabel="Aplicar"
        resetLabel="Limpiar"
        resultLabel="3 pedidos"
        onSubmit={onSubmit}
        onReset={onReset}
      >
        <label htmlFor="filter-demo">Buscar</label>
        <Input id="filter-demo" />
      </FilterBar>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Aplicar" }));
    fireEvent.click(screen.getByRole("button", { name: "Limpiar" }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onReset).toHaveBeenCalledTimes(1);
  });

  it("Timeline lista eventos con fecha y tono", () => {
    render(
      <Timeline
        label="Historial"
        emptyLabel="Sin eventos"
        events={[
          {
            id: "e1",
            time: "21/10 12:00",
            dateTime: "2026-10-21T12:00:00.000Z",
            title: "Pedido recibido",
            description: "Registrado automáticamente",
            tone: "success",
          },
        ]}
      />,
    );

    expect(screen.getByText("Pedido recibido")).toBeInTheDocument();
    expect(screen.getByText("21/10 12:00")).toHaveAttribute("dateTime", "2026-10-21T12:00:00.000Z");
  });

  it("FormSection agrupa campos con legend", () => {
    render(
      <FormSection title="Cliente" description="Datos de contacto">
        <label htmlFor="form-demo">Nombre</label>
        <Input id="form-demo" />
      </FormSection>,
    );

    expect(screen.getByRole("group", { name: "Cliente" })).toBeInTheDocument();
    expect(screen.getByText("Datos de contacto")).toBeInTheDocument();
  });

  it("DetailDrawer abre, muestra secciones y cierra con Escape", async () => {
    render(
      <DetailDrawer
        trigger={<Button>Abrir detalle</Button>}
        title="Pedido KURA-10428"
        description="Detalle del pedido"
        closeLabel="Cerrar"
        footer={<Button>Acción</Button>}
      >
        <DetailSection title="Cliente">
          <p>Yamada Shōji</p>
        </DetailSection>
      </DetailDrawer>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Abrir detalle" }));
    expect(await screen.findByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Pedido KURA-10428" })).toBeInTheDocument();
    expect(screen.getByText("Yamada Shōji")).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape" });

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("Toolbar mantiene los botones accesibles", () => {
    render(
      <Toolbar label="Acciones">
        <ToolbarButton label="Exportar">Exportar</ToolbarButton>
      </Toolbar>,
    );

    expect(screen.getByRole("toolbar", { name: "Acciones" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Exportar" })).toBeInTheDocument();
  });
});
