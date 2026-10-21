import { afterEach, describe, expect, it, vi } from "vitest";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe("site URLs", () => {
  it("uses the local ports during development", async () => {
    const { site } = await import("./site");

    expect(site.origin).toBe("http://localhost:5173");
    expect(site.storefront).toBe("http://localhost:5174");
    expect(site.erp).toBe("http://localhost:5175");
    expect(site.registry).toBe("http://localhost:5173/r");
  });

  it("honours the build-time overrides", async () => {
    vi.stubEnv("VITE_SITE_URL", "https://koten.example.test/");
    vi.stubEnv("VITE_REGISTRY_URL", "https://koten.example.test/custom-registry/");
    vi.resetModules();

    const { registryCommand, site } = await import("./site");

    expect(site.origin).toBe("https://koten.example.test");
    expect(site.registry).toBe("https://koten.example.test/custom-registry");
    expect(registryCommand("button")).toBe(
      "npx shadcn@latest add https://koten.example.test/custom-registry/button.json",
    );
    expect(registryCommand("button", "bun")).toBe(
      "bunx shadcn@latest add https://koten.example.test/custom-registry/button.json",
    );
  });
});
