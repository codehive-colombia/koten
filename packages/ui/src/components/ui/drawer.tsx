import { Drawer as BaseDrawer } from "@base-ui/react/drawer";
import { X } from "lucide-react";
import type { ReactElement, ReactNode } from "react";
import { cn } from "../../lib/cn";

export type DrawerProps = {
  trigger: ReactElement;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  closeLabel: string;
  side?: "left" | "right";
  className?: string;
};

export function Drawer({
  trigger,
  title,
  description,
  children,
  footer,
  closeLabel,
  side = "right",
  className,
}: DrawerProps) {
  return (
    <BaseDrawer.Root swipeDirection={side === "right" ? "right" : "left"}>
      <BaseDrawer.Trigger render={trigger} />
      <BaseDrawer.Portal>
        <BaseDrawer.Backdrop className="fixed inset-0 z-40 bg-[var(--koten-overlay)]" />
        <BaseDrawer.Viewport
          className={cn(
            "fixed inset-0 z-50 flex p-0",
            side === "right" ? "justify-end" : "justify-start",
          )}
        >
          <BaseDrawer.Popup
            data-slot="drawer"
            className={cn(
              "h-full w-full max-w-[480px] overflow-y-auto border-rule bg-surface text-ink shadow-overlay outline-hidden",
              side === "right" ? "border-s" : "border-e",
              className,
            )}
          >
            <header className="sticky top-0 z-1 flex items-start justify-between gap-3 border-b border-rule bg-tint px-[var(--koten-panel-p)] py-2">
              <div className="min-w-0">
                <BaseDrawer.Title className="text-sm font-semibold text-ink">
                  {title}
                </BaseDrawer.Title>
                {description ? (
                  <BaseDrawer.Description className="mt-0.5 text-2xs text-muted">
                    {description}
                  </BaseDrawer.Description>
                ) : null}
              </div>
              <BaseDrawer.Close
                aria-label={closeLabel}
                className="-me-1 grid size-7 shrink-0 place-items-center text-faint transition-colors hover:text-ink"
              >
                <X className="size-4" aria-hidden="true" />
              </BaseDrawer.Close>
            </header>
            <div className="p-[var(--koten-panel-p)] text-xs text-muted">{children}</div>
            {footer ? (
              <footer className="sticky bottom-0 flex flex-wrap items-center justify-end gap-2 border-t border-rule bg-surface px-[var(--koten-panel-p)] py-2">
                {footer}
              </footer>
            ) : null}
          </BaseDrawer.Popup>
        </BaseDrawer.Viewport>
      </BaseDrawer.Portal>
    </BaseDrawer.Root>
  );
}
