// biome-ignore-all lint/a11y/noNoninteractiveTabindex: scrollable code regions stay keyboard accessible.
import {
  Alert,
  Badge,
  Button,
  cn,
  type KotenLocale,
  useKoten,
  useKotenFormatters,
} from "@koten/ui";
import { useEffect, useRef, useState } from "react";
import { PageHeader } from "../components/docs";
import { Section } from "../components/specimen";
import { type PreviewLabels, ThemePreview } from "../components/theme-preview";
import { densityLabels } from "../data/catalog";
import {
  type ContrastCheckId,
  type DesignerBase,
  type DesignerConfig,
  decodeDesignerConfig,
  defaultDesignerConfig,
  densityTokens,
  designerBases,
  designerDensities,
  designerPigments,
  encodeDesignerConfig,
  findSafeDesignerConfig,
  formatRatio,
  paperStepsFor,
  pigmentHexFor,
  type RadiusStep,
  resolveDesignerTheme,
  toDesignerCss,
} from "../lib/theme-designer";

const copy = {
  es: {
    eyebrow: "Herramienta · テーマ",
    title: "Diseñar un tema",
    jp: "作風",
    description:
      "Elige un registro, un pigmento y un papel. Koten deriva los valores intermedios, valida el contraste y escribe un CSS que puedes pegar en tu proyecto. No hay selector de color libre.",
    meta: "5 decisiones · 11 comprobaciones AA · exportación CSS",
    params: "Parámetros",
    base: {
      label: "Registro",
      note: "Cada registro aplica su preset; después puedes ajustar el resto.",
      options: {
        kanso: { name: "Kanso", jp: "簡素", detail: "Catálogo y lectura" },
        chirashi: { name: "Chirashi", jp: "チラシ", detail: "Storefront y comercio" },
        daicho: { name: "Daichō", jp: "台帳", detail: "Backoffice y datos" },
        sumi: { name: "Sumi", jp: "墨", detail: "Oscuro" },
      },
    },
    pigment: {
      label: "Pigmento",
      options: {
        ai: { name: "Ai", jp: "藍", detail: "Índigo" },
        shu: { name: "Shu", jp: "朱", detail: "Bermellón" },
        kin: { name: "Kin", jp: "金", detail: "Ocre" },
        matcha: { name: "Matcha", jp: "抹茶", detail: "Verde té" },
      },
    },
    paper: { label: "Papel", step: "Papel" },
    radius: {
      label: "Radio",
      names: {
        0: "Recto",
        1: "Sutil",
        2: "Koten",
        3: "Redondeado",
      } satisfies Record<RadiusStep, string>,
    },
    density: { label: "Densidad" },
    reset: "Restaurar {base}",
    preview: "Vista previa",
    previewMeta: "Producto · pedidos · formulario",
    previewNote:
      "El tema se aplica solo al espécimen; el resto del catálogo conserva su tema para comparar.",
    checks: {
      title: "Contraste",
      meta: "WCAG 2.2 AA",
      summary: (passed: number, total: number) => `${passed} de ${total} comprobaciones AA`,
      labels: {
        body: "Texto principal sobre papel",
        muted: "Texto secundario",
        faint: "Metadatos",
        primary: "Primario como texto",
        primaryFg: "Texto sobre primario",
        focus: "Anillo de foco",
        borderStrong: "Bordes de control",
        dangerSolid: "Texto sobre peligro",
        successSolid: "Texto sobre éxito",
        warningSolid: "Texto sobre aviso",
        infoSolid: "Texto sobre información",
      } satisfies Record<ContrastCheckId, string>,
      min: "mín.",
      pass: "Cumple",
      fail: "No cumple",
    },
    export: {
      title: "CSS",
      meta: "Superpón koten-theme",
      body: "El archivo solo sobrescribe valores semánticos. Componentes, tipografía, espaciado, sombras y movimiento siguen viniendo de Koten.",
      paste:
        "Pega el bloque al final del CSS declarado como tailwind.css, después de koten-theme. Si usas data-density, ese selector puede volver a cambiar la densidad.",
      copy: "Copiar CSS",
      copied: "Copiado",
      download: "Descargar .css",
      blockedTitle: "Exportación bloqueada",
      blockedBody:
        "Hay pares por debajo de AA. Usa el papel seguro o cambia el pigmento antes de exportar.",
      fix: "Usar papel seguro",
      fixNote: "Lleva el papel al paso más cercano que cumple AA sin cambiar el pigmento.",
      file: "koten-custom.css",
    },
    locked: {
      title: "Lo que no se toca",
      meta: "Guardrails",
      items: [
        "Pigmentos de la paleta: Ai, Shu, Kin y Matcha. No hay selector de color libre.",
        "Tipografía del sistema; ninguna fuente CJK completa.",
        "Piso tipográfico de 12 px y escala fija.",
        "Radios de 0 a 3 px; bordes de 1 px.",
        "Sombras solo en overlays; sin gradientes decorativos.",
        "Los colores de estado mantienen su significado.",
        "El espaciado y las densidades son las de Koten.",
      ],
    },
    previewLabels: {
      preview: "Espécimen",
      product: "Producto",
      new: "Nuevo",
      productMeta: "HIKARI K-1 · 急須",
      productName: "Kyūsu de hierro",
      productCopy: "Hierro fundido, 0,8 L. Acabado mate y asa lateral.",
      lowStock: "Stock bajo",
      add: "Añadir al pedido",
      details: "Detalles",
      specs: "Ver especificaciones",
      orders: "Pedidos",
      today: "Hoy",
      order: "Pedido",
      client: "Cliente",
      status: "Estado",
      orderRows: [
        { id: "KURA-1042", client: "Aoi Mori", status: "En preparación", tone: "warning" },
        { id: "KURA-1041", client: "Kenji Sato", status: "Enviado", tone: "success" },
        { id: "KURA-1040", client: "Hana Ito", status: "Pendiente", tone: "info" },
      ] satisfies PreviewLabels["orderRows"],
      contact: "Contacto",
      email: "Correo",
      emailHint: "Solo para avisos del pedido.",
      save: "Guardar",
      saved: "Cliente actualizado",
      savedBody: "Los cambios se aplicaron al pedido KURA-1042.",
    },
  },
  ja: {
    eyebrow: "ツール · テーマ",
    title: "テーマを設計",
    jp: "作風",
    description:
      "様式・顔料・紙を選ぶと、Kotenが派生値を計算し、AAコントラストを検証してからCSSを書き出します。自由な色指定はありません。",
    meta: "5つの選択 · 11のAA検証 · CSS書き出し",
    params: "パラメータ",
    base: {
      label: "様式",
      note: "各様式はプリセットから始まり、残りは調整できます。",
      options: {
        kanso: { name: "Kanso", jp: "簡素", detail: "カタログと読書" },
        chirashi: { name: "Chirashi", jp: "チラシ", detail: "ストアと商取引" },
        daicho: { name: "Daichō", jp: "台帳", detail: "バックオフィスとデータ" },
        sumi: { name: "Sumi", jp: "墨", detail: "ダーク" },
      },
    },
    pigment: {
      label: "顔料",
      options: {
        ai: { name: "Ai", jp: "藍", detail: "インディゴ" },
        shu: { name: "Shu", jp: "朱", detail: "朱色" },
        kin: { name: "Kin", jp: "金", detail: "黄土" },
        matcha: { name: "Matcha", jp: "抹茶", detail: "抹茶" },
      },
    },
    paper: { label: "紙", step: "紙" },
    radius: {
      label: "角丸",
      names: {
        0: "直角",
        1: "控えめ",
        2: "標準",
        3: "丸み",
      } satisfies Record<RadiusStep, string>,
    },
    density: { label: "密度" },
    reset: "{base}を初期化",
    preview: "プレビュー",
    previewMeta: "商品 · 注文 · フォーム",
    previewNote: "テーマは見本にのみ適用されます。比較のためカタログは元のテーマを保ちます。",
    checks: {
      title: "コントラスト",
      meta: "WCAG 2.2 AA",
      summary: (passed: number, total: number) => `${total}件中${passed}件がAA`,
      labels: {
        body: "本文と紙",
        muted: "補助テキスト",
        faint: "メタ情報",
        primary: "主要色のテキスト",
        primaryFg: "主要色の上のテキスト",
        focus: "フォーカスリング",
        borderStrong: "操作部の罫線",
        dangerSolid: "危険色の上のテキスト",
        successSolid: "成功色の上のテキスト",
        warningSolid: "警告色の上のテキスト",
        infoSolid: "情報色の上のテキスト",
      } satisfies Record<ContrastCheckId, string>,
      min: "最小",
      pass: "合格",
      fail: "不合格",
    },
    export: {
      title: "CSS",
      meta: "koten-themeに重ねる",
      body: "書き出すのは意味的な値だけです。コンポーネント、タイポグラフィ、余白、影、動きはKotenのままです。",
      paste:
        "koten-themeの後、tailwind.cssの末尾に貼り付けてください。data-densityを使う場合、そのセレクタが密度を再び上書きすることがあります。",
      copy: "CSSをコピー",
      copied: "コピー済み",
      download: ".cssを保存",
      blockedTitle: "書き出しを停止",
      blockedBody:
        "AAを下回る組み合わせがあります。安全な紙を使うか、顔料を変えてから書き出してください。",
      fix: "安全な紙を使う",
      fixNote: "顔料を変えずに、AAを満たす最も近い紙の段階へ移動します。",
      file: "koten-custom.css",
    },
    locked: {
      title: "変えないもの",
      meta: "ガードレール",
      items: [
        "パレットの顔料は藍・朱・金・抹茶のみ。自由な色選択はありません。",
        "システムフォントのみ。CJKフォントは読み込みません。",
        "文字は12 pxが下限で、尺度は固定です。",
        "角丸は0〜3 px、罫線は1 pxです。",
        "影はオーバーレイのみ。装飾的なグラデーションはありません。",
        "状態色の意味は変えません。",
        "余白と密度はKotenのものです。",
      ],
    },
    previewLabels: {
      preview: "見本",
      product: "商品",
      new: "新着",
      productMeta: "HIKARI K-1 · 急須",
      productName: "鉄瓶急須",
      productCopy: "鋳鉄、0.8 L。艶消し仕上げ、横手。",
      lowStock: "在庫少",
      add: "注文に追加",
      details: "詳細",
      specs: "仕様を見る",
      orders: "注文",
      today: "今日",
      order: "注文",
      client: "顧客",
      status: "状態",
      orderRows: [
        { id: "KURA-1042", client: "Aoi Mori", status: "準備中", tone: "warning" },
        { id: "KURA-1041", client: "Kenji Sato", status: "発送済み", tone: "success" },
        { id: "KURA-1040", client: "Hana Ito", status: "保留", tone: "info" },
      ] satisfies PreviewLabels["orderRows"],
      contact: "連絡先",
      email: "メール",
      emailHint: "注文の通知のみに使用します。",
      save: "保存",
      saved: "顧客を更新しました",
      savedBody: "変更は注文 KURA-1042 に反映されました。",
    },
  },
  en: {
    eyebrow: "Tool · テーマ",
    title: "Design a theme",
    jp: "作風",
    description:
      "Pick a register, a pigment and a paper. Koten derives the in-between values, validates contrast and writes CSS you can paste into your project. There is no free color picker.",
    meta: "5 decisions · 11 AA checks · CSS export",
    params: "Parameters",
    base: {
      label: "Register",
      note: "Each register applies its preset; everything else stays adjustable.",
      options: {
        kanso: { name: "Kanso", jp: "簡素", detail: "Catalog and reading" },
        chirashi: { name: "Chirashi", jp: "チラシ", detail: "Storefront and commerce" },
        daicho: { name: "Daichō", jp: "台帳", detail: "Backoffice and data" },
        sumi: { name: "Sumi", jp: "墨", detail: "Dark" },
      },
    },
    pigment: {
      label: "Pigment",
      options: {
        ai: { name: "Ai", jp: "藍", detail: "Indigo" },
        shu: { name: "Shu", jp: "朱", detail: "Vermilion" },
        kin: { name: "Kin", jp: "金", detail: "Ochre" },
        matcha: { name: "Matcha", jp: "抹茶", detail: "Tea green" },
      },
    },
    paper: { label: "Paper", step: "Paper" },
    radius: {
      label: "Radius",
      names: {
        0: "Square",
        1: "Subtle",
        2: "Koten",
        3: "Rounded",
      } satisfies Record<RadiusStep, string>,
    },
    density: { label: "Density" },
    reset: "Reset {base}",
    preview: "Preview",
    previewMeta: "Product · orders · form",
    previewNote:
      "The theme applies to the specimen only; the rest of the catalog keeps its theme for comparison.",
    checks: {
      title: "Contrast",
      meta: "WCAG 2.2 AA",
      summary: (passed: number, total: number) => `${passed} of ${total} AA checks`,
      labels: {
        body: "Body text on paper",
        muted: "Secondary text",
        faint: "Metadata",
        primary: "Primary as text",
        primaryFg: "Text on primary",
        focus: "Focus ring",
        borderStrong: "Control borders",
        dangerSolid: "Text on danger",
        successSolid: "Text on success",
        warningSolid: "Text on warning",
        infoSolid: "Text on info",
      } satisfies Record<ContrastCheckId, string>,
      min: "min.",
      pass: "Pass",
      fail: "Fail",
    },
    export: {
      title: "CSS",
      meta: "Overlay on koten-theme",
      body: "The file only overrides semantic values. Components, typography, spacing, shadows and motion still come from Koten.",
      paste:
        "Paste the block at the end of the CSS file declared as tailwind.css, after koten-theme. If you use data-density, that selector can change the density again.",
      copy: "Copy CSS",
      copied: "Copied",
      download: "Download .css",
      blockedTitle: "Export blocked",
      blockedBody:
        "Some pairs are below AA. Use the safe paper or change the pigment before exporting.",
      fix: "Use safe paper",
      fixNote: "Moves paper to the nearest step that passes AA without changing the pigment.",
      file: "koten-custom.css",
    },
    locked: {
      title: "What stays fixed",
      meta: "Guardrails",
      items: [
        "Palette pigments only: Ai, Shu, Kin and Matcha. There is no free color picker.",
        "System fonts only; no full CJK font is loaded.",
        "A 12 px typographic floor and a fixed scale.",
        "Radii from 0 to 3 px; 1 px borders.",
        "Shadows only on overlays; no decorative gradients.",
        "Status colors keep their meaning.",
        "Spacing and densities stay Koten's.",
      ],
    },
    previewLabels: {
      preview: "Specimen",
      product: "Product",
      new: "New",
      productMeta: "HIKARI K-1 · 急須",
      productName: "Cast iron kyūsu",
      productCopy: "Cast iron, 0.8 L. Matte finish, side handle.",
      lowStock: "Low stock",
      add: "Add to order",
      details: "Details",
      specs: "View specs",
      orders: "Orders",
      today: "Today",
      order: "Order",
      client: "Client",
      status: "Status",
      orderRows: [
        { id: "KURA-1042", client: "Aoi Mori", status: "Preparing", tone: "warning" },
        { id: "KURA-1041", client: "Kenji Sato", status: "Shipped", tone: "success" },
        { id: "KURA-1040", client: "Hana Ito", status: "Pending", tone: "info" },
      ] satisfies PreviewLabels["orderRows"],
      contact: "Contact",
      email: "Email",
      emailHint: "Only used for order notices.",
      save: "Save",
      saved: "Customer updated",
      savedBody: "Changes were applied to order KURA-1042.",
    },
  },
};

