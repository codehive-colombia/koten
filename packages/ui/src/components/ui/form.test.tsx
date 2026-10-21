import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Field, FormRow } from "./field";
import { Input } from "./input";
import { Label } from "./label";
import { Textarea } from "./textarea";

describe("Field", () => {
  it("associates label, description and required state with the control", () => {
    render(
      <Field label="Correo" description="Usamos tu correo para avisos." required>
        <Input type="email" />
      </Field>,
    );

    const input = screen.getByRole("textbox", { name: "Correo" });

    expect(input).toBeRequired();
    expect(input).toHaveAccessibleDescription("Usamos tu correo para avisos.");
  });

  it("wires an external error to aria-invalid and aria-describedby", () => {
    render(
      <Field label="Correo" error="El correo no es válido.">
        <Input type="email" />
      </Field>,
    );

    const input = screen.getByLabelText("Correo");

    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription("El correo no es válido.");
    expect(screen.getByText("El correo no es válido.")).toBeInTheDocument();
  });

  it("propagates disabled state to the control", () => {
    render(
      <Field label="Correo" disabled>
        <Input />
      </Field>,
    );

    expect(screen.getByLabelText("Correo")).toBeDisabled();
  });
});

describe("Textarea", () => {
  it("renders a labeled textarea with description and required state", () => {
    render(
      <Field label="Mensaje" description="Máximo 500 caracteres." required>
        <Textarea rows={4} maxLength={500} />
      </Field>,
    );

    const textarea = screen.getByRole("textbox", { name: "Mensaje" });

    expect(textarea.tagName).toBe("TEXTAREA");
    expect(textarea).toHaveAttribute("rows", "4");
    expect(textarea).toBeRequired();
    expect(textarea).toHaveAccessibleDescription("Máximo 500 caracteres.");
  });

  it("forwards changes from the rendered textarea", () => {
    const onChange = vi.fn();
    render(
      <Field label="Mensaje">
        <Textarea onChange={onChange} />
      </Field>,
    );

    fireEvent.change(screen.getByRole("textbox", { name: "Mensaje" }), {
      target: { value: "Hola" },
    });

    expect(onChange).toHaveBeenCalledOnce();
  });
});

describe("FormRow", () => {
  it("uses the horizontal orientation", () => {
    const { container } = render(
      <FormRow label="Cliente">
        <Input />
      </FormRow>,
    );

    expect(container.querySelector('[data-slot="field"]')).toHaveAttribute(
      "data-orientation",
      "horizontal",
    );
  });
});

describe("Label", () => {
  it("can be used standalone with htmlFor", () => {
    render(
      <>
        <Label htmlFor="nombre">Nombre</Label>
        <Input id="nombre" />
      </>,
    );

    expect(screen.getByLabelText("Nombre")).toHaveAttribute("id", "nombre");
    expect(screen.getByText("Nombre").closest("label")).toHaveAttribute("for", "nombre");
  });
});
