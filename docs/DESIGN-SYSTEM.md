# Sistema de diseño — Koten UI

> **Tesis:** sencillez de medios, densidad de información.
> La identidad no viene de adornos japoneses, sino de la gramática: marcos, reglas, tipografía, color semántico y ritmo.
> Última actualización: 2026-10-22.

## 1. Los tres registros

| Registro | Uso | Densidad | Color | Tipografía |
| --- | --- | --- | --- | --- |
| **Chirashi** | Storefront, comercio, campañas. | Alta; filas 28–32 px. | Primario shu; acentos matsuri. | Gótica + mincho en titulares. |
| **Daichō** | ERP, backoffice, tablas. | Compacta; filas 28 px. | Primario ai; shu solo para danger. | Gótica; mincho excepcional. |
| **Kanso** | Catálogo, docs, lectura. | Media; filas 32–36 px. | Primario ai; acentos mínimos. | Gótica + mincho editorial. |

Los tres comparten tokens, componentes y reglas. Cambian los valores semánticos, no la estructura.

**Sumi** (墨) es el tema oscuro: invierte papel y tinta, aclara el primario y separa los fondos sólidos de estado (`*-solid` + `solid-fg`) para mantener AA. No es un registro nuevo: es cualquiera de los tres en oscuro.

## 2. Qué tomamos y qué rechazamos

### Tomamos

- **Densidad jerarquizada:** varias columnas, cajas con cabecera, metadatos visibles, listas de avisos fechados.
- **Retórica de confianza:** precio, impuestos, puntos, stock, envío, garantía y especificaciones arriba.
- **Clasicismo de bajo costo:** enlaces subrayados, reglas horizontales, serif para titulares, cero dependencias innecesarias.
- **Chirashi:** color saturado y tipografía gruesa en superficies acotadas (banners, badges, campañas).
- **Tipografía del sistema:** velocidad y cobertura CJK sin fuentes de megabytes.
- **Tategaki y hanko:** como acentos editoriales, no como decoración obligatoria.

### Rechazamos

- Texto crítico dentro de imágenes.
- 10 px y contrastes insuficientes.
- Foco invisible.
- Tablas usadas como layout.
- Ruido sin jerarquía.
- Cerezos, torii, pinceladas y “zen” como sticker pack.
- Carousels infinitos, gradientes por todas partes y tarjetas redondeadas con sombra.
- Copiar el clutter de Yahoo/Rakuten sin criterio de legibilidad.

## 3. Principios

1. **El marco es la unidad.** Panel, cabecera, borde, regla. La página se construye como un periódico o un chirashi.
2. **Densidad con ritmo.** 4/8/12/16; no todo es una tarjeta; el espacio se usa con intención.
3. **El color señala, no decora.** Primario para acción; ai para enlace/navegación; shu para precio/urgencia; matcha/kin para estado.
4. **La tipografía del sistema es una decisión.** No es una limitación; es rendimiento y cobertura.
5. **Lo clásico no es retro.** No imitamos 1998 por nostalgia; conservamos la claridad del marco y la información.
6. **Texto real, siempre.** Nada de texto en imágenes; la accesibilidad y la traducción no se negocian.
7. **Jerarquía sin mayúsculas.** El japonés no tiene capitalización; usamos tamaño, peso, color, borde y posición.
8. **Movimiento mínimo.** Transiciones de color y overlays; nada de rebotes ni scroll-driven.
9. **Desktop primero, mobile legible.** 1280 es el escenario principal; 1024 el mínimo serio; mobile no se rompe.
10. **Accesible por defecto.** 12 px mínimo, AA, foco visible, teclado completo, `prefers-reduced-motion`.

## 4. Tokens

### 4.1 Color primitivo

