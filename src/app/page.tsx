'use client'
import { useEffect, useState } from 'react'
import JobHouseCard from '@/components/cards/JobHouseCard'
import { useAppStore } from '@/lib/store'
import { EntryCard } from '@/components/EntryCard'
import Link from 'next/link'
import { Search } from 'lucide-react'

export default function HomePage() {
  const pairs = useAppStore(s => s.pairs)
  const [randomPairs, setRandomPairs] = useState(pairs.slice(0, 8))
  const [popularPairs, setPopularPairs] = useState(pairs.slice(8, 11))
  
  // クライアントサイドでのみランダム化を実行
  useEffect(() => {
    const shuffledForRandom = [...pairs].sort(() => Math.random() - 0.5)
    const shuffledForPopular = [...pairs].sort(() => Math.random() - 0.5)
    
    setRandomPairs(shuffledForRandom.slice(0, 8))
    setPopularPairs(shuffledForPopular.slice(8, 11))
  }, [pairs])

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
          <div className="flex gap-3 p-3 overflow-x-auto scrollbar-hide">
            {randomPairs.slice(0, 6).map(p => (
              <div key={p.id} className="w-[280px] flex-shrink-0">
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
            {popularPairs.map(p => (
              <JobHouseCard key={p.id} pair={p} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
