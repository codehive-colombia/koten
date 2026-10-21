export const componentRoutes = {
  button: { to: "/components/button", jp: "ボタン" },
  panel: { to: "/components/panel", jp: "枠" },
  badge: { to: "/components/badge", jp: "印" },
  forms: { to: "/components/forms", jp: "入力" },
  inputs: { to: "/components/inputs", jp: "入力部品" },
  surfaces: { to: "/components/surfaces", jp: "装飾" },
  feedback: { to: "/components/feedback", jp: "通知" },
  navigation: { to: "/components/navigation", jp: "導線" },
  overlays: { to: "/components/overlays", jp: "重なり" },
  data: { to: "/components/data", jp: "データ" },
  controls: { to: "/components/controls", jp: "操作" },
  date: { to: "/components/date", jp: "日付" },
  command: { to: "/components/command", jp: "命令" },
} as const;

export type ComponentKey = keyof typeof componentRoutes;

export const componentOrder: readonly ComponentKey[] = [
  "button",
  "panel",
  "badge",
  "forms",
  "inputs",
  "surfaces",
  "feedback",
  "navigation",
  "overlays",
  "data",
  "controls",
  "date",
  "command",
];

export type ComponentInventoryItem = {
  id: string;
  name: string;
  page: ComponentKey;
  to: string;
};

export const componentInventory: readonly ComponentInventoryItem[] = [
  { id: "C-001", name: "Button", page: "button", to: "/components/button" },
  { id: "C-002", name: "Panel", page: "panel", to: "/components/panel" },
  { id: "C-003", name: "Badge", page: "badge", to: "/components/badge" },
  { id: "C-004", name: "IconButton", page: "controls", to: "/components/controls" },
  { id: "C-005", name: "Link", page: "navigation", to: "/components/navigation" },
  { id: "C-006", name: "Field", page: "forms", to: "/components/forms" },
  { id: "C-007", name: "Input", page: "forms", to: "/components/forms" },
  { id: "C-008", name: "Textarea", page: "forms", to: "/components/forms" },
  { id: "C-009", name: "Select", page: "inputs", to: "/components/inputs" },
  { id: "C-010", name: "Combobox", page: "inputs", to: "/components/inputs" },
  { id: "C-011", name: "Checkbox", page: "inputs", to: "/components/inputs" },
  { id: "C-012", name: "RadioGroup", page: "inputs", to: "/components/inputs" },
  { id: "C-013", name: "Switch", page: "inputs", to: "/components/inputs" },
  { id: "C-014", name: "NumberField", page: "inputs", to: "/components/inputs" },
  { id: "C-015", name: "FormRow", page: "forms", to: "/components/forms" },
  { id: "C-016", name: "SectionHeader", page: "surfaces", to: "/components/surfaces" },
  { id: "C-017", name: "Rule", page: "surfaces", to: "/components/surfaces" },
  { id: "C-018", name: "Alert", page: "feedback", to: "/components/feedback" },
  { id: "C-019", name: "Toast", page: "feedback", to: "/components/feedback" },
  { id: "C-020", name: "Progress", page: "feedback", to: "/components/feedback" },
  { id: "C-021", name: "Meter", page: "feedback", to: "/components/feedback" },
  { id: "C-022", name: "Skeleton", page: "feedback", to: "/components/feedback" },
  { id: "C-023", name: "EmptyState", page: "feedback", to: "/components/feedback" },
  { id: "C-024", name: "Hanko", page: "surfaces", to: "/components/surfaces" },
  { id: "C-025", name: "Tategaki", page: "surfaces", to: "/components/surfaces" },
  { id: "C-026", name: "Pattern", page: "surfaces", to: "/components/surfaces" },
  { id: "C-027", name: "Breadcrumb", page: "navigation", to: "/components/navigation" },
  { id: "C-028", name: "Pagination", page: "navigation", to: "/components/navigation" },
  { id: "C-029", name: "Tabs", page: "navigation", to: "/components/navigation" },
  { id: "C-030", name: "Accordion", page: "navigation", to: "/components/navigation" },
  { id: "C-031", name: "Dialog", page: "overlays", to: "/components/overlays" },
  { id: "C-032", name: "Drawer", page: "overlays", to: "/components/overlays" },
  { id: "C-033", name: "Menu", page: "overlays", to: "/components/overlays" },
  { id: "C-034", name: "Popover", page: "overlays", to: "/components/overlays" },
  { id: "C-035", name: "Tooltip", page: "overlays", to: "/components/overlays" },
  { id: "C-036", name: "Toolbar", page: "controls", to: "/components/controls" },
  { id: "C-037", name: "Table", page: "data", to: "/components/data" },
  { id: "C-038", name: "DataTable", page: "data", to: "/components/data" },
  { id: "C-039", name: "StatCard", page: "data", to: "/components/data" },
  { id: "C-040", name: "Sparkline / BarChart", page: "data", to: "/components/data" },
  { id: "C-041", name: "ToggleGroup", page: "controls", to: "/components/controls" },
  { id: "C-062", name: "Label", page: "forms", to: "/components/forms" },
  { id: "C-063", name: "Calendar", page: "date", to: "/components/date" },
  { id: "C-064", name: "DatePicker", page: "date", to: "/components/date" },
  { id: "C-065", name: "CommandPalette", page: "command", to: "/components/command" },
];

export type PatternPageKey = "storefront" | "erp";

export type PatternInventoryItem = {
  id: string;
  name: string;
  page: PatternPageKey;
  to: string;
};

export const patternInventory: readonly PatternInventoryItem[] = [
  { id: "C-042", name: "SearchBar", page: "storefront", to: "/patterns/storefront" },
  { id: "C-043", name: "NoticeList", page: "storefront", to: "/patterns/storefront" },
  { id: "C-044", name: "RankedList", page: "storefront", to: "/patterns/storefront" },
  { id: "C-045", name: "ProductCard", page: "storefront", to: "/patterns/storefront" },
  { id: "C-046", name: "PriceBlock", page: "storefront", to: "/patterns/storefront" },
  { id: "C-047", name: "SpecTable", page: "storefront", to: "/patterns/storefront" },
  { id: "C-048", name: "CampaignBanner", page: "storefront", to: "/patterns/storefront" },
  { id: "C-049", name: "StoreHeader", page: "storefront", to: "/patterns/storefront" },
  { id: "C-050", name: "Footer", page: "storefront", to: "/patterns/storefront" },
  { id: "C-051", name: "ProductGallery", page: "storefront", to: "/patterns/storefront" },
  { id: "C-052", name: "ReviewSummary", page: "storefront", to: "/patterns/storefront" },
  { id: "C-053", name: "AppShell", page: "erp", to: "/patterns/erp" },
  { id: "C-054", name: "SideNav", page: "erp", to: "/patterns/erp" },
  { id: "C-055", name: "TopBar", page: "erp", to: "/patterns/erp" },
  { id: "C-056", name: "PageHeader", page: "erp", to: "/patterns/erp" },
  { id: "C-057", name: "FilterBar", page: "erp", to: "/patterns/erp" },
  { id: "C-058", name: "DetailDrawer", page: "erp", to: "/patterns/erp" },
  { id: "C-059", name: "StatusBadge", page: "erp", to: "/patterns/erp" },
  { id: "C-060", name: "FormSection", page: "erp", to: "/patterns/erp" },
  { id: "C-061", name: "Timeline", page: "erp", to: "/patterns/erp" },
];
