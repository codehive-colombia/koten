import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { KotenProvider } from "../../i18n/provider";
import { type CommandItem, CommandPalette } from "./command-palette";

const items: readonly CommandItem[] = [
  { id: "dashboard", label: "Dashboard", group: "Ir a", keywords: "inicio home" },
  { id: "orders", label: "Pedidos", description: "132 pedidos", group: "Ir a" },
  { id: "song", label: "Canción de campaña", group: "Acciones" },
];

function renderPalette(overrides: Partial<Parameters<typeof CommandPalette>[0]> = {}) {
  const onSelect = vi.fn();
  const onOpenChange = vi.fn();
  const view = render(
    <KotenProvider locale="es">
      <CommandPalette
        open
        onOpenChange={onOpenChange}
        label="Comandos"
        placeholder="Buscar…"
        emptyLabel="Sin resultados"
        items={items}
        onSelect={onSelect}
        hint="↑↓ navegar · ↵ abrir"
        {...overrides}
      />
    </KotenProvider>,
  );

  return { ...view, onSelect, onOpenChange };
}

describe("CommandPalette", () => {
  it("enfoca el campo y lista todos los comandos", async () => {
    renderPalette();

    const input = await screen.findByRole("combobox", { name: "Comandos" });

    await waitFor(() => expect(input).toHaveFocus());
    expect(screen.getAllByRole("option")).toHaveLength(3);
    expect(input).toHaveAttribute("aria-expanded", "true");
  });

  it("filtra por label, descripción y palabras clave sin acentos", async () => {
    renderPalette();

    const input = await screen.findByRole("combobox", { name: "Comandos" });
    fireEvent.change(input, { target: { value: "cancion" } });

    expect(screen.getByRole("option", { name: /Canción de campaña/ })).toBeInTheDocument();
    expect(screen.queryByRole("option", { name: /Pedidos/ })).not.toBeInTheDocument();

    fireEvent.change(input, { target: { value: "home" } });
    expect(screen.getByRole("option", { name: /Dashboard/ })).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "132" } });
    expect(screen.getByRole("option", { name: /Pedidos/ })).toBeInTheDocument();
  });

  it("navega con flechas y selecciona con Enter", async () => {
    const { onSelect, onOpenChange } = renderPalette();

    const input = await screen.findByRole("combobox", { name: "Comandos" });

    expect(input.getAttribute("aria-activedescendant")).toContain("dashboard");

    fireEvent.keyDown(input, { key: "ArrowDown" });
    expect(input.getAttribute("aria-activedescendant")).toContain("orders");

    fireEvent.keyUp(input, { key: "ArrowUp" });
    fireEvent.keyDown(input, { key: "ArrowUp" });
    expect(input.getAttribute("aria-activedescendant")).toContain("dashboard");

    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ id: "orders" }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("muestra el vacío y desactiva la selección sin resultados", async () => {
    renderPalette();

    const input = await screen.findByRole("combobox", { name: "Comandos" });
    fireEvent.change(input, { target: { value: "zzzz" } });

    expect(screen.getByText("Sin resultados")).toBeInTheDocument();
    expect(screen.queryAllByRole("option")).toHaveLength(0);

    fireEvent.keyDown(input, { key: "Enter" });

    expect(screen.getByText("Sin resultados")).toBeInTheDocument();
  });

  it("cierra con Escape y al hacer clic en una opción", async () => {
    const { onSelect, onOpenChange } = renderPalette();

    const input = await screen.findByRole("combobox", { name: "Comandos" });
    fireEvent.keyDown(input, { key: "Escape" });

    await waitFor(() => expect(onOpenChange.mock.calls[0]?.[0]).toBe(false));

    fireEvent.click(screen.getByRole("option", { name: /Canción de campaña/ }));

    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ id: "song" }));
    expect(onOpenChange).toHaveBeenCalled();
  });
});