| Token | Hex | Uso |
| --- | --- | --- |
| `--koten-kinari` | `#F5F0E4` | Fondo de página, papel. |
| `--koten-surface` | `#FFFDF7` | Superficie de panel/tarjeta. |
| `--koten-tint` | `#EFE9DB` | Cabeceras de panel, zebra suave. |
| `--koten-ink` | `#1C1A17` | Texto principal. |
| `--koten-muted` | `#5E574B` | Texto secundario. |
| `--koten-faint` | `#6F675A` | Metadatos, notas (AA sobre papel y tint). |
| `--koten-rule` | `#D6CDBB` | Bordes y reglas decorativas. |
| `--koten-rule-strong` | `#948A75` | Bordes de control (≥ 3:1), reglas fuertes. |
| `--koten-ai` | `#1E3A5F` | Índigo; enlaces, nav, primario Daichō. |
| `--koten-ai-hover` | `#162C49` | Hover de ai. |
| `--koten-ai-tint` | `#E9EEF5` | Fondo seleccionado/info. |
| `--koten-shu` | `#C23B22` | Bermellón; precio, urgencia, primario Chirashi. |
| `--koten-shu-hover` | `#A02F1A` | Hover de shu. |
| `--koten-shu-tint` | `#FBEAE5` | Fondo de error/sale. |
| `--koten-kin` | `#845C0E` | Ocre profundo; warning, sellos (AA como texto). |
| `--koten-matcha` | `#4F6B3A` | Verde; success, stock. |
| `--koten-sumi` | `#24211D` | Tinta fuerte; footer, dark. |

### 4.2 Acentos matsuri (solo Chirashi)

| Token | Hex |
| --- | --- |
| `--koten-accent-blue` | `#0B63B6` |
| `--koten-accent-red` | `#C8102E` |
| `--koten-accent-orange` | `#E07A1F` |
| `--koten-accent-yellow` | `#F2C200` |
| `--koten-accent-green` | `#2E7D4F` |
| `--koten-accent-pink` | `#D6336C` |
| `--koten-accent-purple` | `#6B4C9A` |

Regla: máximo dos acentos por bloque; el amarillo siempre con texto oscuro.

### 4.3 Roles semánticos

| Rol | Chirashi | Daichō | Kanso |
| --- | --- | --- | --- |
| `--bg` | kinari | kinari | kinari |
| `--surface` | surface | surface | surface |
| `--fg` | ink | ink | ink |
| `--fg-muted` | muted | muted | muted |
| `--border` | rule | rule | rule |
| `--primary` | shu | ai | ai |
| `--primary-hover` | shu-hover | ai-hover | ai-hover |
| `--primary-fg` | `#FFFFFF` | `#FFFFFF` | `#FFFFFF` |
| `--link` | ai | ai | ai |
| `--danger` | `#A82C18` | shu | shu |
| `--success` | matcha | matcha | matcha |
| `--warning` | kin | kin | kin |
| `--info` | ai | ai | ai |
| `--sale` | shu | shu | shu |
| `--new` | ai | ai | ai |
| `--focus` | ai | ai | ai |
| `--selection` | ai-tint | ai-tint | ai-tint |

Los componentes usan **roles**, nunca nombres de color. `bg-primary`, no `bg-shu`.

### 4.4 Tipografía

**Familias**

```css
--koten-font-gothic:
  "Hiragino Kaku Gothic ProN", "Hiragino Sans", "Yu Gothic",
  "YuGothic", Meiryo, "Noto Sans JP", system-ui, sans-serif;
--koten-font-mincho:
  "Hiragino Mincho ProN", "Yu Mincho", "Noto Serif JP", Georgia, serif;
--koten-font-mono:
  "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
```

**Escala**

| Token | Tamaño | Uso |
| --- | --- | --- |
| `--text-2xs` | 12 px | Notas, contadores, micro-metadatos (piso de 12 px para todo texto visible). |
| `--text-xs` | 12 px | Metadatos, table headers, captions. |
| `--text-sm` | 13 px | Body, celdas, botones. |
| `--text-base` | 14 px | Body ERP, lectura. |
| `--text-lg` | 16 px | Título de sección. |
| `--text-xl` | 20 px | Título de página. |
| `--text-2xl` | 24 px | Título de producto. |
| `--text-3xl` | 30 px | Hero. |
| `--text-4xl` | 38 px | Display editorial. |

**Interlineado**

- UI/tablas: `1.3–1.5`.
- Body latino: `1.6`.
- Body japonés: `1.7–1.75`.
- Titulares: `1.2–1.35`.

**Pesos:** 400, 500, 600, 700. En CJK, 700 puede engordar demasiado; usar 600 para titulares cuando el sistema lo permita.

