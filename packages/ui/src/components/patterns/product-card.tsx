import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

export type ProductCardProps = {
  href: string;
  title: ReactNode;
  image: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
  price: ReactNode;
  points?: ReactNode;
  meta?: ReactNode;
  badges?: ReactNode;
  rating?: {
    value: number;
    count: number;
    label: string;
  };
  className?: string;
};

export function ProductCard({
  href,
  title,
  image,
  price,
  points,
  meta,
  badges,
  rating,
  className,
}: ProductCardProps) {
  return (
    <article
      data-slot="product-card"
      className={cn("flex min-w-0 flex-col border border-rule bg-surface", className)}
    >
      <div className="relative">
        <img
          src={image.src}
          alt={image.alt}
          width={image.width ?? 400}
          height={image.height ?? 300}
          loading="lazy"
          className="aspect-[4/3] w-full border-b border-rule bg-tint object-cover"
        />
        {badges ? (
          <div className="absolute start-2 top-2 flex flex-wrap gap-1">{badges}</div>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-[var(--koten-panel-p)]">
        <a
          href={href}
          className="text-xs font-semibold leading-snug text-ink underline-offset-2 hover:text-link hover:underline"
        >
          {title}
        </a>
        {rating ? (
          <p className="mt-1 text-2xs text-muted">
            <span aria-hidden="true" className="text-primary">
              {"★".repeat(Math.round(rating.value))}
            </span>{" "}
            <span className="tabular-nums">{rating.value.toFixed(1)}</span> ·{" "}
            <span className="tabular-nums">{rating.count}</span> {rating.label}
          </p>
        ) : null}
        <p className="mt-1.5 text-sm font-semibold tabular-nums text-primary">{price}</p>
        {points ? <p className="text-2xs font-semibold text-link">{points}</p> : null}
        {meta ? <p className="mt-1 text-2xs text-faint">{meta}</p> : null}
      </div>
    </article>
  );
}
