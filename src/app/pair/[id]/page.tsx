'use client'
import JobHouseCard from '@/components/cards/JobHouseCard'
import { useAppStore } from '@/lib/store'
import { useEffect, useState } from 'react'
import type { Pair } from '@/lib/types'
import { LifePlanPanel } from '@/components/panels/LifePlanPanel'
import { BatchApplyDrawer } from '@/components/apply/BatchApplyDrawer'
import { Button } from '@/components/ui/button'
import { Send } from 'lucide-react'


export default function PairDetail({ params }: { params: Promise<{ id: string }> }) {
  const [pair, setPair] = useState<Pair | null>(null)
  const [showDrawer, setShowDrawer] = useState(false)
  
  useEffect(() => {
    params.then((resolvedParams) => {
      const foundPair = useAppStore.getState().pairs.find(p => p.id === resolvedParams.id)
      setPair(foundPair || null)
    })
  }, [params])
  
  if (!pair) return <main className="p-6">Not Found</main>
  
  return (
    <main className="mx-auto max-w-6xl p-4 md:grid md:grid-cols-[1fr_320px] md:gap-6">
      <section className="space-y-4">
        <JobHouseCard pair={pair} />
        
        <div className="bg-neutral-900/70 border border-neutral-800 rounded-lg p-6 shadow-sm">
          <Button 
            onClick={() => setShowDrawer(true)}
            className="btn-primary w-full py-6 text-lg font-semibold"
          >
            <Send className="w-5 h-5 mr-2" />
            このセットで一括申込
          </Button>
          
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-neutral-800 rounded-lg">
              <p className="text-sm text-neutral-400">家賃</p>
              <p className="text-xl font-bold text-white">{pair.house.rent}</p>
            </div>
            <div className="text-center p-3 bg-neutral-800 rounded-lg">
              <p className="text-sm text-neutral-400">時給</p>
              <p className="text-xl font-bold text-white">{pair.job.wage}</p>
            </div>
          </div>
        </div>
        
        <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 text-neutral-300">
          <h3 className="font-semibold mb-3">このペアの特徴</h3>
          <ul className="space-y-2 text-sm">
            <li>• 通勤時間: 約15分（徒歩または自転車）</li>
            <li>• 初期費用: 敬金・礼金無し</li>
            <li>• 外国人サポート: 英語対応可</li>
          </ul>
        </div>
      </section>
      
      <aside className="hidden md:block space-y-4">
        <LifePlanPanel />
      </aside>
      
      {showDrawer && (
        <BatchApplyDrawer 
          isOpen={showDrawer}
          onClose={() => setShowDrawer(false)}
          pair={pair}
        />
      )}
    </main>
  )
}
