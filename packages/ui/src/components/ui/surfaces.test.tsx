import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Hanko } from "./hanko";
import { Pattern } from "./pattern";
import { Rule } from "./rule";
import { SectionHeader } from "./section-header";
import { Tategaki } from "./tategaki";

describe("SectionHeader", () => {
  it("renders a heading, meta and actions", () => {
    render(
      <SectionHeader
        as="h3"
        title="Pedidos"
        jp="注文"
        meta="Últimos 7 días"
        actions={<button type="button">Filtrar</button>}
      />,
    );

    expect(screen.getByRole("heading", { level: 3, name: /Pedidos/ })).toBeInTheDocument();
    expect(screen.getByText("Últimos 7 días")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Filtrar" })).toBeInTheDocument();
  });
});

describe("Rule", () => {
  it("renders a separator", () => {
    render(<Rule variant="strong" />);

    expect(screen.getByRole("separator")).toHaveAttribute("data-slot", "rule");
  });

  it("renders a label between lines", () => {
    render(<Rule label="商品情報" />);

    expect(screen.getByText("商品情報")).toBeInTheDocument();
  });
});

describe("Hanko", () => {
  it("is decorative by default and limits the seal to four characters", () => {
    const { container } = render(<Hanko>古典紋章五</Hanko>);

    const hanko = container.querySelector('[data-slot="hanko"]');

    expect(hanko).toHaveAttribute("aria-hidden", "true");
    expect(hanko).toHaveTextContent("古典紋章");
    expect(hanko).not.toHaveTextContent("五");
  });

  it("can expose an accessible label", () => {
    render(<Hanko label="Sello Koten">典</Hanko>);

    expect(screen.getByRole("img", { name: "Sello Koten" })).toBeInTheDocument();
  });
});

describe("Tategaki", () => {
  it("is decorative and hidden from assistive technology by default", () => {
    const { container } = render(<Tategaki>縦書き</Tategaki>);

    const element = container.querySelector('[data-slot="tategaki"]');

    expect(element).toHaveClass("tategaki");
    expect(element).toHaveAttribute("aria-hidden", "true");
  });

  it("can be made readable", () => {
    render(<Tategaki decorative={false}>縦書き</Tategaki>);

    expect(screen.getByText("縦書き")).not.toHaveAttribute("aria-hidden");
  });
});

describe("Pattern", () => {
  it("renders decorative seigaiha and asanoha variants", () => {
    const { container, rerender } = render(<Pattern variant="seigaiha" />);

    expect(container.querySelector('[data-slot="pattern"]')).toHaveAttribute(
      "data-variant",
      "seigaiha",
    );
    expect(container.querySelector('[data-slot="pattern"]')).toHaveAttribute("aria-hidden", "true");

    rerender(<Pattern variant="asanoha" />);
    expect(container.querySelector('[data-slot="pattern"]')).toHaveAttribute(
      "data-variant",
      "asanoha",
    );
  });
});
