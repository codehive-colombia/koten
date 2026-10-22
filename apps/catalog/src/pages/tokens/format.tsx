// biome-ignore-all lint/a11y/noNoninteractiveTabindex: scroll regions kept keyboard accessible (F4-002).
import {
  formatCurrency,
  formatDate,
  formatNumber,
  type KotenBuiltInLocale,
  type KotenLabels,
  type KotenLocale,
  KotenProvider,
  labelsByLocale,
  useKoten,
  useKotenFormatters,
} from "@koten/ui";
import { Code, PageHeader } from "../../components/docs";
import { Section, SubHeading } from "../../components/specimen";
import { PackageManagerTabs } from "../../components/view-toggles";
import { usePackageManager } from "../../lib/package-manager";
import { registryCommand } from "../../lib/site";

const localeNames: readonly { id: KotenBuiltInLocale; label: string }[] = [
  { id: "es", label: "Español" },
  { id: "ja", label: "日本語" },
  { id: "en", label: "English" },
];

const snapshotDate = Date.UTC(2026, 9, 21, 12);

const frenchLabels: KotenLabels = {
  close: "Fermer",
  previous: "Précédent",
  next: "Suivant",
  empty: "Aucun résultat",
  loading: "Chargement…",
  select: "Sélectionner",
  remove: "Retirer",
  search: "Rechercher",
  clear: "Effacer",
  apply: "Appliquer",
  cancel: "Annuler",
  confirm: "Confirmer",
  more: "Plus d’options",
  expand: "Développer",
  collapse: "Réduire",
  sortAscending: "Tri croissant",
  sortDescending: "Tri décroissant",
  selectAll: "Tout sélectionner",
  selected: "sélectionnés",
  noResults: "Aucun résultat trouvé",
  required: "Obligatoire",
  optional: "Facultatif",
};

const registerDictionary = `import en from "./messages/en.json";
import es from "./messages/es.json";

export const labelsByLocale = { en, es } satisfies Record<string, KotenLabels>;`;
const customLocale = `import { KotenProvider } from "@/lib/koten/i18n/provider";

<KotenProvider
  locale="fr-FR"
  labels={{ close: "Fermer", next: "Suivant" }}
  currency="EUR"
>
  <App />
</KotenProvider>;`;

