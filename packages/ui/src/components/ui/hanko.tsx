import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "../../lib/cn";

const hankoVariants = cva(
  "relative inline-grid shrink-0 -rotate-2 place-items-center border-2 border-primary font-serif leading-none text-primary select-none before:absolute before:inset-0.5 before:border before:border-primary before:content-['']",
  {
    variants: {
      size: {
        sm: "size-8 text-base",
        md: "size-10 text-xl",
        lg: "size-12 text-2xl",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export type HankoProps = Omit<ComponentProps<"span">, "children"> &
  VariantProps<typeof hankoVariants> & {
    children: ReactNode;
    label?: string;
    maxChars?: number;
  };

export function Hanko({ children, size, label, maxChars = 4, className, ...props }: HankoProps) {
  const text = Array.from(String(children)).slice(0, Math.min(maxChars, 4)).join("");

  return (
    // biome-ignore lint/a11y/useAriaPropsSupportedByRole: aria-label is only present when role="img".
    <span
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      data-slot="hanko"
      className={cn(hankoVariants({ size }), className)}
      {...props}
    >
      <span className="relative">{text}</span>
    </span>
  );
}
