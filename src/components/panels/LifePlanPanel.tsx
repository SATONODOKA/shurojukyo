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
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            収支バランス
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>月収入</span>
              <span className="font-semibold text-green-600">¥{monthlyIncome.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>家賃</span>
              <span className="text-red-600">-¥{rent.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>固定費</span>
              <span className="text-red-600">-¥{fixedCosts.toLocaleString()}</span>
            </div>
            <div className="border-t pt-2 flex justify-between">
              <span className="font-semibold">残額</span>
              <span className={`font-bold ${balance > 0 ? 'text-green-600' : 'text-red-600'}`}>
                ¥{balance.toLocaleString()}
              </span>
            </div>
          </div>
          <Progress value={balancePercent} className="h-2" />
          <p className="text-xs text-gray-600">
            月収の{balancePercent.toFixed(0)}%が自由に使えます
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            1日の時間割
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {schedule.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <span className="text-xs text-gray-600 w-20">{item.time}</span>
                <div className={`flex-1 px-2 py-1 rounded text-xs ${item.color}`}>
                  {item.activity}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            安心証明
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">信用スコア</span>
            <Badge variant="secondary">{creditScore}点</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">保証会社</span>
            <button 
              onClick={() => setSecurityEnabled(!securityEnabled)}
              className={`text-xs px-2 py-1 rounded ${securityEnabled ? 'bg-green-100 text-green-700' : 'bg-gray-100'}`}
            >
              {securityEnabled ? '利用中' : '未利用'}
            </button>
          </div>
          {trainingCompleted && (
            <div className="flex items-center justify-between">
              <span className="text-sm">研修完了</span>
              <Award className="w-5 h-5 text-yellow-600" />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}