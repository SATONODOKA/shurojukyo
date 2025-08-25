'use client'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

export function SearchFilters() {
  const tags = ['家具付き','駅近','静か','シェアハウス','新築','バス/トイレ別']
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-16 space-y-4 rounded-xl border border-neutral-800 bg-neutral-900/60 p-4">
        <div>
          <label className="text-sm font-medium text-neutral-300">地域</label>
          <Input placeholder="例：品川区 / 名古屋市" className="mt-1 bg-neutral-900 border-neutral-800" />
        </div>
        <div>
          <label className="text-sm font-medium text-neutral-300">職種</label>
          <Input placeholder="例：介護 / 製造" className="mt-1 bg-neutral-900 border-neutral-800" />
        </div>
        <div>
          <label className="text-sm font-medium text-neutral-300">家賃上限</label>
          <input
            type="range"
            defaultValue={70}
            max={150}
            step={5}
            className="mt-3 w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer"
          />
          <div className="mt-1 text-sm text-neutral-400">〜 約 ¥70,000</div>
        </div>
        <div>
          <label className="text-sm font-medium text-neutral-300">タグ</label>
          <div className="mt-2 flex flex-wrap gap-2">
            {tags.map(t => <Badge key={t} className="bg-neutral-800">{t}</Badge>)}
          </div>
        </div>
      </div>
    </aside>
  )
}
