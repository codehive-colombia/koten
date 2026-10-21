import type { ReactNode } from "react";
import { cn } from "../../lib/cn";
import { Hanko } from "../ui/hanko";

export type StoreNavItem = {
  id: string;
  label: string;
  href: string;
  active?: boolean;
};

export type StoreHeaderProps = {
  brand: {
    name: string;
    jp?: string;
    href: string;
    label: string;
  };
  utility: {
    left: ReactNode;
    right?: ReactNode;
  };
  search: ReactNode;
  actions: ReactNode;
  navLabel: string;
  navItems: readonly StoreNavItem[];
  menuLabel: string;
  className?: string;
};

export function StoreHeader({
  brand,
  utility,
  search,
  actions,
  navLabel,
  navItems,
  menuLabel,
  className,
}: StoreHeaderProps) {
  return (
    <header data-slot="store-header" className={cn("min-w-0", className)}>
      <div className="bg-inverse text-inverse-fg">
        <div className="koten-container flex min-h-7 flex-wrap items-center justify-between gap-x-4 gap-y-1 py-1 text-2xs">
          <div className="min-w-0">{utility.left}</div>
          {utility.right ? <div className="min-w-0">{utility.right}</div> : null}
        </div>
      </div>

      <div className="border-b border-rule bg-surface">
        <div className="koten-container flex flex-wrap items-center gap-[var(--koten-gap)] py-2.5">
          <a
            href={brand.href}
            aria-label={brand.jp ? `${brand.jp} ${brand.label}` : brand.label}
            className="flex shrink-0 items-center gap-2.5 text-ink no-underline"
          >
            <Hanko size="sm">{brand.jp ?? brand.name.slice(0, 1)}</Hanko>{" "}
            <span className="font-serif text-xl font-semibold leading-none tracking-tight">
              {brand.name}
            </span>
          </a>
          <div className="order-3 w-full min-w-0 sm:order-none sm:w-auto sm:flex-1">{search}</div>
          <div className="ms-auto flex min-w-0 items-center gap-2 text-2xs text-muted sm:ms-0">
            {actions}
          </div>
        </div>

        <nav aria-label={navLabel} className="border-t border-rule bg-tint">
          <div className="koten-container flex h-9 items-center gap-4 overflow-x-auto">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                aria-current={item.active ? "page" : undefined}
                className={cn(
                  "flex h-full shrink-0 items-center whitespace-nowrap border-b-2 text-xs no-underline transition-colors",
                  item.active
                    ? "border-primary font-semibold text-primary-strong"
                    : "border-transparent text-muted hover:text-link",
                )}
              >
                {item.label}
              </a>
            ))}
            <span className="ms-auto shrink-0 text-2xs text-faint sm:hidden">{menuLabel}</span>
          </div>
        </nav>
      </div>
    </header>
  );
}
