import { Inbox } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "../../lib/cn";

export type EmptyStateProps = Omit<ComponentProps<"div">, "title"> & {
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  action?: ReactNode;
};

export function EmptyState({
  title,
  description,
  icon,
  action,
  className,
  children,
  ...props
}: EmptyStateProps) {
  return (
    <div
      data-slot="empty-state"
      className={cn(
        "flex flex-col items-center justify-center gap-[var(--koten-gap)] border border-rule bg-surface p-[calc(var(--koten-gap)*2)] text-center",
        className,
      )}
      {...props}
    >
      <span className="grid size-10 place-items-center border border-rule bg-tint text-faint">
        {icon ?? <Inbox className="size-5" aria-hidden="true" />}
      </span>
      <div className="min-w-0">
        <h3 className="text-sm font-semibold text-ink">{title}</h3>
        {description ? (
          <p className="mt-1 max-w-sm text-xs leading-relaxed text-muted">{description}</p>
        ) : null}
        {children}
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
}
