import { Field as BaseField } from "@base-ui/react/field";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "../../lib/cn";
import { useFieldState } from "./field-context";

export const textareaVariants = cva(
  "block min-h-[calc(var(--koten-control-h)*2)] w-full min-w-0 resize-y rounded-sm border border-rule-strong bg-surface px-[var(--koten-control-px)] py-1.5 text-ink transition-colors placeholder:text-faint focus-visible:border-primary aria-invalid:border-danger disabled:cursor-not-allowed disabled:bg-tint disabled:text-muted read-only:bg-tint read-only:text-muted",
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

export type TextareaProps = Omit<ComponentProps<"textarea">, "className"> &
  VariantProps<typeof textareaVariants> & {
    className?: string;
  };

export function Textarea({
  className,
  size,
  rows = 3,
  required,
  "aria-invalid": ariaInvalid,
  ...props
}: TextareaProps) {
  const field = useFieldState();

  return (
    <BaseField.Control
      render={<textarea rows={rows} />}
      data-slot="textarea"
      aria-invalid={ariaInvalid ?? (field.invalid || undefined)}
      required={required ?? (field.required || undefined)}
      className={cn(textareaVariants({ size }), className)}
      {...(props as ComponentProps<typeof BaseField.Control>)}
    />
  );
}
