/**
 * Utilidades mínimas de Chrome DevTools Protocol para los scripts de QA.
 * Usa el `WebSocket` de Bun y el Chromium del sistema; sin dependencias nuevas.
 */
import { spawn } from "node:child_process";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export class Cdp {
  private readonly socket: WebSocket;
  private sequence = 0;
  private readonly pending = new Map<
    number,
    { resolve: (value: unknown) => void; reject: (error: Error) => void }
  >();
  private readonly waiters = new Map<string, () => void>();

  private constructor(socket: WebSocket) {
    this.socket = socket;

    socket.addEventListener("message", (event) => {
      const message = JSON.parse(String(event.data)) as {
        id?: number;
        result?: unknown;
        error?: { message: string };
        method?: string;
      };

      if (message.id !== undefined) {
        const request = this.pending.get(message.id);
        this.pending.delete(message.id);

        if (message.error) {
          request?.reject(new Error(message.error.message));
        } else {
          request?.resolve(message.result);
        }

        return;
      }

      if (message.method) {
        this.waiters.get(message.method)?.();
      }
    });
  }

  static async connect(url: string): Promise<Cdp> {
    const socket = new WebSocket(url);
    await new Promise<void>((resolve, reject) => {
      socket.addEventListener("open", () => resolve(), { once: true });
      socket.addEventListener("error", () => reject(new Error("No se pudo abrir CDP")), {
        once: true,
      });
    });

    return new Cdp(socket);
  }

  send<T = unknown>(method: string, params: Record<string, unknown> = {}, sessionId?: string) {
    const id = ++this.sequence;

    return new Promise<T>((resolve, reject) => {
      this.pending.set(id, { resolve: resolve as (value: unknown) => void, reject });
      this.socket.send(JSON.stringify({ id, method, params, sessionId }));
    });
  }

  once(method: string, timeout = 15_000): Promise<void> {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        this.waiters.delete(method);
        reject(new Error(`Timeout esperando ${method}`));
      }, timeout);

      this.waiters.set(method, () => {
        clearTimeout(timer);
        this.waiters.delete(method);
        resolve();
      });
    });
  }

  close() {
    this.socket.close();
  }
}

export type Chromium = {
  cdp: Cdp;
  close: () => void;
};

export async function launchChromium(port = 9333): Promise<Chromium> {
  const profile = mkdtempSync(join(tmpdir(), "koten-cdp-"));
  const chrome = spawn(
    process.env.CHROMIUM ?? "chromium",
    [
      "--headless=new",
      "--no-sandbox",
      "--disable-gpu",
      "--hide-scrollbars",
      `--remote-debugging-port=${port}`,
      `--user-data-dir=${profile}`,
      "about:blank",
    ],
    { stdio: "ignore" },
  );

  const close = () => {
    chrome.kill("SIGTERM");
  };

  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json/version`);

      if (response.ok) {
        const version = (await response.json()) as { webSocketDebuggerUrl: string };

        return { cdp: await Cdp.connect(version.webSocketDebuggerUrl), close };
      }
    } catch {
      // Chromium todavía no escucha.
    }

    await sleep(150);
  }

  close();
  throw new Error(`Chromium no respondió en el puerto ${port}`);
}
