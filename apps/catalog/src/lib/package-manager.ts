import { useSyncExternalStore } from "react";

export type PackageManager = "npm" | "bun";

export const PACKAGE_MANAGER_STORAGE_KEY = "koten.package-manager";

const fallback: PackageManager = "npm";
const listeners = new Set<() => void>();

function readStored(): PackageManager {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    return window.localStorage.getItem(PACKAGE_MANAGER_STORAGE_KEY) === "bun" ? "bun" : "npm";
  } catch {
    return fallback;
  }
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

export function setPackageManager(value: PackageManager): void {
  try {
    window.localStorage.setItem(PACKAGE_MANAGER_STORAGE_KEY, value);
  } catch {
    // Storage may be unavailable in private or embedded contexts; the next
    // read falls back to npm.
  }

  for (const listener of listeners) {
    listener();
  }
}

/** `npx` for Node, `bunx` for Bun. */
export function packageRunner(value: PackageManager): "npx" | "bunx" {
  return value === "bun" ? "bunx" : "npx";
}

/** Shared preference, persisted in localStorage and reactive across the catalog. */
export function usePackageManager() {
  const packageManager = useSyncExternalStore(subscribe, readStored, () => fallback);

  return { packageManager, setPackageManager };
}