**Reglas CJK**

- `line-break: strict;`
- `overflow-wrap: anywhere;` solo en contenedores que lo necesiten; no en celdas numéricas.
- `font-feature-settings: "palt" 1;` solo en titulares.
- No usar `text-transform: uppercase` como recurso de jerarquía: el japonés no tiene mayúsculas.
- Evitar `letter-spacing` en texto japonés; si se usa, máximo `0.02em` y solo en latín.
- Números tabulares: `font-variant-numeric: tabular-nums`.
- Respetar `lang="ja"` para line-height y fuentes.

### 4.5 Espaciado

Escala: `2, 4, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 64`.

- Padding de página: 16 px desktop, 12 px compacto, 24 px amplio.
- Padding de panel: 10/12/16 según densidad.
- Gap de grid: 8/12/16.
- Separación de secciones: 24/32.

### 4.6 Densidad

| Token | Compact | Default | Comfortable |
| --- | --- | --- | --- |
| `--row-h` | 28 px | 32 px | 36 px |
| `--control-h` | 28 px | 32 px | 38 px |
| `--control-px` | 8 px | 10 px | 14 px |
| `--panel-p` | 10 px | 12 px | 16 px |
| `--gap` | 8 px | 12 px | 16 px |

Se aplican con `data-density` en el root. Los componentes leen variables; no reciben `density` por prop.

### 4.7 Forma

- Radios: `0`, `1`, `2`, `3` px. Default `2 px`. Nunca `8+` salvo avatar circular.
- Bordes: `1 px` rule; `1 px` rule-strong en controles; `3 px double` para separar secciones mayores.
- Sombras: solo overlays (`0 8px 24px rgb(28 26 23 / 18%)`). Los paneles no tienen sombra.
- Botones: borde 1 px, radio 2 px, highlight interno de 1 px; sin gradiente.
- Imágenes: borde 1 px, radio 2 px, sin máscaras ni blobs.

### 4.8 Movimiento

- Color/hover: `120 ms ease-out`.
- Overlay: `160 ms`.
- Drawer: `200 ms`.
- Sin bounce, sin parallax, sin scroll-driven.
- `prefers-reduced-motion: reduce` → duración 0.

### 4.9 Layout

- `Container`: `classic` 990, `default` 1200, `wide` 1440, `full`.
- Grid: 12 columnas, gutter 16.
- Storefront: `180px | minmax(0,1fr) | 300px`.
- ERP: `232px | minmax(0,1fr)`.
- Catálogo: `240px | minmax(0,1fr)`.
- Breakpoints: 640, 768, 1024, 1280, 1440.
- `min-width: 0` en hijos de grid/flex.
- Tablas: contenedor con `overflow-x: auto`, header sticky, primera columna sticky en mobile.

## 5. Lenguaje de componentes

### Panel

La unidad básica. Cabecera con fondo tintado, borde inferior, título 12–13 px bold, acciones a la derecha. Body con padding de densidad. Footer con borde superior y acciones.

Variantes: `plain`, `tinted`, `accent` (barra izquierda primaria), `flush` (body sin padding para tablas).

### Rule

- Hairline: 1 px rule.
- Strong: 1 px rule-strong.
- Double: 3 px double rule-strong para secciones mayores.
- Dashed: 1 px dashed para listas secundarias.
- Con label: línea + texto centrado, tipo `― 商品情報 ―`.

### Badge y sello

- Badge: 18–20 px alto, 12 px, radio 2 px, borde 1 px.
- `appearance`: soft, solid, outline.
- `tone`: neutral, info, success, warning, danger, sale, new.
- Estado siempre con texto; el punto de color es un refuerzo, no la única señal.
- Sello `Hanko`: cuadrado, borde 2 px primario, borde interno 1 px, mincho, rotación -2°, 1–4 caracteres. No usar en cada tarjeta.

### Tategaki

`writing-mode: vertical-rl; text-orientation: mixed;` para etiquetas editoriales y laterales. Ocultar en mobile. Si el texto se repite en horizontal, marcar `aria-hidden`.

### Pattern

