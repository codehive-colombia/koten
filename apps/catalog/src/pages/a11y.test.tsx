import "@testing-library/jest-dom/vitest";
import { KotenProvider } from "@koten/ui";
import { render } from "@testing-library/react";
import axe from "axe-core";
import type { ComponentType } from "react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import { BadgePage } from "./components/badge";
import { ButtonPage } from "./components/button";
import { ControlsPage } from "./components/controls";
import { DataPage } from "./components/data";
import { FeedbackPage } from "./components/feedback";
import { FormsPage } from "./components/forms";
import { InputsPage } from "./components/inputs";
import { NavigationPage } from "./components/navigation";
import { OverlaysPage } from "./components/overlays";
import { PanelPage } from "./components/panel";
import { SurfacesPage } from "./components/surfaces";

const pages: readonly [string, ComponentType][] = [
  ["Button", ButtonPage],
  ["Panel", PanelPage],
  ["Badge", BadgePage],
  ["Formularios", FormsPage],
  ["Inputs", InputsPage],
  ["Superficies", SurfacesPage],
  ["Feedback", FeedbackPage],
  ["Navegación", NavigationPage],
  ["Overlays", OverlaysPage],
  ["Datos", DataPage],
  ["Controles", ControlsPage],
];

describe("accesibilidad de las páginas de componentes", () => {
  for (const [name, Page] of pages) {
    it(`${name} no tiene violaciones serious/critical`, async () => {
      const { container } = render(
        <KotenProvider locale="es">
          <MemoryRouter>
            <Page />
          </MemoryRouter>
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
