'use client'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Bell, MessageCircle, User, Home, Briefcase } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { SITE } from '@/lib/config'
import clsx from 'clsx'

export function TopNav() {
  const pathname = usePathname()
  
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
          <a
            href="https://suumo.jp/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-2 py-1 rounded-md text-xs font-medium transition-colors flex items-center gap-1 whitespace-nowrap bg-green-600 text-white hover:bg-green-700"
          >
            <Home className="w-3 h-3" />
            <span className="hidden sm:inline">家のみ探す</span>
            <span className="sm:hidden">家のみ</span>
          </a>
          <a
            href="https://jp.indeed.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-2 py-1 rounded-md text-xs font-medium transition-colors flex items-center gap-1 whitespace-nowrap bg-blue-600 text-white hover:bg-blue-700"
          >
            <Briefcase className="w-3 h-3" />
            <span className="hidden sm:inline">仕事のみ探す</span>
            <span className="sm:hidden">仕事のみ</span>
          </a>
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
