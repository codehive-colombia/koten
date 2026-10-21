import { Field as BaseField } from "@base-ui/react/field";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "../../lib/cn";
import { useFieldState } from "./field-context";

export const inputVariants = cva(
  "block h-[var(--koten-control-h)] w-full min-w-0 rounded-sm border border-rule-strong bg-surface px-[var(--koten-control-px)] text-ink transition-colors placeholder:text-faint focus-visible:border-primary aria-invalid:border-danger disabled:cursor-not-allowed disabled:bg-tint disabled:text-muted read-only:bg-tint read-only:text-muted",
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export type InputProps = Omit<ComponentProps<typeof BaseField.Control>, "className" | "size"> &
  VariantProps<typeof inputVariants> & {
    className?: string;
  };

export function Input({
  className,
  size,
  required,
  "aria-invalid": ariaInvalid,
  ...props
}: InputProps) {
  const field = useFieldState();

  return (
    <BaseField.Control
      data-slot="input"
      aria-invalid={ariaInvalid ?? (field.invalid || undefined)}
      required={required ?? (field.required || undefined)}
      className={cn(inputVariants({ size }), className)}
      {...props}
    />
  );
}
