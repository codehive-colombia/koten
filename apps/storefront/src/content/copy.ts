import type { KotenLocale } from "@koten/ui";

export type StoreCopy = {
  meta: {
    title: string;
    description: string;
  };
  skip: string;
  utility: {
    left: string;
    right: string;
    language: string;
  };
  header: {
    brandLabel: string;
    searchLabel: string;
    searchPlaceholder: string;
    allCategories: string;
    searchButton: string;
    account: string;
    cart: (count: number) => string;
    navLabel: string;
    menu: string;
  };
  categories: readonly { id: string; label: string }[];
  breadcrumb: {
    label: string;
    home: string;
    cameras: string;
  };
  buy: {
    panelTitle: string;
    brandLine: string;
    tagline: string;
    rating: (value: number) => string;
    reviews: (count: number) => string;
    colorLabel: string;
    kitLabel: string;
    quantityLabel: string;
    decrement: string;
    increment: string;
    addToCart: string;
    favorite: string;
    stock: string;
    deliveryLabel: string;
    deliveryValue: string;
    shippingLabel: string;
    shippingValue: string;
    warrantyLabel: string;
    warrantyValue: string;
    taxIncluded: string;
    listPriceLabel: string;
    points: (points: number) => string;
    note: string;
    addedTitle: string;
    addedDescription: (name: string, quantity: number) => string;
    viewCart: string;
    limitNote: string;
  };
  sections: {
    description: { title: string; meta: string };
    specs: { title: string; meta: string; caption: string };
    reviews: { title: string; meta: string };
    related: { title: string; meta: string };
    notices: { title: string; meta: string; more: string; empty: string };
    ranking: { title: string; meta: string };
    campaign: { deadline: string; cta: string };
  };
  reviews: {
    rating: (value: number) => string;
    count: (count: number) => string;
    distribution: string;
    verified: string;
    empty: string;
  };
  toast: {
    close: string;
    region: string;
  };
  footer: {
    navLabel: string;
    columns: readonly {
      id: string;
      title: string;
      links: readonly { label: string; href: string }[];
    }[];
    company: string;
    address: string;
    legal: readonly { label: string; href: string }[];
    note: string;
  };
};

