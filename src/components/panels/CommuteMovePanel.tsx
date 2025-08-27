'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Train, Home, Calculator, TrendingUp } from 'lucide-react'
import { useState } from 'react'

export function CommuteMovePanel() {
  const [currentCommute] = useState(45)
  const [newCommute] = useState(15)
  const [moveCost] = useState(120000)
  const [overlapDays] = useState(15)
  const [currentRent] = useState(75000)
  const [newRent] = useState(65000)
  
  const timeSaved = (currentCommute - newCommute) * 2 * 20
  const overlapCost = (currentRent + newRent) * (overlapDays / 30)
  const monthlySavings = currentRent - newRent
  const breakEvenMonths = moveCost / monthlySavings

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Train className="w-5 h-5" />
            通勤時間比較
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">現在の通勤</span>
              <span className="font-semibold">{currentCommute}分</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">新しい通勤</span>
              <span className="font-semibold text-green-600">{newCommute}分</span>
            </div>
            <div className="border-t pt-2 flex justify-between items-center">
              <span className="text-sm font-semibold">月間削減時間</span>
              <span className="text-green-600 font-bold">{Math.floor(timeSaved / 60)}時間</span>
            </div>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-xs text-blue-700">
              毎日{(currentCommute - newCommute) * 2}分の時間が自由に使えるようになります
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Home className="w-5 h-5" />
            引越しコスト試算
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>引越し費用</span>
              <span>¥{moveCost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>重複家賃（{overlapDays}日分）</span>
              <span className="text-orange-600">¥{Math.floor(overlapCost).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>敷金・礼金</span>
              <span>¥{(newRent * 2).toLocaleString()}</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-semibold">
              <span>合計初期費用</span>
              <span>¥{(moveCost + overlapCost + newRent * 2).toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            家賃削減効果
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>現在の家賃</span>
              <span>¥{currentRent.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>新しい家賃</span>
              <span className="text-green-600">¥{newRent.toLocaleString()}</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-semibold">
              <span>月間節約額</span>
              <span className="text-green-600">¥{monthlySavings.toLocaleString()}</span>
            </div>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-700" />
              <p className="text-xs text-green-700">
                {Math.ceil(breakEvenMonths)}ヶ月で初期費用を回収できます
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}