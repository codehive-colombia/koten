import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Checkbox } from "./checkbox";
import { Combobox } from "./combobox";
import { NumberField } from "./number-field";
import { RadioGroup } from "./radio-group";
import { Select } from "./select";
import { Switch } from "./switch";

describe("Select", () => {
  it("selects an option and exposes its label", async () => {
    render(
      <Select
        label="Almacén"
        placeholder="Elegir almacén"
        items={[
          { value: "tokyo", label: "Tokio" },
          { value: "osaka", label: "Osaka" },
        ]}
      />,
    );

    const trigger = screen.getByRole("combobox", { name: "Almacén" });
    fireEvent.click(trigger);

    const option = await screen.findByRole("option", { name: "Osaka" });
    fireEvent.pointerDown(option, { button: 0, pointerType: "mouse" });
    fireEvent.pointerUp(option, { button: 0, pointerType: "mouse" });
    fireEvent.click(option);

    expect(trigger).toHaveTextContent("Osaka");
  });

  it("opens without locking the page scroll", async () => {
    render(
      <Select
        label="Almacén"
        items={[
          { value: "tokyo", label: "Tokio" },
          { value: "osaka", label: "Osaka" },
        ]}
      />,
    );

    fireEvent.click(screen.getByRole("combobox", { name: "Almacén" }));

    expect(await screen.findByRole("option", { name: "Osaka" })).toBeInTheDocument();
    expect(document.body.style.overflow).not.toBe("hidden");
    expect(document.documentElement.style.overflow).not.toBe("hidden");
  });
});

describe("Combobox", () => {
  it("filters items and picks one", async () => {
    render(
      <Combobox
        label="Cliente"
        items={["KURA Distribución", "HIKARI Store"]}
        emptyLabel="Sin resultados"
        triggerLabel="Abrir opciones"
      />,
    );

    const input = screen.getByRole("combobox", { name: "Cliente" });
    fireEvent.click(screen.getByRole("button", { name: "Abrir opciones" }));
    fireEvent.change(input, { target: { value: "KURA" } });

    fireEvent.click(await screen.findByRole("option", { name: /KURA/ }));

    expect(input).toHaveValue("KURA Distribución");
  });
});

describe("Checkbox", () => {
  it("toggles checked state and exposes its label", () => {
    render(<Checkbox label="Recibir avisos" description="Solo pedidos importantes." />);

    const checkbox = screen.getByRole("checkbox", { name: "Recibir avisos" });

    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it("renders an indeterminate state", () => {
    render(<Checkbox label="Selección parcial" indeterminate />);

    expect(screen.getByRole("checkbox", { name: "Selección parcial" })).toBePartiallyChecked();
  });
});

describe("RadioGroup", () => {
  it("selects one option", () => {
    render(
      <RadioGroup
        label="Envío"
        defaultValue="standard"
        options={[
          { value: "standard", label: "Estándar" },
          { value: "express", label: "Express" },
        ]}
      />,
    );

    expect(screen.getByRole("radio", { name: "Estándar" })).toBeChecked();

    fireEvent.click(screen.getByRole("radio", { name: "Express" }));

    expect(screen.getByRole("radio", { name: "Express" })).toBeChecked();
  });
});

describe("Switch", () => {
  it("toggles its checked state", () => {
    render(<Switch label="Notificaciones" description="Avisos de stock." />);

    const control = screen.getByRole("switch", { name: "Notificaciones" });

    expect(control).not.toBeChecked();
    fireEvent.click(control);
    expect(control).toBeChecked();
  });
});

describe("NumberField", () => {
  it("increments and decrements with labeled buttons", () => {
    render(
      <NumberField
        label="Cantidad"
        defaultValue={1}
        decrementLabel="Restar"
        incrementLabel="Sumar"
      />,
    );

    const input = screen.getByRole("textbox", { name: "Cantidad" });

    fireEvent.click(screen.getByRole("button", { name: "Sumar" }));
    expect(input).toHaveValue("2");

    fireEvent.click(screen.getByRole("button", { name: "Restar" }));
    expect(input).toHaveValue("1");
  });
});
