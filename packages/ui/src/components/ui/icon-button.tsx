import type { ReactNode } from "react";
import { cn } from "../../lib/cn";
import { Button, type ButtonProps } from "./button";

const sizes = {
  sm: "size-7 px-0",
  md: "size-[var(--koten-control-h)] px-0",
  lg: "size-10 px-0",
} as const;

export type IconButtonProps = Omit<ButtonProps, "children" | "size"> & {
  label: string;
  size?: keyof typeof sizes;
  children: ReactNode;
};

export function IconButton({ label, size = "md", className, children, ...props }: IconButtonProps) {
  return (
    <Button
      aria-label={label}
      data-slot="icon-button"
      className={cn("shrink-0", sizes[size], className)}
      {...props}
    >
      {children}
    </Button>
  );
}
