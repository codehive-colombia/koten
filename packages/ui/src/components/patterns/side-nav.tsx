import type { MouseEvent as ReactMouseEvent, ReactNode } from "react";
import { cn } from "../../lib/cn";

export type SideNavItem = {
  id: string;
  label: string;
  href: string;
  active?: boolean;
  icon?: ReactNode;
  count?: number;
};

export type SideNavGroup = {
  id: string;
  label: string;
  items: readonly SideNavItem[];
};

export type SideNavProps = {
  groups: readonly SideNavGroup[];
  label: string;
  onNavigate?: (href: string) => void;
  footer?: ReactNode;
  className?: string;
};

function isPlainClick(event: ReactMouseEvent<HTMLAnchorElement>) {
  return event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
}

export function SideNav({ groups, label, onNavigate, footer, className }: SideNavProps) {
  return (
    <nav aria-label={label} data-slot="side-nav" className={cn("min-w-0 p-2", className)}>
      {groups.map((group) => (
        <section key={group.id} className="mb-3">
          <h2 className="px-2 py-1 text-2xs font-semibold text-faint">{group.label}</h2>
          <ul className="space-y-px">
            {group.items.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  aria-current={item.active ? "page" : undefined}
                  onClick={(event) => {
                    if (onNavigate && isPlainClick(event)) {
                      event.preventDefault();
                      onNavigate(item.href);
                    }
                  }}
                  className={cn(
                    "flex min-h-[var(--koten-row-h)] items-center gap-2 border-s-2 px-2 text-xs no-underline transition-colors",
                    item.active
                      ? "border-primary bg-selection font-semibold text-primary-strong"
                      : "border-transparent text-muted hover:bg-tint hover:text-ink",
                  )}
                >
                  {item.icon ? (
                    <span aria-hidden="true" className="shrink-0">
                      {item.icon}
                    </span>
                  ) : null}
                  <span className="min-w-0 flex-1 truncate">{item.label}</span>
                  {typeof item.count === "number" ? (
                    <span className="shrink-0 border border-rule bg-surface px-1 text-2xs tabular-nums text-muted">
                      {item.count}
                    </span>
                  ) : null}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}
      {footer ? <div className="mt-3 border-t border-rule pt-2">{footer}</div> : null}
    </nav>
  );
}