const copy = {
  es: {
    eyebrow: "Fundamentos · 言語と書式",
    title: "i18n y formato",
    description:
      "Koten no impone un runtime de contenido: separa los labels internos del kit, el copy de tu producto y el formato de Intl. Cualquier locale BCP 47 funciona; ES/JA/EN son los idiomas de esta documentación y los diccionarios incluidos, no un requisito.",
    meta: "3 capas · cualquier BCP 47 · JSON opcional",
    preview: {
      title: "Vista previa",
      meta: "Responde al selector de idioma",
      closeLabel: "Label close",
      date: "Fecha",
      currency: "Moneda",
      number: "Número",
    },
    model: {
      title: "Tres capas",
      meta: "Qué es de quién",
      heading: "El kit no traduce tu producto",
      body: "Los componentes reciben todo por props o por el provider. Koten solo posee los labels internos y los formateadores; el copy de la app y la decisión de qué idiomas soporta quedan de tu lado.",
      layers: [
        {
          name: "Labels del kit",
          owner: "Koten",
          where: "lib/koten/i18n/messages/*.json",
          body: "Cerrar, buscar, anterior… Son 21 strings y viven en un JSON por idioma.",
        },
        {
          name: "Copy del producto",
          owner: "Tu app",
          where: "tus diccionarios",
          body: "Títulos, precios, validaciones. Podés usar un objeto tipado, i18next, FormatJS o Lingui.",
        },
        {
          name: "Formato",
          owner: "Intl",
          where: "useKotenFormatters()",
          body: "Fechas, moneda y números. El provider fija locale, currency y timeZone.",
        },
      ],
    },
    install: {
      title: "Instalar idiomas",
      meta: "El runtime es obligatorio; los idiomas no",
      body: "Cada componente depende de koten-i18n, que instala el runtime y el inglés base en lib/koten/i18n. Los packs de idioma son opcionales: instalás solo los que necesitás.",
      coreLabel: "Runtime y base",
      packLabel: "Diccionario ES (opcional)",
      registerLabel: "Registrar el diccionario",
      runnerLabel: "Ejecutar con",
      registerBody:
        "Después de instalar un pack, agregalo a dictionaries.ts. El inglés se queda como fallback.",
      note: "Si instalás otro componente, el CLI reutiliza lib/koten/i18n; revisá el aviso de sobrescritura antes de aceptar para no pisar tus traducciones.",
      jsonNote:
        "Los diccionarios son JSON: tu tsconfig necesita resolveJsonModule. Vite y Next lo traen por defecto.",
    },
    custom: {
      title: "Un idioma propio",
      meta: "fr-FR en vivo",
      body: "Un locale sin diccionario usa el inglés base. Podés reemplazar todos los labels con un diccionario completo o pisar solo algunos; el resto cae al inglés. Para leer el locale en la app, usá `useKoten<string>()` o tu propia unión.",
      closeLabel: "Label close",
      nextLabel: "Label next",
      date: "Fecha",
      currency: "Moneda",
      number: "Número",
      fallback:
        "El bloque en vivo usa un diccionario francés completo y currency=EUR; el código muestra cómo pisar solo algunos labels. El texto de la página sigue en el idioma del selector.",
    },
    limits: {
      title: "Límites",
      meta: "Lo que Koten no hace",
      heading: "El runtime de contenido es tuyo",
      items: [
        "No hay interpolación, plurales ni mensajes anidados: los labels son strings planos.",
        "No carga JSON en runtime ni hace fetch: los diccionarios se importan en build.",
        "No traduce rutas, metadatos ni el contenido de tu producto.",
        "No cambia el lang del documento: lo declara tu app.",
      ],
    },
    comparison: {
      title: "Comparación",
      meta: "Los tres diccionarios incluidos",
      caption: "Ejemplos de fecha, moneda, número y label en español, japonés e inglés",
      language: "Idioma",
      date: "Fecha",
      currency: "Moneda",
      number: "Número",
      close: "Label: close",
    },
    rules: {
      title: "Reglas",
      meta: "Contrato de i18n",
      heading: "Lo que garantiza el sistema",
      items: [
        "Los componentes no incluyen strings: reciben labels por prop o de KotenProvider.",
        "locale acepta cualquier BCP 47; ES/JA/EN son los diccionarios incluidos, no un requisito.",
        "Un locale sin diccionario cae al inglés; labels permite un diccionario completo o parcial.",
        "useKoten() tipa el locale como los diccionarios instalados; para otro idioma, usá useKoten<string>() o tu propia unión.",
        "JPY se formatea sin decimales; EUR y USD con dos.",
        "El idioma se declara con lang en el documento y en cada fragmento.",
        "Los helpers aceptan códigos cortos o un BCP 47 completo.",
        "Las fechas y monedas usan Intl, nunca strings concatenadas.",
      ],
    },
  },
  ja: {
    eyebrow: "基礎 · 言語と書式",
    title: "i18nと書式",
    description:
      "Kotenはコンテンツのランタイムを強制しない。キット内部のラベル、プロダクトのコピー、Intlの書式を分離する。任意のBCP 47ロケールが使える。ES/JA/ENはこのドキュメントと言語辞書の言語であり、必須ではない。",
    meta: "3つの層 · 任意のBCP 47 · JSONは任意",
    preview: {
      title: "プレビュー",
      meta: "言語セレクタに反応する",
      closeLabel: "ラベル: close",
      date: "日付",
      currency: "通貨",
      number: "数値",
    },
    model: {
      title: "3つの層",
      meta: "何が誰のものか",
      heading: "キットはプロダクトを翻訳しない",
      body: "コンポーネントはすべてpropまたはproviderから受け取る。Kotenが持つのは内部ラベルとフォーマッタだけ。アプリのコピーと対応言語の決定はアプリ側にある。",
      layers: [
        {
          name: "キットのラベル",
          owner: "Koten",
          where: "lib/koten/i18n/messages/*.json",
          body: "閉じる、検索、前へ… 21個の文字列を言語ごとのJSONに置く。",
        },
        {
          name: "プロダクトのコピー",
          owner: "あなたのアプリ",
          where: "アプリの辞書",
          body: "見出し、価格、バリデーション。型付きオブジェクト、i18next、FormatJS、Linguiのいずれでもよい。",
        },
        {
          name: "書式",
          owner: "Intl",
          where: "useKotenFormatters()",
          body: "日付、通貨、数値。providerがlocale、currency、timeZoneを固定する。",
        },
      ],
    },
    install: {
      title: "言語を追加する",
      meta: "ランタイムは必須、言語は任意",
      body: "各コンポーネントはkoten-i18nに依存し、ランタイムと英語のベースをlib/koten/i18nに導入する。言語パックは任意で、必要なものだけ入れる。",
      coreLabel: "ランタイムとベース",
      packLabel: "ES辞書（任意）",
      registerLabel: "辞書を登録する",
      runnerLabel: "実行",
      registerBody: "パックを入れたらdictionaries.tsに追加する。英語はフォールバックとして残す。",
      note: "別のコンポーネントを入れるとCLIはlib/koten/i18nを再利用する。上書き確認が出たら、翻訳を消さないように確認する。",
      jsonNote:
        "辞書はJSONです。tsconfigにresolveJsonModuleが必要です。ViteとNextは既定で有効です。",
    },
    custom: {
      title: "独自の言語",
      meta: "fr-FRをライブで",
      body: "辞書のないロケールは英語のベースを使う。完全な辞書で全ラベルを置き換えても、一部だけ上書きしてもよい。残りは英語にフォールバックする。アプリでロケールを読むには `useKoten<string>()` か独自のunionを使う。",
      closeLabel: "ラベル: close",
      nextLabel: "ラベル: next",
      date: "日付",
      currency: "通貨",
      number: "数値",
      fallback:
        "ライブブロックは完全なフランス語辞書とcurrency=EURを使う。コードは一部のラベルだけを上書きする例。ページ本文はセレクタの言語のまま。",
    },
    limits: {
      title: "限界",
      meta: "Kotenがやらないこと",
      heading: "コンテンツのランタイムはアプリ側",
      items: [
        "補間、複数形、ネストしたメッセージはない。ラベルはプレーンな文字列。",
        "実行時にJSONを取得しない。辞書はビルド時にimportする。",
        "ルート、メタデータ、プロダクト本文は翻訳しない。",
        "文書のlangは変更しない。アプリが宣言する。",
      ],
    },
    comparison: {
      title: "比較",
      meta: "同梱する3つの辞書",
      caption: "スペイン語・日本語・英語での日付、通貨、数値、ラベルの例",
      language: "言語",
      date: "日付",
      currency: "通貨",
      number: "数値",
      close: "ラベル: close",
    },
    rules: {
      title: "規則",
      meta: "i18nの契約",
      heading: "システムが保証すること",
      items: [
        "コンポーネントは文字列を含まない。ラベルはpropまたはKotenProviderから受け取る。",
        "localeは任意のBCP 47。ES/JA/ENは同梱辞書であり、必須ではない。",
        "辞書のないロケールは英語にフォールバックする。labelsは完全辞書も部分上書きも受け付ける。",
        "useKoten() の locale は導入済み辞書の型。別の言語は useKoten<string>() か独自のunionを使う。",
        "JPYは小数なし、EURとUSDは小数2桁で整形する。",
        "言語は文書と各断片の lang で宣言する。",
        "ヘルパーは短いコードも完全なBCP 47も受け付ける。",
        "日付と通貨はIntlを使い、文字列連結はしない。",
      ],
    },
  },
  en: {
    eyebrow: "Foundations · 言語と書式",
    title: "i18n & format",
    description:
      "Koten does not impose a content runtime: it separates the kit's internal labels, your product copy and Intl formatting. Any BCP 47 locale works; ES/JA/EN are this documentation's languages and the included dictionaries, not a requirement.",
    meta: "3 layers · any BCP 47 · optional JSON",
    preview: {
      title: "Preview",
      meta: "Follows the language selector",
      closeLabel: "Label close",
      date: "Date",
      currency: "Currency",
      number: "Number",
    },
    model: {
      title: "Three layers",
      meta: "Who owns what",
      heading: "The kit does not translate your product",
      body: "Components receive everything by prop or from the provider. Koten owns only the internal labels and the formatters; your app copy and the set of supported languages stay on your side.",
      layers: [
        {
          name: "Kit labels",
          owner: "Koten",
          where: "lib/koten/i18n/messages/*.json",
          body: "Close, search, previous… 21 strings, one JSON per language.",
        },
        {
          name: "Product copy",
          owner: "Your app",
          where: "your dictionaries",
          body: "Headings, prices, validation. Use a typed object, i18next, FormatJS or Lingui.",
        },
        {
          name: "Formatting",
          owner: "Intl",
          where: "useKotenFormatters()",
          body: "Dates, currency and numbers. The provider sets locale, currency and timeZone.",
        },
      ],
    },
    install: {
      title: "Install languages",
      meta: "The runtime is required; languages are not",
      body: "Every component depends on koten-i18n, which installs the runtime and the English base in lib/koten/i18n. Language packs are optional: install only the ones you need.",
      coreLabel: "Runtime and base",
      packLabel: "ES dictionary (optional)",
      registerLabel: "Register the dictionary",
      runnerLabel: "Run with",
      registerBody:
        "After installing a pack, add it to dictionaries.ts. English stays as the fallback.",
      note: "Installing another component reuses lib/koten/i18n; check the overwrite prompt before accepting so you do not replace your translations.",
      jsonNote:
        "Dictionaries are JSON: your tsconfig needs resolveJsonModule. Vite and Next enable it by default.",
    },
    custom: {
      title: "A custom language",
      meta: "Live fr-FR",
      body: "A locale without a dictionary uses the English base. Replace every label with a full dictionary or override only a few; the rest falls back to English. To read the locale in your app, use `useKoten<string>()` or your own union.",
      closeLabel: "Label close",
      nextLabel: "Label next",
      date: "Date",
      currency: "Currency",
      number: "Number",
      fallback:
        "The live block uses a full French dictionary and currency=EUR; the code shows a partial override. The page body stays in the selector language.",
    },
    limits: {
      title: "Limits",
      meta: "What Koten does not do",
      heading: "The content runtime is yours",
      items: [
        "No interpolation, plurals or nested messages: labels are plain strings.",
        "No runtime JSON loading or fetch: dictionaries are imported at build time.",
        "No route, metadata or product content translation.",
        "No document lang changes: your app declares it.",
      ],
    },
    comparison: {
      title: "Comparison",
      meta: "The three included dictionaries",
      caption: "Examples of date, currency, number and label in Spanish, Japanese and English",
      language: "Language",
      date: "Date",
      currency: "Currency",
      number: "Number",
      close: "Label: close",
    },
    rules: {
      title: "Rules",
      meta: "i18n contract",
      heading: "What the system guarantees",
      items: [
        "Components include no strings: labels come from props or KotenProvider.",
        "locale accepts any BCP 47; ES/JA/EN are included dictionaries, not a requirement.",
        "A locale without a dictionary falls back to English; labels accepts a full or partial dictionary.",
        "useKoten() types locale as the installed dictionaries; for another language, use useKoten<string>() or your own union.",
        "JPY is formatted without decimals; EUR and USD with two.",
        "Language is declared with lang on the document and on each fragment.",
        "Helpers accept short codes or a full BCP 47 tag.",
        "Dates and currencies use Intl, never concatenated strings.",
      ],
    },
  },
};
type Copy = (typeof copy)["es"];
const copyByLocale: Record<KotenLocale, Copy> = copy;

