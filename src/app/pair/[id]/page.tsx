'use client'
import JobHouseCard from '@/components/cards/JobHouseCard'
import { useAppStore } from '@/lib/store'

export default function PairDetail({ params }: { params: { id: string } }) {
  const pair = useAppStore.getState().pairs.find(p => p.id === params.id)
  if (!pair) return <main className="p-6">Not Found</main>
  return (
    <main className="mx-auto max-w-3xl space-y-4 p-6">
      <JobHouseCard pair={pair} />
      <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 text-neutral-300">
        ここに契約サポートや応募ボタン、地図、似ている組み合わせなどを配置
      </div>
    </main>
  )
}
