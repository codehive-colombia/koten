import type { ReactNode } from "react";
import { Badge } from "../ui/badge";

export type OrderStatus = "pending" | "preparing" | "shipped" | "cancelled" | "returned";

export const orderStatusTones: Record<
  OrderStatus,
  "warning" | "info" | "success" | "danger" | "neutral"
> = {
  pending: "warning",
  preparing: "info",
  shipped: "success",
  cancelled: "danger",
  returned: "neutral",
};

export type StatusBadgeProps = {
  status: OrderStatus;
  label: ReactNode;
  className?: string;
};

export function StatusBadge({ status, label, className }: StatusBadgeProps) {
  return (
    <Badge tone={orderStatusTones[status]} dot className={className}>
      {label}
    </Badge>
  );
}
