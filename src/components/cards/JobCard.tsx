'use client'

import Link from 'next/link'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { MapPin, Briefcase } from 'lucide-react'
import type { Job } from '@/lib/types'

interface JobCardProps {
  job: Job
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <Link href={`/job/${job.id}`}>
      <Card className="cursor-pointer transition-all hover:shadow-lg bg-neutral-900/70 border-neutral-800 hover:border-blue-600/50">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm sm:text-base text-white mb-1 line-clamp-2">{job.title}</h3>
              <p className="text-neutral-400 text-xs sm:text-sm line-clamp-1">{job.employer}</p>
            </div>
            <div className="text-right flex-shrink-0 ml-2">
              <p className="font-bold text-lg sm:text-xl text-[rgb(33,100,243)]">{job.wage}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-300">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 flex-shrink-0" />
              <span className="line-clamp-1">{job.location}</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-300">
              <Briefcase className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 flex-shrink-0" />
              <span className="line-clamp-1">{job.type}</span>
            </div>
          </div>
          <div className="mt-3 text-right">
            <span className="text-xs sm:text-sm text-blue-400 hover:text-blue-300 transition-colors">
              この仕事で住まいを探す →
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}