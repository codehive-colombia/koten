import { Calendar, DatePicker, type DateRange, type KotenLocale, useKoten } from "@koten/ui";
import { useState } from "react";
import { Code, Demo, List, PageHeader, PropsTable } from "../../components/docs";
import { Section } from "../../components/specimen";

const copy = {
  es: {
    eyebrow: "Componentes · 日付",
    title: "DatePicker",
    description:
      "Calendar y DatePicker cubren fecha simple y rango sin dependencias: navegación con flechas, PageUp/PageDown, Home/End, selección con Enter y formato con Intl. El panel no usa portal: se ancla al campo.",
    meta: "calendar · date-picker · single + range",
    sections: {
      single: { title: "Fecha simple", meta: "Un día, formato del locale" },
      range: { title: "Rango", meta: "Inicio y fin; se invierte si hace falta" },
      calendar: { title: "Calendar", meta: "Rejilla sin campo" },
      props: { title: "Props y código", meta: "Dos piezas" },
      a11y: { title: "Accesibilidad", meta: "Teclado, nombres y estado" },
    },
    single: {
      demo: "Entrega",
      label: "Fecha de entrega",
      description: "Abre con Enter, Space o clic; Escape cierra y devuelve el foco.",
      placeholder: "Selecciona una fecha",
    },
    range: {
      demo: "Campaña",
      label: "Periodo de campaña",
      note: "Primer clic: inicio. Segundo clic: fin.",
    },
    calendar: {
      demo: "Octubre de 2026",
      label: "Calendario de ejemplo",
    },
    props: {
      caption: "Props de DatePicker y Calendar",
      rows: [
        {
          prop: "DatePicker mode",
          type: "single | range",
          default: "single",
          note: "En rango, el valor es { start, end }.",
        },
        {
          prop: "DatePicker value / defaultValue",
          type: "Date | DateRange | null",
          default: "null",
          note: "Controlado o no controlado.",
        },
        {
          prop: "DatePicker onValueChange",
          type: "(value) => void",
          default: "—",
          note: "Recibe Date o DateRange según el modo.",
        },
        {
          prop: "DatePicker min / max",
          type: "Date",
          default: "—",
          note: "Los días fuera del rango quedan deshabilitados.",
        },
        {
          prop: "DatePicker defaultMonth",
          type: "Date",
          default: "valor u hoy",
          note: "Mes con el que abre el panel.",
        },
        {
          prop: "Calendar selected / onSelect",
          type: "Date | null",
          default: "—",
          note: "Modo simple; en rango usar rangeStart/rangeEnd.",
        },
        {
          prop: "Calendar month / onMonthChange",
          type: "Date",
          default: "—",
          note: "Controla el mes visible.",
        },
      ],
    },
    code: `const [due, setDue] = useState<Date | null>(null);

<DatePicker
  label="Fecha de entrega"
  value={due}
  onValueChange={setDue}
  min={new Date(2026, 9, 22)}
/>

const [range, setRange] = useState<DateRange>({ start: null, end: null });

<DatePicker
  mode="range"
  label="Periodo de campaña"
  value={range}
  onValueChange={setRange}
/>`,
    a11y: {
      label: "Notas de accesibilidad del calendario",
      items: [
        "La rejilla es una tabla con encabezados de día y nombre accesible completo en cada fecha.",
        "Flechas mueven un día o una semana; Home/End, la semana; PageUp/PageDown, el mes.",
        "Enter selecciona el día enfocado; Space también.",
        "Solo el día enfocado tiene tabindex 0: un único paso de tabulación por rejilla.",
        'aria-pressed marca la selección y aria-current="date" marca hoy.',
        "Escape cierra el panel y devuelve el foco al botón del campo.",
      ],
    },
  },
  ja: {
    eyebrow: "部品 · 日付",
    title: "DatePicker",
    description:
      "Calendar と DatePicker は依存なしで単一日付と範囲を扱います。矢印、PageUp/PageDown、Home/End、Enter での選択、Intl による書式。パネルはポータルを使わずフィールドに固定されます。",
    meta: "calendar · date-picker · single + range",
    sections: {
      single: { title: "単一日付", meta: "ロケールの書式" },
      range: { title: "範囲", meta: "開始と終了。逆順は自動で入れ替え" },
      calendar: { title: "Calendar", meta: "フィールドなしのグリッド" },
      props: { title: "Props とコード", meta: "2つの部品" },
      a11y: { title: "アクセシビリティ", meta: "キーボード・名前・状態" },
    },
    single: {
      demo: "お届け",
      label: "お届け日",
      description: "Enter、Space、クリックで開き、Escape で閉じてフォーカスを戻します。",
      placeholder: "日付を選択",
    },
    range: {
      demo: "キャンペーン",
      label: "キャンペーン期間",
      note: "1回目で開始、2回目で終了。",
    },
    calendar: {
      demo: "2026年10月",
      label: "カレンダーの例",
    },
    props: {
      caption: "DatePicker と Calendar の props",
      rows: [
        {
          prop: "DatePicker mode",
          type: "single | range",
          default: "single",
          note: "範囲では値は { start, end }。",
        },
        {
          prop: "DatePicker value / defaultValue",
          type: "Date | DateRange | null",
          default: "null",
          note: "制御・非制御の両方に対応。",
        },
        {
          prop: "DatePicker onValueChange",
          type: "(value) => void",
          default: "—",
          note: "モードに応じて Date または DateRange。",
        },
        {
          prop: "DatePicker min / max",
          type: "Date",
          default: "—",
          note: "範囲外の日は無効になります。",
        },
        {
          prop: "DatePicker defaultMonth",
          type: "Date",
          default: "値または今日",
          note: "パネルを開く月。",
        },
        {
          prop: "Calendar selected / onSelect",
          type: "Date | null",
          default: "—",
          note: "単一モード。範囲は rangeStart/rangeEnd。",
        },
        {
          prop: "Calendar month / onMonthChange",
          type: "Date",
          default: "—",
          note: "表示月を制御。",
        },
      ],
    },
    code: `const [due, setDue] = useState<Date | null>(null);

<DatePicker
  label="お届け日"
  value={due}
  onValueChange={setDue}
  min={new Date(2026, 9, 22)}
/>

const [range, setRange] = useState<DateRange>({ start: null, end: null });

<DatePicker
  mode="range"
  label="キャンペーン期間"
  value={range}
  onValueChange={setRange}
/>`,
    a11y: {
      label: "カレンダーのアクセシビリティ",
      items: [
        "グリッドは曜日見出しを持つテーブルで、各日付に完全なアクセシブル名があります。",
        "矢印は1日/1週、Home/End は週、PageUp/PageDown は月を移動します。",
        "Enter または Space でフォーカス中の日を選択します。",
        "tabindex 0 はフォーカス中の日だけ。グリッドごとにタブ移動は1回です。",
        '選択は aria-pressed、今日は aria-current="date" で示します。',
        "Escape でパネルを閉じ、フィールドのボタンにフォーカスを戻します。",
      ],
    },
  },
  en: {
    eyebrow: "Components · 日付",
    title: "DatePicker",
    description:
      "Calendar and DatePicker handle single dates and ranges with no dependencies: arrow keys, PageUp/PageDown, Home/End, Enter to select and Intl formatting. The panel is anchored to the field, not portalled.",
    meta: "calendar · date-picker · single + range",
    sections: {
      single: { title: "Single date", meta: "One day, locale formatting" },
      range: { title: "Range", meta: "Start and end; swaps when needed" },
      calendar: { title: "Calendar", meta: "Grid without a field" },
      props: { title: "Props and code", meta: "Two pieces" },
      a11y: { title: "Accessibility", meta: "Keyboard, names and state" },
    },
    single: {
      demo: "Delivery",
      label: "Delivery date",
      description: "Opens with Enter, Space or click; Escape closes and returns focus.",
      placeholder: "Pick a date",
    },
    range: {
      demo: "Campaign",
      label: "Campaign period",
      note: "First click sets the start; second click sets the end.",
    },
    calendar: {
      demo: "October 2026",
      label: "Example calendar",
    },
    props: {
      caption: "DatePicker and Calendar props",
      rows: [
        {
          prop: "DatePicker mode",
          type: "single | range",
          default: "single",
          note: "In range mode the value is { start, end }.",
        },
        {
          prop: "DatePicker value / defaultValue",
          type: "Date | DateRange | null",
          default: "null",
          note: "Controlled or uncontrolled.",
        },
        {
          prop: "DatePicker onValueChange",
          type: "(value) => void",
          default: "—",
          note: "Receives Date or DateRange depending on mode.",
        },
        {
          prop: "DatePicker min / max",
          type: "Date",
          default: "—",
          note: "Days outside the range are disabled.",
        },
        {
          prop: "DatePicker defaultMonth",
          type: "Date",
          default: "value or today",
          note: "Month the panel opens on.",
        },
        {
          prop: "Calendar selected / onSelect",
          type: "Date | null",
          default: "—",
          note: "Single mode; use rangeStart/rangeEnd for ranges.",
        },
        {
          prop: "Calendar month / onMonthChange",
          type: "Date",
          default: "—",
          note: "Controls the visible month.",
        },
      ],
    },
    code: `const [due, setDue] = useState<Date | null>(null);

<DatePicker
  label="Delivery date"
  value={due}
  onValueChange={setDue}
  min={new Date(2026, 9, 22)}
/>

const [range, setRange] = useState<DateRange>({ start: null, end: null });

<DatePicker
  mode="range"
  label="Campaign period"
  value={range}
  onValueChange={setRange}
/>`,
    a11y: {
      label: "Calendar accessibility notes",
      items: [
        "The grid is a table with weekday headers and a full accessible name on every date.",
        "Arrows move a day or a week; Home/End the week; PageUp/PageDown the month.",
        "Enter or Space selects the focused day.",
        "Only the focused day has tabindex 0: one tab stop per grid.",
        'aria-pressed marks selection and aria-current="date" marks today.',
        "Escape closes the panel and returns focus to the field button.",
      ],
    },
  },
};

