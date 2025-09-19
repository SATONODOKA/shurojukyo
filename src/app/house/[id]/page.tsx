'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAppStore } from '@/lib/store'
import type { Job, House } from '@/lib/types'
import { Button } from '@/components/ui/button'
import JobCard from '@/components/cards/JobCard'
import { RightRail } from '@/components/RightRail'
import { Train } from 'lucide-react'

export default function HouseDetail({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [house, setHouse] = useState<House | null>(null)
  const [nearbyJobs, setNearbyJobs] = useState<Job[]>([])
  const pairs = useAppStore(s => s.pairs)

  useEffect(() => {
    params.then((resolvedParams) => {
      // 住居を取得
      const allHouses = pairs.map(p => p.house)
      const foundHouse = allHouses.find(h => h.id === resolvedParams.id)
      setHouse(foundHouse || null)

      if (foundHouse) {
        // その住居から通勤可能な仕事を取得（同じペアに含まれる仕事）
        const jobsForHouse = pairs
          .filter(p => p.house.id === foundHouse.id)
          .map(p => p.job)
          .filter((job, index, self) => 
            index === self.findIndex(j => j.id === job.id)
          )
        setNearbyJobs(jobsForHouse)
      }
    })
  }, [params, pairs])

  const handleJobSelect = (job: Job) => {
    if (!house) return
    // ペア詳細ページに遷移
    const pair = pairs.find(p => p.house.id === house.id && p.job.id === job.id)
    if (pair) {
      router.push(`/pair/${pair.id}`)
    }
  }

  if (!house) {
    return (
      <main className="p-6 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">お探しの住まいが見つかりません</h1>
        <p className="text-neutral-400 mb-6">指定された住まいは存在しないか、削除された可能性があります。</p>
        <Button variant="outline" onClick={() => router.push('/search?tab=home')} className="btn-primary">
          住まい一覧に戻る
        </Button>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-6xl p-4 md:grid md:grid-cols-[1fr_320px] md:gap-6">
      <section className="space-y-6">
        {/* 住居詳細 */}
        <div className="bg-neutral-900/70 border border-neutral-800 rounded-lg overflow-hidden">
          <div className="aspect-[16/9] relative">
            <Image
              src={house.photo || '/fallback-worker.jpg'}
              alt={house.name}
              fill
              className="object-cover"
              unoptimized
              onError={(e) => {
                const img = e.target as HTMLImageElement
                if (img.src !== '/fallback-worker.jpg') {
                  img.src = '/fallback-worker.jpg'
                }
              }}
            />
          </div>
          
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-white mb-2">{house.name}</h1>
                <div className="flex items-center gap-2 text-neutral-300 mb-4">
                  <Train className="w-4 h-4" />
                  <span>{house.station}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-neutral-400 mb-1">月額家賃</p>
                <p className="text-3xl font-bold text-primary">{house.rent}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {house.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-neutral-800 text-neutral-300 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="p-4 bg-neutral-800/50 rounded-lg">
              <h3 className="font-semibold text-white mb-3">この住まいの特徴</h3>
              <ul className="space-y-2 text-sm text-neutral-300">
                <li>• 駅徒歩5分の好立地</li>
                <li>• 外国人入居歓迎</li>
                <li>• 敷金・礼金なし</li>
                <li>• インターネット完備</li>
                <li>• 日本語サポート対応</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 通勤可能な仕事 */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">
            通勤可能な仕事 ({nearbyJobs.length}件)
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {nearbyJobs.map(job => (
              <div key={job.id} onClick={() => handleJobSelect(job)}>
                <JobCard job={job} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <RightRail />
    </main>
  )
}