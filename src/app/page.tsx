'use client'
import JobHouseCard from '@/components/cards/JobHouseCard'
import { useAppStore } from '@/lib/store'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useMemo } from 'react'

export default function HomePage() {
  const pairs = useAppStore(s => s.pairs)
  
  // options と plugins を useMemo で安定化
  const options = useMemo(() => ({ 
    loop: true,
    align: 'start' as const,
    skipSnaps: false
  }), [])
  
  const plugins = useMemo(() => [
    Autoplay({ delay: 3000, stopOnInteraction: true })
  ], [])

  const [ref] = useEmblaCarousel(options, plugins)

  return (
    <main className="mx-auto max-w-md space-y-6 p-4">
      <h1 className="text-xl font-bold">おすすめの暮らしと仕事</h1>
      <div className="overflow-hidden" ref={ref}>
        <div className="flex gap-4">
          {pairs.slice(0, 8).map(p => (
            <div key={p.id} className="min-w-[85%] flex-shrink-0">
              <JobHouseCard pair={p} />
            </div>
          ))}
        </div>
      </div>

      <h2 className="mt-4 text-lg font-semibold">この地域で人気の組み合わせ</h2>
      <div className="grid grid-cols-1 gap-4">
        {pairs.slice(8, 16).map(p => <JobHouseCard key={p.id} pair={p} />)}
      </div>
    </main>
  )
}
