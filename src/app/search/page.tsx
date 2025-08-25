'use client'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import JobHouseCard from '@/components/cards/JobHouseCard'
import { useAppStore } from '@/lib/store'
import { SearchFilters } from '@/components/search/SearchFilters'
import { RightRail } from '@/components/RightRail'

const genre = ['東京23区','神奈川','愛知','大阪','福岡','製造','介護','飲食','IT','清掃','家具付き','駅近','静か','シェアハウス']

export default function SearchPage() {
  const pairs = useAppStore(s => s.pairs)
  return (
    <main className="mx-auto max-w-6xl p-4 lg:grid lg:grid-cols-[260px_1fr_320px] lg:gap-6">
      <SearchFilters />
      <section className="space-y-6">
        <div className="sticky top-14 z-10 bg-neutral-950 pb-2 pt-2 lg:static lg:bg-transparent">
          <Input placeholder="地域・職種・家賃などを検索" className="bg-neutral-900 border-neutral-800" />
          <div className="mt-3 grid grid-cols-3 gap-2 md:grid-cols-6">
            {genre.map(g => <Badge key={g} className="justify-center bg-neutral-800">{g}</Badge>)}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {pairs.map(p => <JobHouseCard key={p.id} pair={p} />)}
        </div>
      </section>
      <RightRail />
    </main>
  )
}
