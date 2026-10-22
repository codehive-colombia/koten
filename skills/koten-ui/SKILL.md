---
name: koten-ui
description: Consume Koten UI, a copy-in React component system with a shadcn registry, tokens, themes and densities. Use when building or changing a screen that should use Koten primitives or blocks, choosing a component for forms, tables, overlays, commerce or back office, installing koten-theme, or adapting a Koten component to an existing React project. Covers the 46 primitives, 20 blocks, accessibility rules and ES/JA/EN wiring.
metadata:
  author: codehive-colombia
  version: "1.0"
---

# Consume Koten UI

Koten UI is a **copy-in** React component system, not an npm package. Components come from a shadcn registry and live in the consumer's repository so they can be adapted. The visual grammar is classical Japanese web design: warm paper, 1 px frames, dense information, semantic color roles, system fonts and a 12 px typographic floor.

## When to use this skill

- A screen must look and behave like Koten UI (`Chirashi`, `Daichō` or `Kanso`).
- You need to pick a primitive or a pre-assembled block.
- You are installing Koten into a project with `npx shadcn@latest add`.
- You are wiring `KotenProvider`, theme tokens, density or locale.
- A Koten component needs an adaptation without breaking its API.

Do **not** use it to invent a new Koten primitive or to redesign the token system. Use `koten-design-system` for that.

## Workflow

1. **Read the inventory** in [references/inventory.md](references/inventory.md). Pick the closest primitive or block before writing markup.
2. **Read the page** for that item. Use the Markdown endpoint when you need the full API, for example `https://koten.codehive.com.co/md/components/button.md`, or `llms.txt` for the index.
3. **Install the theme first** in a project that has no Koten tokens:
   ```bash
   npx shadcn@latest add https://koten.codehive.com.co/r/koten-theme.json
   ```
   The item writes tokens, themes and density into the `tailwind.css` declared in `components.json`. It does not create a `styles/` folder.
4. **Install the item** from the registry:
   ```bash
   npx shadcn@latest add https://koten.codehive.com.co/r/button.json
   ```
   Targets use the project aliases (`@/components/ui`, `@/components/patterns`, `@/lib/koten`).
5. **Wire the provider** once at the app root. Components depend on `koten-i18n`, which installs `lib/koten/i18n` with an English base. `locale` accepts any BCP 47 tag; install `koten-i18n-es` or `koten-i18n-ja` only if you want those dictionaries, then register them in `lib/koten/i18n/dictionaries.ts`. The examples use the canonical `@/` alias; your `components.json` may use `~/` or another prefix:
   ```tsx
   import { KotenProvider } from "@/lib/koten/i18n/provider";

   <KotenProvider locale="es">{children}</KotenProvider>;
   ```
6. **Compose** with the documented props. Prefer blocks for whole screens, primitives for single controls.
7. **Verify** the result with [references/quality.md](references/quality.md).

### Custom theme without leaving the grammar

When a project needs its own surface values, do not hand-edit the token file. Open the theme designer at `https://koten.codehive.com.co/theme`, choose a register, one palette pigment, a paper step, a radius and a density, and export the `:root` overlay. The designer validates 11 AA pairs and blocks the export when one fails. Paste the overlay at the end of the `tailwind.css` file, after `koten-theme`. It does not expose free colors, fonts, spacing, shadows or motion; if the design needs those, it is a new system, not a Koten theme.

## Non-negotiable rules

