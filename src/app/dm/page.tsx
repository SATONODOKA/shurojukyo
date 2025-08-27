'use client'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useAppStore } from '@/lib/store'
import { useState } from 'react'
import { Home, Briefcase } from 'lucide-react'

export default function DMPage() {
  const threads = useAppStore(s => s.threads)
  const [selectedThread, setSelectedThread] = useState<string | null>(threads[0]?.id || null)
  
  const defaultThreads = ['株式会社サンプル','オーナー田中','□□不動産']
  const msgs = [
    { me: false, text: '応募ありがとうございます。面接は明日でも可能です。' },
    { me: true,  text: '14:00は空いていますか？' },
    { me: false, text: 'はい、14:00で確定します。住所は…' },
  ]
  return (
    <main className="mx-auto h-[calc(100dvh-56px)] max-w-6xl p-4 md:grid md:grid-cols-[260px_1fr] md:gap-6">
      <aside className="hidden md:block">
        <div className="sticky top-16 space-y-2 rounded-xl border border-neutral-800 bg-neutral-900/60 p-3">
          {threads.length > 0 && (
            <div className="mb-3 pb-2 border-b border-neutral-700">
              <p className="text-xs text-gray-400 mb-2">新着メッセージ</p>
              {threads.map(thread => (
                <div 
                  key={thread.id} 
                  onClick={() => setSelectedThread(thread.id)}
                  className={`cursor-pointer rounded-lg p-2 mb-2 hover:bg-neutral-800 flex items-center gap-2 ${
                    selectedThread === thread.id ? 'bg-neutral-800' : ''
                  }`}
                >
                  {thread.type === 'landlord' ? (
                    <Home className="w-4 h-4 text-green-500" />
                  ) : (
                    <Briefcase className="w-4 h-4 text-blue-500" />
                  )}
                  <span className="text-sm truncate">{thread.title}</span>
                </div>
              ))}
            </div>
          )}
          {defaultThreads.map(t => <div key={t} className="cursor-pointer rounded-lg p-2 hover:bg-neutral-800">{t}</div>)}
        </div>
      </aside>

      <section className="flex h-full flex-col">
        <div className="mb-2 text-lg font-semibold">
          {selectedThread && threads.find(t => t.id === selectedThread) 
            ? threads.find(t => t.id === selectedThread)!.title
            : 'DM（株式会社サンプル）'}
        </div>
        <div className="flex-1 space-y-2 overflow-y-auto rounded-lg border border-neutral-800 bg-neutral-900/50 p-3">
          {selectedThread && threads.find(t => t.id === selectedThread) ? (
            <div className="bg-neutral-800 rounded-lg p-4">
              <pre className="whitespace-pre-wrap text-sm">
                {threads.find(t => t.id === selectedThread)!.content}
              </pre>
              <p className="text-xs text-gray-400 mt-3">
                送信日時: {threads.find(t => t.id === selectedThread)!.timestamp.toLocaleString()}
              </p>
            </div>
          ) : (
            msgs.map((m, i) => (
              <div key={i} className={`max-w-[75%] rounded-2xl px-3 py-2 ${m.me ? 'ml-auto bg-emerald-500 text-black' : 'bg-neutral-800'}`}>
                {m.text}
              </div>
            ))
          )}
        </div>
        <div className="mt-3 flex gap-2">
          <Input placeholder="メッセージを入力（自動翻訳ON）" className="bg-neutral-900 border-neutral-800" />
          <Button>送信</Button>
        </div>
      </section>
    </main>
  )
}
