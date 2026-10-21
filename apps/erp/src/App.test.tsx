import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { beforeEach, describe, expect, it } from "vitest";
import { ErpApp } from "./App";

function renderErp(path = "/") {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <ErpApp />
    </MemoryRouter>,
  );
}

describe("ERP KURA", () => {
  beforeEach(() => {
    window.history.replaceState(null, "", "/");
  });

  it("muestra el dashboard con KPIs, chart y pedidos recientes", () => {
    renderErp();

    expect(screen.getByRole("heading", { level: 1, name: "Dashboard" })).toBeInTheDocument();
    expect(screen.getAllByText("Pedidos hoy").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Ingresos 7 días").length).toBeGreaterThan(0);
    expect(screen.getByRole("figure")).toBeInTheDocument();
    expect(screen.getByRole("table", { name: "Pedidos recientes de KURA" })).toBeInTheDocument();
    expect(
      screen.getAllByRole("navigation", { name: "Navegación principal" }).length,
    ).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: "Ver todos →" })).toBeInTheDocument();
  });

  it("cambia de idioma de interfaz y de datos", () => {
    renderErp();

    fireEvent.click(screen.getByRole("button", { name: "日本語" }));

    expect(screen.getByRole("heading", { level: 1, name: "ダッシュボード" })).toBeInTheDocument();
    expect(screen.getAllByText("本日の受注").length).toBeGreaterThan(0);
    expect(screen.getAllByText("最近の受注").length).toBeGreaterThan(0);
  });

  it("actualiza el título del documento con el idioma", () => {
    renderErp();
    expect(document.title).toBe("KURA · ERP de distribución");

    fireEvent.click(screen.getByRole("button", { name: "日本語" }));

    expect(document.title).toBe("KURA · 流通ERP");
  });

  it("navega a pedidos y aplica filtros en la URL", () => {
    renderErp();

    fireEvent.click(screen.getAllByRole("link", { name: /Pedidos/ })[0] as HTMLElement);

    expect(screen.getByRole("heading", { level: 1, name: "Pedidos" })).toBeInTheDocument();
    expect(screen.getByRole("table", { name: "Pedidos de KURA" })).toBeInTheDocument();
    expect(screen.getByRole("searchbox", { name: "Buscar pedidos" })).toBeInTheDocument();
  });

  it("muestra solo los pedidos del estado indicado en la URL", () => {
    renderErp("/orders?status=shipped");

    expect(screen.getAllByText(/pedidos$/).length).toBeGreaterThan(0);
    expect(screen.queryByText("Pendiente")).not.toBeInTheDocument();
    expect(screen.getAllByText("Enviado").length).toBeGreaterThan(0);
  });

  it("abre el detalle de un pedido y devuelve el foco al cerrar", async () => {
    renderErp("/orders");

    const trigger = screen.getAllByRole("button", {
      name: /Ver pedido KURA-/,
    })[0] as HTMLElement;

    fireEvent.click(trigger);

    expect(await screen.findByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Pedido KURA-/ })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Historial" })).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape" });

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
    expect(document.activeElement).toBe(trigger);
  });

  it("selecciona pedidos y aplica una acción masiva", async () => {
    renderErp("/orders");

    const checkboxes = screen.getAllByRole("checkbox");

    fireEvent.click(checkboxes[1] as HTMLElement);

    expect(screen.getByRole("group", { name: "Acciones" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Marcar enviado" }));

    expect(await screen.findByText(/marcados como Enviado/)).toBeInTheDocument();
  });

  it("valida el formulario de nuevo pedido y muestra el resumen de errores", () => {
    renderErp("/orders/new");

    expect(screen.getByRole("heading", { level: 1, name: "Nuevo pedido" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Registrar pedido" }));

    expect(screen.getAllByRole("alert").length).toBeGreaterThan(0);
    expect(screen.getByText("Revisa el formulario")).toBeInTheDocument();
    expect(screen.getAllByText("Selecciona un cliente.").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Escribe un correo válido.").length).toBeGreaterThan(0);
  });
});
