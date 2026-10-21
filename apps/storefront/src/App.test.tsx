import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { App } from "./App";

function resetUrl() {
  window.history.replaceState(null, "", "/");
}

describe("storefront HIKARI", () => {
  beforeEach(resetUrl);

  it("renders the product page in Japanese by default", () => {
    render(<App />);

    expect(screen.getByRole("heading", { level: 1, name: "HIKARI K-1" })).toBeInTheDocument();
    expect(screen.getAllByText("在庫あり").length).toBeGreaterThan(0);
    expect(screen.getByRole("button", { name: "カートに入れる" })).toBeInTheDocument();
    expect(screen.getAllByRole("table", { name: /HIKARI K-1の仕様/ }).length).toBeGreaterThan(0);
    expect(screen.getByRole("heading", { level: 2, name: "レビュー" })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "フッターナビゲーション" })).toBeInTheDocument();
    expect(document.documentElement.lang).toBe("ja");
    expect(window.location.search).toBe("?lang=ja");
  });

  it("switches to Spanish from the URL and from the selector", () => {
    window.history.replaceState(null, "", "/?lang=es");
    render(<App />);

    expect(screen.getByText("Una cámara silenciosa para la vida diaria.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Añadir al carrito" })).toBeInTheDocument();
    expect(
      screen.getAllByRole("table", { name: /Especificaciones de la HIKARI K-1/ }).length,
    ).toBeGreaterThan(0);

    fireEvent.click(screen.getByRole("button", { name: "EN" }));

    expect(screen.getByText("A quiet camera for everyday life.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add to cart" })).toBeInTheDocument();
    expect(window.location.search).toBe("?lang=en");
  });

  it("adds to the cart and announces the result", async () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "カートに入れる" }));

    expect(await screen.findByText("カートに追加しました")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /カート 1/ })).toBeInTheDocument();
  });

  it("shows the quantity limit when it reaches five", () => {
    render(<App />);

    const increment = screen.getByRole("button", { name: "数量を増やす" });

    for (let index = 0; index < 4; index += 1) {
      fireEvent.click(increment);
    }

    expect(screen.getByText("1回のご注文は5点までです。")).toBeInTheDocument();
  });

  it("keeps price, tax and points visible", () => {
    render(<App />);

    expect(screen.getAllByText(/58[,.]300/).length).toBeGreaterThan(0);
    expect(screen.getAllByText("税込").length).toBeGreaterThan(0);
    expect(screen.getAllByText(/583ポイント/).length).toBeGreaterThan(0);
  });
});