Seigaiha o asanoha en SVG/CSS, `currentColor` al 6–10%, solo en bandas decorativas, nunca detrás de texto denso. `aria-hidden="true"`.

### Tablas

- `<table>` semántica, `<caption>` cuando aporte.
- Header 12 px, fondo tint, borde inferior strong.
- Filas 28–32 px, borde dotted/hairline.
- Números a la derecha, tabulares.
- Header sticky en scroll.
- `aria-sort` en columnas ordenables.
- Selección con checkbox y `aria-live` para el conteo.

### Formularios

- Label 12 px 600; control a `--koten-control-h`; hint/error 11–12 px.
- Vertical en storefront; horizontal con label de 140 px en ERP (`FormRow`).
- Error con `aria-invalid`, `aria-describedby` y resumen al inicio.
- `Field` de Base UI para label/description/error; el error externo también fuerza `aria-invalid`.
- `Input` y `Textarea` heredan `required`, `disabled` y el error de `Field`; `Textarea` usa `Field.Control` con `render={<textarea />}`.
- `FormRow` es `Field` horizontal: label de 140 px desde `sm`, vertical en mobile.
- `Label` funciona dentro de `Field` y de forma independiente con `htmlFor`.
- El error se anuncia con `aria-live="polite"`; no usar placeholders como label.

### Feedback

- `Alert`: borde izquierdo de 3 px según tono, icono y texto; info/success usan `status`, warning/danger usan `alert`.
- `Toast`: región `aria-live`, cierre accesible al enfocar y tono con texto; sin depender solo del color.
- `Progress`: valor determinado o `null` para indeterminado; label y valor visibles.
- `Meter`: nivel de stock con tonos success/warning/danger; siempre con texto.
- `Skeleton`: `aria-hidden`; el contenedor anuncia la carga por separado.
- `EmptyState`: caja reglada, heading y una acción explícita.

### Navegación

- Header storefront: utility 28 px + main 72 px + nav 36 px.
- Activo: subrayado 2 px primary o fondo tint.
- ERP sidebar: item 32 px, activo con barra izquierda 2 px y fondo ai-tint.
- Breadcrumb 12 px, separador `/` o `›`; el último item usa `aria-current="page"`.
- Pagination compacta, extremos deshabilitados y labels configurables.
- Tabs y Accordion de Base UI; el panel activo conserva foco y estado.
- IconButton siempre lleva `aria-label`; ToggleGroup usa `aria-pressed`.
- Toolbar usa roving tabindex; los separadores no entran al orden de foco.
- Footer denso en 4 columnas, 12 px, banda sumi.

### Overlays

- Dialog: max 560/720 px, header con borde, footer con acciones.
- Drawer: 480 px, lado derecho por defecto, header sticky, body scroll.
- Menu/Popover: borde 1 px, sombra overlay, sin blur.
- Tooltip: 12 px, fondo ink, texto paper, delay 200 ms.
- Portales: `isolation: isolate` en el root de la app.

## 6. Arquitectura de variantes

### Ejes

| Eje | Dónde vive | Ejemplo |
| --- | --- | --- |
| Tema | `data-theme` en `<html>` | `chirashi`, `daicho`, `kanso`, `sumi` |
| Densidad | `data-density` en `<html>` | `compact`, `default`, `comfortable` |
| Variante | prop `variant` | `primary`, `secondary`, `outline`, `ghost`, `danger`, `link` |
| Tono | prop `tone` | `neutral`, `info`, `success`, `warning`, `danger`, `sale`, `new` |
| Apariencia | prop `appearance` | `soft`, `solid`, `outline` |
| Tamaño | prop `size` | `xs`, `sm`, `md`, `lg` |

No se combinan tema/densidad con variantes. Eso evita `variant="chirashi-compact-primary"`.

### CVA

```tsx
const buttonVariants = cva(
  "inline-flex h-[var(--control-h)] items-center justify-center gap-1.5 rounded-sm border px-[var(--control-px)] text-sm font-semibold leading-none transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "border-primary-strong bg-primary text-primary-foreground hover:bg-primary-hover",
        secondary: "border-rule-strong bg-surface text-ink hover:bg-accent-tint",
        outline: "border-rule-strong bg-transparent text-ink hover:bg-paper-tint",
        ghost: "border-transparent text-ink hover:bg-paper-tint",
        danger: "border-danger-strong bg-danger text-white hover:bg-danger-hover",
        link: "border-transparent text-link underline-offset-2 hover:underline",
      },
      size: {
        xs: "text-2xs",
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: { variant: "secondary", size: "md" },
  },
);
```

