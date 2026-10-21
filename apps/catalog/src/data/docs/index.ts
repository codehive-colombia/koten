import { type BlockMeta, blockMeta } from "../blocks/meta";
import { primitiveMeta } from "./meta";
import type { BlockCategory, BlockCategoryId, BlockDoc, PrimitiveDoc } from "./types";

export const primitiveDocs = primitiveMeta;
export const primitiveBySlug = new Map(primitiveMeta.map((doc) => [doc.slug, doc]));

export const blockCategories: readonly BlockCategory[] = [
  {
    id: "storefront",
    title: { es: "Storefront", ja: "ストアフロント", en: "Storefront" },
    description: {
      es: "Bloques de la página de producto HIKARI: búsqueda, precio, galería, campañas, specs, reseñas y cierre.",
      ja: "HIKARI の商品ページを構成するブロック：検索、価格、ギャラリー、キャンペーン、仕様、レビュー、締めくくり。",
      en: "Blocks from the HIKARI product page: search, price, gallery, campaigns, specs, reviews and closing.",
    },
  },
  {
    id: "erp",
    title: { es: "ERP", ja: "ERP", en: "ERP" },
    description: {
      es: "Bloques del backoffice KURA: shell, navegación, cabeceras, filtros, estados, formularios, historial y detalle.",
      ja: "KURA のバックオフィスを構成するブロック：シェル、ナビゲーション、見出し、絞り込み、状態、フォーム、履歴、詳細。",
      en: "Blocks from the KURA back office: shell, navigation, headers, filters, statuses, forms, history and detail.",
    },
  },
];

export const blockCategoryById = new Map(
  blockCategories.map((category) => [category.id, category]),
);

export const blockDocs = blockMeta;

export const blocksByCategory = (category: BlockCategoryId): readonly BlockMeta[] =>
  blockMeta.filter((doc) => doc.category === category);

export function isBlockCategory(value: string): value is BlockCategoryId {
  return blockCategories.some((category) => category.id === value);
}

const primitiveModules: Record<string, () => Promise<Record<string, unknown>>> = {
  button: () => import("./button"),
  data: () => import("./data"),
  feedback: () => import("./feedback"),
  forms: () => import("./forms"),
  inputs: () => import("./inputs"),
  navigation: () => import("./navigation"),
  overlays: () => import("./overlays"),
  surfaces: () => import("./surfaces"),
};

const blockModules: Record<string, () => Promise<Record<string, unknown>>> = {
  erp: () => import("../blocks/erp"),
  storefront: () => import("../blocks/storefront"),
};

function findDoc<T extends { slug: string }>(
  module: Record<string, unknown>,
  slug: string,
): T | null {
  for (const value of Object.values(module)) {
    if (Array.isArray(value)) {
      const found = (value as T[]).find((item) => item.slug === slug);

      if (found) {
        return found;
      }
    }

    if (value && typeof value === "object" && "slug" in value) {
      const doc = value as T;

      if (doc.slug === slug) {
        return doc;
      }
    }
  }

  return null;
}

/** Loads only the module that owns the primitive, keeping the entry bundle small. */
export async function loadPrimitiveDoc(slug: string): Promise<PrimitiveDoc | null> {
  const meta = primitiveBySlug.get(slug);

  if (!meta) {
    return null;
  }

  const loader = primitiveModules[meta.file];

  if (!loader) {
    return null;
  }

  return findDoc<PrimitiveDoc>(await loader(), slug);
}

export async function loadBlockDoc(category: string, slug: string): Promise<BlockDoc | null> {
  const meta = blockMeta.find((doc) => doc.category === category && doc.slug === slug);

  if (!meta) {
    return null;
  }

  const loader = blockModules[meta.file];

  if (!loader) {
    return null;
  }

  return findDoc<BlockDoc>(await loader(), slug);
}

export type { BlockDoc, PrimitiveDoc };
