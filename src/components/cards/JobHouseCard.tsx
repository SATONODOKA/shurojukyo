'use client'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Heart } from 'lucide-react'
import { useAppStore } from '@/lib/store'
import type { Pair } from '@/lib/types'
import clsx from 'clsx'

export default function JobHouseCard({ pair }: { pair: Pair }) {
  const savedIds = useAppStore(s => s.savedIds)
  const toggleSave = useAppStore(s => s.toggleSave)
  const saved = savedIds.has(pair.id)

  return (
    <Card className="overflow-hidden bg-neutral-900/70 border-neutral-800">
      <div className="relative">
        <img src={pair.house.photo} alt={pair.house.name} className="h-40 w-full object-cover" />
        <button
          onClick={() => toggleSave(pair.id)}
          className={clsx(
            'absolute right-3 top-3 inline-flex items-center justify-center rounded-full p-2',
            saved ? 'bg-emerald-500/90 text-black' : 'bg-black/50 text-white'
          )}
        >
          <Heart className={clsx('h-5 w-5', saved && 'fill-black')} />
        </button>
      </div>
      <div className="space-y-2 p-3">
        <div className="text-sm text-neutral-300">{pair.job.location}</div>
        <div className="text-base font-semibold">{pair.job.title} ・ {pair.house.rent}</div>
        <div className="text-xs text-neutral-400">{pair.job.employer} / {pair.job.wage} / {pair.house.station}</div>
        <div className="flex flex-wrap gap-2 pt-1">
          {pair.house.tags.map(t => <Badge key={t} variant="secondary" className="bg-neutral-800">{t}</Badge>)}
        </div>
      </div>
    </Card>
  )
}
