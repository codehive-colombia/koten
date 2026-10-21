import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

export type RankedListItem = {
  id: string;
  rank: number;
  title: ReactNode;
  href: string;
  price: ReactNode;
  meta?: ReactNode;
  image?: {
    src: string;
    alt: string;
  };
};

export type RankedListProps = {
  items: readonly RankedListItem[];
  label: string;
  className?: string;
};

export function RankedList({ items, label, className }: RankedListProps) {
  return (
    <ol
      aria-label={label}
      data-slot="ranked-list"
      className={cn("divide-y divide-rule", className)}
    >
      {items.map((item) => (
        <li
          key={item.id}
          className="flex min-h-[calc(var(--koten-row-h)*1.5)] items-center gap-2 py-1.5"
        >
          <span
            className={cn(
              "grid size-5 shrink-0 place-items-center text-2xs font-semibold tabular-nums",
              item.rank <= 3
                ? "bg-primary text-primary-foreground"
                : "border border-rule-strong bg-surface text-muted",
            )}
            aria-hidden="true"
          >
            {item.rank}
          </span>
          {item.image ? (
            <img
              src={item.image.src}
              alt={item.image.alt}
              width={40}
              height={40}
              loading="lazy"
              className="size-10 shrink-0 border border-rule bg-tint object-cover"
            />
          ) : null}
          <span className="min-w-0 flex-1">
            <a
              href={item.href}
              className="block truncate text-2xs text-link underline-offset-2 hover:underline"
            >
              <span className="sr-only">{`${item.rank}. `}</span>
              {item.title}
            </a>
            <span className="mt-0.5 flex flex-wrap items-baseline gap-x-2 text-2xs text-faint">
              <span className="font-semibold tabular-nums text-primary">{item.price}</span>
              {item.meta ? <span>{item.meta}</span> : null}
            </span>
          </span>
        </li>
      ))}
    </ol>
  );
}
