'use client'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Bell, MessageCircle, User, UserCheck, UserX } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { SITE } from '@/lib/config'
import { useAppStore } from '@/lib/store'
import clsx from 'clsx'

export function TopNav() {
  const pathname = usePathname()
  const { journeyStage, setJourneyStage } = useAppStore()
  
  return (
    <header className="sticky top-0 z-40 border-b border-neutral-800 bg-neutral-950/85 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4">
        <Link href="/" className="font-semibold tracking-wide">
          {SITE.title}
        </Link>
        <div className="ml-2 hidden flex-1 md:block">
          <Input placeholder="地域・職種・家賃・タグで検索" className="bg-neutral-900 border-neutral-800" />
        </div>
        
        <div className="flex items-center gap-1 mr-2">
          <button
            onClick={() => setJourneyStage('individual')}
            className={clsx(
              'px-2 py-1 rounded-md text-xs font-medium transition-colors flex items-center gap-1 whitespace-nowrap',
              journeyStage === 'individual' 
                ? 'bg-green-600 text-white' 
                : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-white'
            )}
            suppressHydrationWarning
          >
            <UserCheck className="w-3 h-3" />
            <span className="hidden sm:inline">家・仕事のみ</span>
            <span className="sm:hidden">個別</span>
          </button>
          <button
            onClick={() => setJourneyStage('pair')}
            className={clsx(
              'px-2 py-1 rounded-md text-xs font-medium transition-colors flex items-center gap-1 whitespace-nowrap',
              journeyStage === 'pair'
                ? 'bg-blue-600 text-white'
                : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-white'
            )}
            suppressHydrationWarning
          >
            <UserX className="w-3 h-3" />
            <span className="hidden sm:inline">セットで探す</span>
            <span className="sm:hidden">セット</span>
          </button>
        </div>
        
        <nav className="ml-auto hidden items-center gap-4 md:flex">
          <Link href="/follow" className={clsx('text-neutral-300 hover:text-white', pathname==='/follow' && 'text-emerald-400')}>
            <Bell className="h-5 w-5" />
          </Link>
          <Link href="/dm" className={clsx('text-neutral-300 hover:text-white', pathname==='/dm' && 'text-emerald-400')}>
            <MessageCircle className="h-5 w-5" />
          </Link>
          <Link href="/me" className={clsx('text-neutral-300 hover:text-white', pathname==='/me' && 'text-emerald-400')}>
            <User className="h-5 w-5" />
          </Link>
        </nav>
      </div>
    </header>
  )
}