const spanish: StoreCopy = {
  meta: {
    title: "HIKARI K-1 · Cámara compacta 35 mm",
    description:
      "HIKARI K-1: cámara compacta de fotograma completo, objetivo fijo de 35 mm y 380 g. Precio, disponibilidad, especificaciones y valoraciones.",
  },
  skip: "Saltar al contenido",
  utility: {
    left: "Envío gratuito a todo el país · Recogida en tienda",
    right: "HIKARI ONLINE · 光オンライン",
    language: "Idioma",
  },
  header: {
    brandLabel: "HIKARI, ir a la página de inicio",
    searchLabel: "Buscar productos",
    searchPlaceholder: "Nombre, modelo o palabra clave",
    allCategories: "Todo",
    searchButton: "Buscar",
    account: "Cuenta",
    cart: (count) => `Carrito (${count})`,
    navLabel: "Categorías",
    menu: "Menú",
  },
  categories: [
    { id: "cameras", label: "Cámaras" },
    { id: "lenses", label: "Objetivos" },
    { id: "audio", label: "Audio" },
    { id: "computers", label: "Informática" },
    { id: "appliances", label: "Electrodomésticos" },
    { id: "stationery", label: "Papelería" },
    { id: "gifts", label: "Regalos" },
    { id: "repairs", label: "Reparación" },
  ],
  breadcrumb: {
    label: "Migas de pan",
    home: "Inicio",
    cameras: "Cámaras",
  },
  buy: {
    panelTitle: "Compra",
    brandLine: "HIKARI · Cámara compacta 35 mm",
    tagline: "Una cámara silenciosa para la vida diaria.",
    rating: (value) =>
      `Valoración ${value.toLocaleString("es-ES", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} de 5`,
    reviews: (count) => `${count} ${count === 1 ? "valoración" : "valoraciones"}`,
    colorLabel: "Color",
    kitLabel: "Conjunto",
    quantityLabel: "Cantidad",
    decrement: "Reducir cantidad",
    increment: "Aumentar cantidad",
    addToCart: "Añadir al carrito",
    favorite: "Guardar en favoritos",
    stock: "En stock",
    deliveryLabel: "Entrega",
    deliveryValue: "Mañana, 22 de octubre",
    shippingLabel: "Envío",
    shippingValue: "Gratis",
    warrantyLabel: "Garantía",
    warrantyValue: "1 año",
    taxIncluded: "IVA incluido",
    listPriceLabel: "Precio anterior",
    points: (points) => `${points.toLocaleString("es-ES")} punto${points === 1 ? "" : "s"}`,
    note: "Las imágenes son orientativas. Las especificaciones pueden cambiar sin previo aviso.",
    addedTitle: "Añadido al carrito",
    addedDescription: (name, quantity) => `${name} · ${quantity} unidad(es).`,
    viewCart: "Ver carrito",
    limitNote: "Máximo 5 unidades por pedido.",
  },
  sections: {
    description: { title: "Descripción", meta: "Acerca de la K-1" },
    specs: {
      title: "Especificaciones",
      meta: "Datos verificados del producto",
      caption: "Especificaciones de la HIKARI K-1",
    },
    reviews: { title: "Valoraciones", meta: "128 opiniones de clientes" },
    related: { title: "También te puede interesar", meta: "Accesorios y variantes" },
    notices: {
      title: "Avisos",
      meta: "Información de la tienda",
      more: "Ver todos",
      empty: "Sin avisos.",
    },
    ranking: { title: "Más vendidos", meta: "Ranking de la semana" },
    campaign: { deadline: "Hasta el", cta: "Ver la campaña" },
  },
  reviews: {
    rating: (value) =>
      `Valoración ${value.toLocaleString("es-ES", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} de 5`,
    count: (count) => `${count} ${count === 1 ? "valoración" : "valoraciones"}`,
    distribution: "Distribución",
    verified: "Compra verificada",
    empty: "Aún no hay reseñas.",
  },
  toast: {
    close: "Cerrar notificación",
    region: "Notificaciones",
  },
  footer: {
    navLabel: "Enlaces del pie de página",
    columns: [
      {
        id: "shopping",
        title: "Comprar",
        links: [
          { label: "Envío y gastos", href: "#envio" },
          { label: "Devoluciones", href: "#devoluciones" },
          { label: "Formas de pago", href: "#pago" },
          { label: "Tarjetas regalo", href: "#regalo" },
        ],
      },
      {
        id: "services",
        title: "Servicios",
        links: [
          { label: "Recogida en tienda", href: "#recogida" },
          { label: "Reparación", href: "#reparacion" },
          { label: "Garantía", href: "#garantia" },
          { label: "Programa de puntos", href: "#puntos" },
        ],
      },
      {
        id: "company",
        title: "Empresa",
        links: [
          { label: "Sobre HIKARI", href: "#empresa" },
          { label: "Empleo", href: "#empleo" },
          { label: "Prensa", href: "#prensa" },
          { label: "Sostenibilidad", href: "#sostenibilidad" },
        ],
      },
      {
        id: "support",
        title: "Soporte",
        links: [
          { label: "Contacto", href: "#contacto" },
          { label: "Preguntas frecuentes", href: "#faq" },
          { label: "Tiendas", href: "#tiendas" },
          { label: "Mapa del sitio", href: "#mapa" },
        ],
      },
    ],
    company: "HIKARI Optical Co., Ltd.",
    address: "2-8-1 Ginza, Chūō-ku, Tokio 104-0061 · Japón",
    legal: [
      { label: "Condiciones de uso", href: "#terminos" },
      { label: "Privacidad", href: "#privacidad" },
      { label: "Ley de transacciones comerciales", href: "#legal" },
      { label: "Accesibilidad", href: "#accesibilidad" },
    ],
    note: "Los precios incluyen impuestos. Las imágenes son orientativas. Disponibilidad sujeta a stock.",
  },
};