type Copy = (typeof copy)["es"];
const copyByLocale: Record<KotenLocale, Copy> = copy;

type ChoiceValue = string | number;

function ChoiceGroup<T extends ChoiceValue>({
  legend,
  value,
  options,
  columns = 2,
  onChange,
}: {
  legend: string;
  value: T;
  options: readonly {
    value: T;
    label: string;
    detail?: string;
    swatch?: string;
    swatchAlt?: string;
  }[];
  columns?: 1 | 2 | 3;
  onChange: (value: T) => void;
}) {
  return (
    <fieldset className="m-0 min-w-0 border-0 p-0">
      <legend className="p-0 text-xs font-semibold leading-tight">{legend}</legend>
      <div
        className={cn(
          "mt-1.5 grid gap-1",
          columns === 1 && "grid-cols-1",
          columns === 2 && "grid-cols-2",
          columns === 3 && "grid-cols-3",
        )}
      >
        {options.map((option) => {
          const active = option.value === value;

          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(option.value)}
              className={cn(
                "flex min-w-0 items-center gap-2 border px-2 py-1.5 text-start transition-colors",
                active
                  ? "border-primary-strong bg-selection"
                  : "border-rule bg-surface hover:bg-tint",
              )}
            >
              {option.swatch ? (
                <span
                  aria-hidden="true"
                  className="flex size-5 shrink-0 overflow-hidden border border-rule-strong"
                >
                  <span className="h-full flex-1" style={{ backgroundColor: option.swatch }} />
                  {option.swatchAlt ? (
                    <span className="h-full flex-1" style={{ backgroundColor: option.swatchAlt }} />
                  ) : null}
                </span>
              ) : null}
              <span className="min-w-0 flex-1">
                <span className="block truncate text-xs font-semibold leading-tight">
                  {option.label}
                </span>
                {option.detail ? (
                  <span className="block truncate font-mono text-2xs leading-tight text-faint">
                    {option.detail}
                  </span>
                ) : null}
              </span>
              <span
                aria-hidden="true"
                className={cn(
                  "size-1.5 shrink-0 rounded-full",
                  active ? "bg-primary" : "bg-transparent",
                )}
              />
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function readConfig(): DesignerConfig {
  if (typeof window === "undefined") {
    return defaultDesignerConfig();
  }

  return decodeDesignerConfig(new URLSearchParams(window.location.search).get("ks"));
}

export function ThemeDesignerPage() {
  const { locale } = useKoten();
  const t = copyByLocale[locale];
  const formatters = useKotenFormatters();
  const [config, setConfig] = useState<DesignerConfig>(readConfig);
  const [copied, setCopied] = useState(false);
  const copyRef = useRef<HTMLButtonElement>(null);
  const theme = resolveDesignerTheme(config);
  const css = toDesignerCss(theme);
  const safeConfig = findSafeDesignerConfig(config);
  const canFix = theme.failures > 0 && safeConfig.paper !== config.paper;
  const passed = theme.checks.length - theme.failures;
  const themeName = `${t.base.options[config.base].name} · ${t.pigment.options[config.pigment].name}`;
  const previewLabels: PreviewLabels = {
    ...t.previewLabels,
    price: formatters.formatCurrency(12800),
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("ks", encodeDesignerConfig(config));
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
  }, [config]);

  const update = (patch: Partial<DesignerConfig>) => {
    setConfig((current) => ({ ...current, ...patch }));
  };

  const chooseBase = (base: DesignerBase) => {
    setConfig(defaultDesignerConfig(base));
  };

  const copyCss = async () => {
    if (!navigator.clipboard) return;

    try {
      await navigator.clipboard.writeText(css);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const downloadCss = () => {
    const blob = new Blob([css], { type: "text/css;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = t.export.file;
    document.body.append(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
  };

  const useSafePaper = () => {
    setConfig(safeConfig);
    window.setTimeout(() => copyRef.current?.focus(), 0);
  };

  return (
    <div>
      <PageHeader
        eyebrow={t.eyebrow}
        title={t.title}
        jp={t.jp}
        description={t.description}
        meta={t.meta}
      />

      <div className="mt-[calc(var(--koten-gap)*2)] grid gap-[calc(var(--koten-gap)*2)] lg:grid-cols-[320px_minmax(0,1fr)]">
        <section
          aria-labelledby="theme-parametros"
          className="min-w-0 self-start border border-rule bg-surface p-[var(--koten-panel-p)]"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 id="theme-parametros" className="text-xs font-semibold uppercase tracking-[0.12em]">
              {t.params}
            </h2>
            <Badge tone={theme.failures > 0 ? "danger" : "success"} appearance="outline">
              {theme.failures > 0 ? t.checks.fail : t.checks.pass}
            </Badge>
          </div>

          <div className="mt-[var(--koten-gap)] space-y-[calc(var(--koten-gap)*1.25)]">
            <ChoiceGroup
              legend={t.base.label}
              value={config.base}
              columns={1}
              onChange={chooseBase}
              options={designerBases.map((base) => {
                const baseTheme = resolveDesignerTheme(defaultDesignerConfig(base));

                return {
                  value: base,
                  label: `${t.base.options[base].name} ${t.base.options[base].jp}`,
                  detail: t.base.options[base].detail,
                  swatch: baseTheme.vars["--koten-bg"],
                  swatchAlt: baseTheme.vars["--koten-primary"],
                };
              })}
            />
            <p className="mt-1 text-2xs leading-relaxed text-faint">{t.base.note}</p>

            <ChoiceGroup
              legend={t.pigment.label}
              value={config.pigment}
              columns={2}
              onChange={(pigment) => update({ pigment })}
              options={designerPigments.map((pigment) => ({
                value: pigment,
                label: `${t.pigment.options[pigment].name} ${t.pigment.options[pigment].jp}`,
                detail: t.pigment.options[pigment].detail,
                swatch: pigmentHexFor(config.base, pigment),
              }))}
            />

            <ChoiceGroup
              legend={t.paper.label}
              value={config.paper}
              columns={2}
              onChange={(paper) => update({ paper })}
              options={paperStepsFor(config.base).map((hex, index) => ({
                value: index,
                label: `${t.paper.step} ${index + 1}`,
                detail: hex.toUpperCase(),
                swatch: hex,
              }))}
            />

            <ChoiceGroup
              legend={t.radius.label}
              value={config.radius}
              columns={2}
              onChange={(radius) => update({ radius })}
              options={([0, 1, 2, 3] as const).map((radius) => ({
                value: radius,
                label: `${radius} px`,
                detail: t.radius.names[radius],
              }))}
            />

            <ChoiceGroup
              legend={t.density.label}
              value={config.density}
              columns={1}
              onChange={(density) => update({ density })}
              options={designerDensities.map((density) => ({
                value: density,
                label: densityLabels[density][locale],
                detail: densityTokens[density].rowH,
              }))}
            />

            <Button
              variant="secondary"
              size="sm"
              className="w-full"
              onClick={() => setConfig(defaultDesignerConfig(config.base))}
            >
              {t.reset.replace("{base}", t.base.options[config.base].name)}
            </Button>
          </div>
        </section>

        <div className="min-w-0 space-y-[calc(var(--koten-gap)*2)]">
          <Section id="theme-vista" title={t.preview} jp="表示" meta={t.previewMeta}>
            <ThemePreview theme={theme} name={themeName} labels={previewLabels} />
            <p className="mt-2 text-2xs leading-relaxed text-faint">{t.previewNote}</p>
          </Section>

          <Section id="theme-contraste" title={t.checks.title} jp="検証" meta={t.checks.meta}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs font-semibold">
                {t.checks.summary(passed, theme.checks.length)}
              </p>
              <Badge tone={theme.failures > 0 ? "danger" : "success"} appearance="outline">
                {theme.failures > 0 ? t.checks.fail : t.checks.pass}
              </Badge>
            </div>
            <ul className="mt-[var(--koten-gap)] divide-y divide-rule border-y border-rule">
              {theme.checks.map((check) => (
                <li
                  key={check.id}
                  className="grid min-h-[var(--koten-row-h)] grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-x-3 gap-y-0.5 py-1"
                >
                  <span className="min-w-0 text-xs text-muted">
                    {t.checks.labels[check.id]}
                    <span className="ms-1 text-2xs text-faint">
                      · {t.checks.min} {formatRatio(check.min)}
                    </span>
                  </span>
                  <span className="whitespace-nowrap font-mono text-2xs tabular-nums text-ink">
                    {formatRatio(check.ratio)}
                  </span>
                  <span
                    className={cn(
                      "whitespace-nowrap text-2xs font-semibold",
                      check.pass ? "text-success" : "text-danger",
                    )}
                  >
                    {check.pass ? t.checks.pass : t.checks.fail}
                  </span>
                </li>
              ))}
            </ul>
          </Section>

          <Section id="theme-css" title={t.export.title} jp="出力" meta={t.export.meta}>
            <p className="text-xs leading-relaxed text-muted">{t.export.body}</p>

            {theme.failures > 0 ? (
              <Alert tone="danger" title={t.export.blockedTitle} className="mt-[var(--koten-gap)]">
                <p>{t.export.blockedBody}</p>
                {canFix ? (
                  <>
                    <Button variant="secondary" size="sm" className="mt-2" onClick={useSafePaper}>
                      {t.export.fix}
                    </Button>
                    <p className="mt-1 text-2xs text-faint">{t.export.fixNote}</p>
                  </>
                ) : null}
              </Alert>
            ) : null}

            <div className="mt-[var(--koten-gap)] border border-rule">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rule bg-surface px-[var(--koten-panel-p)] py-1.5">
                <span className="font-mono text-2xs text-muted">{t.export.file}</span>
                <div className="flex flex-wrap gap-1.5">
                  <Button
                    ref={copyRef}
                    variant="secondary"
                    size="sm"
                    disabled={theme.failures > 0}
                    onClick={copyCss}
                  >
                    {copied ? t.export.copied : t.export.copy}
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    disabled={theme.failures > 0}
                    onClick={downloadCss}
                  >
                    {t.export.download}
                  </Button>
                </div>
              </div>
              <pre
                tabIndex={0}
                className="max-h-[28rem] overflow-auto whitespace-pre-wrap break-words bg-tint p-[var(--koten-panel-p)] font-mono text-2xs leading-relaxed"
              >
                <code>{css}</code>
              </pre>
            </div>
            <p className="mt-2 text-2xs leading-relaxed text-faint">{t.export.paste}</p>
            <span aria-live="polite" className="sr-only">
              {copied ? t.export.copied : ""}
            </span>
          </Section>

          <Section id="theme-limites" title={t.locked.title} jp="制約" meta={t.locked.meta}>
            <ul className="grid gap-[var(--koten-gap)] text-xs text-muted sm:grid-cols-2">
              {t.locked.items.map((item) => (
                <li key={item} className="border-s-2 border-primary ps-2">
                  {item}
                </li>
              ))}
            </ul>
          </Section>
        </div>
      </div>
    </div>
  );
}
