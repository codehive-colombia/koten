import type { KotenLocale } from "@koten/ui";

export type Localized<T = string> = Record<KotenLocale, T>;

export type OrderStatus = "pending" | "preparing" | "shipped" | "cancelled" | "returned";

export type ChannelId = "web" | "store" | "phone";

export type WarehouseId = "tokyo" | "osaka" | "fukuoka";

export type PaymentId = "invoice" | "card" | "transfer";

export type CustomerSegment = "retail" | "wholesale";

export type Customer = {
  id: string;
  company: Localized;
  contact: string;
  email: string;
  phone: string;
  city: Localized;
  segment: CustomerSegment;
};

export type Product = {
  id: string;
  sku: string;
  name: Localized;
  price: number;
  stock: number;
  minStock: number;
  category: Localized;
};

export type OrderLine = {
  productId: string;
  sku: string;
  name: Localized;
  unitPrice: number;
  quantity: number;
};

export type TimelineTone = "neutral" | "info" | "success" | "warning" | "danger";

export function pick<T>(value: Localized<T>, locale: KotenLocale): T {
  return value[locale];
}

export type OrderEvent = {
  id: string;
  at: string;
  title: Localized;
  description?: Localized;
  tone: TimelineTone;
};

export type Order = {
  id: string;
  customerId: string;
  status: OrderStatus;
  channel: ChannelId;
  warehouse: WarehouseId;
  payment: PaymentId;
  createdAt: string;
  dueDate: string;
  total: number;
  itemCount: number;
  lines: readonly OrderLine[];
  events: readonly OrderEvent[];
  note?: Localized;
  tracking?: string;
};
