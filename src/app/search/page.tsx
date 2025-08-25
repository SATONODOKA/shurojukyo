'use client'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import JobHouseCard from '@/components/cards/JobHouseCard'
import { useAppStore } from '@/lib/store'

const genre = [
  '東京23区','神奈川','愛知','大阪','福岡',
  '製造','介護','飲食','IT','清掃',
  '家具付き','駅近','静か','シェアハウス'
]

export default function SearchPage() {
  const pairs = useAppStore(s => s.pairs)
  return (
    <main className="mx-auto max-w-md space-y-6 p-4">
      <div className="sticky top-0 z-10 bg-neutral-950 pb-2 pt-2">
        <Input placeholder="地域・職種・家賃などを検索" className="bg-neutral-900 border-neutral-800" />
        <div className="mt-3 grid grid-cols-3 gap-2">
          {genre.map(g => <Badge key={g} className="justify-center bg-neutral-800">{g}</Badge>)}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {pairs.map(p => <JobHouseCard key={p.id} pair={p} />)}
      </div>
    </main>
  )
}
