# Component blueprint

A Koten component is a small, editable file with a stable API. This blueprint is the shape to copy.

## File template

Repository path: `packages/ui/src/components/ui/<name>.tsx`.
Consumer path after installation: `components/ui/<name>.tsx` (or the `aliases.ui` target).

```tsx
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "../../lib/cn";

export const noticeVariants = cva(
  "flex items-start gap-2 border border-rule bg-surface p-[var(--koten-panel-p)] text-xs",
  {
    variants: {
      tone: {
        neutral: "border-s-rule-strong",
        info: "border-s-info",
        warning: "border-s-warning",
        danger: "border-s-danger",
      },
    },
    defaultVariants: {
      tone: "neutral",
    },
  },
);

export type NoticeProps = ComponentProps<"div"> &
  VariantProps<typeof noticeVariants> & {
    title?: string;
  };

export function Notice({ className, tone, title, children, ...props }: NoticeProps) {
  const role = tone === "danger" || tone === "warning" ? "alert" : "status";

  return (
    <div
      role={role}
      data-slot="notice"
      data-tone={tone}
      className={cn(noticeVariants({ tone }), className)}
      {...props}
    >
      <div className="min-w-0 flex-1">
        {title ? <p className="font-semibold text-ink">{title}</p> : null}
        {children ? <div className={cn("text-muted", title && "mt-0.5")}>{children}</div> : null}
      </div>
    </div>
  );
}
```

What matters:

- **Named export** and an exported props type.
- **`data-slot`** on the root (and on internal slots when useful).
- **CVA** for variants and sizes; `cn()` merges `className` last.
- **Semantic roles** in classes: `border-rule`, `bg-surface`, `text-muted`, `border-s-info`.
- **Logical properties** (`border-s-*`, `ps-*`, `text-start`) so RTL mirrors.
- **No strings**: the title and children come from props; labels come from `KotenProvider`.
- **No hardcoded values** for colors, font sizes, radii or shadows. Use tokens and the `--koten-*` variables.
- **`role`** chosen by meaning: `alert` for warning/danger, `status` for informational.

## Composition with Base UI

When a Base UI primitive exists, wrap it instead of recreating behavior. Button is the reference:

```tsx
import { Button as BaseButton } from "@base-ui/react/button";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/cn";

export const buttonVariants = cva("...", {
  variants: {
    variant: {
      primary: "border-primary-strong bg-primary text-primary-foreground hover:bg-primary-hover",
      secondary: "border-rule-strong bg-surface text-ink hover:bg-tint",
      danger: "border-danger-strong bg-danger-solid text-solid-fg",
    },
    size: {
      sm: "px-2 text-xs",
      md: "px-[var(--koten-control-px)] text-sm",
    },
  },
  defaultVariants: { variant: "secondary", size: "md" },
});

export function Button({ className, variant, size, render, ...props }: ButtonProps) {
  return (
    <BaseButton
      data-slot="button"
      nativeButton={props.nativeButton ?? render === undefined}
      render={render}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
```

- Use the Base UI `render` prop for composition. **Never `asChild`.**
- When a button renders a link, pass `nativeButton={false}`.
- Do not clone children or inject props implicitly. The consumer passes props.
- If Base UI does not cover the case, use native HTML and document that choice in the catalog page.

## Requirements to document

Every component page declares these when they apply:

| Kind | What to say |
| --- | --- |
| `provider` | Needs `KotenProvider` for labels, locale or formatters. |
| `hook` | Needs a hook such as `useToast` inside a provider. |
| `controlled` | Supports or requires `value`/`onValueChange`. |
| `portal` | Renders into a portal; overlays need it. |
| `client` | Requires a client boundary in frameworks with RSC. |
| `dependency` | Needs a package such as `@tanstack/react-table`. |

## Test template

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Notice } from "./notice";

describe("Notice", () => {
  it("renders a status with its title and text", () => {
    render(<Notice title="Stock bajo">Quedan 3 unidades.</Notice>);

    expect(screen.getByRole("status")).toHaveTextContent("Stock bajo");
    expect(screen.getByRole("status")).toHaveTextContent("Quedan 3 unidades.");
  });

  it("uses alert for danger", () => {
    render(<Notice tone="danger" title="Error" />);

    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("keeps the data slot and merges className", () => {
    const { container } = render(<Notice className="mt-4" />);
    const root = container.querySelector("[data-slot='notice']");

    expect(root).toHaveClass("mt-4");
    expect(root).toHaveAttribute("data-tone", "neutral");
  });
});
```

Add tests for keyboard and focus when the component is interactive. Overlays need Escape, focus trap and focus return. Composite widgets need arrow keys.

## Documentation and registry

1. **Doc data**: add the primitive to the matching group in `apps/catalog/src/data/docs/` or a block to `apps/catalog/src/data/blocks/`.
2. **Copy**: description, examples, props and accessibility in ES/JA/EN.
3. **Files**: list every installed file, including the `lib/koten` core.
4. **Registry**: if the file is a new registry item, make sure the build sees it; otherwise it travels inside the existing item (for example `FormRow` inside `field`).
5. **Agent layer**: run `bun run ai:docs`. Then `bun run ai:check`.
6. **Page**: verify `/components/<slug>` or `/blocks/<category>/<slug>` renders installation, preview/code, props and a11y.

## Quality gate

- [ ] `bun run check` passes (Biome, TypeScript, i18n guard, tests).
- [ ] `bun run build` passes and the budget is respected.
- [ ] `bun run ai:check` passes.
- [ ] axe has no `serious` or `critical` findings.
- [ ] Keyboard path, visible focus and Escape where relevant.
- [ ] 12 px floor and AA contrast in all themes.
- [ ] ES/EN at 1024 px without clipping; mobile does not break.
- [ ] No new dependency without a recorded decision.
- [ ] The catalog page and the machine-readable Markdown are updated.
- [ ] The component can be installed by URL and compiles in a consumer project.
