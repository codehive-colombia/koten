import "@testing-library/jest-dom/vitest";
import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";
import { App } from "./App";

describe("accesibilidad del storefront", () => {
  it("no tiene violaciones serious/critical", async () => {
    window.history.replaceState(null, "", "/?lang=ja");
    const { container } = render(<App />);

    const results = await axe.run(container, {
      rules: {
        "color-contrast": { enabled: false },
      },
    });

    const serious = results.violations.filter(
      (violation) => violation.impact === "serious" || violation.impact === "critical",
    );

    expect(
      serious.map((violation) => ({
        id: violation.id,
        help: violation.help,
        nodes: violation.nodes.length,
      })),
    ).toEqual([]);
  });
});
