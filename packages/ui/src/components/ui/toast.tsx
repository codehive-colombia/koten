import { Toast as BaseToast } from "@base-ui/react/toast";
import { CheckCircle2, CircleAlert, Info, TriangleAlert, X } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

export type ToastTone = "info" | "success" | "warning" | "danger";

const toneClasses: Record<ToastTone, { border: string; icon: ReactNode; text: string }> = {
  info: {
    border: "border-s-info",
    icon: <Info className="size-4" aria-hidden="true" />,
    text: "text-info",
  },
  success: {
    border: "border-s-success",
    icon: <CheckCircle2 className="size-4" aria-hidden="true" />,
    text: "text-success",
  },
  warning: {
    border: "border-s-warning",
    icon: <TriangleAlert className="size-4" aria-hidden="true" />,
    text: "text-warning",
  },
  danger: {
    border: "border-s-danger",
    icon: <CircleAlert className="size-4" aria-hidden="true" />,
    text: "text-danger",
  },
};

function isTone(value: string | undefined): value is ToastTone {
  return value === "info" || value === "success" || value === "warning" || value === "danger";
}

export type ToastProviderProps = {
  children: ReactNode;
  closeLabel: string;
  regionLabel: string;
  timeout?: number;
  limit?: number;
};

export function ToastProvider({
  children,
  closeLabel,
  regionLabel,
  timeout,
  limit,
}: ToastProviderProps) {
  return (
    <BaseToast.Provider timeout={timeout} limit={limit}>
      {children}
      <ToastRegion closeLabel={closeLabel} regionLabel={regionLabel} />
    </BaseToast.Provider>
  );
}

function ToastRegion({ closeLabel, regionLabel }: { closeLabel: string; regionLabel: string }) {
  const { toasts } = BaseToast.useToastManager();

  return (
    <BaseToast.Portal>
      <BaseToast.Viewport
        aria-label={regionLabel}
        data-slot="toast-viewport"
        className="fixed inset-x-4 bottom-4 z-50 flex max-h-[calc(100dvh-2rem)] w-auto flex-col gap-2 ms-auto sm:inset-x-auto sm:end-6 sm:bottom-6 sm:w-80"
      >
        {toasts.map((toast) => {
          const tone = isTone(toast.type) ? toast.type : "info";
          const toneClass = toneClasses[tone];

          return (
            <BaseToast.Root
              key={toast.id}
              toast={toast}
              data-slot="toast"
              data-tone={tone}
              className={cn(
                "flex items-start gap-2 border border-rule border-s-[3px] bg-surface p-[var(--koten-panel-p)] text-xs shadow-overlay transition-opacity data-ending-style:opacity-0 data-starting-style:opacity-0",
                toneClass.border,
              )}
            >
              <span className={cn("mt-0.5 shrink-0", toneClass.text)}>{toneClass.icon}</span>
              <BaseToast.Content className="min-w-0 flex-1">
                <BaseToast.Title className="block font-semibold text-ink" />
                <BaseToast.Description className="mt-0.5 block text-muted" />
              </BaseToast.Content>
              <BaseToast.Close
                aria-label={closeLabel}
                className="shrink-0 text-faint transition-colors hover:text-ink focus-visible:text-ink"
              >
                <X className="size-3.5" aria-hidden="true" />
              </BaseToast.Close>
            </BaseToast.Root>
          );
        })}
      </BaseToast.Viewport>
    </BaseToast.Portal>
  );
}

export function useToast() {
  return BaseToast.useToastManager();
}
