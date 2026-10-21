import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "../../lib/cn";

export const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-sm border px-1.5 py-0.5 text-2xs font-semibold leading-none",
  {
    variants: {
      tone: {
        neutral: "",
        info: "",
        success: "",
        warning: "",
        danger: "",
        sale: "",
        new: "",
      },
      appearance: {
        soft: "",
        solid: "",
        outline: "",
      },
    },
    compoundVariants: [
      { tone: "neutral", appearance: "soft", class: "border-rule-strong bg-tint text-muted" },
      { tone: "info", appearance: "soft", class: "border-info bg-surface text-info" },
      { tone: "success", appearance: "soft", class: "border-success bg-surface text-success" },
      { tone: "warning", appearance: "soft", class: "border-warning bg-surface text-warning" },
      { tone: "danger", appearance: "soft", class: "border-danger bg-surface text-danger" },
      { tone: "sale", appearance: "soft", class: "border-sale bg-surface text-sale" },
      { tone: "new", appearance: "soft", class: "border-new bg-surface text-new" },
      { tone: "neutral", appearance: "solid", class: "border-ink bg-ink text-white" },
      { tone: "info", appearance: "solid", class: "border-info bg-info text-white" },
      { tone: "success", appearance: "solid", class: "border-success bg-success text-white" },
      { tone: "warning", appearance: "solid", class: "border-warning bg-warning text-white" },
      { tone: "danger", appearance: "solid", class: "border-danger bg-danger text-white" },
      { tone: "sale", appearance: "solid", class: "border-sale bg-sale text-white" },
      { tone: "new", appearance: "solid", class: "border-new bg-new text-white" },
      {
        tone: "neutral",
        appearance: "outline",
        class: "border-rule-strong bg-transparent text-muted",
      },
      { tone: "info", appearance: "outline", class: "border-info bg-transparent text-info" },
      {
        tone: "success",
        appearance: "outline",
        class: "border-success bg-transparent text-success",
      },
      {
        tone: "warning",
        appearance: "outline",
        class: "border-warning bg-transparent text-warning",
      },
      { tone: "danger", appearance: "outline", class: "border-danger bg-transparent text-danger" },
      { tone: "sale", appearance: "outline", class: "border-sale bg-transparent text-sale" },
      { tone: "new", appearance: "outline", class: "border-new bg-transparent text-new" },
    ],
    defaultVariants: {
      tone: "neutral",
      appearance: "soft",
    },
  },
);

export type BadgeProps = ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    dot?: boolean;
  };

export function Badge({
  className,
  tone,
  appearance,
  dot = false,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      data-slot="badge"
      data-tone={tone ?? "neutral"}
      data-appearance={appearance ?? "soft"}
      className={cn(badgeVariants({ tone, appearance }), className)}
      {...props}
    >
      {dot ? (
        <span
          data-slot="badge-dot"
          aria-hidden="true"
          className="size-1.5 shrink-0 rounded-full bg-current"
        />
      ) : null}
      {children}
    </span>
  );
}
