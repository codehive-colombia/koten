import { Menu as BaseMenu } from "@base-ui/react/menu";
import { Fragment, type ReactElement } from "react";
import { cn } from "../../lib/cn";

export type MenuItem = {
  label: string;
  onSelect?: () => void;
  href?: string;
  disabled?: boolean;
  separatorBefore?: boolean;
};

export type MenuProps = {
  trigger: ReactElement;
  items: readonly MenuItem[];
  /**
   * Base UI menus are modal by default. Koten keeps menus non-modal so an
   * open menu never locks the page or blocks unrelated controls.
   */
  modal?: boolean;
  className?: string;
};

export function Menu({ trigger, items, modal = false, className }: MenuProps) {
  return (
    <BaseMenu.Root modal={modal}>
      <BaseMenu.Trigger render={trigger} />
      <BaseMenu.Portal>
        <BaseMenu.Positioner sideOffset={4} className="z-50 outline-hidden">
          <BaseMenu.Popup
            data-slot="menu"
            className={cn(
              "min-w-44 border border-rule bg-surface p-1 text-xs text-ink shadow-overlay outline-hidden",
              className,
            )}
          >
            {items.map((item, index) =>
              item.separatorBefore ? (
                <Fragment key={`separator-${String(item.label)}`}>
                  {index > 0 ? <BaseMenu.Separator className="my-1 h-px bg-rule" /> : null}
                  <MenuItem item={item} />
                </Fragment>
              ) : (
                <MenuItem key={item.label} item={item} />
              ),
            )}
          </BaseMenu.Popup>
        </BaseMenu.Positioner>
      </BaseMenu.Portal>
    </BaseMenu.Root>
  );
}

function MenuItem({ item }: { item: MenuItem }) {
  const className =
    "flex min-h-[var(--koten-row-h)] w-full items-center rounded-sm px-[var(--koten-control-px)] text-start text-xs text-ink outline-hidden select-none data-disabled:cursor-not-allowed data-disabled:text-faint data-highlighted:bg-tint data-highlighted:text-primary";

  if (item.href) {
    return (
      <BaseMenu.LinkItem href={item.href} className={className}>
        {item.label}
      </BaseMenu.LinkItem>
    );
  }

  return (
    <BaseMenu.Item onClick={item.onSelect} disabled={item.disabled} className={className}>
      {item.label}
    </BaseMenu.Item>
  );
}