Convenciones:

- `cn()` para merge de clases.
- `data-slot="button"` en el elemento raíz.
- `render` prop con `useRender` + `mergeProps` de Base UI.
- Exportar `buttonVariants` para reutilizar en links.
- No usar `@apply` en componentes.
- No hardcodear colores; solo roles semánticos.

### Tailwind v4: bloquear el default

```css
@theme {
  --color-*: initial;
  --radius-*: initial;
  --text-*: initial;

  --color-paper: var(--koten-bg);
  --color-surface: var(--koten-surface);
  --color-ink: var(--koten-fg);
  --color-muted: var(--koten-fg-muted);
  --color-rule: var(--koten-border);
  --color-rule-strong: var(--koten-border-strong);
  --color-primary: var(--koten-primary);
  --color-primary-hover: var(--koten-primary-hover);
  --color-primary-foreground: var(--koten-primary-fg);
  --color-link: var(--koten-link);

  --radius-sm: 2px;
  --radius-md: 3px;

  --text-2xs: 12px;
  --text-xs: 12px;
  --text-sm: 13px;
  --text-base: 14px;
  --text-lg: 16px;
  --text-xl: 20px;
  --text-2xl: 24px;
  --text-3xl: 30px;
}
```

Esto impide que aparezcan `bg-blue-500`, `rounded-xl` o `text-5xl` por accidente.

### Temas

```css
[data-theme="chirashi"] {
  --koten-primary: var(--koten-shu);
  --koten-primary-hover: var(--koten-shu-hover);
  --koten-primary-strong: #8f2815;
}

[data-theme="daicho"] {
  --koten-primary: var(--koten-ai);
  --koten-primary-hover: var(--koten-ai-hover);
  --koten-primary-strong: #142a44;
  --koten-danger: var(--koten-shu);
}

[data-theme="sumi"] {
  color-scheme: dark;
  --koten-bg: #171512;
  --koten-bg-raised: #1f1c18;
  --koten-fg: #f4eee1;
  --koten-primary: #9cc2ef;
  --koten-primary-fg: #14181d;
  /* Los fondos sólidos conservan texto blanco y contraste AA. */
  --koten-danger-solid: #a6331f;
  --koten-success-solid: #3f6b32;
  --koten-warning-solid: #6d5210;
  --koten-info-solid: #2b5a8f;
}
```

### Densidad

```css
[data-density="compact"] {
  --row-h: 28px;
  --control-h: 28px;
  --control-px: 8px;
  --panel-p: 10px;
  --gap: 8px;
}
```

## 7. i18n

Koten separa tres capas y no impone un runtime de contenido:

| Capa | Dueño | Contrato |
| --- | --- | --- |
| Labels internos | Koten | `lib/koten/i18n/messages/*.json`; el inglés es la base. |
| Copy del producto | La app | Diccionarios propios o i18next/FormatJS/Lingui. |
| Fechas, moneda y números | `Intl` | `useKotenFormatters()`. |

