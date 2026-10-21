import type { ComponentProps } from "react";
import { cn } from "../../lib/cn";

export type SkeletonProps = ComponentProps<"div">;

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      data-slot="skeleton"
      className={cn("animate-pulse rounded-sm bg-tint", className)}
      {...props}
    />
  );
}
