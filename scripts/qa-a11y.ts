/**
 * Auditoría de accesibilidad en navegador real (`F4-002`).
 *
 * Sobre Chromium headless, vía CDP, para cada app, ruta e idioma:
 *
 * - **axe-core** con las reglas WCAG 2.0/2.1 A y AA, incluido `color-contrast`
 *   calculado con los estilos computados (jsdom no puede).
 * - **Tipografía mínima**: ningún nodo de texto visible por debajo de 12 px.
 * - **Foco visible**: recorre con `Tab` los primeros elementos interactivos y exige
 *   `outline` o `box-shadow` en `:focus-visible`.
 *
 * Uso: `bun scripts/qa-a11y.ts [--json] [--only storefront,erp] [--tabs=15]`
 * Requiere Chromium en `PATH` y `bun run dev` en marcha.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { launchChromium, sleep } from "./lib/cdp";

type AppId = "catalog" | "storefront" | "erp";

type Page = {
  app: AppId;
  label: string;
  path: string;
  /** Acción previa a la auditoría para cubrir un estado (drawer, popup…). */
  open?: string;
  /** Selector que debe existir tras `open`; si no, la medición no es válida. */
  expect?: string;
  /** Tema forzado en la URL (por ejemplo `sumi`). */
  theme?: string;
};

type AxeViolation = {
  id: string;
  impact: string | null;
  help: string;
  nodes: { target: string; html: string; summary: string }[];
};

type FontOffender = { selector: string; text: string; size: number };

type FocusResult = {
  tag: string;
  name: string;
  indicator: string;
  visible: boolean;
  html: string;
};

const apps: Record<AppId, { origin: string; locales: readonly string[] }> = {
  catalog: { origin: "http://localhost:5173", locales: ["es", "ja", "en"] },
  storefront: { origin: "http://localhost:5174", locales: ["ja", "es", "en"] },
  erp: { origin: "http://localhost:5175", locales: ["es", "ja", "en"] },
};

const pages: readonly Page[] = [
  { app: "catalog", label: "portada", path: "/" },
  { app: "catalog", label: "empezar", path: "/start" },
  { app: "catalog", label: "formularios", path: "/components/forms" },
  { app: "catalog", label: "fecha", path: "/components/date" },
  {
    app: "catalog",
    label: "command (abierta)",
    path: "/components/command",
    open: 'document.querySelector("article button").click()',
    expect: '[role="dialog"]',
  },
  { app: "catalog", label: "datos", path: "/components/data" },
  { app: "catalog", label: "overlays", path: "/components/overlays" },
  { app: "catalog", label: "patrones", path: "/patterns/storefront" },
  { app: "catalog", label: "tokens", path: "/tokens/format" },
  { app: "storefront", label: "producto", path: "/" },
  { app: "erp", label: "dashboard", path: "/" },
  { app: "erp", label: "pedidos", path: "/orders" },
  {
    app: "erp",
    label: "pedidos + drawer",
    path: "/orders",
    open: 'document.querySelector("[aria-haspopup=\\"dialog\\"]").click()',
    expect: '[role="dialog"]',
  },
  { app: "erp", label: "nuevo pedido", path: "/orders/new" },
  {
    app: "catalog",
    label: "datos (Sumi)",
    path: "/components/data",
    theme: "sumi",
  },
  { app: "storefront", label: "producto (Sumi)", path: "/", theme: "sumi" },
  { app: "erp", label: "pedidos (Sumi)", path: "/orders", theme: "sumi" },
  {
    app: "erp",
    label: "nuevo pedido + select",
    path: "/orders/new",
    open: 'document.querySelector("[data-slot=\\"select-trigger\\"]").click()',
    expect: '[data-slot="select-popup"]',
  },
];

const viewports = [
  { width: 1440, height: 900 },
  { width: 390, height: 844 },
] as const;

