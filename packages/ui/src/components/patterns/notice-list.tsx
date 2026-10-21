import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

export type NoticeItem = {
  id: string;
  date: ReactNode;
  dateTime?: string;
  title: ReactNode;
  href?: string;
  tag?: ReactNode;
};

export type NoticeListProps = {
  notices: readonly NoticeItem[];
  label: string;
  emptyLabel: string;
  moreLabel?: string;
  moreHref?: string;
  className?: string;
};

export function NoticeList({
  notices,
  label,
  emptyLabel,
  moreLabel,
  moreHref,
  className,
}: NoticeListProps) {
  return (
    <div data-slot="notice-list" className={cn("min-w-0", className)}>
      {notices.length === 0 ? (
        <p className="text-xs text-muted">{emptyLabel}</p>
      ) : (
        <ul aria-label={label} className="divide-y divide-rule border-y border-rule">
          {notices.map((notice) => (
            <li
              key={notice.id}
              className="flex min-h-[var(--koten-row-h)] items-start gap-2 py-1.5 text-2xs"
            >
              <time dateTime={notice.dateTime} className="shrink-0 tabular-nums text-muted">
                {notice.date}
              </time>
              <span className="min-w-0 flex-1">
                {notice.href ? (
                  <a href={notice.href} className="text-link underline-offset-2 hover:underline">
                    {notice.title}
                  </a>
                ) : (
                  <span className="text-ink">{notice.title}</span>
                )}
                {notice.tag ? <span className="ms-1.5 align-middle">{notice.tag}</span> : null}
              </span>
            </li>
          ))}
        </ul>
      )}
      {moreLabel && moreHref ? (
        <a
          href={moreHref}
          className="mt-1.5 inline-block text-2xs font-semibold text-link underline-offset-2 hover:underline"
        >
          {moreLabel} →
        </a>
      ) : null}
    </div>
  );
}
