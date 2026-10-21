import type { KotenLocale } from "@koten/ui";
import type { ReactNode } from "react";

export type L10n = Record<KotenLocale, string>;
export type L10nList = Record<KotenLocale, readonly string[]>;

export type DocExample = {
  id: string;
  title: L10n;
  description?: L10n;
  preview: ReactNode;
  code: string;
};

export type DocProp = {
  prop: string;
  type: string;
  default: string;
  note: L10n;
};

export type DocRequirementKind =
  | "provider"
  | "hook"
  | "controlled"
  | "portal"
  | "client"
  | "dependency";

export type DocRequirement = {
  kind: DocRequirementKind;
  label: L10n;
  detail: L10n;
};

export type DocFormExample = {
  title: L10n;
  description: L10n;
  preview: ReactNode;
  code: string;
};

export type PrimitiveDoc = {
  slug: string;
  /** Registry item name when it differs from the route slug (e.g. FormRow lives in field.tsx). */
  registrySlug?: string;
  id: string;
  name: string;
  jp: string;
  description: L10n;
  /** Link to the Base UI primitive this component wraps, when it exists. */
  baseUi?: string;
  requirements?: readonly DocRequirement[];
  /** Files copied by the registry item, relative to the installed project. */
  files: readonly string[];
  examples: readonly DocExample[];
  /** Form components document how they behave inside a real form. */
  formExample?: DocFormExample;
  props: readonly DocProp[];
  a11y: L10nList;
};

export type BlockCategoryId = "storefront" | "erp";

export type BlockCategory = {
  id: BlockCategoryId;
  title: L10n;
  description: L10n;
};

export type BlockDoc = {
  slug: string;
  registrySlug?: string;
  id: string;
  category: BlockCategoryId;
  name: string;
  jp: string;
  description: L10n;
  /** Optional reference for compositions that expose a Base UI primitive. */
  baseUi?: string;
  requirements?: readonly DocRequirement[];
  files: readonly string[];
  examples: readonly DocExample[];
  props: readonly DocProp[];
  a11y: L10nList;
};

export const uiFile = (name: string) => `components/ui/${name}`;
export const patternFile = (name: string) => `components/patterns/${name}`;

/** Core files every registry item carries so it can be copied on its own. */
export const coreFiles = [
  "lib/koten/cn.ts",
  "lib/koten/format.ts",
  "lib/koten/intl.ts",
  "lib/koten/labels.ts",
  "lib/koten/provider.tsx",
  "styles/koten.css",
] as const;

export const filesFor = (...files: string[]): readonly string[] => [...files, ...coreFiles];
