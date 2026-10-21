/**
 * QA de desbordamiento horizontal y recorte de texto (`F4-001`/`F4-004`).
 *
 * Levanta Chromium headless contra los servidores de desarrollo (`bun run dev`) y
 * mide, para cada app, ruta, idioma y ancho:
 *
 * - `pageOverflow`: píxeles de scroll horizontal del documento (> 0 es un fallo).
 * - `clipped`: elementos con `overflow: hidden|clip` cuyo contenido no cabe.
 * - `truncated`: elementos con elipsis (`text-overflow: ellipsis`), informativos.
 *
 * Uso: `bun scripts/qa-overflow.ts [--json] [--only storefront,erp]`
 * Requiere Chromium en `PATH` y `bun run dev` en marcha.
 */
import { launchChromium, sleep } from "./lib/cdp";

type AppId = "catalog" | "storefront" | "erp";

type Page = {
  app: AppId;
  label: string;
  path: string;
};

type Measurement = {
  pageOverflow: number;
  clipped: Offender[];
  truncated: Offender[];
  rtlOverflow: number;
  rtlClipped: number;
  lang: string;
};

type Offender = {
  selector: string;
  overflow: string;
  clientWidth: number;
  scrollWidth: number;
  text: string;
};

const apps: Record<AppId, { origin: string; locales: readonly string[] }> = {
  catalog: { origin: "http://localhost:5173", locales: ["es", "ja", "en"] },
  storefront: { origin: "http://localhost:5174", locales: ["ja", "es", "en"] },
  erp: { origin: "http://localhost:5175", locales: ["es", "ja", "en"] },
};

const pages: readonly Page[] = [
  { app: "catalog", label: "portada", path: "/" },
  { app: "catalog", label: "empezar", path: "/start" },
  { app: "catalog", label: "tokens", path: "/tokens/format" },
  { app: "catalog", label: "componentes", path: "/components/data" },
  { app: "catalog", label: "fecha", path: "/components/date" },
  { app: "catalog", label: "command", path: "/components/command" },
  { app: "catalog", label: "patrones", path: "/patterns/storefront" },
  { app: "storefront", label: "producto", path: "/" },
  { app: "erp", label: "dashboard", path: "/" },
  { app: "erp", label: "pedidos", path: "/orders" },
  { app: "erp", label: "nuevo pedido", path: "/orders/new" },
];

const widths = [1440, 1280, 1024, 390] as const;

const measure = `(() => {
  const doc = document.documentElement;
  const body = document.body;
  const pageOverflow = Math.Math.max(0, Math.max(doc.scrollWidth, body ? body.scrollWidth : 0) - window.innerWidth);
  const clipped = [];
  const truncated = [];

  const describe = (element) => {
    const parts = [element.tagName.toLowerCase()];
    if (element.dataset?.slot) parts.push('[data-slot="' + element.dataset.slot + '"]');
    if (element.id) parts.push("#" + element.id);
    return parts.join("");
  };

  for (const element of document.querySelectorAll("body *")) {
    const style = getComputedStyle(element);
    const clientWidth = element.clientWidth;
    const scrollWidth = element.scrollWidth;
    if (clientWidth <= 2 || scrollWidth <= clientWidth + 1) continue;
    // Texto solo para lectores de pantalla (sr-only): 1px + clip, no es recorte visual.
    if (style.clipPath !== "none" || style.clip !== "auto") continue;
    if (style.position === "absolute" && clientWidth <= 2) continue;

    const item = {
      selector: describe(element),
      overflow: style.overflowX,
      clientWidth,
      scrollWidth,
      text: (element.textContent || "").trim().slice(0, 40),
    };

    if (style.overflowX === "hidden" || style.overflowX === "clip") clipped.push(item);
    else if (style.textOverflow === "ellipsis") truncated.push(item);
  }

  return {
    pageOverflow,
    clipped: clipped.slice(0, 6),
    truncated: truncated.slice(0, 6),
    lang: doc.lang,
  };
})()`;

