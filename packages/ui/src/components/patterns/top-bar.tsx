import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

export type TopBarProps = {
  left: ReactNode;
  search?: ReactNode;
  actions?: ReactNode;
  className?: string;
};

export function TopBar({ left, search, actions, className }: TopBarProps) {
  return (
    <header
      data-slot="top-bar"
      className={cn(
        "sticky top-0 z-30 flex min-h-12 flex-wrap items-center gap-x-3 gap-y-1 border-b border-rule bg-surface px-3 py-1.5",
        className,
      )}
    >
      <div className="min-w-0">{left}</div>
      {search ? (
        <div className="order-3 w-full min-w-0 sm:order-none sm:w-auto sm:flex-1">{search}</div>
      ) : null}
      {actions ? <div className="ms-auto flex min-w-0 items-center gap-1.5">{actions}</div> : null}
    </header>
  );
}