const japanese: StoreCopy = {
  meta: {
    title: "HIKARI K-1 · 35mmコンパクトカメラ",
    description:
      "HIKARI K-1は、35mmフルサイズセンサーと単焦点レンズを備えた380gのコンパクトカメラ。価格、在庫、仕様、レビューを掲載しています。",
  },
  skip: "本文へ移動",
  utility: {
    left: "全国送料無料 · 店舗受け取り対応",
    right: "HIKARI ONLINE · 光オンライン",
    language: "言語",
  },
  header: {
    brandLabel: "HIKARI ホームへ",
    searchLabel: "商品を検索",
    searchPlaceholder: "商品名・型番・キーワード",
    allCategories: "すべて",
    searchButton: "検索",
    account: "ログイン",
    cart: (count) => `カート ${count}`,
    navLabel: "カテゴリ",
    menu: "メニュー",
  },
  categories: [
    { id: "cameras", label: "カメラ" },
    { id: "lenses", label: "レンズ" },
    { id: "audio", label: "オーディオ" },
    { id: "computers", label: "パソコン" },
    { id: "appliances", label: "生活家電" },
    { id: "stationery", label: "文具" },
    { id: "gifts", label: "ギフト" },
    { id: "repairs", label: "修理" },
  ],
  breadcrumb: {
    label: "パンくずリスト",
    home: "ホーム",
    cameras: "カメラ",
  },
  buy: {
    panelTitle: "ご購入",
    brandLine: "HIKARI · 35mmコンパクトカメラ",
    tagline: "日常に寄り添う、静かな一台。",
    rating: (value) =>
      `5点満点中${value.toLocaleString("ja-JP", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}`,
    reviews: (count) => `${count}件のレビュー`,
    colorLabel: "カラー",
    kitLabel: "セット",
    quantityLabel: "数量",
    decrement: "数量を減らす",
    increment: "数量を増やす",
    addToCart: "カートに入れる",
    favorite: "お気に入りに追加",
    stock: "在庫あり",
    deliveryLabel: "お届け",
    deliveryValue: "あす到着",
    shippingLabel: "送料",
    shippingValue: "無料",
    warrantyLabel: "保証",
    warrantyValue: "1年間",
    taxIncluded: "税込",
    listPriceLabel: "通常価格",
    points: (points) => `${points.toLocaleString("ja-JP")}ポイント`,
    note: "※ 画像はイメージです。仕様は予告なく変更される場合があります。",
    addedTitle: "カートに追加しました",
    addedDescription: (name, quantity) => `${name} · ${quantity}点。`,
    viewCart: "カートを見る",
    limitNote: "1回のご注文は5点までです。",
  },
  sections: {
    description: { title: "商品説明", meta: "K-1について" },
    specs: { title: "仕様", meta: "製品仕様一覧", caption: "HIKARI K-1の仕様" },
    reviews: { title: "レビュー", meta: "購入者128名の評価" },
    related: { title: "関連商品", meta: "アクセサリーとカラーバリエーション" },
    notices: {
      title: "お知らせ",
      meta: "店舗からのご案内",
      more: "一覧を見る",
      empty: "お知らせはありません。",
    },
    ranking: { title: "ランキング", meta: "今週の人気商品" },
    campaign: { deadline: "終了まで", cta: "キャンペーンを見る" },
  },
  reviews: {
    rating: (value) =>
      `5点満点中${value.toLocaleString("ja-JP", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}`,
    count: (count) => `${count}件のレビュー`,
    distribution: "評価の内訳",
    verified: "購入済み",
    empty: "レビューはまだありません。",
  },
  toast: {
    close: "通知を閉じる",
    region: "通知",
  },
  footer: {
    navLabel: "フッターナビゲーション",
    columns: [
      {
        id: "shopping",
        title: "お買い物",
        links: [
          { label: "配送・送料", href: "#envio" },
          { label: "返品・交換", href: "#devoluciones" },
          { label: "お支払い方法", href: "#pago" },
          { label: "ギフトカード", href: "#regalo" },
        ],
      },
      {
        id: "services",
        title: "サービス",
        links: [
          { label: "店舗受け取り", href: "#recogida" },
          { label: "修理受付", href: "#reparacion" },
          { label: "保証について", href: "#garantia" },
          { label: "ポイントプログラム", href: "#puntos" },
        ],
      },
      {
        id: "company",
        title: "会社情報",
        links: [
          { label: "HIKARIについて", href: "#empresa" },
          { label: "採用情報", href: "#empleo" },
          { label: "プレスリリース", href: "#prensa" },
          { label: "環境への取り組み", href: "#sostenibilidad" },
        ],
      },
      {
        id: "support",
        title: "サポート",
        links: [
          { label: "お問い合わせ", href: "#contacto" },
          { label: "よくある質問", href: "#faq" },
          { label: "店舗一覧", href: "#tiendas" },
          { label: "サイトマップ", href: "#mapa" },
        ],
      },
    ],
    company: "株式会社ヒカリ光学",
    address: "〒104-0061 東京都中央区銀座2-8-1",
    legal: [
      { label: "利用規約", href: "#terminos" },
      { label: "プライバシーポリシー", href: "#privacidad" },
      { label: "特定商取引法に基づく表記", href: "#legal" },
      { label: "アクセシビリティ", href: "#accesibilidad" },
    ],
    note: "表示価格は税込です。画像はイメージです。在庫状況により販売できない場合があります。",
  },
};

