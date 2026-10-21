import { baseDate, orders } from "./orders";
import { products } from "./products";
import type { Localized, Order } from "./types";

const DAY = 86_400_000;
const baseTimestamp = Date.UTC(2026, 9, 21, 0, 0, 0);

export function orderDay(order: Order): string {
  return order.createdAt.slice(0, 10);
}

export const openStatuses = ["pending", "preparing"] as const;

export const todayOrders = orders.filter((order) => orderDay(order) === baseDate);
export const openOrders = orders.filter(
  (order) => order.status === "pending" || order.status === "preparing",
);
export const lowStockProducts = products.filter((product) => product.stock <= product.minStock);

function ordersBetween(startDay: string, endDay: string): readonly Order[] {
  return orders.filter((order) => {
    const day = orderDay(order);
    return day >= startDay && day <= endDay;
  });
}

const previousDay = new Date(baseTimestamp - DAY).toISOString().slice(0, 10);
const weekStart = new Date(baseTimestamp - 6 * DAY).toISOString().slice(0, 10);
const previousWeekStart = new Date(baseTimestamp - 13 * DAY).toISOString().slice(0, 10);
const previousWeekEnd = new Date(baseTimestamp - 7 * DAY).toISOString().slice(0, 10);

const yesterdayOrders = ordersBetween(previousDay, previousDay);
const weekOrders = ordersBetween(weekStart, baseDate).filter(
  (order) => order.status !== "cancelled",
);
const previousWeekOrders = ordersBetween(previousWeekStart, previousWeekEnd).filter(
  (order) => order.status !== "cancelled",
);

export const revenue7d = weekOrders.reduce((sum, order) => sum + order.total, 0);
const previousRevenue7d = previousWeekOrders.reduce((sum, order) => sum + order.total, 0);

export const kpis = {
  ordersToday: todayOrders.length,
  ordersYesterday: yesterdayOrders.length,
  openOrders: openOrders.length,
  revenue7d,
  previousRevenue7d,
  lowStock: lowStockProducts.length,
};

export type DailyPoint = {
  date: string;
  count: number;
  revenue: number;
};

export const dailySeries: readonly DailyPoint[] = Array.from({ length: 14 }, (_, index) => {
  const timestamp = baseTimestamp - (13 - index) * DAY;
  const date = new Date(timestamp).toISOString().slice(0, 10);
  const dayOrders = orders.filter((order) => orderDay(order) === date);

  return {
    date,
    count: dayOrders.length,
    revenue: dayOrders.reduce((sum, order) => sum + order.total, 0),
  };
});

export const recentOrders = orders.slice(0, 8);
export const todaySeries = dailySeries.slice(7).map((point) => point.count);
export const revenueSeries = dailySeries.slice(7).map((point) => point.revenue);
export const lowStockSeries = dailySeries.slice(7).map((_, index) => 2 + (index % 3));

export type ErpTask = {
  id: string;
  tone: "warning" | "info" | "danger";
  title: Localized;
  detail: Localized;
  href: string;
};

export const tasks: readonly ErpTask[] = [
  {
    id: "task-payments",
    tone: "warning",
    title: { ja: "未確認の入金 3件", es: "3 pagos sin confirmar", en: "3 unconfirmed payments" },
    detail: {
      ja: "本日中に確認が必要です",
      es: "Requieren revisión hoy",
      en: "Need review today",
    },
    href: "/orders?status=pending",
  },
  {
    id: "task-stock",
    tone: "danger",
    title: { ja: "在庫アラート 4件", es: "4 alertas de stock", en: "4 stock alerts" },
    detail: {
      ja: "K-1 シルバー、カメラバッグほか",
      es: "K-1 plata, bolsa de cámara y más",
      en: "K-1 silver, camera bag and more",
    },
    href: "/orders?status=preparing",
  },
  {
    id: "task-shipping",
    tone: "info",
    title: { ja: "本日の出荷 8件", es: "8 envíos para hoy", en: "8 shipments today" },
    detail: {
      ja: "14:00までに集荷を依頼",
      es: "Solicitar recogida antes de las 14:00",
      en: "Book pickup before 14:00",
    },
    href: "/orders?status=preparing",
  },
  {
    id: "task-returns",
    tone: "info",
    title: { ja: "返品対応 2件", es: "2 devoluciones en curso", en: "2 returns in progress" },
    detail: {
      ja: "返品商品の検品待ち",
      es: "Pendientes de inspección",
      en: "Awaiting inspection",
    },
    href: "/orders?status=returned",
  },
];
