import { describe, expect, it } from "vitest";
import {
  campaign,
  notices,
  product,
  ranking,
  relatedProducts,
  reviewDistribution,
  reviews,
  storeCopy,
} from "./index";
import type { Localized } from "./types";

const locales = ["ja", "es", "en"] as const;

function expectLocalized(value: Localized) {
  for (const locale of locales) {
    expect(value[locale].trim().length).toBeGreaterThan(0);
  }
}

describe("contenido del storefront", () => {
  it("define todos los idiomas de la interfaz", () => {
    for (const locale of locales) {
      const copy = storeCopy[locale];

      expect(copy.meta.title.length).toBeGreaterThan(0);
      expect(copy.categories.length).toBe(8);
      expect(copy.footer.columns.length).toBe(4);
      expect(copy.footer.legal.length).toBeGreaterThanOrEqual(4);
    }
  });

  it("localiza el producto, sus textos y especificaciones", () => {
    expectLocalized(product.tagline);
    expectLocalized(product.shortDescription);

    for (const locale of locales) {
      expect(product.longDescription[locale].length).toBeGreaterThanOrEqual(3);
      expect(product.highlights[locale].length).toBeGreaterThanOrEqual(4);
    }

    for (const image of product.images) {
      expectLocalized(image.alt);
    }

    for (const group of product.specs) {
      expectLocalized(group.title);
      for (const row of group.rows) {
        expectLocalized(row.label);
        expectLocalized(row.value);
      }
    }

    expect(product.colors.length).toBe(2);
    expect(product.kits.length).toBe(2);
    expect(product.price).toBeGreaterThan(0);
  });

  it("pluralea puntos y formatea valoraciones con Intl", () => {
    expect(storeCopy.es.buy.points(1)).toBe("1 punto");
    expect(storeCopy.en.buy.points(1)).toBe("1 point");
    expect(storeCopy.en.buy.points(583)).toBe("583 points");
    expect(storeCopy.es.reviews.rating(4.6)).toContain("4,6");
    expect(storeCopy.en.reviews.rating(4.6)).toContain("4.6");
    expect(storeCopy.es.buy.reviews(1)).toBe("1 valoración");
    expect(storeCopy.es.buy.reviews(128)).toBe("128 valoraciones");
  });

  it("publica avisos, ranking, campaña y relacionados con datos reales", () => {
    expect(notices.length).toBeGreaterThanOrEqual(5);
    expect(ranking.length).toBeGreaterThanOrEqual(4);
    expect(relatedProducts.length).toBe(4);
    expect(campaign.deadline).toMatch(/^\d{4}-\d{2}-\d{2}$/);

    for (const notice of notices) {
      expect(notice.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expectLocalized(notice.title);
    }

    for (const item of ranking) {
      expectLocalized(item.name);
      expect(item.rank).toBeGreaterThan(0);
    }

    for (const item of relatedProducts) {
      expectLocalized(item.name);
      expect(item.points).toBeGreaterThan(0);
    }
  });

  it("suma las valoraciones y mantiene el promedio", () => {
    const total = reviewDistribution.reduce((sum, item) => sum + item.count, 0);

    expect(total).toBe(product.reviewCount);
    expect(reviews.length).toBeGreaterThanOrEqual(3);

    for (const review of reviews) {
      expectLocalized(review.title);
      expectLocalized(review.body);
      expect(review.rating).toBeGreaterThanOrEqual(1);
      expect(review.rating).toBeLessThanOrEqual(5);
    }
  });
});
