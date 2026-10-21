/**
 * Performance audit on the build (`F4-003`).
 *
 * Starts `vite preview` for the three apps and measures with headless Chromium:
 * LCP, CLS, FCP, JS requests and transferred bytes. Each route is measured three
 * times and the median LCP and worst CLS are reported.
 *
 * Usage: `bun run build && bun scripts/qa-perf.ts [--json]`
 * Requires Chromium on `PATH`.
 */
import { spawn } from "node:child_process";
import { join } from "node:path";
import { launchChromium, sleep } from "./lib/cdp";

type AppId = "catalog" | "storefront" | "erp";

type Page = { app: AppId; label: string; path: string };

type Measurement = {
  lcp: number;
  cls: number;
  fcp: number;
  load: number;
  jsRequests: number;
  jsTransfer: number;
};

const apps: Record<AppId, { port: number; directory: string }> = {
  catalog: { port: 4173, directory: "apps/catalog" },
  storefront: { port: 4174, directory: "apps/storefront" },
  erp: { port: 4175, directory: "apps/erp" },
};

const pages: readonly Page[] = [
  { app: "catalog", label: "portada", path: "/" },
  { app: "catalog", label: "formularios", path: "/components/forms" },
  { app: "catalog", label: "datos 10k", path: "/components/data" },
  { app: "catalog", label: "patrones", path: "/patterns/storefront" },
  { app: "storefront", label: "producto", path: "/" },
  { app: "erp", label: "dashboard", path: "/" },
  { app: "erp", label: "pedidos", path: "/orders" },
];

const runs = 3;
const thresholds = { lcp: 1500, cls: 0.02 };

const observer = `(() => {
  window.__kotenPerf = { lcp: 0, cls: 0, fcp: 0 };

  try {
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const last = entries[entries.length - 1];
      if (last) window.__kotenPerf.lcp = last.startTime;
    }).observe({ type: "largest-contentful-paint", buffered: true });

    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) window.__kotenPerf.cls += entry.value;
      }
    }).observe({ type: "layout-shift", buffered: true });

    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === "first-contentful-paint") window.__kotenPerf.fcp = entry.startTime;
      }
    }).observe({ type: "paint", buffered: true });
  } catch {
    // Browsers without support: values stay at 0.
  }
})()`;

const read = `(() => {
  const navigation = performance.getEntriesByType("navigation")[0] || {};
  const resources = performance.getEntriesByType("resource");
  const scripts = resources.filter((entry) => /\\.js(\\?|$)/.test(entry.name));

  return {
    ...window.__kotenPerf,
    load: navigation.loadEventEnd || 0,
    jsRequests: scripts.length,
    jsTransfer: scripts.reduce((total, entry) => total + (entry.transferSize || 0), 0),
  };
})()`;

const sleepPreview = (ms: number) => sleep(ms);

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
      // The preview is not listening yet.
    }

    await sleepPreview(150);
  }

  return () => child.kill("SIGTERM");
}

const median = (values: number[]) => {
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);

  return sorted.length % 2 === 0
    ? ((sorted[middle - 1] ?? 0) + (sorted[middle] ?? 0)) / 2
    : (sorted[middle] ?? 0);
};

async function run() {
  const asJson = new Set(process.argv.slice(2)).has("--json");
  const stops: Array<() => void> = [];

  for (const app of Object.keys(apps) as AppId[]) {
    stops.push(await startPreview(app));
  }

  const { cdp, close } = await launchChromium(9336);
  const report: Array<{
    page: string;
    lcp: number;
    cls: number;
    fcp: number;
    jsRequests: number;
    jsTransfer: number;
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
    await send("Network.enable");
    // Without cache, each sample measures real bytes and not a 304 response.
    await send("Network.setCacheDisabled", { cacheDisabled: true });
    await send("Emulation.setDeviceMetricsOverride", {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await send("Page.addScriptToEvaluateOnNewDocument", { source: observer });

    for (const page of pages) {
      const config = apps[page.app];
      const samples: Measurement[] = [];

      for (let index = 0; index < runs; index += 1) {
        const loaded = cdp.once("Page.loadEventFired").catch(() => undefined);
        await send("Page.navigate", {
          url: `http://localhost:${config.port}${page.path}?lang=es`,
        });
        await loaded;
        await sleep(2200);

        const { result } = await send<{ result: { value?: Measurement } }>("Runtime.evaluate", {
          expression: read,
          returnByValue: true,
        });

        if (result.value) samples.push(result.value);
      }

      const lcp = Math.round(median(samples.map((sample) => sample.lcp)));
      const cls = Math.max(...samples.map((sample) => sample.cls));
      const fcp = Math.round(median(samples.map((sample) => sample.fcp)));
      const jsRequests = Math.max(...samples.map((sample) => sample.jsRequests));
      const jsTransfer = Math.round(median(samples.map((sample) => sample.jsTransfer)));
      const key = `${page.app}:${page.label}`;
      const failed = lcp > thresholds.lcp || cls > thresholds.cls;

      if (failed) failures += 1;

      report.push({ page: key, lcp, cls, fcp, jsRequests, jsTransfer });

      if (!asJson) {
        console.log(
          `${(failed ? "FAIL" : "ok").padEnd(5)} ${key} · LCP ${lcp}ms · CLS ${cls.toFixed(3)} · ` +
            `FCP ${fcp}ms · ${jsRequests} JS · ${(jsTransfer / 1024).toFixed(1)} KB transferred`,
        );
      }
    }

    if (asJson) console.log(JSON.stringify(report, null, 2));
  } finally {
    close();

    for (const stop of stops) {
      stop();
    }
  }

  console.log(
    `\nperf: ${report.length} routes · budget LCP < ${thresholds.lcp}ms and CLS < ${thresholds.cls}`,
  );

  if (failures > 0) {
    process.exit(1);
  }
}

await run();
