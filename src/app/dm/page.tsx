'use client'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const threads = ['株式会社サンプル','オーナー田中','□□不動産']
const msgs = [
  { me: false, text: '応募ありがとうございます。面接は明日でも可能です。' },
  { me: true,  text: '14:00は空いていますか？' },
  { me: false, text: 'はい、14:00で確定します。住所は…' },
]

export default function DMPage() {
  return (
    <main className="mx-auto h-[calc(100dvh-56px)] max-w-6xl p-4 md:grid md:grid-cols-[260px_1fr] md:gap-6">
      <aside className="hidden md:block">
        <div className="sticky top-16 space-y-2 rounded-xl border border-neutral-800 bg-neutral-900/60 p-3">
          {threads.map(t => <div key={t} className="cursor-pointer rounded-lg p-2 hover:bg-neutral-800">{t}</div>)}
        </div>
      </aside>

      <section className="flex h-full flex-col">
        <div className="mb-2 text-lg font-semibold">DM（株式会社サンプル）</div>
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
      </section>
    </main>
  )
}
