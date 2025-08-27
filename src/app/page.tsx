'use client'
import { useMemo } from 'react'
import JobHouseCard from '@/components/cards/JobHouseCard'
import { useAppStore } from '@/lib/store'
import { EntryCard } from '@/components/EntryCard'
import Link from 'next/link'
import { Search } from 'lucide-react'

export default function HomePage() {
  const pairs = useAppStore(s => s.pairs)
  const firstEightPairs = useMemo(() => pairs.slice(0, 8), [pairs])
  const nextNinePairs = useMemo(() => pairs.slice(8, 17), [pairs])

  return (
    <main className="mx-auto max-w-md p-4">
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold text-white">おすすめの暮らしと仕事</h1>
          <Link href="/search?tab=advanced" className="btn-primary text-sm px-3 py-1.5">
            <Search className="w-3 h-3 mr-1" />
            検索
          </Link>
        </div>
        
        <div className="overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900/30">
          <div className="flex gap-2 p-2 overflow-x-auto scrollbar-hide">
            {firstEightPairs.slice(0, 5).map(p => (
              <div key={p.id} className="w-[260px] flex-shrink-0">
                <JobHouseCard pair={p} />
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-base font-semibold text-white mb-3">探し方を選ぶ</h2>
          <div className="space-y-3">
            <EntryCard type="job" />
            <EntryCard type="home" />
          </div>
        </div>
        
        <div>
          <h2 className="text-base font-semibold text-white mb-3">この地域で人気の組み合わせ</h2>
          <div className="space-y-3">
            {nextNinePairs.slice(0, 3).map(p => (
              <JobHouseCard key={p.id} pair={p} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
