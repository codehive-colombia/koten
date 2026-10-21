const categories = [
  "カメラ",
  "レンズ",
  "オーディオ",
  "パソコン",
  "生活家電",
  "文具",
  "ギフト",
  "修理",
];

const notices = [
  { date: "10/21", text: "秋の新作カメラフェア" },
  { date: "10/18", text: "修理受付センター臨時休業" },
  { date: "10/15", text: "ポイント5倍キャンペーン" },
] as const;

export function App() {
  return (
    <div className="min-h-dvh bg-paper text-ink">
      <div className="bg-sumi text-paper">
        <div className="koten-container flex h-7 items-center justify-between text-2xs">
          <p>全国送料無料 · 店舗受け取り対応</p>
          <p className="text-paper/70">JA / ES / EN</p>
        </div>
      </div>

      <header className="border-b border-rule bg-surface">
        <div className="koten-container flex h-[72px] items-center gap-6">
          <a className="flex items-center gap-3" href="/">
            <span className="grid size-10 place-items-center border-2 border-primary font-serif text-xl leading-none text-primary">
              光
            </span>
            <span className="font-serif text-xl font-semibold tracking-tight">HIKARI</span>
          </a>
          <div className="flex min-w-0 flex-1 items-center border border-rule-strong bg-paper">
            <span className="px-2 text-2xs text-muted">すべて</span>
            <span className="h-5 border-l border-rule" />
            <span className="min-w-0 flex-1 truncate px-2 text-xs text-faint">
              商品名・型番・キーワード
            </span>
            <span className="grid h-8 w-12 place-items-center bg-primary text-primary-foreground">
              ⌕
            </span>
          </div>
          <div className="flex items-center gap-4 text-2xs text-muted">
            <span>ログイン</span>
            <span>カート 0</span>
          </div>
        </div>
        <nav className="border-t border-rule bg-tint">
          <div className="koten-container flex h-9 items-center gap-5 overflow-x-auto text-xs">
            {categories.map((category) => (
              <a key={category} className="whitespace-nowrap hover:text-link" href="/">
                {category}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <main className="koten-container py-6">
        <div className="mb-4 flex items-center gap-2 text-2xs text-muted">
          <a className="hover:text-link" href="/">
            ホーム
          </a>
          <span>/</span>
          <a className="hover:text-link" href="/">
            カメラ
          </a>
          <span>/</span>
          <span>HIKARI K-1</span>
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="grid gap-5 md:grid-cols-2">
            <section aria-label="Producto" className="border border-rule bg-surface">
              <div className="flex items-center justify-between border-b border-rule bg-tint px-3 py-2">
                <h1 className="font-serif text-lg font-semibold">HIKARI K-1</h1>
                <span className="border border-primary bg-primary px-1.5 py-0.5 text-2xs font-semibold text-primary-foreground">
                  NEW
                </span>
              </div>
              <div className="p-4">
                <div className="relative grid aspect-[4/3] place-items-center border border-rule bg-tint">
                  <div className="absolute inset-8 border border-rule-strong bg-surface" />
                  <div className="relative grid size-28 place-items-center rounded-full border-2 border-rule-strong bg-paper text-center">
                    <span className="font-serif text-xl">K-1</span>
                  </div>
                  <span className="absolute bottom-2 left-2 text-2xs text-muted">35mm / f2.8</span>
                </div>
                <p className="mt-3 text-xs text-muted">
                  35mm コンパクトカメラ。日常に寄り添う、静かな一台。
                </p>
              </div>
            </section>

            <section aria-label="Compra" className="border border-rule bg-surface">
              <div className="border-b border-rule bg-tint px-3 py-2">
                <h2 className="text-xs font-semibold">商品情報</h2>
              </div>
              <div className="p-3">
                <p className="text-2xs text-muted">HIKARI · 35mm コンパクトカメラ</p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-3xl font-semibold leading-none text-primary tabular-nums">
                    ¥58,300
                  </span>
                  <span className="text-2xs text-muted">税込</span>
                </div>
                <p className="mt-1 text-2xs font-semibold text-link">583ポイント</p>

                <div className="mt-3 flex flex-wrap items-center gap-2 text-2xs">
                  <span className="border border-success/40 bg-success/10 px-1.5 py-0.5 font-semibold text-success">
                    在庫あり
                  </span>
                  <span className="text-muted">あす到着</span>
                  <span className="text-muted">送料無料</span>
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    className="h-[var(--koten-control-h)] flex-1 border border-primary-strong bg-primary px-[var(--koten-control-px)] text-xs font-semibold text-primary-foreground hover:bg-primary-hover"
                    type="button"
                  >
                    カートに入れる
                  </button>
                  <button
                    className="h-[var(--koten-control-h)] w-9 border border-rule-strong bg-surface text-sm text-muted"
                    type="button"
                    aria-label="お気に入りに追加"
                  >
                    ♡
                  </button>
                </div>

                <dl className="mt-4 grid grid-cols-[72px_1fr] gap-y-1 border-t border-rule pt-3 text-2xs">
                  <dt className="text-muted">レンズ</dt>
                  <dd>35mm f/2.8</dd>
                  <dt className="text-muted">重量</dt>
                  <dd>380g（電池含む）</dd>
                  <dt className="text-muted">保証</dt>
                  <dd>1年間</dd>
                </dl>

                <p className="mt-4 border-t border-rule pt-3 text-2xs text-faint">
                  ※ 画像はイメージです。仕様は予告なく変更される場合があります。
                </p>
              </div>
            </section>
          </div>

          <aside className="space-y-4" aria-label="Información complementaria">
            <section className="border border-rule bg-surface">
              <div className="border-b border-rule bg-tint px-3 py-2">
                <h2 className="text-xs font-semibold">お知らせ</h2>
              </div>
              <ul className="divide-y divide-rule px-3">
                {notices.map((notice) => (
                  <li key={notice.date} className="flex gap-3 py-2 text-2xs">
                    <time className="shrink-0 text-muted tabular-nums">{notice.date}</time>
                    <a className="hover:text-link" href="/">
                      {notice.text}
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            <section className="border border-rule bg-surface">
              <div className="border-b border-rule bg-tint px-3 py-2">
                <h2 className="text-xs font-semibold">ランキング</h2>
              </div>
              <ol className="divide-y divide-rule px-3">
                {[
                  ["1", "HIKARI K-1 ブラック"],
                  ["2", "HIKARI 35mm レンズ"],
                  ["3", "HIKARI カメラバッグ"],
                ].map(([rank, name]) => (
                  <li key={rank} className="flex items-center gap-2 py-2 text-2xs">
                    <span className="grid size-4 place-items-center bg-primary text-2xs font-semibold text-primary-foreground">
                      {rank}
                    </span>
                    <a className="hover:text-link" href="/">
                      {name}
                    </a>
                  </li>
                ))}
              </ol>
            </section>

            <p className="border border-dashed border-rule-strong p-3 text-2xs leading-relaxed text-muted">
              Storefront en construcción. La página completa llega en la fase 2 con datos JA/ES/EN,
              galería, reseñas y footer denso.
            </p>
          </aside>
        </div>

        <p className="mt-6 text-2xs text-faint">
          Scaffold ·{" "}
          <a className="text-link hover:underline" href="http://localhost:5173">
            volver al catálogo
          </a>
        </p>
      </main>
    </div>
  );
}