async function run() {
  const args = new Set(process.argv.slice(2));
  const asJson = args.has("--json");
  const only = process.argv.find((argument) => argument.startsWith("--only"))?.split("=")[1];
  const selected = only ? new Set(only.split(",")) : null;
  const results: Array<{ page: string; locale: string; width: number; measurement: Measurement }> =
    [];
  let failures = 0;
  const { cdp, close } = await launchChromium();

  try {
    const { targetId } = await cdp.send<{ targetId: string }>("Target.createTarget", {
      url: "about:blank",
    });
    const { sessionId } = await cdp.send<{ sessionId: string }>("Target.attachToTarget", {
      targetId,
      flatten: true,
    });

    const send = <T>(method: string, params: Record<string, unknown> = {}) =>
      cdp.send<T>(method, params, sessionId);

    await send("Page.enable");
    await send("Runtime.enable");

    for (const page of pages) {
      if (selected && !selected.has(page.app)) continue;

      const config = apps[page.app];

      for (const locale of config.locales) {
        for (const width of widths) {
          await send("Emulation.setDeviceMetricsOverride", {
            width,
            height: width === 390 ? 844 : 900,
            deviceScaleFactor: 1,
            mobile: width === 390,
          });

          const url = `${config.origin}${page.path}?lang=${locale}`;
          const loaded = cdp.once("Page.loadEventFired").catch(() => undefined);
          await send("Page.navigate", { url });
          await loaded;
          await sleep(450);

          const { result } = await send<{
            result: { value?: Omit<Measurement, "rtlOverflow" | "rtlClipped"> };
          }>("Runtime.evaluate", { expression: measure, returnByValue: true });
          const ltr = result.value ?? {
            pageOverflow: 0,
            clipped: [],
            truncated: [],
            lang: locale,
          };

          // RTL best-effort (Q-010): el layout usa propiedades lógicas; comprobamos
          // que espejar el documento no introduce scroll horizontal ni recortes.
          await send("Runtime.evaluate", {
            expression: "document.documentElement.dir = 'rtl'",
          });
          await sleep(150);
          const { result: rtlResult } = await send<{
            result: { value?: { pageOverflow: number; clipped: Offender[] } };
          }>("Runtime.evaluate", { expression: measure, returnByValue: true });
          await send("Runtime.evaluate", {
            expression: "document.documentElement.dir = 'ltr'",
          });

          const measurement: Measurement = {
            ...ltr,
            rtlOverflow: rtlResult.value?.pageOverflow ?? 0,
            rtlClipped: rtlResult.value?.clipped.length ?? 0,
          };
          const key = `${page.app}:${page.label}`;

          results.push({ page: key, locale, width, measurement });

          if (
            measurement.pageOverflow > 0 ||
            measurement.clipped.length > 0 ||
            measurement.rtlOverflow > 0 ||
            measurement.rtlClipped > 0
          ) {
            failures += 1;
          }

          if (!asJson) {
            const status =
              measurement.pageOverflow > 0 ||
              measurement.clipped.length > 0 ||
              measurement.rtlOverflow > 0 ||
              measurement.rtlClipped > 0
                ? "FALLA"
                : "ok";
            const detail = [
              `overflow ${measurement.pageOverflow}px`,
              `clipped ${measurement.clipped.length}`,
              `truncated ${measurement.truncated.length}`,
              `rtl overflow ${measurement.rtlOverflow}px`,
              `rtl clipped ${measurement.rtlClipped}`,
            ].join(" · ");

            console.log(`${status.padEnd(5)} ${key} ${locale} ${width}px · ${detail}`);

            for (const item of [...measurement.clipped, ...measurement.truncated].slice(0, 3)) {
              console.log(
                `      ${item.selector} ${item.clientWidth}→${item.scrollWidth}px "${item.text}"`,
              );
            }
          }
        }
      }
    }

    if (asJson) {
      console.log(JSON.stringify(results, null, 2));
    }

    cdp.close();
  } finally {
    close();
  }

  if (failures > 0) {
    console.error(`\nqa: ${failures} combinaciones con desbordamiento o recorte.`);
    process.exit(1);
  }

  console.log(`\nqa: ${results.length} combinaciones sin desbordamiento ni recorte.`);
}

await run();
