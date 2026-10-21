import type { ComponentProps, ReactNode } from "react";
import { cn } from "../../lib/cn";

export type TategakiProps = Omit<ComponentProps<"span">, "children"> & {
  children: ReactNode;
  decorative?: boolean;
};

export function Tategaki({ children, decorative = true, className, ...props }: TategakiProps) {
  return (
    <span
      data-slot="tategaki"
      aria-hidden={decorative ? true : undefined}
      className={cn("tategaki hidden text-xs text-faint md:inline-block", className)}
      {...props}
    >
      {children}
    </span>
  );
}
