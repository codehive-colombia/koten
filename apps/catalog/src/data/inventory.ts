import { blockDocs, primitiveDocs } from "./docs";

export type ComponentInventoryItem = {
  id: string;
  name: string;
  page: string;
  to: string;
};

export const componentInventory: readonly ComponentInventoryItem[] = primitiveDocs.map((doc) => ({
  id: doc.id,
  name: doc.name,
  page: doc.slug,
  to: `/components/${doc.slug}`,
}));

export type PatternInventoryItem = {
  id: string;
  name: string;
  page: string;
  to: string;
};

export const patternInventory: readonly PatternInventoryItem[] = blockDocs.map((doc) => ({
  id: doc.id,
  name: doc.name,
  page: doc.category,
  to: `/blocks/${doc.category}/${doc.slug}`,
}));
