import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Badge } from "./badge";

describe("Badge", () => {
  it("renders tone, appearance and label", () => {
    render(
      <Badge tone="sale" appearance="solid">
        Rebaja
      </Badge>,
    );

    const badge = screen.getByText("Rebaja");

    expect(badge).toHaveAttribute("data-slot", "badge");
    expect(badge).toHaveAttribute("data-tone", "sale");
    expect(badge).toHaveAttribute("data-appearance", "solid");
  });

  it("adds a decorative status dot", () => {
    const { container } = render(
      <Badge tone="success" dot>
        En stock
      </Badge>,
    );

    expect(container.querySelector('[data-slot="badge-dot"]')).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });
});
