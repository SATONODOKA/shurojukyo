export default function FollowPage() {
  const items = [
    '品川区に「家具付き1K」が3件追加されました',
    '介護職の新着求人が5件見つかりました',
    '大田区 / 倉庫スタッフの時給が上昇トレンドです',
    '横浜市にシェアハウス物件が2件新規登録',
    '製造業パートタイム求人が急増中です',
    '渋谷区周辺の住居情報が更新されました',
  ]
  return (
    <main className="mx-auto max-w-md space-y-4 p-4">
      <h1 className="text-xl font-bold">フォロー中の最新情報</h1>
      <ul className="space-y-3">
        {items.map((t, i) => (
          <li key={i} className="rounded-lg border border-neutral-800 bg-neutral-900/60 p-3">{t}</li>
        ))}
      </ul>
    </main>
  )
}
