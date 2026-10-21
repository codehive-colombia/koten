import { relatedImages } from "./product";
import type { Localized } from "./types";

export type NoticeData = {
  id: string;
  date: string;
  title: Localized;
};

export const notices: readonly NoticeData[] = [
  {
    id: "notice-fair",
    date: "2026-10-21",
    title: {
      ja: "秋の新作カメラフェア開催中",
      es: "Feria de cámaras de otoño en marcha",
      en: "Autumn camera fair is on",
    },
  },
  {
    id: "notice-repair",
    date: "2026-10-18",
    title: {
      ja: "修理受付センター臨時休業のお知らせ",
      es: "Cierre temporal del centro de reparaciones",
      en: "Repair centre temporary closure",
    },
  },
  {
    id: "notice-points",
    date: "2026-10-15",
    title: { ja: "ポイント5倍キャンペーン", es: "Campaña de puntos ×5", en: "5× points campaign" },
  },
  {
    id: "notice-firmware",
    date: "2026-10-09",
    title: {
      ja: "K-1 ファームウェア v1.20 公開",
      es: "Firmware v1.20 de la K-1 disponible",
      en: "K-1 firmware v1.20 released",
    },
  },
  {
    id: "notice-holiday",
    date: "2026-10-01",
    title: {
      ja: "10月の店舗営業時間について",
      es: "Horario de tiendas de octubre",
      en: "October store hours",
    },
  },
];

export type RankedProductData = {
  id: string;
  rank: number;
  name: Localized;
  price: number;
  image: string;
  meta: Localized;
};

export const ranking: readonly RankedProductData[] = [
  {
    id: "rank-1",
    rank: 1,
    name: { ja: "HIKARI K-1 ブラック", es: "HIKARI K-1 negro", en: "HIKARI K-1 black" },
    price: 58300,
    image: relatedImages.front,
    meta: { ja: "カメラ", es: "Cámaras", en: "Cameras" },
  },
  {
    id: "rank-2",
    rank: 2,
    name: {
      ja: "HIKARI 35mm f/2.8 レンズ",
      es: "Objetivo HIKARI 35 mm f/2.8",
      en: "HIKARI 35 mm f/2.8 lens",
    },
    price: 32400,
    image: relatedImages.lens,
    meta: { ja: "レンズ", es: "Objetivos", en: "Lenses" },
  },
  {
    id: "rank-3",
    rank: 3,
    name: { ja: "HIKARI カメラバッグ", es: "Bolsa HIKARI para cámara", en: "HIKARI camera bag" },
    price: 9800,
    image: relatedImages.bag,
    meta: { ja: "アクセサリー", es: "Accesorios", en: "Accessories" },
  },
  {
    id: "rank-4",
    rank: 4,
    name: { ja: "HIKARI K-1 シルバー", es: "HIKARI K-1 plata", en: "HIKARI K-1 silver" },
    price: 58300,
    image: relatedImages.side,
    meta: { ja: "カメラ", es: "Cámaras", en: "Cameras" },
  },
  {
    id: "rank-5",
    rank: 5,
    name: {
      ja: "HIKARI レザーストラップ",
      es: "Correa de cuero HIKARI",
      en: "HIKARI leather strap",
    },
    price: 6400,
    image: relatedImages.top,
    meta: { ja: "アクセサリー", es: "Accesorios", en: "Accessories" },
  },
];

export type CampaignData = {
  id: string;
  eyebrow: Localized;
  title: Localized;
  description: Localized;
  deadline: string;
  cta: Localized;
  href: string;
};

export const campaign: CampaignData = {
  id: "campaign-autumn",
  eyebrow: { ja: "秋のカメラフェア", es: "Feria de otoño", en: "Autumn camera fair" },
  title: {
    ja: "K-1 レンズキット 12,000円引き",
    es: "Kit de objetivo K-1: 12.000 ¥ de descuento",
    en: "K-1 lens kit: ¥12,000 off",
  },
  description: {
    ja: "10月31日まで、K-1 レンズキット対象。ポイントも通常の2倍。",
    es: "Hasta el 31 de octubre en el kit con objetivo. Puntos dobles.",
    en: "Until 31 October on the lens kit. Double points.",
  },
  deadline: "2026-10-31",
  cta: { ja: "キャンペーンを見る", es: "Ver la campaña", en: "See the campaign" },
  href: "#campana",
};

