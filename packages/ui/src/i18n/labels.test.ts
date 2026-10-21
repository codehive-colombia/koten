import { describe, expect, it } from "vitest";
import { type KotenLabels, type KotenLocale, labelsByLocale } from "./labels";

const locales = Object.keys(labelsByLocale) as KotenLocale[];
const keys = Object.keys(labelsByLocale.es) as (keyof KotenLabels)[];

describe("labelsByLocale", () => {
  it("covers the three demo languages", () => {
    expect(locales).toEqual(["es", "ja", "en"]);
  });

  it("keeps the same keys in every locale", () => {
    for (const locale of locales) {
      expect(Object.keys(labelsByLocale[locale]).sort()).toEqual([...keys].sort());
    }
  });

  it("does not leave empty labels", () => {
    for (const locale of locales) {
      for (const key of keys) {
        expect(labelsByLocale[locale][key].trim(), `${locale}.${key}`).not.toBe("");
      }
    }
  });
});
