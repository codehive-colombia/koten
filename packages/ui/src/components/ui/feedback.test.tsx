import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Alert } from "./alert";
import { EmptyState } from "./empty-state";
import { Meter } from "./meter";
import { Progress } from "./progress";
import { Skeleton } from "./skeleton";
import { ToastProvider, useToast } from "./toast";

function ToastTrigger() {
  const toast = useToast();

  return (
    <button
      type="button"
      onClick={() =>
        toast.add({
          title: "Pedido actualizado",
          description: "El pedido KURA-0142 pasó a preparando.",
          type: "success",
        })
      }
    >
      Crear toast
    </button>
  );
}

describe("Alert", () => {
  it("uses status for info and alert for danger", () => {
    const { rerender } = render(
      <Alert tone="info" title="Aviso">
        El pedido está listo.
      </Alert>,
    );

    expect(screen.getByRole("status")).toHaveTextContent("Aviso");

    rerender(
      <Alert tone="danger" title="Error">
        No se pudo guardar.
      </Alert>,
    );

    expect(screen.getByRole("alert")).toHaveTextContent("Error");
  });
});

describe("Progress and Meter", () => {
  it("exposes progress values", () => {
    render(<Progress label="Exportación" value={40} />);

    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "40");
    expect(screen.getByText("40%")).toBeInTheDocument();
  });

  it("exposes meter values", () => {
    render(<Meter label="Stock" value={18} max={60} tone="warning" />);

    expect(screen.getByRole("meter")).toHaveAttribute("aria-valuenow", "18");
  });
});

describe("Skeleton", () => {
  it("is hidden from assistive technology", () => {
    const { container } = render(<Skeleton className="h-4 w-32" />);

    expect(container.querySelector('[data-slot="skeleton"]')).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });
});

describe("EmptyState", () => {
  it("renders a title, description and action", () => {
    render(
      <EmptyState
        title="Sin pedidos"
        description="No hay pedidos para este filtro."
        action={<button type="button">Limpiar</button>}
      />,
    );

    expect(screen.getByRole("heading", { name: "Sin pedidos" })).toBeInTheDocument();
    expect(screen.getByText("No hay pedidos para este filtro.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Limpiar" })).toBeInTheDocument();
  });
});

describe("Toast", () => {
  it("creates a toast with title and description", async () => {
    render(
      <ToastProvider closeLabel="Cerrar" regionLabel="Notificaciones">
        <ToastTrigger />
      </ToastProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Crear toast" }));

    const dialog = await screen.findByRole("dialog", { name: "Pedido actualizado" });
    fireEvent.focus(dialog);

    expect(screen.getByText("El pedido KURA-0142 pasó a preparando.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cerrar" })).toBeInTheDocument();
  });
});
