import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

export type AccordionItem = {
  value: string;
  title: ReactNode;
  content: ReactNode;
  disabled?: boolean;
};

export type AccordionProps = {
  items: readonly AccordionItem[];
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  multiple?: boolean;
  className?: string;
};

export function Accordion({
  items,
  defaultValue,
  value,
  onValueChange,
  multiple = false,
  className,
}: AccordionProps) {
  return (
    <BaseAccordion.Root
      multiple={multiple}
      defaultValue={defaultValue as never}
      value={value as never}
      onValueChange={(next) => onValueChange?.(next as string | string[])}
      data-slot="accordion"
      className={cn("border-y border-rule", className)}
    >
      {items.map((item) => (
        <BaseAccordion.Item
          key={item.value}
          value={item.value}
          disabled={item.disabled}
          className="border-b border-rule last:border-b-0"
        >
          <BaseAccordion.Header>
            <BaseAccordion.Trigger className="group flex min-h-[var(--koten-row-h)] w-full items-center justify-between gap-3 px-[var(--koten-panel-p)] text-left text-xs font-semibold text-ink transition-colors hover:bg-tint focus-visible:relative focus-visible:z-1 data-disabled:cursor-not-allowed data-disabled:text-faint data-panel-open:text-primary">
              <span className="min-w-0">{item.title}</span>
              <ChevronDown
                className="size-3.5 shrink-0 transition-transform group-data-[panel-open]:rotate-180"
                aria-hidden="true"
              />
            </BaseAccordion.Trigger>
          </BaseAccordion.Header>
          <BaseAccordion.Panel className="h-[var(--accordion-panel-height)] overflow-hidden transition-[height] duration-150 data-ending-style:h-0 data-starting-style:h-0">
            <div className="px-[var(--koten-panel-p)] pb-[var(--koten-panel-p)] text-xs leading-relaxed text-muted">
              {item.content}
            </div>
          </BaseAccordion.Panel>
        </BaseAccordion.Item>
      ))}
    </BaseAccordion.Root>
  );
}
