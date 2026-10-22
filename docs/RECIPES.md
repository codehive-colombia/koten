# Recetas — Koten UI

> Copiar, adaptar, verificar. Cada receta usa la API real de `packages/ui` y asume
> los estilos de `tokens.css` + `globals.css` ya importados y la app envuelta en
> `KotenProvider` (ver [Empezar](/start) en el catálogo y `apps/catalog/src/pages/start.tsx`).
>
> Este documento está en español por `D-008`; el catálogo y las demos están en ES/JA/EN.
>
> Los ejemplos usan el idioma del producto. El japonés del catálogo es lenguaje visual de la documentación interna, no un requisito de consumo: no agregues texto japonés, kanji, etiquetas `jp`, Tategaki, Hanko ni Pattern a tu UI salvo que el usuario lo pida (`R-031`).

## 0. Base mínima

```bash
bun add @base-ui/react class-variance-authority clsx tailwind-merge lucide-react
bun add -d tailwindcss @tailwindcss/vite
```

```tsx
// src/main.tsx
import "./styles/globals.css";
import { KotenProvider } from "./components/ui";

createRoot(document.getElementById("root")!).render(
  <KotenProvider locale="es">
    <App />
  </KotenProvider>,
);
```

`KotenProvider` aporta labels, locale y formateadores. Tema y densidad se leen de
`<html data-theme="chirashi|daicho|kanso" data-density="compact|default|comfortable">`.

---

## 1. Formulario con validación y errores vinculados

```tsx
import { Button, Field, Input, Select, Textarea } from "./components/ui";

const warehouses = [
  { value: "tokio", label: "Tokio" },
  { value: "osaka", label: "Osaka" },
];

function OrderForm() {
  const [warehouse, setWarehouse] = useState("tokio");
  const error = warehouse ? undefined : "Selecciona un almacén.";

  return (
    <form onSubmit={submit} className="grid gap-[var(--koten-gap)]">
      <Field label="Cliente" required description="Nombre o razón social.">
        <Input name="customer" autoComplete="organization" />
      </Field>

      <Field label="Correo" required error={emailError}>
        <Input name="email" type="email" autoComplete="email" />
      </Field>

      <Field label="Almacén de salida" required error={error}>
        <Select
          label="Almacén de salida"
          items={warehouses}
          value={warehouse}
          onValueChange={(value) => setWarehouse(value ?? "")}
          error={error}
        />
      </Field>

      <Field label="Notas de entrega">
        <Textarea name="notes" rows={4} />
      </Field>

      <Button type="submit" variant="primary">
        Registrar pedido
      </Button>
    </form>
  );
}
```

Reglas:

- El `label` visible es obligatorio; `Field` conecta label, description y error con
  `aria-describedby`.
- El error se muestra **y** se pasa al control (`error`), no solo al texto.
- Un resumen de errores enfocable (`role="alert"`, `tabIndex={-1}`) ayuda cuando hay
  varios campos; ver `apps/erp/src/pages/order-form.tsx`.
- Validación nativa primero (`required`, `type="email"`); no dupliques reglas.

---

## 2. Tabla densa

```tsx
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./components/ui";

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
        <TableCell className="text-end tabular-nums">{formatters.formatCurrency(order.total)}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

- Números con `tabular-nums` y `text-end`.
- Identificadores con `whitespace-nowrap`.
- La tabla ya envuelve el scroll horizontal en una región enfocable.

---

## 3. `DataTable` con paginación y selección

```tsx
const columns: DataTableColumn<Order>[] = [
  { id: "id", header: "Pedido", cell: (row) => row.id, sortValue: (row) => row.id },
  { id: "customer", header: "Cliente", cell: (row) => row.customer, sortValue: (row) => row.customer },
  {
    id: "total",
    header: "Total",
    align: "right",
    cell: (row) => formatters.formatCurrency(row.total),
    sortValue: (row) => row.total,
  },
];

<DataTable
  data={orders}                 // misma referencia entre renders; no la copies
  columns={columns}
  getRowId={(row) => row.id}
  caption="Pedidos de KURA"
  emptyLabel="Sin pedidos."
  previousLabel="Anterior"
  nextLabel="Siguiente"
  paginationLabel="Paginación de pedidos"
  selectAllLabel="Seleccionar todos"
  selectRowLabel={(id) => `Seleccionar ${id}`}
  selectedLabel={(count) => `${count} seleccionados`}
