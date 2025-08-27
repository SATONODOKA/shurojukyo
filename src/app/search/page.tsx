'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
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
  const [, setFilters] = useState({
    jobType: '',
    area: '',
    minWage: '',
    maxWage: '',
    minRent: '',
    maxRent: '',
    employmentType: '',
    japaneseLevel: ''
  })
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
    <main className="mx-auto max-w-6xl p-3 sm:p-4 lg:grid lg:grid-cols-[1fr_320px] lg:gap-6">
      <section className="space-y-4 sm:space-y-6">
        <div className="bg-neutral-900/70 border border-neutral-800 rounded-lg p-4 sm:p-6 shadow-sm">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <Select onValueChange={(value) => setFilters(prev => ({ ...prev, jobType: value }))}>
                    <SelectTrigger className="bg-neutral-900 border-neutral-700">
                      <SelectValue placeholder="職種を選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manufacturing">製造業</SelectItem>
                      <SelectItem value="restaurant">飲食・フード</SelectItem>
                      <SelectItem value="cleaning">清掃・メンテナンス</SelectItem>
                      <SelectItem value="warehouse">倉庫・物流</SelectItem>
                      <SelectItem value="retail">小売・販売</SelectItem>
                      <SelectItem value="care">介護・福祉</SelectItem>
                      <SelectItem value="construction">建設・工事</SelectItem>
                      <SelectItem value="agriculture">農業・漁業</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select onValueChange={(value) => setFilters(prev => ({ ...prev, area: value }))}>
                    <SelectTrigger className="bg-neutral-900 border-neutral-700">
                      <SelectValue placeholder="勤務地" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tokyo">東京都</SelectItem>
                      <SelectItem value="kanagawa">神奈川県</SelectItem>
                      <SelectItem value="osaka">大阪府</SelectItem>
                      <SelectItem value="aichi">愛知県</SelectItem>
                      <SelectItem value="saitama">埼玉県</SelectItem>
                      <SelectItem value="chiba">千葉県</SelectItem>
                      <SelectItem value="fukuoka">福岡県</SelectItem>
                      <SelectItem value="hyogo">兵庫県</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select onValueChange={(value) => setFilters(prev => ({ ...prev, minWage: value }))}>
                    <SelectTrigger className="bg-neutral-900 border-neutral-700">
                      <SelectValue placeholder="希望時給" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="900">900円以上</SelectItem>
                      <SelectItem value="1000">1000円以上</SelectItem>
                      <SelectItem value="1200">1200円以上</SelectItem>
                      <SelectItem value="1400">1400円以上</SelectItem>
                      <SelectItem value="1600">1600円以上</SelectItem>
                      <SelectItem value="1800">1800円以上</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select onValueChange={(value) => setFilters(prev => ({ ...prev, employmentType: value }))}>
                    <SelectTrigger className="bg-neutral-900 border-neutral-700">
                      <SelectValue placeholder="雇用形態" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fulltime">正社員</SelectItem>
                      <SelectItem value="parttime">アルバイト・パート</SelectItem>
                      <SelectItem value="contract">契約社員</SelectItem>
                      <SelectItem value="temp">派遣</SelectItem>
                      <SelectItem value="trainee">技能実習</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select onValueChange={(value) => setFilters(prev => ({ ...prev, japaneseLevel: value }))}>
                    <SelectTrigger className="bg-neutral-900 border-neutral-700">
                      <SelectValue placeholder="日本語レベル" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">不問</SelectItem>
                      <SelectItem value="n5">N5（初級）</SelectItem>
                      <SelectItem value="n4">N4（初中級）</SelectItem>
                      <SelectItem value="n3">N3（中級）</SelectItem>
                      <SelectItem value="n2">N2（中上級）</SelectItem>
                      <SelectItem value="n1">N1（上級）</SelectItem>
                    </SelectContent>
                  </Select>
                  
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <Select onValueChange={(value) => setFilters(prev => ({ ...prev, area: value }))}>
                    <SelectTrigger className="bg-neutral-900 border-neutral-700">
                      <SelectValue placeholder="希望エリア" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tokyo">東京都</SelectItem>
                      <SelectItem value="kanagawa">神奈川県</SelectItem>
                      <SelectItem value="osaka">大阪府</SelectItem>
                      <SelectItem value="aichi">愛知県</SelectItem>
                      <SelectItem value="saitama">埼玉県</SelectItem>
                      <SelectItem value="chiba">千葉県</SelectItem>
                      <SelectItem value="fukuoka">福岡県</SelectItem>
                      <SelectItem value="hyogo">兵庫県</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select onValueChange={(value) => setFilters(prev => ({ ...prev, maxRent: value }))}>
                    <SelectTrigger className="bg-neutral-900 border-neutral-700">
                      <SelectValue placeholder="家賃上限" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30000">3万円以下</SelectItem>
                      <SelectItem value="40000">4万円以下</SelectItem>
                      <SelectItem value="50000">5万円以下</SelectItem>
                      <SelectItem value="60000">6万円以下</SelectItem>
                      <SelectItem value="70000">7万円以下</SelectItem>
                      <SelectItem value="80000">8万円以下</SelectItem>
                      <SelectItem value="100000">10万円以下</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Input 
                    placeholder="駅名を入力"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-neutral-900 border-neutral-700"
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Select onValueChange={(value) => setFilters(prev => ({ ...prev, jobType: value }))}>
                    <SelectTrigger className="bg-neutral-900 border-neutral-700">
                      <SelectValue placeholder="職種・キーワード" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manufacturing">製造業</SelectItem>
                      <SelectItem value="restaurant">飲食・フード</SelectItem>
                      <SelectItem value="cleaning">清掃・メンテナンス</SelectItem>
                      <SelectItem value="warehouse">倉庫・物流</SelectItem>
                      <SelectItem value="retail">小売・販売</SelectItem>
                      <SelectItem value="care">介護・福祉</SelectItem>
                      <SelectItem value="construction">建設・工事</SelectItem>
                      <SelectItem value="agriculture">農業・漁業</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select onValueChange={(value) => setFilters(prev => ({ ...prev, area: value }))}>
                    <SelectTrigger className="bg-neutral-900 border-neutral-700">
                      <SelectValue placeholder="希望エリア" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tokyo">東京都</SelectItem>
                      <SelectItem value="kanagawa">神奈川県</SelectItem>
                      <SelectItem value="osaka">大阪府</SelectItem>
                      <SelectItem value="aichi">愛知県</SelectItem>
                      <SelectItem value="saitama">埼玉県</SelectItem>
                      <SelectItem value="chiba">千葉県</SelectItem>
                      <SelectItem value="fukuoka">福岡県</SelectItem>
                      <SelectItem value="hyogo">兵庫県</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select onValueChange={(value) => setFilters(prev => ({ ...prev, minWage: value }))}>
                    <SelectTrigger className="bg-neutral-900 border-neutral-700">
                      <SelectValue placeholder="希望時給（下限）" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="900">900円以上</SelectItem>
                      <SelectItem value="1000">1000円以上</SelectItem>
                      <SelectItem value="1200">1200円以上</SelectItem>
                      <SelectItem value="1400">1400円以上</SelectItem>
                      <SelectItem value="1600">1600円以上</SelectItem>
                      <SelectItem value="1800">1800円以上</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select onValueChange={(value) => setFilters(prev => ({ ...prev, maxWage: value }))}>
                    <SelectTrigger className="bg-neutral-900 border-neutral-700">
                      <SelectValue placeholder="希望時給（上限）" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1000">1000円以下</SelectItem>
                      <SelectItem value="1200">1200円以下</SelectItem>
                      <SelectItem value="1400">1400円以下</SelectItem>
                      <SelectItem value="1600">1600円以下</SelectItem>
                      <SelectItem value="1800">1800円以下</SelectItem>
                      <SelectItem value="2000">2000円以下</SelectItem>
                      <SelectItem value="2500">2500円以下</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select onValueChange={(value) => setFilters(prev => ({ ...prev, minRent: value }))}>
                    <SelectTrigger className="bg-neutral-900 border-neutral-700">
                      <SelectValue placeholder="希望家賃（下限）" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="20000">2万円以上</SelectItem>
                      <SelectItem value="30000">3万円以上</SelectItem>
                      <SelectItem value="40000">4万円以上</SelectItem>
                      <SelectItem value="50000">5万円以上</SelectItem>
                      <SelectItem value="60000">6万円以上</SelectItem>
                      <SelectItem value="70000">7万円以上</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select onValueChange={(value) => setFilters(prev => ({ ...prev, maxRent: value }))}>
                    <SelectTrigger className="bg-neutral-900 border-neutral-700">
                      <SelectValue placeholder="希望家賃（上限）" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30000">3万円以下</SelectItem>
                      <SelectItem value="40000">4万円以下</SelectItem>
                      <SelectItem value="50000">5万円以下</SelectItem>
                      <SelectItem value="60000">6万円以下</SelectItem>
                      <SelectItem value="70000">7万円以下</SelectItem>
                      <SelectItem value="80000">8万円以下</SelectItem>
                      <SelectItem value="100000">10万円以下</SelectItem>
                      <SelectItem value="120000">12万円以下</SelectItem>
                    </SelectContent>
                  </Select>
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
          <h2 className="text-base sm:text-lg font-semibold text-white">
            {activeTab === 'job' ? '仕事の検索結果' : 
             activeTab === 'home' ? '住まいの検索結果' : 
             'おすすめのセット'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
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

      <div className="hidden lg:block">
        <RightRail />
      </div>
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
