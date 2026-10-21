import { CheckCircle2, CircleAlert, Info, TriangleAlert } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "../../lib/cn";

export type AlertTone = "info" | "success" | "warning" | "danger";

const toneClasses: Record<AlertTone, { border: string; icon: ReactNode; text: string }> = {
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

export type AlertProps = Omit<ComponentProps<"div">, "title"> & {
  tone?: AlertTone;
  title?: ReactNode;
  icon?: ReactNode;
  action?: ReactNode;
};

export function Alert({
  tone = "info",
  title,
  icon,
  action,
  children,
  className,
  ...props
}: AlertProps) {
  const toneClass = toneClasses[tone];
  const role = tone === "warning" || tone === "danger" ? "alert" : "status";

  return (
    <div
      role={role}
      data-slot="alert"
      data-tone={tone}
      className={cn(
        "flex items-start gap-2 border border-rule border-s-[3px] bg-surface p-[var(--koten-panel-p)] text-xs",
        toneClass.border,
        className,
      )}
      {...props}
    >
      <span className={cn("mt-0.5 shrink-0", toneClass.text)}>{icon ?? toneClass.icon}</span>
      <div className="min-w-0 flex-1">
        {title ? <p className="font-semibold text-ink">{title}</p> : null}
        {children ? <div className={cn("text-muted", title && "mt-0.5")}>{children}</div> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
