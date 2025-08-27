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
    <main className="mx-auto max-w-6xl p-3 sm:p-4 lg:grid lg:grid-cols-[1fr_320px] lg:gap-6">
      <section className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <h1 className="text-lg sm:text-xl font-bold text-white">おすすめの暮らしと仕事</h1>
          <Link href="/search?tab=advanced" className="btn-primary flex items-center gap-2 self-start sm:self-auto">
            <Search className="w-4 h-4" />
            <span className="hidden sm:inline">詳細検索</span>
            <span className="sm:hidden">検索</span>
          </Link>
        </div>
        
        <div className="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/30">
          <div className="flex gap-3 p-2 overflow-x-auto scrollbar-hide">
            {firstEightPairs.map(p => (
              <div key={p.id} className="min-w-[280px] sm:min-w-[300px] md:min-w-[320px] lg:min-w-[280px] flex-shrink-0">
                <JobHouseCard pair={p} />
              </div>
            ))}
          </div>
        </div>
        
        <h2 className="text-base sm:text-lg font-semibold text-white">探し方を選ぶ</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <EntryCard type="job" />
          <EntryCard type="home" />
        </div>
        
        <h2 className="text-base sm:text-lg font-semibold text-white">この地域で人気の組み合わせ</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {nextNinePairs.map(p => (
            <JobHouseCard key={p.id} pair={p} />
          ))}
        </div>
      </section>

      <div className="hidden lg:block">
        <RightRail />
      </div>
    </main>
  )
}
