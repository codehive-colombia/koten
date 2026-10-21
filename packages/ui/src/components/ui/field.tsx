import { Field as BaseField } from "@base-ui/react/field";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "../../lib/cn";
import { FieldStateContext } from "./field-context";
import { Label } from "./label";

export type FieldProps = Omit<ComponentProps<typeof BaseField.Root>, "children" | "className"> & {
  label: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  orientation?: "vertical" | "horizontal";
  className?: string;
  labelClassName?: string;
  controlClassName?: string;
  children: ReactNode;
};

export function Field({
  label,
  description,
  error,
  required = false,
  orientation = "vertical",
  className,
  labelClassName,
  controlClassName,
  children,
  ...props
}: FieldProps) {
  const hasError = error !== undefined && error !== null && error !== "";
  const horizontal = orientation === "horizontal";

  return (
    <FieldStateContext.Provider value={{ invalid: hasError, required, inside: true }}>
      <BaseField.Root
        data-slot="field"
        data-orientation={orientation}
        data-invalid={hasError ? "" : undefined}
        className={cn(
          "group grid min-w-0",
          horizontal
            ? "gap-1 sm:grid-cols-[140px_minmax(0,1fr)] sm:items-start sm:gap-x-[var(--koten-gap)]"
            : "gap-[calc(var(--koten-gap)*0.5)]",
          className,
        )}
        {...props}
      >
        <Label
          required={required}
          className={cn(
            horizontal && "sm:pt-[calc((var(--koten-control-h)-1.2em)/2)]",
            horizontal && "sm:text-right",
            labelClassName,
          )}
        >
          {label}
        </Label>

        <div
          data-slot="field-control"
          className={cn("min-w-0", horizontal && "sm:col-start-2", controlClassName)}
        >
          {children}
        </div>

        {description ? (
          <BaseField.Description
            data-slot="field-description"
            className={cn("text-2xs leading-relaxed text-faint", horizontal && "sm:col-start-2")}
          >
            {description}
          </BaseField.Description>
        ) : null}

        <BaseField.Error
          data-slot="field-error"
          match={hasError ? true : undefined}
          aria-live="polite"
          className={cn("text-2xs leading-relaxed text-danger", horizontal && "sm:col-start-2")}
        >
          {hasError ? error : undefined}
        </BaseField.Error>
      </BaseField.Root>
    </FieldStateContext.Provider>
  );
}

export function FormRow(props: Omit<FieldProps, "orientation">) {
  return <Field {...props} orientation="horizontal" />;
}
