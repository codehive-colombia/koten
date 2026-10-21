import type { ComponentProps } from "react";
import { cn } from "../../lib/cn";

export function Table({ className, ...props }: ComponentProps<"table">) {
  return (
    <div className="w-full min-w-0 overflow-x-auto border border-rule">
      <table
        data-slot="table"
        className={cn("w-full min-w-[32rem] border-collapse text-start text-xs", className)}
        {...props}
      />
    </div>
  );
}

export function TableCaption({ className, ...props }: ComponentProps<"caption">) {
  return <caption className={cn("sr-only", className)} {...props} />;
}

export function TableHeader({ className, ...props }: ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("bg-tint text-2xs text-muted", className)}
      {...props}
    />
  );
}

export function TableBody({ className, ...props }: ComponentProps<"tbody">) {
  return (
    <tbody data-slot="table-body" className={cn("divide-y divide-rule", className)} {...props} />
  );
}

export function TableRow({ className, ...props }: ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn("h-[var(--koten-row-h)] transition-colors hover:bg-tint/60", className)}
      {...props}
    />
  );
}

export function TableHead({ className, ...props }: ComponentProps<"th">) {
  return (
    <th
      scope="col"
      data-slot="table-head"
      className={cn(
        "border-b border-rule-strong px-[var(--koten-control-px)] font-semibold",
        className,
      )}
      {...props}
    />
  );
}

export function TableCell({ className, ...props }: ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn("px-[var(--koten-control-px)] align-middle", className)}
      {...props}
    />
  );
}
