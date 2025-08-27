'use client'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Heart } from 'lucide-react'
import Link from 'next/link'
import { useAppStore } from '@/lib/store'
import type { Pair } from '@/lib/types'
import clsx from 'clsx'
import { useState } from 'react'

export default function JobHouseCard({ pair }: { pair: Pair }) {
  const savedIds = useAppStore(s => s.savedIds)
  const toggleSave = useAppStore(s => s.toggleSave)
  const saved = savedIds.has(pair.id)
  const [imgSrc, setImgSrc] = useState(pair.house.photo ?? '/fallback-worker.jpg')

  return (
    <Link href={`/pair/${pair.id}`}>
      <Card className="overflow-hidden bg-neutral-900/70 border-neutral-800 cursor-pointer hover:shadow-lg hover:border-neutral-700 transition-all">
      <div className="relative">
        <Image 
          src={imgSrc} 
          alt={pair.house.name} 
          width={800} 
          height={480} 
          className="h-32 sm:h-40 w-full object-cover" 
          loading="lazy"
          onError={() => setImgSrc('/fallback-worker.jpg')}
        />
        <button
          onClick={(e) => {
            e.preventDefault()
            toggleSave(pair.id)
          }}
          className={clsx(
            'absolute right-2 top-2 inline-flex items-center justify-center rounded-full p-2 transition-colors',
            saved ? 'bg-emerald-500/95 text-white' : 'bg-black/60 text-white hover:bg-black/75'
          )}
          suppressHydrationWarning
        >
          <Heart className={clsx('h-4 w-4', saved && 'fill-current')} />
        </button>
      </div>
      <div className="space-y-2 p-3">
        <div className="text-xs sm:text-sm text-neutral-400">{pair.job.location} • 家賃 <span className="text-green-400 font-medium">{pair.house.rent}</span></div>
        <div className="text-sm sm:text-base font-semibold text-white line-clamp-1">
          {pair.job.title}
        </div>
        <div className="text-xs text-neutral-300 line-clamp-1">
          <span className="text-blue-400">{pair.job.employer}</span> • <span className="text-blue-300 font-medium">{pair.job.wage}</span> • {pair.house.station}
        </div>
        <div className="flex flex-wrap gap-1 pt-1">
          {pair.house.tags.slice(0, 3).map(t => (
            <Badge key={t} className="bg-neutral-800 text-neutral-300 text-xs px-2 py-0 hover:bg-neutral-700">
              {t}
            </Badge>
          ))}
          {pair.house.tags.length > 3 && (
            <Badge className="bg-neutral-800 text-neutral-400 text-xs px-2 py-0">
              +{pair.house.tags.length - 3}
            </Badge>
          )}
        </div>
      </div>
      </Card>
    </Link>
  )
}
