import bagImage from "../assets/bag.svg";
import cameraFrontImage from "../assets/camera-front.svg";
import cameraSideImage from "../assets/camera-side.svg";
import cameraTopImage from "../assets/camera-top.svg";
import lensImage from "../assets/lens.svg";
import type { ImageAsset, Localized, ProductColor, ProductKit, SpecGroupData } from "./types";

export const product = {
  id: "hikari-k-1",
  sku: "HK1-35-BK",
  brand: "HIKARI",
  name: "HIKARI K-1",
  price: 58300,
  listPrice: 63800,
  pointsRate: 0.01,
  rating: 4.6,
  reviewCount: 128,
  releaseDate: "2026-09-12",
  tagline: {
    ja: "日常に寄り添う、静かな一台。",
    es: "Una cámara silenciosa para la vida diaria.",
    en: "A quiet camera for everyday life.",
  } satisfies Localized,
  shortDescription: {
    ja: "35mmフルサイズセンサーと単焦点レンズを備えた、手のひらサイズのコンパクトカメラ。",
    es: "Una compacta de bolsillo con sensor de fotograma completo de 35 mm y objetivo fijo.",
    en: "A pocket-sized compact with a 35 mm full-frame sensor and a fixed lens.",
  } satisfies Localized,
  longDescription: {
    ja: [
      "HIKARI K-1は、持ち歩くことを前提に設計した35mmコンパクトカメラです。フルサイズセンサーと35mm f/2.8の単焦点レンズを、380gのボディに収めました。",
      "シャッター音は静かに抑え、街角や室内でも視線を集めません。ダイヤルは手袋のままでも操作できるよう、明確なクリック感を持たせています。",
      "USB-C充電、SDカードスロット、ハイブリッドファインダー。余計な機能を足さず、写真を撮るための道具として仕上げました。",
    ],
    es: [
      "La HIKARI K-1 es una compacta de 35 mm diseñada para llevarse encima. Reúne un sensor de fotograma completo y un objetivo fijo de 35 mm f/2.8 en un cuerpo de 380 g.",
      "El obturador está amortiguado para pasar desapercibido en la calle o en interiores. Los diales tienen un clic firme que se puede manejar incluso con guantes.",
      "Carga por USB-C, ranura SD y visor híbrido. Sin funciones de más: una herramienta hecha para fotografiar.",
    ],
    en: [
      "The HIKARI K-1 is a 35 mm compact built to be carried. It fits a full-frame sensor and a fixed 35 mm f/2.8 lens into a 380 g body.",
      "The shutter is quiet enough to go unnoticed on the street or indoors. The dials have a firm click that works even with gloves on.",
      "USB-C charging, an SD slot and a hybrid viewfinder. No extra features: a tool made for taking photographs.",
    ],
  } satisfies Localized<readonly string[]>,
  highlights: {
    ja: [
      "35mmフルサイズセンサー",
      "35mm f/2.8 単焦点",
      "380g・USB-C充電",
      "ハイブリッドファインダー",
    ],
    es: [
      "Sensor full-frame de 35 mm",
      "Objetivo fijo 35 mm f/2.8",
      "380 g y carga USB-C",
      "Visor híbrido",
    ],
    en: [
      "35 mm full-frame sensor",
      "Fixed 35 mm f/2.8 lens",
      "380 g and USB-C charging",
      "Hybrid viewfinder",
    ],
  } satisfies Localized<readonly string[]>,
  images: [
    {
      src: cameraFrontImage,
      alt: {
        ja: "HIKARI K-1 を正面から見たところ",
        es: "HIKARI K-1 vista de frente",
        en: "HIKARI K-1 seen from the front",
      },
      width: 800,
      height: 600,
    },
    {
      src: cameraTopImage,
      alt: {
        ja: "HIKARI K-1 を斜め上から見たところ",
        es: "HIKARI K-1 vista desde arriba",
        en: "HIKARI K-1 seen from above",
      },
      width: 800,
      height: 600,
    },
    {
      src: cameraSideImage,
      alt: {
        ja: "HIKARI K-1 の側面",
        es: "Perfil de la HIKARI K-1",
        en: "Side view of the HIKARI K-1",
      },
      width: 800,
      height: 600,
    },
    {
      src: lensImage,
      alt: {
        ja: "HIKARI 35mm f/2.8 レンズ",
        es: "Objetivo HIKARI 35 mm f/2.8",
        en: "HIKARI 35 mm f/2.8 lens",
      },
      width: 800,
      height: 600,
    },
  ] satisfies readonly ImageAsset[],
  colors: [
    {
      id: "charcoal",
      label: { ja: "チャコールブラック", es: "Negro carbón", en: "Charcoal black" },
      swatch: "#24211D",
    },
    {
      id: "silver",
      label: { ja: "シルバー", es: "Plata", en: "Silver" },
      swatch: "#B8B2A6",
    },
  ] satisfies readonly ProductColor[],
  kits: [
    {
      id: "body",
      label: { ja: "ボディのみ", es: "Solo cuerpo", en: "Body only" },
      priceDelta: 0,
    },
    {
      id: "lens-kit",
      label: {
        ja: "ボディ + 35mm f/2.8 レンズ",
        es: "Cuerpo + objetivo 35 mm f/2.8",
        en: "Body + 35 mm f/2.8 lens",
      },
      priceDelta: 12000,
    },
  ] satisfies readonly ProductKit[],
  specs: [
    {
      id: "camera",
      title: { ja: "基本仕様", es: "Cámara", en: "Camera" },
      rows: [
        {
          id: "sensor",
          label: { ja: "撮像素子", es: "Sensor", en: "Sensor" },
          value: {
            ja: "35mm フルサイズ CMOS・2,420万画素",
            es: "CMOS full-frame de 35 mm, 24,2 MP",
            en: "35 mm full-frame CMOS, 24.2 MP",
          },
        },
        {
          id: "lens",
          label: { ja: "レンズ", es: "Objetivo", en: "Lens" },
          value: { ja: "35mm f/2.8（固定）", es: "35 mm f/2.8 (fijo)", en: "35 mm f/2.8 (fixed)" },
        },
        {
          id: "iso",
          label: { ja: "ISO感度", es: "Sensibilidad ISO", en: "ISO range" },
          value: { ja: "100–51,200", es: "100–51.200", en: "100–51,200" },
        },
        {
          id: "shutter",
          label: { ja: "シャッター速度", es: "Velocidad de obturación", en: "Shutter speed" },
          value: { ja: "1/4000–30秒", es: "1/4000–30 s", en: "1/4000–30 s" },
        },
        {
          id: "viewfinder",
          label: { ja: "ファインダー", es: "Visor", en: "Viewfinder" },
          value: {
            ja: "ハイブリッド（光学 / 電子）",
            es: "Híbrido (óptico / electrónico)",
            en: "Hybrid (optical / electronic)",
          },
        },
      ],
    },
    {
      id: "body",
      title: { ja: "本体", es: "Cuerpo", en: "Body" },
      rows: [
        {
          id: "dimensions",
          label: { ja: "寸法", es: "Dimensiones", en: "Dimensions" },
          value: { ja: "118 × 68 × 44 mm", es: "118 × 68 × 44 mm", en: "118 × 68 × 44 mm" },
        },
        {
          id: "weight",
          label: { ja: "重量", es: "Peso", en: "Weight" },
          value: {
            ja: "380g（電池・SDカード含む）",
            es: "380 g (con batería y SD)",
            en: "380 g (with battery and SD)",
          },
        },
        {
          id: "battery",
          label: { ja: "電池", es: "Batería", en: "Battery" },
          value: {
            ja: "Li-ion・USB-C充電・約420枚",
            es: "Li-ion, carga USB-C, unas 420 fotos",
            en: "Li-ion, USB-C charging, about 420 shots",
          },
        },
        {
          id: "media",
          label: { ja: "記録媒体", es: "Almacenamiento", en: "Storage" },
          value: { ja: "SD / SDHC / SDXC", es: "SD / SDHC / SDXC", en: "SD / SDHC / SDXC" },
        },
        {
          id: "weather",
          label: { ja: "防塵防滴", es: "Resistencia", en: "Weather sealing" },
          value: { ja: "IP52相当", es: "Equivalente a IP52", en: "IP52 equivalent" },
        },
      ],
    },
    {
      id: "box",
      title: { ja: "同梱物", es: "Contenido de la caja", en: "In the box" },
      rows: [
        {
          id: "included",
          label: { ja: "同梱品", es: "Incluye", en: "Includes" },
          value: {
            ja: "本体、USB-Cケーブル、ストラップ、保証書",
            es: "Cámara, cable USB-C, correa y garantía",
            en: "Camera, USB-C cable, strap and warranty card",
          },
        },
        {
          id: "warranty",
          label: { ja: "保証", es: "Garantía", en: "Warranty" },
          value: { ja: "1年間", es: "1 año", en: "1 year" },
        },
      ],
    },
  ] satisfies readonly SpecGroupData[],
};

export const relatedImages = {
  lens: lensImage,
  bag: bagImage,
  front: cameraFrontImage,
  side: cameraSideImage,
  top: cameraTopImage,
} as const;
