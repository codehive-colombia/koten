import type { ReactNode } from "react";
import { cn } from "../../lib/cn";
import { Badge } from "../ui/badge";

export type PriceBlockProps = {
  price: ReactNode;
  taxLabel?: ReactNode;
  points?: ReactNode;
  listPrice?: ReactNode;
  listPriceLabel?: ReactNode;
  saleLabel?: ReactNode;
  stock?: {
    label: ReactNode;
    tone: "success" | "warning" | "danger";
  };
  note?: ReactNode;
  size?: "md" | "lg";
  className?: string;
};

export function PriceBlock({
  price,
  taxLabel,
  points,
  listPrice,
  listPriceLabel,
  saleLabel,
  stock,
  note,
  size = "lg",
  className,
}: PriceBlockProps) {
  return (
    <div data-slot="price-block" className={cn("min-w-0", className)}>
      {saleLabel ? (
        <p className="mb-1">
          <Badge tone="sale" appearance="solid">
            {saleLabel}
          </Badge>
        </p>
      ) : null}
      <p className="flex flex-wrap items-baseline gap-x-2">
        <span
          className={cn(
            "font-semibold leading-none tabular-nums text-primary",
            size === "lg" ? "text-3xl" : "text-xl",
          )}
        >
          {price}
        </span>
        {taxLabel ? <span className="text-2xs text-muted">{taxLabel}</span> : null}
      </p>
      {listPrice ? (
        <p className="mt-1 text-2xs text-faint">
          {listPriceLabel ? <span className="me-1">{listPriceLabel}</span> : null}
          <span className="line-through tabular-nums">{listPrice}</span>
        </p>
      ) : null}
      {points ? <p className="mt-1 text-2xs font-semibold text-link">{points}</p> : null}
      {stock ? (
        <p className="mt-2">
          <Badge
            tone={
              stock.tone === "success" ? "success" : stock.tone === "warning" ? "warning" : "danger"
            }
            dot
          >
            {stock.label}
          </Badge>
        </p>
      ) : null}
      {note ? <p className="mt-2 text-2xs leading-relaxed text-faint">{note}</p> : null}
    </div>
  );
}
