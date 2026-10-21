import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./button";

describe("Button", () => {
  it("renders a native button and forwards clicks", () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Comprar</Button>);

    const button = screen.getByRole("button", { name: "Comprar" });

    expect(button).toHaveAttribute("data-slot", "button");
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("disables the button and announces loading", () => {
    render(<Button loading>Guardando</Button>);

    const button = screen.getByRole("button", { name: "Guardando" });

    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(button).toHaveAttribute("data-loading", "");
  });

  it("composes with an anchor through the render prop", () => {
    render(
      <Button render={<a href="/docs" />} nativeButton={false}>
        Documentación
      </Button>,
    );

    expect(screen.getByRole("button", { name: "Documentación" })).toHaveAttribute("href", "/docs");
  });
});