export type ReviewData = {
  id: string;
  author: string;
  date: string;
  rating: number;
  title: Localized;
  body: Localized;
  verified?: boolean;
};

export const reviewDistribution = [
  { stars: 5, count: 86 },
  { stars: 4, count: 28 },
  { stars: 3, count: 9 },
  { stars: 2, count: 3 },
  { stars: 1, count: 2 },
] as const;

export const reviews: readonly ReviewData[] = [
  {
    id: "review-1",
    author: "Mika T.",
    date: "2026-10-12",
    rating: 5,
    title: {
      ja: "毎日持ち歩いています",
      es: "La llevo todos los días",
      en: "I carry it every day",
    },
    body: {
      ja: "軽くて、シャッターが静か。鞄に入れっぱなしでも気にならない大きさです。35mmの画角も街撮りにちょうどよい。",
      es: "Ligera y con un obturador silencioso. Cabe en el bolso sin molestar. El ángulo de 35 mm va perfecto para calle.",
      en: "Light, with a quiet shutter. It disappears into a bag. The 35 mm field of view is just right for the street.",
    },
    verified: true,
  },
  {
    id: "review-2",
    author: "Daniel R.",
    date: "2026-10-04",
    rating: 4,
    title: {
      ja: "操作はシンプル、電池はもう少し",
      es: "Sencilla de usar; la batería, mejorable",
      en: "Simple to use; battery could be better",
    },
    body: {
      ja: "ダイヤルのクリック感が気持ちよく、電源を入れてすぐ撮れます。旅行で一日使うと電池残量が心もとないので、予備を一枚。",
      es: "Los diales tienen un clic agradable y se enciende rápido. En un día de viaje la batería se queda corta; lleva una de repuesto.",
      en: "The dials click nicely and it starts fast. On a full travel day the battery runs low, so bring a spare.",
    },
    verified: true,
  },
  {
    id: "review-3",
    author: "佐藤 綾",
    date: "2026-09-28",
    rating: 5,
    title: {
      ja: "ファインダーが良い",
      es: "El visor marca la diferencia",
      en: "The viewfinder makes it",
    },
    body: {
      ja: "光学と電子を切り替えられるファインダーが便利です。明るい屋外では光学、暗い場所では電子と使い分けています。",
      es: "Poder alternar entre visor óptico y electrónico es muy práctico. Uso el óptico con luz y el electrónico de noche.",
      en: "Switching between optical and electronic viewfinders is handy. Optical outdoors, electronic in low light.",
    },
    verified: true,
  },
];

export type RelatedProductData = {
  id: string;
  name: Localized;
  price: number;
  points: number;
  image: string;
  badge?: {
    label: Localized;
    tone: "new" | "sale";
  };
  meta: Localized;
};

export const relatedProducts: readonly RelatedProductData[] = [
  {
    id: "related-lens",
    name: {
      ja: "HIKARI 35mm f/2.8 レンズ",
      es: "Objetivo HIKARI 35 mm f/2.8",
      en: "HIKARI 35 mm f/2.8 lens",
    },
    price: 32400,
    points: 324,
    image: relatedImages.lens,
    meta: { ja: "単焦点レンズ", es: "Objetivo fijo", en: "Prime lens" },
  },
  {
    id: "related-bag",
    name: { ja: "HIKARI カメラバッグ", es: "Bolsa HIKARI para cámara", en: "HIKARI camera bag" },
    price: 9800,
    points: 98,
    image: relatedImages.bag,
    badge: { label: { ja: "新着", es: "Novedad", en: "New" }, tone: "new" },
    meta: { ja: "キャンバス・撥水加工", es: "Lona tratada", en: "Treated canvas" },
  },
  {
    id: "related-strap",
    name: {
      ja: "HIKARI レザーストラップ",
      es: "Correa de cuero HIKARI",
      en: "HIKARI leather strap",
    },
    price: 6400,
    points: 64,
    image: relatedImages.top,
    meta: { ja: "本革・3色", es: "Piel, 3 colores", en: "Leather, 3 colours" },
  },
  {
    id: "related-silver",
    name: { ja: "HIKARI K-1 シルバー", es: "HIKARI K-1 plata", en: "HIKARI K-1 silver" },
    price: 58300,
    points: 583,
    image: relatedImages.side,
    badge: { label: { ja: "限定", es: "Limitado", en: "Limited" }, tone: "sale" },
    meta: { ja: "限定カラー", es: "Color limitado", en: "Limited colour" },
  },
];
