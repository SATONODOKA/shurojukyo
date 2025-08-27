'use client'

import Link from 'next/link'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { MapPin, Clock, Briefcase } from 'lucide-react'
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
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-white mb-1">{job.title}</h3>
              <p className="text-neutral-400 text-sm">{job.employer}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-xl text-[rgb(33,100,243)]">{job.wage}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-neutral-300">
              <MapPin className="w-4 h-4 text-neutral-500" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-300">
              <Briefcase className="w-4 h-4 text-neutral-500" />
              <span>{job.type}</span>
            </div>
          </div>
          <div className="mt-4 text-right">
            <span className="text-sm text-blue-400 hover:underline">
              この仕事で住まいを探す →
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}