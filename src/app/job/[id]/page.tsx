'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAppStore } from '@/lib/store'
import type { Job, House } from '@/lib/types'
import { Button } from '@/components/ui/button'
import HouseCard from '@/components/cards/HouseCard'
import { RightRail } from '@/components/RightRail'
import { MapPin, Clock, Briefcase } from 'lucide-react'

export default function JobDetail({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [job, setJob] = useState<Job | null>(null)
  const [nearbyHouses, setNearbyHouses] = useState<House[]>([])
  const pairs = useAppStore(s => s.pairs)

  useEffect(() => {
    params.then((resolvedParams) => {
      // 仕事を取得
      const allJobs = pairs.map(p => p.job)
      const foundJob = allJobs.find(j => j.id === resolvedParams.id)
      setJob(foundJob || null)

      if (foundJob) {
        // その仕事の通勤圏内の住居を取得（同じ地域の住居をフィルター）
        const jobLocation = foundJob.location.split('・')[0] // "北海道・札幌市" → "北海道"
        const housesInArea = pairs
          .filter(p => p.job.location.includes(jobLocation))
          .map(p => p.house)
          .filter((house, index, self) => 
            index === self.findIndex(h => h.id === house.id)
          )
        setNearbyHouses(housesInArea)
      }
    })
  }, [params, pairs])

  const handleHouseSelect = (house: House) => {
    if (!job) return
    // ペア詳細ページに遷移
    const pair = pairs.find(p => p.job.id === job.id && p.house.id === house.id)
    if (pair) {
      router.push(`/pair/${pair.id}`)
    }
  }

  if (!job) {
    return (
      <main className="p-6 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">お探しの仕事が見つかりません</h1>
        <p className="text-neutral-400 mb-6">指定された仕事は存在しないか、削除された可能性があります。</p>
        <Button onClick={() => router.push('/search?tab=job')} className="btn-primary">
          仕事一覧に戻る
        </Button>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-6xl p-4 md:grid md:grid-cols-[1fr_320px] md:gap-6">
      <section className="space-y-6">
        {/* 仕事詳細 */}
        <div className="bg-neutral-900/70 border border-neutral-800 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 bg-neutral-800 rounded-lg flex items-center justify-center">
              <Briefcase className="w-8 h-8 text-blue-400" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white mb-2">{job.title}</h1>
              <p className="text-lg text-neutral-300 mb-4">{job.employer}</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-neutral-300">
                  <MapPin className="w-4 h-4" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-300">
                  <Clock className="w-4 h-4" />
                  <span>{job.type}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-neutral-400 mb-1">時給</p>
              <p className="text-3xl font-bold text-[rgb(33,100,243)]">{job.wage}</p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-neutral-800/50 rounded-lg">
            <h3 className="font-semibold text-white mb-3">この仕事の特徴</h3>
            <ul className="space-y-2 text-sm text-neutral-300">
              <li>• 未経験歓迎・研修制度充実</li>
              <li>• 外国人スタッフ多数活躍中</li>
              <li>• 日本語サポートあり</li>
              <li>• 交通費支給</li>
            </ul>
          </div>
        </div>

        {/* 通勤圏内の住まい */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">
            通勤に便利な住まい ({nearbyHouses.length}件)
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {nearbyHouses.map(house => (
              <div key={house.id} onClick={() => handleHouseSelect(house)}>
                <HouseCard house={house} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <RightRail />
    </main>
  )
}