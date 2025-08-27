'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Clock, DollarSign, Shield, Award } from 'lucide-react'
import { useState } from 'react'
import { useAppStore } from '@/lib/store'

export function LifePlanPanel() {
  const [securityEnabled, setSecurityEnabled] = useState(true)
  const { creditScore, trainingCompleted } = useAppStore()
  
  const hourlyWage = 1200
  const weeklyHours = 40
  const monthlyIncome = hourlyWage * weeklyHours * 4
  const rent = 65000
  const fixedCosts = 25000
  const balance = monthlyIncome - rent - fixedCosts
  const balancePercent = (balance / monthlyIncome) * 100

  const schedule = [
    { time: '06:00-09:00', activity: '朝の準備・通勤', color: 'bg-blue-100' },
    { time: '09:00-18:00', activity: '仕事', color: 'bg-green-100' },
    { time: '18:00-19:00', activity: '通勤', color: 'bg-blue-100' },
    { time: '19:00-22:00', activity: '自由時間', color: 'bg-yellow-100' },
    { time: '22:00-06:00', activity: '睡眠', color: 'bg-gray-100' }
  ]

  return (
    <div className="space-y-4">
      <Card className="bg-neutral-900/70 border-neutral-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <DollarSign className="w-5 h-5 text-green-400" />
            収支バランス
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-neutral-300">月収入</span>
              <span className="font-semibold text-green-400">¥{monthlyIncome.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-neutral-300">家賃</span>
              <span className="text-red-400">-¥{rent.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-neutral-300">固定費</span>
              <span className="text-red-400">-¥{fixedCosts.toLocaleString()}</span>
            </div>
            <div className="border-t border-neutral-700 pt-2 flex justify-between">
              <span className="font-semibold text-white">残額</span>
              <span className={`font-bold ${balance > 0 ? 'text-green-400' : 'text-red-400'}`}>
                ¥{balance.toLocaleString()}
              </span>
            </div>
          </div>
          <Progress value={balancePercent} className="h-3 bg-neutral-700" />
          <p className="text-xs text-neutral-400">
            月収の{balancePercent.toFixed(0)}%が自由に使えます
          </p>
        </CardContent>
      </Card>

      <Card className="bg-neutral-900/70 border-neutral-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Clock className="w-5 h-5 text-blue-400" />
            1日の時間割
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {schedule.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <span className="text-xs text-neutral-400 w-24 flex-shrink-0">{item.time}</span>
                <div className="flex-1 px-3 py-2 rounded bg-neutral-800 text-white text-xs">
                  {item.activity}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-neutral-900/70 border-neutral-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Shield className="w-5 h-5 text-green-400" />
            安心証明
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-300">信用スコア</span>
            <Badge className="bg-green-700 text-white hover:bg-green-600">{creditScore}点</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-300">保証会社</span>
            <button 
              onClick={() => setSecurityEnabled(!securityEnabled)}
              className={`text-xs px-3 py-1 rounded font-medium ${securityEnabled ? 'bg-green-600 text-white' : 'bg-neutral-700 text-neutral-300'}`}
            >
              {securityEnabled ? '利用中' : '未利用'}
            </button>
          </div>
          {trainingCompleted && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-300">研修完了</span>
              <Award className="w-5 h-5 text-yellow-400" />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}