- Los componentes no contienen strings de UI. Todo label pasa por props o por `KotenProvider`.
- `locale` acepta cualquier BCP 47 (`es`, `ja-JP`, `fr-FR`). ES/JA/EN son los idiomas del catálogo y los diccionarios incluidos, no un requisito del consumidor (`R-004`, `D-049`).
- El item `koten-i18n` instala el runtime y el inglés base; `koten-i18n-es` y `koten-i18n-ja` agregan su JSON. Cada pack se registra en `lib/koten/i18n/dictionaries.ts`.
- Los diccionarios son JSON: el `tsconfig` del consumidor necesita `resolveJsonModule` (Vite y Next lo traen por defecto).
- `labels` en `KotenProvider` acepta un diccionario completo o un override parcial. La base es el diccionario del locale o, si no existe, el inglés; los overrides se aplican al final.
- `useKoten()` tipa el locale como los diccionarios instalados; para un idioma sin diccionario se usa `useKoten<string>()` o la unión propia de la app.
- Textos internos: cerrar, anterior, siguiente, vacío, cargando, seleccionar, quitar.
- `Intl.DateTimeFormat` y `Intl.NumberFormat`.
- Moneda: JPY sin decimales; EUR/USD con dos. El provider fija `currency` y `timeZone`.
- Fechas: `2026/10/21 (水)` en JA; `21 oct 2026` en ES; `Oct 21, 2026` en EN.
- Calendario japonés (令和) como opción, no por defecto.
- `lang` correcto en `<html>` y en fragmentos; lo declara la app, no el provider.
- Propiedades lógicas (`ms`, `me`, `ps`, `pe`, `start`, `end`) para RTL best-effort.
- Evitar alturas fijas en textos; usar `min-height` y `text-wrap: pretty`.
- Probar ES/EN, que suelen ser más largos que JA.
- No usar mayúsculas como único recurso de jerarquía.

## 8. Accesibilidad

- WCAG 2.2 AA.
- Texto mínimo 12 px; sin excepciones.
- Contraste: ink/paper ~15:1; muted/paper > 6:1; faint/paper y faint/tint > 4.5:1; shu/paper > 5:1; blanco/shu > 5:1; rule-strong/paper ≥ 3:1 en bordes de control.
- Foco visible: `outline: 2px solid var(--focus); outline-offset: 1px`.
- Teclado completo: tabs, menús, diálogos, tablas, formularios.
- `aria-sort`, `aria-current`, `aria-live`, `aria-describedby`, `aria-invalid`.
- Tablas con headers `scope`, caption cuando aporte.
- Diálogos con título/descripción, focus trap, Escape y retorno de foco.
- Formularios con label visible, error vinculado y resumen.
- Estado nunca solo por color: punto + texto.
- `prefers-reduced-motion`.
- Skip link en `AppShell`.
- Imágenes con alt; decorativas con alt vacío.
- No texto en imágenes.

## 9. Performance

- 0 bytes de fuentes CJK; stack del sistema.
- Si hay display: subset Latin < 30 KB o subset exacto de titulares; `font-display: swap`.
- Sin CSS-in-JS runtime.
- Sin librería de charts, carousel, date picker o icon font.
- Lucide con imports por icono.
- TanStack Table solo en ERP.
- Code splitting por ruta.
- Imágenes AVIF/WebP locales, `width`/`height`, lazy bajo el fold.
- El POC usa SVG locales para el producto (`D-022`); son reemplazables por fotografía sin cambiar la API de los patrones.
- `content-visibility: auto` solo si no rompe anclas; medir antes.
- Presupuestos: LCP < 1.5 s local, CLS < 0.02, JS inicial < 150 KB (storefront), < 250 KB (ERP) y < 260 KB (catálogo), JS total del catálogo < 360 KB, CSS < 30 KB.

## 10. Storefront “HIKARI”

### Layout

- Desktop: sidebar 180 + main + rail 300.
- 1024: sidebar colapsa; main + rail.
- Mobile: una columna; rail debajo.

### Orden

1. Utility bar.
2. Header con búsqueda.
3. Nav de categorías.
4. Breadcrumb.
5. Producto: galería + buy box.
6. Avisos / ranking / campaña en rail.
7. Descripción.
8. Specs.
9. Reviews.
10. Relacionados.
11. Footer.

### Buy box

- Título 24 px.
- Rating 12 px.
- Precio 30 px shu, tabular.
- `税込` 12 px.
- Puntos 12 px ai.
- Stock con badge matcha.
- Entrega y garantía en 12 px.
- Variantes con `ToggleGroup` o radios.
- Cantidad con `NumberField`.
- CTA primario shu; secundario outline.
- Nota `※` para condiciones.

### Contenido

- JA por defecto; ES/EN traducidos.
- Fechas reales en avisos.
- Specs en tabla semántica.
- Reviews con distribución y conteo.
- Nada de lorem ipsum.

## 11. ERP “KURA”

### Layout

- Sidebar 232 px + main.
- Topbar 48 px sticky.
- Content padding 16–24.
- Densidad compacta por defecto.

