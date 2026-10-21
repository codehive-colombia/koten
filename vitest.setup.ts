import { configure } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

// Las rutas con code splitting resuelven su chunk en el primer render (F4-003).
configure({ asyncUtilTimeout: 3000 });

Object.defineProperty(window, "scrollTo", {
  value: () => undefined,
  writable: true,
});

Object.defineProperty(Element.prototype, "scrollIntoView", {
  value: () => undefined,
  writable: true,
});

Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
  value: () => null,
  writable: true,
});