function FrenchPreview({ custom }: { custom: Copy["custom"] }) {
  return (
    <KotenProvider locale="fr-FR" labels={frenchLabels} currency="EUR" timeZone="Europe/Paris">
      <FrenchPreviewBody custom={custom} />
    </KotenProvider>
  );
}

function FrenchPreviewBody({ custom }: { custom: Copy["custom"] }) {
  const { labels } = useKoten();
  const formatters = useKotenFormatters();

  return (
    <div lang="fr-FR" className="border border-rule bg-surface">
      <dl className="grid gap-[var(--koten-gap)] p-[var(--koten-panel-p)] sm:grid-cols-2 lg:grid-cols-5">
        <div>
          <dt className="text-2xs text-faint">{custom.closeLabel}</dt>
          <dd className="mt-0.5 text-sm font-semibold">{labels.close}</dd>
        </div>
        <div>
          <dt className="text-2xs text-faint">{custom.nextLabel}</dt>
          <dd className="mt-0.5 text-sm font-semibold">{labels.next}</dd>
        </div>
        <div>
          <dt className="text-2xs text-faint">{custom.date}</dt>
          <dd className="mt-0.5 text-sm tabular-nums">
            {formatters.formatDate(snapshotDate, { timeZone: "UTC" })}
          </dd>
        </div>
        <div>
          <dt className="text-2xs text-faint">{custom.currency}</dt>
          <dd className="mt-0.5 text-sm font-semibold tabular-nums text-primary">
            {formatters.formatCurrency(128000)}
          </dd>
        </div>
        <div>
          <dt className="text-2xs text-faint">{custom.number}</dt>
          <dd className="mt-0.5 text-sm tabular-nums">{formatters.formatNumber(1234567)}</dd>
        </div>
      </dl>
      <p className="border-t border-rule px-[var(--koten-panel-p)] py-2 text-2xs text-muted">
        {custom.fallback}
      </p>
    </div>
  );
}

