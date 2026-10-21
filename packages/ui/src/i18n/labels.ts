export type KotenLocale = "es" | "ja" | "en";

export type KotenLabels = {
  close: string;
  previous: string;
  next: string;
  empty: string;
  loading: string;
  select: string;
  remove: string;
  search: string;
  clear: string;
  apply: string;
  cancel: string;
  confirm: string;
  more: string;
  expand: string;
  collapse: string;
  sortAscending: string;
  sortDescending: string;
  selectAll: string;
  selected: string;
  noResults: string;
  required: string;
  optional: string;
};

export const labelsByLocale: Record<KotenLocale, KotenLabels> = {
  es: {
    close: "Cerrar",
    previous: "Anterior",
    next: "Siguiente",
    empty: "Sin resultados",
    loading: "Cargando…",
    select: "Seleccionar",
    remove: "Quitar",
    search: "Buscar",
    clear: "Limpiar",
    apply: "Aplicar",
    cancel: "Cancelar",
    confirm: "Confirmar",
    more: "Más opciones",
    expand: "Expandir",
    collapse: "Contraer",
    sortAscending: "Orden ascendente",
    sortDescending: "Orden descendente",
    selectAll: "Seleccionar todo",
    selected: "seleccionados",
    noResults: "No se encontraron resultados",
    required: "Obligatorio",
    optional: "Opcional",
  },
  ja: {
    close: "閉じる",
    previous: "前へ",
    next: "次へ",
    empty: "該当なし",
    loading: "読み込み中…",
    select: "選択",
    remove: "削除",
    search: "検索",
    clear: "クリア",
    apply: "適用",
    cancel: "キャンセル",
    confirm: "確認",
    more: "その他の操作",
    expand: "展開",
    collapse: "折りたたむ",
    sortAscending: "昇順",
    sortDescending: "降順",
    selectAll: "すべて選択",
    selected: "選択済み",
    noResults: "結果が見つかりません",
    required: "必須",
    optional: "任意",
  },
  en: {
    close: "Close",
    previous: "Previous",
    next: "Next",
    empty: "No results",
    loading: "Loading…",
    select: "Select",
    remove: "Remove",
    search: "Search",
    clear: "Clear",
    apply: "Apply",
    cancel: "Cancel",
    confirm: "Confirm",
    more: "More options",
    expand: "Expand",
    collapse: "Collapse",
    sortAscending: "Sort ascending",
    sortDescending: "Sort descending",
    selectAll: "Select all",
    selected: "selected",
    noResults: "No results found",
    required: "Required",
    optional: "Optional",
  },
};
