import type { KotenLocale } from "@koten/ui";

export type Localized<T = string> = Record<KotenLocale, T>;

export type ImageAsset = {
  src: string;
  alt: Localized;
  width?: number;
  height?: number;
};

export type ProductColor = {
  id: string;
  label: Localized;
  swatch: string;
};

export type ProductKit = {
  id: string;
  label: Localized;
  priceDelta: number;
};

export type SpecRowData = {
  id: string;
  label: Localized;
  value: Localized;
};

export type SpecGroupData = {
  id: string;
  title: Localized;
  rows: readonly SpecRowData[];
};

export function pick<T>(value: Localized<T>, locale: KotenLocale): T {
  return value[locale];
}
