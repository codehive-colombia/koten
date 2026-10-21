import { customers } from "./customers";
import { products } from "./products";
import type {
  ChannelId,
  Localized,
  Order,
  OrderEvent,
  OrderLine,
  OrderStatus,
  PaymentId,
  TimelineTone,
  WarehouseId,
} from "./types";

const BASE_TIME = Date.UTC(2026, 9, 21, 12, 0, 0);
const DAY = 86_400_000;
const MINUTE = 60_000;

const statusPattern: readonly OrderStatus[] = [
  "shipped",
  "pending",
  "shipped",
  "shipped",
  "preparing",
  "shipped",
  "shipped",
  "cancelled",
  "shipped",
  "shipped",
  "returned",
  "shipped",
];

const channels: readonly ChannelId[] = ["web", "store", "phone"];
const warehouses: readonly WarehouseId[] = ["tokyo", "osaka", "fukuoka"];
const payments: readonly PaymentId[] = ["invoice", "card", "transfer"];

const eventCopy = {
  received: {
    title: { ja: "受注を受け付けました", es: "Pedido recibido", en: "Order received" },
    description: {
      ja: "注文システムから自動登録",
      es: "Registrado automáticamente por el sistema",
      en: "Registered automatically by the system",
    },
    tone: "neutral",
  },
  payment: {
    title: { ja: "入金を確認しました", es: "Pago confirmado", en: "Payment confirmed" },
    tone: "success",
  },
  picking: {
    title: { ja: "ピッキングを開始しました", es: "Preparación iniciada", en: "Picking started" },
    tone: "info",
  },
  packed: {
    title: { ja: "梱包が完了しました", es: "Pedido embalado", en: "Order packed" },
    tone: "info",
  },
  shipped: {
    title: { ja: "出荷しました", es: "Pedido enviado", en: "Order shipped" },
    tone: "success",
  },
  cancelled: {
    title: { ja: "受注をキャンセルしました", es: "Pedido cancelado", en: "Order cancelled" },
    description: {
      ja: "お客様からの依頼によりキャンセル",
      es: "Cancelado a petición del cliente",
      en: "Cancelled at the customer's request",
    },
    tone: "danger",
  },
  delivered: {
    title: { ja: "配達が完了しました", es: "Entrega completada", en: "Delivery completed" },
    tone: "success",
  },
  returnRequested: {
    title: { ja: "返品を受け付けました", es: "Devolución solicitada", en: "Return requested" },
    tone: "warning",
  },
  returned: {
    title: { ja: "返品が完了しました", es: "Devolución completada", en: "Return completed" },
    tone: "neutral",
  },
} satisfies Record<string, { title: Localized; description?: Localized; tone: TimelineTone }>;

const deliveryNotes: readonly Localized[] = [
  {
    ja: "午前中の配達を希望",
    es: "Solicita entrega por la mañana",
    en: "Requests morning delivery",
  },
  {
    ja: "納品書は箱の外に添付",
    es: "Adjuntar albarán fuera de la caja",
    en: "Attach delivery note outside the box",
  },
  {
    ja: "搬入は裏口から",
    es: "Descargar por la puerta trasera",
    en: "Unload through the back entrance",
  },
];

function at<T>(items: readonly T[], index: number): T {
  const item = items[index];

  if (!item) {
    throw new Error("Índice fuera de rango en los datos KURA");
  }

  return item;
}

function iso(timestamp: number): string {
  return new Date(timestamp).toISOString();
}

function event(
  id: string,
  atTimestamp: number,
  copy: { title: Localized; description?: Localized; tone: TimelineTone },
  description?: Localized,
): OrderEvent {
  const resolved = description ?? copy.description;

  return {
    id,
    at: iso(atTimestamp),
    title: copy.title,
    description: resolved,
    tone: copy.tone,
  };
}

function createOrder(index: number): Order {
  const status = at(statusPattern, index % statusPattern.length);
  const customer = at(customers, index % customers.length);
  const createdAtMs =
    index < 12
      ? BASE_TIME - index * 40 * MINUTE
      : BASE_TIME - 18 * 3_600_000 - (index - 12) * 6.2 * 3_600_000;
  const dueDateMs = createdAtMs + (2 + (index % 3)) * DAY;
  const lineCount = 1 + (index % 3);
  const lines: OrderLine[] = [];

  for (let lineIndex = 0; lineIndex < lineCount; lineIndex += 1) {
    const product = at(products, (index * 5 + lineIndex * 3 + 2) % products.length);
    const quantity = 1 + ((index + lineIndex) % 4);

    lines.push({
      productId: product.id,
      sku: product.sku,
      name: product.name,
      unitPrice: product.price,
      quantity,
    });
  }

  const subtotal = lines.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0);
  const total = subtotal + (subtotal >= 50_000 ? 0 : 800);
  const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0);
  const events: OrderEvent[] = [event(`received-${index}`, createdAtMs, eventCopy.received)];

  if (status !== "pending") {
    events.push(event(`payment-${index}`, createdAtMs + 25 * MINUTE, eventCopy.payment));
  }

  if (status === "preparing" || status === "shipped" || status === "returned") {
    events.push(event(`picking-${index}`, createdAtMs + 2 * 3_600_000, eventCopy.picking));
  }

  if (status === "shipped" || status === "returned") {
    events.push(event(`packed-${index}`, createdAtMs + DAY, eventCopy.packed));
    events.push(
      event(`shipped-${index}`, createdAtMs + DAY + 3 * 3_600_000, eventCopy.shipped, {
        ja: `追跡番号 ${`KURA-${100_000 + index * 37}`}`,
        es: `Número de seguimiento KURA-${100_000 + index * 37}`,
        en: `Tracking number KURA-${100_000 + index * 37}`,
      }),
    );
  }

  if (status === "cancelled") {
    events.push(event(`cancelled-${index}`, createdAtMs + 3 * 3_600_000, eventCopy.cancelled));
  }

  if (status === "returned") {
    events.push(event(`delivered-${index}`, createdAtMs + 2 * DAY, eventCopy.delivered));
    events.push(
      event(`return-requested-${index}`, createdAtMs + 3 * DAY, eventCopy.returnRequested),
    );
    events.push(event(`returned-${index}`, createdAtMs + 4 * DAY, eventCopy.returned));
  }

  return {
    id: `KURA-${10_428 + index}`,
    customerId: customer.id,
    status,
    channel: at(channels, index % channels.length),
    warehouse: at(warehouses, (index * 2) % warehouses.length),
    payment: at(payments, index % payments.length),
    createdAt: iso(createdAtMs),
    dueDate: iso(dueDateMs),
    total,
    itemCount,
    lines,
    events,
    note: index % 5 === 0 ? at(deliveryNotes, index % deliveryNotes.length) : undefined,
    tracking:
      status === "shipped" || status === "returned" ? `KURA-${100_000 + index * 37}` : undefined,
  };
}

export const orders: readonly Order[] = Array.from({ length: 132 }, (_, index) =>
  createOrder(index),
);

export const baseDate = "2026-10-21";
