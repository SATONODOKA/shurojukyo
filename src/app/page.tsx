'use client'
import JobHouseCard from '@/components/cards/JobHouseCard'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useMemo } from 'react'
import { useAppStore } from '@/lib/store'
import { RightRail } from '@/components/RightRail'

export default function HomePage() {
  const pairs = useAppStore(s => s.pairs)
  const options = useMemo(() => ({ loop: true }), [])
  const autoplay = useMemo(() => Autoplay({ delay: 4000, stopOnInteraction: false }), [])
  const plugins = useMemo(() => [autoplay], [autoplay])
  const [ref] = useEmblaCarousel(options, plugins)

  return (
    <main className="mx-auto max-w-6xl p-4 md:grid md:grid-cols-[1fr_320px] md:gap-6">
      <section className="space-y-6">
        <h1 className="text-xl font-bold">おすすめの暮らしと仕事</h1>
        <div className="overflow-hidden rounded-xl border border-neutral-800" ref={ref}>
          <div className="flex gap-4">
            {pairs.slice(0, 8).map(p => (
              <div key={p.id} className="min-w-[85%] md:min-w-[50%] lg:min-w-[33%]">
                <JobHouseCard pair={p} />
              </div>
            ))}
          </div>
        </div>
        <h2 className="mt-4 text-lg font-semibold">この地域で人気の組み合わせ</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {pairs.slice(8, 17).map(p => <JobHouseCard key={p.id} pair={p} />)}
        </div>
      </section>

      <RightRail />
    </main>
  )
}
