import { ExternalLink } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "../../lib/cn";

export type LinkProps = Omit<ComponentProps<"a">, "href"> & {
  href: string;
  external?: boolean;
  showExternalIcon?: boolean;
  children: ReactNode;
};

export function Link({
  href,
  external,
  showExternalIcon = true,
  className,
  children,
  ...props
}: LinkProps) {
  const isExternal = external ?? /^(https?:)?\/\//.test(href);

  return (
    <a
      href={href}
      data-slot="link"
      data-external={isExternal ? "" : undefined}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      className={cn(
        "text-link underline decoration-rule-strong underline-offset-2 transition-colors hover:decoration-link focus-visible:outline-2 focus-visible:outline-offset-1",
        className,
      )}
      {...props}
    >
      {children}
      {isExternal && showExternalIcon ? (
        <ExternalLink className="ms-0.5 inline size-3 align-[-0.1em]" aria-hidden="true" />
      ) : null}
    </a>
  );
}
