const nav = [
  { label: "ダッシュボード", active: true },
  { label: "受注", active: false },
  { label: "商品", active: false },
  { label: "在庫", active: false },
  { label: "取引先", active: false },
  { label: "レポート", active: false },
] as const;

const orders = [
  { id: "#10428", customer: "山田商事", amount: "¥84,000", status: "出荷待ち", tone: "warning" },
  { id: "#10427", customer: "丸井商店", amount: "¥12,400", status: "出荷済み", tone: "success" },
  { id: "#10426", customer: "北陸商会", amount: "¥230,000", status: "保留", tone: "info" },
  { id: "#10425", customer: "東京物産", amount: "¥8,900", status: "取消", tone: "danger" },
] as const;

const statusClass: Record<(typeof orders)[number]["tone"], string> = {
  warning: "border-warning/40 bg-warning/10 text-warning",
  success: "border-success/40 bg-success/10 text-success",
  info: "border-info/40 bg-info/10 text-info",
  danger: "border-danger/40 bg-danger/10 text-danger",
};

export function App() {
  return (
    <div className="grid min-h-dvh bg-paper text-ink lg:grid-cols-[232px_minmax(0,1fr)]">
      <aside className="hidden border-r border-rule bg-surface lg:block">
        <div className="flex h-12 items-center gap-2 border-b border-rule px-3">
          <span className="grid size-7 place-items-center border-2 border-primary font-serif text-sm leading-none text-primary">
            倉
          </span>
          <span className="font-serif text-base font-semibold">KURA</span>
          <span className="ml-auto text-2xs text-faint">ERP</span>
        </div>
        <nav className="p-2" aria-label="Navegación principal">
          <p className="px-2 py-1 text-2xs font-semibold uppercase tracking-[0.12em] text-faint">
            業務
          </p>
          <ul className="space-y-0.5">
            {nav.map((item) => (
              <li key={item.label}>
                <a
                  className={
                    item.active
                      ? "flex h-[var(--koten-row-h)] items-center border-l-2 border-primary bg-info/10 px-2 text-xs font-semibold text-primary"
                      : "flex h-[var(--koten-row-h)] items-center border-l-2 border-transparent px-2 text-xs text-muted hover:bg-tint hover:text-ink"
                  }
                  href="/"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="m-2 border border-dashed border-rule-strong p-2 text-2xs leading-relaxed text-muted">
          Scaffold Daichō. Tabla, filtros y drawer llegan en la fase 3.
        </div>
      </aside>

      <div className="min-w-0">
        <header className="flex h-12 items-center justify-between border-b border-rule bg-surface px-4">
          <div className="flex items-center gap-2 text-2xs text-muted">
            <span className="lg:hidden">倉</span>
            <span>KURA</span>
            <span>/</span>
            <span className="font-semibold text-ink">ダッシュボード</span>
          </div>
          <div className="flex items-center gap-3 text-2xs text-muted">
            <span className="hidden sm:inline">2026/10/21 (水)</span>
            <span>検索</span>
            <span>通知</span>
            <span className="grid size-6 place-items-center rounded-full border border-rule-strong bg-tint text-2xs">
              倉
            </span>
          </div>
        </header>

        <main className="p-4">
          <div className="flex flex-wrap items-end justify-between gap-3 border-b border-rule pb-3">
            <div>
              <p className="text-2xs text-muted">本日の状況</p>
              <h1 className="font-serif text-2xl font-semibold leading-tight">ダッシュボード</h1>
            </div>
            <button
              className="h-[var(--koten-control-h)] border border-primary-strong bg-primary px-[var(--koten-control-px)] text-xs font-semibold text-primary-foreground hover:bg-primary-hover"
              type="button"
            >
              + 新規受注
            </button>
          </div>

          <section
            className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-4"
            aria-label="Indicadores"
          >
            {[
              ["本日の受注", "128", "+12%"],
              ["未出荷", "24", "-3%"],
              ["売上", "¥3.2M", "+8%"],
              ["在庫アラート", "7", "要確認"],
            ].map(([label, value, delta]) => (
              <div key={label} className="border border-rule bg-surface p-3">
                <p className="text-2xs text-muted">{label}</p>
                <p className="mt-1 text-xl font-semibold tabular-nums">{value}</p>
                <p className="mt-0.5 text-2xs text-faint">{delta}</p>
              </div>
            ))}
          </section>

          <section className="mt-4 border border-rule bg-surface" aria-labelledby="orders-title">
            <div className="flex items-center justify-between border-b border-rule bg-tint px-3 py-2">
              <h2 id="orders-title" className="text-xs font-semibold">
                最近の受注
              </h2>
              <a className="text-2xs font-semibold text-link hover:underline" href="/">
                すべて見る →
              </a>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-xs tabular-nums">
                <thead>
                  <tr className="border-b border-rule-strong bg-paper text-2xs text-muted">
                    <th className="px-3 py-1.5 text-left font-semibold">注文</th>
                    <th className="px-3 py-1.5 text-left font-semibold">顧客</th>
                    <th className="px-3 py-1.5 text-right font-semibold">金額</th>
                    <th className="px-3 py-1.5 text-left font-semibold">状態</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-dotted border-rule last:border-0">
                      <td className="px-3 py-1.5">{order.id}</td>
                      <td className="px-3 py-1.5">{order.customer}</td>
                      <td className="px-3 py-1.5 text-right">{order.amount}</td>
                      <td className="px-3 py-1.5">
                        <span
                          className={`inline-flex items-center gap-1 border px-1.5 py-0.5 text-2xs font-semibold ${statusClass[order.tone]}`}
                        >
                          <span className="size-1 rounded-full bg-current" />
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between border-t border-rule px-3 py-2 text-2xs text-muted">
              <span>1–4 / 128</span>
              <span>‹ 1 2 3 ›</span>
            </div>
          </section>

          <p className="mt-4 text-2xs text-faint">
            Scaffold ·{" "}
            <a className="text-link hover:underline" href="http://localhost:5173">
              volver al catálogo
            </a>
          </p>
        </main>
      </div>
    </div>
  );
}
