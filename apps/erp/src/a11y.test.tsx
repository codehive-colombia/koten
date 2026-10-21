import "@testing-library/jest-dom/vitest";
import { render } from "@testing-library/react";
import axe from "axe-core";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import { ErpApp } from "./App";

const routes = [
  ["dashboard", "/"],
  ["pedidos", "/orders"],
  ["nuevo pedido", "/orders/new"],
] as const;

describe("ERP accessibility", () => {
  for (const [name, path] of routes) {
    it(`${name} has no serious/critical violations`, async () => {
      window.history.replaceState(null, "", "/");
      const { container } = render(
        <MemoryRouter initialEntries={[path]}>
          <ErpApp />
        </MemoryRouter>,
      );

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
  }
});
