import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { X } from "lucide-react";
import type { ReactElement, ReactNode } from "react";
import { cn } from "../../lib/cn";
import { buttonVariants } from "./button";

export type DialogProps = {
  trigger: ReactElement;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  closeLabel: string;
  className?: string;
};

export function Dialog({
  trigger,
  title,
  description,
  children,
  footer,
  closeLabel,
  className,
}: DialogProps) {
  return (
    <BaseDialog.Root>
      <BaseDialog.Trigger render={trigger} />
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className="fixed inset-0 z-40 bg-[var(--koten-overlay)] transition-opacity data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <BaseDialog.Viewport className="fixed inset-0 z-50 grid place-items-center p-4">
          <BaseDialog.Popup
            data-slot="dialog"
            className={cn(
              "max-h-[calc(100dvh-2rem)] w-full max-w-xl overflow-y-auto border border-rule bg-surface text-ink shadow-overlay outline-hidden",
              className,
            )}
          >
            <header className="flex items-start justify-between gap-3 border-b border-rule bg-tint px-[var(--koten-panel-p)] py-2">
              <div className="min-w-0">
                <BaseDialog.Title className="text-sm font-semibold text-ink">
                  {title}
                </BaseDialog.Title>
                {description ? (
                  <BaseDialog.Description className="mt-0.5 text-2xs text-muted">
                    {description}
                  </BaseDialog.Description>
                ) : null}
              </div>
              <BaseDialog.Close
                aria-label={closeLabel}
                className="-me-1 grid size-7 shrink-0 place-items-center text-faint transition-colors hover:text-ink"
              >
                <X className="size-4" aria-hidden="true" />
              </BaseDialog.Close>
            </header>
            <div className="p-[var(--koten-panel-p)] text-xs text-muted">{children}</div>
            {footer ? (
              <footer className="flex flex-wrap items-center justify-end gap-2 border-t border-rule bg-surface px-[var(--koten-panel-p)] py-2">
                {footer}
                <BaseDialog.Close className={buttonVariants({ variant: "outline", size: "sm" })}>
                  {closeLabel}
                </BaseDialog.Close>
              </footer>
            ) : null}
          </BaseDialog.Popup>
        </BaseDialog.Viewport>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}
