'use client'
import { useMemo } from 'react'
import JobHouseCard from '@/components/cards/JobHouseCard'
import { useAppStore } from '@/lib/store'
import { RightRail } from '@/components/RightRail'
import { EntryCard } from '@/components/EntryCard'
import Link from 'next/link'
import { Search } from 'lucide-react'

export default function HomePage() {
  const pairs = useAppStore(s => s.pairs)
  const firstEightPairs = useMemo(() => pairs.slice(0, 8), [pairs])
  const nextNinePairs = useMemo(() => pairs.slice(8, 17), [pairs])

  return (
    <main className="mx-auto max-w-6xl p-4 md:grid md:grid-cols-[1fr_320px] md:gap-6">
      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">おすすめの暮らしと仕事</h1>
          <Link href="/search?tab=advanced" className="btn-primary flex items-center gap-2">
            <Search className="w-4 h-4" />
            詳細検索
          </Link>
        </div>
        
        <div className="overflow-hidden rounded-xl border border-neutral-800">
          <div className="flex gap-4">
            {firstEightPairs.map(p => (
              <div key={p.id} className="min-w-[85%] md:min-w-[50%] lg:min-w-[33%]">
                <JobHouseCard pair={p} />
              </div>
            ))}
          </div>
        </div>
        
        <h2 className="mt-8 text-lg font-semibold mb-4">探し方を選ぶ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <EntryCard type="job" />
          <EntryCard type="home" />
        </div>
        
        <h2 className="mt-8 text-lg font-semibold">この地域で人気の組み合わせ</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {nextNinePairs.map(p => (
            <JobHouseCard key={p.id} pair={p} />
          ))}
        </div>
      </section>

      <RightRail />
    </main>
  )
}
