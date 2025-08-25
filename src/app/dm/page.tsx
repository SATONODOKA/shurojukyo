'use client'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function DMPage() {
  const msgs = [
    { me: false, text: '応募ありがとうございます。面接は明日でも可能です。' },
    { me: true,  text: '14:00は空いていますか？' },
    { me: false, text: 'はい、14:00で確定します。住所は…' },
    { me: false, text: '東京都渋谷区渋谷1-1-1、渋谷駅から徒歩5分です。' },
    { me: true,  text: 'わかりました！当日お会いできるのを楽しみにしています。' },
  ]
  return (
    <main className="mx-auto flex h-[calc(100dvh-80px)] max-w-md flex-col p-4">
      <div className="mb-2 text-lg font-semibold">DM（株式会社サンプル様）</div>
      <div className="flex-1 space-y-2 overflow-y-auto rounded-lg border border-neutral-800 bg-neutral-900/50 p-3">
        {msgs.map((m, i) => (
          <div key={i} className={`max-w-[75%] rounded-2xl px-3 py-2 ${m.me ? 'ml-auto bg-emerald-500 text-black' : 'bg-neutral-800'}`}>
            {m.text}
          </div>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <Input placeholder="メッセージを入力（自動翻訳ON）" className="bg-neutral-900 border-neutral-800" />
        <Button>送信</Button>
      </div>
    </main>
  )
}
