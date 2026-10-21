import { Button as BaseButton } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { LoaderCircle } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "../../lib/cn";

export const buttonVariants = cva(
  "inline-flex h-[var(--koten-control-h)] shrink-0 items-center justify-center gap-1.5 rounded-sm border font-semibold leading-none no-underline transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "border-primary-strong bg-primary text-primary-foreground hover:bg-primary-hover",
        secondary: "border-rule-strong bg-surface text-ink hover:bg-tint",
        outline: "border-rule-strong bg-transparent text-ink hover:bg-tint",
        ghost: "border-transparent bg-transparent text-ink hover:bg-tint",
        danger: "border-danger-strong bg-danger-solid text-solid-fg hover:bg-danger-solid-hover",
        link: "h-auto border-transparent bg-transparent px-0 text-link underline-offset-2 hover:underline",
      },
      size: {
        xs: "px-1.5 text-2xs",
        sm: "px-2 text-xs",
        md: "px-[var(--koten-control-px)] text-sm",
        lg: "px-4 text-base",
      },
    },
    defaultVariants: {
      variant: "secondary",
      size: "md",
    },
  },
);

export type ButtonProps = ComponentProps<typeof BaseButton> &
  VariantProps<typeof buttonVariants> & {
    loading?: boolean;
  };

export function Button({
  className,
  variant,
  size,
  loading = false,
  disabled,
  nativeButton,
  render,
  children,
  ...props
}: ButtonProps) {
  return (
    <BaseButton
      data-slot="button"
      data-loading={loading ? "" : undefined}
      aria-busy={loading || undefined}
      disabled={disabled || loading}
      nativeButton={nativeButton ?? render === undefined}
      render={render}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {loading ? (
        <LoaderCircle
          data-slot="button-spinner"
          aria-hidden="true"
          className="size-3.5 animate-spin"
        />
      ) : null}
      {children}
    </BaseButton>
  );
}
