import { describe, expect, it } from "vitest";
import { cn } from "./cn";

describe("cn", () => {
  it("merges conflicting utilities", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });

  it("drops falsy values", () => {
    expect(cn("text-sm", false && "hidden", undefined)).toBe("text-sm");
  });
});
