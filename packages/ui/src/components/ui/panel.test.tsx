import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Panel, PanelActions, PanelBody, PanelFooter, PanelHeader, PanelTitle } from "./panel";

describe("Panel", () => {
  it("renders header, body and footer slots", () => {
    const { container } = render(
      <Panel tone="accent">
        <PanelHeader>
          <PanelTitle as="h3">Pedidos</PanelTitle>
          <PanelActions>
            <button type="button">Nuevo</button>
          </PanelActions>
        </PanelHeader>
        <PanelBody flush>
          <p>Contenido</p>
        </PanelBody>
        <PanelFooter>
          <button type="button">Ver todo</button>
        </PanelFooter>
      </Panel>,
    );

    expect(screen.getByRole("heading", { level: 3, name: "Pedidos" })).toBeInTheDocument();
    expect(container.querySelector('[data-slot="panel"]')).toHaveAttribute("data-tone", "accent");
    expect(container.querySelector('[data-slot="panel-body"]')).toHaveAttribute("data-flush", "");
    expect(container.querySelector('[data-slot="panel-footer"]')).toBeInTheDocument();
  });

  it("keeps padding when the body is not flush", () => {
    const { container } = render(
      <Panel>
        <PanelBody>Contenido</PanelBody>
      </Panel>,
    );

    expect(container.querySelector('[data-slot="panel-body"]')).not.toHaveAttribute("data-flush");
  });
});
