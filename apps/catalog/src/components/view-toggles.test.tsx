import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DensityToggle, LocaleToggle, ThemeToggle } from "./view-toggles";

const densityLabels = {
  compact: "Compacta",
  default: "Default",
  comfortable: "Amplia",
};

describe("ThemeToggle", () => {
  it("exposes a named group and marks the active theme", () => {
    render(<ThemeToggle value="kanso" label="Tema" onChange={() => undefined} />);

    expect(screen.getByRole("group", { name: "Tema" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Kanso" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "Chirashi" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });

  it("reports the selected theme", () => {
    const onChange = vi.fn();
    render(<ThemeToggle value="kanso" label="Tema" onChange={onChange} />);

    fireEvent.click(screen.getByRole("button", { name: "Chirashi" }));

    expect(onChange).toHaveBeenCalledWith("chirashi");
  });
});

describe("DensityToggle", () => {
  it("reports the selected density", () => {
    const onChange = vi.fn();
    render(
      <DensityToggle
        value="default"
        label="Densidad"
        optionLabels={densityLabels}
        onChange={onChange}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Compacta" }));

    expect(onChange).toHaveBeenCalledWith("compact");
  });
});

describe("LocaleToggle", () => {
  it("reports the selected locale", () => {
    const onChange = vi.fn();
    render(<LocaleToggle value="es" label="Idioma" onChange={onChange} />);

    expect(screen.getByRole("group", { name: "Idioma" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "日本語" }));

    expect(onChange).toHaveBeenCalledWith("ja");
  });
});
