import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { beforeEach, describe, expect, it } from "vitest";
import { App } from "./App";

beforeEach(() => {
  window.history.replaceState(null, "", "/");
  document.documentElement.lang = "es";
});

describe("App", () => {
  it("navigates to a component page and marks the active link", async () => {
    render(
      <MemoryRouter initialEntries={["/components/button"]}>
        <App />
      </MemoryRouter>,
    );

    expect(await screen.findByRole("heading", { level: 1, name: /Button/ })).toBeInTheDocument();
    expect(
      screen
        .getAllByRole("link", { name: "Button" })
        .some((link) => link.getAttribute("aria-current") === "page"),
    ).toBe(true);
    expect(screen.getByText("Props y código")).toBeInTheDocument();
  });

  it("switches the UI language and the document lang", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole("button", { name: "日本語" }));

    expect(screen.getAllByText("基礎").length).toBeGreaterThan(0);
    expect(new URL(window.location.href).searchParams.get("lang")).toBe("ja");
  });
});
