import { Field as BaseField } from "@base-ui/react/field";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "../../lib/cn";
import { useFieldState } from "./field-context";

export type LabelProps = Omit<ComponentProps<typeof BaseField.Label>, "className"> & {
  className?: string;
  required?: boolean;
  children: ReactNode;
};

export function Label({ className, required = false, children, ...props }: LabelProps) {
  const { inside } = useFieldState();
  const classes = cn(
    "block text-xs font-semibold leading-tight text-ink data-[disabled]:text-faint",
    className,
  );
  const content = (
    <>
      {children}
      {required ? (
        <span aria-hidden="true" className="ms-0.5 text-danger">
          *
        </span>
      ) : null}
    </>
  );

  if (!inside) {
    const { nativeLabel: _nativeLabel, render: _render, ...labelProps } = props;

    return (
      <label
        data-slot="label"
        data-required={required ? "" : undefined}
        htmlFor={labelProps.htmlFor}
        className={classes}
        {...(labelProps as ComponentProps<"label">)}
      >
        {content}
      </label>
    );
  }

  return (
    <BaseField.Label
      data-slot="label"
      data-required={required ? "" : undefined}
      className={classes}
      {...props}
    >
      {content}
    </BaseField.Label>
  );
}