export function TokensFormatPage() {
  const { locale, labels } = useKoten();
  const formatters = useKotenFormatters();
  const { packageManager, setPackageManager } = usePackageManager();
  const t = copyByLocale[locale];
  const current = localeNames.find((item) => item.id === locale);
  const coreCommand = registryCommand("koten-i18n", packageManager);
  const packCommand = registryCommand("koten-i18n-es", packageManager);

  return (
    <div>
      <PageHeader
        eyebrow={t.eyebrow}
        title={t.title}
        jp="言葉"
        description={t.description}
        meta={t.meta}
      />

      <div className="mt-[calc(var(--koten-gap)*2)] space-y-[calc(var(--koten-gap)*2)]">
        <Section id="vista-previa" title={t.preview.title} jp="現在" meta={t.preview.meta}>
          <div lang={locale} className="border border-rule bg-surface">
            <div className="flex min-h-[var(--koten-row-h)] items-center justify-between gap-2 border-b border-rule bg-tint px-[var(--koten-panel-p)]">
              <p className="text-xs font-semibold">{current?.label ?? locale}</p>
              <code className="text-2xs text-faint">{locale}</code>
            </div>
            <dl className="grid gap-[var(--koten-gap)] p-[var(--koten-panel-p)] sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <dt className="text-2xs text-faint">{t.preview.closeLabel}</dt>
                <dd className="mt-0.5 text-sm font-semibold">{labels.close}</dd>
              </div>
              <div>
                <dt className="text-2xs text-faint">{t.preview.date}</dt>
                <dd className="mt-0.5 text-sm tabular-nums">
                  {formatters.formatDate(snapshotDate, { timeZone: "UTC" })}
                </dd>
              </div>
              <div>
                <dt className="text-2xs text-faint">{t.preview.currency}</dt>
                <dd className="mt-0.5 text-sm font-semibold tabular-nums text-primary">
                  {formatters.formatCurrency(128000)}
                </dd>
              </div>
              <div>
                <dt className="text-2xs text-faint">{t.preview.number}</dt>
                <dd className="mt-0.5 text-sm tabular-nums">{formatters.formatNumber(1234567)}</dd>
              </div>
            </dl>
          </div>
        </Section>

        <Section id="modelo" title={t.model.title} jp="層" meta={t.model.meta}>
          <SubHeading>{t.model.heading}</SubHeading>
          <p className="mt-1 max-w-[72ch] text-xs text-muted">{t.model.body}</p>
          <div className="mt-[var(--koten-gap)] grid gap-[var(--koten-gap)] lg:grid-cols-3">
            {t.model.layers.map((layer) => (
              <article
                key={layer.name}
                className="border border-rule bg-surface p-[var(--koten-panel-p)]"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="text-xs font-semibold">{layer.name}</h3>
                  <span className="text-2xs text-faint">{layer.owner}</span>
                </div>
                <code className="mt-1 block break-words text-2xs text-primary-strong">
                  {layer.where}
                </code>
                <p className="mt-[var(--koten-gap)] text-xs text-muted">{layer.body}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section id="instalacion" title={t.install.title} jp="導入" meta={t.install.meta}>
          <p className="max-w-[72ch] text-xs text-muted">{t.install.body}</p>
          <div className="mt-[var(--koten-gap)]">
            <PackageManagerTabs
              value={packageManager}
              label={t.install.runnerLabel}
              onChange={setPackageManager}
            />
          </div>
          <div className="mt-[var(--koten-gap)] grid gap-[var(--koten-gap)] lg:grid-cols-2">
            <div>
              <SubHeading>{t.install.coreLabel}</SubHeading>
              <Code>{coreCommand}</Code>
            </div>
            <div>
              <SubHeading>{t.install.packLabel}</SubHeading>
              <Code>{packCommand}</Code>
            </div>
          </div>
          <div className="mt-[var(--koten-gap)]">
            <SubHeading>{t.install.registerLabel}</SubHeading>
            <p className="mt-1 text-xs text-muted">{t.install.registerBody}</p>
            <Code>{registerDictionary}</Code>
          </div>
          <p className="mt-[var(--koten-gap)] border-s-2 border-primary ps-2 text-xs text-muted">
            {t.install.note}
          </p>
          <p className="mt-1 border-s-2 border-rule-strong ps-2 text-xs text-muted">
            {t.install.jsonNote}
          </p>
        </Section>

        <Section id="idioma-propio" title={t.custom.title} jp="自国語" meta={t.custom.meta}>
          <p className="max-w-[72ch] text-xs text-muted">{t.custom.body}</p>
          <div className="mt-[var(--koten-gap)]">
            <FrenchPreview custom={t.custom} />
          </div>
          <Code>{customLocale}</Code>
        </Section>

        <Section id="comparacion" title={t.comparison.title} jp="比較" meta={t.comparison.meta}>
          <div tabIndex={0} className="overflow-x-auto border border-rule">
            <table className="w-full min-w-[40rem] border-collapse text-start">
              <caption className="sr-only">{t.comparison.caption}</caption>
              <thead>
                <tr className="h-[var(--koten-row-h)] border-b border-rule-strong bg-tint text-2xs text-muted">
                  <th scope="col" className="px-[var(--koten-control-px)] font-semibold">
                    {t.comparison.language}
                  </th>
                  <th scope="col" className="px-[var(--koten-control-px)] font-semibold">
                    {t.comparison.date}
                  </th>
                  <th scope="col" className="px-[var(--koten-control-px)] text-end font-semibold">
                    {t.comparison.currency}
                  </th>
                  <th scope="col" className="px-[var(--koten-control-px)] text-end font-semibold">
                    {t.comparison.number}
                  </th>
                  <th scope="col" className="px-[var(--koten-control-px)] font-semibold">
                    {t.comparison.close}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rule">
                {localeNames.map((item) => (
                  <tr key={item.id} lang={item.id} className="h-[var(--koten-row-h)]">
                    <th scope="row" className="px-[var(--koten-control-px)] text-xs font-medium">
                      {item.label} <code className="font-mono text-2xs text-faint">{item.id}</code>
                    </th>
                    <td className="whitespace-nowrap px-[var(--koten-control-px)] text-xs">
                      {formatDate(snapshotDate, { locale: item.id, timeZone: "UTC" })}
                    </td>
                    <td className="whitespace-nowrap px-[var(--koten-control-px)] text-end text-xs tabular-nums">
                      {formatCurrency(128000, { locale: item.id })}
                    </td>
                    <td className="whitespace-nowrap px-[var(--koten-control-px)] text-end text-xs tabular-nums">
                      {formatNumber(1234567, { locale: item.id })}
                    </td>
                    <td className="whitespace-nowrap px-[var(--koten-control-px)] text-xs">
                      {labelsByLocale[item.id].close}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section id="limites" title={t.limits.title} jp="限界" meta={t.limits.meta}>
          <SubHeading>{t.limits.heading}</SubHeading>
          <ul className="mt-[var(--koten-gap)] grid gap-[var(--koten-gap)] text-xs text-muted sm:grid-cols-2">
            {t.limits.items.map((item) => (
              <li key={item} className="border-s-2 border-rule-strong ps-2">
                {item}
              </li>
            ))}
          </ul>
        </Section>

        <Section id="reglas" title={t.rules.title} jp="規則" meta={t.rules.meta}>
          <SubHeading>{t.rules.heading}</SubHeading>
          <ul className="mt-[var(--koten-gap)] grid gap-[var(--koten-gap)] text-xs text-muted sm:grid-cols-2">
            {t.rules.items.map((rule) => (
              <li key={rule} className="border-s-2 border-primary ps-2">
                {rule}
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </div>
  );
}
