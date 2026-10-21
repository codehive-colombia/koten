import { erpBlockDocs } from "../blocks/erp";
import { storefrontBlockDocs } from "../blocks/storefront";
import { buttonDoc } from "./button";
import { dataDocs } from "./data";
import { feedbackDocs } from "./feedback";
import { formDocs } from "./forms";
import { inputDocs } from "./inputs";
import { navigationDocs } from "./navigation";
import { overlayDocs } from "./overlays";
import { surfaceDocs } from "./surfaces";
import type { BlockDoc, PrimitiveDoc } from "./types";

/**
 * Full docs used by tests and integrity checks. It is intentionally NOT imported by
 * the catalog runtime: the app loads one module per route to keep the entry small.
 */
export const allPrimitiveDocs: readonly PrimitiveDoc[] = [
  ...formDocs,
  ...inputDocs,
  ...surfaceDocs,
  ...navigationDocs,
  ...feedbackDocs,
  ...overlayDocs,
  ...dataDocs,
  buttonDoc,
].sort((first, second) => first.name.localeCompare(second.name));

export const allPrimitiveBySlug = new Map(allPrimitiveDocs.map((doc) => [doc.slug, doc]));

export const allBlockDocs: readonly BlockDoc[] = [...storefrontBlockDocs, ...erpBlockDocs].sort(
  (first, second) => first.name.localeCompare(second.name),
);

export const allBlockDoc = (category: string, slug: string): BlockDoc | undefined =>
  allBlockDocs.find((doc) => doc.category === category && doc.slug === slug);
