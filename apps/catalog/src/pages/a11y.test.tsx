import "@testing-library/jest-dom/vitest";
import { KotenProvider } from "@koten/ui";
import { render } from "@testing-library/react";
import axe from "axe-core";
import type { ReactElement } from "react";
import { createElement } from "react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import { BlockDocPage, PrimitiveDocPage } from "../components/doc-page";
import { allBlockDoc, allPrimitiveBySlug } from "../data/docs/all";
import { BlocksIndexPage } from "./blocks/index";
import { ComponentsIndexPage } from "./components/index";
import { TokensIndexPage } from "./tokens/index";

function primitive(slug: string) {
  const doc = allPrimitiveBySlug.get(slug);

  if (!doc) {
    throw new Error(`Missing primitive doc: ${slug}`);
  }

  return doc;
}

function block(slug: string) {
  const doc = allBlockDoc("storefront", slug) ?? allBlockDoc("erp", slug);

  if (!doc) {
    throw new Error(`Missing block doc: ${slug}`);
  }

  return doc;
}

const pages: readonly [string, ReactElement][] = [
  ["Button", createElement(PrimitiveDocPage, { key: "button", doc: primitive("button") })],
  ["Field", createElement(PrimitiveDocPage, { key: "field", doc: primitive("field") })],
  ["Select", createElement(PrimitiveDocPage, { key: "select", doc: primitive("select") })],
  ["Toast", createElement(PrimitiveDocPage, { key: "toast", doc: primitive("toast") })],
  ["Dialog", createElement(PrimitiveDocPage, { key: "dialog", doc: primitive("dialog") })],
  [
    "DataTable",
    createElement(PrimitiveDocPage, { key: "data-table", doc: primitive("data-table") }),
  ],
  [
    "DatePicker",
    createElement(PrimitiveDocPage, { key: "date-picker", doc: primitive("date-picker") }),
  ],
  ["ProductCard", createElement(BlockDocPage, { key: "product-card", doc: block("product-card") })],
  [
    "DetailDrawer",
    createElement(BlockDocPage, { key: "detail-drawer", doc: block("detail-drawer") }),
  ],
  ["Componentes", createElement(ComponentsIndexPage, { key: "components" })],
  ["Bloques", createElement(BlocksIndexPage, { key: "blocks" })],
  ["Fundamentos", createElement(TokensIndexPage, { key: "tokens" })],
];

describe("component page accessibility", () => {
  for (const [name, page] of pages) {
    it(`${name} has no serious/critical violations`, async () => {
      const { container } = render(
        <KotenProvider locale="es">
          <MemoryRouter>{page}</MemoryRouter>
        </KotenProvider>,
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