const english: StoreCopy = {
  meta: {
    title: "HIKARI K-1 · 35 mm compact camera",
    description:
      "The HIKARI K-1: a full-frame compact with a fixed 35 mm lens and a 380 g body. Price, availability, specifications and reviews.",
  },
  skip: "Skip to content",
  utility: {
    left: "Free shipping nationwide · Store pickup",
    right: "HIKARI ONLINE · 光オンライン",
    language: "Language",
  },
  header: {
    brandLabel: "HIKARI, go to home",
    searchLabel: "Search products",
    searchPlaceholder: "Name, model or keyword",
    allCategories: "All",
    searchButton: "Search",
    account: "Account",
    cart: (count) => `Cart (${count})`,
    navLabel: "Categories",
    menu: "Menu",
  },
  categories: [
    { id: "cameras", label: "Cameras" },
    { id: "lenses", label: "Lenses" },
    { id: "audio", label: "Audio" },
    { id: "computers", label: "Computers" },
    { id: "appliances", label: "Home appliances" },
    { id: "stationery", label: "Stationery" },
    { id: "gifts", label: "Gifts" },
    { id: "repairs", label: "Repairs" },
  ],
  breadcrumb: {
    label: "Breadcrumb",
    home: "Home",
    cameras: "Cameras",
  },
  buy: {
    panelTitle: "Purchase",
    brandLine: "HIKARI · 35 mm compact camera",
    tagline: "A quiet camera for everyday life.",
    rating: (value) =>
      `Rated ${value.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} out of 5`,
    reviews: (count) => `${count} review${count === 1 ? "" : "s"}`,
    colorLabel: "Colour",
    kitLabel: "Kit",
    quantityLabel: "Quantity",
    decrement: "Decrease quantity",
    increment: "Increase quantity",
    addToCart: "Add to cart",
    favorite: "Save to favourites",
    stock: "In stock",
    deliveryLabel: "Delivery",
    deliveryValue: "Tomorrow, 22 October",
    shippingLabel: "Shipping",
    shippingValue: "Free",
    warrantyLabel: "Warranty",
    warrantyValue: "1 year",
    taxIncluded: "Tax included",
    listPriceLabel: "List price",
    points: (points) => `${points.toLocaleString("en-US")} point${points === 1 ? "" : "s"}`,
    note: "Images are for illustration. Specifications may change without notice.",
    addedTitle: "Added to cart",
    addedDescription: (name, quantity) => `${name} · ${quantity} item(s).`,
    viewCart: "View cart",
    limitNote: "Maximum 5 units per order.",
  },
  sections: {
    description: { title: "Description", meta: "About the K-1" },
    specs: {
      title: "Specifications",
      meta: "Verified product data",
      caption: "HIKARI K-1 specifications",
    },
    reviews: { title: "Reviews", meta: "128 customer reviews" },
    related: { title: "You may also like", meta: "Accessories and variants" },
    notices: {
      title: "Notices",
      meta: "Store information",
      more: "View all",
      empty: "No notices.",
    },
    ranking: { title: "Best sellers", meta: "This week's ranking" },
    campaign: { deadline: "Until", cta: "See the campaign" },
  },
  reviews: {
    rating: (value) =>
      `Rated ${value.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} out of 5`,
    count: (count) => `${count} review${count === 1 ? "" : "s"}`,
    distribution: "Rating breakdown",
    verified: "Verified purchase",
    empty: "No reviews yet.",
  },
  toast: {
    close: "Close notification",
    region: "Notifications",
  },
  footer: {
    navLabel: "Footer links",
    columns: [
      {
        id: "shopping",
        title: "Shop",
        links: [
          { label: "Shipping and delivery", href: "#envio" },
          { label: "Returns", href: "#devoluciones" },
          { label: "Payment methods", href: "#pago" },
          { label: "Gift cards", href: "#regalo" },
        ],
      },
      {
        id: "services",
        title: "Services",
        links: [
          { label: "Store pickup", href: "#recogida" },
          { label: "Repairs", href: "#reparacion" },
          { label: "Warranty", href: "#garantia" },
          { label: "Points programme", href: "#puntos" },
        ],
      },
      {
        id: "company",
        title: "Company",
        links: [
          { label: "About HIKARI", href: "#empresa" },
          { label: "Careers", href: "#empleo" },
          { label: "Press", href: "#prensa" },
          { label: "Sustainability", href: "#sostenibilidad" },
        ],
      },
      {
        id: "support",
        title: "Support",
        links: [
          { label: "Contact", href: "#contacto" },
          { label: "FAQ", href: "#faq" },
          { label: "Stores", href: "#tiendas" },
          { label: "Site map", href: "#mapa" },
        ],
      },
    ],
    company: "HIKARI Optical Co., Ltd.",
    address: "2-8-1 Ginza, Chūō-ku, Tokyo 104-0061 · Japan",
    legal: [
      { label: "Terms of use", href: "#terminos" },
      { label: "Privacy", href: "#privacidad" },
      { label: "Commercial transactions act", href: "#legal" },
      { label: "Accessibility", href: "#accesibilidad" },
    ],
    note: "Prices include tax. Images are for illustration. Availability depends on stock.",
  },
};

export const storeCopy: Record<KotenLocale, StoreCopy> = {
  es: spanish,
  ja: japanese,
  en: english,
};