type Copy = (typeof copy)["es"];
const copyByLocale: Record<KotenLocale, Copy> = copy;

function DateDemos({ t }: { t: Copy }) {
  const [due, setDue] = useState<Date | null>(null);
  const [range, setRange] = useState<DateRange>({ start: null, end: null });

  return (
    <div className="grid gap-[var(--koten-gap)] lg:grid-cols-2">
      <Demo title={t.single.demo}>
        <DatePicker
          label={t.single.label}
          description={t.single.description}
          placeholder={t.single.placeholder}
          value={due}
          min={new Date(2026, 9, 22)}
          max={new Date(2027, 2, 31)}
          defaultMonth={new Date(2026, 9, 21)}
          onValueChange={setDue}
        />
      </Demo>
      <Demo title={t.range.demo}>
        <DatePicker
          mode="range"
          label={t.range.label}
          description={t.range.note}
          value={range}
          min={new Date(2026, 8, 1)}
          max={new Date(2026, 11, 31)}
          defaultMonth={new Date(2026, 9, 1)}
          onValueChange={setRange}
        />
      </Demo>
    </div>
  );
}

export function DatePickerPage() {
  const { locale } = useKoten();
  const t = copyByLocale[locale];

  return (
    <article>
      <PageHeader
        eyebrow={t.eyebrow}
        title={t.title}
        jp="日付"
        description={t.description}
        meta={t.meta}
      />

      <div className="mt-[calc(var(--koten-gap)*2)] space-y-[calc(var(--koten-gap)*2)]">
        <Section id="fecha" title={t.sections.single.title} jp="単日" meta={t.sections.single.meta}>
          <DateDemos t={t} />
        </Section>

        <Section
          id="calendar"
          title={t.sections.calendar.title}
          jp="暦"
          meta={t.sections.calendar.meta}
        >
          <Demo title={t.calendar.demo}>
            <Calendar
              defaultMonth={new Date(2026, 9, 21)}
              selected={new Date(2026, 9, 21)}
              className="mx-auto"
            />
          </Demo>
        </Section>

        <Section id="props" title={t.sections.props.title} jp="型" meta={t.sections.props.meta}>
          <Code>{t.code}</Code>
          <PropsTable caption={t.props.caption} rows={t.props.rows} />
        </Section>

        <Section id="a11y" title={t.sections.a11y.title} jp="支援" meta={t.sections.a11y.meta}>
          <List items={t.a11y.items} label={t.a11y.label} />
        </Section>
      </div>
    </article>
  );
}
