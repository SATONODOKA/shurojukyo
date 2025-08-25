'use client'
import JobHouseCard from '@/components/cards/JobHouseCard'
import { useAppStore } from '@/lib/store'
import { useEffect, useState } from 'react'
import type { Pair } from '@/lib/types'

export default function PairDetail({ params }: { params: Promise<{ id: string }> }) {
  const [pair, setPair] = useState<Pair | null>(null)
  
  useEffect(() => {
    params.then((resolvedParams) => {
      const foundPair = useAppStore.getState().pairs.find(p => p.id === resolvedParams.id)
      setPair(foundPair || null)
    })
  }, [params])
  
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
