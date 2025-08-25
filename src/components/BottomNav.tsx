'use client'
import Link from 'next/link'
import { Home, Search, Bell, MessageCircle, User } from 'lucide-react'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

const items = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/search', icon: Search, label: 'Search' },
  { href: '/follow', icon: Bell, label: 'Follow' },
  { href: '/dm', icon: MessageCircle, label: 'DM' },
  { href: '/me', icon: User, label: 'Me' },
]

export function BottomNav() {
  const pathname = usePathname()
  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-neutral-800 bg-neutral-950/95 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/70">
      <ul className="mx-auto grid max-w-md grid-cols-5">
        {items.map(({ href, icon: Icon, label }) => {
          const active = pathname === href
          return (
            <li key={href}>
              <Link href={href} className="flex h-16 flex-col items-center justify-center text-xs">
                <Icon className={clsx('h-6 w-6', active ? 'text-emerald-400' : 'text-neutral-300')} />
                <span className={clsx('mt-1', active ? 'text-emerald-400' : 'text-neutral-400')}>{label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
