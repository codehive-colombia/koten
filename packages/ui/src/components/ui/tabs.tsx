import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

export type TabItem = {
  value: string;
  label: ReactNode;
  content: ReactNode;
  disabled?: boolean;
};

export type TabsProps = {
  label: string;
  items: readonly TabItem[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
};

export function Tabs({ label, items, defaultValue, value, onValueChange, className }: TabsProps) {
  return (
    <BaseTabs.Root
      defaultValue={defaultValue}
      value={value}
      onValueChange={(next) => onValueChange?.(String(next))}
      className={cn("w-full min-w-0", className)}
    >
      <BaseTabs.List
        aria-label={label}
        data-slot="tabs-list"
        className="flex flex-wrap border-b border-rule"
      >
        {items.map((item) => (
          <BaseTabs.Tab
            key={item.value}
            value={item.value}
            disabled={item.disabled}
            className="-mb-px inline-flex h-[var(--koten-control-h)] items-center border-b-2 border-transparent px-[var(--koten-panel-p)] text-xs text-muted transition-colors hover:text-ink data-active:border-primary data-active:font-semibold data-active:text-primary disabled:cursor-not-allowed disabled:text-faint"
          >
            {item.label}
          </BaseTabs.Tab>
        ))}
      </BaseTabs.List>
      {items.map((item) => (
        <BaseTabs.Panel
          key={item.value}
          value={item.value}
          data-slot="tabs-panel"
          className="pt-[var(--koten-panel-p)] text-xs text-muted outline-hidden focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-focus"
        >
          {item.content}
        </BaseTabs.Panel>
      ))}
    </BaseTabs.Root>
  );
}
