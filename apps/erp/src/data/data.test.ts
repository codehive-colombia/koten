import { describe, expect, it } from "vitest";
import {
  customers,
  dailySeries,
  erpCopy,
  kpis,
  lowStockProducts,
  orderDay,
  orders,
  products,
  tasks,
} from "./index";
import type { Localized } from "./types";

const locales = ["es", "ja", "en"] as const;

function expectLocalized(value: Localized) {
  for (const locale of locales) {
    expect(value[locale].trim().length).toBeGreaterThan(0);
  }
}

describe("datos KURA", () => {
  it("genera más de 100 pedidos deterministas con identificadores únicos", () => {
    expect(orders.length).toBeGreaterThanOrEqual(100);
    expect(new Set(orders.map((order) => order.id)).size).toBe(orders.length);
    expect(customers.length).toBeGreaterThanOrEqual(10);
    expect(products.length).toBeGreaterThanOrEqual(12);

    const isSorted = orders.every((order, index) => {
      const next = orders[index + 1];

      return next ? order.createdAt >= next.createdAt : true;
    });

    expect(isSorted).toBe(true);
  });

  it("localiza clientes, productos y eventos", () => {
    for (const customer of customers) {
      expectLocalized(customer.company);
      expectLocalized(customer.city);
    }

    for (const product of products) {
      expectLocalized(product.name);
      expectLocalized(product.category);
    }

    for (const order of orders.slice(0, 20)) {
      expect(order.lines.length).toBeGreaterThan(0);
      expect(order.itemCount).toBe(order.lines.reduce((sum, line) => sum + line.quantity, 0));

      for (const event of order.events) {
        expectLocalized(event.title);
      }
    }
  });

  it("calcula totales a partir de las líneas", () => {
    for (const order of orders.slice(0, 30)) {
      const subtotal = order.lines.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0);
      const expected = subtotal + (subtotal >= 50_000 ? 0 : 800);

      expect(order.total).toBe(expected);
    }
  });

  it("pluraliza las etiquetas de cantidad por idioma", () => {
    expect(erpCopy.es.orders.detail.itemCount(1)).toBe("1 artículo");
    expect(erpCopy.es.orders.detail.itemCount(3)).toBe("3 artículos");
    expect(erpCopy.en.orders.detail.itemCount(1)).toBe("1 item");
    expect(erpCopy.en.orders.detail.itemCount(3)).toBe("3 items");
    expect(erpCopy.ja.orders.detail.itemCount(1)).toBe("1点");
  });

  it("deriva KPIs, series y stock bajo", () => {
    expect(kpis.ordersToday).toBeGreaterThan(0);
    expect(kpis.openOrders).toBeGreaterThan(0);
    expect(kpis.revenue7d).toBeGreaterThan(0);
    expect(lowStockProducts.length).toBe(kpis.lowStock);
    expect(dailySeries).toHaveLength(14);
    expect(dailySeries.at(-1)?.date).toBe("2026-10-21");
    expect(tasks.length).toBeGreaterThanOrEqual(4);

    for (const point of dailySeries) {
      expect(point.count).toBeGreaterThanOrEqual(0);
      expect(point.revenue).toBeGreaterThanOrEqual(0);
    }

    expect(orders.every((order) => orderDay(order).length === 10)).toBe(true);
  });

  it("incluye todos los estados y canales en el conjunto", () => {
    const statuses = new Set(orders.map((order) => order.status));
    const channels = new Set(orders.map((order) => order.channel));
    const warehouses = new Set(orders.map((order) => order.warehouse));

    expect(statuses).toEqual(new Set(["pending", "preparing", "shipped", "cancelled", "returned"]));
    expect(channels).toEqual(new Set(["web", "store", "phone"]));
    expect(warehouses).toEqual(new Set(["tokyo", "osaka", "fukuoka"]));
  });
});