const axeRun = `(async () => {
  if (typeof window.axe === "undefined") {
    throw new Error("axe-core no está cargado");
  }

  // Base UI dibuja "focus guards" internos (span aria-hidden + tabindex=0) para
  // detectar la salida del foco. Son plumbing del componente, no contenido:
  // se excluyen de la regla estrecha en lugar de desactivarla (D-028).
  const results = await window.axe.run(
    { include: [document], exclude: [["[data-base-ui-focus-guard]"]] },
    {
      resultTypes: ["violations"],
      runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] },
    },
  );

  return results.violations.map((violation) => ({
    id: violation.id,
    impact: violation.impact,
    help: violation.help,
    nodes: violation.nodes.slice(0, 3).map((node) => ({
      target: node.target.join(" "),
      html: node.html.slice(0, 140),
      summary: node.failureSummary || "",
    })),
  }));
})()`;

const fontScan = `(() => {
  const offenders = [];
  const seen = new Set();
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const describe = (element) => {
    const parts = [element.tagName.toLowerCase()];
    if (element.dataset?.slot) parts.push('[data-slot="' + element.dataset.slot + '"]');
    if (element.id) parts.push("#" + element.id);
    return parts.join("");
  };

  while (walker.nextNode()) {
    const node = walker.currentNode;
    const text = (node.nodeValue || "").trim();
    const element = node.parentElement;
    if (!text || !element || seen.has(element)) continue;
    seen.add(element);
    if (element.closest('[aria-hidden="true"]')) continue;

    const style = getComputedStyle(element);
    if (style.clipPath !== "none" || style.visibility === "hidden") continue;
    if (element.checkVisibility && !element.checkVisibility({ checkOpacity: true })) continue;
    if (element.getClientRects().length === 0) continue;

    const size = Number.parseFloat(style.fontSize);
    if (size < 12) offenders.push({ selector: describe(element), text: text.slice(0, 40), size });
  }

  return offenders.slice(0, 12);
})()`;

const focusInfo = `(() => {
  const element = document.activeElement;
  if (!element || element === document.body || element === document.documentElement) return null;
  // Solo el foco de teclado dispara :focus-visible; el foco programático de un focus
  // guard o del initialFocus de un popup no exige indicador (WCAG 2.4.7).
  if (!element.matches(":focus-visible")) return null;

  const style = getComputedStyle(element);
  const outlineWidth = Number.parseFloat(style.outlineWidth) || 0;
  const hasOutline = style.outlineStyle !== "none" && outlineWidth >= 1;
  const hasShadow = style.boxShadow !== "none";
  const name = (element.getAttribute("aria-label") || element.textContent || "").trim();

  return {
    tag: element.tagName.toLowerCase(),
    name: name.slice(0, 40),
    indicator: hasOutline ? "outline " + outlineWidth + "px" : hasShadow ? "shadow" : "none",
    visible: hasOutline || hasShadow,
    html: element.outerHTML.slice(0, 160),
  };
})()`;

