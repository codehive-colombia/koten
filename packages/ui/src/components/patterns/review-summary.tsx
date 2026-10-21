import type { ReactNode } from "react";
import { useKotenFormatters } from "../../i18n/provider";
import { cn } from "../../lib/cn";
import { Badge } from "../ui/badge";

export type ReviewDistribution = {
  stars: number;
  count: number;
};

export type ReviewItem = {
  id: string;
  author: ReactNode;
  date: ReactNode;
  rating: number;
  title: ReactNode;
  body: ReactNode;
  verified?: boolean;
};

export type ReviewSummaryProps = {
  rating: number;
  count: number;
  ratingLabel: (rating: number) => string;
  countLabel: (count: number) => string;
  distributionLabel: string;
  distribution: readonly ReviewDistribution[];
  reviews: readonly ReviewItem[];
  verifiedLabel?: string;
  emptyLabel: string;
  className?: string;
};

function Stars({ value, label }: { value: number; label: string }) {
  const rounded = Math.round(value);

  return (
    <span className="whitespace-nowrap">
      <span aria-hidden="true" className="text-primary">
        {"★".repeat(rounded)}
        <span className="text-rule-strong">{"★".repeat(Math.max(5 - rounded, 0))}</span>
      </span>
      <span className="sr-only">{label}</span>
    </span>
  );
}

export function ReviewSummary({
  rating,
  count,
  ratingLabel,
  countLabel,
  distributionLabel,
  distribution,
  reviews,
  verifiedLabel,
  emptyLabel,
  className,
}: ReviewSummaryProps) {
  const formatters = useKotenFormatters();
  const total = distribution.reduce((sum, item) => sum + item.count, 0) || 1;

  return (
    <div
      data-slot="review-summary"
      className={cn(
        "grid min-w-0 gap-[var(--koten-gap)] lg:grid-cols-[240px_minmax(0,1fr)]",
        className,
      )}
    >
      <div className="border border-rule bg-surface p-[var(--koten-panel-p)]">
        <p className="font-serif text-3xl font-semibold leading-none tabular-nums">
          {formatters.formatNumber(rating, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
        </p>
        <p className="mt-1">
          <Stars value={rating} label={ratingLabel(rating)} />
        </p>
        <p className="mt-1 text-2xs text-muted">{countLabel(count)}</p>

        <h3 className="mt-3 border-t border-rule pt-2 text-2xs font-semibold text-ink">
          {distributionLabel}
        </h3>
        <ul className="mt-1.5 space-y-1">
          {distribution.map((item) => (
            <li key={item.stars} className="flex items-center gap-2 text-2xs">
              <span className="w-8 shrink-0 tabular-nums text-muted">{item.stars}★</span>
              <span className="h-1.5 min-w-0 flex-1 overflow-hidden border border-rule bg-tint">
                <span
                  className="block h-full bg-primary"
                  style={{ width: `${Math.round((item.count / total) * 100)}%` }}
                />
              </span>
              <span className="w-8 shrink-0 text-end tabular-nums text-faint">{item.count}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="min-w-0">
        {reviews.length === 0 ? (
          <p className="text-xs text-muted">{emptyLabel}</p>
        ) : (
          <ul className="divide-y divide-rule border-y border-rule">
            {reviews.map((review) => (
              <li key={review.id} className="py-3">
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                  <p className="text-xs font-semibold text-ink">{review.title}</p>
                  <p className="text-2xs text-faint">
                    <Stars value={review.rating} label={ratingLabel(review.rating)} />
                  </p>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-muted">{review.body}</p>
                <p className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-2xs text-faint">
                  <span>{review.author}</span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">{review.date}</span>
                  {review.verified && verifiedLabel ? (
                    <Badge tone="success" appearance="outline">
                      {verifiedLabel}
                    </Badge>
                  ) : null}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
