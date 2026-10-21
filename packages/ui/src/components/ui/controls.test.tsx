import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { IconButton } from "./icon-button";
import { ToggleGroup } from "./toggle-group";
import { Toolbar, ToolbarButton, ToolbarGroup, ToolbarSeparator } from "./toolbar";

describe("IconButton", () => {
  it("requires a visible accessible label and forwards clicks", () => {
    const onClick = vi.fn();
    render(
      <IconButton label="Cerrar panel" onClick={onClick}>
        ×
      </IconButton>,
    );

    const button = screen.getByRole("button", { name: "Cerrar panel" });

    expect(button).toHaveAttribute("data-slot", "icon-button");
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledOnce();
  });
});

describe("ToggleGroup", () => {
  it("reports pressed values", () => {
    const onChange = vi.fn();
    render(
      <ToggleGroup
        label="Vista"
        defaultValue={["grid"]}
        onValueChange={onChange}
        items={[
          { value: "grid", label: "Cuadrícula" },
          { value: "list", label: "Lista" },
        ]}
      />,
    );

    expect(screen.getByRole("group", { name: "Vista" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cuadrícula" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );

    fireEvent.click(screen.getByRole("button", { name: "Lista" }));

    expect(onChange).toHaveBeenCalledWith(["list"]);
  });
});

describe("Toolbar", () => {
  it("exposes a labeled toolbar with groups and separators", () => {
    render(
      <Toolbar label="Acciones de pedido">
        <ToolbarGroup label="Vista">
          <ToolbarButton label="Cuadrícula">▦</ToolbarButton>
          <ToolbarButton label="Lista">☷</ToolbarButton>
        </ToolbarGroup>
        <ToolbarSeparator />
        <ToolbarButton label="Filtrar">F</ToolbarButton>
      </Toolbar>,
    );

    expect(screen.getByRole("toolbar", { name: "Acciones de pedido" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cuadrícula" })).toBeInTheDocument();
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });
});