async function run() {
  const args = new Set(process.argv.slice(2));
  const asJson = args.has("--json");
  const only = process.argv.find((argument) => argument.startsWith("--only"))?.split("=")[1];
  const selected = only ? new Set(only.split(",")) : null;
  const tabCount = Number(
    process.argv.find((argument) => argument.startsWith("--tabs"))?.split("=")[1] ?? 15,
  );
  const axeSource = readFileSync(join(process.cwd(), "node_modules/axe-core/axe.min.js"), "utf8");
  const { cdp, close } = await launchChromium(9334);

  const report: Array<{
    page: string;
    locale: string;
    width: number;
    violations: AxeViolation[];
    fonts: FontOffender[];
    focusTotal: number;
    focusHidden: FocusResult[];
  }> = [];
  let failures = 0;

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
        for (const viewport of viewports) {
          await send("Emulation.setDeviceMetricsOverride", {
            width: viewport.width,
            height: viewport.height,
            deviceScaleFactor: 1,
            mobile: viewport.width < 500,
          });

          const target = new URL(page.path, config.origin);
          target.searchParams.set("lang", locale);
          if (page.theme) target.searchParams.set("theme", page.theme);
          const url = target.href;
          const loaded = cdp.once("Page.loadEventFired").catch(() => undefined);
          await send("Page.navigate", { url });
          await loaded;
          await sleep(400);

          let scenarioError = "";

          if (page.open) {
            await send("Runtime.evaluate", { expression: page.open });
            await sleep(350);

            if (page.expect) {
              const { result: opened } = await send<{ result: { value?: boolean } }>(
                "Runtime.evaluate",
                {
                  expression: `!!document.querySelector(${JSON.stringify(page.expect)})`,
                  returnByValue: true,
                },
              );

              if (!opened.value) scenarioError = `no se abrió ${page.expect}`;
            }
          }

          await send("Runtime.evaluate", { expression: axeSource });
          const { result: axeResult } = await send<{
            result: { value?: AxeViolation[]; exceptionDetails?: unknown };
          }>("Runtime.evaluate", { expression: axeRun, awaitPromise: true, returnByValue: true });
          const violations = axeResult.value ?? [];

          const { result: fontResult } = await send<{
            result: { value?: FontOffender[] };
          }>("Runtime.evaluate", { expression: fontScan, returnByValue: true });
          const fonts = fontResult.value ?? [];

          const focus: FocusResult[] = [];
          for (let index = 0; index < tabCount; index += 1) {
            for (const type of ["rawKeyDown", "keyUp"]) {
              await send("Input.dispatchKeyEvent", {
                type,
                key: "Tab",
                code: "Tab",
                windowsVirtualKeyCode: 9,
                nativeVirtualKeyCode: 9,
              });
            }

            const { result } = await send<{ result: { value?: FocusResult | null } }>(
              "Runtime.evaluate",
              { expression: focusInfo, returnByValue: true },
            );

            if (result.value) focus.push(result.value);
          }

          const focusHidden = focus.filter((item) => !item.visible);
          const serious = violations.filter(
            (violation) => violation.impact === "serious" || violation.impact === "critical",
          );
          const key = `${page.app}:${page.label}`;

          report.push({
            page: key,
            locale,
            width: viewport.width,
            violations,
            fonts,
            focusTotal: focus.length,
            focusHidden,
          });

          if (serious.length > 0 || fonts.length > 0 || focusHidden.length > 0 || scenarioError) {
            failures += 1;
          }

          if (!asJson) {
            const status =
              serious.length > 0 || fonts.length > 0 || focusHidden.length > 0 ? "FALLA" : "ok";
            console.log(
              `${status.padEnd(5)} ${key} ${locale} ${viewport.width}px · axe ${violations.length} (serious ${serious.length}) · <12px ${fonts.length} · foco ${focus.length - focusHidden.length}/${focus.length}`,
            );

            if (scenarioError) console.log(`      escenario: ${scenarioError}`);

            for (const violation of violations) {
              console.log(`      axe ${violation.impact} ${violation.id}: ${violation.help}`);
              for (const node of violation.nodes.slice(0, 2)) {
                console.log(`        ${node.target}`);
                console.log(`          ${node.html}`);
                console.log(`          ${node.summary.replace(/\n/g, " ")}`);
              }
            }

            for (const item of fonts.slice(0, 3)) {
              console.log(`      fuente ${item.size}px ${item.selector} "${item.text}"`);
            }

            for (const item of focusHidden.slice(0, 3)) {
              console.log(`      foco sin indicador: ${item.tag} "${item.name}" ${item.indicator}`);
              console.log(`        ${item.html}`);
            }
          }
        }
      }
    }

    if (asJson) console.log(JSON.stringify(report, null, 2));
  } finally {
    close();
  }

  const totalSerious = report
    .flatMap((item) => item.violations)
    .filter(
      (violation) => violation.impact === "serious" || violation.impact === "critical",
    ).length;

  console.log(
    `\na11y: ${report.length} páginas · ${totalSerious} violaciones serious/critical · ` +
      `${report.flatMap((item) => item.fonts).length} textos < 12px · ` +
      `${report.flatMap((item) => item.focusHidden).length} focos sin indicador · ` +
      "focus guards de Base UI excluidos (D-028)",
  );

  if (failures > 0) {
    process.exit(1);
  }
}

await run();