- Use tokens and semantic roles. Never hardcode hex colors, font sizes, radii or shadows.
- Keep the public API: named exports, `data-slot`, CVA variants and documented props.
- Never use `asChild`. Composition uses the Base UI `render` prop; pass `nativeButton={false}` when a button renders a link.
- Theme and density are attributes, not props: `data-theme="chirashi|daicho|kanso|sumi"` and `data-density="compact|default|comfortable"`.
- The 12 px floor is real. Do not add `text-[10px]` or smaller.
- Focus must stay visible. Do not add `outline: none` without a replacement.
- No strings inside `packages/ui` components. Labels come from props or from `KotenProvider`.
- `locale` is any BCP 47 tag; ES/JA/EN are the catalog languages and optional dictionaries, not a requirement. A locale without a dictionary falls back to English or to the `labels` you pass.
- Dates, currency and numbers use the provider formatters (`Intl`), never concatenation or `toFixed`.
- Logical properties only: `text-start`, `ps-*`, `pe-*`, `border-s-*`, `start-*`/`end-*`.
- Real text, never text inside images. No full CJK font downloads.
- **Japanese is opt-in.** Koten's Japanese references are visual grammar, not content. Do not add Japanese text, kanji, `jp` labels, Tategaki, Hanko or Pattern to a consumer's UI unless the user explicitly asks for that treatment. Use the product's language; the catalog's Japanese labels are documentation styling.
- If a component needs a provider, hook, portal, controlled state or dependency, its catalog page says so under **Requirements**. Respect it.

## Choosing the right piece

| Need | Use |
| --- | --- |
| Primary or secondary action | `Button`; `IconButton` for icon-only actions |
| Label, help and error for a control | `Field` (vertical) or `FormRow` (horizontal) |
| Select, search, number, date | `Select`, `Combobox`, `NumberField`, `DatePicker` |
| Dense records | `Table` for static tables; `DataTable` for sort, selection and pagination |
| Edit without leaving the list | `Drawer` or `DetailDrawer` |
| Confirm or block | `Dialog` |
| Contextual actions | `Menu`; `Tooltip` only for hints, never for critical information |
| Status | `Badge` or `StatusBadge` with text, never color alone |
| Whole storefront product page | Blocks under `storefront` |
| Whole back office shell or order table | Blocks under `erp` |

## Common tasks

### Form field

```tsx
<Field label="Cliente" required description="Nombre o razón social." error={error}>
  <Input name="customer" autoComplete="organization" />
</Field>
```

The error must reach both the message and the control (`Field` handles `aria-describedby` and `aria-invalid`).

### Dense table

```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Pedido</TableHead>
      <TableHead className="text-end">Total</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {orders.map((order) => (
      <TableRow key={order.id}>
        <TableCell className="whitespace-nowrap font-mono text-2xs">{order.id}</TableCell>
        <TableCell className="text-end tabular-nums">
          {formatters.formatCurrency(order.total)}
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

### Drawer with focus return

`DetailDrawer` takes a single focusable `trigger`. Escape closes it and focus returns to the trigger. Do not nest two modal overlays.

### Theme switch

```tsx
<html data-theme="daicho" data-density="compact" lang="en">
```

Changing the theme must not require editing component files. If a value is missing, add a token role in `koten-theme`, not a one-off class.

## References

- [references/inventory.md](references/inventory.md) — every component and block with its registry item and catalog page. Generated, do not edit.
- [references/composition.md](references/composition.md) — page skeleton, provider, theme, form, table, drawer and product card.
- [references/quality.md](references/quality.md) — accessibility, i18n and verification checklist.
- [references/guides.md](references/guides.md) — links to the design system, recipes and full documentation.

## Troubleshooting

- **The item installed but styles are missing** — install `koten-theme` and import the `tailwind.css` file in the app entry.
- **The component is unstyled in a shadcn project** — the theme must replace the existing tokens; install `koten-theme` again after changing `components.json`.
- **A provider error appears** — `Toast` needs `ToastProvider`; `ProductCard`, `ReviewSummary`, `BarChart`, `DatePicker` and `Calendar` rely on `KotenProvider`.
- **A row action opens nothing** — check that the overlay is portalled and that the trigger is a single focusable element.
- **Text overflows at 1024 or on mobile** — prefer wrapping and logical spacing over shrinking below 12 px or clipping.