/>
```

`DataTable` usa TanStack Table y vive solo en el ERP (`D-013`). El estado de filtros
va en la URL, no en memoria (`D-023`).

---

## 4. Drawer de detalle

```tsx
<DetailDrawer
  trigger={<Button variant="ghost" size="xs">Ver</Button>}
  title={`Pedido ${order.id}`}
  description="Detalle y trazabilidad"
  status={<StatusBadge status={order.status} label="Enviado" />}
  summary={<p className="text-xs">{order.customer}</p>}
  closeLabel="Cerrar detalle"
  footer={<Button variant="primary">Preparar envío</Button>}
>
  <DetailSection title="Líneas">…</DetailSection>
  <DetailSection title="Historial">…</DetailSection>
</DetailDrawer>
```

- `trigger` debe ser un único elemento con foco; el drawer devuelve el foco al cerrar.
- Escape cierra. No anides overlays con `modal` sobre otro `modal`.

---

## 5. Tarjeta de producto y precio

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

<PriceBlock
  price={formatters.formatCurrency(58300, { maximumFractionDigits: 0 })}
  taxLabel="IVA incluido"
  points="583 puntos"
  listPrice={formatters.formatCurrency(63800, { maximumFractionDigits: 0 })}
  listPriceLabel="Precio anterior"
  stock={{ state: "in", label: "En stock" }}
/>
```

- La imagen necesita `width`, `height` y `alt` real; nunca texto dentro del SVG.
- El color de precio/stock sale de roles (`sale`, `success`), no de hex.

---

## 6. i18n y formato

Koten separa tres capas:

| Capa | Dueño | Dónde |
| --- | --- | --- |
| Labels internos (cerrar, buscar…) | Koten | `lib/koten/i18n/messages/*.json` |
| Copy del producto | Tu app | Tus diccionarios o tu librería de i18n |
| Fechas, moneda y números | `Intl` | `useKotenFormatters()` |

El item `koten-i18n` es dependencia de cada componente: instala el runtime y el inglés base. Los packs `koten-i18n-es` y `koten-i18n-ja` agregan solo su JSON; se registran en `lib/koten/i18n/dictionaries.ts`.

```tsx
// copy de la app, tipado por tu propia unión
const copy = {
  es: { save: "Guardar", total: (value: number) => `${value} pedidos` },
  fr: { save: "Enregistrer", total: (value: number) => `${value} commandes` },
} as const;
type AppLocale = keyof typeof copy;

const { locale } = useKoten<string>();
const formatters = useKotenFormatters();
const t = copy[locale as AppLocale] ?? copy.es;

<Button>{t.save}</Button>
<span>{formatters.formatDate(order.date, { dateStyle: "medium" })}</span>
<span>{formatters.formatCurrency(order.total, { maximumFractionDigits: 0 })}</span>
```

- Un locale sin diccionario usa el inglés base; `labels` en `KotenProvider` acepta un diccionario completo o un override parcial.
- `useKoten()` tipa el locale como los diccionarios instalados. Usá `useKoten<string>()` o tu propia unión si leés un idioma sin diccionario.
- Koten no impone un runtime de contenido: si usás i18next, FormatJS o Lingui, ese runtime es la fuente del copy y de los labels.
- ES/JA/EN son los idiomas del catálogo y los diccionarios incluidos, no un requisito del consumidor.
- Ningún componente de `packages/ui` contiene strings: todo entra por props o provider.
- Fechas, moneda y números se formatean con `Intl`, nunca con concatenación ni `toFixed`.
- Nada de utilidades físicas (`text-left`, `pl-2`): usá `text-start`, `ps-2` (`D-026`).

---

## 7. Estados y feedback

```tsx
<Alert tone="warning" title="Stock bajo">Quedan 3 unidades.</Alert>
<EmptyState title="Sin pedidos" action={<Button onClick={clear}>Limpiar filtros</Button>} />
<ToastProvider closeLabel="Cerrar" regionLabel="Notificaciones">…</ToastProvider>
```

- Un toast no reemplaza un error de campo: el error vive junto al campo.
- Usa `aria-live="polite"` para conteos y resultados que cambian sin mover el foco.

---

## 8. Antes de dar por terminado

```bash
bun run check
bun run build && bun run budget
bun run qa:a11y
bun run qa:overflow
bun run qa:perf
```

Checklist corto:

- [ ] Tokens, no colores/tamaños/radios hardcodeados.
- [ ] Teclado completo: Tab, Enter/Space, Escape en overlays, foco visible.
- [ ] Label visible, nombre accesible y `aria-describedby` cuando hay ayuda o error.
- [ ] 12 px mínimo y contraste AA.
- [ ] JA/ES/EN sin recorte ni overflow horizontal a 1024 y 390.
- [ ] Texto real; sin fuentes CJK completas ni texto en imágenes.
- [ ] Prueba de estados vacío, error, carga y deshabilitado.
