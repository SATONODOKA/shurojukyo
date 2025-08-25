export function RightRail() {
  const items = [
    '品川区に「家具付き1K」追加',
    '介護職の新着求人 5件',
    '大田区 / 倉庫スタッフの時給が上昇',
  ]
  return (
    <aside className="hidden md:block">
      <div className="sticky top-16 space-y-3">
        {items.map((t, i) => (
          <div key={i} className="rounded-lg border border-neutral-800 bg-neutral-900/60 p-3 text-sm">{t}</div>
        ))}
      </div>
    </aside>
  )
}
