/**
 * Capturas de QA visual (`F4-004`).
 *
 * Sirve el build con `vite preview`, abre cada ruta en Chromium headless a
 * 1440/1280/1024 y guarda un JPEG en `docs/qa/<fecha>/`. Genera además un
 * `index.md` con la matriz.
 *
 * Uso: `bun run build && bun scripts/qa-visual.ts`
 * Requiere Chromium en `PATH`.
 */
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { launchChromium, sleep } from "./lib/cdp";

type AppId = "catalog" | "storefront" | "erp";

type Shot = { app: AppId; label: string; path: string };

const apps: Record<AppId, { port: number; directory: string }> = {
  catalog: { port: 4173, directory: "apps/catalog" },
  storefront: { port: 4174, directory: "apps/storefront" },
  erp: { port: 4175, directory: "apps/erp" },
};

const shots: readonly Shot[] = [
  { app: "catalog", label: "portada", path: "/" },
  { app: "catalog", label: "empezar", path: "/start" },
  { app: "catalog", label: "formularios", path: "/components/forms" },
  { app: "catalog", label: "patrones", path: "/patterns/storefront" },
  { app: "storefront", label: "producto", path: "/" },
  { app: "erp", label: "dashboard", path: "/" },
  { app: "erp", label: "pedidos", path: "/orders" },
  { app: "erp", label: "formulario", path: "/orders/new" },
];

const viewports = [
  { width: 1440, height: 900 },
  { width: 1280, height: 800 },
  { width: 1024, height: 768 },
] as const;

async function startPreview(app: AppId): Promise<() => void> {
  const config = apps[app];
  const child = spawn("bunx", ["vite", "preview", "--port", String(config.port), "--strictPort"], {
    cwd: join(process.cwd(), config.directory),
    stdio: "ignore",
  });

  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      const response = await fetch(`http://localhost:${config.port}/`);
      if (response.ok) break;
    } catch {
      // El preview todavía no escucha.
    }

    await sleep(150);
  }

  return () => child.kill("SIGTERM");
}

async function run() {
  const date = new Date().toISOString().slice(0, 10);
  const directory = join(process.cwd(), "docs", "qa", date);
  mkdirSync(directory, { recursive: true });

  const stops: Array<() => void> = [];

  for (const app of Object.keys(apps) as AppId[]) {
    stops.push(await startPreview(app));
  }

  const { cdp, close } = await launchChromium(9337);
  const rows: string[] = [];

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

    for (const shot of shots) {
      const config = apps[shot.app];

      for (const viewport of viewports) {
        await send("Emulation.setDeviceMetricsOverride", {
          width: viewport.width,
          height: viewport.height,
          deviceScaleFactor: 1,
          mobile: false,
        });

        const loaded = cdp.once("Page.loadEventFired").catch(() => undefined);
        await send("Page.navigate", {
          url: `http://localhost:${config.port}${shot.path}?lang=es`,
        });
        await loaded;
        await sleep(600);

        const { data } = await send<{ data: string }>("Page.captureScreenshot", {
          format: "jpeg",
          quality: 82,
        });
        const file = `${shot.app}-${shot.label}-${viewport.width}.jpg`;

        writeFileSync(join(directory, file), Buffer.from(data, "base64"));
        rows.push(
          `| ${shot.app} | ${shot.label} | ${viewport.width}×${viewport.height} | \`${file}\` |`,
        );
        console.log(`captura ${file}`);
      }
    }

    const index = [
      `# QA visual · ${date}`,
      "",
      "Capturas generadas con `bun run qa:visual` sobre el build (Chromium headless, locale `es`).",
      "Criterio: sin overflow horizontal, sin recortes, jerarquía y densidad estables.",
      "",
      "| App | Página | Viewport | Archivo |",
      "| --- | --- | --- | --- |",
      ...rows,
      "",
    ].join("\n");

    writeFileSync(join(directory, "index.md"), index);
    console.log(`\nqa:visual: ${rows.length} capturas en docs/qa/${date}`);
  } finally {
    close();

    for (const stop of stops) {
      stop();
    }
  }
}

await run();
