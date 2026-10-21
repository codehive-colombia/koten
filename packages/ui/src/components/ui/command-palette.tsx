import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { Search } from "lucide-react";
import {
  type KeyboardEvent,
  type ReactNode,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { cn } from "../../lib/cn";

export type CommandItem = {
  id: string;
  label: string;
  description?: string;
  /** Group text shown on the right. */
  group?: string;
  /** Extra terms for the search. */
  keywords?: string;
  icon?: ReactNode;
  shortcut?: string;
};

export type CommandPaletteProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  label: string;
  placeholder?: string;
  emptyLabel: string;
  items: readonly CommandItem[];
  onSelect: (item: CommandItem) => void;
  /** Keyboard hint at the bottom; the component holds no strings. */
  hint?: ReactNode;
  className?: string;
};

function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();
}

export function CommandPalette({
  open,
  onOpenChange,
  label,
  placeholder,
  emptyLabel,
  items,
  onSelect,
  hint,
  className,
}: CommandPaletteProps) {
  const id = useId();
  const listId = `${id}-list`;
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const filtered = useMemo(() => {
    const term = normalize(query);

    if (!term) return items;

    return items.filter((item) =>
      normalize([item.label, item.description, item.group, item.keywords].filter(Boolean).join(" "))
        .split(/\s+/)
        .join(" ")
        .includes(term),
    );
  }, [items, query]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
    }
  }, [open]);

  useEffect(() => {
    setActive((current) => Math.min(current, Math.max(filtered.length - 1, 0)));
  }, [filtered.length]);

  useEffect(() => {
    if (!open) return;

    const option = document.getElementById(`${id}-option-${filtered[active]?.id}`);

    option?.scrollIntoView({ block: "nearest" });
  }, [active, filtered, id, open]);

  function choose(item: CommandItem | undefined) {
    if (!item) return;

    onOpenChange(false);
    onSelect(item);
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();

      if (filtered.length === 0) return;

      const delta = event.key === "ArrowDown" ? 1 : -1;
      setActive((current) => (current + delta + filtered.length) % filtered.length);
      return;
    }

    if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      setActive(event.key === "Home" ? 0 : Math.max(filtered.length - 1, 0));
      return;
    }

    if (event.key === "PageDown" || event.key === "PageUp") {
      event.preventDefault();

      if (filtered.length === 0) return;

      const delta = event.key === "PageDown" ? 5 : -5;
      setActive((current) => Math.min(Math.max(current + delta, 0), filtered.length - 1));
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      choose(filtered[active]);
    }
  }

  return (
    <BaseDialog.Root open={open} onOpenChange={onOpenChange}>
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className="fixed inset-0 z-40 bg-[var(--koten-overlay)] transition-opacity data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <BaseDialog.Viewport className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[12vh]">
          <BaseDialog.Popup
            data-slot="command-palette"
            className={cn(
              "w-full max-w-lg border border-rule bg-surface text-ink shadow-overlay outline-hidden",
              className,
            )}
            initialFocus={inputRef}
          >
            <BaseDialog.Title className="sr-only">{label}</BaseDialog.Title>

            <div className="flex items-center gap-2 border-b border-rule px-3">
              <Search className="size-4 shrink-0 text-muted" aria-hidden="true" />
              <input
                ref={inputRef}
                type="text"
                role="combobox"
                aria-expanded="true"
                aria-controls={listId}
                aria-autocomplete="list"
                aria-activedescendant={
                  filtered[active] ? `${id}-option-${filtered[active].id}` : undefined
                }
                aria-label={label}
                placeholder={placeholder}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActive(0);
                }}
                onKeyDown={onKeyDown}
                className="h-11 w-full min-w-0 border-0 bg-transparent text-sm text-ink placeholder:text-faint"
              />
            </div>

            {filtered.length > 0 ? (
              <div
                role="listbox"
                id={listId}
                aria-label={label}
                className="max-h-80 overflow-y-auto p-1"
              >
                {filtered.map((item, index) => {
                  const selected = index === active;

                  return (
                    <div
                      key={item.id}
                      id={`${id}-option-${item.id}`}
                      role="option"
                      tabIndex={-1}
                      aria-selected={selected}
                      data-active={selected ? "" : undefined}
                      onMouseEnter={() => setActive(index)}
                      onClick={() => choose(item)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          choose(item);
                        }
                      }}
                      className={cn(
                        "flex cursor-default items-center gap-2 border border-transparent px-2 py-1.5 text-xs",
                        selected
                          ? "border-primary-strong bg-selection text-primary-strong"
                          : "text-ink",
                      )}
                    >
                      {item.icon ? (
                        <span aria-hidden="true" className="shrink-0 text-muted">
                          {item.icon}
                        </span>
                      ) : null}
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-semibold">{item.label}</span>
                        {item.description ? (
                          <span className="block truncate text-2xs text-muted">
                            {item.description}
                          </span>
                        ) : null}
                      </span>
                      {item.group ? (
                        <span className="shrink-0 text-2xs text-faint">{item.group}</span>
                      ) : null}
                      {item.shortcut ? (
                        <kbd className="shrink-0 border border-rule bg-tint px-1 font-mono text-2xs text-muted">
                          {item.shortcut}
                        </kbd>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="px-[var(--koten-panel-p)] py-4 text-xs text-muted">{emptyLabel}</p>
            )}

            <div className="border-t border-rule bg-tint px-[var(--koten-panel-p)] py-1.5 text-2xs text-faint">
              {hint}
            </div>
          </BaseDialog.Popup>
        </BaseDialog.Viewport>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}