### Dashboard

- 4 KPIs en fila: pedidos hoy, pendientes, ingresos, stock bajo.
- Tabla de pedidos recientes (8 cols).
- Panel de avisos/tareas (4 cols).
- Bar chart de 14 días con fallback accesible.

### Pedidos

- PageHeader con breadcrumb, título y acción primaria.
- FilterBar: búsqueda, estado, fecha, almacén, limpiar.
- DataTable: selección, orden, paginación, acciones masivas.
- Drawer de detalle: cliente, envío, líneas, timeline, acciones.
- Estados: pendiente (kin), preparando (ai), enviado (matcha), cancelado (shu), devuelto (muted).

### Reglas

- Números tabulares y alineados a la derecha.
- Estado con texto + punto.
- Foco vuelve a la fila al cerrar el drawer.
- Filtros en URL.
- Sin backend; datos deterministas.
- ES/JA/EN sin clipping.

## 12. Catálogo

- Formato wiki: sidebar sticky de 220 px + contenido max 900; menú plegable en mobile.
- **Portada (`/`)**: landing editorial del sistema, con layout ancho (sin sidebar de escritorio; header, toggles, menú móvil y footer se conservan). Orden: masthead con hanko, declaración y cifras; placa viva con piezas reales; tres registros con `data-theme` local; índice rápido; sistema en piezas e índice completo; principios y calidad; demos HIKARI y KURA; cierre con instalación por URL.
- La portada usa datos y componentes reales: la placa responde a tema, densidad e idioma; no hay capturas ni texto en imágenes.
- Rutas por fundamento (`/tokens/color`, `/tokens/typography`, …) y por componente (`/components/button`, …).
- **Empezar** separa dos caminos: **usar el sistema** (registry de shadcn, sin clonar el repositorio ni instalar Bun) y **desarrollar el sistema** (monorepo, catálogo, demos, auditorías y registry). Cada camino tiene requisitos, pasos numerados y comandos propios.
- Los comandos de shadcn tienen un selector **npx / bunx** persistente en `localStorage`; la preferencia se comparte entre Empezar, la portada y las páginas de componente y bloque.
- Pager anterior/siguiente y enlaces profundos compartibles.
- Requisitos, accesibilidad e índices se leen como listas con reglas; las tarjetas se reservan para la portada y la navegación (`D-050`).
- Cada componente: instalación, ejemplos, props, accesibilidad e i18n.
- Toggles de tema, densidad e idioma en el header; persistir en URL (`?theme=`, `?density=`, `?lang=`).
- La documentación se mantiene en ES/JA/EN (`D-025`); los artefactos para agentes, en inglés (`D-045`).
- La densidad y el tema afectan el layout, las tablas y el espaciado del catálogo; las muestras comparativas mantienen su valor fijo.
- Botón de copiar código.
- Do/Don’t con ejemplos reales.
- La portada es una landing editorial del sistema, no una página de marketing: sin testimonios, precios inventados, carruseles infinitos, gradientes decorativos ni claims. Las piezas son reales y el copy enlaza a la documentación.

## 13. Do / Don’t

### Do

- Usar paneles con cabecera y borde de 1 px.
- Usar reglas dobles para separar secciones mayores.
- Mostrar fechas, precios, impuestos, stock y garantía.
- Usar tabular nums.
- Usar mincho para titulares editoriales.
- Usar shu para precio/urgencia y ai para enlace/nav.
- Usar badges con texto, no solo color.
- Dejar que el contenido denso respire con reglas y jerarquía.
- Probar con ES/EN y con teclado.

### Don’t

- Tarjetas redondeadas con sombra.
- Botones pill.
- Gradientes decorativos.
- Texto de 10 px.
- Texto en imágenes.
- Carruseles infinitos.
- Iconos de colores sin función.
- Cerezos, torii, pinceladas y “zen” como decoración.
- Ocultar información en “Learn more” por defecto.
- Copiar el clutter sin jerarquía.

## 14. Documentación para agentes

La documentación viva tiene una segunda salida, generada desde la misma fuente, para que un agente lea, instale y extienda el sistema sin adivinar la API. Se organiza en tres niveles.

