import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./button";
import { Dialog } from "./dialog";
import { Drawer } from "./drawer";
import { Menu } from "./menu";
import { Popover } from "./popover";
import { Tooltip } from "./tooltip";

describe("Dialog", () => {
  it("opens a labeled dialog and closes it", async () => {
    render(
      <Dialog
        trigger={<Button>Abrir diálogo</Button>}
        title="Detalle del pedido"
        description="KURA-0142"
        closeLabel="Cerrar"
      >
        Contenido del pedido.
      </Dialog>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Abrir diálogo" }));

    const dialog = await screen.findByRole("dialog", { name: "Detalle del pedido" });
    expect(dialog).toBeInTheDocument();
    expect(screen.getByText("Contenido del pedido.")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Cerrar" }));
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });
});

describe("Drawer", () => {
  it("opens from the side with a title", async () => {
    render(
      <Drawer trigger={<Button>Abrir drawer</Button>} title="Filtros" closeLabel="Cerrar">
        Contenido de filtros.
      </Drawer>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Abrir drawer" }));

    expect(await screen.findByRole("dialog", { name: "Filtros" })).toBeInTheDocument();
  });
});

describe("Menu", () => {
  it("runs the selected action", async () => {
    const onSelect = vi.fn();
    render(
      <Menu
        trigger={<Button>Acciones</Button>}
        items={[
          { label: "Editar", onSelect },
          { label: "Duplicar", onSelect },
          { label: "Eliminar", onSelect, separatorBefore: true },
        ]}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Acciones" }));
    fireEvent.click(await screen.findByRole("menuitem", { name: "Editar" }));

    expect(onSelect).toHaveBeenCalledOnce();
  });
});

describe("Popover", () => {
  it("opens a labeled popover", async () => {
    render(
      <Popover trigger={<Button>Ver detalle</Button>} title="Detalle" closeLabel="Cerrar">
        Contenido del popover.
      </Popover>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Ver detalle" }));

    expect(await screen.findByText("Contenido del popover.")).toBeInTheDocument();
  });
});

describe("Tooltip", () => {
  it("shows its text on focus", async () => {
    render(
      <Tooltip trigger={<Button>Ayuda</Button>} delay={0}>
        Texto de ayuda
      </Tooltip>,
    );

    fireEvent.focus(screen.getByRole("button", { name: "Ayuda" }));

    await waitFor(() => {
      expect(screen.getByText("Texto de ayuda")).toBeInTheDocument();
    });
  });
});
