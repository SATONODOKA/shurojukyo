'use client'

import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { ArrowRight, Briefcase, Home } from 'lucide-react'

interface EntryCardProps {
  type: 'job' | 'home'
  className?: string
}

export function EntryCard({ type, className = '' }: EntryCardProps) {
  const config = type === 'job' 
    ? {
        title: '仕事から探す',
        description: '希望の職種・勤務地から探して、住まいも一緒に',
        icon: <Briefcase className="w-8 h-8" />,
        href: '/search?tab=job',
        bgColor: 'bg-blue-900/20 hover:bg-blue-900/30 border-blue-600/30',
        iconColor: 'text-blue-400',
        textColor: 'text-blue-200'
      }
    : {
        title: '住まいから探す',
        description: 'まず住みたいエリアを決めて、近くの仕事を探す',
        icon: <Home className="w-8 h-8" />,
        href: '/search?tab=home',
        bgColor: 'bg-green-900/20 hover:bg-green-900/30 border-green-600/30',
        iconColor: 'text-green-400',
        textColor: 'text-green-200'
      }
  
  return (
    <Link href={config.href} className={className}>
      <Card className={`cursor-pointer transition-all hover:shadow-lg ${config.bgColor}`}>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className={config.iconColor}>
              {config.icon}
            </div>
            <ArrowRight className="w-5 h-5 text-neutral-400" />
          </div>
          <CardTitle className="text-xl font-bold mt-4 text-white">{config.title}</CardTitle>
          <CardDescription className={`mt-2 ${config.textColor}`}>{config.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <span className={`text-sm ${config.textColor}`}>今すぐ探す</span>
            <ArrowRight className={`w-4 h-4 ${config.iconColor}`} />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}