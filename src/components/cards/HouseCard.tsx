'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Train } from 'lucide-react'
import type { House } from '@/lib/types'

interface HouseCardProps {
  house: House
}

export default function HouseCard({ house }: HouseCardProps) {
  return (
    <Link href={`/house/${house.id}`}>
      <Card className="cursor-pointer transition-all hover:shadow-lg bg-neutral-900/70 border-neutral-800 hover:border-green-600/50">
        <div className="aspect-[4/3] relative overflow-hidden rounded-t-lg">
          <Image
            src={house.photo || '/fallback-worker.jpg'}
            alt={house.name}
            fill
            className="object-cover"
            unoptimized
            onError={(e) => {
              const img = e.target as HTMLImageElement
              if (img.src !== '/fallback-worker.jpg') {
                img.src = '/fallback-worker.jpg'
              }
            }}
          />
        </div>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-white mb-1">{house.name}</h3>
            </div>
            <div className="text-right">
              <p className="font-bold text-xl text-[rgb(117,192,67)]">{house.rent}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-neutral-300">
              <Train className="w-4 h-4 text-neutral-500" />
              <span>{house.station}</span>
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {house.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-neutral-800 text-neutral-300 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-4 text-right">
            <span className="text-sm text-green-400 hover:underline">
              この住まいで仕事を探す →
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}