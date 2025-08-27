'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, MapPin, Briefcase, SlidersHorizontal } from 'lucide-react'
import JobHouseCard from '@/components/cards/JobHouseCard'
import JobCard from '@/components/cards/JobCard'
import HouseCard from '@/components/cards/HouseCard'
import { useAppStore } from '@/lib/store'
import { RightRail } from '@/components/RightRail'

type TabType = 'job' | 'home' | 'advanced'

function SearchContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<TabType>('job')
  const [searchQuery, setSearchQuery] = useState('')
  const pairs = useAppStore(s => s.pairs)
  
  // ユニークな仕事と住居を取得
  const uniqueJobs = pairs
    .map(p => p.job)
    .filter((job, index, self) => 
      index === self.findIndex(j => j.id === job.id)
    )
  
  const uniqueHouses = pairs
    .map(p => p.house)
    .filter((house, index, self) => 
      index === self.findIndex(h => h.id === house.id)
    )

  useEffect(() => {
    const tab = searchParams.get('tab') as TabType
    if (tab && ['job', 'home', 'advanced'].includes(tab)) {
      setActiveTab(tab)
    }
  }, [searchParams])

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab)
    router.push(`/search?tab=${tab}`)
  }

  const tabs = [
    { id: 'job', label: '仕事から探す', icon: Briefcase },
    { id: 'home', label: '住まいから探す', icon: MapPin },
    { id: 'advanced', label: '詳細検索', icon: SlidersHorizontal }
  ]

  return (
    <main className="mx-auto max-w-6xl p-4 md:grid md:grid-cols-[1fr_320px] md:gap-6">
      <section className="space-y-6">
        <div className="bg-neutral-900/70 border border-neutral-800 rounded-lg p-6 shadow-sm">
          <div className="flex space-x-1 mb-6">
            {tabs.map(tab => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id as TabType)}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    activeTab === tab.id 
                      ? 'bg-[rgb(var(--accent))] text-white' 
                      : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300'
                  }`}
                  suppressHydrationWarning
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              )
            })}
          </div>

          <div className="space-y-4">
            {activeTab === 'job' && (
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input 
                    placeholder="職種・キーワードを入力"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                    suppressHydrationWarning
                  />
                  <Button className="btn-primary" suppressHydrationWarning>
                    <Search className="w-4 h-4 mr-2" />
                    検索
                  </Button>
                </div>
                <div className="text-sm text-neutral-400">
                  人気の職種: 製造業、飲食店、清掃、倉庫作業
                </div>
              </div>
            )}

            {activeTab === 'home' && (
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input 
                    placeholder="エリア・駅名を入力"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                    suppressHydrationWarning
                  />
                  <Button className="btn-primary" suppressHydrationWarning>
                    <Search className="w-4 h-4 mr-2" />
                    検索
                  </Button>
                </div>
                <div className="text-sm text-neutral-400">
                  人気のエリア: 東京、大阪、名古屋、福岡
                </div>
              </div>
            )}

            {activeTab === 'advanced' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input placeholder="職種・キーワード" />
                  <Input placeholder="希望エリア" />
                  <Input placeholder="希望家賃（下限）" type="number" />
                  <Input placeholder="希望家賃（上限）" type="number" />
                  <Input placeholder="希望時給（下限）" type="number" />
                  <Input placeholder="希望時給（上限）" type="number" />
                </div>
                <Button className="btn-primary w-full" suppressHydrationWarning>
                  <Search className="w-4 h-4 mr-2" />
                  この条件で検索
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white">
            {activeTab === 'job' ? '仕事の検索結果' : 
             activeTab === 'home' ? '住まいの検索結果' : 
             'おすすめのセット'}
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {activeTab === 'job' && 
              uniqueJobs.slice(0, 9).map(job => (
                <JobCard key={job.id} job={job} />
              ))
            }
            {activeTab === 'home' && 
              uniqueHouses.slice(0, 9).map(house => (
                <HouseCard key={house.id} house={house} />
              ))
            }
            {activeTab === 'advanced' && 
              pairs.slice(0, 9).map(p => (
                <JobHouseCard key={p.id} pair={p} />
              ))
            }
          </div>
        </div>
      </section>

      <RightRail />
    </main>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchContent />
    </Suspense>
  )
}
