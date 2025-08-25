import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'

export default function MePage() {
  return (
    <main className="mx-auto max-w-md space-y-6 p-4">
      <div className="flex items-center gap-4">
        <Avatar className="h-14 w-14"><AvatarFallback>YN</AvatarFallback></Avatar>
        <div>
          <div className="text-lg font-semibold">Y. Nguyen</div>
          <div className="text-sm text-neutral-400">ベトナム語 / 英語 / 日本語（N3）</div>
        </div>
      </div>

      <section className="space-y-2 rounded-lg border border-neutral-800 bg-neutral-900/60 p-4">
        <div className="text-sm text-neutral-400">信用スコア</div>
        <div className="text-2xl font-bold">78 / 100</div>
        <Progress value={78} className="h-2 bg-neutral-800" />
        <ul className="mt-2 text-sm text-neutral-300 list-disc pl-5">
          <li>雇用形態：フルタイム（Airワーク経由）</li>
          <li>勤続見込み：2年以上</li>
          <li>Recruit利用歴：1年</li>
        </ul>
      </section>

      <section className="space-y-2">
        <div className="text-lg font-semibold">保存した組み合わせ</div>
        <div className="rounded-lg border border-neutral-800 bg-neutral-900/60 p-4 text-neutral-300">（ホームで♥したものを表示）</div>
      </section>
    </main>
  )
}
