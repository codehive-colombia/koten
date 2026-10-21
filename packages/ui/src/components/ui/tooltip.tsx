import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";
import type { ReactElement, ReactNode } from "react";

export type TooltipProps = {
  trigger: ReactElement;
  children: ReactNode;
  delay?: number;
  side?: "top" | "right" | "bottom" | "left";
};

export function Tooltip({ trigger, children, delay = 200, side = "top" }: TooltipProps) {
  return (
    <BaseTooltip.Provider delay={delay}>
      <BaseTooltip.Root>
        <BaseTooltip.Trigger render={trigger} />
        <BaseTooltip.Portal>
          <BaseTooltip.Positioner side={side} sideOffset={6} className="z-50 outline-hidden">
            <BaseTooltip.Popup
              data-slot="tooltip"
              className="max-w-64 border border-ink bg-ink px-2 py-1 text-2xs leading-relaxed text-paper shadow-overlay"
            >
              {children}
            </BaseTooltip.Popup>
          </BaseTooltip.Positioner>
        </BaseTooltip.Portal>
      </BaseTooltip.Root>
    </BaseTooltip.Provider>
  );
}