### 14.1 Lectura

| Artefacto | Ruta | Contenido |
| --- | --- | --- |
| Índice | `/llms.txt` | Resumen del sistema, guías, 46 componentes, 20 bloques y skills. Formato [llmstxt.org](https://llmstxt.org/). |
| Corpus | `/llms-full.txt` | Todo el sistema en un archivo, para una carga completa. |
| Página de componente | `/md/components/<slug>.md` | Instalación, archivos, requisitos, ejemplos, props y a11y. |
| Página de bloque | `/md/blocks/<categoría>/<slug>.md` | Lo mismo para las composiciones. |
| Guías | `/md/guides/design-system.md`, `/md/guides/recipes.md` | Copia de los documentos internos. |

El repositorio también publica un `llms.txt` en la raíz. Las páginas Markdown están en inglés porque las consumen agentes; el catálogo humano sigue en ES/JA/EN y los documentos internos siguen en español (`D-008`, `D-025`). Cada página del catálogo muestra un enlace **Markdown para agentes**.

### 14.2 Skills

Las skills siguen el estándar [Agent Skills](https://agentskills.io/specification) y viven en `skills/`, por lo que `npx skills add codehive-colombia/koten` las descubre sin configuración extra ([guía de creación](https://github.com/vercel-labs/skills/blob/main/docs/creating-skills.md)).

| Skill | Para qué |
| --- | --- |
| `koten-ui` | Elegir, instalar, componer, tematizar y verificar una pantalla con las piezas existentes. |
| `koten-design-system` | Agregar una primitiva o un bloque, crear tokens/temas/densidades dentro del repositorio y aplicar la gramática a un sistema nuevo. |
| `koten-design-language` | Crear una pieza que el catálogo no trae, en cualquier proyecto que ya use Koten: esencia, tokens, marcos, sombras, contraste y accesibilidad. |

Estructura:

- `SKILL.md` corto, con el **qué** y el **cuándo** en `name`/`description`.
- `references/` con el detalle que solo se carga cuando hace falta: inventario, composición, calidad, gramática, blueprint, extensión, tokens y verificación.
- Referencias relativas, sin rutas absolutas ni secretos.
- El inventario y los enlaces a guías se generan; no se editan a mano.
- Cada token `--koten-*` citado por una skill debe existir en `tokens.css`/`globals.css`; `ai:check` falla si una skill inventa uno.

La instalación típica es:

```bash
npx skills add codehive-colombia/koten --list
npx skills add codehive-colombia/koten --skill koten-ui
npx skills add codehive-colombia/koten --skill koten-design-system
npx skills add codehive-colombia/koten --skill koten-design-language
```

### 14.3 Generación y control

- `bun run ai:docs` regenera `apps/catalog/public/llms.txt`, `llms-full.txt`, `md/**` y los archivos rastreados (`llms.txt` raíz y `skills/koten-ui/references/{inventory,guides}.md`).
- `bun run ai:check` falla si un archivo rastreado está desactualizado, si una skill rompe el frontmatter o una referencia relativa, o si cita un token `--koten-*` que el tema no declara. Forma parte de `bun run check`.
- `predev` y `prebuild` del catálogo generan la capa de agentes junto con el registry, así que el sitio y la imagen de producción nunca publican documentación vieja.
- El catálogo tiene una página `/ai` con los tres niveles, los comandos y el enlace a los artefactos.

---

## 15. Checklist de revisión visual

- [ ] ¿Se entiende la jerarquía en 3 segundos?
- [ ] ¿Hay algún texto menor a 12 px?
- [ ] ¿El foco es visible en todos los controles?
- [ ] ¿El color de estado tiene texto además del color?
- [ ] ¿Los números son tabulares y están alineados?
- [ ] ¿Los bordes son de 1 px y los radios ≤ 3 px?
- [ ] ¿Hay sombras fuera de overlays?
- [ ] ¿El layout aguanta ES/EN a 1024 px?
- [ ] ¿La página se puede recorrer con teclado?
- [ ] ¿Hay texto crítico en imágenes?
- [ ] ¿Se cargó alguna fuente CJK?
- [ ] ¿El resultado se siente como un sistema, no como un collage de referencias?
