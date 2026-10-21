import { type ComponentProps, useId } from "react";
import { cn } from "../../lib/cn";

export type PatternVariant = "seigaiha" | "asanoha";

export type PatternProps = ComponentProps<"div"> & {
  variant?: PatternVariant;
};

export function Pattern({ variant = "seigaiha", className, ...props }: PatternProps) {
  const patternId = useId().replaceAll(":", "");

  return (
    <div
      aria-hidden="true"
      data-slot="pattern"
      data-variant={variant}
      className={cn("pointer-events-none text-ink opacity-[0.08]", className)}
      {...props}
    >
      <svg className="size-full" aria-hidden="true">
        <defs>
          {variant === "seigaiha" ? (
            <pattern id={patternId} width="40" height="20" patternUnits="userSpaceOnUse">
              <g fill="none" stroke="currentColor" strokeWidth="1">
                <circle cx="20" cy="20" r="18" />
                <circle cx="20" cy="20" r="12" />
                <circle cx="20" cy="20" r="6" />
                <circle cx="0" cy="10" r="18" />
                <circle cx="0" cy="10" r="12" />
                <circle cx="0" cy="10" r="6" />
                <circle cx="40" cy="10" r="18" />
                <circle cx="40" cy="10" r="12" />
                <circle cx="40" cy="10" r="6" />
              </g>
            </pattern>
          ) : (
            <pattern id={patternId} width="32" height="28" patternUnits="userSpaceOnUse">
              <path
                d="M16 0 32 8v16l-16 4L0 24V8Zm0 0v28M0 8l32 16M32 8 0 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </pattern>
          )}
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
}
