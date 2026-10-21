import { Popover as BasePopover } from "@base-ui/react/popover";
import { X } from "lucide-react";
import type { ReactElement, ReactNode } from "react";
import { cn } from "../../lib/cn";

export type PopoverProps = {
  trigger: ReactElement;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  closeLabel: string;
  className?: string;
};

export function Popover({
  trigger,
  title,
  description,
  children,
  closeLabel,
  className,
}: PopoverProps) {
  return (
    <BasePopover.Root>
      <BasePopover.Trigger render={trigger} />
      <BasePopover.Portal>
        <BasePopover.Positioner sideOffset={4} className="z-50 outline-hidden">
          <BasePopover.Popup
            data-slot="popover"
            className={cn(
              "w-72 border border-rule bg-surface text-ink shadow-overlay outline-hidden",
              className,
            )}
          >
            <header className="flex items-start justify-between gap-3 border-b border-rule bg-tint px-[var(--koten-panel-p)] py-2">
              <div className="min-w-0">
                <BasePopover.Title className="text-xs font-semibold text-ink">
                  {title}
                </BasePopover.Title>
                {description ? (
                  <BasePopover.Description className="mt-0.5 text-2xs text-muted">
                    {description}
                  </BasePopover.Description>
                ) : null}
              </div>
              <BasePopover.Close
                aria-label={closeLabel}
                className="-me-1 grid size-6 shrink-0 place-items-center text-faint transition-colors hover:text-ink"
              >
                <X className="size-3.5" aria-hidden="true" />
              </BasePopover.Close>
            </header>
            {children ? (
              <div className="p-[var(--koten-panel-p)] text-xs text-muted">{children}</div>
            ) : null}
          </BasePopover.Popup>
        </BasePopover.Positioner>
      </BasePopover.Portal>
    </BasePopover.Root>
  );
}
