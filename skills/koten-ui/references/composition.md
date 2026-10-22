# Composing Koten UI

Recipes for wiring the system into a real screen. The catalog has the same examples with previews and per-component props.

## App root

```tsx
import { KotenProvider } from "@/lib/koten/i18n/provider";
import "./app.css";

createRoot(root).render(
  <KotenProvider locale="es" currency="EUR">
    <App />
  </KotenProvider>,
);
```

`KotenProvider` supplies labels, locale and `Intl` formatters. It does not own the theme. Set theme and density on the document element so overlays and portalled content inherit them:

```tsx
useEffect(() => {
  document.documentElement.dataset.theme = theme; // chirashi | daicho | kanso | sumi
  document.documentElement.dataset.density = density; // compact | default | comfortable
}, [theme, density]);
```

### Locale and labels

`locale` is any BCP 47 tag (`es`, `ja-JP`, `fr-FR`). The `koten-i18n` dependency installs an English base in `lib/koten/i18n/messages/en.json`; `koten-i18n-es` and `koten-i18n-ja` add their JSON. Register each installed dictionary in `lib/koten/i18n/dictionaries.ts`:

```ts
import en from "./messages/en.json";
import es from "./messages/es.json";

export const labelsByLocale = { en, es } satisfies Record<string, KotenLabels>;
```

The dictionaries are JSON, so `tsconfig.json` needs `resolveJsonModule: true`; Vite and Next enable it by default.

For a locale without a dictionary, pass a full or partial `labels` object. Unknown keys fall back to English:

```tsx
<KotenProvider locale="fr-FR" labels={fr} currency="EUR">
  <App />
</KotenProvider>
```

`useKoten()` types `locale` as the installed dictionaries. Use `useKoten<string>()` or `useKoten<"fr-FR">()` when you read a locale that has no installed dictionary. Koten does not provide a content runtime: your product copy stays in your own dictionaries or i18n library.

## Language and decoration

Koten's Japanese references are visual grammar, not content. Keep the product's language. Do not add Japanese labels, kanji, vertical writing, `Hanko` or `Pattern` unless the user asks for that treatment. `SectionHeader`'s optional `jp` label and the Japanese accents in the catalog are documentation styling, not part of the component contract.

## Page shape

A Koten screen is built from frames, not floating cards:

```tsx
<AppShell sidebar={<SideNav items={items} />} topbar={<TopBar title="Pedidos" />}>
  <PageHeader
    eyebrow="KURA · Operaciones"
    title="Pedidos"
    description="Distribución y seguimiento"
    actions={<Button variant="primary">Nuevo pedido</Button>}
  />
  <Panel>
    <PanelHeader>
      <PanelTitle>Pedidos recientes</PanelTitle>
    </PanelHeader>
    <PanelBody flush>{table}</PanelBody>
  </Panel>
</AppShell>
```

Use `Panel` for framed groups, `SectionHeader` for editorial sections and `Rule` to separate major blocks. Do not wrap everything in rounded cards or add decorative shadows.

## Form

```tsx
<form onSubmit={submit} className="grid gap-[var(--koten-gap)]">
  <Field label="Cliente" required description="Nombre o razón social.">
    <Input name="customer" autoComplete="organization" />
  </Field>

  <Field label="Correo" required error={emailError}>
    <Input name="email" type="email" autoComplete="email" />
  </Field>

  <Field label="Almacén" required error={warehouseError}>
    <Select
      label="Almacén"
      items={warehouses}
      value={warehouse}
      onValueChange={setWarehouse}
      error={warehouseError}
    />
  </Field>

  <Field label="Notas">
    <Textarea name="notes" rows={4} />
  </Field>

  <div className="flex justify-end gap-2">
    <Button type="button" variant="ghost">Cancelar</Button>
    <Button type="submit" variant="primary">Registrar pedido</Button>
  </div>
</form>
```

Rules:

- Visible label always; the accessible name comes from it.
- Pass the same error to `Field` and to the control when the control accepts `error`.
- Native validation first (`required`, `type="email"`); do not duplicate rules in JS.
- With several errors, render a focusable summary (`role="alert"`, `tabIndex={-1}`) before the fields.
- `FormRow` is the horizontal variant; it returns to vertical on mobile.

## Dense table

```tsx
<Panel>
  <PanelHeader>
    <PanelTitle>Pedidos</PanelTitle>
    <PanelActions>
      <Button size="xs" variant="outline">Exportar</Button>
    </PanelActions>
  </PanelHeader>
  <PanelBody flush>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Pedido</TableHead>
          <TableHead>Cliente</TableHead>
          <TableHead className="text-end">Total</TableHead>
          <TableHead>Estado</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="whitespace-nowrap font-mono text-2xs">{order.id}</TableCell>
            <TableCell>{order.customer}</TableCell>
            <TableCell className="text-end tabular-nums">
              {formatters.formatCurrency(order.total)}
            </TableCell>
            <TableCell><StatusBadge status={order.status} /></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </PanelBody>
</Panel>
```

`DataTable` adds sorting, selection and pagination, and can virtualize large sets. Keep the `data` reference stable between renders. Put filters in the URL when the list is a real workspace screen.

## Drawer detail

```tsx
<DetailDrawer
  trigger={<Button size="xs" variant="ghost">Ver</Button>}
  title={`Pedido ${order.id}`}
  description="Detalle y trazabilidad"
  status={<StatusBadge status={order.status} />}
  summary={<p className="text-xs">{order.customer}</p>}
  closeLabel="Cerrar detalle"
  footer={<Button variant="primary">Preparar envío</Button>}
>
  <DetailSection title="Líneas">{lines}</DetailSection>
  <DetailSection title="Historial">{timeline}</DetailSection>
</DetailDrawer>
```

The trigger must be one focusable element. Escape closes and focus returns to the trigger. Do not nest modal overlays.

## Storefront product card

```tsx
<ProductCard
  href="/p/hikari-k1"
  title="HIKARI K-1"
  image={{ src: camera.src, alt: "Cámara compacta HIKARI K-1 en negro", width: 640, height: 480 }}
  price={formatters.formatCurrency(58300, { maximumFractionDigits: 0 })}
  points={formatters.formatNumber(583)}
  meta="Cámaras"
  badges={<Badge tone="new" appearance="solid">Novedad</Badge>}
  rating={{ value: 4.6, reviews: 128, label: "Valoración 4,6 de 5" }}
/>
```

Images need real `width`, `height` and `alt`; never put text inside the image. Price, stock and points use semantic roles (`sale`, `success`), not raw colors.

## Locale and copy

Components do not contain UI strings. Keep copy in a typed dictionary:

```tsx
const copy = {
  es: { save: "Guardar", total: (value: number) => `${value} pedidos` },
  ja: { save: "保存", total: (value: number) => `${value}件` },
  en: { save: "Save", total: (value: number) => `${value} orders` },
} as const;

const { locale } = useKoten();
const formatters = useKotenFormatters();

<Button>{copy[locale].save}</Button>;
```

Dates, money and numbers always go through `useKotenFormatters()`. Use logical CSS properties so the layout mirrors under RTL.
